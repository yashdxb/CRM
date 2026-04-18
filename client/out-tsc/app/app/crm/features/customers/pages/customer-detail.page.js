import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { Tree } from 'primeng/tree';
import { CustomerDataService } from '../services/customer-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/skeleton";
import * as i4 from "primeng/api";
const _c0 = (a0, a1, a2) => ({ "pi-sun": a0, "pi-cloud": a1, "pi-snowflake": a2 });
const _c1 = () => [1, 2, 3, 4, 5];
function CustomerDetailPage_div_5_ng_container_1_a_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 71);
    i0.ɵɵelement(1, "i", 72);
    i0.ɵɵtext(2, " Edit ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵproperty("routerLink", "/app/customers/" + c_r2.id + "/edit");
} }
function CustomerDetailPage_div_5_ng_container_1_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(c_r2.accountType);
} }
function CustomerDetailPage_div_5_ng_container_1_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 74);
    i0.ɵɵelement(1, "i", 75);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r2.ratingClass(c_r2.rating));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction3(3, _c0, c_r2.rating === "Hot", c_r2.rating === "Warm", c_r2.rating === "Cold"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", c_r2.rating, " ");
} }
function CustomerDetailPage_div_5_ng_container_1_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 76);
    i0.ɵɵelement(1, "i", 77);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", c_r2.industry, " ");
} }
function CustomerDetailPage_div_5_ng_container_1_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 78)(1, "div", 79);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 80);
    i0.ɵɵelement(3, "path", 81)(4, "path", 82);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "span", 83);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 84);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵstyleProp("stroke", ctx_r2.healthScoreColor());
    i0.ɵɵattribute("stroke-dasharray", c_r2.healthScore + ", 100");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(c_r2.healthScore);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", ctx_r2.healthScoreColor());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.healthScoreLabel());
} }
function CustomerDetailPage_div_5_ng_container_1_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 85)(1, "span", 86);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 87);
    i0.ɵɵtext(4, "Annual Revenue");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatCurrency(c_r2.annualRevenue));
} }
function CustomerDetailPage_div_5_ng_container_1_div_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 88)(1, "div", 28);
    i0.ɵɵelement(2, "i", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 30)(4, "span", 31);
    i0.ɵɵtext(5, "Open Pipeline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong", 32);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.formatCurrency(c_r2.openPipelineValue));
} }
function CustomerDetailPage_div_5_ng_container_1_div_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 90)(1, "div", 28);
    i0.ɵɵelement(2, "i", 91);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 30)(4, "span", 31);
    i0.ɵɵtext(5, "Closed Won");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong", 32);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.formatCurrency(c_r2.closedWonRevenue));
} }
function CustomerDetailPage_div_5_ng_container_1_div_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 92)(1, "div", 28);
    i0.ɵɵelement(2, "i", 93);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 30)(4, "span", 31);
    i0.ɵɵtext(5, "Forecast");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong", 32);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.formatCurrency(c_r2.weightedForecast));
} }
function CustomerDetailPage_div_5_ng_container_1_div_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span", 52);
    i0.ɵɵtext(2, "Account Number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 53);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(c_r2.accountNumber);
} }
function CustomerDetailPage_div_5_ng_container_1_div_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span", 52);
    i0.ɵɵtext(2, "Website");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 94);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(c_r2.website);
} }
function CustomerDetailPage_div_5_ng_container_1_div_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span", 52);
    i0.ɵɵtext(2, "Phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 53);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(c_r2.phone);
} }
function CustomerDetailPage_div_5_ng_container_1_div_85_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span", 52);
    i0.ɵɵtext(2, "Employees");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 53);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 1, c_r2.numberOfEmployees));
} }
function CustomerDetailPage_div_5_ng_container_1_div_96_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span", 52);
    i0.ɵɵtext(2, "Parent Account");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 53);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(c_r2.parentAccountName);
} }
function CustomerDetailPage_div_5_ng_container_1_div_103_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span", 52);
    i0.ɵɵtext(2, "Updated");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 53);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, c_r2.updatedAt, "MMM d, yyyy"));
} }
function CustomerDetailPage_div_5_ng_container_1_div_104_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span", 52);
    i0.ɵɵtext(2, "Last Activity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 53);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, c_r2.lastActivityAt, "MMM d, yyyy"));
} }
function CustomerDetailPage_div_5_ng_container_1_div_105_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span", 52);
    i0.ɵɵtext(2, "Renewal Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 53);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, c_r2.renewalDate, "MMM d, yyyy"));
} }
function CustomerDetailPage_div_5_ng_container_1_div_106_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span", 52);
    i0.ɵɵtext(2, "Contract End");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 53);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, c_r2.contractEndDate, "MMM d, yyyy"));
} }
function CustomerDetailPage_div_5_ng_container_1_div_107_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51)(1, "span", 52);
    i0.ɵɵtext(2, "Next Opp Renewal");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 53);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 1, c_r2.nearestOpportunityRenewal, "MMM d, yyyy"));
} }
function CustomerDetailPage_div_5_ng_container_1_div_108_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 95)(1, "span", 52);
    i0.ɵɵtext(2, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 96);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(c_r2.description);
} }
function CustomerDetailPage_div_5_ng_container_1_section_109_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100)(1, "span", 101);
    i0.ɵɵtext(2, "Billing Address");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 102);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.billingAddress());
} }
function CustomerDetailPage_div_5_ng_container_1_section_109_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100)(1, "span", 101);
    i0.ɵɵtext(2, "Shipping Address");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 102);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.shippingAddress());
} }
function CustomerDetailPage_div_5_ng_container_1_section_109_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 46)(1, "h2", 47);
    i0.ɵɵelement(2, "i", 97);
    i0.ɵɵtext(3, " Addresses");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 98);
    i0.ɵɵtemplate(5, CustomerDetailPage_div_5_ng_container_1_section_109_div_5_Template, 5, 1, "div", 99)(6, CustomerDetailPage_div_5_ng_container_1_section_109_div_6_Template, 5, 1, "div", 99);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r2.billingAddress());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.shippingAddress());
} }
function CustomerDetailPage_div_5_ng_container_1_div_134_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 105)(1, "div", 106);
    i0.ɵɵelement(2, "img", 107);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 108)(4, "span", 109);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 110);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const member_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", member_r4.profilePictureUrl || "https://i.pravatar.cc/150?u=" + (member_r4.userId || member_r4.userName), i0.ɵɵsanitizeUrl)("alt", member_r4.userName + " avatar")("title", member_r4.userName + " avatar");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(member_r4.userName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(member_r4.role);
} }
function CustomerDetailPage_div_5_ng_container_1_div_134_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 103);
    i0.ɵɵtemplate(1, CustomerDetailPage_div_5_ng_container_1_div_134_div_1_Template, 8, 5, "div", 104);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.teamMembers());
} }
function CustomerDetailPage_div_5_ng_container_1_ng_template_135_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 111);
    i0.ɵɵelement(1, "i", 64);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No team members assigned");
    i0.ɵɵelementEnd()();
} }
function CustomerDetailPage_div_5_ng_container_1_ng_template_142_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 115);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const node_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(node_r5.data.subtitle);
} }
function CustomerDetailPage_div_5_ng_container_1_ng_template_142_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 112)(1, "span", 113);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, CustomerDetailPage_div_5_ng_container_1_ng_template_142_span_3_Template, 2, 1, "span", 114);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const node_r5 = ctx.$implicit;
    i0.ɵɵclassProp("tree-node--clickable", node_r5.leaf);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(node_r5.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", node_r5.data == null ? null : node_r5.data.subtitle);
} }
function CustomerDetailPage_div_5_ng_container_1_section_143_div_6_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 129);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entry_r6.subject);
} }
function CustomerDetailPage_div_5_ng_container_1_section_143_div_6_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 130);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entry_r6.description);
} }
function CustomerDetailPage_div_5_ng_container_1_section_143_div_6_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 131);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", entry_r6.ownerName);
} }
function CustomerDetailPage_div_5_ng_container_1_section_143_div_6_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 132);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", entry_r6.direction);
} }
function CustomerDetailPage_div_5_ng_container_1_section_143_div_6_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 133);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", entry_r6.fromEmail);
} }
function CustomerDetailPage_div_5_ng_container_1_section_143_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 120)(1, "div", 121);
    i0.ɵɵelement(2, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 122)(4, "div", 123)(5, "span", 124);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 125);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, CustomerDetailPage_div_5_ng_container_1_section_143_div_6_span_10_Template, 2, 1, "span", 126)(11, CustomerDetailPage_div_5_ng_container_1_section_143_div_6_span_11_Template, 2, 1, "span", 127);
    i0.ɵɵelementStart(12, "div", 128);
    i0.ɵɵtemplate(13, CustomerDetailPage_div_5_ng_container_1_section_143_div_6_span_13_Template, 3, 1, "span", 9)(14, CustomerDetailPage_div_5_ng_container_1_section_143_div_6_span_14_Template, 3, 1, "span", 9)(15, CustomerDetailPage_div_5_ng_container_1_section_143_div_6_span_15_Template, 3, 1, "span", 9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const entry_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r2.timelineIcon(entry_r6.type));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(entry_r6.type);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 9, entry_r6.occurredAt, "MMM d, yyyy h:mm a"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", entry_r6.subject);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", entry_r6.description);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", entry_r6.ownerName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", entry_r6.direction);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", entry_r6.fromEmail);
} }
function CustomerDetailPage_div_5_ng_container_1_section_143_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 116)(1, "div", 46)(2, "h2", 47);
    i0.ɵɵelement(3, "i", 117);
    i0.ɵɵtext(4, " Communication History");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 118);
    i0.ɵɵtemplate(6, CustomerDetailPage_div_5_ng_container_1_section_143_div_6_Template, 16, 12, "div", 119);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r2.timeline());
} }
function CustomerDetailPage_div_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "header", 10)(2, "div", 11);
    i0.ɵɵelement(3, "app-breadcrumbs");
    i0.ɵɵelementStart(4, "div", 12)(5, "a", 13);
    i0.ɵɵelement(6, "i", 14);
    i0.ɵɵtext(7, " Customers ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, CustomerDetailPage_div_5_ng_container_1_a_8_Template, 3, 1, "a", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "h1", 16)(10, "span", 17);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 18)(13, "span", 19);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, CustomerDetailPage_div_5_ng_container_1_span_15_Template, 2, 1, "span", 20)(16, CustomerDetailPage_div_5_ng_container_1_span_16_Template, 3, 7, "span", 21)(17, CustomerDetailPage_div_5_ng_container_1_span_17_Template, 3, 1, "span", 22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 23);
    i0.ɵɵtemplate(19, CustomerDetailPage_div_5_ng_container_1_div_19_Template, 9, 7, "div", 24)(20, CustomerDetailPage_div_5_ng_container_1_div_20_Template, 5, 1, "div", 25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "section", 26)(22, "div", 27)(23, "div", 28);
    i0.ɵɵelement(24, "i", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 30)(26, "span", 31);
    i0.ɵɵtext(27, "Account Age");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "strong", 32);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(30, "div", 33)(31, "div", 28);
    i0.ɵɵelement(32, "i", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 30)(34, "span", 31);
    i0.ɵɵtext(35, "Contacts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "strong", 32);
    i0.ɵɵtext(37);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(38, "div", 35)(39, "div", 28);
    i0.ɵɵelement(40, "i", 36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "div", 30)(42, "span", 31);
    i0.ɵɵtext(43, "Opportunities");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "strong", 32);
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(46, "div", 37)(47, "div", 28);
    i0.ɵɵelement(48, "i", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "div", 30)(50, "span", 31);
    i0.ɵɵtext(51, "Leads");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "strong", 32);
    i0.ɵɵtext(53);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(54, "div", 39)(55, "div", 28);
    i0.ɵɵelement(56, "i", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(57, "div", 30)(58, "span", 31);
    i0.ɵɵtext(59, "Support Cases");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "strong", 32);
    i0.ɵɵtext(61);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(62, CustomerDetailPage_div_5_ng_container_1_div_62_Template, 8, 1, "div", 41)(63, CustomerDetailPage_div_5_ng_container_1_div_63_Template, 8, 1, "div", 42)(64, CustomerDetailPage_div_5_ng_container_1_div_64_Template, 8, 1, "div", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "div", 44)(66, "div", 45)(67, "section", 46)(68, "h2", 47);
    i0.ɵɵelement(69, "i", 48);
    i0.ɵɵtext(70, " Company Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "div", 49);
    i0.ɵɵtemplate(72, CustomerDetailPage_div_5_ng_container_1_div_72_Template, 5, 1, "div", 50);
    i0.ɵɵelementStart(73, "div", 51)(74, "span", 52);
    i0.ɵɵtext(75, "Industry");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(76, "span", 53);
    i0.ɵɵtext(77);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(78, "div", 51)(79, "span", 52);
    i0.ɵɵtext(80, "Territory");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "span", 53);
    i0.ɵɵtext(82);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(83, CustomerDetailPage_div_5_ng_container_1_div_83_Template, 5, 1, "div", 50)(84, CustomerDetailPage_div_5_ng_container_1_div_84_Template, 5, 1, "div", 50)(85, CustomerDetailPage_div_5_ng_container_1_div_85_Template, 6, 3, "div", 50);
    i0.ɵɵelementStart(86, "div", 51)(87, "span", 52);
    i0.ɵɵtext(88, "Source");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(89, "span", 53);
    i0.ɵɵtext(90);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(91, "div", 51)(92, "span", 52);
    i0.ɵɵtext(93, "Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(94, "span", 53);
    i0.ɵɵtext(95);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(96, CustomerDetailPage_div_5_ng_container_1_div_96_Template, 5, 1, "div", 50);
    i0.ɵɵelementStart(97, "div", 51)(98, "span", 52);
    i0.ɵɵtext(99, "Created");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(100, "span", 53);
    i0.ɵɵtext(101);
    i0.ɵɵpipe(102, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(103, CustomerDetailPage_div_5_ng_container_1_div_103_Template, 6, 4, "div", 50)(104, CustomerDetailPage_div_5_ng_container_1_div_104_Template, 6, 4, "div", 50)(105, CustomerDetailPage_div_5_ng_container_1_div_105_Template, 6, 4, "div", 50)(106, CustomerDetailPage_div_5_ng_container_1_div_106_Template, 6, 4, "div", 50)(107, CustomerDetailPage_div_5_ng_container_1_div_107_Template, 6, 4, "div", 50);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(108, CustomerDetailPage_div_5_ng_container_1_div_108_Template, 5, 1, "div", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(109, CustomerDetailPage_div_5_ng_container_1_section_109_Template, 7, 2, "section", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(110, "div", 45)(111, "section", 46)(112, "h2", 47);
    i0.ɵɵelement(113, "i", 56);
    i0.ɵɵtext(114, " Health & Engagement");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(115, "div", 57)(116, "div", 58)(117, "span", 59);
    i0.ɵɵtext(118, "Health Score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(119, "div", 60);
    i0.ɵɵelement(120, "div", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(121, "span", 62);
    i0.ɵɵtext(122);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(123, "div", 58)(124, "span", 59);
    i0.ɵɵtext(125, "Activity Score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(126, "div", 60);
    i0.ɵɵelement(127, "div", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(128, "span", 62);
    i0.ɵɵtext(129);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(130, "section", 46)(131, "h2", 47);
    i0.ɵɵelement(132, "i", 64);
    i0.ɵɵtext(133, " Account Team");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(134, CustomerDetailPage_div_5_ng_container_1_div_134_Template, 2, 1, "div", 65)(135, CustomerDetailPage_div_5_ng_container_1_ng_template_135_Template, 4, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(137, "section", 66)(138, "h2", 47);
    i0.ɵɵelement(139, "i", 67);
    i0.ɵɵtext(140, " Related Records");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(141, "p-tree", 68);
    i0.ɵɵlistener("onNodeSelect", function CustomerDetailPage_div_5_ng_container_1_Template_p_tree_onNodeSelect_141_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onRelatedNodeSelect($event)); });
    i0.ɵɵtemplate(142, CustomerDetailPage_div_5_ng_container_1_ng_template_142_Template, 4, 4, "ng-template", 69);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(143, CustomerDetailPage_div_5_ng_container_1_section_143_Template, 7, 1, "section", 70);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const c_r2 = ctx.ngIf;
    const noTeam_r7 = i0.ɵɵreference(136);
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r2.canEdit);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(c_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r2.statusClass(c_r2.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(c_r2.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.accountType);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.rating);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.industry);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", c_r2.healthScore > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.annualRevenue);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", ctx_r2.accountAgeDays(), "d");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(c_r2.contactCount);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(c_r2.opportunityCount);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(c_r2.leadCount);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(c_r2.supportCaseCount);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.openPipelineValue);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.closedWonRevenue);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.weightedForecast);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", c_r2.accountNumber);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(c_r2.industry || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(c_r2.territory || "\u2014");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.website);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.phone);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.numberOfEmployees);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(c_r2.accountSource || "\u2014");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(c_r2.owner || "\u2014");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.parentAccountName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(102, 48, c_r2.createdAt, "MMM d, yyyy"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", c_r2.updatedAt);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.lastActivityAt);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.renewalDate);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.contractEndDate);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.nearestOpportunityRenewal);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", c_r2.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.billingAddress() || ctx_r2.shippingAddress());
    i0.ɵɵadvance(11);
    i0.ɵɵstyleProp("width", c_r2.healthScore, "%")("background", ctx_r2.healthScoreColor());
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("color", ctx_r2.healthScoreColor());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", c_r2.healthScore, "/100");
    i0.ɵɵadvance(5);
    i0.ɵɵstyleProp("width", c_r2.activityScore, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", c_r2.activityScore, "/100");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r2.teamMembers().length > 0)("ngIfElse", noTeam_r7);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("value", ctx_r2.relatedTreeNodes());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r2.timelineLoading() && ctx_r2.timeline().length > 0);
} }
function CustomerDetailPage_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtemplate(1, CustomerDetailPage_div_5_ng_container_1_Template, 144, 51, "ng-container", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.customer());
} }
function CustomerDetailPage_ng_template_6_p_skeleton_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-skeleton", 142);
} }
function CustomerDetailPage_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 134);
    i0.ɵɵelement(2, "p-skeleton", 135)(3, "p-skeleton", 136)(4, "p-skeleton", 137);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 138);
    i0.ɵɵtemplate(6, CustomerDetailPage_ng_template_6_p_skeleton_6_Template, 1, 0, "p-skeleton", 139);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 140);
    i0.ɵɵelement(8, "p-skeleton", 141)(9, "p-skeleton", 141);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c1));
} }
export class CustomerDetailPage {
    route = inject(ActivatedRoute);
    router = inject(Router);
    customerData = inject(CustomerDataService);
    customer = signal(null, ...(ngDevMode ? [{ debugName: "customer" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    teamMembers = signal([], ...(ngDevMode ? [{ debugName: "teamMembers" }] : []));
    teamLoading = signal(false, ...(ngDevMode ? [{ debugName: "teamLoading" }] : []));
    timeline = signal([], ...(ngDevMode ? [{ debugName: "timeline" }] : []));
    timelineLoading = signal(false, ...(ngDevMode ? [{ debugName: "timelineLoading" }] : []));
    relatedTreeNodes = signal([], ...(ngDevMode ? [{ debugName: "relatedTreeNodes" }] : []));
    canEdit = tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.customersManage);
    accountAgeDays = computed(() => {
        const c = this.customer();
        if (!c)
            return 0;
        const diffMs = Date.now() - new Date(c.createdAt).getTime();
        return Math.max(Math.round(diffMs / 86_400_000), 0);
    }, ...(ngDevMode ? [{ debugName: "accountAgeDays" }] : []));
    healthScoreColor = computed(() => {
        const score = this.customer()?.healthScore ?? 0;
        if (score >= 80)
            return '#22c55e';
        if (score >= 60)
            return '#3b82f6';
        if (score >= 40)
            return '#f59e0b';
        if (score >= 20)
            return '#f97316';
        return '#ef4444';
    }, ...(ngDevMode ? [{ debugName: "healthScoreColor" }] : []));
    healthScoreLabel = computed(() => {
        const score = this.customer()?.healthScore ?? 0;
        if (score >= 80)
            return 'Excellent';
        if (score >= 60)
            return 'Good';
        if (score >= 40)
            return 'Fair';
        if (score >= 20)
            return 'Poor';
        return 'Critical';
    }, ...(ngDevMode ? [{ debugName: "healthScoreLabel" }] : []));
    billingAddress = computed(() => {
        const c = this.customer();
        if (!c)
            return null;
        const parts = [c.billingStreet, c.billingCity, c.billingState, c.billingPostalCode, c.billingCountry]
            .filter(Boolean);
        return parts.length ? parts.join(', ') : null;
    }, ...(ngDevMode ? [{ debugName: "billingAddress" }] : []));
    shippingAddress = computed(() => {
        const c = this.customer();
        if (!c)
            return null;
        const parts = [c.shippingStreet, c.shippingCity, c.shippingState, c.shippingPostalCode, c.shippingCountry]
            .filter(Boolean);
        return parts.length ? parts.join(', ') : null;
    }, ...(ngDevMode ? [{ debugName: "shippingAddress" }] : []));
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigate(['/app/customers']);
            return;
        }
        this.loadDetail(id);
        this.loadTeam(id);
        this.loadTimeline(id);
    }
    loadDetail(id) {
        this.loading.set(true);
        this.customerData.getDetail(id).subscribe({
            next: (detail) => {
                this.customer.set(detail);
                this.teamMembers.set(detail.teamMembers ?? []);
                this.loading.set(false);
                // Build related records tree from detail response
                const rel = detail.relatedRecords;
                this.relatedTreeNodes.set(this.buildRelatedTree(rel ?? { contacts: [], opportunities: [], leads: [], supportCases: [] }));
            },
            error: () => {
                this.router.navigate(['/app/customers']);
            }
        });
    }
    loadTeam(id) {
        this.teamLoading.set(true);
        this.customerData.getTeamMembers(id).subscribe({
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
    statusClass(status) {
        const s = (status || '').toLowerCase();
        if (s === 'customer')
            return 'status--customer';
        if (s === 'prospect')
            return 'status--prospect';
        if (s === 'lead')
            return 'status--lead';
        return 'status--default';
    }
    ratingClass(rating) {
        const r = (rating || '').toLowerCase();
        if (r === 'hot')
            return 'rating--hot';
        if (r === 'warm')
            return 'rating--warm';
        if (r === 'cold')
            return 'rating--cold';
        return '';
    }
    formatCurrency(amount) {
        if (amount == null)
            return '—';
        try {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
        }
        catch {
            return `$${amount.toLocaleString()}`;
        }
    }
    teamMemberInitials(name) {
        if (!name)
            return '?';
        return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
    }
    loadTimeline(id) {
        this.timelineLoading.set(true);
        this.customerData.getTimeline(id).subscribe({
            next: (entries) => {
                this.timeline.set(entries);
                this.timelineLoading.set(false);
            },
            error: () => {
                this.timeline.set([]);
                this.timelineLoading.set(false);
            }
        });
    }
    buildRelatedTree(data) {
        const makeChildren = (items, icon, type) => items.map(item => ({
            label: item.label,
            data: { id: item.id, type, subtitle: item.subtitle },
            icon,
            leaf: true,
            styleClass: `child-node child-node--${type}`
        }));
        return [
            {
                label: `Contacts (${data.contacts.length})`,
                icon: 'pi pi-id-card',
                expanded: data.contacts.length > 0,
                selectable: false,
                styleClass: 'parent-node parent-node--contacts',
                children: makeChildren(data.contacts, 'pi pi-user', 'contact')
            },
            {
                label: `Opportunities (${data.opportunities.length})`,
                icon: 'pi pi-chart-line',
                expanded: data.opportunities.length > 0,
                selectable: false,
                styleClass: 'parent-node parent-node--opportunities',
                children: makeChildren(data.opportunities, 'pi pi-briefcase', 'opportunity')
            },
            {
                label: `Leads (${data.leads.length})`,
                icon: 'pi pi-bolt',
                expanded: data.leads.length > 0,
                selectable: false,
                styleClass: 'parent-node parent-node--leads',
                children: makeChildren(data.leads, 'pi pi-user-plus', 'lead')
            },
            {
                label: `Support Cases (${data.supportCases.length})`,
                icon: 'pi pi-ticket',
                expanded: data.supportCases.length > 0,
                selectable: false,
                styleClass: 'parent-node parent-node--cases',
                children: makeChildren(data.supportCases, 'pi pi-inbox', 'supportCase')
            }
        ];
    }
    onRelatedNodeSelect(event) {
        const nodeData = event.node?.data;
        if (!nodeData?.id)
            return;
        switch (nodeData.type) {
            case 'contact':
                this.router.navigate(['/app/contacts', nodeData.id, 'edit']);
                break;
            case 'opportunity':
                this.router.navigate(['/app/deals', nodeData.id]);
                break;
            case 'lead':
                this.router.navigate(['/app/leads', nodeData.id, 'edit']);
                break;
            case 'supportCase':
                this.router.navigate(['/app/helpdesk/cases', nodeData.id]);
                break;
        }
    }
    timelineIcon(type) {
        switch (type) {
            case 'Call': return 'pi pi-phone';
            case 'Email': return 'pi pi-envelope';
            case 'Meeting': return 'pi pi-calendar';
            case 'Task': return 'pi pi-check-square';
            case 'Note': return 'pi pi-file';
            case 'FollowUp': return 'pi pi-replay';
            case 'EmailLog': return 'pi pi-send';
            case 'LinkedEmail': return 'pi pi-link';
            default: return 'pi pi-circle';
        }
    }
    static ɵfac = function CustomerDetailPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomerDetailPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomerDetailPage, selectors: [["app-customer-detail"]], decls: 8, vars: 2, consts: [["pageLoading", ""], ["noTeam", ""], [1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], ["class", "page-content", 4, "ngIf", "ngIfElse"], [1, "page-content"], [4, "ngIf"], [1, "hero-section"], [1, "hero-left"], [1, "hero-nav"], ["routerLink", "/app/customers", 1, "back-link"], [1, "pi", "pi-arrow-left"], ["class", "edit-link", 3, "routerLink", 4, "ngIf"], [1, "hero-title"], [1, "title-gradient"], [1, "hero-meta"], [1, "hero-badge", 3, "ngClass"], ["class", "hero-badge-secondary", 4, "ngIf"], ["class", "hero-badge-secondary", 3, "ngClass", 4, "ngIf"], ["class", "hero-industry", 4, "ngIf"], [1, "hero-right"], ["class", "hero-health", 4, "ngIf"], ["class", "hero-revenue", 4, "ngIf"], [1, "kpi-section"], [1, "kpi-card", "kpi-card--age"], [1, "kpi-icon"], [1, "pi", "pi-stopwatch"], [1, "kpi-content"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-card", "kpi-card--contacts"], [1, "pi", "pi-id-card"], [1, "kpi-card", "kpi-card--opportunities"], [1, "pi", "pi-chart-line"], [1, "kpi-card", "kpi-card--leads"], [1, "pi", "pi-bolt"], [1, "kpi-card", "kpi-card--cases"], [1, "pi", "pi-ticket"], ["class", "kpi-card kpi-card--pipeline", 4, "ngIf"], ["class", "kpi-card kpi-card--revenue", 4, "ngIf"], ["class", "kpi-card kpi-card--forecast", 4, "ngIf"], [1, "detail-grid"], [1, "detail-col"], [1, "detail-card"], [1, "card-title"], [1, "pi", "pi-building"], [1, "detail-fields"], ["class", "detail-field", 4, "ngIf"], [1, "detail-field"], [1, "field-label"], [1, "field-value"], ["class", "detail-summary", 4, "ngIf"], ["class", "detail-card", 4, "ngIf"], [1, "pi", "pi-heart"], [1, "score-row"], [1, "score-item"], [1, "score-label"], [1, "score-bar"], [1, "score-bar-fill"], [1, "score-value"], [1, "score-bar-fill", "score-bar-fill--activity"], [1, "pi", "pi-users"], ["class", "team-list", 4, "ngIf", "ngIfElse"], [1, "detail-card", "related-tree-card"], [1, "pi", "pi-link"], ["selectionMode", "single", "styleClass", "related-tree", 3, "onNodeSelect", "value"], ["pTemplate", "default"], ["class", "timeline-section", 4, "ngIf"], [1, "edit-link", 3, "routerLink"], [1, "pi", "pi-pencil"], [1, "hero-badge-secondary"], [1, "hero-badge-secondary", 3, "ngClass"], [1, "pi", 3, "ngClass"], [1, "hero-industry"], [1, "pi", "pi-briefcase"], [1, "hero-health"], [1, "health-ring"], ["viewBox", "0 0 36 36"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-bg"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill"], [1, "health-value"], [1, "health-label"], [1, "hero-revenue"], [1, "revenue-value"], [1, "revenue-label"], [1, "kpi-card", "kpi-card--pipeline"], [1, "pi", "pi-dollar"], [1, "kpi-card", "kpi-card--revenue"], [1, "pi", "pi-check-circle"], [1, "kpi-card", "kpi-card--forecast"], [1, "pi", "pi-chart-bar"], [1, "field-value", "field-link"], [1, "detail-summary"], [1, "summary-text"], [1, "pi", "pi-map-marker"], [1, "address-grid"], ["class", "address-block", 4, "ngIf"], [1, "address-block"], [1, "address-type"], [1, "address-text"], [1, "team-list"], ["class", "team-member", 4, "ngFor", "ngForOf"], [1, "team-member"], [1, "member-avatar"], [3, "src", "alt", "title"], [1, "member-info"], [1, "member-name"], [1, "member-role"], [1, "empty-state"], [1, "tree-node-content"], [1, "tree-node-label"], ["class", "tree-node-subtitle", 4, "ngIf"], [1, "tree-node-subtitle"], [1, "timeline-section"], [1, "pi", "pi-history"], [1, "timeline-list"], ["class", "timeline-entry", 4, "ngFor", "ngForOf"], [1, "timeline-entry"], [1, "timeline-dot"], [1, "timeline-content"], [1, "timeline-header"], [1, "timeline-type"], [1, "timeline-date"], ["class", "timeline-subject", 4, "ngIf"], ["class", "timeline-desc", 4, "ngIf"], [1, "timeline-meta"], [1, "timeline-subject"], [1, "timeline-desc"], [1, "pi", "pi-user"], [1, "pi", "pi-arrows-h"], [1, "pi", "pi-envelope"], [1, "skeleton-hero"], ["width", "120px", "height", "28px", "borderRadius", "8px"], ["width", "350px", "height", "40px", "borderRadius", "8px"], ["width", "200px", "height", "24px", "borderRadius", "16px"], [1, "skeleton-kpi"], ["width", "100%", "height", "72px", "borderRadius", "12px", 4, "ngFor", "ngForOf"], [1, "skeleton-grid"], ["width", "100%", "height", "300px", "borderRadius", "16px"], ["width", "100%", "height", "72px", "borderRadius", "12px"]], template: function CustomerDetailPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2)(1, "div", 3);
            i0.ɵɵelement(2, "div", 4)(3, "div", 5)(4, "div", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, CustomerDetailPage_div_5_Template, 2, 1, "div", 7)(6, CustomerDetailPage_ng_template_6_Template, 10, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const pageLoading_r8 = i0.ɵɵreference(7);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", !ctx.loading())("ngIfElse", pageLoading_r8);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, RouterModule, i2.RouterLink, TooltipModule,
            SkeletonModule, i3.Skeleton, i4.PrimeTemplate, BreadcrumbsComponent,
            Tree, i1.DecimalPipe, i1.DatePipe], styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   Customer[_ngcontent-%COMP%]   360[_ngcontent-%COMP%]   Detail[_ngcontent-%COMP%]   Page\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n\n  &.orb-1 { width: 600px; height: 600px; background: $primary-gradient; top: -200px; right: -100px; }\n  &.orb-2 { width: 400px; height: 400px; background: $cyan-gradient; bottom: 10%; left: -100px; animation-delay: -7s; }\n  &.orb-3 { width: 300px; height: 300px; background: $secondary-gradient; top: 40%; right: 20%; animation-delay: -14s; }\n}\n\n.page-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   HERO[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.hero-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  align-items: center;\n  margin-bottom: $space-2;\n}\n\n.back-link[_ngcontent-%COMP%], \n.edit-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  text-decoration: none;\n  border-radius: $radius-md;\n  padding: $space-1 $space-3;\n  transition: all 200ms;\n\n  i { font-size: 0.75rem; }\n}\n\n.back-link[_ngcontent-%COMP%] {\n  color: $gray-500;\n  background: $glass-bg-subtle;\n  border: 1px solid $glass-border;\n\n  &:hover {\n    color: $gray-800;\n    background: white;\n  }\n}\n\n.edit-link[_ngcontent-%COMP%] {\n  color: white;\n  background: $primary-gradient;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n  }\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-2;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: _ngcontent-%COMP%_gradient-shift 4s ease-in-out infinite;\n  }\n}\n\n.hero-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 2px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  text-transform: capitalize;\n  background: rgba($gray-500, 0.15);\n  color: $gray-600;\n\n  &.status--customer { background: rgba($success, 0.15); color: color.adjust($success, $lightness: -15%); }\n  &.status--prospect { background: rgba(#a855f7, 0.15); color: #a855f7; }\n  &.status--lead { background: rgba($cyan, 0.15); color: color.adjust($cyan, $lightness: -15%); }\n}\n\n.hero-badge-secondary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 2px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  background: rgba($gray-400, 0.12);\n  color: $gray-600;\n\n  i { font-size: 0.7rem; }\n\n  &.rating--hot { background: rgba(#ef4444, 0.12); color: #ef4444; }\n  &.rating--warm { background: rgba(#f59e0b, 0.12); color: #f59e0b; }\n  &.rating--cold { background: rgba(#3b82f6, 0.12); color: #3b82f6; }\n}\n\n.hero-industry[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  color: $gray-500;\n\n  i { font-size: 0.75rem; }\n}\n\n.hero-right[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-5;\n  align-items: center;\n\n  @media (max-width: 1024px) {\n    justify-content: flex-start;\n  }\n}\n\n.hero-health[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n}\n\n.health-ring[_ngcontent-%COMP%] {\n  position: relative;\n  width: 56px;\n  height: 56px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: $gray-200;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n  }\n}\n\n.health-value[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n.health-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.hero-revenue[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n}\n\n.revenue-value[_ngcontent-%COMP%] {\n  font-size: $font-size-3xl;\n  font-weight: 800;\n  color: $gray-800;\n}\n\n.revenue-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   KPI[_ngcontent-%COMP%]   CARDS[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.kpi-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); }\n  @media (max-width: 768px)  { grid-template-columns: repeat(2, 1fr); }\n  @media (max-width: 480px)  { grid-template-columns: 1fr; }\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  transition: all 250ms;\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 5 {\n    &:nth-child(#{$i}) { animation-delay: #{$i * 0.05}s; }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n\n    .kpi-icon { transform: scale(1.1) rotate(5deg); }\n  }\n}\n\n.kpi-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  font-size: $font-size-lg;\n  color: white;\n  flex-shrink: 0;\n  transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  .kpi-card--age & { background: $primary-gradient; }\n  .kpi-card--contacts & { background: $cyan-gradient; }\n  .kpi-card--opportunities & { background: $success-gradient; }\n  .kpi-card--leads & { background: linear-gradient(135deg, #a855f7, #9333ea); }\n  .kpi-card--cases & { background: $orange-gradient; }\n  .kpi-card--pipeline & { background: linear-gradient(135deg, #3b82f6, #2563eb); }\n  .kpi-card--revenue & { background: $success-gradient; }\n  .kpi-card--forecast & { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }\n}\n\n.kpi-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.kpi-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.kpi-value[_ngcontent-%COMP%] {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   DETAIL[_ngcontent-%COMP%]   GRID[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-4;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  padding: $space-4;\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.5s ease-out backwards;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n}\n\n.card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin: 0 0 $space-4;\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: $gray-800;\n\n  i {\n    font-size: $font-size-lg;\n    color: #06b6d4;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   KEY[_ngcontent-%COMP%]   DETAILS[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.detail-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-3;\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.field-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-weight: 600;\n}\n\n.field-value[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  font-weight: 500;\n  color: $gray-800;\n\n  &.field-link {\n    color: #3b82f6;\n  }\n}\n\n.detail-summary[_ngcontent-%COMP%] {\n  margin-top: $space-4;\n  padding-top: $space-3;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.summary-text[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  line-height: 1.6;\n  color: $gray-600;\n  margin: $space-1 0 0;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   ADDRESSES[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.address-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-4;\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.address-block[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.address-type[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-weight: 600;\n}\n\n.address-text[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  color: $gray-700;\n  line-height: 1.5;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   SCORES[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.score-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.score-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.score-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-weight: 600;\n}\n\n.score-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 8px;\n  background: $gray-200;\n  border-radius: $radius-full;\n  overflow: hidden;\n}\n\n.score-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: $radius-full;\n  transition: width 1s ease-out;\n\n  &--activity {\n    background: $primary-gradient;\n  }\n}\n\n.score-value[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   TEAM[_ngcontent-%COMP%]   MEMBERS[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.team-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.team-member[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2;\n  border-radius: $radius-md;\n  transition: background 150ms;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.03);\n  }\n}\n\n.member-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.member-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n\n.member-name[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.member-role[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   RELATED[_ngcontent-%COMP%]   RECORDS[_ngcontent-%COMP%]   TREE[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.related-tree-card[_ngcontent-%COMP%] {\n  ::ng-deep .related-tree {\n    padding: 0;\n    background: transparent;\n    border: none;\n\n    .p-tree-node {\n      padding: 0;\n    }\n\n    .p-tree-node-content {\n      padding: $space-2;\n      border-radius: $radius-md;\n      transition: background 150ms, transform 150ms;\n\n      &:hover {\n        background: rgba(0, 0, 0, 0.03);\n      }\n\n      &.p-tree-node-selected {\n        background: rgba(102, 126, 234, 0.08);\n        outline: none;\n        box-shadow: none;\n      }\n    }\n\n    // Parent node icons with gradient backgrounds\n    .p-tree-node-icon {\n      width: 28px;\n      height: 28px;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: $radius-md;\n      font-size: $font-size-sm;\n      color: white;\n      flex-shrink: 0;\n      margin-right: $space-2;\n    }\n\n    // Parent node icon colors\n    .parent-node--contacts > .p-tree-node-content .p-tree-node-icon {\n      background: $cyan-gradient;\n    }\n\n    .parent-node--opportunities > .p-tree-node-content .p-tree-node-icon {\n      background: $success-gradient;\n    }\n\n    .parent-node--leads > .p-tree-node-content .p-tree-node-icon {\n      background: linear-gradient(135deg, #a855f7, #9333ea);\n    }\n\n    .parent-node--cases > .p-tree-node-content .p-tree-node-icon {\n      background: $orange-gradient;\n    }\n\n    // Child node icon colors (smaller, subtler)\n    .child-node > .p-tree-node-content .p-tree-node-icon {\n      width: 24px;\n      height: 24px;\n      font-size: 0.75rem;\n      border-radius: 6px;\n    }\n\n    .child-node--contact > .p-tree-node-content .p-tree-node-icon {\n      background: rgba(6, 182, 212, 0.15);\n      color: #06b6d4;\n    }\n\n    .child-node--opportunity > .p-tree-node-content .p-tree-node-icon {\n      background: rgba(34, 197, 94, 0.15);\n      color: #22c55e;\n    }\n\n    .child-node--lead > .p-tree-node-content .p-tree-node-icon {\n      background: rgba(168, 85, 247, 0.15);\n      color: #a855f7;\n    }\n\n    .child-node--supportCase > .p-tree-node-content .p-tree-node-icon {\n      background: rgba(249, 115, 22, 0.15);\n      color: #f97316;\n    }\n\n    // Parent node label styling\n    .parent-node > .p-tree-node-content .tree-node-label {\n      font-size: $font-size-md;\n      font-weight: 600;\n      color: $gray-800;\n    }\n\n    // Child node styling\n    .child-node > .p-tree-node-content {\n      cursor: pointer;\n\n      &:hover {\n        background: rgba(102, 126, 234, 0.06);\n        transform: translateX(2px);\n      }\n    }\n\n    .tree-node-content {\n      display: flex;\n      flex-direction: column;\n      gap: 1px;\n    }\n\n    .tree-node-label {\n      font-size: $font-size-sm;\n      font-weight: 500;\n      color: $gray-700;\n    }\n\n    .tree-node-subtitle {\n      font-size: $font-size-xs;\n      color: $gray-500;\n      font-weight: 400;\n    }\n\n    .tree-node--clickable {\n      .tree-node-label {\n        color: $gray-800;\n\n        &:hover {\n          color: #667eea;\n        }\n      }\n    }\n\n    // Toggler styling\n    .p-tree-node-toggle-button {\n      color: $gray-400;\n      width: 24px;\n      height: 24px;\n\n      &:hover {\n        color: $gray-600;\n        background: rgba(0, 0, 0, 0.05);\n      }\n    }\n\n    // Branch lines from parent to children\n    .p-tree-node-children {\n      padding-left: 28px;\n      position: relative;\n      margin-left: 10px;\n\n      // Vertical line from parent down along children\n      &::before {\n        content: '';\n        position: absolute;\n        left: 10px;\n        top: 0;\n        bottom: 16px;\n        width: 1.5px;\n        background: linear-gradient(180deg, rgba(102, 126, 234, 0.35) 0%, rgba(102, 126, 234, 0.08) 100%);\n        border-radius: 1px;\n      }\n\n      // Horizontal branch line to each child's content\n      .p-tree-node-content {\n        position: relative;\n\n        &::after {\n          content: '';\n          position: absolute;\n          left: -18px;\n          top: 50%;\n          width: 14px;\n          height: 1.5px;\n          background: rgba(102, 126, 234, 0.25);\n          border-radius: 1px;\n          pointer-events: none;\n        }\n      }\n    }\n\n    // Color-code branch lines per category\n    .parent-node--contacts .p-tree-node-children {\n      &::before { background: linear-gradient(180deg, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.08) 100%); }\n      .p-tree-node-content::after { background: rgba(6, 182, 212, 0.35); }\n    }\n\n    .parent-node--opportunities .p-tree-node-children {\n      &::before { background: linear-gradient(180deg, rgba(34, 197, 94, 0.4) 0%, rgba(34, 197, 94, 0.08) 100%); }\n      .p-tree-node-content::after { background: rgba(34, 197, 94, 0.35); }\n    }\n\n    .parent-node--leads .p-tree-node-children {\n      &::before { background: linear-gradient(180deg, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.08) 100%); }\n      .p-tree-node-content::after { background: rgba(168, 85, 247, 0.35); }\n    }\n\n    .parent-node--cases .p-tree-node-children {\n      &::before { background: linear-gradient(180deg, rgba(249, 115, 22, 0.4) 0%, rgba(249, 115, 22, 0.08) 100%); }\n      .p-tree-node-content::after { background: rgba(249, 115, 22, 0.35); }\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   EMPTY[_ngcontent-%COMP%]   STATE[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-5;\n  color: $gray-400;\n\n  i {\n    font-size: 1.5rem;\n  }\n\n  span {\n    font-size: $font-size-sm;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   SKELETON[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.skeleton-hero[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  margin-bottom: $space-5;\n}\n\n.skeleton-kpi[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); }\n  @media (max-width: 768px)  { grid-template-columns: repeat(2, 1fr); }\n}\n\n.skeleton-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-4;\n\n  @media (max-width: 1024px) { grid-template-columns: 1fr; }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   COMMUNICATION[_ngcontent-%COMP%]   TIMELINE[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n.timeline-section[_ngcontent-%COMP%] {\n  margin-top: $space-5;\n  animation: fade-in-up 0.5s ease-out 0.5s both;\n}\n\n.timeline-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  padding: $space-3 0;\n}\n\n.timeline-entry[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  border-left: 2px solid rgba(102, 126, 234, 0.15);\n  margin-left: $space-4;\n  position: relative;\n  transition: background 150ms;\n\n  &:hover {\n    background: rgba(102, 126, 234, 0.03);\n  }\n}\n\n.timeline-dot[_ngcontent-%COMP%] {\n  position: absolute;\n  left: -15px;\n  top: $space-3;\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $glass-bg;\n  border: 2px solid rgba(102, 126, 234, 0.3);\n  border-radius: 50%;\n  flex-shrink: 0;\n\n  i {\n    font-size: 0.75rem;\n    color: #667eea;\n  }\n}\n\n.timeline-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding-left: $space-4;\n  flex: 1;\n  min-width: 0;\n}\n\n.timeline-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-3;\n}\n\n.timeline-type[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.timeline-date[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-400;\n  white-space: nowrap;\n}\n\n.timeline-subject[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  font-weight: 500;\n  color: $gray-800;\n}\n\n.timeline-desc[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-500;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.timeline-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  margin-top: 2px;\n\n  span {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-400;\n\n    i { font-size: 0.7rem; }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550[_ngcontent-%COMP%]   ANIMATIONS[_ngcontent-%COMP%]   \u2550\u2550\u2550\n\n@keyframes[_ngcontent-%COMP%]   fade-in-up[_ngcontent-%COMP%] {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes _ngcontent-%COMP%_gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(50px, -30px) scale(1.1); }\n  50% { transform: translate(100px, 20px) scale(0.9); }\n  75% { transform: translate(30px, 50px) scale(1.05); }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomerDetailPage, [{
        type: Component,
        args: [{ standalone: true, selector: 'app-customer-detail', imports: [
                    CommonModule,
                    RouterModule,
                    TooltipModule,
                    SkeletonModule,
                    BreadcrumbsComponent,
                    Tree
                ], template: "<div class=\"page-container\">\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <div class=\"page-content\" *ngIf=\"!loading(); else pageLoading\">\n    <ng-container *ngIf=\"customer() as c\">\n      <!-- \u2550\u2550\u2550 HERO \u2550\u2550\u2550 -->\n      <header class=\"hero-section\">\n        <div class=\"hero-left\">\n          <app-breadcrumbs></app-breadcrumbs>\n          <div class=\"hero-nav\">\n            <a class=\"back-link\" routerLink=\"/app/customers\">\n              <i class=\"pi pi-arrow-left\"></i> Customers\n            </a>\n            <a *ngIf=\"canEdit\" class=\"edit-link\" [routerLink]=\"'/app/customers/' + c.id + '/edit'\">\n              <i class=\"pi pi-pencil\"></i> Edit\n            </a>\n          </div>\n          <h1 class=\"hero-title\">\n            <span class=\"title-gradient\">{{ c.name }}</span>\n          </h1>\n          <div class=\"hero-meta\">\n            <span class=\"hero-badge\" [ngClass]=\"statusClass(c.status)\">{{ c.status }}</span>\n            <span class=\"hero-badge-secondary\" *ngIf=\"c.accountType\">{{ c.accountType }}</span>\n            <span class=\"hero-badge-secondary\" *ngIf=\"c.rating\" [ngClass]=\"ratingClass(c.rating)\">\n              <i class=\"pi\" [ngClass]=\"{'pi-sun': c.rating === 'Hot', 'pi-cloud': c.rating === 'Warm', 'pi-snowflake': c.rating === 'Cold'}\"></i>\n              {{ c.rating }}\n            </span>\n            <span class=\"hero-industry\" *ngIf=\"c.industry\">\n              <i class=\"pi pi-briefcase\"></i> {{ c.industry }}\n            </span>\n          </div>\n        </div>\n        <div class=\"hero-right\">\n          <div class=\"hero-health\" *ngIf=\"c.healthScore > 0\">\n            <div class=\"health-ring\">\n              <svg viewBox=\"0 0 36 36\">\n                <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n                <path class=\"ring-fill\" [style.stroke]=\"healthScoreColor()\" [attr.stroke-dasharray]=\"c.healthScore + ', 100'\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n              </svg>\n              <span class=\"health-value\">{{ c.healthScore }}</span>\n            </div>\n            <span class=\"health-label\" [style.color]=\"healthScoreColor()\">{{ healthScoreLabel() }}</span>\n          </div>\n          <div class=\"hero-revenue\" *ngIf=\"c.annualRevenue\">\n            <span class=\"revenue-value\">{{ formatCurrency(c.annualRevenue) }}</span>\n            <span class=\"revenue-label\">Annual Revenue</span>\n          </div>\n        </div>\n      </header>\n\n      <!-- \u2550\u2550\u2550 KPI CARDS \u2550\u2550\u2550 -->\n      <section class=\"kpi-section\">\n        <div class=\"kpi-card kpi-card--age\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-stopwatch\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Account Age</span>\n            <strong class=\"kpi-value\">{{ accountAgeDays() }}d</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--contacts\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-id-card\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Contacts</span>\n            <strong class=\"kpi-value\">{{ c.contactCount }}</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--opportunities\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-chart-line\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Opportunities</span>\n            <strong class=\"kpi-value\">{{ c.opportunityCount }}</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--leads\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-bolt\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Leads</span>\n            <strong class=\"kpi-value\">{{ c.leadCount }}</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--cases\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-ticket\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Support Cases</span>\n            <strong class=\"kpi-value\">{{ c.supportCaseCount }}</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--pipeline\" *ngIf=\"c.openPipelineValue\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-dollar\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Open Pipeline</span>\n            <strong class=\"kpi-value\">{{ formatCurrency(c.openPipelineValue) }}</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--revenue\" *ngIf=\"c.closedWonRevenue\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-check-circle\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Closed Won</span>\n            <strong class=\"kpi-value\">{{ formatCurrency(c.closedWonRevenue) }}</strong>\n          </div>\n        </div>\n        <div class=\"kpi-card kpi-card--forecast\" *ngIf=\"c.weightedForecast\">\n          <div class=\"kpi-icon\"><i class=\"pi pi-chart-bar\"></i></div>\n          <div class=\"kpi-content\">\n            <span class=\"kpi-label\">Forecast</span>\n            <strong class=\"kpi-value\">{{ formatCurrency(c.weightedForecast) }}</strong>\n          </div>\n        </div>\n      </section>\n\n      <!-- \u2550\u2550\u2550 MAIN GRID \u2550\u2550\u2550 -->\n      <div class=\"detail-grid\">\n        <!-- LEFT COLUMN -->\n        <div class=\"detail-col\">\n          <!-- Company Details -->\n          <section class=\"detail-card\">\n            <h2 class=\"card-title\"><i class=\"pi pi-building\"></i> Company Details</h2>\n            <div class=\"detail-fields\">\n              <div class=\"detail-field\" *ngIf=\"c.accountNumber\">\n                <span class=\"field-label\">Account Number</span>\n                <span class=\"field-value\">{{ c.accountNumber }}</span>\n              </div>\n              <div class=\"detail-field\">\n                <span class=\"field-label\">Industry</span>\n                <span class=\"field-value\">{{ c.industry || '\u2014' }}</span>\n              </div>\n              <div class=\"detail-field\">\n                <span class=\"field-label\">Territory</span>\n                <span class=\"field-value\">{{ c.territory || '\u2014' }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"c.website\">\n                <span class=\"field-label\">Website</span>\n                <span class=\"field-value field-link\">{{ c.website }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"c.phone\">\n                <span class=\"field-label\">Phone</span>\n                <span class=\"field-value\">{{ c.phone }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"c.numberOfEmployees\">\n                <span class=\"field-label\">Employees</span>\n                <span class=\"field-value\">{{ c.numberOfEmployees | number }}</span>\n              </div>\n              <div class=\"detail-field\">\n                <span class=\"field-label\">Source</span>\n                <span class=\"field-value\">{{ c.accountSource || '\u2014' }}</span>\n              </div>\n              <div class=\"detail-field\">\n                <span class=\"field-label\">Owner</span>\n                <span class=\"field-value\">{{ c.owner || '\u2014' }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"c.parentAccountName\">\n                <span class=\"field-label\">Parent Account</span>\n                <span class=\"field-value\">{{ c.parentAccountName }}</span>\n              </div>\n              <div class=\"detail-field\">\n                <span class=\"field-label\">Created</span>\n                <span class=\"field-value\">{{ c.createdAt | date:'MMM d, yyyy' }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"c.updatedAt\">\n                <span class=\"field-label\">Updated</span>\n                <span class=\"field-value\">{{ c.updatedAt | date:'MMM d, yyyy' }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"c.lastActivityAt\">\n                <span class=\"field-label\">Last Activity</span>\n                <span class=\"field-value\">{{ c.lastActivityAt | date:'MMM d, yyyy' }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"c.renewalDate\">\n                <span class=\"field-label\">Renewal Date</span>\n                <span class=\"field-value\">{{ c.renewalDate | date:'MMM d, yyyy' }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"c.contractEndDate\">\n                <span class=\"field-label\">Contract End</span>\n                <span class=\"field-value\">{{ c.contractEndDate | date:'MMM d, yyyy' }}</span>\n              </div>\n              <div class=\"detail-field\" *ngIf=\"c.nearestOpportunityRenewal\">\n                <span class=\"field-label\">Next Opp Renewal</span>\n                <span class=\"field-value\">{{ c.nearestOpportunityRenewal | date:'MMM d, yyyy' }}</span>\n              </div>\n            </div>\n            <div class=\"detail-summary\" *ngIf=\"c.description\">\n              <span class=\"field-label\">Description</span>\n              <p class=\"summary-text\">{{ c.description }}</p>\n            </div>\n          </section>\n\n          <!-- Addresses -->\n          <section class=\"detail-card\" *ngIf=\"billingAddress() || shippingAddress()\">\n            <h2 class=\"card-title\"><i class=\"pi pi-map-marker\"></i> Addresses</h2>\n            <div class=\"address-grid\">\n              <div class=\"address-block\" *ngIf=\"billingAddress()\">\n                <span class=\"address-type\">Billing Address</span>\n                <span class=\"address-text\">{{ billingAddress() }}</span>\n              </div>\n              <div class=\"address-block\" *ngIf=\"shippingAddress()\">\n                <span class=\"address-type\">Shipping Address</span>\n                <span class=\"address-text\">{{ shippingAddress() }}</span>\n              </div>\n            </div>\n          </section>\n        </div>\n\n        <!-- RIGHT COLUMN -->\n        <div class=\"detail-col\">\n          <!-- Health & Activity Score -->\n          <section class=\"detail-card\">\n            <h2 class=\"card-title\"><i class=\"pi pi-heart\"></i> Health & Engagement</h2>\n            <div class=\"score-row\">\n              <div class=\"score-item\">\n                <span class=\"score-label\">Health Score</span>\n                <div class=\"score-bar\">\n                  <div class=\"score-bar-fill\" [style.width.%]=\"c.healthScore\" [style.background]=\"healthScoreColor()\"></div>\n                </div>\n                <span class=\"score-value\" [style.color]=\"healthScoreColor()\">{{ c.healthScore }}/100</span>\n              </div>\n              <div class=\"score-item\">\n                <span class=\"score-label\">Activity Score</span>\n                <div class=\"score-bar\">\n                  <div class=\"score-bar-fill score-bar-fill--activity\" [style.width.%]=\"c.activityScore\"></div>\n                </div>\n                <span class=\"score-value\">{{ c.activityScore }}/100</span>\n              </div>\n            </div>\n          </section>\n\n          <!-- Team Members -->\n          <section class=\"detail-card\">\n            <h2 class=\"card-title\"><i class=\"pi pi-users\"></i> Account Team</h2>\n            <div class=\"team-list\" *ngIf=\"teamMembers().length > 0; else noTeam\">\n              <div class=\"team-member\" *ngFor=\"let member of teamMembers()\">\n                <div class=\"member-avatar\">\n                  <img\n                    [src]=\"$any(member).profilePictureUrl || ('https://i.pravatar.cc/150?u=' + (member.userId || member.userName))\"\n                    [alt]=\"member.userName + ' avatar'\"\n                    [title]=\"member.userName + ' avatar'\"\n                  />\n                </div>\n                <div class=\"member-info\">\n                  <span class=\"member-name\">{{ member.userName }}</span>\n                  <span class=\"member-role\">{{ member.role }}</span>\n                </div>\n              </div>\n            </div>\n            <ng-template #noTeam>\n              <div class=\"empty-state\">\n                <i class=\"pi pi-users\"></i>\n                <span>No team members assigned</span>\n              </div>\n            </ng-template>\n          </section>\n\n          <!-- Related Records Tree -->\n          <section class=\"detail-card related-tree-card\">\n            <h2 class=\"card-title\"><i class=\"pi pi-link\"></i> Related Records</h2>\n            <p-tree\n              [value]=\"relatedTreeNodes()\"\n              selectionMode=\"single\"\n              (onNodeSelect)=\"onRelatedNodeSelect($event)\"\n              styleClass=\"related-tree\"\n            >\n              <ng-template pTemplate=\"default\" let-node>\n                <span class=\"tree-node-content\" [class.tree-node--clickable]=\"node.leaf\">\n                  <span class=\"tree-node-label\">{{ node.label }}</span>\n                  <span class=\"tree-node-subtitle\" *ngIf=\"node.data?.subtitle\">{{ node.data.subtitle }}</span>\n                </span>\n              </ng-template>\n            </p-tree>\n          </section>\n        </div>\n      </div>\n\n      <!-- \u2550\u2550\u2550 COMMUNICATION TIMELINE \u2550\u2550\u2550 -->\n      <section class=\"timeline-section\" *ngIf=\"!timelineLoading() && timeline().length > 0\">\n        <div class=\"detail-card\">\n          <h2 class=\"card-title\"><i class=\"pi pi-history\"></i> Communication History</h2>\n          <div class=\"timeline-list\">\n            <div class=\"timeline-entry\" *ngFor=\"let entry of timeline()\">\n              <div class=\"timeline-dot\">\n                <i [class]=\"timelineIcon(entry.type)\"></i>\n              </div>\n              <div class=\"timeline-content\">\n                <div class=\"timeline-header\">\n                  <span class=\"timeline-type\">{{ entry.type }}</span>\n                  <span class=\"timeline-date\">{{ entry.occurredAt | date:'MMM d, yyyy h:mm a' }}</span>\n                </div>\n                <span class=\"timeline-subject\" *ngIf=\"entry.subject\">{{ entry.subject }}</span>\n                <span class=\"timeline-desc\" *ngIf=\"entry.description\">{{ entry.description }}</span>\n                <div class=\"timeline-meta\">\n                  <span *ngIf=\"entry.ownerName\"><i class=\"pi pi-user\"></i> {{ entry.ownerName }}</span>\n                  <span *ngIf=\"entry.direction\"><i class=\"pi pi-arrows-h\"></i> {{ entry.direction }}</span>\n                  <span *ngIf=\"entry.fromEmail\"><i class=\"pi pi-envelope\"></i> {{ entry.fromEmail }}</span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </section>\n    </ng-container>\n  </div>\n\n  <!-- Loading skeleton -->\n  <ng-template #pageLoading>\n    <div class=\"page-content\">\n      <div class=\"skeleton-hero\">\n        <p-skeleton width=\"120px\" height=\"28px\" borderRadius=\"8px\"></p-skeleton>\n        <p-skeleton width=\"350px\" height=\"40px\" borderRadius=\"8px\"></p-skeleton>\n        <p-skeleton width=\"200px\" height=\"24px\" borderRadius=\"16px\"></p-skeleton>\n      </div>\n      <div class=\"skeleton-kpi\">\n        <p-skeleton *ngFor=\"let _ of [1,2,3,4,5]\" width=\"100%\" height=\"72px\" borderRadius=\"12px\"></p-skeleton>\n      </div>\n      <div class=\"skeleton-grid\">\n        <p-skeleton width=\"100%\" height=\"300px\" borderRadius=\"16px\"></p-skeleton>\n        <p-skeleton width=\"100%\" height=\"300px\" borderRadius=\"16px\"></p-skeleton>\n      </div>\n    </div>\n  </ng-template>\n</div>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// Customer 360 Detail Page\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: orb-float 20s ease-in-out infinite;\n\n  &.orb-1 { width: 600px; height: 600px; background: $primary-gradient; top: -200px; right: -100px; }\n  &.orb-2 { width: 400px; height: 400px; background: $cyan-gradient; bottom: 10%; left: -100px; animation-delay: -7s; }\n  &.orb-3 { width: 300px; height: 300px; background: $secondary-gradient; top: 40%; right: 20%; animation-delay: -14s; }\n}\n\n.page-content {\n  position: relative;\n  z-index: 1;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n\n// \u2550\u2550\u2550 HERO \u2550\u2550\u2550\n\n.hero-section {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-nav {\n  display: flex;\n  gap: $space-3;\n  align-items: center;\n  margin-bottom: $space-2;\n}\n\n.back-link,\n.edit-link {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  text-decoration: none;\n  border-radius: $radius-md;\n  padding: $space-1 $space-3;\n  transition: all 200ms;\n\n  i { font-size: 0.75rem; }\n}\n\n.back-link {\n  color: $gray-500;\n  background: $glass-bg-subtle;\n  border: 1px solid $glass-border;\n\n  &:hover {\n    color: $gray-800;\n    background: white;\n  }\n}\n\n.edit-link {\n  color: white;\n  background: $primary-gradient;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n  }\n}\n\n.hero-title {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-2;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: gradient-shift 4s ease-in-out infinite;\n  }\n}\n\n.hero-meta {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.hero-badge {\n  display: inline-flex;\n  padding: 2px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  text-transform: capitalize;\n  background: rgba($gray-500, 0.15);\n  color: $gray-600;\n\n  &.status--customer { background: rgba($success, 0.15); color: color.adjust($success, $lightness: -15%); }\n  &.status--prospect { background: rgba(#a855f7, 0.15); color: #a855f7; }\n  &.status--lead { background: rgba($cyan, 0.15); color: color.adjust($cyan, $lightness: -15%); }\n}\n\n.hero-badge-secondary {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 2px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  background: rgba($gray-400, 0.12);\n  color: $gray-600;\n\n  i { font-size: 0.7rem; }\n\n  &.rating--hot { background: rgba(#ef4444, 0.12); color: #ef4444; }\n  &.rating--warm { background: rgba(#f59e0b, 0.12); color: #f59e0b; }\n  &.rating--cold { background: rgba(#3b82f6, 0.12); color: #3b82f6; }\n}\n\n.hero-industry {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  color: $gray-500;\n\n  i { font-size: 0.75rem; }\n}\n\n.hero-right {\n  display: flex;\n  gap: $space-5;\n  align-items: center;\n\n  @media (max-width: 1024px) {\n    justify-content: flex-start;\n  }\n}\n\n.hero-health {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n}\n\n.health-ring {\n  position: relative;\n  width: 56px;\n  height: 56px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: $gray-200;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n  }\n}\n\n.health-value {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: $font-size-sm;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n.health-label {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.hero-revenue {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 2px;\n}\n\n.revenue-value {\n  font-size: $font-size-3xl;\n  font-weight: 800;\n  color: $gray-800;\n}\n\n.revenue-label {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n// \u2550\u2550\u2550 KPI CARDS \u2550\u2550\u2550\n\n.kpi-section {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); }\n  @media (max-width: 768px)  { grid-template-columns: repeat(2, 1fr); }\n  @media (max-width: 480px)  { grid-template-columns: 1fr; }\n}\n\n.kpi-card {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  transition: all 250ms;\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 5 {\n    &:nth-child(#{$i}) { animation-delay: #{$i * 0.05}s; }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n\n    .kpi-icon { transform: scale(1.1) rotate(5deg); }\n  }\n}\n\n.kpi-icon {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  font-size: $font-size-lg;\n  color: white;\n  flex-shrink: 0;\n  transition: transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  .kpi-card--age & { background: $primary-gradient; }\n  .kpi-card--contacts & { background: $cyan-gradient; }\n  .kpi-card--opportunities & { background: $success-gradient; }\n  .kpi-card--leads & { background: linear-gradient(135deg, #a855f7, #9333ea); }\n  .kpi-card--cases & { background: $orange-gradient; }\n  .kpi-card--pipeline & { background: linear-gradient(135deg, #3b82f6, #2563eb); }\n  .kpi-card--revenue & { background: $success-gradient; }\n  .kpi-card--forecast & { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }\n}\n\n.kpi-content {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.kpi-label {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.kpi-value {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n// \u2550\u2550\u2550 DETAIL GRID \u2550\u2550\u2550\n\n.detail-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-4;\n\n  @media (max-width: 1024px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-card {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  padding: $space-4;\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.5s ease-out backwards;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n}\n\n.card-title {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  margin: 0 0 $space-4;\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: $gray-800;\n\n  i {\n    font-size: $font-size-lg;\n    color: #06b6d4;\n  }\n}\n\n// \u2550\u2550\u2550 KEY DETAILS \u2550\u2550\u2550\n\n.detail-fields {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-3;\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.detail-field {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.field-label {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-weight: 600;\n}\n\n.field-value {\n  font-size: $font-size-md;\n  font-weight: 500;\n  color: $gray-800;\n\n  &.field-link {\n    color: #3b82f6;\n  }\n}\n\n.detail-summary {\n  margin-top: $space-4;\n  padding-top: $space-3;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.summary-text {\n  font-size: $font-size-md;\n  line-height: 1.6;\n  color: $gray-600;\n  margin: $space-1 0 0;\n}\n\n// \u2550\u2550\u2550 ADDRESSES \u2550\u2550\u2550\n\n.address-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-4;\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.address-block {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.address-type {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-weight: 600;\n}\n\n.address-text {\n  font-size: $font-size-md;\n  color: $gray-700;\n  line-height: 1.5;\n}\n\n// \u2550\u2550\u2550 SCORES \u2550\u2550\u2550\n\n.score-row {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.score-item {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.score-label {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-weight: 600;\n}\n\n.score-bar {\n  width: 100%;\n  height: 8px;\n  background: $gray-200;\n  border-radius: $radius-full;\n  overflow: hidden;\n}\n\n.score-bar-fill {\n  height: 100%;\n  border-radius: $radius-full;\n  transition: width 1s ease-out;\n\n  &--activity {\n    background: $primary-gradient;\n  }\n}\n\n.score-value {\n  font-size: $font-size-md;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n// \u2550\u2550\u2550 TEAM MEMBERS \u2550\u2550\u2550\n\n.team-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.team-member {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2;\n  border-radius: $radius-md;\n  transition: background 150ms;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.03);\n  }\n}\n\n.member-avatar {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.member-info {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n\n.member-name {\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.member-role {\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n// \u2550\u2550\u2550 RELATED RECORDS TREE \u2550\u2550\u2550\n\n.related-tree-card {\n  ::ng-deep .related-tree {\n    padding: 0;\n    background: transparent;\n    border: none;\n\n    .p-tree-node {\n      padding: 0;\n    }\n\n    .p-tree-node-content {\n      padding: $space-2;\n      border-radius: $radius-md;\n      transition: background 150ms, transform 150ms;\n\n      &:hover {\n        background: rgba(0, 0, 0, 0.03);\n      }\n\n      &.p-tree-node-selected {\n        background: rgba(102, 126, 234, 0.08);\n        outline: none;\n        box-shadow: none;\n      }\n    }\n\n    // Parent node icons with gradient backgrounds\n    .p-tree-node-icon {\n      width: 28px;\n      height: 28px;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: $radius-md;\n      font-size: $font-size-sm;\n      color: white;\n      flex-shrink: 0;\n      margin-right: $space-2;\n    }\n\n    // Parent node icon colors\n    .parent-node--contacts > .p-tree-node-content .p-tree-node-icon {\n      background: $cyan-gradient;\n    }\n\n    .parent-node--opportunities > .p-tree-node-content .p-tree-node-icon {\n      background: $success-gradient;\n    }\n\n    .parent-node--leads > .p-tree-node-content .p-tree-node-icon {\n      background: linear-gradient(135deg, #a855f7, #9333ea);\n    }\n\n    .parent-node--cases > .p-tree-node-content .p-tree-node-icon {\n      background: $orange-gradient;\n    }\n\n    // Child node icon colors (smaller, subtler)\n    .child-node > .p-tree-node-content .p-tree-node-icon {\n      width: 24px;\n      height: 24px;\n      font-size: 0.75rem;\n      border-radius: 6px;\n    }\n\n    .child-node--contact > .p-tree-node-content .p-tree-node-icon {\n      background: rgba(6, 182, 212, 0.15);\n      color: #06b6d4;\n    }\n\n    .child-node--opportunity > .p-tree-node-content .p-tree-node-icon {\n      background: rgba(34, 197, 94, 0.15);\n      color: #22c55e;\n    }\n\n    .child-node--lead > .p-tree-node-content .p-tree-node-icon {\n      background: rgba(168, 85, 247, 0.15);\n      color: #a855f7;\n    }\n\n    .child-node--supportCase > .p-tree-node-content .p-tree-node-icon {\n      background: rgba(249, 115, 22, 0.15);\n      color: #f97316;\n    }\n\n    // Parent node label styling\n    .parent-node > .p-tree-node-content .tree-node-label {\n      font-size: $font-size-md;\n      font-weight: 600;\n      color: $gray-800;\n    }\n\n    // Child node styling\n    .child-node > .p-tree-node-content {\n      cursor: pointer;\n\n      &:hover {\n        background: rgba(102, 126, 234, 0.06);\n        transform: translateX(2px);\n      }\n    }\n\n    .tree-node-content {\n      display: flex;\n      flex-direction: column;\n      gap: 1px;\n    }\n\n    .tree-node-label {\n      font-size: $font-size-sm;\n      font-weight: 500;\n      color: $gray-700;\n    }\n\n    .tree-node-subtitle {\n      font-size: $font-size-xs;\n      color: $gray-500;\n      font-weight: 400;\n    }\n\n    .tree-node--clickable {\n      .tree-node-label {\n        color: $gray-800;\n\n        &:hover {\n          color: #667eea;\n        }\n      }\n    }\n\n    // Toggler styling\n    .p-tree-node-toggle-button {\n      color: $gray-400;\n      width: 24px;\n      height: 24px;\n\n      &:hover {\n        color: $gray-600;\n        background: rgba(0, 0, 0, 0.05);\n      }\n    }\n\n    // Branch lines from parent to children\n    .p-tree-node-children {\n      padding-left: 28px;\n      position: relative;\n      margin-left: 10px;\n\n      // Vertical line from parent down along children\n      &::before {\n        content: '';\n        position: absolute;\n        left: 10px;\n        top: 0;\n        bottom: 16px;\n        width: 1.5px;\n        background: linear-gradient(180deg, rgba(102, 126, 234, 0.35) 0%, rgba(102, 126, 234, 0.08) 100%);\n        border-radius: 1px;\n      }\n\n      // Horizontal branch line to each child's content\n      .p-tree-node-content {\n        position: relative;\n\n        &::after {\n          content: '';\n          position: absolute;\n          left: -18px;\n          top: 50%;\n          width: 14px;\n          height: 1.5px;\n          background: rgba(102, 126, 234, 0.25);\n          border-radius: 1px;\n          pointer-events: none;\n        }\n      }\n    }\n\n    // Color-code branch lines per category\n    .parent-node--contacts .p-tree-node-children {\n      &::before { background: linear-gradient(180deg, rgba(6, 182, 212, 0.4) 0%, rgba(6, 182, 212, 0.08) 100%); }\n      .p-tree-node-content::after { background: rgba(6, 182, 212, 0.35); }\n    }\n\n    .parent-node--opportunities .p-tree-node-children {\n      &::before { background: linear-gradient(180deg, rgba(34, 197, 94, 0.4) 0%, rgba(34, 197, 94, 0.08) 100%); }\n      .p-tree-node-content::after { background: rgba(34, 197, 94, 0.35); }\n    }\n\n    .parent-node--leads .p-tree-node-children {\n      &::before { background: linear-gradient(180deg, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.08) 100%); }\n      .p-tree-node-content::after { background: rgba(168, 85, 247, 0.35); }\n    }\n\n    .parent-node--cases .p-tree-node-children {\n      &::before { background: linear-gradient(180deg, rgba(249, 115, 22, 0.4) 0%, rgba(249, 115, 22, 0.08) 100%); }\n      .p-tree-node-content::after { background: rgba(249, 115, 22, 0.35); }\n    }\n  }\n}\n\n// \u2550\u2550\u2550 EMPTY STATE \u2550\u2550\u2550\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-5;\n  color: $gray-400;\n\n  i {\n    font-size: 1.5rem;\n  }\n\n  span {\n    font-size: $font-size-sm;\n  }\n}\n\n// \u2550\u2550\u2550 SKELETON \u2550\u2550\u2550\n\n.skeleton-hero {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  margin-bottom: $space-5;\n}\n\n.skeleton-kpi {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); }\n  @media (max-width: 768px)  { grid-template-columns: repeat(2, 1fr); }\n}\n\n.skeleton-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: $space-4;\n\n  @media (max-width: 1024px) { grid-template-columns: 1fr; }\n}\n\n// \u2550\u2550\u2550 COMMUNICATION TIMELINE \u2550\u2550\u2550\n\n.timeline-section {\n  margin-top: $space-5;\n  animation: fade-in-up 0.5s ease-out 0.5s both;\n}\n\n.timeline-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  padding: $space-3 0;\n}\n\n.timeline-entry {\n  display: flex;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  border-left: 2px solid rgba(102, 126, 234, 0.15);\n  margin-left: $space-4;\n  position: relative;\n  transition: background 150ms;\n\n  &:hover {\n    background: rgba(102, 126, 234, 0.03);\n  }\n}\n\n.timeline-dot {\n  position: absolute;\n  left: -15px;\n  top: $space-3;\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $glass-bg;\n  border: 2px solid rgba(102, 126, 234, 0.3);\n  border-radius: 50%;\n  flex-shrink: 0;\n\n  i {\n    font-size: 0.75rem;\n    color: #667eea;\n  }\n}\n\n.timeline-content {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding-left: $space-4;\n  flex: 1;\n  min-width: 0;\n}\n\n.timeline-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-3;\n}\n\n.timeline-type {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.timeline-date {\n  font-size: $font-size-xs;\n  color: $gray-400;\n  white-space: nowrap;\n}\n\n.timeline-subject {\n  font-size: $font-size-md;\n  font-weight: 500;\n  color: $gray-800;\n}\n\n.timeline-desc {\n  font-size: $font-size-sm;\n  color: $gray-500;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.timeline-meta {\n  display: flex;\n  gap: $space-3;\n  margin-top: 2px;\n\n  span {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-400;\n\n    i { font-size: 0.7rem; }\n  }\n}\n\n// \u2550\u2550\u2550 ANIMATIONS \u2550\u2550\u2550\n\n@keyframes fade-in-up {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(50px, -30px) scale(1.1); }\n  50% { transform: translate(100px, 20px) scale(0.9); }\n  75% { transform: translate(30px, 50px) scale(1.05); }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomerDetailPage, { className: "CustomerDetailPage", filePath: "src/app/crm/features/customers/pages/customer-detail.page.ts", lineNumber: 29 }); })();
