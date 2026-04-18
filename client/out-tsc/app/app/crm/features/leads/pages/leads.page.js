import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DrawerModule } from 'primeng/drawer';
import { KnobModule } from 'primeng/knob';
import { forkJoin, of, timer } from 'rxjs';
import { catchError, map, switchMap, takeWhile, tap } from 'rxjs/operators';
import { LEAD_STATUSES } from '../models/lead.model';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { BulkActionsBarComponent } from '../../../../shared/components/bulk-actions/bulk-actions-bar.component';
import { readTokenContext, readUserId, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { computeLeadScore } from './lead-scoring.util';
import { MailComposeService } from '../../../../core/email/mail-compose.service';
import { LeadImportWizardComponent } from '../components/lead-import-wizard/lead-import-wizard.component';
import * as i0 from "@angular/core";
import * as i1 from "../services/lead-data.service";
import * as i2 from "@angular/router";
import * as i3 from "../../settings/services/user-admin-data.service";
import * as i4 from "../../../../shared/services/import-job.service";
import * as i5 from "@angular/forms";
import * as i6 from "primeng/button";
import * as i7 from "primeng/api";
import * as i8 from "primeng/checkbox";
import * as i9 from "primeng/inputtext";
import * as i10 from "primeng/select";
import * as i11 from "primeng/table";
import * as i12 from "primeng/paginator";
import * as i13 from "primeng/dialog";
import * as i14 from "primeng/tooltip";
import * as i15 from "primeng/drawer";
import * as i16 from "primeng/knob";
const _c0 = () => ({ width: "360px" });
const _c1 = a0 => ({ "leads-table--compact": a0 });
const _c2 = () => [10, 25, 50];
const _c3 = () => [1, 2, 3, 4, 5, 6, 7, 8];
function LeadsPage_kbd_170_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "kbd");
    i0.ɵɵtext(1, "\u2318K");
    i0.ɵɵelementEnd();
} }
function LeadsPage_button_171_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 112);
    i0.ɵɵlistener("click", function LeadsPage_button_171_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); ctx_r1.searchTerm = ""; return i0.ɵɵresetView(ctx_r1.onSearch("")); });
    i0.ɵɵelement(1, "i", 113);
    i0.ɵɵelementEnd();
} }
function LeadsPage_button_175_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 114);
    i0.ɵɵlistener("click", function LeadsPage_button_175_Template_button_click_0_listener() { const opt_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onStatusChange(opt_r4.value)); });
    i0.ɵɵelement(1, "span", 115);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const opt_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r1.statusFilter === opt_r4.value);
    i0.ɵɵattribute("aria-label", "Filter: " + opt_r4.label + " leads");
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-status", opt_r4.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", opt_r4.label, " ");
} }
function LeadsPage_button_183_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 116);
    i0.ɵɵlistener("click", function LeadsPage_button_183_Template_button_click_0_listener() { const option_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onConversationViewChange(option_r6.value)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 117);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r1.conversationView === option_r6.value);
    i0.ɵɵattribute("aria-label", "Conversation filter: " + option_r6.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r6.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.conversationFilterCount(option_r6.value));
} }
function LeadsPage_button_185_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 118);
    i0.ɵɵlistener("click", function LeadsPage_button_185_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onStatusChange("all")); });
    i0.ɵɵelement(1, "i", 119);
    i0.ɵɵtext(2, " Clear Filter ");
    i0.ɵɵelementEnd();
} }
function LeadsPage_section_186_div_1_div_7_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 136);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(lead_r9.leadNumber);
} }
function LeadsPage_section_186_div_1_div_7_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 158);
    i0.ɵɵelement(1, "i", 159);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("pTooltip", ctx_r1.leadPresenceTooltip(lead_r9.id));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.leadPresenceEditingCount(lead_r9.id) > 0 ? "pi-pencil" : "pi-eye");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.leadPresenceCount(lead_r9.id), " viewing ");
} }
function LeadsPage_section_186_div_1_div_7_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 160);
    i0.ɵɵelement(1, "i", 161);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lead_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(lead_r9.email);
} }
function LeadsPage_section_186_div_1_div_7_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 160);
    i0.ɵɵelement(1, "i", 45);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lead_r9 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(lead_r9.phone);
} }
function LeadsPage_section_186_div_1_div_7_div_21_a_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 166);
    i0.ɵɵtext(1, "Account");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r9 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("routerLink", ctx_r1.leadAccountLink(lead_r9));
} }
function LeadsPage_section_186_div_1_div_7_div_21_a_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 166);
    i0.ɵɵtext(1, "Contact");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r9 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("routerLink", ctx_r1.leadContactLink(lead_r9));
} }
function LeadsPage_section_186_div_1_div_7_div_21_a_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 166);
    i0.ɵɵtext(1, "Opportunity");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r9 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("routerLink", ctx_r1.leadOpportunityLink(lead_r9));
} }
function LeadsPage_section_186_div_1_div_7_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 162);
    i0.ɵɵlistener("click", function LeadsPage_section_186_div_1_div_7_div_21_Template_div_click_0_listener($event) { i0.ɵɵrestoreView(_r10); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(1, "span", 163);
    i0.ɵɵtext(2, "Converted to");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 164);
    i0.ɵɵtemplate(4, LeadsPage_section_186_div_1_div_7_div_21_a_4_Template, 2, 1, "a", 165)(5, LeadsPage_section_186_div_1_div_7_div_21_a_5_Template, 2, 1, "a", 165)(6, LeadsPage_section_186_div_1_div_7_div_21_a_6_Template, 2, 1, "a", 165);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lead_r9 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.leadAccountLink(lead_r9));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.leadContactLink(lead_r9));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.leadOpportunityLink(lead_r9));
} }
function LeadsPage_section_186_div_1_div_7_button_29_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 167);
    i0.ɵɵlistener("click", function LeadsPage_section_186_div_1_div_7_button_29_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r11); const lead_r9 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.recycleLead(lead_r9)); });
    i0.ɵɵelement(1, "i", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
} }
function LeadsPage_section_186_div_1_div_7_button_32_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 168);
    i0.ɵɵlistener("click", function LeadsPage_section_186_div_1_div_7_button_32_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r12); const lead_r9 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.onConvert(lead_r9)); });
    i0.ɵɵelement(1, "i", 49);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
} }
function LeadsPage_section_186_div_1_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 129);
    i0.ɵɵlistener("click", function LeadsPage_section_186_div_1_div_7_Template_div_click_0_listener() { const lead_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.canManage() ? ctx_r1.onEdit(lead_r9) : null); });
    i0.ɵɵelementStart(1, "div", 130)(2, "div", 131);
    i0.ɵɵelement(3, "img", 132);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 133)(5, "span", 134);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, LeadsPage_section_186_div_1_div_7_span_7_Template, 2, 1, "span", 135);
    i0.ɵɵelementStart(8, "span", 136);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, LeadsPage_section_186_div_1_div_7_span_10_Template, 3, 3, "span", 137);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 138);
    i0.ɵɵelement(12, "p-knob", 139);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 140);
    i0.ɵɵtemplate(14, LeadsPage_section_186_div_1_div_7_div_14_Template, 4, 1, "div", 141)(15, LeadsPage_section_186_div_1_div_7_div_15_Template, 4, 1, "div", 141);
    i0.ɵɵelementStart(16, "div", 142)(17, "span", 143);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 144);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(21, LeadsPage_section_186_div_1_div_7_div_21_Template, 7, 3, "div", 145);
    i0.ɵɵelementStart(22, "div", 146)(23, "span", 147);
    i0.ɵɵelement(24, "i", 148);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "div", 149)(27, "button", 150);
    i0.ɵɵlistener("click", function LeadsPage_section_186_div_1_div_7_Template_button_click_27_listener($event) { const lead_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.onEdit(lead_r9)); });
    i0.ɵɵelement(28, "i", 151);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(29, LeadsPage_section_186_div_1_div_7_button_29_Template, 2, 1, "button", 152);
    i0.ɵɵelementStart(30, "button", 153);
    i0.ɵɵlistener("click", function LeadsPage_section_186_div_1_div_7_Template_button_click_30_listener($event) { const lead_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.onLogActivity(lead_r9)); });
    i0.ɵɵelement(31, "i", 154);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(32, LeadsPage_section_186_div_1_div_7_button_32_Template, 2, 1, "button", 155);
    i0.ɵɵelementStart(33, "button", 156);
    i0.ɵɵlistener("click", function LeadsPage_section_186_div_1_div_7_Template_button_click_33_listener($event) { const lead_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.onDelete(lead_r9)); });
    i0.ɵɵelement(34, "i", 157);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const lead_r9 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵattribute("aria-label", lead_r9.name + " \u2013 " + lead_r9.company);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-status", lead_r9.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", lead_r9.profilePictureUrl || "https://i.pravatar.cc/150?u=" + (lead_r9.email || lead_r9.id), i0.ɵɵsanitizeUrl)("alt", lead_r9.name + " avatar")("title", lead_r9.name + " avatar");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(lead_r9.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lead_r9.leadNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(lead_r9.company);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.leadPresenceCount(lead_r9.id) > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("pTooltip", i0.ɵɵinterpolate(ctx_r1.overallScoreHint(lead_r9)));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r1.displayScore(lead_r9))("readonly", true)("valueTemplate", "{value}")("size", 54)("strokeWidth", 7)("showValue", true)("min", 0)("max", 100)("valueColor", ctx_r1.leadScoreColor(lead_r9));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", lead_r9.email);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lead_r9.phone);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("pTooltip", i0.ɵɵinterpolate(ctx_r1.overallScoreHint(lead_r9)));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Overall: ", ctx_r1.displayScore(lead_r9), " / 100 ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("pTooltip", i0.ɵɵinterpolate(ctx_r1.conversationScoreHint(lead_r9)));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Conversation: ", ctx_r1.conversationScoreLabel(lead_r9), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.hasConvertedLinks(lead_r9));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", lead_r9.owner, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.canRecycleLead(lead_r9));
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", lead_r9.status === "Qualified");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
} }
function LeadsPage_section_186_div_1_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 169);
    i0.ɵɵelement(1, "i", 170);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const status_r13 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("No ", status_r13.toLowerCase(), " leads");
} }
function LeadsPage_section_186_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 122)(1, "div", 123)(2, "span", 124);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 125);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 126);
    i0.ɵɵtemplate(7, LeadsPage_section_186_div_1_div_7_Template, 35, 35, "div", 127)(8, LeadsPage_section_186_div_1_div_8_Template, 4, 1, "div", 128);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const status_r13 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-status", status_r13);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(status_r13);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.getLeadsByStatus(status_r13).length);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.getLeadsByStatus(status_r13));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.getLeadsByStatus(status_r13).length);
} }
function LeadsPage_section_186_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 120);
    i0.ɵɵtemplate(1, LeadsPage_section_186_div_1_Template, 9, 5, "div", 121);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.kanbanStatuses);
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "th", 179)(2, "p-checkbox", 180);
    i0.ɵɵlistener("onChange", function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_3_Template_p_checkbox_onChange_2_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.toggleSelectAll($event.checked)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "th", 181);
    i0.ɵɵtext(4, "Lead ");
    i0.ɵɵelement(5, "p-sortIcon", 182);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "th", 183);
    i0.ɵɵtext(7, "Status ");
    i0.ɵɵelement(8, "p-sortIcon", 184);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 185);
    i0.ɵɵtext(10, "Contact");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 186);
    i0.ɵɵtext(12, "Lead Score ");
    i0.ɵɵelement(13, "p-sortIcon", 187);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "th", 188);
    i0.ɵɵtext(15, "Owner ");
    i0.ɵɵelement(16, "p-sortIcon", 189);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th", 190);
    i0.ɵɵtext(18, "Created ");
    i0.ɵɵelement(19, "p-sortIcon", 191);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(20, "th", 192);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r1.selectedIds().length && ctx_r1.selectedIds().length === ctx_r1.leads().length);
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 201);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r17 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(lead_r17.leadNumber);
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 158);
    i0.ɵɵelement(1, "i", 159);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r17 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("pTooltip", ctx_r1.leadPresenceTooltip(lead_r17.id));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.leadPresenceEditingCount(lead_r17.id) > 0 ? "pi-pencil" : "pi-eye");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.leadPresenceCount(lead_r17.id), " viewing ");
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 226)(1, "span", 227);
    i0.ɵɵelement(2, "i", 228);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lead_r17 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r1.getSlaTone(lead_r17));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getSlaStatusLabel(lead_r17), " ");
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_div_22_a_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 166);
    i0.ɵɵtext(1, "Account");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r17 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("routerLink", ctx_r1.leadAccountLink(lead_r17));
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_div_22_a_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 166);
    i0.ɵɵtext(1, "Contact");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r17 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("routerLink", ctx_r1.leadContactLink(lead_r17));
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_div_22_a_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 166);
    i0.ɵɵtext(1, "Opportunity");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r17 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("routerLink", ctx_r1.leadOpportunityLink(lead_r17));
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 229)(1, "span", 163);
    i0.ɵɵtext(2, "Converted to");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 164);
    i0.ɵɵtemplate(4, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_div_22_a_4_Template, 2, 1, "a", 165)(5, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_div_22_a_5_Template, 2, 1, "a", 165)(6, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_div_22_a_6_Template, 2, 1, "a", 165);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lead_r17 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.leadAccountLink(lead_r17));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.leadContactLink(lead_r17));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.leadOpportunityLink(lead_r17));
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 230)(1, "span", 231);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 232);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const reason_r18 = ctx.ngIf;
    const lead_r17 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", lead_r17.status, " reason");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(reason_r18);
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_ng_template_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 233);
    i0.ɵɵelement(1, "i", 159);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r19 = ctx.$implicit;
    i0.ɵɵattribute("data-status", option_r19.value);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r19.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r19.label);
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_ng_template_27_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 233);
    i0.ɵɵelement(1, "i", 159);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r20 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("data-status", option_r20.value);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r20.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r20.label);
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_ng_template_27_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 236);
    i0.ɵɵtext(1, "Select status");
    i0.ɵɵelementEnd();
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_ng_template_27_div_0_Template, 4, 3, "div", 234)(1, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_ng_template_27_span_1_Template, 2, 0, "span", 235);
} if (rf & 2) {
    const option_r20 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r20);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r20);
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_a_30_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 237);
    i0.ɵɵlistener("click", function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_a_30_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r21); const lead_r17 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.composeToLead(lead_r17, $event)); });
    i0.ɵɵelement(1, "i", 161);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r17 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", lead_r17.email, " ");
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_span_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 238);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r17 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(lead_r17.phone);
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_button_45_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 239);
    i0.ɵɵlistener("click", function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_button_45_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r22); const lead_r17 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.recycleLead(lead_r17)); });
    i0.ɵɵelement(1, "i", 33);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_button_46_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 240);
    i0.ɵɵlistener("click", function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_button_46_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r23); const lead_r17 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.openCoach(lead_r17)); });
    i0.ɵɵelement(1, "i", 241);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r17 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
    i0.ɵɵattribute("data-lead-id", lead_r17.id);
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_button_49_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 242);
    i0.ɵɵlistener("click", function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_button_49_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r24); const lead_r17 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.onConvert(lead_r17)); });
    i0.ɵɵelement(1, "i", 49);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 193);
    i0.ɵɵlistener("click", function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_Template_tr_click_0_listener($event) { const lead_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.onRowClick(lead_r17, $event)); });
    i0.ɵɵelementStart(1, "td", 194)(2, "p-checkbox", 180);
    i0.ɵɵlistener("onChange", function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_Template_p_checkbox_onChange_2_listener($event) { const lead_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.toggleSelection(lead_r17.id, $event.checked)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "td", 195)(4, "div", 196)(5, "div", 197);
    i0.ɵɵelement(6, "img", 132);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 198)(8, "span", 199);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_span_10_Template, 2, 1, "span", 200);
    i0.ɵɵelementStart(11, "span", 201);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_span_13_Template, 3, 3, "span", 137);
    i0.ɵɵelementStart(14, "div", 142)(15, "span", 143);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 144);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span", 143);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(21, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_div_21_Template, 4, 2, "div", 202)(22, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_div_22_Template, 7, 3, "div", 203)(23, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_div_23_Template, 5, 2, "div", 204);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(24, "td", 205)(25, "p-select", 206);
    i0.ɵɵlistener("ngModelChange", function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_Template_p_select_ngModelChange_25_listener($event) { const lead_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.onInlineStatusChange(lead_r17, $event)); });
    i0.ɵɵtemplate(26, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_ng_template_26_Template, 4, 3, "ng-template", 106)(27, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_ng_template_27_Template, 2, 2, "ng-template", 107);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "td", 207)(29, "div", 208);
    i0.ɵɵtemplate(30, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_a_30_Template, 3, 1, "a", 209)(31, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_span_31_Template, 2, 1, "span", 210);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "td", 211)(33, "div", 212);
    i0.ɵɵelement(34, "p-knob", 213);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "td", 214)(36, "p-select", 215);
    i0.ɵɵlistener("ngModelChange", function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_Template_p_select_ngModelChange_36_listener($event) { const lead_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.onInlineOwnerChange(lead_r17, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "td", 216)(38, "span", 217);
    i0.ɵɵtext(39);
    i0.ɵɵpipe(40, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "td", 218)(42, "div", 219)(43, "button", 220);
    i0.ɵɵlistener("click", function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_Template_button_click_43_listener($event) { const lead_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.onEdit(lead_r17)); });
    i0.ɵɵelement(44, "i", 151);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(45, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_button_45_Template, 2, 1, "button", 221)(46, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_button_46_Template, 2, 2, "button", 222);
    i0.ɵɵelementStart(47, "button", 223);
    i0.ɵɵlistener("click", function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_Template_button_click_47_listener($event) { const lead_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.onLogActivity(lead_r17)); });
    i0.ɵɵelement(48, "i", 154);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(49, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_button_49_Template, 2, 1, "button", 224);
    i0.ɵɵelementStart(50, "button", 225);
    i0.ɵɵlistener("click", function LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_Template_button_click_50_listener($event) { const lead_r17 = i0.ɵɵrestoreView(_r16).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.onDelete(lead_r17)); });
    i0.ɵɵelement(51, "i", 157);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const lead_r17 = ctx.$implicit;
    const i_r25 = ctx.rowIndex;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("highlight", i_r25 === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r1.isSelected(lead_r17.id));
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-status", lead_r17.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", lead_r17.profilePictureUrl || "https://i.pravatar.cc/150?u=" + (lead_r17.email || lead_r17.id), i0.ɵɵsanitizeUrl)("alt", lead_r17.name + " avatar")("title", lead_r17.name + " avatar");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(lead_r17.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lead_r17.leadNumber);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(lead_r17.company);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.leadPresenceCount(lead_r17.id) > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("pTooltip", i0.ɵɵinterpolate(ctx_r1.overallScoreHint(lead_r17)));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Overall: ", ctx_r1.displayScore(lead_r17), " / 100 ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("pTooltip", i0.ɵɵinterpolate(ctx_r1.conversationScoreHint(lead_r17)));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Conversation: ", ctx_r1.conversationScoreLabel(lead_r17), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("pTooltip", i0.ɵɵinterpolate(ctx_r1.readinessHint(lead_r17)));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Readiness: ", (lead_r17.conversionReadiness == null ? null : lead_r17.conversionReadiness.label) || "Not assessed", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lead_r17.firstTouchDueAtUtc || lead_r17.firstTouchedAtUtc);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.hasConvertedLinks(lead_r17));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.dispositionReasonLabel(lead_r17));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("options", ctx_r1.filteredStatusOptions)("ngModel", lead_r17.status);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", lead_r17.email);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lead_r17.phone);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("pTooltip", i0.ɵɵinterpolate(ctx_r1.overallScoreHint(lead_r17)));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r1.displayScore(lead_r17))("readonly", true)("valueTemplate", "{value}")("size", 56)("strokeWidth", 8)("showValue", true)("min", 0)("max", 100)("valueColor", ctx_r1.leadScoreColor(lead_r17));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("options", ctx_r1.ownerOptionsForAssign())("ngModel", lead_r17.ownerId)("disabled", !ctx_r1.canEditOwnerAssignment());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(40, 49, lead_r17.createdAt, "MMM d, yyyy"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.canRecycleLead(lead_r17));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.showCqvsInLeadList());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", lead_r17.status === "Qualified");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
} }
function LeadsPage_section_187_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 173)(2, "p-table", 174);
    i0.ɵɵtemplate(3, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_3_Template, 21, 2, "ng-template", 110)(4, LeadsPage_section_187_ng_container_1_ng_container_1_ng_template_4_Template, 52, 52, "ng-template", 175);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 176)(6, "div", 177);
    i0.ɵɵtext(7, " Showing ");
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10, " to ");
    i0.ɵɵelementStart(11, "strong");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13, " of ");
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "p-paginator", 178);
    i0.ɵɵlistener("onPageChange", function LeadsPage_section_187_ng_container_1_ng_container_1_Template_p_paginator_onPageChange_16_listener($event) { i0.ɵɵrestoreView(_r14); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onPageChange($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c1, ctx_r1.showCqvsInLeadList()))("value", ctx_r1.leads());
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.pageIndex * ctx_r1.rows + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.Math.min((ctx_r1.pageIndex + 1) * ctx_r1.rows, ctx_r1.total()));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.total());
    i0.ɵɵadvance();
    i0.ɵɵproperty("rows", ctx_r1.rows)("totalRecords", ctx_r1.total())("rowsPerPageOptions", i0.ɵɵpureFunction0(11, _c2))("first", ctx_r1.pageIndex * ctx_r1.rows);
} }
function LeadsPage_section_187_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, LeadsPage_section_187_ng_container_1_ng_container_1_Template, 17, 12, "ng-container", 172);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const emptyState_r26 = i0.ɵɵreference(5);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.leads().length)("ngIfElse", emptyState_r26);
} }
function LeadsPage_section_187_ng_template_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 245);
    i0.ɵɵelement(1, "div", 246)(2, "div", 247)(3, "div", 248)(4, "div", 249)(5, "div", 250)(6, "div", 251)(7, "div", 252)(8, "div", 253);
    i0.ɵɵelementEnd();
} }
function LeadsPage_section_187_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 243);
    i0.ɵɵtemplate(1, LeadsPage_section_187_ng_template_2_div_1_Template, 9, 0, "div", 244);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c3));
} }
function LeadsPage_section_187_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 254)(1, "div", 255);
    i0.ɵɵelement(2, "i", 256);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "No leads yet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Start building your pipeline by adding your first lead.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 257);
    i0.ɵɵlistener("click", function LeadsPage_section_187_ng_template_4_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r27); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onCreate()); });
    i0.ɵɵelement(8, "i", 29);
    i0.ɵɵtext(9, " Add Lead ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", !ctx_r1.canManage());
} }
function LeadsPage_section_187_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 171);
    i0.ɵɵtemplate(1, LeadsPage_section_187_ng_container_1_Template, 2, 2, "ng-container", 172)(2, LeadsPage_section_187_ng_template_2_Template, 2, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(4, LeadsPage_section_187_ng_template_4_Template, 10, 1, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const loadingState_r28 = i0.ɵɵreference(3);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.loading())("ngIfElse", loadingState_r28);
} }
function LeadsPage_ng_template_194_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 258);
    i0.ɵɵlistener("click", function LeadsPage_ng_template_194_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r29); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.assignDialogVisible = false); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 259);
    i0.ɵɵlistener("click", function LeadsPage_ng_template_194_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r29); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmBulkAssign()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.assignOwnerId || !ctx_r1.canEditOwnerAssignment());
} }
function LeadsPage_ng_template_200_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 233);
    i0.ɵɵelement(1, "i", 159);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r30 = ctx.$implicit;
    i0.ɵɵattribute("data-status", option_r30.value);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r30.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r30.label);
} }
function LeadsPage_ng_template_201_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 233);
    i0.ɵɵelement(1, "i", 159);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r31 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("data-status", option_r31.value);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r31.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r31.label);
} }
function LeadsPage_ng_template_201_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 236);
    i0.ɵɵtext(1, "Select status");
    i0.ɵɵelementEnd();
} }
function LeadsPage_ng_template_201_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, LeadsPage_ng_template_201_div_0_Template, 4, 3, "div", 234)(1, LeadsPage_ng_template_201_span_1_Template, 2, 0, "span", 235);
} if (rf & 2) {
    const option_r31 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r31);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r31);
} }
function LeadsPage_ng_template_202_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 258);
    i0.ɵɵlistener("click", function LeadsPage_ng_template_202_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r32); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.statusDialogVisible = false); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 260);
    i0.ɵɵlistener("click", function LeadsPage_ng_template_202_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r32); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.confirmBulkStatusUpdate()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r1.bulkStatus || !ctx_r1.canManage());
} }
function LeadsPage_app_lead_import_wizard_203_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-lead-import-wizard", 261);
    i0.ɵɵlistener("closed", function LeadsPage_app_lead_import_wizard_203_Template_app_lead_import_wizard_closed_0_listener() { i0.ɵɵrestoreView(_r33); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.closeImport()); })("imported", function LeadsPage_app_lead_import_wizard_203_Template_app_lead_import_wizard_imported_0_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onImportWizardComplete($event)); });
    i0.ɵɵelementEnd();
} }
function LeadsPage_ng_template_205_div_1_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 273);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r34 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(lead_r34.company);
} }
function LeadsPage_ng_template_205_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 264)(1, "div", 265);
    i0.ɵɵelement(2, "i", 241);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 266)(4, "div", 267)(5, "span", 268);
    i0.ɵɵtext(6, "Lead Coach");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 269);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 270);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 271);
    i0.ɵɵtemplate(12, LeadsPage_ng_template_205_div_1_span_12_Template, 2, 1, "span", 272);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const lead_r34 = ctx.ngIf;
    i0.ɵɵadvance(7);
    i0.ɵɵattribute("data-status", lead_r34.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(lead_r34.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(lead_r34.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", lead_r34.company);
} }
function LeadsPage_ng_template_205_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 262);
    i0.ɵɵtemplate(1, LeadsPage_ng_template_205_div_1_Template, 13, 4, "div", 263);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.coachLead());
} }
function LeadsPage_div_206_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 276)(1, "span", 277);
    i0.ɵɵtext(2, "Evidence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 278);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 279);
    i0.ɵɵtext(6, "%");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lead_r36 = i0.ɵɵnextContext().ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.evidenceCoveragePercent(lead_r36));
} }
function LeadsPage_div_206_section_48_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 308);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const readiness_r37 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(readiness_r37.primaryGap);
} }
function LeadsPage_div_206_section_48_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Manager review recommended before conversion.");
    i0.ɵɵelementEnd();
} }
function LeadsPage_div_206_section_48_ul_12_li_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const reason_r38 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(reason_r38);
} }
function LeadsPage_div_206_section_48_ul_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 309);
    i0.ɵɵtemplate(1, LeadsPage_div_206_section_48_ul_12_li_1_Template, 2, 1, "li", 310);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const readiness_r37 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", readiness_r37.reasons);
} }
function LeadsPage_div_206_section_48_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 289)(1, "h3", 283);
    i0.ɵɵtext(2, "Conversion Readiness");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 305)(4, "span", 306);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 295)(7, "div", 296)(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, LeadsPage_div_206_section_48_span_10_Template, 2, 1, "span", 297);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, LeadsPage_div_206_section_48_span_11_Template, 2, 0, "span", 82);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(12, LeadsPage_div_206_section_48_ul_12_Template, 2, 1, "ul", 307);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const readiness_r37 = ctx.ngIf;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(readiness_r37.label);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(readiness_r37.summary);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", readiness_r37.primaryGap);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", readiness_r37.managerReviewRecommended);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", readiness_r37.reasons.length);
} }
function LeadsPage_div_206_article_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 311)(1, "div", 312)(2, "span", 313);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 314);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 315);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 316);
    i0.ɵɵelement(9, "span", 317);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const g_r39 = ctx.$implicit;
    i0.ɵɵattribute("data-testid", "cqvs-group-" + g_r39.code)("data-cqvs", g_r39.code);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(g_r39.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(g_r39.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", g_r39.score, "/", g_r39.maxScore);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", g_r39.percent, "%");
} }
function LeadsPage_div_206_p_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 318);
    i0.ɵɵtext(1, " No score breakdown available yet for this lead. ");
    i0.ɵɵelementEnd();
} }
function LeadsPage_div_206_span_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 306);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const code_r40 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(code_r40);
} }
function LeadsPage_div_206_span_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 308);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lead_r36 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(lead_r36.weakestState);
} }
function LeadsPage_div_206_section_65_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r41 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r41);
} }
function LeadsPage_div_206_section_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 289)(1, "h3", 283);
    i0.ɵɵtext(2, "Next Evidence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul", 319);
    i0.ɵɵtemplate(4, LeadsPage_div_206_section_65_li_4_Template, 2, 1, "li", 310);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lead_r36 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", lead_r36.nextEvidenceSuggestions);
} }
function LeadsPage_div_206_section_66_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r42 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r42);
} }
function LeadsPage_div_206_section_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 289)(1, "h3", 283);
    i0.ɵɵtext(2, "Risk Flags");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul", 320);
    i0.ɵɵtemplate(4, LeadsPage_div_206_section_66_li_4_Template, 2, 1, "li", 310);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lead_r36 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", lead_r36.riskFlags);
} }
function LeadsPage_div_206_section_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 289)(1, "h3", 283);
    i0.ɵɵtext(2, "Disposition");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul", 319)(4, "li");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const reason_r43 = ctx.ngIf;
    const lead_r36 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", lead_r36.status, " reason: ", reason_r43);
} }
function LeadsPage_div_206_section_68_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r44 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r44);
} }
function LeadsPage_div_206_section_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 289)(1, "h3", 283);
    i0.ɵɵtext(2, "Conversation Signals");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul", 319);
    i0.ɵɵtemplate(4, LeadsPage_div_206_section_68_li_4_Template, 2, 1, "li", 310);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lead_r36 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", lead_r36.conversationScoreReasons);
} }
function LeadsPage_div_206_button_75_Template(rf, ctx) { if (rf & 1) {
    const _r45 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 321);
    i0.ɵɵlistener("click", function LeadsPage_div_206_button_75_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r45); const lead_r36 = i0.ɵɵnextContext().ngIf; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.composeToLead(lead_r36)); });
    i0.ɵɵelement(1, "i", 161);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Compose email");
    i0.ɵɵelementEnd()();
} }
function LeadsPage_div_206_button_76_Template(rf, ctx) { if (rf & 1) {
    const _r46 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 303);
    i0.ɵɵlistener("click", function LeadsPage_div_206_button_76_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r46); const lead_r36 = i0.ɵɵnextContext().ngIf; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.recycleLead(lead_r36)); });
    i0.ɵɵelement(1, "i", 33);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Recycle");
    i0.ɵɵelementEnd()();
} }
function LeadsPage_div_206_button_81_Template(rf, ctx) { if (rf & 1) {
    const _r47 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 322);
    i0.ɵɵlistener("click", function LeadsPage_div_206_button_81_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r47); const lead_r36 = i0.ɵɵnextContext().ngIf; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onConvert(lead_r36)); });
    i0.ɵɵelement(1, "i", 49);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Convert");
    i0.ɵɵelementEnd()();
} }
function LeadsPage_div_206_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 274)(1, "section", 275)(2, "div", 276)(3, "span", 277);
    i0.ɵɵtext(4, "Overall");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong", 278);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 279);
    i0.ɵɵtext(8, "/ 100");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 280)(10, "span", 277);
    i0.ɵɵtext(11, "Qualification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "strong", 278);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 279);
    i0.ɵɵtext(15, "/ 100");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(16, LeadsPage_div_206_div_16_Template, 7, 1, "div", 281);
    i0.ɵɵelementStart(17, "div", 280)(18, "span", 277);
    i0.ɵɵtext(19, "Conversation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "strong", 278);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span", 279);
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 280)(25, "span", 277);
    i0.ɵɵtext(26, "Readiness");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "strong", 278);
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span", 279);
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(31, "section", 282)(32, "h3", 283);
    i0.ɵɵtext(33, "Conversation Guidance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 284)(35, "span", 285);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span", 285);
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span", 285);
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "span", 285);
    i0.ɵɵtext(42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "div", 286)(44, "span", 287);
    i0.ɵɵtext(45, "Recommended next action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "p");
    i0.ɵɵtext(47);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(48, LeadsPage_div_206_section_48_Template, 13, 5, "section", 288);
    i0.ɵɵelementStart(49, "section", 289)(50, "h3", 283);
    i0.ɵɵtext(51, "CQVS Summary");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "div", 290);
    i0.ɵɵtemplate(53, LeadsPage_div_206_article_53_Template, 10, 8, "article", 291);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(54, LeadsPage_div_206_p_54_Template, 2, 0, "p", 292);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "section", 289)(56, "h3", 283);
    i0.ɵɵtext(57, "Weakest Factor");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "div", 293);
    i0.ɵɵtemplate(59, LeadsPage_div_206_span_59_Template, 2, 1, "span", 294);
    i0.ɵɵelementStart(60, "div", 295)(61, "div", 296)(62, "strong");
    i0.ɵɵtext(63);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(64, LeadsPage_div_206_span_64_Template, 2, 1, "span", 297);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(65, LeadsPage_div_206_section_65_Template, 5, 1, "section", 288)(66, LeadsPage_div_206_section_66_Template, 5, 1, "section", 288)(67, LeadsPage_div_206_section_67_Template, 6, 2, "section", 288)(68, LeadsPage_div_206_section_68_Template, 5, 1, "section", 288);
    i0.ɵɵelementStart(69, "footer", 298)(70, "div", 299)(71, "button", 300);
    i0.ɵɵlistener("click", function LeadsPage_div_206_Template_button_click_71_listener() { const lead_r36 = i0.ɵɵrestoreView(_r35).ngIf; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onEdit(lead_r36)); });
    i0.ɵɵelement(72, "i", 151);
    i0.ɵɵelementStart(73, "span");
    i0.ɵɵtext(74, "Edit lead");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(75, LeadsPage_div_206_button_75_Template, 4, 0, "button", 301)(76, LeadsPage_div_206_button_76_Template, 4, 0, "button", 302);
    i0.ɵɵelementStart(77, "button", 303);
    i0.ɵɵlistener("click", function LeadsPage_div_206_Template_button_click_77_listener() { const lead_r36 = i0.ɵɵrestoreView(_r35).ngIf; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onLogActivity(lead_r36)); });
    i0.ɵɵelement(78, "i", 154);
    i0.ɵɵelementStart(79, "span");
    i0.ɵɵtext(80, "Log activity");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(81, LeadsPage_div_206_button_81_Template, 4, 0, "button", 304);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const lead_r36 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.displayScore(lead_r36));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("pTooltip", i0.ɵɵinterpolate(ctx_r1.qualificationScoreHint(lead_r36)));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.qualificationScore100(lead_r36));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.evidenceCoveragePercent(lead_r36) !== null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("pTooltip", i0.ɵɵinterpolate(ctx_r1.conversationScoreHint(lead_r36)));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(lead_r36.conversationSignalAvailable ? lead_r36.conversationScore ?? 0 : "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(lead_r36.conversationSignalAvailable ? "/ 100" : "no signal");
    i0.ɵɵadvance();
    i0.ɵɵproperty("pTooltip", i0.ɵɵinterpolate(ctx_r1.readinessHint(lead_r36)));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate((lead_r36.conversionReadiness == null ? null : lead_r36.conversionReadiness.score) ?? "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(lead_r36.conversionReadiness ? "/ 100" : "not scored");
    i0.ɵɵadvance(5);
    i0.ɵɵattribute("data-tone", ctx_r1.conversationStatusTone(lead_r36));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.conversationStatusPill(lead_r36));
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", ctx_r1.conversationStatusTone(lead_r36));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.coachToneLabel(lead_r36));
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", ctx_r1.matchesConversationView(lead_r36, "high_buying_intent") ? "healthy" : "weak");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.coachBuyingReadinessLabel(lead_r36));
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", ctx_r1.matchesConversationView(lead_r36, "high_buying_intent") ? "healthy" : "neutral");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.coachSemanticIntentLabel(lead_r36));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.conversationRecommendedAction(lead_r36));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lead_r36.conversionReadiness);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", ctx_r1.cqvsGroupMetrics(lead_r36));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !(lead_r36.scoreBreakdown == null ? null : lead_r36.scoreBreakdown.length));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pTooltip", i0.ɵɵinterpolate(ctx_r1.cqvsWeakestTooltip(lead_r36)));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.cqvsWeakestCode(lead_r36));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(lead_r36.weakestSignal || "Unknown");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lead_r36.weakestState);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lead_r36.nextEvidenceSuggestions == null ? null : lead_r36.nextEvidenceSuggestions.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lead_r36.riskFlags == null ? null : lead_r36.riskFlags.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.dispositionReasonLabel(lead_r36));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lead_r36.conversationScoreReasons == null ? null : lead_r36.conversationScoreReasons.length);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", lead_r36.email);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.canRecycleLead(lead_r36));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r1.canShowCoachConvert(lead_r36));
} }
const CQVS_TITLES = {
    C: 'Company Fit',
    Q: 'Qualification Readiness',
    V: 'Value / Problem Severity',
    S: 'Stakeholder Access'
};
const CQVS_FACTOR_GROUPS = [
    { code: 'C', title: CQVS_TITLES.C, factorMatchers: ['icp'] },
    { code: 'Q', title: CQVS_TITLES.Q, factorMatchers: ['budget', 'readiness', 'timeline'] },
    { code: 'V', title: CQVS_TITLES.V, factorMatchers: ['problem'] },
    { code: 'S', title: CQVS_TITLES.S, factorMatchers: ['economic buyer'] }
];
export class LeadsPage {
    leadData;
    router;
    userAdminData;
    importJobs;
    Math = Math;
    viewMode = 'table';
    toastService = inject(AppToastService);
    crmEventsService = inject(CrmEventsService);
    mailCompose = inject(MailComposeService);
    destroyRef = inject(DestroyRef);
    currentUserId = readUserId();
    joinedLeadPresenceIds = new Set();
    leadPresenceUsersByRecord = signal(new Map(), ...(ngDevMode ? [{ debugName: "leadPresenceUsersByRecord" }] : []));
    statusOptions = [
        { label: 'All', value: 'all', icon: 'pi-inbox' },
        ...LEAD_STATUSES.map((status) => ({
            label: status,
            value: status,
            icon: this.statusIcon(status)
        }))
    ];
    filteredStatusOptions = this.statusOptions.filter((o) => o.value !== 'all');
    kanbanStatuses = LEAD_STATUSES;
    conversationViewOptions = [
        { label: 'All signals', value: 'all' },
        { label: 'Manager review', value: 'manager_review' },
        { label: 'At risk', value: 'at_risk' },
        { label: 'Ready to convert', value: 'ready_to_convert' },
        { label: 'Coaching queue', value: 'coaching_queue' },
        { label: 'Low conversation score', value: 'low_conversation_score' },
        { label: 'No signal', value: 'no_signal' },
        { label: 'Negative or cautious tone', value: 'negative_or_cautious_tone' },
        { label: 'High buying intent', value: 'high_buying_intent' },
        { label: 'Engaged but incomplete', value: 'engaged_but_unqualified' }
    ];
    sortOptions = [
        { label: 'Newest', value: 'newest' },
        { label: 'Highest lead score', value: 'lead_score_desc' },
        { label: 'Highest conversation score', value: 'conversation_desc' },
        { label: 'Lowest conversation score', value: 'conversation_asc' },
        { label: 'Most qualified', value: 'qualification_desc' },
        { label: 'Highest readiness', value: 'readiness_desc' }
    ];
    leads = signal([], ...(ngDevMode ? [{ debugName: "leads" }] : []));
    total = signal(0, ...(ngDevMode ? [{ debugName: "total" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    leadDataWeights = signal([], ...(ngDevMode ? [{ debugName: "leadDataWeights" }] : []));
    qualificationFactors = signal([], ...(ngDevMode ? [{ debugName: "qualificationFactors" }] : []));
    showCqvsInLeadList = signal(false, ...(ngDevMode ? [{ debugName: "showCqvsInLeadList" }] : []));
    coachVisible = signal(false, ...(ngDevMode ? [{ debugName: "coachVisible" }] : []));
    coachLead = signal(null, ...(ngDevMode ? [{ debugName: "coachLead" }] : []));
    metrics = computed(() => {
        const rows = this.leads();
        const newLeads = rows.filter((l) => l.status === 'New').length;
        const contacted = rows.filter((l) => l.status === 'Contacted').length;
        const nurture = rows.filter((l) => l.status === 'Nurture').length;
        const qualified = rows.filter((l) => l.status === 'Qualified').length;
        const converted = rows.filter((l) => l.status === 'Converted').length;
        const lost = rows.filter((l) => l.status === 'Lost').length;
        const disqualified = rows.filter((l) => l.status === 'Disqualified').length;
        const avgScore = rows.length
            ? Math.round(rows.reduce((sum, lead) => sum + this.displayScore(lead), 0) / rows.length)
            : 0;
        return {
            total: this.total(),
            newLeads,
            contacted,
            nurture,
            qualified,
            converted,
            lost,
            disqualified,
            avgScore
        };
    }, ...(ngDevMode ? [{ debugName: "metrics" }] : []));
    conversationCoachMetrics = computed(() => {
        const rows = this.leads();
        return {
            managerReview: rows.filter((lead) => this.matchesConversationView(lead, 'manager_review')).length,
            atRisk: rows.filter((lead) => this.matchesConversationView(lead, 'at_risk')).length,
            readyToConvert: rows.filter((lead) => this.matchesConversationView(lead, 'ready_to_convert')).length,
            coachingQueue: rows.filter((lead) => this.matchesConversationView(lead, 'coaching_queue')).length,
            lowConversationScore: rows.filter((lead) => this.matchesConversationView(lead, 'low_conversation_score')).length,
            noSignal: rows.filter((lead) => this.matchesConversationView(lead, 'no_signal')).length,
            negativeOrCautiousTone: rows.filter((lead) => this.matchesConversationView(lead, 'negative_or_cautious_tone')).length,
            highBuyingIntent: rows.filter((lead) => this.matchesConversationView(lead, 'high_buying_intent')).length,
            engagedButIncomplete: rows.filter((lead) => this.matchesConversationView(lead, 'engaged_but_unqualified')).length
        };
    }, ...(ngDevMode ? [{ debugName: "conversationCoachMetrics" }] : []));
    readinessOwnerRollups = computed(() => {
        const buckets = new Map();
        for (const lead of this.leads()) {
            const key = lead.owner || 'Unassigned';
            const current = buckets.get(key) ?? { owner: key, managerReview: 0, atRisk: 0, readyToConvert: 0 };
            if (this.matchesConversationView(lead, 'manager_review'))
                current.managerReview += 1;
            if (this.matchesConversationView(lead, 'at_risk'))
                current.atRisk += 1;
            if (this.matchesConversationView(lead, 'ready_to_convert'))
                current.readyToConvert += 1;
            buckets.set(key, current);
        }
        return Array.from(buckets.values())
            .filter((row) => row.managerReview > 0 || row.atRisk > 0 || row.readyToConvert > 0)
            .sort((a, b) => (b.managerReview + b.atRisk + b.readyToConvert) - (a.managerReview + a.atRisk + a.readyToConvert))
            .slice(0, 5);
    }, ...(ngDevMode ? [{ debugName: "readinessOwnerRollups" }] : []));
    // Conversion rate: converted / (converted + lost) * 100
    conversionRate = computed(() => {
        const m = this.metrics();
        const totalClosed = m.converted + m.lost;
        return totalClosed > 0 ? Math.round((m.converted / totalClosed) * 100) : 0;
    }, ...(ngDevMode ? [{ debugName: "conversionRate" }] : []));
    searchTerm = '';
    statusFilter = 'all';
    conversationView = 'all';
    sortBy = 'newest';
    pageIndex = 0;
    rows = 10;
    selectedIds = signal([], ...(ngDevMode ? [{ debugName: "selectedIds" }] : []));
    bulkActions = computed(() => {
        const disabled = !this.canManage();
        const assignDisabled = !this.canEditOwnerAssignment();
        return [
            { id: 'assign-owner', label: 'Assign owner', icon: 'pi pi-user', disabled: assignDisabled },
            { id: 'change-status', label: 'Change status', icon: 'pi pi-tag', disabled },
            { id: 'delete', label: 'Delete', icon: 'pi pi-trash', severity: 'danger', disabled }
        ];
    }, ...(ngDevMode ? [{ debugName: "bulkActions" }] : []));
    canManage = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.leadsManage);
    }, ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    hasConvertedLinks(lead) {
        return !!(lead.accountId || lead.contactId || lead.convertedOpportunityId);
    }
    leadAccountLink(lead) {
        return lead.accountId ? ['/app/customers', lead.accountId, 'edit'] : null;
    }
    leadContactLink(lead) {
        return lead.contactId ? ['/app/contacts', lead.contactId, 'edit'] : null;
    }
    leadOpportunityLink(lead) {
        return lead.convertedOpportunityId ? ['/app/deals', lead.convertedOpportunityId, 'edit'] : null;
    }
    composeToLead(lead, event) {
        event?.preventDefault();
        event?.stopPropagation();
        if (!lead.email) {
            return;
        }
        this.mailCompose.open({
            toEmail: lead.email,
            toName: lead.name,
            relatedEntityType: 'Lead',
            relatedEntityId: lead.id
        });
    }
    ownerOptionsForAssign = signal([], ...(ngDevMode ? [{ debugName: "ownerOptionsForAssign" }] : []));
    dispositionReport = signal(null, ...(ngDevMode ? [{ debugName: "dispositionReport" }] : []));
    ownerAssignmentEditable = signal(false, ...(ngDevMode ? [{ debugName: "ownerAssignmentEditable" }] : []));
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
    statusIcon(status) {
        switch (status) {
            case 'New':
                return 'pi-star';
            case 'Contacted':
                return 'pi-comments';
            case 'Nurture':
                return 'pi-clock';
            case 'Qualified':
                return 'pi-check';
            case 'Converted':
                return 'pi-verified';
            case 'Lost':
                return 'pi-times';
            case 'Disqualified':
                return 'pi-ban';
            default:
                return 'pi-circle';
        }
    }
    importPoll;
    activeImportJobId = null;
    constructor(leadData, router, userAdminData, importJobs) {
        this.leadData = leadData;
        this.router = router;
        this.userAdminData = userAdminData;
        this.importJobs = importJobs;
        this.resolveOwnerAssignmentAccess();
        this.loadOwners();
        this.loadLeadDataWeights();
        if (this.router.url.includes('/leads/pipeline')) {
            this.viewMode = 'kanban';
        }
        if (this.router.url.includes('/leads/import')) {
            this.importDialogVisible = true;
        }
        const toast = history.state?.toast;
        if (toast) {
            this.toastService.show(toast.tone, toast.message, 3000);
            history.replaceState({}, '');
        }
        this.load();
        this.crmEventsService.events$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => {
            if (event.eventType === 'record.presence.snapshot' || event.eventType === 'record.presence.changed') {
                this.handleLeadPresenceEvent(event.payload ?? null);
                return;
            }
            if (event.eventType === 'import.job.progress') {
                this.handleImportProgressEvent(event.payload ?? null);
                return;
            }
            if (event.eventType === 'pipeline.lead.created'
                || event.eventType === 'pipeline.lead.updated'
                || event.eventType === 'pipeline.lead.deleted'
                || event.eventType === 'pipeline.lead.moved') {
                this.load();
                return;
            }
            if (event.eventType !== 'entity.crud.changed') {
                return;
            }
            const entityType = String(event.payload?.['entityType'] ?? '').toLowerCase();
            if (entityType === 'lead') {
                this.load();
            }
        });
        this.destroyRef.onDestroy(() => {
            for (const leadId of this.joinedLeadPresenceIds) {
                this.crmEventsService.leaveRecordPresence('lead', leadId);
            }
            this.joinedLeadPresenceIds.clear();
            this.leadPresenceUsersByRecord.set(new Map());
        });
    }
    // Get funnel width percentage based on total leads
    getFunnelWidth(status) {
        const m = this.metrics();
        if (m.total === 0)
            return 0;
        const count = status === 'New' ? m.newLeads
            : status === 'Contacted' ? m.contacted
                : status === 'Qualified' ? m.qualified
                    : status === 'Converted' ? m.converted
                        : m.lost;
        return Math.max(10, (count / m.total) * 100);
    }
    // Get leads filtered by status for Kanban view
    getLeadsByStatus(status) {
        return this.leads().filter(lead => lead.status === status);
    }
    load() {
        this.loading.set(true);
        const status = this.statusFilter === 'all' ? undefined : this.statusFilter;
        forkJoin({
            search: this.leadData.search({
                search: this.searchTerm || undefined,
                status,
                conversationView: this.conversationView === 'all' ? undefined : this.conversationView,
                sortBy: this.sortBy,
                page: this.pageIndex + 1,
                pageSize: this.rows
            }),
            dispositionReport: this.leadData.getDispositionReport().pipe(catchError(() => of(null)))
        })
            .subscribe({
            next: (res) => {
                this.leads.set(res.search.items);
                this.syncLeadPresenceSubscriptions(res.search.items.map((lead) => lead.id));
                this.total.set(res.search.total);
                this.dispositionReport.set(res.dispositionReport);
                this.loading.set(false);
                this.selectedIds.set([]);
            },
            error: () => {
                this.loading.set(false);
            }
        });
    }
    leadPresenceCount(leadId) {
        const users = this.leadPresenceUsersByRecord().get(leadId) ?? [];
        return users.filter((user) => user.userId !== this.currentUserId).length;
    }
    leadPresenceEditingCount(leadId) {
        const users = this.leadPresenceUsersByRecord().get(leadId) ?? [];
        return users.filter((user) => user.userId !== this.currentUserId && user.isEditing).length;
    }
    leadPresenceTooltip(leadId) {
        const users = (this.leadPresenceUsersByRecord().get(leadId) ?? []).filter((user) => user.userId !== this.currentUserId);
        if (!users.length) {
            return '';
        }
        return users
            .map((user) => user.isEditing ? `${user.displayName} (editing)` : user.displayName)
            .join(', ');
    }
    syncLeadPresenceSubscriptions(leadIds) {
        const nextIds = new Set(leadIds);
        for (const currentId of [...this.joinedLeadPresenceIds]) {
            if (!nextIds.has(currentId)) {
                this.crmEventsService.leaveRecordPresence('lead', currentId);
                this.joinedLeadPresenceIds.delete(currentId);
                this.leadPresenceUsersByRecord.update((map) => {
                    const next = new Map(map);
                    next.delete(currentId);
                    return next;
                });
            }
        }
        for (const leadId of nextIds) {
            if (this.joinedLeadPresenceIds.has(leadId)) {
                continue;
            }
            this.crmEventsService.joinRecordPresence('lead', leadId);
            this.joinedLeadPresenceIds.add(leadId);
        }
    }
    handleLeadPresenceEvent(payload) {
        if (!payload) {
            return;
        }
        const entityType = String(payload['entityType'] ?? '').toLowerCase();
        if (entityType !== 'lead') {
            return;
        }
        const recordId = String(payload['recordId'] ?? '');
        if (!recordId || !this.joinedLeadPresenceIds.has(recordId)) {
            return;
        }
        if (Array.isArray(payload['users'])) {
            const users = payload['users']
                .map((item) => {
                const value = item;
                return {
                    userId: String(value['userId'] ?? ''),
                    displayName: String(value['displayName'] ?? 'User'),
                    isEditing: !!value['isEditing']
                };
            })
                .filter((item) => !!item.userId);
            this.leadPresenceUsersByRecord.update((map) => {
                const next = new Map(map);
                next.set(recordId, users);
                return next;
            });
            return;
        }
        const userId = String(payload['userId'] ?? '');
        const displayName = String(payload['displayName'] ?? 'User');
        const action = String(payload['action'] ?? '').toLowerCase();
        const isEditing = !!payload['isEditing'];
        if (!userId || !action) {
            return;
        }
        this.leadPresenceUsersByRecord.update((map) => {
            const next = new Map(map);
            const current = [...(next.get(recordId) ?? [])];
            if (action === 'joined') {
                const existingIndex = current.findIndex((item) => item.userId === userId);
                if (existingIndex >= 0) {
                    current[existingIndex] = { ...current[existingIndex], displayName, isEditing };
                }
                else {
                    current.push({ userId, displayName, isEditing });
                }
                next.set(recordId, current);
                return next;
            }
            if (action === 'left') {
                next.set(recordId, current.filter((item) => item.userId !== userId));
                return next;
            }
            if (action === 'editing_started' || action === 'editing_stopped') {
                const nextEditing = action === 'editing_started' ? true : isEditing;
                const existingIndex = current.findIndex((item) => item.userId === userId);
                if (existingIndex >= 0) {
                    current[existingIndex] = { ...current[existingIndex], displayName, isEditing: nextEditing };
                }
                else {
                    current.push({ userId, displayName, isEditing: nextEditing });
                }
                next.set(recordId, current);
            }
            return next;
        });
    }
    onCreate() {
        this.router.navigate(['/app/leads/new']);
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
        if (this.router.url.includes('/leads/import')) {
            this.router.navigate(['/app/leads']);
        }
        this.stopImportPolling();
    }
    onImportWizardComplete(event) {
        this.closeImport();
        this.raiseToast('success', `${event.imported} leads imported successfully.`);
        this.load();
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
        this.leadData.importCsv(this.importFile).subscribe({
            next: (job) => {
                this.importJob.set(job);
                this.activeImportJobId = job.id;
                this.importStatus.set(null);
                this.raiseToast('success', 'Lead import queued.');
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
                this.raiseToast('error', 'Lead import failed.');
            }
        });
    }
    onEdit(row) {
        this.router.navigate(['/app/leads', row.id, 'edit'], { state: { lead: row } });
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
    onLogActivity(row) {
        const subject = row.name ? `Follow up: ${row.name}` : 'Lead follow-up';
        this.router.navigate(['/app/activities/new'], {
            queryParams: {
                relatedType: 'Lead',
                relatedId: row.id,
                subject,
                leadFirstTouchDueAtUtc: row.firstTouchDueAtUtc ?? undefined
            }
        });
    }
    onConvert(row) {
        this.router.navigate(['/app/leads', row.id, 'convert'], { state: { lead: row } });
    }
    onDelete(row) {
        const confirmed = confirm(`Delete lead ${row.name}?`);
        if (!confirmed)
            return;
        this.leadData.delete(row.id).subscribe({
            next: () => {
                this.load();
                this.raiseToast('success', 'Lead deleted.');
            },
            error: () => this.raiseToast('error', 'Unable to delete lead.')
        });
    }
    canRecycleLead(row) {
        return row.status === 'Lost' || row.status === 'Disqualified';
    }
    dispositionReasonLabel(lead) {
        if (lead.status === 'Disqualified') {
            return lead.disqualifiedReason?.trim() || null;
        }
        if (lead.status === 'Lost') {
            return lead.lossReason?.trim() || null;
        }
        return null;
    }
    dispositionTrendLabel(periodStartUtc) {
        return new Date(periodStartUtc).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
    dispositionTrendMax() {
        const report = this.dispositionReport();
        if (!report?.trend.length) {
            return 1;
        }
        return Math.max(1, ...report.trend.map((item) => item.disqualified + item.lost + item.recycledToNurture));
    }
    recycleLead(row) {
        if (!this.canManage() || !this.canRecycleLead(row)) {
            return;
        }
        const confirmed = confirm(`Recycle ${row.name} back to nurture?`);
        if (!confirmed) {
            return;
        }
        this.leadData.recycleToNurture(row.id).subscribe({
            next: () => {
                this.raiseToast('success', 'Lead recycled to nurture.');
                this.load();
            },
            error: () => {
                this.raiseToast('error', 'Unable to recycle lead.');
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
    onConversationViewChange(value) {
        this.conversationView = value;
        this.pageIndex = 0;
        this.load();
    }
    onSortChange(value) {
        this.sortBy = value ?? 'newest';
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
            this.raiseToast('error', 'Lead import status failed.');
            return of(null);
        }))), takeWhile((status) => !!status && (status.status === 'Queued' || status.status === 'Processing'), true), tap((status) => {
            if (!status)
                return;
            this.importStatus.set(status);
            if (status.status === 'Completed' && this.importing()) {
                this.importing.set(false);
                this.load();
                this.raiseToast('success', 'Lead import completed.');
            }
            if (status.status === 'Failed' && this.importing()) {
                this.importing.set(false);
                this.importError.set(status.errorMessage ?? 'Import failed. Please check your CSV and try again.');
                this.raiseToast('error', 'Lead import failed.');
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
            entityType: String(payload['entityType'] ?? 'Leads'),
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
            this.raiseToast('success', 'Lead import completed.');
            return;
        }
        if (status === 'Failed') {
            this.importing.set(false);
            this.activeImportJobId = null;
            this.importError.set(typeof errorSummaryRaw === 'string' ? errorSummaryRaw : 'Import failed. Please check your CSV and try again.');
            this.raiseToast('error', 'Lead import failed.');
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
            this.selectedIds.set(this.leads().map((row) => row.id));
            return;
        }
        this.selectedIds.set([]);
    }
    selectAllFiltered() {
        this.selectedIds.set(this.leads().map((row) => row.id));
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
        const confirmed = confirm(`Delete ${ids.length} leads?`);
        if (!confirmed) {
            return;
        }
        const deletes$ = ids.map((id) => this.leadData.delete(id).pipe(map(() => true), catchError(() => of(false))));
        forkJoin(deletes$).subscribe((results) => {
            const failures = results.filter((ok) => !ok).length;
            this.clearSelection();
            this.load();
            if (failures) {
                this.raiseToast('error', `${failures} leads could not be deleted.`);
                return;
            }
            this.raiseToast('success', 'Leads deleted.');
        });
    }
    confirmBulkAssign() {
        if (!this.canEditOwnerAssignment()) {
            return;
        }
        const ids = this.selectedIds();
        if (!ids.length || !this.assignOwnerId) {
            return;
        }
        this.leadData.bulkAssignOwner(ids, this.assignOwnerId).subscribe({
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
        this.leadData.bulkUpdateStatus(ids, this.bulkStatus).subscribe({
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
    onInlineStatusChange(row, status) {
        if (!status || row.status === status) {
            return;
        }
        this.leadData.updateStatus(row.id, status).subscribe({
            next: () => {
                this.load();
                this.raiseToast('success', 'Status updated.');
            },
            error: () => {
                this.raiseToast('error', 'Status update failed.');
            }
        });
    }
    onInlineOwnerChange(row, ownerId) {
        if (!this.canEditOwnerAssignment()) {
            return;
        }
        if (!ownerId || row.ownerId === ownerId) {
            return;
        }
        this.leadData.updateOwner(row.id, ownerId).subscribe({
            next: () => {
                this.load();
                this.raiseToast('success', 'Owner updated.');
            },
            error: () => {
                this.raiseToast('error', 'Owner update failed.');
            }
        });
    }
    canEditOwnerAssignment() {
        return this.ownerAssignmentEditable();
    }
    resolveOwnerAssignmentAccess() {
        const context = readTokenContext();
        const hasAdmin = tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.administrationManage);
        this.ownerAssignmentEditable.set(hasAdmin);
    }
    statusSeverity(status) {
        switch (status) {
            case 'New':
                return 'info';
            case 'Contacted':
                return 'info';
            case 'Nurture':
                return 'info';
            case 'Qualified':
                return 'info';
            case 'Converted':
                return 'info';
            case 'Lost':
                return 'warn';
            case 'Disqualified':
                return 'warn';
            default:
                return 'info';
        }
    }
    getAvatarClass(status) {
        switch (status) {
            case 'New':
                return 'avatar-new';
            case 'Contacted':
                return 'avatar-contacted';
            case 'Nurture':
                return 'avatar-contacted';
            case 'Qualified':
                return 'avatar-qualified';
            case 'Converted':
                return 'avatar-converted';
            case 'Lost':
                return 'avatar-lost';
            case 'Disqualified':
                return 'avatar-lost';
            default:
                return 'avatar-new';
        }
    }
    statusClass(status) {
        switch (status) {
            case 'New':
                return 'badge-info';
            case 'Contacted':
                return 'badge-warning';
            case 'Nurture':
                return 'badge-warning';
            case 'Qualified':
                return 'badge-purple';
            case 'Converted':
                return 'badge-success';
            case 'Lost':
                return 'badge-warning';
            case 'Disqualified':
                return 'badge-warning';
            default:
                return 'badge-info';
        }
    }
    getSlaStatusLabel(lead) {
        if (lead.firstTouchedAtUtc)
            return 'First touch completed';
        if (!lead.firstTouchDueAtUtc)
            return 'SLA not started';
        const due = new Date(lead.firstTouchDueAtUtc);
        if (Number.isNaN(due.getTime()))
            return 'SLA pending';
        return due.getTime() < Date.now() ? 'SLA overdue' : 'SLA due';
    }
    getSlaTone(lead) {
        if (lead.firstTouchedAtUtc)
            return 'done';
        if (!lead.firstTouchDueAtUtc)
            return 'pending';
        const due = new Date(lead.firstTouchDueAtUtc);
        if (Number.isNaN(due.getTime()))
            return 'pending';
        return due.getTime() < Date.now() ? 'overdue' : 'due';
    }
    qualificationStatusLabel(lead) {
        const factorCount = this.countQualificationFactors(lead);
        if (factorCount === 0)
            return 'Not started';
        const qualificationScore = this.computeOverallScore(lead).qualificationScore100;
        return `${qualificationScore} / 100`;
    }
    displayScore(lead) {
        return this.computeOverallScore(lead).finalLeadScore;
    }
    overallScoreHint(lead) {
        const score = this.computeOverallScore(lead);
        const conversationLabel = lead.conversationSignalAvailable
            ? `Conversation ${score.conversationContributionScore100}/100 is included.`
            : 'Conversation is excluded until signal is available.';
        return `Overall ${score.finalLeadScore}/100 = weighted lifecycle composite (Qualification 50%, Lead Data Quality 20%, Conversation 20%, History 10%). CQVS Qualification ${score.qualificationScore100}/100. ${conversationLabel}`;
    }
    qualificationScoreHint(lead) {
        const score = this.computeOverallScore(lead);
        const coverage = typeof lead.truthCoverage === 'number' ? Math.round(lead.truthCoverage * 100) : null;
        const confidencePct = typeof lead.qualificationConfidence === 'number' ? Math.round(lead.qualificationConfidence * 100) : null;
        const pieces = [`Qualification ${score.qualificationScore100}/100`];
        if (confidencePct !== null) {
            pieces.push(`confidence ${confidencePct}%`);
        }
        if (lead.qualificationConfidenceLabel) {
            pieces.push(lead.qualificationConfidenceLabel);
        }
        if (coverage !== null) {
            pieces.push(`evidence ${coverage}%`);
        }
        if (typeof lead.assumptionsOutstanding === 'number') {
            pieces.push(`${lead.assumptionsOutstanding} assumptions`);
        }
        return pieces.join(' • ');
    }
    qualificationScore100(lead) {
        return this.computeOverallScore(lead).qualificationScore100;
    }
    leadScoreColor(lead) {
        const score = this.displayScore(lead);
        if (score >= 70) {
            return '#10b981';
        }
        if (score >= 40) {
            return '#f59e0b';
        }
        return '#ef4444';
    }
    conversationScoreLabel(lead) {
        if (!lead.conversationSignalAvailable) {
            return 'No conversation signal';
        }
        return `${lead.conversationScore ?? 0} / 100`;
    }
    conversationScoreHint(lead) {
        if (!lead.conversationSignalAvailable) {
            return 'No conversation signal is available for this lead yet.';
        }
        const pieces = [`Conversation ${lead.conversationScore ?? 0}/100`];
        if (lead.conversationScoreLabel) {
            pieces.push(lead.conversationScoreLabel);
        }
        if (lead.conversationScoreReasons?.length) {
            pieces.push(lead.conversationScoreReasons.slice(0, 2).join(' • '));
        }
        return pieces.join(' • ');
    }
    conversationStatusPill(lead) {
        if (!lead.conversationSignalAvailable) {
            return 'No signal';
        }
        if (this.matchesConversationView(lead, 'negative_or_cautious_tone')) {
            return 'Risk signal';
        }
        if ((lead.conversationScore ?? 0) >= 70 || this.matchesConversationView(lead, 'high_buying_intent')) {
            return 'Healthy signal';
        }
        return 'Weak signal';
    }
    conversationStatusTone(lead) {
        if (!lead.conversationSignalAvailable) {
            return 'neutral';
        }
        if (this.matchesConversationView(lead, 'negative_or_cautious_tone')) {
            return 'risk';
        }
        if ((lead.conversationScore ?? 0) >= 70 || this.matchesConversationView(lead, 'high_buying_intent')) {
            return 'healthy';
        }
        return 'weak';
    }
    coachToneLabel(lead) {
        return lead.conversationAiToneLabel || lead.conversationAiSentiment || 'Not detected';
    }
    coachBuyingReadinessLabel(lead) {
        return lead.conversationAiBuyingReadiness || 'No readiness signal';
    }
    coachSemanticIntentLabel(lead) {
        return lead.conversationAiSemanticIntent || 'No clear intent';
    }
    conversationRecommendedAction(lead) {
        if (lead.conversionReadiness?.primaryGap) {
            return `Resolve the primary gap: ${lead.conversionReadiness.primaryGap}.`;
        }
        if (lead.riskFlags?.length) {
            return `Address the top risk first: ${lead.riskFlags[0]}.`;
        }
        if (lead.conversationScoreReasons?.length) {
            return `Use the next outreach to validate: ${lead.conversationScoreReasons[0]}.`;
        }
        if (!lead.conversationSignalAvailable) {
            return 'Create a real two-way touchpoint so the CRM can score engagement and recommend next steps.';
        }
        return 'Log the next meaningful response or meeting outcome before pushing the lead forward.';
    }
    canShowCoachConvert(lead) {
        return this.canManage() && (lead.status === 'Qualified' || this.matchesConversationView(lead, 'ready_to_convert'));
    }
    readinessScoreLabel(lead) {
        return lead.conversionReadiness ? `${lead.conversionReadiness.score} / 100` : 'Not assessed';
    }
    readinessHint(lead) {
        const readiness = lead.conversionReadiness;
        if (!readiness) {
            return 'Conversion readiness has not been computed for this lead yet.';
        }
        const parts = [`${readiness.label} (${readiness.score}/100)`, readiness.summary];
        if (readiness.primaryGap) {
            parts.push(`Primary gap: ${readiness.primaryGap}`);
        }
        if (readiness.managerReviewRecommended) {
            parts.push('Manager review recommended');
        }
        return parts.join(' • ');
    }
    conversationViewHint() {
        return this.conversationViewOptions.find((option) => option.value === this.conversationView)?.label ?? 'All signals';
    }
    conversationFilterCount(view) {
        if (view === 'all') {
            return this.leads().length;
        }
        return this.leads().filter((lead) => this.matchesConversationView(lead, view)).length;
    }
    evidenceCoveragePercent(lead) {
        if (typeof lead.truthCoverage !== 'number' || !Number.isFinite(lead.truthCoverage))
            return null;
        return Math.round(lead.truthCoverage * 100);
    }
    cqvsWeakestCode(lead) {
        const label = (lead.weakestSignal ?? '').trim().toLowerCase();
        if (!label)
            return null;
        if (label.includes('budget'))
            return 'Q';
        if (label.includes('readiness'))
            return 'Q';
        if (label.includes('timeline'))
            return 'Q';
        if (label.includes('problem'))
            return 'V';
        if (label.includes('economic buyer'))
            return 'S';
        if (label.includes('icp'))
            return 'C';
        return null;
    }
    cqvsWeakestTooltip(lead) {
        const signal = lead.weakestSignal?.trim();
        const state = lead.weakestState?.trim();
        const code = this.cqvsWeakestCode(lead);
        const group = code ? `${code} (${CQVS_TITLES[code]})` : 'Unknown';
        if (!signal && !state)
            return `Weakest factor: Unknown. CQVS group: ${group}.`;
        if (signal && state)
            return `Weakest factor: ${signal} (${state}). CQVS group: ${group}.`;
        return `Weakest factor: ${signal ?? 'Unknown'}${state ? ` (${state})` : ''}. CQVS group: ${group}.`;
    }
    openCoach(lead) {
        this.coachLead.set(lead);
        this.coachVisible.set(true);
    }
    onCoachHide() {
        this.coachVisible.set(false);
        this.coachLead.set(null);
    }
    cqvsGroupMetrics(lead) {
        const breakdown = lead.scoreBreakdown ?? [];
        const grouped = new Map();
        for (const group of CQVS_FACTOR_GROUPS) {
            grouped.set(group.code, { score: 0, maxScore: 0 });
        }
        for (const item of breakdown) {
            const code = this.cqvsCodeForFactor(item.factor);
            if (!code)
                continue;
            const bucket = grouped.get(code);
            if (!bucket)
                continue;
            bucket.score += item.score ?? 0;
            bucket.maxScore += item.maxScore ?? 0;
        }
        return CQVS_FACTOR_GROUPS.map((group) => {
            const bucket = grouped.get(group.code) ?? { score: 0, maxScore: 0 };
            const percent = bucket.maxScore > 0 ? Math.round((bucket.score / bucket.maxScore) * 100) : 0;
            return {
                code: group.code,
                title: group.title,
                score: bucket.score,
                maxScore: bucket.maxScore,
                percent
            };
        });
    }
    cqvsCodeForFactor(factor) {
        const normalized = (factor ?? '').trim().toLowerCase();
        if (!normalized)
            return null;
        for (const group of CQVS_FACTOR_GROUPS) {
            if (group.factorMatchers.some((m) => normalized.includes(m))) {
                return group.code;
            }
        }
        return null;
    }
    qualificationStatusHint(lead) {
        const factorCount = this.countQualificationFactors(lead);
        if (factorCount === 0)
            return 'No qualification factors selected yet.';
        const qualificationScore = this.computeOverallScore(lead).qualificationScore100;
        const truthCoverage = typeof lead.truthCoverage === 'number' ? Math.round(lead.truthCoverage * 100) : null;
        if (truthCoverage !== null) {
            return `Qualification in progress: ${qualificationScore}/100 with ${factorCount}/6 factors and ${truthCoverage}% evidence coverage.`;
        }
        return `Qualification in progress: ${qualificationScore}/100 with ${factorCount}/6 factors.`;
    }
    // Lead create/edit handled by separate page.
    clearToast() {
        this.toastService.clear();
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    loadOwners() {
        this.userAdminData.lookupActive(undefined, 300).subscribe({
            next: (items) => {
                const options = items.map((user) => ({ label: user.fullName, value: user.id }));
                this.ownerOptionsForAssign.set(options);
            },
            error: () => {
                this.ownerOptionsForAssign.set([]);
            }
        });
    }
    matchesConversationView(lead, view) {
        switch (view) {
            case 'weak_signal':
            case 'low_conversation_score':
                return lead.conversationSignalAvailable === true && (lead.conversationScore ?? 0) < 50;
            case 'no_signal':
                return lead.conversationSignalAvailable !== true;
            case 'negative_or_cautious_tone':
                return ['negative', 'cautious'].includes((lead.conversationAiSentiment ?? '').trim().toLowerCase())
                    || ['guarded', 'dismissive'].includes((lead.conversationAiToneLabel ?? '').trim().toLowerCase());
            case 'high_buying_intent':
                return ['ready to buy', 'actively evaluating'].includes((lead.conversationAiBuyingReadiness ?? '').trim().toLowerCase())
                    || ['seeking solution', 'negotiating terms', 'comparing options'].includes((lead.conversationAiSemanticIntent ?? '').trim().toLowerCase());
            case 'manager_review':
                return lead.conversionReadiness?.managerReviewRecommended === true;
            case 'at_risk':
                return (lead.conversionReadiness?.label ?? '').toLowerCase() === 'at risk';
            case 'ready_to_convert':
                return (lead.conversionReadiness?.label ?? '').toLowerCase() === 'ready';
            case 'coaching_queue':
                return (lead.conversationSignalAvailable !== true || (lead.conversationScore ?? 0) < 50)
                    && (this.displayScore(lead) >= 70 || (lead.qualificationConfidence ?? 0) >= 0.7);
            case 'engaged_but_unqualified':
                return lead.conversationSignalAvailable === true
                    && (lead.conversationScore ?? 0) >= 70
                    && (lead.assumptionsOutstanding ?? 0) > 0;
        }
    }
    loadLeadDataWeights() {
        this.leadData.getQualificationPolicy().subscribe({
            next: (policy) => {
                this.leadDataWeights.set(policy?.leadDataWeights ?? []);
                this.qualificationFactors.set(policy?.factors ?? []);
                this.showCqvsInLeadList.set(!!policy?.showCqvsInLeadList);
            },
            error: () => {
                // Default weights live in `computeLeadScore` fallback; this endpoint is for configurability.
                this.leadDataWeights.set([]);
                this.qualificationFactors.set([]);
                this.showCqvsInLeadList.set(false);
            }
        });
    }
    countQualificationFactors(lead) {
        const activeFactors = (this.qualificationFactors().length ? this.qualificationFactors() : [
            { key: 'budget', isActive: true, factorType: 'system' },
            { key: 'readiness', isActive: true, factorType: 'system' },
            { key: 'timeline', isActive: true, factorType: 'system' },
            { key: 'problem', isActive: true, factorType: 'system' },
            { key: 'economicBuyer', isActive: true, factorType: 'system' },
            { key: 'icpFit', isActive: true, factorType: 'system' }
        ])
            .filter((factor) => factor.isActive);
        const activeKeys = new Set(activeFactors.map((factor) => factor.key));
        const factors = [
            activeKeys.has('budget') ? lead.budgetAvailability : null,
            activeKeys.has('readiness') ? lead.readinessToSpend : null,
            activeKeys.has('timeline') ? lead.buyingTimeline : null,
            activeKeys.has('problem') ? lead.problemSeverity : null,
            activeKeys.has('economicBuyer') ? lead.economicBuyer : null,
            activeKeys.has('icpFit') ? lead.icpFit : null,
            ...(lead.customQualificationFactors ?? [])
                .filter((factor) => activeKeys.has(factor.key))
                .map((factor) => factor.value)
        ];
        return factors.filter((value) => this.isMeaningfulFactor(value)).length;
    }
    isMeaningfulFactor(value) {
        if (!value)
            return false;
        const normalized = value.trim().toLowerCase();
        return normalized.length > 0 && !normalized.includes('unknown');
    }
    computeOverallScore(lead) {
        if (lead.lifecycleScore) {
            const qualificationRawScore100 = lead.lifecycleScore.qualificationScore > 0 ? lead.lifecycleScore.qualificationScore : null;
            return {
                buyerDataQualityScore100: lead.lifecycleScore.leadDataQualityScore,
                qualificationRawScore100,
                qualificationScore100: lead.lifecycleScore.qualificationScore,
                leadContributionScore100: lead.lifecycleScore.leadDataQualityScore,
                qualificationContributionScore100: lead.lifecycleScore.qualificationScore,
                conversationContributionScore100: lead.lifecycleScore.conversationScore,
                historyContributionScore100: lead.lifecycleScore.historyExecutionScore,
                finalLeadScore: lead.lifecycleScore.overallScore
            };
        }
        return computeLeadScore(this.toScoreInputs(lead), this.leadDataWeights(), this.qualificationFactors());
    }
    toScoreInputs(lead) {
        const nameParts = (lead.name ?? '').trim().split(/\s+/).filter((part) => part.length > 0);
        const firstName = nameParts[0] ?? '';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
        return {
            firstName,
            lastName,
            email: lead.email ?? null,
            phone: lead.phone ?? null,
            companyName: lead.company ?? null,
            jobTitle: lead.jobTitle ?? null,
            source: lead.source ?? null,
            territory: lead.territory ?? null,
            budgetAvailability: lead.budgetAvailability ?? null,
            readinessToSpend: lead.readinessToSpend ?? null,
            buyingTimeline: lead.buyingTimeline ?? null,
            problemSeverity: lead.problemSeverity ?? null,
            economicBuyer: lead.economicBuyer ?? null,
            icpFit: lead.icpFit ?? null,
            conversationScore100: lead.conversationSignalAvailable ? (lead.conversationScore ?? null) : null,
            firstTouchDueAtUtc: lead.firstTouchDueAtUtc ?? null,
            firstTouchedAtUtc: lead.firstTouchedAtUtc ?? null,
            status: lead.status
        };
    }
    static ɵfac = function LeadsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LeadsPage)(i0.ɵɵdirectiveInject(i1.LeadDataService), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.UserAdminDataService), i0.ɵɵdirectiveInject(i4.ImportJobService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LeadsPage, selectors: [["app-leads-page"]], decls: 207, vars: 68, consts: [["loadingState", ""], ["emptyState", ""], [1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "grid-pattern"], [1, "page-container"], [1, "page-content"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-stats"], [1, "hero-stat"], [1, "stat-value"], [1, "stat-label"], [1, "stat-bar"], [1, "stat-bar-fill", 2, "width", "100%"], [1, "stat-bar-fill", "stat-bar-fill--leads"], [1, "stat-bar-fill", "stat-bar-fill--prospects"], [1, "stat-bar-fill", "stat-bar-fill--success"], [1, "hero-actions"], ["type", "button", "aria-label", "Add new lead", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "action-btn__icon"], [1, "pi", "pi-plus"], ["type", "button", "aria-label", "Import leads", 1, "action-btn", "action-btn--import", 3, "click", "disabled"], [1, "pi", "pi-upload"], ["type", "button", "aria-label", "Refresh leads", 1, "action-btn", "action-btn--refresh", 3, "click"], [1, "pi", "pi-refresh"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-trophy"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend", "card-trend--up"], [1, "pi", "pi-arrow-up"], [1, "card-glow"], [1, "visual-card", "visual-card--secondary"], [1, "pi", "pi-phone"], [1, "card-trend"], [1, "pi", "pi-spin", "pi-sync"], [1, "visual-card", "visual-card--success"], [1, "pi", "pi-bolt"], [1, "pi", "pi-check-circle"], [1, "metrics-section"], [1, "metric-card", "metric-card--total"], [1, "metric-icon"], [1, "pi", "pi-database"], [1, "metric-content"], [1, "metric-label"], [1, "metric-value"], [1, "metric-chart"], ["viewBox", "0 0 100 40", 1, "sparkline"], ["d", "M0,35 Q25,30 50,20 T100,15", "fill", "none", "stroke", "url(#gradient-leads)", "stroke-width", "2"], ["id", "gradient-leads", "x1", "0%", "y1", "0%", "x2", "100%", "y2", "0%"], ["offset", "0%", "stop-color", "#667eea"], ["offset", "100%", "stop-color", "#764ba2"], [1, "metric-card", "metric-card--leads", "clickable", 3, "click"], [1, "pi", "pi-star-fill"], [1, "metric-ring"], ["viewBox", "0 0 36 36"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-bg"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--cyan"], [1, "metric-card", "metric-card--prospects", "clickable", 3, "click"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--purple"], [1, "metric-card", "metric-card--customers", "clickable", 3, "click"], [1, "pi", "pi-verified"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--green"], [1, "metric-card", "metric-card--new"], [1, "pi", "pi-wave-pulse"], [1, "metric-badge"], [1, "action-bar", "glass-card"], [1, "search-box"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search leads...", 3, "ngModelChange", "ngModel"], [4, "ngIf"], ["pButton", "", "type", "button", "class", "clear-btn", 3, "click", 4, "ngIf"], [1, "quick-filters"], ["pButton", "", "type", "button", "aria-label", "Filter: All leads", 1, "filter-chip", 3, "click"], ["pButton", "", "type", "button", "class", "filter-chip", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "action-right"], [1, "view-toggle"], ["type", "button", "title", "Table View", "aria-label", "Switch to table view", 1, "toggle-btn", 3, "click"], [1, "pi", "pi-list"], ["type", "button", "title", "Kanban View", "aria-label", "Switch to kanban view", 1, "toggle-btn", 3, "click"], [1, "pi", "pi-objects-column"], [1, "conversation-filters"], ["pButton", "", "type", "button", "class", "filter-chip filter-chip--conversation", 3, "active", "click", 4, "ngFor", "ngForOf"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Sort leads", 1, "lead-sort-select", 3, "ngModelChange", "options", "ngModel"], ["pButton", "", "type", "button", "class", "btn-ghost", "aria-label", "Clear status filter", 3, "click", 4, "ngIf"], ["class", "kanban-board", 4, "ngIf"], ["class", "data-table-section glass-card", 4, "ngIf"], [3, "actionClicked", "clearSelection", "selectAll", "actions", "selectedItems", "totalCount"], ["header", "Assign owner", 3, "visibleChange", "visible", "modal"], [1, "bulk-assign"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Select owner", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "disabled"], ["pTemplate", "footer"], ["header", "Change status", 3, "visibleChange", "visible", "modal"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Select status", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["pTemplate", "item"], ["pTemplate", "value"], [3, "closed", "imported", 4, "ngIf"], ["position", "right", "styleClass", "lead-coach-drawer", 3, "visibleChange", "onHide", "visible", "modal", "dismissible"], ["pTemplate", "header"], ["class", "coach-body", "data-testid", "lead-coach-drawer", 4, "ngIf"], ["pButton", "", "type", "button", 1, "clear-btn", 3, "click"], [1, "pi", "pi-times"], ["pButton", "", "type", "button", 1, "filter-chip", 3, "click"], [1, "chip-dot"], ["pButton", "", "type", "button", 1, "filter-chip", "filter-chip--conversation", 3, "click"], [1, "filter-chip__count"], ["pButton", "", "type", "button", "aria-label", "Clear status filter", 1, "btn-ghost", 3, "click"], [1, "pi", "pi-filter-slash"], [1, "kanban-board"], ["class", "kanban-column", 4, "ngFor", "ngForOf"], [1, "kanban-column"], [1, "column-header"], [1, "column-title"], [1, "column-count"], [1, "column-body"], ["class", "lead-card", "role", "article", 3, "click", 4, "ngFor", "ngForOf"], ["class", "column-empty", 4, "ngIf"], ["role", "article", 1, "lead-card", 3, "click"], [1, "lead-card-header"], [1, "lead-avatar"], [3, "src", "alt", "title"], [1, "lead-meta"], [1, "lead-name"], ["class", "lead-company", 4, "ngIf"], [1, "lead-company"], ["class", "lead-presence-chip", "tooltipPosition", "top", 3, "pTooltip", 4, "ngIf"], ["tooltipPosition", "top", 1, "lead-score-gauge", 3, "pTooltip"], ["rangeColor", "rgba(148, 163, 184, 0.20)", "textColor", "#0f172a", "styleClass", "lead-score-gauge__knob", 3, "ngModel", "readonly", "valueTemplate", "size", "strokeWidth", "showValue", "min", "max", "valueColor"], [1, "lead-card-body"], ["class", "lead-detail", 4, "ngIf"], [1, "lead-epistemic"], ["tooltipPosition", "top", 1, "epistemic-chip", "confidence", 3, "pTooltip"], ["tooltipPosition", "top", 1, "epistemic-chip", "conversation", 3, "pTooltip"], ["class", "lead-related", 3, "click", 4, "ngIf"], [1, "lead-card-footer"], [1, "lead-owner"], [1, "pi", "pi-user"], [1, "lead-actions"], ["type", "button", "aria-label", "Edit lead", 1, "mini-action-btn", "mini-action-btn--edit", 3, "click", "disabled"], [1, "pi", "pi-pencil"], ["type", "button", "class", "mini-action-btn mini-action-btn--activity", "aria-label", "Recycle lead", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "aria-label", "Log activity", 1, "mini-action-btn", "mini-action-btn--activity", 3, "click", "disabled"], [1, "pi", "pi-calendar-plus"], ["type", "button", "class", "mini-action-btn mini-action-btn--convert", "aria-label", "Convert lead", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "aria-label", "Delete lead", 1, "mini-action-btn", "mini-action-btn--delete", 3, "click", "disabled"], [1, "pi", "pi-trash"], ["tooltipPosition", "top", 1, "lead-presence-chip", 3, "pTooltip"], [1, "pi", 3, "ngClass"], [1, "lead-detail"], [1, "pi", "pi-envelope"], [1, "lead-related", 3, "click"], [1, "lead-related-label"], [1, "lead-related-links"], ["class", "lead-related-link", 3, "routerLink", 4, "ngIf"], [1, "lead-related-link", 3, "routerLink"], ["type", "button", "aria-label", "Recycle lead", 1, "mini-action-btn", "mini-action-btn--activity", 3, "click", "disabled"], ["type", "button", "aria-label", "Convert lead", 1, "mini-action-btn", "mini-action-btn--convert", 3, "click", "disabled"], [1, "column-empty"], [1, "pi", "pi-inbox"], [1, "data-table-section", "glass-card"], [4, "ngIf", "ngIfElse"], [1, "table-container"], [1, "leads-table", 3, "ngClass", "value"], ["pTemplate", "body"], [1, "table-footer"], [1, "pagination-info"], ["styleClass", "custom-paginator", 3, "onPageChange", "rows", "totalRecords", "rowsPerPageOptions", "first"], [1, "th-checkbox"], [3, "onChange", "binary", "ngModel"], ["pSortableColumn", "name", 1, "th-lead"], ["field", "name"], ["pSortableColumn", "status", 1, "th-status"], ["field", "status"], [1, "th-contact"], ["pSortableColumn", "score", 1, "th-score"], ["field", "score"], ["pSortableColumn", "ownerId", 1, "th-owner"], ["field", "ownerId"], ["pSortableColumn", "createdAt", 1, "th-created"], ["field", "createdAt"], [1, "th-actions"], [1, "table-row", 3, "click"], [1, "td-checkbox"], [1, "td-lead"], [1, "lead-cell"], [1, "avatar"], [1, "lead-info"], [1, "name"], ["class", "company", 4, "ngIf"], [1, "company"], ["class", "lead-sla", 4, "ngIf"], ["class", "lead-related", 4, "ngIf"], ["class", "lead-disposition", 4, "ngIf"], [1, "td-status"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "styleClass", "inline-select", 3, "ngModelChange", "options", "ngModel"], [1, "td-contact"], [1, "contact-cell"], ["class", "contact-link", "href", "", 3, "click", 4, "ngIf"], ["class", "contact-secondary", 4, "ngIf"], [1, "td-score"], ["tooltipPosition", "top", 1, "score-indicator", 3, "pTooltip"], ["rangeColor", "rgba(148, 163, 184, 0.18)", "textColor", "#0f172a", "styleClass", "lead-score-gauge__knob lead-score-gauge__knob--table", 3, "ngModel", "readonly", "valueTemplate", "size", "strokeWidth", "showValue", "min", "max", "valueColor"], [1, "td-owner"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Owner", "styleClass", "inline-select", 3, "ngModelChange", "options", "ngModel", "disabled"], [1, "td-created"], [1, "created-date"], [1, "td-actions"], [1, "row-actions"], ["type", "button", "title", "Edit", 1, "row-action-btn", "row-action-btn--edit", 3, "click", "disabled"], ["type", "button", "class", "row-action-btn row-action-btn--recycle", "title", "Recycle to nurture", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "class", "row-action-btn row-action-btn--coach", "title", "Coach", "data-testid", "lead-coach-open", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "title", "Log activity", 1, "row-action-btn", "row-action-btn--activity", 3, "click", "disabled"], ["type", "button", "class", "row-action-btn row-action-btn--convert", "title", "Convert", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "lead-sla"], [1, "sla-chip", 3, "ngClass"], [1, "pi", "pi-stopwatch"], [1, "lead-related"], [1, "lead-disposition"], [1, "lead-disposition__label"], [1, "lead-disposition__value"], [1, "status-option"], ["class", "status-option", 4, "ngIf"], ["class", "status-placeholder", 4, "ngIf"], [1, "status-placeholder"], ["href", "", 1, "contact-link", 3, "click"], [1, "contact-secondary"], ["type", "button", "title", "Recycle to nurture", 1, "row-action-btn", "row-action-btn--recycle", 3, "click", "disabled"], ["type", "button", "title", "Coach", "data-testid", "lead-coach-open", 1, "row-action-btn", "row-action-btn--coach", 3, "click", "disabled"], [1, "pi", "pi-compass"], ["type", "button", "title", "Convert", 1, "row-action-btn", "row-action-btn--convert", 3, "click", "disabled"], [1, "skeleton-table"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton", "skeleton-checkbox"], [1, "skeleton", "skeleton-avatar"], [1, "skeleton", "skeleton-text", "long"], [1, "skeleton", "skeleton-badge"], [1, "skeleton", "skeleton-text", "medium"], [1, "skeleton", "skeleton-bar"], [1, "skeleton", "skeleton-text", "short"], [1, "skeleton", "skeleton-actions"], [1, "empty-state"], [1, "empty-illustration"], [1, "pi", "pi-users"], ["pButton", "", "type", "button", 1, "btn-primary", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Cancel", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "button", "label", "Assign", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Update", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], [3, "closed", "imported"], ["data-testid", "lead-coach-title", 1, "coach-title"], ["class", "coach-title__top", 4, "ngIf"], [1, "coach-title__top"], ["aria-hidden", "true", 1, "coach-title__badge"], [1, "coach-title__meta"], [1, "coach-title__row"], [1, "coach-title__label"], [1, "coach-chip"], [1, "coach-title__name"], [1, "coach-title__chips"], ["class", "coach-chip coach-chip--muted", 4, "ngIf"], [1, "coach-chip", "coach-chip--muted"], ["data-testid", "lead-coach-drawer", 1, "coach-body"], [1, "coach-kpis"], [1, "coach-kpi"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-sub"], ["tooltipPosition", "top", 1, "coach-kpi", 3, "pTooltip"], ["class", "coach-kpi", 4, "ngIf"], [1, "coach-block", "coach-block--conversation-summary"], [1, "coach-block__title"], [1, "coach-signal-strip"], [1, "coach-chip", "coach-chip--signal"], [1, "coach-next-action"], [1, "coach-next-action__label"], ["class", "coach-block", 4, "ngIf"], [1, "coach-block"], [1, "cqvs-grid"], ["class", "cqvs-card", 4, "ngFor", "ngForOf"], ["class", "coach-hint", 4, "ngIf"], ["tooltipPosition", "top", 1, "weakest-row", 3, "pTooltip"], ["class", "cqvs-pill", 4, "ngIf"], [1, "weakest-row__text"], [1, "weakest-row__top"], ["class", "state-pill", 4, "ngIf"], ["data-testid", "lead-coach-footer", 1, "coach-footer"], [1, "coach-actions"], ["pButton", "", "type", "button", 1, "coach-action-btn", "coach-action-btn--edit", 3, "click"], ["pButton", "", "type", "button", "class", "coach-action-btn coach-action-btn--compose", 3, "click", 4, "ngIf"], ["pButton", "", "type", "button", "class", "coach-action-btn coach-action-btn--log", 3, "click", 4, "ngIf"], ["pButton", "", "type", "button", 1, "coach-action-btn", "coach-action-btn--log", 3, "click"], ["pButton", "", "type", "button", "class", "coach-action-btn coach-action-btn--convert", 3, "click", 4, "ngIf"], [1, "weakest-row"], [1, "cqvs-pill"], ["class", "coach-checklist", 4, "ngIf"], [1, "state-pill"], [1, "coach-checklist"], [4, "ngFor", "ngForOf"], [1, "cqvs-card"], [1, "cqvs-card__head"], [1, "cqvs-code"], [1, "cqvs-title"], [1, "cqvs-score"], ["aria-hidden", "true", 1, "cqvs-bar"], [1, "cqvs-bar__fill"], [1, "coach-hint"], [1, "coach-list"], [1, "coach-list", "coach-list--flags"], ["pButton", "", "type", "button", 1, "coach-action-btn", "coach-action-btn--compose", 3, "click"], ["pButton", "", "type", "button", 1, "coach-action-btn", "coach-action-btn--convert", 3, "click"]], template: function LeadsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵelement(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "div", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 7)(6, "div", 8);
            i0.ɵɵelement(7, "app-breadcrumbs");
            i0.ɵɵelementStart(8, "section", 9)(9, "div", 10)(10, "div", 11);
            i0.ɵɵelement(11, "span", 12);
            i0.ɵɵelementStart(12, "span");
            i0.ɵɵtext(13, "Lead Intelligence Hub");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "h1", 13)(15, "span", 14);
            i0.ɵɵtext(16, "Leads");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "span", 15);
            i0.ɵɵtext(18, "Workspace");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "p", 16);
            i0.ɵɵtext(20, " Track, qualify, and convert leads with AI-powered scoring and conversation intelligence ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 17)(22, "div", 18)(23, "div", 19);
            i0.ɵɵtext(24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 20);
            i0.ɵɵtext(26, "Total Leads");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 21);
            i0.ɵɵelement(28, "div", 22);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "div", 18)(30, "div", 19);
            i0.ɵɵtext(31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 20);
            i0.ɵɵtext(33, "New Leads");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 21);
            i0.ɵɵelement(35, "div", 23);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(36, "div", 18)(37, "div", 19);
            i0.ɵɵtext(38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 20);
            i0.ɵɵtext(40, "Qualified");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div", 21);
            i0.ɵɵelement(42, "div", 24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "div", 18)(44, "div", 19);
            i0.ɵɵtext(45);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 20);
            i0.ɵɵtext(47, "Converted");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 21);
            i0.ɵɵelement(49, "div", 25);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(50, "div", 26)(51, "button", 27);
            i0.ɵɵlistener("click", function LeadsPage_Template_button_click_51_listener() { return ctx.onCreate(); });
            i0.ɵɵelementStart(52, "span", 28);
            i0.ɵɵelement(53, "i", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "span");
            i0.ɵɵtext(55, "Add Lead");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "button", 30);
            i0.ɵɵlistener("click", function LeadsPage_Template_button_click_56_listener() { return ctx.openImport(); });
            i0.ɵɵelementStart(57, "span", 28);
            i0.ɵɵelement(58, "i", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "span");
            i0.ɵɵtext(60, "Import");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(61, "button", 32);
            i0.ɵɵlistener("click", function LeadsPage_Template_button_click_61_listener() { return ctx.load(); });
            i0.ɵɵelementStart(62, "span", 28);
            i0.ɵɵelement(63, "i", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "span");
            i0.ɵɵtext(65, "Refresh");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(66, "div", 34)(67, "div", 35)(68, "div", 36);
            i0.ɵɵelement(69, "i", 37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "div", 38)(71, "span", 39);
            i0.ɵɵtext(72, "Win Rate");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "strong", 40);
            i0.ɵɵtext(74);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "span", 41);
            i0.ɵɵelement(76, "i", 42);
            i0.ɵɵtext(77, " Conversion rate ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(78, "div", 43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "div", 44)(80, "div", 36);
            i0.ɵɵelement(81, "i", 45);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(82, "div", 38)(83, "span", 39);
            i0.ɵɵtext(84, "Pipeline");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(85, "strong", 40);
            i0.ɵɵtext(86);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(87, "span", 46);
            i0.ɵɵelement(88, "i", 47);
            i0.ɵɵtext(89, " Leads in progress ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(90, "div", 43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "div", 48)(92, "div", 36);
            i0.ɵɵelement(93, "i", 49);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "div", 38)(95, "span", 39);
            i0.ɵɵtext(96, "Ready");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "strong", 40);
            i0.ɵɵtext(98);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(99, "span", 41);
            i0.ɵɵelement(100, "i", 50);
            i0.ɵɵtext(101, " To convert ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(102, "div", 43);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(103, "section", 51)(104, "div", 52)(105, "div", 53);
            i0.ɵɵelement(106, "i", 54);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(107, "div", 55)(108, "span", 56);
            i0.ɵɵtext(109, "Total Leads");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(110, "strong", 57);
            i0.ɵɵtext(111);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(112, "div", 58);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(113, "svg", 59);
            i0.ɵɵelement(114, "path", 60);
            i0.ɵɵelementStart(115, "defs")(116, "linearGradient", 61);
            i0.ɵɵelement(117, "stop", 62)(118, "stop", 63);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(119, "div", 64);
            i0.ɵɵlistener("click", function LeadsPage_Template_div_click_119_listener() { return ctx.onStatusChange("New"); });
            i0.ɵɵelementStart(120, "div", 53);
            i0.ɵɵelement(121, "i", 65);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(122, "div", 55)(123, "span", 56);
            i0.ɵɵtext(124, "New");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "strong", 57);
            i0.ɵɵtext(126);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(127, "div", 66);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(128, "svg", 67);
            i0.ɵɵelement(129, "path", 68)(130, "path", 69);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(131, "div", 70);
            i0.ɵɵlistener("click", function LeadsPage_Template_div_click_131_listener() { return ctx.onStatusChange("Qualified"); });
            i0.ɵɵelementStart(132, "div", 53);
            i0.ɵɵelement(133, "i", 50);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(134, "div", 55)(135, "span", 56);
            i0.ɵɵtext(136, "Qualified");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(137, "strong", 57);
            i0.ɵɵtext(138);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(139, "div", 66);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(140, "svg", 67);
            i0.ɵɵelement(141, "path", 68)(142, "path", 71);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(143, "div", 72);
            i0.ɵɵlistener("click", function LeadsPage_Template_div_click_143_listener() { return ctx.onStatusChange("Converted"); });
            i0.ɵɵelementStart(144, "div", 53);
            i0.ɵɵelement(145, "i", 73);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(146, "div", 55)(147, "span", 56);
            i0.ɵɵtext(148, "Converted");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(149, "strong", 57);
            i0.ɵɵtext(150);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(151, "div", 66);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(152, "svg", 67);
            i0.ɵɵelement(153, "path", 68)(154, "path", 74);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(155, "div", 75)(156, "div", 53);
            i0.ɵɵelement(157, "i", 76);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(158, "div", 55)(159, "span", 56);
            i0.ɵɵtext(160, "Avg Score");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(161, "strong", 57);
            i0.ɵɵtext(162);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(163, "div", 77)(164, "span");
            i0.ɵɵtext(165, "SCORE");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(166, "section", 78)(167, "div", 79);
            i0.ɵɵelement(168, "i", 80);
            i0.ɵɵelementStart(169, "input", 81);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadsPage_Template_input_ngModelChange_169_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event); return $event; });
            i0.ɵɵlistener("ngModelChange", function LeadsPage_Template_input_ngModelChange_169_listener($event) { return ctx.onSearch($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(170, LeadsPage_kbd_170_Template, 2, 0, "kbd", 82)(171, LeadsPage_button_171_Template, 2, 0, "button", 83);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(172, "div", 84)(173, "button", 85);
            i0.ɵɵlistener("click", function LeadsPage_Template_button_click_173_listener() { return ctx.onStatusChange("all"); });
            i0.ɵɵtext(174, " All ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(175, LeadsPage_button_175_Template, 3, 5, "button", 86);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(176, "div", 87)(177, "div", 88)(178, "button", 89);
            i0.ɵɵlistener("click", function LeadsPage_Template_button_click_178_listener() { return ctx.viewMode = "table"; });
            i0.ɵɵelement(179, "i", 90);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(180, "button", 91);
            i0.ɵɵlistener("click", function LeadsPage_Template_button_click_180_listener() { return ctx.viewMode = "kanban"; });
            i0.ɵɵelement(181, "i", 92);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(182, "div", 93);
            i0.ɵɵtemplate(183, LeadsPage_button_183_Template, 5, 5, "button", 94);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(184, "p-select", 95);
            i0.ɵɵlistener("ngModelChange", function LeadsPage_Template_p_select_ngModelChange_184_listener($event) { return ctx.onSortChange($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(185, LeadsPage_button_185_Template, 3, 0, "button", 96);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(186, LeadsPage_section_186_Template, 2, 1, "section", 97)(187, LeadsPage_section_187_Template, 6, 2, "section", 98);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(188, "app-bulk-actions-bar", 99);
            i0.ɵɵlistener("actionClicked", function LeadsPage_Template_app_bulk_actions_bar_actionClicked_188_listener($event) { return ctx.onBulkAction($event); })("clearSelection", function LeadsPage_Template_app_bulk_actions_bar_clearSelection_188_listener() { return ctx.clearSelection(); })("selectAll", function LeadsPage_Template_app_bulk_actions_bar_selectAll_188_listener() { return ctx.selectAllFiltered(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(189, "p-dialog", 100);
            i0.ɵɵtwoWayListener("visibleChange", function LeadsPage_Template_p_dialog_visibleChange_189_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.assignDialogVisible, $event) || (ctx.assignDialogVisible = $event); return $event; });
            i0.ɵɵelementStart(190, "div", 101)(191, "label");
            i0.ɵɵtext(192, "Owner");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(193, "p-select", 102);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadsPage_Template_p_select_ngModelChange_193_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.assignOwnerId, $event) || (ctx.assignOwnerId = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(194, LeadsPage_ng_template_194_Template, 2, 1, "ng-template", 103);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(195, "p-dialog", 104);
            i0.ɵɵtwoWayListener("visibleChange", function LeadsPage_Template_p_dialog_visibleChange_195_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.statusDialogVisible, $event) || (ctx.statusDialogVisible = $event); return $event; });
            i0.ɵɵelementStart(196, "div", 101)(197, "label");
            i0.ɵɵtext(198, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(199, "p-select", 105);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadsPage_Template_p_select_ngModelChange_199_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.bulkStatus, $event) || (ctx.bulkStatus = $event); return $event; });
            i0.ɵɵtemplate(200, LeadsPage_ng_template_200_Template, 4, 3, "ng-template", 106)(201, LeadsPage_ng_template_201_Template, 2, 2, "ng-template", 107);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(202, LeadsPage_ng_template_202_Template, 2, 1, "ng-template", 103);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(203, LeadsPage_app_lead_import_wizard_203_Template, 1, 0, "app-lead-import-wizard", 108);
            i0.ɵɵelementStart(204, "p-drawer", 109);
            i0.ɵɵlistener("visibleChange", function LeadsPage_Template_p_drawer_visibleChange_204_listener($event) { return ctx.coachVisible.set($event); })("onHide", function LeadsPage_Template_p_drawer_onHide_204_listener() { return ctx.onCoachHide(); });
            i0.ɵɵtemplate(205, LeadsPage_ng_template_205_Template, 2, 1, "ng-template", 110)(206, LeadsPage_div_206_Template, 82, 37, "div", 111);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(24);
            i0.ɵɵtextInterpolate(ctx.metrics().total || 0);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.metrics().newLeads);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.metrics().total ? ctx.metrics().newLeads / ctx.metrics().total * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.metrics().qualified);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.metrics().total ? ctx.metrics().qualified / ctx.metrics().total * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.metrics().converted);
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.metrics().total ? ctx.metrics().converted / ctx.metrics().total * 100 : 0, "%");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(18);
            i0.ɵɵtextInterpolate1("", ctx.conversionRate(), "%");
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.metrics().contacted + ctx.metrics().nurture);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.conversationCoachMetrics().readyToConvert);
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(ctx.metrics().total || "\u2014");
            i0.ɵɵadvance(8);
            i0.ɵɵclassProp("active", ctx.statusFilter === "New");
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.metrics().newLeads);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.metrics().total ? ctx.metrics().newLeads / ctx.metrics().total * 100 : 0) + ", 100");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active", ctx.statusFilter === "Qualified");
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.metrics().qualified);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.metrics().total ? ctx.metrics().qualified / ctx.metrics().total * 100 : 0) + ", 100");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("active", ctx.statusFilter === "Converted");
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.metrics().converted);
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.metrics().total ? ctx.metrics().converted / ctx.metrics().total * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1("", ctx.metrics().avgScore, "%");
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchTerm);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.searchTerm);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.searchTerm);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.statusFilter === "all");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.filteredStatusOptions);
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("active", ctx.viewMode === "table");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.viewMode === "kanban");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.conversationViewOptions);
            i0.ɵɵadvance();
            i0.ɵɵproperty("options", ctx.sortOptions)("ngModel", ctx.sortBy);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.statusFilter !== "all");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.viewMode === "kanban");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.viewMode === "table");
            i0.ɵɵadvance();
            i0.ɵɵproperty("actions", ctx.bulkActions())("selectedItems", ctx.selectedIds())("totalCount", ctx.leads().length);
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(66, _c0));
            i0.ɵɵtwoWayProperty("visible", ctx.assignDialogVisible);
            i0.ɵɵproperty("modal", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.ownerOptionsForAssign());
            i0.ɵɵtwoWayProperty("ngModel", ctx.assignOwnerId);
            i0.ɵɵproperty("disabled", !ctx.canEditOwnerAssignment());
            i0.ɵɵadvance(2);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(67, _c0));
            i0.ɵɵtwoWayProperty("visible", ctx.statusDialogVisible);
            i0.ɵɵproperty("modal", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.filteredStatusOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.bulkStatus);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.importDialogVisible);
            i0.ɵɵadvance();
            i0.ɵɵproperty("visible", ctx.coachVisible())("modal", true)("dismissible", true);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.coachLead());
        } }, dependencies: [NgIf,
            NgFor,
            NgClass,
            FormsModule, i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgModel, ButtonModule, i6.ButtonDirective, i7.PrimeTemplate, CheckboxModule, i8.Checkbox, FileUploadModule,
            InputTextModule, i9.InputText, SelectModule, i10.Select, TableModule, i11.Table, i11.SortableColumn, i11.SortIcon, PaginatorModule, i12.Paginator, DialogModule, i13.Dialog, TooltipModule, i14.Tooltip, DrawerModule, i15.Drawer, KnobModule, i16.Knob, BreadcrumbsComponent,
            BulkActionsBarComponent,
            RouterLink,
            LeadImportWizardComponent,
            DatePipe], styles: ["//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   LEADS[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   Modern[_ngcontent-%COMP%]   Enterprise[_ngcontent-%COMP%]   Design[_ngcontent-%COMP%]   (Salesforce/HubSpot Inspired)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use[_ngcontent-%COMP%]   '../../../../../styles/design-tokens'[_ngcontent-%COMP%]   as[_ngcontent-%COMP%]   *[_ngcontent-%COMP%];\n@use 'sass:color';\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   STATUS[_ngcontent-%COMP%]   COLORS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n$status-new[_ngcontent-%COMP%]:   #06b6d4[_ngcontent-%COMP%];\n$status-contacted[_ngcontent-%COMP%]:   #f59e0b[_ngcontent-%COMP%];\n$status-qualified[_ngcontent-%COMP%]:   #10b981[_ngcontent-%COMP%];\n$status-converted[_ngcontent-%COMP%]:   #6366f1[_ngcontent-%COMP%];\n$status-lost[_ngcontent-%COMP%]:   #ef4444[_ngcontent-%COMP%];\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   BACKGROUND\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.page-background[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);\n  overflow: hidden;\n}\n\n.animated-orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(100px);\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_float 30s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 600px;\n    height: 600px;\n    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);\n    top: -200px;\n    left: -200px;\n  }\n\n  &.orb-2 {\n    width: 500px;\n    height: 500px;\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\n    bottom: -150px;\n    right: -150px;\n    animation-delay: -10s;\n  }\n\n  &.orb-3 {\n    width: 400px;\n    height: 400px;\n    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    animation-delay: -20s;\n    opacity: 0.25;\n  }\n}\n\n.grid-pattern[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background-image: \n    linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);\n  background-size: 40px 40px;\n}\n\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  33% { transform: translate(20px, -30px) scale(1.02); }\n  66% { transform: translate(-15px, 20px) scale(0.98); }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   LAYOUT\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  min-height: 100vh;\n  padding: 24px 32px;\n}\n\n.page-content[_ngcontent-%COMP%] {\n  max-width: 1600px;\n  margin: 0 auto;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ANIMATIONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes[_ngcontent-%COMP%]   gradient-shift[_ngcontent-%COMP%] {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes _ngcontent-%COMP%_pulse-glow {\n  0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }\n  50% { opacity: 0.8; box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); }\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes _ngcontent-%COMP%_slide-in-right {\n  from { opacity: 0; transform: translateX(20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n@keyframes _ngcontent-%COMP%_ring-draw {\n  0% { stroke-dasharray: 0, 100; }\n}\n\n@keyframes _ngcontent-%COMP%_badge-pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.1); }\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(100%); }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   HERO[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: _ngcontent-%COMP%_fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: _ngcontent-%COMP%_pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-4;\n  flex-wrap: wrap;\n  margin-top: $space-2;\n}\n\n.hero-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 80px;\n\n  .stat-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .stat-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .stat-bar {\n    width: 100%;\n    height: 4px;\n    background: $gray-200;\n    border-radius: $radius-full;\n    overflow: hidden;\n\n    .stat-bar-fill {\n      height: 100%;\n      background: $primary-gradient;\n      border-radius: $radius-full;\n      transition: width 1s ease-out;\n\n      &--leads { background: $cyan-gradient; }\n      &--prospects { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n      &--success { background: $success-gradient; }\n    }\n  }\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  margin-top: $space-2;\n  flex-wrap: wrap;\n}\n\n//[_ngcontent-%COMP%]   Hero[_ngcontent-%COMP%]   Visual[_ngcontent-%COMP%]   Cards\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: _ngcontent-%COMP%_slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform $transition-base, box-shadow $transition-base, border-color $transition-base;\n\n  &:hover {\n    transform: translateY(-3px) scale(1.01);\n    box-shadow: $glass-shadow-lg;\n  }\n\n  .card-icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n    transition: transform $transition-spring;\n  }\n\n  &:hover .card-icon {\n    transform: scale(1.1) rotate(5deg);\n  }\n\n  &--primary {\n    border-color: rgba(102, 126, 234, 0.2);\n\n    &:hover {\n      border-color: rgba(102, 126, 234, 0.4);\n      box-shadow: $glass-shadow-lg, 0 8px 24px rgba(102, 126, 234, 0.12);\n    }\n\n    .card-icon {\n      background: $primary-gradient;\n      color: white;\n      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n    }\n\n    .card-value {\n      background: $primary-gradient;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    .card-glow {\n      background: radial-gradient(circle, rgba(102, 126, 234, 0.18) 0%, transparent 70%);\n    }\n  }\n\n  &--secondary {\n    border-color: rgba(6, 182, 212, 0.2);\n\n    &:hover {\n      border-color: rgba(6, 182, 212, 0.4);\n      box-shadow: $glass-shadow-lg, 0 8px 24px rgba(6, 182, 212, 0.12);\n    }\n\n    .card-icon {\n      background: $cyan-gradient;\n      color: white;\n      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);\n    }\n\n    .card-value {\n      background: $cyan-gradient;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    .card-glow {\n      background: radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, transparent 70%);\n    }\n  }\n\n  &--success {\n    border-color: rgba(34, 197, 94, 0.2);\n\n    &:hover {\n      border-color: rgba(34, 197, 94, 0.4);\n      box-shadow: $glass-shadow-lg, 0 8px 24px rgba(34, 197, 94, 0.12);\n    }\n\n    .card-icon {\n      background: $success-gradient;\n      color: white;\n      box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);\n    }\n\n    .card-value {\n      background: $success-gradient;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    .card-glow {\n      background: radial-gradient(circle, rgba(34, 197, 94, 0.18) 0%, transparent 70%);\n    }\n  }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    &--up { color: $success; }\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n//[_ngcontent-%COMP%]   View[_ngcontent-%COMP%]   Toggle[_ngcontent-%COMP%]   (in action bar)\n.view-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: 8px;\n  padding: 2px;\n\n  .toggle-btn {\n    padding: 8px 12px;\n    border: none;\n    background: transparent;\n    color: $gray-500;\n    border-radius: 6px;\n    cursor: pointer;\n    transition: all 0.15s ease;\n\n    &:hover {\n      color: $gray-700;\n    }\n\n    &.active {\n      background: white;\n      color: $gray-900;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   METRICS[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.metrics-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1400px) { grid-template-columns: repeat(3, 1fr); }\n  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }\n  @media (max-width: 600px) { grid-template-columns: 1fr; }\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all $transition-base;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 5 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  &.clickable {\n    cursor: pointer;\n  }\n\n  // \u2500\u2500 Variant: Total \u2500\u2500\n  &--total {\n    border-color: rgba(102, 126, 234, 0.15);\n\n    &:hover { box-shadow: $glass-shadow-lg, 0 8px 24px rgba(102, 126, 234, 0.1); }\n\n    .metric-icon {\n      background: $primary-gradient;\n      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);\n    }\n\n    .metric-value {\n      background: $primary-gradient;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    &.active {\n      border-color: rgba(102, 126, 234, 0.4);\n      box-shadow: $glass-shadow, 0 0 0 2px rgba(102, 126, 234, 0.15);\n    }\n  }\n\n  // \u2500\u2500 Variant: New leads (cyan) \u2500\u2500\n  &--leads {\n    border-color: rgba(6, 182, 212, 0.15);\n\n    &:hover { box-shadow: $glass-shadow-lg, 0 8px 24px rgba(6, 182, 212, 0.1); }\n\n    .metric-icon {\n      background: $cyan-gradient;\n      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);\n    }\n\n    .metric-value { color: #0891b2; }\n\n    &.active {\n      border-color: rgba(6, 182, 212, 0.4);\n      box-shadow: $glass-shadow, 0 0 0 2px rgba(6, 182, 212, 0.15);\n      background: rgba(6, 182, 212, 0.04);\n    }\n  }\n\n  // \u2500\u2500 Variant: Qualified (purple) \u2500\u2500\n  &--prospects {\n    border-color: rgba(168, 85, 247, 0.15);\n\n    &:hover { box-shadow: $glass-shadow-lg, 0 8px 24px rgba(168, 85, 247, 0.1); }\n\n    .metric-icon {\n      background: linear-gradient(135deg, $purple 0%, #9333ea 100%);\n      box-shadow: 0 4px 12px rgba(168, 85, 247, 0.25);\n    }\n\n    .metric-value { color: #7c3aed; }\n\n    &.active {\n      border-color: rgba(168, 85, 247, 0.4);\n      box-shadow: $glass-shadow, 0 0 0 2px rgba(168, 85, 247, 0.15);\n      background: rgba(168, 85, 247, 0.04);\n    }\n  }\n\n  // \u2500\u2500 Variant: Converted (green) \u2500\u2500\n  &--customers {\n    border-color: rgba(34, 197, 94, 0.15);\n\n    &:hover { box-shadow: $glass-shadow-lg, 0 8px 24px rgba(34, 197, 94, 0.1); }\n\n    .metric-icon {\n      background: $success-gradient;\n      box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);\n    }\n\n    .metric-value { color: #16a34a; }\n\n    &.active {\n      border-color: rgba(34, 197, 94, 0.4);\n      box-shadow: $glass-shadow, 0 0 0 2px rgba(34, 197, 94, 0.15);\n      background: rgba(34, 197, 94, 0.04);\n    }\n  }\n\n  // \u2500\u2500 Variant: Avg Score (orange) \u2500\u2500\n  &--new {\n    border-color: rgba(249, 115, 22, 0.15);\n\n    &:hover { box-shadow: $glass-shadow-lg, 0 8px 24px rgba(249, 115, 22, 0.1); }\n\n    .metric-icon {\n      background: $orange-gradient;\n      box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);\n    }\n\n    .metric-value { color: #ea580c; }\n  }\n\n  .metric-icon {\n    width: 40px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-lg;\n    color: white;\n    flex-shrink: 0;\n    transition: transform $transition-spring;\n  }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n  }\n\n  .metric-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n}\n\n//[_ngcontent-%COMP%]   Sparkline[_ngcontent-%COMP%]   Chart\n.metric-chart[_ngcontent-%COMP%] {\n  position: absolute;\n  right: $space-4;\n  bottom: $space-3;\n  width: 60px;\n  height: 24px;\n  opacity: 0.5;\n\n  .sparkline {\n    width: 100%;\n    height: 100%;\n  }\n}\n\n//[_ngcontent-%COMP%]   Ring[_ngcontent-%COMP%]   Chart\n.metric-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  right: $space-3;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: $gray-200;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n    animation: _ngcontent-%COMP%_ring-draw 1s ease-out;\n\n    &--cyan { stroke: $cyan; }\n    &--purple { stroke: $purple; }\n    &--green { stroke: $success; }\n  }\n}\n\n//[_ngcontent-%COMP%]   Badge\n.metric-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: $space-3;\n  right: $space-3;\n\n  span {\n    display: inline-block;\n    padding: $space-1 $space-2;\n    background: $orange-gradient;\n    color: white;\n    font-size: $font-size-xs;\n    font-weight: 700;\n    border-radius: $radius-sm;\n    animation: _ngcontent-%COMP%_badge-pulse 2s ease-in-out infinite;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ACTION[_ngcontent-%COMP%]   BAR\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.action-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 12px 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n\n.glass-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 16px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n}\n\n.search-box[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  min-width: 200px;\n  max-width: 360px;\n\n  i {\n    position: absolute;\n    left: 14px;\n    top: 50%;\n    transform: translateY(-50%);\n    color: $gray-400;\n    font-size: 14px;\n  }\n\n  input {\n    width: 100%;\n    padding: 10px 14px 10px 40px;\n    border: 1px solid rgba(0, 0, 0, 0.08);\n    border-radius: 10px;\n    font-size: 14px;\n    background: white;\n    color: $gray-800;\n    transition: all 0.15s ease;\n\n    &::placeholder {\n      color: $gray-400;\n    }\n\n    &:focus {\n      outline: none;\n      border-color: $status-qualified;\n      box-shadow: 0 0 0 3px rgba($status-qualified, 0.1);\n    }\n  }\n\n  kbd {\n    position: absolute;\n    right: 12px;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: 3px 8px;\n    background: $gray-100;\n    border: 1px solid $gray-200;\n    border-radius: 6px;\n    font-size: 11px;\n    color: $gray-500;\n    font-family: inherit;\n  }\n\n  .clear-btn {\n    position: absolute;\n    right: 10px;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: 4px;\n    background: $gray-200;\n    border: none;\n    border-radius: 50%;\n    color: $gray-600;\n    cursor: pointer;\n    font-size: 10px;\n\n    &:hover {\n      background: $gray-300;\n    }\n  }\n}\n\n.quick-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.filter-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  border-radius: 20px;\n  font-size: 13px;\n  font-weight: 500;\n  color: $gray-600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.03);\n    border-color: rgba(0, 0, 0, 0.12);\n  }\n\n  &.active {\n    background: $status-qualified;\n    border-color: $status-qualified;\n    color: white;\n\n    .chip-dot {\n      background: white !important;\n    }\n  }\n}\n\n.filter-chip__count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 20px;\n  height: 20px;\n  padding: 0 6px;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.08);\n  font-size: 11px;\n  font-weight: 800;\n}\n\n.filter-chip.active[_ngcontent-%COMP%]   .filter-chip__count[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.22);\n  color: inherit;\n}\n\n.chip-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n\n  &[data-status=\"New\"] { background: $status-new; }\n  &[data-status=\"Contacted\"] { background: $status-contacted; }\n  &[data-status=\"Qualified\"] { background: $status-qualified; }\n  &[data-status=\"Converted\"] { background: $status-converted; }\n  &[data-status=\"Lost\"] { background: $status-lost; }\n}\n\n.action-right[_ngcontent-%COMP%] {\n  margin-left: auto;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n.conversation-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.filter-chip--conversation.active[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);\n  border-color: #4f46e5;\n}\n\n  .lead-sort-select .p-select {\n  min-width: 220px;\n  border-radius: 10px;\n}\n\n.bulk-assign[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n  .inline-select {\n  .p-select {\n    min-width: 140px;\n    border-radius: 10px;\n  }\n\n  .p-select-label {\n    font-size: 13px;\n    color: $gray-700;\n  }\n}\n\n\n.status-option[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n}\n\n.status-option[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n\n.status-placeholder[_ngcontent-%COMP%] {\n  color: rgba($gray-600, 0.8);\n  font-weight: 500;\n}\n\n.status-option[data-status=\"New\"][_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: $status-new; }\n.status-option[data-status=\"Contacted\"][_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: $status-contacted; }\n.status-option[data-status=\"Qualified\"][_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: $status-qualified; }\n.status-option[data-status=\"Converted\"][_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: $status-converted; }\n.status-option[data-status=\"Lost\"][_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: $status-lost; }\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   KANBAN[_ngcontent-%COMP%]   BOARD\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.kanban-board[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n  min-height: 500px;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.kanban-column[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.02);\n  border-radius: 16px;\n  display: flex;\n  flex-direction: column;\n  max-height: 70vh;\n}\n\n.column-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n  border-bottom: 2px solid;\n\n  &[data-status=\"New\"] { border-color: $status-new; }\n  &[data-status=\"Contacted\"] { border-color: $status-contacted; }\n  &[data-status=\"Qualified\"] { border-color: $status-qualified; }\n  &[data-status=\"Converted\"] { border-color: $status-converted; }\n  &[data-status=\"Lost\"] { border-color: $status-lost; }\n\n  .column-title {\n    font-size: 14px;\n    font-weight: 600;\n    color: $gray-700;\n  }\n\n  .column-count {\n    font-size: 12px;\n    font-weight: 600;\n    padding: 4px 10px;\n    background: white;\n    border-radius: 12px;\n    color: $gray-600;\n  }\n}\n\n.column-body[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.lead-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 14px;\n  cursor: pointer;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  transition: all 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n  }\n}\n\n.lead-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n\n.lead-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 10px;\n  font-size: 14px;\n  font-weight: 600;\n  color: white;\n  flex-shrink: 0;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n\n  &[data-status=\"New\"] { background: linear-gradient(135deg, $status-new 0%, color.adjust($status-new, $lightness: -10%) 100%); }\n  &[data-status=\"Contacted\"] { background: linear-gradient(135deg, $status-contacted 0%, color.adjust($status-contacted, $lightness: -10%) 100%); }\n  &[data-status=\"Qualified\"] { background: linear-gradient(135deg, $status-qualified 0%, color.adjust($status-qualified, $lightness: -10%) 100%); }\n  &[data-status=\"Converted\"] { background: linear-gradient(135deg, $status-converted 0%, color.adjust($status-converted, $lightness: -10%) 100%); }\n  &[data-status=\"Lost\"] { background: linear-gradient(135deg, $status-lost 0%, color.adjust($status-lost, $lightness: -10%) 100%); }\n}\n\n.lead-meta[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n\n  .lead-name {\n    display: block;\n    font-size: 14px;\n    font-weight: 600;\n    color: $gray-800;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .lead-company {\n    display: block;\n    font-size: 12px;\n    color: $gray-500;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n}\n\n.lead-presence-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  margin-top: 4px;\n  width: fit-content;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 600;\n  color: #1d4ed8;\n  background: rgba(59, 130, 246, 0.12);\n}\n\n.lead-score-gauge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  border-radius: 16px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.82));\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.06);\n}\n\n.lead-card-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 10px;\n}\n\n.lead-related[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 10px;\n}\n\n.lead-related-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: $gray-400;\n}\n\n.lead-related-links[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n\n.lead-related-link[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: color.adjust($primary, $lightness: -10%);\n  background: rgba($primary, 0.12);\n  border: 1px solid rgba($primary, 0.2);\n  padding: 3px 10px;\n  border-radius: 999px;\n  text-decoration: none;\n  transition: all 0.2s ease;\n}\n\n.lead-related-link[_ngcontent-%COMP%]:hover {\n  background: rgba($primary, 0.2);\n  border-color: rgba($primary, 0.35);\n  color: color.adjust($primary, $lightness: -20%);\n}\n\n.lead-disposition[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin-top: 6px;\n}\n\n.lead-disposition__label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: $gray-400;\n}\n\n.lead-disposition__value[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: $gray-600;\n}\n\n.lead-detail[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 12px;\n  color: $gray-500;\n\n  i {\n    font-size: 12px;\n    color: $gray-400;\n    width: 14px;\n  }\n\n  span {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n}\n\n.lead-epistemic[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 6px;\n}\n\n.epistemic-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 3px 8px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 600;\n  border: 1px solid transparent;\n  background: rgba($gray-100, 0.9);\n  color: $gray-600;\n}\n\n.epistemic-chip.truth[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.12);\n  border-color: rgba(16, 185, 129, 0.2);\n  color: #047857;\n}\n\n.epistemic-chip.weakest[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.12);\n  border-color: rgba(245, 158, 11, 0.2);\n  color: #b45309;\n}\n\n.epistemic-chip.confidence[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.12);\n  border-color: rgba(59, 130, 246, 0.2);\n  color: #1d4ed8;\n}\n\n.lead-card-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: 10px;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.lead-owner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: $gray-500;\n\n  i {\n    font-size: 11px;\n  }\n}\n\n.lead-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n\n.mini-btn[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: 6px;\n  color: $gray-500;\n  cursor: pointer;\n  font-size: 12px;\n  transition: all 0.15s ease;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.08);\n    color: $gray-700;\n  }\n\n  &.danger:hover {\n    background: rgba($status-lost, 0.1);\n    color: $status-lost;\n  }\n\n  &.success:hover {\n    background: rgba($status-converted, 0.12);\n    color: $status-converted;\n  }\n\n  &.info:hover {\n    background: rgba($primary, 0.12);\n    color: $primary;\n  }\n}\n\n.column-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: $gray-400;\n\n  i {\n    font-size: 24px;\n    margin-bottom: 8px;\n  }\n\n  span {\n    font-size: 13px;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DATA[_ngcontent-%COMP%]   TABLE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.data-table-section[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n\n.table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n\n.leads-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n\n  th, td {\n    padding: 12px 16px;\n    text-align: left;\n    white-space: nowrap;\n  }\n\n  thead th {\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n  }\n\n  .th-checkbox, .td-checkbox {\n    width: 48px;\n    padding-left: 20px;\n  }\n\n  .th-lead { min-width: 220px; }\n  .th-status { width: 120px; }\n  .th-contact { min-width: 200px; }\n  .th-score { width: 140px; }\n  .th-owner { width: 150px; }\n  .th-actions { width: 100px; }\n}\n\n.leads-table.leads-table--compact[_ngcontent-%COMP%] {\n  th, td {\n    padding: 10px 12px;\n    font-size: 12px;\n  }\n\n  thead th {\n    font-size: 0.68rem;\n    letter-spacing: 0.07em;\n  }\n\n  .th-checkbox, .td-checkbox {\n    width: 44px;\n    padding-left: 14px;\n  }\n\n  .th-lead { min-width: 200px; }\n  .th-status { width: 110px; }\n  .th-contact { min-width: 180px; }\n  .th-score { width: 120px; }\n  .th-owner { width: 130px; }\n  .th-actions { width: 92px; }\n\n  .lead-cell {\n    gap: 10px;\n\n    .avatar {\n      width: 34px;\n      height: 34px;\n      border-radius: 9px;\n      font-size: 13px;\n    }\n\n    .lead-info {\n      .name {\n        font-size: 13px;\n      }\n\n      .company {\n        font-size: 11px;\n      }\n    }\n  }\n\n  .cqvs-pill {\n    width: 20px;\n    height: 20px;\n    border-radius: 7px;\n    font-size: 11px;\n  }\n}\n\n.checkbox[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  border-radius: 5px;\n  border: 2px solid $gray-300;\n  cursor: pointer;\n  accent-color: $status-qualified;\n}\n\n.table-row[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  transition: background 0.15s ease;\n\n  &:hover {\n    background: rgba($status-qualified, 0.03);\n  }\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  &.highlight {\n    background: rgba($status-new, 0.04);\n  }\n}\n\n.lead-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n\n  .avatar {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    color: white;\n    flex-shrink: 0;\n    overflow: hidden;\n\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      border-radius: inherit;\n    }\n\n    &[data-status=\"New\"] { background: linear-gradient(135deg, $status-new 0%, color.adjust($status-new, $lightness: -10%) 100%); }\n    &[data-status=\"Contacted\"] { background: linear-gradient(135deg, $status-contacted 0%, color.adjust($status-contacted, $lightness: -10%) 100%); }\n    &[data-status=\"Qualified\"] { background: linear-gradient(135deg, $status-qualified 0%, color.adjust($status-qualified, $lightness: -10%) 100%); }\n    &[data-status=\"Converted\"] { background: linear-gradient(135deg, $status-converted 0%, color.adjust($status-converted, $lightness: -10%) 100%); }\n    &[data-status=\"Lost\"] { background: linear-gradient(135deg, $status-lost 0%, color.adjust($status-lost, $lightness: -10%) 100%); }\n}\n\n.cqvs-pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 800;\n  color: #0f172a;\n  background: linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(99, 102, 241, 0.22) 100%);\n  border: 1px solid rgba(99, 102, 241, 0.25);\n}\n\n// Drawer is rendered in an overlay appended to <body>, so selectors must be truly global.\n::ng-deep .lead-coach-drawer {\n  width: min(440px, 92vw);\n}\n\n// PrimeNG may apply `styleClass` to the drawer root, not a wrapper.\n::ng-deep .lead-coach-drawer.p-drawer,\n::ng-deep .lead-coach-drawer .p-drawer {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border-left: 1px solid rgba(148, 163, 184, 0.28);\n  box-shadow: $glass-shadow-lg;\n}\n\n::ng-deep .p-drawer-mask {\n  // Keep focus on the drawer without making the surface feel \"dark mode\".\n  background: rgba(2, 6, 23, 0.04);\n}\n\n::ng-deep .lead-coach-drawer .p-drawer-header {\n  padding: 14px 16px;\n  background:\n    radial-gradient(800px 220px at 15% 0%, rgba(34, 211, 238, 0.22) 0%, transparent 60%),\n    radial-gradient(700px 240px at 90% 20%, rgba(99, 102, 241, 0.22) 0%, transparent 55%),\n    linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.6) 100%);\n  border-bottom: 1px solid rgba(148, 163, 184, 0.22);\n}\n\n::ng-deep .lead-coach-drawer .p-drawer-content {\n  padding: 14px 16px 14px;\n  background:\n    radial-gradient(900px 380px at 20% 0%, rgba(34, 211, 238, 0.08) 0%, transparent 55%),\n    radial-gradient(900px 420px at 90% 45%, rgba(99, 102, 241, 0.08) 0%, transparent 60%),\n    linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.86) 100%);\n\n  // Ensure the sticky footer doesn't cover the last section.\n  padding-bottom: 82px;\n}\n\n::ng-deep .lead-coach-drawer .p-drawer-close-button {\n  width: 38px;\n  height: 38px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  transition: transform $transition-fast, box-shadow $transition-fast, background $transition-fast;\n}\n\n::ng-deep .lead-coach-drawer .p-drawer-close-button:hover {\n  transform: translateY(-1px);\n  background: rgba(255, 255, 255, 0.9);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);\n}\n\n::ng-deep .lead-coach-drawer {\n  // NOTE: Angular removes template whitespace by default. When the drawer renders outside\n  // the component tree (overlay appended to body), scoped styles can miss. Keep all coach\n  // UI styles under the drawer class to ensure they always apply.\n\n  .coach-title {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n  }\n\n  .coach-title__top {\n    display: flex;\n    align-items: flex-start;\n    gap: 12px;\n  }\n\n  .coach-title__badge {\n    width: 42px;\n    height: 42px;\n    border-radius: 14px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    color: #0f172a;\n    background: linear-gradient(135deg, rgba(34, 211, 238, 0.24) 0%, rgba(99, 102, 241, 0.22) 100%);\n    border: 1px solid rgba(99, 102, 241, 0.25);\n    box-shadow: 0 12px 28px rgba(99, 102, 241, 0.16);\n\n    i {\n      font-size: 18px;\n      font-weight: 800;\n    }\n  }\n\n  .coach-title__meta {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    min-width: 0;\n    flex: 1;\n  }\n\n  .coach-title__row {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n  }\n\n  .coach-title__label {\n    font-size: 12px;\n    font-weight: 800;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: $gray-500;\n  }\n\n  .coach-title__name {\n    font-size: 15px;\n    font-weight: 900;\n    color: $gray-900;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    max-width: 320px;\n  }\n\n  .coach-title__chips {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n\n  .coach-chip {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 6px 10px;\n    border-radius: 999px;\n    font-size: 11px;\n    font-weight: 800;\n    border: 1px solid rgba(148, 163, 184, 0.28);\n    background: rgba(255, 255, 255, 0.7);\n    color: #0f172a;\n    white-space: nowrap;\n  }\n\n  .coach-chip--muted {\n    font-weight: 700;\n    color: $gray-700;\n  }\n\n  .coach-chip--signal[data-tone=\"healthy\"] {\n    border-color: rgba(16, 185, 129, 0.32);\n    background: rgba(16, 185, 129, 0.10);\n    color: #065f46;\n  }\n\n  .coach-chip--signal[data-tone=\"risk\"] {\n    border-color: rgba(239, 68, 68, 0.32);\n    background: rgba(239, 68, 68, 0.10);\n    color: #991b1b;\n  }\n\n  .coach-chip--signal[data-tone=\"weak\"] {\n    border-color: rgba(245, 158, 11, 0.32);\n    background: rgba(245, 158, 11, 0.12);\n    color: #92400e;\n  }\n\n  .coach-chip--signal[data-tone=\"neutral\"] {\n    border-color: rgba(148, 163, 184, 0.28);\n    background: rgba(241, 245, 249, 0.88);\n    color: #334155;\n  }\n\n  .coach-chip[data-status=\"New\"] { border-color: rgba(6, 182, 212, 0.35); background: rgba(6, 182, 212, 0.10); }\n  .coach-chip[data-status=\"Contacted\"] { border-color: rgba(245, 158, 11, 0.35); background: rgba(245, 158, 11, 0.10); }\n  .coach-chip[data-status=\"Nurture\"] { border-color: rgba(245, 158, 11, 0.35); background: rgba(245, 158, 11, 0.10); }\n  .coach-chip[data-status=\"Qualified\"] { border-color: rgba(16, 185, 129, 0.35); background: rgba(16, 185, 129, 0.10); }\n  .coach-chip[data-status=\"Converted\"] { border-color: rgba(99, 102, 241, 0.35); background: rgba(99, 102, 241, 0.10); }\n  .coach-chip[data-status=\"Lost\"] { border-color: rgba(239, 68, 68, 0.35); background: rgba(239, 68, 68, 0.10); }\n  .coach-chip[data-status=\"Disqualified\"] { border-color: rgba(239, 68, 68, 0.35); background: rgba(239, 68, 68, 0.10); }\n\n  .coach-body {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n  }\n\n  // KPI row: always 3-up on desktop drawer widths, collapses to 1 column on mobile.\n  .coach-kpis {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    gap: 12px;\n  }\n\n  .coach-kpi {\n    border: 1px solid rgba(148, 163, 184, 0.28);\n    background: rgba(255, 255, 255, 0.75);\n    border-radius: 14px;\n    padding: 10px 12px;\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);\n    position: relative;\n    overflow: hidden;\n    transition: transform $transition-fast, box-shadow $transition-fast;\n  }\n\n  .coach-kpi::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background:\n      radial-gradient(240px 80px at 10% 0%, rgba(34, 211, 238, 0.18) 0%, transparent 60%),\n      radial-gradient(220px 90px at 95% 20%, rgba(99, 102, 241, 0.16) 0%, transparent 55%);\n    pointer-events: none;\n  }\n\n  .coach-kpi:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 18px 36px rgba(15, 23, 42, 0.10);\n  }\n\n  .kpi-label {\n    display: block;\n    font-size: 11px;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    color: $gray-500;\n    margin-bottom: 4px;\n    position: relative;\n  }\n\n  .kpi-value {\n    font-size: 20px;\n    font-weight: 950;\n    color: $gray-900;\n    position: relative;\n  }\n\n  .kpi-sub {\n    font-size: 12px;\n    font-weight: 800;\n    color: $gray-500;\n    margin-left: 4px;\n    position: relative;\n  }\n\n  .coach-block {\n    border: 1px solid rgba(148, 163, 184, 0.22);\n    background: rgba(255, 255, 255, 0.68);\n    border-radius: 16px;\n    padding: 12px;\n    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.05);\n  }\n\n  .coach-block__title {\n    font-size: 12px;\n    font-weight: 900;\n    color: $gray-800;\n    margin: 0 0 10px;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n  }\n\n  .coach-signal-strip {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n    margin-bottom: 12px;\n  }\n\n  .coach-next-action {\n    border: 1px solid rgba(59, 130, 246, 0.18);\n    background: linear-gradient(135deg, rgba(239, 246, 255, 0.9) 0%, rgba(255, 255, 255, 0.88) 100%);\n    border-radius: 14px;\n    padding: 12px;\n  }\n\n  .coach-next-action__label {\n    display: block;\n    margin-bottom: 6px;\n    font-size: 11px;\n    font-weight: 900;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: #1d4ed8;\n  }\n\n  .coach-next-action p {\n    margin: 0;\n    font-size: 13px;\n    line-height: 1.45;\n    color: $gray-800;\n  }\n\n  .coach-hint {\n    margin: 0;\n    font-size: 12px;\n    color: $gray-500;\n  }\n\n  .cqvs-grid {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n\n  .cqvs-card {\n    --cqvs-accent: #3b82f6;\n    --cqvs-accent-weak: rgba(59, 130, 246, 0.14);\n    border: 1px solid rgba(148, 163, 184, 0.22);\n    background: rgba(255, 255, 255, 0.72);\n    border-radius: 14px;\n    padding: 10px 10px 12px;\n    transition: transform $transition-fast, box-shadow $transition-fast, border-color $transition-fast;\n  }\n\n  .cqvs-card:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 16px 30px rgba(15, 23, 42, 0.08);\n    border-color: rgba(59, 130, 246, 0.25);\n  }\n\n  .cqvs-card[data-cqvs=\"C\"] { --cqvs-accent: #06b6d4; --cqvs-accent-weak: rgba(6, 182, 212, 0.16); }\n  .cqvs-card[data-cqvs=\"Q\"] { --cqvs-accent: #10b981; --cqvs-accent-weak: rgba(16, 185, 129, 0.16); }\n  .cqvs-card[data-cqvs=\"V\"] { --cqvs-accent: #f59e0b; --cqvs-accent-weak: rgba(245, 158, 11, 0.18); }\n  .cqvs-card[data-cqvs=\"S\"] { --cqvs-accent: #6366f1; --cqvs-accent-weak: rgba(99, 102, 241, 0.16); }\n\n  .cqvs-card__head {\n    display: grid;\n    grid-template-columns: 28px 1fr auto;\n    align-items: center;\n    gap: 10px;\n    margin-bottom: 8px;\n  }\n\n  .cqvs-code {\n    width: 26px;\n    height: 26px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 9px;\n    font-size: 12px;\n    font-weight: 950;\n    color: #0f172a;\n    background: var(--cqvs-accent-weak);\n    border: 1px solid rgba(148, 163, 184, 0.25);\n  }\n\n  .cqvs-title {\n    font-size: 12.5px;\n    font-weight: 900;\n    color: $gray-800;\n  }\n\n  .cqvs-score {\n    font-size: 12px;\n    font-weight: 900;\n    color: $gray-600;\n  }\n\n  .cqvs-bar {\n    height: 8px;\n    background: rgba(148, 163, 184, 0.22);\n    border-radius: 999px;\n    overflow: hidden;\n  }\n\n  .cqvs-bar__fill {\n    display: block;\n    height: 100%;\n    background: linear-gradient(90deg, var(--cqvs-accent) 0%, rgba(255, 255, 255, 0.15) 120%);\n    border-radius: inherit;\n  }\n\n  .weakest-row {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n\n  .weakest-row__text {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    min-width: 0;\n    flex: 1;\n  }\n\n  .weakest-row__top {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n    min-width: 0;\n  }\n\n  .weakest-row__top strong {\n    font-size: 13px;\n    font-weight: 950;\n    color: $gray-900;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .state-pill {\n    flex: 0 0 auto;\n    display: inline-flex;\n    align-items: center;\n    padding: 4px 10px;\n    border-radius: 999px;\n    font-size: 11px;\n    font-weight: 900;\n    letter-spacing: 0.02em;\n    border: 1px solid rgba(148, 163, 184, 0.28);\n    background: rgba(255, 255, 255, 0.7);\n    color: $gray-700;\n    text-transform: capitalize;\n  }\n\n  .coach-list {\n    margin: 0;\n    padding-left: 16px;\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n\n    li {\n      font-size: 12px;\n      color: $gray-700;\n      line-height: 1.25;\n    }\n  }\n\n  .coach-list--flags li {\n    font-weight: 800;\n  }\n\n  .coach-footer {\n    position: sticky;\n    bottom: -14px; // counteracts drawer content padding so footer sits flush\n    margin: 2px -16px -14px;\n    padding: 12px 16px 14px;\n    background:\n      linear-gradient(180deg, rgba(248, 250, 252, 0.15) 0%, rgba(248, 250, 252, 0.85) 28%, rgba(255, 255, 255, 0.92) 100%);\n    border-top: 1px solid rgba(148, 163, 184, 0.22);\n    backdrop-filter: blur($glass-blur);\n  }\n\n  .coach-actions {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 12px;\n  }\n\n  .coach-action-btn.p-button {\n    width: 100%;\n    height: 44px;\n    border-radius: 14px;\n    justify-content: center;\n    gap: 10px;\n    font-weight: 800;\n    border: 1px solid rgba(99, 102, 241, 0.25);\n    background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(248, 250, 252, 0.6) 100%);\n    color: #0f172a;\n    transition: transform $transition-fast, box-shadow $transition-fast, background $transition-fast, border-color $transition-fast;\n  }\n\n  .coach-action-btn.p-button:hover {\n    transform: translateY(-1px);\n    background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.75) 100%);\n    border-color: rgba(99, 102, 241, 0.4);\n    box-shadow: 0 12px 24px rgba(99, 102, 241, 0.16);\n  }\n\n  .coach-action-btn--convert.p-button {\n    border-color: rgba(16, 185, 129, 0.28);\n  }\n\n  .coach-action-btn--compose.p-button {\n    border-color: rgba(59, 130, 246, 0.26);\n  }\n\n  // Ensure the sticky footer doesn't cover the last section.\n  .p-drawer-content {\n    padding-bottom: 82px;\n  }\n\n  @media (max-width: 520px) {\n    width: 96vw;\n\n    .coach-title__name {\n      max-width: 220px;\n    }\n\n    .kpi-value {\n      font-size: 18px;\n    }\n\n    .coach-kpis {\n      grid-template-columns: 1fr;\n    }\n\n    .coach-actions {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n@media (max-width: 520px) {\n  -shadowcsshost-no-combinator ::ng-deep .lead-coach-drawer {\n    width: 96vw;\n  }\n\n  .coach-title__name {\n    max-width: 220px;\n  }\n\n  .kpi-value {\n    font-size: 18px;\n  }\n\n  .coach-kpis {\n    grid-template-columns: 1fr;\n  }\n\n  .coach-actions {\n    grid-template-columns: 1fr;\n  }\n}\n\n  .lead-info {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n\n    .name {\n      font-size: 14px;\n      font-weight: 600;\n      color: $gray-800;\n    }\n\n    .company {\n      font-size: 12px;\n      color: $gray-500;\n    }\n  }\n\n  .lead-sla {\n    margin-top: 4px;\n  }\n\n  .sla-chip {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    padding: 4px 9px;\n    border-radius: 999px;\n    font-size: 11px;\n    font-weight: 600;\n    border: 1px solid rgba(148, 163, 184, 0.4);\n    background: rgba(248, 250, 252, 0.9);\n    color: #475569;\n\n    i {\n      font-size: 11px;\n    }\n  }\n\n  .sla-chip.overdue {\n    background: rgba(239, 68, 68, 0.12);\n    color: #b91c1c;\n    border-color: rgba(239, 68, 68, 0.3);\n  }\n\n  .sla-chip.due {\n    background: rgba(245, 158, 11, 0.12);\n    color: #b45309;\n    border-color: rgba(245, 158, 11, 0.3);\n  }\n\n  .sla-chip.done {\n    background: rgba(34, 197, 94, 0.12);\n    color: #15803d;\n    border-color: rgba(34, 197, 94, 0.3);\n  }\n\n  .sla-chip.pending {\n    background: rgba(148, 163, 184, 0.12);\n    color: #475569;\n    border-color: rgba(148, 163, 184, 0.3);\n  }\n}\n\n.status-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 5px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n\n  &[data-status=\"New\"] {\n    background: rgba($status-new, 0.12);\n    color: color.adjust($status-new, $lightness: -15%);\n  }\n\n  &[data-status=\"Contacted\"] {\n    background: rgba($status-contacted, 0.12);\n    color: color.adjust($status-contacted, $lightness: -10%);\n  }\n\n  &[data-status=\"Qualified\"] {\n    background: rgba($status-qualified, 0.12);\n    color: color.adjust($status-qualified, $lightness: -15%);\n  }\n\n  &[data-status=\"Converted\"] {\n    background: rgba($status-converted, 0.12);\n    color: color.adjust($status-converted, $lightness: -10%);\n  }\n\n  &[data-status=\"Lost\"] {\n    background: rgba($status-lost, 0.12);\n    color: color.adjust($status-lost, $lightness: -10%);\n  }\n}\n\n.contact-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n\n  .contact-link {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    font-size: 13px;\n    color: $gray-700;\n    text-decoration: none;\n    transition: color 0.15s ease;\n\n    i {\n      font-size: 12px;\n      color: $gray-400;\n    }\n\n    &:hover {\n      color: $status-qualified;\n    }\n  }\n\n  .contact-secondary {\n    font-size: 12px;\n    color: $gray-400;\n    padding-left: 18px;\n  }\n}\n\n.score-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n[_nghost-%COMP%]     .lead-score-gauge__knob {\n  .p-knob-text {\n    font-size: 0.9rem;\n    font-weight: 900;\n    fill: #0f172a;\n  }\n}\n\n[_nghost-%COMP%]     .lead-score-gauge__knob--table {\n  .p-knob-text {\n    font-size: 0.86rem;\n  }\n}\n\n.owner-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n\n  .owner-avatar {\n    width: 28px;\n    height: 28px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: linear-gradient(135deg, $gray-200 0%, $gray-300 100%);\n    color: $gray-600;\n    border-radius: 50%;\n    font-size: 11px;\n    font-weight: 600;\n  }\n\n  .owner-name {\n    font-size: 13px;\n    color: $gray-700;\n  }\n}\n\n.toast-notification[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border-radius: 14px;\n  background: #0f172a;\n  color: #f8fafc;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.25);\n  z-index: 50;\n  animation: _ngcontent-%COMP%_toast-in 0.3s ease-out;\n\n  i {\n    font-size: 18px;\n  }\n\n  &.toast--success {\n    background: rgba(15, 118, 110, 0.95);\n  }\n\n  &.toast--error {\n    background: rgba(190, 24, 93, 0.95);\n  }\n}\n\n.toast-close[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  color: inherit;\n  cursor: pointer;\n  margin-left: auto;\n}\n\n@keyframes _ngcontent-%COMP%_toast-in {\n  from {\n    transform: translateY(12px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   TABLE[_ngcontent-%COMP%]   FOOTER\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.table-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.pagination-info[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: $gray-500;\n\n  strong {\n    color: $gray-700;\n  }\n}\n\n  .custom-paginator {\n  .p-paginator {\n    background: transparent;\n    border: none;\n    padding: 0;\n    gap: 4px;\n  }\n\n  .p-paginator-page,\n  .p-paginator-prev,\n  .p-paginator-next,\n  .p-paginator-first,\n  .p-paginator-last {\n    min-width: 32px;\n    height: 32px;\n    border-radius: 8px;\n    font-size: 13px;\n    transition: all 0.15s ease;\n\n    &:hover:not(.p-disabled) {\n      background: rgba(0, 0, 0, 0.06);\n    }\n\n    &.p-paginator-page-selected {\n      background: $status-qualified;\n      color: white;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   LOADING[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   EMPTY[_ngcontent-%COMP%]   STATES\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.skeleton-table[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n}\n\n.skeleton[_ngcontent-%COMP%] {\n  background: linear-gradient(90deg, $gray-100 25%, $gray-50 50%, $gray-100 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n  border-radius: 6px;\n\n  &-checkbox { width: 18px; height: 18px; border-radius: 4px; }\n  &-avatar { width: 38px; height: 38px; border-radius: 10px; }\n  &-text {\n    height: 14px;\n    &.long { width: 160px; }\n    &.medium { width: 120px; }\n    &.short { width: 80px; }\n  }\n  &-badge { width: 80px; height: 26px; border-radius: 13px; }\n  &-bar { width: 70px; height: 6px; }\n  &-actions { width: 68px; height: 32px; }\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 40px;\n  text-align: center;\n\n  .empty-illustration {\n    width: 80px;\n    height: 80px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: linear-gradient(135deg, rgba($status-new, 0.1) 0%, rgba($status-qualified, 0.1) 100%);\n    border-radius: 20px;\n    margin-bottom: 20px;\n\n    i {\n      font-size: 32px;\n      background: linear-gradient(135deg, $status-new 0%, $status-qualified 100%);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n  }\n\n  h3 {\n    font-size: 18px;\n    font-weight: 600;\n    color: $gray-800;\n    margin: 0 0 8px;\n  }\n\n  p {\n    font-size: 14px;\n    color: $gray-500;\n    margin: 0 0 24px;\n    max-width: 300px;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DIALOG[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   FORM\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.lead-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 16px;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n\n  label {\n    font-size: 13px;\n    font-weight: 500;\n    color: $gray-700;\n\n    .required {\n      color: $status-lost;\n    }\n  }\n\n  input {\n    padding: 10px 14px;\n    border: 1px solid rgba(0, 0, 0, 0.12);\n    border-radius: 10px;\n    font-size: 14px;\n    color: $gray-800;\n    transition: all 0.15s ease;\n\n    &::placeholder {\n      color: $gray-400;\n    }\n\n    &:focus {\n      outline: none;\n      border-color: $status-qualified;\n      box-shadow: 0 0 0 3px rgba($status-qualified, 0.1);\n    }\n  }\n}\n\n  .form-select {\n  .p-select {\n    border-radius: 10px;\n    border-color: rgba(0, 0, 0, 0.12);\n\n    &:hover {\n      border-color: rgba(0, 0, 0, 0.2);\n    }\n\n    &.p-focus {\n      border-color: $status-qualified;\n      box-shadow: 0 0 0 3px rgba($status-qualified, 0.1);\n    }\n  }\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding-top: 16px;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   RESPONSIVE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 768px) {\n  .page-container {\n    padding: 16px;\n  }\n\n  .page-header {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .header-right {\n    justify-content: flex-start;\n    flex-wrap: wrap;\n  }\n\n  .kpi-strip {\n    padding: 12px;\n    gap: 4px;\n  }\n\n  .kpi-divider {\n    display: none;\n  }\n\n  .action-bar {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .search-box {\n    max-width: 100%;\n  }\n\n  .quick-filters {\n    justify-content: center;\n  }\n\n  .hero-section {\n    gap: $space-3;\n  }\n\n  .hero-visual {\n    flex-direction: row;\n    overflow-x: auto;\n    gap: $space-2;\n    padding-bottom: $space-1;\n  }\n\n  .visual-card {\n    min-width: 160px;\n    padding: $space-2 $space-3;\n\n    .card-icon {\n      width: 32px;\n      height: 32px;\n      font-size: $font-size-base;\n    }\n\n    .card-value {\n      font-size: $font-size-lg;\n    }\n\n    .card-label {\n      font-size: 0.6875rem;\n    }\n  }\n\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n\n  // Allow the table to scroll horizontally on narrow screens.\n  .table-container {\n    overflow-x: auto;\n  }\n\n  .leads-table {\n    min-width: 520px;\n\n    // Hide lower-priority columns on mobile\n    .th-contact, .td-contact,\n    .th-owner, .td-owner {\n      display: none;\n    }\n\n    thead th {\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n\n    .th-lead { min-width: 160px; }\n    .th-score { width: 100px; }\n    .th-actions { width: 80px; }\n  }\n}\n\n//   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//   DARK   MODE\n//   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.dark-theme[_nghost-%COMP%], .dark-theme   [_nghost-%COMP%] {\n  .page-background {\n    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);\n  }\n\n  .animated-orb {\n    opacity: 0.2;\n  }\n\n  .grid-pattern {\n    background-image:\n      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),\n      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);\n  }\n\n  .page-title {\n    .title-count {\n      background: rgba(255, 255, 255, 0.08);\n      color: rgba(255, 255, 255, 0.6);\n    }\n  }\n\n  .breadcrumb {\n    color: rgba(255, 255, 255, 0.4);\n\n    .breadcrumb-current {\n      color: rgba(255, 255, 255, 0.8);\n    }\n  }\n\n  .view-toggle {\n    background: rgba(255, 255, 255, 0.06);\n\n    .toggle-btn {\n      color: rgba(255, 255, 255, 0.5);\n\n      &:hover {\n        color: rgba(255, 255, 255, 0.8);\n      }\n\n      &.active {\n        background: rgba(255, 255, 255, 0.1);\n        color: white;\n      }\n    }\n  }\n\n  .btn-icon {\n    background: rgba(255, 255, 255, 0.06);\n    border-color: rgba(255, 255, 255, 0.08);\n    color: rgba(255, 255, 255, 0.7);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.1);\n    }\n  }\n\n  .kpi-strip,\n  .glass-card,\n  .data-table-section {\n    background: rgba(30, 41, 59, 0.8);\n    border-color: rgba(255, 255, 255, 0.06);\n  }\n\n  .kpi-value {\n    color: white;\n  }\n\n  .kpi-label {\n    color: rgba(255, 255, 255, 0.5);\n  }\n\n  .kpi-divider {\n    background: rgba(255, 255, 255, 0.08);\n  }\n\n  .kpi-card.clickable:hover {\n    background: rgba(255, 255, 255, 0.04);\n  }\n\n  .search-box input {\n    background: rgba(255, 255, 255, 0.06);\n    border-color: rgba(255, 255, 255, 0.08);\n    color: white;\n\n    &::placeholder {\n      color: rgba(255, 255, 255, 0.4);\n    }\n  }\n\n  .filter-chip {\n    border-color: rgba(255, 255, 255, 0.1);\n    color: rgba(255, 255, 255, 0.7);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.06);\n    }\n  }\n\n  .kanban-column {\n    background: rgba(255, 255, 255, 0.03);\n  }\n\n  .column-header .column-count {\n    background: rgba(255, 255, 255, 0.08);\n    color: rgba(255, 255, 255, 0.7);\n  }\n\n  .lead-card {\n    background: rgba(30, 41, 59, 0.9);\n    border-color: rgba(255, 255, 255, 0.06);\n\n    &:hover {\n      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n    }\n  }\n\n  .lead-meta .lead-name {\n    color: white;\n  }\n\n  .lead-meta .lead-company,\n  .lead-detail,\n  .lead-owner {\n    color: rgba(255, 255, 255, 0.5);\n  }\n\n  .epistemic-chip {\n    background: rgba(255, 255, 255, 0.08);\n    color: rgba(255, 255, 255, 0.7);\n    border-color: rgba(255, 255, 255, 0.12);\n  }\n\n  .epistemic-chip.truth {\n    background: rgba(16, 185, 129, 0.2);\n    border-color: rgba(16, 185, 129, 0.25);\n    color: #6ee7b7;\n  }\n\n  .epistemic-chip.weakest {\n    background: rgba(245, 158, 11, 0.2);\n    border-color: rgba(245, 158, 11, 0.25);\n    color: #fcd34d;\n  }\n\n  .epistemic-chip.confidence {\n    background: rgba(96, 165, 250, 0.25);\n    border-color: rgba(96, 165, 250, 0.32);\n    color: #bfdbfe;\n  }\n\n  .leads-table {\n    thead th {\n      background: rgba(0, 0, 0, 0.2);\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .table-row:hover {\n    background: rgba($status-qualified, 0.08);\n  }\n\n  .lead-cell .lead-info .name {\n    color: white;\n  }\n\n  .lead-cell .lead-info .company {\n    color: rgba(255, 255, 255, 0.5);\n  }\n\n  .contact-cell .contact-link {\n    color: rgba(255, 255, 255, 0.8);\n  }\n\n  .contact-cell .contact-secondary {\n    color: rgba(255, 255, 255, 0.4);\n  }\n\n  .lead-score-gauge {\n    background: linear-gradient(180deg, rgba(30, 41, 59, 0.72), rgba(15, 23, 42, 0.66));\n    border-color: rgba(148, 163, 184, 0.18);\n  }\n\n  .owner-cell .owner-name {\n    color: rgba(255, 255, 255, 0.8);\n  }\n\n  .pagination-info {\n    color: rgba(255, 255, 255, 0.5);\n\n    strong {\n      color: rgba(255, 255, 255, 0.8);\n    }\n  }\n\n  .empty-state {\n    h3 {\n      color: white;\n    }\n\n    p {\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .skeleton {\n    background: linear-gradient(90deg, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.05) 75%);\n  }\n\n  .import-dialog {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n\n    .import-note {\n      margin: 0;\n      color: rgba(255, 255, 255, 0.6);\n    }\n\n    .import-upload {\n      border: 1px dashed rgba(255, 255, 255, 0.25);\n      border-radius: 12px;\n      padding: 16px;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 12px;\n      cursor: pointer;\n      background: rgba(255, 255, 255, 0.04);\n\n      input {\n        display: none;\n      }\n\n      span {\n        font-weight: 600;\n        color: white;\n      }\n    }\n\n    .import-actions {\n      display: flex;\n      justify-content: flex-end;\n      gap: 12px;\n    }\n\n    .import-error {\n      color: #fca5a5;\n      font-weight: 600;\n    }\n\n    .import-result {\n      background: rgba(15, 23, 42, 0.35);\n      border-radius: 12px;\n      padding: 12px 14px;\n      border: 1px solid rgba(255, 255, 255, 0.08);\n\n      .import-metrics {\n        display: flex;\n        gap: 16px;\n        font-weight: 600;\n        color: white;\n      }\n\n      .import-errors {\n        margin-top: 8px;\n        color: rgba(255, 255, 255, 0.65);\n\n        ul {\n          margin: 6px 0 0;\n          padding-left: 18px;\n        }\n      }\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LeadsPage, [{
        type: Component,
        args: [{ selector: 'app-leads-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    NgClass,
                    DatePipe,
                    FormsModule,
                    ButtonModule,
                    CheckboxModule,
                    FileUploadModule,
                    InputTextModule,
                    SelectModule,
                    TableModule,
                    PaginatorModule,
                    DialogModule,
                    TooltipModule,
                    DrawerModule,
                    KnobModule,
                    BreadcrumbsComponent,
                    BulkActionsBarComponent,
                    RouterLink,
                    LeadImportWizardComponent
                ], template: "<div class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n  <div class=\"grid-pattern\"></div>\n</div>\n\n<div class=\"page-container\">\n  <div class=\"page-content\">\n    <!-- PrimeNG Breadcrumb -->\n    <app-breadcrumbs></app-breadcrumbs>\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n         HERO SECTION\n         \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    <section class=\"hero-section\">\n      <div class=\"hero-content\">\n        <div class=\"hero-badge\">\n          <span class=\"badge-dot\"></span>\n          <span>Lead Intelligence Hub</span>\n        </div>\n\n        <h1 class=\"hero-title\">\n          <span class=\"title-gradient\">Leads</span>\n          <span class=\"title-light\">Workspace</span>\n        </h1>\n\n        <p class=\"hero-description\">\n          Track, qualify, and convert leads with AI-powered scoring and conversation intelligence\n        </p>\n\n        <div class=\"hero-stats\">\n          <div class=\"hero-stat\">\n            <div class=\"stat-value\">{{ metrics().total || 0 }}</div>\n            <div class=\"stat-label\">Total Leads</div>\n            <div class=\"stat-bar\">\n              <div class=\"stat-bar-fill\" style=\"width: 100%\"></div>\n            </div>\n          </div>\n          <div class=\"hero-stat\">\n            <div class=\"stat-value\">{{ metrics().newLeads }}</div>\n            <div class=\"stat-label\">New Leads</div>\n            <div class=\"stat-bar\">\n              <div class=\"stat-bar-fill stat-bar-fill--leads\" [style.width.%]=\"metrics().total ? (metrics().newLeads / metrics().total) * 100 : 0\"></div>\n            </div>\n          </div>\n          <div class=\"hero-stat\">\n            <div class=\"stat-value\">{{ metrics().qualified }}</div>\n            <div class=\"stat-label\">Qualified</div>\n            <div class=\"stat-bar\">\n              <div class=\"stat-bar-fill stat-bar-fill--prospects\" [style.width.%]=\"metrics().total ? (metrics().qualified / metrics().total) * 100 : 0\"></div>\n            </div>\n          </div>\n          <div class=\"hero-stat\">\n            <div class=\"stat-value\">{{ metrics().converted }}</div>\n            <div class=\"stat-label\">Converted</div>\n            <div class=\"stat-bar\">\n              <div class=\"stat-bar-fill stat-bar-fill--success\" [style.width.%]=\"metrics().total ? (metrics().converted / metrics().total) * 100 : 0\"></div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"hero-actions\">\n          <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"!canManage()\" (click)=\"onCreate()\" aria-label=\"Add new lead\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n            <span>Add Lead</span>\n          </button>\n          <button type=\"button\" class=\"action-btn action-btn--import\" [disabled]=\"!canManage()\" (click)=\"openImport()\" aria-label=\"Import leads\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-upload\"></i></span>\n            <span>Import</span>\n          </button>\n          <button type=\"button\" class=\"action-btn action-btn--refresh\" (click)=\"load()\" aria-label=\"Refresh leads\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n            <span>Refresh</span>\n          </button>\n        </div>\n      </div>\n\n      <div class=\"hero-visual\">\n        <div class=\"visual-card visual-card--primary\">\n          <div class=\"card-icon\">\n            <i class=\"pi pi-trophy\"></i>\n          </div>\n          <div class=\"card-content\">\n            <span class=\"card-label\">Win Rate</span>\n            <strong class=\"card-value\">{{ conversionRate() }}%</strong>\n            <span class=\"card-trend card-trend--up\">\n              <i class=\"pi pi-arrow-up\"></i> Conversion rate\n            </span>\n          </div>\n          <div class=\"card-glow\"></div>\n        </div>\n\n        <div class=\"visual-card visual-card--secondary\">\n          <div class=\"card-icon\">\n            <i class=\"pi pi-phone\"></i>\n          </div>\n          <div class=\"card-content\">\n            <span class=\"card-label\">Pipeline</span>\n            <strong class=\"card-value\">{{ metrics().contacted + metrics().nurture }}</strong>\n            <span class=\"card-trend\">\n              <i class=\"pi pi-spin pi-sync\"></i> Leads in progress\n            </span>\n          </div>\n          <div class=\"card-glow\"></div>\n        </div>\n\n        <div class=\"visual-card visual-card--success\">\n          <div class=\"card-icon\">\n            <i class=\"pi pi-bolt\"></i>\n          </div>\n          <div class=\"card-content\">\n            <span class=\"card-label\">Ready</span>\n            <strong class=\"card-value\">{{ conversationCoachMetrics().readyToConvert }}</strong>\n            <span class=\"card-trend card-trend--up\">\n              <i class=\"pi pi-check-circle\"></i> To convert\n            </span>\n          </div>\n          <div class=\"card-glow\"></div>\n        </div>\n      </div>\n    </section>\n\n    <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n         METRICS DASHBOARD\n         \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n    <section class=\"metrics-section\">\n      <div class=\"metric-card metric-card--total\">\n        <div class=\"metric-icon\">\n          <i class=\"pi pi-database\"></i>\n        </div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">Total Leads</span>\n          <strong class=\"metric-value\">{{ metrics().total || '\u2014' }}</strong>\n        </div>\n        <div class=\"metric-chart\">\n          <svg viewBox=\"0 0 100 40\" class=\"sparkline\">\n            <path d=\"M0,35 Q25,30 50,20 T100,15\" fill=\"none\" stroke=\"url(#gradient-leads)\" stroke-width=\"2\"/>\n            <defs>\n              <linearGradient id=\"gradient-leads\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n                <stop offset=\"0%\" stop-color=\"#667eea\"/>\n                <stop offset=\"100%\" stop-color=\"#764ba2\"/>\n              </linearGradient>\n            </defs>\n          </svg>\n        </div>\n      </div>\n\n      <div class=\"metric-card metric-card--leads clickable\" [class.active]=\"statusFilter === 'New'\" (click)=\"onStatusChange('New')\">\n        <div class=\"metric-icon\">\n          <i class=\"pi pi-star-fill\"></i>\n        </div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">New</span>\n          <strong class=\"metric-value\">{{ metrics().newLeads }}</strong>\n        </div>\n        <div class=\"metric-ring\">\n          <svg viewBox=\"0 0 36 36\">\n            <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n            <path class=\"ring-fill ring-fill--cyan\"\n              [attr.stroke-dasharray]=\"(metrics().total ? (metrics().newLeads / metrics().total) * 100 : 0) + ', 100'\"\n              d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          </svg>\n        </div>\n      </div>\n\n      <div class=\"metric-card metric-card--prospects clickable\" [class.active]=\"statusFilter === 'Qualified'\" (click)=\"onStatusChange('Qualified')\">\n        <div class=\"metric-icon\">\n          <i class=\"pi pi-check-circle\"></i>\n        </div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">Qualified</span>\n          <strong class=\"metric-value\">{{ metrics().qualified }}</strong>\n        </div>\n        <div class=\"metric-ring\">\n          <svg viewBox=\"0 0 36 36\">\n            <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n            <path class=\"ring-fill ring-fill--purple\"\n              [attr.stroke-dasharray]=\"(metrics().total ? (metrics().qualified / metrics().total) * 100 : 0) + ', 100'\"\n              d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          </svg>\n        </div>\n      </div>\n\n      <div class=\"metric-card metric-card--customers clickable\" [class.active]=\"statusFilter === 'Converted'\" (click)=\"onStatusChange('Converted')\">\n        <div class=\"metric-icon\">\n          <i class=\"pi pi-verified\"></i>\n        </div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">Converted</span>\n          <strong class=\"metric-value\">{{ metrics().converted }}</strong>\n        </div>\n        <div class=\"metric-ring\">\n          <svg viewBox=\"0 0 36 36\">\n            <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n            <path class=\"ring-fill ring-fill--green\"\n              [attr.stroke-dasharray]=\"(metrics().total ? (metrics().converted / metrics().total) * 100 : 0) + ', 100'\"\n              d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          </svg>\n        </div>\n      </div>\n\n      <div class=\"metric-card metric-card--new\">\n        <div class=\"metric-icon\">\n          <i class=\"pi pi-wave-pulse\"></i>\n        </div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">Avg Score</span>\n          <strong class=\"metric-value\">{{ metrics().avgScore }}%</strong>\n        </div>\n        <div class=\"metric-badge\">\n          <span>SCORE</span>\n        </div>\n      </div>\n    </section>\n\n    <!-- Action Bar -->\n    <section class=\"action-bar glass-card\">\n      <div class=\"search-box\">\n        <i class=\"pi pi-search\"></i>\n        <input \n          pInputText\n          type=\"text\" \n          placeholder=\"Search leads...\" \n          [(ngModel)]=\"searchTerm\"\n          (ngModelChange)=\"onSearch($event)\"\n        />\n        <kbd *ngIf=\"!searchTerm\">\u2318K</kbd>\n        <button pButton type=\"button\" class=\"clear-btn\" *ngIf=\"searchTerm\" (click)=\"searchTerm = ''; onSearch('')\">\n          <i class=\"pi pi-times\"></i>\n        </button>\n      </div>\n      \n      <div class=\"quick-filters\">\n        <button pButton type=\"button\" class=\"filter-chip\" [class.active]=\"statusFilter === 'all'\" (click)=\"onStatusChange('all')\" aria-label=\"Filter: All leads\">\n          All\n        </button>\n        <button pButton type=\"button\" class=\"filter-chip\" *ngFor=\"let opt of filteredStatusOptions\" \n                [class.active]=\"statusFilter === opt.value\"\n                (click)=\"onStatusChange(opt.value)\"\n                [attr.aria-label]=\"'Filter: ' + opt.label + ' leads'\">\n          <span class=\"chip-dot\" [attr.data-status]=\"opt.value\"></span>\n          {{ opt.label }}\n        </button>\n      </div>\n\n      <div class=\"action-right\">\n        <div class=\"view-toggle\">\n          <button type=\"button\" class=\"toggle-btn\" [class.active]=\"viewMode === 'table'\" (click)=\"viewMode = 'table'\" title=\"Table View\" aria-label=\"Switch to table view\">\n            <i class=\"pi pi-list\"></i>\n          </button>\n          <button type=\"button\" class=\"toggle-btn\" [class.active]=\"viewMode === 'kanban'\" (click)=\"viewMode = 'kanban'\" title=\"Kanban View\" aria-label=\"Switch to kanban view\">\n            <i class=\"pi pi-objects-column\"></i>\n          </button>\n        </div>\n        <div class=\"conversation-filters\">\n          <button\n            pButton\n            type=\"button\"\n            class=\"filter-chip filter-chip--conversation\"\n            *ngFor=\"let option of conversationViewOptions\"\n            [class.active]=\"conversationView === option.value\"\n            (click)=\"onConversationViewChange(option.value)\"\n            [attr.aria-label]=\"'Conversation filter: ' + option.label\"\n          >\n            <span>{{ option.label }}</span>\n            <span class=\"filter-chip__count\">{{ conversationFilterCount(option.value) }}</span>\n          </button>\n        </div>\n        <p-select appendTo=\"body\"\n          class=\"lead-sort-select\"\n          [options]=\"sortOptions\"\n          optionLabel=\"label\"\n          optionValue=\"value\"\n          [ngModel]=\"sortBy\"\n          (ngModelChange)=\"onSortChange($event)\"\n          placeholder=\"Sort leads\"\n        ></p-select>\n        <button pButton type=\"button\" class=\"btn-ghost\" *ngIf=\"statusFilter !== 'all'\" (click)=\"onStatusChange('all')\" aria-label=\"Clear status filter\">\n          <i class=\"pi pi-filter-slash\"></i>\n          Clear Filter\n        </button>\n      </div>\n    </section>\n\n\n\n    <!-- Kanban View -->\n    <section class=\"kanban-board\" *ngIf=\"viewMode === 'kanban'\">\n      <div class=\"kanban-column\" *ngFor=\"let status of kanbanStatuses\">\n        <div class=\"column-header\" [attr.data-status]=\"status\">\n          <span class=\"column-title\">{{ status }}</span>\n          <span class=\"column-count\">{{ getLeadsByStatus(status).length }}</span>\n        </div>\n        <div class=\"column-body\">\n          <div class=\"lead-card\" *ngFor=\"let lead of getLeadsByStatus(status)\" (click)=\"canManage() ? onEdit(lead) : null\" role=\"article\" [attr.aria-label]=\"lead.name + ' \u2013 ' + lead.company\">\n            <div class=\"lead-card-header\">\n              <div class=\"lead-avatar\" [attr.data-status]=\"lead.status\">\n                <img\n                  [src]=\"$any(lead).profilePictureUrl || ('https://i.pravatar.cc/150?u=' + (lead.email || lead.id))\"\n                  [alt]=\"lead.name + ' avatar'\"\n                  [title]=\"lead.name + ' avatar'\"\n                />\n              </div>\n              <div class=\"lead-meta\">\n                <span class=\"lead-name\">{{ lead.name }}</span>\n                <span class=\"lead-company\" *ngIf=\"lead.leadNumber\">{{ lead.leadNumber }}</span>\n                <span class=\"lead-company\">{{ lead.company }}</span>\n                <span\n                  class=\"lead-presence-chip\"\n                  *ngIf=\"leadPresenceCount(lead.id) > 0\"\n                  [pTooltip]=\"leadPresenceTooltip(lead.id)\"\n                  tooltipPosition=\"top\"\n                >\n                  <i class=\"pi\" [ngClass]=\"leadPresenceEditingCount(lead.id) > 0 ? 'pi-pencil' : 'pi-eye'\"></i>\n                  {{ leadPresenceCount(lead.id) }} viewing\n                </span>\n              </div>\n            <div class=\"lead-score-gauge\" pTooltip=\"{{ overallScoreHint(lead) }}\" tooltipPosition=\"top\">\n              <p-knob\n                [ngModel]=\"displayScore(lead)\"\n                [readonly]=\"true\"\n                [valueTemplate]=\"'{value}'\"\n                [size]=\"54\"\n                [strokeWidth]=\"7\"\n                [showValue]=\"true\"\n                [min]=\"0\"\n                [max]=\"100\"\n                [valueColor]=\"leadScoreColor(lead)\"\n                rangeColor=\"rgba(148, 163, 184, 0.20)\"\n                textColor=\"#0f172a\"\n                styleClass=\"lead-score-gauge__knob\"\n              ></p-knob>\n            </div>\n            </div>\n            <div class=\"lead-card-body\">\n              <div class=\"lead-detail\" *ngIf=\"lead.email\">\n                <i class=\"pi pi-envelope\"></i>\n                <span>{{ lead.email }}</span>\n              </div>\n              <div class=\"lead-detail\" *ngIf=\"lead.phone\">\n                <i class=\"pi pi-phone\"></i>\n                <span>{{ lead.phone }}</span>\n              </div>\n              <div class=\"lead-epistemic\">\n                <span\n                  class=\"epistemic-chip confidence\"\n                  pTooltip=\"{{ overallScoreHint(lead) }}\"\n                  tooltipPosition=\"top\"\n                >\n                  Overall: {{ displayScore(lead) }} / 100\n                </span>\n                <span\n                  class=\"epistemic-chip conversation\"\n                  pTooltip=\"{{ conversationScoreHint(lead) }}\"\n                  tooltipPosition=\"top\"\n                >\n                  Conversation: {{ conversationScoreLabel(lead) }}\n                </span>\n              </div>\n            </div>\n            <div class=\"lead-related\" *ngIf=\"hasConvertedLinks(lead)\" (click)=\"$event.stopPropagation()\">\n              <span class=\"lead-related-label\">Converted to</span>\n              <div class=\"lead-related-links\">\n                <a\n                  *ngIf=\"leadAccountLink(lead)\"\n                  class=\"lead-related-link\"\n                  [routerLink]=\"leadAccountLink(lead)\"\n                >Account</a>\n                <a\n                  *ngIf=\"leadContactLink(lead)\"\n                  class=\"lead-related-link\"\n                  [routerLink]=\"leadContactLink(lead)\"\n                >Contact</a>\n                <a\n                  *ngIf=\"leadOpportunityLink(lead)\"\n                  class=\"lead-related-link\"\n                  [routerLink]=\"leadOpportunityLink(lead)\"\n                >Opportunity</a>\n              </div>\n            </div>\n            <div class=\"lead-card-footer\">\n              <span class=\"lead-owner\">\n                <i class=\"pi pi-user\"></i>\n                {{ lead.owner }}\n              </span>\n              <div class=\"lead-actions\">\n                <button type=\"button\" class=\"mini-action-btn mini-action-btn--edit\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onEdit(lead)\" aria-label=\"Edit lead\">\n                  <i class=\"pi pi-pencil\"></i>\n                </button>\n                <button type=\"button\" class=\"mini-action-btn mini-action-btn--activity\" *ngIf=\"canRecycleLead(lead)\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); recycleLead(lead)\" aria-label=\"Recycle lead\">\n                  <i class=\"pi pi-refresh\"></i>\n                </button>\n                <button type=\"button\" class=\"mini-action-btn mini-action-btn--activity\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onLogActivity(lead)\" aria-label=\"Log activity\">\n                  <i class=\"pi pi-calendar-plus\"></i>\n                </button>\n                <button type=\"button\" class=\"mini-action-btn mini-action-btn--convert\" *ngIf=\"lead.status === 'Qualified'\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onConvert(lead)\" aria-label=\"Convert lead\">\n                  <i class=\"pi pi-bolt\"></i>\n                </button>\n                <button type=\"button\" class=\"mini-action-btn mini-action-btn--delete\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onDelete(lead)\" aria-label=\"Delete lead\">\n                  <i class=\"pi pi-trash\"></i>\n                </button>\n              </div>\n            </div>\n          </div>\n          <div class=\"column-empty\" *ngIf=\"!getLeadsByStatus(status).length\">\n            <i class=\"pi pi-inbox\"></i>\n            <span>No {{ status.toLowerCase() }} leads</span>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <!-- Table View -->\n    <section class=\"data-table-section glass-card\" *ngIf=\"viewMode === 'table'\">\n      <ng-container *ngIf=\"!loading(); else loadingState\">\n        <ng-container *ngIf=\"leads().length; else emptyState\">\n          <div class=\"table-container\">\n            <p-table\n              class=\"leads-table\"\n              [ngClass]=\"{ 'leads-table--compact': showCqvsInLeadList() }\"\n              [value]=\"leads()\"\n            >\n              <ng-template pTemplate=\"header\">\n                <tr>\n                  <th class=\"th-checkbox\">\n                    <p-checkbox\n                      [binary]=\"true\"\n                      [ngModel]=\"selectedIds().length && selectedIds().length === leads().length\"\n                      (onChange)=\"toggleSelectAll($event.checked)\"\n                    ></p-checkbox>\n                  </th>\n                  <th class=\"th-lead\" pSortableColumn=\"name\">Lead <p-sortIcon field=\"name\"></p-sortIcon></th>\n                  <th class=\"th-status\" pSortableColumn=\"status\">Status <p-sortIcon field=\"status\"></p-sortIcon></th>\n                  <th class=\"th-contact\">Contact</th>\n                  <th class=\"th-score\" pSortableColumn=\"score\">Lead Score <p-sortIcon field=\"score\"></p-sortIcon></th>\n                  <th class=\"th-owner\" pSortableColumn=\"ownerId\">Owner <p-sortIcon field=\"ownerId\"></p-sortIcon></th>\n                  <th class=\"th-created\" pSortableColumn=\"createdAt\">Created <p-sortIcon field=\"createdAt\"></p-sortIcon></th>\n                  <th class=\"th-actions\"></th>\n                </tr>\n              </ng-template>\n              <ng-template pTemplate=\"body\" let-lead let-i=\"rowIndex\">\n                <tr class=\"table-row\" [class.highlight]=\"i === 0\" (click)=\"onRowClick(lead, $event)\">\n                  <td class=\"td-checkbox\">\n                    <p-checkbox\n                      [binary]=\"true\"\n                      [ngModel]=\"isSelected(lead.id)\"\n                      (onChange)=\"toggleSelection(lead.id, $event.checked)\"\n                    ></p-checkbox>\n                  </td>\n                  <td class=\"td-lead\">\n                    <div class=\"lead-cell\">\n                      <div class=\"avatar\" [attr.data-status]=\"lead.status\">\n                        <img\n                          [src]=\"$any(lead).profilePictureUrl || ('https://i.pravatar.cc/150?u=' + (lead.email || lead.id))\"\n                          [alt]=\"lead.name + ' avatar'\"\n                          [title]=\"lead.name + ' avatar'\"\n                        />\n                      </div>\n                      <div class=\"lead-info\">\n                        <span class=\"name\">{{ lead.name }}</span>\n                        <span class=\"company\" *ngIf=\"lead.leadNumber\">{{ lead.leadNumber }}</span>\n                        <span class=\"company\">{{ lead.company }}</span>\n                        <span\n                          class=\"lead-presence-chip\"\n                          *ngIf=\"leadPresenceCount(lead.id) > 0\"\n                          [pTooltip]=\"leadPresenceTooltip(lead.id)\"\n                          tooltipPosition=\"top\"\n                        >\n                          <i class=\"pi\" [ngClass]=\"leadPresenceEditingCount(lead.id) > 0 ? 'pi-pencil' : 'pi-eye'\"></i>\n                          {{ leadPresenceCount(lead.id) }} viewing\n                        </span>\n                        <div class=\"lead-epistemic\">\n                          <span\n                            class=\"epistemic-chip confidence\"\n                            pTooltip=\"{{ overallScoreHint(lead) }}\"\n                            tooltipPosition=\"top\"\n                          >\n                            Overall: {{ displayScore(lead) }} / 100\n                          </span>\n                          <span\n                            class=\"epistemic-chip conversation\"\n                            pTooltip=\"{{ conversationScoreHint(lead) }}\"\n                            tooltipPosition=\"top\"\n                          >\n                            Conversation: {{ conversationScoreLabel(lead) }}\n                          </span>\n                          <span\n                            class=\"epistemic-chip confidence\"\n                            pTooltip=\"{{ readinessHint(lead) }}\"\n                            tooltipPosition=\"top\"\n                          >\n                            Readiness: {{ lead.conversionReadiness?.label || 'Not assessed' }}\n                          </span>\n                        </div>\n                        <div class=\"lead-sla\" *ngIf=\"lead.firstTouchDueAtUtc || lead.firstTouchedAtUtc\">\n                          <span class=\"sla-chip\" [ngClass]=\"getSlaTone(lead)\">\n                            <i class=\"pi pi-stopwatch\"></i>\n                            {{ getSlaStatusLabel(lead) }}\n                          </span>\n                        </div>\n                        <div class=\"lead-related\" *ngIf=\"hasConvertedLinks(lead)\">\n                          <span class=\"lead-related-label\">Converted to</span>\n                          <div class=\"lead-related-links\">\n                            <a\n                              *ngIf=\"leadAccountLink(lead)\"\n                              class=\"lead-related-link\"\n                              [routerLink]=\"leadAccountLink(lead)\"\n                            >Account</a>\n                            <a\n                              *ngIf=\"leadContactLink(lead)\"\n                              class=\"lead-related-link\"\n                              [routerLink]=\"leadContactLink(lead)\"\n                            >Contact</a>\n                            <a\n                              *ngIf=\"leadOpportunityLink(lead)\"\n                              class=\"lead-related-link\"\n                              [routerLink]=\"leadOpportunityLink(lead)\"\n                            >Opportunity</a>\n                          </div>\n                        </div>\n                        <div class=\"lead-disposition\" *ngIf=\"dispositionReasonLabel(lead) as reason\">\n                          <span class=\"lead-disposition__label\">{{ lead.status }} reason</span>\n                          <span class=\"lead-disposition__value\">{{ reason }}</span>\n                        </div>\n                      </div>\n                    </div>\n                  </td>\n                  <td class=\"td-status\">\n                    <p-select appendTo=\"body\"\n                      [options]=\"filteredStatusOptions\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      [ngModel]=\"lead.status\"\n                      (ngModelChange)=\"onInlineStatusChange(lead, $event)\"\n                      styleClass=\"inline-select\"\n                    >\n                      <ng-template pTemplate=\"item\" let-option>\n                        <div class=\"status-option\" [attr.data-status]=\"option.value\">\n                          <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                          <span>{{ option.label }}</span>\n                        </div>\n                      </ng-template>\n                      <ng-template pTemplate=\"value\" let-option>\n                        <div class=\"status-option\" *ngIf=\"option\" [attr.data-status]=\"option.value\">\n                          <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                          <span>{{ option.label }}</span>\n                        </div>\n                        <span *ngIf=\"!option\" class=\"status-placeholder\">Select status</span>\n                      </ng-template>\n                    </p-select>\n                  </td>\n                  <td class=\"td-contact\">\n                    <div class=\"contact-cell\">\n                      <a class=\"contact-link\" *ngIf=\"lead.email\" href=\"\" (click)=\"composeToLead(lead, $event)\">\n                        <i class=\"pi pi-envelope\"></i>\n                        {{ lead.email }}\n                      </a>\n                      <span class=\"contact-secondary\" *ngIf=\"lead.phone\">{{ lead.phone }}</span>\n                    </div>\n                  </td>\n                  <td class=\"td-score\">\n                    <div class=\"score-indicator\" pTooltip=\"{{ overallScoreHint(lead) }}\" tooltipPosition=\"top\">\n                      <p-knob\n                        [ngModel]=\"displayScore(lead)\"\n                        [readonly]=\"true\"\n                        [valueTemplate]=\"'{value}'\"\n                        [size]=\"56\"\n                        [strokeWidth]=\"8\"\n                        [showValue]=\"true\"\n                        [min]=\"0\"\n                        [max]=\"100\"\n                        [valueColor]=\"leadScoreColor(lead)\"\n                        rangeColor=\"rgba(148, 163, 184, 0.18)\"\n                        textColor=\"#0f172a\"\n                        styleClass=\"lead-score-gauge__knob lead-score-gauge__knob--table\"\n                      ></p-knob>\n                    </div>\n                  </td>\n                  <td class=\"td-owner\">\n                    <p-select appendTo=\"body\"\n                      [options]=\"ownerOptionsForAssign()\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      [ngModel]=\"lead.ownerId\"\n                      (ngModelChange)=\"onInlineOwnerChange(lead, $event)\"\n                      placeholder=\"Owner\"\n                      styleClass=\"inline-select\"\n                      [disabled]=\"!canEditOwnerAssignment()\"\n                    ></p-select>\n                  </td>\n                  <td class=\"td-created\">\n                    <span class=\"created-date\">{{ lead.createdAt | date: 'MMM d, yyyy' }}</span>\n                  </td>\n                  <td class=\"td-actions\">\n                    <div class=\"row-actions\">\n                      <button type=\"button\" class=\"row-action-btn row-action-btn--edit\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onEdit(lead)\" title=\"Edit\"><i class=\"pi pi-pencil\"></i></button>\n                      <button\n                        *ngIf=\"canRecycleLead(lead)\"\n                        type=\"button\"\n                        class=\"row-action-btn row-action-btn--recycle\"\n                        [disabled]=\"!canManage()\"\n                        (click)=\"$event.stopPropagation(); recycleLead(lead)\"\n                        title=\"Recycle to nurture\"\n                      ><i class=\"pi pi-refresh\"></i></button>\n                      <button\n                        *ngIf=\"showCqvsInLeadList()\"\n                        type=\"button\"\n                        class=\"row-action-btn row-action-btn--coach\"\n                        [disabled]=\"!canManage()\"\n                        (click)=\"$event.stopPropagation(); openCoach(lead)\"\n                        title=\"Coach\"\n                        data-testid=\"lead-coach-open\"\n                        [attr.data-lead-id]=\"lead.id\"\n                      ><i class=\"pi pi-compass\"></i></button>\n                      <button type=\"button\" class=\"row-action-btn row-action-btn--activity\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onLogActivity(lead)\" title=\"Log activity\"><i class=\"pi pi-calendar-plus\"></i></button>\n                      <button type=\"button\" class=\"row-action-btn row-action-btn--convert\" *ngIf=\"lead.status === 'Qualified'\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onConvert(lead)\" title=\"Convert\"><i class=\"pi pi-bolt\"></i></button>\n                      <button type=\"button\" class=\"row-action-btn row-action-btn--delete\" [disabled]=\"!canManage()\" (click)=\"$event.stopPropagation(); onDelete(lead)\" title=\"Delete\"><i class=\"pi pi-trash\"></i></button>\n                    </div>\n                  </td>\n                </tr>\n              </ng-template>\n            </p-table>\n          </div>\n\n          <div class=\"table-footer\">\n            <div class=\"pagination-info\">\n              Showing <strong>{{ (pageIndex * rows) + 1 }}</strong> to <strong>{{ Math.min((pageIndex + 1) * rows, total()) }}</strong> of <strong>{{ total() }}</strong>\n            </div>\n            <p-paginator\n              [rows]=\"rows\"\n              [totalRecords]=\"total()\"\n              [rowsPerPageOptions]=\"[10, 25, 50]\"\n              [first]=\"pageIndex * rows\"\n              (onPageChange)=\"onPageChange($event)\"\n              styleClass=\"custom-paginator\"\n            ></p-paginator>\n          </div>\n        </ng-container>\n      </ng-container>\n\n      <ng-template #loadingState>\n        <div class=\"skeleton-table\">\n          <div class=\"skeleton-row\" *ngFor=\"let _ of [1,2,3,4,5,6,7,8]\">\n            <div class=\"skeleton skeleton-checkbox\"></div>\n            <div class=\"skeleton skeleton-avatar\"></div>\n            <div class=\"skeleton skeleton-text long\"></div>\n            <div class=\"skeleton skeleton-badge\"></div>\n            <div class=\"skeleton skeleton-text medium\"></div>\n            <div class=\"skeleton skeleton-bar\"></div>\n            <div class=\"skeleton skeleton-text short\"></div>\n            <div class=\"skeleton skeleton-actions\"></div>\n          </div>\n        </div>\n      </ng-template>\n\n      <ng-template #emptyState>\n        <div class=\"empty-state\">\n          <div class=\"empty-illustration\">\n            <i class=\"pi pi-users\"></i>\n          </div>\n          <h3>No leads yet</h3>\n          <p>Start building your pipeline by adding your first lead.</p>\n          <button pButton type=\"button\" class=\"btn-primary\" [disabled]=\"!canManage()\" (click)=\"onCreate()\">\n            <i class=\"pi pi-plus\"></i>\n            Add Lead\n          </button>\n        </div>\n      </ng-template>\n    </section>\n  </div>\n</div>\n\n<app-bulk-actions-bar\n  [actions]=\"bulkActions()\"\n  [selectedItems]=\"selectedIds()\"\n  [totalCount]=\"leads().length\"\n  (actionClicked)=\"onBulkAction($event)\"\n  (clearSelection)=\"clearSelection()\"\n  (selectAll)=\"selectAllFiltered()\"\n></app-bulk-actions-bar>\n\n<p-dialog\n  header=\"Assign owner\"\n  [(visible)]=\"assignDialogVisible\"\n  [modal]=\"true\"\n  [style]=\"{ width: '360px' }\"\n>\n  <div class=\"bulk-assign\">\n    <label>Owner</label>\n    <p-select appendTo=\"body\"\n      [options]=\"ownerOptionsForAssign()\"\n      optionLabel=\"label\"\n      optionValue=\"value\"\n      [(ngModel)]=\"assignOwnerId\"\n      placeholder=\"Select owner\"\n      styleClass=\"w-full\"\n      [disabled]=\"!canEditOwnerAssignment()\"\n    ></p-select>\n  </div>\n  <ng-template pTemplate=\"footer\">\n    <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" label=\"Cancel\" (click)=\"assignDialogVisible = false\"></button>\n    <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Assign\" [disabled]=\"!assignOwnerId || !canEditOwnerAssignment()\" (click)=\"confirmBulkAssign()\"></button>\n  </ng-template>\n</p-dialog>\n\n<p-dialog\n  header=\"Change status\"\n  [(visible)]=\"statusDialogVisible\"\n  [modal]=\"true\"\n  [style]=\"{ width: '360px' }\"\n>\n  <div class=\"bulk-assign\">\n    <label>Status</label>\n    <p-select appendTo=\"body\"\n      [options]=\"filteredStatusOptions\"\n      optionLabel=\"label\"\n      optionValue=\"value\"\n      [(ngModel)]=\"bulkStatus\"\n      placeholder=\"Select status\"\n      styleClass=\"w-full\"\n    >\n      <ng-template pTemplate=\"item\" let-option>\n        <div class=\"status-option\" [attr.data-status]=\"option.value\">\n          <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n          <span>{{ option.label }}</span>\n        </div>\n      </ng-template>\n      <ng-template pTemplate=\"value\" let-option>\n        <div class=\"status-option\" *ngIf=\"option\" [attr.data-status]=\"option.value\">\n          <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n          <span>{{ option.label }}</span>\n        </div>\n        <span *ngIf=\"!option\" class=\"status-placeholder\">Select status</span>\n      </ng-template>\n    </p-select>\n  </div>\n  <ng-template pTemplate=\"footer\">\n    <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" label=\"Cancel\" (click)=\"statusDialogVisible = false\"></button>\n    <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Update\" [disabled]=\"!bulkStatus || !canManage()\" (click)=\"confirmBulkStatusUpdate()\"></button>\n  </ng-template>\n</p-dialog>\n\n<app-lead-import-wizard\n  *ngIf=\"importDialogVisible\"\n  (closed)=\"closeImport()\"\n  (imported)=\"onImportWizardComplete($event)\"\n></app-lead-import-wizard>\n\n<p-drawer\n  [visible]=\"coachVisible()\"\n  (visibleChange)=\"coachVisible.set($event)\"\n  position=\"right\"\n  [modal]=\"true\"\n  [dismissible]=\"true\"\n  styleClass=\"lead-coach-drawer\"\n  (onHide)=\"onCoachHide()\"\n>\n  <ng-template pTemplate=\"header\">\n    <div class=\"coach-title\" data-testid=\"lead-coach-title\">\n      <div class=\"coach-title__top\" *ngIf=\"coachLead() as lead\">\n        <div class=\"coach-title__badge\" aria-hidden=\"true\">\n          <i class=\"pi pi-compass\"></i>\n        </div>\n\n        <div class=\"coach-title__meta\">\n          <div class=\"coach-title__row\">\n            <span class=\"coach-title__label\">Lead Coach</span>\n            <span class=\"coach-chip\" [attr.data-status]=\"lead.status\">{{ lead.status }}</span>\n          </div>\n          <span class=\"coach-title__name\">{{ lead.name }}</span>\n          <div class=\"coach-title__chips\">\n            <span class=\"coach-chip coach-chip--muted\" *ngIf=\"lead.company\">{{ lead.company }}</span>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-template>\n\n  <div class=\"coach-body\" data-testid=\"lead-coach-drawer\" *ngIf=\"coachLead() as lead\">\n    <section class=\"coach-kpis\">\n      <div class=\"coach-kpi\">\n        <span class=\"kpi-label\">Overall</span>\n        <strong class=\"kpi-value\">{{ displayScore(lead) }}</strong>\n        <span class=\"kpi-sub\">/ 100</span>\n      </div>\n      <div class=\"coach-kpi\" pTooltip=\"{{ qualificationScoreHint(lead) }}\" tooltipPosition=\"top\">\n        <span class=\"kpi-label\">Qualification</span>\n        <strong class=\"kpi-value\">{{ qualificationScore100(lead) }}</strong>\n        <span class=\"kpi-sub\">/ 100</span>\n      </div>\n      <div class=\"coach-kpi\" *ngIf=\"evidenceCoveragePercent(lead) !== null\">\n        <span class=\"kpi-label\">Evidence</span>\n        <strong class=\"kpi-value\">{{ evidenceCoveragePercent(lead) }}</strong>\n        <span class=\"kpi-sub\">%</span>\n      </div>\n      <div class=\"coach-kpi\" pTooltip=\"{{ conversationScoreHint(lead) }}\" tooltipPosition=\"top\">\n        <span class=\"kpi-label\">Conversation</span>\n        <strong class=\"kpi-value\">{{ lead.conversationSignalAvailable ? (lead.conversationScore ?? 0) : '\u2014' }}</strong>\n        <span class=\"kpi-sub\">{{ lead.conversationSignalAvailable ? '/ 100' : 'no signal' }}</span>\n      </div>\n      <div class=\"coach-kpi\" pTooltip=\"{{ readinessHint(lead) }}\" tooltipPosition=\"top\">\n        <span class=\"kpi-label\">Readiness</span>\n        <strong class=\"kpi-value\">{{ lead.conversionReadiness?.score ?? '\u2014' }}</strong>\n        <span class=\"kpi-sub\">{{ lead.conversionReadiness ? '/ 100' : 'not scored' }}</span>\n      </div>\n    </section>\n\n    <section class=\"coach-block coach-block--conversation-summary\">\n      <h3 class=\"coach-block__title\">Conversation Guidance</h3>\n      <div class=\"coach-signal-strip\">\n        <span class=\"coach-chip coach-chip--signal\" [attr.data-tone]=\"conversationStatusTone(lead)\">{{ conversationStatusPill(lead) }}</span>\n        <span class=\"coach-chip coach-chip--signal\" [attr.data-tone]=\"conversationStatusTone(lead)\">{{ coachToneLabel(lead) }}</span>\n        <span class=\"coach-chip coach-chip--signal\" [attr.data-tone]=\"matchesConversationView(lead, 'high_buying_intent') ? 'healthy' : 'weak'\">{{ coachBuyingReadinessLabel(lead) }}</span>\n        <span class=\"coach-chip coach-chip--signal\" [attr.data-tone]=\"matchesConversationView(lead, 'high_buying_intent') ? 'healthy' : 'neutral'\">{{ coachSemanticIntentLabel(lead) }}</span>\n      </div>\n      <div class=\"coach-next-action\">\n        <span class=\"coach-next-action__label\">Recommended next action</span>\n        <p>{{ conversationRecommendedAction(lead) }}</p>\n      </div>\n    </section>\n\n    <section class=\"coach-block\" *ngIf=\"lead.conversionReadiness as readiness\">\n      <h3 class=\"coach-block__title\">Conversion Readiness</h3>\n      <div class=\"weakest-row\">\n        <span class=\"cqvs-pill\">{{ readiness.label }}</span>\n        <div class=\"weakest-row__text\">\n          <div class=\"weakest-row__top\">\n            <strong>{{ readiness.summary }}</strong>\n            <span class=\"state-pill\" *ngIf=\"readiness.primaryGap\">{{ readiness.primaryGap }}</span>\n          </div>\n          <span *ngIf=\"readiness.managerReviewRecommended\">Manager review recommended before conversion.</span>\n        </div>\n      </div>\n      <ul class=\"coach-checklist\" *ngIf=\"readiness.reasons.length\">\n        <li *ngFor=\"let reason of readiness.reasons\">{{ reason }}</li>\n      </ul>\n    </section>\n\n    <section class=\"coach-block\">\n      <h3 class=\"coach-block__title\">CQVS Summary</h3>\n      <div class=\"cqvs-grid\">\n        <article\n          class=\"cqvs-card\"\n          *ngFor=\"let g of cqvsGroupMetrics(lead)\"\n          [attr.data-testid]=\"'cqvs-group-' + g.code\"\n          [attr.data-cqvs]=\"g.code\"\n        >\n          <div class=\"cqvs-card__head\">\n            <span class=\"cqvs-code\">{{ g.code }}</span>\n            <span class=\"cqvs-title\">{{ g.title }}</span>\n            <span class=\"cqvs-score\">{{ g.score }}/{{ g.maxScore }}</span>\n          </div>\n          <div class=\"cqvs-bar\" aria-hidden=\"true\">\n            <span class=\"cqvs-bar__fill\" [style.width.%]=\"g.percent\"></span>\n          </div>\n        </article>\n      </div>\n      <p class=\"coach-hint\" *ngIf=\"!lead.scoreBreakdown?.length\">\n        No score breakdown available yet for this lead.\n      </p>\n    </section>\n\n    <section class=\"coach-block\">\n      <h3 class=\"coach-block__title\">Weakest Factor</h3>\n      <div class=\"weakest-row\" pTooltip=\"{{ cqvsWeakestTooltip(lead) }}\" tooltipPosition=\"top\">\n        <span class=\"cqvs-pill\" *ngIf=\"cqvsWeakestCode(lead) as code\">{{ code }}</span>\n        <div class=\"weakest-row__text\">\n          <div class=\"weakest-row__top\">\n            <strong>{{ lead.weakestSignal || 'Unknown' }}</strong>\n            <span class=\"state-pill\" *ngIf=\"lead.weakestState\">{{ lead.weakestState }}</span>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"coach-block\" *ngIf=\"lead.nextEvidenceSuggestions?.length\">\n      <h3 class=\"coach-block__title\">Next Evidence</h3>\n      <ul class=\"coach-list\">\n        <li *ngFor=\"let item of lead.nextEvidenceSuggestions\">{{ item }}</li>\n      </ul>\n    </section>\n\n    <section class=\"coach-block\" *ngIf=\"lead.riskFlags?.length\">\n      <h3 class=\"coach-block__title\">Risk Flags</h3>\n      <ul class=\"coach-list coach-list--flags\">\n        <li *ngFor=\"let item of lead.riskFlags\">{{ item }}</li>\n      </ul>\n    </section>\n\n    <section class=\"coach-block\" *ngIf=\"dispositionReasonLabel(lead) as reason\">\n      <h3 class=\"coach-block__title\">Disposition</h3>\n      <ul class=\"coach-list\">\n        <li>{{ lead.status }} reason: {{ reason }}</li>\n      </ul>\n    </section>\n\n    <section class=\"coach-block\" *ngIf=\"lead.conversationScoreReasons?.length\">\n      <h3 class=\"coach-block__title\">Conversation Signals</h3>\n      <ul class=\"coach-list\">\n        <li *ngFor=\"let item of lead.conversationScoreReasons\">{{ item }}</li>\n      </ul>\n    </section>\n\n    <footer class=\"coach-footer\" data-testid=\"lead-coach-footer\">\n      <div class=\"coach-actions\">\n        <button pButton type=\"button\" class=\"coach-action-btn coach-action-btn--edit\" (click)=\"onEdit(lead)\">\n          <i class=\"pi pi-pencil\"></i>\n          <span>Edit lead</span>\n        </button>\n        <button *ngIf=\"lead.email\" pButton type=\"button\" class=\"coach-action-btn coach-action-btn--compose\" (click)=\"composeToLead(lead)\">\n          <i class=\"pi pi-envelope\"></i>\n          <span>Compose email</span>\n        </button>\n        <button *ngIf=\"canRecycleLead(lead)\" pButton type=\"button\" class=\"coach-action-btn coach-action-btn--log\" (click)=\"recycleLead(lead)\">\n          <i class=\"pi pi-refresh\"></i>\n          <span>Recycle</span>\n        </button>\n        <button pButton type=\"button\" class=\"coach-action-btn coach-action-btn--log\" (click)=\"onLogActivity(lead)\">\n          <i class=\"pi pi-calendar-plus\"></i>\n          <span>Log activity</span>\n        </button>\n        <button *ngIf=\"canShowCoachConvert(lead)\" pButton type=\"button\" class=\"coach-action-btn coach-action-btn--convert\" (click)=\"onConvert(lead)\">\n          <i class=\"pi pi-bolt\"></i>\n          <span>Convert</span>\n        </button>\n      </div>\n    </footer>\n  </div>\n</p-drawer>\n", styles: ["// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// LEADS PAGE - Modern Enterprise Design (Salesforce/HubSpot Inspired)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// STATUS COLORS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n$status-new: #06b6d4;\n$status-contacted: #f59e0b;\n$status-qualified: #10b981;\n$status-converted: #6366f1;\n$status-lost: #ef4444;\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// BACKGROUND\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.page-background {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);\n  overflow: hidden;\n}\n\n.animated-orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(100px);\n  opacity: 0.4;\n  animation: float 30s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 600px;\n    height: 600px;\n    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);\n    top: -200px;\n    left: -200px;\n  }\n\n  &.orb-2 {\n    width: 500px;\n    height: 500px;\n    background: linear-gradient(135deg, #10b981 0%, #059669 100%);\n    bottom: -150px;\n    right: -150px;\n    animation-delay: -10s;\n  }\n\n  &.orb-3 {\n    width: 400px;\n    height: 400px;\n    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    animation-delay: -20s;\n    opacity: 0.25;\n  }\n}\n\n.grid-pattern {\n  position: absolute;\n  inset: 0;\n  background-image: \n    linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px);\n  background-size: 40px 40px;\n}\n\n@keyframes float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  33% { transform: translate(20px, -30px) scale(1.02); }\n  66% { transform: translate(-15px, 20px) scale(0.98); }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PAGE LAYOUT\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.page-container {\n  position: relative;\n  z-index: 1;\n  min-height: 100vh;\n  padding: 24px 32px;\n}\n\n.page-content {\n  max-width: 1600px;\n  margin: 0 auto;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ANIMATIONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes pulse-glow {\n  0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }\n  50% { opacity: 0.8; box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); }\n}\n\n@keyframes fade-in-up {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes slide-in-right {\n  from { opacity: 0; transform: translateX(20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n@keyframes ring-draw {\n  0% { stroke-dasharray: 0, 100; }\n}\n\n@keyframes badge-pulse {\n  0%, 100% { transform: scale(1); }\n  50% { transform: scale(1.1); }\n}\n\n@keyframes shimmer {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(100%); }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// HERO SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-stats {\n  display: flex;\n  gap: $space-4;\n  flex-wrap: wrap;\n  margin-top: $space-2;\n}\n\n.hero-stat {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 80px;\n\n  .stat-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .stat-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .stat-bar {\n    width: 100%;\n    height: 4px;\n    background: $gray-200;\n    border-radius: $radius-full;\n    overflow: hidden;\n\n    .stat-bar-fill {\n      height: 100%;\n      background: $primary-gradient;\n      border-radius: $radius-full;\n      transition: width 1s ease-out;\n\n      &--leads { background: $cyan-gradient; }\n      &--prospects { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n      &--success { background: $success-gradient; }\n    }\n  }\n}\n\n.hero-actions {\n  display: flex;\n  gap: $space-3;\n  margin-top: $space-2;\n  flex-wrap: wrap;\n}\n\n// Hero Visual Cards\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform $transition-base, box-shadow $transition-base, border-color $transition-base;\n\n  &:hover {\n    transform: translateY(-3px) scale(1.01);\n    box-shadow: $glass-shadow-lg;\n  }\n\n  .card-icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n    transition: transform $transition-spring;\n  }\n\n  &:hover .card-icon {\n    transform: scale(1.1) rotate(5deg);\n  }\n\n  &--primary {\n    border-color: rgba(102, 126, 234, 0.2);\n\n    &:hover {\n      border-color: rgba(102, 126, 234, 0.4);\n      box-shadow: $glass-shadow-lg, 0 8px 24px rgba(102, 126, 234, 0.12);\n    }\n\n    .card-icon {\n      background: $primary-gradient;\n      color: white;\n      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);\n    }\n\n    .card-value {\n      background: $primary-gradient;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    .card-glow {\n      background: radial-gradient(circle, rgba(102, 126, 234, 0.18) 0%, transparent 70%);\n    }\n  }\n\n  &--secondary {\n    border-color: rgba(6, 182, 212, 0.2);\n\n    &:hover {\n      border-color: rgba(6, 182, 212, 0.4);\n      box-shadow: $glass-shadow-lg, 0 8px 24px rgba(6, 182, 212, 0.12);\n    }\n\n    .card-icon {\n      background: $cyan-gradient;\n      color: white;\n      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);\n    }\n\n    .card-value {\n      background: $cyan-gradient;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    .card-glow {\n      background: radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, transparent 70%);\n    }\n  }\n\n  &--success {\n    border-color: rgba(34, 197, 94, 0.2);\n\n    &:hover {\n      border-color: rgba(34, 197, 94, 0.4);\n      box-shadow: $glass-shadow-lg, 0 8px 24px rgba(34, 197, 94, 0.12);\n    }\n\n    .card-icon {\n      background: $success-gradient;\n      color: white;\n      box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);\n    }\n\n    .card-value {\n      background: $success-gradient;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    .card-glow {\n      background: radial-gradient(circle, rgba(34, 197, 94, 0.18) 0%, transparent 70%);\n    }\n  }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    &--up { color: $success; }\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n// View Toggle (in action bar)\n.view-toggle {\n  display: flex;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: 8px;\n  padding: 2px;\n\n  .toggle-btn {\n    padding: 8px 12px;\n    border: none;\n    background: transparent;\n    color: $gray-500;\n    border-radius: 6px;\n    cursor: pointer;\n    transition: all 0.15s ease;\n\n    &:hover {\n      color: $gray-700;\n    }\n\n    &.active {\n      background: white;\n      color: $gray-900;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// METRICS SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.metrics-section {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(5, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1400px) { grid-template-columns: repeat(3, 1fr); }\n  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }\n  @media (max-width: 600px) { grid-template-columns: 1fr; }\n}\n\n.metric-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all $transition-base;\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 5 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  &.clickable {\n    cursor: pointer;\n  }\n\n  // \u2500\u2500 Variant: Total \u2500\u2500\n  &--total {\n    border-color: rgba(102, 126, 234, 0.15);\n\n    &:hover { box-shadow: $glass-shadow-lg, 0 8px 24px rgba(102, 126, 234, 0.1); }\n\n    .metric-icon {\n      background: $primary-gradient;\n      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);\n    }\n\n    .metric-value {\n      background: $primary-gradient;\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n\n    &.active {\n      border-color: rgba(102, 126, 234, 0.4);\n      box-shadow: $glass-shadow, 0 0 0 2px rgba(102, 126, 234, 0.15);\n    }\n  }\n\n  // \u2500\u2500 Variant: New leads (cyan) \u2500\u2500\n  &--leads {\n    border-color: rgba(6, 182, 212, 0.15);\n\n    &:hover { box-shadow: $glass-shadow-lg, 0 8px 24px rgba(6, 182, 212, 0.1); }\n\n    .metric-icon {\n      background: $cyan-gradient;\n      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);\n    }\n\n    .metric-value { color: #0891b2; }\n\n    &.active {\n      border-color: rgba(6, 182, 212, 0.4);\n      box-shadow: $glass-shadow, 0 0 0 2px rgba(6, 182, 212, 0.15);\n      background: rgba(6, 182, 212, 0.04);\n    }\n  }\n\n  // \u2500\u2500 Variant: Qualified (purple) \u2500\u2500\n  &--prospects {\n    border-color: rgba(168, 85, 247, 0.15);\n\n    &:hover { box-shadow: $glass-shadow-lg, 0 8px 24px rgba(168, 85, 247, 0.1); }\n\n    .metric-icon {\n      background: linear-gradient(135deg, $purple 0%, #9333ea 100%);\n      box-shadow: 0 4px 12px rgba(168, 85, 247, 0.25);\n    }\n\n    .metric-value { color: #7c3aed; }\n\n    &.active {\n      border-color: rgba(168, 85, 247, 0.4);\n      box-shadow: $glass-shadow, 0 0 0 2px rgba(168, 85, 247, 0.15);\n      background: rgba(168, 85, 247, 0.04);\n    }\n  }\n\n  // \u2500\u2500 Variant: Converted (green) \u2500\u2500\n  &--customers {\n    border-color: rgba(34, 197, 94, 0.15);\n\n    &:hover { box-shadow: $glass-shadow-lg, 0 8px 24px rgba(34, 197, 94, 0.1); }\n\n    .metric-icon {\n      background: $success-gradient;\n      box-shadow: 0 4px 12px rgba(34, 197, 94, 0.25);\n    }\n\n    .metric-value { color: #16a34a; }\n\n    &.active {\n      border-color: rgba(34, 197, 94, 0.4);\n      box-shadow: $glass-shadow, 0 0 0 2px rgba(34, 197, 94, 0.15);\n      background: rgba(34, 197, 94, 0.04);\n    }\n  }\n\n  // \u2500\u2500 Variant: Avg Score (orange) \u2500\u2500\n  &--new {\n    border-color: rgba(249, 115, 22, 0.15);\n\n    &:hover { box-shadow: $glass-shadow-lg, 0 8px 24px rgba(249, 115, 22, 0.1); }\n\n    .metric-icon {\n      background: $orange-gradient;\n      box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);\n    }\n\n    .metric-value { color: #ea580c; }\n  }\n\n  .metric-icon {\n    width: 40px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-lg;\n    color: white;\n    flex-shrink: 0;\n    transition: transform $transition-spring;\n  }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n  }\n\n  .metric-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n}\n\n// Sparkline Chart\n.metric-chart {\n  position: absolute;\n  right: $space-4;\n  bottom: $space-3;\n  width: 60px;\n  height: 24px;\n  opacity: 0.5;\n\n  .sparkline {\n    width: 100%;\n    height: 100%;\n  }\n}\n\n// Ring Chart\n.metric-ring {\n  position: absolute;\n  right: $space-3;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: $gray-200;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n    animation: ring-draw 1s ease-out;\n\n    &--cyan { stroke: $cyan; }\n    &--purple { stroke: $purple; }\n    &--green { stroke: $success; }\n  }\n}\n\n// Badge\n.metric-badge {\n  position: absolute;\n  top: $space-3;\n  right: $space-3;\n\n  span {\n    display: inline-block;\n    padding: $space-1 $space-2;\n    background: $orange-gradient;\n    color: white;\n    font-size: $font-size-xs;\n    font-weight: 700;\n    border-radius: $radius-sm;\n    animation: badge-pulse 2s ease-in-out infinite;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ACTION BAR\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.action-bar {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 12px 16px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n\n.glass-card {\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 16px;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n}\n\n.search-box {\n  position: relative;\n  flex: 1;\n  min-width: 200px;\n  max-width: 360px;\n\n  i {\n    position: absolute;\n    left: 14px;\n    top: 50%;\n    transform: translateY(-50%);\n    color: $gray-400;\n    font-size: 14px;\n  }\n\n  input {\n    width: 100%;\n    padding: 10px 14px 10px 40px;\n    border: 1px solid rgba(0, 0, 0, 0.08);\n    border-radius: 10px;\n    font-size: 14px;\n    background: white;\n    color: $gray-800;\n    transition: all 0.15s ease;\n\n    &::placeholder {\n      color: $gray-400;\n    }\n\n    &:focus {\n      outline: none;\n      border-color: $status-qualified;\n      box-shadow: 0 0 0 3px rgba($status-qualified, 0.1);\n    }\n  }\n\n  kbd {\n    position: absolute;\n    right: 12px;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: 3px 8px;\n    background: $gray-100;\n    border: 1px solid $gray-200;\n    border-radius: 6px;\n    font-size: 11px;\n    color: $gray-500;\n    font-family: inherit;\n  }\n\n  .clear-btn {\n    position: absolute;\n    right: 10px;\n    top: 50%;\n    transform: translateY(-50%);\n    padding: 4px;\n    background: $gray-200;\n    border: none;\n    border-radius: 50%;\n    color: $gray-600;\n    cursor: pointer;\n    font-size: 10px;\n\n    &:hover {\n      background: $gray-300;\n    }\n  }\n}\n\n.quick-filters {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.filter-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 8px 14px;\n  background: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.08);\n  border-radius: 20px;\n  font-size: 13px;\n  font-weight: 500;\n  color: $gray-600;\n  cursor: pointer;\n  transition: all 0.15s ease;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.03);\n    border-color: rgba(0, 0, 0, 0.12);\n  }\n\n  &.active {\n    background: $status-qualified;\n    border-color: $status-qualified;\n    color: white;\n\n    .chip-dot {\n      background: white !important;\n    }\n  }\n}\n\n.filter-chip__count {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 20px;\n  height: 20px;\n  padding: 0 6px;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.08);\n  font-size: 11px;\n  font-weight: 800;\n}\n\n.filter-chip.active .filter-chip__count {\n  background: rgba(255, 255, 255, 0.22);\n  color: inherit;\n}\n\n.chip-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n\n  &[data-status=\"New\"] { background: $status-new; }\n  &[data-status=\"Contacted\"] { background: $status-contacted; }\n  &[data-status=\"Qualified\"] { background: $status-qualified; }\n  &[data-status=\"Converted\"] { background: $status-converted; }\n  &[data-status=\"Lost\"] { background: $status-lost; }\n}\n\n.action-right {\n  margin-left: auto;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n\n.conversation-filters {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.filter-chip--conversation.active {\n  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);\n  border-color: #4f46e5;\n}\n\n::ng-deep .lead-sort-select .p-select {\n  min-width: 220px;\n  border-radius: 10px;\n}\n\n.bulk-assign {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n::ng-deep .inline-select {\n  .p-select {\n    min-width: 140px;\n    border-radius: 10px;\n  }\n\n  .p-select-label {\n    font-size: 13px;\n    color: $gray-700;\n  }\n}\n\n\n.status-option {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n}\n\n.status-option i {\n  font-size: 0.9rem;\n}\n\n.status-placeholder {\n  color: rgba($gray-600, 0.8);\n  font-weight: 500;\n}\n\n.status-option[data-status=\"New\"] i { color: $status-new; }\n.status-option[data-status=\"Contacted\"] i { color: $status-contacted; }\n.status-option[data-status=\"Qualified\"] i { color: $status-qualified; }\n.status-option[data-status=\"Converted\"] i { color: $status-converted; }\n.status-option[data-status=\"Lost\"] i { color: $status-lost; }\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// KANBAN BOARD\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.kanban-board {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n  min-height: 500px;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.kanban-column {\n  background: rgba(0, 0, 0, 0.02);\n  border-radius: 16px;\n  display: flex;\n  flex-direction: column;\n  max-height: 70vh;\n}\n\n.column-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px;\n  border-bottom: 2px solid;\n\n  &[data-status=\"New\"] { border-color: $status-new; }\n  &[data-status=\"Contacted\"] { border-color: $status-contacted; }\n  &[data-status=\"Qualified\"] { border-color: $status-qualified; }\n  &[data-status=\"Converted\"] { border-color: $status-converted; }\n  &[data-status=\"Lost\"] { border-color: $status-lost; }\n\n  .column-title {\n    font-size: 14px;\n    font-weight: 600;\n    color: $gray-700;\n  }\n\n  .column-count {\n    font-size: 12px;\n    font-weight: 600;\n    padding: 4px 10px;\n    background: white;\n    border-radius: 12px;\n    color: $gray-600;\n  }\n}\n\n.column-body {\n  flex: 1;\n  overflow-y: auto;\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.lead-card {\n  background: white;\n  border-radius: 12px;\n  padding: 14px;\n  cursor: pointer;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  transition: all 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n  }\n}\n\n.lead-card-header {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n\n.lead-avatar {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 10px;\n  font-size: 14px;\n  font-weight: 600;\n  color: white;\n  flex-shrink: 0;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n\n  &[data-status=\"New\"] { background: linear-gradient(135deg, $status-new 0%, color.adjust($status-new, $lightness: -10%) 100%); }\n  &[data-status=\"Contacted\"] { background: linear-gradient(135deg, $status-contacted 0%, color.adjust($status-contacted, $lightness: -10%) 100%); }\n  &[data-status=\"Qualified\"] { background: linear-gradient(135deg, $status-qualified 0%, color.adjust($status-qualified, $lightness: -10%) 100%); }\n  &[data-status=\"Converted\"] { background: linear-gradient(135deg, $status-converted 0%, color.adjust($status-converted, $lightness: -10%) 100%); }\n  &[data-status=\"Lost\"] { background: linear-gradient(135deg, $status-lost 0%, color.adjust($status-lost, $lightness: -10%) 100%); }\n}\n\n.lead-meta {\n  flex: 1;\n  min-width: 0;\n\n  .lead-name {\n    display: block;\n    font-size: 14px;\n    font-weight: 600;\n    color: $gray-800;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  .lead-company {\n    display: block;\n    font-size: 12px;\n    color: $gray-500;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n}\n\n.lead-presence-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  margin-top: 4px;\n  width: fit-content;\n  padding: 2px 8px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 600;\n  color: #1d4ed8;\n  background: rgba(59, 130, 246, 0.12);\n}\n\n.lead-score-gauge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 56px;\n  height: 56px;\n  border-radius: 16px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.82));\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.06);\n}\n\n.lead-card-body {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 10px;\n}\n\n.lead-related {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 10px;\n}\n\n.lead-related-label {\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: $gray-400;\n}\n\n.lead-related-links {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n\n.lead-related-link {\n  font-size: 12px;\n  font-weight: 600;\n  color: color.adjust($primary, $lightness: -10%);\n  background: rgba($primary, 0.12);\n  border: 1px solid rgba($primary, 0.2);\n  padding: 3px 10px;\n  border-radius: 999px;\n  text-decoration: none;\n  transition: all 0.2s ease;\n}\n\n.lead-related-link:hover {\n  background: rgba($primary, 0.2);\n  border-color: rgba($primary, 0.35);\n  color: color.adjust($primary, $lightness: -20%);\n}\n\n.lead-disposition {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin-top: 6px;\n}\n\n.lead-disposition__label {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: $gray-400;\n}\n\n.lead-disposition__value {\n  font-size: 12px;\n  color: $gray-600;\n}\n\n.lead-detail {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 12px;\n  color: $gray-500;\n\n  i {\n    font-size: 12px;\n    color: $gray-400;\n    width: 14px;\n  }\n\n  span {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n}\n\n.lead-epistemic {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-top: 6px;\n}\n\n.epistemic-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 3px 8px;\n  border-radius: 999px;\n  font-size: 11px;\n  font-weight: 600;\n  border: 1px solid transparent;\n  background: rgba($gray-100, 0.9);\n  color: $gray-600;\n}\n\n.epistemic-chip.truth {\n  background: rgba(16, 185, 129, 0.12);\n  border-color: rgba(16, 185, 129, 0.2);\n  color: #047857;\n}\n\n.epistemic-chip.weakest {\n  background: rgba(245, 158, 11, 0.12);\n  border-color: rgba(245, 158, 11, 0.2);\n  color: #b45309;\n}\n\n.epistemic-chip.confidence {\n  background: rgba(59, 130, 246, 0.12);\n  border-color: rgba(59, 130, 246, 0.2);\n  color: #1d4ed8;\n}\n\n.lead-card-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: 10px;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n.lead-owner {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  color: $gray-500;\n\n  i {\n    font-size: 11px;\n  }\n}\n\n.lead-actions {\n  display: flex;\n  gap: 4px;\n}\n\n.mini-btn {\n  width: 28px;\n  height: 28px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: 6px;\n  color: $gray-500;\n  cursor: pointer;\n  font-size: 12px;\n  transition: all 0.15s ease;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.08);\n    color: $gray-700;\n  }\n\n  &.danger:hover {\n    background: rgba($status-lost, 0.1);\n    color: $status-lost;\n  }\n\n  &.success:hover {\n    background: rgba($status-converted, 0.12);\n    color: $status-converted;\n  }\n\n  &.info:hover {\n    background: rgba($primary, 0.12);\n    color: $primary;\n  }\n}\n\n.column-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 20px;\n  color: $gray-400;\n\n  i {\n    font-size: 24px;\n    margin-bottom: 8px;\n  }\n\n  span {\n    font-size: 13px;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DATA TABLE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.data-table-section {\n  overflow: hidden;\n}\n\n.table-container {\n  overflow-x: auto;\n}\n\n.leads-table {\n  width: 100%;\n  border-collapse: collapse;\n\n  th, td {\n    padding: 12px 16px;\n    text-align: left;\n    white-space: nowrap;\n  }\n\n  thead th {\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n  }\n\n  .th-checkbox, .td-checkbox {\n    width: 48px;\n    padding-left: 20px;\n  }\n\n  .th-lead { min-width: 220px; }\n  .th-status { width: 120px; }\n  .th-contact { min-width: 200px; }\n  .th-score { width: 140px; }\n  .th-owner { width: 150px; }\n  .th-actions { width: 100px; }\n}\n\n.leads-table.leads-table--compact {\n  th, td {\n    padding: 10px 12px;\n    font-size: 12px;\n  }\n\n  thead th {\n    font-size: 0.68rem;\n    letter-spacing: 0.07em;\n  }\n\n  .th-checkbox, .td-checkbox {\n    width: 44px;\n    padding-left: 14px;\n  }\n\n  .th-lead { min-width: 200px; }\n  .th-status { width: 110px; }\n  .th-contact { min-width: 180px; }\n  .th-score { width: 120px; }\n  .th-owner { width: 130px; }\n  .th-actions { width: 92px; }\n\n  .lead-cell {\n    gap: 10px;\n\n    .avatar {\n      width: 34px;\n      height: 34px;\n      border-radius: 9px;\n      font-size: 13px;\n    }\n\n    .lead-info {\n      .name {\n        font-size: 13px;\n      }\n\n      .company {\n        font-size: 11px;\n      }\n    }\n  }\n\n  .cqvs-pill {\n    width: 20px;\n    height: 20px;\n    border-radius: 7px;\n    font-size: 11px;\n  }\n}\n\n.checkbox {\n  width: 18px;\n  height: 18px;\n  border-radius: 5px;\n  border: 2px solid $gray-300;\n  cursor: pointer;\n  accent-color: $status-qualified;\n}\n\n.table-row {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  transition: background 0.15s ease;\n\n  &:hover {\n    background: rgba($status-qualified, 0.03);\n  }\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  &.highlight {\n    background: rgba($status-new, 0.04);\n  }\n}\n\n.lead-cell {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n\n  .avatar {\n    width: 38px;\n    height: 38px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    color: white;\n    flex-shrink: 0;\n    overflow: hidden;\n\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      border-radius: inherit;\n    }\n\n    &[data-status=\"New\"] { background: linear-gradient(135deg, $status-new 0%, color.adjust($status-new, $lightness: -10%) 100%); }\n    &[data-status=\"Contacted\"] { background: linear-gradient(135deg, $status-contacted 0%, color.adjust($status-contacted, $lightness: -10%) 100%); }\n    &[data-status=\"Qualified\"] { background: linear-gradient(135deg, $status-qualified 0%, color.adjust($status-qualified, $lightness: -10%) 100%); }\n    &[data-status=\"Converted\"] { background: linear-gradient(135deg, $status-converted 0%, color.adjust($status-converted, $lightness: -10%) 100%); }\n    &[data-status=\"Lost\"] { background: linear-gradient(135deg, $status-lost 0%, color.adjust($status-lost, $lightness: -10%) 100%); }\n}\n\n.cqvs-pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 800;\n  color: #0f172a;\n  background: linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(99, 102, 241, 0.22) 100%);\n  border: 1px solid rgba(99, 102, 241, 0.25);\n}\n\n// Drawer is rendered in an overlay appended to <body>, so selectors must be truly global.\n::ng-deep .lead-coach-drawer {\n  width: min(440px, 92vw);\n}\n\n// PrimeNG may apply `styleClass` to the drawer root, not a wrapper.\n::ng-deep .lead-coach-drawer.p-drawer,\n::ng-deep .lead-coach-drawer .p-drawer {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border-left: 1px solid rgba(148, 163, 184, 0.28);\n  box-shadow: $glass-shadow-lg;\n}\n\n::ng-deep .p-drawer-mask {\n  // Keep focus on the drawer without making the surface feel \"dark mode\".\n  background: rgba(2, 6, 23, 0.04);\n}\n\n::ng-deep .lead-coach-drawer .p-drawer-header {\n  padding: 14px 16px;\n  background:\n    radial-gradient(800px 220px at 15% 0%, rgba(34, 211, 238, 0.22) 0%, transparent 60%),\n    radial-gradient(700px 240px at 90% 20%, rgba(99, 102, 241, 0.22) 0%, transparent 55%),\n    linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.6) 100%);\n  border-bottom: 1px solid rgba(148, 163, 184, 0.22);\n}\n\n::ng-deep .lead-coach-drawer .p-drawer-content {\n  padding: 14px 16px 14px;\n  background:\n    radial-gradient(900px 380px at 20% 0%, rgba(34, 211, 238, 0.08) 0%, transparent 55%),\n    radial-gradient(900px 420px at 90% 45%, rgba(99, 102, 241, 0.08) 0%, transparent 60%),\n    linear-gradient(180deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.86) 100%);\n\n  // Ensure the sticky footer doesn't cover the last section.\n  padding-bottom: 82px;\n}\n\n::ng-deep .lead-coach-drawer .p-drawer-close-button {\n  width: 38px;\n  height: 38px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  transition: transform $transition-fast, box-shadow $transition-fast, background $transition-fast;\n}\n\n::ng-deep .lead-coach-drawer .p-drawer-close-button:hover {\n  transform: translateY(-1px);\n  background: rgba(255, 255, 255, 0.9);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);\n}\n\n::ng-deep .lead-coach-drawer {\n  // NOTE: Angular removes template whitespace by default. When the drawer renders outside\n  // the component tree (overlay appended to body), scoped styles can miss. Keep all coach\n  // UI styles under the drawer class to ensure they always apply.\n\n  .coach-title {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n  }\n\n  .coach-title__top {\n    display: flex;\n    align-items: flex-start;\n    gap: 12px;\n  }\n\n  .coach-title__badge {\n    width: 42px;\n    height: 42px;\n    border-radius: 14px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    color: #0f172a;\n    background: linear-gradient(135deg, rgba(34, 211, 238, 0.24) 0%, rgba(99, 102, 241, 0.22) 100%);\n    border: 1px solid rgba(99, 102, 241, 0.25);\n    box-shadow: 0 12px 28px rgba(99, 102, 241, 0.16);\n\n    i {\n      font-size: 18px;\n      font-weight: 800;\n    }\n  }\n\n  .coach-title__meta {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    min-width: 0;\n    flex: 1;\n  }\n\n  .coach-title__row {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n  }\n\n  .coach-title__label {\n    font-size: 12px;\n    font-weight: 800;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: $gray-500;\n  }\n\n  .coach-title__name {\n    font-size: 15px;\n    font-weight: 900;\n    color: $gray-900;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    max-width: 320px;\n  }\n\n  .coach-title__chips {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n  }\n\n  .coach-chip {\n    display: inline-flex;\n    align-items: center;\n    gap: 6px;\n    padding: 6px 10px;\n    border-radius: 999px;\n    font-size: 11px;\n    font-weight: 800;\n    border: 1px solid rgba(148, 163, 184, 0.28);\n    background: rgba(255, 255, 255, 0.7);\n    color: #0f172a;\n    white-space: nowrap;\n  }\n\n  .coach-chip--muted {\n    font-weight: 700;\n    color: $gray-700;\n  }\n\n  .coach-chip--signal[data-tone=\"healthy\"] {\n    border-color: rgba(16, 185, 129, 0.32);\n    background: rgba(16, 185, 129, 0.10);\n    color: #065f46;\n  }\n\n  .coach-chip--signal[data-tone=\"risk\"] {\n    border-color: rgba(239, 68, 68, 0.32);\n    background: rgba(239, 68, 68, 0.10);\n    color: #991b1b;\n  }\n\n  .coach-chip--signal[data-tone=\"weak\"] {\n    border-color: rgba(245, 158, 11, 0.32);\n    background: rgba(245, 158, 11, 0.12);\n    color: #92400e;\n  }\n\n  .coach-chip--signal[data-tone=\"neutral\"] {\n    border-color: rgba(148, 163, 184, 0.28);\n    background: rgba(241, 245, 249, 0.88);\n    color: #334155;\n  }\n\n  .coach-chip[data-status=\"New\"] { border-color: rgba(6, 182, 212, 0.35); background: rgba(6, 182, 212, 0.10); }\n  .coach-chip[data-status=\"Contacted\"] { border-color: rgba(245, 158, 11, 0.35); background: rgba(245, 158, 11, 0.10); }\n  .coach-chip[data-status=\"Nurture\"] { border-color: rgba(245, 158, 11, 0.35); background: rgba(245, 158, 11, 0.10); }\n  .coach-chip[data-status=\"Qualified\"] { border-color: rgba(16, 185, 129, 0.35); background: rgba(16, 185, 129, 0.10); }\n  .coach-chip[data-status=\"Converted\"] { border-color: rgba(99, 102, 241, 0.35); background: rgba(99, 102, 241, 0.10); }\n  .coach-chip[data-status=\"Lost\"] { border-color: rgba(239, 68, 68, 0.35); background: rgba(239, 68, 68, 0.10); }\n  .coach-chip[data-status=\"Disqualified\"] { border-color: rgba(239, 68, 68, 0.35); background: rgba(239, 68, 68, 0.10); }\n\n  .coach-body {\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n  }\n\n  // KPI row: always 3-up on desktop drawer widths, collapses to 1 column on mobile.\n  .coach-kpis {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    gap: 12px;\n  }\n\n  .coach-kpi {\n    border: 1px solid rgba(148, 163, 184, 0.28);\n    background: rgba(255, 255, 255, 0.75);\n    border-radius: 14px;\n    padding: 10px 12px;\n    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);\n    position: relative;\n    overflow: hidden;\n    transition: transform $transition-fast, box-shadow $transition-fast;\n  }\n\n  .coach-kpi::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background:\n      radial-gradient(240px 80px at 10% 0%, rgba(34, 211, 238, 0.18) 0%, transparent 60%),\n      radial-gradient(220px 90px at 95% 20%, rgba(99, 102, 241, 0.16) 0%, transparent 55%);\n    pointer-events: none;\n  }\n\n  .coach-kpi:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 18px 36px rgba(15, 23, 42, 0.10);\n  }\n\n  .kpi-label {\n    display: block;\n    font-size: 11px;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    color: $gray-500;\n    margin-bottom: 4px;\n    position: relative;\n  }\n\n  .kpi-value {\n    font-size: 20px;\n    font-weight: 950;\n    color: $gray-900;\n    position: relative;\n  }\n\n  .kpi-sub {\n    font-size: 12px;\n    font-weight: 800;\n    color: $gray-500;\n    margin-left: 4px;\n    position: relative;\n  }\n\n  .coach-block {\n    border: 1px solid rgba(148, 163, 184, 0.22);\n    background: rgba(255, 255, 255, 0.68);\n    border-radius: 16px;\n    padding: 12px;\n    box-shadow: 0 14px 28px rgba(15, 23, 42, 0.05);\n  }\n\n  .coach-block__title {\n    font-size: 12px;\n    font-weight: 900;\n    color: $gray-800;\n    margin: 0 0 10px;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n  }\n\n  .coach-signal-strip {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n    margin-bottom: 12px;\n  }\n\n  .coach-next-action {\n    border: 1px solid rgba(59, 130, 246, 0.18);\n    background: linear-gradient(135deg, rgba(239, 246, 255, 0.9) 0%, rgba(255, 255, 255, 0.88) 100%);\n    border-radius: 14px;\n    padding: 12px;\n  }\n\n  .coach-next-action__label {\n    display: block;\n    margin-bottom: 6px;\n    font-size: 11px;\n    font-weight: 900;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: #1d4ed8;\n  }\n\n  .coach-next-action p {\n    margin: 0;\n    font-size: 13px;\n    line-height: 1.45;\n    color: $gray-800;\n  }\n\n  .coach-hint {\n    margin: 0;\n    font-size: 12px;\n    color: $gray-500;\n  }\n\n  .cqvs-grid {\n    display: grid;\n    grid-template-columns: 1fr;\n    gap: 8px;\n  }\n\n  .cqvs-card {\n    --cqvs-accent: #3b82f6;\n    --cqvs-accent-weak: rgba(59, 130, 246, 0.14);\n    border: 1px solid rgba(148, 163, 184, 0.22);\n    background: rgba(255, 255, 255, 0.72);\n    border-radius: 14px;\n    padding: 10px 10px 12px;\n    transition: transform $transition-fast, box-shadow $transition-fast, border-color $transition-fast;\n  }\n\n  .cqvs-card:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 16px 30px rgba(15, 23, 42, 0.08);\n    border-color: rgba(59, 130, 246, 0.25);\n  }\n\n  .cqvs-card[data-cqvs=\"C\"] { --cqvs-accent: #06b6d4; --cqvs-accent-weak: rgba(6, 182, 212, 0.16); }\n  .cqvs-card[data-cqvs=\"Q\"] { --cqvs-accent: #10b981; --cqvs-accent-weak: rgba(16, 185, 129, 0.16); }\n  .cqvs-card[data-cqvs=\"V\"] { --cqvs-accent: #f59e0b; --cqvs-accent-weak: rgba(245, 158, 11, 0.18); }\n  .cqvs-card[data-cqvs=\"S\"] { --cqvs-accent: #6366f1; --cqvs-accent-weak: rgba(99, 102, 241, 0.16); }\n\n  .cqvs-card__head {\n    display: grid;\n    grid-template-columns: 28px 1fr auto;\n    align-items: center;\n    gap: 10px;\n    margin-bottom: 8px;\n  }\n\n  .cqvs-code {\n    width: 26px;\n    height: 26px;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 9px;\n    font-size: 12px;\n    font-weight: 950;\n    color: #0f172a;\n    background: var(--cqvs-accent-weak);\n    border: 1px solid rgba(148, 163, 184, 0.25);\n  }\n\n  .cqvs-title {\n    font-size: 12.5px;\n    font-weight: 900;\n    color: $gray-800;\n  }\n\n  .cqvs-score {\n    font-size: 12px;\n    font-weight: 900;\n    color: $gray-600;\n  }\n\n  .cqvs-bar {\n    height: 8px;\n    background: rgba(148, 163, 184, 0.22);\n    border-radius: 999px;\n    overflow: hidden;\n  }\n\n  .cqvs-bar__fill {\n    display: block;\n    height: 100%;\n    background: linear-gradient(90deg, var(--cqvs-accent) 0%, rgba(255, 255, 255, 0.15) 120%);\n    border-radius: inherit;\n  }\n\n  .weakest-row {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n\n  .weakest-row__text {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    min-width: 0;\n    flex: 1;\n  }\n\n  .weakest-row__top {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n    min-width: 0;\n  }\n\n  .weakest-row__top strong {\n    font-size: 13px;\n    font-weight: 950;\n    color: $gray-900;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  .state-pill {\n    flex: 0 0 auto;\n    display: inline-flex;\n    align-items: center;\n    padding: 4px 10px;\n    border-radius: 999px;\n    font-size: 11px;\n    font-weight: 900;\n    letter-spacing: 0.02em;\n    border: 1px solid rgba(148, 163, 184, 0.28);\n    background: rgba(255, 255, 255, 0.7);\n    color: $gray-700;\n    text-transform: capitalize;\n  }\n\n  .coach-list {\n    margin: 0;\n    padding-left: 16px;\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n\n    li {\n      font-size: 12px;\n      color: $gray-700;\n      line-height: 1.25;\n    }\n  }\n\n  .coach-list--flags li {\n    font-weight: 800;\n  }\n\n  .coach-footer {\n    position: sticky;\n    bottom: -14px; // counteracts drawer content padding so footer sits flush\n    margin: 2px -16px -14px;\n    padding: 12px 16px 14px;\n    background:\n      linear-gradient(180deg, rgba(248, 250, 252, 0.15) 0%, rgba(248, 250, 252, 0.85) 28%, rgba(255, 255, 255, 0.92) 100%);\n    border-top: 1px solid rgba(148, 163, 184, 0.22);\n    backdrop-filter: blur($glass-blur);\n  }\n\n  .coach-actions {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 12px;\n  }\n\n  .coach-action-btn.p-button {\n    width: 100%;\n    height: 44px;\n    border-radius: 14px;\n    justify-content: center;\n    gap: 10px;\n    font-weight: 800;\n    border: 1px solid rgba(99, 102, 241, 0.25);\n    background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(248, 250, 252, 0.6) 100%);\n    color: #0f172a;\n    transition: transform $transition-fast, box-shadow $transition-fast, background $transition-fast, border-color $transition-fast;\n  }\n\n  .coach-action-btn.p-button:hover {\n    transform: translateY(-1px);\n    background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(248, 250, 252, 0.75) 100%);\n    border-color: rgba(99, 102, 241, 0.4);\n    box-shadow: 0 12px 24px rgba(99, 102, 241, 0.16);\n  }\n\n  .coach-action-btn--convert.p-button {\n    border-color: rgba(16, 185, 129, 0.28);\n  }\n\n  .coach-action-btn--compose.p-button {\n    border-color: rgba(59, 130, 246, 0.26);\n  }\n\n  // Ensure the sticky footer doesn't cover the last section.\n  .p-drawer-content {\n    padding-bottom: 82px;\n  }\n\n  @media (max-width: 520px) {\n    width: 96vw;\n\n    .coach-title__name {\n      max-width: 220px;\n    }\n\n    .kpi-value {\n      font-size: 18px;\n    }\n\n    .coach-kpis {\n      grid-template-columns: 1fr;\n    }\n\n    .coach-actions {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n@media (max-width: 520px) {\n  :host ::ng-deep .lead-coach-drawer {\n    width: 96vw;\n  }\n\n  .coach-title__name {\n    max-width: 220px;\n  }\n\n  .kpi-value {\n    font-size: 18px;\n  }\n\n  .coach-kpis {\n    grid-template-columns: 1fr;\n  }\n\n  .coach-actions {\n    grid-template-columns: 1fr;\n  }\n}\n\n  .lead-info {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n\n    .name {\n      font-size: 14px;\n      font-weight: 600;\n      color: $gray-800;\n    }\n\n    .company {\n      font-size: 12px;\n      color: $gray-500;\n    }\n  }\n\n  .lead-sla {\n    margin-top: 4px;\n  }\n\n  .sla-chip {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    padding: 4px 9px;\n    border-radius: 999px;\n    font-size: 11px;\n    font-weight: 600;\n    border: 1px solid rgba(148, 163, 184, 0.4);\n    background: rgba(248, 250, 252, 0.9);\n    color: #475569;\n\n    i {\n      font-size: 11px;\n    }\n  }\n\n  .sla-chip.overdue {\n    background: rgba(239, 68, 68, 0.12);\n    color: #b91c1c;\n    border-color: rgba(239, 68, 68, 0.3);\n  }\n\n  .sla-chip.due {\n    background: rgba(245, 158, 11, 0.12);\n    color: #b45309;\n    border-color: rgba(245, 158, 11, 0.3);\n  }\n\n  .sla-chip.done {\n    background: rgba(34, 197, 94, 0.12);\n    color: #15803d;\n    border-color: rgba(34, 197, 94, 0.3);\n  }\n\n  .sla-chip.pending {\n    background: rgba(148, 163, 184, 0.12);\n    color: #475569;\n    border-color: rgba(148, 163, 184, 0.3);\n  }\n}\n\n.status-pill {\n  display: inline-flex;\n  align-items: center;\n  padding: 5px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n\n  &[data-status=\"New\"] {\n    background: rgba($status-new, 0.12);\n    color: color.adjust($status-new, $lightness: -15%);\n  }\n\n  &[data-status=\"Contacted\"] {\n    background: rgba($status-contacted, 0.12);\n    color: color.adjust($status-contacted, $lightness: -10%);\n  }\n\n  &[data-status=\"Qualified\"] {\n    background: rgba($status-qualified, 0.12);\n    color: color.adjust($status-qualified, $lightness: -15%);\n  }\n\n  &[data-status=\"Converted\"] {\n    background: rgba($status-converted, 0.12);\n    color: color.adjust($status-converted, $lightness: -10%);\n  }\n\n  &[data-status=\"Lost\"] {\n    background: rgba($status-lost, 0.12);\n    color: color.adjust($status-lost, $lightness: -10%);\n  }\n}\n\n.contact-cell {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n\n  .contact-link {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    font-size: 13px;\n    color: $gray-700;\n    text-decoration: none;\n    transition: color 0.15s ease;\n\n    i {\n      font-size: 12px;\n      color: $gray-400;\n    }\n\n    &:hover {\n      color: $status-qualified;\n    }\n  }\n\n  .contact-secondary {\n    font-size: 12px;\n    color: $gray-400;\n    padding-left: 18px;\n  }\n}\n\n.score-indicator {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n:host ::ng-deep .lead-score-gauge__knob {\n  .p-knob-text {\n    font-size: 0.9rem;\n    font-weight: 900;\n    fill: #0f172a;\n  }\n}\n\n:host ::ng-deep .lead-score-gauge__knob--table {\n  .p-knob-text {\n    font-size: 0.86rem;\n  }\n}\n\n.owner-cell {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n\n  .owner-avatar {\n    width: 28px;\n    height: 28px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: linear-gradient(135deg, $gray-200 0%, $gray-300 100%);\n    color: $gray-600;\n    border-radius: 50%;\n    font-size: 11px;\n    font-weight: 600;\n  }\n\n  .owner-name {\n    font-size: 13px;\n    color: $gray-700;\n  }\n}\n\n.toast-notification {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border-radius: 14px;\n  background: #0f172a;\n  color: #f8fafc;\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.25);\n  z-index: 50;\n  animation: toast-in 0.3s ease-out;\n\n  i {\n    font-size: 18px;\n  }\n\n  &.toast--success {\n    background: rgba(15, 118, 110, 0.95);\n  }\n\n  &.toast--error {\n    background: rgba(190, 24, 93, 0.95);\n  }\n}\n\n.toast-close {\n  border: none;\n  background: transparent;\n  color: inherit;\n  cursor: pointer;\n  margin-left: auto;\n}\n\n@keyframes toast-in {\n  from {\n    transform: translateY(12px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// TABLE FOOTER\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.table-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n  flex-wrap: wrap;\n  gap: 16px;\n}\n\n.pagination-info {\n  font-size: 13px;\n  color: $gray-500;\n\n  strong {\n    color: $gray-700;\n  }\n}\n\n::ng-deep .custom-paginator {\n  .p-paginator {\n    background: transparent;\n    border: none;\n    padding: 0;\n    gap: 4px;\n  }\n\n  .p-paginator-page,\n  .p-paginator-prev,\n  .p-paginator-next,\n  .p-paginator-first,\n  .p-paginator-last {\n    min-width: 32px;\n    height: 32px;\n    border-radius: 8px;\n    font-size: 13px;\n    transition: all 0.15s ease;\n\n    &:hover:not(.p-disabled) {\n      background: rgba(0, 0, 0, 0.06);\n    }\n\n    &.p-paginator-page-selected {\n      background: $status-qualified;\n      color: white;\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// LOADING & EMPTY STATES\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.skeleton-table {\n  padding: 8px 16px;\n}\n\n.skeleton-row {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n}\n\n.skeleton {\n  background: linear-gradient(90deg, $gray-100 25%, $gray-50 50%, $gray-100 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n  border-radius: 6px;\n\n  &-checkbox { width: 18px; height: 18px; border-radius: 4px; }\n  &-avatar { width: 38px; height: 38px; border-radius: 10px; }\n  &-text {\n    height: 14px;\n    &.long { width: 160px; }\n    &.medium { width: 120px; }\n    &.short { width: 80px; }\n  }\n  &-badge { width: 80px; height: 26px; border-radius: 13px; }\n  &-bar { width: 70px; height: 6px; }\n  &-actions { width: 68px; height: 32px; }\n}\n\n@keyframes shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 80px 40px;\n  text-align: center;\n\n  .empty-illustration {\n    width: 80px;\n    height: 80px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: linear-gradient(135deg, rgba($status-new, 0.1) 0%, rgba($status-qualified, 0.1) 100%);\n    border-radius: 20px;\n    margin-bottom: 20px;\n\n    i {\n      font-size: 32px;\n      background: linear-gradient(135deg, $status-new 0%, $status-qualified 100%);\n      -webkit-background-clip: text;\n      -webkit-text-fill-color: transparent;\n      background-clip: text;\n    }\n  }\n\n  h3 {\n    font-size: 18px;\n    font-weight: 600;\n    color: $gray-800;\n    margin: 0 0 8px;\n  }\n\n  p {\n    font-size: 14px;\n    color: $gray-500;\n    margin: 0 0 24px;\n    max-width: 300px;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DIALOG & FORM\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.lead-form {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 16px;\n}\n\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n\n  label {\n    font-size: 13px;\n    font-weight: 500;\n    color: $gray-700;\n\n    .required {\n      color: $status-lost;\n    }\n  }\n\n  input {\n    padding: 10px 14px;\n    border: 1px solid rgba(0, 0, 0, 0.12);\n    border-radius: 10px;\n    font-size: 14px;\n    color: $gray-800;\n    transition: all 0.15s ease;\n\n    &::placeholder {\n      color: $gray-400;\n    }\n\n    &:focus {\n      outline: none;\n      border-color: $status-qualified;\n      box-shadow: 0 0 0 3px rgba($status-qualified, 0.1);\n    }\n  }\n}\n\n::ng-deep .form-select {\n  .p-select {\n    border-radius: 10px;\n    border-color: rgba(0, 0, 0, 0.12);\n\n    &:hover {\n      border-color: rgba(0, 0, 0, 0.2);\n    }\n\n    &.p-focus {\n      border-color: $status-qualified;\n      box-shadow: 0 0 0 3px rgba($status-qualified, 0.1);\n    }\n  }\n}\n\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding-top: 16px;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// RESPONSIVE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@media (max-width: 768px) {\n  .page-container {\n    padding: 16px;\n  }\n\n  .page-header {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .header-right {\n    justify-content: flex-start;\n    flex-wrap: wrap;\n  }\n\n  .kpi-strip {\n    padding: 12px;\n    gap: 4px;\n  }\n\n  .kpi-divider {\n    display: none;\n  }\n\n  .action-bar {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .search-box {\n    max-width: 100%;\n  }\n\n  .quick-filters {\n    justify-content: center;\n  }\n\n  .hero-section {\n    gap: $space-3;\n  }\n\n  .hero-visual {\n    flex-direction: row;\n    overflow-x: auto;\n    gap: $space-2;\n    padding-bottom: $space-1;\n  }\n\n  .visual-card {\n    min-width: 160px;\n    padding: $space-2 $space-3;\n\n    .card-icon {\n      width: 32px;\n      height: 32px;\n      font-size: $font-size-base;\n    }\n\n    .card-value {\n      font-size: $font-size-lg;\n    }\n\n    .card-label {\n      font-size: 0.6875rem;\n    }\n  }\n\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n\n  // Allow the table to scroll horizontally on narrow screens.\n  .table-container {\n    overflow-x: auto;\n  }\n\n  .leads-table {\n    min-width: 520px;\n\n    // Hide lower-priority columns on mobile\n    .th-contact, .td-contact,\n    .th-owner, .td-owner {\n      display: none;\n    }\n\n    thead th {\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n\n    .th-lead { min-width: 160px; }\n    .th-score { width: 100px; }\n    .th-actions { width: 80px; }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DARK MODE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n:host-context(.dark-theme) {\n  .page-background {\n    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);\n  }\n\n  .animated-orb {\n    opacity: 0.2;\n  }\n\n  .grid-pattern {\n    background-image:\n      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),\n      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);\n  }\n\n  .page-title {\n    .title-count {\n      background: rgba(255, 255, 255, 0.08);\n      color: rgba(255, 255, 255, 0.6);\n    }\n  }\n\n  .breadcrumb {\n    color: rgba(255, 255, 255, 0.4);\n\n    .breadcrumb-current {\n      color: rgba(255, 255, 255, 0.8);\n    }\n  }\n\n  .view-toggle {\n    background: rgba(255, 255, 255, 0.06);\n\n    .toggle-btn {\n      color: rgba(255, 255, 255, 0.5);\n\n      &:hover {\n        color: rgba(255, 255, 255, 0.8);\n      }\n\n      &.active {\n        background: rgba(255, 255, 255, 0.1);\n        color: white;\n      }\n    }\n  }\n\n  .btn-icon {\n    background: rgba(255, 255, 255, 0.06);\n    border-color: rgba(255, 255, 255, 0.08);\n    color: rgba(255, 255, 255, 0.7);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.1);\n    }\n  }\n\n  .kpi-strip,\n  .glass-card,\n  .data-table-section {\n    background: rgba(30, 41, 59, 0.8);\n    border-color: rgba(255, 255, 255, 0.06);\n  }\n\n  .kpi-value {\n    color: white;\n  }\n\n  .kpi-label {\n    color: rgba(255, 255, 255, 0.5);\n  }\n\n  .kpi-divider {\n    background: rgba(255, 255, 255, 0.08);\n  }\n\n  .kpi-card.clickable:hover {\n    background: rgba(255, 255, 255, 0.04);\n  }\n\n  .search-box input {\n    background: rgba(255, 255, 255, 0.06);\n    border-color: rgba(255, 255, 255, 0.08);\n    color: white;\n\n    &::placeholder {\n      color: rgba(255, 255, 255, 0.4);\n    }\n  }\n\n  .filter-chip {\n    border-color: rgba(255, 255, 255, 0.1);\n    color: rgba(255, 255, 255, 0.7);\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.06);\n    }\n  }\n\n  .kanban-column {\n    background: rgba(255, 255, 255, 0.03);\n  }\n\n  .column-header .column-count {\n    background: rgba(255, 255, 255, 0.08);\n    color: rgba(255, 255, 255, 0.7);\n  }\n\n  .lead-card {\n    background: rgba(30, 41, 59, 0.9);\n    border-color: rgba(255, 255, 255, 0.06);\n\n    &:hover {\n      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n    }\n  }\n\n  .lead-meta .lead-name {\n    color: white;\n  }\n\n  .lead-meta .lead-company,\n  .lead-detail,\n  .lead-owner {\n    color: rgba(255, 255, 255, 0.5);\n  }\n\n  .epistemic-chip {\n    background: rgba(255, 255, 255, 0.08);\n    color: rgba(255, 255, 255, 0.7);\n    border-color: rgba(255, 255, 255, 0.12);\n  }\n\n  .epistemic-chip.truth {\n    background: rgba(16, 185, 129, 0.2);\n    border-color: rgba(16, 185, 129, 0.25);\n    color: #6ee7b7;\n  }\n\n  .epistemic-chip.weakest {\n    background: rgba(245, 158, 11, 0.2);\n    border-color: rgba(245, 158, 11, 0.25);\n    color: #fcd34d;\n  }\n\n  .epistemic-chip.confidence {\n    background: rgba(96, 165, 250, 0.25);\n    border-color: rgba(96, 165, 250, 0.32);\n    color: #bfdbfe;\n  }\n\n  .leads-table {\n    thead th {\n      background: rgba(0, 0, 0, 0.2);\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .table-row:hover {\n    background: rgba($status-qualified, 0.08);\n  }\n\n  .lead-cell .lead-info .name {\n    color: white;\n  }\n\n  .lead-cell .lead-info .company {\n    color: rgba(255, 255, 255, 0.5);\n  }\n\n  .contact-cell .contact-link {\n    color: rgba(255, 255, 255, 0.8);\n  }\n\n  .contact-cell .contact-secondary {\n    color: rgba(255, 255, 255, 0.4);\n  }\n\n  .lead-score-gauge {\n    background: linear-gradient(180deg, rgba(30, 41, 59, 0.72), rgba(15, 23, 42, 0.66));\n    border-color: rgba(148, 163, 184, 0.18);\n  }\n\n  .owner-cell .owner-name {\n    color: rgba(255, 255, 255, 0.8);\n  }\n\n  .pagination-info {\n    color: rgba(255, 255, 255, 0.5);\n\n    strong {\n      color: rgba(255, 255, 255, 0.8);\n    }\n  }\n\n  .empty-state {\n    h3 {\n      color: white;\n    }\n\n    p {\n      color: rgba(255, 255, 255, 0.5);\n    }\n  }\n\n  .skeleton {\n    background: linear-gradient(90deg, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.05) 75%);\n  }\n\n  .import-dialog {\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n\n    .import-note {\n      margin: 0;\n      color: rgba(255, 255, 255, 0.6);\n    }\n\n    .import-upload {\n      border: 1px dashed rgba(255, 255, 255, 0.25);\n      border-radius: 12px;\n      padding: 16px;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 12px;\n      cursor: pointer;\n      background: rgba(255, 255, 255, 0.04);\n\n      input {\n        display: none;\n      }\n\n      span {\n        font-weight: 600;\n        color: white;\n      }\n    }\n\n    .import-actions {\n      display: flex;\n      justify-content: flex-end;\n      gap: 12px;\n    }\n\n    .import-error {\n      color: #fca5a5;\n      font-weight: 600;\n    }\n\n    .import-result {\n      background: rgba(15, 23, 42, 0.35);\n      border-radius: 12px;\n      padding: 12px 14px;\n      border: 1px solid rgba(255, 255, 255, 0.08);\n\n      .import-metrics {\n        display: flex;\n        gap: 16px;\n        font-weight: 600;\n        color: white;\n      }\n\n      .import-errors {\n        margin-top: 8px;\n        color: rgba(255, 255, 255, 0.65);\n\n        ul {\n          margin: 6px 0 0;\n          padding-left: 18px;\n        }\n      }\n    }\n  }\n}\n"] }]
    }], () => [{ type: i1.LeadDataService }, { type: i2.Router }, { type: i3.UserAdminDataService }, { type: i4.ImportJobService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LeadsPage, { className: "LeadsPage", filePath: "src/app/crm/features/leads/pages/leads.page.ts", lineNumber: 109 }); })();
