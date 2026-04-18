import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { TimeZoneService } from '../../../../core/services/time-zone.service';
import { getTimeZoneFlagUrl } from '../../../../core/models/time-zone.model';
import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/accordion";
import * as i4 from "primeng/api";
import * as i5 from "primeng/button";
import * as i6 from "primeng/inputtext";
import * as i7 from "primeng/inputgroup";
import * as i8 from "primeng/inputgroupaddon";
import * as i9 from "primeng/multiselect";
import * as i10 from "primeng/select";
import * as i11 from "primeng/tag";
import * as i12 from "primeng/table";
import * as i13 from "primeng/toggleswitch";
const _c0 = () => ({ standalone: true });
const _c1 = () => [10, 25, 50];
const _c2 = () => ({ "min-width": "100%" });
const _c3 = a0 => ({ "module-group-start": a0 });
const _c4 = () => [0, 1, 2, 3];
function UserEditPage_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 15);
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r1.avatarPreviewUrl() || ((tmp_2_0 = ctx_r1.user()) == null ? null : tmp_2_0.profilePictureUrl), i0.ɵɵsanitizeUrl);
} }
function UserEditPage_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 16);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(((tmp_2_0 = ctx_r1.user()) == null ? null : tmp_2_0.fullName == null ? null : (tmp_2_0 = tmp_2_0.fullName.charAt(0)) == null ? null : tmp_2_0.toUpperCase()) || "?");
} }
function UserEditPage_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 18);
} }
function UserEditPage_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 19);
} }
function UserEditPage_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 28);
    i0.ɵɵlistener("click", function UserEditPage_Conditional_25_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onRemoveAvatar()); });
    i0.ɵɵelement(1, "i", 29);
    i0.ɵɵelementEnd();
} }
function UserEditPage_article_33_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100);
    i0.ɵɵelement(1, "img", 101);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.getFlagUrl(option_r5 == null ? null : option_r5.flagCode), i0.ɵɵsanitizeUrl)("alt", (option_r5 == null ? null : option_r5.flagCode) ? option_r5.flagCode.toUpperCase() + " flag" : "Flag");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r5.label);
} }
function UserEditPage_article_33_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100);
    i0.ɵɵelement(1, "img", 101);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.getFlagUrl(option_r6 == null ? null : option_r6.flagCode), i0.ɵɵsanitizeUrl)("alt", (option_r6 == null ? null : option_r6.flagCode) ? option_r6.flagCode.toUpperCase() + " flag" : "Flag");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r6 == null ? null : option_r6.label);
} }
function UserEditPage_article_33_small_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1, "Share once, then require reset on first login.");
    i0.ɵɵelementEnd();
} }
function UserEditPage_article_33_div_86_li_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const warning_r7 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(warning_r7);
} }
function UserEditPage_article_33_div_86_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 102)(1, "div", 103);
    i0.ɵɵelement(2, "i", 104);
    i0.ɵɵtext(3, " Potential access conflicts ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "ul");
    i0.ɵɵtemplate(5, UserEditPage_article_33_div_86_li_5_Template, 2, 1, "li", 105);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r1.permissionConflictWarnings());
} }
function UserEditPage_article_33_ng_container_87_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 124);
    i0.ɵɵtext(2, "Module");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th", 125);
    i0.ɵɵtext(4, "Permission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th", 126);
    i0.ɵɵtext(6, "Risk");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 126);
    i0.ɵɵtext(8, "Change");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 124);
    i0.ɵɵtext(10, "Source Roles");
    i0.ɵɵelementEnd()();
} }
function UserEditPage_article_33_ng_container_87_ng_template_28_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td")(1, "span", 132);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    const row_r10 = ctx_r8.$implicit;
    const rowspan_r11 = ctx_r8.rowspan;
    i0.ɵɵattribute("rowspan", rowspan_r11);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r10.module);
} }
function UserEditPage_article_33_ng_container_87_ng_template_28_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 133);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const source_r12 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(source_r12);
} }
function UserEditPage_article_33_ng_container_87_ng_template_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 127);
    i0.ɵɵtemplate(1, UserEditPage_article_33_ng_container_87_ng_template_28_td_1_Template, 3, 2, "td", 67);
    i0.ɵɵelementStart(2, "td")(3, "span", 128);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "td")(6, "span", 129);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td")(9, "span", 130);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td")(12, "div", 131);
    i0.ɵɵtemplate(13, UserEditPage_article_33_ng_container_87_ng_template_28_span_13_Template, 2, 1, "span", 90);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r10 = ctx.$implicit;
    const rowgroup_r13 = ctx.rowgroup;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c3, rowgroup_r13));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", rowgroup_r13);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r10.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", "risk-chip--" + row_r10.risk);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.formatRiskLabel(row_r10.risk));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", "change-chip--" + row_r10.changeType);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.formatChangeLabel(row_r10.changeType), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", row_r10.sources);
} }
function UserEditPage_article_33_ng_container_87_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 106)(2, "div", 39)(3, "label", 107);
    i0.ɵɵtext(4, "Perspective");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p-select", 108);
    i0.ɵɵlistener("ngModelChange", function UserEditPage_article_33_ng_container_87_Template_p_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.permissionPerspective.set($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 39)(7, "label", 109);
    i0.ɵɵtext(8, "Module");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p-select", 110);
    i0.ɵɵlistener("ngModelChange", function UserEditPage_article_33_ng_container_87_Template_p_select_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.permissionModuleFilter.set($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 39)(11, "label", 111);
    i0.ɵɵtext(12, "Risk");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p-select", 112);
    i0.ɵɵlistener("ngModelChange", function UserEditPage_article_33_ng_container_87_Template_p_select_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.permissionRiskFilter.set($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 39)(15, "label", 113);
    i0.ɵɵtext(16, "Change");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "p-select", 114);
    i0.ɵɵlistener("ngModelChange", function UserEditPage_article_33_ng_container_87_Template_p_select_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.permissionChangeFilter.set($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 115)(19, "label", 116);
    i0.ɵɵtext(20, "Search");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p-inputgroup")(22, "p-inputgroup-addon", 117);
    i0.ɵɵelement(23, "i", 118);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "input", 119);
    i0.ɵɵlistener("ngModelChange", function UserEditPage_article_33_ng_container_87_Template_input_ngModelChange_24_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.permissionSearch.set($event ?? "")); });
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(25, "div", 120)(26, "p-table", 121);
    i0.ɵɵtemplate(27, UserEditPage_article_33_ng_container_87_ng_template_27_Template, 11, 0, "ng-template", 122)(28, UserEditPage_article_33_ng_container_87_ng_template_28_Template, 14, 10, "ng-template", 123);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("options", ctx_r1.permissionPerspectiveOptions)("ngModel", ctx_r1.permissionPerspective())("ngModelOptions", i0.ɵɵpureFunction0(20, _c0));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r1.permissionModuleOptions())("ngModel", ctx_r1.permissionModuleFilter())("ngModelOptions", i0.ɵɵpureFunction0(21, _c0));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r1.permissionRiskOptions)("ngModel", ctx_r1.permissionRiskFilter())("ngModelOptions", i0.ɵɵpureFunction0(22, _c0));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r1.permissionChangeOptions)("ngModel", ctx_r1.permissionChangeFilter())("ngModelOptions", i0.ɵɵpureFunction0(23, _c0));
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngModel", ctx_r1.permissionSearch())("ngModelOptions", i0.ɵɵpureFunction0(24, _c0));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r1.permissionTableRows())("paginator", true)("rows", 10)("rowsPerPageOptions", i0.ɵɵpureFunction0(25, _c1))("sortOrder", 1)("tableStyle", i0.ɵɵpureFunction0(26, _c2));
} }
function UserEditPage_article_33_ng_template_88_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 134);
    i0.ɵɵtext(1, "No matching permissions. Change filters or assign at least one role.");
    i0.ɵɵelementEnd();
} }
function UserEditPage_article_33_span_115_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 133);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r14 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(level_r14);
} }
function UserEditPage_article_33_span_116_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 135);
    i0.ɵɵtext(1, "None");
    i0.ɵɵelementEnd();
} }
function UserEditPage_article_33_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 30)(1, "h3", 31);
    i0.ɵɵelement(2, "i", 32);
    i0.ɵɵtext(3, " Access Controls ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 33)(5, "span", 34);
    i0.ɵɵelement(6, "i", 35);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 34);
    i0.ɵɵelement(9, "i", 36);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 34);
    i0.ɵɵelement(12, "i", 32);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "form", 37);
    i0.ɵɵlistener("ngSubmit", function UserEditPage_article_33_Template_form_ngSubmit_14_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onSave()); });
    i0.ɵɵelementStart(15, "div", 38)(16, "div", 39)(17, "label", 40);
    i0.ɵɵtext(18, "Full name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p-inputgroup")(20, "p-inputgroup-addon", 41);
    i0.ɵɵelement(21, "i", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(22, "input", 42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 39)(24, "label", 43);
    i0.ɵɵtext(25, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "p-inputgroup")(27, "p-inputgroup-addon", 44);
    i0.ɵɵelement(28, "i", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(29, "input", 46);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 39)(31, "label", 47);
    i0.ɵɵtext(32, "Time zone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "p-select", 48);
    i0.ɵɵtemplate(34, UserEditPage_article_33_ng_template_34_Template, 4, 3, "ng-template", 49)(35, UserEditPage_article_33_ng_template_35_Template, 4, 3, "ng-template", 50);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "div", 39)(37, "label", 51);
    i0.ɵɵtext(38, "Locale");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(39, "p-select", 52);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 39)(41, "label", 53);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "p-inputgroup")(44, "p-inputgroup-addon", 54);
    i0.ɵɵelement(45, "i", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(46, "input", 56);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "div", 57)(48, "label", 58);
    i0.ɵɵtext(49, "Roles");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(50, "p-multiSelect", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "div", 57)(52, "label", 60);
    i0.ɵɵtext(53, "Temporary password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(54, "div", 61)(55, "p-inputgroup")(56, "p-inputgroup-addon", 62);
    i0.ɵɵelement(57, "i", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(58, "input", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "button", 65);
    i0.ɵɵlistener("click", function UserEditPage_article_33_Template_button_click_59_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.generatePassword()); });
    i0.ɵɵelement(60, "i", 66);
    i0.ɵɵtext(61, " Generate ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(62, UserEditPage_article_33_small_62_Template, 2, 0, "small", 67);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(63, "div", 68)(64, "div", 69);
    i0.ɵɵelement(65, "i", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "div", 71)(67, "span", 72);
    i0.ɵɵtext(68, "Account Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(69, "strong", 73);
    i0.ɵɵtext(70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "span", 74);
    i0.ɵɵtext(72);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(73, "div", 75);
    i0.ɵɵelement(74, "p-toggleSwitch", 76);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(75, "p-accordion", 77)(76, "p-accordion-panel", 78)(77, "p-accordion-header")(78, "div", 79);
    i0.ɵɵelement(79, "i", 36);
    i0.ɵɵelementStart(80, "span");
    i0.ɵɵtext(81, "Permissions");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(82, "p-tag", 80);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(83, "p-accordion-content")(84, "p", 81);
    i0.ɵɵtext(85, "Effective permissions are derived from selected roles. Manage individual permissions in Role Management.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(86, UserEditPage_article_33_div_86_Template, 6, 1, "div", 82)(87, UserEditPage_article_33_ng_container_87_Template, 29, 27, "ng-container", 83)(88, UserEditPage_article_33_ng_template_88_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(90, "p-accordion-panel", 84)(91, "p-accordion-header")(92, "div", 79);
    i0.ɵɵelement(93, "i", 32);
    i0.ɵɵelementStart(94, "span");
    i0.ɵɵtext(95, "Security Levels");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(96, "p-tag", 85);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(97, "p-accordion-content")(98, "p", 81);
    i0.ɵɵtext(99, "Security level is role-derived. Highest hierarchy role is used as the effective level when multiple roles are assigned.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(100, "div", 86)(101, "div", 87)(102, "span", 88);
    i0.ɵɵtext(103, "Effective level");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(104, "strong");
    i0.ɵɵtext(105);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(106, "div", 87)(107, "span", 88);
    i0.ɵɵtext(108, "Driving role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(109, "strong");
    i0.ɵɵtext(110);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(111, "div", 87)(112, "span", 88);
    i0.ɵɵtext(113, "All matched levels");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(114, "div", 89);
    i0.ɵɵtemplate(115, UserEditPage_article_33_span_115_Template, 2, 1, "span", 90)(116, UserEditPage_article_33_span_116_Template, 2, 0, "span", 91);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(117, "p-accordion-panel", 92)(118, "p-accordion-header")(119, "div", 79);
    i0.ɵɵelement(120, "i", 93);
    i0.ɵɵelementStart(121, "span");
    i0.ɵɵtext(122, "Dashboard Packs");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(123, "p-tag", 94);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(124, "p-accordion-content")(125, "div", 39)(126, "label", 95);
    i0.ɵɵtext(127, "Assigned pack");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(128, "p-select", 96);
    i0.ɵɵlistener("ngModelChange", function UserEditPage_article_33_Template_p_select_ngModelChange_128_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectedDashboardPackKey.set($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(129, "small");
    i0.ɵɵtext(130, "Role default is preselected unless a custom pack is set.");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(131, "div", 97);
    i0.ɵɵelement(132, "button", 98)(133, "button", 99);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const noPermissions_r15 = i0.ɵɵreference(89);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate2(" ", ctx_r1.selectedRoleCount(), " role", ctx_r1.selectedRoleCount() === 1 ? "" : "s", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.effectivePermissionCount(), " permissions ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Security: ", ctx_r1.effectiveSecurityLevel().name, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("options", ctx_r1.timezoneOptions)("filter", true);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("options", ctx_r1.localeOptions);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Monthly quota (", ctx_r1.currencyCode() || "N/A", ")");
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("options", ctx_r1.rolesAsOptions());
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("disabled", !ctx_r1.canManageAdmin());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.generatedPassword());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("status-control-card--active", ctx_r1.form.value.isActive)("status-control-card--inactive", !ctx_r1.form.value.isActive);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("status-control-icon--active", ctx_r1.form.value.isActive);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("pi-check-circle", ctx_r1.form.value.isActive)("pi-ban", !ctx_r1.form.value.isActive);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.form.value.isActive ? "Active" : "Inactive");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.form.value.isActive ? "User can access the system" : "User access is disabled");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", ctx_r1.accessAccordionValue())("multiple", true);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("value", ctx_r1.effectivePermissionCount() + " effective");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.permissionConflictWarnings().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.permissionTableRows().length)("ngIfElse", noPermissions_r15);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("value", ctx_r1.effectiveSecurityLevel().name);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r1.effectiveSecurityLevel().name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.effectiveSecurityLevel().roleName || "Not available");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r1.effectiveSecurityLevel().sources);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.effectiveSecurityLevel().sources.length);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("value", ctx_r1.selectedDashboardPackKey() || "Role default");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("options", ctx_r1.dashboardPackOptions())("ngModel", ctx_r1.selectedDashboardPackKey())("ngModelOptions", i0.ɵɵpureFunction0(41, _c0))("disabled", !ctx_r1.canManageAdmin() || ctx_r1.loadingDashboardPackOptions() || ctx_r1.updatingDashboardPack());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || !ctx_r1.canManageAdmin() || !ctx_r1.hasPendingChanges());
} }
function UserEditPage_ng_template_34_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 138);
} }
function UserEditPage_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 136);
    i0.ɵɵtemplate(1, UserEditPage_ng_template_34_div_1_Template, 1, 0, "div", 137);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c4));
} }
export class UserEditPage {
    dataService = inject(UserAdminDataService);
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    router = inject(Router);
    toastService = inject(AppToastService);
    timeZoneService = inject(TimeZoneService);
    settingsService = inject(WorkspaceSettingsService);
    referenceData = inject(ReferenceDataService);
    user = signal(null, ...(ngDevMode ? [{ debugName: "user" }] : []));
    roles = signal([], ...(ngDevMode ? [{ debugName: "roles" }] : []));
    roleDefaultDashboardPacks = signal([], ...(ngDevMode ? [{ debugName: "roleDefaultDashboardPacks" }] : []));
    customDashboardPacks = signal([], ...(ngDevMode ? [{ debugName: "customDashboardPacks" }] : []));
    selectedDashboardPackKey = signal(null, ...(ngDevMode ? [{ debugName: "selectedDashboardPackKey" }] : []));
    permissionPerspective = signal('draft', ...(ngDevMode ? [{ debugName: "permissionPerspective" }] : []));
    permissionSearch = signal('', ...(ngDevMode ? [{ debugName: "permissionSearch" }] : []));
    permissionModuleFilter = signal('all', ...(ngDevMode ? [{ debugName: "permissionModuleFilter" }] : []));
    permissionRiskFilter = signal('all', ...(ngDevMode ? [{ debugName: "permissionRiskFilter" }] : []));
    permissionChangeFilter = signal('all', ...(ngDevMode ? [{ debugName: "permissionChangeFilter" }] : []));
    loadingDashboardPackOptions = signal(true, ...(ngDevMode ? [{ debugName: "loadingDashboardPackOptions" }] : []));
    updatingDashboardPack = signal(false, ...(ngDevMode ? [{ debugName: "updatingDashboardPack" }] : []));
    accessAccordionValue = signal(['permissions', 'security', 'dashboard'], ...(ngDevMode ? [{ debugName: "accessAccordionValue" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    uploadingAvatar = signal(false, ...(ngDevMode ? [{ debugName: "uploadingAvatar" }] : []));
    avatarPreviewUrl = signal(null, ...(ngDevMode ? [{ debugName: "avatarPreviewUrl" }] : []));
    generatedPassword = signal(null, ...(ngDevMode ? [{ debugName: "generatedPassword" }] : []));
    initialFormState = signal(null, ...(ngDevMode ? [{ debugName: "initialFormState" }] : []));
    initialDashboardPackKey = signal(null, ...(ngDevMode ? [{ debugName: "initialDashboardPackKey" }] : []));
    formVersion = signal(0, ...(ngDevMode ? [{ debugName: "formVersion" }] : []));
    destroyRef = inject(DestroyRef);
    currencyCode = signal('', ...(ngDevMode ? [{ debugName: "currencyCode" }] : []));
    currencyFallback = '';
    canManageAdmin = signal(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage), ...(ngDevMode ? [{ debugName: "canManageAdmin" }] : []));
    hasPendingChanges = computed(() => {
        const initial = this.initialFormState();
        if (!initial) {
            return false;
        }
        // Read formVersion to re-evaluate when reactive form changes
        this.formVersion();
        const current = this.serializeFormState();
        const packChanged = (this.selectedDashboardPackKey() ?? null) !== (this.initialDashboardPackKey() ?? null);
        return current !== initial || packChanged;
    }, ...(ngDevMode ? [{ debugName: "hasPendingChanges" }] : []));
    selectedRoleRecords = computed(() => {
        const selectedIds = new Set(this.form.controls.roleIds.value ?? []);
        return this.roles().filter((role) => selectedIds.has(role.id));
    }, ...(ngDevMode ? [{ debugName: "selectedRoleRecords" }] : []));
    selectedRoleCount = computed(() => this.selectedRoleRecords().length, ...(ngDevMode ? [{ debugName: "selectedRoleCount" }] : []));
    effectivePermissionGroups = computed(() => {
        const permissionSources = new Map();
        for (const role of this.selectedRoleRecords()) {
            const roleName = role.name || 'Unnamed role';
            const allPermissions = new Set([
                ...(role.permissions ?? []),
                ...(role.inheritedPermissions ?? []),
                ...(role.basePermissions ?? [])
            ]);
            for (const permission of allPermissions) {
                if (!permission) {
                    continue;
                }
                if (!permissionSources.has(permission)) {
                    permissionSources.set(permission, new Set());
                }
                permissionSources.get(permission)?.add(roleName);
            }
        }
        const grouped = new Map();
        for (const [permission, sources] of permissionSources.entries()) {
            const module = this.resolvePermissionModule(permission);
            if (!grouped.has(module)) {
                grouped.set(module, []);
            }
            grouped.get(module)?.push({
                key: permission,
                sources: [...sources].sort((a, b) => a.localeCompare(b))
            });
        }
        return [...grouped.entries()]
            .map(([module, items]) => ({
            module,
            count: items.length,
            items: items.sort((a, b) => a.key.localeCompare(b.key))
        }))
            .sort((a, b) => a.module.localeCompare(b.module));
    }, ...(ngDevMode ? [{ debugName: "effectivePermissionGroups" }] : []));
    effectivePermissionCount = computed(() => this.effectivePermissionGroups().reduce((total, group) => total + group.count, 0), ...(ngDevMode ? [{ debugName: "effectivePermissionCount" }] : []));
    effectivePermissionRows = computed(() => this.effectivePermissionGroups().flatMap((group) => group.items.map((item) => ({
        module: group.module,
        key: item.key,
        label: this.formatPermissionLabel(item.key),
        risk: this.resolvePermissionRisk(item.key),
        sources: item.sources
    }))), ...(ngDevMode ? [{ debugName: "effectivePermissionRows" }] : []));
    currentPermissionRows = computed(() => {
        const roleIds = this.user()?.roleIds ?? [];
        const selectedIds = new Set(roleIds);
        const selectedRoles = this.roles().filter((role) => selectedIds.has(role.id));
        const permissionSources = new Map();
        for (const role of selectedRoles) {
            const roleName = role.name || 'Unnamed role';
            const allPermissions = new Set([
                ...(role.permissions ?? []),
                ...(role.inheritedPermissions ?? []),
                ...(role.basePermissions ?? [])
            ]);
            for (const permission of allPermissions) {
                if (!permission) {
                    continue;
                }
                if (!permissionSources.has(permission)) {
                    permissionSources.set(permission, new Set());
                }
                permissionSources.get(permission)?.add(roleName);
            }
        }
        return [...permissionSources.entries()]
            .map(([key, sources]) => ({
            module: this.resolvePermissionModule(key),
            key,
            label: this.formatPermissionLabel(key),
            risk: this.resolvePermissionRisk(key),
            sources: [...sources].sort((a, b) => a.localeCompare(b))
        }))
            .sort((a, b) => (a.module === b.module ? a.label.localeCompare(b.label) : a.module.localeCompare(b.module)));
    }, ...(ngDevMode ? [{ debugName: "currentPermissionRows" }] : []));
    permissionModuleOptions = computed(() => {
        const modules = new Set([
            ...this.effectivePermissionRows().map((row) => row.module),
            ...this.currentPermissionRows().map((row) => row.module)
        ]);
        return [
            { label: 'All modules', value: 'all' },
            ...[...modules].sort((a, b) => a.localeCompare(b)).map((module) => ({ label: module, value: module }))
        ];
    }, ...(ngDevMode ? [{ debugName: "permissionModuleOptions" }] : []));
    permissionPerspectiveOptions = [
        { label: 'After Save', value: 'draft' },
        { label: 'Current', value: 'current' }
    ];
    permissionRiskOptions = [
        { label: 'All risks', value: 'all' },
        { label: 'Critical', value: 'critical' },
        { label: 'Sensitive', value: 'sensitive' },
        { label: 'Standard', value: 'standard' }
    ];
    permissionChangeOptions = [
        { label: 'All changes', value: 'all' },
        { label: 'Added', value: 'added' },
        { label: 'Removed', value: 'removed' },
        { label: 'Unchanged', value: 'unchanged' }
    ];
    permissionTableRows = computed(() => {
        const baseline = new Map(this.currentPermissionRows().map((row) => [row.key, row]));
        const draft = new Map(this.effectivePermissionRows().map((row) => [row.key, row]));
        const perspective = this.permissionPerspective();
        const rows = [];
        if (perspective === 'current') {
            for (const [key, row] of baseline.entries()) {
                rows.push({
                    ...row,
                    changeType: draft.has(key) ? 'unchanged' : 'removed'
                });
            }
        }
        else {
            for (const [key, row] of draft.entries()) {
                rows.push({
                    ...row,
                    changeType: baseline.has(key) ? 'unchanged' : 'added'
                });
            }
            for (const [key, row] of baseline.entries()) {
                if (!draft.has(key)) {
                    rows.push({
                        ...row,
                        changeType: 'removed'
                    });
                }
            }
        }
        const moduleFilter = this.permissionModuleFilter();
        const riskFilter = this.permissionRiskFilter();
        const changeFilter = this.permissionChangeFilter();
        const search = this.permissionSearch().trim().toLowerCase();
        return rows
            .filter((row) => moduleFilter === 'all' || row.module === moduleFilter)
            .filter((row) => riskFilter === 'all' || row.risk === riskFilter)
            .filter((row) => changeFilter === 'all' || row.changeType === changeFilter)
            .filter((row) => {
            if (!search) {
                return true;
            }
            return (row.module.toLowerCase().includes(search)
                || row.label.toLowerCase().includes(search)
                || row.sources.some((source) => source.toLowerCase().includes(search)));
        })
            .sort((a, b) => (a.module === b.module ? a.label.localeCompare(b.label) : a.module.localeCompare(b.module)));
    }, ...(ngDevMode ? [{ debugName: "permissionTableRows" }] : []));
    permissionConflictWarnings = computed(() => {
        const byModule = new Map();
        for (const row of this.effectivePermissionRows()) {
            const parts = row.key.split('.');
            const action = (parts[parts.length - 1] ?? '').toLowerCase();
            if (!byModule.has(row.module)) {
                byModule.set(row.module, new Set());
            }
            byModule.get(row.module)?.add(action);
        }
        const warnings = [];
        for (const [module, actions] of byModule.entries()) {
            const hasRead = actions.has('view') || actions.has('read') || actions.has('list');
            const hasElevated = actions.has('manage') || actions.has('admin') || actions.has('delete');
            if (hasElevated && !hasRead) {
                warnings.push(`${module}: elevated access exists without View permission.`);
            }
            if (actions.has('admin') && !actions.has('manage')) {
                warnings.push(`${module}: Admin granted without explicit Manage permission.`);
            }
        }
        return warnings;
    }, ...(ngDevMode ? [{ debugName: "permissionConflictWarnings" }] : []));
    effectiveSecurityLevel = computed(() => {
        const ranked = this.selectedRoleRecords()
            .filter((role) => !!role.securityLevelName)
            .sort((a, b) => (b.hierarchyLevel ?? 0) - (a.hierarchyLevel ?? 0));
        const effective = ranked[0] ?? null;
        return {
            name: effective?.securityLevelName ?? 'Not set',
            roleName: effective?.name ?? null,
            sources: [...new Set(ranked.map((role) => role.securityLevelName).filter(Boolean))]
        };
    }, ...(ngDevMode ? [{ debugName: "effectiveSecurityLevel" }] : []));
    // Shared time zone catalog keeps labels and flags consistent across settings screens.
    timezoneOptions = [];
    getFlagUrl = getTimeZoneFlagUrl;
    localeOptions = [
        { label: 'English (US)', value: 'en-US' },
        { label: 'English (UK)', value: 'en-GB' },
        { label: 'English (India)', value: 'en-IN' },
        { label: 'French', value: 'fr-FR' },
        { label: 'Spanish', value: 'es-ES' }
    ];
    form = this.fb.nonNullable.group({
        fullName: ['', [Validators.required, Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        timeZone: ['UTC', Validators.required],
        locale: ['en-US', Validators.required],
        roleIds: [[]],
        monthlyQuota: [null, [Validators.min(0)]],
        isActive: [true],
        temporaryPassword: ['']
    });
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigate(['/app/settings/users']);
            return;
        }
        this.timeZoneService.getTimeZones().subscribe((options) => {
            this.timezoneOptions = options;
        });
        this.loadDashboardPackOptions();
        this.loadCurrencyContext();
        this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.formVersion.update((v) => v + 1);
        });
        this.form.controls.roleIds.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            const currentKey = this.selectedDashboardPackKey();
            if (!currentKey || currentKey.startsWith('role-default:')) {
                const newLevel = this.resolveCurrentRoleLevel();
                this.selectedDashboardPackKey.set(`role-default:${newLevel}`);
            }
        });
        this.loading.set(true);
        this.dataService.getRoles().subscribe({
            next: (roles) => {
                this.roles.set(roles);
                this.initializeDashboardPackSelection();
            },
            error: () => this.roles.set([])
        });
        this.dataService.getUser(id).subscribe({
            next: (detail) => {
                this.user.set(detail);
                this.form.patchValue({
                    fullName: detail.fullName,
                    email: detail.email,
                    timeZone: detail.timeZone ?? 'UTC',
                    locale: detail.locale ?? 'en-US',
                    roleIds: detail.roleIds,
                    monthlyQuota: detail.monthlyQuota ?? null,
                    isActive: detail.isActive,
                    temporaryPassword: ''
                });
                this.initializeDashboardPackSelection();
                this.captureInitialState();
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.router.navigate(['/app/settings/users']);
            }
        });
    }
    rolesAsOptions() {
        return this.roles().map((role) => ({ label: role.name, value: role.id, description: role.description }));
    }
    dashboardPackOptions() {
        const roleLevel = this.resolveCurrentRoleLevel();
        const roleDefault = this.roleDefaultDashboardPacks().find((option) => option.roleLevel === roleLevel)
            ?? {
                key: `role-default:${roleLevel}`,
                name: `H${roleLevel} Pack`,
                type: 'role-default',
                roleLevel,
                templateId: null
            };
        const options = [roleDefault, ...this.customDashboardPacks()];
        return options.map((option) => ({
            label: option.name,
            value: option.key
        }));
    }
    formatPermissionLabel(permission) {
        const parts = permission.split('.');
        return parts.length <= 2 ? permission : parts.slice(2).join(' ');
    }
    formatRiskLabel(risk) {
        if (risk === 'critical') {
            return 'Critical';
        }
        if (risk === 'sensitive') {
            return 'Sensitive';
        }
        return 'Standard';
    }
    formatChangeLabel(changeType) {
        if (changeType === 'added') {
            return 'Added';
        }
        if (changeType === 'removed') {
            return 'Removed';
        }
        return 'Unchanged';
    }
    generatePassword() {
        const value = this.generatePasswordValue();
        this.form.patchValue({ temporaryPassword: value });
        this.generatedPassword.set(value);
    }
    onSave() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const payload = {
            fullName: this.form.value.fullName?.trim() ?? '',
            email: this.form.value.email?.trim().toLowerCase() ?? '',
            userAudience: this.user()?.userAudience ?? 'Internal',
            timeZone: this.form.value.timeZone,
            locale: this.form.value.locale,
            monthlyQuota: this.form.value.monthlyQuota ?? null,
            isActive: !!this.form.value.isActive,
            roleIds: (this.form.value.roleIds ?? []),
            temporaryPassword: this.form.value.temporaryPassword?.trim() || undefined
        };
        if (payload.roleIds.length === 0) {
            this.form.get('roleIds')?.setErrors({ required: true });
            return;
        }
        const selected = this.user();
        if (!selected) {
            return;
        }
        this.saving.set(true);
        this.dataService.update(selected.id, payload).subscribe({
            next: () => {
                const packRequest = this.resolveDashboardPackRequest(this.selectedDashboardPackKey(), payload.roleIds ?? []);
                if (!packRequest) {
                    this.finalizeSave(selected.id, payload, 'User updated');
                    return;
                }
                this.updatingDashboardPack.set(true);
                this.dataService.updateDashboardPack(selected.id, packRequest).subscribe({
                    next: () => {
                        this.updatingDashboardPack.set(false);
                        this.finalizeSave(selected.id, payload, 'User and dashboard pack updated');
                    },
                    error: (error) => {
                        this.saving.set(false);
                        this.updatingDashboardPack.set(false);
                        this.raiseToast('error', this.extractErrorMessage(error) || 'User updated, but dashboard pack update failed');
                    }
                });
            },
            error: (error) => {
                this.saving.set(false);
                this.raiseToast('error', this.extractErrorMessage(error) || 'Unable to update user');
            }
        });
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
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
    loadDashboardPackOptions() {
        this.loadingDashboardPackOptions.set(true);
        this.dataService.getDashboardPackOptions().subscribe({
            next: (response) => {
                this.roleDefaultDashboardPacks.set(response.roleDefaults ?? []);
                this.customDashboardPacks.set(response.customPacks ?? []);
                this.loadingDashboardPackOptions.set(false);
                this.initializeDashboardPackSelection();
            },
            error: () => {
                this.roleDefaultDashboardPacks.set([]);
                this.customDashboardPacks.set([]);
                this.loadingDashboardPackOptions.set(false);
            }
        });
    }
    initializeDashboardPackSelection() {
        const detail = this.user();
        if (!detail) {
            return;
        }
        const roleLevel = this.resolveCurrentRoleLevel(detail.roleIds);
        const roleDefaultKey = `role-default:${roleLevel}`;
        const storedKey = detail.dashboardPackKey ?? null;
        const options = this.dashboardPackOptions().map((option) => option.value);
        const selected = storedKey && options.includes(storedKey) ? storedKey : roleDefaultKey;
        this.selectedDashboardPackKey.set(selected);
    }
    captureInitialState() {
        this.initialFormState.set(this.serializeFormState());
        this.initialDashboardPackKey.set(this.selectedDashboardPackKey() ?? null);
        this.form.markAsPristine();
        this.form.markAsUntouched();
        this.generatedPassword.set(null);
    }
    serializeFormState() {
        const value = this.form.getRawValue();
        const normalizedRoleIds = [...(value.roleIds ?? [])].sort();
        return JSON.stringify({
            fullName: value.fullName?.trim() ?? '',
            email: value.email?.trim().toLowerCase() ?? '',
            timeZone: value.timeZone ?? 'UTC',
            locale: value.locale ?? 'en-US',
            monthlyQuota: value.monthlyQuota ?? null,
            isActive: !!value.isActive,
            roleIds: normalizedRoleIds,
            temporaryPassword: value.temporaryPassword?.trim() ?? ''
        });
    }
    resolveCurrentRoleLevel(roleIds) {
        const selectedRoleIds = roleIds ?? (this.form.value.roleIds ?? []);
        const levelByRoleId = new Map(this.roles().map((role) => [role.id, Math.max(1, role.hierarchyLevel ?? 1)]));
        const levels = selectedRoleIds
            .map((roleId) => levelByRoleId.get(roleId))
            .filter((level) => typeof level === 'number');
        return levels.length ? Math.max(...levels) : 1;
    }
    resolveDashboardPackRequest(selectedKey, roleIds) {
        const fallbackRoleLevel = this.resolveCurrentRoleLevel(roleIds);
        if (!selectedKey || selectedKey.startsWith('role-default:')) {
            const levelPart = selectedKey?.replace('role-default:', '').trim() ?? '';
            const parsed = Number(levelPart);
            const roleLevel = Number.isFinite(parsed) && parsed > 0 ? parsed : fallbackRoleLevel;
            return {
                sourceType: 'role-default',
                roleLevel,
                templateId: null
            };
        }
        if (selectedKey.startsWith('custom:')) {
            const templateId = selectedKey.replace('custom:', '').trim();
            if (!templateId) {
                return null;
            }
            return {
                sourceType: 'custom',
                roleLevel: null,
                templateId
            };
        }
        return null;
    }
    resolvePermissionModule(permission) {
        const parts = permission.split('.');
        return parts.length >= 2 ? parts[1] ?? 'General' : 'General';
    }
    finalizeSave(userId, payload, successMessage) {
        this.dataService.getUser(userId).subscribe({
            next: (latest) => {
                this.saving.set(false);
                this.user.set(latest);
                this.form.patchValue({
                    fullName: latest.fullName,
                    email: latest.email,
                    timeZone: latest.timeZone ?? 'UTC',
                    locale: latest.locale ?? 'en-US',
                    roleIds: latest.roleIds,
                    monthlyQuota: latest.monthlyQuota ?? null,
                    isActive: latest.isActive,
                    temporaryPassword: ''
                });
                this.initializeDashboardPackSelection();
                this.captureInitialState();
                const payloadRoles = [...(payload.roleIds ?? [])].sort();
                const latestRoles = [...(latest.roleIds ?? [])].sort();
                const rolesMatch = JSON.stringify(payloadRoles) === JSON.stringify(latestRoles);
                if (!rolesMatch) {
                    this.raiseToast('error', 'Save was acknowledged, but role changes were not applied.');
                    return;
                }
                this.raiseToast('success', successMessage);
            },
            error: () => {
                this.saving.set(false);
                this.raiseToast('error', 'Saved, but failed to refresh latest user details.');
            }
        });
    }
    extractErrorMessage(error) {
        if (!(error instanceof HttpErrorResponse)) {
            return null;
        }
        if (typeof error.error === 'string' && error.error.trim()) {
            return error.error.trim();
        }
        if (error.error && typeof error.error === 'object') {
            const message = error.error.message;
            if (typeof message === 'string' && message.trim()) {
                return message.trim();
            }
        }
        return null;
    }
    resolvePermissionRisk(permission) {
        const normalized = permission.toLowerCase();
        if (normalized.endsWith('.admin')
            || normalized.endsWith('.manage')
            || normalized.endsWith('.delete')
            || normalized.includes('.security.')
            || normalized.includes('.billing.')) {
            return 'critical';
        }
        if (normalized.endsWith('.approve')
            || normalized.endsWith('.export')
            || normalized.endsWith('.assign')
            || normalized.includes('.settings.')) {
            return 'sensitive';
        }
        return 'standard';
    }
    generatePasswordValue() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const upper = alphabet.toUpperCase();
        const digits = '0123456789';
        const symbols = '!@$?*#';
        const pool = alphabet + upper + digits + symbols;
        let value = '';
        for (let i = 0; i < 14; i++) {
            const index = Math.floor(Math.random() * pool.length);
            value += pool[index];
        }
        return value;
    }
    // ── Avatar ────────────────────────────────────────────────────
    onAvatarSelected(event) {
        const input = event.target;
        const file = input.files?.[0];
        if (!file)
            return;
        const userId = this.user()?.id;
        if (!userId)
            return;
        // Local preview
        const reader = new FileReader();
        reader.onload = () => this.avatarPreviewUrl.set(reader.result);
        reader.readAsDataURL(file);
        this.uploadingAvatar.set(true);
        this.dataService.uploadProfilePicture(userId, file)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (res) => {
                this.uploadingAvatar.set(false);
                this.avatarPreviewUrl.set(null);
                const current = this.user();
                if (current) {
                    this.user.set({ ...current, profilePictureUrl: res.url });
                }
                this.toastService.show('success', 'Profile picture updated');
            },
            error: () => {
                this.uploadingAvatar.set(false);
                this.avatarPreviewUrl.set(null);
                this.toastService.show('error', 'Failed to upload profile picture');
            }
        });
        // Reset input so the same file can be re-selected
        input.value = '';
    }
    onRemoveAvatar() {
        const userId = this.user()?.id;
        if (!userId)
            return;
        this.uploadingAvatar.set(true);
        this.dataService.deleteProfilePicture(userId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => {
                this.uploadingAvatar.set(false);
                const current = this.user();
                if (current) {
                    this.user.set({ ...current, profilePictureUrl: null });
                }
                this.toastService.show('success', 'Profile picture removed');
            },
            error: () => {
                this.uploadingAvatar.set(false);
                this.toastService.show('error', 'Failed to remove profile picture');
            }
        });
    }
    static ɵfac = function UserEditPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserEditPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserEditPage, selectors: [["app-user-edit-page"]], decls: 36, vars: 13, consts: [["loadingState", ""], ["noPermissions", ""], [1, "user-edit-page"], [1, "form-header"], [1, "header-content"], ["type", "button", "routerLink", "/app/settings/users", 1, "back-link"], [1, "pi", "pi-arrow-left"], [1, "header-row"], [1, "header-title"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "header-meta"], [1, "user-avatar-section"], [1, "user-avatar"], ["alt", "Profile picture", 1, "user-avatar__img", 3, "src"], [1, "user-avatar__initial"], ["for", "avatar-upload", 1, "user-avatar__overlay"], [1, "pi", "pi-spin", "pi-spinner"], [1, "pi", "pi-camera"], ["type", "file", "id", "avatar-upload", "accept", "image/jpeg,image/png,image/webp,image/gif", 1, "user-avatar__input", 3, "change", "disabled"], ["type", "button", "title", "Remove picture", 1, "user-avatar__remove"], [1, "header-meta__info"], [1, "meta-chip"], [1, "pi", "pi-user"], [1, "status-pill", 3, "ngClass"], [1, "form-body"], ["class", "form-card", 4, "ngIf", "ngIfElse"], ["type", "button", "title", "Remove picture", 1, "user-avatar__remove", 3, "click"], [1, "pi", "pi-times"], [1, "form-card"], [1, "section-title"], [1, "pi", "pi-shield"], [1, "access-summary"], [1, "access-summary__chip"], [1, "pi", "pi-users"], [1, "pi", "pi-lock"], [1, "form-layout", 3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "form-field"], ["for", "user-fullName"], [1, "icon-addon", "icon-addon--name"], ["pInputText", "", "id", "user-fullName", "formControlName", "fullName", "placeholder", "Jordan Patel"], ["for", "user-email"], [1, "icon-addon", "icon-addon--email"], [1, "pi", "pi-envelope"], ["pInputText", "", "id", "user-email", "formControlName", "email", "placeholder", "user@example.com"], ["for", "user-timeZone"], ["inputId", "user-timeZone", "formControlName", "timeZone", "optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", "filterBy", "label", "filterPlaceholder", "Search time zones", 3, "options", "filter"], ["pTemplate", "item"], ["pTemplate", "selectedItem"], ["for", "user-locale"], ["inputId", "user-locale", "formControlName", "locale", "optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", 3, "options"], ["for", "user-monthlyQuota"], [1, "icon-addon", "icon-addon--warning"], [1, "pi", "pi-dollar"], ["pInputText", "", "id", "user-monthlyQuota", "type", "number", "min", "0", "step", "0.01", "formControlName", "monthlyQuota", "placeholder", "e.g. 75000"], [1, "form-field", "full-row"], ["for", "user-roleIds"], ["inputId", "user-roleIds", "formControlName", "roleIds", "optionLabel", "label", "optionValue", "value", "display", "chip", "appendTo", "body", "defaultLabel", "Select roles", "styleClass", "w-full", 3, "options"], ["for", "user-temporaryPassword"], [1, "password-field"], [1, "icon-addon", "icon-addon--industry"], [1, "pi", "pi-key"], ["pInputText", "", "id", "user-temporaryPassword", "type", "text", "formControlName", "temporaryPassword", "placeholder", "Optional"], ["type", "button", 1, "btn-generate", 3, "click", "disabled"], [1, "pi", "pi-sync"], [4, "ngIf"], [1, "status-control-card"], [1, "status-control-icon"], [1, "pi"], [1, "status-control-content"], [1, "status-control-label"], [1, "status-control-value"], [1, "status-control-hint"], [1, "status-control-toggle"], ["formControlName", "isActive"], [1, "user-access-accordion", 3, "value", "multiple"], ["value", "permissions"], [1, "accordion-title"], ["severity", "info", 3, "value"], [1, "accordion-note"], ["class", "permission-conflict-banner", 4, "ngIf"], [4, "ngIf", "ngIfElse"], ["value", "security"], ["severity", "success", 3, "value"], [1, "security-card"], [1, "security-card__row"], [1, "label"], [1, "security-level-list"], ["class", "source-chip", 4, "ngFor", "ngForOf"], ["class", "source-chip muted", 4, "ngIf"], ["value", "dashboard"], [1, "pi", "pi-th-large"], ["severity", "warn", 3, "value"], ["for", "user-dashboardPack"], ["inputId", "user-dashboardPack", "optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "ngModelOptions", "disabled"], [1, "form-actions"], ["type", "button", "pButton", "", "label", "Cancel", "routerLink", "/app/settings/users", 1, "crm-button--ghost"], ["type", "submit", "pButton", "", "label", "Save changes", "icon", "pi pi-check", 1, "crm-button--primary", 3, "disabled"], [1, "timezone-option"], ["width", "18", "height", "12", "loading", "lazy", 1, "timezone-flag", 3, "src", "alt"], [1, "permission-conflict-banner"], [1, "permission-conflict-banner__title"], [1, "pi", "pi-exclamation-triangle"], [4, "ngFor", "ngForOf"], [1, "permission-controls"], ["for", "permissionsPerspective"], ["inputId", "permissionsPerspective", "optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["for", "permissionsModuleFilter"], ["inputId", "permissionsModuleFilter", "optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["for", "permissionsRiskFilter"], ["inputId", "permissionsRiskFilter", "optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["for", "permissionsChangeFilter"], ["inputId", "permissionsChangeFilter", "optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], [1, "form-field", "permission-search"], ["for", "permissionsSearch"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-search"], ["pInputText", "", "id", "permissionsSearch", "placeholder", "Module, permission, role", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "permissions-table-wrap"], ["rowGroupMode", "rowspan", "groupRowsBy", "module", "sortField", "module", "styleClass", "permissions-table", 3, "value", "paginator", "rows", "rowsPerPageOptions", "sortOrder", "tableStyle"], ["pTemplate", "header"], ["pTemplate", "body"], [2, "width", "24%"], [2, "width", "28%"], [2, "width", "12%"], [3, "ngClass"], [1, "permission-key"], [1, "risk-chip", 3, "ngClass"], [1, "change-chip", 3, "ngClass"], [1, "permission-item__sources"], [1, "module-cell"], [1, "source-chip"], [1, "empty-state"], [1, "source-chip", "muted"], [1, "user-edit__loading"], ["class", "loading-bar", 4, "ngFor", "ngForOf"], [1, "loading-bar"]], template: function UserEditPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "section", 2)(1, "div", 3)(2, "div", 4);
            i0.ɵɵelement(3, "app-breadcrumbs");
            i0.ɵɵelementStart(4, "button", 5);
            i0.ɵɵelement(5, "i", 6);
            i0.ɵɵtext(6, " Back to Users ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div", 7)(8, "div", 8)(9, "h1", 9)(10, "span", 10);
            i0.ɵɵtext(11, "Edit");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 11);
            i0.ɵɵtext(13, "User");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "p");
            i0.ɵɵtext(15, " Update access, roles, and preferences in a focused workspace. Changes are saved immediately for the selected teammate. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 12)(17, "div", 13)(18, "div", 14);
            i0.ɵɵconditionalCreate(19, UserEditPage_Conditional_19_Template, 1, 1, "img", 15)(20, UserEditPage_Conditional_20_Template, 2, 1, "span", 16);
            i0.ɵɵelementStart(21, "label", 17);
            i0.ɵɵconditionalCreate(22, UserEditPage_Conditional_22_Template, 1, 0, "i", 18)(23, UserEditPage_Conditional_23_Template, 1, 0, "i", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "input", 20);
            i0.ɵɵlistener("change", function UserEditPage_Template_input_change_24_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onAvatarSelected($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(25, UserEditPage_Conditional_25_Template, 2, 0, "button", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "div", 22)(27, "span", 23);
            i0.ɵɵelement(28, "i", 24);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "span", 25);
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(32, "div", 26);
            i0.ɵɵtemplate(33, UserEditPage_article_33_Template, 134, 42, "article", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(34, UserEditPage_ng_template_34_Template, 2, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            let tmp_1_0;
            let tmp_2_0;
            let tmp_6_0;
            let tmp_7_0;
            let tmp_8_0;
            let tmp_9_0;
            const loadingState_r16 = i0.ɵɵreference(35);
            i0.ɵɵadvance(18);
            i0.ɵɵclassProp("user-avatar--has-image", (tmp_1_0 = ctx.user()) == null ? null : tmp_1_0.profilePictureUrl);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.avatarPreviewUrl() || ((tmp_2_0 = ctx.user()) == null ? null : tmp_2_0.profilePictureUrl) ? 19 : 20);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("uploading", ctx.uploadingAvatar());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.uploadingAvatar() ? 22 : 23);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.uploadingAvatar());
            i0.ɵɵadvance();
            i0.ɵɵconditional(((tmp_6_0 = ctx.user()) == null ? null : tmp_6_0.profilePictureUrl) && !ctx.uploadingAvatar() ? 25 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", ((tmp_7_0 = ctx.user()) == null ? null : tmp_7_0.fullName) || "User profile", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", ((tmp_8_0 = ctx.user()) == null ? null : tmp_8_0.isActive) ? "status-pill--active" : "status-pill--inactive");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ((tmp_9_0 = ctx.user()) == null ? null : tmp_9_0.isActive) ? "Active" : "Inactive", " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.loading())("ngIfElse", loadingState_r16);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, FormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MinValidator, i2.NgModel, ReactiveFormsModule, i2.FormGroupDirective, i2.FormControlName, RouterLink,
            AccordionModule, i3.Accordion, i4.PrimeTemplate, i3.AccordionPanel, i3.AccordionHeader, i3.AccordionContent, ButtonModule, i5.ButtonDirective, InputTextModule, i6.InputText, InputGroupModule, i7.InputGroup, InputGroupAddonModule, i8.InputGroupAddon, MultiSelectModule, i9.MultiSelect, SelectModule, i10.Select, TagModule, i11.Tag, TableModule, i12.Table, ToggleSwitchModule, i13.ToggleSwitch, BreadcrumbsComponent], styles: ["@use '../../../../shared/form-page-styles' as form;\n\n[_nghost-%COMP%] {\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.user-edit-page[_ngcontent-%COMP%] {\n  @include form.form-page-base;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.form-header[_ngcontent-%COMP%] {\n  @include form.form-page-header;\n}\n\n.header-content[_ngcontent-%COMP%] {\n  @include form.form-header-content;\n}\n\n.back-link[_ngcontent-%COMP%] {\n  @include form.form-back-link;\n}\n\n.header-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n\n.header-title[_ngcontent-%COMP%] {\n  @include form.form-header-title;\n}\n\n.header-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n\n.header-meta__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   User[_ngcontent-%COMP%]   Avatar[_ngcontent-%COMP%]   Section[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.user-avatar-section[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n\n.user-avatar[_ngcontent-%COMP%] {\n  position: relative;\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  overflow: hidden;\n  cursor: pointer;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.3);\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: scale(1.05);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.45);\n  }\n\n  &__img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    display: block;\n  }\n\n  &__initial {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n    font-size: 1.5rem;\n    font-weight: 700;\n    color: #fff;\n    text-transform: uppercase;\n  }\n\n  &__overlay {\n    position: absolute;\n    inset: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(0, 0, 0, 0.45);\n    opacity: 0;\n    transition: opacity 200ms;\n    cursor: pointer;\n\n    i {\n      color: #fff;\n      font-size: 1.25rem;\n    }\n\n    &.uploading {\n      opacity: 1;\n      background: rgba(0, 0, 0, 0.55);\n    }\n  }\n\n  &:hover &__overlay {\n    opacity: 1;\n  }\n\n  &__input {\n    display: none;\n  }\n}\n\n.user-avatar__remove[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -4px;\n  right: -4px;\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  border: 2px solid #fff;\n  background: linear-gradient(135deg, #f87171, #ef4444);\n  color: #fff;\n  font-size: 0.65rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  padding: 0;\n  transition: transform 200ms;\n  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);\n\n  &:hover {\n    transform: scale(1.15);\n  }\n}\n\n.meta-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n\n  i {\n    color: #0ea5e9;\n  }\n}\n\n.status-pill[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.85rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  background: rgba(255, 255, 255, 0.8);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  color: rgba(60, 60, 67, 0.8);\n}\n\n.status-pill--active[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.14);\n  color: #0f766e;\n  border-color: rgba(16, 185, 129, 0.35);\n}\n\n.status-pill--inactive[_ngcontent-%COMP%] {\n  background: rgba(248, 113, 113, 0.14);\n  color: #b91c1c;\n  border-color: rgba(248, 113, 113, 0.35);\n}\n\n.form-body[_ngcontent-%COMP%] {\n  @include form.form-container;\n}\n\n.form-layout[_ngcontent-%COMP%] {\n  @include form.form-layout;\n}\n\n.form-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n\n  &:hover,\n  &:focus-within {\n    transform: none;\n  }\n}\n\n.section-title[_ngcontent-%COMP%] {\n  @include form.section-title;\n}\n\n.access-summary[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n  margin: 0.75rem 0 0.5rem;\n}\n\n.access-summary__chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.4rem 0.75rem;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  background: rgba(255, 255, 255, 0.8);\n  color: rgba(30, 41, 59, 0.85);\n  font-size: 0.78rem;\n  font-weight: 600;\n\n  i {\n    color: #0ea5e9;\n  }\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  @include form.form-grid;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  &:hover > label {\n    color: #334155;\n  }\n\n  &:focus-within > label {\n    color: #4f46e5;\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-multiselect,\n  > textarea,\n  > .password-field {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &.full-row {\n    grid-column: 1 / -1;\n  }\n\n  &.permission-search {\n    min-width: 220px;\n  }\n}\n\n.password-field[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n\n  p-inputgroup {\n    flex: 1;\n  }\n}\n\n[_nghost-%COMP%]     .timezone-option {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n\n[_nghost-%COMP%]     .timezone-flag {\n  width: 18px;\n  height: 12px;\n  border-radius: 2px;\n  object-fit: cover;\n  background: #e2e8f0;\n  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1);\n}\n\n.btn-generate[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  white-space: nowrap;\n  background: linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%);\n  color: #fff;\n\n  i {\n    font-size: 0.85rem;\n  }\n\n  &:hover:not(:disabled) {\n    transform: translateY(-1px);\n    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.35);\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n\n\n\n\n.status-control-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  background: rgba(248, 250, 252, 0.8);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 14px;\n  margin-top: 0.5rem;\n  transition: all 0.25s ease;\n\n  &--active {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(34, 197, 94, 0.05) 100%);\n    border-color: rgba(16, 185, 129, 0.2);\n  }\n\n  &--inactive {\n    background: linear-gradient(135deg, rgba(239, 68, 68, 0.06) 0%, rgba(248, 113, 113, 0.04) 100%);\n    border-color: rgba(239, 68, 68, 0.15);\n  }\n}\n\n.status-control-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.25s ease;\n\n  i {\n    font-size: 1.1rem;\n    color: rgba(60, 60, 67, 0.5);\n    transition: all 0.25s ease;\n  }\n\n  &--active {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(34, 197, 94, 0.12) 100%);\n\n    i {\n      color: #059669;\n    }\n  }\n}\n\n.status-control-card--inactive[_ngcontent-%COMP%]   .status-control-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(248, 113, 113, 0.08) 100%);\n\n  i {\n    color: #dc2626;\n  }\n}\n\n.status-control-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  flex: 1;\n  min-width: 0;\n}\n\n.status-control-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.status-control-value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.status-control-card--active[_ngcontent-%COMP%]   .status-control-value[_ngcontent-%COMP%] {\n  color: #047857;\n}\n\n.status-control-card--inactive[_ngcontent-%COMP%]   .status-control-value[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n\n.status-control-hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.status-control-toggle[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n\n.user-access-accordion[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n}\n\n.accordion-title[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  font-weight: 600;\n\n  i {\n    color: #0ea5e9;\n  }\n}\n\n.accordion-note[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem;\n  font-size: 0.82rem;\n  color: rgba(51, 65, 85, 0.8);\n}\n\n.permission-conflict-banner[_ngcontent-%COMP%] {\n  margin-bottom: 0.8rem;\n  padding: 0.65rem 0.75rem;\n  border: 1px solid rgba(251, 146, 60, 0.42);\n  border-radius: 10px;\n  background: linear-gradient(135deg, rgba(255, 237, 213, 0.88), rgba(254, 215, 170, 0.7));\n  color: #9a3412;\n\n  ul {\n    margin: 0.35rem 0 0;\n    padding-left: 1rem;\n    font-size: 0.78rem;\n  }\n}\n\n.permission-conflict-banner__title[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n\n.permission-controls[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.65rem;\n  margin-bottom: 0.8rem;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n}\n\n.permissions-table-wrap[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  border-radius: 12px;\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.86);\n}\n\n.module-cell[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n\n.permission-key[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.permission-item__sources[_ngcontent-%COMP%], \n.security-level-list[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.35rem;\n  flex-wrap: wrap;\n  margin-top: 0.35rem;\n}\n\n.source-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.18rem 0.48rem;\n  border-radius: 999px;\n  background: rgba(14, 165, 233, 0.12);\n  border: 1px solid rgba(14, 165, 233, 0.24);\n  color: #0f172a;\n  font-size: 0.72rem;\n  font-weight: 600;\n}\n\n.source-chip.muted[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.16);\n  border-color: rgba(148, 163, 184, 0.28);\n  color: #475569;\n}\n\n.risk-chip[_ngcontent-%COMP%], \n.change-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.7rem;\n  font-weight: 700;\n  border-radius: 999px;\n  padding: 0.18rem 0.5rem;\n  border: 1px solid transparent;\n  white-space: nowrap;\n}\n\n.risk-chip--critical[_ngcontent-%COMP%] {\n  background: rgba(248, 113, 113, 0.16);\n  border-color: rgba(248, 113, 113, 0.4);\n  color: #b91c1c;\n}\n\n.risk-chip--sensitive[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.18);\n  border-color: rgba(251, 191, 36, 0.38);\n  color: #92400e;\n}\n\n.risk-chip--standard[_ngcontent-%COMP%] {\n  background: rgba(56, 189, 248, 0.16);\n  border-color: rgba(56, 189, 248, 0.35);\n  color: #075985;\n}\n\n.change-chip--added[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.16);\n  border-color: rgba(34, 197, 94, 0.34);\n  color: #166534;\n}\n\n.change-chip--removed[_ngcontent-%COMP%] {\n  background: rgba(244, 63, 94, 0.16);\n  border-color: rgba(244, 63, 94, 0.34);\n  color: #9f1239;\n}\n\n.change-chip--unchanged[_ngcontent-%COMP%] {\n  background: rgba(148, 163, 184, 0.16);\n  border-color: rgba(148, 163, 184, 0.3);\n  color: #334155;\n}\n\n[_nghost-%COMP%]     .permissions-table {\n  .p-datatable-thead > tr > th {\n    background: rgba(248, 250, 252, 0.92);\n    color: #334155;\n    font-size: 0.74rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n    border-color: rgba(148, 163, 184, 0.35);\n    border-bottom: 1px dotted rgba(148, 163, 184, 0.5);\n    border-right: 1px dotted rgba(148, 163, 184, 0.45);\n    padding: 0.7rem 0.75rem;\n  }\n\n  .p-datatable-tbody > tr > td {\n    border-color: rgba(148, 163, 184, 0.35);\n    border-bottom: 1px dotted rgba(148, 163, 184, 0.45);\n    border-right: 1px dotted rgba(148, 163, 184, 0.4);\n    padding: 0.65rem 0.75rem;\n    vertical-align: top;\n    background: transparent;\n  }\n\n  .p-datatable-thead > tr > th:last-child,\n  .p-datatable-tbody > tr > td:last-child {\n    border-right: none;\n  }\n\n  .p-datatable-tbody > tr:last-child > td {\n    border-bottom: none;\n  }\n\n  .p-datatable-tbody > tr.module-group-start:not(:first-child) > td {\n    border-top: 1px solid rgba(100, 116, 139, 0.42);\n  }\n\n  .p-paginator {\n    border-top: 1px solid rgba(148, 163, 184, 0.2);\n    background: rgba(248, 250, 252, 0.7);\n    padding: 0.45rem 0.6rem;\n  }\n}\n\n.security-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  border-radius: 12px;\n  padding: 0.75rem;\n  background: rgba(255, 255, 255, 0.8);\n  display: grid;\n  gap: 0.65rem;\n}\n\n.security-card__row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n\n  .label {\n    color: #475569;\n    font-size: 0.78rem;\n    font-weight: 500;\n  }\n\n  strong {\n    color: #0f172a;\n    font-size: 0.84rem;\n  }\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #64748b;\n  padding: 0.65rem;\n  border: 1px dashed rgba(148, 163, 184, 0.36);\n  border-radius: 10px;\n  background: rgba(248, 250, 252, 0.6);\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  @include form.form-actions;\n\n  .crm-button--ghost {\n    @include form.button-ghost;\n  }\n\n  .crm-button--primary {\n    @include form.button-primary;\n  }\n}\n\n.user-edit__loading[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--md-space-3);\n}\n\n.loading-bar[_ngcontent-%COMP%] {\n  height: 64px;\n  background: linear-gradient(90deg, rgba(226, 232, 240, 0.3) 25%, rgba(226, 232, 240, 0.6) 50%, rgba(226, 232, 240, 0.3) 75%);\n  background-size: 200% 100%;\n  border-radius: 18px;\n  animation: _ngcontent-%COMP%_shimmer 1.4s infinite;\n}\n\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n@media (max-width: 768px) {\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .permission-controls[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .password-field[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n\n[_nghost-%COMP%]     .p-inputtext, \n[_nghost-%COMP%]     .p-dropdown, \n[_nghost-%COMP%]     .p-multiselect, \n[_nghost-%COMP%]     .p-inputtextarea {\n  @include form.premium-input;\n}\n\n[_nghost-%COMP%]     .p-inputtext:hover, \n[_nghost-%COMP%]     .p-dropdown:hover, \n[_nghost-%COMP%]     .p-multiselect:hover, \n[_nghost-%COMP%]     .p-inputtextarea:hover {\n  @include form.premium-input-hover;\n}\n\n[_nghost-%COMP%]     .p-inputtext:focus, \n[_nghost-%COMP%]     .p-dropdown:focus-within, \n[_nghost-%COMP%]     .p-multiselect:focus-within, \n[_nghost-%COMP%]     .p-inputtextarea:focus {\n  @include form.premium-input-focus;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserEditPage, [{
        type: Component,
        args: [{ selector: 'app-user-edit-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    RouterLink,
                    AccordionModule,
                    ButtonModule,
                    InputTextModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    MultiSelectModule,
                    SelectModule,
                    TagModule,
                    TableModule,
                    ToggleSwitchModule,
                    BreadcrumbsComponent
                ], template: "<section class=\"user-edit-page\">\n  <div class=\"form-header\">\n    <div class=\"header-content\">\n      <app-breadcrumbs></app-breadcrumbs>\n\n      <button type=\"button\" class=\"back-link\" routerLink=\"/app/settings/users\">\n        <i class=\"pi pi-arrow-left\"></i>\n        Back to Users\n      </button>\n\n      <div class=\"header-row\">\n        <div class=\"header-title\">\n          <h1 class=\"hero-title\">\n            <span class=\"title-gradient\">Edit</span>\n            <span class=\"title-light\">User</span>\n          </h1>\n          <p>\n            Update access, roles, and preferences in a focused workspace. Changes are saved immediately for the selected teammate.\n          </p>\n        </div>\n        <div class=\"header-meta\">\n          <!-- Avatar -->\n          <div class=\"user-avatar-section\">\n            <div class=\"user-avatar\" [class.user-avatar--has-image]=\"user()?.profilePictureUrl\">\n              @if (avatarPreviewUrl() || user()?.profilePictureUrl) {\n                <img\n                  [src]=\"avatarPreviewUrl() || user()?.profilePictureUrl\"\n                  alt=\"Profile picture\"\n                  class=\"user-avatar__img\"\n                />\n              } @else {\n                <span class=\"user-avatar__initial\">{{ user()?.fullName?.charAt(0)?.toUpperCase() || '?' }}</span>\n              }\n              <label class=\"user-avatar__overlay\" for=\"avatar-upload\" [class.uploading]=\"uploadingAvatar()\">\n                @if (uploadingAvatar()) {\n                  <i class=\"pi pi-spin pi-spinner\"></i>\n                } @else {\n                  <i class=\"pi pi-camera\"></i>\n                }\n              </label>\n              <input\n                type=\"file\"\n                id=\"avatar-upload\"\n                class=\"user-avatar__input\"\n                accept=\"image/jpeg,image/png,image/webp,image/gif\"\n                (change)=\"onAvatarSelected($event)\"\n                [disabled]=\"uploadingAvatar()\"\n              />\n            </div>\n            @if (user()?.profilePictureUrl && !uploadingAvatar()) {\n              <button type=\"button\" class=\"user-avatar__remove\" (click)=\"onRemoveAvatar()\" title=\"Remove picture\">\n                <i class=\"pi pi-times\"></i>\n              </button>\n            }\n          </div>\n          <div class=\"header-meta__info\">\n            <span class=\"meta-chip\">\n              <i class=\"pi pi-user\"></i>\n              {{ user()?.fullName || 'User profile' }}\n            </span>\n            <span class=\"status-pill\" [ngClass]=\"user()?.isActive ? 'status-pill--active' : 'status-pill--inactive'\">\n              {{ user()?.isActive ? 'Active' : 'Inactive' }}\n            </span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"form-body\">\n    <article class=\"form-card\" *ngIf=\"!loading(); else loadingState\">\n      <h3 class=\"section-title\">\n        <i class=\"pi pi-shield\"></i>\n        Access Controls\n      </h3>\n      <div class=\"access-summary\">\n        <span class=\"access-summary__chip\">\n          <i class=\"pi pi-users\"></i>\n          {{ selectedRoleCount() }} role{{ selectedRoleCount() === 1 ? '' : 's' }}\n        </span>\n        <span class=\"access-summary__chip\">\n          <i class=\"pi pi-lock\"></i>\n          {{ effectivePermissionCount() }} permissions\n        </span>\n        <span class=\"access-summary__chip\">\n          <i class=\"pi pi-shield\"></i>\n          Security: {{ effectiveSecurityLevel().name }}\n        </span>\n      </div>\n\n      <form [formGroup]=\"form\" (ngSubmit)=\"onSave()\" class=\"form-layout\">\n        <div class=\"form-grid\">\n          <div class=\"form-field\">\n            <label for=\"user-fullName\">Full name</label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                <i class=\"pi pi-user\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"user-fullName\" formControlName=\"fullName\" placeholder=\"Jordan Patel\" />\n            </p-inputgroup>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"user-email\">Email</label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--email\">\n                <i class=\"pi pi-envelope\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"user-email\" formControlName=\"email\" placeholder=\"user@example.com\" />\n            </p-inputgroup>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"user-timeZone\">Time zone</label>\n            <p-select\n              inputId=\"user-timeZone\"\n              formControlName=\"timeZone\"\n              [options]=\"timezoneOptions\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              appendTo=\"body\"\n              styleClass=\"w-full\"\n              [filter]=\"true\"\n              filterBy=\"label\"\n              filterPlaceholder=\"Search time zones\"\n            >\n              <ng-template pTemplate=\"item\" let-option>\n                <div class=\"timezone-option\">\n                  <img\n                    class=\"timezone-flag\"\n                    [src]=\"getFlagUrl(option?.flagCode)\"\n                    [alt]=\"option?.flagCode ? option.flagCode.toUpperCase() + ' flag' : 'Flag'\"\n                    width=\"18\"\n                    height=\"12\"\n                    loading=\"lazy\"\n                  />\n                  <span>{{ option.label }}</span>\n                </div>\n              </ng-template>\n              <ng-template pTemplate=\"selectedItem\" let-option>\n                <div class=\"timezone-option\">\n                  <img\n                    class=\"timezone-flag\"\n                    [src]=\"getFlagUrl(option?.flagCode)\"\n                    [alt]=\"option?.flagCode ? option.flagCode.toUpperCase() + ' flag' : 'Flag'\"\n                    width=\"18\"\n                    height=\"12\"\n                    loading=\"lazy\"\n                  />\n                  <span>{{ option?.label }}</span>\n                </div>\n              </ng-template>\n            </p-select>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"user-locale\">Locale</label>\n            <p-select\n              inputId=\"user-locale\"\n              formControlName=\"locale\"\n              [options]=\"localeOptions\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              appendTo=\"body\"\n              styleClass=\"w-full\"\n            ></p-select>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"user-monthlyQuota\">Monthly quota ({{ currencyCode() || 'N/A' }})</label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--warning\">\n                <i class=\"pi pi-dollar\"></i>\n              </p-inputgroup-addon>\n              <input\n                pInputText\n                id=\"user-monthlyQuota\"\n                type=\"number\"\n                min=\"0\"\n                step=\"0.01\"\n                formControlName=\"monthlyQuota\"\n                placeholder=\"e.g. 75000\"\n              />\n            </p-inputgroup>\n          </div>\n          <div class=\"form-field full-row\">\n            <label for=\"user-roleIds\">Roles</label>\n            <p-multiSelect\n              inputId=\"user-roleIds\"\n              formControlName=\"roleIds\"\n              [options]=\"rolesAsOptions()\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              display=\"chip\"\n              appendTo=\"body\"\n              defaultLabel=\"Select roles\"\n              styleClass=\"w-full\"\n            ></p-multiSelect>\n          </div>\n          <div class=\"form-field full-row\">\n            <label for=\"user-temporaryPassword\">Temporary password</label>\n            <div class=\"password-field\">\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--industry\">\n                  <i class=\"pi pi-key\"></i>\n                </p-inputgroup-addon>\n                <input\n                  pInputText\n                  id=\"user-temporaryPassword\"\n                  type=\"text\"\n                  formControlName=\"temporaryPassword\"\n                  placeholder=\"Optional\"\n                />\n              </p-inputgroup>\n              <button type=\"button\" class=\"btn-generate\" [disabled]=\"!canManageAdmin()\" (click)=\"generatePassword()\">\n                <i class=\"pi pi-sync\"></i>\n                Generate\n              </button>\n            </div>\n            <small *ngIf=\"generatedPassword()\">Share once, then require reset on first login.</small>\n          </div>\n        </div>\n\n        <!-- Status Control Card -->\n        <div class=\"status-control-card\" [class.status-control-card--active]=\"form.value.isActive\" [class.status-control-card--inactive]=\"!form.value.isActive\">\n          <div class=\"status-control-icon\" [class.status-control-icon--active]=\"form.value.isActive\">\n            <i class=\"pi\" [class.pi-check-circle]=\"form.value.isActive\" [class.pi-ban]=\"!form.value.isActive\"></i>\n          </div>\n          <div class=\"status-control-content\">\n            <span class=\"status-control-label\">Account Status</span>\n            <strong class=\"status-control-value\">{{ form.value.isActive ? 'Active' : 'Inactive' }}</strong>\n            <span class=\"status-control-hint\">{{ form.value.isActive ? 'User can access the system' : 'User access is disabled' }}</span>\n          </div>\n          <div class=\"status-control-toggle\">\n            <p-toggleSwitch formControlName=\"isActive\"></p-toggleSwitch>\n          </div>\n        </div>\n\n        <p-accordion\n          [value]=\"accessAccordionValue()\"\n          [multiple]=\"true\"\n          class=\"user-access-accordion\"\n        >\n          <p-accordion-panel value=\"permissions\">\n            <p-accordion-header>\n              <div class=\"accordion-title\">\n                <i class=\"pi pi-lock\"></i>\n                <span>Permissions</span>\n                <p-tag [value]=\"effectivePermissionCount() + ' effective'\" severity=\"info\"></p-tag>\n              </div>\n            </p-accordion-header>\n            <p-accordion-content>\n              <p class=\"accordion-note\">Effective permissions are derived from selected roles. Manage individual permissions in Role Management.</p>\n              <div class=\"permission-conflict-banner\" *ngIf=\"permissionConflictWarnings().length\">\n                <div class=\"permission-conflict-banner__title\">\n                  <i class=\"pi pi-exclamation-triangle\"></i>\n                  Potential access conflicts\n                </div>\n                <ul>\n                  <li *ngFor=\"let warning of permissionConflictWarnings()\">{{ warning }}</li>\n                </ul>\n              </div>\n\n              <ng-container *ngIf=\"permissionTableRows().length; else noPermissions\">\n                <div class=\"permission-controls\">\n                  <div class=\"form-field\">\n                    <label for=\"permissionsPerspective\">Perspective</label>\n                    <p-select\n                      inputId=\"permissionsPerspective\"\n                      [options]=\"permissionPerspectiveOptions\"\n                      [ngModel]=\"permissionPerspective()\"\n                      [ngModelOptions]=\"{ standalone: true }\"\n                      (ngModelChange)=\"permissionPerspective.set($any($event))\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      appendTo=\"body\"\n                      styleClass=\"w-full\"\n                    ></p-select>\n                  </div>\n                  <div class=\"form-field\">\n                    <label for=\"permissionsModuleFilter\">Module</label>\n                    <p-select\n                      inputId=\"permissionsModuleFilter\"\n                      [options]=\"permissionModuleOptions()\"\n                      [ngModel]=\"permissionModuleFilter()\"\n                      [ngModelOptions]=\"{ standalone: true }\"\n                      (ngModelChange)=\"permissionModuleFilter.set($any($event))\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      appendTo=\"body\"\n                      styleClass=\"w-full\"\n                    ></p-select>\n                  </div>\n                  <div class=\"form-field\">\n                    <label for=\"permissionsRiskFilter\">Risk</label>\n                    <p-select\n                      inputId=\"permissionsRiskFilter\"\n                      [options]=\"permissionRiskOptions\"\n                      [ngModel]=\"permissionRiskFilter()\"\n                      [ngModelOptions]=\"{ standalone: true }\"\n                      (ngModelChange)=\"permissionRiskFilter.set($any($event))\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      appendTo=\"body\"\n                      styleClass=\"w-full\"\n                    ></p-select>\n                  </div>\n                  <div class=\"form-field\">\n                    <label for=\"permissionsChangeFilter\">Change</label>\n                    <p-select\n                      inputId=\"permissionsChangeFilter\"\n                      [options]=\"permissionChangeOptions\"\n                      [ngModel]=\"permissionChangeFilter()\"\n                      [ngModelOptions]=\"{ standalone: true }\"\n                      (ngModelChange)=\"permissionChangeFilter.set($any($event))\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      appendTo=\"body\"\n                      styleClass=\"w-full\"\n                    ></p-select>\n                  </div>\n                  <div class=\"form-field permission-search\">\n                    <label for=\"permissionsSearch\">Search</label>\n                    <p-inputgroup>\n                      <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                        <i class=\"pi pi-search\"></i>\n                      </p-inputgroup-addon>\n                      <input\n                        pInputText\n                        id=\"permissionsSearch\"\n                        [ngModel]=\"permissionSearch()\"\n                        [ngModelOptions]=\"{ standalone: true }\"\n                        (ngModelChange)=\"permissionSearch.set($any($event) ?? '')\"\n                        placeholder=\"Module, permission, role\"\n                      />\n                    </p-inputgroup>\n                  </div>\n                </div>\n                <div class=\"permissions-table-wrap\">\n                  <p-table\n                    [value]=\"permissionTableRows()\"\n                    [paginator]=\"true\"\n                    [rows]=\"10\"\n                    [rowsPerPageOptions]=\"[10, 25, 50]\"\n                    rowGroupMode=\"rowspan\"\n                    groupRowsBy=\"module\"\n                    sortField=\"module\"\n                    [sortOrder]=\"1\"\n                    [tableStyle]=\"{ 'min-width': '100%' }\"\n                    styleClass=\"permissions-table\"\n                  >\n                    <ng-template pTemplate=\"header\">\n                      <tr>\n                        <th style=\"width: 24%\">Module</th>\n                        <th style=\"width: 28%\">Permission</th>\n                        <th style=\"width: 12%\">Risk</th>\n                        <th style=\"width: 12%\">Change</th>\n                        <th style=\"width: 24%\">Source Roles</th>\n                      </tr>\n                    </ng-template>\n                    <ng-template pTemplate=\"body\" let-row let-rowgroup=\"rowgroup\" let-rowspan=\"rowspan\">\n                      <tr [ngClass]=\"{ 'module-group-start': rowgroup }\">\n                        <td *ngIf=\"rowgroup\" [attr.rowspan]=\"rowspan\">\n                          <span class=\"module-cell\">{{ row.module }}</span>\n                        </td>\n                        <td>\n                          <span class=\"permission-key\">{{ row.label }}</span>\n                        </td>\n                        <td>\n                          <span class=\"risk-chip\" [ngClass]=\"'risk-chip--' + row.risk\">{{ formatRiskLabel(row.risk) }}</span>\n                        </td>\n                        <td>\n                          <span class=\"change-chip\" [ngClass]=\"'change-chip--' + row.changeType\">\n                            {{ formatChangeLabel(row.changeType) }}\n                          </span>\n                        </td>\n                        <td>\n                          <div class=\"permission-item__sources\">\n                            <span class=\"source-chip\" *ngFor=\"let source of row.sources\">{{ source }}</span>\n                          </div>\n                        </td>\n                      </tr>\n                    </ng-template>\n                  </p-table>\n                </div>\n              </ng-container>\n              <ng-template #noPermissions>\n                <div class=\"empty-state\">No matching permissions. Change filters or assign at least one role.</div>\n              </ng-template>\n            </p-accordion-content>\n          </p-accordion-panel>\n\n          <p-accordion-panel value=\"security\">\n            <p-accordion-header>\n              <div class=\"accordion-title\">\n                <i class=\"pi pi-shield\"></i>\n                <span>Security Levels</span>\n                <p-tag [value]=\"effectiveSecurityLevel().name\" severity=\"success\"></p-tag>\n              </div>\n            </p-accordion-header>\n            <p-accordion-content>\n              <p class=\"accordion-note\">Security level is role-derived. Highest hierarchy role is used as the effective level when multiple roles are assigned.</p>\n              <div class=\"security-card\">\n                <div class=\"security-card__row\">\n                  <span class=\"label\">Effective level</span>\n                  <strong>{{ effectiveSecurityLevel().name }}</strong>\n                </div>\n                <div class=\"security-card__row\">\n                  <span class=\"label\">Driving role</span>\n                  <strong>{{ effectiveSecurityLevel().roleName || 'Not available' }}</strong>\n                </div>\n                <div class=\"security-card__row\">\n                  <span class=\"label\">All matched levels</span>\n                  <div class=\"security-level-list\">\n                    <span class=\"source-chip\" *ngFor=\"let level of effectiveSecurityLevel().sources\">{{ level }}</span>\n                    <span class=\"source-chip muted\" *ngIf=\"!effectiveSecurityLevel().sources.length\">None</span>\n                  </div>\n                </div>\n              </div>\n            </p-accordion-content>\n          </p-accordion-panel>\n\n          <p-accordion-panel value=\"dashboard\">\n            <p-accordion-header>\n              <div class=\"accordion-title\">\n                <i class=\"pi pi-th-large\"></i>\n                <span>Dashboard Packs</span>\n                <p-tag [value]=\"selectedDashboardPackKey() || 'Role default'\" severity=\"warn\"></p-tag>\n              </div>\n            </p-accordion-header>\n            <p-accordion-content>\n              <div class=\"form-field\">\n                <label for=\"user-dashboardPack\">Assigned pack</label>\n                <p-select\n                  inputId=\"user-dashboardPack\"\n                  [options]=\"dashboardPackOptions()\"\n                  [ngModel]=\"selectedDashboardPackKey()\"\n                  [ngModelOptions]=\"{ standalone: true }\"\n                  (ngModelChange)=\"selectedDashboardPackKey.set($any($event))\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  [disabled]=\"!canManageAdmin() || loadingDashboardPackOptions() || updatingDashboardPack()\"\n                  appendTo=\"body\"\n                  styleClass=\"w-full\"\n                ></p-select>\n                <small>Role default is preselected unless a custom pack is set.</small>\n              </div>\n            </p-accordion-content>\n          </p-accordion-panel>\n        </p-accordion>\n\n        <div class=\"form-actions\">\n          <button type=\"button\" pButton label=\"Cancel\" class=\"crm-button--ghost\" routerLink=\"/app/settings/users\"></button>\n          <button\n            type=\"submit\"\n            pButton\n            label=\"Save changes\"\n            icon=\"pi pi-check\"\n            class=\"crm-button--primary\"\n            [disabled]=\"saving() || !canManageAdmin() || !hasPendingChanges()\"\n          ></button>\n        </div>\n      </form>\n    </article>\n  </div>\n\n  <ng-template #loadingState>\n    <div class=\"user-edit__loading\">\n      <div class=\"loading-bar\" *ngFor=\"let _ of [0,1,2,3]\"></div>\n    </div>\n  </ng-template>\n</section>\n", styles: ["@use '../../../../shared/form-page-styles' as form;\n\n:host {\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.user-edit-page {\n  @include form.form-page-base;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.form-header {\n  @include form.form-page-header;\n}\n\n.header-content {\n  @include form.form-header-content;\n}\n\n.back-link {\n  @include form.form-back-link;\n}\n\n.header-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n\n.header-title {\n  @include form.form-header-title;\n}\n\n.header-meta {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n\n.header-meta__info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n// \u2500\u2500 User Avatar Section \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.user-avatar-section {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n\n.user-avatar {\n  position: relative;\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  overflow: hidden;\n  cursor: pointer;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.3);\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: scale(1.05);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.45);\n  }\n\n  &__img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    display: block;\n  }\n\n  &__initial {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    height: 100%;\n    font-size: 1.5rem;\n    font-weight: 700;\n    color: #fff;\n    text-transform: uppercase;\n  }\n\n  &__overlay {\n    position: absolute;\n    inset: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(0, 0, 0, 0.45);\n    opacity: 0;\n    transition: opacity 200ms;\n    cursor: pointer;\n\n    i {\n      color: #fff;\n      font-size: 1.25rem;\n    }\n\n    &.uploading {\n      opacity: 1;\n      background: rgba(0, 0, 0, 0.55);\n    }\n  }\n\n  &:hover &__overlay {\n    opacity: 1;\n  }\n\n  &__input {\n    display: none;\n  }\n}\n\n.user-avatar__remove {\n  position: absolute;\n  top: -4px;\n  right: -4px;\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  border: 2px solid #fff;\n  background: linear-gradient(135deg, #f87171, #ef4444);\n  color: #fff;\n  font-size: 0.65rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  padding: 0;\n  transition: transform 200ms;\n  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);\n\n  &:hover {\n    transform: scale(1.15);\n  }\n}\n\n.meta-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n\n  i {\n    color: #0ea5e9;\n  }\n}\n\n.status-pill {\n  padding: 0.35rem 0.85rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  background: rgba(255, 255, 255, 0.8);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  color: rgba(60, 60, 67, 0.8);\n}\n\n.status-pill--active {\n  background: rgba(16, 185, 129, 0.14);\n  color: #0f766e;\n  border-color: rgba(16, 185, 129, 0.35);\n}\n\n.status-pill--inactive {\n  background: rgba(248, 113, 113, 0.14);\n  color: #b91c1c;\n  border-color: rgba(248, 113, 113, 0.35);\n}\n\n.form-body {\n  @include form.form-container;\n}\n\n.form-layout {\n  @include form.form-layout;\n}\n\n.form-card {\n  @include form.form-section;\n\n  &:hover,\n  &:focus-within {\n    transform: none;\n  }\n}\n\n.section-title {\n  @include form.section-title;\n}\n\n.access-summary {\n  display: flex;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n  margin: 0.75rem 0 0.5rem;\n}\n\n.access-summary__chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.4rem 0.75rem;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  background: rgba(255, 255, 255, 0.8);\n  color: rgba(30, 41, 59, 0.85);\n  font-size: 0.78rem;\n  font-weight: 600;\n\n  i {\n    color: #0ea5e9;\n  }\n}\n\n.form-grid {\n  @include form.form-grid;\n}\n\n.form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  &:hover > label {\n    color: #334155;\n  }\n\n  &:focus-within > label {\n    color: #4f46e5;\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-multiselect,\n  > textarea,\n  > .password-field {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &.full-row {\n    grid-column: 1 / -1;\n  }\n\n  &.permission-search {\n    min-width: 220px;\n  }\n}\n\n.password-field {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n\n  p-inputgroup {\n    flex: 1;\n  }\n}\n\n:host ::ng-deep .timezone-option {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n\n:host ::ng-deep .timezone-flag {\n  width: 18px;\n  height: 12px;\n  border-radius: 2px;\n  object-fit: cover;\n  background: #e2e8f0;\n  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1);\n}\n\n.btn-generate {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  white-space: nowrap;\n  background: linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%);\n  color: #fff;\n\n  i {\n    font-size: 0.85rem;\n  }\n\n  &:hover:not(:disabled) {\n    transform: translateY(-1px);\n    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.35);\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   STATUS CONTROL CARD\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.status-control-card {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  background: rgba(248, 250, 252, 0.8);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 14px;\n  margin-top: 0.5rem;\n  transition: all 0.25s ease;\n\n  &--active {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(34, 197, 94, 0.05) 100%);\n    border-color: rgba(16, 185, 129, 0.2);\n  }\n\n  &--inactive {\n    background: linear-gradient(135deg, rgba(239, 68, 68, 0.06) 0%, rgba(248, 113, 113, 0.04) 100%);\n    border-color: rgba(239, 68, 68, 0.15);\n  }\n}\n\n.status-control-icon {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.25s ease;\n\n  i {\n    font-size: 1.1rem;\n    color: rgba(60, 60, 67, 0.5);\n    transition: all 0.25s ease;\n  }\n\n  &--active {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(34, 197, 94, 0.12) 100%);\n\n    i {\n      color: #059669;\n    }\n  }\n}\n\n.status-control-card--inactive .status-control-icon {\n  background: linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(248, 113, 113, 0.08) 100%);\n\n  i {\n    color: #dc2626;\n  }\n}\n\n.status-control-content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  flex: 1;\n  min-width: 0;\n}\n\n.status-control-label {\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.status-control-value {\n  font-size: 1rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.status-control-card--active .status-control-value {\n  color: #047857;\n}\n\n.status-control-card--inactive .status-control-value {\n  color: #b91c1c;\n}\n\n.status-control-hint {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.status-control-toggle {\n  flex-shrink: 0;\n}\n\n.user-access-accordion {\n  margin-top: 0.75rem;\n}\n\n.accordion-title {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  font-weight: 600;\n\n  i {\n    color: #0ea5e9;\n  }\n}\n\n.accordion-note {\n  margin: 0 0 0.75rem;\n  font-size: 0.82rem;\n  color: rgba(51, 65, 85, 0.8);\n}\n\n.permission-conflict-banner {\n  margin-bottom: 0.8rem;\n  padding: 0.65rem 0.75rem;\n  border: 1px solid rgba(251, 146, 60, 0.42);\n  border-radius: 10px;\n  background: linear-gradient(135deg, rgba(255, 237, 213, 0.88), rgba(254, 215, 170, 0.7));\n  color: #9a3412;\n\n  ul {\n    margin: 0.35rem 0 0;\n    padding-left: 1rem;\n    font-size: 0.78rem;\n  }\n}\n\n.permission-conflict-banner__title {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n\n.permission-controls {\n  display: grid;\n  gap: 0.65rem;\n  margin-bottom: 0.8rem;\n  grid-template-columns: repeat(5, minmax(0, 1fr));\n}\n\n.permissions-table-wrap {\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  border-radius: 12px;\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.86);\n}\n\n.module-cell {\n  font-size: 0.8rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n\n.permission-key {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n.permission-item__sources,\n.security-level-list {\n  display: flex;\n  gap: 0.35rem;\n  flex-wrap: wrap;\n  margin-top: 0.35rem;\n}\n\n.source-chip {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.18rem 0.48rem;\n  border-radius: 999px;\n  background: rgba(14, 165, 233, 0.12);\n  border: 1px solid rgba(14, 165, 233, 0.24);\n  color: #0f172a;\n  font-size: 0.72rem;\n  font-weight: 600;\n}\n\n.source-chip.muted {\n  background: rgba(148, 163, 184, 0.16);\n  border-color: rgba(148, 163, 184, 0.28);\n  color: #475569;\n}\n\n.risk-chip,\n.change-chip {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.7rem;\n  font-weight: 700;\n  border-radius: 999px;\n  padding: 0.18rem 0.5rem;\n  border: 1px solid transparent;\n  white-space: nowrap;\n}\n\n.risk-chip--critical {\n  background: rgba(248, 113, 113, 0.16);\n  border-color: rgba(248, 113, 113, 0.4);\n  color: #b91c1c;\n}\n\n.risk-chip--sensitive {\n  background: rgba(251, 191, 36, 0.18);\n  border-color: rgba(251, 191, 36, 0.38);\n  color: #92400e;\n}\n\n.risk-chip--standard {\n  background: rgba(56, 189, 248, 0.16);\n  border-color: rgba(56, 189, 248, 0.35);\n  color: #075985;\n}\n\n.change-chip--added {\n  background: rgba(34, 197, 94, 0.16);\n  border-color: rgba(34, 197, 94, 0.34);\n  color: #166534;\n}\n\n.change-chip--removed {\n  background: rgba(244, 63, 94, 0.16);\n  border-color: rgba(244, 63, 94, 0.34);\n  color: #9f1239;\n}\n\n.change-chip--unchanged {\n  background: rgba(148, 163, 184, 0.16);\n  border-color: rgba(148, 163, 184, 0.3);\n  color: #334155;\n}\n\n:host ::ng-deep .permissions-table {\n  .p-datatable-thead > tr > th {\n    background: rgba(248, 250, 252, 0.92);\n    color: #334155;\n    font-size: 0.74rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n    border-color: rgba(148, 163, 184, 0.35);\n    border-bottom: 1px dotted rgba(148, 163, 184, 0.5);\n    border-right: 1px dotted rgba(148, 163, 184, 0.45);\n    padding: 0.7rem 0.75rem;\n  }\n\n  .p-datatable-tbody > tr > td {\n    border-color: rgba(148, 163, 184, 0.35);\n    border-bottom: 1px dotted rgba(148, 163, 184, 0.45);\n    border-right: 1px dotted rgba(148, 163, 184, 0.4);\n    padding: 0.65rem 0.75rem;\n    vertical-align: top;\n    background: transparent;\n  }\n\n  .p-datatable-thead > tr > th:last-child,\n  .p-datatable-tbody > tr > td:last-child {\n    border-right: none;\n  }\n\n  .p-datatable-tbody > tr:last-child > td {\n    border-bottom: none;\n  }\n\n  .p-datatable-tbody > tr.module-group-start:not(:first-child) > td {\n    border-top: 1px solid rgba(100, 116, 139, 0.42);\n  }\n\n  .p-paginator {\n    border-top: 1px solid rgba(148, 163, 184, 0.2);\n    background: rgba(248, 250, 252, 0.7);\n    padding: 0.45rem 0.6rem;\n  }\n}\n\n.security-card {\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  border-radius: 12px;\n  padding: 0.75rem;\n  background: rgba(255, 255, 255, 0.8);\n  display: grid;\n  gap: 0.65rem;\n}\n\n.security-card__row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n\n  .label {\n    color: #475569;\n    font-size: 0.78rem;\n    font-weight: 500;\n  }\n\n  strong {\n    color: #0f172a;\n    font-size: 0.84rem;\n  }\n}\n\n.empty-state {\n  font-size: 0.82rem;\n  color: #64748b;\n  padding: 0.65rem;\n  border: 1px dashed rgba(148, 163, 184, 0.36);\n  border-radius: 10px;\n  background: rgba(248, 250, 252, 0.6);\n}\n\n.form-actions {\n  @include form.form-actions;\n\n  .crm-button--ghost {\n    @include form.button-ghost;\n  }\n\n  .crm-button--primary {\n    @include form.button-primary;\n  }\n}\n\n.user-edit__loading {\n  display: flex;\n  flex-direction: column;\n  gap: var(--md-space-3);\n}\n\n.loading-bar {\n  height: 64px;\n  background: linear-gradient(90deg, rgba(226, 232, 240, 0.3) 25%, rgba(226, 232, 240, 0.6) 50%, rgba(226, 232, 240, 0.3) 75%);\n  background-size: 200% 100%;\n  border-radius: 18px;\n  animation: shimmer 1.4s infinite;\n}\n\n\n@keyframes shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n@media (max-width: 768px) {\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .permission-controls {\n    grid-template-columns: 1fr;\n  }\n\n  .password-field {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n\n:host ::ng-deep .p-inputtext,\n:host ::ng-deep .p-dropdown,\n:host ::ng-deep .p-multiselect,\n:host ::ng-deep .p-inputtextarea {\n  @include form.premium-input;\n}\n\n:host ::ng-deep .p-inputtext:hover,\n:host ::ng-deep .p-dropdown:hover,\n:host ::ng-deep .p-multiselect:hover,\n:host ::ng-deep .p-inputtextarea:hover {\n  @include form.premium-input-hover;\n}\n\n:host ::ng-deep .p-inputtext:focus,\n:host ::ng-deep .p-dropdown:focus-within,\n:host ::ng-deep .p-multiselect:focus-within,\n:host ::ng-deep .p-inputtextarea:focus {\n  @include form.premium-input-focus;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserEditPage, { className: "UserEditPage", filePath: "src/app/crm/features/settings/pages/user-edit.page.ts", lineNumber: 57 }); })();
