import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { KnobModule } from 'primeng/knob';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { ActivityDataService } from '../../activities/services/activity-data.service';
import { ContactDataService } from '../../contacts/services/contact-data.service';
import { OpportunityDataService } from '../../opportunities/services/opportunity-data.service';
import { AttachmentDataService } from '../../../../shared/services/attachment-data.service';
import { PropertyDataService } from '../../properties/services/property-data.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { readUserId } from '../../../../core/auth/token.utils';
import { FormDraftService } from '../../../../core/drafts/form-draft.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../services/customer-data.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "primeng/button";
import * as i6 from "primeng/api";
import * as i7 from "primeng/inputtext";
import * as i8 from "primeng/textarea";
import * as i9 from "primeng/select";
import * as i10 from "primeng/tabs";
import * as i11 from "primeng/table";
import * as i12 from "primeng/tag";
import * as i13 from "primeng/fileupload";
import * as i14 from "primeng/inputgroup";
import * as i15 from "primeng/inputgroupaddon";
import * as i16 from "primeng/inputnumber";
import * as i17 from "primeng/dialog";
import * as i18 from "primeng/knob";
import * as i19 from "primeng/splitbutton";
const _c0 = () => ({ width: "38rem", maxWidth: "96vw" });
const _c1 = () => ({ width: "28rem", maxWidth: "94vw" });
const _c2 = () => ({ width: "36rem", maxWidth: "96vw" });
const _c3 = () => ({ width: "42rem", maxWidth: "96vw" });
const _c4 = a0 => ["/app/customers", a0];
const _c5 = () => ({ standalone: true });
const _c6 = a0 => ({ customerId: a0 });
const _c7 = a0 => ["/app/contacts", a0, "edit"];
const _c8 = a0 => ["/app/deals", a0, "edit"];
const _c9 = a0 => ["/app/properties", a0];
function CustomerFormPage_div_12_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 143)(1, "span", 144);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 145);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 146)(6, "button", 147);
    i0.ɵɵlistener("click", function CustomerFormPage_div_12_div_1_Template_button_click_6_listener() { const draft_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.loadDraftFromPrompt(draft_r3)); });
    i0.ɵɵtext(7, "Load draft");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const draft_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(draft_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", draft_r3.subtitle || "No industry", " \u00B7 ", ctx_r3.formatDraftTimestamp(draft_r3.updatedAtUtc));
} }
function CustomerFormPage_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 141);
    i0.ɵɵtemplate(1, CustomerFormPage_div_12_div_1_Template, 8, 3, "div", 142);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.recentDrafts());
} }
function CustomerFormPage_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 148);
    i0.ɵɵtext(1, "No saved drafts available.");
    i0.ɵɵelementEnd();
} }
function CustomerFormPage_p_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 148);
    i0.ɵɵtext(1, "No saved drafts yet.");
    i0.ɵɵelementEnd();
} }
function CustomerFormPage_div_43_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 143)(1, "span", 144);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 145);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 146)(6, "button", 147);
    i0.ɵɵlistener("click", function CustomerFormPage_div_43_div_1_Template_button_click_6_listener() { const draft_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.openDraftFromSummary(draft_r6)); });
    i0.ɵɵtext(7, "Resume");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 149);
    i0.ɵɵlistener("click", function CustomerFormPage_div_43_div_1_Template_button_click_8_listener($event) { const draft_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.discardDraft(draft_r6, $event)); });
    i0.ɵɵtext(9, "Discard");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const draft_r6 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(draft_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", draft_r6.subtitle || "No industry", " \u00B7 ", ctx_r3.formatDraftTimestamp(draft_r6.updatedAtUtc));
} }
function CustomerFormPage_div_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 141);
    i0.ɵɵtemplate(1, CustomerFormPage_div_43_div_1_Template, 10, 3, "div", 142);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.draftLibraryItems());
} }
function CustomerFormPage_div_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 150)(1, "div", 151);
    i0.ɵɵelement(2, "p-knob", 152);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 153)(4, "span", 154);
    i0.ɵɵtext(5, "Overall customer score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 155)(7, "span", 156);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 157);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p", 158);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngModel", ctx_r3.customerHeaderScoreValue())("readonly", true)("valueTemplate", "{value}%")("size", 92)("strokeWidth", 9)("showValue", true)("min", 0)("max", 100);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("--customer-header-score-color", ctx_r3.customerHeaderScoreColor());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.form.lifecycleStage || "Lead");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.customerLifecycleSummary());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.customerHeaderScoreMessage());
} }
function CustomerFormPage_div_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 159);
    i0.ɵɵelement(1, "i", 8);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const draftStatus_r7 = ctx.ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(draftStatus_r7);
} }
function CustomerFormPage_div_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 160);
    i0.ɵɵelement(1, "i", 161);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "This form is loaded from a saved draft. Final Save will create or update the live CRM record.");
    i0.ɵɵelementEnd()();
} }
function CustomerFormPage_div_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 162);
    i0.ɵɵelement(1, "i", 163);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.viewingPresenceSummary());
} }
function CustomerFormPage_div_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 164);
    i0.ɵɵelement(1, "i", 165);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.editingPresenceSummary());
} }
function CustomerFormPage_section_65_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 171);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Last added ", i0.ɵɵpipeBind2(2, 1, ctx_r3.latestContactCreatedAt(), "MMM d, yyyy"), " ");
} }
function CustomerFormPage_section_65_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 171);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Last added ", i0.ɵɵpipeBind2(2, 1, ctx_r3.latestOpportunityCreatedAt(), "MMM d, yyyy"), " ");
} }
function CustomerFormPage_section_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 166)(1, "div", 167)(2, "span", 168);
    i0.ɵɵtext(3, "Contacts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 169);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CustomerFormPage_section_65_span_6_Template, 3, 4, "span", 170);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 167)(8, "span", 168);
    i0.ɵɵtext(9, "Opportunities");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 169);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, CustomerFormPage_section_65_span_12_Template, 3, 4, "span", 170);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.contactCount());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.latestContactCreatedAt());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.opportunityCount());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.latestOpportunityCreatedAt());
} }
function CustomerFormPage_div_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 172);
    i0.ɵɵelement(1, "i", 173);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Possible duplicate found: ");
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "a", 174);
    i0.ɵɵtext(7, "View existing record");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const dup_r8 = ctx.ngIf;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(dup_r8.matchName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(2, _c4, dup_r8.matchId));
} }
function CustomerFormPage_p_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 175);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.nameError());
} }
function CustomerFormPage_ng_template_114_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 176);
    i0.ɵɵelement(1, "i", 177);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r9.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r9.label);
} }
function CustomerFormPage_ng_template_115_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 176);
    i0.ɵɵelement(1, "i", 177);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r10.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r10.label);
} }
function CustomerFormPage_ng_template_115_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 180);
    i0.ɵɵtext(1, "Select type");
    i0.ɵɵelementEnd();
} }
function CustomerFormPage_ng_template_115_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CustomerFormPage_ng_template_115_div_0_Template, 4, 2, "div", 178)(1, CustomerFormPage_ng_template_115_span_1_Template, 2, 0, "span", 179);
} if (rf & 2) {
    const option_r10 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r10);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r10);
} }
function CustomerFormPage_ng_template_120_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 176);
    i0.ɵɵelement(1, "i", 177);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r11 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r11.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r11.label);
} }
function CustomerFormPage_ng_template_121_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 176);
    i0.ɵɵelement(1, "i", 177);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r12 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r12.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r12.label);
} }
function CustomerFormPage_ng_template_121_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 180);
    i0.ɵɵtext(1, "Select rating");
    i0.ɵɵelementEnd();
} }
function CustomerFormPage_ng_template_121_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CustomerFormPage_ng_template_121_div_0_Template, 4, 2, "div", 178)(1, CustomerFormPage_ng_template_121_span_1_Template, 2, 0, "span", 179);
} if (rf & 2) {
    const option_r12 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r12);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r12);
} }
function CustomerFormPage_ng_template_126_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 176);
    i0.ɵɵelement(1, "i", 177);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r13 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r13.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r13.label);
} }
function CustomerFormPage_ng_template_127_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 176);
    i0.ɵɵelement(1, "i", 177);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r14 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r14.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r14.label);
} }
function CustomerFormPage_ng_template_127_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 180);
    i0.ɵɵtext(1, "Select source");
    i0.ɵɵelementEnd();
} }
function CustomerFormPage_ng_template_127_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CustomerFormPage_ng_template_127_div_0_Template, 4, 2, "div", 178)(1, CustomerFormPage_ng_template_127_span_1_Template, 2, 0, "span", 179);
} if (rf & 2) {
    const option_r14 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r14);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r14);
} }
function CustomerFormPage_section_267_div_17_div_1_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const activity_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2022 ", activity_r16.ownerName);
} }
function CustomerFormPage_section_267_div_17_div_1_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 212);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const activity_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(activity_r16.description);
} }
function CustomerFormPage_section_267_div_17_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 204)(1, "div", 205)(2, "span", 206);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 207)(5, "div", 208);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 209)(8, "span");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, CustomerFormPage_section_267_div_17_div_1_span_11_Template, 2, 1, "span", 210);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, CustomerFormPage_section_267_div_17_div_1_div_12_Template, 2, 1, "div", 211);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const activity_r16 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-type", activity_r16.type);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(activity_r16.type);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(activity_r16.subject);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 6, activity_r16.createdAtUtc, "MMM d, yyyy \u00B7 h:mm a"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", activity_r16.ownerName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", activity_r16.description);
} }
function CustomerFormPage_section_267_div_17_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 213);
    i0.ɵɵelement(1, "i", 214);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No activity yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "a", 215);
    i0.ɵɵtext(5, "+ Log first activity");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("queryParams", i0.ɵɵpureFunction1(1, _c6, ctx_r3.customerId));
} }
function CustomerFormPage_section_267_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 202);
    i0.ɵɵtemplate(1, CustomerFormPage_section_267_div_17_div_1_Template, 13, 9, "div", 203)(2, CustomerFormPage_section_267_div_17_div_2_Template, 6, 3, "div", 199);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.activities());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.activities().length);
} }
function CustomerFormPage_section_267_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 213);
    i0.ɵɵtext(1, "Loading timeline...");
    i0.ɵɵelementEnd();
} }
function CustomerFormPage_section_267_div_26_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 218)(1, "div", 219)(2, "span", 220);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 221);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 222);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const note_r17 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(note_r17.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 3, note_r17.createdAtUtc, "MMM d, yyyy \u00B7 h:mm a"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(note_r17.description);
} }
function CustomerFormPage_section_267_div_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 216);
    i0.ɵɵtemplate(1, CustomerFormPage_section_267_div_26_div_1_Template, 9, 6, "div", 217);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.notes());
} }
function CustomerFormPage_section_267_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 213);
    i0.ɵɵelement(1, "i", 132);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No notes yet. Use the editor above to add one.");
    i0.ɵɵelementEnd()();
} }
function CustomerFormPage_section_267_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Phone");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Created");
    i0.ɵɵelementEnd()();
} }
function CustomerFormPage_section_267_ng_template_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 223)(1, "td")(2, "span", 224);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r18 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(9, _c7, row_r18.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r18.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r18.email || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r18.phone || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r18.owner || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 6, row_r18.createdAt, "MMM d, yyyy"));
} }
function CustomerFormPage_section_267_div_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 213);
    i0.ɵɵelement(1, "i", 86);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No contacts linked.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "a", 225);
    i0.ɵɵtext(5, "+ Add contact");
    i0.ɵɵelementEnd()();
} }
function CustomerFormPage_section_267_ng_template_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Stage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Created");
    i0.ɵɵelementEnd()();
} }
function CustomerFormPage_section_267_ng_template_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 223)(1, "td")(2, "span", 224);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵelement(5, "p-tag", 226);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r19 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(14, _c8, row_r19.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r19.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", row_r19.stage);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(8, 6, row_r19.amount, row_r19.currency, "symbol", "1.0-0"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r19.owner || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 11, row_r19.createdAtUtc, "MMM d, yyyy"));
} }
function CustomerFormPage_section_267_div_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 213);
    i0.ɵɵelement(1, "i", 227);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No opportunities yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "a", 228);
    i0.ɵɵtext(5, "+ Create deal");
    i0.ɵɵelementEnd()();
} }
function CustomerFormPage_section_267_ng_template_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Address");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Price");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "MLS #");
    i0.ɵɵelementEnd()();
} }
function CustomerFormPage_section_267_ng_template_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 223)(1, "td")(2, "span", 224);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵelement(5, "p-tag", 226);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r20 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(11, _c9, row_r20.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r20.address);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", row_r20.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r20.propertyType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(10, 6, row_r20.listPrice, row_r20.currency, "symbol", "1.0-0"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r20.mlsNumber || "\u2014");
} }
function CustomerFormPage_section_267_div_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 213);
    i0.ɵɵelement(1, "i", 229);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No properties linked.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "a", 230);
    i0.ɵɵtext(5, "+ Add property");
    i0.ɵɵelementEnd()();
} }
function CustomerFormPage_section_267_ng_template_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "File");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Uploaded by");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Size");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "th");
    i0.ɵɵelementEnd();
} }
function CustomerFormPage_section_267_ng_template_57_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 231)(9, "button", 232);
    i0.ɵɵlistener("click", function CustomerFormPage_section_267_ng_template_57_Template_button_click_9_listener() { const row_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.downloadAttachment(row_r22)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r22 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r22.fileName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r22.uploadedBy || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(7, 3, row_r22.size), " bytes");
} }
function CustomerFormPage_section_267_div_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 213);
    i0.ɵɵelement(1, "i", 233);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No attachments yet. Use the upload button above.");
    i0.ɵɵelementEnd()();
} }
function CustomerFormPage_section_267_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 181)(1, "section", 182)(2, "h2", 49);
    i0.ɵɵelement(3, "i", 68);
    i0.ɵɵtext(4, " Customer workspace ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p-tabs", 183)(6, "p-tablist")(7, "p-tab", 183);
    i0.ɵɵtext(8, "Timeline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p-tab", 184);
    i0.ɵɵtext(10, "Notes");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p-tab", 185);
    i0.ɵɵtext(12, "Related records");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p-tab", 186);
    i0.ɵɵtext(14, "Attachments");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "p-tabpanels")(16, "p-tabpanel", 183);
    i0.ɵɵtemplate(17, CustomerFormPage_section_267_div_17_Template, 3, 2, "div", 187)(18, CustomerFormPage_section_267_ng_template_18_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p-tabpanel", 184)(21, "div", 188)(22, "div", 189)(23, "textarea", 190);
    i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_section_267_Template_textarea_ngModelChange_23_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.noteText, $event) || (ctx_r3.noteText = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 191)(25, "button", 192);
    i0.ɵɵlistener("click", function CustomerFormPage_section_267_Template_button_click_25_listener() { i0.ɵɵrestoreView(_r15); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.addNote()); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(26, CustomerFormPage_section_267_div_26_Template, 2, 1, "div", 193)(27, CustomerFormPage_section_267_ng_template_27_Template, 4, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(29, "p-tabpanel", 185)(30, "div", 194)(31, "div", 195)(32, "h3");
    i0.ɵɵtext(33, "Contacts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "p-table", 196);
    i0.ɵɵtemplate(35, CustomerFormPage_section_267_ng_template_35_Template, 11, 0, "ng-template", 197)(36, CustomerFormPage_section_267_ng_template_36_Template, 13, 11, "ng-template", 198);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(37, CustomerFormPage_section_267_div_37_Template, 6, 0, "div", 199);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "div", 195)(39, "h3");
    i0.ɵɵtext(40, "Opportunities");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "p-table", 196);
    i0.ɵɵtemplate(42, CustomerFormPage_section_267_ng_template_42_Template, 11, 0, "ng-template", 197)(43, CustomerFormPage_section_267_ng_template_43_Template, 14, 16, "ng-template", 198);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(44, CustomerFormPage_section_267_div_44_Template, 6, 0, "div", 199);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "div", 195)(46, "h3");
    i0.ɵɵtext(47, "Properties");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "p-table", 196);
    i0.ɵɵtemplate(49, CustomerFormPage_section_267_ng_template_49_Template, 11, 0, "ng-template", 197)(50, CustomerFormPage_section_267_ng_template_50_Template, 13, 13, "ng-template", 198);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(51, CustomerFormPage_section_267_div_51_Template, 6, 0, "div", 199);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(52, "p-tabpanel", 186)(53, "div", 200)(54, "p-fileUpload", 201);
    i0.ɵɵlistener("uploadHandler", function CustomerFormPage_section_267_Template_p_fileUpload_uploadHandler_54_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onAttachmentUpload($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "p-table", 196);
    i0.ɵɵtemplate(56, CustomerFormPage_section_267_ng_template_56_Template, 8, 0, "ng-template", 197)(57, CustomerFormPage_section_267_ng_template_57_Template, 10, 5, "ng-template", 198);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(58, CustomerFormPage_section_267_div_58_Template, 4, 0, "div", 199);
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const timelineLoadingTpl_r23 = i0.ɵɵreference(19);
    const notesEmpty_r24 = i0.ɵɵreference(28);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(17);
    i0.ɵɵproperty("ngIf", !ctx_r3.timelineLoading())("ngIfElse", timelineLoadingTpl_r23);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.noteText);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(25, _c5));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r3.noteText.trim() || ctx_r3.noteSaving());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.notes().length)("ngIfElse", notesEmpty_r24);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("value", ctx_r3.relatedContactsSorted())("paginator", false)("rows", 5);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r3.relatedContacts().length);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r3.relatedOpportunitiesSorted())("paginator", false)("rows", 5);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r3.relatedOpportunities().length);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r3.relatedPropertiesSorted())("paginator", false)("rows", 5);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r3.relatedProperties().length);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("customUpload", true)("auto", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r3.attachments())("paginator", false)("rows", 5);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r3.attachments().length);
} }
export class CustomerFormPage {
    router;
    route;
    customerData;
    statusOptions = [
        { label: 'Lead', value: 'Lead' },
        { label: 'Prospect', value: 'Prospect' },
        { label: 'Customer', value: 'Customer' }
    ];
    accountTypeOptions = [
        { label: 'Customer', value: 'Customer', icon: 'pi-users' },
        { label: 'Partner', value: 'Partner', icon: 'pi-handshake' },
        { label: 'Competitor', value: 'Competitor', icon: 'pi-bolt' },
        { label: 'Vendor', value: 'Vendor', icon: 'pi-truck' }
    ];
    ratingOptions = [
        { label: 'Hot', value: 'Hot', icon: 'pi-sun' },
        { label: 'Warm', value: 'Warm', icon: 'pi-cloud' },
        { label: 'Cold', value: 'Cold', icon: 'pi-snowflake' }
    ];
    accountSourceOptions = [
        { label: 'Web', value: 'Web', icon: 'pi-globe' },
        { label: 'Referral', value: 'Referral', icon: 'pi-share-alt' },
        { label: 'Partner', value: 'Partner', icon: 'pi-handshake' },
        { label: 'Trade Show', value: 'Trade Show', icon: 'pi-calendar' },
        { label: 'Other', value: 'Other', icon: 'pi-ellipsis-h' }
    ];
    isEditMode = signal(false, ...(ngDevMode ? [{ debugName: "isEditMode" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    draftSaving = signal(false, ...(ngDevMode ? [{ debugName: "draftSaving" }] : []));
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    recentDrafts = signal([], ...(ngDevMode ? [{ debugName: "recentDrafts" }] : []));
    draftLibraryVisible = signal(false, ...(ngDevMode ? [{ debugName: "draftLibraryVisible" }] : []));
    draftLibraryLoading = signal(false, ...(ngDevMode ? [{ debugName: "draftLibraryLoading" }] : []));
    draftLibraryItems = signal([], ...(ngDevMode ? [{ debugName: "draftLibraryItems" }] : []));
    draftStatusMessage = signal(null, ...(ngDevMode ? [{ debugName: "draftStatusMessage" }] : []));
    draftModeActive = signal(false, ...(ngDevMode ? [{ debugName: "draftModeActive" }] : []));
    draftPromptVisible = signal(false, ...(ngDevMode ? [{ debugName: "draftPromptVisible" }] : []));
    draftOpenConfirmVisible = signal(false, ...(ngDevMode ? [{ debugName: "draftOpenConfirmVisible" }] : []));
    leavePromptVisible = signal(false, ...(ngDevMode ? [{ debugName: "leavePromptVisible" }] : []));
    activeDraftId = signal(null, ...(ngDevMode ? [{ debugName: "activeDraftId" }] : []));
    nameError = signal(null, ...(ngDevMode ? [{ debugName: "nameError" }] : []));
    toastService = inject(AppToastService);
    activityData = inject(ActivityDataService);
    contactData = inject(ContactDataService);
    opportunityData = inject(OpportunityDataService);
    attachmentData = inject(AttachmentDataService);
    propertyData = inject(PropertyDataService);
    crmEvents = inject(CrmEventsService);
    formDraftService = inject(FormDraftService);
    destroyRef = inject(DestroyRef);
    currentUserId = readUserId();
    customerId = null;
    activities = signal([], ...(ngDevMode ? [{ debugName: "activities" }] : []));
    notes = signal([], ...(ngDevMode ? [{ debugName: "notes" }] : []));
    relatedContacts = signal([], ...(ngDevMode ? [{ debugName: "relatedContacts" }] : []));
    relatedOpportunities = signal([], ...(ngDevMode ? [{ debugName: "relatedOpportunities" }] : []));
    attachments = signal([], ...(ngDevMode ? [{ debugName: "attachments" }] : []));
    relatedProperties = signal([], ...(ngDevMode ? [{ debugName: "relatedProperties" }] : []));
    timelineLoading = signal(false, ...(ngDevMode ? [{ debugName: "timelineLoading" }] : []));
    noteSaving = signal(false, ...(ngDevMode ? [{ debugName: "noteSaving" }] : []));
    parentAccountOptions = signal([], ...(ngDevMode ? [{ debugName: "parentAccountOptions" }] : []));
    presenceUsers = signal([], ...(ngDevMode ? [{ debugName: "presenceUsers" }] : []));
    duplicateWarning = signal(null, ...(ngDevMode ? [{ debugName: "duplicateWarning" }] : []));
    duplicateCheckTimer = null;
    pendingDraftToOpen = null;
    hasShownDraftPrompt = false;
    originalFormSnapshot = '';
    pendingLeaveResolver = null;
    pendingLeaveDecision = null;
    leaveAfterSave = false;
    leaveAfterDraftSave = false;
    noteText = '';
    localEditingState = false;
    editingIdleTimer = null;
    form = {
        name: '',
        lifecycleStage: 'Lead',
        phone: '',
        website: '',
        industry: '',
        description: '',
        email: '',
        company: '',
        address: '',
        parentAccountId: undefined,
        territory: '',
        annualRevenue: undefined,
        numberOfEmployees: undefined,
        accountType: undefined,
        rating: undefined,
        accountSource: undefined,
        billingStreet: '',
        billingCity: '',
        billingState: '',
        billingPostalCode: '',
        billingCountry: '',
        shippingStreet: '',
        shippingCity: '',
        shippingState: '',
        shippingPostalCode: '',
        shippingCountry: ''
    };
    constructor(router, route, customerData) {
        this.router = router;
        this.route = route;
        this.customerData = customerData;
    }
    ngOnInit() {
        this.customerId = this.route.snapshot.paramMap.get('id');
        this.loadRecentDrafts();
        if (this.customerId) {
            this.initializePresence(this.customerId);
            this.isEditMode.set(true);
            this.loadCustomer();
            this.loadDetailData();
        }
        else {
            this.captureFormSnapshot();
        }
        this.customerData.search({ page: 1, pageSize: 200 }).subscribe((res) => {
            const items = res.items
                .filter((item) => item.id !== this.customerId)
                .map((item) => ({ label: item.name, value: item.id }));
            setTimeout(() => {
                this.parentAccountOptions.set(items);
            }, 0);
        });
    }
    ngOnDestroy() {
        this.resolvePendingLeave(false);
        this.clearEditingIdleTimer();
        if (this.customerId) {
            this.crmEvents.setRecordEditingState('customer', this.customerId, false);
            this.crmEvents.leaveRecordPresence('customer', this.customerId);
        }
    }
    onCollaborativeEditingActivity() {
        if (!this.customerId || !this.isEditMode()) {
            return;
        }
        if (!this.localEditingState) {
            this.localEditingState = true;
            this.crmEvents.setRecordEditingState('customer', this.customerId, true);
        }
        this.clearEditingIdleTimer();
        this.editingIdleTimer = setTimeout(() => {
            if (!this.customerId) {
                return;
            }
            this.localEditingState = false;
            this.crmEvents.setRecordEditingState('customer', this.customerId, false);
        }, 8000);
    }
    hasUnsavedChanges() {
        return this.originalFormSnapshot !== '' && JSON.stringify(this.form) !== this.originalFormSnapshot;
    }
    confirmLeaveWithUnsavedChanges() {
        if (this.pendingLeaveDecision) {
            return this.pendingLeaveDecision;
        }
        this.leavePromptVisible.set(true);
        this.pendingLeaveDecision = new Promise((resolve) => {
            this.pendingLeaveResolver = resolve;
        });
        return this.pendingLeaveDecision;
    }
    onBeforeUnload(event) {
        if (this.hasUnsavedChanges()) {
            event.preventDefault();
        }
    }
    loadCustomer() {
        if (!this.customerId)
            return;
        this.loading.set(true);
        this.customerData.getById(this.customerId).subscribe({
            next: (customer) => {
                this.form = {
                    name: customer.name,
                    lifecycleStage: customer.status,
                    phone: customer.phone || '',
                    website: customer.website || '',
                    industry: customer.industry || '',
                    description: customer.notes?.join(', ') || '',
                    email: customer.email || '',
                    company: customer.company || '',
                    address: customer.address || '',
                    parentAccountId: customer.parentAccountId,
                    territory: customer.territory || '',
                    annualRevenue: customer.annualRevenue,
                    numberOfEmployees: customer.numberOfEmployees,
                    accountType: customer.accountType,
                    rating: customer.rating,
                    accountSource: customer.accountSource
                };
                this.captureFormSnapshot();
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.raiseToast('error', 'Unable to load customer.');
            }
        });
    }
    checkForDuplicate() {
        if (this.duplicateCheckTimer) {
            clearTimeout(this.duplicateCheckTimer);
        }
        this.duplicateCheckTimer = setTimeout(() => {
            const { name, accountNumber, website, phone } = this.form;
            if (!name && !accountNumber && !website && !phone) {
                this.duplicateWarning.set(null);
                return;
            }
            this.customerData.checkDuplicate({
                name: name || undefined,
                accountNumber: accountNumber || undefined,
                website: website || undefined,
                phone: phone || undefined,
                excludeId: this.customerId || undefined
            }).subscribe({
                next: (res) => {
                    this.duplicateWarning.set(res.isDuplicate && res.matchId && res.matchName
                        ? { matchId: res.matchId, matchName: res.matchName }
                        : null);
                },
                error: () => this.duplicateWarning.set(null)
            });
        }, 600);
    }
    onSave() {
        this.nameError.set(!this.form.name ? 'Customer name is required.' : null);
        if (this.nameError()) {
            this.raiseToast('error', 'Please fix the highlighted errors before saving.');
            return false;
        }
        this.saving.set(true);
        const payload = {
            name: this.form.name,
            lifecycleStage: this.form.lifecycleStage,
            phone: this.form.phone,
            website: this.form.website,
            industry: this.form.industry,
            description: this.form.description,
            parentAccountId: this.form.parentAccountId,
            territory: this.form.territory,
            annualRevenue: this.form.annualRevenue,
            numberOfEmployees: this.form.numberOfEmployees,
            accountType: this.form.accountType,
            rating: this.form.rating,
            accountSource: this.form.accountSource,
            billingStreet: this.form.billingStreet,
            billingCity: this.form.billingCity,
            billingState: this.form.billingState,
            billingPostalCode: this.form.billingPostalCode,
            billingCountry: this.form.billingCountry,
            shippingStreet: this.form.shippingStreet,
            shippingCity: this.form.shippingCity,
            shippingState: this.form.shippingState,
            shippingPostalCode: this.form.shippingPostalCode,
            shippingCountry: this.form.shippingCountry
        };
        if (this.customerId) {
            this.customerData.update(this.customerId, payload).subscribe({
                next: () => {
                    this.saving.set(false);
                    this.completeActiveDraft();
                    this.captureFormSnapshot();
                    this.raiseToast('success', 'Customer updated.');
                    this.loadRecentDrafts();
                    this.finalizeLeaveAfterSave(true);
                },
                error: () => {
                    this.saving.set(false);
                    this.raiseToast('error', 'Unable to update customer.');
                    this.finalizeLeaveAfterSave(false);
                }
            });
        }
        else {
            this.customerData.create(payload).subscribe({
                next: (created) => {
                    this.saving.set(false);
                    this.completeActiveDraft();
                    this.captureFormSnapshot();
                    this.raiseToast('success', 'Customer created.');
                    this.loadRecentDrafts();
                    if (this.leaveAfterSave) {
                        this.finalizeLeaveAfterSave(true);
                        return;
                    }
                    void this.router.navigate(['/app/customers', created.id, 'edit']);
                },
                error: () => {
                    this.saving.set(false);
                    this.raiseToast('error', 'Unable to create customer.');
                    this.finalizeLeaveAfterSave(false);
                }
            });
        }
        return true;
    }
    primarySaveLabel() {
        return this.customerId ? 'Update Customer' : 'Create Customer';
    }
    draftButtonLabel() {
        const count = this.recentDrafts().length;
        return count > 0 ? `Save Draft (${count})` : 'Save Draft';
    }
    draftSplitButtonItems() {
        const items = [];
        const drafts = this.recentDrafts();
        items.push({ label: 'Saved drafts', disabled: true, styleClass: 'crm-draft-menu-heading' });
        if (!drafts.length) {
            items.push({ label: 'No saved drafts yet', disabled: true, styleClass: 'crm-draft-menu-empty' });
            return items;
        }
        for (const draft of drafts) {
            items.push({
                label: this.buildDraftMenuMarkup(draft),
                escape: false,
                command: () => this.openDraftFromSummary(draft)
            });
        }
        items.push({ separator: true });
        items.push({ label: 'View all drafts', icon: 'pi pi-list', command: () => this.openDraftLibrary() });
        return items;
    }
    saveDraft() {
        this.draftSaving.set(true);
        this.formDraftService.save({
            id: this.activeDraftId(),
            entityType: 'customer',
            title: this.buildDraftTitle(),
            subtitle: this.buildDraftSubtitle(),
            payloadJson: JSON.stringify(this.form)
        }).subscribe({
            next: (draft) => {
                this.draftSaving.set(false);
                this.activeDraftId.set(draft.id);
                this.draftModeActive.set(true);
                this.draftStatusMessage.set(`Draft saved at ${this.formatDraftTimestamp(draft.updatedAtUtc)}.`);
                this.captureFormSnapshot();
                this.loadRecentDrafts();
                if (this.draftLibraryVisible()) {
                    this.loadDraftLibrary();
                }
                this.finalizeLeaveAfterDraftSave(true);
            },
            error: () => {
                this.draftSaving.set(false);
                this.draftStatusMessage.set('Unable to save draft.');
                this.raiseToast('error', 'Unable to save draft.');
                this.finalizeLeaveAfterDraftSave(false);
            }
        });
    }
    stayOnForm() {
        this.resolvePendingLeave(false);
    }
    leaveWithoutSaving() {
        this.resolvePendingLeave(true);
    }
    saveDraftAndLeave() {
        this.leaveAfterDraftSave = true;
        this.saveDraft();
    }
    submitAndLeave() {
        this.leaveAfterSave = true;
        if (!this.onSave()) {
            this.leaveAfterSave = false;
            this.resolvePendingLeave(false);
        }
    }
    openDraftFromSummary(draft) {
        if (this.hasDraftFormChanges()) {
            this.pendingDraftToOpen = draft;
            this.draftOpenConfirmVisible.set(true);
            return;
        }
        this.loadDraft(draft.id);
    }
    confirmOpenDraft() {
        const draft = this.pendingDraftToOpen;
        this.pendingDraftToOpen = null;
        this.draftOpenConfirmVisible.set(false);
        if (draft) {
            this.loadDraft(draft.id);
        }
    }
    cancelOpenDraft() {
        this.pendingDraftToOpen = null;
        this.draftOpenConfirmVisible.set(false);
    }
    openDraftLibrary() {
        this.draftLibraryVisible.set(true);
        this.loadDraftLibrary();
    }
    closeDraftLibrary() {
        this.draftLibraryVisible.set(false);
    }
    dismissDraftPrompt() {
        this.draftPromptVisible.set(false);
    }
    loadDraftFromPrompt(draft) {
        this.draftPromptVisible.set(false);
        this.loadDraft(draft.id);
    }
    discardDraft(draft, event) {
        event?.stopPropagation();
        this.formDraftService.discard(draft.id).subscribe({
            next: () => {
                if (this.activeDraftId() === draft.id) {
                    this.activeDraftId.set(null);
                    this.draftModeActive.set(false);
                    this.draftStatusMessage.set(null);
                }
                this.loadRecentDrafts();
                this.loadDraftLibrary();
            },
            error: () => this.raiseToast('error', 'Unable to discard draft.')
        });
    }
    formatDraftTimestamp(value) {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        }).format(new Date(value));
    }
    addNote() {
        if (!this.customerId || !this.noteText.trim()) {
            return;
        }
        this.noteSaving.set(true);
        const payload = {
            subject: 'Note',
            description: this.noteText.trim(),
            type: 'Note',
            relatedEntityType: 'Account',
            relatedEntityId: this.customerId
        };
        this.activityData.create(payload).subscribe({
            next: (note) => {
                this.noteSaving.set(false);
                this.noteText = '';
                this.notes.set([note, ...this.notes()]);
                this.activities.set([note, ...this.activities()]);
            },
            error: () => {
                this.noteSaving.set(false);
                this.raiseToast('error', 'Unable to add note.');
            }
        });
    }
    onAttachmentUpload(event) {
        if (!this.customerId || !event.files?.length) {
            return;
        }
        const file = event.files[0];
        this.attachmentData.upload(file, 'Account', this.customerId).subscribe({
            next: (attachment) => {
                this.attachments.set([attachment, ...this.attachments()]);
                this.raiseToast('success', 'Attachment uploaded.');
            },
            error: () => {
                this.raiseToast('error', 'Unable to upload attachment.');
            }
        });
    }
    downloadAttachment(item) {
        const url = this.attachmentData.downloadUrl(item.id);
        window.open(url, '_blank');
    }
    navigateWithToast(message) {
        this.saving.set(false);
        this.router.navigate(['/app/customers'], { state: { toast: { tone: 'success', message } } });
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, tone === 'error' ? 5000 : 3000);
    }
    loadRecentDrafts() {
        this.formDraftService.list('customer', { limit: 5, page: 1, pageSize: 5 }).subscribe({
            next: (result) => {
                const items = result.items;
                this.recentDrafts.set(items);
                if (!this.hasShownDraftPrompt && !this.customerId && !this.draftModeActive() && items.length) {
                    this.hasShownDraftPrompt = true;
                    this.draftPromptVisible.set(true);
                }
            },
            error: () => this.recentDrafts.set([])
        });
    }
    loadDraftLibrary() {
        this.draftLibraryLoading.set(true);
        this.formDraftService.list('customer', { page: 1, pageSize: 50 }).subscribe({
            next: (result) => {
                this.draftLibraryLoading.set(false);
                this.draftLibraryItems.set(result.items);
            },
            error: () => {
                this.draftLibraryLoading.set(false);
                this.draftLibraryItems.set([]);
            }
        });
    }
    loadDraft(id) {
        this.formDraftService.get(id).subscribe({
            next: (draft) => {
                this.form = {
                    ...this.emptyDraftPayload(),
                    ...this.parseDraftPayload(draft)
                };
                this.activeDraftId.set(draft.id);
                this.draftModeActive.set(true);
                this.draftStatusMessage.set(`Draft loaded from ${this.formatDraftTimestamp(draft.updatedAtUtc)}.`);
                this.captureFormSnapshot();
                this.draftLibraryVisible.set(false);
            },
            error: () => this.raiseToast('error', 'Unable to open draft.')
        });
    }
    parseDraftPayload(draft) {
        try {
            return JSON.parse(draft.payloadJson);
        }
        catch {
            return {};
        }
    }
    completeActiveDraft() {
        const activeDraftId = this.activeDraftId();
        if (!activeDraftId) {
            return;
        }
        this.formDraftService.complete(activeDraftId).subscribe({ next: () => { }, error: () => { } });
        this.activeDraftId.set(null);
        this.draftModeActive.set(false);
    }
    captureFormSnapshot() {
        this.originalFormSnapshot = JSON.stringify(this.form);
    }
    resolvePendingLeave(value) {
        const resolver = this.pendingLeaveResolver;
        this.pendingLeaveResolver = null;
        this.pendingLeaveDecision = null;
        this.leaveAfterSave = false;
        this.leaveAfterDraftSave = false;
        this.leavePromptVisible.set(false);
        resolver?.(value);
    }
    finalizeLeaveAfterSave(success) {
        if (!this.leaveAfterSave) {
            return;
        }
        this.resolvePendingLeave(success);
    }
    finalizeLeaveAfterDraftSave(success) {
        if (!this.leaveAfterDraftSave) {
            return;
        }
        this.resolvePendingLeave(success);
    }
    hasDraftFormChanges() {
        return JSON.stringify(this.form) !== JSON.stringify(this.emptyDraftPayload());
    }
    buildDraftTitle() {
        return this.form.name?.trim() || 'Untitled customer draft';
    }
    buildDraftSubtitle() {
        return this.form.industry?.trim() || null;
    }
    buildDraftMenuMarkup(draft) {
        const title = this.escapeDraftText(draft.title);
        const subtitle = this.escapeDraftText(draft.subtitle?.trim() || 'No industry');
        const timestamp = this.escapeDraftText(this.formatDraftTimestamp(draft.updatedAtUtc));
        return `<div class="crm-draft-menuitem"><span class="crm-draft-menuitem__title">${title}</span><span class="crm-draft-menuitem__meta">${subtitle} · ${timestamp}</span></div>`;
    }
    escapeDraftText(value) {
        return value
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }
    emptyDraftPayload() {
        return {
            name: '',
            lifecycleStage: 'Lead',
            phone: '',
            website: '',
            industry: '',
            description: '',
            email: '',
            company: '',
            address: '',
            parentAccountId: undefined,
            territory: '',
            annualRevenue: undefined,
            numberOfEmployees: undefined,
            accountType: undefined,
            rating: undefined,
            accountSource: undefined,
            billingStreet: '',
            billingCity: '',
            billingState: '',
            billingPostalCode: '',
            billingCountry: '',
            shippingStreet: '',
            shippingCity: '',
            shippingState: '',
            shippingPostalCode: '',
            shippingCountry: ''
        };
    }
    loadDetailData() {
        if (!this.customerId) {
            return;
        }
        this.timelineLoading.set(true);
        this.activityData
            .search({
            relatedEntityType: 'Account',
            relatedEntityId: this.customerId,
            page: 1,
            pageSize: 50
        })
            .subscribe({
            next: (res) => {
                const ordered = [...res.items].sort((a, b) => (b.createdAtUtc ?? '').localeCompare(a.createdAtUtc ?? ''));
                this.activities.set(ordered);
                this.timelineLoading.set(false);
            },
            error: () => {
                this.timelineLoading.set(false);
                this.raiseToast('error', 'Unable to load timeline.');
            }
        });
        this.activityData
            .search({
            relatedEntityType: 'Account',
            relatedEntityId: this.customerId,
            type: 'Note',
            page: 1,
            pageSize: 50
        })
            .subscribe({
            next: (res) => {
                const ordered = [...res.items].sort((a, b) => (b.createdAtUtc ?? '').localeCompare(a.createdAtUtc ?? ''));
                this.notes.set(ordered);
            }
        });
        this.contactData.search({ accountId: this.customerId, page: 1, pageSize: 20 }).subscribe({
            next: (res) => this.relatedContacts.set(res.items),
            error: () => this.raiseToast('error', 'Unable to load related contacts.')
        });
        this.opportunityData.search({ accountId: this.customerId, page: 1, pageSize: 20 }).subscribe({
            next: (res) => this.relatedOpportunities.set(res.items),
            error: () => this.raiseToast('error', 'Unable to load opportunities.')
        });
        this.attachmentData.list('Account', this.customerId).subscribe({
            next: (items) => this.attachments.set(items),
            error: () => this.raiseToast('error', 'Unable to load attachments.')
        });
        this.propertyData.search({ accountId: this.customerId, page: 1, pageSize: 20 }).subscribe({
            next: (res) => this.relatedProperties.set(res.items),
            error: () => this.raiseToast('error', 'Unable to load related properties.')
        });
    }
    relatedContactsSorted() {
        return [...this.relatedContacts()].sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? ''));
    }
    relatedOpportunitiesSorted() {
        return [...this.relatedOpportunities()].sort((a, b) => (a.createdAtUtc ?? '').localeCompare(b.createdAtUtc ?? ''));
    }
    relatedPropertiesSorted() {
        return [...this.relatedProperties()].sort((a, b) => (a.createdAtUtc ?? '').localeCompare(b.createdAtUtc ?? ''));
    }
    contactCount() {
        return this.relatedContacts().length;
    }
    opportunityCount() {
        return this.relatedOpportunities().length;
    }
    latestContactCreatedAt() {
        const latest = this.relatedContactsSorted().slice(-1)[0];
        return latest?.createdAt ?? null;
    }
    latestOpportunityCreatedAt() {
        const latest = this.relatedOpportunitiesSorted().slice(-1)[0];
        return latest?.createdAtUtc ?? null;
    }
    customerHeaderScoreValue() {
        let score = 18;
        switch (this.form.lifecycleStage) {
            case 'Lead':
                score += 10;
                break;
            case 'Prospect':
                score += 24;
                break;
            case 'Customer':
                score += 38;
                break;
        }
        score += Math.min(this.contactCount() * 8, 24);
        score += Math.min(this.opportunityCount() * 10, 20);
        score += Math.min(this.notes().length * 4, 12);
        score += Math.min(this.activities().length * 3, 12);
        if ((this.form.annualRevenue ?? 0) > 0) {
            score += 6;
        }
        if ((this.form.numberOfEmployees ?? 0) > 0) {
            score += 4;
        }
        if ((this.form.website ?? '').trim()) {
            score += 3;
        }
        if ((this.form.industry ?? '').trim()) {
            score += 3;
        }
        return Math.max(0, Math.min(100, Math.round(score)));
    }
    customerHeaderScoreColor() {
        const score = this.customerHeaderScoreValue();
        if (score >= 80)
            return '#22c55e';
        if (score >= 60)
            return '#3b82f6';
        if (score >= 40)
            return '#f59e0b';
        if (score >= 20)
            return '#f97316';
        return '#ef4444';
    }
    customerLifecycleSummary() {
        const order = ['Lead', 'Prospect', 'Customer'];
        const stage = this.form.lifecycleStage ?? 'Lead';
        const index = order.indexOf(stage);
        return index >= 0 ? `Stage ${index + 1} of ${order.length}` : 'Lifecycle stage';
    }
    customerHeaderScoreMessage() {
        return 'Overall customer score is derived from lifecycle stage, relationship activity, and linked-record depth. Lifecycle progress remains separate.';
    }
    initializePresence(recordId) {
        this.crmEvents.joinRecordPresence('customer', recordId);
        this.crmEvents.events$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => {
            if (!event?.payload) {
                return;
            }
            const entityType = String(event.payload['entityType'] ?? '').toLowerCase();
            const payloadRecordId = String(event.payload['recordId'] ?? '');
            if (entityType !== 'customer' || payloadRecordId !== recordId) {
                return;
            }
            if (event.eventType === 'record.presence.snapshot') {
                const usersRaw = Array.isArray(event.payload['users']) ? event.payload['users'] : [];
                const users = usersRaw
                    .map((item) => {
                    const value = item;
                    return {
                        userId: String(value['userId'] ?? ''),
                        displayName: String(value['displayName'] ?? 'User'),
                        isEditing: !!value['isEditing']
                    };
                })
                    .filter((item) => !!item.userId);
                this.presenceUsers.set(users);
                return;
            }
            if (event.eventType === 'record.presence.changed') {
                const userId = String(event.payload['userId'] ?? '');
                const displayName = String(event.payload['displayName'] ?? 'User');
                const action = String(event.payload['action'] ?? '').toLowerCase();
                const isEditing = !!event.payload['isEditing'];
                if (!userId) {
                    return;
                }
                this.presenceUsers.update((users) => {
                    if (action === 'joined') {
                        if (users.some((user) => user.userId === userId)) {
                            return users.map((user) => user.userId === userId ? { ...user, displayName, isEditing } : user);
                        }
                        return [...users, { userId, displayName, isEditing }];
                    }
                    if (action === 'left') {
                        return users.filter((user) => user.userId !== userId);
                    }
                    if (action === 'editing_started' || action === 'editing_stopped') {
                        const nextEditingState = action === 'editing_started' ? true : isEditing;
                        if (users.some((user) => user.userId === userId)) {
                            return users.map((user) => user.userId === userId ? { ...user, displayName, isEditing: nextEditingState } : user);
                        }
                        return [...users, { userId, displayName, isEditing: nextEditingState }];
                    }
                    return users;
                });
            }
        });
    }
    visiblePresenceUsers() {
        return this.presenceUsers().filter((viewer) => !this.isCurrentUser(viewer.userId));
    }
    activeEditors() {
        return this.visiblePresenceUsers().filter((viewer) => viewer.isEditing);
    }
    viewingPresenceSummary() {
        const viewers = this.visiblePresenceUsers();
        if (!viewers.length) {
            return '';
        }
        if (viewers.length === 1) {
            return `${viewers[0].displayName} is viewing this record.`;
        }
        if (viewers.length === 2) {
            return `${viewers[0].displayName} and ${viewers[1].displayName} are viewing this record.`;
        }
        return `${viewers[0].displayName} and ${viewers.length - 1} others are viewing this record.`;
    }
    isCurrentUser(userId) {
        if (!this.currentUserId || !userId) {
            return false;
        }
        return userId.toLowerCase() === this.currentUserId.toLowerCase();
    }
    editingPresenceSummary() {
        const editors = this.activeEditors();
        if (!editors.length) {
            return '';
        }
        if (editors.length === 1) {
            return `${editors[0].displayName} is editing this record now.`;
        }
        if (editors.length === 2) {
            return `${editors[0].displayName} and ${editors[1].displayName} are editing this record now.`;
        }
        return `${editors[0].displayName} and ${editors.length - 1} others are editing this record now.`;
    }
    clearEditingIdleTimer() {
        if (this.editingIdleTimer) {
            clearTimeout(this.editingIdleTimer);
            this.editingIdleTimer = null;
        }
    }
    static ɵfac = function CustomerFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CustomerFormPage)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.CustomerDataService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CustomerFormPage, selectors: [["app-customer-form-page"]], hostBindings: function CustomerFormPage_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("input", function CustomerFormPage_input_HostBindingHandler() { return ctx.onCollaborativeEditingActivity(); })("change", function CustomerFormPage_change_HostBindingHandler() { return ctx.onCollaborativeEditingActivity(); })("beforeunload", function CustomerFormPage_beforeunload_HostBindingHandler($event) { return ctx.onBeforeUnload($event); }, i0.ɵɵresolveWindow);
        } }, decls: 268, vars: 97, consts: [["noCustomerPromptDrafts", ""], ["timelineLoadingTpl", ""], ["notesEmpty", ""], [1, "customer-form-page"], ["header", "Saved drafts available", "styleClass", "form-draft-prompt-dialog", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "form-draft-prompt"], [1, "form-draft-prompt__hero"], [1, "form-draft-prompt__icon"], [1, "pi", "pi-bookmark"], ["class", "form-draft-list", 4, "ngIf", "ngIfElse"], [1, "lead-status-dialog__actions"], ["pButton", "", "type", "button", "label", "Start fresh", 1, "p-button-outlined", 3, "click"], ["pButton", "", "type", "button", "label", "View all drafts", 1, "crm-button", "crm-button--primary", 3, "click"], ["header", "Open saved draft?", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "form-draft-dialog"], ["pButton", "", "type", "button", "label", "Cancel", 1, "p-button-outlined", 3, "click"], ["pButton", "", "type", "button", "label", "Open Draft", 1, "crm-button", "crm-button--primary", 3, "click"], ["header", "Unsaved customer changes", "styleClass", "form-leave-dialog", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "form-leave-dialog__body"], [1, "form-leave-dialog__hero"], [1, "form-leave-dialog__icon"], [1, "pi", "pi-exclamation-circle"], [1, "form-leave-dialog__actions"], ["pButton", "", "type", "button", "label", "Stay on form", 1, "p-button-outlined", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Leave without saving", 1, "p-button-outlined", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Save to draft", 1, "crm-button", "crm-button--secondary", 3, "click", "loading", "disabled"], ["pButton", "", "type", "button", 1, "crm-button", "crm-button--primary", 3, "click", "label", "loading", "disabled"], ["header", "Saved customer drafts", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], ["class", "form-draft-dialog__empty", 4, "ngIf"], ["class", "form-draft-list", 4, "ngIf"], [1, "page-header"], [1, "header-content"], ["pButton", "", "type", "button", "routerLink", "/app/customers", 1, "back-link", "p-button-text"], [1, "pi", "pi-arrow-left"], [1, "header-title"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], ["class", "customer-header-progress", 4, "ngIf"], ["class", "form-draft-status", 4, "ngIf"], ["class", "form-draft-banner", 4, "ngIf"], ["class", "presence-focus", 4, "ngIf"], ["class", "presence-editing-note", 4, "ngIf"], [1, "form-container"], [1, "customer-form", 3, "ngSubmit"], ["class", "related-summary-strip", 4, "ngIf"], [1, "form-fieldset", 3, "disabled"], ["class", "duplicate-warning", 4, "ngIf"], [1, "form-section", "section--basic"], [1, "section-title"], [1, "pi", "pi-user"], [1, "form-grid"], [1, "form-field"], ["for", "customerName"], [1, "required"], [1, "icon-addon", "icon-addon--name"], ["pInputText", "", "id", "customerName", "name", "name", "required", "", "placeholder", "Enter customer name", 3, "ngModelChange", "blur", "ngModel"], ["class", "field-error", 4, "ngIf"], ["for", "customerStatus"], ["id", "customerStatus", "optionLabel", "label", "optionValue", "value", "name", "status", "placeholder", "Select status", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "parentAccountId"], ["id", "parentAccountId", "optionLabel", "label", "optionValue", "value", "name", "parentAccountId", "placeholder", "Select parent account", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "customerIndustry"], [1, "icon-addon", "icon-addon--industry"], [1, "pi", "pi-building"], ["pInputText", "", "id", "customerIndustry", "name", "industry", "placeholder", "e.g., Technology, Healthcare", 3, "ngModelChange", "ngModel"], ["for", "customerCompany"], [1, "icon-addon", "icon-addon--company"], [1, "pi", "pi-briefcase"], ["pInputText", "", "id", "customerCompany", "name", "company", "placeholder", "Company name", 3, "ngModelChange", "ngModel"], [1, "form-section", "section--firmographic"], [1, "pi", "pi-chart-bar"], ["for", "accountType"], ["id", "accountType", "optionLabel", "label", "optionValue", "value", "name", "accountType", "placeholder", "Select type", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["pTemplate", "item"], ["pTemplate", "value"], ["for", "rating"], ["id", "rating", "optionLabel", "label", "optionValue", "value", "name", "rating", "placeholder", "Select rating", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "accountSource"], ["id", "accountSource", "optionLabel", "label", "optionValue", "value", "name", "accountSource", "placeholder", "Select source", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "annualRevenue"], [1, "icon-addon", "icon-addon--success"], [1, "pi", "pi-dollar"], ["id", "annualRevenue", "name", "annualRevenue", "mode", "currency", "currency", "USD", "locale", "en-US", "placeholder", "0.00", 3, "ngModelChange", "ngModel", "inputStyleClass"], ["for", "numberOfEmployees"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-users"], ["id", "numberOfEmployees", "name", "numberOfEmployees", "placeholder", "0", 3, "ngModelChange", "ngModel", "useGrouping", "inputStyleClass"], ["for", "territory"], [1, "icon-addon", "icon-addon--address"], [1, "pi", "pi-map"], ["pInputText", "", "id", "territory", "name", "territory", "placeholder", "e.g., North America, EMEA", 3, "ngModelChange", "ngModel"], [1, "form-section", "section--contact"], [1, "pi", "pi-phone"], ["for", "customerEmail"], [1, "icon-addon", "icon-addon--email"], [1, "pi", "pi-envelope"], ["pInputText", "", "id", "customerEmail", "name", "email", "type", "email", "placeholder", "customer@example.com", 3, "ngModelChange", "ngModel"], ["for", "customerPhone"], [1, "icon-addon", "icon-addon--phone"], ["pInputText", "", "id", "customerPhone", "name", "phone", "placeholder", "+1 (555) 000-0000", 3, "ngModelChange", "blur", "ngModel"], ["for", "customerWebsite"], [1, "icon-addon", "icon-addon--website"], [1, "pi", "pi-globe"], ["pInputText", "", "id", "customerWebsite", "name", "website", "placeholder", "https://example.com", 3, "ngModelChange", "blur", "ngModel"], [1, "form-section", "section--billing"], [1, "pi", "pi-map-marker"], [1, "form-field", "full-row"], ["for", "billingStreet"], ["pInputText", "", "id", "billingStreet", "name", "billingStreet", "placeholder", "123 Main Street", 3, "ngModelChange", "ngModel"], ["for", "billingCity"], ["pInputText", "", "id", "billingCity", "name", "billingCity", "placeholder", "City", 3, "ngModelChange", "ngModel"], ["for", "billingState"], ["pInputText", "", "id", "billingState", "name", "billingState", "placeholder", "State / Province", 3, "ngModelChange", "ngModel"], ["for", "billingPostalCode"], [1, "pi", "pi-hashtag"], ["pInputText", "", "id", "billingPostalCode", "name", "billingPostalCode", "placeholder", "ZIP / Postal code", 3, "ngModelChange", "ngModel"], ["for", "billingCountry"], ["pInputText", "", "id", "billingCountry", "name", "billingCountry", "placeholder", "Country", 3, "ngModelChange", "ngModel"], [1, "form-section", "section--shipping"], [1, "pi", "pi-truck"], ["for", "shippingStreet"], ["pInputText", "", "id", "shippingStreet", "name", "shippingStreet", "placeholder", "123 Main Street", 3, "ngModelChange", "ngModel"], ["for", "shippingCity"], ["pInputText", "", "id", "shippingCity", "name", "shippingCity", "placeholder", "City", 3, "ngModelChange", "ngModel"], ["for", "shippingState"], ["pInputText", "", "id", "shippingState", "name", "shippingState", "placeholder", "State / Province", 3, "ngModelChange", "ngModel"], ["for", "shippingPostalCode"], ["pInputText", "", "id", "shippingPostalCode", "name", "shippingPostalCode", "placeholder", "ZIP / Postal code", 3, "ngModelChange", "ngModel"], ["for", "shippingCountry"], ["pInputText", "", "id", "shippingCountry", "name", "shippingCountry", "placeholder", "Country", 3, "ngModelChange", "ngModel"], [1, "form-section", "section--additional"], [1, "pi", "pi-file-edit"], [1, "form-field", "full-width"], ["for", "customerDescription"], ["pTextarea", "", "id", "customerDescription", "name", "description", "rows", "4", "placeholder", "Add any relevant notes about this customer...", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "form-actions"], ["type", "button", "pButton", "", "label", "Cancel", "routerLink", "/app/customers", 1, "crm-button", "crm-button--ghost"], ["type", "button", "pButton", "", "icon", "pi pi-check", 1, "crm-button", "crm-button--primary", 3, "click", "label", "disabled"], ["icon", "pi pi-bookmark", "styleClass", "crm-draft-splitbutton", "buttonStyleClass", "crm-button crm-button--secondary", "menuButtonStyleClass", "crm-button crm-button--secondary", "appendTo", "body", 3, "onClick", "label", "disabled", "model"], ["class", "form-container detail-container", 4, "ngIf"], [1, "form-draft-list"], ["class", "form-draft-list__item", 4, "ngFor", "ngForOf"], [1, "form-draft-list__item"], [1, "form-draft-list__title"], [1, "form-draft-list__meta"], [1, "form-draft-list__actions"], ["type", "button", 1, "form-draft-list__resume", 3, "click"], [1, "form-draft-dialog__empty"], ["type", "button", 1, "form-draft-list__discard", 3, "click"], [1, "customer-header-progress"], [1, "customer-header-progress__dial"], ["valueColor", "var(--customer-header-score-color)", "rangeColor", "rgba(148, 163, 184, 0.18)", "textColor", "#1e293b", "styleClass", "customer-header-progress__knob", 3, "ngModel", "readonly", "valueTemplate", "size", "strokeWidth", "showValue", "min", "max"], [1, "customer-header-progress__content"], [1, "customer-header-progress__eyebrow"], [1, "customer-header-progress__meta"], [1, "customer-header-progress__status"], [1, "customer-header-progress__step"], [1, "customer-header-progress__copy"], [1, "form-draft-status"], [1, "form-draft-banner"], [1, "pi", "pi-info-circle"], [1, "presence-focus"], [1, "pi", "pi-eye"], [1, "presence-editing-note"], [1, "pi", "pi-pencil"], [1, "related-summary-strip"], [1, "summary-chip"], [1, "chip-label"], [1, "chip-value"], ["class", "chip-meta", 4, "ngIf"], [1, "chip-meta"], [1, "duplicate-warning"], [1, "pi", "pi-exclamation-triangle"], [1, "dup-link", 3, "routerLink"], [1, "field-error"], [1, "select-option"], [1, "pi", 3, "ngClass"], ["class", "select-option", 4, "ngIf"], ["class", "select-placeholder", 4, "ngIf"], [1, "select-placeholder"], [1, "form-container", "detail-container"], [1, "form-section", "section--workspace"], ["value", "timeline"], ["value", "notes"], ["value", "related"], ["value", "attachments"], ["class", "timeline", 4, "ngIf", "ngIfElse"], [1, "notes"], [1, "note-editor"], ["pTextarea", "", "rows", "4", "placeholder", "Add a note about this customer...", 1, "w-full", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "note-actions"], ["pButton", "", "type", "button", "label", "Add note", "icon", "pi pi-plus", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], ["class", "note-list", 4, "ngIf", "ngIfElse"], [1, "related-grid"], [1, "related-section"], ["styleClass", "compact-table", 3, "value", "paginator", "rows"], ["pTemplate", "header"], ["pTemplate", "body"], ["class", "empty-state", 4, "ngIf"], [1, "attachments"], ["mode", "basic", "chooseLabel", "Upload file", 3, "uploadHandler", "customUpload", "auto"], [1, "timeline"], ["class", "timeline-item", 4, "ngFor", "ngForOf"], [1, "timeline-item"], [1, "timeline-type"], [1, "type-dot"], [1, "timeline-body"], [1, "timeline-title"], [1, "timeline-meta"], [4, "ngIf"], ["class", "timeline-description", 4, "ngIf"], [1, "timeline-description"], [1, "empty-state"], [1, "pi", "pi-clock"], ["routerLink", "/app/activities", 1, "empty-state-link", 3, "queryParams"], [1, "note-list"], ["class", "note-item", 4, "ngFor", "ngForOf"], [1, "note-item"], [1, "note-header"], [1, "note-title"], [1, "note-meta"], [1, "note-body"], [1, "clickable-row", 3, "routerLink"], [1, "related-link"], ["routerLink", "/app/contacts/new", 1, "empty-state-link"], ["severity", "info", 3, "value"], [1, "pi", "pi-chart-line"], ["routerLink", "/app/deals/new", 1, "empty-state-link"], [1, "pi", "pi-home"], ["routerLink", "/app/properties/new", 1, "empty-state-link"], [1, "table-actions"], ["pButton", "", "type", "button", "icon", "pi pi-download", 1, "icon-btn", 3, "click"], [1, "pi", "pi-paperclip"]], template: function CustomerFormPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 3);
            i0.ɵɵelement(1, "app-breadcrumbs");
            i0.ɵɵelementStart(2, "p-dialog", 4);
            i0.ɵɵlistener("visibleChange", function CustomerFormPage_Template_p_dialog_visibleChange_2_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.draftPromptVisible.set($event)); })("onHide", function CustomerFormPage_Template_p_dialog_onHide_2_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.dismissDraftPrompt()); });
            i0.ɵɵelementStart(3, "div", 5)(4, "div", 6)(5, "div", 7);
            i0.ɵɵelement(6, "i", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div")(8, "h3");
            i0.ɵɵtext(9, "Resume a saved customer draft?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p");
            i0.ɵɵtext(11, "You have saved customer drafts. Choose one to continue where you left off, or start with a blank form.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(12, CustomerFormPage_div_12_Template, 2, 1, "div", 9)(13, CustomerFormPage_ng_template_13_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(15, "div", 10)(16, "button", 11);
            i0.ɵɵlistener("click", function CustomerFormPage_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.dismissDraftPrompt()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "button", 12);
            i0.ɵɵlistener("click", function CustomerFormPage_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r1); ctx.dismissDraftPrompt(); return i0.ɵɵresetView(ctx.openDraftLibrary()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(18, "p-dialog", 13);
            i0.ɵɵlistener("visibleChange", function CustomerFormPage_Template_p_dialog_visibleChange_18_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.draftOpenConfirmVisible.set($event)); })("onHide", function CustomerFormPage_Template_p_dialog_onHide_18_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelOpenDraft()); });
            i0.ɵɵelementStart(19, "div", 14)(20, "p");
            i0.ɵɵtext(21, "Your current unsaved changes will be replaced by the selected draft.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 10)(23, "button", 15);
            i0.ɵɵlistener("click", function CustomerFormPage_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelOpenDraft()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "button", 16);
            i0.ɵɵlistener("click", function CustomerFormPage_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.confirmOpenDraft()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(25, "p-dialog", 17);
            i0.ɵɵlistener("visibleChange", function CustomerFormPage_Template_p_dialog_visibleChange_25_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.leavePromptVisible.set($event)); })("onHide", function CustomerFormPage_Template_p_dialog_onHide_25_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.stayOnForm()); });
            i0.ɵɵelementStart(26, "div", 18)(27, "div", 19)(28, "div", 20);
            i0.ɵɵelement(29, "i", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div")(31, "h3");
            i0.ɵɵtext(32, "Your customer form has unsaved changes.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "p");
            i0.ɵɵtext(34, "Choose whether to save the current state as a draft, submit the customer now, or leave without saving.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(35, "div", 22)(36, "button", 23);
            i0.ɵɵlistener("click", function CustomerFormPage_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.stayOnForm()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "button", 24);
            i0.ɵɵlistener("click", function CustomerFormPage_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.leaveWithoutSaving()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "button", 25);
            i0.ɵɵlistener("click", function CustomerFormPage_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.saveDraftAndLeave()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "button", 26);
            i0.ɵɵlistener("click", function CustomerFormPage_Template_button_click_39_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.submitAndLeave()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(40, "p-dialog", 27);
            i0.ɵɵlistener("visibleChange", function CustomerFormPage_Template_p_dialog_visibleChange_40_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.draftLibraryVisible.set($event)); })("onHide", function CustomerFormPage_Template_p_dialog_onHide_40_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeDraftLibrary()); });
            i0.ɵɵelementStart(41, "div", 14);
            i0.ɵɵtemplate(42, CustomerFormPage_p_42_Template, 2, 0, "p", 28)(43, CustomerFormPage_div_43_Template, 2, 1, "div", 29);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(44, "header", 30)(45, "div", 31)(46, "button", 32);
            i0.ɵɵelement(47, "i", 33);
            i0.ɵɵelementStart(48, "span");
            i0.ɵɵtext(49, "Back to customers");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 34)(51, "h1", 35)(52, "span", 36);
            i0.ɵɵtext(53);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "span", 37);
            i0.ɵɵtext(55, "Customer");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "p");
            i0.ɵɵtext(57);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(58, CustomerFormPage_div_58_Template, 13, 13, "div", 38)(59, CustomerFormPage_div_59_Template, 4, 1, "div", 39)(60, CustomerFormPage_div_60_Template, 4, 0, "div", 40)(61, CustomerFormPage_div_61_Template, 4, 1, "div", 41)(62, CustomerFormPage_div_62_Template, 4, 1, "div", 42);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(63, "main", 43)(64, "form", 44);
            i0.ɵɵlistener("ngSubmit", function CustomerFormPage_Template_form_ngSubmit_64_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSave()); });
            i0.ɵɵtemplate(65, CustomerFormPage_section_65_Template, 13, 4, "section", 45);
            i0.ɵɵelementStart(66, "fieldset", 46);
            i0.ɵɵtemplate(67, CustomerFormPage_div_67_Template, 8, 4, "div", 47);
            i0.ɵɵelementStart(68, "section", 48)(69, "h2", 49);
            i0.ɵɵelement(70, "i", 50);
            i0.ɵɵtext(71, " Basic information ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "div", 51)(73, "div", 52)(74, "label", 53);
            i0.ɵɵtext(75, "Customer Name ");
            i0.ɵɵelementStart(76, "span", 54);
            i0.ɵɵtext(77, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(78, "p-inputgroup")(79, "p-inputgroup-addon", 55);
            i0.ɵɵelement(80, "i", 50);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(81, "input", 56);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_81_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.name, $event) || (ctx.form.name = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("blur", function CustomerFormPage_Template_input_blur_81_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.checkForDuplicate()); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(82, CustomerFormPage_p_82_Template, 2, 1, "p", 57);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "div", 52)(84, "label", 58);
            i0.ɵɵtext(85, "Lifecycle Stage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "p-select", 59);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_p_select_ngModelChange_86_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.lifecycleStage, $event) || (ctx.form.lifecycleStage = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(87, "div", 52)(88, "label", 60);
            i0.ɵɵtext(89, "Parent Account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "p-select", 61);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_p_select_ngModelChange_90_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.parentAccountId, $event) || (ctx.form.parentAccountId = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(91, "div", 52)(92, "label", 62);
            i0.ɵɵtext(93, "Industry");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "p-inputgroup")(95, "p-inputgroup-addon", 63);
            i0.ɵɵelement(96, "i", 64);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "input", 65);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_97_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.industry, $event) || (ctx.form.industry = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(98, "div", 52)(99, "label", 66);
            i0.ɵɵtext(100, "Company");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "p-inputgroup")(102, "p-inputgroup-addon", 67);
            i0.ɵɵelement(103, "i", 68);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(104, "input", 69);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_104_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.company, $event) || (ctx.form.company = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(105, "section", 70)(106, "h2", 49);
            i0.ɵɵelement(107, "i", 71);
            i0.ɵɵtext(108, " Firmographic details ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(109, "div", 51)(110, "div", 52)(111, "label", 72);
            i0.ɵɵtext(112, "Account Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(113, "p-select", 73);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_p_select_ngModelChange_113_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.accountType, $event) || (ctx.form.accountType = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtemplate(114, CustomerFormPage_ng_template_114_Template, 4, 2, "ng-template", 74)(115, CustomerFormPage_ng_template_115_Template, 2, 2, "ng-template", 75);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(116, "div", 52)(117, "label", 76);
            i0.ɵɵtext(118, "Rating");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(119, "p-select", 77);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_p_select_ngModelChange_119_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.rating, $event) || (ctx.form.rating = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtemplate(120, CustomerFormPage_ng_template_120_Template, 4, 2, "ng-template", 74)(121, CustomerFormPage_ng_template_121_Template, 2, 2, "ng-template", 75);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(122, "div", 52)(123, "label", 78);
            i0.ɵɵtext(124, "Source");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "p-select", 79);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_p_select_ngModelChange_125_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.accountSource, $event) || (ctx.form.accountSource = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtemplate(126, CustomerFormPage_ng_template_126_Template, 4, 2, "ng-template", 74)(127, CustomerFormPage_ng_template_127_Template, 2, 2, "ng-template", 75);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(128, "div", 52)(129, "label", 80);
            i0.ɵɵtext(130, "Annual Revenue");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(131, "p-inputgroup")(132, "p-inputgroup-addon", 81);
            i0.ɵɵelement(133, "i", 82);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(134, "p-inputNumber", 83);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_p_inputNumber_ngModelChange_134_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.annualRevenue, $event) || (ctx.form.annualRevenue = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(135, "div", 52)(136, "label", 84);
            i0.ɵɵtext(137, "Employees");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(138, "p-inputgroup")(139, "p-inputgroup-addon", 85);
            i0.ɵɵelement(140, "i", 86);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(141, "p-inputNumber", 87);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_p_inputNumber_ngModelChange_141_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.numberOfEmployees, $event) || (ctx.form.numberOfEmployees = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(142, "div", 52)(143, "label", 88);
            i0.ɵɵtext(144, "Territory");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(145, "p-inputgroup")(146, "p-inputgroup-addon", 89);
            i0.ɵɵelement(147, "i", 90);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(148, "input", 91);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_148_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.territory, $event) || (ctx.form.territory = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(149, "section", 92)(150, "h2", 49);
            i0.ɵɵelement(151, "i", 93);
            i0.ɵɵtext(152, " Contact information ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(153, "div", 51)(154, "div", 52)(155, "label", 94);
            i0.ɵɵtext(156, "Email Address");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(157, "p-inputgroup")(158, "p-inputgroup-addon", 95);
            i0.ɵɵelement(159, "i", 96);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(160, "input", 97);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_160_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.email, $event) || (ctx.form.email = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(161, "div", 52)(162, "label", 98);
            i0.ɵɵtext(163, "Phone Number");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(164, "p-inputgroup")(165, "p-inputgroup-addon", 99);
            i0.ɵɵelement(166, "i", 93);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(167, "input", 100);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_167_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.phone, $event) || (ctx.form.phone = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("blur", function CustomerFormPage_Template_input_blur_167_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.checkForDuplicate()); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(168, "div", 52)(169, "label", 101);
            i0.ɵɵtext(170, "Website");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(171, "p-inputgroup")(172, "p-inputgroup-addon", 102);
            i0.ɵɵelement(173, "i", 103);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(174, "input", 104);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_174_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.website, $event) || (ctx.form.website = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("blur", function CustomerFormPage_Template_input_blur_174_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.checkForDuplicate()); });
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(175, "section", 105)(176, "h2", 49);
            i0.ɵɵelement(177, "i", 106);
            i0.ɵɵtext(178, " Billing address ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(179, "div", 51)(180, "div", 107)(181, "label", 108);
            i0.ɵɵtext(182, "Street");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(183, "p-inputgroup")(184, "p-inputgroup-addon", 89);
            i0.ɵɵelement(185, "i", 106);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(186, "input", 109);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_186_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.billingStreet, $event) || (ctx.form.billingStreet = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(187, "div", 52)(188, "label", 110);
            i0.ɵɵtext(189, "City");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(190, "p-inputgroup")(191, "p-inputgroup-addon", 85);
            i0.ɵɵelement(192, "i", 64);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(193, "input", 111);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_193_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.billingCity, $event) || (ctx.form.billingCity = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(194, "div", 52)(195, "label", 112);
            i0.ɵɵtext(196, "State");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(197, "p-inputgroup")(198, "p-inputgroup-addon", 67);
            i0.ɵɵelement(199, "i", 90);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(200, "input", 113);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_200_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.billingState, $event) || (ctx.form.billingState = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(201, "div", 52)(202, "label", 114);
            i0.ɵɵtext(203, "Postal Code");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(204, "p-inputgroup")(205, "p-inputgroup-addon", 55);
            i0.ɵɵelement(206, "i", 115);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(207, "input", 116);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_207_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.billingPostalCode, $event) || (ctx.form.billingPostalCode = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(208, "div", 52)(209, "label", 117);
            i0.ɵɵtext(210, "Country");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(211, "p-inputgroup")(212, "p-inputgroup-addon", 102);
            i0.ɵɵelement(213, "i", 103);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(214, "input", 118);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_214_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.billingCountry, $event) || (ctx.form.billingCountry = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(215, "section", 119)(216, "h2", 49);
            i0.ɵɵelement(217, "i", 120);
            i0.ɵɵtext(218, " Shipping address ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(219, "div", 51)(220, "div", 107)(221, "label", 121);
            i0.ɵɵtext(222, "Street");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(223, "p-inputgroup")(224, "p-inputgroup-addon", 89);
            i0.ɵɵelement(225, "i", 106);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(226, "input", 122);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_226_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.shippingStreet, $event) || (ctx.form.shippingStreet = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(227, "div", 52)(228, "label", 123);
            i0.ɵɵtext(229, "City");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(230, "p-inputgroup")(231, "p-inputgroup-addon", 85);
            i0.ɵɵelement(232, "i", 64);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(233, "input", 124);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_233_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.shippingCity, $event) || (ctx.form.shippingCity = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(234, "div", 52)(235, "label", 125);
            i0.ɵɵtext(236, "State");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(237, "p-inputgroup")(238, "p-inputgroup-addon", 67);
            i0.ɵɵelement(239, "i", 90);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(240, "input", 126);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_240_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.shippingState, $event) || (ctx.form.shippingState = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(241, "div", 52)(242, "label", 127);
            i0.ɵɵtext(243, "Postal Code");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(244, "p-inputgroup")(245, "p-inputgroup-addon", 55);
            i0.ɵɵelement(246, "i", 115);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(247, "input", 128);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_247_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.shippingPostalCode, $event) || (ctx.form.shippingPostalCode = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(248, "div", 52)(249, "label", 129);
            i0.ɵɵtext(250, "Country");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(251, "p-inputgroup")(252, "p-inputgroup-addon", 102);
            i0.ɵɵelement(253, "i", 103);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(254, "input", 130);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_input_ngModelChange_254_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.shippingCountry, $event) || (ctx.form.shippingCountry = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(255, "section", 131)(256, "h2", 49);
            i0.ɵɵelement(257, "i", 132);
            i0.ɵɵtext(258, " Additional information ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(259, "div", 133)(260, "label", 134);
            i0.ɵɵtext(261, "Notes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(262, "textarea", 135);
            i0.ɵɵtwoWayListener("ngModelChange", function CustomerFormPage_Template_textarea_ngModelChange_262_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.description, $event) || (ctx.form.description = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(263, "footer", 136);
            i0.ɵɵelement(264, "button", 137);
            i0.ɵɵelementStart(265, "button", 138);
            i0.ɵɵlistener("click", function CustomerFormPage_Template_button_click_265_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSave()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(266, "p-splitbutton", 139);
            i0.ɵɵlistener("onClick", function CustomerFormPage_Template_p_splitbutton_onClick_266_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.saveDraft()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(267, CustomerFormPage_section_267_Template, 59, 26, "section", 140);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const noCustomerPromptDrafts_r25 = i0.ɵɵreference(14);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(93, _c0));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.draftPromptVisible());
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", ctx.recentDrafts().length)("ngIfElse", noCustomerPromptDrafts_r25);
            i0.ɵɵadvance(6);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(94, _c1));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.draftOpenConfirmVisible());
            i0.ɵɵadvance(7);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(95, _c2));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", false)("visible", ctx.leavePromptVisible());
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("disabled", ctx.saving() || ctx.draftSaving());
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.saving() || ctx.draftSaving());
            i0.ɵɵadvance();
            i0.ɵɵproperty("loading", ctx.draftSaving())("disabled", ctx.saving() || ctx.draftSaving());
            i0.ɵɵadvance();
            i0.ɵɵproperty("label", ctx.primarySaveLabel())("loading", ctx.saving())("disabled", ctx.saving() || ctx.draftSaving());
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(96, _c3));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.draftLibraryVisible());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.draftLibraryLoading() && !ctx.draftLibraryItems().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.draftLibraryItems().length);
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Edit" : "Create New");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Update customer information" : "Add a new customer to your CRM");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.draftStatusMessage());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.draftModeActive());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode() && ctx.visiblePresenceUsers().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode() && ctx.activeEditors().length);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.duplicateWarning());
            i0.ɵɵadvance(14);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.name);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.nameError());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.statusOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.lifecycleStage);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.parentAccountOptions());
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.parentAccountId);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.industry);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.company);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("options", ctx.accountTypeOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.accountType);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.ratingOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.rating);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.accountSourceOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.accountSource);
            i0.ɵɵadvance(9);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.annualRevenue);
            i0.ɵɵproperty("inputStyleClass", "w-full");
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.numberOfEmployees);
            i0.ɵɵproperty("useGrouping", true)("inputStyleClass", "w-full");
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.territory);
            i0.ɵɵadvance(12);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.email);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.phone);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.website);
            i0.ɵɵadvance(12);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.billingStreet);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.billingCity);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.billingState);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.billingPostalCode);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.billingCountry);
            i0.ɵɵadvance(12);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.shippingStreet);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.shippingCity);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.shippingState);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.shippingPostalCode);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.shippingCountry);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.description);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("label", ctx.primarySaveLabel())("disabled", ctx.saving() || ctx.loading() || ctx.draftSaving());
            i0.ɵɵadvance();
            i0.ɵɵproperty("label", ctx.draftButtonLabel())("disabled", ctx.saving() || ctx.loading() || ctx.draftSaving())("model", ctx.draftSplitButtonItems());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
        } }, dependencies: [CommonModule, i3.NgClass, i3.NgForOf, i3.NgIf, FormsModule, i4.ɵNgNoValidate, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgControlStatusGroup, i4.RequiredValidator, i4.NgModel, i4.NgForm, RouterLink,
            ButtonModule, i5.ButtonDirective, i6.PrimeTemplate, InputTextModule, i7.InputText, TextareaModule, i8.Textarea, SelectModule, i9.Select, CardModule,
            TabsModule, i10.Tabs, i10.TabPanels, i10.TabPanel, i10.TabList, i10.Tab, TableModule, i11.Table, TagModule, i12.Tag, FileUploadModule, i13.FileUpload, InputGroupModule, i14.InputGroup, InputGroupAddonModule, i15.InputGroupAddon, InputNumberModule, i16.InputNumber, DialogModule, i17.Dialog, KnobModule, i18.Knob, SplitButtonModule, i19.SplitButton, BreadcrumbsComponent, i3.DecimalPipe, i3.CurrencyPipe, i3.DatePipe], styles: ["\n\n\n\n\n\n    [_nghost-%COMP%] {\n      \n\n      --apple-blue: 0, 122, 255;\n      --apple-purple: 175, 82, 222;\n      --apple-pink: 255, 45, 85;\n      --apple-teal: 90, 200, 250;\n      --apple-green: 52, 199, 89;\n      --apple-gray-1: 142, 142, 147;\n      --apple-gray-2: 174, 174, 178;\n      --apple-gray-3: 199, 199, 204;\n      --apple-gray-4: 209, 209, 214;\n      --apple-gray-5: 229, 229, 234;\n      --apple-gray-6: 242, 242, 247;\n      --apple-label: 0, 0, 0;\n      --apple-secondary: 60, 60, 67;\n      --apple-tertiary: 60, 60, 67;\n      --apple-fill: 120, 120, 128;\n      \n      \n\n      --gradient-start: rgba(var(--apple-blue), 0.6);\n      --gradient-mid: rgba(var(--apple-purple), 0.4);\n      --gradient-end: rgba(var(--apple-teal), 0.5);\n    }\n\n    .customer-form-page[_ngcontent-%COMP%] {\n      min-height: 100vh;\n      position: relative;\n      \n\n      background: \n        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(var(--apple-blue), 0.08) 0%, transparent 50%),\n        radial-gradient(ellipse 60% 40% at 90% 10%, rgba(var(--apple-purple), 0.06) 0%, transparent 40%),\n        radial-gradient(ellipse 50% 30% at 10% 60%, rgba(var(--apple-teal), 0.05) 0%, transparent 40%),\n        linear-gradient(180deg, \n          rgba(var(--apple-gray-6), 0.95) 0%, \n          rgba(255, 255, 255, 1) 40%,\n          rgba(var(--apple-gray-6), 0.3) 100%);\n      padding-bottom: 5rem;\n    }\n\n    \n\n    .customer-form-page[_ngcontent-%COMP%]::before {\n      content: '';\n      position: fixed;\n      top: -15%;\n      left: -5%;\n      width: 50%;\n      height: 50%;\n      background: radial-gradient(\n        circle,\n        rgba(var(--apple-blue), 0.08) 0%,\n        rgba(var(--apple-blue), 0.03) 30%,\n        transparent 60%\n      );\n      pointer-events: none;\n      z-index: 0;\n      animation: _ngcontent-%COMP%_float-orb-1 18s ease-in-out infinite;\n    }\n\n    .customer-form-page[_ngcontent-%COMP%]::after {\n      content: '';\n      position: fixed;\n      bottom: -20%;\n      right: -10%;\n      width: 60%;\n      height: 60%;\n      background: radial-gradient(\n        circle,\n        rgba(var(--apple-purple), 0.07) 0%,\n        rgba(var(--apple-teal), 0.03) 35%,\n        transparent 60%\n      );\n      pointer-events: none;\n      z-index: 0;\n      animation: _ngcontent-%COMP%_float-orb-2 22s ease-in-out infinite;\n    }\n\n    @keyframes _ngcontent-%COMP%_float-orb-1 {\n      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }\n      25% { transform: translate(30px, -20px) scale(1.05); opacity: 1; }\n      50% { transform: translate(15px, -40px) scale(1.02); opacity: 0.9; }\n      75% { transform: translate(-10px, -15px) scale(1.08); opacity: 1; }\n    }\n\n    @keyframes _ngcontent-%COMP%_float-orb-2 {\n      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }\n      33% { transform: translate(-25px, 25px) scale(1.06); opacity: 1; }\n      66% { transform: translate(15px, 10px) scale(0.98); opacity: 0.85; }\n    }\n\n    \n\n\n\n\n    .page-header[_ngcontent-%COMP%] {\n      position: relative;\n      top: auto;\n      z-index: 100;\n      \n\n      background: rgba(255, 255, 255, 0.65);\n      backdrop-filter: blur(40px) saturate(200%);\n      -webkit-backdrop-filter: blur(40px) saturate(200%);\n      \n\n      border-bottom: 1px solid transparent;\n      background-image: \n        linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)),\n        linear-gradient(90deg, rgba(var(--apple-gray-4), 0.3), rgba(var(--apple-gray-3), 0.2), rgba(var(--apple-gray-4), 0.3));\n      background-origin: border-box;\n      background-clip: padding-box, border-box;\n      padding: 1rem 1.5rem;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);\n      overflow: visible;\n    }\n\n    .header-content[_ngcontent-%COMP%] {\n      max-width: 1200px;\n      margin: 0 auto;\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .back-link[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.375rem;\n      padding: 0.375rem 0.625rem 0.375rem 0.375rem;\n      margin-left: -0.375rem;\n      border: none;\n      background: transparent;\n      color: rgba(var(--apple-blue), 1);\n      font-size: 0.9375rem;\n      font-weight: 500;\n      letter-spacing: -0.01em;\n      border-radius: 8px;\n      cursor: pointer;\n      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    }\n\n    .back-link[_ngcontent-%COMP%]:hover {\n      background: rgba(var(--apple-blue), 0.1);\n      transform: translateX(-2px);\n    }\n\n    .back-link[_ngcontent-%COMP%]:active {\n      background: rgba(var(--apple-blue), 0.15);\n      transform: scale(0.97);\n    }\n\n    .back-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      font-size: 1rem;\n      transition: transform 0.2s ease;\n    }\n\n    .back-link[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n      transform: translateX(-3px);\n    }\n\n    .header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n      margin: 0 0 0.25rem;\n    }\n\n    .header-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n      color: #6b7280;\n      font-size: 1rem;\n      font-weight: 400;\n      max-width: 500px;\n      line-height: 1.6;\n      margin: 0;\n    }\n\n    .customer-header-progress[_ngcontent-%COMP%] {\n      --customer-header-score-color: #2563eb;\n      display: flex;\n      align-items: center;\n      gap: 0.9rem;\n      margin-top: 1rem;\n      padding: 0.78rem 0.9rem;\n      border-radius: 18px;\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      background:\n        radial-gradient(circle at 8% 15%, rgba(var(--apple-blue), 0.14), transparent 42%),\n        radial-gradient(circle at 90% 18%, rgba(var(--apple-green), 0.11), transparent 36%),\n        linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0.68));\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.54),\n        0 14px 26px rgba(15, 23, 42, 0.08);\n      backdrop-filter: blur(12px) saturate(124%);\n      -webkit-backdrop-filter: blur(12px) saturate(124%);\n      max-width: 34rem;\n    }\n\n    .customer-header-progress__dial[_ngcontent-%COMP%] {\n      flex: 0 0 auto;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 96px;\n      height: 96px;\n      border-radius: 20px;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(241, 245, 249, 0.7));\n      border: 1px solid rgba(148, 163, 184, 0.14);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.54),\n        0 10px 18px rgba(15, 23, 42, 0.05);\n    }\n\n    [_nghost-%COMP%]     .customer-header-progress__knob {\n      width: 92px;\n    }\n\n    [_nghost-%COMP%]     .customer-header-progress__knob .p-knob-text {\n      font-size: 1rem;\n      font-weight: 800;\n      fill: #1e293b;\n    }\n\n    .customer-header-progress__content[_ngcontent-%COMP%] {\n      min-width: 0;\n      display: grid;\n      gap: 0.22rem;\n      align-content: center;\n    }\n\n    .customer-header-progress__eyebrow[_ngcontent-%COMP%] {\n      font-size: 0.7rem;\n      font-weight: 800;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n    }\n\n    .customer-header-progress__meta[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n    }\n\n    .customer-header-progress__status[_ngcontent-%COMP%], \n   .customer-header-progress__step[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      min-height: 1.8rem;\n      padding: 0.2rem 0.55rem;\n      border-radius: 999px;\n      font-size: 0.76rem;\n      font-weight: 700;\n      border: 1px solid rgba(148, 163, 184, 0.16);\n      background: rgba(255, 255, 255, 0.72);\n      color: #1e293b;\n    }\n\n    .customer-header-progress__status[_ngcontent-%COMP%] {\n      color: #0f766e;\n      background: rgba(204, 251, 241, 0.82);\n      border-color: rgba(45, 212, 191, 0.28);\n    }\n\n    .customer-header-progress__copy[_ngcontent-%COMP%] {\n      margin: 0;\n      color: #475569;\n      font-size: 0.82rem;\n      line-height: 1.5;\n      max-width: 28rem;\n    }\n\n    \n\n\n\n\n    .form-container[_ngcontent-%COMP%] {\n      position: relative;\n      z-index: 1;\n      max-width: 1200px;\n      margin: 0 auto;\n      padding: 1.5rem;\n    }\n\n    .customer-form[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 1.25rem;\n    }\n\n    .form-fieldset[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 1.25rem;\n      border: none;\n      margin: 0;\n      padding: 0;\n      min-width: 0;\n    }\n\n    \n\n\n\n\n    .form-section[_ngcontent-%COMP%] {\n      position: relative;\n      \n\n      background: rgba(255, 255, 255, 0.55);\n      backdrop-filter: blur(40px) saturate(180%);\n      -webkit-backdrop-filter: blur(40px) saturate(180%);\n      border-radius: 20px;\n      padding: 1.75rem;\n      \n\n      border: 1px solid rgba(255, 255, 255, 0.6);\n      \n\n      box-shadow: \n        0 0 0 1px rgba(255, 255, 255, 0.8) inset,\n        0 1px 2px rgba(0, 0, 0, 0.02),\n        0 4px 12px rgba(0, 0, 0, 0.03),\n        0 16px 32px rgba(0, 0, 0, 0.04);\n      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    }\n\n    \n\n    .form-section[_ngcontent-%COMP%]::before {\n      content: '';\n      position: absolute;\n      inset: -1px;\n      border-radius: 21px;\n      padding: 1px;\n      background: linear-gradient(135deg, \n        transparent 0%,\n        transparent 100%);\n      -webkit-mask: \n        linear-gradient(#fff 0 0) content-box,\n        linear-gradient(#fff 0 0);\n      -webkit-mask-composite: xor;\n      mask-composite: exclude;\n      pointer-events: none;\n      opacity: 0;\n      transition: all 0.4s ease;\n    }\n\n    \n\n    .form-section[_ngcontent-%COMP%]::after {\n      content: '';\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      width: 120%;\n      height: 120%;\n      transform: translate(-50%, -50%);\n      background: radial-gradient(\n        ellipse at center,\n        rgba(var(--apple-blue), 0) 0%,\n        transparent 70%\n      );\n      pointer-events: none;\n      z-index: -1;\n      opacity: 0;\n      transition: all 0.4s ease;\n    }\n\n    .form-section[_ngcontent-%COMP%]:hover {\n      background: rgba(255, 255, 255, 0.72);\n      border-color: transparent;\n      transform: translateY(-3px) scale(1.005);\n      box-shadow: \n        0 0 0 1px rgba(255, 255, 255, 0.9) inset,\n        0 4px 8px rgba(0, 0, 0, 0.03),\n        0 8px 24px rgba(0, 0, 0, 0.06),\n        0 24px 48px rgba(var(--apple-blue), 0.08),\n        0 0 60px rgba(var(--apple-blue), 0.06);\n    }\n\n    .form-section[_ngcontent-%COMP%]:hover::before {\n      opacity: 1;\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.4) 0%,\n        rgba(var(--apple-purple), 0.3) 50%,\n        rgba(var(--apple-teal), 0.4) 100%);\n    }\n\n    .form-section[_ngcontent-%COMP%]:hover::after {\n      opacity: 1;\n      background: radial-gradient(\n        ellipse at center,\n        rgba(var(--apple-blue), 0.04) 0%,\n        transparent 70%\n      );\n    }\n\n    \n\n    .form-section[_ngcontent-%COMP%]:focus-within {\n      background: rgba(255, 255, 255, 0.78);\n      border-color: transparent;\n      transform: translateY(-2px);\n      box-shadow: \n        0 0 0 1px rgba(255, 255, 255, 1) inset,\n        0 4px 12px rgba(0, 0, 0, 0.04),\n        0 12px 32px rgba(var(--apple-blue), 0.1),\n        0 0 80px rgba(var(--apple-blue), 0.08);\n    }\n\n    .form-section[_ngcontent-%COMP%]:focus-within::before {\n      opacity: 1;\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.5) 0%,\n        rgba(var(--apple-purple), 0.35) 50%,\n        rgba(var(--apple-teal), 0.45) 100%);\n    }\n\n    .form-section[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%] {\n      color: #0891b2;\n      border-bottom-color: rgba(6, 182, 212, 0.35);\n    }\n\n    .form-section[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(8, 145, 178, 0.16) 100%);\n      color: #0891b2;\n      transform: scale(1.05);\n      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);\n    }\n\n    \n\n    .duplicate-warning[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 0.75rem 1rem;\n      background: rgba(245, 158, 11, 0.12);\n      border: 1px solid rgba(245, 158, 11, 0.35);\n      border-radius: 0.75rem;\n      margin-bottom: 1rem;\n      font-size: 0.875rem;\n      color: #92400e;\n\n      i {\n        color: #f59e0b;\n        font-size: 1.125rem;\n        flex-shrink: 0;\n      }\n\n      .dup-link {\n        margin-left: auto;\n        color: #4f46e5;\n        font-weight: 600;\n        text-decoration: none;\n        white-space: nowrap;\n\n        &:hover {\n          text-decoration: underline;\n        }\n      }\n    }\n\n    \n\n\n    \n\n    .section--basic[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n      color: #4338ca;\n      border-bottom-color: rgba(99, 102, 241, 0.2);\n    }\n    .section--basic[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.1) 100%);\n      color: #6366f1;\n      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.15);\n    }\n    .section--basic[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%] {\n      color: #4338ca;\n      border-bottom-color: rgba(99, 102, 241, 0.35);\n    }\n    .section--basic[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(79, 70, 229, 0.16) 100%);\n      color: #4f46e5;\n      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);\n    }\n\n    \n\n    .section--contact[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n      color: #047857;\n      border-bottom-color: rgba(16, 185, 129, 0.2);\n    }\n    .section--contact[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%);\n      color: #10b981;\n      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);\n    }\n    .section--contact[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%] {\n      color: #047857;\n      border-bottom-color: rgba(16, 185, 129, 0.35);\n    }\n    .section--contact[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.16) 100%);\n      color: #059669;\n      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);\n    }\n\n    \n\n    .section--additional[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n      color: #b45309;\n      border-bottom-color: rgba(245, 158, 11, 0.2);\n    }\n    .section--additional[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%);\n      color: #f59e0b;\n      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);\n    }\n    .section--additional[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%] {\n      color: #b45309;\n      border-bottom-color: rgba(245, 158, 11, 0.35);\n    }\n    .section--additional[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.16) 100%);\n      color: #d97706;\n      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);\n    }\n\n    \n\n    .section--firmographic[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n      color: #6d28d9;\n      border-bottom-color: rgba(139, 92, 246, 0.2);\n    }\n    .section--firmographic[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(109, 40, 217, 0.1) 100%);\n      color: #8b5cf6;\n      box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15);\n    }\n    .section--firmographic[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%] {\n      color: #6d28d9;\n      border-bottom-color: rgba(139, 92, 246, 0.35);\n    }\n    .section--firmographic[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(139, 92, 246, 0.22) 0%, rgba(109, 40, 217, 0.16) 100%);\n      color: #7c3aed;\n      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);\n    }\n\n    \n\n    .section--billing[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n      color: #0e7490;\n      border-bottom-color: rgba(6, 182, 212, 0.2);\n    }\n    .section--billing[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 116, 144, 0.1) 100%);\n      color: #06b6d4;\n      box-shadow: 0 2px 8px rgba(6, 182, 212, 0.15);\n    }\n    .section--billing[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%] {\n      color: #0e7490;\n      border-bottom-color: rgba(6, 182, 212, 0.35);\n    }\n    .section--billing[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(14, 116, 144, 0.16) 100%);\n      color: #0891b2;\n      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);\n    }\n\n    \n\n    .section--shipping[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n      color: #be123c;\n      border-bottom-color: rgba(244, 63, 94, 0.2);\n    }\n    .section--shipping[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(190, 18, 60, 0.1) 100%);\n      color: #f43f5e;\n      box-shadow: 0 2px 8px rgba(244, 63, 94, 0.15);\n    }\n    .section--shipping[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%] {\n      color: #be123c;\n      border-bottom-color: rgba(244, 63, 94, 0.35);\n    }\n    .section--shipping[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(244, 63, 94, 0.22) 0%, rgba(190, 18, 60, 0.16) 100%);\n      color: #e11d48;\n      box-shadow: 0 4px 12px rgba(244, 63, 94, 0.25);\n    }\n\n    \n\n\n\n\n    .section-title[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 1rem;\n      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n      font-size: 1rem;\n      font-weight: 600;\n      text-transform: none;\n      letter-spacing: -0.01em;\n      color: #0e7490;\n      margin: 0 0 1.5rem;\n      padding-bottom: 1rem;\n      border-bottom: 1px solid rgba(6, 182, 212, 0.2);\n      transition: all 0.3s ease;\n    }\n\n    .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      width: 42px;\n      height: 42px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(8, 145, 178, 0.1) 100%);\n      color: #06b6d4;\n      font-size: 1.25rem;\n      border-radius: 12px;\n      transition: all 0.3s ease;\n      box-shadow: 0 2px 8px rgba(6, 182, 212, 0.15);\n    }\n\n    \n\n\n\n\n    .form-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 1.25rem 1.125rem;\n    }\n\n    .full-row[_ngcontent-%COMP%], \n   .full-width[_ngcontent-%COMP%] {\n      grid-column: 1 / -1;\n    }\n\n    .field[_ngcontent-%COMP%], \n   .form-field[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      gap: 0.75rem;\n    }\n\n    .field[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%], \n   .form-field[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 0.8125rem;\n      font-weight: 600;\n      color: #475569;\n      letter-spacing: 0.01em;\n      white-space: nowrap;\n      min-width: 110px;\n      flex-shrink: 0;\n      text-align: right;\n      transition: color 0.2s ease;\n    }\n\n    \n\n    .form-field[_ngcontent-%COMP%]    > p-inputgroup[_ngcontent-%COMP%], \n   .form-field[_ngcontent-%COMP%]    > p-select[_ngcontent-%COMP%], \n   .form-field[_ngcontent-%COMP%]    > textarea[_ngcontent-%COMP%] {\n      flex: 1;\n      min-width: 0;\n    }\n\n    .form-section[_ngcontent-%COMP%]:hover   .field[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%], \n   .form-section[_ngcontent-%COMP%]:hover   .form-field[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n      color: #334155;\n    }\n\n    .form-field[_ngcontent-%COMP%]:focus-within    > label[_ngcontent-%COMP%] {\n      color: #4f46e5;\n    }\n\n    .field-error[_ngcontent-%COMP%] {\n      margin: 0.35rem 0 0;\n      font-size: 0.75rem;\n      color: #b91c1c;\n    }\n\n    .required[_ngcontent-%COMP%] {\n      color: #ef4444 !important;\n      font-weight: 600;\n    }\n\n    .w-full[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n\n    \n\n\n\n\n    \n\n    [_nghost-%COMP%]     p-inputgroup-addon.icon-addon {\n      background: rgba(var(--apple-gray-6), 0.6);\n      border: 1px solid rgba(var(--apple-gray-4), 0.4);\n      border-right: none;\n      border-radius: 12px 0 0 12px;\n      padding: 0.5rem 0.65rem;\n      min-width: 2.5rem;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    }\n\n    [_nghost-%COMP%]     p-inputgroup-addon.icon-addon i {\n      font-size: 1rem;\n    }\n\n    \n\n    [_nghost-%COMP%]     p-inputgroup:focus-within p-inputgroup-addon.icon-addon {\n      background: rgba(255, 255, 255, 0.95);\n      border-color: rgba(var(--apple-blue), 0.5);\n      transform: scale(1.03);\n    }\n\n    \n\n    [_nghost-%COMP%]     .p-inputgroup .p-inputtext {\n      border-radius: 0 12px 12px 0 !important;\n      border-left: none !important;\n    }\n\n    \n\n    [_nghost-%COMP%]     p-inputgroup-addon.icon-addon--name {\n      background: rgba(99, 102, 241, 0.14) !important;\n      border-color: rgba(99, 102, 241, 0.3) !important;\n      i { color: #6366f1 !important; }\n    }\n\n    [_nghost-%COMP%]     p-inputgroup-addon.icon-addon--industry {\n      background: rgba(168, 85, 247, 0.14) !important;\n      border-color: rgba(168, 85, 247, 0.3) !important;\n      i { color: #a855f7 !important; }\n    }\n\n    [_nghost-%COMP%]     p-inputgroup-addon.icon-addon--company {\n      background: rgba(59, 130, 246, 0.14) !important;\n      border-color: rgba(59, 130, 246, 0.3) !important;\n      i { color: #3b82f6 !important; }\n    }\n\n    [_nghost-%COMP%]     p-inputgroup-addon.icon-addon--email {\n      background: rgba(236, 72, 153, 0.14) !important;\n      border-color: rgba(236, 72, 153, 0.3) !important;\n      i { color: #ec4899 !important; }\n    }\n\n    [_nghost-%COMP%]     p-inputgroup-addon.icon-addon--phone {\n      background: rgba(34, 197, 94, 0.14) !important;\n      border-color: rgba(34, 197, 94, 0.3) !important;\n      i { color: #22c55e !important; }\n    }\n\n    [_nghost-%COMP%]     p-inputgroup-addon.icon-addon--website {\n      background: rgba(79, 70, 229, 0.14) !important;\n      border-color: rgba(79, 70, 229, 0.3) !important;\n      i { color: #4f46e5 !important; }\n    }\n\n    [_nghost-%COMP%]     p-inputgroup-addon.icon-addon--address {\n      background: rgba(245, 158, 11, 0.14) !important;\n      border-color: rgba(245, 158, 11, 0.3) !important;\n      i { color: #f59e0b !important; }\n    }\n\n    \n\n    [_nghost-%COMP%]     .p-inputtext, \n   [_nghost-%COMP%]     .p-select .p-select-label, \n   [_nghost-%COMP%]     .p-textarea {\n      color: #1e293b !important;\n      font-weight: 500 !important;\n    }\n\n    \n\n\n\n\n    [_nghost-%COMP%]     .p-inputtext, \n   [_nghost-%COMP%]     .p-select, \n   [_nghost-%COMP%]     .p-inputnumber, \n   [_nghost-%COMP%]     .p-textarea {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;\n      background: rgba(var(--apple-gray-6), 0.5) !important;\n      border: 1px solid rgba(var(--apple-gray-4), 0.4) !important;\n      border-radius: 12px !important;\n      font-size: 0.9375rem !important;\n      padding: 0.75rem 1rem !important;\n      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      box-shadow: \n        inset 0 1px 2px rgba(0, 0, 0, 0.02),\n        0 1px 2px rgba(255, 255, 255, 0.5) !important;\n    }\n\n\n\n    [_nghost-%COMP%]     .p-inputtext:hover, \n   [_nghost-%COMP%]     .p-select:hover, \n   [_nghost-%COMP%]     .p-inputnumber:hover, \n   [_nghost-%COMP%]     .p-textarea:hover {\n      background: rgba(var(--apple-gray-5), 0.6) !important;\n      border-color: rgba(var(--apple-gray-3), 0.5) !important;\n      box-shadow: \n        inset 0 1px 2px rgba(0, 0, 0, 0.02),\n        0 2px 4px rgba(0, 0, 0, 0.02) !important;\n    }\n\n    [_nghost-%COMP%]     .p-inputtext:focus, \n   [_nghost-%COMP%]     .p-select:focus, \n   [_nghost-%COMP%]     .p-select.p-focus, \n   [_nghost-%COMP%]     .p-inputnumber:focus, \n   [_nghost-%COMP%]     .p-textarea:focus {\n      background: rgba(255, 255, 255, 0.95) !important;\n      border-color: rgba(var(--apple-blue), 0.5) !important;\n      box-shadow: \n        0 0 0 4px rgba(var(--apple-blue), 0.15),\n        0 4px 12px rgba(var(--apple-blue), 0.1),\n        inset 0 0 0 1px rgba(var(--apple-blue), 0.2) !important;\n      outline: none !important;\n    }\n\n    [_nghost-%COMP%]     .p-inputtext::placeholder {\n      color: rgba(var(--apple-gray-1), 0.6);\n      font-weight: 400;\n    }\n\n    \n\n\n\n\n    .form-actions[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: flex-end;\n      gap: 0.75rem;\n      padding-top: 0.75rem;\n    }\n\n    .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;\n      min-width: 130px;\n      border-radius: 12px !important;\n      font-weight: 600 !important;\n      font-size: 0.9375rem !important;\n      padding: 0.75rem 1.5rem !important;\n      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      letter-spacing: -0.01em !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--ghost {\n      background: rgba(255, 255, 255, 0.7) !important;\n      border: 1px solid rgba(var(--apple-gray-3), 0.5) !important;\n      color: rgba(var(--apple-label), 0.8) !important;\n      box-shadow: \n        0 1px 3px rgba(0, 0, 0, 0.04),\n        inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;\n      backdrop-filter: blur(10px) !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--ghost:hover {\n      background: rgba(255, 255, 255, 0.9) !important;\n      border-color: rgba(var(--apple-gray-2), 0.6) !important;\n      color: rgba(var(--apple-label), 0.95) !important;\n      transform: translateY(-1px) !important;\n      box-shadow: \n        0 2px 8px rgba(0, 0, 0, 0.06),\n        inset 0 1px 0 rgba(255, 255, 255, 1) !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--ghost:active {\n      background: rgba(var(--apple-gray-5), 0.8) !important;\n      transform: translateY(0) scale(0.98) !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--primary {\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 1) 0%, \n        rgba(var(--apple-blue), 0.85) 100%) !important;\n      border: none !important;\n      color: white !important;\n      box-shadow: \n        0 2px 4px rgba(0, 0, 0, 0.1),\n        0 4px 16px rgba(var(--apple-blue), 0.25),\n        inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--primary:hover:not(:disabled) {\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.92) 0%, \n        rgba(var(--apple-blue), 0.78) 100%) !important;\n      transform: translateY(-2px) !important;\n      box-shadow: \n        0 4px 8px rgba(0, 0, 0, 0.12),\n        0 8px 24px rgba(var(--apple-blue), 0.3),\n        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--primary:active:not(:disabled) {\n      transform: translateY(0) scale(0.98) !important;\n      box-shadow: \n        0 1px 3px rgba(0, 0, 0, 0.1),\n        0 2px 8px rgba(var(--apple-blue), 0.2),\n        inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--primary:disabled {\n      background: rgba(var(--apple-gray-4), 0.8) !important;\n      color: rgba(var(--apple-gray-1), 1) !important;\n      box-shadow: none !important;\n      cursor: not-allowed !important;\n      transform: none !important;\n    }\n\n    \n\n\n\n\n    .detail-container[_ngcontent-%COMP%] {\n      padding-top: 0;\n    }\n\n    .timeline[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .timeline-item[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 120px 1fr;\n      gap: 1rem;\n      padding: 1rem;\n      border-radius: 14px;\n      background: rgba(248, 250, 252, 0.9);\n      border: 1px solid rgba(226, 232, 240, 0.7);\n    }\n\n    .type-dot[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      padding: 0.35rem 0.75rem;\n      border-radius: 999px;\n      font-size: 0.75rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.04em;\n      background: rgba(59, 130, 246, 0.12);\n      color: #1d4ed8;\n    }\n\n    .type-dot[data-type='Call'][_ngcontent-%COMP%] { background: rgba(16, 185, 129, 0.15); color: #047857; }\n    .type-dot[data-type='Meeting'][_ngcontent-%COMP%] { background: rgba(99, 102, 241, 0.15); color: #4338ca; }\n    .type-dot[data-type='Email'][_ngcontent-%COMP%] { background: rgba(251, 146, 60, 0.18); color: #c2410c; }\n    .type-dot[data-type='Task'][_ngcontent-%COMP%] { background: rgba(148, 163, 184, 0.2); color: #475569; }\n    .type-dot[data-type='Note'][_ngcontent-%COMP%] { background: rgba(236, 72, 153, 0.15); color: #be185d; }\n\n    .timeline-title[_ngcontent-%COMP%] {\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .timeline-meta[_ngcontent-%COMP%] {\n      color: #64748b;\n      font-size: 0.85rem;\n      margin: 0.25rem 0 0.5rem;\n    }\n\n    .timeline-description[_ngcontent-%COMP%] {\n      color: #334155;\n    }\n\n    .notes[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .note-editor[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .note-actions[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: flex-end;\n    }\n\n    .note-item[_ngcontent-%COMP%] {\n      padding: 1rem;\n      border-radius: 14px;\n      background: rgba(248, 250, 252, 0.9);\n      border: 1px solid rgba(226, 232, 240, 0.7);\n    }\n\n    .note-header[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      gap: 1rem;\n      font-weight: 700;\n      color: #1f2937;\n      margin-bottom: 0.5rem;\n    }\n\n    .note-meta[_ngcontent-%COMP%] {\n      font-weight: 500;\n      color: #94a3b8;\n      font-size: 0.8rem;\n    }\n\n    .note-body[_ngcontent-%COMP%] {\n      color: #475569;\n      white-space: pre-wrap;\n    }\n\n    .related-grid[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 1.5rem;\n    }\n\n    .related-summary-strip[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      gap: 1rem;\n      margin-bottom: 1.25rem;\n    }\n\n    .summary-chip[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.35rem;\n      padding: 0.85rem 1rem;\n      border-radius: 16px;\n      background: rgba(255, 255, 255, 0.75);\n      border: 1px solid rgba(226, 232, 240, 0.8);\n      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);\n    }\n\n    .chip-label[_ngcontent-%COMP%] {\n      font-size: 0.75rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n      font-weight: 600;\n    }\n\n    .chip-value[_ngcontent-%COMP%] {\n      font-size: 1.4rem;\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .chip-meta[_ngcontent-%COMP%] {\n      font-size: 0.85rem;\n      color: #475569;\n    }\n\n    .related-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n      margin-bottom: 0.75rem;\n      color: #1f2937;\n      font-size: 1rem;\n      font-weight: 700;\n    }\n\n    .attachments[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .compact-table[_ngcontent-%COMP%]     .p-datatable-thead > tr > th {\n      font-size: 0.75rem;\n      text-transform: uppercase;\n      letter-spacing: 0.04em;\n      color: #64748b;\n    }\n\n    .related-link[_ngcontent-%COMP%] {\n      color: #2563eb;\n      font-weight: 600;\n      text-decoration: none;\n    }\n\n    .related-link[_ngcontent-%COMP%]:hover {\n      color: #1d4ed8;\n      text-decoration: underline;\n    }\n\n    .clickable-row[_ngcontent-%COMP%] {\n      cursor: pointer;\n      transition: background-color 0.15s ease;\n    }\n\n    .clickable-row[_ngcontent-%COMP%]:hover {\n      background: rgba(37, 99, 235, 0.06);\n    }\n\n    .table-actions[_ngcontent-%COMP%] {\n      width: 48px;\n      text-align: right;\n    }\n\n    .empty-state[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 0.35rem;\n      padding: 1.5rem 1rem;\n      color: #94a3b8;\n      font-size: 0.9rem;\n      text-align: center;\n\n      > i {\n        font-size: 1.5rem;\n        opacity: 0.5;\n      }\n\n      .empty-state-link {\n        font-size: 0.82rem;\n        font-weight: 600;\n        color: #6366f1;\n        cursor: pointer;\n        text-decoration: none;\n        transition: color 200ms;\n\n        &:hover { color: #4338ca; }\n      }\n    }\n\n    \n\n\n\n\n    @media (max-width: 768px) {\n      .page-header[_ngcontent-%COMP%] {\n        padding: 0.75rem;\n      }\n\n      .form-container[_ngcontent-%COMP%] {\n        padding: 0.75rem;\n      }\n\n      .form-section[_ngcontent-%COMP%] {\n        padding: 1.25rem;\n        border-radius: 16px;\n      }\n\n      .form-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n        gap: 1rem;\n      }\n\n      .field[_ngcontent-%COMP%], \n   .form-field[_ngcontent-%COMP%] {\n        flex-direction: column;\n        align-items: flex-start;\n      }\n\n      .field[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%], \n   .form-field[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n        min-width: unset;\n      }\n\n      .form-actions[_ngcontent-%COMP%] {\n        flex-direction: column;\n      }\n\n      .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n        width: 100%;\n        min-width: auto;\n      }\n\n      .header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n        font-size: 1.5rem;\n      }\n\n      .customer-header-progress[_ngcontent-%COMP%] {\n        flex-direction: column;\n        align-items: stretch;\n        max-width: 100%;\n      }\n\n      .customer-header-progress__dial[_ngcontent-%COMP%] {\n        align-self: flex-start;\n      }\n\n      .section-title[_ngcontent-%COMP%] {\n        font-size: 0.9rem;\n        gap: 0.75rem;\n      }\n\n      .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n        width: 36px;\n        height: 36px;\n        font-size: 1.1rem;\n      }\n\n      .summary-chip[_ngcontent-%COMP%] {\n        padding: 0.65rem 0.75rem;\n      }\n\n      .timeline-item[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n        gap: 0.5rem;\n      }\n    }\n\n    @media (max-width: 480px) {\n      .page-header[_ngcontent-%COMP%] {\n        padding: 0.5rem;\n      }\n\n      .form-container[_ngcontent-%COMP%] {\n        padding: 0.5rem;\n      }\n\n      .form-section[_ngcontent-%COMP%] {\n        padding: 1rem;\n        border-radius: 14px;\n      }\n    }\n\n    \n\n\n\n\n    [_nghost-%COMP%] {\n      scrollbar-width: thin;\n      scrollbar-color: rgba(var(--apple-gray-2), 0.4) transparent;\n    }\n\n    [_nghost-%COMP%]::-webkit-scrollbar {\n      width: 10px;\n    }\n\n    [_nghost-%COMP%]::-webkit-scrollbar-track {\n      background: transparent;\n    }\n\n    [_nghost-%COMP%]::-webkit-scrollbar-thumb {\n      background: rgba(var(--apple-gray-2), 0.4);\n      border-radius: 5px;\n      border: 3px solid transparent;\n      background-clip: content-box;\n    }\n\n    [_nghost-%COMP%]::-webkit-scrollbar-thumb:hover {\n      background: rgba(var(--apple-gray-1), 0.5);\n      background-clip: content-box;\n    }\n\n    \n\n    [_ngcontent-%COMP%]::selection {\n      background: rgba(var(--apple-blue), 0.25);\n      color: inherit;\n    }\n  \n.presence-strip[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n\n.presence-focus[_ngcontent-%COMP%] {\n  margin-top: 0.55rem;\n  display: inline-flex;\n  position: relative;\n  align-items: center;\n  gap: 0.45rem;\n  border-radius: 0.75rem;\n  padding: 0.4rem 0.7rem;\n  font-size: 0.8rem;\n  font-weight: 700;\n  border: 1px solid rgba(14, 165, 233, 0.22);\n  color: #0c4a6e;\n  background: linear-gradient(135deg, rgba(224, 242, 254, 0.95), rgba(186, 230, 253, 0.92));\n  box-shadow: 0 8px 18px rgba(2, 132, 199, 0.18), 0 0 0 1px rgba(125, 211, 252, 0.28) inset;\n  -webkit-user-select: none;\n  user-select: none;\n  caret-color: transparent;\n  cursor: default;\n\n  &::selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  &::-moz-selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  // Glowing comet that orbits OUTSIDE the chip border\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 2rem;\n    height: 2px;\n    border-radius: 999px;\n    background: linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.6) 15%,\n      rgba(255, 255, 255, 1) 50%,\n      rgba(255, 255, 255, 0.6) 85%,\n      transparent 100%\n    );\n    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1))\n            drop-shadow(0 0 5px rgba(186, 230, 253, 0.9))\n            drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))\n            drop-shadow(0 0 18px rgba(14, 165, 233, 0.35));\n    offset-path: inset(0px round 0.75rem);\n    offset-distance: 0%;\n    offset-rotate: auto;\n    animation: _ngcontent-%COMP%_presence-border-tail 3.5s linear infinite;\n    will-change: offset-distance;\n    pointer-events: none;\n    z-index: 3;\n  }\n\n  > * {\n    position: relative;\n    z-index: 1;\n  }\n\n  i {\n    color: #0284c7;\n    font-size: 0.85rem;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_presence-border-tail {\n  from { offset-distance: 0%; }\n  to   { offset-distance: 100%; }\n}\n\n.presence-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #64748b;\n  font-weight: 600;\n}\n\n.presence-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #0f172a;\n  border: 1px solid rgba(14, 165, 233, 0.32);\n  background: rgba(224, 242, 254, 0.8);\n}\n\n.presence-editing-note[_ngcontent-%COMP%] {\n  margin-top: 0.45rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  border: 1px solid rgba(251, 146, 60, 0.45);\n  background: linear-gradient(135deg, rgba(255, 247, 237, 0.98), rgba(254, 215, 170, 0.85));\n  color: #9a3412;\n  border-radius: 0.65rem;\n  padding: 0.35rem 0.65rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  box-shadow: 0 8px 18px rgba(251, 146, 60, 0.18), 0 0 0 1px rgba(254, 215, 170, 0.32) inset;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CustomerFormPage, [{
        type: Component,
        args: [{ selector: 'app-customer-form-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    RouterLink,
                    ButtonModule,
                    InputTextModule,
                    TextareaModule,
                    SelectModule,
                    CardModule,
                    TabsModule,
                    TableModule,
                    TagModule,
                    FileUploadModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    InputNumberModule,
                    DialogModule,
                    KnobModule,
                    SplitButtonModule,
                    BreadcrumbsComponent
                ], template: "\n    <div class=\"customer-form-page\">\n      <app-breadcrumbs></app-breadcrumbs>\n      <p-dialog\n        header=\"Saved drafts available\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"draftPromptVisible()\"\n        [style]=\"{ width: '38rem', maxWidth: '96vw' }\"\n        styleClass=\"form-draft-prompt-dialog\"\n        (visibleChange)=\"draftPromptVisible.set($event)\"\n        (onHide)=\"dismissDraftPrompt()\"\n      >\n        <div class=\"form-draft-prompt\">\n          <div class=\"form-draft-prompt__hero\">\n            <div class=\"form-draft-prompt__icon\">\n              <i class=\"pi pi-bookmark\"></i>\n            </div>\n            <div>\n              <h3>Resume a saved customer draft?</h3>\n              <p>You have saved customer drafts. Choose one to continue where you left off, or start with a blank form.</p>\n            </div>\n          </div>\n          <div class=\"form-draft-list\" *ngIf=\"recentDrafts().length; else noCustomerPromptDrafts\">\n            <div class=\"form-draft-list__item\" *ngFor=\"let draft of recentDrafts()\">\n              <span class=\"form-draft-list__title\">{{ draft.title }}</span>\n              <span class=\"form-draft-list__meta\">{{ draft.subtitle || 'No industry' }} \u00B7 {{ formatDraftTimestamp(draft.updatedAtUtc) }}</span>\n              <span class=\"form-draft-list__actions\">\n                <button type=\"button\" class=\"form-draft-list__resume\" (click)=\"loadDraftFromPrompt(draft)\">Load draft</button>\n              </span>\n            </div>\n          </div>\n          <ng-template #noCustomerPromptDrafts>\n            <p class=\"form-draft-dialog__empty\">No saved drafts available.</p>\n          </ng-template>\n          <div class=\"lead-status-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Start fresh\" (click)=\"dismissDraftPrompt()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"View all drafts\" (click)=\"dismissDraftPrompt(); openDraftLibrary()\"></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        header=\"Open saved draft?\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"draftOpenConfirmVisible()\"\n        [style]=\"{ width: '28rem', maxWidth: '94vw' }\"\n        (visibleChange)=\"draftOpenConfirmVisible.set($event)\"\n        (onHide)=\"cancelOpenDraft()\"\n      >\n        <div class=\"form-draft-dialog\">\n          <p>Your current unsaved changes will be replaced by the selected draft.</p>\n          <div class=\"lead-status-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Cancel\" (click)=\"cancelOpenDraft()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Open Draft\" (click)=\"confirmOpenDraft()\"></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        header=\"Unsaved customer changes\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"false\"\n        [visible]=\"leavePromptVisible()\"\n        [style]=\"{ width: '36rem', maxWidth: '96vw' }\"\n        styleClass=\"form-leave-dialog\"\n        (visibleChange)=\"leavePromptVisible.set($event)\"\n        (onHide)=\"stayOnForm()\"\n      >\n        <div class=\"form-leave-dialog__body\">\n          <div class=\"form-leave-dialog__hero\">\n            <div class=\"form-leave-dialog__icon\">\n              <i class=\"pi pi-exclamation-circle\"></i>\n            </div>\n            <div>\n              <h3>Your customer form has unsaved changes.</h3>\n              <p>Choose whether to save the current state as a draft, submit the customer now, or leave without saving.</p>\n            </div>\n          </div>\n          <div class=\"form-leave-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Stay on form\" [disabled]=\"saving() || draftSaving()\" (click)=\"stayOnForm()\"></button>\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Leave without saving\" [disabled]=\"saving() || draftSaving()\" (click)=\"leaveWithoutSaving()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--secondary\" label=\"Save to draft\" [loading]=\"draftSaving()\" [disabled]=\"saving() || draftSaving()\" (click)=\"saveDraftAndLeave()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" [label]=\"primarySaveLabel()\" [loading]=\"saving()\" [disabled]=\"saving() || draftSaving()\" (click)=\"submitAndLeave()\"></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        header=\"Saved customer drafts\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"draftLibraryVisible()\"\n        [style]=\"{ width: '42rem', maxWidth: '96vw' }\"\n        (visibleChange)=\"draftLibraryVisible.set($event)\"\n        (onHide)=\"closeDraftLibrary()\"\n      >\n        <div class=\"form-draft-dialog\">\n          <p class=\"form-draft-dialog__empty\" *ngIf=\"!draftLibraryLoading() && !draftLibraryItems().length\">No saved drafts yet.</p>\n          <div class=\"form-draft-list\" *ngIf=\"draftLibraryItems().length\">\n            <div class=\"form-draft-list__item\" *ngFor=\"let draft of draftLibraryItems()\">\n              <span class=\"form-draft-list__title\">{{ draft.title }}</span>\n              <span class=\"form-draft-list__meta\">{{ draft.subtitle || 'No industry' }} \u00B7 {{ formatDraftTimestamp(draft.updatedAtUtc) }}</span>\n              <span class=\"form-draft-list__actions\">\n                <button type=\"button\" class=\"form-draft-list__resume\" (click)=\"openDraftFromSummary(draft)\">Resume</button>\n                <button type=\"button\" class=\"form-draft-list__discard\" (click)=\"discardDraft(draft, $event)\">Discard</button>\n              </span>\n            </div>\n          </div>\n        </div>\n      </p-dialog>\n      <!-- Page Header -->\n      <header class=\"page-header\">\n        <div class=\"header-content\">\n          <button pButton type=\"button\" class=\"back-link p-button-text\" routerLink=\"/app/customers\">\n            <i class=\"pi pi-arrow-left\"></i>\n            <span>Back to customers</span>\n          </button>\n          <div class=\"header-title\">\n            <h1 class=\"hero-title\">\n              <span class=\"title-gradient\">{{ isEditMode() ? 'Edit' : 'Create New' }}</span>\n              <span class=\"title-light\">Customer</span>\n            </h1>\n            <p>{{ isEditMode() ? 'Update customer information' : 'Add a new customer to your CRM' }}</p>\n            <div class=\"customer-header-progress\" *ngIf=\"isEditMode()\">\n              <div class=\"customer-header-progress__dial\">\n                <p-knob\n                  [ngModel]=\"customerHeaderScoreValue()\"\n                  [readonly]=\"true\"\n                  [valueTemplate]=\"'{value}%'\"\n                  [size]=\"92\"\n                  [strokeWidth]=\"9\"\n                  [showValue]=\"true\"\n                  [min]=\"0\"\n                  [max]=\"100\"\n                  valueColor=\"var(--customer-header-score-color)\"\n                  rangeColor=\"rgba(148, 163, 184, 0.18)\"\n                  textColor=\"#1e293b\"\n                  styleClass=\"customer-header-progress__knob\"\n                ></p-knob>\n              </div>\n              <div class=\"customer-header-progress__content\" [style.--customer-header-score-color]=\"customerHeaderScoreColor()\">\n                <span class=\"customer-header-progress__eyebrow\">Overall customer score</span>\n                <div class=\"customer-header-progress__meta\">\n                  <span class=\"customer-header-progress__status\">{{ form.lifecycleStage || 'Lead' }}</span>\n                  <span class=\"customer-header-progress__step\">{{ customerLifecycleSummary() }}</span>\n                </div>\n                <p class=\"customer-header-progress__copy\">{{ customerHeaderScoreMessage() }}</p>\n              </div>\n            </div>\n            <div class=\"form-draft-status\" *ngIf=\"draftStatusMessage() as draftStatus\">\n              <i class=\"pi pi-bookmark\"></i>\n              <span>{{ draftStatus }}</span>\n            </div>\n            <div class=\"form-draft-banner\" *ngIf=\"draftModeActive()\">\n              <i class=\"pi pi-info-circle\"></i>\n              <span>This form is loaded from a saved draft. Final Save will create or update the live CRM record.</span>\n            </div>\n            <div class=\"presence-focus\" *ngIf=\"isEditMode() && visiblePresenceUsers().length\">\n              <i class=\"pi pi-eye\"></i>\n              <span>{{ viewingPresenceSummary() }}</span>\n            </div>\n            <div class=\"presence-editing-note\" *ngIf=\"isEditMode() && activeEditors().length\">\n              <i class=\"pi pi-pencil\"></i>\n              <span>{{ editingPresenceSummary() }}</span>\n            </div>\n          </div>\n        </div>\n      </header>\n\n      <!-- Form Section -->\n      <main class=\"form-container\">\n        <form class=\"customer-form\" (ngSubmit)=\"onSave()\">\n          <section class=\"related-summary-strip\" *ngIf=\"isEditMode()\">\n            <div class=\"summary-chip\">\n              <span class=\"chip-label\">Contacts</span>\n              <span class=\"chip-value\">{{ contactCount() }}</span>\n              <span class=\"chip-meta\" *ngIf=\"latestContactCreatedAt()\">\n                Last added {{ latestContactCreatedAt() | date: 'MMM d, yyyy' }}\n              </span>\n            </div>\n            <div class=\"summary-chip\">\n              <span class=\"chip-label\">Opportunities</span>\n              <span class=\"chip-value\">{{ opportunityCount() }}</span>\n              <span class=\"chip-meta\" *ngIf=\"latestOpportunityCreatedAt()\">\n                Last added {{ latestOpportunityCreatedAt() | date: 'MMM d, yyyy' }}\n              </span>\n            </div>\n          </section>\n          <fieldset class=\"form-fieldset\" [disabled]=\"loading()\">\n\n            <div class=\"duplicate-warning\" *ngIf=\"duplicateWarning() as dup\">\n              <i class=\"pi pi-exclamation-triangle\"></i>\n              <span>Possible duplicate found: <strong>{{ dup.matchName }}</strong></span>\n              <a [routerLink]=\"['/app/customers', dup.matchId]\" class=\"dup-link\">View existing record</a>\n            </div>\n\n            <section class=\"form-section section--basic\">\n              <h2 class=\"section-title\">\n                <i class=\"pi pi-user\"></i>\n                Basic information\n              </h2>\n              \n              <div class=\"form-grid\">\n                <div class=\"form-field\">\n                  <label for=\"customerName\">Customer Name <span class=\"required\">*</span></label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                      <i class=\"pi pi-user\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"customerName\" name=\"name\" [(ngModel)]=\"form.name\" required placeholder=\"Enter customer name\" (blur)=\"checkForDuplicate()\" />\n                  </p-inputgroup>\n                  <p class=\"field-error\" *ngIf=\"nameError()\">{{ nameError() }}</p>\n                </div>\n                \n                <div class=\"form-field\">\n                  <label for=\"customerStatus\">Lifecycle Stage</label>\n                  <p-select\n                    id=\"customerStatus\"\n                    [options]=\"statusOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    name=\"status\"\n                    [(ngModel)]=\"form.lifecycleStage\"\n                    placeholder=\"Select status\"\n                    appendTo=\"body\"\n                    styleClass=\"w-full\"\n                  ></p-select>\n                </div>\n                \n                <div class=\"form-field\">\n                  <label for=\"parentAccountId\">Parent Account</label>\n                  <p-select\n                    id=\"parentAccountId\"\n                    [options]=\"parentAccountOptions()\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    name=\"parentAccountId\"\n                    [(ngModel)]=\"form.parentAccountId\"\n                    placeholder=\"Select parent account\"\n                    appendTo=\"body\"\n                    styleClass=\"w-full\"\n                  ></p-select>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"customerIndustry\">Industry</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--industry\">\n                      <i class=\"pi pi-building\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"customerIndustry\" name=\"industry\" [(ngModel)]=\"form.industry\" placeholder=\"e.g., Technology, Healthcare\" />\n                  </p-inputgroup>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"customerCompany\">Company</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--company\">\n                      <i class=\"pi pi-briefcase\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"customerCompany\" name=\"company\" [(ngModel)]=\"form.company\" placeholder=\"Company name\" />\n                  </p-inputgroup>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"form-section section--firmographic\">\n              <h2 class=\"section-title\">\n                <i class=\"pi pi-chart-bar\"></i>\n                Firmographic details\n              </h2>\n              \n              <div class=\"form-grid\">\n                <div class=\"form-field\">\n                  <label for=\"accountType\">Account Type</label>\n                  <p-select\n                    id=\"accountType\"\n                    [options]=\"accountTypeOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    name=\"accountType\"\n                    [(ngModel)]=\"form.accountType\"\n                    placeholder=\"Select type\"\n                    appendTo=\"body\"\n                    styleClass=\"w-full\"\n                  >\n                    <ng-template pTemplate=\"item\" let-option>\n                      <div class=\"select-option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n                    </ng-template>\n                    <ng-template pTemplate=\"value\" let-option>\n                      <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n                      <span *ngIf=\"!option\" class=\"select-placeholder\">Select type</span>\n                    </ng-template>\n                  </p-select>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"rating\">Rating</label>\n                  <p-select\n                    id=\"rating\"\n                    [options]=\"ratingOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    name=\"rating\"\n                    [(ngModel)]=\"form.rating\"\n                    placeholder=\"Select rating\"\n                    appendTo=\"body\"\n                    styleClass=\"w-full\"\n                  >\n                    <ng-template pTemplate=\"item\" let-option>\n                      <div class=\"select-option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n                    </ng-template>\n                    <ng-template pTemplate=\"value\" let-option>\n                      <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n                      <span *ngIf=\"!option\" class=\"select-placeholder\">Select rating</span>\n                    </ng-template>\n                  </p-select>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"accountSource\">Source</label>\n                  <p-select\n                    id=\"accountSource\"\n                    [options]=\"accountSourceOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    name=\"accountSource\"\n                    [(ngModel)]=\"form.accountSource\"\n                    placeholder=\"Select source\"\n                    appendTo=\"body\"\n                    styleClass=\"w-full\"\n                  >\n                    <ng-template pTemplate=\"item\" let-option>\n                      <div class=\"select-option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n                    </ng-template>\n                    <ng-template pTemplate=\"value\" let-option>\n                      <div class=\"select-option\" *ngIf=\"option\"><i class=\"pi\" [ngClass]=\"option.icon\"></i><span>{{ option.label }}</span></div>\n                      <span *ngIf=\"!option\" class=\"select-placeholder\">Select source</span>\n                    </ng-template>\n                  </p-select>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"annualRevenue\">Annual Revenue</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--success\">\n                      <i class=\"pi pi-dollar\"></i>\n                    </p-inputgroup-addon>\n                    <p-inputNumber id=\"annualRevenue\" name=\"annualRevenue\" [(ngModel)]=\"form.annualRevenue\" mode=\"currency\" currency=\"USD\" locale=\"en-US\" placeholder=\"0.00\" [inputStyleClass]=\"'w-full'\"></p-inputNumber>\n                  </p-inputgroup>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"numberOfEmployees\">Employees</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                      <i class=\"pi pi-users\"></i>\n                    </p-inputgroup-addon>\n                    <p-inputNumber id=\"numberOfEmployees\" name=\"numberOfEmployees\" [(ngModel)]=\"form.numberOfEmployees\" [useGrouping]=\"true\" placeholder=\"0\" [inputStyleClass]=\"'w-full'\"></p-inputNumber>\n                  </p-inputgroup>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"territory\">Territory</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--address\">\n                      <i class=\"pi pi-map\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"territory\" name=\"territory\" [(ngModel)]=\"form.territory\" placeholder=\"e.g., North America, EMEA\" />\n                  </p-inputgroup>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"form-section section--contact\">\n              <h2 class=\"section-title\">\n                <i class=\"pi pi-phone\"></i>\n                Contact information\n              </h2>\n              \n              <div class=\"form-grid\">\n                <div class=\"form-field\">\n                  <label for=\"customerEmail\">Email Address</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--email\">\n                      <i class=\"pi pi-envelope\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"customerEmail\" name=\"email\" type=\"email\" [(ngModel)]=\"form.email\" placeholder=\"customer@example.com\" />\n                  </p-inputgroup>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"customerPhone\">Phone Number</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--phone\">\n                      <i class=\"pi pi-phone\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"customerPhone\" name=\"phone\" [(ngModel)]=\"form.phone\" placeholder=\"+1 (555) 000-0000\" (blur)=\"checkForDuplicate()\" />\n                  </p-inputgroup>\n                </div>\n                \n                <div class=\"form-field\">\n                  <label for=\"customerWebsite\">Website</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--website\">\n                      <i class=\"pi pi-globe\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"customerWebsite\" name=\"website\" [(ngModel)]=\"form.website\" placeholder=\"https://example.com\" (blur)=\"checkForDuplicate()\" />\n                  </p-inputgroup>\n                </div>\n\n              </div>\n            </section>\n\n            <section class=\"form-section section--billing\">\n              <h2 class=\"section-title\">\n                <i class=\"pi pi-map-marker\"></i>\n                Billing address\n              </h2>\n              \n              <div class=\"form-grid\">\n                <div class=\"form-field full-row\">\n                  <label for=\"billingStreet\">Street</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--address\">\n                      <i class=\"pi pi-map-marker\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"billingStreet\" name=\"billingStreet\" [(ngModel)]=\"form.billingStreet\" placeholder=\"123 Main Street\" />\n                  </p-inputgroup>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"billingCity\">City</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                      <i class=\"pi pi-building\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"billingCity\" name=\"billingCity\" [(ngModel)]=\"form.billingCity\" placeholder=\"City\" />\n                  </p-inputgroup>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"billingState\">State</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--company\">\n                      <i class=\"pi pi-map\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"billingState\" name=\"billingState\" [(ngModel)]=\"form.billingState\" placeholder=\"State / Province\" />\n                  </p-inputgroup>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"billingPostalCode\">Postal Code</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                      <i class=\"pi pi-hashtag\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"billingPostalCode\" name=\"billingPostalCode\" [(ngModel)]=\"form.billingPostalCode\" placeholder=\"ZIP / Postal code\" />\n                  </p-inputgroup>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"billingCountry\">Country</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--website\">\n                      <i class=\"pi pi-globe\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"billingCountry\" name=\"billingCountry\" [(ngModel)]=\"form.billingCountry\" placeholder=\"Country\" />\n                  </p-inputgroup>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"form-section section--shipping\">\n              <h2 class=\"section-title\">\n                <i class=\"pi pi-truck\"></i>\n                Shipping address\n              </h2>\n              \n              <div class=\"form-grid\">\n                <div class=\"form-field full-row\">\n                  <label for=\"shippingStreet\">Street</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--address\">\n                      <i class=\"pi pi-map-marker\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"shippingStreet\" name=\"shippingStreet\" [(ngModel)]=\"form.shippingStreet\" placeholder=\"123 Main Street\" />\n                  </p-inputgroup>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"shippingCity\">City</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                      <i class=\"pi pi-building\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"shippingCity\" name=\"shippingCity\" [(ngModel)]=\"form.shippingCity\" placeholder=\"City\" />\n                  </p-inputgroup>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"shippingState\">State</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--company\">\n                      <i class=\"pi pi-map\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"shippingState\" name=\"shippingState\" [(ngModel)]=\"form.shippingState\" placeholder=\"State / Province\" />\n                  </p-inputgroup>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"shippingPostalCode\">Postal Code</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                      <i class=\"pi pi-hashtag\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"shippingPostalCode\" name=\"shippingPostalCode\" [(ngModel)]=\"form.shippingPostalCode\" placeholder=\"ZIP / Postal code\" />\n                  </p-inputgroup>\n                </div>\n\n                <div class=\"form-field\">\n                  <label for=\"shippingCountry\">Country</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--website\">\n                      <i class=\"pi pi-globe\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"shippingCountry\" name=\"shippingCountry\" [(ngModel)]=\"form.shippingCountry\" placeholder=\"Country\" />\n                  </p-inputgroup>\n                </div>\n              </div>\n            </section>\n\n            <section class=\"form-section section--additional\">\n              <h2 class=\"section-title\">\n                <i class=\"pi pi-file-edit\"></i>\n                Additional information\n              </h2>\n              \n              <div class=\"form-field full-width\">\n                <label for=\"customerDescription\">Notes</label>\n                <textarea \n                  pTextarea \n                  id=\"customerDescription\"\n                  name=\"description\" \n                  [(ngModel)]=\"form.description\" \n                  rows=\"4\" \n                  placeholder=\"Add any relevant notes about this customer...\"\n                  class=\"w-full\"\n                ></textarea>\n              </div>\n            </section>\n          </fieldset>\n\n          <footer class=\"form-actions\">\n            <button \n              type=\"button\" \n              pButton \n              label=\"Cancel\" \n              class=\"crm-button crm-button--ghost\" \n              routerLink=\"/app/customers\">\n            </button>\n            <button\n              type=\"button\"\n              pButton\n              [label]=\"primarySaveLabel()\"\n              icon=\"pi pi-check\"\n              class=\"crm-button crm-button--primary\"\n              [disabled]=\"saving() || loading() || draftSaving()\"\n              (click)=\"onSave()\"\n            ></button>\n            <p-splitbutton\n              [label]=\"draftButtonLabel()\"\n              icon=\"pi pi-bookmark\"\n              styleClass=\"crm-draft-splitbutton\"\n              buttonStyleClass=\"crm-button crm-button--secondary\"\n              menuButtonStyleClass=\"crm-button crm-button--secondary\"\n              appendTo=\"body\"\n              [disabled]=\"saving() || loading() || draftSaving()\"\n              [model]=\"draftSplitButtonItems()\"\n              (onClick)=\"saveDraft()\"\n            ></p-splitbutton>\n          </footer>\n        </form>\n      </main>\n\n      <section class=\"form-container detail-container\" *ngIf=\"isEditMode()\">\n        <section class=\"form-section section--workspace\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-briefcase\"></i>\n            Customer workspace\n          </h2>\n\n          <p-tabs value=\"timeline\">\n            <p-tablist>\n              <p-tab value=\"timeline\">Timeline</p-tab>\n              <p-tab value=\"notes\">Notes</p-tab>\n              <p-tab value=\"related\">Related records</p-tab>\n              <p-tab value=\"attachments\">Attachments</p-tab>\n            </p-tablist>\n            <p-tabpanels>\n              <p-tabpanel value=\"timeline\">\n              <div class=\"timeline\" *ngIf=\"!timelineLoading(); else timelineLoadingTpl\">\n                <div class=\"timeline-item\" *ngFor=\"let activity of activities()\">\n                  <div class=\"timeline-type\">\n                    <span class=\"type-dot\" [attr.data-type]=\"activity.type\">{{ activity.type }}</span>\n                  </div>\n                  <div class=\"timeline-body\">\n                    <div class=\"timeline-title\">{{ activity.subject }}</div>\n                    <div class=\"timeline-meta\">\n                      <span>{{ activity.createdAtUtc | date: 'MMM d, yyyy \u00B7 h:mm a' }}</span>\n                      <span *ngIf=\"activity.ownerName\">\u2022 {{ activity.ownerName }}</span>\n                    </div>\n                    <div class=\"timeline-description\" *ngIf=\"activity.description\">{{ activity.description }}</div>\n                  </div>\n                </div>\n                <div class=\"empty-state\" *ngIf=\"!activities().length\">\n                  <i class=\"pi pi-clock\"></i>\n                  <span>No activity yet.</span>\n                  <a class=\"empty-state-link\" routerLink=\"/app/activities\" [queryParams]=\"{ customerId: customerId }\">+ Log first activity</a>\n                </div>\n              </div>\n              <ng-template #timelineLoadingTpl>\n                <div class=\"empty-state\">Loading timeline...</div>\n              </ng-template>\n              </p-tabpanel>\n\n              <p-tabpanel value=\"notes\">\n              <div class=\"notes\">\n                <div class=\"note-editor\">\n        <textarea \n          pTextarea \n          rows=\"4\" \n          placeholder=\"Add a note about this customer...\" \n          class=\"w-full\"\n          [(ngModel)]=\"noteText\"\n          [ngModelOptions]=\"{ standalone: true }\"\n        ></textarea>\n                  <div class=\"note-actions\">\n                    <button\n                      pButton\n                      type=\"button\"\n                      label=\"Add note\"\n                      icon=\"pi pi-plus\"\n                      class=\"crm-button crm-button--primary\"\n                      [disabled]=\"!noteText.trim() || noteSaving()\"\n                      (click)=\"addNote()\"\n                    ></button>\n                  </div>\n                </div>\n\n                <div class=\"note-list\" *ngIf=\"notes().length; else notesEmpty\">\n                  <div class=\"note-item\" *ngFor=\"let note of notes()\">\n                    <div class=\"note-header\">\n                      <span class=\"note-title\">{{ note.subject }}</span>\n                      <span class=\"note-meta\">{{ note.createdAtUtc | date: 'MMM d, yyyy \u00B7 h:mm a' }}</span>\n                    </div>\n                    <div class=\"note-body\">{{ note.description }}</div>\n                  </div>\n                </div>\n                <ng-template #notesEmpty>\n                  <div class=\"empty-state\">\n                    <i class=\"pi pi-file-edit\"></i>\n                    <span>No notes yet. Use the editor above to add one.</span>\n                  </div>\n                </ng-template>\n              </div>\n              </p-tabpanel>\n\n              <p-tabpanel value=\"related\">\n              <div class=\"related-grid\">\n                <div class=\"related-section\">\n                  <h3>Contacts</h3>\n                  <p-table [value]=\"relatedContactsSorted()\" [paginator]=\"false\" [rows]=\"5\" styleClass=\"compact-table\">\n                    <ng-template pTemplate=\"header\">\n                      <tr>\n                        <th>Name</th>\n                        <th>Email</th>\n                        <th>Phone</th>\n                        <th>Owner</th>\n                        <th>Created</th>\n                      </tr>\n                    </ng-template>\n                    <ng-template pTemplate=\"body\" let-row>\n                      <tr class=\"clickable-row\" [routerLink]=\"['/app/contacts', row.id, 'edit']\">\n                        <td>\n                          <span class=\"related-link\">{{ row.name }}</span>\n                        </td>\n                        <td>{{ row.email || '\u2014' }}</td>\n                        <td>{{ row.phone || '\u2014' }}</td>\n                        <td>{{ row.owner || '\u2014' }}</td>\n                        <td>{{ row.createdAt | date: 'MMM d, yyyy' }}</td>\n                      </tr>\n                    </ng-template>\n                  </p-table>\n                  <div class=\"empty-state\" *ngIf=\"!relatedContacts().length\">\n                    <i class=\"pi pi-users\"></i>\n                    <span>No contacts linked.</span>\n                    <a class=\"empty-state-link\" routerLink=\"/app/contacts/new\">+ Add contact</a>\n                  </div>\n                </div>\n\n                <div class=\"related-section\">\n                  <h3>Opportunities</h3>\n                  <p-table [value]=\"relatedOpportunitiesSorted()\" [paginator]=\"false\" [rows]=\"5\" styleClass=\"compact-table\">\n                    <ng-template pTemplate=\"header\">\n                      <tr>\n                        <th>Name</th>\n                        <th>Stage</th>\n                        <th>Amount</th>\n                        <th>Owner</th>\n                        <th>Created</th>\n                      </tr>\n                    </ng-template>\n                    <ng-template pTemplate=\"body\" let-row>\n                      <tr class=\"clickable-row\" [routerLink]=\"['/app/deals', row.id, 'edit']\">\n                        <td>\n                          <span class=\"related-link\">{{ row.name }}</span>\n                        </td>\n                        <td><p-tag [value]=\"row.stage\" severity=\"info\"></p-tag></td>\n                        <td>{{ row.amount | currency: row.currency : 'symbol' : '1.0-0' }}</td>\n                        <td>{{ row.owner || '\u2014' }}</td>\n                        <td>{{ row.createdAtUtc | date: 'MMM d, yyyy' }}</td>\n                      </tr>\n                    </ng-template>\n                  </p-table>\n                  <div class=\"empty-state\" *ngIf=\"!relatedOpportunities().length\">\n                    <i class=\"pi pi-chart-line\"></i>\n                    <span>No opportunities yet.</span>\n                    <a class=\"empty-state-link\" routerLink=\"/app/deals/new\">+ Create deal</a>\n                  </div>\n                </div>\n\n                <!-- Related Properties (X10) -->\n                <div class=\"related-section\">\n                  <h3>Properties</h3>\n                  <p-table [value]=\"relatedPropertiesSorted()\" [paginator]=\"false\" [rows]=\"5\" styleClass=\"compact-table\">\n                    <ng-template pTemplate=\"header\">\n                      <tr>\n                        <th>Address</th>\n                        <th>Status</th>\n                        <th>Type</th>\n                        <th>Price</th>\n                        <th>MLS #</th>\n                      </tr>\n                    </ng-template>\n                    <ng-template pTemplate=\"body\" let-row>\n                      <tr class=\"clickable-row\" [routerLink]=\"['/app/properties', row.id]\">\n                        <td><span class=\"related-link\">{{ row.address }}</span></td>\n                        <td><p-tag [value]=\"row.status\" severity=\"info\"></p-tag></td>\n                        <td>{{ row.propertyType }}</td>\n                        <td>{{ row.listPrice | currency:row.currency:'symbol':'1.0-0' }}</td>\n                        <td>{{ row.mlsNumber || '\u2014' }}</td>\n                      </tr>\n                    </ng-template>\n                  </p-table>\n                  <div class=\"empty-state\" *ngIf=\"!relatedProperties().length\">\n                    <i class=\"pi pi-home\"></i>\n                    <span>No properties linked.</span>\n                    <a class=\"empty-state-link\" routerLink=\"/app/properties/new\">+ Add property</a>\n                  </div>\n                </div>\n              </div>\n              </p-tabpanel>\n\n              <p-tabpanel value=\"attachments\">\n              <div class=\"attachments\">\n                <p-fileUpload\n                  mode=\"basic\"\n                  chooseLabel=\"Upload file\"\n                  [customUpload]=\"true\"\n                  (uploadHandler)=\"onAttachmentUpload($event)\"\n                  [auto]=\"true\"\n                ></p-fileUpload>\n\n                <p-table [value]=\"attachments()\" [paginator]=\"false\" [rows]=\"5\" styleClass=\"compact-table\">\n                  <ng-template pTemplate=\"header\">\n                    <tr>\n                      <th>File</th>\n                      <th>Uploaded by</th>\n                      <th>Size</th>\n                      <th></th>\n                    </tr>\n                  </ng-template>\n                  <ng-template pTemplate=\"body\" let-row>\n                    <tr>\n                      <td>{{ row.fileName }}</td>\n                      <td>{{ row.uploadedBy || '\u2014' }}</td>\n                      <td>{{ row.size | number }} bytes</td>\n                      <td class=\"table-actions\">\n                        <button pButton type=\"button\" class=\"icon-btn\" icon=\"pi pi-download\" (click)=\"downloadAttachment(row)\"></button>\n                      </td>\n                    </tr>\n                  </ng-template>\n                </p-table>\n                <div class=\"empty-state\" *ngIf=\"!attachments().length\">\n                  <i class=\"pi pi-paperclip\"></i>\n                  <span>No attachments yet. Use the upload button above.</span>\n                </div>\n              </div>\n              </p-tabpanel>\n            </p-tabpanels>\n          </p-tabs>\n        </section>\n      </section>\n    </div>\n  \n", styles: ["\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       CUSTOMER FORM PAGE - Premium Glass UI with Card Focus Effects\n       Apple + Linear/Vercel Hybrid Design\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    :host {\n      /* Premium color palette */\n      --apple-blue: 0, 122, 255;\n      --apple-purple: 175, 82, 222;\n      --apple-pink: 255, 45, 85;\n      --apple-teal: 90, 200, 250;\n      --apple-green: 52, 199, 89;\n      --apple-gray-1: 142, 142, 147;\n      --apple-gray-2: 174, 174, 178;\n      --apple-gray-3: 199, 199, 204;\n      --apple-gray-4: 209, 209, 214;\n      --apple-gray-5: 229, 229, 234;\n      --apple-gray-6: 242, 242, 247;\n      --apple-label: 0, 0, 0;\n      --apple-secondary: 60, 60, 67;\n      --apple-tertiary: 60, 60, 67;\n      --apple-fill: 120, 120, 128;\n      \n      /* Gradient border colors for hover */\n      --gradient-start: rgba(var(--apple-blue), 0.6);\n      --gradient-mid: rgba(var(--apple-purple), 0.4);\n      --gradient-end: rgba(var(--apple-teal), 0.5);\n    }\n\n    .customer-form-page {\n      min-height: 100vh;\n      position: relative;\n      /* Soft mesh gradient background */\n      background: \n        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(var(--apple-blue), 0.08) 0%, transparent 50%),\n        radial-gradient(ellipse 60% 40% at 90% 10%, rgba(var(--apple-purple), 0.06) 0%, transparent 40%),\n        radial-gradient(ellipse 50% 30% at 10% 60%, rgba(var(--apple-teal), 0.05) 0%, transparent 40%),\n        linear-gradient(180deg, \n          rgba(var(--apple-gray-6), 0.95) 0%, \n          rgba(255, 255, 255, 1) 40%,\n          rgba(var(--apple-gray-6), 0.3) 100%);\n      padding-bottom: 5rem;\n    }\n\n    /* Animated ambient orbs */\n    .customer-form-page::before {\n      content: '';\n      position: fixed;\n      top: -15%;\n      left: -5%;\n      width: 50%;\n      height: 50%;\n      background: radial-gradient(\n        circle,\n        rgba(var(--apple-blue), 0.08) 0%,\n        rgba(var(--apple-blue), 0.03) 30%,\n        transparent 60%\n      );\n      pointer-events: none;\n      z-index: 0;\n      animation: float-orb-1 18s ease-in-out infinite;\n    }\n\n    .customer-form-page::after {\n      content: '';\n      position: fixed;\n      bottom: -20%;\n      right: -10%;\n      width: 60%;\n      height: 60%;\n      background: radial-gradient(\n        circle,\n        rgba(var(--apple-purple), 0.07) 0%,\n        rgba(var(--apple-teal), 0.03) 35%,\n        transparent 60%\n      );\n      pointer-events: none;\n      z-index: 0;\n      animation: float-orb-2 22s ease-in-out infinite;\n    }\n\n    @keyframes float-orb-1 {\n      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }\n      25% { transform: translate(30px, -20px) scale(1.05); opacity: 1; }\n      50% { transform: translate(15px, -40px) scale(1.02); opacity: 0.9; }\n      75% { transform: translate(-10px, -15px) scale(1.08); opacity: 1; }\n    }\n\n    @keyframes float-orb-2 {\n      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }\n      33% { transform: translate(-25px, 25px) scale(1.06); opacity: 1; }\n      66% { transform: translate(15px, 10px) scale(0.98); opacity: 0.85; }\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       HEADER - Premium Frosted Bar\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .page-header {\n      position: relative;\n      top: auto;\n      z-index: 100;\n      /* Premium frosted glass */\n      background: rgba(255, 255, 255, 0.65);\n      backdrop-filter: blur(40px) saturate(200%);\n      -webkit-backdrop-filter: blur(40px) saturate(200%);\n      /* Subtle gradient border */\n      border-bottom: 1px solid transparent;\n      background-image: \n        linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)),\n        linear-gradient(90deg, rgba(var(--apple-gray-4), 0.3), rgba(var(--apple-gray-3), 0.2), rgba(var(--apple-gray-4), 0.3));\n      background-origin: border-box;\n      background-clip: padding-box, border-box;\n      padding: 1rem 1.5rem;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);\n      overflow: visible;\n    }\n\n    .header-content {\n      max-width: 1200px;\n      margin: 0 auto;\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .back-link {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.375rem;\n      padding: 0.375rem 0.625rem 0.375rem 0.375rem;\n      margin-left: -0.375rem;\n      border: none;\n      background: transparent;\n      color: rgba(var(--apple-blue), 1);\n      font-size: 0.9375rem;\n      font-weight: 500;\n      letter-spacing: -0.01em;\n      border-radius: 8px;\n      cursor: pointer;\n      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    }\n\n    .back-link:hover {\n      background: rgba(var(--apple-blue), 0.1);\n      transform: translateX(-2px);\n    }\n\n    .back-link:active {\n      background: rgba(var(--apple-blue), 0.15);\n      transform: scale(0.97);\n    }\n\n    .back-link i {\n      font-size: 1rem;\n      transition: transform 0.2s ease;\n    }\n\n    .back-link:hover i {\n      transform: translateX(-3px);\n    }\n\n    .header-title h1 {\n      margin: 0 0 0.25rem;\n    }\n\n    .header-title p {\n      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n      color: #6b7280;\n      font-size: 1rem;\n      font-weight: 400;\n      max-width: 500px;\n      line-height: 1.6;\n      margin: 0;\n    }\n\n    .customer-header-progress {\n      --customer-header-score-color: #2563eb;\n      display: flex;\n      align-items: center;\n      gap: 0.9rem;\n      margin-top: 1rem;\n      padding: 0.78rem 0.9rem;\n      border-radius: 18px;\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      background:\n        radial-gradient(circle at 8% 15%, rgba(var(--apple-blue), 0.14), transparent 42%),\n        radial-gradient(circle at 90% 18%, rgba(var(--apple-green), 0.11), transparent 36%),\n        linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0.68));\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.54),\n        0 14px 26px rgba(15, 23, 42, 0.08);\n      backdrop-filter: blur(12px) saturate(124%);\n      -webkit-backdrop-filter: blur(12px) saturate(124%);\n      max-width: 34rem;\n    }\n\n    .customer-header-progress__dial {\n      flex: 0 0 auto;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 96px;\n      height: 96px;\n      border-radius: 20px;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(241, 245, 249, 0.7));\n      border: 1px solid rgba(148, 163, 184, 0.14);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.54),\n        0 10px 18px rgba(15, 23, 42, 0.05);\n    }\n\n    :host ::ng-deep .customer-header-progress__knob {\n      width: 92px;\n    }\n\n    :host ::ng-deep .customer-header-progress__knob .p-knob-text {\n      font-size: 1rem;\n      font-weight: 800;\n      fill: #1e293b;\n    }\n\n    .customer-header-progress__content {\n      min-width: 0;\n      display: grid;\n      gap: 0.22rem;\n      align-content: center;\n    }\n\n    .customer-header-progress__eyebrow {\n      font-size: 0.7rem;\n      font-weight: 800;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n    }\n\n    .customer-header-progress__meta {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n    }\n\n    .customer-header-progress__status,\n    .customer-header-progress__step {\n      display: inline-flex;\n      align-items: center;\n      min-height: 1.8rem;\n      padding: 0.2rem 0.55rem;\n      border-radius: 999px;\n      font-size: 0.76rem;\n      font-weight: 700;\n      border: 1px solid rgba(148, 163, 184, 0.16);\n      background: rgba(255, 255, 255, 0.72);\n      color: #1e293b;\n    }\n\n    .customer-header-progress__status {\n      color: #0f766e;\n      background: rgba(204, 251, 241, 0.82);\n      border-color: rgba(45, 212, 191, 0.28);\n    }\n\n    .customer-header-progress__copy {\n      margin: 0;\n      color: #475569;\n      font-size: 0.82rem;\n      line-height: 1.5;\n      max-width: 28rem;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       FORM LAYOUT\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .form-container {\n      position: relative;\n      z-index: 1;\n      max-width: 1200px;\n      margin: 0 auto;\n      padding: 1.5rem;\n    }\n\n    .customer-form {\n      display: flex;\n      flex-direction: column;\n      gap: 1.25rem;\n    }\n\n    .form-fieldset {\n      display: flex;\n      flex-direction: column;\n      gap: 1.25rem;\n      border: none;\n      margin: 0;\n      padding: 0;\n      min-width: 0;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       FORM SECTIONS - Premium Glass Cards with Hover Focus\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .form-section {\n      position: relative;\n      /* Premium frosted glass */\n      background: rgba(255, 255, 255, 0.55);\n      backdrop-filter: blur(40px) saturate(180%);\n      -webkit-backdrop-filter: blur(40px) saturate(180%);\n      border-radius: 20px;\n      padding: 1.75rem;\n      /* Gradient border via pseudo-element */\n      border: 1px solid rgba(255, 255, 255, 0.6);\n      /* Multi-layer premium shadow */\n      box-shadow: \n        0 0 0 1px rgba(255, 255, 255, 0.8) inset,\n        0 1px 2px rgba(0, 0, 0, 0.02),\n        0 4px 12px rgba(0, 0, 0, 0.03),\n        0 16px 32px rgba(0, 0, 0, 0.04);\n      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    }\n\n    /* Gradient border glow on hover */\n    .form-section::before {\n      content: '';\n      position: absolute;\n      inset: -1px;\n      border-radius: 21px;\n      padding: 1px;\n      background: linear-gradient(135deg, \n        transparent 0%,\n        transparent 100%);\n      -webkit-mask: \n        linear-gradient(#fff 0 0) content-box,\n        linear-gradient(#fff 0 0);\n      -webkit-mask-composite: xor;\n      mask-composite: exclude;\n      pointer-events: none;\n      opacity: 0;\n      transition: all 0.4s ease;\n    }\n\n    /* Ambient glow behind card on hover */\n    .form-section::after {\n      content: '';\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      width: 120%;\n      height: 120%;\n      transform: translate(-50%, -50%);\n      background: radial-gradient(\n        ellipse at center,\n        rgba(var(--apple-blue), 0) 0%,\n        transparent 70%\n      );\n      pointer-events: none;\n      z-index: -1;\n      opacity: 0;\n      transition: all 0.4s ease;\n    }\n\n    .form-section:hover {\n      background: rgba(255, 255, 255, 0.72);\n      border-color: transparent;\n      transform: translateY(-3px) scale(1.005);\n      box-shadow: \n        0 0 0 1px rgba(255, 255, 255, 0.9) inset,\n        0 4px 8px rgba(0, 0, 0, 0.03),\n        0 8px 24px rgba(0, 0, 0, 0.06),\n        0 24px 48px rgba(var(--apple-blue), 0.08),\n        0 0 60px rgba(var(--apple-blue), 0.06);\n    }\n\n    .form-section:hover::before {\n      opacity: 1;\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.4) 0%,\n        rgba(var(--apple-purple), 0.3) 50%,\n        rgba(var(--apple-teal), 0.4) 100%);\n    }\n\n    .form-section:hover::after {\n      opacity: 1;\n      background: radial-gradient(\n        ellipse at center,\n        rgba(var(--apple-blue), 0.04) 0%,\n        transparent 70%\n      );\n    }\n\n    /* Focus-within for when form fields inside are focused */\n    .form-section:focus-within {\n      background: rgba(255, 255, 255, 0.78);\n      border-color: transparent;\n      transform: translateY(-2px);\n      box-shadow: \n        0 0 0 1px rgba(255, 255, 255, 1) inset,\n        0 4px 12px rgba(0, 0, 0, 0.04),\n        0 12px 32px rgba(var(--apple-blue), 0.1),\n        0 0 80px rgba(var(--apple-blue), 0.08);\n    }\n\n    .form-section:focus-within::before {\n      opacity: 1;\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.5) 0%,\n        rgba(var(--apple-purple), 0.35) 50%,\n        rgba(var(--apple-teal), 0.45) 100%);\n    }\n\n    .form-section:hover .section-title {\n      color: #0891b2;\n      border-bottom-color: rgba(6, 182, 212, 0.35);\n    }\n\n    .form-section:hover .section-title i {\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(8, 145, 178, 0.16) 100%);\n      color: #0891b2;\n      transform: scale(1.05);\n      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);\n    }\n\n    /* \u2500\u2500 Duplicate warning banner \u2500\u2500 */\n    .duplicate-warning {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 0.75rem 1rem;\n      background: rgba(245, 158, 11, 0.12);\n      border: 1px solid rgba(245, 158, 11, 0.35);\n      border-radius: 0.75rem;\n      margin-bottom: 1rem;\n      font-size: 0.875rem;\n      color: #92400e;\n\n      i {\n        color: #f59e0b;\n        font-size: 1.125rem;\n        flex-shrink: 0;\n      }\n\n      .dup-link {\n        margin-left: auto;\n        color: #4f46e5;\n        font-weight: 600;\n        text-decoration: none;\n        white-space: nowrap;\n\n        &:hover {\n          text-decoration: underline;\n        }\n      }\n    }\n\n    /* \u2500\u2500 Section color variants \u2500\u2500 */\n\n    /* Basic Information \u2014 Indigo */\n    .section--basic .section-title {\n      color: #4338ca;\n      border-bottom-color: rgba(99, 102, 241, 0.2);\n    }\n    .section--basic .section-title i {\n      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.1) 100%);\n      color: #6366f1;\n      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.15);\n    }\n    .section--basic:hover .section-title {\n      color: #4338ca;\n      border-bottom-color: rgba(99, 102, 241, 0.35);\n    }\n    .section--basic:hover .section-title i {\n      background: linear-gradient(135deg, rgba(99, 102, 241, 0.22) 0%, rgba(79, 70, 229, 0.16) 100%);\n      color: #4f46e5;\n      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);\n    }\n\n    /* Contact Information \u2014 Emerald */\n    .section--contact .section-title {\n      color: #047857;\n      border-bottom-color: rgba(16, 185, 129, 0.2);\n    }\n    .section--contact .section-title i {\n      background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%);\n      color: #10b981;\n      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);\n    }\n    .section--contact:hover .section-title {\n      color: #047857;\n      border-bottom-color: rgba(16, 185, 129, 0.35);\n    }\n    .section--contact:hover .section-title i {\n      background: linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(5, 150, 105, 0.16) 100%);\n      color: #059669;\n      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);\n    }\n\n    /* Additional Information \u2014 Amber */\n    .section--additional .section-title {\n      color: #b45309;\n      border-bottom-color: rgba(245, 158, 11, 0.2);\n    }\n    .section--additional .section-title i {\n      background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.1) 100%);\n      color: #f59e0b;\n      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);\n    }\n    .section--additional:hover .section-title {\n      color: #b45309;\n      border-bottom-color: rgba(245, 158, 11, 0.35);\n    }\n    .section--additional:hover .section-title i {\n      background: linear-gradient(135deg, rgba(245, 158, 11, 0.22) 0%, rgba(217, 119, 6, 0.16) 100%);\n      color: #d97706;\n      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);\n    }\n\n    /* Firmographic Details \u2014 Purple */\n    .section--firmographic .section-title {\n      color: #6d28d9;\n      border-bottom-color: rgba(139, 92, 246, 0.2);\n    }\n    .section--firmographic .section-title i {\n      background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(109, 40, 217, 0.1) 100%);\n      color: #8b5cf6;\n      box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15);\n    }\n    .section--firmographic:hover .section-title {\n      color: #6d28d9;\n      border-bottom-color: rgba(139, 92, 246, 0.35);\n    }\n    .section--firmographic:hover .section-title i {\n      background: linear-gradient(135deg, rgba(139, 92, 246, 0.22) 0%, rgba(109, 40, 217, 0.16) 100%);\n      color: #7c3aed;\n      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.25);\n    }\n\n    /* Billing Address \u2014 Teal */\n    .section--billing .section-title {\n      color: #0e7490;\n      border-bottom-color: rgba(6, 182, 212, 0.2);\n    }\n    .section--billing .section-title i {\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(14, 116, 144, 0.1) 100%);\n      color: #06b6d4;\n      box-shadow: 0 2px 8px rgba(6, 182, 212, 0.15);\n    }\n    .section--billing:hover .section-title {\n      color: #0e7490;\n      border-bottom-color: rgba(6, 182, 212, 0.35);\n    }\n    .section--billing:hover .section-title i {\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(14, 116, 144, 0.16) 100%);\n      color: #0891b2;\n      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);\n    }\n\n    /* Shipping Address \u2014 Rose */\n    .section--shipping .section-title {\n      color: #be123c;\n      border-bottom-color: rgba(244, 63, 94, 0.2);\n    }\n    .section--shipping .section-title i {\n      background: linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(190, 18, 60, 0.1) 100%);\n      color: #f43f5e;\n      box-shadow: 0 2px 8px rgba(244, 63, 94, 0.15);\n    }\n    .section--shipping:hover .section-title {\n      color: #be123c;\n      border-bottom-color: rgba(244, 63, 94, 0.35);\n    }\n    .section--shipping:hover .section-title i {\n      background: linear-gradient(135deg, rgba(244, 63, 94, 0.22) 0%, rgba(190, 18, 60, 0.16) 100%);\n      color: #e11d48;\n      box-shadow: 0 4px 12px rgba(244, 63, 94, 0.25);\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       SECTION HEADERS - Premium Typography with Teal Accent\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .section-title {\n      display: flex;\n      align-items: center;\n      gap: 1rem;\n      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n      font-size: 1rem;\n      font-weight: 600;\n      text-transform: none;\n      letter-spacing: -0.01em;\n      color: #0e7490;\n      margin: 0 0 1.5rem;\n      padding-bottom: 1rem;\n      border-bottom: 1px solid rgba(6, 182, 212, 0.2);\n      transition: all 0.3s ease;\n    }\n\n    .section-title i {\n      width: 42px;\n      height: 42px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(8, 145, 178, 0.1) 100%);\n      color: #06b6d4;\n      font-size: 1.25rem;\n      border-radius: 12px;\n      transition: all 0.3s ease;\n      box-shadow: 0 2px 8px rgba(6, 182, 212, 0.15);\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       FORM GRID\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .form-grid {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 1.25rem 1.125rem;\n    }\n\n    .full-row,\n    .full-width {\n      grid-column: 1 / -1;\n    }\n\n    .field,\n    .form-field {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      gap: 0.75rem;\n    }\n\n    .field > label,\n    .form-field > label {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 0.8125rem;\n      font-weight: 600;\n      color: #475569;\n      letter-spacing: 0.01em;\n      white-space: nowrap;\n      min-width: 110px;\n      flex-shrink: 0;\n      text-align: right;\n      transition: color 0.2s ease;\n    }\n\n    /* Input/select/inputgroup fills remaining space */\n    .form-field > p-inputgroup,\n    .form-field > p-select,\n    .form-field > textarea {\n      flex: 1;\n      min-width: 0;\n    }\n\n    .form-section:hover .field > label,\n    .form-section:hover .form-field > label {\n      color: #334155;\n    }\n\n    .form-field:focus-within > label {\n      color: #4f46e5;\n    }\n\n    .field-error {\n      margin: 0.35rem 0 0;\n      font-size: 0.75rem;\n      color: #b91c1c;\n    }\n\n    .required {\n      color: #ef4444 !important;\n      font-weight: 600;\n    }\n\n    .w-full {\n      width: 100%;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       INPUTGROUP INTEGRATION\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    /* Icon addon styling within the glass UI */\n    :host ::ng-deep p-inputgroup-addon.icon-addon {\n      background: rgba(var(--apple-gray-6), 0.6);\n      border: 1px solid rgba(var(--apple-gray-4), 0.4);\n      border-right: none;\n      border-radius: 12px 0 0 12px;\n      padding: 0.5rem 0.65rem;\n      min-width: 2.5rem;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    }\n\n    :host ::ng-deep p-inputgroup-addon.icon-addon i {\n      font-size: 1rem;\n    }\n\n    /* When input is focused, enhance the addon */\n    :host ::ng-deep p-inputgroup:focus-within p-inputgroup-addon.icon-addon {\n      background: rgba(255, 255, 255, 0.95);\n      border-color: rgba(var(--apple-blue), 0.5);\n      transform: scale(1.03);\n    }\n\n    /* InputGroup input should not double-border on left side */\n    :host ::ng-deep .p-inputgroup .p-inputtext {\n      border-radius: 0 12px 12px 0 !important;\n      border-left: none !important;\n    }\n\n    /* Icon addon color variants \u2014 each field gets a unique color */\n    :host ::ng-deep p-inputgroup-addon.icon-addon--name {\n      background: rgba(99, 102, 241, 0.14) !important;\n      border-color: rgba(99, 102, 241, 0.3) !important;\n      i { color: #6366f1 !important; }\n    }\n\n    :host ::ng-deep p-inputgroup-addon.icon-addon--industry {\n      background: rgba(168, 85, 247, 0.14) !important;\n      border-color: rgba(168, 85, 247, 0.3) !important;\n      i { color: #a855f7 !important; }\n    }\n\n    :host ::ng-deep p-inputgroup-addon.icon-addon--company {\n      background: rgba(59, 130, 246, 0.14) !important;\n      border-color: rgba(59, 130, 246, 0.3) !important;\n      i { color: #3b82f6 !important; }\n    }\n\n    :host ::ng-deep p-inputgroup-addon.icon-addon--email {\n      background: rgba(236, 72, 153, 0.14) !important;\n      border-color: rgba(236, 72, 153, 0.3) !important;\n      i { color: #ec4899 !important; }\n    }\n\n    :host ::ng-deep p-inputgroup-addon.icon-addon--phone {\n      background: rgba(34, 197, 94, 0.14) !important;\n      border-color: rgba(34, 197, 94, 0.3) !important;\n      i { color: #22c55e !important; }\n    }\n\n    :host ::ng-deep p-inputgroup-addon.icon-addon--website {\n      background: rgba(79, 70, 229, 0.14) !important;\n      border-color: rgba(79, 70, 229, 0.3) !important;\n      i { color: #4f46e5 !important; }\n    }\n\n    :host ::ng-deep p-inputgroup-addon.icon-addon--address {\n      background: rgba(245, 158, 11, 0.14) !important;\n      border-color: rgba(245, 158, 11, 0.3) !important;\n      i { color: #f59e0b !important; }\n    }\n\n    /* User input text stays dark for contrast */\n    :host ::ng-deep .p-inputtext,\n    :host ::ng-deep .p-select .p-select-label,\n    :host ::ng-deep .p-textarea {\n      color: #1e293b !important;\n      font-weight: 500 !important;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       INPUT FIELDS - Premium Glass Inputs\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    :host ::ng-deep .p-inputtext,\n    :host ::ng-deep .p-select,\n    :host ::ng-deep .p-inputnumber,\n    :host ::ng-deep .p-textarea {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;\n      background: rgba(var(--apple-gray-6), 0.5) !important;\n      border: 1px solid rgba(var(--apple-gray-4), 0.4) !important;\n      border-radius: 12px !important;\n      font-size: 0.9375rem !important;\n      padding: 0.75rem 1rem !important;\n      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      box-shadow: \n        inset 0 1px 2px rgba(0, 0, 0, 0.02),\n        0 1px 2px rgba(255, 255, 255, 0.5) !important;\n    }\n\n\n\n    :host ::ng-deep .p-inputtext:hover,\n    :host ::ng-deep .p-select:hover,\n    :host ::ng-deep .p-inputnumber:hover,\n    :host ::ng-deep .p-textarea:hover {\n      background: rgba(var(--apple-gray-5), 0.6) !important;\n      border-color: rgba(var(--apple-gray-3), 0.5) !important;\n      box-shadow: \n        inset 0 1px 2px rgba(0, 0, 0, 0.02),\n        0 2px 4px rgba(0, 0, 0, 0.02) !important;\n    }\n\n    :host ::ng-deep .p-inputtext:focus,\n    :host ::ng-deep .p-select:focus,\n    :host ::ng-deep .p-select.p-focus,\n    :host ::ng-deep .p-inputnumber:focus,\n    :host ::ng-deep .p-textarea:focus {\n      background: rgba(255, 255, 255, 0.95) !important;\n      border-color: rgba(var(--apple-blue), 0.5) !important;\n      box-shadow: \n        0 0 0 4px rgba(var(--apple-blue), 0.15),\n        0 4px 12px rgba(var(--apple-blue), 0.1),\n        inset 0 0 0 1px rgba(var(--apple-blue), 0.2) !important;\n      outline: none !important;\n    }\n\n    :host ::ng-deep .p-inputtext::placeholder {\n      color: rgba(var(--apple-gray-1), 0.6);\n      font-weight: 400;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       FORM ACTIONS - Premium Button Styles\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .form-actions {\n      display: flex;\n      justify-content: flex-end;\n      gap: 0.75rem;\n      padding-top: 0.75rem;\n    }\n\n    .form-actions button {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;\n      min-width: 130px;\n      border-radius: 12px !important;\n      font-weight: 600 !important;\n      font-size: 0.9375rem !important;\n      padding: 0.75rem 1.5rem !important;\n      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      letter-spacing: -0.01em !important;\n    }\n\n    :host ::ng-deep .crm-button--ghost {\n      background: rgba(255, 255, 255, 0.7) !important;\n      border: 1px solid rgba(var(--apple-gray-3), 0.5) !important;\n      color: rgba(var(--apple-label), 0.8) !important;\n      box-shadow: \n        0 1px 3px rgba(0, 0, 0, 0.04),\n        inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;\n      backdrop-filter: blur(10px) !important;\n    }\n\n    :host ::ng-deep .crm-button--ghost:hover {\n      background: rgba(255, 255, 255, 0.9) !important;\n      border-color: rgba(var(--apple-gray-2), 0.6) !important;\n      color: rgba(var(--apple-label), 0.95) !important;\n      transform: translateY(-1px) !important;\n      box-shadow: \n        0 2px 8px rgba(0, 0, 0, 0.06),\n        inset 0 1px 0 rgba(255, 255, 255, 1) !important;\n    }\n\n    :host ::ng-deep .crm-button--ghost:active {\n      background: rgba(var(--apple-gray-5), 0.8) !important;\n      transform: translateY(0) scale(0.98) !important;\n    }\n\n    :host ::ng-deep .crm-button--primary {\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 1) 0%, \n        rgba(var(--apple-blue), 0.85) 100%) !important;\n      border: none !important;\n      color: white !important;\n      box-shadow: \n        0 2px 4px rgba(0, 0, 0, 0.1),\n        0 4px 16px rgba(var(--apple-blue), 0.25),\n        inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;\n    }\n\n    :host ::ng-deep .crm-button--primary:hover:not(:disabled) {\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.92) 0%, \n        rgba(var(--apple-blue), 0.78) 100%) !important;\n      transform: translateY(-2px) !important;\n      box-shadow: \n        0 4px 8px rgba(0, 0, 0, 0.12),\n        0 8px 24px rgba(var(--apple-blue), 0.3),\n        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;\n    }\n\n    :host ::ng-deep .crm-button--primary:active:not(:disabled) {\n      transform: translateY(0) scale(0.98) !important;\n      box-shadow: \n        0 1px 3px rgba(0, 0, 0, 0.1),\n        0 2px 8px rgba(var(--apple-blue), 0.2),\n        inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;\n    }\n\n    :host ::ng-deep .crm-button--primary:disabled {\n      background: rgba(var(--apple-gray-4), 0.8) !important;\n      color: rgba(var(--apple-gray-1), 1) !important;\n      box-shadow: none !important;\n      cursor: not-allowed !important;\n      transform: none !important;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       DETAIL SECTIONS - Timeline, Notes, Related, Attachments\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .detail-container {\n      padding-top: 0;\n    }\n\n    .timeline {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .timeline-item {\n      display: grid;\n      grid-template-columns: 120px 1fr;\n      gap: 1rem;\n      padding: 1rem;\n      border-radius: 14px;\n      background: rgba(248, 250, 252, 0.9);\n      border: 1px solid rgba(226, 232, 240, 0.7);\n    }\n\n    .type-dot {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      padding: 0.35rem 0.75rem;\n      border-radius: 999px;\n      font-size: 0.75rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.04em;\n      background: rgba(59, 130, 246, 0.12);\n      color: #1d4ed8;\n    }\n\n    .type-dot[data-type='Call'] { background: rgba(16, 185, 129, 0.15); color: #047857; }\n    .type-dot[data-type='Meeting'] { background: rgba(99, 102, 241, 0.15); color: #4338ca; }\n    .type-dot[data-type='Email'] { background: rgba(251, 146, 60, 0.18); color: #c2410c; }\n    .type-dot[data-type='Task'] { background: rgba(148, 163, 184, 0.2); color: #475569; }\n    .type-dot[data-type='Note'] { background: rgba(236, 72, 153, 0.15); color: #be185d; }\n\n    .timeline-title {\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .timeline-meta {\n      color: #64748b;\n      font-size: 0.85rem;\n      margin: 0.25rem 0 0.5rem;\n    }\n\n    .timeline-description {\n      color: #334155;\n    }\n\n    .notes {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .note-editor {\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .note-actions {\n      display: flex;\n      justify-content: flex-end;\n    }\n\n    .note-item {\n      padding: 1rem;\n      border-radius: 14px;\n      background: rgba(248, 250, 252, 0.9);\n      border: 1px solid rgba(226, 232, 240, 0.7);\n    }\n\n    .note-header {\n      display: flex;\n      justify-content: space-between;\n      gap: 1rem;\n      font-weight: 700;\n      color: #1f2937;\n      margin-bottom: 0.5rem;\n    }\n\n    .note-meta {\n      font-weight: 500;\n      color: #94a3b8;\n      font-size: 0.8rem;\n    }\n\n    .note-body {\n      color: #475569;\n      white-space: pre-wrap;\n    }\n\n    .related-grid {\n      display: grid;\n      gap: 1.5rem;\n    }\n\n    .related-summary-strip {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      gap: 1rem;\n      margin-bottom: 1.25rem;\n    }\n\n    .summary-chip {\n      display: grid;\n      gap: 0.35rem;\n      padding: 0.85rem 1rem;\n      border-radius: 16px;\n      background: rgba(255, 255, 255, 0.75);\n      border: 1px solid rgba(226, 232, 240, 0.8);\n      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);\n    }\n\n    .chip-label {\n      font-size: 0.75rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n      font-weight: 600;\n    }\n\n    .chip-value {\n      font-size: 1.4rem;\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .chip-meta {\n      font-size: 0.85rem;\n      color: #475569;\n    }\n\n    .related-section h3 {\n      margin-bottom: 0.75rem;\n      color: #1f2937;\n      font-size: 1rem;\n      font-weight: 700;\n    }\n\n    .attachments {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .compact-table ::ng-deep .p-datatable-thead > tr > th {\n      font-size: 0.75rem;\n      text-transform: uppercase;\n      letter-spacing: 0.04em;\n      color: #64748b;\n    }\n\n    .related-link {\n      color: #2563eb;\n      font-weight: 600;\n      text-decoration: none;\n    }\n\n    .related-link:hover {\n      color: #1d4ed8;\n      text-decoration: underline;\n    }\n\n    .clickable-row {\n      cursor: pointer;\n      transition: background-color 0.15s ease;\n    }\n\n    .clickable-row:hover {\n      background: rgba(37, 99, 235, 0.06);\n    }\n\n    .table-actions {\n      width: 48px;\n      text-align: right;\n    }\n\n    .empty-state {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 0.35rem;\n      padding: 1.5rem 1rem;\n      color: #94a3b8;\n      font-size: 0.9rem;\n      text-align: center;\n\n      > i {\n        font-size: 1.5rem;\n        opacity: 0.5;\n      }\n\n      .empty-state-link {\n        font-size: 0.82rem;\n        font-weight: 600;\n        color: #6366f1;\n        cursor: pointer;\n        text-decoration: none;\n        transition: color 200ms;\n\n        &:hover { color: #4338ca; }\n      }\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       RESPONSIVE\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    @media (max-width: 768px) {\n      .page-header {\n        padding: 0.75rem;\n      }\n\n      .form-container {\n        padding: 0.75rem;\n      }\n\n      .form-section {\n        padding: 1.25rem;\n        border-radius: 16px;\n      }\n\n      .form-grid {\n        grid-template-columns: 1fr;\n        gap: 1rem;\n      }\n\n      .field,\n      .form-field {\n        flex-direction: column;\n        align-items: flex-start;\n      }\n\n      .field > label,\n      .form-field > label {\n        min-width: unset;\n      }\n\n      .form-actions {\n        flex-direction: column;\n      }\n\n      .form-actions button {\n        width: 100%;\n        min-width: auto;\n      }\n\n      .header-title h1 {\n        font-size: 1.5rem;\n      }\n\n      .customer-header-progress {\n        flex-direction: column;\n        align-items: stretch;\n        max-width: 100%;\n      }\n\n      .customer-header-progress__dial {\n        align-self: flex-start;\n      }\n\n      .section-title {\n        font-size: 0.9rem;\n        gap: 0.75rem;\n      }\n\n      .section-title i {\n        width: 36px;\n        height: 36px;\n        font-size: 1.1rem;\n      }\n\n      .summary-chip {\n        padding: 0.65rem 0.75rem;\n      }\n\n      .timeline-item {\n        grid-template-columns: 1fr;\n        gap: 0.5rem;\n      }\n    }\n\n    @media (max-width: 480px) {\n      .page-header {\n        padding: 0.5rem;\n      }\n\n      .form-container {\n        padding: 0.5rem;\n      }\n\n      .form-section {\n        padding: 1rem;\n        border-radius: 14px;\n      }\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       CUSTOM SCROLLBAR - Premium Style\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    :host {\n      scrollbar-width: thin;\n      scrollbar-color: rgba(var(--apple-gray-2), 0.4) transparent;\n    }\n\n    :host::-webkit-scrollbar {\n      width: 10px;\n    }\n\n    :host::-webkit-scrollbar-track {\n      background: transparent;\n    }\n\n    :host::-webkit-scrollbar-thumb {\n      background: rgba(var(--apple-gray-2), 0.4);\n      border-radius: 5px;\n      border: 3px solid transparent;\n      background-clip: content-box;\n    }\n\n    :host::-webkit-scrollbar-thumb:hover {\n      background: rgba(var(--apple-gray-1), 0.5);\n      background-clip: content-box;\n    }\n\n    /* Selection */\n    ::selection {\n      background: rgba(var(--apple-blue), 0.25);\n      color: inherit;\n    }\n  \n.presence-strip {\n  margin-top: 0.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n\n.presence-focus {\n  margin-top: 0.55rem;\n  display: inline-flex;\n  position: relative;\n  align-items: center;\n  gap: 0.45rem;\n  border-radius: 0.75rem;\n  padding: 0.4rem 0.7rem;\n  font-size: 0.8rem;\n  font-weight: 700;\n  border: 1px solid rgba(14, 165, 233, 0.22);\n  color: #0c4a6e;\n  background: linear-gradient(135deg, rgba(224, 242, 254, 0.95), rgba(186, 230, 253, 0.92));\n  box-shadow: 0 8px 18px rgba(2, 132, 199, 0.18), 0 0 0 1px rgba(125, 211, 252, 0.28) inset;\n  -webkit-user-select: none;\n  user-select: none;\n  caret-color: transparent;\n  cursor: default;\n\n  &::selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  &::-moz-selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  // Glowing comet that orbits OUTSIDE the chip border\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 2rem;\n    height: 2px;\n    border-radius: 999px;\n    background: linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.6) 15%,\n      rgba(255, 255, 255, 1) 50%,\n      rgba(255, 255, 255, 0.6) 85%,\n      transparent 100%\n    );\n    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1))\n            drop-shadow(0 0 5px rgba(186, 230, 253, 0.9))\n            drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))\n            drop-shadow(0 0 18px rgba(14, 165, 233, 0.35));\n    offset-path: inset(0px round 0.75rem);\n    offset-distance: 0%;\n    offset-rotate: auto;\n    animation: presence-border-tail 3.5s linear infinite;\n    will-change: offset-distance;\n    pointer-events: none;\n    z-index: 3;\n  }\n\n  > * {\n    position: relative;\n    z-index: 1;\n  }\n\n  i {\n    color: #0284c7;\n    font-size: 0.85rem;\n  }\n}\n\n@keyframes presence-border-tail {\n  from { offset-distance: 0%; }\n  to   { offset-distance: 100%; }\n}\n\n.presence-label {\n  font-size: 0.75rem;\n  color: #64748b;\n  font-weight: 600;\n}\n\n.presence-chip {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #0f172a;\n  border: 1px solid rgba(14, 165, 233, 0.32);\n  background: rgba(224, 242, 254, 0.8);\n}\n\n.presence-editing-note {\n  margin-top: 0.45rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  border: 1px solid rgba(251, 146, 60, 0.45);\n  background: linear-gradient(135deg, rgba(255, 247, 237, 0.98), rgba(254, 215, 170, 0.85));\n  color: #9a3412;\n  border-radius: 0.65rem;\n  padding: 0.35rem 0.65rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  box-shadow: 0 8px 18px rgba(251, 146, 60, 0.18), 0 0 0 1px rgba(254, 215, 170, 0.32) inset;\n}\n"] }]
    }], () => [{ type: i1.Router }, { type: i1.ActivatedRoute }, { type: i2.CustomerDataService }], { onCollaborativeEditingActivity: [{
            type: HostListener,
            args: ['input']
        }, {
            type: HostListener,
            args: ['change']
        }], onBeforeUnload: [{
            type: HostListener,
            args: ['window:beforeunload', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CustomerFormPage, { className: "CustomerFormPage", filePath: "src/app/crm/features/customers/pages/customer-form.page.ts", lineNumber: 74 }); })();
