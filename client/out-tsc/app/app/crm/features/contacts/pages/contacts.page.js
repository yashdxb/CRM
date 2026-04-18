import { NgClass, NgFor, NgIf, DatePipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { forkJoin, of, timer } from 'rxjs';
import { catchError, map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { ActivityDataService } from '../../activities/services/activity-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { exportToCsv } from '../../../../shared/utils/csv';
import { BulkActionsBarComponent } from '../../../../shared/components/bulk-actions/bulk-actions-bar.component';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { MailComposeService } from '../../../../core/email/mail-compose.service';
import * as i0 from "@angular/core";
import * as i1 from "../services/contact-data.service";
import * as i2 from "../../customers/services/customer-data.service";
import * as i3 from "@angular/router";
import * as i4 from "../../settings/services/user-admin-data.service";
import * as i5 from "../../../../core/app-toast.service";
import * as i6 from "../../../../shared/services/import-job.service";
import * as i7 from "@angular/forms";
import * as i8 from "primeng/api";
import * as i9 from "primeng/checkbox";
import * as i10 from "primeng/fileupload";
import * as i11 from "primeng/table";
import * as i12 from "primeng/tag";
import * as i13 from "primeng/inputtext";
import * as i14 from "primeng/select";
import * as i15 from "primeng/button";
import * as i16 from "primeng/paginator";
import * as i17 from "primeng/skeleton";
import * as i18 from "primeng/dialog";
import * as i19 from "primeng/confirmdialog";
const _c0 = () => [5, 10, 20];
const _c1 = () => ({ width: "360px" });
const _c2 = () => ({ width: "480px" });
const _c3 = () => ({ width: "400px" });
const _c4 = () => ({ width: "440px" });
const _c5 = () => ({ "min-width": "100%" });
const _c6 = () => [1, 2, 3, 4, 5];
function ContactsPage_div_146_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵelement(1, "i", 128);
    i0.ɵɵelementStart(2, "p-select", 129);
    i0.ɵɵlistener("ngModelChange", function ContactsPage_div_146_Template_p_select_ngModelChange_2_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onTagFilterChange($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("options", ctx_r2.tagOptions())("ngModel", ctx_r2.tagFilter);
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "th", 135)(2, "p-checkbox", 97);
    i0.ɵɵlistener("onChange", function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_1_Template_p_checkbox_onChange_2_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.toggleSelectAll($event.checked)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "th", 136);
    i0.ɵɵtext(4, "Contact ");
    i0.ɵɵelement(5, "p-sortIcon", 137);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th", 138);
    i0.ɵɵtext(7, "Phone ");
    i0.ɵɵelement(8, "p-sortIcon", 139);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 140);
    i0.ɵɵtext(10, "Role ");
    i0.ɵɵelement(11, "p-sortIcon", 141);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "th", 142);
    i0.ɵɵtext(13, "Score ");
    i0.ɵɵelement(14, "p-sortIcon", 143);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Tags");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th", 144);
    i0.ɵɵtext(18, "Lifecycle ");
    i0.ɵɵelement(19, "p-sortIcon", 145);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "th", 146);
    i0.ɵɵtext(21, "Owner ");
    i0.ɵɵelement(22, "p-sortIcon", 147);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "th", 148);
    i0.ɵɵtext(24, "Created ");
    i0.ɵɵelement(25, "p-sortIcon", 149);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "th", 150);
    i0.ɵɵtext(27, "Actions");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r2.selectedIds().length && ctx_r2.selectedIds().length === ctx_r2.filteredContacts().length);
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_small_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "small")(1, "a", 176);
    i0.ɵɵlistener("click", function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_small_7_Template_a_click_1_listener($event) { i0.ɵɵrestoreView(_r7); const row_r6 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.composeToContact(row_r6, $event)); });
    i0.ɵɵelement(2, "i", 177);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", row_r6.email);
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_small_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 178);
    i0.ɵɵtext(1, "No email");
    i0.ɵɵelementEnd();
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_a_15_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 179);
    i0.ɵɵlistener("click", function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_a_15_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r8); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(1, "i", 180);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("href", "tel:" + (row_r6.phone || row_r6.mobile), i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", row_r6.phone || row_r6.mobile);
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 181);
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_p_tag_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 182);
} if (rf & 2) {
    const row_r6 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("value", row_r6.buyingRole)("severity", ctx_r2.buyingRoleSeverity(row_r6.buyingRole))("rounded", true);
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_span_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 181);
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 183)(1, "div", 184);
    i0.ɵɵelement(2, "div", 185);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 186);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", row_r6.activityScore, "%");
    i0.ɵɵclassProp("score-bar__fill--low", row_r6.activityScore < 30)("score-bar__fill--mid", row_r6.activityScore >= 30 && row_r6.activityScore < 70)("score-bar__fill--high", row_r6.activityScore >= 70);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r6.activityScore);
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_span_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 181);
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_div_24_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 190);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tag_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(tag_r9);
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_div_24_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 191);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r6 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("+", row_r6.tags.length - 3);
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_div_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 187);
    i0.ɵɵtemplate(1, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_div_24_span_1_Template, 2, 1, "span", 188)(2, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_div_24_span_2_Template, 2, 1, "span", 189);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", row_r6.tags.slice(0, 3));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r6.tags.length > 3);
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_span_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 181);
    i0.ɵɵtext(1, "\u2014");
    i0.ɵɵelementEnd();
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 151);
    i0.ɵɵlistener("click", function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_Template_tr_click_0_listener($event) { const row_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.onRowClick(row_r6, $event)); });
    i0.ɵɵelementStart(1, "td", 152)(2, "p-checkbox", 97);
    i0.ɵɵlistener("onChange", function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_Template_p_checkbox_onChange_2_listener($event) { const row_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.toggleSelection(row_r6.id, $event.checked)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "td", 153)(4, "div", 154)(5, "div", 155);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_small_7_Template, 4, 1, "small", 156)(8, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_small_8_Template, 2, 0, "small", 157);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 158)(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵtemplate(15, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_a_15_Template, 3, 2, "a", 159)(16, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_span_16_Template, 2, 0, "span", 160);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td");
    i0.ɵɵtemplate(18, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_p_tag_18_Template, 1, 3, "p-tag", 161)(19, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_span_19_Template, 2, 0, "span", 160);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "td");
    i0.ɵɵtemplate(21, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_div_21_Template, 5, 9, "div", 162)(22, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_span_22_Template, 2, 0, "span", 160);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "td");
    i0.ɵɵtemplate(24, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_div_24_Template, 3, 2, "div", 163)(25, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_span_25_Template, 2, 0, "span", 160);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "td")(27, "p-select", 164);
    i0.ɵɵlistener("ngModelChange", function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_Template_p_select_ngModelChange_27_listener($event) { const row_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.onInlineLifecycleChange(row_r6, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "td")(29, "p-select", 165);
    i0.ɵɵlistener("ngModelChange", function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_Template_p_select_ngModelChange_29_listener($event) { const row_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.onInlineOwnerChange(row_r6, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "td", 166)(31, "span", 167);
    i0.ɵɵtext(32);
    i0.ɵɵpipe(33, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(34, "td", 168)(35, "div", 169)(36, "button", 170);
    i0.ɵɵlistener("click", function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_Template_button_click_36_listener($event) { const row_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.openQuickActivity(row_r6)); });
    i0.ɵɵelement(37, "i", 171);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "button", 172);
    i0.ɵɵlistener("click", function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_Template_button_click_38_listener($event) { const row_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.onEdit(row_r6)); });
    i0.ɵɵelement(39, "i", 173);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "button", 174);
    i0.ɵɵlistener("click", function ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_Template_button_click_40_listener($event) { const row_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.onDelete(row_r6)); });
    i0.ɵɵelement(41, "i", 175);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const row_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r2.isSelected(row_r6.id));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(row_r6.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r6.email);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !row_r6.email);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r6.accountName || "No customer");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r6.jobTitle || "No role");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", row_r6.phone || row_r6.mobile);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !row_r6.phone && !row_r6.mobile);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", row_r6.buyingRole);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !row_r6.buyingRole);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", row_r6.activityScore != null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r6.activityScore == null);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", row_r6.tags == null ? null : row_r6.tags.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !(row_r6.tags == null ? null : row_r6.tags.length));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("options", ctx_r2.lifecycleFormOptions)("ngModel", row_r6.lifecycleStage || "Customer");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("options", ctx_r2.ownerOptionsForAssign())("ngModel", row_r6.ownerId);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(33, 22, row_r6.createdAt, "MMM d, yyyy"));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
} }
function ContactsPage_ng_container_204_ng_container_1_p_table_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-table", 132);
    i0.ɵɵtemplate(1, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_1_Template, 28, 2, "ng-template", 133)(2, ContactsPage_ng_container_204_ng_container_1_p_table_1_ng_template_2_Template, 42, 25, "ng-template", 134);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("value", ctx_r2.filteredContacts())("tableStyle", i0.ɵɵpureFunction0(3, _c5))("styleClass", "p-datatable-sm");
} }
function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_9_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r11 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r11.jobTitle);
} }
function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_9_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, " \u00B7 ");
    i0.ɵɵelementEnd();
} }
function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_9_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r11 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r11.accountName);
} }
function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 208);
    i0.ɵɵtemplate(1, ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_9_span_1_Template, 2, 1, "span", 156)(2, ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_9_span_2_Template, 2, 0, "span", 156)(3, ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_9_span_3_Template, 2, 1, "span", 156);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r11.jobTitle);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r11.jobTitle && row_r11.accountName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r11.accountName);
} }
function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 209);
    i0.ɵɵelement(1, "i", 177);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r11.email);
} }
function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 209);
    i0.ɵɵelement(1, "i", 180);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r11.phone || row_r11.mobile);
} }
function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_13_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 190);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const tag_r12 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(tag_r12);
} }
function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_13_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 191);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r11 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("+", row_r11.tags.length - 2);
} }
function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 210);
    i0.ɵɵtemplate(1, ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_13_span_1_Template, 2, 1, "span", 188)(2, ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_13_span_2_Template, 2, 1, "span", 189);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", row_r11.tags.slice(0, 2));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r11.tags.length > 2);
} }
function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 211)(1, "div", 184);
    i0.ɵɵelement(2, "div", 185);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 186);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r11 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", row_r11.activityScore, "%");
    i0.ɵɵclassProp("score-bar__fill--low", row_r11.activityScore < 30)("score-bar__fill--mid", row_r11.activityScore >= 30 && row_r11.activityScore < 70)("score-bar__fill--high", row_r11.activityScore >= 70);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r11.activityScore);
} }
function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 194);
    i0.ɵɵlistener("click", function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_Template_div_click_0_listener() { const row_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.onEdit(row_r11)); });
    i0.ɵɵelementStart(1, "div", 195)(2, "div", 196);
    i0.ɵɵelement(3, "img", 197);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 198);
    i0.ɵɵelement(5, "p-tag", 182);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 199)(7, "div", 200);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_9_Template, 4, 3, "div", 201);
    i0.ɵɵelementStart(10, "div", 202);
    i0.ɵɵtemplate(11, ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_11_Template, 4, 1, "div", 203)(12, ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_12_Template, 4, 1, "div", 203)(13, ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_13_Template, 3, 2, "div", 204);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 205);
    i0.ɵɵtemplate(15, ContactsPage_ng_container_204_ng_container_1_div_2_div_1_div_15_Template, 5, 9, "div", 206);
    i0.ɵɵelementStart(16, "div", 207)(17, "button", 170);
    i0.ɵɵlistener("click", function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_Template_button_click_17_listener($event) { const row_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.openQuickActivity(row_r11)); });
    i0.ɵɵelement(18, "i", 171);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 172);
    i0.ɵɵlistener("click", function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_Template_button_click_19_listener($event) { const row_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.onEdit(row_r11)); });
    i0.ɵɵelement(20, "i", 173);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 174);
    i0.ɵɵlistener("click", function ContactsPage_ng_container_204_ng_container_1_div_2_div_1_Template_button_click_21_listener($event) { const row_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r2.onDelete(row_r11)); });
    i0.ɵɵelement(22, "i", 175);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const row_r11 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("src", row_r11.profilePictureUrl || "https://i.pravatar.cc/150?u=" + (row_r11.email || row_r11.id), i0.ɵɵsanitizeUrl)("alt", row_r11.name + " avatar")("title", row_r11.name + " avatar");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", row_r11.lifecycleStage || "Customer")("severity", ctx_r2.statusSeverity(row_r11.lifecycleStage))("rounded", true);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r11.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r11.jobTitle || row_r11.accountName);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", row_r11.email);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r11.phone || row_r11.mobile);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r11.tags == null ? null : row_r11.tags.length);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", row_r11.activityScore != null);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
} }
function ContactsPage_ng_container_204_ng_container_1_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 192);
    i0.ɵɵtemplate(1, ContactsPage_ng_container_204_ng_container_1_div_2_div_1_Template, 23, 14, "div", 193);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.filteredContacts());
} }
function ContactsPage_ng_container_204_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ContactsPage_ng_container_204_ng_container_1_p_table_1_Template, 3, 4, "p-table", 130)(2, ContactsPage_ng_container_204_ng_container_1_div_2_Template, 2, 1, "div", 131);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.viewMode() === "table");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.viewMode() === "grid");
} }
function ContactsPage_ng_container_204_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, ContactsPage_ng_container_204_ng_container_1_Template, 3, 2, "ng-container", 104);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const emptyState_r13 = i0.ɵɵreference(208);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.filteredContacts().length)("ngIfElse", emptyState_r13);
} }
function ContactsPage_ng_template_205_p_skeleton_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-skeleton", 214);
} }
function ContactsPage_ng_template_205_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 212);
    i0.ɵɵtemplate(1, ContactsPage_ng_template_205_p_skeleton_1_Template, 1, 0, "p-skeleton", 213);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c6));
} }
function ContactsPage_ng_template_207_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 215);
    i0.ɵɵelement(1, "i", 74);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No contacts match the current filters.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 216);
    i0.ɵɵlistener("click", function ContactsPage_ng_template_207_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r14); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onCreate()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
} }
function ContactsPage_ng_template_216_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 119);
    i0.ɵɵlistener("click", function ContactsPage_ng_template_216_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.assignDialogVisible = false); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 217);
    i0.ɵɵlistener("click", function ContactsPage_ng_template_216_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.confirmBulkAssign()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.assignOwnerId || !ctx_r2.canManage());
} }
function ContactsPage_ng_template_222_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 119);
    i0.ɵɵlistener("click", function ContactsPage_ng_template_222_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.statusDialogVisible = false); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 218);
    i0.ɵɵlistener("click", function ContactsPage_ng_template_222_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.confirmBulkStatusUpdate()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.bulkStatus || !ctx_r2.canManage());
} }
function ContactsPage_div_239_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 219);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.importError());
} }
function ContactsPage_div_240_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 220)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_4_0;
    const job_r17 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Status: ", ((tmp_4_0 = ctx_r2.importStatus()) == null ? null : tmp_4_0.status) || job_r17.status);
} }
function ContactsPage_div_241_div_8_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const err_r18 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" Row ", err_r18.rowNumber, ": ", err_r18.message, " ");
} }
function ContactsPage_div_241_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 224)(1, "p");
    i0.ɵɵtext(2, "Errors (first 5):");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul");
    i0.ɵɵtemplate(4, ContactsPage_div_241_div_8_li_4_Template, 2, 2, "li", 225);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const result_r19 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", result_r19.errors.slice(0, 5));
} }
function ContactsPage_div_241_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 221)(1, "div", 222)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, ContactsPage_div_241_div_8_Template, 5, 1, "div", 223);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const result_r19 = ctx.ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Rows: ", result_r19.total);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Imported: ", result_r19.imported);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Skipped: ", result_r19.skipped);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", result_r19.errors.length);
} }
function ContactsPage_div_243_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 233);
    i0.ɵɵelement(1, "i", 234);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r21 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r21.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r21.label);
} }
function ContactsPage_div_243_ng_template_10_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 233);
    i0.ɵɵelement(1, "i", 234);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r22 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r22.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r22.label);
} }
function ContactsPage_div_243_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, ContactsPage_div_243_ng_template_10_div_0_Template, 4, 2, "div", 235);
} if (rf & 2) {
    const option_r22 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r22);
} }
function ContactsPage_div_243_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 226)(1, "div", 227);
    i0.ɵɵelement(2, "i", 74);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 228)(6, "label");
    i0.ɵɵtext(7, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p-select", 229);
    i0.ɵɵtwoWayListener("ngModelChange", function ContactsPage_div_243_Template_p_select_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.activityType, $event) || (ctx_r2.activityType = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtemplate(9, ContactsPage_div_243_ng_template_9_Template, 4, 2, "ng-template", 230)(10, ContactsPage_div_243_ng_template_10_Template, 1, 1, "ng-template", 231);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 228)(12, "label");
    i0.ɵɵtext(13, "Subject");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "input", 232);
    i0.ɵɵtwoWayListener("ngModelChange", function ContactsPage_div_243_Template_input_ngModelChange_14_listener($event) { i0.ɵɵrestoreView(_r20); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.activitySubject, $event) || (ctx_r2.activitySubject = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.activityLogContact.name);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r2.activityTypeOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.activityType);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.activitySubject);
} }
function ContactsPage_ng_template_244_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 119);
    i0.ɵɵlistener("click", function ContactsPage_ng_template_244_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r23); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.activityLogVisible = false); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 236);
    i0.ɵɵlistener("click", function ContactsPage_ng_template_244_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r23); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.saveQuickActivity()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.activitySubject.trim() || ctx_r2.activitySaving());
} }
function ContactsPage_div_246_div_7_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 246);
} }
function ContactsPage_div_246_div_7_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 247);
    i0.ɵɵtext(1, "Primary");
    i0.ɵɵelementEnd();
} }
function ContactsPage_div_246_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 241);
    i0.ɵɵlistener("click", function ContactsPage_div_246_div_7_Template_div_click_0_listener() { const id_r25 = i0.ɵɵrestoreView(_r24).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.mergeMasterId = id_r25); });
    i0.ɵɵelementStart(1, "div", 242);
    i0.ɵɵtemplate(2, ContactsPage_div_246_div_7_span_2_Template, 1, 0, "span", 243);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 244);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, ContactsPage_div_246_div_7_span_5_Template, 2, 0, "span", 245);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const id_r25 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("merge-option--selected", ctx_r2.mergeMasterId === id_r25);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.mergeMasterId === id_r25);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.getMergeContactName(id_r25));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.mergeMasterId === id_r25);
} }
function ContactsPage_div_246_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 237)(1, "p", 238);
    i0.ɵɵtext(2, "Select the ");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4, "primary contact");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " to keep. All activities, opportunities, and tags from the other contacts will be merged into it.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 239);
    i0.ɵɵtemplate(7, ContactsPage_div_246_div_7_Template, 6, 5, "div", 240);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r2.selectedIds());
} }
function ContactsPage_ng_template_247_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 119);
    i0.ɵɵlistener("click", function ContactsPage_ng_template_247_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r26); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.mergeDialogVisible = false); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 248);
    i0.ɵɵlistener("click", function ContactsPage_ng_template_247_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r26); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.confirmMerge()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r2.mergeMasterId || ctx_r2.merging());
} }
export class ContactsPage {
    contactsData;
    customerData;
    router;
    userAdminData;
    toastService;
    importJobs;
    lifecycleOptions = [
        { label: 'All statuses', value: 'all' },
        { label: 'Lead', value: 'Lead' },
        { label: 'Prospect', value: 'Prospect' },
        { label: 'Customer', value: 'Customer' }
    ];
    viewMode = signal('table', ...(ngDevMode ? [{ debugName: "viewMode" }] : []));
    contacts = signal([], ...(ngDevMode ? [{ debugName: "contacts" }] : []));
    total = signal(0, ...(ngDevMode ? [{ debugName: "total" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    customers = signal([], ...(ngDevMode ? [{ debugName: "customers" }] : []));
    ownerFilter = signal('all', ...(ngDevMode ? [{ debugName: "ownerFilter" }] : []));
    lifecycleFilter = signal('all', ...(ngDevMode ? [{ debugName: "lifecycleFilter" }] : []));
    ownerOptions = computed(() => {
        const owners = Array.from(new Set(this.contacts().map((c) => c.owner))).filter(Boolean);
        return [
            { label: 'Any owner', value: 'all' },
            ...owners.sort().map((owner) => ({ label: owner, value: owner }))
        ];
    }, ...(ngDevMode ? [{ debugName: "ownerOptions" }] : []));
    lifecycleFormOptions = this.lifecycleOptions.filter((option) => option.value !== 'all');
    accountFilterOptions = computed(() => {
        const customerOptions = this.customers().map((customer) => ({ label: customer.name, value: customer.id }));
        return [{ label: 'All customers', value: 'all' }, ...customerOptions];
    }, ...(ngDevMode ? [{ debugName: "accountFilterOptions" }] : []));
    contactsInScope = computed(() => this.filteredContacts().length, ...(ngDevMode ? [{ debugName: "contactsInScope" }] : []));
    contactsWithLinkedAccounts = computed(() => this.contacts().filter((contact) => !!contact.accountId).length, ...(ngDevMode ? [{ debugName: "contactsWithLinkedAccounts" }] : []));
    lifecycleCounts = computed(() => {
        const counts = {
            lead: 0,
            prospect: 0,
            customer: 0
        };
        this.contacts().forEach((contact) => {
            const stage = contact.lifecycleStage ?? 'Customer';
            if (stage === 'Lead')
                counts.lead += 1;
            else if (stage === 'Prospect')
                counts.prospect += 1;
            else
                counts.customer += 1;
        });
        return counts;
    }, ...(ngDevMode ? [{ debugName: "lifecycleCounts" }] : []));
    ownerCount = computed(() => Math.max(this.ownerOptions().length - 1, 0), ...(ngDevMode ? [{ debugName: "ownerCount" }] : []));
    canManage = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.contactsManage);
    }, ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    // C17: Tag filter
    tagOptions = signal([], ...(ngDevMode ? [{ debugName: "tagOptions" }] : []));
    tagFilter = 'all';
    searchTerm = '';
    accountFilter = 'all';
    pageIndex = 0;
    rows = 10;
    selectedIds = signal([], ...(ngDevMode ? [{ debugName: "selectedIds" }] : []));
    bulkActions = computed(() => {
        const disabled = !this.canManage();
        const mergeDisabled = disabled || this.selectedIds().length < 2;
        return [
            { id: 'assign-owner', label: 'Assign owner', icon: 'pi pi-user', disabled },
            { id: 'change-status', label: 'Change status', icon: 'pi pi-tag', disabled },
            { id: 'merge', label: 'Merge', icon: 'pi pi-clone', disabled: mergeDisabled },
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
    // C16: Merge state
    mergeDialogVisible = false;
    mergeMasterId = null;
    merging = signal(false, ...(ngDevMode ? [{ debugName: "merging" }] : []));
    importStatus = signal(null, ...(ngDevMode ? [{ debugName: "importStatus" }] : []));
    importError = signal(null, ...(ngDevMode ? [{ debugName: "importError" }] : []));
    importing = signal(false, ...(ngDevMode ? [{ debugName: "importing" }] : []));
    importPoll;
    activeImportJobId = null;
    crmEventsService = inject(CrmEventsService);
    destroyRef = inject(DestroyRef);
    mailCompose = inject(MailComposeService);
    confirmationService = inject(ConfirmationService);
    activityData = inject(ActivityDataService);
    // C14: Quick activity log
    activityLogVisible = false;
    activityLogContact = null;
    activityType = 'Call';
    activitySubject = '';
    activitySaving = signal(false, ...(ngDevMode ? [{ debugName: "activitySaving" }] : []));
    activityTypeOptions = [
        { label: 'Call', value: 'Call', icon: 'pi-phone' },
        { label: 'Email', value: 'Email', icon: 'pi-envelope' },
        { label: 'Meeting', value: 'Meeting', icon: 'pi-calendar' },
        { label: 'Task', value: 'Task', icon: 'pi-check-square' },
        { label: 'Note', value: 'Note', icon: 'pi-file' }
    ];
    filteredContacts = computed(() => {
        let rows = [...this.contacts()];
        if (this.ownerFilter() !== 'all') {
            rows = rows.filter((c) => c.owner === this.ownerFilter());
        }
        if (this.lifecycleFilter() !== 'all') {
            rows = rows.filter((c) => (c.lifecycleStage ?? 'Customer') === this.lifecycleFilter());
        }
        return rows;
    }, ...(ngDevMode ? [{ debugName: "filteredContacts" }] : []));
    constructor(contactsData, customerData, router, userAdminData, toastService, importJobs) {
        this.contactsData = contactsData;
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
        this.loadAccounts();
        this.loadOwners();
        this.loadTags();
        this.crmEventsService.events$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => {
            if (event.eventType !== 'import.job.progress') {
                return;
            }
            this.handleImportProgressEvent(event.payload ?? null);
        });
    }
    load() {
        this.loading.set(true);
        this.contactsData
            .search({
            search: this.searchTerm || undefined,
            accountId: this.accountFilter === 'all' ? undefined : this.accountFilter,
            tag: this.tagFilter === 'all' ? undefined : this.tagFilter,
            page: this.pageIndex + 1,
            pageSize: this.rows
        })
            .subscribe((res) => {
            this.contacts.set(res.items);
            this.total.set(res.total);
            this.loading.set(false);
            this.selectedIds.set([]);
        });
    }
    loadAccounts() {
        this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
            this.customers.set(res.items);
        });
    }
    onCreate() {
        this.router.navigate(['/app/contacts/new']);
    }
    composeToContact(row, event) {
        event?.preventDefault();
        event?.stopPropagation();
        if (!row.email) {
            return;
        }
        this.mailCompose.open({
            toEmail: row.email,
            toName: row.name,
            relatedEntityType: 'Contact',
            relatedEntityId: row.id
        });
    }
    openImport() {
        this.importDialogVisible = true;
        this.importFile = null;
        this.activeImportJobId = null;
        this.importJob.set(null);
        this.importStatus.set(null);
        this.importError.set(null);
        this.stopImportPolling();
    }
    closeImport() {
        this.importDialogVisible = false;
        this.activeImportJobId = null;
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
        this.contactsData.importCsv(this.importFile).subscribe({
            next: (job) => {
                this.importJob.set(job);
                this.activeImportJobId = job.id;
                this.importStatus.set(null);
                this.raiseToast('success', 'Contact import queued.');
                if (this.crmEventsService.isFeatureEnabled('realtime.importProgress')) {
                    this.importing.set(true);
                }
                else {
                    this.startImportPolling(job.id);
                }
            },
            error: () => {
                this.importError.set('Import failed. Please check your CSV and try again.');
                this.importing.set(false);
                this.raiseToast('error', 'Contact import failed.');
            }
        });
    }
    onEdit(row) {
        this.router.navigate(['/app/contacts', row.id, 'edit'], { state: { contact: row } });
    }
    onRowClick(row, event) {
        if (!this.canManage() || this.isInteractiveRowTarget(event)) {
            return;
        }
        this.onEdit(row);
    }
    onDelete(row) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete <b>${row.name}</b>?`,
            header: 'Delete Contact',
            icon: 'pi pi-trash',
            acceptLabel: 'Delete',
            rejectLabel: 'Cancel',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.contactsData.delete(row.id).subscribe({
                    next: () => {
                        this.load();
                        this.raiseToast('success', 'Contact deleted.');
                    },
                    error: () => this.raiseToast('error', 'Unable to delete contact.')
                });
            }
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
    onLifecycleChange(value) {
        this.lifecycleFilter.set(value ?? 'all');
    }
    onAccountChange(value) {
        this.accountFilter = value ?? 'all';
        this.pageIndex = 0;
        this.load();
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
            this.raiseToast('error', 'Contact import status failed.');
            return of(null);
        }))), takeWhile((status) => !!status && (status.status === 'Queued' || status.status === 'Processing'), true), tap((status) => {
            if (!status)
                return;
            this.importStatus.set(status);
            if (status.status === 'Completed' && this.importing()) {
                this.importing.set(false);
                this.load();
                this.raiseToast('success', 'Contact import completed.');
            }
            if (status.status === 'Failed' && this.importing()) {
                this.importing.set(false);
                this.importError.set(status.errorMessage ?? 'Import failed. Please check your CSV and try again.');
                this.raiseToast('error', 'Contact import failed.');
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
    isInteractiveRowTarget(event) {
        const target = event.target;
        if (!target) {
            return false;
        }
        return !!target.closest('button,a,input,textarea,select,label,.p-select,.p-checkbox,.p-button,.inline-select,.row-actions');
    }
    handleImportProgressEvent(payload) {
        if (!payload || !this.crmEventsService.isFeatureEnabled('realtime.importProgress')) {
            return;
        }
        const jobId = String(payload['jobId'] ?? '');
        if (!jobId || (this.activeImportJobId && this.activeImportJobId !== jobId)) {
            return;
        }
        const status = String(payload['status'] ?? 'Queued');
        const processed = Number(payload['processed'] ?? 0);
        const succeeded = Number(payload['succeeded'] ?? 0);
        const failed = Number(payload['failed'] ?? 0);
        const total = Number(payload['total'] ?? processed);
        const startedAtUtc = String(payload['startedAtUtc'] ?? new Date().toISOString());
        const finishedAtUtcRaw = payload['finishedAtUtc'];
        const errorSummaryRaw = payload['errorSummary'];
        this.importing.set(status === 'Queued' || status === 'Processing');
        this.importStatus.set({
            id: jobId,
            entityType: String(payload['entityType'] ?? 'Contacts'),
            status,
            total,
            imported: succeeded,
            skipped: failed,
            errors: [],
            createdAtUtc: startedAtUtc,
            completedAtUtc: typeof finishedAtUtcRaw === 'string' ? finishedAtUtcRaw : null,
            errorMessage: typeof errorSummaryRaw === 'string' ? errorSummaryRaw : null
        });
        if (status === 'Completed') {
            this.importing.set(false);
            this.activeImportJobId = null;
            this.load();
            this.raiseToast('success', 'Contact import completed.');
            return;
        }
        if (status === 'Failed') {
            this.importing.set(false);
            this.activeImportJobId = null;
            this.importError.set(typeof errorSummaryRaw === 'string' ? errorSummaryRaw : 'Import failed. Please check your CSV and try again.');
            this.raiseToast('error', 'Contact import failed.');
            return;
        }
        if (total > 0 && processed >= total) {
            this.importing.set(false);
        }
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
            this.selectedIds.set(this.filteredContacts().map((row) => row.id));
            return;
        }
        this.selectedIds.set([]);
    }
    selectAllFiltered() {
        this.selectedIds.set(this.filteredContacts().map((row) => row.id));
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
        if (action.id === 'merge') {
            this.openMergeDialog();
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
        this.confirmationService.confirm({
            message: `Are you sure you want to delete <b>${ids.length}</b> contacts?`,
            header: 'Delete Contacts',
            icon: 'pi pi-trash',
            acceptLabel: 'Delete All',
            rejectLabel: 'Cancel',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                const deletes$ = ids.map((id) => this.contactsData.delete(id).pipe(map(() => true), catchError(() => of(false))));
                forkJoin(deletes$).subscribe((results) => {
                    const failures = results.filter((ok) => !ok).length;
                    this.clearSelection();
                    this.load();
                    if (failures) {
                        this.raiseToast('error', `${failures} contacts could not be deleted.`);
                        return;
                    }
                    this.raiseToast('success', 'Contacts deleted.');
                });
            }
        });
    }
    confirmBulkAssign() {
        const ids = this.selectedIds();
        if (!ids.length || !this.assignOwnerId) {
            return;
        }
        this.contactsData.bulkAssignOwner(ids, this.assignOwnerId).subscribe({
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
        this.contactsData.bulkUpdateLifecycle(ids, this.bulkStatus).subscribe({
            next: () => {
                this.statusDialogVisible = false;
                this.bulkStatus = null;
                this.clearSelection();
                this.load();
                this.raiseToast('success', 'Lifecycle updated.');
            },
            error: () => {
                this.raiseToast('error', 'Lifecycle update failed.');
            }
        });
    }
    onInlineLifecycleChange(row, status) {
        if (!status || row.lifecycleStage === status) {
            return;
        }
        this.contactsData.updateLifecycle(row.id, status).subscribe({
            next: () => {
                this.load();
                this.raiseToast('success', 'Lifecycle updated.');
            },
            error: () => {
                this.raiseToast('error', 'Lifecycle update failed.');
            }
        });
    }
    onInlineOwnerChange(row, ownerId) {
        if (!ownerId || row.ownerId === ownerId) {
            return;
        }
        this.contactsData.updateOwner(row.id, ownerId).subscribe({
            next: () => {
                this.load();
                this.raiseToast('success', 'Owner updated.');
            },
            error: () => {
                this.raiseToast('error', 'Owner update failed.');
            }
        });
    }
    clearToast() {
        this.toastService.clear();
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    // C14: Quick activity log methods
    openQuickActivity(contact) {
        this.activityLogContact = contact;
        this.activityType = 'Call';
        this.activitySubject = '';
        this.activityLogVisible = true;
    }
    saveQuickActivity() {
        if (!this.activityLogContact || !this.activitySubject.trim())
            return;
        this.activitySaving.set(true);
        this.activityData.create({
            subject: this.activitySubject.trim(),
            type: this.activityType,
            relatedEntityType: 'Contact',
            relatedEntityId: this.activityLogContact.id,
            priority: 'Normal'
        }).subscribe({
            next: () => {
                this.activitySaving.set(false);
                this.activityLogVisible = false;
                this.raiseToast('success', 'Activity logged.');
            },
            error: () => {
                this.activitySaving.set(false);
                this.raiseToast('error', 'Failed to log activity.');
            }
        });
    }
    // C16: Merge dialog
    openMergeDialog() {
        const ids = this.selectedIds();
        if (ids.length < 2)
            return;
        this.mergeMasterId = ids[0];
        this.mergeDialogVisible = true;
    }
    confirmMerge() {
        const ids = this.selectedIds();
        if (!this.mergeMasterId || ids.length < 2)
            return;
        const secondaryIds = ids.filter(id => id !== this.mergeMasterId);
        this.merging.set(true);
        this.contactsData.mergeContacts({ masterContactId: this.mergeMasterId, secondaryContactIds: secondaryIds }).subscribe({
            next: (res) => {
                this.merging.set(false);
                this.mergeDialogVisible = false;
                this.mergeMasterId = null;
                this.clearSelection();
                this.load();
                this.loadTags();
                this.raiseToast('success', `Merged ${res.mergedCount} contacts.`);
            },
            error: () => {
                this.merging.set(false);
                this.raiseToast('error', 'Contact merge failed.');
            }
        });
    }
    getMergeContactName(id) {
        return this.contacts().find(c => c.id === id)?.name ?? id;
    }
    // C17: Tag filter
    onTagFilterChange(value) {
        this.tagFilter = value ?? 'all';
        this.pageIndex = 0;
        this.load();
    }
    loadTags() {
        this.contactsData.getAllTags().subscribe((tags) => {
            this.tagOptions.set([
                { label: 'All tags', value: 'all' },
                ...tags.map(t => ({ label: t, value: t }))
            ]);
        });
    }
    onExport() {
        const rows = this.filteredContacts();
        const columns = [
            { header: 'Name', value: (row) => row.name },
            { header: 'Email', value: (row) => row.email },
            { header: 'Phone', value: (row) => row.phone },
            { header: 'Customer', value: (row) => row.accountName },
            { header: 'Lifecycle', value: (row) => row.lifecycleStage ?? 'Customer' },
            { header: 'Owner', value: (row) => row.owner },
            { header: 'Created At', value: (row) => row.createdAt }
        ];
        exportToCsv(rows, columns, 'contacts.csv');
    }
    statusSeverity(stage) {
        if (stage === 'Prospect')
            return 'warn';
        if (stage === 'Lead')
            return 'info';
        return 'info';
    }
    buyingRoleSeverity(role) {
        switch (role) {
            case 'Decision Maker': return 'success';
            case 'Champion': return 'info';
            case 'Influencer': return 'warn';
            case 'End User': return 'secondary';
            case 'Gatekeeper': return 'contrast';
            default: return 'info';
        }
    }
    loadOwners() {
        this.userAdminData.search({ includeInactive: false, page: 1, pageSize: 200 }).subscribe((res) => {
            const options = res.items.map((user) => ({ label: user.fullName, value: user.id }));
            this.ownerOptionsForAssign.set(options);
        });
    }
    static ɵfac = function ContactsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ContactsPage)(i0.ɵɵdirectiveInject(i1.ContactDataService), i0.ɵɵdirectiveInject(i2.CustomerDataService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i4.UserAdminDataService), i0.ɵɵdirectiveInject(i5.AppToastService), i0.ɵɵdirectiveInject(i6.ImportJobService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ContactsPage, selectors: [["app-contacts-page"]], features: [i0.ɵɵProvidersFeature([ConfirmationService])], decls: 249, vars: 99, consts: [["loadingState", ""], ["emptyState", ""], [1, "contacts", "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-stats"], [1, "hero-stat"], [1, "stat-value"], [1, "stat-label"], [1, "stat-bar"], [1, "stat-bar-fill", 2, "width", "100%"], [1, "stat-bar-fill", "stat-bar-fill--cyan"], [1, "stat-bar-fill", "stat-bar-fill--purple"], [1, "hero-actions"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "action-btn__icon"], [1, "pi", "pi-user-plus"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click"], [1, "pi", "pi-refresh"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-bullseye"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend"], [1, "pi", "pi-bolt"], [1, "card-glow"], [1, "visual-card", "visual-card--secondary"], [1, "pi", "pi-star"], [1, "card-trend", "card-trend--up"], [1, "pi", "pi-arrow-up"], [1, "metrics-section"], [1, "metric-card", "metric-card--total"], [1, "metric-icon"], [1, "pi", "pi-users"], [1, "metric-content"], [1, "metric-label"], [1, "metric-value"], [1, "metric-chart"], ["viewBox", "0 0 100 40", 1, "sparkline"], ["d", "M0,35 Q25,30 50,20 T100,15", "fill", "none", "stroke", "url(#gradient-contacts)", "stroke-width", "2"], ["id", "gradient-contacts", "x1", "0%", "y1", "0%", "x2", "100%", "y2", "0%"], ["offset", "0%", "stop-color", "#667eea"], ["offset", "100%", "stop-color", "#764ba2"], [1, "metric-card", "metric-card--leads"], [1, "metric-ring"], ["viewBox", "0 0 36 36"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-bg"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--cyan"], [1, "metric-card", "metric-card--prospects"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--purple"], [1, "metric-card", "metric-card--customers"], [1, "pi", "pi-check-circle"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--green"], [1, "filter-section"], [1, "filter-bar"], [1, "search-wrapper"], [1, "pi", "pi-search", "search-icon"], ["pInputText", "", "type", "search", "placeholder", "Search contacts, emails, phone...", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "search-kbd"], [1, "filter-pills"], [1, "filter-pill"], [1, "pi", "pi-user"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Owner", "styleClass", "filter-select", 3, "ngModelChange", "options", "ngModel"], [1, "pi", "pi-tag"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Lifecycle", "styleClass", "filter-select", 3, "ngModelChange", "options", "ngModel"], [1, "pi", "pi-building"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Customer", "styleClass", "filter-select", 3, "ngModelChange", "options", "ngModel"], ["class", "filter-pill", 4, "ngIf"], [1, "view-toggle"], ["type", "button", "title", "Table view", 1, "toggle-btn", 3, "click"], [1, "pi", "pi-list"], ["type", "button", "title", "Card view", 1, "toggle-btn", 3, "click"], [1, "pi", "pi-th-large"], [1, "lifecycle-chips"], ["type", "button", 1, "lifecycle-chip", 3, "click"], [1, "chip-count"], ["type", "button", 1, "lifecycle-chip", "lifecycle-chip--lead", 3, "click"], ["type", "button", 1, "lifecycle-chip", "lifecycle-chip--prospect", 3, "click"], ["type", "button", 1, "lifecycle-chip", "lifecycle-chip--customer", 3, "click"], [1, "contacts__content"], [1, "table-card", "crm-panel"], [1, "list-header"], [1, "list-title"], [1, "list-select"], [3, "onChange", "binary", "ngModel"], [1, "list-actions"], ["type", "button", 1, "action-btn", "action-btn--import", 3, "click", "disabled"], [1, "pi", "pi-upload"], ["type", "button", 1, "action-btn", "action-btn--export", 3, "click"], [1, "pi", "pi-download"], [1, "pi", "pi-plus"], [4, "ngIf", "ngIfElse"], ["styleClass", "contacts__paginator", 3, "onPageChange", "rows", "totalRecords", "rowsPerPageOptions", "first"], [3, "actionClicked", "clearSelection", "selectAll", "actions", "selectedItems", "totalCount"], ["header", "Assign owner", 3, "visibleChange", "visible", "modal"], [1, "bulk-assign"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Select owner", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["pTemplate", "footer"], ["header", "Change lifecycle", 3, "visibleChange", "visible", "modal"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Select lifecycle", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["header", "Import contacts", 3, "visibleChange", "onHide", "visible", "modal", "dismissableMask"], [1, "import-dialog"], [1, "import-note"], [1, "import-upload"], ["mode", "basic", "name", "file", "accept", ".csv", 3, "onSelect", "auto", "customUpload", "showUploadButton", "showCancelButton", "chooseLabel"], [1, "import-actions"], ["pButton", "", "type", "button", "label", "Cancel", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "button", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], ["class", "import-error", 4, "ngIf"], ["class", "import-status", 4, "ngIf"], ["class", "import-result", 4, "ngIf"], ["header", "Log Activity", 3, "visibleChange", "visible", "modal"], ["class", "quick-activity", 4, "ngIf"], ["header", "Merge contacts", 3, "visibleChange", "visible", "modal"], ["class", "merge-dialog", 4, "ngIf"], [1, "pi", "pi-hashtag"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Tag", "styleClass", "filter-select", 3, "ngModelChange", "options", "ngModel"], ["class", "crm-table crm-table--highlight contacts-table", 3, "value", "tableStyle", "styleClass", 4, "ngIf"], ["class", "contact-card-grid", 4, "ngIf"], [1, "crm-table", "crm-table--highlight", "contacts-table", 3, "value", "tableStyle", "styleClass"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "th-select"], ["pSortableColumn", "name"], ["field", "name"], ["pSortableColumn", "phone"], ["field", "phone"], ["pSortableColumn", "buyingRole"], ["field", "buyingRole"], ["pSortableColumn", "activityScore"], ["field", "activityScore"], ["pSortableColumn", "lifecycleStage"], ["field", "lifecycleStage"], ["pSortableColumn", "ownerId"], ["field", "ownerId"], ["pSortableColumn", "createdAt"], ["field", "createdAt"], [1, "th-actions"], [3, "click"], [1, "select-cell"], [1, "contact-cell"], [1, "contact-cell__main"], [1, "name__title"], [4, "ngIf"], ["class", "text-muted", 4, "ngIf"], [1, "contact-cell__meta"], ["class", "contact-link contact-link--phone", 3, "href", "click", 4, "ngIf"], ["class", "cell-value", 4, "ngIf"], [3, "value", "severity", "rounded", 4, "ngIf"], ["class", "score-bar-wrapper", 4, "ngIf"], ["class", "tag-chips", 4, "ngIf"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "styleClass", "inline-select", 3, "ngModelChange", "options", "ngModel"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Owner", "styleClass", "inline-select", 3, "ngModelChange", "options", "ngModel"], [1, "td-created"], [1, "created-date"], [1, "td-actions"], [1, "row-actions"], ["type", "button", "title", "Log activity", 1, "row-action-btn", "row-action-btn--activity", 3, "click"], [1, "pi", "pi-clock"], ["type", "button", "title", "Edit", 1, "row-action-btn", "row-action-btn--edit", 3, "click", "disabled"], [1, "pi", "pi-pencil"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "pi", "pi-trash"], ["href", "", 1, "contact-link", 3, "click"], [1, "pi", "pi-envelope"], [1, "text-muted"], [1, "contact-link", "contact-link--phone", 3, "click", "href"], [1, "pi", "pi-phone"], [1, "cell-value"], [3, "value", "severity", "rounded"], [1, "score-bar-wrapper"], [1, "score-bar"], [1, "score-bar__fill"], [1, "score-value"], [1, "tag-chips"], ["class", "tag-chip", 4, "ngFor", "ngForOf"], ["class", "tag-chip tag-chip--more", 4, "ngIf"], [1, "tag-chip"], [1, "tag-chip", "tag-chip--more"], [1, "contact-card-grid"], ["class", "contact-card", 3, "click", 4, "ngFor", "ngForOf"], [1, "contact-card", 3, "click"], [1, "contact-card__header"], [1, "contact-card__avatar"], [3, "src", "alt", "title"], [1, "contact-card__lifecycle"], [1, "contact-card__body"], [1, "contact-card__name"], ["class", "contact-card__meta", 4, "ngIf"], [1, "contact-card__details"], ["class", "contact-card__detail", 4, "ngIf"], ["class", "contact-card__tags", 4, "ngIf"], [1, "contact-card__footer"], ["class", "contact-card__score", 4, "ngIf"], [1, "contact-card__actions"], [1, "contact-card__meta"], [1, "contact-card__detail"], [1, "contact-card__tags"], [1, "contact-card__score"], [1, "skeletons"], ["height", "1.5rem", 4, "ngFor", "ngForOf"], ["height", "1.5rem"], [1, "empty-state"], ["pButton", "", "type", "button", "label", "Create contact", 1, "crm-button", "crm-button--text", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Assign", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Update", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], [1, "import-error"], [1, "import-status"], [1, "import-result"], [1, "import-metrics"], ["class", "import-errors", 4, "ngIf"], [1, "import-errors"], [4, "ngFor", "ngForOf"], [1, "quick-activity"], [1, "quick-activity__for"], [1, "quick-activity__field"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["pTemplate", "item"], ["pTemplate", "value"], ["pInputText", "", "placeholder", "Brief description", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "select-option"], [1, "pi", 3, "ngClass"], ["class", "select-option", 4, "ngIf"], ["pButton", "", "type", "button", "label", "Log", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], [1, "merge-dialog"], [1, "merge-note"], [1, "merge-options"], ["class", "merge-option", 3, "merge-option--selected", "click", 4, "ngFor", "ngForOf"], [1, "merge-option", 3, "click"], [1, "merge-radio"], ["class", "merge-radio__dot", 4, "ngIf"], [1, "merge-option__name"], ["class", "merge-option__badge", 4, "ngIf"], [1, "merge-radio__dot"], [1, "merge-option__badge"], ["pButton", "", "type", "button", "label", "Merge", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"]], template: function ContactsPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 2)(1, "div", 3);
            i0.ɵɵelement(2, "div", 4)(3, "div", 5)(4, "div", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 7)(7, "div", 8)(8, "div", 9);
            i0.ɵɵelement(9, "span", 10);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "People intelligence");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 11)(13, "span", 12);
            i0.ɵɵtext(14, "Contact");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 13);
            i0.ɵɵtext(16, "Workspace");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 14);
            i0.ɵɵtext(18, " Centralize every stakeholder, keep lifecycle context visible, and push the right next step for each customer. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 15)(20, "div", 16)(21, "div", 17);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 18);
            i0.ɵɵtext(24, "In view");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 19);
            i0.ɵɵelement(26, "div", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 16)(28, "div", 17);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 18);
            i0.ɵɵtext(31, "Linked customers");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 19);
            i0.ɵɵelement(33, "div", 21);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 16)(35, "div", 17);
            i0.ɵɵtext(36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div", 18);
            i0.ɵɵtext(38, "Owners active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 19);
            i0.ɵɵelement(40, "div", 22);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(41, "div", 23)(42, "button", 24);
            i0.ɵɵlistener("click", function ContactsPage_Template_button_click_42_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onCreate()); });
            i0.ɵɵelementStart(43, "span", 25);
            i0.ɵɵelement(44, "i", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "span");
            i0.ɵɵtext(46, "Add contact");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(47, "button", 27);
            i0.ɵɵlistener("click", function ContactsPage_Template_button_click_47_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.load()); });
            i0.ɵɵelementStart(48, "span", 25);
            i0.ɵɵelement(49, "i", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "span");
            i0.ɵɵtext(51, "Refresh");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(52, "div", 29)(53, "div", 30)(54, "div", 31);
            i0.ɵɵelement(55, "i", 32);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "div", 33)(57, "span", 34);
            i0.ɵɵtext(58, "Lead coverage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "strong", 35);
            i0.ɵɵtext(60);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "span", 36);
            i0.ɵɵelement(62, "i", 37);
            i0.ɵɵtext(63, " High intent ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(64, "div", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "div", 39)(66, "div", 31);
            i0.ɵɵelement(67, "i", 40);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "div", 33)(69, "span", 34);
            i0.ɵɵtext(70, "Prospects");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "strong", 35);
            i0.ɵɵtext(72);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "span", 41);
            i0.ɵɵelement(74, "i", 42);
            i0.ɵɵtext(75, " Growing ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(76, "div", 38);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(77, "section", 43)(78, "div", 44)(79, "div", 45);
            i0.ɵɵelement(80, "i", 46);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(81, "div", 47)(82, "span", 48);
            i0.ɵɵtext(83, "Contacts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "strong", 49);
            i0.ɵɵtext(85);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(86, "div", 50);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(87, "svg", 51);
            i0.ɵɵelement(88, "path", 52);
            i0.ɵɵelementStart(89, "defs")(90, "linearGradient", 53);
            i0.ɵɵelement(91, "stop", 54)(92, "stop", 55);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(93, "div", 56)(94, "div", 45);
            i0.ɵɵelement(95, "i", 37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "div", 47)(97, "span", 48);
            i0.ɵɵtext(98, "Leads");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(99, "strong", 49);
            i0.ɵɵtext(100);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(101, "div", 57);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(102, "svg", 58);
            i0.ɵɵelement(103, "path", 59)(104, "path", 60);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(105, "div", 61)(106, "div", 45);
            i0.ɵɵelement(107, "i", 40);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(108, "div", 47)(109, "span", 48);
            i0.ɵɵtext(110, "Prospects");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(111, "strong", 49);
            i0.ɵɵtext(112);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(113, "div", 57);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(114, "svg", 58);
            i0.ɵɵelement(115, "path", 59)(116, "path", 62);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(117, "div", 63)(118, "div", 45);
            i0.ɵɵelement(119, "i", 64);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(120, "div", 47)(121, "span", 48);
            i0.ɵɵtext(122, "Customers");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(123, "strong", 49);
            i0.ɵɵtext(124);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(125, "div", 57);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(126, "svg", 58);
            i0.ɵɵelement(127, "path", 59)(128, "path", 65);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(129, "section", 66)(130, "div", 67)(131, "div", 68);
            i0.ɵɵelement(132, "i", 69);
            i0.ɵɵelementStart(133, "input", 70);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactsPage_Template_input_ngModelChange_133_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("ngModelChange", function ContactsPage_Template_input_ngModelChange_133_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSearch($event)); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(134, "kbd", 71);
            i0.ɵɵtext(135, "\u2318K");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(136, "div", 72)(137, "div", 73);
            i0.ɵɵelement(138, "i", 74);
            i0.ɵɵelementStart(139, "p-select", 75);
            i0.ɵɵlistener("ngModelChange", function ContactsPage_Template_p_select_ngModelChange_139_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onOwnerFilterChange($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(140, "div", 73);
            i0.ɵɵelement(141, "i", 76);
            i0.ɵɵelementStart(142, "p-select", 77);
            i0.ɵɵlistener("ngModelChange", function ContactsPage_Template_p_select_ngModelChange_142_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onLifecycleChange($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(143, "div", 73);
            i0.ɵɵelement(144, "i", 78);
            i0.ɵɵelementStart(145, "p-select", 79);
            i0.ɵɵlistener("ngModelChange", function ContactsPage_Template_p_select_ngModelChange_145_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onAccountChange($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(146, ContactsPage_div_146_Template, 3, 2, "div", 80);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(147, "div", 81)(148, "button", 82);
            i0.ɵɵlistener("click", function ContactsPage_Template_button_click_148_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.viewMode.set("table")); });
            i0.ɵɵelement(149, "i", 83);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(150, "button", 84);
            i0.ɵɵlistener("click", function ContactsPage_Template_button_click_150_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.viewMode.set("grid")); });
            i0.ɵɵelement(151, "i", 85);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(152, "section", 86)(153, "button", 87);
            i0.ɵɵlistener("click", function ContactsPage_Template_button_click_153_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onLifecycleChange("all")); });
            i0.ɵɵelementStart(154, "span");
            i0.ɵɵtext(155, "All");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(156, "span", 88);
            i0.ɵɵtext(157);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(158, "button", 89);
            i0.ɵɵlistener("click", function ContactsPage_Template_button_click_158_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onLifecycleChange("Lead")); });
            i0.ɵɵelement(159, "i", 37);
            i0.ɵɵelementStart(160, "span");
            i0.ɵɵtext(161, "Lead");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(162, "span", 88);
            i0.ɵɵtext(163);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(164, "button", 90);
            i0.ɵɵlistener("click", function ContactsPage_Template_button_click_164_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onLifecycleChange("Prospect")); });
            i0.ɵɵelement(165, "i", 40);
            i0.ɵɵelementStart(166, "span");
            i0.ɵɵtext(167, "Prospect");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(168, "span", 88);
            i0.ɵɵtext(169);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(170, "button", 91);
            i0.ɵɵlistener("click", function ContactsPage_Template_button_click_170_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onLifecycleChange("Customer")); });
            i0.ɵɵelement(171, "i", 64);
            i0.ɵɵelementStart(172, "span");
            i0.ɵɵtext(173, "Customer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(174, "span", 88);
            i0.ɵɵtext(175);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(176, "section", 92)(177, "div", 93)(178, "header", 94)(179, "div")(180, "div", 95);
            i0.ɵɵtext(181, "Contact coverage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(182, "small");
            i0.ɵɵtext(183);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(184, "div", 96)(185, "p-checkbox", 97);
            i0.ɵɵlistener("onChange", function ContactsPage_Template_p_checkbox_onChange_185_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.toggleSelectAll($event.checked)); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(186, "span");
            i0.ɵɵtext(187, "Select all");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(188, "div", 98)(189, "button", 99);
            i0.ɵɵlistener("click", function ContactsPage_Template_button_click_189_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.openImport()); });
            i0.ɵɵelementStart(190, "span", 25);
            i0.ɵɵelement(191, "i", 100);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(192, "span");
            i0.ɵɵtext(193, "Import");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(194, "button", 101);
            i0.ɵɵlistener("click", function ContactsPage_Template_button_click_194_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onExport()); });
            i0.ɵɵelementStart(195, "span", 25);
            i0.ɵɵelement(196, "i", 102);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(197, "span");
            i0.ɵɵtext(198, "Export");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(199, "button", 24);
            i0.ɵɵlistener("click", function ContactsPage_Template_button_click_199_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onCreate()); });
            i0.ɵɵelementStart(200, "span", 25);
            i0.ɵɵelement(201, "i", 103);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(202, "span");
            i0.ɵɵtext(203, "Add contact");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(204, ContactsPage_ng_container_204_Template, 2, 2, "ng-container", 104)(205, ContactsPage_ng_template_205_Template, 2, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(207, ContactsPage_ng_template_207_Template, 5, 1, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(209, "p-paginator", 105);
            i0.ɵɵlistener("onPageChange", function ContactsPage_Template_p_paginator_onPageChange_209_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onPageChange($event)); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(210, "app-bulk-actions-bar", 106);
            i0.ɵɵlistener("actionClicked", function ContactsPage_Template_app_bulk_actions_bar_actionClicked_210_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onBulkAction($event)); })("clearSelection", function ContactsPage_Template_app_bulk_actions_bar_clearSelection_210_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.clearSelection()); })("selectAll", function ContactsPage_Template_app_bulk_actions_bar_selectAll_210_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.selectAllFiltered()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(211, "p-dialog", 107);
            i0.ɵɵtwoWayListener("visibleChange", function ContactsPage_Template_p_dialog_visibleChange_211_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.assignDialogVisible, $event) || (ctx.assignDialogVisible = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementStart(212, "div", 108)(213, "label");
            i0.ɵɵtext(214, "Owner");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(215, "p-select", 109);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactsPage_Template_p_select_ngModelChange_215_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.assignOwnerId, $event) || (ctx.assignOwnerId = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(216, ContactsPage_ng_template_216_Template, 2, 1, "ng-template", 110);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(217, "p-dialog", 111);
            i0.ɵɵtwoWayListener("visibleChange", function ContactsPage_Template_p_dialog_visibleChange_217_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.statusDialogVisible, $event) || (ctx.statusDialogVisible = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementStart(218, "div", 108)(219, "label");
            i0.ɵɵtext(220, "Lifecycle");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(221, "p-select", 112);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactsPage_Template_p_select_ngModelChange_221_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.bulkStatus, $event) || (ctx.bulkStatus = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(222, ContactsPage_ng_template_222_Template, 2, 1, "ng-template", 110);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(223, "p-dialog", 113);
            i0.ɵɵtwoWayListener("visibleChange", function ContactsPage_Template_p_dialog_visibleChange_223_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.importDialogVisible, $event) || (ctx.importDialogVisible = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("onHide", function ContactsPage_Template_p_dialog_onHide_223_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeImport()); });
            i0.ɵɵelementStart(224, "div", 114)(225, "p", 115);
            i0.ɵɵtext(226, " Upload a CSV with headers. Required column: ");
            i0.ɵɵelementStart(227, "strong");
            i0.ɵɵtext(228, "Name");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(229, " or ");
            i0.ɵɵelementStart(230, "strong");
            i0.ɵɵtext(231, "FirstName");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(232, ". ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(233, "label", 116)(234, "p-fileUpload", 117);
            i0.ɵɵlistener("onSelect", function ContactsPage_Template_p_fileUpload_onSelect_234_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onImportFileSelected($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(235, "div", 118)(236, "button", 119);
            i0.ɵɵlistener("click", function ContactsPage_Template_button_click_236_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeImport()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(237, "button", 120);
            i0.ɵɵlistener("click", function ContactsPage_Template_button_click_237_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onImport()); });
            i0.ɵɵtext(238);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(239, ContactsPage_div_239_Template, 2, 1, "div", 121)(240, ContactsPage_div_240_Template, 3, 1, "div", 122)(241, ContactsPage_div_241_Template, 9, 4, "div", 123);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(242, "p-dialog", 124);
            i0.ɵɵtwoWayListener("visibleChange", function ContactsPage_Template_p_dialog_visibleChange_242_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.activityLogVisible, $event) || (ctx.activityLogVisible = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtemplate(243, ContactsPage_div_243_Template, 15, 4, "div", 125)(244, ContactsPage_ng_template_244_Template, 2, 1, "ng-template", 110);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(245, "p-dialog", 126);
            i0.ɵɵtwoWayListener("visibleChange", function ContactsPage_Template_p_dialog_visibleChange_245_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.mergeDialogVisible, $event) || (ctx.mergeDialogVisible = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtemplate(246, ContactsPage_div_246_Template, 8, 1, "div", 127)(247, ContactsPage_ng_template_247_Template, 2, 1, "ng-template", 110);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(248, "p-confirmDialog");
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const loadingState_r27 = i0.ɵɵreference(206);
            i0.ɵɵadvance(22);
            i0.ɵɵtextInterpolate(ctx.contactsInScope() || 0);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.contactsWithLinkedAccounts());
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.contacts().length ? ctx.contactsWithLinkedAccounts() / ctx.contacts().length * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.ownerCount());
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.ownerOptions().length ? ctx.ownerCount() / (ctx.ownerOptions().length || 1) * 100 : 0, "%");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(18);
            i0.ɵɵtextInterpolate(ctx.lifecycleCounts().lead);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.lifecycleCounts().prospect);
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(ctx.contacts().length || "\u2014");
            i0.ɵɵadvance(15);
            i0.ɵɵtextInterpolate(ctx.lifecycleCounts().lead);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.contacts().length ? ctx.lifecycleCounts().lead / ctx.contacts().length * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.lifecycleCounts().prospect);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.contacts().length ? ctx.lifecycleCounts().prospect / ctx.contacts().length * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.lifecycleCounts().customer);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.contacts().length ? ctx.lifecycleCounts().customer / ctx.contacts().length * 100 : 0) + ", 100");
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchTerm);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.ownerOptions())("ngModel", ctx.ownerFilter());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("options", ctx.lifecycleOptions)("ngModel", ctx.lifecycleFilter());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("options", ctx.accountFilterOptions())("ngModel", ctx.accountFilter === "all" ? "all" : ctx.accountFilter);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.tagOptions().length > 1);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.viewMode() === "table");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.viewMode() === "grid");
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("lifecycle-chip--active", ctx.lifecycleFilter() === "all");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.contacts().length);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("lifecycle-chip--active", ctx.lifecycleFilter() === "Lead");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.lifecycleCounts().lead);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("lifecycle-chip--active", ctx.lifecycleFilter() === "Prospect");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.lifecycleCounts().prospect);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("lifecycle-chip--active", ctx.lifecycleFilter() === "Customer");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.lifecycleCounts().customer);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate2("Showing ", ctx.filteredContacts().length, " ", ctx.filteredContacts().length === 1 ? "contact" : "contacts", " with lifecycle + customer context");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("binary", true)("ngModel", ctx.selectedIds().length && ctx.selectedIds().length === ctx.filteredContacts().length);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", !ctx.loading())("ngIfElse", loadingState_r27);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("rows", ctx.rows)("totalRecords", ctx.total())("rowsPerPageOptions", i0.ɵɵpureFunction0(93, _c0))("first", ctx.pageIndex * ctx.rows);
            i0.ɵɵadvance();
            i0.ɵɵproperty("actions", ctx.bulkActions())("selectedItems", ctx.selectedIds())("totalCount", ctx.filteredContacts().length);
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(94, _c1));
            i0.ɵɵtwoWayProperty("visible", ctx.assignDialogVisible);
            i0.ɵɵproperty("modal", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.ownerOptionsForAssign());
            i0.ɵɵtwoWayProperty("ngModel", ctx.assignOwnerId);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(95, _c1));
            i0.ɵɵtwoWayProperty("visible", ctx.statusDialogVisible);
            i0.ɵɵproperty("modal", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.lifecycleFormOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.bulkStatus);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(96, _c2));
            i0.ɵɵtwoWayProperty("visible", ctx.importDialogVisible);
            i0.ɵɵproperty("modal", true)("dismissableMask", true);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("auto", false)("customUpload", true)("showUploadButton", false)("showCancelButton", false)("chooseLabel", (ctx.importFile == null ? null : ctx.importFile.name) || "Choose CSV file");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", !ctx.importFile || ctx.importing() || !ctx.canManage());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.importing() ? "Importing..." : "Import", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.importError());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.importJob());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.importStatus());
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(97, _c3));
            i0.ɵɵtwoWayProperty("visible", ctx.activityLogVisible);
            i0.ɵɵproperty("modal", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activityLogContact);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(98, _c4));
            i0.ɵɵtwoWayProperty("visible", ctx.mergeDialogVisible);
            i0.ɵɵproperty("modal", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.mergeDialogVisible);
        } }, dependencies: [NgIf,
            NgFor,
            NgClass,
            FormsModule, i7.DefaultValueAccessor, i7.NgControlStatus, i7.NgModel, CardModule, i8.PrimeTemplate, CheckboxModule, i9.Checkbox, FileUploadModule, i10.FileUpload, TableModule, i11.Table, i11.SortableColumn, i11.SortIcon, TagModule, i12.Tag, InputTextModule, i13.InputText, SelectModule, i14.Select, ButtonModule, i15.ButtonDirective, PaginatorModule, i16.Paginator, SkeletonModule, i17.Skeleton, DialogModule, i18.Dialog, ConfirmDialogModule, i19.ConfirmDialog, BreadcrumbsComponent,
            BulkActionsBarComponent,
            DatePipe], styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  25% {\n    transform: translate(40px, -25px) scale(1.06);\n  }\n  50% {\n    transform: translate(80px, 15px) scale(0.94);\n  }\n  75% {\n    transform: translate(25px, 40px) scale(1.03);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    transform: translateX(-100%);\n  }\n  100% {\n    transform: translateX(100%);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_ring-draw {\n  0% { stroke-dasharray: 0, 100; }\n}\n\n@keyframes _ngcontent-%COMP%_slide-in-right {\n  from {\n    opacity: 0;\n    transform: translateX(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n.contacts[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e7ecf4 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n\n  .bg-orbs {\n    position: fixed;\n    inset: 0;\n    pointer-events: none;\n    z-index: 0;\n    overflow: hidden;\n  }\n\n  .orb {\n    position: absolute;\n    border-radius: 50%;\n    filter: blur(60px);\n    opacity: 0.35;\n    animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n\n    &.orb-1 {\n      width: 520px;\n      height: 520px;\n      background: $primary-gradient;\n      top: -200px;\n      right: -140px;\n    }\n\n    &.orb-2 {\n      width: 360px;\n      height: 360px;\n      background: $cyan-gradient;\n      bottom: 5%;\n      left: -120px;\n      animation-delay: -6s;\n      animation-duration: 24s;\n    }\n\n    &.orb-3 {\n      width: 300px;\n      height: 300px;\n      background: $secondary-gradient;\n      top: 40%;\n      right: 18%;\n      animation-delay: -12s;\n      animation-duration: 18s;\n    }\n  }\n\n  .hero-section {\n    position: relative;\n    z-index: 1;\n    display: grid;\n    grid-template-columns: 1fr auto;\n    gap: $space-6;\n    margin-bottom: $space-5;\n\n    @media (max-width: 1200px) {\n      grid-template-columns: 1fr;\n      gap: $space-4;\n    }\n  }\n\n  .hero-content {\n    display: flex;\n    flex-direction: column;\n    gap: $space-3;\n  }\n\n  .hero-badge {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-1 $space-3;\n    background: $glass-bg;\n    backdrop-filter: blur($glass-blur);\n    border: 1px solid $glass-border;\n    border-radius: $radius-full;\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: $primary;\n    text-transform: uppercase;\n    letter-spacing: 0.1em;\n    width: fit-content;\n    box-shadow: $glass-shadow;\n\n    .badge-dot {\n      width: 8px;\n      height: 8px;\n      background: $success;\n      border-radius: 50%;\n      box-shadow: 0 0 12px rgba(76, 175, 80, 0.6);\n    }\n  }\n\n  .hero-description {\n    max-width: 600px;\n    color: $gray-600;\n    font-size: $font-size-base;\n  }\n\n  .hero-stats {\n    display: flex;\n    flex-wrap: wrap;\n    gap: $space-4;\n  }\n\n  .hero-stat {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    min-width: 110px;\n\n    .stat-value {\n      font-size: $font-size-2xl;\n      font-weight: 700;\n      color: $gray-800;\n    }\n\n    .stat-label {\n      font-size: $font-size-xs;\n      color: $gray-500;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n\n    .stat-bar {\n      width: 100%;\n      height: 4px;\n      background: rgba(102, 126, 234, 0.15);\n      border-radius: $radius-full;\n      overflow: hidden;\n      margin-top: 4px;\n\n      .stat-bar-fill {\n        height: 100%;\n        background: $primary-gradient;\n\n        &--cyan {\n          background: $cyan-gradient;\n        }\n\n        &--purple {\n          background: $secondary-gradient;\n        }\n      }\n    }\n  }\n\n  .hero-actions {\n    display: flex;\n    gap: $space-3;\n    margin-top: $space-2;\n    flex-wrap: wrap;\n  }\n\n  // Hero Visual Cards\n  .hero-visual {\n    display: flex;\n    flex-direction: column;\n    gap: $space-3;\n    animation: _ngcontent-%COMP%_slide-in-right 0.6s ease-out 0.2s both;\n  }\n\n  .visual-card {\n    position: relative;\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    padding: $space-3 $space-4;\n    background: $glass-bg;\n    backdrop-filter: blur($glass-blur);\n    border: 1px solid $glass-border;\n    border-radius: $radius-lg;\n    box-shadow: $glass-shadow;\n    min-width: 220px;\n    overflow: hidden;\n    transition: transform $transition-base, box-shadow $transition-base;\n\n    &:hover {\n      transform: translateY(-2px);\n      box-shadow: $glass-shadow-lg;\n    }\n\n    .card-icon {\n      width: 36px;\n      height: 36px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: $radius-md;\n      font-size: $font-size-xl;\n    }\n\n    &--primary .card-icon {\n      background: $primary-gradient;\n      color: white;\n    }\n\n    &--secondary .card-icon {\n      background: $cyan-gradient;\n      color: white;\n    }\n\n    .card-content {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n    }\n\n    .card-label {\n      font-size: $font-size-xs;\n      color: $gray-500;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n\n    .card-value {\n      font-size: $font-size-2xl;\n      font-weight: 700;\n      color: $gray-800;\n    }\n\n    .card-trend {\n      display: flex;\n      align-items: center;\n      gap: $space-1;\n      font-size: $font-size-xs;\n      color: $gray-500;\n\n      &--up {\n        color: $success;\n      }\n    }\n\n    .card-glow {\n      position: absolute;\n      top: -50%;\n      right: -50%;\n      width: 100%;\n      height: 100%;\n      background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n      pointer-events: none;\n    }\n  }\n\n  .btn {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-2 $space-4;\n    border: none;\n    border-radius: $radius-md;\n    font-size: $font-size-base;\n    font-weight: 600;\n    cursor: pointer;\n    transition: all $transition-base;\n    overflow: hidden;\n\n    i {\n      font-size: $font-size-base;\n    }\n  }\n\n  .btn-primary {\n    background: $primary-gradient;\n    color: #fff;\n    box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n    &:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n    }\n  }\n\n  .btn-glow {\n    &::before {\n      content: '';\n      position: absolute;\n      inset: 0;\n      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);\n      animation: _ngcontent-%COMP%_shimmer 3s infinite;\n    }\n\n    .btn-shine {\n      position: absolute;\n      top: 0;\n      left: -100%;\n      width: 100%;\n      height: 100%;\n      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);\n      transition: left 0.4s ease;\n    }\n\n    &:hover .btn-shine {\n      left: 100%;\n    }\n  }\n\n  .btn-secondary {\n    background: $glass-bg;\n    backdrop-filter: blur($glass-blur);\n    border: 1px solid $glass-border;\n    color: $gray-700;\n    box-shadow: $glass-shadow;\n\n    &:hover {\n      background: #fff;\n      transform: translateY(-2px);\n      box-shadow: $glass-shadow-lg;\n    }\n  }\n\n  .metrics-section {\n    position: relative;\n    z-index: 1;\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: $space-3;\n    margin-bottom: $space-5;\n\n    @media (max-width: 1100px) {\n      grid-template-columns: repeat(2, 1fr);\n    }\n\n    @media (max-width: 700px) {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  .metric-card {\n    position: relative;\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    padding: $space-3 $space-4;\n    background: $glass-bg;\n    backdrop-filter: blur($glass-blur);\n    border: 1px solid $glass-border;\n    border-radius: $radius-lg;\n    box-shadow: $glass-shadow;\n    overflow: hidden;\n    transition: all $transition-base;\n    animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out backwards;\n\n    @for $i from 1 through 4 {\n      &:nth-child(#{$i}) {\n        animation-delay: #{$i * 0.05}s;\n      }\n    }\n\n    &:hover {\n      transform: translateY(-2px);\n      box-shadow: $glass-shadow-lg;\n\n      .metric-icon {\n        transform: scale(1.1) rotate(5deg);\n      }\n    }\n\n    .metric-icon {\n      width: 36px;\n      height: 36px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: $radius-md;\n      font-size: $font-size-lg;\n      color: white;\n      flex-shrink: 0;\n      transition: transform $transition-spring;\n    }\n\n    &--total .metric-icon { background: $primary-gradient; }\n    &--leads .metric-icon { background: $cyan-gradient; }\n    &--prospects .metric-icon { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n    &--customers .metric-icon { background: $success-gradient; }\n\n    .metric-content {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n      flex: 1;\n      min-width: 0;\n    }\n\n    .metric-label {\n      font-size: $font-size-xs;\n      color: $gray-500;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n\n    .metric-value {\n      font-size: $font-size-2xl;\n      font-weight: 700;\n      color: $gray-800;\n    }\n  }\n\n  // Sparkline Chart\n  .metric-chart {\n    position: absolute;\n    right: $space-4;\n    bottom: $space-3;\n    width: 60px;\n    height: 24px;\n    opacity: 0.5;\n\n    .sparkline {\n      width: 100%;\n      height: 100%;\n    }\n  }\n\n  // Ring Chart\n  .metric-ring {\n    position: absolute;\n    right: $space-3;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 32px;\n    height: 32px;\n\n    svg {\n      width: 100%;\n      height: 100%;\n      transform: rotate(-90deg);\n    }\n\n    .ring-bg {\n      fill: none;\n      stroke: $gray-200;\n      stroke-width: 3;\n    }\n\n    .ring-fill {\n      fill: none;\n      stroke-width: 3;\n      stroke-linecap: round;\n      transition: stroke-dasharray 1s ease-out;\n      animation: _ngcontent-%COMP%_ring-draw 1s ease-out;\n\n      &--cyan { stroke: $cyan; }\n      &--purple { stroke: $purple; }\n      &--green { stroke: $success; }\n    }\n  }\n\n  .filter-section {\n    position: relative;\n    z-index: 2;\n    margin-bottom: $space-5;\n    animation: _ngcontent-%COMP%_fade-in-up 0.6s ease-out 0.3s both;\n  }\n\n  .lifecycle-chips {\n    display: flex;\n    gap: $space-2;\n    margin-bottom: $space-4;\n    animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out 0.35s both;\n    position: relative;\n    z-index: 2;\n    flex-wrap: wrap;\n  }\n\n  .lifecycle-chip {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-1;\n    padding: $space-1 $space-3;\n    border: 1px solid $glass-border;\n    border-radius: $radius-full;\n    background: $glass-bg;\n    backdrop-filter: blur($glass-blur);\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: $gray-600;\n    cursor: pointer;\n    transition: all 250ms;\n    box-shadow: $glass-shadow;\n\n    i { font-size: 0.8rem; }\n\n    .chip-count {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      min-width: 20px;\n      height: 20px;\n      padding: 0 $space-1;\n      border-radius: $radius-full;\n      background: rgba($gray-200, 0.8);\n      font-size: $font-size-xs;\n      font-weight: 700;\n      color: $gray-500;\n    }\n\n    &:hover {\n      transform: translateY(-1px);\n      box-shadow: $glass-shadow-hover;\n    }\n\n    &--active {\n      background: rgba($primary, 0.1);\n      border-color: rgba($primary, 0.3);\n      color: $primary;\n\n      .chip-count {\n        background: $primary;\n        color: white;\n      }\n    }\n\n    &--lead.lifecycle-chip--active {\n      background: rgba(#06b6d4, 0.1);\n      border-color: rgba(#06b6d4, 0.3);\n      color: #0891b2;\n\n      .chip-count { background: #06b6d4; color: white; }\n    }\n\n    &--prospect.lifecycle-chip--active {\n      background: rgba(#a855f7, 0.1);\n      border-color: rgba(#a855f7, 0.3);\n      color: #9333ea;\n\n      .chip-count { background: #a855f7; color: white; }\n    }\n\n    &--customer.lifecycle-chip--active {\n      background: rgba(#22c55e, 0.1);\n      border-color: rgba(#22c55e, 0.3);\n      color: #16a34a;\n\n      .chip-count { background: #22c55e; color: white; }\n    }\n  }\n\n  .filter-bar {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    padding: $space-3 $space-4;\n    border-radius: $radius-xl;\n    background: $glass-bg;\n    border: 1px solid $glass-border;\n    box-shadow: $glass-shadow;\n    backdrop-filter: blur($glass-blur);\n\n    @media (max-width: 1100px) {\n      flex-wrap: wrap;\n    }\n  }\n\n  .search-wrapper {\n    position: relative;\n    flex: 1;\n    min-width: 280px;\n\n    .search-icon {\n      position: absolute;\n      left: $space-3;\n      top: 50%;\n      transform: translateY(-50%);\n      color: $gray-400;\n      font-size: 1rem;\n      z-index: 1;\n      transition: color $transition-fast;\n    }\n\n    &:focus-within .search-icon {\n      color: $primary;\n    }\n\n    .search-input {\n      width: 100%;\n      padding: $space-2 $space-4 $space-2 calc(#{$space-3} + 24px);\n      border: 1px solid rgba($gray-200, 0.8);\n      border-radius: $radius-lg;\n      background: rgba(255, 255, 255, 0.8);\n      font-size: $font-size-sm;\n      color: $gray-900;\n      transition: all $transition-fast;\n\n      &::placeholder {\n        color: $gray-400;\n      }\n\n      &:focus {\n        outline: none;\n        border-color: rgba($primary, 0.4);\n        background: #ffffff;\n        box-shadow: 0 0 0 3px rgba($primary, 0.1);\n      }\n    }\n  }\n\n  .search-kbd {\n    position: absolute;\n    right: $space-3;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: 2px 8px;\n    background: linear-gradient(135deg, $gray-100, $gray-50);\n    border: 1px solid $gray-200;\n    border-radius: $radius-sm;\n    font-size: 11px;\n    font-weight: 600;\n    color: $gray-500;\n    font-family: inherit;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  }\n\n  .filter-pills {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    flex-wrap: wrap;\n  }\n\n  .filter-pill {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    padding: $space-1 $space-2;\n    background: rgba(255, 255, 255, 0.6);\n    border: 1px solid rgba($gray-200, 0.6);\n    border-radius: $radius-lg;\n    transition: all $transition-fast;\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.9);\n      border-color: rgba($primary, 0.3);\n    }\n\n    > i {\n      color: $gray-400;\n      font-size: 0.875rem;\n    }\n\n    .filter-select {\n      border: none !important;\n      background: transparent !important;\n      box-shadow: none !important;\n      min-width: 100px;\n\n      .p-select-label {\n        padding: $space-1 $space-2;\n        font-size: $font-size-sm;\n        color: $gray-700;\n      }\n\n      .p-select-trigger {\n        width: auto;\n      }\n\n      &:focus {\n        box-shadow: none !important;\n      }\n    }\n  }\n\n  .filter-group {\n    display: flex;\n    align-items: center;\n\n    &.search {\n      .p-input-icon-left {\n        width: 100%;\n      }\n\n      input {\n        width: 100%;\n      }\n    }\n  }\n\n  .contacts__content {\n    position: relative;\n    z-index: 1;\n  }\n\n  .table-card {\n    margin-top: 0;\n  }\n\n  .list-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: $space-3;\n    margin-bottom: $space-3;\n\n    @media (max-width: 768px) {\n      flex-direction: column;\n      align-items: flex-start;\n    }\n  }\n\n  .list-title {\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .list-select {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n\n  .select-cell {\n    width: 36px;\n  }\n\n  .checkbox {\n    width: 16px;\n    height: 16px;\n    accent-color: $primary;\n  }\n\n  ::ng-deep .inline-select {\n    .p-select {\n      min-width: 140px;\n      border-radius: $radius-md;\n    }\n\n    .p-select-label {\n      font-size: $font-size-sm;\n      color: $gray-700;\n    }\n  }\n\n  .list-actions {\n    display: flex;\n    gap: $space-2;\n    flex-wrap: wrap;\n  }\n\n  .contacts-table {\n    width: 100%;\n    border-collapse: collapse;\n    border-radius: 16px;\n    overflow: hidden;\n\n    // Soft blue gradient header - Global Standard\n    ::ng-deep .p-datatable-thead > tr > th {\n      background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n      border: none;\n      border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n      padding: $space-3 $space-4;\n      font-size: 0.72rem;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n      color: #3b82f6;\n    }\n\n    // Standard body rows\n    ::ng-deep .p-datatable-tbody > tr > td {\n      vertical-align: middle;\n      padding: $space-3 $space-2;\n    }\n  }\n\n  .bulk-assign {\n    display: flex;\n    flex-direction: column;\n    gap: $space-2;\n  }\n\n  .contact-link {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    color: $primary;\n    text-decoration: none;\n    font-size: $font-size-sm;\n    transition: color 200ms;\n\n    i { font-size: 0.75rem; }\n\n    &:hover {\n      color: color.adjust($primary, $lightness: -10%);\n      text-decoration: underline;\n    }\n\n    &--phone {\n      color: $gray-700;\n      font-weight: 600;\n\n      &:hover { color: $primary; }\n    }\n  }\n\n  .text-muted {\n    color: $gray-400;\n    font-size: $font-size-sm;\n  }\n\n  .score-bar-wrapper {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n  }\n\n  .score-bar {\n    width: 60px;\n    height: 6px;\n    background: $gray-200;\n    border-radius: $radius-full;\n    overflow: hidden;\n\n    &__fill {\n      height: 100%;\n      border-radius: $radius-full;\n      transition: width 0.6s ease-out;\n\n      &--low { background: linear-gradient(90deg, #f87171, #ef4444); }\n      &--mid { background: linear-gradient(90deg, #fbbf24, #f59e0b); }\n      &--high { background: linear-gradient(90deg, #4ade80, #22c55e); }\n    }\n  }\n\n  .score-value {\n    font-size: $font-size-xs;\n    font-weight: 700;\n    color: $gray-700;\n    min-width: 20px;\n  }\n\n  .contact-cell {\n    display: flex;\n    flex-direction: column;\n    gap: $space-1;\n\n    &__main {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n    }\n\n    &__meta {\n      display: flex;\n      gap: $space-2;\n      flex-wrap: wrap;\n      font-size: $font-size-xs;\n      color: $gray-500;\n\n      span {\n        background: rgba(148, 163, 184, 0.15);\n        padding: 2px 8px;\n        border-radius: $radius-full;\n      }\n    }\n  }\n\n  .cell {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n\n    .cell-label {\n      font-size: $font-size-xs;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n      color: $gray-500;\n    }\n\n    .cell-value {\n      color: $gray-800;\n      font-weight: 600;\n    }\n\n    .action-buttons {\n      display: flex;\n      gap: $space-1;\n    }\n  }\n\n  .th-actions,\n  .td-actions {\n    text-align: right;\n  }\n\n  .empty-state {\n    text-align: center;\n    padding: $space-5 $space-3;\n    color: $gray-500;\n\n    i {\n      font-size: 2rem;\n      margin-bottom: $space-2;\n      color: $primary;\n    }\n  }\n\n  .contacts__paginator {\n    margin-top: $space-3;\n  }\n\n  @media (max-width: 600px) {\n    // Preserve table readability on small screens without truncation.\n    .table-card {\n      overflow-x: auto;\n    }\n\n    .contacts-table {\n      min-width: 760px;\n    }\n  }\n\n  .import-dialog {\n    display: flex;\n    flex-direction: column;\n    gap: $space-3;\n\n    .import-note {\n      margin: 0;\n      color: $gray-500;\n    }\n\n    .import-upload {\n      border: 1px dashed rgba($gray-300, 0.7);\n      border-radius: $radius-md;\n      padding: $space-3;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: $space-2;\n      cursor: pointer;\n      background: rgba(255, 255, 255, 0.7);\n\n      input {\n        display: none;\n      }\n\n      span {\n        font-weight: 600;\n        color: $gray-800;\n      }\n    }\n\n    .import-actions {\n      display: flex;\n      justify-content: flex-end;\n      gap: $space-2;\n    }\n\n    .import-error {\n      color: $danger;\n      font-weight: 600;\n    }\n\n    .import-result {\n      background: rgba(239, 246, 255, 0.7);\n      border-radius: $radius-md;\n      padding: $space-2 $space-3;\n      border: 1px solid rgba($gray-200, 0.6);\n\n      .import-metrics {\n        display: flex;\n        gap: $space-3;\n        font-weight: 600;\n        color: $gray-900;\n      }\n\n      .import-errors {\n        margin-top: $space-2;\n        color: $gray-500;\n\n        ul {\n          margin: $space-1 0 0;\n          padding-left: $space-3;\n        }\n      }\n    }\n  }\n\n  // \u2500\u2500 C17: Tag Chips (table cells) \u2500\u2500\n  .tag-chips {\n    display: flex;\n    gap: 4px;\n    flex-wrap: wrap;\n    align-items: center;\n  }\n\n  .tag-chip {\n    display: inline-flex;\n    align-items: center;\n    padding: 1px 8px;\n    font-size: 0.7rem;\n    font-weight: 600;\n    border-radius: $radius-full;\n    background: rgba(102, 126, 234, 0.1);\n    color: #667eea;\n    white-space: nowrap;\n    letter-spacing: 0.02em;\n\n    &--more {\n      background: rgba(0, 0, 0, 0.06);\n      color: $gray-500;\n      font-weight: 500;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   C16[_ngcontent-%COMP%]:   Merge[_ngcontent-%COMP%]   Dialog[_ngcontent-%COMP%]   \u2500\u2500\n.merge-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.merge-note[_ngcontent-%COMP%] {\n  margin: 0;\n  color: $gray-500;\n  font-size: $font-size-sm;\n  line-height: 1.5;\n}\n\n.merge-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.merge-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-3;\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  border-radius: $radius-md;\n  cursor: pointer;\n  transition: all 200ms ease;\n  background: rgba(255, 255, 255, 0.7);\n\n  &:hover {\n    background: rgba(102, 126, 234, 0.04);\n    border-color: rgba(102, 126, 234, 0.2);\n  }\n\n  &--selected {\n    background: rgba(102, 126, 234, 0.06);\n    border-color: rgba(102, 126, 234, 0.3);\n    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);\n  }\n\n  &__name {\n    flex: 1;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  &__badge {\n    display: inline-flex;\n    padding: 2px 8px;\n    font-size: 0.7rem;\n    font-weight: 700;\n    border-radius: $radius-full;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n}\n\n.merge-radio[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: 2px solid $gray-300;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: all 200ms ease;\n\n  .merge-option--selected & {\n    border-color: #667eea;\n  }\n\n  &__dot {\n    width: 8px;\n    height: 8px;\n    border-radius: 50%;\n    background: #667eea;\n    transform: scale(0);\n    transition: transform 200ms ease;\n\n    .merge-option--selected & {\n      transform: scale(1);\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   C13[_ngcontent-%COMP%]:   View[_ngcontent-%COMP%]   Toggle[_ngcontent-%COMP%]   \u2500\u2500\n.view-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: $radius-md;\n  padding: 2px;\n  margin-left: auto;\n\n  .toggle-btn {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 34px;\n    height: 34px;\n    border: none;\n    border-radius: calc(#{$radius-md} - 2px);\n    background: transparent;\n    color: $gray-500;\n    cursor: pointer;\n    transition: all 200ms ease;\n\n    &:hover {\n      color: $gray-700;\n      background: rgba(255, 255, 255, 0.5);\n    }\n\n    &.active {\n      background: white;\n      color: #667eea;\n      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);\n    }\n\n    i { font-size: $font-size-sm; }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   C13[_ngcontent-%COMP%]:   Contact[_ngcontent-%COMP%]   Card[_ngcontent-%COMP%]   Grid[_ngcontent-%COMP%]   \u2500\u2500\n.contact-card-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: $space-4;\n  padding: $space-4;\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n    gap: $space-3;\n    padding: $space-3;\n  }\n}\n\n.contact-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  cursor: pointer;\n  transition: transform 250ms ease, box-shadow 250ms ease;\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: $space-4 $space-4 0;\n  }\n\n  &__avatar {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n    font-size: $font-size-lg;\n    font-weight: 700;\n    border-radius: 50%;\n    flex-shrink: 0;\n    overflow: hidden;\n\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      border-radius: inherit;\n    }\n  }\n\n  &__body {\n    padding: $space-3 $space-4;\n  }\n\n  &__name {\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n    margin-bottom: 2px;\n  }\n\n  &__meta {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    margin-bottom: $space-2;\n  }\n\n  &__details {\n    display: flex;\n    flex-direction: column;\n    gap: $space-1;\n  }\n\n  &__detail {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    font-size: $font-size-sm;\n    color: $gray-600;\n\n    i {\n      font-size: 0.75rem;\n      color: $gray-400;\n    }\n  }\n\n  &__footer {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: $space-2 $space-4 $space-3;\n    border-top: 1px solid rgba(0, 0, 0, 0.04);\n  }\n\n  &__score {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    flex: 1;\n\n    .score-bar {\n      flex: 1;\n      max-width: 80px;\n    }\n  }\n\n  &__actions {\n    display: flex;\n    gap: $space-1;\n  }\n\n  &__tags {\n    display: flex;\n    gap: 4px;\n    flex-wrap: wrap;\n    padding: 0 $space-4 $space-2;\n\n    .tag-chip {\n      display: inline-flex;\n      align-items: center;\n      padding: 1px 8px;\n      font-size: 0.7rem;\n      font-weight: 600;\n      border-radius: $radius-full;\n      background: rgba(102, 126, 234, 0.1);\n      color: #667eea;\n      white-space: nowrap;\n\n      &--more {\n        background: rgba(0, 0, 0, 0.06);\n        color: $gray-500;\n        font-weight: 500;\n      }\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   C14[_ngcontent-%COMP%]:   Quick[_ngcontent-%COMP%]   Activity[_ngcontent-%COMP%]   Log[_ngcontent-%COMP%]   Dialog[_ngcontent-%COMP%]   \u2500\u2500\n.quick-activity[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n\n  &__for {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-2 $space-3;\n    background: rgba(102, 126, 234, 0.08);\n    border-radius: $radius-md;\n    font-weight: 600;\n    color: $gray-700;\n\n    i { color: #667eea; }\n  }\n\n  &__field {\n    display: flex;\n    flex-direction: column;\n    gap: $space-1;\n\n    label {\n      font-size: $font-size-sm;\n      font-weight: 600;\n      color: $gray-600;\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContactsPage, [{
        type: Component,
        args: [{ selector: 'app-contacts-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    NgClass,
                    DatePipe,
                    FormsModule,
                    CardModule,
                    CheckboxModule,
                    FileUploadModule,
                    TableModule,
                    TagModule,
                    InputTextModule,
                    SelectModule,
                    ButtonModule,
                    PaginatorModule,
                    SkeletonModule,
                    DialogModule,
                    ConfirmDialogModule,
                    BreadcrumbsComponent,
                    BulkActionsBarComponent
                ], providers: [ConfirmationService], template: "<div class=\"contacts page-container\">\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>People intelligence</span>\n      </div>\n\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Contact</span>\n        <span class=\"title-light\">Workspace</span>\n      </h1>\n\n      <p class=\"hero-description\">\n        Centralize every stakeholder, keep lifecycle context visible, and push the right next step for each customer.\n      </p>\n\n      <div class=\"hero-stats\">\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ contactsInScope() || 0 }}</div>\n          <div class=\"stat-label\">In view</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill\" style=\"width: 100%\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ contactsWithLinkedAccounts() }}</div>\n          <div class=\"stat-label\">Linked customers</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--cyan\" [style.width.%]=\"contacts().length ? (contactsWithLinkedAccounts() / contacts().length) * 100 : 0\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ ownerCount() }}</div>\n          <div class=\"stat-label\">Owners active</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--purple\" [style.width.%]=\"ownerOptions().length ? (ownerCount() / (ownerOptions().length || 1)) * 100 : 0\"></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"hero-actions\">\n        <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"!canManage()\" (click)=\"onCreate()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-user-plus\"></i></span>\n          <span>Add contact</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--refresh\" (click)=\"load()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n          <span>Refresh</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-bullseye\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Lead coverage</span>\n          <strong class=\"card-value\">{{ lifecycleCounts().lead }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-bolt\"></i> High intent\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n\n      <div class=\"visual-card visual-card--secondary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-star\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Prospects</span>\n          <strong class=\"card-value\">{{ lifecycleCounts().prospect }}</strong>\n          <span class=\"card-trend card-trend--up\">\n            <i class=\"pi pi-arrow-up\"></i> Growing\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"metrics-section\">\n    <div class=\"metric-card metric-card--total\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-users\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Contacts</span>\n        <strong class=\"metric-value\">{{ contacts().length || '\u2014' }}</strong>\n      </div>\n      <div class=\"metric-chart\">\n        <svg viewBox=\"0 0 100 40\" class=\"sparkline\">\n          <path d=\"M0,35 Q25,30 50,20 T100,15\" fill=\"none\" stroke=\"url(#gradient-contacts)\" stroke-width=\"2\"/>\n          <defs>\n            <linearGradient id=\"gradient-contacts\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n              <stop offset=\"0%\" stop-color=\"#667eea\"/>\n              <stop offset=\"100%\" stop-color=\"#764ba2\"/>\n            </linearGradient>\n          </defs>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--leads\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-bolt\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Leads</span>\n        <strong class=\"metric-value\">{{ lifecycleCounts().lead }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--cyan\" \n            [attr.stroke-dasharray]=\"(contacts().length ? (lifecycleCounts().lead / contacts().length) * 100 : 0) + ', 100'\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--prospects\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-star\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Prospects</span>\n        <strong class=\"metric-value\">{{ lifecycleCounts().prospect }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--purple\" \n            [attr.stroke-dasharray]=\"(contacts().length ? (lifecycleCounts().prospect / contacts().length) * 100 : 0) + ', 100'\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--customers\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-check-circle\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Customers</span>\n        <strong class=\"metric-value\">{{ lifecycleCounts().customer }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--green\" \n            [attr.stroke-dasharray]=\"(contacts().length ? (lifecycleCounts().customer / contacts().length) * 100 : 0) + ', 100'\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"filter-section\">\n    <div class=\"filter-bar\">\n      <div class=\"search-wrapper\">\n        <i class=\"pi pi-search search-icon\"></i>\n        <input\n          pInputText\n          type=\"search\"\n          class=\"search-input\"\n          placeholder=\"Search contacts, emails, phone...\"\n          [(ngModel)]=\"searchTerm\"\n          (ngModelChange)=\"onSearch($event)\"\n        />\n        <kbd class=\"search-kbd\">\u2318K</kbd>\n      </div>\n\n      <div class=\"filter-pills\">\n        <div class=\"filter-pill\">\n          <i class=\"pi pi-user\"></i>\n          <p-select appendTo=\"body\"\n            [options]=\"ownerOptions()\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"ownerFilter()\"\n            (ngModelChange)=\"onOwnerFilterChange($event)\"\n            placeholder=\"Owner\"\n            styleClass=\"filter-select\"\n          ></p-select>\n        </div>\n\n        <div class=\"filter-pill\">\n          <i class=\"pi pi-tag\"></i>\n          <p-select appendTo=\"body\"\n            [options]=\"lifecycleOptions\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"lifecycleFilter()\"\n            (ngModelChange)=\"onLifecycleChange($event)\"\n            placeholder=\"Lifecycle\"\n            styleClass=\"filter-select\"\n          ></p-select>\n        </div>\n\n        <div class=\"filter-pill\">\n          <i class=\"pi pi-building\"></i>\n          <p-select appendTo=\"body\"\n            [options]=\"accountFilterOptions()\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"accountFilter === 'all' ? 'all' : accountFilter\"\n            (ngModelChange)=\"onAccountChange($event)\"\n            placeholder=\"Customer\"\n            styleClass=\"filter-select\"\n          ></p-select>\n        </div>\n\n        <div class=\"filter-pill\" *ngIf=\"tagOptions().length > 1\">\n          <i class=\"pi pi-hashtag\"></i>\n          <p-select appendTo=\"body\"\n            [options]=\"tagOptions()\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"tagFilter\"\n            (ngModelChange)=\"onTagFilterChange($event)\"\n            placeholder=\"Tag\"\n            styleClass=\"filter-select\"\n          ></p-select>\n        </div>\n      </div>\n\n      <!-- C13: View Toggle -->\n      <div class=\"view-toggle\">\n        <button type=\"button\" class=\"toggle-btn\" [class.active]=\"viewMode() === 'table'\" (click)=\"viewMode.set('table')\" title=\"Table view\">\n          <i class=\"pi pi-list\"></i>\n        </button>\n        <button type=\"button\" class=\"toggle-btn\" [class.active]=\"viewMode() === 'grid'\" (click)=\"viewMode.set('grid')\" title=\"Card view\">\n          <i class=\"pi pi-th-large\"></i>\n        </button>\n      </div>\n    </div>\n\n  </section>\n\n  <section class=\"lifecycle-chips\">\n    <button type=\"button\" class=\"lifecycle-chip\" [class.lifecycle-chip--active]=\"lifecycleFilter() === 'all'\" (click)=\"onLifecycleChange('all')\">\n      <span>All</span>\n      <span class=\"chip-count\">{{ contacts().length }}</span>\n    </button>\n    <button type=\"button\" class=\"lifecycle-chip lifecycle-chip--lead\" [class.lifecycle-chip--active]=\"lifecycleFilter() === 'Lead'\" (click)=\"onLifecycleChange('Lead')\">\n      <i class=\"pi pi-bolt\"></i>\n      <span>Lead</span>\n      <span class=\"chip-count\">{{ lifecycleCounts().lead }}</span>\n    </button>\n    <button type=\"button\" class=\"lifecycle-chip lifecycle-chip--prospect\" [class.lifecycle-chip--active]=\"lifecycleFilter() === 'Prospect'\" (click)=\"onLifecycleChange('Prospect')\">\n      <i class=\"pi pi-star\"></i>\n      <span>Prospect</span>\n      <span class=\"chip-count\">{{ lifecycleCounts().prospect }}</span>\n    </button>\n    <button type=\"button\" class=\"lifecycle-chip lifecycle-chip--customer\" [class.lifecycle-chip--active]=\"lifecycleFilter() === 'Customer'\" (click)=\"onLifecycleChange('Customer')\">\n      <i class=\"pi pi-check-circle\"></i>\n      <span>Customer</span>\n      <span class=\"chip-count\">{{ lifecycleCounts().customer }}</span>\n    </button>\n  </section>\n\n  <section class=\"contacts__content\">\n    <div class=\"table-card crm-panel\">\n      <header class=\"list-header\">\n        <div>\n          <div class=\"list-title\">Contact coverage</div>\n          <small>Showing {{ filteredContacts().length }} {{ filteredContacts().length === 1 ? 'contact' : 'contacts' }} with lifecycle + customer context</small>\n        </div>\n        <div class=\"list-select\">\n          <p-checkbox\n            [binary]=\"true\"\n            [ngModel]=\"selectedIds().length && selectedIds().length === filteredContacts().length\"\n            (onChange)=\"toggleSelectAll($event.checked)\"\n          ></p-checkbox>\n          <span>Select all</span>\n        </div>\n        <div class=\"list-actions\">\n          <button type=\"button\" class=\"action-btn action-btn--import\" [disabled]=\"!canManage()\" (click)=\"openImport()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-upload\"></i></span>\n            <span>Import</span>\n          </button>\n          <button type=\"button\" class=\"action-btn action-btn--export\" (click)=\"onExport()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-download\"></i></span>\n            <span>Export</span>\n          </button>\n          <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"!canManage()\" (click)=\"onCreate()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n            <span>Add contact</span>\n          </button>\n        </div>\n      </header>\n\n      <ng-container *ngIf=\"!loading(); else loadingState\">\n        <ng-container *ngIf=\"filteredContacts().length; else emptyState\">\n\n          <!-- TABLE VIEW -->\n          <p-table *ngIf=\"viewMode() === 'table'\" class=\"crm-table crm-table--highlight contacts-table\" [value]=\"filteredContacts()\" [tableStyle]=\"{ 'min-width': '100%' }\" [styleClass]=\"'p-datatable-sm'\">\n            <ng-template pTemplate=\"header\">\n              <tr>\n                <th class=\"th-select\">\n                  <p-checkbox\n                    [binary]=\"true\"\n                    [ngModel]=\"selectedIds().length && selectedIds().length === filteredContacts().length\"\n                    (onChange)=\"toggleSelectAll($event.checked)\"\n                  ></p-checkbox>\n                </th>\n                <th pSortableColumn=\"name\">Contact <p-sortIcon field=\"name\"></p-sortIcon></th>\n                <th pSortableColumn=\"phone\">Phone <p-sortIcon field=\"phone\"></p-sortIcon></th>\n                <th pSortableColumn=\"buyingRole\">Role <p-sortIcon field=\"buyingRole\"></p-sortIcon></th>\n                <th pSortableColumn=\"activityScore\">Score <p-sortIcon field=\"activityScore\"></p-sortIcon></th>\n                <th>Tags</th>\n                <th pSortableColumn=\"lifecycleStage\">Lifecycle <p-sortIcon field=\"lifecycleStage\"></p-sortIcon></th>\n                <th pSortableColumn=\"ownerId\">Owner <p-sortIcon field=\"ownerId\"></p-sortIcon></th>\n                <th pSortableColumn=\"createdAt\">Created <p-sortIcon field=\"createdAt\"></p-sortIcon></th>\n                <th class=\"th-actions\">Actions</th>\n              </tr>\n            </ng-template>\n            <ng-template pTemplate=\"body\" let-row>\n              <tr (click)=\"onRowClick(row, $event)\">\n                <td class=\"select-cell\">\n                  <p-checkbox\n                    [binary]=\"true\"\n                    [ngModel]=\"isSelected(row.id)\"\n                    (onChange)=\"toggleSelection(row.id, $event.checked)\"\n                  ></p-checkbox>\n                </td>\n                <td class=\"contact-cell\">\n                  <div class=\"contact-cell__main\">\n                    <div class=\"name__title\">{{ row.name }}</div>\n                    <small *ngIf=\"row.email\"><a class=\"contact-link\" href=\"\" (click)=\"composeToContact(row, $event)\"><i class=\"pi pi-envelope\"></i> {{ row.email }}</a></small>\n                    <small *ngIf=\"!row.email\" class=\"text-muted\">No email</small>\n                  </div>\n                  <div class=\"contact-cell__meta\">\n                    <span>{{ row.accountName || 'No customer' }}</span>\n                    <span>{{ row.jobTitle || 'No role' }}</span>\n                  </div>\n                </td>\n                <td>\n                  <a *ngIf=\"row.phone || row.mobile\" class=\"contact-link contact-link--phone\" [href]=\"'tel:' + (row.phone || row.mobile)\" (click)=\"$event.stopPropagation()\"><i class=\"pi pi-phone\"></i> {{ row.phone || row.mobile }}</a>\n                  <span *ngIf=\"!row.phone && !row.mobile\" class=\"cell-value\">\u2014</span>\n                </td>\n                <td>\n                  <p-tag *ngIf=\"row.buyingRole\" [value]=\"row.buyingRole\" [severity]=\"buyingRoleSeverity(row.buyingRole)\" [rounded]=\"true\"></p-tag>\n                  <span *ngIf=\"!row.buyingRole\" class=\"cell-value\">\u2014</span>\n                </td>\n                <td>\n                  <div *ngIf=\"row.activityScore != null\" class=\"score-bar-wrapper\">\n                    <div class=\"score-bar\">\n                      <div class=\"score-bar__fill\" [style.width.%]=\"row.activityScore\" [class.score-bar__fill--low]=\"row.activityScore < 30\" [class.score-bar__fill--mid]=\"row.activityScore >= 30 && row.activityScore < 70\" [class.score-bar__fill--high]=\"row.activityScore >= 70\"></div>\n                    </div>\n                    <span class=\"score-value\">{{ row.activityScore }}</span>\n                  </div>\n                  <span *ngIf=\"row.activityScore == null\" class=\"cell-value\">\u2014</span>\n                </td>\n                <td>\n                  <div class=\"tag-chips\" *ngIf=\"row.tags?.length\">\n                    <span class=\"tag-chip\" *ngFor=\"let tag of row.tags!.slice(0, 3)\">{{ tag }}</span>\n                    <span class=\"tag-chip tag-chip--more\" *ngIf=\"row.tags!.length > 3\">+{{ row.tags!.length - 3 }}</span>\n                  </div>\n                  <span *ngIf=\"!row.tags?.length\" class=\"cell-value\">\u2014</span>\n                </td>\n                <td>\n                  <p-select appendTo=\"body\"\n                    [options]=\"lifecycleFormOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    [ngModel]=\"row.lifecycleStage || 'Customer'\"\n                    (ngModelChange)=\"onInlineLifecycleChange(row, $event)\"\n                    styleClass=\"inline-select\"\n                  ></p-select>\n                </td>\n                <td>\n                  <p-select appendTo=\"body\"\n                    [options]=\"ownerOptionsForAssign()\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    [ngModel]=\"row.ownerId\"\n                    (ngModelChange)=\"onInlineOwnerChange(row, $event)\"\n                    placeholder=\"Owner\"\n                    styleClass=\"inline-select\"\n                  ></p-select>\n                </td>\n                <td class=\"td-created\">\n                  <span class=\"created-date\">{{ row.createdAt | date: 'MMM d, yyyy' }}</span>\n                </td>\n                <td class=\"td-actions\">\n                  <div class=\"row-actions\">\n                    <button type=\"button\" class=\"row-action-btn row-action-btn--activity\" (click)=\"$event.stopPropagation(); openQuickActivity(row)\" title=\"Log activity\"><i class=\"pi pi-clock\"></i></button>\n                    <button type=\"button\" class=\"row-action-btn row-action-btn--edit\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onEdit(row)\" title=\"Edit\"><i class=\"pi pi-pencil\"></i></button>\n                    <button type=\"button\" class=\"row-action-btn row-action-btn--delete\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onDelete(row)\" title=\"Delete\"><i class=\"pi pi-trash\"></i></button>\n                  </div>\n                </td>\n              </tr>\n            </ng-template>\n          </p-table>\n\n          <!-- CARD GRID VIEW -->\n          <div *ngIf=\"viewMode() === 'grid'\" class=\"contact-card-grid\">\n            <div class=\"contact-card\" *ngFor=\"let row of filteredContacts()\" (click)=\"onEdit(row)\">\n              <div class=\"contact-card__header\">\n                <div class=\"contact-card__avatar\">\n                  <img\n                    [src]=\"$any(row).profilePictureUrl || ('https://i.pravatar.cc/150?u=' + (row.email || row.id))\"\n                    [alt]=\"row.name + ' avatar'\"\n                    [title]=\"row.name + ' avatar'\"\n                  />\n                </div>\n                <div class=\"contact-card__lifecycle\">\n                  <p-tag [value]=\"row.lifecycleStage || 'Customer'\"\n                    [severity]=\"statusSeverity(row.lifecycleStage)\"\n                    [rounded]=\"true\"></p-tag>\n                </div>\n              </div>\n              <div class=\"contact-card__body\">\n                <div class=\"contact-card__name\">{{ row.name }}</div>\n                <div class=\"contact-card__meta\" *ngIf=\"row.jobTitle || row.accountName\">\n                  <span *ngIf=\"row.jobTitle\">{{ row.jobTitle }}</span>\n                  <span *ngIf=\"row.jobTitle && row.accountName\"> \u00B7 </span>\n                  <span *ngIf=\"row.accountName\">{{ row.accountName }}</span>\n                </div>\n                <div class=\"contact-card__details\">\n                  <div class=\"contact-card__detail\" *ngIf=\"row.email\">\n                    <i class=\"pi pi-envelope\"></i>\n                    <span>{{ row.email }}</span>\n                  </div>\n                  <div class=\"contact-card__detail\" *ngIf=\"row.phone || row.mobile\">\n                    <i class=\"pi pi-phone\"></i>\n                    <span>{{ row.phone || row.mobile }}</span>\n                  </div>\n                  <div class=\"contact-card__tags\" *ngIf=\"row.tags?.length\">\n                    <span class=\"tag-chip\" *ngFor=\"let tag of row.tags!.slice(0, 2)\">{{ tag }}</span>\n                    <span class=\"tag-chip tag-chip--more\" *ngIf=\"row.tags!.length > 2\">+{{ row.tags!.length - 2 }}</span>\n                  </div>\n                </div>\n              </div>\n              <div class=\"contact-card__footer\">\n                <div class=\"contact-card__score\" *ngIf=\"row.activityScore != null\">\n                  <div class=\"score-bar\">\n                    <div class=\"score-bar__fill\"\n                      [style.width.%]=\"row.activityScore\"\n                      [class.score-bar__fill--low]=\"row.activityScore < 30\"\n                      [class.score-bar__fill--mid]=\"row.activityScore >= 30 && row.activityScore < 70\"\n                      [class.score-bar__fill--high]=\"row.activityScore >= 70\"></div>\n                  </div>\n                  <span class=\"score-value\">{{ row.activityScore }}</span>\n                </div>\n                <div class=\"contact-card__actions\">\n                  <button type=\"button\" class=\"row-action-btn row-action-btn--activity\" (click)=\"$event.stopPropagation(); openQuickActivity(row)\" title=\"Log activity\">\n                    <i class=\"pi pi-clock\"></i>\n                  </button>\n                  <button type=\"button\" class=\"row-action-btn row-action-btn--edit\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onEdit(row)\" title=\"Edit\">\n                    <i class=\"pi pi-pencil\"></i>\n                  </button>\n                  <button type=\"button\" class=\"row-action-btn row-action-btn--delete\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onDelete(row)\" title=\"Delete\">\n                    <i class=\"pi pi-trash\"></i>\n                  </button>\n                </div>\n              </div>\n            </div>\n          </div>\n\n        </ng-container>\n      </ng-container>\n\n      <ng-template #loadingState>\n        <div class=\"skeletons\">\n          <p-skeleton height=\"1.5rem\" *ngFor=\"let _ of [1,2,3,4,5]\"></p-skeleton>\n        </div>\n      </ng-template>\n\n      <ng-template #emptyState>\n        <div class=\"empty-state\">\n          <i class=\"pi pi-user\"></i>\n          <p>No contacts match the current filters.</p>\n          <button pButton type=\"button\" class=\"crm-button crm-button--text\" label=\"Create contact\" [disabled]=\"!canManage()\" (click)=\"onCreate()\"></button>\n        </div>\n      </ng-template>\n\n      <p-paginator\n        [rows]=\"rows\"\n        [totalRecords]=\"total()\"\n        [rowsPerPageOptions]=\"[5, 10, 20]\"\n        [first]=\"pageIndex * rows\"\n        (onPageChange)=\"onPageChange($event)\"\n        styleClass=\"contacts__paginator\"\n      ></p-paginator>\n    </div>\n  </section>\n\n  <app-bulk-actions-bar\n    [actions]=\"bulkActions()\"\n    [selectedItems]=\"selectedIds()\"\n    [totalCount]=\"filteredContacts().length\"\n    (actionClicked)=\"onBulkAction($event)\"\n    (clearSelection)=\"clearSelection()\"\n    (selectAll)=\"selectAllFiltered()\"\n  ></app-bulk-actions-bar>\n\n  <p-dialog\n    header=\"Assign owner\"\n    [(visible)]=\"assignDialogVisible\"\n    [modal]=\"true\"\n    [style]=\"{ width: '360px' }\"\n  >\n    <div class=\"bulk-assign\">\n      <label>Owner</label>\n      <p-select appendTo=\"body\"\n        [options]=\"ownerOptionsForAssign()\"\n        optionLabel=\"label\"\n        optionValue=\"value\"\n        [(ngModel)]=\"assignOwnerId\"\n        placeholder=\"Select owner\"\n        styleClass=\"w-full\"\n      ></p-select>\n    </div>\n    <ng-template pTemplate=\"footer\">\n      <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" label=\"Cancel\" (click)=\"assignDialogVisible = false\"></button>\n      <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Assign\" [disabled]=\"!assignOwnerId || !canManage()\" (click)=\"confirmBulkAssign()\"></button>\n    </ng-template>\n  </p-dialog>\n\n  <p-dialog\n    header=\"Change lifecycle\"\n    [(visible)]=\"statusDialogVisible\"\n    [modal]=\"true\"\n    [style]=\"{ width: '360px' }\"\n  >\n    <div class=\"bulk-assign\">\n      <label>Lifecycle</label>\n      <p-select appendTo=\"body\"\n        [options]=\"lifecycleFormOptions\"\n        optionLabel=\"label\"\n        optionValue=\"value\"\n        [(ngModel)]=\"bulkStatus\"\n        placeholder=\"Select lifecycle\"\n        styleClass=\"w-full\"\n      ></p-select>\n    </div>\n    <ng-template pTemplate=\"footer\">\n      <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" label=\"Cancel\" (click)=\"statusDialogVisible = false\"></button>\n      <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Update\" [disabled]=\"!bulkStatus || !canManage()\" (click)=\"confirmBulkStatusUpdate()\"></button>\n    </ng-template>\n  </p-dialog>\n\n  <p-dialog\n    header=\"Import contacts\"\n    [(visible)]=\"importDialogVisible\"\n    [modal]=\"true\"\n    [dismissableMask]=\"true\"\n    [style]=\"{ width: '480px' }\"\n    (onHide)=\"closeImport()\"\n  >\n    <div class=\"import-dialog\">\n      <p class=\"import-note\">\n        Upload a CSV with headers. Required column: <strong>Name</strong> or <strong>FirstName</strong>.\n      </p>\n      <label class=\"import-upload\">\n        <p-fileUpload\n          mode=\"basic\"\n          name=\"file\"\n          [auto]=\"false\"\n          [customUpload]=\"true\"\n          [showUploadButton]=\"false\"\n          [showCancelButton]=\"false\"\n          [chooseLabel]=\"importFile?.name || 'Choose CSV file'\"\n          accept=\".csv\"\n          (onSelect)=\"onImportFileSelected($event)\"\n        ></p-fileUpload>\n      </label>\n      <div class=\"import-actions\">\n        <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" label=\"Cancel\" (click)=\"closeImport()\"></button>\n        <button pButton type=\"button\" class=\"crm-button crm-button--primary\" [disabled]=\"!importFile || importing() || !canManage()\" (click)=\"onImport()\">\n          {{ importing() ? 'Importing...' : 'Import' }}\n        </button>\n      </div>\n      <div class=\"import-error\" *ngIf=\"importError()\">{{ importError() }}</div>\n      <div class=\"import-status\" *ngIf=\"importJob() as job\">\n        <span>Status: {{ importStatus()?.status || job.status }}</span>\n      </div>\n      <div class=\"import-result\" *ngIf=\"importStatus() as result\">\n        <div class=\"import-metrics\">\n          <span>Rows: {{ result.total }}</span>\n          <span>Imported: {{ result.imported }}</span>\n          <span>Skipped: {{ result.skipped }}</span>\n        </div>\n        <div class=\"import-errors\" *ngIf=\"result.errors.length\">\n          <p>Errors (first 5):</p>\n          <ul>\n            <li *ngFor=\"let err of result.errors.slice(0, 5)\">\n              Row {{ err.rowNumber }}: {{ err.message }}\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </p-dialog>\n\n  <!-- C14: Quick Activity Log Dialog -->\n  <p-dialog\n    header=\"Log Activity\"\n    [(visible)]=\"activityLogVisible\"\n    [modal]=\"true\"\n    [style]=\"{ width: '400px' }\"\n  >\n    <div class=\"quick-activity\" *ngIf=\"activityLogContact\">\n      <div class=\"quick-activity__for\">\n        <i class=\"pi pi-user\"></i>\n        <span>{{ activityLogContact.name }}</span>\n      </div>\n      <div class=\"quick-activity__field\">\n        <label>Type</label>\n        <p-select appendTo=\"body\"\n          [options]=\"activityTypeOptions\"\n          optionLabel=\"label\"\n          optionValue=\"value\"\n          [(ngModel)]=\"activityType\"\n          styleClass=\"w-full\"\n        >\n          <ng-template pTemplate=\"item\" let-option>\n            <div class=\"select-option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n          </ng-template>\n          <ng-template pTemplate=\"value\" let-option>\n            <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n          </ng-template>\n        </p-select>\n      </div>\n      <div class=\"quick-activity__field\">\n        <label>Subject</label>\n        <input pInputText [(ngModel)]=\"activitySubject\" placeholder=\"Brief description\" class=\"w-full\" />\n      </div>\n    </div>\n    <ng-template pTemplate=\"footer\">\n      <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" label=\"Cancel\" (click)=\"activityLogVisible = false\"></button>\n      <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Log\" [disabled]=\"!activitySubject.trim() || activitySaving()\" (click)=\"saveQuickActivity()\"></button>\n    </ng-template>\n  </p-dialog>\n\n  <!-- C16: Merge Contacts Dialog -->\n  <p-dialog\n    header=\"Merge contacts\"\n    [(visible)]=\"mergeDialogVisible\"\n    [modal]=\"true\"\n    [style]=\"{ width: '440px' }\"\n  >\n    <div class=\"merge-dialog\" *ngIf=\"mergeDialogVisible\">\n      <p class=\"merge-note\">Select the <strong>primary contact</strong> to keep. All activities, opportunities, and tags from the other contacts will be merged into it.</p>\n      <div class=\"merge-options\">\n        <div class=\"merge-option\" *ngFor=\"let id of selectedIds()\"\n          [class.merge-option--selected]=\"mergeMasterId === id\"\n          (click)=\"mergeMasterId = id\">\n          <div class=\"merge-radio\">\n            <span class=\"merge-radio__dot\" *ngIf=\"mergeMasterId === id\"></span>\n          </div>\n          <span class=\"merge-option__name\">{{ getMergeContactName(id) }}</span>\n          <span class=\"merge-option__badge\" *ngIf=\"mergeMasterId === id\">Primary</span>\n        </div>\n      </div>\n    </div>\n    <ng-template pTemplate=\"footer\">\n      <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" label=\"Cancel\" (click)=\"mergeDialogVisible = false\"></button>\n      <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Merge\" [disabled]=\"!mergeMasterId || merging()\" (click)=\"confirmMerge()\"></button>\n    </ng-template>\n  </p-dialog>\n\n  <p-confirmDialog></p-confirmDialog>\n\n</div>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n@keyframes orb-float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  25% {\n    transform: translate(40px, -25px) scale(1.06);\n  }\n  50% {\n    transform: translate(80px, 15px) scale(0.94);\n  }\n  75% {\n    transform: translate(25px, 40px) scale(1.03);\n  }\n}\n\n@keyframes shimmer {\n  0% {\n    transform: translateX(-100%);\n  }\n  100% {\n    transform: translateX(100%);\n  }\n}\n\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes ring-draw {\n  0% { stroke-dasharray: 0, 100; }\n}\n\n@keyframes slide-in-right {\n  from {\n    opacity: 0;\n    transform: translateX(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n.contacts {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e7ecf4 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n\n  .bg-orbs {\n    position: fixed;\n    inset: 0;\n    pointer-events: none;\n    z-index: 0;\n    overflow: hidden;\n  }\n\n  .orb {\n    position: absolute;\n    border-radius: 50%;\n    filter: blur(60px);\n    opacity: 0.35;\n    animation: orb-float 20s ease-in-out infinite;\n\n    &.orb-1 {\n      width: 520px;\n      height: 520px;\n      background: $primary-gradient;\n      top: -200px;\n      right: -140px;\n    }\n\n    &.orb-2 {\n      width: 360px;\n      height: 360px;\n      background: $cyan-gradient;\n      bottom: 5%;\n      left: -120px;\n      animation-delay: -6s;\n      animation-duration: 24s;\n    }\n\n    &.orb-3 {\n      width: 300px;\n      height: 300px;\n      background: $secondary-gradient;\n      top: 40%;\n      right: 18%;\n      animation-delay: -12s;\n      animation-duration: 18s;\n    }\n  }\n\n  .hero-section {\n    position: relative;\n    z-index: 1;\n    display: grid;\n    grid-template-columns: 1fr auto;\n    gap: $space-6;\n    margin-bottom: $space-5;\n\n    @media (max-width: 1200px) {\n      grid-template-columns: 1fr;\n      gap: $space-4;\n    }\n  }\n\n  .hero-content {\n    display: flex;\n    flex-direction: column;\n    gap: $space-3;\n  }\n\n  .hero-badge {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-1 $space-3;\n    background: $glass-bg;\n    backdrop-filter: blur($glass-blur);\n    border: 1px solid $glass-border;\n    border-radius: $radius-full;\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: $primary;\n    text-transform: uppercase;\n    letter-spacing: 0.1em;\n    width: fit-content;\n    box-shadow: $glass-shadow;\n\n    .badge-dot {\n      width: 8px;\n      height: 8px;\n      background: $success;\n      border-radius: 50%;\n      box-shadow: 0 0 12px rgba(76, 175, 80, 0.6);\n    }\n  }\n\n  .hero-description {\n    max-width: 600px;\n    color: $gray-600;\n    font-size: $font-size-base;\n  }\n\n  .hero-stats {\n    display: flex;\n    flex-wrap: wrap;\n    gap: $space-4;\n  }\n\n  .hero-stat {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    min-width: 110px;\n\n    .stat-value {\n      font-size: $font-size-2xl;\n      font-weight: 700;\n      color: $gray-800;\n    }\n\n    .stat-label {\n      font-size: $font-size-xs;\n      color: $gray-500;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n\n    .stat-bar {\n      width: 100%;\n      height: 4px;\n      background: rgba(102, 126, 234, 0.15);\n      border-radius: $radius-full;\n      overflow: hidden;\n      margin-top: 4px;\n\n      .stat-bar-fill {\n        height: 100%;\n        background: $primary-gradient;\n\n        &--cyan {\n          background: $cyan-gradient;\n        }\n\n        &--purple {\n          background: $secondary-gradient;\n        }\n      }\n    }\n  }\n\n  .hero-actions {\n    display: flex;\n    gap: $space-3;\n    margin-top: $space-2;\n    flex-wrap: wrap;\n  }\n\n  // Hero Visual Cards\n  .hero-visual {\n    display: flex;\n    flex-direction: column;\n    gap: $space-3;\n    animation: slide-in-right 0.6s ease-out 0.2s both;\n  }\n\n  .visual-card {\n    position: relative;\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    padding: $space-3 $space-4;\n    background: $glass-bg;\n    backdrop-filter: blur($glass-blur);\n    border: 1px solid $glass-border;\n    border-radius: $radius-lg;\n    box-shadow: $glass-shadow;\n    min-width: 220px;\n    overflow: hidden;\n    transition: transform $transition-base, box-shadow $transition-base;\n\n    &:hover {\n      transform: translateY(-2px);\n      box-shadow: $glass-shadow-lg;\n    }\n\n    .card-icon {\n      width: 36px;\n      height: 36px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: $radius-md;\n      font-size: $font-size-xl;\n    }\n\n    &--primary .card-icon {\n      background: $primary-gradient;\n      color: white;\n    }\n\n    &--secondary .card-icon {\n      background: $cyan-gradient;\n      color: white;\n    }\n\n    .card-content {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n    }\n\n    .card-label {\n      font-size: $font-size-xs;\n      color: $gray-500;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n\n    .card-value {\n      font-size: $font-size-2xl;\n      font-weight: 700;\n      color: $gray-800;\n    }\n\n    .card-trend {\n      display: flex;\n      align-items: center;\n      gap: $space-1;\n      font-size: $font-size-xs;\n      color: $gray-500;\n\n      &--up {\n        color: $success;\n      }\n    }\n\n    .card-glow {\n      position: absolute;\n      top: -50%;\n      right: -50%;\n      width: 100%;\n      height: 100%;\n      background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n      pointer-events: none;\n    }\n  }\n\n  .btn {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-2 $space-4;\n    border: none;\n    border-radius: $radius-md;\n    font-size: $font-size-base;\n    font-weight: 600;\n    cursor: pointer;\n    transition: all $transition-base;\n    overflow: hidden;\n\n    i {\n      font-size: $font-size-base;\n    }\n  }\n\n  .btn-primary {\n    background: $primary-gradient;\n    color: #fff;\n    box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n    &:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n    }\n  }\n\n  .btn-glow {\n    &::before {\n      content: '';\n      position: absolute;\n      inset: 0;\n      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);\n      animation: shimmer 3s infinite;\n    }\n\n    .btn-shine {\n      position: absolute;\n      top: 0;\n      left: -100%;\n      width: 100%;\n      height: 100%;\n      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);\n      transition: left 0.4s ease;\n    }\n\n    &:hover .btn-shine {\n      left: 100%;\n    }\n  }\n\n  .btn-secondary {\n    background: $glass-bg;\n    backdrop-filter: blur($glass-blur);\n    border: 1px solid $glass-border;\n    color: $gray-700;\n    box-shadow: $glass-shadow;\n\n    &:hover {\n      background: #fff;\n      transform: translateY(-2px);\n      box-shadow: $glass-shadow-lg;\n    }\n  }\n\n  .metrics-section {\n    position: relative;\n    z-index: 1;\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: $space-3;\n    margin-bottom: $space-5;\n\n    @media (max-width: 1100px) {\n      grid-template-columns: repeat(2, 1fr);\n    }\n\n    @media (max-width: 700px) {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  .metric-card {\n    position: relative;\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    padding: $space-3 $space-4;\n    background: $glass-bg;\n    backdrop-filter: blur($glass-blur);\n    border: 1px solid $glass-border;\n    border-radius: $radius-lg;\n    box-shadow: $glass-shadow;\n    overflow: hidden;\n    transition: all $transition-base;\n    animation: fade-in-up 0.5s ease-out backwards;\n\n    @for $i from 1 through 4 {\n      &:nth-child(#{$i}) {\n        animation-delay: #{$i * 0.05}s;\n      }\n    }\n\n    &:hover {\n      transform: translateY(-2px);\n      box-shadow: $glass-shadow-lg;\n\n      .metric-icon {\n        transform: scale(1.1) rotate(5deg);\n      }\n    }\n\n    .metric-icon {\n      width: 36px;\n      height: 36px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: $radius-md;\n      font-size: $font-size-lg;\n      color: white;\n      flex-shrink: 0;\n      transition: transform $transition-spring;\n    }\n\n    &--total .metric-icon { background: $primary-gradient; }\n    &--leads .metric-icon { background: $cyan-gradient; }\n    &--prospects .metric-icon { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n    &--customers .metric-icon { background: $success-gradient; }\n\n    .metric-content {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n      flex: 1;\n      min-width: 0;\n    }\n\n    .metric-label {\n      font-size: $font-size-xs;\n      color: $gray-500;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n\n    .metric-value {\n      font-size: $font-size-2xl;\n      font-weight: 700;\n      color: $gray-800;\n    }\n  }\n\n  // Sparkline Chart\n  .metric-chart {\n    position: absolute;\n    right: $space-4;\n    bottom: $space-3;\n    width: 60px;\n    height: 24px;\n    opacity: 0.5;\n\n    .sparkline {\n      width: 100%;\n      height: 100%;\n    }\n  }\n\n  // Ring Chart\n  .metric-ring {\n    position: absolute;\n    right: $space-3;\n    top: 50%;\n    transform: translateY(-50%);\n    width: 32px;\n    height: 32px;\n\n    svg {\n      width: 100%;\n      height: 100%;\n      transform: rotate(-90deg);\n    }\n\n    .ring-bg {\n      fill: none;\n      stroke: $gray-200;\n      stroke-width: 3;\n    }\n\n    .ring-fill {\n      fill: none;\n      stroke-width: 3;\n      stroke-linecap: round;\n      transition: stroke-dasharray 1s ease-out;\n      animation: ring-draw 1s ease-out;\n\n      &--cyan { stroke: $cyan; }\n      &--purple { stroke: $purple; }\n      &--green { stroke: $success; }\n    }\n  }\n\n  .filter-section {\n    position: relative;\n    z-index: 2;\n    margin-bottom: $space-5;\n    animation: fade-in-up 0.6s ease-out 0.3s both;\n  }\n\n  .lifecycle-chips {\n    display: flex;\n    gap: $space-2;\n    margin-bottom: $space-4;\n    animation: fade-in-up 0.5s ease-out 0.35s both;\n    position: relative;\n    z-index: 2;\n    flex-wrap: wrap;\n  }\n\n  .lifecycle-chip {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-1;\n    padding: $space-1 $space-3;\n    border: 1px solid $glass-border;\n    border-radius: $radius-full;\n    background: $glass-bg;\n    backdrop-filter: blur($glass-blur);\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: $gray-600;\n    cursor: pointer;\n    transition: all 250ms;\n    box-shadow: $glass-shadow;\n\n    i { font-size: 0.8rem; }\n\n    .chip-count {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      min-width: 20px;\n      height: 20px;\n      padding: 0 $space-1;\n      border-radius: $radius-full;\n      background: rgba($gray-200, 0.8);\n      font-size: $font-size-xs;\n      font-weight: 700;\n      color: $gray-500;\n    }\n\n    &:hover {\n      transform: translateY(-1px);\n      box-shadow: $glass-shadow-hover;\n    }\n\n    &--active {\n      background: rgba($primary, 0.1);\n      border-color: rgba($primary, 0.3);\n      color: $primary;\n\n      .chip-count {\n        background: $primary;\n        color: white;\n      }\n    }\n\n    &--lead.lifecycle-chip--active {\n      background: rgba(#06b6d4, 0.1);\n      border-color: rgba(#06b6d4, 0.3);\n      color: #0891b2;\n\n      .chip-count { background: #06b6d4; color: white; }\n    }\n\n    &--prospect.lifecycle-chip--active {\n      background: rgba(#a855f7, 0.1);\n      border-color: rgba(#a855f7, 0.3);\n      color: #9333ea;\n\n      .chip-count { background: #a855f7; color: white; }\n    }\n\n    &--customer.lifecycle-chip--active {\n      background: rgba(#22c55e, 0.1);\n      border-color: rgba(#22c55e, 0.3);\n      color: #16a34a;\n\n      .chip-count { background: #22c55e; color: white; }\n    }\n  }\n\n  .filter-bar {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    padding: $space-3 $space-4;\n    border-radius: $radius-xl;\n    background: $glass-bg;\n    border: 1px solid $glass-border;\n    box-shadow: $glass-shadow;\n    backdrop-filter: blur($glass-blur);\n\n    @media (max-width: 1100px) {\n      flex-wrap: wrap;\n    }\n  }\n\n  .search-wrapper {\n    position: relative;\n    flex: 1;\n    min-width: 280px;\n\n    .search-icon {\n      position: absolute;\n      left: $space-3;\n      top: 50%;\n      transform: translateY(-50%);\n      color: $gray-400;\n      font-size: 1rem;\n      z-index: 1;\n      transition: color $transition-fast;\n    }\n\n    &:focus-within .search-icon {\n      color: $primary;\n    }\n\n    .search-input {\n      width: 100%;\n      padding: $space-2 $space-4 $space-2 calc(#{$space-3} + 24px);\n      border: 1px solid rgba($gray-200, 0.8);\n      border-radius: $radius-lg;\n      background: rgba(255, 255, 255, 0.8);\n      font-size: $font-size-sm;\n      color: $gray-900;\n      transition: all $transition-fast;\n\n      &::placeholder {\n        color: $gray-400;\n      }\n\n      &:focus {\n        outline: none;\n        border-color: rgba($primary, 0.4);\n        background: #ffffff;\n        box-shadow: 0 0 0 3px rgba($primary, 0.1);\n      }\n    }\n  }\n\n  .search-kbd {\n    position: absolute;\n    right: $space-3;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: 2px 8px;\n    background: linear-gradient(135deg, $gray-100, $gray-50);\n    border: 1px solid $gray-200;\n    border-radius: $radius-sm;\n    font-size: 11px;\n    font-weight: 600;\n    color: $gray-500;\n    font-family: inherit;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);\n  }\n\n  .filter-pills {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    flex-wrap: wrap;\n  }\n\n  .filter-pill {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    padding: $space-1 $space-2;\n    background: rgba(255, 255, 255, 0.6);\n    border: 1px solid rgba($gray-200, 0.6);\n    border-radius: $radius-lg;\n    transition: all $transition-fast;\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.9);\n      border-color: rgba($primary, 0.3);\n    }\n\n    > i {\n      color: $gray-400;\n      font-size: 0.875rem;\n    }\n\n    .filter-select {\n      border: none !important;\n      background: transparent !important;\n      box-shadow: none !important;\n      min-width: 100px;\n\n      .p-select-label {\n        padding: $space-1 $space-2;\n        font-size: $font-size-sm;\n        color: $gray-700;\n      }\n\n      .p-select-trigger {\n        width: auto;\n      }\n\n      &:focus {\n        box-shadow: none !important;\n      }\n    }\n  }\n\n  .filter-group {\n    display: flex;\n    align-items: center;\n\n    &.search {\n      .p-input-icon-left {\n        width: 100%;\n      }\n\n      input {\n        width: 100%;\n      }\n    }\n  }\n\n  .contacts__content {\n    position: relative;\n    z-index: 1;\n  }\n\n  .table-card {\n    margin-top: 0;\n  }\n\n  .list-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: $space-3;\n    margin-bottom: $space-3;\n\n    @media (max-width: 768px) {\n      flex-direction: column;\n      align-items: flex-start;\n    }\n  }\n\n  .list-title {\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .list-select {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n\n  .select-cell {\n    width: 36px;\n  }\n\n  .checkbox {\n    width: 16px;\n    height: 16px;\n    accent-color: $primary;\n  }\n\n  ::ng-deep .inline-select {\n    .p-select {\n      min-width: 140px;\n      border-radius: $radius-md;\n    }\n\n    .p-select-label {\n      font-size: $font-size-sm;\n      color: $gray-700;\n    }\n  }\n\n  .list-actions {\n    display: flex;\n    gap: $space-2;\n    flex-wrap: wrap;\n  }\n\n  .contacts-table {\n    width: 100%;\n    border-collapse: collapse;\n    border-radius: 16px;\n    overflow: hidden;\n\n    // Soft blue gradient header - Global Standard\n    ::ng-deep .p-datatable-thead > tr > th {\n      background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n      border: none;\n      border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n      padding: $space-3 $space-4;\n      font-size: 0.72rem;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n      color: #3b82f6;\n    }\n\n    // Standard body rows\n    ::ng-deep .p-datatable-tbody > tr > td {\n      vertical-align: middle;\n      padding: $space-3 $space-2;\n    }\n  }\n\n  .bulk-assign {\n    display: flex;\n    flex-direction: column;\n    gap: $space-2;\n  }\n\n  .contact-link {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    color: $primary;\n    text-decoration: none;\n    font-size: $font-size-sm;\n    transition: color 200ms;\n\n    i { font-size: 0.75rem; }\n\n    &:hover {\n      color: color.adjust($primary, $lightness: -10%);\n      text-decoration: underline;\n    }\n\n    &--phone {\n      color: $gray-700;\n      font-weight: 600;\n\n      &:hover { color: $primary; }\n    }\n  }\n\n  .text-muted {\n    color: $gray-400;\n    font-size: $font-size-sm;\n  }\n\n  .score-bar-wrapper {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n  }\n\n  .score-bar {\n    width: 60px;\n    height: 6px;\n    background: $gray-200;\n    border-radius: $radius-full;\n    overflow: hidden;\n\n    &__fill {\n      height: 100%;\n      border-radius: $radius-full;\n      transition: width 0.6s ease-out;\n\n      &--low { background: linear-gradient(90deg, #f87171, #ef4444); }\n      &--mid { background: linear-gradient(90deg, #fbbf24, #f59e0b); }\n      &--high { background: linear-gradient(90deg, #4ade80, #22c55e); }\n    }\n  }\n\n  .score-value {\n    font-size: $font-size-xs;\n    font-weight: 700;\n    color: $gray-700;\n    min-width: 20px;\n  }\n\n  .contact-cell {\n    display: flex;\n    flex-direction: column;\n    gap: $space-1;\n\n    &__main {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n    }\n\n    &__meta {\n      display: flex;\n      gap: $space-2;\n      flex-wrap: wrap;\n      font-size: $font-size-xs;\n      color: $gray-500;\n\n      span {\n        background: rgba(148, 163, 184, 0.15);\n        padding: 2px 8px;\n        border-radius: $radius-full;\n      }\n    }\n  }\n\n  .cell {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n\n    .cell-label {\n      font-size: $font-size-xs;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n      color: $gray-500;\n    }\n\n    .cell-value {\n      color: $gray-800;\n      font-weight: 600;\n    }\n\n    .action-buttons {\n      display: flex;\n      gap: $space-1;\n    }\n  }\n\n  .th-actions,\n  .td-actions {\n    text-align: right;\n  }\n\n  .empty-state {\n    text-align: center;\n    padding: $space-5 $space-3;\n    color: $gray-500;\n\n    i {\n      font-size: 2rem;\n      margin-bottom: $space-2;\n      color: $primary;\n    }\n  }\n\n  .contacts__paginator {\n    margin-top: $space-3;\n  }\n\n  @media (max-width: 600px) {\n    // Preserve table readability on small screens without truncation.\n    .table-card {\n      overflow-x: auto;\n    }\n\n    .contacts-table {\n      min-width: 760px;\n    }\n  }\n\n  .import-dialog {\n    display: flex;\n    flex-direction: column;\n    gap: $space-3;\n\n    .import-note {\n      margin: 0;\n      color: $gray-500;\n    }\n\n    .import-upload {\n      border: 1px dashed rgba($gray-300, 0.7);\n      border-radius: $radius-md;\n      padding: $space-3;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: $space-2;\n      cursor: pointer;\n      background: rgba(255, 255, 255, 0.7);\n\n      input {\n        display: none;\n      }\n\n      span {\n        font-weight: 600;\n        color: $gray-800;\n      }\n    }\n\n    .import-actions {\n      display: flex;\n      justify-content: flex-end;\n      gap: $space-2;\n    }\n\n    .import-error {\n      color: $danger;\n      font-weight: 600;\n    }\n\n    .import-result {\n      background: rgba(239, 246, 255, 0.7);\n      border-radius: $radius-md;\n      padding: $space-2 $space-3;\n      border: 1px solid rgba($gray-200, 0.6);\n\n      .import-metrics {\n        display: flex;\n        gap: $space-3;\n        font-weight: 600;\n        color: $gray-900;\n      }\n\n      .import-errors {\n        margin-top: $space-2;\n        color: $gray-500;\n\n        ul {\n          margin: $space-1 0 0;\n          padding-left: $space-3;\n        }\n      }\n    }\n  }\n\n  // \u2500\u2500 C17: Tag Chips (table cells) \u2500\u2500\n  .tag-chips {\n    display: flex;\n    gap: 4px;\n    flex-wrap: wrap;\n    align-items: center;\n  }\n\n  .tag-chip {\n    display: inline-flex;\n    align-items: center;\n    padding: 1px 8px;\n    font-size: 0.7rem;\n    font-weight: 600;\n    border-radius: $radius-full;\n    background: rgba(102, 126, 234, 0.1);\n    color: #667eea;\n    white-space: nowrap;\n    letter-spacing: 0.02em;\n\n    &--more {\n      background: rgba(0, 0, 0, 0.06);\n      color: $gray-500;\n      font-weight: 500;\n    }\n  }\n}\n\n// \u2500\u2500 C16: Merge Dialog \u2500\u2500\n.merge-dialog {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.merge-note {\n  margin: 0;\n  color: $gray-500;\n  font-size: $font-size-sm;\n  line-height: 1.5;\n}\n\n.merge-options {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.merge-option {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-2 $space-3;\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  border-radius: $radius-md;\n  cursor: pointer;\n  transition: all 200ms ease;\n  background: rgba(255, 255, 255, 0.7);\n\n  &:hover {\n    background: rgba(102, 126, 234, 0.04);\n    border-color: rgba(102, 126, 234, 0.2);\n  }\n\n  &--selected {\n    background: rgba(102, 126, 234, 0.06);\n    border-color: rgba(102, 126, 234, 0.3);\n    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);\n  }\n\n  &__name {\n    flex: 1;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  &__badge {\n    display: inline-flex;\n    padding: 2px 8px;\n    font-size: 0.7rem;\n    font-weight: 700;\n    border-radius: $radius-full;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n}\n\n.merge-radio {\n  width: 18px;\n  height: 18px;\n  border-radius: 50%;\n  border: 2px solid $gray-300;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  transition: all 200ms ease;\n\n  .merge-option--selected & {\n    border-color: #667eea;\n  }\n\n  &__dot {\n    width: 8px;\n    height: 8px;\n    border-radius: 50%;\n    background: #667eea;\n    transform: scale(0);\n    transition: transform 200ms ease;\n\n    .merge-option--selected & {\n      transform: scale(1);\n    }\n  }\n}\n\n// \u2500\u2500 C13: View Toggle \u2500\u2500\n.view-toggle {\n  display: flex;\n  gap: 2px;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: $radius-md;\n  padding: 2px;\n  margin-left: auto;\n\n  .toggle-btn {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 34px;\n    height: 34px;\n    border: none;\n    border-radius: calc(#{$radius-md} - 2px);\n    background: transparent;\n    color: $gray-500;\n    cursor: pointer;\n    transition: all 200ms ease;\n\n    &:hover {\n      color: $gray-700;\n      background: rgba(255, 255, 255, 0.5);\n    }\n\n    &.active {\n      background: white;\n      color: #667eea;\n      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);\n    }\n\n    i { font-size: $font-size-sm; }\n  }\n}\n\n// \u2500\u2500 C13: Contact Card Grid \u2500\u2500\n.contact-card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: $space-4;\n  padding: $space-4;\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n    gap: $space-3;\n    padding: $space-3;\n  }\n}\n\n.contact-card {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  cursor: pointer;\n  transition: transform 250ms ease, box-shadow 250ms ease;\n\n  &:hover {\n    transform: translateY(-3px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: $space-4 $space-4 0;\n  }\n\n  &__avatar {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n    font-size: $font-size-lg;\n    font-weight: 700;\n    border-radius: 50%;\n    flex-shrink: 0;\n    overflow: hidden;\n\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      border-radius: inherit;\n    }\n  }\n\n  &__body {\n    padding: $space-3 $space-4;\n  }\n\n  &__name {\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n    margin-bottom: 2px;\n  }\n\n  &__meta {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    margin-bottom: $space-2;\n  }\n\n  &__details {\n    display: flex;\n    flex-direction: column;\n    gap: $space-1;\n  }\n\n  &__detail {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    font-size: $font-size-sm;\n    color: $gray-600;\n\n    i {\n      font-size: 0.75rem;\n      color: $gray-400;\n    }\n  }\n\n  &__footer {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: $space-2 $space-4 $space-3;\n    border-top: 1px solid rgba(0, 0, 0, 0.04);\n  }\n\n  &__score {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    flex: 1;\n\n    .score-bar {\n      flex: 1;\n      max-width: 80px;\n    }\n  }\n\n  &__actions {\n    display: flex;\n    gap: $space-1;\n  }\n\n  &__tags {\n    display: flex;\n    gap: 4px;\n    flex-wrap: wrap;\n    padding: 0 $space-4 $space-2;\n\n    .tag-chip {\n      display: inline-flex;\n      align-items: center;\n      padding: 1px 8px;\n      font-size: 0.7rem;\n      font-weight: 600;\n      border-radius: $radius-full;\n      background: rgba(102, 126, 234, 0.1);\n      color: #667eea;\n      white-space: nowrap;\n\n      &--more {\n        background: rgba(0, 0, 0, 0.06);\n        color: $gray-500;\n        font-weight: 500;\n      }\n    }\n  }\n}\n\n// \u2500\u2500 C14: Quick Activity Log Dialog \u2500\u2500\n.quick-activity {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n\n  &__for {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-2 $space-3;\n    background: rgba(102, 126, 234, 0.08);\n    border-radius: $radius-md;\n    font-weight: 600;\n    color: $gray-700;\n\n    i { color: #667eea; }\n  }\n\n  &__field {\n    display: flex;\n    flex-direction: column;\n    gap: $space-1;\n\n    label {\n      font-size: $font-size-sm;\n      font-weight: 600;\n      color: $gray-600;\n    }\n  }\n}\n"] }]
    }], () => [{ type: i1.ContactDataService }, { type: i2.CustomerDataService }, { type: i3.Router }, { type: i4.UserAdminDataService }, { type: i5.AppToastService }, { type: i6.ImportJobService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ContactsPage, { className: "ContactsPage", filePath: "src/app/crm/features/contacts/pages/contacts.page.ts", lineNumber: 74 }); })();
