import { ChangeDetectorRef, Component, DestroyRef, HostListener, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TextareaModule } from 'primeng/textarea';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { map } from 'rxjs';
import { ContactDataService } from '../services/contact-data.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { ActivityDataService } from '../../activities/services/activity-data.service';
import { OpportunityDataService } from '../../opportunities/services/opportunity-data.service';
import { AttachmentDataService } from '../../../../shared/services/attachment-data.service';
import { PropertyDataService } from '../../properties/services/property-data.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { readUserId } from '../../../../core/auth/token.utils';
import { FormDraftService } from '../../../../core/drafts/form-draft.service';
import { MailComposeService } from '../../../../core/email/mail-compose.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/api";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/select";
import * as i7 from "primeng/inputnumber";
import * as i8 from "primeng/inputgroup";
import * as i9 from "primeng/inputgroupaddon";
import * as i10 from "primeng/textarea";
import * as i11 from "primeng/tabs";
import * as i12 from "primeng/table";
import * as i13 from "primeng/tag";
import * as i14 from "primeng/fileupload";
import * as i15 from "primeng/autocomplete";
import * as i16 from "primeng/dialog";
import * as i17 from "primeng/splitbutton";
const _c0 = () => ({ width: "38rem", maxWidth: "96vw" });
const _c1 = () => ({ width: "28rem", maxWidth: "94vw" });
const _c2 = () => ({ width: "36rem", maxWidth: "96vw" });
const _c3 = () => ({ width: "42rem", maxWidth: "96vw" });
const _c4 = () => ({ standalone: true });
const _c5 = () => ({ width: "520px" });
const _c6 = a0 => ["/app/customers", a0, "edit"];
const _c7 = a0 => ["/app/deals", a0, "edit"];
const _c8 = a0 => ["/app/properties", a0];
function ContactFormPage_div_12_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 124)(1, "span", 125);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 126);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 127)(6, "button", 128);
    i0.ɵɵlistener("click", function ContactFormPage_div_12_div_1_Template_button_click_6_listener() { const draft_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.loadDraftFromPrompt(draft_r3)); });
    i0.ɵɵtext(7, "Load draft");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const draft_r3 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(draft_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", draft_r3.subtitle || "No account", " \u00B7 ", ctx_r3.formatDraftTimestamp(draft_r3.updatedAtUtc));
} }
function ContactFormPage_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 122);
    i0.ɵɵtemplate(1, ContactFormPage_div_12_div_1_Template, 8, 3, "div", 123);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.recentDrafts());
} }
function ContactFormPage_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 129);
    i0.ɵɵtext(1, "No saved drafts available.");
    i0.ɵɵelementEnd();
} }
function ContactFormPage_p_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 129);
    i0.ɵɵtext(1, "No saved drafts yet.");
    i0.ɵɵelementEnd();
} }
function ContactFormPage_div_43_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 124)(1, "span", 125);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 126);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 127)(6, "button", 128);
    i0.ɵɵlistener("click", function ContactFormPage_div_43_div_1_Template_button_click_6_listener() { const draft_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.openDraftFromSummary(draft_r6)); });
    i0.ɵɵtext(7, "Resume");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 130);
    i0.ɵɵlistener("click", function ContactFormPage_div_43_div_1_Template_button_click_8_listener($event) { const draft_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.discardDraft(draft_r6, $event)); });
    i0.ɵɵtext(9, "Discard");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const draft_r6 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(draft_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", draft_r6.subtitle || "No account", " \u00B7 ", ctx_r3.formatDraftTimestamp(draft_r6.updatedAtUtc));
} }
function ContactFormPage_div_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 122);
    i0.ɵɵtemplate(1, ContactFormPage_div_43_div_1_Template, 10, 3, "div", 123);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.draftLibraryItems());
} }
function ContactFormPage_div_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 131);
    i0.ɵɵelement(1, "i", 11);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const draftStatus_r7 = ctx.ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(draftStatus_r7);
} }
function ContactFormPage_div_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 132);
    i0.ɵɵelement(1, "i", 133);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "This form is loaded from a saved draft. Final Save will create or update the live CRM record.");
    i0.ɵɵelementEnd()();
} }
function ContactFormPage_div_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 134);
    i0.ɵɵelement(1, "i", 135);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.viewingPresenceSummary());
} }
function ContactFormPage_div_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 136);
    i0.ɵɵelement(1, "i", 137);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.editingPresenceSummary());
} }
function ContactFormPage_section_64_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 140)(1, "span", 141);
    i0.ɵɵtext(2, "Customer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 142);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 144);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate((tmp_4_0 = ctx_r3.linkedAccount()) == null ? null : tmp_4_0.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" Owner ", ((tmp_5_0 = ctx_r3.linkedAccount()) == null ? null : tmp_5_0.owner) || "\u2014", " \u00B7 Created ", i0.ɵɵpipeBind2(7, 3, (tmp_5_0 = ctx_r3.linkedAccount()) == null ? null : tmp_5_0.createdAt, "MMM d, yyyy"), " ");
} }
function ContactFormPage_section_64_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 140)(1, "span", 141);
    i0.ɵɵtext(2, "Customer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 142);
    i0.ɵɵtext(4, "None");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 144);
    i0.ɵɵtext(6, "No customer linked yet.");
    i0.ɵɵelementEnd()();
} }
function ContactFormPage_section_64_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 144);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Last added ", i0.ɵɵpipeBind2(2, 1, ctx_r3.latestOpportunityCreatedAt(), "MMM d, yyyy"), " ");
} }
function ContactFormPage_section_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 138);
    i0.ɵɵtemplate(1, ContactFormPage_section_64_div_1_Template, 8, 6, "div", 139)(2, ContactFormPage_section_64_ng_template_2_Template, 7, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementStart(4, "div", 140)(5, "span", 141);
    i0.ɵɵtext(6, "Opportunities");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 142);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, ContactFormPage_section_64_span_9_Template, 3, 4, "span", 143);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const accountSummaryEmpty_r8 = i0.ɵɵreference(3);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.linkedAccount())("ngIfElse", accountSummaryEmpty_r8);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r3.opportunityCount());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.latestOpportunityCreatedAt());
} }
function ContactFormPage_p_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 145);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.firstNameError());
} }
function ContactFormPage_p_89_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 145);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.lastNameError());
} }
function ContactFormPage_a_97_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 146);
    i0.ɵɵlistener("click", function ContactFormPage_a_97_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.composeToCurrentContact($event)); });
    i0.ɵɵelement(1, "i", 147);
    i0.ɵɵtext(2, " Send email");
    i0.ɵɵelementEnd();
} }
function ContactFormPage_a_116_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 148);
    i0.ɵɵelement(1, "i", 147);
    i0.ɵɵtext(2, " Call");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("href", "tel:" + ctx_r3.form.phone, i0.ɵɵsanitizeUrl);
} }
function ContactFormPage_a_124_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 148);
    i0.ɵɵelement(1, "i", 147);
    i0.ɵɵtext(2, " Call");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("href", "tel:" + ctx_r3.form.mobile, i0.ɵɵsanitizeUrl);
} }
function ContactFormPage_a_157_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 149);
    i0.ɵɵelement(1, "i", 147);
    i0.ɵɵtext(2, " View profile");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("href", ctx_r3.form.linkedInProfile, i0.ɵɵsanitizeUrl);
} }
function ContactFormPage_button_200_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 150);
    i0.ɵɵlistener("click", function ContactFormPage_button_200_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r10); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.convertToOpportunity()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r3.converting());
} }
function ContactFormPage_section_203_div_3_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 199);
} }
function ContactFormPage_section_203_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 193)(1, "div", 194)(2, "div", 195);
    i0.ɵɵelement(3, "i", 196);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, ContactFormPage_section_203_div_3_div_4_Template, 1, 0, "div", 197);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 198);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const stage_r12 = ctx.$implicit;
    const i_r13 = ctx.index;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", stage_r12.value === ctx_r3.form.lifecycleStage)("completed", ctx_r3.lifecycleStageIndex(stage_r12.value) < ctx_r3.lifecycleStageIndex(ctx_r3.form.lifecycleStage));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", stage_r12.icon);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i_r13 < ctx_r3.lifecycleStages.length - 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stage_r12.label);
} }
function ContactFormPage_section_203_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 200);
    i0.ɵɵelement(1, "i", 201);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.timeInStage());
} }
function ContactFormPage_section_203_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 202)(1, "div", 203)(2, "span", 204);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 205);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 206);
    i0.ɵɵelement(7, "div", 207);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r14 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r14.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r14.value, "/", item_r14.max);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", item_r14.value / item_r14.max * 100, "%")("background", item_r14.color);
} }
function ContactFormPage_section_203_span_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 208);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.activities().length);
} }
function ContactFormPage_section_203_span_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 208);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.notes().length);
} }
function ContactFormPage_section_203_span_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 208);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.relatedOpportunities().length + ctx_r3.relatedProperties().length);
} }
function ContactFormPage_section_203_span_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 208);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.attachments().length);
} }
function ContactFormPage_section_203_span_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 208);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.relationships().length);
} }
function ContactFormPage_section_203_div_43_div_1_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Since ", i0.ɵɵpipeBind2(2, 1, ctx_r3.contactCreatedAt(), "MMM d, yyyy"));
} }
function ContactFormPage_section_203_div_43_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 212)(1, "div", 213)(2, "span", 214);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 215)(5, "div", 216);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 217);
    i0.ɵɵtemplate(8, ContactFormPage_section_203_div_43_div_1_span_8_Template, 3, 4, "span", 218);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.form.lifecycleStage);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Current lifecycle: ", ctx_r3.form.lifecycleStage);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r3.contactCreatedAt());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u2022 ", ctx_r3.timeInStage());
} }
function ContactFormPage_section_203_div_43_div_2_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const activity_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2022 ", activity_r15.ownerName);
} }
function ContactFormPage_section_203_div_43_div_2_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 222);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const activity_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(activity_r15.description);
} }
function ContactFormPage_section_203_div_43_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 219)(1, "div", 213)(2, "span", 220);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 215)(5, "div", 216);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 217)(8, "span");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, ContactFormPage_section_203_div_43_div_2_span_11_Template, 2, 1, "span", 218);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, ContactFormPage_section_203_div_43_div_2_div_12_Template, 2, 1, "div", 221);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const activity_r15 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-type", activity_r15.type);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(activity_r15.type);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(activity_r15.subject);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 6, activity_r15.createdAtUtc, "MMM d, yyyy \u00B7 h:mm a"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", activity_r15.ownerName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", activity_r15.description);
} }
function ContactFormPage_section_203_div_43_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 188);
    i0.ɵɵelement(1, "i", 201);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No activity yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "a", 223);
    i0.ɵɵtext(5, "+ Log first activity");
    i0.ɵɵelementEnd()();
} }
function ContactFormPage_section_203_div_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 209);
    i0.ɵɵtemplate(1, ContactFormPage_section_203_div_43_div_1_Template, 11, 4, "div", 210)(2, ContactFormPage_section_203_div_43_div_2_Template, 13, 9, "div", 211)(3, ContactFormPage_section_203_div_43_div_3_Template, 6, 0, "div", 184);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.form.lifecycleStage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.activities());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.activities().length);
} }
function ContactFormPage_section_203_ng_template_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 188);
    i0.ɵɵtext(1, "Loading timeline...");
    i0.ɵɵelementEnd();
} }
function ContactFormPage_section_203_div_52_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 226)(1, "div", 227)(2, "span", 228);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 229);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 230);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const note_r16 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(note_r16.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 3, note_r16.createdAtUtc, "MMM d, yyyy \u00B7 h:mm a"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(note_r16.description);
} }
function ContactFormPage_section_203_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 224);
    i0.ɵɵtemplate(1, ContactFormPage_section_203_div_52_div_1_Template, 9, 6, "div", 225);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.notes());
} }
function ContactFormPage_section_203_ng_template_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 188);
    i0.ɵɵelement(1, "i", 231);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No notes yet. Use the editor above to add one.");
    i0.ɵɵelementEnd()();
} }
function ContactFormPage_section_203_div_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 232)(1, "div", 233);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 234);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 234);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(8, _c6, (tmp_7_0 = ctx_r3.linkedAccount()) == null ? null : tmp_7_0.id));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_8_0 = ctx_r3.linkedAccount()) == null ? null : tmp_8_0.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(((tmp_9_0 = ctx_r3.linkedAccount()) == null ? null : tmp_9_0.company) || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" Owner: ", ((tmp_10_0 = ctx_r3.linkedAccount()) == null ? null : tmp_10_0.owner) || "\u2014", " \u00B7 Created ", i0.ɵɵpipeBind2(7, 5, (tmp_10_0 = ctx_r3.linkedAccount()) == null ? null : tmp_10_0.createdAt, "MMM d, yyyy"), " ");
} }
function ContactFormPage_section_203_ng_template_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 188);
    i0.ɵɵtext(1, "No customer linked.");
    i0.ɵɵelementEnd();
} }
function ContactFormPage_section_203_ng_template_67_Template(rf, ctx) { if (rf & 1) {
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
function ContactFormPage_section_203_ng_template_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 235)(1, "td")(2, "span", 236);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵelement(5, "p-tag", 237);
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
    const row_r17 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(14, _c7, row_r17.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r17.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", row_r17.stage);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(8, 6, row_r17.amount, row_r17.currency, "symbol", "1.0-0"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r17.owner || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(13, 11, row_r17.createdAtUtc, "MMM d, yyyy"));
} }
function ContactFormPage_section_203_div_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 188);
    i0.ɵɵelement(1, "i", 238);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No opportunities yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "a", 239);
    i0.ɵɵtext(5, "+ Create deal");
    i0.ɵɵelementEnd()();
} }
function ContactFormPage_section_203_ng_template_74_Template(rf, ctx) { if (rf & 1) {
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
function ContactFormPage_section_203_ng_template_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 235)(1, "td")(2, "span", 236);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵelement(5, "p-tag", 237);
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
    const row_r18 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(11, _c8, row_r18.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r18.address);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", row_r18.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r18.propertyType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(10, 6, row_r18.listPrice, row_r18.currency, "symbol", "1.0-0"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r18.mlsNumber || "\u2014");
} }
function ContactFormPage_section_203_div_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 188);
    i0.ɵɵelement(1, "i", 240);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No properties linked.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "a", 241);
    i0.ɵɵtext(5, "+ Add property");
    i0.ɵɵelementEnd()();
} }
function ContactFormPage_section_203_ng_template_81_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Relationship");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Created");
    i0.ɵɵelementEnd()();
} }
function ContactFormPage_section_203_ng_template_82_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 235)(1, "td")(2, "span", 236);
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
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r19 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(8, _c6, row_r19.id));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r19.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.relatedAccountRelation(row_r19));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r19.owner || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 5, row_r19.createdAt, "MMM d, yyyy"));
} }
function ContactFormPage_section_203_div_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 188);
    i0.ɵɵelement(1, "i", 81);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No related accounts.");
    i0.ɵɵelementEnd()();
} }
function ContactFormPage_section_203_div_87_div_1_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const activity_r20 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2022 ", activity_r20.ownerName);
} }
function ContactFormPage_section_203_div_87_div_1_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 222);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const activity_r20 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(activity_r20.description);
} }
function ContactFormPage_section_203_div_87_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 219)(1, "div", 213)(2, "span", 220);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 215)(5, "div", 216);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 217)(8, "span");
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, ContactFormPage_section_203_div_87_div_1_span_11_Template, 2, 1, "span", 218);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, ContactFormPage_section_203_div_87_div_1_div_12_Template, 2, 1, "div", 221);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const activity_r20 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-type", activity_r20.type);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(activity_r20.type);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(activity_r20.subject);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(10, 6, activity_r20.createdAtUtc, "MMM d, yyyy \u00B7 h:mm a"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", activity_r20.ownerName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", activity_r20.description);
} }
function ContactFormPage_section_203_div_87_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 188);
    i0.ɵɵtext(1, "No account history yet.");
    i0.ɵɵelementEnd();
} }
function ContactFormPage_section_203_div_87_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 209);
    i0.ɵɵtemplate(1, ContactFormPage_section_203_div_87_div_1_Template, 13, 9, "div", 211)(2, ContactFormPage_section_203_div_87_div_2_Template, 2, 0, "div", 184);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.accountHistory());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.accountHistory().length);
} }
function ContactFormPage_section_203_ng_template_88_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 188);
    i0.ɵɵtext(1, "Loading account history...");
    i0.ɵɵelementEnd();
} }
function ContactFormPage_section_203_ng_template_94_Template(rf, ctx) { if (rf & 1) {
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
function ContactFormPage_section_203_ng_template_95_Template(rf, ctx) { if (rf & 1) {
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
    i0.ɵɵelementStart(8, "td", 242)(9, "button", 243);
    i0.ɵɵlistener("click", function ContactFormPage_section_203_ng_template_95_Template_button_click_9_listener() { const row_r22 = i0.ɵɵrestoreView(_r21).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.downloadAttachment(row_r22)); });
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
function ContactFormPage_section_203_div_96_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 188);
    i0.ɵɵelement(1, "i", 244);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No attachments yet. Use the upload button above.");
    i0.ɵɵelementEnd()();
} }
function ContactFormPage_section_203_p_103_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 245);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Contact email: ", ctx_r3.form.email);
} }
function ContactFormPage_section_203_div_106_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 246);
    i0.ɵɵelement(1, "i", 247);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Loading relationships\u2026");
    i0.ɵɵelementEnd()();
} }
function ContactFormPage_section_203_div_107_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 188);
    i0.ɵɵelement(1, "i", 248);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "No relationships found for this contact.");
    i0.ɵɵelementEnd()();
} }
function ContactFormPage_section_203_div_108_div_1_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 257);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const rel_r23 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(rel_r23.jobTitle);
} }
function ContactFormPage_section_203_div_108_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 251)(1, "div", 252);
    i0.ɵɵelement(2, "i", 196);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 253)(4, "span", 254);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 255);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, ContactFormPage_section_203_div_108_div_1_span_8_Template, 2, 1, "span", 256);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const rel_r23 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r3.relationshipIcon(rel_r23.relationship));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(rel_r23.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(rel_r23.relationship);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", rel_r23.jobTitle);
} }
function ContactFormPage_section_203_div_108_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 249);
    i0.ɵɵtemplate(1, ContactFormPage_section_203_div_108_div_1_Template, 9, 4, "div", 250);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.relationships());
} }
function ContactFormPage_section_203_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 151)(1, "div", 152)(2, "div", 153);
    i0.ɵɵtemplate(3, ContactFormPage_section_203_div_3_Template, 7, 7, "div", 154);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, ContactFormPage_section_203_div_4_Template, 4, 1, "div", 155);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 156)(6, "div", 157)(7, "div", 158);
    i0.ɵɵelement(8, "i", 159);
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "Engagement Score");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 160)(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15, "/ 100");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "div", 161);
    i0.ɵɵtemplate(17, ContactFormPage_section_203_div_17_Template, 8, 7, "div", 162);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "section", 48)(19, "h2", 49);
    i0.ɵɵelement(20, "i", 163);
    i0.ɵɵtext(21, " Contact workspace ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "p-tabs", 164)(23, "p-tablist")(24, "p-tab", 164);
    i0.ɵɵtext(25, "Timeline ");
    i0.ɵɵtemplate(26, ContactFormPage_section_203_span_26_Template, 2, 1, "span", 165);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "p-tab", 166);
    i0.ɵɵtext(28, "Notes ");
    i0.ɵɵtemplate(29, ContactFormPage_section_203_span_29_Template, 2, 1, "span", 165);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "p-tab", 167);
    i0.ɵɵtext(31, "Related ");
    i0.ɵɵtemplate(32, ContactFormPage_section_203_span_32_Template, 2, 1, "span", 165);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "p-tab", 168);
    i0.ɵɵtext(34, "Attachments ");
    i0.ɵɵtemplate(35, ContactFormPage_section_203_span_35_Template, 2, 1, "span", 165);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "p-tab", 169);
    i0.ɵɵtext(37, "Emails");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "p-tab", 170);
    i0.ɵɵtext(39, "Relationships ");
    i0.ɵɵtemplate(40, ContactFormPage_section_203_span_40_Template, 2, 1, "span", 165);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(41, "p-tabpanels")(42, "p-tabpanel", 164);
    i0.ɵɵtemplate(43, ContactFormPage_section_203_div_43_Template, 4, 3, "div", 171)(44, ContactFormPage_section_203_ng_template_44_Template, 2, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "p-tabpanel", 166)(47, "div", 172)(48, "div", 173)(49, "textarea", 174);
    i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_section_203_Template_textarea_ngModelChange_49_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.noteText, $event) || (ctx_r3.noteText = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "div", 175)(51, "button", 176);
    i0.ɵɵlistener("click", function ContactFormPage_section_203_Template_button_click_51_listener() { i0.ɵɵrestoreView(_r11); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.addNote()); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(52, ContactFormPage_section_203_div_52_Template, 2, 1, "div", 177)(53, ContactFormPage_section_203_ng_template_53_Template, 4, 0, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(55, "p-tabpanel", 167)(56, "div", 178)(57, "div", 179)(58, "h3");
    i0.ɵɵtext(59, "Customer");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(60, ContactFormPage_section_203_div_60_Template, 8, 10, "div", 180)(61, ContactFormPage_section_203_ng_template_61_Template, 2, 0, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "div", 179)(64, "h3");
    i0.ɵɵtext(65, "Opportunities");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(66, "p-table", 181);
    i0.ɵɵtemplate(67, ContactFormPage_section_203_ng_template_67_Template, 11, 0, "ng-template", 182)(68, ContactFormPage_section_203_ng_template_68_Template, 14, 16, "ng-template", 183);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(69, ContactFormPage_section_203_div_69_Template, 6, 0, "div", 184);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(70, "div", 179)(71, "h3");
    i0.ɵɵtext(72, "Properties");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "p-table", 181);
    i0.ɵɵtemplate(74, ContactFormPage_section_203_ng_template_74_Template, 11, 0, "ng-template", 182)(75, ContactFormPage_section_203_ng_template_75_Template, 13, 13, "ng-template", 183);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(76, ContactFormPage_section_203_div_76_Template, 6, 0, "div", 184);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(77, "div", 179)(78, "h3");
    i0.ɵɵtext(79, "Related accounts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(80, "p-table", 181);
    i0.ɵɵtemplate(81, ContactFormPage_section_203_ng_template_81_Template, 9, 0, "ng-template", 182)(82, ContactFormPage_section_203_ng_template_82_Template, 11, 10, "ng-template", 183);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(83, ContactFormPage_section_203_div_83_Template, 4, 0, "div", 184);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(84, "div", 179)(85, "h3");
    i0.ɵɵtext(86, "Account history");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(87, ContactFormPage_section_203_div_87_Template, 3, 2, "div", 171)(88, ContactFormPage_section_203_ng_template_88_Template, 2, 0, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(90, "p-tabpanel", 168)(91, "div", 185)(92, "p-fileUpload", 186);
    i0.ɵɵlistener("uploadHandler", function ContactFormPage_section_203_Template_p_fileUpload_uploadHandler_92_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onAttachmentUpload($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(93, "p-table", 181);
    i0.ɵɵtemplate(94, ContactFormPage_section_203_ng_template_94_Template, 8, 0, "ng-template", 182)(95, ContactFormPage_section_203_ng_template_95_Template, 10, 5, "ng-template", 183);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(96, ContactFormPage_section_203_div_96_Template, 4, 0, "div", 184);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(97, "p-tabpanel", 169)(98, "div", 187)(99, "div", 188);
    i0.ɵɵelement(100, "i", 62);
    i0.ɵɵelementStart(101, "span");
    i0.ɵɵtext(102, "Email history will appear here once email sync is configured.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(103, ContactFormPage_section_203_p_103_Template, 2, 1, "p", 189);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(104, "p-tabpanel", 170)(105, "div", 190);
    i0.ɵɵtemplate(106, ContactFormPage_section_203_div_106_Template, 4, 0, "div", 191)(107, ContactFormPage_section_203_div_107_Template, 4, 0, "div", 184)(108, ContactFormPage_section_203_div_108_Template, 2, 1, "div", 192);
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const timelineLoadingTpl_r24 = i0.ɵɵreference(45);
    const notesEmpty_r25 = i0.ɵɵreference(54);
    const accountEmpty_r26 = i0.ɵɵreference(62);
    const accountHistoryLoadingTpl_r27 = i0.ɵɵreference(89);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r3.lifecycleStages);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.contactCreatedAt());
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r3.engagementBreakdown().total);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r3.engagementBreakdown().items);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("ngIf", ctx_r3.activities().length);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.notes().length);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.relatedOpportunities().length + ctx_r3.relatedProperties().length);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.attachments().length);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r3.relationships().length);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r3.timelineLoading())("ngIfElse", timelineLoadingTpl_r24);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.noteText);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(42, _c4));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r3.noteText.trim() || ctx_r3.noteSaving());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.notes().length)("ngIfElse", notesEmpty_r25);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r3.linkedAccount())("ngIfElse", accountEmpty_r26);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("value", ctx_r3.relatedOpportunitiesSorted())("paginator", false)("rows", 5);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r3.relatedOpportunities().length);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r3.relatedProperties())("paginator", false)("rows", 5);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r3.relatedProperties().length);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r3.relatedAccountsSorted())("paginator", false)("rows", 5);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r3.relatedAccounts().length);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", !ctx_r3.accountHistoryLoading())("ngIfElse", accountHistoryLoadingTpl_r27);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("customUpload", true)("auto", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r3.attachments())("paginator", false)("rows", 5);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r3.attachments().length);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r3.form.email);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.relationshipsLoading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.relationshipsLoading() && !ctx_r3.relationships().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.relationshipsLoading() && ctx_r3.relationships().length);
} }
function ContactFormPage_div_208_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 263);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dup_r28 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(dup_r28.email);
} }
function ContactFormPage_div_208_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 264);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dup_r28 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(dup_r28.phone);
} }
function ContactFormPage_div_208_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 258)(1, "div", 259)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, ContactFormPage_div_208_span_4_Template, 2, 1, "span", 260)(5, ContactFormPage_div_208_span_5_Template, 2, 1, "span", 261);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 262);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const dup_r28 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(dup_r28.fullName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", dup_r28.email);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", dup_r28.phone);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", dup_r28.matchScore, "% match");
} }
function ContactFormPage_ng_template_209_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 112);
    i0.ɵɵlistener("click", function ContactFormPage_ng_template_209_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r29); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.duplicateDialogVisible.set(false)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 265);
    i0.ɵɵlistener("click", function ContactFormPage_ng_template_209_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r29); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.confirmSaveDespiteDuplicates()); });
    i0.ɵɵelementEnd();
} }
export class ContactFormPage {
    lifecycleOptions = [
        { label: 'Lead', value: 'Lead' },
        { label: 'Prospect', value: 'Prospect' },
        { label: 'Customer', value: 'Customer' }
    ];
    buyingRoleOptions = [
        { label: 'Decision Maker', value: 'Decision Maker' },
        { label: 'Champion', value: 'Champion' },
        { label: 'Influencer', value: 'Influencer' },
        { label: 'Procurement', value: 'Procurement' },
        { label: 'Technical Evaluator', value: 'Technical Evaluator' }
    ];
    // C8: Lifecycle stepper
    lifecycleStages = [
        { label: 'Lead', value: 'Lead', icon: 'pi-user-plus' },
        { label: 'Prospect', value: 'Prospect', icon: 'pi-search' },
        { label: 'Customer', value: 'Customer', icon: 'pi-check-circle' }
    ];
    contactCreatedAt = signal(null, ...(ngDevMode ? [{ debugName: "contactCreatedAt" }] : []));
    // C9: Engagement scoring breakdown
    engagementBreakdown = computed(() => {
        const activityCount = this.activities().length;
        const oppCount = this.relatedOpportunities().length;
        const hasEmail = !!this.form.email;
        const created = this.contactCreatedAt();
        const recencyDays = created
            ? Math.floor((Date.now() - new Date(created.endsWith('Z') ? created : created + 'Z').getTime()) / 86400000)
            : 999;
        const completeness = [this.form.firstName, this.form.lastName, this.form.email, this.form.phone, this.form.jobTitle, this.form.linkedInProfile]
            .filter(v => !!v).length / 6;
        const activities = Math.min(activityCount / 10, 1) * 30;
        const opportunities = Math.min(oppCount / 3, 1) * 25;
        const email = hasEmail ? 20 : 0;
        const recency = recencyDays <= 7 ? 15 : recencyDays <= 30 ? 10 : recencyDays <= 90 ? 5 : 0;
        const profile = completeness * 10;
        const total = Math.round(activities + opportunities + email + recency + profile);
        return {
            total,
            items: [
                { label: 'Activities', value: Math.round(activities), max: 30, color: '#667eea' },
                { label: 'Opportunities', value: Math.round(opportunities), max: 25, color: '#a855f7' },
                { label: 'Email', value: Math.round(email), max: 20, color: '#ec4899' },
                { label: 'Recency', value: Math.round(recency), max: 15, color: '#22c55e' },
                { label: 'Profile', value: Math.round(profile), max: 10, color: '#f59e0b' }
            ]
        };
    }, ...(ngDevMode ? [{ debugName: "engagementBreakdown" }] : []));
    accountOptions = [];
    accounts = signal([], ...(ngDevMode ? [{ debugName: "accounts" }] : []));
    form = this.createEmptyForm();
    _originalFormSnapshot = '';
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    draftSaving = signal(false, ...(ngDevMode ? [{ debugName: "draftSaving" }] : []));
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
    firstNameError = signal(null, ...(ngDevMode ? [{ debugName: "firstNameError" }] : []));
    lastNameError = signal(null, ...(ngDevMode ? [{ debugName: "lastNameError" }] : []));
    activities = signal([], ...(ngDevMode ? [{ debugName: "activities" }] : []));
    notes = signal([], ...(ngDevMode ? [{ debugName: "notes" }] : []));
    relatedOpportunities = signal([], ...(ngDevMode ? [{ debugName: "relatedOpportunities" }] : []));
    relatedAccounts = signal([], ...(ngDevMode ? [{ debugName: "relatedAccounts" }] : []));
    accountHistory = signal([], ...(ngDevMode ? [{ debugName: "accountHistory" }] : []));
    accountHistoryLoading = signal(false, ...(ngDevMode ? [{ debugName: "accountHistoryLoading" }] : []));
    attachments = signal([], ...(ngDevMode ? [{ debugName: "attachments" }] : []));
    relatedProperties = signal([], ...(ngDevMode ? [{ debugName: "relatedProperties" }] : []));
    timelineLoading = signal(false, ...(ngDevMode ? [{ debugName: "timelineLoading" }] : []));
    noteSaving = signal(false, ...(ngDevMode ? [{ debugName: "noteSaving" }] : []));
    presenceUsers = signal([], ...(ngDevMode ? [{ debugName: "presenceUsers" }] : []));
    noteText = '';
    // C17: Tags
    formTags = [];
    tagSuggestions = signal([], ...(ngDevMode ? [{ debugName: "tagSuggestions" }] : []));
    allTags = [];
    // C19: Reports-To
    reportsToOptions = signal([], ...(ngDevMode ? [{ debugName: "reportsToOptions" }] : []));
    // C15: Duplicate Detection
    duplicateDialogVisible = signal(false, ...(ngDevMode ? [{ debugName: "duplicateDialogVisible" }] : []));
    duplicates = signal([], ...(ngDevMode ? [{ debugName: "duplicates" }] : []));
    pendingSave = false;
    // C18: Convert to Opportunity
    converting = signal(false, ...(ngDevMode ? [{ debugName: "converting" }] : []));
    hasShownDraftPrompt = false;
    // C19: Relationships
    relationships = signal([], ...(ngDevMode ? [{ debugName: "relationships" }] : []));
    relationshipsLoading = signal(false, ...(ngDevMode ? [{ debugName: "relationshipsLoading" }] : []));
    toastService = inject(AppToastService);
    cdr = inject(ChangeDetectorRef);
    contactData = inject(ContactDataService);
    customerData = inject(CustomerDataService);
    activityData = inject(ActivityDataService);
    opportunityData = inject(OpportunityDataService);
    attachmentData = inject(AttachmentDataService);
    propertyData = inject(PropertyDataService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    crmEvents = inject(CrmEventsService);
    formDraftService = inject(FormDraftService);
    mailCompose = inject(MailComposeService);
    destroyRef = inject(DestroyRef);
    currentUserId = readUserId();
    editingId = null;
    localEditingState = false;
    editingIdleTimer = null;
    pendingDraftToOpen = null;
    pendingLeaveResolver = null;
    pendingLeaveDecision = null;
    leaveAfterSave = false;
    leaveAfterDraftSave = false;
    ngOnInit() {
        this.editingId = this.route.snapshot.paramMap.get('id');
        this.loadRecentDrafts();
        if (this.editingId) {
            this.initializePresence(this.editingId);
        }
        const contact = history.state?.contact;
        if (this.editingId && contact) {
            this.prefill(contact);
        }
        else if (this.editingId) {
            this.contactData.getById(this.editingId).subscribe({
                next: (item) => this.prefill(item),
                error: () => this.raiseToast('error', 'Unable to load contact.')
            });
        }
        else {
            this._originalFormSnapshot = this.createSnapshot();
        }
        this.customerData.search({ page: 1, pageSize: 100 }).subscribe((res) => {
            queueMicrotask(() => {
                this.accounts.set(res.items);
                this.accountOptions = res.items.map((account) => ({ label: account.name, value: account.id }));
                this.cdr.markForCheck();
            });
        });
        // C17: Load all existing tags for autocomplete
        this.contactData.getAllTags().subscribe({
            next: (tags) => { this.allTags = tags; },
            error: () => { }
        });
        // C19: Load contacts for Reports-To dropdown
        this.contactData.search({ page: 1, pageSize: 200 }).subscribe({
            next: (res) => {
                const opts = res.items
                    .filter((c) => c.id !== this.editingId)
                    .map((c) => ({ label: c.name, value: c.id }));
                this.reportsToOptions.set(opts);
            },
            error: () => { }
        });
    }
    ngOnDestroy() {
        this.resolvePendingLeave(false);
        this.clearEditingIdleTimer();
        if (this.editingId) {
            this.crmEvents.setRecordEditingState('contact', this.editingId, false);
            this.crmEvents.leaveRecordPresence('contact', this.editingId);
        }
    }
    composeToCurrentContact(event) {
        event?.preventDefault();
        if (!this.isEditMode() || !this.form.email || !this.editingId) {
            return;
        }
        const displayName = [this.form.firstName, this.form.lastName].filter(Boolean).join(' ').trim();
        this.mailCompose.open({
            toEmail: this.form.email,
            toName: displayName || undefined,
            relatedEntityType: 'Contact',
            relatedEntityId: this.editingId
        });
    }
    onCollaborativeEditingActivity() {
        if (!this.editingId || !this.isEditMode()) {
            return;
        }
        if (!this.localEditingState) {
            this.localEditingState = true;
            this.crmEvents.setRecordEditingState('contact', this.editingId, true);
        }
        this.clearEditingIdleTimer();
        this.editingIdleTimer = setTimeout(() => {
            if (!this.editingId) {
                return;
            }
            this.localEditingState = false;
            this.crmEvents.setRecordEditingState('contact', this.editingId, false);
        }, 8000);
    }
    isEditMode() {
        return !!this.editingId;
    }
    hasUnsavedChanges() {
        return this._originalFormSnapshot !== '' && this.createSnapshot() !== this._originalFormSnapshot;
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
    onSave() {
        this.firstNameError.set(!this.form.firstName ? 'First name is required.' : null);
        this.lastNameError.set(!this.form.lastName ? 'Last name is required.' : null);
        if (this.firstNameError() || this.lastNameError()) {
            this.raiseToast('error', 'Please fix the highlighted errors before saving.');
            return false;
        }
        // C15: Check for duplicates before creating (skip if user already confirmed)
        if (!this.editingId && !this.pendingSave) {
            this.contactData.checkDuplicates({
                firstName: this.form.firstName,
                lastName: this.form.lastName,
                email: this.form.email,
                phone: this.form.phone
            }).subscribe({
                next: (result) => {
                    if (result.duplicates.length > 0) {
                        this.duplicates.set(result.duplicates);
                        this.duplicateDialogVisible.set(true);
                        return;
                    }
                    this.executeSave();
                },
                error: () => this.executeSave() // proceed on error
            });
            return true;
        }
        this.pendingSave = false;
        this.executeSave();
        return true;
    }
    // C15: Called when user confirms save despite duplicates
    confirmSaveDespiteDuplicates() {
        this.duplicateDialogVisible.set(false);
        this.pendingSave = true;
        this.onSave();
    }
    primarySaveLabel() {
        return this.isEditMode() ? 'Update Contact' : 'Create Contact';
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
            entityType: 'contact',
            title: this.buildDraftTitle(),
            subtitle: this.buildDraftSubtitle(),
            payloadJson: JSON.stringify({ form: this.form, formTags: this.formTags })
        }).subscribe({
            next: (draft) => {
                this.draftSaving.set(false);
                this.activeDraftId.set(draft.id);
                this.draftModeActive.set(true);
                this.draftStatusMessage.set(`Draft saved at ${this.formatDraftTimestamp(draft.updatedAtUtc)}.`);
                this._originalFormSnapshot = this.createSnapshot();
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
    executeSave() {
        const payload = {
            ...this.form,
            activityScore: this.form.activityScore ?? 0,
            tags: this.formTags.length > 0 ? this.formTags : undefined,
            reportsToId: this.form.reportsToId || undefined
        };
        this.saving.set(true);
        const request$ = this.editingId
            ? this.contactData.update(this.editingId, payload).pipe(map(() => null))
            : this.contactData.create(payload).pipe(map(() => null));
        request$.subscribe({
            next: () => {
                this.saving.set(false);
                this.completeActiveDraft();
                this._originalFormSnapshot = this.createSnapshot();
                const message = this.editingId ? 'Contact updated.' : 'Contact created.';
                this.raiseToast('success', message);
                this.loadRecentDrafts();
                this.finalizeLeaveAfterSave(true);
            },
            error: () => {
                this.saving.set(false);
                this.raiseToast('error', this.editingId ? 'Unable to update contact.' : 'Unable to create contact.');
                this.finalizeLeaveAfterSave(false);
            }
        });
    }
    // C8: Lifecycle stepper helpers
    lifecycleStageIndex(stage) {
        return this.lifecycleStages.findIndex(s => s.value === stage);
    }
    timeInStage() {
        const created = this.contactCreatedAt();
        if (!created)
            return '';
        const diff = Date.now() - new Date(created.endsWith('Z') ? created : created + 'Z').getTime();
        const days = Math.floor(diff / 86400000);
        if (days < 1)
            return 'Today';
        if (days === 1)
            return '1 day in stage';
        if (days < 30)
            return `${days} days in stage`;
        const months = Math.floor(days / 30);
        return months === 1 ? '1 month in stage' : `${months} months in stage`;
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, tone === 'error' ? 5000 : 3000);
    }
    loadRecentDrafts() {
        this.formDraftService.list('contact', { limit: 5, page: 1, pageSize: 5 }).subscribe({
            next: (result) => {
                const items = result.items;
                this.recentDrafts.set(items);
                if (!this.hasShownDraftPrompt && !this.isEditMode() && !this.draftModeActive() && items.length) {
                    this.hasShownDraftPrompt = true;
                    this.draftPromptVisible.set(true);
                }
            },
            error: () => this.recentDrafts.set([])
        });
    }
    loadDraftLibrary() {
        this.draftLibraryLoading.set(true);
        this.formDraftService.list('contact', { page: 1, pageSize: 50 }).subscribe({
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
                const payload = this.parseDraftPayload(draft);
                this.form = {
                    ...this.createEmptyForm(),
                    ...(payload.form ?? {})
                };
                this.formTags = payload.formTags ?? [];
                this.activeDraftId.set(draft.id);
                this.draftModeActive.set(true);
                this.draftStatusMessage.set(`Draft loaded from ${this.formatDraftTimestamp(draft.updatedAtUtc)}.`);
                this._originalFormSnapshot = this.createSnapshot();
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
    createSnapshot() {
        return JSON.stringify({ form: this.form, formTags: this.formTags });
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
        return JSON.stringify({ form: this.form, formTags: this.formTags }) !== JSON.stringify({ form: this.createEmptyForm(), formTags: [] });
    }
    buildDraftTitle() {
        const fullName = `${this.form.firstName ?? ''} ${this.form.lastName ?? ''}`.trim();
        return fullName || 'Untitled contact draft';
    }
    buildDraftSubtitle() {
        const account = this.accounts().find((item) => item.id === this.form.accountId);
        return account?.name ?? null;
    }
    buildDraftMenuMarkup(draft) {
        const title = this.escapeDraftText(draft.title);
        const subtitle = this.escapeDraftText(draft.subtitle?.trim() || 'No account');
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
    prefill(contact) {
        const [firstName, ...rest] = contact.name.split(' ');
        this.form = {
            firstName,
            lastName: rest.join(' '),
            email: contact.email,
            phone: contact.phone,
            mobile: contact.mobile,
            jobTitle: contact.jobTitle,
            buyingRole: contact.buyingRole,
            accountId: contact.accountId,
            ownerId: undefined,
            lifecycleStage: contact.lifecycleStage ?? 'Lead',
            activityScore: contact.activityScore ?? 0,
            linkedInProfile: '',
            street: contact.street,
            city: contact.city,
            state: contact.state,
            postalCode: contact.postalCode,
            country: contact.country,
            tags: contact.tags ?? [],
            reportsToId: contact.reportsToId
        };
        this.formTags = contact.tags ? [...contact.tags] : [];
        this.loadDetailData();
        this.contactCreatedAt.set(contact.createdAt ?? null);
        this._originalFormSnapshot = this.createSnapshot();
    }
    createEmptyForm() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            mobile: '',
            jobTitle: '',
            buyingRole: undefined,
            accountId: undefined,
            ownerId: undefined,
            lifecycleStage: 'Lead',
            activityScore: 0,
            linkedInProfile: '',
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
            tags: [],
            reportsToId: undefined
        };
    }
    initializePresence(recordId) {
        this.crmEvents.joinRecordPresence('contact', recordId);
        this.crmEvents.events$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => {
            if (!event?.payload) {
                return;
            }
            const entityType = String(event.payload['entityType'] ?? '').toLowerCase();
            const payloadRecordId = String(event.payload['recordId'] ?? '');
            if (entityType !== 'contact' || payloadRecordId !== recordId) {
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
    addNote() {
        if (!this.editingId || !this.noteText.trim()) {
            return;
        }
        this.noteSaving.set(true);
        const payload = {
            subject: 'Note',
            description: this.noteText.trim(),
            type: 'Note',
            relatedEntityType: 'Contact',
            relatedEntityId: this.editingId
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
        if (!this.editingId || !event.files?.length) {
            return;
        }
        const file = event.files[0];
        this.attachmentData.upload(file, 'Contact', this.editingId).subscribe({
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
    linkedAccount() {
        if (!this.form.accountId) {
            return null;
        }
        return this.accounts().find((account) => account.id === this.form.accountId) ?? null;
    }
    relatedOpportunitiesSorted() {
        return [...this.relatedOpportunities()].sort((a, b) => (a.createdAtUtc ?? '').localeCompare(b.createdAtUtc ?? ''));
    }
    relatedAccountsSorted() {
        return [...this.relatedAccounts()].sort((a, b) => a.name.localeCompare(b.name));
    }
    relatedAccountRelation(account) {
        const currentId = this.form.accountId;
        const currentParent = this.linkedAccount()?.parentAccountId;
        if (!currentId)
            return 'Related';
        if (account.id === currentParent)
            return 'Parent';
        if (account.parentAccountId === currentId)
            return 'Child';
        if (currentParent && account.parentAccountId === currentParent)
            return 'Sibling';
        return 'Related';
    }
    opportunityCount() {
        return this.relatedOpportunities().length;
    }
    latestOpportunityCreatedAt() {
        const latest = this.relatedOpportunitiesSorted().slice(-1)[0];
        return latest?.createdAtUtc ?? null;
    }
    // C17: Tag autocomplete filtering
    onTagSearch(event) {
        const q = event.query.toLowerCase();
        this.tagSuggestions.set(this.allTags.filter(t => t.toLowerCase().includes(q) && !this.formTags.includes(t)));
    }
    // C18: Convert contact to opportunity
    convertToOpportunity() {
        this.converting.set(true);
        const params = {};
        if (this.form.accountId)
            params['accountId'] = this.form.accountId;
        if (this.editingId)
            params['contactId'] = this.editingId;
        this.router.navigate(['/app/deals/new'], { queryParams: params });
    }
    // C19: Load relationships
    loadRelationships() {
        if (!this.editingId)
            return;
        this.relationshipsLoading.set(true);
        this.contactData.getRelationships(this.editingId).subscribe({
            next: (rels) => {
                this.relationships.set(rels);
                this.relationshipsLoading.set(false);
            },
            error: () => {
                this.relationshipsLoading.set(false);
            }
        });
    }
    relationshipIcon(type) {
        switch (type) {
            case 'ReportsTo': return 'pi-arrow-up';
            case 'DirectReport': return 'pi-arrow-down';
            case 'SameAccount': return 'pi-building';
            default: return 'pi-link';
        }
    }
    loadDetailData() {
        if (!this.editingId) {
            return;
        }
        // C19: Load relationships
        this.loadRelationships();
        this.timelineLoading.set(true);
        this.activityData
            .search({
            relatedEntityType: 'Contact',
            relatedEntityId: this.editingId,
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
            relatedEntityType: 'Contact',
            relatedEntityId: this.editingId,
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
        if (this.form.accountId) {
            this.opportunityData.search({ accountId: this.form.accountId, page: 1, pageSize: 20 }).subscribe({
                next: (res) => this.relatedOpportunities.set(res.items),
                error: () => this.raiseToast('error', 'Unable to load opportunities.')
            });
            this.customerData.getRelatedAccounts(this.form.accountId).subscribe({
                next: (res) => this.relatedAccounts.set(res),
                error: () => this.raiseToast('error', 'Unable to load related accounts.')
            });
            this.accountHistoryLoading.set(true);
            this.activityData
                .search({
                relatedEntityType: 'Account',
                relatedEntityId: this.form.accountId,
                page: 1,
                pageSize: 20
            })
                .subscribe({
                next: (res) => {
                    const ordered = [...res.items].sort((a, b) => (b.createdAtUtc ?? '').localeCompare(a.createdAtUtc ?? ''));
                    this.accountHistory.set(ordered);
                    this.accountHistoryLoading.set(false);
                },
                error: () => {
                    this.accountHistoryLoading.set(false);
                    this.raiseToast('error', 'Unable to load account history.');
                }
            });
        }
        this.attachmentData.list('Contact', this.editingId).subscribe({
            next: (items) => this.attachments.set(items),
            error: () => this.raiseToast('error', 'Unable to load attachments.')
        });
        this.propertyData.search({ contactId: this.editingId, page: 1, pageSize: 20 }).subscribe({
            next: (res) => this.relatedProperties.set(res.items),
            error: () => this.raiseToast('error', 'Unable to load related properties.')
        });
    }
    static ɵfac = function ContactFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ContactFormPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ContactFormPage, selectors: [["app-contact-form-page"]], hostBindings: function ContactFormPage_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("input", function ContactFormPage_input_HostBindingHandler() { return ctx.onCollaborativeEditingActivity(); })("change", function ContactFormPage_change_HostBindingHandler() { return ctx.onCollaborativeEditingActivity(); })("beforeunload", function ContactFormPage_beforeunload_HostBindingHandler($event) { return ctx.onBeforeUnload($event); }, i0.ɵɵresolveWindow);
        } }, decls: 210, vars: 103, consts: [["noContactPromptDrafts", ""], ["accountSummaryEmpty", ""], ["timelineLoadingTpl", ""], ["notesEmpty", ""], ["accountEmpty", ""], ["accountHistoryLoadingTpl", ""], [1, "contact-form-page"], ["header", "Saved drafts available", "styleClass", "form-draft-prompt-dialog", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "form-draft-prompt"], [1, "form-draft-prompt__hero"], [1, "form-draft-prompt__icon"], [1, "pi", "pi-bookmark"], ["class", "form-draft-list", 4, "ngIf", "ngIfElse"], [1, "lead-status-dialog__actions"], ["pButton", "", "type", "button", "label", "Start fresh", 1, "p-button-outlined", 3, "click"], ["pButton", "", "type", "button", "label", "View all drafts", 1, "crm-button", "crm-button--primary", 3, "click"], ["header", "Open saved draft?", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "form-draft-dialog"], ["pButton", "", "type", "button", "label", "Cancel", 1, "p-button-outlined", 3, "click"], ["pButton", "", "type", "button", "label", "Open Draft", 1, "crm-button", "crm-button--primary", 3, "click"], ["header", "Unsaved contact changes", "styleClass", "form-leave-dialog", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "form-leave-dialog__body"], [1, "form-leave-dialog__hero"], [1, "form-leave-dialog__icon"], [1, "pi", "pi-exclamation-circle"], [1, "form-leave-dialog__actions"], ["pButton", "", "type", "button", "label", "Stay on form", 1, "p-button-outlined", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Leave without saving", 1, "p-button-outlined", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Save to draft", 1, "crm-button", "crm-button--secondary", 3, "click", "loading", "disabled"], ["pButton", "", "type", "button", 1, "crm-button", "crm-button--primary", 3, "click", "label", "loading", "disabled"], ["header", "Saved contact drafts", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], ["class", "form-draft-dialog__empty", 4, "ngIf"], ["class", "form-draft-list", 4, "ngIf"], [1, "page-header"], [1, "header-content"], ["pButton", "", "type", "button", "routerLink", "/app/contacts", 1, "back-link", "p-button-text"], [1, "pi", "pi-arrow-left"], [1, "header-title"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], ["class", "form-draft-status", 4, "ngIf"], ["class", "form-draft-banner", 4, "ngIf"], ["class", "presence-focus", 4, "ngIf"], ["class", "presence-editing-note", 4, "ngIf"], [1, "form-container"], [1, "contact-form", 3, "ngSubmit"], ["class", "related-summary-strip", 4, "ngIf"], [1, "form-section"], [1, "section-title"], [1, "pi", "pi-user"], [1, "form-grid"], [1, "form-field"], ["for", "contact-firstName"], [1, "required"], [1, "icon-addon", "icon-addon--name"], ["pInputText", "", "id", "contact-firstName", "name", "firstName", "required", "", "placeholder", "First name", 3, "ngModelChange", "ngModel"], ["class", "field-error", 4, "ngIf"], ["for", "contact-lastName"], ["pInputText", "", "id", "contact-lastName", "name", "lastName", "required", "", "placeholder", "Last name", 3, "ngModelChange", "ngModel"], ["for", "contact-email"], [1, "icon-addon", "icon-addon--email"], [1, "pi", "pi-envelope"], ["pInputText", "", "id", "contact-email", "name", "email", "type", "email", "placeholder", "name@company.com", 3, "ngModelChange", "ngModel"], ["class", "field-link", "href", "", 3, "click", 4, "ngIf"], ["for", "contact-jobTitle"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-id-card"], ["pInputText", "", "id", "contact-jobTitle", "name", "jobTitle", "placeholder", "Role or title", 3, "ngModelChange", "ngModel"], ["for", "contact-buyingRole"], ["id", "contact-buyingRole", "optionLabel", "label", "optionValue", "value", "name", "buyingRole", "placeholder", "Select buying role", "styleClass", "w-full", "appendTo", "body", 3, "ngModelChange", "options", "ngModel"], ["for", "contact-phone"], [1, "icon-addon", "icon-addon--phone"], [1, "pi", "pi-phone"], ["pInputText", "", "id", "contact-phone", "name", "phone", "placeholder", "+1 555-0101", 3, "ngModelChange", "ngModel"], ["class", "field-link", 3, "href", 4, "ngIf"], ["for", "contact-mobile"], ["pInputText", "", "id", "contact-mobile", "name", "mobile", "placeholder", "+1 555-0102", 3, "ngModelChange", "ngModel"], [1, "form-field", "full-row"], ["for", "contact-tags"], ["id", "contact-tags", "placeholder", "Add tags...", "styleClass", "w-full", 3, "ngModelChange", "completeMethod", "ngModel", "ngModelOptions", "suggestions", "multiple"], [1, "pi", "pi-building"], ["for", "contact-accountId"], ["id", "contact-accountId", "optionLabel", "label", "optionValue", "value", "name", "accountId", "placeholder", "Link to customer", "styleClass", "w-full", "appendTo", "body", 3, "ngModelChange", "options", "ngModel"], ["for", "contact-lifecycleStage"], ["id", "contact-lifecycleStage", "optionLabel", "label", "optionValue", "value", "name", "lifecycleStage", "placeholder", "Select lifecycle", "styleClass", "w-full", "appendTo", "body", 3, "ngModelChange", "options", "ngModel"], ["for", "contact-activityScore"], ["id", "contact-activityScore", "name", "activityScore", 1, "w-full", 3, "ngModelChange", "ngModel", "min", "max"], ["for", "contact-reportsTo"], ["id", "contact-reportsTo", "optionLabel", "label", "optionValue", "value", "name", "reportsToId", "placeholder", "Select manager", "styleClass", "w-full", "appendTo", "body", 3, "ngModelChange", "options", "ngModel", "showClear"], ["for", "contact-linkedInProfile"], [1, "icon-addon", "icon-addon--website"], [1, "pi", "pi-link"], ["pInputText", "", "id", "contact-linkedInProfile", "name", "linkedInProfile", "placeholder", "https://linkedin.com/in/...", 3, "ngModelChange", "ngModel"], ["class", "field-link", "target", "_blank", "rel", "noopener noreferrer", 3, "href", 4, "ngIf"], [1, "pi", "pi-map-marker"], ["for", "contact-street"], [1, "icon-addon", "icon-addon--address"], [1, "pi", "pi-map"], ["pInputText", "", "id", "contact-street", "name", "street", "placeholder", "123 Main Street", 3, "ngModelChange", "ngModel"], ["for", "contact-city"], ["pInputText", "", "id", "contact-city", "name", "city", "placeholder", "City", 3, "ngModelChange", "ngModel"], ["for", "contact-state"], ["pInputText", "", "id", "contact-state", "name", "state", "placeholder", "State / Province", 3, "ngModelChange", "ngModel"], ["for", "contact-postalCode"], [1, "pi", "pi-hashtag"], ["pInputText", "", "id", "contact-postalCode", "name", "postalCode", "placeholder", "12345", 3, "ngModelChange", "ngModel"], ["for", "contact-country"], [1, "icon-addon", "icon-addon--company"], [1, "pi", "pi-globe"], ["pInputText", "", "id", "contact-country", "name", "country", "placeholder", "Country", 3, "ngModelChange", "ngModel"], [1, "form-actions"], ["type", "button", "pButton", "", "label", "Cancel", 1, "crm-button", "crm-button--ghost", 3, "click"], ["type", "button", "pButton", "", "label", "Convert to opportunity", "icon", "pi pi-chart-line", "class", "crm-button crm-button--secondary", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "pButton", "", "icon", "pi pi-check", 1, "crm-button", "crm-button--primary", 3, "click", "label", "disabled"], ["icon", "pi pi-bookmark", "styleClass", "crm-draft-splitbutton", "buttonStyleClass", "crm-button crm-button--secondary", "menuButtonStyleClass", "crm-button crm-button--secondary", "appendTo", "body", 3, "onClick", "label", "disabled", "model"], ["class", "form-container detail-container", 4, "ngIf"], ["header", "Possible Duplicates Found", 3, "visibleChange", "visible", "modal", "closable"], [1, "duplicate-note"], [1, "duplicate-list"], ["class", "duplicate-item", 4, "ngFor", "ngForOf"], ["pTemplate", "footer"], [1, "form-draft-list"], ["class", "form-draft-list__item", 4, "ngFor", "ngForOf"], [1, "form-draft-list__item"], [1, "form-draft-list__title"], [1, "form-draft-list__meta"], [1, "form-draft-list__actions"], ["type", "button", 1, "form-draft-list__resume", 3, "click"], [1, "form-draft-dialog__empty"], ["type", "button", 1, "form-draft-list__discard", 3, "click"], [1, "form-draft-status"], [1, "form-draft-banner"], [1, "pi", "pi-info-circle"], [1, "presence-focus"], [1, "pi", "pi-eye"], [1, "presence-editing-note"], [1, "pi", "pi-pencil"], [1, "related-summary-strip"], ["class", "summary-chip", 4, "ngIf", "ngIfElse"], [1, "summary-chip"], [1, "chip-label"], [1, "chip-value"], ["class", "chip-meta", 4, "ngIf"], [1, "chip-meta"], [1, "field-error"], ["href", "", 1, "field-link", 3, "click"], [1, "pi", "pi-external-link"], [1, "field-link", 3, "href"], ["target", "_blank", "rel", "noopener noreferrer", 1, "field-link", 3, "href"], ["type", "button", "pButton", "", "label", "Convert to opportunity", "icon", "pi pi-chart-line", 1, "crm-button", "crm-button--secondary", 3, "click", "disabled"], [1, "form-container", "detail-container"], [1, "lifecycle-stepper"], [1, "stepper-track"], ["class", "stepper-step", 3, "active", "completed", 4, "ngFor", "ngForOf"], ["class", "stepper-meta", 4, "ngIf"], [1, "engagement-breakdown"], [1, "engagement-header"], [1, "engagement-title"], [1, "pi", "pi-chart-bar"], [1, "engagement-total"], [1, "engagement-bars"], ["class", "engagement-bar", 4, "ngFor", "ngForOf"], [1, "pi", "pi-address-book"], ["value", "timeline"], ["class", "tab-badge", 4, "ngIf"], ["value", "notes"], ["value", "related"], ["value", "attachments"], ["value", "emails"], ["value", "relationships"], ["class", "timeline", 4, "ngIf", "ngIfElse"], [1, "notes"], [1, "note-editor"], ["pTextarea", "", "rows", "4", "placeholder", "Add a note about this contact...", 1, "w-full", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "note-actions"], ["pButton", "", "type", "button", "label", "Add note", "icon", "pi pi-plus", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], ["class", "note-list", 4, "ngIf", "ngIfElse"], [1, "related-grid"], [1, "related-section"], ["class", "account-card clickable-row", 3, "routerLink", 4, "ngIf", "ngIfElse"], ["styleClass", "compact-table", 3, "value", "paginator", "rows"], ["pTemplate", "header"], ["pTemplate", "body"], ["class", "empty-state", 4, "ngIf"], [1, "attachments"], ["mode", "basic", "chooseLabel", "Upload file", 3, "uploadHandler", "customUpload", "auto"], [1, "emails-section"], [1, "empty-state"], ["class", "empty-hint", 4, "ngIf"], [1, "relationships-section"], ["class", "relationships-loading", 4, "ngIf"], ["class", "relationship-list", 4, "ngIf"], [1, "stepper-step"], [1, "step-indicator"], [1, "step-dot"], [1, "pi", 3, "ngClass"], ["class", "step-connector", 4, "ngIf"], [1, "step-label"], [1, "step-connector"], [1, "stepper-meta"], [1, "pi", "pi-clock"], [1, "engagement-bar"], [1, "bar-header"], [1, "bar-label"], [1, "bar-value"], [1, "bar-track"], [1, "bar-fill"], [1, "tab-badge"], [1, "timeline"], ["class", "timeline-item lifecycle-event", 4, "ngIf"], ["class", "timeline-item", 4, "ngFor", "ngForOf"], [1, "timeline-item", "lifecycle-event"], [1, "timeline-type"], ["data-type", "lifecycle", 1, "type-dot"], [1, "timeline-body"], [1, "timeline-title"], [1, "timeline-meta"], [4, "ngIf"], [1, "timeline-item"], [1, "type-dot"], ["class", "timeline-description", 4, "ngIf"], [1, "timeline-description"], ["routerLink", "/app/activities", 1, "empty-state-link"], [1, "note-list"], ["class", "note-item", 4, "ngFor", "ngForOf"], [1, "note-item"], [1, "note-header"], [1, "note-title"], [1, "note-meta"], [1, "note-body"], [1, "pi", "pi-file-edit"], [1, "account-card", "clickable-row", 3, "routerLink"], [1, "account-name", "related-link"], [1, "account-meta"], [1, "clickable-row", 3, "routerLink"], [1, "related-link"], ["severity", "info", 3, "value"], [1, "pi", "pi-chart-line"], ["routerLink", "/app/deals/new", 1, "empty-state-link"], [1, "pi", "pi-home"], ["routerLink", "/app/properties/new", 1, "empty-state-link"], [1, "table-actions"], ["pButton", "", "type", "button", "icon", "pi pi-download", 1, "icon-btn", 3, "click"], [1, "pi", "pi-paperclip"], [1, "empty-hint"], [1, "relationships-loading"], [1, "pi", "pi-spin", "pi-spinner"], [1, "pi", "pi-users"], [1, "relationship-list"], ["class", "relationship-item", 4, "ngFor", "ngForOf"], [1, "relationship-item"], [1, "relationship-icon"], [1, "relationship-info"], [1, "relationship-name"], [1, "relationship-type"], ["class", "relationship-detail", 4, "ngIf"], [1, "relationship-detail"], [1, "duplicate-item"], [1, "duplicate-info"], ["class", "duplicate-email", 4, "ngIf"], ["class", "duplicate-phone", 4, "ngIf"], [1, "duplicate-score"], [1, "duplicate-email"], [1, "duplicate-phone"], ["type", "button", "pButton", "", "label", "Save Anyway", 1, "crm-button", "crm-button--primary", 3, "click"]], template: function ContactFormPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 6);
            i0.ɵɵelement(1, "app-breadcrumbs");
            i0.ɵɵelementStart(2, "p-dialog", 7);
            i0.ɵɵlistener("visibleChange", function ContactFormPage_Template_p_dialog_visibleChange_2_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.draftPromptVisible.set($event)); })("onHide", function ContactFormPage_Template_p_dialog_onHide_2_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.dismissDraftPrompt()); });
            i0.ɵɵelementStart(3, "div", 8)(4, "div", 9)(5, "div", 10);
            i0.ɵɵelement(6, "i", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div")(8, "h3");
            i0.ɵɵtext(9, "Resume a saved contact draft?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p");
            i0.ɵɵtext(11, "You have saved contact drafts. Choose one to continue where you left off, or start with a blank form.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(12, ContactFormPage_div_12_Template, 2, 1, "div", 12)(13, ContactFormPage_ng_template_13_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(15, "div", 13)(16, "button", 14);
            i0.ɵɵlistener("click", function ContactFormPage_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.dismissDraftPrompt()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "button", 15);
            i0.ɵɵlistener("click", function ContactFormPage_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r1); ctx.dismissDraftPrompt(); return i0.ɵɵresetView(ctx.openDraftLibrary()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(18, "p-dialog", 16);
            i0.ɵɵlistener("visibleChange", function ContactFormPage_Template_p_dialog_visibleChange_18_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.draftOpenConfirmVisible.set($event)); })("onHide", function ContactFormPage_Template_p_dialog_onHide_18_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelOpenDraft()); });
            i0.ɵɵelementStart(19, "div", 17)(20, "p");
            i0.ɵɵtext(21, "Your current unsaved changes will be replaced by the selected draft.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 13)(23, "button", 18);
            i0.ɵɵlistener("click", function ContactFormPage_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelOpenDraft()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "button", 19);
            i0.ɵɵlistener("click", function ContactFormPage_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.confirmOpenDraft()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(25, "p-dialog", 20);
            i0.ɵɵlistener("visibleChange", function ContactFormPage_Template_p_dialog_visibleChange_25_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.leavePromptVisible.set($event)); })("onHide", function ContactFormPage_Template_p_dialog_onHide_25_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.stayOnForm()); });
            i0.ɵɵelementStart(26, "div", 21)(27, "div", 22)(28, "div", 23);
            i0.ɵɵelement(29, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div")(31, "h3");
            i0.ɵɵtext(32, "Your contact form has unsaved changes.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "p");
            i0.ɵɵtext(34, "Choose whether to save the current state as a draft, submit the contact now, or leave without saving.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(35, "div", 25)(36, "button", 26);
            i0.ɵɵlistener("click", function ContactFormPage_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.stayOnForm()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "button", 27);
            i0.ɵɵlistener("click", function ContactFormPage_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.leaveWithoutSaving()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "button", 28);
            i0.ɵɵlistener("click", function ContactFormPage_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.saveDraftAndLeave()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "button", 29);
            i0.ɵɵlistener("click", function ContactFormPage_Template_button_click_39_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.submitAndLeave()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(40, "p-dialog", 30);
            i0.ɵɵlistener("visibleChange", function ContactFormPage_Template_p_dialog_visibleChange_40_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.draftLibraryVisible.set($event)); })("onHide", function ContactFormPage_Template_p_dialog_onHide_40_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeDraftLibrary()); });
            i0.ɵɵelementStart(41, "div", 17);
            i0.ɵɵtemplate(42, ContactFormPage_p_42_Template, 2, 0, "p", 31)(43, ContactFormPage_div_43_Template, 2, 1, "div", 32);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(44, "header", 33)(45, "div", 34)(46, "button", 35);
            i0.ɵɵelement(47, "i", 36);
            i0.ɵɵelementStart(48, "span");
            i0.ɵɵtext(49, "Back to contacts");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 37)(51, "h1", 38)(52, "span", 39);
            i0.ɵɵtext(53);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "span", 40);
            i0.ɵɵtext(55, "Contact");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "p");
            i0.ɵɵtext(57);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(58, ContactFormPage_div_58_Template, 4, 1, "div", 41)(59, ContactFormPage_div_59_Template, 4, 0, "div", 42)(60, ContactFormPage_div_60_Template, 4, 1, "div", 43)(61, ContactFormPage_div_61_Template, 4, 1, "div", 44);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(62, "main", 45)(63, "form", 46);
            i0.ɵɵlistener("ngSubmit", function ContactFormPage_Template_form_ngSubmit_63_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSave()); });
            i0.ɵɵtemplate(64, ContactFormPage_section_64_Template, 10, 4, "section", 47);
            i0.ɵɵelementStart(65, "section", 48)(66, "h2", 49);
            i0.ɵɵelement(67, "i", 50);
            i0.ɵɵtext(68, " Contact details ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(69, "div", 51)(70, "div", 52)(71, "label", 53);
            i0.ɵɵtext(72, "First name ");
            i0.ɵɵelementStart(73, "span", 54);
            i0.ɵɵtext(74, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(75, "p-inputgroup")(76, "p-inputgroup-addon", 55);
            i0.ɵɵelement(77, "i", 50);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "input", 56);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_input_ngModelChange_78_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.firstName, $event) || (ctx.form.firstName = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(79, ContactFormPage_p_79_Template, 2, 1, "p", 57);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "div", 52)(81, "label", 58);
            i0.ɵɵtext(82, "Last name ");
            i0.ɵɵelementStart(83, "span", 54);
            i0.ɵɵtext(84, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(85, "p-inputgroup")(86, "p-inputgroup-addon", 55);
            i0.ɵɵelement(87, "i", 50);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "input", 59);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_input_ngModelChange_88_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.lastName, $event) || (ctx.form.lastName = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(89, ContactFormPage_p_89_Template, 2, 1, "p", 57);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "div", 52)(91, "label", 60);
            i0.ɵɵtext(92, "Email");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(93, "p-inputgroup")(94, "p-inputgroup-addon", 61);
            i0.ɵɵelement(95, "i", 62);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "input", 63);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_input_ngModelChange_96_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.email, $event) || (ctx.form.email = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(97, ContactFormPage_a_97_Template, 3, 0, "a", 64);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(98, "div", 52)(99, "label", 65);
            i0.ɵɵtext(100, "Job title");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "p-inputgroup")(102, "p-inputgroup-addon", 66);
            i0.ɵɵelement(103, "i", 67);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(104, "input", 68);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_input_ngModelChange_104_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.jobTitle, $event) || (ctx.form.jobTitle = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(105, "div", 52)(106, "label", 69);
            i0.ɵɵtext(107, "Buying role");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(108, "p-select", 70);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_p_select_ngModelChange_108_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.buyingRole, $event) || (ctx.form.buyingRole = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(109, "div", 52)(110, "label", 71);
            i0.ɵɵtext(111, "Phone");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(112, "p-inputgroup")(113, "p-inputgroup-addon", 72);
            i0.ɵɵelement(114, "i", 73);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(115, "input", 74);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_input_ngModelChange_115_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.phone, $event) || (ctx.form.phone = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(116, ContactFormPage_a_116_Template, 3, 1, "a", 75);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(117, "div", 52)(118, "label", 76);
            i0.ɵɵtext(119, "Mobile");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(120, "p-inputgroup")(121, "p-inputgroup-addon", 72);
            i0.ɵɵelement(122, "i", 73);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(123, "input", 77);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_input_ngModelChange_123_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.mobile, $event) || (ctx.form.mobile = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(124, ContactFormPage_a_124_Template, 3, 1, "a", 75);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "div", 78)(126, "label", 79);
            i0.ɵɵtext(127, "Tags");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(128, "p-autoComplete", 80);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_p_autoComplete_ngModelChange_128_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.formTags, $event) || (ctx.formTags = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("completeMethod", function ContactFormPage_Template_p_autoComplete_completeMethod_128_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTagSearch($event)); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(129, "section", 48)(130, "h2", 49);
            i0.ɵɵelement(131, "i", 81);
            i0.ɵɵtext(132, " Customer context ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(133, "div", 51)(134, "div", 52)(135, "label", 82);
            i0.ɵɵtext(136, "Customer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(137, "p-select", 83);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_p_select_ngModelChange_137_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.accountId, $event) || (ctx.form.accountId = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(138, "div", 52)(139, "label", 84);
            i0.ɵɵtext(140, "Lifecycle");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(141, "p-select", 85);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_p_select_ngModelChange_141_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.lifecycleStage, $event) || (ctx.form.lifecycleStage = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(142, "div", 52)(143, "label", 86);
            i0.ɵɵtext(144, "Activity score");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(145, "p-inputNumber", 87);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_p_inputNumber_ngModelChange_145_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.activityScore, $event) || (ctx.form.activityScore = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(146, "div", 52)(147, "label", 88);
            i0.ɵɵtext(148, "Reports to");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(149, "p-select", 89);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_p_select_ngModelChange_149_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.reportsToId, $event) || (ctx.form.reportsToId = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(150, "div", 52)(151, "label", 90);
            i0.ɵɵtext(152, "LinkedIn");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(153, "p-inputgroup")(154, "p-inputgroup-addon", 91);
            i0.ɵɵelement(155, "i", 92);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(156, "input", 93);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_input_ngModelChange_156_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.linkedInProfile, $event) || (ctx.form.linkedInProfile = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(157, ContactFormPage_a_157_Template, 3, 1, "a", 94);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(158, "section", 48)(159, "h2", 49);
            i0.ɵɵelement(160, "i", 95);
            i0.ɵɵtext(161, " Address ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(162, "div", 51)(163, "div", 78)(164, "label", 96);
            i0.ɵɵtext(165, "Street");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(166, "p-inputgroup")(167, "p-inputgroup-addon", 97);
            i0.ɵɵelement(168, "i", 98);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(169, "input", 99);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_input_ngModelChange_169_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.street, $event) || (ctx.form.street = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(170, "div", 52)(171, "label", 100);
            i0.ɵɵtext(172, "City");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(173, "p-inputgroup")(174, "p-inputgroup-addon", 97);
            i0.ɵɵelement(175, "i", 81);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(176, "input", 101);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_input_ngModelChange_176_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.city, $event) || (ctx.form.city = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(177, "div", 52)(178, "label", 102);
            i0.ɵɵtext(179, "State");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(180, "p-inputgroup")(181, "p-inputgroup-addon", 66);
            i0.ɵɵelement(182, "i", 95);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(183, "input", 103);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_input_ngModelChange_183_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.state, $event) || (ctx.form.state = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(184, "div", 52)(185, "label", 104);
            i0.ɵɵtext(186, "Postal code");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(187, "p-inputgroup")(188, "p-inputgroup-addon", 66);
            i0.ɵɵelement(189, "i", 105);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(190, "input", 106);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_input_ngModelChange_190_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.postalCode, $event) || (ctx.form.postalCode = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(191, "div", 52)(192, "label", 107);
            i0.ɵɵtext(193, "Country");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(194, "p-inputgroup")(195, "p-inputgroup-addon", 108);
            i0.ɵɵelement(196, "i", 109);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(197, "input", 110);
            i0.ɵɵtwoWayListener("ngModelChange", function ContactFormPage_Template_input_ngModelChange_197_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.country, $event) || (ctx.form.country = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(198, "footer", 111)(199, "button", 112);
            i0.ɵɵlistener("click", function ContactFormPage_Template_button_click_199_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.router.navigate(["/app/contacts"])); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(200, ContactFormPage_button_200_Template, 1, 1, "button", 113);
            i0.ɵɵelementStart(201, "button", 114);
            i0.ɵɵlistener("click", function ContactFormPage_Template_button_click_201_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSave()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(202, "p-splitbutton", 115);
            i0.ɵɵlistener("onClick", function ContactFormPage_Template_p_splitbutton_onClick_202_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.saveDraft()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(203, ContactFormPage_section_203_Template, 109, 43, "section", 116);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(204, "p-dialog", 117);
            i0.ɵɵtwoWayListener("visibleChange", function ContactFormPage_Template_p_dialog_visibleChange_204_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.duplicateDialogVisible, $event) || (ctx.duplicateDialogVisible = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementStart(205, "p", 118);
            i0.ɵɵtext(206, "The following contacts look similar. Do you still want to save?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(207, "div", 119);
            i0.ɵɵtemplate(208, ContactFormPage_div_208_Template, 8, 4, "div", 120);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(209, ContactFormPage_ng_template_209_Template, 2, 0, "ng-template", 121);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const noContactPromptDrafts_r30 = i0.ɵɵreference(14);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(97, _c0));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.draftPromptVisible());
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", ctx.recentDrafts().length)("ngIfElse", noContactPromptDrafts_r30);
            i0.ɵɵadvance(6);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(98, _c1));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.draftOpenConfirmVisible());
            i0.ɵɵadvance(7);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(99, _c2));
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
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(100, _c3));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.draftLibraryVisible());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.draftLibraryLoading() && !ctx.draftLibraryItems().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.draftLibraryItems().length);
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Edit" : "Create New");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Update stakeholder details" : "Add a new person to your customer team");
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
            i0.ɵɵadvance(14);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.firstName);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.firstNameError());
            i0.ɵɵadvance(9);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.lastName);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.lastNameError());
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.email);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode() && ctx.form.email);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.jobTitle);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.buyingRoleOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.buyingRole);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.phone);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode() && ctx.form.phone);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.mobile);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode() && ctx.form.mobile);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.formTags);
            i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(101, _c4))("suggestions", ctx.tagSuggestions())("multiple", true);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("options", ctx.accountOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.accountId);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.lifecycleOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.lifecycleStage);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.activityScore);
            i0.ɵɵproperty("min", 0)("max", 100);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.reportsToOptions());
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.reportsToId);
            i0.ɵɵproperty("showClear", true);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.linkedInProfile);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode() && ctx.form.linkedInProfile);
            i0.ɵɵadvance(12);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.street);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.city);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.state);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.postalCode);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.country);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("label", ctx.primarySaveLabel())("disabled", ctx.saving() || ctx.draftSaving());
            i0.ɵɵadvance();
            i0.ɵɵproperty("label", ctx.draftButtonLabel())("disabled", ctx.saving() || ctx.draftSaving())("model", ctx.draftSplitButtonItems());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(102, _c5));
            i0.ɵɵtwoWayProperty("visible", ctx.duplicateDialogVisible);
            i0.ɵɵproperty("modal", true)("closable", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.duplicates());
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, FormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.RequiredValidator, i2.NgModel, i2.NgForm, RouterLink,
            ButtonModule, i3.ButtonDirective, i4.PrimeTemplate, InputTextModule, i5.InputText, SelectModule, i6.Select, InputNumberModule, i7.InputNumber, InputGroupModule, i8.InputGroup, InputGroupAddonModule, i9.InputGroupAddon, TextareaModule, i10.Textarea, TabsModule, i11.Tabs, i11.TabPanels, i11.TabPanel, i11.TabList, i11.Tab, TableModule, i12.Table, TagModule, i13.Tag, FileUploadModule, i14.FileUpload, AutoCompleteModule, i15.AutoComplete, DialogModule, i16.Dialog, SplitButtonModule, i17.SplitButton, BreadcrumbsComponent, i1.DecimalPipe, i1.CurrencyPipe, i1.DatePipe], styles: ["\n\n\n\n\n\n    [_nghost-%COMP%] {\n      \n\n      --apple-blue: 0, 122, 255;\n      --apple-purple: 175, 82, 222;\n      --apple-pink: 255, 45, 85;\n      --apple-teal: 90, 200, 250;\n      --apple-green: 52, 199, 89;\n      --apple-gray-1: 142, 142, 147;\n      --apple-gray-2: 174, 174, 178;\n      --apple-gray-3: 199, 199, 204;\n      --apple-gray-4: 209, 209, 214;\n      --apple-gray-5: 229, 229, 234;\n      --apple-gray-6: 242, 242, 247;\n      --apple-label: 0, 0, 0;\n      --apple-secondary: 60, 60, 67;\n      --apple-tertiary: 60, 60, 67;\n      --apple-fill: 120, 120, 128;\n      \n      \n\n      --gradient-start: rgba(var(--apple-blue), 0.6);\n      --gradient-mid: rgba(var(--apple-purple), 0.4);\n      --gradient-end: rgba(var(--apple-teal), 0.5);\n    }\n\n    .contact-form-page[_ngcontent-%COMP%] {\n      min-height: 100vh;\n      position: relative;\n      \n\n      background: \n        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(var(--apple-blue), 0.08) 0%, transparent 50%),\n        radial-gradient(ellipse 60% 40% at 90% 10%, rgba(var(--apple-purple), 0.06) 0%, transparent 40%),\n        radial-gradient(ellipse 50% 30% at 10% 60%, rgba(var(--apple-teal), 0.05) 0%, transparent 40%),\n        linear-gradient(180deg, \n          rgba(var(--apple-gray-6), 0.95) 0%, \n          rgba(255, 255, 255, 1) 40%,\n          rgba(var(--apple-gray-6), 0.3) 100%);\n      padding-bottom: 5rem;\n    }\n\n    \n\n    .contact-form-page[_ngcontent-%COMP%]::before {\n      content: '';\n      position: fixed;\n      top: -15%;\n      left: -5%;\n      width: 50%;\n      height: 50%;\n      background: radial-gradient(\n        circle,\n        rgba(var(--apple-blue), 0.08) 0%,\n        rgba(var(--apple-blue), 0.03) 30%,\n        transparent 60%\n      );\n      pointer-events: none;\n      z-index: 0;\n      animation: _ngcontent-%COMP%_float-orb-1 18s ease-in-out infinite;\n    }\n\n    .contact-form-page[_ngcontent-%COMP%]::after {\n      content: '';\n      position: fixed;\n      bottom: -20%;\n      right: -10%;\n      width: 60%;\n      height: 60%;\n      background: radial-gradient(\n        circle,\n        rgba(var(--apple-purple), 0.07) 0%,\n        rgba(var(--apple-teal), 0.03) 35%,\n        transparent 60%\n      );\n      pointer-events: none;\n      z-index: 0;\n      animation: _ngcontent-%COMP%_float-orb-2 22s ease-in-out infinite;\n    }\n\n    @keyframes _ngcontent-%COMP%_float-orb-1 {\n      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }\n      25% { transform: translate(30px, -20px) scale(1.05); opacity: 1; }\n      50% { transform: translate(15px, -40px) scale(1.02); opacity: 0.9; }\n      75% { transform: translate(-10px, -15px) scale(1.08); opacity: 1; }\n    }\n\n    @keyframes _ngcontent-%COMP%_float-orb-2 {\n      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }\n      33% { transform: translate(-25px, 25px) scale(1.06); opacity: 1; }\n      66% { transform: translate(15px, 10px) scale(0.98); opacity: 0.85; }\n    }\n\n    \n\n\n\n\n    .page-header[_ngcontent-%COMP%] {\n      position: sticky;\n      top: 0;\n      z-index: 100;\n      \n\n      background: rgba(255, 255, 255, 0.65);\n      backdrop-filter: blur(40px) saturate(200%);\n      -webkit-backdrop-filter: blur(40px) saturate(200%);\n      \n\n      border-bottom: 1px solid transparent;\n      background-image: \n        linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)),\n        linear-gradient(90deg, rgba(var(--apple-gray-4), 0.3), rgba(var(--apple-gray-3), 0.2), rgba(var(--apple-gray-4), 0.3));\n      background-origin: border-box;\n      background-clip: padding-box, border-box;\n      padding: 1rem 1.5rem;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);\n    }\n\n    .header-content[_ngcontent-%COMP%] {\n      width: 100%;\n      max-width: 1600px;\n      margin: 0 auto;\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .back-link[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.375rem;\n      padding: 0.375rem 0.625rem 0.375rem 0.375rem;\n      margin-left: -0.375rem;\n      border: none;\n      background: transparent;\n      color: rgba(var(--apple-blue), 1);\n      font-size: 0.9375rem;\n      font-weight: 500;\n      letter-spacing: -0.01em;\n      border-radius: 8px;\n      cursor: pointer;\n      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    }\n\n    .back-link[_ngcontent-%COMP%]:hover {\n      background: rgba(var(--apple-blue), 0.1);\n      transform: translateX(-2px);\n    }\n\n    .back-link[_ngcontent-%COMP%]:active {\n      background: rgba(var(--apple-blue), 0.15);\n      transform: scale(0.97);\n    }\n\n    .back-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      font-size: 1rem;\n      transition: transform 0.2s ease;\n    }\n\n    .back-link[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n      transform: translateX(-3px);\n    }\n\n    .header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n      margin: 0 0 0.25rem;\n    }\n\n    .header-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n      color: #6b7280;\n      font-size: 1rem;\n      font-weight: 400;\n      max-width: 500px;\n      line-height: 1.6;\n      margin: 0;\n    }\n\n    \n\n\n\n\n    .form-container[_ngcontent-%COMP%] {\n      position: relative;\n      z-index: 1;\n      width: 100%;\n      max-width: 1600px;\n      margin: 0 auto;\n      padding: 1.5rem;\n    }\n\n    .contact-form[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 1.25rem;\n    }\n\n    \n\n\n\n\n    .form-section[_ngcontent-%COMP%] {\n      position: relative;\n      \n\n      background: rgba(255, 255, 255, 0.55);\n      backdrop-filter: blur(40px) saturate(180%);\n      -webkit-backdrop-filter: blur(40px) saturate(180%);\n      border-radius: 20px;\n      padding: 1.75rem;\n      \n\n      border: 1px solid rgba(255, 255, 255, 0.6);\n      \n\n      box-shadow: \n        0 0 0 1px rgba(255, 255, 255, 0.8) inset,\n        0 1px 2px rgba(0, 0, 0, 0.02),\n        0 4px 12px rgba(0, 0, 0, 0.03),\n        0 16px 32px rgba(0, 0, 0, 0.04);\n      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n      overflow: hidden;\n    }\n\n    \n\n    .form-section[_ngcontent-%COMP%]::before {\n      content: '';\n      position: absolute;\n      inset: -1px;\n      border-radius: 21px;\n      padding: 1px;\n      background: linear-gradient(135deg, \n        transparent 0%,\n        transparent 100%);\n      -webkit-mask: \n        linear-gradient(#fff 0 0) content-box,\n        linear-gradient(#fff 0 0);\n      -webkit-mask-composite: xor;\n      mask-composite: exclude;\n      pointer-events: none;\n      opacity: 0;\n      transition: all 0.4s ease;\n    }\n\n    \n\n    .form-section[_ngcontent-%COMP%]::after {\n      content: '';\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      width: 120%;\n      height: 120%;\n      transform: translate(-50%, -50%);\n      background: radial-gradient(\n        ellipse at center,\n        rgba(var(--apple-blue), 0) 0%,\n        transparent 70%\n      );\n      pointer-events: none;\n      z-index: -1;\n      opacity: 0;\n      transition: all 0.4s ease;\n    }\n\n    .form-section[_ngcontent-%COMP%]:hover {\n      background: rgba(255, 255, 255, 0.72);\n      border-color: transparent;\n      transform: translateY(-3px) scale(1.005);\n      box-shadow: \n        0 0 0 1px rgba(255, 255, 255, 0.9) inset,\n        0 4px 8px rgba(0, 0, 0, 0.03),\n        0 8px 24px rgba(0, 0, 0, 0.06),\n        0 24px 48px rgba(var(--apple-blue), 0.08),\n        0 0 60px rgba(var(--apple-blue), 0.06);\n    }\n\n    .form-section[_ngcontent-%COMP%]:hover::before {\n      opacity: 1;\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.4) 0%,\n        rgba(var(--apple-purple), 0.3) 50%,\n        rgba(var(--apple-teal), 0.4) 100%);\n    }\n\n    .form-section[_ngcontent-%COMP%]:hover::after {\n      opacity: 1;\n      background: radial-gradient(\n        ellipse at center,\n        rgba(var(--apple-blue), 0.04) 0%,\n        transparent 70%\n      );\n    }\n\n    \n\n    .form-section[_ngcontent-%COMP%]:focus-within {\n      background: rgba(255, 255, 255, 0.78);\n      border-color: transparent;\n      transform: translateY(-2px);\n      box-shadow: \n        0 0 0 1px rgba(255, 255, 255, 1) inset,\n        0 4px 12px rgba(0, 0, 0, 0.04),\n        0 12px 32px rgba(var(--apple-blue), 0.1),\n        0 0 80px rgba(var(--apple-blue), 0.08);\n    }\n\n    .form-section[_ngcontent-%COMP%]:focus-within::before {\n      opacity: 1;\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.5) 0%,\n        rgba(var(--apple-purple), 0.35) 50%,\n        rgba(var(--apple-teal), 0.45) 100%);\n    }\n\n    .form-section[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%] {\n      color: #0891b2;\n      border-bottom-color: rgba(6, 182, 212, 0.35);\n    }\n\n    .form-section[_ngcontent-%COMP%]:hover   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(8, 145, 178, 0.16) 100%);\n      color: #0891b2;\n      transform: scale(1.05);\n      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);\n    }\n\n    \n\n\n\n\n    .section-title[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 1rem;\n      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n      font-size: 1rem;\n      font-weight: 600;\n      text-transform: none;\n      letter-spacing: -0.01em;\n      color: #0e7490;\n      margin: 0 0 1.5rem;\n      padding-bottom: 1rem;\n      border-bottom: 1px solid rgba(6, 182, 212, 0.2);\n      transition: all 0.3s ease;\n    }\n\n    .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      width: 42px;\n      height: 42px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(8, 145, 178, 0.1) 100%);\n      color: #06b6d4;\n      font-size: 1.25rem;\n      border-radius: 12px;\n      transition: all 0.3s ease;\n      box-shadow: 0 2px 8px rgba(6, 182, 212, 0.15);\n    }\n\n    \n\n\n\n\n    .form-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 1.25rem 1.125rem;\n    }\n\n    @media (min-width: 1320px) {\n      .form-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(3, minmax(0, 1fr));\n      }\n    }\n\n    .full-row[_ngcontent-%COMP%] {\n      grid-column: 1 / -1;\n    }\n\n    .form-field[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 0.35rem 0.45rem 0.45rem;\n      border-radius: 12px;\n      background: rgba(255, 255, 255, 0.35);\n      border: 1px solid transparent;\n      transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n      > label {\n        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n        font-size: 0.8125rem;\n        font-weight: 600;\n        color: #475569;\n        letter-spacing: 0.01em;\n        white-space: nowrap;\n        min-width: 110px;\n        flex-shrink: 0;\n        text-align: right;\n        transition: color 0.2s ease;\n      }\n\n      > p-inputgroup,\n      > p-select,\n      > p-inputnumber,\n      > p-datepicker,\n      > input,\n      > textarea {\n        flex: 1;\n        min-width: 0;\n      }\n\n      &:hover {\n        background: rgba(255, 255, 255, 0.5);\n        border-color: rgba(148, 163, 184, 0.16);\n        > label { color: #334155; }\n      }\n\n      &:focus-within {\n        background: rgba(255, 255, 255, 0.72);\n        border-color: rgba(var(--apple-blue), 0.22);\n        box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n        > label { color: #4f46e5; }\n      }\n\n      &.full-row {\n        flex-direction: column;\n        align-items: stretch;\n        > label { text-align: left; min-width: unset; }\n      }\n    }\n\n    .field-error[_ngcontent-%COMP%] {\n      margin: 0.35rem 0 0;\n      font-size: 0.75rem;\n      color: #b91c1c;\n    }\n\n    .field-link[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 4px;\n      font-size: 0.75rem;\n      color: #667eea;\n      text-decoration: none;\n      margin-top: 2px;\n      transition: color 200ms;\n\n      i { font-size: 0.65rem; }\n\n      &:hover {\n        color: #4f46e5;\n        text-decoration: underline;\n      }\n    }\n\n    .tab-badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      min-width: 18px;\n      height: 18px;\n      padding: 0 4px;\n      margin-left: 4px;\n      border-radius: 9px;\n      background: rgba(102, 126, 234, 0.15);\n      color: #667eea;\n      font-size: 0.7rem;\n      font-weight: 700;\n      line-height: 1;\n    }\n\n    .required[_ngcontent-%COMP%] {\n      color: rgba(var(--apple-pink), 1);\n      font-weight: 600;\n    }\n\n    .w-full[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n\n    \n\n\n\n\n    [_nghost-%COMP%]     .p-inputtext, \n   [_nghost-%COMP%]     .p-select, \n   [_nghost-%COMP%]     .p-inputnumber, \n   [_nghost-%COMP%]     .p-textarea {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;\n      color: #1e293b !important;\n      font-weight: 500 !important;\n      background: rgba(var(--apple-gray-6), 0.5) !important;\n      border: 1px solid rgba(var(--apple-gray-4), 0.4) !important;\n      border-radius: 12px !important;\n      font-size: 0.9375rem !important;\n      padding: 0.75rem 1rem !important;\n      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      box-shadow: \n        inset 0 1px 2px rgba(0, 0, 0, 0.02),\n        0 1px 2px rgba(255, 255, 255, 0.5) !important;\n    }\n\n    [_nghost-%COMP%]     .p-inputtext:hover, \n   [_nghost-%COMP%]     .p-select:hover, \n   [_nghost-%COMP%]     .p-inputnumber:hover, \n   [_nghost-%COMP%]     .p-textarea:hover {\n      background: rgba(var(--apple-gray-5), 0.6) !important;\n      border-color: rgba(var(--apple-gray-3), 0.5) !important;\n      box-shadow: \n        inset 0 1px 2px rgba(0, 0, 0, 0.02),\n        0 2px 4px rgba(0, 0, 0, 0.02) !important;\n    }\n\n    [_nghost-%COMP%]     .p-inputtext:focus, \n   [_nghost-%COMP%]     .p-select:focus, \n   [_nghost-%COMP%]     .p-select.p-focus, \n   [_nghost-%COMP%]     .p-inputnumber:focus, \n   [_nghost-%COMP%]     .p-textarea:focus {\n      background: rgba(255, 255, 255, 0.95) !important;\n      border-color: rgba(var(--apple-blue), 0.5) !important;\n      box-shadow: \n        0 0 0 4px rgba(var(--apple-blue), 0.15),\n        0 4px 12px rgba(var(--apple-blue), 0.1),\n        inset 0 0 0 1px rgba(var(--apple-blue), 0.2) !important;\n      outline: none !important;\n    }\n\n    [_nghost-%COMP%]     .p-inputtext::placeholder {\n      color: rgba(var(--apple-gray-1), 0.6);\n      font-weight: 400;\n    }\n\n    \n\n\n\n\n    .form-actions[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: flex-end;\n      gap: 0.75rem;\n      padding-top: 0.75rem;\n    }\n\n    .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;\n      min-width: 130px;\n      border-radius: 12px !important;\n      font-weight: 600 !important;\n      font-size: 0.9375rem !important;\n      padding: 0.75rem 1.5rem !important;\n      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      letter-spacing: -0.01em !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--ghost {\n      background: rgba(255, 255, 255, 0.7) !important;\n      border: 1px solid rgba(var(--apple-gray-3), 0.5) !important;\n      color: rgba(var(--apple-label), 0.8) !important;\n      box-shadow: \n        0 1px 3px rgba(0, 0, 0, 0.04),\n        inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;\n      backdrop-filter: blur(10px) !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--ghost:hover {\n      background: rgba(255, 255, 255, 0.9) !important;\n      border-color: rgba(var(--apple-gray-2), 0.6) !important;\n      color: rgba(var(--apple-label), 0.95) !important;\n      transform: translateY(-1px) !important;\n      box-shadow: \n        0 2px 8px rgba(0, 0, 0, 0.06),\n        inset 0 1px 0 rgba(255, 255, 255, 1) !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--ghost:active {\n      background: rgba(var(--apple-gray-5), 0.8) !important;\n      transform: translateY(0) scale(0.98) !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--primary {\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 1) 0%, \n        rgba(var(--apple-blue), 0.85) 100%) !important;\n      border: none !important;\n      color: white !important;\n      box-shadow: \n        0 2px 4px rgba(0, 0, 0, 0.1),\n        0 4px 16px rgba(var(--apple-blue), 0.25),\n        inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--primary:hover:not(:disabled) {\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.92) 0%, \n        rgba(var(--apple-blue), 0.78) 100%) !important;\n      transform: translateY(-2px) !important;\n      box-shadow: \n        0 4px 8px rgba(0, 0, 0, 0.12),\n        0 8px 24px rgba(var(--apple-blue), 0.3),\n        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--primary:active:not(:disabled) {\n      transform: translateY(0) scale(0.98) !important;\n      box-shadow: \n        0 1px 3px rgba(0, 0, 0, 0.1),\n        0 2px 8px rgba(var(--apple-blue), 0.2),\n        inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;\n    }\n\n    [_nghost-%COMP%]     .crm-button--primary:disabled {\n      background: rgba(var(--apple-gray-4), 0.8) !important;\n      color: rgba(var(--apple-gray-1), 1) !important;\n      box-shadow: none !important;\n      cursor: not-allowed !important;\n      transform: none !important;\n    }\n\n    \n\n\n\n\n    .detail-container[_ngcontent-%COMP%] {\n      padding-top: 0;\n    }\n\n    \n\n    .lifecycle-stepper[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 1rem;\n      padding: 1rem 1.5rem;\n      margin-bottom: 1rem;\n      background: rgba(255, 255, 255, 0.85);\n      backdrop-filter: blur(20px);\n      border: 1px solid rgba(255, 255, 255, 0.3);\n      border-radius: 16px;\n      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n\n      .stepper-track {\n        display: flex;\n        align-items: center;\n        gap: 0;\n        flex: 1;\n      }\n\n      .stepper-step {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        gap: 0.5rem;\n        flex: 1;\n        position: relative;\n\n        .step-indicator {\n          display: flex;\n          align-items: center;\n          width: 100%;\n          justify-content: center;\n\n          .step-dot {\n            width: 36px;\n            height: 36px;\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            background: #e5e7eb;\n            color: #9ca3af;\n            font-size: 0.875rem;\n            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n            z-index: 1;\n            flex-shrink: 0;\n          }\n\n          .step-connector {\n            flex: 1;\n            height: 3px;\n            background: #e5e7eb;\n            margin: 0 -4px;\n            transition: background 0.4s ease;\n          }\n        }\n\n        .step-label {\n          font-size: 0.75rem;\n          font-weight: 600;\n          color: #9ca3af;\n          text-transform: uppercase;\n          letter-spacing: 0.05em;\n          transition: color 0.3s ease;\n        }\n\n        &.completed {\n          .step-dot {\n            background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);\n            color: white;\n            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);\n          }\n          .step-connector { background: #22c55e; }\n          .step-label { color: #22c55e; }\n        }\n\n        &.active {\n          .step-dot {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);\n            transform: scale(1.15);\n          }\n          .step-label {\n            color: #667eea;\n            font-weight: 700;\n          }\n        }\n      }\n\n      .stepper-meta {\n        display: flex;\n        align-items: center;\n        gap: 0.375rem;\n        font-size: 0.8125rem;\n        color: #6b7280;\n        white-space: nowrap;\n\n        i { font-size: 0.75rem; }\n      }\n\n      @media (max-width: 600px) {\n        flex-direction: column;\n        padding: 0.75rem 1rem;\n      }\n    }\n\n    \n\n    .engagement-breakdown[_ngcontent-%COMP%] {\n      padding: 1rem 1.5rem;\n      margin-bottom: 1rem;\n      background: rgba(255, 255, 255, 0.85);\n      backdrop-filter: blur(20px);\n      border: 1px solid rgba(255, 255, 255, 0.3);\n      border-radius: 16px;\n      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n\n      .engagement-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        margin-bottom: 0.75rem;\n      }\n\n      .engagement-title {\n        display: flex;\n        align-items: center;\n        gap: 0.5rem;\n        font-size: 0.875rem;\n        font-weight: 600;\n        color: #374151;\n\n        i {\n          color: #667eea;\n          font-size: 1rem;\n        }\n      }\n\n      .engagement-total {\n        strong {\n          font-size: 1.375rem;\n          font-weight: 700;\n          background: linear-gradient(135deg, #667eea, #764ba2);\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n        }\n        span {\n          font-size: 0.8125rem;\n          color: #9ca3af;\n          margin-left: 2px;\n        }\n      }\n\n      .engagement-bars {\n        display: flex;\n        flex-direction: column;\n        gap: 0.5rem;\n      }\n\n      .engagement-bar {\n        .bar-header {\n          display: flex;\n          justify-content: space-between;\n          margin-bottom: 0.25rem;\n        }\n        .bar-label {\n          font-size: 0.75rem;\n          font-weight: 600;\n          color: #6b7280;\n          text-transform: uppercase;\n          letter-spacing: 0.03em;\n        }\n        .bar-value {\n          font-size: 0.75rem;\n          font-weight: 600;\n          color: #374151;\n        }\n        .bar-track {\n          height: 6px;\n          background: #e5e7eb;\n          border-radius: 999px;\n          overflow: hidden;\n        }\n        .bar-fill {\n          height: 100%;\n          border-radius: 999px;\n          transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n        }\n      }\n    }\n\n    .timeline[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .timeline-item[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 120px 1fr;\n      gap: 1rem;\n      padding: 1rem;\n      border-radius: 14px;\n      background: rgba(248, 250, 252, 0.9);\n      border: 1px solid rgba(226, 232, 240, 0.7);\n    }\n\n    .type-dot[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      padding: 0.35rem 0.75rem;\n      border-radius: 999px;\n      font-size: 0.75rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.04em;\n      background: rgba(59, 130, 246, 0.12);\n      color: #1d4ed8;\n    }\n\n    .type-dot[data-type='Call'][_ngcontent-%COMP%] { background: rgba(16, 185, 129, 0.15); color: #047857; }\n    .type-dot[data-type='Meeting'][_ngcontent-%COMP%] { background: rgba(99, 102, 241, 0.15); color: #4338ca; }\n    .type-dot[data-type='Email'][_ngcontent-%COMP%] { background: rgba(251, 146, 60, 0.18); color: #c2410c; }\n    .type-dot[data-type='Task'][_ngcontent-%COMP%] { background: rgba(148, 163, 184, 0.2); color: #475569; }\n    .type-dot[data-type='Note'][_ngcontent-%COMP%] { background: rgba(236, 72, 153, 0.15); color: #be185d; }\n    .type-dot[data-type='lifecycle'][_ngcontent-%COMP%] { background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15)); color: #667eea; }\n\n    .lifecycle-event[_ngcontent-%COMP%] {\n      border-left: 3px solid #667eea;\n      background: rgba(102, 126, 234, 0.04) !important;\n    }\n\n    .emails-section[_ngcontent-%COMP%]   .empty-hint[_ngcontent-%COMP%] {\n      font-size: 0.8125rem;\n      color: #667eea;\n      margin-top: 0.375rem;\n    }\n\n    .timeline-title[_ngcontent-%COMP%] {\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .timeline-meta[_ngcontent-%COMP%] {\n      color: #64748b;\n      font-size: 0.85rem;\n      margin: 0.25rem 0 0.5rem;\n    }\n\n    .timeline-description[_ngcontent-%COMP%] {\n      color: #334155;\n    }\n\n    .notes[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .note-editor[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .note-actions[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: flex-end;\n    }\n\n    .note-item[_ngcontent-%COMP%] {\n      padding: 1rem;\n      border-radius: 14px;\n      background: rgba(248, 250, 252, 0.9);\n      border: 1px solid rgba(226, 232, 240, 0.7);\n    }\n\n    .note-header[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      gap: 1rem;\n      font-weight: 700;\n      color: #1f2937;\n      margin-bottom: 0.5rem;\n    }\n\n    .note-meta[_ngcontent-%COMP%] {\n      font-weight: 500;\n      color: #94a3b8;\n      font-size: 0.8rem;\n    }\n\n    .note-body[_ngcontent-%COMP%] {\n      color: #475569;\n      white-space: pre-wrap;\n    }\n\n    .related-grid[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 1.5rem;\n    }\n\n    .related-summary-strip[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      gap: 1rem;\n      margin-bottom: 1.25rem;\n    }\n\n    .summary-chip[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.35rem;\n      padding: 0.85rem 1rem;\n      border-radius: 16px;\n      background: rgba(255, 255, 255, 0.75);\n      border: 1px solid rgba(226, 232, 240, 0.8);\n      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);\n    }\n\n    .chip-label[_ngcontent-%COMP%] {\n      font-size: 0.75rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n      font-weight: 600;\n    }\n\n    .chip-value[_ngcontent-%COMP%] {\n      font-size: 1.4rem;\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .chip-meta[_ngcontent-%COMP%] {\n      font-size: 0.85rem;\n      color: #475569;\n    }\n\n    .related-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n      margin-bottom: 0.75rem;\n      color: #1f2937;\n      font-size: 1rem;\n      font-weight: 700;\n    }\n\n    .account-card[_ngcontent-%COMP%] {\n      padding: 1rem;\n      border-radius: 14px;\n      background: rgba(248, 250, 252, 0.9);\n      border: 1px solid rgba(226, 232, 240, 0.7);\n    }\n\n    .account-name[_ngcontent-%COMP%] {\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .account-meta[_ngcontent-%COMP%] {\n      color: #64748b;\n      font-size: 0.9rem;\n      margin-top: 0.25rem;\n    }\n\n    .related-link[_ngcontent-%COMP%] {\n      color: #2563eb;\n      font-weight: 600;\n      text-decoration: none;\n    }\n\n    .related-link[_ngcontent-%COMP%]:hover {\n      color: #1d4ed8;\n      text-decoration: underline;\n    }\n\n    .clickable-row[_ngcontent-%COMP%] {\n      cursor: pointer;\n      transition: background-color 0.15s ease, border-color 0.15s ease;\n    }\n\n    .clickable-row[_ngcontent-%COMP%]:hover {\n      background: rgba(37, 99, 235, 0.06);\n      border-color: rgba(37, 99, 235, 0.18);\n    }\n\n    .attachments[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .compact-table[_ngcontent-%COMP%]     .p-datatable-thead > tr > th {\n      font-size: 0.75rem;\n      text-transform: uppercase;\n      letter-spacing: 0.04em;\n      color: #64748b;\n    }\n\n    .table-actions[_ngcontent-%COMP%] {\n      width: 48px;\n      text-align: right;\n    }\n\n    .empty-state[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 0.35rem;\n      padding: 1.5rem 1rem;\n      color: #94a3b8;\n      font-size: 0.9rem;\n      text-align: center;\n\n      > i {\n        font-size: 1.5rem;\n        opacity: 0.5;\n      }\n\n      .empty-state-link {\n        font-size: 0.82rem;\n        font-weight: 600;\n        color: #6366f1;\n        cursor: pointer;\n        text-decoration: none;\n        transition: color 200ms;\n\n        &:hover { color: #4338ca; }\n      }\n    }\n\n    \n\n\n\n\n    @media (max-width: 768px) {\n      .page-header[_ngcontent-%COMP%] {\n        padding: 1rem;\n      }\n\n      .form-container[_ngcontent-%COMP%] {\n        padding: 1rem;\n      }\n\n      .form-section[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n        border-radius: 16px;\n      }\n\n      .form-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n        gap: 1rem;\n      }\n\n      .form-actions[_ngcontent-%COMP%] {\n        flex-direction: column;\n      }\n\n      .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n        width: 100%;\n        min-width: auto;\n      }\n    }\n\n    \n\n\n\n\n    [_nghost-%COMP%] {\n      scrollbar-width: thin;\n      scrollbar-color: rgba(var(--apple-gray-2), 0.4) transparent;\n    }\n\n    [_nghost-%COMP%]::-webkit-scrollbar {\n      width: 10px;\n    }\n\n    [_nghost-%COMP%]::-webkit-scrollbar-track {\n      background: transparent;\n    }\n\n    [_nghost-%COMP%]::-webkit-scrollbar-thumb {\n      background: rgba(var(--apple-gray-2), 0.4);\n      border-radius: 5px;\n      border: 3px solid transparent;\n      background-clip: content-box;\n    }\n\n    [_nghost-%COMP%]::-webkit-scrollbar-thumb:hover {\n      background: rgba(var(--apple-gray-1), 0.5);\n      background-clip: content-box;\n    }\n\n    \n\n    [_ngcontent-%COMP%]::selection {\n      background: rgba(var(--apple-blue), 0.25);\n      color: inherit;\n    }\n  \n.presence-strip[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n\n.presence-focus[_ngcontent-%COMP%] {\n  margin-top: 0.55rem;\n  display: inline-flex;\n  position: relative;\n  align-items: center;\n  gap: 0.45rem;\n  border-radius: 0.75rem;\n  padding: 0.4rem 0.7rem;\n  font-size: 0.8rem;\n  font-weight: 700;\n  border: 1px solid rgba(14, 165, 233, 0.22);\n  color: #0c4a6e;\n  background: linear-gradient(135deg, rgba(224, 242, 254, 0.95), rgba(186, 230, 253, 0.92));\n  box-shadow: 0 8px 18px rgba(2, 132, 199, 0.18), 0 0 0 1px rgba(125, 211, 252, 0.28) inset;\n  -webkit-user-select: none;\n  user-select: none;\n  caret-color: transparent;\n  cursor: default;\n\n  &::selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  &::-moz-selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  // Glowing comet that orbits OUTSIDE the chip border\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 2rem;\n    height: 2px;\n    border-radius: 999px;\n    background: linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.6) 15%,\n      rgba(255, 255, 255, 1) 50%,\n      rgba(255, 255, 255, 0.6) 85%,\n      transparent 100%\n    );\n    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1))\n            drop-shadow(0 0 5px rgba(186, 230, 253, 0.9))\n            drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))\n            drop-shadow(0 0 18px rgba(14, 165, 233, 0.35));\n    offset-path: inset(0px round 0.75rem);\n    offset-distance: 0%;\n    offset-rotate: auto;\n    animation: _ngcontent-%COMP%_presence-border-tail 3.5s linear infinite;\n    will-change: offset-distance;\n    pointer-events: none;\n    z-index: 3;\n  }\n\n  > * {\n    position: relative;\n    z-index: 1;\n  }\n\n  i {\n    color: #0284c7;\n    font-size: 0.85rem;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_presence-border-tail {\n  from { offset-distance: 0%; }\n  to   { offset-distance: 100%; }\n}\n\n.presence-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #64748b;\n  font-weight: 600;\n}\n\n.presence-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #0f172a;\n  border: 1px solid rgba(14, 165, 233, 0.32);\n  background: rgba(224, 242, 254, 0.8);\n}\n\n.presence-editing-note[_ngcontent-%COMP%] {\n  margin-top: 0.45rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  border: 1px solid rgba(251, 146, 60, 0.45);\n  background: linear-gradient(135deg, rgba(255, 247, 237, 0.98), rgba(254, 215, 170, 0.85));\n  color: #9a3412;\n  border-radius: 0.65rem;\n  padding: 0.35rem 0.65rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  box-shadow: 0 8px 18px rgba(251, 146, 60, 0.18), 0 0 0 1px rgba(254, 215, 170, 0.32) inset;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   C19[_ngcontent-%COMP%]:   Relationships[_ngcontent-%COMP%]   Tab[_ngcontent-%COMP%]   \u2500\u2500\n.relationships-section[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n\n.relationships-loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1rem;\n  color: #6b7280;\n  font-size: 0.875rem;\n\n  i { font-size: 1.1rem; color: #667eea; }\n}\n\n.relationship-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.relationship-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background: rgba(255, 255, 255, 0.6);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 0.75rem;\n  transition: all 250ms;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.85);\n    transform: translateY(-1px);\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n  }\n}\n\n.relationship-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.5rem;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  font-size: 1rem;\n  flex-shrink: 0;\n}\n\n.relationship-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n\n.relationship-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 0.9375rem;\n  color: #1f2937;\n}\n\n.relationship-type[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: #6b7280;\n  text-transform: capitalize;\n}\n\n.relationship-detail[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: #9ca3af;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   C15[_ngcontent-%COMP%]:   Duplicate[_ngcontent-%COMP%]   Detection[_ngcontent-%COMP%]   Dialog[_ngcontent-%COMP%]   \u2500\u2500\n.duplicate-note[_ngcontent-%COMP%] {\n  font-size: 0.9375rem;\n  color: #4b5563;\n  margin: 0 0 1rem;\n  line-height: 1.5;\n}\n\n.duplicate-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.duplicate-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1rem;\n  background: rgba(245, 158, 11, 0.06);\n  border: 1px solid rgba(245, 158, 11, 0.2);\n  border-radius: 0.75rem;\n\n  &:hover {\n    background: rgba(245, 158, 11, 0.1);\n  }\n}\n\n.duplicate-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n\n  strong {\n    font-size: 0.9375rem;\n    color: #1f2937;\n  }\n}\n\n.duplicate-email[_ngcontent-%COMP%], \n.duplicate-phone[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: #6b7280;\n}\n\n.duplicate-score[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: #f59e0b;\n  white-space: nowrap;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ContactFormPage, [{
        type: Component,
        args: [{ selector: 'app-contact-form-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    RouterLink,
                    ButtonModule,
                    InputTextModule,
                    SelectModule,
                    InputNumberModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    TextareaModule,
                    TabsModule,
                    TableModule,
                    TagModule,
                    FileUploadModule,
                    AutoCompleteModule,
                    DialogModule,
                    SplitButtonModule,
                    BreadcrumbsComponent
                ], template: "\n    <div class=\"contact-form-page\">\n      <app-breadcrumbs></app-breadcrumbs>\n      <p-dialog\n        header=\"Saved drafts available\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"draftPromptVisible()\"\n        [style]=\"{ width: '38rem', maxWidth: '96vw' }\"\n        styleClass=\"form-draft-prompt-dialog\"\n        (visibleChange)=\"draftPromptVisible.set($event)\"\n        (onHide)=\"dismissDraftPrompt()\"\n      >\n        <div class=\"form-draft-prompt\">\n          <div class=\"form-draft-prompt__hero\">\n            <div class=\"form-draft-prompt__icon\">\n              <i class=\"pi pi-bookmark\"></i>\n            </div>\n            <div>\n              <h3>Resume a saved contact draft?</h3>\n              <p>You have saved contact drafts. Choose one to continue where you left off, or start with a blank form.</p>\n            </div>\n          </div>\n          <div class=\"form-draft-list\" *ngIf=\"recentDrafts().length; else noContactPromptDrafts\">\n            <div class=\"form-draft-list__item\" *ngFor=\"let draft of recentDrafts()\">\n              <span class=\"form-draft-list__title\">{{ draft.title }}</span>\n              <span class=\"form-draft-list__meta\">{{ draft.subtitle || 'No account' }} \u00B7 {{ formatDraftTimestamp(draft.updatedAtUtc) }}</span>\n              <span class=\"form-draft-list__actions\">\n                <button type=\"button\" class=\"form-draft-list__resume\" (click)=\"loadDraftFromPrompt(draft)\">Load draft</button>\n              </span>\n            </div>\n          </div>\n          <ng-template #noContactPromptDrafts>\n            <p class=\"form-draft-dialog__empty\">No saved drafts available.</p>\n          </ng-template>\n          <div class=\"lead-status-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Start fresh\" (click)=\"dismissDraftPrompt()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"View all drafts\" (click)=\"dismissDraftPrompt(); openDraftLibrary()\"></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        header=\"Open saved draft?\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"draftOpenConfirmVisible()\"\n        [style]=\"{ width: '28rem', maxWidth: '94vw' }\"\n        (visibleChange)=\"draftOpenConfirmVisible.set($event)\"\n        (onHide)=\"cancelOpenDraft()\"\n      >\n        <div class=\"form-draft-dialog\">\n          <p>Your current unsaved changes will be replaced by the selected draft.</p>\n          <div class=\"lead-status-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Cancel\" (click)=\"cancelOpenDraft()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Open Draft\" (click)=\"confirmOpenDraft()\"></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        header=\"Unsaved contact changes\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"false\"\n        [visible]=\"leavePromptVisible()\"\n        [style]=\"{ width: '36rem', maxWidth: '96vw' }\"\n        styleClass=\"form-leave-dialog\"\n        (visibleChange)=\"leavePromptVisible.set($event)\"\n        (onHide)=\"stayOnForm()\"\n      >\n        <div class=\"form-leave-dialog__body\">\n          <div class=\"form-leave-dialog__hero\">\n            <div class=\"form-leave-dialog__icon\">\n              <i class=\"pi pi-exclamation-circle\"></i>\n            </div>\n            <div>\n              <h3>Your contact form has unsaved changes.</h3>\n              <p>Choose whether to save the current state as a draft, submit the contact now, or leave without saving.</p>\n            </div>\n          </div>\n          <div class=\"form-leave-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Stay on form\" [disabled]=\"saving() || draftSaving()\" (click)=\"stayOnForm()\"></button>\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Leave without saving\" [disabled]=\"saving() || draftSaving()\" (click)=\"leaveWithoutSaving()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--secondary\" label=\"Save to draft\" [loading]=\"draftSaving()\" [disabled]=\"saving() || draftSaving()\" (click)=\"saveDraftAndLeave()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" [label]=\"primarySaveLabel()\" [loading]=\"saving()\" [disabled]=\"saving() || draftSaving()\" (click)=\"submitAndLeave()\"></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        header=\"Saved contact drafts\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"draftLibraryVisible()\"\n        [style]=\"{ width: '42rem', maxWidth: '96vw' }\"\n        (visibleChange)=\"draftLibraryVisible.set($event)\"\n        (onHide)=\"closeDraftLibrary()\"\n      >\n        <div class=\"form-draft-dialog\">\n          <p class=\"form-draft-dialog__empty\" *ngIf=\"!draftLibraryLoading() && !draftLibraryItems().length\">No saved drafts yet.</p>\n          <div class=\"form-draft-list\" *ngIf=\"draftLibraryItems().length\">\n            <div class=\"form-draft-list__item\" *ngFor=\"let draft of draftLibraryItems()\">\n              <span class=\"form-draft-list__title\">{{ draft.title }}</span>\n              <span class=\"form-draft-list__meta\">{{ draft.subtitle || 'No account' }} \u00B7 {{ formatDraftTimestamp(draft.updatedAtUtc) }}</span>\n              <span class=\"form-draft-list__actions\">\n                <button type=\"button\" class=\"form-draft-list__resume\" (click)=\"openDraftFromSummary(draft)\">Resume</button>\n                <button type=\"button\" class=\"form-draft-list__discard\" (click)=\"discardDraft(draft, $event)\">Discard</button>\n              </span>\n            </div>\n          </div>\n        </div>\n      </p-dialog>\n      <header class=\"page-header\">\n        <div class=\"header-content\">\n          <button pButton type=\"button\" class=\"back-link p-button-text\" routerLink=\"/app/contacts\">\n            <i class=\"pi pi-arrow-left\"></i>\n            <span>Back to contacts</span>\n          </button>\n          <div class=\"header-title\">\n            <h1 class=\"hero-title\">\n              <span class=\"title-gradient\">{{ isEditMode() ? 'Edit' : 'Create New' }}</span>\n              <span class=\"title-light\">Contact</span>\n            </h1>\n            <p>{{ isEditMode() ? 'Update stakeholder details' : 'Add a new person to your customer team' }}</p>\n            <div class=\"form-draft-status\" *ngIf=\"draftStatusMessage() as draftStatus\">\n              <i class=\"pi pi-bookmark\"></i>\n              <span>{{ draftStatus }}</span>\n            </div>\n            <div class=\"form-draft-banner\" *ngIf=\"draftModeActive()\">\n              <i class=\"pi pi-info-circle\"></i>\n              <span>This form is loaded from a saved draft. Final Save will create or update the live CRM record.</span>\n            </div>\n            <div class=\"presence-focus\" *ngIf=\"isEditMode() && visiblePresenceUsers().length\">\n              <i class=\"pi pi-eye\"></i>\n              <span>{{ viewingPresenceSummary() }}</span>\n            </div>\n            <div class=\"presence-editing-note\" *ngIf=\"isEditMode() && activeEditors().length\">\n              <i class=\"pi pi-pencil\"></i>\n              <span>{{ editingPresenceSummary() }}</span>\n            </div>\n          </div>\n        </div>\n      </header>\n\n      <main class=\"form-container\">\n        <form class=\"contact-form\" (ngSubmit)=\"onSave()\">\n          <section class=\"related-summary-strip\" *ngIf=\"isEditMode()\">\n            <div class=\"summary-chip\" *ngIf=\"linkedAccount(); else accountSummaryEmpty\">\n              <span class=\"chip-label\">Customer</span>\n              <span class=\"chip-value\">{{ linkedAccount()?.name }}</span>\n              <span class=\"chip-meta\">\n                Owner {{ linkedAccount()?.owner || '\u2014' }} \u00B7 Created\n                {{ linkedAccount()?.createdAt | date: 'MMM d, yyyy' }}\n              </span>\n            </div>\n            <ng-template #accountSummaryEmpty>\n              <div class=\"summary-chip\">\n                <span class=\"chip-label\">Customer</span>\n                <span class=\"chip-value\">None</span>\n                <span class=\"chip-meta\">No customer linked yet.</span>\n              </div>\n            </ng-template>\n            <div class=\"summary-chip\">\n              <span class=\"chip-label\">Opportunities</span>\n              <span class=\"chip-value\">{{ opportunityCount() }}</span>\n              <span class=\"chip-meta\" *ngIf=\"latestOpportunityCreatedAt()\">\n                Last added {{ latestOpportunityCreatedAt() | date: 'MMM d, yyyy' }}\n              </span>\n            </div>\n          </section>\n          <section class=\"form-section\">\n            <h2 class=\"section-title\">\n              <i class=\"pi pi-user\"></i>\n              Contact details\n            </h2>\n            <div class=\"form-grid\">\n              <div class=\"form-field\">\n                <label for=\"contact-firstName\">First name <span class=\"required\">*</span></label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                    <i class=\"pi pi-user\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"contact-firstName\" name=\"firstName\" [(ngModel)]=\"form.firstName\" required placeholder=\"First name\" />\n                </p-inputgroup>\n                <p class=\"field-error\" *ngIf=\"firstNameError()\">{{ firstNameError() }}</p>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"contact-lastName\">Last name <span class=\"required\">*</span></label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                    <i class=\"pi pi-user\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"contact-lastName\" name=\"lastName\" [(ngModel)]=\"form.lastName\" required placeholder=\"Last name\" />\n                </p-inputgroup>\n                <p class=\"field-error\" *ngIf=\"lastNameError()\">{{ lastNameError() }}</p>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"contact-email\">Email</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--email\">\n                    <i class=\"pi pi-envelope\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"contact-email\" name=\"email\" [(ngModel)]=\"form.email\" type=\"email\" placeholder=\"name@company.com\" />\n                </p-inputgroup>\n                <a *ngIf=\"isEditMode() && form.email\" class=\"field-link\" href=\"\" (click)=\"composeToCurrentContact($event)\"><i class=\"pi pi-external-link\"></i> Send email</a>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"contact-jobTitle\">Job title</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                    <i class=\"pi pi-id-card\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"contact-jobTitle\" name=\"jobTitle\" [(ngModel)]=\"form.jobTitle\" placeholder=\"Role or title\" />\n                </p-inputgroup>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"contact-buyingRole\">Buying role</label>\n                <p-select\n                  id=\"contact-buyingRole\"\n                  [options]=\"buyingRoleOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"buyingRole\"\n                  [(ngModel)]=\"form.buyingRole\"\n                  placeholder=\"Select buying role\"\n                  styleClass=\"w-full\"\n                  appendTo=\"body\"\n                ></p-select>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"contact-phone\">Phone</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--phone\">\n                    <i class=\"pi pi-phone\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"contact-phone\" name=\"phone\" [(ngModel)]=\"form.phone\" placeholder=\"+1 555-0101\" />\n                </p-inputgroup>\n                <a *ngIf=\"isEditMode() && form.phone\" class=\"field-link\" [href]=\"'tel:' + form.phone\"><i class=\"pi pi-external-link\"></i> Call</a>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"contact-mobile\">Mobile</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--phone\">\n                    <i class=\"pi pi-phone\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"contact-mobile\" name=\"mobile\" [(ngModel)]=\"form.mobile\" placeholder=\"+1 555-0102\" />\n                </p-inputgroup>\n                <a *ngIf=\"isEditMode() && form.mobile\" class=\"field-link\" [href]=\"'tel:' + form.mobile\"><i class=\"pi pi-external-link\"></i> Call</a>\n              </div>\n\n              <!-- C17: Tags -->\n              <div class=\"form-field full-row\">\n                <label for=\"contact-tags\">Tags</label>\n                <p-autoComplete\n                  id=\"contact-tags\"\n                  [(ngModel)]=\"formTags\"\n                  [ngModelOptions]=\"{ standalone: true }\"\n                  [suggestions]=\"tagSuggestions()\"\n                  (completeMethod)=\"onTagSearch($event)\"\n                  [multiple]=\"true\"\n                  placeholder=\"Add tags...\"\n                  styleClass=\"w-full\"\n                ></p-autoComplete>\n              </div>\n            </div>\n          </section>\n\n          <section class=\"form-section\">\n            <h2 class=\"section-title\">\n              <i class=\"pi pi-building\"></i>\n              Customer context\n            </h2>\n            <div class=\"form-grid\">\n              <div class=\"form-field\">\n                <label for=\"contact-accountId\">Customer</label>\n                <p-select\n                  id=\"contact-accountId\"\n                  [options]=\"accountOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"accountId\"\n                  [(ngModel)]=\"form.accountId\"\n                  placeholder=\"Link to customer\"\n                  styleClass=\"w-full\"\n                  appendTo=\"body\"\n                ></p-select>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"contact-lifecycleStage\">Lifecycle</label>\n                <p-select\n                  id=\"contact-lifecycleStage\"\n                  [options]=\"lifecycleOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"lifecycleStage\"\n                  [(ngModel)]=\"form.lifecycleStage\"\n                  placeholder=\"Select lifecycle\"\n                  styleClass=\"w-full\"\n                  appendTo=\"body\"\n                ></p-select>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"contact-activityScore\">Activity score</label>\n                <p-inputNumber id=\"contact-activityScore\" name=\"activityScore\" [(ngModel)]=\"form.activityScore\" [min]=\"0\" [max]=\"100\" class=\"w-full\"></p-inputNumber>\n              </div>\n\n              <!-- C19: Reports-To -->\n              <div class=\"form-field\">\n                <label for=\"contact-reportsTo\">Reports to</label>\n                <p-select\n                  id=\"contact-reportsTo\"\n                  [options]=\"reportsToOptions()\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"reportsToId\"\n                  [(ngModel)]=\"form.reportsToId\"\n                  placeholder=\"Select manager\"\n                  styleClass=\"w-full\"\n                  appendTo=\"body\"\n                  [showClear]=\"true\"\n                ></p-select>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"contact-linkedInProfile\">LinkedIn</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--website\">\n                    <i class=\"pi pi-link\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"contact-linkedInProfile\" name=\"linkedInProfile\" [(ngModel)]=\"form.linkedInProfile\" placeholder=\"https://linkedin.com/in/...\" />\n                </p-inputgroup>\n                <a *ngIf=\"isEditMode() && form.linkedInProfile\" class=\"field-link\" [href]=\"form.linkedInProfile\" target=\"_blank\" rel=\"noopener noreferrer\"><i class=\"pi pi-external-link\"></i> View profile</a>\n              </div>\n            </div>\n          </section>\n\n          <section class=\"form-section\">\n            <h2 class=\"section-title\">\n              <i class=\"pi pi-map-marker\"></i>\n              Address\n            </h2>\n            <div class=\"form-grid\">\n              <div class=\"form-field full-row\">\n                <label for=\"contact-street\">Street</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--address\">\n                    <i class=\"pi pi-map\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"contact-street\" name=\"street\" [(ngModel)]=\"form.street\" placeholder=\"123 Main Street\" />\n                </p-inputgroup>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"contact-city\">City</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--address\">\n                    <i class=\"pi pi-building\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"contact-city\" name=\"city\" [(ngModel)]=\"form.city\" placeholder=\"City\" />\n                </p-inputgroup>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"contact-state\">State</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                    <i class=\"pi pi-map-marker\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"contact-state\" name=\"state\" [(ngModel)]=\"form.state\" placeholder=\"State / Province\" />\n                </p-inputgroup>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"contact-postalCode\">Postal code</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                    <i class=\"pi pi-hashtag\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"contact-postalCode\" name=\"postalCode\" [(ngModel)]=\"form.postalCode\" placeholder=\"12345\" />\n                </p-inputgroup>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"contact-country\">Country</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--company\">\n                    <i class=\"pi pi-globe\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"contact-country\" name=\"country\" [(ngModel)]=\"form.country\" placeholder=\"Country\" />\n                </p-inputgroup>\n              </div>\n            </div>\n          </section>\n\n          <footer class=\"form-actions\">\n            <button type=\"button\" pButton label=\"Cancel\" class=\"crm-button crm-button--ghost\" (click)=\"router.navigate(['/app/contacts'])\"></button>\n            <!-- C18: Convert to Opportunity -->\n            <button\n              *ngIf=\"isEditMode()\"\n              type=\"button\"\n              pButton\n              label=\"Convert to opportunity\"\n              icon=\"pi pi-chart-line\"\n              class=\"crm-button crm-button--secondary\"\n              (click)=\"convertToOpportunity()\"\n              [disabled]=\"converting()\"\n            ></button>\n            <button\n              type=\"button\"\n              pButton\n              [label]=\"primarySaveLabel()\"\n              icon=\"pi pi-check\"\n              class=\"crm-button crm-button--primary\"\n              [disabled]=\"saving() || draftSaving()\"\n              (click)=\"onSave()\"\n            ></button>\n            <p-splitbutton\n              [label]=\"draftButtonLabel()\"\n              icon=\"pi pi-bookmark\"\n              styleClass=\"crm-draft-splitbutton\"\n              buttonStyleClass=\"crm-button crm-button--secondary\"\n              menuButtonStyleClass=\"crm-button crm-button--secondary\"\n              appendTo=\"body\"\n              [disabled]=\"saving() || draftSaving()\"\n              [model]=\"draftSplitButtonItems()\"\n              (onClick)=\"saveDraft()\"\n            ></p-splitbutton>\n          </footer>\n        </form>\n      </main>\n\n      <section class=\"form-container detail-container\" *ngIf=\"isEditMode()\">\n        <!-- C8: Lifecycle Stepper -->\n        <div class=\"lifecycle-stepper\">\n          <div class=\"stepper-track\">\n            <div class=\"stepper-step\"\n              *ngFor=\"let stage of lifecycleStages; let i = index\"\n              [class.active]=\"stage.value === form.lifecycleStage\"\n              [class.completed]=\"lifecycleStageIndex(stage.value) < lifecycleStageIndex(form.lifecycleStage)\">\n              <div class=\"step-indicator\">\n                <div class=\"step-dot\">\n                  <i class=\"pi\" [ngClass]=\"stage.icon\"></i>\n                </div>\n                <div class=\"step-connector\" *ngIf=\"i < lifecycleStages.length - 1\"></div>\n              </div>\n              <span class=\"step-label\">{{ stage.label }}</span>\n            </div>\n          </div>\n          <div class=\"stepper-meta\" *ngIf=\"contactCreatedAt()\">\n            <i class=\"pi pi-clock\"></i>\n            <span>{{ timeInStage() }}</span>\n          </div>\n        </div>\n\n        <!-- C9: Engagement Scoring Breakdown -->\n        <div class=\"engagement-breakdown\">\n          <div class=\"engagement-header\">\n            <div class=\"engagement-title\">\n              <i class=\"pi pi-chart-bar\"></i>\n              <span>Engagement Score</span>\n            </div>\n            <div class=\"engagement-total\">\n              <strong>{{ engagementBreakdown().total }}</strong>\n              <span>/ 100</span>\n            </div>\n          </div>\n          <div class=\"engagement-bars\">\n            <div class=\"engagement-bar\" *ngFor=\"let item of engagementBreakdown().items\">\n              <div class=\"bar-header\">\n                <span class=\"bar-label\">{{ item.label }}</span>\n                <span class=\"bar-value\">{{ item.value }}/{{ item.max }}</span>\n              </div>\n              <div class=\"bar-track\">\n                <div class=\"bar-fill\" [style.width.%]=\"(item.value / item.max) * 100\" [style.background]=\"item.color\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <section class=\"form-section\">\n          <h2 class=\"section-title\">\n            <i class=\"pi pi-address-book\"></i>\n            Contact workspace\n          </h2>\n\n          <p-tabs value=\"timeline\">\n            <p-tablist>\n              <p-tab value=\"timeline\">Timeline <span class=\"tab-badge\" *ngIf=\"activities().length\">{{ activities().length }}</span></p-tab>\n              <p-tab value=\"notes\">Notes <span class=\"tab-badge\" *ngIf=\"notes().length\">{{ notes().length }}</span></p-tab>\n              <p-tab value=\"related\">Related <span class=\"tab-badge\" *ngIf=\"relatedOpportunities().length + relatedProperties().length\">{{ relatedOpportunities().length + relatedProperties().length }}</span></p-tab>\n              <p-tab value=\"attachments\">Attachments <span class=\"tab-badge\" *ngIf=\"attachments().length\">{{ attachments().length }}</span></p-tab>\n              <p-tab value=\"emails\">Emails</p-tab>\n              <p-tab value=\"relationships\">Relationships <span class=\"tab-badge\" *ngIf=\"relationships().length\">{{ relationships().length }}</span></p-tab>\n            </p-tablist>\n            <p-tabpanels>\n              <p-tabpanel value=\"timeline\">\n              <div class=\"timeline\" *ngIf=\"!timelineLoading(); else timelineLoadingTpl\">\n                <!-- C11: Lifecycle History -->\n                <div class=\"timeline-item lifecycle-event\" *ngIf=\"form.lifecycleStage\">\n                  <div class=\"timeline-type\">\n                    <span class=\"type-dot\" data-type=\"lifecycle\">{{ form.lifecycleStage }}</span>\n                  </div>\n                  <div class=\"timeline-body\">\n                    <div class=\"timeline-title\">Current lifecycle: {{ form.lifecycleStage }}</div>\n                    <div class=\"timeline-meta\">\n                      <span *ngIf=\"contactCreatedAt()\">Since {{ contactCreatedAt() | date: 'MMM d, yyyy' }}</span>\n                      <span>\u2022 {{ timeInStage() }}</span>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"timeline-item\" *ngFor=\"let activity of activities()\">\n                  <div class=\"timeline-type\">\n                    <span class=\"type-dot\" [attr.data-type]=\"activity.type\">{{ activity.type }}</span>\n                  </div>\n                  <div class=\"timeline-body\">\n                    <div class=\"timeline-title\">{{ activity.subject }}</div>\n                    <div class=\"timeline-meta\">\n                      <span>{{ activity.createdAtUtc | date: 'MMM d, yyyy \u00B7 h:mm a' }}</span>\n                      <span *ngIf=\"activity.ownerName\">\u2022 {{ activity.ownerName }}</span>\n                    </div>\n                    <div class=\"timeline-description\" *ngIf=\"activity.description\">{{ activity.description }}</div>\n                  </div>\n                </div>\n                <div class=\"empty-state\" *ngIf=\"!activities().length\">\n                  <i class=\"pi pi-clock\"></i>\n                  <span>No activity yet.</span>\n                  <a class=\"empty-state-link\" routerLink=\"/app/activities\">+ Log first activity</a>\n                </div>\n              </div>\n              <ng-template #timelineLoadingTpl>\n                <div class=\"empty-state\">Loading timeline...</div>\n              </ng-template>\n              </p-tabpanel>\n\n              <p-tabpanel value=\"notes\">\n              <div class=\"notes\">\n                <div class=\"note-editor\">\n        <textarea \n          pTextarea \n          rows=\"4\" \n          placeholder=\"Add a note about this contact...\" \n          class=\"w-full\"\n          [(ngModel)]=\"noteText\"\n          [ngModelOptions]=\"{ standalone: true }\"\n        ></textarea>\n                  <div class=\"note-actions\">\n                    <button\n                      pButton\n                      type=\"button\"\n                      label=\"Add note\"\n                      icon=\"pi pi-plus\"\n                      class=\"crm-button crm-button--primary\"\n                      [disabled]=\"!noteText.trim() || noteSaving()\"\n                      (click)=\"addNote()\"\n                    ></button>\n                  </div>\n                </div>\n\n                <div class=\"note-list\" *ngIf=\"notes().length; else notesEmpty\">\n                  <div class=\"note-item\" *ngFor=\"let note of notes()\">\n                    <div class=\"note-header\">\n                      <span class=\"note-title\">{{ note.subject }}</span>\n                      <span class=\"note-meta\">{{ note.createdAtUtc | date: 'MMM d, yyyy \u00B7 h:mm a' }}</span>\n                    </div>\n                    <div class=\"note-body\">{{ note.description }}</div>\n                  </div>\n                </div>\n                <ng-template #notesEmpty>\n                  <div class=\"empty-state\">\n                    <i class=\"pi pi-file-edit\"></i>\n                    <span>No notes yet. Use the editor above to add one.</span>\n                  </div>\n                </ng-template>\n              </div>\n              </p-tabpanel>\n\n              <p-tabpanel value=\"related\">\n              <div class=\"related-grid\">\n                <div class=\"related-section\">\n                  <h3>Customer</h3>\n                  <div\n                    class=\"account-card clickable-row\"\n                    *ngIf=\"linkedAccount(); else accountEmpty\"\n                    [routerLink]=\"['/app/customers', linkedAccount()?.id, 'edit']\"\n                  >\n                    <div class=\"account-name related-link\">{{ linkedAccount()?.name }}</div>\n                    <div class=\"account-meta\">{{ linkedAccount()?.company || '\u2014' }}</div>\n                    <div class=\"account-meta\">\n                      Owner: {{ linkedAccount()?.owner || '\u2014' }} \u00B7 Created\n                      {{ linkedAccount()?.createdAt | date: 'MMM d, yyyy' }}\n                    </div>\n                  </div>\n                  <ng-template #accountEmpty>\n                    <div class=\"empty-state\">No customer linked.</div>\n                  </ng-template>\n                </div>\n\n                <div class=\"related-section\">\n                  <h3>Opportunities</h3>\n                  <p-table [value]=\"relatedOpportunitiesSorted()\" [paginator]=\"false\" [rows]=\"5\" styleClass=\"compact-table\">\n                    <ng-template pTemplate=\"header\">\n                      <tr>\n                        <th>Name</th>\n                        <th>Stage</th>\n                        <th>Amount</th>\n                        <th>Owner</th>\n                        <th>Created</th>\n                      </tr>\n                    </ng-template>\n                    <ng-template pTemplate=\"body\" let-row>\n                      <tr class=\"clickable-row\" [routerLink]=\"['/app/deals', row.id, 'edit']\">\n                        <td><span class=\"related-link\">{{ row.name }}</span></td>\n                        <td><p-tag [value]=\"row.stage\" severity=\"info\"></p-tag></td>\n                        <td>{{ row.amount | currency: row.currency : 'symbol' : '1.0-0' }}</td>\n                        <td>{{ row.owner || '\u2014' }}</td>\n                        <td>{{ row.createdAtUtc | date: 'MMM d, yyyy' }}</td>\n                      </tr>\n                    </ng-template>\n                  </p-table>\n                  <div class=\"empty-state\" *ngIf=\"!relatedOpportunities().length\">\n                    <i class=\"pi pi-chart-line\"></i>\n                    <span>No opportunities yet.</span>\n                    <a class=\"empty-state-link\" routerLink=\"/app/deals/new\">+ Create deal</a>\n                  </div>\n                </div>\n\n                <!-- Related Properties (X10) -->\n                <div class=\"related-section\">\n                  <h3>Properties</h3>\n                  <p-table [value]=\"relatedProperties()\" [paginator]=\"false\" [rows]=\"5\" styleClass=\"compact-table\">\n                    <ng-template pTemplate=\"header\">\n                      <tr>\n                        <th>Address</th>\n                        <th>Status</th>\n                        <th>Type</th>\n                        <th>Price</th>\n                        <th>MLS #</th>\n                      </tr>\n                    </ng-template>\n                    <ng-template pTemplate=\"body\" let-row>\n                      <tr class=\"clickable-row\" [routerLink]=\"['/app/properties', row.id]\">\n                        <td><span class=\"related-link\">{{ row.address }}</span></td>\n                        <td><p-tag [value]=\"row.status\" severity=\"info\"></p-tag></td>\n                        <td>{{ row.propertyType }}</td>\n                        <td>{{ row.listPrice | currency:row.currency:'symbol':'1.0-0' }}</td>\n                        <td>{{ row.mlsNumber || '\u2014' }}</td>\n                      </tr>\n                    </ng-template>\n                  </p-table>\n                  <div class=\"empty-state\" *ngIf=\"!relatedProperties().length\">\n                    <i class=\"pi pi-home\"></i>\n                    <span>No properties linked.</span>\n                    <a class=\"empty-state-link\" routerLink=\"/app/properties/new\">+ Add property</a>\n                  </div>\n                </div>\n\n                <div class=\"related-section\">\n                  <h3>Related accounts</h3>\n                  <p-table [value]=\"relatedAccountsSorted()\" [paginator]=\"false\" [rows]=\"5\" styleClass=\"compact-table\">\n                    <ng-template pTemplate=\"header\">\n                      <tr>\n                        <th>Name</th>\n                        <th>Relationship</th>\n                        <th>Owner</th>\n                        <th>Created</th>\n                      </tr>\n                    </ng-template>\n                    <ng-template pTemplate=\"body\" let-row>\n                      <tr class=\"clickable-row\" [routerLink]=\"['/app/customers', row.id, 'edit']\">\n                        <td><span class=\"related-link\">{{ row.name }}</span></td>\n                        <td>{{ relatedAccountRelation(row) }}</td>\n                        <td>{{ row.owner || '\u2014' }}</td>\n                        <td>{{ row.createdAt | date: 'MMM d, yyyy' }}</td>\n                      </tr>\n                    </ng-template>\n                  </p-table>\n                  <div class=\"empty-state\" *ngIf=\"!relatedAccounts().length\">\n                    <i class=\"pi pi-building\"></i>\n                    <span>No related accounts.</span>\n                  </div>\n                </div>\n\n                <div class=\"related-section\">\n                  <h3>Account history</h3>\n                  <div class=\"timeline\" *ngIf=\"!accountHistoryLoading(); else accountHistoryLoadingTpl\">\n                    <div class=\"timeline-item\" *ngFor=\"let activity of accountHistory()\">\n                      <div class=\"timeline-type\">\n                        <span class=\"type-dot\" [attr.data-type]=\"activity.type\">{{ activity.type }}</span>\n                      </div>\n                      <div class=\"timeline-body\">\n                        <div class=\"timeline-title\">{{ activity.subject }}</div>\n                        <div class=\"timeline-meta\">\n                          <span>{{ activity.createdAtUtc | date: 'MMM d, yyyy \u00B7 h:mm a' }}</span>\n                          <span *ngIf=\"activity.ownerName\">\u2022 {{ activity.ownerName }}</span>\n                        </div>\n                        <div class=\"timeline-description\" *ngIf=\"activity.description\">{{ activity.description }}</div>\n                      </div>\n                    </div>\n                    <div class=\"empty-state\" *ngIf=\"!accountHistory().length\">No account history yet.</div>\n                  </div>\n                  <ng-template #accountHistoryLoadingTpl>\n                    <div class=\"empty-state\">Loading account history...</div>\n                  </ng-template>\n                </div>\n              </div>\n              </p-tabpanel>\n\n              <p-tabpanel value=\"attachments\">\n              <div class=\"attachments\">\n                <p-fileUpload\n                  mode=\"basic\"\n                  chooseLabel=\"Upload file\"\n                  [customUpload]=\"true\"\n                  (uploadHandler)=\"onAttachmentUpload($event)\"\n                  [auto]=\"true\"\n                ></p-fileUpload>\n\n                <p-table [value]=\"attachments()\" [paginator]=\"false\" [rows]=\"5\" styleClass=\"compact-table\">\n                  <ng-template pTemplate=\"header\">\n                    <tr>\n                      <th>File</th>\n                      <th>Uploaded by</th>\n                      <th>Size</th>\n                      <th></th>\n                    </tr>\n                  </ng-template>\n                  <ng-template pTemplate=\"body\" let-row>\n                    <tr>\n                      <td>{{ row.fileName }}</td>\n                      <td>{{ row.uploadedBy || '\u2014' }}</td>\n                      <td>{{ row.size | number }} bytes</td>\n                      <td class=\"table-actions\">\n                        <button pButton type=\"button\" class=\"icon-btn\" icon=\"pi pi-download\" (click)=\"downloadAttachment(row)\"></button>\n                      </td>\n                    </tr>\n                  </ng-template>\n                </p-table>\n                <div class=\"empty-state\" *ngIf=\"!attachments().length\">\n                  <i class=\"pi pi-paperclip\"></i>\n                  <span>No attachments yet. Use the upload button above.</span>\n                </div>\n              </div>\n              </p-tabpanel>\n\n              <!-- C10: Email History Tab -->\n              <p-tabpanel value=\"emails\">\n                <div class=\"emails-section\">\n                  <div class=\"empty-state\">\n                    <i class=\"pi pi-envelope\"></i>\n                    <span>Email history will appear here once email sync is configured.</span>\n                    <p class=\"empty-hint\" *ngIf=\"form.email\">Contact email: {{ form.email }}</p>\n                  </div>\n                </div>\n              </p-tabpanel>\n\n              <!-- C19: Relationships -->\n              <p-tabpanel value=\"relationships\">\n                <div class=\"relationships-section\">\n                  <div class=\"relationships-loading\" *ngIf=\"relationshipsLoading()\">\n                    <i class=\"pi pi-spin pi-spinner\"></i>\n                    <span>Loading relationships\u2026</span>\n                  </div>\n                  <div class=\"empty-state\" *ngIf=\"!relationshipsLoading() && !relationships().length\">\n                    <i class=\"pi pi-users\"></i>\n                    <span>No relationships found for this contact.</span>\n                  </div>\n                  <div class=\"relationship-list\" *ngIf=\"!relationshipsLoading() && relationships().length\">\n                    <div class=\"relationship-item\" *ngFor=\"let rel of relationships()\">\n                      <div class=\"relationship-icon\">\n                        <i class=\"pi\" [ngClass]=\"relationshipIcon(rel.relationship)\"></i>\n                      </div>\n                      <div class=\"relationship-info\">\n                        <span class=\"relationship-name\">{{ rel.fullName }}</span>\n                        <span class=\"relationship-type\">{{ rel.relationship }}</span>\n                        <span class=\"relationship-detail\" *ngIf=\"rel.jobTitle\">{{ rel.jobTitle }}</span>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </p-tabpanel>\n            </p-tabpanels>\n          </p-tabs>\n        </section>\n      </section>\n    </div>\n\n    <!-- C15: Duplicate Detection Dialog -->\n    <p-dialog header=\"Possible Duplicates Found\" [(visible)]=\"duplicateDialogVisible\" [modal]=\"true\" [style]=\"{ width: '520px' }\" [closable]=\"true\">\n      <p class=\"duplicate-note\">The following contacts look similar. Do you still want to save?</p>\n      <div class=\"duplicate-list\">\n        <div class=\"duplicate-item\" *ngFor=\"let dup of duplicates()\">\n          <div class=\"duplicate-info\">\n            <strong>{{ dup.fullName }}</strong>\n            <span class=\"duplicate-email\" *ngIf=\"dup.email\">{{ dup.email }}</span>\n            <span class=\"duplicate-phone\" *ngIf=\"dup.phone\">{{ dup.phone }}</span>\n          </div>\n          <span class=\"duplicate-score\">{{ dup.matchScore }}% match</span>\n        </div>\n      </div>\n      <ng-template pTemplate=\"footer\">\n        <button type=\"button\" pButton label=\"Cancel\" class=\"crm-button crm-button--ghost\" (click)=\"duplicateDialogVisible.set(false)\"></button>\n        <button type=\"button\" pButton label=\"Save Anyway\" class=\"crm-button crm-button--primary\" (click)=\"confirmSaveDespiteDuplicates()\"></button>\n      </ng-template>\n    </p-dialog>\n  \n", styles: ["\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       CONTACT FORM PAGE - Premium Glass UI with Card Focus Effects\n       Apple + Linear/Vercel Hybrid Design\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    :host {\n      /* Premium color palette */\n      --apple-blue: 0, 122, 255;\n      --apple-purple: 175, 82, 222;\n      --apple-pink: 255, 45, 85;\n      --apple-teal: 90, 200, 250;\n      --apple-green: 52, 199, 89;\n      --apple-gray-1: 142, 142, 147;\n      --apple-gray-2: 174, 174, 178;\n      --apple-gray-3: 199, 199, 204;\n      --apple-gray-4: 209, 209, 214;\n      --apple-gray-5: 229, 229, 234;\n      --apple-gray-6: 242, 242, 247;\n      --apple-label: 0, 0, 0;\n      --apple-secondary: 60, 60, 67;\n      --apple-tertiary: 60, 60, 67;\n      --apple-fill: 120, 120, 128;\n      \n      /* Gradient border colors for hover */\n      --gradient-start: rgba(var(--apple-blue), 0.6);\n      --gradient-mid: rgba(var(--apple-purple), 0.4);\n      --gradient-end: rgba(var(--apple-teal), 0.5);\n    }\n\n    .contact-form-page {\n      min-height: 100vh;\n      position: relative;\n      /* Soft mesh gradient background */\n      background: \n        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(var(--apple-blue), 0.08) 0%, transparent 50%),\n        radial-gradient(ellipse 60% 40% at 90% 10%, rgba(var(--apple-purple), 0.06) 0%, transparent 40%),\n        radial-gradient(ellipse 50% 30% at 10% 60%, rgba(var(--apple-teal), 0.05) 0%, transparent 40%),\n        linear-gradient(180deg, \n          rgba(var(--apple-gray-6), 0.95) 0%, \n          rgba(255, 255, 255, 1) 40%,\n          rgba(var(--apple-gray-6), 0.3) 100%);\n      padding-bottom: 5rem;\n    }\n\n    /* Animated ambient orbs */\n    .contact-form-page::before {\n      content: '';\n      position: fixed;\n      top: -15%;\n      left: -5%;\n      width: 50%;\n      height: 50%;\n      background: radial-gradient(\n        circle,\n        rgba(var(--apple-blue), 0.08) 0%,\n        rgba(var(--apple-blue), 0.03) 30%,\n        transparent 60%\n      );\n      pointer-events: none;\n      z-index: 0;\n      animation: float-orb-1 18s ease-in-out infinite;\n    }\n\n    .contact-form-page::after {\n      content: '';\n      position: fixed;\n      bottom: -20%;\n      right: -10%;\n      width: 60%;\n      height: 60%;\n      background: radial-gradient(\n        circle,\n        rgba(var(--apple-purple), 0.07) 0%,\n        rgba(var(--apple-teal), 0.03) 35%,\n        transparent 60%\n      );\n      pointer-events: none;\n      z-index: 0;\n      animation: float-orb-2 22s ease-in-out infinite;\n    }\n\n    @keyframes float-orb-1 {\n      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }\n      25% { transform: translate(30px, -20px) scale(1.05); opacity: 1; }\n      50% { transform: translate(15px, -40px) scale(1.02); opacity: 0.9; }\n      75% { transform: translate(-10px, -15px) scale(1.08); opacity: 1; }\n    }\n\n    @keyframes float-orb-2 {\n      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }\n      33% { transform: translate(-25px, 25px) scale(1.06); opacity: 1; }\n      66% { transform: translate(15px, 10px) scale(0.98); opacity: 0.85; }\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       HEADER - Premium Frosted Bar\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .page-header {\n      position: sticky;\n      top: 0;\n      z-index: 100;\n      /* Premium frosted glass */\n      background: rgba(255, 255, 255, 0.65);\n      backdrop-filter: blur(40px) saturate(200%);\n      -webkit-backdrop-filter: blur(40px) saturate(200%);\n      /* Subtle gradient border */\n      border-bottom: 1px solid transparent;\n      background-image: \n        linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)),\n        linear-gradient(90deg, rgba(var(--apple-gray-4), 0.3), rgba(var(--apple-gray-3), 0.2), rgba(var(--apple-gray-4), 0.3));\n      background-origin: border-box;\n      background-clip: padding-box, border-box;\n      padding: 1rem 1.5rem;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);\n    }\n\n    .header-content {\n      width: 100%;\n      max-width: 1600px;\n      margin: 0 auto;\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .back-link {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.375rem;\n      padding: 0.375rem 0.625rem 0.375rem 0.375rem;\n      margin-left: -0.375rem;\n      border: none;\n      background: transparent;\n      color: rgba(var(--apple-blue), 1);\n      font-size: 0.9375rem;\n      font-weight: 500;\n      letter-spacing: -0.01em;\n      border-radius: 8px;\n      cursor: pointer;\n      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    }\n\n    .back-link:hover {\n      background: rgba(var(--apple-blue), 0.1);\n      transform: translateX(-2px);\n    }\n\n    .back-link:active {\n      background: rgba(var(--apple-blue), 0.15);\n      transform: scale(0.97);\n    }\n\n    .back-link i {\n      font-size: 1rem;\n      transition: transform 0.2s ease;\n    }\n\n    .back-link:hover i {\n      transform: translateX(-3px);\n    }\n\n    .header-title h1 {\n      margin: 0 0 0.25rem;\n    }\n\n    .header-title p {\n      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n      color: #6b7280;\n      font-size: 1rem;\n      font-weight: 400;\n      max-width: 500px;\n      line-height: 1.6;\n      margin: 0;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       FORM LAYOUT\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .form-container {\n      position: relative;\n      z-index: 1;\n      width: 100%;\n      max-width: 1600px;\n      margin: 0 auto;\n      padding: 1.5rem;\n    }\n\n    .contact-form {\n      display: flex;\n      flex-direction: column;\n      gap: 1.25rem;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       FORM SECTIONS - Premium Glass Cards with Hover Focus\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .form-section {\n      position: relative;\n      /* Premium frosted glass */\n      background: rgba(255, 255, 255, 0.55);\n      backdrop-filter: blur(40px) saturate(180%);\n      -webkit-backdrop-filter: blur(40px) saturate(180%);\n      border-radius: 20px;\n      padding: 1.75rem;\n      /* Gradient border via pseudo-element */\n      border: 1px solid rgba(255, 255, 255, 0.6);\n      /* Multi-layer premium shadow */\n      box-shadow: \n        0 0 0 1px rgba(255, 255, 255, 0.8) inset,\n        0 1px 2px rgba(0, 0, 0, 0.02),\n        0 4px 12px rgba(0, 0, 0, 0.03),\n        0 16px 32px rgba(0, 0, 0, 0.04);\n      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n      overflow: hidden;\n    }\n\n    /* Gradient border glow on hover */\n    .form-section::before {\n      content: '';\n      position: absolute;\n      inset: -1px;\n      border-radius: 21px;\n      padding: 1px;\n      background: linear-gradient(135deg, \n        transparent 0%,\n        transparent 100%);\n      -webkit-mask: \n        linear-gradient(#fff 0 0) content-box,\n        linear-gradient(#fff 0 0);\n      -webkit-mask-composite: xor;\n      mask-composite: exclude;\n      pointer-events: none;\n      opacity: 0;\n      transition: all 0.4s ease;\n    }\n\n    /* Ambient glow behind card on hover */\n    .form-section::after {\n      content: '';\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      width: 120%;\n      height: 120%;\n      transform: translate(-50%, -50%);\n      background: radial-gradient(\n        ellipse at center,\n        rgba(var(--apple-blue), 0) 0%,\n        transparent 70%\n      );\n      pointer-events: none;\n      z-index: -1;\n      opacity: 0;\n      transition: all 0.4s ease;\n    }\n\n    .form-section:hover {\n      background: rgba(255, 255, 255, 0.72);\n      border-color: transparent;\n      transform: translateY(-3px) scale(1.005);\n      box-shadow: \n        0 0 0 1px rgba(255, 255, 255, 0.9) inset,\n        0 4px 8px rgba(0, 0, 0, 0.03),\n        0 8px 24px rgba(0, 0, 0, 0.06),\n        0 24px 48px rgba(var(--apple-blue), 0.08),\n        0 0 60px rgba(var(--apple-blue), 0.06);\n    }\n\n    .form-section:hover::before {\n      opacity: 1;\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.4) 0%,\n        rgba(var(--apple-purple), 0.3) 50%,\n        rgba(var(--apple-teal), 0.4) 100%);\n    }\n\n    .form-section:hover::after {\n      opacity: 1;\n      background: radial-gradient(\n        ellipse at center,\n        rgba(var(--apple-blue), 0.04) 0%,\n        transparent 70%\n      );\n    }\n\n    /* Focus-within for when form fields inside are focused */\n    .form-section:focus-within {\n      background: rgba(255, 255, 255, 0.78);\n      border-color: transparent;\n      transform: translateY(-2px);\n      box-shadow: \n        0 0 0 1px rgba(255, 255, 255, 1) inset,\n        0 4px 12px rgba(0, 0, 0, 0.04),\n        0 12px 32px rgba(var(--apple-blue), 0.1),\n        0 0 80px rgba(var(--apple-blue), 0.08);\n    }\n\n    .form-section:focus-within::before {\n      opacity: 1;\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.5) 0%,\n        rgba(var(--apple-purple), 0.35) 50%,\n        rgba(var(--apple-teal), 0.45) 100%);\n    }\n\n    .form-section:hover .section-title {\n      color: #0891b2;\n      border-bottom-color: rgba(6, 182, 212, 0.35);\n    }\n\n    .form-section:hover .section-title i {\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(8, 145, 178, 0.16) 100%);\n      color: #0891b2;\n      transform: scale(1.05);\n      box-shadow: 0 4px 12px rgba(6, 182, 212, 0.25);\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       SECTION HEADERS - Premium Typography with Teal Accent\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .section-title {\n      display: flex;\n      align-items: center;\n      gap: 1rem;\n      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n      font-size: 1rem;\n      font-weight: 600;\n      text-transform: none;\n      letter-spacing: -0.01em;\n      color: #0e7490;\n      margin: 0 0 1.5rem;\n      padding-bottom: 1rem;\n      border-bottom: 1px solid rgba(6, 182, 212, 0.2);\n      transition: all 0.3s ease;\n    }\n\n    .section-title i {\n      width: 42px;\n      height: 42px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(8, 145, 178, 0.1) 100%);\n      color: #06b6d4;\n      font-size: 1.25rem;\n      border-radius: 12px;\n      transition: all 0.3s ease;\n      box-shadow: 0 2px 8px rgba(6, 182, 212, 0.15);\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       FORM GRID\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .form-grid {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 1.25rem 1.125rem;\n    }\n\n    @media (min-width: 1320px) {\n      .form-grid {\n        grid-template-columns: repeat(3, minmax(0, 1fr));\n      }\n    }\n\n    .full-row {\n      grid-column: 1 / -1;\n    }\n\n    .form-field {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 0.35rem 0.45rem 0.45rem;\n      border-radius: 12px;\n      background: rgba(255, 255, 255, 0.35);\n      border: 1px solid transparent;\n      transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n      > label {\n        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n        font-size: 0.8125rem;\n        font-weight: 600;\n        color: #475569;\n        letter-spacing: 0.01em;\n        white-space: nowrap;\n        min-width: 110px;\n        flex-shrink: 0;\n        text-align: right;\n        transition: color 0.2s ease;\n      }\n\n      > p-inputgroup,\n      > p-select,\n      > p-inputnumber,\n      > p-datepicker,\n      > input,\n      > textarea {\n        flex: 1;\n        min-width: 0;\n      }\n\n      &:hover {\n        background: rgba(255, 255, 255, 0.5);\n        border-color: rgba(148, 163, 184, 0.16);\n        > label { color: #334155; }\n      }\n\n      &:focus-within {\n        background: rgba(255, 255, 255, 0.72);\n        border-color: rgba(var(--apple-blue), 0.22);\n        box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n        > label { color: #4f46e5; }\n      }\n\n      &.full-row {\n        flex-direction: column;\n        align-items: stretch;\n        > label { text-align: left; min-width: unset; }\n      }\n    }\n\n    .field-error {\n      margin: 0.35rem 0 0;\n      font-size: 0.75rem;\n      color: #b91c1c;\n    }\n\n    .field-link {\n      display: inline-flex;\n      align-items: center;\n      gap: 4px;\n      font-size: 0.75rem;\n      color: #667eea;\n      text-decoration: none;\n      margin-top: 2px;\n      transition: color 200ms;\n\n      i { font-size: 0.65rem; }\n\n      &:hover {\n        color: #4f46e5;\n        text-decoration: underline;\n      }\n    }\n\n    .tab-badge {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      min-width: 18px;\n      height: 18px;\n      padding: 0 4px;\n      margin-left: 4px;\n      border-radius: 9px;\n      background: rgba(102, 126, 234, 0.15);\n      color: #667eea;\n      font-size: 0.7rem;\n      font-weight: 700;\n      line-height: 1;\n    }\n\n    .required {\n      color: rgba(var(--apple-pink), 1);\n      font-weight: 600;\n    }\n\n    .w-full {\n      width: 100%;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       INPUT FIELDS - Premium Glass Inputs\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    :host ::ng-deep .p-inputtext,\n    :host ::ng-deep .p-select,\n    :host ::ng-deep .p-inputnumber,\n    :host ::ng-deep .p-textarea {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;\n      color: #1e293b !important;\n      font-weight: 500 !important;\n      background: rgba(var(--apple-gray-6), 0.5) !important;\n      border: 1px solid rgba(var(--apple-gray-4), 0.4) !important;\n      border-radius: 12px !important;\n      font-size: 0.9375rem !important;\n      padding: 0.75rem 1rem !important;\n      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      box-shadow: \n        inset 0 1px 2px rgba(0, 0, 0, 0.02),\n        0 1px 2px rgba(255, 255, 255, 0.5) !important;\n    }\n\n    :host ::ng-deep .p-inputtext:hover,\n    :host ::ng-deep .p-select:hover,\n    :host ::ng-deep .p-inputnumber:hover,\n    :host ::ng-deep .p-textarea:hover {\n      background: rgba(var(--apple-gray-5), 0.6) !important;\n      border-color: rgba(var(--apple-gray-3), 0.5) !important;\n      box-shadow: \n        inset 0 1px 2px rgba(0, 0, 0, 0.02),\n        0 2px 4px rgba(0, 0, 0, 0.02) !important;\n    }\n\n    :host ::ng-deep .p-inputtext:focus,\n    :host ::ng-deep .p-select:focus,\n    :host ::ng-deep .p-select.p-focus,\n    :host ::ng-deep .p-inputnumber:focus,\n    :host ::ng-deep .p-textarea:focus {\n      background: rgba(255, 255, 255, 0.95) !important;\n      border-color: rgba(var(--apple-blue), 0.5) !important;\n      box-shadow: \n        0 0 0 4px rgba(var(--apple-blue), 0.15),\n        0 4px 12px rgba(var(--apple-blue), 0.1),\n        inset 0 0 0 1px rgba(var(--apple-blue), 0.2) !important;\n      outline: none !important;\n    }\n\n    :host ::ng-deep .p-inputtext::placeholder {\n      color: rgba(var(--apple-gray-1), 0.6);\n      font-weight: 400;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       FORM ACTIONS - Premium Button Styles\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .form-actions {\n      display: flex;\n      justify-content: flex-end;\n      gap: 0.75rem;\n      padding-top: 0.75rem;\n    }\n\n    .form-actions button {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;\n      min-width: 130px;\n      border-radius: 12px !important;\n      font-weight: 600 !important;\n      font-size: 0.9375rem !important;\n      padding: 0.75rem 1.5rem !important;\n      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      letter-spacing: -0.01em !important;\n    }\n\n    :host ::ng-deep .crm-button--ghost {\n      background: rgba(255, 255, 255, 0.7) !important;\n      border: 1px solid rgba(var(--apple-gray-3), 0.5) !important;\n      color: rgba(var(--apple-label), 0.8) !important;\n      box-shadow: \n        0 1px 3px rgba(0, 0, 0, 0.04),\n        inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;\n      backdrop-filter: blur(10px) !important;\n    }\n\n    :host ::ng-deep .crm-button--ghost:hover {\n      background: rgba(255, 255, 255, 0.9) !important;\n      border-color: rgba(var(--apple-gray-2), 0.6) !important;\n      color: rgba(var(--apple-label), 0.95) !important;\n      transform: translateY(-1px) !important;\n      box-shadow: \n        0 2px 8px rgba(0, 0, 0, 0.06),\n        inset 0 1px 0 rgba(255, 255, 255, 1) !important;\n    }\n\n    :host ::ng-deep .crm-button--ghost:active {\n      background: rgba(var(--apple-gray-5), 0.8) !important;\n      transform: translateY(0) scale(0.98) !important;\n    }\n\n    :host ::ng-deep .crm-button--primary {\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 1) 0%, \n        rgba(var(--apple-blue), 0.85) 100%) !important;\n      border: none !important;\n      color: white !important;\n      box-shadow: \n        0 2px 4px rgba(0, 0, 0, 0.1),\n        0 4px 16px rgba(var(--apple-blue), 0.25),\n        inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;\n    }\n\n    :host ::ng-deep .crm-button--primary:hover:not(:disabled) {\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.92) 0%, \n        rgba(var(--apple-blue), 0.78) 100%) !important;\n      transform: translateY(-2px) !important;\n      box-shadow: \n        0 4px 8px rgba(0, 0, 0, 0.12),\n        0 8px 24px rgba(var(--apple-blue), 0.3),\n        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;\n    }\n\n    :host ::ng-deep .crm-button--primary:active:not(:disabled) {\n      transform: translateY(0) scale(0.98) !important;\n      box-shadow: \n        0 1px 3px rgba(0, 0, 0, 0.1),\n        0 2px 8px rgba(var(--apple-blue), 0.2),\n        inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;\n    }\n\n    :host ::ng-deep .crm-button--primary:disabled {\n      background: rgba(var(--apple-gray-4), 0.8) !important;\n      color: rgba(var(--apple-gray-1), 1) !important;\n      box-shadow: none !important;\n      cursor: not-allowed !important;\n      transform: none !important;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       DETAIL SECTIONS - Timeline, Notes, Related, Attachments\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .detail-container {\n      padding-top: 0;\n    }\n\n    /* C8: Lifecycle Stepper */\n    .lifecycle-stepper {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 1rem;\n      padding: 1rem 1.5rem;\n      margin-bottom: 1rem;\n      background: rgba(255, 255, 255, 0.85);\n      backdrop-filter: blur(20px);\n      border: 1px solid rgba(255, 255, 255, 0.3);\n      border-radius: 16px;\n      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n\n      .stepper-track {\n        display: flex;\n        align-items: center;\n        gap: 0;\n        flex: 1;\n      }\n\n      .stepper-step {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        gap: 0.5rem;\n        flex: 1;\n        position: relative;\n\n        .step-indicator {\n          display: flex;\n          align-items: center;\n          width: 100%;\n          justify-content: center;\n\n          .step-dot {\n            width: 36px;\n            height: 36px;\n            border-radius: 50%;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            background: #e5e7eb;\n            color: #9ca3af;\n            font-size: 0.875rem;\n            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n            z-index: 1;\n            flex-shrink: 0;\n          }\n\n          .step-connector {\n            flex: 1;\n            height: 3px;\n            background: #e5e7eb;\n            margin: 0 -4px;\n            transition: background 0.4s ease;\n          }\n        }\n\n        .step-label {\n          font-size: 0.75rem;\n          font-weight: 600;\n          color: #9ca3af;\n          text-transform: uppercase;\n          letter-spacing: 0.05em;\n          transition: color 0.3s ease;\n        }\n\n        &.completed {\n          .step-dot {\n            background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);\n            color: white;\n            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);\n          }\n          .step-connector { background: #22c55e; }\n          .step-label { color: #22c55e; }\n        }\n\n        &.active {\n          .step-dot {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n            box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);\n            transform: scale(1.15);\n          }\n          .step-label {\n            color: #667eea;\n            font-weight: 700;\n          }\n        }\n      }\n\n      .stepper-meta {\n        display: flex;\n        align-items: center;\n        gap: 0.375rem;\n        font-size: 0.8125rem;\n        color: #6b7280;\n        white-space: nowrap;\n\n        i { font-size: 0.75rem; }\n      }\n\n      @media (max-width: 600px) {\n        flex-direction: column;\n        padding: 0.75rem 1rem;\n      }\n    }\n\n    /* C9: Engagement Scoring Breakdown */\n    .engagement-breakdown {\n      padding: 1rem 1.5rem;\n      margin-bottom: 1rem;\n      background: rgba(255, 255, 255, 0.85);\n      backdrop-filter: blur(20px);\n      border: 1px solid rgba(255, 255, 255, 0.3);\n      border-radius: 16px;\n      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n\n      .engagement-header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        margin-bottom: 0.75rem;\n      }\n\n      .engagement-title {\n        display: flex;\n        align-items: center;\n        gap: 0.5rem;\n        font-size: 0.875rem;\n        font-weight: 600;\n        color: #374151;\n\n        i {\n          color: #667eea;\n          font-size: 1rem;\n        }\n      }\n\n      .engagement-total {\n        strong {\n          font-size: 1.375rem;\n          font-weight: 700;\n          background: linear-gradient(135deg, #667eea, #764ba2);\n          -webkit-background-clip: text;\n          -webkit-text-fill-color: transparent;\n          background-clip: text;\n        }\n        span {\n          font-size: 0.8125rem;\n          color: #9ca3af;\n          margin-left: 2px;\n        }\n      }\n\n      .engagement-bars {\n        display: flex;\n        flex-direction: column;\n        gap: 0.5rem;\n      }\n\n      .engagement-bar {\n        .bar-header {\n          display: flex;\n          justify-content: space-between;\n          margin-bottom: 0.25rem;\n        }\n        .bar-label {\n          font-size: 0.75rem;\n          font-weight: 600;\n          color: #6b7280;\n          text-transform: uppercase;\n          letter-spacing: 0.03em;\n        }\n        .bar-value {\n          font-size: 0.75rem;\n          font-weight: 600;\n          color: #374151;\n        }\n        .bar-track {\n          height: 6px;\n          background: #e5e7eb;\n          border-radius: 999px;\n          overflow: hidden;\n        }\n        .bar-fill {\n          height: 100%;\n          border-radius: 999px;\n          transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n        }\n      }\n    }\n\n    .timeline {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .timeline-item {\n      display: grid;\n      grid-template-columns: 120px 1fr;\n      gap: 1rem;\n      padding: 1rem;\n      border-radius: 14px;\n      background: rgba(248, 250, 252, 0.9);\n      border: 1px solid rgba(226, 232, 240, 0.7);\n    }\n\n    .type-dot {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      padding: 0.35rem 0.75rem;\n      border-radius: 999px;\n      font-size: 0.75rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.04em;\n      background: rgba(59, 130, 246, 0.12);\n      color: #1d4ed8;\n    }\n\n    .type-dot[data-type='Call'] { background: rgba(16, 185, 129, 0.15); color: #047857; }\n    .type-dot[data-type='Meeting'] { background: rgba(99, 102, 241, 0.15); color: #4338ca; }\n    .type-dot[data-type='Email'] { background: rgba(251, 146, 60, 0.18); color: #c2410c; }\n    .type-dot[data-type='Task'] { background: rgba(148, 163, 184, 0.2); color: #475569; }\n    .type-dot[data-type='Note'] { background: rgba(236, 72, 153, 0.15); color: #be185d; }\n    .type-dot[data-type='lifecycle'] { background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15)); color: #667eea; }\n\n    .lifecycle-event {\n      border-left: 3px solid #667eea;\n      background: rgba(102, 126, 234, 0.04) !important;\n    }\n\n    .emails-section .empty-hint {\n      font-size: 0.8125rem;\n      color: #667eea;\n      margin-top: 0.375rem;\n    }\n\n    .timeline-title {\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .timeline-meta {\n      color: #64748b;\n      font-size: 0.85rem;\n      margin: 0.25rem 0 0.5rem;\n    }\n\n    .timeline-description {\n      color: #334155;\n    }\n\n    .notes {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .note-editor {\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .note-actions {\n      display: flex;\n      justify-content: flex-end;\n    }\n\n    .note-item {\n      padding: 1rem;\n      border-radius: 14px;\n      background: rgba(248, 250, 252, 0.9);\n      border: 1px solid rgba(226, 232, 240, 0.7);\n    }\n\n    .note-header {\n      display: flex;\n      justify-content: space-between;\n      gap: 1rem;\n      font-weight: 700;\n      color: #1f2937;\n      margin-bottom: 0.5rem;\n    }\n\n    .note-meta {\n      font-weight: 500;\n      color: #94a3b8;\n      font-size: 0.8rem;\n    }\n\n    .note-body {\n      color: #475569;\n      white-space: pre-wrap;\n    }\n\n    .related-grid {\n      display: grid;\n      gap: 1.5rem;\n    }\n\n    .related-summary-strip {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      gap: 1rem;\n      margin-bottom: 1.25rem;\n    }\n\n    .summary-chip {\n      display: grid;\n      gap: 0.35rem;\n      padding: 0.85rem 1rem;\n      border-radius: 16px;\n      background: rgba(255, 255, 255, 0.75);\n      border: 1px solid rgba(226, 232, 240, 0.8);\n      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);\n    }\n\n    .chip-label {\n      font-size: 0.75rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n      font-weight: 600;\n    }\n\n    .chip-value {\n      font-size: 1.4rem;\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .chip-meta {\n      font-size: 0.85rem;\n      color: #475569;\n    }\n\n    .related-section h3 {\n      margin-bottom: 0.75rem;\n      color: #1f2937;\n      font-size: 1rem;\n      font-weight: 700;\n    }\n\n    .account-card {\n      padding: 1rem;\n      border-radius: 14px;\n      background: rgba(248, 250, 252, 0.9);\n      border: 1px solid rgba(226, 232, 240, 0.7);\n    }\n\n    .account-name {\n      font-weight: 700;\n      color: #1f2937;\n    }\n\n    .account-meta {\n      color: #64748b;\n      font-size: 0.9rem;\n      margin-top: 0.25rem;\n    }\n\n    .related-link {\n      color: #2563eb;\n      font-weight: 600;\n      text-decoration: none;\n    }\n\n    .related-link:hover {\n      color: #1d4ed8;\n      text-decoration: underline;\n    }\n\n    .clickable-row {\n      cursor: pointer;\n      transition: background-color 0.15s ease, border-color 0.15s ease;\n    }\n\n    .clickable-row:hover {\n      background: rgba(37, 99, 235, 0.06);\n      border-color: rgba(37, 99, 235, 0.18);\n    }\n\n    .attachments {\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n    }\n\n    .compact-table ::ng-deep .p-datatable-thead > tr > th {\n      font-size: 0.75rem;\n      text-transform: uppercase;\n      letter-spacing: 0.04em;\n      color: #64748b;\n    }\n\n    .table-actions {\n      width: 48px;\n      text-align: right;\n    }\n\n    .empty-state {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 0.35rem;\n      padding: 1.5rem 1rem;\n      color: #94a3b8;\n      font-size: 0.9rem;\n      text-align: center;\n\n      > i {\n        font-size: 1.5rem;\n        opacity: 0.5;\n      }\n\n      .empty-state-link {\n        font-size: 0.82rem;\n        font-weight: 600;\n        color: #6366f1;\n        cursor: pointer;\n        text-decoration: none;\n        transition: color 200ms;\n\n        &:hover { color: #4338ca; }\n      }\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       RESPONSIVE\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    @media (max-width: 768px) {\n      .page-header {\n        padding: 1rem;\n      }\n\n      .form-container {\n        padding: 1rem;\n      }\n\n      .form-section {\n        padding: 1.5rem;\n        border-radius: 16px;\n      }\n\n      .form-grid {\n        grid-template-columns: 1fr;\n        gap: 1rem;\n      }\n\n      .form-actions {\n        flex-direction: column;\n      }\n\n      .form-actions button {\n        width: 100%;\n        min-width: auto;\n      }\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       CUSTOM SCROLLBAR - Premium Style\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    :host {\n      scrollbar-width: thin;\n      scrollbar-color: rgba(var(--apple-gray-2), 0.4) transparent;\n    }\n\n    :host::-webkit-scrollbar {\n      width: 10px;\n    }\n\n    :host::-webkit-scrollbar-track {\n      background: transparent;\n    }\n\n    :host::-webkit-scrollbar-thumb {\n      background: rgba(var(--apple-gray-2), 0.4);\n      border-radius: 5px;\n      border: 3px solid transparent;\n      background-clip: content-box;\n    }\n\n    :host::-webkit-scrollbar-thumb:hover {\n      background: rgba(var(--apple-gray-1), 0.5);\n      background-clip: content-box;\n    }\n\n    /* Selection */\n    ::selection {\n      background: rgba(var(--apple-blue), 0.25);\n      color: inherit;\n    }\n  \n.presence-strip {\n  margin-top: 0.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n\n.presence-focus {\n  margin-top: 0.55rem;\n  display: inline-flex;\n  position: relative;\n  align-items: center;\n  gap: 0.45rem;\n  border-radius: 0.75rem;\n  padding: 0.4rem 0.7rem;\n  font-size: 0.8rem;\n  font-weight: 700;\n  border: 1px solid rgba(14, 165, 233, 0.22);\n  color: #0c4a6e;\n  background: linear-gradient(135deg, rgba(224, 242, 254, 0.95), rgba(186, 230, 253, 0.92));\n  box-shadow: 0 8px 18px rgba(2, 132, 199, 0.18), 0 0 0 1px rgba(125, 211, 252, 0.28) inset;\n  -webkit-user-select: none;\n  user-select: none;\n  caret-color: transparent;\n  cursor: default;\n\n  &::selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  &::-moz-selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  // Glowing comet that orbits OUTSIDE the chip border\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 2rem;\n    height: 2px;\n    border-radius: 999px;\n    background: linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.6) 15%,\n      rgba(255, 255, 255, 1) 50%,\n      rgba(255, 255, 255, 0.6) 85%,\n      transparent 100%\n    );\n    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1))\n            drop-shadow(0 0 5px rgba(186, 230, 253, 0.9))\n            drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))\n            drop-shadow(0 0 18px rgba(14, 165, 233, 0.35));\n    offset-path: inset(0px round 0.75rem);\n    offset-distance: 0%;\n    offset-rotate: auto;\n    animation: presence-border-tail 3.5s linear infinite;\n    will-change: offset-distance;\n    pointer-events: none;\n    z-index: 3;\n  }\n\n  > * {\n    position: relative;\n    z-index: 1;\n  }\n\n  i {\n    color: #0284c7;\n    font-size: 0.85rem;\n  }\n}\n\n@keyframes presence-border-tail {\n  from { offset-distance: 0%; }\n  to   { offset-distance: 100%; }\n}\n\n.presence-label {\n  font-size: 0.75rem;\n  color: #64748b;\n  font-weight: 600;\n}\n\n.presence-chip {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #0f172a;\n  border: 1px solid rgba(14, 165, 233, 0.32);\n  background: rgba(224, 242, 254, 0.8);\n}\n\n.presence-editing-note {\n  margin-top: 0.45rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  border: 1px solid rgba(251, 146, 60, 0.45);\n  background: linear-gradient(135deg, rgba(255, 247, 237, 0.98), rgba(254, 215, 170, 0.85));\n  color: #9a3412;\n  border-radius: 0.65rem;\n  padding: 0.35rem 0.65rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  box-shadow: 0 8px 18px rgba(251, 146, 60, 0.18), 0 0 0 1px rgba(254, 215, 170, 0.32) inset;\n}\n\n// \u2500\u2500 C19: Relationships Tab \u2500\u2500\n.relationships-section {\n  padding: 1rem;\n}\n\n.relationships-loading {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 1rem;\n  color: #6b7280;\n  font-size: 0.875rem;\n\n  i { font-size: 1.1rem; color: #667eea; }\n}\n\n.relationship-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.relationship-item {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background: rgba(255, 255, 255, 0.6);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 0.75rem;\n  transition: all 250ms;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.85);\n    transform: translateY(-1px);\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n  }\n}\n\n.relationship-icon {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.5rem;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  font-size: 1rem;\n  flex-shrink: 0;\n}\n\n.relationship-info {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n\n.relationship-name {\n  font-weight: 600;\n  font-size: 0.9375rem;\n  color: #1f2937;\n}\n\n.relationship-type {\n  font-size: 0.8125rem;\n  color: #6b7280;\n  text-transform: capitalize;\n}\n\n.relationship-detail {\n  font-size: 0.8125rem;\n  color: #9ca3af;\n}\n\n// \u2500\u2500 C15: Duplicate Detection Dialog \u2500\u2500\n.duplicate-note {\n  font-size: 0.9375rem;\n  color: #4b5563;\n  margin: 0 0 1rem;\n  line-height: 1.5;\n}\n\n.duplicate-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.duplicate-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0.75rem 1rem;\n  background: rgba(245, 158, 11, 0.06);\n  border: 1px solid rgba(245, 158, 11, 0.2);\n  border-radius: 0.75rem;\n\n  &:hover {\n    background: rgba(245, 158, 11, 0.1);\n  }\n}\n\n.duplicate-info {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n\n  strong {\n    font-size: 0.9375rem;\n    color: #1f2937;\n  }\n}\n\n.duplicate-email,\n.duplicate-phone {\n  font-size: 0.8125rem;\n  color: #6b7280;\n}\n\n.duplicate-score {\n  font-size: 0.875rem;\n  font-weight: 700;\n  color: #f59e0b;\n  white-space: nowrap;\n}\n"] }]
    }], null, { onCollaborativeEditingActivity: [{
            type: HostListener,
            args: ['input']
        }, {
            type: HostListener,
            args: ['change']
        }], onBeforeUnload: [{
            type: HostListener,
            args: ['window:beforeunload', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ContactFormPage, { className: "ContactFormPage", filePath: "src/app/crm/features/contacts/pages/contact-form.page.ts", lineNumber: 74 }); })();
