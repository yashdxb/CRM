import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TabsModule } from 'primeng/tabs';
import { TextareaModule } from 'primeng/textarea';
import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { TimeZoneService } from '../../../../core/services/time-zone.service';
import { getTimeZoneFlagUrl } from '../../../../core/models/time-zone.model';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { TenantContextService } from '../../../../core/tenant/tenant-context.service';
import { TenantBrandingService } from '../../../../core/tenant/tenant-branding.service';
import { TenantBrandingStateService } from '../../../../core/tenant/tenant-branding-state.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/accordion";
import * as i2 from "primeng/api";
import * as i3 from "primeng/button";
import * as i4 from "primeng/inputgroup";
import * as i5 from "primeng/inputgroupaddon";
import * as i6 from "primeng/inputnumber";
import * as i7 from "primeng/inputtext";
import * as i8 from "primeng/select";
import * as i9 from "@angular/forms";
import * as i10 from "primeng/tabs";
const _c0 = () => [0, 1, 2];
const _c1 = () => ({ class: "ws-sidebar-item" });
const _c2 = a0 => ({ root: a0 });
function WorkspaceSettingsPage_span_104_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 61);
    i0.ɵɵelement(1, "i", 62);
    i0.ɵɵtext(2, " Active ");
    i0.ɵɵelementEnd();
} }
function WorkspaceSettingsPage_div_105_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65);
    i0.ɵɵelement(1, "div", 66)(2, "div", 67);
    i0.ɵɵelementEnd();
} }
function WorkspaceSettingsPage_div_105_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 63);
    i0.ɵɵtemplate(1, WorkspaceSettingsPage_div_105_div_1_Template, 3, 0, "div", 64);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c0));
} }
function WorkspaceSettingsPage_form_106_Conditional_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 99);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("src", ctx_r1.brandingLogoUrl(), i0.ɵɵsanitizeUrl);
} }
function WorkspaceSettingsPage_form_106_Conditional_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 100);
    i0.ɵɵelement(1, "i", 192);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No logo uploaded");
    i0.ɵɵelementEnd()();
} }
function WorkspaceSettingsPage_form_106_button_67_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 193);
    i0.ɵɵlistener("click", function WorkspaceSettingsPage_form_106_button_67_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeLogo()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r1.brandingUploading());
} }
function WorkspaceSettingsPage_form_106_div_111_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 194)(1, "div", 195)(2, "div", 196)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 197);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "small", 93);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 198)(12, "label", 199);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(14, "input", 200);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_8_0;
    const row_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(row_r5.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", row_r5.statusTone === "success" ? "status-badge--success" : "status-badge--info");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", row_r5.statusLabel, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r5.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Generated format: prefix + six-digit sequence. Example: ", ((tmp_8_0 = ctx_r1.settingsForm.get(row_r5.prefixControlName)) == null ? null : tmp_8_0.value) || "PREFIX-", "000001");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "ws-" + row_r5.moduleKey.toLowerCase() + "-prefix");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", row_r5.label, " prefix");
    i0.ɵɵadvance();
    i0.ɵɵproperty("id", "ws-" + row_r5.moduleKey.toLowerCase() + "-prefix")("formControlName", row_r5.prefixControlName)("placeholder", row_r5.label + " prefix");
} }
function WorkspaceSettingsPage_form_106_ng_template_353_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 201);
    i0.ɵɵelement(1, "img", 202);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.getFlagUrl(option_r6 == null ? null : option_r6.flagCode), i0.ɵɵsanitizeUrl)("alt", (option_r6 == null ? null : option_r6.flagCode) ? option_r6.flagCode.toUpperCase() + " flag" : "Flag");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r6.label);
} }
function WorkspaceSettingsPage_form_106_ng_template_354_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 201);
    i0.ɵɵelement(1, "img", 202);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r1.getFlagUrl(option_r7 == null ? null : option_r7.flagCode), i0.ɵɵsanitizeUrl)("alt", (option_r7 == null ? null : option_r7.flagCode) ? option_r7.flagCode.toUpperCase() + " flag" : "Flag");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r7 == null ? null : option_r7.label);
} }
function WorkspaceSettingsPage_form_106_i_370_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 203);
} }
function WorkspaceSettingsPage_form_106_i_371_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 204);
} }
function WorkspaceSettingsPage_form_106_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 68);
    i0.ɵɵlistener("ngSubmit", function WorkspaceSettingsPage_form_106_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveSettings()); });
    i0.ɵɵelementStart(1, "p-tabs", 69);
    i0.ɵɵlistener("valueChange", function WorkspaceSettingsPage_form_106_Template_p_tabs_valueChange_1_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onActiveTabChange($event)); });
    i0.ɵɵelementStart(2, "div", 70)(3, "p-tablist", 71)(4, "p-tab", 72);
    i0.ɵɵelement(5, "i", 24);
    i0.ɵɵelementStart(6, "span", 73);
    i0.ɵɵtext(7, "Company & Branding");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "p-tab", 74);
    i0.ɵɵelement(9, "i", 32);
    i0.ɵɵelementStart(10, "span", 73);
    i0.ɵɵtext(11, "Operations");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "p-tab", 75);
    i0.ɵɵelement(13, "i", 76);
    i0.ɵɵelementStart(14, "span", 73);
    i0.ɵɵtext(15, "Regional");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "p-tabpanels", 77)(17, "p-tabpanel", 78)(18, "p-accordion", 79);
    i0.ɵɵlistener("valueChange", function WorkspaceSettingsPage_form_106_Template_p_accordion_valueChange_18_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onCompanyPanelsChange($event)); });
    i0.ɵɵelementStart(19, "p-accordion-panel", 80)(20, "p-accordion-header")(21, "div", 81)(22, "div", 82);
    i0.ɵɵelement(23, "i", 24);
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Company Information");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 83)(27, "span", 61);
    i0.ɵɵtext(28, "Required");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(29, "p-accordion-content")(30, "section", 84)(31, "p", 85);
    i0.ɵɵtext(32, "Basic workspace identity settings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "div", 86)(34, "div", 87)(35, "label", 88);
    i0.ɵɵtext(36, "Company Name ");
    i0.ɵɵelementStart(37, "span", 89);
    i0.ɵɵtext(38, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "p-inputgroup")(40, "p-inputgroup-addon", 90);
    i0.ɵɵelement(41, "i", 91);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(42, "input", 92);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "small", 93);
    i0.ɵɵtext(44, "The display name for your workspace");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(45, "p-accordion-panel", 94)(46, "p-accordion-header")(47, "div", 81)(48, "div", 82);
    i0.ɵɵelement(49, "i", 95);
    i0.ɵɵelementStart(50, "span");
    i0.ɵɵtext(51, "Workspace Branding");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(52, "div", 83)(53, "span", 96);
    i0.ɵɵtext(54, "Optional");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(55, "p-accordion-content")(56, "section", 84)(57, "p", 85);
    i0.ɵɵtext(58, "Customise logo displayed across the application");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "div", 97)(60, "div", 98);
    i0.ɵɵconditionalCreate(61, WorkspaceSettingsPage_form_106_Conditional_61_Template, 1, 1, "img", 99)(62, WorkspaceSettingsPage_form_106_Conditional_62_Template, 4, 0, "div", 100);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "div", 101)(64, "input", 102, 0);
    i0.ɵɵlistener("change", function WorkspaceSettingsPage_form_106_Template_input_change_64_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onLogoSelected($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "button", 103);
    i0.ɵɵlistener("click", function WorkspaceSettingsPage_form_106_Template_button_click_66_listener() { i0.ɵɵrestoreView(_r1); const logoInput_r3 = i0.ɵɵreference(65); return i0.ɵɵresetView(logoInput_r3.click()); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(67, WorkspaceSettingsPage_form_106_button_67_Template, 1, 1, "button", 104);
    i0.ɵɵelementStart(68, "small", 93);
    i0.ɵɵtext(69, "PNG, JPG or WebP. Max 2 MB.");
    i0.ɵɵelementEnd()()()()()()()();
    i0.ɵɵelementStart(70, "p-tabpanel", 105)(71, "p-accordion", 79);
    i0.ɵɵlistener("valueChange", function WorkspaceSettingsPage_form_106_Template_p_accordion_valueChange_71_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onOperationsPanelsChange($event)); });
    i0.ɵɵelementStart(72, "p-accordion-panel", 106)(73, "p-accordion-header")(74, "div", 81)(75, "div", 82);
    i0.ɵɵelement(76, "i", 107);
    i0.ɵɵelementStart(77, "span");
    i0.ɵɵtext(78, "Lead SLA");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(79, "div", 83)(80, "span", 108);
    i0.ɵɵtext(81, "SLA");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(82, "p-accordion-content")(83, "section", 84)(84, "p", 85);
    i0.ɵɵtext(85, "Define how quickly new leads must be contacted");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "div", 109)(87, "div", 87)(88, "label", 110);
    i0.ɵɵtext(89, "First-touch SLA (hours)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(90, "p-inputgroup")(91, "p-inputgroup-addon", 111);
    i0.ɵɵelement(92, "i", 107);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(93, "input", 112);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(94, "small", 93);
    i0.ɵɵtext(95, "Default is 24 hours. Used to create first-touch tasks and SLA alerts.");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(96, "p-accordion-panel", 113)(97, "p-accordion-header")(98, "div", 81)(99, "div", 82);
    i0.ɵɵelement(100, "i", 114);
    i0.ɵɵelementStart(101, "span");
    i0.ɵɵtext(102, "Record Numbering");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(103, "div", 83)(104, "span", 96);
    i0.ɵɵtext(105, "Prefixes");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(106, "p-accordion-content")(107, "section", 84)(108, "p", 85);
    i0.ɵɵtext(109, "Define tenant-level prefixes for business-facing CRM record numbers. Leads are active now; other modules can be prepared in advance.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(110, "div", 86);
    i0.ɵɵtemplate(111, WorkspaceSettingsPage_form_106_div_111_Template, 15, 10, "div", 115);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(112, "p-accordion-panel", 116)(113, "p-accordion-header")(114, "div", 81)(115, "div", 82);
    i0.ɵɵelement(116, "i", 33);
    i0.ɵɵelementStart(117, "span");
    i0.ɵɵtext(118, "AI Action Scoring");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(119, "div", 83)(120, "span", 96);
    i0.ɵɵtext(121, "Weights & Thresholds");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(122, "p-accordion-content")(123, "section", 117)(124, "p", 85);
    i0.ɵɵtext(125, " The AI scores each category as ");
    i0.ɵɵelementStart(126, "strong");
    i0.ɵɵtext(127, "weight \u00D7 count");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(128, " (0\u2013100). The resulting score determines Risk and Urgency tiers below. ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(129, "div", 118)(130, "div", 119);
    i0.ɵɵelement(131, "i", 120);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(132, "div", 121)(133, "span", 122);
    i0.ɵɵtext(134, "How scoring works");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(135, "span", 123);
    i0.ɵɵtext(136, " Score = Weight \u00D7 Item Count\u00A0\u00A0\u2192\u00A0\u00A0e.g. ");
    i0.ɵɵelementStart(137, "strong");
    i0.ɵɵtext(138, "3");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(139, " SLA breaches \u00D7 ");
    i0.ɵɵelementStart(140, "strong");
    i0.ɵɵtext(141);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(142, " weight = ");
    i0.ɵɵelementStart(143, "strong");
    i0.ɵɵtext(144);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(145, " \u2192 ");
    i0.ɵɵelementStart(146, "span", 124);
    i0.ɵɵtext(147);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(148, "h4", 125);
    i0.ɵɵelement(149, "i", 126);
    i0.ɵɵtext(150, " Category Weights ");
    i0.ɵɵelementStart(151, "span", 127);
    i0.ɵɵtext(152, "Multiplier applied to each item count");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(153, "div", 128)(154, "div", 129)(155, "div", 130);
    i0.ɵɵelement(156, "i", 131);
    i0.ɵɵelementStart(157, "div")(158, "span", 132);
    i0.ɵɵtext(159, "SLA Breaches");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(160, "span", 133);
    i0.ɵɵtext(161, "Overdue response time violations");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(162, "div", 87)(163, "label", 134);
    i0.ɵɵtext(164, "Weight");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(165, "p-inputNumber", 135);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(166, "div", 129)(167, "div", 130);
    i0.ɵɵelement(168, "i", 136);
    i0.ɵɵelementStart(169, "div")(170, "span", 132);
    i0.ɵɵtext(171, "Stale Opportunities");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(172, "span", 133);
    i0.ɵɵtext(173, "Open deals with no recent activity");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(174, "div", 87)(175, "label", 137);
    i0.ɵɵtext(176, "Weight");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(177, "p-inputNumber", 138);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(178, "div", 129)(179, "div", 130);
    i0.ɵɵelement(180, "i", 139);
    i0.ɵɵelementStart(181, "div")(182, "span", 132);
    i0.ɵɵtext(183, "Pending Approvals");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(184, "span", 133);
    i0.ɵɵtext(185, "Awaiting manager sign-off");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(186, "div", 87)(187, "label", 140);
    i0.ɵɵtext(188, "Weight");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(189, "p-inputNumber", 141);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(190, "div", 129)(191, "div", 130);
    i0.ɵɵelement(192, "i", 142);
    i0.ɵɵelementStart(193, "div")(194, "span", 132);
    i0.ɵɵtext(195, "Low-Confidence Leads");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(196, "span", 133);
    i0.ɵɵtext(197, "AI-scored leads below confidence threshold");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(198, "div", 87)(199, "label", 143);
    i0.ɵɵtext(200, "Weight");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(201, "p-inputNumber", 144);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(202, "div", 129)(203, "div", 130);
    i0.ɵɵelement(204, "i", 145);
    i0.ɵɵelementStart(205, "div")(206, "span", 132);
    i0.ɵɵtext(207, "Overdue Activities");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(208, "span", 133);
    i0.ɵɵtext(209, "Tasks and follow-ups past due date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(210, "div", 87)(211, "label", 146);
    i0.ɵɵtext(212, "Weight");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(213, "p-inputNumber", 147);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(214, "h4", 125);
    i0.ɵɵelement(215, "i", 18);
    i0.ɵɵtext(216, " Risk Thresholds ");
    i0.ɵɵelementStart(217, "span", 127);
    i0.ɵɵtext(218, "Score ranges that determine risk tier");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(219, "div", 148)(220, "div", 149)(221, "div", 150)(222, "span", 151);
    i0.ɵɵtext(223, "Low");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(224, "span", 152);
    i0.ɵɵtext(225);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(226, "div", 153)(227, "span", 151);
    i0.ɵɵtext(228, "Medium");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(229, "span", 152);
    i0.ɵɵtext(230);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(231, "div", 154)(232, "span", 151);
    i0.ɵɵtext(233, "High");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(234, "span", 152);
    i0.ɵɵtext(235);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(236, "div", 109)(237, "div", 87)(238, "label", 155);
    i0.ɵɵtext(239, "Medium risk starts at");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(240, "p-inputNumber", 156);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(241, "div", 87)(242, "label", 157);
    i0.ɵɵtext(243, "High risk starts at");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(244, "p-inputNumber", 158);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(245, "h4", 125);
    i0.ɵɵelement(246, "i", 159);
    i0.ɵɵtext(247, " Urgency Thresholds ");
    i0.ɵɵelementStart(248, "span", 127);
    i0.ɵɵtext(249, "Score ranges that determine urgency level");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(250, "div", 148)(251, "div", 149)(252, "div", 160)(253, "span", 151);
    i0.ɵɵtext(254, "Normal");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(255, "span", 152);
    i0.ɵɵtext(256);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(257, "div", 161)(258, "span", 151);
    i0.ɵɵtext(259, "Soon");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(260, "span", 152);
    i0.ɵɵtext(261);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(262, "div", 162)(263, "span", 151);
    i0.ɵɵtext(264, "Immediate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(265, "span", 152);
    i0.ɵɵtext(266);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(267, "div", 109)(268, "div", 87)(269, "label", 163);
    i0.ɵɵtext(270, "Soon urgency starts at");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(271, "p-inputNumber", 164);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(272, "div", 87)(273, "label", 165);
    i0.ɵɵtext(274, "Immediate urgency starts at");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(275, "p-inputNumber", 166);
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(276, "p-accordion-panel", 167)(277, "p-accordion-header")(278, "div", 81)(279, "div", 82);
    i0.ɵɵelement(280, "i", 168);
    i0.ɵɵelementStart(281, "span");
    i0.ɵɵtext(282, "Supporting Documents");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(283, "div", 83)(284, "span", 108);
    i0.ɵɵtext(285, "Limits");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(286, "p-accordion-content")(287, "section", 84)(288, "p", 85);
    i0.ɵɵtext(289, "Global document limits for CRM records (lead-first rollout)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(290, "div", 109)(291, "div", 87)(292, "label", 169);
    i0.ɵɵtext(293, "Max documents per record");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(294, "p-inputNumber", 170);
    i0.ɵɵelementStart(295, "small", 93);
    i0.ɵɵtext(296, "Default is 10. Applies when uploading supporting documents to CRM records.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(297, "div", 87)(298, "label", 171);
    i0.ɵɵtext(299, "Max file size (MB)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(300, "p-inputNumber", 172);
    i0.ɵɵelementStart(301, "small", 93);
    i0.ɵɵtext(302, "Allowed formats are PDF, Office documents, and images.");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(303, "p-accordion-panel", 173)(304, "p-accordion-header")(305, "div", 81)(306, "div", 82);
    i0.ɵɵelement(307, "i", 174);
    i0.ɵɵelementStart(308, "span");
    i0.ɵɵtext(309, "Delivery & Renewal Defaults");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(310, "div", 83)(311, "span", 96);
    i0.ɵɵtext(312, "Defaults");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(313, "p-accordion-content")(314, "section", 84)(315, "p", 85);
    i0.ɵɵtext(316, "Defaults applied when a deal is closed won");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(317, "div", 109)(318, "div", 87)(319, "label", 175);
    i0.ɵɵtext(320, "Default contract term (months)");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(321, "p-inputNumber", 176);
    i0.ɵɵelementStart(322, "small", 93);
    i0.ɵɵtext(323, "Used to set renewal date if contract end is missing.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(324, "div", 87)(325, "label", 177);
    i0.ɵɵtext(326, "Default delivery owner role");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(327, "p-select", 178);
    i0.ɵɵelementStart(328, "small", 93);
    i0.ɵɵtext(329, "Assigns delivery ownership when a deal closes.");
    i0.ɵɵelementEnd()()()()()()()();
    i0.ɵɵelementStart(330, "p-tabpanel", 179)(331, "p-accordion", 79);
    i0.ɵɵlistener("valueChange", function WorkspaceSettingsPage_form_106_Template_p_accordion_valueChange_331_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onRegionalPanelsChange($event)); });
    i0.ɵɵelementStart(332, "p-accordion-panel", 180)(333, "p-accordion-header")(334, "div", 81)(335, "div", 82);
    i0.ɵɵelement(336, "i", 76);
    i0.ɵɵelementStart(337, "span");
    i0.ɵɵtext(338, "Regional Settings");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(339, "div", 83)(340, "span", 96);
    i0.ɵɵtext(341, "Locale");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(342, "p-accordion-content")(343, "section", 84)(344, "p", 85);
    i0.ɵɵtext(345, "Time zone and currency preferences");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(346, "div", 109)(347, "div", 87)(348, "label", 181);
    i0.ɵɵtext(349, "Time Zone ");
    i0.ɵɵelementStart(350, "span", 89);
    i0.ɵɵtext(351, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(352, "p-select", 182);
    i0.ɵɵtemplate(353, WorkspaceSettingsPage_form_106_ng_template_353_Template, 4, 3, "ng-template", 183)(354, WorkspaceSettingsPage_form_106_ng_template_354_Template, 4, 3, "ng-template", 184);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(355, "small", 93);
    i0.ɵɵtext(356, "Used for date/time display across the system");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(357, "div", 87)(358, "label", 185);
    i0.ɵɵtext(359, "Currency ");
    i0.ɵɵelementStart(360, "span", 89);
    i0.ɵɵtext(361, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(362, "p-select", 186);
    i0.ɵɵelementStart(363, "small", 93);
    i0.ɵɵtext(364, "Default currency for monetary values");
    i0.ɵɵelementEnd()()()()()()()()()()();
    i0.ɵɵelementStart(365, "div", 187)(366, "button", 188);
    i0.ɵɵlistener("click", function WorkspaceSettingsPage_form_106_Template_button_click_366_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadSettings()); });
    i0.ɵɵelement(367, "i", 20);
    i0.ɵɵtext(368, " Reset ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(369, "button", 189);
    i0.ɵɵtemplate(370, WorkspaceSettingsPage_form_106_i_370_Template, 1, 0, "i", 190)(371, WorkspaceSettingsPage_form_106_i_371_Template, 1, 0, "i", 191);
    i0.ɵɵtext(372);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_15_0;
    let tmp_16_0;
    let tmp_17_0;
    let tmp_18_0;
    let tmp_19_0;
    let tmp_20_0;
    let tmp_31_0;
    let tmp_32_0;
    let tmp_33_0;
    let tmp_34_0;
    let tmp_35_0;
    let tmp_36_0;
    let tmp_41_0;
    let tmp_42_0;
    let tmp_43_0;
    let tmp_44_0;
    let tmp_45_0;
    let tmp_46_0;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.settingsForm);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r1.activeTab());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("pt", i0.ɵɵpureFunction1(79, _c2, i0.ɵɵpureFunction0(78, _c1)));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pt", i0.ɵɵpureFunction1(82, _c2, i0.ɵɵpureFunction0(81, _c1)));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pt", i0.ɵɵpureFunction1(85, _c2, i0.ɵɵpureFunction0(84, _c1)));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("multiple", true)("value", ctx_r1.companyPanels());
    i0.ɵɵadvance(43);
    i0.ɵɵconditional(ctx_r1.brandingLogoUrl() ? 61 : 62);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r1.brandingUploading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.brandingLogoUrl());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("multiple", true)("value", ctx_r1.operationsPanels());
    i0.ɵɵadvance(40);
    i0.ɵɵproperty("ngForOf", ctx_r1.recordNumberingRows);
    i0.ɵɵadvance(30);
    i0.ɵɵtextInterpolate((tmp_15_0 = ctx_r1.settingsForm.get("scoreWeightSlaBreaches")) == null ? null : tmp_15_0.value);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(3 * (((tmp_16_0 = ctx_r1.settingsForm.get("scoreWeightSlaBreaches")) == null ? null : tmp_16_0.value) || 0));
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("scoring-tag--low", 3 * (((tmp_17_0 = ctx_r1.settingsForm.get("scoreWeightSlaBreaches")) == null ? null : tmp_17_0.value) || 0) < (((tmp_17_0 = ctx_r1.settingsForm.get("scoreMediumRiskFrom")) == null ? null : tmp_17_0.value) || 45))("scoring-tag--medium", 3 * (((tmp_18_0 = ctx_r1.settingsForm.get("scoreWeightSlaBreaches")) == null ? null : tmp_18_0.value) || 0) >= (((tmp_18_0 = ctx_r1.settingsForm.get("scoreMediumRiskFrom")) == null ? null : tmp_18_0.value) || 45) && 3 * (((tmp_18_0 = ctx_r1.settingsForm.get("scoreWeightSlaBreaches")) == null ? null : tmp_18_0.value) || 0) < (((tmp_18_0 = ctx_r1.settingsForm.get("scoreHighRiskFrom")) == null ? null : tmp_18_0.value) || 75))("scoring-tag--high", 3 * (((tmp_19_0 = ctx_r1.settingsForm.get("scoreWeightSlaBreaches")) == null ? null : tmp_19_0.value) || 0) >= (((tmp_19_0 = ctx_r1.settingsForm.get("scoreHighRiskFrom")) == null ? null : tmp_19_0.value) || 75));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", 3 * (((tmp_20_0 = ctx_r1.settingsForm.get("scoreWeightSlaBreaches")) == null ? null : tmp_20_0.value) || 0) < (((tmp_20_0 = ctx_r1.settingsForm.get("scoreMediumRiskFrom")) == null ? null : tmp_20_0.value) || 45) ? "Low" : 3 * (((tmp_20_0 = ctx_r1.settingsForm.get("scoreWeightSlaBreaches")) == null ? null : tmp_20_0.value) || 0) < (((tmp_20_0 = ctx_r1.settingsForm.get("scoreHighRiskFrom")) == null ? null : tmp_20_0.value) || 75) ? "Medium" : "High", " Risk ");
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("min", 0)("max", 100);
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("min", 0)("max", 100);
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("min", 0)("max", 100);
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("min", 0)("max", 100);
    i0.ɵɵadvance(12);
    i0.ɵɵproperty("min", 0)("max", 100);
    i0.ɵɵadvance(8);
    i0.ɵɵstyleProp("width", ((tmp_31_0 = ctx_r1.settingsForm.get("scoreMediumRiskFrom")) == null ? null : tmp_31_0.value) || 45, "%");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("0 \u2013 ", (((tmp_32_0 = ctx_r1.settingsForm.get("scoreMediumRiskFrom")) == null ? null : tmp_32_0.value) || 45) - 1);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("width", (((tmp_33_0 = ctx_r1.settingsForm.get("scoreHighRiskFrom")) == null ? null : tmp_33_0.value) || 75) - (((tmp_33_0 = ctx_r1.settingsForm.get("scoreMediumRiskFrom")) == null ? null : tmp_33_0.value) || 45), "%");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", ((tmp_34_0 = ctx_r1.settingsForm.get("scoreMediumRiskFrom")) == null ? null : tmp_34_0.value) || 45, " \u2013 ", (((tmp_34_0 = ctx_r1.settingsForm.get("scoreHighRiskFrom")) == null ? null : tmp_34_0.value) || 75) - 1);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("width", 100 - (((tmp_35_0 = ctx_r1.settingsForm.get("scoreHighRiskFrom")) == null ? null : tmp_35_0.value) || 75), "%");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ((tmp_36_0 = ctx_r1.settingsForm.get("scoreHighRiskFrom")) == null ? null : tmp_36_0.value) || 75, " \u2013 100");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("min", 1)("max", 95);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("min", 5)("max", 99);
    i0.ɵɵadvance(8);
    i0.ɵɵstyleProp("width", ((tmp_41_0 = ctx_r1.settingsForm.get("scoreSoonUrgencyFrom")) == null ? null : tmp_41_0.value) || 50, "%");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("0 \u2013 ", (((tmp_42_0 = ctx_r1.settingsForm.get("scoreSoonUrgencyFrom")) == null ? null : tmp_42_0.value) || 50) - 1);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("width", (((tmp_43_0 = ctx_r1.settingsForm.get("scoreImmediateUrgencyFrom")) == null ? null : tmp_43_0.value) || 80) - (((tmp_43_0 = ctx_r1.settingsForm.get("scoreSoonUrgencyFrom")) == null ? null : tmp_43_0.value) || 50), "%");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("", ((tmp_44_0 = ctx_r1.settingsForm.get("scoreSoonUrgencyFrom")) == null ? null : tmp_44_0.value) || 50, " \u2013 ", (((tmp_44_0 = ctx_r1.settingsForm.get("scoreImmediateUrgencyFrom")) == null ? null : tmp_44_0.value) || 80) - 1);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("width", 100 - (((tmp_45_0 = ctx_r1.settingsForm.get("scoreImmediateUrgencyFrom")) == null ? null : tmp_45_0.value) || 80), "%");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("", ((tmp_46_0 = ctx_r1.settingsForm.get("scoreImmediateUrgencyFrom")) == null ? null : tmp_46_0.value) || 80, " \u2013 100");
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("min", 1)("max", 95);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("min", 5)("max", 99);
    i0.ɵɵadvance(19);
    i0.ɵɵproperty("min", 1)("max", 100);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("min", 1)("max", 100);
    i0.ɵɵadvance(21);
    i0.ɵɵproperty("min", 1)("max", 120);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("options", ctx_r1.roleOptions())("showClear", true);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("multiple", true)("value", ctx_r1.regionalPanels());
    i0.ɵɵadvance(21);
    i0.ɵɵproperty("options", ctx_r1.timeZoneOptions)("filter", true);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("options", ctx_r1.currencyOptions);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.loading());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || !ctx_r1.canManageAdmin());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Saving..." : "Save Settings", " ");
} }
function WorkspaceSettingsPage_aside_107_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "aside", 205)(1, "div", 206)(2, "div", 207);
    i0.ɵɵelement(3, "i", 208);
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5, "Live Preview");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 61);
    i0.ɵɵtext(7, "Active");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 209)(9, "div", 210);
    i0.ɵɵelement(10, "i", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 211)(12, "span", 212);
    i0.ɵɵtext(13, "Workspace");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "strong", 213);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "div", 214)(17, "div", 215)(18, "div", 216);
    i0.ɵɵelement(19, "i", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div")(21, "span", 217);
    i0.ɵɵtext(22, "Time Zone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "strong", 218);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 215)(26, "div", 219);
    i0.ɵɵelement(27, "i", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div")(29, "span", 217);
    i0.ɵɵtext(30, "Currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "strong", 218);
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(33, "div", 220);
    i0.ɵɵelement(34, "i", 221);
    i0.ɵɵelementStart(35, "span");
    i0.ɵɵtext(36, "These defaults apply to new records and pipeline metrics.");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(15);
    i0.ɵɵtextInterpolate(ctx_r1.settingsForm.value.name || "Untitled workspace");
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r1.settingsForm.value.timeZone || "UTC");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.currentCurrency());
} }
export class WorkspaceSettingsPage {
    settingsService = inject(WorkspaceSettingsService);
    userAdminData = inject(UserAdminDataService);
    toastService = inject(AppToastService);
    fb = inject(FormBuilder);
    timeZoneService = inject(TimeZoneService);
    referenceData = inject(ReferenceDataService);
    tenantContext = inject(TenantContextService);
    brandingService = inject(TenantBrandingService);
    brandingState = inject(TenantBrandingStateService);
    activeTab = signal('company', ...(ngDevMode ? [{ debugName: "activeTab" }] : []));
    // Accordion panel states – all expanded by default
    companyPanels = signal(['company-info', 'workspace-branding'], ...(ngDevMode ? [{ debugName: "companyPanels" }] : []));
    operationsPanels = signal(['lead-sla', 'record-numbering', 'ai-scoring', 'supporting-docs', 'delivery-renewal'], ...(ngDevMode ? [{ debugName: "operationsPanels" }] : []));
    regionalPanels = signal(['regional-settings'], ...(ngDevMode ? [{ debugName: "regionalPanels" }] : []));
    brandingLogoUrl = this.brandingState.logoUrl;
    brandingUploading = signal(false, ...(ngDevMode ? [{ debugName: "brandingUploading" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    canManageAdmin = signal(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage), ...(ngDevMode ? [{ debugName: "canManageAdmin" }] : []));
    roles = signal([], ...(ngDevMode ? [{ debugName: "roles" }] : []));
    effectiveFeatureFlags = signal({}, ...(ngDevMode ? [{ debugName: "effectiveFeatureFlags" }] : []));
    latestSettings = null;
    // Shared time zone catalog keeps labels and flags consistent across settings screens.
    timeZoneOptions = [];
    getFlagUrl = getTimeZoneFlagUrl;
    currencyOptions = [];
    verticalPresetOptions = [
        { label: 'Core CRM', value: 'CoreCRM' },
        { label: 'Real Estate Brokerage', value: 'RealEstateBrokerage' }
    ];
    activeVerticalPresetConfiguration = signal(null, ...(ngDevMode ? [{ debugName: "activeVerticalPresetConfiguration" }] : []));
    presetApplying = signal(false, ...(ngDevMode ? [{ debugName: "presetApplying" }] : []));
    presetApplied = computed(() => !!this.activeVerticalPresetConfiguration(), ...(ngDevMode ? [{ debugName: "presetApplied" }] : []));
    reportDesignerPermissionOptions = [
        { label: 'Admins Only (Administration Manage)', value: 'Permissions.Administration.Manage' },
        { label: 'Reports Design Permission', value: 'Permissions.Reports.Design' },
        { label: 'Reports Manage Permission', value: 'Permissions.Reports.Manage' },
        { label: 'Reports View Permission', value: 'Permissions.Reports.View' }
    ];
    settingsForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(120)]],
        timeZone: ['UTC', [Validators.required]],
        currency: ['', [Validators.required]],
        industryPreset: ['CoreCRM', [Validators.required]],
        leadFirstTouchSlaHours: [24, [Validators.min(1), Validators.max(168)]],
        defaultContractTermMonths: [12, [Validators.min(1), Validators.max(120)]],
        defaultDeliveryOwnerRoleId: [null],
        scoreWeightSlaBreaches: [14, [Validators.min(0), Validators.max(100)]],
        scoreWeightStaleOpportunities: [12, [Validators.min(0), Validators.max(100)]],
        scoreWeightPendingApprovals: [17, [Validators.min(0), Validators.max(100)]],
        scoreWeightLowConfidenceLeads: [9, [Validators.min(0), Validators.max(100)]],
        scoreWeightOverdueActivities: [11, [Validators.min(0), Validators.max(100)]],
        scoreMediumRiskFrom: [45, [Validators.min(1), Validators.max(95)]],
        scoreHighRiskFrom: [75, [Validators.min(5), Validators.max(99)]],
        scoreSoonUrgencyFrom: [50, [Validators.min(1), Validators.max(95)]],
        scoreImmediateUrgencyFrom: [80, [Validators.min(5), Validators.max(99)]],
        supportingDocsMaxPerRecord: [10, [Validators.min(1), Validators.max(100)]],
        supportingDocsMaxFileSizeMb: [10, [Validators.min(1), Validators.max(100)]],
        recordNumberPrefixLeads: ['LEA-', [Validators.required, Validators.maxLength(12)]],
        recordNumberPrefixDeals: ['DEAL-', [Validators.required, Validators.maxLength(12)]],
        recordNumberPrefixCustomers: ['CUS-', [Validators.required, Validators.maxLength(12)]],
        featureProperties: [false],
        featureMarketingCampaigns: [false],
        featureAuthEntra: [false],
        featureRealtimeDashboard: [false],
        featureRealtimePipeline: [false],
        featureRealtimeEntityCrud: [false],
        featureRealtimeImportProgress: [false],
        featureRealtimeRecordPresence: [false],
        featureRealtimeAssistantStreaming: [false],
        featureAiKnowledgeSearch: [true],
        featureHelpDeskCases: [false],
        featureHelpDeskEmailIntake: [false],
        featureHelpDeskRealtime: [false],
        featureEmailDelivery: [false],
        featureEmailDeliveryInvites: [false],
        featureEmailDeliverySecurity: [false],
        featureEmailDeliveryApprovals: [false],
        featureEmailDeliveryProposals: [false],
        featureEmailDeliveryMarketing: [false],
        featureEmailDeliveryNotifications: [false],
        featureEmailDeliveryMailbox: [false],
        featureEmailDeliveryStatusNotifications: [false],
        reportDesignerRequiredPermission: ['Permissions.Administration.Manage']
    });
    emailDeliveryOptions = [
        { controlName: 'featureEmailDeliveryInvites', inputId: 'ws-email-delivery-invites', label: 'Invite emails' },
        { controlName: 'featureEmailDeliverySecurity', inputId: 'ws-email-delivery-security', label: 'Password and security emails' },
        { controlName: 'featureEmailDeliveryApprovals', inputId: 'ws-email-delivery-approvals', label: 'Approval and workflow emails' },
        { controlName: 'featureEmailDeliveryProposals', inputId: 'ws-email-delivery-proposals', label: 'Proposal and quote emails' },
        { controlName: 'featureEmailDeliveryMarketing', inputId: 'ws-email-delivery-marketing', label: 'Marketing campaign emails' },
        { controlName: 'featureEmailDeliveryNotifications', inputId: 'ws-email-delivery-notifications', label: 'Alert and notification emails' },
        { controlName: 'featureEmailDeliveryMailbox', inputId: 'ws-email-delivery-mailbox', label: 'Mailbox and manual send actions' }
    ];
    recordNumberingRows = [
        {
            moduleKey: 'Leads',
            label: 'Leads',
            description: 'Generated immediately when a lead is created.',
            statusLabel: 'Active now',
            statusTone: 'success',
            prefixControlName: 'recordNumberPrefixLeads'
        },
        {
            moduleKey: 'Deals',
            label: 'Deals',
            description: 'Prefix can be prepared now and activated when deal numbering is enabled.',
            statusLabel: 'Prepared',
            statusTone: 'contrast',
            prefixControlName: 'recordNumberPrefixDeals'
        },
        {
            moduleKey: 'Customers',
            label: 'Customers',
            description: 'Prefix can be prepared now and activated when customer numbering is enabled.',
            statusLabel: 'Prepared',
            statusTone: 'contrast',
            prefixControlName: 'recordNumberPrefixCustomers'
        }
    ];
    constructor() {
        this.settingsForm.get('featureEmailDelivery')?.valueChanges.subscribe((enabled) => {
            if (enabled) {
                const emailControls = [
                    'featureEmailDeliveryInvites',
                    'featureEmailDeliverySecurity',
                    'featureEmailDeliveryApprovals',
                    'featureEmailDeliveryProposals',
                    'featureEmailDeliveryMarketing',
                    'featureEmailDeliveryNotifications',
                    'featureEmailDeliveryMailbox'
                ];
                const hasEnabledChild = emailControls.some((controlName) => !!this.settingsForm.get(controlName)?.value);
                if (!hasEnabledChild) {
                    this.settingsForm.patchValue({
                        featureEmailDeliveryMailbox: true,
                        featureEmailDeliveryStatusNotifications: true
                    }, { emitEvent: false });
                }
                return;
            }
            this.settingsForm.patchValue({
                featureEmailDeliveryInvites: false,
                featureEmailDeliverySecurity: false,
                featureEmailDeliveryApprovals: false,
                featureEmailDeliveryProposals: false,
                featureEmailDeliveryMarketing: false,
                featureEmailDeliveryNotifications: false,
                featureEmailDeliveryMailbox: false,
                featureEmailDeliveryStatusNotifications: false
            }, { emitEvent: false });
        });
        this.timeZoneService.getTimeZones().subscribe((options) => {
            this.timeZoneOptions = options;
        });
        this.loadCurrencies();
        this.loadRoles();
        this.loadTenantContext();
        this.loadSettings();
    }
    emailDeliveryEnabled() {
        return !!this.settingsForm.get('featureEmailDelivery')?.value;
    }
    onActiveTabChange(tab) {
        if (typeof tab === 'string') {
            this.activeTab.set(tab);
        }
    }
    onCompanyPanelsChange(v) { this.companyPanels.set((v ?? [])); }
    onOperationsPanelsChange(v) { this.operationsPanels.set((v ?? [])); }
    onRegionalPanelsChange(v) { this.regionalPanels.set((v ?? [])); }
    loadSettings() {
        this.loading.set(true);
        this.settingsService.getSettings().subscribe({
            next: (settings) => {
                this.applySettings(settings);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.raiseToast('error', 'Unable to load workspace settings');
            }
        });
    }
    saveSettings() {
        if (this.settingsForm.invalid) {
            this.settingsForm.markAllAsTouched();
            return;
        }
        const payload = this.settingsForm.getRawValue();
        const safePayload = {
            ...payload,
            name: payload.name ?? '',
            timeZone: payload.timeZone ?? 'UTC',
            currency: this.resolveCurrency(payload.currency ?? null),
            industryPreset: payload.industryPreset ?? 'CoreCRM',
            leadFirstTouchSlaHours: payload.leadFirstTouchSlaHours ?? 24,
            defaultContractTermMonths: payload.defaultContractTermMonths ?? 12,
            defaultDeliveryOwnerRoleId: payload.defaultDeliveryOwnerRoleId ?? null,
            assistantActionScoringPolicy: {
                weights: {
                    slaBreaches: Number(payload.scoreWeightSlaBreaches ?? 14),
                    staleOpportunities: Number(payload.scoreWeightStaleOpportunities ?? 12),
                    pendingApprovals: Number(payload.scoreWeightPendingApprovals ?? 17),
                    lowConfidenceLeads: Number(payload.scoreWeightLowConfidenceLeads ?? 9),
                    overdueActivities: Number(payload.scoreWeightOverdueActivities ?? 11)
                },
                thresholds: {
                    mediumRiskFrom: Number(payload.scoreMediumRiskFrom ?? 45),
                    highRiskFrom: Number(payload.scoreHighRiskFrom ?? 75),
                    soonUrgencyFrom: Number(payload.scoreSoonUrgencyFrom ?? 50),
                    immediateUrgencyFrom: Number(payload.scoreImmediateUrgencyFrom ?? 80)
                }
            },
            supportingDocumentPolicy: {
                maxDocumentsPerRecord: Number(payload.supportingDocsMaxPerRecord ?? 10),
                maxFileSizeMb: Number(payload.supportingDocsMaxFileSizeMb ?? 10),
                allowedExtensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.png', '.jpg', '.jpeg', '.webp']
            },
            recordNumberingPolicies: this.buildRecordNumberingPolicies(payload),
            featureFlags: {
                properties: !!payload.featureProperties,
                'marketing.campaigns': !!payload.featureMarketingCampaigns,
                'auth.entra': !!payload.featureAuthEntra,
                'realtime.dashboard': !!payload.featureRealtimeDashboard,
                'realtime.pipeline': !!payload.featureRealtimePipeline,
                'realtime.entityCrud': !!payload.featureRealtimeEntityCrud,
                'realtime.importProgress': !!payload.featureRealtimeImportProgress,
                'realtime.recordPresence': !!payload.featureRealtimeRecordPresence,
                'realtime.assistantStreaming': !!payload.featureRealtimeAssistantStreaming,
                'ai.knowledgeSearch': !!payload.featureAiKnowledgeSearch,
                'helpdesk.cases': !!payload.featureHelpDeskCases,
                'helpdesk.emailIntake': !!payload.featureHelpDeskEmailIntake,
                'helpdesk.realtime': !!payload.featureHelpDeskRealtime,
                'communications.emailDelivery': !!payload.featureEmailDelivery,
                'communications.emailDelivery.invites': !!payload.featureEmailDeliveryInvites,
                'communications.emailDelivery.security': !!payload.featureEmailDeliverySecurity,
                'communications.emailDelivery.approvals': !!payload.featureEmailDeliveryApprovals,
                'communications.emailDelivery.proposals': !!payload.featureEmailDeliveryProposals,
                'communications.emailDelivery.marketing': !!payload.featureEmailDeliveryMarketing,
                'communications.emailDelivery.notifications': !!payload.featureEmailDeliveryNotifications,
                'communications.emailDelivery.mailbox': !!payload.featureEmailDeliveryMailbox,
                'communications.emailDelivery.statusNotifications': !!payload.featureEmailDeliveryStatusNotifications
            },
            reportDesignerRequiredPermission: payload.reportDesignerRequiredPermission || null
        };
        this.saving.set(true);
        this.settingsService.updateSettings(safePayload).subscribe({
            next: (settings) => {
                this.saving.set(false);
                this.applySettings(settings);
                this.raiseToast('success', 'Workspace updated');
            },
            error: () => {
                this.saving.set(false);
                this.raiseToast('error', 'Unable to save workspace settings');
            }
        });
    }
    applySettings(settings) {
        this.latestSettings = settings;
        this.settingsForm.patchValue({
            name: settings.name,
            timeZone: settings.timeZone,
            currency: this.resolveCurrency(settings.currency ?? null),
            industryPreset: settings.industryPreset || settings.verticalPresetConfiguration?.presetId || 'CoreCRM',
            leadFirstTouchSlaHours: settings.leadFirstTouchSlaHours ?? 24,
            defaultContractTermMonths: settings.defaultContractTermMonths ?? 12,
            defaultDeliveryOwnerRoleId: settings.defaultDeliveryOwnerRoleId ?? null,
            scoreWeightSlaBreaches: settings.assistantActionScoringPolicy?.weights?.slaBreaches ?? 14,
            scoreWeightStaleOpportunities: settings.assistantActionScoringPolicy?.weights?.staleOpportunities ?? 12,
            scoreWeightPendingApprovals: settings.assistantActionScoringPolicy?.weights?.pendingApprovals ?? 17,
            scoreWeightLowConfidenceLeads: settings.assistantActionScoringPolicy?.weights?.lowConfidenceLeads ?? 9,
            scoreWeightOverdueActivities: settings.assistantActionScoringPolicy?.weights?.overdueActivities ?? 11,
            scoreMediumRiskFrom: settings.assistantActionScoringPolicy?.thresholds?.mediumRiskFrom ?? 45,
            scoreHighRiskFrom: settings.assistantActionScoringPolicy?.thresholds?.highRiskFrom ?? 75,
            scoreSoonUrgencyFrom: settings.assistantActionScoringPolicy?.thresholds?.soonUrgencyFrom ?? 50,
            scoreImmediateUrgencyFrom: settings.assistantActionScoringPolicy?.thresholds?.immediateUrgencyFrom ?? 80,
            supportingDocsMaxPerRecord: settings.supportingDocumentPolicy?.maxDocumentsPerRecord ?? 10,
            supportingDocsMaxFileSizeMb: settings.supportingDocumentPolicy?.maxFileSizeMb ?? 10,
            recordNumberPrefixLeads: this.resolveRecordNumberingPolicy(settings.recordNumberingPolicies, 'Leads', 'LEA-').prefix,
            recordNumberPrefixDeals: this.resolveRecordNumberingPolicy(settings.recordNumberingPolicies, 'Deals', 'DEAL-').prefix,
            recordNumberPrefixCustomers: this.resolveRecordNumberingPolicy(settings.recordNumberingPolicies, 'Customers', 'CUS-').prefix,
            featureProperties: this.resolveFeatureFlag(settings.featureFlags, 'properties'),
            featureMarketingCampaigns: this.resolveFeatureFlag(settings.featureFlags, 'marketing.campaigns'),
            featureAuthEntra: this.resolveFeatureFlag(settings.featureFlags, 'auth.entra'),
            featureRealtimeDashboard: this.resolveFeatureFlag(settings.featureFlags, 'realtime.dashboard'),
            featureRealtimePipeline: this.resolveFeatureFlag(settings.featureFlags, 'realtime.pipeline'),
            featureRealtimeEntityCrud: this.resolveFeatureFlag(settings.featureFlags, 'realtime.entityCrud'),
            featureRealtimeImportProgress: this.resolveFeatureFlag(settings.featureFlags, 'realtime.importProgress'),
            featureRealtimeRecordPresence: this.resolveFeatureFlag(settings.featureFlags, 'realtime.recordPresence'),
            featureRealtimeAssistantStreaming: this.resolveFeatureFlag(settings.featureFlags, 'realtime.assistantStreaming'),
            featureAiKnowledgeSearch: this.resolveFeatureFlag(settings.featureFlags, 'ai.knowledgeSearch', true),
            featureHelpDeskCases: this.resolveFeatureFlag(settings.featureFlags, 'helpdesk.cases'),
            featureHelpDeskEmailIntake: this.resolveFeatureFlag(settings.featureFlags, 'helpdesk.emailIntake'),
            featureHelpDeskRealtime: this.resolveFeatureFlag(settings.featureFlags, 'helpdesk.realtime'),
            featureEmailDelivery: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery'),
            featureEmailDeliveryInvites: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.invites'),
            featureEmailDeliverySecurity: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.security'),
            featureEmailDeliveryApprovals: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.approvals'),
            featureEmailDeliveryProposals: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.proposals'),
            featureEmailDeliveryMarketing: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.marketing'),
            featureEmailDeliveryNotifications: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.notifications'),
            featureEmailDeliveryMailbox: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.mailbox'),
            featureEmailDeliveryStatusNotifications: this.resolveFeatureFlag(settings.featureFlags, 'communications.emailDelivery.statusNotifications'),
            reportDesignerRequiredPermission: settings.reportDesignerRequiredPermission || 'Permissions.Administration.Manage'
        });
        this.activeVerticalPresetConfiguration.set(settings.verticalPresetConfiguration ?? null);
    }
    applyVerticalPreset(resetExisting) {
        const presetId = this.settingsForm.getRawValue().industryPreset || 'CoreCRM';
        this.presetApplying.set(true);
        this.settingsService.applyVerticalPreset({ presetId, resetExisting }).subscribe({
            next: (settings) => {
                this.presetApplying.set(false);
                this.applySettings(settings);
                this.raiseToast('success', resetExisting ? 'Vertical preset reset and applied.' : 'Vertical preset applied.');
            },
            error: () => {
                this.presetApplying.set(false);
                this.raiseToast('error', 'Unable to apply vertical preset.');
            }
        });
    }
    clearToast() {
        this.toastService.clear();
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    roleOptions() {
        return this.roles().map((role) => ({ label: role.name, value: role.id }));
    }
    loadRoles() {
        this.userAdminData.getRoles().subscribe({
            next: (roles) => this.roles.set(roles ?? []),
            error: () => this.roles.set([])
        });
    }
    currentCurrency() {
        return this.settingsForm.value.currency || '';
    }
    loadCurrencies() {
        this.referenceData.getCurrencies().subscribe((items) => {
            this.currencyOptions = items
                .filter((currency) => currency.isActive)
                .map((currency) => ({
                label: currency.code,
                value: currency.code
            }));
            const fallback = this.currencyOptions[0]?.value;
            if (fallback && !this.settingsForm.value.currency) {
                this.settingsForm.patchValue({ currency: fallback });
            }
        });
    }
    resolveCurrency(value) {
        return value || this.currencyOptions[0]?.value || '';
    }
    loadTenantContext() {
        this.tenantContext.getTenantContext().subscribe({
            next: (context) => {
                this.effectiveFeatureFlags.set(context.featureFlags ?? {});
                if (this.latestSettings) {
                    this.applySettings(this.latestSettings);
                }
            },
            error: () => this.effectiveFeatureFlags.set({})
        });
    }
    resolveFeatureFlag(overrides, key, defaultValue = false) {
        if (typeof overrides?.[key] === 'boolean') {
            return !!overrides[key];
        }
        const effective = this.effectiveFeatureFlags()[key];
        return typeof effective === 'boolean' ? effective : defaultValue;
    }
    buildRecordNumberingPolicies(payload) {
        return [
            {
                moduleKey: 'Leads',
                prefix: (payload.recordNumberPrefixLeads || 'LEA-').trim(),
                enabled: true,
                padding: 6
            },
            {
                moduleKey: 'Deals',
                prefix: (payload.recordNumberPrefixDeals || 'DEAL-').trim(),
                enabled: false,
                padding: 6
            },
            {
                moduleKey: 'Customers',
                prefix: (payload.recordNumberPrefixCustomers || 'CUS-').trim(),
                enabled: false,
                padding: 6
            }
        ];
    }
    resolveRecordNumberingPolicy(policies, moduleKey, defaultPrefix) {
        return policies?.find((policy) => policy.moduleKey === moduleKey)
            ?? { moduleKey, prefix: defaultPrefix, enabled: moduleKey === 'Leads', padding: 6 };
    }
    onLogoSelected(event) {
        const file = event.target.files?.[0];
        if (!file)
            return;
        this.brandingUploading.set(true);
        this.brandingService.uploadLogo(file).subscribe({
            next: (result) => {
                this.brandingState.logoUrl.set(result.logoUrl);
                this.brandingUploading.set(false);
                this.toastService.show('success', 'Logo uploaded successfully');
            },
            error: () => {
                this.brandingUploading.set(false);
                this.toastService.show('error', 'Logo upload failed. Ensure the file is PNG, JPG, or WebP and under 2 MB.');
            }
        });
    }
    removeLogo() {
        this.brandingUploading.set(true);
        this.brandingService.removeLogo().subscribe({
            next: () => {
                this.brandingState.logoUrl.set(null);
                this.brandingUploading.set(false);
                this.toastService.show('success', 'Logo removed');
            },
            error: () => {
                this.brandingUploading.set(false);
                this.toastService.show('error', 'Failed to remove logo');
            }
        });
    }
    static ɵfac = function WorkspaceSettingsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WorkspaceSettingsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WorkspaceSettingsPage, selectors: [["app-workspace-settings-page"]], decls: 108, vars: 10, consts: [["logoInput", ""], [1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-actions"], ["pButton", "", "type", "button", "routerLink", "/app/settings", 1, "btn", "btn-secondary"], [1, "pi", "pi-arrow-left"], ["pButton", "", "type", "button", "routerLink", "/app/settings/roles", 1, "btn", "btn-secondary"], [1, "pi", "pi-shield"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", 3, "click", "disabled"], [1, "pi", "pi-refresh"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-building"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend"], [1, "pi", "pi-check-circle"], [1, "card-glow"], [1, "visual-card", "visual-card--secondary"], [1, "pi", "pi-cog"], [1, "pi", "pi-sliders-h"], [1, "metrics-section"], [1, "metric-card", "metric-card--total"], [1, "metric-icon"], [1, "metric-content"], [1, "metric-label"], [1, "metric-value"], [1, "metric-ring"], ["viewBox", "0 0 36 36"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-bg"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--purple"], [1, "metric-card", "metric-card--leads"], [1, "pi", "pi-clock"], ["stroke-dasharray", "100, 100", "d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--cyan"], [1, "metric-card", "metric-card--customers"], [1, "pi", "pi-dollar"], ["stroke-dasharray", "100, 100", "d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--green"], [1, "data-section"], [1, "settings-layout"], [1, "data-card"], [1, "data-header"], [1, "header-title"], [1, "record-count"], [1, "header-actions"], ["class", "status-badge status-badge--success", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "settings-form", 3, "formGroup", "ngSubmit", 4, "ngIf"], ["class", "preview-card", 4, "ngIf"], [1, "status-badge", "status-badge--success"], [1, "pi", "pi-check"], [1, "loading-state"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton", "skeleton-text"], [1, "skeleton", "skeleton-input"], [1, "settings-form", 3, "ngSubmit", "formGroup"], [1, "ws-sidebar-tabs", 3, "valueChange", "value"], [1, "ws-sidebar-layout"], [1, "ws-sidebar-nav"], ["value", "company", 3, "pt"], [1, "ws-sidebar-label"], ["value", "operations", 3, "pt"], ["value", "regional", 3, "pt"], [1, "pi", "pi-globe"], [1, "ws-sidebar-content"], ["value", "company"], [1, "ws-section-accordion", 3, "valueChange", "multiple", "value"], ["value", "company-info"], [1, "ws-accordion-header"], [1, "ws-accordion-header__title"], [1, "ws-accordion-header__badges"], [1, "form-card"], [1, "section-description"], [1, "form-grid"], [1, "form-field"], ["for", "ws-name"], [1, "required"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-tag"], ["pInputText", "", "id", "ws-name", "formControlName", "name", "placeholder", "Acme CRM Workspace", 1, "w-full"], [1, "field-hint"], ["value", "workspace-branding"], [1, "pi", "pi-palette"], [1, "status-badge", "status-badge--info"], [1, "branding-upload"], [1, "branding-preview"], ["alt", "Tenant logo", 1, "branding-preview__img", 3, "src"], [1, "branding-preview__placeholder"], [1, "branding-actions"], ["type", "file", "accept", "image/png,image/jpeg,image/webp", 1, "sr-only", 3, "change"], ["pButton", "", "type", "button", "label", "Upload Logo", "icon", "pi pi-upload", 1, "p-button-outlined", "p-button-sm", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Remove", "icon", "pi pi-trash", "class", "p-button-outlined p-button-sm p-button-danger", 3, "disabled", "click", 4, "ngIf"], ["value", "operations"], ["value", "lead-sla"], [1, "pi", "pi-stopwatch"], [1, "status-badge", "status-badge--warning"], [1, "form-grid", "form-grid--2col"], ["for", "ws-leadFirstTouchSlaHours"], [1, "icon-addon", "icon-addon--warning"], ["pInputText", "", "id", "ws-leadFirstTouchSlaHours", "type", "number", "min", "1", "max", "168", "formControlName", "leadFirstTouchSlaHours", "placeholder", "24", 1, "w-full"], ["value", "record-numbering"], [1, "pi", "pi-hashtag"], ["class", "numbering-row", 4, "ngFor", "ngForOf"], ["value", "ai-scoring"], [1, "form-card", "scoring-section"], [1, "scoring-preview"], [1, "scoring-preview__icon"], [1, "pi", "pi-calculator"], [1, "scoring-preview__body"], [1, "scoring-preview__title"], [1, "scoring-preview__formula"], [1, "scoring-tag"], [1, "scoring-subsection-title"], [1, "pi", "pi-chart-bar"], [1, "scoring-subsection-hint"], [1, "scoring-weights-grid"], [1, "scoring-weight-card"], [1, "scoring-weight-card__header"], [1, "pi", "pi-exclamation-triangle", "scoring-weight-card__icon", "scoring-weight-card__icon--danger"], [1, "scoring-weight-card__label"], [1, "scoring-weight-card__hint"], ["for", "ws-scoreWeightSlaBreaches"], ["inputId", "ws-scoreWeightSlaBreaches", "formControlName", "scoreWeightSlaBreaches", "styleClass", "w-full", 3, "min", "max"], [1, "pi", "pi-clock", "scoring-weight-card__icon", "scoring-weight-card__icon--warning"], ["for", "ws-scoreWeightStaleOpportunities"], ["inputId", "ws-scoreWeightStaleOpportunities", "formControlName", "scoreWeightStaleOpportunities", "styleClass", "w-full", 3, "min", "max"], [1, "pi", "pi-check-circle", "scoring-weight-card__icon", "scoring-weight-card__icon--purple"], ["for", "ws-scoreWeightPendingApprovals"], ["inputId", "ws-scoreWeightPendingApprovals", "formControlName", "scoreWeightPendingApprovals", "styleClass", "w-full", 3, "min", "max"], [1, "pi", "pi-percentage", "scoring-weight-card__icon", "scoring-weight-card__icon--cyan"], ["for", "ws-scoreWeightLowConfidenceLeads"], ["inputId", "ws-scoreWeightLowConfidenceLeads", "formControlName", "scoreWeightLowConfidenceLeads", "styleClass", "w-full", 3, "min", "max"], [1, "pi", "pi-calendar-times", "scoring-weight-card__icon", "scoring-weight-card__icon--orange"], ["for", "ws-scoreWeightOverdueActivities"], ["inputId", "ws-scoreWeightOverdueActivities", "formControlName", "scoreWeightOverdueActivities", "styleClass", "w-full", 3, "min", "max"], [1, "scoring-scale"], [1, "scoring-scale__bar"], [1, "scoring-scale__segment", "scoring-scale__segment--low"], [1, "scoring-scale__label"], [1, "scoring-scale__range"], [1, "scoring-scale__segment", "scoring-scale__segment--medium"], [1, "scoring-scale__segment", "scoring-scale__segment--high"], ["for", "ws-scoreMediumRiskFrom"], ["inputId", "ws-scoreMediumRiskFrom", "formControlName", "scoreMediumRiskFrom", "styleClass", "w-full", 3, "min", "max"], ["for", "ws-scoreHighRiskFrom"], ["inputId", "ws-scoreHighRiskFrom", "formControlName", "scoreHighRiskFrom", "styleClass", "w-full", 3, "min", "max"], [1, "pi", "pi-bolt"], [1, "scoring-scale__segment", "scoring-scale__segment--normal"], [1, "scoring-scale__segment", "scoring-scale__segment--soon"], [1, "scoring-scale__segment", "scoring-scale__segment--immediate"], ["for", "ws-scoreSoonUrgencyFrom"], ["inputId", "ws-scoreSoonUrgencyFrom", "formControlName", "scoreSoonUrgencyFrom", "styleClass", "w-full", 3, "min", "max"], ["for", "ws-scoreImmediateUrgencyFrom"], ["inputId", "ws-scoreImmediateUrgencyFrom", "formControlName", "scoreImmediateUrgencyFrom", "styleClass", "w-full", 3, "min", "max"], ["value", "supporting-docs"], [1, "pi", "pi-paperclip"], ["for", "ws-supportingDocsMaxPerRecord"], ["inputId", "ws-supportingDocsMaxPerRecord", "formControlName", "supportingDocsMaxPerRecord", "styleClass", "w-full", 3, "min", "max"], ["for", "ws-supportingDocsMaxFileSizeMb"], ["inputId", "ws-supportingDocsMaxFileSizeMb", "formControlName", "supportingDocsMaxFileSizeMb", "styleClass", "w-full", 3, "min", "max"], ["value", "delivery-renewal"], [1, "pi", "pi-briefcase"], ["for", "ws-defaultContractTermMonths"], ["inputId", "ws-defaultContractTermMonths", "formControlName", "defaultContractTermMonths", "placeholder", "12", "styleClass", "w-full", 3, "min", "max"], ["for", "ws-defaultDeliveryOwnerRoleId"], ["inputId", "ws-defaultDeliveryOwnerRoleId", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "defaultDeliveryOwnerRoleId", "placeholder", "Select role", "styleClass", "w-full", 3, "options", "showClear"], ["value", "regional"], ["value", "regional-settings"], ["for", "ws-timeZone"], ["inputId", "ws-timeZone", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "timeZone", "placeholder", "Select time zone", "styleClass", "w-full", "filterBy", "label", "filterPlaceholder", "Search time zones", 3, "options", "filter"], ["pTemplate", "item"], ["pTemplate", "selectedItem"], ["for", "ws-currency"], ["inputId", "ws-currency", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "currency", "placeholder", "Select currency", "styleClass", "w-full", 3, "options"], [1, "form-actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["class", "pi pi-save", 4, "ngIf"], ["class", "pi pi-spinner pi-spin", 4, "ngIf"], [1, "pi", "pi-image"], ["pButton", "", "type", "button", "label", "Remove", "icon", "pi pi-trash", 1, "p-button-outlined", "p-button-sm", "p-button-danger", 3, "click", "disabled"], [1, "numbering-row"], [1, "numbering-row__meta"], [1, "numbering-row__title"], [1, "status-badge", 3, "ngClass"], [1, "numbering-row__input"], [3, "for"], ["pInputText", "", 1, "w-full", 3, "id", "formControlName", "placeholder"], [1, "timezone-option"], ["width", "18", "height", "12", "loading", "lazy", 1, "timezone-flag", 3, "src", "alt"], [1, "pi", "pi-save"], [1, "pi", "pi-spinner", "pi-spin"], [1, "preview-card"], [1, "preview-header"], [1, "preview-title"], [1, "pi", "pi-eye"], [1, "preview-workspace"], [1, "preview-icon"], [1, "preview-info"], [1, "preview-label"], [1, "preview-value"], [1, "preview-grid"], [1, "preview-item"], [1, "preview-item-icon"], [1, "preview-item-label"], [1, "preview-item-value"], [1, "preview-item-icon", "preview-item-icon--success"], [1, "preview-note"], [1, "pi", "pi-info-circle"]], template: function WorkspaceSettingsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2);
            i0.ɵɵelement(2, "div", 3)(3, "div", 4)(4, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 6)(7, "div", 7)(8, "div", 8);
            i0.ɵɵelement(9, "span", 9);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Workspace");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 10)(13, "span", 11);
            i0.ɵɵtext(14, "Workspace");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 12);
            i0.ɵɵtext(16, "Configuration");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 13);
            i0.ɵɵtext(18, " Set the company name, time zone, and currency that shape every record in the CRM. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 14)(20, "button", 15);
            i0.ɵɵelement(21, "i", 16);
            i0.ɵɵelementStart(22, "span");
            i0.ɵɵtext(23, "Back to Settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "button", 17);
            i0.ɵɵelement(25, "i", 18);
            i0.ɵɵelementStart(26, "span");
            i0.ɵɵtext(27, "Manage Roles");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "button", 19);
            i0.ɵɵlistener("click", function WorkspaceSettingsPage_Template_button_click_28_listener() { return ctx.loadSettings(); });
            i0.ɵɵelement(29, "i", 20);
            i0.ɵɵelementStart(30, "span");
            i0.ɵɵtext(31, "Reload");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(32, "div", 21)(33, "div", 22)(34, "div", 23);
            i0.ɵɵelement(35, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 25)(37, "span", 26);
            i0.ɵɵtext(38, "Active Workspace");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "strong", 27);
            i0.ɵɵtext(40);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "span", 28);
            i0.ɵɵelement(42, "i", 29);
            i0.ɵɵtext(43, " Configured ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(44, "div", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "div", 31)(46, "div", 23);
            i0.ɵɵelement(47, "i", 32);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 25)(49, "span", 26);
            i0.ɵɵtext(50, "Settings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "strong", 27);
            i0.ɵɵtext(52, "5");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "span", 28);
            i0.ɵɵelement(54, "i", 33);
            i0.ɵɵtext(55, " Configurable options ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(56, "div", 30);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(57, "section", 34)(58, "div", 35)(59, "div", 36);
            i0.ɵɵelement(60, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "div", 37)(62, "span", 38);
            i0.ɵɵtext(63, "Workspace");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "strong", 39);
            i0.ɵɵtext(65);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(66, "div", 40);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(67, "svg", 41);
            i0.ɵɵelement(68, "path", 42)(69, "path", 43);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(70, "div", 44)(71, "div", 36);
            i0.ɵɵelement(72, "i", 45);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "div", 37)(74, "span", 38);
            i0.ɵɵtext(75, "Time Zone");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "strong", 39);
            i0.ɵɵtext(77);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(78, "div", 40);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(79, "svg", 41);
            i0.ɵɵelement(80, "path", 42)(81, "path", 46);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(82, "div", 47)(83, "div", 36);
            i0.ɵɵelement(84, "i", 48);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(85, "div", 37)(86, "span", 38);
            i0.ɵɵtext(87, "Currency");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "strong", 39);
            i0.ɵɵtext(89);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(90, "div", 40);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(91, "svg", 41);
            i0.ɵɵelement(92, "path", 42)(93, "path", 49);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(94, "section", 50)(95, "div", 51)(96, "div", 52)(97, "div", 53)(98, "div", 54)(99, "h2");
            i0.ɵɵtext(100, "Workspace Profile");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "span", 55);
            i0.ɵɵtext(102, "Configure your tenant defaults");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(103, "div", 56);
            i0.ɵɵtemplate(104, WorkspaceSettingsPage_span_104_Template, 3, 0, "span", 57);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(105, WorkspaceSettingsPage_div_105_Template, 2, 2, "div", 58)(106, WorkspaceSettingsPage_form_106_Template, 373, 87, "form", 59);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(107, WorkspaceSettingsPage_aside_107_Template, 37, 3, "aside", 60);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(28);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.settingsForm.value.name || "Untitled");
            i0.ɵɵadvance(25);
            i0.ɵɵtextInterpolate(ctx.settingsForm.value.name ? "1" : "0");
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.settingsForm.value.name ? 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.settingsForm.value.timeZone || "UTC");
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.currentCurrency());
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("ngIf", !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading());
        } }, dependencies: [AccordionModule, i1.Accordion, i2.PrimeTemplate, i1.AccordionPanel, i1.AccordionHeader, i1.AccordionContent, ButtonModule, i3.ButtonDirective, CheckboxModule,
            InputGroupModule, i4.InputGroup, InputGroupAddonModule, i5.InputGroupAddon, InputNumberModule, i6.InputNumber, InputTextModule, i7.InputText, SelectModule, i8.Select, NgClass,
            NgFor,
            NgIf,
            FormsModule, i9.ɵNgNoValidate, i9.DefaultValueAccessor, i9.NumberValueAccessor, i9.NgControlStatus, i9.NgControlStatusGroup, i9.MinValidator, i9.MaxValidator, ReactiveFormsModule, i9.FormGroupDirective, i9.FormControlName, RouterLink,
            SkeletonModule,
            TabsModule, i10.Tabs, i10.TabPanels, i10.TabPanel, i10.TabList, i10.Tab, TextareaModule,
            BreadcrumbsComponent], styles: ["\n\n\n\n\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n\n\n\n\n.page-container[_ngcontent-%COMP%] {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: _ngcontent-%COMP%_float 20s ease-in-out infinite;\n}\n\n.orb-1[_ngcontent-%COMP%] {\n  width: 400px;\n  height: 400px;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%);\n  top: -100px;\n  right: -100px;\n  animation-delay: 0s;\n}\n\n.orb-2[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%);\n  bottom: 20%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3[_ngcontent-%COMP%] {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.06) 100%);\n  top: 50%;\n  right: 10%;\n  animation-delay: -14s;\n}\n\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(30px, -30px) scale(1.05);\n  }\n  66% {\n    transform: translate(-20px, 20px) scale(0.95);\n  }\n}\n\n\n\n\n\n.hero-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 2rem;\n  padding: 2rem;\n  @include form.form-section;\n  margin-bottom: 1.5rem;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.4rem 0.85rem;\n  background: rgba(139, 92, 246, 0.1);\n  border: 1px solid rgba(139, 92, 246, 0.2);\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #7c3aed;\n  width: fit-content;\n}\n\n.badge-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  background: #8b5cf6;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_pulse-dot 2s ease-in-out infinite;\n}\n\n@keyframes _ngcontent-%COMP%_pulse-dot {\n  0%, 100% { opacity: 1; transform: scale(1); }\n  50% { opacity: 0.6; transform: scale(0.9); }\n}\n\n\n.hero-description[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: rgba(60, 60, 67, 0.7);\n  max-width: 480px;\n  margin: 0;\n  line-height: 1.6;\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n  flex-wrap: wrap;\n}\n\n.numbering-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.4fr) minmax(220px, 0.8fr) minmax(180px, 0.8fr);\n  gap: 1rem;\n  align-items: center;\n  padding: 1rem 1.1rem;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.72);\n}\n\n.numbering-row[_ngcontent-%COMP%]    + .numbering-row[_ngcontent-%COMP%] {\n  margin-top: 0.85rem;\n}\n\n.numbering-row__meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n\n.numbering-row__title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n\n.numbering-row__meta[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(60, 60, 67, 0.72);\n  font-size: 0.88rem;\n  line-height: 1.5;\n}\n\n.numbering-row__input[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}\n\n.numbering-row__input[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n\n@media (max-width: 900px) {\n  .numbering-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n\n\n\n\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n\n  @media (max-width: 1100px) {\n    flex-direction: row;\n  }\n\n  @media (max-width: 600px) {\n    flex-direction: column;\n  }\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  padding: 1.25rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  flex: 1;\n  position: relative;\n  overflow: hidden;\n\n  \n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: -1px;\n    border-radius: 17px;\n    padding: 1px;\n    background: linear-gradient(135deg, transparent 0%, transparent 100%);\n    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n    -webkit-mask-composite: xor;\n    mask-composite: exclude;\n    pointer-events: none;\n    opacity: 0;\n    transition: all 0.3s ease;\n  }\n\n  &:hover {\n    transform: translateY(-3px) scale(1.01);\n    box-shadow: \n      0 8px 24px rgba(15, 23, 42, 0.08),\n      0 0 40px rgba(0, 122, 255, 0.06);\n  }\n\n  &:hover::before {\n    opacity: 1;\n    background: linear-gradient(135deg, \n      rgba(0, 122, 255, 0.3) 0%,\n      rgba(175, 82, 222, 0.2) 50%,\n      rgba(90, 200, 250, 0.3) 100%);\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n    border-color: rgba(139, 92, 246, 0.15);\n  }\n\n  &--secondary {\n    background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);\n    border-color: rgba(14, 165, 233, 0.15);\n  }\n}\n\n.card-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 1.1rem;\n    color: #7c3aed;\n  }\n\n  .visual-card--secondary & {\n    background: rgba(14, 165, 233, 0.12);\n    i { color: #0284c7; }\n  }\n\n  .visual-card:hover & {\n    transform: scale(1.08);\n    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);\n  }\n}\n\n.card-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n\n.card-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.card-value[_ngcontent-%COMP%] {\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.card-trend[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.6);\n\n  i { font-size: 0.625rem; }\n\n  &--up {\n    color: #059669;\n    i { color: #10b981; }\n  }\n\n  &--down {\n    color: #dc2626;\n    i { color: #ef4444; }\n  }\n}\n\n.card-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(\n    circle at 30% 30%,\n    rgba(139, 92, 246, 0.15) 0%,\n    transparent 60%\n  );\n  opacity: 0;\n  transition: opacity 0.4s ease;\n  pointer-events: none;\n\n  .visual-card:hover & {\n    opacity: 1;\n  }\n\n  .visual-card--secondary & {\n    background: radial-gradient(\n      circle at 30% 30%,\n      rgba(14, 165, 233, 0.15) 0%,\n      transparent 60%\n    );\n  }\n\n  .visual-card--success & {\n    background: radial-gradient(\n      circle at 30% 30%,\n      rgba(16, 185, 129, 0.15) 0%,\n      transparent 60%\n    );\n  }\n}\n\n\n\n\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_ring-draw {\n  from {\n    stroke-dasharray: 0, 100;\n  }\n}\n\n.metrics-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.75rem;\n  margin-bottom: 1.5rem;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 0.75rem;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 4 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08);\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 0.5rem;\n    font-size: 1.125rem;\n    color: white;\n    flex-shrink: 0;\n    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n  }\n\n  &--total .metric-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n  &--leads .metric-icon { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n  &--prospects .metric-icon { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n  &--customers .metric-icon { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n  &--new .metric-icon { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: 0.7rem;\n    color: #6b7280;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: 1.375rem;\n    font-weight: 700;\n    color: #1f2937;\n  }\n}\n\n//[_ngcontent-%COMP%]   Ring[_ngcontent-%COMP%]   Chart\n.metric-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: #e5e7eb;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n    animation: _ngcontent-%COMP%_ring-draw 1s ease-out;\n\n    &--cyan { stroke: #06b6d4; }\n    &--purple { stroke: #a855f7; }\n    &--green { stroke: #22c55e; }\n    &--orange { stroke: #f97316; }\n  }\n}\n\n\n\n\n\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 12px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  text-decoration: none;\n  white-space: nowrap;\n  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n\n  i { font-size: 0.85rem; }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  @include form.button-primary;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: rgba(15, 23, 42, 0.8);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.5);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n  }\n}\n\n.btn-ghost[_ngcontent-%COMP%] {\n  @include form.button-ghost;\n}\n\n\n\n.preset-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  flex-wrap: wrap;\n}\n\n.preset-status[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: #059669;\n  padding: $space-1 $space-3;\n  background: rgba(16, 185, 129, 0.1);\n  border: 1px solid rgba(16, 185, 129, 0.25);\n  border-radius: $radius-full;\n\n  i { font-size: 0.8rem; }\n\n  &--applying {\n    color: #6366f1;\n    background: rgba(99, 102, 241, 0.1);\n    border-color: rgba(99, 102, 241, 0.25);\n  }\n}\n\n\n\n\n\n.data-section[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fade-in-up 0.4s ease-out 0.1s both;\n  position: relative;\n  z-index: 1;\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.settings-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 360px;\n  gap: 1.5rem;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n\n\n\n\n.data-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n  overflow: hidden;\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.15rem 1.35rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n\n.header-title[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n\n  h2 {\n    font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n    font-size: 1.05rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.record-count[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.65rem;\n}\n\n\n\n\n\n.loading-state[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n}\n\n.skeleton[_ngcontent-%COMP%] {\n  background: linear-gradient(\n    90deg,\n    rgba(148, 163, 184, 0.1) 25%,\n    rgba(148, 163, 184, 0.2) 50%,\n    rgba(148, 163, 184, 0.1) 75%\n  );\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}\n\n.skeleton-text[_ngcontent-%COMP%] {\n  height: 14px;\n  width: 120px;\n}\n\n.skeleton-input[_ngcontent-%COMP%] {\n  height: 42px;\n  width: 100%;\n}\n\n\n\n\n\n.settings-form[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n\n\n.form-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n  padding: 1.5rem;\n  margin: 0;\n\n  \n\n  &:hover {\n    transform: none;\n    background: rgba(255, 255, 255, 0.68);\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.9) inset,\n      0 1px 3px rgba(0, 0, 0, 0.03),\n      0 4px 16px rgba(0, 0, 0, 0.05),\n      0 0 0 1px rgba(99, 102, 241, 0.12);\n  }\n\n  &:focus-within {\n    transform: none;\n    background: rgba(255, 255, 255, 0.75);\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 1) inset,\n      0 2px 8px rgba(0, 0, 0, 0.04),\n      0 0 0 2px rgba(99, 102, 241, 0.18),\n      0 0 24px rgba(99, 102, 241, 0.06);\n  }\n\n  &:hover .section-title {\n    @include form.section-title-hover;\n  }\n}\n\n.section-title[_ngcontent-%COMP%] {\n  @include form.section-title;\n  margin-bottom: 0.5rem;\n\n  \n\n  &--info {\n    i {\n      background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%);\n      color: #0284c7;\n      box-shadow: 0 2px 8px rgba(14, 165, 233, 0.15);\n    }\n    color: #0369a1;\n  }\n\n  \n\n  &--warning {\n    i {\n      background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%);\n      color: #d97706;\n      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);\n    }\n    color: #b45309;\n  }\n\n  \n\n  &--success {\n    i {\n      background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(34, 197, 94, 0.1) 100%);\n      color: #059669;\n      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);\n    }\n    color: #047857;\n  }\n}\n\n.section-description[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: rgba(60, 60, 67, 0.6);\n  margin: 0 0 1.25rem 0;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  @include form.form-grid;\n  grid-template-columns: 1fr;\n\n  &--2col {\n    grid-template-columns: repeat(2, 1fr);\n\n    @media (max-width: 768px) {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  &--3col {\n    grid-template-columns: repeat(3, 1fr);\n\n    @media (max-width: 1100px) {\n      grid-template-columns: repeat(2, 1fr);\n    }\n\n    @media (max-width: 768px) {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n\n\n.field-preview[_ngcontent-%COMP%] {\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: #1e293b;\n  padding: $space-2 $space-3;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  border-radius: $radius-md;\n  backdrop-filter: blur(8px);\n}\n\n\n\n.token-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n  align-items: center;\n}\n\n.token-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 3px $space-3;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: #334155;\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  border-radius: $radius-full;\n  backdrop-filter: blur(8px);\n  white-space: nowrap;\n  transition: all 200ms ease;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.9);\n    border-color: rgba(99, 102, 241, 0.35);\n    transform: translateY(-1px);\n    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);\n  }\n}\n\n.form-card-inner[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  border-radius: 16px;\n  border: 1px dashed rgba(148, 163, 184, 0.35);\n  background: rgba(15, 23, 42, 0.35);\n}\n\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n\n.approval-step[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  background: rgba(15, 23, 42, 0.3);\n  margin-bottom: 1rem;\n}\n\n.approval-step[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.step-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.75rem;\n  font-weight: 600;\n}\n\n.field[_ngcontent-%COMP%] {\n  @include form.form-field;\n\n  label {\n    @include form.form-label;\n\n    .required {\n      @include form.form-required;\n    }\n  }\n\n  input[pInputText],\n  .p-inputtext {\n    @include form.premium-input;\n\n    &:hover {\n      @include form.premium-input-hover;\n    }\n\n    &:focus {\n      @include form.premium-input-focus;\n    }\n  }\n}\n\n\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n  flex-wrap: wrap;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n\n    .required {\n      @include form.form-required;\n    }\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n\n  > .field-hint {\n    flex-basis: 100%;\n    padding-left: calc(110px + 0.75rem);\n  }\n\n  input[pInputText],\n  .p-inputtext {\n    @include form.premium-input;\n\n    &:hover {\n      @include form.premium-input-hover;\n    }\n\n    &:focus {\n      @include form.premium-input-focus;\n    }\n  }\n}\n\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.5);\n  margin-top: 0.35rem;\n}\n\n\n\n[_nghost-%COMP%]     .timezone-option {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n\n[_nghost-%COMP%]     .timezone-flag {\n  width: 18px;\n  height: 12px;\n  border-radius: 2px;\n  object-fit: cover;\n  background: #e2e8f0;\n  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1);\n}\n\n//   PrimeNG   overrides   with   premium   focus   effects\n[_nghost-%COMP%]     {\n  .p-select,\n  .p-inputnumber {\n    width: 100%;\n\n    .p-select-label,\n    .p-inputnumber-input {\n      @include form.premium-input;\n    }\n\n    &:hover {\n      .p-select-label,\n      .p-inputnumber-input {\n        @include form.premium-input-hover;\n      }\n    }\n\n    &.p-focus,\n    &:focus-within {\n      .p-select-label,\n      .p-inputnumber-input {\n        @include form.premium-input-focus;\n      }\n    }\n  }\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  @include form.form-actions;\n  border-top: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n\n\n\n\n.preview-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n}\n\n.preview-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.preview-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n\n  i {\n    font-size: 0.9rem;\n    color: rgba(60, 60, 67, 0.6);\n  }\n\n  h3 {\n    font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n    font-size: 0.95rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.preview-workspace[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  padding: 1rem;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n  border: 1px solid rgba(139, 92, 246, 0.12);\n  border-radius: 14px;\n  transition: all 0.3s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.12);\n  }\n}\n\n.preview-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(14, 165, 233, 0.12) 100%);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 1.2rem;\n    color: #7c3aed;\n  }\n\n  .preview-workspace:hover & {\n    transform: scale(1.05);\n  }\n}\n\n.preview-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n\n.preview-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.preview-value[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.preview-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.6rem;\n  grid-template-columns: 1fr 1fr;\n}\n\n.preview-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.75rem;\n  background: rgba(248, 250, 252, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  border-radius: 12px;\n  transition: all 0.25s ease;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.95);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);\n  }\n}\n\n.preview-item-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.1);\n  border-radius: 8px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 0.8rem;\n    color: #7c3aed;\n  }\n\n  &--success {\n    background: rgba(16, 185, 129, 0.1);\n    i { color: #059669; }\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.1);\n    i { color: #d97706; }\n  }\n\n  &--info {\n    background: rgba(14, 165, 233, 0.1);\n    i { color: #0284c7; }\n  }\n\n  .preview-item:hover & {\n    transform: scale(1.08);\n  }\n}\n\n.preview-item-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.preview-item-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.preview-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.6rem;\n  padding: 0.75rem;\n  background: rgba(139, 92, 246, 0.06);\n  border: 1px solid rgba(139, 92, 246, 0.1);\n  border-radius: 10px;\n  font-size: 0.78rem;\n  color: #7c3aed;\n\n  i {\n    font-size: 0.85rem;\n    margin-top: 0.05rem;\n  }\n}\n\n\n\n\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  white-space: nowrap;\n\n  i { font-size: 0.6rem; }\n\n  &--success {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #b45309;\n  }\n}\n\n.toggle-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n\n.policy-block[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(248, 250, 252, 0.7);\n}\n\n.policy-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n\n.policy-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #1e293b;\n}\n\n.policy-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.policy-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 120px auto;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n.policy-row--modifier[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr 120px auto;\n}\n\n.policy-row[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  height: 40px;\n  align-self: center;\n}\n\n.checkbox-field[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  color: #1e293b;\n  cursor: pointer;\n}\n\n.checkbox-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  min-height: 2.5rem;\n  padding: 0.1rem 0;\n\n  .p-checkbox {\n    margin-top: 0.1rem;\n  }\n\n  &--primary {\n    align-items: center;\n  }\n\n  &--muted {\n    opacity: 0.7;\n  }\n}\n\n\n\n\n\n@media (max-width: 768px) {\n  .page-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .hero-section[_ngcontent-%COMP%] {\n    padding: 1.35rem;\n    gap: 1.25rem;\n  }\n\n  .hero-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .preview-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n\n  .form-section[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n    border-radius: 16px;\n  }\n\n  .policy-row[_ngcontent-%COMP%], \n   .policy-row--modifier[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n\n\n.branding-upload[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1.5rem;\n  align-items: flex-start;\n  margin-top: 0.75rem;\n}\n\n.branding-preview[_ngcontent-%COMP%] {\n  width: 140px;\n  height: 80px;\n  border-radius: 8px;\n  border: 1px dashed rgba(255, 255, 255, 0.15);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  background: rgba(0, 0, 0, 0.08);\n  flex-shrink: 0;\n\n  &__img {\n    max-width: 100%;\n    max-height: 100%;\n    object-fit: contain;\n  }\n\n  &__placeholder {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.25rem;\n    color: var(--text-color-secondary, #94a3b8);\n    font-size: 0.75rem;\n\n    i {\n      font-size: 1.25rem;\n    }\n  }\n}\n\n.branding-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  align-items: flex-start;\n}\n\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n\n\n\n\n\n\n\n\n\n.ws-sidebar-tabs[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  padding: 0;\n  border-radius: 0;\n}\n\n\n\n.ws-sidebar-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  gap: 1.5rem;\n  min-height: 480px;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n}\n\n\n\n[_nghost-%COMP%]     .ws-sidebar-nav.p-tablist {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0.65rem;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.88));\n  border: 1px solid rgba(226, 232, 240, 0.6);\n  border-radius: 20px;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.8),\n    0 8px 24px rgba(15, 23, 42, 0.06),\n    0 2px 8px rgba(15, 23, 42, 0.04);\n  backdrop-filter: blur(16px) saturate(120%);\n  -webkit-backdrop-filter: blur(16px) saturate(120%);\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n}\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tablist-tab-list {\n  display: flex !important;\n  flex-direction: column !important;\n  gap: 0.35rem;\n  border: none !important;\n}\n\n\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border: none;\n  border-radius: 14px;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: #475569;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  transition:\n    background 0.22s ease,\n    color 0.22s ease,\n    transform 0.18s ease,\n    box-shadow 0.22s ease;\n  background: rgba(255, 255, 255, 0.35);\n  text-shadow: none;\n  white-space: nowrap;\n  text-align: left;\n  justify-content: flex-start;\n  min-height: 0;\n  line-height: 1.3;\n  opacity: 1 !important;\n}\n\n\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item i.pi {\n  font-size: 1.1rem;\n  width: 22px;\n  text-align: center;\n  flex-shrink: 0;\n  transition: transform 0.22s ease, color 0.22s ease;\n}\n\n\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item::before {\n  content: '';\n  position: absolute;\n  inset: 0 0 auto 0;\n  height: 50%;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent);\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) {\n  background: rgba(99, 102, 241, 0.08);\n  color: #1e293b;\n  transform: translateX(3px);\n}\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) i.pi {\n  transform: scale(1.08);\n}\n\n\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 2px rgba(255, 255, 255, 0.8),\n    0 0 0 4px rgba(99, 102, 241, 0.2);\n}\n\n\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active, \n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true'], \n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true'] {\n  color: #ffffff;\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),\n    var(--ws-side-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.22),\n    0 8px 20px rgba(59, 130, 246, 0.30),\n    0 0 28px rgba(125, 211, 252, 0.18);\n  transform: translateX(4px);\n  animation: _ngcontent-%COMP%_ws-side-breathe 2.2s ease-in-out infinite;\n}\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active, \n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true'], \n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true'] {\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active .ws-sidebar-label, \n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true'] .ws-sidebar-label, \n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true'] .ws-sidebar-label {\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active i.pi, \n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true'] i.pi, \n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true'] i.pi {\n  color: #ffffff !important;\n  transform: scale(1.12);\n  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));\n}\n\n\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active::after, \n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true']::after, \n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true']::after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 15%;\n  bottom: 15%;\n  width: 3px;\n  border-radius: 0 4px 4px 0;\n  background: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, 0.2) 0%,\n    rgba(239, 68, 68, 0.9) 14%,\n    rgba(245, 158, 11, 0.9) 28%,\n    rgba(34, 197, 94, 0.9) 50%,\n    rgba(59, 130, 246, 0.95) 72%,\n    rgba(139, 92, 246, 0.95) 86%,\n    rgba(255, 255, 255, 0.2) 100%\n  );\n  box-shadow:\n    0 0 8px rgba(59, 130, 246, 0.4),\n    2px 0 12px rgba(139, 92, 246, 0.2);\n  background-size: 100% 300%;\n  animation: _ngcontent-%COMP%_ws-side-strip 3s linear infinite;\n}\n\n\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item:nth-child(1) {\n  --ws-side-bg: linear-gradient(135deg, #3f8dff 0%, #2364da 100%);\n}\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item:nth-child(2) {\n  --ws-side-bg: linear-gradient(135deg, #36c3df 0%, #1497c0 100%);\n}\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item:nth-child(3) {\n  --ws-side-bg: linear-gradient(135deg, #6f84aa 0%, #556f94 100%);\n}\n\n\n\n.ws-sidebar-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n\n\n.ws-sidebar-label[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  font-weight: 600;\n  letter-spacing: 0.005em;\n}\n\n\n\n@keyframes _ngcontent-%COMP%_ws-side-breathe {\n  0%, 100% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.18),\n      0 6px 16px rgba(59, 130, 246, 0.22),\n      0 0 20px rgba(125, 211, 252, 0.12);\n  }\n  50% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.26),\n      0 8px 22px rgba(59, 130, 246, 0.30),\n      0 0 32px rgba(125, 211, 252, 0.20),\n      0 0 40px rgba(255, 255, 255, 0.06);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_ws-side-strip {\n  0% { background-position: 100% 0%; }\n  100% { background-position: 100% 300%; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  [_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active, \n   [_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true'], \n   [_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true'] {\n    animation: none;\n  }\n  [_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active::after, \n   [_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true']::after, \n   [_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true']::after {\n    animation: none;\n  }\n}\n\n\n\n@media (max-width: 900px) {\n  [_nghost-%COMP%]     .ws-sidebar-nav.p-tablist {\n    flex-direction: row;\n    overflow-x: auto;\n    padding: 0.65rem;\n    border-radius: 14px;\n    position: static;\n  }\n\n  [_nghost-%COMP%]     .ws-sidebar-nav .p-tablist-tab-list {\n    flex-direction: row !important;\n    gap: 0.35rem;\n  }\n\n  [_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item {\n    flex: 0 0 auto;\n    padding: 0.65rem 1rem;\n  }\n\n  [_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active, \n   [_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true'], \n   [_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true'] {\n    transform: translateY(-2px);\n  }\n\n  [_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active::after, \n   [_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true']::after, \n   [_nghost-%COMP%]     .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true']::after {\n    left: 15%;\n    right: 15%;\n    top: auto;\n    bottom: 0;\n    width: auto;\n    height: 3px;\n    border-radius: 4px 4px 0 0;\n    background: linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.2) 0%,\n      rgba(59, 130, 246, 0.95) 30%,\n      rgba(139, 92, 246, 0.95) 70%,\n      rgba(255, 255, 255, 0.2) 100%\n    );\n    background-size: 300% 100%;\n    animation: _ngcontent-%COMP%_ws-side-strip-h 3s linear infinite;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_ws-side-strip-h {\n  0% { background-position: 0% 100%; }\n  100% { background-position: 300% 100%; }\n}\n\n\n\n[_nghost-%COMP%]     .ws-sidebar-nav .p-tablist-active-bar {\n  display: none !important;\n}\n\n\n\n\n\n\n.ws-section-accordion[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n[_nghost-%COMP%]     .ws-section-accordion .p-accordionpanel {\n  border: none;\n  border-radius: 14px;\n  overflow: hidden;\n  background: transparent;\n  box-shadow: none;\n}\n\n[_nghost-%COMP%]     .ws-section-accordion .p-accordionheader {\n  background: transparent;\n  border: none;\n  padding: 0;\n  border-radius: 14px;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n\n[_nghost-%COMP%]     .ws-section-accordion .p-accordionheader:hover {\n  background: transparent;\n}\n\n[_nghost-%COMP%]     .ws-section-accordion .p-accordioncontent-content {\n  padding: 0;\n  background: transparent;\n  border: none;\n}\n\n.ws-accordion-header[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border-radius: 0 12px 12px 0;\n  border: 1px solid rgba(59, 130, 246, 0.18);\n  border-left: 3px solid #3b82f6;\n  background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    border-color: rgba(59, 130, 246, 0.35);\n    border-left-color: #2563eb;\n    background: linear-gradient(180deg, #e8f1ff 0%, #dce8f8 100%);\n    box-shadow:\n      0 8px 24px rgba(59, 130, 246, 0.1),\n      0 0 0 1px rgba(59, 130, 246, 0.08);\n    transform: translateY(-1px);\n  }\n}\n\n.ws-accordion-header__title[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n  min-width: 0;\n  color: rgba(30, 41, 59, 0.95);\n  font-weight: 700;\n  font-size: 0.92rem;\n\n  i {\n    color: #2563eb;\n    font-size: 0.95rem;\n  }\n}\n\n.ws-accordion-header__badges[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n\n  .status-badge {\n    font-size: 0.72rem;\n    padding: 0.18rem 0.55rem;\n    border-radius: 6px;\n    font-weight: 600;\n    letter-spacing: 0.02em;\n  }\n\n  .status-badge--success {\n    background: rgba(34, 197, 94, 0.12);\n    color: #16a34a;\n  }\n\n  .status-badge--info {\n    background: rgba(59, 130, 246, 0.12);\n    color: #2563eb;\n  }\n\n  .status-badge--warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #d97706;\n  }\n}\n\n\n\n[_nghost-%COMP%]     .ws-section-accordion .p-accordioncontent .form-card {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  border-radius: 0;\n  padding: 0.75rem 0.5rem 0.25rem;\n  margin: 0;\n\n  &:hover {\n    transform: none;\n    box-shadow: none;\n  }\n}\n\n\n\n[_nghost-%COMP%]     .ws-section-accordion .p-accordioncontent .form-card .section-title {\n  display: none;\n}\n\n\n\n@media (max-width: 768px) {\n  .ws-accordion-header[_ngcontent-%COMP%] {\n    padding: 0.75rem 0.85rem;\n    gap: 0.55rem;\n    flex-wrap: wrap;\n  }\n\n  .ws-accordion-header__title[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n  }\n\n  .ws-accordion-header__badges[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-start;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   AI[_ngcontent-%COMP%]   ACTION[_ngcontent-%COMP%]   SCORING[_ngcontent-%COMP%]   \u2014[_ngcontent-%COMP%]   Visual[_ngcontent-%COMP%]   Redesign\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n//[_ngcontent-%COMP%]   ---[_ngcontent-%COMP%]   Live[_ngcontent-%COMP%]   Preview[_ngcontent-%COMP%]   Card[_ngcontent-%COMP%]   ---\n.scoring-preview[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.06) 100%);\n  border: 1px solid rgba(59, 130, 246, 0.18);\n  border-left: 3px solid #3b82f6;\n  border-radius: 0 10px 10px 0;\n  margin-bottom: 1.25rem;\n\n  &__icon {\n    width: 32px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n    border-radius: 8px;\n    font-size: 0.85rem;\n    flex-shrink: 0;\n  }\n\n  &__body {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    min-width: 0;\n  }\n\n  &__title {\n    font-size: 0.8125rem;\n    font-weight: 700;\n    color: #1e293b;\n  }\n\n  &__formula {\n    font-size: 0.78rem;\n    color: #64748b;\n    line-height: 1.5;\n  }\n}\n\n.scoring-tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 1px 8px;\n  border-radius: 99px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n\n  &--low {\n    background: rgba(34, 197, 94, 0.14);\n    color: #15803d;\n  }\n\n  &--medium {\n    background: rgba(245, 158, 11, 0.14);\n    color: #b45309;\n  }\n\n  &--high {\n    background: rgba(239, 68, 68, 0.14);\n    color: #dc2626;\n  }\n}\n\n//[_ngcontent-%COMP%]   ---[_ngcontent-%COMP%]   Subsection[_ngcontent-%COMP%]   Titles[_ngcontent-%COMP%]   ---\n.scoring-subsection-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.85rem;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 1.25rem 0 0.75rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  > i {\n    color: #3b82f6;\n    font-size: 0.9rem;\n  }\n\n  .scoring-subsection-hint {\n    font-size: 0.75rem;\n    font-weight: 400;\n    color: #94a3b8;\n    margin-left: auto;\n  }\n}\n\n//[_ngcontent-%COMP%]   ---[_ngcontent-%COMP%]   Weight[_ngcontent-%COMP%]   Cards[_ngcontent-%COMP%]   Grid[_ngcontent-%COMP%]   ---\n.scoring-weights-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 0.75rem;\n  margin-bottom: 0.5rem;\n}\n\n.scoring-weight-card[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  background: rgba(255, 255, 255, 0.88);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 10px;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    border-color: rgba(59, 130, 246, 0.25);\n    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.08);\n    transform: translateY(-1px);\n  }\n\n  &__header {\n    display: flex;\n    align-items: center;\n    gap: 0.6rem;\n    margin-bottom: 0.6rem;\n  }\n\n  &__icon {\n    width: 28px;\n    height: 28px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 7px;\n    font-size: 0.8rem;\n    color: white;\n    flex-shrink: 0;\n\n    &--danger  { background: linear-gradient(135deg, #f87171 0%, #ef4444 100%); }\n    &--warning { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); }\n    &--purple  { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n    &--cyan    { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n    &--orange  { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }\n  }\n\n  &__label {\n    display: block;\n    font-size: 0.8125rem;\n    font-weight: 700;\n    color: #1e293b;\n  }\n\n  &__hint {\n    display: block;\n    font-size: 0.72rem;\n    color: #94a3b8;\n    line-height: 1.3;\n  }\n\n  .form-field {\n    margin: 0;\n\n    > label {\n      min-width: 50px;\n      font-size: 0.75rem;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   ---[_ngcontent-%COMP%]   Visual[_ngcontent-%COMP%]   Gradient[_ngcontent-%COMP%]   Scale[_ngcontent-%COMP%]   Bars[_ngcontent-%COMP%]   ---\n.scoring-scale[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n\n  &__bar {\n    display: flex;\n    width: 100%;\n    height: 36px;\n    border-radius: 10px;\n    overflow: hidden;\n    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);\n  }\n\n  &__segment {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    min-width: 40px;\n    transition: width 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    position: relative;\n  }\n\n  &__label {\n    font-size: 0.7rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    line-height: 1;\n  }\n\n  &__range {\n    font-size: 0.62rem;\n    opacity: 0.8;\n    line-height: 1;\n    margin-top: 1px;\n  }\n\n  // Risk colors\n  &__segment--low {\n    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);\n    color: #166534;\n  }\n\n  &__segment--medium {\n    background: linear-gradient(135deg, #fef08a 0%, #fde047 100%);\n    color: #854d0e;\n  }\n\n  &__segment--high {\n    background: linear-gradient(135deg, #fca5a5 0%, #f87171 100%);\n    color: #991b1b;\n  }\n\n  // Urgency colors\n  &__segment--normal {\n    background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);\n    color: #1e40af;\n  }\n\n  &__segment--soon {\n    background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);\n    color: #9a3412;\n  }\n\n  &__segment--immediate {\n    background: linear-gradient(135deg, #fca5a5 0%, #f87171 100%);\n    color: #991b1b;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkspaceSettingsPage, [{
        type: Component,
        args: [{ selector: 'app-workspace-settings-page', standalone: true, imports: [
                    AccordionModule,
                    ButtonModule,
                    CheckboxModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    InputNumberModule,
                    InputTextModule,
                    SelectModule,
                    NgClass,
                    NgFor,
                    NgIf,
                    FormsModule,
                    ReactiveFormsModule,
                    RouterLink,
                    SkeletonModule,
                    TabsModule,
                    TextareaModule,
                    BreadcrumbsComponent
                ], template: "<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     WORKSPACE SETTINGS PAGE - Premium Glass UI with Design System\n     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n<div class=\"page-container\">\n  <!-- Animated Background Orbs -->\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <!-- Breadcrumb -->\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       HERO SECTION\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Workspace</span>\n      </div>\n      \n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Workspace</span>\n        <span class=\"title-light\">Configuration</span>\n      </h1>\n      \n      <p class=\"hero-description\">\n        Set the company name, time zone, and currency that shape every record in the CRM.\n      </p>\n\n      <div class=\"hero-actions\">\n        <button pButton type=\"button\" class=\"btn btn-secondary\" routerLink=\"/app/settings\">\n          <i class=\"pi pi-arrow-left\"></i>\n          <span>Back to Settings</span>\n        </button>\n        <button pButton type=\"button\" class=\"btn btn-secondary\" routerLink=\"/app/settings/roles\">\n          <i class=\"pi pi-shield\"></i>\n          <span>Manage Roles</span>\n        </button>\n        <button pButton type=\"button\" class=\"btn btn-ghost\" [disabled]=\"loading()\" (click)=\"loadSettings()\">\n          <i class=\"pi pi-refresh\"></i>\n          <span>Reload</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-building\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Active Workspace</span>\n          <strong class=\"card-value\">{{ settingsForm.value.name || 'Untitled' }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-check-circle\"></i> Configured\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n\n      <div class=\"visual-card visual-card--secondary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-cog\"></i>\n        </div>\n      <div class=\"card-content\">\n        <span class=\"card-label\">Settings</span>\n        <strong class=\"card-value\">5</strong>\n        <span class=\"card-trend\">\n          <i class=\"pi pi-sliders-h\"></i> Configurable options\n        </span>\n      </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       METRICS DASHBOARD\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"metrics-section\">\n    <div class=\"metric-card metric-card--total\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-building\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Workspace</span>\n        <strong class=\"metric-value\">{{ settingsForm.value.name ? '1' : '0' }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--purple\" \n            [attr.stroke-dasharray]=\"(settingsForm.value.name ? 100 : 0) + ', 100'\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--leads\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-clock\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Time Zone</span>\n        <strong class=\"metric-value\">{{ settingsForm.value.timeZone || 'UTC' }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--cyan\" \n            stroke-dasharray=\"100, 100\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--customers\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-dollar\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Currency</span>\n        <strong class=\"metric-value\">{{ currentCurrency() }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--green\" \n            stroke-dasharray=\"100, 100\"\n            d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       SETTINGS FORM SECTION\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"data-section\">\n    <div class=\"settings-layout\">\n      <!-- Form Card -->\n      <div class=\"data-card\">\n        <div class=\"data-header\">\n          <div class=\"header-title\">\n            <h2>Workspace Profile</h2>\n            <span class=\"record-count\">Configure your tenant defaults</span>\n          </div>\n          <div class=\"header-actions\">\n            <span class=\"status-badge status-badge--success\" *ngIf=\"!loading()\">\n              <i class=\"pi pi-check\"></i> Active\n            </span>\n          </div>\n        </div>\n\n        <!-- Loading State -->\n        <div class=\"loading-state\" *ngIf=\"loading()\">\n          <div class=\"skeleton-row\" *ngFor=\"let _ of [0, 1, 2]\">\n            <div class=\"skeleton skeleton-text\"></div>\n            <div class=\"skeleton skeleton-input\"></div>\n          </div>\n        </div>\n\n        <!-- Form -->\n        <form class=\"settings-form\" *ngIf=\"!loading()\" [formGroup]=\"settingsForm\" (ngSubmit)=\"saveSettings()\">\n\n          <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 VERTICAL SIDEBAR TABS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n          <p-tabs class=\"ws-sidebar-tabs\" [value]=\"activeTab()\" (valueChange)=\"onActiveTabChange($event)\">\n            <div class=\"ws-sidebar-layout\">\n              <!-- Sidebar Navigation -->\n              <p-tablist class=\"ws-sidebar-nav\">\n                <p-tab value=\"company\" [pt]=\"{ root: { class: 'ws-sidebar-item' } }\">\n                  <i class=\"pi pi-building\"></i>\n                  <span class=\"ws-sidebar-label\">Company &amp; Branding</span>\n                </p-tab>\n                <p-tab value=\"operations\" [pt]=\"{ root: { class: 'ws-sidebar-item' } }\">\n                  <i class=\"pi pi-cog\"></i>\n                  <span class=\"ws-sidebar-label\">Operations</span>\n                </p-tab>\n                <p-tab value=\"regional\" [pt]=\"{ root: { class: 'ws-sidebar-item' } }\">\n                  <i class=\"pi pi-globe\"></i>\n                  <span class=\"ws-sidebar-label\">Regional</span>\n                </p-tab>\n              </p-tablist>\n\n              <!-- Tab Content Area -->\n              <p-tabpanels class=\"ws-sidebar-content\">\n              <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 TAB 1 \u2014 Company & Branding \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n              <p-tabpanel value=\"company\">\n                <p-accordion class=\"ws-section-accordion\" [multiple]=\"true\" [value]=\"companyPanels()\" (valueChange)=\"onCompanyPanelsChange($any($event))\">\n                  <!-- Company Information -->\n                  <p-accordion-panel value=\"company-info\">\n                    <p-accordion-header>\n                      <div class=\"ws-accordion-header\">\n                        <div class=\"ws-accordion-header__title\">\n                          <i class=\"pi pi-building\"></i>\n                          <span>Company Information</span>\n                        </div>\n                        <div class=\"ws-accordion-header__badges\">\n                          <span class=\"status-badge status-badge--success\">Required</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n          <section class=\"form-card\">\n            <p class=\"section-description\">Basic workspace identity settings</p>\n            \n            <div class=\"form-grid\">\n              <div class=\"form-field\">\n                <label for=\"ws-name\">Company Name <span class=\"required\">*</span></label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                    <i class=\"pi pi-tag\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"ws-name\" formControlName=\"name\" placeholder=\"Acme CRM Workspace\" class=\"w-full\" />\n                </p-inputgroup>\n                <small class=\"field-hint\">The display name for your workspace</small>\n              </div>\n            </div>\n          </section>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n\n                  <!-- Workspace Branding -->\n                  <p-accordion-panel value=\"workspace-branding\">\n                    <p-accordion-header>\n                      <div class=\"ws-accordion-header\">\n                        <div class=\"ws-accordion-header__title\">\n                          <i class=\"pi pi-palette\"></i>\n                          <span>Workspace Branding</span>\n                        </div>\n                        <div class=\"ws-accordion-header__badges\">\n                          <span class=\"status-badge status-badge--info\">Optional</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n          <section class=\"form-card\">\n            <p class=\"section-description\">Customise logo displayed across the application</p>\n\n            <div class=\"branding-upload\">\n              <div class=\"branding-preview\">\n                @if (brandingLogoUrl()) {\n                  <img class=\"branding-preview__img\" [src]=\"brandingLogoUrl()\" alt=\"Tenant logo\" />\n                } @else {\n                  <div class=\"branding-preview__placeholder\">\n                    <i class=\"pi pi-image\"></i>\n                    <span>No logo uploaded</span>\n                  </div>\n                }\n              </div>\n\n              <div class=\"branding-actions\">\n                <input\n                  #logoInput\n                  type=\"file\"\n                  accept=\"image/png,image/jpeg,image/webp\"\n                  class=\"sr-only\"\n                  (change)=\"onLogoSelected($event)\"\n                />\n                <button\n                  pButton\n                  type=\"button\"\n                  label=\"Upload Logo\"\n                  icon=\"pi pi-upload\"\n                  class=\"p-button-outlined p-button-sm\"\n                  [disabled]=\"brandingUploading()\"\n                  (click)=\"logoInput.click()\"\n                ></button>\n                <button\n                  pButton\n                  type=\"button\"\n                  label=\"Remove\"\n                  icon=\"pi pi-trash\"\n                  class=\"p-button-outlined p-button-sm p-button-danger\"\n                  *ngIf=\"brandingLogoUrl()\"\n                  [disabled]=\"brandingUploading()\"\n                  (click)=\"removeLogo()\"\n                ></button>\n                <small class=\"field-hint\">PNG, JPG or WebP. Max 2 MB.</small>\n              </div>\n            </div>\n          </section>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n                </p-accordion>\n              </p-tabpanel>\n\n              <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 TAB 2 \u2014 Operations \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n              <p-tabpanel value=\"operations\">\n                <p-accordion class=\"ws-section-accordion\" [multiple]=\"true\" [value]=\"operationsPanels()\" (valueChange)=\"onOperationsPanelsChange($any($event))\">\n                  <!-- Lead SLA -->\n                  <p-accordion-panel value=\"lead-sla\">\n                    <p-accordion-header>\n                      <div class=\"ws-accordion-header\">\n                        <div class=\"ws-accordion-header__title\">\n                          <i class=\"pi pi-stopwatch\"></i>\n                          <span>Lead SLA</span>\n                        </div>\n                        <div class=\"ws-accordion-header__badges\">\n                          <span class=\"status-badge status-badge--warning\">SLA</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n          <section class=\"form-card\">\n            <p class=\"section-description\">Define how quickly new leads must be contacted</p>\n\n            <div class=\"form-grid form-grid--2col\">\n              <div class=\"form-field\">\n                <label for=\"ws-leadFirstTouchSlaHours\">First-touch SLA (hours)</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--warning\">\n                    <i class=\"pi pi-stopwatch\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"ws-leadFirstTouchSlaHours\" type=\"number\" min=\"1\" max=\"168\" formControlName=\"leadFirstTouchSlaHours\" placeholder=\"24\" class=\"w-full\" />\n                </p-inputgroup>\n                <small class=\"field-hint\">Default is 24 hours. Used to create first-touch tasks and SLA alerts.</small>\n              </div>\n            </div>\n          </section>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n\n                  <!-- Record Numbering -->\n                  <p-accordion-panel value=\"record-numbering\">\n                    <p-accordion-header>\n                      <div class=\"ws-accordion-header\">\n                        <div class=\"ws-accordion-header__title\">\n                          <i class=\"pi pi-hashtag\"></i>\n                          <span>Record Numbering</span>\n                        </div>\n                        <div class=\"ws-accordion-header__badges\">\n                          <span class=\"status-badge status-badge--info\">Prefixes</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n          <section class=\"form-card\">\n            <p class=\"section-description\">Define tenant-level prefixes for business-facing CRM record numbers. Leads are active now; other modules can be prepared in advance.</p>\n\n            <div class=\"form-grid\">\n              <div class=\"numbering-row\" *ngFor=\"let row of recordNumberingRows\">\n                <div class=\"numbering-row__meta\">\n                  <div class=\"numbering-row__title\">\n                    <strong>{{ row.label }}</strong>\n                    <span class=\"status-badge\" [ngClass]=\"row.statusTone === 'success' ? 'status-badge--success' : 'status-badge--info'\">\n                      {{ row.statusLabel }}\n                    </span>\n                  </div>\n                  <p>{{ row.description }}</p>\n                  <small class=\"field-hint\">Generated format: prefix + six-digit sequence. Example: {{ settingsForm.get(row.prefixControlName)?.value || 'PREFIX-' }}000001</small>\n                </div>\n                <div class=\"numbering-row__input\">\n                  <label [for]=\"'ws-' + row.moduleKey.toLowerCase() + '-prefix'\">{{ row.label }} prefix</label>\n                  <input\n                    pInputText\n                    [id]=\"'ws-' + row.moduleKey.toLowerCase() + '-prefix'\"\n                    [formControlName]=\"row.prefixControlName\"\n                    [placeholder]=\"row.label + ' prefix'\"\n                    class=\"w-full\"\n                  />\n                </div>\n              </div>\n            </div>\n          </section>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n\n                  <!-- AI Action Scoring -->\n                  <p-accordion-panel value=\"ai-scoring\">\n                    <p-accordion-header>\n                      <div class=\"ws-accordion-header\">\n                        <div class=\"ws-accordion-header__title\">\n                          <i class=\"pi pi-sliders-h\"></i>\n                          <span>AI Action Scoring</span>\n                        </div>\n                        <div class=\"ws-accordion-header__badges\">\n                          <span class=\"status-badge status-badge--info\">Weights &amp; Thresholds</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n          <section class=\"form-card scoring-section\">\n            <p class=\"section-description\">\n              The AI scores each category as <strong>weight \u00D7 count</strong> (0\u2013100).\n              The resulting score determines Risk and Urgency tiers below.\n            </p>\n\n            <!-- \u2500\u2500 Live Preview \u2500\u2500 -->\n            <div class=\"scoring-preview\">\n              <div class=\"scoring-preview__icon\"><i class=\"pi pi-calculator\"></i></div>\n              <div class=\"scoring-preview__body\">\n                <span class=\"scoring-preview__title\">How scoring works</span>\n                <span class=\"scoring-preview__formula\">\n                  Score = Weight \u00D7 Item Count&nbsp;&nbsp;\u2192&nbsp;&nbsp;e.g. <strong>3</strong> SLA breaches \u00D7 <strong>{{ settingsForm.get('scoreWeightSlaBreaches')?.value }}</strong> weight = <strong>{{ 3 * (settingsForm.get('scoreWeightSlaBreaches')?.value || 0) }}</strong> \u2192 \n                  <span class=\"scoring-tag\" [class.scoring-tag--low]=\"3 * (settingsForm.get('scoreWeightSlaBreaches')?.value || 0) < (settingsForm.get('scoreMediumRiskFrom')?.value || 45)\"\n                        [class.scoring-tag--medium]=\"3 * (settingsForm.get('scoreWeightSlaBreaches')?.value || 0) >= (settingsForm.get('scoreMediumRiskFrom')?.value || 45) && 3 * (settingsForm.get('scoreWeightSlaBreaches')?.value || 0) < (settingsForm.get('scoreHighRiskFrom')?.value || 75)\"\n                        [class.scoring-tag--high]=\"3 * (settingsForm.get('scoreWeightSlaBreaches')?.value || 0) >= (settingsForm.get('scoreHighRiskFrom')?.value || 75)\">\n                    {{ 3 * (settingsForm.get('scoreWeightSlaBreaches')?.value || 0) < (settingsForm.get('scoreMediumRiskFrom')?.value || 45) ? 'Low' : (3 * (settingsForm.get('scoreWeightSlaBreaches')?.value || 0) < (settingsForm.get('scoreHighRiskFrom')?.value || 75) ? 'Medium' : 'High') }} Risk\n                  </span>\n                </span>\n              </div>\n            </div>\n\n            <!-- \u2500\u2500 1. Category Weights \u2500\u2500 -->\n            <h4 class=\"scoring-subsection-title\">\n              <i class=\"pi pi-chart-bar\"></i> Category Weights\n              <span class=\"scoring-subsection-hint\">Multiplier applied to each item count</span>\n            </h4>\n\n            <div class=\"scoring-weights-grid\">\n              <div class=\"scoring-weight-card\">\n                <div class=\"scoring-weight-card__header\">\n                  <i class=\"pi pi-exclamation-triangle scoring-weight-card__icon scoring-weight-card__icon--danger\"></i>\n                  <div>\n                    <span class=\"scoring-weight-card__label\">SLA Breaches</span>\n                    <span class=\"scoring-weight-card__hint\">Overdue response time violations</span>\n                  </div>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"ws-scoreWeightSlaBreaches\">Weight</label>\n                  <p-inputNumber inputId=\"ws-scoreWeightSlaBreaches\" formControlName=\"scoreWeightSlaBreaches\" [min]=\"0\" [max]=\"100\" styleClass=\"w-full\"></p-inputNumber>\n                </div>\n              </div>\n              <div class=\"scoring-weight-card\">\n                <div class=\"scoring-weight-card__header\">\n                  <i class=\"pi pi-clock scoring-weight-card__icon scoring-weight-card__icon--warning\"></i>\n                  <div>\n                    <span class=\"scoring-weight-card__label\">Stale Opportunities</span>\n                    <span class=\"scoring-weight-card__hint\">Open deals with no recent activity</span>\n                  </div>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"ws-scoreWeightStaleOpportunities\">Weight</label>\n                  <p-inputNumber inputId=\"ws-scoreWeightStaleOpportunities\" formControlName=\"scoreWeightStaleOpportunities\" [min]=\"0\" [max]=\"100\" styleClass=\"w-full\"></p-inputNumber>\n                </div>\n              </div>\n              <div class=\"scoring-weight-card\">\n                <div class=\"scoring-weight-card__header\">\n                  <i class=\"pi pi-check-circle scoring-weight-card__icon scoring-weight-card__icon--purple\"></i>\n                  <div>\n                    <span class=\"scoring-weight-card__label\">Pending Approvals</span>\n                    <span class=\"scoring-weight-card__hint\">Awaiting manager sign-off</span>\n                  </div>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"ws-scoreWeightPendingApprovals\">Weight</label>\n                  <p-inputNumber inputId=\"ws-scoreWeightPendingApprovals\" formControlName=\"scoreWeightPendingApprovals\" [min]=\"0\" [max]=\"100\" styleClass=\"w-full\"></p-inputNumber>\n                </div>\n              </div>\n              <div class=\"scoring-weight-card\">\n                <div class=\"scoring-weight-card__header\">\n                  <i class=\"pi pi-percentage scoring-weight-card__icon scoring-weight-card__icon--cyan\"></i>\n                  <div>\n                    <span class=\"scoring-weight-card__label\">Low-Confidence Leads</span>\n                    <span class=\"scoring-weight-card__hint\">AI-scored leads below confidence threshold</span>\n                  </div>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"ws-scoreWeightLowConfidenceLeads\">Weight</label>\n                  <p-inputNumber inputId=\"ws-scoreWeightLowConfidenceLeads\" formControlName=\"scoreWeightLowConfidenceLeads\" [min]=\"0\" [max]=\"100\" styleClass=\"w-full\"></p-inputNumber>\n                </div>\n              </div>\n              <div class=\"scoring-weight-card\">\n                <div class=\"scoring-weight-card__header\">\n                  <i class=\"pi pi-calendar-times scoring-weight-card__icon scoring-weight-card__icon--orange\"></i>\n                  <div>\n                    <span class=\"scoring-weight-card__label\">Overdue Activities</span>\n                    <span class=\"scoring-weight-card__hint\">Tasks and follow-ups past due date</span>\n                  </div>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"ws-scoreWeightOverdueActivities\">Weight</label>\n                  <p-inputNumber inputId=\"ws-scoreWeightOverdueActivities\" formControlName=\"scoreWeightOverdueActivities\" [min]=\"0\" [max]=\"100\" styleClass=\"w-full\"></p-inputNumber>\n                </div>\n              </div>\n            </div>\n\n            <!-- \u2500\u2500 2. Risk Thresholds \u2500\u2500 -->\n            <h4 class=\"scoring-subsection-title\">\n              <i class=\"pi pi-shield\"></i> Risk Thresholds\n              <span class=\"scoring-subsection-hint\">Score ranges that determine risk tier</span>\n            </h4>\n\n            <div class=\"scoring-scale\">\n              <div class=\"scoring-scale__bar\">\n                <div class=\"scoring-scale__segment scoring-scale__segment--low\"\n                     [style.width.%]=\"settingsForm.get('scoreMediumRiskFrom')?.value || 45\">\n                  <span class=\"scoring-scale__label\">Low</span>\n                  <span class=\"scoring-scale__range\">0 \u2013 {{ (settingsForm.get('scoreMediumRiskFrom')?.value || 45) - 1 }}</span>\n                </div>\n                <div class=\"scoring-scale__segment scoring-scale__segment--medium\"\n                     [style.width.%]=\"(settingsForm.get('scoreHighRiskFrom')?.value || 75) - (settingsForm.get('scoreMediumRiskFrom')?.value || 45)\">\n                  <span class=\"scoring-scale__label\">Medium</span>\n                  <span class=\"scoring-scale__range\">{{ settingsForm.get('scoreMediumRiskFrom')?.value || 45 }} \u2013 {{ (settingsForm.get('scoreHighRiskFrom')?.value || 75) - 1 }}</span>\n                </div>\n                <div class=\"scoring-scale__segment scoring-scale__segment--high\"\n                     [style.width.%]=\"100 - (settingsForm.get('scoreHighRiskFrom')?.value || 75)\">\n                  <span class=\"scoring-scale__label\">High</span>\n                  <span class=\"scoring-scale__range\">{{ settingsForm.get('scoreHighRiskFrom')?.value || 75 }} \u2013 100</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-grid form-grid--2col\">\n              <div class=\"form-field\">\n                <label for=\"ws-scoreMediumRiskFrom\">Medium risk starts at</label>\n                <p-inputNumber inputId=\"ws-scoreMediumRiskFrom\" formControlName=\"scoreMediumRiskFrom\" [min]=\"1\" [max]=\"95\" styleClass=\"w-full\"></p-inputNumber>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"ws-scoreHighRiskFrom\">High risk starts at</label>\n                <p-inputNumber inputId=\"ws-scoreHighRiskFrom\" formControlName=\"scoreHighRiskFrom\" [min]=\"5\" [max]=\"99\" styleClass=\"w-full\"></p-inputNumber>\n              </div>\n            </div>\n\n            <!-- \u2500\u2500 3. Urgency Thresholds \u2500\u2500 -->\n            <h4 class=\"scoring-subsection-title\">\n              <i class=\"pi pi-bolt\"></i> Urgency Thresholds\n              <span class=\"scoring-subsection-hint\">Score ranges that determine urgency level</span>\n            </h4>\n\n            <div class=\"scoring-scale\">\n              <div class=\"scoring-scale__bar\">\n                <div class=\"scoring-scale__segment scoring-scale__segment--normal\"\n                     [style.width.%]=\"settingsForm.get('scoreSoonUrgencyFrom')?.value || 50\">\n                  <span class=\"scoring-scale__label\">Normal</span>\n                  <span class=\"scoring-scale__range\">0 \u2013 {{ (settingsForm.get('scoreSoonUrgencyFrom')?.value || 50) - 1 }}</span>\n                </div>\n                <div class=\"scoring-scale__segment scoring-scale__segment--soon\"\n                     [style.width.%]=\"(settingsForm.get('scoreImmediateUrgencyFrom')?.value || 80) - (settingsForm.get('scoreSoonUrgencyFrom')?.value || 50)\">\n                  <span class=\"scoring-scale__label\">Soon</span>\n                  <span class=\"scoring-scale__range\">{{ settingsForm.get('scoreSoonUrgencyFrom')?.value || 50 }} \u2013 {{ (settingsForm.get('scoreImmediateUrgencyFrom')?.value || 80) - 1 }}</span>\n                </div>\n                <div class=\"scoring-scale__segment scoring-scale__segment--immediate\"\n                     [style.width.%]=\"100 - (settingsForm.get('scoreImmediateUrgencyFrom')?.value || 80)\">\n                  <span class=\"scoring-scale__label\">Immediate</span>\n                  <span class=\"scoring-scale__range\">{{ settingsForm.get('scoreImmediateUrgencyFrom')?.value || 80 }} \u2013 100</span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"form-grid form-grid--2col\">\n              <div class=\"form-field\">\n                <label for=\"ws-scoreSoonUrgencyFrom\">Soon urgency starts at</label>\n                <p-inputNumber inputId=\"ws-scoreSoonUrgencyFrom\" formControlName=\"scoreSoonUrgencyFrom\" [min]=\"1\" [max]=\"95\" styleClass=\"w-full\"></p-inputNumber>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"ws-scoreImmediateUrgencyFrom\">Immediate urgency starts at</label>\n                <p-inputNumber inputId=\"ws-scoreImmediateUrgencyFrom\" formControlName=\"scoreImmediateUrgencyFrom\" [min]=\"5\" [max]=\"99\" styleClass=\"w-full\"></p-inputNumber>\n              </div>\n            </div>\n          </section>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n\n                  <!-- Supporting Documents -->\n                  <p-accordion-panel value=\"supporting-docs\">\n                    <p-accordion-header>\n                      <div class=\"ws-accordion-header\">\n                        <div class=\"ws-accordion-header__title\">\n                          <i class=\"pi pi-paperclip\"></i>\n                          <span>Supporting Documents</span>\n                        </div>\n                        <div class=\"ws-accordion-header__badges\">\n                          <span class=\"status-badge status-badge--warning\">Limits</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n          <section class=\"form-card\">\n            <p class=\"section-description\">Global document limits for CRM records (lead-first rollout)</p>\n\n            <div class=\"form-grid form-grid--2col\">\n              <div class=\"form-field\">\n                <label for=\"ws-supportingDocsMaxPerRecord\">Max documents per record</label>\n                <p-inputNumber\n                  inputId=\"ws-supportingDocsMaxPerRecord\"\n                  formControlName=\"supportingDocsMaxPerRecord\"\n                  [min]=\"1\"\n                  [max]=\"100\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n                <small class=\"field-hint\">Default is 10. Applies when uploading supporting documents to CRM records.</small>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"ws-supportingDocsMaxFileSizeMb\">Max file size (MB)</label>\n                <p-inputNumber\n                  inputId=\"ws-supportingDocsMaxFileSizeMb\"\n                  formControlName=\"supportingDocsMaxFileSizeMb\"\n                  [min]=\"1\"\n                  [max]=\"100\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n                <small class=\"field-hint\">Allowed formats are PDF, Office documents, and images.</small>\n              </div>\n            </div>\n          </section>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n\n                  <!-- Delivery & Renewal Defaults -->\n                  <p-accordion-panel value=\"delivery-renewal\">\n                    <p-accordion-header>\n                      <div class=\"ws-accordion-header\">\n                        <div class=\"ws-accordion-header__title\">\n                          <i class=\"pi pi-briefcase\"></i>\n                          <span>Delivery &amp; Renewal Defaults</span>\n                        </div>\n                        <div class=\"ws-accordion-header__badges\">\n                          <span class=\"status-badge status-badge--info\">Defaults</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n          <section class=\"form-card\">\n            <p class=\"section-description\">Defaults applied when a deal is closed won</p>\n\n            <div class=\"form-grid form-grid--2col\">\n              <div class=\"form-field\">\n                <label for=\"ws-defaultContractTermMonths\">Default contract term (months)</label>\n                <p-inputNumber\n                  inputId=\"ws-defaultContractTermMonths\"\n                  formControlName=\"defaultContractTermMonths\"\n                  [min]=\"1\"\n                  [max]=\"120\"\n                  placeholder=\"12\"\n                  styleClass=\"w-full\"\n                ></p-inputNumber>\n                <small class=\"field-hint\">Used to set renewal date if contract end is missing.</small>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"ws-defaultDeliveryOwnerRoleId\">Default delivery owner role</label>\n                <p-select\n                  inputId=\"ws-defaultDeliveryOwnerRoleId\"\n                  appendTo=\"body\"\n                  [options]=\"roleOptions()\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  formControlName=\"defaultDeliveryOwnerRoleId\"\n                  placeholder=\"Select role\"\n                  styleClass=\"w-full\"\n                  [showClear]=\"true\"\n                ></p-select>\n                <small class=\"field-hint\">Assigns delivery ownership when a deal closes.</small>\n              </div>\n            </div>\n          </section>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n                </p-accordion>\n              </p-tabpanel>\n\n              <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 TAB 3 \u2014 Regional \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n              <p-tabpanel value=\"regional\">\n                <p-accordion class=\"ws-section-accordion\" [multiple]=\"true\" [value]=\"regionalPanels()\" (valueChange)=\"onRegionalPanelsChange($any($event))\">\n                  <!-- Regional Settings -->\n                  <p-accordion-panel value=\"regional-settings\">\n                    <p-accordion-header>\n                      <div class=\"ws-accordion-header\">\n                        <div class=\"ws-accordion-header__title\">\n                          <i class=\"pi pi-globe\"></i>\n                          <span>Regional Settings</span>\n                        </div>\n                        <div class=\"ws-accordion-header__badges\">\n                          <span class=\"status-badge status-badge--info\">Locale</span>\n                        </div>\n                      </div>\n                    </p-accordion-header>\n                    <p-accordion-content>\n          <section class=\"form-card\">\n            <p class=\"section-description\">Time zone and currency preferences</p>\n            \n            <div class=\"form-grid form-grid--2col\">\n              <div class=\"form-field\">\n                <label for=\"ws-timeZone\">Time Zone <span class=\"required\">*</span></label>\n                <p-select inputId=\"ws-timeZone\" appendTo=\"body\"\n                  [options]=\"timeZoneOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  formControlName=\"timeZone\"\n                  placeholder=\"Select time zone\"\n                  styleClass=\"w-full\"\n                  [filter]=\"true\"\n                  filterBy=\"label\"\n                  filterPlaceholder=\"Search time zones\"\n                >\n                  <ng-template pTemplate=\"item\" let-option>\n                    <div class=\"timezone-option\">\n                      <img\n                        class=\"timezone-flag\"\n                        [src]=\"getFlagUrl(option?.flagCode)\"\n                        [alt]=\"option?.flagCode ? option.flagCode.toUpperCase() + ' flag' : 'Flag'\"\n                        width=\"18\"\n                        height=\"12\"\n                        loading=\"lazy\"\n                      />\n                      <span>{{ option.label }}</span>\n                    </div>\n                  </ng-template>\n                  <ng-template pTemplate=\"selectedItem\" let-option>\n                    <div class=\"timezone-option\">\n                      <img\n                        class=\"timezone-flag\"\n                        [src]=\"getFlagUrl(option?.flagCode)\"\n                        [alt]=\"option?.flagCode ? option.flagCode.toUpperCase() + ' flag' : 'Flag'\"\n                        width=\"18\"\n                        height=\"12\"\n                        loading=\"lazy\"\n                      />\n                      <span>{{ option?.label }}</span>\n                    </div>\n                  </ng-template>\n                </p-select>\n                <small class=\"field-hint\">Used for date/time display across the system</small>\n              </div>\n\n              <div class=\"form-field\">\n                <label for=\"ws-currency\">Currency <span class=\"required\">*</span></label>\n                <p-select inputId=\"ws-currency\" appendTo=\"body\"\n                  [options]=\"currencyOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  formControlName=\"currency\"\n                  placeholder=\"Select currency\"\n                  styleClass=\"w-full\"\n                ></p-select>\n                <small class=\"field-hint\">Default currency for monetary values</small>\n              </div>\n            </div>\n          </section>\n                    </p-accordion-content>\n                  </p-accordion-panel>\n                </p-accordion>\n              </p-tabpanel>\n            </p-tabpanels>\n            </div>\n          </p-tabs>\n\n          <div class=\"form-actions\">\n            <button type=\"button\" class=\"btn btn-ghost\" (click)=\"loadSettings()\" [disabled]=\"loading()\">\n              <i class=\"pi pi-refresh\"></i>\n              Reset\n            </button>\n            <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"saving() || !canManageAdmin()\">\n              <i class=\"pi pi-save\" *ngIf=\"!saving()\"></i>\n              <i class=\"pi pi-spinner pi-spin\" *ngIf=\"saving()\"></i>\n              {{ saving() ? 'Saving...' : 'Save Settings' }}\n            </button>\n          </div>\n        </form>\n      </div>\n\n      <!-- Preview Card -->\n      <aside class=\"preview-card\" *ngIf=\"!loading()\">\n        <div class=\"preview-header\">\n          <div class=\"preview-title\">\n            <i class=\"pi pi-eye\"></i>\n            <h3>Live Preview</h3>\n          </div>\n          <span class=\"status-badge status-badge--success\">Active</span>\n        </div>\n\n        <div class=\"preview-workspace\">\n          <div class=\"preview-icon\">\n            <i class=\"pi pi-building\"></i>\n          </div>\n          <div class=\"preview-info\">\n            <span class=\"preview-label\">Workspace</span>\n            <strong class=\"preview-value\">{{ settingsForm.value.name || 'Untitled workspace' }}</strong>\n          </div>\n        </div>\n\n        <div class=\"preview-grid\">\n          <div class=\"preview-item\">\n            <div class=\"preview-item-icon\">\n              <i class=\"pi pi-clock\"></i>\n            </div>\n            <div>\n              <span class=\"preview-item-label\">Time Zone</span>\n              <strong class=\"preview-item-value\">{{ settingsForm.value.timeZone || 'UTC' }}</strong>\n            </div>\n          </div>\n\n          <div class=\"preview-item\">\n            <div class=\"preview-item-icon preview-item-icon--success\">\n              <i class=\"pi pi-dollar\"></i>\n            </div>\n            <div>\n              <span class=\"preview-item-label\">Currency</span>\n              <strong class=\"preview-item-value\">{{ currentCurrency() }}</strong>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"preview-note\">\n          <i class=\"pi pi-info-circle\"></i>\n          <span>These defaults apply to new records and pipeline metrics.</span>\n        </div>\n      </aside>\n    </div>\n  </section>\n</div>\n", styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   WORKSPACE SETTINGS PAGE - Premium Glass UI with Card Focus Effects\n   Using form-page-styles mixins for consistent design system\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HOST SETUP\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n:host {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   PAGE CONTAINER - Premium Glass Base with Animated Orbs\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.page-container {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n/* Animated Background Orbs */\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: float 20s ease-in-out infinite;\n}\n\n.orb-1 {\n  width: 400px;\n  height: 400px;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%);\n  top: -100px;\n  right: -100px;\n  animation-delay: 0s;\n}\n\n.orb-2 {\n  width: 300px;\n  height: 300px;\n  background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%);\n  bottom: 20%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3 {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.06) 100%);\n  top: 50%;\n  right: 10%;\n  animation-delay: -14s;\n}\n\n@keyframes float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(30px, -30px) scale(1.05);\n  }\n  66% {\n    transform: translate(-20px, 20px) scale(0.95);\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HERO SECTION\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.hero-section {\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 2rem;\n  padding: 2rem;\n  @include form.form-section;\n  margin-bottom: 1.5rem;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.4rem 0.85rem;\n  background: rgba(139, 92, 246, 0.1);\n  border: 1px solid rgba(139, 92, 246, 0.2);\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #7c3aed;\n  width: fit-content;\n}\n\n.badge-dot {\n  width: 6px;\n  height: 6px;\n  background: #8b5cf6;\n  border-radius: 50%;\n  animation: pulse-dot 2s ease-in-out infinite;\n}\n\n@keyframes pulse-dot {\n  0%, 100% { opacity: 1; transform: scale(1); }\n  50% { opacity: 0.6; transform: scale(0.9); }\n}\n\n\n.hero-description {\n  font-size: 1rem;\n  color: rgba(60, 60, 67, 0.7);\n  max-width: 480px;\n  margin: 0;\n  line-height: 1.6;\n}\n\n.hero-actions {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n  flex-wrap: wrap;\n}\n\n.numbering-row {\n  display: grid;\n  grid-template-columns: minmax(0, 1.4fr) minmax(220px, 0.8fr) minmax(180px, 0.8fr);\n  gap: 1rem;\n  align-items: center;\n  padding: 1rem 1.1rem;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.72);\n}\n\n.numbering-row + .numbering-row {\n  margin-top: 0.85rem;\n}\n\n.numbering-row__meta {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n\n.numbering-row__title {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-weight: 700;\n  color: #1f2937;\n}\n\n.numbering-row__meta p {\n  margin: 0;\n  color: rgba(60, 60, 67, 0.72);\n  font-size: 0.88rem;\n  line-height: 1.5;\n}\n\n.numbering-row__input {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}\n\n.numbering-row__input label {\n  font-size: 0.74rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n\n@media (max-width: 900px) {\n  .numbering-row {\n    grid-template-columns: 1fr;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HERO VISUAL CARDS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n\n  @media (max-width: 1100px) {\n    flex-direction: row;\n  }\n\n  @media (max-width: 600px) {\n    flex-direction: column;\n  }\n}\n\n.visual-card {\n  display: flex;\n  gap: 1rem;\n  padding: 1.25rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  flex: 1;\n  position: relative;\n  overflow: hidden;\n\n  /* Gradient border glow on hover */\n  &::before {\n    content: '';\n    position: absolute;\n    inset: -1px;\n    border-radius: 17px;\n    padding: 1px;\n    background: linear-gradient(135deg, transparent 0%, transparent 100%);\n    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n    -webkit-mask-composite: xor;\n    mask-composite: exclude;\n    pointer-events: none;\n    opacity: 0;\n    transition: all 0.3s ease;\n  }\n\n  &:hover {\n    transform: translateY(-3px) scale(1.01);\n    box-shadow: \n      0 8px 24px rgba(15, 23, 42, 0.08),\n      0 0 40px rgba(0, 122, 255, 0.06);\n  }\n\n  &:hover::before {\n    opacity: 1;\n    background: linear-gradient(135deg, \n      rgba(0, 122, 255, 0.3) 0%,\n      rgba(175, 82, 222, 0.2) 50%,\n      rgba(90, 200, 250, 0.3) 100%);\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n    border-color: rgba(139, 92, 246, 0.15);\n  }\n\n  &--secondary {\n    background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);\n    border-color: rgba(14, 165, 233, 0.15);\n  }\n}\n\n.card-icon {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 1.1rem;\n    color: #7c3aed;\n  }\n\n  .visual-card--secondary & {\n    background: rgba(14, 165, 233, 0.12);\n    i { color: #0284c7; }\n  }\n\n  .visual-card:hover & {\n    transform: scale(1.08);\n    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);\n  }\n}\n\n.card-content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n\n.card-label {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.card-value {\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.card-trend {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.6);\n\n  i { font-size: 0.625rem; }\n\n  &--up {\n    color: #059669;\n    i { color: #10b981; }\n  }\n\n  &--down {\n    color: #dc2626;\n    i { color: #ef4444; }\n  }\n}\n\n.card-glow {\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(\n    circle at 30% 30%,\n    rgba(139, 92, 246, 0.15) 0%,\n    transparent 60%\n  );\n  opacity: 0;\n  transition: opacity 0.4s ease;\n  pointer-events: none;\n\n  .visual-card:hover & {\n    opacity: 1;\n  }\n\n  .visual-card--secondary & {\n    background: radial-gradient(\n      circle at 30% 30%,\n      rgba(14, 165, 233, 0.15) 0%,\n      transparent 60%\n    );\n  }\n\n  .visual-card--success & {\n    background: radial-gradient(\n      circle at 30% 30%,\n      rgba(16, 185, 129, 0.15) 0%,\n      transparent 60%\n    );\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   METRICS SECTION - KPI Dashboard Cards\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes ring-draw {\n  from {\n    stroke-dasharray: 0, 100;\n  }\n}\n\n.metrics-section {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.75rem;\n  margin-bottom: 1.5rem;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 0.75rem;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 4 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08);\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 0.5rem;\n    font-size: 1.125rem;\n    color: white;\n    flex-shrink: 0;\n    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n  }\n\n  &--total .metric-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n  &--leads .metric-icon { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n  &--prospects .metric-icon { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n  &--customers .metric-icon { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n  &--new .metric-icon { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: 0.7rem;\n    color: #6b7280;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: 1.375rem;\n    font-weight: 700;\n    color: #1f2937;\n  }\n}\n\n// Ring Chart\n.metric-ring {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: #e5e7eb;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n    animation: ring-draw 1s ease-out;\n\n    &--cyan { stroke: #06b6d4; }\n    &--purple { stroke: #a855f7; }\n    &--green { stroke: #22c55e; }\n    &--orange { stroke: #f97316; }\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   BUTTONS - Using form-page-styles patterns\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 12px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  text-decoration: none;\n  white-space: nowrap;\n  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n\n  i { font-size: 0.85rem; }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.btn-primary {\n  @include form.button-primary;\n}\n\n.btn-secondary {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: rgba(15, 23, 42, 0.8);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.5);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n  }\n}\n\n.btn-ghost {\n  @include form.button-ghost;\n}\n\n/* \u2500\u2500\u2500 Preset action buttons & status \u2500\u2500\u2500 */\n.preset-actions {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  flex-wrap: wrap;\n}\n\n.preset-status {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: #059669;\n  padding: $space-1 $space-3;\n  background: rgba(16, 185, 129, 0.1);\n  border: 1px solid rgba(16, 185, 129, 0.25);\n  border-radius: $radius-full;\n\n  i { font-size: 0.8rem; }\n\n  &--applying {\n    color: #6366f1;\n    background: rgba(99, 102, 241, 0.1);\n    border-color: rgba(99, 102, 241, 0.25);\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   DATA SECTION & LAYOUT\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.data-section {\n  animation: fade-in-up 0.4s ease-out 0.1s both;\n  position: relative;\n  z-index: 1;\n}\n\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.settings-layout {\n  display: grid;\n  grid-template-columns: 1fr 360px;\n  gap: 1.5rem;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   DATA CARD - Premium Glass with Focus Pop Effect\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.data-card {\n  @include form.form-section;\n  overflow: hidden;\n}\n\n.data-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.15rem 1.35rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n\n.header-title {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n\n  h2 {\n    font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n    font-size: 1.05rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.record-count {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.header-actions {\n  display: flex;\n  gap: 0.65rem;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   LOADING STATE\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.loading-state {\n  padding: 1.5rem;\n}\n\n.skeleton-row {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n}\n\n.skeleton {\n  background: linear-gradient(\n    90deg,\n    rgba(148, 163, 184, 0.1) 25%,\n    rgba(148, 163, 184, 0.2) 50%,\n    rgba(148, 163, 184, 0.1) 75%\n  );\n  background-size: 200% 100%;\n  animation: shimmer 1.5s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n@keyframes shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}\n\n.skeleton-text {\n  height: 14px;\n  width: 120px;\n}\n\n.skeleton-input {\n  height: 42px;\n  width: 100%;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   FORM STYLES - Premium Glass Cards with Focus Effects\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.settings-form {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n/* Form Card - Using design system form-section mixin */\n.form-card {\n  @include form.form-section;\n  padding: 1.5rem;\n  margin: 0;\n\n  /* Override popup lift \u2014 use subtle glow instead */\n  &:hover {\n    transform: none;\n    background: rgba(255, 255, 255, 0.68);\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.9) inset,\n      0 1px 3px rgba(0, 0, 0, 0.03),\n      0 4px 16px rgba(0, 0, 0, 0.05),\n      0 0 0 1px rgba(99, 102, 241, 0.12);\n  }\n\n  &:focus-within {\n    transform: none;\n    background: rgba(255, 255, 255, 0.75);\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 1) inset,\n      0 2px 8px rgba(0, 0, 0, 0.04),\n      0 0 0 2px rgba(99, 102, 241, 0.18),\n      0 0 24px rgba(99, 102, 241, 0.06);\n  }\n\n  &:hover .section-title {\n    @include form.section-title-hover;\n  }\n}\n\n.section-title {\n  @include form.section-title;\n  margin-bottom: 0.5rem;\n\n  /* Variant: Info (blue) */\n  &--info {\n    i {\n      background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%);\n      color: #0284c7;\n      box-shadow: 0 2px 8px rgba(14, 165, 233, 0.15);\n    }\n    color: #0369a1;\n  }\n\n  /* Variant: Warning (amber) */\n  &--warning {\n    i {\n      background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%);\n      color: #d97706;\n      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);\n    }\n    color: #b45309;\n  }\n\n  /* Variant: Success (green) */\n  &--success {\n    i {\n      background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(34, 197, 94, 0.1) 100%);\n      color: #059669;\n      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);\n    }\n    color: #047857;\n  }\n}\n\n.section-description {\n  font-size: 0.82rem;\n  color: rgba(60, 60, 67, 0.6);\n  margin: 0 0 1.25rem 0;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n.form-grid {\n  @include form.form-grid;\n  grid-template-columns: 1fr;\n\n  &--2col {\n    grid-template-columns: repeat(2, 1fr);\n\n    @media (max-width: 768px) {\n      grid-template-columns: 1fr;\n    }\n  }\n\n  &--3col {\n    grid-template-columns: repeat(3, 1fr);\n\n    @media (max-width: 1100px) {\n      grid-template-columns: repeat(2, 1fr);\n    }\n\n    @media (max-width: 768px) {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n/* \u2500\u2500\u2500 Field preview (single-value display) \u2500\u2500\u2500 */\n.field-preview {\n  font-size: $font-size-md;\n  font-weight: 600;\n  color: #1e293b;\n  padding: $space-2 $space-3;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  border-radius: $radius-md;\n  backdrop-filter: blur(8px);\n}\n\n/* \u2500\u2500\u2500 Token pill list (pack items) \u2500\u2500\u2500 */\n.token-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: $space-2;\n  align-items: center;\n}\n\n.token-pill {\n  display: inline-flex;\n  align-items: center;\n  padding: 3px $space-3;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: #334155;\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  border-radius: $radius-full;\n  backdrop-filter: blur(8px);\n  white-space: nowrap;\n  transition: all 200ms ease;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.9);\n    border-color: rgba(99, 102, 241, 0.35);\n    transform: translateY(-1px);\n    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);\n  }\n}\n\n.form-card-inner {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  border-radius: 16px;\n  border: 1px dashed rgba(148, 163, 184, 0.35);\n  background: rgba(15, 23, 42, 0.35);\n}\n\n.section-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n\n.approval-step {\n  padding: 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  background: rgba(15, 23, 42, 0.3);\n  margin-bottom: 1rem;\n}\n\n.approval-step:last-child {\n  margin-bottom: 0;\n}\n\n.step-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.75rem;\n  font-weight: 600;\n}\n\n.field {\n  @include form.form-field;\n\n  label {\n    @include form.form-label;\n\n    .required {\n      @include form.form-required;\n    }\n  }\n\n  input[pInputText],\n  .p-inputtext {\n    @include form.premium-input;\n\n    &:hover {\n      @include form.premium-input-hover;\n    }\n\n    &:focus {\n      @include form.premium-input-focus;\n    }\n  }\n}\n\n/* \u2500\u2500\u2500 Gold-standard horizontal form-field layout \u2500\u2500\u2500 */\n.form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n  flex-wrap: wrap;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n\n    .required {\n      @include form.form-required;\n    }\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n\n  > .field-hint {\n    flex-basis: 100%;\n    padding-left: calc(110px + 0.75rem);\n  }\n\n  input[pInputText],\n  .p-inputtext {\n    @include form.premium-input;\n\n    &:hover {\n      @include form.premium-input-hover;\n    }\n\n    &:focus {\n      @include form.premium-input-focus;\n    }\n  }\n}\n\n.field-hint {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.5);\n  margin-top: 0.35rem;\n}\n\n/* Keep time zone option rows aligned with flag icons. */\n:host ::ng-deep .timezone-option {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n\n:host ::ng-deep .timezone-flag {\n  width: 18px;\n  height: 12px;\n  border-radius: 2px;\n  object-fit: cover;\n  background: #e2e8f0;\n  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1);\n}\n\n// PrimeNG overrides with premium focus effects\n:host ::ng-deep {\n  .p-select,\n  .p-inputnumber {\n    width: 100%;\n\n    .p-select-label,\n    .p-inputnumber-input {\n      @include form.premium-input;\n    }\n\n    &:hover {\n      .p-select-label,\n      .p-inputnumber-input {\n        @include form.premium-input-hover;\n      }\n    }\n\n    &.p-focus,\n    &:focus-within {\n      .p-select-label,\n      .p-inputnumber-input {\n        @include form.premium-input-focus;\n      }\n    }\n  }\n}\n\n.form-actions {\n  @include form.form-actions;\n  border-top: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   PREVIEW CARD - Premium Glass with Focus Pop\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.preview-card {\n  @include form.form-section;\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n}\n\n.preview-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.preview-title {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n\n  i {\n    font-size: 0.9rem;\n    color: rgba(60, 60, 67, 0.6);\n  }\n\n  h3 {\n    font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n    font-size: 0.95rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.preview-workspace {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  padding: 1rem;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n  border: 1px solid rgba(139, 92, 246, 0.12);\n  border-radius: 14px;\n  transition: all 0.3s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.12);\n  }\n}\n\n.preview-icon {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(14, 165, 233, 0.12) 100%);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 1.2rem;\n    color: #7c3aed;\n  }\n\n  .preview-workspace:hover & {\n    transform: scale(1.05);\n  }\n}\n\n.preview-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n\n.preview-label {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.preview-value {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.preview-grid {\n  display: grid;\n  gap: 0.6rem;\n  grid-template-columns: 1fr 1fr;\n}\n\n.preview-item {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.75rem;\n  background: rgba(248, 250, 252, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  border-radius: 12px;\n  transition: all 0.25s ease;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.95);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);\n  }\n}\n\n.preview-item-icon {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.1);\n  border-radius: 8px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 0.8rem;\n    color: #7c3aed;\n  }\n\n  &--success {\n    background: rgba(16, 185, 129, 0.1);\n    i { color: #059669; }\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.1);\n    i { color: #d97706; }\n  }\n\n  &--info {\n    background: rgba(14, 165, 233, 0.1);\n    i { color: #0284c7; }\n  }\n\n  .preview-item:hover & {\n    transform: scale(1.08);\n  }\n}\n\n.preview-item-label {\n  display: block;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.preview-item-value {\n  display: block;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.preview-note {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.6rem;\n  padding: 0.75rem;\n  background: rgba(139, 92, 246, 0.06);\n  border: 1px solid rgba(139, 92, 246, 0.1);\n  border-radius: 10px;\n  font-size: 0.78rem;\n  color: #7c3aed;\n\n  i {\n    font-size: 0.85rem;\n    margin-top: 0.05rem;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   STATUS BADGES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  white-space: nowrap;\n\n  i { font-size: 0.6rem; }\n\n  &--success {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #b45309;\n  }\n}\n\n.toggle-row {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n\n.policy-block {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(248, 250, 252, 0.7);\n}\n\n.policy-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n\n.policy-header h4 {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #1e293b;\n}\n\n.policy-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.policy-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 120px auto;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n.policy-row--modifier {\n  grid-template-columns: 1fr 120px auto;\n}\n\n.policy-row .btn {\n  height: 40px;\n  align-self: center;\n}\n\n.checkbox-field {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  color: #1e293b;\n  cursor: pointer;\n}\n\n.checkbox-option {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.75rem;\n  min-height: 2.5rem;\n  padding: 0.1rem 0;\n\n  .p-checkbox {\n    margin-top: 0.1rem;\n  }\n\n  &--primary {\n    align-items: center;\n  }\n\n  &--muted {\n    opacity: 0.7;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   RESPONSIVE\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@media (max-width: 768px) {\n  .page-container {\n    padding: 1rem;\n  }\n\n  .hero-section {\n    padding: 1.35rem;\n    gap: 1.25rem;\n  }\n\n  .hero-stats {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .preview-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-card {\n    position: static;\n  }\n\n  .form-section {\n    padding: 1.25rem;\n    border-radius: 16px;\n  }\n\n  .policy-row,\n  .policy-row--modifier {\n    grid-template-columns: 1fr;\n  }\n}\n\n/* \u2500\u2500 Branding upload \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.branding-upload {\n  display: flex;\n  gap: 1.5rem;\n  align-items: flex-start;\n  margin-top: 0.75rem;\n}\n\n.branding-preview {\n  width: 140px;\n  height: 80px;\n  border-radius: 8px;\n  border: 1px dashed rgba(255, 255, 255, 0.15);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  background: rgba(0, 0, 0, 0.08);\n  flex-shrink: 0;\n\n  &__img {\n    max-width: 100%;\n    max-height: 100%;\n    object-fit: contain;\n  }\n\n  &__placeholder {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 0.25rem;\n    color: var(--text-color-secondary, #94a3b8);\n    font-size: 0.75rem;\n\n    i {\n      font-size: 1.25rem;\n    }\n  }\n}\n\n.branding-actions {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  align-items: flex-start;\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   VERTICAL SIDEBAR TABS \u2014 Workspace Settings\n   Glass pill sidebar with icon + label, active glow highlight\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n\n/* Outer PrimeNG wrapper \u2014 reset its chrome */\n.ws-sidebar-tabs {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  padding: 0;\n  border-radius: 0;\n}\n\n/* Side-by-side grid: sidebar | content */\n.ws-sidebar-layout {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  gap: 1.5rem;\n  min-height: 480px;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n    gap: 1rem;\n  }\n}\n\n/* \u2500\u2500 Sidebar navigation column \u2500\u2500 */\n:host ::ng-deep .ws-sidebar-nav.p-tablist {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0.65rem;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.88));\n  border: 1px solid rgba(226, 232, 240, 0.6);\n  border-radius: 20px;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.8),\n    0 8px 24px rgba(15, 23, 42, 0.06),\n    0 2px 8px rgba(15, 23, 42, 0.04);\n  backdrop-filter: blur(16px) saturate(120%);\n  -webkit-backdrop-filter: blur(16px) saturate(120%);\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n}\n\n:host ::ng-deep .ws-sidebar-nav .p-tablist-tab-list {\n  display: flex !important;\n  flex-direction: column !important;\n  gap: 0.35rem;\n  border: none !important;\n}\n\n/* \u2500\u2500 Individual sidebar item \u2500\u2500 */\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border: none;\n  border-radius: 14px;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: #475569;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  transition:\n    background 0.22s ease,\n    color 0.22s ease,\n    transform 0.18s ease,\n    box-shadow 0.22s ease;\n  background: rgba(255, 255, 255, 0.35);\n  text-shadow: none;\n  white-space: nowrap;\n  text-align: left;\n  justify-content: flex-start;\n  min-height: 0;\n  line-height: 1.3;\n  opacity: 1 !important;\n}\n\n/* Icon inside sidebar item */\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item i.pi {\n  font-size: 1.1rem;\n  width: 22px;\n  text-align: center;\n  flex-shrink: 0;\n  transition: transform 0.22s ease, color 0.22s ease;\n}\n\n/* Subtle glass sheen on top half */\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item::before {\n  content: '';\n  position: absolute;\n  inset: 0 0 auto 0;\n  height: 50%;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent);\n  pointer-events: none;\n  border-radius: inherit;\n}\n\n/* \u2500\u2500 Hover state \u2500\u2500 */\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) {\n  background: rgba(99, 102, 241, 0.08);\n  color: #1e293b;\n  transform: translateX(3px);\n}\n\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item:hover:not(.p-tab-active):not([data-p-active='true']):not([aria-selected='true']) i.pi {\n  transform: scale(1.08);\n}\n\n/* \u2500\u2500 Focus visible \u2500\u2500 */\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item:focus-visible {\n  outline: none;\n  box-shadow:\n    0 0 0 2px rgba(255, 255, 255, 0.8),\n    0 0 0 4px rgba(99, 102, 241, 0.2);\n}\n\n/* \u2500\u2500 Active state \u2014 gradient glow pill \u2500\u2500 */\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active,\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true'],\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true'] {\n  color: #ffffff;\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),\n    var(--ws-side-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n  box-shadow:\n    0 0 0 1px rgba(255, 255, 255, 0.22),\n    0 8px 20px rgba(59, 130, 246, 0.30),\n    0 0 28px rgba(125, 211, 252, 0.18);\n  transform: translateX(4px);\n  animation: ws-side-breathe 2.2s ease-in-out infinite;\n}\n\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active,\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true'],\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true'] {\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active .ws-sidebar-label,\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true'] .ws-sidebar-label,\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true'] .ws-sidebar-label {\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active i.pi,\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true'] i.pi,\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true'] i.pi {\n  color: #ffffff !important;\n  transform: scale(1.12);\n  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3));\n}\n\n/* Active left accent strip */\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active::after,\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true']::after,\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true']::after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 15%;\n  bottom: 15%;\n  width: 3px;\n  border-radius: 0 4px 4px 0;\n  background: linear-gradient(\n    180deg,\n    rgba(255, 255, 255, 0.2) 0%,\n    rgba(239, 68, 68, 0.9) 14%,\n    rgba(245, 158, 11, 0.9) 28%,\n    rgba(34, 197, 94, 0.9) 50%,\n    rgba(59, 130, 246, 0.95) 72%,\n    rgba(139, 92, 246, 0.95) 86%,\n    rgba(255, 255, 255, 0.2) 100%\n  );\n  box-shadow:\n    0 0 8px rgba(59, 130, 246, 0.4),\n    2px 0 12px rgba(139, 92, 246, 0.2);\n  background-size: 100% 300%;\n  animation: ws-side-strip 3s linear infinite;\n}\n\n/* \u2500\u2500 Per-tab gradient colors (sidebar) \u2500\u2500 */\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item:nth-child(1) {\n  --ws-side-bg: linear-gradient(135deg, #3f8dff 0%, #2364da 100%);\n}\n\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item:nth-child(2) {\n  --ws-side-bg: linear-gradient(135deg, #36c3df 0%, #1497c0 100%);\n}\n\n:host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item:nth-child(3) {\n  --ws-side-bg: linear-gradient(135deg, #6f84aa 0%, #556f94 100%);\n}\n\n/* \u2500\u2500 Content area \u2500\u2500 */\n.ws-sidebar-content {\n  flex: 1;\n  min-width: 0;\n}\n\n/* \u2500\u2500 Sidebar label \u2500\u2500 */\n.ws-sidebar-label {\n  font-size: 0.88rem;\n  font-weight: 600;\n  letter-spacing: 0.005em;\n}\n\n/* \u2500\u2500 Animations \u2500\u2500 */\n@keyframes ws-side-breathe {\n  0%, 100% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.18),\n      0 6px 16px rgba(59, 130, 246, 0.22),\n      0 0 20px rgba(125, 211, 252, 0.12);\n  }\n  50% {\n    box-shadow:\n      0 0 0 1px rgba(255, 255, 255, 0.26),\n      0 8px 22px rgba(59, 130, 246, 0.30),\n      0 0 32px rgba(125, 211, 252, 0.20),\n      0 0 40px rgba(255, 255, 255, 0.06);\n  }\n}\n\n@keyframes ws-side-strip {\n  0% { background-position: 100% 0%; }\n  100% { background-position: 100% 300%; }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  :host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active,\n  :host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true'],\n  :host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true'] {\n    animation: none;\n  }\n  :host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active::after,\n  :host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true']::after,\n  :host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true']::after {\n    animation: none;\n  }\n}\n\n/* Mobile: sidebar collapses to horizontal row */\n@media (max-width: 900px) {\n  :host ::ng-deep .ws-sidebar-nav.p-tablist {\n    flex-direction: row;\n    overflow-x: auto;\n    padding: 0.65rem;\n    border-radius: 14px;\n    position: static;\n  }\n\n  :host ::ng-deep .ws-sidebar-nav .p-tablist-tab-list {\n    flex-direction: row !important;\n    gap: 0.35rem;\n  }\n\n  :host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item {\n    flex: 0 0 auto;\n    padding: 0.65rem 1rem;\n  }\n\n  :host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active,\n  :host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true'],\n  :host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true'] {\n    transform: translateY(-2px);\n  }\n\n  :host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item.p-tab-active::after,\n  :host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[aria-selected='true']::after,\n  :host ::ng-deep .ws-sidebar-nav .p-tab.ws-sidebar-item[data-p-active='true']::after {\n    left: 15%;\n    right: 15%;\n    top: auto;\n    bottom: 0;\n    width: auto;\n    height: 3px;\n    border-radius: 4px 4px 0 0;\n    background: linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0.2) 0%,\n      rgba(59, 130, 246, 0.95) 30%,\n      rgba(139, 92, 246, 0.95) 70%,\n      rgba(255, 255, 255, 0.2) 100%\n    );\n    background-size: 300% 100%;\n    animation: ws-side-strip-h 3s linear infinite;\n  }\n}\n\n@keyframes ws-side-strip-h {\n  0% { background-position: 0% 100%; }\n  100% { background-position: 300% 100%; }\n}\n\n/* Hide PrimeNG default tab ink bar */\n:host ::ng-deep .ws-sidebar-nav .p-tablist-active-bar {\n  display: none !important;\n}\n\n/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   WORKSPACE SECTION ACCORDION\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n.ws-section-accordion {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n:host ::ng-deep .ws-section-accordion .p-accordionpanel {\n  border: none;\n  border-radius: 14px;\n  overflow: hidden;\n  background: transparent;\n  box-shadow: none;\n}\n\n:host ::ng-deep .ws-section-accordion .p-accordionheader {\n  background: transparent;\n  border: none;\n  padding: 0;\n  border-radius: 14px;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n}\n\n:host ::ng-deep .ws-section-accordion .p-accordionheader:hover {\n  background: transparent;\n}\n\n:host ::ng-deep .ws-section-accordion .p-accordioncontent-content {\n  padding: 0;\n  background: transparent;\n  border: none;\n}\n\n.ws-accordion-header {\n  width: 100%;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.85rem 1rem;\n  border-radius: 0 12px 12px 0;\n  border: 1px solid rgba(59, 130, 246, 0.18);\n  border-left: 3px solid #3b82f6;\n  background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    border-color: rgba(59, 130, 246, 0.35);\n    border-left-color: #2563eb;\n    background: linear-gradient(180deg, #e8f1ff 0%, #dce8f8 100%);\n    box-shadow:\n      0 8px 24px rgba(59, 130, 246, 0.1),\n      0 0 0 1px rgba(59, 130, 246, 0.08);\n    transform: translateY(-1px);\n  }\n}\n\n.ws-accordion-header__title {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n  min-width: 0;\n  color: rgba(30, 41, 59, 0.95);\n  font-weight: 700;\n  font-size: 0.92rem;\n\n  i {\n    color: #2563eb;\n    font-size: 0.95rem;\n  }\n}\n\n.ws-accordion-header__badges {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n\n  .status-badge {\n    font-size: 0.72rem;\n    padding: 0.18rem 0.55rem;\n    border-radius: 6px;\n    font-weight: 600;\n    letter-spacing: 0.02em;\n  }\n\n  .status-badge--success {\n    background: rgba(34, 197, 94, 0.12);\n    color: #16a34a;\n  }\n\n  .status-badge--info {\n    background: rgba(59, 130, 246, 0.12);\n    color: #2563eb;\n  }\n\n  .status-badge--warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #d97706;\n  }\n}\n\n/* Remove form-card box treatment inside accordion \u2014 the accordion header replaces it */\n:host ::ng-deep .ws-section-accordion .p-accordioncontent .form-card {\n  background: transparent;\n  border: none;\n  box-shadow: none;\n  border-radius: 0;\n  padding: 0.75rem 0.5rem 0.25rem;\n  margin: 0;\n\n  &:hover {\n    transform: none;\n    box-shadow: none;\n  }\n}\n\n/* Remove section-title inside accordion since the header already shows it */\n:host ::ng-deep .ws-section-accordion .p-accordioncontent .form-card .section-title {\n  display: none;\n}\n\n/* Mobile */\n@media (max-width: 768px) {\n  .ws-accordion-header {\n    padding: 0.75rem 0.85rem;\n    gap: 0.55rem;\n    flex-wrap: wrap;\n  }\n\n  .ws-accordion-header__title {\n    font-size: 0.85rem;\n  }\n\n  .ws-accordion-header__badges {\n    width: 100%;\n    justify-content: flex-start;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// AI ACTION SCORING \u2014 Visual Redesign\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n// --- Live Preview Card ---\n.scoring-preview {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(99, 102, 241, 0.06) 100%);\n  border: 1px solid rgba(59, 130, 246, 0.18);\n  border-left: 3px solid #3b82f6;\n  border-radius: 0 10px 10px 0;\n  margin-bottom: 1.25rem;\n\n  &__icon {\n    width: 32px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n    border-radius: 8px;\n    font-size: 0.85rem;\n    flex-shrink: 0;\n  }\n\n  &__body {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    min-width: 0;\n  }\n\n  &__title {\n    font-size: 0.8125rem;\n    font-weight: 700;\n    color: #1e293b;\n  }\n\n  &__formula {\n    font-size: 0.78rem;\n    color: #64748b;\n    line-height: 1.5;\n  }\n}\n\n.scoring-tag {\n  display: inline-block;\n  padding: 1px 8px;\n  border-radius: 99px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n\n  &--low {\n    background: rgba(34, 197, 94, 0.14);\n    color: #15803d;\n  }\n\n  &--medium {\n    background: rgba(245, 158, 11, 0.14);\n    color: #b45309;\n  }\n\n  &--high {\n    background: rgba(239, 68, 68, 0.14);\n    color: #dc2626;\n  }\n}\n\n// --- Subsection Titles ---\n.scoring-subsection-title {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.85rem;\n  font-weight: 700;\n  color: #1e293b;\n  margin: 1.25rem 0 0.75rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  > i {\n    color: #3b82f6;\n    font-size: 0.9rem;\n  }\n\n  .scoring-subsection-hint {\n    font-size: 0.75rem;\n    font-weight: 400;\n    color: #94a3b8;\n    margin-left: auto;\n  }\n}\n\n// --- Weight Cards Grid ---\n.scoring-weights-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 0.75rem;\n  margin-bottom: 0.5rem;\n}\n\n.scoring-weight-card {\n  padding: 0.75rem 1rem;\n  background: rgba(255, 255, 255, 0.88);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 10px;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    border-color: rgba(59, 130, 246, 0.25);\n    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.08);\n    transform: translateY(-1px);\n  }\n\n  &__header {\n    display: flex;\n    align-items: center;\n    gap: 0.6rem;\n    margin-bottom: 0.6rem;\n  }\n\n  &__icon {\n    width: 28px;\n    height: 28px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 7px;\n    font-size: 0.8rem;\n    color: white;\n    flex-shrink: 0;\n\n    &--danger  { background: linear-gradient(135deg, #f87171 0%, #ef4444 100%); }\n    &--warning { background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); }\n    &--purple  { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n    &--cyan    { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n    &--orange  { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }\n  }\n\n  &__label {\n    display: block;\n    font-size: 0.8125rem;\n    font-weight: 700;\n    color: #1e293b;\n  }\n\n  &__hint {\n    display: block;\n    font-size: 0.72rem;\n    color: #94a3b8;\n    line-height: 1.3;\n  }\n\n  .form-field {\n    margin: 0;\n\n    > label {\n      min-width: 50px;\n      font-size: 0.75rem;\n    }\n  }\n}\n\n// --- Visual Gradient Scale Bars ---\n.scoring-scale {\n  margin-bottom: 1rem;\n\n  &__bar {\n    display: flex;\n    width: 100%;\n    height: 36px;\n    border-radius: 10px;\n    overflow: hidden;\n    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);\n  }\n\n  &__segment {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    min-width: 40px;\n    transition: width 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    position: relative;\n  }\n\n  &__label {\n    font-size: 0.7rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    line-height: 1;\n  }\n\n  &__range {\n    font-size: 0.62rem;\n    opacity: 0.8;\n    line-height: 1;\n    margin-top: 1px;\n  }\n\n  // Risk colors\n  &__segment--low {\n    background: linear-gradient(135deg, #bbf7d0 0%, #86efac 100%);\n    color: #166534;\n  }\n\n  &__segment--medium {\n    background: linear-gradient(135deg, #fef08a 0%, #fde047 100%);\n    color: #854d0e;\n  }\n\n  &__segment--high {\n    background: linear-gradient(135deg, #fca5a5 0%, #f87171 100%);\n    color: #991b1b;\n  }\n\n  // Urgency colors\n  &__segment--normal {\n    background: linear-gradient(135deg, #bfdbfe 0%, #93c5fd 100%);\n    color: #1e40af;\n  }\n\n  &__segment--soon {\n    background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);\n    color: #9a3412;\n  }\n\n  &__segment--immediate {\n    background: linear-gradient(135deg, #fca5a5 0%, #f87171 100%);\n    color: #991b1b;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(WorkspaceSettingsPage, { className: "WorkspaceSettingsPage", filePath: "src/app/crm/features/settings/pages/workspace-settings.page.ts", lineNumber: 72 }); })();
