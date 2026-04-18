import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TabsModule } from 'primeng/tabs';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/inputgroup";
import * as i2 from "primeng/inputgroupaddon";
import * as i3 from "primeng/inputtext";
import * as i4 from "primeng/inputnumber";
import * as i5 from "@angular/forms";
import * as i6 from "primeng/tabs";
import * as i7 from "primeng/tooltip";
import * as i8 from "primeng/toggleswitch";
const _c0 = () => [0, 1, 2, 3];
const _c1 = () => ({ class: "dh-sidebar-item" });
const _c2 = a0 => ({ root: a0 });
function DealHealthSettingsPage_div_72_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵelement(1, "div", 43)(2, "div", 44);
    i0.ɵɵelementEnd();
} }
function DealHealthSettingsPage_div_72_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵtemplate(1, DealHealthSettingsPage_div_72_div_1_Template, 3, 0, "div", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c0));
} }
function DealHealthSettingsPage_div_73_div_34_div_4_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 113);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const seg_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", seg_r3.pct, "%");
} }
function DealHealthSettingsPage_div_73_div_34_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 111);
    i0.ɵɵtemplate(1, DealHealthSettingsPage_div_73_div_34_div_4_span_1_Template, 2, 1, "span", 112);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const seg_r3 = ctx.$implicit;
    i0.ɵɵstyleProp("width", seg_r3.pct, "%")("background", seg_r3.color);
    i0.ɵɵproperty("pTooltip", seg_r3.label + ": " + seg_r3.pct + "%");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", seg_r3.pct >= 10);
} }
function DealHealthSettingsPage_div_73_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 107)(1, "div", 108);
    i0.ɵɵtext(2, "Weight Distribution");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 109);
    i0.ɵɵtemplate(4, DealHealthSettingsPage_div_73_div_34_div_4_Template, 2, 6, "div", 110);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r1.dimensionWeightSegments());
} }
function DealHealthSettingsPage_div_73_div_46_div_7_p_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 138);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dim_r6 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.dimensionDescription(dim_r6.key));
} }
function DealHealthSettingsPage_div_73_div_46_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 135)(1, "strong", 136);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, DealHealthSettingsPage_div_73_div_46_div_7_p_3_Template, 2, 1, "p", 137);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dim_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dim_r6.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.dimensionDescription(dim_r6.key));
} }
function DealHealthSettingsPage_div_73_div_46_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 135)(1, "div", 139)(2, "p-inputgroup")(3, "p-inputgroup-addon", 140);
    i0.ɵɵelement(4, "i", 141);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "input", 142);
    i0.ɵɵlistener("ngModelChange", function DealHealthSettingsPage_div_73_div_46_div_8_Template_input_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r7); const idx_r5 = i0.ɵɵnextContext().index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateDimensionLabel(idx_r5, $event)); });
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    const dim_r6 = ctx_r7.$implicit;
    const idx_r5 = ctx_r7.index;
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("id", "dh-label-" + idx_r5)("ngModel", dim_r6.label);
} }
function DealHealthSettingsPage_div_73_div_46_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 143);
    i0.ɵɵelement(1, "i", 144);
    i0.ɵɵtext(2, " Bracket ");
    i0.ɵɵelementEnd();
} }
function DealHealthSettingsPage_div_73_div_46_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 145);
    i0.ɵɵelement(1, "i", 35);
    i0.ɵɵtext(2, " Ratio ");
    i0.ɵɵelementEnd();
} }
function DealHealthSettingsPage_div_73_div_46_span_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 146);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dim_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", ctx_r1.dimensionWeightPct(dim_r6), "%");
} }
function DealHealthSettingsPage_div_73_div_46_button_20_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 147);
    i0.ɵɵlistener("click", function DealHealthSettingsPage_div_73_div_46_button_20_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const dim_r6 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleExpand(dim_r6.key)); });
    i0.ɵɵelement(1, "i", 119);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const dim_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("bracket-toggle-btn--active", ctx_r1.expandedDimension() === dim_r6.key);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.expandedDimension() === dim_r6.key ? "pi-chevron-up" : "pi-chevron-down");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.expandedDimension() === dim_r6.key ? "Close" : "Brackets");
} }
function DealHealthSettingsPage_div_73_div_46_button_21_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 148);
    i0.ɵɵlistener("click", function DealHealthSettingsPage_div_73_div_46_button_21_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const idx_r5 = i0.ɵɵnextContext().index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeDimension(idx_r5)); });
    i0.ɵɵelement(1, "i", 149);
    i0.ɵɵelementEnd();
} }
function DealHealthSettingsPage_div_73_div_46_div_22_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 156)(1, "p-inputNumber", 157);
    i0.ɵɵlistener("ngModelChange", function DealHealthSettingsPage_div_73_div_46_div_22_div_18_Template_p_inputNumber_ngModelChange_1_listener($event) { const bi_r13 = i0.ɵɵrestoreView(_r12).index; const idx_r5 = i0.ɵɵnextContext(2).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateBracketThreshold(idx_r5, bi_r13, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p-inputNumber", 158);
    i0.ɵɵlistener("ngModelChange", function DealHealthSettingsPage_div_73_div_46_div_22_div_18_Template_p_inputNumber_ngModelChange_2_listener($event) { const bi_r13 = i0.ɵɵrestoreView(_r12).index; const idx_r5 = i0.ɵɵnextContext(2).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateBracketScore(idx_r5, bi_r13, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 159);
    i0.ɵɵlistener("click", function DealHealthSettingsPage_div_73_div_46_div_22_div_18_Template_button_click_3_listener() { const bi_r13 = i0.ɵɵrestoreView(_r12).index; const idx_r5 = i0.ɵɵnextContext(2).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeBracket(idx_r5, bi_r13)); });
    i0.ɵɵelement(4, "i", 160);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const b_r14 = ctx.$implicit;
    const dim_r6 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", b_r14.threshold)("min", 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", b_r14.score)("min", 0)("max", dim_r6.maxScore);
} }
function DealHealthSettingsPage_div_73_div_46_div_22_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 150)(1, "div", 151)(2, "h4");
    i0.ɵɵtext(3, "Scoring Brackets");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5, "When measured value \u2264 threshold, award the corresponding score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 152);
    i0.ɵɵlistener("click", function DealHealthSettingsPage_div_73_div_46_div_22_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r11); const idx_r5 = i0.ɵɵnextContext().index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.addBracket(idx_r5)); });
    i0.ɵɵelementStart(7, "span", 15);
    i0.ɵɵelement(8, "i", 65);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "Add");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 153)(12, "div", 154)(13, "span");
    i0.ɵɵtext(14, "Threshold (\u2264)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span");
    i0.ɵɵtext(16, "Score Awarded");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(17, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, DealHealthSettingsPage_div_73_div_46_div_22_div_18_Template, 5, 5, "div", 155);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const dim_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("ngForOf", dim_r6.brackets);
} }
function DealHealthSettingsPage_div_73_div_46_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 114)(1, "div", 115)(2, "div", 116)(3, "p-toggleSwitch", 117);
    i0.ɵɵlistener("ngModelChange", function DealHealthSettingsPage_div_73_div_46_Template_p_toggleSwitch_ngModelChange_3_listener($event) { const idx_r5 = i0.ɵɵrestoreView(_r4).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleDimension(idx_r5, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 118);
    i0.ɵɵelement(5, "i", 119);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 120);
    i0.ɵɵtemplate(7, DealHealthSettingsPage_div_73_div_46_div_7_Template, 4, 2, "div", 121)(8, DealHealthSettingsPage_div_73_div_46_div_8_Template, 6, 2, "div", 121);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 122);
    i0.ɵɵtemplate(10, DealHealthSettingsPage_div_73_div_46_span_10_Template, 3, 0, "span", 123)(11, DealHealthSettingsPage_div_73_div_46_span_11_Template, 3, 0, "span", 124);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 125)(13, "div", 126)(14, "p-inputgroup", 127)(15, "p-inputgroup-addon", 87);
    i0.ɵɵelement(16, "i", 128);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p-inputNumber", 129);
    i0.ɵɵlistener("ngModelChange", function DealHealthSettingsPage_div_73_div_46_Template_p_inputNumber_ngModelChange_17_listener($event) { const idx_r5 = i0.ɵɵrestoreView(_r4).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateDimensionMaxScore(idx_r5, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(18, DealHealthSettingsPage_div_73_div_46_span_18_Template, 2, 1, "span", 130);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 131);
    i0.ɵɵtemplate(20, DealHealthSettingsPage_div_73_div_46_button_20_Template, 4, 4, "button", 132)(21, DealHealthSettingsPage_div_73_div_46_button_21_Template, 2, 0, "button", 133);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(22, DealHealthSettingsPage_div_73_div_46_div_22_Template, 19, 1, "div", 134);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dim_r6 = ctx.$implicit;
    const idx_r5 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("dimension-item--disabled", !dim_r6.enabled)("dimension-item--expanded", ctx_r1.expandedDimension() === dim_r6.key);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", dim_r6.enabled);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", ctx_r1.dimensionColor(dim_r6.key));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.dimensionIcon(dim_r6.key));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.isBuiltIn(dim_r6.key));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isBuiltIn(dim_r6.key));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.hasBrackets(dim_r6));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.hasBrackets(dim_r6));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("id", "dh-max-" + idx_r5)("ngModel", dim_r6.maxScore)("min", 1)("max", 100);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", dim_r6.enabled);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.hasBrackets(dim_r6));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isBuiltIn(dim_r6.key));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.expandedDimension() === dim_r6.key && ctx_r1.hasBrackets(dim_r6));
} }
function DealHealthSettingsPage_div_73_div_59_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 163);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const seg_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(seg_r15.label);
} }
function DealHealthSettingsPage_div_73_div_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 161);
    i0.ɵɵtemplate(1, DealHealthSettingsPage_div_73_div_59_span_1_Template, 2, 1, "span", 162);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const seg_r15 = ctx.$implicit;
    i0.ɵɵstyleProp("width", seg_r15.to - seg_r15.from, "%")("background", seg_r15.color);
    i0.ɵɵproperty("pTooltip", seg_r15.label + ": " + seg_r15.from + "\u2013" + seg_r15.to);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", seg_r15.to - seg_r15.from >= 12);
} }
function DealHealthSettingsPage_div_73_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 45)(1, "p-tabs", 46);
    i0.ɵɵlistener("valueChange", function DealHealthSettingsPage_div_73_Template_p_tabs_valueChange_1_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onActiveTabChange($event)); });
    i0.ɵɵelementStart(2, "div", 47)(3, "p-tablist", 48)(4, "p-tab", 49);
    i0.ɵɵelement(5, "i", 50);
    i0.ɵɵelementStart(6, "div", 51)(7, "span", 52);
    i0.ɵɵtext(8, "Dimensions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 53);
    i0.ɵɵtext(10, "Toggle & configure scoring factors");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "p-tab", 54);
    i0.ɵɵelement(12, "i", 55);
    i0.ɵɵelementStart(13, "div", 51)(14, "span", 52);
    i0.ɵɵtext(15, "Bands & Confidence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 53);
    i0.ɵɵtext(17, "Score thresholds & reliability");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(18, "p-tabpanels", 56)(19, "p-tabpanel", 57)(20, "section", 58)(21, "div", 59)(22, "div", 60)(23, "div", 61)(24, "h2");
    i0.ɵɵtext(25, "Scoring Dimensions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 62);
    i0.ɵɵtext(27, "Each dimension contributes a weighted score to the overall health rating");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div", 63)(29, "button", 64);
    i0.ɵɵlistener("click", function DealHealthSettingsPage_div_73_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.addDimension()); });
    i0.ɵɵelementStart(30, "span", 15);
    i0.ɵɵelement(31, "i", 65);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "span");
    i0.ɵɵtext(33, "Add Dimension");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(34, DealHealthSettingsPage_div_73_div_34_Template, 5, 1, "div", 66);
    i0.ɵɵelementStart(35, "div", 67);
    i0.ɵɵelement(36, "span", 68)(37, "span", 69);
    i0.ɵɵelementStart(38, "span", 70);
    i0.ɵɵtext(39, "Dimension");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "span", 71);
    i0.ɵɵtext(41, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "span", 72);
    i0.ɵɵtext(43, "Weight");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(44, "span", 73);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "div", 74);
    i0.ɵɵtemplate(46, DealHealthSettingsPage_div_73_div_46_Template, 23, 20, "div", 75);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(47, "p-tabpanel", 76)(48, "section", 58)(49, "div", 59)(50, "div", 60)(51, "div", 61)(52, "h2");
    i0.ɵɵtext(53, "Score Bands & Confidence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "span", 62);
    i0.ɵɵtext(55, "Normalised score (0\u2013100) maps to a health label");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(56, "div", 77)(57, "div", 78)(58, "div", 79);
    i0.ɵɵtemplate(59, DealHealthSettingsPage_div_73_div_59_Template, 2, 6, "div", 80);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(60, "div", 81)(61, "span");
    i0.ɵɵtext(62, "0");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "span");
    i0.ɵɵtext(64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(65, "span");
    i0.ɵɵtext(66);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(67, "span");
    i0.ɵɵtext(68);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "span");
    i0.ɵɵtext(70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "span");
    i0.ɵɵtext(72, "100");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(73, "section", 82)(74, "h3", 83);
    i0.ɵɵelement(75, "i", 50);
    i0.ɵɵtext(76, " Health Band Thresholds ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "div", 84)(78, "div", 85)(79, "label", 86);
    i0.ɵɵtext(80, "Excellent (\u2265)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(81, "p-inputgroup")(82, "p-inputgroup-addon", 87);
    i0.ɵɵelement(83, "i", 88);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "p-inputNumber", 89);
    i0.ɵɵlistener("ngModelChange", function DealHealthSettingsPage_div_73_Template_p_inputNumber_ngModelChange_84_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateBand("excellent", $event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(85, "div", 85)(86, "label", 90);
    i0.ɵɵtext(87, "Good (\u2265)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(88, "p-inputgroup")(89, "p-inputgroup-addon", 91);
    i0.ɵɵelement(90, "i", 92);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(91, "p-inputNumber", 93);
    i0.ɵɵlistener("ngModelChange", function DealHealthSettingsPage_div_73_Template_p_inputNumber_ngModelChange_91_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateBand("good", $event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(92, "div", 85)(93, "label", 94);
    i0.ɵɵtext(94, "Fair (\u2265)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(95, "p-inputgroup")(96, "p-inputgroup-addon", 95);
    i0.ɵɵelement(97, "i", 96);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(98, "p-inputNumber", 97);
    i0.ɵɵlistener("ngModelChange", function DealHealthSettingsPage_div_73_Template_p_inputNumber_ngModelChange_98_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateBand("fair", $event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(99, "div", 85)(100, "label", 98);
    i0.ɵɵtext(101, "At Risk (\u2265)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(102, "p-inputgroup")(103, "p-inputgroup-addon", 99);
    i0.ɵɵelement(104, "i", 100);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(105, "p-inputNumber", 101);
    i0.ɵɵlistener("ngModelChange", function DealHealthSettingsPage_div_73_Template_p_inputNumber_ngModelChange_105_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateBand("atRisk", $event)); });
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(106, "p", 102);
    i0.ɵɵtext(107, " Scores below ");
    i0.ɵɵelementStart(108, "strong");
    i0.ɵɵtext(109, "At Risk");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(110, " threshold are labeled ");
    i0.ɵɵelementStart(111, "em");
    i0.ɵɵtext(112, "Critical");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(113, ". ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(114, "section", 82)(115, "h3", 83);
    i0.ɵɵelement(116, "i", 36);
    i0.ɵɵtext(117, " Confidence Level ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(118, "div", 84)(119, "div", 85)(120, "label", 103);
    i0.ɵɵtext(121, "Confidence (0\u20131)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(122, "p-inputgroup")(123, "p-inputgroup-addon", 104);
    i0.ɵɵelement(124, "i", 35);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(125, "p-inputNumber", 105);
    i0.ɵɵlistener("ngModelChange", function DealHealthSettingsPage_div_73_Template_p_inputNumber_ngModelChange_125_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateConfidence($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(126, "small", 106);
    i0.ɵɵtext(127, "How reliable the score is considered (shown to users)");
    i0.ɵɵelementEnd()()()()()()()()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.activeTab());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("pt", i0.ɵɵpureFunction1(29, _c2, i0.ɵɵpureFunction0(28, _c1)));
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("pt", i0.ɵɵpureFunction1(32, _c2, i0.ɵɵpureFunction0(31, _c1)));
    i0.ɵɵadvance(23);
    i0.ɵɵproperty("ngIf", ctx_r1.dimensionWeightSegments().length);
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("ngForOf", ctx_r1.policy().dimensions);
    i0.ɵɵadvance(13);
    i0.ɵɵproperty("ngForOf", ctx_r1.bandSegments());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.policy().bands.atRisk);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.policy().bands.fair);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.policy().bands.good);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.policy().bands.excellent);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngModel", ctx_r1.policy().bands.excellent)("min", 0)("max", 100);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r1.policy().bands.good)("min", 0)("max", 100);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r1.policy().bands.fair)("min", 0)("max", 100);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r1.policy().bands.atRisk)("min", 0)("max", 100);
    i0.ɵɵadvance(20);
    i0.ɵɵproperty("ngModel", ctx_r1.policy().confidence)("min", 0)("max", 1)("minFractionDigits", 2)("maxFractionDigits", 2)("step", 0.05);
} }
function DealHealthSettingsPage_div_74_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 164)(1, "button", 165);
    i0.ɵɵlistener("click", function DealHealthSettingsPage_div_74_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveSettings()); });
    i0.ɵɵelementStart(2, "span", 15);
    i0.ɵɵelement(3, "i", 166);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.saving());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.saving() ? "Saving\u2026" : "Save Settings");
} }
export class DealHealthSettingsPage {
    settingsService = inject(WorkspaceSettingsService);
    toastService = inject(AppToastService);
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    canManageAdmin = signal(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage), ...(ngDevMode ? [{ debugName: "canManageAdmin" }] : []));
    policy = signal(DealHealthSettingsPage.defaultPolicy(), ...(ngDevMode ? [{ debugName: "policy" }] : []));
    expandedDimension = signal(null, ...(ngDevMode ? [{ debugName: "expandedDimension" }] : []));
    activeTab = signal('0', ...(ngDevMode ? [{ debugName: "activeTab" }] : []));
    loadedSettings = null;
    constructor() {
        this.loadSettings();
    }
    loadSettings() {
        this.loading.set(true);
        this.settingsService.getSettings().subscribe({
            next: (settings) => {
                this.applySettings(settings);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.raiseToast('error', 'Unable to load deal health settings');
            }
        });
    }
    saveSettings() {
        if (!this.loadedSettings)
            return;
        const payload = {
            name: this.loadedSettings.name ?? 'Workspace',
            timeZone: this.loadedSettings.timeZone ?? 'UTC',
            currency: this.loadedSettings.currency ?? 'USD',
            dealHealthScoringPolicy: this.policy()
        };
        this.saving.set(true);
        this.settingsService.updateSettings(payload).subscribe({
            next: (settings) => {
                this.saving.set(false);
                this.applySettings(settings);
                this.raiseToast('success', 'Deal health scoring settings saved');
            },
            error: () => {
                this.saving.set(false);
                this.raiseToast('error', 'Unable to save deal health settings');
            }
        });
    }
    applySettings(settings) {
        this.loadedSettings = settings;
        this.policy.set(settings.dealHealthScoringPolicy ?? DealHealthSettingsPage.defaultPolicy());
    }
    totalMaxScore() {
        return this.policy().dimensions
            .filter(d => d.enabled)
            .reduce((sum, d) => sum + d.maxScore, 0);
    }
    enabledCount() {
        return this.policy().dimensions.filter(d => d.enabled).length;
    }
    /* ── Dimension CRUD ── */
    toggleDimension(index, enabled) {
        const current = this.policy();
        const dims = current.dimensions.map((d, i) => i === index ? { ...d, enabled } : d);
        this.policy.set({ ...current, dimensions: dims });
    }
    updateDimensionLabel(index, label) {
        const current = this.policy();
        const dims = current.dimensions.map((d, i) => i === index ? { ...d, label } : d);
        this.policy.set({ ...current, dimensions: dims });
    }
    updateDimensionMaxScore(index, maxScore) {
        const current = this.policy();
        const dims = current.dimensions.map((d, i) => i === index ? { ...d, maxScore: maxScore ?? 0 } : d);
        this.policy.set({ ...current, dimensions: dims });
    }
    addDimension() {
        const current = this.policy();
        const key = 'Custom_' + Date.now();
        const newDim = {
            key,
            label: 'New Dimension',
            maxScore: 10,
            enabled: true,
            brackets: [{ threshold: 1, score: 5 }, { threshold: 3, score: 10 }]
        };
        this.policy.set({ ...current, dimensions: [...current.dimensions, newDim] });
        this.expandedDimension.set(key);
    }
    removeDimension(index) {
        const current = this.policy();
        const dims = current.dimensions.filter((_, i) => i !== index);
        this.policy.set({ ...current, dimensions: dims });
    }
    /* ── Bracket editing ── */
    toggleExpand(key) {
        this.expandedDimension.set(this.expandedDimension() === key ? null : key);
    }
    updateBracketThreshold(dimIndex, bracketIndex, threshold) {
        const current = this.policy();
        const dims = current.dimensions.map((d, di) => {
            if (di !== dimIndex || !d.brackets)
                return d;
            const brackets = d.brackets.map((b, bi) => bi === bracketIndex ? { ...b, threshold: threshold ?? 0 } : b);
            return { ...d, brackets };
        });
        this.policy.set({ ...current, dimensions: dims });
    }
    updateBracketScore(dimIndex, bracketIndex, score) {
        const current = this.policy();
        const dims = current.dimensions.map((d, di) => {
            if (di !== dimIndex || !d.brackets)
                return d;
            const brackets = d.brackets.map((b, bi) => bi === bracketIndex ? { ...b, score: score ?? 0 } : b);
            return { ...d, brackets };
        });
        this.policy.set({ ...current, dimensions: dims });
    }
    addBracket(dimIndex) {
        const current = this.policy();
        const dims = current.dimensions.map((d, di) => {
            if (di !== dimIndex)
                return d;
            const brackets = [...(d.brackets ?? []), { threshold: 0, score: 0 }];
            return { ...d, brackets };
        });
        this.policy.set({ ...current, dimensions: dims });
    }
    removeBracket(dimIndex, bracketIndex) {
        const current = this.policy();
        const dims = current.dimensions.map((d, di) => {
            if (di !== dimIndex || !d.brackets)
                return d;
            const brackets = d.brackets.filter((_, bi) => bi !== bracketIndex);
            return { ...d, brackets };
        });
        this.policy.set({ ...current, dimensions: dims });
    }
    /* ── Band thresholds ── */
    updateBand(field, value) {
        const current = this.policy();
        this.policy.set({ ...current, bands: { ...current.bands, [field]: value ?? 0 } });
    }
    updateConfidence(value) {
        const current = this.policy();
        this.policy.set({ ...current, confidence: value ?? 0.75 });
    }
    /* ── Reset ── */
    resetToDefaults() {
        this.policy.set(DealHealthSettingsPage.defaultPolicy());
        this.raiseToast('success', 'Reset to defaults — save to persist');
    }
    /* ── Helpers ── */
    isBuiltIn(key) {
        return [
            'StageProgression', 'ActivityRecency', 'CloseDateHealth',
            'StakeholderCoverage', 'DealCompleteness', 'TeamCoverage', 'ProcessCompliance'
        ].includes(key);
    }
    hasBrackets(dim) {
        return dim.brackets !== null && dim.brackets !== undefined;
    }
    dimensionIcon(key) {
        const icons = {
            StageProgression: 'pi-chart-bar',
            ActivityRecency: 'pi-clock',
            CloseDateHealth: 'pi-calendar',
            StakeholderCoverage: 'pi-users',
            DealCompleteness: 'pi-check-circle',
            TeamCoverage: 'pi-user-plus',
            ProcessCompliance: 'pi-shield'
        };
        return icons[key] ?? 'pi-sliders-h';
    }
    dimensionDescription(key) {
        const descs = {
            StageProgression: 'How consistently the deal advances through pipeline stages',
            ActivityRecency: 'Days since last meaningful activity (call, email, meeting)',
            CloseDateHealth: 'Whether the expected close date is realistic and hasn\'t slipped',
            StakeholderCoverage: 'Number of key decision-makers identified and engaged',
            DealCompleteness: 'Percentage of required deal fields that are filled in',
            TeamCoverage: 'Number of internal team members actively working the deal',
            ProcessCompliance: 'Adherence to defined sales process steps and requirements'
        };
        return descs[key] ?? '';
    }
    onActiveTabChange(value) {
        this.activeTab.set(String(value ?? '0'));
    }
    /** Percentage weight of a dimension relative to total enabled max score */
    dimensionWeightPct(dim) {
        const total = this.totalMaxScore();
        if (!total || !dim.enabled)
            return 0;
        return Math.round((dim.maxScore / total) * 100);
    }
    /** Color for the weight bar segments — unique per dimension key */
    dimensionColor(key) {
        const colors = {
            StageProgression: '#6366f1',
            ActivityRecency: '#3b82f6',
            CloseDateHealth: '#06b6d4',
            StakeholderCoverage: '#8b5cf6',
            DealCompleteness: '#22c55e',
            TeamCoverage: '#f59e0b',
            ProcessCompliance: '#ec4899'
        };
        return colors[key] ?? '#6b7280';
    }
    /** Weight bar segments for the visual dimension proportion chart */
    dimensionWeightSegments() {
        const total = this.totalMaxScore();
        if (!total)
            return [];
        return this.policy().dimensions
            .filter(d => d.enabled)
            .map(d => ({
            key: d.key,
            label: d.label,
            pct: Math.round((d.maxScore / total) * 100),
            color: this.dimensionColor(d.key)
        }));
    }
    /** Band preview segments for the visual bar */
    bandSegments() {
        const b = this.policy().bands;
        return [
            { label: 'Critical', from: 0, to: b.atRisk, color: '#ef4444' },
            { label: 'At Risk', from: b.atRisk, to: b.fair, color: '#f97316' },
            { label: 'Fair', from: b.fair, to: b.good, color: '#eab308' },
            { label: 'Good', from: b.good, to: b.excellent, color: '#22c55e' },
            { label: 'Excellent', from: b.excellent, to: 100, color: '#3b82f6' }
        ];
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    static defaultPolicy() {
        return {
            dimensions: [
                { key: 'StageProgression', label: 'Stage Progression', maxScore: 15, enabled: true, brackets: [{ threshold: 1, score: 3 }, { threshold: 2, score: 6 }, { threshold: 3, score: 9 }, { threshold: 4, score: 12 }, { threshold: 5, score: 15 }] },
                { key: 'ActivityRecency', label: 'Activity Recency', maxScore: 20, enabled: true, brackets: [{ threshold: 3, score: 20 }, { threshold: 7, score: 16 }, { threshold: 14, score: 12 }, { threshold: 30, score: 6 }, { threshold: 9999, score: 0 }] },
                { key: 'CloseDateHealth', label: 'Close Date Health', maxScore: 15, enabled: true, brackets: [{ threshold: 0, score: 0 }, { threshold: 7, score: 8 }, { threshold: 30, score: 12 }, { threshold: 90, score: 15 }, { threshold: 9999, score: 10 }] },
                { key: 'StakeholderCoverage', label: 'Stakeholder Coverage', maxScore: 10, enabled: true, brackets: [{ threshold: 0, score: 0 }, { threshold: 1, score: 4 }, { threshold: 2, score: 7 }, { threshold: 3, score: 10 }] },
                { key: 'DealCompleteness', label: 'Deal Completeness', maxScore: 15, enabled: true, brackets: null },
                { key: 'TeamCoverage', label: 'Team Coverage', maxScore: 10, enabled: true, brackets: [{ threshold: 0, score: 2 }, { threshold: 1, score: 6 }, { threshold: 2, score: 10 }] },
                { key: 'ProcessCompliance', label: 'Process Compliance', maxScore: 15, enabled: true, brackets: null }
            ],
            bands: { excellent: 80, good: 60, fair: 40, atRisk: 20 },
            confidence: 0.75
        };
    }
    static ɵfac = function DealHealthSettingsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DealHealthSettingsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DealHealthSettingsPage, selectors: [["app-deal-health-settings-page"]], decls: 75, vars: 8, consts: [[1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-actions"], ["type", "button", "routerLink", "/app/settings", 1, "action-btn", "action-btn--back"], [1, "action-btn__icon"], [1, "pi", "pi-arrow-left"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click", "disabled"], [1, "pi", "pi-refresh"], ["type", "button", 1, "action-btn", "action-btn--settings", 3, "click"], [1, "pi", "pi-replay"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-heart"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend"], [1, "pi", "pi-check-circle"], [1, "card-glow"], [1, "visual-card", "visual-card--secondary"], [1, "pi", "pi-chart-pie"], [1, "pi", "pi-arrows-h"], [1, "visual-card", "visual-card--success"], [1, "pi", "pi-percentage"], [1, "pi", "pi-shield"], ["class", "loading-state", 4, "ngIf"], ["class", "dh-layout", 4, "ngIf"], ["class", "save-bar", 4, "ngIf"], [1, "loading-state"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton", "skeleton-text"], [1, "skeleton", "skeleton-input"], [1, "dh-layout"], [1, "dh-sidebar-tabs", 3, "valueChange", "value"], [1, "dh-sidebar-layout"], [1, "dh-sidebar-nav"], ["value", "0", 3, "pt"], [1, "pi", "pi-sliders-h"], [1, "dh-sidebar-text"], [1, "dh-sidebar-label"], [1, "dh-sidebar-hint"], ["value", "1", 3, "pt"], [1, "pi", "pi-chart-bar"], [1, "dh-sidebar-content"], ["value", "0"], [1, "data-section"], [1, "data-card"], [1, "data-header"], [1, "header-title"], [1, "record-count"], [1, "header-actions"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click"], [1, "pi", "pi-plus"], ["class", "weight-distribution", 4, "ngIf"], [1, "dimension-columns"], [1, "dimension-col", "dimension-col--toggle"], [1, "dimension-col", "dimension-col--icon"], [1, "dimension-col", "dimension-col--name"], [1, "dimension-col", "dimension-col--type"], [1, "dimension-col", "dimension-col--weight"], [1, "dimension-col", "dimension-col--actions"], [1, "dimension-list"], ["class", "dimension-item", 3, "dimension-item--disabled", "dimension-item--expanded", 4, "ngFor", "ngForOf"], ["value", "1"], [1, "bands-form"], [1, "band-preview"], [1, "band-bar"], ["class", "band-segment", "tooltipPosition", "top", 3, "width", "background", "pTooltip", 4, "ngFor", "ngForOf"], [1, "band-bar-legend"], [1, "form-card"], [1, "section-title"], [1, "form-grid", "form-grid--2col"], [1, "form-field"], ["for", "dh-excellent"], [1, "icon-addon", "icon-addon--success"], [1, "pi", "pi-star-fill"], ["id", "dh-excellent", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "min", "max"], ["for", "dh-good"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-thumbs-up"], ["id", "dh-good", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "min", "max"], ["for", "dh-fair"], [1, "icon-addon", "icon-addon--warning"], [1, "pi", "pi-minus-circle"], ["id", "dh-fair", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "min", "max"], ["for", "dh-atrisk"], [1, "icon-addon", "icon-addon--danger"], [1, "pi", "pi-exclamation-triangle"], ["id", "dh-atrisk", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "min", "max"], [1, "band-note"], ["for", "dh-confidence"], [1, "icon-addon", "icon-addon--industry"], ["id", "dh-confidence", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "min", "max", "minFractionDigits", "maxFractionDigits", "step"], [1, "field-hint"], [1, "weight-distribution"], [1, "weight-distribution__label"], [1, "weight-distribution__bar"], ["class", "weight-distribution__segment", "tooltipPosition", "top", 3, "width", "background", "pTooltip", 4, "ngFor", "ngForOf"], ["tooltipPosition", "top", 1, "weight-distribution__segment", 3, "pTooltip"], ["class", "weight-distribution__segment-label", 4, "ngIf"], [1, "weight-distribution__segment-label"], [1, "dimension-item"], [1, "dimension-row"], [1, "dimension-toggle"], [3, "ngModelChange", "ngModel"], [1, "dimension-icon"], [1, "pi", 3, "ngClass"], [1, "dimension-info"], ["class", "dimension-name", 4, "ngIf"], [1, "dimension-type"], ["class", "type-chip type-chip--bracket", "pTooltip", "Score is determined by threshold brackets you define", "tooltipPosition", "top", 4, "ngIf"], ["class", "type-chip type-chip--ratio", "pTooltip", "Score is calculated automatically as a ratio of actual vs. maximum", "tooltipPosition", "top", 4, "ngIf"], [1, "dimension-weight"], [1, "weight-display"], [1, "weight-input-group"], [1, "pi", "pi-star"], ["styleClass", "w-full", 3, "ngModelChange", "id", "ngModel", "min", "max"], ["class", "weight-pct", 4, "ngIf"], [1, "dimension-actions"], ["type", "button", "class", "bracket-toggle-btn", 3, "bracket-toggle-btn--active", "click", 4, "ngIf"], ["type", "button", "class", "row-action-btn row-action-btn--delete", "title", "Remove dimension", 3, "click", 4, "ngIf"], ["class", "brackets-panel", 4, "ngIf"], [1, "dimension-name"], [1, "dimension-name__label"], ["class", "dimension-desc", 4, "ngIf"], [1, "dimension-desc"], [1, "form-field", "form-field--inline"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-tag"], ["pInputText", "", "placeholder", "Dimension name", 1, "w-full", 3, "ngModelChange", "id", "ngModel"], ["pTooltip", "Score is determined by threshold brackets you define", "tooltipPosition", "top", 1, "type-chip", "type-chip--bracket"], [1, "pi", "pi-list"], ["pTooltip", "Score is calculated automatically as a ratio of actual vs. maximum", "tooltipPosition", "top", 1, "type-chip", "type-chip--ratio"], [1, "weight-pct"], ["type", "button", 1, "bracket-toggle-btn", 3, "click"], ["type", "button", "title", "Remove dimension", 1, "row-action-btn", "row-action-btn--delete", 3, "click"], [1, "pi", "pi-trash"], [1, "brackets-panel"], [1, "brackets-header"], ["type", "button", 1, "action-btn", "action-btn--add", "action-btn--sm", 3, "click"], [1, "brackets-grid"], [1, "bracket-row", "bracket-row--header"], ["class", "bracket-row", 4, "ngFor", "ngForOf"], [1, "bracket-row"], ["styleClass", "w-full", 3, "ngModelChange", "ngModel", "min"], ["styleClass", "w-full", 3, "ngModelChange", "ngModel", "min", "max"], ["type", "button", "title", "Remove bracket", 1, "row-action-btn", "row-action-btn--delete", 3, "click"], [1, "pi", "pi-times"], ["tooltipPosition", "top", 1, "band-segment", 3, "pTooltip"], ["class", "band-segment-label", 4, "ngIf"], [1, "band-segment-label"], [1, "save-bar"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "pi", "pi-check"]], template: function DealHealthSettingsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵelement(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 5)(7, "div", 6)(8, "div", 7);
            i0.ɵɵelement(9, "span", 8);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Deal Health");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 9)(13, "span", 10);
            i0.ɵɵtext(14, "Deal Health");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 11);
            i0.ɵɵtext(16, "Scoring");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 12);
            i0.ɵɵtext(18, " Configure the dimensions, weights, brackets, and band thresholds used to calculate opportunity health scores. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 13)(20, "button", 14)(21, "span", 15);
            i0.ɵɵelement(22, "i", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span");
            i0.ɵɵtext(24, "Back to Settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "button", 17);
            i0.ɵɵlistener("click", function DealHealthSettingsPage_Template_button_click_25_listener() { return ctx.loadSettings(); });
            i0.ɵɵelementStart(26, "span", 15);
            i0.ɵɵelement(27, "i", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span");
            i0.ɵɵtext(29, "Reload");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "button", 19);
            i0.ɵɵlistener("click", function DealHealthSettingsPage_Template_button_click_30_listener() { return ctx.resetToDefaults(); });
            i0.ɵɵelementStart(31, "span", 15);
            i0.ɵɵelement(32, "i", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "span");
            i0.ɵɵtext(34, "Reset Defaults");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(35, "div", 21)(36, "div", 22)(37, "div", 23);
            i0.ɵɵelement(38, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 25)(40, "span", 26);
            i0.ɵɵtext(41, "Dimensions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "strong", 27);
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "span", 28);
            i0.ɵɵelement(45, "i", 29);
            i0.ɵɵtext(46, " Active");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(47, "div", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 31)(49, "div", 23);
            i0.ɵɵelement(50, "i", 32);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "div", 25)(52, "span", 26);
            i0.ɵɵtext(53, "Max Score");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "strong", 27);
            i0.ɵɵtext(55);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "span", 28);
            i0.ɵɵelement(57, "i", 33);
            i0.ɵɵtext(58, " Points total");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(59, "div", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "div", 34)(61, "div", 23);
            i0.ɵɵelement(62, "i", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 25)(64, "span", 26);
            i0.ɵɵtext(65, "Confidence");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "strong", 27);
            i0.ɵɵtext(67);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "span", 28);
            i0.ɵɵelement(69, "i", 36);
            i0.ɵɵtext(70, " Score reliability");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(71, "div", 30);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(72, DealHealthSettingsPage_div_72_Template, 2, 2, "div", 37)(73, DealHealthSettingsPage_div_73_Template, 128, 34, "div", 38)(74, DealHealthSettingsPage_div_74_Template, 6, 2, "div", 39);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(25);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(18);
            i0.ɵɵtextInterpolate2("", ctx.enabledCount(), " / ", ctx.policy().dimensions.length);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.totalMaxScore());
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate1("", (ctx.policy().confidence * 100).toFixed(0), "%");
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading());
        } }, dependencies: [ButtonModule,
            CheckboxModule,
            InputGroupModule, i1.InputGroup, InputGroupAddonModule, i2.InputGroupAddon, InputTextModule, i3.InputText, InputNumberModule, i4.InputNumber, FormsModule, i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgModel, RouterLink,
            SkeletonModule,
            TabsModule, i6.Tabs, i6.TabPanels, i6.TabPanel, i6.TabList, i6.Tab, TooltipModule, i7.Tooltip, ToggleSwitchModule, i8.ToggleSwitch, NgIf,
            NgFor,
            NgClass,
            BreadcrumbsComponent], styles: ["\n\n\n\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.page-container[_ngcontent-%COMP%] {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: _ngcontent-%COMP%_float 20s ease-in-out infinite;\n}\n\n.orb-1[_ngcontent-%COMP%] {\n  width: 400px;\n  height: 400px;\n  background: $primary-gradient;\n  top: -150px;\n  right: -100px;\n}\n\n.orb-2[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  background: $cyan-gradient;\n  bottom: 10%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3[_ngcontent-%COMP%] {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);\n  top: 40%;\n  right: 15%;\n  animation-delay: -14s;\n}\n\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(40px, -25px) scale(1.08); }\n  50% { transform: translate(80px, 15px) scale(0.92); }\n  75% { transform: translate(25px, 40px) scale(1.04); }\n}\n\n\n\n.hero-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: _ngcontent-%COMP%_fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: _ngcontent-%COMP%_pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-1;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: _ngcontent-%COMP%_gradient-shift 4s ease-in-out infinite;\n  }\n\n  .title-light {\n    -webkit-text-fill-color: $gray-700;\n    margin-left: $space-2;\n  }\n}\n\n.hero-description[_ngcontent-%COMP%] {\n  font-size: $font-size-base;\n  color: $gray-500;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0 0 $space-3;\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: _ngcontent-%COMP%_slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  .card-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n    color: white;\n  }\n\n  &--primary .card-icon { background: $primary-gradient; }\n  &--secondary .card-icon { background: $cyan-gradient; }\n  &--success .card-icon { background: $success-gradient; }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n\n\n.data-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin-bottom: $space-5;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out 0.4s both;\n}\n\n.data-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  h2 {\n    margin: 0;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .record-count {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n\n\n.loading-state[_ngcontent-%COMP%] {\n  padding: $space-4;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-4;\n  margin-bottom: $space-3;\n}\n\n.skeleton[_ngcontent-%COMP%] {\n  border-radius: $radius-md;\n  background: linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.06) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n}\n\n.skeleton-text[_ngcontent-%COMP%] { width: 30%; height: 20px; }\n.skeleton-input[_ngcontent-%COMP%] { flex: 1; height: 36px; }\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n\n\n.weight-distribution[_ngcontent-%COMP%] {\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  &__label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    margin-bottom: $space-2;\n  }\n\n  &__bar {\n    display: flex;\n    height: 24px;\n    border-radius: $radius-full;\n    overflow: hidden;\n    gap: 2px;\n    background: $gray-200;\n  }\n\n  &__segment {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: width 500ms ease-out;\n    min-width: 4px;\n  }\n\n  &__segment-label {\n    font-size: 0.6875rem;\n    font-weight: 700;\n    color: white;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);\n  }\n}\n\n\n\n.dimension-columns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 36px 1fr 100px minmax(140px, 200px) auto;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.dimension-col[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n\n\n.dimension-list[_ngcontent-%COMP%] {\n  padding: $space-2;\n}\n\n.dimension-item[_ngcontent-%COMP%] {\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-lg;\n  margin-bottom: $space-2;\n  background: rgba(255, 255, 255, 0.6);\n  transition: all 250ms;\n\n  &:hover {\n    border-color: rgba(102, 126, 234, 0.2);\n    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.05);\n  }\n\n  &--disabled {\n    opacity: 0.55;\n  }\n\n  &--expanded {\n    border-color: rgba(102, 126, 234, 0.3);\n    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.08);\n  }\n}\n\n.dimension-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 36px 1fr 100px minmax(140px, 200px) auto;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n\n  @media (max-width: 900px) {\n    grid-template-columns: auto 36px 1fr;\n    grid-template-rows: auto auto auto;\n  }\n}\n\n.dimension-toggle[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n\n.dimension-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  color: white;\n  font-size: $font-size-lg;\n  flex-shrink: 0;\n}\n\n.dimension-info[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.dimension-name[_ngcontent-%COMP%] {\n  &__label {\n    font-size: $font-size-base;\n    font-weight: 600;\n    color: $gray-800;\n    display: block;\n    line-height: 1.3;\n  }\n}\n\n.dimension-desc[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  margin: 2px 0 0;\n  line-height: 1.4;\n}\n\n\n\n.dimension-type[_ngcontent-%COMP%] {\n  @media (max-width: 900px) {\n    grid-column: 1 / -1;\n  }\n}\n\n.type-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 3px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  letter-spacing: 0.02em;\n  cursor: default;\n\n  i { font-size: 0.7rem; }\n\n  &--bracket {\n    background: rgba(99, 102, 241, 0.12);\n    color: #6366f1;\n  }\n\n  &--ratio {\n    background: rgba(34, 197, 94, 0.12);\n    color: #16a34a;\n  }\n}\n\n\n\n.dimension-weight[_ngcontent-%COMP%] {\n  min-width: 0;\n\n  @media (max-width: 900px) {\n    grid-column: 1 / -1;\n  }\n}\n\n.weight-display[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.weight-input-group[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.weight-pct[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 700;\n  color: $primary;\n  white-space: nowrap;\n  background: rgba(102, 126, 234, 0.1);\n  padding: 2px 6px;\n  border-radius: $radius-full;\n}\n\n\n\n[_nghost-%COMP%]     .dimension-weight {\n  p-inputnumber {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .p-inputnumber {\n    width: 100%;\n  }\n\n  .p-inputnumber-input {\n    width: 100%;\n    min-width: 50px;\n    text-align: center;\n    font-weight: 600;\n    font-size: $font-size-base;\n  }\n}\n\n.dimension-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-shrink: 0;\n\n  @media (max-width: 900px) {\n    grid-column: 1 / -1;\n    justify-content: flex-end;\n  }\n}\n\n\n\n.bracket-toggle-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 4px $space-3;\n  border: 1px solid rgba(99, 102, 241, 0.25);\n  border-radius: $radius-md;\n  background: rgba(99, 102, 241, 0.06);\n  color: #6366f1;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 200ms;\n\n  i { font-size: 0.7rem; }\n\n  &:hover {\n    background: rgba(99, 102, 241, 0.14);\n    border-color: rgba(99, 102, 241, 0.4);\n  }\n\n  &--active {\n    background: rgba(99, 102, 241, 0.14);\n    border-color: #6366f1;\n  }\n}\n\n\n\n.brackets-panel[_ngcontent-%COMP%] {\n  padding: 0 $space-4 $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.04);\n  animation: _ngcontent-%COMP%_fade-in-up 0.3s ease-out;\n}\n\n.brackets-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 0 $space-2;\n\n  h4 {\n    margin: 0;\n    font-size: $font-size-md;\n    font-weight: 600;\n    color: $gray-700;\n  }\n\n  small {\n    color: $gray-500;\n    font-size: $font-size-xs;\n    flex: 1;\n  }\n}\n\n.brackets-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.bracket-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 40px;\n  gap: $space-2;\n  align-items: center;\n\n  &--header {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    padding-bottom: $space-1;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  }\n}\n\n\n\n.bands-form[_ngcontent-%COMP%] {\n  padding: $space-4;\n}\n\n.form-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n  margin-bottom: $space-4;\n\n  &:hover .section-title {\n    @include form.section-title-hover;\n  }\n}\n\n.section-title[_ngcontent-%COMP%] {\n  @include form.section-title;\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  @include form.form-grid;\n\n  &--2col {\n    grid-template-columns: repeat(2, 1fr);\n    @media (max-width: 768px) {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  &:hover > label {\n    color: #334155;\n  }\n\n  &:focus-within > label {\n    color: #4f46e5;\n  }\n\n  > p-inputgroup,\n  > p-inputNumber,\n  > textarea {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &--inline {\n    > label {\n      min-width: auto;\n      text-align: left;\n    }\n  }\n}\n\n.field-hint[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-400;\n  margin-top: 2px;\n}\n\n.band-note[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-500;\n  margin-top: $space-3;\n  padding: $space-2 $space-3;\n  background: rgba(102, 126, 234, 0.06);\n  border-radius: $radius-md;\n  border-left: 3px solid $primary;\n}\n\n\n\n.save-bar[_ngcontent-%COMP%] {\n  position: sticky;\n  bottom: $space-4;\n  z-index: 10;\n  display: flex;\n  justify-content: flex-end;\n  padding: $space-3;\n\n  .action-btn {\n    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.35);\n  }\n}\n\n\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes _ngcontent-%COMP%_slide-in-right {\n  from { opacity: 0; transform: translateX(20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n@keyframes _ngcontent-%COMP%_gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes _ngcontent-%COMP%_pulse-glow {\n  0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }\n  50% { opacity: 0.8; box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); }\n}\n\n\n\n.action-btn--sm[_ngcontent-%COMP%] {\n  padding: $space-1 $space-2;\n  font-size: $font-size-xs;\n\n  .action-btn__icon {\n    width: 22px;\n    height: 22px;\n    font-size: $font-size-xs;\n  }\n}\n\n\n\n.dimension-desc[_ngcontent-%COMP%] {\n  margin: 2px 0 0;\n  font-size: $font-size-xs;\n  color: $gray-400;\n  line-height: 1.4;\n  padding-left: 82px; // aligns with input after label\n}\n\n\n\n\n\n\n.dh-sidebar-tabs[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  padding: 0;\n  border-radius: 0;\n  position: relative;\n  z-index: 1;\n}\n\n\n\n.dh-sidebar-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  gap: 1.5rem;\n  min-height: 480px;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n}\n\n\n\n[_nghost-%COMP%]     .dh-sidebar-nav.p-tablist {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0.65rem;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.88));\n  border: 1px solid rgba(226, 232, 240, 0.6);\n  border-radius: 20px;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.8),\n    0 8px 24px rgba(15, 23, 42, 0.06),\n    0 2px 8px rgba(15, 23, 42, 0.04);\n  backdrop-filter: blur(16px) saturate(120%);\n  -webkit-backdrop-filter: blur(16px) saturate(120%);\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n}\n\n[_nghost-%COMP%]     .dh-sidebar-nav .p-tablist-tab-list {\n  display: flex !important;\n  flex-direction: column !important;\n  gap: 0.35rem;\n  border: none !important;\n}\n\n\n\n[_nghost-%COMP%]     .dh-sidebar-content.p-tabpanels {\n  background: transparent;\n  border: none;\n  padding: 0;\n  min-width: 0;\n}\n\n\n\n[_nghost-%COMP%]     .p-tab.dh-sidebar-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border: none;\n  border-radius: 14px;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: #475569;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  transition:\n    background 0.22s ease,\n    color 0.22s ease,\n    transform 0.18s ease,\n    box-shadow 0.22s ease;\n  background: rgba(255, 255, 255, 0.35);\n  text-shadow: none;\n  white-space: nowrap;\n  text-align: left;\n  justify-content: flex-start;\n  min-height: 0;\n  line-height: 1.3;\n  opacity: 1 !important;\n}\n\n\n\n[_nghost-%COMP%]     .p-tab.dh-sidebar-item > i.pi {\n  font-size: 1.1rem;\n  width: 22px;\n  text-align: center;\n  flex-shrink: 0;\n  transition: transform 0.22s ease, color 0.22s ease;\n}\n\n.dh-sidebar-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n\n.dh-sidebar-label[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  font-weight: 600;\n  letter-spacing: 0.005em;\n}\n\n.dh-sidebar-hint[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 400;\n  opacity: 0.7;\n}\n\n\n\n[_nghost-%COMP%]     .p-tab.dh-sidebar-item::before {\n  content: '';\n  position: absolute;\n  inset: 0 0 auto 0;\n  height: 50%;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent);\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n\n\n[_nghost-%COMP%]     .p-tab.dh-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) {\n  background: rgba(99, 102, 241, 0.08);\n  color: #1e293b;\n  transform: translateX(3px);\n}\n\n[_nghost-%COMP%]     .p-tab.dh-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) i.pi {\n  transform: scale(1.08);\n}\n\n\n\n[_nghost-%COMP%]     .p-tab.dh-sidebar-item:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 2px rgba(255, 255, 255, 0.8),\n    0 0 0 4px rgba(99, 102, 241, 0.2);\n}\n\n\n\n[_nghost-%COMP%]     .p-tab.dh-sidebar-item.p-tab-active, \n[_nghost-%COMP%]     .p-tab.dh-sidebar-item[aria-selected='true'], \n[_nghost-%COMP%]     .p-tab.dh-sidebar-item[data-p-active='true'] {\n  color: #ffffff !important;\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),\n    var(--dh-side-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.22),\n    0 8px 20px rgba(59, 130, 246, 0.30),\n    0 0 28px rgba(125, 211, 252, 0.18);\n  transform: translateX(4px);\n  animation: _ngcontent-%COMP%_dh-side-breathe 2.2s ease-in-out infinite;\n}\n\n[_nghost-%COMP%]     .p-tab.dh-sidebar-item.p-tab-active .dh-sidebar-label, \n[_nghost-%COMP%]     .p-tab.dh-sidebar-item[aria-selected='true'] .dh-sidebar-label, \n[_nghost-%COMP%]     .p-tab.dh-sidebar-item[data-p-active='true'] .dh-sidebar-label {\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .p-tab.dh-sidebar-item.p-tab-active .dh-sidebar-hint, \n[_nghost-%COMP%]     .p-tab.dh-sidebar-item[aria-selected='true'] .dh-sidebar-hint, \n[_nghost-%COMP%]     .p-tab.dh-sidebar-item[data-p-active='true'] .dh-sidebar-hint {\n  color: rgba(255, 255, 255, 0.8) !important;\n  opacity: 1;\n}\n\n[_nghost-%COMP%]     .p-tab.dh-sidebar-item.p-tab-active i.pi, \n[_nghost-%COMP%]     .p-tab.dh-sidebar-item[aria-selected='true'] i.pi, \n[_nghost-%COMP%]     .p-tab.dh-sidebar-item[data-p-active='true'] i.pi {\n  color: #ffffff !important;\n  transform: scale(1.12);\n  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));\n}\n\n\n\n[_nghost-%COMP%]     .p-tab.dh-sidebar-item.p-tab-active::after, \n[_nghost-%COMP%]     .p-tab.dh-sidebar-item[aria-selected='true']::after, \n[_nghost-%COMP%]     .p-tab.dh-sidebar-item[data-p-active='true']::after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 15%;\n  bottom: 15%;\n  width: 3px;\n  border-radius: 0 4px 4px 0;\n  background: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, 0.2) 0%,\n    rgba(239, 68, 68, 0.9) 14%,\n    rgba(245, 158, 11, 0.9) 28%,\n    rgba(34, 197, 94, 0.9) 50%,\n    rgba(59, 130, 246, 0.95) 72%,\n    rgba(139, 92, 246, 0.95) 86%,\n    rgba(255, 255, 255, 0.2) 100%\n  );\n  box-shadow:\n    0 0 8px rgba(59, 130, 246, 0.4),\n    2px 0 12px rgba(139, 92, 246, 0.2);\n  background-size: 100% 300%;\n  animation: _ngcontent-%COMP%_dh-side-strip 3s linear infinite;\n}\n\n\n\n[_nghost-%COMP%]     .p-tab.dh-sidebar-item:nth-child(1) {\n  --dh-side-bg: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);\n}\n\n[_nghost-%COMP%]     .p-tab.dh-sidebar-item:nth-child(2) {\n  --dh-side-bg: linear-gradient(135deg, #10b981 0%, #059669 100%);\n}\n\n\n\n[_nghost-%COMP%]     .dh-sidebar-nav .p-tablist-active-bar {\n  display: none !important;\n}\n\n\n\n@keyframes _ngcontent-%COMP%_dh-side-breathe {\n  0%, 100% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.18),\n      0 6px 16px rgba(59, 130, 246, 0.22),\n      0 0 20px rgba(125, 211, 252, 0.12);\n  }\n  50% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.26),\n      0 8px 22px rgba(59, 130, 246, 0.30),\n      0 0 32px rgba(125, 211, 252, 0.20),\n      0 0 40px rgba(255, 255, 255, 0.06);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_dh-side-strip {\n  0% { background-position: 100% 0%; }\n  100% { background-position: 100% 300%; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  [_nghost-%COMP%]     .p-tab.dh-sidebar-item.p-tab-active, \n   [_nghost-%COMP%]     .p-tab.dh-sidebar-item[aria-selected='true'], \n   [_nghost-%COMP%]     .p-tab.dh-sidebar-item[data-p-active='true'] {\n    animation: none;\n  }\n  [_nghost-%COMP%]     .p-tab.dh-sidebar-item.p-tab-active::after, \n   [_nghost-%COMP%]     .p-tab.dh-sidebar-item[aria-selected='true']::after, \n   [_nghost-%COMP%]     .p-tab.dh-sidebar-item[data-p-active='true']::after {\n    animation: none;\n  }\n}\n\n\n\n@media (max-width: 900px) {\n  .dh-sidebar-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  [_nghost-%COMP%]     .dh-sidebar-nav.p-tablist {\n    flex-direction: row;\n    overflow-x: auto;\n    padding: 0.65rem;\n    border-radius: 14px;\n    position: static;\n  }\n\n  [_nghost-%COMP%]     .dh-sidebar-nav .p-tablist-tab-list {\n    flex-direction: row !important;\n    gap: 0.35rem;\n  }\n\n  [_nghost-%COMP%]     .p-tab.dh-sidebar-item {\n    flex: 0 0 auto;\n    padding: 0.65rem 1rem;\n  }\n\n  .dh-sidebar-hint[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  [_nghost-%COMP%]     .p-tab.dh-sidebar-item.p-tab-active, \n   [_nghost-%COMP%]     .p-tab.dh-sidebar-item[aria-selected='true'], \n   [_nghost-%COMP%]     .p-tab.dh-sidebar-item[data-p-active='true'] {\n    transform: translateY(-2px);\n  }\n\n  [_nghost-%COMP%]     .p-tab.dh-sidebar-item.p-tab-active::after, \n   [_nghost-%COMP%]     .p-tab.dh-sidebar-item[aria-selected='true']::after, \n   [_nghost-%COMP%]     .p-tab.dh-sidebar-item[data-p-active='true']::after {\n    left: 15%;\n    right: 15%;\n    top: auto;\n    bottom: 0;\n    width: auto;\n    height: 3px;\n    border-radius: 4px 4px 0 0;\n    background: linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.2) 0%,\n      rgba(59, 130, 246, 0.95) 30%,\n      rgba(139, 92, 246, 0.95) 70%,\n      rgba(255, 255, 255, 0.2) 100%\n    );\n    background-size: 300% 100%;\n    animation: _ngcontent-%COMP%_dh-side-strip-h 3s linear infinite;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_dh-side-strip-h {\n  0% { background-position: 0% 100%; }\n  100% { background-position: 300% 100%; }\n}\n\n\n\n\n\n\n.band-preview[_ngcontent-%COMP%] {\n  margin-bottom: $space-5;\n  padding: $space-4;\n  background: rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-xl;\n}\n\n.band-bar[_ngcontent-%COMP%] {\n  display: flex;\n  height: 36px;\n  border-radius: $radius-md;\n  overflow: hidden;\n  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.08);\n}\n\n.band-segment[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 0;\n  transition: width 0.4s ease;\n  position: relative;\n  cursor: default;\n\n  &:not(:last-child) {\n    border-right: 2px solid rgba(255, 255, 255, 0.5);\n  }\n}\n\n.band-segment-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: #ffffff;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding: 0 4px;\n}\n\n.band-bar-legend[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: $space-1 $space-1 0;\n  font-size: $font-size-xs;\n  color: $gray-400;\n  font-weight: 500;\n  font-variant-numeric: tabular-nums;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DealHealthSettingsPage, [{
        type: Component,
        args: [{ selector: 'app-deal-health-settings-page', standalone: true, imports: [
                    ButtonModule,
                    CheckboxModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    InputTextModule,
                    InputNumberModule,
                    FormsModule,
                    RouterLink,
                    SkeletonModule,
                    TabsModule,
                    TooltipModule,
                    ToggleSwitchModule,
                    NgIf,
                    NgFor,
                    NgClass,
                    BreadcrumbsComponent
                ], template: "<div class=\"page-container\">\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Deal Health</span>\n      </div>\n\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Deal Health</span>\n        <span class=\"title-light\">Scoring</span>\n      </h1>\n\n      <p class=\"hero-description\">\n        Configure the dimensions, weights, brackets, and band thresholds used to calculate opportunity health scores.\n      </p>\n\n      <div class=\"hero-actions\">\n        <button type=\"button\" class=\"action-btn action-btn--back\" routerLink=\"/app/settings\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-arrow-left\"></i></span>\n          <span>Back to Settings</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--refresh\" [disabled]=\"loading()\" (click)=\"loadSettings()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n          <span>Reload</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"resetToDefaults()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-replay\"></i></span>\n          <span>Reset Defaults</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\"><i class=\"pi pi-heart\"></i></div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Dimensions</span>\n          <strong class=\"card-value\">{{ enabledCount() }} / {{ policy().dimensions.length }}</strong>\n          <span class=\"card-trend\"><i class=\"pi pi-check-circle\"></i> Active</span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n\n      <div class=\"visual-card visual-card--secondary\">\n        <div class=\"card-icon\"><i class=\"pi pi-chart-pie\"></i></div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Max Score</span>\n          <strong class=\"card-value\">{{ totalMaxScore() }}</strong>\n          <span class=\"card-trend\"><i class=\"pi pi-arrows-h\"></i> Points total</span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n\n      <div class=\"visual-card visual-card--success\">\n        <div class=\"card-icon\"><i class=\"pi pi-percentage\"></i></div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Confidence</span>\n          <strong class=\"card-value\">{{ (policy().confidence * 100).toFixed(0) }}%</strong>\n          <span class=\"card-trend\"><i class=\"pi pi-shield\"></i> Score reliability</span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <!-- \u2500\u2500 Loading State \u2500\u2500 -->\n  <div class=\"loading-state\" *ngIf=\"loading()\">\n    <div class=\"skeleton-row\" *ngFor=\"let _ of [0, 1, 2, 3]\">\n      <div class=\"skeleton skeleton-text\"></div>\n      <div class=\"skeleton skeleton-input\"></div>\n    </div>\n  </div>\n\n  <!-- \u2500\u2500 Sidebar + Content Layout \u2500\u2500 -->\n  <div class=\"dh-layout\" *ngIf=\"!loading()\">\n    <p-tabs class=\"dh-sidebar-tabs\" [value]=\"activeTab()\" (valueChange)=\"onActiveTabChange($event)\">\n      <div class=\"dh-sidebar-layout\">\n        <!-- Sidebar Navigation -->\n        <p-tablist class=\"dh-sidebar-nav\">\n          <p-tab value=\"0\" [pt]=\"{ root: { class: 'dh-sidebar-item' } }\">\n            <i class=\"pi pi-sliders-h\"></i>\n            <div class=\"dh-sidebar-text\">\n              <span class=\"dh-sidebar-label\">Dimensions</span>\n              <span class=\"dh-sidebar-hint\">Toggle &amp; configure scoring factors</span>\n            </div>\n          </p-tab>\n          <p-tab value=\"1\" [pt]=\"{ root: { class: 'dh-sidebar-item' } }\">\n            <i class=\"pi pi-chart-bar\"></i>\n            <div class=\"dh-sidebar-text\">\n              <span class=\"dh-sidebar-label\">Bands &amp; Confidence</span>\n              <span class=\"dh-sidebar-hint\">Score thresholds &amp; reliability</span>\n            </div>\n          </p-tab>\n        </p-tablist>\n\n        <!-- Tab Content Area -->\n        <p-tabpanels class=\"dh-sidebar-content\">\n\n        <!-- \u2550\u2550 Tab 0: Dimensions \u2550\u2550 -->\n        <p-tabpanel value=\"0\">\n          <section class=\"data-section\">\n            <div class=\"data-card\">\n              <div class=\"data-header\">\n                <div class=\"header-title\">\n                  <h2>Scoring Dimensions</h2>\n                  <span class=\"record-count\">Each dimension contributes a weighted score to the overall health rating</span>\n                </div>\n                <div class=\"header-actions\">\n                  <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"addDimension()\">\n                    <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n                    <span>Add Dimension</span>\n                  </button>\n                </div>\n              </div>\n\n              <!-- Weight distribution bar -->\n              <div class=\"weight-distribution\" *ngIf=\"dimensionWeightSegments().length\">\n                <div class=\"weight-distribution__label\">Weight Distribution</div>\n                <div class=\"weight-distribution__bar\">\n                  <div\n                    class=\"weight-distribution__segment\"\n                    *ngFor=\"let seg of dimensionWeightSegments()\"\n                    [style.width.%]=\"seg.pct\"\n                    [style.background]=\"seg.color\"\n                    [pTooltip]=\"seg.label + ': ' + seg.pct + '%'\"\n                    tooltipPosition=\"top\"\n                  >\n                    <span class=\"weight-distribution__segment-label\" *ngIf=\"seg.pct >= 10\">{{ seg.pct }}%</span>\n                  </div>\n                </div>\n              </div>\n\n              <!-- Column headers -->\n              <div class=\"dimension-columns\">\n                <span class=\"dimension-col dimension-col--toggle\"></span>\n                <span class=\"dimension-col dimension-col--icon\"></span>\n                <span class=\"dimension-col dimension-col--name\">Dimension</span>\n                <span class=\"dimension-col dimension-col--type\">Type</span>\n                <span class=\"dimension-col dimension-col--weight\">Weight</span>\n                <span class=\"dimension-col dimension-col--actions\"></span>\n              </div>\n\n              <div class=\"dimension-list\">\n                <div\n                  class=\"dimension-item\"\n                  *ngFor=\"let dim of policy().dimensions; let idx = index\"\n                  [class.dimension-item--disabled]=\"!dim.enabled\"\n                  [class.dimension-item--expanded]=\"expandedDimension() === dim.key\"\n                >\n                  <div class=\"dimension-row\">\n                    <div class=\"dimension-toggle\">\n                      <p-toggleSwitch\n                        [ngModel]=\"dim.enabled\"\n                        (ngModelChange)=\"toggleDimension(idx, $event)\"\n                      ></p-toggleSwitch>\n                    </div>\n\n                    <div class=\"dimension-icon\" [style.background]=\"dimensionColor(dim.key)\">\n                      <i class=\"pi\" [ngClass]=\"dimensionIcon(dim.key)\"></i>\n                    </div>\n\n                    <div class=\"dimension-info\">\n                      <!-- Built-in: read-only display -->\n                      <div class=\"dimension-name\" *ngIf=\"isBuiltIn(dim.key)\">\n                        <strong class=\"dimension-name__label\">{{ dim.label }}</strong>\n                        <p class=\"dimension-desc\" *ngIf=\"dimensionDescription(dim.key)\">{{ dimensionDescription(dim.key) }}</p>\n                      </div>\n                      <!-- Custom: editable input -->\n                      <div class=\"dimension-name\" *ngIf=\"!isBuiltIn(dim.key)\">\n                        <div class=\"form-field form-field--inline\">\n                          <p-inputgroup>\n                            <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                              <i class=\"pi pi-tag\"></i>\n                            </p-inputgroup-addon>\n                            <input\n                              pInputText\n                              [id]=\"'dh-label-' + idx\"\n                              [ngModel]=\"dim.label\"\n                              (ngModelChange)=\"updateDimensionLabel(idx, $event)\"\n                              class=\"w-full\"\n                              placeholder=\"Dimension name\"\n                            />\n                          </p-inputgroup>\n                        </div>\n                      </div>\n                    </div>\n\n                    <div class=\"dimension-type\">\n                      <span\n                        *ngIf=\"hasBrackets(dim)\"\n                        class=\"type-chip type-chip--bracket\"\n                        pTooltip=\"Score is determined by threshold brackets you define\"\n                        tooltipPosition=\"top\"\n                      >\n                        <i class=\"pi pi-list\"></i> Bracket\n                      </span>\n                      <span\n                        *ngIf=\"!hasBrackets(dim)\"\n                        class=\"type-chip type-chip--ratio\"\n                        pTooltip=\"Score is calculated automatically as a ratio of actual vs. maximum\"\n                        tooltipPosition=\"top\"\n                      >\n                        <i class=\"pi pi-percentage\"></i> Ratio\n                      </span>\n                    </div>\n\n                    <div class=\"dimension-weight\">\n                      <div class=\"weight-display\">\n                        <p-inputgroup class=\"weight-input-group\">\n                          <p-inputgroup-addon class=\"icon-addon icon-addon--success\">\n                            <i class=\"pi pi-star\"></i>\n                          </p-inputgroup-addon>\n                          <p-inputNumber\n                            [id]=\"'dh-max-' + idx\"\n                            [ngModel]=\"dim.maxScore\"\n                            (ngModelChange)=\"updateDimensionMaxScore(idx, $event)\"\n                            [min]=\"1\"\n                            [max]=\"100\"\n                            styleClass=\"w-full\"\n                          ></p-inputNumber>\n                        </p-inputgroup>\n                        <span class=\"weight-pct\" *ngIf=\"dim.enabled\">{{ dimensionWeightPct(dim) }}%</span>\n                      </div>\n                    </div>\n\n                    <div class=\"dimension-actions\">\n                      <button\n                        *ngIf=\"hasBrackets(dim)\"\n                        type=\"button\"\n                        class=\"bracket-toggle-btn\"\n                        [class.bracket-toggle-btn--active]=\"expandedDimension() === dim.key\"\n                        (click)=\"toggleExpand(dim.key)\"\n                      >\n                        <i class=\"pi\" [ngClass]=\"expandedDimension() === dim.key ? 'pi-chevron-up' : 'pi-chevron-down'\"></i>\n                        <span>{{ expandedDimension() === dim.key ? 'Close' : 'Brackets' }}</span>\n                      </button>\n                      <button\n                        *ngIf=\"!isBuiltIn(dim.key)\"\n                        type=\"button\"\n                        class=\"row-action-btn row-action-btn--delete\"\n                        title=\"Remove dimension\"\n                        (click)=\"removeDimension(idx)\"\n                      >\n                        <i class=\"pi pi-trash\"></i>\n                      </button>\n                    </div>\n                  </div>\n\n                  <!-- Brackets sub-table (expanded) -->\n                  <div class=\"brackets-panel\" *ngIf=\"expandedDimension() === dim.key && hasBrackets(dim)\">\n                    <div class=\"brackets-header\">\n                      <h4>Scoring Brackets</h4>\n                      <small>When measured value &le; threshold, award the corresponding score</small>\n                      <button type=\"button\" class=\"action-btn action-btn--add action-btn--sm\" (click)=\"addBracket(idx)\">\n                        <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n                        <span>Add</span>\n                      </button>\n                    </div>\n                    <div class=\"brackets-grid\">\n                      <div class=\"bracket-row bracket-row--header\">\n                        <span>Threshold (&le;)</span>\n                        <span>Score Awarded</span>\n                        <span></span>\n                      </div>\n                      <div class=\"bracket-row\" *ngFor=\"let b of dim.brackets; let bi = index\">\n                        <p-inputNumber\n                          [ngModel]=\"b.threshold\"\n                          (ngModelChange)=\"updateBracketThreshold(idx, bi, $event)\"\n                          [min]=\"0\"\n                          styleClass=\"w-full\"\n                        ></p-inputNumber>\n                        <p-inputNumber\n                          [ngModel]=\"b.score\"\n                          (ngModelChange)=\"updateBracketScore(idx, bi, $event)\"\n                          [min]=\"0\"\n                          [max]=\"dim.maxScore\"\n                          styleClass=\"w-full\"\n                        ></p-inputNumber>\n                        <button\n                          type=\"button\"\n                          class=\"row-action-btn row-action-btn--delete\"\n                          title=\"Remove bracket\"\n                          (click)=\"removeBracket(idx, bi)\"\n                        >\n                          <i class=\"pi pi-times\"></i>\n                        </button>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </section>\n        </p-tabpanel>\n\n        <!-- \u2550\u2550 Tab 1: Bands & Confidence \u2550\u2550 -->\n        <p-tabpanel value=\"1\">\n          <section class=\"data-section\">\n            <div class=\"data-card\">\n              <div class=\"data-header\">\n                <div class=\"header-title\">\n                  <h2>Score Bands &amp; Confidence</h2>\n                  <span class=\"record-count\">Normalised score (0\u2013100) maps to a health label</span>\n                </div>\n              </div>\n\n              <div class=\"bands-form\">\n                <!-- Visual Band Preview -->\n                <div class=\"band-preview\">\n                  <div class=\"band-bar\">\n                    <div\n                      class=\"band-segment\"\n                      *ngFor=\"let seg of bandSegments()\"\n                      [style.width.%]=\"seg.to - seg.from\"\n                      [style.background]=\"seg.color\"\n                      [pTooltip]=\"seg.label + ': ' + seg.from + '\u2013' + seg.to\"\n                      tooltipPosition=\"top\"\n                    >\n                      <span class=\"band-segment-label\" *ngIf=\"(seg.to - seg.from) >= 12\">{{ seg.label }}</span>\n                    </div>\n                  </div>\n                  <div class=\"band-bar-legend\">\n                    <span>0</span>\n                    <span>{{ policy().bands.atRisk }}</span>\n                    <span>{{ policy().bands.fair }}</span>\n                    <span>{{ policy().bands.good }}</span>\n                    <span>{{ policy().bands.excellent }}</span>\n                    <span>100</span>\n                  </div>\n                </div>\n\n                <section class=\"form-card\">\n                  <h3 class=\"section-title\">\n                    <i class=\"pi pi-sliders-h\"></i>\n                    Health Band Thresholds\n                  </h3>\n\n                  <div class=\"form-grid form-grid--2col\">\n                    <div class=\"form-field\">\n                      <label for=\"dh-excellent\">Excellent (&ge;)</label>\n                      <p-inputgroup>\n                        <p-inputgroup-addon class=\"icon-addon icon-addon--success\">\n                          <i class=\"pi pi-star-fill\"></i>\n                        </p-inputgroup-addon>\n                        <p-inputNumber\n                          id=\"dh-excellent\"\n                          [ngModel]=\"policy().bands.excellent\"\n                          (ngModelChange)=\"updateBand('excellent', $event)\"\n                          [min]=\"0\"\n                          [max]=\"100\"\n                          styleClass=\"w-full\"\n                        ></p-inputNumber>\n                      </p-inputgroup>\n                    </div>\n\n                    <div class=\"form-field\">\n                      <label for=\"dh-good\">Good (&ge;)</label>\n                      <p-inputgroup>\n                        <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                          <i class=\"pi pi-thumbs-up\"></i>\n                        </p-inputgroup-addon>\n                        <p-inputNumber\n                          id=\"dh-good\"\n                          [ngModel]=\"policy().bands.good\"\n                          (ngModelChange)=\"updateBand('good', $event)\"\n                          [min]=\"0\"\n                          [max]=\"100\"\n                          styleClass=\"w-full\"\n                        ></p-inputNumber>\n                      </p-inputgroup>\n                    </div>\n\n                    <div class=\"form-field\">\n                      <label for=\"dh-fair\">Fair (&ge;)</label>\n                      <p-inputgroup>\n                        <p-inputgroup-addon class=\"icon-addon icon-addon--warning\">\n                          <i class=\"pi pi-minus-circle\"></i>\n                        </p-inputgroup-addon>\n                        <p-inputNumber\n                          id=\"dh-fair\"\n                          [ngModel]=\"policy().bands.fair\"\n                          (ngModelChange)=\"updateBand('fair', $event)\"\n                          [min]=\"0\"\n                          [max]=\"100\"\n                          styleClass=\"w-full\"\n                        ></p-inputNumber>\n                      </p-inputgroup>\n                    </div>\n\n                    <div class=\"form-field\">\n                      <label for=\"dh-atrisk\">At Risk (&ge;)</label>\n                      <p-inputgroup>\n                        <p-inputgroup-addon class=\"icon-addon icon-addon--danger\">\n                          <i class=\"pi pi-exclamation-triangle\"></i>\n                        </p-inputgroup-addon>\n                        <p-inputNumber\n                          id=\"dh-atrisk\"\n                          [ngModel]=\"policy().bands.atRisk\"\n                          (ngModelChange)=\"updateBand('atRisk', $event)\"\n                          [min]=\"0\"\n                          [max]=\"100\"\n                          styleClass=\"w-full\"\n                        ></p-inputNumber>\n                      </p-inputgroup>\n                    </div>\n                  </div>\n\n                  <p class=\"band-note\">\n                    Scores below <strong>At Risk</strong> threshold are labeled <em>Critical</em>.\n                  </p>\n                </section>\n\n                <section class=\"form-card\">\n                  <h3 class=\"section-title\">\n                    <i class=\"pi pi-shield\"></i>\n                    Confidence Level\n                  </h3>\n\n                  <div class=\"form-grid form-grid--2col\">\n                    <div class=\"form-field\">\n                      <label for=\"dh-confidence\">Confidence (0\u20131)</label>\n                      <p-inputgroup>\n                        <p-inputgroup-addon class=\"icon-addon icon-addon--industry\">\n                          <i class=\"pi pi-percentage\"></i>\n                        </p-inputgroup-addon>\n                        <p-inputNumber\n                          id=\"dh-confidence\"\n                          [ngModel]=\"policy().confidence\"\n                          (ngModelChange)=\"updateConfidence($event)\"\n                          [min]=\"0\"\n                          [max]=\"1\"\n                          [minFractionDigits]=\"2\"\n                          [maxFractionDigits]=\"2\"\n                          [step]=\"0.05\"\n                          styleClass=\"w-full\"\n                        ></p-inputNumber>\n                      </p-inputgroup>\n                      <small class=\"field-hint\">How reliable the score is considered (shown to users)</small>\n                    </div>\n                  </div>\n                </section>\n              </div>\n            </div>\n          </section>\n        </p-tabpanel>\n\n        </p-tabpanels>\n      </div>\n    </p-tabs>\n  </div>\n\n  <!-- \u2500\u2500 Save bar \u2500\u2500 -->\n  <div class=\"save-bar\" *ngIf=\"!loading()\">\n    <button\n      type=\"button\"\n      class=\"action-btn action-btn--add\"\n      [disabled]=\"saving()\"\n      (click)=\"saveSettings()\"\n    >\n      <span class=\"action-btn__icon\"><i class=\"pi pi-check\"></i></span>\n      <span>{{ saving() ? 'Saving\u2026' : 'Save Settings' }}</span>\n    </button>\n  </div>\n</div>\n", styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   DEAL HEALTH SCORING SETTINGS PAGE - Premium Glass UI\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n:host {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.page-container {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n/* Animated Background Orbs */\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: float 20s ease-in-out infinite;\n}\n\n.orb-1 {\n  width: 400px;\n  height: 400px;\n  background: $primary-gradient;\n  top: -150px;\n  right: -100px;\n}\n\n.orb-2 {\n  width: 300px;\n  height: 300px;\n  background: $cyan-gradient;\n  bottom: 10%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3 {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);\n  top: 40%;\n  right: 15%;\n  animation-delay: -14s;\n}\n\n@keyframes float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(40px, -25px) scale(1.08); }\n  50% { transform: translate(80px, 15px) scale(0.92); }\n  75% { transform: translate(25px, 40px) scale(1.04); }\n}\n\n/* \u2500\u2500 Hero \u2500\u2500 */\n.hero-section {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-title {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-1;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: gradient-shift 4s ease-in-out infinite;\n  }\n\n  .title-light {\n    -webkit-text-fill-color: $gray-700;\n    margin-left: $space-2;\n  }\n}\n\n.hero-description {\n  font-size: $font-size-base;\n  color: $gray-500;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0 0 $space-3;\n}\n\n.hero-actions {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  .card-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n    color: white;\n  }\n\n  &--primary .card-icon { background: $primary-gradient; }\n  &--secondary .card-icon { background: $cyan-gradient; }\n  &--success .card-icon { background: $success-gradient; }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n/* \u2500\u2500 Data sections \u2500\u2500 */\n.data-section {\n  position: relative;\n  z-index: 1;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.5s ease-out 0.4s both;\n}\n\n.data-card {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.data-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  h2 {\n    margin: 0;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .record-count {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n/* \u2500\u2500 Loading skeleton \u2500\u2500 */\n.loading-state {\n  padding: $space-4;\n}\n\n.skeleton-row {\n  display: flex;\n  gap: $space-4;\n  margin-bottom: $space-3;\n}\n\n.skeleton {\n  border-radius: $radius-md;\n  background: linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.06) 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n}\n\n.skeleton-text { width: 30%; height: 20px; }\n.skeleton-input { flex: 1; height: 36px; }\n\n@keyframes shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n/* \u2500\u2500 Weight distribution bar \u2500\u2500 */\n.weight-distribution {\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  &__label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    margin-bottom: $space-2;\n  }\n\n  &__bar {\n    display: flex;\n    height: 24px;\n    border-radius: $radius-full;\n    overflow: hidden;\n    gap: 2px;\n    background: $gray-200;\n  }\n\n  &__segment {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    transition: width 500ms ease-out;\n    min-width: 4px;\n  }\n\n  &__segment-label {\n    font-size: 0.6875rem;\n    font-weight: 700;\n    color: white;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);\n  }\n}\n\n/* \u2500\u2500 Column headers \u2500\u2500 */\n.dimension-columns {\n  display: grid;\n  grid-template-columns: auto 36px 1fr 100px minmax(140px, 200px) auto;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.dimension-col {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n/* \u2500\u2500 Dimension list \u2500\u2500 */\n.dimension-list {\n  padding: $space-2;\n}\n\n.dimension-item {\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-lg;\n  margin-bottom: $space-2;\n  background: rgba(255, 255, 255, 0.6);\n  transition: all 250ms;\n\n  &:hover {\n    border-color: rgba(102, 126, 234, 0.2);\n    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.05);\n  }\n\n  &--disabled {\n    opacity: 0.55;\n  }\n\n  &--expanded {\n    border-color: rgba(102, 126, 234, 0.3);\n    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.08);\n  }\n}\n\n.dimension-row {\n  display: grid;\n  grid-template-columns: auto 36px 1fr 100px minmax(140px, 200px) auto;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n\n  @media (max-width: 900px) {\n    grid-template-columns: auto 36px 1fr;\n    grid-template-rows: auto auto auto;\n  }\n}\n\n.dimension-toggle {\n  flex-shrink: 0;\n}\n\n.dimension-icon {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  color: white;\n  font-size: $font-size-lg;\n  flex-shrink: 0;\n}\n\n.dimension-info {\n  min-width: 0;\n}\n\n.dimension-name {\n  &__label {\n    font-size: $font-size-base;\n    font-weight: 600;\n    color: $gray-800;\n    display: block;\n    line-height: 1.3;\n  }\n}\n\n.dimension-desc {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  margin: 2px 0 0;\n  line-height: 1.4;\n}\n\n/* \u2500\u2500 Type chips \u2500\u2500 */\n.dimension-type {\n  @media (max-width: 900px) {\n    grid-column: 1 / -1;\n  }\n}\n\n.type-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 3px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  letter-spacing: 0.02em;\n  cursor: default;\n\n  i { font-size: 0.7rem; }\n\n  &--bracket {\n    background: rgba(99, 102, 241, 0.12);\n    color: #6366f1;\n  }\n\n  &--ratio {\n    background: rgba(34, 197, 94, 0.12);\n    color: #16a34a;\n  }\n}\n\n/* \u2500\u2500 Weight display \u2500\u2500 */\n.dimension-weight {\n  min-width: 0;\n\n  @media (max-width: 900px) {\n    grid-column: 1 / -1;\n  }\n}\n\n.weight-display {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.weight-input-group {\n  flex: 1;\n  min-width: 0;\n}\n\n.weight-pct {\n  font-size: $font-size-xs;\n  font-weight: 700;\n  color: $primary;\n  white-space: nowrap;\n  background: rgba(102, 126, 234, 0.1);\n  padding: 2px 6px;\n  border-radius: $radius-full;\n}\n\n/* Ensure p-inputNumber expands inside inputgroup */\n:host ::ng-deep .dimension-weight {\n  p-inputnumber {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .p-inputnumber {\n    width: 100%;\n  }\n\n  .p-inputnumber-input {\n    width: 100%;\n    min-width: 50px;\n    text-align: center;\n    font-weight: 600;\n    font-size: $font-size-base;\n  }\n}\n\n.dimension-actions {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-shrink: 0;\n\n  @media (max-width: 900px) {\n    grid-column: 1 / -1;\n    justify-content: flex-end;\n  }\n}\n\n/* \u2500\u2500 Bracket toggle button \u2500\u2500 */\n.bracket-toggle-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 4px $space-3;\n  border: 1px solid rgba(99, 102, 241, 0.25);\n  border-radius: $radius-md;\n  background: rgba(99, 102, 241, 0.06);\n  color: #6366f1;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 200ms;\n\n  i { font-size: 0.7rem; }\n\n  &:hover {\n    background: rgba(99, 102, 241, 0.14);\n    border-color: rgba(99, 102, 241, 0.4);\n  }\n\n  &--active {\n    background: rgba(99, 102, 241, 0.14);\n    border-color: #6366f1;\n  }\n}\n\n/* \u2500\u2500 Brackets panel \u2500\u2500 */\n.brackets-panel {\n  padding: 0 $space-4 $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.04);\n  animation: fade-in-up 0.3s ease-out;\n}\n\n.brackets-header {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 0 $space-2;\n\n  h4 {\n    margin: 0;\n    font-size: $font-size-md;\n    font-weight: 600;\n    color: $gray-700;\n  }\n\n  small {\n    color: $gray-500;\n    font-size: $font-size-xs;\n    flex: 1;\n  }\n}\n\n.brackets-grid {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.bracket-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr 40px;\n  gap: $space-2;\n  align-items: center;\n\n  &--header {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    padding-bottom: $space-1;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  }\n}\n\n/* \u2500\u2500 Band & confidence form \u2500\u2500 */\n.bands-form {\n  padding: $space-4;\n}\n\n.form-card {\n  @include form.form-section;\n  margin-bottom: $space-4;\n\n  &:hover .section-title {\n    @include form.section-title-hover;\n  }\n}\n\n.section-title {\n  @include form.section-title;\n}\n\n.form-grid {\n  @include form.form-grid;\n\n  &--2col {\n    grid-template-columns: repeat(2, 1fr);\n    @media (max-width: 768px) {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n.form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  &:hover > label {\n    color: #334155;\n  }\n\n  &:focus-within > label {\n    color: #4f46e5;\n  }\n\n  > p-inputgroup,\n  > p-inputNumber,\n  > textarea {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &--inline {\n    > label {\n      min-width: auto;\n      text-align: left;\n    }\n  }\n}\n\n.field-hint {\n  font-size: $font-size-xs;\n  color: $gray-400;\n  margin-top: 2px;\n}\n\n.band-note {\n  font-size: $font-size-sm;\n  color: $gray-500;\n  margin-top: $space-3;\n  padding: $space-2 $space-3;\n  background: rgba(102, 126, 234, 0.06);\n  border-radius: $radius-md;\n  border-left: 3px solid $primary;\n}\n\n/* \u2500\u2500 Save bar \u2500\u2500 */\n.save-bar {\n  position: sticky;\n  bottom: $space-4;\n  z-index: 10;\n  display: flex;\n  justify-content: flex-end;\n  padding: $space-3;\n\n  .action-btn {\n    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.35);\n  }\n}\n\n/* \u2500\u2500 Animations \u2500\u2500 */\n@keyframes fade-in-up {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes slide-in-right {\n  from { opacity: 0; transform: translateX(20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n@keyframes gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes pulse-glow {\n  0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }\n  50% { opacity: 0.8; box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); }\n}\n\n/* \u2500\u2500 Inline action button size modifier \u2500\u2500 */\n.action-btn--sm {\n  padding: $space-1 $space-2;\n  font-size: $font-size-xs;\n\n  .action-btn__icon {\n    width: 22px;\n    height: 22px;\n    font-size: $font-size-xs;\n  }\n}\n\n/* \u2500\u2500 Dimension description \u2500\u2500 */\n.dimension-desc {\n  margin: 2px 0 0;\n  font-size: $font-size-xs;\n  color: $gray-400;\n  line-height: 1.4;\n  padding-left: 82px; // aligns with input after label\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   SIDEBAR TABS \u2014 same pattern as Qualification Policy & Workspace Settings\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.dh-sidebar-tabs {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  padding: 0;\n  border-radius: 0;\n  position: relative;\n  z-index: 1;\n}\n\n/* Side-by-side grid: sidebar | content */\n.dh-sidebar-layout {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  gap: 1.5rem;\n  min-height: 480px;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n}\n\n/* \u2500\u2500 Sidebar navigation column \u2500\u2500 */\n:host ::ng-deep .dh-sidebar-nav.p-tablist {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0.65rem;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.88));\n  border: 1px solid rgba(226, 232, 240, 0.6);\n  border-radius: 20px;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.8),\n    0 8px 24px rgba(15, 23, 42, 0.06),\n    0 2px 8px rgba(15, 23, 42, 0.04);\n  backdrop-filter: blur(16px) saturate(120%);\n  -webkit-backdrop-filter: blur(16px) saturate(120%);\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n}\n\n:host ::ng-deep .dh-sidebar-nav .p-tablist-tab-list {\n  display: flex !important;\n  flex-direction: column !important;\n  gap: 0.35rem;\n  border: none !important;\n}\n\n/* Content panel area */\n:host ::ng-deep .dh-sidebar-content.p-tabpanels {\n  background: transparent;\n  border: none;\n  padding: 0;\n  min-width: 0;\n}\n\n/* \u2500\u2500 Individual sidebar tab \u2500\u2500 */\n:host ::ng-deep .p-tab.dh-sidebar-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border: none;\n  border-radius: 14px;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: #475569;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  transition:\n    background 0.22s ease,\n    color 0.22s ease,\n    transform 0.18s ease,\n    box-shadow 0.22s ease;\n  background: rgba(255, 255, 255, 0.35);\n  text-shadow: none;\n  white-space: nowrap;\n  text-align: left;\n  justify-content: flex-start;\n  min-height: 0;\n  line-height: 1.3;\n  opacity: 1 !important;\n}\n\n/* Sidebar item icon (direct child of the p-tab root) */\n:host ::ng-deep .p-tab.dh-sidebar-item > i.pi {\n  font-size: 1.1rem;\n  width: 22px;\n  text-align: center;\n  flex-shrink: 0;\n  transition: transform 0.22s ease, color 0.22s ease;\n}\n\n.dh-sidebar-text {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n\n.dh-sidebar-label {\n  font-size: 0.88rem;\n  font-weight: 600;\n  letter-spacing: 0.005em;\n}\n\n.dh-sidebar-hint {\n  font-size: 0.72rem;\n  font-weight: 400;\n  opacity: 0.7;\n}\n\n/* Glass sheen top half */\n:host ::ng-deep .p-tab.dh-sidebar-item::before {\n  content: '';\n  position: absolute;\n  inset: 0 0 auto 0;\n  height: 50%;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent);\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n/* Hover */\n:host ::ng-deep .p-tab.dh-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) {\n  background: rgba(99, 102, 241, 0.08);\n  color: #1e293b;\n  transform: translateX(3px);\n}\n\n:host ::ng-deep .p-tab.dh-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) i.pi {\n  transform: scale(1.08);\n}\n\n/* Focus */\n:host ::ng-deep .p-tab.dh-sidebar-item:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 2px rgba(255, 255, 255, 0.8),\n    0 0 0 4px rgba(99, 102, 241, 0.2);\n}\n\n/* \u2500\u2500 Active state \u2014 gradient glow pill \u2500\u2500 */\n:host ::ng-deep .p-tab.dh-sidebar-item.p-tab-active,\n:host ::ng-deep .p-tab.dh-sidebar-item[aria-selected='true'],\n:host ::ng-deep .p-tab.dh-sidebar-item[data-p-active='true'] {\n  color: #ffffff !important;\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),\n    var(--dh-side-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.22),\n    0 8px 20px rgba(59, 130, 246, 0.30),\n    0 0 28px rgba(125, 211, 252, 0.18);\n  transform: translateX(4px);\n  animation: dh-side-breathe 2.2s ease-in-out infinite;\n}\n\n:host ::ng-deep .p-tab.dh-sidebar-item.p-tab-active .dh-sidebar-label,\n:host ::ng-deep .p-tab.dh-sidebar-item[aria-selected='true'] .dh-sidebar-label,\n:host ::ng-deep .p-tab.dh-sidebar-item[data-p-active='true'] .dh-sidebar-label {\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .p-tab.dh-sidebar-item.p-tab-active .dh-sidebar-hint,\n:host ::ng-deep .p-tab.dh-sidebar-item[aria-selected='true'] .dh-sidebar-hint,\n:host ::ng-deep .p-tab.dh-sidebar-item[data-p-active='true'] .dh-sidebar-hint {\n  color: rgba(255, 255, 255, 0.8) !important;\n  opacity: 1;\n}\n\n:host ::ng-deep .p-tab.dh-sidebar-item.p-tab-active i.pi,\n:host ::ng-deep .p-tab.dh-sidebar-item[aria-selected='true'] i.pi,\n:host ::ng-deep .p-tab.dh-sidebar-item[data-p-active='true'] i.pi {\n  color: #ffffff !important;\n  transform: scale(1.12);\n  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));\n}\n\n/* Rainbow accent strip */\n:host ::ng-deep .p-tab.dh-sidebar-item.p-tab-active::after,\n:host ::ng-deep .p-tab.dh-sidebar-item[aria-selected='true']::after,\n:host ::ng-deep .p-tab.dh-sidebar-item[data-p-active='true']::after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 15%;\n  bottom: 15%;\n  width: 3px;\n  border-radius: 0 4px 4px 0;\n  background: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, 0.2) 0%,\n    rgba(239, 68, 68, 0.9) 14%,\n    rgba(245, 158, 11, 0.9) 28%,\n    rgba(34, 197, 94, 0.9) 50%,\n    rgba(59, 130, 246, 0.95) 72%,\n    rgba(139, 92, 246, 0.95) 86%,\n    rgba(255, 255, 255, 0.2) 100%\n  );\n  box-shadow:\n    0 0 8px rgba(59, 130, 246, 0.4),\n    2px 0 12px rgba(139, 92, 246, 0.2);\n  background-size: 100% 300%;\n  animation: dh-side-strip 3s linear infinite;\n}\n\n/* Per-tab gradient colors */\n:host ::ng-deep .p-tab.dh-sidebar-item:nth-child(1) {\n  --dh-side-bg: linear-gradient(135deg, #6366f1 0%, #4338ca 100%);\n}\n\n:host ::ng-deep .p-tab.dh-sidebar-item:nth-child(2) {\n  --dh-side-bg: linear-gradient(135deg, #10b981 0%, #059669 100%);\n}\n\n/* Hide PrimeNG default ink bar */\n:host ::ng-deep .dh-sidebar-nav .p-tablist-active-bar {\n  display: none !important;\n}\n\n/* \u2500\u2500 Animations \u2500\u2500 */\n@keyframes dh-side-breathe {\n  0%, 100% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.18),\n      0 6px 16px rgba(59, 130, 246, 0.22),\n      0 0 20px rgba(125, 211, 252, 0.12);\n  }\n  50% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.26),\n      0 8px 22px rgba(59, 130, 246, 0.30),\n      0 0 32px rgba(125, 211, 252, 0.20),\n      0 0 40px rgba(255, 255, 255, 0.06);\n  }\n}\n\n@keyframes dh-side-strip {\n  0% { background-position: 100% 0%; }\n  100% { background-position: 100% 300%; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  :host ::ng-deep .p-tab.dh-sidebar-item.p-tab-active,\n  :host ::ng-deep .p-tab.dh-sidebar-item[aria-selected='true'],\n  :host ::ng-deep .p-tab.dh-sidebar-item[data-p-active='true'] {\n    animation: none;\n  }\n  :host ::ng-deep .p-tab.dh-sidebar-item.p-tab-active::after,\n  :host ::ng-deep .p-tab.dh-sidebar-item[aria-selected='true']::after,\n  :host ::ng-deep .p-tab.dh-sidebar-item[data-p-active='true']::after {\n    animation: none;\n  }\n}\n\n/* \u2500\u2500 Mobile: horizontal tabs \u2500\u2500 */\n@media (max-width: 900px) {\n  .dh-sidebar-layout {\n    grid-template-columns: 1fr;\n  }\n\n  :host ::ng-deep .dh-sidebar-nav.p-tablist {\n    flex-direction: row;\n    overflow-x: auto;\n    padding: 0.65rem;\n    border-radius: 14px;\n    position: static;\n  }\n\n  :host ::ng-deep .dh-sidebar-nav .p-tablist-tab-list {\n    flex-direction: row !important;\n    gap: 0.35rem;\n  }\n\n  :host ::ng-deep .p-tab.dh-sidebar-item {\n    flex: 0 0 auto;\n    padding: 0.65rem 1rem;\n  }\n\n  .dh-sidebar-hint {\n    display: none;\n  }\n\n  :host ::ng-deep .p-tab.dh-sidebar-item.p-tab-active,\n  :host ::ng-deep .p-tab.dh-sidebar-item[aria-selected='true'],\n  :host ::ng-deep .p-tab.dh-sidebar-item[data-p-active='true'] {\n    transform: translateY(-2px);\n  }\n\n  :host ::ng-deep .p-tab.dh-sidebar-item.p-tab-active::after,\n  :host ::ng-deep .p-tab.dh-sidebar-item[aria-selected='true']::after,\n  :host ::ng-deep .p-tab.dh-sidebar-item[data-p-active='true']::after {\n    left: 15%;\n    right: 15%;\n    top: auto;\n    bottom: 0;\n    width: auto;\n    height: 3px;\n    border-radius: 4px 4px 0 0;\n    background: linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.2) 0%,\n      rgba(59, 130, 246, 0.95) 30%,\n      rgba(139, 92, 246, 0.95) 70%,\n      rgba(255, 255, 255, 0.2) 100%\n    );\n    background-size: 300% 100%;\n    animation: dh-side-strip-h 3s linear infinite;\n  }\n}\n\n@keyframes dh-side-strip-h {\n  0% { background-position: 0% 100%; }\n  100% { background-position: 300% 100%; }\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   BAND PREVIEW BAR \u2014 visual representation of score band ranges\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.band-preview {\n  margin-bottom: $space-5;\n  padding: $space-4;\n  background: rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(12px);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-xl;\n}\n\n.band-bar {\n  display: flex;\n  height: 36px;\n  border-radius: $radius-md;\n  overflow: hidden;\n  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.08);\n}\n\n.band-segment {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 0;\n  transition: width 0.4s ease;\n  position: relative;\n  cursor: default;\n\n  &:not(:last-child) {\n    border-right: 2px solid rgba(255, 255, 255, 0.5);\n  }\n}\n\n.band-segment-label {\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: #ffffff;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding: 0 4px;\n}\n\n.band-bar-legend {\n  display: flex;\n  justify-content: space-between;\n  padding: $space-1 $space-1 0;\n  font-size: $font-size-xs;\n  color: $gray-400;\n  font-weight: 500;\n  font-variant-numeric: tabular-nums;\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DealHealthSettingsPage, { className: "DealHealthSettingsPage", filePath: "src/app/crm/features/settings/pages/deal-health-settings.page.ts", lineNumber: 53 }); })();
