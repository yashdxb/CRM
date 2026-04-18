import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SkeletonModule } from 'primeng/skeleton';
import { CheckboxModule } from 'primeng/checkbox';
import { TabsModule } from 'primeng/tabs';
import { TooltipModule } from 'primeng/tooltip';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
import * as i2 from "primeng/api";
import * as i3 from "primeng/inputtext";
import * as i4 from "primeng/textarea";
import * as i5 from "primeng/select";
import * as i6 from "primeng/inputgroup";
import * as i7 from "primeng/inputgroupaddon";
import * as i8 from "primeng/checkbox";
import * as i9 from "primeng/tabs";
import * as i10 from "@angular/forms";
import * as i11 from "primeng/skeleton";
const _c0 = () => ({ standalone: true });
const _c1 = () => [0, 1, 2, 3, 4];
const _c2 = () => ["/app/settings/permissions"];
const _c3 = a0 => ({ roleId: a0 });
function RoleFormPage_small_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 52);
    i0.ɵɵtext(1, "System roles cannot be renamed.");
    i0.ɵɵelementEnd();
} }
function RoleFormPage_ng_template_89_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86);
    i0.ɵɵelement(1, "i", 87);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 88);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r2.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r2.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r2.hint);
} }
function RoleFormPage_ng_template_90_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86);
    i0.ɵɵelement(1, "i", 87);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r3.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r3.label);
} }
function RoleFormPage_ng_template_90_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 91);
    i0.ɵɵtext(1, "Select scope");
    i0.ɵɵelementEnd();
} }
function RoleFormPage_ng_template_90_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, RoleFormPage_ng_template_90_div_0_Template, 4, 2, "div", 89)(1, RoleFormPage_ng_template_90_span_1_Template, 2, 0, "span", 90);
} if (rf & 2) {
    const option_r3 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r3);
} }
function RoleFormPage_ng_template_98_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86);
    i0.ɵɵelement(1, "i", 17);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 88);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r4 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r4.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r4.hint);
} }
function RoleFormPage_ng_template_99_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86);
    i0.ɵɵelement(1, "i", 17);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r5.label);
} }
function RoleFormPage_ng_template_99_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 91);
    i0.ɵɵtext(1, "Select security level");
    i0.ɵɵelementEnd();
} }
function RoleFormPage_ng_template_99_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, RoleFormPage_ng_template_99_div_0_Template, 4, 1, "div", 89)(1, RoleFormPage_ng_template_99_span_1_Template, 2, 0, "span", 90);
} if (rf & 2) {
    const option_r5 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r5);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r5);
} }
function RoleFormPage_ng_template_112_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86);
    i0.ɵɵelement(1, "i", 92);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 88);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r6 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r6.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r6.meta);
} }
function RoleFormPage_ng_template_113_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86);
    i0.ɵɵelement(1, "i", 92);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r7.label);
} }
function RoleFormPage_ng_template_113_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 91);
    i0.ɵɵtext(1, "Top-level role");
    i0.ɵɵelementEnd();
} }
function RoleFormPage_ng_template_113_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, RoleFormPage_ng_template_113_div_0_Template, 4, 1, "div", 89)(1, RoleFormPage_ng_template_113_span_1_Template, 2, 0, "span", 90);
} if (rf & 2) {
    const option_r7 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r7);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r7);
} }
function RoleFormPage_section_122_ng_container_8_div_26_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 133)(1, "div", 134)(2, "span", 135);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 136);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p-checkbox", 137);
    i0.ɵɵlistener("onChange", function RoleFormPage_section_122_ng_container_8_div_26_div_7_Template_p_checkbox_onChange_6_listener() { const permission_r11 = i0.ɵɵrestoreView(_r10).$implicit; const ctx_r8 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r8.togglePermission(permission_r11.key)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const permission_r11 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(permission_r11.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(permission_r11.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r8.isPermissionSelected(permission_r11.key))("ngModelOptions", i0.ɵɵpureFunction0(6, _c0))("disabled", ctx_r8.roleSaving());
} }
function RoleFormPage_section_122_ng_container_8_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 128)(1, "div", 129)(2, "h4");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 130);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 131);
    i0.ɵɵtemplate(7, RoleFormPage_section_122_ng_container_8_div_26_div_7_Template, 7, 7, "div", 132);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const group_r12 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(group_r12.capability);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", group_r12.permissions.length, " permissions");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", group_r12.permissions);
} }
function RoleFormPage_section_122_ng_container_8_p_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 138);
    i0.ɵɵtext(1, "No permissions in this category.");
    i0.ɵɵelementEnd();
} }
function RoleFormPage_section_122_ng_container_8_div_30_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 133)(1, "div", 134)(2, "span", 135);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 136);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p-checkbox", 137);
    i0.ɵɵlistener("onChange", function RoleFormPage_section_122_ng_container_8_div_30_div_7_Template_p_checkbox_onChange_6_listener() { const permission_r14 = i0.ɵɵrestoreView(_r13).$implicit; const ctx_r8 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r8.togglePermission(permission_r14.key)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const permission_r14 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(permission_r14.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(permission_r14.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r8.isPermissionSelected(permission_r14.key))("ngModelOptions", i0.ɵɵpureFunction0(6, _c0))("disabled", ctx_r8.roleSaving());
} }
function RoleFormPage_section_122_ng_container_8_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 128)(1, "div", 129)(2, "h4");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 130);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 131);
    i0.ɵɵtemplate(7, RoleFormPage_section_122_ng_container_8_div_30_div_7_Template, 7, 7, "div", 132);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const group_r15 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(group_r15.capability);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", group_r15.permissions.length, " permissions");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", group_r15.permissions);
} }
function RoleFormPage_section_122_ng_container_8_p_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 138);
    i0.ɵɵtext(1, "No permissions in this category.");
    i0.ɵɵelementEnd();
} }
function RoleFormPage_section_122_ng_container_8_div_34_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 133)(1, "div", 134)(2, "span", 135);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 136);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p-checkbox", 137);
    i0.ɵɵlistener("onChange", function RoleFormPage_section_122_ng_container_8_div_34_div_7_Template_p_checkbox_onChange_6_listener() { const permission_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r8 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r8.togglePermission(permission_r17.key)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const permission_r17 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(permission_r17.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(permission_r17.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r8.isPermissionSelected(permission_r17.key))("ngModelOptions", i0.ɵɵpureFunction0(6, _c0))("disabled", ctx_r8.roleSaving());
} }
function RoleFormPage_section_122_ng_container_8_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 128)(1, "div", 129)(2, "h4");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 130);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 131);
    i0.ɵɵtemplate(7, RoleFormPage_section_122_ng_container_8_div_34_div_7_Template, 7, 7, "div", 132);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const group_r18 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(group_r18.capability);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", group_r18.permissions.length, " permissions");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", group_r18.permissions);
} }
function RoleFormPage_section_122_ng_container_8_p_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 138);
    i0.ɵɵtext(1, "No permissions in this category.");
    i0.ɵɵelementEnd();
} }
function RoleFormPage_section_122_ng_container_8_div_45_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 141)(1, "div")(2, "div", 142)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 143);
    i0.ɵɵlistener("click", function RoleFormPage_section_122_ng_container_8_div_45_div_1_Template_button_click_7_listener() { const pack_r20 = i0.ɵɵrestoreView(_r19).$implicit; const ctx_r8 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r8.applyIntentPack(pack_r20)); });
    i0.ɵɵtext(8, " Apply ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const pack_r20 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(pack_r20.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(pack_r20.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r8.roleSaving());
} }
function RoleFormPage_section_122_ng_container_8_div_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 139);
    i0.ɵɵtemplate(1, RoleFormPage_section_122_ng_container_8_div_45_div_1_Template, 9, 3, "div", 140);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r8.intentPacks());
} }
function RoleFormPage_section_122_ng_container_8_ng_template_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 138);
    i0.ɵɵtext(1, "No intent packs available.");
    i0.ɵɵelementEnd();
} }
function RoleFormPage_section_122_ng_container_8_div_53_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 141)(1, "div")(2, "div", 142)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 143);
    i0.ɵɵlistener("click", function RoleFormPage_section_122_ng_container_8_div_53_div_1_Template_button_click_7_listener() { const pack_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r8 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r8.applyPermissionPack(pack_r22)); });
    i0.ɵɵtext(8, " Apply ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const pack_r22 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(pack_r22.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(pack_r22.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r8.roleSaving());
} }
function RoleFormPage_section_122_ng_container_8_div_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 139);
    i0.ɵɵtemplate(1, RoleFormPage_section_122_ng_container_8_div_53_div_1_Template, 9, 3, "div", 140);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r8.permissionPackPresets());
} }
function RoleFormPage_section_122_ng_container_8_ng_template_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 138);
    i0.ɵɵtext(1, "No permission packs available.");
    i0.ɵɵelementEnd();
} }
function RoleFormPage_section_122_ng_container_8_span_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 138);
    i0.ɵɵtext(1, "No additions");
    i0.ɵɵelementEnd();
} }
function RoleFormPage_section_122_ng_container_8_span_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 144);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const key_r23 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r8.permissionLabel(key_r23));
} }
function RoleFormPage_section_122_ng_container_8_span_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 138);
    i0.ɵɵtext(1, "No removals");
    i0.ɵɵelementEnd();
} }
function RoleFormPage_section_122_ng_container_8_span_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 145);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const key_r24 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r8.permissionLabel(key_r24));
} }
function RoleFormPage_section_122_ng_container_8_span_93_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 146);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const label_r25 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", label_r25, " ");
} }
function RoleFormPage_section_122_ng_container_8_span_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 138);
    i0.ɵɵtext(1, "No permissions selected");
    i0.ɵɵelementEnd();
} }
function RoleFormPage_section_122_ng_container_8_span_101_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 146);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const key_r26 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r8.permissionLabel(key_r26), " ");
} }
function RoleFormPage_section_122_ng_container_8_span_102_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 138);
    i0.ɵɵtext(1, "No inherited permissions");
    i0.ɵɵelementEnd();
} }
function RoleFormPage_section_122_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "p-tabs", 98);
    i0.ɵɵlistener("valueChange", function RoleFormPage_section_122_ng_container_8_Template_p_tabs_valueChange_1_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r8 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r8.onPermissionTabChange($event)); });
    i0.ɵɵelementStart(2, "p-tablist")(3, "p-tab", 99);
    i0.ɵɵtext(4, "All Permissions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p-tab", 100);
    i0.ɵɵtext(6, "Presets");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p-tab", 101);
    i0.ɵɵtext(8, "Drift");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p-tab", 102);
    i0.ɵɵtext(10, "Effective Access");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p-tabpanels")(12, "p-tabpanel", 99)(13, "p", 103);
    i0.ɵɵtext(14, " Review and edit granular permissions by capability. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p-tabs", 104);
    i0.ɵɵlistener("valueChange", function RoleFormPage_section_122_ng_container_8_Template_p_tabs_valueChange_15_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r8 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r8.onPermissionActionTabChange($event)); });
    i0.ɵɵelementStart(16, "p-tablist")(17, "p-tab", 105);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p-tab", 106);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p-tab", 107);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "p-tabpanels")(24, "p-tabpanel", 105)(25, "div", 108);
    i0.ɵɵtemplate(26, RoleFormPage_section_122_ng_container_8_div_26_Template, 8, 3, "div", 109);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(27, RoleFormPage_section_122_ng_container_8_p_27_Template, 2, 0, "p", 110);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "p-tabpanel", 106)(29, "div", 108);
    i0.ɵɵtemplate(30, RoleFormPage_section_122_ng_container_8_div_30_Template, 8, 3, "div", 109);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(31, RoleFormPage_section_122_ng_container_8_p_31_Template, 2, 0, "p", 110);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "p-tabpanel", 107)(33, "div", 108);
    i0.ɵɵtemplate(34, RoleFormPage_section_122_ng_container_8_div_34_Template, 8, 3, "div", 109);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(35, RoleFormPage_section_122_ng_container_8_p_35_Template, 2, 0, "p", 110);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(36, "p-tabpanel", 100)(37, "p", 103);
    i0.ɵɵtext(38, " Apply intent packs or hierarchy presets as a baseline. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 111)(40, "div", 112)(41, "h4");
    i0.ɵɵtext(42, "Role intent packs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "p");
    i0.ɵɵtext(44, "Pick a baseline role intent and apply its permissions.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(45, RoleFormPage_section_122_ng_container_8_div_45_Template, 2, 1, "div", 113)(46, RoleFormPage_section_122_ng_container_8_ng_template_46_Template, 2, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "div", 112)(49, "h4");
    i0.ɵɵtext(50, "Hierarchy permission presets");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(51, "p");
    i0.ɵɵtext(52, "Use H1/H2/H3 permission packs as a starting point.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(53, RoleFormPage_section_122_ng_container_8_div_53_Template, 2, 1, "div", 113)(54, RoleFormPage_section_122_ng_container_8_ng_template_54_Template, 2, 0, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(56, "p-tabpanel", 101)(57, "p", 103);
    i0.ɵɵtext(58, " Review current changes vs base pack, then accept or reset. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "div", 114)(60, "h4");
    i0.ɵɵtext(61, "Role drift");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "p");
    i0.ɵɵtext(63, "Track changes from the base pack and keep an audit trail.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(64, "div", 115)(65, "div", 116)(66, "span", 117);
    i0.ɵɵtext(67, "Added");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(68, RoleFormPage_section_122_ng_container_8_span_68_Template, 2, 0, "span", 110)(69, RoleFormPage_section_122_ng_container_8_span_69_Template, 2, 1, "span", 118);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "div", 116)(71, "span", 117);
    i0.ɵɵtext(72, "Removed");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(73, RoleFormPage_section_122_ng_container_8_span_73_Template, 2, 0, "span", 110)(74, RoleFormPage_section_122_ng_container_8_span_74_Template, 2, 1, "span", 119);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(75, "div", 120)(76, "button", 121);
    i0.ɵɵlistener("click", function RoleFormPage_section_122_ng_container_8_Template_button_click_76_listener() { i0.ɵɵrestoreView(_r8); const ctx_r8 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r8.resetToDefault()); });
    i0.ɵɵtext(77, " Reset to Default ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "button", 122);
    i0.ɵɵlistener("click", function RoleFormPage_section_122_ng_container_8_Template_button_click_78_listener() { i0.ɵɵrestoreView(_r8); const ctx_r8 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r8.acceptDrift()); });
    i0.ɵɵtext(79, " Accept Drift ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(80, "div", 123)(81, "label", 124);
    i0.ɵɵtext(82, "Drift notes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(83, "textarea", 125);
    i0.ɵɵtwoWayListener("ngModelChange", function RoleFormPage_section_122_ng_container_8_Template_textarea_ngModelChange_83_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r8 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r8.driftNotes, $event) || (ctx_r8.driftNotes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(84, "p-tabpanel", 102)(85, "p", 103);
    i0.ɵɵtext(86, " Verify final permission scope before saving this role. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(87, "div", 112)(88, "h4");
    i0.ɵɵtext(89, "Direct permissions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(90, "p");
    i0.ɵɵtext(91, "Permissions currently selected on this role.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(92, "div", 126);
    i0.ɵɵtemplate(93, RoleFormPage_section_122_ng_container_8_span_93_Template, 2, 1, "span", 127)(94, RoleFormPage_section_122_ng_container_8_span_94_Template, 2, 0, "span", 110);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(95, "div", 112)(96, "h4");
    i0.ɵɵtext(97, "Inherited permissions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(98, "p");
    i0.ɵɵtext(99, "Permissions inherited from parent role hierarchy.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(100, "div", 126);
    i0.ɵɵtemplate(101, RoleFormPage_section_122_ng_container_8_span_101_Template, 2, 1, "span", 127)(102, RoleFormPage_section_122_ng_container_8_span_102_Template, 2, 0, "span", 110);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const noIntentPacks_r27 = i0.ɵɵreference(47);
    const noPackPresets_r28 = i0.ɵɵreference(55);
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r8.activePermissionTab());
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("value", ctx_r8.activePermissionActionTab());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Create & Manage (", ctx_r8.allPermissionActionTabs().createManage, ")");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("View & Analyze (", ctx_r8.allPermissionActionTabs().viewAnalyze, ")");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Governance (", ctx_r8.allPermissionActionTabs().governance, ")");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r8.filteredCapabilityGroups());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r8.filteredCapabilityGroups().length === 0);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r8.filteredCapabilityGroups());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r8.filteredCapabilityGroups().length === 0);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r8.filteredCapabilityGroups());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r8.filteredCapabilityGroups().length === 0);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngIf", ctx_r8.intentPacks().length)("ngIfElse", noIntentPacks_r27);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r8.permissionPackPresets().length)("ngIfElse", noPackPresets_r28);
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("ngIf", ctx_r8.driftSummary().added.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r8.driftSummary().added);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r8.driftSummary().removed.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r8.driftSummary().removed);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r8.roleSaving());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r8.roleSaving());
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r8.driftNotes);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(27, _c0));
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngForOf", ctx_r8.effectivePermissionLabels());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r8.effectivePermissionLabels().length === 0);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngForOf", ctx_r8.inheritedPermissions());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r8.inheritedPermissions().length === 0);
} }
function RoleFormPage_section_122_ng_template_9_p_skeleton_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-skeleton", 149);
} }
function RoleFormPage_section_122_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 147);
    i0.ɵɵtemplate(1, RoleFormPage_section_122_ng_template_9_p_skeleton_1_Template, 1, 0, "p-skeleton", 148);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c1));
} }
function RoleFormPage_section_122_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 93)(1, "div", 94)(2, "h3", 23);
    i0.ɵɵelement(3, "i", 17);
    i0.ɵɵtext(4, " Permissions ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 95)(6, "span", 96);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(8, RoleFormPage_section_122_ng_container_8_Template, 103, 28, "ng-container", 97)(9, RoleFormPage_section_122_ng_template_9_Template, 2, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const permissionsLoading_r29 = i0.ɵɵreference(10);
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", ctx_r8.selectedPermissionCount(), " selected");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r8.loadingPermissions())("ngIfElse", permissionsLoading_r29);
} }
function RoleFormPage_ng_template_123_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 93)(1, "div", 94)(2, "h3", 23);
    i0.ɵɵelement(3, "i", 78);
    i0.ɵɵtext(4, " Permissions ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p", 103);
    i0.ɵɵtext(6, " Permission sets for existing roles are managed in the People & Access \u203A Permission page. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 120)(8, "button", 150)(9, "span", 82);
    i0.ɵɵelement(10, "i", 78);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12, "Open Permission Page");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction0(2, _c2))("queryParams", i0.ɵɵpureFunction1(3, _c3, ctx_r8.currentRoleId()));
} }
function RoleFormPage_section_125_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 146);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const key_r30 = ctx.$implicit;
    const ctx_r8 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r8.permissionLabel(key_r30), " ");
} }
function RoleFormPage_section_125_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 151)(1, "div", 94)(2, "h3", 23);
    i0.ɵɵelement(3, "i", 33);
    i0.ɵɵtext(4, " Inherited Permissions ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 95)(6, "span", 130);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(8, "p", 103);
    i0.ɵɵtext(9, " These permissions are inherited from parent roles and cannot be edited here. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 126);
    i0.ɵɵtemplate(11, RoleFormPage_section_125_span_11_Template, 2, 1, "span", 127);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate1("", ctx_r8.inheritedPermissions().length, " inherited");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r8.inheritedPermissions());
} }
function RoleFormPage_section_166_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 152)(1, "h4");
    i0.ɵɵelement(2, "i", 153);
    i0.ɵɵtext(3, " Editing Note");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5, " Permission sets are managed from the dedicated ");
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7, "Permission");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8, " page for existing roles. ");
    i0.ɵɵelementEnd()();
} }
export class RoleFormPage {
    dataService = inject(UserAdminDataService);
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    router = inject(Router);
    toastService = inject(AppToastService);
    permissionCatalog = signal([], ...(ngDevMode ? [{ debugName: "permissionCatalog" }] : []));
    loadingPermissions = signal(true, ...(ngDevMode ? [{ debugName: "loadingPermissions" }] : []));
    loadingRole = signal(false, ...(ngDevMode ? [{ debugName: "loadingRole" }] : []));
    loadingRoles = signal(false, ...(ngDevMode ? [{ debugName: "loadingRoles" }] : []));
    roleSaving = signal(false, ...(ngDevMode ? [{ debugName: "roleSaving" }] : []));
    isEditMode = signal(false, ...(ngDevMode ? [{ debugName: "isEditMode" }] : []));
    isSystemRole = signal(false, ...(ngDevMode ? [{ debugName: "isSystemRole" }] : []));
    canManageAdmin = signal(false, ...(ngDevMode ? [{ debugName: "canManageAdmin" }] : []));
    roles = signal([], ...(ngDevMode ? [{ debugName: "roles" }] : []));
    intentPacks = signal([], ...(ngDevMode ? [{ debugName: "intentPacks" }] : []));
    loadingIntentPacks = signal(false, ...(ngDevMode ? [{ debugName: "loadingIntentPacks" }] : []));
    permissionPackPresets = signal([], ...(ngDevMode ? [{ debugName: "permissionPackPresets" }] : []));
    loadingPackPresets = signal(false, ...(ngDevMode ? [{ debugName: "loadingPackPresets" }] : []));
    activePermissionTab = signal('all-permissions', ...(ngDevMode ? [{ debugName: "activePermissionTab" }] : []));
    activePermissionActionTab = signal('create-manage', ...(ngDevMode ? [{ debugName: "activePermissionActionTab" }] : []));
    basePermissions = signal([], ...(ngDevMode ? [{ debugName: "basePermissions" }] : []));
    inheritedPermissions = signal([], ...(ngDevMode ? [{ debugName: "inheritedPermissions" }] : []));
    driftNotes = '';
    visibilityOptions = [
        { label: 'Team (default)', value: 'Team', hint: 'See own + descendant roles', icon: 'pi-users' },
        { label: 'Self only', value: 'Self', hint: 'See only own records', icon: 'pi-user' },
        { label: 'All', value: 'All', hint: 'See all records', icon: 'pi-globe' }
    ];
    securityLevels = signal([], ...(ngDevMode ? [{ debugName: "securityLevels" }] : []));
    loadingSecurityLevels = signal(false, ...(ngDevMode ? [{ debugName: "loadingSecurityLevels" }] : []));
    securityOptions = computed(() => this.securityLevels()
        .slice()
        .sort((a, b) => a.rank - b.rank)
        .map(level => ({
        label: level.name,
        value: level.id,
        hint: level.description ?? `Rank ${level.rank}`
    })), ...(ngDevMode ? [{ debugName: "securityOptions" }] : []));
    // Selected permissions as a Set for easy toggle
    selectedPermissions = signal(new Set(), ...(ngDevMode ? [{ debugName: "selectedPermissions" }] : []));
    capabilityGroups = computed(() => {
        const catalog = this.permissionCatalog();
        const groups = new Map();
        for (const permission of catalog) {
            const key = permission.capability || 'General';
            if (!groups.has(key)) {
                groups.set(key, []);
            }
            groups.get(key).push(permission);
        }
        return Array.from(groups.entries()).map(([capability, permissions]) => ({
            capability,
            permissions: permissions.slice().sort((a, b) => a.label.localeCompare(b.label))
        }));
    }, ...(ngDevMode ? [{ debugName: "capabilityGroups" }] : []));
    allPermissionActionTabs = computed(() => {
        const all = this.permissionCatalog();
        const createManage = all.filter((permission) => this.permissionBucket(permission) === 'create-manage').length;
        const viewAnalyze = all.filter((permission) => this.permissionBucket(permission) === 'view-analyze').length;
        const governance = all.filter((permission) => this.permissionBucket(permission) === 'governance').length;
        return {
            createManage,
            viewAnalyze,
            governance
        };
    }, ...(ngDevMode ? [{ debugName: "allPermissionActionTabs" }] : []));
    filteredCapabilityGroups = computed(() => {
        const bucket = this.activePermissionActionTab();
        return this.capabilityGroups()
            .map((group) => ({
            capability: group.capability,
            permissions: group.permissions.filter((permission) => this.permissionBucket(permission) === bucket)
        }))
            .filter((group) => group.permissions.length > 0);
    }, ...(ngDevMode ? [{ debugName: "filteredCapabilityGroups" }] : []));
    driftSummary = computed(() => {
        const current = this.selectedPermissions();
        const base = new Set(this.basePermissions());
        const added = Array.from(current).filter((permission) => !base.has(permission));
        const removed = Array.from(base).filter((permission) => !current.has(permission));
        return { added, removed };
    }, ...(ngDevMode ? [{ debugName: "driftSummary" }] : []));
    effectivePermissionLabels = computed(() => Array.from(this.selectedPermissions())
        .map((permission) => this.permissionLabel(permission))
        .sort((a, b) => a.localeCompare(b)), ...(ngDevMode ? [{ debugName: "effectivePermissionLabels" }] : []));
    roleForm = this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.maxLength(80)]],
        description: ['', [Validators.maxLength(240)]],
        parentRoleId: [null],
        visibilityScope: ['Team'],
        securityLevelId: [null],
        permissions: [[]]
    });
    // Screen permission matrix - maps screens to CRUD permissions
    screenPermissions = signal([
        {
            screenName: 'Dashboard',
            screenKey: 'Dashboard',
            icon: 'pi-th-large',
            description: 'View analytics and KPIs',
            permissions: {
                create: null,
                read: 'Permissions.Dashboard.View',
                update: null,
                delete: null
            }
        },
        {
            screenName: 'Customers',
            screenKey: 'Customers',
            icon: 'pi-building',
            description: 'Manage customer accounts',
            permissions: {
                create: 'Permissions.Customers.Manage',
                read: 'Permissions.Customers.View',
                update: 'Permissions.Customers.Manage',
                delete: 'Permissions.Customers.Manage'
            }
        },
        {
            screenName: 'Contacts',
            screenKey: 'Contacts',
            icon: 'pi-users',
            description: 'Manage contact records',
            permissions: {
                create: 'Permissions.Contacts.Manage',
                read: 'Permissions.Contacts.View',
                update: 'Permissions.Contacts.Manage',
                delete: 'Permissions.Contacts.Manage'
            }
        },
        {
            screenName: 'Leads',
            screenKey: 'Leads',
            icon: 'pi-bolt',
            description: 'Track and convert leads',
            permissions: {
                create: 'Permissions.Leads.Manage',
                read: 'Permissions.Leads.View',
                update: 'Permissions.Leads.Manage',
                delete: 'Permissions.Leads.Manage'
            }
        },
        {
            screenName: 'Opportunities',
            screenKey: 'Opportunities',
            icon: 'pi-dollar',
            description: 'Manage sales pipeline',
            permissions: {
                create: 'Permissions.Opportunities.Manage',
                read: 'Permissions.Opportunities.View',
                update: 'Permissions.Opportunities.Manage',
                delete: 'Permissions.Opportunities.Manage'
            }
        },
        {
            screenName: 'Activities',
            screenKey: 'Activities',
            icon: 'pi-calendar',
            description: 'Schedule and track activities',
            permissions: {
                create: 'Permissions.Activities.Manage',
                read: 'Permissions.Activities.View',
                update: 'Permissions.Activities.Manage',
                delete: 'Permissions.Activities.Manage'
            }
        },
        {
            screenName: 'Marketing',
            screenKey: 'Marketing',
            icon: 'pi-megaphone',
            description: 'Manage campaigns and attribution',
            permissions: {
                create: 'Permissions.Marketing.Manage',
                read: 'Permissions.Marketing.View',
                update: 'Permissions.Marketing.Manage',
                delete: 'Permissions.Marketing.Manage'
            }
        },
        {
            screenName: 'Help Desk',
            screenKey: 'HelpDesk',
            icon: 'pi-headphones',
            description: 'Manage support cases, queues, and SLA policy',
            permissions: {
                create: 'Permissions.HelpDesk.Manage',
                read: 'Permissions.HelpDesk.View',
                update: 'Permissions.HelpDesk.Manage',
                delete: 'Permissions.HelpDesk.Admin'
            }
        },
        {
            screenName: 'Administration',
            screenKey: 'Administration',
            icon: 'pi-cog',
            description: 'System settings and users',
            permissions: {
                create: 'Permissions.Administration.Manage',
                read: 'Permissions.Administration.View',
                update: 'Permissions.Administration.Manage',
                delete: 'Permissions.Administration.Manage'
            }
        },
        {
            screenName: 'Tenants',
            screenKey: 'Tenants',
            icon: 'pi-sitemap',
            description: 'Multi-tenant management',
            permissions: {
                create: 'Permissions.Tenants.Manage',
                read: 'Permissions.Tenants.View',
                update: 'Permissions.Tenants.Manage',
                delete: 'Permissions.Tenants.Manage'
            }
        }
    ], ...(ngDevMode ? [{ debugName: "screenPermissions" }] : []));
    roleId = null;
    constructor() {
        this.canManageAdmin.set(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage));
        this.roleId = this.route.snapshot.paramMap.get('id');
        this.isEditMode.set(!!this.roleId);
        this.loadPermissions();
        this.loadIntentPacks();
        this.loadPermissionPackPresets();
        this.loadRoles();
        this.loadSecurityLevels();
        if (this.roleId) {
            this.loadRole(this.roleId);
        }
    }
    // Check if a permission is selected
    isPermissionSelected(permissionKey) {
        if (!permissionKey)
            return false;
        return this.selectedPermissions().has(permissionKey);
    }
    // Toggle a permission
    togglePermission(permissionKey) {
        if (!permissionKey || this.roleSaving())
            return;
        const current = new Set(this.selectedPermissions());
        if (current.has(permissionKey)) {
            current.delete(permissionKey);
        }
        else {
            current.add(permissionKey);
        }
        this.selectedPermissions.set(current);
        this.syncFormPermissions();
    }
    // Toggle all CRUD for a screen row
    toggleAllForScreen(screen, checked) {
        if (this.roleSaving())
            return;
        const current = new Set(this.selectedPermissions());
        const perms = [screen.permissions.create, screen.permissions.read, screen.permissions.update, screen.permissions.delete];
        perms.forEach(p => {
            if (p) {
                if (checked) {
                    current.add(p);
                }
                else {
                    current.delete(p);
                }
            }
        });
        this.selectedPermissions.set(current);
        this.syncFormPermissions();
    }
    // Check if all permissions for a screen are selected
    isAllSelectedForScreen(screen) {
        const perms = [screen.permissions.create, screen.permissions.read, screen.permissions.update, screen.permissions.delete]
            .filter(p => p !== null);
        if (perms.length === 0)
            return false;
        return perms.every(p => this.selectedPermissions().has(p));
    }
    // Check if some (but not all) permissions for a screen are selected
    isSomeSelectedForScreen(screen) {
        const perms = [screen.permissions.create, screen.permissions.read, screen.permissions.update, screen.permissions.delete]
            .filter(p => p !== null);
        if (perms.length === 0)
            return false;
        const selectedCount = perms.filter(p => this.selectedPermissions().has(p)).length;
        return selectedCount > 0 && selectedCount < perms.length;
    }
    // Sync selected permissions to form
    syncFormPermissions() {
        this.roleForm.patchValue({
            permissions: Array.from(this.selectedPermissions())
        });
    }
    applyIntentPack(pack) {
        if (this.roleSaving() || !pack?.permissions?.length) {
            return;
        }
        this.selectedPermissions.set(new Set(pack.permissions));
        this.syncFormPermissions();
    }
    applyPermissionPack(pack) {
        if (this.roleSaving() || !pack?.permissions?.length) {
            return;
        }
        this.selectedPermissions.set(new Set(pack.permissions));
        this.syncFormPermissions();
    }
    resetToDefault() {
        if (this.roleSaving()) {
            return;
        }
        const base = this.basePermissions();
        if (!base.length) {
            this.raiseToast('error', 'No base pack found for this role.');
            return;
        }
        this.selectedPermissions.set(new Set(base));
        this.syncFormPermissions();
    }
    acceptDrift() {
        if (!this.roleId || this.roleSaving()) {
            return;
        }
        const permissions = (this.roleForm.value.permissions ?? []);
        if (permissions.length === 0) {
            this.raiseToast('error', 'Select at least one permission');
            return;
        }
        const payload = {
            name: this.roleForm.value.name?.trim() ?? '',
            description: this.roleForm.value.description?.trim() || undefined,
            parentRoleId: this.roleForm.value.parentRoleId ?? null,
            visibilityScope: this.roleForm.value.visibilityScope ?? 'Team',
            securityLevelId: this.roleForm.value.securityLevelId ?? this.defaultSecurityLevelId(),
            permissions,
            acceptDrift: true,
            driftNotes: this.driftNotes?.trim() || undefined
        };
        this.roleSaving.set(true);
        this.dataService.updateRole(this.roleId, payload).subscribe({
            next: (role) => {
                this.roleSaving.set(false);
                this.applyRole(role);
                this.raiseToast('success', 'Drift accepted and base pack updated.');
            },
            error: () => {
                this.roleSaving.set(false);
                this.raiseToast('error', 'Unable to accept drift');
            }
        });
    }
    loadPermissions() {
        this.loadingPermissions.set(true);
        this.dataService.getPermissionCatalog().subscribe({
            next: (permissions) => {
                this.permissionCatalog.set(permissions);
                this.loadingPermissions.set(false);
            },
            error: () => {
                this.loadingPermissions.set(false);
                this.raiseToast('error', 'Unable to load permissions');
            }
        });
    }
    loadIntentPacks() {
        this.loadingIntentPacks.set(true);
        this.dataService.getRoleIntentPacks().subscribe({
            next: (packs) => {
                this.intentPacks.set(packs ?? []);
                this.loadingIntentPacks.set(false);
            },
            error: () => {
                this.intentPacks.set([]);
                this.loadingIntentPacks.set(false);
            }
        });
    }
    loadPermissionPackPresets() {
        this.loadingPackPresets.set(true);
        this.dataService.getPermissionPackPresets().subscribe({
            next: (packs) => {
                this.permissionPackPresets.set(packs ?? []);
                this.loadingPackPresets.set(false);
            },
            error: () => {
                this.permissionPackPresets.set([]);
                this.loadingPackPresets.set(false);
            }
        });
    }
    loadRole(id) {
        this.loadingRole.set(true);
        this.dataService.getRole(id).subscribe({
            next: (role) => {
                this.loadingRole.set(false);
                this.applyRole(role);
            },
            error: () => {
                this.loadingRole.set(false);
                this.raiseToast('error', 'Role not found');
                this.router.navigate(['/app/settings/roles']);
            }
        });
    }
    applyRole(role) {
        this.roleForm.patchValue({
            name: role.name,
            description: role.description ?? '',
            parentRoleId: role.parentRoleId ?? null,
            visibilityScope: role.visibilityScope ?? 'Team',
            securityLevelId: role.securityLevelId ?? this.defaultSecurityLevelId(),
            permissions: [...role.permissions]
        });
        // Populate selected permissions from role
        this.selectedPermissions.set(new Set(role.permissions));
        this.basePermissions.set(role.basePermissions ?? []);
        this.inheritedPermissions.set(role.inheritedPermissions ?? []);
        this.driftNotes = role.driftNotes ?? '';
        this.isSystemRole.set(role.isSystem);
    }
    saveRole() {
        if (this.roleForm.invalid) {
            this.roleForm.markAllAsTouched();
            return;
        }
        const permissions = (this.roleForm.value.permissions ?? []);
        if (permissions.length === 0) {
            this.roleForm.get('permissions')?.setErrors({ required: true });
            this.raiseToast('error', 'Select at least one permission');
            return;
        }
        const payload = {
            name: this.roleForm.value.name?.trim() ?? '',
            description: this.roleForm.value.description?.trim() || undefined,
            parentRoleId: this.roleForm.value.parentRoleId ?? null,
            visibilityScope: this.roleForm.value.visibilityScope ?? 'Team',
            securityLevelId: this.roleForm.value.securityLevelId ?? this.defaultSecurityLevelId(),
            permissions,
            driftNotes: this.driftNotes?.trim() || undefined
        };
        this.roleSaving.set(true);
        const request$ = this.roleId
            ? this.dataService.updateRole(this.roleId, payload)
            : this.dataService.createRole(payload);
        request$.subscribe({
            next: () => {
                this.roleSaving.set(false);
                const message = this.roleId ? 'Role updated' : 'Role created';
                this.raiseToast('success', message);
            },
            error: () => {
                this.roleSaving.set(false);
                this.raiseToast('error', 'Unable to save role');
            }
        });
    }
    selectedPermissionCount() {
        const permissions = (this.roleForm.value.permissions ?? []);
        return permissions.length;
    }
    currentRoleId() {
        return this.roleId;
    }
    parentRoleOptions() {
        const currentId = this.roleId;
        return this.roles()
            .filter(role => role.id !== currentId)
            .map((role) => ({
            label: role.name,
            value: role.id,
            meta: role.hierarchyLevel ? `H${role.hierarchyLevel}` : 'H?'
        }));
    }
    hierarchyPreviewLabel() {
        const parentId = this.roleForm.value.parentRoleId ?? null;
        if (!parentId) {
            return 'H1 (top level)';
        }
        const parent = this.roles().find(role => role.id === parentId);
        if (!parent?.hierarchyLevel) {
            return 'H?';
        }
        return `H${parent.hierarchyLevel + 1}`;
    }
    loadRoles() {
        this.loadingRoles.set(true);
        this.dataService.getRoles().subscribe({
            next: (roles) => {
                this.roles.set(roles ?? []);
                this.loadingRoles.set(false);
            },
            error: () => {
                this.loadingRoles.set(false);
                this.raiseToast('error', 'Unable to load roles');
            }
        });
    }
    loadSecurityLevels() {
        this.loadingSecurityLevels.set(true);
        this.dataService.getSecurityLevels().subscribe({
            next: (levels) => {
                this.securityLevels.set(levels ?? []);
                this.loadingSecurityLevels.set(false);
                if (!this.roleForm.value.securityLevelId) {
                    this.roleForm.patchValue({
                        securityLevelId: this.defaultSecurityLevelId()
                    });
                }
            },
            error: () => {
                this.securityLevels.set([]);
                this.loadingSecurityLevels.set(false);
            }
        });
    }
    defaultSecurityLevelId() {
        const levels = this.securityLevels();
        if (levels.length === 0) {
            return null;
        }
        const defaultLevel = levels.find(level => level.isDefault);
        return (defaultLevel ?? levels[0]).id;
    }
    clearToast() {
        this.toastService.clear();
    }
    onPermissionTabChange(next) {
        if (next === 'all-permissions' ||
            next === 'presets' ||
            next === 'drift' ||
            next === 'effective-access') {
            this.activePermissionTab.set(next);
            return;
        }
        this.activePermissionTab.set('all-permissions');
    }
    onPermissionActionTabChange(next) {
        if (next === 'create-manage' || next === 'view-analyze' || next === 'governance') {
            this.activePermissionActionTab.set(next);
            return;
        }
        this.activePermissionActionTab.set('create-manage');
    }
    permissionLabel(key) {
        return this.permissionCatalog().find((item) => item.key === key)?.label ?? key;
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    permissionBucket(permission) {
        const key = `${permission.key ?? ''} ${permission.label ?? ''}`.toLowerCase();
        if (key.includes('.view') ||
            key.includes(' view') ||
            key.includes('report') ||
            key.includes('analy') ||
            key.includes('export')) {
            return 'view-analyze';
        }
        if (key.includes('approve') ||
            key.includes('override') ||
            key.includes('audit') ||
            key.includes('administration') ||
            key.includes('tenant')) {
            return 'governance';
        }
        return 'create-manage';
    }
    static ɵfac = function RoleFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RoleFormPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RoleFormPage, selectors: [["app-role-form-page"]], decls: 178, vars: 27, consts: [["editPermissionsMoved", ""], ["permissionsLoading", ""], ["noIntentPacks", ""], ["noPackPresets", ""], [1, "role-form-page"], [1, "form-header"], [1, "header-content"], ["pButton", "", "type", "button", "routerLink", "/app/settings/roles", 1, "back-link"], [1, "pi", "pi-arrow-left"], [1, "header-row"], [1, "header-title"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "header-meta"], [1, "status-pill", 3, "ngClass"], [1, "meta-chip"], [1, "pi", "pi-shield"], [1, "form-body"], [1, "role-form", "role-form--compact", 3, "ngSubmit", "formGroup"], [1, "form-layout"], [1, "form-main"], [1, "form-section"], [1, "section-title"], [1, "pi", "pi-id-card"], [1, "details-kpis"], [1, "kpi-item", "kpi-item--primary"], [1, "kpi-icon"], [1, "pi", "pi-check-square"], [1, "kpi-content"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-item", "kpi-item--cyan"], [1, "pi", "pi-sitemap"], [1, "kpi-item", "kpi-item--purple"], [1, "pi", "pi-server"], [1, "form-grid"], [1, "form-field"], ["for", "roleName"], [1, "required"], [1, "field-body"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-tag"], ["pInputText", "", "id", "roleName", "formControlName", "name", "placeholder", "e.g. Sales Manager", 3, "readonly"], ["class", "field-hint field-hint--guidance", 4, "ngIf"], ["for", "roleDesc"], [1, "icon-addon", "icon-addon--notes"], [1, "pi", "pi-align-left"], ["pInputText", "", "id", "roleDesc", "formControlName", "description", "placeholder", "Brief description of this role's purpose"], ["for", "role-hierarchyLevel"], [1, "icon-addon", "icon-addon--status"], ["pInputText", "", "id", "role-hierarchyLevel", "readonly", "", 3, "value"], [1, "field-hint", "field-hint--guidance"], ["for", "visibilityScope"], ["inputId", "visibilityScope", "formControlName", "visibilityScope", "optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", 3, "options"], ["pTemplate", "item"], ["pTemplate", "selectedItem"], ["for", "securityLevel"], ["inputId", "securityLevel", "formControlName", "securityLevelId", "optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", "placeholder", "Select security level", 3, "options", "disabled"], ["routerLink", "/app/settings/security-levels"], ["for", "roleParent"], ["inputId", "roleParent", "formControlName", "parentRoleId", "optionLabel", "label", "optionValue", "value", "placeholder", "Top-level role", "appendTo", "body", "styleClass", "w-full", 3, "options"], [1, "role-pack-link"], [1, "pi", "pi-th-large"], ["routerLink", "/app/settings/dashboard-packs"], ["class", "form-section permissions-section", 4, "ngIf", "ngIfElse"], ["class", "form-section inherited-section", 4, "ngIf"], [1, "form-rail"], [1, "rail-card", "rail-card--snapshot"], [1, "pi", "pi-chart-bar"], [1, "rail-list"], [1, "rail-row"], [1, "rail-value--primary"], [1, "rail-value--cyan"], [1, "rail-card"], [1, "pi", "pi-cog"], [1, "rail-links"], ["routerLink", "/app/settings/permissions"], [1, "pi", "pi-lock"], ["class", "rail-card rail-card--notice", 4, "ngIf"], [1, "form-actions"], ["type", "button", "routerLink", "/app/settings/roles", 1, "action-btn", "action-btn--back", 3, "disabled"], [1, "action-btn__icon"], [1, "pi", "pi-times"], ["type", "submit", 1, "action-btn", "action-btn--add", 3, "disabled"], [1, "pi", "pi-check"], [1, "select-option"], [1, "pi", 3, "ngClass"], [1, "select-meta"], ["class", "select-option", 4, "ngIf"], ["class", "select-placeholder", 4, "ngIf"], [1, "select-placeholder"], [1, "pi", "pi-users"], [1, "form-section", "permissions-section"], [1, "permissions-header"], [1, "permission-meta"], [1, "badge"], [4, "ngIf", "ngIfElse"], [1, "permission-tabs", 3, "valueChange", "value"], ["value", "all-permissions"], ["value", "presets"], ["value", "drift"], ["value", "effective-access"], [1, "section-description"], [1, "permission-action-tabs", 3, "valueChange", "value"], ["value", "create-manage"], ["value", "view-analyze"], ["value", "governance"], [1, "capability-grid"], ["class", "capability-card", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "intent-grid"], [1, "intent-card"], ["class", "intent-list", 4, "ngIf", "ngIfElse"], [1, "intent-card", "drift-card"], [1, "drift-list"], [1, "drift-column"], [1, "drift-title"], ["class", "drift-pill", 4, "ngFor", "ngForOf"], ["class", "drift-pill removed", 4, "ngFor", "ngForOf"], [1, "drift-actions"], ["pButton", "", "type", "button", 1, "btn-ghost", 3, "click", "disabled"], ["pButton", "", "type", "button", 1, "btn-primary", 3, "click", "disabled"], [1, "drift-notes"], ["for", "driftNotes"], ["id", "driftNotes", "rows", "3", "pInputTextarea", "", "placeholder", "Explain why this role differs from the base pack.", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "inherited-pills"], ["class", "permission-pill", 4, "ngFor", "ngForOf"], [1, "capability-card"], [1, "capability-header"], [1, "badge", "muted"], [1, "capability-list"], ["class", "capability-row", 4, "ngFor", "ngForOf"], [1, "capability-row"], [1, "capability-meta"], [1, "capability-label"], [1, "capability-desc"], [3, "onChange", "binary", "ngModel", "ngModelOptions", "disabled"], [1, "empty-state"], [1, "intent-list"], ["class", "intent-row", 4, "ngFor", "ngForOf"], [1, "intent-row"], [1, "intent-title-row"], ["pButton", "", "type", "button", 1, "btn-secondary", "btn-sm", 3, "click", "disabled"], [1, "drift-pill"], [1, "drift-pill", "removed"], [1, "permission-pill"], [1, "loading-blocks"], ["height", "52px", 4, "ngFor", "ngForOf"], ["height", "52px"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "routerLink", "queryParams"], [1, "form-section", "inherited-section"], [1, "rail-card", "rail-card--notice"], [1, "pi", "pi-info-circle"]], template: function RoleFormPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "section", 4)(1, "div", 5)(2, "div", 6);
            i0.ɵɵelement(3, "app-breadcrumbs");
            i0.ɵɵelementStart(4, "button", 7);
            i0.ɵɵelement(5, "i", 8);
            i0.ɵɵtext(6, " Back to Roles ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div", 9)(8, "div", 10)(9, "h1", 11)(10, "span", 12);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 13);
            i0.ɵɵtext(13, "Role");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "p");
            i0.ɵɵtext(15, "Define what your team can see and do with a clean, consistent permission model.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 14)(17, "span", 15);
            i0.ɵɵtext(18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "span", 16);
            i0.ɵɵelement(20, "i", 17);
            i0.ɵɵtext(21);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(22, "div", 18)(23, "form", 19);
            i0.ɵɵlistener("ngSubmit", function RoleFormPage_Template_form_ngSubmit_23_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.saveRole()); });
            i0.ɵɵelementStart(24, "div", 20)(25, "div", 21)(26, "section", 22)(27, "h3", 23);
            i0.ɵɵelement(28, "i", 24);
            i0.ɵɵtext(29, " Role Details ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 25)(31, "div", 26)(32, "div", 27);
            i0.ɵɵelement(33, "i", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 29)(35, "span", 30);
            i0.ɵɵtext(36, "Selected Permissions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "strong", 31);
            i0.ɵɵtext(38);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(39, "div", 32)(40, "div", 27);
            i0.ɵɵelement(41, "i", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "div", 29)(43, "span", 30);
            i0.ɵɵtext(44, "Inherited Permissions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "strong", 31);
            i0.ɵɵtext(46);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(47, "div", 34)(48, "div", 27);
            i0.ɵɵelement(49, "i", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "div", 29)(51, "span", 30);
            i0.ɵɵtext(52, "Hierarchy Preview");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "strong", 31);
            i0.ɵɵtext(54);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(55, "div", 36)(56, "div", 37)(57, "label", 38);
            i0.ɵɵtext(58, "Role Name ");
            i0.ɵɵelementStart(59, "span", 39);
            i0.ɵɵtext(60, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(61, "div", 40)(62, "p-inputgroup")(63, "p-inputgroup-addon", 41);
            i0.ɵɵelement(64, "i", 42);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(65, "input", 43);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(66, RoleFormPage_small_66_Template, 2, 0, "small", 44);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(67, "div", 37)(68, "label", 45);
            i0.ɵɵtext(69, "Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "p-inputgroup")(71, "p-inputgroup-addon", 46);
            i0.ɵɵelement(72, "i", 47);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(73, "input", 48);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(74, "div", 37)(75, "label", 49);
            i0.ɵɵtext(76, "Hierarchy Level");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "div", 40)(78, "p-inputgroup")(79, "p-inputgroup-addon", 50);
            i0.ɵɵelement(80, "i", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(81, "input", 51);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(82, "small", 52);
            i0.ɵɵtext(83, "Derived from parent role (no manual level input).");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(84, "div", 37)(85, "label", 53);
            i0.ɵɵtext(86, "Visibility Scope");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(87, "div", 40)(88, "p-select", 54);
            i0.ɵɵtemplate(89, RoleFormPage_ng_template_89_Template, 6, 3, "ng-template", 55)(90, RoleFormPage_ng_template_90_Template, 2, 2, "ng-template", 56);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "small", 52);
            i0.ɵɵtext(92, "Controls reporting rollups and default visibility for this role.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(93, "div", 37)(94, "label", 57);
            i0.ɵɵtext(95, "Security Level");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "div", 40)(97, "p-select", 58);
            i0.ɵɵtemplate(98, RoleFormPage_ng_template_98_Template, 6, 2, "ng-template", 55)(99, RoleFormPage_ng_template_99_Template, 2, 2, "ng-template", 56);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(100, "small", 52);
            i0.ɵɵtext(101, "Controls high-risk actions (approvals, overrides, admin changes).");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(102, "small", 52);
            i0.ɵɵtext(103, " Manage levels in ");
            i0.ɵɵelementStart(104, "a", 59);
            i0.ɵɵtext(105, "People & Access \u203A Security Level");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(106, ". ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(107, "div", 37)(108, "label", 60);
            i0.ɵɵtext(109, "Parent Role");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(110, "div", 40)(111, "p-select", 61);
            i0.ɵɵtemplate(112, RoleFormPage_ng_template_112_Template, 6, 2, "ng-template", 55)(113, RoleFormPage_ng_template_113_Template, 2, 2, "ng-template", 56);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(114, "small", 52);
            i0.ɵɵtext(115);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(116, "div", 62);
            i0.ɵɵelement(117, "i", 63);
            i0.ɵɵelementStart(118, "span");
            i0.ɵɵtext(119, "Manage default dashboard pack for this hierarchy level");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(120, "a", 64);
            i0.ɵɵtext(121, "Open dashboard packs");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(122, RoleFormPage_section_122_Template, 11, 3, "section", 65)(123, RoleFormPage_ng_template_123_Template, 13, 5, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(125, RoleFormPage_section_125_Template, 12, 2, "section", 66);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(126, "aside", 67)(127, "section", 68)(128, "h4");
            i0.ɵɵelement(129, "i", 69);
            i0.ɵɵtext(130, " Role Snapshot");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(131, "div", 70)(132, "div", 71)(133, "span");
            i0.ɵɵtext(134, "Mode");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(135, "strong");
            i0.ɵɵtext(136);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(137, "div", 71)(138, "span");
            i0.ɵɵtext(139, "Role Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(140, "strong");
            i0.ɵɵtext(141);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(142, "div", 71)(143, "span");
            i0.ɵɵtext(144, "Permissions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(145, "strong", 72);
            i0.ɵɵtext(146);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(147, "div", 71)(148, "span");
            i0.ɵɵtext(149, "Inherited");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(150, "strong", 73);
            i0.ɵɵtext(151);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(152, "section", 74)(153, "h4");
            i0.ɵɵelement(154, "i", 75);
            i0.ɵɵtext(155, " Related Settings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(156, "div", 76)(157, "a", 77);
            i0.ɵɵelement(158, "i", 78);
            i0.ɵɵtext(159, " Open Permission Sets ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(160, "a", 59);
            i0.ɵɵelement(161, "i", 17);
            i0.ɵɵtext(162, " Open Security Levels ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(163, "a", 64);
            i0.ɵɵelement(164, "i", 63);
            i0.ɵɵtext(165, " Open Dashboard Packs ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(166, RoleFormPage_section_166_Template, 9, 0, "section", 79);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(167, "div", 80)(168, "button", 81)(169, "span", 82);
            i0.ɵɵelement(170, "i", 83);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(171, "span");
            i0.ɵɵtext(172, "Cancel");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(173, "button", 84)(174, "span", 82);
            i0.ɵɵelement(175, "i", 85);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(176, "span");
            i0.ɵɵtext(177);
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            const editPermissionsMoved_r31 = i0.ɵɵreference(124);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Edit" : "Create");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngClass", ctx.isSystemRole() ? "status-pill--system" : "status-pill--custom");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.isSystemRole() ? "System role" : "Custom role", " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.selectedPermissionCount(), " permissions ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.roleForm);
            i0.ɵɵadvance(15);
            i0.ɵɵtextInterpolate(ctx.selectedPermissionCount());
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.inheritedPermissions().length);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.hierarchyPreviewLabel());
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("readonly", ctx.isSystemRole());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSystemRole());
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("value", ctx.hierarchyPreviewLabel());
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("options", ctx.visibilityOptions);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("options", ctx.securityOptions())("disabled", ctx.loadingSecurityLevels());
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("options", ctx.parentRoleOptions());
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1("Hierarchy: ", ctx.hierarchyPreviewLabel());
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", !ctx.isEditMode())("ngIfElse", editPermissionsMoved_r31);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.isEditMode() && ctx.inheritedPermissions().length);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Edit existing role" : "Create new role");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.isSystemRole() ? "System role" : "Custom role");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.selectedPermissionCount());
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.inheritedPermissions().length);
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.roleSaving());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", !ctx.canManageAdmin() || ctx.roleForm.invalid || ctx.roleSaving());
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Update Role" : "Create Role");
        } }, dependencies: [ButtonModule, i1.ButtonDirective, i2.PrimeTemplate, InputTextModule, i3.InputText, TextareaModule, i4.Textarea, SelectModule, i5.Select, InputGroupModule, i6.InputGroup, InputGroupAddonModule, i7.InputGroupAddon, CheckboxModule, i8.Checkbox, TabsModule, i9.Tabs, i9.TabPanels, i9.TabPanel, i9.TabList, i9.Tab, TooltipModule,
            NgClass,
            NgFor,
            NgIf,
            FormsModule, i10.ɵNgNoValidate, i10.DefaultValueAccessor, i10.NgControlStatus, i10.NgControlStatusGroup, i10.NgModel, ReactiveFormsModule, i10.FormGroupDirective, i10.FormControlName, RouterLink,
            SkeletonModule, i11.Skeleton, BreadcrumbsComponent], styles: ["@use '../../../../shared/form-page-styles' as form;\n\n[_nghost-%COMP%] {\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.role-form-page[_ngcontent-%COMP%] {\n  @include form.form-page-base;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.form-header[_ngcontent-%COMP%] {\n  @include form.form-page-header;\n}\n\n.header-content[_ngcontent-%COMP%] {\n  @include form.form-header-content;\n}\n\n.back-link[_ngcontent-%COMP%] {\n  @include form.form-back-link;\n}\n\n.header-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n\n.header-title[_ngcontent-%COMP%] {\n  @include form.form-header-title;\n}\n\n.header-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n\n.status-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n\n  &--system {\n    background: rgba(248, 113, 113, 0.12);\n    color: #b91c1c;\n  }\n\n  &--custom {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n}\n\n.meta-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n\n  i {\n    color: #0ea5e9;\n  }\n}\n\n.form-body[_ngcontent-%COMP%] {\n  @include form.form-container;\n  padding: 0;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.84) 0%, rgba(248, 250, 255, 0.72) 100%);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.62);\n  backdrop-filter: blur(8px) saturate(108%);\n  -webkit-backdrop-filter: blur(8px) saturate(108%);\n}\n\n.role-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n\n.form-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 280px;\n  gap: 0.9rem;\n  align-items: start;\n}\n\n.form-main[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.65rem;\n}\n\n.role-form--compact[_ngcontent-%COMP%] {\n  border-radius: 0;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n  padding: 0;\n}\n\n.details-kpis[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.6rem;\n  margin: 0 0 0.75rem;\n}\n\n.kpi-item[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  background: rgba(255, 255, 255, 0.88);\n  backdrop-filter: blur(12px);\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8);\n  padding: 0.6rem 0.75rem;\n  overflow: hidden;\n  transition: transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9);\n\n    .kpi-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  &--primary {\n    border-color: rgba(99, 102, 241, 0.15);\n    .kpi-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n    &:hover { border-color: rgba(99, 102, 241, 0.3); }\n  }\n\n  &--cyan {\n    border-color: rgba(6, 182, 212, 0.15);\n    .kpi-icon { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n    &:hover { border-color: rgba(6, 182, 212, 0.3); }\n  }\n\n  &--purple {\n    border-color: rgba(168, 85, 247, 0.15);\n    .kpi-icon { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n    &:hover { border-color: rgba(168, 85, 247, 0.3); }\n  }\n}\n\n.kpi-icon[_ngcontent-%COMP%] {\n  width: 34px;\n  height: 34px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  color: #ffffff;\n  font-size: 0.9rem;\n  flex-shrink: 0;\n  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.kpi-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n\n.kpi-label[_ngcontent-%COMP%] {\n  font-size: 0.68rem;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n  color: #64748b;\n  font-weight: 600;\n}\n\n.kpi-value[_ngcontent-%COMP%] {\n  font-size: 0.92rem;\n  color: #0f172a;\n  font-weight: 700;\n}\n\n.select-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n\n.select-meta[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #94a3b8;\n  font-weight: 600;\n}\n\n.role-pack-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  margin-top: 0.75rem;\n  padding: 0.6rem 0.7rem;\n  border-radius: 10px;\n  background: rgba(239, 246, 255, 0.5);\n  border: 1px solid rgba(96, 165, 250, 0.15);\n  color: #334155;\n  font-size: 0.82rem;\n  transition: all 200ms ease;\n\n  &:hover {\n    background: rgba(239, 246, 255, 0.8);\n    border-color: rgba(96, 165, 250, 0.3);\n  }\n}\n\n.role-pack-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #2563eb;\n}\n\n.role-pack-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-weight: 600;\n  color: #2563eb;\n  text-decoration: none;\n  transition: color 200ms ease;\n}\n\n.role-pack-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #1d4ed8;\n  text-decoration: underline;\n}\n\n.form-section[_ngcontent-%COMP%] {\n  padding: 0.85rem 0.9rem;\n  position: relative;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(16px);\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9);\n\n  &:not(:first-of-type) {\n    border-top: 1px solid rgba(148, 163, 184, 0.18);\n  }\n\n  &:focus-within {\n    border-color: rgba(99, 102, 241, 0.2);\n  }\n}\n\n.form-rail[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 1rem;\n  display: grid;\n  gap: 0.65rem;\n}\n\n.rail-card[_ngcontent-%COMP%] {\n  border-radius: 14px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  background: rgba(255, 255, 255, 0.88);\n  backdrop-filter: blur(12px);\n  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8);\n  padding: 0.8rem;\n  transition: transform 250ms ease, box-shadow 250ms ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n  }\n\n  h4 {\n    margin: 0 0 0.55rem;\n    display: flex;\n    align-items: center;\n    gap: 0.4rem;\n    font-size: 0.84rem;\n    font-weight: 700;\n    color: #0f172a;\n\n    i {\n      font-size: 0.9rem;\n      color: #6366f1;\n    }\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.8rem;\n    color: #475569;\n    line-height: 1.4;\n  }\n}\n\n.rail-card--snapshot[_ngcontent-%COMP%] {\n  border-top: 3px solid transparent;\n  border-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1;\n  border-image-slice: 1 1 0 1;\n}\n\n.rail-card--notice[_ngcontent-%COMP%] {\n  border-color: rgba(251, 191, 36, 0.3);\n  background: linear-gradient(160deg, rgba(255, 251, 235, 0.92) 0%, rgba(254, 243, 199, 0.55) 100%);\n\n  h4 i {\n    color: #f59e0b;\n  }\n}\n\n.rail-value--primary[_ngcontent-%COMP%] {\n  color: #6366f1 !important;\n}\n\n.rail-value--cyan[_ngcontent-%COMP%] {\n  color: #0891b2 !important;\n}\n\n.rail-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n}\n\n.rail-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.8rem;\n  font-size: 0.78rem;\n  color: #64748b;\n  padding: 0.3rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  strong {\n    font-size: 0.82rem;\n    color: #0f172a;\n    text-align: right;\n    font-weight: 700;\n  }\n}\n\n.rail-links[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n\n  a {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    font-size: 0.8rem;\n    font-weight: 600;\n    color: #1d4ed8;\n    text-decoration: none;\n    padding: 0.4rem 0.55rem;\n    border-radius: 8px;\n    border: 1px solid rgba(96, 165, 250, 0.2);\n    background: rgba(239, 246, 255, 0.6);\n    transition: all 200ms ease;\n  }\n\n  a:hover {\n    border-color: rgba(59, 130, 246, 0.4);\n    background: rgba(219, 234, 254, 0.84);\n    transform: translateX(2px);\n    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);\n  }\n\n  a i {\n    font-size: 0.78rem;\n    transition: transform 200ms ease;\n  }\n\n  a:hover i {\n    transform: scale(1.15);\n  }\n}\n\n.section-title[_ngcontent-%COMP%] {\n  @include form.section-title;\n  margin-bottom: 0.65rem;\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  @include form.form-grid;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n\n    .required {\n      @include form.form-required;\n    }\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > textarea,\n  > .field-body {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .field-body {\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n  }\n\n  &:hover > label {\n    color: #334155;\n  }\n\n  &:focus-within > label {\n    color: #4f46e5;\n  }\n}\n\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.6);\n}\n\n.field-hint--guidance[_ngcontent-%COMP%] {\n  color: #1e40af;\n  font-style: italic;\n  letter-spacing: 0.01em;\n}\n\n.permissions-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n\n.permission-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background: rgba(14, 165, 233, 0.12);\n  color: #0369a1;\n\n  &.muted {\n    background: rgba(148, 163, 184, 0.15);\n    color: rgba(60, 60, 67, 0.7);\n  }\n}\n\n.intent-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n\n.section-description[_ngcontent-%COMP%] {\n  margin: 0 0 0.75rem;\n  font-size: 0.85rem;\n  color: rgba(60, 60, 67, 0.75);\n}\n\n[_nghost-%COMP%]     .permission-tabs {\n  .p-tablist {\n    border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n    margin-bottom: 0.65rem;\n    padding: 0.3rem 0.35rem 0;\n    border-radius: 10px 10px 0 0;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.78) 0%, rgba(243, 246, 252, 0.64) 100%);\n    backdrop-filter: blur(6px);\n  }\n\n  .p-tab {\n    padding: 0.55rem 0.7rem 0.5rem;\n    border-radius: 8px 8px 0 0;\n    font-size: 0.78rem;\n    font-weight: 650;\n    color: rgba(71, 85, 105, 0.9);\n  }\n\n  .p-tab.p-tab-active,\n  .p-tab[aria-selected='true'] {\n    color: #1d4ed8;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(237, 245, 255, 0.9) 100%);\n    border: 1px solid rgba(96, 165, 250, 0.24);\n    border-bottom: none;\n    box-shadow: inset 0 -2px 0 #2563eb, 0 4px 10px rgba(37, 99, 235, 0.1);\n  }\n\n  .p-tabpanels {\n    padding: 0.2rem 0;\n    background: transparent;\n  }\n}\n\n[_nghost-%COMP%]     .permission-action-tabs {\n  .p-tablist {\n    border-bottom: 1px solid rgba(148, 163, 184, 0.18);\n    margin-bottom: 0.55rem;\n    padding: 0.2rem 0.25rem 0;\n    border-radius: 8px 8px 0 0;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.74) 0%, rgba(244, 248, 255, 0.6) 100%);\n    backdrop-filter: blur(6px);\n  }\n\n  .p-tab {\n    padding: 0.45rem 0.6rem;\n    border-radius: 6px 6px 0 0;\n    font-size: 0.74rem;\n    font-weight: 600;\n    color: rgba(71, 85, 105, 0.88);\n  }\n\n  .p-tab.p-tab-active,\n  .p-tab[aria-selected='true'] {\n    color: #1e40af;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(233, 243, 255, 0.9) 100%);\n    border: 1px solid rgba(96, 165, 250, 0.22);\n    border-bottom: none;\n    box-shadow: inset 0 -2px 0 #3b82f6, 0 3px 8px rgba(59, 130, 246, 0.1);\n  }\n\n  .p-tabpanels {\n    padding: 0.1rem 0;\n    background: transparent;\n  }\n}\n\n.capability-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n  margin-top: 0.6rem;\n}\n\n.capability-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 8px;\n  background: linear-gradient(160deg, rgba(255, 255, 255, 0.84) 0%, rgba(243, 247, 253, 0.7) 100%);\n  box-shadow: 0 5px 14px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(6px);\n}\n\n.capability-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 0;\n  padding: 0.55rem 0.7rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n  background: linear-gradient(180deg, rgba(248, 251, 255, 0.9) 0%, rgba(238, 244, 252, 0.82) 100%);\n\n  h4 {\n    margin: 0;\n    font-size: 0.84rem;\n    font-weight: 650;\n  }\n}\n\n.capability-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0;\n}\n\n.capability-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.5rem 0.7rem;\n  border-bottom: 1px solid rgba(226, 232, 240, 0.9);\n\n  &:last-child {\n    border-bottom: 0;\n  }\n}\n\n[_nghost-%COMP%]     .permissions-section .p-checkbox {\n  .p-checkbox-box {\n    width: 1.15rem;\n    height: 1.15rem;\n    border-radius: 6px;\n    border: 1px solid rgba(148, 163, 184, 0.5);\n    background: #ffffff;\n    transition: background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;\n  }\n\n  .p-checkbox-input:focus-visible + .p-checkbox-box {\n    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.18);\n    border-color: rgba(59, 130, 246, 0.6);\n  }\n\n  &.p-checkbox-checked .p-checkbox-box {\n    border-color: #1d4ed8;\n    background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);\n  }\n\n  &.p-checkbox-checked .p-checkbox-icon {\n    color: #ffffff;\n  }\n}\n\n.capability-meta[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.2rem;\n}\n\n.capability-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #0f172a;\n}\n\n.capability-desc[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: rgba(71, 85, 105, 0.8);\n}\n\n.intent-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.55rem;\n  margin-top: 0.6rem;\n}\n\n.intent-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 8px;\n  background: linear-gradient(160deg, rgba(255, 255, 255, 0.84) 0%, rgba(243, 247, 253, 0.7) 100%);\n  box-shadow: 0 5px 14px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(6px);\n  padding: 0;\n\n  h4 {\n    margin: 0;\n    padding: 0.55rem 0.7rem;\n    font-size: 0.84rem;\n    font-weight: 650;\n    border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n    background: linear-gradient(180deg, rgba(248, 251, 255, 0.9) 0%, rgba(238, 244, 252, 0.82) 100%);\n  }\n\n  p {\n    margin: 0;\n    padding: 0.45rem 0.7rem;\n    color: rgba(71, 85, 105, 0.8);\n    font-size: 0.8rem;\n    border-bottom: 1px solid rgba(226, 232, 240, 0.8);\n  }\n}\n\n.intent-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0;\n}\n\n.intent-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.5rem 0.7rem;\n  border-bottom: 1px solid rgba(226, 232, 240, 0.9);\n\n  &:last-child {\n    border-bottom: 0;\n  }\n\n  strong {\n    display: block;\n    margin-bottom: 0.2rem;\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.82rem;\n  }\n}\n\n[_nghost-%COMP%]     .p-button.btn-primary, \n[_nghost-%COMP%]     .p-button.btn-secondary, \n[_nghost-%COMP%]     .p-button.btn-ghost {\n  border-radius: 10px;\n  font-size: 0.82rem;\n  font-weight: 600;\n  padding: 0.48rem 0.9rem;\n  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease;\n}\n\n[_nghost-%COMP%]     .p-button.btn-primary {\n  border: 1px solid transparent;\n  background: linear-gradient(135deg, #10b981 0%, #059669 100%);\n  color: #ffffff;\n  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);\n}\n\n[_nghost-%COMP%]     .p-button.btn-primary:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 6px 14px rgba(16, 185, 129, 0.32);\n  background: linear-gradient(135deg, #22c55e 0%, #059669 100%);\n}\n\n[_nghost-%COMP%]     .p-button.btn-secondary {\n  border: 1px solid rgba(96, 165, 250, 0.32);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.78) 0%, rgba(231, 242, 255, 0.68) 100%);\n  color: #1d4ed8;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.78), 0 4px 10px rgba(37, 99, 235, 0.1);\n}\n\n[_nghost-%COMP%]     .p-button.btn-secondary:hover:not(:disabled) {\n  transform: translateY(-1px);\n  border-color: rgba(59, 130, 246, 0.45);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.84) 0%, rgba(219, 234, 254, 0.78) 100%);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.84), 0 6px 12px rgba(37, 99, 235, 0.14);\n}\n\n[_nghost-%COMP%]     .p-button.btn-ghost {\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  background: rgba(255, 255, 255, 0.74);\n  color: #475569;\n  box-shadow: none;\n}\n\n[_nghost-%COMP%]     .p-button.btn-ghost:hover:not(:disabled) {\n  transform: translateY(-1px);\n  border-color: rgba(148, 163, 184, 0.44);\n  background: rgba(241, 245, 249, 0.92);\n  color: #334155;\n}\n\n[_nghost-%COMP%]     .p-button.btn-sm {\n  padding: 0.38rem 0.75rem;\n  font-size: 0.76rem;\n}\n\n[_nghost-%COMP%]     .p-button.btn-primary:disabled, \n[_nghost-%COMP%]     .p-button.btn-secondary:disabled, \n[_nghost-%COMP%]     .p-button.btn-ghost:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n\n.drift-card[_ngcontent-%COMP%] {\n  border-color: rgba(239, 68, 68, 0.26);\n  box-shadow: 0 6px 14px rgba(239, 68, 68, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.58);\n}\n\n.drift-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 1rem;\n  margin-bottom: 0.75rem;\n}\n\n.drift-column[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.4rem;\n}\n\n.drift-title[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: rgba(71, 85, 105, 0.7);\n}\n\n.drift-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.35rem 0.6rem;\n  border-radius: 999px;\n  background: rgba(16, 185, 129, 0.15);\n  color: #047857;\n  font-size: 0.78rem;\n\n  &.removed {\n    background: rgba(239, 68, 68, 0.15);\n    color: #b91c1c;\n  }\n}\n\n.drift-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.5rem;\n  margin: 0.5rem 0 0.6rem;\n}\n\n.drift-notes[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n\n  label {\n    font-size: 0.8rem;\n    font-weight: 600;\n    color: rgba(71, 85, 105, 0.8);\n  }\n}\n\n.inherited-pills[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n}\n\n.permissions-table-wrapper[_ngcontent-%COMP%] {\n  border-radius: 18px;\n  overflow: hidden;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(255, 255, 255, 0.6);\n  @include form.premium-scrollbar;\n}\n\n[_nghost-%COMP%]     .permissions-table {\n  border: none;\n\n  .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    color: #3b82f6;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    padding: 0.85rem 1rem;\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n  }\n\n  .p-datatable-tbody > tr > td {\n    border: none;\n    padding: 1rem;\n    vertical-align: middle;\n  }\n}\n\n.row-selected[_ngcontent-%COMP%] {\n  background: rgba(14, 165, 233, 0.08);\n}\n\n.row-partial[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.08);\n}\n\n.screen-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.screen-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 12px;\n  display: grid;\n  place-items: center;\n  background: rgba(14, 165, 233, 0.12);\n  color: #0284c7;\n}\n\n.screen-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n\n.screen-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.screen-desc[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: rgba(60, 60, 67, 0.6);\n}\n\n.crud-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.crud-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.7);\n}\n\n.crud-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 32px;\n\n  &.disabled {\n    opacity: 0.4;\n  }\n}\n\n.na-indicator[_ngcontent-%COMP%] {\n  color: rgba(148, 163, 184, 0.7);\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  @include form.form-actions;\n  margin-top: 0.8rem;\n  padding: 0.85rem 0.35rem 0;\n  border-top: 1px solid rgba(148, 163, 184, 0.2);\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 0.6rem;\n}\n\n[_nghost-%COMP%]     .p-inputtext {\n  @include form.premium-input;\n}\n\n[_nghost-%COMP%]     .p-inputtext:hover {\n  @include form.premium-input-hover;\n}\n\n[_nghost-%COMP%]     .p-inputtext:focus {\n  @include form.premium-input-focus;\n}\n\n@media (max-width: 768px) {\n  .form-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .form-rail[_ngcontent-%COMP%] {\n    position: static;\n  }\n\n  .details-kpis[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .kpi-item[_ngcontent-%COMP%] {\n    padding: 0.5rem 0.65rem;\n  }\n\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .form-field[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n\n    > label {\n      text-align: left;\n      min-width: unset;\n    }\n  }\n\n  .role-form--compact[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n\n  .rail-card--snapshot[_ngcontent-%COMP%] {\n    border-image: none;\n    border-top: 3px solid #667eea;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RoleFormPage, [{
        type: Component,
        args: [{ selector: 'app-role-form-page', standalone: true, imports: [
                    ButtonModule,
                    InputTextModule,
                    TextareaModule,
                    SelectModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    CheckboxModule,
                    TabsModule,
                    TooltipModule,
                    NgClass,
                    NgFor,
                    NgIf,
                    FormsModule,
                    ReactiveFormsModule,
                    RouterLink,
                    SkeletonModule,
                    BreadcrumbsComponent
                ], template: "<section class=\"role-form-page\">\n  <div class=\"form-header\">\n    <div class=\"header-content\">\n      <app-breadcrumbs></app-breadcrumbs>\n\n      <button pButton type=\"button\" class=\"back-link\" routerLink=\"/app/settings/roles\">\n        <i class=\"pi pi-arrow-left\"></i>\n        Back to Roles\n      </button>\n\n      <div class=\"header-row\">\n        <div class=\"header-title\">\n          <h1 class=\"hero-title\">\n            <span class=\"title-gradient\">{{ isEditMode() ? 'Edit' : 'Create' }}</span>\n            <span class=\"title-light\">Role</span>\n          </h1>\n          <p>Define what your team can see and do with a clean, consistent permission model.</p>\n        </div>\n        <div class=\"header-meta\">\n          <span class=\"status-pill\" [ngClass]=\"isSystemRole() ? 'status-pill--system' : 'status-pill--custom'\">\n            {{ isSystemRole() ? 'System role' : 'Custom role' }}\n          </span>\n          <span class=\"meta-chip\">\n            <i class=\"pi pi-shield\"></i>\n            {{ selectedPermissionCount() }} permissions\n          </span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"form-body\">\n      <form class=\"role-form role-form--compact\" [formGroup]=\"roleForm\" (ngSubmit)=\"saveRole()\">\n        <div class=\"form-layout\">\n          <div class=\"form-main\">\n        <section class=\"form-section\">\n          <h3 class=\"section-title\">\n            <i class=\"pi pi-id-card\"></i>\n            Role Details\n          </h3>\n          <div class=\"details-kpis\">\n            <div class=\"kpi-item kpi-item--primary\">\n              <div class=\"kpi-icon\"><i class=\"pi pi-check-square\"></i></div>\n              <div class=\"kpi-content\">\n                <span class=\"kpi-label\">Selected Permissions</span>\n                <strong class=\"kpi-value\">{{ selectedPermissionCount() }}</strong>\n              </div>\n            </div>\n            <div class=\"kpi-item kpi-item--cyan\">\n              <div class=\"kpi-icon\"><i class=\"pi pi-sitemap\"></i></div>\n              <div class=\"kpi-content\">\n                <span class=\"kpi-label\">Inherited Permissions</span>\n                <strong class=\"kpi-value\">{{ inheritedPermissions().length }}</strong>\n              </div>\n            </div>\n            <div class=\"kpi-item kpi-item--purple\">\n              <div class=\"kpi-icon\"><i class=\"pi pi-server\"></i></div>\n              <div class=\"kpi-content\">\n                <span class=\"kpi-label\">Hierarchy Preview</span>\n                <strong class=\"kpi-value\">{{ hierarchyPreviewLabel() }}</strong>\n              </div>\n            </div>\n          </div>\n          <div class=\"form-grid\">\n            <div class=\"form-field\">\n              <label for=\"roleName\">Role Name <span class=\"required\">*</span></label>\n              <div class=\"field-body\">\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                    <i class=\"pi pi-tag\"></i>\n                  </p-inputgroup-addon>\n                  <input\n                    pInputText\n                    id=\"roleName\"\n                    formControlName=\"name\"\n                    placeholder=\"e.g. Sales Manager\"\n                    [readonly]=\"isSystemRole()\"\n                  />\n                </p-inputgroup>\n                <small class=\"field-hint field-hint--guidance\" *ngIf=\"isSystemRole()\">System roles cannot be renamed.</small>\n              </div>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"roleDesc\">Description</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--notes\">\n                  <i class=\"pi pi-align-left\"></i>\n                </p-inputgroup-addon>\n                <input\n                  pInputText\n                  id=\"roleDesc\"\n                  formControlName=\"description\"\n                  placeholder=\"Brief description of this role's purpose\"\n                />\n              </p-inputgroup>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"role-hierarchyLevel\">Hierarchy Level</label>\n              <div class=\"field-body\">\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--status\">\n                    <i class=\"pi pi-sitemap\"></i>\n                  </p-inputgroup-addon>\n                  <input\n                    pInputText\n                    id=\"role-hierarchyLevel\"\n                    [value]=\"hierarchyPreviewLabel()\"\n                    readonly\n                  />\n                </p-inputgroup>\n                <small class=\"field-hint field-hint--guidance\">Derived from parent role (no manual level input).</small>\n              </div>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"visibilityScope\">Visibility Scope</label>\n              <div class=\"field-body\">\n                <p-select\n                  inputId=\"visibilityScope\"\n                  formControlName=\"visibilityScope\"\n                  [options]=\"visibilityOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  appendTo=\"body\"\n                  styleClass=\"w-full\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"select-option\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                      <span class=\"select-meta\">{{ option.hint }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"selectedItem\" let-option>\n                    <div class=\"select-option\" *ngIf=\"option\">\n                      <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                    <span *ngIf=\"!option\" class=\"select-placeholder\">Select scope</span>\n                  </ng-template>\n                </p-select>\n                <small class=\"field-hint field-hint--guidance\">Controls reporting rollups and default visibility for this role.</small>\n              </div>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"securityLevel\">Security Level</label>\n              <div class=\"field-body\">\n                <p-select\n                  inputId=\"securityLevel\"\n                  formControlName=\"securityLevelId\"\n                  [options]=\"securityOptions()\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  appendTo=\"body\"\n                  styleClass=\"w-full\"\n                  placeholder=\"Select security level\"\n                  [disabled]=\"loadingSecurityLevels()\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"select-option\">\n                      <i class=\"pi pi-shield\"></i>\n                      <span>{{ option.label }}</span>\n                      <span class=\"select-meta\">{{ option.hint }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"selectedItem\" let-option>\n                    <div class=\"select-option\" *ngIf=\"option\">\n                      <i class=\"pi pi-shield\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                    <span *ngIf=\"!option\" class=\"select-placeholder\">Select security level</span>\n                  </ng-template>\n                </p-select>\n                <small class=\"field-hint field-hint--guidance\">Controls high-risk actions (approvals, overrides, admin changes).</small>\n                <small class=\"field-hint field-hint--guidance\">\n                  Manage levels in\n                  <a routerLink=\"/app/settings/security-levels\">People &amp; Access \u203A Security Level</a>.\n                </small>\n              </div>\n            </div>\n            <div class=\"form-field\">\n              <label for=\"roleParent\">Parent Role</label>\n              <div class=\"field-body\">\n                <p-select\n                  inputId=\"roleParent\"\n                  formControlName=\"parentRoleId\"\n                  [options]=\"parentRoleOptions()\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  placeholder=\"Top-level role\"\n                  appendTo=\"body\"\n                  styleClass=\"w-full\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"select-option\">\n                      <i class=\"pi pi-users\"></i>\n                      <span>{{ option.label }}</span>\n                      <span class=\"select-meta\">{{ option.meta }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"selectedItem\" let-option>\n                    <div class=\"select-option\" *ngIf=\"option\">\n                      <i class=\"pi pi-users\"></i>\n                      <span>{{ option.label }}</span>\n                    </div>\n                    <span *ngIf=\"!option\" class=\"select-placeholder\">Top-level role</span>\n                  </ng-template>\n                </p-select>\n                <small class=\"field-hint field-hint--guidance\">Hierarchy: {{ hierarchyPreviewLabel() }}</small>\n              </div>\n            </div>\n          </div>\n          <div class=\"role-pack-link\">\n            <i class=\"pi pi-th-large\"></i>\n            <span>Manage default dashboard pack for this hierarchy level</span>\n            <a routerLink=\"/app/settings/dashboard-packs\">Open dashboard packs</a>\n          </div>\n        </section>\n\n        <section class=\"form-section permissions-section\" *ngIf=\"!isEditMode(); else editPermissionsMoved\">\n          <div class=\"permissions-header\">\n            <h3 class=\"section-title\">\n              <i class=\"pi pi-shield\"></i>\n              Permissions\n            </h3>\n            <div class=\"permission-meta\">\n              <span class=\"badge\">{{ selectedPermissionCount() }} selected</span>\n            </div>\n          </div>\n\n          <ng-container *ngIf=\"!loadingPermissions(); else permissionsLoading\">\n            <p-tabs [value]=\"activePermissionTab()\" (valueChange)=\"onPermissionTabChange($event)\" class=\"permission-tabs\">\n              <p-tablist>\n                <p-tab value=\"all-permissions\">All Permissions</p-tab>\n                <p-tab value=\"presets\">Presets</p-tab>\n                <p-tab value=\"drift\">Drift</p-tab>\n                <p-tab value=\"effective-access\">Effective Access</p-tab>\n              </p-tablist>\n              <p-tabpanels>\n                <p-tabpanel value=\"all-permissions\">\n                  <p class=\"section-description\">\n                    Review and edit granular permissions by capability.\n                  </p>\n                  <p-tabs [value]=\"activePermissionActionTab()\" (valueChange)=\"onPermissionActionTabChange($event)\" class=\"permission-action-tabs\">\n                    <p-tablist>\n                      <p-tab value=\"create-manage\">Create &amp; Manage ({{ allPermissionActionTabs().createManage }})</p-tab>\n                      <p-tab value=\"view-analyze\">View &amp; Analyze ({{ allPermissionActionTabs().viewAnalyze }})</p-tab>\n                      <p-tab value=\"governance\">Governance ({{ allPermissionActionTabs().governance }})</p-tab>\n                    </p-tablist>\n                    <p-tabpanels>\n                      <p-tabpanel value=\"create-manage\">\n                        <div class=\"capability-grid\">\n                          <div class=\"capability-card\" *ngFor=\"let group of filteredCapabilityGroups()\">\n                            <div class=\"capability-header\">\n                              <h4>{{ group.capability }}</h4>\n                              <span class=\"badge muted\">{{ group.permissions.length }} permissions</span>\n                            </div>\n                            <div class=\"capability-list\">\n                              <div class=\"capability-row\" *ngFor=\"let permission of group.permissions\">\n                                <div class=\"capability-meta\">\n                                  <span class=\"capability-label\">{{ permission.label }}</span>\n                                  <span class=\"capability-desc\">{{ permission.description }}</span>\n                                </div>\n                                <p-checkbox\n                                  [binary]=\"true\"\n                                  [ngModel]=\"isPermissionSelected(permission.key)\"\n                                  [ngModelOptions]=\"{standalone: true}\"\n                                  (onChange)=\"togglePermission(permission.key)\"\n                                  [disabled]=\"roleSaving()\"\n                                ></p-checkbox>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                        <p class=\"empty-state\" *ngIf=\"filteredCapabilityGroups().length === 0\">No permissions in this category.</p>\n                      </p-tabpanel>\n                      <p-tabpanel value=\"view-analyze\">\n                        <div class=\"capability-grid\">\n                          <div class=\"capability-card\" *ngFor=\"let group of filteredCapabilityGroups()\">\n                            <div class=\"capability-header\">\n                              <h4>{{ group.capability }}</h4>\n                              <span class=\"badge muted\">{{ group.permissions.length }} permissions</span>\n                            </div>\n                            <div class=\"capability-list\">\n                              <div class=\"capability-row\" *ngFor=\"let permission of group.permissions\">\n                                <div class=\"capability-meta\">\n                                  <span class=\"capability-label\">{{ permission.label }}</span>\n                                  <span class=\"capability-desc\">{{ permission.description }}</span>\n                                </div>\n                                <p-checkbox\n                                  [binary]=\"true\"\n                                  [ngModel]=\"isPermissionSelected(permission.key)\"\n                                  [ngModelOptions]=\"{standalone: true}\"\n                                  (onChange)=\"togglePermission(permission.key)\"\n                                  [disabled]=\"roleSaving()\"\n                                ></p-checkbox>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                        <p class=\"empty-state\" *ngIf=\"filteredCapabilityGroups().length === 0\">No permissions in this category.</p>\n                      </p-tabpanel>\n                      <p-tabpanel value=\"governance\">\n                        <div class=\"capability-grid\">\n                          <div class=\"capability-card\" *ngFor=\"let group of filteredCapabilityGroups()\">\n                            <div class=\"capability-header\">\n                              <h4>{{ group.capability }}</h4>\n                              <span class=\"badge muted\">{{ group.permissions.length }} permissions</span>\n                            </div>\n                            <div class=\"capability-list\">\n                              <div class=\"capability-row\" *ngFor=\"let permission of group.permissions\">\n                                <div class=\"capability-meta\">\n                                  <span class=\"capability-label\">{{ permission.label }}</span>\n                                  <span class=\"capability-desc\">{{ permission.description }}</span>\n                                </div>\n                                <p-checkbox\n                                  [binary]=\"true\"\n                                  [ngModel]=\"isPermissionSelected(permission.key)\"\n                                  [ngModelOptions]=\"{standalone: true}\"\n                                  (onChange)=\"togglePermission(permission.key)\"\n                                  [disabled]=\"roleSaving()\"\n                                ></p-checkbox>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                        <p class=\"empty-state\" *ngIf=\"filteredCapabilityGroups().length === 0\">No permissions in this category.</p>\n                      </p-tabpanel>\n                    </p-tabpanels>\n                  </p-tabs>\n                </p-tabpanel>\n\n                <p-tabpanel value=\"presets\">\n                  <p class=\"section-description\">\n                    Apply intent packs or hierarchy presets as a baseline.\n                  </p>\n                  <div class=\"intent-grid\">\n                    <div class=\"intent-card\">\n                      <h4>Role intent packs</h4>\n                      <p>Pick a baseline role intent and apply its permissions.</p>\n                      <div class=\"intent-list\" *ngIf=\"intentPacks().length; else noIntentPacks\">\n                        <div class=\"intent-row\" *ngFor=\"let pack of intentPacks()\">\n                          <div>\n                            <div class=\"intent-title-row\">\n                              <strong>{{ pack.label }}</strong>\n                            </div>\n                            <p>{{ pack.description }}</p>\n                          </div>\n                          <button pButton type=\"button\" class=\"btn-secondary btn-sm\" (click)=\"applyIntentPack(pack)\" [disabled]=\"roleSaving()\">\n                            Apply\n                          </button>\n                        </div>\n                      </div>\n                      <ng-template #noIntentPacks>\n                        <p class=\"empty-state\">No intent packs available.</p>\n                      </ng-template>\n                    </div>\n\n                    <div class=\"intent-card\">\n                      <h4>Hierarchy permission presets</h4>\n                      <p>Use H1/H2/H3 permission packs as a starting point.</p>\n                      <div class=\"intent-list\" *ngIf=\"permissionPackPresets().length; else noPackPresets\">\n                        <div class=\"intent-row\" *ngFor=\"let pack of permissionPackPresets()\">\n                          <div>\n                            <div class=\"intent-title-row\">\n                              <strong>{{ pack.label }}</strong>\n                            </div>\n                            <p>{{ pack.description }}</p>\n                          </div>\n                          <button pButton type=\"button\" class=\"btn-secondary btn-sm\" (click)=\"applyPermissionPack(pack)\" [disabled]=\"roleSaving()\">\n                            Apply\n                          </button>\n                        </div>\n                      </div>\n                      <ng-template #noPackPresets>\n                        <p class=\"empty-state\">No permission packs available.</p>\n                      </ng-template>\n                    </div>\n                  </div>\n                </p-tabpanel>\n\n                <p-tabpanel value=\"drift\">\n                  <p class=\"section-description\">\n                    Review current changes vs base pack, then accept or reset.\n                  </p>\n                  <div class=\"intent-card drift-card\">\n                    <h4>Role drift</h4>\n                    <p>Track changes from the base pack and keep an audit trail.</p>\n                    <div class=\"drift-list\">\n                      <div class=\"drift-column\">\n                        <span class=\"drift-title\">Added</span>\n                        <span *ngIf=\"driftSummary().added.length === 0\" class=\"empty-state\">No additions</span>\n                        <span class=\"drift-pill\" *ngFor=\"let key of driftSummary().added\">{{ permissionLabel(key) }}</span>\n                      </div>\n                      <div class=\"drift-column\">\n                        <span class=\"drift-title\">Removed</span>\n                        <span *ngIf=\"driftSummary().removed.length === 0\" class=\"empty-state\">No removals</span>\n                        <span class=\"drift-pill removed\" *ngFor=\"let key of driftSummary().removed\">{{ permissionLabel(key) }}</span>\n                      </div>\n                    </div>\n                    <div class=\"drift-actions\">\n                      <button pButton type=\"button\" class=\"btn-ghost\" (click)=\"resetToDefault()\" [disabled]=\"roleSaving()\">\n                        Reset to Default\n                      </button>\n                      <button pButton type=\"button\" class=\"btn-primary\" (click)=\"acceptDrift()\" [disabled]=\"roleSaving()\">\n                        Accept Drift\n                      </button>\n                    </div>\n                    <div class=\"drift-notes\">\n                      <label for=\"driftNotes\">Drift notes</label>\n                      <textarea\n                        id=\"driftNotes\"\n                        rows=\"3\"\n                        pInputTextarea\n                        [(ngModel)]=\"driftNotes\"\n                        [ngModelOptions]=\"{standalone: true}\"\n                        placeholder=\"Explain why this role differs from the base pack.\"\n                      ></textarea>\n                    </div>\n                  </div>\n                </p-tabpanel>\n\n                <p-tabpanel value=\"effective-access\">\n                  <p class=\"section-description\">\n                    Verify final permission scope before saving this role.\n                  </p>\n                  <div class=\"intent-card\">\n                    <h4>Direct permissions</h4>\n                    <p>Permissions currently selected on this role.</p>\n                    <div class=\"inherited-pills\">\n                      <span class=\"permission-pill\" *ngFor=\"let label of effectivePermissionLabels()\">\n                        {{ label }}\n                      </span>\n                      <span class=\"empty-state\" *ngIf=\"effectivePermissionLabels().length === 0\">No permissions selected</span>\n                    </div>\n                  </div>\n                  <div class=\"intent-card\">\n                    <h4>Inherited permissions</h4>\n                    <p>Permissions inherited from parent role hierarchy.</p>\n                    <div class=\"inherited-pills\">\n                      <span class=\"permission-pill\" *ngFor=\"let key of inheritedPermissions()\">\n                        {{ permissionLabel(key) }}\n                      </span>\n                      <span class=\"empty-state\" *ngIf=\"inheritedPermissions().length === 0\">No inherited permissions</span>\n                    </div>\n                  </div>\n                </p-tabpanel>\n                </p-tabpanels>\n              </p-tabs>\n          </ng-container>\n\n          <ng-template #permissionsLoading>\n            <div class=\"loading-blocks\">\n              <p-skeleton height=\"52px\" *ngFor=\"let _ of [0, 1, 2, 3, 4]\"></p-skeleton>\n            </div>\n          </ng-template>\n        </section>\n\n        <ng-template #editPermissionsMoved>\n          <section class=\"form-section permissions-section\">\n            <div class=\"permissions-header\">\n              <h3 class=\"section-title\">\n                <i class=\"pi pi-lock\"></i>\n                Permissions\n              </h3>\n            </div>\n            <p class=\"section-description\">\n              Permission sets for existing roles are managed in the People &amp; Access &rsaquo; Permission page.\n            </p>\n            <div class=\"drift-actions\">\n              <button\n                type=\"button\"\n                class=\"action-btn action-btn--add\"\n                [routerLink]=\"['/app/settings/permissions']\"\n                [queryParams]=\"{ roleId: currentRoleId() }\"\n              >\n                <span class=\"action-btn__icon\"><i class=\"pi pi-lock\"></i></span>\n                <span>Open Permission Page</span>\n              </button>\n            </div>\n          </section>\n        </ng-template>\n\n        <section class=\"form-section inherited-section\" *ngIf=\"!isEditMode() && inheritedPermissions().length\">\n          <div class=\"permissions-header\">\n            <h3 class=\"section-title\">\n              <i class=\"pi pi-sitemap\"></i>\n              Inherited Permissions\n            </h3>\n            <div class=\"permission-meta\">\n              <span class=\"badge muted\">{{ inheritedPermissions().length }} inherited</span>\n            </div>\n          </div>\n          <p class=\"section-description\">\n            These permissions are inherited from parent roles and cannot be edited here.\n          </p>\n          <div class=\"inherited-pills\">\n            <span class=\"permission-pill\" *ngFor=\"let key of inheritedPermissions()\">\n              {{ permissionLabel(key) }}\n            </span>\n          </div>\n        </section>\n          </div>\n\n          <aside class=\"form-rail\">\n            <section class=\"rail-card rail-card--snapshot\">\n              <h4><i class=\"pi pi-chart-bar\"></i> Role Snapshot</h4>\n              <div class=\"rail-list\">\n                <div class=\"rail-row\">\n                  <span>Mode</span>\n                  <strong>{{ isEditMode() ? 'Edit existing role' : 'Create new role' }}</strong>\n                </div>\n                <div class=\"rail-row\">\n                  <span>Role Type</span>\n                  <strong>{{ isSystemRole() ? 'System role' : 'Custom role' }}</strong>\n                </div>\n                <div class=\"rail-row\">\n                  <span>Permissions</span>\n                  <strong class=\"rail-value--primary\">{{ selectedPermissionCount() }}</strong>\n                </div>\n                <div class=\"rail-row\">\n                  <span>Inherited</span>\n                  <strong class=\"rail-value--cyan\">{{ inheritedPermissions().length }}</strong>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"rail-card\">\n              <h4><i class=\"pi pi-cog\"></i> Related Settings</h4>\n              <div class=\"rail-links\">\n                <a routerLink=\"/app/settings/permissions\">\n                  <i class=\"pi pi-lock\"></i>\n                  Open Permission Sets\n                </a>\n                <a routerLink=\"/app/settings/security-levels\">\n                  <i class=\"pi pi-shield\"></i>\n                  Open Security Levels\n                </a>\n                <a routerLink=\"/app/settings/dashboard-packs\">\n                  <i class=\"pi pi-th-large\"></i>\n                  Open Dashboard Packs\n                </a>\n              </div>\n            </section>\n\n            <section class=\"rail-card rail-card--notice\" *ngIf=\"isEditMode()\">\n              <h4><i class=\"pi pi-info-circle\"></i> Editing Note</h4>\n              <p>\n                Permission sets are managed from the dedicated\n                <strong>Permission</strong> page for existing roles.\n              </p>\n            </section>\n          </aside>\n        </div>\n\n        <div class=\"form-actions\">\n          <button\n            type=\"button\"\n            class=\"action-btn action-btn--back\"\n            [disabled]=\"roleSaving()\"\n            routerLink=\"/app/settings/roles\"\n          >\n            <span class=\"action-btn__icon\"><i class=\"pi pi-times\"></i></span>\n            <span>Cancel</span>\n          </button>\n          <button\n            type=\"submit\"\n            class=\"action-btn action-btn--add\"\n            [disabled]=\"!canManageAdmin() || roleForm.invalid || roleSaving()\"\n          >\n            <span class=\"action-btn__icon\"><i class=\"pi pi-check\"></i></span>\n            <span>{{ isEditMode() ? 'Update Role' : 'Create Role' }}</span>\n          </button>\n        </div>\n      </form>\n  </div>\n</section>\n", styles: ["@use '../../../../shared/form-page-styles' as form;\n\n:host {\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.role-form-page {\n  @include form.form-page-base;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.form-header {\n  @include form.form-page-header;\n}\n\n.header-content {\n  @include form.form-header-content;\n}\n\n.back-link {\n  @include form.form-back-link;\n}\n\n.header-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n\n.header-title {\n  @include form.form-header-title;\n}\n\n.header-meta {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n\n.status-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n\n  &--system {\n    background: rgba(248, 113, 113, 0.12);\n    color: #b91c1c;\n  }\n\n  &--custom {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n}\n\n.meta-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n\n  i {\n    color: #0ea5e9;\n  }\n}\n\n.form-body {\n  @include form.form-container;\n  padding: 0;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.84) 0%, rgba(248, 250, 255, 0.72) 100%);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.62);\n  backdrop-filter: blur(8px) saturate(108%);\n  -webkit-backdrop-filter: blur(8px) saturate(108%);\n}\n\n.role-form {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n\n.form-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 280px;\n  gap: 0.9rem;\n  align-items: start;\n}\n\n.form-main {\n  display: flex;\n  flex-direction: column;\n  gap: 0.65rem;\n}\n\n.role-form--compact {\n  border-radius: 0;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n  padding: 0;\n}\n\n.details-kpis {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.6rem;\n  margin: 0 0 0.75rem;\n}\n\n.kpi-item {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  background: rgba(255, 255, 255, 0.88);\n  backdrop-filter: blur(12px);\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8);\n  padding: 0.6rem 0.75rem;\n  overflow: hidden;\n  transition: transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9);\n\n    .kpi-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  &--primary {\n    border-color: rgba(99, 102, 241, 0.15);\n    .kpi-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n    &:hover { border-color: rgba(99, 102, 241, 0.3); }\n  }\n\n  &--cyan {\n    border-color: rgba(6, 182, 212, 0.15);\n    .kpi-icon { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n    &:hover { border-color: rgba(6, 182, 212, 0.3); }\n  }\n\n  &--purple {\n    border-color: rgba(168, 85, 247, 0.15);\n    .kpi-icon { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n    &:hover { border-color: rgba(168, 85, 247, 0.3); }\n  }\n}\n\n.kpi-icon {\n  width: 34px;\n  height: 34px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  color: #ffffff;\n  font-size: 0.9rem;\n  flex-shrink: 0;\n  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.kpi-content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n\n.kpi-label {\n  font-size: 0.68rem;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n  color: #64748b;\n  font-weight: 600;\n}\n\n.kpi-value {\n  font-size: 0.92rem;\n  color: #0f172a;\n  font-weight: 700;\n}\n\n.select-option {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n\n.select-meta {\n  font-size: 0.75rem;\n  color: #94a3b8;\n  font-weight: 600;\n}\n\n.role-pack-link {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  margin-top: 0.75rem;\n  padding: 0.6rem 0.7rem;\n  border-radius: 10px;\n  background: rgba(239, 246, 255, 0.5);\n  border: 1px solid rgba(96, 165, 250, 0.15);\n  color: #334155;\n  font-size: 0.82rem;\n  transition: all 200ms ease;\n\n  &:hover {\n    background: rgba(239, 246, 255, 0.8);\n    border-color: rgba(96, 165, 250, 0.3);\n  }\n}\n\n.role-pack-link i {\n  font-size: 1rem;\n  color: #2563eb;\n}\n\n.role-pack-link a {\n  margin-left: auto;\n  font-weight: 600;\n  color: #2563eb;\n  text-decoration: none;\n  transition: color 200ms ease;\n}\n\n.role-pack-link a:hover {\n  color: #1d4ed8;\n  text-decoration: underline;\n}\n\n.form-section {\n  padding: 0.85rem 0.9rem;\n  position: relative;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(16px);\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9);\n\n  &:not(:first-of-type) {\n    border-top: 1px solid rgba(148, 163, 184, 0.18);\n  }\n\n  &:focus-within {\n    border-color: rgba(99, 102, 241, 0.2);\n  }\n}\n\n.form-rail {\n  position: sticky;\n  top: 1rem;\n  display: grid;\n  gap: 0.65rem;\n}\n\n.rail-card {\n  border-radius: 14px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  background: rgba(255, 255, 255, 0.88);\n  backdrop-filter: blur(12px);\n  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8);\n  padding: 0.8rem;\n  transition: transform 250ms ease, box-shadow 250ms ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n  }\n\n  h4 {\n    margin: 0 0 0.55rem;\n    display: flex;\n    align-items: center;\n    gap: 0.4rem;\n    font-size: 0.84rem;\n    font-weight: 700;\n    color: #0f172a;\n\n    i {\n      font-size: 0.9rem;\n      color: #6366f1;\n    }\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.8rem;\n    color: #475569;\n    line-height: 1.4;\n  }\n}\n\n.rail-card--snapshot {\n  border-top: 3px solid transparent;\n  border-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1;\n  border-image-slice: 1 1 0 1;\n}\n\n.rail-card--notice {\n  border-color: rgba(251, 191, 36, 0.3);\n  background: linear-gradient(160deg, rgba(255, 251, 235, 0.92) 0%, rgba(254, 243, 199, 0.55) 100%);\n\n  h4 i {\n    color: #f59e0b;\n  }\n}\n\n.rail-value--primary {\n  color: #6366f1 !important;\n}\n\n.rail-value--cyan {\n  color: #0891b2 !important;\n}\n\n.rail-list {\n  display: grid;\n  gap: 0.45rem;\n}\n\n.rail-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.8rem;\n  font-size: 0.78rem;\n  color: #64748b;\n  padding: 0.3rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  strong {\n    font-size: 0.82rem;\n    color: #0f172a;\n    text-align: right;\n    font-weight: 700;\n  }\n}\n\n.rail-links {\n  display: grid;\n  gap: 0.4rem;\n\n  a {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    font-size: 0.8rem;\n    font-weight: 600;\n    color: #1d4ed8;\n    text-decoration: none;\n    padding: 0.4rem 0.55rem;\n    border-radius: 8px;\n    border: 1px solid rgba(96, 165, 250, 0.2);\n    background: rgba(239, 246, 255, 0.6);\n    transition: all 200ms ease;\n  }\n\n  a:hover {\n    border-color: rgba(59, 130, 246, 0.4);\n    background: rgba(219, 234, 254, 0.84);\n    transform: translateX(2px);\n    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);\n  }\n\n  a i {\n    font-size: 0.78rem;\n    transition: transform 200ms ease;\n  }\n\n  a:hover i {\n    transform: scale(1.15);\n  }\n}\n\n.section-title {\n  @include form.section-title;\n  margin-bottom: 0.65rem;\n}\n\n.form-grid {\n  @include form.form-grid;\n}\n\n.form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n\n    .required {\n      @include form.form-required;\n    }\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > textarea,\n  > .field-body {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .field-body {\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n  }\n\n  &:hover > label {\n    color: #334155;\n  }\n\n  &:focus-within > label {\n    color: #4f46e5;\n  }\n}\n\n.field-hint {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.6);\n}\n\n.field-hint--guidance {\n  color: #1e40af;\n  font-style: italic;\n  letter-spacing: 0.01em;\n}\n\n.permissions-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n\n.permission-meta {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n\n.badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  background: rgba(14, 165, 233, 0.12);\n  color: #0369a1;\n\n  &.muted {\n    background: rgba(148, 163, 184, 0.15);\n    color: rgba(60, 60, 67, 0.7);\n  }\n}\n\n.intent-title-row {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n\n.section-description {\n  margin: 0 0 0.75rem;\n  font-size: 0.85rem;\n  color: rgba(60, 60, 67, 0.75);\n}\n\n:host ::ng-deep .permission-tabs {\n  .p-tablist {\n    border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n    margin-bottom: 0.65rem;\n    padding: 0.3rem 0.35rem 0;\n    border-radius: 10px 10px 0 0;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.78) 0%, rgba(243, 246, 252, 0.64) 100%);\n    backdrop-filter: blur(6px);\n  }\n\n  .p-tab {\n    padding: 0.55rem 0.7rem 0.5rem;\n    border-radius: 8px 8px 0 0;\n    font-size: 0.78rem;\n    font-weight: 650;\n    color: rgba(71, 85, 105, 0.9);\n  }\n\n  .p-tab.p-tab-active,\n  .p-tab[aria-selected='true'] {\n    color: #1d4ed8;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(237, 245, 255, 0.9) 100%);\n    border: 1px solid rgba(96, 165, 250, 0.24);\n    border-bottom: none;\n    box-shadow: inset 0 -2px 0 #2563eb, 0 4px 10px rgba(37, 99, 235, 0.1);\n  }\n\n  .p-tabpanels {\n    padding: 0.2rem 0;\n    background: transparent;\n  }\n}\n\n:host ::ng-deep .permission-action-tabs {\n  .p-tablist {\n    border-bottom: 1px solid rgba(148, 163, 184, 0.18);\n    margin-bottom: 0.55rem;\n    padding: 0.2rem 0.25rem 0;\n    border-radius: 8px 8px 0 0;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.74) 0%, rgba(244, 248, 255, 0.6) 100%);\n    backdrop-filter: blur(6px);\n  }\n\n  .p-tab {\n    padding: 0.45rem 0.6rem;\n    border-radius: 6px 6px 0 0;\n    font-size: 0.74rem;\n    font-weight: 600;\n    color: rgba(71, 85, 105, 0.88);\n  }\n\n  .p-tab.p-tab-active,\n  .p-tab[aria-selected='true'] {\n    color: #1e40af;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(233, 243, 255, 0.9) 100%);\n    border: 1px solid rgba(96, 165, 250, 0.22);\n    border-bottom: none;\n    box-shadow: inset 0 -2px 0 #3b82f6, 0 3px 8px rgba(59, 130, 246, 0.1);\n  }\n\n  .p-tabpanels {\n    padding: 0.1rem 0;\n    background: transparent;\n  }\n}\n\n.capability-grid {\n  display: grid;\n  gap: 0.5rem;\n  margin-top: 0.6rem;\n}\n\n.capability-card {\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 8px;\n  background: linear-gradient(160deg, rgba(255, 255, 255, 0.84) 0%, rgba(243, 247, 253, 0.7) 100%);\n  box-shadow: 0 5px 14px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(6px);\n}\n\n.capability-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 0;\n  padding: 0.55rem 0.7rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n  background: linear-gradient(180deg, rgba(248, 251, 255, 0.9) 0%, rgba(238, 244, 252, 0.82) 100%);\n\n  h4 {\n    margin: 0;\n    font-size: 0.84rem;\n    font-weight: 650;\n  }\n}\n\n.capability-list {\n  display: grid;\n  gap: 0;\n}\n\n.capability-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.5rem 0.7rem;\n  border-bottom: 1px solid rgba(226, 232, 240, 0.9);\n\n  &:last-child {\n    border-bottom: 0;\n  }\n}\n\n:host ::ng-deep .permissions-section .p-checkbox {\n  .p-checkbox-box {\n    width: 1.15rem;\n    height: 1.15rem;\n    border-radius: 6px;\n    border: 1px solid rgba(148, 163, 184, 0.5);\n    background: #ffffff;\n    transition: background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;\n  }\n\n  .p-checkbox-input:focus-visible + .p-checkbox-box {\n    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.18);\n    border-color: rgba(59, 130, 246, 0.6);\n  }\n\n  &.p-checkbox-checked .p-checkbox-box {\n    border-color: #1d4ed8;\n    background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);\n  }\n\n  &.p-checkbox-checked .p-checkbox-icon {\n    color: #ffffff;\n  }\n}\n\n.capability-meta {\n  display: grid;\n  gap: 0.2rem;\n}\n\n.capability-label {\n  font-weight: 600;\n  color: #0f172a;\n}\n\n.capability-desc {\n  font-size: 0.82rem;\n  color: rgba(71, 85, 105, 0.8);\n}\n\n.intent-grid {\n  display: grid;\n  gap: 0.55rem;\n  margin-top: 0.6rem;\n}\n\n.intent-card {\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 8px;\n  background: linear-gradient(160deg, rgba(255, 255, 255, 0.84) 0%, rgba(243, 247, 253, 0.7) 100%);\n  box-shadow: 0 5px 14px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(6px);\n  padding: 0;\n\n  h4 {\n    margin: 0;\n    padding: 0.55rem 0.7rem;\n    font-size: 0.84rem;\n    font-weight: 650;\n    border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n    background: linear-gradient(180deg, rgba(248, 251, 255, 0.9) 0%, rgba(238, 244, 252, 0.82) 100%);\n  }\n\n  p {\n    margin: 0;\n    padding: 0.45rem 0.7rem;\n    color: rgba(71, 85, 105, 0.8);\n    font-size: 0.8rem;\n    border-bottom: 1px solid rgba(226, 232, 240, 0.8);\n  }\n}\n\n.intent-list {\n  display: grid;\n  gap: 0;\n}\n\n.intent-row {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 0.5rem 0.7rem;\n  border-bottom: 1px solid rgba(226, 232, 240, 0.9);\n\n  &:last-child {\n    border-bottom: 0;\n  }\n\n  strong {\n    display: block;\n    margin-bottom: 0.2rem;\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.82rem;\n  }\n}\n\n:host ::ng-deep .p-button.btn-primary,\n:host ::ng-deep .p-button.btn-secondary,\n:host ::ng-deep .p-button.btn-ghost {\n  border-radius: 10px;\n  font-size: 0.82rem;\n  font-weight: 600;\n  padding: 0.48rem 0.9rem;\n  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, border-color 0.15s ease, color 0.15s ease;\n}\n\n:host ::ng-deep .p-button.btn-primary {\n  border: 1px solid transparent;\n  background: linear-gradient(135deg, #10b981 0%, #059669 100%);\n  color: #ffffff;\n  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);\n}\n\n:host ::ng-deep .p-button.btn-primary:hover:not(:disabled) {\n  transform: translateY(-1px);\n  box-shadow: 0 6px 14px rgba(16, 185, 129, 0.32);\n  background: linear-gradient(135deg, #22c55e 0%, #059669 100%);\n}\n\n:host ::ng-deep .p-button.btn-secondary {\n  border: 1px solid rgba(96, 165, 250, 0.32);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.78) 0%, rgba(231, 242, 255, 0.68) 100%);\n  color: #1d4ed8;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.78), 0 4px 10px rgba(37, 99, 235, 0.1);\n}\n\n:host ::ng-deep .p-button.btn-secondary:hover:not(:disabled) {\n  transform: translateY(-1px);\n  border-color: rgba(59, 130, 246, 0.45);\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.84) 0%, rgba(219, 234, 254, 0.78) 100%);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.84), 0 6px 12px rgba(37, 99, 235, 0.14);\n}\n\n:host ::ng-deep .p-button.btn-ghost {\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  background: rgba(255, 255, 255, 0.74);\n  color: #475569;\n  box-shadow: none;\n}\n\n:host ::ng-deep .p-button.btn-ghost:hover:not(:disabled) {\n  transform: translateY(-1px);\n  border-color: rgba(148, 163, 184, 0.44);\n  background: rgba(241, 245, 249, 0.92);\n  color: #334155;\n}\n\n:host ::ng-deep .p-button.btn-sm {\n  padding: 0.38rem 0.75rem;\n  font-size: 0.76rem;\n}\n\n:host ::ng-deep .p-button.btn-primary:disabled,\n:host ::ng-deep .p-button.btn-secondary:disabled,\n:host ::ng-deep .p-button.btn-ghost:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  transform: none;\n  box-shadow: none;\n}\n\n.drift-card {\n  border-color: rgba(239, 68, 68, 0.26);\n  box-shadow: 0 6px 14px rgba(239, 68, 68, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.58);\n}\n\n.drift-list {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 1rem;\n  margin-bottom: 0.75rem;\n}\n\n.drift-column {\n  display: grid;\n  gap: 0.4rem;\n}\n\n.drift-title {\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: rgba(71, 85, 105, 0.7);\n}\n\n.drift-pill {\n  display: inline-flex;\n  padding: 0.35rem 0.6rem;\n  border-radius: 999px;\n  background: rgba(16, 185, 129, 0.15);\n  color: #047857;\n  font-size: 0.78rem;\n\n  &.removed {\n    background: rgba(239, 68, 68, 0.15);\n    color: #b91c1c;\n  }\n}\n\n.drift-actions {\n  display: flex;\n  gap: 0.5rem;\n  margin: 0.5rem 0 0.6rem;\n}\n\n.drift-notes {\n  display: grid;\n  gap: 0.35rem;\n\n  label {\n    font-size: 0.8rem;\n    font-weight: 600;\n    color: rgba(71, 85, 105, 0.8);\n  }\n}\n\n.inherited-pills {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.4rem;\n}\n\n.permissions-table-wrapper {\n  border-radius: 18px;\n  overflow: hidden;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(255, 255, 255, 0.6);\n  @include form.premium-scrollbar;\n}\n\n:host ::ng-deep .permissions-table {\n  border: none;\n\n  .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    color: #3b82f6;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    padding: 0.85rem 1rem;\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n  }\n\n  .p-datatable-tbody > tr > td {\n    border: none;\n    padding: 1rem;\n    vertical-align: middle;\n  }\n}\n\n.row-selected {\n  background: rgba(14, 165, 233, 0.08);\n}\n\n.row-partial {\n  background: rgba(245, 158, 11, 0.08);\n}\n\n.screen-info {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.screen-icon {\n  width: 36px;\n  height: 36px;\n  border-radius: 12px;\n  display: grid;\n  place-items: center;\n  background: rgba(14, 165, 233, 0.12);\n  color: #0284c7;\n}\n\n.screen-meta {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n\n.screen-name {\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.screen-desc {\n  font-size: 0.8rem;\n  color: rgba(60, 60, 67, 0.6);\n}\n\n.crud-header {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.crud-label {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.7);\n}\n\n.crud-cell {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 32px;\n\n  &.disabled {\n    opacity: 0.4;\n  }\n}\n\n.na-indicator {\n  color: rgba(148, 163, 184, 0.7);\n}\n\n.form-actions {\n  @include form.form-actions;\n  margin-top: 0.8rem;\n  padding: 0.85rem 0.35rem 0;\n  border-top: 1px solid rgba(148, 163, 184, 0.2);\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 0.6rem;\n}\n\n:host ::ng-deep .p-inputtext {\n  @include form.premium-input;\n}\n\n:host ::ng-deep .p-inputtext:hover {\n  @include form.premium-input-hover;\n}\n\n:host ::ng-deep .p-inputtext:focus {\n  @include form.premium-input-focus;\n}\n\n@media (max-width: 768px) {\n  .form-layout {\n    grid-template-columns: 1fr;\n  }\n\n  .form-rail {\n    position: static;\n  }\n\n  .details-kpis {\n    grid-template-columns: 1fr;\n  }\n\n  .kpi-item {\n    padding: 0.5rem 0.65rem;\n  }\n\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .form-field {\n    flex-direction: column;\n    align-items: stretch;\n\n    > label {\n      text-align: left;\n      min-width: unset;\n    }\n  }\n\n  .role-form--compact {\n    padding: 0.75rem;\n  }\n\n  .rail-card--snapshot {\n    border-image: none;\n    border-top: 3px solid #667eea;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RoleFormPage, { className: "RoleFormPage", filePath: "src/app/crm/features/settings/pages/role-form.page.ts", lineNumber: 64 }); })();
