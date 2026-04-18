import { NgClass, NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
import * as i2 from "primeng/api";
import * as i3 from "primeng/accordion";
import * as i4 from "primeng/organizationchart";
import * as i5 from "primeng/table";
import * as i6 from "primeng/tag";
const _c0 = () => [0, 1, 2, 3, 4];
const _c1 = () => ({ "min-width": "72rem" });
const _c2 = a0 => ["/app/settings/roles", a0, "edit"];
const _c3 = () => [0, 1, 2];
function RolesPage_div_118_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 78);
    i0.ɵɵelement(1, "div", 79)(2, "div", 80)(3, "div", 81)(4, "div", 82)(5, "div", 83);
    i0.ɵɵelementEnd();
} }
function RolesPage_div_118_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 76);
    i0.ɵɵtemplate(1, RolesPage_div_118_div_1_Template, 6, 0, "div", 77);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c0));
} }
function RolesPage_div_119_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 84)(1, "div", 85);
    i0.ɵɵelement(2, "i", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "No roles configured");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Create your first role to start managing access control");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 86);
    i0.ɵɵelement(8, "i", 22);
    i0.ɵɵtext(9, " Create Role ");
    i0.ɵɵelementEnd()();
} }
function RolesPage_div_120_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 89);
    i0.ɵɵtext(2, "Role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Hierarchy");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Security Level");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Permissions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 90);
    i0.ɵɵtext(12, "Actions");
    i0.ɵɵelementEnd()();
} }
function RolesPage_div_120_ng_template_3_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 58);
    i0.ɵɵtext(2);
    i0.ɵɵelementStart(3, "span", 107);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const level_r4 = ctx.ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", level_r4.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("R", level_r4.rank);
} }
function RolesPage_div_120_ng_template_3_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 75);
    i0.ɵɵtext(1, "Unassigned");
    i0.ɵɵelementEnd();
} }
function RolesPage_div_120_ng_template_3_span_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 108);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const permission_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.permissionLabel(permission_r5), " ");
} }
function RolesPage_div_120_ng_template_3_span_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 109);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const role_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" +", role_r6.permissions.length - 3, " more ");
} }
function RolesPage_div_120_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 91)(1, "td")(2, "div", 92)(3, "div", 93);
    i0.ɵɵelement(4, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 94)(6, "span", 95);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 96);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(10, "td")(11, "span", 47);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵtemplate(14, RolesPage_div_120_ng_template_3_ng_container_14_Template, 5, 2, "ng-container", 97)(15, RolesPage_div_120_ng_template_3_ng_template_15_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "td")(18, "div", 98);
    i0.ɵɵtemplate(19, RolesPage_div_120_ng_template_3_span_19_Template, 2, 1, "span", 99)(20, RolesPage_div_120_ng_template_3_span_20_Template, 2, 1, "span", 100);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "td")(22, "span", 75);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "td", 101)(25, "div", 102)(26, "button", 103);
    i0.ɵɵelement(27, "i", 104);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "button", 105);
    i0.ɵɵlistener("click", function RolesPage_div_120_ng_template_3_Template_button_click_28_listener() { const role_r6 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.deleteRole(role_r6)); });
    i0.ɵɵelement(29, "i", 106);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const role_r6 = ctx.$implicit;
    const unassignedSecurityLevel_r7 = i0.ɵɵreference(16);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("row-system", role_r6.isSystem);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r1.getRoleIconStyle(role_r6));
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.getRoleIcon(role_r6));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(role_r6.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(role_r6.description || "No description provided");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", role_r6.hierarchyLevel ? "H" + role_r6.hierarchyLevel : "H1", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.securityLevelForRole(role_r6))("ngIfElse", unassignedSecurityLevel_r7);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", role_r6.permissions.slice(0, 3));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", role_r6.permissions.length > 3);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("status-badge--warning", role_r6.isSystem)("status-badge--success", !role_r6.isSystem);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", role_r6.isSystem ? "System" : "Custom", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r1.canManageAdmin())("routerLink", i0.ɵɵpureFunction1(20, _c2, role_r6.id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", role_r6.isSystem || ctx_r1.roleSaving() || !ctx_r1.canManageAdmin());
} }
function RolesPage_div_120_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 87)(1, "p-table", 88);
    i0.ɵɵlistener("onPage", function RolesPage_div_120_Template_p_table_onPage_1_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleRolesPage($event)); });
    i0.ɵɵtemplate(2, RolesPage_div_120_ng_template_2_Template, 13, 0, "ng-template", 71)(3, RolesPage_div_120_ng_template_3_Template, 30, 22, "ng-template", 72);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.roles())("tableStyle", i0.ɵɵpureFunction0(9, _c1))("scrollable", true)("scrollHeight", ctx_r1.rolesTableScrollHeight())("paginator", true)("rows", ctx_r1.rolesPageSize())("first", ctx_r1.rolesFirst())("rowsPerPageOptions", ctx_r1.rolesPageSizeOptions)("showCurrentPageReport", true);
} }
function RolesPage_div_143_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 78);
    i0.ɵɵelement(1, "div", 80);
    i0.ɵɵelementEnd();
} }
function RolesPage_div_143_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 76);
    i0.ɵɵtemplate(1, RolesPage_div_143_div_1_Template, 2, 0, "div", 77);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c3));
} }
function RolesPage_div_144_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 84)(1, "div", 85);
    i0.ɵɵelement(2, "i", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "No hierarchy to display");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Create roles to visualize the organization hierarchy.");
    i0.ɵɵelementEnd()();
} }
function RolesPage_div_145_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 113)(1, "div", 114)(2, "span", 115);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 116)(5, "span", 117);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(7, "div", 118)(8, "span", 119);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const node_r8 = ctx.$implicit;
    i0.ɵɵattribute("data-level", (node_r8.data == null ? null : node_r8.data.hierarchyLevel) ?? "")("data-role-name", ((node_r8.data == null ? null : node_r8.data.name) || "").toLowerCase());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(node_r8.data == null ? null : node_r8.data.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("H", (node_r8.data == null ? null : node_r8.data.hierarchyLevel) || "\u2014");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate((node_r8.data == null ? null : node_r8.data.description) || "No description");
} }
function RolesPage_div_145_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 110)(1, "p-organizationChart", 111);
    i0.ɵɵtemplate(2, RolesPage_div_145_ng_template_2_Template, 10, 5, "ng-template", 112);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.orgChartNodes());
} }
function RolesPage_ng_template_179_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Intent Pack");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Permissions");
    i0.ɵɵelementEnd()();
} }
function RolesPage_ng_template_180_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td")(6, "span", 47);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const pack_r9 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(pack_r9.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(pack_r9.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", pack_r9.permissions.length, " permissions");
} }
function RolesPage_ng_template_183_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Preset");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Hierarchy");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Permissions");
    i0.ɵɵelementEnd()();
} }
function RolesPage_ng_template_184_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td")(6, "span", 58);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td")(9, "span", 47);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const preset_r10 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(preset_r10.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(preset_r10.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("H", preset_r10.hierarchyLevel);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", preset_r10.permissions.length, " permissions");
} }
function RolesPage_ng_template_210_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Added");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Removed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Notes");
    i0.ɵɵelementEnd()();
} }
function RolesPage_ng_template_211_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td")(4, "span", 120);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td")(7, "span", 121);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵelement(10, "p-tag", 122);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r11 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r11.role.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r11.addedCount);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r11.removedCount);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("severity", ctx_r1.driftTone(row_r11.addedCount, row_r11.removedCount))("value", row_r11.hasDrift ? "Drifted" : "Aligned");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r11.role.driftNotes || "\u2014");
} }
export class RolesPage {
    dataService = inject(UserAdminDataService);
    toastService = inject(AppToastService);
    formBuilder = inject(FormBuilder);
    platformId = inject(PLATFORM_ID);
    isBrowser = isPlatformBrowser(this.platformId);
    roles = signal([], ...(ngDevMode ? [{ debugName: "roles" }] : []));
    rolesFirst = signal(0, ...(ngDevMode ? [{ debugName: "rolesFirst" }] : []));
    rolesPageSize = signal(10, ...(ngDevMode ? [{ debugName: "rolesPageSize" }] : []));
    viewportHeight = signal(900, ...(ngDevMode ? [{ debugName: "viewportHeight" }] : []));
    rolesPageSizeOptions = [10, 20, 30, 50];
    rolesTableScrollHeight = computed(() => {
        const height = this.viewportHeight();
        const reservedHeight = height < 760 ? 620 : height < 960 ? 700 : 740;
        const minHeight = height < 760 ? 140 : 180;
        const maxHeight = 520;
        const available = height - reservedHeight;
        const clamped = Math.max(minHeight, Math.min(maxHeight, available));
        return `${clamped}px`;
    }, ...(ngDevMode ? [{ debugName: "rolesTableScrollHeight" }] : []));
    permissionCatalog = signal([], ...(ngDevMode ? [{ debugName: "permissionCatalog" }] : []));
    intentPacks = signal([], ...(ngDevMode ? [{ debugName: "intentPacks" }] : []));
    permissionPackPresets = signal([], ...(ngDevMode ? [{ debugName: "permissionPackPresets" }] : []));
    securityLevels = signal([], ...(ngDevMode ? [{ debugName: "securityLevels" }] : []));
    loadingRoles = signal(true, ...(ngDevMode ? [{ debugName: "loadingRoles" }] : []));
    loadingPermissions = signal(true, ...(ngDevMode ? [{ debugName: "loadingPermissions" }] : []));
    loadingIntentPacks = signal(true, ...(ngDevMode ? [{ debugName: "loadingIntentPacks" }] : []));
    loadingPermissionPackPresets = signal(true, ...(ngDevMode ? [{ debugName: "loadingPermissionPackPresets" }] : []));
    loadingSecurityLevels = signal(true, ...(ngDevMode ? [{ debugName: "loadingSecurityLevels" }] : []));
    roleSaving = signal(false, ...(ngDevMode ? [{ debugName: "roleSaving" }] : []));
    securityLevelSaving = signal(false, ...(ngDevMode ? [{ debugName: "securityLevelSaving" }] : []));
    canManageAdmin = signal(false, ...(ngDevMode ? [{ debugName: "canManageAdmin" }] : []));
    rolesWorkspacePanels = signal(['directory', 'hierarchy'], ...(ngDevMode ? [{ debugName: "rolesWorkspacePanels" }] : []));
    securityEditorOpen = signal(false, ...(ngDevMode ? [{ debugName: "securityEditorOpen" }] : []));
    editingSecurityLevel = signal(null, ...(ngDevMode ? [{ debugName: "editingSecurityLevel" }] : []));
    orgChartNodes = computed(() => this.buildOrgChartNodes(), ...(ngDevMode ? [{ debugName: "orgChartNodes" }] : []));
    defaultSecurityLevelName = computed(() => {
        const defaultLevel = this.securityLevels().find((level) => level.isDefault);
        return defaultLevel?.name ?? 'Not set';
    }, ...(ngDevMode ? [{ debugName: "defaultSecurityLevelName" }] : []));
    /** Count of system roles */
    systemRolesCount = computed(() => this.roles().filter(r => r.isSystem).length, ...(ngDevMode ? [{ debugName: "systemRolesCount" }] : []));
    /** Count of custom roles */
    customRolesCount = computed(() => this.roles().filter(r => !r.isSystem).length, ...(ngDevMode ? [{ debugName: "customRolesCount" }] : []));
    rolesWithSecurityLevelCount = computed(() => this.roles().filter((role) => !!role.securityLevelId).length, ...(ngDevMode ? [{ debugName: "rolesWithSecurityLevelCount" }] : []));
    driftRows = computed(() => this.roles().map((role) => {
        const base = new Set(role.basePermissions ?? []);
        const current = new Set(role.permissions ?? []);
        const addedCount = Array.from(current).filter((permission) => !base.has(permission)).length;
        const removedCount = Array.from(base).filter((permission) => !current.has(permission)).length;
        return {
            role,
            addedCount,
            removedCount,
            hasDrift: addedCount > 0 || removedCount > 0
        };
    }), ...(ngDevMode ? [{ debugName: "driftRows" }] : []));
    driftedRolesCount = computed(() => this.driftRows().filter((row) => row.hasDrift).length, ...(ngDevMode ? [{ debugName: "driftedRolesCount" }] : []));
    securityLevelsById = computed(() => {
        const map = new Map();
        for (const level of this.securityLevels()) {
            map.set(level.id, level);
        }
        return map;
    }, ...(ngDevMode ? [{ debugName: "securityLevelsById" }] : []));
    securityForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(80)]],
        description: ['', [Validators.maxLength(240)]],
        rank: [0, [Validators.min(0)]],
        isDefault: [false]
    });
    constructor() {
        if (this.isBrowser) {
            this.viewportHeight.set(window.innerHeight);
        }
        this.canManageAdmin.set(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage));
        this.loadPermissions();
        this.loadRoles();
        this.loadSecurityLevels();
        this.loadIntentPacks();
        this.loadPermissionPackPresets();
    }
    loadRoles() {
        this.loadingRoles.set(true);
        this.dataService.getRoles().subscribe({
            next: (roles) => {
                this.roles.set(roles);
                if (this.rolesFirst() >= roles.length) {
                    this.rolesFirst.set(0);
                }
                this.loadingRoles.set(false);
            },
            error: () => {
                this.loadingRoles.set(false);
                this.raiseToast('error', 'Unable to load roles');
            }
        });
    }
    onWorkspacePanelsChange(next) {
        if (Array.isArray(next)) {
            this.rolesWorkspacePanels.set(next.map((value) => String(value)));
            return;
        }
        if (typeof next === 'string' || typeof next === 'number') {
            this.rolesWorkspacePanels.set([String(next)]);
            return;
        }
        this.rolesWorkspacePanels.set([]);
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
    loadSecurityLevels() {
        this.loadingSecurityLevels.set(true);
        this.dataService.getSecurityLevels().subscribe({
            next: (levels) => {
                this.securityLevels.set(levels ?? []);
                this.loadingSecurityLevels.set(false);
            },
            error: () => {
                this.loadingSecurityLevels.set(false);
                this.raiseToast('error', 'Unable to load security levels');
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
                this.loadingIntentPacks.set(false);
                this.raiseToast('error', 'Unable to load role intent packs');
            }
        });
    }
    loadPermissionPackPresets() {
        this.loadingPermissionPackPresets.set(true);
        this.dataService.getPermissionPackPresets().subscribe({
            next: (presets) => {
                this.permissionPackPresets.set(presets ?? []);
                this.loadingPermissionPackPresets.set(false);
            },
            error: () => {
                this.loadingPermissionPackPresets.set(false);
                this.raiseToast('error', 'Unable to load permission presets');
            }
        });
    }
    deleteRole(role) {
        if (role.isSystem || this.roleSaving()) {
            return;
        }
        if (!confirm(`Remove the ${role.name} role? Users assigned to it will lose those permissions.`)) {
            return;
        }
        this.roleSaving.set(true);
        this.dataService.deleteRole(role.id).subscribe({
            next: () => {
                this.roleSaving.set(false);
                this.raiseToast('success', 'Role removed');
                this.loadRoles();
            },
            error: () => {
                this.roleSaving.set(false);
                this.raiseToast('error', 'Unable to delete role');
            }
        });
    }
    handleRolesPage(event) {
        const nextRows = event.rows ?? this.rolesPageSize();
        const nextFirst = event.first ?? 0;
        this.rolesPageSize.set(nextRows);
        this.rolesFirst.set(nextFirst);
    }
    onViewportResize() {
        if (this.isBrowser) {
            this.viewportHeight.set(window.innerHeight);
        }
    }
    securityLevelForRole(role) {
        const levelId = role.securityLevelId;
        if (!levelId) {
            return null;
        }
        return this.securityLevelsById().get(levelId) ?? null;
    }
    openCreateSecurityLevel() {
        this.editingSecurityLevel.set(null);
        this.securityForm.reset({
            name: '',
            description: '',
            rank: this.nextSecurityLevelRank(),
            isDefault: this.securityLevels().length === 0
        });
        this.securityEditorOpen.set(true);
    }
    openEditSecurityLevel(level) {
        this.editingSecurityLevel.set(level);
        this.securityForm.reset({
            name: level.name,
            description: level.description ?? '',
            rank: level.rank,
            isDefault: level.isDefault
        });
        this.securityEditorOpen.set(true);
    }
    closeSecurityEditor() {
        this.securityEditorOpen.set(false);
        this.securityForm.markAsPristine();
        this.securityForm.markAsUntouched();
    }
    saveSecurityLevel() {
        if (this.securityLevelSaving()) {
            return;
        }
        if (this.securityForm.invalid) {
            this.securityForm.markAllAsTouched();
            return;
        }
        const payload = this.buildSecurityPayload();
        const current = this.editingSecurityLevel();
        this.securityLevelSaving.set(true);
        const request = current
            ? this.dataService.updateSecurityLevel(current.id, payload)
            : this.dataService.createSecurityLevel(payload);
        request.subscribe({
            next: () => {
                this.securityLevelSaving.set(false);
                this.raiseToast('success', current ? 'Security level updated' : 'Security level created');
                this.closeSecurityEditor();
                this.loadSecurityLevels();
                this.loadRoles();
            },
            error: (err) => {
                this.securityLevelSaving.set(false);
                const message = err?.error ?? 'Unable to save security level';
                this.raiseToast('error', message);
            }
        });
    }
    deleteSecurityLevel(level) {
        if (!this.canManageAdmin() || this.securityLevelSaving()) {
            return;
        }
        if (level.isDefault) {
            this.raiseToast('error', 'Default security level cannot be deleted');
            return;
        }
        if (!confirm(`Delete ${level.name}? Reassign any roles currently using this level first.`)) {
            return;
        }
        this.securityLevelSaving.set(true);
        this.dataService.deleteSecurityLevel(level.id).subscribe({
            next: () => {
                this.securityLevelSaving.set(false);
                this.raiseToast('success', 'Security level deleted');
                this.loadSecurityLevels();
                this.loadRoles();
            },
            error: (err) => {
                this.securityLevelSaving.set(false);
                const message = err?.error ?? 'Unable to delete security level';
                this.raiseToast('error', message);
            }
        });
    }
    setDefaultSecurityLevel(level) {
        if (!this.canManageAdmin() || this.securityLevelSaving() || level.isDefault) {
            return;
        }
        this.securityLevelSaving.set(true);
        const payload = {
            name: level.name,
            description: level.description ?? null,
            rank: level.rank,
            isDefault: true
        };
        this.dataService.updateSecurityLevel(level.id, payload).subscribe({
            next: () => {
                this.securityLevelSaving.set(false);
                this.raiseToast('success', `${level.name} is now the default security level`);
                this.loadSecurityLevels();
                this.loadRoles();
            },
            error: (err) => {
                this.securityLevelSaving.set(false);
                const message = err?.error ?? 'Unable to set default security level';
                this.raiseToast('error', message);
            }
        });
    }
    duplicateSecurityLevel(level) {
        if (!this.canManageAdmin() || this.securityLevelSaving()) {
            return;
        }
        this.securityLevelSaving.set(true);
        const payload = {
            name: this.uniqueSecurityLevelName(level.name),
            description: level.description ?? null,
            rank: this.nextSecurityLevelRank(),
            isDefault: false
        };
        this.dataService.createSecurityLevel(payload).subscribe({
            next: () => {
                this.securityLevelSaving.set(false);
                this.raiseToast('success', `${payload.name} created`);
                this.loadSecurityLevels();
            },
            error: (err) => {
                this.securityLevelSaving.set(false);
                const message = err?.error ?? 'Unable to duplicate security level';
                this.raiseToast('error', message);
            }
        });
    }
    securityLevelTag(level) {
        return level.isDefault ? 'success' : 'info';
    }
    securityLevelType(level) {
        return level.isDefault ? 'Default' : 'Custom';
    }
    driftTone(addedCount, removedCount) {
        if (removedCount > 0) {
            return 'warn';
        }
        if (addedCount > 0) {
            return 'success';
        }
        return 'info';
    }
    permissionLabel(key) {
        const definition = this.permissionCatalog().find((item) => item.key === key);
        const label = definition?.label?.trim();
        if (label) {
            return label;
        }
        const trimmed = key.replace(/^Permissions\./i, '');
        return trimmed.replace(/\./g, ' ') || key;
    }
    /** Returns an appropriate icon class based on role name */
    getRoleIcon(role) {
        const name = role.name.toLowerCase();
        // Admin roles
        if (name.includes('admin') || name.includes('administrator')) {
            return 'pi pi-crown';
        }
        // Customer success / support roles
        if (name.includes('customer success') || name.includes('support') || name.includes('service')) {
            return 'pi pi-heart';
        }
        // Sales roles
        if (name.includes('sales') || name.includes('account executive') || name.includes('business development')) {
            return 'pi pi-dollar';
        }
        // Manager roles
        if (name.includes('manager') || name.includes('lead') || name.includes('supervisor')) {
            return 'pi pi-users';
        }
        // Marketing roles
        if (name.includes('marketing') || name.includes('growth')) {
            return 'pi pi-megaphone';
        }
        // Viewer / read-only roles
        if (name.includes('viewer') || name.includes('read') || name.includes('guest')) {
            return 'pi pi-eye';
        }
        // Developer / technical roles
        if (name.includes('developer') || name.includes('engineer') || name.includes('technical')) {
            return 'pi pi-code';
        }
        // Analytics / reporting roles
        if (name.includes('analyst') || name.includes('analytics') || name.includes('report')) {
            return 'pi pi-chart-bar';
        }
        // System roles default
        if (role.isSystem) {
            return 'pi pi-shield';
        }
        // Custom roles default
        return 'pi pi-user-edit';
    }
    /** Returns the icon style class based on role type */
    getRoleIconStyle(role) {
        const name = role.name.toLowerCase();
        if (name.includes('admin') || name.includes('administrator')) {
            return 'role-icon--admin';
        }
        if (name.includes('customer success') || name.includes('support') || name.includes('service')) {
            return 'role-icon--success';
        }
        if (name.includes('sales') || name.includes('account executive')) {
            return 'role-icon--sales';
        }
        if (name.includes('manager') || name.includes('lead')) {
            return 'role-icon--manager';
        }
        if (role.isSystem) {
            return 'role-icon--system';
        }
        return 'role-icon--custom';
    }
    buildOrgChartNodes() {
        const roles = this.roles();
        if (!roles.length) {
            return [];
        }
        const nodesById = new Map();
        roles.forEach((role) => {
            nodesById.set(role.id, {
                label: role.name,
                data: role,
                expanded: true,
                children: []
            });
        });
        const roots = [];
        roles.forEach((role) => {
            const node = nodesById.get(role.id);
            const parentId = role.parentRoleId ?? null;
            if (parentId && nodesById.has(parentId)) {
                const parent = nodesById.get(parentId);
                parent.children = parent.children ?? [];
                parent.children.push(node);
            }
            else {
                roots.push(node);
            }
        });
        // If all roles are roots (no parentRoleId links), infer tree from hierarchyLevel
        if (roots.length === roles.length && roots.length > 1) {
            return this.inferHierarchyFromLevels(roots);
        }
        return roots;
    }
    /**
     * Build a tree from hierarchyLevel when no parentRoleId links exist.
     * Groups roles by level and distributes children round-robin among parents.
     */
    inferHierarchyFromLevels(nodes) {
        const byLevel = new Map();
        let minLevel = Infinity;
        for (const node of nodes) {
            const level = node.data?.hierarchyLevel ?? 1;
            if (level < minLevel)
                minLevel = level;
            if (!byLevel.has(level))
                byLevel.set(level, []);
            byLevel.get(level).push(node);
        }
        const levels = [...byLevel.keys()].sort((a, b) => a - b);
        if (levels.length <= 1) {
            return nodes; // all same level — show as flat roots
        }
        const roots = byLevel.get(levels[0]) ?? [];
        for (let i = 1; i < levels.length; i++) {
            const children = byLevel.get(levels[i]) ?? [];
            // Find the nearest ancestor level that has nodes
            let parents = [];
            for (let p = i - 1; p >= 0; p--) {
                parents = byLevel.get(levels[p]) ?? [];
                if (parents.length)
                    break;
            }
            if (!parents.length) {
                roots.push(...children);
                continue;
            }
            children.forEach((child, idx) => {
                const parent = parents[idx % parents.length];
                parent.children = parent.children ?? [];
                parent.children.push(child);
            });
        }
        return roots;
    }
    clearToast() {
        this.toastService.clear();
    }
    buildSecurityPayload() {
        const value = this.securityForm.value;
        return {
            name: value.name?.trim() ?? '',
            description: value.description?.trim() ? value.description.trim() : null,
            rank: typeof value.rank === 'number' ? value.rank : 0,
            isDefault: value.isDefault ?? false
        };
    }
    nextSecurityLevelRank() {
        const levels = this.securityLevels();
        if (!levels.length) {
            return 0;
        }
        return Math.max(...levels.map((level) => level.rank)) + 1;
    }
    uniqueSecurityLevelName(baseName) {
        const trimmed = (baseName || 'Security Level').trim();
        const names = new Set(this.securityLevels().map((level) => level.name.trim().toLowerCase()));
        let candidate = `${trimmed} Copy`;
        if (!names.has(candidate.toLowerCase())) {
            return candidate;
        }
        let i = 2;
        while (names.has(`${candidate} ${i}`.toLowerCase())) {
            i += 1;
        }
        return `${candidate} ${i}`;
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    static ɵfac = function RolesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RolesPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RolesPage, selectors: [["app-roles-page"]], hostBindings: function RolesPage_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("resize", function RolesPage_resize_HostBindingHandler() { return ctx.onViewportResize(); }, i0.ɵɵresolveWindow);
        } }, decls: 212, vars: 40, consts: [["unassignedSecurityLevel", ""], [1, "page-container"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-stats"], [1, "hero-stat"], [1, "stat-value"], [1, "stat-label"], [1, "stat-bar"], [1, "stat-bar-fill", 2, "width", "100%"], [1, "stat-bar-fill", "stat-bar-fill--warning"], [1, "stat-bar-fill", "stat-bar-fill--success"], [1, "stat-bar-fill", "stat-bar-fill--info", 2, "width", "100%"], [1, "hero-actions"], ["type", "button", "routerLink", "/app/settings/roles/new", 1, "action-btn", "action-btn--add", 3, "disabled"], [1, "action-btn__icon"], [1, "pi", "pi-plus"], ["type", "button", "routerLink", "/app/settings/security-levels", 1, "action-btn", "action-btn--security", 3, "disabled"], [1, "pi", "pi-lock"], ["type", "button", "routerLink", "/app/settings/users", 1, "action-btn", "action-btn--users"], [1, "pi", "pi-users"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click"], [1, "pi", "pi-refresh"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-shield"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend"], [1, "visual-card", "visual-card--secondary"], [1, "pi", "pi-check-circle"], [1, "data-section"], [1, "data-card", "workspace-card"], [1, "roles-workspace-accordion", 3, "valueChange", "multiple", "value"], ["value", "directory"], [1, "workspace-accordion-header"], [1, "workspace-accordion-header__title"], [1, "pi", "pi-sitemap"], [1, "workspace-accordion-header__badges"], [1, "status-badge", "status-badge--info"], [1, "data-header"], [1, "header-title"], [1, "record-count"], [1, "header-actions"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click", "disabled"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "table-wrapper table-wrapper--roles", 4, "ngIf"], ["value", "hierarchy"], [1, "pi", "pi-share-alt"], [1, "status-badge", "status-badge--security"], ["pButton", "", "type", "button", 1, "action-btn", 3, "click", "disabled"], ["class", "orgchart-wrapper", 4, "ngIf"], ["value", "presets"], [1, "pi", "pi-th-large"], [1, "security-levels-section"], [1, "security-levels-header"], [1, "security-levels-title"], [1, "security-levels-actions"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", 3, "click", "disabled"], ["pButton", "", "type", "button", "routerLink", "/app/settings/roles/new", 1, "btn", "btn-primary", 3, "disabled"], [1, "table-wrapper"], ["styleClass", "data-table security-level-table", "responsiveLayout", "scroll", 3, "value"], ["pTemplate", "header"], ["pTemplate", "body"], ["value", "drift"], [1, "pi", "pi-sliders-h"], [1, "status-badge"], [1, "loading-state"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton", "skeleton-avatar"], [1, "skeleton", "skeleton-text"], [1, "skeleton", "skeleton-text", "skeleton-short"], [1, "skeleton", "skeleton-badge"], [1, "skeleton", "skeleton-actions"], [1, "empty-state"], [1, "empty-icon"], ["pButton", "", "type", "button", "routerLink", "/app/settings/roles/new", 1, "btn", "btn-primary"], [1, "table-wrapper", "table-wrapper--roles"], ["responsiveLayout", "scroll", "currentPageReportTemplate", "Showing {first} to {last} of {totalRecords} roles", 1, "data-table", "roles-directory-table", 3, "onPage", "value", "tableStyle", "scrollable", "scrollHeight", "paginator", "rows", "first", "rowsPerPageOptions", "showCurrentPageReport"], [1, "th-role"], [1, "th-actions"], [1, "table-row"], [1, "td-role"], [1, "role-icon", 3, "ngClass"], [1, "role-info"], [1, "role-name"], [1, "role-description"], [4, "ngIf", "ngIfElse"], [1, "permission-pills"], ["class", "permission-pill", 4, "ngFor", "ngForOf"], ["class", "permission-pill permission-pill--more", 4, "ngIf"], [1, "td-actions"], [1, "row-actions"], ["type", "button", "title", "Edit role", 1, "row-action-btn", "row-action-btn--edit", 3, "disabled", "routerLink"], [1, "pi", "pi-pencil"], ["type", "button", "title", "Delete role", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "pi", "pi-trash"], [1, "status-badge__sub"], [1, "permission-pill"], [1, "permission-pill", "permission-pill--more"], [1, "orgchart-wrapper"], ["selectionMode", "single", 3, "value"], ["pTemplate", "default"], [1, "org-node"], [1, "org-title"], [1, "org-name"], [1, "org-badges"], [1, "org-badge"], [1, "org-meta"], [1, "org-desc"], [1, "status-badge", "status-badge--success"], [1, "status-badge", "status-badge--warning"], [3, "severity", "value"]], template: function RolesPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵelement(1, "app-breadcrumbs");
            i0.ɵɵelementStart(2, "section", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelement(5, "span", 5);
            i0.ɵɵelementStart(6, "span");
            i0.ɵɵtext(7, "Access Control");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "h1", 6)(9, "span", 7);
            i0.ɵɵtext(10, "Role");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "span", 8);
            i0.ɵɵtext(12, "Management");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(13, "p", 9);
            i0.ɵɵelementStart(14, "div", 10)(15, "div", 11)(16, "div", 12);
            i0.ɵɵtext(17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "div", 13);
            i0.ɵɵtext(19, "Total Roles");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 14);
            i0.ɵɵelement(21, "div", 15);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(22, "div", 11)(23, "div", 12);
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 13);
            i0.ɵɵtext(26, "System");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 14);
            i0.ɵɵelement(28, "div", 16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "div", 11)(30, "div", 12);
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 13);
            i0.ɵɵtext(33, "Custom");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 14);
            i0.ɵɵelement(35, "div", 17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "div", 11)(37, "div", 12);
            i0.ɵɵtext(38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 13);
            i0.ɵɵtext(40, "Permissions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div", 14);
            i0.ɵɵelement(42, "div", 18);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(43, "div", 19)(44, "button", 20)(45, "span", 21);
            i0.ɵɵelement(46, "i", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "span");
            i0.ɵɵtext(48, "New Role");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(49, "button", 23)(50, "span", 21);
            i0.ɵɵelement(51, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "span");
            i0.ɵɵtext(53, "Manage Security Levels");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(54, "button", 25)(55, "span", 21);
            i0.ɵɵelement(56, "i", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "span");
            i0.ɵɵtext(58, "Manage Users");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(59, "button", 27);
            i0.ɵɵlistener("click", function RolesPage_Template_button_click_59_listener() { return ctx.loadRoles(); });
            i0.ɵɵelementStart(60, "span", 21);
            i0.ɵɵelement(61, "i", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "span");
            i0.ɵɵtext(63, "Refresh");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(64, "div", 29)(65, "div", 30)(66, "div", 31);
            i0.ɵɵelement(67, "i", 32);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "div", 33)(69, "span", 34);
            i0.ɵɵtext(70, "Access Profiles");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "strong", 35);
            i0.ɵɵtext(72);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "span", 36);
            i0.ɵɵelement(74, "i", 24);
            i0.ɵɵtext(75, " Auditable permissions ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(76, "div", 37)(77, "div", 31);
            i0.ɵɵelement(78, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "div", 33)(80, "span", 34);
            i0.ɵɵtext(81, "Default Security Level");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(82, "strong", 35);
            i0.ɵɵtext(83);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "span", 36);
            i0.ɵɵelement(85, "i", 38);
            i0.ɵɵtext(86, " Tenant-defined access tier ");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(87, "section", 39)(88, "div", 40)(89, "p-accordion", 41);
            i0.ɵɵlistener("valueChange", function RolesPage_Template_p_accordion_valueChange_89_listener($event) { return ctx.onWorkspacePanelsChange($event); });
            i0.ɵɵelementStart(90, "p-accordion-panel", 42)(91, "p-accordion-header")(92, "div", 43)(93, "div", 44);
            i0.ɵɵelement(94, "i", 45);
            i0.ɵɵelementStart(95, "span");
            i0.ɵɵtext(96, "Role Directory");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(97, "div", 46)(98, "span", 47);
            i0.ɵɵtext(99);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(100, "p-accordion-content")(101, "div", 48)(102, "div", 49)(103, "h2");
            i0.ɵɵtext(104, "Role Directory");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(105, "span", 50);
            i0.ɵɵtext(106);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(107, "div", 51)(108, "button", 20)(109, "span", 21);
            i0.ɵɵelement(110, "i", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(111, "span");
            i0.ɵɵtext(112, "Add Role");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(113, "button", 52);
            i0.ɵɵlistener("click", function RolesPage_Template_button_click_113_listener() { return ctx.loadRoles(); });
            i0.ɵɵelementStart(114, "span", 21);
            i0.ɵɵelement(115, "i", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(116, "span");
            i0.ɵɵtext(117, "Reload");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(118, RolesPage_div_118_Template, 2, 2, "div", 53)(119, RolesPage_div_119_Template, 10, 0, "div", 54)(120, RolesPage_div_120_Template, 4, 10, "div", 55);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(121, "p-accordion-panel", 56)(122, "p-accordion-header")(123, "div", 43)(124, "div", 44);
            i0.ɵɵelement(125, "i", 57);
            i0.ɵɵelementStart(126, "span");
            i0.ɵɵtext(127, "Organization Hierarchy");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(128, "div", 46)(129, "span", 58);
            i0.ɵɵtext(130);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(131, "p-accordion-content")(132, "div", 48)(133, "div", 49)(134, "h2");
            i0.ɵɵtext(135, "Organization Hierarchy");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(136, "span", 50);
            i0.ɵɵtext(137, "Visual org chart of role relationships");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(138, "div", 51)(139, "button", 59);
            i0.ɵɵlistener("click", function RolesPage_Template_button_click_139_listener() { return ctx.loadRoles(); });
            i0.ɵɵelement(140, "i", 28);
            i0.ɵɵelementStart(141, "span");
            i0.ɵɵtext(142, "Reload");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(143, RolesPage_div_143_Template, 2, 2, "div", 53)(144, RolesPage_div_144_Template, 7, 0, "div", 54)(145, RolesPage_div_145_Template, 3, 1, "div", 60);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(146, "p-accordion-panel", 61)(147, "p-accordion-header")(148, "div", 43)(149, "div", 44);
            i0.ɵɵelement(150, "i", 62);
            i0.ɵɵelementStart(151, "span");
            i0.ɵɵtext(152, "Role Presets");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(153, "div", 46)(154, "span", 47);
            i0.ɵɵtext(155);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(156, "p-accordion-content")(157, "div", 63)(158, "div", 64)(159, "div", 65)(160, "h3");
            i0.ɵɵtext(161, "Role Presets");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(162, "span", 50);
            i0.ɵɵtext(163, "Intent packs and hierarchy presets for fast role creation");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(164, "div", 66)(165, "button", 67);
            i0.ɵɵlistener("click", function RolesPage_Template_button_click_165_listener() { return ctx.loadIntentPacks(); });
            i0.ɵɵelement(166, "i", 28);
            i0.ɵɵelementStart(167, "span");
            i0.ɵɵtext(168, "Reload intents");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(169, "button", 67);
            i0.ɵɵlistener("click", function RolesPage_Template_button_click_169_listener() { return ctx.loadPermissionPackPresets(); });
            i0.ɵɵelement(170, "i", 28);
            i0.ɵɵelementStart(171, "span");
            i0.ɵɵtext(172, "Reload presets");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(173, "button", 68);
            i0.ɵɵelement(174, "i", 22);
            i0.ɵɵelementStart(175, "span");
            i0.ɵɵtext(176, "New Role");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(177, "div", 69)(178, "p-table", 70);
            i0.ɵɵtemplate(179, RolesPage_ng_template_179_Template, 7, 0, "ng-template", 71)(180, RolesPage_ng_template_180_Template, 8, 3, "ng-template", 72);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(181, "div", 69)(182, "p-table", 70);
            i0.ɵɵtemplate(183, RolesPage_ng_template_183_Template, 9, 0, "ng-template", 71)(184, RolesPage_ng_template_184_Template, 11, 4, "ng-template", 72);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(185, "p-accordion-panel", 73)(186, "p-accordion-header")(187, "div", 43)(188, "div", 44);
            i0.ɵɵelement(189, "i", 74);
            i0.ɵɵelementStart(190, "span");
            i0.ɵɵtext(191, "Drift Monitor");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(192, "div", 46)(193, "span", 75);
            i0.ɵɵtext(194);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(195, "p-accordion-content")(196, "div", 63)(197, "div", 64)(198, "div", 65)(199, "h3");
            i0.ɵɵtext(200, "Role Drift Monitor");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(201, "span", 50);
            i0.ɵɵtext(202);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(203, "div", 66)(204, "button", 67);
            i0.ɵɵlistener("click", function RolesPage_Template_button_click_204_listener() { return ctx.loadRoles(); });
            i0.ɵɵelement(205, "i", 28);
            i0.ɵɵelementStart(206, "span");
            i0.ɵɵtext(207, "Refresh drift");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(208, "div", 69)(209, "p-table", 70);
            i0.ɵɵtemplate(210, RolesPage_ng_template_210_Template, 11, 0, "ng-template", 71)(211, RolesPage_ng_template_211_Template, 13, 6, "ng-template", 72);
            i0.ɵɵelementEnd()()()()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(17);
            i0.ɵɵtextInterpolate(ctx.roles().length);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.systemRolesCount());
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.roles().length ? ctx.systemRolesCount() / ctx.roles().length * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.customRolesCount());
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.roles().length ? ctx.customRolesCount() / ctx.roles().length * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.permissionCatalog().length);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("disabled", ctx.roleSaving() || !ctx.canManageAdmin());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", !ctx.canManageAdmin());
            i0.ɵɵadvance(23);
            i0.ɵɵtextInterpolate(ctx.roles().length);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.defaultSecurityLevelName());
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("multiple", true)("value", ctx.rolesWorkspacePanels());
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1("", ctx.roles().length, " roles");
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1("", ctx.roles().length, " roles configured");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.roleSaving() || !ctx.canManageAdmin());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", ctx.loadingRoles());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.loadingRoles());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loadingRoles() && ctx.roles().length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loadingRoles() && ctx.roles().length > 0);
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1("", ctx.roles().length, " nodes");
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("disabled", ctx.loadingRoles());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.loadingRoles());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loadingRoles() && ctx.roles().length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loadingRoles() && ctx.roles().length > 0);
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate1("", ctx.intentPacks().length + ctx.permissionPackPresets().length, " items");
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("disabled", ctx.loadingIntentPacks());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.loadingPermissionPackPresets());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", !ctx.canManageAdmin());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("value", ctx.intentPacks());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("value", ctx.permissionPackPresets());
            i0.ɵɵadvance(11);
            i0.ɵɵclassProp("status-badge--warning", ctx.driftedRolesCount() > 0)("status-badge--success", ctx.driftedRolesCount() === 0);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.driftedRolesCount(), " drifted ");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1("", ctx.driftedRolesCount(), " roles differ from their base permissions");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.loadingRoles());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("value", ctx.driftRows());
        } }, dependencies: [ButtonModule, i1.ButtonDirective, i2.PrimeTemplate, AccordionModule, i3.Accordion, i3.AccordionPanel, i3.AccordionHeader, i3.AccordionContent, OrganizationChartModule, i4.OrganizationChart, NgClass,
            NgFor,
            NgIf,
            RouterLink,
            SkeletonModule,
            TableModule, i5.Table, TagModule, i6.Tag, TooltipModule,
            BreadcrumbsComponent], styles: ["\n\n\n\n\n\n\n\n\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}\n\n\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n}\n\n*[_ngcontent-%COMP%], \n*[_ngcontent-%COMP%]::before, \n*[_ngcontent-%COMP%]::after {\n  box-sizing: border-box;\n}\n\n.page-container[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  padding: 1.5rem 2rem;\n  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n  overflow-x: hidden;\n  max-width: 100%;\n}\n\n\n\n\n\n.hero-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 2rem;\n  padding: 2rem;\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 20px;\n  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);\n  margin-bottom: 1.5rem;\n  animation: _ngcontent-%COMP%_fade-in-up 0.4s ease-out;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.4rem 0.85rem;\n  background: rgba(139, 92, 246, 0.1);\n  border: 1px solid rgba(139, 92, 246, 0.2);\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #7c3aed;\n  width: fit-content;\n}\n\n.badge-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  background: #8b5cf6;\n  border-radius: 50%;\n}\n\n\n.hero-description[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: rgba(60, 60, 67, 0.7);\n  max-width: 480px;\n  margin: 0;\n}\n\n.hero-stats[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 1.25rem;\n  padding: 1.25rem 0;\n  border-top: 1px solid rgba(148, 163, 184, 0.15);\n  border-bottom: 1px solid rgba(148, 163, 184, 0.15);\n\n  @media (max-width: 768px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n.hero-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.stat-bar[_ngcontent-%COMP%] {\n  height: 4px;\n  background: rgba(148, 163, 184, 0.2);\n  border-radius: 2px;\n  overflow: hidden;\n  margin-top: 0.4rem;\n}\n\n.stat-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: linear-gradient(90deg, #8b5cf6, #0ea5e9);\n  border-radius: 2px;\n  transition: width 0.4s ease;\n\n  &--warning { background: linear-gradient(90deg, #f59e0b, #fbbf24); }\n  &--success { background: linear-gradient(90deg, #10b981, #34d399); }\n  &--info { background: linear-gradient(90deg, #0ea5e9, #06b6d4); }\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n  flex-wrap: wrap;\n}\n\n\n\n\n\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n\n  @media (max-width: 1100px) {\n    flex-direction: row;\n  }\n\n  @media (max-width: 600px) {\n    flex-direction: column;\n  }\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  padding: 1.25rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  transition: all 0.2s ease;\n  flex: 1;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n    border-color: rgba(139, 92, 246, 0.15);\n  }\n\n  &--secondary {\n    background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);\n    border-color: rgba(14, 165, 233, 0.15);\n  }\n}\n\n.card-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n\n  i {\n    font-size: 1.1rem;\n    color: #7c3aed;\n  }\n\n  .visual-card--secondary & {\n    background: rgba(14, 165, 233, 0.12);\n    i { color: #0284c7; }\n  }\n}\n\n.card-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n\n.card-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.card-value[_ngcontent-%COMP%] {\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.card-trend[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.6);\n\n  i { font-size: 0.625rem; }\n}\n\n\n\n\n\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-decoration: none;\n  white-space: nowrap;\n\n  i {\n    font-size: 0.85rem;\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%);\n  color: #fff;\n\n  &:hover:not(:disabled) {\n    transform: translateY(-1px);\n    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.35);\n  }\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: rgba(15, 23, 42, 0.8);\n\n  span,\n  .p-button-label,\n  i {\n    color: rgba(15, 23, 42, 0.8) !important;\n  }\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.5);\n\n    span,\n    .p-button-label,\n    i {\n      color: rgba(15, 23, 42, 0.85) !important;\n    }\n  }\n}\n\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  color: rgba(60, 60, 67, 0.8);\n\n  span,\n  .p-button-label,\n  i {\n    color: rgba(60, 60, 67, 0.8) !important;\n  }\n\n  &:hover:not(:disabled) {\n    background: rgba(255, 255, 255, 0.8);\n    border-color: rgba(148, 163, 184, 0.4);\n\n    span,\n    .p-button-label,\n    i {\n      color: rgba(30, 41, 59, 0.88) !important;\n    }\n  }\n}\n\n\n\n\n\n.data-section[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fade-in-up 0.4s ease-out 0.1s both;\n}\n\n.data-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 20px;\n  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);\n  overflow: hidden;\n}\n\n.workspace-card[_ngcontent-%COMP%] {\n  padding: 0;\n}\n\n[_nghost-%COMP%]     .workspace-card {\n  .p-accordion {\n    background: transparent;\n  }\n\n  .p-accordionpanel {\n    border: none;\n    background: transparent;\n  }\n\n  .p-accordionheader {\n    padding: 0.55rem 0.75rem 0;\n    background: transparent;\n    border: none;\n  }\n\n  .p-accordionheader-toggle-icon {\n    color: rgba(51, 65, 85, 0.8);\n  }\n\n  .p-accordioncontent {\n    padding: 0.55rem 0.75rem 0.75rem;\n    background: transparent;\n  }\n\n  .p-accordioncontent-content {\n    padding: 0;\n    background: transparent;\n    border: none;\n  }\n\n  .p-tabs {\n    background: transparent;\n  }\n\n  .p-tablist {\n    padding: 0.65rem 0.9rem 0;\n    border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n    background: rgba(248, 250, 252, 0.85);\n  }\n\n  .p-tab {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    border-radius: 8px 8px 0 0;\n    font-weight: 600;\n    color: rgba(51, 65, 85, 0.88);\n    padding: 0.75rem 1rem 0.7rem;\n    border: 1px solid transparent;\n    border-bottom: none;\n    transition: color 0.18s ease, background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;\n\n    &:hover {\n      color: #1e40af;\n      background: rgba(255, 255, 255, 0.75);\n    }\n  }\n\n  .p-tab.p-tab-active,\n  .p-tab[aria-selected='true'] {\n    color: #1d4ed8;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(239, 246, 255, 0.9) 100%);\n    border-color: rgba(59, 130, 246, 0.38);\n    box-shadow: 0 -1px 0 rgba(59, 130, 246, 0.2), 0 6px 14px rgba(37, 99, 235, 0.12);\n    z-index: 1;\n  }\n\n  .p-tab.p-tab-active::after,\n  .p-tab[aria-selected='true']::after {\n    content: '';\n    position: absolute;\n    left: 0.9rem;\n    right: 0.9rem;\n    bottom: -1px;\n    height: 3px;\n    border-radius: 999px;\n    background: linear-gradient(90deg, #2563eb 0%, #0ea5e9 100%);\n  }\n\n  .p-tabpanels {\n    padding: 0.75rem;\n    background: transparent;\n  }\n}\n\n.workspace-accordion-header[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(246, 249, 255, 0.88) 100%);\n  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);\n}\n\n.workspace-accordion-header__title[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n  min-width: 0;\n  color: rgba(30, 41, 59, 0.95);\n  font-weight: 700;\n\n  i {\n    color: #2563eb;\n    font-size: 0.95rem;\n  }\n}\n\n.workspace-accordion-header__badges[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.15rem 1.35rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n\n@media (max-width: 768px) {\n  .workspace-accordion-header[_ngcontent-%COMP%] {\n    padding: 0.75rem 0.85rem;\n    gap: 0.55rem;\n    flex-wrap: wrap;\n  }\n\n  .workspace-accordion-header__title[_ngcontent-%COMP%] {\n    font-size: 0.92rem;\n  }\n\n  .workspace-accordion-header__badges[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-start;\n  }\n}\n\n.view-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.25rem;\n  padding: 0.2rem;\n  border-radius: 10px;\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.72) 0%, rgba(241, 245, 255, 0.58) 100%);\n  border: 1px solid rgba(148, 163, 184, 0.26);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);\n}\n\n.view-toggle--segmented[_ngcontent-%COMP%] {\n  display: inline-grid;\n  grid-template-columns: repeat(2, minmax(112px, 1fr));\n  min-width: 236px;\n}\n\n.toggle-btn[_ngcontent-%COMP%] {\n  position: relative;\n  border: 1px solid transparent;\n  background: transparent;\n  padding: 0.34rem 0.88rem;\n  border-radius: 6px;\n  min-width: 112px;\n  font-weight: 600;\n  font-size: 0.8rem;\n  line-height: 1.2;\n  color: rgba(71, 85, 105, 0.9);\n  cursor: pointer;\n  transition: all 0.18s ease;\n  white-space: nowrap;\n  overflow: visible;\n  text-overflow: clip;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n\n  span,\n  .p-button-label,\n  i,\n  .p-button-icon,\n  .p-button-icon-left,\n  .p-button-icon-right {\n    color: inherit !important;\n    opacity: 1;\n  }\n\n  &:hover:not(:disabled) {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(148, 163, 184, 0.28);\n    color: rgba(51, 65, 85, 0.96);\n  }\n}\n\n.toggle-btn.active[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(237, 245, 255, 0.9) 100%);\n  border-color: rgba(59, 130, 246, 0.28);\n  color: #1d4ed8;\n  box-shadow: 0 3px 8px rgba(59, 130, 246, 0.12);\n}\n\n.toggle-btn.active[_ngcontent-%COMP%]::after {\n  content: '';\n  position: absolute;\n  left: 0.5rem;\n  right: 0.5rem;\n  bottom: -1px;\n  height: 2px;\n  border-radius: 99px;\n  background: #2563eb;\n}\n\n.orgchart-wrapper[_ngcontent-%COMP%] {\n  padding: 1.25rem;\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);\n  overflow-x: auto;\n\n  -shadowcsshost-no-combinator ::ng-deep .p-organizationchart-line-down,\n  -shadowcsshost-no-combinator ::ng-deep .p-organizationchart-line-left,\n  -shadowcsshost-no-combinator ::ng-deep .p-organizationchart-line-right {\n    border-color: rgba(37, 99, 235, 0.55) !important;\n    box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);\n  }\n\n  -shadowcsshost-no-combinator ::ng-deep .p-organizationchart-table > tbody > tr > td {\n    padding: 0.4rem 0.25rem;\n  }\n}\n\n.org-node[_ngcontent-%COMP%] {\n  --org-level-primary: #2563eb;\n  --org-level-secondary: #1d4ed8;\n  --org-level-border: rgba(37, 99, 235, 0.44);\n  --org-level-badge-bg: rgba(37, 99, 235, 0.22);\n  --org-level-badge-text: #dbeafe;\n  min-width: 200px;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background:\n    linear-gradient(160deg, color-mix(in srgb, var(--org-level-primary) 30%, #ffffff 70%), color-mix(in srgb, var(--org-level-secondary) 34%, #ffffff 66%)),\n    radial-gradient(circle at 20% 12%, color-mix(in srgb, var(--org-level-primary) 28%, transparent), transparent 58%);\n  border: 1px solid var(--org-level-border);\n  box-shadow:\n    0 12px 26px color-mix(in srgb, var(--org-level-primary) 22%, transparent),\n    inset 0 1px 0 rgba(255, 255, 255, 0.72);\n  position: relative;\n  overflow: hidden;\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0 auto 0 0;\n    width: 5px;\n    background: linear-gradient(180deg, var(--org-level-primary), var(--org-level-secondary));\n    box-shadow: 0 0 16px color-mix(in srgb, var(--org-level-primary) 45%, transparent);\n  }\n\n  &::after {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(120deg, rgba(255, 255, 255, 0.2), transparent 35%, transparent 70%, rgba(255, 255, 255, 0.14));\n    pointer-events: none;\n  }\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow:\n      0 16px 30px color-mix(in srgb, var(--org-level-primary) 26%, transparent),\n      inset 0 1px 0 rgba(255, 255, 255, 0.94);\n  }\n\n  &[data-level='1'] {\n    --org-level-primary: #0ea5e9;\n    --org-level-secondary: #0369a1;\n    --org-level-border: rgba(14, 165, 233, 0.48);\n    --org-level-badge-bg: rgba(14, 165, 233, 0.28);\n    --org-level-badge-text: #ecfeff;\n    background:\n      linear-gradient(160deg, rgba(34, 211, 238, 0.42), rgba(14, 165, 233, 0.2)),\n      radial-gradient(circle at 20% 12%, rgba(14, 165, 233, 0.26), transparent 60%);\n    border-color: var(--org-level-border);\n  }\n\n  &[data-level='2'] {\n    --org-level-primary: #8b5cf6;\n    --org-level-secondary: #6d28d9;\n    --org-level-border: rgba(139, 92, 246, 0.48);\n    --org-level-badge-bg: rgba(139, 92, 246, 0.26);\n    --org-level-badge-text: #f3e8ff;\n    background:\n      linear-gradient(160deg, rgba(167, 139, 250, 0.42), rgba(124, 58, 237, 0.2)),\n      radial-gradient(circle at 20% 12%, rgba(139, 92, 246, 0.24), transparent 60%);\n    border-color: var(--org-level-border);\n  }\n\n  &[data-level='3'] {\n    --org-level-primary: #f97316;\n    --org-level-secondary: #c2410c;\n    --org-level-border: rgba(249, 115, 22, 0.5);\n    --org-level-badge-bg: rgba(249, 115, 22, 0.28);\n    --org-level-badge-text: #fff7ed;\n    background:\n      linear-gradient(160deg, rgba(251, 146, 60, 0.45), rgba(234, 88, 12, 0.2)),\n      radial-gradient(circle at 20% 12%, rgba(249, 115, 22, 0.25), transparent 60%);\n    border-color: var(--org-level-border);\n  }\n\n  &[data-level='4'] {\n    --org-level-primary: #10b981;\n    --org-level-secondary: #047857;\n    --org-level-border: rgba(16, 185, 129, 0.5);\n    --org-level-badge-bg: rgba(16, 185, 129, 0.28);\n    --org-level-badge-text: #ecfdf5;\n    background:\n      linear-gradient(160deg, rgba(52, 211, 153, 0.42), rgba(5, 150, 105, 0.2)),\n      radial-gradient(circle at 20% 12%, rgba(16, 185, 129, 0.25), transparent 60%);\n    border-color: var(--org-level-border);\n  }\n\n  &[data-level='5'],\n  &[data-level='6'],\n  &[data-level='7'] {\n    --org-level-primary: #f43f5e;\n    --org-level-secondary: #be123c;\n    --org-level-border: rgba(244, 63, 94, 0.48);\n    --org-level-badge-bg: rgba(244, 63, 94, 0.26);\n    --org-level-badge-text: #fff1f2;\n    background:\n      linear-gradient(160deg, rgba(251, 113, 133, 0.42), rgba(225, 29, 72, 0.2)),\n      radial-gradient(circle at 20% 12%, rgba(244, 63, 94, 0.22), transparent 60%);\n    border-color: var(--org-level-border);\n  }\n}\n\n.org-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n\n.org-name[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #0f172a;\n  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.45);\n  font-size: 0.88rem;\n  line-height: 1.2;\n}\n\n.org-badges[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.35rem;\n}\n\n.org-badge[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  padding: 0.22rem 0.5rem;\n  border-radius: 999px;\n  background: var(--org-level-badge-bg);\n  color: var(--org-level-badge-text);\n  font-weight: 700;\n  border: 1px solid color-mix(in srgb, var(--org-level-primary) 52%, white 48%);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.35),\n    0 4px 10px color-mix(in srgb, var(--org-level-primary) 26%, transparent);\n}\n\n.org-meta[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  font-size: 0.8rem;\n  color: rgba(51, 65, 85, 0.85);\n  line-height: 1.3;\n}\n\n.org-desc[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.header-title[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n\n  h2 {\n    font-size: 1.05rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.record-count[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.65rem;\n}\n\n.action-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.55rem 0.9rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 8px;\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: rgba(60, 60, 67, 0.8);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-decoration: none;\n\n  span,\n  .p-button-label,\n  i,\n  .p-button-icon,\n  .p-button-icon-left,\n  .p-button-icon-right {\n    color: rgba(60, 60, 67, 0.8) !important;\n    opacity: 1;\n  }\n\n  i {\n    font-size: 0.75rem;\n  }\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.35);\n\n    span,\n    .p-button-label,\n    i,\n    .p-button-icon,\n    .p-button-icon-left,\n    .p-button-icon-right {\n      color: rgba(30, 41, 59, 0.9) !important;\n    }\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%);\n    border-color: transparent;\n    color: #fff;\n\n    span,\n    .p-button-label,\n    i,\n    .p-button-icon,\n    .p-button-icon-left,\n    .p-button-icon-right {\n      color: #fff !important;\n    }\n\n    &:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 4px 14px rgba(139, 92, 246, 0.3);\n\n      span,\n      .p-button-label,\n      i,\n      .p-button-icon,\n      .p-button-icon-left,\n      .p-button-icon-right {\n        color: #fff !important;\n      }\n    }\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n\n\n\n\n.loading-state[_ngcontent-%COMP%] {\n  padding: 1.35rem;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.9rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n}\n\n.skeleton[_ngcontent-%COMP%] {\n  background: linear-gradient(\n    90deg,\n    rgba(148, 163, 184, 0.1) 25%,\n    rgba(148, 163, 184, 0.2) 50%,\n    rgba(148, 163, 184, 0.1) 75%\n  );\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n.skeleton-avatar[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n}\n\n.skeleton-text[_ngcontent-%COMP%] {\n  height: 14px;\n  flex: 1;\n}\n\n.skeleton-short[_ngcontent-%COMP%] {\n  flex: 0.5;\n}\n\n.skeleton-badge[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 22px;\n}\n\n.skeleton-actions[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 30px;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3.5rem 2rem;\n  text-align: center;\n}\n\n.empty-icon[_ngcontent-%COMP%] {\n  width: 72px;\n  height: 72px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(148, 163, 184, 0.1);\n  border: 1px solid rgba(148, 163, 184, 0.15);\n  border-radius: 18px;\n  margin-bottom: 1.25rem;\n\n  i {\n    font-size: 1.75rem;\n    color: rgba(60, 60, 67, 0.35);\n  }\n}\n\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  margin: 0 0 0.4rem;\n}\n\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: rgba(60, 60, 67, 0.6);\n  margin: 0 0 1.25rem;\n  max-width: 280px;\n}\n\n\n\n\n\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n\n  .p-datatable-table {\n    border-collapse: collapse;\n  }\n\n  .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: 0.9rem 1.15rem;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n    text-align: left;\n    white-space: nowrap;\n  }\n\n  .p-datatable-tbody > tr {\n    transition: all 0.15s ease;\n\n    &:hover {\n      background: rgba(248, 250, 252, 0.6);\n    }\n\n    > td {\n      border: none;\n      border-bottom: 1px solid rgba(148, 163, 184, 0.08);\n      padding: 0.9rem 1.15rem;\n      font-size: 0.875rem;\n      color: rgba(15, 23, 42, 0.9);\n      vertical-align: middle;\n    }\n  }\n}\n\n.table-row[_ngcontent-%COMP%] {\n  &.row-system {\n    background: rgba(245, 158, 11, 0.04);\n\n    &:hover {\n      background: rgba(245, 158, 11, 0.08);\n    }\n  }\n}\n\n.td-role[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.role-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(14, 165, 233, 0.1) 100%);\n  border-radius: 10px;\n  flex-shrink: 0;\n\n  i {\n    font-size: 1rem;\n    color: #7c3aed;\n  }\n\n  // Admin role - gold/amber crown\n  &--admin {\n    background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%);\n    i { color: #d97706; }\n  }\n\n  // System role - orange/amber shield\n  &--system {\n    background: linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(251, 191, 36, 0.1) 100%);\n    i { color: #d97706; }\n  }\n\n  // Customer Success - teal/green heart\n  &--success {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.1) 100%);\n    i { color: #0d9488; }\n  }\n\n  // Sales role - emerald/green dollar\n  &--sales {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(34, 197, 94, 0.1) 100%);\n    i { color: #059669; }\n  }\n\n  // Manager role - blue users\n  &--manager {\n    background: linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(99, 102, 241, 0.1) 100%);\n    i { color: #2563eb; }\n  }\n\n  // Custom role - purple user-edit\n  &--custom {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(168, 85, 247, 0.1) 100%);\n    i { color: #7c3aed; }\n  }\n}\n\n.role-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n\n.role-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.role-description[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.permission-pills[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n}\n\n.permission-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.25rem 0.6rem;\n  background: rgba(14, 165, 233, 0.1);\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 500;\n  color: #0369a1;\n\n  &--more {\n    background: rgba(148, 163, 184, 0.15);\n    color: rgba(60, 60, 67, 0.7);\n  }\n}\n\n.th-role[_ngcontent-%COMP%] {\n  // No min-width to prevent overflow\n}\n\n.th-actions[_ngcontent-%COMP%] {\n  width: 90px;\n  text-align: center;\n}\n\n.td-actions[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 0.4rem;\n}\n\n.action-icon[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  padding: 0;\n\n  i {\n    font-size: 0.72rem;\n    color: rgba(60, 60, 67, 0.7);\n  }\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.35);\n  }\n\n  &--danger:hover:not(:disabled) {\n    background: rgba(239, 68, 68, 0.08);\n    border-color: rgba(239, 68, 68, 0.25);\n\n    i {\n      color: #dc2626;\n    }\n  }\n\n  &--success:hover:not(:disabled) {\n    background: rgba(16, 185, 129, 0.1);\n    border-color: rgba(16, 185, 129, 0.28);\n\n    i {\n      color: #047857;\n    }\n  }\n\n  &:disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n  }\n}\n\n\n\n\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  white-space: nowrap;\n\n  &--success {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #b45309;\n  }\n\n  &--info {\n    background: rgba(59, 130, 246, 0.14);\n    color: #1d4ed8;\n  }\n\n  &--security {\n    background: rgba(124, 58, 237, 0.12);\n    color: #6d28d9;\n  }\n}\n\n.status-badge__sub[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.7);\n}\n\n.security-levels-section[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0.85rem;\n  border-radius: 14px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(248, 250, 252, 0.8);\n}\n\n.security-levels-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  margin-bottom: 0.75rem;\n  flex-wrap: wrap;\n}\n\n.security-levels-title[_ngcontent-%COMP%] {\n  h3 {\n    margin: 0;\n    font-size: 0.95rem;\n    font-weight: 650;\n    color: rgba(15, 23, 42, 0.9);\n  }\n}\n\n.security-levels-actions[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n\n.security-level-table[_ngcontent-%COMP%] {\n  .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%);\n  }\n}\n\n.security-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.security-form__body[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.55rem;\n\n  label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.75);\n  }\n\n  .required {\n    color: #dc2626;\n  }\n}\n\n.security-form__textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: 10px;\n  border: 1px solid rgba(148, 163, 184, 0.35);\n  padding: 0.55rem 0.65rem;\n  resize: vertical;\n  min-height: 84px;\n  font: inherit;\n}\n\n.security-form__footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n}\n\n.checkbox-row[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: 0.2rem;\n}\n\n\n\n\n\n@media (max-width: 768px) {\n  .page-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .hero-section[_ngcontent-%COMP%] {\n    padding: 1.35rem;\n    gap: 1.25rem;\n  }\n\n  .hero-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .hero-actions[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n\n  .security-levels-section[_ngcontent-%COMP%] {\n    margin: 0;\n    padding: 0.8rem;\n  }\n\n  .data-table[_ngcontent-%COMP%]   .p-datatable-thead[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > th[_ngcontent-%COMP%], \n   .data-table[_ngcontent-%COMP%]   .p-datatable-tbody[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > td[_ngcontent-%COMP%] {\n    padding: 0.7rem 0.9rem;\n  }\n\n  .permission-pills[_ngcontent-%COMP%] {\n    max-width: 200px;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RolesPage, [{
        type: Component,
        args: [{ selector: 'app-roles-page', standalone: true, imports: [
                    ButtonModule,
                    AccordionModule,
                    OrganizationChartModule,
                    NgClass,
                    NgFor,
                    NgIf,
                    RouterLink,
                    SkeletonModule,
                    TableModule,
                    TagModule,
                    TooltipModule,
                    BreadcrumbsComponent
                ], template: "<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     ROLES PAGE - Premium Light UI\n     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n<div class=\"page-container\">\n  <!-- PrimeNG Breadcrumb -->\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       HERO SECTION\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Access Control</span>\n      </div>\n      \n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Role</span>\n        <span class=\"title-light\">Management</span>\n      </h1>\n      \n      <p class=\"hero-description\">\n        \n      </p>\n\n      <div class=\"hero-stats\">\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ roles().length }}</div>\n          <div class=\"stat-label\">Total Roles</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill\" style=\"width: 100%\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ systemRolesCount() }}</div>\n          <div class=\"stat-label\">System</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--warning\" [style.width.%]=\"roles().length ? (systemRolesCount() / roles().length) * 100 : 0\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ customRolesCount() }}</div>\n          <div class=\"stat-label\">Custom</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--success\" [style.width.%]=\"roles().length ? (customRolesCount() / roles().length) * 100 : 0\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ permissionCatalog().length }}</div>\n          <div class=\"stat-label\">Permissions</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--info\" style=\"width: 100%\"></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"hero-actions\">\n        <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"roleSaving() || !canManageAdmin()\" routerLink=\"/app/settings/roles/new\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n          <span>New Role</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--security\" [disabled]=\"!canManageAdmin()\" routerLink=\"/app/settings/security-levels\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-lock\"></i></span>\n          <span>Manage Security Levels</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--users\" routerLink=\"/app/settings/users\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-users\"></i></span>\n          <span>Manage Users</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--refresh\" (click)=\"loadRoles()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n          <span>Refresh</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-shield\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Access Profiles</span>\n          <strong class=\"card-value\">{{ roles().length }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-lock\"></i> Auditable permissions\n          </span>\n        </div>\n      </div>\n\n      <div class=\"visual-card visual-card--secondary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-lock\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Default Security Level</span>\n          <strong class=\"card-value\">{{ defaultSecurityLevelName() }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-check-circle\"></i> Tenant-defined access tier\n          </span>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       DATA SECTION\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"data-section\">\n    <div class=\"data-card workspace-card\">\n      <p-accordion\n        class=\"roles-workspace-accordion\"\n        [multiple]=\"true\"\n        [value]=\"rolesWorkspacePanels()\"\n        (valueChange)=\"onWorkspacePanelsChange($event)\"\n      >\n        <p-accordion-panel value=\"directory\">\n          <p-accordion-header>\n            <div class=\"workspace-accordion-header\">\n              <div class=\"workspace-accordion-header__title\">\n                <i class=\"pi pi-sitemap\"></i>\n                <span>Role Directory</span>\n              </div>\n              <div class=\"workspace-accordion-header__badges\">\n                <span class=\"status-badge status-badge--info\">{{ roles().length }} roles</span>\n              </div>\n            </div>\n          </p-accordion-header>\n          <p-accordion-content>\n            <div class=\"data-header\">\n              <div class=\"header-title\">\n                <h2>Role Directory</h2>\n                <span class=\"record-count\">{{ roles().length }} roles configured</span>\n              </div>\n              <div class=\"header-actions\">\n                <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"roleSaving() || !canManageAdmin()\" routerLink=\"/app/settings/roles/new\">\n                  <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n                  <span>Add Role</span>\n                </button>\n                <button type=\"button\" class=\"action-btn action-btn--refresh\" (click)=\"loadRoles()\" [disabled]=\"loadingRoles()\">\n                  <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n                  <span>Reload</span>\n                </button>\n              </div>\n            </div>\n\n            <div class=\"loading-state\" *ngIf=\"loadingRoles()\">\n              <div class=\"skeleton-row\" *ngFor=\"let _ of [0, 1, 2, 3, 4]\">\n                <div class=\"skeleton skeleton-avatar\"></div>\n                <div class=\"skeleton skeleton-text\"></div>\n                <div class=\"skeleton skeleton-text skeleton-short\"></div>\n                <div class=\"skeleton skeleton-badge\"></div>\n                <div class=\"skeleton skeleton-actions\"></div>\n              </div>\n            </div>\n\n            <div class=\"empty-state\" *ngIf=\"!loadingRoles() && roles().length === 0\">\n              <div class=\"empty-icon\">\n                <i class=\"pi pi-shield\"></i>\n              </div>\n              <h3>No roles configured</h3>\n              <p>Create your first role to start managing access control</p>\n              <button pButton type=\"button\" class=\"btn btn-primary\" routerLink=\"/app/settings/roles/new\">\n                <i class=\"pi pi-plus\"></i>\n                Create Role\n              </button>\n            </div>\n\n            <div class=\"table-wrapper table-wrapper--roles\" *ngIf=\"!loadingRoles() && roles().length > 0\">\n              <p-table\n                class=\"data-table roles-directory-table\"\n                [value]=\"roles()\"\n                [tableStyle]=\"{ 'min-width': '72rem' }\"\n                responsiveLayout=\"scroll\"\n                [scrollable]=\"true\"\n                [scrollHeight]=\"rolesTableScrollHeight()\"\n                [paginator]=\"true\"\n                [rows]=\"rolesPageSize()\"\n                [first]=\"rolesFirst()\"\n                [rowsPerPageOptions]=\"rolesPageSizeOptions\"\n                [showCurrentPageReport]=\"true\"\n                currentPageReportTemplate=\"Showing {first} to {last} of {totalRecords} roles\"\n                (onPage)=\"handleRolesPage($event)\"\n              >\n                <ng-template pTemplate=\"header\">\n                  <tr>\n                    <th class=\"th-role\">Role</th>\n                    <th>Hierarchy</th>\n                    <th>Security Level</th>\n                    <th>Permissions</th>\n                    <th>Type</th>\n                    <th class=\"th-actions\">Actions</th>\n                  </tr>\n                </ng-template>\n                <ng-template pTemplate=\"body\" let-role>\n                  <tr class=\"table-row\" [class.row-system]=\"role.isSystem\">\n                    <td>\n                      <div class=\"td-role\">\n                        <div class=\"role-icon\" [ngClass]=\"getRoleIconStyle(role)\">\n                          <i [class]=\"getRoleIcon(role)\"></i>\n                        </div>\n                        <div class=\"role-info\">\n                          <span class=\"role-name\">{{ role.name }}</span>\n                          <span class=\"role-description\">{{ role.description || 'No description provided' }}</span>\n                        </div>\n                      </div>\n                    </td>\n                    <td>\n                      <span class=\"status-badge status-badge--info\">\n                        {{ role.hierarchyLevel ? ('H' + role.hierarchyLevel) : 'H1' }}\n                      </span>\n                    </td>\n                    <td>\n                      <ng-container *ngIf=\"securityLevelForRole(role) as level; else unassignedSecurityLevel\">\n                        <span class=\"status-badge status-badge--security\">\n                          {{ level.name }}\n                          <span class=\"status-badge__sub\">R{{ level.rank }}</span>\n                        </span>\n                      </ng-container>\n                      <ng-template #unassignedSecurityLevel>\n                        <span class=\"status-badge\">Unassigned</span>\n                      </ng-template>\n                    </td>\n                    <td>\n                      <div class=\"permission-pills\">\n                        <span class=\"permission-pill\" *ngFor=\"let permission of role.permissions.slice(0, 3)\">\n                          {{ permissionLabel(permission) }}\n                        </span>\n                        <span class=\"permission-pill permission-pill--more\" *ngIf=\"role.permissions.length > 3\">\n                          +{{ role.permissions.length - 3 }} more\n                        </span>\n                      </div>\n                    </td>\n                    <td>\n                      <span class=\"status-badge\" [class.status-badge--warning]=\"role.isSystem\" [class.status-badge--success]=\"!role.isSystem\">\n                        {{ role.isSystem ? 'System' : 'Custom' }}\n                      </span>\n                    </td>\n                    <td class=\"td-actions\">\n                      <div class=\"row-actions\">\n                        <button\n                          type=\"button\"\n                          class=\"row-action-btn row-action-btn--edit\"\n                          title=\"Edit role\"\n                          [disabled]=\"!canManageAdmin()\"\n                          [routerLink]=\"['/app/settings/roles', role.id, 'edit']\"\n                        >\n                          <i class=\"pi pi-pencil\"></i>\n                        </button>\n                        <button\n                          type=\"button\"\n                          class=\"row-action-btn row-action-btn--delete\"\n                          title=\"Delete role\"\n                          [disabled]=\"role.isSystem || roleSaving() || !canManageAdmin()\"\n                          (click)=\"deleteRole(role)\"\n                        >\n                          <i class=\"pi pi-trash\"></i>\n                        </button>\n                      </div>\n                    </td>\n                  </tr>\n                </ng-template>\n              </p-table>\n            </div>\n          </p-accordion-content>\n        </p-accordion-panel>\n\n        <p-accordion-panel value=\"hierarchy\">\n          <p-accordion-header>\n            <div class=\"workspace-accordion-header\">\n              <div class=\"workspace-accordion-header__title\">\n                <i class=\"pi pi-share-alt\"></i>\n                <span>Organization Hierarchy</span>\n              </div>\n              <div class=\"workspace-accordion-header__badges\">\n                <span class=\"status-badge status-badge--security\">{{ roles().length }} nodes</span>\n              </div>\n            </div>\n          </p-accordion-header>\n          <p-accordion-content>\n            <div class=\"data-header\">\n              <div class=\"header-title\">\n                <h2>Organization Hierarchy</h2>\n                <span class=\"record-count\">Visual org chart of role relationships</span>\n              </div>\n              <div class=\"header-actions\">\n                <button pButton type=\"button\" class=\"action-btn\" (click)=\"loadRoles()\" [disabled]=\"loadingRoles()\">\n                  <i class=\"pi pi-refresh\"></i>\n                  <span>Reload</span>\n                </button>\n              </div>\n            </div>\n\n            <div class=\"loading-state\" *ngIf=\"loadingRoles()\">\n              <div class=\"skeleton-row\" *ngFor=\"let _ of [0, 1, 2]\">\n                <div class=\"skeleton skeleton-text\"></div>\n              </div>\n            </div>\n\n            <div class=\"empty-state\" *ngIf=\"!loadingRoles() && roles().length === 0\">\n              <div class=\"empty-icon\">\n                <i class=\"pi pi-share-alt\"></i>\n              </div>\n              <h3>No hierarchy to display</h3>\n              <p>Create roles to visualize the organization hierarchy.</p>\n            </div>\n\n            <div class=\"orgchart-wrapper\" *ngIf=\"!loadingRoles() && roles().length > 0\">\n              <p-organizationChart [value]=\"orgChartNodes()\" selectionMode=\"single\">\n                <ng-template pTemplate=\"default\" let-node>\n                  <div\n                    class=\"org-node\"\n                    [attr.data-level]=\"node.data?.hierarchyLevel ?? ''\"\n                    [attr.data-role-name]=\"(node.data?.name || '').toLowerCase()\"\n                  >\n                    <div class=\"org-title\">\n                      <span class=\"org-name\">{{ node.data?.name }}</span>\n                      <span class=\"org-badges\">\n                        <span class=\"org-badge\">H{{ node.data?.hierarchyLevel || '\u2014' }}</span>\n                      </span>\n                    </div>\n                    <div class=\"org-meta\">\n                      <span class=\"org-desc\">{{ node.data?.description || 'No description' }}</span>\n                    </div>\n                  </div>\n                </ng-template>\n              </p-organizationChart>\n            </div>\n          </p-accordion-content>\n        </p-accordion-panel>\n\n        <p-accordion-panel value=\"presets\">\n          <p-accordion-header>\n            <div class=\"workspace-accordion-header\">\n              <div class=\"workspace-accordion-header__title\">\n                <i class=\"pi pi-th-large\"></i>\n                <span>Role Presets</span>\n              </div>\n              <div class=\"workspace-accordion-header__badges\">\n                <span class=\"status-badge status-badge--info\">{{ intentPacks().length + permissionPackPresets().length }} items</span>\n              </div>\n            </div>\n          </p-accordion-header>\n          <p-accordion-content>\n            <div class=\"security-levels-section\">\n              <div class=\"security-levels-header\">\n                <div class=\"security-levels-title\">\n                  <h3>Role Presets</h3>\n                  <span class=\"record-count\">Intent packs and hierarchy presets for fast role creation</span>\n                </div>\n                <div class=\"security-levels-actions\">\n                  <button pButton type=\"button\" class=\"btn btn-ghost\" [disabled]=\"loadingIntentPacks()\" (click)=\"loadIntentPacks()\">\n                    <i class=\"pi pi-refresh\"></i>\n                    <span>Reload intents</span>\n                  </button>\n                  <button pButton type=\"button\" class=\"btn btn-ghost\" [disabled]=\"loadingPermissionPackPresets()\" (click)=\"loadPermissionPackPresets()\">\n                    <i class=\"pi pi-refresh\"></i>\n                    <span>Reload presets</span>\n                  </button>\n                  <button pButton type=\"button\" class=\"btn btn-primary\" routerLink=\"/app/settings/roles/new\" [disabled]=\"!canManageAdmin()\">\n                    <i class=\"pi pi-plus\"></i>\n                    <span>New Role</span>\n                  </button>\n                </div>\n              </div>\n\n              <div class=\"table-wrapper\">\n                <p-table [value]=\"intentPacks()\" styleClass=\"data-table security-level-table\" responsiveLayout=\"scroll\">\n                  <ng-template pTemplate=\"header\">\n                    <tr>\n                      <th>Intent Pack</th>\n                      <th>Description</th>\n                      <th>Permissions</th>\n                    </tr>\n                  </ng-template>\n                  <ng-template pTemplate=\"body\" let-pack>\n                    <tr>\n                      <td>{{ pack.label }}</td>\n                      <td>{{ pack.description }}</td>\n                      <td><span class=\"status-badge status-badge--info\">{{ pack.permissions.length }} permissions</span></td>\n                    </tr>\n                  </ng-template>\n                </p-table>\n              </div>\n\n              <div class=\"table-wrapper\">\n                <p-table [value]=\"permissionPackPresets()\" styleClass=\"data-table security-level-table\" responsiveLayout=\"scroll\">\n                  <ng-template pTemplate=\"header\">\n                    <tr>\n                      <th>Preset</th>\n                      <th>Description</th>\n                      <th>Hierarchy</th>\n                      <th>Permissions</th>\n                    </tr>\n                  </ng-template>\n                  <ng-template pTemplate=\"body\" let-preset>\n                    <tr>\n                      <td>{{ preset.label }}</td>\n                      <td>{{ preset.description }}</td>\n                      <td><span class=\"status-badge status-badge--security\">H{{ preset.hierarchyLevel }}</span></td>\n                      <td><span class=\"status-badge status-badge--info\">{{ preset.permissions.length }} permissions</span></td>\n                    </tr>\n                  </ng-template>\n                </p-table>\n              </div>\n            </div>\n          </p-accordion-content>\n        </p-accordion-panel>\n\n        <p-accordion-panel value=\"drift\">\n          <p-accordion-header>\n            <div class=\"workspace-accordion-header\">\n              <div class=\"workspace-accordion-header__title\">\n                <i class=\"pi pi-sliders-h\"></i>\n                <span>Drift Monitor</span>\n              </div>\n              <div class=\"workspace-accordion-header__badges\">\n                <span class=\"status-badge\" [class.status-badge--warning]=\"driftedRolesCount() > 0\" [class.status-badge--success]=\"driftedRolesCount() === 0\">\n                  {{ driftedRolesCount() }} drifted\n                </span>\n              </div>\n            </div>\n          </p-accordion-header>\n          <p-accordion-content>\n            <div class=\"security-levels-section\">\n              <div class=\"security-levels-header\">\n                <div class=\"security-levels-title\">\n                  <h3>Role Drift Monitor</h3>\n                  <span class=\"record-count\">{{ driftedRolesCount() }} roles differ from their base permissions</span>\n                </div>\n                <div class=\"security-levels-actions\">\n                  <button pButton type=\"button\" class=\"btn btn-ghost\" (click)=\"loadRoles()\" [disabled]=\"loadingRoles()\">\n                    <i class=\"pi pi-refresh\"></i>\n                    <span>Refresh drift</span>\n                  </button>\n                </div>\n              </div>\n\n              <div class=\"table-wrapper\">\n                <p-table [value]=\"driftRows()\" styleClass=\"data-table security-level-table\" responsiveLayout=\"scroll\">\n                  <ng-template pTemplate=\"header\">\n                    <tr>\n                      <th>Role</th>\n                      <th>Added</th>\n                      <th>Removed</th>\n                      <th>Status</th>\n                      <th>Notes</th>\n                    </tr>\n                  </ng-template>\n                  <ng-template pTemplate=\"body\" let-row>\n                    <tr>\n                      <td>{{ row.role.name }}</td>\n                      <td><span class=\"status-badge status-badge--success\">{{ row.addedCount }}</span></td>\n                      <td><span class=\"status-badge status-badge--warning\">{{ row.removedCount }}</span></td>\n                      <td>\n                        <p-tag [severity]=\"driftTone(row.addedCount, row.removedCount)\" [value]=\"row.hasDrift ? 'Drifted' : 'Aligned'\"></p-tag>\n                      </td>\n                      <td>{{ row.role.driftNotes || '\u2014' }}</td>\n                    </tr>\n                  </ng-template>\n                </p-table>\n              </div>\n            </div>\n          </p-accordion-content>\n        </p-accordion-panel>\n      </p-accordion>\n    </div>\n  </section>\n\n</div>\n", styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   ROLES PAGE - Premium Light UI\n   Following the global design system\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   ANIMATIONS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   BASE STYLES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n:host {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n.page-container {\n  min-height: 100vh;\n  padding: 1.5rem 2rem;\n  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n  overflow-x: hidden;\n  max-width: 100%;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HERO SECTION\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.hero-section {\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 2rem;\n  padding: 2rem;\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 20px;\n  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);\n  margin-bottom: 1.5rem;\n  animation: fade-in-up 0.4s ease-out;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.4rem 0.85rem;\n  background: rgba(139, 92, 246, 0.1);\n  border: 1px solid rgba(139, 92, 246, 0.2);\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #7c3aed;\n  width: fit-content;\n}\n\n.badge-dot {\n  width: 6px;\n  height: 6px;\n  background: #8b5cf6;\n  border-radius: 50%;\n}\n\n\n.hero-description {\n  font-size: 1rem;\n  color: rgba(60, 60, 67, 0.7);\n  max-width: 480px;\n  margin: 0;\n}\n\n.hero-stats {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 1.25rem;\n  padding: 1.25rem 0;\n  border-top: 1px solid rgba(148, 163, 184, 0.15);\n  border-bottom: 1px solid rgba(148, 163, 184, 0.15);\n\n  @media (max-width: 768px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n.hero-stat {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n\n.stat-value {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.stat-label {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.stat-bar {\n  height: 4px;\n  background: rgba(148, 163, 184, 0.2);\n  border-radius: 2px;\n  overflow: hidden;\n  margin-top: 0.4rem;\n}\n\n.stat-bar-fill {\n  height: 100%;\n  background: linear-gradient(90deg, #8b5cf6, #0ea5e9);\n  border-radius: 2px;\n  transition: width 0.4s ease;\n\n  &--warning { background: linear-gradient(90deg, #f59e0b, #fbbf24); }\n  &--success { background: linear-gradient(90deg, #10b981, #34d399); }\n  &--info { background: linear-gradient(90deg, #0ea5e9, #06b6d4); }\n}\n\n.hero-actions {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n  flex-wrap: wrap;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HERO VISUAL CARDS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n\n  @media (max-width: 1100px) {\n    flex-direction: row;\n  }\n\n  @media (max-width: 600px) {\n    flex-direction: column;\n  }\n}\n\n.visual-card {\n  display: flex;\n  gap: 1rem;\n  padding: 1.25rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  transition: all 0.2s ease;\n  flex: 1;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n    border-color: rgba(139, 92, 246, 0.15);\n  }\n\n  &--secondary {\n    background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);\n    border-color: rgba(14, 165, 233, 0.15);\n  }\n}\n\n.card-icon {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n\n  i {\n    font-size: 1.1rem;\n    color: #7c3aed;\n  }\n\n  .visual-card--secondary & {\n    background: rgba(14, 165, 233, 0.12);\n    i { color: #0284c7; }\n  }\n}\n\n.card-content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n\n.card-label {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.card-value {\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.card-trend {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.6);\n\n  i { font-size: 0.625rem; }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   BUTTONS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-decoration: none;\n  white-space: nowrap;\n\n  i {\n    font-size: 0.85rem;\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.btn-primary {\n  background: linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%);\n  color: #fff;\n\n  &:hover:not(:disabled) {\n    transform: translateY(-1px);\n    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.35);\n  }\n}\n\n.btn-secondary {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: rgba(15, 23, 42, 0.8);\n\n  span,\n  .p-button-label,\n  i {\n    color: rgba(15, 23, 42, 0.8) !important;\n  }\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.5);\n\n    span,\n    .p-button-label,\n    i {\n      color: rgba(15, 23, 42, 0.85) !important;\n    }\n  }\n}\n\n.btn-ghost {\n  background: transparent;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  color: rgba(60, 60, 67, 0.8);\n\n  span,\n  .p-button-label,\n  i {\n    color: rgba(60, 60, 67, 0.8) !important;\n  }\n\n  &:hover:not(:disabled) {\n    background: rgba(255, 255, 255, 0.8);\n    border-color: rgba(148, 163, 184, 0.4);\n\n    span,\n    .p-button-label,\n    i {\n      color: rgba(30, 41, 59, 0.88) !important;\n    }\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   DATA SECTION\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.data-section {\n  animation: fade-in-up 0.4s ease-out 0.1s both;\n}\n\n.data-card {\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 20px;\n  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);\n  overflow: hidden;\n}\n\n.workspace-card {\n  padding: 0;\n}\n\n:host ::ng-deep .workspace-card {\n  .p-accordion {\n    background: transparent;\n  }\n\n  .p-accordionpanel {\n    border: none;\n    background: transparent;\n  }\n\n  .p-accordionheader {\n    padding: 0.55rem 0.75rem 0;\n    background: transparent;\n    border: none;\n  }\n\n  .p-accordionheader-toggle-icon {\n    color: rgba(51, 65, 85, 0.8);\n  }\n\n  .p-accordioncontent {\n    padding: 0.55rem 0.75rem 0.75rem;\n    background: transparent;\n  }\n\n  .p-accordioncontent-content {\n    padding: 0;\n    background: transparent;\n    border: none;\n  }\n\n  .p-tabs {\n    background: transparent;\n  }\n\n  .p-tablist {\n    padding: 0.65rem 0.9rem 0;\n    border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n    background: rgba(248, 250, 252, 0.85);\n  }\n\n  .p-tab {\n    position: relative;\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    border-radius: 8px 8px 0 0;\n    font-weight: 600;\n    color: rgba(51, 65, 85, 0.88);\n    padding: 0.75rem 1rem 0.7rem;\n    border: 1px solid transparent;\n    border-bottom: none;\n    transition: color 0.18s ease, background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;\n\n    &:hover {\n      color: #1e40af;\n      background: rgba(255, 255, 255, 0.75);\n    }\n  }\n\n  .p-tab.p-tab-active,\n  .p-tab[aria-selected='true'] {\n    color: #1d4ed8;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(239, 246, 255, 0.9) 100%);\n    border-color: rgba(59, 130, 246, 0.38);\n    box-shadow: 0 -1px 0 rgba(59, 130, 246, 0.2), 0 6px 14px rgba(37, 99, 235, 0.12);\n    z-index: 1;\n  }\n\n  .p-tab.p-tab-active::after,\n  .p-tab[aria-selected='true']::after {\n    content: '';\n    position: absolute;\n    left: 0.9rem;\n    right: 0.9rem;\n    bottom: -1px;\n    height: 3px;\n    border-radius: 999px;\n    background: linear-gradient(90deg, #2563eb 0%, #0ea5e9 100%);\n  }\n\n  .p-tabpanels {\n    padding: 0.75rem;\n    background: transparent;\n  }\n}\n\n.workspace-accordion-header {\n  width: 100%;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(246, 249, 255, 0.88) 100%);\n  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);\n}\n\n.workspace-accordion-header__title {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n  min-width: 0;\n  color: rgba(30, 41, 59, 0.95);\n  font-weight: 700;\n\n  i {\n    color: #2563eb;\n    font-size: 0.95rem;\n  }\n}\n\n.workspace-accordion-header__badges {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.data-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.15rem 1.35rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n\n@media (max-width: 768px) {\n  .workspace-accordion-header {\n    padding: 0.75rem 0.85rem;\n    gap: 0.55rem;\n    flex-wrap: wrap;\n  }\n\n  .workspace-accordion-header__title {\n    font-size: 0.92rem;\n  }\n\n  .workspace-accordion-header__badges {\n    width: 100%;\n    justify-content: flex-start;\n  }\n}\n\n.view-toggle {\n  display: inline-flex;\n  gap: 0.25rem;\n  padding: 0.2rem;\n  border-radius: 10px;\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.72) 0%, rgba(241, 245, 255, 0.58) 100%);\n  border: 1px solid rgba(148, 163, 184, 0.26);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);\n}\n\n.view-toggle--segmented {\n  display: inline-grid;\n  grid-template-columns: repeat(2, minmax(112px, 1fr));\n  min-width: 236px;\n}\n\n.toggle-btn {\n  position: relative;\n  border: 1px solid transparent;\n  background: transparent;\n  padding: 0.34rem 0.88rem;\n  border-radius: 6px;\n  min-width: 112px;\n  font-weight: 600;\n  font-size: 0.8rem;\n  line-height: 1.2;\n  color: rgba(71, 85, 105, 0.9);\n  cursor: pointer;\n  transition: all 0.18s ease;\n  white-space: nowrap;\n  overflow: visible;\n  text-overflow: clip;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n\n  span,\n  .p-button-label,\n  i,\n  .p-button-icon,\n  .p-button-icon-left,\n  .p-button-icon-right {\n    color: inherit !important;\n    opacity: 1;\n  }\n\n  &:hover:not(:disabled) {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(148, 163, 184, 0.28);\n    color: rgba(51, 65, 85, 0.96);\n  }\n}\n\n.toggle-btn.active {\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(237, 245, 255, 0.9) 100%);\n  border-color: rgba(59, 130, 246, 0.28);\n  color: #1d4ed8;\n  box-shadow: 0 3px 8px rgba(59, 130, 246, 0.12);\n}\n\n.toggle-btn.active::after {\n  content: '';\n  position: absolute;\n  left: 0.5rem;\n  right: 0.5rem;\n  bottom: -1px;\n  height: 2px;\n  border-radius: 99px;\n  background: #2563eb;\n}\n\n.orgchart-wrapper {\n  padding: 1.25rem;\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);\n  overflow-x: auto;\n\n  :host ::ng-deep .p-organizationchart-line-down,\n  :host ::ng-deep .p-organizationchart-line-left,\n  :host ::ng-deep .p-organizationchart-line-right {\n    border-color: rgba(37, 99, 235, 0.55) !important;\n    box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);\n  }\n\n  :host ::ng-deep .p-organizationchart-table > tbody > tr > td {\n    padding: 0.4rem 0.25rem;\n  }\n}\n\n.org-node {\n  --org-level-primary: #2563eb;\n  --org-level-secondary: #1d4ed8;\n  --org-level-border: rgba(37, 99, 235, 0.44);\n  --org-level-badge-bg: rgba(37, 99, 235, 0.22);\n  --org-level-badge-text: #dbeafe;\n  min-width: 200px;\n  padding: 0.75rem 0.9rem;\n  border-radius: 12px;\n  background:\n    linear-gradient(160deg, color-mix(in srgb, var(--org-level-primary) 30%, #ffffff 70%), color-mix(in srgb, var(--org-level-secondary) 34%, #ffffff 66%)),\n    radial-gradient(circle at 20% 12%, color-mix(in srgb, var(--org-level-primary) 28%, transparent), transparent 58%);\n  border: 1px solid var(--org-level-border);\n  box-shadow:\n    0 12px 26px color-mix(in srgb, var(--org-level-primary) 22%, transparent),\n    inset 0 1px 0 rgba(255, 255, 255, 0.72);\n  position: relative;\n  overflow: hidden;\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0 auto 0 0;\n    width: 5px;\n    background: linear-gradient(180deg, var(--org-level-primary), var(--org-level-secondary));\n    box-shadow: 0 0 16px color-mix(in srgb, var(--org-level-primary) 45%, transparent);\n  }\n\n  &::after {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(120deg, rgba(255, 255, 255, 0.2), transparent 35%, transparent 70%, rgba(255, 255, 255, 0.14));\n    pointer-events: none;\n  }\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow:\n      0 16px 30px color-mix(in srgb, var(--org-level-primary) 26%, transparent),\n      inset 0 1px 0 rgba(255, 255, 255, 0.94);\n  }\n\n  &[data-level='1'] {\n    --org-level-primary: #0ea5e9;\n    --org-level-secondary: #0369a1;\n    --org-level-border: rgba(14, 165, 233, 0.48);\n    --org-level-badge-bg: rgba(14, 165, 233, 0.28);\n    --org-level-badge-text: #ecfeff;\n    background:\n      linear-gradient(160deg, rgba(34, 211, 238, 0.42), rgba(14, 165, 233, 0.2)),\n      radial-gradient(circle at 20% 12%, rgba(14, 165, 233, 0.26), transparent 60%);\n    border-color: var(--org-level-border);\n  }\n\n  &[data-level='2'] {\n    --org-level-primary: #8b5cf6;\n    --org-level-secondary: #6d28d9;\n    --org-level-border: rgba(139, 92, 246, 0.48);\n    --org-level-badge-bg: rgba(139, 92, 246, 0.26);\n    --org-level-badge-text: #f3e8ff;\n    background:\n      linear-gradient(160deg, rgba(167, 139, 250, 0.42), rgba(124, 58, 237, 0.2)),\n      radial-gradient(circle at 20% 12%, rgba(139, 92, 246, 0.24), transparent 60%);\n    border-color: var(--org-level-border);\n  }\n\n  &[data-level='3'] {\n    --org-level-primary: #f97316;\n    --org-level-secondary: #c2410c;\n    --org-level-border: rgba(249, 115, 22, 0.5);\n    --org-level-badge-bg: rgba(249, 115, 22, 0.28);\n    --org-level-badge-text: #fff7ed;\n    background:\n      linear-gradient(160deg, rgba(251, 146, 60, 0.45), rgba(234, 88, 12, 0.2)),\n      radial-gradient(circle at 20% 12%, rgba(249, 115, 22, 0.25), transparent 60%);\n    border-color: var(--org-level-border);\n  }\n\n  &[data-level='4'] {\n    --org-level-primary: #10b981;\n    --org-level-secondary: #047857;\n    --org-level-border: rgba(16, 185, 129, 0.5);\n    --org-level-badge-bg: rgba(16, 185, 129, 0.28);\n    --org-level-badge-text: #ecfdf5;\n    background:\n      linear-gradient(160deg, rgba(52, 211, 153, 0.42), rgba(5, 150, 105, 0.2)),\n      radial-gradient(circle at 20% 12%, rgba(16, 185, 129, 0.25), transparent 60%);\n    border-color: var(--org-level-border);\n  }\n\n  &[data-level='5'],\n  &[data-level='6'],\n  &[data-level='7'] {\n    --org-level-primary: #f43f5e;\n    --org-level-secondary: #be123c;\n    --org-level-border: rgba(244, 63, 94, 0.48);\n    --org-level-badge-bg: rgba(244, 63, 94, 0.26);\n    --org-level-badge-text: #fff1f2;\n    background:\n      linear-gradient(160deg, rgba(251, 113, 133, 0.42), rgba(225, 29, 72, 0.2)),\n      radial-gradient(circle at 20% 12%, rgba(244, 63, 94, 0.22), transparent 60%);\n    border-color: var(--org-level-border);\n  }\n}\n\n.org-title {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n\n.org-name {\n  font-weight: 700;\n  color: #0f172a;\n  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.45);\n  font-size: 0.88rem;\n  line-height: 1.2;\n}\n\n.org-badges {\n  display: inline-flex;\n  gap: 0.35rem;\n}\n\n.org-badge {\n  font-size: 0.72rem;\n  padding: 0.22rem 0.5rem;\n  border-radius: 999px;\n  background: var(--org-level-badge-bg);\n  color: var(--org-level-badge-text);\n  font-weight: 700;\n  border: 1px solid color-mix(in srgb, var(--org-level-primary) 52%, white 48%);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.35),\n    0 4px 10px color-mix(in srgb, var(--org-level-primary) 26%, transparent);\n}\n\n.org-meta {\n  margin-top: 0.5rem;\n  font-size: 0.8rem;\n  color: rgba(51, 65, 85, 0.85);\n  line-height: 1.3;\n}\n\n.org-desc {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n\n.header-title {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n\n  h2 {\n    font-size: 1.05rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.record-count {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.header-actions {\n  display: flex;\n  gap: 0.65rem;\n}\n\n.action-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.55rem 0.9rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 8px;\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: rgba(60, 60, 67, 0.8);\n  cursor: pointer;\n  transition: all 0.2s ease;\n  text-decoration: none;\n\n  span,\n  .p-button-label,\n  i,\n  .p-button-icon,\n  .p-button-icon-left,\n  .p-button-icon-right {\n    color: rgba(60, 60, 67, 0.8) !important;\n    opacity: 1;\n  }\n\n  i {\n    font-size: 0.75rem;\n  }\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.35);\n\n    span,\n    .p-button-label,\n    i,\n    .p-button-icon,\n    .p-button-icon-left,\n    .p-button-icon-right {\n      color: rgba(30, 41, 59, 0.9) !important;\n    }\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%);\n    border-color: transparent;\n    color: #fff;\n\n    span,\n    .p-button-label,\n    i,\n    .p-button-icon,\n    .p-button-icon-left,\n    .p-button-icon-right {\n      color: #fff !important;\n    }\n\n    &:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 4px 14px rgba(139, 92, 246, 0.3);\n\n      span,\n      .p-button-label,\n      i,\n      .p-button-icon,\n      .p-button-icon-left,\n      .p-button-icon-right {\n        color: #fff !important;\n      }\n    }\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   LOADING & EMPTY STATES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.loading-state {\n  padding: 1.35rem;\n}\n\n.skeleton-row {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 0.9rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n}\n\n.skeleton {\n  background: linear-gradient(\n    90deg,\n    rgba(148, 163, 184, 0.1) 25%,\n    rgba(148, 163, 184, 0.2) 50%,\n    rgba(148, 163, 184, 0.1) 75%\n  );\n  background-size: 200% 100%;\n  animation: shimmer 1.5s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n.skeleton-avatar {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n}\n\n.skeleton-text {\n  height: 14px;\n  flex: 1;\n}\n\n.skeleton-short {\n  flex: 0.5;\n}\n\n.skeleton-badge {\n  width: 56px;\n  height: 22px;\n}\n\n.skeleton-actions {\n  width: 72px;\n  height: 30px;\n}\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 3.5rem 2rem;\n  text-align: center;\n}\n\n.empty-icon {\n  width: 72px;\n  height: 72px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(148, 163, 184, 0.1);\n  border: 1px solid rgba(148, 163, 184, 0.15);\n  border-radius: 18px;\n  margin-bottom: 1.25rem;\n\n  i {\n    font-size: 1.75rem;\n    color: rgba(60, 60, 67, 0.35);\n  }\n}\n\n.empty-state h3 {\n  font-size: 1.15rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  margin: 0 0 0.4rem;\n}\n\n.empty-state p {\n  font-size: 0.875rem;\n  color: rgba(60, 60, 67, 0.6);\n  margin: 0 0 1.25rem;\n  max-width: 280px;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   TABLE STYLES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.table-wrapper {\n  overflow-x: auto;\n}\n\n.data-table {\n  width: 100%;\n\n  .p-datatable-table {\n    border-collapse: collapse;\n  }\n\n  .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: 0.9rem 1.15rem;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n    text-align: left;\n    white-space: nowrap;\n  }\n\n  .p-datatable-tbody > tr {\n    transition: all 0.15s ease;\n\n    &:hover {\n      background: rgba(248, 250, 252, 0.6);\n    }\n\n    > td {\n      border: none;\n      border-bottom: 1px solid rgba(148, 163, 184, 0.08);\n      padding: 0.9rem 1.15rem;\n      font-size: 0.875rem;\n      color: rgba(15, 23, 42, 0.9);\n      vertical-align: middle;\n    }\n  }\n}\n\n.table-row {\n  &.row-system {\n    background: rgba(245, 158, 11, 0.04);\n\n    &:hover {\n      background: rgba(245, 158, 11, 0.08);\n    }\n  }\n}\n\n.td-role {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.role-icon {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(14, 165, 233, 0.1) 100%);\n  border-radius: 10px;\n  flex-shrink: 0;\n\n  i {\n    font-size: 1rem;\n    color: #7c3aed;\n  }\n\n  // Admin role - gold/amber crown\n  &--admin {\n    background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%);\n    i { color: #d97706; }\n  }\n\n  // System role - orange/amber shield\n  &--system {\n    background: linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(251, 191, 36, 0.1) 100%);\n    i { color: #d97706; }\n  }\n\n  // Customer Success - teal/green heart\n  &--success {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.1) 100%);\n    i { color: #0d9488; }\n  }\n\n  // Sales role - emerald/green dollar\n  &--sales {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(34, 197, 94, 0.1) 100%);\n    i { color: #059669; }\n  }\n\n  // Manager role - blue users\n  &--manager {\n    background: linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(99, 102, 241, 0.1) 100%);\n    i { color: #2563eb; }\n  }\n\n  // Custom role - purple user-edit\n  &--custom {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(168, 85, 247, 0.1) 100%);\n    i { color: #7c3aed; }\n  }\n}\n\n.role-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n\n.role-name {\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.role-description {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.permission-pills {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n}\n\n.permission-pill {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.25rem 0.6rem;\n  background: rgba(14, 165, 233, 0.1);\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 500;\n  color: #0369a1;\n\n  &--more {\n    background: rgba(148, 163, 184, 0.15);\n    color: rgba(60, 60, 67, 0.7);\n  }\n}\n\n.th-role {\n  // No min-width to prevent overflow\n}\n\n.th-actions {\n  width: 90px;\n  text-align: center;\n}\n\n.td-actions {\n  text-align: center;\n}\n\n.action-buttons {\n  display: flex;\n  justify-content: center;\n  gap: 0.4rem;\n}\n\n.action-icon {\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  padding: 0;\n\n  i {\n    font-size: 0.72rem;\n    color: rgba(60, 60, 67, 0.7);\n  }\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.35);\n  }\n\n  &--danger:hover:not(:disabled) {\n    background: rgba(239, 68, 68, 0.08);\n    border-color: rgba(239, 68, 68, 0.25);\n\n    i {\n      color: #dc2626;\n    }\n  }\n\n  &--success:hover:not(:disabled) {\n    background: rgba(16, 185, 129, 0.1);\n    border-color: rgba(16, 185, 129, 0.28);\n\n    i {\n      color: #047857;\n    }\n  }\n\n  &:disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   STATUS BADGES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  white-space: nowrap;\n\n  &--success {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #b45309;\n  }\n\n  &--info {\n    background: rgba(59, 130, 246, 0.14);\n    color: #1d4ed8;\n  }\n\n  &--security {\n    background: rgba(124, 58, 237, 0.12);\n    color: #6d28d9;\n  }\n}\n\n.status-badge__sub {\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.7);\n}\n\n.security-levels-section {\n  margin: 0;\n  padding: 0.85rem;\n  border-radius: 14px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(248, 250, 252, 0.8);\n}\n\n.security-levels-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  margin-bottom: 0.75rem;\n  flex-wrap: wrap;\n}\n\n.security-levels-title {\n  h3 {\n    margin: 0;\n    font-size: 0.95rem;\n    font-weight: 650;\n    color: rgba(15, 23, 42, 0.9);\n  }\n}\n\n.security-levels-actions {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  flex-wrap: wrap;\n}\n\n.security-level-table {\n  .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%);\n  }\n}\n\n.security-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.security-form__body {\n  display: grid;\n  gap: 0.55rem;\n\n  label {\n    font-size: 0.78rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.75);\n  }\n\n  .required {\n    color: #dc2626;\n  }\n}\n\n.security-form__textarea {\n  width: 100%;\n  border-radius: 10px;\n  border: 1px solid rgba(148, 163, 184, 0.35);\n  padding: 0.55rem 0.65rem;\n  resize: vertical;\n  min-height: 84px;\n  font: inherit;\n}\n\n.security-form__footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.6rem;\n}\n\n.checkbox-row {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-top: 0.2rem;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   RESPONSIVE ADJUSTMENTS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@media (max-width: 768px) {\n  .page-container {\n    padding: 1rem;\n  }\n\n  .hero-section {\n    padding: 1.35rem;\n    gap: 1.25rem;\n  }\n\n  .hero-stats {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .hero-actions {\n    flex-wrap: wrap;\n  }\n\n  .security-levels-section {\n    margin: 0;\n    padding: 0.8rem;\n  }\n\n  .data-table .p-datatable-thead > tr > th,\n  .data-table .p-datatable-tbody > tr > td {\n    padding: 0.7rem 0.9rem;\n  }\n\n  .permission-pills {\n    max-width: 200px;\n  }\n}\n"] }]
    }], () => [], { onViewportResize: [{
            type: HostListener,
            args: ['window:resize']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(RolesPage, { className: "RolesPage", filePath: "src/app/crm/features/settings/pages/roles.page.ts", lineNumber: 41 }); })();
