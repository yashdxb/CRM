import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { MarketingDataService } from '../services/marketing-data.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "primeng/tag";
import * as i3 from "primeng/table";
import * as i4 from "primeng/progressbar";
const _c0 = () => [10, 25, 50];
function CampaignEmailDetailPage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelement(1, "i", 10);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Loading email details...");
    i0.ɵɵelementEnd()();
} }
function CampaignEmailDetailPage_Conditional_12_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" Sent ", ctx_r1.formatDate(ctx_r1.email().sentAtUtc), " ");
} }
function CampaignEmailDetailPage_Conditional_12_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" Scheduled ", ctx_r1.formatDate(ctx_r1.email().scheduledAtUtc), " ");
} }
function CampaignEmailDetailPage_Conditional_12_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵtextInterpolate1(" Created ", ctx_r1.formatDate(ctx_r1.email().createdAtUtc), " ");
} }
function CampaignEmailDetailPage_Conditional_12_Conditional_75_Conditional_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 56)(1, "span", 57);
    i0.ɵɵtext(2, "Reply-To");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 58);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.email().replyTo);
} }
function CampaignEmailDetailPage_Conditional_12_Conditional_75_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 56)(1, "span", 57);
    i0.ɵɵtext(2, "Sent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 58);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.formatDate(ctx_r1.email().sentAtUtc));
} }
function CampaignEmailDetailPage_Conditional_12_Conditional_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42)(1, "div", 44)(2, "h3", 45);
    i0.ɵɵelement(3, "i", 46);
    i0.ɵɵtext(4, " Performance Breakdown ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 47)(6, "div", 48)(7, "span", 49);
    i0.ɵɵtext(8, "Total Opens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 50);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "p-progressBar", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 48)(13, "span", 49);
    i0.ɵɵtext(14, "Total Clicks");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 50);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(17, "p-progressBar", 52);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 48)(19, "span", 49);
    i0.ɵɵtext(20, "Unsubscribes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 50);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(23, "p-progressBar", 53);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "div", 44)(25, "h3", 45);
    i0.ɵɵelement(26, "i", 54);
    i0.ɵɵtext(27, " Email Details ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 55)(29, "div", 56)(30, "span", 57);
    i0.ɵɵtext(31, "From");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span", 58);
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(34, CampaignEmailDetailPage_Conditional_12_Conditional_75_Conditional_34_Template, 5, 1, "div", 56);
    i0.ɵɵelementStart(35, "div", 56)(36, "span", 57);
    i0.ɵɵtext(37, "Subject");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "span", 58);
    i0.ɵɵtext(39);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "div", 56)(41, "span", 57);
    i0.ɵɵtext(42, "Created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "span", 58);
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(45, CampaignEmailDetailPage_Conditional_12_Conditional_75_Conditional_45_Template, 5, 1, "div", 56);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "div", 59)(47, "h3", 45);
    i0.ɵɵelement(48, "i", 60);
    i0.ɵɵtext(49, " Delivery Summary ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div", 61)(51, "div", 62)(52, "span", 63);
    i0.ɵɵtext(53);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "span", 64);
    i0.ɵɵtext(55, "Sent");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(56, "div", 62)(57, "span", 63);
    i0.ɵɵtext(58);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "span", 64);
    i0.ɵɵtext(60, "Delivered");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(61, "div", 62)(62, "span", 63);
    i0.ɵɵtext(63);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "span", 64);
    i0.ɵɵtext(65, "Bounced");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(66, "div", 62)(67, "span", 63);
    i0.ɵɵtext(68);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "span", 64);
    i0.ɵɵtext(70, "Unsubscribed");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r1.formatNumber(ctx_r1.email().openCount));
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.computeRate(ctx_r1.email().openCount, ctx_r1.email().sentCount))("showValue", false);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.formatNumber(ctx_r1.email().clickCount));
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.computeRate(ctx_r1.email().clickCount, ctx_r1.email().sentCount))("showValue", false);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.formatNumber(ctx_r1.email().unsubscribeCount));
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.computeRate(ctx_r1.email().unsubscribeCount, ctx_r1.email().sentCount))("showValue", false);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r1.email().fromName);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.email().replyTo ? 34 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.email().subject);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.formatDate(ctx_r1.email().createdAtUtc));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.email().sentAtUtc ? 45 : -1);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.formatNumber(ctx_r1.email().sentCount));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.formatNumber(ctx_r1.email().deliveredCount));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.formatNumber(ctx_r1.email().bounceCount));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.formatNumber(ctx_r1.email().unsubscribeCount));
} }
function CampaignEmailDetailPage_Conditional_12_Conditional_76_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Recipient");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Opened");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Clicked");
    i0.ɵɵelementEnd()();
} }
function CampaignEmailDetailPage_Conditional_12_Conditional_76_ng_template_4_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const recipient_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.formatDate(recipient_r3.openedAtUtc));
} }
function CampaignEmailDetailPage_Conditional_12_Conditional_76_ng_template_4_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 74);
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function CampaignEmailDetailPage_Conditional_12_Conditional_76_ng_template_4_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const recipient_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.formatDate(recipient_r3.clickedAtUtc));
} }
function CampaignEmailDetailPage_Conditional_12_Conditional_76_ng_template_4_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 74);
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function CampaignEmailDetailPage_Conditional_12_Conditional_76_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 69)(1, "td")(2, "div", 70)(3, "span", 71);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 72);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵelement(8, "p-tag", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵconditionalCreate(10, CampaignEmailDetailPage_Conditional_12_Conditional_76_ng_template_4_Conditional_10_Template, 2, 1, "span", 73)(11, CampaignEmailDetailPage_Conditional_12_Conditional_76_ng_template_4_Conditional_11_Template, 2, 0, "span", 74);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵconditionalCreate(13, CampaignEmailDetailPage_Conditional_12_Conditional_76_ng_template_4_Conditional_13_Template, 2, 1, "span", 73)(14, CampaignEmailDetailPage_Conditional_12_Conditional_76_ng_template_4_Conditional_14_Template, 2, 0, "span", 74);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const recipient_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(recipient_r3.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(recipient_r3.email);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", recipient_r3.status)("severity", ctx_r1.getStatusSeverity(recipient_r3.status));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(recipient_r3.openedAtUtc ? 10 : 11);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(recipient_r3.clickedAtUtc ? 13 : 14);
} }
function CampaignEmailDetailPage_Conditional_12_Conditional_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43)(1, "div", 65)(2, "p-table", 66);
    i0.ɵɵtemplate(3, CampaignEmailDetailPage_Conditional_12_Conditional_76_ng_template_3_Template, 9, 0, "ng-template", 67)(4, CampaignEmailDetailPage_Conditional_12_Conditional_76_ng_template_4_Template, 15, 6, "ng-template", 68);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r1.recipients())("paginator", true)("rows", 10)("rowsPerPageOptions", i0.ɵɵpureFunction0(5, _c0))("showCurrentPageReport", true);
} }
function CampaignEmailDetailPage_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 11)(1, "div", 12)(2, "div", 13);
    i0.ɵɵelement(3, "p-tag", 14);
    i0.ɵɵelementStart(4, "button", 15);
    i0.ɵɵlistener("click", function CampaignEmailDetailPage_Conditional_12_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.viewCampaign()); });
    i0.ɵɵelement(5, "i", 16);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "h1", 17);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 18)(10, "span", 19);
    i0.ɵɵelement(11, "i", 20);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 19);
    i0.ɵɵelement(14, "i", 21);
    i0.ɵɵconditionalCreate(15, CampaignEmailDetailPage_Conditional_12_Conditional_15_Template, 1, 1)(16, CampaignEmailDetailPage_Conditional_12_Conditional_16_Template, 1, 1)(17, CampaignEmailDetailPage_Conditional_12_Conditional_17_Template, 1, 1);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(18, "div", 22)(19, "div", 23)(20, "div", 24);
    i0.ɵɵelement(21, "i", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "div", 26)(23, "span", 27);
    i0.ɵɵtext(24, "Recipients");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "strong", 28);
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(27, "div", 29)(28, "div", 24);
    i0.ɵɵelement(29, "i", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "div", 26)(31, "span", 27);
    i0.ɵɵtext(32, "Delivered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "strong", 28);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "span", 31);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(37, "div", 32)(38, "div", 24);
    i0.ɵɵelement(39, "i", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 26)(41, "span", 27);
    i0.ɵɵtext(42, "Opens");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "strong", 28);
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "span", 31);
    i0.ɵɵtext(46);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(47, "div", 34)(48, "div", 24);
    i0.ɵɵelement(49, "i", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div", 26)(51, "span", 27);
    i0.ɵɵtext(52, "Clicks");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "strong", 28);
    i0.ɵɵtext(54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "span", 31);
    i0.ɵɵtext(56);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(57, "div", 36)(58, "div", 24);
    i0.ɵɵelement(59, "i", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "div", 26)(61, "span", 27);
    i0.ɵɵtext(62, "Bounced");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "strong", 28);
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "span", 31);
    i0.ɵɵtext(66);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(67, "div", 38)(68, "div", 39)(69, "button", 40);
    i0.ɵɵlistener("click", function CampaignEmailDetailPage_Conditional_12_Template_button_click_69_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setTab("overview")); });
    i0.ɵɵelement(70, "i", 41);
    i0.ɵɵtext(71, " Overview ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(72, "button", 40);
    i0.ɵɵlistener("click", function CampaignEmailDetailPage_Conditional_12_Template_button_click_72_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setTab("recipients")); });
    i0.ɵɵelement(73, "i", 25);
    i0.ɵɵtext(74, " Recipients ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(75, CampaignEmailDetailPage_Conditional_12_Conditional_75_Template, 71, 18, "div", 42);
    i0.ɵɵconditionalCreate(76, CampaignEmailDetailPage_Conditional_12_Conditional_76_Template, 5, 6, "div", 43);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", ctx_r1.email().status)("severity", ctx_r1.getStatusSeverity(ctx_r1.email().status));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.email().campaignName, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.email().subject);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.email().fromName, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.email().sentAtUtc ? 15 : ctx_r1.email().scheduledAtUtc ? 16 : 17);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r1.formatNumber(ctx_r1.email().recipientCount));
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.formatNumber(ctx_r1.email().deliveredCount));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.deliveryRate(), "%");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.formatNumber(ctx_r1.email().openCount));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.computeRate(ctx_r1.email().openCount, ctx_r1.email().sentCount), "%");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.formatNumber(ctx_r1.email().clickCount));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.computeRate(ctx_r1.email().clickCount, ctx_r1.email().sentCount), "%");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.formatNumber(ctx_r1.email().bounceCount));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r1.computeRate(ctx_r1.email().bounceCount, ctx_r1.email().sentCount), "%");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r1.activeTab() === "overview");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("active", ctx_r1.activeTab() === "recipients");
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(ctx_r1.activeTab() === "overview" ? 75 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.activeTab() === "recipients" ? 76 : -1);
} }
export class CampaignEmailDetailPage {
    email = signal(null, ...(ngDevMode ? [{ debugName: "email" }] : []));
    recipients = signal([], ...(ngDevMode ? [{ debugName: "recipients" }] : []));
    recipientTotal = signal(0, ...(ngDevMode ? [{ debugName: "recipientTotal" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    activeTab = signal('overview', ...(ngDevMode ? [{ debugName: "activeTab" }] : []));
    route = inject(ActivatedRoute);
    router = inject(Router);
    toast = inject(AppToastService);
    data = inject(MarketingDataService);
    deliveryRate = computed(() => {
        const e = this.email();
        if (!e || e.sentCount === 0)
            return 0;
        return Math.round((e.deliveredCount / e.sentCount) * 100);
    }, ...(ngDevMode ? [{ debugName: "deliveryRate" }] : []));
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadEmail(id);
        }
        else {
            this.router.navigate(['/app/marketing/emails']);
        }
    }
    loadEmail(id) {
        this.loading.set(true);
        this.data.getEmail(id).subscribe({
            next: (detail) => {
                this.email.set(detail);
                this.loading.set(false);
                this.loadRecipients(id);
            },
            error: () => {
                this.toast.show('error', 'Failed to load email details');
                this.loading.set(false);
            }
        });
    }
    loadRecipients(emailId) {
        this.data.getEmailRecipients(emailId, { page: 1, pageSize: 100 }).subscribe({
            next: (res) => {
                this.recipients.set(res.items);
                this.recipientTotal.set(res.total);
            },
            error: () => {
                this.toast.show('error', 'Failed to load recipients');
            }
        });
    }
    goBack() {
        this.router.navigate(['/app/marketing/emails']);
    }
    viewCampaign() {
        const e = this.email();
        if (e) {
            this.router.navigate(['/app/marketing/campaigns', e.campaignId]);
        }
    }
    setTab(tab) {
        this.activeTab.set(tab);
    }
    getStatusSeverity(status) {
        switch (status) {
            case 'Sent': return 'success';
            case 'Sending': return 'info';
            case 'Scheduled': return 'warn';
            case 'Draft': return 'secondary';
            case 'Failed': return 'danger';
            case 'Delivered': return 'info';
            case 'Opened': return 'success';
            case 'Clicked': return 'success';
            case 'Bounced': return 'danger';
            case 'Unsubscribed': return 'warn';
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
    static ɵfac = function CampaignEmailDetailPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CampaignEmailDetailPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CampaignEmailDetailPage, selectors: [["app-campaign-email-detail-page"]], decls: 13, vars: 1, consts: [[1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "page-header"], [1, "header-left"], [1, "back-link", 3, "click"], [1, "pi", "pi-arrow-left"], [1, "loading-state"], [1, "pi", "pi-spin", "pi-spinner"], [1, "hero-section"], [1, "hero-content"], [1, "hero-meta"], [3, "value", "severity"], [1, "campaign-link", 3, "click"], [1, "pi", "pi-flag"], [1, "hero-title"], [1, "hero-info"], [1, "info-item"], [1, "pi", "pi-user"], [1, "pi", "pi-calendar"], [1, "metrics-section"], [1, "metric-card", "metric-card--primary"], [1, "metric-icon"], [1, "pi", "pi-users"], [1, "metric-content"], [1, "metric-label"], [1, "metric-value"], [1, "metric-card", "metric-card--sent"], [1, "pi", "pi-send"], [1, "metric-rate"], [1, "metric-card", "metric-card--opens"], [1, "pi", "pi-eye"], [1, "metric-card", "metric-card--clicks"], [1, "pi", "pi-external-link"], [1, "metric-card", "metric-card--bounce"], [1, "pi", "pi-times-circle"], [1, "tab-section"], [1, "tab-buttons"], [1, "tab-btn", 3, "click"], [1, "pi", "pi-chart-bar"], [1, "detail-grid"], [1, "data-section"], [1, "detail-card"], [1, "card-title"], [1, "pi", "pi-chart-line"], [1, "performance-list"], [1, "performance-item"], [1, "perf-label"], [1, "perf-value"], ["styleClass", "perf-bar perf-bar--opens", 3, "value", "showValue"], ["styleClass", "perf-bar perf-bar--clicks", 3, "value", "showValue"], ["styleClass", "perf-bar perf-bar--unsub", 3, "value", "showValue"], [1, "pi", "pi-envelope"], [1, "detail-list"], [1, "detail-row"], [1, "detail-label"], [1, "detail-value"], [1, "detail-card", "detail-card--full"], [1, "pi", "pi-check-circle"], [1, "delivery-grid"], [1, "delivery-stat"], [1, "stat-number"], [1, "stat-label"], [1, "data-card"], ["currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} recipients", "styleClass", "data-table", 3, "value", "paginator", "rows", "rowsPerPageOptions", "showCurrentPageReport"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "table-row"], [1, "recipient-info"], [1, "recipient-name"], [1, "recipient-email"], [1, "date-text"], [1, "date-text", "muted"]], template: function CampaignEmailDetailPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1);
            i0.ɵɵelement(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "header", 5)(6, "div", 6);
            i0.ɵɵelement(7, "app-breadcrumbs");
            i0.ɵɵelementStart(8, "button", 7);
            i0.ɵɵlistener("click", function CampaignEmailDetailPage_Template_button_click_8_listener() { return ctx.goBack(); });
            i0.ɵɵelement(9, "i", 8);
            i0.ɵɵtext(10, " Back to Emails ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(11, CampaignEmailDetailPage_Conditional_11_Template, 4, 0, "div", 9)(12, CampaignEmailDetailPage_Conditional_12_Template, 77, 21);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵconditional(ctx.loading() ? 11 : ctx.email() ? 12 : -1);
        } }, dependencies: [CommonModule,
            ButtonModule, i1.PrimeTemplate, TagModule, i2.Tag, TableModule, i3.Table, ProgressBarModule, i4.ProgressBar, BreadcrumbsComponent], styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n//[_ngcontent-%COMP%]   Background[_ngcontent-%COMP%]   Orbs\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 600px;\n    height: 600px;\n    background: $primary-gradient;\n    top: -200px;\n    right: -100px;\n  }\n\n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    bottom: 10%;\n    left: -100px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 300px;\n    height: 300px;\n    background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);\n    top: 40%;\n    right: 20%;\n    animation-delay: -14s;\n  }\n}\n\n//[_ngcontent-%COMP%]   Page[_ngcontent-%COMP%]   Header\n.page-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.4s ease-out;\n}\n\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $primary;\n  cursor: pointer;\n  transition: all 200ms;\n  width: fit-content;\n\n  &:hover {\n    background: white;\n    transform: translateX(-2px);\n    box-shadow: $glass-shadow;\n  }\n\n  i {\n    font-size: 14px;\n  }\n}\n\n//[_ngcontent-%COMP%]   Loading[_ngcontent-%COMP%]   State\n.loading-state[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: $space-3;\n  min-height: 400px;\n  color: $gray-500;\n\n  i {\n    font-size: 2rem;\n    color: $primary;\n  }\n}\n\n//[_ngcontent-%COMP%]   Hero[_ngcontent-%COMP%]   Section\n.hero-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  padding: $space-5;\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.5s ease-out;\n}\n\n.hero-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  margin-bottom: $space-3;\n}\n\n.campaign-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: rgba($primary, 0.1);\n  border: none;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $primary;\n  cursor: pointer;\n  transition: all 200ms;\n\n  &:hover {\n    background: rgba($primary, 0.15);\n  }\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: $font-size-3xl;\n  font-weight: 700;\n  color: $gray-800;\n  margin: 0 0 $space-2;\n  line-height: 1.2;\n}\n\n.hero-preview[_ngcontent-%COMP%] {\n  font-size: $font-size-base;\n  color: $gray-500;\n  margin: 0 0 $space-3;\n  line-height: 1.5;\n}\n\n.hero-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-4;\n}\n\n.info-item[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-sm;\n  color: $gray-600;\n\n  i {\n    font-size: 14px;\n    color: $gray-400;\n  }\n}\n\n//[_ngcontent-%COMP%]   Metrics[_ngcontent-%COMP%]   Section\n.metrics-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.5s ease-out 0.1s both;\n\n  @media (max-width: 1400px) {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .metric-icon {\n      transform: scale(1.1);\n    }\n  }\n\n  .metric-icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-lg;\n    color: white;\n    flex-shrink: 0;\n    transition: transform 300ms;\n  }\n\n  &--primary .metric-icon {\n    background: $primary-gradient;\n  }\n\n  &--sent .metric-icon {\n    background: $cyan-gradient;\n  }\n\n  &--opens .metric-icon {\n    background: $success-gradient;\n  }\n\n  &--clicks .metric-icon {\n    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\n  }\n\n  &--bounce .metric-icon {\n    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);\n  }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .metric-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .metric-rate {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n//[_ngcontent-%COMP%]   Tab[_ngcontent-%COMP%]   Section\n.tab-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin-bottom: $space-4;\n}\n\n.tab-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  padding: $space-1;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n}\n\n.tab-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  background: transparent;\n  border: none;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-600;\n  cursor: pointer;\n  transition: all 200ms;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.05);\n    color: $gray-800;\n  }\n\n  &.active {\n    background: $primary-gradient;\n    color: white;\n    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n  }\n\n  i {\n    font-size: 14px;\n  }\n}\n\n//[_ngcontent-%COMP%]   Detail[_ngcontent-%COMP%]   Grid\n.detail-grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: $space-4;\n  animation: fade-in-up 0.5s ease-out;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  padding: $space-4;\n\n  &--full {\n    grid-column: 1 / -1;\n  }\n}\n\n.card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: $gray-800;\n  margin: 0 0 $space-4;\n  padding-bottom: $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  i {\n    width: 32px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba($cyan, 0.15);\n    color: $cyan;\n    border-radius: $radius-md;\n    font-size: 14px;\n  }\n}\n\n//[_ngcontent-%COMP%]   Performance[_ngcontent-%COMP%]   List\n.performance-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.performance-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-2;\n  align-items: center;\n\n  .perf-label {\n    font-size: $font-size-sm;\n    color: $gray-600;\n  }\n\n  .perf-value {\n    font-size: $font-size-base;\n    font-weight: 600;\n    color: $gray-800;\n    text-align: right;\n  }\n\n  ::ng-deep .perf-bar {\n    grid-column: 1 / -1;\n    height: 6px;\n    border-radius: $radius-full;\n\n    .p-progressbar-value {\n      border-radius: $radius-full;\n    }\n\n    &--opens .p-progressbar-value {\n      background: $success-gradient;\n    }\n\n    &--clicks .p-progressbar-value {\n      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\n    }\n\n    &--unsub .p-progressbar-value {\n      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);\n    }\n\n    &--spam .p-progressbar-value {\n      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   Detail[_ngcontent-%COMP%]   List\n.detail-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: $space-3;\n  padding-bottom: $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n  &:last-child {\n    padding-bottom: 0;\n    border-bottom: none;\n  }\n\n  .detail-label {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    flex-shrink: 0;\n  }\n\n  .detail-value {\n    font-size: $font-size-sm;\n    color: $gray-800;\n    text-align: right;\n    word-break: break-word;\n  }\n}\n\n//[_ngcontent-%COMP%]   Delivery[_ngcontent-%COMP%]   Grid\n.delivery-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-4;\n\n  @media (max-width: 768px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n.delivery-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-4;\n  background: rgba(0, 0, 0, 0.02);\n  border-radius: $radius-lg;\n\n  .stat-number {\n    font-size: $font-size-3xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .stat-label {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n}\n\n//[_ngcontent-%COMP%]   Data[_ngcontent-%COMP%]   Section[_ngcontent-%COMP%]   (Recipients Table)\n.data-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out;\n}\n\n.data-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n  .data-table {\n  .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n  }\n\n  .p-datatable-tbody > tr > td {\n    vertical-align: middle;\n    padding: $space-3 $space-4;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  }\n\n  .p-datatable-tbody > tr:last-child > td {\n    border-bottom: none;\n  }\n\n  .p-paginator {\n    background: transparent;\n    border: none;\n    padding: $space-3 $space-4;\n  }\n}\n\n.table-row[_ngcontent-%COMP%] {\n  transition: background 150ms;\n\n  &:hover {\n    background: rgba($primary, 0.03);\n  }\n}\n\n.recipient-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n\n  .recipient-name {\n    font-weight: 500;\n    color: $gray-800;\n  }\n\n  .recipient-email {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n.date-text[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-600;\n\n  &.muted {\n    color: $gray-400;\n  }\n}\n\n.click-count[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.text-right[_ngcontent-%COMP%] {\n  text-align: right;\n}\n\n//[_ngcontent-%COMP%]   Animations\n@keyframes[_ngcontent-%COMP%]   fade-in-up[_ngcontent-%COMP%] {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  25% {\n    transform: translate(50px, -30px) scale(1.1);\n  }\n  50% {\n    transform: translate(100px, 20px) scale(0.9);\n  }\n  75% {\n    transform: translate(30px, 50px) scale(1.05);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_pulse-glow {\n  0%, 100% {\n    opacity: 1;\n    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);\n  }\n  50% {\n    opacity: 0.8;\n    box-shadow: 0 0 40px rgba(102, 126, 234, 0.6);\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CampaignEmailDetailPage, [{
        type: Component,
        args: [{ selector: 'app-campaign-email-detail-page', standalone: true, imports: [
                    CommonModule,
                    ButtonModule,
                    TagModule,
                    TableModule,
                    ProgressBarModule,
                    BreadcrumbsComponent
                ], template: "<section class=\"page-container\">\n  <!-- Background Orbs -->\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <!-- Header -->\n  <header class=\"page-header\">\n    <div class=\"header-left\">\n      <app-breadcrumbs></app-breadcrumbs>\n      <button class=\"back-link\" (click)=\"goBack()\">\n        <i class=\"pi pi-arrow-left\"></i>\n        Back to Emails\n      </button>\n    </div>\n  </header>\n\n  @if (loading()) {\n    <div class=\"loading-state\">\n      <i class=\"pi pi-spin pi-spinner\"></i>\n      <span>Loading email details...</span>\n    </div>\n  } @else if (email()) {\n    <!-- Hero Section -->\n    <div class=\"hero-section\">\n      <div class=\"hero-content\">\n        <div class=\"hero-meta\">\n          <p-tag [value]=\"email()!.status\" [severity]=\"getStatusSeverity(email()!.status)\"></p-tag>\n          <button class=\"campaign-link\" (click)=\"viewCampaign()\">\n            <i class=\"pi pi-flag\"></i>\n            {{ email()!.campaignName }}\n          </button>\n        </div>\n        <h1 class=\"hero-title\">{{ email()!.subject }}</h1>\n        <div class=\"hero-info\">\n          <span class=\"info-item\">\n            <i class=\"pi pi-user\"></i>\n            {{ email()!.fromName }}\n          </span>\n          <span class=\"info-item\">\n            <i class=\"pi pi-calendar\"></i>\n            @if (email()!.sentAtUtc) {\n              Sent {{ formatDate(email()!.sentAtUtc) }}\n            } @else if (email()!.scheduledAtUtc) {\n              Scheduled {{ formatDate(email()!.scheduledAtUtc) }}\n            } @else {\n              Created {{ formatDate(email()!.createdAtUtc) }}\n            }\n          </span>\n        </div>\n      </div>\n    </div>\n\n    <!-- Metrics Cards -->\n    <div class=\"metrics-section\">\n      <div class=\"metric-card metric-card--primary\">\n        <div class=\"metric-icon\">\n          <i class=\"pi pi-users\"></i>\n        </div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">Recipients</span>\n          <strong class=\"metric-value\">{{ formatNumber(email()!.recipientCount) }}</strong>\n        </div>\n      </div>\n      <div class=\"metric-card metric-card--sent\">\n        <div class=\"metric-icon\">\n          <i class=\"pi pi-send\"></i>\n        </div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">Delivered</span>\n          <strong class=\"metric-value\">{{ formatNumber(email()!.deliveredCount) }}</strong>\n          <span class=\"metric-rate\">{{ deliveryRate() }}%</span>\n        </div>\n      </div>\n      <div class=\"metric-card metric-card--opens\">\n        <div class=\"metric-icon\">\n          <i class=\"pi pi-eye\"></i>\n        </div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">Opens</span>\n          <strong class=\"metric-value\">{{ formatNumber(email()!.openCount) }}</strong>\n          <span class=\"metric-rate\">{{ computeRate(email()!.openCount, email()!.sentCount) }}%</span>\n        </div>\n      </div>\n      <div class=\"metric-card metric-card--clicks\">\n        <div class=\"metric-icon\">\n          <i class=\"pi pi-external-link\"></i>\n        </div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">Clicks</span>\n          <strong class=\"metric-value\">{{ formatNumber(email()!.clickCount) }}</strong>\n          <span class=\"metric-rate\">{{ computeRate(email()!.clickCount, email()!.sentCount) }}%</span>\n        </div>\n      </div>\n      <div class=\"metric-card metric-card--bounce\">\n        <div class=\"metric-icon\">\n          <i class=\"pi pi-times-circle\"></i>\n        </div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">Bounced</span>\n          <strong class=\"metric-value\">{{ formatNumber(email()!.bounceCount) }}</strong>\n          <span class=\"metric-rate\">{{ computeRate(email()!.bounceCount, email()!.sentCount) }}%</span>\n        </div>\n      </div>\n    </div>\n\n    <!-- Tabs -->\n    <div class=\"tab-section\">\n      <div class=\"tab-buttons\">\n        <button \n          class=\"tab-btn\" \n          [class.active]=\"activeTab() === 'overview'\"\n          (click)=\"setTab('overview')\"\n        >\n          <i class=\"pi pi-chart-bar\"></i>\n          Overview\n        </button>\n        <button \n          class=\"tab-btn\" \n          [class.active]=\"activeTab() === 'recipients'\"\n          (click)=\"setTab('recipients')\"\n        >\n          <i class=\"pi pi-users\"></i>\n          Recipients\n        </button>\n      </div>\n    </div>\n\n    <!-- Overview Tab -->\n    @if (activeTab() === 'overview') {\n      <div class=\"detail-grid\">\n        <!-- Email Performance -->\n        <div class=\"detail-card\">\n          <h3 class=\"card-title\">\n            <i class=\"pi pi-chart-line\"></i>\n            Performance Breakdown\n          </h3>\n          <div class=\"performance-list\">\n            <div class=\"performance-item\">\n              <span class=\"perf-label\">Total Opens</span>\n              <span class=\"perf-value\">{{ formatNumber(email()!.openCount) }}</span>\n              <p-progressBar [value]=\"computeRate(email()!.openCount, email()!.sentCount)\" [showValue]=\"false\" styleClass=\"perf-bar perf-bar--opens\"></p-progressBar>\n            </div>\n            <div class=\"performance-item\">\n              <span class=\"perf-label\">Total Clicks</span>\n              <span class=\"perf-value\">{{ formatNumber(email()!.clickCount) }}</span>\n              <p-progressBar [value]=\"computeRate(email()!.clickCount, email()!.sentCount)\" [showValue]=\"false\" styleClass=\"perf-bar perf-bar--clicks\"></p-progressBar>\n            </div>\n            <div class=\"performance-item\">\n              <span class=\"perf-label\">Unsubscribes</span>\n              <span class=\"perf-value\">{{ formatNumber(email()!.unsubscribeCount) }}</span>\n              <p-progressBar [value]=\"computeRate(email()!.unsubscribeCount, email()!.sentCount)\" [showValue]=\"false\" styleClass=\"perf-bar perf-bar--unsub\"></p-progressBar>\n            </div>\n          </div>\n        </div>\n\n        <!-- Email Details -->\n        <div class=\"detail-card\">\n          <h3 class=\"card-title\">\n            <i class=\"pi pi-envelope\"></i>\n            Email Details\n          </h3>\n          <div class=\"detail-list\">\n            <div class=\"detail-row\">\n              <span class=\"detail-label\">From</span>\n              <span class=\"detail-value\">{{ email()!.fromName }}</span>\n            </div>\n            @if (email()!.replyTo) {\n              <div class=\"detail-row\">\n                <span class=\"detail-label\">Reply-To</span>\n                <span class=\"detail-value\">{{ email()!.replyTo }}</span>\n              </div>\n            }\n            <div class=\"detail-row\">\n              <span class=\"detail-label\">Subject</span>\n              <span class=\"detail-value\">{{ email()!.subject }}</span>\n            </div>\n            <div class=\"detail-row\">\n              <span class=\"detail-label\">Created</span>\n              <span class=\"detail-value\">{{ formatDate(email()!.createdAtUtc) }}</span>\n            </div>\n            @if (email()!.sentAtUtc) {\n              <div class=\"detail-row\">\n                <span class=\"detail-label\">Sent</span>\n                <span class=\"detail-value\">{{ formatDate(email()!.sentAtUtc) }}</span>\n              </div>\n            }\n          </div>\n        </div>\n\n        <!-- Delivery Summary -->\n        <div class=\"detail-card detail-card--full\">\n          <h3 class=\"card-title\">\n            <i class=\"pi pi-check-circle\"></i>\n            Delivery Summary\n          </h3>\n          <div class=\"delivery-grid\">\n            <div class=\"delivery-stat\">\n              <span class=\"stat-number\">{{ formatNumber(email()!.sentCount) }}</span>\n              <span class=\"stat-label\">Sent</span>\n            </div>\n            <div class=\"delivery-stat\">\n              <span class=\"stat-number\">{{ formatNumber(email()!.deliveredCount) }}</span>\n              <span class=\"stat-label\">Delivered</span>\n            </div>\n            <div class=\"delivery-stat\">\n              <span class=\"stat-number\">{{ formatNumber(email()!.bounceCount) }}</span>\n              <span class=\"stat-label\">Bounced</span>\n            </div>\n            <div class=\"delivery-stat\">\n              <span class=\"stat-number\">{{ formatNumber(email()!.unsubscribeCount) }}</span>\n              <span class=\"stat-label\">Unsubscribed</span>\n            </div>\n          </div>\n        </div>\n      </div>\n    }\n\n    <!-- Recipients Tab -->\n    @if (activeTab() === 'recipients') {\n      <div class=\"data-section\">\n        <div class=\"data-card\">\n          <p-table\n            [value]=\"recipients()\"\n            [paginator]=\"true\"\n            [rows]=\"10\"\n            [rowsPerPageOptions]=\"[10, 25, 50]\"\n            [showCurrentPageReport]=\"true\"\n            currentPageReportTemplate=\"Showing {first} to {last} of {totalRecords} recipients\"\n            styleClass=\"data-table\"\n          >\n            <ng-template pTemplate=\"header\">\n              <tr>\n                <th>Recipient</th>\n                <th>Status</th>\n                <th>Opened</th>\n                <th>Clicked</th>\n              </tr>\n            </ng-template>\n            <ng-template pTemplate=\"body\" let-recipient>\n              <tr class=\"table-row\">\n                <td>\n                  <div class=\"recipient-info\">\n                    <span class=\"recipient-name\">{{ recipient.name }}</span>\n                    <span class=\"recipient-email\">{{ recipient.email }}</span>\n                  </div>\n                </td>\n                <td>\n                  <p-tag [value]=\"recipient.status\" [severity]=\"getStatusSeverity(recipient.status)\"></p-tag>\n                </td>\n                <td>\n                  @if (recipient.openedAtUtc) {\n                    <span class=\"date-text\">{{ formatDate(recipient.openedAtUtc) }}</span>\n                  } @else {\n                    <span class=\"date-text muted\">\u2014</span>\n                  }\n                </td>\n                <td>\n                  @if (recipient.clickedAtUtc) {\n                    <span class=\"date-text\">{{ formatDate(recipient.clickedAtUtc) }}</span>\n                  } @else {\n                    <span class=\"date-text muted\">\u2014</span>\n                  }\n                </td>\n              </tr>\n            </ng-template>\n          </p-table>\n        </div>\n      </div>\n    }\n  }\n</section>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n.page-container {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n// Background Orbs\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 600px;\n    height: 600px;\n    background: $primary-gradient;\n    top: -200px;\n    right: -100px;\n  }\n\n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    bottom: 10%;\n    left: -100px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 300px;\n    height: 300px;\n    background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);\n    top: 40%;\n    right: 20%;\n    animation-delay: -14s;\n  }\n}\n\n// Page Header\n.page-header {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.4s ease-out;\n}\n\n.header-left {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.back-link {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $primary;\n  cursor: pointer;\n  transition: all 200ms;\n  width: fit-content;\n\n  &:hover {\n    background: white;\n    transform: translateX(-2px);\n    box-shadow: $glass-shadow;\n  }\n\n  i {\n    font-size: 14px;\n  }\n}\n\n// Loading State\n.loading-state {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: $space-3;\n  min-height: 400px;\n  color: $gray-500;\n\n  i {\n    font-size: 2rem;\n    color: $primary;\n  }\n}\n\n// Hero Section\n.hero-section {\n  position: relative;\n  z-index: 1;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  padding: $space-5;\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.5s ease-out;\n}\n\n.hero-meta {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  margin-bottom: $space-3;\n}\n\n.campaign-link {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: rgba($primary, 0.1);\n  border: none;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $primary;\n  cursor: pointer;\n  transition: all 200ms;\n\n  &:hover {\n    background: rgba($primary, 0.15);\n  }\n}\n\n.hero-title {\n  font-size: $font-size-3xl;\n  font-weight: 700;\n  color: $gray-800;\n  margin: 0 0 $space-2;\n  line-height: 1.2;\n}\n\n.hero-preview {\n  font-size: $font-size-base;\n  color: $gray-500;\n  margin: 0 0 $space-3;\n  line-height: 1.5;\n}\n\n.hero-info {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-4;\n}\n\n.info-item {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-sm;\n  color: $gray-600;\n\n  i {\n    font-size: 14px;\n    color: $gray-400;\n  }\n}\n\n// Metrics Section\n.metrics-section {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.5s ease-out 0.1s both;\n\n  @media (max-width: 1400px) {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .metric-icon {\n      transform: scale(1.1);\n    }\n  }\n\n  .metric-icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-lg;\n    color: white;\n    flex-shrink: 0;\n    transition: transform 300ms;\n  }\n\n  &--primary .metric-icon {\n    background: $primary-gradient;\n  }\n\n  &--sent .metric-icon {\n    background: $cyan-gradient;\n  }\n\n  &--opens .metric-icon {\n    background: $success-gradient;\n  }\n\n  &--clicks .metric-icon {\n    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\n  }\n\n  &--bounce .metric-icon {\n    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);\n  }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .metric-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .metric-rate {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n// Tab Section\n.tab-section {\n  position: relative;\n  z-index: 1;\n  margin-bottom: $space-4;\n}\n\n.tab-buttons {\n  display: flex;\n  gap: $space-2;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  padding: $space-1;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n}\n\n.tab-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  background: transparent;\n  border: none;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-600;\n  cursor: pointer;\n  transition: all 200ms;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.05);\n    color: $gray-800;\n  }\n\n  &.active {\n    background: $primary-gradient;\n    color: white;\n    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n  }\n\n  i {\n    font-size: 14px;\n  }\n}\n\n// Detail Grid\n.detail-grid {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: $space-4;\n  animation: fade-in-up 0.5s ease-out;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-card {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  padding: $space-4;\n\n  &--full {\n    grid-column: 1 / -1;\n  }\n}\n\n.card-title {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: $gray-800;\n  margin: 0 0 $space-4;\n  padding-bottom: $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  i {\n    width: 32px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba($cyan, 0.15);\n    color: $cyan;\n    border-radius: $radius-md;\n    font-size: 14px;\n  }\n}\n\n// Performance List\n.performance-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.performance-item {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-2;\n  align-items: center;\n\n  .perf-label {\n    font-size: $font-size-sm;\n    color: $gray-600;\n  }\n\n  .perf-value {\n    font-size: $font-size-base;\n    font-weight: 600;\n    color: $gray-800;\n    text-align: right;\n  }\n\n  ::ng-deep .perf-bar {\n    grid-column: 1 / -1;\n    height: 6px;\n    border-radius: $radius-full;\n\n    .p-progressbar-value {\n      border-radius: $radius-full;\n    }\n\n    &--opens .p-progressbar-value {\n      background: $success-gradient;\n    }\n\n    &--clicks .p-progressbar-value {\n      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\n    }\n\n    &--unsub .p-progressbar-value {\n      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);\n    }\n\n    &--spam .p-progressbar-value {\n      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);\n    }\n  }\n}\n\n// Detail List\n.detail-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.detail-row {\n  display: flex;\n  justify-content: space-between;\n  gap: $space-3;\n  padding-bottom: $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n  &:last-child {\n    padding-bottom: 0;\n    border-bottom: none;\n  }\n\n  .detail-label {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    flex-shrink: 0;\n  }\n\n  .detail-value {\n    font-size: $font-size-sm;\n    color: $gray-800;\n    text-align: right;\n    word-break: break-word;\n  }\n}\n\n// Delivery Grid\n.delivery-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-4;\n\n  @media (max-width: 768px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n.delivery-stat {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-4;\n  background: rgba(0, 0, 0, 0.02);\n  border-radius: $radius-lg;\n\n  .stat-number {\n    font-size: $font-size-3xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .stat-label {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n}\n\n// Data Section (Recipients Table)\n.data-section {\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out;\n}\n\n.data-card {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n::ng-deep .data-table {\n  .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n  }\n\n  .p-datatable-tbody > tr > td {\n    vertical-align: middle;\n    padding: $space-3 $space-4;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  }\n\n  .p-datatable-tbody > tr:last-child > td {\n    border-bottom: none;\n  }\n\n  .p-paginator {\n    background: transparent;\n    border: none;\n    padding: $space-3 $space-4;\n  }\n}\n\n.table-row {\n  transition: background 150ms;\n\n  &:hover {\n    background: rgba($primary, 0.03);\n  }\n}\n\n.recipient-info {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n\n  .recipient-name {\n    font-weight: 500;\n    color: $gray-800;\n  }\n\n  .recipient-email {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n.date-text {\n  font-size: $font-size-sm;\n  color: $gray-600;\n\n  &.muted {\n    color: $gray-400;\n  }\n}\n\n.click-count {\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.text-right {\n  text-align: right;\n}\n\n// Animations\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes orb-float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  25% {\n    transform: translate(50px, -30px) scale(1.1);\n  }\n  50% {\n    transform: translate(100px, 20px) scale(0.9);\n  }\n  75% {\n    transform: translate(30px, 50px) scale(1.05);\n  }\n}\n\n@keyframes pulse-glow {\n  0%, 100% {\n    opacity: 1;\n    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);\n  }\n  50% {\n    opacity: 0.8;\n    box-shadow: 0 0 40px rgba(102, 126, 234, 0.6);\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CampaignEmailDetailPage, { className: "CampaignEmailDetailPage", filePath: "src/app/crm/features/marketing/pages/campaign-email-detail.page.ts", lineNumber: 27 }); })();
