import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { ActivatedRoute } from '@angular/router';
import { exportToCsv } from '../../../../shared/utils/csv';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/opportunity-data.service";
import * as i2 from "@angular/router";
import * as i3 from "../../settings/services/user-admin-data.service";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "primeng/api";
import * as i7 from "primeng/table";
import * as i8 from "primeng/inputtext";
import * as i9 from "primeng/select";
import * as i10 from "primeng/button";
import * as i11 from "primeng/paginator";
const _c0 = () => [1, 2];
const _c1 = () => [1, 2, 3, 4, 5];
const _c2 = () => [5, 10, 20];
function OpportunitiesPage_div_151_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 99)(1, "span");
    i0.ɵɵtext(2, "ALERT");
    i0.ɵɵelementEnd()();
} }
function OpportunitiesPage_div_187_span_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 103);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "i", 104);
    i0.ɵɵlistener("click", function OpportunitiesPage_div_187_span_3_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.searchTerm = ""; return i0.ɵɵresetView(ctx_r1.onSearch("")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \"", ctx_r1.searchTerm, "\" ");
} }
function OpportunitiesPage_div_187_span_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 103);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "i", 104);
    i0.ɵɵlistener("click", function OpportunitiesPage_div_187_span_4_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onStageChange("all")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.stageFilter, " ");
} }
function OpportunitiesPage_div_187_span_5_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 103);
    i0.ɵɵtext(1, " No next step ");
    i0.ɵɵelementStart(2, "i", 104);
    i0.ɵɵlistener("click", function OpportunitiesPage_div_187_span_5_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onMissingNextStepToggle()); });
    i0.ɵɵelementEnd()();
} }
function OpportunitiesPage_div_187_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100)(1, "span", 101);
    i0.ɵɵtext(2, "Active filters:");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, OpportunitiesPage_div_187_span_3_Template, 3, 1, "span", 102)(4, OpportunitiesPage_div_187_span_4_Template, 3, 1, "span", 102)(5, OpportunitiesPage_div_187_span_5_Template, 3, 0, "span", 102);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.searchTerm);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.stageFilter !== "all");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.missingNextStepOnly);
} }
function OpportunitiesPage_section_188_ng_container_1_div_1_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 114);
    i0.ɵɵelement(1, "div", 115)(2, "div", 116);
    i0.ɵɵelementEnd();
} }
function OpportunitiesPage_section_188_ng_container_1_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 108)(1, "div", 109)(2, "span", 110);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 111);
    i0.ɵɵtext(5, "\u2014");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 112);
    i0.ɵɵtemplate(7, OpportunitiesPage_section_188_ng_container_1_div_1_div_7_Template, 3, 0, "div", 113);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const stage_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("border-color", ctx_r1.stageColumnColor(stage_r5));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stage_r5);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(4, _c0));
} }
function OpportunitiesPage_section_188_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, OpportunitiesPage_section_188_ng_container_1_div_1_Template, 8, 5, "div", 107);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.kanbanStages);
} }
function OpportunitiesPage_section_188_ng_container_2_div_1_div_7_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 139);
    i0.ɵɵelement(1, "i", 140);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const deal_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 1, deal_r7.closeDate, "mediumDate"));
} }
function OpportunitiesPage_section_188_ng_container_2_div_1_div_7_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 141);
    i0.ɵɵelement(1, "i", 74);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const deal_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.nextStepLabel(deal_r7));
} }
function OpportunitiesPage_section_188_ng_container_2_div_1_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 119);
    i0.ɵɵlistener("click", function OpportunitiesPage_section_188_ng_container_2_div_1_div_7_Template_div_click_0_listener() { const deal_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.canManage() ? ctx_r1.onEdit(deal_r7) : null); });
    i0.ɵɵelementStart(1, "div", 120)(2, "div", 121);
    i0.ɵɵelement(3, "img", 122);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 123)(5, "span", 124);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 125);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 126);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 127)(12, "div", 128);
    i0.ɵɵelement(13, "i", 37);
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(17, OpportunitiesPage_section_188_ng_container_2_div_1_div_7_div_17_Template, 5, 4, "div", 129)(18, OpportunitiesPage_section_188_ng_container_2_div_1_div_7_div_18_Template, 4, 1, "div", 130);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 131)(20, "span", 132);
    i0.ɵɵelement(21, "i", 133);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 134)(24, "button", 135);
    i0.ɵɵlistener("click", function OpportunitiesPage_section_188_ng_container_2_div_1_div_7_Template_button_click_24_listener($event) { const deal_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.onEdit(deal_r7)); });
    i0.ɵɵelement(25, "i", 136);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 137);
    i0.ɵɵlistener("click", function OpportunitiesPage_section_188_ng_container_2_div_1_div_7_Template_button_click_26_listener($event) { const deal_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.onDelete(deal_r7)); });
    i0.ɵɵelement(27, "i", 138);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const deal_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("background", "linear-gradient(135deg, " + ctx_r1.stageColumnColor(deal_r7.stage) + " 0%, " + ctx_r1.stageColumnColor(deal_r7.stage) + "cc 100%)");
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", deal_r7.profilePictureUrl || "https://i.pravatar.cc/150?u=" + deal_r7.id, i0.ɵɵsanitizeUrl)("alt", deal_r7.name + " avatar")("title", deal_r7.name + " avatar");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(deal_r7.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(deal_r7.account || "No account");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("high", deal_r7.probability >= 70)("medium", deal_r7.probability >= 40 && deal_r7.probability < 70)("low", deal_r7.probability < 40);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", deal_r7.probability || 0, "% ");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(16, 20, deal_r7.amount, deal_r7.currency, "symbol", "1.0-0"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", deal_r7.closeDate);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isStalled(deal_r7));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", deal_r7.owner || "Unassigned", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
} }
function OpportunitiesPage_section_188_ng_container_2_div_1_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 142);
    i0.ɵɵelement(1, "i", 51);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const stage_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("No ", stage_r8.toLowerCase(), " deals");
} }
function OpportunitiesPage_section_188_ng_container_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 108)(1, "div", 109)(2, "span", 110);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 111);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 112);
    i0.ɵɵtemplate(7, OpportunitiesPage_section_188_ng_container_2_div_1_div_7_Template, 28, 25, "div", 117)(8, OpportunitiesPage_section_188_ng_container_2_div_1_div_8_Template, 4, 1, "div", 118);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const stage_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("border-color", ctx_r1.stageColumnColor(stage_r8));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stage_r8);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.getOpportunitiesByStage(stage_r8).length);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.getOpportunitiesByStage(stage_r8));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.getOpportunitiesByStage(stage_r8).length);
} }
function OpportunitiesPage_section_188_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, OpportunitiesPage_section_188_ng_container_2_div_1_Template, 9, 6, "div", 107);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.kanbanStages);
} }
function OpportunitiesPage_section_188_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 105);
    i0.ɵɵtemplate(1, OpportunitiesPage_section_188_ng_container_1_Template, 2, 1, "ng-container", 106)(2, OpportunitiesPage_section_188_ng_container_2_Template, 2, 1, "ng-container", 106);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.loading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.loading());
} }
function OpportunitiesPage_section_189_div_19_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 155);
    i0.ɵɵelement(1, "div", 156)(2, "div", 157)(3, "div", 158)(4, "div", 159)(5, "div", 157)(6, "div", 160);
    i0.ɵɵelementEnd();
} }
function OpportunitiesPage_section_189_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 153);
    i0.ɵɵtemplate(1, OpportunitiesPage_section_189_div_19_div_1_Template, 7, 0, "div", 154);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c1));
} }
function OpportunitiesPage_section_189_div_20_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 161)(1, "div", 162);
    i0.ɵɵelement(2, "i", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "No deals found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Try adjusting your search or filters to find what you're looking for");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 163);
    i0.ɵɵlistener("click", function OpportunitiesPage_section_189_div_20_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onStageChange("all")); });
    i0.ɵɵelement(8, "i", 33);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "Reset Filters");
    i0.ɵɵelementEnd()()();
} }
function OpportunitiesPage_section_189_div_21_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 168);
    i0.ɵɵtext(2, " Deal ");
    i0.ɵɵelement(3, "p-sortIcon", 169);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "th", 170);
    i0.ɵɵtext(5, " Account ");
    i0.ɵɵelement(6, "p-sortIcon", 171);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 172);
    i0.ɵɵtext(8, " Stage ");
    i0.ɵɵelement(9, "p-sortIcon", 173);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "th", 174);
    i0.ɵɵtext(11, " Amount ");
    i0.ɵɵelement(12, "p-sortIcon", 175);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 176);
    i0.ɵɵtext(14, " Probability ");
    i0.ɵɵelement(15, "p-sortIcon", 177);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "th", 178);
    i0.ɵɵtext(17, "Risk");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "th", 179);
    i0.ɵɵtext(19, " Status ");
    i0.ɵɵelement(20, "p-sortIcon", 180);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "th", 181);
    i0.ɵɵtext(22, " Owner ");
    i0.ɵɵelement(23, "p-sortIcon", 182);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "th", 183);
    i0.ɵɵtext(25, " Created ");
    i0.ɵɵelement(26, "p-sortIcon", 184);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "th", 185);
    i0.ɵɵtext(28, "Actions");
    i0.ɵɵelementEnd()();
} }
function OpportunitiesPage_section_189_div_21_ng_template_3_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "p-select", 208);
    i0.ɵɵlistener("ngModelChange", function OpportunitiesPage_section_189_div_21_ng_template_3_ng_container_13_Template_p_select_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r13); const row_r12 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onInlineStageChange(row_r12, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const row_r12 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r1.stageOptionsInline)("ngModel", row_r12.stage);
} }
function OpportunitiesPage_section_189_div_21_ng_template_3_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 200);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵclassProp("status-badge--success", row_r12.stage === "Closed Won")("status-badge--danger", row_r12.stage === "Closed Lost");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", row_r12.stage, " ");
} }
function OpportunitiesPage_section_189_div_21_ng_template_3_span_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 209);
    i0.ɵɵelement(1, "i", 74);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r12 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.nextStepLabel(row_r12), " ");
} }
function OpportunitiesPage_section_189_div_21_ng_template_3_span_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "On track");
    i0.ɵɵelementEnd();
} }
function OpportunitiesPage_section_189_div_21_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 186);
    i0.ɵɵlistener("click", function OpportunitiesPage_section_189_div_21_ng_template_3_Template_tr_click_0_listener($event) { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onRowClick(row_r12, $event)); });
    i0.ɵɵelementStart(1, "td", 187)(2, "div", 188);
    i0.ɵɵelement(3, "i", 51);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 189)(5, "span", 190);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 191);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "td")(10, "span", 192);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtemplate(13, OpportunitiesPage_section_189_div_21_ng_template_3_ng_container_13_Template, 2, 2, "ng-container", 193)(14, OpportunitiesPage_section_189_div_21_ng_template_3_ng_template_14_Template, 2, 5, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td")(17, "span", 194);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "td")(21, "div", 195)(22, "div", 196);
    i0.ɵɵelement(23, "div", 197);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 198);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(26, "td");
    i0.ɵɵtemplate(27, OpportunitiesPage_section_189_div_21_ng_template_3_span_27_Template, 3, 1, "span", 199)(28, OpportunitiesPage_section_189_div_21_ng_template_3_span_28_Template, 2, 0, "span", 106);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "td")(30, "span", 200);
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "td")(33, "p-select", 201);
    i0.ɵɵlistener("ngModelChange", function OpportunitiesPage_section_189_div_21_ng_template_3_Template_p_select_ngModelChange_33_listener($event) { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onInlineOwnerChange(row_r12, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "td", 202)(35, "span", 203);
    i0.ɵɵtext(36);
    i0.ɵɵpipe(37, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(38, "td", 204)(39, "div", 205)(40, "button", 206);
    i0.ɵɵlistener("click", function OpportunitiesPage_section_189_div_21_ng_template_3_Template_button_click_40_listener($event) { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.onEdit(row_r12)); });
    i0.ɵɵelement(41, "i", 136);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "button", 207);
    i0.ɵɵlistener("click", function OpportunitiesPage_section_189_div_21_ng_template_3_Template_button_click_42_listener($event) { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.onDelete(row_r12)); });
    i0.ɵɵelement(43, "i", 138);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const row_r12 = ctx.$implicit;
    const closedStage_r14 = i0.ɵɵreference(15);
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("row-stalled", ctx_r1.isStalled(row_r12));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(row_r12.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r12.stage);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r12.account || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !row_r12.stage.startsWith("Closed"))("ngIfElse", closedStage_r14);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(19, 25, row_r12.amount, row_r12.currency));
    i0.ɵɵadvance(5);
    i0.ɵɵstyleProp("width", row_r12.probability || 0, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", row_r12.probability || 0, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.isStalled(row_r12));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isStalled(row_r12));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("status-badge--success", row_r12.status === "Closed Won")("status-badge--danger", row_r12.status === "Closed Lost")("status-badge--info", row_r12.status === "Open");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", row_r12.status, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("options", ctx_r1.ownerOptionsForAssign())("ngModel", row_r12.ownerId);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(37, 28, row_r12.createdAtUtc, "MMM d, yyyy"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
} }
function OpportunitiesPage_section_189_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 164)(1, "p-table", 165);
    i0.ɵɵtemplate(2, OpportunitiesPage_section_189_div_21_ng_template_2_Template, 29, 0, "ng-template", 166)(3, OpportunitiesPage_section_189_div_21_ng_template_3_Template, 44, 31, "ng-template", 167);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.opportunities())("resizableColumns", true);
} }
function OpportunitiesPage_section_189_p_paginator_22_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-paginator", 210);
    i0.ɵɵlistener("onPageChange", function OpportunitiesPage_section_189_p_paginator_22_Template_p_paginator_onPageChange_0_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onPageChange($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("rows", ctx_r1.rows)("totalRecords", ctx_r1.total())("rowsPerPageOptions", i0.ɵɵpureFunction0(4, _c2))("first", ctx_r1.pageIndex * ctx_r1.rows);
} }
function OpportunitiesPage_section_189_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 143)(1, "div", 144)(2, "header", 145)(3, "div", 146)(4, "h2");
    i0.ɵɵtext(5, "Deal Records");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 147);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 148)(9, "button", 94);
    i0.ɵɵlistener("click", function OpportunitiesPage_section_189_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onExport()); });
    i0.ɵɵelementStart(10, "span", 30);
    i0.ɵɵelement(11, "i", 95);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13, "Export");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "button", 29);
    i0.ɵɵlistener("click", function OpportunitiesPage_section_189_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onCreate()); });
    i0.ɵɵelementStart(15, "span", 30);
    i0.ɵɵelement(16, "i", 31);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18, "Add Deal");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(19, OpportunitiesPage_section_189_div_19_Template, 2, 2, "div", 149)(20, OpportunitiesPage_section_189_div_20_Template, 11, 0, "div", 150)(21, OpportunitiesPage_section_189_div_21_Template, 4, 2, "div", 151)(22, OpportunitiesPage_section_189_p_paginator_22_Template, 1, 5, "p-paginator", 152);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.opportunities().length, " of ", ctx_r1.total(), " records ");
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r1.loading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.loading() && !ctx_r1.opportunities().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.loading() && ctx_r1.opportunities().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.loading() && ctx_r1.opportunities().length);
} }
export class OpportunitiesPage {
    opportunityData;
    router;
    userAdminData;
    viewMode = 'table';
    kanbanStages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
    stageOptions = [
        { label: 'Prospecting', value: 'Prospecting' },
        { label: 'Qualification', value: 'Qualification' },
        { label: 'Proposal', value: 'Proposal' },
        { label: 'Negotiation', value: 'Negotiation' },
        { label: 'Closed Won', value: 'Closed Won' },
        { label: 'Closed Lost', value: 'Closed Lost' }
    ];
    stageOptionsInline = this.stageOptions.filter((stage) => !stage.value.startsWith('Closed'));
    opportunities = signal([], ...(ngDevMode ? [{ debugName: "opportunities" }] : []));
    total = signal(0, ...(ngDevMode ? [{ debugName: "total" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    currencyCode = signal('', ...(ngDevMode ? [{ debugName: "currencyCode" }] : []));
    currencyFallback = '';
    toastService = inject(AppToastService);
    settingsService = inject(WorkspaceSettingsService);
    referenceData = inject(ReferenceDataService);
    route = inject(ActivatedRoute);
    canManage = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesManage);
    }, ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    metrics = computed(() => {
        const rows = this.opportunities();
        const open = rows.filter((o) => o.status === 'Open').length;
        const closedWon = rows.filter((o) => o.status === 'Closed Won').length;
        const closedLost = rows.filter((o) => o.status === 'Closed Lost').length;
        const pipelineValue = rows
            .filter((o) => o.status === 'Open')
            .reduce((sum, opp) => sum + (opp.amount ?? 0), 0);
        const weightedPipeline = rows
            .filter((o) => o.status === 'Open')
            .reduce((sum, opp) => sum + (opp.amount ?? 0) * ((opp.probability ?? 0) / 100), 0);
        const stalled = rows.filter((o) => this.isStalled(o)).length;
        const avgDeal = rows.length
            ? Math.round(rows.reduce((sum, opp) => sum + (opp.amount ?? 0), 0) / rows.length)
            : 0;
        return {
            total: this.total(),
            open,
            closedWon,
            closedLost,
            pipelineValue,
            weightedPipeline,
            stalled,
            avgDeal
        };
    }, ...(ngDevMode ? [{ debugName: "metrics" }] : []));
    searchTerm = '';
    stageFilter = 'all';
    missingNextStepOnly = false;
    pageIndex = 0;
    rows = 10;
    ownerOptionsForAssign = signal([], ...(ngDevMode ? [{ debugName: "ownerOptionsForAssign" }] : []));
    constructor(opportunityData, router, userAdminData) {
        this.opportunityData = opportunityData;
        this.router = router;
        this.userAdminData = userAdminData;
        if (this.router.url.includes('/opportunities/pipeline')) {
            this.viewMode = 'kanban';
        }
        this.applyInitialQueryParams();
        this.load();
        this.loadOwners();
        this.loadCurrencyContext();
    }
    load() {
        this.loading.set(true);
        const stage = this.stageFilter === 'all' ? undefined : this.stageFilter;
        const request = {
            search: this.searchTerm || undefined,
            stage,
            missingNextStep: this.missingNextStepOnly ? true : undefined,
            page: this.pageIndex + 1,
            pageSize: this.rows
        };
        this.opportunityData.search(request).subscribe((res) => {
            this.opportunities.set(res.items);
            this.total.set(res.total);
            this.loading.set(false);
        });
    }
    onCreate() {
        this.router.navigate(['/app/deals/new']);
    }
    onEdit(row) {
        this.router.navigate(['/app/deals', row.id, 'edit']);
    }
    onRowClick(row, event) {
        if (!this.canManage() || this.isInteractiveRowTarget(event)) {
            return;
        }
        this.onEdit(row);
    }
    isInteractiveRowTarget(event) {
        const target = event.target;
        if (!target) {
            return false;
        }
        return !!target.closest('button, a, input, textarea, select, .p-button, .p-checkbox, .p-inputswitch, .p-rating, .p-dropdown, .p-select');
    }
    onDelete(row) {
        const confirmed = confirm(`Delete deal ${row.name}?`);
        if (!confirmed)
            return;
        this.opportunityData.delete(row.id).subscribe({
            next: () => {
                this.load();
                this.raiseToast('success', 'Deal deleted.');
            },
            error: () => this.raiseToast('error', 'Unable to delete deal.')
        });
    }
    clearToast() {
        this.toastService.clear();
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    onSearch(term) {
        this.searchTerm = term;
        this.pageIndex = 0;
        this.load();
    }
    onStageChange(stage) {
        this.stageFilter = stage;
        this.pageIndex = 0;
        this.load();
    }
    onMissingNextStepToggle() {
        this.missingNextStepOnly = !this.missingNextStepOnly;
        this.pageIndex = 0;
        this.load();
    }
    clearFilters() {
        this.stageFilter = 'all';
        this.missingNextStepOnly = false;
        this.pageIndex = 0;
        this.load();
    }
    onPageChange(event) {
        this.pageIndex = event.page ?? 0;
        this.rows = event.rows ?? this.rows;
        this.load();
    }
    getOpportunitiesByStage(stage) {
        return this.opportunities().filter(o => o.stage === stage);
    }
    stageColumnColor(stage) {
        switch (stage) {
            case 'Prospecting': return '#3b82f6';
            case 'Qualification': return '#8b5cf6';
            case 'Proposal': return '#06b6d4';
            case 'Negotiation': return '#f59e0b';
            case 'Closed Won': return '#22c55e';
            case 'Closed Lost': return '#ef4444';
            default: return '#6b7280';
        }
    }
    onExport() {
        const rows = this.opportunities();
        const columns = [
            { header: 'Name', value: (row) => row.name },
            { header: 'Account', value: (row) => row.account },
            { header: 'Stage', value: (row) => row.stage },
            { header: 'Amount', value: (row) => row.amount },
            { header: 'Currency', value: (row) => row.currency },
            { header: 'Probability', value: (row) => row.probability },
            { header: 'Close Date', value: (row) => row.closeDate },
            { header: 'Status', value: (row) => row.status },
            { header: 'Owner', value: (row) => row.owner }
        ];
        exportToCsv(rows, columns, 'deals.csv');
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
    resolveCurrencyCode() {
        return this.currencyCode() || this.currencyFallback || '';
    }
    onInlineStageChange(row, stage) {
        if (!stage || row.stage === stage) {
            return;
        }
        if (!stage.startsWith('Closed') && !row.nextStepDueAtUtc) {
            this.toastService.show('error', 'Next step is required before changing stage. Log an activity with a due date.', 4000);
            return;
        }
        this.opportunityData.updateStage(row.id, stage).subscribe({
            next: () => this.load(),
            error: (err) => {
                const message = err?.error ?? 'Stage update failed. Please try again.';
                this.toastService.show('error', message, 4000);
            }
        });
    }
    onInlineOwnerChange(row, ownerId) {
        if (!ownerId || row.ownerId === ownerId) {
            return;
        }
        this.opportunityData.updateOwner(row.id, ownerId).subscribe({
            next: () => this.load(),
            error: () => {
                alert('Owner update failed. Please try again.');
            }
        });
    }
    statusSeverity(status) {
        if (status === 'Closed Won')
            return 'info';
        if (status === 'Closed Lost')
            return 'warn';
        return 'info';
    }
    isStalled(row) {
        if (row.status !== 'Open')
            return false;
        if (row.isAtRisk !== undefined)
            return row.isAtRisk;
        const lastTouched = this.resolveLastTouched(row);
        const nextStepDue = this.resolveNextStepDue(row);
        if (!nextStepDue)
            return true;
        if (this.isPastDue(nextStepDue))
            return true;
        if (!lastTouched)
            return false;
        return this.daysSince(lastTouched) > 30;
    }
    stalledAge(row) {
        const date = this.resolveLastTouched(row);
        return date ? this.daysSince(date) : 0;
    }
    nextStepLabel(row) {
        const nextStepDue = this.resolveNextStepDue(row);
        if (!nextStepDue)
            return 'No next step';
        if (this.isPastDue(nextStepDue))
            return `Overdue ${this.daysSince(nextStepDue)}d`;
        return `Due in ${Math.max(0, this.daysUntil(nextStepDue))}d`;
    }
    resolveLastTouched(row) {
        const raw = row.lastActivityAtUtc || row.updatedAtUtc || row.createdAtUtc || row.closeDate;
        if (!raw)
            return null;
        const date = new Date(raw);
        return Number.isNaN(date.getTime()) ? null : date;
    }
    resolveNextStepDue(row) {
        const raw = row.nextStepDueAtUtc;
        if (!raw)
            return null;
        const date = new Date(raw);
        return Number.isNaN(date.getTime()) ? null : date;
    }
    daysSince(date) {
        const ms = Date.now() - date.getTime();
        return Math.floor(ms / (1000 * 60 * 60 * 24));
    }
    daysUntil(date) {
        const ms = date.getTime() - Date.now();
        return Math.ceil(ms / (1000 * 60 * 60 * 24));
    }
    isPastDue(date) {
        return date.getTime() < Date.now();
    }
    loadOwners() {
        this.userAdminData.search({ includeInactive: false, page: 1, pageSize: 200 }).subscribe((res) => {
            const options = res.items.map((user) => ({ label: user.fullName, value: user.id }));
            this.ownerOptionsForAssign.set(options);
        });
    }
    applyInitialQueryParams() {
        const params = this.route.snapshot.queryParamMap;
        const search = params.get('search');
        const focus = params.get('focus')?.toLowerCase() ?? '';
        if (search) {
            this.searchTerm = search;
        }
        if (focus.includes('stalled') || focus.includes('reengage') || focus.includes('follow-up')) {
            this.missingNextStepOnly = true;
        }
    }
    static ɵfac = function OpportunitiesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OpportunitiesPage)(i0.ɵɵdirectiveInject(i1.OpportunityDataService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.UserAdminDataService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OpportunitiesPage, selectors: [["app-opportunities-page"]], decls: 190, vars: 54, consts: [["closedStage", ""], [1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-stats"], [1, "hero-stat"], [1, "stat-value"], [1, "stat-label"], [1, "stat-bar"], [1, "stat-bar-fill", 2, "width", "100%"], [1, "stat-bar-fill", "stat-bar-fill--open"], [1, "stat-bar-fill", "stat-bar-fill--success"], [1, "stat-bar-fill", "stat-bar-fill--danger"], [1, "hero-actions"], [1, "view-toggle"], ["type", "button", "title", "Table View", 1, "toggle-btn", 3, "click"], [1, "pi", "pi-list"], ["type", "button", "title", "Kanban View", 1, "toggle-btn", 3, "click"], [1, "pi", "pi-objects-column"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "action-btn__icon"], [1, "pi", "pi-plus"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click"], [1, "pi", "pi-refresh"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-dollar"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend", "card-trend--up"], [1, "pi", "pi-chart-line"], [1, "card-glow"], [1, "visual-card", "visual-card--secondary"], [1, "pi", "pi-percentage"], [1, "card-trend"], [1, "pi", "pi-calculator"], [1, "metrics-section"], [1, "metric-card", "metric-card--total"], [1, "metric-icon"], [1, "pi", "pi-briefcase"], [1, "metric-content"], [1, "metric-label"], [1, "metric-value"], [1, "metric-chart"], ["viewBox", "0 0 100 40", 1, "sparkline"], ["d", "M0,35 Q25,30 50,20 T100,15", "fill", "none", "stroke", "url(#gradient-blue)", "stroke-width", "2"], ["id", "gradient-blue", "x1", "0%", "y1", "0%", "x2", "100%", "y2", "0%"], ["offset", "0%", "stop-color", "#667eea"], ["offset", "100%", "stop-color", "#764ba2"], [1, "metric-card", "metric-card--open"], [1, "pi", "pi-bolt"], [1, "metric-ring"], ["viewBox", "0 0 36 36"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-bg"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--cyan"], [1, "metric-card", "metric-card--won"], [1, "pi", "pi-check-circle"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--green"], [1, "metric-card", "metric-card--lost"], [1, "pi", "pi-times-circle"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--rose"], [1, "metric-card", "metric-card--stalled"], [1, "pi", "pi-exclamation-triangle"], ["class", "metric-badge", 4, "ngIf"], [1, "filter-section"], [1, "filter-bar"], [1, "search-wrapper"], [1, "pi", "pi-search", "search-icon"], ["pInputText", "", "type", "search", "placeholder", "Search deals, accounts...", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "search-kbd"], [1, "filter-pills"], [1, "filter-pill"], [1, "pi", "pi-filter"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "All Stages", "styleClass", "filter-select", 3, "ngModelChange", "options", "ngModel"], [1, "quick-stages"], ["pButton", "", "type", "button", 1, "stage-pill", 3, "click"], ["pButton", "", "type", "button", 1, "stage-pill", "stage-pill--warning", 3, "click"], ["pButton", "", "type", "button", 1, "stage-pill", "stage-pill--success", 3, "click"], ["pButton", "", "type", "button", 1, "stage-pill", "stage-pill--danger", 3, "click"], [1, "filter-actions"], ["type", "button", 1, "action-btn", "action-btn--settings", 3, "click"], [1, "pi", "pi-times"], ["type", "button", 1, "action-btn", "action-btn--export", 3, "click"], [1, "pi", "pi-download"], ["class", "filter-summary", 4, "ngIf"], ["class", "kanban-board", 4, "ngIf"], ["class", "data-section", 4, "ngIf"], [1, "metric-badge"], [1, "filter-summary"], [1, "summary-label"], ["class", "filter-tag", 4, "ngIf"], [1, "filter-tag"], [1, "pi", "pi-times", 3, "click"], [1, "kanban-board"], [4, "ngIf"], ["class", "kanban-column", 4, "ngFor", "ngForOf"], [1, "kanban-column"], [1, "column-header"], [1, "column-title"], [1, "column-count"], [1, "column-body"], ["class", "deal-card deal-card--skeleton", 4, "ngFor", "ngForOf"], [1, "deal-card", "deal-card--skeleton"], [1, "skeleton", "skeleton-line"], [1, "skeleton", "skeleton-line", "skeleton-short"], ["class", "deal-card", 3, "click", 4, "ngFor", "ngForOf"], ["class", "column-empty", 4, "ngIf"], [1, "deal-card", 3, "click"], [1, "deal-card-header"], [1, "deal-avatar"], [3, "src", "alt", "title"], [1, "deal-meta"], [1, "deal-name"], [1, "deal-account"], [1, "deal-probability"], [1, "deal-card-body"], [1, "deal-amount"], ["class", "deal-close-date", 4, "ngIf"], ["class", "deal-risk", 4, "ngIf"], [1, "deal-card-footer"], [1, "deal-owner"], [1, "pi", "pi-user"], [1, "deal-actions"], ["type", "button", "title", "Edit", 1, "mini-action-btn", "mini-action-btn--edit", 3, "click", "disabled"], [1, "pi", "pi-pencil"], ["type", "button", "title", "Delete", 1, "mini-action-btn", "mini-action-btn--delete", 3, "click", "disabled"], [1, "pi", "pi-trash"], [1, "deal-close-date"], [1, "pi", "pi-calendar"], [1, "deal-risk"], [1, "column-empty"], [1, "data-section"], [1, "data-card"], [1, "data-header"], [1, "header-title"], [1, "record-count"], [1, "header-actions"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "table-wrapper", 4, "ngIf"], ["styleClass", "data-paginator", 3, "rows", "totalRecords", "rowsPerPageOptions", "first", "onPageChange", 4, "ngIf"], [1, "loading-state"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton", "skeleton-avatar"], [1, "skeleton", "skeleton-text"], [1, "skeleton", "skeleton-text", "skeleton-short"], [1, "skeleton", "skeleton-badge"], [1, "skeleton", "skeleton-actions"], [1, "empty-state"], [1, "empty-icon"], ["pButton", "", "type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "table-wrapper"], ["columnResizeMode", "fit", 1, "data-table", 3, "value", "resizableColumns"], ["pTemplate", "header"], ["pTemplate", "body"], ["pSortableColumn", "name", "pResizableColumn", "", 1, "th-opportunity"], ["field", "name"], ["pSortableColumn", "account", "pResizableColumn", ""], ["field", "account"], ["pSortableColumn", "stage", "pResizableColumn", ""], ["field", "stage"], ["pSortableColumn", "amount", "pResizableColumn", ""], ["field", "amount"], ["pSortableColumn", "probability", "pResizableColumn", ""], ["field", "probability"], ["pResizableColumn", ""], ["pSortableColumn", "status", "pResizableColumn", ""], ["field", "status"], ["pSortableColumn", "ownerId", "pResizableColumn", ""], ["field", "ownerId"], ["pSortableColumn", "createdAtUtc", "pResizableColumn", ""], ["field", "createdAtUtc"], ["pResizableColumn", "", 1, "th-actions"], [1, "table-row", 3, "click"], [1, "td-opportunity"], [1, "opportunity-icon"], [1, "opportunity-info"], [1, "opportunity-name"], [1, "opportunity-stage"], [1, "account-name"], [4, "ngIf", "ngIfElse"], [1, "amount-value"], [1, "probability-cell"], [1, "probability-bar"], [1, "probability-fill"], [1, "probability-value"], ["class", "risk-badge", 4, "ngIf"], [1, "status-badge"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Owner", "styleClass", "inline-select", 3, "ngModelChange", "options", "ngModel"], [1, "td-created"], [1, "created-date"], [1, "td-actions"], [1, "row-actions"], ["type", "button", "title", "Edit", 1, "row-action-btn", "row-action-btn--edit", 3, "click", "disabled"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "styleClass", "inline-select", 3, "ngModelChange", "options", "ngModel"], [1, "risk-badge"], ["styleClass", "data-paginator", 3, "onPageChange", "rows", "totalRecords", "rowsPerPageOptions", "first"]], template: function OpportunitiesPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2);
            i0.ɵɵelement(2, "div", 3)(3, "div", 4)(4, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 6)(7, "div", 7)(8, "div", 8);
            i0.ɵɵelement(9, "span", 9);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Revenue Intelligence");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 10)(13, "span", 11);
            i0.ɵɵtext(14, "Deal");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 12);
            i0.ɵɵtext(16, "Pipeline");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 13);
            i0.ɵɵtext(18, " Track deals, forecast revenue, and close deals with AI-powered insights ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 14)(20, "div", 15)(21, "div", 16);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 17);
            i0.ɵɵtext(24, "Total Deals");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 18);
            i0.ɵɵelement(26, "div", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 15)(28, "div", 16);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 17);
            i0.ɵɵtext(31, "Open");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 18);
            i0.ɵɵelement(33, "div", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 15)(35, "div", 16);
            i0.ɵɵtext(36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div", 17);
            i0.ɵɵtext(38, "Won");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 18);
            i0.ɵɵelement(40, "div", 21);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "div", 15)(42, "div", 16);
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 17);
            i0.ɵɵtext(45, "Lost");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 18);
            i0.ɵɵelement(47, "div", 22);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(48, "div", 23)(49, "div", 24)(50, "button", 25);
            i0.ɵɵlistener("click", function OpportunitiesPage_Template_button_click_50_listener() { return ctx.viewMode = "table"; });
            i0.ɵɵelement(51, "i", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "button", 27);
            i0.ɵɵlistener("click", function OpportunitiesPage_Template_button_click_52_listener() { return ctx.viewMode = "kanban"; });
            i0.ɵɵelement(53, "i", 28);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(54, "button", 29);
            i0.ɵɵlistener("click", function OpportunitiesPage_Template_button_click_54_listener() { return ctx.onCreate(); });
            i0.ɵɵelementStart(55, "span", 30);
            i0.ɵɵelement(56, "i", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "span");
            i0.ɵɵtext(58, "New Deal");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(59, "button", 32);
            i0.ɵɵlistener("click", function OpportunitiesPage_Template_button_click_59_listener() { return ctx.load(); });
            i0.ɵɵelementStart(60, "span", 30);
            i0.ɵɵelement(61, "i", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "span");
            i0.ɵɵtext(63, "Refresh");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(64, "div", 34)(65, "div", 35)(66, "div", 36);
            i0.ɵɵelement(67, "i", 37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "div", 38)(69, "span", 39);
            i0.ɵɵtext(70, "Pipeline Value");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "strong", 40);
            i0.ɵɵtext(72);
            i0.ɵɵpipe(73, "currency");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "span", 41);
            i0.ɵɵelement(75, "i", 42);
            i0.ɵɵtext(76, " Open forecast ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(77, "div", 43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "div", 44)(79, "div", 36);
            i0.ɵɵelement(80, "i", 45);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(81, "div", 38)(82, "span", 39);
            i0.ɵɵtext(83, "Weighted Forecast");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "strong", 40);
            i0.ɵɵtext(85);
            i0.ɵɵpipe(86, "currency");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(87, "span", 46);
            i0.ɵɵelement(88, "i", 47);
            i0.ɵɵtext(89, " Probability adjusted ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(90, "div", 43);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(91, "section", 48)(92, "div", 49)(93, "div", 50);
            i0.ɵɵelement(94, "i", 51);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(95, "div", 52)(96, "span", 53);
            i0.ɵɵtext(97, "Total Deals");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(98, "strong", 54);
            i0.ɵɵtext(99);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(100, "div", 55);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(101, "svg", 56);
            i0.ɵɵelement(102, "path", 57);
            i0.ɵɵelementStart(103, "defs")(104, "linearGradient", 58);
            i0.ɵɵelement(105, "stop", 59)(106, "stop", 60);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(107, "div", 61)(108, "div", 50);
            i0.ɵɵelement(109, "i", 62);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(110, "div", 52)(111, "span", 53);
            i0.ɵɵtext(112, "Open");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(113, "strong", 54);
            i0.ɵɵtext(114);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(115, "div", 63);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(116, "svg", 64);
            i0.ɵɵelement(117, "path", 65)(118, "path", 66);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(119, "div", 67)(120, "div", 50);
            i0.ɵɵelement(121, "i", 68);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(122, "div", 52)(123, "span", 53);
            i0.ɵɵtext(124, "Closed Won");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "strong", 54);
            i0.ɵɵtext(126);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(127, "div", 63);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(128, "svg", 64);
            i0.ɵɵelement(129, "path", 65)(130, "path", 69);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(131, "div", 70)(132, "div", 50);
            i0.ɵɵelement(133, "i", 71);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(134, "div", 52)(135, "span", 53);
            i0.ɵɵtext(136, "Closed Lost");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(137, "strong", 54);
            i0.ɵɵtext(138);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(139, "div", 63);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(140, "svg", 64);
            i0.ɵɵelement(141, "path", 65)(142, "path", 72);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(143, "div", 73)(144, "div", 50);
            i0.ɵɵelement(145, "i", 74);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(146, "div", 52)(147, "span", 53);
            i0.ɵɵtext(148, "Stalled 30+ days");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(149, "strong", 54);
            i0.ɵɵtext(150);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(151, OpportunitiesPage_div_151_Template, 3, 0, "div", 75);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(152, "section", 76)(153, "div", 77)(154, "div", 78);
            i0.ɵɵelement(155, "i", 79);
            i0.ɵɵelementStart(156, "input", 80);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunitiesPage_Template_input_ngModelChange_156_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function OpportunitiesPage_Template_input_ngModelChange_156_listener($event) { return ctx.onSearch($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(157, "kbd", 81);
            i0.ɵɵtext(158, "\u2318K");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(159, "div", 82)(160, "div", 83);
            i0.ɵɵelement(161, "i", 84);
            i0.ɵɵelementStart(162, "p-select", 85);
            i0.ɵɵlistener("ngModelChange", function OpportunitiesPage_Template_p_select_ngModelChange_162_listener($event) { return ctx.onStageChange($event || "all"); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(163, "div", 86)(164, "button", 87);
            i0.ɵɵlistener("click", function OpportunitiesPage_Template_button_click_164_listener() { return ctx.onStageChange("all"); });
            i0.ɵɵtext(165, "All");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(166, "button", 87);
            i0.ɵɵlistener("click", function OpportunitiesPage_Template_button_click_166_listener() { return ctx.onStageChange("Prospecting"); });
            i0.ɵɵtext(167, "Prospecting");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(168, "button", 87);
            i0.ɵɵlistener("click", function OpportunitiesPage_Template_button_click_168_listener() { return ctx.onStageChange("Proposal"); });
            i0.ɵɵtext(169, "Proposal");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(170, "button", 88);
            i0.ɵɵlistener("click", function OpportunitiesPage_Template_button_click_170_listener() { return ctx.onMissingNextStepToggle(); });
            i0.ɵɵtext(171, "No next step");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(172, "button", 89);
            i0.ɵɵlistener("click", function OpportunitiesPage_Template_button_click_172_listener() { return ctx.onStageChange("Closed Won"); });
            i0.ɵɵtext(173, "Won");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(174, "button", 90);
            i0.ɵɵlistener("click", function OpportunitiesPage_Template_button_click_174_listener() { return ctx.onStageChange("Closed Lost"); });
            i0.ɵɵtext(175, "Lost");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(176, "div", 91)(177, "button", 92);
            i0.ɵɵlistener("click", function OpportunitiesPage_Template_button_click_177_listener() { return ctx.clearFilters(); });
            i0.ɵɵelementStart(178, "span", 30);
            i0.ɵɵelement(179, "i", 93);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(180, "span");
            i0.ɵɵtext(181, "Clear");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(182, "button", 94);
            i0.ɵɵlistener("click", function OpportunitiesPage_Template_button_click_182_listener() { return ctx.onExport(); });
            i0.ɵɵelementStart(183, "span", 30);
            i0.ɵɵelement(184, "i", 95);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(185, "span");
            i0.ɵɵtext(186, "Export");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(187, OpportunitiesPage_div_187_Template, 6, 3, "div", 96);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(188, OpportunitiesPage_section_188_Template, 3, 2, "section", 97)(189, OpportunitiesPage_section_189_Template, 23, 7, "section", 98);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(22);
            i0.ɵɵtextInterpolate(ctx.metrics().total || 0);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.metrics().open);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.metrics().total ? ctx.metrics().open / ctx.metrics().total * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.metrics().closedWon);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.metrics().total ? ctx.metrics().closedWon / ctx.metrics().total * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.metrics().closedLost);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.metrics().total ? ctx.metrics().closedLost / ctx.metrics().total * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.viewMode === "table");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.viewMode === "kanban");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(18);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(73, 44, ctx.metrics().pipelineValue, ctx.resolveCurrencyCode(), "symbol", "1.0-0"));
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(86, 49, ctx.metrics().weightedPipeline, ctx.resolveCurrencyCode(), "symbol", "1.0-0"));
            i0.ɵɵadvance(14);
            i0.ɵɵtextInterpolate(ctx.metrics().total || "\u2014");
            i0.ɵɵadvance(15);
            i0.ɵɵtextInterpolate(ctx.metrics().open);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.metrics().total ? ctx.metrics().open / ctx.metrics().total * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.metrics().closedWon);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.metrics().total ? ctx.metrics().closedWon / ctx.metrics().total * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.metrics().closedLost);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.metrics().total ? ctx.metrics().closedLost / ctx.metrics().total * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.metrics().stalled);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.metrics().stalled > 0);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchTerm);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.stageOptions)("ngModel", ctx.stageFilter === "all" ? null : ctx.stageFilter);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.stageFilter === "all");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.stageFilter === "Prospecting");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.stageFilter === "Proposal");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.missingNextStepOnly);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.stageFilter === "Closed Won");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.stageFilter === "Closed Lost");
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("ngIf", ctx.searchTerm || ctx.stageFilter !== "all" || ctx.missingNextStepOnly);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.viewMode === "kanban");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.viewMode === "table");
        } }, dependencies: [CommonModule, i4.NgForOf, i4.NgIf, FormsModule, i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgModel, CardModule, i6.PrimeTemplate, TableModule, i7.Table, i7.SortableColumn, i7.ResizableColumn, i7.SortIcon, TagModule,
            InputTextModule, i8.InputText, SelectModule, i9.Select, ButtonModule, i10.ButtonDirective, PaginatorModule, i11.Paginator, SkeletonModule,
            TooltipModule,
            BreadcrumbsComponent, i4.CurrencyPipe, i4.DatePipe], styles: ["\n\n\n\n\n\n\n\n\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}\n\n\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n}\n\n*[_ngcontent-%COMP%], \n*[_ngcontent-%COMP%]::before, \n*[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n\n.page-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding: 1.5rem 2rem;\n  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n  overflow-x: hidden;\n  max-width: 100%;\n}\n\n\n\n\n\n.bg-orbs[_ngcontent-%COMP%] {\n  display: none; \n\n}\n\n\n\n\n\n.hero-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 2rem;\n  padding: 2rem;\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 20px;\n  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);\n  margin-bottom: 1.5rem;\n  animation: _ngcontent-%COMP%_fade-in-up 0.4s ease-out;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.4rem 0.85rem;\n  background: rgba(14, 165, 233, 0.1);\n  border: 1px solid rgba(14, 165, 233, 0.2);\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #0369a1;\n  width: fit-content;\n}\n\n.badge-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  background: #0ea5e9;\n  border-radius: 50%;\n}\n\n\n.hero-description[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: rgba(60, 60, 67, 0.7);\n  max-width: 480px;\n  margin: 0;\n}\n\n.hero-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 1.25rem;\n  padding: 1.25rem 0;\n  border-top: 1px solid rgba(148, 163, 184, 0.15);\n  border-bottom: 1px solid rgba(148, 163, 184, 0.15);\n\n  @media (max-width: 768px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n.hero-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.stat-bar[_ngcontent-%COMP%] {\n  height: 4px;\n  background: rgba(148, 163, 184, 0.2);\n  border-radius: 2px;\n  overflow: hidden;\n  margin-top: 0.4rem;\n}\n\n.stat-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: linear-gradient(90deg, #0ea5e9, #8b5cf6);\n  border-radius: 2px;\n  transition: width 0.4s ease;\n\n  &--open { background: linear-gradient(90deg, #0ea5e9, #06b6d4); }\n  &--success { background: linear-gradient(90deg, #10b981, #34d399); }\n  &--danger { background: linear-gradient(90deg, #ef4444, #f87171); }\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n}\n\n\n\n\n\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n\n  @media (max-width: 1100px) {\n    flex-direction: row;\n  }\n\n  @media (max-width: 600px) {\n    flex-direction: column;\n  }\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  padding: 1.25rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  transition: all 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(139, 92, 246, 0.06) 100%);\n    border-color: rgba(14, 165, 233, 0.15);\n  }\n\n  &--secondary {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);\n    border-color: rgba(16, 185, 129, 0.15);\n  }\n}\n\n.card-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(14, 165, 233, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n\n  i {\n    font-size: 1.1rem;\n    color: #0284c7;\n  }\n\n  .visual-card--secondary & {\n    background: rgba(16, 185, 129, 0.12);\n    i { color: #059669; }\n  }\n}\n\n.card-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n\n.card-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.card-value[_ngcontent-%COMP%] {\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.card-trend[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.6);\n\n  i { font-size: 0.625rem; }\n\n  &--up { color: #059669; }\n  &--down { color: #dc2626; }\n}\n\n.card-glow[_ngcontent-%COMP%] {\n  display: none;\n}\n\n\n\n\n\n.metrics-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n  animation: _ngcontent-%COMP%_fade-in-up 0.4s ease-out 0.1s both;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  @media (max-width: 768px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 500px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  padding: 1rem 1.15rem;\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  transition: all 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);\n  }\n}\n\n.metric-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n\n  i {\n    font-size: 1rem;\n    color: rgba(60, 60, 67, 0.7);\n  }\n\n  .metric-card--total & { background: rgba(14, 165, 233, 0.12); i { color: #0284c7; } }\n  .metric-card--open & { background: rgba(6, 182, 212, 0.12); i { color: #0891b2; } }\n  .metric-card--won & { background: rgba(16, 185, 129, 0.12); i { color: #059669; } }\n  .metric-card--lost & { background: rgba(239, 68, 68, 0.12); i { color: #dc2626; } }\n  .metric-card--stalled & { background: rgba(245, 158, 11, 0.12); i { color: #d97706; } }\n}\n\n.metric-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  flex: 1;\n  min-width: 0;\n}\n\n.metric-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.metric-value[_ngcontent-%COMP%] {\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.metric-chart[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 28px;\n  flex-shrink: 0;\n}\n\n.sparkline[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n\n.metric-ring[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  flex-shrink: 0;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n}\n\n.ring-bg[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: rgba(148, 163, 184, 0.2);\n  stroke-width: 3;\n}\n\n.ring-fill[_ngcontent-%COMP%] {\n  fill: none;\n  stroke-width: 3;\n  stroke-linecap: round;\n\n  &--cyan { stroke: #0891b2; }\n  &--green { stroke: #059669; }\n  &--rose { stroke: #dc2626; }\n  &--amber { stroke: #d97706; }\n}\n\n.metric-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0.6rem;\n  right: 0.6rem;\n  padding: 0.2rem 0.5rem;\n  background: rgba(239, 68, 68, 0.12);\n  border: 1px solid rgba(239, 68, 68, 0.2);\n  border-radius: 6px;\n  font-size: 0.6rem;\n  font-weight: 700;\n  color: #dc2626;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n\n\n\n\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-decoration: none;\n  white-space: nowrap;\n\n  i {\n    font-size: 0.85rem;\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);\n  color: #fff;\n\n  &:hover:not(:disabled) {\n    transform: translateY(-1px);\n    box-shadow: 0 6px 20px rgba(14, 165, 233, 0.35);\n  }\n}\n\n.btn-glow[_ngcontent-%COMP%] {\n  box-shadow: 0 4px 14px rgba(14, 165, 233, 0.25);\n}\n\n.btn-shine[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: rgba(15, 23, 42, 0.8);\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.5);\n  }\n}\n\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  color: rgba(60, 60, 67, 0.8);\n\n  &:hover:not(:disabled) {\n    background: rgba(255, 255, 255, 0.8);\n    border-color: rgba(148, 163, 184, 0.4);\n  }\n}\n\n\n\n\n\n.filter-section[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n  animation: _ngcontent-%COMP%_fade-in-up 0.4s ease-out 0.15s both;\n}\n\n.filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  margin-bottom: 0.75rem;\n}\n\n.search-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  min-width: 0;\n  max-width: 380px;\n}\n\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 1rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: rgba(60, 60, 67, 0.4);\n  font-size: 0.875rem;\n  pointer-events: none;\n}\n\n.search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.65rem 1rem 0.65rem 2.5rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  border-radius: 10px;\n  color: rgba(15, 23, 42, 0.9);\n  font-size: 0.875rem;\n  transition: all 0.2s ease;\n\n  &::placeholder {\n    color: rgba(60, 60, 67, 0.45);\n  }\n\n  &:focus {\n    outline: none;\n    border-color: rgba(14, 165, 233, 0.5);\n    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);\n  }\n}\n\n.search-kbd[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  padding: 0.2rem 0.45rem;\n  background: rgba(248, 250, 252, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  border-radius: 5px;\n  font-size: 0.65rem;\n  color: rgba(60, 60, 67, 0.5);\n  font-family: inherit;\n}\n\n.filter-pills[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n\n.filter-pill[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.45rem 0.75rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 8px;\n\n  i {\n    font-size: 0.75rem;\n    color: rgba(60, 60, 67, 0.5);\n  }\n}\n\n.filter-select[_ngcontent-%COMP%] {\n  background: transparent !important;\n  border: none !important;\n  min-width: 0;\n\n  .p-select-label {\n    padding: 0 !important;\n    color: rgba(15, 23, 42, 0.8) !important;\n    font-size: 0.85rem !important;\n  }\n}\n\n.quick-stages[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n\n.stage-pill[_ngcontent-%COMP%] {\n  padding: 0.45rem 0.85rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: rgba(60, 60, 67, 0.8);\n  transition: all 0.2s ease;\n  cursor: pointer;\n\n  &:hover {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.4);\n  }\n\n  &.active {\n    background: rgba(14, 165, 233, 0.12);\n    border-color: rgba(14, 165, 233, 0.3);\n    color: #0369a1;\n  }\n\n  &--success.active {\n    background: rgba(16, 185, 129, 0.12);\n    border-color: rgba(16, 185, 129, 0.3);\n    color: #047857;\n  }\n\n  &--danger.active {\n    background: rgba(239, 68, 68, 0.12);\n    border-color: rgba(239, 68, 68, 0.3);\n    color: #b91c1c;\n  }\n\n  &--warning.active {\n    background: rgba(245, 158, 11, 0.12);\n    border-color: rgba(245, 158, 11, 0.3);\n    color: #b45309;\n  }\n}\n\n.filter-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin-left: auto;\n}\n\n.filter-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.65rem 0.9rem;\n  background: rgba(14, 165, 233, 0.08);\n  border: 1px solid rgba(14, 165, 233, 0.15);\n  border-radius: 10px;\n}\n\n.summary-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.7);\n}\n\n.filter-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(255, 255, 255, 0.9);\n  border-radius: 6px;\n  font-size: 0.75rem;\n  color: rgba(15, 23, 42, 0.9);\n\n  i {\n    font-size: 0.6rem;\n    cursor: pointer;\n    opacity: 0.5;\n    transition: opacity 0.2s ease;\n\n    &:hover {\n      opacity: 1;\n    }\n  }\n}\n\n\n\n\n\n.data-section[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fade-in-up 0.4s ease-out 0.2s both;\n}\n\n.data-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 20px;\n  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);\n  overflow: hidden;\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.15rem 1.35rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n.header-title[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n\n  h2 {\n    font-size: 1.05rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.record-count[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.65rem;\n}\n\n.action-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.55rem 0.9rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 8px;\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: rgba(60, 60, 67, 0.8);\n  cursor: pointer;\n  transition: all 0.2s ease;\n\n  i {\n    font-size: 0.75rem;\n  }\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.35);\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);\n    border-color: transparent;\n    color: #fff;\n\n    &:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 4px 14px rgba(14, 165, 233, 0.3);\n    }\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n\n\n\n\n.loading-state[_ngcontent-%COMP%] {\n  padding: 1.35rem;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.9rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n}\n\n.skeleton[_ngcontent-%COMP%] {\n  background: linear-gradient(\n    90deg,\n    rgba(148, 163, 184, 0.1) 25%,\n    rgba(148, 163, 184, 0.2) 50%,\n    rgba(148, 163, 184, 0.1) 75%\n  );\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n.skeleton-avatar[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n}\n\n.skeleton-text[_ngcontent-%COMP%] {\n  height: 14px;\n  flex: 1;\n}\n\n.skeleton-short[_ngcontent-%COMP%] {\n  flex: 0.5;\n}\n\n.skeleton-badge[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 22px;\n}\n\n.skeleton-actions[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 30px;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3.5rem 2rem;\n  text-align: center;\n}\n\n.empty-icon[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(148, 163, 184, 0.1);\n  border: 1px solid rgba(148, 163, 184, 0.15);\n  border-radius: 18px;\n  margin-bottom: 1.25rem;\n\n  i {\n    font-size: 1.75rem;\n    color: rgba(60, 60, 67, 0.35);\n  }\n}\n\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  margin: 0 0 0.4rem;\n}\n\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: rgba(60, 60, 67, 0.6);\n  margin: 0 0 1.25rem;\n  max-width: 280px;\n}\n\n\n\n\n\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: hidden;\n}\n\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n\n  .p-datatable-table {\n    border-collapse: collapse;\n    table-layout: fixed;\n    width: 100%;\n  }\n\n  .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: 0.75rem 0.85rem;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n    text-align: left;\n    white-space: nowrap;\n  }\n\n  .p-datatable-tbody > tr {\n    transition: all 0.15s ease;\n\n    &:hover {\n      background: rgba(248, 250, 252, 0.6);\n    }\n\n    > td {\n      border: none;\n      border-bottom: 1px solid rgba(148, 163, 184, 0.08);\n      padding: 0.75rem 0.85rem;\n      font-size: 0.875rem;\n      color: rgba(15, 23, 42, 0.9);\n      vertical-align: middle;\n      white-space: normal;\n      word-break: break-word;\n    }\n  }\n\n  .p-sortable-column {\n    cursor: pointer;\n\n    &:hover {\n      background: rgba(248, 250, 252, 0.9);\n    }\n\n    .p-sortable-column-icon {\n      margin-left: 0.4rem;\n      color: rgba(60, 60, 67, 0.35);\n      font-size: 0.6rem;\n    }\n  }\n}\n\n[_nghost-%COMP%]     .data-table .p-datatable-thead > tr > th:nth-child(1), \n[_nghost-%COMP%]     .data-table .p-datatable-tbody > tr > td:nth-child(1) {\n  width: 240px;\n}\n\n[_nghost-%COMP%]     .data-table .p-datatable-thead > tr > th:nth-child(2), \n[_nghost-%COMP%]     .data-table .p-datatable-tbody > tr > td:nth-child(2) {\n  width: 160px;\n}\n\n[_nghost-%COMP%]     .data-table .p-datatable-thead > tr > th:nth-child(3), \n[_nghost-%COMP%]     .data-table .p-datatable-tbody > tr > td:nth-child(3) {\n  width: 140px;\n}\n\n[_nghost-%COMP%]     .data-table .p-datatable-thead > tr > th:nth-child(4), \n[_nghost-%COMP%]     .data-table .p-datatable-tbody > tr > td:nth-child(4) {\n  width: 130px;\n}\n\n[_nghost-%COMP%]     .data-table .p-datatable-thead > tr > th:nth-child(5), \n[_nghost-%COMP%]     .data-table .p-datatable-tbody > tr > td:nth-child(5) {\n  width: 140px;\n}\n\n[_nghost-%COMP%]     .data-table .p-datatable-thead > tr > th:nth-child(6), \n[_nghost-%COMP%]     .data-table .p-datatable-tbody > tr > td:nth-child(6) {\n  width: 120px;\n}\n\n[_nghost-%COMP%]     .data-table .p-datatable-thead > tr > th:nth-child(7), \n[_nghost-%COMP%]     .data-table .p-datatable-tbody > tr > td:nth-child(7) {\n  width: 120px;\n}\n\n[_nghost-%COMP%]     .data-table .p-datatable-thead > tr > th:nth-child(8), \n[_nghost-%COMP%]     .data-table .p-datatable-tbody > tr > td:nth-child(8) {\n  width: 160px;\n}\n\n[_nghost-%COMP%]     .data-table .p-datatable-thead > tr > th:nth-child(9), \n[_nghost-%COMP%]     .data-table .p-datatable-tbody > tr > td:nth-child(9) {\n  width: 90px;\n}\n\n[_nghost-%COMP%]     .data-table .p-datatable-wrapper {\n  overflow-x: hidden;\n}\n\n@media (max-width: 768px) {\n  //[_ngcontent-%COMP%]   Allow[_ngcontent-%COMP%]   horizontal[_ngcontent-%COMP%]   scrolling[_ngcontent-%COMP%]   on[_ngcontent-%COMP%]   dense[_ngcontent-%COMP%]   tables[_ngcontent-%COMP%]   without[_ngcontent-%COMP%]   clipping.\n[_ngcontent-%COMP%]   .table-wrapper[_ngcontent-%COMP%] {\n    overflow-x: auto;\n  }\n\n  .data-table[_ngcontent-%COMP%]   .p-datatable-table[_ngcontent-%COMP%] {\n    min-width: 860px;\n  }\n\n  [_nghost-%COMP%]     .data-table .p-datatable-wrapper {\n    overflow-x: auto;\n  }\n}\n\n.table-row[_ngcontent-%COMP%] {\n  &.row-stalled {\n    background: rgba(245, 158, 11, 0.06);\n\n    &:hover {\n      background: rgba(245, 158, 11, 0.1);\n    }\n  }\n}\n\n.td-opportunity[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n}\n\n.opportunity-icon[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(139, 92, 246, 0.1) 100%);\n  border-radius: 10px;\n  flex-shrink: 0;\n\n  i {\n    font-size: 0.95rem;\n    color: #0284c7;\n  }\n}\n\n.opportunity-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n\n.opportunity-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.opportunity-stage[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.account-name[_ngcontent-%COMP%] {\n  color: rgba(15, 23, 42, 0.8);\n}\n\n.amount-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.probability-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n\n.probability-bar[_ngcontent-%COMP%] {\n  width: 55px;\n  height: 5px;\n  background: rgba(148, 163, 184, 0.2);\n  border-radius: 3px;\n  overflow: hidden;\n}\n\n.probability-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: linear-gradient(90deg, #0ea5e9, #8b5cf6);\n  border-radius: 3px;\n  transition: width 0.3s ease;\n}\n\n.probability-value[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: rgba(60, 60, 67, 0.75);\n  min-width: 32px;\n}\n\n.date-value[_ngcontent-%COMP%] {\n  color: rgba(60, 60, 67, 0.75);\n  white-space: nowrap;\n}\n\n.th-opportunity[_ngcontent-%COMP%] {\n  // min-width removed to prevent overflow\n}\n\n.th-actions[_ngcontent-%COMP%] {\n  width: 90px;\n  text-align: right;\n}\n\n.td-actions[_ngcontent-%COMP%] {\n  text-align: right;\n}\n\n\n\n\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  white-space: nowrap;\n\n  &--success {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n\n  &--danger {\n    background: rgba(239, 68, 68, 0.12);\n    color: #b91c1c;\n  }\n\n  &--info {\n    background: rgba(14, 165, 233, 0.12);\n    color: #0369a1;\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #b45309;\n  }\n}\n\n.risk-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(245, 158, 11, 0.12);\n  border: 1px solid rgba(245, 158, 11, 0.2);\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #b45309;\n  white-space: nowrap;\n\n  i {\n    font-size: 0.6rem;\n  }\n}\n\n.inline-select[_ngcontent-%COMP%] {\n  min-width: 0;\n  background: rgba(255, 255, 255, 0.9) !important;\n  border: 1px solid rgba(148, 163, 184, 0.2) !important;\n  border-radius: 6px !important;\n\n  .p-select-label {\n    padding: 0.3rem 0.65rem !important;\n    font-size: 0.8rem !important;\n    color: rgba(15, 23, 42, 0.8) !important;\n  }\n\n  &:hover {\n    border-color: rgba(148, 163, 184, 0.35) !important;\n  }\n}\n\n\n\n\n\n.data-paginator[_ngcontent-%COMP%] {\n  padding: 0.9rem 1.35rem;\n  background: rgba(248, 250, 252, 0.6);\n  border-top: 1px solid rgba(148, 163, 184, 0.1);\n\n  .p-paginator {\n    background: transparent;\n    padding: 0;\n    gap: 0.4rem;\n  }\n\n  .p-paginator-element {\n    min-width: 34px;\n    height: 34px;\n    background: rgba(255, 255, 255, 0.9);\n    border: 1px solid rgba(148, 163, 184, 0.2);\n    border-radius: 8px;\n    color: rgba(60, 60, 67, 0.8);\n    transition: all 0.2s ease;\n\n    &:hover:not(:disabled) {\n      background: #fff;\n      border-color: rgba(148, 163, 184, 0.35);\n    }\n\n    &.p-paginator-element-active {\n      background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);\n      border-color: transparent;\n      color: #fff;\n    }\n\n    &:disabled {\n      opacity: 0.4;\n    }\n  }\n\n  .p-select {\n    background: rgba(255, 255, 255, 0.9);\n    border: 1px solid rgba(148, 163, 184, 0.2);\n    border-radius: 8px;\n\n    .p-select-label {\n      color: rgba(15, 23, 42, 0.8);\n    }\n  }\n}\n\n\n\n\n\n[_nghost-%COMP%]     .opportunity-dialog {\n  .p-dialog {\n    background: #fff;\n    border: 1px solid rgba(148, 163, 184, 0.2);\n    border-radius: 20px;\n    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.15);\n  }\n\n  .p-dialog-header {\n    background: transparent;\n    border-bottom: 1px solid rgba(148, 163, 184, 0.15);\n    padding: 1.35rem;\n\n    .p-dialog-title {\n      font-size: 1.15rem;\n      font-weight: 600;\n      color: rgba(15, 23, 42, 0.9);\n    }\n\n    .p-dialog-header-close {\n      color: rgba(60, 60, 67, 0.5);\n\n      &:hover {\n        color: rgba(15, 23, 42, 0.8);\n        background: rgba(148, 163, 184, 0.12);\n      }\n    }\n  }\n\n  .p-dialog-content {\n    background: transparent;\n    padding: 1.35rem;\n    color: rgba(15, 23, 42, 0.9);\n  }\n\n  .p-dialog-footer {\n    background: transparent;\n    border-top: 1px solid rgba(148, 163, 184, 0.15);\n    padding: 0.9rem 1.35rem;\n    gap: 0.65rem;\n  }\n}\n\n.dialog-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.15rem;\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n\n  label {\n    font-size: 0.8rem;\n    font-weight: 500;\n    color: rgba(60, 60, 67, 0.75);\n  }\n\n  input[type=\"text\"],\n  input[type=\"search\"],\n  textarea {\n    padding: 0.65rem 0.9rem;\n    background: rgba(255, 255, 255, 0.9);\n    border: 1px solid rgba(148, 163, 184, 0.25);\n    border-radius: 10px;\n    color: rgba(15, 23, 42, 0.9);\n    font-size: 0.875rem;\n    transition: all 0.2s ease;\n\n    &::placeholder {\n      color: rgba(60, 60, 67, 0.45);\n    }\n\n    &:focus {\n      outline: none;\n      border-color: rgba(14, 165, 233, 0.5);\n      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);\n    }\n  }\n\n  textarea {\n    resize: vertical;\n    min-height: 72px;\n  }\n}\n\n.form-grid-2[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.9rem;\n\n  @media (max-width: 500px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.checkbox-row[_ngcontent-%COMP%] {\n  flex-direction: row;\n  gap: 1.35rem;\n\n  .p-checkbox-label {\n    color: rgba(15, 23, 42, 0.8);\n    font-size: 0.875rem;\n  }\n}\n\n.error-text[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n\n.history-section[_ngcontent-%COMP%] {\n  padding-top: 0.9rem;\n  border-top: 1px solid rgba(148, 163, 184, 0.15);\n\n  h4 {\n    font-size: 0.9rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0 0 0.9rem;\n  }\n}\n\n.history-loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n\n.history-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n\n.history-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.65rem;\n  background: rgba(248, 250, 252, 0.8);\n  border-radius: 8px;\n}\n\n.history-stage[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 500;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.history-date[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.history-empty[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: rgba(60, 60, 67, 0.5);\n  margin: 0;\n}\n\n\n\n\n\n@media (max-width: 768px) {\n  .page-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .hero-section[_ngcontent-%COMP%] {\n    padding: 1.35rem;\n    gap: 1.25rem;\n  }\n\n  .hero-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .hero-actions[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n\n  .filter-bar[_ngcontent-%COMP%] {\n    padding: 0.9rem;\n  }\n\n  .search-wrapper[_ngcontent-%COMP%] {\n    min-width: 100%;\n    max-width: 100%;\n  }\n\n  .quick-stages[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .data-table[_ngcontent-%COMP%]   .p-datatable-thead[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > th[_ngcontent-%COMP%], \n   .data-table[_ngcontent-%COMP%]   .p-datatable-tbody[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > td[_ngcontent-%COMP%] {\n    padding: 0.7rem 0.9rem;\n  }\n}\n\n\n\n\n\n.view-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: 8px;\n  padding: 2px;\n\n  .toggle-btn {\n    padding: 8px 12px;\n    border: none;\n    background: transparent;\n    color: #6b7280;\n    border-radius: 6px;\n    cursor: pointer;\n    transition: all 0.15s ease;\n    font-size: 14px;\n\n    &:hover {\n      color: #374151;\n    }\n\n    &.active {\n      background: white;\n      color: #1f2937;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    }\n  }\n}\n\n\n\n\n\n.kanban-board[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  gap: 14px;\n  min-height: 500px;\n  position: relative;\n  z-index: 1;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out;\n\n  @media (max-width: 1400px) {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.kanban-column[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.5);\n  backdrop-filter: blur(12px);\n  border-radius: 16px;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  display: flex;\n  flex-direction: column;\n  max-height: 75vh;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n}\n\n.column-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-bottom: 3px solid;\n  border-radius: 16px 16px 0 0;\n\n  .column-title {\n    font-size: 13px;\n    font-weight: 700;\n    color: #374151;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .column-count {\n    font-size: 12px;\n    font-weight: 600;\n    padding: 3px 10px;\n    background: white;\n    border-radius: 12px;\n    color: #6b7280;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);\n  }\n}\n\n.column-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.deal-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 14px;\n  cursor: pointer;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  transition: all 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);\n    border-color: rgba(102, 126, 234, 0.2);\n  }\n\n  &--skeleton {\n    cursor: default;\n    &:hover {\n      transform: none;\n      box-shadow: none;\n    }\n  }\n}\n\n.deal-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n\n.deal-avatar[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 9px;\n  font-size: 13px;\n  font-weight: 700;\n  color: white;\n  flex-shrink: 0;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.deal-meta[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n\n  .deal-name {\n    display: block;\n    font-size: 13px;\n    font-weight: 600;\n    color: #1f2937;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    line-height: 1.3;\n  }\n\n  .deal-account {\n    display: block;\n    font-size: 11px;\n    color: #9ca3af;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n}\n\n.deal-probability[_ngcontent-%COMP%] {\n  min-width: 36px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 700;\n  flex-shrink: 0;\n\n  &.high {\n    background: rgba(34, 197, 94, 0.12);\n    color: #16a34a;\n  }\n\n  &.medium {\n    background: rgba(245, 158, 11, 0.12);\n    color: #d97706;\n  }\n\n  &.low {\n    background: rgba(239, 68, 68, 0.12);\n    color: #dc2626;\n  }\n}\n\n.deal-card-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  margin-bottom: 10px;\n\n  .deal-amount,\n  .deal-close-date,\n  .deal-risk {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    font-size: 12px;\n    color: #6b7280;\n\n    i {\n      font-size: 11px;\n      color: #9ca3af;\n      width: 14px;\n      text-align: center;\n    }\n  }\n\n  .deal-amount {\n    font-weight: 600;\n    color: #374151;\n  }\n\n  .deal-risk {\n    color: #f59e0b;\n\n    i {\n      color: #f59e0b;\n    }\n  }\n}\n\n.deal-card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: 10px;\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.deal-owner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11px;\n  color: #9ca3af;\n  max-width: 60%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n\n  i {\n    font-size: 10px;\n    flex-shrink: 0;\n  }\n}\n\n.deal-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n\n.column-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 16px;\n  color: #d1d5db;\n\n  i {\n    font-size: 24px;\n    margin-bottom: 8px;\n  }\n\n  span {\n    font-size: 12px;\n  }\n}\n\n.skeleton[_ngcontent-%COMP%] {\n  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n.skeleton-line[_ngcontent-%COMP%] {\n  height: 14px;\n  margin-bottom: 8px;\n  width: 100%;\n\n  &.skeleton-short {\n    width: 60%;\n  }\n}\n\n\n\n@media (max-width: 600px) {\n  .kanban-column[_ngcontent-%COMP%] {\n    max-height: none;\n  }\n\n  .view-toggle[_ngcontent-%COMP%] {\n    .toggle-btn {\n      padding: 6px 10px;\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OpportunitiesPage, [{
        type: Component,
        args: [{ selector: 'app-opportunities-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    CardModule,
                    TableModule,
                    TagModule,
                    InputTextModule,
                    SelectModule,
                    ButtonModule,
                    PaginatorModule,
                    SkeletonModule,
                    TooltipModule,
                    BreadcrumbsComponent
                ], template: "<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     OPPORTUNITIES PAGE - FUTURISTIC ENTERPRISE UI\n     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n<div class=\"page-container\">\n  <!-- Animated Background Orbs -->\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <!-- PrimeNG Breadcrumb -->\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       HERO SECTION - Revenue Intelligence Command Center\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Revenue Intelligence</span>\n      </div>\n      \n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Deal</span>\n        <span class=\"title-light\">Pipeline</span>\n      </h1>\n      \n      <p class=\"hero-description\">\n        Track deals, forecast revenue, and close deals with AI-powered insights\n      </p>\n\n      <div class=\"hero-stats\">\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ metrics().total || 0 }}</div>\n          <div class=\"stat-label\">Total Deals</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill\" style=\"width: 100%\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ metrics().open }}</div>\n          <div class=\"stat-label\">Open</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--open\" [style.width.%]=\"metrics().total ? (metrics().open / metrics().total) * 100 : 0\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ metrics().closedWon }}</div>\n          <div class=\"stat-label\">Won</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--success\" [style.width.%]=\"metrics().total ? (metrics().closedWon / metrics().total) * 100 : 0\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ metrics().closedLost }}</div>\n          <div class=\"stat-label\">Lost</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--danger\" [style.width.%]=\"metrics().total ? (metrics().closedLost / metrics().total) * 100 : 0\"></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"hero-actions\">\n        <div class=\"view-toggle\">\n          <button type=\"button\" class=\"toggle-btn\" [class.active]=\"viewMode === 'table'\" (click)=\"viewMode = 'table'\" title=\"Table View\">\n            <i class=\"pi pi-list\"></i>\n          </button>\n          <button type=\"button\" class=\"toggle-btn\" [class.active]=\"viewMode === 'kanban'\" (click)=\"viewMode = 'kanban'\" title=\"Kanban View\">\n            <i class=\"pi pi-objects-column\"></i>\n          </button>\n        </div>\n        <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"!canManage()\" (click)=\"onCreate()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n          <span>New Deal</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--refresh\" (click)=\"load()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n          <span>Refresh</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-dollar\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Pipeline Value</span>\n          <strong class=\"card-value\">{{ metrics().pipelineValue | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</strong>\n          <span class=\"card-trend card-trend--up\">\n            <i class=\"pi pi-chart-line\"></i> Open forecast\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n\n      <div class=\"visual-card visual-card--secondary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-percentage\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Weighted Forecast</span>\n          <strong class=\"card-value\">{{ metrics().weightedPipeline | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-calculator\"></i> Probability adjusted\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       METRICS DASHBOARD\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"metrics-section\">\n    <div class=\"metric-card metric-card--total\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-briefcase\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Total Deals</span>\n        <strong class=\"metric-value\">{{ metrics().total || '\u2014' }}</strong>\n      </div>\n      <div class=\"metric-chart\">\n        <svg viewBox=\"0 0 100 40\" class=\"sparkline\">\n          <path d=\"M0,35 Q25,30 50,20 T100,15\" fill=\"none\" stroke=\"url(#gradient-blue)\" stroke-width=\"2\"/>\n          <defs>\n            <linearGradient id=\"gradient-blue\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n              <stop offset=\"0%\" stop-color=\"#667eea\"/>\n              <stop offset=\"100%\" stop-color=\"#764ba2\"/>\n            </linearGradient>\n          </defs>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--open\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-bolt\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Open</span>\n        <strong class=\"metric-value\">{{ metrics().open }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--cyan\" \n            [attr.stroke-dasharray]=\"(metrics().total ? (metrics().open / metrics().total) * 100 : 0) + ', 100'\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--won\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-check-circle\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Closed Won</span>\n        <strong class=\"metric-value\">{{ metrics().closedWon }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--green\" \n            [attr.stroke-dasharray]=\"(metrics().total ? (metrics().closedWon / metrics().total) * 100 : 0) + ', 100'\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--lost\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-times-circle\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Closed Lost</span>\n        <strong class=\"metric-value\">{{ metrics().closedLost }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--rose\" \n            [attr.stroke-dasharray]=\"(metrics().total ? (metrics().closedLost / metrics().total) * 100 : 0) + ', 100'\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--stalled\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-exclamation-triangle\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Stalled 30+ days</span>\n        <strong class=\"metric-value\">{{ metrics().stalled }}</strong>\n      </div>\n      <div class=\"metric-badge\" *ngIf=\"metrics().stalled > 0\">\n        <span>ALERT</span>\n      </div>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       SMART FILTER BAR\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"filter-section\">\n    <div class=\"filter-bar\">\n      <div class=\"search-wrapper\">\n        <i class=\"pi pi-search search-icon\"></i>\n        <input\n          pInputText\n          type=\"search\"\n          class=\"search-input\"\n          placeholder=\"Search deals, accounts...\"\n          [(ngModel)]=\"searchTerm\"\n          (ngModelChange)=\"onSearch($event)\"\n        />\n        <kbd class=\"search-kbd\">\u2318K</kbd>\n      </div>\n\n      <div class=\"filter-pills\">\n        <div class=\"filter-pill\">\n          <i class=\"pi pi-filter\"></i>\n          <p-select appendTo=\"body\"\n            [options]=\"stageOptions\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"stageFilter === 'all' ? null : stageFilter\"\n            (ngModelChange)=\"onStageChange($event || 'all')\"\n            placeholder=\"All Stages\"\n            styleClass=\"filter-select\"\n          ></p-select>\n        </div>\n      </div>\n\n      <div class=\"quick-stages\">\n        <button pButton type=\"button\" class=\"stage-pill\" [class.active]=\"stageFilter === 'all'\" (click)=\"onStageChange('all')\">All</button>\n        <button pButton type=\"button\" class=\"stage-pill\" [class.active]=\"stageFilter === 'Prospecting'\" (click)=\"onStageChange('Prospecting')\">Prospecting</button>\n        <button pButton type=\"button\" class=\"stage-pill\" [class.active]=\"stageFilter === 'Proposal'\" (click)=\"onStageChange('Proposal')\">Proposal</button>\n        <button pButton type=\"button\" class=\"stage-pill stage-pill--warning\" [class.active]=\"missingNextStepOnly\" (click)=\"onMissingNextStepToggle()\">No next step</button>\n        <button pButton type=\"button\" class=\"stage-pill stage-pill--success\" [class.active]=\"stageFilter === 'Closed Won'\" (click)=\"onStageChange('Closed Won')\">Won</button>\n        <button pButton type=\"button\" class=\"stage-pill stage-pill--danger\" [class.active]=\"stageFilter === 'Closed Lost'\" (click)=\"onStageChange('Closed Lost')\">Lost</button>\n      </div>\n\n      <div class=\"filter-actions\">\n        <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"clearFilters()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-times\"></i></span>\n          <span>Clear</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--export\" (click)=\"onExport()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-download\"></i></span>\n          <span>Export</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"filter-summary\" *ngIf=\"searchTerm || stageFilter !== 'all' || missingNextStepOnly\">\n      <span class=\"summary-label\">Active filters:</span>\n      <span class=\"filter-tag\" *ngIf=\"searchTerm\">\n        \"{{ searchTerm }}\"\n        <i class=\"pi pi-times\" (click)=\"searchTerm = ''; onSearch('')\"></i>\n      </span>\n      <span class=\"filter-tag\" *ngIf=\"stageFilter !== 'all'\">\n        {{ stageFilter }}\n        <i class=\"pi pi-times\" (click)=\"onStageChange('all')\"></i>\n      </span>\n      <span class=\"filter-tag\" *ngIf=\"missingNextStepOnly\">\n        No next step\n        <i class=\"pi pi-times\" (click)=\"onMissingNextStepToggle()\"></i>\n      </span>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       KANBAN BOARD VIEW\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"kanban-board\" *ngIf=\"viewMode === 'kanban'\">\n    <!-- Loading State -->\n    <ng-container *ngIf=\"loading()\">\n      <div class=\"kanban-column\" *ngFor=\"let stage of kanbanStages\">\n        <div class=\"column-header\" [style.border-color]=\"stageColumnColor(stage)\">\n          <span class=\"column-title\">{{ stage }}</span>\n          <span class=\"column-count\">\u2014</span>\n        </div>\n        <div class=\"column-body\">\n          <div class=\"deal-card deal-card--skeleton\" *ngFor=\"let _ of [1,2]\">\n            <div class=\"skeleton skeleton-line\"></div>\n            <div class=\"skeleton skeleton-line skeleton-short\"></div>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n\n    <!-- Loaded State -->\n    <ng-container *ngIf=\"!loading()\">\n      <div class=\"kanban-column\" *ngFor=\"let stage of kanbanStages\">\n        <div class=\"column-header\" [style.border-color]=\"stageColumnColor(stage)\">\n          <span class=\"column-title\">{{ stage }}</span>\n          <span class=\"column-count\">{{ getOpportunitiesByStage(stage).length }}</span>\n        </div>\n        <div class=\"column-body\">\n          <div class=\"deal-card\" *ngFor=\"let deal of getOpportunitiesByStage(stage)\" (click)=\"canManage() ? onEdit(deal) : null\">\n            <div class=\"deal-card-header\">\n              <div class=\"deal-avatar\" [style.background]=\"'linear-gradient(135deg, ' + stageColumnColor(deal.stage) + ' 0%, ' + stageColumnColor(deal.stage) + 'cc 100%)'\">\n                <img\n                  [src]=\"$any(deal).profilePictureUrl || ('https://i.pravatar.cc/150?u=' + deal.id)\"\n                  [alt]=\"deal.name + ' avatar'\"\n                  [title]=\"deal.name + ' avatar'\"\n                />\n              </div>\n              <div class=\"deal-meta\">\n                <span class=\"deal-name\">{{ deal.name }}</span>\n                <span class=\"deal-account\">{{ deal.account || 'No account' }}</span>\n              </div>\n              <div class=\"deal-probability\" \n                [class.high]=\"deal.probability >= 70\" \n                [class.medium]=\"deal.probability >= 40 && deal.probability < 70\" \n                [class.low]=\"deal.probability < 40\">\n                {{ deal.probability || 0 }}%\n              </div>\n            </div>\n\n            <div class=\"deal-card-body\">\n              <div class=\"deal-amount\">\n                <i class=\"pi pi-dollar\"></i>\n                <span>{{ deal.amount | currency: deal.currency:'symbol':'1.0-0' }}</span>\n              </div>\n              <div class=\"deal-close-date\" *ngIf=\"deal.closeDate\">\n                <i class=\"pi pi-calendar\"></i>\n                <span>{{ deal.closeDate | date:'mediumDate' }}</span>\n              </div>\n              <div class=\"deal-risk\" *ngIf=\"isStalled(deal)\">\n                <i class=\"pi pi-exclamation-triangle\"></i>\n                <span>{{ nextStepLabel(deal) }}</span>\n              </div>\n            </div>\n\n            <div class=\"deal-card-footer\">\n              <span class=\"deal-owner\">\n                <i class=\"pi pi-user\"></i>\n                {{ deal.owner || 'Unassigned' }}\n              </span>\n              <div class=\"deal-actions\">\n                <button type=\"button\" class=\"mini-action-btn mini-action-btn--edit\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onEdit(deal)\" title=\"Edit\">\n                  <i class=\"pi pi-pencil\"></i>\n                </button>\n                <button type=\"button\" class=\"mini-action-btn mini-action-btn--delete\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onDelete(deal)\" title=\"Delete\">\n                  <i class=\"pi pi-trash\"></i>\n                </button>\n              </div>\n            </div>\n          </div>\n          <div class=\"column-empty\" *ngIf=\"!getOpportunitiesByStage(stage).length\">\n            <i class=\"pi pi-briefcase\"></i>\n            <span>No {{ stage.toLowerCase() }} deals</span>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       DATA TABLE\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"data-section\" *ngIf=\"viewMode === 'table'\">\n    <div class=\"data-card\">\n      <header class=\"data-header\">\n        <div class=\"header-title\">\n          <h2>Deal Records</h2>\n          <span class=\"record-count\">\n            {{ opportunities().length }} of {{ total() }} records\n          </span>\n        </div>\n        <div class=\"header-actions\">\n          <button type=\"button\" class=\"action-btn action-btn--export\" (click)=\"onExport()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-download\"></i></span>\n            <span>Export</span>\n          </button>\n          <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"!canManage()\" (click)=\"onCreate()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n            <span>Add Deal</span>\n          </button>\n        </div>\n      </header>\n\n      <!-- Loading State -->\n      <div class=\"loading-state\" *ngIf=\"loading()\">\n        <div class=\"skeleton-row\" *ngFor=\"let _ of [1,2,3,4,5]\">\n          <div class=\"skeleton skeleton-avatar\"></div>\n          <div class=\"skeleton skeleton-text\"></div>\n          <div class=\"skeleton skeleton-text skeleton-short\"></div>\n          <div class=\"skeleton skeleton-badge\"></div>\n          <div class=\"skeleton skeleton-text\"></div>\n          <div class=\"skeleton skeleton-actions\"></div>\n        </div>\n      </div>\n\n      <!-- Empty State -->\n      <div class=\"empty-state\" *ngIf=\"!loading() && !opportunities().length\">\n        <div class=\"empty-icon\">\n          <i class=\"pi pi-briefcase\"></i>\n        </div>\n        <h3>No deals found</h3>\n        <p>Try adjusting your search or filters to find what you're looking for</p>\n        <button pButton type=\"button\" class=\"btn btn-primary\" (click)=\"onStageChange('all')\">\n          <i class=\"pi pi-refresh\"></i>\n          <span>Reset Filters</span>\n        </button>\n      </div>\n\n      <!-- Table View -->\n      <div class=\"table-wrapper\" *ngIf=\"!loading() && opportunities().length\">\n        <p-table class=\"data-table\" [value]=\"opportunities()\" [resizableColumns]=\"true\" columnResizeMode=\"fit\">\n          <ng-template pTemplate=\"header\">\n            <tr>\n              <th class=\"th-opportunity\" pSortableColumn=\"name\" pResizableColumn>\n                Deal\n                <p-sortIcon field=\"name\"></p-sortIcon>\n              </th>\n              <th pSortableColumn=\"account\" pResizableColumn>\n                Account\n                <p-sortIcon field=\"account\"></p-sortIcon>\n              </th>\n              <th pSortableColumn=\"stage\" pResizableColumn>\n                Stage\n                <p-sortIcon field=\"stage\"></p-sortIcon>\n              </th>\n              <th pSortableColumn=\"amount\" pResizableColumn>\n                Amount\n                <p-sortIcon field=\"amount\"></p-sortIcon>\n              </th>\n              <th pSortableColumn=\"probability\" pResizableColumn>\n                Probability\n                <p-sortIcon field=\"probability\"></p-sortIcon>\n              </th>\n              <th pResizableColumn>Risk</th>\n              <th pSortableColumn=\"status\" pResizableColumn>\n                Status\n                <p-sortIcon field=\"status\"></p-sortIcon>\n              </th>\n              <th pSortableColumn=\"ownerId\" pResizableColumn>\n                Owner\n                <p-sortIcon field=\"ownerId\"></p-sortIcon>\n              </th>\n              <th pSortableColumn=\"createdAtUtc\" pResizableColumn>\n                Created\n                <p-sortIcon field=\"createdAtUtc\"></p-sortIcon>\n              </th>\n              <th class=\"th-actions\" pResizableColumn>Actions</th>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"body\" let-row>\n            <tr class=\"table-row\" [class.row-stalled]=\"isStalled(row)\" (click)=\"onRowClick(row, $event)\">\n              <td class=\"td-opportunity\">\n                <div class=\"opportunity-icon\">\n                  <i class=\"pi pi-briefcase\"></i>\n                </div>\n                <div class=\"opportunity-info\">\n                  <span class=\"opportunity-name\">{{ row.name }}</span>\n                  <span class=\"opportunity-stage\">{{ row.stage }}</span>\n                </div>\n              </td>\n              <td>\n                <span class=\"account-name\">{{ row.account || '\u2014' }}</span>\n              </td>\n              <td>\n                <ng-container *ngIf=\"!row.stage.startsWith('Closed'); else closedStage\">\n                  <p-select appendTo=\"body\"\n                    [options]=\"stageOptionsInline\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    [ngModel]=\"row.stage\"\n                    (ngModelChange)=\"onInlineStageChange(row, $event)\"\n                    styleClass=\"inline-select\"\n                  ></p-select>\n                </ng-container>\n                <ng-template #closedStage>\n                  <span class=\"status-badge\" [class.status-badge--success]=\"row.stage === 'Closed Won'\" [class.status-badge--danger]=\"row.stage === 'Closed Lost'\">\n                    {{ row.stage }}\n                  </span>\n                </ng-template>\n              </td>\n              <td>\n                <span class=\"amount-value\">{{ row.amount | currency: row.currency }}</span>\n              </td>\n              <td>\n                <div class=\"probability-cell\">\n                  <div class=\"probability-bar\">\n                    <div class=\"probability-fill\" [style.width.%]=\"row.probability || 0\"></div>\n                  </div>\n                  <span class=\"probability-value\">{{ row.probability || 0 }}%</span>\n                </div>\n              </td>\n              <td>\n                <span class=\"risk-badge\" *ngIf=\"isStalled(row)\">\n                  <i class=\"pi pi-exclamation-triangle\"></i>\n                  {{ nextStepLabel(row) }}\n                </span>\n                <span *ngIf=\"!isStalled(row)\">On track</span>\n              </td>\n              <td>\n                <span class=\"status-badge\" \n                  [class.status-badge--success]=\"row.status === 'Closed Won'\"\n                  [class.status-badge--danger]=\"row.status === 'Closed Lost'\"\n                  [class.status-badge--info]=\"row.status === 'Open'\">\n                  {{ row.status }}\n                </span>\n              </td>\n              <td>\n                <p-select appendTo=\"body\"\n                  [options]=\"ownerOptionsForAssign()\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  [ngModel]=\"row.ownerId\"\n                  (ngModelChange)=\"onInlineOwnerChange(row, $event)\"\n                  placeholder=\"Owner\"\n                  styleClass=\"inline-select\"\n                ></p-select>\n              </td>\n              <td class=\"td-created\">\n                <span class=\"created-date\">{{ row.createdAtUtc | date: 'MMM d, yyyy' }}</span>\n              </td>\n              <td class=\"td-actions\">\n                <div class=\"row-actions\">\n                  <button type=\"button\" class=\"row-action-btn row-action-btn--edit\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onEdit(row)\" title=\"Edit\"><i class=\"pi pi-pencil\"></i></button>\n                  <button type=\"button\" class=\"row-action-btn row-action-btn--delete\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onDelete(row)\" title=\"Delete\"><i class=\"pi pi-trash\"></i></button>\n                </div>\n              </td>\n            </tr>\n          </ng-template>\n        </p-table>\n      </div>\n\n      <!-- Paginator -->\n      <p-paginator\n        *ngIf=\"!loading() && opportunities().length\"\n        [rows]=\"rows\"\n        [totalRecords]=\"total()\"\n        [rowsPerPageOptions]=\"[5, 10, 20]\"\n        [first]=\"pageIndex * rows\"\n        (onPageChange)=\"onPageChange($event)\"\n        styleClass=\"data-paginator\"\n      ></p-paginator>\n    </div>\n  </section>\n\n</div>\n", styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   OPPORTUNITIES PAGE - Premium Light UI\n   Following the global design system (light theme)\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   ANIMATIONS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   BASE STYLES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n:host {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n.page-container {\n  min-height: 100vh;\n  padding: 1.5rem 2rem;\n  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n  overflow-x: hidden;\n  max-width: 100%;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   BACKGROUND ORBS (subtle light version)\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.bg-orbs {\n  display: none; /* Hide orbs for light theme */\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HERO SECTION\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.hero-section {\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 2rem;\n  padding: 2rem;\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 20px;\n  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);\n  margin-bottom: 1.5rem;\n  animation: fade-in-up 0.4s ease-out;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.4rem 0.85rem;\n  background: rgba(14, 165, 233, 0.1);\n  border: 1px solid rgba(14, 165, 233, 0.2);\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #0369a1;\n  width: fit-content;\n}\n\n.badge-dot {\n  width: 6px;\n  height: 6px;\n  background: #0ea5e9;\n  border-radius: 50%;\n}\n\n\n.hero-description {\n  font-size: 1rem;\n  color: rgba(60, 60, 67, 0.7);\n  max-width: 480px;\n  margin: 0;\n}\n\n.hero-stats {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 1.25rem;\n  padding: 1.25rem 0;\n  border-top: 1px solid rgba(148, 163, 184, 0.15);\n  border-bottom: 1px solid rgba(148, 163, 184, 0.15);\n\n  @media (max-width: 768px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n.hero-stat {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n\n.stat-value {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.stat-label {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.stat-bar {\n  height: 4px;\n  background: rgba(148, 163, 184, 0.2);\n  border-radius: 2px;\n  overflow: hidden;\n  margin-top: 0.4rem;\n}\n\n.stat-bar-fill {\n  height: 100%;\n  background: linear-gradient(90deg, #0ea5e9, #8b5cf6);\n  border-radius: 2px;\n  transition: width 0.4s ease;\n\n  &--open { background: linear-gradient(90deg, #0ea5e9, #06b6d4); }\n  &--success { background: linear-gradient(90deg, #10b981, #34d399); }\n  &--danger { background: linear-gradient(90deg, #ef4444, #f87171); }\n}\n\n.hero-actions {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HERO VISUAL CARDS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n\n  @media (max-width: 1100px) {\n    flex-direction: row;\n  }\n\n  @media (max-width: 600px) {\n    flex-direction: column;\n  }\n}\n\n.visual-card {\n  display: flex;\n  gap: 1rem;\n  padding: 1.25rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  transition: all 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(139, 92, 246, 0.06) 100%);\n    border-color: rgba(14, 165, 233, 0.15);\n  }\n\n  &--secondary {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);\n    border-color: rgba(16, 185, 129, 0.15);\n  }\n}\n\n.card-icon {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(14, 165, 233, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n\n  i {\n    font-size: 1.1rem;\n    color: #0284c7;\n  }\n\n  .visual-card--secondary & {\n    background: rgba(16, 185, 129, 0.12);\n    i { color: #059669; }\n  }\n}\n\n.card-content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n\n.card-label {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.card-value {\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.card-trend {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.6);\n\n  i { font-size: 0.625rem; }\n\n  &--up { color: #059669; }\n  &--down { color: #dc2626; }\n}\n\n.card-glow {\n  display: none;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   METRICS SECTION\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.metrics-section {\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n  animation: fade-in-up 0.4s ease-out 0.1s both;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  @media (max-width: 768px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 500px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  padding: 1rem 1.15rem;\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  transition: all 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(15, 23, 42, 0.06);\n  }\n}\n\n.metric-icon {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n\n  i {\n    font-size: 1rem;\n    color: rgba(60, 60, 67, 0.7);\n  }\n\n  .metric-card--total & { background: rgba(14, 165, 233, 0.12); i { color: #0284c7; } }\n  .metric-card--open & { background: rgba(6, 182, 212, 0.12); i { color: #0891b2; } }\n  .metric-card--won & { background: rgba(16, 185, 129, 0.12); i { color: #059669; } }\n  .metric-card--lost & { background: rgba(239, 68, 68, 0.12); i { color: #dc2626; } }\n  .metric-card--stalled & { background: rgba(245, 158, 11, 0.12); i { color: #d97706; } }\n}\n\n.metric-content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  flex: 1;\n  min-width: 0;\n}\n\n.metric-label {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.metric-value {\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.metric-chart {\n  width: 56px;\n  height: 28px;\n  flex-shrink: 0;\n}\n\n.sparkline {\n  width: 100%;\n  height: 100%;\n}\n\n.metric-ring {\n  width: 40px;\n  height: 40px;\n  flex-shrink: 0;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n}\n\n.ring-bg {\n  fill: none;\n  stroke: rgba(148, 163, 184, 0.2);\n  stroke-width: 3;\n}\n\n.ring-fill {\n  fill: none;\n  stroke-width: 3;\n  stroke-linecap: round;\n\n  &--cyan { stroke: #0891b2; }\n  &--green { stroke: #059669; }\n  &--rose { stroke: #dc2626; }\n  &--amber { stroke: #d97706; }\n}\n\n.metric-badge {\n  position: absolute;\n  top: 0.6rem;\n  right: 0.6rem;\n  padding: 0.2rem 0.5rem;\n  background: rgba(239, 68, 68, 0.12);\n  border: 1px solid rgba(239, 68, 68, 0.2);\n  border-radius: 6px;\n  font-size: 0.6rem;\n  font-weight: 700;\n  color: #dc2626;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   BUTTONS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-decoration: none;\n  white-space: nowrap;\n\n  i {\n    font-size: 0.85rem;\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.btn-primary {\n  background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);\n  color: #fff;\n\n  &:hover:not(:disabled) {\n    transform: translateY(-1px);\n    box-shadow: 0 6px 20px rgba(14, 165, 233, 0.35);\n  }\n}\n\n.btn-glow {\n  box-shadow: 0 4px 14px rgba(14, 165, 233, 0.25);\n}\n\n.btn-shine {\n  display: none;\n}\n\n.btn-secondary {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: rgba(15, 23, 42, 0.8);\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.5);\n  }\n}\n\n.btn-ghost {\n  background: transparent;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  color: rgba(60, 60, 67, 0.8);\n\n  &:hover:not(:disabled) {\n    background: rgba(255, 255, 255, 0.8);\n    border-color: rgba(148, 163, 184, 0.4);\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   FILTER SECTION\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.filter-section {\n  margin-bottom: 1.5rem;\n  animation: fade-in-up 0.4s ease-out 0.15s both;\n}\n\n.filter-bar {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  margin-bottom: 0.75rem;\n}\n\n.search-wrapper {\n  position: relative;\n  flex: 1;\n  min-width: 0;\n  max-width: 380px;\n}\n\n.search-icon {\n  position: absolute;\n  left: 1rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: rgba(60, 60, 67, 0.4);\n  font-size: 0.875rem;\n  pointer-events: none;\n}\n\n.search-input {\n  width: 100%;\n  padding: 0.65rem 1rem 0.65rem 2.5rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  border-radius: 10px;\n  color: rgba(15, 23, 42, 0.9);\n  font-size: 0.875rem;\n  transition: all 0.2s ease;\n\n  &::placeholder {\n    color: rgba(60, 60, 67, 0.45);\n  }\n\n  &:focus {\n    outline: none;\n    border-color: rgba(14, 165, 233, 0.5);\n    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);\n  }\n}\n\n.search-kbd {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  padding: 0.2rem 0.45rem;\n  background: rgba(248, 250, 252, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  border-radius: 5px;\n  font-size: 0.65rem;\n  color: rgba(60, 60, 67, 0.5);\n  font-family: inherit;\n}\n\n.filter-pills {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n\n.filter-pill {\n  display: flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.45rem 0.75rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 8px;\n\n  i {\n    font-size: 0.75rem;\n    color: rgba(60, 60, 67, 0.5);\n  }\n}\n\n.filter-select {\n  background: transparent !important;\n  border: none !important;\n  min-width: 0;\n\n  .p-select-label {\n    padding: 0 !important;\n    color: rgba(15, 23, 42, 0.8) !important;\n    font-size: 0.85rem !important;\n  }\n}\n\n.quick-stages {\n  display: flex;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n\n.stage-pill {\n  padding: 0.45rem 0.85rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: rgba(60, 60, 67, 0.8);\n  transition: all 0.2s ease;\n  cursor: pointer;\n\n  &:hover {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.4);\n  }\n\n  &.active {\n    background: rgba(14, 165, 233, 0.12);\n    border-color: rgba(14, 165, 233, 0.3);\n    color: #0369a1;\n  }\n\n  &--success.active {\n    background: rgba(16, 185, 129, 0.12);\n    border-color: rgba(16, 185, 129, 0.3);\n    color: #047857;\n  }\n\n  &--danger.active {\n    background: rgba(239, 68, 68, 0.12);\n    border-color: rgba(239, 68, 68, 0.3);\n    color: #b91c1c;\n  }\n\n  &--warning.active {\n    background: rgba(245, 158, 11, 0.12);\n    border-color: rgba(245, 158, 11, 0.3);\n    color: #b45309;\n  }\n}\n\n.filter-actions {\n  display: flex;\n  gap: 0.5rem;\n  margin-left: auto;\n}\n\n.filter-summary {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.65rem 0.9rem;\n  background: rgba(14, 165, 233, 0.08);\n  border: 1px solid rgba(14, 165, 233, 0.15);\n  border-radius: 10px;\n}\n\n.summary-label {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.7);\n}\n\n.filter-tag {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(255, 255, 255, 0.9);\n  border-radius: 6px;\n  font-size: 0.75rem;\n  color: rgba(15, 23, 42, 0.9);\n\n  i {\n    font-size: 0.6rem;\n    cursor: pointer;\n    opacity: 0.5;\n    transition: opacity 0.2s ease;\n\n    &:hover {\n      opacity: 1;\n    }\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   DATA SECTION\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.data-section {\n  animation: fade-in-up 0.4s ease-out 0.2s both;\n}\n\n.data-card {\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 20px;\n  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);\n  overflow: hidden;\n}\n\n.data-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.15rem 1.35rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n.header-title {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n\n  h2 {\n    font-size: 1.05rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.record-count {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.header-actions {\n  display: flex;\n  gap: 0.65rem;\n}\n\n.action-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.55rem 0.9rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 8px;\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: rgba(60, 60, 67, 0.8);\n  cursor: pointer;\n  transition: all 0.2s ease;\n\n  i {\n    font-size: 0.75rem;\n  }\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.35);\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);\n    border-color: transparent;\n    color: #fff;\n\n    &:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 4px 14px rgba(14, 165, 233, 0.3);\n    }\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   LOADING & EMPTY STATES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.loading-state {\n  padding: 1.35rem;\n}\n\n.skeleton-row {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.9rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n}\n\n.skeleton {\n  background: linear-gradient(\n    90deg,\n    rgba(148, 163, 184, 0.1) 25%,\n    rgba(148, 163, 184, 0.2) 50%,\n    rgba(148, 163, 184, 0.1) 75%\n  );\n  background-size: 200% 100%;\n  animation: shimmer 1.5s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n.skeleton-avatar {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n}\n\n.skeleton-text {\n  height: 14px;\n  flex: 1;\n}\n\n.skeleton-short {\n  flex: 0.5;\n}\n\n.skeleton-badge {\n  width: 56px;\n  height: 22px;\n}\n\n.skeleton-actions {\n  width: 72px;\n  height: 30px;\n}\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3.5rem 2rem;\n  text-align: center;\n}\n\n.empty-icon {\n  width: 72px;\n  height: 72px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(148, 163, 184, 0.1);\n  border: 1px solid rgba(148, 163, 184, 0.15);\n  border-radius: 18px;\n  margin-bottom: 1.25rem;\n\n  i {\n    font-size: 1.75rem;\n    color: rgba(60, 60, 67, 0.35);\n  }\n}\n\n.empty-state h3 {\n  font-size: 1.15rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  margin: 0 0 0.4rem;\n}\n\n.empty-state p {\n  font-size: 0.875rem;\n  color: rgba(60, 60, 67, 0.6);\n  margin: 0 0 1.25rem;\n  max-width: 280px;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   TABLE STYLES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.table-wrapper {\n  overflow-x: hidden;\n}\n\n.data-table {\n  width: 100%;\n\n  .p-datatable-table {\n    border-collapse: collapse;\n    table-layout: fixed;\n    width: 100%;\n  }\n\n  .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: 0.75rem 0.85rem;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n    text-align: left;\n    white-space: nowrap;\n  }\n\n  .p-datatable-tbody > tr {\n    transition: all 0.15s ease;\n\n    &:hover {\n      background: rgba(248, 250, 252, 0.6);\n    }\n\n    > td {\n      border: none;\n      border-bottom: 1px solid rgba(148, 163, 184, 0.08);\n      padding: 0.75rem 0.85rem;\n      font-size: 0.875rem;\n      color: rgba(15, 23, 42, 0.9);\n      vertical-align: middle;\n      white-space: normal;\n      word-break: break-word;\n    }\n  }\n\n  .p-sortable-column {\n    cursor: pointer;\n\n    &:hover {\n      background: rgba(248, 250, 252, 0.9);\n    }\n\n    .p-sortable-column-icon {\n      margin-left: 0.4rem;\n      color: rgba(60, 60, 67, 0.35);\n      font-size: 0.6rem;\n    }\n  }\n}\n\n:host ::ng-deep .data-table .p-datatable-thead > tr > th:nth-child(1),\n:host ::ng-deep .data-table .p-datatable-tbody > tr > td:nth-child(1) {\n  width: 240px;\n}\n\n:host ::ng-deep .data-table .p-datatable-thead > tr > th:nth-child(2),\n:host ::ng-deep .data-table .p-datatable-tbody > tr > td:nth-child(2) {\n  width: 160px;\n}\n\n:host ::ng-deep .data-table .p-datatable-thead > tr > th:nth-child(3),\n:host ::ng-deep .data-table .p-datatable-tbody > tr > td:nth-child(3) {\n  width: 140px;\n}\n\n:host ::ng-deep .data-table .p-datatable-thead > tr > th:nth-child(4),\n:host ::ng-deep .data-table .p-datatable-tbody > tr > td:nth-child(4) {\n  width: 130px;\n}\n\n:host ::ng-deep .data-table .p-datatable-thead > tr > th:nth-child(5),\n:host ::ng-deep .data-table .p-datatable-tbody > tr > td:nth-child(5) {\n  width: 140px;\n}\n\n:host ::ng-deep .data-table .p-datatable-thead > tr > th:nth-child(6),\n:host ::ng-deep .data-table .p-datatable-tbody > tr > td:nth-child(6) {\n  width: 120px;\n}\n\n:host ::ng-deep .data-table .p-datatable-thead > tr > th:nth-child(7),\n:host ::ng-deep .data-table .p-datatable-tbody > tr > td:nth-child(7) {\n  width: 120px;\n}\n\n:host ::ng-deep .data-table .p-datatable-thead > tr > th:nth-child(8),\n:host ::ng-deep .data-table .p-datatable-tbody > tr > td:nth-child(8) {\n  width: 160px;\n}\n\n:host ::ng-deep .data-table .p-datatable-thead > tr > th:nth-child(9),\n:host ::ng-deep .data-table .p-datatable-tbody > tr > td:nth-child(9) {\n  width: 90px;\n}\n\n:host ::ng-deep .data-table .p-datatable-wrapper {\n  overflow-x: hidden;\n}\n\n@media (max-width: 768px) {\n  // Allow horizontal scrolling on dense tables without clipping.\n  .table-wrapper {\n    overflow-x: auto;\n  }\n\n  .data-table .p-datatable-table {\n    min-width: 860px;\n  }\n\n  :host ::ng-deep .data-table .p-datatable-wrapper {\n    overflow-x: auto;\n  }\n}\n\n.table-row {\n  &.row-stalled {\n    background: rgba(245, 158, 11, 0.06);\n\n    &:hover {\n      background: rgba(245, 158, 11, 0.1);\n    }\n  }\n}\n\n.td-opportunity {\n  display: flex;\n  align-items: center;\n  gap: 0.7rem;\n}\n\n.opportunity-icon {\n  width: 38px;\n  height: 38px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(139, 92, 246, 0.1) 100%);\n  border-radius: 10px;\n  flex-shrink: 0;\n\n  i {\n    font-size: 0.95rem;\n    color: #0284c7;\n  }\n}\n\n.opportunity-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n\n.opportunity-name {\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.opportunity-stage {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.account-name {\n  color: rgba(15, 23, 42, 0.8);\n}\n\n.amount-value {\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.probability-cell {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n}\n\n.probability-bar {\n  width: 55px;\n  height: 5px;\n  background: rgba(148, 163, 184, 0.2);\n  border-radius: 3px;\n  overflow: hidden;\n}\n\n.probability-fill {\n  height: 100%;\n  background: linear-gradient(90deg, #0ea5e9, #8b5cf6);\n  border-radius: 3px;\n  transition: width 0.3s ease;\n}\n\n.probability-value {\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: rgba(60, 60, 67, 0.75);\n  min-width: 32px;\n}\n\n.date-value {\n  color: rgba(60, 60, 67, 0.75);\n  white-space: nowrap;\n}\n\n.th-opportunity {\n  // min-width removed to prevent overflow\n}\n\n.th-actions {\n  width: 90px;\n  text-align: right;\n}\n\n.td-actions {\n  text-align: right;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   STATUS BADGES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  white-space: nowrap;\n\n  &--success {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n\n  &--danger {\n    background: rgba(239, 68, 68, 0.12);\n    color: #b91c1c;\n  }\n\n  &--info {\n    background: rgba(14, 165, 233, 0.12);\n    color: #0369a1;\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #b45309;\n  }\n}\n\n.risk-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(245, 158, 11, 0.12);\n  border: 1px solid rgba(245, 158, 11, 0.2);\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: #b45309;\n  white-space: nowrap;\n\n  i {\n    font-size: 0.6rem;\n  }\n}\n\n.inline-select {\n  min-width: 0;\n  background: rgba(255, 255, 255, 0.9) !important;\n  border: 1px solid rgba(148, 163, 184, 0.2) !important;\n  border-radius: 6px !important;\n\n  .p-select-label {\n    padding: 0.3rem 0.65rem !important;\n    font-size: 0.8rem !important;\n    color: rgba(15, 23, 42, 0.8) !important;\n  }\n\n  &:hover {\n    border-color: rgba(148, 163, 184, 0.35) !important;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   PAGINATOR\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.data-paginator {\n  padding: 0.9rem 1.35rem;\n  background: rgba(248, 250, 252, 0.6);\n  border-top: 1px solid rgba(148, 163, 184, 0.1);\n\n  .p-paginator {\n    background: transparent;\n    padding: 0;\n    gap: 0.4rem;\n  }\n\n  .p-paginator-element {\n    min-width: 34px;\n    height: 34px;\n    background: rgba(255, 255, 255, 0.9);\n    border: 1px solid rgba(148, 163, 184, 0.2);\n    border-radius: 8px;\n    color: rgba(60, 60, 67, 0.8);\n    transition: all 0.2s ease;\n\n    &:hover:not(:disabled) {\n      background: #fff;\n      border-color: rgba(148, 163, 184, 0.35);\n    }\n\n    &.p-paginator-element-active {\n      background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);\n      border-color: transparent;\n      color: #fff;\n    }\n\n    &:disabled {\n      opacity: 0.4;\n    }\n  }\n\n  .p-select {\n    background: rgba(255, 255, 255, 0.9);\n    border: 1px solid rgba(148, 163, 184, 0.2);\n    border-radius: 8px;\n\n    .p-select-label {\n      color: rgba(15, 23, 42, 0.8);\n    }\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   DIALOG STYLES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n:host ::ng-deep .opportunity-dialog {\n  .p-dialog {\n    background: #fff;\n    border: 1px solid rgba(148, 163, 184, 0.2);\n    border-radius: 20px;\n    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.15);\n  }\n\n  .p-dialog-header {\n    background: transparent;\n    border-bottom: 1px solid rgba(148, 163, 184, 0.15);\n    padding: 1.35rem;\n\n    .p-dialog-title {\n      font-size: 1.15rem;\n      font-weight: 600;\n      color: rgba(15, 23, 42, 0.9);\n    }\n\n    .p-dialog-header-close {\n      color: rgba(60, 60, 67, 0.5);\n\n      &:hover {\n        color: rgba(15, 23, 42, 0.8);\n        background: rgba(148, 163, 184, 0.12);\n      }\n    }\n  }\n\n  .p-dialog-content {\n    background: transparent;\n    padding: 1.35rem;\n    color: rgba(15, 23, 42, 0.9);\n  }\n\n  .p-dialog-footer {\n    background: transparent;\n    border-top: 1px solid rgba(148, 163, 184, 0.15);\n    padding: 0.9rem 1.35rem;\n    gap: 0.65rem;\n  }\n}\n\n.dialog-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.15rem;\n}\n\n.form-row {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n\n  label {\n    font-size: 0.8rem;\n    font-weight: 500;\n    color: rgba(60, 60, 67, 0.75);\n  }\n\n  input[type=\"text\"],\n  input[type=\"search\"],\n  textarea {\n    padding: 0.65rem 0.9rem;\n    background: rgba(255, 255, 255, 0.9);\n    border: 1px solid rgba(148, 163, 184, 0.25);\n    border-radius: 10px;\n    color: rgba(15, 23, 42, 0.9);\n    font-size: 0.875rem;\n    transition: all 0.2s ease;\n\n    &::placeholder {\n      color: rgba(60, 60, 67, 0.45);\n    }\n\n    &:focus {\n      outline: none;\n      border-color: rgba(14, 165, 233, 0.5);\n      box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);\n    }\n  }\n\n  textarea {\n    resize: vertical;\n    min-height: 72px;\n  }\n}\n\n.form-grid-2 {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 0.9rem;\n\n  @media (max-width: 500px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.checkbox-row {\n  flex-direction: row;\n  gap: 1.35rem;\n\n  .p-checkbox-label {\n    color: rgba(15, 23, 42, 0.8);\n    font-size: 0.875rem;\n  }\n}\n\n.error-text {\n  font-size: 0.75rem;\n  color: #dc2626;\n}\n\n.history-section {\n  padding-top: 0.9rem;\n  border-top: 1px solid rgba(148, 163, 184, 0.15);\n\n  h4 {\n    font-size: 0.9rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0 0 0.9rem;\n  }\n}\n\n.history-loading {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n\n.history-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n\n.history-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.65rem;\n  background: rgba(248, 250, 252, 0.8);\n  border-radius: 8px;\n}\n\n.history-stage {\n  font-size: 0.85rem;\n  font-weight: 500;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.history-date {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.history-empty {\n  font-size: 0.8rem;\n  color: rgba(60, 60, 67, 0.5);\n  margin: 0;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   RESPONSIVE ADJUSTMENTS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@media (max-width: 768px) {\n  .page-container {\n    padding: 1rem;\n  }\n\n  .hero-section {\n    padding: 1.35rem;\n    gap: 1.25rem;\n  }\n\n  .hero-stats {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .hero-actions {\n    flex-wrap: wrap;\n  }\n\n  .filter-bar {\n    padding: 0.9rem;\n  }\n\n  .search-wrapper {\n    min-width: 100%;\n    max-width: 100%;\n  }\n\n  .quick-stages {\n    display: none;\n  }\n\n  .data-table .p-datatable-thead > tr > th,\n  .data-table .p-datatable-tbody > tr > td {\n    padding: 0.7rem 0.9rem;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   VIEW TOGGLE\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.view-toggle {\n  display: flex;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: 8px;\n  padding: 2px;\n\n  .toggle-btn {\n    padding: 8px 12px;\n    border: none;\n    background: transparent;\n    color: #6b7280;\n    border-radius: 6px;\n    cursor: pointer;\n    transition: all 0.15s ease;\n    font-size: 14px;\n\n    &:hover {\n      color: #374151;\n    }\n\n    &.active {\n      background: white;\n      color: #1f2937;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    }\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   KANBAN BOARD\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.kanban-board {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  gap: 14px;\n  min-height: 500px;\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out;\n\n  @media (max-width: 1400px) {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.kanban-column {\n  background: rgba(255, 255, 255, 0.5);\n  backdrop-filter: blur(12px);\n  border-radius: 16px;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  display: flex;\n  flex-direction: column;\n  max-height: 75vh;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n}\n\n.column-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px;\n  border-bottom: 3px solid;\n  border-radius: 16px 16px 0 0;\n\n  .column-title {\n    font-size: 13px;\n    font-weight: 700;\n    color: #374151;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .column-count {\n    font-size: 12px;\n    font-weight: 600;\n    padding: 3px 10px;\n    background: white;\n    border-radius: 12px;\n    color: #6b7280;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);\n  }\n}\n\n.column-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 10px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.deal-card {\n  background: white;\n  border-radius: 12px;\n  padding: 14px;\n  cursor: pointer;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  transition: all 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);\n    border-color: rgba(102, 126, 234, 0.2);\n  }\n\n  &--skeleton {\n    cursor: default;\n    &:hover {\n      transform: none;\n      box-shadow: none;\n    }\n  }\n}\n\n.deal-card-header {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n\n.deal-avatar {\n  width: 34px;\n  height: 34px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 9px;\n  font-size: 13px;\n  font-weight: 700;\n  color: white;\n  flex-shrink: 0;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.deal-meta {\n  flex: 1;\n  min-width: 0;\n\n  .deal-name {\n    display: block;\n    font-size: 13px;\n    font-weight: 600;\n    color: #1f2937;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    line-height: 1.3;\n  }\n\n  .deal-account {\n    display: block;\n    font-size: 11px;\n    color: #9ca3af;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n}\n\n.deal-probability {\n  min-width: 36px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 6px;\n  font-size: 11px;\n  font-weight: 700;\n  flex-shrink: 0;\n\n  &.high {\n    background: rgba(34, 197, 94, 0.12);\n    color: #16a34a;\n  }\n\n  &.medium {\n    background: rgba(245, 158, 11, 0.12);\n    color: #d97706;\n  }\n\n  &.low {\n    background: rgba(239, 68, 68, 0.12);\n    color: #dc2626;\n  }\n}\n\n.deal-card-body {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  margin-bottom: 10px;\n\n  .deal-amount,\n  .deal-close-date,\n  .deal-risk {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    font-size: 12px;\n    color: #6b7280;\n\n    i {\n      font-size: 11px;\n      color: #9ca3af;\n      width: 14px;\n      text-align: center;\n    }\n  }\n\n  .deal-amount {\n    font-weight: 600;\n    color: #374151;\n  }\n\n  .deal-risk {\n    color: #f59e0b;\n\n    i {\n      color: #f59e0b;\n    }\n  }\n}\n\n.deal-card-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: 10px;\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.deal-owner {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11px;\n  color: #9ca3af;\n  max-width: 60%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n\n  i {\n    font-size: 10px;\n    flex-shrink: 0;\n  }\n}\n\n.deal-actions {\n  display: flex;\n  gap: 4px;\n}\n\n.column-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 16px;\n  color: #d1d5db;\n\n  i {\n    font-size: 24px;\n    margin-bottom: 8px;\n  }\n\n  span {\n    font-size: 12px;\n  }\n}\n\n.skeleton {\n  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n.skeleton-line {\n  height: 14px;\n  margin-bottom: 8px;\n  width: 100%;\n\n  &.skeleton-short {\n    width: 60%;\n  }\n}\n\n/* Kanban responsive adjustments */\n@media (max-width: 600px) {\n  .kanban-column {\n    max-height: none;\n  }\n\n  .view-toggle {\n    .toggle-btn {\n      padding: 6px 10px;\n    }\n  }\n}\n"] }]
    }], () => [{ type: i1.OpportunityDataService }, { type: i2.Router }, { type: i3.UserAdminDataService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OpportunitiesPage, { className: "OpportunitiesPage", filePath: "src/app/crm/features/opportunities/pages/opportunities.page.ts", lineNumber: 52 }); })();
