import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, HostListener, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { IftaLabelModule } from 'primeng/iftalabel';
import { finalize } from 'rxjs';
import { CrmLandingService } from './services/crm-landing.service';
import { AppToastService } from '../../core/app-toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/router";
import * as i3 from "primeng/button";
import * as i4 from "primeng/api";
import * as i5 from "@angular/forms";
import * as i6 from "primeng/dialog";
import * as i7 from "primeng/inputtext";
import * as i8 from "primeng/select";
import * as i9 from "primeng/datepicker";
import * as i10 from "primeng/textarea";
import * as i11 from "primeng/iftalabel";
const _c0 = () => ({ width: "min(860px, 96vw)" });
const _c1 = () => ({ width: "min(560px, 92vw)" });
function LandingPage_span_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 158);
    i0.ɵɵtext(1);
    i0.ɵɵelement(2, "br");
    i0.ɵɵelementStart(3, "span", 159);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const slide_r1 = ctx.$implicit;
    const i_r2 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("hero__title-text--active", i_r2 === ctx_r2.activeHeroPreview);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", slide_r1.title);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(slide_r1.titleAccent);
} }
function LandingPage_p_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 160);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const slide_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("hero__subtitle--active", i_r5 === ctx_r2.activeHeroPreview);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", slide_r4.subtitle, " ");
} }
function LandingPage_div_88_ng_container_2_article_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 171)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r6 = ctx.$implicit;
    i0.ɵɵclassProp("preview-kpi-stage--rose", row_r6.tone === "rose")("preview-kpi-stage--amber", row_r6.tone === "amber")("preview-kpi-stage--cyan", row_r6.tone === "cyan")("preview-kpi-stage--violet", row_r6.tone === "violet");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r6.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r6.stage);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", row_r6.deals, " deals");
} }
function LandingPage_div_88_ng_container_2_article_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article")(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const metric_r7 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(metric_r7.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(metric_r7.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(metric_r7.delta);
} }
function LandingPage_div_88_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 164)(2, "div", 165)(3, "div")(4, "span", 166);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h3");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 167)(9, "strong");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "div", 168);
    i0.ɵɵtemplate(14, LandingPage_div_88_ng_container_2_article_14_Template, 7, 11, "article", 169);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 170);
    i0.ɵɵtemplate(16, LandingPage_div_88_ng_container_2_article_16_Template, 7, 3, "article", 115);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const slide_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.asPipelineSlide(slide_r8).boardTitle);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.asPipelineSlide(slide_r8).boardSubtitle);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.asPipelineSlide(slide_r8).headlineMetric.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r2.asPipelineSlide(slide_r8).headlineMetric.delta, " ", ctx_r2.asPipelineSlide(slide_r8).headlineMetric.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.asPipelineSlide(slide_r8).stageSummary);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.asPipelineSlide(slide_r8).metrics);
} }
function LandingPage_div_88_ng_container_3_article_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 178)(1, "div", 179);
    i0.ɵɵelement(2, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const factor_r9 = ctx.$implicit;
    i0.ɵɵclassProp("preview-factor--strong", factor_r9.tone === "strong")("preview-factor--watch", factor_r9.tone === "watch");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("height", factor_r9.fill, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(factor_r9.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(factor_r9.value);
} }
function LandingPage_div_88_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 172)(2, "div", 173)(3, "div", 174)(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "AI score");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 175)(9, "span", 166);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "h3");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "div", 176);
    i0.ɵɵtemplate(16, LandingPage_div_88_ng_container_3_article_16_Template, 7, 8, "article", 177);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const slide_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.asLeadSlide(slide_r8).score);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.asLeadSlide(slide_r8).profileRole);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.asLeadSlide(slide_r8).profileName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.asLeadSlide(slide_r8).readiness);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.asLeadSlide(slide_r8).factors);
} }
function LandingPage_div_88_ng_container_4_article_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article")(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r10.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r10.meta);
} }
function LandingPage_div_88_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 180)(2, "div", 181)(3, "div")(4, "span", 166);
    i0.ɵɵtext(5, "Deal desk");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h3");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 182);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 183)(13, "article")(14, "span");
    i0.ɵɵtext(15, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "strong");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "article")(19, "span");
    i0.ɵɵtext(20, "Health");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "strong");
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "article")(24, "span");
    i0.ɵɵtext(25, "Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "strong");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "article")(29, "span");
    i0.ɵɵtext(30, "Approval");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "strong");
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(33, "div", 184)(34, "div", 185)(35, "span");
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "strong");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "div", 186);
    i0.ɵɵelement(40, "span");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "div", 187)(42, "span");
    i0.ɵɵtext(43, "Next best action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "strong");
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "div", 188);
    i0.ɵɵtemplate(47, LandingPage_div_88_ng_container_4_article_47_Template, 5, 2, "article", 115);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const slide_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.asDealSlide(slide_r8).dealName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.asDealSlide(slide_r8).riskNote);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.asDealSlide(slide_r8).dealStage);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.asDealSlide(slide_r8).dealAmount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.asDealSlide(slide_r8).dealHealth);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.asDealSlide(slide_r8).dealOwner);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.asDealSlide(slide_r8).approvalStatus);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.asDealSlide(slide_r8).confidenceLabel);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r2.asDealSlide(slide_r8).confidence, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r2.asDealSlide(slide_r8).confidence, "%");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.asDealSlide(slide_r8).nextAction);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.asDealSlide(slide_r8).timeline);
} }
function LandingPage_div_88_ng_container_5_article_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article")(1, "div", 196);
    i0.ɵɵelement(2, "i", 197);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const stat_r11 = ctx.$implicit;
    i0.ɵɵclassProp("preview-property-metric--blue", stat_r11.tone === "blue")("preview-property-metric--green", stat_r11.tone === "green")("preview-property-metric--amber", stat_r11.tone === "amber")("preview-property-metric--violet", stat_r11.tone === "violet");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(stat_r11.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r11.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r11.value);
} }
function LandingPage_div_88_ng_container_5_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 197);
    i0.ɵɵelementStart(2, "em");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r12 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵclassMap(item_r12.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r12.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r12.value);
} }
function LandingPage_div_88_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 189)(2, "div", 190)(3, "div")(4, "span", 166);
    i0.ɵɵtext(5, "Realtor workspace");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h3");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 191);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 192);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 193);
    i0.ɵɵtemplate(13, LandingPage_div_88_ng_container_5_article_13_Template, 7, 12, "article", 194);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 195);
    i0.ɵɵtemplate(15, LandingPage_div_88_ng_container_5_span_15_Template, 6, 4, "span", 115);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const slide_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r2.asPropertySlide(slide_r8).propertyName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.asPropertySlide(slide_r8).propertyStatus);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.asPropertySlide(slide_r8).propertyPrice);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.asPropertySlide(slide_r8).propertyStats);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.asPropertySlide(slide_r8).propertyFeed);
} }
function LandingPage_div_88_ng_container_6_article_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article")(1, "div")(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const metric_r13 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(metric_r13.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(metric_r13.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(metric_r13.delta);
} }
function LandingPage_div_88_ng_container_6_article_11_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const chip_r14 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(chip_r14);
} }
function LandingPage_div_88_ng_container_6_article_11_button_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 211);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(action_r15.secondaryAction);
} }
function LandingPage_div_88_ng_container_6_article_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 203)(1, "div", 204)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 205)(7, "div", 206)(8, "h4");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 207);
    i0.ɵɵtemplate(13, LandingPage_div_88_ng_container_6_article_11_span_13_Template, 2, 1, "span", 115);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 208)(15, "button", 209);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, LandingPage_div_88_ng_container_6_article_11_button_17_Template, 2, 1, "button", 210);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const action_r15 = ctx.$implicit;
    i0.ɵɵclassProp("preview-orchestration-card--critical", action_r15.severity === "critical")("preview-orchestration-card--important", action_r15.severity === "important")("preview-orchestration-card--low", action_r15.severity === "low");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(action_r15.rank);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(action_r15.severity);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(action_r15.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(action_r15.summary);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", action_r15.chips);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(action_r15.primaryAction);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", action_r15.secondaryAction);
} }
function LandingPage_div_88_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 198)(2, "div", 199)(3, "div")(4, "span", 166);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "h3");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "div", 200);
    i0.ɵɵtemplate(9, LandingPage_div_88_ng_container_6_article_9_Template, 8, 3, "article", 115);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 201);
    i0.ɵɵtemplate(11, LandingPage_div_88_ng_container_6_article_11_Template, 18, 13, "article", 202);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const slide_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.asOrchestrationSlide(slide_r8).boardTitle);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.asOrchestrationSlide(slide_r8).boardSubtitle);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.asOrchestrationSlide(slide_r8).topMetrics);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.asOrchestrationSlide(slide_r8).actions);
} }
function LandingPage_div_88_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 161)(1, "div", 162);
    i0.ɵɵtemplate(2, LandingPage_div_88_ng_container_2_Template, 17, 7, "ng-container", 163)(3, LandingPage_div_88_ng_container_3_Template, 17, 5, "ng-container", 163)(4, LandingPage_div_88_ng_container_4_Template, 48, 13, "ng-container", 163)(5, LandingPage_div_88_ng_container_5_Template, 16, 5, "ng-container", 163)(6, LandingPage_div_88_ng_container_6_Template, 12, 4, "ng-container", 163);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const slide_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitch", slide_r8.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "pipeline");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "lead");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "deal");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "property");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", "orchestration");
} }
function LandingPage_button_90_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 212);
    i0.ɵɵlistener("click", function LandingPage_button_90_Template_button_click_0_listener() { const i_r17 = i0.ɵɵrestoreView(_r16).index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToHeroPreview(i_r17)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const slide_r18 = ctx.$implicit;
    const i_r17 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", i_r17 === ctx_r2.activeHeroPreview);
    i0.ɵɵattribute("aria-label", "View " + slide_r18.label);
} }
function LandingPage_div_103_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 213)(1, "div", 214);
    i0.ɵɵelement(2, "i", 215);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 216)(4, "span", 217);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 218);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 219);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const stat_r19 = ctx.$implicit;
    const i_r20 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("animation-delay", i_r20 * 0.1 + "s");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", "stat-item__icon--" + stat_r19.color);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", stat_r19.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate3("", stat_r19.prefix, "", ctx_r2.animatedStatValues[i_r20], "", stat_r19.suffix);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r19.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r19.description);
} }
function LandingPage_article_114_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 220)(1, "h3");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const pillar_r21 = ctx.$implicit;
    const i_r22 = ctx.index;
    i0.ɵɵstyleProp("animation-delay", i_r22 * 0.1 + "s");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(pillar_r21.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(pillar_r21.description);
} }
function LandingPage_article_128_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 221);
    i0.ɵɵlistener("click", function LandingPage_article_128_Template_article_click_0_listener() { const i_r24 = i0.ɵɵrestoreView(_r23).index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToJourneyStep(i_r24)); });
    i0.ɵɵelementStart(1, "span", 222);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 223);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "small");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const step_r25 = ctx.$implicit;
    const i_r24 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("journey-step--active", i_r24 === ctx_r2.activeJourneyStep);
    i0.ɵɵattribute("data-index", i_r24);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("0", i_r24 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r25.eyebrow);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r25.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r25.summary);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r25.outcome);
} }
function LandingPage_div_131_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 237);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const signal_r26 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(signal_r26);
} }
function LandingPage_div_131_article_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 238)(1, "span", 239);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const metric_r27 = ctx.$implicit;
    i0.ɵɵclassProp("journey-metric--strong", metric_r27.tone === "strong")("journey-metric--risk", metric_r27.tone === "risk");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(metric_r27.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(metric_r27.value);
} }
function LandingPage_div_131_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 224)(1, "div", 225)(2, "span", 226);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 227);
    i0.ɵɵtext(5, "Lead intelligence in motion");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 228)(7, "div", 229)(8, "h3");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 230)(13, "span", 231);
    i0.ɵɵtext(14, "Detected signals");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 232);
    i0.ɵɵtemplate(16, LandingPage_div_131_span_16_Template, 2, 1, "span", 233);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 234);
    i0.ɵɵtemplate(18, LandingPage_div_131_article_18_Template, 5, 6, "article", 235);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 236)(20, "span", 231);
    i0.ɵɵtext(21, "Why it matters");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const step_r28 = ctx.$implicit;
    const i_r29 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("journey-panel--active", i_r29 === ctx_r2.activeJourneyStep);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(step_r28.eyebrow);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(step_r28.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r28.summary);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", step_r28.signals);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", step_r28.metrics);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(step_r28.outcome);
} }
function LandingPage_button_133_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 240);
    i0.ɵɵlistener("click", function LandingPage_button_133_Template_button_click_0_listener() { const i_r31 = i0.ɵɵrestoreView(_r30).index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToJourneyStep(i_r31)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r32 = ctx.$implicit;
    const i_r31 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("journey__dot--active", i_r31 === ctx_r2.activeJourneyStep);
    i0.ɵɵattribute("aria-label", "View " + step_r32.eyebrow + " step");
} }
function LandingPage_div_204_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 241);
    i0.ɵɵlistener("mousemove", function LandingPage_div_204_Template_div_mousemove_0_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onCardMouseMove($event)); })("mouseleave", function LandingPage_div_204_Template_div_mouseleave_0_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onCardMouseLeave($event)); });
    i0.ɵɵelementStart(1, "div", 242);
    i0.ɵɵelement(2, "i", 215);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const feat_r34 = ctx.$implicit;
    const i_r35 = ctx.index;
    i0.ɵɵstyleProp("animation-delay", i_r35 * 0.08 + "s");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", "feature-card__icon--" + feat_r34.color);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", feat_r34.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(feat_r34.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(feat_r34.description);
} }
function LandingPage_article_215_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 243)(1, "span", 244);
    i0.ɵɵtext(2, "Operational proof");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 245)(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const signal_r36 = ctx.$implicit;
    const i_r37 = ctx.index;
    i0.ɵɵstyleProp("animation-delay", i_r37 * 0.08 + "s");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(signal_r36.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(signal_r36.description);
} }
function LandingPage_div_223_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 246)(1, "div", 247);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const step_r38 = ctx.$implicit;
    const i_r39 = ctx.index;
    i0.ɵɵstyleProp("animation-delay", i_r39 * 0.12 + "s");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i_r39 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r38.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r38.description);
} }
function LandingPage_article_234_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 248)(1, "h3");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r40 = ctx.$implicit;
    const i_r41 = ctx.index;
    i0.ɵɵstyleProp("animation-delay", i_r41 * 0.08 + "s");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r40.question);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r40.answer);
} }
function LandingPage_li_242_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵelement(1, "i", 30);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r42 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", item_r42);
} }
function LandingPage_ng_template_298_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 249)(1, "div")(2, "div", 21)(3, "span", 22);
    i0.ɵɵtext(4, "North Edge");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 23);
    i0.ɵɵtext(6, "CRM");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "h3");
    i0.ɵɵtext(8, "Schedule a Demo");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p");
    i0.ɵɵtext(10, "Share your context and preferred time. Our team will confirm your session.");
    i0.ɵɵelementEnd()()();
} }
function LandingPage_small_306_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 250);
    i0.ɵɵtext(1, "Full name is required.");
    i0.ɵɵelementEnd();
} }
function LandingPage_small_312_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 250);
    i0.ɵɵtext(1, "Work email is required.");
    i0.ɵɵelementEnd();
} }
function LandingPage_small_313_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 250);
    i0.ɵɵtext(1, "Enter a valid email address.");
    i0.ɵɵelementEnd();
} }
function LandingPage_small_319_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 250);
    i0.ɵɵtext(1, "Company is required.");
    i0.ɵɵelementEnd();
} }
function LandingPage_small_325_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 250);
    i0.ɵɵtext(1, "Role or title is required.");
    i0.ɵɵelementEnd();
} }
function LandingPage_small_331_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 250);
    i0.ɵɵtext(1, "Phone is required.");
    i0.ɵɵelementEnd();
} }
function LandingPage_small_337_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 250);
    i0.ɵɵtext(1, "Select a team size.");
    i0.ɵɵelementEnd();
} }
function LandingPage_small_343_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 250);
    i0.ɵɵtext(1, "Preferred date/time is required.");
    i0.ɵɵelementEnd();
} }
function LandingPage_small_344_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 250);
    i0.ɵɵtext(1, "Select a date from the next Toronto day onward.");
    i0.ɵɵelementEnd();
} }
function LandingPage_small_345_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 250);
    i0.ɵɵtext(1, "Select a time between 9:00 AM and 5:00 PM Toronto time.");
    i0.ɵɵelementEnd();
} }
function LandingPage_small_351_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 250);
    i0.ɵɵtext(1, "Timezone is required.");
    i0.ɵɵelementEnd();
} }
function LandingPage_small_352_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 250);
    i0.ɵɵtext(1, "Select a valid timezone.");
    i0.ɵɵelementEnd();
} }
function LandingPage_small_358_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 250);
    i0.ɵɵtext(1, "Please share your use case.");
    i0.ɵɵelementEnd();
} }
function LandingPage_ng_template_367_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 251)(1, "div", 21)(2, "span", 22);
    i0.ɵɵtext(3, "North Edge");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 23);
    i0.ɵɵtext(5, "CRM");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "h3");
    i0.ɵɵtext(7, "Thanks for contacting us");
    i0.ɵɵelementEnd()();
} }
function LandingPage_ng_template_373_Template(rf, ctx) { if (rf & 1) {
    const _r43 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 252);
    i0.ɵɵlistener("click", function LandingPage_ng_template_373_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r43); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.showDemoSuccess = false); });
    i0.ɵɵelementEnd();
} }
export class LandingPage {
    torontoZone = 'America/Toronto';
    heroPreviewIntervalMs = 4200;
    svc = inject(CrmLandingService);
    router = inject(Router);
    fb = inject(FormBuilder);
    cdr = inject(ChangeDetectorRef);
    toastService = inject(AppToastService);
    destroyRef = inject(DestroyRef);
    document = inject(DOCUMENT);
    elRef = inject(ElementRef);
    currentYear = new Date().getFullYear();
    showDemoForm = false;
    showDemoSuccess = false;
    submittingDemo = false;
    demoSubmitted = false;
    minDemoDateTime = new Date();
    isScrolled = false;
    mobileMenuOpen = false;
    activeHeroPreview = 0;
    heroPreviewSlides = [
        {
            type: 'pipeline',
            label: 'Pipeline Command',
            title: 'Close More Deals with',
            titleAccent: 'AI-Powered Pipeline Intelligence',
            subtitle: 'Sales pipeline by stage with real top-line metrics, commercial movement, and zero reliance on sliced mockup images.',
            boardTitle: 'Pipeline Overview',
            boardSubtitle: 'Sales pipeline by stage',
            headlineMetric: { label: 'This month', value: '$2.4M', delta: '+18.8%' },
            stageSummary: [
                { stage: 'Prospecting', value: '$820K', deals: 58, tone: 'rose' },
                { stage: 'Qualified', value: '$1.2M', deals: 42, tone: 'amber' },
                { stage: 'Proposal', value: '$300K', deals: 18, tone: 'cyan' },
                { stage: 'Negotiation', value: '$30K', deals: 6, tone: 'violet' }
            ],
            metrics: [
                { label: 'New Deals', value: '24', delta: '+9.2%' },
                { label: 'Conversion Rate', value: '58.5%', delta: '+5.7%' },
                { label: 'Avg. Deal Size', value: '551.2K', delta: '+12.4%' },
                { label: 'Forecast Confidence', value: '82%', delta: 'Evidence-backed' }
            ]
        },
        {
            type: 'lead',
            label: 'Lead Intelligence',
            title: 'Focus on Leads that',
            titleAccent: 'Actually Convert',
            subtitle: 'AI scoring, stakeholder engagement, and evidence quality stay in one narrative so reps know what to work next.',
            score: 84,
            profileName: 'Sterling Harbour Realty',
            profileRole: 'Brokerage prospect',
            readiness: 'Ready for conversion',
            factors: [
                { label: 'Conversation signal', value: 'Strong', tone: 'strong', fill: 84 },
                { label: 'Budget proof', value: 'Partial', tone: 'watch', fill: 46 },
                { label: 'Stakeholders engaged', value: '4', tone: 'supporting', fill: 72 }
            ]
        },
        {
            type: 'deal',
            label: 'Deal Execution',
            title: 'Track Win Rates with',
            titleAccent: 'Precision Analytics',
            subtitle: 'Deals move with visible owner, confidence, risk, and next-best-action instead of vague pipeline optimism.',
            dealName: 'South Bay Tower Portfolio',
            dealAmount: '$1.24M',
            dealStage: 'Conditional',
            dealHealth: 'Manager attention',
            dealOwner: 'Robert Lambke',
            confidence: 82,
            confidenceLabel: 'Forecast confidence',
            nextAction: 'Review financing condition before buyer call',
            approvalStatus: '3 approvals complete',
            riskNote: 'One financing document outstanding before closing review',
            timeline: [
                { label: 'Offer submitted', meta: 'Today, 10:20' },
                { label: 'Legal review complete', meta: 'Yesterday' },
                { label: 'Pricing approved', meta: '2 days ago' }
            ]
        },
        {
            type: 'orchestration',
            label: 'AI Execution',
            title: 'Automate Actions with',
            titleAccent: 'AI Execution Orchestration',
            subtitle: 'Priority-driven action queues resolve sales risk with clear severity, review paths, and auto-execute options inside the CRM.',
            boardTitle: 'AI Execution Orchestration',
            boardSubtitle: 'Priority-driven AI actions to resolve sales risks',
            topMetrics: [
                { label: 'AI-Risk Deals', value: '31', delta: '14 today', icon: 'pi pi-chart-line' },
                { label: 'Lead SLA Breaches', value: '2', delta: 'now', icon: 'pi pi-shield' },
                { label: 'Pending Approvals', value: '1', delta: 'live', icon: 'pi pi-verified' }
            ],
            actions: [
                {
                    severity: 'critical',
                    rank: '#100',
                    title: 'Reactivate stale opportunities',
                    summary: 'No activity for 7 days on deal worth 3320K',
                    chips: ['AI Insight', 'Impact High', 'Urgency Immediate', 'Risk High'],
                    primaryAction: 'Review',
                    secondaryAction: 'Auto resolve'
                },
                {
                    severity: 'important',
                    rank: '#88',
                    title: 'Clear overdue activity backlog',
                    summary: '6 activities overdue across 5 deals',
                    chips: ['AI Insight', 'Impact High', 'Urgency Immediate', 'Risk Medium'],
                    primaryAction: 'Review'
                },
                {
                    severity: 'low',
                    rank: '#28',
                    title: 'Recover breached first-touch SLAs',
                    summary: '3 leads missing first response window',
                    chips: ['AI Insight', 'Impact Low', 'Urgency Planned', 'Risk Low'],
                    primaryAction: 'Execute'
                }
            ]
        },
        {
            type: 'property',
            label: 'Property Workspace',
            title: 'Operate Listings with',
            titleAccent: 'Connected Property Execution',
            subtitle: 'Property, deal, document, showing, and alert data live in one CRM workspace that managers can actually review.',
            propertyName: '12 Lakeview Crescent',
            propertyStatus: 'Active',
            propertyPrice: '$829,000',
            propertyStats: [
                { label: 'Showings', value: '11', icon: 'pi pi-calendar', tone: 'blue' },
                { label: 'Documents', value: '6', icon: 'pi pi-file', tone: 'amber' },
                { label: 'Alerts', value: '2', icon: 'pi pi-bell', tone: 'violet' },
                { label: 'Qualified buyers', value: '4', icon: 'pi pi-users', tone: 'green' }
            ],
            propertyFeed: [
                { label: 'Price movement', value: 'Reduced 2.1% this week', icon: 'pi pi-chart-line' },
                { label: 'Next showing', value: 'Saturday, 11:00 AM', icon: 'pi pi-clock' },
                { label: 'Document status', value: 'Listing agreement signed', icon: 'pi pi-check-circle' }
            ]
        }
    ];
    timezoneOptions = this.buildTimeZoneOptions();
    detectedTimeZone = this.detectBrowserTimeZone();
    heroPreviewIntervalId = null;
    lastHeroPreviewWheelAt = 0;
    activeJourneyStep = 0;
    journeyObserver = null;
    features = [
        { icon: 'pi-check-square', color: 'primary', title: 'Evidence-Based Qualification', description: 'CQVS-style qualification tracks factor scores, evidence quality, and proof gaps instead of relying on rep optimism alone.' },
        { icon: 'pi-comments', color: 'cyan', title: 'Conversation-Driven Readiness', description: 'The CRM combines email, call, meeting, and activity signals into conversation score and conversion readiness.' },
        { icon: 'pi-sitemap', color: 'green', title: 'Governed Conversion Decisions', description: 'Lead conversion and deal movement can be challenged, coached, approved, or blocked with visible reasons.' },
        { icon: 'pi-chart-line', color: 'purple', title: 'Truth-Based Pipeline Visibility', description: 'Managers see pipeline backed by evidence, health gaps, and readiness signals instead of superficial stage reporting.' },
        { icon: 'pi-file-edit', color: 'orange', title: 'Report Workspace and Library', description: 'Publish, filter, and govern reports through a dedicated workspace with CRM-safe metadata and report server integration.' },
        { icon: 'pi-sliders-h', color: 'slate', title: 'CRM Vertical Presets with Tenant Control', description: 'Start from shared CRM vertical presets and let each customer customize catalogs, workflows, branding, and reporting without product forks.' }
    ];
    stats = [
        {
            icon: 'pi-chart-line',
            color: 'azure',
            prefix: '',
            value: 82,
            suffix: '%',
            label: 'Forecast confidence',
            description: 'Evidence-backed pipeline confidence instead of stage optimism.'
        },
        {
            icon: 'pi-home',
            color: 'emerald',
            prefix: '',
            value: 11,
            suffix: '',
            label: 'Showings scheduled',
            description: 'Live listing activity, buyer follow-up, and property momentum in one workspace.'
        },
        {
            icon: 'pi-verified',
            color: 'amber',
            prefix: '',
            value: 3,
            suffix: '',
            label: 'Deals need review',
            description: 'Manager approvals, blocked decisions, and risk queues stay visible.'
        },
        {
            icon: 'pi-file-edit',
            color: 'rose',
            prefix: '',
            value: 6,
            suffix: '',
            label: 'Listing documents tracked',
            description: 'Media, agreements, and transaction paperwork stay attached to the record.'
        }
    ];
    animatedStatValues = [0, 0, 0, 0];
    statsAnimated = false;
    scrollObserver = null;
    howItWorks = [
        { title: 'Stand Up Your Workspace', description: 'Configure your tenant, branding, catalogs, workflows, and report library around the way your team actually sells.' },
        { title: 'Qualify with Evidence', description: 'Capture CQVS factors, conversation signals, and proof quality so readiness is visible before the team commits pipeline energy.' },
        { title: 'Operate with Governance', description: 'Convert, approve, report, and coach from one CRM that shows why a lead or deal is strong, weak, blocked, or ready.' }
    ];
    proofPillars = [
        {
            title: 'Generic CRMs store records',
            description: 'North Edge CRM evaluates readiness, evidence, and conversation quality before teams act.'
        },
        {
            title: 'Qualification is not just a score',
            description: 'CQVS factors, evidence notes, readiness, and coaching gaps stay visible across the lifecycle.'
        },
        {
            title: 'Managers get defensible pipeline truth',
            description: 'Pipeline health, coaching queues, approvals, and reporting are tied to the same operating signals.'
        }
    ];
    journeySteps = [
        {
            eyebrow: 'Signal',
            title: 'Conversations become evidence, not just activity',
            summary: 'Inbound replies, discovery notes, and stakeholder participation are turned into visible buyer signals instead of staying buried in the thread.',
            outcome: 'The rep sees what is real, what is missing, and whether momentum is healthy.',
            signals: ['Budget signal detected', 'Finance stakeholder replied', 'Timeline still unclear'],
            metrics: [
                { label: 'Conversation score', value: '78', tone: 'strong' },
                { label: 'Stakeholders engaged', value: '3', tone: 'supporting' },
                { label: 'Days since inbound reply', value: '1', tone: 'supporting' }
            ]
        },
        {
            eyebrow: 'Decision',
            title: 'CQVS qualification shows what is validated versus assumed',
            summary: 'Qualification factors stay tied to evidence quality, so the team can tell whether a deal is truly ready or only optimistic on paper.',
            outcome: 'Managers can challenge weak assumptions before the pipeline absorbs bad opportunities.',
            signals: ['Budget only partially validated', 'Economic buyer identified', 'Problem severity confirmed'],
            metrics: [
                { label: 'CQVS score', value: '64', tone: 'supporting' },
                { label: 'Validated factors', value: '4/6', tone: 'supporting' },
                { label: 'Primary gap', value: 'Budget proof', tone: 'risk' }
            ]
        },
        {
            eyebrow: 'Outcome',
            title: 'Conversion readiness turns evidence into the next action',
            summary: 'The CRM combines qualification quality and conversation strength into one clear operating decision: ready, monitor, coach, or at risk.',
            outcome: 'The rep gets one next action, and the manager gets a defensible reason if review is needed.',
            signals: ['Readiness moved from Coach to Ready', 'Manager review no longer required', 'Convert lead now recommended'],
            metrics: [
                { label: 'Readiness', value: 'Ready', tone: 'strong' },
                { label: 'Manager review', value: 'Not required', tone: 'supporting' },
                { label: 'Next action', value: 'Convert lead', tone: 'strong' }
            ]
        }
    ];
    commercialNotes = [
        'Unlimited internal users under one commercial model',
        'Tenant branding, workflow, and report customization included',
        'Hosted deployment and implementation scope agreed during demo',
        'Ongoing support and rollout model defined per customer engagement'
    ];
    trustSignals = [
        {
            title: 'Implementation is scoped before go-live',
            description: 'Demo qualification, deployment path, rollout sequencing, report publishing, and workflow governance are agreed before the project starts.'
        },
        {
            title: 'Governance is built into the operating model',
            description: 'Approvals, readiness, report publishing, and workspace controls are part of the platform, not layered on after the fact.'
        },
        {
            title: 'Each tenant keeps control without a product fork',
            description: 'Vertical presets, configurable catalogs, branding, workflows, and reports stay tenant-specific while the product remains upgradeable.'
        }
    ];
    demoExpectations = [
        'Map your current lead, deal, and approval flow',
        'Review where CQVS, conversation score, and readiness fit your process',
        'Agree the rollout scope, report set, and implementation model',
        'Confirm whether a shared industry preset or deeper tenant tailoring is the better fit'
    ];
    commercialFaq = [
        {
            question: 'What happens in the demo?',
            answer: 'The demo is a working-product session, not a generic pitch. We review your current process, show the signal-to-decision workflow live, and leave with a scoped rollout direction.'
        },
        {
            question: 'Is this a generic CRM with a few custom screens?',
            answer: 'No. The operating model is different: evidence-based qualification, conversation-driven readiness, governed approvals, and report workspace administration are all part of the product.'
        },
        {
            question: 'Can different customers in the same industry still customize it?',
            answer: 'Yes. The product is built around shared industry presets with tenant-level configuration for workflows, catalogs, reports, branding, and operational vocabulary.'
        },
        {
            question: 'How is pricing handled if the model is one-time payment?',
            answer: 'Commercial scope is agreed during the demo based on deployment, rollout, support, and hosting expectations. The point is to avoid unpredictable per-seat expansion, not to hide scope.'
        }
    ];
    teamSizeOptions = [
        { label: '1-10', value: '1-10' },
        { label: '11-50', value: '11-50' },
        { label: '51-200', value: '51-200' },
        { label: '201-1000', value: '201-1000' },
        { label: '1000+', value: '1000+' }
    ];
    demoForm = this.fb.nonNullable.group({
        fullName: ['', [Validators.required, Validators.maxLength(120)]],
        workEmail: ['', [Validators.required, Validators.email, Validators.maxLength(160)]],
        company: ['', [Validators.required, Validators.maxLength(160)]],
        roleTitle: ['', [Validators.required, Validators.maxLength(120)]],
        phone: ['', [Validators.required, Validators.maxLength(40)]],
        teamSize: ['', [Validators.required]],
        preferredDateTime: [null, [Validators.required, this.torontoBusinessWindowValidator.bind(this)]],
        timezone: [this.detectedTimeZone, [Validators.required, Validators.maxLength(80)]],
        useCase: ['', [Validators.required, Validators.maxLength(1200)]]
    });
    ngOnInit() {
        this.startHeroPreviewCarousel();
        this.demoForm.controls.timezone.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            this.demoForm.controls.preferredDateTime.updateValueAndValidity({ emitEvent: false });
        });
    }
    ngAfterViewInit() {
        this.initScrollAnimations();
        this.initJourneyObserver();
    }
    onCardMouseMove(event) {
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        card.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
    }
    onCardMouseLeave(event) {
        const card = event.currentTarget;
        card.style.transform = '';
        card.style.removeProperty('--glow-x');
        card.style.removeProperty('--glow-y');
    }
    initScrollAnimations() {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined')
            return;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (prefersReducedMotion) {
                        entry.target.classList.add('scroll-visible');
                    }
                    else {
                        entry.target.classList.add('scroll-visible');
                    }
                    if (entry.target.classList.contains('stats-bar') && !this.statsAnimated) {
                        this.statsAnimated = true;
                        this.animateCounters();
                    }
                    this.scrollObserver?.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        const els = this.elRef.nativeElement.querySelectorAll('.scroll-animate');
        els.forEach((el) => this.scrollObserver.observe(el));
        this.destroyRef.onDestroy(() => this.scrollObserver?.disconnect());
    }
    animateCounters() {
        const duration = 1800;
        const start = performance.now();
        const targets = this.stats.map(s => s.value);
        const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            this.animatedStatValues = targets.map(t => {
                const v = ease * t;
                return t % 1 !== 0 ? Math.round(v * 10) / 10 : Math.round(v);
            });
            this.cdr.markForCheck();
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }
    onWindowScroll() {
        const scrolled = (this.document.defaultView?.scrollY ?? 0) > 40;
        if (scrolled !== this.isScrolled) {
            this.isScrolled = scrolled;
            this.cdr.markForCheck();
        }
    }
    scrollTo(id) {
        this.mobileMenuOpen = false;
        const el = this.document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onGetStarted() {
        console.log('Get Started');
    }
    asPipelineSlide(slide) {
        return slide;
    }
    asLeadSlide(slide) {
        return slide;
    }
    asDealSlide(slide) {
        return slide;
    }
    asPropertySlide(slide) {
        return slide;
    }
    asOrchestrationSlide(slide) {
        return slide;
    }
    onWatchDemo() {
        this.refreshMinDemoDateTime();
        this.showDemoForm = true;
        this.showDemoSuccess = false;
        this.demoSubmitted = false;
    }
    onSignIn() {
        void this.router.navigate(['/login']);
    }
    goToHeroPreview(index) {
        if (!this.heroPreviewSlides.length) {
            return;
        }
        this.activeHeroPreview = Math.max(0, Math.min(index, this.heroPreviewSlides.length - 1));
        this.cdr.markForCheck();
        this.restartHeroPreviewCarousel();
    }
    goToJourneyStep(index) {
        if (!this.journeySteps.length) {
            return;
        }
        const nextIndex = Math.max(0, Math.min(index, this.journeySteps.length - 1));
        this.activeJourneyStep = nextIndex;
        this.cdr.markForCheck();
        const target = this.elRef.nativeElement.querySelector(`.journey-step-anchor[data-index="${nextIndex}"]`);
        target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    advanceHeroPreview() {
        if (!this.heroPreviewSlides.length) {
            return;
        }
        this.activeHeroPreview = (this.activeHeroPreview + 1) % this.heroPreviewSlides.length;
        this.cdr.markForCheck();
        this.restartHeroPreviewCarousel();
    }
    onHeroPreviewWheel(event) {
        if (!this.heroPreviewSlides.length) {
            return;
        }
        const now = Date.now();
        if (now - this.lastHeroPreviewWheelAt < 280) {
            event.preventDefault();
            return;
        }
        const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
        if (delta === 0) {
            return;
        }
        event.preventDefault();
        this.lastHeroPreviewWheelAt = now;
        if (delta > 0) {
            this.advanceHeroPreview();
            return;
        }
        this.activeHeroPreview =
            (this.activeHeroPreview - 1 + this.heroPreviewSlides.length) % this.heroPreviewSlides.length;
        this.cdr.markForCheck();
        this.restartHeroPreviewCarousel();
    }
    closeDemoForm() {
        if (this.submittingDemo) {
            return;
        }
        this.showDemoForm = false;
    }
    submitDemoRequest() {
        if (this.submittingDemo) {
            return;
        }
        if (this.demoForm.invalid) {
            this.demoForm.markAllAsTouched();
            return;
        }
        this.submittingDemo = true;
        const payload = this.demoForm.getRawValue();
        this.svc
            .bookDemo({
            fullName: payload.fullName,
            workEmail: payload.workEmail,
            company: payload.company,
            roleTitle: payload.roleTitle,
            phone: payload.phone,
            teamSize: payload.teamSize,
            preferredDateTimeUtc: this.toUtcFromSelectedTimezone(payload.preferredDateTime, payload.timezone)?.toISOString() ?? '',
            preferredDate: this.formatDate(this.toUtcFromSelectedTimezone(payload.preferredDateTime, payload.timezone)),
            preferredTime: this.formatTimeSlot(this.toUtcFromSelectedTimezone(payload.preferredDateTime, payload.timezone)),
            timezone: payload.timezone,
            useCase: payload.useCase,
            landingPageUrl: typeof window !== 'undefined' ? window.location.href : null
        })
            .pipe(finalize(() => (this.submittingDemo = false)))
            .subscribe({
            next: () => {
                this.demoSubmitted = true;
                this.showDemoForm = false;
                this.showDemoSuccess = true;
                this.demoForm.reset({
                    fullName: '',
                    workEmail: '',
                    company: '',
                    roleTitle: '',
                    phone: '',
                    teamSize: '',
                    preferredDateTime: null,
                    timezone: this.detectedTimeZone,
                    useCase: ''
                });
                this.toastService.show('success', 'Thanks for contacting us. Our team will reach out shortly.');
            },
            error: () => {
                this.toastService.show('error', 'Unable to submit demo request. Please try again.');
            }
        });
    }
    fieldError(fieldName, code) {
        const control = this.demoForm.controls[fieldName];
        return control.touched && !!control.errors?.[code];
    }
    formatDate(value) {
        if (!value) {
            return '';
        }
        const year = value.getFullYear();
        const month = `${value.getMonth() + 1}`.padStart(2, '0');
        const day = `${value.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    formatTimeSlot(value) {
        if (!value) {
            return '';
        }
        const hours = `${value.getHours()}`.padStart(2, '0');
        const minutes = `${value.getMinutes()}`.padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    refreshMinDemoDateTime() {
        this.minDemoDateTime = new Date();
        this.demoForm.controls.preferredDateTime.updateValueAndValidity({ emitEvent: false });
    }
    torontoBusinessWindowValidator(control) {
        const value = control.value;
        if (!value) {
            return null;
        }
        const selectedTimeZone = control.parent?.get('timezone')?.value;
        if (!selectedTimeZone) {
            return { invalidTimezone: true };
        }
        const asUtc = this.toUtcFromSelectedTimezone(value, selectedTimeZone);
        if (!asUtc) {
            return { invalidTimezone: true };
        }
        const toronto = this.toTimeZoneParts(asUtc, this.torontoZone);
        const tomorrowToronto = this.toTorontoParts(new Date(Date.now() + 24 * 60 * 60 * 1000));
        const selectedDateKey = this.dateKey(toronto.year, toronto.month, toronto.day);
        const minDateKey = this.dateKey(tomorrowToronto.year, tomorrowToronto.month, tomorrowToronto.day);
        if (selectedDateKey < minDateKey) {
            return { minTorontoDay: true };
        }
        if (toronto.hour < 9 || toronto.hour >= 17) {
            return { outsideTorontoBusinessHours: true };
        }
        return null;
    }
    toUtcFromSelectedTimezone(localDateTime, timeZone) {
        if (!localDateTime || !timeZone) {
            return null;
        }
        const year = localDateTime.getFullYear();
        const month = localDateTime.getMonth() + 1;
        const day = localDateTime.getDate();
        const hour = localDateTime.getHours();
        const minute = localDateTime.getMinutes();
        const second = localDateTime.getSeconds();
        const utcMs = this.getUtcTimestampForZoneLocal(year, month, day, hour, minute, second, timeZone);
        return new Date(utcMs);
    }
    getUtcTimestampForZoneLocal(year, month, day, hour, minute, second, timeZone) {
        const naiveUtcMs = Date.UTC(year, month - 1, day, hour, minute, second);
        const offsetMs = this.getZoneOffsetMs(new Date(naiveUtcMs), timeZone);
        return naiveUtcMs - offsetMs;
    }
    getZoneOffsetMs(dateUtc, timeZone) {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hourCycle: 'h23'
        });
        const parts = formatter.formatToParts(dateUtc);
        const map = new Map(parts.map((p) => [p.type, p.value]));
        const y = Number(map.get('year'));
        const m = Number(map.get('month'));
        const d = Number(map.get('day'));
        const h = Number(map.get('hour'));
        const min = Number(map.get('minute'));
        const s = Number(map.get('second'));
        const asUtc = Date.UTC(y, m - 1, d, h, min, s);
        return asUtc - dateUtc.getTime();
    }
    toTorontoParts(date) {
        return this.toTimeZoneParts(date, this.torontoZone);
    }
    toTimeZoneParts(date, timeZone) {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23'
        });
        const parts = formatter.formatToParts(date);
        const map = new Map(parts.map((p) => [p.type, p.value]));
        return {
            year: Number(map.get('year')),
            month: Number(map.get('month')),
            day: Number(map.get('day')),
            hour: Number(map.get('hour')),
            minute: Number(map.get('minute'))
        };
    }
    dateKey(year, month, day) {
        return Number(`${year}${`${month}`.padStart(2, '0')}${`${day}`.padStart(2, '0')}`);
    }
    detectBrowserTimeZone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    }
    buildTimeZoneOptions() {
        const fallback = ['UTC', 'America/Toronto', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'Europe/London'];
        const supportedValuesOf = Intl.supportedValuesOf;
        const zones = typeof supportedValuesOf === 'function'
            ? supportedValuesOf('timeZone')
            : fallback;
        return zones.map((zone) => ({ label: zone, value: zone }));
    }
    startHeroPreviewCarousel() {
        if (typeof window === 'undefined' || this.heroPreviewSlides.length <= 1) {
            return;
        }
        this.stopHeroPreviewCarousel();
        this.heroPreviewIntervalId = window.setInterval(() => {
            this.activeHeroPreview = (this.activeHeroPreview + 1) % this.heroPreviewSlides.length;
            this.cdr.markForCheck();
        }, this.heroPreviewIntervalMs);
        this.destroyRef.onDestroy(() => this.stopHeroPreviewCarousel());
    }
    restartHeroPreviewCarousel() {
        this.startHeroPreviewCarousel();
    }
    initJourneyObserver() {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            return;
        }
        if (!window.matchMedia('(min-width: 1025px)').matches) {
            return;
        }
        const anchors = this.elRef.nativeElement.querySelectorAll('.journey-step-anchor');
        if (!anchors.length) {
            return;
        }
        this.journeyObserver?.disconnect();
        this.journeyObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!visible) {
                return;
            }
            const index = Number(visible.target.dataset['index'] ?? '0');
            if (!Number.isNaN(index) && index !== this.activeJourneyStep) {
                this.activeJourneyStep = index;
                this.cdr.markForCheck();
            }
        }, {
            root: null,
            threshold: [0.35, 0.6, 0.85],
            rootMargin: '-12% 0px -30% 0px'
        });
        anchors.forEach((anchor) => this.journeyObserver?.observe(anchor));
        this.destroyRef.onDestroy(() => this.journeyObserver?.disconnect());
    }
    stopHeroPreviewCarousel() {
        if (this.heroPreviewIntervalId !== null && typeof window !== 'undefined') {
            window.clearInterval(this.heroPreviewIntervalId);
            this.heroPreviewIntervalId = null;
        }
    }
    static ɵfac = function LandingPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LandingPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LandingPage, selectors: [["app-landing-page"]], hostBindings: function LandingPage_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("scroll", function LandingPage_scroll_HostBindingHandler() { return ctx.onWindowScroll(); }, i0.ɵɵresolveWindow);
        } }, decls: 374, vars: 66, consts: [[1, "landing"], ["aria-hidden", "true", 1, "landing-bg"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "grid-pattern"], [1, "noise-layer"], [1, "topbar"], [1, "topbar__inner", "shell"], [1, "topbar__brand", 3, "click"], ["src", "/assets/branding/logo-v2-light.png", "alt", "North Edge System", 1, "topbar__logo"], [1, "topbar__nav"], ["routerLink", "/platform"], [3, "click"], [1, "topbar__nav-actions"], ["type", "button", 1, "nav-btn", "nav-btn--ghost", 3, "click"], ["type", "button", 1, "nav-btn", "nav-btn--primary", 3, "click"], [1, "topbar__actions"], ["type", "button", "aria-label", "Toggle menu", 1, "topbar__hamburger", 3, "click"], ["id", "hero", 1, "hero", "shell"], [1, "hero__content"], [1, "hero-brand"], [1, "hero-brand-wordmark"], [1, "hero-brand-crm"], [1, "hero-proof-badge"], [1, "hero__title"], ["class", "hero__title-text", 3, "hero__title-text--active", 4, "ngFor", "ngForOf"], [1, "hero__subtitle-wrap"], ["class", "hero__subtitle", 3, "hero__subtitle--active", 4, "ngFor", "ngForOf"], [1, "hero-proof-points"], [1, "pi", "pi-check-circle"], [1, "hero-manifesto"], [1, "hero__cta"], ["type", "button", 1, "hero-btn", "hero-btn--primary", 3, "click"], [1, "pi", "pi-calendar"], ["routerLink", "/platform", 1, "hero-btn", "hero-btn--secondary"], [1, "pi", "pi-arrow-right"], ["type", "button", 1, "hero-btn", "hero-btn--ghost", 3, "click"], [1, "hero__cta-note"], [1, "hero__cta-kicker"], [1, "hero__visual"], [1, "kpi-carousel", 3, "wheel"], ["aria-hidden", "true", 1, "kpi-carousel__frame"], [1, "kpi-carousel__frame-pill"], [1, "kpi-carousel__frame-controls"], [1, "kpi-carousel__track"], ["class", "kpi-carousel__slide", 4, "ngFor", "ngForOf"], [1, "kpi-carousel__indicators"], ["type", "button", "class", "kpi-carousel__dot", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "kpi-carousel__label"], [1, "banner", "scroll-animate"], [1, "shell", "banner__inner"], [1, "banner__icon"], [1, "pi", "pi-unlock"], [1, "banner__title"], [1, "banner__subtitle"], [1, "stats-bar", "scroll-animate"], [1, "shell", "stats-bar__inner"], ["class", "stat-item", 3, "animation-delay", 4, "ngFor", "ngForOf"], ["aria-hidden", "true", 1, "gradient-bridge"], [1, "proof"], [1, "shell"], [1, "section-badge", "scroll-animate"], [1, "section-title", "scroll-animate"], [1, "section-subtitle", "scroll-animate"], [1, "proof__grid"], ["class", "proof-card scroll-animate", 3, "animation-delay", 4, "ngFor", "ngForOf"], [1, "journey"], [1, "shell", "journey__inner"], [1, "journey__content"], [1, "journey__steps", "scroll-animate"], [1, "journey__guide"], [1, "journey__story"], ["class", "journey-step journey-step-anchor", 3, "journey-step--active", "click", 4, "ngFor", "ngForOf"], [1, "journey__visual", "scroll-animate"], [1, "journey__visual-shell"], ["class", "journey-panel", 3, "journey-panel--active", 4, "ngFor", "ngForOf"], ["aria-hidden", "true", 1, "journey__indicators"], ["type", "button", "class", "journey__dot", 3, "journey__dot--active", "click", 4, "ngFor", "ngForOf"], ["id", "highlights", 1, "highlights"], [1, "shell", "highlights__layout"], [1, "highlights__showcase"], [1, "highlights__player-shell", "scroll-animate"], [1, "highlights__player-meta"], [1, "highlights__eyebrow"], [1, "highlights__duration"], ["src", i0.ɵɵtrustConstantResourceUrl `https://www.youtube.com/embed/mXb343GLxUI`, "title", "North Edge CRM Highlight Video", "loading", "lazy", "referrerpolicy", "strict-origin-when-cross-origin", "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", "allowfullscreen", "", 1, "highlights__player"], [1, "highlights__summary"], [1, "highlights__bullets"], ["aria-label", "Highlight resources", 1, "highlights__playlist", "scroll-animate"], [1, "highlights__playlist-item", "highlights__playlist-item--active"], [1, "highlights__playlist-index"], [1, "highlights__playlist-copy"], ["href", "https://www.youtube.com/watch?v=mXb343GLxUI", "target", "_blank", "rel", "noopener noreferrer", 1, "highlights__playlist-link"], [1, "highlights__resource-card"], [1, "highlights__resource-label"], ["id", "features", 1, "features"], [1, "features__grid"], ["class", "feature-card scroll-animate", 3, "animation-delay", "mousemove", "mouseleave", 4, "ngFor", "ngForOf"], [1, "trust"], [1, "shell", "trust__layout"], [1, "trust__intro"], [1, "trust__stream"], ["class", "trust-card scroll-animate", 3, "animation-delay", 4, "ngFor", "ngForOf"], ["id", "how-it-works", 1, "how-it-works"], [1, "how-it-works__steps"], ["class", "step-card scroll-animate", 3, "animation-delay", 4, "ngFor", "ngForOf"], [1, "commercial"], [1, "shell", "commercial__inner"], [1, "commercial__content"], [1, "commercial__faq-list"], ["class", "commercial-faq-row scroll-animate", 3, "animation-delay", 4, "ngFor", "ngForOf"], [1, "commercial__sidebar", "scroll-animate"], [1, "commercial-checklist"], [1, "commercial-checklist__eyebrow"], [4, "ngFor", "ngForOf"], [1, "final-cta", "scroll-animate"], [1, "shell", "final-cta__inner"], ["type", "button", 1, "hero-btn", "hero-btn--primary", "hero-btn--lg", 3, "click"], [1, "final-cta__confidence"], [1, "footer"], [1, "shell", "footer__grid"], [1, "footer__brand"], [1, "footer__col"], ["href", "mailto:contact@northedgesystem.com"], [1, "shell", "footer__bottom"], ["styleClass", "demo-dialog", 3, "visibleChange", "onHide", "visible", "modal", "dismissableMask", "draggable", "resizable", "closeOnEscape"], ["pTemplate", "header"], [1, "demo-form", 3, "ngSubmit", "formGroup"], [1, "field-grid"], [1, "form-field"], ["pInputText", "", "id", "demo-full-name", "type", "text", "formControlName", "fullName", "placeholder", "Jane Cooper", 1, "w-full", "demo-input"], ["for", "demo-full-name"], ["class", "form-error", 4, "ngIf"], ["pInputText", "", "id", "demo-work-email", "type", "email", "formControlName", "workEmail", "placeholder", "jane@company.com", 1, "w-full", "demo-input"], ["for", "demo-work-email"], ["pInputText", "", "id", "demo-company", "type", "text", "formControlName", "company", "placeholder", "North Ridge Foods", 1, "w-full", "demo-input"], ["for", "demo-company"], ["pInputText", "", "id", "demo-role-title", "type", "text", "formControlName", "roleTitle", "placeholder", "VP Sales", 1, "w-full", "demo-input"], ["for", "demo-role-title"], ["pInputText", "", "id", "demo-phone", "type", "text", "formControlName", "phone", "placeholder", "+1 555 0100", 1, "w-full", "demo-input"], ["for", "demo-phone"], ["inputId", "demo-team-size", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "teamSize", "placeholder", "Select team size", "styleClass", "w-full", 3, "options"], ["for", "demo-team-size"], ["inputId", "demo-preferred-datetime", "appendTo", "body", "formControlName", "preferredDateTime", "hourFormat", "12", "dateFormat", "yy-mm-dd", "placeholder", "Select preferred date and time", "styleClass", "w-full", 3, "minDate", "showIcon", "showTime", "showButtonBar"], ["for", "demo-preferred-datetime"], ["inputId", "demo-timezone", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "timezone", "placeholder", "Select timezone", "filterBy", "label", "styleClass", "w-full", 3, "options", "filter"], ["for", "demo-timezone"], [1, "field-textarea"], ["pTextarea", "", "id", "demo-use-case", "rows", "4", "formControlName", "useCase", "placeholder", "What outcomes do you want from the demo?", 1, "w-full", "demo-textarea"], ["for", "demo-use-case"], [1, "demo-actions"], ["pButton", "", "type", "button", "label", "Cancel", 1, "ne-btn", "ne-btn--link", 3, "click", "disabled"], ["pButton", "", "type", "submit", 1, "ne-btn", "ne-btn--primary", 3, "label", "disabled"], [1, "demo-contact-note"], ["styleClass", "demo-success-dialog", 3, "visibleChange", "visible", "modal", "dismissableMask", "draggable", "resizable", "closeOnEscape"], [1, "demo-success-body"], ["pTemplate", "footer"], [1, "hero__title-text"], [1, "hero__title-accent"], [1, "hero__subtitle"], [1, "kpi-carousel__slide"], [1, "preview-slide", 3, "ngSwitch"], [4, "ngSwitchCase"], [1, "preview-shell", "preview-shell--pipeline"], [1, "preview-kpi-board__header"], [1, "preview-shell__eyebrow"], [1, "preview-kpi-board__total"], [1, "preview-kpi-stage-row"], ["class", "preview-kpi-stage", 3, "preview-kpi-stage--rose", "preview-kpi-stage--amber", "preview-kpi-stage--cyan", "preview-kpi-stage--violet", 4, "ngFor", "ngForOf"], [1, "preview-kpi-metrics"], [1, "preview-kpi-stage"], [1, "preview-shell", "preview-shell--lead"], [1, "preview-score"], [1, "preview-score__ring"], [1, "preview-score__summary"], [1, "preview-factor-list"], ["class", "preview-factor", 3, "preview-factor--strong", "preview-factor--watch", 4, "ngFor", "ngForOf"], [1, "preview-factor"], ["aria-hidden", "true", 1, "preview-factor__meter"], [1, "preview-shell", "preview-shell--deal"], [1, "preview-deal-header"], [1, "preview-deal-pill"], [1, "preview-deal-grid"], [1, "preview-deal-confidence"], [1, "preview-deal-confidence__top"], ["aria-hidden", "true", 1, "preview-deal-confidence__bar"], [1, "preview-deal-next"], [1, "preview-feed"], [1, "preview-shell", "preview-shell--property"], [1, "preview-property-hero"], [1, "preview-property-pill"], [1, "preview-property-price"], [1, "preview-property-metrics"], [3, "preview-property-metric--blue", "preview-property-metric--green", "preview-property-metric--amber", "preview-property-metric--violet", 4, "ngFor", "ngForOf"], [1, "preview-note-list", "preview-note-list--property"], [1, "preview-property-metric__icon"], ["aria-hidden", "true"], [1, "preview-shell", "preview-shell--orchestration"], [1, "preview-kpi-board__header", "preview-kpi-board__header--orchestration"], [1, "preview-orchestration-metrics"], [1, "preview-orchestration-list"], ["class", "preview-orchestration-card", 3, "preview-orchestration-card--critical", "preview-orchestration-card--important", "preview-orchestration-card--low", 4, "ngFor", "ngForOf"], [1, "preview-orchestration-card"], [1, "preview-orchestration-rank"], [1, "preview-orchestration-body"], [1, "preview-orchestration-copy"], [1, "preview-orchestration-chips"], [1, "preview-orchestration-actions"], ["type", "button"], ["type", "button", "class", "preview-orchestration-actions__accent", 4, "ngIf"], ["type", "button", 1, "preview-orchestration-actions__accent"], ["type", "button", 1, "kpi-carousel__dot", 3, "click"], [1, "stat-item"], [1, "stat-item__icon", 3, "ngClass"], [1, "pi", 3, "ngClass"], [1, "stat-item__content"], [1, "stat-item__value"], [1, "stat-item__label"], [1, "stat-item__description"], [1, "proof-card", "scroll-animate"], [1, "journey-step", "journey-step-anchor", 3, "click"], [1, "journey-step__index"], [1, "journey-step__eyebrow"], [1, "journey-panel"], [1, "journey-panel__header"], [1, "journey-panel__badge"], [1, "journey-panel__status"], [1, "journey-panel__body"], [1, "journey-panel__summary"], [1, "journey-panel__signals"], [1, "journey-panel__label"], [1, "journey-panel__chips"], ["class", "journey-chip", 4, "ngFor", "ngForOf"], [1, "journey-panel__metrics"], ["class", "journey-metric", 3, "journey-metric--strong", "journey-metric--risk", 4, "ngFor", "ngForOf"], [1, "journey-panel__outcome"], [1, "journey-chip"], [1, "journey-metric"], [1, "journey-metric__label"], ["type", "button", 1, "journey__dot", 3, "click"], [1, "feature-card", "scroll-animate", 3, "mousemove", "mouseleave"], [1, "feature-card__icon", 3, "ngClass"], [1, "trust-card", "scroll-animate"], [1, "trust-card__eyebrow"], [1, "trust-card__body"], [1, "step-card", "scroll-animate"], [1, "step-card__number"], [1, "commercial-faq-row", "scroll-animate"], [1, "demo-modal-header"], [1, "form-error"], [1, "demo-success-header"], ["pButton", "", "type", "button", "label", "Done", 1, "ne-btn", "ne-btn--primary", 3, "click"]], template: function LandingPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "main", 0)(1, "div", 1);
            i0.ɵɵelement(2, "span", 2)(3, "span", 3)(4, "span", 4)(5, "span", 5)(6, "span", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "nav", 7)(8, "div", 8)(9, "a", 9);
            i0.ɵɵlistener("click", function LandingPage_Template_a_click_9_listener() { return ctx.scrollTo("hero"); });
            i0.ɵɵelement(10, "img", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "ul", 11)(12, "li")(13, "a", 12);
            i0.ɵɵtext(14, "Platform");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "li")(16, "a", 13);
            i0.ɵɵlistener("click", function LandingPage_Template_a_click_16_listener() { return ctx.scrollTo("highlights"); });
            i0.ɵɵtext(17, "Highlights");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "li")(19, "a", 13);
            i0.ɵɵlistener("click", function LandingPage_Template_a_click_19_listener() { return ctx.scrollTo("features"); });
            i0.ɵɵtext(20, "Features");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "li")(22, "a", 13);
            i0.ɵɵlistener("click", function LandingPage_Template_a_click_22_listener() { return ctx.scrollTo("how-it-works"); });
            i0.ɵɵtext(23, "How It Works");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "li", 14)(25, "button", 15);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_25_listener() { return ctx.onSignIn(); });
            i0.ɵɵtext(26, "Sign In");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "button", 16);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_27_listener() { return ctx.onWatchDemo(); });
            i0.ɵɵtext(28, "Book a Demo");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(29, "div", 17)(30, "button", 15);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_30_listener() { return ctx.onSignIn(); });
            i0.ɵɵtext(31, "Sign In");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "button", 16);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_32_listener() { return ctx.onWatchDemo(); });
            i0.ɵɵtext(33, "Book a Demo");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "button", 18);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_34_listener() { return ctx.mobileMenuOpen = !ctx.mobileMenuOpen; });
            i0.ɵɵelement(35, "span")(36, "span")(37, "span");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(38, "section", 19)(39, "div", 20)(40, "div", 21)(41, "span", 22);
            i0.ɵɵtext(42, "North Edge");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "span", 23);
            i0.ɵɵtext(44, "CRM");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "span", 24);
            i0.ɵɵtext(46, "Evidence-Based CRM for revenue teams that need defensible decisions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "h1", 25);
            i0.ɵɵtemplate(48, LandingPage_span_48_Template, 5, 4, "span", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "div", 27);
            i0.ɵɵtemplate(50, LandingPage_p_50_Template, 2, 3, "p", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "ul", 29)(52, "li");
            i0.ɵɵelement(53, "i", 30);
            i0.ɵɵtext(54, " CQVS qualification with evidence quality, not generic lead scoring");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "li");
            i0.ɵɵelement(56, "i", 30);
            i0.ɵɵtext(57, " Conversation score and conversion readiness tied to real interactions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "li");
            i0.ɵɵelement(59, "i", 30);
            i0.ɵɵtext(60, " Approval workflows, report workspace, and tenant presets built into the operating model");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(61, "blockquote", 31);
            i0.ɵɵtext(62, "\"If you can't defend it, don't forecast it.\"");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 32)(64, "button", 33);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_64_listener() { return ctx.onWatchDemo(); });
            i0.ɵɵelement(65, "i", 34);
            i0.ɵɵtext(66, " Book a Demo ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "a", 35);
            i0.ɵɵtext(68, " Explore Platform ");
            i0.ɵɵelement(69, "i", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "button", 37);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_70_listener() { return ctx.onSignIn(); });
            i0.ɵɵtext(71, " Sign In ");
            i0.ɵɵelement(72, "i", 36);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(73, "div", 38)(74, "span", 39);
            i0.ɵɵtext(75, "Working-product demo");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "p");
            i0.ɵɵtext(77, "We walk through your actual signal, decision, and rollout model. No stock CRM deck.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(78, "div", 40)(79, "div", 41);
            i0.ɵɵlistener("wheel", function LandingPage_Template_div_wheel_79_listener($event) { return ctx.onHeroPreviewWheel($event); });
            i0.ɵɵelementStart(80, "div", 42)(81, "span", 43);
            i0.ɵɵtext(82, "Revenue command center");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "div", 44);
            i0.ɵɵelement(84, "span")(85, "span")(86, "span");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(87, "div", 45);
            i0.ɵɵtemplate(88, LandingPage_div_88_Template, 7, 6, "div", 46);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(89, "div", 47);
            i0.ɵɵtemplate(90, LandingPage_button_90_Template, 1, 3, "button", 48);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "span", 49);
            i0.ɵɵtext(92);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(93, "section", 50)(94, "div", 51)(95, "span", 52);
            i0.ɵɵelement(96, "i", 53);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "h2", 54);
            i0.ɵɵtext(98, "One License. Unlimited Users. Forever.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(99, "p", 55);
            i0.ɵɵtext(100, "No user caps. No forced annual renewals. Your full team can operate without licensing friction.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(101, "section", 56)(102, "div", 57);
            i0.ɵɵtemplate(103, LandingPage_div_103_Template, 10, 9, "div", 58);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(104, "div", 59);
            i0.ɵɵelementStart(105, "section", 60)(106, "div", 61)(107, "span", 62);
            i0.ɵɵtext(108, "Why This CRM Feels Different");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(109, "h2", 63);
            i0.ɵɵtext(110, "Built for teams that need evidence, not just activity tracking");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(111, "p", 64);
            i0.ɵɵtext(112, "North Edge CRM is designed to surface what is strong, what is assumed, and what is blocked before revenue decisions are made.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(113, "div", 65);
            i0.ɵɵtemplate(114, LandingPage_article_114_Template, 5, 4, "article", 66);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(115, "section", 67)(116, "div", 68)(117, "div", 69)(118, "span", 62);
            i0.ɵɵtext(119, "Signal to Decision");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(120, "h2", 63);
            i0.ɵɵtext(121, "Watch one lead move from activity to a defensible revenue decision");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(122, "p", 64);
            i0.ɵɵtext(123, "Instead of treating email, meetings, and qualification as separate screens, North Edge CRM turns them into one operating story: signal, decision, and outcome.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(124, "div", 70)(125, "p", 71);
            i0.ɵɵtext(126, " Scroll the narrative to see how the CRM turns raw activity into a visible operating decision. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(127, "div", 72);
            i0.ɵɵtemplate(128, LandingPage_article_128_Template, 11, 8, "article", 73);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(129, "div", 74)(130, "div", 75);
            i0.ɵɵtemplate(131, LandingPage_div_131_Template, 24, 8, "div", 76);
            i0.ɵɵelementStart(132, "div", 77);
            i0.ɵɵtemplate(133, LandingPage_button_133_Template, 1, 3, "button", 78);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(134, "section", 79)(135, "div", 80)(136, "span", 62);
            i0.ɵɵtext(137, "CRM Product Highlight");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(138, "h2", 63);
            i0.ɵɵtext(139, "See North Edge CRM in Action");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(140, "p", 64);
            i0.ɵɵtext(141, " A concise product walkthrough across command-center visibility, lead qualification, decision flow, and operational control. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(142, "div", 81)(143, "div", 82)(144, "div", 83)(145, "div")(146, "span", 84);
            i0.ɵɵtext(147, "CRM Highlight");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(148, "h3");
            i0.ɵɵtext(149, "North Edge CRM Product Walkthrough");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(150, "span", 85);
            i0.ɵɵtext(151, "YouTube");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(152, "iframe", 86);
            i0.ɵɵelementStart(153, "div", 87)(154, "p");
            i0.ɵɵtext(155, " This walkthrough shows the actual CRM operating model, not a slide deck. It moves through live surfaces used by reps, managers, and operators to run qualification, review pipeline risk, and act on the next best decision. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(156, "ul", 88)(157, "li");
            i0.ɵɵelement(158, "i", 30);
            i0.ɵɵtext(159, " Dashboard command center and KPI visibility");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(160, "li");
            i0.ɵɵelement(161, "i", 30);
            i0.ɵɵtext(162, " Lead qualification, readiness, and manager context");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(163, "li");
            i0.ɵɵelement(164, "i", 30);
            i0.ɵɵtext(165, " Risk review, decision flow, and operational control");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(166, "aside", 89)(167, "div", 90)(168, "span", 91);
            i0.ɵɵtext(169, "01");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(170, "span", 92)(171, "strong");
            i0.ɵɵtext(172, "Full CRM highlight");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(173, "small");
            i0.ɵɵtext(174, "Hosted on YouTube for simple playback and easy sharing.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(175, "a", 93);
            i0.ɵɵtext(176, " Watch on YouTube ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(177, "div", 94)(178, "span", 95);
            i0.ɵɵtext(179, "What this covers");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(180, "ul")(181, "li");
            i0.ɵɵtext(182, "Lead and pipeline operating flow");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(183, "li");
            i0.ɵɵtext(184, "Qualification with evidence and readiness");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(185, "li");
            i0.ɵɵtext(186, "Manager review, decision inbox, and reporting context");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(187, "div", 94)(188, "span", 95);
            i0.ɵɵtext(189, "Next step");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(190, "p");
            i0.ɵɵtext(191, "If the product direction matches your operating model, book a live walkthrough and we will map the rollout, signals, and governance flow to your team.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(192, "button", 33);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_192_listener() { return ctx.onWatchDemo(); });
            i0.ɵɵelement(193, "i", 34);
            i0.ɵɵtext(194, " Book a Demo ");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(195, "section", 96)(196, "div", 61)(197, "span", 62);
            i0.ɵɵtext(198, "Platform Capabilities");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(199, "h2", 63);
            i0.ɵɵtext(200, "Everything Your Sales Team Needs");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(201, "p", 64);
            i0.ɵɵtext(202, "Six core capabilities designed to give your team an unfair advantage in every deal.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(203, "div", 97);
            i0.ɵɵtemplate(204, LandingPage_div_204_Template, 7, 6, "div", 98);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(205, "section", 99)(206, "div", 100)(207, "div", 101)(208, "span", 62);
            i0.ɵɵtext(209, "Operational Trust");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(210, "h2", 63);
            i0.ɵɵtext(211, "Proof that matters before a buyer commits");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(212, "p", 64);
            i0.ɵɵtext(213, "This page does not depend on placeholder customer logos or inflated usage claims. The proof is in how the product is implemented, governed, and controlled once a team goes live.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(214, "div", 102);
            i0.ɵɵtemplate(215, LandingPage_article_215_Template, 8, 4, "article", 103);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(216, "section", 104)(217, "div", 61)(218, "span", 62);
            i0.ɵɵtext(219, "Getting Started");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(220, "h2", 63);
            i0.ɵɵtext(221, "Up and Running in Three Steps");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(222, "div", 105);
            i0.ɵɵtemplate(223, LandingPage_div_223_Template, 7, 5, "div", 106);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(224, "section", 107)(225, "div", 108)(226, "div", 109)(227, "span", 62);
            i0.ɵɵtext(228, "What Buyers Need To Know");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(229, "h2", 63);
            i0.ɵɵtext(230, "Commercial clarity before the sales cycle gets long");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(231, "p", 64);
            i0.ɵɵtext(232, "The page should reduce buyer friction, not create it. These are the questions serious teams usually ask before they commit to a demo or rollout discussion.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(233, "div", 110);
            i0.ɵɵtemplate(234, LandingPage_article_234_Template, 5, 4, "article", 111);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(235, "aside", 112)(236, "div", 113)(237, "span", 114);
            i0.ɵɵtext(238, "Demo expectations");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(239, "h3");
            i0.ɵɵtext(240, "What a serious first conversation looks like");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(241, "ul");
            i0.ɵɵtemplate(242, LandingPage_li_242_Template, 3, 1, "li", 115);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(243, "button", 33);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_243_listener() { return ctx.onWatchDemo(); });
            i0.ɵɵelement(244, "i", 34);
            i0.ɵɵtext(245, " Book a Demo ");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(246, "section", 116)(247, "div", 117)(248, "h2");
            i0.ɵɵtext(249, "Ready to Run Your Pipeline on Truth?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(250, "p");
            i0.ɵɵtext(251, "See the full signal-to-decision flow live, align the rollout model, and leave with a defensible path to implementation.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(252, "button", 118);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_252_listener() { return ctx.onWatchDemo(); });
            i0.ɵɵelement(253, "i", 34);
            i0.ɵɵtext(254, " Schedule Your Demo ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(255, "span", 119);
            i0.ɵɵtext(256, "Designed for teams that need qualification discipline, manager visibility, and rollout control.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(257, "footer", 120)(258, "div", 121)(259, "div", 122)(260, "div", 21)(261, "span", 22);
            i0.ɵɵtext(262, "North Edge");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(263, "span", 23);
            i0.ɵɵtext(264, "CRM");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(265, "p");
            i0.ɵɵtext(266, "Evidence-based CRM for sales teams that close.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(267, "div", 123)(268, "h4");
            i0.ɵɵtext(269, "Product");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(270, "ul")(271, "li")(272, "a", 13);
            i0.ɵɵlistener("click", function LandingPage_Template_a_click_272_listener() { return ctx.scrollTo("highlights"); });
            i0.ɵɵtext(273, "Highlights");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(274, "li")(275, "a", 13);
            i0.ɵɵlistener("click", function LandingPage_Template_a_click_275_listener() { return ctx.scrollTo("features"); });
            i0.ɵɵtext(276, "Features");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(277, "li")(278, "a", 13);
            i0.ɵɵlistener("click", function LandingPage_Template_a_click_278_listener() { return ctx.scrollTo("how-it-works"); });
            i0.ɵɵtext(279, "How It Works");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(280, "div", 123)(281, "h4");
            i0.ɵɵtext(282, "Company");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(283, "ul")(284, "li")(285, "a", 124);
            i0.ɵɵtext(286, "Contact");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(287, "div", 123)(288, "h4");
            i0.ɵɵtext(289, "Get In Touch");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(290, "ul")(291, "li")(292, "a", 124);
            i0.ɵɵtext(293, "contact@northedgesystem.com");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(294, "div", 125)(295, "span");
            i0.ɵɵtext(296);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(297, "p-dialog", 126);
            i0.ɵɵtwoWayListener("visibleChange", function LandingPage_Template_p_dialog_visibleChange_297_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.showDemoForm, $event) || (ctx.showDemoForm = $event); return $event; });
            i0.ɵɵlistener("onHide", function LandingPage_Template_p_dialog_onHide_297_listener() { return ctx.closeDemoForm(); });
            i0.ɵɵtemplate(298, LandingPage_ng_template_298_Template, 11, 0, "ng-template", 127);
            i0.ɵɵelementStart(299, "form", 128);
            i0.ɵɵlistener("ngSubmit", function LandingPage_Template_form_ngSubmit_299_listener() { return ctx.submitDemoRequest(); });
            i0.ɵɵelementStart(300, "div", 129)(301, "div", 130)(302, "p-iftalabel");
            i0.ɵɵelement(303, "input", 131);
            i0.ɵɵelementStart(304, "label", 132);
            i0.ɵɵtext(305, "Full name");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(306, LandingPage_small_306_Template, 2, 0, "small", 133);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(307, "div", 130)(308, "p-iftalabel");
            i0.ɵɵelement(309, "input", 134);
            i0.ɵɵelementStart(310, "label", 135);
            i0.ɵɵtext(311, "Work email");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(312, LandingPage_small_312_Template, 2, 0, "small", 133)(313, LandingPage_small_313_Template, 2, 0, "small", 133);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(314, "div", 130)(315, "p-iftalabel");
            i0.ɵɵelement(316, "input", 136);
            i0.ɵɵelementStart(317, "label", 137);
            i0.ɵɵtext(318, "Company");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(319, LandingPage_small_319_Template, 2, 0, "small", 133);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(320, "div", 130)(321, "p-iftalabel");
            i0.ɵɵelement(322, "input", 138);
            i0.ɵɵelementStart(323, "label", 139);
            i0.ɵɵtext(324, "Role / Title");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(325, LandingPage_small_325_Template, 2, 0, "small", 133);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(326, "div", 130)(327, "p-iftalabel");
            i0.ɵɵelement(328, "input", 140);
            i0.ɵɵelementStart(329, "label", 141);
            i0.ɵɵtext(330, "Phone");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(331, LandingPage_small_331_Template, 2, 0, "small", 133);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(332, "div", 130)(333, "p-iftalabel");
            i0.ɵɵelement(334, "p-select", 142);
            i0.ɵɵelementStart(335, "label", 143);
            i0.ɵɵtext(336, "Team size");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(337, LandingPage_small_337_Template, 2, 0, "small", 133);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(338, "div", 130)(339, "p-iftalabel");
            i0.ɵɵelement(340, "p-datepicker", 144);
            i0.ɵɵelementStart(341, "label", 145);
            i0.ɵɵtext(342, "Preferred date and time");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(343, LandingPage_small_343_Template, 2, 0, "small", 133)(344, LandingPage_small_344_Template, 2, 0, "small", 133)(345, LandingPage_small_345_Template, 2, 0, "small", 133);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(346, "div", 130)(347, "p-iftalabel");
            i0.ɵɵelement(348, "p-select", 146);
            i0.ɵɵelementStart(349, "label", 147);
            i0.ɵɵtext(350, "Timezone (stored)");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(351, LandingPage_small_351_Template, 2, 0, "small", 133)(352, LandingPage_small_352_Template, 2, 0, "small", 133);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(353, "div", 148)(354, "p-iftalabel");
            i0.ɵɵelement(355, "textarea", 149);
            i0.ɵɵelementStart(356, "label", 150);
            i0.ɵɵtext(357, "Goals / use case");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(358, LandingPage_small_358_Template, 2, 0, "small", 133);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(359, "div", 151)(360, "button", 152);
            i0.ɵɵlistener("click", function LandingPage_Template_button_click_360_listener() { return ctx.closeDemoForm(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelement(361, "button", 153);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(362, "p", 154);
            i0.ɵɵtext(363, " Prefer email? Contact us at ");
            i0.ɵɵelementStart(364, "a", 124);
            i0.ɵɵtext(365, "contact@northedgesystem.com");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(366, "p-dialog", 155);
            i0.ɵɵtwoWayListener("visibleChange", function LandingPage_Template_p_dialog_visibleChange_366_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.showDemoSuccess, $event) || (ctx.showDemoSuccess = $event); return $event; });
            i0.ɵɵtemplate(367, LandingPage_ng_template_367_Template, 8, 0, "ng-template", 127);
            i0.ɵɵelementStart(368, "div", 156)(369, "p");
            i0.ɵɵtext(370, "Your demo request has been submitted successfully.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(371, "p");
            i0.ɵɵtext(372, "Our team will contact you soon to confirm your session.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(373, LandingPage_ng_template_373_Template, 1, 0, "ng-template", 157);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵclassProp("topbar--scrolled", ctx.isScrolled);
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("topbar__nav--open", ctx.mobileMenuOpen);
            i0.ɵɵadvance(23);
            i0.ɵɵclassProp("is-open", ctx.mobileMenuOpen);
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngForOf", ctx.heroPreviewSlides);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.heroPreviewSlides);
            i0.ɵɵadvance(37);
            i0.ɵɵstyleProp("transform", "translateX(-" + ctx.activeHeroPreview * 100 + "%)");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.heroPreviewSlides);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.heroPreviewSlides);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.heroPreviewSlides[ctx.activeHeroPreview].label);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngForOf", ctx.stats);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngForOf", ctx.proofPillars);
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngForOf", ctx.journeySteps);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.journeySteps);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.journeySteps);
            i0.ɵɵadvance(71);
            i0.ɵɵproperty("ngForOf", ctx.features);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngForOf", ctx.trustSignals);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngForOf", ctx.howItWorks);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngForOf", ctx.commercialFaq);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngForOf", ctx.demoExpectations);
            i0.ɵɵadvance(54);
            i0.ɵɵtextInterpolate1("\u00A9 ", ctx.currentYear, " North Edge System. All rights reserved.");
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(64, _c0));
            i0.ɵɵtwoWayProperty("visible", ctx.showDemoForm);
            i0.ɵɵproperty("modal", true)("dismissableMask", false)("draggable", false)("resizable", false)("closeOnEscape", true);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.demoForm);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.fieldError("fullName", "required"));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.fieldError("workEmail", "required"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.fieldError("workEmail", "email"));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.fieldError("company", "required"));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.fieldError("roleTitle", "required"));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.fieldError("phone", "required"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("options", ctx.teamSizeOptions);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.fieldError("teamSize", "required"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("minDate", ctx.minDemoDateTime)("showIcon", true)("showTime", true)("showButtonBar", true);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.fieldError("preferredDateTime", "required"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.fieldError("preferredDateTime", "minTorontoDay"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.fieldError("preferredDateTime", "outsideTorontoBusinessHours"));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("options", ctx.timezoneOptions)("filter", true);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.fieldError("timezone", "required"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.fieldError("preferredDateTime", "invalidTimezone"));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.fieldError("useCase", "required"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.submittingDemo);
            i0.ɵɵadvance();
            i0.ɵɵproperty("label", ctx.submittingDemo ? "Submitting..." : "Schedule Demo")("disabled", ctx.submittingDemo);
            i0.ɵɵadvance(5);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(65, _c1));
            i0.ɵɵtwoWayProperty("visible", ctx.showDemoSuccess);
            i0.ɵɵproperty("modal", true)("dismissableMask", false)("draggable", false)("resizable", false)("closeOnEscape", true);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, i1.NgSwitch, i1.NgSwitchCase, RouterModule, i2.RouterLink, ButtonModule, i3.ButtonDirective, i4.PrimeTemplate, ReactiveFormsModule, i5.ɵNgNoValidate, i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgControlStatusGroup, i5.FormGroupDirective, i5.FormControlName, DialogModule, i6.Dialog, InputTextModule, i7.InputText, SelectModule, i8.Select, DatePickerModule, i9.DatePicker, TextareaModule, i10.Textarea, IftaLabelModule, i11.IftaLabel], styles: ["\n\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  color: #f5f8ff;\n  overflow-x: hidden;\n}\n\n\n\n.landing[_ngcontent-%COMP%] {\n  --hero-bg: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);\n  --accent: #667eea;\n  --accent-end: #764ba2;\n  --accent-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  --cyan: #22d3ee;\n  --green: #22c55e;\n  --orange: #f97316;\n  --purple: #a855f7;\n  --text-hero: #f5f8ff;\n  --text-body: #1e293b;\n  --text-muted: #64748b;\n  --surface-light: #f8fafc;\n  --surface-white: #ffffff;\n  --footer-bg: #0f172a;\n  --glass-border: rgba(255, 255, 255, 0.18);\n  --glass-bg: rgba(255, 255, 255, 0.08);\n  --shadow: 0 40px 120px rgba(0, 0, 0, 0.5);\n  --radius-lg: 1rem;\n  --radius-xl: 1.5rem;\n  --shell-max: 1440px;\n  --hero-shell-max: 1520px;\n  --shell-gutter: clamp(1rem, 3vw, 3rem);\n  position: relative;\n}\n\n\n\n.scroll-animate[_ngcontent-%COMP%] {\n  opacity: 0;\n  transform: translateY(30px);\n  transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),\n              transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &.scroll-visible {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n\n\n.shell[_ngcontent-%COMP%] {\n  width: min(var(--shell-max), calc(100% - (var(--shell-gutter) * 2)));\n  margin-inline: auto;\n}\n\n\n\n.landing-bg[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  background: var(--hero-bg);\n  pointer-events: none;\n}\n\n.landing-bg[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(ellipse at 60% 20%, rgba(102, 126, 234, 0.15), transparent 60%);\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.35;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n}\n\n.orb-1[_ngcontent-%COMP%] {\n  width: 500px; height: 500px;\n  background: var(--accent-gradient);\n  top: -15%; right: -8%;\n}\n\n.orb-2[_ngcontent-%COMP%] {\n  width: 350px; height: 350px;\n  background: linear-gradient(135deg, var(--cyan), #06b6d4);\n  bottom: 15%; left: -6%;\n  animation-delay: -7s;\n}\n\n.orb-3[_ngcontent-%COMP%] {\n  width: 280px; height: 280px;\n  background: linear-gradient(135deg, var(--purple), #9333ea);\n  top: 45%; right: 22%;\n  animation-delay: -14s;\n}\n\n.grid-pattern[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);\n  background-size: 60px 60px;\n}\n\n.noise-layer[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  opacity: 0.04;\n  background: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\");\n}\n\n\n\n.topbar[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 100;\n  padding: 0.75rem 0;\n  transition: background 300ms, backdrop-filter 300ms, box-shadow 300ms;\n\n  &--scrolled {\n    background: rgba(15, 20, 40, 0.85);\n    backdrop-filter: blur(20px);\n    box-shadow: 0 2px 24px rgba(0, 0, 0, 0.3);\n  }\n}\n\n.topbar__inner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n\n.topbar__brand[_ngcontent-%COMP%] {\n  cursor: pointer;\n  flex-shrink: 0;\n}\n\n.topbar__logo[_ngcontent-%COMP%] {\n  height: 42px;\n  width: auto;\n  display: block;\n}\n\n.topbar__nav[_ngcontent-%COMP%] {\n  display: flex;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  gap: 0.25rem;\n  margin-left: auto;\n\n  li a {\n    display: inline-flex;\n    padding: 0.45rem 0.85rem;\n    font-size: 0.9rem;\n    font-weight: 600;\n    color: rgba(255, 255, 255, 0.75);\n    cursor: pointer;\n    border-radius: 0.5rem;\n    transition: color 200ms, background 200ms;\n    text-decoration: none;\n\n    &:hover {\n      color: #fff;\n      background: rgba(255, 255, 255, 0.08);\n    }\n  }\n}\n\n.topbar__actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  flex-shrink: 0;\n}\n\n.topbar__nav-actions[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.nav-btn[_ngcontent-%COMP%] {\n  font-family: inherit;\n  font-size: 0.875rem;\n  font-weight: 600;\n  padding: 0.5rem 1.15rem;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  transition: all 200ms;\n  border: none;\n\n  &--ghost {\n    background: transparent;\n    color: rgba(255, 255, 255, 0.85);\n    border: 1px solid rgba(255, 255, 255, 0.2);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.1);\n      color: #fff;\n    }\n  }\n\n  &--primary {\n    background: var(--accent-gradient);\n    color: #fff;\n    box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n    &:hover {\n      transform: translateY(-1px);\n      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n    }\n  }\n}\n\n.topbar__hamburger[_ngcontent-%COMP%] {\n  display: none;\n  flex-direction: column;\n  gap: 5px;\n  padding: 0.4rem;\n  background: none;\n  border: none;\n  cursor: pointer;\n\n  span {\n    display: block;\n    width: 22px;\n    height: 2px;\n    background: rgba(255, 255, 255, 0.85);\n    border-radius: 2px;\n    transition: all 250ms;\n  }\n\n  &.is-open {\n    span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }\n    span:nth-child(2) { opacity: 0; }\n    span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }\n  }\n}\n\n\n\n.hero[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: min(var(--hero-shell-max), calc(100% - (var(--shell-gutter) * 2)));\n  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);\n  gap: clamp(2rem, 4vw, 4.25rem);\n  padding-top: 7rem;\n  padding-bottom: 4rem;\n  min-height: 85vh;\n  align-items: center;\n}\n\n.hero__content[_ngcontent-%COMP%], \n.hero__visual[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.hero__content[_ngcontent-%COMP%] {\n  max-width: 34rem;\n}\n\n.hero-brand[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: baseline;\n  gap: 0.48rem;\n  margin-bottom: 0.85rem;\n}\n\n.hero-brand-wordmark[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: rgba(233, 241, 255, 0.78);\n}\n\n.hero-brand-crm[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-block;\n  font-size: 1.15rem;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: transparent;\n  background: linear-gradient(120deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%);\n  background-size: 240% 240%;\n  -webkit-background-clip: text;\n  background-clip: text;\n  animation: _ngcontent-%COMP%_crm-shimmer 3.6s ease-in-out infinite;\n}\n\n.hero-brand-crm[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  inset: -0.24rem -0.38rem;\n  border-radius: 999px;\n  background: radial-gradient(circle at 50% 45%, rgba(102, 126, 234, 0.28), transparent 76%);\n  filter: blur(6px);\n  pointer-events: none;\n  z-index: -1;\n  opacity: 0.45;\n  animation: _ngcontent-%COMP%_crm-aura 3.6s ease-in-out infinite;\n}\n\n.hero-proof-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  max-width: 32rem;\n  padding: 0.45rem 0.9rem;\n  margin-bottom: 0.85rem;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  color: rgba(245, 248, 255, 0.86);\n  font-size: 0.82rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n}\n\n.hero__title[_ngcontent-%COMP%] {\n  position: relative;\n  margin: 0;\n  font-size: clamp(2.4rem, 5vw, 4rem);\n  font-weight: 800;\n  line-height: 1.05;\n  letter-spacing: -0.03em;\n  color: var(--text-hero);\n  min-height: 2.15em;\n}\n\n.hero__title-text[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  transform: translateY(12px);\n  transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),\n              transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  pointer-events: none;\n\n  &--active {\n    opacity: 1;\n    transform: translateY(0);\n    pointer-events: auto;\n    position: relative;\n  }\n}\n\n.hero__title-accent[_ngcontent-%COMP%] {\n  background: var(--accent-gradient);\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.hero__subtitle-wrap[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 4.5em;\n  margin: 1rem 0 1.45rem;\n}\n\n.hero__subtitle[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 0;\n  color: rgba(241, 246, 255, 0.72);\n  font-size: 1.06rem;\n  max-width: 520px;\n  line-height: 1.7;\n  opacity: 0;\n  transform: translateY(10px);\n  transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s,\n              transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s;\n  pointer-events: none;\n\n  &--active {\n    opacity: 1;\n    transform: translateY(0);\n    pointer-events: auto;\n  }\n}\n\n.hero__cta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n  margin-bottom: 0.85rem;\n}\n\n.hero__cta-note[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.3rem;\n\n  p {\n    margin: 0;\n    color: rgba(241, 246, 255, 0.58);\n    font-size: 0.9rem;\n    line-height: 1.55;\n  }\n}\n\n.hero__cta-kicker[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  width: fit-content;\n  padding: 0.26rem 0.62rem;\n  border-radius: 999px;\n  background: rgba(125, 211, 252, 0.12);\n  border: 1px solid rgba(125, 211, 252, 0.22);\n  color: #bae6fd;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.hero-proof-points[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0 0 1.4rem;\n  display: grid;\n  gap: 0.7rem;\n\n  li {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.65rem;\n    color: rgba(241, 246, 255, 0.86);\n    font-size: 0.96rem;\n    line-height: 1.55;\n  }\n\n  i {\n    color: #7dd3fc;\n    margin-top: 0.12rem;\n    flex-shrink: 0;\n  }\n}\n\n.hero-manifesto[_ngcontent-%COMP%] {\n  margin: 0 0 1.6rem;\n  padding: 0.9rem 1.25rem;\n  border-left: 3px solid rgba(125, 211, 252, 0.5);\n  background: rgba(125, 211, 252, 0.06);\n  border-radius: 0 0.5rem 0.5rem 0;\n  color: rgba(241, 246, 255, 0.92);\n  font-size: 1.15rem;\n  font-weight: 600;\n  font-style: italic;\n  letter-spacing: -0.01em;\n  line-height: 1.5;\n}\n\n.hero-btn[_ngcontent-%COMP%] {\n  font-family: inherit;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1.5rem;\n  font-size: 1rem;\n  font-weight: 700;\n  border-radius: 0.65rem;\n  cursor: pointer;\n  border: none;\n  text-decoration: none;\n  transition: all 250ms;\n\n  i { font-size: 0.95rem; }\n\n  &--primary {\n    background: var(--accent-gradient);\n    color: #fff;\n    box-shadow: 0 6px 24px rgba(102, 126, 234, 0.4);\n\n    &:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 10px 32px rgba(102, 126, 234, 0.55);\n    }\n  }\n\n  &--ghost {\n    background: rgba(255, 255, 255, 0.08);\n    color: rgba(255, 255, 255, 0.9);\n    border: 1px solid rgba(255, 255, 255, 0.2);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.14);\n      color: #fff;\n    }\n  }\n\n  &--secondary {\n    background: rgba(34, 211, 238, 0.12);\n    color: #d9fbff;\n    border: 1px solid rgba(34, 211, 238, 0.28);\n    box-shadow: 0 10px 26px rgba(8, 145, 178, 0.18);\n\n    &:hover {\n      background: rgba(34, 211, 238, 0.18);\n      color: #fff;\n      transform: translateY(-2px);\n    }\n  }\n\n  &--lg {\n    padding: 0.9rem 2rem;\n    font-size: 1.1rem;\n  }\n}\n\n\n\n.hero__visual[_ngcontent-%COMP%] {\n  position: relative;\n  animation: _ngcontent-%COMP%_fade-in-up 0.8s ease-out 0.2s both;\n  align-self: center;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  max-width: 960px;\n  justify-self: end;\n  transform: perspective(1400px) rotateY(-7deg) rotateX(2deg) translateZ(0);\n  transform-style: preserve-3d;\n  isolation: isolate;\n}\n\n.hero__visual[_ngcontent-%COMP%]::before, \n.hero__visual[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  pointer-events: none;\n  z-index: 0;\n  filter: blur(56px);\n  opacity: 1;\n}\n\n.hero__visual[_ngcontent-%COMP%]::before {\n  top: -6%;\n  right: -8%;\n  width: 68%;\n  height: 64%;\n  background:\n    radial-gradient(circle at center,\n      rgba(88, 166, 255, 0.62) 0%,\n      rgba(88, 166, 255, 0.34) 24%,\n      rgba(124, 92, 255, 0.22) 46%,\n      transparent 74%);\n}\n\n.hero__visual[_ngcontent-%COMP%]::after {\n  left: 6%;\n  bottom: -12%;\n  width: 88%;\n  height: 32%;\n  background:\n    radial-gradient(ellipse at center,\n      rgba(35, 134, 54, 0.28) 0%,\n      rgba(34, 211, 238, 0.18) 26%,\n      rgba(88, 166, 255, 0.12) 44%,\n      transparent 74%);\n}\n\n.kpi-carousel[_ngcontent-%COMP%] {\n  position: relative;\n  border-radius: var(--radius-xl);\n  border: 1px solid var(--glass-border);\n  background: var(--glass-bg);\n  backdrop-filter: blur(20px);\n  overflow: hidden;\n  z-index: 1;\n  box-shadow:\n    0 48px 132px rgba(3, 7, 18, 0.72),\n    0 0 0 1px rgba(191, 219, 254, 0.08),\n    0 0 42px rgba(88, 166, 255, 0.16);\n  transition: box-shadow 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  aspect-ratio: 16 / 9;\n  width: 100%;\n  min-height: 500px;\n  isolation: isolate;\n  transform: translateY(-10px) scale(1.03);\n\n  &:hover {\n    box-shadow:\n      0 64px 160px rgba(3, 7, 18, 0.78),\n      0 0 60px rgba(88, 166, 255, 0.3),\n      0 0 120px rgba(124, 92, 255, 0.2),\n      0 0 160px rgba(35, 134, 54, 0.1);\n  }\n}\n\n.kpi-carousel__frame[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.95rem;\n  left: 1rem;\n  right: 1rem;\n  z-index: 3;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.85rem;\n  pointer-events: none;\n}\n\n.kpi-carousel__frame-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.34rem 0.7rem;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.62);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  color: rgba(255, 255, 255, 0.92);\n  font-size: 0.71rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  backdrop-filter: blur(14px);\n}\n\n.kpi-carousel__frame-controls[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.38rem;\n  padding: 0.42rem 0.62rem;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.46);\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  backdrop-filter: blur(12px);\n\n  span {\n    width: 7px;\n    height: 7px;\n    border-radius: 50%;\n    background: rgba(255, 255, 255, 0.7);\n\n    &:nth-child(1) { background: #fb7185; }\n    &:nth-child(2) { background: #fbbf24; }\n    &:nth-child(3) { background: #34d399; }\n  }\n}\n\n.kpi-carousel__track[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100%;\n  transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);\n  will-change: transform;\n  position: relative;\n  z-index: 1;\n}\n\n.kpi-carousel__slide[_ngcontent-%COMP%] {\n  flex: 0 0 100%;\n  min-width: 0;\n  height: 100%;\n  padding: 4.65rem 1.35rem 3.35rem;\n  background:\n    radial-gradient(circle at top right, rgba(34, 211, 238, 0.18), transparent 34%),\n    radial-gradient(circle at bottom left, rgba(102, 126, 234, 0.18), transparent 38%),\n    linear-gradient(145deg, rgba(7, 11, 26, 0.98), rgba(15, 23, 42, 0.88));\n}\n\n.preview-slide[_ngcontent-%COMP%] {\n  height: 100%;\n}\n\n.preview-shell[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  height: 100%;\n  padding: 1.35rem;\n  position: relative;\n  overflow: hidden;\n  border-radius: 1.1rem;\n  background: linear-gradient(180deg, rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.58));\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 20px 40px rgba(2, 6, 23, 0.24);\n  isolation: isolate;\n}\n\n.preview-shell[_ngcontent-%COMP%]::before, \n.preview-shell[_ngcontent-%COMP%]::after, \n.preview-kpi-stage[_ngcontent-%COMP%]::before, \n.preview-kpi-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n.preview-factor[_ngcontent-%COMP%]::before, \n.preview-deal-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n.preview-property-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n.preview-feed[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n.preview-orchestration-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n.preview-orchestration-card[_ngcontent-%COMP%]::before {\n  content: '';\n  position: absolute;\n  inset: auto;\n  pointer-events: none;\n  z-index: 0;\n}\n\n.preview-shell[_ngcontent-%COMP%]::before {\n  top: -16%;\n  left: -8%;\n  width: 48%;\n  height: 52%;\n  border-radius: 45% 55% 60% 40%;\n  background: radial-gradient(circle, rgba(88, 166, 255, 0.18) 0%, rgba(88, 166, 255, 0.08) 42%, transparent 74%);\n  filter: blur(18px);\n  animation: _ngcontent-%COMP%_liquid-drift 15s ease-in-out infinite;\n}\n\n.preview-shell[_ngcontent-%COMP%]::after {\n  right: -10%;\n  bottom: -18%;\n  width: 44%;\n  height: 46%;\n  border-radius: 58% 42% 50% 50%;\n  background: radial-gradient(circle, rgba(124, 92, 255, 0.16) 0%, rgba(34, 211, 238, 0.08) 44%, transparent 76%);\n  filter: blur(20px);\n  animation: _ngcontent-%COMP%_liquid-drift 18s ease-in-out infinite reverse;\n}\n\n.preview-shell[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%], \n.preview-kpi-stage[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%], \n.preview-kpi-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%], \n.preview-factor[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%], \n.preview-deal-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%], \n.preview-property-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%], \n.preview-feed[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%], \n.preview-orchestration-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%], \n.preview-orchestration-card[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n\n.preview-shell__eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin-bottom: 0.45rem;\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: rgba(148, 163, 184, 0.92);\n}\n\n.preview-shell--pipeline[_ngcontent-%COMP%] {\n  grid-template-rows: auto 1fr auto;\n}\n\n.preview-kpi-board__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n\n  h3 {\n    margin: 0;\n    font-size: 1.08rem;\n    color: rgba(241, 245, 249, 0.94);\n    font-weight: 700;\n  }\n}\n\n.preview-kpi-board__total[_ngcontent-%COMP%] {\n  text-align: right;\n\n  strong {\n    display: block;\n    font-size: 2.15rem;\n    line-height: 1;\n    color: #f8fbff;\n  }\n\n  span {\n    display: inline-flex;\n    margin-top: 0.32rem;\n    color: #d9f99d;\n    font-size: 0.9rem;\n    font-weight: 700;\n  }\n}\n\n.preview-shell__delta[_ngcontent-%COMP%], \n.preview-deal-pill[_ngcontent-%COMP%], \n.preview-property-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.4rem 0.7rem;\n  border-radius: 999px;\n  background: rgba(34, 197, 94, 0.18);\n  border: 1px solid rgba(74, 222, 128, 0.28);\n  color: #86efac;\n  font-size: 0.78rem;\n  font-weight: 800;\n}\n\n.preview-stage-list[_ngcontent-%COMP%], \n.preview-factor-list[_ngcontent-%COMP%], \n.preview-feed[_ngcontent-%COMP%], \n.preview-property-metrics[_ngcontent-%COMP%], \n.preview-note-list[_ngcontent-%COMP%], \n.preview-kpi-stage-row[_ngcontent-%COMP%], \n.preview-kpi-metrics[_ngcontent-%COMP%], \n.preview-orchestration-list[_ngcontent-%COMP%], \n.preview-orchestration-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.preview-factor-list[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  align-items: stretch;\n}\n\n.preview-kpi-stage-row[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.8rem;\n}\n\n.preview-kpi-stage[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  padding: 0.95rem 1rem;\n  border-radius: 1rem;\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);\n\n  strong,\n  span,\n  small {\n    display: block;\n  }\n\n  strong {\n    font-size: 1.85rem;\n    line-height: 1;\n    color: #fff7ed;\n  }\n\n  span {\n    margin-top: 0.42rem;\n    font-size: 0.9rem;\n    color: rgba(255, 248, 240, 0.92);\n    font-weight: 700;\n  }\n\n  small {\n    margin-top: 0.4rem;\n    font-size: 0.84rem;\n    color: rgba(255, 248, 240, 0.82);\n  }\n}\n\n.preview-kpi-stage[_ngcontent-%COMP%]::before {\n  top: -18%;\n  right: -12%;\n  width: 62%;\n  height: 88%;\n  border-radius: 58% 42% 55% 45%;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.04));\n  filter: blur(10px);\n  mix-blend-mode: screen;\n  opacity: 0.7;\n  animation: _ngcontent-%COMP%_liquid-drift 13s ease-in-out infinite;\n}\n\n.preview-kpi-stage--rose[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(251, 59, 101, 0.92), rgba(244, 63, 94, 0.76));\n}\n\n.preview-kpi-stage--amber[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(251, 146, 60, 0.94), rgba(245, 158, 11, 0.8));\n}\n\n.preview-kpi-stage--cyan[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(34, 211, 238, 0.78), rgba(20, 184, 166, 0.72));\n}\n\n.preview-kpi-stage--violet[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(124, 58, 237, 0.88), rgba(139, 92, 246, 0.78));\n}\n\n.preview-kpi-metrics[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n\n  article {\n    position: relative;\n    overflow: hidden;\n    padding: 0.95rem 1rem;\n    border-radius: 1rem;\n    background: rgba(60, 78, 183, 0.38);\n    border: 1px solid rgba(191, 219, 254, 0.2);\n  }\n\n  span,\n  strong,\n  small {\n    display: block;\n  }\n\n  span {\n    color: rgba(226, 232, 240, 0.86);\n    font-size: 0.8rem;\n    font-weight: 700;\n  }\n\n  strong {\n    margin-top: 0.35rem;\n    color: #f8fbff;\n    font-size: 1.65rem;\n    line-height: 1.05;\n  }\n\n  small {\n    margin-top: 0.35rem;\n    color: #d9f99d;\n    font-size: 0.86rem;\n    font-weight: 700;\n  }\n}\n\n.preview-kpi-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n.preview-factor[_ngcontent-%COMP%]::before, \n.preview-deal-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n.preview-property-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n.preview-feed[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n.preview-orchestration-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n.preview-orchestration-card[_ngcontent-%COMP%]::before {\n  top: -34%;\n  left: -8%;\n  width: 72%;\n  height: 140%;\n  border-radius: 55% 45% 52% 48%;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.03) 48%, transparent 70%);\n  filter: blur(14px);\n  opacity: 0.75;\n  animation: _ngcontent-%COMP%_liquid-drift 16s ease-in-out infinite;\n}\n\n.preview-stage[_ngcontent-%COMP%] {\n  padding: 0.85rem 0.95rem;\n  border-radius: 0.95rem;\n  background: rgba(15, 23, 42, 0.58);\n  border: 1px solid rgba(255, 255, 255, 0.07);\n}\n\n.preview-stage__top[_ngcontent-%COMP%], \n.preview-property-hero[_ngcontent-%COMP%], \n.preview-deal-header[_ngcontent-%COMP%], \n.preview-score[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.preview-stage__top[_ngcontent-%COMP%] {\n  margin-bottom: 0.6rem;\n\n  span {\n    color: rgba(226, 232, 240, 0.72);\n    font-size: 0.82rem;\n    font-weight: 700;\n    letter-spacing: 0.04em;\n    text-transform: uppercase;\n  }\n\n  strong {\n    color: #f8fafc;\n    font-size: 1rem;\n  }\n}\n\n.preview-stage__bar[_ngcontent-%COMP%] {\n  height: 0.45rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.08);\n\n  span {\n    display: block;\n    height: 100%;\n    border-radius: inherit;\n    background: linear-gradient(90deg, #38bdf8, #8b5cf6);\n  }\n}\n\n.preview-stage__meta[_ngcontent-%COMP%] {\n  margin-top: 0.45rem;\n  font-size: 0.8rem;\n  color: rgba(148, 163, 184, 0.9);\n}\n\n.preview-note-list[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n\n  span {\n    display: grid;\n    grid-template-columns: auto 1fr;\n    grid-template-areas:\n      'icon label'\n      'icon value';\n    align-items: center;\n    column-gap: 0.75rem;\n    padding: 0.7rem 0.8rem;\n    border-radius: 0.9rem;\n    background: rgba(255, 255, 255, 0.1);\n    color: rgba(226, 232, 240, 0.9);\n    font-size: 0.82rem;\n    font-weight: 700;\n    line-height: 1.4;\n  }\n}\n\n.preview-note-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  grid-area: icon;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 0.75rem;\n  background: rgba(30, 41, 59, 0.62);\n  color: #93c5fd;\n}\n\n.preview-note-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   em[_ngcontent-%COMP%], \n.preview-note-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-style: normal;\n}\n\n.preview-note-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  grid-area: label;\n  color: rgba(191, 219, 254, 0.76);\n  font-size: 0.74rem;\n  font-weight: 800;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n\n.preview-note-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  grid-area: value;\n  color: #f8fbff;\n  font-size: 0.9rem;\n  line-height: 1.4;\n}\n\n.preview-shell--lead[_ngcontent-%COMP%] {\n  grid-template-rows: auto 1fr;\n  background:\n    radial-gradient(circle at top left, rgba(56, 189, 248, 0.22), transparent 36%),\n    radial-gradient(circle at bottom right, rgba(124, 92, 255, 0.18), transparent 42%),\n    linear-gradient(180deg, rgba(18, 28, 46, 0.94), rgba(20, 31, 50, 0.9));\n  border-color: rgba(125, 211, 252, 0.2);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.08),\n    0 18px 42px rgba(15, 23, 42, 0.28),\n    0 0 36px rgba(56, 189, 248, 0.12);\n}\n\n.preview-shell--lead[_ngcontent-%COMP%]   .preview-shell__eyebrow[_ngcontent-%COMP%] {\n  color: #7dd3fc;\n}\n\n.preview-shell--lead[_ngcontent-%COMP%]::before {\n  background: radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(56, 189, 248, 0.05) 42%, transparent 74%);\n}\n\n.preview-shell--lead[_ngcontent-%COMP%]::after {\n  background: radial-gradient(circle, rgba(168, 85, 247, 0.14) 0%, rgba(99, 102, 241, 0.05) 44%, transparent 76%);\n}\n\n.preview-score__ring[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 7.25rem;\n  height: 7.25rem;\n  border-radius: 50%;\n  background:\n    radial-gradient(circle at center, rgba(10, 17, 34, 0.98) 56%, transparent 57%),\n    conic-gradient(#38bdf8 0 68%, #7c3aed 68% 100%);\n  box-shadow:\n    inset 0 0 0 1px rgba(255, 255, 255, 0.08),\n    0 18px 38px rgba(56, 189, 248, 0.16);\n  position: relative;\n  overflow: hidden;\n\n  strong {\n    display: block;\n    font-size: 2rem;\n    color: #f8fafc;\n    line-height: 1;\n  }\n\n  span {\n    margin-top: 0.2rem;\n    font-size: 0.74rem;\n    font-weight: 800;\n    letter-spacing: 0.1em;\n    text-transform: uppercase;\n    color: rgba(125, 211, 252, 0.84);\n  }\n}\n\n.preview-score__ring[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  inset: 12% 10%;\n  border-radius: 50%;\n  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.22), transparent 58%);\n  filter: blur(8px);\n  animation: _ngcontent-%COMP%_liquid-pulse 7s ease-in-out infinite;\n}\n\n.preview-score__summary[_ngcontent-%COMP%] {\n  flex: 1;\n\n  h3,\n  p {\n    margin: 0;\n  }\n\n  h3 {\n    font-size: 1.5rem;\n    line-height: 1.2;\n    color: #f8fbff;\n  }\n\n  p {\n    margin-top: 0.4rem;\n    color: rgba(226, 232, 240, 0.82);\n    font-size: 1rem;\n    line-height: 1.55;\n  }\n}\n\n.preview-factor[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-rows: auto auto auto;\n  justify-items: center;\n  align-content: start;\n  gap: 0.55rem;\n  min-height: 10.5rem;\n  padding: 0.95rem 0.85rem 0.9rem;\n  border-radius: 0.95rem;\n  background: rgba(30, 41, 59, 0.72);\n  border: 1px solid rgba(125, 211, 252, 0.16);\n  box-shadow: 0 10px 24px rgba(2, 6, 23, 0.16);\n  text-align: center;\n\n  span {\n    color: rgba(191, 219, 254, 0.78);\n    font-size: 0.76rem;\n    font-weight: 800;\n    letter-spacing: 0.04em;\n    text-transform: uppercase;\n    line-height: 1.35;\n  }\n\n  strong {\n    color: #f8fbff;\n    font-size: 0.98rem;\n  }\n}\n\n.preview-factor__meter[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: end;\n  justify-content: center;\n  width: 1.15rem;\n  height: 4.9rem;\n  padding: 0.2rem;\n  border-radius: 999px;\n  background: rgba(148, 163, 184, 0.18);\n  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);\n\n  span {\n    display: block;\n    width: 100%;\n    border-radius: 999px;\n    background: linear-gradient(180deg, #38bdf8, #7c3aed);\n    box-shadow: 0 0 14px rgba(56, 189, 248, 0.24);\n  }\n}\n\n.preview-factor--strong[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #86efac;\n}\n\n.preview-factor--watch[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #fbbf24;\n}\n\n.preview-factor--strong[_ngcontent-%COMP%]   .preview-factor__meter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #22d3ee, #34d399);\n  box-shadow: 0 0 14px rgba(52, 211, 153, 0.24);\n}\n\n.preview-factor--watch[_ngcontent-%COMP%]   .preview-factor__meter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #f59e0b, #fb7185);\n  box-shadow: 0 0 14px rgba(245, 158, 11, 0.24);\n}\n\n.preview-shell--deal[_ngcontent-%COMP%], \n.preview-shell--property[_ngcontent-%COMP%] {\n  grid-template-rows: auto auto 1fr;\n}\n\n.preview-deal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.preview-property-hero[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.32rem;\n  color: #f8fbff;\n}\n\n.preview-deal-header[_ngcontent-%COMP%] {\n  align-items: flex-start;\n\n  p {\n    margin: 0.5rem 0 0;\n    max-width: 25rem;\n    color: rgba(191, 219, 254, 0.78);\n    font-size: 0.9rem;\n    line-height: 1.45;\n  }\n}\n\n.preview-shell--orchestration[_ngcontent-%COMP%] {\n  grid-template-rows: auto auto 1fr;\n}\n\n.preview-kpi-board__header--orchestration[_ngcontent-%COMP%] {\n  padding-bottom: 0.2rem;\n}\n\n.preview-orchestration-metrics[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n\n  article {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: 0.75rem;\n    padding: 0.85rem 0.95rem;\n    border-radius: 0.95rem;\n    background: rgba(60, 78, 183, 0.38);\n    border: 1px solid rgba(191, 219, 254, 0.2);\n  }\n\n  span,\n  strong,\n  small {\n    display: block;\n  }\n\n  span {\n    color: rgba(226, 232, 240, 0.84);\n    font-size: 0.76rem;\n    font-weight: 800;\n  }\n\n  strong {\n    margin-top: 0.32rem;\n    color: #f8fbff;\n    font-size: 1.5rem;\n    line-height: 1;\n  }\n\n  small {\n    color: rgba(191, 219, 254, 0.88);\n    font-size: 0.76rem;\n    font-weight: 700;\n  }\n}\n\n.preview-orchestration-card[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 7rem 1fr auto;\n  gap: 0.85rem;\n  align-items: stretch;\n  position: relative;\n  overflow: hidden;\n  padding: 0.7rem;\n  border-radius: 1rem;\n  background: rgba(55, 70, 165, 0.32);\n  border: 1px solid rgba(191, 219, 254, 0.22);\n}\n\n.preview-orchestration-rank[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: center;\n  justify-items: center;\n  padding: 0.9rem 0.6rem;\n  border-radius: 0.85rem;\n  text-transform: uppercase;\n\n  strong {\n    font-size: 1.85rem;\n    line-height: 1;\n    color: #fff8f1;\n  }\n\n  span {\n    margin-top: 0.32rem;\n    font-size: 0.76rem;\n    font-weight: 800;\n    letter-spacing: 0.08em;\n    color: rgba(255, 248, 241, 0.9);\n  }\n}\n\n.preview-orchestration-card--critical[_ngcontent-%COMP%]   .preview-orchestration-rank[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(251, 59, 101, 0.95), rgba(254, 178, 178, 0.88));\n}\n\n.preview-orchestration-card--important[_ngcontent-%COMP%]   .preview-orchestration-rank[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(249, 115, 22, 0.95), rgba(254, 215, 170, 0.86));\n}\n\n.preview-orchestration-card--low[_ngcontent-%COMP%]   .preview-orchestration-rank[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(59, 130, 246, 0.9), rgba(191, 219, 254, 0.82));\n}\n\n.preview-orchestration-body[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.6rem;\n  align-content: center;\n}\n\n.preview-orchestration-copy[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \n.preview-orchestration-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.preview-orchestration-copy[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  color: #f8fbff;\n  font-size: 1rem;\n}\n\n.preview-orchestration-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.22rem;\n  color: rgba(191, 219, 254, 0.84);\n  font-size: 0.8rem;\n}\n\n.preview-orchestration-chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n\n  span {\n    display: inline-flex;\n    align-items: center;\n    padding: 0.34rem 0.55rem;\n    border-radius: 999px;\n    background: rgba(255, 255, 255, 0.09);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    color: rgba(241, 245, 249, 0.92);\n    font-size: 0.72rem;\n    font-weight: 700;\n  }\n}\n\n.preview-orchestration-actions[_ngcontent-%COMP%] {\n  display: grid;\n  align-content: center;\n  gap: 0.45rem;\n\n  button {\n    position: relative;\n    overflow: hidden;\n    min-width: 5.9rem;\n    padding: 0.55rem 0.8rem;\n    border-radius: 0.8rem;\n    border: 1px solid rgba(191, 219, 254, 0.2);\n    background: rgba(255, 255, 255, 0.08);\n    color: #f8fbff;\n    font: inherit;\n    font-size: 0.8rem;\n    font-weight: 700;\n  }\n}\n\n.preview-orchestration-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]::before {\n  content: '';\n  position: absolute;\n  top: -120%;\n  left: -28%;\n  width: 72%;\n  height: 280%;\n  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.22), transparent);\n  transform: rotate(18deg);\n  animation: _ngcontent-%COMP%_liquid-sheen 5.8s linear infinite;\n}\n\n.preview-orchestration-actions__accent[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.92), rgba(102, 126, 234, 0.88)) !important;\n}\n\n.preview-deal-grid[_ngcontent-%COMP%], \n.preview-property-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem;\n\n  article {\n    padding: 0.9rem 0.95rem;\n    border-radius: 0.95rem;\n    background: rgba(255, 255, 255, 0.1);\n    border: 1px solid rgba(255, 255, 255, 0.12);\n  }\n\n  span {\n    display: block;\n    margin-bottom: 0.4rem;\n    color: rgba(148, 163, 184, 0.96);\n    font-size: 0.78rem;\n    font-weight: 800;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n\n  strong {\n    color: #f8fbff;\n    font-size: 1rem;\n  }\n}\n\n.preview-property-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  display: grid;\n  grid-template-columns: auto 1fr;\n  grid-template-areas:\n    'icon label'\n    'icon value';\n  align-items: center;\n  column-gap: 0.8rem;\n}\n\n.preview-property-metric__icon[_ngcontent-%COMP%] {\n  grid-area: icon;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.35rem;\n  height: 2.35rem;\n  border-radius: 0.85rem;\n  background: rgba(30, 41, 59, 0.62);\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  color: #dbeafe;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);\n\n  i {\n    font-size: 1rem;\n  }\n}\n\n.preview-property-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  grid-area: label;\n  margin-bottom: 0.15rem;\n}\n\n.preview-property-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  grid-area: value;\n  font-size: 1.05rem;\n}\n\n.preview-property-metric--blue[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(59, 130, 246, 0.16), rgba(15, 23, 42, 0.68)) !important;\n}\n\n.preview-property-metric--green[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(34, 197, 94, 0.16), rgba(15, 23, 42, 0.68)) !important;\n}\n\n.preview-property-metric--amber[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(245, 158, 11, 0.16), rgba(15, 23, 42, 0.68)) !important;\n}\n\n.preview-property-metric--violet[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(168, 85, 247, 0.16), rgba(15, 23, 42, 0.68)) !important;\n}\n\n.preview-deal-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]:nth-child(1) {\n  background: linear-gradient(180deg, rgba(59, 130, 246, 0.16), rgba(15, 23, 42, 0.68));\n}\n\n.preview-deal-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]:nth-child(2) {\n  background: linear-gradient(180deg, rgba(251, 191, 36, 0.16), rgba(15, 23, 42, 0.68));\n}\n\n.preview-deal-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]:nth-child(3) {\n  background: linear-gradient(180deg, rgba(34, 211, 238, 0.14), rgba(15, 23, 42, 0.68));\n}\n\n.preview-deal-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]:nth-child(4) {\n  background: linear-gradient(180deg, rgba(167, 139, 250, 0.16), rgba(15, 23, 42, 0.68));\n}\n\n.preview-deal-confidence[_ngcontent-%COMP%], \n.preview-deal-next[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  padding: 0.95rem 1rem;\n  border-radius: 1rem;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  background: rgba(30, 41, 59, 0.66);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n\n.preview-deal-confidence[_ngcontent-%COMP%]::before, \n.preview-deal-next[_ngcontent-%COMP%]::before {\n  content: '';\n  position: absolute;\n  inset: -20% auto auto -10%;\n  width: 72%;\n  height: 130%;\n  border-radius: 50%;\n  background: linear-gradient(135deg, rgba(96, 165, 250, 0.18), rgba(168, 85, 247, 0.08), transparent 70%);\n  filter: blur(16px);\n  pointer-events: none;\n}\n\n.preview-deal-confidence__top[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.65rem;\n\n  span {\n    color: rgba(191, 219, 254, 0.82);\n    font-size: 0.76rem;\n    font-weight: 800;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n\n  strong {\n    color: #e0f2fe;\n    font-size: 1.2rem;\n    line-height: 1;\n  }\n}\n\n.preview-deal-confidence__bar[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  height: 0.6rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.08);\n\n  span {\n    display: block;\n    height: 100%;\n    border-radius: inherit;\n    background: linear-gradient(90deg, #22d3ee, #60a5fa 52%, #a78bfa);\n    box-shadow: 0 0 18px rgba(96, 165, 250, 0.28);\n  }\n}\n\n.preview-deal-next[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n\n  span,\n  strong {\n    position: relative;\n    z-index: 1;\n  }\n\n  span {\n    color: rgba(191, 219, 254, 0.82);\n    font-size: 0.76rem;\n    font-weight: 800;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n\n  strong {\n    color: #f8fbff;\n    font-size: 0.98rem;\n    line-height: 1.45;\n  }\n}\n\n.preview-feed[_ngcontent-%COMP%] {\n  align-content: start;\n\n  article {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 1rem;\n    padding: 0.85rem 0.95rem;\n    border-radius: 0.95rem;\n    background: rgba(15, 23, 42, 0.58);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n  }\n\n  strong {\n    color: rgba(248, 250, 252, 0.94);\n    font-size: 0.88rem;\n  }\n\n  span {\n    color: rgba(148, 163, 184, 0.88);\n    font-size: 0.8rem;\n    text-align: right;\n  }\n}\n\n.preview-property-price[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 800;\n  color: #f8fbff;\n}\n\n.preview-note-list--property[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr;\n}\n\n.kpi-carousel__indicators[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 1.25rem;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  gap: 0.625rem;\n  z-index: 2;\n}\n\n.kpi-carousel__dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  border: 2px solid rgba(255, 255, 255, 0.7);\n  background: transparent;\n  cursor: pointer;\n  padding: 0;\n  transition: all 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &.active {\n    background: #fff;\n    border-color: #fff;\n    box-shadow: 0 0 12px rgba(255, 255, 255, 0.6);\n    transform: scale(1.3);\n  }\n\n  &:hover:not(.active) {\n    background: rgba(255, 255, 255, 0.45);\n    transform: scale(1.1);\n  }\n}\n\n.kpi-carousel__label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 3.85rem;\n  left: 1rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  padding: 0.3rem 0.85rem;\n  background: rgba(0, 0, 0, 0.5);\n  backdrop-filter: blur(14px);\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: rgba(255, 255, 255, 0.92);\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  z-index: 2;\n  transition: opacity 300ms;\n}\n\n\n\n.banner[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 3rem 0;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.12), rgba(118, 75, 162, 0.08));\n  border-top: 1px solid rgba(255, 255, 255, 0.06);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n}\n\n.banner__inner[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.banner__icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  background: var(--accent-gradient);\n  color: #fff;\n  font-size: 1.25rem;\n  margin-bottom: 0.75rem;\n}\n\n.banner__title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(1.5rem, 3vw, 2.2rem);\n  font-weight: 800;\n  letter-spacing: -0.02em;\n  color: var(--text-hero);\n}\n\n.banner__subtitle[_ngcontent-%COMP%] {\n  margin: 0.5rem auto 0;\n  max-width: 560px;\n  font-size: 1rem;\n  color: rgba(241, 246, 255, 0.65);\n  line-height: 1.6;\n}\n\n\n\n.stats-bar[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 2.5rem 0;\n  background: linear-gradient(180deg, rgba(15, 20, 46, 0.95) 0%, rgba(22, 33, 62, 0.9) 100%);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n}\n\n.stats-bar__inner[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 1.5rem;\n}\n\n.stat-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  align-items: start;\n  gap: 1rem;\n  min-height: 9rem;\n  padding: 1.1rem 1.25rem 1.2rem;\n  border-radius: var(--radius-lg);\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  backdrop-filter: blur(18px);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 20px 36px rgba(2, 6, 23, 0.2);\n  transition: transform 300ms, box-shadow 300ms, border-color 300ms;\n  position: relative;\n  overflow: hidden;\n\n  &:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 18px 42px rgba(2, 6, 23, 0.28);\n    border-color: rgba(255, 255, 255, 0.2);\n  }\n}\n\n.stat-item[_ngcontent-%COMP%]::before {\n  content: '';\n  position: absolute;\n  inset: auto;\n  top: -28%;\n  right: -12%;\n  width: 8rem;\n  height: 8rem;\n  border-radius: 50%;\n  filter: blur(18px);\n  opacity: 0.34;\n  pointer-events: none;\n}\n\n.stat-item__icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background: var(--accent-gradient);\n  color: #fff;\n  font-size: 1.15rem;\n  flex-shrink: 0;\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.26);\n}\n\n.stat-item__icon--azure[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #38bdf8, #2563eb);\n}\n\n.stat-item__icon--emerald[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #34d399, #059669);\n}\n\n.stat-item__icon--amber[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #f59e0b, #f97316);\n}\n\n.stat-item__icon--rose[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #fb7185, #e11d48);\n}\n\n.stat-item[_ngcontent-%COMP%]:nth-child(1)::before {\n  background: radial-gradient(circle, rgba(56, 189, 248, 0.8), transparent 68%);\n}\n\n.stat-item[_ngcontent-%COMP%]:nth-child(2)::before {\n  background: radial-gradient(circle, rgba(52, 211, 153, 0.72), transparent 68%);\n}\n\n.stat-item[_ngcontent-%COMP%]:nth-child(3)::before {\n  background: radial-gradient(circle, rgba(245, 158, 11, 0.72), transparent 68%);\n}\n\n.stat-item[_ngcontent-%COMP%]:nth-child(4)::before {\n  background: radial-gradient(circle, rgba(251, 113, 133, 0.72), transparent 68%);\n}\n\n.stat-item__content[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.stat-item__value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.6rem;\n  font-weight: 800;\n  color: #fff;\n  letter-spacing: -0.02em;\n}\n\n.stat-item__label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: rgba(241, 246, 255, 0.55);\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n\n.stat-item__description[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.5rem;\n  font-size: 0.9rem;\n  line-height: 1.45;\n  color: rgba(226, 232, 240, 0.8);\n}\n\n\n\n.gradient-bridge[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  height: 80px;\n  background: linear-gradient(180deg,\n    rgba(22, 33, 62, 0.9) 0%,\n    rgba(22, 33, 62, 0.6) 20%,\n    rgba(248, 250, 252, 0.4) 60%,\n    var(--surface-light) 100%);\n}\n\n\n\n.proof[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 4.1rem 0 4.6rem;\n  background: linear-gradient(180deg, var(--surface-light) 0%, #eef3fb 100%);\n  color: var(--text-body);\n\n  .section-badge {\n    background: rgba(34, 197, 94, 0.1);\n    color: #15803d;\n  }\n\n  .section-subtitle {\n    color: var(--text-muted);\n  }\n}\n\n.proof__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1.25rem;\n}\n\n.proof-card[_ngcontent-%COMP%] {\n  padding: 1.4rem 1.45rem;\n  border-radius: var(--radius-lg);\n  background: rgba(255, 255, 255, 0.82);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);\n\n  h3 {\n    margin: 0 0 0.55rem;\n    font-size: 1.05rem;\n    font-weight: 750;\n    color: #0f172a;\n  }\n\n  p {\n    margin: 0;\n    color: var(--text-muted);\n    line-height: 1.6;\n    font-size: 0.94rem;\n  }\n}\n\n\n\n.journey[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 5.2rem 0 5rem;\n  background:\n    radial-gradient(circle at top right, rgba(102, 126, 234, 0.12), transparent 34%),\n    linear-gradient(180deg, #eef3fb 0%, #f8fafc 100%);\n  color: var(--text-body);\n\n  .section-badge {\n    background: rgba(14, 165, 233, 0.12);\n    color: #0369a1;\n  }\n\n  .section-subtitle {\n    color: var(--text-muted);\n    max-width: 680px;\n  }\n}\n\n.journey__inner[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 0.84fr) minmax(0, 1.16fr);\n  gap: clamp(1.8rem, 3vw, 3rem);\n  align-items: start;\n}\n\n.journey__steps[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n\n.journey__guide[_ngcontent-%COMP%] {\n  margin: 0;\n  max-width: 34rem;\n  color: #475569;\n  font-size: 0.95rem;\n  line-height: 1.65;\n}\n\n.journey__story[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n\n.journey-step[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n  text-align: left;\n  padding: 1.2rem 1.2rem;\n  border-radius: 1.15rem;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.78);\n  color: #0f172a;\n  cursor: pointer;\n  transition: transform 220ms, box-shadow 220ms, border-color 220ms, background 220ms, opacity 220ms;\n  min-height: 18rem;\n  opacity: 0.68;\n\n  strong {\n    font-size: 1.08rem;\n    line-height: 1.35;\n  }\n\n  p {\n    margin: 0;\n    color: #334155;\n    line-height: 1.65;\n    font-size: 0.95rem;\n  }\n\n  small {\n    color: var(--text-muted);\n    line-height: 1.5;\n    font-size: 0.88rem;\n    margin-top: auto;\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);\n  }\n\n  &--active {\n    opacity: 1;\n    border-color: rgba(102, 126, 234, 0.35);\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(237, 242, 255, 0.96));\n    box-shadow: 0 24px 44px rgba(102, 126, 234, 0.14);\n  }\n}\n\n.journey-step__index[_ngcontent-%COMP%], \n.journey-step__eyebrow[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.journey-step__index[_ngcontent-%COMP%] {\n  color: rgba(102, 126, 234, 0.65);\n}\n\n.journey-step__eyebrow[_ngcontent-%COMP%] {\n  color: #0369a1;\n}\n\n.journey__visual[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.journey__visual-shell[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 6.75rem;\n}\n\n.journey-panel[_ngcontent-%COMP%] {\n  display: none;\n  padding: 1.6rem;\n  border-radius: 1.5rem;\n  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.88));\n  color: #e2e8f0;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  box-shadow: 0 26px 64px rgba(15, 23, 42, 0.22);\n  min-height: 32rem;\n\n  &--active {\n    display: block;\n    animation: _ngcontent-%COMP%_fade-in-up 0.45s ease;\n  }\n}\n\n.journey-panel__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n\n.journey-panel__badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.35rem 0.7rem;\n  border-radius: 999px;\n  background: rgba(34, 211, 238, 0.12);\n  color: #67e8f9;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.journey-panel__status[_ngcontent-%COMP%] {\n  color: rgba(226, 232, 240, 0.64);\n  font-size: 0.82rem;\n  font-weight: 600;\n}\n\n.journey-panel__body[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.3rem;\n}\n\n.journey-panel__summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.45rem;\n  font-size: 1.35rem;\n  line-height: 1.2;\n  color: #f8fafc;\n}\n\n.journey-panel__summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.journey-panel__outcome[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(226, 232, 240, 0.78);\n  line-height: 1.65;\n}\n\n.journey-panel__label[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-bottom: 0.55rem;\n  color: rgba(148, 163, 184, 0.92);\n  font-size: 0.75rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.journey-panel__chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n}\n\n.journey-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.48rem 0.72rem;\n  border-radius: 999px;\n  background: rgba(102, 126, 234, 0.16);\n  border: 1px solid rgba(102, 126, 234, 0.22);\n  color: #e0e7ff;\n  font-size: 0.83rem;\n  font-weight: 600;\n}\n\n.journey-panel__metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n\n.journey-metric[_ngcontent-%COMP%] {\n  padding: 0.95rem 1rem;\n  border-radius: 1rem;\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n\n  strong {\n    display: block;\n    font-size: 1.05rem;\n    color: #f8fafc;\n    line-height: 1.3;\n  }\n\n  &--strong {\n    background: rgba(34, 197, 94, 0.12);\n    border-color: rgba(34, 197, 94, 0.24);\n  }\n\n  &--risk {\n    background: rgba(249, 115, 22, 0.12);\n    border-color: rgba(249, 115, 22, 0.24);\n  }\n}\n\n.journey-metric__label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.32rem;\n  color: rgba(226, 232, 240, 0.62);\n  font-size: 0.76rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.journey__indicators[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 0.6rem;\n  margin-top: 1rem;\n}\n\n.journey__dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  padding: 0;\n  border: none;\n  border-radius: 50%;\n  background: rgba(100, 116, 139, 0.35);\n  cursor: pointer;\n  transition: transform 200ms, background 200ms;\n\n  &--active {\n    background: #667eea;\n    transform: scale(1.25);\n  }\n}\n\n\n\n.highlights[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 4.75rem 0 5rem;\n  background:\n    radial-gradient(circle at top right, rgba(34, 211, 238, 0.1), transparent 26%),\n    radial-gradient(circle at bottom left, rgba(102, 126, 234, 0.12), transparent 30%),\n    linear-gradient(180deg, rgba(8, 15, 33, 0.82) 0%, rgba(11, 19, 38, 0.92) 100%);\n  color: var(--text-hero);\n\n  .section-badge {\n    background: rgba(125, 211, 252, 0.12);\n    color: #bae6fd;\n    border: 1px solid rgba(125, 211, 252, 0.18);\n  }\n\n  .section-subtitle {\n    color: rgba(241, 246, 255, 0.72);\n    max-width: 52rem;\n  }\n}\n\n.highlights__layout[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.75rem;\n}\n\n.highlights__showcase[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);\n  gap: 1.2rem;\n  align-items: stretch;\n}\n\n.highlights__player-shell[_ngcontent-%COMP%], \n.highlights__playlist[_ngcontent-%COMP%], \n.highlights__cta[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  background: rgba(255, 255, 255, 0.06);\n  backdrop-filter: blur(18px);\n  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.28);\n}\n\n.highlights__player-shell[_ngcontent-%COMP%] {\n  padding: 1.2rem;\n  border-radius: 1.6rem;\n}\n\n.highlights__player-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.9rem;\n\n  h3 {\n    margin: 0.3rem 0 0;\n    font-size: clamp(1.2rem, 2vw, 1.6rem);\n    font-weight: 800;\n    letter-spacing: -0.02em;\n  }\n}\n\n.highlights__eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.28rem 0.6rem;\n  border-radius: 999px;\n  background: rgba(102, 126, 234, 0.18);\n  color: #dbeafe;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.highlights__duration[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.55rem 0.75rem;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.7);\n  color: rgba(255, 255, 255, 0.86);\n  font-size: 0.85rem;\n  font-weight: 700;\n}\n\n.highlights__player[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  border-radius: 1.15rem;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  background: #020617;\n  object-fit: cover;\n  box-shadow: 0 22px 56px rgba(2, 6, 23, 0.42);\n}\n\n.highlights__summary[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  margin-top: 1rem;\n\n  p {\n    margin: 0;\n    color: rgba(241, 246, 255, 0.76);\n    line-height: 1.65;\n  }\n}\n\n.highlights__bullets[_ngcontent-%COMP%] {\n  list-style: none;\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.75rem;\n  padding: 0;\n  margin: 0;\n\n  li {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.55rem;\n    padding: 0.8rem 0.9rem;\n    border-radius: 1rem;\n    background: rgba(255, 255, 255, 0.06);\n    color: rgba(241, 246, 255, 0.92);\n    line-height: 1.45;\n  }\n\n  i {\n    color: #7dd3fc;\n    margin-top: 0.08rem;\n    flex-shrink: 0;\n  }\n}\n\n.highlights__playlist[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-radius: 1.6rem;\n  align-content: start;\n}\n\n.highlights__playlist-item[_ngcontent-%COMP%] {\n  width: 100%;\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  gap: 0.85rem;\n  align-items: center;\n  padding: 1rem;\n  border-radius: 1.15rem;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  background: rgba(15, 23, 42, 0.4);\n  color: inherit;\n  cursor: pointer;\n  text-align: left;\n  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    border-color: rgba(125, 211, 252, 0.26);\n    background: rgba(15, 23, 42, 0.58);\n  }\n\n  &--active {\n    border-color: rgba(34, 211, 238, 0.35);\n    background: linear-gradient(135deg, rgba(29, 78, 216, 0.32), rgba(15, 23, 42, 0.7));\n    box-shadow: inset 0 0 0 1px rgba(125, 211, 252, 0.16);\n  }\n}\n\n.highlights__playlist-index[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.25rem;\n  height: 2.25rem;\n  border-radius: 0.85rem;\n  background: rgba(255, 255, 255, 0.08);\n  color: #e0ecff;\n  font-size: 0.82rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n}\n\n.highlights__playlist-copy[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: grid;\n  gap: 0.28rem;\n\n  strong {\n    font-size: 0.98rem;\n    font-weight: 750;\n    letter-spacing: -0.01em;\n  }\n\n  small {\n    color: rgba(241, 246, 255, 0.64);\n    font-size: 0.82rem;\n    line-height: 1.45;\n  }\n}\n\n.highlights__playlist-duration[_ngcontent-%COMP%] {\n  color: rgba(241, 246, 255, 0.72);\n  font-size: 0.82rem;\n  font-weight: 700;\n}\n\n.highlights__playlist-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-self: start;\n  padding: 0.58rem 0.85rem;\n  border-radius: 0.8rem;\n  background: rgba(37, 99, 235, 0.2);\n  border: 1px solid rgba(96, 165, 250, 0.25);\n  color: #dbeafe;\n  font-size: 0.82rem;\n  font-weight: 700;\n  text-decoration: none;\n  transition: background 180ms ease, transform 180ms ease;\n\n  &:hover {\n    background: rgba(37, 99, 235, 0.3);\n    transform: translateY(-1px);\n  }\n}\n\n.highlights__resource-card[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.7rem;\n  padding: 1rem;\n  border-radius: 1.15rem;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  background: rgba(15, 23, 42, 0.34);\n\n  p {\n    margin: 0;\n    color: rgba(241, 246, 255, 0.72);\n    line-height: 1.6;\n  }\n\n  ul {\n    margin: 0;\n    padding-left: 1.1rem;\n    color: rgba(241, 246, 255, 0.84);\n    display: grid;\n    gap: 0.45rem;\n  }\n}\n\n.highlights__resource-label[_ngcontent-%COMP%] {\n  color: #bfdbfe;\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.highlights__cta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 1.15rem;\n  border-radius: 1.3rem;\n\n  p {\n    margin: 0;\n    color: rgba(241, 246, 255, 0.76);\n    line-height: 1.55;\n  }\n}\n\n\n\n.section-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 0.3rem 0.85rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  border-radius: 999px;\n  margin-bottom: 0.75rem;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  margin: 0 0 0.5rem;\n  font-size: clamp(1.6rem, 3vw, 2.4rem);\n  font-weight: 800;\n  letter-spacing: -0.02em;\n}\n\n.section-subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 2.5rem;\n  font-size: 1.05rem;\n  line-height: 1.6;\n  max-width: 40rem;\n}\n\n\n\n.features[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 5rem 0;\n  background: var(--surface-light);\n  color: var(--text-body);\n\n  .section-badge {\n    background: rgba(102, 126, 234, 0.1);\n    color: var(--accent);\n  }\n\n  .section-subtitle {\n    color: var(--text-muted);\n  }\n}\n\n\n\n.trust[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 4.35rem 0 4.7rem;\n  background: linear-gradient(180deg, #f8fafc 0%, #eef3fb 100%);\n  color: var(--text-body);\n\n  .section-badge {\n    background: rgba(34, 197, 94, 0.1);\n    color: #15803d;\n  }\n\n  .section-subtitle {\n    color: var(--text-muted);\n  }\n}\n\n.trust__grid[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.trust__layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(280px, 0.72fr) minmax(0, 1.28fr);\n  gap: clamp(1.5rem, 2.5vw, 2.5rem);\n  align-items: start;\n}\n\n.trust__intro[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 6.5rem;\n}\n\n.trust__stream[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n\n.trust-card[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 8.5rem minmax(0, 1fr);\n  gap: 1.2rem;\n  align-items: start;\n  padding: 1.2rem 1.25rem;\n  border-radius: 1.15rem;\n  background: rgba(255, 255, 255, 0.86);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.06);\n}\n\n.trust-card__eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 2rem;\n  color: #0f766e;\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.trust-card__body[_ngcontent-%COMP%] {\n  h3 {\n    margin: 0 0 0.42rem;\n    font-size: 0.98rem;\n    color: #0f172a;\n  }\n\n  p {\n    margin: 0;\n    color: var(--text-muted);\n    line-height: 1.58;\n    font-size: 0.91rem;\n  }\n}\n\n.features__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1.25rem;\n}\n\n.feature-card[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  border-radius: var(--radius-lg);\n  background: var(--surface-white);\n  border: 1px solid #e2e8f0;\n  transition: transform 300ms, box-shadow 300ms;\n  will-change: transform;\n  transform-style: preserve-3d;\n  position: relative;\n  overflow: hidden;\n\n  &::after {\n    content: '';\n    position: absolute;\n    inset: 0;\n    border-radius: inherit;\n    background: radial-gradient(\n      300px circle at var(--glow-x, 50%) var(--glow-y, 50%),\n      rgba(102, 126, 234, 0.12),\n      transparent 60%\n    );\n    opacity: 0;\n    transition: opacity 400ms;\n    pointer-events: none;\n  }\n\n  &:hover::after {\n    opacity: 1;\n  }\n\n  &:hover {\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 0 30px rgba(102, 126, 234, 0.08);\n  }\n\n  h3 {\n    margin: 0.85rem 0 0.4rem;\n    font-size: 1.1rem;\n    font-weight: 700;\n    color: var(--text-body);\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.92rem;\n    line-height: 1.6;\n    color: var(--text-muted);\n  }\n}\n\n.feature-card__icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 12px;\n  font-size: 1.15rem;\n  color: #fff;\n\n  &--primary { background: var(--accent-gradient); }\n  &--cyan { background: linear-gradient(135deg, #22d3ee, #06b6d4); }\n  &--green { background: linear-gradient(135deg, #4ade80, #22c55e); }\n  &--purple { background: linear-gradient(135deg, #a855f7, #9333ea); }\n  &--orange { background: linear-gradient(135deg, #fb923c, #f97316); }\n  &--slate { background: linear-gradient(135deg, #94a3b8, #64748b); }\n}\n\n\n\n.how-it-works[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 5rem 0;\n  background: var(--surface-white);\n  color: var(--text-body);\n\n  .section-badge {\n    background: rgba(34, 211, 238, 0.1);\n    color: #0891b2;\n  }\n\n  .section-subtitle {\n    color: var(--text-muted);\n  }\n}\n\n.how-it-works__steps[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1.5rem;\n  counter-reset: step;\n}\n\n.step-card[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 1.5rem;\n  border-radius: var(--radius-lg);\n  background: var(--surface-light);\n  border: 1px solid #e2e8f0;\n  text-align: center;\n\n  h3 {\n    margin: 0.75rem 0 0.4rem;\n    font-size: 1.1rem;\n    font-weight: 700;\n    color: var(--text-body);\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.92rem;\n    line-height: 1.6;\n    color: var(--text-muted);\n  }\n}\n\n.step-card__number[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: var(--accent-gradient);\n  color: #fff;\n  font-size: 1.15rem;\n  font-weight: 800;\n}\n\n\n\n.pricing[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 5rem 0;\n  background: var(--surface-light);\n  color: var(--text-body);\n  text-align: center;\n\n  .section-badge {\n    background: rgba(168, 85, 247, 0.1);\n    color: var(--purple);\n  }\n}\n\n.pricing__card[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 480px;\n  margin: 0 auto;\n  padding: 2.5rem 2rem;\n  border-radius: var(--radius-xl);\n  background: var(--surface-white);\n  border: 2px solid var(--accent);\n  box-shadow: 0 24px 48px rgba(102, 126, 234, 0.12);\n  text-align: left;\n}\n\n.pricing__term[_ngcontent-%COMP%] {\n  max-width: 38rem;\n}\n\n.pricing__badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -0.75rem;\n  left: 50%;\n  transform: translateX(-50%);\n  padding: 0.3rem 1rem;\n  border-radius: 999px;\n  background: var(--accent-gradient);\n  color: #fff;\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\n.pricing__plan[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 1rem;\n  font-size: 1.4rem;\n  font-weight: 800;\n  color: var(--text-body);\n}\n\n.pricing__amount[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.5rem;\n  font-weight: 800;\n  color: var(--accent);\n}\n\n.pricing__term[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.2rem;\n  font-size: 0.9rem;\n  color: var(--text-muted);\n}\n\n.pricing__features[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 1.5rem 0;\n  padding: 0;\n\n  li {\n    display: flex;\n    align-items: center;\n    gap: 0.55rem;\n    padding: 0.45rem 0;\n    font-size: 0.95rem;\n    color: var(--text-body);\n    border-bottom: 1px solid #f1f5f9;\n\n    &:last-child { border-bottom: none; }\n\n    i {\n      color: var(--green);\n      font-size: 1rem;\n    }\n  }\n}\n\n.pricing__cta[_ngcontent-%COMP%] {\n  width: 100%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  padding: 0.85rem 1.5rem;\n  font-family: inherit;\n  font-size: 1rem;\n  font-weight: 700;\n  border: none;\n  border-radius: 0.65rem;\n  background: var(--accent-gradient);\n  color: #fff;\n  cursor: pointer;\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.35);\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 10px 28px rgba(102, 126, 234, 0.5);\n  }\n\n  i { font-size: 0.95rem; }\n}\n\n\n\n.final-cta[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 5rem 0;\n  background: var(--hero-bg);\n  text-align: center;\n  overflow: hidden;\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background: radial-gradient(ellipse at 50% 40%, rgba(102, 126, 234, 0.15), transparent 65%);\n    pointer-events: none;\n  }\n}\n\n\n\n.commercial[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 4.8rem 0;\n  background:\n    radial-gradient(circle at top left, rgba(102, 126, 234, 0.12), transparent 30%),\n    linear-gradient(180deg, #f3f6fd 0%, #eef2ff 100%);\n  color: var(--text-body);\n\n  .section-badge {\n    background: rgba(99, 102, 241, 0.1);\n    color: #4338ca;\n  }\n\n  .section-subtitle {\n    color: var(--text-muted);\n    max-width: 640px;\n  }\n}\n\n.commercial__inner[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(320px, 390px);\n  gap: clamp(1.5rem, 2.6vw, 2.6rem);\n  align-items: start;\n}\n\n.commercial__faq[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.commercial__faq-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n\n.commercial-faq-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(220px, 0.7fr) minmax(0, 1.3fr);\n  gap: 1.35rem;\n  padding: 1.1rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n\n  h3 {\n    margin: 0;\n    font-size: 1rem;\n    color: #0f172a;\n    line-height: 1.45;\n  }\n\n  p {\n    margin: 0;\n    color: var(--text-muted);\n    line-height: 1.6;\n  }\n}\n\n.commercial-checklist[_ngcontent-%COMP%] {\n  padding: 1.4rem;\n  border-radius: 1.15rem;\n  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.92));\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  box-shadow: 0 24px 52px rgba(15, 23, 42, 0.18);\n  color: #e2e8f0;\n\n  h3 {\n    margin: 0 0 1rem;\n    font-size: 1.18rem;\n    line-height: 1.3;\n    color: #f8fafc;\n  }\n\n  ul {\n    list-style: none;\n    margin: 0 0 1.2rem;\n    padding: 0;\n    display: grid;\n    gap: 0.75rem;\n  }\n\n  li {\n    display: flex;\n    gap: 0.65rem;\n    align-items: flex-start;\n    color: rgba(226, 232, 240, 0.84);\n    line-height: 1.55;\n    font-size: 0.92rem;\n  }\n\n  i {\n    color: #67e8f9;\n    margin-top: 0.08rem;\n    flex-shrink: 0;\n  }\n}\n\n.commercial-checklist__eyebrow[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-bottom: 0.7rem;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: #93c5fd;\n}\n\n.final-cta__inner[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 42rem;\n  margin-inline: auto;\n\n  h2 {\n    margin: 0 0 0.75rem;\n    font-size: clamp(1.7rem, 3vw, 2.6rem);\n    font-weight: 800;\n    color: var(--text-hero);\n    letter-spacing: -0.02em;\n  }\n\n  p {\n    margin: 0 auto 1.5rem;\n    max-width: 34rem;\n    font-size: 1.05rem;\n    color: rgba(241, 246, 255, 0.65);\n    line-height: 1.6;\n  }\n}\n\n.final-cta__confidence[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.9rem;\n  color: rgba(191, 219, 254, 0.78);\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\n\n\n\n.footer[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 3.5rem 0 0;\n  background: var(--footer-bg);\n  color: rgba(241, 246, 255, 0.7);\n}\n\n.footer__grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(260px, 2fr) repeat(3, minmax(180px, 1fr));\n  gap: 2rem;\n}\n\n.footer__brand[_ngcontent-%COMP%] {\n  p {\n    margin: 0.75rem 0 0;\n    font-size: 0.9rem;\n    color: rgba(241, 246, 255, 0.55);\n    line-height: 1.5;\n    max-width: 260px;\n  }\n}\n\n.footer__col[_ngcontent-%COMP%] {\n  h4 {\n    margin: 0 0 0.75rem;\n    font-size: 0.85rem;\n    font-weight: 700;\n    color: rgba(255, 255, 255, 0.9);\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n  }\n\n  ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n\n    li {\n      margin-bottom: 0.4rem;\n    }\n\n    a {\n      font-size: 0.88rem;\n      color: rgba(241, 246, 255, 0.6);\n      text-decoration: none;\n      cursor: pointer;\n      transition: color 200ms;\n\n      &:hover { color: #fff; }\n    }\n  }\n}\n\n.footer__bottom[_ngcontent-%COMP%] {\n  margin-top: 2.5rem;\n  padding: 1.25rem 0;\n  border-top: 1px solid rgba(255, 255, 255, 0.08);\n  font-size: 0.82rem;\n  color: rgba(241, 246, 255, 0.4);\n}\n\n\n\n.demo-modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 0.8rem;\n  padding: 0.2rem 0.2rem 0;\n\n  h3 { margin: 0; font-size: clamp(1.15rem, 2vw, 1.5rem); }\n  p { margin: 0.35rem 0 0; color: rgba(223, 236, 255, 0.78); }\n}\n\n.demo-modal-header[_ngcontent-%COMP%]   .hero-brand[_ngcontent-%COMP%] { margin-bottom: 0.45rem; }\n\n.demo-form[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.95rem;\n  padding: 0.2rem;\n}\n\n.field-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}\n\n.field-grid[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%], \n.field-textarea[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.42rem;\n  font-size: 0.85rem;\n  color: rgba(233, 241, 255, 0.92);\n}\n\n[_nghost-%COMP%]     .field-grid .p-iftalabel, \n[_nghost-%COMP%]     .field-textarea .p-iftalabel {\n  display: block;\n  width: 100%;\n}\n\n[_nghost-%COMP%]     .field-grid .p-select, \n[_nghost-%COMP%]     .field-grid .p-datepicker {\n  width: 100%;\n}\n\n[_nghost-%COMP%]     .field-grid .p-inputtext, \n[_nghost-%COMP%]     .field-grid .p-select, \n[_nghost-%COMP%]     .field-grid .p-datepicker-input, \n[_nghost-%COMP%]     .field-textarea textarea {\n  border: 1px solid rgba(200, 222, 255, 0.26);\n  background: rgba(255, 255, 255, 0.08);\n  color: #f6fbff;\n  border-radius: 0.65rem;\n  padding: 1.08rem 0.72rem 0.52rem;\n  font: inherit;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n[_nghost-%COMP%]     .field-grid .p-inputtext::placeholder, \n[_nghost-%COMP%]     .field-grid .p-datepicker-input::placeholder, \n[_nghost-%COMP%]     .field-textarea textarea::placeholder {\n  color: rgba(225, 238, 255, 0.45);\n}\n\n[_nghost-%COMP%]     .field-grid .p-inputtext:focus, \n[_nghost-%COMP%]     .field-grid .p-select.p-focus, \n[_nghost-%COMP%]     .field-grid .p-datepicker-input:focus, \n[_nghost-%COMP%]     .field-textarea textarea:focus {\n  outline: none;\n  border-color: rgba(102, 126, 234, 0.72);\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.18);\n}\n\n[_nghost-%COMP%]     .field-textarea textarea {\n  resize: vertical;\n  min-height: 118px;\n}\n\n[_nghost-%COMP%]     .field-grid .p-iftalabel label, \n[_nghost-%COMP%]     .field-textarea .p-iftalabel label {\n  color: rgba(221, 235, 255, 0.8);\n  font-size: 0.78rem;\n}\n\n[_nghost-%COMP%]     .field-grid .p-select-label {\n  color: rgba(246, 251, 255, 0.9);\n}\n\n[_nghost-%COMP%]     .field-grid .p-inputtext, \n[_nghost-%COMP%]     .field-grid .p-select, \n[_nghost-%COMP%]     .field-grid .p-datepicker .p-inputtext {\n  min-height: 3rem;\n}\n\n.form-error[_ngcontent-%COMP%] {\n  color: rgba(255, 156, 156, 0.96);\n  font-size: 0.74rem;\n}\n\n.demo-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.55rem;\n  padding-top: 0.2rem;\n}\n\n.demo-contact-note[_ngcontent-%COMP%] {\n  margin: 0.15rem 0 0;\n  font-size: 0.78rem;\n  color: rgba(201, 217, 242, 0.78);\n  text-align: right;\n\n  a {\n    color: rgba(147, 197, 253, 0.95);\n    text-decoration: none;\n    &:hover { text-decoration: underline; }\n  }\n}\n\n\n\n[_nghost-%COMP%]     .ne-btn.p-button {\n  font-family: 'Manrope', sans-serif;\n  font-weight: 700;\n  font-size: 0.92rem;\n  border-radius: 0.55rem;\n  padding: 0.55rem 1.1rem;\n  transition: all 200ms;\n}\n\n[_nghost-%COMP%]     .ne-btn--primary.p-button {\n  background: var(--accent-gradient);\n  border: 1px solid rgba(102, 126, 234, 0.4);\n  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.35);\n}\n\n[_nghost-%COMP%]     .ne-btn--ghost.p-button {\n  background: rgba(255, 255, 255, 0.08);\n  color: #ffffff;\n  border-color: rgba(255, 255, 255, 0.2);\n}\n\n[_nghost-%COMP%]     .ne-btn--link.p-button {\n  background: transparent;\n  color: rgba(255, 255, 255, 0.92);\n}\n\n[_nghost-%COMP%]     .demo-dialog {\n  border-radius: 1.1rem;\n  border: 1px solid rgba(140, 180, 255, 0.34);\n  background:\n    radial-gradient(circle at 90% 8%, rgba(102, 126, 234, 0.16), transparent 35%),\n    linear-gradient(180deg, rgba(22, 32, 62, 0.96), rgba(17, 27, 54, 0.97));\n  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.52);\n  color: #f5f8ff;\n}\n\n[_nghost-%COMP%]     .demo-dialog .p-dialog-header {\n  background: transparent;\n  border-bottom: 1px solid rgba(140, 180, 255, 0.18);\n  padding: 1rem 1rem 0.8rem;\n}\n\n[_nghost-%COMP%]     .demo-dialog .p-dialog-content {\n  background: transparent;\n  padding: 0.8rem 1rem 1rem;\n  max-height: min(80dvh, 760px);\n}\n\n[_nghost-%COMP%]     .demo-dialog .p-dialog-header-close-button {\n  color: rgba(255, 255, 255, 0.86);\n}\n\n.demo-success-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n}\n\n.demo-success-header[_ngcontent-%COMP%]   .hero-brand[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n\n.demo-success-body[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 0.6rem;\n  color: rgba(233, 241, 255, 0.92);\n  &:last-child { margin-bottom: 0; }\n}\n\n[_nghost-%COMP%]     .demo-success-dialog {\n  border-radius: 1rem;\n  border: 1px solid rgba(140, 180, 255, 0.34);\n  background:\n    radial-gradient(circle at 80% 10%, rgba(102, 126, 234, 0.14), transparent 34%),\n    linear-gradient(180deg, rgba(22, 32, 62, 0.96), rgba(17, 27, 54, 0.97));\n  color: #f5f8ff;\n}\n\n[_nghost-%COMP%]     .demo-success-dialog .p-dialog-header, \n[_nghost-%COMP%]     .demo-success-dialog .p-dialog-content, \n[_nghost-%COMP%]     .demo-success-dialog .p-dialog-footer {\n  background: transparent;\n}\n\n.demo-kicker[_ngcontent-%COMP%] {\n  margin: 0 0 0.35rem;\n  font-size: 0.68rem;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n  color: rgba(197, 217, 255, 0.72);\n}\n\n\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(40px, -25px) scale(1.08); }\n  50% { transform: translate(80px, 15px) scale(0.92); }\n  75% { transform: translate(25px, 40px) scale(1.04); }\n}\n\n@keyframes _ngcontent-%COMP%_crm-shimmer {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes _ngcontent-%COMP%_crm-aura {\n  0%, 100% { opacity: 0.3; transform: scale(0.98); }\n  50% { opacity: 0.7; transform: scale(1.08); }\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from { opacity: 0; transform: translateY(24px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n\n\n@media (max-width: 1024px) {\n  .hero[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1.6rem;\n    min-height: auto;\n    padding-top: 5.75rem;\n    padding-bottom: 3rem;\n  }\n\n  .hero__content[_ngcontent-%COMP%] { text-align: center; }\n  .hero-brand[_ngcontent-%COMP%] { justify-content: center; }\n\n  .hero-proof-badge[_ngcontent-%COMP%] {\n    margin-inline: auto;\n  }\n\n  .hero__content[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n\n  .hero-proof-points[_ngcontent-%COMP%] {\n    justify-items: center;\n    max-width: 34rem;\n    margin-inline: auto;\n  }\n  .hero__subtitle-wrap[_ngcontent-%COMP%] {\n    margin-inline: auto;\n    max-width: 34rem;\n    min-height: 5.2em;\n  }\n  .hero__cta[_ngcontent-%COMP%] { justify-content: center; }\n  .hero__cta-note[_ngcontent-%COMP%] {\n    margin-inline: auto;\n    text-align: center;\n  }\n  .hero-manifesto[_ngcontent-%COMP%] {\n    max-width: 34rem;\n    margin-inline: auto;\n    text-align: center;\n    border-left: none;\n    border-top: 3px solid rgba(125, 211, 252, 0.5);\n    border-radius: 0 0 0.5rem 0.5rem;\n  }\n\n  .hero__visual[_ngcontent-%COMP%] {\n    max-width: min(860px, 100%);\n    margin: 0 auto;\n    justify-self: center;\n    transform: none;\n  }\n\n  .hero__visual[_ngcontent-%COMP%]::before, \n   .hero__visual[_ngcontent-%COMP%]::after {\n    opacity: 0.72;\n    filter: blur(40px);\n  }\n\n  .journey__inner[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .journey__visual[_ngcontent-%COMP%] {\n    order: -1;\n  }\n\n  .journey__visual-shell[_ngcontent-%COMP%] {\n    position: relative;\n    top: auto;\n  }\n\n  .highlights__showcase[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .highlights__bullets[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .features__grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .trust__grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .trust__layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .trust__intro[_ngcontent-%COMP%] {\n    position: relative;\n    top: auto;\n  }\n\n  .trust-card[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0.5rem;\n  }\n\n  .commercial__inner[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .footer__grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    gap: 1.5rem;\n  }\n\n  .footer__brand[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n  }\n}\n\n@media (max-width: 768px) {\n  .shell[_ngcontent-%COMP%] { width: calc(100% - 1.5rem); }\n\n  .topbar[_ngcontent-%COMP%] {\n    padding: 0.6rem 0;\n  }\n\n  .topbar__inner[_ngcontent-%COMP%] {\n    gap: 0.85rem;\n  }\n\n  .topbar__logo[_ngcontent-%COMP%] {\n    height: 36px;\n  }\n\n  .topbar__nav[_ngcontent-%COMP%] {\n    display: none;\n    &--open {\n      display: flex;\n      flex-direction: column;\n      position: absolute;\n      top: 100%;\n      left: 0;\n      right: 0;\n      background: rgba(15, 20, 40, 0.95);\n      backdrop-filter: blur(20px);\n      padding: 0.75rem 1rem 1rem;\n      border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n      box-shadow: 0 18px 36px rgba(0, 0, 0, 0.28);\n\n      li a {\n        display: block;\n        padding: 0.65rem 0.85rem;\n      }\n    }\n  }\n\n  .topbar__actions[_ngcontent-%COMP%] { display: none; }\n  .topbar__hamburger[_ngcontent-%COMP%] { display: flex; }\n\n  .topbar__nav-actions[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .hero__visual[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n\n  .kpi-carousel[_ngcontent-%COMP%] {\n    min-height: 320px;\n    aspect-ratio: 4 / 3;\n    transform: none;\n  }\n\n  .kpi-carousel__frame[_ngcontent-%COMP%] {\n    top: 0.75rem;\n    left: 0.75rem;\n    right: 0.75rem;\n  }\n\n  .kpi-carousel__label[_ngcontent-%COMP%] {\n    top: 3.35rem;\n  }\n\n  .kpi-carousel__slide[_ngcontent-%COMP%] {\n    padding: 4.4rem 1rem 3rem;\n  }\n\n  .preview-note-list[_ngcontent-%COMP%], \n   .preview-deal-grid[_ngcontent-%COMP%], \n   .preview-property-metrics[_ngcontent-%COMP%], \n   .preview-kpi-stage-row[_ngcontent-%COMP%], \n   .preview-kpi-metrics[_ngcontent-%COMP%], \n   .preview-orchestration-metrics[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-score[_ngcontent-%COMP%], \n   .preview-stage__top[_ngcontent-%COMP%], \n   .preview-feed[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n   .preview-property-hero[_ngcontent-%COMP%], \n   .preview-deal-header[_ngcontent-%COMP%], \n   .preview-kpi-board__header[_ngcontent-%COMP%], \n   .preview-orchestration-card[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .preview-orchestration-card[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-orchestration-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .preview-score__ring[_ngcontent-%COMP%] {\n    width: 6.2rem;\n    height: 6.2rem;\n  }\n\n  .journey[_ngcontent-%COMP%] {\n    padding: 4rem 0;\n  }\n\n  .journey__story[_ngcontent-%COMP%] {\n    gap: 0.85rem;\n  }\n\n  .journey-panel[_ngcontent-%COMP%] {\n    padding: 1.2rem;\n    min-height: auto;\n  }\n\n  .highlights[_ngcontent-%COMP%] {\n    padding: 4rem 0;\n  }\n\n  .highlights__player-shell[_ngcontent-%COMP%], \n   .highlights__playlist[_ngcontent-%COMP%] {\n    padding: 0.95rem;\n  }\n\n  .highlights__cta[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .journey-panel__header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .topbar__nav--open[_ngcontent-%COMP%]   .topbar__nav-actions[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n    padding: 0.5rem 0.85rem 0.25rem;\n    border-top: 1px solid rgba(255, 255, 255, 0.08);\n    margin-top: 0.5rem;\n\n    .nav-btn {\n      width: 100%;\n      text-align: center;\n      justify-content: center;\n    }\n  }\n\n  .hero[_ngcontent-%COMP%] {\n    padding-top: 4.7rem;\n    padding-bottom: 2.4rem;\n    gap: 1.25rem;\n  }\n\n  .hero__title[_ngcontent-%COMP%] { font-size: clamp(1.8rem, 7vw, 2.8rem); }\n\n  .hero-proof-badge[_ngcontent-%COMP%] {\n    max-width: 100%;\n    font-size: 0.76rem;\n    line-height: 1.45;\n    padding: 0.5rem 0.8rem;\n  }\n\n  .hero__subtitle-wrap[_ngcontent-%COMP%] {\n    min-height: auto;\n    margin: 0.95rem auto 1.35rem;\n  }\n\n  .hero__subtitle[_ngcontent-%COMP%] {\n    font-size: 0.98rem;\n    line-height: 1.6;\n    max-width: 100%;\n\n    &:not(.hero__subtitle--active) {\n      display: none;\n    }\n\n    &--active {\n      position: relative;\n    }\n  }\n\n  .hero__title-text[_ngcontent-%COMP%] {\n    &:not(.hero__title-text--active) {\n      display: none;\n    }\n\n    &.hero__title-text--active {\n      position: relative;\n    }\n  }\n\n  .hero-proof-points[_ngcontent-%COMP%] {\n    gap: 0.55rem;\n\n    li {\n      font-size: 0.9rem;\n      text-align: left;\n    }\n  }\n\n  .hero__cta[_ngcontent-%COMP%] {\n    gap: 0.6rem;\n  }\n\n  .hero__cta-note[_ngcontent-%COMP%] {\n    justify-items: center;\n    text-align: center;\n  }\n\n  .hero-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n\n  .features__grid[_ngcontent-%COMP%], \n   .proof__grid[_ngcontent-%COMP%], \n   .how-it-works__steps[_ngcontent-%COMP%], \n   .trust__grid[_ngcontent-%COMP%], \n   .journey-panel__metrics[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .commercial-faq-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 0.55rem;\n  }\n\n  .journey-step[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n\n  .commercial[_ngcontent-%COMP%] {\n    padding: 4rem 0;\n  }\n\n  .proof[_ngcontent-%COMP%], \n   .trust[_ngcontent-%COMP%], \n   .how-it-works[_ngcontent-%COMP%], \n   .pricing[_ngcontent-%COMP%] {\n    padding-top: 4rem;\n    padding-bottom: 4rem;\n  }\n\n  .commercial-checklist[_ngcontent-%COMP%] {\n    padding: 1.2rem;\n  }\n\n  .stats-bar__inner[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 0.75rem;\n  }\n\n  .field-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; }\n\n  [_nghost-%COMP%]     .demo-dialog .p-dialog-header {\n    padding: 0.9rem 0.9rem 0.65rem;\n  }\n\n  [_nghost-%COMP%]     .demo-dialog .p-dialog-content {\n    padding: 0.7rem 0.9rem 0.9rem;\n    max-height: min(84dvh, 760px);\n  }\n\n  .demo-modal-header[_ngcontent-%COMP%] {\n    gap: 0.55rem;\n  }\n\n  .footer__grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .shell[_ngcontent-%COMP%] {\n    width: calc(100% - 1rem);\n  }\n\n  .topbar__nav--open[_ngcontent-%COMP%] {\n    left: 0.5rem;\n    right: 0.5rem;\n    border-radius: 0 0 1rem 1rem;\n  }\n\n  .hero[_ngcontent-%COMP%] {\n    padding-top: 4.35rem;\n    padding-bottom: 2rem;\n  }\n\n  .hero-brand[_ngcontent-%COMP%] {\n    margin-bottom: 0.65rem;\n  }\n\n  .hero-brand-wordmark[_ngcontent-%COMP%] {\n    font-size: 0.68rem;\n    letter-spacing: 0.16em;\n  }\n\n  .hero-brand-crm[_ngcontent-%COMP%] {\n    font-size: 0.98rem;\n  }\n\n  .hero-proof-badge[_ngcontent-%COMP%] {\n    border-radius: 1rem;\n  }\n\n  .hero__title[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n\n  .hero__subtitle-wrap[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n\n  .hero__cta[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n\n    .hero-btn { justify-content: center; }\n  }\n\n  .hero-proof-points[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    font-size: 0.86rem;\n  }\n\n  .journey-step[_ngcontent-%COMP%] {\n    padding: 0.95rem 1rem;\n  }\n\n  .highlights__player-meta[_ngcontent-%COMP%], \n   .highlights__playlist-item[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .highlights__duration[_ngcontent-%COMP%], \n   .highlights__playlist-duration[_ngcontent-%COMP%] {\n    justify-self: start;\n  }\n\n  .journey-panel__summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.15rem;\n  }\n\n  .journey-chip[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n\n  .commercial-faq-card[_ngcontent-%COMP%], \n   .trust-card[_ngcontent-%COMP%] {\n    padding: 1.05rem 1rem;\n  }\n\n  .hero__cta-note[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .final-cta__confidence[_ngcontent-%COMP%] {\n    font-size: 0.84rem;\n  }\n\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 1.45rem;\n  }\n\n  .section-subtitle[_ngcontent-%COMP%] {\n    margin-bottom: 1.8rem;\n    font-size: 0.96rem;\n  }\n\n  .pricing__card[_ngcontent-%COMP%] { padding: 2rem 1.25rem; }\n\n  .stats-bar__inner[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .stat-item[_ngcontent-%COMP%] {\n    padding: 0.75rem 1rem;\n  }\n\n  .gradient-bridge[_ngcontent-%COMP%] {\n    height: 50px;\n  }\n\n  .kpi-carousel[_ngcontent-%COMP%] {\n    min-height: 240px;\n    border-radius: 1rem;\n  }\n\n  .hero__visual[_ngcontent-%COMP%]::before, \n   .hero__visual[_ngcontent-%COMP%]::after {\n    opacity: 0.58;\n    filter: blur(34px);\n  }\n\n  .kpi-carousel__slide[_ngcontent-%COMP%] {\n    padding: 4rem 0.75rem 2.7rem;\n  }\n\n  .preview-shell[_ngcontent-%COMP%] {\n    padding: 0.95rem;\n  }\n\n  .preview-kpi-board__total[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n   .preview-property-price[_ngcontent-%COMP%] {\n    font-size: 1.55rem;\n  }\n\n  .preview-score__summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n   .preview-deal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n   .preview-property-hero[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n   .preview-kpi-board__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1.05rem;\n  }\n\n  .preview-factor[_ngcontent-%COMP%], \n   .preview-stage[_ngcontent-%COMP%], \n   .preview-feed[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n   .preview-deal-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n   .preview-property-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n   .preview-note-list[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n   .preview-kpi-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n   .preview-orchestration-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n   .preview-orchestration-card[_ngcontent-%COMP%] {\n    padding: 0.72rem 0.78rem;\n  }\n\n  .preview-factor-list[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n\n  .preview-kpi-stage[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 1.45rem;\n  }\n\n  .preview-orchestration-actions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .kpi-carousel__label[_ngcontent-%COMP%] {\n    top: 0.75rem;\n    left: 0.75rem;\n    font-size: 0.68rem;\n    padding: 0.25rem 0.65rem;\n  }\n\n  .kpi-carousel__indicators[_ngcontent-%COMP%] {\n    bottom: 0.8rem;\n  }\n\n  [_nghost-%COMP%]     .demo-dialog {\n    border-radius: 0.9rem;\n  }\n}\n\n@media (max-width: 640px) {\n  .preview-factor-list[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-factor[_ngcontent-%COMP%] {\n    min-height: auto;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .orb[_ngcontent-%COMP%], \n   .hero-brand-crm[_ngcontent-%COMP%], \n   .hero-brand-crm[_ngcontent-%COMP%]::after, \n   .kpi-carousel[_ngcontent-%COMP%], \n   .kpi-carousel__track[_ngcontent-%COMP%], \n   .preview-shell[_ngcontent-%COMP%]::before, \n   .preview-shell[_ngcontent-%COMP%]::after, \n   .preview-kpi-stage[_ngcontent-%COMP%]::before, \n   .preview-kpi-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n   .preview-factor[_ngcontent-%COMP%]::before, \n   .preview-deal-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n   .preview-property-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n   .preview-feed[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n   .preview-orchestration-metrics[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]::before, \n   .preview-orchestration-card[_ngcontent-%COMP%]::before, \n   .preview-score__ring[_ngcontent-%COMP%]::after, \n   .preview-orchestration-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]::before {\n    animation: none !important;\n    transition: none !important;\n  }\n\n  .scroll-animate[_ngcontent-%COMP%] {\n    opacity: 1;\n    transform: none;\n    transition: none;\n  }\n\n  .feature-card[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_liquid-drift {\n  0% {\n    transform: translate3d(0, 0, 0) scale(1) rotate(0deg);\n  }\n  33% {\n    transform: translate3d(10px, -8px, 0) scale(1.06) rotate(6deg);\n  }\n  66% {\n    transform: translate3d(-8px, 10px, 0) scale(0.96) rotate(-5deg);\n  }\n  100% {\n    transform: translate3d(0, 0, 0) scale(1) rotate(0deg);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_liquid-pulse {\n  0%, 100% {\n    opacity: 0.4;\n    transform: scale(0.96);\n  }\n  50% {\n    opacity: 0.78;\n    transform: scale(1.03);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_liquid-sheen {\n  0% {\n    transform: translateX(-180%) rotate(18deg);\n    opacity: 0;\n  }\n  15% {\n    opacity: 1;\n  }\n  55% {\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(280%) rotate(18deg);\n    opacity: 0;\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LandingPage, [{
        type: Component,
        args: [{ selector: 'app-landing-page', standalone: true, imports: [
                    CommonModule,
                    RouterModule,
                    ButtonModule,
                    ReactiveFormsModule,
                    DialogModule,
                    InputTextModule,
                    SelectModule,
                    DatePickerModule,
                    TextareaModule,
                    IftaLabelModule
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<main class=\"landing\">\n  <!-- Background -->\n  <div class=\"landing-bg\" aria-hidden=\"true\">\n    <span class=\"orb orb-1\"></span>\n    <span class=\"orb orb-2\"></span>\n    <span class=\"orb orb-3\"></span>\n    <span class=\"grid-pattern\"></span>\n    <span class=\"noise-layer\"></span>\n  </div>\n\n  <!-- Sticky Nav -->\n  <nav class=\"topbar\" [class.topbar--scrolled]=\"isScrolled\">\n    <div class=\"topbar__inner shell\">\n      <a class=\"topbar__brand\" (click)=\"scrollTo('hero')\">\n        <img src=\"/assets/branding/logo-v2-light.png\" alt=\"North Edge System\" class=\"topbar__logo\" />\n      </a>\n      <ul class=\"topbar__nav\" [class.topbar__nav--open]=\"mobileMenuOpen\">\n        <li><a routerLink=\"/platform\">Platform</a></li>\n        <li><a (click)=\"scrollTo('highlights')\">Highlights</a></li>\n        <li><a (click)=\"scrollTo('features')\">Features</a></li>\n        <li><a (click)=\"scrollTo('how-it-works')\">How It Works</a></li>\n        <li class=\"topbar__nav-actions\">\n          <button type=\"button\" class=\"nav-btn nav-btn--ghost\" (click)=\"onSignIn()\">Sign In</button>\n          <button type=\"button\" class=\"nav-btn nav-btn--primary\" (click)=\"onWatchDemo()\">Book a Demo</button>\n        </li>\n      </ul>\n      <div class=\"topbar__actions\">\n        <button type=\"button\" class=\"nav-btn nav-btn--ghost\" (click)=\"onSignIn()\">Sign In</button>\n        <button type=\"button\" class=\"nav-btn nav-btn--primary\" (click)=\"onWatchDemo()\">Book a Demo</button>\n      </div>\n      <button type=\"button\" class=\"topbar__hamburger\" [class.is-open]=\"mobileMenuOpen\" (click)=\"mobileMenuOpen = !mobileMenuOpen\" aria-label=\"Toggle menu\">\n        <span></span><span></span><span></span>\n      </button>\n    </div>\n  </nav>\n\n  <!-- Hero -->\n  <section id=\"hero\" class=\"hero shell\">\n    <div class=\"hero__content\">\n      <div class=\"hero-brand\">\n        <span class=\"hero-brand-wordmark\">North Edge</span>\n        <span class=\"hero-brand-crm\">CRM</span>\n      </div>\n      <span class=\"hero-proof-badge\">Evidence-Based CRM for revenue teams that need defensible decisions</span>\n      <h1 class=\"hero__title\">\n        <span class=\"hero__title-text\" *ngFor=\"let slide of heroPreviewSlides; let i = index\"\n              [class.hero__title-text--active]=\"i === activeHeroPreview\">\n          {{ slide.title }}<br />\n          <span class=\"hero__title-accent\">{{ slide.titleAccent }}</span>\n        </span>\n      </h1>\n      <div class=\"hero__subtitle-wrap\">\n        <p class=\"hero__subtitle\" *ngFor=\"let slide of heroPreviewSlides; let i = index\"\n           [class.hero__subtitle--active]=\"i === activeHeroPreview\">\n          {{ slide.subtitle }}\n        </p>\n      </div>\n      <ul class=\"hero-proof-points\">\n        <li><i class=\"pi pi-check-circle\"></i> CQVS qualification with evidence quality, not generic lead scoring</li>\n        <li><i class=\"pi pi-check-circle\"></i> Conversation score and conversion readiness tied to real interactions</li>\n        <li><i class=\"pi pi-check-circle\"></i> Approval workflows, report workspace, and tenant presets built into the operating model</li>\n      </ul>\n      <blockquote class=\"hero-manifesto\">\"If you can't defend it, don't forecast it.\"</blockquote>\n      <div class=\"hero__cta\">\n        <button type=\"button\" class=\"hero-btn hero-btn--primary\" (click)=\"onWatchDemo()\">\n          <i class=\"pi pi-calendar\"></i> Book a Demo\n        </button>\n        <a class=\"hero-btn hero-btn--secondary\" routerLink=\"/platform\">\n          Explore Platform <i class=\"pi pi-arrow-right\"></i>\n        </a>\n        <button type=\"button\" class=\"hero-btn hero-btn--ghost\" (click)=\"onSignIn()\">\n          Sign In <i class=\"pi pi-arrow-right\"></i>\n        </button>\n      </div>\n      <div class=\"hero__cta-note\">\n        <span class=\"hero__cta-kicker\">Working-product demo</span>\n        <p>We walk through your actual signal, decision, and rollout model. No stock CRM deck.</p>\n      </div>\n    </div>\n    <div class=\"hero__visual\">\n      <div class=\"kpi-carousel\" (wheel)=\"onHeroPreviewWheel($event)\">\n        <div class=\"kpi-carousel__frame\" aria-hidden=\"true\">\n          <span class=\"kpi-carousel__frame-pill\">Revenue command center</span>\n          <div class=\"kpi-carousel__frame-controls\">\n            <span></span><span></span><span></span>\n          </div>\n        </div>\n        <div class=\"kpi-carousel__track\" [style.transform]=\"'translateX(-' + activeHeroPreview * 100 + '%)'\">\n          <div class=\"kpi-carousel__slide\" *ngFor=\"let slide of heroPreviewSlides; let i = index\">\n            <div class=\"preview-slide\" [ngSwitch]=\"slide.type\">\n              <ng-container *ngSwitchCase=\"'pipeline'\">\n                <div class=\"preview-shell preview-shell--pipeline\">\n                  <div class=\"preview-kpi-board__header\">\n                    <div>\n                      <span class=\"preview-shell__eyebrow\">{{ asPipelineSlide(slide).boardTitle }}</span>\n                      <h3>{{ asPipelineSlide(slide).boardSubtitle }}</h3>\n                    </div>\n                    <div class=\"preview-kpi-board__total\">\n                      <strong>{{ asPipelineSlide(slide).headlineMetric.value }}</strong>\n                      <span>{{ asPipelineSlide(slide).headlineMetric.delta }} {{ asPipelineSlide(slide).headlineMetric.label }}</span>\n                    </div>\n                  </div>\n                  <div class=\"preview-kpi-stage-row\">\n                    <article class=\"preview-kpi-stage\" *ngFor=\"let row of asPipelineSlide(slide).stageSummary\" [class.preview-kpi-stage--rose]=\"row.tone === 'rose'\" [class.preview-kpi-stage--amber]=\"row.tone === 'amber'\" [class.preview-kpi-stage--cyan]=\"row.tone === 'cyan'\" [class.preview-kpi-stage--violet]=\"row.tone === 'violet'\">\n                      <strong>{{ row.value }}</strong>\n                      <span>{{ row.stage }}</span>\n                      <small>{{ row.deals }} deals</small>\n                    </article>\n                  </div>\n                  <div class=\"preview-kpi-metrics\">\n                    <article *ngFor=\"let metric of asPipelineSlide(slide).metrics\">\n                      <span>{{ metric.label }}</span>\n                      <strong>{{ metric.value }}</strong>\n                      <small>{{ metric.delta }}</small>\n                    </article>\n                  </div>\n                </div>\n              </ng-container>\n\n              <ng-container *ngSwitchCase=\"'lead'\">\n                <div class=\"preview-shell preview-shell--lead\">\n                  <div class=\"preview-score\">\n                    <div class=\"preview-score__ring\">\n                      <strong>{{ asLeadSlide(slide).score }}</strong>\n                      <span>AI score</span>\n                    </div>\n                    <div class=\"preview-score__summary\">\n                      <span class=\"preview-shell__eyebrow\">{{ asLeadSlide(slide).profileRole }}</span>\n                      <h3>{{ asLeadSlide(slide).profileName }}</h3>\n                      <p>{{ asLeadSlide(slide).readiness }}</p>\n                    </div>\n                  </div>\n                  <div class=\"preview-factor-list\">\n                    <article class=\"preview-factor\" *ngFor=\"let factor of asLeadSlide(slide).factors\" [class.preview-factor--strong]=\"factor.tone === 'strong'\" [class.preview-factor--watch]=\"factor.tone === 'watch'\">\n                      <div class=\"preview-factor__meter\" aria-hidden=\"true\">\n                        <span [style.height.%]=\"factor.fill\"></span>\n                      </div>\n                      <span>{{ factor.label }}</span>\n                      <strong>{{ factor.value }}</strong>\n                    </article>\n                  </div>\n                </div>\n              </ng-container>\n\n              <ng-container *ngSwitchCase=\"'deal'\">\n                <div class=\"preview-shell preview-shell--deal\">\n                  <div class=\"preview-deal-header\">\n                    <div>\n                      <span class=\"preview-shell__eyebrow\">Deal desk</span>\n                      <h3>{{ asDealSlide(slide).dealName }}</h3>\n                      <p>{{ asDealSlide(slide).riskNote }}</p>\n                    </div>\n                    <div class=\"preview-deal-pill\">{{ asDealSlide(slide).dealStage }}</div>\n                  </div>\n                  <div class=\"preview-deal-grid\">\n                    <article>\n                      <span>Amount</span>\n                      <strong>{{ asDealSlide(slide).dealAmount }}</strong>\n                    </article>\n                    <article>\n                      <span>Health</span>\n                      <strong>{{ asDealSlide(slide).dealHealth }}</strong>\n                    </article>\n                    <article>\n                      <span>Owner</span>\n                      <strong>{{ asDealSlide(slide).dealOwner }}</strong>\n                    </article>\n                    <article>\n                      <span>Approval</span>\n                      <strong>{{ asDealSlide(slide).approvalStatus }}</strong>\n                    </article>\n                  </div>\n                  <div class=\"preview-deal-confidence\">\n                    <div class=\"preview-deal-confidence__top\">\n                      <span>{{ asDealSlide(slide).confidenceLabel }}</span>\n                      <strong>{{ asDealSlide(slide).confidence }}%</strong>\n                    </div>\n                    <div class=\"preview-deal-confidence__bar\" aria-hidden=\"true\">\n                      <span [style.width.%]=\"asDealSlide(slide).confidence\"></span>\n                    </div>\n                  </div>\n                  <div class=\"preview-deal-next\">\n                    <span>Next best action</span>\n                    <strong>{{ asDealSlide(slide).nextAction }}</strong>\n                  </div>\n                  <div class=\"preview-feed\">\n                    <article *ngFor=\"let item of asDealSlide(slide).timeline\">\n                      <strong>{{ item.label }}</strong>\n                      <span>{{ item.meta }}</span>\n                    </article>\n                  </div>\n                </div>\n              </ng-container>\n\n              <ng-container *ngSwitchCase=\"'property'\">\n                <div class=\"preview-shell preview-shell--property\">\n                  <div class=\"preview-property-hero\">\n                    <div>\n                      <span class=\"preview-shell__eyebrow\">Realtor workspace</span>\n                      <h3>{{ asPropertySlide(slide).propertyName }}</h3>\n                    </div>\n                    <div class=\"preview-property-pill\">{{ asPropertySlide(slide).propertyStatus }}</div>\n                  </div>\n                  <div class=\"preview-property-price\">{{ asPropertySlide(slide).propertyPrice }}</div>\n                  <div class=\"preview-property-metrics\">\n                    <article *ngFor=\"let stat of asPropertySlide(slide).propertyStats\" [class.preview-property-metric--blue]=\"stat.tone === 'blue'\" [class.preview-property-metric--green]=\"stat.tone === 'green'\" [class.preview-property-metric--amber]=\"stat.tone === 'amber'\" [class.preview-property-metric--violet]=\"stat.tone === 'violet'\">\n                      <div class=\"preview-property-metric__icon\"><i [class]=\"stat.icon\" aria-hidden=\"true\"></i></div>\n                      <span>{{ stat.label }}</span>\n                      <strong>{{ stat.value }}</strong>\n                    </article>\n                  </div>\n                  <div class=\"preview-note-list preview-note-list--property\">\n                    <span *ngFor=\"let item of asPropertySlide(slide).propertyFeed\">\n                      <i [class]=\"item.icon\" aria-hidden=\"true\"></i>\n                      <em>{{ item.label }}</em>\n                      <strong>{{ item.value }}</strong>\n                    </span>\n                  </div>\n                </div>\n              </ng-container>\n\n              <ng-container *ngSwitchCase=\"'orchestration'\">\n                <div class=\"preview-shell preview-shell--orchestration\">\n                  <div class=\"preview-kpi-board__header preview-kpi-board__header--orchestration\">\n                    <div>\n                      <span class=\"preview-shell__eyebrow\">{{ asOrchestrationSlide(slide).boardTitle }}</span>\n                      <h3>{{ asOrchestrationSlide(slide).boardSubtitle }}</h3>\n                    </div>\n                  </div>\n                  <div class=\"preview-orchestration-metrics\">\n                    <article *ngFor=\"let metric of asOrchestrationSlide(slide).topMetrics\">\n                      <div>\n                        <span>{{ metric.label }}</span>\n                        <strong>{{ metric.value }}</strong>\n                      </div>\n                      <small>{{ metric.delta }}</small>\n                    </article>\n                  </div>\n                  <div class=\"preview-orchestration-list\">\n                    <article class=\"preview-orchestration-card\" *ngFor=\"let action of asOrchestrationSlide(slide).actions\" [class.preview-orchestration-card--critical]=\"action.severity === 'critical'\" [class.preview-orchestration-card--important]=\"action.severity === 'important'\" [class.preview-orchestration-card--low]=\"action.severity === 'low'\">\n                      <div class=\"preview-orchestration-rank\">\n                        <strong>{{ action.rank }}</strong>\n                        <span>{{ action.severity }}</span>\n                      </div>\n                      <div class=\"preview-orchestration-body\">\n                        <div class=\"preview-orchestration-copy\">\n                          <h4>{{ action.title }}</h4>\n                          <p>{{ action.summary }}</p>\n                        </div>\n                        <div class=\"preview-orchestration-chips\">\n                          <span *ngFor=\"let chip of action.chips\">{{ chip }}</span>\n                        </div>\n                      </div>\n                      <div class=\"preview-orchestration-actions\">\n                        <button type=\"button\">{{ action.primaryAction }}</button>\n                        <button type=\"button\" *ngIf=\"action.secondaryAction\" class=\"preview-orchestration-actions__accent\">{{ action.secondaryAction }}</button>\n                      </div>\n                    </article>\n                  </div>\n                </div>\n              </ng-container>\n            </div>\n          </div>\n        </div>\n        <div class=\"kpi-carousel__indicators\">\n          <button *ngFor=\"let slide of heroPreviewSlides; let i = index\"\n                  type=\"button\"\n                  class=\"kpi-carousel__dot\"\n                  [class.active]=\"i === activeHeroPreview\"\n                  [attr.aria-label]=\"'View ' + slide.label\"\n                  (click)=\"goToHeroPreview(i)\">\n          </button>\n        </div>\n        <span class=\"kpi-carousel__label\">{{ heroPreviewSlides[activeHeroPreview].label }}</span>\n      </div>\n    </div>\n  </section>\n\n  <!-- Differentiator Banner -->\n  <section class=\"banner scroll-animate\">\n    <div class=\"shell banner__inner\">\n      <span class=\"banner__icon\"><i class=\"pi pi-unlock\"></i></span>\n      <h2 class=\"banner__title\">One License. Unlimited Users. Forever.</h2>\n      <p class=\"banner__subtitle\">No user caps. No forced annual renewals. Your full team can operate without licensing friction.</p>\n    </div>\n  </section>\n\n  <!-- Stats Bar -->\n  <section class=\"stats-bar scroll-animate\">\n    <div class=\"shell stats-bar__inner\">\n      <div class=\"stat-item\" *ngFor=\"let stat of stats; let i = index\" [style.animation-delay]=\"i * 0.1 + 's'\">\n        <div class=\"stat-item__icon\" [ngClass]=\"'stat-item__icon--' + stat.color\">\n          <i class=\"pi\" [ngClass]=\"stat.icon\"></i>\n        </div>\n        <div class=\"stat-item__content\">\n          <span class=\"stat-item__value\">{{ stat.prefix }}{{ animatedStatValues[i] }}{{ stat.suffix }}</span>\n          <span class=\"stat-item__label\">{{ stat.label }}</span>\n          <span class=\"stat-item__description\">{{ stat.description }}</span>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- Gradient Bridge -->\n  <div class=\"gradient-bridge\" aria-hidden=\"true\"></div>\n\n  <!-- Proof / Differentiation -->\n  <section class=\"proof\">\n    <div class=\"shell\">\n      <span class=\"section-badge scroll-animate\">Why This CRM Feels Different</span>\n      <h2 class=\"section-title scroll-animate\">Built for teams that need evidence, not just activity tracking</h2>\n      <p class=\"section-subtitle scroll-animate\">North Edge CRM is designed to surface what is strong, what is assumed, and what is blocked before revenue decisions are made.</p>\n      <div class=\"proof__grid\">\n        <article class=\"proof-card scroll-animate\" *ngFor=\"let pillar of proofPillars; let i = index\" [style.animation-delay]=\"i * 0.1 + 's'\">\n          <h3>{{ pillar.title }}</h3>\n          <p>{{ pillar.description }}</p>\n        </article>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"journey\">\n    <div class=\"shell journey__inner\">\n      <div class=\"journey__content\">\n        <span class=\"section-badge scroll-animate\">Signal to Decision</span>\n        <h2 class=\"section-title scroll-animate\">Watch one lead move from activity to a defensible revenue decision</h2>\n        <p class=\"section-subtitle scroll-animate\">Instead of treating email, meetings, and qualification as separate screens, North Edge CRM turns them into one operating story: signal, decision, and outcome.</p>\n\n        <div class=\"journey__steps scroll-animate\">\n          <p class=\"journey__guide\">\n            Scroll the narrative to see how the CRM turns raw activity into a visible operating decision.\n          </p>\n          <div class=\"journey__story\">\n            <article\n              *ngFor=\"let step of journeySteps; let i = index\"\n              class=\"journey-step journey-step-anchor\"\n              [class.journey-step--active]=\"i === activeJourneyStep\"\n              [attr.data-index]=\"i\"\n              (click)=\"goToJourneyStep(i)\"\n            >\n              <span class=\"journey-step__index\">0{{ i + 1 }}</span>\n              <span class=\"journey-step__eyebrow\">{{ step.eyebrow }}</span>\n              <strong>{{ step.title }}</strong>\n              <p>{{ step.summary }}</p>\n              <small>{{ step.outcome }}</small>\n            </article>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"journey__visual scroll-animate\">\n        <div class=\"journey__visual-shell\">\n          <div class=\"journey-panel\" *ngFor=\"let step of journeySteps; let i = index\" [class.journey-panel--active]=\"i === activeJourneyStep\">\n            <div class=\"journey-panel__header\">\n              <span class=\"journey-panel__badge\">{{ step.eyebrow }}</span>\n              <span class=\"journey-panel__status\">Lead intelligence in motion</span>\n            </div>\n\n            <div class=\"journey-panel__body\">\n              <div class=\"journey-panel__summary\">\n                <h3>{{ step.title }}</h3>\n                <p>{{ step.summary }}</p>\n              </div>\n\n              <div class=\"journey-panel__signals\">\n                <span class=\"journey-panel__label\">Detected signals</span>\n                <div class=\"journey-panel__chips\">\n                  <span class=\"journey-chip\" *ngFor=\"let signal of step.signals\">{{ signal }}</span>\n                </div>\n              </div>\n\n              <div class=\"journey-panel__metrics\">\n                <article *ngFor=\"let metric of step.metrics\" class=\"journey-metric\" [class.journey-metric--strong]=\"metric.tone === 'strong'\" [class.journey-metric--risk]=\"metric.tone === 'risk'\">\n                  <span class=\"journey-metric__label\">{{ metric.label }}</span>\n                  <strong>{{ metric.value }}</strong>\n                </article>\n              </div>\n\n              <div class=\"journey-panel__outcome\">\n                <span class=\"journey-panel__label\">Why it matters</span>\n                <p>{{ step.outcome }}</p>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"journey__indicators\" aria-hidden=\"true\">\n            <button\n              *ngFor=\"let step of journeySteps; let i = index\"\n              type=\"button\"\n              class=\"journey__dot\"\n              [class.journey__dot--active]=\"i === activeJourneyStep\"\n              [attr.aria-label]=\"'View ' + step.eyebrow + ' step'\"\n              (click)=\"goToJourneyStep(i)\"\n            ></button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <section id=\"highlights\" class=\"highlights\">\n    <div class=\"shell highlights__layout\">\n      <span class=\"section-badge scroll-animate\">CRM Product Highlight</span>\n      <h2 class=\"section-title scroll-animate\">See North Edge CRM in Action</h2>\n      <p class=\"section-subtitle scroll-animate\">\n        A concise product walkthrough across command-center visibility, lead qualification, decision flow, and operational control.\n      </p>\n\n      <div class=\"highlights__showcase\">\n        <div class=\"highlights__player-shell scroll-animate\">\n          <div class=\"highlights__player-meta\">\n            <div>\n              <span class=\"highlights__eyebrow\">CRM Highlight</span>\n              <h3>North Edge CRM Product Walkthrough</h3>\n            </div>\n            <span class=\"highlights__duration\">YouTube</span>\n          </div>\n\n          <iframe\n            class=\"highlights__player\"\n            src=\"https://www.youtube.com/embed/mXb343GLxUI\"\n            title=\"North Edge CRM Highlight Video\"\n            loading=\"lazy\"\n            referrerpolicy=\"strict-origin-when-cross-origin\"\n            allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\"\n            allowfullscreen>\n          </iframe>\n\n          <div class=\"highlights__summary\">\n            <p>\n              This walkthrough shows the actual CRM operating model, not a slide deck. It moves through live surfaces used by reps, managers, and operators to run qualification, review pipeline risk, and act on the next best decision.\n            </p>\n            <ul class=\"highlights__bullets\">\n              <li><i class=\"pi pi-check-circle\"></i> Dashboard command center and KPI visibility</li>\n              <li><i class=\"pi pi-check-circle\"></i> Lead qualification, readiness, and manager context</li>\n              <li><i class=\"pi pi-check-circle\"></i> Risk review, decision flow, and operational control</li>\n            </ul>\n          </div>\n        </div>\n\n        <aside class=\"highlights__playlist scroll-animate\" aria-label=\"Highlight resources\">\n          <div class=\"highlights__playlist-item highlights__playlist-item--active\">\n            <span class=\"highlights__playlist-index\">01</span>\n            <span class=\"highlights__playlist-copy\">\n              <strong>Full CRM highlight</strong>\n              <small>Hosted on YouTube for simple playback and easy sharing.</small>\n            </span>\n            <a\n              class=\"highlights__playlist-link\"\n              href=\"https://www.youtube.com/watch?v=mXb343GLxUI\"\n              target=\"_blank\"\n              rel=\"noopener noreferrer\">\n              Watch on YouTube\n            </a>\n          </div>\n\n          <div class=\"highlights__resource-card\">\n            <span class=\"highlights__resource-label\">What this covers</span>\n            <ul>\n              <li>Lead and pipeline operating flow</li>\n              <li>Qualification with evidence and readiness</li>\n              <li>Manager review, decision inbox, and reporting context</li>\n            </ul>\n          </div>\n\n          <div class=\"highlights__resource-card\">\n            <span class=\"highlights__resource-label\">Next step</span>\n            <p>If the product direction matches your operating model, book a live walkthrough and we will map the rollout, signals, and governance flow to your team.</p>\n            <button type=\"button\" class=\"hero-btn hero-btn--primary\" (click)=\"onWatchDemo()\">\n              <i class=\"pi pi-calendar\"></i> Book a Demo\n            </button>\n          </div>\n        </aside>\n      </div>\n    </div>\n  </section>\n\n  <!-- Features -->\n  <section id=\"features\" class=\"features\">\n    <div class=\"shell\">\n      <span class=\"section-badge scroll-animate\">Platform Capabilities</span>\n      <h2 class=\"section-title scroll-animate\">Everything Your Sales Team Needs</h2>\n      <p class=\"section-subtitle scroll-animate\">Six core capabilities designed to give your team an unfair advantage in every deal.</p>\n      <div class=\"features__grid\">\n        <div class=\"feature-card scroll-animate\" *ngFor=\"let feat of features; let i = index\"\n             [style.animation-delay]=\"i * 0.08 + 's'\"\n             (mousemove)=\"onCardMouseMove($event)\"\n             (mouseleave)=\"onCardMouseLeave($event)\">\n          <div class=\"feature-card__icon\" [ngClass]=\"'feature-card__icon--' + feat.color\">\n            <i class=\"pi\" [ngClass]=\"feat.icon\"></i>\n          </div>\n          <h3>{{ feat.title }}</h3>\n          <p>{{ feat.description }}</p>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"trust\">\n    <div class=\"shell trust__layout\">\n      <div class=\"trust__intro\">\n        <span class=\"section-badge scroll-animate\">Operational Trust</span>\n        <h2 class=\"section-title scroll-animate\">Proof that matters before a buyer commits</h2>\n        <p class=\"section-subtitle scroll-animate\">This page does not depend on placeholder customer logos or inflated usage claims. The proof is in how the product is implemented, governed, and controlled once a team goes live.</p>\n      </div>\n      <div class=\"trust__stream\">\n        <article class=\"trust-card scroll-animate\" *ngFor=\"let signal of trustSignals; let i = index\" [style.animation-delay]=\"i * 0.08 + 's'\">\n          <span class=\"trust-card__eyebrow\">Operational proof</span>\n          <div class=\"trust-card__body\">\n            <h3>{{ signal.title }}</h3>\n            <p>{{ signal.description }}</p>\n          </div>\n        </article>\n      </div>\n    </div>\n  </section>\n\n  <!-- How It Works -->\n  <section id=\"how-it-works\" class=\"how-it-works\">\n    <div class=\"shell\">\n      <span class=\"section-badge scroll-animate\">Getting Started</span>\n      <h2 class=\"section-title scroll-animate\">Up and Running in Three Steps</h2>\n      <div class=\"how-it-works__steps\">\n        <div class=\"step-card scroll-animate\" *ngFor=\"let step of howItWorks; let i = index\" [style.animation-delay]=\"i * 0.12 + 's'\">\n          <div class=\"step-card__number\">{{ i + 1 }}</div>\n          <h3>{{ step.title }}</h3>\n          <p>{{ step.description }}</p>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"commercial\">\n    <div class=\"shell commercial__inner\">\n      <div class=\"commercial__content\">\n        <span class=\"section-badge scroll-animate\">What Buyers Need To Know</span>\n        <h2 class=\"section-title scroll-animate\">Commercial clarity before the sales cycle gets long</h2>\n        <p class=\"section-subtitle scroll-animate\">The page should reduce buyer friction, not create it. These are the questions serious teams usually ask before they commit to a demo or rollout discussion.</p>\n\n        <div class=\"commercial__faq-list\">\n          <article class=\"commercial-faq-row scroll-animate\" *ngFor=\"let item of commercialFaq; let i = index\" [style.animation-delay]=\"i * 0.08 + 's'\">\n            <h3>{{ item.question }}</h3>\n            <p>{{ item.answer }}</p>\n          </article>\n        </div>\n      </div>\n\n      <aside class=\"commercial__sidebar scroll-animate\">\n        <div class=\"commercial-checklist\">\n          <span class=\"commercial-checklist__eyebrow\">Demo expectations</span>\n          <h3>What a serious first conversation looks like</h3>\n          <ul>\n            <li *ngFor=\"let item of demoExpectations\"><i class=\"pi pi-check-circle\"></i> {{ item }}</li>\n          </ul>\n          <button type=\"button\" class=\"hero-btn hero-btn--primary\" (click)=\"onWatchDemo()\">\n            <i class=\"pi pi-calendar\"></i> Book a Demo\n          </button>\n        </div>\n      </aside>\n    </div>\n  </section>\n\n  <!-- Final CTA -->\n  <section class=\"final-cta scroll-animate\">\n    <div class=\"shell final-cta__inner\">\n      <h2>Ready to Run Your Pipeline on Truth?</h2>\n      <p>See the full signal-to-decision flow live, align the rollout model, and leave with a defensible path to implementation.</p>\n      <button type=\"button\" class=\"hero-btn hero-btn--primary hero-btn--lg\" (click)=\"onWatchDemo()\">\n        <i class=\"pi pi-calendar\"></i> Schedule Your Demo\n      </button>\n      <span class=\"final-cta__confidence\">Designed for teams that need qualification discipline, manager visibility, and rollout control.</span>\n    </div>\n  </section>\n\n  <!-- Footer -->\n  <footer class=\"footer\">\n    <div class=\"shell footer__grid\">\n      <div class=\"footer__brand\">\n        <div class=\"hero-brand\">\n          <span class=\"hero-brand-wordmark\">North Edge</span>\n          <span class=\"hero-brand-crm\">CRM</span>\n        </div>\n        <p>Evidence-based CRM for sales teams that close.</p>\n      </div>\n      <div class=\"footer__col\">\n        <h4>Product</h4>\n        <ul>\n          <li><a (click)=\"scrollTo('highlights')\">Highlights</a></li>\n          <li><a (click)=\"scrollTo('features')\">Features</a></li>\n          <li><a (click)=\"scrollTo('how-it-works')\">How It Works</a></li>\n        </ul>\n      </div>\n      <div class=\"footer__col\">\n        <h4>Company</h4>\n        <ul>\n          <li><a href=\"mailto:contact&#64;northedgesystem.com\">Contact</a></li>\n        </ul>\n      </div>\n      <div class=\"footer__col\">\n        <h4>Get In Touch</h4>\n        <ul>\n          <li><a href=\"mailto:contact&#64;northedgesystem.com\">contact&#64;northedgesystem.com</a></li>\n        </ul>\n      </div>\n    </div>\n    <div class=\"shell footer__bottom\">\n      <span>&copy; {{ currentYear }} North Edge System. All rights reserved.</span>\n    </div>\n  </footer>\n\n  <p-dialog\n    [(visible)]=\"showDemoForm\"\n    [modal]=\"true\"\n    [dismissableMask]=\"false\"\n    [draggable]=\"false\"\n    [resizable]=\"false\"\n    [closeOnEscape]=\"true\"\n    [style]=\"{ width: 'min(860px, 96vw)' }\"\n    styleClass=\"demo-dialog\"\n    (onHide)=\"closeDemoForm()\"\n  >\n    <ng-template pTemplate=\"header\">\n      <div class=\"demo-modal-header\">\n        <div>\n          <div class=\"hero-brand\">\n            <span class=\"hero-brand-wordmark\">North Edge</span>\n            <span class=\"hero-brand-crm\">CRM</span>\n          </div>\n          <h3>Schedule a Demo</h3>\n          <p>Share your context and preferred time. Our team will confirm your session.</p>\n        </div>\n      </div>\n    </ng-template>\n\n    <form class=\"demo-form\" [formGroup]=\"demoForm\" (ngSubmit)=\"submitDemoRequest()\">\n      <div class=\"field-grid\">\n        <div class=\"form-field\">\n          <p-iftalabel>\n            <input pInputText id=\"demo-full-name\" type=\"text\" formControlName=\"fullName\" placeholder=\"Jane Cooper\" class=\"w-full demo-input\" />\n            <label for=\"demo-full-name\">Full name</label>\n          </p-iftalabel>\n          <small class=\"form-error\" *ngIf=\"fieldError('fullName', 'required')\">Full name is required.</small>\n        </div>\n\n        <div class=\"form-field\">\n          <p-iftalabel>\n            <input pInputText id=\"demo-work-email\" type=\"email\" formControlName=\"workEmail\" placeholder=\"jane@company.com\" class=\"w-full demo-input\" />\n            <label for=\"demo-work-email\">Work email</label>\n          </p-iftalabel>\n          <small class=\"form-error\" *ngIf=\"fieldError('workEmail', 'required')\">Work email is required.</small>\n          <small class=\"form-error\" *ngIf=\"fieldError('workEmail', 'email')\">Enter a valid email address.</small>\n        </div>\n\n        <div class=\"form-field\">\n          <p-iftalabel>\n            <input pInputText id=\"demo-company\" type=\"text\" formControlName=\"company\" placeholder=\"North Ridge Foods\" class=\"w-full demo-input\" />\n            <label for=\"demo-company\">Company</label>\n          </p-iftalabel>\n          <small class=\"form-error\" *ngIf=\"fieldError('company', 'required')\">Company is required.</small>\n        </div>\n\n        <div class=\"form-field\">\n          <p-iftalabel>\n            <input pInputText id=\"demo-role-title\" type=\"text\" formControlName=\"roleTitle\" placeholder=\"VP Sales\" class=\"w-full demo-input\" />\n            <label for=\"demo-role-title\">Role / Title</label>\n          </p-iftalabel>\n          <small class=\"form-error\" *ngIf=\"fieldError('roleTitle', 'required')\">Role or title is required.</small>\n        </div>\n\n        <div class=\"form-field\">\n          <p-iftalabel>\n            <input pInputText id=\"demo-phone\" type=\"text\" formControlName=\"phone\" placeholder=\"+1 555 0100\" class=\"w-full demo-input\" />\n            <label for=\"demo-phone\">Phone</label>\n          </p-iftalabel>\n          <small class=\"form-error\" *ngIf=\"fieldError('phone', 'required')\">Phone is required.</small>\n        </div>\n\n        <div class=\"form-field\">\n          <p-iftalabel>\n            <p-select\n              inputId=\"demo-team-size\"\n              appendTo=\"body\"\n              [options]=\"teamSizeOptions\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              formControlName=\"teamSize\"\n              placeholder=\"Select team size\"\n              styleClass=\"w-full\"\n            ></p-select>\n            <label for=\"demo-team-size\">Team size</label>\n          </p-iftalabel>\n          <small class=\"form-error\" *ngIf=\"fieldError('teamSize', 'required')\">Select a team size.</small>\n        </div>\n\n        <div class=\"form-field\">\n          <p-iftalabel>\n            <p-datepicker\n              inputId=\"demo-preferred-datetime\"\n              appendTo=\"body\"\n              formControlName=\"preferredDateTime\"\n              [minDate]=\"minDemoDateTime\"\n              [showIcon]=\"true\"\n              [showTime]=\"true\"\n              hourFormat=\"12\"\n              [showButtonBar]=\"true\"\n              dateFormat=\"yy-mm-dd\"\n              placeholder=\"Select preferred date and time\"\n              styleClass=\"w-full\"\n            ></p-datepicker>\n            <label for=\"demo-preferred-datetime\">Preferred date and time</label>\n          </p-iftalabel>\n          <small class=\"form-error\" *ngIf=\"fieldError('preferredDateTime', 'required')\">Preferred date/time is required.</small>\n          <small class=\"form-error\" *ngIf=\"fieldError('preferredDateTime', 'minTorontoDay')\">Select a date from the next Toronto day onward.</small>\n          <small class=\"form-error\" *ngIf=\"fieldError('preferredDateTime', 'outsideTorontoBusinessHours')\">Select a time between 9:00 AM and 5:00 PM Toronto time.</small>\n        </div>\n\n        <div class=\"form-field\">\n          <p-iftalabel>\n            <p-select\n              inputId=\"demo-timezone\"\n              appendTo=\"body\"\n              [options]=\"timezoneOptions\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              formControlName=\"timezone\"\n              placeholder=\"Select timezone\"\n              [filter]=\"true\"\n              filterBy=\"label\"\n              styleClass=\"w-full\"\n            ></p-select>\n            <label for=\"demo-timezone\">Timezone (stored)</label>\n          </p-iftalabel>\n          <small class=\"form-error\" *ngIf=\"fieldError('timezone', 'required')\">Timezone is required.</small>\n          <small class=\"form-error\" *ngIf=\"fieldError('preferredDateTime', 'invalidTimezone')\">Select a valid timezone.</small>\n        </div>\n      </div>\n\n      <div class=\"field-textarea\">\n        <p-iftalabel>\n          <textarea pTextarea id=\"demo-use-case\" rows=\"4\" formControlName=\"useCase\" placeholder=\"What outcomes do you want from the demo?\" class=\"w-full demo-textarea\"></textarea>\n          <label for=\"demo-use-case\">Goals / use case</label>\n        </p-iftalabel>\n        <small class=\"form-error\" *ngIf=\"fieldError('useCase', 'required')\">Please share your use case.</small>\n      </div>\n\n      <div class=\"demo-actions\">\n        <button pButton type=\"button\" label=\"Cancel\" class=\"ne-btn ne-btn--link\" (click)=\"closeDemoForm()\" [disabled]=\"submittingDemo\"></button>\n        <button pButton type=\"submit\" [label]=\"submittingDemo ? 'Submitting...' : 'Schedule Demo'\" class=\"ne-btn ne-btn--primary\" [disabled]=\"submittingDemo\"></button>\n      </div>\n\n      <p class=\"demo-contact-note\">\n        Prefer email? Contact us at\n        <a href=\"mailto:contact@northedgesystem.com\">contact@northedgesystem.com</a>\n      </p>\n    </form>\n  </p-dialog>\n\n  <p-dialog\n    [(visible)]=\"showDemoSuccess\"\n    [modal]=\"true\"\n    [dismissableMask]=\"false\"\n    [draggable]=\"false\"\n    [resizable]=\"false\"\n    [closeOnEscape]=\"true\"\n    [style]=\"{ width: 'min(560px, 92vw)' }\"\n    styleClass=\"demo-success-dialog\"\n  >\n    <ng-template pTemplate=\"header\">\n      <div class=\"demo-success-header\">\n        <div class=\"hero-brand\">\n          <span class=\"hero-brand-wordmark\">North Edge</span>\n          <span class=\"hero-brand-crm\">CRM</span>\n        </div>\n        <h3>Thanks for contacting us</h3>\n      </div>\n    </ng-template>\n    <div class=\"demo-success-body\">\n      <p>Your demo request has been submitted successfully.</p>\n      <p>Our team will contact you soon to confirm your session.</p>\n    </div>\n    <ng-template pTemplate=\"footer\">\n      <button pButton type=\"button\" label=\"Done\" class=\"ne-btn ne-btn--primary\" (click)=\"showDemoSuccess = false\"></button>\n    </ng-template>\n  </p-dialog>\n</main>\n", styles: ["/* \u2500\u2500\u2500 Landing Page \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n/* Font loaded via index.html preload \u2014 no @import here */\n\n:host {\n  display: block;\n  font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  color: #f5f8ff;\n  overflow-x: hidden;\n}\n\n/* \u2500\u2500\u2500 Variables \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.landing {\n  --hero-bg: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);\n  --accent: #667eea;\n  --accent-end: #764ba2;\n  --accent-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  --cyan: #22d3ee;\n  --green: #22c55e;\n  --orange: #f97316;\n  --purple: #a855f7;\n  --text-hero: #f5f8ff;\n  --text-body: #1e293b;\n  --text-muted: #64748b;\n  --surface-light: #f8fafc;\n  --surface-white: #ffffff;\n  --footer-bg: #0f172a;\n  --glass-border: rgba(255, 255, 255, 0.18);\n  --glass-bg: rgba(255, 255, 255, 0.08);\n  --shadow: 0 40px 120px rgba(0, 0, 0, 0.5);\n  --radius-lg: 1rem;\n  --radius-xl: 1.5rem;\n  --shell-max: 1440px;\n  --hero-shell-max: 1520px;\n  --shell-gutter: clamp(1rem, 3vw, 3rem);\n  position: relative;\n}\n\n/* \u2500\u2500\u2500 Scroll-Triggered Animations \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.scroll-animate {\n  opacity: 0;\n  transform: translateY(30px);\n  transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),\n              transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &.scroll-visible {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n/* \u2500\u2500\u2500 Shell \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.shell {\n  width: min(var(--shell-max), calc(100% - (var(--shell-gutter) * 2)));\n  margin-inline: auto;\n}\n\n/* \u2500\u2500\u2500 Background \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.landing-bg {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  background: var(--hero-bg);\n  pointer-events: none;\n}\n\n.landing-bg::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(ellipse at 60% 20%, rgba(102, 126, 234, 0.15), transparent 60%);\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.35;\n  animation: orb-float 20s ease-in-out infinite;\n}\n\n.orb-1 {\n  width: 500px; height: 500px;\n  background: var(--accent-gradient);\n  top: -15%; right: -8%;\n}\n\n.orb-2 {\n  width: 350px; height: 350px;\n  background: linear-gradient(135deg, var(--cyan), #06b6d4);\n  bottom: 15%; left: -6%;\n  animation-delay: -7s;\n}\n\n.orb-3 {\n  width: 280px; height: 280px;\n  background: linear-gradient(135deg, var(--purple), #9333ea);\n  top: 45%; right: 22%;\n  animation-delay: -14s;\n}\n\n.grid-pattern {\n  position: absolute;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);\n  background-size: 60px 60px;\n}\n\n.noise-layer {\n  position: absolute;\n  inset: 0;\n  opacity: 0.04;\n  background: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\");\n}\n\n/* \u2500\u2500\u2500 Sticky Nav \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.topbar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 100;\n  padding: 0.75rem 0;\n  transition: background 300ms, backdrop-filter 300ms, box-shadow 300ms;\n\n  &--scrolled {\n    background: rgba(15, 20, 40, 0.85);\n    backdrop-filter: blur(20px);\n    box-shadow: 0 2px 24px rgba(0, 0, 0, 0.3);\n  }\n}\n\n.topbar__inner {\n  display: flex;\n  align-items: center;\n  gap: 1.5rem;\n}\n\n.topbar__brand {\n  cursor: pointer;\n  flex-shrink: 0;\n}\n\n.topbar__logo {\n  height: 42px;\n  width: auto;\n  display: block;\n}\n\n.topbar__nav {\n  display: flex;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  gap: 0.25rem;\n  margin-left: auto;\n\n  li a {\n    display: inline-flex;\n    padding: 0.45rem 0.85rem;\n    font-size: 0.9rem;\n    font-weight: 600;\n    color: rgba(255, 255, 255, 0.75);\n    cursor: pointer;\n    border-radius: 0.5rem;\n    transition: color 200ms, background 200ms;\n    text-decoration: none;\n\n    &:hover {\n      color: #fff;\n      background: rgba(255, 255, 255, 0.08);\n    }\n  }\n}\n\n.topbar__actions {\n  display: flex;\n  gap: 0.5rem;\n  flex-shrink: 0;\n}\n\n.topbar__nav-actions {\n  display: none;\n}\n\n.nav-btn {\n  font-family: inherit;\n  font-size: 0.875rem;\n  font-weight: 600;\n  padding: 0.5rem 1.15rem;\n  border-radius: 0.5rem;\n  cursor: pointer;\n  transition: all 200ms;\n  border: none;\n\n  &--ghost {\n    background: transparent;\n    color: rgba(255, 255, 255, 0.85);\n    border: 1px solid rgba(255, 255, 255, 0.2);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.1);\n      color: #fff;\n    }\n  }\n\n  &--primary {\n    background: var(--accent-gradient);\n    color: #fff;\n    box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n    &:hover {\n      transform: translateY(-1px);\n      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n    }\n  }\n}\n\n.topbar__hamburger {\n  display: none;\n  flex-direction: column;\n  gap: 5px;\n  padding: 0.4rem;\n  background: none;\n  border: none;\n  cursor: pointer;\n\n  span {\n    display: block;\n    width: 22px;\n    height: 2px;\n    background: rgba(255, 255, 255, 0.85);\n    border-radius: 2px;\n    transition: all 250ms;\n  }\n\n  &.is-open {\n    span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }\n    span:nth-child(2) { opacity: 0; }\n    span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }\n  }\n}\n\n/* \u2500\u2500\u2500 Hero \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.hero {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  width: min(var(--hero-shell-max), calc(100% - (var(--shell-gutter) * 2)));\n  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);\n  gap: clamp(2rem, 4vw, 4.25rem);\n  padding-top: 7rem;\n  padding-bottom: 4rem;\n  min-height: 85vh;\n  align-items: center;\n}\n\n.hero__content,\n.hero__visual {\n  min-width: 0;\n}\n\n.hero__content {\n  max-width: 34rem;\n}\n\n.hero-brand {\n  display: inline-flex;\n  align-items: baseline;\n  gap: 0.48rem;\n  margin-bottom: 0.85rem;\n}\n\n.hero-brand-wordmark {\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: rgba(233, 241, 255, 0.78);\n}\n\n.hero-brand-crm {\n  position: relative;\n  display: inline-block;\n  font-size: 1.15rem;\n  font-weight: 900;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: transparent;\n  background: linear-gradient(120deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%);\n  background-size: 240% 240%;\n  -webkit-background-clip: text;\n  background-clip: text;\n  animation: crm-shimmer 3.6s ease-in-out infinite;\n}\n\n.hero-brand-crm::after {\n  content: '';\n  position: absolute;\n  inset: -0.24rem -0.38rem;\n  border-radius: 999px;\n  background: radial-gradient(circle at 50% 45%, rgba(102, 126, 234, 0.28), transparent 76%);\n  filter: blur(6px);\n  pointer-events: none;\n  z-index: -1;\n  opacity: 0.45;\n  animation: crm-aura 3.6s ease-in-out infinite;\n}\n\n.hero-proof-badge {\n  display: inline-flex;\n  align-items: center;\n  max-width: 32rem;\n  padding: 0.45rem 0.9rem;\n  margin-bottom: 0.85rem;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  color: rgba(245, 248, 255, 0.86);\n  font-size: 0.82rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n}\n\n.hero__title {\n  position: relative;\n  margin: 0;\n  font-size: clamp(2.4rem, 5vw, 4rem);\n  font-weight: 800;\n  line-height: 1.05;\n  letter-spacing: -0.03em;\n  color: var(--text-hero);\n  min-height: 2.15em;\n}\n\n.hero__title-text {\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  transform: translateY(12px);\n  transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),\n              transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  pointer-events: none;\n\n  &--active {\n    opacity: 1;\n    transform: translateY(0);\n    pointer-events: auto;\n    position: relative;\n  }\n}\n\n.hero__title-accent {\n  background: var(--accent-gradient);\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.hero__subtitle-wrap {\n  position: relative;\n  min-height: 4.5em;\n  margin: 1rem 0 1.45rem;\n}\n\n.hero__subtitle {\n  position: absolute;\n  top: 0;\n  left: 0;\n  margin: 0;\n  color: rgba(241, 246, 255, 0.72);\n  font-size: 1.06rem;\n  max-width: 520px;\n  line-height: 1.7;\n  opacity: 0;\n  transform: translateY(10px);\n  transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s,\n              transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s;\n  pointer-events: none;\n\n  &--active {\n    opacity: 1;\n    transform: translateY(0);\n    pointer-events: auto;\n  }\n}\n\n.hero__cta {\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n  margin-bottom: 0.85rem;\n}\n\n.hero__cta-note {\n  display: grid;\n  gap: 0.3rem;\n\n  p {\n    margin: 0;\n    color: rgba(241, 246, 255, 0.58);\n    font-size: 0.9rem;\n    line-height: 1.55;\n  }\n}\n\n.hero__cta-kicker {\n  display: inline-flex;\n  align-items: center;\n  width: fit-content;\n  padding: 0.26rem 0.62rem;\n  border-radius: 999px;\n  background: rgba(125, 211, 252, 0.12);\n  border: 1px solid rgba(125, 211, 252, 0.22);\n  color: #bae6fd;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.hero-proof-points {\n  list-style: none;\n  padding: 0;\n  margin: 0 0 1.4rem;\n  display: grid;\n  gap: 0.7rem;\n\n  li {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.65rem;\n    color: rgba(241, 246, 255, 0.86);\n    font-size: 0.96rem;\n    line-height: 1.55;\n  }\n\n  i {\n    color: #7dd3fc;\n    margin-top: 0.12rem;\n    flex-shrink: 0;\n  }\n}\n\n.hero-manifesto {\n  margin: 0 0 1.6rem;\n  padding: 0.9rem 1.25rem;\n  border-left: 3px solid rgba(125, 211, 252, 0.5);\n  background: rgba(125, 211, 252, 0.06);\n  border-radius: 0 0.5rem 0.5rem 0;\n  color: rgba(241, 246, 255, 0.92);\n  font-size: 1.15rem;\n  font-weight: 600;\n  font-style: italic;\n  letter-spacing: -0.01em;\n  line-height: 1.5;\n}\n\n.hero-btn {\n  font-family: inherit;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1.5rem;\n  font-size: 1rem;\n  font-weight: 700;\n  border-radius: 0.65rem;\n  cursor: pointer;\n  border: none;\n  text-decoration: none;\n  transition: all 250ms;\n\n  i { font-size: 0.95rem; }\n\n  &--primary {\n    background: var(--accent-gradient);\n    color: #fff;\n    box-shadow: 0 6px 24px rgba(102, 126, 234, 0.4);\n\n    &:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 10px 32px rgba(102, 126, 234, 0.55);\n    }\n  }\n\n  &--ghost {\n    background: rgba(255, 255, 255, 0.08);\n    color: rgba(255, 255, 255, 0.9);\n    border: 1px solid rgba(255, 255, 255, 0.2);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.14);\n      color: #fff;\n    }\n  }\n\n  &--secondary {\n    background: rgba(34, 211, 238, 0.12);\n    color: #d9fbff;\n    border: 1px solid rgba(34, 211, 238, 0.28);\n    box-shadow: 0 10px 26px rgba(8, 145, 178, 0.18);\n\n    &:hover {\n      background: rgba(34, 211, 238, 0.18);\n      color: #fff;\n      transform: translateY(-2px);\n    }\n  }\n\n  &--lg {\n    padding: 0.9rem 2rem;\n    font-size: 1.1rem;\n  }\n}\n\n/* \u2500\u2500\u2500 KPI Carousel (Hero Visual) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.hero__visual {\n  position: relative;\n  animation: fade-in-up 0.8s ease-out 0.2s both;\n  align-self: center;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  max-width: 960px;\n  justify-self: end;\n  transform: perspective(1400px) rotateY(-7deg) rotateX(2deg) translateZ(0);\n  transform-style: preserve-3d;\n  isolation: isolate;\n}\n\n.hero__visual::before,\n.hero__visual::after {\n  content: '';\n  position: absolute;\n  pointer-events: none;\n  z-index: 0;\n  filter: blur(56px);\n  opacity: 1;\n}\n\n.hero__visual::before {\n  top: -6%;\n  right: -8%;\n  width: 68%;\n  height: 64%;\n  background:\n    radial-gradient(circle at center,\n      rgba(88, 166, 255, 0.62) 0%,\n      rgba(88, 166, 255, 0.34) 24%,\n      rgba(124, 92, 255, 0.22) 46%,\n      transparent 74%);\n}\n\n.hero__visual::after {\n  left: 6%;\n  bottom: -12%;\n  width: 88%;\n  height: 32%;\n  background:\n    radial-gradient(ellipse at center,\n      rgba(35, 134, 54, 0.28) 0%,\n      rgba(34, 211, 238, 0.18) 26%,\n      rgba(88, 166, 255, 0.12) 44%,\n      transparent 74%);\n}\n\n.kpi-carousel {\n  position: relative;\n  border-radius: var(--radius-xl);\n  border: 1px solid var(--glass-border);\n  background: var(--glass-bg);\n  backdrop-filter: blur(20px);\n  overflow: hidden;\n  z-index: 1;\n  box-shadow:\n    0 48px 132px rgba(3, 7, 18, 0.72),\n    0 0 0 1px rgba(191, 219, 254, 0.08),\n    0 0 42px rgba(88, 166, 255, 0.16);\n  transition: box-shadow 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  aspect-ratio: 16 / 9;\n  width: 100%;\n  min-height: 500px;\n  isolation: isolate;\n  transform: translateY(-10px) scale(1.03);\n\n  &:hover {\n    box-shadow:\n      0 64px 160px rgba(3, 7, 18, 0.78),\n      0 0 60px rgba(88, 166, 255, 0.3),\n      0 0 120px rgba(124, 92, 255, 0.2),\n      0 0 160px rgba(35, 134, 54, 0.1);\n  }\n}\n\n.kpi-carousel__frame {\n  position: absolute;\n  top: 0.95rem;\n  left: 1rem;\n  right: 1rem;\n  z-index: 3;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.85rem;\n  pointer-events: none;\n}\n\n.kpi-carousel__frame-pill {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.34rem 0.7rem;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.62);\n  border: 1px solid rgba(255, 255, 255, 0.16);\n  color: rgba(255, 255, 255, 0.92);\n  font-size: 0.71rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  backdrop-filter: blur(14px);\n}\n\n.kpi-carousel__frame-controls {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.38rem;\n  padding: 0.42rem 0.62rem;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.46);\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  backdrop-filter: blur(12px);\n\n  span {\n    width: 7px;\n    height: 7px;\n    border-radius: 50%;\n    background: rgba(255, 255, 255, 0.7);\n\n    &:nth-child(1) { background: #fb7185; }\n    &:nth-child(2) { background: #fbbf24; }\n    &:nth-child(3) { background: #34d399; }\n  }\n}\n\n.kpi-carousel__track {\n  display: flex;\n  height: 100%;\n  transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);\n  will-change: transform;\n  position: relative;\n  z-index: 1;\n}\n\n.kpi-carousel__slide {\n  flex: 0 0 100%;\n  min-width: 0;\n  height: 100%;\n  padding: 4.65rem 1.35rem 3.35rem;\n  background:\n    radial-gradient(circle at top right, rgba(34, 211, 238, 0.18), transparent 34%),\n    radial-gradient(circle at bottom left, rgba(102, 126, 234, 0.18), transparent 38%),\n    linear-gradient(145deg, rgba(7, 11, 26, 0.98), rgba(15, 23, 42, 0.88));\n}\n\n.preview-slide {\n  height: 100%;\n}\n\n.preview-shell {\n  display: grid;\n  gap: 1rem;\n  height: 100%;\n  padding: 1.35rem;\n  position: relative;\n  overflow: hidden;\n  border-radius: 1.1rem;\n  background: linear-gradient(180deg, rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.58));\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 20px 40px rgba(2, 6, 23, 0.24);\n  isolation: isolate;\n}\n\n.preview-shell::before,\n.preview-shell::after,\n.preview-kpi-stage::before,\n.preview-kpi-metrics article::before,\n.preview-factor::before,\n.preview-deal-grid article::before,\n.preview-property-metrics article::before,\n.preview-feed article::before,\n.preview-orchestration-metrics article::before,\n.preview-orchestration-card::before {\n  content: '';\n  position: absolute;\n  inset: auto;\n  pointer-events: none;\n  z-index: 0;\n}\n\n.preview-shell::before {\n  top: -16%;\n  left: -8%;\n  width: 48%;\n  height: 52%;\n  border-radius: 45% 55% 60% 40%;\n  background: radial-gradient(circle, rgba(88, 166, 255, 0.18) 0%, rgba(88, 166, 255, 0.08) 42%, transparent 74%);\n  filter: blur(18px);\n  animation: liquid-drift 15s ease-in-out infinite;\n}\n\n.preview-shell::after {\n  right: -10%;\n  bottom: -18%;\n  width: 44%;\n  height: 46%;\n  border-radius: 58% 42% 50% 50%;\n  background: radial-gradient(circle, rgba(124, 92, 255, 0.16) 0%, rgba(34, 211, 238, 0.08) 44%, transparent 76%);\n  filter: blur(20px);\n  animation: liquid-drift 18s ease-in-out infinite reverse;\n}\n\n.preview-shell > *,\n.preview-kpi-stage > *,\n.preview-kpi-metrics article > *,\n.preview-factor > *,\n.preview-deal-grid article > *,\n.preview-property-metrics article > *,\n.preview-feed article > *,\n.preview-orchestration-metrics article > *,\n.preview-orchestration-card > * {\n  position: relative;\n  z-index: 1;\n}\n\n.preview-shell__eyebrow {\n  display: inline-flex;\n  margin-bottom: 0.45rem;\n  font-size: 0.68rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: rgba(148, 163, 184, 0.92);\n}\n\n.preview-shell--pipeline {\n  grid-template-rows: auto 1fr auto;\n}\n\n.preview-kpi-board__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n\n  h3 {\n    margin: 0;\n    font-size: 1.08rem;\n    color: rgba(241, 245, 249, 0.94);\n    font-weight: 700;\n  }\n}\n\n.preview-kpi-board__total {\n  text-align: right;\n\n  strong {\n    display: block;\n    font-size: 2.15rem;\n    line-height: 1;\n    color: #f8fbff;\n  }\n\n  span {\n    display: inline-flex;\n    margin-top: 0.32rem;\n    color: #d9f99d;\n    font-size: 0.9rem;\n    font-weight: 700;\n  }\n}\n\n.preview-shell__delta,\n.preview-deal-pill,\n.preview-property-pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.4rem 0.7rem;\n  border-radius: 999px;\n  background: rgba(34, 197, 94, 0.18);\n  border: 1px solid rgba(74, 222, 128, 0.28);\n  color: #86efac;\n  font-size: 0.78rem;\n  font-weight: 800;\n}\n\n.preview-stage-list,\n.preview-factor-list,\n.preview-feed,\n.preview-property-metrics,\n.preview-note-list,\n.preview-kpi-stage-row,\n.preview-kpi-metrics,\n.preview-orchestration-list,\n.preview-orchestration-metrics {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.preview-factor-list {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  align-items: stretch;\n}\n\n.preview-kpi-stage-row {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.8rem;\n}\n\n.preview-kpi-stage {\n  position: relative;\n  overflow: hidden;\n  padding: 0.95rem 1rem;\n  border-radius: 1rem;\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);\n\n  strong,\n  span,\n  small {\n    display: block;\n  }\n\n  strong {\n    font-size: 1.85rem;\n    line-height: 1;\n    color: #fff7ed;\n  }\n\n  span {\n    margin-top: 0.42rem;\n    font-size: 0.9rem;\n    color: rgba(255, 248, 240, 0.92);\n    font-weight: 700;\n  }\n\n  small {\n    margin-top: 0.4rem;\n    font-size: 0.84rem;\n    color: rgba(255, 248, 240, 0.82);\n  }\n}\n\n.preview-kpi-stage::before {\n  top: -18%;\n  right: -12%;\n  width: 62%;\n  height: 88%;\n  border-radius: 58% 42% 55% 45%;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.04));\n  filter: blur(10px);\n  mix-blend-mode: screen;\n  opacity: 0.7;\n  animation: liquid-drift 13s ease-in-out infinite;\n}\n\n.preview-kpi-stage--rose {\n  background: linear-gradient(135deg, rgba(251, 59, 101, 0.92), rgba(244, 63, 94, 0.76));\n}\n\n.preview-kpi-stage--amber {\n  background: linear-gradient(135deg, rgba(251, 146, 60, 0.94), rgba(245, 158, 11, 0.8));\n}\n\n.preview-kpi-stage--cyan {\n  background: linear-gradient(135deg, rgba(34, 211, 238, 0.78), rgba(20, 184, 166, 0.72));\n}\n\n.preview-kpi-stage--violet {\n  background: linear-gradient(135deg, rgba(124, 58, 237, 0.88), rgba(139, 92, 246, 0.78));\n}\n\n.preview-kpi-metrics {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n\n  article {\n    position: relative;\n    overflow: hidden;\n    padding: 0.95rem 1rem;\n    border-radius: 1rem;\n    background: rgba(60, 78, 183, 0.38);\n    border: 1px solid rgba(191, 219, 254, 0.2);\n  }\n\n  span,\n  strong,\n  small {\n    display: block;\n  }\n\n  span {\n    color: rgba(226, 232, 240, 0.86);\n    font-size: 0.8rem;\n    font-weight: 700;\n  }\n\n  strong {\n    margin-top: 0.35rem;\n    color: #f8fbff;\n    font-size: 1.65rem;\n    line-height: 1.05;\n  }\n\n  small {\n    margin-top: 0.35rem;\n    color: #d9f99d;\n    font-size: 0.86rem;\n    font-weight: 700;\n  }\n}\n\n.preview-kpi-metrics article::before,\n.preview-factor::before,\n.preview-deal-grid article::before,\n.preview-property-metrics article::before,\n.preview-feed article::before,\n.preview-orchestration-metrics article::before,\n.preview-orchestration-card::before {\n  top: -34%;\n  left: -8%;\n  width: 72%;\n  height: 140%;\n  border-radius: 55% 45% 52% 48%;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.03) 48%, transparent 70%);\n  filter: blur(14px);\n  opacity: 0.75;\n  animation: liquid-drift 16s ease-in-out infinite;\n}\n\n.preview-stage {\n  padding: 0.85rem 0.95rem;\n  border-radius: 0.95rem;\n  background: rgba(15, 23, 42, 0.58);\n  border: 1px solid rgba(255, 255, 255, 0.07);\n}\n\n.preview-stage__top,\n.preview-property-hero,\n.preview-deal-header,\n.preview-score {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.preview-stage__top {\n  margin-bottom: 0.6rem;\n\n  span {\n    color: rgba(226, 232, 240, 0.72);\n    font-size: 0.82rem;\n    font-weight: 700;\n    letter-spacing: 0.04em;\n    text-transform: uppercase;\n  }\n\n  strong {\n    color: #f8fafc;\n    font-size: 1rem;\n  }\n}\n\n.preview-stage__bar {\n  height: 0.45rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.08);\n\n  span {\n    display: block;\n    height: 100%;\n    border-radius: inherit;\n    background: linear-gradient(90deg, #38bdf8, #8b5cf6);\n  }\n}\n\n.preview-stage__meta {\n  margin-top: 0.45rem;\n  font-size: 0.8rem;\n  color: rgba(148, 163, 184, 0.9);\n}\n\n.preview-note-list {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n\n  span {\n    display: grid;\n    grid-template-columns: auto 1fr;\n    grid-template-areas:\n      'icon label'\n      'icon value';\n    align-items: center;\n    column-gap: 0.75rem;\n    padding: 0.7rem 0.8rem;\n    border-radius: 0.9rem;\n    background: rgba(255, 255, 255, 0.1);\n    color: rgba(226, 232, 240, 0.9);\n    font-size: 0.82rem;\n    font-weight: 700;\n    line-height: 1.4;\n  }\n}\n\n.preview-note-list span i {\n  grid-area: icon;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  border-radius: 0.75rem;\n  background: rgba(30, 41, 59, 0.62);\n  color: #93c5fd;\n}\n\n.preview-note-list span em,\n.preview-note-list span strong {\n  font-style: normal;\n}\n\n.preview-note-list span em {\n  grid-area: label;\n  color: rgba(191, 219, 254, 0.76);\n  font-size: 0.74rem;\n  font-weight: 800;\n  letter-spacing: 0.07em;\n  text-transform: uppercase;\n}\n\n.preview-note-list span strong {\n  grid-area: value;\n  color: #f8fbff;\n  font-size: 0.9rem;\n  line-height: 1.4;\n}\n\n.preview-shell--lead {\n  grid-template-rows: auto 1fr;\n  background:\n    radial-gradient(circle at top left, rgba(56, 189, 248, 0.22), transparent 36%),\n    radial-gradient(circle at bottom right, rgba(124, 92, 255, 0.18), transparent 42%),\n    linear-gradient(180deg, rgba(18, 28, 46, 0.94), rgba(20, 31, 50, 0.9));\n  border-color: rgba(125, 211, 252, 0.2);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.08),\n    0 18px 42px rgba(15, 23, 42, 0.28),\n    0 0 36px rgba(56, 189, 248, 0.12);\n}\n\n.preview-shell--lead .preview-shell__eyebrow {\n  color: #7dd3fc;\n}\n\n.preview-shell--lead::before {\n  background: radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(56, 189, 248, 0.05) 42%, transparent 74%);\n}\n\n.preview-shell--lead::after {\n  background: radial-gradient(circle, rgba(168, 85, 247, 0.14) 0%, rgba(99, 102, 241, 0.05) 44%, transparent 76%);\n}\n\n.preview-score__ring {\n  display: grid;\n  place-items: center;\n  width: 7.25rem;\n  height: 7.25rem;\n  border-radius: 50%;\n  background:\n    radial-gradient(circle at center, rgba(10, 17, 34, 0.98) 56%, transparent 57%),\n    conic-gradient(#38bdf8 0 68%, #7c3aed 68% 100%);\n  box-shadow:\n    inset 0 0 0 1px rgba(255, 255, 255, 0.08),\n    0 18px 38px rgba(56, 189, 248, 0.16);\n  position: relative;\n  overflow: hidden;\n\n  strong {\n    display: block;\n    font-size: 2rem;\n    color: #f8fafc;\n    line-height: 1;\n  }\n\n  span {\n    margin-top: 0.2rem;\n    font-size: 0.74rem;\n    font-weight: 800;\n    letter-spacing: 0.1em;\n    text-transform: uppercase;\n    color: rgba(125, 211, 252, 0.84);\n  }\n}\n\n.preview-score__ring::after {\n  content: '';\n  position: absolute;\n  inset: 12% 10%;\n  border-radius: 50%;\n  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.22), transparent 58%);\n  filter: blur(8px);\n  animation: liquid-pulse 7s ease-in-out infinite;\n}\n\n.preview-score__summary {\n  flex: 1;\n\n  h3,\n  p {\n    margin: 0;\n  }\n\n  h3 {\n    font-size: 1.5rem;\n    line-height: 1.2;\n    color: #f8fbff;\n  }\n\n  p {\n    margin-top: 0.4rem;\n    color: rgba(226, 232, 240, 0.82);\n    font-size: 1rem;\n    line-height: 1.55;\n  }\n}\n\n.preview-factor {\n  display: grid;\n  grid-template-rows: auto auto auto;\n  justify-items: center;\n  align-content: start;\n  gap: 0.55rem;\n  min-height: 10.5rem;\n  padding: 0.95rem 0.85rem 0.9rem;\n  border-radius: 0.95rem;\n  background: rgba(30, 41, 59, 0.72);\n  border: 1px solid rgba(125, 211, 252, 0.16);\n  box-shadow: 0 10px 24px rgba(2, 6, 23, 0.16);\n  text-align: center;\n\n  span {\n    color: rgba(191, 219, 254, 0.78);\n    font-size: 0.76rem;\n    font-weight: 800;\n    letter-spacing: 0.04em;\n    text-transform: uppercase;\n    line-height: 1.35;\n  }\n\n  strong {\n    color: #f8fbff;\n    font-size: 0.98rem;\n  }\n}\n\n.preview-factor__meter {\n  display: flex;\n  align-items: end;\n  justify-content: center;\n  width: 1.15rem;\n  height: 4.9rem;\n  padding: 0.2rem;\n  border-radius: 999px;\n  background: rgba(148, 163, 184, 0.18);\n  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);\n\n  span {\n    display: block;\n    width: 100%;\n    border-radius: 999px;\n    background: linear-gradient(180deg, #38bdf8, #7c3aed);\n    box-shadow: 0 0 14px rgba(56, 189, 248, 0.24);\n  }\n}\n\n.preview-factor--strong strong {\n  color: #86efac;\n}\n\n.preview-factor--watch strong {\n  color: #fbbf24;\n}\n\n.preview-factor--strong .preview-factor__meter span {\n  background: linear-gradient(180deg, #22d3ee, #34d399);\n  box-shadow: 0 0 14px rgba(52, 211, 153, 0.24);\n}\n\n.preview-factor--watch .preview-factor__meter span {\n  background: linear-gradient(180deg, #f59e0b, #fb7185);\n  box-shadow: 0 0 14px rgba(245, 158, 11, 0.24);\n}\n\n.preview-shell--deal,\n.preview-shell--property {\n  grid-template-rows: auto auto 1fr;\n}\n\n.preview-deal-header h3,\n.preview-property-hero h3 {\n  margin: 0;\n  font-size: 1.32rem;\n  color: #f8fbff;\n}\n\n.preview-deal-header {\n  align-items: flex-start;\n\n  p {\n    margin: 0.5rem 0 0;\n    max-width: 25rem;\n    color: rgba(191, 219, 254, 0.78);\n    font-size: 0.9rem;\n    line-height: 1.45;\n  }\n}\n\n.preview-shell--orchestration {\n  grid-template-rows: auto auto 1fr;\n}\n\n.preview-kpi-board__header--orchestration {\n  padding-bottom: 0.2rem;\n}\n\n.preview-orchestration-metrics {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n\n  article {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: 0.75rem;\n    padding: 0.85rem 0.95rem;\n    border-radius: 0.95rem;\n    background: rgba(60, 78, 183, 0.38);\n    border: 1px solid rgba(191, 219, 254, 0.2);\n  }\n\n  span,\n  strong,\n  small {\n    display: block;\n  }\n\n  span {\n    color: rgba(226, 232, 240, 0.84);\n    font-size: 0.76rem;\n    font-weight: 800;\n  }\n\n  strong {\n    margin-top: 0.32rem;\n    color: #f8fbff;\n    font-size: 1.5rem;\n    line-height: 1;\n  }\n\n  small {\n    color: rgba(191, 219, 254, 0.88);\n    font-size: 0.76rem;\n    font-weight: 700;\n  }\n}\n\n.preview-orchestration-card {\n  display: grid;\n  grid-template-columns: 7rem 1fr auto;\n  gap: 0.85rem;\n  align-items: stretch;\n  position: relative;\n  overflow: hidden;\n  padding: 0.7rem;\n  border-radius: 1rem;\n  background: rgba(55, 70, 165, 0.32);\n  border: 1px solid rgba(191, 219, 254, 0.22);\n}\n\n.preview-orchestration-rank {\n  display: grid;\n  align-content: center;\n  justify-items: center;\n  padding: 0.9rem 0.6rem;\n  border-radius: 0.85rem;\n  text-transform: uppercase;\n\n  strong {\n    font-size: 1.85rem;\n    line-height: 1;\n    color: #fff8f1;\n  }\n\n  span {\n    margin-top: 0.32rem;\n    font-size: 0.76rem;\n    font-weight: 800;\n    letter-spacing: 0.08em;\n    color: rgba(255, 248, 241, 0.9);\n  }\n}\n\n.preview-orchestration-card--critical .preview-orchestration-rank {\n  background: linear-gradient(180deg, rgba(251, 59, 101, 0.95), rgba(254, 178, 178, 0.88));\n}\n\n.preview-orchestration-card--important .preview-orchestration-rank {\n  background: linear-gradient(180deg, rgba(249, 115, 22, 0.95), rgba(254, 215, 170, 0.86));\n}\n\n.preview-orchestration-card--low .preview-orchestration-rank {\n  background: linear-gradient(180deg, rgba(59, 130, 246, 0.9), rgba(191, 219, 254, 0.82));\n}\n\n.preview-orchestration-body {\n  display: grid;\n  gap: 0.6rem;\n  align-content: center;\n}\n\n.preview-orchestration-copy h4,\n.preview-orchestration-copy p {\n  margin: 0;\n}\n\n.preview-orchestration-copy h4 {\n  color: #f8fbff;\n  font-size: 1rem;\n}\n\n.preview-orchestration-copy p {\n  margin-top: 0.22rem;\n  color: rgba(191, 219, 254, 0.84);\n  font-size: 0.8rem;\n}\n\n.preview-orchestration-chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n\n  span {\n    display: inline-flex;\n    align-items: center;\n    padding: 0.34rem 0.55rem;\n    border-radius: 999px;\n    background: rgba(255, 255, 255, 0.09);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    color: rgba(241, 245, 249, 0.92);\n    font-size: 0.72rem;\n    font-weight: 700;\n  }\n}\n\n.preview-orchestration-actions {\n  display: grid;\n  align-content: center;\n  gap: 0.45rem;\n\n  button {\n    position: relative;\n    overflow: hidden;\n    min-width: 5.9rem;\n    padding: 0.55rem 0.8rem;\n    border-radius: 0.8rem;\n    border: 1px solid rgba(191, 219, 254, 0.2);\n    background: rgba(255, 255, 255, 0.08);\n    color: #f8fbff;\n    font: inherit;\n    font-size: 0.8rem;\n    font-weight: 700;\n  }\n}\n\n.preview-orchestration-actions button::before {\n  content: '';\n  position: absolute;\n  top: -120%;\n  left: -28%;\n  width: 72%;\n  height: 280%;\n  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.22), transparent);\n  transform: rotate(18deg);\n  animation: liquid-sheen 5.8s linear infinite;\n}\n\n.preview-orchestration-actions__accent {\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.92), rgba(102, 126, 234, 0.88)) !important;\n}\n\n.preview-deal-grid,\n.preview-property-metrics {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.75rem;\n\n  article {\n    padding: 0.9rem 0.95rem;\n    border-radius: 0.95rem;\n    background: rgba(255, 255, 255, 0.1);\n    border: 1px solid rgba(255, 255, 255, 0.12);\n  }\n\n  span {\n    display: block;\n    margin-bottom: 0.4rem;\n    color: rgba(148, 163, 184, 0.96);\n    font-size: 0.78rem;\n    font-weight: 800;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n\n  strong {\n    color: #f8fbff;\n    font-size: 1rem;\n  }\n}\n\n.preview-property-metrics article {\n  position: relative;\n  overflow: hidden;\n  display: grid;\n  grid-template-columns: auto 1fr;\n  grid-template-areas:\n    'icon label'\n    'icon value';\n  align-items: center;\n  column-gap: 0.8rem;\n}\n\n.preview-property-metric__icon {\n  grid-area: icon;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.35rem;\n  height: 2.35rem;\n  border-radius: 0.85rem;\n  background: rgba(30, 41, 59, 0.62);\n  border: 1px solid rgba(255, 255, 255, 0.14);\n  color: #dbeafe;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);\n\n  i {\n    font-size: 1rem;\n  }\n}\n\n.preview-property-metrics article span {\n  grid-area: label;\n  margin-bottom: 0.15rem;\n}\n\n.preview-property-metrics article strong {\n  grid-area: value;\n  font-size: 1.05rem;\n}\n\n.preview-property-metric--blue {\n  background: linear-gradient(180deg, rgba(59, 130, 246, 0.16), rgba(15, 23, 42, 0.68)) !important;\n}\n\n.preview-property-metric--green {\n  background: linear-gradient(180deg, rgba(34, 197, 94, 0.16), rgba(15, 23, 42, 0.68)) !important;\n}\n\n.preview-property-metric--amber {\n  background: linear-gradient(180deg, rgba(245, 158, 11, 0.16), rgba(15, 23, 42, 0.68)) !important;\n}\n\n.preview-property-metric--violet {\n  background: linear-gradient(180deg, rgba(168, 85, 247, 0.16), rgba(15, 23, 42, 0.68)) !important;\n}\n\n.preview-deal-grid article:nth-child(1) {\n  background: linear-gradient(180deg, rgba(59, 130, 246, 0.16), rgba(15, 23, 42, 0.68));\n}\n\n.preview-deal-grid article:nth-child(2) {\n  background: linear-gradient(180deg, rgba(251, 191, 36, 0.16), rgba(15, 23, 42, 0.68));\n}\n\n.preview-deal-grid article:nth-child(3) {\n  background: linear-gradient(180deg, rgba(34, 211, 238, 0.14), rgba(15, 23, 42, 0.68));\n}\n\n.preview-deal-grid article:nth-child(4) {\n  background: linear-gradient(180deg, rgba(167, 139, 250, 0.16), rgba(15, 23, 42, 0.68));\n}\n\n.preview-deal-confidence,\n.preview-deal-next {\n  position: relative;\n  overflow: hidden;\n  padding: 0.95rem 1rem;\n  border-radius: 1rem;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  background: rgba(30, 41, 59, 0.66);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);\n}\n\n.preview-deal-confidence::before,\n.preview-deal-next::before {\n  content: '';\n  position: absolute;\n  inset: -20% auto auto -10%;\n  width: 72%;\n  height: 130%;\n  border-radius: 50%;\n  background: linear-gradient(135deg, rgba(96, 165, 250, 0.18), rgba(168, 85, 247, 0.08), transparent 70%);\n  filter: blur(16px);\n  pointer-events: none;\n}\n\n.preview-deal-confidence__top {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.65rem;\n\n  span {\n    color: rgba(191, 219, 254, 0.82);\n    font-size: 0.76rem;\n    font-weight: 800;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n\n  strong {\n    color: #e0f2fe;\n    font-size: 1.2rem;\n    line-height: 1;\n  }\n}\n\n.preview-deal-confidence__bar {\n  position: relative;\n  z-index: 1;\n  height: 0.6rem;\n  overflow: hidden;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.08);\n\n  span {\n    display: block;\n    height: 100%;\n    border-radius: inherit;\n    background: linear-gradient(90deg, #22d3ee, #60a5fa 52%, #a78bfa);\n    box-shadow: 0 0 18px rgba(96, 165, 250, 0.28);\n  }\n}\n\n.preview-deal-next {\n  display: grid;\n  gap: 0.45rem;\n\n  span,\n  strong {\n    position: relative;\n    z-index: 1;\n  }\n\n  span {\n    color: rgba(191, 219, 254, 0.82);\n    font-size: 0.76rem;\n    font-weight: 800;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n\n  strong {\n    color: #f8fbff;\n    font-size: 0.98rem;\n    line-height: 1.45;\n  }\n}\n\n.preview-feed {\n  align-content: start;\n\n  article {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 1rem;\n    padding: 0.85rem 0.95rem;\n    border-radius: 0.95rem;\n    background: rgba(15, 23, 42, 0.58);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n  }\n\n  strong {\n    color: rgba(248, 250, 252, 0.94);\n    font-size: 0.88rem;\n  }\n\n  span {\n    color: rgba(148, 163, 184, 0.88);\n    font-size: 0.8rem;\n    text-align: right;\n  }\n}\n\n.preview-property-price {\n  font-size: 2rem;\n  font-weight: 800;\n  color: #f8fbff;\n}\n\n.preview-note-list--property {\n  grid-template-columns: 1fr;\n}\n\n.kpi-carousel__indicators {\n  position: absolute;\n  bottom: 1.25rem;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  gap: 0.625rem;\n  z-index: 2;\n}\n\n.kpi-carousel__dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  border: 2px solid rgba(255, 255, 255, 0.7);\n  background: transparent;\n  cursor: pointer;\n  padding: 0;\n  transition: all 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &.active {\n    background: #fff;\n    border-color: #fff;\n    box-shadow: 0 0 12px rgba(255, 255, 255, 0.6);\n    transform: scale(1.3);\n  }\n\n  &:hover:not(.active) {\n    background: rgba(255, 255, 255, 0.45);\n    transform: scale(1.1);\n  }\n}\n\n.kpi-carousel__label {\n  position: absolute;\n  top: 3.85rem;\n  left: 1rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  padding: 0.3rem 0.85rem;\n  background: rgba(0, 0, 0, 0.5);\n  backdrop-filter: blur(14px);\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: rgba(255, 255, 255, 0.92);\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  z-index: 2;\n  transition: opacity 300ms;\n}\n\n/* \u2500\u2500\u2500 Banner \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.banner {\n  position: relative;\n  z-index: 1;\n  padding: 3rem 0;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.12), rgba(118, 75, 162, 0.08));\n  border-top: 1px solid rgba(255, 255, 255, 0.06);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n}\n\n.banner__inner {\n  text-align: center;\n}\n\n.banner__icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 48px;\n  height: 48px;\n  border-radius: 14px;\n  background: var(--accent-gradient);\n  color: #fff;\n  font-size: 1.25rem;\n  margin-bottom: 0.75rem;\n}\n\n.banner__title {\n  margin: 0;\n  font-size: clamp(1.5rem, 3vw, 2.2rem);\n  font-weight: 800;\n  letter-spacing: -0.02em;\n  color: var(--text-hero);\n}\n\n.banner__subtitle {\n  margin: 0.5rem auto 0;\n  max-width: 560px;\n  font-size: 1rem;\n  color: rgba(241, 246, 255, 0.65);\n  line-height: 1.6;\n}\n\n/* \u2500\u2500\u2500 Stats Bar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.stats-bar {\n  position: relative;\n  z-index: 1;\n  padding: 2.5rem 0;\n  background: linear-gradient(180deg, rgba(15, 20, 46, 0.95) 0%, rgba(22, 33, 62, 0.9) 100%);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n}\n\n.stats-bar__inner {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 1.5rem;\n}\n\n.stat-item {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  align-items: start;\n  gap: 1rem;\n  min-height: 9rem;\n  padding: 1.1rem 1.25rem 1.2rem;\n  border-radius: var(--radius-lg);\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  backdrop-filter: blur(18px);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 20px 36px rgba(2, 6, 23, 0.2);\n  transition: transform 300ms, box-shadow 300ms, border-color 300ms;\n  position: relative;\n  overflow: hidden;\n\n  &:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 18px 42px rgba(2, 6, 23, 0.28);\n    border-color: rgba(255, 255, 255, 0.2);\n  }\n}\n\n.stat-item::before {\n  content: '';\n  position: absolute;\n  inset: auto;\n  top: -28%;\n  right: -12%;\n  width: 8rem;\n  height: 8rem;\n  border-radius: 50%;\n  filter: blur(18px);\n  opacity: 0.34;\n  pointer-events: none;\n}\n\n.stat-item__icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background: var(--accent-gradient);\n  color: #fff;\n  font-size: 1.15rem;\n  flex-shrink: 0;\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.26);\n}\n\n.stat-item__icon--azure {\n  background: linear-gradient(135deg, #38bdf8, #2563eb);\n}\n\n.stat-item__icon--emerald {\n  background: linear-gradient(135deg, #34d399, #059669);\n}\n\n.stat-item__icon--amber {\n  background: linear-gradient(135deg, #f59e0b, #f97316);\n}\n\n.stat-item__icon--rose {\n  background: linear-gradient(135deg, #fb7185, #e11d48);\n}\n\n.stat-item:nth-child(1)::before {\n  background: radial-gradient(circle, rgba(56, 189, 248, 0.8), transparent 68%);\n}\n\n.stat-item:nth-child(2)::before {\n  background: radial-gradient(circle, rgba(52, 211, 153, 0.72), transparent 68%);\n}\n\n.stat-item:nth-child(3)::before {\n  background: radial-gradient(circle, rgba(245, 158, 11, 0.72), transparent 68%);\n}\n\n.stat-item:nth-child(4)::before {\n  background: radial-gradient(circle, rgba(251, 113, 133, 0.72), transparent 68%);\n}\n\n.stat-item__content {\n  min-width: 0;\n}\n\n.stat-item__value {\n  display: block;\n  font-size: 1.6rem;\n  font-weight: 800;\n  color: #fff;\n  letter-spacing: -0.02em;\n}\n\n.stat-item__label {\n  display: block;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: rgba(241, 246, 255, 0.55);\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}\n\n.stat-item__description {\n  display: block;\n  margin-top: 0.5rem;\n  font-size: 0.9rem;\n  line-height: 1.45;\n  color: rgba(226, 232, 240, 0.8);\n}\n\n/* \u2500\u2500\u2500 Gradient Bridge \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.gradient-bridge {\n  position: relative;\n  z-index: 1;\n  height: 80px;\n  background: linear-gradient(180deg,\n    rgba(22, 33, 62, 0.9) 0%,\n    rgba(22, 33, 62, 0.6) 20%,\n    rgba(248, 250, 252, 0.4) 60%,\n    var(--surface-light) 100%);\n}\n\n/* \u2500\u2500\u2500 Proof / Differentiation \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.proof {\n  position: relative;\n  z-index: 1;\n  padding: 4.1rem 0 4.6rem;\n  background: linear-gradient(180deg, var(--surface-light) 0%, #eef3fb 100%);\n  color: var(--text-body);\n\n  .section-badge {\n    background: rgba(34, 197, 94, 0.1);\n    color: #15803d;\n  }\n\n  .section-subtitle {\n    color: var(--text-muted);\n  }\n}\n\n.proof__grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1.25rem;\n}\n\n.proof-card {\n  padding: 1.4rem 1.45rem;\n  border-radius: var(--radius-lg);\n  background: rgba(255, 255, 255, 0.82);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);\n\n  h3 {\n    margin: 0 0 0.55rem;\n    font-size: 1.05rem;\n    font-weight: 750;\n    color: #0f172a;\n  }\n\n  p {\n    margin: 0;\n    color: var(--text-muted);\n    line-height: 1.6;\n    font-size: 0.94rem;\n  }\n}\n\n/* \u2500\u2500\u2500 Signal To Decision Journey \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.journey {\n  position: relative;\n  z-index: 1;\n  padding: 5.2rem 0 5rem;\n  background:\n    radial-gradient(circle at top right, rgba(102, 126, 234, 0.12), transparent 34%),\n    linear-gradient(180deg, #eef3fb 0%, #f8fafc 100%);\n  color: var(--text-body);\n\n  .section-badge {\n    background: rgba(14, 165, 233, 0.12);\n    color: #0369a1;\n  }\n\n  .section-subtitle {\n    color: var(--text-muted);\n    max-width: 680px;\n  }\n}\n\n.journey__inner {\n  display: grid;\n  grid-template-columns: minmax(0, 0.84fr) minmax(0, 1.16fr);\n  gap: clamp(1.8rem, 3vw, 3rem);\n  align-items: start;\n}\n\n.journey__steps {\n  display: grid;\n  gap: 1rem;\n}\n\n.journey__guide {\n  margin: 0;\n  max-width: 34rem;\n  color: #475569;\n  font-size: 0.95rem;\n  line-height: 1.65;\n}\n\n.journey__story {\n  display: grid;\n  gap: 1rem;\n}\n\n.journey-step {\n  display: grid;\n  gap: 0.45rem;\n  text-align: left;\n  padding: 1.2rem 1.2rem;\n  border-radius: 1.15rem;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.78);\n  color: #0f172a;\n  cursor: pointer;\n  transition: transform 220ms, box-shadow 220ms, border-color 220ms, background 220ms, opacity 220ms;\n  min-height: 18rem;\n  opacity: 0.68;\n\n  strong {\n    font-size: 1.08rem;\n    line-height: 1.35;\n  }\n\n  p {\n    margin: 0;\n    color: #334155;\n    line-height: 1.65;\n    font-size: 0.95rem;\n  }\n\n  small {\n    color: var(--text-muted);\n    line-height: 1.5;\n    font-size: 0.88rem;\n    margin-top: auto;\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);\n  }\n\n  &--active {\n    opacity: 1;\n    border-color: rgba(102, 126, 234, 0.35);\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(237, 242, 255, 0.96));\n    box-shadow: 0 24px 44px rgba(102, 126, 234, 0.14);\n  }\n}\n\n.journey-step__index,\n.journey-step__eyebrow {\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.journey-step__index {\n  color: rgba(102, 126, 234, 0.65);\n}\n\n.journey-step__eyebrow {\n  color: #0369a1;\n}\n\n.journey__visual {\n  position: relative;\n}\n\n.journey__visual-shell {\n  position: sticky;\n  top: 6.75rem;\n}\n\n.journey-panel {\n  display: none;\n  padding: 1.6rem;\n  border-radius: 1.5rem;\n  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.88));\n  color: #e2e8f0;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  box-shadow: 0 26px 64px rgba(15, 23, 42, 0.22);\n  min-height: 32rem;\n\n  &--active {\n    display: block;\n    animation: fade-in-up 0.45s ease;\n  }\n}\n\n.journey-panel__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1.25rem;\n}\n\n.journey-panel__badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.35rem 0.7rem;\n  border-radius: 999px;\n  background: rgba(34, 211, 238, 0.12);\n  color: #67e8f9;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.journey-panel__status {\n  color: rgba(226, 232, 240, 0.64);\n  font-size: 0.82rem;\n  font-weight: 600;\n}\n\n.journey-panel__body {\n  display: grid;\n  gap: 1.3rem;\n}\n\n.journey-panel__summary h3 {\n  margin: 0 0 0.45rem;\n  font-size: 1.35rem;\n  line-height: 1.2;\n  color: #f8fafc;\n}\n\n.journey-panel__summary p,\n.journey-panel__outcome p {\n  margin: 0;\n  color: rgba(226, 232, 240, 0.78);\n  line-height: 1.65;\n}\n\n.journey-panel__label {\n  display: inline-block;\n  margin-bottom: 0.55rem;\n  color: rgba(148, 163, 184, 0.92);\n  font-size: 0.75rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.journey-panel__chips {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.6rem;\n}\n\n.journey-chip {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.48rem 0.72rem;\n  border-radius: 999px;\n  background: rgba(102, 126, 234, 0.16);\n  border: 1px solid rgba(102, 126, 234, 0.22);\n  color: #e0e7ff;\n  font-size: 0.83rem;\n  font-weight: 600;\n}\n\n.journey-panel__metrics {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.9rem;\n}\n\n.journey-metric {\n  padding: 0.95rem 1rem;\n  border-radius: 1rem;\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(148, 163, 184, 0.16);\n\n  strong {\n    display: block;\n    font-size: 1.05rem;\n    color: #f8fafc;\n    line-height: 1.3;\n  }\n\n  &--strong {\n    background: rgba(34, 197, 94, 0.12);\n    border-color: rgba(34, 197, 94, 0.24);\n  }\n\n  &--risk {\n    background: rgba(249, 115, 22, 0.12);\n    border-color: rgba(249, 115, 22, 0.24);\n  }\n}\n\n.journey-metric__label {\n  display: block;\n  margin-bottom: 0.32rem;\n  color: rgba(226, 232, 240, 0.62);\n  font-size: 0.76rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n}\n\n.journey__indicators {\n  display: flex;\n  justify-content: center;\n  gap: 0.6rem;\n  margin-top: 1rem;\n}\n\n.journey__dot {\n  width: 10px;\n  height: 10px;\n  padding: 0;\n  border: none;\n  border-radius: 50%;\n  background: rgba(100, 116, 139, 0.35);\n  cursor: pointer;\n  transition: transform 200ms, background 200ms;\n\n  &--active {\n    background: #667eea;\n    transform: scale(1.25);\n  }\n}\n\n/* \u2500\u2500\u2500 CRM Highlights \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.highlights {\n  position: relative;\n  z-index: 1;\n  padding: 4.75rem 0 5rem;\n  background:\n    radial-gradient(circle at top right, rgba(34, 211, 238, 0.1), transparent 26%),\n    radial-gradient(circle at bottom left, rgba(102, 126, 234, 0.12), transparent 30%),\n    linear-gradient(180deg, rgba(8, 15, 33, 0.82) 0%, rgba(11, 19, 38, 0.92) 100%);\n  color: var(--text-hero);\n\n  .section-badge {\n    background: rgba(125, 211, 252, 0.12);\n    color: #bae6fd;\n    border: 1px solid rgba(125, 211, 252, 0.18);\n  }\n\n  .section-subtitle {\n    color: rgba(241, 246, 255, 0.72);\n    max-width: 52rem;\n  }\n}\n\n.highlights__layout {\n  display: grid;\n  gap: 1.75rem;\n}\n\n.highlights__showcase {\n  display: grid;\n  grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);\n  gap: 1.2rem;\n  align-items: stretch;\n}\n\n.highlights__player-shell,\n.highlights__playlist,\n.highlights__cta {\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  background: rgba(255, 255, 255, 0.06);\n  backdrop-filter: blur(18px);\n  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.28);\n}\n\n.highlights__player-shell {\n  padding: 1.2rem;\n  border-radius: 1.6rem;\n}\n\n.highlights__player-meta {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 0.9rem;\n\n  h3 {\n    margin: 0.3rem 0 0;\n    font-size: clamp(1.2rem, 2vw, 1.6rem);\n    font-weight: 800;\n    letter-spacing: -0.02em;\n  }\n}\n\n.highlights__eyebrow {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.28rem 0.6rem;\n  border-radius: 999px;\n  background: rgba(102, 126, 234, 0.18);\n  color: #dbeafe;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.highlights__duration {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.55rem 0.75rem;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.7);\n  color: rgba(255, 255, 255, 0.86);\n  font-size: 0.85rem;\n  font-weight: 700;\n}\n\n.highlights__player {\n  display: block;\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  border-radius: 1.15rem;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  background: #020617;\n  object-fit: cover;\n  box-shadow: 0 22px 56px rgba(2, 6, 23, 0.42);\n}\n\n.highlights__summary {\n  display: grid;\n  gap: 1rem;\n  margin-top: 1rem;\n\n  p {\n    margin: 0;\n    color: rgba(241, 246, 255, 0.76);\n    line-height: 1.65;\n  }\n}\n\n.highlights__bullets {\n  list-style: none;\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.75rem;\n  padding: 0;\n  margin: 0;\n\n  li {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.55rem;\n    padding: 0.8rem 0.9rem;\n    border-radius: 1rem;\n    background: rgba(255, 255, 255, 0.06);\n    color: rgba(241, 246, 255, 0.92);\n    line-height: 1.45;\n  }\n\n  i {\n    color: #7dd3fc;\n    margin-top: 0.08rem;\n    flex-shrink: 0;\n  }\n}\n\n.highlights__playlist {\n  display: grid;\n  gap: 0.75rem;\n  padding: 1rem;\n  border-radius: 1.6rem;\n  align-content: start;\n}\n\n.highlights__playlist-item {\n  width: 100%;\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  gap: 0.85rem;\n  align-items: center;\n  padding: 1rem;\n  border-radius: 1.15rem;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  background: rgba(15, 23, 42, 0.4);\n  color: inherit;\n  cursor: pointer;\n  text-align: left;\n  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    border-color: rgba(125, 211, 252, 0.26);\n    background: rgba(15, 23, 42, 0.58);\n  }\n\n  &--active {\n    border-color: rgba(34, 211, 238, 0.35);\n    background: linear-gradient(135deg, rgba(29, 78, 216, 0.32), rgba(15, 23, 42, 0.7));\n    box-shadow: inset 0 0 0 1px rgba(125, 211, 252, 0.16);\n  }\n}\n\n.highlights__playlist-index {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.25rem;\n  height: 2.25rem;\n  border-radius: 0.85rem;\n  background: rgba(255, 255, 255, 0.08);\n  color: #e0ecff;\n  font-size: 0.82rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n}\n\n.highlights__playlist-copy {\n  min-width: 0;\n  display: grid;\n  gap: 0.28rem;\n\n  strong {\n    font-size: 0.98rem;\n    font-weight: 750;\n    letter-spacing: -0.01em;\n  }\n\n  small {\n    color: rgba(241, 246, 255, 0.64);\n    font-size: 0.82rem;\n    line-height: 1.45;\n  }\n}\n\n.highlights__playlist-duration {\n  color: rgba(241, 246, 255, 0.72);\n  font-size: 0.82rem;\n  font-weight: 700;\n}\n\n.highlights__playlist-link {\n  display: inline-flex;\n  align-items: center;\n  justify-self: start;\n  padding: 0.58rem 0.85rem;\n  border-radius: 0.8rem;\n  background: rgba(37, 99, 235, 0.2);\n  border: 1px solid rgba(96, 165, 250, 0.25);\n  color: #dbeafe;\n  font-size: 0.82rem;\n  font-weight: 700;\n  text-decoration: none;\n  transition: background 180ms ease, transform 180ms ease;\n\n  &:hover {\n    background: rgba(37, 99, 235, 0.3);\n    transform: translateY(-1px);\n  }\n}\n\n.highlights__resource-card {\n  display: grid;\n  gap: 0.7rem;\n  padding: 1rem;\n  border-radius: 1.15rem;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  background: rgba(15, 23, 42, 0.34);\n\n  p {\n    margin: 0;\n    color: rgba(241, 246, 255, 0.72);\n    line-height: 1.6;\n  }\n\n  ul {\n    margin: 0;\n    padding-left: 1.1rem;\n    color: rgba(241, 246, 255, 0.84);\n    display: grid;\n    gap: 0.45rem;\n  }\n}\n\n.highlights__resource-label {\n  color: #bfdbfe;\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.highlights__cta {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1rem 1.15rem;\n  border-radius: 1.3rem;\n\n  p {\n    margin: 0;\n    color: rgba(241, 246, 255, 0.76);\n    line-height: 1.55;\n  }\n}\n\n/* \u2500\u2500\u2500 Section Shared \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.section-badge {\n  display: inline-block;\n  padding: 0.3rem 0.85rem;\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  border-radius: 999px;\n  margin-bottom: 0.75rem;\n}\n\n.section-title {\n  margin: 0 0 0.5rem;\n  font-size: clamp(1.6rem, 3vw, 2.4rem);\n  font-weight: 800;\n  letter-spacing: -0.02em;\n}\n\n.section-subtitle {\n  margin: 0 0 2.5rem;\n  font-size: 1.05rem;\n  line-height: 1.6;\n  max-width: 40rem;\n}\n\n/* \u2500\u2500\u2500 Features \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.features {\n  position: relative;\n  z-index: 1;\n  padding: 5rem 0;\n  background: var(--surface-light);\n  color: var(--text-body);\n\n  .section-badge {\n    background: rgba(102, 126, 234, 0.1);\n    color: var(--accent);\n  }\n\n  .section-subtitle {\n    color: var(--text-muted);\n  }\n}\n\n/* \u2500\u2500\u2500 Operational Trust \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.trust {\n  position: relative;\n  z-index: 1;\n  padding: 4.35rem 0 4.7rem;\n  background: linear-gradient(180deg, #f8fafc 0%, #eef3fb 100%);\n  color: var(--text-body);\n\n  .section-badge {\n    background: rgba(34, 197, 94, 0.1);\n    color: #15803d;\n  }\n\n  .section-subtitle {\n    color: var(--text-muted);\n  }\n}\n\n.trust__grid {\n  display: none;\n}\n\n.trust__layout {\n  display: grid;\n  grid-template-columns: minmax(280px, 0.72fr) minmax(0, 1.28fr);\n  gap: clamp(1.5rem, 2.5vw, 2.5rem);\n  align-items: start;\n}\n\n.trust__intro {\n  position: sticky;\n  top: 6.5rem;\n}\n\n.trust__stream {\n  display: grid;\n  gap: 1rem;\n}\n\n.trust-card {\n  display: grid;\n  grid-template-columns: 8.5rem minmax(0, 1fr);\n  gap: 1.2rem;\n  align-items: start;\n  padding: 1.2rem 1.25rem;\n  border-radius: 1.15rem;\n  background: rgba(255, 255, 255, 0.86);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.06);\n}\n\n.trust-card__eyebrow {\n  display: inline-flex;\n  align-items: center;\n  min-height: 2rem;\n  color: #0f766e;\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\n.trust-card__body {\n  h3 {\n    margin: 0 0 0.42rem;\n    font-size: 0.98rem;\n    color: #0f172a;\n  }\n\n  p {\n    margin: 0;\n    color: var(--text-muted);\n    line-height: 1.58;\n    font-size: 0.91rem;\n  }\n}\n\n.features__grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1.25rem;\n}\n\n.feature-card {\n  padding: 1.5rem;\n  border-radius: var(--radius-lg);\n  background: var(--surface-white);\n  border: 1px solid #e2e8f0;\n  transition: transform 300ms, box-shadow 300ms;\n  will-change: transform;\n  transform-style: preserve-3d;\n  position: relative;\n  overflow: hidden;\n\n  &::after {\n    content: '';\n    position: absolute;\n    inset: 0;\n    border-radius: inherit;\n    background: radial-gradient(\n      300px circle at var(--glow-x, 50%) var(--glow-y, 50%),\n      rgba(102, 126, 234, 0.12),\n      transparent 60%\n    );\n    opacity: 0;\n    transition: opacity 400ms;\n    pointer-events: none;\n  }\n\n  &:hover::after {\n    opacity: 1;\n  }\n\n  &:hover {\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 0 30px rgba(102, 126, 234, 0.08);\n  }\n\n  h3 {\n    margin: 0.85rem 0 0.4rem;\n    font-size: 1.1rem;\n    font-weight: 700;\n    color: var(--text-body);\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.92rem;\n    line-height: 1.6;\n    color: var(--text-muted);\n  }\n}\n\n.feature-card__icon {\n  width: 44px;\n  height: 44px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 12px;\n  font-size: 1.15rem;\n  color: #fff;\n\n  &--primary { background: var(--accent-gradient); }\n  &--cyan { background: linear-gradient(135deg, #22d3ee, #06b6d4); }\n  &--green { background: linear-gradient(135deg, #4ade80, #22c55e); }\n  &--purple { background: linear-gradient(135deg, #a855f7, #9333ea); }\n  &--orange { background: linear-gradient(135deg, #fb923c, #f97316); }\n  &--slate { background: linear-gradient(135deg, #94a3b8, #64748b); }\n}\n\n/* \u2500\u2500\u2500 How It Works \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.how-it-works {\n  position: relative;\n  z-index: 1;\n  padding: 5rem 0;\n  background: var(--surface-white);\n  color: var(--text-body);\n\n  .section-badge {\n    background: rgba(34, 211, 238, 0.1);\n    color: #0891b2;\n  }\n\n  .section-subtitle {\n    color: var(--text-muted);\n  }\n}\n\n.how-it-works__steps {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 1.5rem;\n  counter-reset: step;\n}\n\n.step-card {\n  position: relative;\n  padding: 1.5rem;\n  border-radius: var(--radius-lg);\n  background: var(--surface-light);\n  border: 1px solid #e2e8f0;\n  text-align: center;\n\n  h3 {\n    margin: 0.75rem 0 0.4rem;\n    font-size: 1.1rem;\n    font-weight: 700;\n    color: var(--text-body);\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.92rem;\n    line-height: 1.6;\n    color: var(--text-muted);\n  }\n}\n\n.step-card__number {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: var(--accent-gradient);\n  color: #fff;\n  font-size: 1.15rem;\n  font-weight: 800;\n}\n\n/* \u2500\u2500\u2500 Pricing \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.pricing {\n  position: relative;\n  z-index: 1;\n  padding: 5rem 0;\n  background: var(--surface-light);\n  color: var(--text-body);\n  text-align: center;\n\n  .section-badge {\n    background: rgba(168, 85, 247, 0.1);\n    color: var(--purple);\n  }\n}\n\n.pricing__card {\n  position: relative;\n  max-width: 480px;\n  margin: 0 auto;\n  padding: 2.5rem 2rem;\n  border-radius: var(--radius-xl);\n  background: var(--surface-white);\n  border: 2px solid var(--accent);\n  box-shadow: 0 24px 48px rgba(102, 126, 234, 0.12);\n  text-align: left;\n}\n\n.pricing__term {\n  max-width: 38rem;\n}\n\n.pricing__badge {\n  position: absolute;\n  top: -0.75rem;\n  left: 50%;\n  transform: translateX(-50%);\n  padding: 0.3rem 1rem;\n  border-radius: 999px;\n  background: var(--accent-gradient);\n  color: #fff;\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\n.pricing__plan {\n  margin: 0.5rem 0 1rem;\n  font-size: 1.4rem;\n  font-weight: 800;\n  color: var(--text-body);\n}\n\n.pricing__amount {\n  display: block;\n  font-size: 1.5rem;\n  font-weight: 800;\n  color: var(--accent);\n}\n\n.pricing__term {\n  display: block;\n  margin-top: 0.2rem;\n  font-size: 0.9rem;\n  color: var(--text-muted);\n}\n\n.pricing__features {\n  list-style: none;\n  margin: 1.5rem 0;\n  padding: 0;\n\n  li {\n    display: flex;\n    align-items: center;\n    gap: 0.55rem;\n    padding: 0.45rem 0;\n    font-size: 0.95rem;\n    color: var(--text-body);\n    border-bottom: 1px solid #f1f5f9;\n\n    &:last-child { border-bottom: none; }\n\n    i {\n      color: var(--green);\n      font-size: 1rem;\n    }\n  }\n}\n\n.pricing__cta {\n  width: 100%;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  padding: 0.85rem 1.5rem;\n  font-family: inherit;\n  font-size: 1rem;\n  font-weight: 700;\n  border: none;\n  border-radius: 0.65rem;\n  background: var(--accent-gradient);\n  color: #fff;\n  cursor: pointer;\n  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.35);\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 10px 28px rgba(102, 126, 234, 0.5);\n  }\n\n  i { font-size: 0.95rem; }\n}\n\n/* \u2500\u2500\u2500 Final CTA \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.final-cta {\n  position: relative;\n  z-index: 1;\n  padding: 5rem 0;\n  background: var(--hero-bg);\n  text-align: center;\n  overflow: hidden;\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background: radial-gradient(ellipse at 50% 40%, rgba(102, 126, 234, 0.15), transparent 65%);\n    pointer-events: none;\n  }\n}\n\n/* \u2500\u2500\u2500 Commercial Clarity \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.commercial {\n  position: relative;\n  z-index: 1;\n  padding: 4.8rem 0;\n  background:\n    radial-gradient(circle at top left, rgba(102, 126, 234, 0.12), transparent 30%),\n    linear-gradient(180deg, #f3f6fd 0%, #eef2ff 100%);\n  color: var(--text-body);\n\n  .section-badge {\n    background: rgba(99, 102, 241, 0.1);\n    color: #4338ca;\n  }\n\n  .section-subtitle {\n    color: var(--text-muted);\n    max-width: 640px;\n  }\n}\n\n.commercial__inner {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(320px, 390px);\n  gap: clamp(1.5rem, 2.6vw, 2.6rem);\n  align-items: start;\n}\n\n.commercial__faq {\n  display: none;\n}\n\n.commercial__faq-list {\n  display: grid;\n  gap: 1rem;\n}\n\n.commercial-faq-row {\n  display: grid;\n  grid-template-columns: minmax(220px, 0.7fr) minmax(0, 1.3fr);\n  gap: 1.35rem;\n  padding: 1.1rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n\n  h3 {\n    margin: 0;\n    font-size: 1rem;\n    color: #0f172a;\n    line-height: 1.45;\n  }\n\n  p {\n    margin: 0;\n    color: var(--text-muted);\n    line-height: 1.6;\n  }\n}\n\n.commercial-checklist {\n  padding: 1.4rem;\n  border-radius: 1.15rem;\n  background: linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.92));\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  box-shadow: 0 24px 52px rgba(15, 23, 42, 0.18);\n  color: #e2e8f0;\n\n  h3 {\n    margin: 0 0 1rem;\n    font-size: 1.18rem;\n    line-height: 1.3;\n    color: #f8fafc;\n  }\n\n  ul {\n    list-style: none;\n    margin: 0 0 1.2rem;\n    padding: 0;\n    display: grid;\n    gap: 0.75rem;\n  }\n\n  li {\n    display: flex;\n    gap: 0.65rem;\n    align-items: flex-start;\n    color: rgba(226, 232, 240, 0.84);\n    line-height: 1.55;\n    font-size: 0.92rem;\n  }\n\n  i {\n    color: #67e8f9;\n    margin-top: 0.08rem;\n    flex-shrink: 0;\n  }\n}\n\n.commercial-checklist__eyebrow {\n  display: inline-block;\n  margin-bottom: 0.7rem;\n  font-size: 0.72rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n  color: #93c5fd;\n}\n\n.final-cta__inner {\n  position: relative;\n  max-width: 42rem;\n  margin-inline: auto;\n\n  h2 {\n    margin: 0 0 0.75rem;\n    font-size: clamp(1.7rem, 3vw, 2.6rem);\n    font-weight: 800;\n    color: var(--text-hero);\n    letter-spacing: -0.02em;\n  }\n\n  p {\n    margin: 0 auto 1.5rem;\n    max-width: 34rem;\n    font-size: 1.05rem;\n    color: rgba(241, 246, 255, 0.65);\n    line-height: 1.6;\n  }\n}\n\n.final-cta__confidence {\n  display: block;\n  margin-top: 0.9rem;\n  color: rgba(191, 219, 254, 0.78);\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\n\n/* \u2500\u2500\u2500 Footer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.footer {\n  position: relative;\n  z-index: 1;\n  padding: 3.5rem 0 0;\n  background: var(--footer-bg);\n  color: rgba(241, 246, 255, 0.7);\n}\n\n.footer__grid {\n  display: grid;\n  grid-template-columns: minmax(260px, 2fr) repeat(3, minmax(180px, 1fr));\n  gap: 2rem;\n}\n\n.footer__brand {\n  p {\n    margin: 0.75rem 0 0;\n    font-size: 0.9rem;\n    color: rgba(241, 246, 255, 0.55);\n    line-height: 1.5;\n    max-width: 260px;\n  }\n}\n\n.footer__col {\n  h4 {\n    margin: 0 0 0.75rem;\n    font-size: 0.85rem;\n    font-weight: 700;\n    color: rgba(255, 255, 255, 0.9);\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n  }\n\n  ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n\n    li {\n      margin-bottom: 0.4rem;\n    }\n\n    a {\n      font-size: 0.88rem;\n      color: rgba(241, 246, 255, 0.6);\n      text-decoration: none;\n      cursor: pointer;\n      transition: color 200ms;\n\n      &:hover { color: #fff; }\n    }\n  }\n}\n\n.footer__bottom {\n  margin-top: 2.5rem;\n  padding: 1.25rem 0;\n  border-top: 1px solid rgba(255, 255, 255, 0.08);\n  font-size: 0.82rem;\n  color: rgba(241, 246, 255, 0.4);\n}\n\n/* \u2500\u2500\u2500 Demo Dialog (kept from original) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.demo-modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 0.8rem;\n  padding: 0.2rem 0.2rem 0;\n\n  h3 { margin: 0; font-size: clamp(1.15rem, 2vw, 1.5rem); }\n  p { margin: 0.35rem 0 0; color: rgba(223, 236, 255, 0.78); }\n}\n\n.demo-modal-header .hero-brand { margin-bottom: 0.45rem; }\n\n.demo-form {\n  display: grid;\n  gap: 0.95rem;\n  padding: 0.2rem;\n}\n\n.field-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}\n\n.field-grid .form-field,\n.field-textarea {\n  display: grid;\n  gap: 0.42rem;\n  font-size: 0.85rem;\n  color: rgba(233, 241, 255, 0.92);\n}\n\n:host ::ng-deep .field-grid .p-iftalabel,\n:host ::ng-deep .field-textarea .p-iftalabel {\n  display: block;\n  width: 100%;\n}\n\n:host ::ng-deep .field-grid .p-select,\n:host ::ng-deep .field-grid .p-datepicker {\n  width: 100%;\n}\n\n:host ::ng-deep .field-grid .p-inputtext,\n:host ::ng-deep .field-grid .p-select,\n:host ::ng-deep .field-grid .p-datepicker-input,\n:host ::ng-deep .field-textarea textarea {\n  border: 1px solid rgba(200, 222, 255, 0.26);\n  background: rgba(255, 255, 255, 0.08);\n  color: #f6fbff;\n  border-radius: 0.65rem;\n  padding: 1.08rem 0.72rem 0.52rem;\n  font: inherit;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n:host ::ng-deep .field-grid .p-inputtext::placeholder,\n:host ::ng-deep .field-grid .p-datepicker-input::placeholder,\n:host ::ng-deep .field-textarea textarea::placeholder {\n  color: rgba(225, 238, 255, 0.45);\n}\n\n:host ::ng-deep .field-grid .p-inputtext:focus,\n:host ::ng-deep .field-grid .p-select.p-focus,\n:host ::ng-deep .field-grid .p-datepicker-input:focus,\n:host ::ng-deep .field-textarea textarea:focus {\n  outline: none;\n  border-color: rgba(102, 126, 234, 0.72);\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.18);\n}\n\n:host ::ng-deep .field-textarea textarea {\n  resize: vertical;\n  min-height: 118px;\n}\n\n:host ::ng-deep .field-grid .p-iftalabel label,\n:host ::ng-deep .field-textarea .p-iftalabel label {\n  color: rgba(221, 235, 255, 0.8);\n  font-size: 0.78rem;\n}\n\n:host ::ng-deep .field-grid .p-select-label {\n  color: rgba(246, 251, 255, 0.9);\n}\n\n:host ::ng-deep .field-grid .p-inputtext,\n:host ::ng-deep .field-grid .p-select,\n:host ::ng-deep .field-grid .p-datepicker .p-inputtext {\n  min-height: 3rem;\n}\n\n.form-error {\n  color: rgba(255, 156, 156, 0.96);\n  font-size: 0.74rem;\n}\n\n.demo-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.55rem;\n  padding-top: 0.2rem;\n}\n\n.demo-contact-note {\n  margin: 0.15rem 0 0;\n  font-size: 0.78rem;\n  color: rgba(201, 217, 242, 0.78);\n  text-align: right;\n\n  a {\n    color: rgba(147, 197, 253, 0.95);\n    text-decoration: none;\n    &:hover { text-decoration: underline; }\n  }\n}\n\n/* PrimeNG button overrides (dialog only) */\n:host ::ng-deep .ne-btn.p-button {\n  font-family: 'Manrope', sans-serif;\n  font-weight: 700;\n  font-size: 0.92rem;\n  border-radius: 0.55rem;\n  padding: 0.55rem 1.1rem;\n  transition: all 200ms;\n}\n\n:host ::ng-deep .ne-btn--primary.p-button {\n  background: var(--accent-gradient);\n  border: 1px solid rgba(102, 126, 234, 0.4);\n  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.35);\n}\n\n:host ::ng-deep .ne-btn--ghost.p-button {\n  background: rgba(255, 255, 255, 0.08);\n  color: #ffffff;\n  border-color: rgba(255, 255, 255, 0.2);\n}\n\n:host ::ng-deep .ne-btn--link.p-button {\n  background: transparent;\n  color: rgba(255, 255, 255, 0.92);\n}\n\n:host ::ng-deep .demo-dialog {\n  border-radius: 1.1rem;\n  border: 1px solid rgba(140, 180, 255, 0.34);\n  background:\n    radial-gradient(circle at 90% 8%, rgba(102, 126, 234, 0.16), transparent 35%),\n    linear-gradient(180deg, rgba(22, 32, 62, 0.96), rgba(17, 27, 54, 0.97));\n  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.52);\n  color: #f5f8ff;\n}\n\n:host ::ng-deep .demo-dialog .p-dialog-header {\n  background: transparent;\n  border-bottom: 1px solid rgba(140, 180, 255, 0.18);\n  padding: 1rem 1rem 0.8rem;\n}\n\n:host ::ng-deep .demo-dialog .p-dialog-content {\n  background: transparent;\n  padding: 0.8rem 1rem 1rem;\n  max-height: min(80dvh, 760px);\n}\n\n:host ::ng-deep .demo-dialog .p-dialog-header-close-button {\n  color: rgba(255, 255, 255, 0.86);\n}\n\n.demo-success-header h3 {\n  margin: 0.35rem 0 0;\n}\n\n.demo-success-header .hero-brand {\n  margin-bottom: 0;\n}\n\n.demo-success-body p {\n  margin: 0 0 0.6rem;\n  color: rgba(233, 241, 255, 0.92);\n  &:last-child { margin-bottom: 0; }\n}\n\n:host ::ng-deep .demo-success-dialog {\n  border-radius: 1rem;\n  border: 1px solid rgba(140, 180, 255, 0.34);\n  background:\n    radial-gradient(circle at 80% 10%, rgba(102, 126, 234, 0.14), transparent 34%),\n    linear-gradient(180deg, rgba(22, 32, 62, 0.96), rgba(17, 27, 54, 0.97));\n  color: #f5f8ff;\n}\n\n:host ::ng-deep .demo-success-dialog .p-dialog-header,\n:host ::ng-deep .demo-success-dialog .p-dialog-content,\n:host ::ng-deep .demo-success-dialog .p-dialog-footer {\n  background: transparent;\n}\n\n.demo-kicker {\n  margin: 0 0 0.35rem;\n  font-size: 0.68rem;\n  letter-spacing: 0.2em;\n  text-transform: uppercase;\n  color: rgba(197, 217, 255, 0.72);\n}\n\n/* \u2500\u2500\u2500 Animations \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n@keyframes orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(40px, -25px) scale(1.08); }\n  50% { transform: translate(80px, 15px) scale(0.92); }\n  75% { transform: translate(25px, 40px) scale(1.04); }\n}\n\n@keyframes crm-shimmer {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes crm-aura {\n  0%, 100% { opacity: 0.3; transform: scale(0.98); }\n  50% { opacity: 0.7; transform: scale(1.08); }\n}\n\n@keyframes fade-in-up {\n  from { opacity: 0; transform: translateY(24px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n/* \u2500\u2500\u2500 Responsive \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n@media (max-width: 1024px) {\n  .hero {\n    grid-template-columns: 1fr;\n    gap: 1.6rem;\n    min-height: auto;\n    padding-top: 5.75rem;\n    padding-bottom: 3rem;\n  }\n\n  .hero__content { text-align: center; }\n  .hero-brand { justify-content: center; }\n\n  .hero-proof-badge {\n    margin-inline: auto;\n  }\n\n  .hero__content {\n    max-width: 100%;\n  }\n\n  .hero-proof-points {\n    justify-items: center;\n    max-width: 34rem;\n    margin-inline: auto;\n  }\n  .hero__subtitle-wrap {\n    margin-inline: auto;\n    max-width: 34rem;\n    min-height: 5.2em;\n  }\n  .hero__cta { justify-content: center; }\n  .hero__cta-note {\n    margin-inline: auto;\n    text-align: center;\n  }\n  .hero-manifesto {\n    max-width: 34rem;\n    margin-inline: auto;\n    text-align: center;\n    border-left: none;\n    border-top: 3px solid rgba(125, 211, 252, 0.5);\n    border-radius: 0 0 0.5rem 0.5rem;\n  }\n\n  .hero__visual {\n    max-width: min(860px, 100%);\n    margin: 0 auto;\n    justify-self: center;\n    transform: none;\n  }\n\n  .hero__visual::before,\n  .hero__visual::after {\n    opacity: 0.72;\n    filter: blur(40px);\n  }\n\n  .journey__inner {\n    grid-template-columns: 1fr;\n  }\n\n  .journey__visual {\n    order: -1;\n  }\n\n  .journey__visual-shell {\n    position: relative;\n    top: auto;\n  }\n\n  .highlights__showcase {\n    grid-template-columns: 1fr;\n  }\n\n  .highlights__bullets {\n    grid-template-columns: 1fr;\n  }\n\n  .features__grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .trust__grid {\n    grid-template-columns: 1fr;\n  }\n\n  .trust__layout {\n    grid-template-columns: 1fr;\n  }\n\n  .trust__intro {\n    position: relative;\n    top: auto;\n  }\n\n  .trust-card {\n    grid-template-columns: 1fr;\n    gap: 0.5rem;\n  }\n\n  .commercial__inner {\n    grid-template-columns: 1fr;\n  }\n\n  .footer__grid {\n    grid-template-columns: 1fr 1fr;\n    gap: 1.5rem;\n  }\n\n  .footer__brand {\n    grid-column: 1 / -1;\n  }\n}\n\n@media (max-width: 768px) {\n  .shell { width: calc(100% - 1.5rem); }\n\n  .topbar {\n    padding: 0.6rem 0;\n  }\n\n  .topbar__inner {\n    gap: 0.85rem;\n  }\n\n  .topbar__logo {\n    height: 36px;\n  }\n\n  .topbar__nav {\n    display: none;\n    &--open {\n      display: flex;\n      flex-direction: column;\n      position: absolute;\n      top: 100%;\n      left: 0;\n      right: 0;\n      background: rgba(15, 20, 40, 0.95);\n      backdrop-filter: blur(20px);\n      padding: 0.75rem 1rem 1rem;\n      border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n      box-shadow: 0 18px 36px rgba(0, 0, 0, 0.28);\n\n      li a {\n        display: block;\n        padding: 0.65rem 0.85rem;\n      }\n    }\n  }\n\n  .topbar__actions { display: none; }\n  .topbar__hamburger { display: flex; }\n\n  .topbar__nav-actions {\n    display: none;\n  }\n\n  .hero__visual {\n    max-width: 100%;\n  }\n\n  .kpi-carousel {\n    min-height: 320px;\n    aspect-ratio: 4 / 3;\n    transform: none;\n  }\n\n  .kpi-carousel__frame {\n    top: 0.75rem;\n    left: 0.75rem;\n    right: 0.75rem;\n  }\n\n  .kpi-carousel__label {\n    top: 3.35rem;\n  }\n\n  .kpi-carousel__slide {\n    padding: 4.4rem 1rem 3rem;\n  }\n\n  .preview-note-list,\n  .preview-deal-grid,\n  .preview-property-metrics,\n  .preview-kpi-stage-row,\n  .preview-kpi-metrics,\n  .preview-orchestration-metrics {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-score,\n  .preview-stage__top,\n  .preview-feed article,\n  .preview-property-hero,\n  .preview-deal-header,\n  .preview-kpi-board__header,\n  .preview-orchestration-card {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .preview-orchestration-card {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-orchestration-actions {\n    width: 100%;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .preview-score__ring {\n    width: 6.2rem;\n    height: 6.2rem;\n  }\n\n  .journey {\n    padding: 4rem 0;\n  }\n\n  .journey__story {\n    gap: 0.85rem;\n  }\n\n  .journey-panel {\n    padding: 1.2rem;\n    min-height: auto;\n  }\n\n  .highlights {\n    padding: 4rem 0;\n  }\n\n  .highlights__player-shell,\n  .highlights__playlist {\n    padding: 0.95rem;\n  }\n\n  .highlights__cta {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .journey-panel__header {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .topbar__nav--open .topbar__nav-actions {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n    padding: 0.5rem 0.85rem 0.25rem;\n    border-top: 1px solid rgba(255, 255, 255, 0.08);\n    margin-top: 0.5rem;\n\n    .nav-btn {\n      width: 100%;\n      text-align: center;\n      justify-content: center;\n    }\n  }\n\n  .hero {\n    padding-top: 4.7rem;\n    padding-bottom: 2.4rem;\n    gap: 1.25rem;\n  }\n\n  .hero__title { font-size: clamp(1.8rem, 7vw, 2.8rem); }\n\n  .hero-proof-badge {\n    max-width: 100%;\n    font-size: 0.76rem;\n    line-height: 1.45;\n    padding: 0.5rem 0.8rem;\n  }\n\n  .hero__subtitle-wrap {\n    min-height: auto;\n    margin: 0.95rem auto 1.35rem;\n  }\n\n  .hero__subtitle {\n    font-size: 0.98rem;\n    line-height: 1.6;\n    max-width: 100%;\n\n    &:not(.hero__subtitle--active) {\n      display: none;\n    }\n\n    &--active {\n      position: relative;\n    }\n  }\n\n  .hero__title-text {\n    &:not(.hero__title-text--active) {\n      display: none;\n    }\n\n    &.hero__title-text--active {\n      position: relative;\n    }\n  }\n\n  .hero-proof-points {\n    gap: 0.55rem;\n\n    li {\n      font-size: 0.9rem;\n      text-align: left;\n    }\n  }\n\n  .hero__cta {\n    gap: 0.6rem;\n  }\n\n  .hero__cta-note {\n    justify-items: center;\n    text-align: center;\n  }\n\n  .hero-btn {\n    width: 100%;\n    justify-content: center;\n  }\n\n  .features__grid,\n  .proof__grid,\n  .how-it-works__steps,\n  .trust__grid,\n  .journey-panel__metrics {\n    grid-template-columns: 1fr;\n  }\n\n  .commercial-faq-row {\n    grid-template-columns: 1fr;\n    gap: 0.55rem;\n  }\n\n  .journey-step {\n    min-height: auto;\n  }\n\n  .commercial {\n    padding: 4rem 0;\n  }\n\n  .proof,\n  .trust,\n  .how-it-works,\n  .pricing {\n    padding-top: 4rem;\n    padding-bottom: 4rem;\n  }\n\n  .commercial-checklist {\n    padding: 1.2rem;\n  }\n\n  .stats-bar__inner {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 0.75rem;\n  }\n\n  .field-grid { grid-template-columns: 1fr; }\n\n  :host ::ng-deep .demo-dialog .p-dialog-header {\n    padding: 0.9rem 0.9rem 0.65rem;\n  }\n\n  :host ::ng-deep .demo-dialog .p-dialog-content {\n    padding: 0.7rem 0.9rem 0.9rem;\n    max-height: min(84dvh, 760px);\n  }\n\n  .demo-modal-header {\n    gap: 0.55rem;\n  }\n\n  .footer__grid {\n    grid-template-columns: 1fr;\n    gap: 1.5rem;\n  }\n}\n\n@media (max-width: 480px) {\n  .shell {\n    width: calc(100% - 1rem);\n  }\n\n  .topbar__nav--open {\n    left: 0.5rem;\n    right: 0.5rem;\n    border-radius: 0 0 1rem 1rem;\n  }\n\n  .hero {\n    padding-top: 4.35rem;\n    padding-bottom: 2rem;\n  }\n\n  .hero-brand {\n    margin-bottom: 0.65rem;\n  }\n\n  .hero-brand-wordmark {\n    font-size: 0.68rem;\n    letter-spacing: 0.16em;\n  }\n\n  .hero-brand-crm {\n    font-size: 0.98rem;\n  }\n\n  .hero-proof-badge {\n    border-radius: 1rem;\n  }\n\n  .hero__title {\n    min-height: auto;\n  }\n\n  .hero__subtitle-wrap {\n    min-height: auto;\n  }\n\n  .hero__cta {\n    flex-direction: column;\n    align-items: stretch;\n\n    .hero-btn { justify-content: center; }\n  }\n\n  .hero-proof-points li {\n    font-size: 0.86rem;\n  }\n\n  .journey-step {\n    padding: 0.95rem 1rem;\n  }\n\n  .highlights__player-meta,\n  .highlights__playlist-item {\n    grid-template-columns: 1fr;\n  }\n\n  .highlights__duration,\n  .highlights__playlist-duration {\n    justify-self: start;\n  }\n\n  .journey-panel__summary h3 {\n    font-size: 1.15rem;\n  }\n\n  .journey-chip {\n    width: 100%;\n    justify-content: center;\n  }\n\n  .commercial-faq-card,\n  .trust-card {\n    padding: 1.05rem 1rem;\n  }\n\n  .hero__cta-note p,\n  .final-cta__confidence {\n    font-size: 0.84rem;\n  }\n\n  .section-title {\n    font-size: 1.45rem;\n  }\n\n  .section-subtitle {\n    margin-bottom: 1.8rem;\n    font-size: 0.96rem;\n  }\n\n  .pricing__card { padding: 2rem 1.25rem; }\n\n  .stats-bar__inner {\n    grid-template-columns: 1fr;\n  }\n\n  .stat-item {\n    padding: 0.75rem 1rem;\n  }\n\n  .gradient-bridge {\n    height: 50px;\n  }\n\n  .kpi-carousel {\n    min-height: 240px;\n    border-radius: 1rem;\n  }\n\n  .hero__visual::before,\n  .hero__visual::after {\n    opacity: 0.58;\n    filter: blur(34px);\n  }\n\n  .kpi-carousel__slide {\n    padding: 4rem 0.75rem 2.7rem;\n  }\n\n  .preview-shell {\n    padding: 0.95rem;\n  }\n\n  .preview-kpi-board__total strong,\n  .preview-property-price {\n    font-size: 1.55rem;\n  }\n\n  .preview-score__summary h3,\n  .preview-deal-header h3,\n  .preview-property-hero h3,\n  .preview-kpi-board__header h3 {\n    font-size: 1.05rem;\n  }\n\n  .preview-factor,\n  .preview-stage,\n  .preview-feed article,\n  .preview-deal-grid article,\n  .preview-property-metrics article,\n  .preview-note-list span,\n  .preview-kpi-metrics article,\n  .preview-orchestration-metrics article,\n  .preview-orchestration-card {\n    padding: 0.72rem 0.78rem;\n  }\n\n  .preview-factor-list {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n\n  .preview-kpi-stage strong {\n    font-size: 1.45rem;\n  }\n\n  .preview-orchestration-actions {\n    grid-template-columns: 1fr;\n  }\n\n  .kpi-carousel__label {\n    top: 0.75rem;\n    left: 0.75rem;\n    font-size: 0.68rem;\n    padding: 0.25rem 0.65rem;\n  }\n\n  .kpi-carousel__indicators {\n    bottom: 0.8rem;\n  }\n\n  :host ::ng-deep .demo-dialog {\n    border-radius: 0.9rem;\n  }\n}\n\n@media (max-width: 640px) {\n  .preview-factor-list {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-factor {\n    min-height: auto;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .orb,\n  .hero-brand-crm,\n  .hero-brand-crm::after,\n  .kpi-carousel,\n  .kpi-carousel__track,\n  .preview-shell::before,\n  .preview-shell::after,\n  .preview-kpi-stage::before,\n  .preview-kpi-metrics article::before,\n  .preview-factor::before,\n  .preview-deal-grid article::before,\n  .preview-property-metrics article::before,\n  .preview-feed article::before,\n  .preview-orchestration-metrics article::before,\n  .preview-orchestration-card::before,\n  .preview-score__ring::after,\n  .preview-orchestration-actions button::before {\n    animation: none !important;\n    transition: none !important;\n  }\n\n  .scroll-animate {\n    opacity: 1;\n    transform: none;\n    transition: none;\n  }\n\n  .feature-card {\n    transition: none;\n  }\n}\n\n@keyframes liquid-drift {\n  0% {\n    transform: translate3d(0, 0, 0) scale(1) rotate(0deg);\n  }\n  33% {\n    transform: translate3d(10px, -8px, 0) scale(1.06) rotate(6deg);\n  }\n  66% {\n    transform: translate3d(-8px, 10px, 0) scale(0.96) rotate(-5deg);\n  }\n  100% {\n    transform: translate3d(0, 0, 0) scale(1) rotate(0deg);\n  }\n}\n\n@keyframes liquid-pulse {\n  0%, 100% {\n    opacity: 0.4;\n    transform: scale(0.96);\n  }\n  50% {\n    opacity: 0.78;\n    transform: scale(1.03);\n  }\n}\n\n@keyframes liquid-sheen {\n  0% {\n    transform: translateX(-180%) rotate(18deg);\n    opacity: 0;\n  }\n  15% {\n    opacity: 1;\n  }\n  55% {\n    opacity: 1;\n  }\n  100% {\n    transform: translateX(280%) rotate(18deg);\n    opacity: 0;\n  }\n}\n"] }]
    }], null, { onWindowScroll: [{
            type: HostListener,
            args: ['window:scroll']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LandingPage, { className: "LandingPage", filePath: "src/app/public/landing/landing.page.ts", lineNumber: 117 }); })();
