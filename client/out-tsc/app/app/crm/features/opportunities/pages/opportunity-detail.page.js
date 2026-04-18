import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { OpportunityDataService } from '../services/opportunity-data.service';
import { ActivityDataService } from '../../activities/services/activity-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/tooltip";
import * as i4 from "primeng/skeleton";
const _c0 = a0 => ["/app/deals", a0, "edit"];
function OpportunityDetailPage_div_5_ng_container_1_a_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 67);
    i0.ɵɵelement(1, "i", 68);
    i0.ɵɵtext(2, " Edit ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const opp_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵproperty("routerLink", "/app/deals/" + opp_r1.id + "/edit");
} }
function OpportunityDetailPage_div_5_ng_container_1_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const opp_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", opp_r1.account, " ");
} }
function OpportunityDetailPage_div_5_ng_container_1_strong_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong", 42);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const hs_r2 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵstyleProp("color", ctx_r2.healthScoreColor(hs_r2.score));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", hs_r2.score, "/100");
} }
function OpportunityDetailPage_div_5_ng_container_1_ng_template_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong", 71);
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function OpportunityDetailPage_div_5_ng_container_1_div_109_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58)(1, "span", 59);
    i0.ɵɵtext(2, "Updated");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 60);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const opp_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, opp_r1.updatedAtUtc, "MMM d, yyyy"));
} }
function OpportunityDetailPage_div_5_ng_container_1_div_110_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72)(1, "span", 59);
    i0.ɵɵtext(2, "Summary");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 73);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const opp_r1 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(opp_r1.summary);
} }
function OpportunityDetailPage_div_5_ng_container_1_section_111_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 78);
} if (rf & 2) {
    const sd_r4 = ctx.$implicit;
    i0.ɵɵstyleProp("flex", sd_r4.durationDays || 1);
    i0.ɵɵclassProp("stage-bar__segment--current", sd_r4.isCurrent);
    i0.ɵɵproperty("pTooltip", sd_r4.stage + ": " + sd_r4.durationDays + " days");
} }
function OpportunityDetailPage_div_5_ng_container_1_section_111_div_7_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 84);
    i0.ɵɵtext(1, "current");
    i0.ɵɵelementEnd();
} }
function OpportunityDetailPage_div_5_ng_container_1_section_111_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 79);
    i0.ɵɵelement(1, "span", 80);
    i0.ɵɵelementStart(2, "span", 81);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 82);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, OpportunityDetailPage_div_5_ng_container_1_section_111_div_7_span_6_Template, 2, 0, "span", 83);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const sd_r5 = ctx.$implicit;
    i0.ɵɵclassProp("stage-item--current", sd_r5.isCurrent);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("stage-dot--current", sd_r5.isCurrent);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(sd_r5.stage);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", sd_r5.durationDays, "d");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", sd_r5.isCurrent);
} }
function OpportunityDetailPage_div_5_ng_container_1_section_111_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 54)(1, "h2", 55);
    i0.ɵɵelement(2, "i", 39);
    i0.ɵɵtext(3, " Stage Timeline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 74);
    i0.ɵɵtemplate(5, OpportunityDetailPage_div_5_ng_container_1_section_111_div_5_Template, 1, 5, "div", 75);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 76);
    i0.ɵɵtemplate(7, OpportunityDetailPage_div_5_ng_container_1_section_111_div_7_Template, 7, 7, "div", 77);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r2.stageDurations());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.stageDurations());
} }
function OpportunityDetailPage_div_5_ng_container_1_section_112_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 88)(1, "div", 89)(2, "span", 90);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 91);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 92);
    i0.ɵɵelement(7, "div", 93);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const f_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(f_r6.factor);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", f_r6.score, "/", f_r6.maxScore);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", f_r6.score / f_r6.maxScore * 100, "%")("background", ctx_r2.healthScoreColor(f_r6.score / f_r6.maxScore * 100));
} }
function OpportunityDetailPage_div_5_ng_container_1_section_112_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 94);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const hs_r7 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(hs_r7.rationale);
} }
function OpportunityDetailPage_div_5_ng_container_1_section_112_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 54)(1, "h2", 55);
    i0.ɵɵelement(2, "i", 44);
    i0.ɵɵtext(3, " Health Breakdown");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 85);
    i0.ɵɵtemplate(5, OpportunityDetailPage_div_5_ng_container_1_section_112_div_5_Template, 8, 7, "div", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, OpportunityDetailPage_div_5_ng_container_1_section_112_p_6_Template, 2, 1, "p", 87);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const hs_r7 = ctx.ngIf;
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", hs_r7.factors);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", hs_r7.rationale);
} }
function OpportunityDetailPage_div_5_ng_container_1_div_118_div_1_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 104);
    i0.ɵɵelement(1, "i", 105);
    i0.ɵɵelementEnd();
} }
function OpportunityDetailPage_div_5_ng_container_1_div_118_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 97)(1, "div", 98);
    i0.ɵɵelement(2, "img", 99);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 100)(4, "span", 101);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 102);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, OpportunityDetailPage_div_5_ng_container_1_div_118_div_1_span_8_Template, 2, 0, "span", 103);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cr_r8 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", cr_r8.profilePictureUrl || "https://i.pravatar.cc/150?u=" + (cr_r8.email || cr_r8.contactId || cr_r8.id), i0.ɵɵsanitizeUrl)("alt", (cr_r8.contactName || "Stakeholder") + " avatar")("title", (cr_r8.contactName || "Stakeholder") + " avatar");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(cr_r8.contactName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(cr_r8.role);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", cr_r8.isPrimary);
} }
function OpportunityDetailPage_div_5_ng_container_1_div_118_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 95);
    i0.ɵɵtemplate(1, OpportunityDetailPage_div_5_ng_container_1_div_118_div_1_Template, 9, 6, "div", 96);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.contactRoles());
} }
function OpportunityDetailPage_div_5_ng_container_1_ng_template_119_button_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 109);
    i0.ɵɵelement(1, "i", 110);
    i0.ɵɵtext(2, " Add Stakeholder ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_10_0;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(1, _c0, (tmp_10_0 = ctx_r2.opportunity()) == null ? null : tmp_10_0.id));
} }
function OpportunityDetailPage_div_5_ng_container_1_ng_template_119_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 106)(1, "p", 107);
    i0.ɵɵtext(2, "No stakeholders assigned.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, OpportunityDetailPage_div_5_ng_container_1_ng_template_119_button_3_Template, 3, 3, "button", 108);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.canEdit);
} }
function OpportunityDetailPage_div_5_ng_container_1_div_125_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 113)(1, "div", 114);
    i0.ɵɵelement(2, "img", 99);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 115)(4, "span", 116);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 117);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const tm_r9 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", tm_r9.profilePictureUrl || "https://i.pravatar.cc/150?u=" + (tm_r9.userId || tm_r9.userName), i0.ɵɵsanitizeUrl)("alt", (tm_r9.userName || "Team member") + " avatar")("title", (tm_r9.userName || "Team member") + " avatar");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(tm_r9.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tm_r9.role);
} }
function OpportunityDetailPage_div_5_ng_container_1_div_125_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 111);
    i0.ɵɵtemplate(1, OpportunityDetailPage_div_5_ng_container_1_div_125_div_1_Template, 8, 5, "div", 112);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.teamMembers());
} }
function OpportunityDetailPage_div_5_ng_container_1_ng_template_126_button_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 109);
    i0.ɵɵelement(1, "i", 110);
    i0.ɵɵtext(2, " Add Team Member ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_10_0;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(1, _c0, (tmp_10_0 = ctx_r2.opportunity()) == null ? null : tmp_10_0.id));
} }
function OpportunityDetailPage_div_5_ng_container_1_ng_template_126_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 106)(1, "p", 107);
    i0.ɵɵtext(2, "No team members assigned.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, OpportunityDetailPage_div_5_ng_container_1_ng_template_126_button_3_Template, 3, 3, "button", 108);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.canEdit);
} }
function OpportunityDetailPage_div_5_ng_container_1_div_132_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 120)(1, "div", 121);
    i0.ɵɵelement(2, "i", 122);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 123)(4, "span", 124);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 125);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const act_r10 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r2.activityIcon(act_r10.type));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(act_r10.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", act_r10.type, " \u00B7 ", i0.ɵɵpipeBind2(8, 4, act_r10.createdAtUtc, "MMM d"), " ");
} }
function OpportunityDetailPage_div_5_ng_container_1_div_132_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 118);
    i0.ɵɵtemplate(1, OpportunityDetailPage_div_5_ng_container_1_div_132_div_1_Template, 9, 7, "div", 119);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.activities());
} }
function OpportunityDetailPage_div_5_ng_container_1_ng_template_133_button_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 109);
    i0.ɵɵelement(1, "i", 110);
    i0.ɵɵtext(2, " Log Activity ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_10_0;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(1, _c0, (tmp_10_0 = ctx_r2.opportunity()) == null ? null : tmp_10_0.id));
} }
function OpportunityDetailPage_div_5_ng_container_1_ng_template_133_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 106)(1, "p", 107);
    i0.ɵɵtext(2, "No activities recorded.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, OpportunityDetailPage_div_5_ng_container_1_ng_template_133_button_3_Template, 3, 3, "button", 108);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.canEdit);
} }
function OpportunityDetailPage_div_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "header", 13)(2, "div", 14);
    i0.ɵɵelement(3, "app-breadcrumbs");
    i0.ɵɵelementStart(4, "div", 15)(5, "a", 16);
    i0.ɵɵelement(6, "i", 17);
    i0.ɵɵtext(7, " Deals ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, OpportunityDetailPage_div_5_ng_container_1_a_8_Template, 3, 1, "a", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "h1", 19)(10, "span", 20);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 21)(13, "span", 22);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 23);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, OpportunityDetailPage_div_5_ng_container_1_span_17_Template, 3, 1, "span", 24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 25)(19, "div", 26)(20, "span", 27);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span", 28);
    i0.ɵɵtext(23, "Deal value");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 29)(25, "div", 30);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(26, "svg", 31);
    i0.ɵɵelement(27, "path", 32)(28, "path", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(29, "span", 34);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "span", 35);
    i0.ɵɵtext(32, "Win probability");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(33, "section", 36)(34, "div", 37)(35, "div", 38);
    i0.ɵɵelement(36, "i", 39);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "div", 40)(38, "span", 41);
    i0.ɵɵtext(39, "Deal Age");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "strong", 42);
    i0.ɵɵtext(41);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(42, "div", 43)(43, "div", 38);
    i0.ɵɵelement(44, "i", 44);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "div", 40)(46, "span", 41);
    i0.ɵɵtext(47, "Health Score");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(48, OpportunityDetailPage_div_5_ng_container_1_strong_48_Template, 2, 3, "strong", 45)(49, OpportunityDetailPage_div_5_ng_container_1_ng_template_49_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(51, "div", 46)(52, "div", 38);
    i0.ɵɵelement(53, "i", 47);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "div", 40)(55, "span", 41);
    i0.ɵɵtext(56, "Team");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "strong", 42);
    i0.ɵɵtext(58);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(59, "div", 48)(60, "div", 38);
    i0.ɵɵelement(61, "i", 49);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "div", 40)(63, "span", 41);
    i0.ɵɵtext(64, "Stakeholders");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "strong", 42);
    i0.ɵɵtext(66);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(67, "div", 50)(68, "div", 38);
    i0.ɵɵelement(69, "i", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "div", 40)(71, "span", 41);
    i0.ɵɵtext(72, "Activities");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "strong", 42);
    i0.ɵɵtext(74);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(75, "div", 52)(76, "div", 53)(77, "section", 54)(78, "h2", 55);
    i0.ɵɵelement(79, "i", 56);
    i0.ɵɵtext(80, " Key Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "div", 57)(82, "div", 58)(83, "span", 59);
    i0.ɵɵtext(84, "Close Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(85, "span", 60);
    i0.ɵɵtext(86);
    i0.ɵɵpipe(87, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(88, "div", 58)(89, "span", 59);
    i0.ɵɵtext(90, "Forecast");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(91, "span", 60);
    i0.ɵɵtext(92);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(93, "div", 58)(94, "span", 59);
    i0.ɵɵtext(95, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(96, "span", 60);
    i0.ɵɵtext(97);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(98, "div", 58)(99, "span", 59);
    i0.ɵɵtext(100, "Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(101, "span", 60);
    i0.ɵɵtext(102);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(103, "div", 58)(104, "span", 59);
    i0.ɵɵtext(105, "Created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(106, "span", 60);
    i0.ɵɵtext(107);
    i0.ɵɵpipe(108, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(109, OpportunityDetailPage_div_5_ng_container_1_div_109_Template, 6, 4, "div", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(110, OpportunityDetailPage_div_5_ng_container_1_div_110_Template, 5, 1, "div", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(111, OpportunityDetailPage_div_5_ng_container_1_section_111_Template, 8, 2, "section", 63)(112, OpportunityDetailPage_div_5_ng_container_1_section_112_Template, 7, 2, "section", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(113, "div", 53)(114, "section", 54)(115, "h2", 55);
    i0.ɵɵelement(116, "i", 49);
    i0.ɵɵtext(117, " Stakeholders");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(118, OpportunityDetailPage_div_5_ng_container_1_div_118_Template, 2, 1, "div", 64)(119, OpportunityDetailPage_div_5_ng_container_1_ng_template_119_Template, 4, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(121, "section", 54)(122, "h2", 55);
    i0.ɵɵelement(123, "i", 47);
    i0.ɵɵtext(124, " Team");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(125, OpportunityDetailPage_div_5_ng_container_1_div_125_Template, 2, 1, "div", 65)(126, OpportunityDetailPage_div_5_ng_container_1_ng_template_126_Template, 4, 1, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(128, "section", 54)(129, "h2", 55);
    i0.ɵɵelement(130, "i", 51);
    i0.ɵɵtext(131, " Recent Activities");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(132, OpportunityDetailPage_div_5_ng_container_1_div_132_Template, 2, 1, "div", 66)(133, OpportunityDetailPage_div_5_ng_container_1_ng_template_133_Template, 4, 1, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const opp_r1 = ctx.ngIf;
    const noHealth_r11 = i0.ɵɵreference(50);
    const noStakeholders_r12 = i0.ɵɵreference(120);
    const noTeam_r13 = i0.ɵɵreference(127);
    const noActivities_r14 = i0.ɵɵreference(134);
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r2.canEdit);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(opp_r1.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r2.statusClass(opp_r1.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(opp_r1.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r2.stageBadgeClass(opp_r1.stage));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(opp_r1.stage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", opp_r1.account);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.formatCurrency(opp_r1.amount, opp_r1.currency));
    i0.ɵɵadvance(7);
    i0.ɵɵattribute("stroke-dasharray", opp_r1.probability + ", 100");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", opp_r1.probability, "%");
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate1("", ctx_r2.dealAgeDays(), "d");
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r2.healthScore())("ngIfElse", noHealth_r11);
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate(ctx_r2.teamMembers().length);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.contactRoles().length);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.activities().length);
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate(opp_r1.closeDate ? i0.ɵɵpipeBind2(87, 31, opp_r1.closeDate, "MMM d, yyyy") : "\u2014");
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(opp_r1.forecastCategory || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(opp_r1.opportunityType || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(opp_r1.owner || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(108, 34, opp_r1.createdAtUtc, "MMM d, yyyy"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", opp_r1.updatedAtUtc);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", opp_r1.summary);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.stageDurations().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.healthScore());
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r2.contactRoles().length)("ngIfElse", noStakeholders_r12);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r2.teamMembers().length)("ngIfElse", noTeam_r13);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r2.activities().length)("ngIfElse", noActivities_r14);
} }
function OpportunityDetailPage_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11);
    i0.ɵɵtemplate(1, OpportunityDetailPage_div_5_ng_container_1_Template, 135, 37, "ng-container", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.opportunity());
} }
function OpportunityDetailPage_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 126);
    i0.ɵɵelement(1, "p-skeleton", 127)(2, "p-skeleton", 128);
    i0.ɵɵelementStart(3, "div", 129);
    i0.ɵɵelement(4, "p-skeleton", 130)(5, "p-skeleton", 130);
    i0.ɵɵelementEnd()();
} }
export class OpportunityDetailPage {
    route = inject(ActivatedRoute);
    router = inject(Router);
    opportunityData = inject(OpportunityDataService);
    activityData = inject(ActivityDataService);
    opportunity = signal(null, ...(ngDevMode ? [{ debugName: "opportunity" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    healthScore = signal(null, ...(ngDevMode ? [{ debugName: "healthScore" }] : []));
    healthLoading = signal(false, ...(ngDevMode ? [{ debugName: "healthLoading" }] : []));
    stageHistory = signal([], ...(ngDevMode ? [{ debugName: "stageHistory" }] : []));
    historyLoading = signal(false, ...(ngDevMode ? [{ debugName: "historyLoading" }] : []));
    contactRoles = signal([], ...(ngDevMode ? [{ debugName: "contactRoles" }] : []));
    contactRolesLoading = signal(false, ...(ngDevMode ? [{ debugName: "contactRolesLoading" }] : []));
    teamMembers = signal([], ...(ngDevMode ? [{ debugName: "teamMembers" }] : []));
    teamLoading = signal(false, ...(ngDevMode ? [{ debugName: "teamLoading" }] : []));
    activities = signal([], ...(ngDevMode ? [{ debugName: "activities" }] : []));
    activitiesLoading = signal(false, ...(ngDevMode ? [{ debugName: "activitiesLoading" }] : []));
    canEdit = tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.opportunitiesManage);
    dealAgeDays = computed(() => {
        const opp = this.opportunity();
        if (!opp)
            return 0;
        const diffMs = Date.now() - new Date(opp.createdAtUtc).getTime();
        return Math.max(Math.round(diffMs / 86_400_000), 0);
    }, ...(ngDevMode ? [{ debugName: "dealAgeDays" }] : []));
    stageDurations = computed(() => {
        const history = this.stageHistory();
        if (!history.length)
            return [];
        const sorted = [...history].sort((a, b) => new Date(a.changedAtUtc).getTime() - new Date(b.changedAtUtc).getTime());
        const durations = [];
        for (let i = 0; i < sorted.length; i++) {
            const enteredAt = new Date(sorted[i].changedAtUtc);
            const exitedAt = i + 1 < sorted.length ? new Date(sorted[i + 1].changedAtUtc) : null;
            const diffMs = (exitedAt ?? new Date()).getTime() - enteredAt.getTime();
            durations.push({
                stage: sorted[i].stage,
                durationDays: Math.max(Math.round(diffMs / 86_400_000), 0),
                isCurrent: !exitedAt
            });
        }
        return durations;
    }, ...(ngDevMode ? [{ debugName: "stageDurations" }] : []));
    maxStageDays = computed(() => {
        const durations = this.stageDurations();
        if (!durations.length)
            return 1;
        return Math.max(...durations.map((d) => d.durationDays), 1);
    }, ...(ngDevMode ? [{ debugName: "maxStageDays" }] : []));
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigate(['/app/deals']);
            return;
        }
        this.loadOpportunity(id);
        this.loadHealthScore(id);
        this.loadStageHistory(id);
        this.loadContactRoles(id);
        this.loadTeam(id);
        this.loadActivities(id);
    }
    loadOpportunity(id) {
        this.loading.set(true);
        this.opportunityData.getById(id).subscribe({
            next: (opp) => {
                this.opportunity.set(opp);
                this.loading.set(false);
            },
            error: () => {
                this.router.navigate(['/app/deals']);
            }
        });
    }
    loadHealthScore(id) {
        this.healthLoading.set(true);
        this.opportunityData.getHealthScore(id).subscribe({
            next: (hs) => {
                this.healthScore.set(hs);
                this.healthLoading.set(false);
            },
            error: () => {
                this.healthScore.set(null);
                this.healthLoading.set(false);
            }
        });
    }
    loadStageHistory(id) {
        this.historyLoading.set(true);
        this.opportunityData.getHistory(id).subscribe({
            next: (items) => {
                this.stageHistory.set(items);
                this.historyLoading.set(false);
            },
            error: () => {
                this.stageHistory.set([]);
                this.historyLoading.set(false);
            }
        });
    }
    loadContactRoles(id) {
        this.contactRolesLoading.set(true);
        this.opportunityData.getContactRoles(id).subscribe({
            next: (roles) => {
                this.contactRoles.set(roles);
                this.contactRolesLoading.set(false);
            },
            error: () => {
                this.contactRoles.set([]);
                this.contactRolesLoading.set(false);
            }
        });
    }
    loadTeam(id) {
        this.teamLoading.set(true);
        this.opportunityData.getTeam(id).subscribe({
            next: (members) => {
                this.teamMembers.set(members);
                this.teamLoading.set(false);
            },
            error: () => {
                this.teamMembers.set([]);
                this.teamLoading.set(false);
            }
        });
    }
    loadActivities(id) {
        this.activitiesLoading.set(true);
        this.activityData
            .search({ relatedEntityType: 'Opportunity', relatedEntityId: id, pageSize: 5, page: 1 })
            .subscribe({
            next: (res) => {
                this.activities.set(res.items ?? []);
                this.activitiesLoading.set(false);
            },
            error: () => {
                this.activities.set([]);
                this.activitiesLoading.set(false);
            }
        });
    }
    healthScoreColor(score) {
        if (score >= 80)
            return '#22c55e';
        if (score >= 60)
            return '#3b82f6';
        if (score >= 40)
            return '#f59e0b';
        if (score >= 20)
            return '#f97316';
        return '#ef4444';
    }
    stageBadgeClass(stage) {
        const s = (stage || '').toLowerCase();
        if (s.includes('won'))
            return 'stage-badge--won';
        if (s.includes('lost'))
            return 'stage-badge--lost';
        if (s.includes('negot'))
            return 'stage-badge--negotiation';
        if (s.includes('proposal'))
            return 'stage-badge--proposal';
        if (s.includes('qualif'))
            return 'stage-badge--qualification';
        return 'stage-badge--default';
    }
    statusClass(status) {
        if (status === 'Open')
            return 'status--open';
        if (status === 'Closed Won')
            return 'status--won';
        if (status === 'Closed Lost')
            return 'status--lost';
        return 'status--default';
    }
    formatCurrency(amount, currency) {
        try {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 0 }).format(amount);
        }
        catch {
            return `${currency || '$'} ${amount.toLocaleString()}`;
        }
    }
    activityIcon(type) {
        const t = (type || '').toLowerCase();
        if (t.includes('call'))
            return 'pi-phone';
        if (t.includes('email'))
            return 'pi-envelope';
        if (t.includes('meet'))
            return 'pi-video';
        if (t.includes('note'))
            return 'pi-file';
        if (t.includes('task'))
            return 'pi-check-square';
        return 'pi-clock';
    }
    static ɵfac = function OpportunityDetailPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OpportunityDetailPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OpportunityDetailPage, selectors: [["app-opportunity-detail"]], decls: 8, vars: 2, consts: [["pageLoading", ""], ["noHealth", ""], ["noStakeholders", ""], ["noTeam", ""], ["noActivities", ""], [1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], ["class", "page-content", 4, "ngIf", "ngIfElse"], [1, "page-content"], [4, "ngIf"], [1, "hero-section"], [1, "hero-left"], [1, "hero-nav"], ["routerLink", "/app/deals", 1, "back-link"], [1, "pi", "pi-arrow-left"], ["class", "edit-link", 3, "routerLink", 4, "ngIf"], [1, "hero-title"], [1, "title-gradient"], [1, "hero-meta"], [1, "hero-badge", 3, "ngClass"], [1, "hero-stage", 3, "ngClass"], ["class", "hero-account", 4, "ngIf"], [1, "hero-right"], [1, "hero-amount"], [1, "hero-amount-value"], [1, "hero-amount-label"], [1, "hero-probability"], [1, "probability-ring"], ["viewBox", "0 0 36 36"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-bg"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill"], [1, "probability-value"], [1, "probability-label"], [1, "kpi-section"], [1, "kpi-card", "kpi-card--age"], [1, "kpi-icon"], [1, "pi", "pi-stopwatch"], [1, "kpi-content"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-card", "kpi-card--health"], [1, "pi", "pi-heart"], ["class", "kpi-value", 3, "color", 4, "ngIf", "ngIfElse"], [1, "kpi-card", "kpi-card--team"], [1, "pi", "pi-users"], [1, "kpi-card", "kpi-card--stakeholders"], [1, "pi", "pi-id-card"], [1, "kpi-card", "kpi-card--activities"], [1, "pi", "pi-clock"], [1, "detail-grid"], [1, "detail-col"], [1, "detail-card"], [1, "card-title"], [1, "pi", "pi-info-circle"], [1, "detail-fields"], [1, "detail-field"], [1, "field-label"], [1, "field-value"], ["class", "detail-field", 4, "ngIf"], ["class", "detail-summary", 4, "ngIf"], ["class", "detail-card", 4, "ngIf"], ["class", "stakeholder-list", 4, "ngIf", "ngIfElse"], ["class", "team-list", 4, "ngIf", "ngIfElse"], ["class", "activity-list", 4, "ngIf", "ngIfElse"], [1, "edit-link", 3, "routerLink"], [1, "pi", "pi-pencil"], [1, "hero-account"], [1, "pi", "pi-building"], [1, "kpi-value", "kpi-value--muted"], [1, "detail-summary"], [1, "summary-text"], [1, "stage-bar"], ["class", "stage-bar__segment", "tooltipPosition", "top", 3, "flex", "stage-bar__segment--current", "pTooltip", 4, "ngFor", "ngForOf"], [1, "stage-list"], ["class", "stage-item", 3, "stage-item--current", 4, "ngFor", "ngForOf"], ["tooltipPosition", "top", 1, "stage-bar__segment", 3, "pTooltip"], [1, "stage-item"], [1, "stage-dot"], [1, "stage-name"], [1, "stage-days"], ["class", "stage-current-tag", 4, "ngIf"], [1, "stage-current-tag"], [1, "health-factors"], ["class", "health-factor", 4, "ngFor", "ngForOf"], ["class", "health-rationale", 4, "ngIf"], [1, "health-factor"], [1, "factor-header"], [1, "factor-name"], [1, "factor-score"], [1, "factor-bar"], [1, "factor-bar__fill"], [1, "health-rationale"], [1, "stakeholder-list"], ["class", "stakeholder-item", 4, "ngFor", "ngForOf"], [1, "stakeholder-item"], [1, "stakeholder-avatar"], [3, "src", "alt", "title"], [1, "stakeholder-info"], [1, "stakeholder-name"], [1, "stakeholder-role"], ["class", "stakeholder-primary", "pTooltip", "Primary contact", "tooltipPosition", "left", 4, "ngIf"], ["pTooltip", "Primary contact", "tooltipPosition", "left", 1, "stakeholder-primary"], [1, "pi", "pi-star-fill"], [1, "empty-state-cta"], [1, "empty-text"], ["type", "button", "class", "cta-link", 3, "routerLink", 4, "ngIf"], ["type", "button", 1, "cta-link", 3, "routerLink"], [1, "pi", "pi-plus"], [1, "team-list"], ["class", "team-item", 4, "ngFor", "ngForOf"], [1, "team-item"], [1, "team-avatar"], [1, "team-info"], [1, "team-name"], [1, "team-role"], [1, "activity-list"], ["class", "activity-item", 4, "ngFor", "ngForOf"], [1, "activity-item"], [1, "activity-icon"], [1, "pi", 3, "ngClass"], [1, "activity-info"], [1, "activity-subject"], [1, "activity-meta"], [1, "page-loading"], ["width", "60%", "height", "2rem", "styleClass", "mb-3"], ["width", "40%", "height", "1.5rem", "styleClass", "mb-4"], [1, "loading-grid"], ["width", "100%", "height", "200px"]], template: function OpportunityDetailPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 5)(1, "div", 6);
            i0.ɵɵelement(2, "div", 7)(3, "div", 8)(4, "div", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, OpportunityDetailPage_div_5_Template, 2, 1, "div", 10)(6, OpportunityDetailPage_ng_template_6_Template, 6, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const pageLoading_r15 = i0.ɵɵreference(7);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", !ctx.loading())("ngIfElse", pageLoading_r15);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, RouterModule, i2.RouterLink, TooltipModule, i3.Tooltip, SkeletonModule, i4.Skeleton, BreadcrumbsComponent, i1.DatePipe], styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   Deal[_ngcontent-%COMP%]   360[_ngcontent-%COMP%]   Detail[_ngcontent-%COMP%]   Page\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n\n  &.orb-1 { width: 600px; height: 600px; background: $primary-gradient; top: -200px; right: -100px; }\n  &.orb-2 { width: 400px; height: 400px; background: $cyan-gradient; bottom: 10%; left: -100px; animation-delay: -7s; }\n  &.orb-3 { width: 300px; height: 300px; background: $secondary-gradient; top: 40%; right: 20%; animation-delay: -14s; }\n}\n\n.page-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   HERO[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.hero-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  align-items: center;\n  margin-bottom: $space-2;\n}\n\n.back-link[_ngcontent-%COMP%], \n.edit-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  text-decoration: none;\n  border-radius: $radius-md;\n  padding: $space-1 $space-3;\n  transition: all 200ms;\n\n  i { font-size: 0.75rem; }\n}\n\n.back-link[_ngcontent-%COMP%] {\n  color: $gray-500;\n  background: $glass-bg-subtle;\n  border: 1px solid $glass-border;\n\n  &:hover {\n    color: $gray-800;\n    background: white;\n  }\n}\n\n.edit-link[_ngcontent-%COMP%] {\n  color: white;\n  background: $primary-gradient;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n  }\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-2;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: _ngcontent-%COMP%_gradient-shift 4s ease-in-out infinite;\n  }\n}\n\n.hero-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.hero-badge[_ngcontent-%COMP%], \n.hero-stage[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 2px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  text-transform: capitalize;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  background: rgba($gray-500, 0.15);\n  color: $gray-600;\n\n  &.status--open { background: rgba(#3b82f6, 0.15); color: #3b82f6; }\n  &.status--won { background: rgba($success, 0.15); color: color.adjust($success, $lightness: -15%); }\n  &.status--lost { background: rgba(#ef4444, 0.15); color: #ef4444; }\n}\n\n.hero-stage[_ngcontent-%COMP%] {\n  background: rgba($cyan, 0.12);\n  color: color.adjust($cyan, $lightness: -15%);\n}\n\n.hero-account[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  color: $gray-500;\n\n  i { font-size: 0.75rem; }\n}\n\n.hero-right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-4;\n  align-items: center;\n\n  @media (max-width: 1024px) {\n    justify-content: flex-start;\n  }\n}\n\n.hero-amount[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n\n  &-value {\n    font-size: $font-size-3xl;\n    font-weight: 800;\n    color: $gray-800;\n  }\n\n  &-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n}\n\n.hero-probability[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n}\n\n.probability-ring[_ngcontent-%COMP%] {\n  position: relative;\n  width: 56px;\n  height: 56px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: $gray-200;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke: #667eea;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n  }\n}\n\n.probability-value[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n.probability-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   KPI[_ngcontent-%COMP%]   CARDS[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.kpi-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); }\n  @media (max-width: 768px)  { grid-template-columns: repeat(2, 1fr); }\n  @media (max-width: 480px)  { grid-template-columns: 1fr; }\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  transition: all 250ms;\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 5 {\n    &:nth-child(#{$i}) { animation-delay: #{$i * 0.05}s; }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n\n    .kpi-icon { transform: scale(1.1) rotate(5deg); }\n  }\n}\n\n.kpi-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  font-size: $font-size-lg;\n  color: white;\n  flex-shrink: 0;\n  transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  .kpi-card--age & { background: $primary-gradient; }\n  .kpi-card--health & { background: $success-gradient; }\n  .kpi-card--team & { background: $cyan-gradient; }\n  .kpi-card--stakeholders & { background: linear-gradient(135deg, #a855f7, #9333ea); }\n  .kpi-card--activities & { background: $orange-gradient; }\n}\n\n.kpi-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.kpi-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.kpi-value[_ngcontent-%COMP%] {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $gray-800;\n\n  &--muted { color: $gray-400; }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   DETAIL[_ngcontent-%COMP%]   GRID[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-4;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  padding: $space-4;\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.5s ease-out backwards;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n}\n\n.card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin: 0 0 $space-4;\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: $gray-800;\n\n  i {\n    font-size: $font-size-lg;\n    color: #06b6d4;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   KEY[_ngcontent-%COMP%]   DETAILS[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.detail-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-3;\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.field-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-weight: 600;\n}\n\n.field-value[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  font-weight: 500;\n  color: $gray-800;\n}\n\n.detail-summary[_ngcontent-%COMP%] {\n  margin-top: $space-4;\n  padding-top: $space-3;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.summary-text[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  line-height: 1.6;\n  color: $gray-600;\n  margin: $space-1 0 0;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   STAGE[_ngcontent-%COMP%]   TIMELINE[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.stage-bar[_ngcontent-%COMP%] {\n  display: flex;\n  height: 8px;\n  border-radius: $radius-full;\n  overflow: hidden;\n  margin-bottom: $space-4;\n  background: $gray-200;\n}\n\n.stage-bar__segment[_ngcontent-%COMP%] {\n  min-width: 8px;\n  transition: flex 600ms ease-out;\n\n  &:nth-child(6n+1) { background: #667eea; }\n  &:nth-child(6n+2) { background: #22d3ee; }\n  &:nth-child(6n+3) { background: #a855f7; }\n  &:nth-child(6n+4) { background: #22c55e; }\n  &:nth-child(6n+5) { background: #f97316; }\n  &:nth-child(6n+6) { background: #3b82f6; }\n\n  &--current {\n    animation: _ngcontent-%COMP%_pulse-bar 1.5s ease-in-out infinite;\n  }\n}\n\n.stage-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.stage-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-2;\n  border-radius: $radius-md;\n  transition: background 150ms;\n\n  &:hover { background: rgba(0, 0, 0, 0.03); }\n\n  &--current {\n    background: rgba(#667eea, 0.06);\n    font-weight: 600;\n  }\n}\n\n.stage-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: $gray-300;\n  flex-shrink: 0;\n\n  &--current {\n    background: #667eea;\n    box-shadow: 0 0 6px rgba(102, 126, 234, 0.5);\n  }\n}\n\n.stage-name[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-700;\n  flex: 1;\n}\n\n.stage-days[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.stage-current-tag[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #667eea;\n  background: rgba(#667eea, 0.1);\n  padding: 1px 6px;\n  border-radius: $radius-full;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   HEALTH[_ngcontent-%COMP%]   FACTORS[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.health-factors[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.health-factor[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.factor-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n}\n\n.factor-name[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-700;\n}\n\n.factor-score[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: $gray-500;\n}\n\n.factor-bar[_ngcontent-%COMP%] {\n  height: 6px;\n  background: $gray-200;\n  border-radius: $radius-full;\n  overflow: hidden;\n}\n\n.factor-bar__fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: $radius-full;\n  transition: width 800ms ease-out;\n  min-width: 4px;\n}\n\n.health-rationale[_ngcontent-%COMP%] {\n  margin: $space-4 0 0;\n  padding-top: $space-3;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  font-size: $font-size-sm;\n  color: $gray-600;\n  line-height: 1.6;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   STAKEHOLDERS[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.stakeholder-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.stakeholder-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2;\n  border-radius: $radius-md;\n  transition: background 150ms;\n\n  &:hover { background: rgba(0, 0, 0, 0.03); }\n}\n\n.stakeholder-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #a855f7, #9333ea);\n  color: white;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.stakeholder-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  flex: 1;\n}\n\n.stakeholder-name[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.stakeholder-role[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n.stakeholder-primary[_ngcontent-%COMP%] {\n  color: #f59e0b;\n  font-size: $font-size-base;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   TEAM[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.team-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.team-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2;\n  border-radius: $radius-md;\n  transition: background 150ms;\n\n  &:hover { background: rgba(0, 0, 0, 0.03); }\n}\n\n.team-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $cyan-gradient;\n  color: white;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.team-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n\n.team-name[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.team-role[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   ACTIVITIES[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.activity-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.activity-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  padding: $space-2;\n  border-radius: $radius-md;\n  transition: background 150ms;\n\n  &:hover { background: rgba(0, 0, 0, 0.03); }\n}\n\n.activity-icon[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(#667eea, 0.1);\n  color: #667eea;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  flex-shrink: 0;\n}\n\n.activity-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.activity-subject[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  font-weight: 500;\n  color: $gray-800;\n}\n\n.activity-meta[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   EMPTY[_ngcontent-%COMP%]   STATES[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.empty-text[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-400;\n  text-align: center;\n  padding: $space-4 0;\n  margin: 0;\n}\n\n.empty-state-cta[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: $space-3 0;\n}\n\n.cta-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  margin-top: $space-2;\n  padding: $space-1 $space-3;\n  background: none;\n  border: 1px dashed rgba(102, 126, 234, 0.4);\n  border-radius: $radius-md;\n  color: #667eea;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 200ms ease;\n\n  &:hover {\n    background: rgba(102, 126, 234, 0.08);\n    border-color: #667eea;\n  }\n\n  i {\n    font-size: 0.75rem;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   LOADING[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.page-loading[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: $space-6;\n}\n\n.loading-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-4;\n  margin-top: $space-4;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   ANIMATIONS[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n@keyframes[_ngcontent-%COMP%]   fade-in-up[_ngcontent-%COMP%] {\n  from { opacity: 0; transform: translateY(20px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes _ngcontent-%COMP%_gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50%      { background-position: 100% 50%; }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25%      { transform: translate(50px, -30px) scale(1.1); }\n  50%      { transform: translate(100px, 20px) scale(0.9); }\n  75%      { transform: translate(30px, 50px) scale(1.05); }\n}\n\n@keyframes _ngcontent-%COMP%_pulse-bar {\n  0%, 100% { opacity: 1; }\n  50%      { opacity: 0.6; }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OpportunityDetailPage, [{
        type: Component,
        args: [{ standalone: true, selector: 'app-opportunity-detail', imports: [
                    CommonModule,
                    RouterModule,
                    TooltipModule,
                    SkeletonModule,
                    BreadcrumbsComponent
                ], template: "<div class=\"page-container\">\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <div class=\"page-content\" *ngIf=\"!loading(); else pageLoading\">\n    <ng-container *ngIf=\"opportunity() as opp\">\n      <!-- \u2550\u2550\u2550 HERO \u2550\u2550\u2550 -->\n      <header class=\"hero-section\">\n        <div class=\"hero-left\">\n          <app-breadcrumbs></app-breadcrumbs>\n          <div class=\"hero-nav\">\n            <a class=\"back-link\" routerLink=\"/app/deals\">\n              <i class=\"pi pi-arrow-left\"></i> Deals\n            </a>\n            <a *ngIf=\"canEdit\" class=\"edit-link\" [routerLink]=\"'/app/deals/' + opp.id + '/edit'\">\n              <i class=\"pi pi-pencil\"></i> Edit\n            </a>\n          </div>\n          <h1 class=\"hero-title\">\n            <span class=\"title-gradient\">{{ opp.name }}</span>\n          </h1>\n          <div class=\"hero-meta\">\n            <span class=\"hero-badge\" [ngClass]=\"statusClass(opp.status)\">{{ opp.status }}</span>\n            <span class=\"hero-stage\" [ngClass]=\"stageBadgeClass(opp.stage)\">{{ opp.stage }}</span>\n            <span class=\"hero-account\" *ngIf=\"opp.account\">\n              <i class=\"pi pi-building\"></i> {{ opp.account }}\n            </span>\n          </div>\n        </div>\n        <div class=\"hero-right\">\n          <div class=\"hero-amount\">\n            <span class=\"hero-amount-value\">{{ formatCurrency(opp.amount, opp.currency) }}</span>\n            <span class=\"hero-amount-label\">Deal value</span>\n          </div>\n          <div class=\"hero-probability\">\n            <div class=\"probability-ring\">\n              <svg viewBox=\"0 0 36 36\">\n                <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n                <path class=\"ring-fill\" [attr.stroke-dasharray]=\"opp.probability + ', 100'\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n              </svg>\n              <span class=\"probability-value\">{{ opp.probability }}%</span>\n            </div>\n            <span class=\"probability-label\">Win probability</span>\n          </div>\n        </div>\n      </header>\n\n      <!-- \u2550\u2550\u2550 KPI CARDS \u2550\u2550\u2550 -->\n      <section class=\"kpi-section\">\n        <div class=\"kpi-card kpi-card--age\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-stopwatch\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Deal Age</span>\n            <strong class=\"kpi-value\">{{ dealAgeDays() }}d</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--health\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-heart\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Health Score</span>\n            <strong class=\"kpi-value\" *ngIf=\"healthScore() as hs; else noHealth\" [style.color]=\"healthScoreColor(hs.score)\">{{ hs.score }}/100</strong>\n            <ng-template #noHealth><strong class=\"kpi-value kpi-value--muted\">\u2014</strong></ng-template>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--team\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-users\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Team</span>\n            <strong class=\"kpi-value\">{{ teamMembers().length }}</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--stakeholders\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-id-card\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Stakeholders</span>\n            <strong class=\"kpi-value\">{{ contactRoles().length }}</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--activities\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-clock\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Activities</span>\n            <strong class=\"kpi-value\">{{ activities().length }}</strong>\n          </div>\n        </div>\n      </section>\n\n      <!-- \u2550\u2550\u2550 MAIN GRID \u2550\u2550\u2550 -->\n      <div class=\"detail-grid\">\n        <!-- LEFT COLUMN -->\n        <div class=\"detail-col\">\n          <!-- Key Details -->\n          <section class=\"detail-card\">\n            <h2 class=\"card-title\"><i class=\"pi pi-info-circle\"></i> Key Details</h2>\n            <div class=\"detail-fields\">\n              <div class=\"detail-field\">\n                <span class=\"field-label\">Close Date</span>\n                <span class=\"field-value\">{{ opp.closeDate ? (opp.closeDate | date:'MMM d, yyyy') : '\u2014' }}</span>\n              </div>\n              <div class=\"detail-field\">\n                <span class=\"field-label\">Forecast</span>\n                <span class=\"field-value\">{{ opp.forecastCategory || '\u2014' }}</span>\n              </div>\n              <div class=\"detail-field\">\n                <span class=\"field-label\">Type</span>\n                <span class=\"field-value\">{{ opp.opportunityType || '\u2014' }}</span>\n              </div>\n              <div class=\"detail-field\">\n                <span class=\"field-label\">Owner</span>\n                <span class=\"field-value\">{{ opp.owner || '\u2014' }}</span>\n              </div>\n              <div class=\"detail-field\">\n                <span class=\"field-label\">Created</span>\n                <span class=\"field-value\">{{ opp.createdAtUtc | date:'MMM d, yyyy' }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"opp.updatedAtUtc\">\n                <span class=\"field-label\">Updated</span>\n                <span class=\"field-value\">{{ opp.updatedAtUtc | date:'MMM d, yyyy' }}</span>\n              </div>\n            </div>\n            <div class=\"detail-summary\" *ngIf=\"opp.summary\">\n              <span class=\"field-label\">Summary</span>\n              <p class=\"summary-text\">{{ opp.summary }}</p>\n            </div>\n          </section>\n\n          <!-- Stage Timeline -->\n          <section class=\"detail-card\" *ngIf=\"stageDurations().length\">\n            <h2 class=\"card-title\"><i class=\"pi pi-stopwatch\"></i> Stage Timeline</h2>\n            <div class=\"stage-bar\">\n              <div *ngFor=\"let sd of stageDurations()\" class=\"stage-bar__segment\"\n                   [style.flex]=\"sd.durationDays || 1\"\n                   [class.stage-bar__segment--current]=\"sd.isCurrent\"\n                   [pTooltip]=\"sd.stage + ': ' + sd.durationDays + ' days'\"\n                   tooltipPosition=\"top\">\n              </div>\n            </div>\n            <div class=\"stage-list\">\n              <div *ngFor=\"let sd of stageDurations()\" class=\"stage-item\" [class.stage-item--current]=\"sd.isCurrent\">\n                <span class=\"stage-dot\" [class.stage-dot--current]=\"sd.isCurrent\"></span>\n                <span class=\"stage-name\">{{ sd.stage }}</span>\n                <span class=\"stage-days\">{{ sd.durationDays }}d</span>\n                <span class=\"stage-current-tag\" *ngIf=\"sd.isCurrent\">current</span>\n              </div>\n            </div>\n          </section>\n\n          <!-- Health Score Factors -->\n          <section class=\"detail-card\" *ngIf=\"healthScore() as hs\">\n            <h2 class=\"card-title\"><i class=\"pi pi-heart\"></i> Health Breakdown</h2>\n            <div class=\"health-factors\">\n              <div *ngFor=\"let f of hs.factors\" class=\"health-factor\">\n                <div class=\"factor-header\">\n                  <span class=\"factor-name\">{{ f.factor }}</span>\n                  <span class=\"factor-score\">{{ f.score }}/{{ f.maxScore }}</span>\n                </div>\n                <div class=\"factor-bar\">\n                  <div class=\"factor-bar__fill\" [style.width.%]=\"(f.score / f.maxScore) * 100\" [style.background]=\"healthScoreColor((f.score / f.maxScore) * 100)\"></div>\n                </div>\n              </div>\n            </div>\n            <p class=\"health-rationale\" *ngIf=\"hs.rationale\">{{ hs.rationale }}</p>\n          </section>\n        </div>\n\n        <!-- RIGHT COLUMN -->\n        <div class=\"detail-col\">\n          <!-- Stakeholders -->\n          <section class=\"detail-card\">\n            <h2 class=\"card-title\"><i class=\"pi pi-id-card\"></i> Stakeholders</h2>\n            <div class=\"stakeholder-list\" *ngIf=\"contactRoles().length; else noStakeholders\">\n              <div *ngFor=\"let cr of contactRoles()\" class=\"stakeholder-item\">\n                <div class=\"stakeholder-avatar\">\n                  <img\n                    [src]=\"$any(cr).profilePictureUrl || ('https://i.pravatar.cc/150?u=' + (cr.email || cr.contactId || cr.id))\"\n                    [alt]=\"(cr.contactName || 'Stakeholder') + ' avatar'\"\n                    [title]=\"(cr.contactName || 'Stakeholder') + ' avatar'\"\n                  />\n                </div>\n                <div class=\"stakeholder-info\">\n                  <span class=\"stakeholder-name\">{{ cr.contactName }}</span>\n                  <span class=\"stakeholder-role\">{{ cr.role }}</span>\n                </div>\n                <span class=\"stakeholder-primary\" *ngIf=\"cr.isPrimary\" pTooltip=\"Primary contact\" tooltipPosition=\"left\">\n                  <i class=\"pi pi-star-fill\"></i>\n                </span>\n              </div>\n            </div>\n            <ng-template #noStakeholders>\n              <div class=\"empty-state-cta\">\n                <p class=\"empty-text\">No stakeholders assigned.</p>\n                <button *ngIf=\"canEdit\" type=\"button\" class=\"cta-link\" [routerLink]=\"['/app/deals', opportunity()?.id, 'edit']\">\n                  <i class=\"pi pi-plus\"></i> Add Stakeholder\n                </button>\n              </div>\n            </ng-template>\n          </section>\n\n          <!-- Team -->\n          <section class=\"detail-card\">\n            <h2 class=\"card-title\"><i class=\"pi pi-users\"></i> Team</h2>\n            <div class=\"team-list\" *ngIf=\"teamMembers().length; else noTeam\">\n              <div *ngFor=\"let tm of teamMembers()\" class=\"team-item\">\n                <div class=\"team-avatar\">\n                  <img\n                    [src]=\"$any(tm).profilePictureUrl || ('https://i.pravatar.cc/150?u=' + (tm.userId || tm.userName))\"\n                    [alt]=\"(tm.userName || 'Team member') + ' avatar'\"\n                    [title]=\"(tm.userName || 'Team member') + ' avatar'\"\n                  />\n                </div>\n                <div class=\"team-info\">\n                  <span class=\"team-name\">{{ tm.userName }}</span>\n                  <span class=\"team-role\">{{ tm.role }}</span>\n                </div>\n              </div>\n            </div>\n            <ng-template #noTeam>\n              <div class=\"empty-state-cta\">\n                <p class=\"empty-text\">No team members assigned.</p>\n                <button *ngIf=\"canEdit\" type=\"button\" class=\"cta-link\" [routerLink]=\"['/app/deals', opportunity()?.id, 'edit']\">\n                  <i class=\"pi pi-plus\"></i> Add Team Member\n                </button>\n              </div>\n            </ng-template>\n          </section>\n\n          <!-- Recent Activities -->\n          <section class=\"detail-card\">\n            <h2 class=\"card-title\"><i class=\"pi pi-clock\"></i> Recent Activities</h2>\n            <div class=\"activity-list\" *ngIf=\"activities().length; else noActivities\">\n              <div *ngFor=\"let act of activities()\" class=\"activity-item\">\n                <div class=\"activity-icon\">\n                  <i class=\"pi\" [ngClass]=\"activityIcon(act.type)\"></i>\n                </div>\n                <div class=\"activity-info\">\n                  <span class=\"activity-subject\">{{ act.subject }}</span>\n                  <span class=\"activity-meta\">\n                    {{ act.type }} \u00B7 {{ act.createdAtUtc | date:'MMM d' }}\n                  </span>\n                </div>\n              </div>\n            </div>\n            <ng-template #noActivities>\n              <div class=\"empty-state-cta\">\n                <p class=\"empty-text\">No activities recorded.</p>\n                <button *ngIf=\"canEdit\" type=\"button\" class=\"cta-link\" [routerLink]=\"['/app/deals', opportunity()?.id, 'edit']\">\n                  <i class=\"pi pi-plus\"></i> Log Activity\n                </button>\n              </div>\n            </ng-template>\n          </section>\n        </div>\n      </div>\n    </ng-container>\n  </div>\n\n  <ng-template #pageLoading>\n    <div class=\"page-loading\">\n      <p-skeleton width=\"60%\" height=\"2rem\" styleClass=\"mb-3\"></p-skeleton>\n      <p-skeleton width=\"40%\" height=\"1.5rem\" styleClass=\"mb-4\"></p-skeleton>\n      <div class=\"loading-grid\">\n        <p-skeleton width=\"100%\" height=\"200px\"></p-skeleton>\n        <p-skeleton width=\"100%\" height=\"200px\"></p-skeleton>\n      </div>\n    </div>\n  </ng-template>\n</div>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// Deal 360 Detail Page\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: orb-float 20s ease-in-out infinite;\n\n  &.orb-1 { width: 600px; height: 600px; background: $primary-gradient; top: -200px; right: -100px; }\n  &.orb-2 { width: 400px; height: 400px; background: $cyan-gradient; bottom: 10%; left: -100px; animation-delay: -7s; }\n  &.orb-3 { width: 300px; height: 300px; background: $secondary-gradient; top: 40%; right: 20%; animation-delay: -14s; }\n}\n\n.page-content {\n  position: relative;\n  z-index: 1;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n\n// \u2550\u2550\u2550 HERO \u2550\u2550\u2550\n\n.hero-section {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-nav {\n  display: flex;\n  gap: $space-3;\n  align-items: center;\n  margin-bottom: $space-2;\n}\n\n.back-link,\n.edit-link {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  text-decoration: none;\n  border-radius: $radius-md;\n  padding: $space-1 $space-3;\n  transition: all 200ms;\n\n  i { font-size: 0.75rem; }\n}\n\n.back-link {\n  color: $gray-500;\n  background: $glass-bg-subtle;\n  border: 1px solid $glass-border;\n\n  &:hover {\n    color: $gray-800;\n    background: white;\n  }\n}\n\n.edit-link {\n  color: white;\n  background: $primary-gradient;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n  }\n}\n\n.hero-title {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-2;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: gradient-shift 4s ease-in-out infinite;\n  }\n}\n\n.hero-meta {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.hero-badge,\n.hero-stage {\n  display: inline-flex;\n  padding: 2px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  text-transform: capitalize;\n}\n\n.hero-badge {\n  background: rgba($gray-500, 0.15);\n  color: $gray-600;\n\n  &.status--open { background: rgba(#3b82f6, 0.15); color: #3b82f6; }\n  &.status--won { background: rgba($success, 0.15); color: color.adjust($success, $lightness: -15%); }\n  &.status--lost { background: rgba(#ef4444, 0.15); color: #ef4444; }\n}\n\n.hero-stage {\n  background: rgba($cyan, 0.12);\n  color: color.adjust($cyan, $lightness: -15%);\n}\n\n.hero-account {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  color: $gray-500;\n\n  i { font-size: 0.75rem; }\n}\n\n.hero-right {\n  display: flex;\n  gap: $space-4;\n  align-items: center;\n\n  @media (max-width: 1024px) {\n    justify-content: flex-start;\n  }\n}\n\n.hero-amount {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n\n  &-value {\n    font-size: $font-size-3xl;\n    font-weight: 800;\n    color: $gray-800;\n  }\n\n  &-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n}\n\n.hero-probability {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n}\n\n.probability-ring {\n  position: relative;\n  width: 56px;\n  height: 56px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: $gray-200;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke: #667eea;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n  }\n}\n\n.probability-value {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n.probability-label {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n// \u2550\u2550\u2550 KPI CARDS \u2550\u2550\u2550\n\n.kpi-section {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); }\n  @media (max-width: 768px)  { grid-template-columns: repeat(2, 1fr); }\n  @media (max-width: 480px)  { grid-template-columns: 1fr; }\n}\n\n.kpi-card {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  transition: all 250ms;\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 5 {\n    &:nth-child(#{$i}) { animation-delay: #{$i * 0.05}s; }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n\n    .kpi-icon { transform: scale(1.1) rotate(5deg); }\n  }\n}\n\n.kpi-icon {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  font-size: $font-size-lg;\n  color: white;\n  flex-shrink: 0;\n  transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  .kpi-card--age & { background: $primary-gradient; }\n  .kpi-card--health & { background: $success-gradient; }\n  .kpi-card--team & { background: $cyan-gradient; }\n  .kpi-card--stakeholders & { background: linear-gradient(135deg, #a855f7, #9333ea); }\n  .kpi-card--activities & { background: $orange-gradient; }\n}\n\n.kpi-content {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.kpi-label {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.kpi-value {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $gray-800;\n\n  &--muted { color: $gray-400; }\n}\n\n// \u2550\u2550\u2550 DETAIL GRID \u2550\u2550\u2550\n\n.detail-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-4;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-card {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  padding: $space-4;\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.5s ease-out backwards;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n}\n\n.card-title {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin: 0 0 $space-4;\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: $gray-800;\n\n  i {\n    font-size: $font-size-lg;\n    color: #06b6d4;\n  }\n}\n\n// \u2550\u2550\u2550 KEY DETAILS \u2550\u2550\u2550\n\n.detail-fields {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-3;\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-field {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.field-label {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-weight: 600;\n}\n\n.field-value {\n  font-size: $font-size-md;\n  font-weight: 500;\n  color: $gray-800;\n}\n\n.detail-summary {\n  margin-top: $space-4;\n  padding-top: $space-3;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.summary-text {\n  font-size: $font-size-md;\n  line-height: 1.6;\n  color: $gray-600;\n  margin: $space-1 0 0;\n}\n\n// \u2550\u2550\u2550 STAGE TIMELINE \u2550\u2550\u2550\n\n.stage-bar {\n  display: flex;\n  height: 8px;\n  border-radius: $radius-full;\n  overflow: hidden;\n  margin-bottom: $space-4;\n  background: $gray-200;\n}\n\n.stage-bar__segment {\n  min-width: 8px;\n  transition: flex 600ms ease-out;\n\n  &:nth-child(6n+1) { background: #667eea; }\n  &:nth-child(6n+2) { background: #22d3ee; }\n  &:nth-child(6n+3) { background: #a855f7; }\n  &:nth-child(6n+4) { background: #22c55e; }\n  &:nth-child(6n+5) { background: #f97316; }\n  &:nth-child(6n+6) { background: #3b82f6; }\n\n  &--current {\n    animation: pulse-bar 1.5s ease-in-out infinite;\n  }\n}\n\n.stage-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.stage-item {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-2;\n  border-radius: $radius-md;\n  transition: background 150ms;\n\n  &:hover { background: rgba(0, 0, 0, 0.03); }\n\n  &--current {\n    background: rgba(#667eea, 0.06);\n    font-weight: 600;\n  }\n}\n\n.stage-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: $gray-300;\n  flex-shrink: 0;\n\n  &--current {\n    background: #667eea;\n    box-shadow: 0 0 6px rgba(102, 126, 234, 0.5);\n  }\n}\n\n.stage-name {\n  font-size: $font-size-sm;\n  color: $gray-700;\n  flex: 1;\n}\n\n.stage-days {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.stage-current-tag {\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: #667eea;\n  background: rgba(#667eea, 0.1);\n  padding: 1px 6px;\n  border-radius: $radius-full;\n}\n\n// \u2550\u2550\u2550 HEALTH FACTORS \u2550\u2550\u2550\n\n.health-factors {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.health-factor {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.factor-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n}\n\n.factor-name {\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-700;\n}\n\n.factor-score {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: $gray-500;\n}\n\n.factor-bar {\n  height: 6px;\n  background: $gray-200;\n  border-radius: $radius-full;\n  overflow: hidden;\n}\n\n.factor-bar__fill {\n  height: 100%;\n  border-radius: $radius-full;\n  transition: width 800ms ease-out;\n  min-width: 4px;\n}\n\n.health-rationale {\n  margin: $space-4 0 0;\n  padding-top: $space-3;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  font-size: $font-size-sm;\n  color: $gray-600;\n  line-height: 1.6;\n}\n\n// \u2550\u2550\u2550 STAKEHOLDERS \u2550\u2550\u2550\n\n.stakeholder-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.stakeholder-item {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2;\n  border-radius: $radius-md;\n  transition: background 150ms;\n\n  &:hover { background: rgba(0, 0, 0, 0.03); }\n}\n\n.stakeholder-avatar {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #a855f7, #9333ea);\n  color: white;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.stakeholder-info {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  flex: 1;\n}\n\n.stakeholder-name {\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.stakeholder-role {\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n.stakeholder-primary {\n  color: #f59e0b;\n  font-size: $font-size-base;\n}\n\n// \u2550\u2550\u2550 TEAM \u2550\u2550\u2550\n\n.team-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.team-item {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2;\n  border-radius: $radius-md;\n  transition: background 150ms;\n\n  &:hover { background: rgba(0, 0, 0, 0.03); }\n}\n\n.team-avatar {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $cyan-gradient;\n  color: white;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.team-info {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n\n.team-name {\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.team-role {\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n// \u2550\u2550\u2550 ACTIVITIES \u2550\u2550\u2550\n\n.activity-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.activity-item {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  padding: $space-2;\n  border-radius: $radius-md;\n  transition: background 150ms;\n\n  &:hover { background: rgba(0, 0, 0, 0.03); }\n}\n\n.activity-icon {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(#667eea, 0.1);\n  color: #667eea;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  flex-shrink: 0;\n}\n\n.activity-info {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.activity-subject {\n  font-size: $font-size-md;\n  font-weight: 500;\n  color: $gray-800;\n}\n\n.activity-meta {\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n// \u2550\u2550\u2550 EMPTY STATES \u2550\u2550\u2550\n\n.empty-text {\n  font-size: $font-size-sm;\n  color: $gray-400;\n  text-align: center;\n  padding: $space-4 0;\n  margin: 0;\n}\n\n.empty-state-cta {\n  text-align: center;\n  padding: $space-3 0;\n}\n\n.cta-link {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  margin-top: $space-2;\n  padding: $space-1 $space-3;\n  background: none;\n  border: 1px dashed rgba(102, 126, 234, 0.4);\n  border-radius: $radius-md;\n  color: #667eea;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 200ms ease;\n\n  &:hover {\n    background: rgba(102, 126, 234, 0.08);\n    border-color: #667eea;\n  }\n\n  i {\n    font-size: 0.75rem;\n  }\n}\n\n// \u2550\u2550\u2550 LOADING \u2550\u2550\u2550\n\n.page-loading {\n  position: relative;\n  z-index: 1;\n  max-width: 1400px;\n  margin: 0 auto;\n  padding: $space-6;\n}\n\n.loading-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-4;\n  margin-top: $space-4;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n// \u2550\u2550\u2550 ANIMATIONS \u2550\u2550\u2550\n\n@keyframes fade-in-up {\n  from { opacity: 0; transform: translateY(20px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50%      { background-position: 100% 50%; }\n}\n\n@keyframes orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25%      { transform: translate(50px, -30px) scale(1.1); }\n  50%      { transform: translate(100px, 20px) scale(0.9); }\n  75%      { transform: translate(30px, 50px) scale(1.05); }\n}\n\n@keyframes pulse-bar {\n  0%, 100% { opacity: 1; }\n  50%      { opacity: 0.6; }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OpportunityDetailPage, { className: "OpportunityDetailPage", filePath: "src/app/crm/features/opportunities/pages/opportunity-detail.page.ts", lineNumber: 34 }); })();
