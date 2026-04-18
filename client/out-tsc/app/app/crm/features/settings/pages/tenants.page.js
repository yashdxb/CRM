import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { TenantAdminDataService } from '../services/tenant-admin-data.service';
import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { getTenantKey, setTenantKey } from '../../../../core/tenant/tenant.utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/accordion";
import * as i2 from "primeng/button";
import * as i3 from "primeng/checkbox";
import * as i4 from "primeng/inputgroup";
import * as i5 from "primeng/inputgroupaddon";
import * as i6 from "@angular/forms";
import * as i7 from "primeng/select";
import * as i8 from "primeng/skeleton";
import * as i9 from "primeng/tabs";
import * as i10 from "primeng/tag";
import * as i11 from "primeng/tooltip";
const _c0 = () => ({ class: "tc-sidebar-item" });
const _c1 = a0 => ({ root: a0 });
const _c2 = () => ["vertical-preset", "crm-modules", "helpdesk"];
const _c3 = () => ["realtime", "ai", "communications"];
const _c4 = () => ["auth", "report-designer"];
function TenantsPage_button_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "button", 31);
} }
function TenantsPage_ng_container_48_div_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64)(1, "div", 65);
    i0.ɵɵelement(2, "i", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 66)(4, "span", 67);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 68);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 69)(9, "span", 70);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 71);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const tenant_r3 = ctx.$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(tenant_r3.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(tenant_r3.key);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", tenant_r3.industryPreset || "CoreCRM", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 4, tenant_r3.createdAtUtc, "MMM d, y"));
} }
function TenantsPage_ng_container_48_div_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72);
    i0.ɵɵelement(1, "i", 73);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No tenants found");
    i0.ɵɵelementEnd()();
} }
function TenantsPage_ng_container_48_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 32)(2, "section", 33)(3, "article", 34)(4, "header", 35)(5, "div", 36);
    i0.ɵɵelement(6, "i", 26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div")(8, "h2", 37);
    i0.ɵɵtext(9, "Active tenant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 38);
    i0.ɵɵtext(11, "Switch the workspace used by this session.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "span", 39);
    i0.ɵɵelement(13, "span", 40);
    i0.ɵɵtext(14, " Live ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 41)(16, "label", 42);
    i0.ɵɵtext(17, "Select tenant");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "p-inputgroup")(19, "p-inputgroup-addon", 43);
    i0.ɵɵelement(20, "i", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "p-select", 44);
    i0.ɵɵlistener("ngModelChange", function TenantsPage_ng_container_48_Template_p_select_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onActiveTenantChange($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "button", 45);
    i0.ɵɵlistener("click", function TenantsPage_ng_container_48_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.applyActiveTenant()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "small", 46);
    i0.ɵɵtext(24, "Applies to the current browser session.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "article", 47)(26, "header", 35)(27, "div", 48);
    i0.ɵɵelement(28, "i", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "div")(30, "h2", 37);
    i0.ɵɵtext(31, "Industry packs");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(32, "div", 49)(33, "div", 50)(34, "div", 51)(35, "div", 52)(36, "div", 53);
    i0.ɵɵelement(37, "i", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "div", 54)(39, "h4");
    i0.ɵɵtext(40, "Core CRM");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(41, "p-tag", 55);
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(42, "section", 56)(43, "article", 57)(44, "header", 35)(45, "div", 58);
    i0.ɵɵelement(46, "i", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(47, "div")(48, "h2", 37);
    i0.ɵɵtext(49, "Tenant registry");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "p", 38);
    i0.ɵɵtext(51);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(52, "button", 60);
    i0.ɵɵlistener("click", function TenantsPage_ng_container_48_Template_button_click_52_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadTenants()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(53, "div", 61);
    i0.ɵɵtemplate(54, TenantsPage_ng_container_48_div_54_Template, 14, 7, "div", 62)(55, TenantsPage_ng_container_48_div_55_Template, 4, 0, "div", 63);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(21);
    i0.ɵɵproperty("options", ctx_r1.tenantOptions())("ngModel", ctx_r1.activeTenantKey());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.canManageTenants() || !ctx_r1.activeTenantKey());
    i0.ɵɵadvance(29);
    i0.ɵɵtextInterpolate1("", ctx_r1.totalTenants(), " registered workspaces");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.loading());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.tenants());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.tenants().length === 0);
} }
function TenantsPage_section_49_span_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 165);
    i0.ɵɵelement(1, "i", 26);
    i0.ɵɵtext(2, " In effect ");
    i0.ɵɵelementEnd();
} }
function TenantsPage_section_49_span_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 166);
    i0.ɵɵelement(1, "i", 167);
    i0.ɵɵtext(2, " Applying\u2026 ");
    i0.ɵɵelementEnd();
} }
function TenantsPage_section_49_ng_container_207_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 169);
    i0.ɵɵelement(1, "p-checkbox", 172);
    i0.ɵɵelementStart(2, "label", 173)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const opt_r5 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("inputId", opt_r5.inputId)("formControlName", opt_r5.controlName)("binary", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("for", opt_r5.inputId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(opt_r5.label);
} }
function TenantsPage_section_49_ng_container_207_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, TenantsPage_section_49_ng_container_207_div_1_Template, 5, 5, "div", 168);
    i0.ɵɵelementStart(2, "div", 169);
    i0.ɵɵelement(3, "p-checkbox", 170);
    i0.ɵɵelementStart(4, "label", 171)(5, "strong");
    i0.ɵɵtext(6, "Status notification emails");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.emailDeliveryOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("binary", true);
} }
function TenantsPage_section_49_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 74)(1, "h2", 75);
    i0.ɵɵelement(2, "i", 76);
    i0.ɵɵtext(3, " Platform Configuration ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "form", 77);
    i0.ɵɵlistener("ngSubmit", function TenantsPage_section_49_Template_form_ngSubmit_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveFeatureFlags()); });
    i0.ɵɵelementStart(5, "p-tabs", 78);
    i0.ɵɵlistener("valueChange", function TenantsPage_section_49_Template_p_tabs_valueChange_5_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onConfigTabChange($event)); });
    i0.ɵɵelementStart(6, "div", 79)(7, "p-tablist", 80)(8, "p-tab", 81);
    i0.ɵɵelement(9, "i", 82);
    i0.ɵɵelementStart(10, "span", 83);
    i0.ɵɵtext(11, "Modules");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "p-tab", 84);
    i0.ɵɵelement(13, "i", 85);
    i0.ɵɵelementStart(14, "span", 83);
    i0.ɵɵtext(15, "Features");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "p-tab", 86);
    i0.ɵɵelement(17, "i", 87);
    i0.ɵɵelementStart(18, "span", 83);
    i0.ɵɵtext(19, "Security");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "p-tabpanels", 88)(21, "p-tabpanel", 89)(22, "p-accordion", 90)(23, "p-accordion-panel", 91)(24, "p-accordion-header")(25, "div", 92)(26, "div", 93);
    i0.ɵɵelement(27, "i", 94);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 95)(29, "span", 96);
    i0.ɵɵtext(30, "CRM Vertical Preset");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "span", 97);
    i0.ɵɵtext(32, "Language, catalogs, reports & workflow defaults");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(33, "p-accordion-content")(34, "div", 98)(35, "div", 99)(36, "label", 100);
    i0.ɵɵtext(37, "Preset");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(38, "p-select", 101);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "small", 102);
    i0.ɵɵtext(40, "Use Core CRM for standard sales workflows. Use Real Estate Brokerage for realtor and brokerage CRM operations.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "div", 103)(42, "button", 104);
    i0.ɵɵlistener("click", function TenantsPage_section_49_Template_button_click_42_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.applyVerticalPreset(false)); });
    i0.ɵɵelementStart(43, "span", 105);
    i0.ɵɵelement(44, "i", 106);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "span");
    i0.ɵɵtext(46, "Apply Preset");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(47, "button", 107);
    i0.ɵɵlistener("click", function TenantsPage_section_49_Template_button_click_47_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.applyVerticalPreset(true)); });
    i0.ɵɵelementStart(48, "span", 105);
    i0.ɵɵelement(49, "i", 108);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "span");
    i0.ɵɵtext(51, "Reset to Preset");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(52, TenantsPage_section_49_span_52_Template, 3, 0, "span", 109)(53, TenantsPage_section_49_span_53_Template, 3, 0, "span", 110);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(54, "p-accordion-panel", 111)(55, "p-accordion-header")(56, "div", 92)(57, "div", 93);
    i0.ɵɵelement(58, "i", 112);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "div", 95)(60, "span", 96);
    i0.ɵɵtext(61, "CRM Modules");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "span", 97);
    i0.ɵɵtext(63, "Enable or disable optional CRM modules");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(64, "p-accordion-content")(65, "div", 113)(66, "div", 114);
    i0.ɵɵelement(67, "p-checkbox", 115);
    i0.ɵɵelementStart(68, "label", 116)(69, "strong");
    i0.ɵɵtext(70, "Properties");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "span");
    i0.ɵɵtext(72, "Property management module");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(73, "div", 114);
    i0.ɵɵelement(74, "p-checkbox", 117);
    i0.ɵɵelementStart(75, "label", 118)(76, "strong");
    i0.ɵɵtext(77, "Marketing Campaigns");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(78, "span");
    i0.ɵɵtext(79, "Campaign planning and execution");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(80, "p-accordion-panel", 119)(81, "p-accordion-header")(82, "div", 92)(83, "div", 120);
    i0.ɵɵelement(84, "i", 121);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(85, "div", 95)(86, "span", 96);
    i0.ɵɵtext(87, "Help Desk");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(88, "span", 97);
    i0.ɵɵtext(89, "Configure help desk and support features");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(90, "p-accordion-content")(91, "div", 113)(92, "div", 114);
    i0.ɵɵelement(93, "p-checkbox", 122);
    i0.ɵɵelementStart(94, "label", 123)(95, "strong");
    i0.ɵɵtext(96, "Help Desk Cases");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(97, "span");
    i0.ɵɵtext(98, "Enable support case management");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(99, "div", 114);
    i0.ɵɵelement(100, "p-checkbox", 124);
    i0.ɵɵelementStart(101, "label", 125)(102, "strong");
    i0.ɵɵtext(103, "Email Intake");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(104, "span");
    i0.ɵɵtext(105, "Auto-create cases from inbound email");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(106, "div", 114);
    i0.ɵɵelement(107, "p-checkbox", 126);
    i0.ɵɵelementStart(108, "label", 127)(109, "strong");
    i0.ɵɵtext(110, "Realtime Help Desk");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(111, "span");
    i0.ɵɵtext(112, "Live updates for case activity");
    i0.ɵɵelementEnd()()()()()()()();
    i0.ɵɵelementStart(113, "p-tabpanel", 128)(114, "p-accordion", 90)(115, "p-accordion-panel", 129)(116, "p-accordion-header")(117, "div", 92)(118, "div", 130);
    i0.ɵɵelement(119, "i", 131);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(120, "div", 95)(121, "span", 96);
    i0.ɵɵtext(122, "Realtime");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(123, "span", 97);
    i0.ɵɵtext(124, "Control SignalR-powered live features");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(125, "p-accordion-content")(126, "div", 113)(127, "div", 114);
    i0.ɵɵelement(128, "p-checkbox", 132);
    i0.ɵɵelementStart(129, "label", 133)(130, "strong");
    i0.ɵɵtext(131, "Dashboard");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(132, "span");
    i0.ɵɵtext(133, "Live dashboard updates");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(134, "div", 114);
    i0.ɵɵelement(135, "p-checkbox", 134);
    i0.ɵɵelementStart(136, "label", 135)(137, "strong");
    i0.ɵɵtext(138, "Pipeline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(139, "span");
    i0.ɵɵtext(140, "Live pipeline / kanban refresh");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(141, "div", 114);
    i0.ɵɵelement(142, "p-checkbox", 136);
    i0.ɵɵelementStart(143, "label", 137)(144, "strong");
    i0.ɵɵtext(145, "Entity CRUD");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(146, "span");
    i0.ɵɵtext(147, "Broadcast create/update/delete events");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(148, "div", 114);
    i0.ɵɵelement(149, "p-checkbox", 138);
    i0.ɵɵelementStart(150, "label", 139)(151, "strong");
    i0.ɵɵtext(152, "Import Progress");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(153, "span");
    i0.ɵɵtext(154, "Live import status tracking");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(155, "div", 114);
    i0.ɵɵelement(156, "p-checkbox", 140);
    i0.ɵɵelementStart(157, "label", 141)(158, "strong");
    i0.ɵɵtext(159, "Record Presence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(160, "span");
    i0.ɵɵtext(161, "See who else is viewing a record");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(162, "div", 114);
    i0.ɵɵelement(163, "p-checkbox", 142);
    i0.ɵɵelementStart(164, "label", 143)(165, "strong");
    i0.ɵɵtext(166, "Assistant Streaming");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(167, "span");
    i0.ɵɵtext(168, "Live AI assistant response streaming");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(169, "p-accordion-panel", 144)(170, "p-accordion-header")(171, "div", 92)(172, "div", 145);
    i0.ɵɵelement(173, "i", 106);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(174, "div", 95)(175, "span", 96);
    i0.ɵɵtext(176, "AI");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(177, "span", 97);
    i0.ɵɵtext(178, "Artificial intelligence features");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(179, "p-accordion-content")(180, "div", 113)(181, "div", 114);
    i0.ɵɵelement(182, "p-checkbox", 146);
    i0.ɵɵelementStart(183, "label", 147)(184, "strong");
    i0.ɵɵtext(185, "Knowledge Search");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(186, "span");
    i0.ɵɵtext(187, "AI-powered knowledge base queries");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(188, "p-accordion-panel", 148)(189, "p-accordion-header")(190, "div", 92)(191, "div", 93);
    i0.ɵɵelement(192, "i", 149);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(193, "div", 95)(194, "span", 96);
    i0.ɵɵtext(195, "Communications");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(196, "span", 97);
    i0.ɵɵtext(197, "Email delivery and notification channels");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(198, "p-accordion-content")(199, "div", 113)(200, "div", 114);
    i0.ɵɵelement(201, "p-checkbox", 150);
    i0.ɵɵelementStart(202, "label", 151)(203, "strong");
    i0.ɵɵtext(204, "Email Delivery");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(205, "span");
    i0.ɵɵtext(206, "Master toggle for outbound email");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(207, TenantsPage_section_49_ng_container_207_Template, 7, 2, "ng-container", 152);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(208, "p-tabpanel", 153)(209, "p-accordion", 90)(210, "p-accordion-panel", 154)(211, "p-accordion-header")(212, "div", 92)(213, "div", 120);
    i0.ɵɵelement(214, "i", 155);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(215, "div", 95)(216, "span", 96);
    i0.ɵɵtext(217, "Enterprise Authentication");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(218, "span", 97);
    i0.ɵɵtext(219, "SSO and identity provider settings");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(220, "p-accordion-content")(221, "div", 113)(222, "div", 114);
    i0.ɵɵelement(223, "p-checkbox", 156);
    i0.ɵɵelementStart(224, "label", 157)(225, "strong");
    i0.ɵɵtext(226, "Microsoft Entra ID");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(227, "span");
    i0.ɵɵtext(228, "Enable Azure AD / Entra SSO login");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(229, "p-accordion-panel", 158)(230, "p-accordion-header")(231, "div", 92)(232, "div", 145);
    i0.ɵɵelement(233, "i", 159);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(234, "div", 95)(235, "span", 96);
    i0.ɵɵtext(236, "Report Designer Access");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(237, "span", 97);
    i0.ɵɵtext(238, "Permission required for report designer");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(239, "p-accordion-content")(240, "div", 113)(241, "div", 99)(242, "label", 160);
    i0.ɵɵtext(243, "Minimum permission");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(244, "p-select", 161);
    i0.ɵɵelementEnd()()()()()()()()();
    i0.ɵɵelementStart(245, "div", 162)(246, "button", 163)(247, "span", 105);
    i0.ɵɵelement(248, "i", 164);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(249, "span");
    i0.ɵɵtext(250);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("formGroup", ctx_r1.flagsForm);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.activeConfigTab());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("pt", i0.ɵɵpureFunction1(35, _c1, i0.ɵɵpureFunction0(34, _c0)));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pt", i0.ɵɵpureFunction1(38, _c1, i0.ɵɵpureFunction0(37, _c0)));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pt", i0.ɵɵpureFunction1(41, _c1, i0.ɵɵpureFunction0(40, _c0)));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("multiple", true)("value", i0.ɵɵpureFunction0(43, _c2));
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("options", ctx_r1.verticalPresetOptions);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.presetApplying());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r1.presetApplying());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r1.presetApplied() && !ctx_r1.presetApplying());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.presetApplying());
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("multiple", true)("value", i0.ɵɵpureFunction0(44, _c3));
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r1.emailDeliveryEnabled());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("multiple", true)("value", i0.ɵɵpureFunction0(45, _c4));
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("binary", true);
    i0.ɵɵadvance(21);
    i0.ɵɵproperty("options", ctx_r1.reportDesignerPermissionOptions);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.savingFlags());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.savingFlags() ? "Saving\u2026" : "Save Configuration");
} }
function TenantsPage_ng_template_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 174)(1, "div", 175);
    i0.ɵɵelement(2, "p-skeleton", 176)(3, "p-skeleton", 177)(4, "p-skeleton", 178);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 179)(6, "div", 175);
    i0.ɵɵelement(7, "p-skeleton", 180);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 175);
    i0.ɵɵelement(9, "p-skeleton", 180);
    i0.ɵɵelementEnd()()();
} }
export class TenantsPage {
    fb = inject(FormBuilder);
    dataService = inject(TenantAdminDataService);
    settingsService = inject(WorkspaceSettingsService);
    toastService = inject(AppToastService);
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    tenants = signal([], ...(ngDevMode ? [{ debugName: "tenants" }] : []));
    activeTenantKey = signal(getTenantKey(), ...(ngDevMode ? [{ debugName: "activeTenantKey" }] : []));
    tenantOptions = computed(() => this.tenants().map((tenant) => ({
        label: `${tenant.name} (${tenant.key})`,
        value: tenant.key
    })), ...(ngDevMode ? [{ debugName: "tenantOptions" }] : []));
    activeTenant = computed(() => this.tenants().find((tenant) => tenant.key === this.activeTenantKey()) ?? null, ...(ngDevMode ? [{ debugName: "activeTenant" }] : []));
    canManageTenants = signal(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.tenantsManage), ...(ngDevMode ? [{ debugName: "canManageTenants" }] : []));
    totalTenants = computed(() => this.tenants().length, ...(ngDevMode ? [{ debugName: "totalTenants" }] : []));
    /** Cached current workspace settings so feature-flag saves include required fields. */
    currentSettings = signal(null, ...(ngDevMode ? [{ debugName: "currentSettings" }] : []));
    /* ── Feature-flag config tab ── */
    activeConfigTab = signal('modules', ...(ngDevMode ? [{ debugName: "activeConfigTab" }] : []));
    savingFlags = signal(false, ...(ngDevMode ? [{ debugName: "savingFlags" }] : []));
    /* ── Vertical preset ── */
    verticalPresetOptions = [
        { label: 'Core CRM', value: 'CoreCRM' },
        { label: 'Real Estate Brokerage', value: 'RealEstateBrokerage' }
    ];
    activeVerticalPresetConfiguration = signal(null, ...(ngDevMode ? [{ debugName: "activeVerticalPresetConfiguration" }] : []));
    presetApplying = signal(false, ...(ngDevMode ? [{ debugName: "presetApplying" }] : []));
    presetApplied = computed(() => !!this.activeVerticalPresetConfiguration(), ...(ngDevMode ? [{ debugName: "presetApplied" }] : []));
    flagsForm = this.fb.group({
        industryPreset: ['CoreCRM'],
        featureProperties: [false],
        featureMarketingCampaigns: [false],
        featureHelpDeskCases: [false],
        featureHelpDeskEmailIntake: [false],
        featureHelpDeskRealtime: [false],
        featureRealtimeDashboard: [false],
        featureRealtimePipeline: [false],
        featureRealtimeEntityCrud: [false],
        featureRealtimeImportProgress: [false],
        featureRealtimeRecordPresence: [false],
        featureRealtimeAssistantStreaming: [false],
        featureAiKnowledgeSearch: [true],
        featureEmailDelivery: [false],
        featureEmailDeliveryInvites: [false],
        featureEmailDeliverySecurity: [false],
        featureEmailDeliveryApprovals: [false],
        featureEmailDeliveryProposals: [false],
        featureEmailDeliveryMarketing: [false],
        featureEmailDeliveryNotifications: [false],
        featureEmailDeliveryMailbox: [false],
        featureEmailDeliveryStatusNotifications: [false],
        featureAuthEntra: [false],
        reportDesignerRequiredPermission: ['Permissions.Administration.Manage']
    });
    emailDeliveryEnabled = computed(() => !!this.flagsForm.get('featureEmailDelivery')?.value, ...(ngDevMode ? [{ debugName: "emailDeliveryEnabled" }] : []));
    emailDeliveryOptions = [
        { controlName: 'featureEmailDeliveryInvites', inputId: 'tc-email-invites', label: 'Invite emails' },
        { controlName: 'featureEmailDeliverySecurity', inputId: 'tc-email-security', label: 'Password & security emails' },
        { controlName: 'featureEmailDeliveryApprovals', inputId: 'tc-email-approvals', label: 'Approval & workflow emails' },
        { controlName: 'featureEmailDeliveryProposals', inputId: 'tc-email-proposals', label: 'Proposal & quote emails' },
        { controlName: 'featureEmailDeliveryMarketing', inputId: 'tc-email-marketing', label: 'Marketing campaign emails' },
        { controlName: 'featureEmailDeliveryNotifications', inputId: 'tc-email-notifications', label: 'Alert & notification emails' },
        { controlName: 'featureEmailDeliveryMailbox', inputId: 'tc-email-mailbox', label: 'Mailbox & manual send actions' }
    ];
    reportDesignerPermissionOptions = [
        { label: 'Admins Only (Administration Manage)', value: 'Permissions.Administration.Manage' },
        { label: 'Reports Design Permission', value: 'Permissions.Reports.Design' },
        { label: 'Reports Manage Permission', value: 'Permissions.Reports.Manage' },
        { label: 'Reports View Permission', value: 'Permissions.Reports.View' }
    ];
    constructor() {
        this.loadTenants();
        this.loadFeatureFlags();
        // Toggle child email delivery flags when parent is toggled off
        this.flagsForm.get('featureEmailDelivery')?.valueChanges.subscribe((enabled) => {
            if (!enabled) {
                for (const opt of this.emailDeliveryOptions) {
                    this.flagsForm.get(opt.controlName)?.setValue(false, { emitEvent: false });
                }
                this.flagsForm.get('featureEmailDeliveryStatusNotifications')?.setValue(false, { emitEvent: false });
            }
        });
    }
    onConfigTabChange(tab) {
        if (typeof tab === 'string') {
            this.activeConfigTab.set(tab);
        }
    }
    loadTenants() {
        this.loading.set(true);
        this.dataService.listTenants().subscribe({
            next: (tenants) => {
                this.tenants.set(tenants);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.raiseToast('error', 'Unable to load tenants');
            }
        });
    }
    clearToast() {
        this.toastService.clear();
    }
    applyActiveTenant() {
        const key = this.activeTenantKey();
        if (!key) {
            return;
        }
        setTenantKey(key);
        this.raiseToast('success', `Active tenant set to ${key}`);
        if (typeof window !== 'undefined') {
            setTimeout(() => window.location.reload(), 400);
        }
    }
    onActiveTenantChange(key) {
        this.activeTenantKey.set(key);
    }
    /* ── Feature flags ── */
    loadFeatureFlags() {
        this.settingsService.getSettings().subscribe({
            next: (settings) => {
                this.currentSettings.set(settings);
                this.applyFeatureSettings(settings);
            },
            error: () => { }
        });
    }
    applyFeatureSettings(settings) {
        const ff = settings.featureFlags ?? {};
        this.activeVerticalPresetConfiguration.set(settings.verticalPresetConfiguration ?? null);
        this.flagsForm.patchValue({
            industryPreset: settings.industryPreset || settings.verticalPresetConfiguration?.presetId || 'CoreCRM',
            featureProperties: !!ff['properties'],
            featureMarketingCampaigns: !!ff['marketing.campaigns'],
            featureHelpDeskCases: !!ff['helpdesk.cases'],
            featureHelpDeskEmailIntake: !!ff['helpdesk.emailIntake'],
            featureHelpDeskRealtime: !!ff['helpdesk.realtime'],
            featureRealtimeDashboard: !!ff['realtime.dashboard'],
            featureRealtimePipeline: !!ff['realtime.pipeline'],
            featureRealtimeEntityCrud: !!ff['realtime.entityCrud'],
            featureRealtimeImportProgress: !!ff['realtime.importProgress'],
            featureRealtimeRecordPresence: !!ff['realtime.recordPresence'],
            featureRealtimeAssistantStreaming: !!ff['realtime.assistantStreaming'],
            featureAiKnowledgeSearch: ff['ai.knowledgeSearch'] !== false,
            featureEmailDelivery: !!ff['communications.emailDelivery'],
            featureEmailDeliveryInvites: !!ff['communications.emailDelivery.invites'],
            featureEmailDeliverySecurity: !!ff['communications.emailDelivery.security'],
            featureEmailDeliveryApprovals: !!ff['communications.emailDelivery.approvals'],
            featureEmailDeliveryProposals: !!ff['communications.emailDelivery.proposals'],
            featureEmailDeliveryMarketing: !!ff['communications.emailDelivery.marketing'],
            featureEmailDeliveryNotifications: !!ff['communications.emailDelivery.notifications'],
            featureEmailDeliveryMailbox: !!ff['communications.emailDelivery.mailbox'],
            featureEmailDeliveryStatusNotifications: !!ff['communications.emailDelivery.statusNotifications'],
            featureAuthEntra: !!ff['auth.entra'],
            reportDesignerRequiredPermission: settings.reportDesignerRequiredPermission || 'Permissions.Administration.Manage'
        });
    }
    saveFeatureFlags() {
        const p = this.flagsForm.getRawValue();
        const featureFlags = {
            properties: !!p.featureProperties,
            'marketing.campaigns': !!p.featureMarketingCampaigns,
            'helpdesk.cases': !!p.featureHelpDeskCases,
            'helpdesk.emailIntake': !!p.featureHelpDeskEmailIntake,
            'helpdesk.realtime': !!p.featureHelpDeskRealtime,
            'realtime.dashboard': !!p.featureRealtimeDashboard,
            'realtime.pipeline': !!p.featureRealtimePipeline,
            'realtime.entityCrud': !!p.featureRealtimeEntityCrud,
            'realtime.importProgress': !!p.featureRealtimeImportProgress,
            'realtime.recordPresence': !!p.featureRealtimeRecordPresence,
            'realtime.assistantStreaming': !!p.featureRealtimeAssistantStreaming,
            'ai.knowledgeSearch': !!p.featureAiKnowledgeSearch,
            'communications.emailDelivery': !!p.featureEmailDelivery,
            'communications.emailDelivery.invites': !!p.featureEmailDeliveryInvites,
            'communications.emailDelivery.security': !!p.featureEmailDeliverySecurity,
            'communications.emailDelivery.approvals': !!p.featureEmailDeliveryApprovals,
            'communications.emailDelivery.proposals': !!p.featureEmailDeliveryProposals,
            'communications.emailDelivery.marketing': !!p.featureEmailDeliveryMarketing,
            'communications.emailDelivery.notifications': !!p.featureEmailDeliveryNotifications,
            'communications.emailDelivery.mailbox': !!p.featureEmailDeliveryMailbox,
            'communications.emailDelivery.statusNotifications': !!p.featureEmailDeliveryStatusNotifications,
            'auth.entra': !!p.featureAuthEntra
        };
        this.savingFlags.set(true);
        const current = this.currentSettings();
        this.settingsService.updateSettings({
            name: current?.name ?? '',
            timeZone: current?.timeZone ?? '',
            currency: current?.currency ?? '',
            featureFlags,
            reportDesignerRequiredPermission: p.reportDesignerRequiredPermission || null
        }).subscribe({
            next: (settings) => {
                this.savingFlags.set(false);
                this.currentSettings.set(settings);
                this.applyFeatureSettings(settings);
                this.raiseToast('success', 'Feature flags saved');
            },
            error: () => {
                this.savingFlags.set(false);
                this.raiseToast('error', 'Unable to save feature flags');
            }
        });
    }
    /* ── Vertical preset ── */
    applyVerticalPreset(resetExisting) {
        const presetId = this.flagsForm.getRawValue().industryPreset || 'CoreCRM';
        this.presetApplying.set(true);
        this.settingsService.applyVerticalPreset({ presetId, resetExisting }).subscribe({
            next: (settings) => {
                this.presetApplying.set(false);
                this.applyFeatureSettings(settings);
                this.raiseToast('success', resetExisting ? 'Vertical preset reset and applied.' : 'Vertical preset applied.');
            },
            error: () => {
                this.presetApplying.set(false);
                this.raiseToast('error', 'Unable to apply vertical preset.');
            }
        });
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    static ɵfac = function TenantsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TenantsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TenantsPage, selectors: [["app-tenants-page"]], decls: 52, vars: 7, consts: [["loadingState", ""], [1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "page-container"], [1, "page-content", "tenant-page"], [1, "page-hero"], [1, "hero-content"], [1, "hero-eyebrow"], [1, "pi", "pi-shield"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-subtitle"], [1, "hero-actions"], ["type", "button", "pButton", "", "icon", "pi pi-arrow-left", "label", "Back to Settings", "routerLink", "/app/settings", 1, "crm-button", "crm-button--ghost"], ["type", "button", "pButton", "", "icon", "pi pi-sliders-h", "label", "Workspace Settings", "routerLink", "/app/settings/workspace", 1, "crm-button", "crm-button--ghost"], ["type", "button", "pButton", "", "class", "crm-button crm-button--primary", "icon", "pi pi-plus", "label", "Create tenant", "routerLink", "/app/settings/tenants/new", 4, "ngIf"], [1, "tenant-metrics"], [1, "metric-card"], [1, "metric-icon", "metric-icon--primary"], [1, "pi", "pi-building"], [1, "metric-value"], [1, "metric-label"], [1, "metric-icon", "metric-icon--success"], [1, "pi", "pi-check-circle"], [1, "metric-icon", "metric-icon--purple"], [1, "pi", "pi-sitemap"], [4, "ngIf", "ngIfElse"], ["class", "config-section", 4, "ngIf"], ["type", "button", "pButton", "", "icon", "pi pi-plus", "label", "Create tenant", "routerLink", "/app/settings/tenants/new", 1, "crm-button", "crm-button--primary"], [1, "tenant-layout"], [1, "tenant-controls"], [1, "glass-card", "active-tenant-card"], [1, "card-header"], [1, "card-header-icon", "card-header-icon--success"], [1, "card-title"], [1, "card-subtitle"], [1, "live-badge"], [1, "live-dot"], [1, "active-tenant-selector"], [1, "form-label"], [1, "addon--primary"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Select tenant", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["type", "button", "pButton", "", "icon", "pi pi-check", "label", "Set active tenant", 1, "crm-button", "crm-button--primary", "activate-btn", 3, "click", "disabled"], [1, "form-hint"], [1, "glass-card", "industry-config-card"], [1, "card-header-icon", "card-header-icon--purple"], [1, "industry-config-content"], [1, "industry-pack-grid"], [1, "pack-card", "pack-card--core"], [1, "pack-header"], [1, "pack-icon", "pack-icon--core"], [1, "pack-meta"], ["value", "Always on", "severity", "success"], [1, "tenant-registry"], [1, "glass-card", "registry-card"], [1, "card-header-icon", "card-header-icon--orange"], [1, "pi", "pi-list"], ["type", "button", "pButton", "", "icon", "pi pi-refresh", "pTooltip", "Reload", 1, "p-button-text", "p-button-sm", 3, "click", "disabled"], [1, "tenant-list"], ["class", "tenant-item", 4, "ngFor", "ngForOf"], ["class", "tenant-list-empty", 4, "ngIf"], [1, "tenant-item"], [1, "tenant-item-avatar"], [1, "tenant-item-info"], [1, "tenant-item-name"], [1, "tenant-item-key"], [1, "tenant-item-meta"], [1, "tenant-item-preset", "preset--core"], [1, "tenant-item-date"], [1, "tenant-list-empty"], [1, "pi", "pi-inbox"], [1, "config-section"], [1, "config-section-title"], [1, "pi", "pi-sliders-h"], [3, "ngSubmit", "formGroup"], [1, "tc-sidebar-tabs", 3, "valueChange", "value"], [1, "tc-sidebar-layout"], [1, "tc-sidebar-nav"], ["value", "modules", 3, "pt"], [1, "pi", "pi-th-large"], [1, "tc-sidebar-label"], ["value", "features", 3, "pt"], [1, "pi", "pi-bolt"], ["value", "security", 3, "pt"], [1, "pi", "pi-lock"], [1, "tc-sidebar-content"], ["value", "modules"], [1, "tc-config-accordion", 3, "multiple", "value"], ["value", "vertical-preset"], [1, "acc-header"], [1, "acc-header__icon", "acc-header__icon--primary"], [1, "pi", "pi-compass"], [1, "acc-header__text"], [1, "acc-header__title"], [1, "acc-header__subtitle"], [1, "preset-body"], [1, "form-field"], ["for", "tc-industryPreset"], ["inputId", "tc-industryPreset", "formControlName", "industryPreset", "optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", 3, "options"], [1, "field-hint"], [1, "preset-actions"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "action-btn__icon"], [1, "pi", "pi-sparkles"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click", "disabled"], [1, "pi", "pi-refresh"], ["class", "preset-status", 4, "ngIf"], ["class", "preset-status preset-status--applying", 4, "ngIf"], ["value", "crm-modules"], [1, "pi", "pi-box"], [1, "flag-grid"], [1, "flag-item"], ["inputId", "tc-properties", "formControlName", "featureProperties", 3, "binary"], ["for", "tc-properties", 1, "flag-label"], ["inputId", "tc-marketing", "formControlName", "featureMarketingCampaigns", 3, "binary"], ["for", "tc-marketing", 1, "flag-label"], ["value", "helpdesk"], [1, "acc-header__icon", "acc-header__icon--orange"], [1, "pi", "pi-headphones"], ["inputId", "tc-hd-cases", "formControlName", "featureHelpDeskCases", 3, "binary"], ["for", "tc-hd-cases", 1, "flag-label"], ["inputId", "tc-hd-email", "formControlName", "featureHelpDeskEmailIntake", 3, "binary"], ["for", "tc-hd-email", 1, "flag-label"], ["inputId", "tc-hd-realtime", "formControlName", "featureHelpDeskRealtime", 3, "binary"], ["for", "tc-hd-realtime", 1, "flag-label"], ["value", "features"], ["value", "realtime"], [1, "acc-header__icon", "acc-header__icon--success"], [1, "pi", "pi-wifi"], ["inputId", "tc-rt-dashboard", "formControlName", "featureRealtimeDashboard", 3, "binary"], ["for", "tc-rt-dashboard", 1, "flag-label"], ["inputId", "tc-rt-pipeline", "formControlName", "featureRealtimePipeline", 3, "binary"], ["for", "tc-rt-pipeline", 1, "flag-label"], ["inputId", "tc-rt-crud", "formControlName", "featureRealtimeEntityCrud", 3, "binary"], ["for", "tc-rt-crud", 1, "flag-label"], ["inputId", "tc-rt-import", "formControlName", "featureRealtimeImportProgress", 3, "binary"], ["for", "tc-rt-import", 1, "flag-label"], ["inputId", "tc-rt-presence", "formControlName", "featureRealtimeRecordPresence", 3, "binary"], ["for", "tc-rt-presence", 1, "flag-label"], ["inputId", "tc-rt-assistant", "formControlName", "featureRealtimeAssistantStreaming", 3, "binary"], ["for", "tc-rt-assistant", 1, "flag-label"], ["value", "ai"], [1, "acc-header__icon", "acc-header__icon--purple"], ["inputId", "tc-ai-knowledge", "formControlName", "featureAiKnowledgeSearch", 3, "binary"], ["for", "tc-ai-knowledge", 1, "flag-label"], ["value", "communications"], [1, "pi", "pi-envelope"], ["inputId", "tc-email-delivery", "formControlName", "featureEmailDelivery", 3, "binary"], ["for", "tc-email-delivery", 1, "flag-label"], [4, "ngIf"], ["value", "security"], ["value", "auth"], [1, "pi", "pi-microsoft"], ["inputId", "tc-auth-entra", "formControlName", "featureAuthEntra", 3, "binary"], ["for", "tc-auth-entra", 1, "flag-label"], ["value", "report-designer"], [1, "pi", "pi-file-edit"], ["for", "tc-report-perm"], ["id", "tc-report-perm", "optionLabel", "label", "optionValue", "value", "formControlName", "reportDesignerRequiredPermission", "placeholder", "Select permission", "appendTo", "body", 1, "w-full", 3, "options"], [1, "config-actions"], ["type", "submit", 1, "action-btn", "action-btn--add", 3, "disabled"], [1, "pi", "pi-save"], [1, "preset-status"], [1, "preset-status", "preset-status--applying"], [1, "pi", "pi-spinner", "pi-spin"], ["class", "flag-item flag-item--child", 4, "ngFor", "ngForOf"], [1, "flag-item", "flag-item--child"], ["inputId", "tc-email-status", "formControlName", "featureEmailDeliveryStatusNotifications", 3, "binary"], ["for", "tc-email-status", 1, "flag-label"], [3, "inputId", "formControlName", "binary"], [1, "flag-label", 3, "for"], [1, "loading-grid"], [1, "glass-card"], ["height", "48px", "styleClass", "mb-4"], ["height", "200px", "styleClass", "mb-3"], ["height", "200px"], [1, "sidebar-cards"], ["height", "150px"]], template: function TenantsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵelement(1, "div", 2)(2, "div", 3)(3, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 5)(5, "div", 6);
            i0.ɵɵelement(6, "app-breadcrumbs");
            i0.ɵɵelementStart(7, "header", 7)(8, "div", 8)(9, "span", 9);
            i0.ɵɵelement(10, "i", 10);
            i0.ɵɵtext(11, " Super Admin ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "h1", 11)(13, "span", 12);
            i0.ɵɵtext(14, "Tenant");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 13);
            i0.ɵɵtext(16, "Configuration");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 14);
            i0.ɵɵtext(18, "Set active workspaces, manage Industry Packs, and review tenants in one place.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 15);
            i0.ɵɵelement(20, "button", 16)(21, "button", 17);
            i0.ɵɵtemplate(22, TenantsPage_button_22_Template, 1, 0, "button", 18);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "div", 19)(24, "div", 20)(25, "div", 21);
            i0.ɵɵelement(26, "i", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div")(28, "span", 23);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "span", 24);
            i0.ɵɵtext(31, "Total tenants");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(32, "div", 20)(33, "div", 25);
            i0.ɵɵelement(34, "i", 26);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div")(36, "span", 23);
            i0.ɵɵtext(37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "span", 24);
            i0.ɵɵtext(39, "Active tenant");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(40, "div", 20)(41, "div", 27);
            i0.ɵɵelement(42, "i", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div")(44, "span", 23);
            i0.ɵɵtext(45);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "span", 24);
            i0.ɵɵtext(47, "CRM preset");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(48, TenantsPage_ng_container_48_Template, 56, 7, "ng-container", 29)(49, TenantsPage_section_49_Template, 251, 46, "section", 30)(50, TenantsPage_ng_template_50_Template, 10, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            let tmp_3_0;
            let tmp_4_0;
            const loadingState_r6 = i0.ɵɵreference(51);
            i0.ɵɵadvance(22);
            i0.ɵɵproperty("ngIf", ctx.canManageTenants());
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.totalTenants());
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(((tmp_3_0 = ctx.activeTenant()) == null ? null : tmp_3_0.name) || "\u2014");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(((tmp_4_0 = ctx.activeTenant()) == null ? null : tmp_4_0.industryPreset) || "CoreCRM");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", !ctx.loading())("ngIfElse", loadingState_r6);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading());
        } }, dependencies: [AccordionModule, i1.Accordion, i1.AccordionPanel, i1.AccordionHeader, i1.AccordionContent, ButtonModule, i2.ButtonDirective, CheckboxModule, i3.Checkbox, InputGroupModule, i4.InputGroup, InputGroupAddonModule, i5.InputGroupAddon, ReactiveFormsModule, i6.ɵNgNoValidate, i6.NgControlStatus, i6.NgControlStatusGroup, i6.FormGroupDirective, i6.FormControlName, SelectModule, i7.Select, SkeletonModule, i8.Skeleton, TabsModule, i9.Tabs, i9.TabPanels, i9.TabPanel, i9.TabList, i9.Tab, TagModule, i10.Tag, TooltipModule, i11.Tooltip, NgFor,
            NgIf,
            FormsModule, i6.NgModel, RouterLink,
            BreadcrumbsComponent,
            DatePipe], styles: ["//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   TENANT[_ngcontent-%COMP%]   MANAGEMENT[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   Premium[_ngcontent-%COMP%]   Design[_ngcontent-%COMP%]   System\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use[_ngcontent-%COMP%]   '../../../../shared/page-design-system'[_ngcontent-%COMP%]   as[_ngcontent-%COMP%]   *[_ngcontent-%COMP%];\n@use '../../../../../styles/design-tokens' as *;\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   LAYOUT\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tenant-page[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n}\n\n.page-background[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  overflow: hidden;\n  pointer-events: none;\n  background: linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f0fdff 100%);\n}\n\n.animated-orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n  \n  &.orb-1 {\n    width: 500px;\n    height: 500px;\n    background: $primary-gradient;\n    top: -150px;\n    left: -100px;\n  }\n  \n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    top: 40%;\n    right: -100px;\n    animation-delay: -7s;\n  }\n  \n  &.orb-3 {\n    width: 450px;\n    height: 450px;\n    background: $purple-gradient;\n    bottom: -150px;\n    left: 35%;\n    animation-delay: -14s;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(15px, -50px) scale(1.02); }\n  75% { transform: translate(-20px, -20px) scale(1.08); }\n}\n\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: $space-5;\n  max-width: 1600px;\n  margin: 0 auto;\n}\n\n.page-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-5;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   HERO[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-hero[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: $space-5;\n  flex-wrap: wrap;\n  margin-bottom: $space-5;\n  animation: _ngcontent-%COMP%_fade-in-down 0.5s ease-out;\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-down {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 280px;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.hero-eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  box-shadow: $glass-shadow-sm;\n\n  i {\n    font-size: 0.9rem;\n  }\n}\n\n.hero-subtitle[_ngcontent-%COMP%] {\n  font-size: $font-size-base;\n  color: $gray-500;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.tenant-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: $space-3;\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  transition: transform 0.2s, box-shadow 0.2s;\n  min-width: 0;\n  \n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n}\n\n.metric-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-lg;\n  font-size: 1.25rem;\n  \n  &--primary {\n    background: linear-gradient(135deg, #e0e7ff, #c7d2fe);\n    color: $primary;\n  }\n  \n  &--success {\n    background: linear-gradient(135deg, #d1fae5, #a7f3d0);\n    color: $success;\n  }\n  \n  &--purple {\n    background: linear-gradient(135deg, #ede9fe, #ddd6fe);\n    color: $purple;\n  }\n}\n\n.metric-value[_ngcontent-%COMP%] {\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $text-primary;\n  display: block;\n}\n\n.metric-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   CONTENT[_ngcontent-%COMP%]   GRID\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tenant-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);\n  gap: $space-5;\n  \n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.tenant-controls[_ngcontent-%COMP%], \n.tenant-registry[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-6;\n}\n\n.loading-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.5fr 1fr;\n  gap: $space-5;\n  \n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   GLASS[_ngcontent-%COMP%]   CARDS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.glass-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur(24px);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  padding: $space-5;\n  animation: _ngcontent-%COMP%_fade-in-up 0.6s ease-out;\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  margin-bottom: $space-5;\n  padding-bottom: $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  text-align: left;\n}\n\n.card-header-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-lg;\n  font-size: 1.25rem;\n  flex-shrink: 0;\n  \n  &--primary {\n    background: $primary-gradient;\n    color: white;\n  }\n  \n  &--success {\n    background: $success-gradient;\n    color: white;\n  }\n  \n  &--purple {\n    background: $purple-gradient;\n    color: white;\n  }\n  \n  &--orange {\n    background: $orange-gradient;\n    color: white;\n  }\n}\n\n.card-title[_ngcontent-%COMP%] {\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: #0e7490;\n  margin: 0;\n}\n\n.card-subtitle[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-muted;\n  margin: $space-1 0 0;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   FORM[_ngcontent-%COMP%]   STYLES\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tenant-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-5;\n}\n\n.form-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: $text-secondary;\n  margin: 0;\n  \n  i {\n    color: $primary;\n    font-size: 1rem;\n  }\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: $space-4;\n  \n  &--3col {\n    grid-template-columns: repeat(3, 1fr);\n  }\n  \n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.form-label[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-secondary;\n}\n\n.form-hint[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  padding-top: $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   INPUT[_ngcontent-%COMP%]   GROUP[_ngcontent-%COMP%]   COLORFUL[_ngcontent-%COMP%]   ADDONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.p-inputgroup[_ngcontent-%COMP%] {\n  .p-inputgroup-addon {\n    border: none;\n    transition: all 0.2s ease;\n    \n    i {\n      font-size: 1rem;\n    }\n  }\n  \n  &:focus-within .p-inputgroup-addon {\n    transform: scale(1.05);\n  }\n}\n\n.addon--cyan[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #e0f7fa, #b2ebf2) !important;\n  color: #0097a7 !important;\n}\n\n.addon--purple[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #ede9fe, #ddd6fe) !important;\n  color: #7c3aed !important;\n}\n\n.addon--blue[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #dbeafe, #bfdbfe) !important;\n  color: #2563eb !important;\n}\n\n.addon--pink[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #fce7f3, #fbcfe8) !important;\n  color: #db2777 !important;\n}\n\n.addon--orange[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #ffedd5, #fed7aa) !important;\n  color: #ea580c !important;\n}\n\n.addon--teal[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #ccfbf1, #99f6e4) !important;\n  color: #0d9488 !important;\n}\n\n.addon--green[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #dcfce7, #bbf7d0) !important;\n  color: #16a34a !important;\n}\n\n.addon--primary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #e0e7ff, #c7d2fe) !important;\n  color: $primary !important;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   INDUSTRY[_ngcontent-%COMP%]   TREE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.industry-pack-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-4;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.pack-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(99, 102, 241, 0.12);\n  border-radius: $radius-xl;\n  padding: $space-4;\n  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.08);\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.pack-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  justify-content: space-between;\n}\n\n.pack-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: grid;\n  place-items: center;\n  border-radius: $radius-lg;\n  font-size: 1.2rem;\n\n  &--core {\n    background: linear-gradient(135deg, #dbeafe, #bfdbfe);\n    color: #2563eb;\n  }\n\n  &--supply {\n    background: linear-gradient(135deg, #ede9fe, #ddd6fe);\n    color: #7c3aed;\n  }\n}\n\n.pack-meta[_ngcontent-%COMP%] {\n  flex: 1;\n\n  h4 {\n    margin: 0 0 $space-1;\n    font-size: 1rem;\n    font-weight: 700;\n    color: $text-primary;\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.85rem;\n    color: $text-muted;\n  }\n}\n\n.pack-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n\n.pack-body[_ngcontent-%COMP%] {\n  margin: 0;\n  color: $text-secondary;\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\n\n.module-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-2;\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n\n  &.is-disabled {\n    opacity: 0.55;\n    pointer-events: none;\n  }\n}\n\n.module-listbox[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.module-option[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: $text-primary;\n\n  i {\n    font-size: 0.95rem;\n  }\n}\n\n[_nghost-%COMP%]     .module-listbox .p-listbox {\n  border-radius: $radius-lg;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(255, 255, 255, 0.8);\n  box-shadow: none;\n}\n\n[_nghost-%COMP%]     .module-listbox .p-listbox-list {\n  padding: $space-1;\n}\n\n[_nghost-%COMP%]     .module-listbox .p-listbox-item {\n  padding: $space-1 $space-2;\n  border-radius: $radius-md;\n  margin-bottom: $space-1;\n}\n\n[_nghost-%COMP%]     .module-listbox .p-listbox-item:last-child {\n  margin-bottom: 0;\n}\n\n[_nghost-%COMP%]     .module-listbox .p-listbox-item.p-highlight {\n  background: rgba(59, 130, 246, 0.12);\n  color: $text-primary;\n}\n\n.module-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2;\n  border-radius: $radius-lg;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(255, 255, 255, 0.8);\n  transition: box-shadow 0.2s ease, transform 0.2s ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);\n  }\n\n  &.is-disabled {\n    box-shadow: none;\n  }\n}\n\n.module-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n\n.module-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-weight: 600;\n  font-size: 0.85rem;\n  color: $text-primary;\n\n  i {\n    font-size: 0.95rem;\n  }\n}\n\n.module-desc[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: $text-muted;\n}\n\n.icon-blue[_ngcontent-%COMP%] {\n  color: #2563eb;\n}\n\n.icon-teal[_ngcontent-%COMP%] {\n  color: #0d9488;\n}\n\n.icon-indigo[_ngcontent-%COMP%] {\n  color: #4f46e5;\n}\n\n.icon-green[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n\n.icon-amber[_ngcontent-%COMP%] {\n  color: #d97706;\n}\n\n.icon-rose[_ngcontent-%COMP%] {\n  color: #db2777;\n}\n\n.icon-purple[_ngcontent-%COMP%] {\n  color: #7c3aed;\n}\n\n.icon-orange[_ngcontent-%COMP%] {\n  color: #ea580c;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   SIDEBAR[_ngcontent-%COMP%]   CARDS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.sidebar-cards[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.live-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-1 $space-3;\n  background: rgba($success, 0.1);\n  color: #15803d;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  border: 1px solid rgba($success, 0.2);\n  margin-left: auto;\n}\n\n.live-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  background: $success;\n  border-radius: 50%;\n  animation: pulse-glow 2s ease-in-out infinite;\n}\n\n.active-tenant-selector[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.activate-btn[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.industry-config-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.save-industry-btn[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   TENANT[_ngcontent-%COMP%]   LIST\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tenant-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n  max-height: 320px;\n  overflow-y: auto;\n  padding-right: $space-1;\n  \n  &::-webkit-scrollbar {\n    width: 4px;\n  }\n  \n  &::-webkit-scrollbar-track {\n    background: transparent;\n  }\n  \n  &::-webkit-scrollbar-thumb {\n    background: rgba(0, 0, 0, 0.1);\n    border-radius: $radius-full;\n  }\n}\n\n.tenant-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n  border-radius: $radius-lg;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: rgba(255, 255, 255, 0.9);\n    transform: translateX(4px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n  }\n}\n\n.tenant-item-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #e0e7ff, #f0e6ff);\n  border-radius: $radius-md;\n  color: $primary;\n  font-size: 0.9rem;\n  flex-shrink: 0;\n}\n\n.tenant-item-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.tenant-item-name[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-primary;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.tenant-item-key[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  font-family: 'SF Mono', Monaco, monospace;\n}\n\n.tenant-item-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n}\n\n.tenant-item-preset[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: $radius-full;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  \n  &.preset--core {\n    background: rgba($primary, 0.1);\n    color: $primary;\n  }\n}\n\n.tenant-item-date[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.tenant-list-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: $space-8;\n  color: $text-muted;\n  \n  i {\n    font-size: 2rem;\n    margin-bottom: $space-2;\n    opacity: 0.5;\n  }\n  \n  p {\n    margin: 0;\n    font-size: $font-size-sm;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   RESPONSIVE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 768px) {\n  .page-container {\n    padding: $space-3;\n  }\n  \n  .page-hero {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .hero-actions {\n    width: 100%;\n    \n    button {\n      flex: 1;\n    }\n  }\n\n  .tenant-metrics {\n    width: 100%;\n    grid-template-columns: 1fr;\n  }\n  \n  .form-row--3col {\n    grid-template-columns: 1fr;\n  }\n}\n\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   VERTICAL[_ngcontent-%COMP%]   SIDEBAR[_ngcontent-%COMP%]   TABS[_ngcontent-%COMP%]   \u2014[_ngcontent-%COMP%]   Tenant[_ngcontent-%COMP%]   Configuration\n//[_ngcontent-%COMP%]   Glass[_ngcontent-%COMP%]   pill[_ngcontent-%COMP%]   sidebar[_ngcontent-%COMP%]   with[_ngcontent-%COMP%]   icon[_ngcontent-%COMP%]    + label[_ngcontent-%COMP%], active[_ngcontent-%COMP%]   glow[_ngcontent-%COMP%]   highlight\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.config-section[_ngcontent-%COMP%] {\n  margin-top: $space-5;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out 0.3s both;\n}\n\n.config-section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  margin-bottom: $space-4;\n\n  i {\n    font-size: 1.15rem;\n    color: #6366f1;\n  }\n\n  background: $primary-gradient;\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n\n\n.tc-sidebar-tabs[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  padding: 0;\n  border-radius: 0;\n}\n\n\n\n.tc-sidebar-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  gap: 1.5rem;\n  min-height: 480px;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n}\n\n\n\n[_nghost-%COMP%]     .tc-sidebar-nav.p-tablist {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0.65rem;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.88));\n  border: 1px solid rgba(226, 232, 240, 0.6);\n  border-radius: 20px;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.8),\n    0 8px 24px rgba(15, 23, 42, 0.06),\n    0 2px 8px rgba(15, 23, 42, 0.04);\n  backdrop-filter: blur(16px) saturate(120%);\n  -webkit-backdrop-filter: blur(16px) saturate(120%);\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n}\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tablist-tab-list {\n  display: flex !important;\n  flex-direction: column !important;\n  gap: 0.35rem;\n  border: none !important;\n}\n\n\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border: none;\n  border-radius: 14px;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: #475569;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  transition:\n    background 0.22s ease,\n    color 0.22s ease,\n    transform 0.18s ease,\n    box-shadow 0.22s ease;\n  background: rgba(255, 255, 255, 0.35);\n  text-shadow: none;\n  white-space: nowrap;\n  text-align: left;\n  justify-content: flex-start;\n  min-height: 0;\n  line-height: 1.3;\n  opacity: 1 !important;\n}\n\n\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item i.pi {\n  font-size: 1.1rem;\n  width: 22px;\n  text-align: center;\n  flex-shrink: 0;\n  transition: transform 0.22s ease, color 0.22s ease;\n}\n\n\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item::before {\n  content: '';\n  position: absolute;\n  inset: 0 0 auto 0;\n  height: 50%;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent);\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) {\n  background: rgba(99, 102, 241, 0.08);\n  color: #1e293b;\n  transform: translateX(3px);\n}\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) i.pi {\n  transform: scale(1.08);\n}\n\n\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 2px rgba(255, 255, 255, 0.8),\n    0 0 0 4px rgba(99, 102, 241, 0.2);\n}\n\n\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active, \n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true'], \n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true'] {\n  color: #ffffff;\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),\n    var(--tc-side-bg, linear-gradient(135deg, #f97316, #ea580c));\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.22),\n    0 8px 20px rgba(249, 115, 22, 0.30),\n    0 0 28px rgba(251, 146, 60, 0.18);\n  transform: translateX(4px);\n  animation: _ngcontent-%COMP%_tc-side-breathe 2.2s ease-in-out infinite;\n}\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active, \n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true'], \n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true'] {\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active .tc-sidebar-label, \n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true'] .tc-sidebar-label, \n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true'] .tc-sidebar-label {\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active i.pi, \n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true'] i.pi, \n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true'] i.pi {\n  color: #ffffff !important;\n  transform: scale(1.12);\n  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));\n}\n\n\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active::after, \n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true']::after, \n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true']::after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 15%;\n  bottom: 15%;\n  width: 3px;\n  border-radius: 0 4px 4px 0;\n  background: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, 0.2) 0%,\n    rgba(239, 68, 68, 0.9) 14%,\n    rgba(245, 158, 11, 0.9) 28%,\n    rgba(34, 197, 94, 0.9) 50%,\n    rgba(59, 130, 246, 0.95) 72%,\n    rgba(139, 92, 246, 0.95) 86%,\n    rgba(255, 255, 255, 0.2) 100%\n  );\n  box-shadow:\n    0 0 8px rgba(249, 115, 22, 0.4),\n    2px 0 12px rgba(139, 92, 246, 0.2);\n  background-size: 100% 300%;\n  animation: _ngcontent-%COMP%_tc-side-strip 3s linear infinite;\n}\n\n\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item:nth-child(1) {\n  --tc-side-bg: linear-gradient(135deg, #f97316 0%, #ea580c 100%);\n}\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item:nth-child(2) {\n  --tc-side-bg: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);\n}\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item:nth-child(3) {\n  --tc-side-bg: linear-gradient(135deg, #6f84aa 0%, #556f94 100%);\n}\n\n\n\n.tc-sidebar-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n\n\n.tc-sidebar-label[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  font-weight: 600;\n  letter-spacing: 0.005em;\n}\n\n\n\n.flag-card[_ngcontent-%COMP%] {\n  margin-bottom: $space-3;\n}\n\n.flag-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n}\n\n.flag-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n\n  &--child {\n    padding-left: $space-6;\n  }\n}\n\n.flag-label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  cursor: pointer;\n  \n  strong {\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  span {\n    font-size: $font-size-xs;\n    color: $gray-500;\n  }\n}\n\n\n\n.config-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: $space-4;\n}\n\n\n\n@keyframes _ngcontent-%COMP%_tc-side-breathe {\n  0%, 100% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.18),\n      0 6px 16px rgba(249, 115, 22, 0.22),\n      0 0 20px rgba(251, 146, 60, 0.12);\n  }\n  50% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.26),\n      0 8px 22px rgba(249, 115, 22, 0.30),\n      0 0 32px rgba(251, 146, 60, 0.20),\n      0 0 40px rgba(255, 255, 255, 0.06);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_tc-side-strip {\n  0% { background-position: 100% 0%; }\n  100% { background-position: 100% 300%; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  [_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active, \n   [_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true'], \n   [_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true'] {\n    animation: none;\n  }\n  [_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active::after, \n   [_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true']::after, \n   [_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true']::after {\n    animation: none;\n  }\n}\n\n\n\n@media (max-width: 900px) {\n  [_nghost-%COMP%]     .tc-sidebar-nav.p-tablist {\n    flex-direction: row;\n    overflow-x: auto;\n    padding: 0.65rem;\n    border-radius: 14px;\n    position: static;\n  }\n\n  [_nghost-%COMP%]     .tc-sidebar-nav .p-tablist-tab-list {\n    flex-direction: row !important;\n    gap: 0.35rem;\n  }\n\n  [_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item {\n    flex: 0 0 auto;\n    padding: 0.65rem 1rem;\n  }\n\n  [_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active, \n   [_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true'], \n   [_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true'] {\n    transform: translateY(-2px);\n  }\n\n  [_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active::after, \n   [_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true']::after, \n   [_nghost-%COMP%]     .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true']::after {\n    left: 15%;\n    right: 15%;\n    top: auto;\n    bottom: 0;\n    width: auto;\n    height: 3px;\n    border-radius: 4px 4px 0 0;\n    background: linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.2) 0%,\n      rgba(249, 115, 22, 0.95) 30%,\n      rgba(139, 92, 246, 0.95) 70%,\n      rgba(255, 255, 255, 0.2) 100%\n    );\n    background-size: 300% 100%;\n    animation: _ngcontent-%COMP%_tc-side-strip-h 3s linear infinite;\n  }\n\n  .config-section-title[_ngcontent-%COMP%] {\n    font-size: $font-size-lg;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_tc-side-strip-h {\n  0% { background-position: 0% 100%; }\n  100% { background-position: 300% 100%; }\n}\n\n\n\n[_nghost-%COMP%]     .tc-sidebar-nav .p-tablist-active-bar {\n  display: none !important;\n}\n\n\n\n.config-section[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0 $space-4 $space-3 $space-4;\n\n  > label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: #475569;\n    min-width: 130px;\n    text-align: right;\n    flex-shrink: 0;\n  }\n\n  > p-select {\n    flex: 1;\n    min-width: 0;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ACCORDION[_ngcontent-%COMP%]   STYLES\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tc-config-accordion[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n[_nghost-%COMP%]     .tc-config-accordion {\n  .p-accordionpanel {\n    background: rgba(255, 255, 255, 0.85);\n    backdrop-filter: blur(20px);\n    border: 1px solid rgba(255, 255, 255, 0.3);\n    border-radius: $radius-lg;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n    overflow: hidden;\n    transition: transform 250ms, box-shadow 250ms;\n\n    &:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08);\n    }\n  }\n\n  .p-accordionheader {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: 1px solid rgba(59, 130, 246, 0.18);\n    border-left: 3px solid #3b82f6;\n    border-radius: 0 $radius-lg $radius-lg 0;\n    padding: $space-3 $space-4;\n    font-family: inherit;\n    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n    &:hover {\n      border-color: rgba(59, 130, 246, 0.35);\n      border-left-color: #2563eb;\n      background: linear-gradient(180deg, #e8f1ff 0%, #dce8f8 100%);\n      box-shadow: 0 8px 24px rgba(59, 130, 246, 0.1);\n    }\n\n    &:focus-visible {\n      outline: 2px solid rgba(59, 130, 246, 0.4);\n      outline-offset: -2px;\n      border-radius: 0 $radius-lg $radius-lg 0;\n    }\n  }\n\n  .p-accordioncontent-content {\n    padding: 0 $space-4 $space-4;\n    border-top: 1px solid rgba(0, 0, 0, 0.06);\n  }\n}\n\n.acc-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  width: 100%;\n\n  &__icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: 1rem;\n    color: white;\n    flex-shrink: 0;\n    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n    &--primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n    &--success { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n    &--purple  { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n    &--orange  { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }\n  }\n\n  &__text {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  &__title {\n    font-size: $font-size-md;\n    font-weight: 700;\n    color: #1e293b;\n  }\n\n  &__subtitle {\n    font-size: $font-size-xs;\n    color: #94a3b8;\n    font-weight: 400;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PRESET[_ngcontent-%COMP%]   STYLES\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.preset-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.preset-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  flex-wrap: wrap;\n}\n\n.preset-status[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: #22c55e;\n\n  &--applying {\n    color: #6366f1;\n  }\n}\n\n.field-hint[_ngcontent-%COMP%] {\n  display: block;\n  font-size: $font-size-xs;\n  color: #94a3b8;\n  line-height: 1.5;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TenantsPage, [{
        type: Component,
        args: [{ selector: 'app-tenants-page', standalone: true, imports: [
                    AccordionModule,
                    ButtonModule,
                    CheckboxModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    ReactiveFormsModule,
                    SelectModule,
                    SkeletonModule,
                    TabsModule,
                    TagModule,
                    TooltipModule,
                    DatePipe,
                    NgFor,
                    NgIf,
                    FormsModule,
                    RouterLink,
                    BreadcrumbsComponent
                ], template: "<div class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n</div>\n\n<div class=\"page-container\">\n  <div class=\"page-content tenant-page\">\n    <app-breadcrumbs></app-breadcrumbs>\n\n    <header class=\"page-hero\">\n      <div class=\"hero-content\">\n        <span class=\"hero-eyebrow\">\n          <i class=\"pi pi-shield\"></i>\n          Super Admin\n        </span>\n        <h1 class=\"hero-title\">\n          <span class=\"title-gradient\">Tenant</span>\n          <span class=\"title-light\">Configuration</span>\n        </h1>\n        <p class=\"hero-subtitle\">Set active workspaces, manage Industry Packs, and review tenants in one place.</p>\n      </div>\n      <div class=\"hero-actions\">\n        <button\n          type=\"button\"\n          pButton\n          class=\"crm-button crm-button--ghost\"\n          icon=\"pi pi-arrow-left\"\n          label=\"Back to Settings\"\n          routerLink=\"/app/settings\"\n        ></button>\n        <button\n          type=\"button\"\n          pButton\n          class=\"crm-button crm-button--ghost\"\n          icon=\"pi pi-sliders-h\"\n          label=\"Workspace Settings\"\n          routerLink=\"/app/settings/workspace\"\n        ></button>\n        <button\n          *ngIf=\"canManageTenants()\"\n          type=\"button\"\n          pButton\n          class=\"crm-button crm-button--primary\"\n          icon=\"pi pi-plus\"\n          label=\"Create tenant\"\n          routerLink=\"/app/settings/tenants/new\"\n        ></button>\n      </div>\n    </header>\n\n    <div class=\"tenant-metrics\">\n      <div class=\"metric-card\">\n        <div class=\"metric-icon metric-icon--primary\">\n          <i class=\"pi pi-building\"></i>\n        </div>\n        <div>\n          <span class=\"metric-value\">{{ totalTenants() }}</span>\n          <span class=\"metric-label\">Total tenants</span>\n        </div>\n      </div>\n      <div class=\"metric-card\">\n        <div class=\"metric-icon metric-icon--success\">\n          <i class=\"pi pi-check-circle\"></i>\n        </div>\n        <div>\n          <span class=\"metric-value\">{{ activeTenant()?.name || '\u2014' }}</span>\n          <span class=\"metric-label\">Active tenant</span>\n        </div>\n      </div>\n      <div class=\"metric-card\">\n        <div class=\"metric-icon metric-icon--purple\">\n          <i class=\"pi pi-sitemap\"></i>\n        </div>\n        <div>\n          <span class=\"metric-value\">{{ activeTenant()?.industryPreset || 'CoreCRM' }}</span>\n          <span class=\"metric-label\">CRM preset</span>\n        </div>\n      </div>\n    </div>\n\n    <ng-container *ngIf=\"!loading(); else loadingState\">\n      <div class=\"tenant-layout\">\n        <section class=\"tenant-controls\">\n          <article class=\"glass-card active-tenant-card\">\n            <header class=\"card-header\">\n              <div class=\"card-header-icon card-header-icon--success\">\n                <i class=\"pi pi-check-circle\"></i>\n              </div>\n              <div>\n                <h2 class=\"card-title\">Active tenant</h2>\n                <p class=\"card-subtitle\">Switch the workspace used by this session.</p>\n              </div>\n              <span class=\"live-badge\">\n                <span class=\"live-dot\"></span>\n                Live\n              </span>\n            </header>\n\n            <div class=\"active-tenant-selector\">\n              <label class=\"form-label\">Select tenant</label>\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"addon--primary\">\n                  <i class=\"pi pi-building\"></i>\n                </p-inputgroup-addon>\n                <p-select\n                  appendTo=\"body\"\n                  [options]=\"tenantOptions()\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  [ngModel]=\"activeTenantKey()\"\n                  (ngModelChange)=\"onActiveTenantChange($event)\"\n                  placeholder=\"Select tenant\"\n                  styleClass=\"w-full\"\n                ></p-select>\n              </p-inputgroup>\n              <button\n                type=\"button\"\n                pButton\n                class=\"crm-button crm-button--primary activate-btn\"\n                icon=\"pi pi-check\"\n                label=\"Set active tenant\"\n                [disabled]=\"!canManageTenants() || !activeTenantKey()\"\n                (click)=\"applyActiveTenant()\"\n              ></button>\n              <small class=\"form-hint\">Applies to the current browser session.</small>\n            </div>\n          </article>\n\n          <article class=\"glass-card industry-config-card\">\n            <header class=\"card-header\">\n              <div class=\"card-header-icon card-header-icon--purple\">\n                <i class=\"pi pi-sitemap\"></i>\n              </div>\n              <div>\n                <h2 class=\"card-title\">Industry packs</h2>\n              </div>\n            </header>\n\n            <div class=\"industry-config-content\">\n              <div class=\"industry-pack-grid\">\n                <div class=\"pack-card pack-card--core\">\n                  <div class=\"pack-header\">\n                    <div class=\"pack-icon pack-icon--core\">\n                      <i class=\"pi pi-shield\"></i>\n                    </div>\n                    <div class=\"pack-meta\">\n                      <h4>Core CRM</h4>\n                    </div>\n                    <p-tag value=\"Always on\" severity=\"success\"></p-tag>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </article>\n        </section>\n\n        <section class=\"tenant-registry\">\n          <article class=\"glass-card registry-card\">\n            <header class=\"card-header\">\n              <div class=\"card-header-icon card-header-icon--orange\">\n                <i class=\"pi pi-list\"></i>\n              </div>\n              <div>\n                <h2 class=\"card-title\">Tenant registry</h2>\n                <p class=\"card-subtitle\">{{ totalTenants() }} registered workspaces</p>\n              </div>\n              <button\n                type=\"button\"\n                pButton\n                class=\"p-button-text p-button-sm\"\n                icon=\"pi pi-refresh\"\n                pTooltip=\"Reload\"\n                [disabled]=\"loading()\"\n                (click)=\"loadTenants()\"\n              ></button>\n            </header>\n\n            <div class=\"tenant-list\">\n              <div class=\"tenant-item\" *ngFor=\"let tenant of tenants()\">\n                <div class=\"tenant-item-avatar\">\n                  <i class=\"pi pi-building\"></i>\n                </div>\n                <div class=\"tenant-item-info\">\n                  <span class=\"tenant-item-name\">{{ tenant.name }}</span>\n                  <span class=\"tenant-item-key\">{{ tenant.key }}</span>\n                </div>\n                <div class=\"tenant-item-meta\">\n                  <span class=\"tenant-item-preset preset--core\">\n                    {{ tenant.industryPreset || 'CoreCRM' }}\n                  </span>\n                  <span class=\"tenant-item-date\">{{ tenant.createdAtUtc | date:'MMM d, y' }}</span>\n                </div>\n              </div>\n\n              <div class=\"tenant-list-empty\" *ngIf=\"tenants().length === 0\">\n                <i class=\"pi pi-inbox\"></i>\n                <p>No tenants found</p>\n              </div>\n            </div>\n          </article>\n        </section>\n      </div>\n    </ng-container>\n\n    <!-- \u2500\u2500 Feature-flag configuration (sidebar tabs) \u2500\u2500 -->\n    <section class=\"config-section\" *ngIf=\"!loading()\">\n      <h2 class=\"config-section-title\">\n        <i class=\"pi pi-sliders-h\"></i>\n        Platform Configuration\n      </h2>\n\n      <form [formGroup]=\"flagsForm\" (ngSubmit)=\"saveFeatureFlags()\">\n        <p-tabs class=\"tc-sidebar-tabs\" [value]=\"activeConfigTab()\" (valueChange)=\"onConfigTabChange($event)\">\n          <div class=\"tc-sidebar-layout\">\n            <p-tablist class=\"tc-sidebar-nav\">\n              <p-tab value=\"modules\" [pt]=\"{ root: { class: 'tc-sidebar-item' } }\">\n                <i class=\"pi pi-th-large\"></i>\n                <span class=\"tc-sidebar-label\">Modules</span>\n              </p-tab>\n              <p-tab value=\"features\" [pt]=\"{ root: { class: 'tc-sidebar-item' } }\">\n                <i class=\"pi pi-bolt\"></i>\n                <span class=\"tc-sidebar-label\">Features</span>\n              </p-tab>\n              <p-tab value=\"security\" [pt]=\"{ root: { class: 'tc-sidebar-item' } }\">\n                <i class=\"pi pi-lock\"></i>\n                <span class=\"tc-sidebar-label\">Security</span>\n              </p-tab>\n            </p-tablist>\n\n            <p-tabpanels class=\"tc-sidebar-content\">\n              <!-- \u2500\u2500 Tab 1: Modules \u2500\u2500 -->\n              <p-tabpanel value=\"modules\">\n                <p-accordion [multiple]=\"true\" [value]=\"['vertical-preset', 'crm-modules', 'helpdesk']\" class=\"tc-config-accordion\">\n\n                  <p-accordion-panel value=\"vertical-preset\">\n                    <p-accordion-header>\n                      <div class=\"acc-header\">\n                        <div class=\"acc-header__icon acc-header__icon--primary\"><i class=\"pi pi-compass\"></i></div>\n                        <div class=\"acc-header__text\">\n                          <span class=\"acc-header__title\">CRM Vertical Preset</span>\n                          <span class=\"acc-header__subtitle\">Language, catalogs, reports & workflow defaults</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n                      <div class=\"preset-body\">\n                        <div class=\"form-field\">\n                          <label for=\"tc-industryPreset\">Preset</label>\n                          <p-select\n                            inputId=\"tc-industryPreset\"\n                            formControlName=\"industryPreset\"\n                            [options]=\"verticalPresetOptions\"\n                            optionLabel=\"label\"\n                            optionValue=\"value\"\n                            appendTo=\"body\"\n                            styleClass=\"w-full\"\n                          ></p-select>\n                        </div>\n                        <small class=\"field-hint\">Use Core CRM for standard sales workflows. Use Real Estate Brokerage for realtor and brokerage CRM operations.</small>\n                        <div class=\"preset-actions\">\n                          <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"presetApplying()\" (click)=\"applyVerticalPreset(false)\">\n                            <span class=\"action-btn__icon\"><i class=\"pi pi-sparkles\"></i></span>\n                            <span>Apply Preset</span>\n                          </button>\n                          <button type=\"button\" class=\"action-btn action-btn--refresh\" [disabled]=\"presetApplying()\" (click)=\"applyVerticalPreset(true)\">\n                            <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n                            <span>Reset to Preset</span>\n                          </button>\n                          <span class=\"preset-status\" *ngIf=\"presetApplied() && !presetApplying()\">\n                            <i class=\"pi pi-check-circle\"></i> In effect\n                          </span>\n                          <span class=\"preset-status preset-status--applying\" *ngIf=\"presetApplying()\">\n                            <i class=\"pi pi-spinner pi-spin\"></i> Applying\u2026\n                          </span>\n                        </div>\n                      </div>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n\n                  <p-accordion-panel value=\"crm-modules\">\n                    <p-accordion-header>\n                      <div class=\"acc-header\">\n                        <div class=\"acc-header__icon acc-header__icon--primary\"><i class=\"pi pi-box\"></i></div>\n                        <div class=\"acc-header__text\">\n                          <span class=\"acc-header__title\">CRM Modules</span>\n                          <span class=\"acc-header__subtitle\">Enable or disable optional CRM modules</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n                      <div class=\"flag-grid\">\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-properties\" formControlName=\"featureProperties\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-properties\" class=\"flag-label\">\n                            <strong>Properties</strong>\n                            <span>Property management module</span>\n                          </label>\n                        </div>\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-marketing\" formControlName=\"featureMarketingCampaigns\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-marketing\" class=\"flag-label\">\n                            <strong>Marketing Campaigns</strong>\n                            <span>Campaign planning and execution</span>\n                          </label>\n                        </div>\n                      </div>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n\n                  <p-accordion-panel value=\"helpdesk\">\n                    <p-accordion-header>\n                      <div class=\"acc-header\">\n                        <div class=\"acc-header__icon acc-header__icon--orange\"><i class=\"pi pi-headphones\"></i></div>\n                        <div class=\"acc-header__text\">\n                          <span class=\"acc-header__title\">Help Desk</span>\n                          <span class=\"acc-header__subtitle\">Configure help desk and support features</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n                      <div class=\"flag-grid\">\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-hd-cases\" formControlName=\"featureHelpDeskCases\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-hd-cases\" class=\"flag-label\">\n                            <strong>Help Desk Cases</strong>\n                            <span>Enable support case management</span>\n                          </label>\n                        </div>\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-hd-email\" formControlName=\"featureHelpDeskEmailIntake\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-hd-email\" class=\"flag-label\">\n                            <strong>Email Intake</strong>\n                            <span>Auto-create cases from inbound email</span>\n                          </label>\n                        </div>\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-hd-realtime\" formControlName=\"featureHelpDeskRealtime\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-hd-realtime\" class=\"flag-label\">\n                            <strong>Realtime Help Desk</strong>\n                            <span>Live updates for case activity</span>\n                          </label>\n                        </div>\n                      </div>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n\n                </p-accordion>\n              </p-tabpanel>\n\n              <!-- \u2500\u2500 Tab 2: Features \u2500\u2500 -->\n              <p-tabpanel value=\"features\">\n                <p-accordion [multiple]=\"true\" [value]=\"['realtime', 'ai', 'communications']\" class=\"tc-config-accordion\">\n\n                  <p-accordion-panel value=\"realtime\">\n                    <p-accordion-header>\n                      <div class=\"acc-header\">\n                        <div class=\"acc-header__icon acc-header__icon--success\"><i class=\"pi pi-wifi\"></i></div>\n                        <div class=\"acc-header__text\">\n                          <span class=\"acc-header__title\">Realtime</span>\n                          <span class=\"acc-header__subtitle\">Control SignalR-powered live features</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n                      <div class=\"flag-grid\">\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-rt-dashboard\" formControlName=\"featureRealtimeDashboard\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-rt-dashboard\" class=\"flag-label\">\n                            <strong>Dashboard</strong>\n                            <span>Live dashboard updates</span>\n                          </label>\n                        </div>\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-rt-pipeline\" formControlName=\"featureRealtimePipeline\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-rt-pipeline\" class=\"flag-label\">\n                            <strong>Pipeline</strong>\n                            <span>Live pipeline / kanban refresh</span>\n                          </label>\n                        </div>\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-rt-crud\" formControlName=\"featureRealtimeEntityCrud\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-rt-crud\" class=\"flag-label\">\n                            <strong>Entity CRUD</strong>\n                            <span>Broadcast create/update/delete events</span>\n                          </label>\n                        </div>\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-rt-import\" formControlName=\"featureRealtimeImportProgress\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-rt-import\" class=\"flag-label\">\n                            <strong>Import Progress</strong>\n                            <span>Live import status tracking</span>\n                          </label>\n                        </div>\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-rt-presence\" formControlName=\"featureRealtimeRecordPresence\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-rt-presence\" class=\"flag-label\">\n                            <strong>Record Presence</strong>\n                            <span>See who else is viewing a record</span>\n                          </label>\n                        </div>\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-rt-assistant\" formControlName=\"featureRealtimeAssistantStreaming\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-rt-assistant\" class=\"flag-label\">\n                            <strong>Assistant Streaming</strong>\n                            <span>Live AI assistant response streaming</span>\n                          </label>\n                        </div>\n                      </div>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n\n                  <p-accordion-panel value=\"ai\">\n                    <p-accordion-header>\n                      <div class=\"acc-header\">\n                        <div class=\"acc-header__icon acc-header__icon--purple\"><i class=\"pi pi-sparkles\"></i></div>\n                        <div class=\"acc-header__text\">\n                          <span class=\"acc-header__title\">AI</span>\n                          <span class=\"acc-header__subtitle\">Artificial intelligence features</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n                      <div class=\"flag-grid\">\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-ai-knowledge\" formControlName=\"featureAiKnowledgeSearch\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-ai-knowledge\" class=\"flag-label\">\n                            <strong>Knowledge Search</strong>\n                            <span>AI-powered knowledge base queries</span>\n                          </label>\n                        </div>\n                      </div>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n\n                  <p-accordion-panel value=\"communications\">\n                    <p-accordion-header>\n                      <div class=\"acc-header\">\n                        <div class=\"acc-header__icon acc-header__icon--primary\"><i class=\"pi pi-envelope\"></i></div>\n                        <div class=\"acc-header__text\">\n                          <span class=\"acc-header__title\">Communications</span>\n                          <span class=\"acc-header__subtitle\">Email delivery and notification channels</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n                      <div class=\"flag-grid\">\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-email-delivery\" formControlName=\"featureEmailDelivery\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-email-delivery\" class=\"flag-label\">\n                            <strong>Email Delivery</strong>\n                            <span>Master toggle for outbound email</span>\n                          </label>\n                        </div>\n                        <ng-container *ngIf=\"emailDeliveryEnabled()\">\n                          <div class=\"flag-item flag-item--child\" *ngFor=\"let opt of emailDeliveryOptions\">\n                            <p-checkbox [inputId]=\"opt.inputId\" [formControlName]=\"opt.controlName\" [binary]=\"true\"></p-checkbox>\n                            <label [for]=\"opt.inputId\" class=\"flag-label\">\n                              <strong>{{ opt.label }}</strong>\n                            </label>\n                          </div>\n                          <div class=\"flag-item flag-item--child\">\n                            <p-checkbox inputId=\"tc-email-status\" formControlName=\"featureEmailDeliveryStatusNotifications\" [binary]=\"true\"></p-checkbox>\n                            <label for=\"tc-email-status\" class=\"flag-label\">\n                              <strong>Status notification emails</strong>\n                            </label>\n                          </div>\n                        </ng-container>\n                      </div>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n\n                </p-accordion>\n              </p-tabpanel>\n\n              <!-- \u2500\u2500 Tab 3: Security \u2500\u2500 -->\n              <p-tabpanel value=\"security\">\n                <p-accordion [multiple]=\"true\" [value]=\"['auth', 'report-designer']\" class=\"tc-config-accordion\">\n\n                  <p-accordion-panel value=\"auth\">\n                    <p-accordion-header>\n                      <div class=\"acc-header\">\n                        <div class=\"acc-header__icon acc-header__icon--orange\"><i class=\"pi pi-microsoft\"></i></div>\n                        <div class=\"acc-header__text\">\n                          <span class=\"acc-header__title\">Enterprise Authentication</span>\n                          <span class=\"acc-header__subtitle\">SSO and identity provider settings</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n                      <div class=\"flag-grid\">\n                        <div class=\"flag-item\">\n                          <p-checkbox inputId=\"tc-auth-entra\" formControlName=\"featureAuthEntra\" [binary]=\"true\"></p-checkbox>\n                          <label for=\"tc-auth-entra\" class=\"flag-label\">\n                            <strong>Microsoft Entra ID</strong>\n                            <span>Enable Azure AD / Entra SSO login</span>\n                          </label>\n                        </div>\n                      </div>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n\n                  <p-accordion-panel value=\"report-designer\">\n                    <p-accordion-header>\n                      <div class=\"acc-header\">\n                        <div class=\"acc-header__icon acc-header__icon--purple\"><i class=\"pi pi-file-edit\"></i></div>\n                        <div class=\"acc-header__text\">\n                          <span class=\"acc-header__title\">Report Designer Access</span>\n                          <span class=\"acc-header__subtitle\">Permission required for report designer</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n                      <div class=\"flag-grid\">\n                        <div class=\"form-field\">\n                          <label for=\"tc-report-perm\">Minimum permission</label>\n                          <p-select\n                            id=\"tc-report-perm\"\n                            [options]=\"reportDesignerPermissionOptions\"\n                            optionLabel=\"label\"\n                            optionValue=\"value\"\n                            formControlName=\"reportDesignerRequiredPermission\"\n                            placeholder=\"Select permission\"\n                            class=\"w-full\"\n                            appendTo=\"body\"\n                          ></p-select>\n                        </div>\n                      </div>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n\n                </p-accordion>\n              </p-tabpanel>\n            </p-tabpanels>\n          </div>\n        </p-tabs>\n\n        <div class=\"config-actions\">\n          <button\n            type=\"submit\"\n            class=\"action-btn action-btn--add\"\n            [disabled]=\"savingFlags()\"\n          >\n            <span class=\"action-btn__icon\"><i class=\"pi pi-save\"></i></span>\n            <span>{{ savingFlags() ? 'Saving\u2026' : 'Save Configuration' }}</span>\n          </button>\n        </div>\n      </form>\n    </section>\n\n    <ng-template #loadingState>\n      <div class=\"loading-grid\">\n        <div class=\"glass-card\">\n          <p-skeleton height=\"48px\" styleClass=\"mb-4\"></p-skeleton>\n          <p-skeleton height=\"200px\" styleClass=\"mb-3\"></p-skeleton>\n          <p-skeleton height=\"200px\"></p-skeleton>\n        </div>\n        <div class=\"sidebar-cards\">\n          <div class=\"glass-card\">\n            <p-skeleton height=\"150px\"></p-skeleton>\n          </div>\n          <div class=\"glass-card\">\n            <p-skeleton height=\"150px\"></p-skeleton>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  </div>\n</div>\n", styles: ["// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// TENANT MANAGEMENT PAGE - Premium Design System\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use '../../../../shared/page-design-system' as *;\n@use '../../../../../styles/design-tokens' as *;\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PAGE LAYOUT\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tenant-page {\n  position: relative;\n  min-height: 100vh;\n}\n\n.page-background {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  overflow: hidden;\n  pointer-events: none;\n  background: linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f0fdff 100%);\n}\n\n.animated-orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.4;\n  animation: orb-float 20s ease-in-out infinite;\n  \n  &.orb-1 {\n    width: 500px;\n    height: 500px;\n    background: $primary-gradient;\n    top: -150px;\n    left: -100px;\n  }\n  \n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    top: 40%;\n    right: -100px;\n    animation-delay: -7s;\n  }\n  \n  &.orb-3 {\n    width: 450px;\n    height: 450px;\n    background: $purple-gradient;\n    bottom: -150px;\n    left: 35%;\n    animation-delay: -14s;\n  }\n}\n\n@keyframes orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(15px, -50px) scale(1.02); }\n  75% { transform: translate(-20px, -20px) scale(1.08); }\n}\n\n.page-container {\n  position: relative;\n  z-index: 1;\n  padding: $space-5;\n  max-width: 1600px;\n  margin: 0 auto;\n}\n\n.page-content {\n  display: flex;\n  flex-direction: column;\n  gap: $space-5;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// HERO SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-hero {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: $space-5;\n  flex-wrap: wrap;\n  margin-bottom: $space-5;\n  animation: fade-in-down 0.5s ease-out;\n}\n\n@keyframes fade-in-down {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.hero-content {\n  flex: 1;\n  min-width: 280px;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.hero-eyebrow {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  box-shadow: $glass-shadow-sm;\n\n  i {\n    font-size: 0.9rem;\n  }\n}\n\n.hero-subtitle {\n  font-size: $font-size-base;\n  color: $gray-500;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.hero-actions {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.tenant-metrics {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: $space-3;\n}\n\n.metric-card {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  transition: transform 0.2s, box-shadow 0.2s;\n  min-width: 0;\n  \n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n}\n\n.metric-icon {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-lg;\n  font-size: 1.25rem;\n  \n  &--primary {\n    background: linear-gradient(135deg, #e0e7ff, #c7d2fe);\n    color: $primary;\n  }\n  \n  &--success {\n    background: linear-gradient(135deg, #d1fae5, #a7f3d0);\n    color: $success;\n  }\n  \n  &--purple {\n    background: linear-gradient(135deg, #ede9fe, #ddd6fe);\n    color: $purple;\n  }\n}\n\n.metric-value {\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $text-primary;\n  display: block;\n}\n\n.metric-label {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// CONTENT GRID\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tenant-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);\n  gap: $space-5;\n  \n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.tenant-controls,\n.tenant-registry {\n  display: flex;\n  flex-direction: column;\n  gap: $space-6;\n}\n\n.loading-grid {\n  display: grid;\n  grid-template-columns: 1.5fr 1fr;\n  gap: $space-5;\n  \n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// GLASS CARDS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.glass-card {\n  background: $glass-bg;\n  backdrop-filter: blur(24px);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  padding: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n}\n\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.card-header {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  margin-bottom: $space-5;\n  padding-bottom: $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  text-align: left;\n}\n\n.card-header-icon {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-lg;\n  font-size: 1.25rem;\n  flex-shrink: 0;\n  \n  &--primary {\n    background: $primary-gradient;\n    color: white;\n  }\n  \n  &--success {\n    background: $success-gradient;\n    color: white;\n  }\n  \n  &--purple {\n    background: $purple-gradient;\n    color: white;\n  }\n  \n  &--orange {\n    background: $orange-gradient;\n    color: white;\n  }\n}\n\n.card-title {\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: #0e7490;\n  margin: 0;\n}\n\n.card-subtitle {\n  font-size: $font-size-sm;\n  color: $text-muted;\n  margin: $space-1 0 0;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// FORM STYLES\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tenant-form {\n  display: flex;\n  flex-direction: column;\n  gap: $space-5;\n}\n\n.form-section {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.section-title {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: $text-secondary;\n  margin: 0;\n  \n  i {\n    color: $primary;\n    font-size: 1rem;\n  }\n}\n\n.form-row {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: $space-4;\n  \n  &--3col {\n    grid-template-columns: repeat(3, 1fr);\n  }\n  \n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.form-label {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-secondary;\n}\n\n.form-hint {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  padding-top: $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// INPUT GROUP COLORFUL ADDONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.p-inputgroup {\n  .p-inputgroup-addon {\n    border: none;\n    transition: all 0.2s ease;\n    \n    i {\n      font-size: 1rem;\n    }\n  }\n  \n  &:focus-within .p-inputgroup-addon {\n    transform: scale(1.05);\n  }\n}\n\n.addon--cyan {\n  background: linear-gradient(135deg, #e0f7fa, #b2ebf2) !important;\n  color: #0097a7 !important;\n}\n\n.addon--purple {\n  background: linear-gradient(135deg, #ede9fe, #ddd6fe) !important;\n  color: #7c3aed !important;\n}\n\n.addon--blue {\n  background: linear-gradient(135deg, #dbeafe, #bfdbfe) !important;\n  color: #2563eb !important;\n}\n\n.addon--pink {\n  background: linear-gradient(135deg, #fce7f3, #fbcfe8) !important;\n  color: #db2777 !important;\n}\n\n.addon--orange {\n  background: linear-gradient(135deg, #ffedd5, #fed7aa) !important;\n  color: #ea580c !important;\n}\n\n.addon--teal {\n  background: linear-gradient(135deg, #ccfbf1, #99f6e4) !important;\n  color: #0d9488 !important;\n}\n\n.addon--green {\n  background: linear-gradient(135deg, #dcfce7, #bbf7d0) !important;\n  color: #16a34a !important;\n}\n\n.addon--primary {\n  background: linear-gradient(135deg, #e0e7ff, #c7d2fe) !important;\n  color: $primary !important;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// INDUSTRY TREE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.industry-pack-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-4;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.pack-card {\n  background: rgba(255, 255, 255, 0.85);\n  border: 1px solid rgba(99, 102, 241, 0.12);\n  border-radius: $radius-xl;\n  padding: $space-4;\n  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.08);\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.pack-header {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  justify-content: space-between;\n}\n\n.pack-icon {\n  width: 44px;\n  height: 44px;\n  display: grid;\n  place-items: center;\n  border-radius: $radius-lg;\n  font-size: 1.2rem;\n\n  &--core {\n    background: linear-gradient(135deg, #dbeafe, #bfdbfe);\n    color: #2563eb;\n  }\n\n  &--supply {\n    background: linear-gradient(135deg, #ede9fe, #ddd6fe);\n    color: #7c3aed;\n  }\n}\n\n.pack-meta {\n  flex: 1;\n\n  h4 {\n    margin: 0 0 $space-1;\n    font-size: 1rem;\n    font-weight: 700;\n    color: $text-primary;\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.85rem;\n    color: $text-muted;\n  }\n}\n\n.pack-toggle {\n  display: flex;\n  align-items: center;\n}\n\n.pack-body {\n  margin: 0;\n  color: $text-secondary;\n  font-size: 0.9rem;\n  line-height: 1.5;\n}\n\n.module-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-2;\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n\n  &.is-disabled {\n    opacity: 0.55;\n    pointer-events: none;\n  }\n}\n\n.module-listbox {\n  width: 100%;\n}\n\n.module-option {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: $text-primary;\n\n  i {\n    font-size: 0.95rem;\n  }\n}\n\n:host ::ng-deep .module-listbox .p-listbox {\n  border-radius: $radius-lg;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(255, 255, 255, 0.8);\n  box-shadow: none;\n}\n\n:host ::ng-deep .module-listbox .p-listbox-list {\n  padding: $space-1;\n}\n\n:host ::ng-deep .module-listbox .p-listbox-item {\n  padding: $space-1 $space-2;\n  border-radius: $radius-md;\n  margin-bottom: $space-1;\n}\n\n:host ::ng-deep .module-listbox .p-listbox-item:last-child {\n  margin-bottom: 0;\n}\n\n:host ::ng-deep .module-listbox .p-listbox-item.p-highlight {\n  background: rgba(59, 130, 246, 0.12);\n  color: $text-primary;\n}\n\n.module-item {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2;\n  border-radius: $radius-lg;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(255, 255, 255, 0.8);\n  transition: box-shadow 0.2s ease, transform 0.2s ease;\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);\n  }\n\n  &.is-disabled {\n    box-shadow: none;\n  }\n}\n\n.module-meta {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n\n.module-title {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-weight: 600;\n  font-size: 0.85rem;\n  color: $text-primary;\n\n  i {\n    font-size: 0.95rem;\n  }\n}\n\n.module-desc {\n  font-size: 0.75rem;\n  color: $text-muted;\n}\n\n.icon-blue {\n  color: #2563eb;\n}\n\n.icon-teal {\n  color: #0d9488;\n}\n\n.icon-indigo {\n  color: #4f46e5;\n}\n\n.icon-green {\n  color: #16a34a;\n}\n\n.icon-amber {\n  color: #d97706;\n}\n\n.icon-rose {\n  color: #db2777;\n}\n\n.icon-purple {\n  color: #7c3aed;\n}\n\n.icon-orange {\n  color: #ea580c;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// SIDEBAR CARDS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.sidebar-cards {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.live-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-1 $space-3;\n  background: rgba($success, 0.1);\n  color: #15803d;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n  border: 1px solid rgba($success, 0.2);\n  margin-left: auto;\n}\n\n.live-dot {\n  width: 6px;\n  height: 6px;\n  background: $success;\n  border-radius: 50%;\n  animation: pulse-glow 2s ease-in-out infinite;\n}\n\n.active-tenant-selector {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.activate-btn {\n  width: 100%;\n}\n\n.industry-config-content {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.save-industry-btn {\n  width: 100%;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// TENANT LIST\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tenant-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n  max-height: 320px;\n  overflow-y: auto;\n  padding-right: $space-1;\n  \n  &::-webkit-scrollbar {\n    width: 4px;\n  }\n  \n  &::-webkit-scrollbar-track {\n    background: transparent;\n  }\n  \n  &::-webkit-scrollbar-thumb {\n    background: rgba(0, 0, 0, 0.1);\n    border-radius: $radius-full;\n  }\n}\n\n.tenant-item {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(0, 0, 0, 0.04);\n  border-radius: $radius-lg;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: rgba(255, 255, 255, 0.9);\n    transform: translateX(4px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n  }\n}\n\n.tenant-item-avatar {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #e0e7ff, #f0e6ff);\n  border-radius: $radius-md;\n  color: $primary;\n  font-size: 0.9rem;\n  flex-shrink: 0;\n}\n\n.tenant-item-info {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.tenant-item-name {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $text-primary;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.tenant-item-key {\n  font-size: $font-size-xs;\n  color: $text-muted;\n  font-family: 'SF Mono', Monaco, monospace;\n}\n\n.tenant-item-meta {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n}\n\n.tenant-item-preset {\n  font-size: 10px;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: $radius-full;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  \n  &.preset--core {\n    background: rgba($primary, 0.1);\n    color: $primary;\n  }\n}\n\n.tenant-item-date {\n  font-size: $font-size-xs;\n  color: $text-muted;\n}\n\n.tenant-list-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: $space-8;\n  color: $text-muted;\n  \n  i {\n    font-size: 2rem;\n    margin-bottom: $space-2;\n    opacity: 0.5;\n  }\n  \n  p {\n    margin: 0;\n    font-size: $font-size-sm;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// RESPONSIVE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@media (max-width: 768px) {\n  .page-container {\n    padding: $space-3;\n  }\n  \n  .page-hero {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .hero-actions {\n    width: 100%;\n    \n    button {\n      flex: 1;\n    }\n  }\n\n  .tenant-metrics {\n    width: 100%;\n    grid-template-columns: 1fr;\n  }\n  \n  .form-row--3col {\n    grid-template-columns: 1fr;\n  }\n}\n\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// VERTICAL SIDEBAR TABS \u2014 Tenant Configuration\n// Glass pill sidebar with icon + label, active glow highlight\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.config-section {\n  margin-top: $space-5;\n  animation: fade-in-up 0.5s ease-out 0.3s both;\n}\n\n.config-section-title {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  margin-bottom: $space-4;\n\n  i {\n    font-size: 1.15rem;\n    color: #6366f1;\n  }\n\n  background: $primary-gradient;\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n/* Outer PrimeNG wrapper \u2014 reset its chrome */\n.tc-sidebar-tabs {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  padding: 0;\n  border-radius: 0;\n}\n\n/* Side-by-side grid: sidebar | content */\n.tc-sidebar-layout {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  gap: 1.5rem;\n  min-height: 480px;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n}\n\n/* \u2500\u2500 Sidebar navigation column \u2500\u2500 */\n:host ::ng-deep .tc-sidebar-nav.p-tablist {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0.65rem;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.88));\n  border: 1px solid rgba(226, 232, 240, 0.6);\n  border-radius: 20px;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.8),\n    0 8px 24px rgba(15, 23, 42, 0.06),\n    0 2px 8px rgba(15, 23, 42, 0.04);\n  backdrop-filter: blur(16px) saturate(120%);\n  -webkit-backdrop-filter: blur(16px) saturate(120%);\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n}\n\n:host ::ng-deep .tc-sidebar-nav .p-tablist-tab-list {\n  display: flex !important;\n  flex-direction: column !important;\n  gap: 0.35rem;\n  border: none !important;\n}\n\n/* \u2500\u2500 Individual sidebar item \u2500\u2500 */\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border: none;\n  border-radius: 14px;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: #475569;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  transition:\n    background 0.22s ease,\n    color 0.22s ease,\n    transform 0.18s ease,\n    box-shadow 0.22s ease;\n  background: rgba(255, 255, 255, 0.35);\n  text-shadow: none;\n  white-space: nowrap;\n  text-align: left;\n  justify-content: flex-start;\n  min-height: 0;\n  line-height: 1.3;\n  opacity: 1 !important;\n}\n\n/* Icon inside sidebar item */\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item i.pi {\n  font-size: 1.1rem;\n  width: 22px;\n  text-align: center;\n  flex-shrink: 0;\n  transition: transform 0.22s ease, color 0.22s ease;\n}\n\n/* Subtle glass sheen on top half */\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item::before {\n  content: '';\n  position: absolute;\n  inset: 0 0 auto 0;\n  height: 50%;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent);\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n/* \u2500\u2500 Hover state \u2500\u2500 */\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) {\n  background: rgba(99, 102, 241, 0.08);\n  color: #1e293b;\n  transform: translateX(3px);\n}\n\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) i.pi {\n  transform: scale(1.08);\n}\n\n/* \u2500\u2500 Focus visible \u2500\u2500 */\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 2px rgba(255, 255, 255, 0.8),\n    0 0 0 4px rgba(99, 102, 241, 0.2);\n}\n\n/* \u2500\u2500 Active state \u2014 gradient glow pill \u2500\u2500 */\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active,\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true'],\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true'] {\n  color: #ffffff;\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),\n    var(--tc-side-bg, linear-gradient(135deg, #f97316, #ea580c));\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.22),\n    0 8px 20px rgba(249, 115, 22, 0.30),\n    0 0 28px rgba(251, 146, 60, 0.18);\n  transform: translateX(4px);\n  animation: tc-side-breathe 2.2s ease-in-out infinite;\n}\n\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active,\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true'],\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true'] {\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active .tc-sidebar-label,\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true'] .tc-sidebar-label,\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true'] .tc-sidebar-label {\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active i.pi,\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true'] i.pi,\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true'] i.pi {\n  color: #ffffff !important;\n  transform: scale(1.12);\n  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));\n}\n\n/* Active left accent strip */\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active::after,\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true']::after,\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true']::after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 15%;\n  bottom: 15%;\n  width: 3px;\n  border-radius: 0 4px 4px 0;\n  background: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, 0.2) 0%,\n    rgba(239, 68, 68, 0.9) 14%,\n    rgba(245, 158, 11, 0.9) 28%,\n    rgba(34, 197, 94, 0.9) 50%,\n    rgba(59, 130, 246, 0.95) 72%,\n    rgba(139, 92, 246, 0.95) 86%,\n    rgba(255, 255, 255, 0.2) 100%\n  );\n  box-shadow:\n    0 0 8px rgba(249, 115, 22, 0.4),\n    2px 0 12px rgba(139, 92, 246, 0.2);\n  background-size: 100% 300%;\n  animation: tc-side-strip 3s linear infinite;\n}\n\n/* \u2500\u2500 Per-tab gradient colors \u2500\u2500 */\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item:nth-child(1) {\n  --tc-side-bg: linear-gradient(135deg, #f97316 0%, #ea580c 100%);\n}\n\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item:nth-child(2) {\n  --tc-side-bg: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);\n}\n\n:host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item:nth-child(3) {\n  --tc-side-bg: linear-gradient(135deg, #6f84aa 0%, #556f94 100%);\n}\n\n/* \u2500\u2500 Content area \u2500\u2500 */\n.tc-sidebar-content {\n  flex: 1;\n  min-width: 0;\n}\n\n/* \u2500\u2500 Sidebar label \u2500\u2500 */\n.tc-sidebar-label {\n  font-size: 0.88rem;\n  font-weight: 600;\n  letter-spacing: 0.005em;\n}\n\n/* \u2500\u2500 Feature flag cards \u2500\u2500 */\n.flag-card {\n  margin-bottom: $space-3;\n}\n\n.flag-grid {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n}\n\n.flag-item {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n\n  &--child {\n    padding-left: $space-6;\n  }\n}\n\n.flag-label {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  cursor: pointer;\n  \n  strong {\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  span {\n    font-size: $font-size-xs;\n    color: $gray-500;\n  }\n}\n\n/* \u2500\u2500 Config actions \u2500\u2500 */\n.config-actions {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: $space-4;\n}\n\n/* \u2500\u2500 Animations \u2500\u2500 */\n@keyframes tc-side-breathe {\n  0%, 100% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.18),\n      0 6px 16px rgba(249, 115, 22, 0.22),\n      0 0 20px rgba(251, 146, 60, 0.12);\n  }\n  50% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.26),\n      0 8px 22px rgba(249, 115, 22, 0.30),\n      0 0 32px rgba(251, 146, 60, 0.20),\n      0 0 40px rgba(255, 255, 255, 0.06);\n  }\n}\n\n@keyframes tc-side-strip {\n  0% { background-position: 100% 0%; }\n  100% { background-position: 100% 300%; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  :host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active,\n  :host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true'],\n  :host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true'] {\n    animation: none;\n  }\n  :host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active::after,\n  :host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true']::after,\n  :host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true']::after {\n    animation: none;\n  }\n}\n\n/* Mobile: sidebar collapses to horizontal row */\n@media (max-width: 900px) {\n  :host ::ng-deep .tc-sidebar-nav.p-tablist {\n    flex-direction: row;\n    overflow-x: auto;\n    padding: 0.65rem;\n    border-radius: 14px;\n    position: static;\n  }\n\n  :host ::ng-deep .tc-sidebar-nav .p-tablist-tab-list {\n    flex-direction: row !important;\n    gap: 0.35rem;\n  }\n\n  :host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item {\n    flex: 0 0 auto;\n    padding: 0.65rem 1rem;\n  }\n\n  :host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active,\n  :host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true'],\n  :host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true'] {\n    transform: translateY(-2px);\n  }\n\n  :host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item.p-tab-active::after,\n  :host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[aria-selected='true']::after,\n  :host ::ng-deep .tc-sidebar-nav .p-tab.tc-sidebar-item[data-p-active='true']::after {\n    left: 15%;\n    right: 15%;\n    top: auto;\n    bottom: 0;\n    width: auto;\n    height: 3px;\n    border-radius: 4px 4px 0 0;\n    background: linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.2) 0%,\n      rgba(249, 115, 22, 0.95) 30%,\n      rgba(139, 92, 246, 0.95) 70%,\n      rgba(255, 255, 255, 0.2) 100%\n    );\n    background-size: 300% 100%;\n    animation: tc-side-strip-h 3s linear infinite;\n  }\n\n  .config-section-title {\n    font-size: $font-size-lg;\n  }\n}\n\n@keyframes tc-side-strip-h {\n  0% { background-position: 0% 100%; }\n  100% { background-position: 300% 100%; }\n}\n\n/* Hide PrimeNG default tab ink bar */\n:host ::ng-deep .tc-sidebar-nav .p-tablist-active-bar {\n  display: none !important;\n}\n\n/* \u2500\u2500 Form field inside flag panels \u2500\u2500 */\n.config-section .form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0 $space-4 $space-3 $space-4;\n\n  > label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: #475569;\n    min-width: 130px;\n    text-align: right;\n    flex-shrink: 0;\n  }\n\n  > p-select {\n    flex: 1;\n    min-width: 0;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ACCORDION STYLES\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.tc-config-accordion {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n:host ::ng-deep .tc-config-accordion {\n  .p-accordionpanel {\n    background: rgba(255, 255, 255, 0.85);\n    backdrop-filter: blur(20px);\n    border: 1px solid rgba(255, 255, 255, 0.3);\n    border-radius: $radius-lg;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n    overflow: hidden;\n    transition: transform 250ms, box-shadow 250ms;\n\n    &:hover {\n      transform: translateY(-2px);\n      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08);\n    }\n  }\n\n  .p-accordionheader {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: 1px solid rgba(59, 130, 246, 0.18);\n    border-left: 3px solid #3b82f6;\n    border-radius: 0 $radius-lg $radius-lg 0;\n    padding: $space-3 $space-4;\n    font-family: inherit;\n    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n    &:hover {\n      border-color: rgba(59, 130, 246, 0.35);\n      border-left-color: #2563eb;\n      background: linear-gradient(180deg, #e8f1ff 0%, #dce8f8 100%);\n      box-shadow: 0 8px 24px rgba(59, 130, 246, 0.1);\n    }\n\n    &:focus-visible {\n      outline: 2px solid rgba(59, 130, 246, 0.4);\n      outline-offset: -2px;\n      border-radius: 0 $radius-lg $radius-lg 0;\n    }\n  }\n\n  .p-accordioncontent-content {\n    padding: 0 $space-4 $space-4;\n    border-top: 1px solid rgba(0, 0, 0, 0.06);\n  }\n}\n\n.acc-header {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  width: 100%;\n\n  &__icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: 1rem;\n    color: white;\n    flex-shrink: 0;\n    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);\n\n    &--primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n    &--success { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n    &--purple  { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n    &--orange  { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }\n  }\n\n  &__text {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  &__title {\n    font-size: $font-size-md;\n    font-weight: 700;\n    color: #1e293b;\n  }\n\n  &__subtitle {\n    font-size: $font-size-xs;\n    color: #94a3b8;\n    font-weight: 400;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PRESET STYLES\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.preset-body {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.preset-actions {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  flex-wrap: wrap;\n}\n\n.preset-status {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: #22c55e;\n\n  &--applying {\n    color: #6366f1;\n  }\n}\n\n.field-hint {\n  display: block;\n  font-size: $font-size-xs;\n  color: #94a3b8;\n  line-height: 1.5;\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TenantsPage, { className: "TenantsPage", filePath: "src/app/crm/features/settings/pages/tenants.page.ts", lineNumber: 52 }); })();
