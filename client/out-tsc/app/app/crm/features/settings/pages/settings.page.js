import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectModule } from 'primeng/select';
import { filter } from 'rxjs';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, readUserEmail, readUserId, tokenHasPermission } from '../../../../core/auth/token.utils';
import { AppToastService } from '../../../../core/app-toast.service';
import { PresenceService } from '../../../../core/realtime/presence.service';
import { RolesPage } from './roles.page';
import { PermissionsPage } from './permissions.page';
import { SecurityLevelsPage } from './security-levels.page';
import { DashboardPacksPage } from './dashboard-packs.page';
import * as i0 from "@angular/core";
import * as i1 from "primeng/select";
import * as i2 from "primeng/api";
import * as i3 from "primeng/button";
import * as i4 from "primeng/inputtext";
import * as i5 from "primeng/table";
import * as i6 from "primeng/toggleswitch";
import * as i7 from "@angular/forms";
const _c0 = () => ["/app/settings/invite"];
const _c1 = () => ["/app/settings/roles/new"];
const _c2 = () => ["/app/settings/permissions"];
const _c3 = () => ["/app/settings/security-levels"];
const _c4 = () => ["/app/settings/dashboard-packs"];
const _c5 = a0 => ({ "is-active": a0 });
const _c6 = () => [0, 1, 2, 3, 4];
function SettingsPage_h1_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 42)(1, "span", 15);
    i0.ɵɵtext(2, "Permission");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 16);
    i0.ɵɵtext(4, "Management");
    i0.ɵɵelementEnd()();
} }
function SettingsPage_h1_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 42)(1, "span", 15);
    i0.ɵɵtext(2, "Role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 16);
    i0.ɵɵtext(4, "Management");
    i0.ɵɵelementEnd()();
} }
function SettingsPage_h1_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 42)(1, "span", 15);
    i0.ɵɵtext(2, "User");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 16);
    i0.ɵɵtext(4, "Management");
    i0.ɵɵelementEnd()();
} }
function SettingsPage_h1_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 42)(1, "span", 15);
    i0.ɵɵtext(2, "Security Level");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 16);
    i0.ɵɵtext(4, "Management");
    i0.ɵɵelementEnd()();
} }
function SettingsPage_h1_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 42)(1, "span", 15);
    i0.ɵɵtext(2, "Dashboard Pack");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 16);
    i0.ɵɵtext(4, "Management");
    i0.ɵɵelementEnd()();
} }
function SettingsPage_button_54_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 43);
    i0.ɵɵlistener("click", function SettingsPage_button_54_Template_button_click_0_listener() { const item_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.selectSubmenu(item_r3)); });
    i0.ɵɵelement(1, "i");
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(5, _c5, ctx_r3.isSubmenuActive(item_r3)));
    i0.ɵɵattribute("aria-selected", ctx_r3.isSubmenuActive(item_r3));
    i0.ɵɵadvance();
    i0.ɵɵclassMap(item_r3.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.label);
} }
function SettingsPage_ng_container_56_ng_container_1_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Last login");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Environment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 57);
    i0.ɵɵtext(14, "Actions");
    i0.ɵɵelementEnd()();
} }
function SettingsPage_ng_container_56_ng_container_1_ng_template_16_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 81);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", user_r7.roles[0], " ");
} }
function SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 82);
    i0.ɵɵtext(1, "Unassigned");
    i0.ɵɵelementEnd();
} }
function SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_container_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 83);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 84);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const user_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.formatLoginTime(user_r7), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.formatLoginDuration(user_r7, ctx_r3.isOnline(user_r7)), " ");
} }
function SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_template_24_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 83);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 84);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const user_r7 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Invite sent ", ctx_r3.formatInviteSentTime(user_r7), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.formatInviteSentDuration(user_r7), " ");
} }
function SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_template_24_ng_container_0_Template, 5, 2, "ng-container", 41);
} if (rf & 2) {
    const user_r7 = i0.ɵɵnextContext().$implicit;
    const neverLogged_r8 = i0.ɵɵreference(27);
    i0.ɵɵproperty("ngIf", user_r7.lastInviteSentAtUtc)("ngIfElse", neverLogged_r8);
} }
function SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_template_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 85);
    i0.ɵɵtext(1, "Never logged in");
    i0.ɵɵelementEnd();
} }
function SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_container_29_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 84);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const environmentDetail_r9 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", environmentDetail_r9, " ");
} }
function SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_container_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 83);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_container_29_span_3_Template, 2, 1, "span", 86);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const user_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.formatUserEnvironment(user_r7), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.formatUserEnvironmentDetail(user_r7));
} }
function SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 85);
    i0.ɵɵtext(1, "-");
    i0.ɵɵelementEnd();
} }
function SettingsPage_ng_container_56_ng_container_1_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 58);
    i0.ɵɵlistener("click", function SettingsPage_ng_container_56_ng_container_1_ng_template_16_Template_tr_click_0_listener() { const user_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.startEdit(user_r7)); });
    i0.ɵɵelementStart(1, "td")(2, "div", 59)(3, "div", 60);
    i0.ɵɵelement(4, "img", 61)(5, "span", 62);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 63)(7, "span", 64);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 65);
    i0.ɵɵelement(10, "span", 66);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(12, "td")(13, "span", 67);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtemplate(16, SettingsPage_ng_container_56_ng_container_1_ng_template_16_span_16_Template, 2, 1, "span", 68)(17, SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_template_17_Template, 2, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "td")(20, "span", 69);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "td");
    i0.ɵɵtemplate(23, SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_container_23_Template, 5, 2, "ng-container", 41)(24, SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_template_24_Template, 1, 2, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor)(26, SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_template_26_Template, 2, 0, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "td");
    i0.ɵɵtemplate(29, SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_container_29_Template, 4, 2, "ng-container", 41)(30, SettingsPage_ng_container_56_ng_container_1_ng_template_16_ng_template_30_Template, 2, 0, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "td", 57)(33, "div", 70)(34, "button", 71);
    i0.ɵɵlistener("click", function SettingsPage_ng_container_56_ng_container_1_ng_template_16_Template_button_click_34_listener($event) { const user_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r3 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r3.startEdit(user_r7)); });
    i0.ɵɵelement(35, "i", 72);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "button", 73);
    i0.ɵɵlistener("click", function SettingsPage_ng_container_56_ng_container_1_ng_template_16_Template_button_click_36_listener($event) { const user_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r3 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r3.toggleUserStatus(user_r7)); });
    i0.ɵɵelement(37, "i", 74);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "button", 75);
    i0.ɵɵlistener("click", function SettingsPage_ng_container_56_ng_container_1_ng_template_16_Template_button_click_38_listener($event) { const user_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r3 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r3.resendInvite(user_r7)); });
    i0.ɵɵelement(39, "i", 76);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "button", 77);
    i0.ɵɵlistener("click", function SettingsPage_ng_container_56_ng_container_1_ng_template_16_Template_button_click_40_listener($event) { const user_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r3 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r3.resetPassword(user_r7)); });
    i0.ɵɵelement(41, "i", 78);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "button", 79);
    i0.ɵɵlistener("click", function SettingsPage_ng_container_56_ng_container_1_ng_template_16_Template_button_click_42_listener($event) { const user_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r3 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r3.deleteUser(user_r7)); });
    i0.ɵɵelement(43, "i", 80);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const user_r7 = ctx.$implicit;
    const unassignedRole_r10 = i0.ɵɵreference(18);
    const inviteOrNever_r11 = i0.ɵɵreference(25);
    const noEnvironment_r12 = i0.ɵɵreference(31);
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r3.getAvatarClasses(user_r7));
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", user_r7.profilePictureUrl || "https://i.pravatar.cc/150?u=" + (user_r7.email || user_r7.id), i0.ɵɵsanitizeUrl)("alt", user_r7.fullName + " avatar")("title", user_r7.fullName + " avatar");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r3.isOnline(user_r7) ? "online" : "offline");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(user_r7.fullName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r3.isOnline(user_r7) ? "is-online" : "is-offline");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.isOnline(user_r7) ? "Online now" : "Offline", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(user_r7.email);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", user_r7.roles == null ? null : user_r7.roles.length)("ngIfElse", unassignedRole_r10);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", user_r7.isActive ? "badge-success" : "badge-warning");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", user_r7.isActive ? "Active" : "Inactive", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", user_r7.lastLoginAtUtc)("ngIfElse", inviteOrNever_r11);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", user_r7.lastLoginAtUtc)("ngIfElse", noEnvironment_r12);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", !ctx_r3.canManageAdmin());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("title", user_r7.isActive ? "Deactivate" : "Activate")("disabled", !ctx_r3.canManageAdmin());
    i0.ɵɵattribute("aria-label", user_r7.isActive ? "Deactivate user" : "Activate user");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", user_r7.isActive ? "pi-eye-slash" : "pi-eye");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r3.canManageAdmin() || !ctx_r3.canResendInvite(user_r7));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r3.canManageAdmin());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r3.canManageAdmin());
} }
function SettingsPage_ng_container_56_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 44)(2, "div", 45);
    i0.ɵɵelement(3, "i", 46);
    i0.ɵɵelementStart(4, "input", 47);
    i0.ɵɵlistener("ngModelChange", function SettingsPage_ng_container_56_ng_container_1_Template_input_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.onSearchChange($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 48)(6, "p-select", 49);
    i0.ɵɵlistener("ngModelChange", function SettingsPage_ng_container_56_ng_container_1_Template_p_select_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.onRoleFilterChange($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "label", 50)(8, "span");
    i0.ɵɵtext(9, "Show inactive");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p-toggleSwitch", 51);
    i0.ɵɵlistener("ngModelChange", function SettingsPage_ng_container_56_ng_container_1_Template_p_toggleSwitch_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.toggleIncludeInactive($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "button", 52);
    i0.ɵɵlistener("click", function SettingsPage_ng_container_56_ng_container_1_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.resetFilters()); });
    i0.ɵɵtext(12, "Reset");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "div", 53)(14, "p-table", 54);
    i0.ɵɵlistener("onPage", function SettingsPage_ng_container_56_ng_container_1_Template_p_table_onPage_14_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.handlePage($event)); });
    i0.ɵɵtemplate(15, SettingsPage_ng_container_56_ng_container_1_ng_template_15_Template, 15, 0, "ng-template", 55)(16, SettingsPage_ng_container_56_ng_container_1_ng_template_16_Template, 44, 25, "ng-template", 56);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r3.searchTerm());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("options", ctx_r3.roleFilterOptions())("ngModel", ctx_r3.roleFilter());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r3.includeInactive());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r3.filteredUsers())("paginator", true)("rows", ctx_r3.pageSize())("rowsPerPageOptions", ctx_r3.pageSizeOptions)("totalRecords", ctx_r3.totalUsers())("first", (ctx_r3.page() - 1) * ctx_r3.pageSize());
} }
function SettingsPage_ng_container_56_ng_template_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 89);
} }
function SettingsPage_ng_container_56_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 87);
    i0.ɵɵtemplate(1, SettingsPage_ng_container_56_ng_template_2_div_1_Template, 1, 0, "div", 88);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c6));
} }
function SettingsPage_ng_container_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, SettingsPage_ng_container_56_ng_container_1_Template, 17, 10, "ng-container", 41)(2, SettingsPage_ng_container_56_ng_template_2_Template, 2, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const usersLoading_r13 = i0.ɵɵreference(3);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.loadingUsers())("ngIfElse", usersLoading_r13);
} }
function SettingsPage_ng_template_57_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 91);
    i0.ɵɵelement(1, "app-roles-page");
    i0.ɵɵelementEnd();
} }
function SettingsPage_ng_template_57_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 91);
    i0.ɵɵelement(1, "app-permissions-page");
    i0.ɵɵelementEnd();
} }
function SettingsPage_ng_template_57_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 91);
    i0.ɵɵelement(1, "app-security-levels-page");
    i0.ɵɵelementEnd();
} }
function SettingsPage_ng_template_57_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 91);
    i0.ɵɵelement(1, "app-dashboard-packs-page");
    i0.ɵɵelementEnd();
} }
function SettingsPage_ng_template_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, SettingsPage_ng_template_57_div_0_Template, 2, 0, "div", 90)(1, SettingsPage_ng_template_57_div_1_Template, 2, 0, "div", 90)(2, SettingsPage_ng_template_57_div_2_Template, 2, 0, "div", 90)(3, SettingsPage_ng_template_57_div_3_Template, 2, 0, "div", 90);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", ctx_r3.activeView() === "roles");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.activeView() === "permissions");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.activeView() === "security-level");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.activeView() === "dashboard-packs");
} }
export class SettingsPage {
    static usersViewStateKey = 'crm.settings.users.view-state.v1';
    dataService = inject(UserAdminDataService);
    router = inject(Router);
    destroyRef = inject(DestroyRef);
    toastService = inject(AppToastService);
    presenceService = inject(PresenceService);
    users = signal([], ...(ngDevMode ? [{ debugName: "users" }] : []));
    totalUsers = signal(0, ...(ngDevMode ? [{ debugName: "totalUsers" }] : []));
    roles = signal([], ...(ngDevMode ? [{ debugName: "roles" }] : []));
    searchTerm = signal('', ...(ngDevMode ? [{ debugName: "searchTerm" }] : []));
    roleFilter = signal('all', ...(ngDevMode ? [{ debugName: "roleFilter" }] : []));
    statusFilter = signal('active', ...(ngDevMode ? [{ debugName: "statusFilter" }] : []));
    includeInactive = signal(false, ...(ngDevMode ? [{ debugName: "includeInactive" }] : []));
    loadingUsers = signal(true, ...(ngDevMode ? [{ debugName: "loadingUsers" }] : []));
    loadingRoles = signal(true, ...(ngDevMode ? [{ debugName: "loadingRoles" }] : []));
    roleFilterOptions = computed(() => [
        { label: 'All roles', value: 'all' },
        ...this.roles().map((role) => ({ label: role.name, value: role.name }))
    ], ...(ngDevMode ? [{ debugName: "roleFilterOptions" }] : []));
    statusFilterOptions = [
        { label: 'All statuses', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' }
    ];
    filteredUsers = computed(() => {
        let rows = [...this.users()];
        if (!this.includeInactive()) {
            rows = rows.filter((user) => user.isActive);
        }
        if (this.roleFilter() !== 'all') {
            rows = rows.filter((user) => user.roles.includes(this.roleFilter()));
        }
        return rows;
    }, ...(ngDevMode ? [{ debugName: "filteredUsers" }] : []));
    activeUsersCount = computed(() => this.users().filter(u => u.isActive).length, ...(ngDevMode ? [{ debugName: "activeUsersCount" }] : []));
    inactiveUsersCount = computed(() => this.users().filter(u => !u.isActive).length, ...(ngDevMode ? [{ debugName: "inactiveUsersCount" }] : []));
    page = signal(1, ...(ngDevMode ? [{ debugName: "page" }] : []));
    pageSize = signal(50, ...(ngDevMode ? [{ debugName: "pageSize" }] : []));
    pageSizeOptions = [25, 50, 100];
    canManageTenants = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.tenantsManage);
    }, ...(ngDevMode ? [{ debugName: "canManageTenants" }] : []));
    canManageAdmin = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.administrationManage);
    }, ...(ngDevMode ? [{ debugName: "canManageAdmin" }] : []));
    canViewAdmin = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.administrationView);
    }, ...(ngDevMode ? [{ debugName: "canViewAdmin" }] : []));
    canManageLeads = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.leadsManage);
    }, ...(ngDevMode ? [{ debugName: "canManageLeads" }] : []));
    canManageOpportunities = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesManage);
    }, ...(ngDevMode ? [{ debugName: "canManageOpportunities" }] : []));
    timeZoneByEmail = new Map([
        ['jay.dissa@gmail.com', 'America/Toronto'],
        ['yasser.ahamed@live.com', 'America/Toronto'],
        ['davidjreggio@gmail.com', 'America/Sao_Paulo']
    ]);
    formatters = new Map();
    userLocale = navigator.language || 'en-US';
    currentUserTimeZone = signal('UTC', ...(ngDevMode ? [{ debugName: "currentUserTimeZone" }] : []));
    onlineUsers = signal(new Set(), ...(ngDevMode ? [{ debugName: "onlineUsers" }] : []));
    presenceConnectionState = signal('disconnected', ...(ngDevMode ? [{ debugName: "presenceConnectionState" }] : []));
    nowTick = signal(Date.now(), ...(ngDevMode ? [{ debugName: "nowTick" }] : []));
    avatarTones = [
        'avatar-tone-1',
        'avatar-tone-2',
        'avatar-tone-3',
        'avatar-tone-4',
        'avatar-tone-5',
        'avatar-tone-6',
        'avatar-tone-7',
        'avatar-tone-8'
    ];
    searchDebounceId = null;
    onlineDurationIntervalId = null;
    activeView = signal('users', ...(ngDevMode ? [{ debugName: "activeView" }] : []));
    activeSubmenuItems = computed(() => [
        { id: 'users-directory', label: 'Users', icon: 'pi pi-users' },
        { id: 'roles-directory', label: 'Roles', icon: 'pi pi-shield' },
        { id: 'permissions-directory', label: 'Permision', icon: 'pi pi-lock' },
        { id: 'security-level-directory', label: 'Security Level', icon: 'pi pi-shield' },
        { id: 'dashboard-packs-directory', label: 'Dashboard Packs', icon: 'pi pi-th-large' }
    ], ...(ngDevMode ? [{ debugName: "activeSubmenuItems" }] : []));
    constructor() {
        const toast = history.state?.toast;
        if (toast) {
            this.toastService.show(toast.tone, toast.message, 3000);
        }
        this.restoreUsersViewState();
        this.loadRoles();
        this.loadUsers();
        this.presenceService.connect();
        this.presenceService.onlineUsers$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((users) => {
            this.onlineUsers.set(users);
        });
        this.presenceService.connectionState$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((state) => {
            this.presenceConnectionState.set(state);
        });
        this.onlineDurationIntervalId = window.setInterval(() => {
            this.nowTick.set(Date.now());
        }, 60000);
        this.destroyRef.onDestroy(() => {
            if (this.onlineDurationIntervalId !== null) {
                window.clearInterval(this.onlineDurationIntervalId);
                this.onlineDurationIntervalId = null;
            }
        });
        this.redirectLegacyPeopleAccessRoutes();
        this.syncViewFromUrl();
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
            this.redirectLegacyPeopleAccessRoutes();
            this.syncViewFromUrl();
        });
    }
    selectSubmenu(item) {
        switch (item.id) {
            case 'users-directory':
                this.activeView.set('users');
                if (!this.router.url.startsWith('/app/settings/users')) {
                    this.router.navigate(['/app/settings/users']);
                }
                return;
            case 'roles-directory':
                this.activeView.set('roles');
                if (!this.router.url.startsWith('/app/settings/roles')) {
                    this.router.navigate(['/app/settings/roles']);
                }
                return;
            case 'permissions-directory':
                this.activeView.set('permissions');
                if (!this.router.url.startsWith('/app/settings/permissions')) {
                    this.router.navigate(['/app/settings/permissions']);
                }
                return;
            case 'security-level-directory':
                this.activeView.set('security-level');
                if (!this.router.url.startsWith('/app/settings/security-levels')) {
                    this.router.navigate(['/app/settings/security-levels']);
                }
                return;
            case 'dashboard-packs-directory':
                this.activeView.set('dashboard-packs');
                if (!this.router.url.startsWith('/app/settings/dashboard-packs')) {
                    this.router.navigate(['/app/settings/dashboard-packs']);
                }
                return;
            default:
                return;
        }
    }
    isSubmenuActive(item) {
        switch (item.id) {
            case 'users-directory':
                return this.activeView() === 'users';
            case 'roles-directory':
                return this.activeView() === 'roles';
            case 'permissions-directory':
                return this.activeView() === 'permissions';
            case 'security-level-directory':
                return this.activeView() === 'security-level';
            case 'dashboard-packs-directory':
                return this.activeView() === 'dashboard-packs';
            default:
                return false;
        }
    }
    loadUsers(options = {}) {
        this.loadingUsers.set(true);
        const includeInactive = this.includeInactive();
        const search = this.searchTerm().trim() || undefined;
        const requestedPage = options.page ?? this.page();
        const requestedPageSize = options.pageSize ?? this.pageSize();
        this.dataService
            .search({ includeInactive, search, page: requestedPage, pageSize: requestedPageSize })
            .subscribe({
            next: (response) => {
                this.users.set(response.items);
                this.totalUsers.set(response.total);
                this.page.set(requestedPage);
                this.pageSize.set(requestedPageSize);
                this.persistUsersViewState();
                this.resolveCurrentUserTimeZone(response.items);
                const onlineFromApi = new Set(response.items.filter((user) => user.isOnline).map((user) => user.id));
                const connectionState = this.presenceConnectionState();
                const hasLivePresence = connectionState === 'connected' || connectionState === 'reconnecting';
                if (!hasLivePresence) {
                    this.onlineUsers.set(onlineFromApi);
                }
                else if (onlineFromApi.size) {
                    const merged = new Set(this.onlineUsers());
                    onlineFromApi.forEach((id) => merged.add(id));
                    this.onlineUsers.set(merged);
                }
                this.loadingUsers.set(false);
            },
            error: () => {
                this.loadingUsers.set(false);
                this.raiseToast('error', 'Unable to load users. Please try again.');
            }
        });
    }
    loadRoles() {
        this.loadingRoles.set(true);
        this.dataService.getRoles().subscribe({
            next: (roles) => {
                this.roles.set(roles);
                this.loadingRoles.set(false);
            },
            error: () => {
                this.loadingRoles.set(false);
                this.raiseToast('error', 'Unable to load roles');
            }
        });
    }
    handlePage(event) {
        const nextPage = (event.page ?? 0) + 1;
        const nextPageSize = event.rows ?? this.pageSize();
        this.pageSize.set(nextPageSize);
        this.persistUsersViewState();
        this.loadUsers({ page: nextPage, pageSize: nextPageSize });
    }
    toggleIncludeInactive(nextValue) {
        this.includeInactive.set(nextValue);
        this.page.set(1);
        this.persistUsersViewState();
        this.loadUsers({ page: 1 });
    }
    onSearchChange(term) {
        this.searchTerm.set(term);
        this.page.set(1);
        this.persistUsersViewState();
        if (this.searchDebounceId) {
            window.clearTimeout(this.searchDebounceId);
        }
        this.searchDebounceId = window.setTimeout(() => this.loadUsers({ page: 1 }), 250);
    }
    onRoleFilterChange(value) {
        this.roleFilter.set(value ?? 'all');
        this.persistUsersViewState();
    }
    onStatusFilterChange(value) {
        this.statusFilter.set(value ?? 'all');
        this.page.set(1);
        this.persistUsersViewState();
        this.loadUsers({ page: 1 });
    }
    resetFilters() {
        this.searchTerm.set('');
        this.roleFilter.set('all');
        this.statusFilter.set('all');
        this.includeInactive.set(false);
        this.page.set(1);
        this.persistUsersViewState();
        this.loadUsers({ page: 1 });
    }
    startEdit(user) {
        this.router.navigate(['/app/settings/users', user.id, 'edit']);
    }
    resetPassword(user) {
        const password = prompt(`Enter a temporary password for ${user.fullName}`, this.generatePasswordValue());
        if (!password) {
            return;
        }
        const trimmed = password.trim();
        if (!trimmed) {
            return;
        }
        const payload = { temporaryPassword: trimmed };
        this.dataService.resetPassword(user.id, payload).subscribe({
            next: () => this.raiseToast('success', 'Password reset'),
            error: () => this.raiseToast('error', 'Unable to reset password')
        });
    }
    goToTenants() {
        this.router.navigate(['/app/settings/tenants']);
    }
    toggleUserStatus(user) {
        const request$ = user.isActive ? this.dataService.deactivate(user.id) : this.dataService.activate(user.id);
        request$.subscribe({
            next: () => {
                this.raiseToast('success', user.isActive ? 'User deactivated' : 'User reactivated');
                this.loadUsers();
            },
            error: () => this.raiseToast('error', 'Unable to update status')
        });
    }
    canResendInvite(user) {
        return user.isActive;
    }
    resendInvite(user) {
        if (!this.canResendInvite(user)) {
            return;
        }
        if (!confirm(`Resend invite to ${user.fullName}?`)) {
            return;
        }
        this.dataService.resendInvite(user.id).subscribe({
            next: (response) => {
                this.raiseToast(response.inviteEmailSent ? 'success' : 'error', response.message);
                this.loadUsers();
            },
            error: () => this.raiseToast('error', 'Unable to resend invite')
        });
    }
    deleteUser(user) {
        if (!confirm(`Remove ${user.fullName} from the workspace?`)) {
            return;
        }
        this.dataService.delete(user.id).subscribe({
            next: () => {
                this.raiseToast('success', 'User removed');
                this.loadUsers();
            },
            error: () => this.raiseToast('error', 'Unable to delete user')
        });
    }
    clearToast() {
        this.toastService.clear();
    }
    isOnline(user) {
        if (this.onlineUsers().has(user.id)) {
            return true;
        }
        const connectionState = this.presenceConnectionState();
        if (connectionState === 'connected' || connectionState === 'reconnecting') {
            return false;
        }
        return !!user.isOnline;
    }
    redirectLegacyPeopleAccessRoutes() {
        const path = this.router.url.split('?')[0];
        if (path === '/app/settings'
            || path === '/app/settings/teams'
            || path === '/app/settings/audit-log') {
            this.router.navigate(['/app/settings/users'], { replaceUrl: true });
        }
    }
    syncViewFromUrl() {
        const path = this.router.url.split('?')[0];
        if (path.startsWith('/app/settings/roles')) {
            this.activeView.set('roles');
            return;
        }
        if (path.startsWith('/app/settings/permissions')) {
            this.activeView.set('permissions');
            return;
        }
        if (path.startsWith('/app/settings/security-levels')) {
            this.activeView.set('security-level');
            return;
        }
        if (path.startsWith('/app/settings/dashboard-packs')) {
            this.activeView.set('dashboard-packs');
            return;
        }
        this.activeView.set('users');
    }
    restoreUsersViewState() {
        const raw = this.readFromSessionStorage(SettingsPage.usersViewStateKey);
        if (!raw) {
            return;
        }
        try {
            const parsed = JSON.parse(raw);
            this.searchTerm.set(typeof parsed.searchTerm === 'string' ? parsed.searchTerm : '');
            this.roleFilter.set(typeof parsed.roleFilter === 'string' && parsed.roleFilter ? parsed.roleFilter : 'all');
            this.statusFilter.set(parsed.statusFilter === 'active' || parsed.statusFilter === 'inactive' || parsed.statusFilter === 'all'
                ? parsed.statusFilter
                : 'all');
            this.includeInactive.set(typeof parsed.includeInactive === 'boolean' ? parsed.includeInactive : false);
            this.page.set(typeof parsed.page === 'number' && parsed.page > 0 ? parsed.page : 1);
            const restoredPageSize = typeof parsed.pageSize === 'number' ? parsed.pageSize : 50;
            this.pageSize.set(this.pageSizeOptions.includes(restoredPageSize) ? restoredPageSize : 50);
        }
        catch {
            // ignore malformed persisted state
        }
    }
    persistUsersViewState() {
        const state = {
            searchTerm: this.searchTerm(),
            roleFilter: this.roleFilter(),
            statusFilter: this.statusFilter(),
            includeInactive: this.includeInactive(),
            page: this.page(),
            pageSize: this.pageSize()
        };
        this.writeToSessionStorage(SettingsPage.usersViewStateKey, JSON.stringify(state));
    }
    readFromSessionStorage(key) {
        if (typeof window === 'undefined' || !window.sessionStorage) {
            return null;
        }
        return window.sessionStorage.getItem(key);
    }
    writeToSessionStorage(key, value) {
        if (typeof window === 'undefined' || !window.sessionStorage) {
            return;
        }
        window.sessionStorage.setItem(key, value);
    }
    getAvatarTone(user) {
        const seed = (user.email || user.fullName || '').trim().toLowerCase();
        let hash = 0;
        for (let i = 0; i < seed.length; i += 1) {
            hash = (hash * 31 + seed.charCodeAt(i)) | 0;
        }
        const index = Math.abs(hash) % this.avatarTones.length;
        return this.avatarTones[index];
    }
    getAvatarClasses(user) {
        return {
            'avatar-active': user.isActive,
            'avatar-inactive': !user.isActive,
            'avatar-online': this.isOnline(user),
            [this.getAvatarTone(user)]: true
        };
    }
    formatLoginTime(user) {
        if (!user.lastLoginAtUtc) {
            return '';
        }
        const formatter = this.getFormatter(this.currentUserTimeZone());
        return formatter.format(this.parseUtcDate(user.lastLoginAtUtc));
    }
    formatLoginDuration(user, isOnline) {
        if (!user.lastLoginAtUtc) {
            return '';
        }
        return this.formatRelativeFromDate(this.parseUtcDate(user.lastLoginAtUtc), isOnline ? 'Online for' : 'Last seen');
    }
    formatOnlineHours(user, isOnline) {
        if (!isOnline || !user.lastLoginAtUtc) {
            return '-';
        }
        const duration = this.formatElapsedDuration(this.parseUtcDate(user.lastLoginAtUtc));
        return duration ? duration : '-';
    }
    formatUserEnvironment(user) {
        const primary = [user.lastLoginDeviceType, user.lastLoginPlatform]
            .filter((part) => !!part && part.trim().length > 0)
            .join(' / ');
        if (primary) {
            return primary;
        }
        return user.lastLoginLocation?.trim() || '-';
    }
    formatUserEnvironmentDetail(user) {
        if (user.lastLoginLocation?.trim()) {
            return user.lastLoginLocation.trim();
        }
        if (user.lastLoginIp?.trim()) {
            return `IP: ${user.lastLoginIp.trim()}`;
        }
        return '';
    }
    formatInviteSentTime(user) {
        if (!user.lastInviteSentAtUtc) {
            return '';
        }
        const formatter = this.getFormatter(this.currentUserTimeZone());
        return formatter.format(this.parseUtcDate(user.lastInviteSentAtUtc));
    }
    formatInviteSentDuration(user) {
        if (!user.lastInviteSentAtUtc) {
            return '';
        }
        return this.formatRelativeFromDate(this.parseUtcDate(user.lastInviteSentAtUtc), 'Sent');
    }
    formatRelativeFromDate(date, prefix) {
        const deltaMs = this.nowTick() - date.getTime();
        if (!Number.isFinite(deltaMs) || deltaMs < 0) {
            return '';
        }
        const value = this.formatElapsedDuration(date);
        if (!value) {
            return '';
        }
        return prefix === 'Online for' ? `${prefix} ${value}` : `${prefix} ${value} ago`;
    }
    formatElapsedDuration(date) {
        const deltaMs = this.nowTick() - date.getTime();
        if (!Number.isFinite(deltaMs) || deltaMs < 0) {
            return '';
        }
        const minutes = Math.floor(deltaMs / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0) {
            return `${days}d ${hours % 24}h ${minutes % 60}m`;
        }
        return `${hours}h ${minutes % 60}m`;
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
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    getTimeZoneForUser(user) {
        const userZone = user.timeZone?.trim();
        if (userZone) {
            return userZone;
        }
        const key = user.email.trim().toLowerCase();
        return this.timeZoneByEmail.get(key) ?? 'UTC';
    }
    resolveCurrentUserTimeZone(users) {
        const email = readUserEmail();
        const userId = readUserId();
        const browserZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (!email && !userId) {
            this.currentUserTimeZone.set(browserZone || 'UTC');
            return;
        }
        const match = users.find((item) => item.id === userId)
            ?? users.find((item) => item.email?.trim().toLowerCase() === email);
        const zone = match?.timeZone?.trim();
        const mappedZone = email ? this.timeZoneByEmail.get(email) : undefined;
        const resolved = zone && zone !== 'UTC' ? zone : mappedZone ?? browserZone ?? 'UTC';
        this.currentUserTimeZone.set(resolved);
    }
    getFormatter(timeZone) {
        const key = `${this.userLocale}|${timeZone}`;
        if (!this.formatters.has(key)) {
            this.formatters.set(key, new Intl.DateTimeFormat(this.userLocale, {
                timeZone,
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }));
        }
        return this.formatters.get(key);
    }
    parseUtcDate(value) {
        // Ensure UTC interpretation when the API omits a timezone offset.
        return /Z|[+-]\d{2}:?\d{2}$/.test(value) ? new Date(value) : new Date(`${value}Z`);
    }
    static ɵfac = function SettingsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SettingsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SettingsPage, selectors: [["app-settings-page"]], decls: 59, vars: 21, consts: [["nonUsersView", ""], ["usersLoading", ""], ["unassignedRole", ""], ["inviteOrNever", ""], ["neverLogged", ""], ["noEnvironment", ""], [1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "page-hero"], [1, "hero-content"], [1, "hero-eyebrow"], [1, "pi", "pi-cog"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-subtitle"], [1, "settings-layout"], [1, "glass-card", "users-panel"], [1, "card-header"], [1, "header-left"], [1, "card-eyebrow"], ["class", "non-hero-title", 4, "ngIf"], [1, "card-subtitle"], [1, "header-actions"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "disabled", "routerLink"], [1, "action-btn__icon"], [1, "people-command-bar"], [1, "command-metrics"], [1, "metric-pill"], [1, "pi", "pi-users"], [1, "pi", "pi-shield"], [1, "metric-pill", "metric-pill--success"], [1, "pi", "pi-check-circle"], [1, "command-actions"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click"], [1, "pi", "pi-refresh"], ["role", "tablist", "aria-label", "People and access sub views", 1, "people-subtabs"], ["pButton", "", "type", "button", "class", "subview-chip", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "view-stage"], [4, "ngIf", "ngIfElse"], [1, "non-hero-title"], ["pButton", "", "type", "button", 1, "subview-chip", 3, "click", "ngClass"], [1, "table-toolbar"], [1, "toolbar-search"], [1, "pi", "pi-search"], ["pInputText", "", "type", "search", "placeholder", "Search by name or email", 3, "ngModelChange", "ngModel"], [1, "toolbar-filters"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "All roles", "styleClass", "filter-select", 3, "ngModelChange", "options", "ngModel"], [1, "toggle-wrapper", "compact"], [3, "ngModelChange", "ngModel"], ["pButton", "", "type", "button", 1, "btn-glass", "small", 3, "click"], [1, "table-wrapper"], [1, "data-table", 3, "onPage", "value", "paginator", "rows", "rowsPerPageOptions", "totalRecords", "first"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "text-right"], [1, "user-row", 3, "click"], [1, "user-cell"], [1, "user-avatar", 3, "ngClass"], [3, "src", "alt", "title"], [1, "presence-dot", 3, "ngClass"], [1, "user-info"], [1, "user-name"], [1, "user-presence", 3, "ngClass"], [1, "presence-icon"], [1, "user-email"], ["class", "role-pill", 4, "ngIf", "ngIfElse"], [1, "status-badge", 3, "ngClass"], [1, "row-actions"], ["type", "button", "title", "Edit user", "aria-label", "Edit user", 1, "row-action-btn", "row-action-btn--edit", 3, "click", "disabled"], [1, "pi", "pi-pencil"], ["type", "button", 1, "row-action-btn", "row-action-btn--view", 3, "click", "title", "disabled"], [1, "pi", 3, "ngClass"], ["type", "button", "title", "Resend invite", "aria-label", "Resend invite", 1, "row-action-btn", "row-action-btn--activity", 3, "click", "disabled"], [1, "pi", "pi-send"], ["type", "button", "title", "Reset password", "aria-label", "Reset password", 1, "row-action-btn", "row-action-btn--convert", 3, "click", "disabled"], [1, "pi", "pi-key"], ["type", "button", "title", "Remove user", "aria-label", "Remove user", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "pi", "pi-trash"], [1, "role-pill"], [1, "role-pill", "muted"], [1, "login-date"], [1, "login-duration"], [1, "login-never"], ["class", "login-duration", 4, "ngIf"], [1, "loading-skeleton"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], ["class", "people-access-embed", 4, "ngIf"], [1, "people-access-embed"]], template: function SettingsPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "section", 6);
            i0.ɵɵelement(1, "div", 7)(2, "div", 8)(3, "div", 9)(4, "app-breadcrumbs");
            i0.ɵɵelementStart(5, "header", 10)(6, "div", 11)(7, "span", 12);
            i0.ɵɵelement(8, "i", 13);
            i0.ɵɵtext(9, " Settings ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "h1", 14)(11, "span", 15);
            i0.ɵɵtext(12, "People");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "span", 16);
            i0.ɵɵtext(14, "& Access");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "p", 17);
            i0.ɵɵtext(16, " Manage users and roles with clean, controlled access governance. ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(17, "div", 18)(18, "div", 19)(19, "div", 20)(20, "div", 21)(21, "span", 22);
            i0.ɵɵtext(22, "Access governance");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(23, SettingsPage_h1_23_Template, 5, 0, "h1", 23)(24, SettingsPage_h1_24_Template, 5, 0, "h1", 23)(25, SettingsPage_h1_25_Template, 5, 0, "h1", 23)(26, SettingsPage_h1_26_Template, 5, 0, "h1", 23)(27, SettingsPage_h1_27_Template, 5, 0, "h1", 23);
            i0.ɵɵelementStart(28, "p", 24);
            i0.ɵɵtext(29, "People & Access");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 25)(31, "button", 26)(32, "span", 27);
            i0.ɵɵelement(33, "i");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "span");
            i0.ɵɵtext(35);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(36, "div", 28)(37, "div", 29)(38, "span", 30);
            i0.ɵɵelement(39, "i", 31);
            i0.ɵɵtext(40);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "span", 30);
            i0.ɵɵelement(42, "i", 32);
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "span", 33);
            i0.ɵɵelement(45, "i", 34);
            i0.ɵɵtext(46);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(47, "div", 35)(48, "button", 36);
            i0.ɵɵlistener("click", function SettingsPage_Template_button_click_48_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.activeView() === "users" ? ctx.loadUsers() : ctx.activeView() === "roles" ? ctx.loadRoles() : null); });
            i0.ɵɵelementStart(49, "span", 27);
            i0.ɵɵelement(50, "i", 37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "span");
            i0.ɵɵtext(52, "Refresh");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(53, "div", 38);
            i0.ɵɵtemplate(54, SettingsPage_button_54_Template, 4, 7, "button", 39);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "div", 40);
            i0.ɵɵtemplate(56, SettingsPage_ng_container_56_Template, 4, 2, "ng-container", 41)(57, SettingsPage_ng_template_57_Template, 4, 4, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const nonUsersView_r14 = i0.ɵɵreference(58);
            i0.ɵɵadvance(23);
            i0.ɵɵproperty("ngIf", ctx.activeView() === "permissions");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activeView() === "roles");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activeView() === "users");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activeView() === "security-level");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.activeView() === "dashboard-packs");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", !ctx.canManageAdmin())("routerLink", ctx.canManageAdmin() ? ctx.activeView() === "users" ? i0.ɵɵpureFunction0(16, _c0) : ctx.activeView() === "roles" ? i0.ɵɵpureFunction0(17, _c1) : ctx.activeView() === "permissions" ? i0.ɵɵpureFunction0(18, _c2) : ctx.activeView() === "security-level" ? i0.ɵɵpureFunction0(19, _c3) : i0.ɵɵpureFunction0(20, _c4) : null);
            i0.ɵɵadvance(2);
            i0.ɵɵclassMap(ctx.activeView() === "users" ? "pi pi-user-plus" : ctx.activeView() === "roles" ? "pi pi-plus-circle" : ctx.activeView() === "permissions" ? "pi pi-lock" : ctx.activeView() === "security-level" ? "pi pi-shield" : "pi pi-th-large");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.activeView() === "users" ? "Invite user" : ctx.activeView() === "roles" ? "New role" : ctx.activeView() === "permissions" ? "Manage sets" : ctx.activeView() === "security-level" ? "Manage levels" : "Manage packs");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", ctx.totalUsers(), " Users ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.roles().length, " Roles ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.activeUsersCount(), " Active ");
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngForOf", ctx.activeSubmenuItems());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.activeView() === "users")("ngIfElse", nonUsersView_r14);
        } }, dependencies: [RouterLink,
            SelectModule, i1.Select, i2.PrimeTemplate, ButtonModule, i3.ButtonDirective, InputTextModule, i4.InputText, TableModule, i5.Table, ToggleSwitchModule, i6.ToggleSwitch, RolesPage,
            PermissionsPage,
            SecurityLevelsPage,
            DashboardPacksPage,
            NgClass,
            NgFor,
            NgIf,
            FormsModule, i7.DefaultValueAccessor, i7.NgControlStatus, i7.NgModel, BreadcrumbsComponent], styles: ["@use '../../../../../styles/design-tokens' as *;\n\n//   Host   block   styling   to   ensure   component   takes   full   width\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n}\n\n//[_ngcontent-%COMP%]   Page[_ngcontent-%COMP%]   Background[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   override[_ngcontent-%COMP%]   global[_ngcontent-%COMP%]   fixed[_ngcontent-%COMP%]   positioning[_ngcontent-%COMP%]   from[_ngcontent-%COMP%]   _components.scss\n.page-background[_ngcontent-%COMP%] {\n  position: relative !important;\n  inset: unset !important;\n  min-height: 100vh;\n  padding: $space-6;\n  overflow: hidden !important;\n  pointer-events: auto !important;\n}\n\n//[_ngcontent-%COMP%]   Animated[_ngcontent-%COMP%]   Orbs\n.animated-orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  pointer-events: none;\n  z-index: 0;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 400px;\n    height: 400px;\n    background: $primary-gradient;\n    top: -100px;\n    right: -100px;\n    animation-delay: 0s;\n  }\n\n  &.orb-2 {\n    width: 350px;\n    height: 350px;\n    background: $cyan-gradient;\n    bottom: 20%;\n    left: -80px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 280px;\n    height: 280px;\n    background: $purple-gradient;\n    top: 50%;\n    right: 10%;\n    animation-delay: -14s;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(-20px, 20px) scale(0.95); }\n  75% { transform: translate(25px, 10px) scale(1.02); }\n}\n\n//[_ngcontent-%COMP%]   Hero[_ngcontent-%COMP%]   Section\n.page-hero[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: $space-6;\n  padding: $space-5 $space-6;\n  margin-bottom: $space-6;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  animation: _ngcontent-%COMP%_fade-in-down 0.6s ease-out;\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-down {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.hero-eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: $primary;\n  margin-bottom: $space-2;\n\n  i {\n    font-size: 0.9rem;\n  }\n}\n\n//[_ngcontent-%COMP%]   Hero[_ngcontent-%COMP%]   title[_ngcontent-%COMP%]   uses[_ngcontent-%COMP%]   global[_ngcontent-%COMP%]   .hero-title[_ngcontent-%COMP%]   from[_ngcontent-%COMP%]   _components.scss\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  flex-wrap: wrap;\n}\n\n.toggle-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $text-secondary;\n\n  &.compact {\n    font-size: $font-size-xs;\n    padding: $space-1 $space-2;\n    border-radius: $radius-xl;\n    background: rgba(white, 0.6);\n    border: 1px solid $glass-border;\n  }\n}\n\n//[_ngcontent-%COMP%]   Buttons\n.btn-gradient[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-5;\n  background: $primary-gradient;\n  color: white;\n  font-weight: 600;\n  font-size: $font-size-sm;\n  border: none;\n  border-radius: $radius-xl;\n  cursor: pointer;\n  transition: all $transition-normal;\n  box-shadow: 0 4px 15px rgba($primary, 0.3);\n\n  &:hover:not(:disabled) {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba($primary, 0.4);\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n    box-shadow: none;\n  }\n\n  i {\n    font-size: 0.9rem;\n  }\n}\n\n.btn-glass[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-5;\n  background: $glass-bg;\n  backdrop-filter: blur(10px);\n  color: $text-primary;\n  font-weight: 600;\n  font-size: $font-size-sm;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  cursor: pointer;\n  transition: all $transition-normal;\n\n  &:hover:not(:disabled) {\n    background: rgba(white, 0.25);\n    border-color: rgba($primary, 0.3);\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  &.small {\n    padding: $space-2 $space-3;\n    font-size: $font-size-xs;\n  }\n\n  i {\n    font-size: 0.9rem;\n  }\n}\n\n//[_ngcontent-%COMP%]   Metrics[_ngcontent-%COMP%]   Grid\n.metrics-grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-4;\n  margin-bottom: $space-6;\n  animation: _ngcontent-%COMP%_fade-in-up 0.6s ease-out 0.1s both;\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-4;\n  padding: $space-5;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  transition: all $transition-normal;\n\n  &:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);\n    border-color: rgba($primary, 0.3);\n  }\n}\n\n.metric-icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-lg;\n  font-size: 1.5rem;\n\n  &.primary {\n    background: linear-gradient(135deg, rgba($primary, 0.15), rgba($primary, 0.05));\n    color: $primary;\n  }\n\n  &.cyan {\n    background: linear-gradient(135deg, rgba($cyan, 0.15), rgba($cyan, 0.05));\n    color: $cyan;\n  }\n\n  &.purple {\n    background: linear-gradient(135deg, rgba($purple, 0.15), rgba($purple, 0.05));\n    color: $purple;\n  }\n\n  &.orange {\n    background: linear-gradient(135deg, rgba($orange, 0.15), rgba($orange, 0.05));\n    color: $orange;\n  }\n}\n\n.metric-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.metric-value[_ngcontent-%COMP%] {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $text-primary;\n  line-height: 1;\n}\n\n.metric-label[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-muted;\n  margin-top: $space-1;\n}\n\n//[_ngcontent-%COMP%]   Settings[_ngcontent-%COMP%]   Layout\n.settings-layout[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  gap: $space-5;\n  animation: _ngcontent-%COMP%_fade-in-up 0.6s ease-out 0.2s both;\n}\n\n//[_ngcontent-%COMP%]   Glass[_ngcontent-%COMP%]   Card\n.glass-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  padding: $space-5;\n}\n\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: $space-5;\n}\n\n.header-left[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.card-eyebrow[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: $primary;\n  margin-bottom: $space-1;\n}\n\n.card-title[_ngcontent-%COMP%] {\n  font-size: $font-size-card-title;\n  font-weight: 700;\n  color: $text-primary;\n  margin: 0;\n}\n\n.card-subtitle[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-muted;\n  margin: 0;\n}\n\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.people-command-bar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: $space-3;\n  margin-bottom: $space-3;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background: linear-gradient(135deg, rgba(236, 244, 255, 0.82), rgba(245, 242, 255, 0.82));\n  border: 1px solid rgba(148, 163, 184, 0.2);\n}\n\n.command-metrics[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.metric-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.75rem;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: #334164;\n  background: rgba(255, 255, 255, 0.82);\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  border-radius: $radius-full;\n\n  &.metric-pill--success {\n    color: #166534;\n    border-color: rgba(22, 163, 74, 0.24);\n    background: rgba(240, 253, 244, 0.92);\n  }\n}\n\n.people-tabs[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 2px;\n  margin-bottom: $space-4;\n  padding: 0;\n  border-radius: 10px 10px 0 0;\n  border-bottom: 1px solid rgba(58, 90, 162, 0.18);\n  background: transparent;\n\n  &::before {\n    content: '';\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    height: 1px;\n    background: linear-gradient(90deg, rgba(255, 255, 255, 0.6), rgba(237, 242, 255, 0.12));\n    pointer-events: none;\n  }\n}\n\n.view-chip[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: $space-2;\n  min-height: 48px;\n  width: 100%;\n  border: 1px solid transparent;\n  border-radius: 8px 8px 0 0;\n  background: rgba(248, 251, 255, 0.32);\n  color: #4b5e86;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: border-color $transition-fast, color $transition-fast, background $transition-fast, box-shadow $transition-fast;\n\n  &::before {\n    content: '';\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    height: 1px;\n    background: rgba(255, 255, 255, 0.52);\n    pointer-events: none;\n  }\n\n  &::after {\n    content: '';\n    position: absolute;\n    left: 10px;\n    right: 10px;\n    bottom: 0;\n    height: 3px;\n    border-radius: 3px 3px 0 0;\n    background: linear-gradient(90deg, #0f6cbd, #3d92df);\n    transform: scaleX(0.24);\n    opacity: 0;\n    transition: transform $transition-fast, opacity $transition-fast, background $transition-fast;\n    transform-origin: center;\n    pointer-events: none;\n  }\n\n  .tab-icon {\n    font-size: 0.95rem;\n    color: #6178aa;\n    transition: color $transition-fast;\n  }\n\n  .p-button-label,\n  .tab-label,\n  .tab-icon {\n    color: inherit !important;\n    opacity: 1;\n  }\n\n  &:hover:not(:disabled) {\n    color: #2b4371;\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(152, 175, 226, 0.28);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);\n\n    &::after {\n      transform: scaleX(0.5);\n      opacity: 0.45;\n    }\n  }\n\n  &.is-active {\n    color: #1c3e7a;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(242, 247, 255, 0.74));\n    border-color: rgba(126, 162, 233, 0.35);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);\n\n    .tab-icon {\n      color: #0f6cbd;\n    }\n\n    &::after {\n      transform: scaleX(1);\n      opacity: 1;\n      background: linear-gradient(90deg, #0f6cbd, #3d92df);\n    }\n  }\n\n  &:disabled {\n    opacity: 0.52;\n    cursor: not-allowed;\n  }\n}\n\n.people-subtabs[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n  margin-bottom: $space-4;\n  padding: $space-2;\n  border-radius: $radius-lg;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.52), rgba(240, 246, 255, 0.46));\n  border: 1px solid rgba(148, 163, 184, 0.22);\n}\n\n.subview-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  background: rgba(255, 255, 255, 0.7);\n  color: #475569;\n  border-radius: $radius-full;\n  padding: 0.35rem 0.7rem;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  transition: all $transition-fast;\n\n  .p-button-label {\n    color: inherit !important;\n  }\n\n  &:hover:not(:disabled) {\n    background: rgba(240, 248, 255, 0.95);\n    color: #1e3a8a;\n    border-color: rgba(59, 130, 246, 0.34);\n  }\n\n  &.is-active {\n    color: #0f172a;\n    border-color: rgba(59, 130, 246, 0.46);\n    background: linear-gradient(135deg, rgba(219, 234, 254, 0.94), rgba(191, 219, 254, 0.84));\n  }\n}\n\n.view-stage[_ngcontent-%COMP%] {\n  min-height: 280px;\n}\n\n//[_ngcontent-%COMP%]   Data[_ngcontent-%COMP%]   Table\n.table-wrapper[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n\n  th, td {\n    padding: $space-4 $space-3;\n    text-align: left;\n  }\n\n  th {\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #516070;\n    background: linear-gradient(180deg, #f5f7fb 0%, #edf1f8 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n  }\n\n  td {\n    font-size: $font-size-sm;\n    color: $text-secondary;\n    border-bottom: 1px solid rgba($glass-border, 0.5);\n  }\n\n  tbody tr {\n    transition: all $transition-fast;\n\n    &:hover {\n      background: rgba($primary, 0.04);\n    }\n\n    &:last-child td {\n      border-bottom: none;\n    }\n  }\n\n  .text-right {\n    text-align: right;\n  }\n}\n\n.table-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: $space-3;\n  margin-bottom: $space-4;\n  flex-wrap: wrap;\n}\n\n.toolbar-search[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  min-width: 280px;\n  flex: 1;\n\n  i {\n    color: $text-muted;\n    font-size: 0.9rem;\n  }\n\n  input {\n    border: none;\n    background: transparent;\n    width: 100%;\n    font-size: $font-size-sm;\n    color: $text-primary;\n\n    &:focus {\n      outline: none;\n    }\n  }\n}\n\n.toolbar-filters[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.filter-select[_ngcontent-%COMP%] {\n  min-width: 160px;\n}\n\n.user-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n\n  &:hover .user-name {\n    color: $primary;\n  }\n}\n\n//[_ngcontent-%COMP%]   User[_ngcontent-%COMP%]   Cell\n.user-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.user-avatar[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: $radius-lg;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: $font-size-lg;\n  color: white;\n  position: relative;\n  overflow: hidden;\n  background: var(--avatar-gradient, $primary-gradient);\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n\n  &.avatar-active {\n    background: var(--avatar-gradient, $primary-gradient);\n  }\n\n  &.avatar-inactive {\n    background: linear-gradient(135deg, #94a3b8, #64748b);\n    filter: grayscale(0.2);\n  }\n\n  &.avatar-online::after {\n    content: '';\n    position: absolute;\n    inset: -6px;\n    border-radius: inherit;\n    border: 2px solid rgba($success, 0.35);\n    opacity: 0.8;\n    animation: _ngcontent-%COMP%_online-pulse 2s ease-in-out infinite;\n  }\n}\n\n.user-avatar.avatar-tone-1[_ngcontent-%COMP%] { --avatar-gradient: linear-gradient(135deg, #6366f1, #38bdf8); }\n.user-avatar.avatar-tone-2[_ngcontent-%COMP%] { --avatar-gradient: linear-gradient(135deg, #f97316, #f43f5e); }\n.user-avatar.avatar-tone-3[_ngcontent-%COMP%] { --avatar-gradient: linear-gradient(135deg, #22c55e, #16a34a); }\n.user-avatar.avatar-tone-4[_ngcontent-%COMP%] { --avatar-gradient: linear-gradient(135deg, #a855f7, #6366f1); }\n.user-avatar.avatar-tone-5[_ngcontent-%COMP%] { --avatar-gradient: linear-gradient(135deg, #06b6d4, #0ea5e9); }\n.user-avatar.avatar-tone-6[_ngcontent-%COMP%] { --avatar-gradient: linear-gradient(135deg, #eab308, #f59e0b); }\n.user-avatar.avatar-tone-7[_ngcontent-%COMP%] { --avatar-gradient: linear-gradient(135deg, #ec4899, #f472b6); }\n.user-avatar.avatar-tone-8[_ngcontent-%COMP%] { --avatar-gradient: linear-gradient(135deg, #14b8a6, #22d3ee); }\n\n.user-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.user-email[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.user-presence[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $text-muted;\n  margin-top: 2px;\n\n  &.is-online {\n    color: $success;\n  }\n}\n\n.presence-icon[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: $gray-400;\n  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.08);\n}\n\n.user-presence.is-online[_ngcontent-%COMP%]   .presence-icon[_ngcontent-%COMP%] {\n  background: $success;\n  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.08), 0 0 10px rgba($success, 0.6);\n  animation: _ngcontent-%COMP%_status-glow 1.6s ease-in-out infinite;\n}\n\n.presence-dot[_ngcontent-%COMP%] {\n  position: absolute;\n  right: -3px;\n  bottom: -3px;\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  border: 2px solid rgba(white, 0.9);\n  background: #94a3b8;\n  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.08);\n\n  &.online {\n    background: $success;\n    box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.08), 0 0 10px rgba($success, 0.6);\n    animation: _ngcontent-%COMP%_status-glow 1.6s ease-in-out infinite;\n  }\n}\n\n//[_ngcontent-%COMP%]   Role[_ngcontent-%COMP%]   Badges\n.role-badges[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-1;\n}\n\n.role-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: $space-1 $space-2;\n  font-size: $font-size-xs;\n  font-weight: 500;\n  background: rgba($purple, 0.1);\n  color: $purple;\n  border-radius: $radius-md;\n  border: 1px solid rgba($purple, 0.2);\n}\n\n.role-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: $space-1 $space-3;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  background: rgba($primary, 0.12);\n  color: $primary;\n  border-radius: $radius-full;\n\n  &.muted {\n    background: rgba($gray-400, 0.15);\n    color: $text-muted;\n  }\n}\n\n.people-access-embed[_ngcontent-%COMP%] {\n  margin-top: $space-4;\n}\n\n.teams-panel[_ngcontent-%COMP%] {\n  margin-top: $space-4;\n  padding: $space-6;\n  background: rgba(white, 0.65);\n  border: 1px dashed rgba($primary, 0.25);\n  border-radius: $radius-xl;\n  text-align: center;\n}\n\n.teams-empty[_ngcontent-%COMP%] {\n  display: grid;\n  gap: $space-2;\n  justify-items: center;\n\n  h3 {\n    margin: 0;\n    font-size: $font-size-lg;\n    color: $text-primary;\n  }\n\n  p {\n    margin: 0;\n    max-width: 420px;\n    color: $text-muted;\n  }\n}\n\n.teams-icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: $radius-lg;\n  display: grid;\n  place-items: center;\n  background: rgba($primary, 0.12);\n  color: $primary;\n  font-size: 1.4rem;\n}\n\n//[_ngcontent-%COMP%]   Login[_ngcontent-%COMP%]   Date\n.login-date[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-secondary;\n  display: block;\n}\n\n.login-duration[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  display: block;\n  margin-top: 2px;\n}\n\n.login-location[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-secondary;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 4px;\n\n  i {\n    font-size: 0.75rem;\n    color: rgba($purple, 0.8);\n  }\n\n  &.location-muted {\n    color: $text-muted;\n\n    i {\n      color: rgba($text-muted, 0.8);\n    }\n  }\n}\n\n.login-never[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-muted;\n  font-style: italic;\n}\n\n@keyframes _ngcontent-%COMP%_online-pulse {\n  0%, 100% { transform: scale(0.95); opacity: 0.6; }\n  50% { transform: scale(1.05); opacity: 0.9; }\n}\n\n@keyframes _ngcontent-%COMP%_status-glow {\n  0%, 100% { transform: scale(1); opacity: 0.8; }\n  50% { transform: scale(1.15); opacity: 1; }\n}\n\n//[_ngcontent-%COMP%]   Status[_ngcontent-%COMP%]   Badge\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: $space-1 $space-3;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n\n  &.badge-success {\n    background: rgba($success, 0.12);\n    color: $success;\n  }\n\n  &.badge-warning {\n    background: rgba($orange, 0.12);\n    color: $orange;\n  }\n}\n\n//[_ngcontent-%COMP%]   Action[_ngcontent-%COMP%]   Buttons\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: $space-1;\n  pointer-events: auto;\n}\n\n//[_ngcontent-%COMP%]   Loading[_ngcontent-%COMP%]   Skeleton\n.loading-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  height: 64px;\n  background: linear-gradient(90deg, rgba($glass-border, 0.3) 25%, rgba($glass-border, 0.5) 50%, rgba($glass-border, 0.3) 75%);\n  background-size: 200% 100%;\n  border-radius: $radius-lg;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n//[_ngcontent-%COMP%]   Toast[_ngcontent-%COMP%]   Notification\n.toast-notification[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: $space-8;\n  right: $space-8;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-4 $space-5;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border-radius: $radius-xl;\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);\n  z-index: $z-toast;\n  animation: _ngcontent-%COMP%_toast-in 0.3s ease-out;\n\n  &.toast--success {\n    border: 1px solid rgba($success, 0.3);\n\n    i {\n      color: $success;\n    }\n  }\n\n  &.toast--error {\n    border: 1px solid rgba($danger, 0.3);\n\n    i {\n      color: $danger;\n    }\n  }\n\n  span {\n    font-size: $font-size-sm;\n    font-weight: 500;\n    color: $text-primary;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_toast-in {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.toast-close[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-md;\n  color: $text-muted;\n  cursor: pointer;\n  transition: all $transition-fast;\n\n  &:hover {\n    background: rgba($text-muted, 0.1);\n    color: $text-primary;\n  }\n}\n\n//   Custom   PrimeNG   Overrides\n[_nghost-%COMP%]     {\n  .custom-select,\n  .custom-multiselect {\n    width: 100%;\n\n    .p-select,\n    .p-multiselect {\n      background: rgba(white, 0.6);\n      border: 1px solid $glass-border;\n      border-radius: $radius-lg;\n\n      &:hover {\n        border-color: rgba($primary, 0.3);\n      }\n\n      &.p-focus {\n        border-color: $primary;\n        box-shadow: 0 0 0 3px rgba($primary, 0.1);\n      }\n    }\n  }\n\n  .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {\n    background: $primary-gradient;\n  }\n\n  // PrimeNG button overrides for disabled state\n  .p-button:disabled,\n  .p-button.p-disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n    pointer-events: auto; // Allow cursor to show not-allowed\n  }\n\n  .btn-gradient.p-button:disabled,\n  .btn-glass.p-button:disabled {\n    &:hover {\n      transform: none;\n      box-shadow: none;\n    }\n  }\n\n  .people-access-embed {\n    .page-background {\n      padding: 0;\n      background: transparent;\n      overflow: visible;\n    }\n\n    .animated-orb,\n    app-breadcrumbs,\n    .page-hero,\n    .hero-section {\n      display: none;\n    }\n\n    .page-container,\n    .page-content {\n      padding: 0;\n      margin: 0;\n      background: transparent;\n    }\n\n    .hero-section,\n    .page-hero {\n      margin-top: 0;\n      padding-top: 0;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   Responsive\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 900px) {\n  .page-hero {\n    flex-direction: column;\n    text-align: center;\n  }\n\n  .hero-subtitle {\n    max-width: none;\n  }\n\n  .metrics-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .people-command-bar {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .people-tabs {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .people-subtabs {\n    justify-content: center;\n  }\n}\n\n@media (max-width: 600px) {\n  .page-background[_ngcontent-%COMP%] {\n    padding: $space-4;\n  }\n\n  .metrics-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .data-table[_ngcontent-%COMP%] {\n    th, td {\n      padding: $space-3 $space-2;\n    }\n  }\n\n  //[_ngcontent-%COMP%]   Stack[_ngcontent-%COMP%]   filters[_ngcontent-%COMP%]   and[_ngcontent-%COMP%]   allow[_ngcontent-%COMP%]   the[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]   to[_ngcontent-%COMP%]   scroll[_ngcontent-%COMP%]   on[_ngcontent-%COMP%]   narrow[_ngcontent-%COMP%]   screens.\n[_ngcontent-%COMP%]   .table-toolbar[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .toolbar-search[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n\n  .toolbar-filters[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .filter-select[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n\n  .data-table[_ngcontent-%COMP%] {\n    min-width: 760px;\n  }\n\n  .people-tabs[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .view-chip[_ngcontent-%COMP%] {\n    min-height: 44px;\n  }\n\n  .people-subtabs[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SettingsPage, [{
        type: Component,
        args: [{ selector: 'app-settings-page', standalone: true, imports: [
                    RouterLink,
                    SelectModule,
                    ButtonModule,
                    InputTextModule,
                    TableModule,
                    ToggleSwitchModule,
                    RolesPage,
                    PermissionsPage,
                    SecurityLevelsPage,
                    DashboardPacksPage,
                    NgClass,
                    NgFor,
                    NgIf,
                    FormsModule,
                    BreadcrumbsComponent
                ], template: "<section class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <header class=\"page-hero\">\n    <div class=\"hero-content\">\n      <span class=\"hero-eyebrow\">\n        <i class=\"pi pi-cog\"></i>\n        Settings\n      </span>\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">People</span>\n        <span class=\"title-light\">& Access</span>\n      </h1>\n      <p class=\"hero-subtitle\">\n        Manage users and roles with clean, controlled access governance.\n      </p>\n    </div>\n  </header>\n\n  <div class=\"settings-layout\">\n    <div class=\"glass-card users-panel\">\n      <div class=\"card-header\">\n        <div class=\"header-left\">\n          <span class=\"card-eyebrow\">Access governance</span>\n          <h1 class=\"non-hero-title\" *ngIf=\"activeView() === 'permissions'\">\n            <span class=\"title-gradient\">Permission</span>\n            <span class=\"title-light\">Management</span>\n          </h1>\n          <h1 class=\"non-hero-title\" *ngIf=\"activeView() === 'roles'\">\n            <span class=\"title-gradient\">Role</span>\n            <span class=\"title-light\">Management</span>\n          </h1>\n          <h1 class=\"non-hero-title\" *ngIf=\"activeView() === 'users'\">\n            <span class=\"title-gradient\">User</span>\n            <span class=\"title-light\">Management</span>\n          </h1>\n          <h1 class=\"non-hero-title\" *ngIf=\"activeView() === 'security-level'\">\n            <span class=\"title-gradient\">Security Level</span>\n            <span class=\"title-light\">Management</span>\n          </h1>\n          <h1 class=\"non-hero-title\" *ngIf=\"activeView() === 'dashboard-packs'\">\n            <span class=\"title-gradient\">Dashboard Pack</span>\n            <span class=\"title-light\">Management</span>\n          </h1>\n          <p class=\"card-subtitle\">People &amp; Access</p>\n        </div>\n        <div class=\"header-actions\">\n          <button\n            type=\"button\"\n            class=\"action-btn action-btn--add\"\n            [disabled]=\"!canManageAdmin()\"\n            [routerLink]=\"\n              canManageAdmin()\n                ? (activeView() === 'users'\n                    ? ['/app/settings/invite']\n                    : activeView() === 'roles'\n                      ? ['/app/settings/roles/new']\n                    : activeView() === 'permissions'\n                      ? ['/app/settings/permissions']\n                    : activeView() === 'security-level'\n                      ? ['/app/settings/security-levels']\n                      : ['/app/settings/dashboard-packs'])\n                : null\n            \"\n          >\n            <span class=\"action-btn__icon\"><i [class]=\"activeView() === 'users' ? 'pi pi-user-plus' : activeView() === 'roles' ? 'pi pi-plus-circle' : activeView() === 'permissions' ? 'pi pi-lock' : activeView() === 'security-level' ? 'pi pi-shield' : 'pi pi-th-large'\"></i></span>\n            <span>{{ activeView() === 'users' ? 'Invite user' : activeView() === 'roles' ? 'New role' : activeView() === 'permissions' ? 'Manage sets' : activeView() === 'security-level' ? 'Manage levels' : 'Manage packs' }}</span>\n          </button>\n        </div>\n      </div>\n\n      <div class=\"people-command-bar\">\n        <div class=\"command-metrics\">\n          <span class=\"metric-pill\">\n            <i class=\"pi pi-users\"></i>\n            {{ totalUsers() }} Users\n          </span>\n          <span class=\"metric-pill\">\n            <i class=\"pi pi-shield\"></i>\n            {{ roles().length }} Roles\n          </span>\n          <span class=\"metric-pill metric-pill--success\">\n            <i class=\"pi pi-check-circle\"></i>\n            {{ activeUsersCount() }} Active\n          </span>\n        </div>\n        <div class=\"command-actions\">\n          <button type=\"button\" class=\"action-btn action-btn--refresh\" (click)=\"activeView() === 'users' ? loadUsers() : activeView() === 'roles' ? loadRoles() : null\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n            <span>Refresh</span>\n          </button>\n        </div>\n      </div>\n\n      <div class=\"people-subtabs\" role=\"tablist\" aria-label=\"People and access sub views\">\n        <button\n          pButton\n          type=\"button\"\n          class=\"subview-chip\"\n          *ngFor=\"let item of activeSubmenuItems()\"\n          [ngClass]=\"{ 'is-active': isSubmenuActive(item) }\"\n          [attr.aria-selected]=\"isSubmenuActive(item)\"\n          (click)=\"selectSubmenu(item)\"\n        >\n          <i [class]=\"item.icon\"></i>\n          <span>{{ item.label }}</span>\n        </button>\n      </div>\n\n      <div class=\"view-stage\">\n        <ng-container *ngIf=\"activeView() === 'users'; else nonUsersView\">\n          <ng-container *ngIf=\"!loadingUsers(); else usersLoading\">\n            <div class=\"table-toolbar\">\n              <div class=\"toolbar-search\">\n                <i class=\"pi pi-search\"></i>\n                <input\n                  pInputText\n                  type=\"search\"\n                  [ngModel]=\"searchTerm()\"\n                  (ngModelChange)=\"onSearchChange($event)\"\n                  placeholder=\"Search by name or email\"\n                />\n              </div>\n              <div class=\"toolbar-filters\">\n                <p-select appendTo=\"body\"\n                  [options]=\"roleFilterOptions()\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  [ngModel]=\"roleFilter()\"\n                  (ngModelChange)=\"onRoleFilterChange($event)\"\n                  placeholder=\"All roles\"\n                  styleClass=\"filter-select\"\n                ></p-select>\n                <label class=\"toggle-wrapper compact\">\n                  <span>Show inactive</span>\n                  <p-toggleSwitch [ngModel]=\"includeInactive()\" (ngModelChange)=\"toggleIncludeInactive($event)\"></p-toggleSwitch>\n                </label>\n                <button pButton type=\"button\" class=\"btn-glass small\" (click)=\"resetFilters()\">Reset</button>\n              </div>\n            </div>\n\n            <div class=\"table-wrapper\">\n              <p-table\n                class=\"data-table\"\n                [value]=\"filteredUsers()\"\n                [paginator]=\"true\"\n                [rows]=\"pageSize()\"\n                [rowsPerPageOptions]=\"pageSizeOptions\"\n                [totalRecords]=\"totalUsers()\"\n                [first]=\"(page() - 1) * pageSize()\"\n                (onPage)=\"handlePage($event)\"\n              >\n                <ng-template pTemplate=\"header\">\n                  <tr>\n                    <th>Name</th>\n                    <th>Email</th>\n                    <th>Role</th>\n                    <th>Status</th>\n                    <th>Last login</th>\n                    <th>Environment</th>\n                    <th class=\"text-right\">Actions</th>\n                  </tr>\n                </ng-template>\n                <ng-template pTemplate=\"body\" let-user>\n                  <tr class=\"user-row\" (click)=\"startEdit(user)\">\n                    <td>\n                      <div class=\"user-cell\">\n                        <div\n                          class=\"user-avatar\"\n                          [ngClass]=\"getAvatarClasses(user)\"\n                        >\n                          <img\n                            [src]=\"user.profilePictureUrl || ('https://i.pravatar.cc/150?u=' + (user.email || user.id))\"\n                            [alt]=\"user.fullName + ' avatar'\"\n                            [title]=\"user.fullName + ' avatar'\"\n                          />\n                          <span class=\"presence-dot\" [ngClass]=\"isOnline(user) ? 'online' : 'offline'\"></span>\n                        </div>\n                        <div class=\"user-info\">\n                          <span class=\"user-name\">{{ user.fullName }}</span>\n                          <span class=\"user-presence\" [ngClass]=\"isOnline(user) ? 'is-online' : 'is-offline'\">\n                            <span class=\"presence-icon\"></span>\n                            {{ isOnline(user) ? 'Online now' : 'Offline' }}\n                          </span>\n                        </div>\n                      </div>\n                    </td>\n                    <td>\n                      <span class=\"user-email\">{{ user.email }}</span>\n                    </td>\n                    <td>\n                      <span class=\"role-pill\" *ngIf=\"user.roles?.length; else unassignedRole\">\n                        {{ user.roles[0] }}\n                      </span>\n                      <ng-template #unassignedRole>\n                        <span class=\"role-pill muted\">Unassigned</span>\n                      </ng-template>\n                    </td>\n                    <td>\n                      <span class=\"status-badge\" [ngClass]=\"user.isActive ? 'badge-success' : 'badge-warning'\">\n                        {{ user.isActive ? 'Active' : 'Inactive' }}\n                      </span>\n                    </td>\n                    <td>\n                      <ng-container *ngIf=\"user.lastLoginAtUtc; else inviteOrNever\">\n                        <span class=\"login-date\">\n                          {{ formatLoginTime(user) }}\n                        </span>\n                        <span class=\"login-duration\">\n                          {{ formatLoginDuration(user, isOnline(user)) }}\n                        </span>\n                      </ng-container>\n                      <ng-template #inviteOrNever>\n                        <ng-container *ngIf=\"user.lastInviteSentAtUtc; else neverLogged\">\n                          <span class=\"login-date\">\n                            Invite sent {{ formatInviteSentTime(user) }}\n                          </span>\n                          <span class=\"login-duration\">\n                            {{ formatInviteSentDuration(user) }}\n                          </span>\n                        </ng-container>\n                      </ng-template>\n                      <ng-template #neverLogged>\n                        <span class=\"login-never\">Never logged in</span>\n                      </ng-template>\n                    </td>\n                    <td>\n                      <ng-container *ngIf=\"user.lastLoginAtUtc; else noEnvironment\">\n                        <span class=\"login-date\">\n                          {{ formatUserEnvironment(user) }}\n                        </span>\n                        <span class=\"login-duration\" *ngIf=\"formatUserEnvironmentDetail(user) as environmentDetail\">\n                          {{ environmentDetail }}\n                        </span>\n                      </ng-container>\n                      <ng-template #noEnvironment>\n                        <span class=\"login-never\">-</span>\n                      </ng-template>\n                    </td>\n                    <td class=\"text-right\">\n                      <div class=\"row-actions\">\n                        <button type=\"button\" class=\"row-action-btn row-action-btn--edit\" title=\"Edit user\" aria-label=\"Edit user\" [disabled]=\"!canManageAdmin()\" (click)=\"$event.stopPropagation(); startEdit(user)\"><i class=\"pi pi-pencil\"></i></button>\n                        <button type=\"button\" class=\"row-action-btn row-action-btn--view\" [title]=\"user.isActive ? 'Deactivate' : 'Activate'\" [attr.aria-label]=\"user.isActive ? 'Deactivate user' : 'Activate user'\" [disabled]=\"!canManageAdmin()\" (click)=\"$event.stopPropagation(); toggleUserStatus(user)\"><i class=\"pi\" [ngClass]=\"user.isActive ? 'pi-eye-slash' : 'pi-eye'\"></i></button>\n                        <button\n                          type=\"button\"\n                          class=\"row-action-btn row-action-btn--activity\"\n                          title=\"Resend invite\"\n                          aria-label=\"Resend invite\"\n                          [disabled]=\"!canManageAdmin() || !canResendInvite(user)\"\n                          (click)=\"$event.stopPropagation(); resendInvite(user)\"\n                        ><i class=\"pi pi-send\"></i></button>\n                        <button type=\"button\" class=\"row-action-btn row-action-btn--convert\" title=\"Reset password\" aria-label=\"Reset password\" [disabled]=\"!canManageAdmin()\" (click)=\"$event.stopPropagation(); resetPassword(user)\"><i class=\"pi pi-key\"></i></button>\n                        <button type=\"button\" class=\"row-action-btn row-action-btn--delete\" title=\"Remove user\" aria-label=\"Remove user\" [disabled]=\"!canManageAdmin()\" (click)=\"$event.stopPropagation(); deleteUser(user)\"><i class=\"pi pi-trash\"></i></button>\n                      </div>\n                    </td>\n                  </tr>\n                </ng-template>\n              </p-table>\n            </div>\n          </ng-container>\n\n          <ng-template #usersLoading>\n            <div class=\"loading-skeleton\">\n              <div class=\"skeleton-row\" *ngFor=\"let _ of [0, 1, 2, 3, 4]\"></div>\n            </div>\n          </ng-template>\n        </ng-container>\n\n        <ng-template #nonUsersView>\n          <div class=\"people-access-embed\" *ngIf=\"activeView() === 'roles'\">\n            <app-roles-page></app-roles-page>\n          </div>\n          <div class=\"people-access-embed\" *ngIf=\"activeView() === 'permissions'\">\n            <app-permissions-page></app-permissions-page>\n          </div>\n          <div class=\"people-access-embed\" *ngIf=\"activeView() === 'security-level'\">\n            <app-security-levels-page></app-security-levels-page>\n          </div>\n          <div class=\"people-access-embed\" *ngIf=\"activeView() === 'dashboard-packs'\">\n            <app-dashboard-packs-page></app-dashboard-packs-page>\n          </div>\n        </ng-template>\n      </div>\n    </div>\n\n  </div>\n\n</section>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n\n// Host block styling to ensure component takes full width\n:host {\n  display: block;\n  width: 100%;\n}\n\n// Page Background - override global fixed positioning from _components.scss\n.page-background {\n  position: relative !important;\n  inset: unset !important;\n  min-height: 100vh;\n  padding: $space-6;\n  overflow: hidden !important;\n  pointer-events: auto !important;\n}\n\n// Animated Orbs\n.animated-orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  pointer-events: none;\n  z-index: 0;\n  animation: orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 400px;\n    height: 400px;\n    background: $primary-gradient;\n    top: -100px;\n    right: -100px;\n    animation-delay: 0s;\n  }\n\n  &.orb-2 {\n    width: 350px;\n    height: 350px;\n    background: $cyan-gradient;\n    bottom: 20%;\n    left: -80px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 280px;\n    height: 280px;\n    background: $purple-gradient;\n    top: 50%;\n    right: 10%;\n    animation-delay: -14s;\n  }\n}\n\n@keyframes orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(-20px, 20px) scale(0.95); }\n  75% { transform: translate(25px, 10px) scale(1.02); }\n}\n\n// Hero Section\n.page-hero {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: $space-6;\n  padding: $space-5 $space-6;\n  margin-bottom: $space-6;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  animation: fade-in-down 0.6s ease-out;\n}\n\n@keyframes fade-in-down {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.hero-content {\n  flex: 1;\n}\n\n.hero-eyebrow {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: $primary;\n  margin-bottom: $space-2;\n\n  i {\n    font-size: 0.9rem;\n  }\n}\n\n// Hero title uses global .hero-title from _components.scss\n\n.hero-actions {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  flex-wrap: wrap;\n}\n\n.toggle-wrapper {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $text-secondary;\n\n  &.compact {\n    font-size: $font-size-xs;\n    padding: $space-1 $space-2;\n    border-radius: $radius-xl;\n    background: rgba(white, 0.6);\n    border: 1px solid $glass-border;\n  }\n}\n\n// Buttons\n.btn-gradient {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-5;\n  background: $primary-gradient;\n  color: white;\n  font-weight: 600;\n  font-size: $font-size-sm;\n  border: none;\n  border-radius: $radius-xl;\n  cursor: pointer;\n  transition: all $transition-normal;\n  box-shadow: 0 4px 15px rgba($primary, 0.3);\n\n  &:hover:not(:disabled) {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba($primary, 0.4);\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n    box-shadow: none;\n  }\n\n  i {\n    font-size: 0.9rem;\n  }\n}\n\n.btn-glass {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-5;\n  background: $glass-bg;\n  backdrop-filter: blur(10px);\n  color: $text-primary;\n  font-weight: 600;\n  font-size: $font-size-sm;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  cursor: pointer;\n  transition: all $transition-normal;\n\n  &:hover:not(:disabled) {\n    background: rgba(white, 0.25);\n    border-color: rgba($primary, 0.3);\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  &.small {\n    padding: $space-2 $space-3;\n    font-size: $font-size-xs;\n  }\n\n  i {\n    font-size: 0.9rem;\n  }\n}\n\n// Metrics Grid\n.metrics-grid {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-4;\n  margin-bottom: $space-6;\n  animation: fade-in-up 0.6s ease-out 0.1s both;\n}\n\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.metric-card {\n  display: flex;\n  align-items: center;\n  gap: $space-4;\n  padding: $space-5;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  transition: all $transition-normal;\n\n  &:hover {\n    transform: translateY(-4px);\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);\n    border-color: rgba($primary, 0.3);\n  }\n}\n\n.metric-icon {\n  width: 56px;\n  height: 56px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-lg;\n  font-size: 1.5rem;\n\n  &.primary {\n    background: linear-gradient(135deg, rgba($primary, 0.15), rgba($primary, 0.05));\n    color: $primary;\n  }\n\n  &.cyan {\n    background: linear-gradient(135deg, rgba($cyan, 0.15), rgba($cyan, 0.05));\n    color: $cyan;\n  }\n\n  &.purple {\n    background: linear-gradient(135deg, rgba($purple, 0.15), rgba($purple, 0.05));\n    color: $purple;\n  }\n\n  &.orange {\n    background: linear-gradient(135deg, rgba($orange, 0.15), rgba($orange, 0.05));\n    color: $orange;\n  }\n}\n\n.metric-content {\n  display: flex;\n  flex-direction: column;\n}\n\n.metric-value {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $text-primary;\n  line-height: 1;\n}\n\n.metric-label {\n  font-size: $font-size-sm;\n  color: $text-muted;\n  margin-top: $space-1;\n}\n\n// Settings Layout\n.settings-layout {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  gap: $space-5;\n  animation: fade-in-up 0.6s ease-out 0.2s both;\n}\n\n// Glass Card\n.glass-card {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  -webkit-backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  padding: $space-5;\n}\n\n.card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: $space-5;\n}\n\n.header-left {\n  flex: 1;\n}\n\n.card-eyebrow {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: $primary;\n  margin-bottom: $space-1;\n}\n\n.card-title {\n  font-size: $font-size-card-title;\n  font-weight: 700;\n  color: $text-primary;\n  margin: 0;\n}\n\n.card-subtitle {\n  font-size: $font-size-sm;\n  color: $text-muted;\n  margin: 0;\n}\n\n.header-actions {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.people-command-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: $space-3;\n  margin-bottom: $space-3;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background: linear-gradient(135deg, rgba(236, 244, 255, 0.82), rgba(245, 242, 255, 0.82));\n  border: 1px solid rgba(148, 163, 184, 0.2);\n}\n\n.command-metrics {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.metric-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.75rem;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: #334164;\n  background: rgba(255, 255, 255, 0.82);\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  border-radius: $radius-full;\n\n  &.metric-pill--success {\n    color: #166534;\n    border-color: rgba(22, 163, 74, 0.24);\n    background: rgba(240, 253, 244, 0.92);\n  }\n}\n\n.people-tabs {\n  position: relative;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 2px;\n  margin-bottom: $space-4;\n  padding: 0;\n  border-radius: 10px 10px 0 0;\n  border-bottom: 1px solid rgba(58, 90, 162, 0.18);\n  background: transparent;\n\n  &::before {\n    content: '';\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    height: 1px;\n    background: linear-gradient(90deg, rgba(255, 255, 255, 0.6), rgba(237, 242, 255, 0.12));\n    pointer-events: none;\n  }\n}\n\n.view-chip {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: $space-2;\n  min-height: 48px;\n  width: 100%;\n  border: 1px solid transparent;\n  border-radius: 8px 8px 0 0;\n  background: rgba(248, 251, 255, 0.32);\n  color: #4b5e86;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  letter-spacing: 0.01em;\n  cursor: pointer;\n  transition: border-color $transition-fast, color $transition-fast, background $transition-fast, box-shadow $transition-fast;\n\n  &::before {\n    content: '';\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    height: 1px;\n    background: rgba(255, 255, 255, 0.52);\n    pointer-events: none;\n  }\n\n  &::after {\n    content: '';\n    position: absolute;\n    left: 10px;\n    right: 10px;\n    bottom: 0;\n    height: 3px;\n    border-radius: 3px 3px 0 0;\n    background: linear-gradient(90deg, #0f6cbd, #3d92df);\n    transform: scaleX(0.24);\n    opacity: 0;\n    transition: transform $transition-fast, opacity $transition-fast, background $transition-fast;\n    transform-origin: center;\n    pointer-events: none;\n  }\n\n  .tab-icon {\n    font-size: 0.95rem;\n    color: #6178aa;\n    transition: color $transition-fast;\n  }\n\n  .p-button-label,\n  .tab-label,\n  .tab-icon {\n    color: inherit !important;\n    opacity: 1;\n  }\n\n  &:hover:not(:disabled) {\n    color: #2b4371;\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(152, 175, 226, 0.28);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);\n\n    &::after {\n      transform: scaleX(0.5);\n      opacity: 0.45;\n    }\n  }\n\n  &.is-active {\n    color: #1c3e7a;\n    background: linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(242, 247, 255, 0.74));\n    border-color: rgba(126, 162, 233, 0.35);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);\n\n    .tab-icon {\n      color: #0f6cbd;\n    }\n\n    &::after {\n      transform: scaleX(1);\n      opacity: 1;\n      background: linear-gradient(90deg, #0f6cbd, #3d92df);\n    }\n  }\n\n  &:disabled {\n    opacity: 0.52;\n    cursor: not-allowed;\n  }\n}\n\n.people-subtabs {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n  margin-bottom: $space-4;\n  padding: $space-2;\n  border-radius: $radius-lg;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.52), rgba(240, 246, 255, 0.46));\n  border: 1px solid rgba(148, 163, 184, 0.22);\n}\n\n.subview-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  background: rgba(255, 255, 255, 0.7);\n  color: #475569;\n  border-radius: $radius-full;\n  padding: 0.35rem 0.7rem;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  transition: all $transition-fast;\n\n  .p-button-label {\n    color: inherit !important;\n  }\n\n  &:hover:not(:disabled) {\n    background: rgba(240, 248, 255, 0.95);\n    color: #1e3a8a;\n    border-color: rgba(59, 130, 246, 0.34);\n  }\n\n  &.is-active {\n    color: #0f172a;\n    border-color: rgba(59, 130, 246, 0.46);\n    background: linear-gradient(135deg, rgba(219, 234, 254, 0.94), rgba(191, 219, 254, 0.84));\n  }\n}\n\n.view-stage {\n  min-height: 280px;\n}\n\n// Data Table\n.table-wrapper {\n  overflow-x: auto;\n}\n\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n  border-spacing: 0;\n\n  th, td {\n    padding: $space-4 $space-3;\n    text-align: left;\n  }\n\n  th {\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #516070;\n    background: linear-gradient(180deg, #f5f7fb 0%, #edf1f8 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n  }\n\n  td {\n    font-size: $font-size-sm;\n    color: $text-secondary;\n    border-bottom: 1px solid rgba($glass-border, 0.5);\n  }\n\n  tbody tr {\n    transition: all $transition-fast;\n\n    &:hover {\n      background: rgba($primary, 0.04);\n    }\n\n    &:last-child td {\n      border-bottom: none;\n    }\n  }\n\n  .text-right {\n    text-align: right;\n  }\n}\n\n.table-toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: $space-3;\n  margin-bottom: $space-4;\n  flex-wrap: wrap;\n}\n\n.toolbar-search {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  min-width: 280px;\n  flex: 1;\n\n  i {\n    color: $text-muted;\n    font-size: 0.9rem;\n  }\n\n  input {\n    border: none;\n    background: transparent;\n    width: 100%;\n    font-size: $font-size-sm;\n    color: $text-primary;\n\n    &:focus {\n      outline: none;\n    }\n  }\n}\n\n.toolbar-filters {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.filter-select {\n  min-width: 160px;\n}\n\n.user-row {\n  cursor: pointer;\n\n  &:hover .user-name {\n    color: $primary;\n  }\n}\n\n// User Cell\n.user-cell {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.user-avatar {\n  width: 44px;\n  height: 44px;\n  border-radius: $radius-lg;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: $font-size-lg;\n  color: white;\n  position: relative;\n  overflow: hidden;\n  background: var(--avatar-gradient, $primary-gradient);\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n\n  &.avatar-active {\n    background: var(--avatar-gradient, $primary-gradient);\n  }\n\n  &.avatar-inactive {\n    background: linear-gradient(135deg, #94a3b8, #64748b);\n    filter: grayscale(0.2);\n  }\n\n  &.avatar-online::after {\n    content: '';\n    position: absolute;\n    inset: -6px;\n    border-radius: inherit;\n    border: 2px solid rgba($success, 0.35);\n    opacity: 0.8;\n    animation: online-pulse 2s ease-in-out infinite;\n  }\n}\n\n.user-avatar.avatar-tone-1 { --avatar-gradient: linear-gradient(135deg, #6366f1, #38bdf8); }\n.user-avatar.avatar-tone-2 { --avatar-gradient: linear-gradient(135deg, #f97316, #f43f5e); }\n.user-avatar.avatar-tone-3 { --avatar-gradient: linear-gradient(135deg, #22c55e, #16a34a); }\n.user-avatar.avatar-tone-4 { --avatar-gradient: linear-gradient(135deg, #a855f7, #6366f1); }\n.user-avatar.avatar-tone-5 { --avatar-gradient: linear-gradient(135deg, #06b6d4, #0ea5e9); }\n.user-avatar.avatar-tone-6 { --avatar-gradient: linear-gradient(135deg, #eab308, #f59e0b); }\n.user-avatar.avatar-tone-7 { --avatar-gradient: linear-gradient(135deg, #ec4899, #f472b6); }\n.user-avatar.avatar-tone-8 { --avatar-gradient: linear-gradient(135deg, #14b8a6, #22d3ee); }\n\n.user-info {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.user-name {\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.user-email {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.user-presence {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $text-muted;\n  margin-top: 2px;\n\n  &.is-online {\n    color: $success;\n  }\n}\n\n.presence-icon {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: $gray-400;\n  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.08);\n}\n\n.user-presence.is-online .presence-icon {\n  background: $success;\n  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.08), 0 0 10px rgba($success, 0.6);\n  animation: status-glow 1.6s ease-in-out infinite;\n}\n\n.presence-dot {\n  position: absolute;\n  right: -3px;\n  bottom: -3px;\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  border: 2px solid rgba(white, 0.9);\n  background: #94a3b8;\n  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.08);\n\n  &.online {\n    background: $success;\n    box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.08), 0 0 10px rgba($success, 0.6);\n    animation: status-glow 1.6s ease-in-out infinite;\n  }\n}\n\n// Role Badges\n.role-badges {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-1;\n}\n\n.role-badge {\n  display: inline-flex;\n  padding: $space-1 $space-2;\n  font-size: $font-size-xs;\n  font-weight: 500;\n  background: rgba($purple, 0.1);\n  color: $purple;\n  border-radius: $radius-md;\n  border: 1px solid rgba($purple, 0.2);\n}\n\n.role-pill {\n  display: inline-flex;\n  align-items: center;\n  padding: $space-1 $space-3;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  background: rgba($primary, 0.12);\n  color: $primary;\n  border-radius: $radius-full;\n\n  &.muted {\n    background: rgba($gray-400, 0.15);\n    color: $text-muted;\n  }\n}\n\n.people-access-embed {\n  margin-top: $space-4;\n}\n\n.teams-panel {\n  margin-top: $space-4;\n  padding: $space-6;\n  background: rgba(white, 0.65);\n  border: 1px dashed rgba($primary, 0.25);\n  border-radius: $radius-xl;\n  text-align: center;\n}\n\n.teams-empty {\n  display: grid;\n  gap: $space-2;\n  justify-items: center;\n\n  h3 {\n    margin: 0;\n    font-size: $font-size-lg;\n    color: $text-primary;\n  }\n\n  p {\n    margin: 0;\n    max-width: 420px;\n    color: $text-muted;\n  }\n}\n\n.teams-icon {\n  width: 56px;\n  height: 56px;\n  border-radius: $radius-lg;\n  display: grid;\n  place-items: center;\n  background: rgba($primary, 0.12);\n  color: $primary;\n  font-size: 1.4rem;\n}\n\n// Login Date\n.login-date {\n  font-size: $font-size-sm;\n  color: $text-secondary;\n  display: block;\n}\n\n.login-duration {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  display: block;\n  margin-top: 2px;\n}\n\n.login-location {\n  font-size: $font-size-xs;\n  color: $text-secondary;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 4px;\n\n  i {\n    font-size: 0.75rem;\n    color: rgba($purple, 0.8);\n  }\n\n  &.location-muted {\n    color: $text-muted;\n\n    i {\n      color: rgba($text-muted, 0.8);\n    }\n  }\n}\n\n.login-never {\n  font-size: $font-size-sm;\n  color: $text-muted;\n  font-style: italic;\n}\n\n@keyframes online-pulse {\n  0%, 100% { transform: scale(0.95); opacity: 0.6; }\n  50% { transform: scale(1.05); opacity: 0.9; }\n}\n\n@keyframes status-glow {\n  0%, 100% { transform: scale(1); opacity: 0.8; }\n  50% { transform: scale(1.15); opacity: 1; }\n}\n\n// Status Badge\n.status-badge {\n  display: inline-flex;\n  padding: $space-1 $space-3;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n\n  &.badge-success {\n    background: rgba($success, 0.12);\n    color: $success;\n  }\n\n  &.badge-warning {\n    background: rgba($orange, 0.12);\n    color: $orange;\n  }\n}\n\n// Action Buttons\n.action-buttons {\n  display: flex;\n  justify-content: flex-end;\n  gap: $space-1;\n  pointer-events: auto;\n}\n\n// Loading Skeleton\n.loading-skeleton {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.skeleton-row {\n  height: 64px;\n  background: linear-gradient(90deg, rgba($glass-border, 0.3) 25%, rgba($glass-border, 0.5) 50%, rgba($glass-border, 0.3) 75%);\n  background-size: 200% 100%;\n  border-radius: $radius-lg;\n  animation: shimmer 1.5s infinite;\n}\n\n@keyframes shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n// Toast Notification\n.toast-notification {\n  position: fixed;\n  bottom: $space-8;\n  right: $space-8;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-4 $space-5;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border-radius: $radius-xl;\n  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);\n  z-index: $z-toast;\n  animation: toast-in 0.3s ease-out;\n\n  &.toast--success {\n    border: 1px solid rgba($success, 0.3);\n\n    i {\n      color: $success;\n    }\n  }\n\n  &.toast--error {\n    border: 1px solid rgba($danger, 0.3);\n\n    i {\n      color: $danger;\n    }\n  }\n\n  span {\n    font-size: $font-size-sm;\n    font-weight: 500;\n    color: $text-primary;\n  }\n}\n\n@keyframes toast-in {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.toast-close {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-md;\n  color: $text-muted;\n  cursor: pointer;\n  transition: all $transition-fast;\n\n  &:hover {\n    background: rgba($text-muted, 0.1);\n    color: $text-primary;\n  }\n}\n\n// Custom PrimeNG Overrides\n:host ::ng-deep {\n  .custom-select,\n  .custom-multiselect {\n    width: 100%;\n\n    .p-select,\n    .p-multiselect {\n      background: rgba(white, 0.6);\n      border: 1px solid $glass-border;\n      border-radius: $radius-lg;\n\n      &:hover {\n        border-color: rgba($primary, 0.3);\n      }\n\n      &.p-focus {\n        border-color: $primary;\n        box-shadow: 0 0 0 3px rgba($primary, 0.1);\n      }\n    }\n  }\n\n  .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {\n    background: $primary-gradient;\n  }\n\n  // PrimeNG button overrides for disabled state\n  .p-button:disabled,\n  .p-button.p-disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n    pointer-events: auto; // Allow cursor to show not-allowed\n  }\n\n  .btn-gradient.p-button:disabled,\n  .btn-glass.p-button:disabled {\n    &:hover {\n      transform: none;\n      box-shadow: none;\n    }\n  }\n\n  .people-access-embed {\n    .page-background {\n      padding: 0;\n      background: transparent;\n      overflow: visible;\n    }\n\n    .animated-orb,\n    app-breadcrumbs,\n    .page-hero,\n    .hero-section {\n      display: none;\n    }\n\n    .page-container,\n    .page-content {\n      padding: 0;\n      margin: 0;\n      background: transparent;\n    }\n\n    .hero-section,\n    .page-hero {\n      margin-top: 0;\n      padding-top: 0;\n    }\n  }\n}\n\n// Responsive\n@media (max-width: 900px) {\n  .page-hero {\n    flex-direction: column;\n    text-align: center;\n  }\n\n  .hero-subtitle {\n    max-width: none;\n  }\n\n  .metrics-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .people-command-bar {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .people-tabs {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .people-subtabs {\n    justify-content: center;\n  }\n}\n\n@media (max-width: 600px) {\n  .page-background {\n    padding: $space-4;\n  }\n\n  .metrics-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .data-table {\n    th, td {\n      padding: $space-3 $space-2;\n    }\n  }\n\n  // Stack filters and allow the table to scroll on narrow screens.\n  .table-toolbar {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .toolbar-search {\n    min-width: 100%;\n  }\n\n  .toolbar-filters {\n    width: 100%;\n  }\n\n  .filter-select {\n    min-width: 100%;\n  }\n\n  .data-table {\n    min-width: 760px;\n  }\n\n  .people-tabs {\n    grid-template-columns: 1fr;\n  }\n\n  .view-chip {\n    min-height: 44px;\n  }\n\n  .people-subtabs {\n    justify-content: flex-start;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SettingsPage, { className: "SettingsPage", filePath: "src/app/crm/features/settings/pages/settings.page.ts", lineNumber: 69 }); })();
