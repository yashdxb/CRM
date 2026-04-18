import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { forkJoin, of, timer } from 'rxjs';
import { catchError, map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { exportToCsv } from '../../../../shared/utils/csv';
import { BulkActionsBarComponent } from '../../../../shared/components/bulk-actions/bulk-actions-bar.component';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import * as i0 from "@angular/core";
import * as i1 from "../services/customer-data.service";
import * as i2 from "@angular/router";
import * as i3 from "../../settings/services/user-admin-data.service";
import * as i4 from "../../../../core/app-toast.service";
import * as i5 from "../../../../shared/services/import-job.service";
import * as i6 from "@angular/forms";
import * as i7 from "primeng/api";
import * as i8 from "primeng/checkbox";
import * as i9 from "primeng/datepicker";
import * as i10 from "primeng/fileupload";
import * as i11 from "primeng/inputnumber";
import * as i12 from "primeng/table";
import * as i13 from "primeng/inputtext";
import * as i14 from "primeng/select";
import * as i15 from "primeng/button";
import * as i16 from "primeng/paginator";
import * as i17 from "primeng/dialog";
const _c0 = () => ({ width: "360px" });
const _c1 = () => ({ width: "480px" });
const _c2 = () => [1, 2, 3, 4, 5];
const _c3 = () => [5, 10, 20, 50];
function CustomersPage_span_173_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 130);
} }
function CustomersPage_div_178_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 131)(1, "div", 132)(2, "div", 133)(3, "label");
    i0.ɵɵtext(4, "Industry");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p-select", 134);
    i0.ɵɵlistener("ngModelChange", function CustomersPage_div_178_Template_p_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.industryFilter.set($event || null)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 133)(7, "label");
    i0.ɵɵtext(8, "Territory");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p-select", 135);
    i0.ɵɵlistener("ngModelChange", function CustomersPage_div_178_Template_p_select_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.territoryFilter.set($event || null)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 133)(11, "label");
    i0.ɵɵtext(12, "Account Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p-select", 136);
    i0.ɵɵlistener("ngModelChange", function CustomersPage_div_178_Template_p_select_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.ownerIdFilter.set($event || null)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 133)(15, "label");
    i0.ɵɵtext(16, "Created From");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p-datepicker", 137);
    i0.ɵɵlistener("ngModelChange", function CustomersPage_div_178_Template_p_datepicker_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.createdFrom.set($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 133)(19, "label");
    i0.ɵɵtext(20, "Created To");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p-datepicker", 138);
    i0.ɵɵlistener("ngModelChange", function CustomersPage_div_178_Template_p_datepicker_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.createdTo.set($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "div", 133)(23, "label");
    i0.ɵɵtext(24, "Min Revenue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "p-inputnumber", 139);
    i0.ɵɵlistener("ngModelChange", function CustomersPage_div_178_Template_p_inputnumber_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.minRevenue.set($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 133)(27, "label");
    i0.ɵɵtext(28, "Max Revenue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "p-inputnumber", 140);
    i0.ɵɵlistener("ngModelChange", function CustomersPage_div_178_Template_p_inputnumber_ngModelChange_29_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.maxRevenue.set($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 141)(31, "button", 142);
    i0.ɵɵlistener("click", function CustomersPage_div_178_Template_button_click_31_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.applyAdvancedFilters()); });
    i0.ɵɵelementStart(32, "span", 102);
    i0.ɵɵelement(33, "i", 143);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span");
    i0.ɵɵtext(35, "Apply");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "button", 144);
    i0.ɵɵlistener("click", function CustomersPage_div_178_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.clearAdvancedFilters()); });
    i0.ɵɵelementStart(37, "span", 102);
    i0.ɵɵelement(38, "i", 92);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40, "Clear");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("options", ctx_r1.industryOptions())("ngModel", ctx_r1.industryFilter());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r1.territoryOptions())("ngModel", ctx_r1.territoryFilter());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r1.ownerIdOptions())("ngModel", ctx_r1.ownerIdFilter());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.createdFrom())("showIcon", true);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.createdTo())("showIcon", true);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.minRevenue());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r1.maxRevenue());
} }
function CustomersPage_div_179_span_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 148);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "i", 149);
    i0.ɵɵlistener("click", function CustomersPage_div_179_span_3_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.searchTerm = ""; return i0.ɵɵresetView(ctx_r1.onSearch("")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \"", ctx_r1.searchTerm, "\" ");
} }
function CustomersPage_div_179_span_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 148);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "i", 149);
    i0.ɵɵlistener("click", function CustomersPage_div_179_span_4_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.statusFilter = "all"; return i0.ɵɵresetView(ctx_r1.onStatusChange("all")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.statusFilter, " ");
} }
function CustomersPage_div_179_span_5_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 148);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "i", 149);
    i0.ɵɵlistener("click", function CustomersPage_div_179_span_5_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onOwnerFilterChange("all")); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.ownerFilter(), " ");
} }
function CustomersPage_div_179_span_6_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 148);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "i", 149);
    i0.ɵɵlistener("click", function CustomersPage_div_179_span_6_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.industryFilter.set(null); return i0.ɵɵresetView(ctx_r1.applyAdvancedFilters()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.industryFilter(), " ");
} }
function CustomersPage_div_179_span_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 148);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "i", 149);
    i0.ɵɵlistener("click", function CustomersPage_div_179_span_7_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.territoryFilter.set(null); return i0.ɵɵresetView(ctx_r1.applyAdvancedFilters()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.territoryFilter(), " ");
} }
function CustomersPage_div_179_span_8_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span", 148);
    i0.ɵɵtext(1);
    i0.ɵɵelementStart(2, "i", 149);
    i0.ɵɵlistener("click", function CustomersPage_div_179_span_8_Template_i_click_2_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.minRevenue.set(null); ctx_r1.maxRevenue.set(null); return i0.ɵɵresetView(ctx_r1.applyAdvancedFilters()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" Revenue: ", ctx_r1.minRevenue() != null ? "$" + ctx_r1.minRevenue() : "\u221E", " \u2013 ", ctx_r1.maxRevenue() != null ? "$" + ctx_r1.maxRevenue() : "\u221E", " ");
} }
function CustomersPage_div_179_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 145)(1, "span", 146);
    i0.ɵɵtext(2, "Active filters:");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, CustomersPage_div_179_span_3_Template, 3, 1, "span", 147)(4, CustomersPage_div_179_span_4_Template, 3, 1, "span", 147)(5, CustomersPage_div_179_span_5_Template, 3, 1, "span", 147)(6, CustomersPage_div_179_span_6_Template, 3, 1, "span", 147)(7, CustomersPage_div_179_span_7_Template, 3, 1, "span", 147)(8, CustomersPage_div_179_span_8_Template, 3, 2, "span", 147);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.searchTerm);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.statusFilter !== "all");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.ownerFilter() !== "all");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.industryFilter());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.territoryFilter());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.minRevenue() != null || ctx_r1.maxRevenue() != null);
} }
function CustomersPage_div_204_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 152);
    i0.ɵɵelement(1, "div", 153)(2, "div", 154)(3, "div", 155)(4, "div", 156)(5, "div", 154)(6, "div", 157);
    i0.ɵɵelementEnd();
} }
function CustomersPage_div_204_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 150);
    i0.ɵɵtemplate(1, CustomersPage_div_204_div_1_Template, 7, 0, "div", 151);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c2));
} }
function CustomersPage_div_205_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 158)(1, "div", 159);
    i0.ɵɵelement(2, "i", 160);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "No customers found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Try adjusting your search or filters to find what you're looking for");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 161);
    i0.ɵɵlistener("click", function CustomersPage_div_205_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.resetFilters()); });
    i0.ɵɵelement(8, "i", 27);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "Reset Filters");
    i0.ɵɵelementEnd()()();
} }
function CustomersPage_div_206_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "th", 166)(2, "p-checkbox", 167);
    i0.ɵɵlistener("onChange", function CustomersPage_div_206_ng_template_2_Template_p_checkbox_onChange_2_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleSelectAll($event.checked)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "th", 168);
    i0.ɵɵtext(4, "Customer ");
    i0.ɵɵelement(5, "p-sortIcon", 169);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th", 170);
    i0.ɵɵtext(7, "Company ");
    i0.ɵɵelement(8, "p-sortIcon", 171);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 172);
    i0.ɵɵtext(10, "Status ");
    i0.ɵɵelement(11, "p-sortIcon", 173);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th");
    i0.ɵɵtext(13, "Contact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 174);
    i0.ɵɵtext(15, "Owner ");
    i0.ɵɵelement(16, "p-sortIcon", 175);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th", 176);
    i0.ɵɵtext(18, "Actions");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r1.selectedIds().length && ctx_r1.selectedIds().length === ctx_r1.filteredCustomers().length);
} }
function CustomersPage_div_206_ng_template_3_span_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 197);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r12.phone);
} }
function CustomersPage_div_206_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 177);
    i0.ɵɵlistener("click", function CustomersPage_div_206_ng_template_3_Template_tr_click_0_listener($event) { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onRowClick(row_r12, $event)); });
    i0.ɵɵelementStart(1, "td", 178)(2, "p-checkbox", 167);
    i0.ɵɵlistener("onChange", function CustomersPage_div_206_ng_template_3_Template_p_checkbox_onChange_2_listener($event) { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleSelection(row_r12.id, $event.checked)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "td", 179)(4, "div", 180);
    i0.ɵɵelement(5, "img", 181);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 182)(7, "span", 183);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 184);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "td")(13, "span", 185);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "td")(16, "p-select", 186);
    i0.ɵɵlistener("ngModelChange", function CustomersPage_div_206_ng_template_3_Template_p_select_ngModelChange_16_listener($event) { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onInlineStatusChange(row_r12, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "td")(18, "div", 187)(19, "span", 188);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, CustomersPage_div_206_ng_template_3_span_21_Template, 2, 1, "span", 189);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "td")(23, "p-select", 190);
    i0.ɵɵlistener("ngModelChange", function CustomersPage_div_206_ng_template_3_Template_p_select_ngModelChange_23_listener($event) { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onInlineOwnerChange(row_r12, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "td", 191)(25, "div", 192)(26, "button", 193);
    i0.ɵɵlistener("click", function CustomersPage_div_206_ng_template_3_Template_button_click_26_listener($event) { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.onEdit(row_r12); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(27, "i", 194);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "button", 195);
    i0.ɵɵlistener("click", function CustomersPage_div_206_ng_template_3_Template_button_click_28_listener($event) { const row_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); ctx_r1.onDelete(row_r12); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(29, "i", 196);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const row_r12 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r1.isSelected(row_r12.id));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", row_r12.profilePictureUrl || "https://i.pravatar.cc/150?u=" + (row_r12.email || row_r12.id), i0.ɵɵsanitizeUrl)("alt", row_r12.name + " avatar")("title", row_r12.name + " avatar");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r12.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Added ", i0.ɵɵpipeBind2(11, 17, row_r12.createdAt, "MMM d, yyyy"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(row_r12.company || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("options", ctx_r1.statusOptionsInline)("ngModel", row_r12.status);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(row_r12.email || "\u2014");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r12.phone);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("options", ctx_r1.ownerOptionsForAssign())("ngModel", row_r12.ownerId)("disabled", !ctx_r1.canManage());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
} }
function CustomersPage_div_206_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 162)(1, "p-table", 163);
    i0.ɵɵtemplate(2, CustomersPage_div_206_ng_template_2_Template, 19, 2, "ng-template", 164)(3, CustomersPage_div_206_ng_template_3_Template, 30, 20, "ng-template", 165);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.filteredCustomers());
} }
function CustomersPage_div_207_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 200)(1, "div", 201)(2, "div", 202);
    i0.ɵɵelement(3, "img", 181);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 203);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 204)(7, "h3", 205);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 206);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 207)(12, "div", 208);
    i0.ɵɵelement(13, "i", 209);
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 208);
    i0.ɵɵelement(17, "i", 210);
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 208);
    i0.ɵɵelement(21, "i", 41);
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(24, "div", 211)(25, "button", 212);
    i0.ɵɵlistener("click", function CustomersPage_div_207_div_1_Template_button_click_25_listener() { const row_r14 = i0.ɵɵrestoreView(_r13).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onEdit(row_r14)); });
    i0.ɵɵelementStart(26, "span", 213);
    i0.ɵɵelement(27, "i", 194);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(28, " Edit ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "button", 214);
    i0.ɵɵlistener("click", function CustomersPage_div_207_div_1_Template_button_click_29_listener() { const row_r14 = i0.ɵɵrestoreView(_r13).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onDelete(row_r14)); });
    i0.ɵɵelementStart(30, "span", 213);
    i0.ɵɵelement(31, "i", 196);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(32, " Delete ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r14 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", row_r14.profilePictureUrl || "https://i.pravatar.cc/150?u=" + (row_r14.email || row_r14.id), i0.ɵɵsanitizeUrl)("alt", row_r14.name + " avatar")("title", row_r14.name + " avatar");
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-status", row_r14.status.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", row_r14.status, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r14.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r14.company || "No company");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(row_r14.email || "No email");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(row_r14.phone || "No phone");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(row_r14.owner || "Unassigned");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
} }
function CustomersPage_div_207_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 198);
    i0.ɵɵtemplate(1, CustomersPage_div_207_div_1_Template, 33, 12, "div", 199);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.filteredCustomers());
} }
function CustomersPage_footer_208_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "footer", 215)(1, "div", 216);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-paginator", 217);
    i0.ɵɵlistener("onPageChange", function CustomersPage_footer_208_Template_p_paginator_onPageChange_3_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPageChange($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" Showing ", ctx_r1.pageIndex * ctx_r1.rows + 1, " - ", ctx_r1.Math.min((ctx_r1.pageIndex + 1) * ctx_r1.rows, ctx_r1.total()), " of ", ctx_r1.total(), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("rows", ctx_r1.rows)("totalRecords", ctx_r1.total())("rowsPerPageOptions", i0.ɵɵpureFunction0(7, _c3))("first", ctx_r1.pageIndex * ctx_r1.rows);
} }
function CustomersPage_ng_template_215_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 218);
    i0.ɵɵlistener("click", function CustomersPage_ng_template_215_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.assignDialogVisible = false); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 219);
    i0.ɵɵlistener("click", function CustomersPage_ng_template_215_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r16); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmBulkAssign()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.assignOwnerId || !ctx_r1.canManage());
} }
function CustomersPage_ng_template_221_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 218);
    i0.ɵɵlistener("click", function CustomersPage_ng_template_221_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.statusDialogVisible = false); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 220);
    i0.ɵɵlistener("click", function CustomersPage_ng_template_221_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r17); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmBulkStatusUpdate()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.bulkStatus || !ctx_r1.canManage());
} }
function CustomersPage_div_236_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 221);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.importError());
} }
function CustomersPage_div_237_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 222)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_2_0;
    const job_r18 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Status: ", ((tmp_2_0 = ctx_r1.importStatus()) == null ? null : tmp_2_0.status) || job_r18.status);
} }
function CustomersPage_div_238_div_8_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const err_r19 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" Row ", err_r19.rowNumber, ": ", err_r19.message, " ");
} }
function CustomersPage_div_238_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 226)(1, "p");
    i0.ɵɵtext(2, "Errors (first 5):");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul");
    i0.ɵɵtemplate(4, CustomersPage_div_238_div_8_li_4_Template, 2, 2, "li", 227);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const result_r20 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", result_r20.errors.slice(0, 5));
} }
function CustomersPage_div_238_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 223)(1, "div", 224)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, CustomersPage_div_238_div_8_Template, 5, 1, "div", 225);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const result_r20 = ctx.ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Rows: ", result_r20.total);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Imported: ", result_r20.imported);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Skipped: ", result_r20.skipped);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", result_r20.errors.length);
} }
export class CustomersPage {
    customerData;
    router;
    userAdminData;
    toastService;
    importJobs;
    statusOptions = [
        { label: 'All', value: 'all' },
        { label: 'Lead', value: 'Lead' },
        { label: 'Prospect', value: 'Prospect' },
        { label: 'Customer', value: 'Customer' }
    ];
    statusOptionsInline = this.statusOptions.filter((option) => option.value !== 'all');
    segmentOptions = [
        { label: 'All records', value: 'all', description: 'Everything returned by the current query' },
        { label: 'New this week', value: 'recent', description: 'Created in the last 7 days' },
        {
            label: 'Needs follow-up',
            value: 'attention',
            description: 'Leads or prospects with no recent motion'
        },
        { label: 'Active customers', value: 'customers', description: 'Live customers only' }
    ];
    customers = signal([], ...(ngDevMode ? [{ debugName: "customers" }] : []));
    total = signal(0, ...(ngDevMode ? [{ debugName: "total" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    ownerFilter = signal('all', ...(ngDevMode ? [{ debugName: "ownerFilter" }] : []));
    segmentFilter = signal('all', ...(ngDevMode ? [{ debugName: "segmentFilter" }] : []));
    ownerOptions = computed(() => {
        const owners = Array.from(new Set(this.customers().map((c) => c.owner))).filter((o) => !!o);
        return [
            { label: 'Any owner', value: 'all' },
            ...owners.sort().map((owner) => ({ label: owner, value: owner }))
        ];
    }, ...(ngDevMode ? [{ debugName: "ownerOptions" }] : []));
    filteredCustomers = computed(() => {
        const owner = this.ownerFilter();
        const segment = this.segmentFilter();
        let rows = [...this.customers()];
        if (owner !== 'all') {
            rows = rows.filter((c) => c.owner === owner);
        }
        if (segment === 'recent') {
            rows = rows.filter((c) => this.daysSince(c.createdAt) <= 7);
        }
        else if (segment === 'attention') {
            rows = rows.filter((c) => (c.status === 'Lead' || c.status === 'Prospect') && this.daysSince(c.createdAt) > 30);
        }
        else if (segment === 'customers') {
            rows = rows.filter((c) => c.status === 'Customer');
        }
        return rows;
    }, ...(ngDevMode ? [{ debugName: "filteredCustomers" }] : []));
    canManage = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.customersManage);
    }, ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    metrics = computed(() => {
        const rows = this.customers();
        const leads = rows.filter((c) => c.status === 'Lead').length;
        const prospects = rows.filter((c) => c.status === 'Prospect').length;
        const activeCustomers = rows.filter((c) => c.status === 'Customer').length;
        const newThisWeek = rows.filter((c) => this.daysSince(c.createdAt) <= 7).length;
        return {
            total: this.total(),
            leads,
            prospects,
            activeCustomers,
            newThisWeek
        };
    }, ...(ngDevMode ? [{ debugName: "metrics" }] : []));
    searchTerm = '';
    statusFilter = 'all';
    pageIndex = 0;
    rows = 10;
    viewMode = 'table';
    // Advanced filter state
    showAdvancedFilters = false;
    industryFilter = signal(null, ...(ngDevMode ? [{ debugName: "industryFilter" }] : []));
    territoryFilter = signal(null, ...(ngDevMode ? [{ debugName: "territoryFilter" }] : []));
    ownerIdFilter = signal(null, ...(ngDevMode ? [{ debugName: "ownerIdFilter" }] : []));
    createdFrom = signal(null, ...(ngDevMode ? [{ debugName: "createdFrom" }] : []));
    createdTo = signal(null, ...(ngDevMode ? [{ debugName: "createdTo" }] : []));
    minRevenue = signal(null, ...(ngDevMode ? [{ debugName: "minRevenue" }] : []));
    maxRevenue = signal(null, ...(ngDevMode ? [{ debugName: "maxRevenue" }] : []));
    advancedFiltersActive = computed(() => !!this.industryFilter() || !!this.territoryFilter() || !!this.ownerIdFilter()
        || !!this.createdFrom() || !!this.createdTo()
        || this.minRevenue() != null || this.maxRevenue() != null, ...(ngDevMode ? [{ debugName: "advancedFiltersActive" }] : []));
    industryOptions = signal([], ...(ngDevMode ? [{ debugName: "industryOptions" }] : []));
    territoryOptions = signal([], ...(ngDevMode ? [{ debugName: "territoryOptions" }] : []));
    ownerIdOptions = signal([], ...(ngDevMode ? [{ debugName: "ownerIdOptions" }] : []));
    Math = Math;
    selectedIds = signal([], ...(ngDevMode ? [{ debugName: "selectedIds" }] : []));
    bulkActions = computed(() => {
        const disabled = !this.canManage();
        return [
            { id: 'assign-owner', label: 'Assign owner', icon: 'pi pi-user', disabled },
            { id: 'change-status', label: 'Change status', icon: 'pi pi-tag', disabled },
            { id: 'delete', label: 'Delete', icon: 'pi pi-trash', severity: 'danger', disabled }
        ];
    }, ...(ngDevMode ? [{ debugName: "bulkActions" }] : []));
    ownerOptionsForAssign = signal([], ...(ngDevMode ? [{ debugName: "ownerOptionsForAssign" }] : []));
    assignDialogVisible = false;
    assignOwnerId = null;
    statusDialogVisible = false;
    bulkStatus = null;
    importDialogVisible = false;
    importFile = null;
    importJob = signal(null, ...(ngDevMode ? [{ debugName: "importJob" }] : []));
    importStatus = signal(null, ...(ngDevMode ? [{ debugName: "importStatus" }] : []));
    importError = signal(null, ...(ngDevMode ? [{ debugName: "importError" }] : []));
    importing = signal(false, ...(ngDevMode ? [{ debugName: "importing" }] : []));
    importPoll;
    constructor(customerData, router, userAdminData, toastService, importJobs) {
        this.customerData = customerData;
        this.router = router;
        this.userAdminData = userAdminData;
        this.toastService = toastService;
        this.importJobs = importJobs;
        const toast = history.state?.toast;
        if (toast) {
            this.toastService.show(toast.tone, toast.message, 3000);
        }
        this.load();
        this.loadOwners();
    }
    load() {
        this.loading.set(true);
        const status = this.statusFilter === 'all' ? undefined : this.statusFilter;
        const from = this.createdFrom();
        const to = this.createdTo();
        this.customerData
            .search({
            search: this.searchTerm || undefined,
            status,
            page: this.pageIndex + 1,
            pageSize: this.rows,
            industry: this.industryFilter() || undefined,
            territory: this.territoryFilter() || undefined,
            ownerId: this.ownerIdFilter() || undefined,
            createdFrom: from ? this.formatDateParam(from) : undefined,
            createdTo: to ? this.formatDateParam(to) : undefined,
            minRevenue: this.minRevenue() ?? undefined,
            maxRevenue: this.maxRevenue() ?? undefined
        })
            .subscribe((res) => {
            this.customers.set(res.items);
            this.total.set(res.total);
            this.loading.set(false);
            this.selectedIds.set([]);
            this.updateFilterOptions(res.items);
        });
    }
    onCreate() {
        this.router.navigate(['/app/customers/new']);
    }
    openImport() {
        this.importDialogVisible = true;
        this.importFile = null;
        this.importJob.set(null);
        this.importStatus.set(null);
        this.importError.set(null);
        this.stopImportPolling();
    }
    closeImport() {
        this.importDialogVisible = false;
        this.stopImportPolling();
    }
    onImportFileSelected(event) {
        if (event && 'files' in event && event.files) {
            this.importFile = event.files.length ? event.files[0] : null;
            return;
        }
        if (event instanceof Event) {
            const input = event.target;
            const files = input?.files;
            this.importFile = files && files.length ? files[0] : null;
            return;
        }
        this.importFile = null;
    }
    onImport() {
        if (!this.importFile)
            return;
        this.importing.set(true);
        this.importError.set(null);
        this.customerData.importCsv(this.importFile).subscribe({
            next: (job) => {
                this.importJob.set(job);
                this.importStatus.set(null);
                this.raiseToast('success', 'Customer import queued.');
                this.startImportPolling(job.id);
            },
            error: () => {
                this.importError.set('Import failed. Please check your CSV and try again.');
                this.importing.set(false);
                this.raiseToast('error', 'Customer import failed.');
            }
        });
    }
    onEdit(row) {
        this.router.navigate(['/app/customers', row.id, 'edit']);
    }
    onView(row) {
        this.router.navigate(['/app/customers', row.id]);
    }
    onRowClick(row, event) {
        if (this.isInteractiveRowTarget(event)) {
            return;
        }
        this.onView(row);
    }
    onDelete(row) {
        const confirmed = confirm(`Delete ${row.name}?`);
        if (!confirmed)
            return;
        this.customerData.delete(row.id).subscribe({
            next: () => {
                this.load();
                this.raiseToast('success', 'Customer deleted.');
            },
            error: () => this.raiseToast('error', 'Unable to delete customer.')
        });
    }
    onSearch(term) {
        this.searchTerm = term;
        this.pageIndex = 0;
        this.load();
    }
    onOwnerFilterChange(value) {
        this.ownerFilter.set(value ?? 'all');
    }
    onSegmentChange(value) {
        this.segmentFilter.set(value ?? 'all');
    }
    setViewMode(mode) {
        this.viewMode = mode;
    }
    resetFilters() {
        this.statusFilter = 'all';
        this.ownerFilter.set('all');
        this.segmentFilter.set('all');
        this.searchTerm = '';
        this.pageIndex = 0;
        this.industryFilter.set(null);
        this.territoryFilter.set(null);
        this.ownerIdFilter.set(null);
        this.createdFrom.set(null);
        this.createdTo.set(null);
        this.minRevenue.set(null);
        this.maxRevenue.set(null);
        this.load();
    }
    onStatusChange(value) {
        this.statusFilter = value;
        this.pageIndex = 0;
        this.load();
    }
    onExport() {
        const rows = this.filteredCustomers();
        const columns = [
            { header: 'Name', value: (row) => row.name },
            { header: 'Company', value: (row) => row.company },
            { header: 'Email', value: (row) => row.email },
            { header: 'Phone', value: (row) => row.phone },
            { header: 'Status', value: (row) => row.status },
            { header: 'Owner', value: (row) => row.owner },
            { header: 'Created At', value: (row) => row.createdAt }
        ];
        exportToCsv(rows, columns, 'customers.csv');
    }
    onInlineStatusChange(row, status) {
        if (!status || row.status === status) {
            return;
        }
        this.customerData.updateLifecycle(row.id, status).subscribe({
            next: () => this.load(),
            error: () => {
                alert('Status update failed. Please try again.');
            }
        });
    }
    onInlineOwnerChange(row, ownerId) {
        if (!ownerId || row.ownerId === ownerId) {
            return;
        }
        this.customerData.updateOwner(row.id, ownerId).subscribe({
            next: () => this.load(),
            error: () => {
                alert('Owner update failed. Please try again.');
            }
        });
    }
    onPageChange(event) {
        this.pageIndex = event.page ?? 0;
        this.rows = event.rows ?? this.rows;
        this.load();
    }
    startImportPolling(jobId) {
        this.stopImportPolling();
        this.importing.set(true);
        this.importPoll = timer(0, 2000)
            .pipe(switchMap(() => this.importJobs.getStatus(jobId).pipe(catchError(() => {
            this.importError.set('Unable to check import status.');
            this.importing.set(false);
            this.raiseToast('error', 'Customer import status failed.');
            return of(null);
        }))), takeWhile((status) => !!status && (status.status === 'Queued' || status.status === 'Processing'), true), tap((status) => {
            if (!status)
                return;
            this.importStatus.set(status);
            if (status.status === 'Completed' && this.importing()) {
                this.importing.set(false);
                this.load();
                this.raiseToast('success', 'Customer import completed.');
            }
            if (status.status === 'Failed' && this.importing()) {
                this.importing.set(false);
                this.importError.set(status.errorMessage ?? 'Import failed. Please check your CSV and try again.');
                this.raiseToast('error', 'Customer import failed.');
            }
        }))
            .subscribe();
    }
    stopImportPolling() {
        if (this.importPoll) {
            this.importPoll.unsubscribe();
            this.importPoll = undefined;
        }
    }
    statusSeverity(status) {
        switch (status) {
            case 'Lead':
                return 'info';
            case 'Prospect':
                return 'warn';
            default:
                return 'info';
        }
    }
    daysSince(dateIso) {
        const timestamp = Date.parse(dateIso);
        if (Number.isNaN(timestamp)) {
            return Number.MAX_SAFE_INTEGER;
        }
        const diff = Date.now() - timestamp;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }
    isSelected(id) {
        return this.selectedIds().includes(id);
    }
    toggleSelection(id, checked) {
        const current = new Set(this.selectedIds());
        if (checked) {
            current.add(id);
        }
        else {
            current.delete(id);
        }
        this.selectedIds.set(Array.from(current));
    }
    toggleSelectAll(checked) {
        if (checked) {
            this.selectedIds.set(this.filteredCustomers().map((row) => row.id));
            return;
        }
        this.selectedIds.set([]);
    }
    selectAllFiltered() {
        this.selectedIds.set(this.filteredCustomers().map((row) => row.id));
    }
    clearSelection() {
        this.selectedIds.set([]);
    }
    onBulkAction(action) {
        if (action.id === 'assign-owner') {
            this.assignDialogVisible = true;
            return;
        }
        if (action.id === 'change-status') {
            this.statusDialogVisible = true;
            return;
        }
        if (action.id === 'delete') {
            this.confirmBulkDelete();
        }
    }
    confirmBulkDelete() {
        const ids = this.selectedIds();
        if (!ids.length) {
            return;
        }
        const confirmed = confirm(`Delete ${ids.length} customers?`);
        if (!confirmed) {
            return;
        }
        const deletes$ = ids.map((id) => this.customerData.delete(id).pipe(map(() => true), catchError(() => of(false))));
        forkJoin(deletes$).subscribe((results) => {
            const failures = results.filter((ok) => !ok).length;
            this.clearSelection();
            this.load();
            if (failures) {
                this.raiseToast('error', `${failures} customers could not be deleted.`);
                return;
            }
            this.raiseToast('success', 'Customers deleted.');
        });
    }
    confirmBulkAssign() {
        const ids = this.selectedIds();
        if (!ids.length || !this.assignOwnerId) {
            return;
        }
        this.customerData.bulkAssignOwner(ids, this.assignOwnerId).subscribe({
            next: () => {
                this.assignDialogVisible = false;
                this.assignOwnerId = null;
                this.clearSelection();
                this.load();
                this.raiseToast('success', 'Owner assigned.');
            },
            error: () => {
                this.raiseToast('error', 'Owner assignment failed.');
            }
        });
    }
    confirmBulkStatusUpdate() {
        const ids = this.selectedIds();
        if (!ids.length || !this.bulkStatus) {
            return;
        }
        this.customerData.bulkUpdateLifecycle(ids, this.bulkStatus).subscribe({
            next: () => {
                this.statusDialogVisible = false;
                this.bulkStatus = null;
                this.clearSelection();
                this.load();
                this.raiseToast('success', 'Status updated.');
            },
            error: () => {
                this.raiseToast('error', 'Status update failed.');
            }
        });
    }
    clearToast() {
        this.toastService.clear();
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    isInteractiveRowTarget(event) {
        const target = event.target;
        if (!target) {
            return false;
        }
        return !!target.closest('button,a,input,textarea,select,label,.p-select,.p-checkbox,.p-button,.inline-select,.row-actions');
    }
    loadOwners() {
        this.userAdminData.search({ includeInactive: false, page: 1, pageSize: 200 }).subscribe((res) => {
            const options = res.items.map((user) => ({ label: user.fullName, value: user.id }));
            this.ownerOptionsForAssign.set(options);
            this.ownerIdOptions.set([{ label: 'Any owner', value: '' }, ...options]);
        });
    }
    toggleAdvancedFilters() {
        this.showAdvancedFilters = !this.showAdvancedFilters;
    }
    applyAdvancedFilters() {
        this.pageIndex = 0;
        this.load();
    }
    clearAdvancedFilters() {
        this.industryFilter.set(null);
        this.territoryFilter.set(null);
        this.ownerIdFilter.set(null);
        this.createdFrom.set(null);
        this.createdTo.set(null);
        this.minRevenue.set(null);
        this.maxRevenue.set(null);
        this.pageIndex = 0;
        this.load();
    }
    formatDateParam(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }
    updateFilterOptions(items) {
        const industries = Array.from(new Set(items.map(c => c.industry).filter((v) => !!v))).sort();
        if (!this.industryOptions().length || industries.length > this.industryOptions().length - 1) {
            this.industryOptions.set([{ label: 'Any industry', value: '' }, ...industries.map(i => ({ label: i, value: i }))]);
        }
        const territories = Array.from(new Set(items.map(c => c.territory).filter((v) => !!v))).sort();
        if (!this.territoryOptions().length || territories.length > this.territoryOptions().length - 1) {
            this.territoryOptions.set([{ label: 'Any territory', value: '' }, ...territories.map(t => ({ label: t, value: t }))]);
        }
    }
    static ɵfac = function CustomersPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomersPage)(i0.ɵɵdirectiveInject(i1.CustomerDataService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.UserAdminDataService), i0.ɵɵdirectiveInject(i4.AppToastService), i0.ɵɵdirectiveInject(i5.ImportJobService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomersPage, selectors: [["app-customers-page"]], decls: 239, vars: 79, consts: [[1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-stats"], [1, "hero-stat"], [1, "stat-value"], [1, "stat-label"], [1, "stat-bar"], [1, "stat-bar-fill", 2, "width", "100%"], [1, "stat-bar-fill", "stat-bar-fill--leads"], [1, "stat-bar-fill", "stat-bar-fill--prospects"], [1, "stat-bar-fill", "stat-bar-fill--success"], [1, "hero-actions"], ["pButton", "", "type", "button", 1, "btn", "btn-primary", "btn-glow", 3, "click", "disabled"], [1, "pi", "pi-plus"], [1, "btn-shine"], ["pButton", "", "type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "pi", "pi-refresh"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-chart-line"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend", "card-trend--up"], [1, "pi", "pi-arrow-up"], [1, "card-glow"], [1, "visual-card", "visual-card--secondary"], [1, "pi", "pi-users"], [1, "card-trend"], [1, "pi", "pi-user"], [1, "metrics-section"], [1, "metric-card", "metric-card--total"], [1, "metric-icon"], [1, "pi", "pi-database"], [1, "metric-content"], [1, "metric-label"], [1, "metric-value"], [1, "metric-chart"], ["viewBox", "0 0 100 40", 1, "sparkline"], ["d", "M0,35 Q25,30 50,20 T100,15", "fill", "none", "stroke", "url(#gradient-blue)", "stroke-width", "2"], ["id", "gradient-blue", "x1", "0%", "y1", "0%", "x2", "100%", "y2", "0%"], ["offset", "0%", "stop-color", "#667eea"], ["offset", "100%", "stop-color", "#764ba2"], [1, "metric-card", "metric-card--leads"], [1, "pi", "pi-bolt"], [1, "metric-ring"], ["viewBox", "0 0 36 36"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-bg"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--cyan"], [1, "metric-card", "metric-card--prospects"], [1, "pi", "pi-star"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--purple"], [1, "metric-card", "metric-card--customers"], [1, "pi", "pi-check-circle"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--green"], [1, "metric-card", "metric-card--new"], [1, "pi", "pi-calendar-plus"], [1, "metric-badge"], [1, "filter-section"], [1, "filter-bar"], [1, "search-wrapper"], [1, "pi", "pi-search", "search-icon"], ["pInputText", "", "type", "search", "placeholder", "Search customers, companies, emails...", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "search-kbd"], [1, "filter-pills"], [1, "filter-pill"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Owner", "styleClass", "filter-select", 3, "ngModelChange", "options", "ngModel"], [1, "pi", "pi-tag"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Status", "styleClass", "filter-select", 3, "ngModelChange", "options", "ngModel"], [1, "pi", "pi-filter"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Segment", "styleClass", "filter-select", 3, "ngModelChange", "options", "ngModel"], [1, "filter-actions"], [1, "view-switcher"], ["pButton", "", "type", "button", "title", "Table view", 1, "view-btn", 3, "click"], [1, "pi", "pi-list"], ["pButton", "", "type", "button", "title", "Card view", 1, "view-btn", 3, "click"], [1, "pi", "pi-th-large"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", 3, "click"], [1, "pi", "pi-sliders-h"], ["class", "filter-badge", 4, "ngIf"], [1, "pi", "pi-times"], ["class", "advanced-filter-panel", 4, "ngIf"], ["class", "filter-summary", 4, "ngIf"], [1, "data-section"], [1, "data-card"], [1, "data-header"], [1, "header-title"], [1, "record-count"], [1, "header-actions"], ["pButton", "", "type", "button", 1, "action-btn", "action-btn--import", 3, "click", "disabled"], [1, "action-btn__icon"], [1, "pi", "pi-upload"], ["pButton", "", "type", "button", 1, "action-btn", "action-btn--export", 3, "click"], [1, "pi", "pi-download"], ["pButton", "", "type", "button", 1, "action-btn", "action-btn--columns", 3, "disabled"], [1, "pi", "pi-cog"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "table-wrapper", 4, "ngIf"], ["class", "cards-wrapper", 4, "ngIf"], ["class", "data-footer", 4, "ngIf"], [3, "actionClicked", "clearSelection", "selectAll", "actions", "selectedItems", "totalCount"], ["header", "Assign owner", 3, "visibleChange", "visible", "modal"], [1, "bulk-assign"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Select owner", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["pTemplate", "footer"], ["header", "Change status", 3, "visibleChange", "visible", "modal"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Select status", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["header", "Import customers", 3, "visibleChange", "onHide", "visible", "modal", "dismissableMask"], [1, "import-dialog"], [1, "import-note"], [1, "import-upload"], ["mode", "basic", "name", "file", "accept", ".csv", 3, "onSelect", "auto", "customUpload", "showUploadButton", "showCancelButton", "chooseLabel"], [1, "import-actions"], ["pButton", "", "type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["class", "import-error", 4, "ngIf"], ["class", "import-status", 4, "ngIf"], ["class", "import-result", 4, "ngIf"], [1, "filter-badge"], [1, "advanced-filter-panel"], [1, "filter-grid"], [1, "filter-field"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Any industry", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Any territory", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Any owner", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["dateFormat", "yy-mm-dd", "appendTo", "body", "placeholder", "Start date", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "showIcon"], ["dateFormat", "yy-mm-dd", "appendTo", "body", "placeholder", "End date", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "showIcon"], ["mode", "currency", "currency", "USD", "locale", "en-US", "placeholder", "Min", "styleClass", "w-full", 3, "ngModelChange", "ngModel"], ["mode", "currency", "currency", "USD", "locale", "en-US", "placeholder", "Max", "styleClass", "w-full", 3, "ngModelChange", "ngModel"], [1, "filter-field", "filter-field--actions"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click"], [1, "pi", "pi-search"], ["type", "button", 1, "action-btn", "action-btn--settings", 3, "click"], [1, "filter-summary"], [1, "summary-label"], ["class", "filter-tag", 4, "ngIf"], [1, "filter-tag"], [1, "pi", "pi-times", 3, "click"], [1, "loading-state"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton", "skeleton-avatar"], [1, "skeleton", "skeleton-text"], [1, "skeleton", "skeleton-text", "skeleton-short"], [1, "skeleton", "skeleton-badge"], [1, "skeleton", "skeleton-actions"], [1, "empty-state"], [1, "empty-icon"], [1, "pi", "pi-inbox"], ["pButton", "", "type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "table-wrapper"], [1, "crm-table", "data-table", 3, "value"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "th-select"], [3, "onChange", "binary", "ngModel"], ["pSortableColumn", "name"], ["field", "name"], ["pSortableColumn", "company"], ["field", "company"], ["pSortableColumn", "status"], ["field", "status"], ["pSortableColumn", "ownerId"], ["field", "ownerId"], [1, "th-actions"], [1, "table-row", 3, "click"], [1, "td-select"], [1, "td-customer"], [1, "customer-avatar"], [3, "src", "alt", "title"], [1, "customer-info"], [1, "customer-name"], [1, "customer-date"], [1, "company-name"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "styleClass", "inline-select", 3, "ngModelChange", "options", "ngModel"], [1, "contact-info"], [1, "contact-email"], ["class", "contact-phone", 4, "ngIf"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Owner", "styleClass", "inline-select", 3, "ngModelChange", "options", "ngModel", "disabled"], [1, "td-actions"], [1, "row-actions"], ["type", "button", "title", "Edit", 1, "row-action-btn", "row-action-btn--edit", 3, "click", "disabled"], [1, "pi", "pi-pencil"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "pi", "pi-trash"], [1, "contact-phone"], [1, "cards-wrapper"], ["class", "customer-card", 4, "ngFor", "ngForOf"], [1, "customer-card"], [1, "card-header"], [1, "card-avatar"], [1, "card-status"], [1, "card-body"], [1, "card-name"], [1, "card-company"], [1, "card-details"], [1, "detail-row"], [1, "pi", "pi-envelope"], [1, "pi", "pi-phone"], [1, "card-footer"], ["pButton", "", "type", "button", 1, "card-btn", "card-btn--edit", 3, "click", "disabled"], [1, "card-btn__icon"], ["pButton", "", "type", "button", 1, "card-btn", "card-btn--delete", 3, "click", "disabled"], [1, "data-footer"], [1, "pagination-info"], ["styleClass", "modern-paginator", 3, "onPageChange", "rows", "totalRecords", "rowsPerPageOptions", "first"], ["pButton", "", "type", "button", "label", "Cancel", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "button", "label", "Assign", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Update", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], [1, "import-error"], [1, "import-status"], [1, "import-result"], [1, "import-metrics"], ["class", "import-errors", 4, "ngIf"], [1, "import-errors"], [4, "ngFor", "ngForOf"]], template: function CustomersPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵelement(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 5)(7, "div", 6)(8, "div", 7);
            i0.ɵɵelement(9, "span", 8);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Customer Intelligence Hub");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 9)(13, "span", 10);
            i0.ɵɵtext(14, "Customer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 11);
            i0.ɵɵtext(16, "Workspace");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 12);
            i0.ɵɵtext(18, " Manage relationships, track engagement, and drive growth with AI-powered insights ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 13)(20, "div", 14)(21, "div", 15);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 16);
            i0.ɵɵtext(24, "Total Customers");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 17);
            i0.ɵɵelement(26, "div", 18);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 14)(28, "div", 15);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 16);
            i0.ɵɵtext(31, "Active Leads");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 17);
            i0.ɵɵelement(33, "div", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 14)(35, "div", 15);
            i0.ɵɵtext(36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div", 16);
            i0.ɵɵtext(38, "Prospects");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 17);
            i0.ɵɵelement(40, "div", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "div", 14)(42, "div", 15);
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 16);
            i0.ɵɵtext(45, "Converted");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 17);
            i0.ɵɵelement(47, "div", 21);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(48, "div", 22)(49, "button", 23);
            i0.ɵɵlistener("click", function CustomersPage_Template_button_click_49_listener() { return ctx.onCreate(); });
            i0.ɵɵelement(50, "i", 24);
            i0.ɵɵelementStart(51, "span");
            i0.ɵɵtext(52, "Add Customer");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(53, "div", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "button", 26);
            i0.ɵɵlistener("click", function CustomersPage_Template_button_click_54_listener() { return ctx.load(); });
            i0.ɵɵelement(55, "i", 27);
            i0.ɵɵelementStart(56, "span");
            i0.ɵɵtext(57, "Refresh");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(58, "div", 28)(59, "div", 29)(60, "div", 30);
            i0.ɵɵelement(61, "i", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "div", 32)(63, "span", 33);
            i0.ɵɵtext(64, "This Week");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "strong", 34);
            i0.ɵɵtext(66);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "span", 35);
            i0.ɵɵelement(68, "i", 36);
            i0.ɵɵtext(69, " New records ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(70, "div", 37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "div", 38)(72, "div", 30);
            i0.ɵɵelement(73, "i", 39);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "div", 32)(75, "span", 33);
            i0.ɵɵtext(76, "Team Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "strong", 34);
            i0.ɵɵtext(78);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "span", 40);
            i0.ɵɵelement(80, "i", 41);
            i0.ɵɵtext(81, " Members ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(82, "div", 37);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(83, "section", 42)(84, "div", 43)(85, "div", 44);
            i0.ɵɵelement(86, "i", 45);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(87, "div", 46)(88, "span", 47);
            i0.ɵɵtext(89, "Total Records");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "strong", 48);
            i0.ɵɵtext(91);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(92, "div", 49);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(93, "svg", 50);
            i0.ɵɵelement(94, "path", 51);
            i0.ɵɵelementStart(95, "defs")(96, "linearGradient", 52);
            i0.ɵɵelement(97, "stop", 53)(98, "stop", 54);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(99, "div", 55)(100, "div", 44);
            i0.ɵɵelement(101, "i", 56);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(102, "div", 46)(103, "span", 47);
            i0.ɵɵtext(104, "Leads");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(105, "strong", 48);
            i0.ɵɵtext(106);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(107, "div", 57);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(108, "svg", 58);
            i0.ɵɵelement(109, "path", 59)(110, "path", 60);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(111, "div", 61)(112, "div", 44);
            i0.ɵɵelement(113, "i", 62);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(114, "div", 46)(115, "span", 47);
            i0.ɵɵtext(116, "Prospects");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(117, "strong", 48);
            i0.ɵɵtext(118);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(119, "div", 57);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(120, "svg", 58);
            i0.ɵɵelement(121, "path", 59)(122, "path", 63);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(123, "div", 64)(124, "div", 44);
            i0.ɵɵelement(125, "i", 65);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(126, "div", 46)(127, "span", 47);
            i0.ɵɵtext(128, "Customers");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(129, "strong", 48);
            i0.ɵɵtext(130);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(131, "div", 57);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(132, "svg", 58);
            i0.ɵɵelement(133, "path", 59)(134, "path", 66);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(135, "div", 67)(136, "div", 44);
            i0.ɵɵelement(137, "i", 68);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(138, "div", 46)(139, "span", 47);
            i0.ɵɵtext(140, "This Week");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(141, "strong", 48);
            i0.ɵɵtext(142);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(143, "div", 69)(144, "span");
            i0.ɵɵtext(145, "NEW");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(146, "section", 70)(147, "div", 71)(148, "div", 72);
            i0.ɵɵelement(149, "i", 73);
            i0.ɵɵelementStart(150, "input", 74);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomersPage_Template_input_ngModelChange_150_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function CustomersPage_Template_input_ngModelChange_150_listener($event) { return ctx.onSearch($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(151, "kbd", 75);
            i0.ɵɵtext(152, "\u2318K");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(153, "div", 76)(154, "div", 77);
            i0.ɵɵelement(155, "i", 41);
            i0.ɵɵelementStart(156, "p-select", 78);
            i0.ɵɵlistener("ngModelChange", function CustomersPage_Template_p_select_ngModelChange_156_listener($event) { return ctx.onOwnerFilterChange($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(157, "div", 77);
            i0.ɵɵelement(158, "i", 79);
            i0.ɵɵelementStart(159, "p-select", 80);
            i0.ɵɵlistener("ngModelChange", function CustomersPage_Template_p_select_ngModelChange_159_listener($event) { return ctx.onStatusChange($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(160, "div", 77);
            i0.ɵɵelement(161, "i", 81);
            i0.ɵɵelementStart(162, "p-select", 82);
            i0.ɵɵlistener("ngModelChange", function CustomersPage_Template_p_select_ngModelChange_162_listener($event) { return ctx.onSegmentChange($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(163, "div", 83)(164, "div", 84)(165, "button", 85);
            i0.ɵɵlistener("click", function CustomersPage_Template_button_click_165_listener() { return ctx.setViewMode("table"); });
            i0.ɵɵelement(166, "i", 86);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(167, "button", 87);
            i0.ɵɵlistener("click", function CustomersPage_Template_button_click_167_listener() { return ctx.setViewMode("cards"); });
            i0.ɵɵelement(168, "i", 88);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(169, "button", 89);
            i0.ɵɵlistener("click", function CustomersPage_Template_button_click_169_listener() { return ctx.toggleAdvancedFilters(); });
            i0.ɵɵelement(170, "i", 90);
            i0.ɵɵelementStart(171, "span");
            i0.ɵɵtext(172, "Filters");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(173, CustomersPage_span_173_Template, 1, 0, "span", 91);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(174, "button", 89);
            i0.ɵɵlistener("click", function CustomersPage_Template_button_click_174_listener() { return ctx.resetFilters(); });
            i0.ɵɵelement(175, "i", 92);
            i0.ɵɵelementStart(176, "span");
            i0.ɵɵtext(177, "Clear");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(178, CustomersPage_div_178_Template, 41, 12, "div", 93)(179, CustomersPage_div_179_Template, 9, 6, "div", 94);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(180, "section", 95)(181, "div", 96)(182, "header", 97)(183, "div", 98)(184, "h2");
            i0.ɵɵtext(185, "Customer Records");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(186, "span", 99);
            i0.ɵɵtext(187);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(188, "div", 100)(189, "button", 101);
            i0.ɵɵlistener("click", function CustomersPage_Template_button_click_189_listener() { return ctx.openImport(); });
            i0.ɵɵelementStart(190, "span", 102);
            i0.ɵɵelement(191, "i", 103);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(192, "span");
            i0.ɵɵtext(193, "Import");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(194, "button", 104);
            i0.ɵɵlistener("click", function CustomersPage_Template_button_click_194_listener() { return ctx.onExport(); });
            i0.ɵɵelementStart(195, "span", 102);
            i0.ɵɵelement(196, "i", 105);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(197, "span");
            i0.ɵɵtext(198, "Export");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(199, "button", 106)(200, "span", 102);
            i0.ɵɵelement(201, "i", 107);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(202, "span");
            i0.ɵɵtext(203, "Columns");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(204, CustomersPage_div_204_Template, 2, 2, "div", 108)(205, CustomersPage_div_205_Template, 11, 0, "div", 109)(206, CustomersPage_div_206_Template, 4, 1, "div", 110)(207, CustomersPage_div_207_Template, 2, 1, "div", 111)(208, CustomersPage_footer_208_Template, 4, 8, "footer", 112);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(209, "app-bulk-actions-bar", 113);
            i0.ɵɵlistener("actionClicked", function CustomersPage_Template_app_bulk_actions_bar_actionClicked_209_listener($event) { return ctx.onBulkAction($event); })("clearSelection", function CustomersPage_Template_app_bulk_actions_bar_clearSelection_209_listener() { return ctx.clearSelection(); })("selectAll", function CustomersPage_Template_app_bulk_actions_bar_selectAll_209_listener() { return ctx.selectAllFiltered(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(210, "p-dialog", 114);
            i0.ɵɵtwoWayListener("visibleChange", function CustomersPage_Template_p_dialog_visibleChange_210_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.assignDialogVisible, $event) || (ctx.assignDialogVisible = $event); return $event; });
            i0.ɵɵelementStart(211, "div", 115)(212, "label");
            i0.ɵɵtext(213, "Owner");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(214, "p-select", 116);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomersPage_Template_p_select_ngModelChange_214_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.assignOwnerId, $event) || (ctx.assignOwnerId = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(215, CustomersPage_ng_template_215_Template, 2, 1, "ng-template", 117);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(216, "p-dialog", 118);
            i0.ɵɵtwoWayListener("visibleChange", function CustomersPage_Template_p_dialog_visibleChange_216_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.statusDialogVisible, $event) || (ctx.statusDialogVisible = $event); return $event; });
            i0.ɵɵelementStart(217, "div", 115)(218, "label");
            i0.ɵɵtext(219, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(220, "p-select", 119);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomersPage_Template_p_select_ngModelChange_220_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.bulkStatus, $event) || (ctx.bulkStatus = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(221, CustomersPage_ng_template_221_Template, 2, 1, "ng-template", 117);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(222, "p-dialog", 120);
            i0.ɵɵtwoWayListener("visibleChange", function CustomersPage_Template_p_dialog_visibleChange_222_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.importDialogVisible, $event) || (ctx.importDialogVisible = $event); return $event; });
            i0.ɵɵlistener("onHide", function CustomersPage_Template_p_dialog_onHide_222_listener() { return ctx.closeImport(); });
            i0.ɵɵelementStart(223, "div", 121)(224, "p", 122);
            i0.ɵɵtext(225, " Upload a CSV with headers. Required column: ");
            i0.ɵɵelementStart(226, "strong");
            i0.ɵɵtext(227, "Name");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(228, ". ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(229, "label", 123)(230, "p-fileUpload", 124);
            i0.ɵɵlistener("onSelect", function CustomersPage_Template_p_fileUpload_onSelect_230_listener($event) { return ctx.onImportFileSelected($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(231, "div", 125)(232, "button", 89);
            i0.ɵɵlistener("click", function CustomersPage_Template_button_click_232_listener() { return ctx.closeImport(); });
            i0.ɵɵtext(233, "Cancel");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(234, "button", 126);
            i0.ɵɵlistener("click", function CustomersPage_Template_button_click_234_listener() { return ctx.onImport(); });
            i0.ɵɵtext(235);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(236, CustomersPage_div_236_Template, 2, 1, "div", 127)(237, CustomersPage_div_237_Template, 3, 1, "div", 128)(238, CustomersPage_div_238_Template, 9, 4, "div", 129);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(22);
            i0.ɵɵtextInterpolate(ctx.metrics().total || 0);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.metrics().leads);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.metrics().total ? ctx.metrics().leads / ctx.metrics().total * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.metrics().prospects);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.metrics().total ? ctx.metrics().prospects / ctx.metrics().total * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.metrics().activeCustomers);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.metrics().total ? ctx.metrics().activeCustomers / ctx.metrics().total * 100 : 0, "%");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(17);
            i0.ɵɵtextInterpolate1("+", ctx.metrics().newThisWeek);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.ownerOptions().length - 1);
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(ctx.metrics().total || "\u2014");
            i0.ɵɵadvance(15);
            i0.ɵɵtextInterpolate(ctx.metrics().leads);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.metrics().total ? ctx.metrics().leads / ctx.metrics().total * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.metrics().prospects);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.metrics().total ? ctx.metrics().prospects / ctx.metrics().total * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.metrics().activeCustomers);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.metrics().total ? ctx.metrics().activeCustomers / ctx.metrics().total * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.metrics().newThisWeek);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchTerm);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.ownerOptions())("ngModel", ctx.ownerFilter());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("options", ctx.statusOptions)("ngModel", ctx.statusFilter);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("options", ctx.segmentOptions)("ngModel", ctx.segmentFilter());
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.viewMode === "table");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.viewMode === "cards");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.showAdvancedFilters || ctx.advancedFiltersActive());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.advancedFiltersActive());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.showAdvancedFilters);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.searchTerm || ctx.statusFilter !== "all" || ctx.ownerFilter() !== "all" || ctx.advancedFiltersActive());
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate2(" ", ctx.filteredCustomers().length, " of ", ctx.total(), " records ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading() && !ctx.filteredCustomers().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading() && ctx.filteredCustomers().length && ctx.viewMode === "table");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading() && ctx.filteredCustomers().length && ctx.viewMode === "cards");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading() && ctx.filteredCustomers().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("actions", ctx.bulkActions())("selectedItems", ctx.selectedIds())("totalCount", ctx.filteredCustomers().length);
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(76, _c0));
            i0.ɵɵtwoWayProperty("visible", ctx.assignDialogVisible);
            i0.ɵɵproperty("modal", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.ownerOptionsForAssign());
            i0.ɵɵtwoWayProperty("ngModel", ctx.assignOwnerId);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(77, _c0));
            i0.ɵɵtwoWayProperty("visible", ctx.statusDialogVisible);
            i0.ɵɵproperty("modal", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.statusOptionsInline);
            i0.ɵɵtwoWayProperty("ngModel", ctx.bulkStatus);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(78, _c1));
            i0.ɵɵtwoWayProperty("visible", ctx.importDialogVisible);
            i0.ɵɵproperty("modal", true)("dismissableMask", true);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("auto", false)("customUpload", true)("showUploadButton", false)("showCancelButton", false)("chooseLabel", (ctx.importFile == null ? null : ctx.importFile.name) || "Choose CSV file");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", !ctx.importFile || ctx.importing() || !ctx.canManage());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.importing() ? "Importing..." : "Import", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.importError());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.importJob());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.importStatus());
        } }, dependencies: [NgIf,
            NgFor,
            FormsModule, i6.DefaultValueAccessor, i6.NgControlStatus, i6.NgModel, CardModule, i7.PrimeTemplate, CheckboxModule, i8.Checkbox, DatePickerModule, i9.DatePicker, FileUploadModule, i10.FileUpload, InputNumberModule, i11.InputNumber, TableModule, i12.Table, i12.SortableColumn, i12.SortIcon, TagModule,
            InputTextModule, i13.InputText, SelectModule, i14.Select, ButtonModule, i15.ButtonDirective, PaginatorModule, i16.Paginator, SkeletonModule,
            TooltipModule,
            DialogModule, i17.Dialog, BreadcrumbsComponent,
            BulkActionsBarComponent,
            DatePipe], styles: ["//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   CUSTOMERS[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   FUTURISTIC[_ngcontent-%COMP%]   ENTERPRISE[_ngcontent-%COMP%]   STYLING\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use[_ngcontent-%COMP%]   '../../../../../styles/design-tokens'[_ngcontent-%COMP%]   as[_ngcontent-%COMP%]   *[_ngcontent-%COMP%];\n@use 'sass:color';\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ANIMATIONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes[_ngcontent-%COMP%]   gradient-shift[_ngcontent-%COMP%] {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% { transform: translateY(0) rotate(0deg); }\n  25% { transform: translateY(-20px) rotate(5deg); }\n  75% { transform: translateY(10px) rotate(-5deg); }\n}\n\n@keyframes _ngcontent-%COMP%_pulse-glow {\n  0%, 100% { \n    opacity: 1;\n    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);\n  }\n  50% { \n    opacity: 0.8;\n    box-shadow: 0 0 40px rgba(102, 126, 234, 0.6);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(100%); }\n}\n\n@keyframes _ngcontent-%COMP%_ring-draw {\n  0% { stroke-dasharray: 0, 100; }\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_slide-in-right {\n  from {\n    opacity: 0;\n    transform: translateX(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n\n@keyframes _ngcontent-%COMP%_badge-pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.1); }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  25% {\n    transform: translate(50px, -30px) scale(1.1);\n  }\n  50% {\n    transform: translate(100px, 20px) scale(0.9);\n  }\n  75% {\n    transform: translate(30px, 50px) scale(1.05);\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   BASE[_ngcontent-%COMP%]   STYLES\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ANIMATED[_ngcontent-%COMP%]   BACKGROUND[_ngcontent-%COMP%]   ORBS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 600px;\n    height: 600px;\n    background: $primary-gradient;\n    top: -200px;\n    right: -100px;\n    animation-delay: 0s;\n  }\n\n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    bottom: 10%;\n    left: -100px;\n    animation-delay: -7s;\n    animation-duration: 25s;\n  }\n\n  &.orb-3 {\n    width: 300px;\n    height: 300px;\n    background: $secondary-gradient;\n    top: 40%;\n    right: 20%;\n    animation-delay: -14s;\n    animation-duration: 18s;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   HERO[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: _ngcontent-%COMP%_fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: _ngcontent-%COMP%_pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n//[_ngcontent-%COMP%]   Hero[_ngcontent-%COMP%]   title[_ngcontent-%COMP%]   uses[_ngcontent-%COMP%]   global[_ngcontent-%COMP%]   .hero-title[_ngcontent-%COMP%]   from[_ngcontent-%COMP%]   _components.scss\n\n.hero-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-4;\n  flex-wrap: wrap;\n  margin-top: $space-2;\n}\n\n.hero-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 80px;\n\n  .stat-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .stat-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .stat-bar {\n    width: 100%;\n    height: 4px;\n    background: $gray-200;\n    border-radius: $radius-full;\n    overflow: hidden;\n\n    .stat-bar-fill {\n      height: 100%;\n      background: $primary-gradient;\n      border-radius: $radius-full;\n      transition: width 1s ease-out;\n\n      &--leads { background: $cyan-gradient; }\n      &--prospects { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n      &--success { background: $success-gradient; }\n    }\n  }\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  margin-top: $space-2;\n  flex-wrap: wrap;\n}\n\n//[_ngcontent-%COMP%]   Hero[_ngcontent-%COMP%]   Visual[_ngcontent-%COMP%]   Cards\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: _ngcontent-%COMP%_slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform $transition-base, box-shadow $transition-base;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n\n  .card-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n  }\n\n  &--primary .card-icon {\n    background: $primary-gradient;\n    color: white;\n  }\n\n  &--secondary .card-icon {\n    background: $cyan-gradient;\n    color: white;\n  }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    &--up {\n      color: $success;\n    }\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   BUTTONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.btn[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  border: none;\n  border-radius: $radius-md;\n  font-size: $font-size-base;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all $transition-base;\n  overflow: hidden;\n\n  i {\n    font-size: $font-size-base;\n  }\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: $primary-gradient;\n  color: white;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n  }\n\n  &:active {\n    transform: translateY(0);\n  }\n}\n\n.btn-glow[_ngcontent-%COMP%] {\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);\n    animation: _ngcontent-%COMP%_shimmer 3s infinite;\n  }\n\n  .btn-shine {\n    position: absolute;\n    top: 0;\n    left: -100%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);\n    transition: left 0.4s ease;\n  }\n\n  &:hover .btn-shine {\n    left: 100%;\n  }\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  color: $gray-700;\n  box-shadow: $glass-shadow;\n\n  &:hover {\n    background: white;\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n}\n\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: $gray-600;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.05);\n    color: $gray-800;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   METRICS[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.metrics-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1400px) {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all $transition-base;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 5 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-lg;\n    color: white;\n    flex-shrink: 0;\n    transition: transform $transition-spring;\n  }\n\n  &--total .metric-icon { background: $primary-gradient; }\n  &--leads .metric-icon { background: $cyan-gradient; }\n  &--prospects .metric-icon { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n  &--customers .metric-icon { background: $success-gradient; }\n  &--new .metric-icon { background: $orange-gradient; }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n}\n\n//[_ngcontent-%COMP%]   Sparkline[_ngcontent-%COMP%]   Chart\n.metric-chart[_ngcontent-%COMP%] {\n  position: absolute;\n  right: $space-4;\n  bottom: $space-3;\n  width: 60px;\n  height: 24px;\n  opacity: 0.5;\n\n  .sparkline {\n    width: 100%;\n    height: 100%;\n  }\n}\n\n//[_ngcontent-%COMP%]   Ring[_ngcontent-%COMP%]   Chart\n.metric-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  right: $space-3;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: $gray-200;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n    animation: _ngcontent-%COMP%_ring-draw 1s ease-out;\n\n    &--cyan { stroke: $cyan; }\n    &--purple { stroke: $purple; }\n    &--green { stroke: $success; }\n  }\n}\n\n//[_ngcontent-%COMP%]   Badge\n.metric-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: $space-3;\n  right: $space-3;\n\n  span {\n    display: inline-block;\n    padding: $space-1 $space-2;\n    background: $orange-gradient;\n    color: white;\n    font-size: $font-size-xs;\n    font-weight: 700;\n    border-radius: $radius-sm;\n    animation: _ngcontent-%COMP%_badge-pulse 2s ease-in-out infinite;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   FILTER[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.filter-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 2;\n  margin-bottom: $space-4;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out 0.3s both;\n}\n\n.filter-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  flex-wrap: wrap;\n\n  @media (max-width: 900px) {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n\n.search-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  min-width: 240px;\n\n  .search-icon {\n    position: absolute;\n    left: $space-3;\n    top: 50%;\n    transform: translateY(-50%);\n    color: $gray-400;\n    font-size: $font-size-base;\n    transition: color $transition-fast;\n  }\n\n  .search-input {\n    width: 100%;\n    padding: $space-2 $space-3 $space-2 $space-8;\n    background: rgba(0, 0, 0, 0.03);\n    border: 1px solid transparent;\n    border-radius: $radius-md;\n    font-size: $font-size-base;\n    color: $gray-800;\n    transition: all $transition-fast;\n\n    &::placeholder {\n      color: $gray-400;\n    }\n\n    &:focus {\n      outline: none;\n      background: white;\n      border-color: $primary;\n      box-shadow: 0 0 0 4px rgba($primary, 0.1);\n\n      & + .search-icon,\n      & ~ .search-icon {\n        color: $primary;\n      }\n    }\n  }\n\n  .search-kbd {\n    position: absolute;\n    right: $space-3;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: $space-1 $space-2;\n    background: $gray-100;\n    border: 1px solid $gray-200;\n    border-radius: $radius-sm;\n    font-size: $font-size-xs;\n    font-family: system-ui, sans-serif;\n    color: $gray-500;\n  }\n}\n\n.filter-pills[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.filter-pill[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-1 $space-2;\n  background: rgba(0, 0, 0, 0.03);\n  border-radius: $radius-md;\n  transition: background $transition-fast;\n\n  i {\n    color: $gray-400;\n    font-size: $font-size-sm;\n  }\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.06);\n  }\n\n  ::ng-deep .filter-select {\n    .p-select {\n      background: transparent;\n      border: none;\n      box-shadow: none;\n      padding: 0;\n      min-width: 80px;\n\n      &:focus {\n        box-shadow: none;\n      }\n\n      .p-select-label {\n        padding: 2px $space-1;\n        font-size: $font-size-sm;\n        color: $gray-700;\n      }\n    }\n  }\n}\n\n.filter-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  margin-left: auto;\n\n  @media (max-width: 900px) {\n    margin-left: 0;\n    justify-content: space-between;\n  }\n}\n\n.view-switcher[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 2px;\n  background: rgba(0, 0, 0, 0.03);\n  border-radius: $radius-md;\n}\n\n.view-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-sm;\n  color: $gray-400;\n  cursor: pointer;\n  transition: all $transition-fast;\n\n  &:hover {\n    color: $gray-600;\n  }\n\n  &.active {\n    background: white;\n    color: $primary;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  }\n}\n\n.filter-summary[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  margin-top: $space-2;\n  flex-wrap: wrap;\n\n  .summary-label {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n\n  .filter-tag {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-1;\n    padding: 2px $space-2;\n    background: rgba($primary, 0.1);\n    border-radius: $radius-full;\n    font-size: $font-size-sm;\n    color: $primary;\n\n    i {\n      font-size: $font-size-xs;\n      cursor: pointer;\n      opacity: 0.7;\n      transition: opacity $transition-fast;\n\n      &:hover {\n        opacity: 1;\n      }\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   Advanced[_ngcontent-%COMP%]   filter[_ngcontent-%COMP%]   toggle[_ngcontent-%COMP%]   active[_ngcontent-%COMP%]   indicator\n.btn.btn-ghost.active[_ngcontent-%COMP%] {\n  background: rgba($primary, 0.08);\n  color: $primary;\n}\n\n.filter-badge[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: $primary;\n  flex-shrink: 0;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ADVANCED[_ngcontent-%COMP%]   FILTER[_ngcontent-%COMP%]   PANEL\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.advanced-filter-panel[_ngcontent-%COMP%] {\n  margin-top: $space-3;\n  padding: $space-4 $space-5;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  animation: _ngcontent-%COMP%_fade-in-up 0.3s ease-out;\n}\n\n.filter-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-4;\n  align-items: end;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.filter-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n\n  label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  &--actions {\n    display: flex;\n    flex-direction: row;\n    align-items: flex-end;\n    gap: $space-2;\n    justify-content: flex-start;\n  }\n\n  ::ng-deep {\n    .p-select {\n      width: 100%;\n    }\n\n    .p-datepicker {\n      width: 100%;\n    }\n\n    .p-inputnumber {\n      width: 100%;\n\n      .p-inputnumber-input {\n        width: 100%;\n      }\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DATA[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.data-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out 0.4s both;\n}\n\n.data-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  flex-wrap: wrap;\n  gap: $space-3;\n\n  .header-title {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n\n    h2 {\n      margin: 0;\n      font-size: $font-size-lg;\n      font-weight: 600;\n      color: $gray-800;\n    }\n\n    .record-count {\n      font-size: $font-size-sm;\n      color: $gray-500;\n    }\n  }\n\n  .header-actions {\n    display: flex;\n    gap: $space-2;\n  }\n}\n\n.action-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(12px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-600;\n  cursor: pointer;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  .action-btn__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 24px;\n    height: 24px;\n    border-radius: $radius-sm;\n    color: white;\n    font-size: 0.75rem;\n    transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);\n  }\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);\n\n    .action-btn__icon {\n      transform: scale(1.15) rotate(3deg);\n    }\n  }\n\n  &:disabled {\n    opacity: 0.45;\n    pointer-events: none;\n  }\n\n  &--import .action-btn__icon {\n    background: $cyan-gradient;\n  }\n\n  &--import:hover {\n    border-color: rgba($cyan, 0.3);\n    color: color.adjust($cyan, $lightness: -10%);\n    box-shadow: 0 4px 14px rgba($cyan, 0.15);\n  }\n\n  &--export .action-btn__icon {\n    background: $success-gradient;\n  }\n\n  &--export:hover {\n    border-color: rgba($success, 0.3);\n    color: color.adjust($success, $lightness: -10%);\n    box-shadow: 0 4px 14px rgba($success, 0.15);\n  }\n\n  &--columns .action-btn__icon {\n    background: $purple-gradient;\n  }\n\n  &--columns:hover {\n    border-color: rgba($purple, 0.3);\n    color: color.adjust($purple, $lightness: -10%);\n    box-shadow: 0 4px 14px rgba($purple, 0.15);\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   LOADING[_ngcontent-%COMP%]   STATE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.loading-state[_ngcontent-%COMP%] {\n  padding: $space-3;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n  &:last-child {\n    border-bottom: none;\n  }\n}\n\n.skeleton[_ngcontent-%COMP%] {\n  background: linear-gradient(90deg, $gray-100 25%, $gray-50 50%, $gray-100 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n  border-radius: $radius-md;\n}\n\n.skeleton-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.skeleton-text[_ngcontent-%COMP%] {\n  height: 12px;\n  width: 100px;\n  flex: 1;\n  max-width: 200px;\n}\n\n.skeleton-short[_ngcontent-%COMP%] {\n  max-width: 100px;\n}\n\n.skeleton-badge[_ngcontent-%COMP%] {\n  height: 24px;\n  width: 80px;\n  border-radius: $radius-full;\n}\n\n.skeleton-actions[_ngcontent-%COMP%] {\n  height: 32px;\n  width: 80px;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   EMPTY[_ngcontent-%COMP%]   STATE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: $space-10 $space-6;\n  text-align: center;\n\n  .empty-icon {\n    width: 60px;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $gray-100;\n    border-radius: 50%;\n    margin-bottom: $space-4;\n\n    i {\n      font-size: $font-size-2xl;\n      color: $gray-400;\n    }\n  }\n\n  h3 {\n    margin: 0 0 $space-1;\n    font-size: $font-size-xl;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0 0 $space-4;\n    font-size: $font-size-base;\n    color: $gray-500;\n    max-width: 360px;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DATA[_ngcontent-%COMP%]   TABLE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  border-radius: 16px;\n  overflow: hidden;\n\n  // Soft blue gradient header - Global Standard\n  ::ng-deep .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n  }\n\n  // Standard body rows\n  ::ng-deep .p-datatable-tbody > tr > td {\n    vertical-align: middle;\n    padding: $space-3 $space-2;\n  }\n\n  .th-customer {\n    min-width: 240px;\n  }\n\n  .th-actions {\n    width: 100px;\n    text-align: right;\n  }\n\n  .th-select,\n  .td-select {\n    width: 36px;\n    text-align: center;\n  }\n}\n\n@media (max-width: 600px) {\n  //[_ngcontent-%COMP%]   Keep[_ngcontent-%COMP%]   dense[_ngcontent-%COMP%]   tables[_ngcontent-%COMP%]   usable[_ngcontent-%COMP%]   on[_ngcontent-%COMP%]   mobile[_ngcontent-%COMP%]   with[_ngcontent-%COMP%]   horizontal[_ngcontent-%COMP%]   scroll.\n[_ngcontent-%COMP%]   .data-table[_ngcontent-%COMP%] {\n    min-width: 760px;\n  }\n}\n\n.table-row[_ngcontent-%COMP%] {\n  transition: background $transition-fast;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  &:hover {\n    background: rgba($primary, 0.03);\n\n    .customer-avatar {\n      transform: scale(1.05);\n      box-shadow: 0 4px 12px rgba($primary, 0.2);\n    }\n  }\n}\n\n.td-customer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.checkbox[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  accent-color: $primary;\n}\n\n  .inline-select {\n  .p-select {\n    min-width: 130px;\n    border-radius: $radius-md;\n    background: rgba(255, 255, 255, 0.8);\n  }\n\n  .p-select-label {\n    font-size: $font-size-sm;\n    color: $gray-700;\n  }\n}\n\n.customer-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n  transition: all $transition-spring;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.customer-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n\n  .customer-name {\n    font-weight: 600;\n    font-size: $font-size-base;\n    color: $gray-800;\n  }\n\n  .customer-date {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n.company-name[_ngcontent-%COMP%] {\n  color: $gray-700;\n  font-size: $font-size-base;\n}\n\n.bulk-assign[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 2px $space-2;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: $radius-full;\n  text-transform: capitalize;\n\n  &[data-status=\"lead\"] {\n    background: rgba($cyan, 0.15);\n    color: color.adjust($cyan, $lightness: -15%);\n  }\n\n  &[data-status=\"prospect\"] {\n    background: rgba($purple, 0.15);\n    color: color.adjust($purple, $lightness: -15%);\n  }\n\n  &[data-status=\"customer\"] {\n    background: rgba($success, 0.15);\n    color: color.adjust($success, $lightness: -15%);\n  }\n\n  &[data-status=\"inactive\"] {\n    background: rgba($gray-500, 0.15);\n    color: $gray-600;\n  }\n}\n\n.contact-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n\n  .contact-email {\n    font-size: $font-size-sm;\n    color: $gray-700;\n  }\n\n  .contact-phone {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n.cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n\n  .cell-label {\n    font-size: $font-size-xs;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: $gray-500;\n  }\n\n  .cell-value {\n    color: $gray-800;\n    font-weight: 600;\n  }\n\n  .action-buttons {\n    display: flex;\n    gap: $space-1;\n  }\n}\n\n.owner-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 2px $space-2 2px 2px;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  color: $gray-700;\n\n  .owner-avatar {\n    width: 18px;\n    height: 18px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $primary-gradient;\n    color: white;\n    font-size: $font-size-xs;\n    font-weight: 600;\n    border-radius: 50%;\n  }\n}\n\n.unassigned[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-400;\n  font-style: italic;\n}\n\n.td-actions[_ngcontent-%COMP%] {\n  text-align: right;\n}\n\n.row-actions[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: $space-2;\n}\n\n.row-action-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  border-radius: $radius-md;\n  cursor: pointer;\n  font-size: $font-size-sm;\n  color: white;\n  transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &--edit {\n    background: $blue-gradient;\n    box-shadow: 0 2px 8px rgba($info, 0.25);\n\n    &:hover {\n      transform: translateY(-2px) scale(1.1);\n      box-shadow: 0 6px 16px rgba($info, 0.35);\n    }\n  }\n\n  &--delete {\n    background: linear-gradient(135deg, #f87171 0%, $danger 100%);\n    box-shadow: 0 2px 8px rgba($danger, 0.25);\n\n    &:hover {\n      transform: translateY(-2px) scale(1.1);\n      box-shadow: 0 6px 16px rgba($danger, 0.35);\n    }\n  }\n\n  &:disabled {\n    opacity: 0.35;\n    pointer-events: none;\n    transform: none;\n    box-shadow: none;\n  }\n}\n\n.icon-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-sm;\n  color: $gray-400;\n  cursor: pointer;\n  font-size: $font-size-sm;\n  transition: all $transition-fast;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.06);\n    color: $gray-700;\n  }\n\n  &--danger:hover {\n    background: rgba($danger, 0.1);\n    color: $danger;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   CARD[_ngcontent-%COMP%]   VIEW\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.cards-wrapper[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: $space-3;\n  padding: $space-4;\n}\n\n.customer-card[_ngcontent-%COMP%] {\n  background: white;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-lg;\n  overflow: hidden;\n  transition: all $transition-base;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .card-avatar {\n      transform: scale(1.05);\n    }\n  }\n\n  .card-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: $space-3;\n    background: linear-gradient(135deg, rgba($primary, 0.05) 0%, rgba($accent, 0.05) 100%);\n  }\n\n  .card-avatar {\n    width: 40px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $primary-gradient;\n    color: white;\n    font-size: $font-size-lg;\n    font-weight: 700;\n    border-radius: 50%;\n    transition: transform $transition-spring;\n    overflow: hidden;\n\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      border-radius: inherit;\n    }\n  }\n\n  .card-status {\n    padding: 2px $space-2;\n    font-size: $font-size-sm;\n    font-weight: 600;\n    border-radius: $radius-full;\n    text-transform: capitalize;\n\n    &[data-status=\"lead\"] {\n      background: rgba($cyan, 0.15);\n      color: color.adjust($cyan, $lightness: -15%);\n    }\n\n    &[data-status=\"prospect\"] {\n      background: rgba($purple, 0.15);\n      color: color.adjust($purple, $lightness: -15%);\n    }\n\n    &[data-status=\"customer\"] {\n      background: rgba($success, 0.15);\n      color: color.adjust($success, $lightness: -15%);\n    }\n\n    &[data-status=\"inactive\"] {\n      background: rgba($gray-500, 0.15);\n      color: $gray-600;\n    }\n  }\n\n  .card-body {\n    padding: $space-3;\n  }\n\n  .card-name {\n    margin: 0 0 2px;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .card-company {\n    margin: 0 0 $space-2;\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n\n  .card-details {\n    display: flex;\n    flex-direction: column;\n    gap: $space-1;\n  }\n\n  .detail-row {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-sm;\n    color: $gray-600;\n\n    i {\n      width: 16px;\n      color: $gray-400;\n    }\n  }\n\n  .card-footer {\n    display: flex;\n    border-top: 1px solid rgba(0, 0, 0, 0.06);\n  }\n\n  .card-btn {\n    flex: 1;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: $space-2;\n    padding: $space-2;\n    background: transparent;\n    border: none;\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: $gray-600;\n    cursor: pointer;\n    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n    &:first-child {\n      border-right: 1px solid rgba(0, 0, 0, 0.06);\n    }\n\n    .card-btn__icon {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 22px;\n      height: 22px;\n      border-radius: $radius-sm;\n      color: white;\n      font-size: 0.7rem;\n      transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);\n    }\n\n    &--edit {\n      .card-btn__icon {\n        background: $blue-gradient;\n      }\n\n      &:hover {\n        background: rgba($info, 0.06);\n        color: $info;\n\n        .card-btn__icon { transform: scale(1.15) rotate(5deg); }\n      }\n    }\n\n    &--delete {\n      .card-btn__icon {\n        background: linear-gradient(135deg, #f87171 0%, $danger 100%);\n      }\n\n      &:hover {\n        background: rgba($danger, 0.06);\n        color: $danger;\n\n        .card-btn__icon { transform: scale(1.15) rotate(-5deg); }\n      }\n    }\n\n    &:disabled {\n      opacity: 0.4;\n      pointer-events: none;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   FOOTER[_ngcontent-%COMP%]   /[_ngcontent-%COMP%]   PAGINATION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.data-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-2 $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  flex-wrap: wrap;\n  gap: $space-3;\n\n  .pagination-info {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n  .modern-paginator {\n  .p-paginator {\n    background: transparent;\n    border: none;\n    padding: 0;\n  }\n\n  .p-paginator-page,\n  .p-paginator-prev,\n  .p-paginator-next,\n  .p-paginator-first,\n  .p-paginator-last {\n    min-width: 28px;\n    height: 28px;\n    border-radius: $radius-sm;\n    transition: all $transition-fast;\n\n    &:hover:not(.p-disabled) {\n      background: rgba(0, 0, 0, 0.06);\n    }\n\n    &.p-paginator-page-selected {\n      background: $primary-gradient;\n      color: white;\n      box-shadow: 0 2px 8px rgba($primary, 0.3);\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   FLOATING[_ngcontent-%COMP%]   ACTION[_ngcontent-%COMP%]   BUTTON\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.fab[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: $space-6;\n  right: $space-6;\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  border: none;\n  border-radius: 50%;\n  font-size: $font-size-lg;\n  cursor: pointer;\n  box-shadow: 0 6px 20px rgba($primary, 0.4);\n  transition: all $transition-base;\n  z-index: 100;\n\n  &:hover {\n    transform: scale(1.1) rotate(90deg);\n    box-shadow: 0 8px 30px rgba($primary, 0.5);\n\n    .fab-tooltip {\n      opacity: 1;\n      transform: translateX(-100%) translateX(-$space-3) translateY(-50%);\n    }\n  }\n\n  &:active {\n    transform: scale(1.05) rotate(90deg);\n  }\n\n  .fab-tooltip {\n    position: absolute;\n    right: 100%;\n    top: 50%;\n    transform: translateX(-$space-2) translateY(-50%);\n    padding: $space-1 $space-2;\n    background: $gray-800;\n    color: white;\n    font-size: $font-size-sm;\n    font-weight: 500;\n    border-radius: $radius-md;\n    white-space: nowrap;\n    opacity: 0;\n    pointer-events: none;\n    transition: all $transition-base;\n  }\n}\n\n//   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//   DARK   MODE\n//   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.dark-theme[_nghost-%COMP%], .dark-theme   [_nghost-%COMP%] {\n  .page-container {\n    background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);\n  }\n\n  .orb {\n    opacity: 0.25;\n  }\n\n  .hero-badge {\n    background: rgba(30, 30, 50, 0.8);\n    border-color: rgba(255, 255, 255, 0.1);\n    color: $primary-light;\n  }\n\n  .hero-description {\n    color: rgba(255, 255, 255, 0.6);\n  }\n\n  .hero-stat {\n    .stat-value {\n      color: white;\n    }\n\n    .stat-label {\n      color: rgba(255, 255, 255, 0.5);\n    }\n\n    .stat-bar {\n      background: rgba(255, 255, 255, 0.1);\n    }\n  }\n\n  .visual-card,\n  .metric-card,\n  .filter-bar,\n  .data-card {\n    background: rgba(30, 30, 50, 0.8);\n    border-color: rgba(255, 255, 255, 0.08);\n  }\n\n  .visual-card {\n    .card-label {\n      color: rgba(255, 255, 255, 0.5);\n    }\n\n    .card-value {\n      color: white;\n    }\n\n    .card-trend {\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .metric-card {\n    .metric-label {\n      color: rgba(255, 255, 255, 0.5);\n    }\n\n    .metric-value {\n      color: white;\n    }\n  }\n\n  .metric-ring .ring-bg {\n    stroke: rgba(255, 255, 255, 0.1);\n  }\n\n  .btn-secondary {\n    background: rgba(255, 255, 255, 0.08);\n    border-color: rgba(255, 255, 255, 0.1);\n    color: rgba(255, 255, 255, 0.9);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.12);\n    }\n  }\n\n  .search-input {\n    background: rgba(255, 255, 255, 0.05);\n    color: white;\n\n    &::placeholder {\n      color: rgba(255, 255, 255, 0.4);\n    }\n\n    &:focus {\n      background: rgba(255, 255, 255, 0.08);\n    }\n  }\n\n  .search-kbd {\n    background: rgba(255, 255, 255, 0.08);\n    border-color: rgba(255, 255, 255, 0.1);\n    color: rgba(255, 255, 255, 0.5);\n  }\n\n  .filter-pill {\n    background: rgba(255, 255, 255, 0.05);\n\n    i {\n      color: rgba(255, 255, 255, 0.4);\n    }\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.08);\n    }\n\n    ::ng-deep .filter-select .p-select .p-select-label {\n      color: rgba(255, 255, 255, 0.8);\n    }\n  }\n\n  .view-switcher {\n    background: rgba(255, 255, 255, 0.05);\n  }\n\n  .view-btn {\n    color: rgba(255, 255, 255, 0.4);\n\n    &:hover {\n      color: rgba(255, 255, 255, 0.7);\n    }\n\n    &.active {\n      background: rgba(255, 255, 255, 0.1);\n      color: $primary-light;\n    }\n  }\n\n  .filter-summary .summary-label {\n    color: rgba(255, 255, 255, 0.5);\n  }\n\n  .filter-summary .filter-tag {\n    background: rgba($primary, 0.2);\n    color: $primary-light;\n  }\n\n  .data-header {\n    border-color: rgba(255, 255, 255, 0.06);\n\n    .header-title h2 {\n      color: white;\n    }\n\n    .record-count {\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .action-btn {\n    background: rgba(255, 255, 255, 0.06);\n    border-color: rgba(255, 255, 255, 0.1);\n    color: rgba(255, 255, 255, 0.7);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.1);\n      border-color: rgba(255, 255, 255, 0.18);\n      color: white;\n    }\n\n    &--import:hover {\n      border-color: rgba($cyan, 0.4);\n      color: color.adjust($cyan, $lightness: 15%);\n      box-shadow: 0 4px 14px rgba($cyan, 0.2);\n    }\n\n    &--export:hover {\n      border-color: rgba($success, 0.4);\n      color: color.adjust($success, $lightness: 15%);\n      box-shadow: 0 4px 14px rgba($success, 0.2);\n    }\n\n    &--columns:hover {\n      border-color: rgba($purple, 0.4);\n      color: color.adjust($purple, $lightness: 15%);\n      box-shadow: 0 4px 14px rgba($purple, 0.2);\n    }\n  }\n\n  .data-table {\n    thead th {\n      background: rgba(0, 0, 0, 0.2);\n      border-color: rgba(255, 255, 255, 0.06);\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .table-row {\n    border-color: rgba(255, 255, 255, 0.04);\n\n    &:hover {\n      background: rgba($primary, 0.08);\n    }\n  }\n\n  .customer-info {\n    .customer-name {\n      color: white;\n    }\n\n    .customer-date {\n      color: rgba(255, 255, 255, 0.4);\n    }\n  }\n\n  .company-name {\n    color: rgba(255, 255, 255, 0.8);\n  }\n\n  .contact-info {\n    .contact-email {\n      color: rgba(255, 255, 255, 0.8);\n    }\n\n    .contact-phone {\n      color: rgba(255, 255, 255, 0.4);\n    }\n  }\n\n  .owner-badge {\n    background: rgba(255, 255, 255, 0.08);\n    color: rgba(255, 255, 255, 0.8);\n  }\n\n  .unassigned {\n    color: rgba(255, 255, 255, 0.4);\n  }\n\n  .row-action-btn {\n    &--edit {\n      box-shadow: 0 2px 8px rgba($info, 0.3);\n    }\n\n    &--delete {\n      box-shadow: 0 2px 8px rgba($danger, 0.3);\n    }\n  }\n\n  .icon-btn {\n    color: rgba(255, 255, 255, 0.4);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.08);\n      color: white;\n    }\n  }\n\n  .customer-card {\n    background: rgba(30, 30, 50, 0.6);\n    border-color: rgba(255, 255, 255, 0.08);\n\n    .card-header {\n      background: rgba(255, 255, 255, 0.03);\n    }\n\n    .card-name {\n      color: white;\n    }\n\n    .card-company {\n      color: rgba(255, 255, 255, 0.5);\n    }\n\n    .detail-row {\n      color: rgba(255, 255, 255, 0.6);\n\n      i {\n        color: rgba(255, 255, 255, 0.4);\n      }\n    }\n\n    .card-footer {\n      border-color: rgba(255, 255, 255, 0.06);\n    }\n\n    .card-btn {\n      color: rgba(255, 255, 255, 0.7);\n\n      &:first-child {\n        border-color: rgba(255, 255, 255, 0.06);\n      }\n\n      &--edit:hover {\n        background: rgba($info, 0.12);\n        color: color.adjust($info, $lightness: 15%);\n      }\n\n      &--delete:hover {\n        background: rgba($danger, 0.12);\n        color: color.adjust($danger, $lightness: 15%);\n      }\n    }\n  }\n\n  .empty-state {\n    .empty-icon {\n      background: rgba(255, 255, 255, 0.08);\n\n      i {\n        color: rgba(255, 255, 255, 0.4);\n      }\n    }\n\n    h3 {\n      color: white;\n    }\n\n    p {\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .skeleton {\n    background: linear-gradient(90deg, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 75%);\n    background-size: 200% 100%;\n  }\n\n  .skeleton-row {\n    border-color: rgba(255, 255, 255, 0.04);\n  }\n\n  .data-footer {\n    border-color: rgba(255, 255, 255, 0.06);\n\n    .pagination-info {\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .fab {\n    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);\n\n    .fab-tooltip {\n      background: rgba(30, 30, 50, 0.9);\n    }\n  }\n\n  .import-dialog {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n\n    .import-note {\n      margin: 0;\n      color: rgba(255, 255, 255, 0.6);\n    }\n\n    .import-upload {\n      border: 1px dashed rgba(255, 255, 255, 0.25);\n      border-radius: 12px;\n      padding: 16px;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 12px;\n      cursor: pointer;\n      background: rgba(255, 255, 255, 0.04);\n\n      input {\n        display: none;\n      }\n\n      span {\n        font-weight: 600;\n        color: white;\n      }\n    }\n\n    .import-actions {\n      display: flex;\n      justify-content: flex-end;\n      gap: 12px;\n    }\n\n    .import-error {\n      color: #fca5a5;\n      font-weight: 600;\n    }\n\n    .import-result {\n      background: rgba(15, 23, 42, 0.35);\n      border-radius: 12px;\n      padding: 12px 14px;\n      border: 1px solid rgba(255, 255, 255, 0.08);\n\n      .import-metrics {\n        display: flex;\n        gap: 16px;\n        font-weight: 600;\n        color: white;\n      }\n\n      .import-errors {\n        margin-top: 8px;\n        color: rgba(255, 255, 255, 0.65);\n\n        ul {\n          margin: 6px 0 0;\n          padding-left: 18px;\n        }\n      }\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomersPage, [{
        type: Component,
        args: [{ selector: 'app-customers-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    DatePipe,
                    FormsModule,
                    CardModule,
                    CheckboxModule,
                    DatePickerModule,
                    FileUploadModule,
                    InputNumberModule,
                    TableModule,
                    TagModule,
                    InputTextModule,
                    SelectModule,
                    ButtonModule,
                    PaginatorModule,
                    SkeletonModule,
                    TooltipModule,
                    DialogModule,
                    BreadcrumbsComponent,
                    BulkActionsBarComponent
                ], template: "<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     CUSTOMERS PAGE - FUTURISTIC ENTERPRISE UI\n     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n<div class=\"page-container\">\n  <!-- Animated Background Orbs -->\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <!-- PrimeNG Breadcrumb -->\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       HERO SECTION - Command Center Style\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Customer Intelligence Hub</span>\n      </div>\n      \n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Customer</span>\n        <span class=\"title-light\">Workspace</span>\n      </h1>\n      \n      <p class=\"hero-description\">\n        Manage relationships, track engagement, and drive growth with AI-powered insights\n      </p>\n\n      <div class=\"hero-stats\">\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ metrics().total || 0 }}</div>\n          <div class=\"stat-label\">Total Customers</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill\" style=\"width: 100%\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ metrics().leads }}</div>\n          <div class=\"stat-label\">Active Leads</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--leads\" [style.width.%]=\"metrics().total ? (metrics().leads / metrics().total) * 100 : 0\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ metrics().prospects }}</div>\n          <div class=\"stat-label\">Prospects</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--prospects\" [style.width.%]=\"metrics().total ? (metrics().prospects / metrics().total) * 100 : 0\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ metrics().activeCustomers }}</div>\n          <div class=\"stat-label\">Converted</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--success\" [style.width.%]=\"metrics().total ? (metrics().activeCustomers / metrics().total) * 100 : 0\"></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"hero-actions\">\n        <button pButton type=\"button\" class=\"btn btn-primary btn-glow\" [disabled]=\"!canManage()\" (click)=\"onCreate()\">\n          <i class=\"pi pi-plus\"></i>\n          <span>Add Customer</span>\n          <div class=\"btn-shine\"></div>\n        </button>\n        <button pButton type=\"button\" class=\"btn btn-secondary\" (click)=\"load()\">\n          <i class=\"pi pi-refresh\"></i>\n          <span>Refresh</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-chart-line\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">This Week</span>\n          <strong class=\"card-value\">+{{ metrics().newThisWeek }}</strong>\n          <span class=\"card-trend card-trend--up\">\n            <i class=\"pi pi-arrow-up\"></i> New records\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n\n      <div class=\"visual-card visual-card--secondary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-users\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Team Active</span>\n          <strong class=\"card-value\">{{ ownerOptions().length - 1 }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-user\"></i> Members\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       METRICS DASHBOARD\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"metrics-section\">\n    <div class=\"metric-card metric-card--total\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-database\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Total Records</span>\n        <strong class=\"metric-value\">{{ metrics().total || '\u2014' }}</strong>\n      </div>\n      <div class=\"metric-chart\">\n        <svg viewBox=\"0 0 100 40\" class=\"sparkline\">\n          <path d=\"M0,35 Q25,30 50,20 T100,15\" fill=\"none\" stroke=\"url(#gradient-blue)\" stroke-width=\"2\"/>\n          <defs>\n            <linearGradient id=\"gradient-blue\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n              <stop offset=\"0%\" stop-color=\"#667eea\"/>\n              <stop offset=\"100%\" stop-color=\"#764ba2\"/>\n            </linearGradient>\n          </defs>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--leads\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-bolt\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Leads</span>\n        <strong class=\"metric-value\">{{ metrics().leads }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--cyan\" \n            [attr.stroke-dasharray]=\"(metrics().total ? (metrics().leads / metrics().total) * 100 : 0) + ', 100'\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--prospects\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-star\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Prospects</span>\n        <strong class=\"metric-value\">{{ metrics().prospects }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--purple\" \n            [attr.stroke-dasharray]=\"(metrics().total ? (metrics().prospects / metrics().total) * 100 : 0) + ', 100'\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--customers\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-check-circle\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Customers</span>\n        <strong class=\"metric-value\">{{ metrics().activeCustomers }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--green\" \n            [attr.stroke-dasharray]=\"(metrics().total ? (metrics().activeCustomers / metrics().total) * 100 : 0) + ', 100'\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--new\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-calendar-plus\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">This Week</span>\n        <strong class=\"metric-value\">{{ metrics().newThisWeek }}</strong>\n      </div>\n      <div class=\"metric-badge\">\n        <span>NEW</span>\n      </div>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       SMART FILTER BAR\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"filter-section\">\n    <div class=\"filter-bar\">\n      <div class=\"search-wrapper\">\n        <i class=\"pi pi-search search-icon\"></i>\n        <input\n          pInputText\n          type=\"search\"\n          class=\"search-input\"\n          placeholder=\"Search customers, companies, emails...\"\n          [(ngModel)]=\"searchTerm\"\n          (ngModelChange)=\"onSearch($event)\"\n        />\n        <kbd class=\"search-kbd\">\u2318K</kbd>\n      </div>\n\n      <div class=\"filter-pills\">\n        <div class=\"filter-pill\">\n          <i class=\"pi pi-user\"></i>\n          <p-select appendTo=\"body\"\n            [options]=\"ownerOptions()\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"ownerFilter()\"\n            (ngModelChange)=\"onOwnerFilterChange($event)\"\n            placeholder=\"Owner\"\n            styleClass=\"filter-select\"\n          ></p-select>\n        </div>\n\n        <div class=\"filter-pill\">\n          <i class=\"pi pi-tag\"></i>\n          <p-select appendTo=\"body\"\n            [options]=\"statusOptions\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"statusFilter\"\n            (ngModelChange)=\"onStatusChange($event)\"\n            placeholder=\"Status\"\n            styleClass=\"filter-select\"\n          ></p-select>\n        </div>\n\n        <div class=\"filter-pill\">\n          <i class=\"pi pi-filter\"></i>\n          <p-select appendTo=\"body\"\n            [options]=\"segmentOptions\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"segmentFilter()\"\n            (ngModelChange)=\"onSegmentChange($event)\"\n            placeholder=\"Segment\"\n            styleClass=\"filter-select\"\n          ></p-select>\n        </div>\n      </div>\n\n      <div class=\"filter-actions\">\n        <div class=\"view-switcher\">\n          <button \n            pButton\n            type=\"button\"\n            class=\"view-btn\" \n            [class.active]=\"viewMode === 'table'\" \n            (click)=\"setViewMode('table')\"\n            title=\"Table view\">\n            <i class=\"pi pi-list\"></i>\n          </button>\n          <button \n            pButton\n            type=\"button\"\n            class=\"view-btn\" \n            [class.active]=\"viewMode === 'cards'\" \n            (click)=\"setViewMode('cards')\"\n            title=\"Card view\">\n            <i class=\"pi pi-th-large\"></i>\n          </button>\n        </div>\n\n        <button pButton type=\"button\" class=\"btn btn-ghost\" (click)=\"toggleAdvancedFilters()\" [class.active]=\"showAdvancedFilters || advancedFiltersActive()\">\n          <i class=\"pi pi-sliders-h\"></i>\n          <span>Filters</span>\n          <span class=\"filter-badge\" *ngIf=\"advancedFiltersActive()\"></span>\n        </button>\n\n        <button pButton type=\"button\" class=\"btn btn-ghost\" (click)=\"resetFilters()\">\n          <i class=\"pi pi-times\"></i>\n          <span>Clear</span>\n        </button>\n      </div>\n    </div>\n\n    <!-- Advanced Filter Panel -->\n    <div class=\"advanced-filter-panel\" *ngIf=\"showAdvancedFilters\">\n      <div class=\"filter-grid\">\n        <div class=\"filter-field\">\n          <label>Industry</label>\n          <p-select appendTo=\"body\"\n            [options]=\"industryOptions()\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"industryFilter()\"\n            (ngModelChange)=\"industryFilter.set($event || null)\"\n            placeholder=\"Any industry\"\n            styleClass=\"w-full\"\n          ></p-select>\n        </div>\n        <div class=\"filter-field\">\n          <label>Territory</label>\n          <p-select appendTo=\"body\"\n            [options]=\"territoryOptions()\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"territoryFilter()\"\n            (ngModelChange)=\"territoryFilter.set($event || null)\"\n            placeholder=\"Any territory\"\n            styleClass=\"w-full\"\n          ></p-select>\n        </div>\n        <div class=\"filter-field\">\n          <label>Account Owner</label>\n          <p-select appendTo=\"body\"\n            [options]=\"ownerIdOptions()\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"ownerIdFilter()\"\n            (ngModelChange)=\"ownerIdFilter.set($event || null)\"\n            placeholder=\"Any owner\"\n            styleClass=\"w-full\"\n          ></p-select>\n        </div>\n        <div class=\"filter-field\">\n          <label>Created From</label>\n          <p-datepicker\n            [ngModel]=\"createdFrom()\"\n            (ngModelChange)=\"createdFrom.set($event)\"\n            dateFormat=\"yy-mm-dd\"\n            [showIcon]=\"true\"\n            appendTo=\"body\"\n            placeholder=\"Start date\"\n            styleClass=\"w-full\"\n          ></p-datepicker>\n        </div>\n        <div class=\"filter-field\">\n          <label>Created To</label>\n          <p-datepicker\n            [ngModel]=\"createdTo()\"\n            (ngModelChange)=\"createdTo.set($event)\"\n            dateFormat=\"yy-mm-dd\"\n            [showIcon]=\"true\"\n            appendTo=\"body\"\n            placeholder=\"End date\"\n            styleClass=\"w-full\"\n          ></p-datepicker>\n        </div>\n        <div class=\"filter-field\">\n          <label>Min Revenue</label>\n          <p-inputnumber\n            [ngModel]=\"minRevenue()\"\n            (ngModelChange)=\"minRevenue.set($event)\"\n            mode=\"currency\"\n            currency=\"USD\"\n            locale=\"en-US\"\n            placeholder=\"Min\"\n            styleClass=\"w-full\"\n          ></p-inputnumber>\n        </div>\n        <div class=\"filter-field\">\n          <label>Max Revenue</label>\n          <p-inputnumber\n            [ngModel]=\"maxRevenue()\"\n            (ngModelChange)=\"maxRevenue.set($event)\"\n            mode=\"currency\"\n            currency=\"USD\"\n            locale=\"en-US\"\n            placeholder=\"Max\"\n            styleClass=\"w-full\"\n          ></p-inputnumber>\n        </div>\n        <div class=\"filter-field filter-field--actions\">\n          <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"applyAdvancedFilters()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-search\"></i></span>\n            <span>Apply</span>\n          </button>\n          <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"clearAdvancedFilters()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-times\"></i></span>\n            <span>Clear</span>\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"filter-summary\" *ngIf=\"searchTerm || statusFilter !== 'all' || ownerFilter() !== 'all' || advancedFiltersActive()\">\n      <span class=\"summary-label\">Active filters:</span>\n      <span class=\"filter-tag\" *ngIf=\"searchTerm\">\n        \"{{ searchTerm }}\"\n        <i class=\"pi pi-times\" (click)=\"searchTerm = ''; onSearch('')\"></i>\n      </span>\n      <span class=\"filter-tag\" *ngIf=\"statusFilter !== 'all'\">\n        {{ statusFilter }}\n        <i class=\"pi pi-times\" (click)=\"statusFilter = 'all'; onStatusChange('all')\"></i>\n      </span>\n      <span class=\"filter-tag\" *ngIf=\"ownerFilter() !== 'all'\">\n        {{ ownerFilter() }}\n        <i class=\"pi pi-times\" (click)=\"onOwnerFilterChange('all')\"></i>\n      </span>\n      <span class=\"filter-tag\" *ngIf=\"industryFilter()\">\n        {{ industryFilter() }}\n        <i class=\"pi pi-times\" (click)=\"industryFilter.set(null); applyAdvancedFilters()\"></i>\n      </span>\n      <span class=\"filter-tag\" *ngIf=\"territoryFilter()\">\n        {{ territoryFilter() }}\n        <i class=\"pi pi-times\" (click)=\"territoryFilter.set(null); applyAdvancedFilters()\"></i>\n      </span>\n      <span class=\"filter-tag\" *ngIf=\"minRevenue() != null || maxRevenue() != null\">\n        Revenue: {{ minRevenue() != null ? ('$' + minRevenue()) : '\u221E' }} \u2013 {{ maxRevenue() != null ? ('$' + maxRevenue()) : '\u221E' }}\n        <i class=\"pi pi-times\" (click)=\"minRevenue.set(null); maxRevenue.set(null); applyAdvancedFilters()\"></i>\n      </span>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       DATA TABLE\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"data-section\">\n    <div class=\"data-card\">\n      <header class=\"data-header\">\n        <div class=\"header-title\">\n          <h2>Customer Records</h2>\n          <span class=\"record-count\">\n            {{ filteredCustomers().length }} of {{ total() }} records\n          </span>\n        </div>\n        <div class=\"header-actions\">\n          <button pButton type=\"button\" class=\"action-btn action-btn--import\" [disabled]=\"!canManage()\" (click)=\"openImport()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-upload\"></i></span>\n            <span>Import</span>\n          </button>\n          <button pButton type=\"button\" class=\"action-btn action-btn--export\" (click)=\"onExport()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-download\"></i></span>\n            <span>Export</span>\n          </button>\n          <button pButton type=\"button\" class=\"action-btn action-btn--columns\" [disabled]=\"!canManage()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-cog\"></i></span>\n            <span>Columns</span>\n          </button>\n        </div>\n      </header>\n\n      <!-- Loading State -->\n      <div class=\"loading-state\" *ngIf=\"loading()\">\n        <div class=\"skeleton-row\" *ngFor=\"let _ of [1,2,3,4,5]\">\n          <div class=\"skeleton skeleton-avatar\"></div>\n          <div class=\"skeleton skeleton-text\"></div>\n          <div class=\"skeleton skeleton-text skeleton-short\"></div>\n          <div class=\"skeleton skeleton-badge\"></div>\n          <div class=\"skeleton skeleton-text\"></div>\n          <div class=\"skeleton skeleton-actions\"></div>\n        </div>\n      </div>\n\n      <!-- Empty State -->\n      <div class=\"empty-state\" *ngIf=\"!loading() && !filteredCustomers().length\">\n        <div class=\"empty-icon\">\n          <i class=\"pi pi-inbox\"></i>\n        </div>\n        <h3>No customers found</h3>\n        <p>Try adjusting your search or filters to find what you're looking for</p>\n        <button pButton type=\"button\" class=\"btn btn-primary\" (click)=\"resetFilters()\">\n          <i class=\"pi pi-refresh\"></i>\n          <span>Reset Filters</span>\n        </button>\n      </div>\n\n      <!-- Table View -->\n      <div class=\"table-wrapper\" *ngIf=\"!loading() && filteredCustomers().length && viewMode === 'table'\">\n        <p-table class=\"crm-table data-table\" [value]=\"filteredCustomers()\">\n          <ng-template pTemplate=\"header\">\n            <tr>\n              <th class=\"th-select\">\n                <p-checkbox\n                  [binary]=\"true\"\n                  [ngModel]=\"selectedIds().length && selectedIds().length === filteredCustomers().length\"\n                  (onChange)=\"toggleSelectAll($event.checked)\"\n                ></p-checkbox>\n              </th>\n              <th pSortableColumn=\"name\">Customer <p-sortIcon field=\"name\"></p-sortIcon></th>\n              <th pSortableColumn=\"company\">Company <p-sortIcon field=\"company\"></p-sortIcon></th>\n              <th pSortableColumn=\"status\">Status <p-sortIcon field=\"status\"></p-sortIcon></th>\n              <th>Contact</th>\n              <th pSortableColumn=\"ownerId\">Owner <p-sortIcon field=\"ownerId\"></p-sortIcon></th>\n              <th class=\"th-actions\">Actions</th>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"body\" let-row>\n            <tr class=\"table-row\" (click)=\"onRowClick(row, $event)\">\n              <td class=\"td-select\">\n                <p-checkbox\n                  [binary]=\"true\"\n                  [ngModel]=\"isSelected(row.id)\"\n                  (onChange)=\"toggleSelection(row.id, $event.checked)\"\n                ></p-checkbox>\n              </td>\n              <td class=\"td-customer\">\n                <div class=\"customer-avatar\">\n                  <img\n                    [src]=\"$any(row).profilePictureUrl || ('https://i.pravatar.cc/150?u=' + (row.email || row.id))\"\n                    [alt]=\"row.name + ' avatar'\"\n                    [title]=\"row.name + ' avatar'\"\n                  />\n                </div>\n                <div class=\"customer-info\">\n                  <span class=\"customer-name\">{{ row.name }}</span>\n                  <span class=\"customer-date\">Added {{ row.createdAt | date: 'MMM d, yyyy' }}</span>\n                </div>\n              </td>\n              <td>\n                <span class=\"company-name\">{{ row.company || '\u2014' }}</span>\n              </td>\n              <td>\n                <p-select appendTo=\"body\"\n                  [options]=\"statusOptionsInline\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  [ngModel]=\"row.status\"\n                  (ngModelChange)=\"onInlineStatusChange(row, $event)\"\n                  styleClass=\"inline-select\"\n                ></p-select>\n              </td>\n              <td>\n                <div class=\"contact-info\">\n                  <span class=\"contact-email\">{{ row.email || '\u2014' }}</span>\n                  <span class=\"contact-phone\" *ngIf=\"row.phone\">{{ row.phone }}</span>\n                </div>\n              </td>\n              <td>\n                <p-select appendTo=\"body\"\n                  [options]=\"ownerOptionsForAssign()\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  [ngModel]=\"row.ownerId\"\n                  (ngModelChange)=\"onInlineOwnerChange(row, $event)\"\n                  [disabled]=\"!canManage()\"\n                  placeholder=\"Owner\"\n                  styleClass=\"inline-select\"\n                ></p-select>\n              </td>\n              <td class=\"td-actions\">\n                <div class=\"row-actions\">\n                  <button\n                    type=\"button\"\n                    class=\"row-action-btn row-action-btn--edit\"\n                    [disabled]=\"!canManage()\"\n                    (click)=\"onEdit(row); $event.stopPropagation()\"\n                    title=\"Edit\"\n                  >\n                    <i class=\"pi pi-pencil\"></i>\n                  </button>\n                  <button\n                    type=\"button\"\n                    class=\"row-action-btn row-action-btn--delete\"\n                    [disabled]=\"!canManage()\"\n                    (click)=\"onDelete(row); $event.stopPropagation()\"\n                    title=\"Delete\"\n                  >\n                    <i class=\"pi pi-trash\"></i>\n                  </button>\n                </div>\n              </td>\n            </tr>\n          </ng-template>\n        </p-table>\n      </div>\n\n      <!-- Card View -->\n      <div class=\"cards-wrapper\" *ngIf=\"!loading() && filteredCustomers().length && viewMode === 'cards'\">\n        <div class=\"customer-card\" *ngFor=\"let row of filteredCustomers()\">\n          <div class=\"card-header\">\n            <div class=\"card-avatar\">\n              <img\n                [src]=\"$any(row).profilePictureUrl || ('https://i.pravatar.cc/150?u=' + (row.email || row.id))\"\n                [alt]=\"row.name + ' avatar'\"\n                [title]=\"row.name + ' avatar'\"\n              />\n            </div>\n            <span class=\"card-status\" [attr.data-status]=\"row.status.toLowerCase()\">\n              {{ row.status }}\n            </span>\n          </div>\n          <div class=\"card-body\">\n            <h3 class=\"card-name\">{{ row.name }}</h3>\n            <p class=\"card-company\">{{ row.company || 'No company' }}</p>\n            <div class=\"card-details\">\n              <div class=\"detail-row\">\n                <i class=\"pi pi-envelope\"></i>\n                <span>{{ row.email || 'No email' }}</span>\n              </div>\n              <div class=\"detail-row\">\n                <i class=\"pi pi-phone\"></i>\n                <span>{{ row.phone || 'No phone' }}</span>\n              </div>\n              <div class=\"detail-row\">\n                <i class=\"pi pi-user\"></i>\n                <span>{{ row.owner || 'Unassigned' }}</span>\n              </div>\n            </div>\n          </div>\n          <div class=\"card-footer\">\n            <button pButton type=\"button\" class=\"card-btn card-btn--edit\" [disabled]=\"!canManage()\" (click)=\"onEdit(row)\">\n              <span class=\"card-btn__icon\"><i class=\"pi pi-pencil\"></i></span>\n              Edit\n            </button>\n            <button pButton type=\"button\" class=\"card-btn card-btn--delete\" [disabled]=\"!canManage()\" (click)=\"onDelete(row)\">\n              <span class=\"card-btn__icon\"><i class=\"pi pi-trash\"></i></span>\n              Delete\n            </button>\n          </div>\n        </div>\n      </div>\n\n      <!-- Pagination -->\n      <footer class=\"data-footer\" *ngIf=\"!loading() && filteredCustomers().length\">\n        <div class=\"pagination-info\">\n          Showing {{ (pageIndex * rows) + 1 }} - {{ Math.min((pageIndex + 1) * rows, total()) }} of {{ total() }}\n        </div>\n        <p-paginator\n          [rows]=\"rows\"\n          [totalRecords]=\"total()\"\n          [rowsPerPageOptions]=\"[5, 10, 20, 50]\"\n          [first]=\"pageIndex * rows\"\n          (onPageChange)=\"onPageChange($event)\"\n          styleClass=\"modern-paginator\"\n        ></p-paginator>\n      </footer>\n    </div>\n  </section>\n\n  <app-bulk-actions-bar\n    [actions]=\"bulkActions()\"\n    [selectedItems]=\"selectedIds()\"\n    [totalCount]=\"filteredCustomers().length\"\n    (actionClicked)=\"onBulkAction($event)\"\n    (clearSelection)=\"clearSelection()\"\n    (selectAll)=\"selectAllFiltered()\"\n  ></app-bulk-actions-bar>\n\n  <p-dialog\n    header=\"Assign owner\"\n    [(visible)]=\"assignDialogVisible\"\n    [modal]=\"true\"\n    [style]=\"{ width: '360px' }\"\n  >\n    <div class=\"bulk-assign\">\n      <label>Owner</label>\n      <p-select appendTo=\"body\"\n        [options]=\"ownerOptionsForAssign()\"\n        optionLabel=\"label\"\n        optionValue=\"value\"\n        [(ngModel)]=\"assignOwnerId\"\n        placeholder=\"Select owner\"\n        styleClass=\"w-full\"\n      ></p-select>\n    </div>\n    <ng-template pTemplate=\"footer\">\n      <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" label=\"Cancel\" (click)=\"assignDialogVisible = false\"></button>\n      <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Assign\" [disabled]=\"!assignOwnerId || !canManage()\" (click)=\"confirmBulkAssign()\"></button>\n    </ng-template>\n  </p-dialog>\n\n  <p-dialog\n    header=\"Change status\"\n    [(visible)]=\"statusDialogVisible\"\n    [modal]=\"true\"\n    [style]=\"{ width: '360px' }\"\n  >\n    <div class=\"bulk-assign\">\n      <label>Status</label>\n      <p-select appendTo=\"body\"\n        [options]=\"statusOptionsInline\"\n        optionLabel=\"label\"\n        optionValue=\"value\"\n        [(ngModel)]=\"bulkStatus\"\n        placeholder=\"Select status\"\n        styleClass=\"w-full\"\n      ></p-select>\n    </div>\n    <ng-template pTemplate=\"footer\">\n      <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" label=\"Cancel\" (click)=\"statusDialogVisible = false\"></button>\n      <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Update\" [disabled]=\"!bulkStatus || !canManage()\" (click)=\"confirmBulkStatusUpdate()\"></button>\n    </ng-template>\n  </p-dialog>\n\n  <p-dialog\n    header=\"Import customers\"\n    [(visible)]=\"importDialogVisible\"\n    [modal]=\"true\"\n    [dismissableMask]=\"true\"\n    [style]=\"{ width: '480px' }\"\n    (onHide)=\"closeImport()\"\n  >\n    <div class=\"import-dialog\">\n      <p class=\"import-note\">\n        Upload a CSV with headers. Required column: <strong>Name</strong>.\n      </p>\n      <label class=\"import-upload\">\n        <p-fileUpload\n          mode=\"basic\"\n          name=\"file\"\n          [auto]=\"false\"\n          [customUpload]=\"true\"\n          [showUploadButton]=\"false\"\n          [showCancelButton]=\"false\"\n          [chooseLabel]=\"importFile?.name || 'Choose CSV file'\"\n          accept=\".csv\"\n          (onSelect)=\"onImportFileSelected($event)\"\n        ></p-fileUpload>\n      </label>\n      <div class=\"import-actions\">\n        <button pButton type=\"button\" class=\"btn btn-ghost\" (click)=\"closeImport()\">Cancel</button>\n        <button pButton type=\"button\" class=\"btn btn-primary\" [disabled]=\"!importFile || importing() || !canManage()\" (click)=\"onImport()\">\n          {{ importing() ? 'Importing...' : 'Import' }}\n        </button>\n      </div>\n      <div class=\"import-error\" *ngIf=\"importError()\">{{ importError() }}</div>\n      <div class=\"import-status\" *ngIf=\"importJob() as job\">\n        <span>Status: {{ importStatus()?.status || job.status }}</span>\n      </div>\n      <div class=\"import-result\" *ngIf=\"importStatus() as result\">\n        <div class=\"import-metrics\">\n          <span>Rows: {{ result.total }}</span>\n          <span>Imported: {{ result.imported }}</span>\n          <span>Skipped: {{ result.skipped }}</span>\n        </div>\n        <div class=\"import-errors\" *ngIf=\"result.errors.length\">\n          <p>Errors (first 5):</p>\n          <ul>\n            <li *ngFor=\"let err of result.errors.slice(0, 5)\">\n              Row {{ err.rowNumber }}: {{ err.message }}\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </p-dialog>\n\n\n</div>\n", styles: ["// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// CUSTOMERS PAGE - FUTURISTIC ENTERPRISE STYLING\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ANIMATIONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes float {\n  0%, 100% { transform: translateY(0) rotate(0deg); }\n  25% { transform: translateY(-20px) rotate(5deg); }\n  75% { transform: translateY(10px) rotate(-5deg); }\n}\n\n@keyframes pulse-glow {\n  0%, 100% { \n    opacity: 1;\n    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);\n  }\n  50% { \n    opacity: 0.8;\n    box-shadow: 0 0 40px rgba(102, 126, 234, 0.6);\n  }\n}\n\n@keyframes shimmer {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(100%); }\n}\n\n@keyframes ring-draw {\n  0% { stroke-dasharray: 0, 100; }\n}\n\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes slide-in-right {\n  from {\n    opacity: 0;\n    transform: translateX(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n\n@keyframes badge-pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.1); }\n}\n\n@keyframes orb-float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  25% {\n    transform: translate(50px, -30px) scale(1.1);\n  }\n  50% {\n    transform: translate(100px, 20px) scale(0.9);\n  }\n  75% {\n    transform: translate(30px, 50px) scale(1.05);\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// BASE STYLES\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ANIMATED BACKGROUND ORBS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 600px;\n    height: 600px;\n    background: $primary-gradient;\n    top: -200px;\n    right: -100px;\n    animation-delay: 0s;\n  }\n\n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    bottom: 10%;\n    left: -100px;\n    animation-delay: -7s;\n    animation-duration: 25s;\n  }\n\n  &.orb-3 {\n    width: 300px;\n    height: 300px;\n    background: $secondary-gradient;\n    top: 40%;\n    right: 20%;\n    animation-delay: -14s;\n    animation-duration: 18s;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// HERO SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n// Hero title uses global .hero-title from _components.scss\n\n.hero-stats {\n  display: flex;\n  gap: $space-4;\n  flex-wrap: wrap;\n  margin-top: $space-2;\n}\n\n.hero-stat {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 80px;\n\n  .stat-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .stat-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .stat-bar {\n    width: 100%;\n    height: 4px;\n    background: $gray-200;\n    border-radius: $radius-full;\n    overflow: hidden;\n\n    .stat-bar-fill {\n      height: 100%;\n      background: $primary-gradient;\n      border-radius: $radius-full;\n      transition: width 1s ease-out;\n\n      &--leads { background: $cyan-gradient; }\n      &--prospects { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n      &--success { background: $success-gradient; }\n    }\n  }\n}\n\n.hero-actions {\n  display: flex;\n  gap: $space-3;\n  margin-top: $space-2;\n  flex-wrap: wrap;\n}\n\n// Hero Visual Cards\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform $transition-base, box-shadow $transition-base;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n\n  .card-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n  }\n\n  &--primary .card-icon {\n    background: $primary-gradient;\n    color: white;\n  }\n\n  &--secondary .card-icon {\n    background: $cyan-gradient;\n    color: white;\n  }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    &--up {\n      color: $success;\n    }\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// BUTTONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.btn {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  border: none;\n  border-radius: $radius-md;\n  font-size: $font-size-base;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all $transition-base;\n  overflow: hidden;\n\n  i {\n    font-size: $font-size-base;\n  }\n}\n\n.btn-primary {\n  background: $primary-gradient;\n  color: white;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n  }\n\n  &:active {\n    transform: translateY(0);\n  }\n}\n\n.btn-glow {\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);\n    animation: shimmer 3s infinite;\n  }\n\n  .btn-shine {\n    position: absolute;\n    top: 0;\n    left: -100%;\n    width: 100%;\n    height: 100%;\n    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);\n    transition: left 0.4s ease;\n  }\n\n  &:hover .btn-shine {\n    left: 100%;\n  }\n}\n\n.btn-secondary {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  color: $gray-700;\n  box-shadow: $glass-shadow;\n\n  &:hover {\n    background: white;\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n}\n\n.btn-ghost {\n  background: transparent;\n  color: $gray-600;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.05);\n    color: $gray-800;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// METRICS SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.metrics-section {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1400px) {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all $transition-base;\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 5 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-lg;\n    color: white;\n    flex-shrink: 0;\n    transition: transform $transition-spring;\n  }\n\n  &--total .metric-icon { background: $primary-gradient; }\n  &--leads .metric-icon { background: $cyan-gradient; }\n  &--prospects .metric-icon { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n  &--customers .metric-icon { background: $success-gradient; }\n  &--new .metric-icon { background: $orange-gradient; }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n}\n\n// Sparkline Chart\n.metric-chart {\n  position: absolute;\n  right: $space-4;\n  bottom: $space-3;\n  width: 60px;\n  height: 24px;\n  opacity: 0.5;\n\n  .sparkline {\n    width: 100%;\n    height: 100%;\n  }\n}\n\n// Ring Chart\n.metric-ring {\n  position: absolute;\n  right: $space-3;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: $gray-200;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n    animation: ring-draw 1s ease-out;\n\n    &--cyan { stroke: $cyan; }\n    &--purple { stroke: $purple; }\n    &--green { stroke: $success; }\n  }\n}\n\n// Badge\n.metric-badge {\n  position: absolute;\n  top: $space-3;\n  right: $space-3;\n\n  span {\n    display: inline-block;\n    padding: $space-1 $space-2;\n    background: $orange-gradient;\n    color: white;\n    font-size: $font-size-xs;\n    font-weight: 700;\n    border-radius: $radius-sm;\n    animation: badge-pulse 2s ease-in-out infinite;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// FILTER SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.filter-section {\n  position: relative;\n  z-index: 2;\n  margin-bottom: $space-4;\n  animation: fade-in-up 0.5s ease-out 0.3s both;\n}\n\n.filter-bar {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  flex-wrap: wrap;\n\n  @media (max-width: 900px) {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n\n.search-wrapper {\n  position: relative;\n  flex: 1;\n  min-width: 240px;\n\n  .search-icon {\n    position: absolute;\n    left: $space-3;\n    top: 50%;\n    transform: translateY(-50%);\n    color: $gray-400;\n    font-size: $font-size-base;\n    transition: color $transition-fast;\n  }\n\n  .search-input {\n    width: 100%;\n    padding: $space-2 $space-3 $space-2 $space-8;\n    background: rgba(0, 0, 0, 0.03);\n    border: 1px solid transparent;\n    border-radius: $radius-md;\n    font-size: $font-size-base;\n    color: $gray-800;\n    transition: all $transition-fast;\n\n    &::placeholder {\n      color: $gray-400;\n    }\n\n    &:focus {\n      outline: none;\n      background: white;\n      border-color: $primary;\n      box-shadow: 0 0 0 4px rgba($primary, 0.1);\n\n      & + .search-icon,\n      & ~ .search-icon {\n        color: $primary;\n      }\n    }\n  }\n\n  .search-kbd {\n    position: absolute;\n    right: $space-3;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: $space-1 $space-2;\n    background: $gray-100;\n    border: 1px solid $gray-200;\n    border-radius: $radius-sm;\n    font-size: $font-size-xs;\n    font-family: system-ui, sans-serif;\n    color: $gray-500;\n  }\n}\n\n.filter-pills {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.filter-pill {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-1 $space-2;\n  background: rgba(0, 0, 0, 0.03);\n  border-radius: $radius-md;\n  transition: background $transition-fast;\n\n  i {\n    color: $gray-400;\n    font-size: $font-size-sm;\n  }\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.06);\n  }\n\n  ::ng-deep .filter-select {\n    .p-select {\n      background: transparent;\n      border: none;\n      box-shadow: none;\n      padding: 0;\n      min-width: 80px;\n\n      &:focus {\n        box-shadow: none;\n      }\n\n      .p-select-label {\n        padding: 2px $space-1;\n        font-size: $font-size-sm;\n        color: $gray-700;\n      }\n    }\n  }\n}\n\n.filter-actions {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  margin-left: auto;\n\n  @media (max-width: 900px) {\n    margin-left: 0;\n    justify-content: space-between;\n  }\n}\n\n.view-switcher {\n  display: flex;\n  padding: 2px;\n  background: rgba(0, 0, 0, 0.03);\n  border-radius: $radius-md;\n}\n\n.view-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-sm;\n  color: $gray-400;\n  cursor: pointer;\n  transition: all $transition-fast;\n\n  &:hover {\n    color: $gray-600;\n  }\n\n  &.active {\n    background: white;\n    color: $primary;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  }\n}\n\n.filter-summary {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  margin-top: $space-2;\n  flex-wrap: wrap;\n\n  .summary-label {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n\n  .filter-tag {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-1;\n    padding: 2px $space-2;\n    background: rgba($primary, 0.1);\n    border-radius: $radius-full;\n    font-size: $font-size-sm;\n    color: $primary;\n\n    i {\n      font-size: $font-size-xs;\n      cursor: pointer;\n      opacity: 0.7;\n      transition: opacity $transition-fast;\n\n      &:hover {\n        opacity: 1;\n      }\n    }\n  }\n}\n\n// Advanced filter toggle active indicator\n.btn.btn-ghost.active {\n  background: rgba($primary, 0.08);\n  color: $primary;\n}\n\n.filter-badge {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: $primary;\n  flex-shrink: 0;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ADVANCED FILTER PANEL\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.advanced-filter-panel {\n  margin-top: $space-3;\n  padding: $space-4 $space-5;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  animation: fade-in-up 0.3s ease-out;\n}\n\n.filter-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-4;\n  align-items: end;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: repeat(3, 1fr);\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.filter-field {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n\n  label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  &--actions {\n    display: flex;\n    flex-direction: row;\n    align-items: flex-end;\n    gap: $space-2;\n    justify-content: flex-start;\n  }\n\n  ::ng-deep {\n    .p-select {\n      width: 100%;\n    }\n\n    .p-datepicker {\n      width: 100%;\n    }\n\n    .p-inputnumber {\n      width: 100%;\n\n      .p-inputnumber-input {\n        width: 100%;\n      }\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DATA SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.data-section {\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out 0.4s both;\n}\n\n.data-card {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.data-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  flex-wrap: wrap;\n  gap: $space-3;\n\n  .header-title {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n\n    h2 {\n      margin: 0;\n      font-size: $font-size-lg;\n      font-weight: 600;\n      color: $gray-800;\n    }\n\n    .record-count {\n      font-size: $font-size-sm;\n      color: $gray-500;\n    }\n  }\n\n  .header-actions {\n    display: flex;\n    gap: $space-2;\n  }\n}\n\n.action-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(12px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-600;\n  cursor: pointer;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  .action-btn__icon {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    width: 24px;\n    height: 24px;\n    border-radius: $radius-sm;\n    color: white;\n    font-size: 0.75rem;\n    transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);\n  }\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);\n\n    .action-btn__icon {\n      transform: scale(1.15) rotate(3deg);\n    }\n  }\n\n  &:disabled {\n    opacity: 0.45;\n    pointer-events: none;\n  }\n\n  &--import .action-btn__icon {\n    background: $cyan-gradient;\n  }\n\n  &--import:hover {\n    border-color: rgba($cyan, 0.3);\n    color: color.adjust($cyan, $lightness: -10%);\n    box-shadow: 0 4px 14px rgba($cyan, 0.15);\n  }\n\n  &--export .action-btn__icon {\n    background: $success-gradient;\n  }\n\n  &--export:hover {\n    border-color: rgba($success, 0.3);\n    color: color.adjust($success, $lightness: -10%);\n    box-shadow: 0 4px 14px rgba($success, 0.15);\n  }\n\n  &--columns .action-btn__icon {\n    background: $purple-gradient;\n  }\n\n  &--columns:hover {\n    border-color: rgba($purple, 0.3);\n    color: color.adjust($purple, $lightness: -10%);\n    box-shadow: 0 4px 14px rgba($purple, 0.15);\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// LOADING STATE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.loading-state {\n  padding: $space-3;\n}\n\n.skeleton-row {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n  &:last-child {\n    border-bottom: none;\n  }\n}\n\n.skeleton {\n  background: linear-gradient(90deg, $gray-100 25%, $gray-50 50%, $gray-100 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n  border-radius: $radius-md;\n}\n\n.skeleton-avatar {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.skeleton-text {\n  height: 12px;\n  width: 100px;\n  flex: 1;\n  max-width: 200px;\n}\n\n.skeleton-short {\n  max-width: 100px;\n}\n\n.skeleton-badge {\n  height: 24px;\n  width: 80px;\n  border-radius: $radius-full;\n}\n\n.skeleton-actions {\n  height: 32px;\n  width: 80px;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// EMPTY STATE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: $space-10 $space-6;\n  text-align: center;\n\n  .empty-icon {\n    width: 60px;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $gray-100;\n    border-radius: 50%;\n    margin-bottom: $space-4;\n\n    i {\n      font-size: $font-size-2xl;\n      color: $gray-400;\n    }\n  }\n\n  h3 {\n    margin: 0 0 $space-1;\n    font-size: $font-size-xl;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0 0 $space-4;\n    font-size: $font-size-base;\n    color: $gray-500;\n    max-width: 360px;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DATA TABLE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.table-wrapper {\n  overflow-x: auto;\n}\n\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n  border-radius: 16px;\n  overflow: hidden;\n\n  // Soft blue gradient header - Global Standard\n  ::ng-deep .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n  }\n\n  // Standard body rows\n  ::ng-deep .p-datatable-tbody > tr > td {\n    vertical-align: middle;\n    padding: $space-3 $space-2;\n  }\n\n  .th-customer {\n    min-width: 240px;\n  }\n\n  .th-actions {\n    width: 100px;\n    text-align: right;\n  }\n\n  .th-select,\n  .td-select {\n    width: 36px;\n    text-align: center;\n  }\n}\n\n@media (max-width: 600px) {\n  // Keep dense tables usable on mobile with horizontal scroll.\n  .data-table {\n    min-width: 760px;\n  }\n}\n\n.table-row {\n  transition: background $transition-fast;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  &:hover {\n    background: rgba($primary, 0.03);\n\n    .customer-avatar {\n      transform: scale(1.05);\n      box-shadow: 0 4px 12px rgba($primary, 0.2);\n    }\n  }\n}\n\n.td-customer {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n}\n\n.checkbox {\n  width: 16px;\n  height: 16px;\n  accent-color: $primary;\n}\n\n::ng-deep .inline-select {\n  .p-select {\n    min-width: 130px;\n    border-radius: $radius-md;\n    background: rgba(255, 255, 255, 0.8);\n  }\n\n  .p-select-label {\n    font-size: $font-size-sm;\n    color: $gray-700;\n  }\n}\n\n.customer-avatar {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: 50%;\n  flex-shrink: 0;\n  transition: all $transition-spring;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n.customer-info {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n\n  .customer-name {\n    font-weight: 600;\n    font-size: $font-size-base;\n    color: $gray-800;\n  }\n\n  .customer-date {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n.company-name {\n  color: $gray-700;\n  font-size: $font-size-base;\n}\n\n.bulk-assign {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.status-badge {\n  display: inline-flex;\n  padding: 2px $space-2;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: $radius-full;\n  text-transform: capitalize;\n\n  &[data-status=\"lead\"] {\n    background: rgba($cyan, 0.15);\n    color: color.adjust($cyan, $lightness: -15%);\n  }\n\n  &[data-status=\"prospect\"] {\n    background: rgba($purple, 0.15);\n    color: color.adjust($purple, $lightness: -15%);\n  }\n\n  &[data-status=\"customer\"] {\n    background: rgba($success, 0.15);\n    color: color.adjust($success, $lightness: -15%);\n  }\n\n  &[data-status=\"inactive\"] {\n    background: rgba($gray-500, 0.15);\n    color: $gray-600;\n  }\n}\n\n.contact-info {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n\n  .contact-email {\n    font-size: $font-size-sm;\n    color: $gray-700;\n  }\n\n  .contact-phone {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n.cell {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n\n  .cell-label {\n    font-size: $font-size-xs;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: $gray-500;\n  }\n\n  .cell-value {\n    color: $gray-800;\n    font-weight: 600;\n  }\n\n  .action-buttons {\n    display: flex;\n    gap: $space-1;\n  }\n}\n\n.owner-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 2px $space-2 2px 2px;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  color: $gray-700;\n\n  .owner-avatar {\n    width: 18px;\n    height: 18px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $primary-gradient;\n    color: white;\n    font-size: $font-size-xs;\n    font-weight: 600;\n    border-radius: 50%;\n  }\n}\n\n.unassigned {\n  font-size: $font-size-sm;\n  color: $gray-400;\n  font-style: italic;\n}\n\n.td-actions {\n  text-align: right;\n}\n\n.row-actions {\n  display: inline-flex;\n  gap: $space-2;\n}\n\n.row-action-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  border: none;\n  border-radius: $radius-md;\n  cursor: pointer;\n  font-size: $font-size-sm;\n  color: white;\n  transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &--edit {\n    background: $blue-gradient;\n    box-shadow: 0 2px 8px rgba($info, 0.25);\n\n    &:hover {\n      transform: translateY(-2px) scale(1.1);\n      box-shadow: 0 6px 16px rgba($info, 0.35);\n    }\n  }\n\n  &--delete {\n    background: linear-gradient(135deg, #f87171 0%, $danger 100%);\n    box-shadow: 0 2px 8px rgba($danger, 0.25);\n\n    &:hover {\n      transform: translateY(-2px) scale(1.1);\n      box-shadow: 0 6px 16px rgba($danger, 0.35);\n    }\n  }\n\n  &:disabled {\n    opacity: 0.35;\n    pointer-events: none;\n    transform: none;\n    box-shadow: none;\n  }\n}\n\n.icon-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-sm;\n  color: $gray-400;\n  cursor: pointer;\n  font-size: $font-size-sm;\n  transition: all $transition-fast;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.06);\n    color: $gray-700;\n  }\n\n  &--danger:hover {\n    background: rgba($danger, 0.1);\n    color: $danger;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// CARD VIEW\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.cards-wrapper {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: $space-3;\n  padding: $space-4;\n}\n\n.customer-card {\n  background: white;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: $radius-lg;\n  overflow: hidden;\n  transition: all $transition-base;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .card-avatar {\n      transform: scale(1.05);\n    }\n  }\n\n  .card-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: $space-3;\n    background: linear-gradient(135deg, rgba($primary, 0.05) 0%, rgba($accent, 0.05) 100%);\n  }\n\n  .card-avatar {\n    width: 40px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $primary-gradient;\n    color: white;\n    font-size: $font-size-lg;\n    font-weight: 700;\n    border-radius: 50%;\n    transition: transform $transition-spring;\n    overflow: hidden;\n\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      border-radius: inherit;\n    }\n  }\n\n  .card-status {\n    padding: 2px $space-2;\n    font-size: $font-size-sm;\n    font-weight: 600;\n    border-radius: $radius-full;\n    text-transform: capitalize;\n\n    &[data-status=\"lead\"] {\n      background: rgba($cyan, 0.15);\n      color: color.adjust($cyan, $lightness: -15%);\n    }\n\n    &[data-status=\"prospect\"] {\n      background: rgba($purple, 0.15);\n      color: color.adjust($purple, $lightness: -15%);\n    }\n\n    &[data-status=\"customer\"] {\n      background: rgba($success, 0.15);\n      color: color.adjust($success, $lightness: -15%);\n    }\n\n    &[data-status=\"inactive\"] {\n      background: rgba($gray-500, 0.15);\n      color: $gray-600;\n    }\n  }\n\n  .card-body {\n    padding: $space-3;\n  }\n\n  .card-name {\n    margin: 0 0 2px;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .card-company {\n    margin: 0 0 $space-2;\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n\n  .card-details {\n    display: flex;\n    flex-direction: column;\n    gap: $space-1;\n  }\n\n  .detail-row {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-sm;\n    color: $gray-600;\n\n    i {\n      width: 16px;\n      color: $gray-400;\n    }\n  }\n\n  .card-footer {\n    display: flex;\n    border-top: 1px solid rgba(0, 0, 0, 0.06);\n  }\n\n  .card-btn {\n    flex: 1;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: $space-2;\n    padding: $space-2;\n    background: transparent;\n    border: none;\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: $gray-600;\n    cursor: pointer;\n    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n    &:first-child {\n      border-right: 1px solid rgba(0, 0, 0, 0.06);\n    }\n\n    .card-btn__icon {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 22px;\n      height: 22px;\n      border-radius: $radius-sm;\n      color: white;\n      font-size: 0.7rem;\n      transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);\n    }\n\n    &--edit {\n      .card-btn__icon {\n        background: $blue-gradient;\n      }\n\n      &:hover {\n        background: rgba($info, 0.06);\n        color: $info;\n\n        .card-btn__icon { transform: scale(1.15) rotate(5deg); }\n      }\n    }\n\n    &--delete {\n      .card-btn__icon {\n        background: linear-gradient(135deg, #f87171 0%, $danger 100%);\n      }\n\n      &:hover {\n        background: rgba($danger, 0.06);\n        color: $danger;\n\n        .card-btn__icon { transform: scale(1.15) rotate(-5deg); }\n      }\n    }\n\n    &:disabled {\n      opacity: 0.4;\n      pointer-events: none;\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// FOOTER / PAGINATION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.data-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-2 $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  flex-wrap: wrap;\n  gap: $space-3;\n\n  .pagination-info {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n::ng-deep .modern-paginator {\n  .p-paginator {\n    background: transparent;\n    border: none;\n    padding: 0;\n  }\n\n  .p-paginator-page,\n  .p-paginator-prev,\n  .p-paginator-next,\n  .p-paginator-first,\n  .p-paginator-last {\n    min-width: 28px;\n    height: 28px;\n    border-radius: $radius-sm;\n    transition: all $transition-fast;\n\n    &:hover:not(.p-disabled) {\n      background: rgba(0, 0, 0, 0.06);\n    }\n\n    &.p-paginator-page-selected {\n      background: $primary-gradient;\n      color: white;\n      box-shadow: 0 2px 8px rgba($primary, 0.3);\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// FLOATING ACTION BUTTON\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.fab {\n  position: fixed;\n  bottom: $space-6;\n  right: $space-6;\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  border: none;\n  border-radius: 50%;\n  font-size: $font-size-lg;\n  cursor: pointer;\n  box-shadow: 0 6px 20px rgba($primary, 0.4);\n  transition: all $transition-base;\n  z-index: 100;\n\n  &:hover {\n    transform: scale(1.1) rotate(90deg);\n    box-shadow: 0 8px 30px rgba($primary, 0.5);\n\n    .fab-tooltip {\n      opacity: 1;\n      transform: translateX(-100%) translateX(-$space-3) translateY(-50%);\n    }\n  }\n\n  &:active {\n    transform: scale(1.05) rotate(90deg);\n  }\n\n  .fab-tooltip {\n    position: absolute;\n    right: 100%;\n    top: 50%;\n    transform: translateX(-$space-2) translateY(-50%);\n    padding: $space-1 $space-2;\n    background: $gray-800;\n    color: white;\n    font-size: $font-size-sm;\n    font-weight: 500;\n    border-radius: $radius-md;\n    white-space: nowrap;\n    opacity: 0;\n    pointer-events: none;\n    transition: all $transition-base;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DARK MODE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n:host-context(.dark-theme) {\n  .page-container {\n    background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);\n  }\n\n  .orb {\n    opacity: 0.25;\n  }\n\n  .hero-badge {\n    background: rgba(30, 30, 50, 0.8);\n    border-color: rgba(255, 255, 255, 0.1);\n    color: $primary-light;\n  }\n\n  .hero-description {\n    color: rgba(255, 255, 255, 0.6);\n  }\n\n  .hero-stat {\n    .stat-value {\n      color: white;\n    }\n\n    .stat-label {\n      color: rgba(255, 255, 255, 0.5);\n    }\n\n    .stat-bar {\n      background: rgba(255, 255, 255, 0.1);\n    }\n  }\n\n  .visual-card,\n  .metric-card,\n  .filter-bar,\n  .data-card {\n    background: rgba(30, 30, 50, 0.8);\n    border-color: rgba(255, 255, 255, 0.08);\n  }\n\n  .visual-card {\n    .card-label {\n      color: rgba(255, 255, 255, 0.5);\n    }\n\n    .card-value {\n      color: white;\n    }\n\n    .card-trend {\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .metric-card {\n    .metric-label {\n      color: rgba(255, 255, 255, 0.5);\n    }\n\n    .metric-value {\n      color: white;\n    }\n  }\n\n  .metric-ring .ring-bg {\n    stroke: rgba(255, 255, 255, 0.1);\n  }\n\n  .btn-secondary {\n    background: rgba(255, 255, 255, 0.08);\n    border-color: rgba(255, 255, 255, 0.1);\n    color: rgba(255, 255, 255, 0.9);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.12);\n    }\n  }\n\n  .search-input {\n    background: rgba(255, 255, 255, 0.05);\n    color: white;\n\n    &::placeholder {\n      color: rgba(255, 255, 255, 0.4);\n    }\n\n    &:focus {\n      background: rgba(255, 255, 255, 0.08);\n    }\n  }\n\n  .search-kbd {\n    background: rgba(255, 255, 255, 0.08);\n    border-color: rgba(255, 255, 255, 0.1);\n    color: rgba(255, 255, 255, 0.5);\n  }\n\n  .filter-pill {\n    background: rgba(255, 255, 255, 0.05);\n\n    i {\n      color: rgba(255, 255, 255, 0.4);\n    }\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.08);\n    }\n\n    ::ng-deep .filter-select .p-select .p-select-label {\n      color: rgba(255, 255, 255, 0.8);\n    }\n  }\n\n  .view-switcher {\n    background: rgba(255, 255, 255, 0.05);\n  }\n\n  .view-btn {\n    color: rgba(255, 255, 255, 0.4);\n\n    &:hover {\n      color: rgba(255, 255, 255, 0.7);\n    }\n\n    &.active {\n      background: rgba(255, 255, 255, 0.1);\n      color: $primary-light;\n    }\n  }\n\n  .filter-summary .summary-label {\n    color: rgba(255, 255, 255, 0.5);\n  }\n\n  .filter-summary .filter-tag {\n    background: rgba($primary, 0.2);\n    color: $primary-light;\n  }\n\n  .data-header {\n    border-color: rgba(255, 255, 255, 0.06);\n\n    .header-title h2 {\n      color: white;\n    }\n\n    .record-count {\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .action-btn {\n    background: rgba(255, 255, 255, 0.06);\n    border-color: rgba(255, 255, 255, 0.1);\n    color: rgba(255, 255, 255, 0.7);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.1);\n      border-color: rgba(255, 255, 255, 0.18);\n      color: white;\n    }\n\n    &--import:hover {\n      border-color: rgba($cyan, 0.4);\n      color: color.adjust($cyan, $lightness: 15%);\n      box-shadow: 0 4px 14px rgba($cyan, 0.2);\n    }\n\n    &--export:hover {\n      border-color: rgba($success, 0.4);\n      color: color.adjust($success, $lightness: 15%);\n      box-shadow: 0 4px 14px rgba($success, 0.2);\n    }\n\n    &--columns:hover {\n      border-color: rgba($purple, 0.4);\n      color: color.adjust($purple, $lightness: 15%);\n      box-shadow: 0 4px 14px rgba($purple, 0.2);\n    }\n  }\n\n  .data-table {\n    thead th {\n      background: rgba(0, 0, 0, 0.2);\n      border-color: rgba(255, 255, 255, 0.06);\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .table-row {\n    border-color: rgba(255, 255, 255, 0.04);\n\n    &:hover {\n      background: rgba($primary, 0.08);\n    }\n  }\n\n  .customer-info {\n    .customer-name {\n      color: white;\n    }\n\n    .customer-date {\n      color: rgba(255, 255, 255, 0.4);\n    }\n  }\n\n  .company-name {\n    color: rgba(255, 255, 255, 0.8);\n  }\n\n  .contact-info {\n    .contact-email {\n      color: rgba(255, 255, 255, 0.8);\n    }\n\n    .contact-phone {\n      color: rgba(255, 255, 255, 0.4);\n    }\n  }\n\n  .owner-badge {\n    background: rgba(255, 255, 255, 0.08);\n    color: rgba(255, 255, 255, 0.8);\n  }\n\n  .unassigned {\n    color: rgba(255, 255, 255, 0.4);\n  }\n\n  .row-action-btn {\n    &--edit {\n      box-shadow: 0 2px 8px rgba($info, 0.3);\n    }\n\n    &--delete {\n      box-shadow: 0 2px 8px rgba($danger, 0.3);\n    }\n  }\n\n  .icon-btn {\n    color: rgba(255, 255, 255, 0.4);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.08);\n      color: white;\n    }\n  }\n\n  .customer-card {\n    background: rgba(30, 30, 50, 0.6);\n    border-color: rgba(255, 255, 255, 0.08);\n\n    .card-header {\n      background: rgba(255, 255, 255, 0.03);\n    }\n\n    .card-name {\n      color: white;\n    }\n\n    .card-company {\n      color: rgba(255, 255, 255, 0.5);\n    }\n\n    .detail-row {\n      color: rgba(255, 255, 255, 0.6);\n\n      i {\n        color: rgba(255, 255, 255, 0.4);\n      }\n    }\n\n    .card-footer {\n      border-color: rgba(255, 255, 255, 0.06);\n    }\n\n    .card-btn {\n      color: rgba(255, 255, 255, 0.7);\n\n      &:first-child {\n        border-color: rgba(255, 255, 255, 0.06);\n      }\n\n      &--edit:hover {\n        background: rgba($info, 0.12);\n        color: color.adjust($info, $lightness: 15%);\n      }\n\n      &--delete:hover {\n        background: rgba($danger, 0.12);\n        color: color.adjust($danger, $lightness: 15%);\n      }\n    }\n  }\n\n  .empty-state {\n    .empty-icon {\n      background: rgba(255, 255, 255, 0.08);\n\n      i {\n        color: rgba(255, 255, 255, 0.4);\n      }\n    }\n\n    h3 {\n      color: white;\n    }\n\n    p {\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .skeleton {\n    background: linear-gradient(90deg, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 75%);\n    background-size: 200% 100%;\n  }\n\n  .skeleton-row {\n    border-color: rgba(255, 255, 255, 0.04);\n  }\n\n  .data-footer {\n    border-color: rgba(255, 255, 255, 0.06);\n\n    .pagination-info {\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .fab {\n    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);\n\n    .fab-tooltip {\n      background: rgba(30, 30, 50, 0.9);\n    }\n  }\n\n  .import-dialog {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n\n    .import-note {\n      margin: 0;\n      color: rgba(255, 255, 255, 0.6);\n    }\n\n    .import-upload {\n      border: 1px dashed rgba(255, 255, 255, 0.25);\n      border-radius: 12px;\n      padding: 16px;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 12px;\n      cursor: pointer;\n      background: rgba(255, 255, 255, 0.04);\n\n      input {\n        display: none;\n      }\n\n      span {\n        font-weight: 600;\n        color: white;\n      }\n    }\n\n    .import-actions {\n      display: flex;\n      justify-content: flex-end;\n      gap: 12px;\n    }\n\n    .import-error {\n      color: #fca5a5;\n      font-weight: 600;\n    }\n\n    .import-result {\n      background: rgba(15, 23, 42, 0.35);\n      border-radius: 12px;\n      padding: 12px 14px;\n      border: 1px solid rgba(255, 255, 255, 0.08);\n\n      .import-metrics {\n        display: flex;\n        gap: 16px;\n        font-weight: 600;\n        color: white;\n      }\n\n      .import-errors {\n        margin-top: 8px;\n        color: rgba(255, 255, 255, 0.65);\n\n        ul {\n          margin: 6px 0 0;\n          padding-left: 18px;\n        }\n      }\n    }\n  }\n}\n"] }]
    }], () => [{ type: i1.CustomerDataService }, { type: i2.Router }, { type: i3.UserAdminDataService }, { type: i4.AppToastService }, { type: i5.ImportJobService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomersPage, { className: "CustomersPage", filePath: "src/app/crm/features/customers/pages/customers.page.ts", lineNumber: 76 }); })();
