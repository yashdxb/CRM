import { CurrencyPipe, DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { forkJoin, switchMap } from 'rxjs';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { exportToCsv } from '../../../../shared/utils/csv';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import * as i0 from "@angular/core";
import * as i1 from "../services/property-data.service";
import * as i2 from "@angular/router";
import * as i3 from "../../../../core/app-toast.service";
import * as i4 from "primeng/api";
import * as i5 from "@angular/forms";
import * as i6 from "primeng/table";
import * as i7 from "primeng/tag";
import * as i8 from "primeng/inputtext";
import * as i9 from "primeng/select";
import * as i10 from "primeng/paginator";
import * as i11 from "primeng/tooltip";
import * as i12 from "primeng/dialog";
import * as i13 from "primeng/confirmdialog";
const _c0 = () => ({ width: "700px" });
const _c1 = () => ({ width: "400px" });
const _c2 = () => [1, 2, 3, 4, 5];
const _c3 = () => [10, 25, 50];
const _c4 = () => [1, 2, 3, 4, 5, 6];
function PropertiesPage_button_169_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 116);
    i0.ɵɵlistener("click", function PropertiesPage_button_169_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onShowMlsDialog()); });
    i0.ɵɵelementStart(1, "span", 26);
    i0.ɵɵelement(2, "i", 117);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "MLS Import");
    i0.ɵɵelementEnd()();
} }
function PropertiesPage_div_180_span_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 121);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "i", 122);
    i0.ɵɵlistener("click", function PropertiesPage_div_180_span_3_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(2); ctx_r2.searchTerm = ""; return i0.ɵɵresetView(ctx_r2.onSearch("")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \"", ctx_r2.searchTerm, "\" ");
} }
function PropertiesPage_div_180_span_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 121);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "i", 122);
    i0.ɵɵlistener("click", function PropertiesPage_div_180_span_4_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(2); ctx_r2.statusFilter = "all"; return i0.ɵɵresetView(ctx_r2.onStatusChange("all")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.statusFilter, " ");
} }
function PropertiesPage_div_180_span_5_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 121);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "i", 122);
    i0.ɵɵlistener("click", function PropertiesPage_div_180_span_5_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(2); ctx_r2.typeFilter = "all"; return i0.ɵɵresetView(ctx_r2.onTypeChange("all")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.typeFilter, " ");
} }
function PropertiesPage_div_180_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 118)(1, "span", 119);
    i0.ɵɵtext(2, "Active filters:");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, PropertiesPage_div_180_span_3_Template, 3, 1, "span", 120)(4, PropertiesPage_div_180_span_4_Template, 3, 1, "span", 120)(5, PropertiesPage_div_180_span_5_Template, 3, 1, "span", 120);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.searchTerm);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.statusFilter !== "all");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.typeFilter !== "all");
} }
function PropertiesPage_section_181_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 132)(1, "span", 133);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 93);
    i0.ɵɵlistener("click", function PropertiesPage_section_181_div_8_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.showBulkStatusDialog.set(true)); });
    i0.ɵɵelementStart(4, "span", 26);
    i0.ɵɵelement(5, "i", 77);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Change Status");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 134);
    i0.ɵɵlistener("click", function PropertiesPage_section_181_div_8_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.bulkDelete()); });
    i0.ɵɵelementStart(9, "span", 26);
    i0.ɵɵelement(10, "i", 135);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12, "Delete");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "button", 93);
    i0.ɵɵlistener("click", function PropertiesPage_section_181_div_8_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.clearSelection()); });
    i0.ɵɵelementStart(14, "span", 26);
    i0.ɵɵelement(15, "i", 94);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17, "Clear");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r2.selectionCount(), " selected");
} }
function PropertiesPage_section_181_div_9_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 138);
    i0.ɵɵelement(1, "div", 139)(2, "div", 140)(3, "div", 141)(4, "div", 142)(5, "div", 140)(6, "div", 143);
    i0.ɵɵelementEnd();
} }
function PropertiesPage_section_181_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 136);
    i0.ɵɵtemplate(1, PropertiesPage_section_181_div_9_div_1_Template, 7, 0, "div", 137);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c2));
} }
function PropertiesPage_section_181_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 144)(1, "div", 145);
    i0.ɵɵelement(2, "i", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "No properties found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Try adjusting your search or filters to find what you're looking for");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 28);
    i0.ɵɵlistener("click", function PropertiesPage_section_181_div_10_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r8); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.resetFilters()); });
    i0.ɵɵelementStart(8, "span", 26);
    i0.ɵɵelement(9, "i", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11, "Reset Filters");
    i0.ɵɵelementEnd()()();
} }
function PropertiesPage_section_181_div_11_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "th", 151)(2, "input", 152);
    i0.ɵɵlistener("change", function PropertiesPage_section_181_div_11_ng_template_2_Template_input_change_2_listener() { i0.ɵɵrestoreView(_r10); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.toggleSelectAll()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "th", 153);
    i0.ɵɵtext(4, "Property ");
    i0.ɵɵelement(5, "p-sortIcon", 154);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th", 155);
    i0.ɵɵtext(7, "MLS # ");
    i0.ɵɵelement(8, "p-sortIcon", 156);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 157);
    i0.ɵɵtext(10, "List Price ");
    i0.ɵɵelement(11, "p-sortIcon", 158);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 159);
    i0.ɵɵtext(13, "Status ");
    i0.ɵɵelement(14, "p-sortIcon", 160);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th", 161);
    i0.ɵɵtext(16, "Type ");
    i0.ɵɵelement(17, "p-sortIcon", 162);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "th");
    i0.ɵɵtext(19, "Details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "th", 163);
    i0.ɵɵtext(21, "Agent ");
    i0.ɵɵelement(22, "p-sortIcon", 164);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "th", 165);
    i0.ɵɵtext(24, "Actions");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", ctx_r2.isAllSelected());
} }
function PropertiesPage_section_181_div_11_ng_template_3_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 189);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "currency");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(2, 1, row_r12.listPrice, row_r12.currency, "symbol", "1.0-0"));
} }
function PropertiesPage_section_181_div_11_ng_template_3_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function PropertiesPage_section_181_div_11_ng_template_3_span_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 190);
    i0.ɵɵelement(1, "i", 85);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", row_r12.bedrooms, " ");
} }
function PropertiesPage_section_181_div_11_ng_template_3_span_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 191);
    i0.ɵɵelement(1, "i", 192);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", row_r12.bathrooms, " ");
} }
function PropertiesPage_section_181_div_11_ng_template_3_span_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 193);
    i0.ɵɵelement(1, "i", 194);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(3, 1, row_r12.squareFeet, "1.0-0"), " ");
} }
function PropertiesPage_section_181_div_11_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 166);
    i0.ɵɵlistener("click", function PropertiesPage_section_181_div_11_ng_template_3_Template_tr_click_0_listener($event) { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.onRowClick(row_r12, $event)); });
    i0.ɵɵelementStart(1, "td", 167)(2, "input", 168);
    i0.ɵɵlistener("change", function PropertiesPage_section_181_div_11_ng_template_3_Template_input_change_2_listener() { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.toggleSelect(row_r12.id)); })("click", function PropertiesPage_section_181_div_11_ng_template_3_Template_input_click_2_listener($event) { i0.ɵɵrestoreView(_r11); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "td", 169)(4, "div", 170);
    i0.ɵɵelement(5, "i", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 171)(7, "span", 172);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 173);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "td")(12, "span", 174);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵtemplate(15, PropertiesPage_section_181_div_11_ng_template_3_span_15_Template, 3, 6, "span", 175)(16, PropertiesPage_section_181_div_11_ng_template_3_span_16_Template, 2, 0, "span", 176);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td");
    i0.ɵɵelement(18, "p-tag", 177);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td")(20, "span", 178);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "td")(23, "div", 179);
    i0.ɵɵtemplate(24, PropertiesPage_section_181_div_11_ng_template_3_span_24_Template, 3, 1, "span", 180)(25, PropertiesPage_section_181_div_11_ng_template_3_span_25_Template, 3, 1, "span", 181)(26, PropertiesPage_section_181_div_11_ng_template_3_span_26_Template, 4, 4, "span", 182);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "td")(28, "span", 183);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "td", 184)(31, "div", 185)(32, "button", 186);
    i0.ɵɵlistener("click", function PropertiesPage_section_181_div_11_ng_template_3_Template_button_click_32_listener($event) { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); ctx_r2.onEdit(row_r12); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(33, "i", 187);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "button", 188);
    i0.ɵɵlistener("click", function PropertiesPage_section_181_div_11_ng_template_3_Template_button_click_34_listener($event) { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); ctx_r2.onDelete(row_r12); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(35, "i", 135);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const row_r12 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("row-selected", ctx_r2.isSelected(row_r12.id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", ctx_r2.isSelected(row_r12.id));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(row_r12.address);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", row_r12.city, "", row_r12.province ? ", " + row_r12.province : "");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r12.mlsNumber || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", row_r12.listPrice);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !row_r12.listPrice);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", row_r12.status)("severity", ctx_r2.statusSeverity(row_r12.status));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.formatPropertyType(row_r12.propertyType));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", row_r12.bedrooms);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r12.bathrooms);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r12.squareFeet);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r12.ownerName || "\u2014");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
} }
function PropertiesPage_section_181_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 146)(1, "p-table", 147);
    i0.ɵɵtemplate(2, PropertiesPage_section_181_div_11_ng_template_2_Template, 25, 1, "ng-template", 148)(3, PropertiesPage_section_181_div_11_ng_template_3_Template, 36, 18, "ng-template", 149);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p-paginator", 150);
    i0.ɵɵlistener("onPageChange", function PropertiesPage_section_181_div_11_Template_p_paginator_onPageChange_4_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onPageChange($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.properties());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("rows", ctx_r2.rows)("totalRecords", ctx_r2.total())("first", ctx_r2.pageIndex * ctx_r2.rows)("rowsPerPageOptions", i0.ɵɵpureFunction0(5, _c3));
} }
function PropertiesPage_section_181_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 123)(1, "div", 124)(2, "header", 125)(3, "div", 126)(4, "h2");
    i0.ɵɵtext(5, "Property Listings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 127);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, PropertiesPage_section_181_div_8_Template, 18, 1, "div", 128);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, PropertiesPage_section_181_div_9_Template, 2, 2, "div", 129)(10, PropertiesPage_section_181_div_10_Template, 12, 0, "div", 130)(11, PropertiesPage_section_181_div_11_Template, 5, 6, "div", 131);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate2(" ", ctx_r2.properties().length, " of ", ctx_r2.total(), " records ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.hasSelection());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.loading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.loading() && !ctx_r2.properties().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.loading() && ctx_r2.properties().length);
} }
function PropertiesPage_section_182_div_6_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 201);
    i0.ɵɵelement(1, "div", 202);
    i0.ɵɵelementStart(2, "div", 203);
    i0.ɵɵelement(3, "div", 204)(4, "div", 205)(5, "div", 206);
    i0.ɵɵelementEnd()();
} }
function PropertiesPage_section_182_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 199);
    i0.ɵɵtemplate(1, PropertiesPage_section_182_div_6_div_1_Template, 6, 0, "div", 200);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c4));
} }
function PropertiesPage_section_182_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 144)(1, "div", 145);
    i0.ɵɵelement(2, "i", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "No properties found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Try adjusting your search or filters");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 28);
    i0.ɵɵlistener("click", function PropertiesPage_section_182_div_7_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r13); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.resetFilters()); });
    i0.ɵɵelementStart(8, "span", 26);
    i0.ɵɵelement(9, "i", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11, "Reset Filters");
    i0.ɵɵelementEnd()()();
} }
function PropertiesPage_section_182_div_8_div_1_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 228);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "currency");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(2, 1, prop_r15.listPrice, prop_r15.currency, "symbol", "1.0-0"), " ");
} }
function PropertiesPage_section_182_div_8_div_1_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 229);
    i0.ɵɵelement(1, "i", 85);
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " Beds ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(prop_r15.bedrooms);
} }
function PropertiesPage_section_182_div_8_div_1_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 229);
    i0.ɵɵelement(1, "i", 192);
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " Baths ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(prop_r15.bathrooms);
} }
function PropertiesPage_section_182_div_8_div_1_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 229);
    i0.ɵɵelement(1, "i", 194);
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " sqft ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 1, prop_r15.squareFeet, "1.0-0"));
} }
function PropertiesPage_section_182_div_8_div_1_span_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 230);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("MLS# ", prop_r15.mlsNumber);
} }
function PropertiesPage_section_182_div_8_div_1_span_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 231);
    i0.ɵɵelement(1, "i", 232);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", prop_r15.ownerName, " ");
} }
function PropertiesPage_section_182_div_8_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 208);
    i0.ɵɵlistener("click", function PropertiesPage_section_182_div_8_div_1_Template_div_click_0_listener($event) { const prop_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.onRowClick(prop_r15, $event)); });
    i0.ɵɵelementStart(1, "div", 209);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 210)(4, "div", 211);
    i0.ɵɵelement(5, "i", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, PropertiesPage_section_182_div_8_div_1_div_6_Template, 3, 6, "div", 212);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 213)(8, "h3", 214);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 215);
    i0.ɵɵelement(11, "i", 216);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 217);
    i0.ɵɵtemplate(14, PropertiesPage_section_182_div_8_div_1_span_14_Template, 5, 1, "span", 218)(15, PropertiesPage_section_182_div_8_div_1_span_15_Template, 5, 1, "span", 218)(16, PropertiesPage_section_182_div_8_div_1_span_16_Template, 6, 4, "span", 218);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 219)(18, "span", 220);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, PropertiesPage_section_182_div_8_div_1_span_20_Template, 2, 1, "span", 221);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 222);
    i0.ɵɵtemplate(22, PropertiesPage_section_182_div_8_div_1_span_22_Template, 3, 1, "span", 223);
    i0.ɵɵelementStart(23, "div", 224)(24, "button", 186);
    i0.ɵɵlistener("click", function PropertiesPage_section_182_div_8_div_1_Template_button_click_24_listener($event) { const prop_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.onEdit(prop_r15)); });
    i0.ɵɵelement(25, "i", 187);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "button", 225);
    i0.ɵɵlistener("click", function PropertiesPage_section_182_div_8_div_1_Template_button_click_26_listener($event) { const prop_r15 = i0.ɵɵrestoreView(_r14).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.onRowClick(prop_r15, $event)); });
    i0.ɵɵelement(27, "i", 226);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelement(28, "div", 227);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r15 = ctx.$implicit;
    const i_r16 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵstyleProp("animation-delay", i_r16 * 0.04 + "s");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", "linear-gradient(135deg, " + ctx_r2.statusColor(prop_r15.status) + " 0%, " + ctx_r2.statusColor(prop_r15.status) + "cc 100%)");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", prop_r15.status, " ");
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("background", ctx_r2.propertyCardBackground(prop_r15));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("card-photo-icon--thumbnail", ctx_r2.getPrimaryPhotoUrl(prop_r15));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", prop_r15.listPrice);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(prop_r15.address);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", prop_r15.city, "", prop_r15.province ? ", " + prop_r15.province : "", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", prop_r15.bedrooms);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r15.bathrooms);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r15.squareFeet);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.formatPropertyType(prop_r15.propertyType));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r15.mlsNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", prop_r15.ownerName);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
    i0.ɵɵadvance(4);
    i0.ɵɵstyleProp("background", "radial-gradient(circle at 80% 20%, " + ctx_r2.statusColor(prop_r15.status) + "18 0%, transparent 60%)");
} }
function PropertiesPage_section_182_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 199);
    i0.ɵɵtemplate(1, PropertiesPage_section_182_div_8_div_1_Template, 29, 22, "div", 207);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.properties());
} }
function PropertiesPage_section_182_p_paginator_9_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-paginator", 150);
    i0.ɵɵlistener("onPageChange", function PropertiesPage_section_182_p_paginator_9_Template_p_paginator_onPageChange_0_listener($event) { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onPageChange($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("rows", ctx_r2.rows)("totalRecords", ctx_r2.total())("first", ctx_r2.pageIndex * ctx_r2.rows)("rowsPerPageOptions", i0.ɵɵpureFunction0(4, _c3));
} }
function PropertiesPage_section_182_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 195)(1, "div", 196)(2, "h2");
    i0.ɵɵtext(3, "Property Listings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 127);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, PropertiesPage_section_182_div_6_Template, 2, 2, "div", 197)(7, PropertiesPage_section_182_div_7_Template, 12, 0, "div", 130)(8, PropertiesPage_section_182_div_8_Template, 2, 1, "div", 197)(9, PropertiesPage_section_182_p_paginator_9_Template, 1, 5, "p-paginator", 198);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r2.properties().length, " of ", ctx_r2.total(), " records");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.loading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.loading() && !ctx_r2.properties().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.loading() && ctx_r2.properties().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.loading() && ctx_r2.properties().length);
} }
function PropertiesPage_section_183_div_1_div_7_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 259);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "currency");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(2, 1, prop_r19.listPrice, prop_r19.currency, "symbol", "1.0-0"), " ");
} }
function PropertiesPage_section_183_div_1_div_7_span_14_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 85);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", prop_r19.bedrooms);
} }
function PropertiesPage_section_183_div_1_div_7_span_14_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 192);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r19 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", prop_r19.bathrooms);
} }
function PropertiesPage_section_183_div_1_div_7_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 260);
    i0.ɵɵtemplate(1, PropertiesPage_section_183_div_1_div_7_span_14_span_1_Template, 3, 1, "span", 176)(2, PropertiesPage_section_183_div_1_div_7_span_14_span_2_Template, 3, 1, "span", 176);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r19.bedrooms);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r19.bathrooms);
} }
function PropertiesPage_section_183_div_1_div_7_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 261);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("MLS# ", prop_r19.mlsNumber);
} }
function PropertiesPage_section_183_div_1_div_7_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 262);
    i0.ɵɵelement(1, "i", 232);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r19 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", prop_r19.ownerName, " ");
} }
function PropertiesPage_section_183_div_1_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 242);
    i0.ɵɵlistener("click", function PropertiesPage_section_183_div_1_div_7_Template_div_click_0_listener($event) { const prop_r19 = i0.ɵɵrestoreView(_r18).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.onRowClick(prop_r19, $event)); });
    i0.ɵɵelementStart(1, "div", 243)(2, "div", 244);
    i0.ɵɵelement(3, "i", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 245)(5, "span", 246);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 247);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 248);
    i0.ɵɵtemplate(10, PropertiesPage_section_183_div_1_div_7_div_10_Template, 3, 6, "div", 249);
    i0.ɵɵelementStart(11, "div", 250)(12, "span", 251);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, PropertiesPage_section_183_div_1_div_7_span_14_Template, 3, 2, "span", 252);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, PropertiesPage_section_183_div_1_div_7_div_15_Template, 2, 1, "div", 253);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 254);
    i0.ɵɵtemplate(17, PropertiesPage_section_183_div_1_div_7_span_17_Template, 3, 1, "span", 255);
    i0.ɵɵelementStart(18, "div", 256)(19, "button", 257);
    i0.ɵɵlistener("click", function PropertiesPage_section_183_div_1_div_7_Template_button_click_19_listener($event) { const prop_r19 = i0.ɵɵrestoreView(_r18).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.onEdit(prop_r19)); });
    i0.ɵɵelement(20, "i", 187);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 258);
    i0.ɵɵlistener("click", function PropertiesPage_section_183_div_1_div_7_Template_button_click_21_listener($event) { const prop_r19 = i0.ɵɵrestoreView(_r18).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.onDelete(prop_r19)); });
    i0.ɵɵelement(22, "i", 135);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const prop_r19 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("background", ctx_r2.propertyAvatarBackground(prop_r19));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(prop_r19.address);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", prop_r19.city, "", prop_r19.province ? ", " + prop_r19.province : "");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", prop_r19.listPrice);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.formatPropertyType(prop_r19.propertyType));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r19.bedrooms || prop_r19.bathrooms);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r19.mlsNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", prop_r19.ownerName);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
} }
function PropertiesPage_section_183_div_1_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 263);
    i0.ɵɵelement(1, "i", 264);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No properties");
    i0.ɵɵelementEnd()();
} }
function PropertiesPage_section_183_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 235)(1, "div", 236)(2, "span", 237);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 238);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 239);
    i0.ɵɵtemplate(7, PropertiesPage_section_183_div_1_div_7_Template, 23, 12, "div", 240)(8, PropertiesPage_section_183_div_1_div_8_Template, 4, 0, "div", 241);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const status_r20 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("border-color", ctx_r2.statusColor(status_r20));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(status_r20);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.getPropertiesByStatus(status_r20).length);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.getPropertiesByStatus(status_r20));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.getPropertiesByStatus(status_r20).length);
} }
function PropertiesPage_section_183_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 233);
    i0.ɵɵtemplate(1, PropertiesPage_section_183_div_1_Template, 9, 6, "div", 234);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.kanbanStatuses);
} }
function PropertiesPage_section_184_div_1_div_1_div_8_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 283);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "currency");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r22 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(2, 1, prop_r22.listPrice, prop_r22.currency, "symbol", "1.0-0"));
} }
function PropertiesPage_section_184_div_1_div_1_div_8_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 85);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r22 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", prop_r22.bedrooms, " bed");
} }
function PropertiesPage_section_184_div_1_div_1_div_8_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 192);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r22 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", prop_r22.bathrooms, " bath");
} }
function PropertiesPage_section_184_div_1_div_1_div_8_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const prop_r22 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(2, 1, prop_r22.squareFeet, "1.0-0"), " sqft");
} }
function PropertiesPage_section_184_div_1_div_1_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 275);
    i0.ɵɵlistener("click", function PropertiesPage_section_184_div_1_div_1_div_8_Template_div_click_0_listener($event) { const prop_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.onRowClick(prop_r22, $event)); });
    i0.ɵɵelementStart(1, "div", 276)(2, "div", 277);
    i0.ɵɵelement(3, "i", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "p-tag", 278);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong", 279);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, PropertiesPage_section_184_div_1_div_1_div_8_span_7_Template, 3, 6, "span", 280);
    i0.ɵɵelementStart(8, "div", 281);
    i0.ɵɵtemplate(9, PropertiesPage_section_184_div_1_div_1_div_8_span_9_Template, 3, 1, "span", 176)(10, PropertiesPage_section_184_div_1_div_1_div_8_span_10_Template, 3, 1, "span", 176)(11, PropertiesPage_section_184_div_1_div_1_div_8_span_11_Template, 3, 4, "span", 176);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 282);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const prop_r22 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("background", ctx_r2.propertyAvatarBackground(prop_r22));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", prop_r22.status)("severity", ctx_r2.statusSeverity(prop_r22.status))("rounded", true);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(prop_r22.address);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r22.listPrice);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", prop_r22.bedrooms);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r22.bathrooms);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", prop_r22.squareFeet);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatPropertyType(prop_r22.propertyType));
} }
function PropertiesPage_section_184_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 269)(1, "div", 270);
    i0.ɵɵelement(2, "i", 216);
    i0.ɵɵelementStart(3, "h3", 271);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 272);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 273);
    i0.ɵɵtemplate(8, PropertiesPage_section_184_div_1_div_1_div_8_Template, 14, 11, "div", 274);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const hood_r23 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(hood_r23.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", hood_r23.items.length, " ", hood_r23.items.length === 1 ? "property" : "properties");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", hood_r23.items);
} }
function PropertiesPage_section_184_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 267);
    i0.ɵɵtemplate(1, PropertiesPage_section_184_div_1_div_1_Template, 9, 4, "div", 268);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.mapNeighborhoods());
} }
function PropertiesPage_section_184_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 144);
    i0.ɵɵelement(1, "i", 284);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No properties to display on map.");
    i0.ɵɵelementEnd()();
} }
function PropertiesPage_section_184_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 265);
    i0.ɵɵtemplate(1, PropertiesPage_section_184_div_1_Template, 2, 1, "div", 266)(2, PropertiesPage_section_184_ng_template_2_Template, 4, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const noMapData_r24 = i0.ɵɵreference(3);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.mapNeighborhoods().length)("ngIfElse", noMapData_r24);
} }
function PropertiesPage_div_190_div_1_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const feed_r26 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Last sync: ", i0.ɵɵpipeBind2(2, 1, feed_r26.lastSyncAtUtc, "MMM d h:mm a"));
} }
function PropertiesPage_div_190_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 287)(1, "div", 288)(2, "strong", 289);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 290);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 291)(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, PropertiesPage_div_190_div_1_span_11_Template, 3, 4, "span", 176);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 292);
    i0.ɵɵelement(13, "p-tag", 293);
    i0.ɵɵelementStart(14, "button", 294);
    i0.ɵɵlistener("click", function PropertiesPage_div_190_div_1_Template_button_click_14_listener() { const feed_r26 = i0.ɵɵrestoreView(_r25).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.triggerMlsImport(feed_r26.id)); });
    i0.ɵɵelementStart(15, "span", 26);
    i0.ɵɵelement(16, "i", 295);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18, "Import");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const feed_r26 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(feed_r26.feedName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(feed_r26.feedUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Provider: ", feed_r26.provider);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Imported: ", feed_r26.totalImported);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", feed_r26.lastSyncAtUtc);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", feed_r26.status)("severity", ctx_r2.mlsFeedStatusSeverity(feed_r26.status))("rounded", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.mlsImporting() || feed_r26.status === "Error");
} }
function PropertiesPage_div_190_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 285);
    i0.ɵɵtemplate(1, PropertiesPage_div_190_div_1_Template, 19, 9, "div", 286);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.mlsFeeds());
} }
function PropertiesPage_ng_template_191_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 296);
    i0.ɵɵtext(1, "No MLS feeds configured.");
    i0.ɵɵelementEnd();
} }
function PropertiesPage_div_196_div_1_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 307);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const job_r27 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", job_r27.errors, " errors");
} }
function PropertiesPage_div_196_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 299)(1, "div", 300)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 301);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 302)(8, "span", 303);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 304);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 305);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, PropertiesPage_div_196_div_1_span_14_Template, 2, 1, "span", 306);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "p-tag", 293);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const job_r27 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(job_r27.feedName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 9, job_r27.startedAtUtc, "MMM d, yyyy h:mm a"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", job_r27.imported, " new");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", job_r27.updated, " updated");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", job_r27.skipped, " skipped");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", job_r27.errors);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", job_r27.status)("severity", ctx_r2.mlsJobStatusSeverity(job_r27.status))("rounded", true);
} }
function PropertiesPage_div_196_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 297);
    i0.ɵɵtemplate(1, PropertiesPage_div_196_div_1_Template, 16, 12, "div", 298);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.mlsImportHistory());
} }
function PropertiesPage_ng_template_197_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 93);
    i0.ɵɵlistener("click", function PropertiesPage_ng_template_197_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r28); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.showMlsDialog.set(false)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "Close");
    i0.ɵɵelementEnd()();
} }
function PropertiesPage_ng_template_209_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 308);
    i0.ɵɵelement(1, "i", 77);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r29 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r29.label);
} }
function PropertiesPage_ng_template_210_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 308);
    i0.ɵɵelement(1, "i", 77);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r30 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r30.label);
} }
function PropertiesPage_ng_template_210_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, PropertiesPage_ng_template_210_div_0_Template, 4, 1, "div", 309);
} if (rf & 2) {
    const option_r30 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r30);
} }
function PropertiesPage_ng_template_211_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 93);
    i0.ɵɵlistener("click", function PropertiesPage_ng_template_211_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r31); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.showBulkStatusDialog.set(false)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2, "Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "button", 310);
    i0.ɵɵlistener("click", function PropertiesPage_ng_template_211_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r31); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.bulkChangeStatus()); });
    i0.ɵɵelementStart(4, "span", 26);
    i0.ɵɵelement(5, "i", 311);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Apply");
    i0.ɵɵelementEnd()();
} }
export class PropertiesPage {
    propertyData;
    router;
    toastService;
    confirmationService;
    statusOptions = [
        { label: 'All', value: 'all' },
        { label: 'Draft', value: 'Draft' },
        { label: 'Active', value: 'Active' },
        { label: 'Conditional', value: 'Conditional' },
        { label: 'Sold', value: 'Sold' },
        { label: 'Terminated', value: 'Terminated' },
        { label: 'Expired', value: 'Expired' },
        { label: 'Delisted', value: 'Delisted' }
    ];
    typeOptions = [
        { label: 'All Types', value: 'all' },
        { label: 'Detached', value: 'Detached' },
        { label: 'Semi-Detached', value: 'SemiDetached' },
        { label: 'Townhouse', value: 'Townhouse' },
        { label: 'Condo', value: 'Condo' },
        { label: 'Duplex', value: 'Duplex' },
        { label: 'Triplex', value: 'Triplex' },
        { label: 'Bungalow', value: 'Bungalow' },
        { label: 'Cottage', value: 'Cottage' },
        { label: 'Commercial', value: 'Commercial' },
        { label: 'Land', value: 'Land' },
        { label: 'Multi-Family', value: 'MultiFamily' },
        { label: 'Other', value: 'Other' }
    ];
    properties = signal([], ...(ngDevMode ? [{ debugName: "properties" }] : []));
    total = signal(0, ...(ngDevMode ? [{ debugName: "total" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    canManage = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.propertiesManage);
    }, ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    metrics = computed(() => {
        const rows = this.properties();
        const active = rows.filter(p => p.status === 'Active').length;
        const conditional = rows.filter(p => p.status === 'Conditional').length;
        const sold = rows.filter(p => p.status === 'Sold').length;
        const draft = rows.filter(p => p.status === 'Draft').length;
        return { total: this.total(), active, conditional, sold, draft };
    }, ...(ngDevMode ? [{ debugName: "metrics" }] : []));
    searchTerm = '';
    statusFilter = 'all';
    typeFilter = 'all';
    pageIndex = 0;
    rows = 10;
    viewMode = 'table';
    Math = Math;
    /* ── Bulk Operations (X11) ── */
    selectedIds = signal(new Set(), ...(ngDevMode ? [{ debugName: "selectedIds" }] : []));
    hasSelection = computed(() => this.selectedIds().size > 0, ...(ngDevMode ? [{ debugName: "hasSelection" }] : []));
    selectionCount = computed(() => this.selectedIds().size, ...(ngDevMode ? [{ debugName: "selectionCount" }] : []));
    isAllSelected = computed(() => {
        const rows = this.properties();
        return rows.length > 0 && this.selectedIds().size === rows.length;
    }, ...(ngDevMode ? [{ debugName: "isAllSelected" }] : []));
    showBulkStatusDialog = signal(false, ...(ngDevMode ? [{ debugName: "showBulkStatusDialog" }] : []));
    bulkStatus = 'Active';
    bulkStatusOptions = [
        { label: 'Draft', value: 'Draft' },
        { label: 'Active', value: 'Active' },
        { label: 'Conditional', value: 'Conditional' },
        { label: 'Sold', value: 'Sold' },
        { label: 'Terminated', value: 'Terminated' },
        { label: 'Expired', value: 'Expired' },
        { label: 'Delisted', value: 'Delisted' }
    ];
    kanbanStatuses = [
        'Draft', 'Active', 'Conditional', 'Sold', 'Terminated', 'Expired', 'Delisted'
    ];
    constructor(propertyData, router, toastService, confirmationService) {
        this.propertyData = propertyData;
        this.router = router;
        this.toastService = toastService;
        this.confirmationService = confirmationService;
        const toast = history.state?.toast;
        if (toast)
            this.toastService.show(toast.tone, toast.message, 3000);
        this.load();
    }
    load() {
        this.loading.set(true);
        const status = this.statusFilter === 'all' ? undefined : this.statusFilter;
        const propertyType = this.typeFilter === 'all' ? undefined : this.typeFilter;
        this.propertyData
            .search({
            search: this.searchTerm || undefined,
            status,
            propertyType,
            page: this.pageIndex + 1,
            pageSize: this.rows
        })
            .subscribe((res) => {
            this.properties.set(res.items);
            this.total.set(res.total);
            this.loading.set(false);
        });
    }
    onCreate() {
        this.router.navigate(['/app/properties/new']);
    }
    onEdit(row) {
        this.router.navigate(['/app/properties', row.id, 'edit']);
    }
    onRowClick(row, event) {
        const target = event.target;
        if (target.closest('button, a, p-select, .p-select, .row-actions'))
            return;
        this.router.navigate(['/app/properties', row.id]);
    }
    onDelete(row) {
        this.confirmationService.confirm({
            message: `Delete property at ${row.address}?`,
            header: 'Delete Property',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Delete',
            rejectLabel: 'Cancel',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.propertyData.delete(row.id).subscribe({
                    next: () => { this.load(); this.toastService.show('success', 'Property deleted.', 3000); },
                    error: () => this.toastService.show('error', 'Unable to delete property.', 3000)
                });
            }
        });
    }
    onSearch(term) {
        this.searchTerm = term;
        this.pageIndex = 0;
        this.load();
    }
    onStatusChange(value) {
        this.statusFilter = value;
        this.pageIndex = 0;
        this.load();
    }
    onTypeChange(value) {
        this.typeFilter = value;
        this.pageIndex = 0;
        this.load();
    }
    onPageChange(event) {
        this.pageIndex = event.page ?? 0;
        this.rows = event.rows ?? 10;
        this.load();
    }
    resetFilters() {
        this.statusFilter = 'all';
        this.typeFilter = 'all';
        this.searchTerm = '';
        this.pageIndex = 0;
        this.load();
    }
    onExport() {
        const rows = this.properties();
        const columns = [
            { header: 'MLS #', value: r => r.mlsNumber ?? '' },
            { header: 'Address', value: r => r.address },
            { header: 'City', value: r => r.city ?? '' },
            { header: 'Province', value: r => r.province ?? '' },
            { header: 'List Price', value: r => r.listPrice?.toString() ?? '' },
            { header: 'Status', value: r => r.status },
            { header: 'Type', value: r => r.propertyType },
            { header: 'Beds', value: r => r.bedrooms?.toString() ?? '' },
            { header: 'Baths', value: r => r.bathrooms?.toString() ?? '' },
            { header: 'Sq Ft', value: r => r.squareFeet?.toString() ?? '' },
            { header: 'Owner', value: r => r.ownerName ?? '' }
        ];
        exportToCsv(rows, columns, 'properties.csv');
    }
    statusSeverity(status) {
        switch (status) {
            case 'Active': return 'success';
            case 'Conditional': return 'warn';
            case 'Sold': return 'info';
            case 'Draft': return 'secondary';
            case 'Terminated': return 'danger';
            case 'Expired': return 'danger';
            case 'Delisted': return 'contrast';
            default: return 'secondary';
        }
    }
    formatPropertyType(type) {
        switch (type) {
            case 'SemiDetached': return 'Semi-Detached';
            case 'MultiFamily': return 'Multi-Family';
            default: return type;
        }
    }
    getPrimaryPhotoUrl(property) {
        const raw = property.photoUrls?.trim();
        if (!raw) {
            return null;
        }
        const first = raw
            .split(/\r?\n|,/)
            .map((item) => item.trim())
            .find((item) => item.length > 0);
        return first || null;
    }
    propertyCardBackground(property) {
        const status = this.statusColor(property.status);
        const photo = this.getPrimaryPhotoUrl(property);
        if (!photo) {
            return `linear-gradient(135deg, ${status} 0%, ${status}b3 50%, ${status}80 100%)`;
        }
        return `linear-gradient(180deg, rgba(15, 23, 42, 0.10) 0%, rgba(15, 23, 42, 0.18) 45%, rgba(15, 23, 42, 0.52) 100%), url('${photo}') center/cover no-repeat`;
    }
    propertyAvatarBackground(property) {
        const photo = this.getPrimaryPhotoUrl(property);
        if (!photo) {
            const status = this.statusColor(property.status);
            return `linear-gradient(135deg, ${status} 0%, ${status}cc 100%)`;
        }
        return `linear-gradient(180deg, rgba(15, 23, 42, 0.10) 0%, rgba(15, 23, 42, 0.45) 100%), url('${photo}') center/cover no-repeat`;
    }
    /* ── Bulk selection helpers (X11) ── */
    toggleSelect(id) {
        const s = new Set(this.selectedIds());
        s.has(id) ? s.delete(id) : s.add(id);
        this.selectedIds.set(s);
    }
    toggleSelectAll() {
        if (this.isAllSelected()) {
            this.selectedIds.set(new Set());
        }
        else {
            this.selectedIds.set(new Set(this.properties().map(p => p.id)));
        }
    }
    isSelected(id) {
        return this.selectedIds().has(id);
    }
    clearSelection() {
        this.selectedIds.set(new Set());
    }
    bulkDelete() {
        const count = this.selectedIds().size;
        if (!count)
            return;
        this.confirmationService.confirm({
            message: `Delete ${count} selected properties?`,
            header: 'Delete Properties',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Delete',
            rejectLabel: 'Cancel',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                const obs = Array.from(this.selectedIds()).map(id => this.propertyData.delete(id));
                forkJoin(obs).subscribe({
                    next: () => {
                        this.selectedIds.set(new Set());
                        this.load();
                        this.toastService.show('success', `${count} properties deleted.`, 3000);
                    },
                    error: () => {
                        this.selectedIds.set(new Set());
                        this.load();
                        this.toastService.show('error', 'Some properties could not be deleted.', 3000);
                    }
                });
            }
        });
    }
    bulkChangeStatus() {
        const ids = Array.from(this.selectedIds());
        const obs = ids.map(id => {
            return this.propertyData.getById(id).pipe(switchMap((prop) => this.propertyData.update(id, { ...prop, status: this.bulkStatus })));
        });
        forkJoin(obs).subscribe({
            next: () => {
                this.selectedIds.set(new Set());
                this.showBulkStatusDialog.set(false);
                this.load();
                this.toastService.show('success', `${ids.length} properties updated.`, 3000);
            },
            error: () => {
                this.selectedIds.set(new Set());
                this.showBulkStatusDialog.set(false);
                this.load();
                this.toastService.show('error', 'Some properties could not be updated.', 3000);
            }
        });
    }
    getPropertiesByStatus(status) {
        return this.properties().filter(p => p.status === status);
    }
    statusColor(status) {
        switch (status) {
            case 'Active': return '#22c55e';
            case 'Conditional': return '#f59e0b';
            case 'Sold': return '#3b82f6';
            case 'Draft': return '#9ca3af';
            case 'Terminated': return '#ef4444';
            case 'Expired': return '#f97316';
            case 'Delisted': return '#6b7280';
            default: return '#9ca3af';
        }
    }
    /* ── MLS / IDX Feed Integration (G1) ── */
    mlsFeeds = signal([], ...(ngDevMode ? [{ debugName: "mlsFeeds" }] : []));
    mlsImportHistory = signal([], ...(ngDevMode ? [{ debugName: "mlsImportHistory" }] : []));
    showMlsDialog = signal(false, ...(ngDevMode ? [{ debugName: "showMlsDialog" }] : []));
    mlsImporting = signal(false, ...(ngDevMode ? [{ debugName: "mlsImporting" }] : []));
    mapNeighborhoods = computed(() => {
        const groups = new Map();
        for (const p of this.properties()) {
            const key = p.neighborhood || p.city || 'Other';
            if (!groups.has(key))
                groups.set(key, []);
            groups.get(key).push(p);
        }
        return Array.from(groups.entries()).map(([name, items]) => ({ name, items }));
    }, ...(ngDevMode ? [{ debugName: "mapNeighborhoods" }] : []));
    onShowMlsDialog() {
        this.showMlsDialog.set(true);
        this.propertyData.getMlsFeeds().subscribe({ next: (d) => this.mlsFeeds.set(d) });
        this.propertyData.getMlsImportHistory().subscribe({ next: (d) => this.mlsImportHistory.set(d) });
    }
    triggerMlsImport(feedId) {
        this.mlsImporting.set(true);
        this.propertyData.triggerMlsImport(feedId).subscribe({
            next: () => {
                this.mlsImporting.set(false);
                this.toastService.show('success', 'MLS import started.', 3000);
                this.propertyData.getMlsImportHistory().subscribe({ next: (d) => this.mlsImportHistory.set(d) });
            },
            error: () => this.mlsImporting.set(false)
        });
    }
    mlsFeedStatusSeverity(status) {
        switch (status) {
            case 'Active': return 'success';
            case 'Paused': return 'warn';
            case 'Error': return 'danger';
            default: return 'secondary';
        }
    }
    mlsJobStatusSeverity(status) {
        switch (status) {
            case 'Completed': return 'success';
            case 'Running': return 'info';
            case 'Failed': return 'danger';
            default: return 'secondary';
        }
    }
    static ɵfac = function PropertiesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PropertiesPage)(i0.ɵɵdirectiveInject(i1.PropertyDataService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.AppToastService), i0.ɵɵdirectiveInject(i4.ConfirmationService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PropertiesPage, selectors: [["app-properties-page"]], features: [i0.ɵɵProvidersFeature([ConfirmationService])], decls: 213, vars: 56, consts: [["noMlsFeeds", ""], ["noMapData", ""], [1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-stats"], [1, "hero-stat"], [1, "stat-value"], [1, "stat-label"], [1, "stat-bar"], [1, "stat-bar-fill", 2, "width", "100%"], [1, "stat-bar-fill", "stat-bar-fill--leads"], [1, "stat-bar-fill", "stat-bar-fill--prospects"], [1, "stat-bar-fill", "stat-bar-fill--success"], [1, "hero-actions"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "action-btn__icon"], [1, "pi", "pi-plus"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click"], [1, "pi", "pi-refresh"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-home"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend", "card-trend--up"], [1, "pi", "pi-arrow-up"], [1, "card-glow"], [1, "visual-card", "visual-card--success"], [1, "pi", "pi-check-circle"], [1, "card-trend"], [1, "pi", "pi-dollar"], [1, "metrics-section"], [1, "metric-card", "metric-card--total"], [1, "metric-icon"], [1, "pi", "pi-database"], [1, "metric-content"], [1, "metric-label"], [1, "metric-value"], [1, "metric-chart"], ["viewBox", "0 0 100 40", 1, "sparkline"], ["d", "M0,35 Q25,30 50,20 T100,15", "fill", "none", "stroke", "url(#gradient-prop)", "stroke-width", "2"], ["id", "gradient-prop", "x1", "0%", "y1", "0%", "x2", "100%", "y2", "0%"], ["offset", "0%", "stop-color", "#667eea"], ["offset", "100%", "stop-color", "#764ba2"], [1, "metric-card", "metric-card--leads"], [1, "metric-ring"], ["viewBox", "0 0 36 36"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-bg"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--cyan"], [1, "metric-card", "metric-card--prospects"], [1, "pi", "pi-clock"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--purple"], [1, "metric-card", "metric-card--customers"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--green"], [1, "metric-card", "metric-card--new"], [1, "pi", "pi-file-edit"], [1, "metric-badge"], [1, "filter-section"], [1, "filter-bar"], [1, "search-wrapper"], [1, "pi", "pi-search", "search-icon"], ["pInputText", "", "type", "search", "placeholder", "Search by address, MLS #, city...", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "filter-pills"], [1, "filter-pill"], [1, "pi", "pi-tag"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Status", "styleClass", "filter-select", 3, "ngModelChange", "options", "ngModel"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Type", "styleClass", "filter-select", 3, "ngModelChange", "options", "ngModel"], [1, "filter-actions"], [1, "view-toggle"], ["type", "button", "title", "Table View", "aria-label", "Switch to table view", 1, "toggle-btn", 3, "click"], [1, "pi", "pi-list"], ["type", "button", "title", "Card View", "aria-label", "Switch to card view", 1, "toggle-btn", 3, "click"], [1, "pi", "pi-th-large"], ["type", "button", "title", "Board View", "aria-label", "Switch to board view", 1, "toggle-btn", 3, "click"], [1, "pi", "pi-objects-column"], ["type", "button", "title", "Map View", "aria-label", "Switch to map view", 1, "toggle-btn", 3, "click"], [1, "pi", "pi-map"], ["type", "button", "class", "action-btn action-btn--import", 3, "click", 4, "ngIf"], ["type", "button", 1, "action-btn", "action-btn--export", 3, "click"], [1, "pi", "pi-download"], ["type", "button", 1, "action-btn", "action-btn--settings", 3, "click"], [1, "pi", "pi-times"], ["class", "filter-summary", 4, "ngIf"], ["class", "data-section", 4, "ngIf"], ["class", "card-grid-section", 4, "ngIf"], ["class", "kanban-board", 4, "ngIf"], ["class", "map-view", 4, "ngIf"], ["header", "MLS / IDX Feed Management", 3, "visibleChange", "visible", "modal"], [1, "mls-dialog-body"], [1, "mls-section-title"], ["class", "mls-feeds-list", 4, "ngIf", "ngIfElse"], [1, "mls-section-title", "mt-4"], [1, "pi", "pi-history"], ["class", "mls-history", 4, "ngIf"], ["pTemplate", "footer"], ["header", "Change Status", 3, "visibleChange", "visible", "modal"], [1, "dialog-body"], [1, "bulk-dialog-desc"], [1, "form-field"], ["for", "bulk-status"], ["id", "bulk-status", "optionLabel", "label", "optionValue", "value", "placeholder", "Select status", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "options", "ngModel"], ["pTemplate", "item"], ["pTemplate", "selectedItem"], ["type", "button", 1, "action-btn", "action-btn--import", 3, "click"], [1, "pi", "pi-cloud-download"], [1, "filter-summary"], [1, "summary-label"], ["class", "filter-tag", 4, "ngIf"], [1, "filter-tag"], [1, "pi", "pi-times", 3, "click"], [1, "data-section"], [1, "data-card"], [1, "data-header"], [1, "header-title"], [1, "record-count"], ["class", "bulk-toolbar", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "table-wrapper", 4, "ngIf"], [1, "bulk-toolbar"], [1, "bulk-count"], ["type", "button", 1, "action-btn", "action-btn--export", 2, "--btn-gradient", "linear-gradient(135deg, #f87171 0%, #ef4444 100%)", 3, "click"], [1, "pi", "pi-trash"], [1, "loading-state"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton", "skeleton-avatar"], [1, "skeleton", "skeleton-text"], [1, "skeleton", "skeleton-text", "skeleton-short"], [1, "skeleton", "skeleton-badge"], [1, "skeleton", "skeleton-actions"], [1, "empty-state"], [1, "empty-icon"], [1, "table-wrapper"], [1, "crm-table", "data-table", 3, "value"], ["pTemplate", "header"], ["pTemplate", "body"], [3, "onPageChange", "rows", "totalRecords", "first", "rowsPerPageOptions"], [1, "th-checkbox"], ["type", "checkbox", "title", "Select all", 3, "change", "checked"], ["pSortableColumn", "address"], ["field", "address"], ["pSortableColumn", "mlsNumber"], ["field", "mlsNumber"], ["pSortableColumn", "listPrice"], ["field", "listPrice"], ["pSortableColumn", "status"], ["field", "status"], ["pSortableColumn", "propertyType"], ["field", "propertyType"], ["pSortableColumn", "ownerName"], ["field", "ownerName"], [1, "th-actions"], [1, "table-row", 3, "click"], [1, "td-checkbox"], ["type", "checkbox", 3, "change", "click", "checked"], [1, "td-property"], [1, "customer-avatar"], [1, "customer-info"], [1, "customer-name"], [1, "customer-date"], [1, "mls-number"], ["class", "price-value", 4, "ngIf"], [4, "ngIf"], [3, "value", "severity"], [1, "type-label"], [1, "property-details"], ["class", "detail-item", "pTooltip", "Bedrooms", 4, "ngIf"], ["class", "detail-item", "pTooltip", "Bathrooms", 4, "ngIf"], ["class", "detail-item", "pTooltip", "Square Feet", 4, "ngIf"], [1, "owner-name"], [1, "td-actions"], [1, "row-actions"], ["type", "button", "title", "Edit", 1, "row-action-btn", "row-action-btn--edit", 3, "click", "disabled"], [1, "pi", "pi-pencil"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "price-value"], ["pTooltip", "Bedrooms", 1, "detail-item"], ["pTooltip", "Bathrooms", 1, "detail-item"], [1, "pi", "pi-box"], ["pTooltip", "Square Feet", 1, "detail-item"], [1, "pi", "pi-expand"], [1, "card-grid-section"], [1, "card-grid-header"], ["class", "card-grid", 4, "ngIf"], [3, "rows", "totalRecords", "first", "rowsPerPageOptions", "onPageChange", 4, "ngIf"], [1, "card-grid"], ["class", "prop-glass-card prop-glass-card--skeleton", 4, "ngFor", "ngForOf"], [1, "prop-glass-card", "prop-glass-card--skeleton"], [1, "skeleton-photo"], [1, "skeleton-body"], [1, "skeleton", "skeleton-text", 2, "width", "70%"], [1, "skeleton", "skeleton-text", 2, "width", "50%"], [1, "skeleton", "skeleton-text", 2, "width", "40%"], ["class", "prop-glass-card", 3, "animation-delay", "click", 4, "ngFor", "ngForOf"], [1, "prop-glass-card", 3, "click"], [1, "card-ribbon"], [1, "card-photo-area"], [1, "card-photo-icon"], ["class", "card-photo-price", 4, "ngIf"], [1, "card-glass-body"], [1, "card-address"], [1, "card-location"], [1, "pi", "pi-map-marker"], [1, "card-specs"], ["class", "card-spec", 4, "ngIf"], [1, "card-meta-row"], [1, "card-type-badge"], ["class", "card-mls", 4, "ngIf"], [1, "card-glass-footer"], ["class", "card-agent", 4, "ngIf"], [1, "card-footer-actions"], ["type", "button", "title", "View", 1, "row-action-btn", "row-action-btn--view", 3, "click"], [1, "pi", "pi-eye"], [1, "card-ambient-glow"], [1, "card-photo-price"], [1, "card-spec"], [1, "card-mls"], [1, "card-agent"], [1, "pi", "pi-user"], [1, "kanban-board"], ["class", "kanban-column", 4, "ngFor", "ngForOf"], [1, "kanban-column"], [1, "column-header"], [1, "column-title"], [1, "column-count"], [1, "column-body"], ["class", "property-card", 3, "click", 4, "ngFor", "ngForOf"], ["class", "column-empty", 4, "ngIf"], [1, "property-card", 3, "click"], [1, "property-card-header"], [1, "prop-avatar"], [1, "prop-meta"], [1, "prop-address"], [1, "prop-location"], [1, "property-card-body"], ["class", "prop-price", 4, "ngIf"], [1, "prop-details-row"], [1, "prop-type"], ["class", "prop-specs", 4, "ngIf"], ["class", "prop-mls", 4, "ngIf"], [1, "property-card-footer"], ["class", "prop-agent", 4, "ngIf"], [1, "prop-actions"], ["type", "button", "title", "Edit", 1, "mini-action-btn", "mini-action-btn--edit", 3, "click", "disabled"], ["type", "button", "title", "Delete", 1, "mini-action-btn", "mini-action-btn--delete", 3, "click", "disabled"], [1, "prop-price"], [1, "prop-specs"], [1, "prop-mls"], [1, "prop-agent"], [1, "column-empty"], [1, "pi", "pi-inbox"], [1, "map-view"], ["class", "map-neighborhoods", 4, "ngIf", "ngIfElse"], [1, "map-neighborhoods"], ["class", "neighborhood-group", 4, "ngFor", "ngForOf"], [1, "neighborhood-group"], [1, "neighborhood-header"], [1, "neighborhood-name"], [1, "neighborhood-count"], [1, "neighborhood-cards"], ["class", "map-property-card", 3, "click", 4, "ngFor", "ngForOf"], [1, "map-property-card", 3, "click"], [1, "map-card-top"], [1, "map-card-avatar"], [1, "map-card-tag", 3, "value", "severity", "rounded"], [1, "map-card-address"], ["class", "map-card-price", 4, "ngIf"], [1, "map-card-specs"], [1, "map-card-type"], [1, "map-card-price"], [1, "pi", "pi-map", "empty-icon"], [1, "mls-feeds-list"], ["class", "mls-feed-card", 4, "ngFor", "ngForOf"], [1, "mls-feed-card"], [1, "mls-feed-info"], [1, "mls-feed-name"], [1, "mls-feed-url"], [1, "mls-feed-meta"], [1, "mls-feed-actions"], [3, "value", "severity", "rounded"], ["type", "button", 1, "action-btn", "action-btn--import", 3, "click", "disabled"], [1, "pi", "pi-sync"], [1, "mls-empty"], [1, "mls-history"], ["class", "mls-job", 4, "ngFor", "ngForOf"], [1, "mls-job"], [1, "mls-job-info"], [1, "mls-job-date"], [1, "mls-job-stats"], ["title", "Imported"], ["title", "Updated"], ["title", "Skipped"], ["title", "Errors", "class", "mls-job-errors", 4, "ngIf"], ["title", "Errors", 1, "mls-job-errors"], [1, "select-option"], ["class", "select-option", 4, "ngIf"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click"], [1, "pi", "pi-check"]], template: function PropertiesPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2)(1, "div", 3);
            i0.ɵɵelement(2, "div", 4)(3, "div", 5)(4, "div", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 7)(7, "div", 8)(8, "div", 9);
            i0.ɵɵelement(9, "span", 10);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Property Management Hub");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 11)(13, "span", 12);
            i0.ɵɵtext(14, "Property");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 13);
            i0.ɵɵtext(16, "Workspace");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 14);
            i0.ɵɵtext(18, " Track listings, manage inventory, and close deals with real-time property intelligence ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 15)(20, "div", 16)(21, "div", 17);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 18);
            i0.ɵɵtext(24, "Total Properties");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 19);
            i0.ɵɵelement(26, "div", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 16)(28, "div", 17);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 18);
            i0.ɵɵtext(31, "Active Listings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 19);
            i0.ɵɵelement(33, "div", 21);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 16)(35, "div", 17);
            i0.ɵɵtext(36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div", 18);
            i0.ɵɵtext(38, "Conditional");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 19);
            i0.ɵɵelement(40, "div", 22);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "div", 16)(42, "div", 17);
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 18);
            i0.ɵɵtext(45, "Sold");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 19);
            i0.ɵɵelement(47, "div", 23);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(48, "div", 24)(49, "button", 25);
            i0.ɵɵlistener("click", function PropertiesPage_Template_button_click_49_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onCreate()); });
            i0.ɵɵelementStart(50, "span", 26);
            i0.ɵɵelement(51, "i", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "span");
            i0.ɵɵtext(53, "Add Property");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(54, "button", 28);
            i0.ɵɵlistener("click", function PropertiesPage_Template_button_click_54_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.load()); });
            i0.ɵɵelementStart(55, "span", 26);
            i0.ɵɵelement(56, "i", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "span");
            i0.ɵɵtext(58, "Refresh");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(59, "div", 30)(60, "div", 31)(61, "div", 32);
            i0.ɵɵelement(62, "i", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 34)(64, "span", 35);
            i0.ɵɵtext(65, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "strong", 36);
            i0.ɵɵtext(67);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "span", 37);
            i0.ɵɵelement(69, "i", 38);
            i0.ɵɵtext(70, " Listings ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(71, "div", 39);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "div", 40)(73, "div", 32);
            i0.ɵɵelement(74, "i", 41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "div", 34)(76, "span", 35);
            i0.ɵɵtext(77, "Sold");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "strong", 36);
            i0.ɵɵtext(79);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "span", 42);
            i0.ɵɵelement(81, "i", 43);
            i0.ɵɵtext(82, " Closed ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(83, "div", 39);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(84, "section", 44)(85, "div", 45)(86, "div", 46);
            i0.ɵɵelement(87, "i", 47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "div", 48)(89, "span", 49);
            i0.ɵɵtext(90, "Total Properties");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "strong", 50);
            i0.ɵɵtext(92);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(93, "div", 51);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(94, "svg", 52);
            i0.ɵɵelement(95, "path", 53);
            i0.ɵɵelementStart(96, "defs")(97, "linearGradient", 54);
            i0.ɵɵelement(98, "stop", 55)(99, "stop", 56);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(100, "div", 57)(101, "div", 46);
            i0.ɵɵelement(102, "i", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(103, "div", 48)(104, "span", 49);
            i0.ɵɵtext(105, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(106, "strong", 50);
            i0.ɵɵtext(107);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(108, "div", 58);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(109, "svg", 59);
            i0.ɵɵelement(110, "path", 60)(111, "path", 61);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(112, "div", 62)(113, "div", 46);
            i0.ɵɵelement(114, "i", 63);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(115, "div", 48)(116, "span", 49);
            i0.ɵɵtext(117, "Conditional");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(118, "strong", 50);
            i0.ɵɵtext(119);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(120, "div", 58);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(121, "svg", 59);
            i0.ɵɵelement(122, "path", 60)(123, "path", 64);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(124, "div", 65)(125, "div", 46);
            i0.ɵɵelement(126, "i", 41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(127, "div", 48)(128, "span", 49);
            i0.ɵɵtext(129, "Sold");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(130, "strong", 50);
            i0.ɵɵtext(131);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(132, "div", 58);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(133, "svg", 59);
            i0.ɵɵelement(134, "path", 60)(135, "path", 66);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(136, "div", 67)(137, "div", 46);
            i0.ɵɵelement(138, "i", 68);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(139, "div", 48)(140, "span", 49);
            i0.ɵɵtext(141, "Drafts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(142, "strong", 50);
            i0.ɵɵtext(143);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(144, "div", 69)(145, "span");
            i0.ɵɵtext(146, "NEW");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(147, "section", 70)(148, "div", 71)(149, "div", 72);
            i0.ɵɵelement(150, "i", 73);
            i0.ɵɵelementStart(151, "input", 74);
            i0.ɵɵtwoWayListener("ngModelChange", function PropertiesPage_Template_input_ngModelChange_151_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("ngModelChange", function PropertiesPage_Template_input_ngModelChange_151_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSearch($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(152, "div", 75)(153, "div", 76);
            i0.ɵɵelement(154, "i", 77);
            i0.ɵɵelementStart(155, "p-select", 78);
            i0.ɵɵlistener("ngModelChange", function PropertiesPage_Template_p_select_ngModelChange_155_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onStatusChange($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(156, "div", 76);
            i0.ɵɵelement(157, "i", 33);
            i0.ɵɵelementStart(158, "p-select", 79);
            i0.ɵɵlistener("ngModelChange", function PropertiesPage_Template_p_select_ngModelChange_158_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTypeChange($event)); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(159, "div", 80)(160, "div", 81)(161, "button", 82);
            i0.ɵɵlistener("click", function PropertiesPage_Template_button_click_161_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.viewMode = "table"); });
            i0.ɵɵelement(162, "i", 83);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(163, "button", 84);
            i0.ɵɵlistener("click", function PropertiesPage_Template_button_click_163_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.viewMode = "card"); });
            i0.ɵɵelement(164, "i", 85);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(165, "button", 86);
            i0.ɵɵlistener("click", function PropertiesPage_Template_button_click_165_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.viewMode = "kanban"); });
            i0.ɵɵelement(166, "i", 87);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(167, "button", 88);
            i0.ɵɵlistener("click", function PropertiesPage_Template_button_click_167_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.viewMode = "map"); });
            i0.ɵɵelement(168, "i", 89);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(169, PropertiesPage_button_169_Template, 5, 0, "button", 90);
            i0.ɵɵelementStart(170, "button", 91);
            i0.ɵɵlistener("click", function PropertiesPage_Template_button_click_170_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onExport()); });
            i0.ɵɵelementStart(171, "span", 26);
            i0.ɵɵelement(172, "i", 92);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(173, "span");
            i0.ɵɵtext(174, "Export");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(175, "button", 93);
            i0.ɵɵlistener("click", function PropertiesPage_Template_button_click_175_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.resetFilters()); });
            i0.ɵɵelementStart(176, "span", 26);
            i0.ɵɵelement(177, "i", 94);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(178, "span");
            i0.ɵɵtext(179, "Clear");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(180, PropertiesPage_div_180_Template, 6, 3, "div", 95);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(181, PropertiesPage_section_181_Template, 12, 6, "section", 96)(182, PropertiesPage_section_182_Template, 10, 6, "section", 97)(183, PropertiesPage_section_183_Template, 2, 1, "section", 98)(184, PropertiesPage_section_184_Template, 4, 2, "section", 99);
            i0.ɵɵelementStart(185, "p-dialog", 100);
            i0.ɵɵlistener("visibleChange", function PropertiesPage_Template_p_dialog_visibleChange_185_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.showMlsDialog.set($event)); });
            i0.ɵɵelementStart(186, "div", 101)(187, "h3", 102);
            i0.ɵɵelement(188, "i", 47);
            i0.ɵɵtext(189, " Connected Feeds");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(190, PropertiesPage_div_190_Template, 2, 1, "div", 103)(191, PropertiesPage_ng_template_191_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(193, "h3", 104);
            i0.ɵɵelement(194, "i", 105);
            i0.ɵɵtext(195, " Recent Import Jobs");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(196, PropertiesPage_div_196_Template, 2, 1, "div", 106);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(197, PropertiesPage_ng_template_197_Template, 3, 0, "ng-template", 107);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(198, "p-dialog", 108);
            i0.ɵɵlistener("visibleChange", function PropertiesPage_Template_p_dialog_visibleChange_198_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.showBulkStatusDialog.set($event)); });
            i0.ɵɵelementStart(199, "div", 109)(200, "p", 110);
            i0.ɵɵtext(201, "Update ");
            i0.ɵɵelementStart(202, "strong");
            i0.ɵɵtext(203);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(204, " selected properties to:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(205, "div", 111)(206, "label", 112);
            i0.ɵɵtext(207, "New Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(208, "p-select", 113);
            i0.ɵɵtwoWayListener("ngModelChange", function PropertiesPage_Template_p_select_ngModelChange_208_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.bulkStatus, $event) || (ctx.bulkStatus = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtemplate(209, PropertiesPage_ng_template_209_Template, 4, 1, "ng-template", 114)(210, PropertiesPage_ng_template_210_Template, 1, 1, "ng-template", 115);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(211, PropertiesPage_ng_template_211_Template, 8, 0, "ng-template", 107);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(212, "p-confirmDialog");
        } if (rf & 2) {
            const noMlsFeeds_r32 = i0.ɵɵreference(192);
            i0.ɵɵadvance(22);
            i0.ɵɵtextInterpolate(ctx.metrics().total || 0);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.metrics().active);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.metrics().total ? ctx.metrics().active / ctx.metrics().total * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.metrics().conditional);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.metrics().total ? ctx.metrics().conditional / ctx.metrics().total * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.metrics().sold);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.metrics().total ? ctx.metrics().sold / ctx.metrics().total * 100 : 0, "%");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(18);
            i0.ɵɵtextInterpolate(ctx.metrics().active);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.metrics().sold);
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(ctx.metrics().total || "\u2014");
            i0.ɵɵadvance(15);
            i0.ɵɵtextInterpolate(ctx.metrics().active);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.metrics().total ? ctx.metrics().active / ctx.metrics().total * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.metrics().conditional);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.metrics().total ? ctx.metrics().conditional / ctx.metrics().total * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.metrics().sold);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.metrics().total ? ctx.metrics().sold / ctx.metrics().total * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.metrics().draft);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchTerm);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.statusOptions)("ngModel", ctx.statusFilter);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("options", ctx.typeOptions)("ngModel", ctx.typeFilter);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.viewMode === "table");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.viewMode === "card");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.viewMode === "kanban");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.viewMode === "map");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.canManage());
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngIf", ctx.searchTerm || ctx.statusFilter !== "all" || ctx.typeFilter !== "all");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.viewMode === "table");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.viewMode === "card");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.viewMode === "kanban");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.viewMode === "map");
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(54, _c0));
            i0.ɵɵproperty("visible", ctx.showMlsDialog())("modal", true);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.mlsFeeds().length)("ngIfElse", noMlsFeeds_r32);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.mlsImportHistory().length);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(55, _c1));
            i0.ɵɵproperty("visible", ctx.showBulkStatusDialog())("modal", true);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.selectionCount());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("options", ctx.bulkStatusOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.bulkStatus);
        } }, dependencies: [NgIf,
            NgFor,
            FormsModule, i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgModel, TableModule, i6.Table, i4.PrimeTemplate, i6.SortableColumn, i6.SortIcon, TagModule, i7.Tag, InputTextModule, i8.InputText, SelectModule, i9.Select, ButtonModule,
            PaginatorModule, i10.Paginator, SkeletonModule,
            TooltipModule, i11.Tooltip, DialogModule, i12.Dialog, ConfirmDialogModule, i13.ConfirmDialog, BreadcrumbsComponent,
            CurrencyPipe,
            DatePipe,
            DecimalPipe], styles: ["//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PROPERTIES[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   FUTURISTIC[_ngcontent-%COMP%]   ENTERPRISE[_ngcontent-%COMP%]   STYLING\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use[_ngcontent-%COMP%]   '../../../../../styles/design-tokens'[_ngcontent-%COMP%]   as[_ngcontent-%COMP%]   *[_ngcontent-%COMP%];\n@use 'sass:color';\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ANIMATIONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes[_ngcontent-%COMP%]   gradient-shift[_ngcontent-%COMP%] {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes _ngcontent-%COMP%_pulse-glow {\n  0%, 100% {\n    opacity: 1;\n    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);\n  }\n  50% {\n    opacity: 0.8;\n    box-shadow: 0 0 40px rgba(102, 126, 234, 0.6);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(100%); }\n}\n\n@keyframes _ngcontent-%COMP%_ring-draw {\n  0% { stroke-dasharray: 0, 100; }\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_slide-in-right {\n  from {\n    opacity: 0;\n    transform: translateX(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_badge-pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.1); }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  25% {\n    transform: translate(50px, -30px) scale(1.1);\n  }\n  50% {\n    transform: translate(100px, 20px) scale(0.9);\n  }\n  75% {\n    transform: translate(30px, 50px) scale(1.05);\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   BASE[_ngcontent-%COMP%]   STYLES\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ANIMATED[_ngcontent-%COMP%]   BACKGROUND[_ngcontent-%COMP%]   ORBS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 600px;\n    height: 600px;\n    background: $primary-gradient;\n    top: -200px;\n    right: -100px;\n  }\n\n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    bottom: 10%;\n    left: -100px;\n    animation-delay: -7s;\n    animation-duration: 25s;\n  }\n\n  &.orb-3 {\n    width: 300px;\n    height: 300px;\n    background: $secondary-gradient;\n    top: 40%;\n    right: 20%;\n    animation-delay: -14s;\n    animation-duration: 18s;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   HERO[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: _ngcontent-%COMP%_fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: _ngcontent-%COMP%_pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-4;\n  flex-wrap: wrap;\n  margin-top: $space-2;\n}\n\n.hero-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 80px;\n\n  .stat-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .stat-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .stat-bar {\n    width: 100%;\n    height: 4px;\n    background: $gray-200;\n    border-radius: $radius-full;\n    overflow: hidden;\n\n    .stat-bar-fill {\n      height: 100%;\n      background: $primary-gradient;\n      border-radius: $radius-full;\n      transition: width 1s ease-out;\n\n      &--leads { background: $cyan-gradient; }\n      &--prospects { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n      &--success { background: $success-gradient; }\n    }\n  }\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  margin-top: $space-2;\n  flex-wrap: wrap;\n}\n\n//[_ngcontent-%COMP%]   Hero[_ngcontent-%COMP%]   Visual[_ngcontent-%COMP%]   Cards\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: _ngcontent-%COMP%_slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform $transition-base, box-shadow $transition-base;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n\n  .card-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n  }\n\n  &--primary .card-icon {\n    background: $primary-gradient;\n    color: white;\n  }\n\n  &--success .card-icon {\n    background: $success-gradient;\n    color: white;\n  }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    &--up {\n      color: $success;\n    }\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   METRICS[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.metrics-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1400px) {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all $transition-base;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 5 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-lg;\n    color: white;\n    flex-shrink: 0;\n    transition: transform $transition-spring;\n  }\n\n  &--total .metric-icon { background: $primary-gradient; }\n  &--leads .metric-icon { background: $cyan-gradient; }\n  &--prospects .metric-icon { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n  &--customers .metric-icon { background: $success-gradient; }\n  &--new .metric-icon { background: $orange-gradient; }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n}\n\n//[_ngcontent-%COMP%]   Sparkline[_ngcontent-%COMP%]   Chart\n.metric-chart[_ngcontent-%COMP%] {\n  position: absolute;\n  right: $space-4;\n  bottom: $space-3;\n  width: 60px;\n  height: 24px;\n  opacity: 0.5;\n\n  .sparkline {\n    width: 100%;\n    height: 100%;\n  }\n}\n\n//[_ngcontent-%COMP%]   Ring[_ngcontent-%COMP%]   Chart\n.metric-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  right: $space-3;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: $gray-200;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n    animation: _ngcontent-%COMP%_ring-draw 1s ease-out;\n\n    &--cyan { stroke: $cyan; }\n    &--purple { stroke: $purple; }\n    &--green { stroke: $success; }\n  }\n}\n\n//[_ngcontent-%COMP%]   Badge\n.metric-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: $space-3;\n  right: $space-3;\n\n  span {\n    display: inline-block;\n    padding: $space-1 $space-2;\n    background: $orange-gradient;\n    color: white;\n    font-size: $font-size-xs;\n    font-weight: 700;\n    border-radius: $radius-sm;\n    animation: _ngcontent-%COMP%_badge-pulse 2s ease-in-out infinite;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   FILTER[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.filter-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  margin-bottom: $space-4;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out 0.3s both;\n}\n\n.filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  flex-wrap: wrap;\n\n  @media (max-width: 900px) {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n\n.search-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  min-width: 240px;\n\n  .search-icon {\n    position: absolute;\n    left: $space-3;\n    top: 50%;\n    transform: translateY(-50%);\n    color: $gray-400;\n    font-size: $font-size-base;\n    transition: color $transition-fast;\n  }\n\n  .search-input {\n    width: 100%;\n    padding: $space-2 $space-3 $space-2 $space-8;\n    background: rgba(0, 0, 0, 0.03);\n    border: 1px solid transparent;\n    border-radius: $radius-md;\n    font-size: $font-size-base;\n    color: $gray-800;\n    transition: all $transition-fast;\n\n    &::placeholder {\n      color: $gray-400;\n    }\n\n    &:focus {\n      outline: none;\n      background: white;\n      border-color: $primary;\n      box-shadow: 0 0 0 4px rgba($primary, 0.1);\n\n      & + .search-icon,\n      & ~ .search-icon {\n        color: $primary;\n      }\n    }\n  }\n}\n\n.filter-pills[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.filter-pill[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-1 $space-2;\n  background: rgba(0, 0, 0, 0.03);\n  border-radius: $radius-md;\n  transition: background $transition-fast;\n\n  i {\n    color: $gray-400;\n    font-size: $font-size-sm;\n  }\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.06);\n  }\n\n  ::ng-deep .filter-select {\n    .p-select {\n      background: transparent;\n      border: none;\n      box-shadow: none;\n      padding: 0;\n      min-width: 80px;\n\n      &:focus {\n        box-shadow: none;\n      }\n\n      .p-select-label {\n        padding: 2px $space-1;\n        font-size: $font-size-sm;\n        color: $gray-700;\n      }\n    }\n  }\n}\n\n.filter-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  margin-left: auto;\n\n  @media (max-width: 900px) {\n    margin-left: 0;\n    justify-content: space-between;\n  }\n}\n\n.filter-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  margin-top: $space-2;\n  flex-wrap: wrap;\n\n  .summary-label {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n\n  .filter-tag {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-1;\n    padding: 2px $space-2;\n    background: rgba($primary, 0.1);\n    border-radius: $radius-full;\n    font-size: $font-size-sm;\n    color: $primary;\n\n    i {\n      font-size: $font-size-xs;\n      cursor: pointer;\n      opacity: 0.7;\n      transition: opacity $transition-fast;\n\n      &:hover {\n        opacity: 1;\n      }\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DATA[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.data-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out 0.4s both;\n}\n\n.data-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  flex-wrap: wrap;\n  gap: $space-3;\n\n  .header-title {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n\n    h2 {\n      margin: 0;\n      font-size: $font-size-lg;\n      font-weight: 600;\n      color: $gray-800;\n    }\n\n    .record-count {\n      font-size: $font-size-sm;\n      color: $gray-500;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ACTION[_ngcontent-%COMP%]   BUTTONS[_ngcontent-%COMP%]   (from page-design-system)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.action-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(12px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-600;\n  cursor: pointer;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  .action-btn__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 24px;\n    height: 24px;\n    border-radius: $radius-sm;\n    color: white;\n    font-size: 0.75rem;\n    transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);\n  }\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);\n\n    .action-btn__icon {\n      transform: scale(1.15) rotate(3deg);\n    }\n  }\n\n  &:disabled {\n    opacity: 0.45;\n    pointer-events: none;\n  }\n\n  &--add .action-btn__icon {\n    background: $primary-gradient;\n  }\n\n  &--add:hover {\n    border-color: rgba($primary, 0.3);\n    color: color.adjust($primary, $lightness: -10%);\n    box-shadow: 0 4px 14px rgba($primary, 0.15);\n  }\n\n  &--refresh .action-btn__icon {\n    background: $blue-gradient;\n  }\n\n  &--refresh:hover {\n    border-color: rgba($info, 0.3);\n    color: color.adjust($info, $lightness: -10%);\n    box-shadow: 0 4px 14px rgba($info, 0.15);\n  }\n\n  &--export .action-btn__icon {\n    background: $success-gradient;\n  }\n\n  &--export:hover {\n    border-color: rgba($success, 0.3);\n    color: color.adjust($success, $lightness: -10%);\n    box-shadow: 0 4px 14px rgba($success, 0.15);\n  }\n\n  &--settings .action-btn__icon {\n    background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);\n  }\n\n  &--settings:hover {\n    border-color: rgba($gray-500, 0.3);\n    color: $gray-700;\n    box-shadow: 0 4px 14px rgba($gray-500, 0.15);\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   LOADING[_ngcontent-%COMP%]   STATE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.loading-state[_ngcontent-%COMP%] {\n  padding: $space-3;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n  &:last-child {\n    border-bottom: none;\n  }\n}\n\n.skeleton[_ngcontent-%COMP%] {\n  background: linear-gradient(90deg, $gray-100 25%, $gray-50 50%, $gray-100 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n  border-radius: $radius-md;\n}\n\n.skeleton-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.skeleton-text[_ngcontent-%COMP%] {\n  height: 12px;\n  width: 100px;\n  flex: 1;\n  max-width: 200px;\n}\n\n.skeleton-short[_ngcontent-%COMP%] {\n  max-width: 100px;\n}\n\n.skeleton-badge[_ngcontent-%COMP%] {\n  height: 24px;\n  width: 80px;\n  border-radius: $radius-full;\n}\n\n.skeleton-actions[_ngcontent-%COMP%] {\n  height: 32px;\n  width: 80px;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   EMPTY[_ngcontent-%COMP%]   STATE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: $space-10 $space-6;\n  text-align: center;\n\n  .empty-icon {\n    width: 60px;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $gray-100;\n    border-radius: 50%;\n    margin-bottom: $space-4;\n\n    i {\n      font-size: $font-size-2xl;\n      color: $gray-400;\n    }\n  }\n\n  h3 {\n    margin: 0 0 $space-1;\n    font-size: $font-size-xl;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0 0 $space-4;\n    font-size: $font-size-base;\n    color: $gray-500;\n    max-width: 360px;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DATA[_ngcontent-%COMP%]   TABLE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  border-radius: 16px;\n  overflow: hidden;\n\n  // Soft blue gradient header - Global Standard\n  ::ng-deep .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n  }\n\n  // Standard body rows\n  ::ng-deep .p-datatable-tbody > tr > td {\n    vertical-align: middle;\n    padding: $space-3 $space-2;\n  }\n\n  .th-actions {\n    width: 100px;\n    text-align: right;\n  }\n}\n\n@media (max-width: 600px) {\n  .data-table[_ngcontent-%COMP%] {\n    min-width: 900px;\n  }\n}\n\n.table-row[_ngcontent-%COMP%] {\n  transition: background $transition-fast;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  cursor: pointer;\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  &:hover {\n    background: rgba($primary, 0.03);\n\n    .customer-avatar {\n      transform: scale(1.05);\n      box-shadow: 0 4px 12px rgba($primary, 0.2);\n    }\n  }\n}\n\n.td-property[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.customer-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n  transition: all $transition-spring;\n}\n\n.customer-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n\n  .customer-name {\n    font-weight: 600;\n    font-size: $font-size-base;\n    color: $gray-800;\n  }\n\n  .customer-date {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n.mls-number[_ngcontent-%COMP%] {\n  font-family: 'SF Mono', 'Menlo', monospace;\n  font-size: $font-size-sm;\n  color: $gray-600;\n  background: rgba(0, 0, 0, 0.04);\n  padding: 2px $space-2;\n  border-radius: $radius-sm;\n}\n\n.price-value[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: $font-size-base;\n  color: $gray-800;\n}\n\n.type-label[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-600;\n}\n\n.property-details[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n\n  .detail-item {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    font-size: $font-size-sm;\n    color: $gray-600;\n    padding: 2px $space-2;\n    background: rgba(0, 0, 0, 0.03);\n    border-radius: $radius-sm;\n\n    i {\n      font-size: $font-size-xs;\n      color: $gray-400;\n    }\n  }\n}\n\n.owner-name[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-700;\n}\n\n.td-actions[_ngcontent-%COMP%] {\n  text-align: right;\n}\n\n.row-actions[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: $space-2;\n}\n\n.row-action-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  border-radius: $radius-md;\n  cursor: pointer;\n  font-size: $font-size-sm;\n  color: white;\n  transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &--edit {\n    background: $blue-gradient;\n    box-shadow: 0 2px 8px rgba($info, 0.25);\n\n    &:hover {\n      transform: translateY(-2px) scale(1.1);\n      box-shadow: 0 6px 16px rgba($info, 0.35);\n    }\n  }\n\n  &--delete {\n    background: linear-gradient(135deg, #f87171 0%, $danger 100%);\n    box-shadow: 0 2px 8px rgba($danger, 0.25);\n\n    &:hover {\n      transform: translateY(-2px) scale(1.1);\n      box-shadow: 0 6px 16px rgba($danger, 0.35);\n    }\n  }\n\n  &:disabled {\n    opacity: 0.35;\n    pointer-events: none;\n    transform: none;\n    box-shadow: none;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PAGINATOR\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n[_ngcontent-%COMP%]  .p-paginator {\n  background: transparent;\n  border: none;\n  padding: $space-3 $space-4;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PREMIUM[_ngcontent-%COMP%]   CARD[_ngcontent-%COMP%]   GRID[_ngcontent-%COMP%]   VIEW\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.card-grid-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out 0.3s both;\n}\n\n.card-grid-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: $space-4;\n  padding: 0 $space-2;\n\n  h2 {\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-800;\n    margin: 0;\n  }\n\n  .record-count {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    font-weight: 500;\n  }\n}\n\n.card-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n  gap: $space-5;\n  margin-bottom: $space-4;\n\n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n    gap: $space-3;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500\u2500[_ngcontent-%COMP%]   Premium[_ngcontent-%COMP%]   Property[_ngcontent-%COMP%]   Card[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.prop-glass-card[_ngcontent-%COMP%] {\n  position: relative;\n  background: #ffffff;\n  border-radius: $radius-xl;\n  overflow: hidden;\n  cursor: pointer;\n  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),\n              box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out both;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 6px 20px rgba(0, 0, 0, 0.05);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n\n  &:hover {\n    transform: translateY(-8px);\n    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.14), 0 8px 20px rgba(0, 0, 0, 0.07);\n\n    .card-photo-icon {\n      transform: scale(1.1);\n    }\n\n    .card-glass-footer .row-action-btn {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n\n  &:active {\n    transform: translateY(-3px);\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500\u2500[_ngcontent-%COMP%]   Status[_ngcontent-%COMP%]   Ribbon[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-ribbon[_ngcontent-%COMP%] {\n  position: absolute;\n  top: $space-3;\n  right: 0;\n  z-index: 3;\n  padding: 4px $space-3 4px $space-3;\n  color: white;\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  border-radius: $radius-md 0 0 $radius-md;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n\n  &::after {\n    display: none;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500\u2500[_ngcontent-%COMP%]   Photo[_ngcontent-%COMP%]   /[_ngcontent-%COMP%]   Gradient[_ngcontent-%COMP%]   Header[_ngcontent-%COMP%]   Area[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-photo-area[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 160px;\n  padding: $space-8 $space-4 $space-6;\n  overflow: hidden;\n\n  // Decorative dot pattern\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px);\n    background-size: 16px 16px;\n    pointer-events: none;\n  }\n\n  // Bottom gradient fade for text readability\n  &::after {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 70px;\n    background: linear-gradient(to top, rgba(0, 0, 0, 0.35), transparent);\n    pointer-events: none;\n  }\n}\n\n.card-photo-icon[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-lg;\n  color: white;\n  font-size: 1.5rem;\n  background: rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(8px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);\n  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  &--thumbnail {\n    background: rgba(15, 23, 42, 0.22);\n    border-color: rgba(255, 255, 255, 0.45);\n    backdrop-filter: blur(3px);\n  }\n}\n\n.card-photo-price[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: $space-3;\n  left: $space-3;\n  z-index: 2;\n  padding: 6px $space-3;\n  background: rgba(0, 0, 0, 0.6);\n  backdrop-filter: blur(10px);\n  color: white;\n  font-size: 1.15rem;\n  font-weight: 800;\n  border-radius: $radius-md;\n  letter-spacing: -0.3px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500\u2500[_ngcontent-%COMP%]   Card[_ngcontent-%COMP%]   Body[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-glass-body[_ngcontent-%COMP%] {\n  padding: $space-4;\n  background: #ffffff;\n}\n\n.card-address[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: $gray-800;\n  margin: 0 0 $space-1;\n  line-height: 1.3;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.card-location[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  margin: 0 0 $space-3;\n\n  i {\n    font-size: 0.7rem;\n    color: #ef4444;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500\u2500[_ngcontent-%COMP%]   Specs[_ngcontent-%COMP%]   Row[_ngcontent-%COMP%]   (Beds / Baths / Sqft)[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-specs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-4;\n  margin-bottom: $space-3;\n  padding: $space-2 0;\n  border-top: 1px solid #f1f5f9;\n  border-bottom: 1px solid #f1f5f9;\n}\n\n.card-spec[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: $font-size-xs;\n  color: $gray-600;\n\n  i {\n    width: 22px;\n    height: 22px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 6px;\n    font-size: 0.65rem;\n    color: #667eea;\n    background: rgba(102, 126, 234, 0.1);\n  }\n\n  strong {\n    font-weight: 700;\n    color: $gray-800;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500\u2500[_ngcontent-%COMP%]   Meta[_ngcontent-%COMP%]   Row[_ngcontent-%COMP%]   (Type + MLS)[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-meta-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: $space-3;\n}\n\n.card-type-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 3px $space-2;\n  background: #f0f4ff;\n  color: #4f46e5;\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  border-radius: $radius-full;\n  border: 1px solid #e0e7ff;\n}\n\n.card-mls[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: $gray-400;\n  font-weight: 500;\n  font-family: 'SF Mono', 'Fira Code', monospace;\n  letter-spacing: 0.02em;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500\u2500[_ngcontent-%COMP%]   Footer[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-glass-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: $space-2;\n  border-top: 1px solid #f1f5f9;\n}\n\n.card-agent[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: $font-size-xs;\n  color: $gray-600;\n  font-weight: 500;\n\n  i {\n    width: 22px;\n    height: 22px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 0.65rem;\n    color: #8b5cf6;\n    background: rgba(139, 92, 246, 0.1);\n    border-radius: 50%;\n  }\n}\n\n.card-footer-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-1;\n\n  .row-action-btn {\n    opacity: 0.6;\n    transform: translateY(2px);\n    transition: opacity 0.25s ease, transform 0.25s ease;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500\u2500[_ngcontent-%COMP%]   Ambient[_ngcontent-%COMP%]   Glow[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-ambient-glow[_ngcontent-%COMP%] {\n  display: none; // Remove ambient glow for clean look\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500\u2500[_ngcontent-%COMP%]   Skeleton[_ngcontent-%COMP%]   Loading[_ngcontent-%COMP%]   Cards[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.prop-glass-card--skeleton[_ngcontent-%COMP%] {\n  cursor: default;\n  pointer-events: none;\n\n  .skeleton-photo {\n    min-height: 160px;\n    background: linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 100%);\n  }\n\n  .skeleton-body {\n    padding: $space-4;\n    display: flex;\n    flex-direction: column;\n    gap: $space-2;\n  }\n\n  .skeleton {\n    height: 14px;\n    background: linear-gradient(90deg, #e2e8f0 0%, #f8fafc 50%, #e2e8f0 100%);\n    background-size: 200% 100%;\n    animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n    border-radius: $radius-sm;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   KANBAN[_ngcontent-%COMP%]   BOARD[_ngcontent-%COMP%]   VIEW\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.kanban-board[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(7, minmax(200px, 1fr));\n  gap: $space-3;\n  min-height: 500px;\n  overflow-x: auto;\n  padding-bottom: $space-4;\n  position: relative;\n  z-index: 1;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out 0.4s both;\n\n  @media (max-width: 1400px) {\n    grid-template-columns: repeat(7, minmax(180px, 1fr));\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: repeat(7, 220px);\n  }\n}\n\n.kanban-column[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.5);\n  backdrop-filter: blur(12px);\n  border-radius: $radius-xl;\n  border: 1px solid $glass-border;\n  display: flex;\n  flex-direction: column;\n  max-height: 70vh;\n}\n\n.column-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-3;\n  border-bottom: 3px solid;\n  border-radius: $radius-xl $radius-xl 0 0;\n\n  .column-title {\n    font-size: $font-size-sm;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    color: $gray-700;\n  }\n\n  .column-count {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 22px;\n    height: 22px;\n    padding: 0 $space-1;\n    background: rgba(0, 0, 0, 0.07);\n    border-radius: $radius-full;\n    font-size: $font-size-xs;\n    font-weight: 700;\n    color: $gray-600;\n  }\n}\n\n.column-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: $space-2;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n\n  &::-webkit-scrollbar {\n    width: 4px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: rgba(0, 0, 0, 0.12);\n    border-radius: $radius-full;\n  }\n}\n\n.column-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: $space-2;\n  padding: $space-6 $space-3;\n  color: $gray-400;\n  font-size: $font-size-sm;\n\n  i {\n    font-size: 1.5rem;\n    opacity: 0.5;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Property[_ngcontent-%COMP%]   Card[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n\n.property-card[_ngcontent-%COMP%] {\n  position: relative;\n  background: #ffffff;\n  border-radius: $radius-lg;\n  border: 1px solid #e2e8f0;\n  padding: $space-3;\n  cursor: pointer;\n  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),\n              box-shadow 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05);\n  }\n}\n\n.property-card-header[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  align-items: flex-start;\n  gap: $space-2;\n  margin-bottom: $space-2;\n\n.prop-avatar {\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  color: white;\n  font-size: $font-size-sm;\n  flex-shrink: 0;\n  background-size: cover !important;\n  background-position: center !important;\n  background-repeat: no-repeat !important;\n  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);\n}\n\n  .prop-meta {\n    display: flex;\n    flex-direction: column;\n    gap: 1px;\n    min-width: 0;\n\n    .prop-address {\n      font-size: $font-size-sm;\n      font-weight: 600;\n      color: $gray-800;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n\n    .prop-location {\n      font-size: $font-size-xs;\n      color: $gray-500;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n  }\n}\n\n.property-card-body[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  margin-bottom: $space-2;\n\n  .prop-price {\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-800;\n    margin-bottom: $space-1;\n  }\n\n  .prop-details-row {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    flex-wrap: wrap;\n    margin-bottom: $space-1;\n\n    .prop-type {\n      font-size: $font-size-xs;\n      color: $primary;\n      font-weight: 600;\n      background: rgba($primary, 0.08);\n      padding: 1px $space-1;\n      border-radius: $radius-sm;\n    }\n\n    .prop-specs {\n      display: flex;\n      align-items: center;\n      gap: $space-2;\n      font-size: $font-size-xs;\n      color: $gray-500;\n\n      span {\n        display: flex;\n        align-items: center;\n        gap: 2px;\n      }\n\n      i {\n        font-size: 0.65rem;\n      }\n    }\n  }\n\n  .prop-mls {\n    font-size: $font-size-xs;\n    color: $gray-400;\n    font-family: monospace;\n  }\n}\n\n.property-card-footer[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: $space-2;\n  border-top: 1px solid rgba(102, 126, 234, 0.08);\n\n  .prop-agent {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    i {\n      font-size: 0.65rem;\n    }\n  }\n\n  .prop-actions {\n    display: flex;\n    gap: $space-1;\n  }\n}\n\n\n\n\n\n.bulk-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%);\n  border: 1px solid rgba(99, 102, 241, 0.2);\n  border-radius: $radius-lg;\n  animation: _ngcontent-%COMP%_fade-in-up 0.3s ease-out;\n}\n\n.bulk-count[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: #6366f1;\n  white-space: nowrap;\n}\n\n.th-checkbox[_ngcontent-%COMP%], \n.td-checkbox[_ngcontent-%COMP%] {\n  width: 40px;\n  text-align: center;\n\n  input[type=\"checkbox\"] {\n    width: 16px;\n    height: 16px;\n    cursor: pointer;\n    accent-color: #667eea;\n  }\n}\n\n.row-selected[_ngcontent-%COMP%] {\n  background: rgba(99, 102, 241, 0.06) !important;\n}\n\n.bulk-dialog-desc[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  color: $gray-600;\n  margin-bottom: $space-4;\n}\n\n.dialog-body[_ngcontent-%COMP%] {\n  padding: $space-3 0;\n\n  .form-field {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.75rem;\n\n    > label {\n      font-size: $font-size-sm;\n      font-weight: 600;\n      color: #475569;\n      min-width: 90px;\n      text-align: right;\n      white-space: nowrap;\n    }\n\n    > p-select {\n      flex: 1;\n      min-width: 0;\n    }\n\n    &:focus-within > label {\n      color: #4f46e5;\n    }\n  }\n}\n\n.select-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n\n\n.map-view[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out;\n}\n\n.map-neighborhoods[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-5;\n}\n\n.neighborhood-group[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.neighborhood-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n  border-bottom: 2px solid rgba(59, 130, 246, 0.15);\n\n  i {\n    color: #3b82f6;\n    font-size: $font-size-lg;\n  }\n}\n\n.neighborhood-name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n.neighborhood-count[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: $font-size-sm;\n  color: $gray-500;\n  font-weight: 500;\n}\n\n.neighborhood-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: $space-3;\n  padding: $space-4;\n}\n\n.map-property-card[_ngcontent-%COMP%] {\n  position: relative;\n  background: #ffffff;\n  border-radius: $radius-lg;\n  border: 1px solid #e2e8f0;\n  padding: $space-3;\n  cursor: pointer;\n  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),\n              box-shadow 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05);\n  }\n}\n\n.map-card-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: $space-2;\n}\n\n.map-card-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  color: white;\n  font-size: $font-size-sm;\n  background-size: cover !important;\n  background-position: center !important;\n  background-repeat: no-repeat !important;\n  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);\n}\n\n.map-card-address[_ngcontent-%COMP%] {\n  display: block;\n  font-size: $font-size-sm;\n  color: $gray-800;\n  margin-bottom: 2px;\n}\n\n.map-card-price[_ngcontent-%COMP%] {\n  display: block;\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $gray-800;\n  margin-bottom: $space-1;\n}\n\n.map-card-specs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  margin-bottom: $space-1;\n\n  i { margin-right: 2px; }\n}\n\n.map-card-type[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n\n\n.mls-dialog-body[_ngcontent-%COMP%] {\n  padding: $space-3 0;\n}\n\n.mls-section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-md;\n  font-weight: 700;\n  color: $gray-800;\n  margin: 0 0 $space-3;\n\n  i { color: #06b6d4; }\n}\n\n.mls-feeds-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.mls-feed-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  background: rgba(255, 255, 255, 0.6);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n}\n\n.mls-feed-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.mls-feed-name[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  color: $gray-800;\n}\n\n.mls-feed-url[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-400;\n  word-break: break-all;\n}\n\n.mls-feed-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  margin-top: 2px;\n}\n\n.mls-feed-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.mls-empty[_ngcontent-%COMP%] {\n  color: $gray-400;\n  font-size: $font-size-sm;\n  padding: $space-3;\n}\n\n.mls-history[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.mls-job[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-4;\n  padding: $space-2 $space-3;\n  background: rgba(255, 255, 255, 0.5);\n  border-radius: $radius-md;\n  border: 1px solid $glass-border;\n}\n\n.mls-job-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n\n  strong {\n    display: block;\n    font-size: $font-size-sm;\n    color: $gray-800;\n  }\n}\n\n.mls-job-date[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.mls-job-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n.mls-job-errors[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-weight: 600;\n}\n\n.mt-4[_ngcontent-%COMP%] { margin-top: $space-4; }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PropertiesPage, [{
        type: Component,
        args: [{ selector: 'app-properties-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    CurrencyPipe,
                    DatePipe,
                    DecimalPipe,
                    FormsModule,
                    TableModule,
                    TagModule,
                    InputTextModule,
                    SelectModule,
                    ButtonModule,
                    PaginatorModule,
                    SkeletonModule,
                    TooltipModule,
                    DialogModule,
                    ConfirmDialogModule,
                    BreadcrumbsComponent
                ], providers: [ConfirmationService], template: "<div class=\"page-container\">\n  <!-- Animated Background Orbs -->\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <!-- HERO SECTION -->\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Property Management Hub</span>\n      </div>\n\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Property</span>\n        <span class=\"title-light\">Workspace</span>\n      </h1>\n\n      <p class=\"hero-description\">\n        Track listings, manage inventory, and close deals with real-time property intelligence\n      </p>\n\n      <div class=\"hero-stats\">\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ metrics().total || 0 }}</div>\n          <div class=\"stat-label\">Total Properties</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill\" style=\"width: 100%\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ metrics().active }}</div>\n          <div class=\"stat-label\">Active Listings</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--leads\" [style.width.%]=\"metrics().total ? (metrics().active / metrics().total) * 100 : 0\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ metrics().conditional }}</div>\n          <div class=\"stat-label\">Conditional</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--prospects\" [style.width.%]=\"metrics().total ? (metrics().conditional / metrics().total) * 100 : 0\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ metrics().sold }}</div>\n          <div class=\"stat-label\">Sold</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--success\" [style.width.%]=\"metrics().total ? (metrics().sold / metrics().total) * 100 : 0\"></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"hero-actions\">\n        <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"!canManage()\" (click)=\"onCreate()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n          <span>Add Property</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--refresh\" (click)=\"load()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n          <span>Refresh</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-home\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Active</span>\n          <strong class=\"card-value\">{{ metrics().active }}</strong>\n          <span class=\"card-trend card-trend--up\">\n            <i class=\"pi pi-arrow-up\"></i> Listings\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n\n      <div class=\"visual-card visual-card--success\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-check-circle\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Sold</span>\n          <strong class=\"card-value\">{{ metrics().sold }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-dollar\"></i> Closed\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <!-- METRICS DASHBOARD -->\n  <section class=\"metrics-section\">\n    <div class=\"metric-card metric-card--total\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-database\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Total Properties</span>\n        <strong class=\"metric-value\">{{ metrics().total || '\u2014' }}</strong>\n      </div>\n      <div class=\"metric-chart\">\n        <svg viewBox=\"0 0 100 40\" class=\"sparkline\">\n          <path d=\"M0,35 Q25,30 50,20 T100,15\" fill=\"none\" stroke=\"url(#gradient-prop)\" stroke-width=\"2\"/>\n          <defs>\n            <linearGradient id=\"gradient-prop\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n              <stop offset=\"0%\" stop-color=\"#667eea\"/>\n              <stop offset=\"100%\" stop-color=\"#764ba2\"/>\n            </linearGradient>\n          </defs>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--leads\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-home\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Active</span>\n        <strong class=\"metric-value\">{{ metrics().active }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--cyan\"\n            [attr.stroke-dasharray]=\"(metrics().total ? (metrics().active / metrics().total) * 100 : 0) + ', 100'\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--prospects\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-clock\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Conditional</span>\n        <strong class=\"metric-value\">{{ metrics().conditional }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--purple\"\n            [attr.stroke-dasharray]=\"(metrics().total ? (metrics().conditional / metrics().total) * 100 : 0) + ', 100'\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--customers\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-check-circle\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Sold</span>\n        <strong class=\"metric-value\">{{ metrics().sold }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--green\"\n            [attr.stroke-dasharray]=\"(metrics().total ? (metrics().sold / metrics().total) * 100 : 0) + ', 100'\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--new\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-file-edit\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Drafts</span>\n        <strong class=\"metric-value\">{{ metrics().draft }}</strong>\n      </div>\n      <div class=\"metric-badge\">\n        <span>NEW</span>\n      </div>\n    </div>\n  </section>\n\n  <!-- FILTER BAR -->\n  <section class=\"filter-section\">\n    <div class=\"filter-bar\">\n      <div class=\"search-wrapper\">\n        <i class=\"pi pi-search search-icon\"></i>\n        <input\n          pInputText\n          type=\"search\"\n          class=\"search-input\"\n          placeholder=\"Search by address, MLS #, city...\"\n          [(ngModel)]=\"searchTerm\"\n          (ngModelChange)=\"onSearch($event)\"\n        />\n      </div>\n\n      <div class=\"filter-pills\">\n        <div class=\"filter-pill\">\n          <i class=\"pi pi-tag\"></i>\n          <p-select appendTo=\"body\"\n            [options]=\"statusOptions\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"statusFilter\"\n            (ngModelChange)=\"onStatusChange($event)\"\n            placeholder=\"Status\"\n            styleClass=\"filter-select\"\n          ></p-select>\n        </div>\n\n        <div class=\"filter-pill\">\n          <i class=\"pi pi-home\"></i>\n          <p-select appendTo=\"body\"\n            [options]=\"typeOptions\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"typeFilter\"\n            (ngModelChange)=\"onTypeChange($event)\"\n            placeholder=\"Type\"\n            styleClass=\"filter-select\"\n          ></p-select>\n        </div>\n      </div>\n\n      <div class=\"filter-actions\">\n        <div class=\"view-toggle\">\n          <button type=\"button\" class=\"toggle-btn\" [class.active]=\"viewMode === 'table'\" (click)=\"viewMode = 'table'\" title=\"Table View\" aria-label=\"Switch to table view\">\n            <i class=\"pi pi-list\"></i>\n          </button>\n          <button type=\"button\" class=\"toggle-btn\" [class.active]=\"viewMode === 'card'\" (click)=\"viewMode = 'card'\" title=\"Card View\" aria-label=\"Switch to card view\">\n            <i class=\"pi pi-th-large\"></i>\n          </button>\n          <button type=\"button\" class=\"toggle-btn\" [class.active]=\"viewMode === 'kanban'\" (click)=\"viewMode = 'kanban'\" title=\"Board View\" aria-label=\"Switch to board view\">\n            <i class=\"pi pi-objects-column\"></i>\n          </button>\n          <button type=\"button\" class=\"toggle-btn\" [class.active]=\"viewMode === 'map'\" (click)=\"viewMode = 'map'\" title=\"Map View\" aria-label=\"Switch to map view\">\n            <i class=\"pi pi-map\"></i>\n          </button>\n        </div>\n\n        <button type=\"button\" class=\"action-btn action-btn--import\" (click)=\"onShowMlsDialog()\" *ngIf=\"canManage()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-cloud-download\"></i></span>\n          <span>MLS Import</span>\n        </button>\n\n        <button type=\"button\" class=\"action-btn action-btn--export\" (click)=\"onExport()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-download\"></i></span>\n          <span>Export</span>\n        </button>\n\n        <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"resetFilters()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-times\"></i></span>\n          <span>Clear</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"filter-summary\" *ngIf=\"searchTerm || statusFilter !== 'all' || typeFilter !== 'all'\">\n      <span class=\"summary-label\">Active filters:</span>\n      <span class=\"filter-tag\" *ngIf=\"searchTerm\">\n        \"{{ searchTerm }}\"\n        <i class=\"pi pi-times\" (click)=\"searchTerm = ''; onSearch('')\"></i>\n      </span>\n      <span class=\"filter-tag\" *ngIf=\"statusFilter !== 'all'\">\n        {{ statusFilter }}\n        <i class=\"pi pi-times\" (click)=\"statusFilter = 'all'; onStatusChange('all')\"></i>\n      </span>\n      <span class=\"filter-tag\" *ngIf=\"typeFilter !== 'all'\">\n        {{ typeFilter }}\n        <i class=\"pi pi-times\" (click)=\"typeFilter = 'all'; onTypeChange('all')\"></i>\n      </span>\n    </div>\n  </section>\n\n  <!-- DATA TABLE -->\n  <section class=\"data-section\" *ngIf=\"viewMode === 'table'\">\n    <div class=\"data-card\">\n      <header class=\"data-header\">\n        <div class=\"header-title\">\n          <h2>Property Listings</h2>\n          <span class=\"record-count\">\n            {{ properties().length }} of {{ total() }} records\n          </span>\n        </div>\n        <!-- Bulk Toolbar (X11) -->\n        <div class=\"bulk-toolbar\" *ngIf=\"hasSelection()\">\n          <span class=\"bulk-count\">{{ selectionCount() }} selected</span>\n          <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"showBulkStatusDialog.set(true)\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-tag\"></i></span>\n            <span>Change Status</span>\n          </button>\n          <button type=\"button\" class=\"action-btn action-btn--export\" style=\"--btn-gradient: linear-gradient(135deg, #f87171 0%, #ef4444 100%)\" (click)=\"bulkDelete()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-trash\"></i></span>\n            <span>Delete</span>\n          </button>\n          <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"clearSelection()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-times\"></i></span>\n            <span>Clear</span>\n          </button>\n        </div>\n      </header>\n\n      <!-- Loading State -->\n      <div class=\"loading-state\" *ngIf=\"loading()\">\n        <div class=\"skeleton-row\" *ngFor=\"let _ of [1,2,3,4,5]\">\n          <div class=\"skeleton skeleton-avatar\"></div>\n          <div class=\"skeleton skeleton-text\"></div>\n          <div class=\"skeleton skeleton-text skeleton-short\"></div>\n          <div class=\"skeleton skeleton-badge\"></div>\n          <div class=\"skeleton skeleton-text\"></div>\n          <div class=\"skeleton skeleton-actions\"></div>\n        </div>\n      </div>\n\n      <!-- Empty State -->\n      <div class=\"empty-state\" *ngIf=\"!loading() && !properties().length\">\n        <div class=\"empty-icon\">\n          <i class=\"pi pi-home\"></i>\n        </div>\n        <h3>No properties found</h3>\n        <p>Try adjusting your search or filters to find what you're looking for</p>\n        <button type=\"button\" class=\"action-btn action-btn--refresh\" (click)=\"resetFilters()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n          <span>Reset Filters</span>\n        </button>\n      </div>\n\n      <!-- Table View -->\n      <div class=\"table-wrapper\" *ngIf=\"!loading() && properties().length\">\n        <p-table class=\"crm-table data-table\" [value]=\"properties()\">\n          <ng-template pTemplate=\"header\">\n            <tr>\n              <th class=\"th-checkbox\">\n                <input type=\"checkbox\" [checked]=\"isAllSelected()\" (change)=\"toggleSelectAll()\" title=\"Select all\" />\n              </th>\n              <th pSortableColumn=\"address\">Property <p-sortIcon field=\"address\"></p-sortIcon></th>\n              <th pSortableColumn=\"mlsNumber\">MLS # <p-sortIcon field=\"mlsNumber\"></p-sortIcon></th>\n              <th pSortableColumn=\"listPrice\">List Price <p-sortIcon field=\"listPrice\"></p-sortIcon></th>\n              <th pSortableColumn=\"status\">Status <p-sortIcon field=\"status\"></p-sortIcon></th>\n              <th pSortableColumn=\"propertyType\">Type <p-sortIcon field=\"propertyType\"></p-sortIcon></th>\n              <th>Details</th>\n              <th pSortableColumn=\"ownerName\">Agent <p-sortIcon field=\"ownerName\"></p-sortIcon></th>\n              <th class=\"th-actions\">Actions</th>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"body\" let-row>\n            <tr class=\"table-row\" [class.row-selected]=\"isSelected(row.id)\" (click)=\"onRowClick(row, $event)\">\n              <td class=\"td-checkbox\">\n                <input type=\"checkbox\" [checked]=\"isSelected(row.id)\" (change)=\"toggleSelect(row.id)\" (click)=\"$event.stopPropagation()\" />\n              </td>\n              <td class=\"td-property\">\n                <div class=\"customer-avatar\">\n                  <i class=\"pi pi-home\"></i>\n                </div>\n                <div class=\"customer-info\">\n                  <span class=\"customer-name\">{{ row.address }}</span>\n                  <span class=\"customer-date\">{{ row.city }}{{ row.province ? ', ' + row.province : '' }}</span>\n                </div>\n              </td>\n              <td>\n                <span class=\"mls-number\">{{ row.mlsNumber || '\u2014' }}</span>\n              </td>\n              <td>\n                <span class=\"price-value\" *ngIf=\"row.listPrice\">{{ row.listPrice | currency:row.currency:'symbol':'1.0-0' }}</span>\n                <span *ngIf=\"!row.listPrice\">\u2014</span>\n              </td>\n              <td>\n                <p-tag [value]=\"row.status\" [severity]=\"statusSeverity(row.status)\"></p-tag>\n              </td>\n              <td>\n                <span class=\"type-label\">{{ formatPropertyType(row.propertyType) }}</span>\n              </td>\n              <td>\n                <div class=\"property-details\">\n                  <span *ngIf=\"row.bedrooms\" class=\"detail-item\" pTooltip=\"Bedrooms\">\n                    <i class=\"pi pi-th-large\"></i> {{ row.bedrooms }}\n                  </span>\n                  <span *ngIf=\"row.bathrooms\" class=\"detail-item\" pTooltip=\"Bathrooms\">\n                    <i class=\"pi pi-box\"></i> {{ row.bathrooms }}\n                  </span>\n                  <span *ngIf=\"row.squareFeet\" class=\"detail-item\" pTooltip=\"Square Feet\">\n                    <i class=\"pi pi-expand\"></i> {{ row.squareFeet | number:'1.0-0' }}\n                  </span>\n                </div>\n              </td>\n              <td>\n                <span class=\"owner-name\">{{ row.ownerName || '\u2014' }}</span>\n              </td>\n              <td class=\"td-actions\">\n                <div class=\"row-actions\">\n                  <button\n                    type=\"button\"\n                    class=\"row-action-btn row-action-btn--edit\"\n                    [disabled]=\"!canManage()\"\n                    (click)=\"onEdit(row); $event.stopPropagation()\"\n                    title=\"Edit\"\n                  >\n                    <i class=\"pi pi-pencil\"></i>\n                  </button>\n                  <button\n                    type=\"button\"\n                    class=\"row-action-btn row-action-btn--delete\"\n                    [disabled]=\"!canManage()\"\n                    (click)=\"onDelete(row); $event.stopPropagation()\"\n                    title=\"Delete\"\n                  >\n                    <i class=\"pi pi-trash\"></i>\n                  </button>\n                </div>\n              </td>\n            </tr>\n          </ng-template>\n        </p-table>\n\n        <p-paginator\n          [rows]=\"rows\"\n          [totalRecords]=\"total()\"\n          [first]=\"pageIndex * rows\"\n          [rowsPerPageOptions]=\"[10, 25, 50]\"\n          (onPageChange)=\"onPageChange($event)\"\n        ></p-paginator>\n      </div>\n    </div>\n  </section>\n\n  <!-- PREMIUM CARD GRID VIEW -->\n  <section class=\"card-grid-section\" *ngIf=\"viewMode === 'card'\">\n    <div class=\"card-grid-header\">\n      <h2>Property Listings</h2>\n      <span class=\"record-count\">{{ properties().length }} of {{ total() }} records</span>\n    </div>\n\n    <!-- Loading Shimmer Cards -->\n    <div class=\"card-grid\" *ngIf=\"loading()\">\n      <div class=\"prop-glass-card prop-glass-card--skeleton\" *ngFor=\"let _ of [1,2,3,4,5,6]\">\n        <div class=\"skeleton-photo\"></div>\n        <div class=\"skeleton-body\">\n          <div class=\"skeleton skeleton-text\" style=\"width: 70%\"></div>\n          <div class=\"skeleton skeleton-text\" style=\"width: 50%\"></div>\n          <div class=\"skeleton skeleton-text\" style=\"width: 40%\"></div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Empty State -->\n    <div class=\"empty-state\" *ngIf=\"!loading() && !properties().length\">\n      <div class=\"empty-icon\"><i class=\"pi pi-home\"></i></div>\n      <h3>No properties found</h3>\n      <p>Try adjusting your search or filters</p>\n      <button type=\"button\" class=\"action-btn action-btn--refresh\" (click)=\"resetFilters()\">\n        <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n        <span>Reset Filters</span>\n      </button>\n    </div>\n\n    <!-- Card Grid -->\n    <div class=\"card-grid\" *ngIf=\"!loading() && properties().length\">\n      <div class=\"prop-glass-card\" *ngFor=\"let prop of properties(); let i = index\"\n           [style.animation-delay]=\"i * 0.04 + 's'\"\n           (click)=\"onRowClick(prop, $event)\">\n        <!-- Status ribbon -->\n        <div class=\"card-ribbon\" [style.background]=\"'linear-gradient(135deg, ' + statusColor(prop.status) + ' 0%, ' + statusColor(prop.status) + 'cc 100%)'\">\n          {{ prop.status }}\n        </div>\n\n        <!-- Photo / gradient header -->\n        <div class=\"card-photo-area\" [style.background]=\"propertyCardBackground(prop)\">\n          <div class=\"card-photo-icon\" [class.card-photo-icon--thumbnail]=\"getPrimaryPhotoUrl(prop)\">\n            <i class=\"pi pi-home\"></i>\n          </div>\n          <div class=\"card-photo-price\" *ngIf=\"prop.listPrice\">\n            {{ prop.listPrice | currency:prop.currency:'symbol':'1.0-0' }}\n          </div>\n        </div>\n\n        <!-- Card body -->\n        <div class=\"card-glass-body\">\n          <h3 class=\"card-address\">{{ prop.address }}</h3>\n          <p class=\"card-location\">\n            <i class=\"pi pi-map-marker\"></i>\n            {{ prop.city }}{{ prop.province ? ', ' + prop.province : '' }}\n          </p>\n\n          <!-- Specs row -->\n          <div class=\"card-specs\">\n            <span class=\"card-spec\" *ngIf=\"prop.bedrooms\">\n              <i class=\"pi pi-th-large\"></i>\n              <strong>{{ prop.bedrooms }}</strong> Beds\n            </span>\n            <span class=\"card-spec\" *ngIf=\"prop.bathrooms\">\n              <i class=\"pi pi-box\"></i>\n              <strong>{{ prop.bathrooms }}</strong> Baths\n            </span>\n            <span class=\"card-spec\" *ngIf=\"prop.squareFeet\">\n              <i class=\"pi pi-expand\"></i>\n              <strong>{{ prop.squareFeet | number:'1.0-0' }}</strong> sqft\n            </span>\n          </div>\n\n          <!-- Meta row -->\n          <div class=\"card-meta-row\">\n            <span class=\"card-type-badge\">{{ formatPropertyType(prop.propertyType) }}</span>\n            <span class=\"card-mls\" *ngIf=\"prop.mlsNumber\">MLS# {{ prop.mlsNumber }}</span>\n          </div>\n\n          <!-- Footer -->\n          <div class=\"card-glass-footer\">\n            <span class=\"card-agent\" *ngIf=\"prop.ownerName\">\n              <i class=\"pi pi-user\"></i> {{ prop.ownerName }}\n            </span>\n            <div class=\"card-footer-actions\">\n              <button type=\"button\" class=\"row-action-btn row-action-btn--edit\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onEdit(prop)\" title=\"Edit\">\n                <i class=\"pi pi-pencil\"></i>\n              </button>\n              <button type=\"button\" class=\"row-action-btn row-action-btn--view\" (click)=\"$event.stopPropagation(); onRowClick(prop, $event)\" title=\"View\">\n                <i class=\"pi pi-eye\"></i>\n              </button>\n            </div>\n          </div>\n        </div>\n\n        <!-- Ambient glow -->\n        <div class=\"card-ambient-glow\" [style.background]=\"'radial-gradient(circle at 80% 20%, ' + statusColor(prop.status) + '18 0%, transparent 60%)'\"></div>\n      </div>\n    </div>\n\n    <p-paginator *ngIf=\"!loading() && properties().length\"\n      [rows]=\"rows\"\n      [totalRecords]=\"total()\"\n      [first]=\"pageIndex * rows\"\n      [rowsPerPageOptions]=\"[10, 25, 50]\"\n      (onPageChange)=\"onPageChange($event)\"\n    ></p-paginator>\n  </section>\n\n  <!-- KANBAN BOARD VIEW -->\n  <section class=\"kanban-board\" *ngIf=\"viewMode === 'kanban'\">\n    <div class=\"kanban-column\" *ngFor=\"let status of kanbanStatuses\">\n      <div class=\"column-header\" [style.border-color]=\"statusColor(status)\">\n        <span class=\"column-title\">{{ status }}</span>\n        <span class=\"column-count\">{{ getPropertiesByStatus(status).length }}</span>\n      </div>\n      <div class=\"column-body\">\n        <div class=\"property-card\" *ngFor=\"let prop of getPropertiesByStatus(status)\" (click)=\"onRowClick(prop, $event)\">\n          <div class=\"property-card-header\">\n            <div class=\"prop-avatar\" [style.background]=\"propertyAvatarBackground(prop)\">\n              <i class=\"pi pi-home\"></i>\n            </div>\n            <div class=\"prop-meta\">\n              <span class=\"prop-address\">{{ prop.address }}</span>\n              <span class=\"prop-location\">{{ prop.city }}{{ prop.province ? ', ' + prop.province : '' }}</span>\n            </div>\n          </div>\n          <div class=\"property-card-body\">\n            <div class=\"prop-price\" *ngIf=\"prop.listPrice\">\n              {{ prop.listPrice | currency:prop.currency:'symbol':'1.0-0' }}\n            </div>\n            <div class=\"prop-details-row\">\n              <span class=\"prop-type\">{{ formatPropertyType(prop.propertyType) }}</span>\n              <span class=\"prop-specs\" *ngIf=\"prop.bedrooms || prop.bathrooms\">\n                <span *ngIf=\"prop.bedrooms\"><i class=\"pi pi-th-large\"></i> {{ prop.bedrooms }}</span>\n                <span *ngIf=\"prop.bathrooms\"><i class=\"pi pi-box\"></i> {{ prop.bathrooms }}</span>\n              </span>\n            </div>\n            <div class=\"prop-mls\" *ngIf=\"prop.mlsNumber\">MLS# {{ prop.mlsNumber }}</div>\n          </div>\n          <div class=\"property-card-footer\">\n            <span class=\"prop-agent\" *ngIf=\"prop.ownerName\">\n              <i class=\"pi pi-user\"></i> {{ prop.ownerName }}\n            </span>\n            <div class=\"prop-actions\">\n              <button type=\"button\" class=\"mini-action-btn mini-action-btn--edit\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onEdit(prop)\" title=\"Edit\">\n                <i class=\"pi pi-pencil\"></i>\n              </button>\n              <button type=\"button\" class=\"mini-action-btn mini-action-btn--delete\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onDelete(prop)\" title=\"Delete\">\n                <i class=\"pi pi-trash\"></i>\n              </button>\n            </div>\n          </div>\n        </div>\n        <div class=\"column-empty\" *ngIf=\"!getPropertiesByStatus(status).length\">\n          <i class=\"pi pi-inbox\"></i>\n          <span>No properties</span>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- MAP / NEIGHBORHOOD VIEW (G2) -->\n  <section class=\"map-view\" *ngIf=\"viewMode === 'map'\">\n    <div class=\"map-neighborhoods\" *ngIf=\"mapNeighborhoods().length; else noMapData\">\n      <div class=\"neighborhood-group\" *ngFor=\"let hood of mapNeighborhoods()\">\n        <div class=\"neighborhood-header\">\n          <i class=\"pi pi-map-marker\"></i>\n          <h3 class=\"neighborhood-name\">{{ hood.name }}</h3>\n          <span class=\"neighborhood-count\">{{ hood.items.length }} {{ hood.items.length === 1 ? 'property' : 'properties' }}</span>\n        </div>\n        <div class=\"neighborhood-cards\">\n          <div class=\"map-property-card\" *ngFor=\"let prop of hood.items\" (click)=\"onRowClick(prop, $event)\">\n            <div class=\"map-card-top\">\n              <div class=\"map-card-avatar\" [style.background]=\"propertyAvatarBackground(prop)\">\n                <i class=\"pi pi-home\"></i>\n              </div>\n              <p-tag [value]=\"prop.status\" [severity]=\"statusSeverity(prop.status)\" [rounded]=\"true\" class=\"map-card-tag\"></p-tag>\n            </div>\n            <strong class=\"map-card-address\">{{ prop.address }}</strong>\n            <span class=\"map-card-price\" *ngIf=\"prop.listPrice\">{{ prop.listPrice | currency:prop.currency:'symbol':'1.0-0' }}</span>\n            <div class=\"map-card-specs\">\n              <span *ngIf=\"prop.bedrooms\"><i class=\"pi pi-th-large\"></i> {{ prop.bedrooms }} bed</span>\n              <span *ngIf=\"prop.bathrooms\"><i class=\"pi pi-box\"></i> {{ prop.bathrooms }} bath</span>\n              <span *ngIf=\"prop.squareFeet\">{{ prop.squareFeet | number:'1.0-0' }} sqft</span>\n            </div>\n            <span class=\"map-card-type\">{{ formatPropertyType(prop.propertyType) }}</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <ng-template #noMapData>\n      <div class=\"empty-state\">\n        <i class=\"pi pi-map empty-icon\"></i>\n        <p>No properties to display on map.</p>\n      </div>\n    </ng-template>\n  </section>\n\n  <!-- MLS / IDX FEED DIALOG (G1) -->\n  <p-dialog header=\"MLS / IDX Feed Management\" [visible]=\"showMlsDialog()\" (visibleChange)=\"showMlsDialog.set($event)\" [modal]=\"true\" [style]=\"{ width: '700px' }\">\n    <div class=\"mls-dialog-body\">\n      <h3 class=\"mls-section-title\"><i class=\"pi pi-database\"></i> Connected Feeds</h3>\n      <div class=\"mls-feeds-list\" *ngIf=\"mlsFeeds().length; else noMlsFeeds\">\n        <div class=\"mls-feed-card\" *ngFor=\"let feed of mlsFeeds()\">\n          <div class=\"mls-feed-info\">\n            <strong class=\"mls-feed-name\">{{ feed.feedName }}</strong>\n            <span class=\"mls-feed-url\">{{ feed.feedUrl }}</span>\n            <span class=\"mls-feed-meta\">\n              <span>Provider: {{ feed.provider }}</span>\n              <span>Imported: {{ feed.totalImported }}</span>\n              <span *ngIf=\"feed.lastSyncAtUtc\">Last sync: {{ feed.lastSyncAtUtc | date:'MMM d h:mm a' }}</span>\n            </span>\n          </div>\n          <div class=\"mls-feed-actions\">\n            <p-tag [value]=\"feed.status\" [severity]=\"mlsFeedStatusSeverity(feed.status)\" [rounded]=\"true\"></p-tag>\n            <button type=\"button\" class=\"action-btn action-btn--import\" [disabled]=\"mlsImporting() || feed.status === 'Error'\" (click)=\"triggerMlsImport(feed.id)\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-sync\"></i></span>\n              <span>Import</span>\n            </button>\n          </div>\n        </div>\n      </div>\n      <ng-template #noMlsFeeds>\n        <p class=\"mls-empty\">No MLS feeds configured.</p>\n      </ng-template>\n\n      <h3 class=\"mls-section-title mt-4\"><i class=\"pi pi-history\"></i> Recent Import Jobs</h3>\n      <div class=\"mls-history\" *ngIf=\"mlsImportHistory().length\">\n        <div class=\"mls-job\" *ngFor=\"let job of mlsImportHistory()\">\n          <div class=\"mls-job-info\">\n            <strong>{{ job.feedName }}</strong>\n            <span class=\"mls-job-date\">{{ job.startedAtUtc | date:'MMM d, yyyy h:mm a' }}</span>\n          </div>\n          <div class=\"mls-job-stats\">\n            <span title=\"Imported\">{{ job.imported }} new</span>\n            <span title=\"Updated\">{{ job.updated }} updated</span>\n            <span title=\"Skipped\">{{ job.skipped }} skipped</span>\n            <span *ngIf=\"job.errors\" title=\"Errors\" class=\"mls-job-errors\">{{ job.errors }} errors</span>\n          </div>\n          <p-tag [value]=\"job.status\" [severity]=\"mlsJobStatusSeverity(job.status)\" [rounded]=\"true\"></p-tag>\n        </div>\n      </div>\n    </div>\n    <ng-template pTemplate=\"footer\">\n      <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"showMlsDialog.set(false)\">\n        <span>Close</span>\n      </button>\n    </ng-template>\n  </p-dialog>\n\n  <!-- BULK STATUS CHANGE DIALOG (X11) -->\n  <p-dialog header=\"Change Status\" [visible]=\"showBulkStatusDialog()\" (visibleChange)=\"showBulkStatusDialog.set($event)\" [modal]=\"true\" [style]=\"{ width: '400px' }\">\n    <div class=\"dialog-body\">\n      <p class=\"bulk-dialog-desc\">Update <strong>{{ selectionCount() }}</strong> selected properties to:</p>\n      <div class=\"form-field\">\n        <label for=\"bulk-status\">New Status</label>\n        <p-select id=\"bulk-status\" [options]=\"bulkStatusOptions\" optionLabel=\"label\" optionValue=\"value\"\n                  [(ngModel)]=\"bulkStatus\" placeholder=\"Select status\" class=\"w-full\" appendTo=\"body\">\n          <ng-template pTemplate=\"item\" let-option>\n            <div class=\"select-option\"><i class=\"pi pi-tag\"></i><span>{{ option.label }}</span></div>\n          </ng-template>\n          <ng-template pTemplate=\"selectedItem\" let-option>\n            <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi pi-tag\"></i><span>{{ option.label }}</span></div>\n          </ng-template>\n        </p-select>\n      </div>\n    </div>\n    <ng-template pTemplate=\"footer\">\n      <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"showBulkStatusDialog.set(false)\">\n        <span>Cancel</span>\n      </button>\n      <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"bulkChangeStatus()\">\n        <span class=\"action-btn__icon\"><i class=\"pi pi-check\"></i></span>\n        <span>Apply</span>\n      </button>\n    </ng-template>\n  </p-dialog>\n</div>\n\n<p-confirmDialog></p-confirmDialog>\n", styles: ["// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PROPERTIES PAGE - FUTURISTIC ENTERPRISE STYLING\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ANIMATIONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes pulse-glow {\n  0%, 100% {\n    opacity: 1;\n    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);\n  }\n  50% {\n    opacity: 0.8;\n    box-shadow: 0 0 40px rgba(102, 126, 234, 0.6);\n  }\n}\n\n@keyframes shimmer {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(100%); }\n}\n\n@keyframes ring-draw {\n  0% { stroke-dasharray: 0, 100; }\n}\n\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes slide-in-right {\n  from {\n    opacity: 0;\n    transform: translateX(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n@keyframes badge-pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.1); }\n}\n\n@keyframes orb-float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  25% {\n    transform: translate(50px, -30px) scale(1.1);\n  }\n  50% {\n    transform: translate(100px, 20px) scale(0.9);\n  }\n  75% {\n    transform: translate(30px, 50px) scale(1.05);\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// BASE STYLES\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ANIMATED BACKGROUND ORBS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 600px;\n    height: 600px;\n    background: $primary-gradient;\n    top: -200px;\n    right: -100px;\n  }\n\n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    bottom: 10%;\n    left: -100px;\n    animation-delay: -7s;\n    animation-duration: 25s;\n  }\n\n  &.orb-3 {\n    width: 300px;\n    height: 300px;\n    background: $secondary-gradient;\n    top: 40%;\n    right: 20%;\n    animation-delay: -14s;\n    animation-duration: 18s;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// HERO SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-stats {\n  display: flex;\n  gap: $space-4;\n  flex-wrap: wrap;\n  margin-top: $space-2;\n}\n\n.hero-stat {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 80px;\n\n  .stat-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .stat-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .stat-bar {\n    width: 100%;\n    height: 4px;\n    background: $gray-200;\n    border-radius: $radius-full;\n    overflow: hidden;\n\n    .stat-bar-fill {\n      height: 100%;\n      background: $primary-gradient;\n      border-radius: $radius-full;\n      transition: width 1s ease-out;\n\n      &--leads { background: $cyan-gradient; }\n      &--prospects { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n      &--success { background: $success-gradient; }\n    }\n  }\n}\n\n.hero-actions {\n  display: flex;\n  gap: $space-3;\n  margin-top: $space-2;\n  flex-wrap: wrap;\n}\n\n// Hero Visual Cards\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform $transition-base, box-shadow $transition-base;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n\n  .card-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n  }\n\n  &--primary .card-icon {\n    background: $primary-gradient;\n    color: white;\n  }\n\n  &--success .card-icon {\n    background: $success-gradient;\n    color: white;\n  }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    &--up {\n      color: $success;\n    }\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// METRICS SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.metrics-section {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1400px) {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all $transition-base;\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 5 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-lg;\n    color: white;\n    flex-shrink: 0;\n    transition: transform $transition-spring;\n  }\n\n  &--total .metric-icon { background: $primary-gradient; }\n  &--leads .metric-icon { background: $cyan-gradient; }\n  &--prospects .metric-icon { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n  &--customers .metric-icon { background: $success-gradient; }\n  &--new .metric-icon { background: $orange-gradient; }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n}\n\n// Sparkline Chart\n.metric-chart {\n  position: absolute;\n  right: $space-4;\n  bottom: $space-3;\n  width: 60px;\n  height: 24px;\n  opacity: 0.5;\n\n  .sparkline {\n    width: 100%;\n    height: 100%;\n  }\n}\n\n// Ring Chart\n.metric-ring {\n  position: absolute;\n  right: $space-3;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: $gray-200;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n    animation: ring-draw 1s ease-out;\n\n    &--cyan { stroke: $cyan; }\n    &--purple { stroke: $purple; }\n    &--green { stroke: $success; }\n  }\n}\n\n// Badge\n.metric-badge {\n  position: absolute;\n  top: $space-3;\n  right: $space-3;\n\n  span {\n    display: inline-block;\n    padding: $space-1 $space-2;\n    background: $orange-gradient;\n    color: white;\n    font-size: $font-size-xs;\n    font-weight: 700;\n    border-radius: $radius-sm;\n    animation: badge-pulse 2s ease-in-out infinite;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// FILTER SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.filter-section {\n  position: relative;\n  z-index: 2;\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.5s ease-out 0.3s both;\n}\n\n.filter-bar {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  flex-wrap: wrap;\n\n  @media (max-width: 900px) {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n\n.search-wrapper {\n  position: relative;\n  flex: 1;\n  min-width: 240px;\n\n  .search-icon {\n    position: absolute;\n    left: $space-3;\n    top: 50%;\n    transform: translateY(-50%);\n    color: $gray-400;\n    font-size: $font-size-base;\n    transition: color $transition-fast;\n  }\n\n  .search-input {\n    width: 100%;\n    padding: $space-2 $space-3 $space-2 $space-8;\n    background: rgba(0, 0, 0, 0.03);\n    border: 1px solid transparent;\n    border-radius: $radius-md;\n    font-size: $font-size-base;\n    color: $gray-800;\n    transition: all $transition-fast;\n\n    &::placeholder {\n      color: $gray-400;\n    }\n\n    &:focus {\n      outline: none;\n      background: white;\n      border-color: $primary;\n      box-shadow: 0 0 0 4px rgba($primary, 0.1);\n\n      & + .search-icon,\n      & ~ .search-icon {\n        color: $primary;\n      }\n    }\n  }\n}\n\n.filter-pills {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.filter-pill {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-1 $space-2;\n  background: rgba(0, 0, 0, 0.03);\n  border-radius: $radius-md;\n  transition: background $transition-fast;\n\n  i {\n    color: $gray-400;\n    font-size: $font-size-sm;\n  }\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.06);\n  }\n\n  ::ng-deep .filter-select {\n    .p-select {\n      background: transparent;\n      border: none;\n      box-shadow: none;\n      padding: 0;\n      min-width: 80px;\n\n      &:focus {\n        box-shadow: none;\n      }\n\n      .p-select-label {\n        padding: 2px $space-1;\n        font-size: $font-size-sm;\n        color: $gray-700;\n      }\n    }\n  }\n}\n\n.filter-actions {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  margin-left: auto;\n\n  @media (max-width: 900px) {\n    margin-left: 0;\n    justify-content: space-between;\n  }\n}\n\n.filter-summary {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  margin-top: $space-2;\n  flex-wrap: wrap;\n\n  .summary-label {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n\n  .filter-tag {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-1;\n    padding: 2px $space-2;\n    background: rgba($primary, 0.1);\n    border-radius: $radius-full;\n    font-size: $font-size-sm;\n    color: $primary;\n\n    i {\n      font-size: $font-size-xs;\n      cursor: pointer;\n      opacity: 0.7;\n      transition: opacity $transition-fast;\n\n      &:hover {\n        opacity: 1;\n      }\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DATA SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.data-section {\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out 0.4s both;\n}\n\n.data-card {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.data-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  flex-wrap: wrap;\n  gap: $space-3;\n\n  .header-title {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n\n    h2 {\n      margin: 0;\n      font-size: $font-size-lg;\n      font-weight: 600;\n      color: $gray-800;\n    }\n\n    .record-count {\n      font-size: $font-size-sm;\n      color: $gray-500;\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ACTION BUTTONS (from page-design-system)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.action-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(12px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-600;\n  cursor: pointer;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  .action-btn__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 24px;\n    height: 24px;\n    border-radius: $radius-sm;\n    color: white;\n    font-size: 0.75rem;\n    transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);\n  }\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);\n\n    .action-btn__icon {\n      transform: scale(1.15) rotate(3deg);\n    }\n  }\n\n  &:disabled {\n    opacity: 0.45;\n    pointer-events: none;\n  }\n\n  &--add .action-btn__icon {\n    background: $primary-gradient;\n  }\n\n  &--add:hover {\n    border-color: rgba($primary, 0.3);\n    color: color.adjust($primary, $lightness: -10%);\n    box-shadow: 0 4px 14px rgba($primary, 0.15);\n  }\n\n  &--refresh .action-btn__icon {\n    background: $blue-gradient;\n  }\n\n  &--refresh:hover {\n    border-color: rgba($info, 0.3);\n    color: color.adjust($info, $lightness: -10%);\n    box-shadow: 0 4px 14px rgba($info, 0.15);\n  }\n\n  &--export .action-btn__icon {\n    background: $success-gradient;\n  }\n\n  &--export:hover {\n    border-color: rgba($success, 0.3);\n    color: color.adjust($success, $lightness: -10%);\n    box-shadow: 0 4px 14px rgba($success, 0.15);\n  }\n\n  &--settings .action-btn__icon {\n    background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);\n  }\n\n  &--settings:hover {\n    border-color: rgba($gray-500, 0.3);\n    color: $gray-700;\n    box-shadow: 0 4px 14px rgba($gray-500, 0.15);\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// LOADING STATE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.loading-state {\n  padding: $space-3;\n}\n\n.skeleton-row {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n  &:last-child {\n    border-bottom: none;\n  }\n}\n\n.skeleton {\n  background: linear-gradient(90deg, $gray-100 25%, $gray-50 50%, $gray-100 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n  border-radius: $radius-md;\n}\n\n.skeleton-avatar {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.skeleton-text {\n  height: 12px;\n  width: 100px;\n  flex: 1;\n  max-width: 200px;\n}\n\n.skeleton-short {\n  max-width: 100px;\n}\n\n.skeleton-badge {\n  height: 24px;\n  width: 80px;\n  border-radius: $radius-full;\n}\n\n.skeleton-actions {\n  height: 32px;\n  width: 80px;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// EMPTY STATE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: $space-10 $space-6;\n  text-align: center;\n\n  .empty-icon {\n    width: 60px;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $gray-100;\n    border-radius: 50%;\n    margin-bottom: $space-4;\n\n    i {\n      font-size: $font-size-2xl;\n      color: $gray-400;\n    }\n  }\n\n  h3 {\n    margin: 0 0 $space-1;\n    font-size: $font-size-xl;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0 0 $space-4;\n    font-size: $font-size-base;\n    color: $gray-500;\n    max-width: 360px;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DATA TABLE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.table-wrapper {\n  overflow-x: auto;\n}\n\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n  border-radius: 16px;\n  overflow: hidden;\n\n  // Soft blue gradient header - Global Standard\n  ::ng-deep .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n  }\n\n  // Standard body rows\n  ::ng-deep .p-datatable-tbody > tr > td {\n    vertical-align: middle;\n    padding: $space-3 $space-2;\n  }\n\n  .th-actions {\n    width: 100px;\n    text-align: right;\n  }\n}\n\n@media (max-width: 600px) {\n  .data-table {\n    min-width: 900px;\n  }\n}\n\n.table-row {\n  transition: background $transition-fast;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  cursor: pointer;\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  &:hover {\n    background: rgba($primary, 0.03);\n\n    .customer-avatar {\n      transform: scale(1.05);\n      box-shadow: 0 4px 12px rgba($primary, 0.2);\n    }\n  }\n}\n\n.td-property {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.customer-avatar {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n  transition: all $transition-spring;\n}\n\n.customer-info {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n\n  .customer-name {\n    font-weight: 600;\n    font-size: $font-size-base;\n    color: $gray-800;\n  }\n\n  .customer-date {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n.mls-number {\n  font-family: 'SF Mono', 'Menlo', monospace;\n  font-size: $font-size-sm;\n  color: $gray-600;\n  background: rgba(0, 0, 0, 0.04);\n  padding: 2px $space-2;\n  border-radius: $radius-sm;\n}\n\n.price-value {\n  font-weight: 700;\n  font-size: $font-size-base;\n  color: $gray-800;\n}\n\n.type-label {\n  font-size: $font-size-sm;\n  color: $gray-600;\n}\n\n.property-details {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n\n  .detail-item {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    font-size: $font-size-sm;\n    color: $gray-600;\n    padding: 2px $space-2;\n    background: rgba(0, 0, 0, 0.03);\n    border-radius: $radius-sm;\n\n    i {\n      font-size: $font-size-xs;\n      color: $gray-400;\n    }\n  }\n}\n\n.owner-name {\n  font-size: $font-size-sm;\n  color: $gray-700;\n}\n\n.td-actions {\n  text-align: right;\n}\n\n.row-actions {\n  display: inline-flex;\n  gap: $space-2;\n}\n\n.row-action-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  border-radius: $radius-md;\n  cursor: pointer;\n  font-size: $font-size-sm;\n  color: white;\n  transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &--edit {\n    background: $blue-gradient;\n    box-shadow: 0 2px 8px rgba($info, 0.25);\n\n    &:hover {\n      transform: translateY(-2px) scale(1.1);\n      box-shadow: 0 6px 16px rgba($info, 0.35);\n    }\n  }\n\n  &--delete {\n    background: linear-gradient(135deg, #f87171 0%, $danger 100%);\n    box-shadow: 0 2px 8px rgba($danger, 0.25);\n\n    &:hover {\n      transform: translateY(-2px) scale(1.1);\n      box-shadow: 0 6px 16px rgba($danger, 0.35);\n    }\n  }\n\n  &:disabled {\n    opacity: 0.35;\n    pointer-events: none;\n    transform: none;\n    box-shadow: none;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PAGINATOR\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n::ng-deep .p-paginator {\n  background: transparent;\n  border: none;\n  padding: $space-3 $space-4;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PREMIUM CARD GRID VIEW\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.card-grid-section {\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out 0.3s both;\n}\n\n.card-grid-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: $space-4;\n  padding: 0 $space-2;\n\n  h2 {\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-800;\n    margin: 0;\n  }\n\n  .record-count {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    font-weight: 500;\n  }\n}\n\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));\n  gap: $space-5;\n  margin-bottom: $space-4;\n\n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n    gap: $space-3;\n  }\n}\n\n// \u2500\u2500\u2500 Premium Property Card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.prop-glass-card {\n  position: relative;\n  background: #ffffff;\n  border-radius: $radius-xl;\n  overflow: hidden;\n  cursor: pointer;\n  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),\n              box-shadow 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  animation: fade-in-up 0.5s ease-out both;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 6px 20px rgba(0, 0, 0, 0.05);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n\n  &:hover {\n    transform: translateY(-8px);\n    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.14), 0 8px 20px rgba(0, 0, 0, 0.07);\n\n    .card-photo-icon {\n      transform: scale(1.1);\n    }\n\n    .card-glass-footer .row-action-btn {\n      opacity: 1;\n      transform: translateY(0);\n    }\n  }\n\n  &:active {\n    transform: translateY(-3px);\n  }\n}\n\n// \u2500\u2500\u2500 Status Ribbon \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-ribbon {\n  position: absolute;\n  top: $space-3;\n  right: 0;\n  z-index: 3;\n  padding: 4px $space-3 4px $space-3;\n  color: white;\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  border-radius: $radius-md 0 0 $radius-md;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n\n  &::after {\n    display: none;\n  }\n}\n\n// \u2500\u2500\u2500 Photo / Gradient Header Area \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-photo-area {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 160px;\n  padding: $space-8 $space-4 $space-6;\n  overflow: hidden;\n\n  // Decorative dot pattern\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px);\n    background-size: 16px 16px;\n    pointer-events: none;\n  }\n\n  // Bottom gradient fade for text readability\n  &::after {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 70px;\n    background: linear-gradient(to top, rgba(0, 0, 0, 0.35), transparent);\n    pointer-events: none;\n  }\n}\n\n.card-photo-icon {\n  width: 60px;\n  height: 60px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-lg;\n  color: white;\n  font-size: 1.5rem;\n  background: rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(8px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);\n  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n\n  &--thumbnail {\n    background: rgba(15, 23, 42, 0.22);\n    border-color: rgba(255, 255, 255, 0.45);\n    backdrop-filter: blur(3px);\n  }\n}\n\n.card-photo-price {\n  position: absolute;\n  bottom: $space-3;\n  left: $space-3;\n  z-index: 2;\n  padding: 6px $space-3;\n  background: rgba(0, 0, 0, 0.6);\n  backdrop-filter: blur(10px);\n  color: white;\n  font-size: 1.15rem;\n  font-weight: 800;\n  border-radius: $radius-md;\n  letter-spacing: -0.3px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);\n}\n\n// \u2500\u2500\u2500 Card Body \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-glass-body {\n  padding: $space-4;\n  background: #ffffff;\n}\n\n.card-address {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: $gray-800;\n  margin: 0 0 $space-1;\n  line-height: 1.3;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.card-location {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  margin: 0 0 $space-3;\n\n  i {\n    font-size: 0.7rem;\n    color: #ef4444;\n  }\n}\n\n// \u2500\u2500\u2500 Specs Row (Beds / Baths / Sqft) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-specs {\n  display: flex;\n  gap: $space-4;\n  margin-bottom: $space-3;\n  padding: $space-2 0;\n  border-top: 1px solid #f1f5f9;\n  border-bottom: 1px solid #f1f5f9;\n}\n\n.card-spec {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: $font-size-xs;\n  color: $gray-600;\n\n  i {\n    width: 22px;\n    height: 22px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 6px;\n    font-size: 0.65rem;\n    color: #667eea;\n    background: rgba(102, 126, 234, 0.1);\n  }\n\n  strong {\n    font-weight: 700;\n    color: $gray-800;\n  }\n}\n\n// \u2500\u2500\u2500 Meta Row (Type + MLS) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-meta-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: $space-3;\n}\n\n.card-type-badge {\n  display: inline-flex;\n  padding: 3px $space-2;\n  background: #f0f4ff;\n  color: #4f46e5;\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  border-radius: $radius-full;\n  border: 1px solid #e0e7ff;\n}\n\n.card-mls {\n  font-size: 0.7rem;\n  color: $gray-400;\n  font-weight: 500;\n  font-family: 'SF Mono', 'Fira Code', monospace;\n  letter-spacing: 0.02em;\n}\n\n// \u2500\u2500\u2500 Footer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-glass-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: $space-2;\n  border-top: 1px solid #f1f5f9;\n}\n\n.card-agent {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: $font-size-xs;\n  color: $gray-600;\n  font-weight: 500;\n\n  i {\n    width: 22px;\n    height: 22px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 0.65rem;\n    color: #8b5cf6;\n    background: rgba(139, 92, 246, 0.1);\n    border-radius: 50%;\n  }\n}\n\n.card-footer-actions {\n  display: flex;\n  gap: $space-1;\n\n  .row-action-btn {\n    opacity: 0.6;\n    transform: translateY(2px);\n    transition: opacity 0.25s ease, transform 0.25s ease;\n  }\n}\n\n// \u2500\u2500\u2500 Ambient Glow \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.card-ambient-glow {\n  display: none; // Remove ambient glow for clean look\n}\n\n// \u2500\u2500\u2500 Skeleton Loading Cards \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.prop-glass-card--skeleton {\n  cursor: default;\n  pointer-events: none;\n\n  .skeleton-photo {\n    min-height: 160px;\n    background: linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 100%);\n  }\n\n  .skeleton-body {\n    padding: $space-4;\n    display: flex;\n    flex-direction: column;\n    gap: $space-2;\n  }\n\n  .skeleton {\n    height: 14px;\n    background: linear-gradient(90deg, #e2e8f0 0%, #f8fafc 50%, #e2e8f0 100%);\n    background-size: 200% 100%;\n    animation: shimmer 1.5s infinite;\n    border-radius: $radius-sm;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// KANBAN BOARD VIEW\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.kanban-board {\n  display: grid;\n  grid-template-columns: repeat(7, minmax(200px, 1fr));\n  gap: $space-3;\n  min-height: 500px;\n  overflow-x: auto;\n  padding-bottom: $space-4;\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out 0.4s both;\n\n  @media (max-width: 1400px) {\n    grid-template-columns: repeat(7, minmax(180px, 1fr));\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: repeat(7, 220px);\n  }\n}\n\n.kanban-column {\n  background: rgba(255, 255, 255, 0.5);\n  backdrop-filter: blur(12px);\n  border-radius: $radius-xl;\n  border: 1px solid $glass-border;\n  display: flex;\n  flex-direction: column;\n  max-height: 70vh;\n}\n\n.column-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-3;\n  border-bottom: 3px solid;\n  border-radius: $radius-xl $radius-xl 0 0;\n\n  .column-title {\n    font-size: $font-size-sm;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    color: $gray-700;\n  }\n\n  .column-count {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    min-width: 22px;\n    height: 22px;\n    padding: 0 $space-1;\n    background: rgba(0, 0, 0, 0.07);\n    border-radius: $radius-full;\n    font-size: $font-size-xs;\n    font-weight: 700;\n    color: $gray-600;\n  }\n}\n\n.column-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: $space-2;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n\n  &::-webkit-scrollbar {\n    width: 4px;\n  }\n\n  &::-webkit-scrollbar-thumb {\n    background: rgba(0, 0, 0, 0.12);\n    border-radius: $radius-full;\n  }\n}\n\n.column-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: $space-2;\n  padding: $space-6 $space-3;\n  color: $gray-400;\n  font-size: $font-size-sm;\n\n  i {\n    font-size: 1.5rem;\n    opacity: 0.5;\n  }\n}\n\n// \u2500\u2500 Property Card \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n\n.property-card {\n  position: relative;\n  background: #ffffff;\n  border-radius: $radius-lg;\n  border: 1px solid #e2e8f0;\n  padding: $space-3;\n  cursor: pointer;\n  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),\n              box-shadow 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05);\n  }\n}\n\n.property-card-header {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  align-items: flex-start;\n  gap: $space-2;\n  margin-bottom: $space-2;\n\n.prop-avatar {\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  color: white;\n  font-size: $font-size-sm;\n  flex-shrink: 0;\n  background-size: cover !important;\n  background-position: center !important;\n  background-repeat: no-repeat !important;\n  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);\n}\n\n  .prop-meta {\n    display: flex;\n    flex-direction: column;\n    gap: 1px;\n    min-width: 0;\n\n    .prop-address {\n      font-size: $font-size-sm;\n      font-weight: 600;\n      color: $gray-800;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n\n    .prop-location {\n      font-size: $font-size-xs;\n      color: $gray-500;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n  }\n}\n\n.property-card-body {\n  position: relative;\n  z-index: 2;\n  margin-bottom: $space-2;\n\n  .prop-price {\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-800;\n    margin-bottom: $space-1;\n  }\n\n  .prop-details-row {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    flex-wrap: wrap;\n    margin-bottom: $space-1;\n\n    .prop-type {\n      font-size: $font-size-xs;\n      color: $primary;\n      font-weight: 600;\n      background: rgba($primary, 0.08);\n      padding: 1px $space-1;\n      border-radius: $radius-sm;\n    }\n\n    .prop-specs {\n      display: flex;\n      align-items: center;\n      gap: $space-2;\n      font-size: $font-size-xs;\n      color: $gray-500;\n\n      span {\n        display: flex;\n        align-items: center;\n        gap: 2px;\n      }\n\n      i {\n        font-size: 0.65rem;\n      }\n    }\n  }\n\n  .prop-mls {\n    font-size: $font-size-xs;\n    color: $gray-400;\n    font-family: monospace;\n  }\n}\n\n.property-card-footer {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: $space-2;\n  border-top: 1px solid rgba(102, 126, 234, 0.08);\n\n  .prop-agent {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    i {\n      font-size: 0.65rem;\n    }\n  }\n\n  .prop-actions {\n    display: flex;\n    gap: $space-1;\n  }\n}\n\n/* ==========================================\n   BULK OPERATIONS (X11)\n   ========================================== */\n.bulk-toolbar {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%);\n  border: 1px solid rgba(99, 102, 241, 0.2);\n  border-radius: $radius-lg;\n  animation: fade-in-up 0.3s ease-out;\n}\n\n.bulk-count {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: #6366f1;\n  white-space: nowrap;\n}\n\n.th-checkbox,\n.td-checkbox {\n  width: 40px;\n  text-align: center;\n\n  input[type=\"checkbox\"] {\n    width: 16px;\n    height: 16px;\n    cursor: pointer;\n    accent-color: #667eea;\n  }\n}\n\n.row-selected {\n  background: rgba(99, 102, 241, 0.06) !important;\n}\n\n.bulk-dialog-desc {\n  font-size: $font-size-md;\n  color: $gray-600;\n  margin-bottom: $space-4;\n}\n\n.dialog-body {\n  padding: $space-3 0;\n\n  .form-field {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.75rem;\n\n    > label {\n      font-size: $font-size-sm;\n      font-weight: 600;\n      color: #475569;\n      min-width: 90px;\n      text-align: right;\n      white-space: nowrap;\n    }\n\n    > p-select {\n      flex: 1;\n      min-width: 0;\n    }\n\n    &:focus-within > label {\n      color: #4f46e5;\n    }\n  }\n}\n\n.select-option {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n/* \u2550\u2550\u2550 MAP / NEIGHBORHOOD VIEW (G2) \u2550\u2550\u2550 */\n.map-view {\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out;\n}\n\n.map-neighborhoods {\n  display: flex;\n  flex-direction: column;\n  gap: $space-5;\n}\n\n.neighborhood-group {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.neighborhood-header {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n  border-bottom: 2px solid rgba(59, 130, 246, 0.15);\n\n  i {\n    color: #3b82f6;\n    font-size: $font-size-lg;\n  }\n}\n\n.neighborhood-name {\n  margin: 0;\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n.neighborhood-count {\n  margin-left: auto;\n  font-size: $font-size-sm;\n  color: $gray-500;\n  font-weight: 500;\n}\n\n.neighborhood-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));\n  gap: $space-3;\n  padding: $space-4;\n}\n\n.map-property-card {\n  position: relative;\n  background: #ffffff;\n  border-radius: $radius-lg;\n  border: 1px solid #e2e8f0;\n  padding: $space-3;\n  cursor: pointer;\n  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94),\n              box-shadow 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05);\n  }\n}\n\n.map-card-top {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: $space-2;\n}\n\n.map-card-avatar {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  color: white;\n  font-size: $font-size-sm;\n  background-size: cover !important;\n  background-position: center !important;\n  background-repeat: no-repeat !important;\n  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);\n}\n\n.map-card-address {\n  display: block;\n  font-size: $font-size-sm;\n  color: $gray-800;\n  margin-bottom: 2px;\n}\n\n.map-card-price {\n  display: block;\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $gray-800;\n  margin-bottom: $space-1;\n}\n\n.map-card-specs {\n  display: flex;\n  gap: $space-3;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  margin-bottom: $space-1;\n\n  i { margin-right: 2px; }\n}\n\n.map-card-type {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n/* \u2550\u2550\u2550 MLS / IDX FEED DIALOG (G1) \u2550\u2550\u2550 */\n.mls-dialog-body {\n  padding: $space-3 0;\n}\n\n.mls-section-title {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-md;\n  font-weight: 700;\n  color: $gray-800;\n  margin: 0 0 $space-3;\n\n  i { color: #06b6d4; }\n}\n\n.mls-feeds-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.mls-feed-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  background: rgba(255, 255, 255, 0.6);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n}\n\n.mls-feed-info {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.mls-feed-name {\n  font-size: $font-size-md;\n  color: $gray-800;\n}\n\n.mls-feed-url {\n  font-size: $font-size-xs;\n  color: $gray-400;\n  word-break: break-all;\n}\n\n.mls-feed-meta {\n  display: flex;\n  gap: $space-3;\n  font-size: $font-size-xs;\n  color: $gray-500;\n  margin-top: 2px;\n}\n\n.mls-feed-actions {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.mls-empty {\n  color: $gray-400;\n  font-size: $font-size-sm;\n  padding: $space-3;\n}\n\n.mls-history {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.mls-job {\n  display: flex;\n  align-items: center;\n  gap: $space-4;\n  padding: $space-2 $space-3;\n  background: rgba(255, 255, 255, 0.5);\n  border-radius: $radius-md;\n  border: 1px solid $glass-border;\n}\n\n.mls-job-info {\n  flex: 1;\n  min-width: 0;\n\n  strong {\n    display: block;\n    font-size: $font-size-sm;\n    color: $gray-800;\n  }\n}\n\n.mls-job-date {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.mls-job-stats {\n  display: flex;\n  gap: $space-3;\n  font-size: $font-size-xs;\n  color: $gray-500;\n}\n\n.mls-job-errors {\n  color: #ef4444;\n  font-weight: 600;\n}\n\n.mt-4 { margin-top: $space-4; }\n"] }]
    }], () => [{ type: i1.PropertyDataService }, { type: i2.Router }, { type: i3.AppToastService }, { type: i4.ConfirmationService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PropertiesPage, { className: "PropertiesPage", filePath: "src/app/crm/features/properties/pages/properties.page.ts", lineNumber: 55 }); })();
