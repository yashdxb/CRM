import { ChangeDetectorRef, Component, HostListener, computed, inject, signal } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { AccordionModule } from 'primeng/accordion';
import { TabsModule } from 'primeng/tabs';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ChartModule } from 'primeng/chart';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { KnobModule } from 'primeng/knob';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Subject, map, of, switchMap, takeUntil } from 'rxjs';
import { OpportunityDataService } from '../services/opportunity-data.service';
import { OpportunityApprovalService } from '../services/opportunity-approval.service';
import { OpportunityReviewChecklistService } from '../services/opportunity-review-checklist.service';
import { OpportunityOnboardingService } from '../services/opportunity-onboarding.service';
import { CustomerDataService } from '../../customers/services/customer-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { ActivityDataService } from '../../activities/services/activity-data.service';
import { ContactDataService } from '../../contacts/services/contact-data.service';
import { AttachmentDataService } from '../../../../shared/services/attachment-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { readTokenContext, readUserId, tokenHasPermission, tokenHasRole } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { environment } from '../../../../../environments/environment';
import { FormDraftService } from '../../../../core/drafts/form-draft.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@angular/router";
import * as i4 from "primeng/button";
import * as i5 from "primeng/api";
import * as i6 from "primeng/inputtext";
import * as i7 from "primeng/inputnumber";
import * as i8 from "primeng/textarea";
import * as i9 from "primeng/select";
import * as i10 from "primeng/datepicker";
import * as i11 from "primeng/accordion";
import * as i12 from "primeng/tabs";
import * as i13 from "primeng/dialog";
import * as i14 from "primeng/table";
import * as i15 from "primeng/fileupload";
import * as i16 from "primeng/chart";
import * as i17 from "primeng/inputgroup";
import * as i18 from "primeng/inputgroupaddon";
import * as i19 from "primeng/knob";
import * as i20 from "primeng/splitbutton";
const _c0 = () => ({ width: "38rem", maxWidth: "96vw" });
const _c1 = () => ({ width: "28rem", maxWidth: "94vw" });
const _c2 = () => ({ width: "36rem", maxWidth: "96vw" });
const _c3 = () => ({ width: "42rem", maxWidth: "96vw" });
const _c4 = () => ({ width: "42rem", maxWidth: "95vw" });
const _c5 = () => ({ class: "deal-tab" });
const _c6 = a0 => ({ root: a0 });
const _c7 = () => ({ width: "34rem", maxWidth: "95vw" });
const _c8 = () => ({ standalone: true });
function OpportunityFormPage_div_11_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 202)(1, "span", 203);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 204);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 205)(6, "button", 206);
    i0.ɵɵlistener("click", function OpportunityFormPage_div_11_div_1_Template_button_click_6_listener() { const draft_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.loadDraftFromPrompt(draft_r3)); });
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
function OpportunityFormPage_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 200);
    i0.ɵɵtemplate(1, OpportunityFormPage_div_11_div_1_Template, 8, 3, "div", 201);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.recentDrafts());
} }
function OpportunityFormPage_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 207);
    i0.ɵɵtext(1, "No saved drafts available.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 207);
    i0.ɵɵtext(1, "No saved drafts yet.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_div_42_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 202)(1, "span", 203);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 204);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 205)(6, "button", 206);
    i0.ɵɵlistener("click", function OpportunityFormPage_div_42_div_1_Template_button_click_6_listener() { const draft_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.openDraftFromSummary(draft_r6)); });
    i0.ɵɵtext(7, "Resume");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 208);
    i0.ɵɵlistener("click", function OpportunityFormPage_div_42_div_1_Template_button_click_8_listener($event) { const draft_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.discardDraft(draft_r6, $event)); });
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
function OpportunityFormPage_div_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 200);
    i0.ɵɵtemplate(1, OpportunityFormPage_div_42_div_1_Template, 10, 3, "div", 201);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.draftLibraryItems());
} }
function OpportunityFormPage_div_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 209)(1, "div", 210);
    i0.ɵɵelement(2, "p-knob", 211);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 212)(4, "span", 213);
    i0.ɵɵtext(5, "Overall deal score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 214)(7, "span", 215);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 216);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p", 217);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngModel", ctx_r3.dealHeaderScoreValue())("readonly", true)("valueTemplate", "{value}%")("size", 92)("strokeWidth", 9)("showValue", true)("min", 0)("max", 100);
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("--deal-header-score-color", ctx_r3.dealHeaderScoreColor());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.selectedStage || "Prospecting");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.dealHeaderStageSummary());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.dealHeaderScoreMessage());
} }
function OpportunityFormPage_div_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 218);
    i0.ɵɵelement(1, "i", 34);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const draftStatus_r7 = ctx.ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(draftStatus_r7);
} }
function OpportunityFormPage_div_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 219);
    i0.ɵɵelement(1, "i", 143);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "This form is loaded from a saved draft. Final Save will create or update the live CRM record.");
    i0.ɵɵelementEnd()();
} }
function OpportunityFormPage_div_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 220);
    i0.ɵɵelement(1, "i", 221);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.viewingPresenceSummary());
} }
function OpportunityFormPage_div_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 222);
    i0.ɵɵelement(1, "i", 223);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r3.editingPresenceSummary());
} }
function OpportunityFormPage_div_73_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 226)(1, "button", 227);
    i0.ɵɵlistener("click", function OpportunityFormPage_div_73_div_7_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r8); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.requestStageOverride()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("label", ctx_r3.stageOverrideRequesting() ? "Submitting..." : "Request Stage Override")("loading", ctx_r3.stageOverrideRequesting())("disabled", ctx_r3.stageOverrideRequesting());
} }
function OpportunityFormPage_div_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 224);
    i0.ɵɵelement(1, "i", 92);
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4, "Policy gate triggered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, OpportunityFormPage_div_73_div_7_Template, 2, 3, "div", 225);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const gateMessage_r9 = ctx.ngIf;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(gateMessage_r9);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.canRequestStageOverride());
} }
function OpportunityFormPage_section_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 228);
    i0.ɵɵelement(1, "i", 221);
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4, "Decision review mode");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "This record is opened from Pending Action in read-only mode. Use the review panel to decide or send back.");
    i0.ɵɵelementEnd()()();
} }
function OpportunityFormPage_section_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 229);
    i0.ɵɵelement(1, "i", 95);
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4, "Approval Pending - Record Locked");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "This deal is read-only for all users until the pending approval is approved or rejected.");
    i0.ɵɵelementEnd()()();
} }
function OpportunityFormPage_section_76_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 233)(1, "a", 234);
    i0.ɵɵelement(2, "i", 235);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const link_r10 = ctx.ngIf;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", link_r10);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Account: ", ctx_r3.accountLabel(), " ");
} }
function OpportunityFormPage_section_76_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 236);
    i0.ɵɵtext(1, "No linked account yet.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_section_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 230)(1, "div", 231);
    i0.ɵɵtext(2, "Related record");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, OpportunityFormPage_section_76_div_3_Template, 4, 2, "div", 232)(4, OpportunityFormPage_section_76_ng_template_4_Template, 2, 0, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const noAccountSummary_r11 = i0.ɵɵreference(5);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.accountLink())("ngIfElse", noAccountSummary_r11);
} }
function OpportunityFormPage_For_133_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-tab", 237)(1, "span", 238);
    i0.ɵɵelement(2, "i");
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const tab_r12 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", tab_r12)("pt", i0.ɵɵpureFunction1(6, _c6, i0.ɵɵpureFunction0(5, _c5)));
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r3.tabMeta[tab_r12].icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.tabMeta[tab_r12].label);
} }
function OpportunityFormPage_For_133_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, OpportunityFormPage_For_133_Conditional_0_Template, 5, 8, "p-tab", 237);
} if (rf & 2) {
    const tab_r12 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵconditional(ctx_r3.isTabVisible(tab_r12) ? 0 : -1);
} }
function OpportunityFormPage_p_160_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 239);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.dealNameError());
} }
function OpportunityFormPage_small_169_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 240);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const stageHint_r13 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(stageHint_r13);
} }
function OpportunityFormPage_small_170_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 240);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const guidance_r14 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(guidance_r14);
} }
function OpportunityFormPage_small_171_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 240);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const discoveryGuidance_r15 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(discoveryGuidance_r15);
} }
function OpportunityFormPage_small_172_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 240);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const decisionGuidance_r16 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(decisionGuidance_r16);
} }
function OpportunityFormPage_small_173_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 240);
    i0.ɵɵtext(1, "Commit requires an expected close date and verified checklist items.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_small_199_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 240);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.amountApprovalBadge().detail);
} }
function OpportunityFormPage_small_212_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 240);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const guidance_r17 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(guidance_r17);
} }
function OpportunityFormPage_small_236_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 240);
    i0.ɵɵtext(1, "Required before moving to Qualification or later stages.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_span_240_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 111);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_span_245_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 111);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_span_250_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 111);
    i0.ɵɵtext(1, "*");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_small_275_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 240);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.discountApprovalBadge().detail);
} }
function OpportunityFormPage_p_accordion_panel_284_span_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 240);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Quote #", ctx_r3.activeQuote.quoteNumber);
} }
function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_ng_template_2_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 309);
    i0.ɵɵtext(1, "Inactive");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 305)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 306)(4, "span", 307);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, OpportunityFormPage_p_accordion_panel_284_div_64_div_15_ng_template_2_span_6_Template, 2, 0, "span", 308);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r22 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r22.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", option_r22.itemType === "Service" ? "service" : "product");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r22.itemType || "Product", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", option_r22.inactive);
} }
function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_ng_template_3_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 305)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 306)(4, "span", 307);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const option_r23 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r23.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", option_r23.itemType === "Service" ? "service" : "product");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r23.itemType || "Product", " ");
} }
function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_ng_template_3_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 312);
    i0.ɵɵtext(1, "Item");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, OpportunityFormPage_p_accordion_panel_284_div_64_div_15_ng_template_3_div_0_Template, 6, 3, "div", 310)(1, OpportunityFormPage_p_accordion_panel_284_div_64_div_15_ng_template_3_span_1_Template, 2, 0, "span", 311);
} if (rf & 2) {
    const option_r23 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r23);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r23);
} }
function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 294)(1, "p-select", 295);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_Template_p_select_ngModelChange_1_listener($event) { const line_r20 = i0.ɵɵrestoreView(_r19).$implicit; i0.ɵɵtwoWayBindingSet(line_r20.itemMasterId, $event) || (line_r20.itemMasterId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_Template_p_select_ngModelChange_1_listener() { const i_r21 = i0.ɵɵrestoreView(_r19).index; const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.onQuoteItemChanged(i_r21)); });
    i0.ɵɵtemplate(2, OpportunityFormPage_p_accordion_panel_284_div_64_div_15_ng_template_2_Template, 7, 4, "ng-template", 296)(3, OpportunityFormPage_p_accordion_panel_284_div_64_div_15_ng_template_3_Template, 2, 2, "ng-template", 297);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 298);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_Template_input_ngModelChange_4_listener($event) { const line_r20 = i0.ɵɵrestoreView(_r19).$implicit; i0.ɵɵtwoWayBindingSet(line_r20.description, $event) || (line_r20.description = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_Template_input_ngModelChange_4_listener() { i0.ɵɵrestoreView(_r19); const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.onQuoteLineChanged()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p-inputNumber", 299);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_Template_p_inputNumber_ngModelChange_5_listener($event) { const line_r20 = i0.ɵɵrestoreView(_r19).$implicit; i0.ɵɵtwoWayBindingSet(line_r20.quantity, $event) || (line_r20.quantity = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_Template_p_inputNumber_ngModelChange_5_listener() { i0.ɵɵrestoreView(_r19); const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.onQuoteLineChanged()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p-inputNumber", 300);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_Template_p_inputNumber_ngModelChange_6_listener($event) { const line_r20 = i0.ɵɵrestoreView(_r19).$implicit; i0.ɵɵtwoWayBindingSet(line_r20.unitPrice, $event) || (line_r20.unitPrice = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_Template_p_inputNumber_ngModelChange_6_listener() { i0.ɵɵrestoreView(_r19); const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.onQuoteLineChanged()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p-inputNumber", 301);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_Template_p_inputNumber_ngModelChange_7_listener($event) { const line_r20 = i0.ɵɵrestoreView(_r19).$implicit; i0.ɵɵtwoWayBindingSet(line_r20.discountPercent, $event) || (line_r20.discountPercent = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_Template_p_inputNumber_ngModelChange_7_listener() { i0.ɵɵrestoreView(_r19); const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.onQuoteLineChanged()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "p-inputNumber", 302);
    i0.ɵɵelementStart(9, "button", 303);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_284_div_64_div_15_Template_button_click_9_listener() { const i_r21 = i0.ɵɵrestoreView(_r19).index; const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.removeQuoteLine(i_r21)); });
    i0.ɵɵelement(10, "i", 304);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const line_r20 = ctx.$implicit;
    const i_r21 = ctx.index;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("quoteItem", i_r21))("options", ctx_r3.itemOptionsForLine(line_r20));
    i0.ɵɵtwoWayProperty("ngModel", line_r20.itemMasterId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("quoteDescription", i_r21));
    i0.ɵɵtwoWayProperty("ngModel", line_r20.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("quoteQty", i_r21));
    i0.ɵɵtwoWayProperty("ngModel", line_r20.quantity);
    i0.ɵɵproperty("min", 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("quoteUnitPrice", i_r21));
    i0.ɵɵtwoWayProperty("ngModel", line_r20.unitPrice);
    i0.ɵɵproperty("currency", ctx_r3.resolveCurrency(ctx_r3.quoteCurrency || ctx_r3.form.currency));
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("quoteDiscount", i_r21));
    i0.ɵɵtwoWayProperty("ngModel", line_r20.discountPercent);
    i0.ɵɵproperty("min", 0)("max", 100);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", line_r20.lineTotal)("ngModelOptions", i0.ɵɵpureFunction0(24, _c8))("disabled", true)("currency", ctx_r3.resolveCurrency(ctx_r3.quoteCurrency || ctx_r3.form.currency));
} }
function OpportunityFormPage_p_accordion_panel_284_div_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 291)(1, "div", 292)(2, "span");
    i0.ɵɵtext(3, "Product");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Qty");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "Unit Price");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11, "Disc %");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13, "Total");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(14, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, OpportunityFormPage_p_accordion_panel_284_div_64_div_15_Template, 11, 25, "div", 293);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("ngForOf", ctx_r3.quoteLines);
} }
function OpportunityFormPage_p_accordion_panel_284_ng_template_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 313);
    i0.ɵɵtext(1, "No quote lines yet. Add products to build this quote.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_284_div_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 314)(1, "div", 315)(2, "span", 316);
    i0.ɵɵtext(3, "Proposal file ready");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "a", 317);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 318);
    i0.ɵɵelement(7, "a", 319)(8, "a", 320);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const proposalUrl_r24 = ctx.ngIf;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("href", proposalUrl_r24, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.form.proposalLink, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("href", proposalUrl_r24, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("href", proposalUrl_r24, i0.ɵɵsanitizeUrl);
} }
function OpportunityFormPage_p_accordion_panel_284_div_78_div_3_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const event_r25 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("to ", event_r25.newValue);
} }
function OpportunityFormPage_p_accordion_panel_284_div_78_div_3_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const event_r25 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("by ", event_r25.changedByName);
} }
function OpportunityFormPage_p_accordion_panel_284_div_78_div_3_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 329);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_284_div_78_div_3_button_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r26); const event_r25 = i0.ɵɵnextContext().$implicit; const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.resendProposalFromActivity(event_r25)); });
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_284_div_78_div_3_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 330);
    i0.ɵɵelement(1, "i", 331);
    i0.ɵɵtext(2, " Resent just now ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_284_div_78_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 323)(1, "div", 324);
    i0.ɵɵtext(2);
    i0.ɵɵtemplate(3, OpportunityFormPage_p_accordion_panel_284_div_78_div_3_span_3_Template, 2, 1, "span", 325);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 326)(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, OpportunityFormPage_p_accordion_panel_284_div_78_div_3_span_8_Template, 2, 1, "span", 325)(9, OpportunityFormPage_p_accordion_panel_284_div_78_div_3_button_9_Template, 1, 0, "button", 327)(10, OpportunityFormPage_p_accordion_panel_284_div_78_div_3_span_10_Template, 3, 0, "span", 328);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const event_r25 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.proposalActivityLabel(event_r25), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", event_r25.field === "ProposalSentTo" && event_r25.newValue);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(7, 6, event_r25.createdAtUtc, "medium"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", event_r25.changedByName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", event_r25.action === "ProposalSent" && ctx_r3.isLatestProposalSentEvent(event_r25));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isRecentlyResentEvent(event_r25));
} }
function OpportunityFormPage_p_accordion_panel_284_div_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 321)(1, "h5");
    i0.ɵɵtext(2, "Proposal activity");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, OpportunityFormPage_p_accordion_panel_284_div_78_div_3_Template, 11, 9, "div", 322);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r3.proposalActivityTimeline());
} }
function OpportunityFormPage_p_accordion_panel_284_p_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 332);
    i0.ɵɵtext(1, " Generate proposal first to enable sending. ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_284_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-accordion-panel", 241)(1, "p-accordion-header")(2, "div", 103)(3, "span", 104);
    i0.ɵɵelement(4, "i", 242);
    i0.ɵɵtext(5, " Quote / Proposal ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 105)(7, "span", 106);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 106);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(11, "p-accordion-content")(12, "section", 107)(13, "p", 243);
    i0.ɵɵtext(14, "Generate and track the proposal before sending to the customer.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 108)(16, "div", 109)(17, "label", 244);
    i0.ɵɵtext(18, "Proposal status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p-select", 245);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_Template_p_select_ngModelChange_19_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form.proposalStatus, $event) || (ctx_r3.form.proposalStatus = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 109)(21, "label", 246);
    i0.ɵɵtext(22, "Proposal link");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "p-inputgroup")(24, "p-inputgroup-addon", 247);
    i0.ɵɵelement(25, "i", 248);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "input", 249);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_Template_input_ngModelChange_26_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form.proposalLink, $event) || (ctx_r3.form.proposalLink = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(27, "div", 109)(28, "label", 250);
    i0.ɵɵtext(29, "Generated on");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "p-datePicker", 251);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_Template_p_datePicker_ngModelChange_30_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form.proposalGeneratedAtUtc, $event) || (ctx_r3.form.proposalGeneratedAtUtc = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div", 109)(32, "label", 252);
    i0.ɵɵtext(33, "Sent on");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "p-datePicker", 253);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_Template_p_datePicker_ngModelChange_34_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form.proposalSentAtUtc, $event) || (ctx_r3.form.proposalSentAtUtc = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "div", 145)(36, "label", 254);
    i0.ɵɵtext(37, "Proposal summary");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "textarea", 255);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_Template_textarea_ngModelChange_38_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form.proposalNotes, $event) || (ctx_r3.form.proposalNotes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(39, "div", 256)(40, "div", 257)(41, "h4");
    i0.ɵɵtext(42, "Quote Workspace");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(43, OpportunityFormPage_p_accordion_panel_284_span_43_Template, 2, 1, "span", 120);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "div", 108)(45, "div", 109)(46, "label", 258);
    i0.ɵɵtext(47, "Quote draft");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "p-select", 259);
    i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_Template_p_select_ngModelChange_48_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onQuoteSelectionChange($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(49, "div", 109)(50, "label", 260);
    i0.ɵɵtext(51, "Quote name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "p-inputgroup")(53, "p-inputgroup-addon", 112);
    i0.ɵɵelement(54, "i", 113);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "input", 261);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_Template_input_ngModelChange_55_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.quoteName, $event) || (ctx_r3.quoteName = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(56, "div", 109)(57, "label", 262);
    i0.ɵɵtext(58, "Price list");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "p-select", 263);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_Template_p_select_ngModelChange_59_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.quotePriceListId, $event) || (ctx_r3.quotePriceListId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(60, "div", 109)(61, "label", 264);
    i0.ɵɵtext(62, "Tax amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "p-inputNumber", 265);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_Template_p_inputNumber_ngModelChange_63_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.quoteTaxAmount, $event) || (ctx_r3.quoteTaxAmount = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(64, OpportunityFormPage_p_accordion_panel_284_div_64_Template, 16, 1, "div", 266)(65, OpportunityFormPage_p_accordion_panel_284_ng_template_65_Template, 2, 0, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementStart(67, "div", 267)(68, "span");
    i0.ɵɵtext(69);
    i0.ɵɵpipe(70, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(71, "span");
    i0.ɵɵtext(72);
    i0.ɵɵpipe(73, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(74, "span");
    i0.ɵɵtext(75);
    i0.ɵɵpipe(76, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(77, OpportunityFormPage_p_accordion_panel_284_div_77_Template, 9, 4, "div", 268)(78, OpportunityFormPage_p_accordion_panel_284_div_78_Template, 4, 1, "div", 269);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(79, "div", 270)(80, "button", 271);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_284_Template_button_click_80_listener() { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.addQuoteLine()); });
    i0.ɵɵelement(81, "i", 272);
    i0.ɵɵtext(82, " Add line ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(83, "button", 273);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_284_Template_button_click_83_listener() { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.saveQuoteAsDraft()); });
    i0.ɵɵelement(84, "i", 274);
    i0.ɵɵtext(85, " Save quote ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(86, "button", 275);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_284_Template_button_click_86_listener() { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.submitQuoteForApproval()); });
    i0.ɵɵelement(87, "i", 276);
    i0.ɵɵtext(88, " Submit for approval ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(89, "button", 275);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_284_Template_button_click_89_listener() { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.generateProposal()); });
    i0.ɵɵelement(90, "i", 277);
    i0.ɵɵtext(91);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(92, "button", 275);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_284_Template_button_click_92_listener() { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.openSendProposalDialog()); });
    i0.ɵɵelement(93, "i", 278);
    i0.ɵɵtext(94);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(95, OpportunityFormPage_p_accordion_panel_284_p_95_Template, 2, 0, "p", 279);
    i0.ɵɵelementStart(96, "p-dialog", 280);
    i0.ɵɵtwoWayListener("visibleChange", function OpportunityFormPage_p_accordion_panel_284_Template_p_dialog_visibleChange_96_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.proposalSendDialogVisible, $event) || (ctx_r3.proposalSendDialogVisible = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementStart(97, "div", 281)(98, "div", 109)(99, "label", 282);
    i0.ɵɵtext(100, "Recipient email (optional)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(101, "p-inputgroup")(102, "p-inputgroup-addon", 283);
    i0.ɵɵelement(103, "i", 284);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(104, "input", 285);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_Template_input_ngModelChange_104_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.proposalSendRecipient, $event) || (ctx_r3.proposalSendRecipient = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(105, "div", 109)(106, "label", 286);
    i0.ɵɵtext(107, "Message (optional)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(108, "textarea", 287);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_284_Template_textarea_ngModelChange_108_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.proposalSendMessage, $event) || (ctx_r3.proposalSendMessage = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(109, "div", 288)(110, "button", 289);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_284_Template_button_click_110_listener() { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.proposalSendDialogVisible = false); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(111, "button", 290);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_284_Template_button_click_111_listener() { i0.ɵɵrestoreView(_r18); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.markProposalSent()); });
    i0.ɵɵelementEnd()()()()()()();
} if (rf & 2) {
    const emptyQuoteLines_r27 = i0.ɵɵreference(66);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r3.isSectionLocked("quote-proposal"));
    i0.ɵɵattribute("data-deal-section", "quote-proposal");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r3.proposalHeaderBadge());
    i0.ɵɵadvance();
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.sectionStatusTone("quote-proposal"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.sectionStatusLabel("quote-proposal"), " ");
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("options", ctx_r3.proposalStatusOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.proposalStatus);
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.proposalLink);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.proposalGeneratedAtUtc);
    i0.ɵɵproperty("showIcon", true);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.proposalSentAtUtc);
    i0.ɵɵproperty("showIcon", true);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.proposalNotes);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r3.activeQuote);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("options", ctx_r3.quoteSummaries)("showClear", true)("ngModel", ctx_r3.selectedQuoteId);
    i0.ɵɵadvance(7);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.quoteName);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r3.priceListOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.quotePriceListId);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.quoteTaxAmount);
    i0.ɵɵproperty("currency", ctx_r3.resolveCurrency(ctx_r3.quoteCurrency || ctx_r3.form.currency));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.quoteLines.length)("ngIfElse", emptyQuoteLines_r27);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("Subtotal: ", i0.ɵɵpipeBind2(70, 48, ctx_r3.quoteSubtotal(), "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Discount: ", i0.ɵɵpipeBind2(73, 51, ctx_r3.quoteDiscountAmount(), "1.2-2"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Total: ", i0.ɵɵpipeBind2(76, 54, ctx_r3.quoteTotal(), "1.2-2"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r3.proposalPreviewUrl());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.proposalActivityTimeline().length);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r3.quoteSaving());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r3.quoteApprovalSubmitting() || !ctx_r3.selectedQuoteId);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r3.proposalGenerating() || !ctx_r3.selectedQuoteId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.proposalGenerating() ? "Generating..." : "Generate proposal", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r3.proposalSending() || !ctx_r3.selectedQuoteId || !ctx_r3.proposalPreviewUrl());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r3.proposalSending() ? "Sending..." : "Send proposal", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.selectedQuoteId && !ctx_r3.proposalPreviewUrl());
    i0.ɵɵadvance();
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(57, _c7));
    i0.ɵɵtwoWayProperty("visible", ctx_r3.proposalSendDialogVisible);
    i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false);
    i0.ɵɵadvance(8);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.proposalSendRecipient);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.proposalSendMessage);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("label", i0.ɵɵinterpolate(ctx_r3.proposalSending() ? "Sending..." : "Send proposal"))("disabled", ctx_r3.proposalSending());
} }
function OpportunityFormPage_div_297_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 344)(1, "span", 336);
    i0.ɵɵtext(2, "Discount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 337);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "currency");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(5, 1, ctx_r3.forecastMetrics().discount, ctx_r3.form.currency, "symbol", "1.0-0"));
} }
function OpportunityFormPage_div_297_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 333)(1, "div", 334)(2, "div", 335)(3, "span", 336);
    i0.ɵɵtext(4, "Deal Value");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "strong", 337);
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 338)(9, "span", 336);
    i0.ɵɵtext(10, "Net Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "strong", 337);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 339)(15, "span", 336);
    i0.ɵɵtext(16, "Weighted Revenue");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "strong", 337);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "currency");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(20, OpportunityFormPage_div_297_div_20_Template, 6, 6, "div", 340);
    i0.ɵɵelementStart(21, "div", 341)(22, "span", 336);
    i0.ɵɵtext(23, "Win Probability");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "strong", 337);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(26, "div", 342);
    i0.ɵɵelement(27, "p-chart", 343);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(7, 7, ctx_r3.forecastMetrics().amount, ctx_r3.form.currency, "symbol", "1.0-0"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(13, 12, ctx_r3.forecastMetrics().netAmount, ctx_r3.form.currency, "symbol", "1.0-0"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(19, 17, ctx_r3.forecastMetrics().weightedValue, ctx_r3.form.currency, "symbol", "1.0-0"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r3.forecastMetrics().discount > 0);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r3.forecastMetrics().probability, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("data", ctx_r3.forecastChartData())("options", ctx_r3.forecastChartOptions);
} }
function OpportunityFormPage_ng_template_298_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 345);
    i0.ɵɵelement(1, "i", 162);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Enter a deal amount to see the revenue forecast.");
    i0.ɵɵelementEnd()();
} }
function OpportunityFormPage_p_accordion_panel_302_ng_container_12_div_4_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r29 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 356)(1, "p-select", 357);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_302_ng_container_12_div_4_div_1_Template_p_select_ngModelChange_1_listener($event) { const i_r30 = i0.ɵɵrestoreView(_r29).index; const ctx_r3 = i0.ɵɵnextContext(4); i0.ɵɵtwoWayBindingSet(ctx_r3.teamMembers[i_r30].userId, $event) || (ctx_r3.teamMembers[i_r30].userId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_p_accordion_panel_302_ng_container_12_div_4_div_1_Template_p_select_ngModelChange_1_listener() { i0.ɵɵrestoreView(_r29); const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.markTeamDirty()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p-select", 358);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_302_ng_container_12_div_4_div_1_Template_p_select_ngModelChange_2_listener($event) { const i_r30 = i0.ɵɵrestoreView(_r29).index; const ctx_r3 = i0.ɵɵnextContext(4); i0.ɵɵtwoWayBindingSet(ctx_r3.teamMembers[i_r30].role, $event) || (ctx_r3.teamMembers[i_r30].role = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_p_accordion_panel_302_ng_container_12_div_4_div_1_Template_p_select_ngModelChange_2_listener() { i0.ɵɵrestoreView(_r29); const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.markTeamDirty()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 303);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_302_ng_container_12_div_4_div_1_Template_button_click_3_listener() { const i_r30 = i0.ɵɵrestoreView(_r29).index; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.removeTeamMember(i_r30)); });
    i0.ɵɵelement(4, "i", 304);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const i_r30 = ctx.index;
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("teamUser", i_r30))("options", ctx_r3.teamMemberOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.teamMembers[i_r30].userId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("teamRole", i_r30))("options", ctx_r3.teamRoleOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.teamMembers[i_r30].role);
} }
function OpportunityFormPage_p_accordion_panel_302_ng_container_12_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 354);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_302_ng_container_12_div_4_div_1_Template, 5, 8, "div", 355);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.teamMembers);
} }
function OpportunityFormPage_p_accordion_panel_302_ng_container_12_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 313);
    i0.ɵɵtext(1, "No pre-sales teammates yet.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_302_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 107)(2, "p", 243);
    i0.ɵɵtext(3, "Track solution partners and demo owners supporting this deal.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, OpportunityFormPage_p_accordion_panel_302_ng_container_12_div_4_Template, 2, 1, "div", 349)(5, OpportunityFormPage_p_accordion_panel_302_ng_container_12_ng_template_5_Template, 2, 0, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementStart(7, "div", 270)(8, "button", 271);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_302_ng_container_12_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r28); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.addTeamMember()); });
    i0.ɵɵelement(9, "i", 272);
    i0.ɵɵtext(10, " Add teammate ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 108)(12, "div", 145)(13, "label", 350);
    i0.ɵɵtext(14, "Scope summary");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "textarea", 351);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_302_ng_container_12_Template_textarea_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r28); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form.preSalesScope, $event) || (ctx_r3.form.preSalesScope = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 145)(17, "label", 352);
    i0.ɵɵtext(18, "Approach / solution outline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "textarea", 353);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_302_ng_container_12_Template_textarea_ngModelChange_19_listener($event) { i0.ɵɵrestoreView(_r28); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form.preSalesApproach, $event) || (ctx_r3.form.preSalesApproach = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const emptyTeam_r31 = i0.ɵɵreference(6);
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r3.teamMembers.length)("ngIfElse", emptyTeam_r31);
    i0.ɵɵadvance(11);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.preSalesScope);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.preSalesApproach);
} }
function OpportunityFormPage_p_accordion_panel_302_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 359)(1, "p", 360);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.isSectionLoading("pre-sales-team") ? "Loading pre-sales team\u2026" : "Open section to load pre-sales team.");
} }
function OpportunityFormPage_p_accordion_panel_302_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-accordion-panel", 346)(1, "p-accordion-header")(2, "div", 103)(3, "span", 104);
    i0.ɵɵelement(4, "i", 347);
    i0.ɵɵtext(5, " Pre-Sales Team ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 105)(7, "span", 106);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 106);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(11, "p-accordion-content");
    i0.ɵɵtemplate(12, OpportunityFormPage_p_accordion_panel_302_ng_container_12_Template, 20, 4, "ng-container", 348)(13, OpportunityFormPage_p_accordion_panel_302_ng_template_13_Template, 3, 1, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const preSalesLoading_r32 = i0.ɵɵreference(14);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r3.isSectionLocked("pre-sales-team"));
    i0.ɵɵattribute("data-deal-section", "pre-sales-team");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r3.preSalesTeamHeaderBadge());
    i0.ɵɵadvance();
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.sectionStatusTone("pre-sales-team"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.sectionStatusLabel("pre-sales-team"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r3.isEditMode() || ctx_r3.isSectionLoaded("pre-sales-team"))("ngIfElse", preSalesLoading_r32);
} }
function OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_17_Template(rf, ctx) { if (rf & 1) {
    const _r34 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 375)(1, "input", 376);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_17_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r34); const ctx_r3 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r3.stakeholderNotes, $event) || (ctx_r3.stakeholderNotes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.stakeholderNotes);
} }
function OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 377);
    i0.ɵɵelement(1, "i", 378);
    i0.ɵɵtext(2, " Loading stakeholders\u2026 ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_19_div_1_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 393);
    i0.ɵɵtext(1, "Primary");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_19_div_1_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const role_r36 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(role_r36.jobTitle);
} }
function OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_19_div_1_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const role_r36 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2022 ", role_r36.email);
} }
function OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_19_div_1_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 394);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const role_r36 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(role_r36.notes);
} }
function OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_19_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r35 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 381)(1, "div", 382);
    i0.ɵɵelement(2, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 383)(4, "div", 384)(5, "span", 385);
    i0.ɵɵtext(6);
    i0.ɵɵtemplate(7, OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_19_div_1_span_7_Template, 2, 0, "span", 386);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 387);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 388);
    i0.ɵɵtemplate(11, OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_19_div_1_span_11_Template, 2, 1, "span", 325)(12, OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_19_div_1_span_12_Template, 2, 1, "span", 325);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_19_div_1_div_13_Template, 2, 1, "div", 389);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 390)(15, "button", 391);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_19_div_1_Template_button_click_15_listener() { const role_r36 = i0.ɵɵrestoreView(_r35).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.removeDealStakeholder(role_r36.id)); });
    i0.ɵɵelement(16, "i", 392);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const role_r36 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r3.stakeholderRoleIcon(role_r36.role));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", role_r36.contactName, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", role_r36.isPrimary);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-role", role_r36.role);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(role_r36.role);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", role_r36.jobTitle);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", role_r36.email);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", role_r36.notes);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r3.stakeholderRemovingIds().includes(role_r36.id));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r3.stakeholderRemovingIds().includes(role_r36.id) ? "pi-spin pi-spinner" : "pi-trash");
} }
function OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 379);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_19_div_1_Template, 17, 11, "div", 380);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.dealContactRoles());
} }
function OpportunityFormPage_p_accordion_panel_303_ng_container_12_ng_template_20_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 396);
    i0.ɵɵelement(1, "i", 362);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No stakeholders mapped yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 397);
    i0.ɵɵtext(5, "Add contacts and their roles in the buying process to track stakeholder influence.");
    i0.ɵɵelementEnd()();
} }
function OpportunityFormPage_p_accordion_panel_303_ng_container_12_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, OpportunityFormPage_p_accordion_panel_303_ng_container_12_ng_template_20_div_0_Template, 6, 0, "div", 395);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngIf", !ctx_r3.dealContactRolesLoading());
} }
function OpportunityFormPage_p_accordion_panel_303_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    const _r33 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 363)(2, "p", 243);
    i0.ɵɵtext(3, "Map contacts involved in this deal and their influence on the buying decision.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 364)(5, "div", 365)(6, "p-select", 366);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_303_ng_container_12_Template_p_select_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.stakeholderSelectedContactId, $event) || (ctx_r3.stakeholderSelectedContactId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p-select", 367);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_303_ng_container_12_Template_p_select_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.stakeholderSelectedRole, $event) || (ctx_r3.stakeholderSelectedRole = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "label", 368)(9, "input", 369);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_303_ng_container_12_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r33); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.stakeholderIsPrimary, $event) || (ctx_r3.stakeholderIsPrimary = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11, "Primary");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "button", 370);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_303_ng_container_12_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r33); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.addDealStakeholder()); });
    i0.ɵɵelementStart(13, "span", 371);
    i0.ɵɵelement(14, "i", 272);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span");
    i0.ɵɵtext(16, "Add");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(17, OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_17_Template, 2, 1, "div", 372);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_18_Template, 3, 0, "div", 373)(19, OpportunityFormPage_p_accordion_panel_303_ng_container_12_div_19_Template, 2, 1, "div", 374)(20, OpportunityFormPage_p_accordion_panel_303_ng_container_12_ng_template_20_Template, 1, 1, "ng-template", null, 8, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const noStakeholders_r37 = i0.ɵɵreference(21);
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("options", ctx_r3.stakeholderContactOptions());
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.stakeholderSelectedContactId);
    i0.ɵɵproperty("filter", true)("loading", ctx_r3.stakeholderContactSearching());
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r3.stakeholderRoleOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.stakeholderSelectedRole);
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.stakeholderIsPrimary);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r3.stakeholderSelectedContactId || !ctx_r3.stakeholderSelectedRole || ctx_r3.stakeholderAdding());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r3.stakeholderSelectedContactId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.dealContactRolesLoading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.dealContactRolesLoading() && ctx_r3.dealContactRoles().length)("ngIfElse", noStakeholders_r37);
} }
function OpportunityFormPage_p_accordion_panel_303_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 359)(1, "p", 360);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.isSectionLoading("deal-stakeholders") ? "Loading stakeholders\u2026" : "Open section to load stakeholders.");
} }
function OpportunityFormPage_p_accordion_panel_303_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-accordion-panel", 361)(1, "p-accordion-header")(2, "div", 103)(3, "span", 104);
    i0.ɵɵelement(4, "i", 362);
    i0.ɵɵtext(5, " Stakeholders ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 105)(7, "span", 163);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 106);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(11, "p-accordion-content");
    i0.ɵɵtemplate(12, OpportunityFormPage_p_accordion_panel_303_ng_container_12_Template, 22, 12, "ng-container", 348)(13, OpportunityFormPage_p_accordion_panel_303_ng_template_13_Template, 3, 1, "ng-template", null, 7, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const stakeholdersLoading_r38 = i0.ɵɵreference(14);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r3.isSectionLocked("deal-stakeholders"));
    i0.ɵɵattribute("data-deal-section", "deal-stakeholders");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate2(" ", ctx_r3.dealContactRoles().length, " stakeholder", ctx_r3.dealContactRoles().length !== 1 ? "s" : "", " ");
    i0.ɵɵadvance();
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.sectionStatusTone("deal-stakeholders"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.sectionStatusLabel("deal-stakeholders"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r3.isSectionLoaded("deal-stakeholders"))("ngIfElse", stakeholdersLoading_r38);
} }
function OpportunityFormPage_div_315_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 405);
    i0.ɵɵelement(1, "i", 378);
    i0.ɵɵtext(2, " Loading activities\u2026 ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_div_315_div_11_button_1_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const activity_r41 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2022 ", activity_r41.ownerName);
} }
function OpportunityFormPage_div_315_div_11_button_1_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const activity_r41 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2022 ", i0.ɵɵpipeBind2(2, 1, ctx_r3.activityTimelineDateLabel(activity_r41), "medium"));
} }
function OpportunityFormPage_div_315_div_11_button_1_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 416);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const activity_r41 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(activity_r41.outcome);
} }
function OpportunityFormPage_div_315_div_11_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r40 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 408);
    i0.ɵɵlistener("click", function OpportunityFormPage_div_315_div_11_button_1_Template_button_click_0_listener() { const activity_r41 = i0.ɵɵrestoreView(_r40).$implicit; const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.openActivityRecord(activity_r41.id)); });
    i0.ɵɵelementStart(1, "div", 409);
    i0.ɵɵelement(2, "i", 392);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 410)(4, "div", 411)(5, "span", 412);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 413);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 414)(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, OpportunityFormPage_div_315_div_11_button_1_span_12_Template, 2, 1, "span", 325)(13, OpportunityFormPage_div_315_div_11_button_1_span_13_Template, 3, 4, "span", 325);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, OpportunityFormPage_div_315_div_11_button_1_div_14_Template, 2, 1, "div", 415);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const activity_r41 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-type", activity_r41.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r3.activityTypeIcon(activity_r41.type));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(activity_r41.subject);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-status", activity_r41.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(activity_r41.status);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(activity_r41.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", activity_r41.ownerName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.activityTimelineDateLabel(activity_r41));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", activity_r41.outcome);
} }
function OpportunityFormPage_div_315_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 406);
    i0.ɵɵtemplate(1, OpportunityFormPage_div_315_div_11_button_1_Template, 15, 9, "button", 407);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.recentDealActivities());
} }
function OpportunityFormPage_div_315_ng_template_12_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 417);
    i0.ɵɵelement(1, "i", 418);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No activities logged for this deal yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 419);
    i0.ɵɵtext(5, "Activities from the Activities module that reference this opportunity will appear here.");
    i0.ɵɵelementEnd()();
} }
function OpportunityFormPage_div_315_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, OpportunityFormPage_div_315_ng_template_12_div_0_Template, 6, 0, "div", 173);
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", !ctx_r3.recentDealActivitiesLoading());
} }
function OpportunityFormPage_div_315_Template(rf, ctx) { if (rf & 1) {
    const _r39 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 398)(1, "div", 399)(2, "h3");
    i0.ɵɵelement(3, "i", 400);
    i0.ɵɵtext(4, " Recent Activities ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 401);
    i0.ɵɵlistener("click", function OpportunityFormPage_div_315_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r39); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.logDealActivity()); });
    i0.ɵɵelementStart(6, "span", 371);
    i0.ɵɵelement(7, "i", 402);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "Open Activities");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(10, OpportunityFormPage_div_315_div_10_Template, 3, 0, "div", 403)(11, OpportunityFormPage_div_315_div_11_Template, 2, 1, "div", 404)(12, OpportunityFormPage_div_315_ng_template_12_Template, 1, 1, "ng-template", null, 9, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const noDealActivities_r42 = i0.ɵɵreference(13);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngIf", ctx_r3.recentDealActivitiesLoading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.recentDealActivitiesLoading() && ctx_r3.recentDealActivities().length)("ngIfElse", noDealActivities_r42);
} }
function OpportunityFormPage_div_316_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 417);
    i0.ɵɵelement(1, "i", 418);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Save the deal first to track activities.");
    i0.ɵɵelementEnd()();
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_span_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Request approval");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_span_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Requesting\u2026");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_p_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 360);
    i0.ɵɵtext(1, " Request approval before closing or applying large discounts. ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_ng_template_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 434);
    i0.ɵɵtext(1, "You don\u2019t have permission to request approvals.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const approval_r44 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" Step ", approval_r44.stepOrder || 1, " of ", approval_r44.totalSteps, " ");
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const approval_r44 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Chain status: ", approval_r44.chainStatus || approval_r44.status, " ");
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const approval_r44 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Approver role: ", approval_r44.approverRole);
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_span_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const approval_r44 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Approved by: ", approval_r44.approverName);
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_span_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const approval_r44 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Decision: ", i0.ɵɵpipeBind2(2, 1, approval_r44.decisionOn, "medium"));
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 443);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const approval_r44 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", approval_r44.notes, " ");
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 437)(1, "div", 438)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 439);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 440);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 441)(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_span_15_Template, 2, 2, "span", 325)(16, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_span_16_Template, 2, 1, "span", 325)(17, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_span_17_Template, 2, 1, "span", 325)(18, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_span_18_Template, 2, 1, "span", 325)(19, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_span_19_Template, 3, 4, "span", 325);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_div_20_Template, 2, 1, "div", 442);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const approval_r44 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r3.approvalStatusClass(approval_r44.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(approval_r44.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(approval_r44.purpose);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", i0.ɵɵpipeBind2(8, 14, approval_r44.amount, "1.0-2"), " ", approval_r44.currency, " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Requested by ", approval_r44.requestedByName || "Unknown");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(14, 17, approval_r44.requestedOn, "medium"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", approval_r44.totalSteps && approval_r44.totalSteps > 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", approval_r44.totalSteps && approval_r44.totalSteps > 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", approval_r44.approverRole);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", approval_r44.approverName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", approval_r44.decisionOn);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", approval_r44.status !== "Pending" && approval_r44.notes);
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 435);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_div_1_Template, 21, 20, "div", 436);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.approvals);
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 360);
    i0.ɵɵtext(1, "No approvals requested yet.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_p_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 434);
    i0.ɵɵtext(1, " Decision actions are handled in the Review Action section. ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_Template(rf, ctx) { if (rf & 1) {
    const _r43 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 107)(1, "div", 422)(2, "span", 423);
    i0.ɵɵtext(3, "Current Approval Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 106);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 424)(7, "div", 425)(8, "div", 109)(9, "label");
    i0.ɵɵtext(10, "Purpose");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p-select", 426);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_Template_p_select_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r43); const ctx_r3 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r3.approvalRequest.purpose, $event) || (ctx_r3.approvalRequest.purpose = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_Template_p_select_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r43); const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.onApprovalPurposeChange($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 109)(13, "label");
    i0.ɵɵtext(14, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p-inputNumber", 427);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_Template_p_inputNumber_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r43); const ctx_r3 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r3.approvalRequest.amount, $event) || (ctx_r3.approvalRequest.amount = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_Template_p_inputNumber_ngModelChange_15_listener() { i0.ɵɵrestoreView(_r43); const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.onApprovalAmountEdited()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 109)(17, "label");
    i0.ɵɵtext(18, "Currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p-select", 428);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_Template_p_select_ngModelChange_19_listener($event) { i0.ɵɵrestoreView(_r43); const ctx_r3 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r3.approvalRequest.currency, $event) || (ctx_r3.approvalRequest.currency = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 429)(21, "label");
    i0.ɵɵtext(22, "\u00A0");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "button", 430);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r43); const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.requestApproval()); });
    i0.ɵɵtemplate(24, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_span_24_Template, 2, 0, "span", 325)(25, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_span_25_Template, 2, 0, "span", 325);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(26, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_p_26_Template, 2, 0, "p", 431)(27, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_ng_template_27_Template, 2, 0, "ng-template", null, 11, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(29, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_div_29_Template, 2, 1, "div", 432)(30, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_ng_template_30_Template, 2, 0, "ng-template", null, 12, i0.ɵɵtemplateRefExtractor)(32, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_p_32_Template, 2, 0, "p", 433);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const noApprovalPermission_r45 = i0.ɵɵreference(28);
    const noApprovals_r46 = i0.ɵɵreference(31);
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.currentApprovalStatusTone());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.currentApprovalStatusLabel(), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("options", ctx_r3.approvalPurposeOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.approvalRequest.purpose);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.approvalRequest.amount);
    i0.ɵɵproperty("currency", ctx_r3.resolveCurrency(ctx_r3.approvalRequest.currency));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r3.currencyOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.approvalRequest.currency);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", !ctx_r3.canRequestApproval() || ctx_r3.approvalRequesting());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.approvalRequesting());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.approvalRequesting());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.canRequestApproval())("ngIfElse", noApprovalPermission_r45);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.approvals.length)("ngIfElse", noApprovals_r46);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.decisionReviewMode());
} }
function OpportunityFormPage_p_accordion_panel_319_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_319_ng_container_12_section_1_Template, 33, 17, "section", 421);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isEditMode());
} }
function OpportunityFormPage_p_accordion_panel_319_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 359)(1, "p", 360);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.isSectionLoading("approval-workflow") ? "Loading approvals\u2026" : "Open section to load approvals.");
} }
function OpportunityFormPage_p_accordion_panel_319_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-accordion-panel", 420)(1, "p-accordion-header")(2, "div", 103)(3, "span", 104);
    i0.ɵɵelement(4, "i", 276);
    i0.ɵɵtext(5, " Approval Workflow ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 105)(7, "span", 106);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 106);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(11, "p-accordion-content");
    i0.ɵɵtemplate(12, OpportunityFormPage_p_accordion_panel_319_ng_container_12_Template, 2, 1, "ng-container", 348)(13, OpportunityFormPage_p_accordion_panel_319_ng_template_13_Template, 3, 1, "ng-template", null, 10, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const approvalLoading_r47 = i0.ɵɵreference(14);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r3.isSectionLocked("approval-workflow"));
    i0.ɵɵattribute("data-deal-section", "approval-workflow");
    i0.ɵɵadvance(7);
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.approvalWorkflowHeaderTone());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.approvalWorkflowHeaderBadge(), " ");
    i0.ɵɵadvance();
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.sectionStatusTone("approval-workflow"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.sectionStatusLabel("approval-workflow"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r3.isEditMode() || ctx_r3.isSectionLoaded("approval-workflow"))("ngIfElse", approvalLoading_r47);
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_div_1_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 466);
    i0.ɵɵtext(1, " Saving\u2026 ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_div_1_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 467);
    i0.ɵɵtext(1, " Saved ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r49 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 459)(1, "input", 460);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_div_1_Template_input_ngModelChange_1_listener($event) { const item_r50 = i0.ɵɵrestoreView(_r49).$implicit; i0.ɵɵtwoWayBindingSet(item_r50.title, $event) || (item_r50.title = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("blur", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_div_1_Template_input_blur_1_listener() { const item_r50 = i0.ɵɵrestoreView(_r49).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveChecklistItem(item_r50)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p-select", 461);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_div_1_Template_p_select_ngModelChange_2_listener($event) { const item_r50 = i0.ɵɵrestoreView(_r49).$implicit; i0.ɵɵtwoWayBindingSet(item_r50.status, $event) || (item_r50.status = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("onChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_div_1_Template_p_select_onChange_2_listener() { const item_r50 = i0.ɵɵrestoreView(_r49).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveChecklistItem(item_r50)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 462);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_div_1_Template_input_ngModelChange_3_listener($event) { const item_r50 = i0.ɵɵrestoreView(_r49).$implicit; i0.ɵɵtwoWayBindingSet(item_r50.notes, $event) || (item_r50.notes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("blur", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_div_1_Template_input_blur_3_listener() { const item_r50 = i0.ɵɵrestoreView(_r49).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveChecklistItem(item_r50)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_div_1_span_4_Template, 2, 0, "span", 463)(5, OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_div_1_span_5_Template, 2, 0, "span", 464);
    i0.ɵɵelementStart(6, "button", 453);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_div_1_Template_button_click_6_listener() { const item_r50 = i0.ɵɵrestoreView(_r49).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.deleteChecklistItem(item_r50)); });
    i0.ɵɵelement(7, "i", 465);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r50 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("securityTitle", item_r50.id));
    i0.ɵɵtwoWayProperty("ngModel", item_r50.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("securityStatus", item_r50.id))("options", ctx_r3.reviewStatusOptions);
    i0.ɵɵtwoWayProperty("ngModel", item_r50.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("securityNotes", item_r50.id));
    i0.ɵɵtwoWayProperty("ngModel", item_r50.notes);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isChecklistSaving(item_r50));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isChecklistSaved(item_r50));
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 457);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_div_1_Template, 8, 12, "div", 458);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.securityChecklist);
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 360);
    i0.ɵɵtext(1, "No security checklist items yet.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_div_1_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 466);
    i0.ɵɵtext(1, " Saving\u2026 ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_div_1_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 467);
    i0.ɵɵtext(1, " Saved ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r51 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 459)(1, "input", 460);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_div_1_Template_input_ngModelChange_1_listener($event) { const item_r52 = i0.ɵɵrestoreView(_r51).$implicit; i0.ɵɵtwoWayBindingSet(item_r52.title, $event) || (item_r52.title = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("blur", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_div_1_Template_input_blur_1_listener() { const item_r52 = i0.ɵɵrestoreView(_r51).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveChecklistItem(item_r52)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p-select", 461);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_div_1_Template_p_select_ngModelChange_2_listener($event) { const item_r52 = i0.ɵɵrestoreView(_r51).$implicit; i0.ɵɵtwoWayBindingSet(item_r52.status, $event) || (item_r52.status = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("onChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_div_1_Template_p_select_onChange_2_listener() { const item_r52 = i0.ɵɵrestoreView(_r51).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveChecklistItem(item_r52)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 462);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_div_1_Template_input_ngModelChange_3_listener($event) { const item_r52 = i0.ɵɵrestoreView(_r51).$implicit; i0.ɵɵtwoWayBindingSet(item_r52.notes, $event) || (item_r52.notes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("blur", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_div_1_Template_input_blur_3_listener() { const item_r52 = i0.ɵɵrestoreView(_r51).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveChecklistItem(item_r52)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_div_1_span_4_Template, 2, 0, "span", 463)(5, OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_div_1_span_5_Template, 2, 0, "span", 464);
    i0.ɵɵelementStart(6, "button", 453);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_div_1_Template_button_click_6_listener() { const item_r52 = i0.ɵɵrestoreView(_r51).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.deleteChecklistItem(item_r52)); });
    i0.ɵɵelement(7, "i", 465);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r52 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("legalTitle", item_r52.id));
    i0.ɵɵtwoWayProperty("ngModel", item_r52.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("legalStatus", item_r52.id))("options", ctx_r3.reviewStatusOptions);
    i0.ɵɵtwoWayProperty("ngModel", item_r52.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("legalNotes", item_r52.id));
    i0.ɵɵtwoWayProperty("ngModel", item_r52.notes);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isChecklistSaving(item_r52));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isChecklistSaved(item_r52));
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 457);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_div_1_Template, 8, 12, "div", 458);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.legalChecklist);
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_ng_template_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 360);
    i0.ɵɵtext(1, "No legal checklist items yet.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_div_1_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 466);
    i0.ɵɵtext(1, " Saving\u2026 ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_div_1_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 467);
    i0.ɵɵtext(1, " Saved ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r53 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 459)(1, "input", 460);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_div_1_Template_input_ngModelChange_1_listener($event) { const item_r54 = i0.ɵɵrestoreView(_r53).$implicit; i0.ɵɵtwoWayBindingSet(item_r54.title, $event) || (item_r54.title = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("blur", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_div_1_Template_input_blur_1_listener() { const item_r54 = i0.ɵɵrestoreView(_r53).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveChecklistItem(item_r54)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p-select", 461);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_div_1_Template_p_select_ngModelChange_2_listener($event) { const item_r54 = i0.ɵɵrestoreView(_r53).$implicit; i0.ɵɵtwoWayBindingSet(item_r54.status, $event) || (item_r54.status = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("onChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_div_1_Template_p_select_onChange_2_listener() { const item_r54 = i0.ɵɵrestoreView(_r53).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveChecklistItem(item_r54)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 462);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_div_1_Template_input_ngModelChange_3_listener($event) { const item_r54 = i0.ɵɵrestoreView(_r53).$implicit; i0.ɵɵtwoWayBindingSet(item_r54.notes, $event) || (item_r54.notes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("blur", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_div_1_Template_input_blur_3_listener() { const item_r54 = i0.ɵɵrestoreView(_r53).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveChecklistItem(item_r54)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_div_1_span_4_Template, 2, 0, "span", 463)(5, OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_div_1_span_5_Template, 2, 0, "span", 464);
    i0.ɵɵelementStart(6, "button", 453);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_div_1_Template_button_click_6_listener() { const item_r54 = i0.ɵɵrestoreView(_r53).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.deleteChecklistItem(item_r54)); });
    i0.ɵɵelement(7, "i", 465);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r54 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("technicalTitle", item_r54.id));
    i0.ɵɵtwoWayProperty("ngModel", item_r54.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("technicalStatus", item_r54.id))("options", ctx_r3.reviewStatusOptions);
    i0.ɵɵtwoWayProperty("ngModel", item_r54.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", i0.ɵɵinterpolate1("technicalNotes", item_r54.id));
    i0.ɵɵtwoWayProperty("ngModel", item_r54.notes);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isChecklistSaving(item_r54));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isChecklistSaved(item_r54));
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 457);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_div_1_Template, 8, 12, "div", 458);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.technicalChecklist);
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_ng_template_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 360);
    i0.ɵɵtext(1, "No technical risks logged yet.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_320_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    const _r48 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 107)(2, "div", 108)(3, "div", 109)(4, "label", 445);
    i0.ɵɵtext(5, "Security status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p-select", 446);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_Template_p_select_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r48); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form.securityReviewStatus, $event) || (ctx_r3.form.securityReviewStatus = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 109)(8, "label", 447);
    i0.ɵɵtext(9, "Legal status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p-select", 448);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_Template_p_select_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r48); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.form.legalReviewStatus, $event) || (ctx_r3.form.legalReviewStatus = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 449)(12, "div", 450)(13, "h4");
    i0.ɵɵtext(14, "Security checklist");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 451)(16, "input", 452);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_Template_input_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r48); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.newSecurityItem, $event) || (ctx_r3.newSecurityItem = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 453);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r48); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.addChecklistItem("Security")); });
    i0.ɵɵelement(18, "i", 272);
    i0.ɵɵtext(19, " Add ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(20, OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_20_Template, 2, 1, "div", 454)(21, OpportunityFormPage_p_accordion_panel_320_ng_container_12_ng_template_21_Template, 2, 0, "ng-template", null, 14, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 449)(24, "div", 450)(25, "h4");
    i0.ɵɵtext(26, "Legal checklist");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 451)(28, "input", 455);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_Template_input_ngModelChange_28_listener($event) { i0.ɵɵrestoreView(_r48); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.newLegalItem, $event) || (ctx_r3.newLegalItem = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "button", 453);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_Template_button_click_29_listener() { i0.ɵɵrestoreView(_r48); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.addChecklistItem("Legal")); });
    i0.ɵɵelement(30, "i", 272);
    i0.ɵɵtext(31, " Add ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(32, OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_32_Template, 2, 1, "div", 454)(33, OpportunityFormPage_p_accordion_panel_320_ng_container_12_ng_template_33_Template, 2, 0, "ng-template", null, 15, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "div", 449)(36, "div", 450)(37, "h4");
    i0.ɵɵtext(38, "Technical risk checklist");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "div", 451)(40, "input", 456);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_Template_input_ngModelChange_40_listener($event) { i0.ɵɵrestoreView(_r48); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.newTechnicalItem, $event) || (ctx_r3.newTechnicalItem = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(41, "button", 453);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_320_ng_container_12_Template_button_click_41_listener() { i0.ɵɵrestoreView(_r48); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.addChecklistItem("Technical")); });
    i0.ɵɵelement(42, "i", 272);
    i0.ɵɵtext(43, " Add ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(44, OpportunityFormPage_p_accordion_panel_320_ng_container_12_div_44_Template, 2, 1, "div", 454)(45, OpportunityFormPage_p_accordion_panel_320_ng_container_12_ng_template_45_Template, 2, 0, "ng-template", null, 16, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const emptySecurityChecklist_r55 = i0.ɵɵreference(22);
    const emptyLegalChecklist_r56 = i0.ɵɵreference(34);
    const emptyTechnicalChecklist_r57 = i0.ɵɵreference(46);
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("options", ctx_r3.reviewStatusOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.securityReviewStatus);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r3.reviewStatusOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.legalReviewStatus);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.newSecurityItem);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r3.securityChecklist.length)("ngIfElse", emptySecurityChecklist_r55);
    i0.ɵɵadvance(8);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.newLegalItem);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r3.legalChecklist.length)("ngIfElse", emptyLegalChecklist_r56);
    i0.ɵɵadvance(8);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.newTechnicalItem);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r3.technicalChecklist.length)("ngIfElse", emptyTechnicalChecklist_r57);
} }
function OpportunityFormPage_p_accordion_panel_320_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 359)(1, "p", 360);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.isSectionLoading("security-legal") ? "Loading security and legal checklists\u2026" : "Open section to load checklists.");
} }
function OpportunityFormPage_p_accordion_panel_320_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-accordion-panel", 444)(1, "p-accordion-header")(2, "div", 103)(3, "span", 104);
    i0.ɵɵelement(4, "i", 92);
    i0.ɵɵtext(5, " Security & Legal Review ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 105)(7, "span", 106);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 106);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(11, "p-accordion-content");
    i0.ɵɵtemplate(12, OpportunityFormPage_p_accordion_panel_320_ng_container_12_Template, 47, 13, "ng-container", 348)(13, OpportunityFormPage_p_accordion_panel_320_ng_template_13_Template, 3, 1, "ng-template", null, 13, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const securityLoading_r58 = i0.ɵɵreference(14);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r3.isSectionLocked("security-legal"));
    i0.ɵɵattribute("data-deal-section", "security-legal");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r3.securityLegalHeaderBadge());
    i0.ɵɵadvance();
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.sectionStatusTone("security-legal"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.sectionStatusLabel("security-legal"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r3.isEditMode() || ctx_r3.isSectionLoaded("security-legal"))("ngIfElse", securityLoading_r58);
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_1_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r60 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 109)(1, "label", 482);
    i0.ɵɵtext(2, "Acknowledgment due");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 483);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_1_div_6_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r60); const ctx_r3 = i0.ɵɵnextContext(5); i0.ɵɵtwoWayBindingSet(ctx_r3.reviewAckDueLocal, $event) || (ctx_r3.reviewAckDueLocal = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.reviewAckDueLocal);
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r59 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 474)(1, "div", 108)(2, "div", 109)(3, "label", 475);
    i0.ɵɵtext(4, "Review outcome");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p-select", 476);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_1_Template_p_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r59); const ctx_r3 = i0.ɵɵnextContext(4); i0.ɵɵtwoWayBindingSet(ctx_r3.reviewOutcome, $event) || (ctx_r3.reviewOutcome = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_1_div_6_Template, 4, 1, "div", 477);
    i0.ɵɵelementStart(7, "div", 145)(8, "label", 478);
    i0.ɵɵtext(9, "Manager comment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "textarea", 479);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_1_Template_textarea_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r59); const ctx_r3 = i0.ɵɵnextContext(4); i0.ɵɵtwoWayBindingSet(ctx_r3.reviewComment, $event) || (ctx_r3.reviewComment = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 480)(12, "button", 481);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_1_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r59); const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.submitReviewOutcome()); });
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("options", ctx_r3.reviewOutcomeOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.reviewOutcome);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.reviewOutcome !== "Approved");
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.reviewComment);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r3.reviewSubmitting);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.reviewSubmitting ? "Saving..." : "Save review outcome", " ");
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_ng_template_2_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 360);
    i0.ɵɵtext(1, " A manager has requested acknowledgment on this deal review. ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_ng_template_2_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 360);
    i0.ɵɵtext(1, "No manager acknowledgment is required right now.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_ng_template_2_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r61 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 480)(1, "button", 481);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_ng_template_2_div_4_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r61); const ctx_r3 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r3.acknowledgeReview()); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r3.ackSubmitting);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.ackSubmitting ? "Acknowledging..." : "Acknowledge review", " ");
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 484);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_ng_template_2_p_1_Template, 2, 0, "p", 431)(2, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_ng_template_2_ng_template_2_Template, 2, 0, "ng-template", null, 20, i0.ɵɵtemplateRefExtractor)(4, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_ng_template_2_div_4_Template, 3, 2, "div", 485);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const noAckNeeded_r62 = i0.ɵɵreference(3);
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.hasPendingAcknowledgment())("ngIfElse", noAckNeeded_r62);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.hasPendingAcknowledgment());
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_4_div_1_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 495);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r63 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r63.comment, " ");
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_4_div_1_div_10_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r63 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Due: ", i0.ɵɵpipeBind2(2, 1, item_r63.dueDateUtc, "MMM d, y, h:mm a"), " ");
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_4_div_1_div_10_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r63 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Completed: ", i0.ɵɵpipeBind2(2, 1, item_r63.completedDateUtc, "MMM d, y, h:mm a"), " ");
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_4_div_1_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 496);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_4_div_1_div_10_span_1_Template, 3, 4, "span", 325)(2, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_4_div_1_div_10_span_2_Template, 3, 4, "span", 325);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r63 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r63.dueDateUtc);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r63.completedDateUtc);
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_4_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 488)(1, "div", 489)(2, "span", 490);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong", 491);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 492);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(9, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_4_div_1_div_9_Template, 2, 1, "div", 493)(10, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_4_div_1_div_10_Template, 3, 2, "div", 494);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r63 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", item_r63.kind === "Acknowledgment" ? "ack" : "review");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r63.kind, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r63.outcome);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", item_r63.ownerName, " \u00B7 ", i0.ɵɵpipeBind2(8, 7, item_r63.createdAtUtc, "MMM d, y, h:mm a"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", item_r63.comment);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r63.dueDateUtc || item_r63.completedDateUtc);
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 486);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_4_div_1_Template, 11, 10, "div", 487);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.reviewThread());
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 360);
    i0.ɵɵtext(1, "No manager review comments yet.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 471);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_1_Template, 14, 6, "div", 472)(2, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_ng_template_2_Template, 5, 3, "ng-template", null, 18, i0.ɵɵtemplateRefExtractor)(4, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_div_4_Template, 2, 1, "div", 473)(5, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_ng_template_5_Template, 2, 0, "ng-template", null, 19, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const repAckBlock_r64 = i0.ɵɵreference(3);
    const emptyReviewThread_r65 = i0.ɵɵreference(6);
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isManager())("ngIfElse", repAckBlock_r64);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.reviewThread().length)("ngIfElse", emptyReviewThread_r65);
} }
function OpportunityFormPage_p_accordion_panel_321_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_321_ng_container_12_section_1_Template, 7, 4, "section", 470);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isEditMode());
} }
function OpportunityFormPage_p_accordion_panel_321_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 359)(1, "p", 360);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.isSectionLoading("review-thread") ? "Loading review history\u2026" : "Open section to load review history.");
} }
function OpportunityFormPage_p_accordion_panel_321_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-accordion-panel", 468)(1, "p-accordion-header")(2, "div", 103)(3, "span", 104);
    i0.ɵɵelement(4, "i", 469);
    i0.ɵɵtext(5, " Deal Review Thread ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 105)(7, "span", 106);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 106);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(11, "p-accordion-content");
    i0.ɵɵtemplate(12, OpportunityFormPage_p_accordion_panel_321_ng_container_12_Template, 2, 1, "ng-container", 348)(13, OpportunityFormPage_p_accordion_panel_321_ng_template_13_Template, 3, 1, "ng-template", null, 17, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const reviewLoading_r66 = i0.ɵɵreference(14);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r3.isSectionLocked("review-thread"));
    i0.ɵɵattribute("data-deal-section", "review-thread");
    i0.ɵɵadvance(7);
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.reviewThreadHeaderTone());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.reviewThreadHeaderBadge(), " ");
    i0.ɵɵadvance();
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.sectionStatusTone("review-thread"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.sectionStatusLabel("review-thread"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r3.isSectionLoaded("review-thread"))("ngIfElse", reviewLoading_r66);
} }
function OpportunityFormPage_p_accordion_panel_324_Template(rf, ctx) { if (rf & 1) {
    const _r67 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-accordion-panel", 497)(1, "p-accordion-header")(2, "div", 103)(3, "span", 104);
    i0.ɵɵelement(4, "i", 83);
    i0.ɵɵtext(5, " Delivery Handoff ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 105)(7, "span", 106);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 106);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(11, "p-accordion-content")(12, "section", 107)(13, "p", 243);
    i0.ɵɵtext(14, "Capture scope, risks, and delivery ownership before kickoff.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 108)(16, "div", 109)(17, "label", 498);
    i0.ɵɵtext(18, "Delivery owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p-select", 499);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_324_Template_p_select_ngModelChange_19_listener($event) { i0.ɵɵrestoreView(_r67); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form.deliveryOwnerId, $event) || (ctx_r3.form.deliveryOwnerId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 109)(21, "label", 500);
    i0.ɵɵtext(22, "Delivery status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "p-select", 501);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_324_Template_p_select_ngModelChange_23_listener($event) { i0.ɵɵrestoreView(_r67); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form.deliveryStatus, $event) || (ctx_r3.form.deliveryStatus = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "div", 145)(25, "label", 502);
    i0.ɵɵtext(26, "Scope");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "textarea", 503);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_324_Template_textarea_ngModelChange_27_listener($event) { i0.ɵɵrestoreView(_r67); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form.deliveryHandoffScope, $event) || (ctx_r3.form.deliveryHandoffScope = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "div", 145)(29, "label", 504);
    i0.ɵɵtext(30, "Risks");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "textarea", 505);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_324_Template_textarea_ngModelChange_31_listener($event) { i0.ɵɵrestoreView(_r67); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form.deliveryHandoffRisks, $event) || (ctx_r3.form.deliveryHandoffRisks = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "div", 145)(33, "label", 506);
    i0.ɵɵtext(34, "Timeline");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "textarea", 507);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_324_Template_textarea_ngModelChange_35_listener($event) { i0.ɵɵrestoreView(_r67); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.form.deliveryHandoffTimeline, $event) || (ctx_r3.form.deliveryHandoffTimeline = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "div", 145)(37, "button", 508);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_324_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r67); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.triggerKickoff()); });
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r3.isSectionLocked("delivery-handoff"));
    i0.ɵɵattribute("data-deal-section", "delivery-handoff");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r3.deliveryHeaderBadge());
    i0.ɵɵadvance();
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.sectionStatusTone("delivery-handoff"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.sectionStatusLabel("delivery-handoff"), " ");
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("options", ctx_r3.teamMemberOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.deliveryOwnerId);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r3.deliveryStatusOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.deliveryStatus);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.deliveryHandoffScope);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.deliveryHandoffRisks);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.form.deliveryHandoffTimeline);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r3.isEditMode());
} }
function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 466);
    i0.ɵɵtext(1, "Saving...");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 467);
    i0.ɵɵtext(1, "Saved");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r69 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 459)(1, "input", 514);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_Template_input_ngModelChange_1_listener($event) { const item_r70 = i0.ɵɵrestoreView(_r69).$implicit; i0.ɵɵtwoWayBindingSet(item_r70.title, $event) || (item_r70.title = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("blur", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_Template_input_blur_1_listener() { const item_r70 = i0.ɵɵrestoreView(_r69).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveOnboardingItem(item_r70)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p-select", 515);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_Template_p_select_ngModelChange_2_listener($event) { const item_r70 = i0.ɵɵrestoreView(_r69).$implicit; i0.ɵɵtwoWayBindingSet(item_r70.status, $event) || (item_r70.status = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("onChange", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_Template_p_select_onChange_2_listener() { const item_r70 = i0.ɵɵrestoreView(_r69).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveOnboardingItem(item_r70)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-datePicker", 516);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_Template_p_datePicker_ngModelChange_3_listener($event) { const item_r70 = i0.ɵɵrestoreView(_r69).$implicit; i0.ɵɵtwoWayBindingSet(item_r70.dueDateUtc, $event) || (item_r70.dueDateUtc = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("onSelect", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_Template_p_datePicker_onSelect_3_listener() { const item_r70 = i0.ɵɵrestoreView(_r69).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveOnboardingItem(item_r70)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "textarea", 517);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_Template_textarea_ngModelChange_4_listener($event) { const item_r70 = i0.ɵɵrestoreView(_r69).$implicit; i0.ɵɵtwoWayBindingSet(item_r70.notes, $event) || (item_r70.notes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("blur", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_Template_textarea_blur_4_listener() { const item_r70 = i0.ɵɵrestoreView(_r69).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveOnboardingItem(item_r70)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_span_5_Template, 2, 0, "span", 463)(6, OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_span_6_Template, 2, 0, "span", 464);
    i0.ɵɵelementStart(7, "button", 453);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_Template_button_click_7_listener() { const item_r70 = i0.ɵɵrestoreView(_r69).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.deleteOnboardingItem(item_r70)); });
    i0.ɵɵtext(8, " Remove ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r70 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", item_r70.title);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(12, _c8));
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r3.onboardingStatusOptions);
    i0.ɵɵtwoWayProperty("ngModel", item_r70.status);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(13, _c8));
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", item_r70.dueDateUtc);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(14, _c8))("showIcon", true);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", item_r70.notes);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(15, _c8));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isOnboardingSaving(item_r70));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isOnboardingSaved(item_r70));
} }
function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 457);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_div_1_Template, 9, 16, "div", 458);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.onboardingChecklist);
} }
function OpportunityFormPage_p_accordion_panel_325_ng_container_12_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 313);
    i0.ɵɵtext(1, "No onboarding checklist items yet.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 466);
    i0.ɵɵtext(1, "Saving...");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 467);
    i0.ɵɵtext(1, "Saved");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r71 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 459)(1, "input", 514);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_Template_input_ngModelChange_1_listener($event) { const item_r72 = i0.ɵɵrestoreView(_r71).$implicit; i0.ɵɵtwoWayBindingSet(item_r72.title, $event) || (item_r72.title = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("blur", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_Template_input_blur_1_listener() { const item_r72 = i0.ɵɵrestoreView(_r71).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveOnboardingItem(item_r72)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p-select", 515);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_Template_p_select_ngModelChange_2_listener($event) { const item_r72 = i0.ɵɵrestoreView(_r71).$implicit; i0.ɵɵtwoWayBindingSet(item_r72.status, $event) || (item_r72.status = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("onChange", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_Template_p_select_onChange_2_listener() { const item_r72 = i0.ɵɵrestoreView(_r71).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveOnboardingItem(item_r72)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-datePicker", 516);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_Template_p_datePicker_ngModelChange_3_listener($event) { const item_r72 = i0.ɵɵrestoreView(_r71).$implicit; i0.ɵɵtwoWayBindingSet(item_r72.dueDateUtc, $event) || (item_r72.dueDateUtc = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("onSelect", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_Template_p_datePicker_onSelect_3_listener() { const item_r72 = i0.ɵɵrestoreView(_r71).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveOnboardingItem(item_r72)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "textarea", 517);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_Template_textarea_ngModelChange_4_listener($event) { const item_r72 = i0.ɵɵrestoreView(_r71).$implicit; i0.ɵɵtwoWayBindingSet(item_r72.notes, $event) || (item_r72.notes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("blur", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_Template_textarea_blur_4_listener() { const item_r72 = i0.ɵɵrestoreView(_r71).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.saveOnboardingItem(item_r72)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_span_5_Template, 2, 0, "span", 463)(6, OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_span_6_Template, 2, 0, "span", 464);
    i0.ɵɵelementStart(7, "button", 453);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_Template_button_click_7_listener() { const item_r72 = i0.ɵɵrestoreView(_r71).$implicit; const ctx_r3 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r3.deleteOnboardingItem(item_r72)); });
    i0.ɵɵtext(8, " Remove ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r72 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", item_r72.title);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(12, _c8));
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r3.onboardingStatusOptions);
    i0.ɵɵtwoWayProperty("ngModel", item_r72.status);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(13, _c8));
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", item_r72.dueDateUtc);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(14, _c8))("showIcon", true);
    i0.ɵɵadvance();
    i0.ɵɵtwoWayProperty("ngModel", item_r72.notes);
    i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(15, _c8));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isOnboardingSaving(item_r72));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.isOnboardingSaved(item_r72));
} }
function OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 457);
    i0.ɵɵtemplate(1, OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_div_1_Template, 9, 16, "div", 458);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.onboardingMilestones);
} }
function OpportunityFormPage_p_accordion_panel_325_ng_container_12_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 313);
    i0.ɵɵtext(1, "No onboarding milestones yet.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_325_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    const _r68 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 107)(2, "div", 511)(3, "input", 512);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_Template_input_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r68); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.newOnboardingChecklistItem, $event) || (ctx_r3.newOnboardingChecklistItem = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 453);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r68); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.addOnboardingItem("Checklist")); });
    i0.ɵɵtext(5, " Add checklist ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_6_Template, 2, 1, "div", 454)(7, OpportunityFormPage_p_accordion_panel_325_ng_container_12_ng_template_7_Template, 2, 0, "ng-template", null, 22, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementStart(9, "div", 511)(10, "input", 513);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_Template_input_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r68); const ctx_r3 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r3.newOnboardingMilestoneItem, $event) || (ctx_r3.newOnboardingMilestoneItem = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 453);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_325_ng_container_12_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r68); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.addOnboardingItem("Milestone")); });
    i0.ɵɵtext(12, " Add milestone ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(13, OpportunityFormPage_p_accordion_panel_325_ng_container_12_div_13_Template, 2, 1, "div", 454)(14, OpportunityFormPage_p_accordion_panel_325_ng_container_12_ng_template_14_Template, 2, 0, "ng-template", null, 23, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const emptyOnboardingChecklist_r73 = i0.ɵɵreference(8);
    const emptyOnboardingMilestones_r74 = i0.ɵɵreference(15);
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.newOnboardingChecklistItem);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.onboardingChecklist.length)("ngIfElse", emptyOnboardingChecklist_r73);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.newOnboardingMilestoneItem);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.onboardingMilestones.length)("ngIfElse", emptyOnboardingMilestones_r74);
} }
function OpportunityFormPage_p_accordion_panel_325_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 359)(1, "p", 360);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.isSectionLoading("onboarding") ? "Loading onboarding checklist\u2026" : "Open section to load onboarding.");
} }
function OpportunityFormPage_p_accordion_panel_325_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-accordion-panel", 509)(1, "p-accordion-header")(2, "div", 103)(3, "span", 104);
    i0.ɵɵelement(4, "i", 510);
    i0.ɵɵtext(5, " Onboarding Checklist & Milestones ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 105)(7, "span", 106);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 106);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(11, "p-accordion-content");
    i0.ɵɵtemplate(12, OpportunityFormPage_p_accordion_panel_325_ng_container_12_Template, 16, 6, "ng-container", 348)(13, OpportunityFormPage_p_accordion_panel_325_ng_template_13_Template, 3, 1, "ng-template", null, 21, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const onboardingLoading_r75 = i0.ɵɵreference(14);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r3.isSectionLocked("onboarding"));
    i0.ɵɵattribute("data-deal-section", "onboarding");
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r3.onboardingHeaderBadge());
    i0.ɵɵadvance();
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.sectionStatusTone("onboarding"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.sectionStatusLabel("onboarding"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r3.isEditMode() || ctx_r3.isSectionLoaded("onboarding"))("ngIfElse", onboardingLoading_r75);
} }
function OpportunityFormPage_p_accordion_panel_326_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 163);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Score: ", ctx_r3.dealHealthScore().score, " ");
} }
function OpportunityFormPage_p_accordion_panel_326_ng_container_11_ng_container_10_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 540)(1, "div", 541)(2, "span", 542);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 543);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 544);
    i0.ɵɵelement(7, "div", 545);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const factor_r77 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(factor_r77.factor);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", factor_r77.score, " / ", factor_r77.maxScore);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", factor_r77.maxScore > 0 ? factor_r77.score / factor_r77.maxScore * 100 : 0, "%")("background", ctx_r3.healthScoreColor(factor_r77.maxScore > 0 ? factor_r77.score / factor_r77.maxScore * 100 : 0));
} }
function OpportunityFormPage_p_accordion_panel_326_ng_container_11_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 524)(2, "div", 525);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 526);
    i0.ɵɵelement(4, "circle", 527)(5, "circle", 528);
    i0.ɵɵelementStart(6, "text", 529);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "text", 530);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(10, "div", 531)(11, "div", 532);
    i0.ɵɵelement(12, "i", 143);
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 533)(16, "span", 534);
    i0.ɵɵelement(17, "i", 535);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 536);
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "date");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(23, "div", 537)(24, "h4", 538);
    i0.ɵɵelement(25, "i", 162);
    i0.ɵɵtext(26, " Score Breakdown ");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(27, OpportunityFormPage_p_accordion_panel_326_ng_container_11_ng_container_10_div_27_Template, 8, 7, "div", 539);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵattribute("stroke", ctx_r3.healthScoreColor(ctx_r3.dealHealthScore().score))("stroke-dasharray", ctx_r3.dealHealthScore().score / 100 * 326.7 + " 326.7");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.dealHealthScore().score);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.dealHealthScore().label);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.dealHealthScore().rationale);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" Confidence: ", i0.ɵɵpipeBind2(19, 8, ctx_r3.dealHealthScore().confidence * 100, "1.0-0"), "% ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" Computed ", i0.ɵɵpipeBind2(22, 11, ctx_r3.dealHealthScore().computedUtc, "short"), " ");
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r3.dealHealthScore().factors);
} }
function OpportunityFormPage_p_accordion_panel_326_ng_container_11_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 546);
    i0.ɵɵelement(1, "i", 519);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Health score not yet computed.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 547);
    i0.ɵɵtext(5, "Click Refresh to compute the deal health score.");
    i0.ɵɵelementEnd()();
} }
function OpportunityFormPage_p_accordion_panel_326_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    const _r76 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 521)(2, "div", 522)(3, "p", 243);
    i0.ɵɵtext(4, "AI-powered health assessment based on deal completeness, activity recency, stakeholder coverage, and process compliance.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 523);
    i0.ɵɵlistener("click", function OpportunityFormPage_p_accordion_panel_326_ng_container_11_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r76); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.refreshDealHealthScore()); });
    i0.ɵɵelementStart(6, "span", 371);
    i0.ɵɵelement(7, "i", 392);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "Refresh");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(10, OpportunityFormPage_p_accordion_panel_326_ng_container_11_ng_container_10_Template, 28, 14, "ng-container", 348)(11, OpportunityFormPage_p_accordion_panel_326_ng_container_11_ng_template_11_Template, 6, 0, "ng-template", null, 25, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const noHealthScore_r78 = i0.ɵɵreference(12);
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r3.dealHealthScoreLoading());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r3.dealHealthScoreLoading() ? "pi-spin pi-spinner" : "pi-refresh");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r3.dealHealthScore())("ngIfElse", noHealthScore_r78);
} }
function OpportunityFormPage_p_accordion_panel_326_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 359)(1, "p", 360);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.isSectionLoading("deal-health-score") ? "Computing health score\u2026" : "Open section to load health score.");
} }
function OpportunityFormPage_p_accordion_panel_326_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-accordion-panel", 518)(1, "p-accordion-header")(2, "div", 103)(3, "span", 104);
    i0.ɵɵelement(4, "i", 519);
    i0.ɵɵtext(5, " Deal Health ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 105);
    i0.ɵɵtemplate(7, OpportunityFormPage_p_accordion_panel_326_span_7_Template, 2, 1, "span", 520);
    i0.ɵɵelementStart(8, "span", 106);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(10, "p-accordion-content");
    i0.ɵɵtemplate(11, OpportunityFormPage_p_accordion_panel_326_ng_container_11_Template, 13, 4, "ng-container", 348)(12, OpportunityFormPage_p_accordion_panel_326_ng_template_12_Template, 3, 1, "ng-template", null, 24, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const healthScoreLoading_r79 = i0.ɵɵreference(13);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r3.isSectionLocked("deal-health-score"));
    i0.ɵɵattribute("data-deal-section", "deal-health-score");
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r3.dealHealthScore());
    i0.ɵɵadvance();
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.sectionStatusTone("deal-health-score"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.sectionStatusLabel("deal-health-score"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r3.isSectionLoaded("deal-health-score"))("ngIfElse", healthScoreLoading_r79);
} }
function OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 562);
} if (rf & 2) {
    const sd_r80 = ctx.$implicit;
    i0.ɵɵstyleProp("flex", sd_r80.durationDays || 1);
    i0.ɵɵclassProp("deal-aging__bar-segment--current", sd_r80.isCurrent);
    i0.ɵɵproperty("title", sd_r80.stage + ": " + sd_r80.durationDays + " days");
} }
function OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_div_4_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 572);
} }
function OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_div_4_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 573);
    i0.ɵɵtext(1, "Current");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_div_4_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const sd_r81 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u2192 ", i0.ɵɵpipeBind2(2, 1, sd_r81.exitedAt, "MMM d, yyyy"));
} }
function OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_div_4_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, " \u2192 now");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 563)(1, "div", 564);
    i0.ɵɵelement(2, "span", 565);
    i0.ɵɵtemplate(3, OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_div_4_span_3_Template, 1, 0, "span", 566);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 567)(5, "div", 568);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 569)(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10);
    i0.ɵɵtemplate(11, OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_div_4_span_11_Template, 2, 0, "span", 570);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 571);
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "date");
    i0.ɵɵtemplate(15, OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_div_4_span_15_Template, 3, 4, "span", 325)(16, OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_div_4_span_16_Template, 2, 0, "span", 325);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const sd_r81 = ctx.$implicit;
    const i_r82 = ctx.index;
    const ctx_r3 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("deal-aging__stage--current", sd_r81.isCurrent);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("deal-aging__stage-dot--current", sd_r81.isCurrent);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i_r82 < ctx_r3.stageDurations().length - 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(sd_r81.stage);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(sd_r81.durationDays);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" day", sd_r81.durationDays === 1 ? "" : "s", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", sd_r81.isCurrent);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(14, 12, sd_r81.enteredAt, "MMM d, yyyy"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", sd_r81.exitedAt);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !sd_r81.exitedAt);
} }
function OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 557)(1, "div", 558);
    i0.ɵɵtemplate(2, OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_div_2_Template, 1, 5, "div", 559);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 560);
    i0.ɵɵtemplate(4, OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_div_4_Template, 17, 15, "div", 561);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r3.stageDurations());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r3.stageDurations());
} }
function OpportunityFormPage_p_accordion_panel_327_ng_container_10_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 574);
    i0.ɵɵelement(1, "i", 549);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No stage history recorded yet.");
    i0.ɵɵelementEnd()();
} }
function OpportunityFormPage_p_accordion_panel_327_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 550)(2, "div", 551)(3, "div", 552)(4, "span", 553);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 554);
    i0.ɵɵtext(7, "days total");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 555);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, OpportunityFormPage_p_accordion_panel_327_ng_container_10_div_10_Template, 5, 2, "div", 556)(11, OpportunityFormPage_p_accordion_panel_327_ng_container_10_ng_template_11_Template, 4, 0, "ng-template", null, 27, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const agingEmpty_r83 = i0.ɵɵreference(12);
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r3.totalDealAgeDays());
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2(" ", ctx_r3.stageDurations().length, " stage", ctx_r3.stageDurations().length === 1 ? "" : "s", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.stageDurations().length)("ngIfElse", agingEmpty_r83);
} }
function OpportunityFormPage_p_accordion_panel_327_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 359)(1, "p", 360);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r3.isSectionLoading("deal-aging") ? "Loading stage history\u2026" : "Open section to load stage history.");
} }
function OpportunityFormPage_p_accordion_panel_327_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-accordion-panel", 548)(1, "p-accordion-header")(2, "div", 103)(3, "span", 104);
    i0.ɵɵelement(4, "i", 549);
    i0.ɵɵtext(5, " Deal Aging ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 105)(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(9, "p-accordion-content");
    i0.ɵɵtemplate(10, OpportunityFormPage_p_accordion_panel_327_ng_container_10_Template, 13, 5, "ng-container", 348)(11, OpportunityFormPage_p_accordion_panel_327_ng_template_11_Template, 3, 1, "ng-template", null, 26, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const agingLoading_r84 = i0.ɵɵreference(12);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r3.isSectionLocked("deal-aging"));
    i0.ɵɵattribute("data-deal-section", "deal-aging");
    i0.ɵɵadvance(7);
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.sectionStatusTone("deal-aging"));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.sectionStatusLabel("deal-aging"), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r3.isSectionLoaded("deal-aging"))("ngIfElse", agingLoading_r84);
} }
function OpportunityFormPage_div_339_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 581);
    i0.ɵɵelement(1, "i", 582);
    i0.ɵɵtext(2, " Uploading\u2026 ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_div_339_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 583);
    i0.ɵɵelement(1, "i", 582);
    i0.ɵɵtext(2, " Loading attachments\u2026 ");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_div_339_p_table_5_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "File Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Size");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Uploaded");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 587);
    i0.ɵɵtext(8, "Actions");
    i0.ɵɵelementEnd()();
} }
function OpportunityFormPage_div_339_p_table_5_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r86 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 588);
    i0.ɵɵelement(3, "i", 277);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 589)(13, "div", 590)(14, "button", 591);
    i0.ɵɵlistener("click", function OpportunityFormPage_div_339_p_table_5_ng_template_2_Template_button_click_14_listener() { const item_r87 = i0.ɵɵrestoreView(_r86).$implicit; const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.downloadDealAttachment(item_r87)); });
    i0.ɵɵelement(15, "i", 592);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 593);
    i0.ɵɵlistener("click", function OpportunityFormPage_div_339_p_table_5_ng_template_2_Template_button_click_16_listener() { const item_r87 = i0.ɵɵrestoreView(_r86).$implicit; const ctx_r3 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r3.deleteDealAttachment(item_r87)); });
    i0.ɵɵelement(17, "i", 392);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const item_r87 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(item_r87.fileName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind2(8, 5, item_r87.size, "1.0-0"), " KB");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 8, item_r87.createdAtUtc, "mediumDate"));
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", ctx_r3.dealAttachmentDeletingIds().includes(item_r87.id));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r3.dealAttachmentDeletingIds().includes(item_r87.id) ? "pi-spinner pi-spin" : "pi-trash");
} }
function OpportunityFormPage_div_339_p_table_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-table", 584);
    i0.ɵɵtemplate(1, OpportunityFormPage_div_339_p_table_5_ng_template_1_Template, 9, 0, "ng-template", 585)(2, OpportunityFormPage_div_339_p_table_5_ng_template_2_Template, 18, 11, "ng-template", 586);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", ctx_r3.dealAttachments())("rows", 10);
} }
function OpportunityFormPage_div_339_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 594);
    i0.ɵɵelement(1, "i", 595);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No files attached yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 596);
    i0.ɵɵtext(5, "Upload contracts, proposals, or other documents related to this deal.");
    i0.ɵɵelementEnd()();
} }
function OpportunityFormPage_div_339_Template(rf, ctx) { if (rf & 1) {
    const _r85 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 575)(1, "div", 576)(2, "p-fileUpload", 577);
    i0.ɵɵlistener("uploadHandler", function OpportunityFormPage_div_339_Template_p_fileUpload_uploadHandler_2_listener($event) { i0.ɵɵrestoreView(_r85); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onDealAttachmentUpload($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, OpportunityFormPage_div_339_span_3_Template, 3, 0, "span", 578);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, OpportunityFormPage_div_339_div_4_Template, 3, 0, "div", 579)(5, OpportunityFormPage_div_339_p_table_5_Template, 3, 2, "p-table", 580)(6, OpportunityFormPage_div_339_div_6_Template, 6, 0, "div", 187);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("customUpload", true)("auto", true)("disabled", ctx_r3.dealAttachmentUploading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.dealAttachmentUploading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.dealAttachmentsLoading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.dealAttachmentsLoading() && ctx_r3.dealAttachments().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r3.dealAttachmentsLoading() && !ctx_r3.dealAttachments().length);
} }
function OpportunityFormPage_div_340_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 594);
    i0.ɵɵelement(1, "i", 418);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Save the deal first to attach files.");
    i0.ɵɵelementEnd()();
} }
function OpportunityFormPage_section_341_div_5_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 606)(1, "span", 607);
    i0.ɵɵtext(2, "Approver role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 608);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const summary_r89 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(summary_r89.approverRole);
} }
function OpportunityFormPage_section_341_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 604)(1, "div", 605)(2, "div", 606)(3, "span", 607);
    i0.ɵɵtext(4, "Purpose");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 608);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 606)(8, "span", 607);
    i0.ɵɵtext(9, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 608);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 606)(13, "span", 607);
    i0.ɵɵtext(14, "Amount");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 608);
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 606)(19, "span", 607);
    i0.ɵɵtext(20, "Requested by");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "span", 608);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 606)(24, "span", 607);
    i0.ɵɵtext(25, "Requested on");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 608);
    i0.ɵɵtext(27);
    i0.ɵɵpipe(28, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(29, OpportunityFormPage_section_341_div_5_div_29_Template, 5, 1, "div", 609);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const summary_r89 = ctx.ngIf;
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(summary_r89.purpose);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(summary_r89.status);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(17, 7, summary_r89.amount, "1.0-2"), " ", summary_r89.currency);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(summary_r89.requestedByName || "Unknown");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(28, 10, summary_r89.requestedOn, "MMM d, y, h:mm a"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", summary_r89.approverRole);
} }
function OpportunityFormPage_section_341_Template(rf, ctx) { if (rf & 1) {
    const _r88 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 597)(1, "h2", 598);
    i0.ɵɵtext(2, "Review Action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 243);
    i0.ɵɵtext(4, "Decision summary and reviewer comment for this pending case.");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, OpportunityFormPage_section_341_div_5_Template, 30, 13, "div", 599);
    i0.ɵɵelementStart(6, "div", 108)(7, "div", 145)(8, "label", 600);
    i0.ɵɵtext(9, "Comment for reviewer / requester");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "textarea", 601);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_section_341_Template_textarea_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r88); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.decisionReviewComment, $event) || (ctx_r3.decisionReviewComment = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 602)(12, "p-select", 603);
    i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_section_341_Template_p_select_ngModelChange_12_listener($event) { i0.ɵɵrestoreView(_r88); const ctx_r3 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r3.decisionAction, $event) || (ctx_r3.decisionAction = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 430);
    i0.ɵɵlistener("click", function OpportunityFormPage_section_341_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r88); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.submitDecisionAction()); });
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r3.decisionReviewSummary());
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.decisionReviewComment);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("options", ctx_r3.decisionActionOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r3.decisionAction);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r3.decisionActionSubmitting() || !ctx_r3.decisionAction);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r3.decisionActionSubmitting() ? "Submitting..." : "Submit Action", " ");
} }
function OpportunityFormPage_section_342_div_6_article_1_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Escalated");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_section_342_div_6_article_1_p_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 621);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r90 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r90.notes);
} }
function OpportunityFormPage_section_342_div_6_article_1_p_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 622);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r90 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r90.policyReason);
} }
function OpportunityFormPage_section_342_div_6_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 615)(1, "div", 616)(2, "span", 106);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 106);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 617);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 618)(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, OpportunityFormPage_section_342_div_6_article_1_span_14_Template, 2, 0, "span", 325);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, OpportunityFormPage_section_342_div_6_article_1_p_15_Template, 2, 1, "p", 619)(16, OpportunityFormPage_section_342_div_6_article_1_p_16_Template, 2, 1, "p", 620);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r90 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.decisionHistoryTone(item_r90));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r90.action, " ");
    i0.ɵɵadvance();
    i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx_r3.decisionStatusTone(item_r90.status));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", item_r90.status, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", item_r90.actorName || "System", " \u00B7 ", i0.ɵɵpipeBind2(8, 13, item_r90.actionAtUtc, "MMM d, y, h:mm a"), " ");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Priority: ", item_r90.priority || "normal");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Risk: ", item_r90.riskLevel || "low");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r90.isEscalated);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r90.notes);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r90.policyReason);
} }
function OpportunityFormPage_section_342_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 613);
    i0.ɵɵtemplate(1, OpportunityFormPage_section_342_div_6_article_1_Template, 17, 16, "article", 614);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.decisionHistory());
} }
function OpportunityFormPage_section_342_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 360);
    i0.ɵɵtext(1, "No approval history yet for this decision.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_section_342_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 610)(1, "div", 611)(2, "h2", 598);
    i0.ɵɵtext(3, "Approval History");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 106);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, OpportunityFormPage_section_342_div_6_Template, 2, 1, "div", 612)(7, OpportunityFormPage_section_342_ng_template_7_Template, 2, 0, "ng-template", null, 28, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const emptyDecisionHistory_r91 = i0.ɵɵreference(8);
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ctx_r3.decisionHistory().length, " entries");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.decisionHistory().length)("ngIfElse", emptyDecisionHistory_r91);
} }
function OpportunityFormPage_div_351_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r92 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 625)(1, "div", 626)(2, "div", 627);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 628);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 629);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 630);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 631)(11, "span", 632);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "titlecase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "button", 633);
    i0.ɵɵlistener("click", function OpportunityFormPage_div_351_div_1_Template_button_click_16_listener() { const match_r93 = i0.ɵɵrestoreView(_r92).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.reviewDuplicate(match_r93)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const match_r93 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(match_r93.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(match_r93.accountName || "No account");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(match_r93.stageName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(match_r93.matchedSignals.join(", "));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-level", match_r93.matchLevel);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 7, match_r93.matchLevel));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Score ", match_r93.matchScore);
} }
function OpportunityFormPage_div_351_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 623);
    i0.ɵɵtemplate(1, OpportunityFormPage_div_351_div_1_Template, 17, 9, "div", 624);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.duplicateMatches());
} }
function OpportunityFormPage_ng_template_352_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 196);
    i0.ɵɵtext(1, "No duplicate details found.");
    i0.ɵɵelementEnd();
} }
function OpportunityFormPage_button_356_Template(rf, ctx) { if (rf & 1) {
    const _r94 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 634);
    i0.ɵɵlistener("click", function OpportunityFormPage_button_356_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r94); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.saveDespiteWarning()); });
    i0.ɵɵelementEnd();
} }
const DEAL_TAB_SECTIONS = {
    core: ['opportunity-details', 'deal-settings'],
    commercial: ['pricing-discounts', 'quote-proposal', 'revenue-forecast'],
    people: ['pre-sales-team', 'deal-stakeholders', 'deal-activity'],
    compliance: ['approval-workflow', 'security-legal', 'review-thread'],
    delivery: ['delivery-handoff', 'onboarding', 'deal-health-score', 'deal-aging', 'deal-attachments']
};
const DEAL_TAB_ORDER = ['core', 'commercial', 'people', 'compliance', 'delivery'];
const DEAL_TAB_META = {
    core: { label: 'Core', icon: 'pi pi-briefcase' },
    commercial: { label: 'Commercial', icon: 'pi pi-chart-line' },
    people: { label: 'People', icon: 'pi pi-users' },
    compliance: { label: 'Compliance', icon: 'pi pi-shield' },
    delivery: { label: 'Delivery', icon: 'pi pi-truck' }
};
const DEAL_PANEL_ORDER = [
    'opportunity-details',
    'deal-settings',
    'pricing-discounts',
    'quote-proposal',
    'pre-sales-team',
    'deal-stakeholders',
    'deal-health-score',
    'deal-aging',
    'approval-workflow',
    'security-legal',
    'delivery-handoff',
    'onboarding',
    'deal-activity',
    'deal-attachments',
    'revenue-forecast',
    'review-thread'
];
export class OpportunityFormPage {
    static DISCOUNT_PERCENT_APPROVAL_THRESHOLD = 10;
    static DISCOUNT_AMOUNT_APPROVAL_THRESHOLD = 1000;
    accordionPanels = signal([
        'opportunity-details',
        'deal-settings'
    ], ...(ngDevMode ? [{ debugName: "accordionPanels" }] : []));
    loadedSectionKeys = signal(new Set([
        'opportunity-details',
        'deal-settings',
        'pricing-discounts',
        'quote-proposal',
        'delivery-handoff'
    ]), ...(ngDevMode ? [{ debugName: "loadedSectionKeys" }] : []));
    loadingSectionKeys = signal(new Set(), ...(ngDevMode ? [{ debugName: "loadingSectionKeys" }] : []));
    lockWarningShown = signal(null, ...(ngDevMode ? [{ debugName: "lockWarningShown" }] : []));
    activeSectionNav = signal('opportunity-details', ...(ngDevMode ? [{ debugName: "activeSectionNav" }] : []));
    activeTab = signal('core', ...(ngDevMode ? [{ debugName: "activeTab" }] : []));
    tabOrder = DEAL_TAB_ORDER;
    tabMeta = DEAL_TAB_META;
    stageOptions = [
        { label: 'Prospecting', value: 'Prospecting' },
        { label: 'Qualification', value: 'Qualification' },
        { label: 'Proposal', value: 'Proposal' },
        { label: 'Security / Legal Review', value: 'Security / Legal Review' },
        { label: 'Negotiation', value: 'Negotiation' },
        { label: 'Commit', value: 'Commit' },
        { label: 'Closed Won', value: 'Closed Won' },
        { label: 'Closed Lost', value: 'Closed Lost' }
    ];
    currencyOptions = [];
    reviewStatusOptions = [
        { label: 'Not Started', value: 'Not Started' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Blocked', value: 'Blocked' }
    ];
    proposalStatusOptions = [
        { label: 'Not Started', value: 'Not Started' },
        { label: 'Draft', value: 'Draft' },
        { label: 'Sent', value: 'Sent' },
        { label: 'Accepted', value: 'Accepted' },
        { label: 'Declined', value: 'Declined' }
    ];
    onboardingStatusOptions = [
        { label: 'Pending', value: 'Pending' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Blocked', value: 'Blocked' }
    ];
    forecastCategoryOptions = [
        { label: 'Pipeline', value: 'Pipeline' },
        { label: 'Best Case', value: 'Best Case' },
        { label: 'Commit', value: 'Commit' },
        { label: 'Closed', value: 'Closed' },
        { label: 'Omitted', value: 'Omitted' }
    ];
    opportunityTypeOptions = [
        { label: 'New', value: 'New' },
        { label: 'Renewal', value: 'Renewal' },
        { label: 'Expansion', value: 'Expansion' }
    ];
    accountOptions = [];
    selectedStage = 'Prospecting';
    form = this.createEmptyForm();
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
    dealNameError = signal(null, ...(ngDevMode ? [{ debugName: "dealNameError" }] : []));
    isEditMode = signal(false, ...(ngDevMode ? [{ debugName: "isEditMode" }] : []));
    canManage = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesManage);
    }, ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    canRequestApproval = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesApprovalsRequest);
    }, ...(ngDevMode ? [{ debugName: "canRequestApproval" }] : []));
    canDecideApproval = computed(() => {
        const context = readTokenContext();
        return (tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesApprovalsApprove) ||
            tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.opportunitiesApprovalsOverride));
    }, ...(ngDevMode ? [{ debugName: "canDecideApproval" }] : []));
    isManager = computed(() => {
        const payload = readTokenContext()?.payload ?? null;
        return (tokenHasRole(payload, 'Sales Manager') ||
            tokenHasRole(payload, 'System Administrator') ||
            tokenHasRole(payload, 'Admin') ||
            tokenHasRole(payload, 'Super Admin'));
    }, ...(ngDevMode ? [{ debugName: "isManager" }] : []));
    hasPendingAcknowledgment = computed(() => this.reviewThread().some((item) => item.kind === 'Acknowledgment' && !item.completedDateUtc), ...(ngDevMode ? [{ debugName: "hasPendingAcknowledgment" }] : []));
    securityChecklist = [];
    legalChecklist = [];
    technicalChecklist = [];
    newSecurityItem = '';
    newLegalItem = '';
    newTechnicalItem = '';
    checklistSavingIds = new Set();
    checklistSavedIds = new Set();
    approvals = [];
    approvalPurposeOptions = [
        { label: 'Close', value: 'Close' },
        { label: 'Discount', value: 'Discount' }
    ];
    approvalRequest = {
        purpose: 'Close',
        amount: 0,
        currency: ''
    };
    approvalRequesting = signal(false, ...(ngDevMode ? [{ debugName: "approvalRequesting" }] : []));
    decisionReviewMode = signal(false, ...(ngDevMode ? [{ debugName: "decisionReviewMode" }] : []));
    activeDecisionId = signal(null, ...(ngDevMode ? [{ debugName: "activeDecisionId" }] : []));
    decisionHistory = signal([], ...(ngDevMode ? [{ debugName: "decisionHistory" }] : []));
    decisionActionSubmitting = signal(false, ...(ngDevMode ? [{ debugName: "decisionActionSubmitting" }] : []));
    decisionReviewComment = '';
    decisionAction = '';
    decisionActionOptions = [
        { label: 'Approve', value: 'approve' },
        { label: 'Reject', value: 'reject' },
        { label: 'Review', value: 'review' },
        { label: 'Escalate', value: 'escalate' }
    ];
    approvalDecisionNotes = {};
    approvalDecidingIds = new Set();
    approvalAmountLocked = false;
    syncingApprovalAmount = false;
    approvalAmountThreshold = null;
    policyGateMessage = signal(null, ...(ngDevMode ? [{ debugName: "policyGateMessage" }] : []));
    canRequestStageOverride = signal(false, ...(ngDevMode ? [{ debugName: "canRequestStageOverride" }] : []));
    stageOverrideRequesting = signal(false, ...(ngDevMode ? [{ debugName: "stageOverrideRequesting" }] : []));
    lastStageOverrideDecisionId = signal(null, ...(ngDevMode ? [{ debugName: "lastStageOverrideDecisionId" }] : []));
    presenceUsers = signal([], ...(ngDevMode ? [{ debugName: "presenceUsers" }] : []));
    reviewOutcomeOptions = [
        { label: 'Approved', value: 'Approved' },
        { label: 'Needs Work', value: 'Needs Work' },
        { label: 'Escalated', value: 'Escalated' }
    ];
    reviewThread = signal([], ...(ngDevMode ? [{ debugName: "reviewThread" }] : []));
    teamRoleOptions = [
        { label: 'Solution Consultant', value: 'Solution Consultant' },
        { label: 'Sales Engineer', value: 'Sales Engineer' },
        { label: 'Product Specialist', value: 'Product Specialist' },
        { label: 'Executive Sponsor', value: 'Executive Sponsor' }
    ];
    deliveryStatusOptions = [
        { label: 'Not Started', value: 'Not Started' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Completed', value: 'Completed' }
    ];
    teamMemberOptions = [];
    teamMembers = [];
    quoteSummaries = [];
    activeQuote = null;
    selectedQuoteId = null;
    quoteName = '';
    quoteStatus = 'Draft';
    quoteTaxAmount = 0;
    quoteNotes = '';
    quotePriceListId = null;
    quoteCurrency = '';
    quoteLines = [];
    itemMasterOptions = [];
    itemMasterMap = new Map();
    priceListOptions = [];
    priceListItems = [];
    quoteSaving = signal(false, ...(ngDevMode ? [{ debugName: "quoteSaving" }] : []));
    quoteLoading = signal(false, ...(ngDevMode ? [{ debugName: "quoteLoading" }] : []));
    quoteApprovalSubmitting = signal(false, ...(ngDevMode ? [{ debugName: "quoteApprovalSubmitting" }] : []));
    proposalGenerating = signal(false, ...(ngDevMode ? [{ debugName: "proposalGenerating" }] : []));
    proposalSending = signal(false, ...(ngDevMode ? [{ debugName: "proposalSending" }] : []));
    proposalSendDialogVisible = false;
    proposalSendRecipient = '';
    proposalSendMessage = '';
    proposalActivityEvents = [];
    recentProposalResendEventId = null;
    proposalResendSourceEventId = null;
    proposalResendChipTimeoutHandle = null;
    teamDirty = false;
    onboardingChecklist = [];
    onboardingMilestones = [];
    onboardingSavingIds = new Set();
    onboardingSavedIds = new Set();
    newOnboardingChecklistItem = '';
    newOnboardingMilestoneItem = '';
    reviewOutcome = 'Needs Work';
    reviewComment = '';
    reviewAckDueLocal = '';
    reviewSubmitting = false;
    ackSubmitting = false;
    nextStepDueAtUtc = null;
    originalStage = null;
    editingId = null;
    pendingDraftToOpen = null;
    hasShownDraftPrompt = false;
    localEditingState = false;
    editingIdleTimer = null;
    pendingOpportunity = null;
    pendingAccountName = null;
    dealCreatedAtUtc = null;
    recentDealActivities = signal([], ...(ngDevMode ? [{ debugName: "recentDealActivities" }] : []));
    recentDealActivitiesLoading = signal(false, ...(ngDevMode ? [{ debugName: "recentDealActivitiesLoading" }] : []));
    dealAttachments = signal([], ...(ngDevMode ? [{ debugName: "dealAttachments" }] : []));
    dealAttachmentsLoading = signal(false, ...(ngDevMode ? [{ debugName: "dealAttachmentsLoading" }] : []));
    dealAttachmentUploading = signal(false, ...(ngDevMode ? [{ debugName: "dealAttachmentUploading" }] : []));
    dealAttachmentDeletingIds = signal([], ...(ngDevMode ? [{ debugName: "dealAttachmentDeletingIds" }] : []));
    /* ── Stakeholders / Contact Roles ───────────────────── */
    dealContactRoles = signal([], ...(ngDevMode ? [{ debugName: "dealContactRoles" }] : []));
    dealContactRolesLoading = signal(false, ...(ngDevMode ? [{ debugName: "dealContactRolesLoading" }] : []));
    stakeholderRemovingIds = signal([], ...(ngDevMode ? [{ debugName: "stakeholderRemovingIds" }] : []));
    stakeholderContactSuggestions = signal([], ...(ngDevMode ? [{ debugName: "stakeholderContactSuggestions" }] : []));
    stakeholderContactSearching = signal(false, ...(ngDevMode ? [{ debugName: "stakeholderContactSearching" }] : []));
    stakeholderContactOptions = signal([], ...(ngDevMode ? [{ debugName: "stakeholderContactOptions" }] : []));
    stakeholderSelectedContactId = '';
    stakeholderSelectedRole = '';
    stakeholderNotes = '';
    stakeholderIsPrimary = false;
    stakeholderAdding = signal(false, ...(ngDevMode ? [{ debugName: "stakeholderAdding" }] : []));
    stakeholderRoleOptions = [
        { label: 'Decision Maker', value: 'Decision Maker' },
        { label: 'Champion', value: 'Champion' },
        { label: 'Influencer', value: 'Influencer' },
        { label: 'Evaluator', value: 'Evaluator' },
        { label: 'Blocker', value: 'Blocker' }
    ];
    /* ── Deal Health Score ────────────────────────────────── */
    dealHealthScore = signal(null, ...(ngDevMode ? [{ debugName: "dealHealthScore" }] : []));
    dealHealthScoreLoading = signal(false, ...(ngDevMode ? [{ debugName: "dealHealthScoreLoading" }] : []));
    /* ── Duplicate Check ──────────────────────────────────── */
    duplicateDialogVisible = signal(false, ...(ngDevMode ? [{ debugName: "duplicateDialogVisible" }] : []));
    duplicateCheckResult = signal(null, ...(ngDevMode ? [{ debugName: "duplicateCheckResult" }] : []));
    duplicateMatches = signal([], ...(ngDevMode ? [{ debugName: "duplicateMatches" }] : []));
    pendingSavePayload = null;
    /* ── Deal Aging / Stage Duration ────────────────────── */
    stageHistory = signal([], ...(ngDevMode ? [{ debugName: "stageHistory" }] : []));
    stageHistoryLoading = signal(false, ...(ngDevMode ? [{ debugName: "stageHistoryLoading" }] : []));
    stageDurations = computed(() => {
        const history = this.stageHistory();
        if (!history.length)
            return [];
        const sorted = [...history].sort((a, b) => new Date(a.changedAtUtc).getTime() - new Date(b.changedAtUtc).getTime());
        const durations = [];
        for (let i = 0; i < sorted.length; i++) {
            const enteredAt = new Date(sorted[i].changedAtUtc);
            const exitedAt = i + 1 < sorted.length ? new Date(sorted[i + 1].changedAtUtc) : null;
            const diffMs = (exitedAt ?? new Date()).getTime() - enteredAt.getTime();
            durations.push({
                stage: sorted[i].stage,
                durationDays: Math.max(Math.round(diffMs / 86_400_000), 0),
                enteredAt,
                exitedAt,
                isCurrent: !exitedAt
            });
        }
        return durations;
    }, ...(ngDevMode ? [{ debugName: "stageDurations" }] : []));
    totalDealAgeDays = computed(() => {
        const created = this.dealCreatedAtUtc;
        if (!created)
            return 0;
        const diffMs = new Date().getTime() - new Date(created).getTime();
        return Math.max(Math.round(diffMs / 86_400_000), 0);
    }, ...(ngDevMode ? [{ debugName: "totalDealAgeDays" }] : []));
    /* ── Revenue Forecast Chart ─────────────────────────── */
    forecastChartData = computed(() => {
        const amount = Number(this.form?.amount ?? 0);
        const probability = Number(this.form?.probability ?? 0);
        const discountPct = Number(this.form?.discountPercent ?? 0);
        const discountAmt = Number(this.form?.discountAmount ?? 0);
        const discount = discountAmt > 0 ? discountAmt : (amount * discountPct / 100);
        const netAmount = Math.max(amount - discount, 0);
        const weightedValue = netAmount * (probability / 100);
        const riskValue = netAmount - weightedValue;
        return {
            labels: ['Weighted Revenue', 'Risk Adjusted', 'Discount'],
            datasets: [{
                    data: [weightedValue, riskValue, discount],
                    backgroundColor: ['rgba(102, 126, 234, 0.85)', 'rgba(156, 163, 175, 0.5)', 'rgba(239, 68, 68, 0.6)'],
                    borderColor: ['#667eea', '#9ca3af', '#ef4444'],
                    borderWidth: 2,
                    hoverBackgroundColor: ['rgba(102, 126, 234, 1)', 'rgba(156, 163, 175, 0.75)', 'rgba(239, 68, 68, 0.85)']
                }]
        };
    }, ...(ngDevMode ? [{ debugName: "forecastChartData" }] : []));
    forecastChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
            legend: { display: true, position: 'bottom', labels: { padding: 16, usePointStyle: true, pointStyle: 'circle', font: { size: 12 } } },
            tooltip: {
                callbacks: {
                    label: (ctx) => {
                        const val = ctx.parsed ?? 0;
                        return ` ${ctx.label}: ${val.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}`;
                    }
                }
            }
        }
    };
    forecastMetrics = computed(() => {
        const amount = Number(this.form?.amount ?? 0);
        const probability = Number(this.form?.probability ?? 0);
        const discountPct = Number(this.form?.discountPercent ?? 0);
        const discountAmt = Number(this.form?.discountAmount ?? 0);
        const discount = discountAmt > 0 ? discountAmt : (amount * discountPct / 100);
        const netAmount = Math.max(amount - discount, 0);
        const weightedValue = netAmount * (probability / 100);
        return { amount, netAmount, weightedValue, discount, probability };
    }, ...(ngDevMode ? [{ debugName: "forecastMetrics" }] : []));
    activityData = inject(ActivityDataService);
    attachmentData = inject(AttachmentDataService);
    contactData = inject(ContactDataService);
    opportunityData = inject(OpportunityDataService);
    approvalService = inject(OpportunityApprovalService);
    checklistService = inject(OpportunityReviewChecklistService);
    onboardingService = inject(OpportunityOnboardingService);
    userAdminData = inject(UserAdminDataService);
    settingsService = inject(WorkspaceSettingsService);
    referenceData = inject(ReferenceDataService);
    crmEvents = inject(CrmEventsService);
    formDraftService = inject(FormDraftService);
    router = inject(Router);
    customerData = inject(CustomerDataService);
    toastService = inject(AppToastService);
    route = inject(ActivatedRoute);
    cdr = inject(ChangeDetectorRef);
    document = inject(DOCUMENT);
    currentUserId = readUserId();
    currencyFallback = '';
    destroy$ = new Subject();
    originalFormSnapshot = '';
    pendingLeaveResolver = null;
    pendingLeaveDecision = null;
    leaveAfterSave = false;
    leaveAfterDraftSave = false;
    ngOnInit() {
        this.loadRecentDrafts();
        this.loadCurrencyContext();
        this.loadAccounts();
        this.loadQuoteCatalogData();
        this.reviewAckDueLocal = this.defaultReviewDueLocal();
        this.route.queryParamMap.subscribe((params) => {
            const isDecisionReview = params.get('reviewMode') === 'decision';
            const decisionId = params.get('decisionId');
            const isActiveReview = isDecisionReview && !!decisionId;
            this.decisionReviewMode.set(isActiveReview);
            this.activeDecisionId.set(isActiveReview ? decisionId : null);
            this.decisionReviewComment = '';
            if (isActiveReview && decisionId) {
                this.loadDecisionHistory(decisionId);
                this.ensureSectionDataLoaded('approval-workflow');
            }
            else {
                this.decisionHistory.set([]);
            }
        });
        this.route.paramMap.subscribe((params) => {
            const previousId = this.editingId;
            const id = params.get('id');
            if (previousId && previousId !== id) {
                this.crmEvents.leaveRecordPresence('opportunity', previousId);
            }
            this.editingId = id;
            this.isEditMode.set(!!id);
            if (id) {
                this.crmEvents.joinRecordPresence('opportunity', id);
                this.loadOpportunity(id);
                this.ensureSectionDataLoaded('approval-workflow');
                this.loadSectionsForOpenPanels();
            }
            else {
                this.presenceUsers.set([]);
                this.form = this.createEmptyForm();
                this.resetQuoteWorkspace();
                this.selectedStage = this.form.stageName ?? 'Prospecting';
                this.securityChecklist = [];
                this.legalChecklist = [];
                this.onboardingChecklist = [];
                this.onboardingMilestones = [];
                this.approvals = [];
                this.reviewThread.set([]);
                this.loadedSectionKeys.set(new Set([
                    'opportunity-details',
                    'deal-settings',
                    'pricing-discounts',
                    'quote-proposal',
                    'delivery-handoff'
                ]));
                this.loadingSectionKeys.set(new Set());
                this.captureFormSnapshot();
            }
        });
        this.loadTeamMemberOptions();
        this.crmEvents.connect();
        this.crmEvents.events$
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => this.handleRealtimeEvent(event));
    }
    ngOnDestroy() {
        this.resolvePendingLeave(false);
        this.clearEditingIdleTimer();
        if (this.editingId) {
            this.crmEvents.setRecordEditingState('opportunity', this.editingId, false);
            this.crmEvents.leaveRecordPresence('opportunity', this.editingId);
        }
        this.destroy$.next();
        this.destroy$.complete();
        if (this.proposalResendChipTimeoutHandle) {
            clearTimeout(this.proposalResendChipTimeoutHandle);
            this.proposalResendChipTimeoutHandle = null;
        }
    }
    hasUnsavedChanges() {
        return this.originalFormSnapshot !== '' && this.createFormSnapshot() !== this.originalFormSnapshot;
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
    onCollaborativeEditingActivity() {
        if (!this.editingId || !this.isEditMode()) {
            return;
        }
        if (!this.localEditingState) {
            this.localEditingState = true;
            this.crmEvents.setRecordEditingState('opportunity', this.editingId, true);
        }
        this.clearEditingIdleTimer();
        this.editingIdleTimer = setTimeout(() => {
            if (!this.editingId) {
                return;
            }
            this.localEditingState = false;
            this.crmEvents.setRecordEditingState('opportunity', this.editingId, false);
        }, 8000);
    }
    onAccordionPanelsChange(value) {
        const next = Array.isArray(value)
            ? value.map((item) => String(item))
            : (value != null ? [String(value)] : []);
        const normalized = this.normalizePanels(next);
        this.accordionPanels.set(normalized);
        const active = normalized.find((panel) => DEAL_PANEL_ORDER.includes(panel));
        if (active) {
            this.activeSectionNav.set(active);
        }
        const rejected = next.find((panel) => !normalized.includes(panel));
        if (rejected) {
            const reason = this.sectionLockReason(rejected) ?? 'Section is locked by workflow policy.';
            if (this.lockWarningShown() !== rejected) {
                this.toastService.show('error', reason, 2800);
                this.lockWarningShown.set(rejected);
            }
        }
        else {
            this.lockWarningShown.set(null);
        }
        this.loadSectionsForOpenPanels();
    }
    isSectionLoaded(section) {
        return this.loadedSectionKeys().has(section);
    }
    isSectionLoading(section) {
        return this.loadingSectionKeys().has(section);
    }
    isSectionLocked(section) {
        return !!this.sectionLockReason(section);
    }
    sectionLockReason(section) {
        const stage = this.selectedStage || this.form.stageName || 'Prospecting';
        const stageRank = this.stageRank(stage);
        const detailsReady = Boolean(this.form.name?.trim()) && Boolean(this.form.accountId);
        if (section === 'opportunity-details' || section === 'deal-settings' || section === 'pricing-discounts') {
            return null;
        }
        if (section === 'quote-proposal') {
            if (!detailsReady)
                return 'Complete deal basics first (name and account).';
            if (stageRank < this.stageRank('Proposal'))
                return 'Move to Proposal stage to unlock Quote / Proposal.';
            return null;
        }
        if (section === 'pre-sales-team') {
            if (!this.isEditMode())
                return 'Save deal first to assign pre-sales team.';
            if (stageRank < this.stageRank('Proposal'))
                return 'Move to Proposal stage to unlock Pre-Sales Team.';
            return null;
        }
        if (section === 'deal-stakeholders') {
            if (!this.isEditMode())
                return 'Save deal first to assign stakeholders.';
            if (stageRank < this.stageRank('Qualification'))
                return 'Move to Qualification stage to unlock Stakeholders.';
            return null;
        }
        if (section === 'deal-health-score') {
            if (!this.isEditMode())
                return 'Save deal first to view health score.';
            return null;
        }
        if (section === 'deal-aging') {
            if (!this.isEditMode())
                return 'Save deal first to view stage timeline.';
            return null;
        }
        if (section === 'approval-workflow') {
            if (!this.isEditMode())
                return 'Save deal first to request approvals.';
            if (!this.shouldShowApprovalWorkflowSection() && !this.approvals.length) {
                return 'Approval workflow appears only when approval is required.';
            }
            return null;
        }
        if (section === 'security-legal') {
            if (!this.isEditMode())
                return 'Save deal first to manage Security & Legal checklists.';
            if (stageRank < this.stageRank('Security / Legal Review')) {
                return 'Move to Security / Legal Review stage to unlock this section.';
            }
            return null;
        }
        if (section === 'delivery-handoff') {
            if (!this.isEditMode())
                return 'Save deal first to plan delivery handoff.';
            if (stageRank < this.stageRank('Commit'))
                return 'Move to Commit stage to unlock Delivery & Handoff.';
            return null;
        }
        if (section === 'onboarding') {
            if (!this.isEditMode())
                return 'Save deal first to manage onboarding.';
            if (!this.form.isWon && stage !== 'Closed Won')
                return 'Onboarding unlocks after Closed Won.';
            return null;
        }
        if (section === 'review-thread') {
            if (!this.isEditMode())
                return 'Save deal first to use review thread.';
            if (stageRank < this.stageRank('Qualification'))
                return 'Move to Qualification stage to unlock review thread.';
            return null;
        }
        return null;
    }
    sectionStatus(section) {
        if (this.isSectionLocked(section))
            return 'locked';
        if (section === 'opportunity-details') {
            return this.form.name?.trim() && this.form.accountId ? 'complete' : 'in-progress';
        }
        if (section === 'deal-settings') {
            return this.form.amount && this.form.amount > 0 ? 'complete' : 'in-progress';
        }
        if (section === 'pricing-discounts') {
            return (this.form.discountAmount || this.form.discountPercent) ? 'in-progress' : 'ready';
        }
        if (section === 'quote-proposal') {
            return this.form.proposalStatus && this.form.proposalStatus !== 'Not Started' ? 'in-progress' : 'ready';
        }
        if (section === 'pre-sales-team') {
            return this.teamMembers.length ? 'in-progress' : 'ready';
        }
        if (section === 'deal-stakeholders') {
            return this.dealContactRoles().length ? 'in-progress' : 'ready';
        }
        if (section === 'deal-health-score') {
            const hs = this.dealHealthScore();
            if (!hs)
                return 'ready';
            if (hs.score >= 80)
                return 'complete';
            return 'in-progress';
        }
        if (section === 'deal-aging') {
            return this.stageHistory().length ? 'in-progress' : 'ready';
        }
        if (section === 'approval-workflow') {
            if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'pending'))
                return 'in-progress';
            if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'approved'))
                return 'complete';
            return 'ready';
        }
        if (section === 'security-legal') {
            const any = this.securityChecklist.length + this.legalChecklist.length + this.technicalChecklist.length;
            return any > 0 ? 'in-progress' : 'ready';
        }
        if (section === 'delivery-handoff') {
            return this.form.deliveryOwnerId && this.form.deliveryHandoffScope?.trim() ? 'in-progress' : 'ready';
        }
        if (section === 'onboarding') {
            const any = this.onboardingChecklist.length + this.onboardingMilestones.length;
            return any > 0 ? 'in-progress' : 'ready';
        }
        if (section === 'review-thread') {
            return this.reviewThread().length ? 'in-progress' : 'ready';
        }
        return 'ready';
    }
    onActiveTabChange(tabKey) {
        if (tabKey == null)
            return;
        this.activeTab.set(String(tabKey));
        const key = String(tabKey);
        const tabSections = DEAL_TAB_SECTIONS[key] ?? [];
        const firstVisible = tabSections.find((s) => this.isSectionVisible(s) && !this.isSectionLocked(s));
        if (firstVisible && !this.accordionPanels().includes(firstVisible)) {
            this.openDealSection(firstVisible);
        }
    }
    onTabAccordionChange(tabKey, value) {
        const incoming = Array.isArray(value) ? value.map(String) : (value != null ? [String(value)] : []);
        const tabSections = new Set(DEAL_TAB_SECTIONS[tabKey]);
        const otherPanels = this.accordionPanels().filter((p) => !tabSections.has(p));
        const merged = [...otherPanels, ...incoming];
        this.onAccordionPanelsChange(merged);
    }
    tabSectionPanels(tabKey) {
        const tabSections = DEAL_TAB_SECTIONS[tabKey];
        return this.accordionPanels().filter((p) => tabSections.includes(p));
    }
    isTabVisible(tabKey) {
        return DEAL_TAB_SECTIONS[tabKey].some((s) => this.isSectionVisible(s));
    }
    tabBadgeCount(tabKey) {
        return DEAL_TAB_SECTIONS[tabKey].filter((s) => this.isSectionVisible(s)).length;
    }
    sectionIcon(section) {
        return this.sectionMeta(section).icon;
    }
    sectionMeta(section) {
        const sectionMap = {
            'opportunity-details': { label: 'Deal Details', icon: 'pi pi-briefcase' },
            'deal-settings': { label: 'Deal Settings', icon: 'pi pi-chart-line' },
            'pricing-discounts': { label: 'Pricing & Discounts', icon: 'pi pi-percentage' },
            'quote-proposal': { label: 'Quote / Proposal', icon: 'pi pi-file-edit' },
            'pre-sales-team': { label: 'Pre-Sales Team', icon: 'pi pi-users' },
            'deal-stakeholders': { label: 'Stakeholders', icon: 'pi pi-id-card' },
            'deal-health-score': { label: 'Deal Health', icon: 'pi pi-heart' },
            'deal-aging': { label: 'Deal Aging', icon: 'pi pi-stopwatch' },
            'approval-workflow': { label: 'Approval Workflow', icon: 'pi pi-check-circle' },
            'security-legal': { label: 'Security & Legal', icon: 'pi pi-shield' },
            'delivery-handoff': { label: 'Delivery & Handoff', icon: 'pi pi-truck' },
            onboarding: { label: 'Onboarding', icon: 'pi pi-list-check' },
            'deal-activity': { label: 'Activity Timeline', icon: 'pi pi-clock' },
            'deal-attachments': { label: 'File Attachments', icon: 'pi pi-paperclip' },
            'revenue-forecast': { label: 'Revenue Forecast', icon: 'pi pi-chart-bar' },
            'review-thread': { label: 'Review / History', icon: 'pi pi-comments' }
        };
        return sectionMap[section];
    }
    sectionStatusLabel(section) {
        if (section === 'pricing-discounts') {
            const discountPercent = Number(this.form.discountPercent ?? 0);
            const discountAmount = Number(this.form.discountAmount ?? 0);
            const needsDiscountApproval = discountPercent >= OpportunityFormPage.DISCOUNT_PERCENT_APPROVAL_THRESHOLD ||
                discountAmount >= OpportunityFormPage.DISCOUNT_AMOUNT_APPROVAL_THRESHOLD;
            if (this.hasFinalApprovalByPurpose('discount', 'rejected'))
                return 'Action Required';
            if (this.hasFinalApprovalByPurpose('discount', 'approved'))
                return 'Approved';
            if (this.hasPendingApprovalByPurpose('discount'))
                return 'Submitted';
            if (needsDiscountApproval)
                return 'Needs Approval';
            if (discountPercent > 0 || discountAmount > 0)
                return 'Configured';
        }
        if (section === 'approval-workflow') {
            if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'pending'))
                return 'Approval Pending';
            if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'approved'))
                return 'Approved';
            if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'rejected'))
                return 'Rejected';
            if (this.approvals.length > 0)
                return 'Submitted';
        }
        const status = this.sectionStatus(section);
        if (status === 'locked')
            return 'Locked';
        if (status === 'complete')
            return 'Complete';
        if (status === 'in-progress')
            return 'In Progress';
        return 'Ready';
    }
    sectionStatusTone(section) {
        if (section === 'pricing-discounts') {
            const discountPercent = Number(this.form.discountPercent ?? 0);
            const discountAmount = Number(this.form.discountAmount ?? 0);
            const needsDiscountApproval = discountPercent >= OpportunityFormPage.DISCOUNT_PERCENT_APPROVAL_THRESHOLD ||
                discountAmount >= OpportunityFormPage.DISCOUNT_AMOUNT_APPROVAL_THRESHOLD;
            if (this.hasFinalApprovalByPurpose('discount', 'rejected'))
                return 'danger';
            if (this.hasFinalApprovalByPurpose('discount', 'approved'))
                return 'success';
            if (this.hasPendingApprovalByPurpose('discount'))
                return 'info';
            if (needsDiscountApproval)
                return 'warning';
            if (discountPercent > 0 || discountAmount > 0)
                return 'info';
        }
        if (section === 'approval-workflow') {
            if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'pending'))
                return 'warning';
            if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'approved'))
                return 'success';
            if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'rejected'))
                return 'danger';
            if (this.approvals.length > 0)
                return 'info';
        }
        const status = this.sectionStatus(section);
        if (status === 'locked')
            return 'danger';
        if (status === 'complete')
            return 'success';
        if (status === 'in-progress')
            return 'info';
        return 'neutral';
    }
    isSectionVisible(section) {
        const stage = this.selectedStage || this.form.stageName || 'Prospecting';
        const rank = this.stageRank(stage);
        const proposalRank = this.stageRank('Proposal');
        const securityRank = this.stageRank('Security / Legal Review');
        const commitRank = this.stageRank('Commit');
        const qualificationRank = this.stageRank('Qualification');
        if (section === 'opportunity-details' || section === 'deal-settings' || section === 'pricing-discounts') {
            return true;
        }
        if (section === 'approval-workflow') {
            return this.shouldShowApprovalWorkflowSection() || this.approvals.length > 0 || this.decisionReviewMode() || this.requesterApprovalLocked();
        }
        if (section === 'quote-proposal' || section === 'pre-sales-team') {
            return rank >= proposalRank;
        }
        if (section === 'deal-stakeholders') {
            return this.isEditMode() && rank >= qualificationRank;
        }
        if (section === 'deal-health-score') {
            return this.isEditMode();
        }
        if (section === 'deal-aging') {
            return this.isEditMode();
        }
        if (section === 'security-legal') {
            return rank >= securityRank;
        }
        if (section === 'delivery-handoff') {
            return rank >= commitRank && stage !== 'Closed Lost';
        }
        if (section === 'onboarding') {
            return stage === 'Closed Won' || !!this.form.isWon;
        }
        if (section === 'review-thread') {
            if (this.requesterApprovalLocked()) {
                return true;
            }
            return this.isEditMode() && (rank >= qualificationRank || this.reviewThread().length > 0);
        }
        return true;
    }
    isSectionActive(section) {
        return this.accordionPanels().includes(section);
    }
    openDealSection(section) {
        if (!this.isSectionVisible(section))
            return;
        const reason = this.sectionLockReason(section);
        if (reason) {
            this.toastService.show('error', reason, 2800);
            return;
        }
        const next = this.normalizePanels([...this.accordionPanels(), section]);
        this.accordionPanels.set(next);
        this.activeSectionNav.set(section);
        this.lockWarningShown.set(null);
        this.loadSectionsForOpenPanels();
        setTimeout(() => {
            const sectionNode = this.document?.querySelector(`[data-deal-section="${section}"]`);
            sectionNode?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 70);
    }
    dealOwnerLabel() {
        if (this.form.deliveryOwnerId) {
            const ownerOption = this.teamMemberOptions.find((option) => option.value === this.form.deliveryOwnerId);
            if (ownerOption?.label) {
                return ownerOption.label;
            }
        }
        const firstTeamMember = this.teamMembers.find((member) => member.userName?.trim());
        if (firstTeamMember?.userName) {
            return firstTeamMember.userName;
        }
        return 'Not assigned';
    }
    dealRiskSummary() {
        if (this.policyGateMessage()) {
            return { label: 'High Risk', detail: 'Policy gate active', tone: 'danger' };
        }
        if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'pending')) {
            return { label: 'Approval Pending', detail: 'Decision required', tone: 'warning' };
        }
        if ((this.selectedStage || '').toLowerCase() === 'commit') {
            return { label: 'Commit Watch', detail: 'Late-stage control', tone: 'info' };
        }
        return { label: 'Normal', detail: 'No active blockers', tone: 'success' };
    }
    onStageChange(stage) {
        this.selectedStage = stage;
        this.form.stageName = stage;
        this.form.probability = this.estimateProbability(stage);
        this.form.isClosed = stage.startsWith('Closed');
        this.form.isWon = stage === 'Closed Won';
        this.form.forecastCategory = this.estimateForecastCategory(stage);
        this.enforceAccordionAccess();
    }
    amountApprovalBadge() {
        const threshold = this.approvalAmountThreshold ?? 0;
        const amount = Number(this.form.amount ?? 0);
        const closeApproval = this.latestApprovalByPurpose('Close');
        if (closeApproval) {
            const status = (closeApproval.status || '').toLowerCase();
            if (status === 'pending') {
                return { label: 'Approval pending', detail: 'Close approval request submitted', tone: 'warning' };
            }
            if (status === 'approved') {
                return { label: 'Approval approved', detail: 'Close approval already granted', tone: 'success' };
            }
            if (status === 'rejected') {
                return { label: 'Approval rejected', detail: 'Close approval was rejected', tone: 'danger' };
            }
        }
        if (!threshold || threshold <= 0) {
            return { label: 'No close threshold', detail: 'No amount-based close approval rule configured', tone: 'neutral' };
        }
        if (amount >= threshold) {
            const closing = Boolean(this.form.isClosed || this.selectedStage?.startsWith('Closed'));
            return {
                label: closing ? 'Approval required' : 'Approval likely on close',
                detail: `Threshold ${threshold.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${this.resolveCurrencyCode()}`,
                tone: closing ? 'danger' : 'warning'
            };
        }
        return {
            label: 'Within close threshold',
            detail: `Below ${threshold.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${this.resolveCurrencyCode()}`,
            tone: 'success'
        };
    }
    discountApprovalBadge() {
        const discountApproval = this.latestApprovalByPurpose('Discount');
        if (discountApproval) {
            const status = (discountApproval.status || '').toLowerCase();
            if (status === 'pending') {
                return { label: 'Approval pending', detail: 'Discount approval request submitted', tone: 'warning' };
            }
            if (status === 'approved') {
                return { label: 'Approval approved', detail: 'Discount approval already granted', tone: 'success' };
            }
            if (status === 'rejected') {
                return { label: 'Approval rejected', detail: 'Discount approval was rejected', tone: 'danger' };
            }
        }
        const percent = Number(this.form.discountPercent ?? 0);
        const amount = Number(this.form.discountAmount ?? 0);
        const requiresApproval = percent >= OpportunityFormPage.DISCOUNT_PERCENT_APPROVAL_THRESHOLD ||
            amount >= OpportunityFormPage.DISCOUNT_AMOUNT_APPROVAL_THRESHOLD;
        if (requiresApproval) {
            return {
                label: 'Discount approval required',
                detail: `>=${OpportunityFormPage.DISCOUNT_PERCENT_APPROVAL_THRESHOLD}% or >=${OpportunityFormPage.DISCOUNT_AMOUNT_APPROVAL_THRESHOLD} ${this.resolveCurrencyCode()}`,
                tone: 'danger'
            };
        }
        if (percent > 0 || amount > 0) {
            return {
                label: 'Within discount policy',
                detail: `Below ${OpportunityFormPage.DISCOUNT_PERCENT_APPROVAL_THRESHOLD}% / ${OpportunityFormPage.DISCOUNT_AMOUNT_APPROVAL_THRESHOLD} ${this.resolveCurrencyCode()}`,
                tone: 'info'
            };
        }
        return { label: 'No discount approval', detail: 'No discount entered', tone: 'neutral' };
    }
    opportunityDetailsBadge() {
        const nameReady = Boolean(this.form.name?.trim());
        const stageReady = Boolean((this.selectedStage || this.form.stageName || '').trim());
        if (nameReady && stageReady) {
            return `${this.selectedStage || this.form.stageName}`;
        }
        if (nameReady) {
            return 'Name ready';
        }
        return 'Setup';
    }
    dealSettingsHeaderBadge() {
        return this.amountApprovalBadge().label;
    }
    pricingHeaderBadge() {
        return this.discountApprovalBadge().label;
    }
    proposalHeaderBadge() {
        return this.form.proposalStatus || 'Not Started';
    }
    preSalesTeamHeaderBadge() {
        return this.teamMembers.length ? `${this.teamMembers.length} teammate${this.teamMembers.length > 1 ? 's' : ''}` : 'No teammates';
    }
    approvalWorkflowHeaderBadge() {
        if (!this.isEditMode()) {
            return 'Save first';
        }
        const pending = this.approvals.filter((a) => (a.status || '').toLowerCase() === 'pending').length;
        if (pending > 0) {
            return `${pending} pending`;
        }
        if (this.approvals.length > 0) {
            return `${this.approvals.length} total`;
        }
        return 'No requests';
    }
    approvalWorkflowHeaderTone() {
        return this.approvals.some((a) => (a.status || '').toLowerCase() === 'pending') ? 'warning' : 'neutral';
    }
    shouldShowApprovalWorkflowSection() {
        if (!this.isEditMode()) {
            return false;
        }
        if (this.approvals.length > 0) {
            return true;
        }
        const discountPercent = Number(this.form.discountPercent ?? 0);
        const discountAmount = Number(this.form.discountAmount ?? 0);
        const needsDiscountApproval = discountPercent >= OpportunityFormPage.DISCOUNT_PERCENT_APPROVAL_THRESHOLD ||
            discountAmount >= OpportunityFormPage.DISCOUNT_AMOUNT_APPROVAL_THRESHOLD;
        const amountThreshold = this.approvalAmountThreshold ?? 0;
        const amount = Number(this.form.amount ?? 0);
        const needsAmountApproval = amountThreshold > 0 && amount >= amountThreshold;
        return needsDiscountApproval || needsAmountApproval;
    }
    requesterApprovalLocked() {
        if (!this.isEditMode()) {
            return false;
        }
        return this.approvals.some((approval) => (approval.status || '').toLowerCase() === 'pending');
    }
    currentApprovalStatusLabel() {
        const pendingCount = this.approvals.filter((a) => (a.status || '').toLowerCase() === 'pending').length;
        if (pendingCount > 0) {
            return pendingCount === 1 ? 'Pending for Approval' : `${pendingCount} Pending for Approval`;
        }
        const approvedCount = this.approvals.filter((a) => (a.status || '').toLowerCase() === 'approved').length;
        if (approvedCount > 0) {
            return approvedCount === 1 ? 'Approved' : `${approvedCount} Approved`;
        }
        const rejectedCount = this.approvals.filter((a) => (a.status || '').toLowerCase() === 'rejected').length;
        if (rejectedCount > 0) {
            return rejectedCount === 1 ? 'Rejected' : `${rejectedCount} Rejected`;
        }
        return 'No Approval Requested';
    }
    currentApprovalStatusTone() {
        if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'pending')) {
            return 'warning';
        }
        if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'approved')) {
            return 'success';
        }
        if (this.approvals.some((a) => (a.status || '').toLowerCase() === 'rejected')) {
            return 'danger';
        }
        return 'neutral';
    }
    approvalPendingSummaryDetail() {
        return this.requesterApprovalLocked()
            ? 'Read-only: deal is locked while approval is pending'
            : this.currentApprovalStatusLabel();
    }
    decisionReviewSummary() {
        const decisionId = this.activeDecisionId();
        if (!decisionId) {
            return null;
        }
        return this.approvals.find((approval) => approval.id === decisionId) ?? null;
    }
    securityLegalHeaderBadge() {
        const total = this.securityChecklist.length + this.legalChecklist.length + this.technicalChecklist.length;
        if (!total) {
            return 'No checks';
        }
        const blocked = [...this.securityChecklist, ...this.legalChecklist, ...this.technicalChecklist]
            .filter((item) => (item.status || '').toLowerCase() === 'blocked').length;
        return blocked > 0 ? `${blocked} blocked` : `${total} checks`;
    }
    deliveryHeaderBadge() {
        return this.form.deliveryStatus || 'Not Started';
    }
    onboardingHeaderBadge() {
        const total = this.onboardingChecklist.length + this.onboardingMilestones.length;
        if (!total) {
            return 'No items';
        }
        return `${total} items`;
    }
    reviewThreadHeaderBadge() {
        if (!this.isEditMode()) {
            return 'Save first';
        }
        const pendingAck = this.hasPendingAcknowledgment();
        if (pendingAck) {
            return 'Ack pending';
        }
        const count = this.reviewThread().length;
        return count ? `${count} entries` : 'No reviews';
    }
    reviewThreadHeaderTone() {
        return this.hasPendingAcknowledgment() ? 'warning' : 'neutral';
    }
    onSave() {
        if (this.requesterApprovalLocked()) {
            this.toastService.show('error', 'This deal is read-only while approval is pending.', 5000);
            return false;
        }
        if (this.decisionReviewMode()) {
            this.toastService.show('success', 'This record is opened in decision review mode (read-only).', 3000);
            return false;
        }
        if (!this.form.name) {
            this.dealNameError.set('Deal name is required.');
            this.toastService.show('error', 'Deal name is required.', 5000);
            this.scrollToFirstError('oppName');
            return false;
        }
        this.dealNameError.set(null);
        const teamError = this.validateTeamMembers();
        if (teamError) {
            this.toastService.show('error', teamError, 5000);
            return false;
        }
        const validationError = this.validateStageRequirements();
        if (validationError) {
            this.handlePolicyGateMessage(validationError);
            this.toastService.show('error', validationError, 5000);
            this.scrollToGateBanner();
            return false;
        }
        const payload = this.buildSavePayload();
        if (!this.editingId) {
            this.submitWithDuplicateGuard(payload);
        }
        else {
            this.performSave(payload);
        }
        return true;
    }
    primarySaveLabel() {
        return this.isEditMode() ? 'Update Opportunity' : 'Create Opportunity';
    }
    dealHeaderScoreValue() {
        return this.dealHealthScore()?.score ?? 0;
    }
    dealHeaderScoreColor() {
        return this.healthScoreColor(this.dealHeaderScoreValue());
    }
    dealHeaderStageSummary() {
        const stage = this.selectedStage || this.form.stageName || 'Prospecting';
        const order = this.stageOptions.map((item) => item.value);
        const index = order.indexOf(stage);
        if (index >= 0) {
            return `Stage ${index + 1} of ${order.length}`;
        }
        if (stage.startsWith('Closed')) {
            return 'Outcome recorded';
        }
        return 'Pipeline stage';
    }
    dealHeaderScoreMessage() {
        if (!this.dealHealthScore()) {
            return 'Overall deal score is shown here after the deal health score is computed. Lifecycle progress remains separate.';
        }
        return 'Overall deal score is shown here, while the current stage and pipeline progress remain separate.';
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
            entityType: 'opportunity',
            title: this.buildDraftTitle(),
            subtitle: this.buildDraftSubtitle(),
            payloadJson: JSON.stringify({ form: this.form, selectedStage: this.selectedStage })
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
                this.toastService.show('error', 'Unable to save draft.', 5000);
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
            error: () => this.toastService.show('error', 'Unable to discard draft.', 5000)
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
    buildSavePayload() {
        const rawCloseDate = this.form.expectedCloseDate;
        const expectedCloseDate = rawCloseDate instanceof Date
            ? rawCloseDate.toISOString()
            : (typeof rawCloseDate === 'string' && rawCloseDate.trim() ? rawCloseDate : undefined);
        const rawContractStart = this.form.contractStartDateUtc;
        const contractStartDateUtc = rawContractStart instanceof Date
            ? rawContractStart.toISOString()
            : (typeof rawContractStart === 'string' && rawContractStart.trim() ? rawContractStart : undefined);
        const rawContractEnd = this.form.contractEndDateUtc;
        const contractEndDateUtc = rawContractEnd instanceof Date
            ? rawContractEnd.toISOString()
            : (typeof rawContractEnd === 'string' && rawContractEnd.trim() ? rawContractEnd : undefined);
        const rawDeliveryCompleted = this.form.deliveryCompletedAtUtc;
        const deliveryCompletedAtUtc = rawDeliveryCompleted instanceof Date
            ? rawDeliveryCompleted.toISOString()
            : (typeof rawDeliveryCompleted === 'string' && rawDeliveryCompleted.trim() ? rawDeliveryCompleted : undefined);
        const rawProposalGenerated = this.form.proposalGeneratedAtUtc;
        const proposalGeneratedAtUtc = rawProposalGenerated instanceof Date
            ? rawProposalGenerated.toISOString()
            : (typeof rawProposalGenerated === 'string' && rawProposalGenerated.trim() ? rawProposalGenerated : undefined);
        const rawProposalSent = this.form.proposalSentAtUtc;
        const proposalSentAtUtc = rawProposalSent instanceof Date
            ? rawProposalSent.toISOString()
            : (typeof rawProposalSent === 'string' && rawProposalSent.trim() ? rawProposalSent : undefined);
        return {
            ...this.form,
            expectedCloseDate,
            contractStartDateUtc,
            contractEndDateUtc,
            deliveryCompletedAtUtc,
            proposalGeneratedAtUtc,
            proposalSentAtUtc,
            stageName: this.selectedStage,
            winLossReason: this.form.winLossReason || null
        };
    }
    submitWithDuplicateGuard(payload) {
        this.opportunityData.checkDuplicates({
            name: payload.name,
            accountId: payload.accountId ?? null,
            amount: payload.amount ?? null,
            expectedCloseDate: payload.expectedCloseDate ?? null,
            stageName: payload.stageName ?? null,
            excludeOpportunityId: null
        }).subscribe({
            next: (result) => {
                if (result.isBlocked) {
                    this.pendingSavePayload = payload;
                    this.duplicateCheckResult.set(result);
                    this.duplicateMatches.set(result.matches ?? []);
                    this.duplicateDialogVisible.set(true);
                    this.toastService.show('error', 'A very similar opportunity already exists. Review the match below.', 5000);
                    return;
                }
                if (result.hasWarnings) {
                    this.pendingSavePayload = payload;
                    this.duplicateCheckResult.set(result);
                    this.duplicateMatches.set(result.matches ?? []);
                    this.duplicateDialogVisible.set(true);
                    return;
                }
                this.performSave(payload);
            },
            error: () => {
                // Duplicate-check should not block saves if the endpoint is temporarily unavailable.
                this.performSave(payload);
            }
        });
    }
    dismissDuplicateDialog() {
        this.duplicateDialogVisible.set(false);
        this.duplicateCheckResult.set(null);
        this.duplicateMatches.set([]);
        this.pendingSavePayload = null;
    }
    saveDespiteWarning() {
        if (!this.pendingSavePayload) {
            this.dismissDuplicateDialog();
            return;
        }
        const payload = this.pendingSavePayload;
        this.dismissDuplicateDialog();
        this.performSave(payload);
    }
    reviewDuplicate(candidate) {
        this.dismissDuplicateDialog();
        this.router.navigate(['/app/opportunities', candidate.opportunityId, 'edit']);
    }
    duplicateIsBlocked() {
        return this.duplicateCheckResult()?.isBlocked ?? false;
    }
    duplicateDialogTitle() {
        return this.duplicateIsBlocked() ? 'Duplicate Opportunity Blocked' : 'Possible Duplicate Opportunities';
    }
    duplicateDialogMessage() {
        if (this.duplicateIsBlocked()) {
            return 'A very similar opportunity already exists. Open the existing deal and continue there.';
        }
        return 'Similar opportunities were found. Review and decide whether to save anyway.';
    }
    performSave(payload) {
        this.saving.set(true);
        const request$ = this.editingId
            ? this.opportunityData.update(this.editingId, payload).pipe(map(() => this.editingId))
            : this.opportunityData.create(payload).pipe(map((opp) => opp.id));
        request$
            .pipe(switchMap((id) => this.saveTeamMembers(id)))
            .subscribe({
            next: () => {
                this.saving.set(false);
                this.completeActiveDraft();
                this.captureFormSnapshot();
                this.originalStage = this.selectedStage;
                this.policyGateMessage.set(null);
                this.canRequestStageOverride.set(false);
                this.loadRecentDrafts();
                this.finalizeLeaveAfterSave(true);
            },
            error: (err) => {
                this.saving.set(false);
                const message = typeof err?.error === 'string' ? err.error : 'Unable to save deal.';
                this.handlePolicyGateMessage(message);
                this.toastService.show('error', message, 5000);
                this.scrollToGateBanner();
                this.finalizeLeaveAfterSave(false);
            }
        });
    }
    requestStageOverride() {
        const opportunityId = this.editingId;
        const gateMessage = this.policyGateMessage();
        const requestedStage = this.selectedStage;
        if (!opportunityId || !gateMessage || !requestedStage || !this.isStageOverrideContext()) {
            return;
        }
        this.stageOverrideRequesting.set(true);
        this.approvalService.requestStageOverrideDecision(opportunityId, {
            requestedStage,
            blockerReason: gateMessage
        }).subscribe({
            next: (result) => {
                this.stageOverrideRequesting.set(false);
                this.lastStageOverrideDecisionId.set(result.decisionId);
                this.toastService.show('success', result.message, 3500);
                void this.router.navigate(['/app/decisions/pending-action'], {
                    queryParams: { selected: result.decisionId }
                });
            },
            error: (err) => {
                this.stageOverrideRequesting.set(false);
                const message = (typeof err?.error?.message === 'string' && err.error.message) ||
                    (typeof err?.error === 'string' && err.error) ||
                    'Unable to request stage override approval.';
                this.toastService.show('error', message, 4000);
            }
        });
    }
    triggerKickoff() {
        if (!this.editingId) {
            return;
        }
        const handoffError = this.validateHandoffRequirements();
        if (handoffError) {
            this.toastService.show('error', handoffError, 4000);
            return;
        }
        const existing = this.onboardingMilestones.find((item) => item.title.toLowerCase().includes('kickoff'));
        if (existing) {
            this.toastService.show('success', 'Kickoff milestone already exists.', 2500);
            return;
        }
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);
        this.onboardingService
            .create(this.editingId, {
            type: 'Milestone',
            title: 'Kickoff meeting scheduled',
            status: 'Pending',
            dueDateUtc: dueDate,
            notes: this.form.deliveryHandoffScope ?? null
        })
            .subscribe({
            next: (item) => {
                this.onboardingMilestones = [...this.onboardingMilestones, item];
                this.toastService.show('success', 'Kickoff milestone created.', 2500);
            },
            error: () => {
                this.toastService.show('error', 'Unable to create kickoff milestone.', 3000);
            }
        });
    }
    addTeamMember() {
        this.teamMembers = [
            ...this.teamMembers,
            {
                userId: '',
                userName: '',
                role: this.teamRoleOptions[0]?.value ?? '',
                createdAtUtc: new Date().toISOString()
            }
        ];
        this.teamDirty = true;
    }
    removeTeamMember(index) {
        this.teamMembers = this.teamMembers.filter((_, i) => i !== index);
        this.teamDirty = true;
    }
    markTeamDirty() {
        this.teamDirty = true;
    }
    accountLink() {
        return this.form.accountId ? `/app/customers/${this.form.accountId}/edit` : null;
    }
    accountLabel() {
        const id = this.form.accountId;
        if (!id) {
            return 'No linked account yet.';
        }
        return this.accountOptions.find((option) => option.value === id)?.label ?? 'Account';
    }
    sendBackForReview() {
        const decisionId = this.activeDecisionId();
        if (!decisionId || this.decisionActionSubmitting()) {
            return;
        }
        const notes = this.decisionReviewComment?.trim();
        if (!notes) {
            this.toastService.show('error', 'Add a review comment before sending back.', 3000);
            return;
        }
        this.decisionActionSubmitting.set(true);
        this.approvalService.requestDecisionInfo(decisionId, notes).subscribe({
            next: () => {
                this.decisionActionSubmitting.set(false);
                this.toastService.show('success', 'Case sent back for review.', 2500);
                this.decisionReviewComment = '';
                this.decisionAction = '';
                this.loadApprovalsForDecisionContext();
                this.loadDecisionHistory(decisionId);
            },
            error: (err) => {
                this.decisionActionSubmitting.set(false);
                const message = (typeof err?.error?.message === 'string' && err.error.message) ||
                    (typeof err?.error === 'string' && err.error) ||
                    'Unable to send case back for review.';
                this.toastService.show('error', message, 3500);
            }
        });
    }
    approveDecisionFromReview() {
        this.executeDecisionOutcomeFromReview(true);
    }
    rejectDecisionFromReview() {
        this.executeDecisionOutcomeFromReview(false);
    }
    submitDecisionAction() {
        const action = this.decisionAction;
        if (!action || this.decisionActionSubmitting()) {
            return;
        }
        const noteRequired = action === 'reject' || action === 'review' || action === 'escalate';
        const comment = this.decisionReviewComment?.trim() ?? '';
        if (noteRequired && !comment) {
            this.toastService.show('error', 'Comment is required for this action.', 3000);
            return;
        }
        if (action === 'reject') {
            if (!window.confirm('Confirm reject this decision?')) {
                return;
            }
            this.rejectDecisionFromReview();
            return;
        }
        if (action === 'escalate') {
            if (!window.confirm('Confirm escalate this decision?')) {
                return;
            }
            this.escalateDecisionFromReview();
            return;
        }
        if (action === 'review') {
            this.sendBackForReview();
            return;
        }
        this.approveDecisionFromReview();
    }
    escalateDecisionFromReview() {
        const decisionId = this.activeDecisionId();
        if (!decisionId || this.decisionActionSubmitting()) {
            return;
        }
        this.decisionActionSubmitting.set(true);
        this.approvalService.escalateDecision(decisionId, {
            notes: this.decisionReviewComment?.trim() || null
        }).subscribe({
            next: () => {
                this.decisionActionSubmitting.set(false);
                this.toastService.show('success', 'Decision escalated.', 2500);
                this.decisionReviewComment = '';
                this.decisionAction = '';
                this.loadApprovalsForDecisionContext();
                this.loadDecisionHistory(decisionId);
            },
            error: (err) => {
                this.decisionActionSubmitting.set(false);
                const message = (typeof err?.error?.message === 'string' && err.error.message) ||
                    (typeof err?.error === 'string' && err.error) ||
                    'Unable to escalate decision.';
                this.toastService.show('error', message, 3500);
            }
        });
    }
    decisionHistoryTone(item) {
        const action = (item.action || '').toLowerCase();
        if (action.includes('approve'))
            return 'success';
        if (action.includes('reject'))
            return 'danger';
        if (action.includes('escalat'))
            return 'warning';
        if (action.includes('request') || action.includes('info') || action.includes('review'))
            return 'info';
        return 'neutral';
    }
    decisionStatusTone(status) {
        const value = (status || '').toLowerCase();
        if (value === 'approved')
            return 'success';
        if (value === 'rejected')
            return 'danger';
        if (value === 'pending')
            return 'warning';
        if (value === 'escalated')
            return 'info';
        return 'neutral';
    }
    executeDecisionOutcomeFromReview(approved) {
        const decisionId = this.activeDecisionId();
        if (!decisionId || this.decisionActionSubmitting()) {
            return;
        }
        this.decisionActionSubmitting.set(true);
        this.approvalService
            .decideDecision(decisionId, { approved, notes: this.decisionReviewComment?.trim() || null })
            .subscribe({
            next: () => {
                this.decisionActionSubmitting.set(false);
                this.toastService.show('success', approved ? 'Decision approved.' : 'Decision rejected.', 2500);
                this.decisionReviewComment = '';
                this.decisionAction = '';
                this.loadApprovalsForDecisionContext();
                this.loadDecisionHistory(decisionId);
            },
            error: (err) => {
                this.decisionActionSubmitting.set(false);
                const message = (typeof err?.error?.message === 'string' && err.error.message) ||
                    (typeof err?.error === 'string' && err.error) ||
                    'Unable to update decision.';
                this.toastService.show('error', message, 3500);
            }
        });
    }
    loadApprovalsForDecisionContext() {
        if (!this.editingId) {
            return;
        }
        this.loadApprovals(this.editingId);
    }
    loadDecisionHistory(decisionId) {
        this.approvalService.getDecisionHistory({
            decisionId,
            take: 100
        }).subscribe({
            next: (items) => {
                this.decisionHistory.set(items ?? []);
            },
            error: () => {
                this.decisionHistory.set([]);
            }
        });
    }
    loadAccounts() {
        this.customerData.search({ page: 1, pageSize: 50 }).subscribe((res) => {
            this.accountOptions = res.items.map((c) => ({ label: c.name, value: c.id }));
            if (this.pendingAccountName && !this.form.accountId) {
                const match = this.accountOptions.find((opt) => opt.label === this.pendingAccountName);
                this.form.accountId = match?.value;
                this.pendingAccountName = null;
            }
            if (!this.isEditMode() && !this.form.accountId) {
                this.form.accountId = res.items[0]?.id;
            }
            if (this.pendingOpportunity) {
                this.applyOpportunity(this.pendingOpportunity);
                this.pendingOpportunity = null;
            }
            this.cdr.detectChanges();
        });
    }
    forecastGuidance() {
        const stage = this.selectedStage || this.form.stageName || 'Prospecting';
        const required = this.estimateForecastCategory(stage);
        if (stage.startsWith('Closed')) {
            return `Required: ${required} for ${stage}.`;
        }
        if (stage === 'Commit') {
            return 'Required: Commit before moving to the Commit stage.';
        }
        return `Forecast locked to ${required} for ${stage}.`;
    }
    decisionMakerGuidance() {
        const stage = this.selectedStage || this.form.stageName || 'Prospecting';
        if (['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage)) {
            return 'Decision maker confirmation is required before moving beyond qualification.';
        }
        return null;
    }
    isForecastLocked() {
        return true;
    }
    loadRecentDrafts() {
        this.formDraftService.list('opportunity', { limit: 5, page: 1, pageSize: 5 }).subscribe({
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
        this.formDraftService.list('opportunity', { page: 1, pageSize: 50 }).subscribe({
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
                this.selectedStage = payload.selectedStage ?? this.form.stageName ?? 'Prospecting';
                this.activeDraftId.set(draft.id);
                this.draftModeActive.set(true);
                this.draftStatusMessage.set(`Draft loaded from ${this.formatDraftTimestamp(draft.updatedAtUtc)}.`);
                this.captureFormSnapshot();
                this.draftLibraryVisible.set(false);
            },
            error: () => this.toastService.show('error', 'Unable to open draft.', 5000)
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
    createFormSnapshot() {
        return JSON.stringify({ form: this.form, selectedStage: this.selectedStage });
    }
    captureFormSnapshot() {
        this.originalFormSnapshot = this.createFormSnapshot();
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
        if (!this.originalFormSnapshot) {
            return this.createFormSnapshot() !== JSON.stringify({ form: this.createEmptyForm(), selectedStage: 'Prospecting' });
        }
        return this.createFormSnapshot() !== this.originalFormSnapshot;
    }
    buildDraftTitle() {
        return this.form.name?.trim() || 'Untitled opportunity draft';
    }
    buildDraftSubtitle() {
        const account = this.accountOptions.find((item) => item.value === this.form.accountId);
        return account?.label ?? this.selectedStage ?? null;
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
    loadOpportunity(id) {
        this.opportunityData.getById(id).subscribe({
            next: (opp) => {
                this.applyOpportunity(opp);
                this.loadQuoteWorkspace(id);
                this.loadProposalActivity(id);
                this.loadRecentDealActivities(id);
                this.loadDealAttachments(id);
                this.loadDealContactRoles(id);
                this.loadDealHealthScore(id);
                this.loadStageHistory(id);
                if (!this.accountOptions.length) {
                    this.pendingOpportunity = opp;
                }
            },
            error: () => {
                this.router.navigate(['/app/deals']);
            }
        });
    }
    loadSectionsForOpenPanels() {
        for (const panel of this.normalizePanels(this.accordionPanels())) {
            this.ensureSectionDataLoaded(panel);
        }
    }
    normalizePanels(panels) {
        const filtered = panels
            .map((panel) => panel)
            .filter((panel) => this.isSectionVisible(panel))
            .filter((panel) => !this.isSectionLocked(panel));
        return [...new Set(filtered)].sort((a, b) => DEAL_PANEL_ORDER.indexOf(a) - DEAL_PANEL_ORDER.indexOf(b));
    }
    enforceAccordionAccess() {
        const normalized = this.normalizePanels(this.accordionPanels());
        if (normalized.length > 0) {
            if (normalized.length !== this.accordionPanels().length) {
                this.accordionPanels.set(normalized);
            }
            return;
        }
        const fallback = DEAL_PANEL_ORDER.find((panel) => this.isSectionVisible(panel) && !this.isSectionLocked(panel));
        if (fallback) {
            this.accordionPanels.set([fallback]);
            this.activeSectionNav.set(fallback);
        }
    }
    ensureSectionDataLoaded(section) {
        if (!this.isEditMode() || !this.editingId) {
            return;
        }
        if (this.loadedSectionKeys().has(section) || this.loadingSectionKeys().has(section)) {
            return;
        }
        const markLoading = () => {
            const next = new Set(this.loadingSectionKeys());
            next.add(section);
            this.loadingSectionKeys.set(next);
        };
        const markDone = () => {
            const loading = new Set(this.loadingSectionKeys());
            loading.delete(section);
            this.loadingSectionKeys.set(loading);
            const loaded = new Set(this.loadedSectionKeys());
            loaded.add(section);
            this.loadedSectionKeys.set(loaded);
        };
        markLoading();
        switch (section) {
            case 'quote-proposal':
                this.loadQuoteWorkspace(this.editingId, markDone);
                this.loadProposalActivity(this.editingId);
                break;
            case 'pre-sales-team':
                this.loadTeamMembers(this.editingId, markDone);
                break;
            case 'deal-stakeholders':
                this.loadDealContactRoles(this.editingId, markDone);
                break;
            case 'deal-health-score':
                this.loadDealHealthScore(this.editingId, markDone);
                break;
            case 'deal-aging':
                this.loadStageHistory(this.editingId, markDone);
                break;
            case 'approval-workflow':
                this.loadApprovals(this.editingId, markDone);
                break;
            case 'security-legal':
                this.loadChecklists(this.editingId, markDone);
                break;
            case 'onboarding':
                this.loadOnboarding(this.editingId, markDone);
                break;
            case 'review-thread':
                this.loadReviewThread(this.editingId, markDone);
                break;
            default:
                markDone();
                break;
        }
    }
    loadChecklists(opportunityId, onSettled) {
        let pending = 3;
        const done = () => {
            pending -= 1;
            if (pending <= 0) {
                onSettled?.();
            }
        };
        this.checklistService.get(opportunityId, 'Security').subscribe({
            next: (items) => {
                this.securityChecklist = items;
                this.cdr.detectChanges();
                done();
            },
            error: () => {
                this.securityChecklist = [];
                done();
            }
        });
        this.checklistService.get(opportunityId, 'Legal').subscribe({
            next: (items) => {
                this.legalChecklist = items;
                this.cdr.detectChanges();
                done();
            },
            error: () => {
                this.legalChecklist = [];
                done();
            }
        });
        this.checklistService.get(opportunityId, 'Technical').subscribe({
            next: (items) => {
                this.technicalChecklist = items;
                this.cdr.detectChanges();
                done();
            },
            error: () => {
                this.technicalChecklist = [];
                done();
            }
        });
    }
    loadOnboarding(opportunityId, onSettled) {
        let pending = 2;
        const done = () => {
            pending -= 1;
            if (pending <= 0) {
                onSettled?.();
            }
        };
        this.onboardingService.get(opportunityId, 'Checklist').subscribe({
            next: (items) => {
                this.onboardingChecklist = (items ?? []).map((item) => ({
                    ...item,
                    dueDateUtc: item.dueDateUtc ? new Date(item.dueDateUtc) : undefined
                }));
                this.cdr.detectChanges();
                done();
            },
            error: () => {
                this.onboardingChecklist = [];
                done();
            }
        });
        this.onboardingService.get(opportunityId, 'Milestone').subscribe({
            next: (items) => {
                this.onboardingMilestones = (items ?? []).map((item) => ({
                    ...item,
                    dueDateUtc: item.dueDateUtc ? new Date(item.dueDateUtc) : undefined
                }));
                this.cdr.detectChanges();
                done();
            },
            error: () => {
                this.onboardingMilestones = [];
                done();
            }
        });
    }
    loadApprovals(opportunityId, onSettled) {
        this.approvalService.getForOpportunity(opportunityId).subscribe({
            next: (items) => {
                this.approvals = items ?? [];
                this.enforceAccordionAccess();
                this.cdr.detectChanges();
                onSettled?.();
            },
            error: () => {
                this.approvals = [];
                this.enforceAccordionAccess();
                onSettled?.();
            }
        });
    }
    handleRealtimeEvent(event) {
        if (!event?.eventType || !this.isEditMode() || !this.editingId) {
            return;
        }
        const eventType = event.eventType.toLowerCase();
        if (eventType === 'record.presence.snapshot' || eventType === 'record.presence.changed') {
            this.applyPresenceEvent(event, this.editingId);
            return;
        }
        if (!eventType.startsWith('decision.')) {
            return;
        }
        const payloadEntityId = String(event.payload?.['entityId'] ?? '');
        if (payloadEntityId && payloadEntityId !== this.editingId) {
            return;
        }
        this.loadApprovals(this.editingId);
        const decisionId = this.activeDecisionId();
        if (decisionId) {
            this.loadDecisionHistory(decisionId);
        }
    }
    applyPresenceEvent(event, recordId) {
        const payload = event.payload;
        if (!payload) {
            return;
        }
        const entityType = String(payload['entityType'] ?? '').toLowerCase();
        const payloadRecordId = String(payload['recordId'] ?? '');
        if (entityType !== 'opportunity' || payloadRecordId !== recordId) {
            return;
        }
        if (event.eventType === 'record.presence.snapshot') {
            const usersRaw = Array.isArray(payload['users']) ? payload['users'] : [];
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
        const userId = String(payload['userId'] ?? '');
        const displayName = String(payload['displayName'] ?? 'User');
        const action = String(payload['action'] ?? '').toLowerCase();
        const isEditing = !!payload['isEditing'];
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
    hasApprovalByPurpose(purpose) {
        const needle = purpose.trim().toLowerCase();
        return this.approvals.some((approval) => (approval.purpose || '').toLowerCase() === needle);
    }
    hasPendingApprovalByPurpose(purpose) {
        const needle = purpose.trim().toLowerCase();
        return this.approvals.some((approval) => (approval.purpose || '').toLowerCase() === needle &&
            (approval.status || '').toLowerCase() === 'pending');
    }
    hasFinalApprovalByPurpose(purpose, status) {
        const needle = purpose.trim().toLowerCase();
        return this.approvals.some((approval) => (approval.purpose || '').toLowerCase() === needle &&
            (approval.status || '').toLowerCase() === status);
    }
    loadReviewThread(opportunityId, onSettled) {
        this.opportunityData.getReviewThread(opportunityId).subscribe({
            next: (items) => {
                this.reviewThread.set(items ?? []);
                this.enforceAccordionAccess();
                this.cdr.detectChanges();
                onSettled?.();
            },
            error: () => {
                this.reviewThread.set([]);
                this.enforceAccordionAccess();
                onSettled?.();
            }
        });
    }
    loadTeamMemberOptions() {
        this.userAdminData.search({ page: 1, pageSize: 100, includeInactive: false }).subscribe({
            next: (res) => {
                this.teamMemberOptions = res.items.map((user) => ({
                    label: user.fullName,
                    value: user.id
                }));
                this.cdr.detectChanges();
            },
            error: () => {
                this.teamMemberOptions = [];
            }
        });
    }
    loadTeamMembers(opportunityId, onSettled) {
        this.opportunityData.getTeam(opportunityId).subscribe({
            next: (items) => {
                this.teamMembers = items ?? [];
                this.teamDirty = false;
                this.cdr.detectChanges();
                onSettled?.();
            },
            error: () => {
                this.teamMembers = [];
                this.teamDirty = false;
                onSettled?.();
            }
        });
    }
    saveTeamMembers(opportunityId) {
        if (!this.teamDirty) {
            return of(null);
        }
        const members = this.teamMembers
            .filter((member) => member.userId && member.role)
            .map((member) => ({
            userId: member.userId,
            role: member.role
        }));
        return this.opportunityData.updateTeam(opportunityId, { members }).pipe(map((items) => {
            this.teamMembers = items ?? [];
            this.teamDirty = false;
            return null;
        }));
    }
    handlePolicyGateMessage(message) {
        const normalized = message.toLowerCase();
        const isApprovalGate = normalized.includes('approval required') ||
            normalized.includes('discount approval required') ||
            normalized.includes('approval role must be configured');
        const isStageOverrideCandidate = this.isStageOverrideContext() &&
            !normalized.includes('unable to save') &&
            (normalized.includes('before moving to') ||
                normalized.includes('before changing stage') ||
                normalized.includes('required before moving') ||
                normalized.includes('must be approved before moving'));
        const gateMessage = (isApprovalGate || isStageOverrideCandidate) ? message : null;
        this.policyGateMessage.set(gateMessage);
        this.canRequestStageOverride.set(Boolean(gateMessage && isStageOverrideCandidate && this.canRequestApproval()));
    }
    scrollToGateBanner() {
        requestAnimationFrame(() => {
            const banner = document.querySelector('.policy-gate-banner');
            if (banner) {
                banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
    scrollToFirstError(fieldId) {
        requestAnimationFrame(() => {
            if (fieldId) {
                const el = document.getElementById(fieldId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.focus();
                    return;
                }
            }
            const invalid = document.querySelector('.ng-invalid:not(form)');
            if (invalid) {
                invalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                invalid.focus();
            }
        });
    }
    isStageOverrideContext() {
        const stage = (this.selectedStage ?? '').trim();
        return Boolean(this.isEditMode() &&
            this.editingId &&
            this.originalStage &&
            stage &&
            !stage.startsWith('Closed') &&
            stage !== this.originalStage);
    }
    validateTeamMembers() {
        if (!this.teamMembers.length) {
            return null;
        }
        const missing = this.teamMembers.some((member) => !member.userId || !member.role);
        if (missing) {
            return 'Each team member needs a user and role.';
        }
        const unique = new Set(this.teamMembers.map((member) => member.userId));
        if (unique.size !== this.teamMembers.length) {
            return 'Duplicate team members are not allowed.';
        }
        return null;
    }
    submitReviewOutcome() {
        if (!this.editingId || this.reviewSubmitting || !this.isManager()) {
            return;
        }
        const comment = this.reviewComment.trim();
        const requiresDue = this.reviewOutcome !== 'Approved';
        const acknowledgmentDueAtUtc = requiresDue ? this.localToUtcIso(this.reviewAckDueLocal) : null;
        if (requiresDue && !acknowledgmentDueAtUtc) {
            this.toastService.show('error', 'Acknowledgment due date is required for Needs Work or Escalated.', 4000);
            return;
        }
        this.reviewSubmitting = true;
        this.opportunityData
            .addReviewOutcome(this.editingId, {
            outcome: this.reviewOutcome,
            comment: comment || null,
            acknowledgmentDueAtUtc
        })
            .subscribe({
            next: () => {
                this.reviewSubmitting = false;
                this.reviewComment = '';
                this.reviewAckDueLocal = this.defaultReviewDueLocal();
                this.loadReviewThread(this.editingId);
                this.toastService.show('success', 'Review outcome saved.', 2500);
            },
            error: (err) => {
                this.reviewSubmitting = false;
                const message = typeof err?.error === 'string' ? err.error : 'Unable to save review outcome.';
                this.toastService.show('error', message, 4000);
            }
        });
    }
    acknowledgeReview() {
        if (!this.editingId || this.ackSubmitting || this.isManager()) {
            return;
        }
        this.ackSubmitting = true;
        this.opportunityData.acknowledgeReview(this.editingId).subscribe({
            next: () => {
                this.ackSubmitting = false;
                this.loadReviewThread(this.editingId);
                this.toastService.show('success', 'Review acknowledged.', 2500);
            },
            error: (err) => {
                this.ackSubmitting = false;
                const message = typeof err?.error === 'string' ? err.error : 'Unable to acknowledge review.';
                this.toastService.show('error', message, 4000);
            }
        });
    }
    requestApproval() {
        if (!this.editingId || this.approvalRequesting()) {
            return;
        }
        const amount = Number(this.approvalRequest.amount ?? 0);
        if (!amount || amount <= 0) {
            this.toastService.show('error', 'Approval amount must be greater than zero.', 3000);
            return;
        }
        this.approvalRequesting.set(true);
        this.approvalService
            .requestApprovalViaDecisionEngine(this.editingId, {
            amount,
            currency: this.approvalRequest.currency || this.resolveCurrencyCode(),
            purpose: this.approvalRequest.purpose,
            opportunityName: this.form.name?.trim() || 'Deal',
            accountName: this.form.accountId ? this.accountLabel() : null
        })
            .subscribe({
            next: (item) => {
                this.upsertApproval(item);
                this.approvalRequesting.set(false);
                this.toastService.show('success', 'Approval request sent.', 2500);
            },
            error: (err) => {
                this.approvalRequesting.set(false);
                const message = err?.status === 403
                    ? 'You do not have permission to request approvals.'
                    : (typeof err?.error === 'string' ? err.error : 'Unable to request approval.');
                this.handlePolicyGateMessage(message);
                this.toastService.show('error', message, 3500);
            }
        });
    }
    decideApproval(item, approved) {
        if (this.approvalDecidingIds.has(item.id)) {
            return;
        }
        this.approvalDecidingIds.add(item.id);
        this.approvalService
            .decide(item.id, {
            approved,
            notes: this.approvalDecisionNotes[item.id] || null
        })
            .subscribe({
            next: (updated) => {
                this.upsertApproval(updated);
                this.approvalDecidingIds.delete(item.id);
                this.toastService.show('success', 'Approval updated.', 2500);
            },
            error: (err) => {
                this.approvalDecidingIds.delete(item.id);
                const message = err?.status === 403
                    ? 'You do not have permission to approve or override approvals.'
                    : (typeof err?.error === 'string' ? err.error : 'Unable to update approval.');
                this.handlePolicyGateMessage(message);
                this.toastService.show('error', message, 3500);
            }
        });
    }
    isApprovalsLoading() {
        return this.approvalRequesting();
    }
    approvalStatusClass(status) {
        return `approval-status approval-status--${status.toLowerCase()}`;
    }
    onApprovalPurposeChange(purpose) {
        this.approvalRequest.purpose = purpose;
        this.approvalAmountLocked = false;
        this.syncApprovalAmount();
    }
    onApprovalAmountEdited() {
        if (!this.syncingApprovalAmount) {
            this.approvalAmountLocked = true;
        }
    }
    syncApprovalAmount() {
        if (this.approvalAmountLocked) {
            return;
        }
        this.syncingApprovalAmount = true;
        try {
            const amount = this.approvalRequest.purpose === 'Discount'
                ? (this.form.discountAmount ?? 0)
                : (this.form.amount ?? 0);
            this.approvalRequest.amount = amount ?? 0;
        }
        finally {
            this.syncingApprovalAmount = false;
        }
    }
    onCurrencyChange(currency) {
        const normalized = this.normalizeCurrencyCode(currency);
        this.form.currency = normalized;
        this.approvalRequest.currency = normalized;
    }
    generateProposal() {
        if (!this.editingId || !this.selectedQuoteId) {
            this.toastService.show('error', 'Save and select a quote first.', 2500);
            return;
        }
        this.proposalGenerating.set(true);
        this.opportunityData.generateQuoteProposal(this.editingId, this.selectedQuoteId).subscribe({
            next: (result) => {
                this.proposalGenerating.set(false);
                this.applyProposalActionResult(result);
                if (this.editingId) {
                    this.loadProposalActivity(this.editingId);
                }
                this.toastService.show('success', 'Proposal generated successfully.', 2600);
            },
            error: (error) => {
                this.proposalGenerating.set(false);
                this.toastService.show('error', this.resolveApiErrorMessage(error, 'Unable to generate proposal.'), 3200);
            }
        });
    }
    openSendProposalDialog(prefillRecipient, prefillMessage, sourceEventId) {
        if (!this.editingId || !this.selectedQuoteId) {
            this.toastService.show('error', 'Save and select a quote first.', 2500);
            return;
        }
        if (!this.proposalPreviewUrl()) {
            this.toastService.show('error', 'Generate proposal first.', 2500);
            return;
        }
        this.proposalSendRecipient = (prefillRecipient ?? '').trim();
        this.proposalSendMessage = (prefillMessage ?? '').trim();
        this.proposalResendSourceEventId = sourceEventId ?? null;
        this.proposalSendDialogVisible = true;
    }
    markProposalSent() {
        if (!this.editingId || !this.selectedQuoteId) {
            this.toastService.show('error', 'Save and select a quote first.', 2500);
            return;
        }
        this.proposalSending.set(true);
        this.opportunityData.sendQuoteProposal(this.editingId, this.selectedQuoteId, {
            toEmail: this.proposalSendRecipient?.trim() || null,
            message: this.proposalSendMessage?.trim() || null
        }).subscribe({
            next: (result) => {
                this.proposalSending.set(false);
                this.applyProposalActionResult(result);
                if (this.editingId) {
                    this.loadProposalActivity(this.editingId);
                }
                if (this.proposalResendSourceEventId) {
                    this.markProposalResentChip(this.proposalResendSourceEventId);
                }
                this.proposalSendDialogVisible = false;
                this.proposalSendRecipient = '';
                this.proposalSendMessage = '';
                this.proposalResendSourceEventId = null;
                this.toastService.show('success', `Proposal sent${result.recipientEmail ? ` to ${result.recipientEmail}` : ''}.`, 2800);
            },
            error: (error) => {
                this.proposalSending.set(false);
                this.toastService.show('error', this.resolveApiErrorMessage(error, 'Unable to send proposal.'), 3200);
            }
        });
    }
    proposalPreviewUrl() {
        const raw = (this.form.proposalLink ?? '').trim();
        if (!raw) {
            return null;
        }
        if (/^https?:\/\//i.test(raw)) {
            return raw;
        }
        const baseUrl = (environment.apiUrl ?? '').trim().replace(/\/+$/, '');
        if (!baseUrl) {
            return raw.startsWith('/') ? raw : `/${raw}`;
        }
        const normalizedPath = raw.startsWith('/') ? raw : `/${raw}`;
        return `${baseUrl}${normalizedPath}`;
    }
    proposalActivityTimeline() {
        return [...this.proposalActivityEvents]
            .filter((event) => event.action === 'ProposalGenerated' || event.action === 'ProposalSent')
            .sort((a, b) => new Date(b.createdAtUtc).getTime() - new Date(a.createdAtUtc).getTime());
    }
    proposalActivityLabel(event) {
        if (event.action === 'ProposalGenerated')
            return 'Proposal generated';
        if (event.action === 'ProposalSent')
            return 'Proposal sent';
        return event.action;
    }
    isLatestProposalSentEvent(event) {
        const latestSent = this.proposalActivityTimeline().find((item) => item.action === 'ProposalSent');
        return !!latestSent && latestSent.id === event.id;
    }
    resendProposalFromActivity(event) {
        const recipient = event.field === 'ProposalSentTo' ? event.newValue : null;
        const message = this.form.proposalNotes?.trim() ? this.form.proposalNotes : null;
        this.openSendProposalDialog(recipient, message, event.id);
    }
    isRecentlyResentEvent(event) {
        return !!this.recentProposalResendEventId && this.recentProposalResendEventId === event.id;
    }
    addQuoteLine() {
        this.quoteLines = [
            ...this.quoteLines,
            {
                itemMasterId: this.itemMasterOptions[0]?.value ?? null,
                description: '',
                quantity: 1,
                unitPrice: 0,
                discountPercent: 0,
                lineTotal: 0
            }
        ];
        this.onQuoteLineChanged();
    }
    removeQuoteLine(index) {
        this.quoteLines = this.quoteLines.filter((_, i) => i !== index);
        this.onQuoteLineChanged();
    }
    onQuoteItemChanged(index) {
        const line = this.quoteLines[index];
        if (!line?.itemMasterId) {
            return;
        }
        const selected = this.itemMasterMap.get(line.itemMasterId);
        if (selected && !selected.isActive) {
            this.toastService.show('error', 'Inactive catalog items cannot be added to new quote lines.', 2800);
            line.itemMasterId = null;
            this.onQuoteLineChanged();
            return;
        }
        if (selected && !line.description) {
            line.description = selected.name;
        }
        this.onQuoteLineChanged();
    }
    itemOptionsForLine(line) {
        if (!line.itemMasterId) {
            return this.itemMasterOptions;
        }
        if (this.itemMasterOptions.some((option) => option.value === line.itemMasterId)) {
            return this.itemMasterOptions;
        }
        const selected = this.itemMasterMap.get(line.itemMasterId);
        if (!selected) {
            return this.itemMasterOptions;
        }
        return [
            ...this.itemMasterOptions,
            this.toItemOption(selected, true)
        ];
    }
    onQuoteLineChanged() {
        this.quoteLines = this.quoteLines.map((line) => {
            const quantity = Math.max(1, Number(line.quantity || 0));
            const unitPrice = Math.max(0, Number(line.unitPrice || 0));
            const discountPercent = Math.min(100, Math.max(0, Number(line.discountPercent || 0)));
            const lineTotal = Number((quantity * unitPrice * (1 - discountPercent / 100)).toFixed(2));
            return { ...line, quantity, unitPrice, discountPercent, lineTotal };
        });
    }
    quoteSubtotal() {
        return Number(this.quoteLines.reduce((sum, line) => sum + (line.quantity * line.unitPrice), 0).toFixed(2));
    }
    quoteDiscountAmount() {
        return Number((this.quoteSubtotal() - this.quoteLines.reduce((sum, line) => sum + line.lineTotal, 0)).toFixed(2));
    }
    quoteTotal() {
        const linesTotal = this.quoteLines.reduce((sum, line) => sum + line.lineTotal, 0);
        return Number((linesTotal + (this.quoteTaxAmount || 0)).toFixed(2));
    }
    saveQuoteAsDraft() {
        if (!this.editingId) {
            this.toastService.show('error', 'Save the opportunity before creating a quote.', 2500);
            return;
        }
        if (!this.quoteLines.length) {
            this.toastService.show('error', 'Add at least one quote line.', 2500);
            return;
        }
        const payload = {
            name: this.quoteName?.trim() || `${this.form.name || 'Opportunity'} Quote`,
            status: this.quoteStatus || 'Draft',
            priceListId: this.quotePriceListId,
            currency: this.resolveCurrency(this.quoteCurrency || this.form.currency),
            taxAmount: this.quoteTaxAmount || 0,
            notes: this.quoteNotes || null,
            lines: this.quoteLines
                .filter((line) => !!line.itemMasterId)
                .map((line) => ({
                itemMasterId: line.itemMasterId,
                description: line.description || null,
                quantity: line.quantity,
                unitPrice: line.unitPrice,
                discountPercent: line.discountPercent
            }))
        };
        if (!payload.lines.length) {
            this.toastService.show('error', 'Select at least one product for quote lines.', 2500);
            return;
        }
        this.quoteSaving.set(true);
        const request$ = this.selectedQuoteId
            ? this.opportunityData.updateQuote(this.editingId, this.selectedQuoteId, payload)
            : this.opportunityData.createQuote(this.editingId, {
                name: payload.name,
                priceListId: payload.priceListId,
                currency: payload.currency,
                taxAmount: payload.taxAmount,
                notes: payload.notes,
                lines: payload.lines
            });
        request$.subscribe({
            next: (quote) => {
                this.quoteSaving.set(false);
                this.applyQuoteDetail(quote);
                this.loadQuoteWorkspace(this.editingId);
                this.toastService.show('success', 'Quote saved.', 2400);
            },
            error: (error) => {
                this.quoteSaving.set(false);
                this.toastService.show('error', this.resolveApiErrorMessage(error, 'Unable to save quote.'), 3200);
            }
        });
    }
    onQuoteSelectionChange(quoteId) {
        this.selectedQuoteId = quoteId;
        if (!this.editingId || !quoteId) {
            this.activeQuote = null;
            return;
        }
        this.quoteLoading.set(true);
        this.opportunityData.getQuote(this.editingId, quoteId).subscribe({
            next: (quote) => {
                this.quoteLoading.set(false);
                this.applyQuoteDetail(quote);
            },
            error: () => {
                this.quoteLoading.set(false);
                this.toastService.show('error', 'Unable to load quote detail.', 3000);
            }
        });
    }
    submitQuoteForApproval() {
        if (!this.editingId || !this.selectedQuoteId) {
            this.toastService.show('error', 'Save and select a quote first.', 2500);
            return;
        }
        this.quoteApprovalSubmitting.set(true);
        this.opportunityData.submitQuoteForApproval(this.editingId, this.selectedQuoteId).subscribe({
            next: (quote) => {
                this.quoteApprovalSubmitting.set(false);
                this.applyQuoteDetail(quote);
                this.loadApprovals(this.editingId);
                this.toastService.show('success', `Quote is now ${quote.status}.`, 2600);
            },
            error: (error) => {
                this.quoteApprovalSubmitting.set(false);
                this.toastService.show('error', this.resolveApiErrorMessage(error, 'Unable to submit quote for approval.'), 3200);
            }
        });
    }
    addChecklistItem(type) {
        const title = (type === 'Security'
            ? this.newSecurityItem
            : type === 'Legal'
                ? this.newLegalItem
                : this.newTechnicalItem).trim();
        if (!title || !this.editingId) {
            return;
        }
        this.checklistService
            .create(this.editingId, { title, type, status: 'Pending' })
            .subscribe({
            next: (item) => {
                if (type === 'Security') {
                    this.securityChecklist = [...this.securityChecklist, item];
                    this.newSecurityItem = '';
                }
                else if (type === 'Legal') {
                    this.legalChecklist = [...this.legalChecklist, item];
                    this.newLegalItem = '';
                }
                else {
                    this.technicalChecklist = [...this.technicalChecklist, item];
                    this.newTechnicalItem = '';
                }
            },
            error: (error) => {
                const message = typeof error?.error === 'string'
                    ? error.error
                    : 'Unable to add checklist item.';
                this.toastService.show('error', message, 3500);
            }
        });
    }
    saveChecklistItem(item) {
        if (this.checklistSavingIds.has(item.id)) {
            return;
        }
        this.checklistSavingIds.add(item.id);
        this.checklistService
            .update(item.id, {
            title: item.title,
            status: item.status,
            notes: item.notes ?? null
        })
            .subscribe({
            next: () => {
                this.checklistSavingIds.delete(item.id);
                this.checklistSavedIds.add(item.id);
                window.setTimeout(() => this.checklistSavedIds.delete(item.id), 1200);
            },
            error: (error) => {
                this.checklistSavingIds.delete(item.id);
                const message = typeof error?.error === 'string'
                    ? error.error
                    : 'Unable to update checklist item.';
                this.toastService.show('error', message, 3500);
            }
        });
    }
    deleteChecklistItem(item) {
        this.checklistService.delete(item.id).subscribe(() => {
            if (item.type === 'Security') {
                this.securityChecklist = this.securityChecklist.filter((i) => i.id !== item.id);
            }
            else if (item.type === 'Legal') {
                this.legalChecklist = this.legalChecklist.filter((i) => i.id !== item.id);
            }
            else {
                this.technicalChecklist = this.technicalChecklist.filter((i) => i.id !== item.id);
            }
        });
    }
    addOnboardingItem(type) {
        const title = (type === 'Checklist' ? this.newOnboardingChecklistItem : this.newOnboardingMilestoneItem).trim();
        if (!title || !this.editingId) {
            return;
        }
        this.onboardingService
            .create(this.editingId, { title, type, status: 'Pending' })
            .subscribe((item) => {
            if (type === 'Checklist') {
                this.onboardingChecklist = [...this.onboardingChecklist, item];
                this.newOnboardingChecklistItem = '';
            }
            else {
                this.onboardingMilestones = [...this.onboardingMilestones, item];
                this.newOnboardingMilestoneItem = '';
            }
        });
    }
    saveOnboardingItem(item) {
        if (this.onboardingSavingIds.has(item.id)) {
            return;
        }
        this.onboardingSavingIds.add(item.id);
        this.onboardingService
            .update(item.id, {
            title: item.title,
            status: item.status,
            type: item.type,
            dueDateUtc: item.dueDateUtc,
            notes: item.notes ?? null
        })
            .subscribe({
            next: () => {
                this.onboardingSavingIds.delete(item.id);
                this.onboardingSavedIds.add(item.id);
                window.setTimeout(() => this.onboardingSavedIds.delete(item.id), 1200);
            },
            error: () => {
                this.onboardingSavingIds.delete(item.id);
            }
        });
    }
    deleteOnboardingItem(item) {
        this.onboardingService.delete(item.id).subscribe(() => {
            if (item.type === 'Checklist') {
                this.onboardingChecklist = this.onboardingChecklist.filter((i) => i.id !== item.id);
            }
            else {
                this.onboardingMilestones = this.onboardingMilestones.filter((i) => i.id !== item.id);
            }
        });
    }
    isOnboardingSaving(item) {
        return this.onboardingSavingIds.has(item.id);
    }
    isOnboardingSaved(item) {
        return this.onboardingSavedIds.has(item.id);
    }
    isChecklistSaving(item) {
        return this.checklistSavingIds.has(item.id);
    }
    isChecklistSaved(item) {
        return this.checklistSavedIds.has(item.id);
    }
    loadQuoteCatalogData() {
        this.opportunityData.getItemMaster().subscribe({
            next: (response) => {
                const items = response.items ?? [];
                const activeItems = items.filter((item) => item.isActive);
                this.itemMasterMap = new Map(items.map((item) => [item.id, item]));
                this.itemMasterOptions = activeItems
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => this.toItemOption(item));
            },
            error: () => {
                this.itemMasterMap.clear();
                this.itemMasterOptions = [];
            }
        });
        this.opportunityData.getPriceLists(1, 100).subscribe({
            next: (result) => {
                this.priceListItems = result.items ?? [];
                this.priceListOptions = [
                    { label: 'No price list', value: null },
                    ...this.priceListItems
                        .filter((item) => item.status === 'Active' || item.status === 'Draft')
                        .map((item) => ({ label: `${item.name} (${item.currency})`, value: item.id }))
                ];
            },
            error: () => {
                this.priceListItems = [];
                this.priceListOptions = [{ label: 'No price list', value: null }];
            }
        });
    }
    toItemOption(item, inactive = false) {
        return {
            label: `${item.name} (${item.sku})${item.categoryName ? ` · ${item.categoryName}` : ''}`,
            value: item.id,
            itemType: item.itemType,
            inactive
        };
    }
    loadQuoteWorkspace(opportunityId, onSettled) {
        this.quoteLoading.set(true);
        this.opportunityData.getQuotes(opportunityId).subscribe({
            next: (quotes) => {
                this.quoteLoading.set(false);
                this.quoteSummaries = quotes ?? [];
                if (!this.quoteSummaries.length) {
                    this.resetQuoteWorkspace();
                    this.quoteName = `${this.form.name || 'Opportunity'} Quote`;
                    onSettled?.();
                    return;
                }
                const nextQuoteId = this.selectedQuoteId && this.quoteSummaries.some((q) => q.id === this.selectedQuoteId)
                    ? this.selectedQuoteId
                    : this.quoteSummaries[0].id;
                this.onQuoteSelectionChange(nextQuoteId);
                onSettled?.();
            },
            error: () => {
                this.quoteLoading.set(false);
                this.quoteSummaries = [];
                this.resetQuoteWorkspace();
                onSettled?.();
            }
        });
    }
    loadProposalActivity(opportunityId) {
        this.opportunityData.getAudit(opportunityId).subscribe({
            next: (events) => {
                this.proposalActivityEvents = events ?? [];
            },
            error: () => {
                this.proposalActivityEvents = [];
            }
        });
    }
    markProposalResentChip(eventId) {
        this.recentProposalResendEventId = eventId;
        if (this.proposalResendChipTimeoutHandle) {
            clearTimeout(this.proposalResendChipTimeoutHandle);
        }
        this.proposalResendChipTimeoutHandle = setTimeout(() => {
            this.recentProposalResendEventId = null;
            this.proposalResendChipTimeoutHandle = null;
        }, 9000);
    }
    applyQuoteDetail(quote) {
        this.activeQuote = quote;
        this.selectedQuoteId = quote.id;
        this.quoteName = quote.name;
        this.quoteStatus = quote.status;
        this.quoteTaxAmount = quote.taxAmount;
        this.quoteNotes = quote.notes ?? '';
        this.quotePriceListId = quote.priceListId ?? null;
        this.quoteCurrency = quote.currency;
        this.quoteLines = quote.lines.map((line) => ({
            itemMasterId: line.itemMasterId,
            description: line.description ?? '',
            quantity: line.quantity,
            unitPrice: line.unitPrice,
            discountPercent: line.discountPercent,
            lineTotal: line.lineTotal
        }));
        this.onQuoteLineChanged();
    }
    applyProposalActionResult(result) {
        this.form.proposalStatus = result.proposalStatus || this.form.proposalStatus || 'Draft';
        this.form.proposalLink = result.proposalLink ?? this.form.proposalLink ?? '';
        if (result.proposalGeneratedAtUtc) {
            this.form.proposalGeneratedAtUtc = new Date(result.proposalGeneratedAtUtc);
        }
        if (result.proposalSentAtUtc) {
            this.form.proposalSentAtUtc = new Date(result.proposalSentAtUtc);
        }
        if (!this.form.proposalNotes && this.form.pricingNotes) {
            this.form.proposalNotes = this.form.pricingNotes;
        }
    }
    resolveApiErrorMessage(error, fallback) {
        const payload = error?.error;
        if (typeof payload === 'string' && payload.trim()) {
            return payload.trim();
        }
        const message = payload?.message;
        if (typeof message === 'string' && message.trim()) {
            return message.trim();
        }
        return fallback;
    }
    resetQuoteWorkspace() {
        this.activeQuote = null;
        this.selectedQuoteId = null;
        this.quoteSummaries = [];
        this.quoteStatus = 'Draft';
        this.quoteTaxAmount = 0;
        this.quoteNotes = '';
        this.quotePriceListId = null;
        this.quoteCurrency = this.resolveCurrency(this.form.currency);
        this.quoteName = '';
        this.quoteLines = [];
    }
    applyOpportunity(opp) {
        const accountIdFromName = this.accountOptions.find((opt) => opt.label === opp.account)?.value;
        if (!accountIdFromName && opp.account) {
            this.pendingAccountName = opp.account;
        }
        const resolvedAccountId = opp.accountId ?? accountIdFromName ?? this.form.accountId;
        const stage = opp.stage || 'Prospecting';
        this.selectedStage = stage;
        this.originalStage = stage;
        Object.assign(this.form, {
            name: opp.name,
            accountId: resolvedAccountId,
            stageName: stage,
            amount: opp.amount ?? 0,
            currency: this.resolveCurrency(opp.currency),
            probability: opp.probability ?? this.estimateProbability(stage),
            forecastCategory: opp.forecastCategory ?? this.estimateForecastCategory(stage),
            opportunityType: opp.opportunityType ?? 'New',
            expectedCloseDate: opp.closeDate ? new Date(opp.closeDate) : undefined,
            contractStartDateUtc: opp.contractStartDateUtc ? new Date(opp.contractStartDateUtc) : undefined,
            contractEndDateUtc: opp.contractEndDateUtc ? new Date(opp.contractEndDateUtc) : undefined,
            summary: opp.summary ?? '',
            requirements: opp.requirements ?? '',
            buyingProcess: opp.buyingProcess ?? '',
            successCriteria: opp.successCriteria ?? '',
            discountPercent: opp.discountPercent ?? undefined,
            discountAmount: opp.discountAmount ?? undefined,
            pricingNotes: opp.pricingNotes ?? '',
            securityReviewStatus: opp.securityReviewStatus ?? 'Not Started',
            securityNotes: opp.securityNotes ?? '',
            legalReviewStatus: opp.legalReviewStatus ?? 'Not Started',
            legalNotes: opp.legalNotes ?? '',
            proposalStatus: opp.proposalStatus ?? 'Not Started',
            proposalNotes: opp.proposalNotes ?? '',
            proposalLink: opp.proposalLink ?? '',
            proposalGeneratedAtUtc: opp.proposalGeneratedAtUtc ? new Date(opp.proposalGeneratedAtUtc) : undefined,
            proposalSentAtUtc: opp.proposalSentAtUtc ? new Date(opp.proposalSentAtUtc) : undefined,
            preSalesScope: opp.preSalesScope ?? '',
            preSalesApproach: opp.preSalesApproach ?? '',
            deliveryOwnerId: opp.deliveryOwnerId ?? undefined,
            deliveryHandoffScope: opp.deliveryHandoffScope ?? '',
            deliveryHandoffRisks: opp.deliveryHandoffRisks ?? '',
            deliveryHandoffTimeline: opp.deliveryHandoffTimeline ?? '',
            deliveryStatus: opp.deliveryStatus ?? undefined,
            deliveryCompletedAtUtc: opp.deliveryCompletedAtUtc ? new Date(opp.deliveryCompletedAtUtc) : undefined,
            isClosed: opp.status !== 'Open',
            isWon: opp.status === 'Closed Won',
            winLossReason: opp.winLossReason ?? ''
        });
        this.dealCreatedAtUtc = opp.createdAtUtc ?? null;
        this.nextStepDueAtUtc = opp.nextStepDueAtUtc ? new Date(opp.nextStepDueAtUtc) : null;
        this.approvalRequest = {
            ...this.approvalRequest,
            amount: opp.amount ?? this.approvalRequest.amount,
            currency: this.resolveCurrency(opp.currency ?? this.approvalRequest.currency)
        };
        this.quoteCurrency = this.resolveCurrency(opp.currency);
        if (!this.quoteName) {
            this.quoteName = `${opp.name} Quote`;
        }
        this.approvalAmountLocked = false;
        this.syncApprovalAmount();
        this.enforceAccordionAccess();
        this.captureFormSnapshot();
        this.cdr.detectChanges();
    }
    createEmptyForm() {
        return {
            name: '',
            accountId: undefined,
            stageName: 'Prospecting',
            amount: 0,
            currency: this.resolveCurrencyCode(),
            probability: this.estimateProbability('Prospecting'),
            forecastCategory: this.estimateForecastCategory('Prospecting'),
            opportunityType: 'New',
            expectedCloseDate: undefined,
            contractStartDateUtc: undefined,
            contractEndDateUtc: undefined,
            summary: '',
            requirements: '',
            buyingProcess: '',
            successCriteria: '',
            discountPercent: undefined,
            discountAmount: undefined,
            pricingNotes: '',
            securityReviewStatus: 'Not Started',
            securityNotes: '',
            legalReviewStatus: 'Not Started',
            legalNotes: '',
            proposalStatus: 'Not Started',
            proposalNotes: '',
            proposalLink: '',
            proposalGeneratedAtUtc: undefined,
            proposalSentAtUtc: undefined,
            preSalesScope: '',
            preSalesApproach: '',
            deliveryOwnerId: undefined,
            deliveryHandoffScope: '',
            deliveryHandoffRisks: '',
            deliveryHandoffTimeline: '',
            deliveryStatus: undefined,
            deliveryCompletedAtUtc: undefined,
            isClosed: false,
            isWon: false,
            winLossReason: ''
        };
    }
    upsertApproval(item) {
        const existingIndex = this.approvals.findIndex((approval) => approval.id === item.id);
        if (existingIndex >= 0) {
            const updated = [...this.approvals];
            updated[existingIndex] = item;
            this.approvals = updated;
        }
        else {
            this.approvals = [item, ...this.approvals];
        }
    }
    estimateProbability(stage) {
        const map = {
            Prospecting: 20,
            Qualification: 35,
            Proposal: 55,
            'Security / Legal Review': 65,
            Negotiation: 75,
            Commit: 85,
            'Closed Won': 100,
            'Closed Lost': 0
        };
        return map[stage] ?? 0;
    }
    estimateForecastCategory(stage) {
        const map = {
            Prospecting: 'Pipeline',
            Qualification: 'Pipeline',
            Proposal: 'Best Case',
            'Security / Legal Review': 'Best Case',
            Negotiation: 'Commit',
            Commit: 'Commit',
            'Closed Won': 'Closed',
            'Closed Lost': 'Omitted'
        };
        return map[stage] ?? 'Pipeline';
    }
    stageRank(stage) {
        const order = this.stageOptions.map((item) => item.value);
        const idx = order.indexOf(stage);
        return idx >= 0 ? idx : 0;
    }
    defaultReviewDueLocal() {
        const due = new Date();
        due.setDate(due.getDate() + 2);
        due.setSeconds(0, 0);
        const tzOffset = due.getTimezoneOffset();
        const local = new Date(due.getTime() - tzOffset * 60_000);
        return local.toISOString().slice(0, 16);
    }
    localToUtcIso(localValue) {
        if (!localValue?.trim()) {
            return null;
        }
        const parsed = new Date(localValue);
        return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
    }
    loadCurrencyContext() {
        this.referenceData.getCurrencies().subscribe((items) => {
            const active = items.filter((currency) => currency.isActive);
            this.currencyOptions = active.map((currency) => ({
                label: currency.code,
                value: currency.code
            }));
            this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
            this.applyCurrencyDefaults(this.currencyFallback);
        });
        this.settingsService.getSettings().subscribe({
            next: (settings) => {
                const resolved = settings.currency || this.currencyFallback;
                this.approvalAmountThreshold =
                    settings.approvalAmountThreshold != null ? Number(settings.approvalAmountThreshold) : null;
                this.applyCurrencyDefaults(resolved);
            }
        });
    }
    latestApprovalByPurpose(purpose) {
        return this.approvals.find((approval) => (approval.purpose || '').toLowerCase() === purpose.toLowerCase()) ?? null;
    }
    applyCurrencyDefaults(currencyCode) {
        const normalized = this.normalizeCurrencyCode(currencyCode);
        if (!normalized)
            return;
        if (!this.form?.currency) {
            this.form = { ...(this.form ?? this.createEmptyForm()), currency: normalized };
        }
        if (!this.approvalRequest.currency) {
            this.approvalRequest.currency = normalized;
        }
    }
    resolveCurrency(value) {
        const normalized = this.normalizeCurrencyCode(value);
        return normalized || this.resolveCurrencyCode();
    }
    resolveCurrencyCode() {
        // `this.form` can be undefined during field initialization (createEmptyForm -> resolveCurrencyCode).
        // Guard for that startup window.
        return (this.normalizeCurrencyCode(this.form?.currency) ||
            this.normalizeCurrencyCode(this.currencyFallback) ||
            this.normalizeCurrencyCode(this.currencyOptions[0]?.value) ||
            'USD');
    }
    normalizeCurrencyCode(value) {
        if (!value) {
            return '';
        }
        const normalized = value.trim().toUpperCase();
        return /^[A-Z]{3}$/.test(normalized) ? normalized : '';
    }
    isPainConfirmationRequired() {
        const stage = this.selectedStage || 'Prospecting';
        return ['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage);
    }
    isQualificationFitRequired() {
        const stage = this.selectedStage || 'Prospecting';
        return ['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage);
    }
    demoOutcomeGuidance() {
        const stage = this.selectedStage || 'Prospecting';
        if (['Proposal', 'Negotiation', 'Commit'].includes(stage)) {
            return 'Demo/POC outcome is required before moving to late stages. Log a Demo/POC activity.';
        }
        return null;
    }
    discoveryGuidance() {
        const stage = this.selectedStage || 'Prospecting';
        if (['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage)) {
            return 'Discovery meeting + notes are required before moving to qualification or later. Schedule a Discovery activity.';
        }
        return null;
    }
    stageRequirementHint() {
        const stage = this.selectedStage || 'Prospecting';
        if (stage === 'Prospecting')
            return null;
        const needs = [];
        if (['Qualification', 'Proposal', 'Negotiation'].includes(stage))
            needs.push('amount');
        if (['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage)) {
            needs.push('close date', 'pain summary', 'requirements', 'buying process', 'success criteria');
        }
        if (['Proposal', 'Negotiation', 'Commit'].includes(stage))
            needs.push('buying role contact');
        if (stage === 'Commit')
            needs.push('close date');
        if (!needs.length)
            return null;
        const unique = [...new Set(needs)];
        return `${stage} requires: ${unique.join(', ')}.`;
    }
    validateStageRequirements() {
        const stage = this.selectedStage;
        const amountRequired = ['Qualification', 'Proposal', 'Negotiation'].includes(stage);
        const closeDateRequired = ['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage);
        const buyingRoleRequired = ['Proposal', 'Negotiation', 'Commit'].includes(stage);
        const painRequired = ['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage);
        const fitRequired = ['Qualification', 'Proposal', 'Negotiation', 'Commit'].includes(stage);
        const contractStart = this.form.contractStartDateUtc ? new Date(this.form.contractStartDateUtc) : null;
        const contractEnd = this.form.contractEndDateUtc ? new Date(this.form.contractEndDateUtc) : null;
        if (contractStart && contractEnd && contractEnd < contractStart) {
            return 'Contract end date must be after the contract start date.';
        }
        if (!this.isEditMode()) {
            if (!stage?.trim()) {
                return 'Stage is required when creating a deal.';
            }
            if (!this.form.amount || this.form.amount <= 0) {
                return 'Amount is required when creating a deal.';
            }
            if (!this.form.expectedCloseDate) {
                return 'Expected close date is required when creating a deal.';
            }
        }
        if (amountRequired && (!this.form.amount || this.form.amount <= 0)) {
            return `Amount is required before moving to ${stage}.`;
        }
        if ((this.form.discountPercent || this.form.discountAmount)
            && (!this.form.pricingNotes || !this.form.pricingNotes.trim())) {
            return 'Pricing notes and objections are required when applying discounts.';
        }
        if (closeDateRequired && !this.form.expectedCloseDate) {
            return `Expected close date is required before moving to ${stage}.`;
        }
        if (buyingRoleRequired) {
            return 'A buying role contact is required before moving to late-stage opportunities.';
        }
        if (painRequired && !this.form.summary?.trim()) {
            return `Pain/problem summary is required before moving to ${stage}.`;
        }
        if (fitRequired) {
            if (!this.form.requirements?.trim()) {
                return `Requirements are required before moving to ${stage}.`;
            }
            if (!this.form.buyingProcess?.trim()) {
                return `Buying process is required before moving to ${stage}.`;
            }
            if (!this.form.successCriteria?.trim()) {
                return `Success criteria is required before moving to ${stage}.`;
            }
        }
        if (['Proposal', 'Security / Legal Review', 'Negotiation', 'Commit'].includes(stage)) {
            if (!this.technicalChecklist.length) {
                return 'Log at least one technical risk before demo/validation.';
            }
        }
        if (stage === 'Commit') {
            if (this.form.securityReviewStatus !== 'Approved' || this.form.legalReviewStatus !== 'Approved') {
                return 'Security and legal reviews must be approved before moving to Commit.';
            }
            if (this.form.forecastCategory !== 'Commit') {
                return 'Forecast category must be Commit before moving to the Commit stage.';
            }
        }
        if (this.form.isClosed) {
            if (!this.form.forecastCategory) {
                return 'Forecast category is required before closing a deal.';
            }
            if (this.form.isWon && this.form.forecastCategory !== 'Closed') {
                return 'Closed won opportunities must use the Closed forecast category.';
            }
            if (!this.form.isWon && this.form.forecastCategory !== 'Omitted') {
                return 'Closed lost opportunities must use the Omitted forecast category.';
            }
        }
        if (this.form.isClosed && this.form.isWon) {
            const handoffError = this.validateHandoffRequirements();
            if (handoffError) {
                return handoffError;
            }
        }
        if (this.isEditMode() && this.originalStage && stage !== this.originalStage && !stage.startsWith('Closed')) {
            if (!this.nextStepDueAtUtc) {
                return 'Next step is required before changing stage. Log an activity with a due date.';
            }
        }
        return null;
    }
    validateHandoffRequirements() {
        if (!this.form.deliveryOwnerId) {
            return 'Delivery owner is required for handoff.';
        }
        if (!this.form.deliveryHandoffScope?.trim()) {
            return 'Handoff scope is required before kickoff.';
        }
        if (!this.form.deliveryHandoffRisks?.trim()) {
            return 'Handoff risks are required before kickoff.';
        }
        if (!this.form.deliveryHandoffTimeline?.trim()) {
            return 'Handoff timeline is required before kickoff.';
        }
        return null;
    }
    /* ── Stakeholders / Contact Roles ─────────────────────── */
    loadDealContactRoles(opportunityId, onSettled) {
        this.dealContactRolesLoading.set(true);
        this.opportunityData.getContactRoles(opportunityId).subscribe({
            next: (items) => {
                this.dealContactRoles.set(items);
                this.dealContactRolesLoading.set(false);
                onSettled?.();
            },
            error: () => {
                this.dealContactRoles.set([]);
                this.dealContactRolesLoading.set(false);
                onSettled?.();
            }
        });
        this.loadStakeholderContactOptions();
    }
    loadDealHealthScore(opportunityId, onSettled) {
        this.dealHealthScoreLoading.set(true);
        this.opportunityData.getHealthScore(opportunityId).subscribe({
            next: (hs) => {
                this.dealHealthScore.set(hs);
                this.dealHealthScoreLoading.set(false);
                onSettled?.();
            },
            error: () => {
                this.dealHealthScore.set(null);
                this.dealHealthScoreLoading.set(false);
                onSettled?.();
            }
        });
    }
    refreshDealHealthScore() {
        if (!this.editingId)
            return;
        this.loadDealHealthScore(this.editingId);
    }
    healthScoreColor(score) {
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
    loadStageHistory(opportunityId, onSettled) {
        this.stageHistoryLoading.set(true);
        this.opportunityData.getHistory(opportunityId).subscribe({
            next: (items) => {
                this.stageHistory.set(items);
                this.stageHistoryLoading.set(false);
                onSettled?.();
            },
            error: () => {
                this.stageHistory.set([]);
                this.stageHistoryLoading.set(false);
                onSettled?.();
            }
        });
    }
    loadStakeholderContactOptions() {
        const accountId = this.form?.accountId;
        this.stakeholderContactSearching.set(true);
        this.contactData.search({ accountId: accountId || undefined, pageSize: 100 }).subscribe({
            next: (res) => {
                this.stakeholderContactOptions.set((res.items ?? []).map((c) => ({ label: `${c.name}${c.jobTitle ? ' – ' + c.jobTitle : ''}`, value: c.id })));
                this.stakeholderContactSearching.set(false);
            },
            error: () => {
                this.stakeholderContactOptions.set([]);
                this.stakeholderContactSearching.set(false);
            }
        });
    }
    addDealStakeholder() {
        if (!this.editingId || !this.stakeholderSelectedContactId || !this.stakeholderSelectedRole)
            return;
        const payload = {
            contactId: this.stakeholderSelectedContactId,
            role: this.stakeholderSelectedRole,
            notes: this.stakeholderNotes || undefined,
            isPrimary: this.stakeholderIsPrimary
        };
        this.stakeholderAdding.set(true);
        this.opportunityData.addContactRole(this.editingId, payload).subscribe({
            next: (role) => {
                this.dealContactRoles.update((list) => [...list, role]);
                this.stakeholderSelectedContactId = '';
                this.stakeholderSelectedRole = '';
                this.stakeholderNotes = '';
                this.stakeholderIsPrimary = false;
                this.stakeholderAdding.set(false);
                this.toastService.show('success', 'Stakeholder added.');
            },
            error: () => {
                this.stakeholderAdding.set(false);
                this.toastService.show('error', 'Failed to add stakeholder.');
            }
        });
    }
    removeDealStakeholder(roleId) {
        if (!this.editingId)
            return;
        this.stakeholderRemovingIds.update((ids) => [...ids, roleId]);
        this.opportunityData.removeContactRole(this.editingId, roleId).subscribe({
            next: () => {
                this.dealContactRoles.update((list) => list.filter((r) => r.id !== roleId));
                this.stakeholderRemovingIds.update((ids) => ids.filter((id) => id !== roleId));
                this.toastService.show('success', 'Stakeholder removed.');
            },
            error: () => {
                this.stakeholderRemovingIds.update((ids) => ids.filter((id) => id !== roleId));
                this.toastService.show('error', 'Failed to remove stakeholder.');
            }
        });
    }
    stakeholderRoleIcon(role) {
        switch (role) {
            case 'Decision Maker': return 'pi pi-star';
            case 'Champion': return 'pi pi-heart';
            case 'Influencer': return 'pi pi-megaphone';
            case 'Evaluator': return 'pi pi-search';
            case 'Blocker': return 'pi pi-ban';
            default: return 'pi pi-user';
        }
    }
    /* ── Deal Activity Timeline ─────────────────────────────── */
    loadRecentDealActivities(opportunityId) {
        this.recentDealActivitiesLoading.set(true);
        this.activityData
            .search({ page: 1, pageSize: 8, relatedEntityType: 'Opportunity', relatedEntityId: opportunityId })
            .subscribe({
            next: (res) => {
                this.recentDealActivities.set((res.items ?? []).slice(0, 8));
                this.recentDealActivitiesLoading.set(false);
            },
            error: () => {
                this.recentDealActivities.set([]);
                this.recentDealActivitiesLoading.set(false);
            }
        });
    }
    activityTypeIcon(type) {
        switch (type) {
            case 'Meeting': return 'pi pi-users';
            case 'Call': return 'pi pi-phone';
            case 'Email': return 'pi pi-envelope';
            case 'Task': return 'pi pi-check-square';
            case 'Note':
            default: return 'pi pi-file-edit';
        }
    }
    activityTimelineDateLabel(item) {
        return item.completedDateUtc ?? item.dueDateUtc ?? item.createdAtUtc;
    }
    openActivityRecord(activityId) {
        void this.router.navigate(['/app/activities', activityId, 'edit']);
    }
    logDealActivity() {
        void this.router.navigate(['/app/activities']);
    }
    /* ── Deal Attachments ───────────────────────────────────── */
    loadDealAttachments(opportunityId) {
        this.dealAttachmentsLoading.set(true);
        this.attachmentData.list('Opportunity', opportunityId).subscribe({
            next: (items) => {
                this.dealAttachments.set(items);
                this.dealAttachmentsLoading.set(false);
            },
            error: () => {
                this.dealAttachments.set([]);
                this.dealAttachmentsLoading.set(false);
            }
        });
    }
    onDealAttachmentUpload(event) {
        const file = event.files?.[0];
        if (!file || !this.editingId)
            return;
        this.dealAttachmentUploading.set(true);
        this.attachmentData.upload(file, 'Opportunity', this.editingId).subscribe({
            next: (item) => {
                this.dealAttachments.update((list) => [...list, item]);
                this.dealAttachmentUploading.set(false);
                this.toastService.show('success', 'File uploaded successfully.');
            },
            error: () => {
                this.dealAttachmentUploading.set(false);
                this.toastService.show('error', 'File upload failed.');
            }
        });
    }
    deleteDealAttachment(item) {
        this.dealAttachmentDeletingIds.update((ids) => [...ids, item.id]);
        this.attachmentData.delete(item.id).subscribe({
            next: () => {
                this.dealAttachments.update((list) => list.filter((a) => a.id !== item.id));
                this.dealAttachmentDeletingIds.update((ids) => ids.filter((id) => id !== item.id));
                this.toastService.show('success', 'File deleted.');
            },
            error: () => {
                this.dealAttachmentDeletingIds.update((ids) => ids.filter((id) => id !== item.id));
                this.toastService.show('error', 'Failed to delete file.');
            }
        });
    }
    downloadDealAttachment(item) {
        window.open(this.attachmentData.downloadUrl(item.id), '_blank');
    }
    static ɵfac = function OpportunityFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OpportunityFormPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OpportunityFormPage, selectors: [["app-opportunity-form-page"]], hostBindings: function OpportunityFormPage_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("beforeunload", function OpportunityFormPage_beforeunload_HostBindingHandler($event) { return ctx.onBeforeUnload($event); }, i0.ɵɵresolveWindow)("input", function OpportunityFormPage_input_HostBindingHandler() { return ctx.onCollaborativeEditingActivity(); })("change", function OpportunityFormPage_change_HostBindingHandler() { return ctx.onCollaborativeEditingActivity(); });
        } }, decls: 357, vars: 218, consts: [["noOpportunityPromptDrafts", ""], ["noForecastData", ""], ["noDuplicateMatches", ""], ["noAccountSummary", ""], ["emptyQuoteLines", ""], ["preSalesLoading", ""], ["emptyTeam", ""], ["stakeholdersLoading", ""], ["noStakeholders", ""], ["noDealActivities", ""], ["approvalLoading", ""], ["noApprovalPermission", ""], ["noApprovals", ""], ["securityLoading", ""], ["emptySecurityChecklist", ""], ["emptyLegalChecklist", ""], ["emptyTechnicalChecklist", ""], ["reviewLoading", ""], ["repAckBlock", ""], ["emptyReviewThread", ""], ["noAckNeeded", ""], ["onboardingLoading", ""], ["emptyOnboardingChecklist", ""], ["emptyOnboardingMilestones", ""], ["healthScoreLoading", ""], ["noHealthScore", ""], ["agingLoading", ""], ["agingEmpty", ""], ["emptyDecisionHistory", ""], [1, "opportunity-form-page"], ["header", "Saved drafts available", "styleClass", "form-draft-prompt-dialog", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "form-draft-prompt"], [1, "form-draft-prompt__hero"], [1, "form-draft-prompt__icon"], [1, "pi", "pi-bookmark"], ["class", "form-draft-list", 4, "ngIf", "ngIfElse"], [1, "lead-status-dialog__actions"], ["pButton", "", "type", "button", "label", "Start fresh", 1, "p-button-outlined", 3, "click"], ["pButton", "", "type", "button", "label", "View all drafts", 1, "crm-button", "crm-button--primary", 3, "click"], ["header", "Open saved draft?", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "form-draft-dialog"], ["pButton", "", "type", "button", "label", "Cancel", 1, "p-button-outlined", 3, "click"], ["pButton", "", "type", "button", "label", "Open Draft", 1, "crm-button", "crm-button--primary", 3, "click"], ["header", "Unsaved deal changes", "styleClass", "form-leave-dialog", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "form-leave-dialog__body"], [1, "form-leave-dialog__hero"], [1, "form-leave-dialog__icon"], [1, "pi", "pi-exclamation-circle"], [1, "form-leave-dialog__actions"], ["pButton", "", "type", "button", "label", "Stay on form", 1, "p-button-outlined", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Leave without saving", 1, "p-button-outlined", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Save to draft", 1, "crm-button", "crm-button--secondary", 3, "click", "loading", "disabled"], ["pButton", "", "type", "button", 1, "crm-button", "crm-button--primary", 3, "click", "label", "loading", "disabled"], ["header", "Saved deal drafts", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], ["class", "form-draft-dialog__empty", 4, "ngIf"], ["class", "form-draft-list", 4, "ngIf"], [1, "form-header"], [1, "header-content"], ["type", "button", "routerLink", "/app/deals", 1, "back-link"], [1, "pi", "pi-arrow-left"], [1, "header-row"], [1, "header-title"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], ["class", "deal-header-progress", 4, "ngIf"], ["class", "form-draft-status", 4, "ngIf"], ["class", "form-draft-banner", 4, "ngIf"], ["class", "presence-focus", 4, "ngIf"], ["class", "presence-editing-note", 4, "ngIf"], [1, "header-meta"], [1, "meta-chip"], [1, "pi", "pi-flag"], [1, "pi", "pi-percentage"], [1, "pi", "pi-money-bill"], ["class", "policy-gate-banner", 4, "ngIf"], ["class", "decision-review-banner", 4, "ngIf"], ["class", "decision-review-banner approval-lock-banner", 4, "ngIf"], ["class", "related-summary", 4, "ngIf"], [1, "form-body"], [1, "deal-sticky-summary"], [1, "metric-card", "metric-card--total"], [1, "metric-icon"], [1, "pi", "pi-briefcase"], [1, "metric-content"], [1, "metric-label"], [1, "metric-value"], [1, "metric-card", "metric-card--leads"], [1, "metric-card", "metric-card--prospects"], [1, "metric-card", "metric-card--customers"], [1, "pi", "pi-user"], [1, "metric-card", "metric-card--risk"], [1, "pi", "pi-shield"], [1, "opportunity-accordion-badge", "metric-card__status-badge", 3, "title"], [1, "metric-card", "metric-card--approval"], [1, "pi", "pi-lock"], [1, "form-layout", 3, "ngSubmit"], [1, "form-lock-fieldset", 3, "disabled"], [1, "deal-tabs-shell", 3, "valueChange", "value"], [1, "deal-tabs"], ["value", "core"], [1, "opportunity-section-accordion", 3, "valueChange", "multiple", "value"], ["value", "opportunity-details", 3, "disabled"], [1, "opportunity-accordion-header"], [1, "opportunity-accordion-title"], [1, "opportunity-accordion-header-meta"], [1, "opportunity-accordion-badge"], [1, "form-card", "opportunity-accordion-card"], [1, "form-grid"], [1, "form-field"], ["for", "oppName"], [1, "required"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-tag"], ["pInputText", "", "id", "oppName", "name", "name", "required", "", "placeholder", "ACME rollout", 3, "ngModelChange", "ngModel"], ["class", "field-error", 4, "ngIf"], ["for", "oppAccount"], ["inputId", "oppAccount", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "accountId", "placeholder", "Select account", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "oppStage"], ["inputId", "oppStage", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "stage", "placeholder", "Pick stage", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["class", "field-hint", 4, "ngIf"], ["for", "oppClose"], ["inputId", "oppClose", "appendTo", "body", "name", "closeDate", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "showIcon"], ["value", "deal-settings", 3, "disabled"], [1, "pi", "pi-chart-line"], [1, "field-label-row"], ["for", "oppAmount"], [1, "approval-requirement-badge", 3, "title"], ["inputId", "oppAmount", "name", "amount", "mode", "currency", "placeholder", "0", 1, "w-full", 3, "ngModelChange", "ngModel", "currency"], ["for", "oppCurrency"], ["inputId", "oppCurrency", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "currency", "placeholder", "Currency", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "oppProbability"], ["inputId", "oppProbability", "name", "probability", "suffix", "%", 1, "w-full", 3, "ngModelChange", "ngModel", "min", "max"], ["for", "oppForecast"], ["inputId", "oppForecast", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "forecastCategory", "placeholder", "Select forecast", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "disabled"], ["for", "oppType"], ["inputId", "oppType", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "opportunityType", "placeholder", "Type", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "oppContractStart"], ["inputId", "oppContractStart", "appendTo", "body", "name", "contractStartDateUtc", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "showIcon"], ["for", "oppContractEnd"], ["inputId", "oppContractEnd", "appendTo", "body", "name", "contractEndDateUtc", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "showIcon"], ["for", "oppReason"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-info-circle"], ["pInputText", "", "id", "oppReason", "name", "reason", "placeholder", "Optional", 3, "ngModelChange", "ngModel"], [1, "form-field", "full-row"], ["for", "oppSummary"], ["pTextarea", "", "id", "oppSummary", "rows", "4", "name", "summary", "placeholder", "Key notes, stakeholders, risks", 1, "w-full", 3, "ngModelChange", "ngModel"], ["class", "required", 4, "ngIf"], ["pTextarea", "", "rows", "3", "name", "requirements", "placeholder", "Key requirements, scope, constraints", 1, "w-full", 3, "ngModelChange", "ngModel"], ["pTextarea", "", "rows", "3", "name", "buyingProcess", "placeholder", "Decision steps, stakeholders, approvals", 1, "w-full", 3, "ngModelChange", "ngModel"], ["pTextarea", "", "rows", "3", "name", "successCriteria", "placeholder", "What must be true for a win", 1, "w-full", 3, "ngModelChange", "ngModel"], ["value", "commercial"], ["value", "pricing-discounts", 3, "disabled"], ["for", "oppDiscountPercent"], ["inputId", "oppDiscountPercent", "name", "discountPercent", "suffix", "%", 1, "w-full", 3, "ngModelChange", "ngModel", "min", "max"], ["for", "oppDiscountAmount"], ["inputId", "oppDiscountAmount", "name", "discountAmount", "mode", "currency", "placeholder", "0", 1, "w-full", 3, "ngModelChange", "ngModel", "currency"], ["for", "oppPricingNotes"], ["pTextarea", "", "id", "oppPricingNotes", "rows", "3", "name", "pricingNotes", "placeholder", "Discount rationale, objections, approvals, or constraints", 1, "w-full", 3, "ngModelChange", "ngModel"], ["value", "quote-proposal", 3, "disabled", 4, "ngIf"], ["value", "revenue-forecast"], [1, "pi", "pi-chart-bar"], [1, "opportunity-accordion-badge", "opportunity-accordion-badge--info"], [1, "form-card", "opportunity-accordion-card", "revenue-forecast-section"], ["class", "revenue-forecast", 4, "ngIf", "ngIfElse"], ["value", "people"], ["value", "pre-sales-team", 3, "disabled", 4, "ngIf"], ["value", "deal-stakeholders", 3, "disabled", 4, "ngIf"], ["value", "deal-activity"], [1, "pi", "pi-clock"], [1, "form-card", "opportunity-accordion-card", "deal-activity-section"], ["class", "deal-activity-timeline", 4, "ngIf"], ["class", "deal-activity-empty", 4, "ngIf"], ["value", "compliance"], ["value", "approval-workflow", 3, "disabled", 4, "ngIf"], ["value", "security-legal", 3, "disabled", 4, "ngIf"], ["value", "review-thread", 3, "disabled", 4, "ngIf"], ["value", "delivery"], ["value", "delivery-handoff", 3, "disabled", 4, "ngIf"], ["value", "onboarding", 3, "disabled", 4, "ngIf"], ["value", "deal-health-score", 3, "disabled", 4, "ngIf"], ["value", "deal-aging", 3, "disabled", 4, "ngIf"], ["value", "deal-attachments"], [1, "pi", "pi-paperclip"], [1, "form-card", "opportunity-accordion-card", "deal-attachments-section"], ["class", "deal-attachments", 4, "ngIf"], ["class", "deal-attachments__empty", 4, "ngIf"], ["class", "form-card opportunity-accordion-card decision-review-panel", 4, "ngIf"], ["class", "form-card opportunity-accordion-card approval-history-section", 4, "ngIf"], [1, "form-actions"], ["type", "button", "pButton", "", "label", "Cancel", 1, "crm-button--ghost", 3, "click"], ["type", "button", "pButton", "", "icon", "pi pi-check", 1, "crm-button--primary", 3, "click", "label", "disabled"], ["icon", "pi pi-bookmark", "styleClass", "crm-draft-splitbutton", "buttonStyleClass", "crm-button--secondary", "menuButtonStyleClass", "crm-button--secondary", "appendTo", "body", 3, "onClick", "label", "disabled", "model"], [3, "visibleChange", "onHide", "header", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "duplicate-dialog"], [1, "duplicate-dialog__message"], ["class", "duplicate-dialog__list", 4, "ngIf", "ngIfElse"], [1, "duplicate-dialog__actions"], ["pButton", "", "type", "button", "class", "crm-button crm-button--primary", "label", "Save Anyway", 3, "click", 4, "ngIf"], [1, "form-draft-list"], ["class", "form-draft-list__item", 4, "ngFor", "ngForOf"], [1, "form-draft-list__item"], [1, "form-draft-list__title"], [1, "form-draft-list__meta"], [1, "form-draft-list__actions"], ["type", "button", 1, "form-draft-list__resume", 3, "click"], [1, "form-draft-dialog__empty"], ["type", "button", 1, "form-draft-list__discard", 3, "click"], [1, "deal-header-progress"], [1, "deal-header-progress__dial"], ["valueColor", "var(--deal-header-score-color)", "rangeColor", "rgba(148, 163, 184, 0.18)", "textColor", "#1e293b", "styleClass", "deal-header-progress__knob", 3, "ngModel", "readonly", "valueTemplate", "size", "strokeWidth", "showValue", "min", "max"], [1, "deal-header-progress__content"], [1, "deal-header-progress__eyebrow"], [1, "deal-header-progress__meta"], [1, "deal-header-progress__status"], [1, "deal-header-progress__step"], [1, "deal-header-progress__copy"], [1, "form-draft-status"], [1, "form-draft-banner"], [1, "presence-focus"], [1, "pi", "pi-eye"], [1, "presence-editing-note"], [1, "pi", "pi-pencil"], [1, "policy-gate-banner"], ["class", "policy-gate-actions", 4, "ngIf"], [1, "policy-gate-actions"], ["pButton", "", "type", "button", "icon", "pi pi-send", 1, "policy-gate-action-button", 3, "click", "label", "loading", "disabled"], [1, "decision-review-banner"], [1, "decision-review-banner", "approval-lock-banner"], [1, "related-summary"], [1, "related-summary-label"], ["class", "related-summary-links", 4, "ngIf", "ngIfElse"], [1, "related-summary-links"], [1, "related-summary-link", 3, "routerLink"], [1, "pi", "pi-building"], [1, "related-summary-empty"], [3, "value", "pt"], [1, "deal-tab-label"], [1, "field-error"], [1, "field-hint"], ["value", "quote-proposal", 3, "disabled"], [1, "pi", "pi-file-edit"], [1, "section-subtitle"], ["for", "oppProposalStatus"], ["inputId", "oppProposalStatus", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "proposalStatus", "placeholder", "Select status", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "oppProposalLink"], [1, "icon-addon", "icon-addon--website"], [1, "pi", "pi-link"], ["pInputText", "", "id", "oppProposalLink", "name", "proposalLink", "placeholder", "Paste proposal URL", 3, "ngModelChange", "ngModel"], ["for", "oppProposalGenerated"], ["inputId", "oppProposalGenerated", "name", "proposalGeneratedAtUtc", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "ngModel", "showIcon"], ["for", "oppProposalSent"], ["inputId", "oppProposalSent", "name", "proposalSentAtUtc", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "ngModel", "showIcon"], ["for", "oppProposalNotes"], ["pTextarea", "", "id", "oppProposalNotes", "rows", "3", "name", "proposalNotes", "placeholder", "Scope summary, key terms, or customer notes", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "quote-workspace"], [1, "quote-workspace__header"], ["for", "oppQuoteSelect"], ["inputId", "oppQuoteSelect", "appendTo", "body", "optionLabel", "name", "optionValue", "id", "name", "quoteSelect", "placeholder", "Select quote", "styleClass", "w-full", 3, "ngModelChange", "options", "showClear", "ngModel"], ["for", "oppQuoteName"], ["pInputText", "", "id", "oppQuoteName", "name", "quoteName", "placeholder", "Quote name", 3, "ngModelChange", "ngModel"], ["for", "oppQuotePriceList"], ["inputId", "oppQuotePriceList", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "quotePriceListId", "placeholder", "Select price list", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "oppQuoteTax"], ["inputId", "oppQuoteTax", "name", "quoteTaxAmount", "mode", "currency", 1, "w-full", 3, "ngModelChange", "ngModel", "currency"], ["class", "quote-lines", 4, "ngIf", "ngIfElse"], [1, "quote-summary"], ["class", "proposal-preview-card", 4, "ngIf"], ["class", "proposal-activity-card", 4, "ngIf"], [1, "team-actions"], ["type", "button", 1, "btn-glass", 3, "click"], [1, "pi", "pi-plus"], ["type", "button", 1, "btn-glass", "btn-primary", 3, "click", "disabled"], [1, "pi", "pi-save"], ["type", "button", 1, "btn-glass", 3, "click", "disabled"], [1, "pi", "pi-check-circle"], [1, "pi", "pi-file"], [1, "pi", "pi-send"], ["class", "proposal-send-hint", 4, "ngIf"], ["header", "Send Proposal", 3, "visibleChange", "visible", "modal", "draggable", "resizable"], [1, "proposal-send-dialog"], ["for", "proposalSendRecipient"], [1, "icon-addon", "icon-addon--email"], [1, "pi", "pi-envelope"], ["pInputText", "", "id", "proposalSendRecipient", "name", "proposalSendRecipient", "placeholder", "Leave empty to use primary contact email", 3, "ngModelChange", "ngModel"], ["for", "proposalSendMessage"], ["pTextarea", "", "id", "proposalSendMessage", "name", "proposalSendMessage", "rows", "4", "placeholder", "Add a short custom message", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "proposal-send-dialog__actions"], ["pButton", "", "type", "button", "label", "Cancel", "icon", "pi pi-times", 1, "p-button-text", 3, "click"], ["pButton", "", "type", "button", "icon", "pi pi-send", 3, "click", "label", "disabled"], [1, "quote-lines"], [1, "quote-line", "quote-line--header"], ["class", "quote-line", 4, "ngFor", "ngForOf"], [1, "quote-line"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Item", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "name"], ["pTemplate", "item"], ["pTemplate", "value"], ["pInputText", "", "placeholder", "Line description", 1, "w-full", 3, "ngModelChange", "ngModel", "name"], [1, "w-full", 3, "ngModelChange", "ngModel", "name", "min"], ["mode", "currency", 1, "w-full", 3, "ngModelChange", "ngModel", "name", "currency"], ["suffix", "%", 1, "w-full", 3, "ngModelChange", "ngModel", "name", "min", "max"], ["mode", "currency", 1, "w-full", 3, "ngModel", "ngModelOptions", "disabled", "currency"], ["type", "button", 1, "btn-glass", "btn-icon", 3, "click"], [1, "pi", "pi-times"], [1, "quote-item-option"], [1, "quote-item-option__badges"], [1, "quote-item-type-pill", 3, "ngClass"], ["class", "quote-item-type-pill inactive", 4, "ngIf"], [1, "quote-item-type-pill", "inactive"], ["class", "quote-item-option", 4, "ngIf"], ["class", "select-placeholder", 4, "ngIf"], [1, "select-placeholder"], [1, "empty-state"], [1, "proposal-preview-card"], [1, "proposal-preview-card__info"], [1, "proposal-preview-card__label"], ["target", "_blank", "rel", "noopener", 1, "proposal-preview-card__link", 3, "href"], [1, "proposal-preview-card__actions"], ["pButton", "", "target", "_blank", "rel", "noopener", "icon", "pi pi-eye", "label", "Preview", 1, "p-button-sm", "p-button-text", 3, "href"], ["pButton", "", "target", "_blank", "rel", "noopener", "download", "", "icon", "pi pi-download", "label", "Download", 1, "p-button-sm", 3, "href"], [1, "proposal-activity-card"], ["class", "proposal-activity-row", 4, "ngFor", "ngForOf"], [1, "proposal-activity-row"], [1, "proposal-activity-row__title"], [4, "ngIf"], [1, "proposal-activity-row__meta"], ["pButton", "", "type", "button", "class", "p-button-sm p-button-text", "icon", "pi pi-replay", "label", "Resend", 3, "click", 4, "ngIf"], ["class", "proposal-resent-chip", 4, "ngIf"], ["pButton", "", "type", "button", "icon", "pi pi-replay", "label", "Resend", 1, "p-button-sm", "p-button-text", 3, "click"], [1, "proposal-resent-chip"], [1, "pi", "pi-check"], [1, "proposal-send-hint"], [1, "revenue-forecast"], [1, "forecast-metrics"], [1, "forecast-metric", "forecast-metric--primary"], [1, "forecast-metric__label"], [1, "forecast-metric__value"], [1, "forecast-metric", "forecast-metric--success"], [1, "forecast-metric", "forecast-metric--info"], ["class", "forecast-metric forecast-metric--warn", 4, "ngIf"], [1, "forecast-metric", "forecast-metric--neutral"], [1, "forecast-chart-container"], ["type", "doughnut", "height", "260px", 3, "data", "options"], [1, "forecast-metric", "forecast-metric--warn"], [1, "forecast-empty"], ["value", "pre-sales-team", 3, "disabled"], [1, "pi", "pi-users"], [4, "ngIf", "ngIfElse"], ["class", "team-grid", 4, "ngIf", "ngIfElse"], ["for", "oppPreSalesScope"], ["pTextarea", "", "id", "oppPreSalesScope", "rows", "3", "name", "preSalesScope", "placeholder", "Solution scope, deliverables, and boundaries", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "oppPreSalesApproach"], ["pTextarea", "", "id", "oppPreSalesApproach", "rows", "3", "name", "preSalesApproach", "placeholder", "Proposed approach, timeline, and key assumptions", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "team-grid"], ["class", "team-row", 4, "ngFor", "ngForOf"], [1, "team-row"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Select teammate", "styleClass", "w-full", 3, "ngModelChange", "options", "name", "ngModel"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Role", "styleClass", "w-full", 3, "ngModelChange", "options", "name", "ngModel"], [1, "form-card", "opportunity-accordion-card", "section-loading-card"], [1, "helper-text"], ["value", "deal-stakeholders", 3, "disabled"], [1, "pi", "pi-id-card"], [1, "form-card", "opportunity-accordion-card", "deal-stakeholders-section"], [1, "deal-stakeholders__add-form"], [1, "deal-stakeholders__add-row"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "stakeholderContactId", "placeholder", "Select contact", "filterPlaceholder", "Search contacts\u2026", "styleClass", "stakeholder-select", 3, "ngModelChange", "options", "ngModel", "filter", "loading"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "stakeholderRole", "placeholder", "Role", "styleClass", "stakeholder-role-select", 3, "ngModelChange", "options", "ngModel"], [1, "stakeholder-primary-toggle"], ["type", "checkbox", "name", "stakeholderPrimary", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "action-btn", "action-btn--add", "action-btn--sm", 3, "click", "disabled"], [1, "action-btn__icon"], ["class", "deal-stakeholders__notes-row", 4, "ngIf"], ["class", "deal-stakeholders__loading", 4, "ngIf"], ["class", "deal-stakeholders__list", 4, "ngIf", "ngIfElse"], [1, "deal-stakeholders__notes-row"], ["pInputText", "", "name", "stakeholderNotes", "placeholder", "Optional notes about this stakeholder's role\u2026", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "deal-stakeholders__loading"], [1, "pi", "pi-spin", "pi-spinner"], [1, "deal-stakeholders__list"], ["class", "deal-stakeholders__item", 4, "ngFor", "ngForOf"], [1, "deal-stakeholders__item"], [1, "deal-stakeholders__avatar"], [1, "deal-stakeholders__info"], [1, "deal-stakeholders__top"], [1, "deal-stakeholders__name"], ["class", "deal-stakeholders__primary-badge", 4, "ngIf"], [1, "deal-stakeholders__role-badge"], [1, "deal-stakeholders__meta"], ["class", "deal-stakeholders__notes", 4, "ngIf"], [1, "deal-stakeholders__actions"], ["type", "button", "title", "Remove stakeholder", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "pi", 3, "ngClass"], [1, "deal-stakeholders__primary-badge"], [1, "deal-stakeholders__notes"], ["class", "deal-stakeholders__empty", 4, "ngIf"], [1, "deal-stakeholders__empty"], [1, "deal-stakeholders__empty-hint"], [1, "deal-activity-timeline"], [1, "deal-activity-timeline__header"], [1, "pi", "pi-history"], ["type", "button", 1, "action-btn", "action-btn--add", "action-btn--sm", 3, "click"], [1, "pi", "pi-external-link"], ["class", "deal-activity-timeline__loading", 4, "ngIf"], ["class", "deal-activity-timeline__list", 4, "ngIf", "ngIfElse"], [1, "deal-activity-timeline__loading"], [1, "deal-activity-timeline__list"], ["type", "button", "class", "deal-activity-timeline__item", 3, "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "deal-activity-timeline__item", 3, "click"], [1, "deal-activity-timeline__icon"], [1, "deal-activity-timeline__content"], [1, "deal-activity-timeline__top"], [1, "deal-activity-timeline__subject"], [1, "deal-activity-timeline__status"], [1, "deal-activity-timeline__meta"], ["class", "deal-activity-timeline__outcome", 4, "ngIf"], [1, "deal-activity-timeline__outcome"], [1, "deal-activity-empty"], [1, "pi", "pi-inbox"], [1, "deal-activity-empty__hint"], ["value", "approval-workflow", 3, "disabled"], ["class", "form-card opportunity-accordion-card", 4, "ngIf"], [1, "approval-current-status"], [1, "approval-current-status__label"], [1, "approval-request"], [1, "approval-request-row"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "approvalPurpose", "placeholder", "Purpose", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["name", "approvalAmount", "mode", "currency", 1, "w-full", 3, "ngModelChange", "ngModel", "currency"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "approvalCurrency", "placeholder", "Currency", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], [1, "form-field", "approval-action"], ["pButton", "", "type", "button", 1, "crm-button--primary", 3, "click", "disabled"], ["class", "helper-text", 4, "ngIf", "ngIfElse"], ["class", "approval-summary-list", 4, "ngIf", "ngIfElse"], ["class", "helper-text muted", 4, "ngIf"], [1, "helper-text", "muted"], [1, "approval-summary-list"], ["class", "approval-summary-item", 4, "ngFor", "ngForOf"], [1, "approval-summary-item"], [1, "approval-meta"], [1, "approval-purpose"], [1, "approval-amount"], [1, "approval-details"], ["class", "approval-notes", 4, "ngIf"], [1, "approval-notes"], ["value", "security-legal", 3, "disabled"], ["for", "oppSecurityStatus"], ["inputId", "oppSecurityStatus", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "securityReviewStatus", "placeholder", "Select status", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "oppLegalStatus"], ["inputId", "oppLegalStatus", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "legalReviewStatus", "placeholder", "Select status", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], [1, "form-field", "full-row", "review-checklist"], [1, "checklist-header"], [1, "checklist-add"], ["pInputText", "", "name", "newSecurityItem", "placeholder", "Add security task", 1, "w-full", 3, "ngModelChange", "ngModel"], ["pButton", "", "type", "button", 1, "btn-glass", "btn-sm", 3, "click"], ["class", "checklist-list", 4, "ngIf", "ngIfElse"], ["pInputText", "", "name", "newLegalItem", "placeholder", "Add legal task", 1, "w-full", 3, "ngModelChange", "ngModel"], ["pInputText", "", "name", "newTechnicalItem", "placeholder", "Add technical risk", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "checklist-list"], ["class", "checklist-item", 4, "ngFor", "ngForOf"], [1, "checklist-item"], ["pInputText", "", 1, "w-full", 3, "ngModelChange", "blur", "ngModel", "name"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "styleClass", "w-full", 3, "ngModelChange", "onChange", "options", "ngModel", "name"], ["pInputText", "", "placeholder", "Notes (optional)", 1, "w-full", 3, "ngModelChange", "blur", "ngModel", "name"], ["class", "checklist-status", 4, "ngIf"], ["class", "checklist-status saved", 4, "ngIf"], [1, "pi", "pi-trash"], [1, "checklist-status"], [1, "checklist-status", "saved"], ["value", "review-thread", 3, "disabled"], [1, "pi", "pi-comments"], ["class", "form-card review-thread-card opportunity-accordion-card", 4, "ngIf"], [1, "form-card", "review-thread-card", "opportunity-accordion-card"], ["class", "review-thread-controls", 4, "ngIf", "ngIfElse"], ["class", "review-thread-list", 4, "ngIf", "ngIfElse"], [1, "review-thread-controls"], ["for", "reviewOutcome"], ["inputId", "reviewOutcome", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "reviewOutcome", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["class", "form-field", 4, "ngIf"], ["for", "reviewComment"], ["id", "reviewComment", "pTextarea", "", "rows", "3", "name", "reviewComment", "placeholder", "Explain what needs to change, or confirm approval.", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "review-actions"], ["pButton", "", "type", "button", 1, "btn-gradient", 3, "click", "disabled"], ["for", "reviewDue"], ["id", "reviewDue", "type", "datetime-local", "name", "reviewAckDueLocal", 1, "review-input", 3, "ngModelChange", "ngModel"], [1, "review-thread-controls", "review-thread-controls--rep"], ["class", "review-actions", 4, "ngIf"], [1, "review-thread-list"], ["class", "review-thread-item", 4, "ngFor", "ngForOf"], [1, "review-thread-item"], [1, "review-thread-item__header"], [1, "review-badge", 3, "ngClass"], [1, "review-outcome"], [1, "review-meta"], ["class", "review-thread-item__comment", 4, "ngIf"], ["class", "review-thread-item__dates", 4, "ngIf"], [1, "review-thread-item__comment"], [1, "review-thread-item__dates"], ["value", "delivery-handoff", 3, "disabled"], ["for", "oppDeliveryOwner"], ["inputId", "oppDeliveryOwner", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "deliveryOwnerId", "placeholder", "Select owner", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "oppDeliveryStatus"], ["inputId", "oppDeliveryStatus", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "deliveryStatus", "placeholder", "Status", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "oppDeliveryScope"], ["pTextarea", "", "id", "oppDeliveryScope", "rows", "3", "name", "deliveryHandoffScope", "placeholder", "Implementation scope and key deliverables", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "oppDeliveryRisks"], ["pTextarea", "", "id", "oppDeliveryRisks", "rows", "3", "name", "deliveryHandoffRisks", "placeholder", "Dependencies, blockers, or risks", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "oppDeliveryTimeline"], ["pTextarea", "", "id", "oppDeliveryTimeline", "rows", "2", "name", "deliveryHandoffTimeline", "placeholder", "Target milestones and timing", 1, "w-full", 3, "ngModelChange", "ngModel"], ["pButton", "", "type", "button", "icon", "pi pi-calendar-plus", "label", "Trigger kickoff", 1, "crm-button", "crm-button--primary", 3, "click", "disabled"], ["value", "onboarding", 3, "disabled"], [1, "pi", "pi-list-check"], [1, "checklist-form"], ["pInputText", "", "type", "text", "name", "newOnboardingChecklistItem", "placeholder", "Add onboarding checklist item", 1, "w-full", 3, "ngModelChange", "ngModel"], ["pInputText", "", "type", "text", "name", "newOnboardingMilestoneItem", "placeholder", "Add onboarding milestone", 1, "w-full", 3, "ngModelChange", "ngModel"], ["pInputText", "", "type", "text", 1, "w-full", 3, "ngModelChange", "blur", "ngModel", "ngModelOptions"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "styleClass", "w-full", 3, "ngModelChange", "onChange", "options", "ngModel", "ngModelOptions"], ["appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "onSelect", "ngModel", "ngModelOptions", "showIcon"], ["pTextarea", "", "rows", "2", "placeholder", "Notes", 1, "w-full", 3, "ngModelChange", "blur", "ngModel", "ngModelOptions"], ["value", "deal-health-score", 3, "disabled"], [1, "pi", "pi-heart"], ["class", "opportunity-accordion-badge opportunity-accordion-badge--info", 4, "ngIf"], [1, "form-card", "opportunity-accordion-card", "deal-health-section"], [1, "deal-health__header"], ["type", "button", 1, "action-btn", "action-btn--refresh", "action-btn--sm", 3, "click", "disabled"], [1, "deal-health__overview"], [1, "deal-health__gauge"], ["viewBox", "0 0 120 120", 1, "deal-health__gauge-svg"], ["cx", "60", "cy", "60", "r", "52", "fill", "none", "stroke", "#e5e7eb", "stroke-width", "8"], ["cx", "60", "cy", "60", "r", "52", "fill", "none", "stroke-width", "8", "stroke-linecap", "round", "transform", "rotate(-90 60 60)", 1, "deal-health__gauge-fill"], ["x", "60", "y", "55", "text-anchor", "middle", 1, "deal-health__gauge-value"], ["x", "60", "y", "72", "text-anchor", "middle", 1, "deal-health__gauge-label"], [1, "deal-health__details"], [1, "deal-health__rationale"], [1, "deal-health__meta"], [1, "deal-health__confidence"], [1, "pi", "pi-verified"], [1, "deal-health__computed"], [1, "deal-health__factors"], [1, "deal-health__factors-title"], ["class", "deal-health__factor", 4, "ngFor", "ngForOf"], [1, "deal-health__factor"], [1, "deal-health__factor-header"], [1, "deal-health__factor-name"], [1, "deal-health__factor-score"], [1, "deal-health__factor-bar"], [1, "deal-health__factor-bar-fill"], [1, "deal-health__empty"], [1, "deal-health__empty-hint"], ["value", "deal-aging", 3, "disabled"], [1, "pi", "pi-stopwatch"], [1, "form-card", "opportunity-accordion-card", "deal-aging"], [1, "deal-aging__header"], [1, "deal-aging__total"], [1, "deal-aging__total-value"], [1, "deal-aging__total-label"], [1, "deal-aging__stage-count"], ["class", "deal-aging__timeline", 4, "ngIf", "ngIfElse"], [1, "deal-aging__timeline"], [1, "deal-aging__bar-container"], ["class", "deal-aging__bar-segment", 3, "flex", "deal-aging__bar-segment--current", "title", 4, "ngFor", "ngForOf"], [1, "deal-aging__stages"], ["class", "deal-aging__stage", 3, "deal-aging__stage--current", 4, "ngFor", "ngForOf"], [1, "deal-aging__bar-segment", 3, "title"], [1, "deal-aging__stage"], [1, "deal-aging__stage-marker"], [1, "deal-aging__stage-dot"], ["class", "deal-aging__stage-line", 4, "ngIf"], [1, "deal-aging__stage-info"], [1, "deal-aging__stage-name"], [1, "deal-aging__stage-duration"], ["class", "deal-aging__stage-badge", 4, "ngIf"], [1, "deal-aging__stage-date"], [1, "deal-aging__stage-line"], [1, "deal-aging__stage-badge"], [1, "deal-aging__empty"], [1, "deal-attachments"], [1, "deal-attachments__upload"], ["mode", "basic", "chooseLabel", "Attach File", "chooseIcon", "pi pi-upload", 3, "uploadHandler", "customUpload", "auto", "disabled"], ["class", "deal-attachments__upload-hint", 4, "ngIf"], ["class", "deal-attachments__loading", 4, "ngIf"], ["styleClass", "p-datatable-sm", 3, "value", "rows", 4, "ngIf"], [1, "deal-attachments__upload-hint"], [1, "pi", "pi-spinner", "pi-spin"], [1, "deal-attachments__loading"], ["styleClass", "p-datatable-sm", 3, "value", "rows"], ["pTemplate", "header"], ["pTemplate", "body"], [2, "width", "100px", "text-align", "center"], [1, "deal-attachment-name"], [1, "deal-attachment-actions"], [1, "row-actions"], ["type", "button", "title", "Download", 1, "row-action-btn", "row-action-btn--view", 3, "click"], [1, "pi", "pi-download"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "deal-attachments__empty"], [1, "pi", "pi-cloud-upload"], [1, "deal-attachments__empty-hint"], [1, "form-card", "opportunity-accordion-card", "decision-review-panel"], [1, "section-title"], ["class", "decision-summary", 4, "ngIf"], ["for", "decisionReviewComment"], ["id", "decisionReviewComment", "pTextarea", "", "rows", "3", "name", "decisionReviewComment", "placeholder", "Explain decision rationale or required changes", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "decision-action-row"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "decisionAction", "placeholder", "Select action", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], [1, "decision-summary"], [1, "decision-summary-grid"], [1, "decision-summary-item"], [1, "decision-summary-label"], [1, "decision-summary-value"], ["class", "decision-summary-item", 4, "ngIf"], [1, "form-card", "opportunity-accordion-card", "approval-history-section"], [1, "approval-history-header"], ["class", "approval-history-list", 4, "ngIf", "ngIfElse"], [1, "approval-history-list"], ["class", "approval-history-item", 4, "ngFor", "ngForOf"], [1, "approval-history-item"], [1, "approval-history-item__header"], [1, "approval-history-meta"], [1, "approval-history-item__details"], ["class", "approval-history-notes", 4, "ngIf"], ["class", "approval-history-policy", 4, "ngIf"], [1, "approval-history-notes"], [1, "approval-history-policy"], [1, "duplicate-dialog__list"], ["class", "duplicate-row", 4, "ngFor", "ngForOf"], [1, "duplicate-row"], [1, "duplicate-row__meta"], [1, "duplicate-row__name"], [1, "duplicate-row__account"], [1, "duplicate-row__stage"], [1, "duplicate-row__signals"], [1, "duplicate-row__score"], [1, "duplicate-row__badge"], ["pButton", "", "type", "button", "label", "Open", 1, "p-button-text", "p-button-sm", 3, "click"], ["pButton", "", "type", "button", "label", "Save Anyway", 1, "crm-button", "crm-button--primary", 3, "click"]], template: function OpportunityFormPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "section", 29)(1, "p-dialog", 30);
            i0.ɵɵlistener("visibleChange", function OpportunityFormPage_Template_p_dialog_visibleChange_1_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.draftPromptVisible.set($event)); })("onHide", function OpportunityFormPage_Template_p_dialog_onHide_1_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.dismissDraftPrompt()); });
            i0.ɵɵelementStart(2, "div", 31)(3, "div", 32)(4, "div", 33);
            i0.ɵɵelement(5, "i", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div")(7, "h3");
            i0.ɵɵtext(8, "Resume a saved opportunity draft?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p");
            i0.ɵɵtext(10, "You have saved deal drafts. Choose one to continue where you left off, or start with a blank form.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(11, OpportunityFormPage_div_11_Template, 2, 1, "div", 35)(12, OpportunityFormPage_ng_template_12_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(14, "div", 36)(15, "button", 37);
            i0.ɵɵlistener("click", function OpportunityFormPage_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.dismissDraftPrompt()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "button", 38);
            i0.ɵɵlistener("click", function OpportunityFormPage_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r1); ctx.dismissDraftPrompt(); return i0.ɵɵresetView(ctx.openDraftLibrary()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(17, "p-dialog", 39);
            i0.ɵɵlistener("visibleChange", function OpportunityFormPage_Template_p_dialog_visibleChange_17_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.draftOpenConfirmVisible.set($event)); })("onHide", function OpportunityFormPage_Template_p_dialog_onHide_17_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelOpenDraft()); });
            i0.ɵɵelementStart(18, "div", 40)(19, "p");
            i0.ɵɵtext(20, "Your current unsaved changes will be replaced by the selected draft.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "div", 36)(22, "button", 41);
            i0.ɵɵlistener("click", function OpportunityFormPage_Template_button_click_22_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelOpenDraft()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "button", 42);
            i0.ɵɵlistener("click", function OpportunityFormPage_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.confirmOpenDraft()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(24, "p-dialog", 43);
            i0.ɵɵlistener("visibleChange", function OpportunityFormPage_Template_p_dialog_visibleChange_24_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.leavePromptVisible.set($event)); })("onHide", function OpportunityFormPage_Template_p_dialog_onHide_24_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.stayOnForm()); });
            i0.ɵɵelementStart(25, "div", 44)(26, "div", 45)(27, "div", 46);
            i0.ɵɵelement(28, "i", 47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div")(30, "h3");
            i0.ɵɵtext(31, "Your deal form has unsaved changes.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "p");
            i0.ɵɵtext(33, "Choose whether to save the current state as a draft, submit the deal now, or leave without saving.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(34, "div", 48)(35, "button", 49);
            i0.ɵɵlistener("click", function OpportunityFormPage_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.stayOnForm()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "button", 50);
            i0.ɵɵlistener("click", function OpportunityFormPage_Template_button_click_36_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.leaveWithoutSaving()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "button", 51);
            i0.ɵɵlistener("click", function OpportunityFormPage_Template_button_click_37_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.saveDraftAndLeave()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "button", 52);
            i0.ɵɵlistener("click", function OpportunityFormPage_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.submitAndLeave()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(39, "p-dialog", 53);
            i0.ɵɵlistener("visibleChange", function OpportunityFormPage_Template_p_dialog_visibleChange_39_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.draftLibraryVisible.set($event)); })("onHide", function OpportunityFormPage_Template_p_dialog_onHide_39_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeDraftLibrary()); });
            i0.ɵɵelementStart(40, "div", 40);
            i0.ɵɵtemplate(41, OpportunityFormPage_p_41_Template, 2, 0, "p", 54)(42, OpportunityFormPage_div_42_Template, 2, 1, "div", 55);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(43, "div", 56)(44, "div", 57);
            i0.ɵɵelement(45, "app-breadcrumbs");
            i0.ɵɵelementStart(46, "button", 58);
            i0.ɵɵelement(47, "i", 59);
            i0.ɵɵtext(48, " Back to Deals ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "div", 60)(50, "div", 61)(51, "h1", 62)(52, "span", 63);
            i0.ɵɵtext(53);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "span", 64);
            i0.ɵɵtext(55, "Deal");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "p");
            i0.ɵɵtext(57, "Capture the deal details, set your stage, and keep the team aligned on next steps.");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(58, OpportunityFormPage_div_58_Template, 13, 13, "div", 65)(59, OpportunityFormPage_div_59_Template, 4, 1, "div", 66)(60, OpportunityFormPage_div_60_Template, 4, 0, "div", 67)(61, OpportunityFormPage_div_61_Template, 4, 1, "div", 68)(62, OpportunityFormPage_div_62_Template, 4, 1, "div", 69);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 70)(64, "span", 71);
            i0.ɵɵelement(65, "i", 72);
            i0.ɵɵtext(66);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "span", 71);
            i0.ɵɵelement(68, "i", 73);
            i0.ɵɵtext(69);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "span", 71);
            i0.ɵɵelement(71, "i", 74);
            i0.ɵɵtext(72);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵtemplate(73, OpportunityFormPage_div_73_Template, 8, 2, "div", 75)(74, OpportunityFormPage_section_74_Template, 7, 0, "section", 76)(75, OpportunityFormPage_section_75_Template, 7, 0, "section", 77)(76, OpportunityFormPage_section_76_Template, 6, 2, "section", 78);
            i0.ɵɵelementStart(77, "div", 79)(78, "section", 80)(79, "div", 81)(80, "div", 82);
            i0.ɵɵelement(81, "i", 83);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(82, "div", 84)(83, "span", 85);
            i0.ɵɵtext(84, "Deal");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(85, "strong", 86);
            i0.ɵɵtext(86);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(87, "div", 87)(88, "div", 82);
            i0.ɵɵelement(89, "i", 72);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "div", 84)(91, "span", 85);
            i0.ɵɵtext(92, "Stage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(93, "strong", 86);
            i0.ɵɵtext(94);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(95, "div", 88)(96, "div", 82);
            i0.ɵɵelement(97, "i", 74);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(98, "div", 84)(99, "span", 85);
            i0.ɵɵtext(100, "Amount");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "strong", 86);
            i0.ɵɵtext(102);
            i0.ɵɵpipe(103, "currency");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(104, "div", 89)(105, "div", 82);
            i0.ɵɵelement(106, "i", 90);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(107, "div", 84)(108, "span", 85);
            i0.ɵɵtext(109, "Owner");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(110, "strong", 86);
            i0.ɵɵtext(111);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(112, "div", 91)(113, "div", 82);
            i0.ɵɵelement(114, "i", 92);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(115, "div", 84)(116, "span", 85);
            i0.ɵɵtext(117, "Risk");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(118, "span", 93);
            i0.ɵɵtext(119);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(120, "div", 94)(121, "div", 82);
            i0.ɵɵelement(122, "i", 95);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(123, "div", 84)(124, "span", 85);
            i0.ɵɵtext(125, "Approval");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(126, "span", 93);
            i0.ɵɵtext(127);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(128, "form", 96);
            i0.ɵɵlistener("ngSubmit", function OpportunityFormPage_Template_form_ngSubmit_128_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSave()); });
            i0.ɵɵelementStart(129, "fieldset", 97)(130, "p-tabs", 98);
            i0.ɵɵlistener("valueChange", function OpportunityFormPage_Template_p_tabs_valueChange_130_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onActiveTabChange($event)); });
            i0.ɵɵelementStart(131, "p-tablist", 99);
            i0.ɵɵrepeaterCreate(132, OpportunityFormPage_For_133_Template, 1, 1, null, null, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(134, "p-tabpanels")(135, "p-tabpanel", 100)(136, "p-accordion", 101);
            i0.ɵɵlistener("valueChange", function OpportunityFormPage_Template_p_accordion_valueChange_136_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTabAccordionChange("core", $event)); });
            i0.ɵɵelementStart(137, "p-accordion-panel", 102)(138, "p-accordion-header")(139, "div", 103)(140, "span", 104);
            i0.ɵɵelement(141, "i", 83);
            i0.ɵɵtext(142, " Deal Details ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(143, "span", 105)(144, "span", 106);
            i0.ɵɵtext(145);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(146, "span", 106);
            i0.ɵɵtext(147);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(148, "p-accordion-content")(149, "section", 107)(150, "div", 108)(151, "div", 109)(152, "label", 110);
            i0.ɵɵtext(153, "Deal name ");
            i0.ɵɵelementStart(154, "span", 111);
            i0.ɵɵtext(155, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(156, "p-inputgroup")(157, "p-inputgroup-addon", 112);
            i0.ɵɵelement(158, "i", 113);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(159, "input", 114);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_input_ngModelChange_159_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.name, $event) || (ctx.form.name = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(160, OpportunityFormPage_p_160_Template, 2, 1, "p", 115);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(161, "div", 109)(162, "label", 116);
            i0.ɵɵtext(163, "Account");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(164, "p-select", 117);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_p_select_ngModelChange_164_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.accountId, $event) || (ctx.form.accountId = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(165, "div", 109)(166, "label", 118);
            i0.ɵɵtext(167, "Stage *");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(168, "p-select", 119);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_p_select_ngModelChange_168_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.selectedStage, $event) || (ctx.selectedStage = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_Template_p_select_ngModelChange_168_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onStageChange($event)); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(169, OpportunityFormPage_small_169_Template, 2, 1, "small", 120)(170, OpportunityFormPage_small_170_Template, 2, 1, "small", 120)(171, OpportunityFormPage_small_171_Template, 2, 1, "small", 120)(172, OpportunityFormPage_small_172_Template, 2, 1, "small", 120)(173, OpportunityFormPage_small_173_Template, 2, 0, "small", 120);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(174, "div", 109)(175, "label", 121);
            i0.ɵɵtext(176, "Expected close");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(177, "p-datePicker", 122);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_p_datePicker_ngModelChange_177_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.expectedCloseDate, $event) || (ctx.form.expectedCloseDate = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(178, "p-accordion-panel", 123)(179, "p-accordion-header")(180, "div", 103)(181, "span", 104);
            i0.ɵɵelement(182, "i", 124);
            i0.ɵɵtext(183, " Deal Settings ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(184, "span", 105)(185, "span", 106);
            i0.ɵɵtext(186);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(187, "span", 106);
            i0.ɵɵtext(188);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(189, "p-accordion-content")(190, "section", 107)(191, "div", 108)(192, "div", 109)(193, "div", 125)(194, "label", 126);
            i0.ɵɵtext(195, "Amount");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(196, "span", 127);
            i0.ɵɵtext(197);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(198, "p-inputNumber", 128);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_p_inputNumber_ngModelChange_198_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.amount, $event) || (ctx.form.amount = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_Template_p_inputNumber_ngModelChange_198_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.syncApprovalAmount()); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(199, OpportunityFormPage_small_199_Template, 2, 1, "small", 120);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(200, "div", 109)(201, "label", 129);
            i0.ɵɵtext(202, "Currency");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(203, "p-select", 130);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_p_select_ngModelChange_203_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.currency, $event) || (ctx.form.currency = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_Template_p_select_ngModelChange_203_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onCurrencyChange($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(204, "div", 109)(205, "label", 131);
            i0.ɵɵtext(206, "Probability (%)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(207, "p-inputNumber", 132);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_p_inputNumber_ngModelChange_207_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.probability, $event) || (ctx.form.probability = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(208, "div", 109)(209, "label", 133);
            i0.ɵɵtext(210, "Forecast category");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(211, "p-select", 134);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_p_select_ngModelChange_211_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.forecastCategory, $event) || (ctx.form.forecastCategory = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(212, OpportunityFormPage_small_212_Template, 2, 1, "small", 120);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(213, "div", 109)(214, "label", 135);
            i0.ɵɵtext(215, "Deal type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(216, "p-select", 136);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_p_select_ngModelChange_216_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.opportunityType, $event) || (ctx.form.opportunityType = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(217, "div", 109)(218, "label", 137);
            i0.ɵɵtext(219, "Contract start");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(220, "p-datePicker", 138);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_p_datePicker_ngModelChange_220_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.contractStartDateUtc, $event) || (ctx.form.contractStartDateUtc = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(221, "div", 109)(222, "label", 139);
            i0.ɵɵtext(223, "Contract end");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(224, "p-datePicker", 140);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_p_datePicker_ngModelChange_224_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.contractEndDateUtc, $event) || (ctx.form.contractEndDateUtc = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(225, "div", 109)(226, "label", 141);
            i0.ɵɵtext(227, "Win/Loss reason");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(228, "p-inputgroup")(229, "p-inputgroup-addon", 142);
            i0.ɵɵelement(230, "i", 143);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(231, "input", 144);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_input_ngModelChange_231_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.winLossReason, $event) || (ctx.form.winLossReason = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(232, "div", 145)(233, "label", 146);
            i0.ɵɵtext(234, "Summary");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(235, "textarea", 147);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_textarea_ngModelChange_235_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.summary, $event) || (ctx.form.summary = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(236, OpportunityFormPage_small_236_Template, 2, 0, "small", 120);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(237, "div", 145)(238, "label");
            i0.ɵɵtext(239, "Requirements ");
            i0.ɵɵtemplate(240, OpportunityFormPage_span_240_Template, 2, 0, "span", 148);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(241, "textarea", 149);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_textarea_ngModelChange_241_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.requirements, $event) || (ctx.form.requirements = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(242, "div", 145)(243, "label");
            i0.ɵɵtext(244, "Buying process ");
            i0.ɵɵtemplate(245, OpportunityFormPage_span_245_Template, 2, 0, "span", 148);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(246, "textarea", 150);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_textarea_ngModelChange_246_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.buyingProcess, $event) || (ctx.form.buyingProcess = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(247, "div", 145)(248, "label");
            i0.ɵɵtext(249, "Success criteria ");
            i0.ɵɵtemplate(250, OpportunityFormPage_span_250_Template, 2, 0, "span", 148);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(251, "textarea", 151);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_textarea_ngModelChange_251_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.successCriteria, $event) || (ctx.form.successCriteria = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()()()()()()();
            i0.ɵɵelementStart(252, "p-tabpanel", 152)(253, "p-accordion", 101);
            i0.ɵɵlistener("valueChange", function OpportunityFormPage_Template_p_accordion_valueChange_253_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTabAccordionChange("commercial", $event)); });
            i0.ɵɵelementStart(254, "p-accordion-panel", 153)(255, "p-accordion-header")(256, "div", 103)(257, "span", 104);
            i0.ɵɵelement(258, "i", 73);
            i0.ɵɵtext(259, " Pricing & Discounts ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(260, "span", 105)(261, "span", 106);
            i0.ɵɵtext(262);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(263, "span", 106);
            i0.ɵɵtext(264);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(265, "p-accordion-content")(266, "section", 107)(267, "div", 108)(268, "div", 109)(269, "div", 125)(270, "label", 154);
            i0.ɵɵtext(271, "Discount (%)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(272, "span", 127);
            i0.ɵɵtext(273);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(274, "p-inputNumber", 155);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_p_inputNumber_ngModelChange_274_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.discountPercent, $event) || (ctx.form.discountPercent = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(275, OpportunityFormPage_small_275_Template, 2, 1, "small", 120);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(276, "div", 109)(277, "label", 156);
            i0.ɵɵtext(278, "Discount Amount");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(279, "p-inputNumber", 157);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_p_inputNumber_ngModelChange_279_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.discountAmount, $event) || (ctx.form.discountAmount = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("ngModelChange", function OpportunityFormPage_Template_p_inputNumber_ngModelChange_279_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.syncApprovalAmount()); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(280, "div", 145)(281, "label", 158);
            i0.ɵɵtext(282, "Pricing notes & objections");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(283, "textarea", 159);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityFormPage_Template_textarea_ngModelChange_283_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.pricingNotes, $event) || (ctx.form.pricingNotes = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵtemplate(284, OpportunityFormPage_p_accordion_panel_284_Template, 112, 58, "p-accordion-panel", 160);
            i0.ɵɵelementStart(285, "p-accordion-panel", 161)(286, "p-accordion-header")(287, "div", 103)(288, "span", 104);
            i0.ɵɵelement(289, "i", 162);
            i0.ɵɵtext(290, " Revenue Forecast ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(291, "span", 105)(292, "span", 163);
            i0.ɵɵtext(293);
            i0.ɵɵpipe(294, "currency");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(295, "p-accordion-content")(296, "section", 164);
            i0.ɵɵtemplate(297, OpportunityFormPage_div_297_Template, 28, 22, "div", 165)(298, OpportunityFormPage_ng_template_298_Template, 4, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(300, "p-tabpanel", 166)(301, "p-accordion", 101);
            i0.ɵɵlistener("valueChange", function OpportunityFormPage_Template_p_accordion_valueChange_301_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTabAccordionChange("people", $event)); });
            i0.ɵɵtemplate(302, OpportunityFormPage_p_accordion_panel_302_Template, 15, 8, "p-accordion-panel", 167)(303, OpportunityFormPage_p_accordion_panel_303_Template, 15, 9, "p-accordion-panel", 168);
            i0.ɵɵelementStart(304, "p-accordion-panel", 169)(305, "p-accordion-header")(306, "div", 103)(307, "span", 104);
            i0.ɵɵelement(308, "i", 170);
            i0.ɵɵtext(309, " Deal Activity Timeline ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(310, "span", 105)(311, "span", 163);
            i0.ɵɵtext(312);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(313, "p-accordion-content")(314, "section", 171);
            i0.ɵɵtemplate(315, OpportunityFormPage_div_315_Template, 14, 3, "div", 172)(316, OpportunityFormPage_div_316_Template, 4, 0, "div", 173);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(317, "p-tabpanel", 174)(318, "p-accordion", 101);
            i0.ɵɵlistener("valueChange", function OpportunityFormPage_Template_p_accordion_valueChange_318_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTabAccordionChange("compliance", $event)); });
            i0.ɵɵtemplate(319, OpportunityFormPage_p_accordion_panel_319_Template, 15, 10, "p-accordion-panel", 175)(320, OpportunityFormPage_p_accordion_panel_320_Template, 15, 8, "p-accordion-panel", 176)(321, OpportunityFormPage_p_accordion_panel_321_Template, 15, 10, "p-accordion-panel", 177);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(322, "p-tabpanel", 178)(323, "p-accordion", 101);
            i0.ɵɵlistener("valueChange", function OpportunityFormPage_Template_p_accordion_valueChange_323_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onTabAccordionChange("delivery", $event)); });
            i0.ɵɵtemplate(324, OpportunityFormPage_p_accordion_panel_324_Template, 38, 14, "p-accordion-panel", 179)(325, OpportunityFormPage_p_accordion_panel_325_Template, 15, 8, "p-accordion-panel", 180)(326, OpportunityFormPage_p_accordion_panel_326_Template, 14, 8, "p-accordion-panel", 181)(327, OpportunityFormPage_p_accordion_panel_327_Template, 13, 7, "p-accordion-panel", 182);
            i0.ɵɵelementStart(328, "p-accordion-panel", 183)(329, "p-accordion-header")(330, "div", 103)(331, "span", 104);
            i0.ɵɵelement(332, "i", 184);
            i0.ɵɵtext(333, " File Attachments ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(334, "span", 105)(335, "span", 163);
            i0.ɵɵtext(336);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(337, "p-accordion-content")(338, "section", 185);
            i0.ɵɵtemplate(339, OpportunityFormPage_div_339_Template, 7, 7, "div", 186)(340, OpportunityFormPage_div_340_Template, 4, 0, "div", 187);
            i0.ɵɵelementEnd()()()()()()()();
            i0.ɵɵtemplate(341, OpportunityFormPage_section_341_Template, 15, 6, "section", 188)(342, OpportunityFormPage_section_342_Template, 9, 3, "section", 189);
            i0.ɵɵelementStart(343, "div", 190)(344, "button", 191);
            i0.ɵɵlistener("click", function OpportunityFormPage_Template_button_click_344_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.router.navigate(["/app/deals"])); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(345, "button", 192);
            i0.ɵɵlistener("click", function OpportunityFormPage_Template_button_click_345_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSave()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(346, "p-splitbutton", 193);
            i0.ɵɵlistener("onClick", function OpportunityFormPage_Template_p_splitbutton_onClick_346_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.saveDraft()); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(347, "p-dialog", 194);
            i0.ɵɵlistener("visibleChange", function OpportunityFormPage_Template_p_dialog_visibleChange_347_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.duplicateDialogVisible.set($event)); })("onHide", function OpportunityFormPage_Template_p_dialog_onHide_347_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.dismissDuplicateDialog()); });
            i0.ɵɵelementStart(348, "div", 195)(349, "p", 196);
            i0.ɵɵtext(350);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(351, OpportunityFormPage_div_351_Template, 2, 1, "div", 197)(352, OpportunityFormPage_ng_template_352_Template, 2, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(354, "div", 198)(355, "button", 41);
            i0.ɵɵlistener("click", function OpportunityFormPage_Template_button_click_355_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.dismissDuplicateDialog()); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(356, OpportunityFormPage_button_356_Template, 1, 0, "button", 199);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            const noOpportunityPromptDrafts_r95 = i0.ɵɵreference(13);
            const noForecastData_r96 = i0.ɵɵreference(299);
            const noDuplicateMatches_r97 = i0.ɵɵreference(353);
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(213, _c0));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.draftPromptVisible());
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", ctx.recentDrafts().length)("ngIfElse", noOpportunityPromptDrafts_r95);
            i0.ɵɵadvance(6);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(214, _c1));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.draftOpenConfirmVisible());
            i0.ɵɵadvance(7);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(215, _c2));
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
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(216, _c3));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.draftLibraryVisible());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.draftLibraryLoading() && !ctx.draftLibraryItems().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.draftLibraryItems().length);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Update" : "Create");
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.draftStatusMessage());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.draftModeActive());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode() && ctx.visiblePresenceUsers().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode() && ctx.activeEditors().length);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate1(" ", ctx.selectedStage || "Prospecting", " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.form.probability ?? 0, "% ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.form.currency || ctx.resolveCurrencyCode(), " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.policyGateMessage());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.decisionReviewMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.requesterApprovalLocked() && !ctx.decisionReviewMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance(10);
            i0.ɵɵtextInterpolate(ctx.form.name || "Untitled deal");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.selectedStage || "Prospecting");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(i0.ɵɵpipeBind4(103, 203, ctx.form.amount || 0, ctx.resolveCurrencyCode(), "symbol", "1.0-0"));
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.dealOwnerLabel());
            i0.ɵɵadvance(7);
            i0.ɵɵclassMap("opportunity-accordion-badge metric-card__status-badge opportunity-accordion-badge--" + ctx.dealRiskSummary().tone);
            i0.ɵɵproperty("title", ctx.dealRiskSummary().detail || "");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.dealRiskSummary().label, " ");
            i0.ɵɵadvance(7);
            i0.ɵɵclassMap("opportunity-accordion-badge metric-card__status-badge opportunity-accordion-badge--" + ctx.currentApprovalStatusTone());
            i0.ɵɵproperty("title", ctx.approvalPendingSummaryDetail());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.requesterApprovalLocked() ? "Approval Pending" : ctx.currentApprovalStatusLabel(), " ");
            i0.ɵɵadvance();
            i0.ɵɵclassProp("form-layout--read-only", ctx.decisionReviewMode() || ctx.requesterApprovalLocked());
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.decisionReviewMode() || ctx.requesterApprovalLocked());
            i0.ɵɵattribute("aria-busy", ctx.decisionReviewMode() || ctx.requesterApprovalLocked());
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.activeTab());
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.tabOrder);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("multiple", true)("value", ctx.tabSectionPanels("core"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.isSectionLocked("opportunity-details"));
            i0.ɵɵattribute("data-deal-section", "opportunity-details");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.opportunityDetailsBadge());
            i0.ɵɵadvance();
            i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx.sectionStatusTone("opportunity-details"));
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.sectionStatusLabel("opportunity-details"), " ");
            i0.ɵɵadvance(12);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.name);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.dealNameError());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.accountOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.accountId);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.stageOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.selectedStage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.stageRequirementHint());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.demoOutcomeGuidance());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.discoveryGuidance());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.decisionMakerGuidance());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedStage === "Commit");
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.expectedCloseDate);
            i0.ɵɵproperty("showIcon", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.isSectionLocked("deal-settings"));
            i0.ɵɵattribute("data-deal-section", "deal-settings");
            i0.ɵɵadvance(7);
            i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx.amountApprovalBadge().tone);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.dealSettingsHeaderBadge(), " ");
            i0.ɵɵadvance();
            i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx.sectionStatusTone("deal-settings"));
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.sectionStatusLabel("deal-settings"), " ");
            i0.ɵɵadvance(8);
            i0.ɵɵclassMap("approval-requirement-badge approval-requirement-badge--" + ctx.amountApprovalBadge().tone);
            i0.ɵɵproperty("title", ctx.amountApprovalBadge().detail || "");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.amountApprovalBadge().label, " ");
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.amount);
            i0.ɵɵproperty("currency", ctx.resolveCurrency(ctx.form.currency));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.amountApprovalBadge().detail);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.currencyOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.currency);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.probability);
            i0.ɵɵproperty("min", 0)("max", 100);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.forecastCategoryOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.forecastCategory);
            i0.ɵɵproperty("disabled", ctx.isForecastLocked());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.forecastGuidance());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.opportunityTypeOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.opportunityType);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.contractStartDateUtc);
            i0.ɵɵproperty("showIcon", true);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.contractEndDateUtc);
            i0.ɵɵproperty("showIcon", true);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.winLossReason);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.summary);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isPainConfirmationRequired());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.isQualificationFitRequired());
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.requirements);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.isQualificationFitRequired());
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.buyingProcess);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.isQualificationFitRequired());
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.successCriteria);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("multiple", true)("value", ctx.tabSectionPanels("commercial"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.isSectionLocked("pricing-discounts"));
            i0.ɵɵattribute("data-deal-section", "pricing-discounts");
            i0.ɵɵadvance(7);
            i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx.discountApprovalBadge().tone);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.pricingHeaderBadge(), " ");
            i0.ɵɵadvance();
            i0.ɵɵclassMap("opportunity-accordion-badge opportunity-accordion-badge--" + ctx.sectionStatusTone("pricing-discounts"));
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.sectionStatusLabel("pricing-discounts"), " ");
            i0.ɵɵadvance(8);
            i0.ɵɵclassMap("approval-requirement-badge approval-requirement-badge--" + ctx.discountApprovalBadge().tone);
            i0.ɵɵproperty("title", ctx.discountApprovalBadge().detail || "");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.discountApprovalBadge().label, " ");
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.discountPercent);
            i0.ɵɵproperty("min", 0)("max", 100);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.discountApprovalBadge().detail);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.discountAmount);
            i0.ɵɵproperty("currency", ctx.resolveCurrency(ctx.form.currency));
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.pricingNotes);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSectionVisible("quote-proposal"));
            i0.ɵɵadvance();
            i0.ɵɵattribute("data-deal-section", "revenue-forecast");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind4(294, 208, ctx.forecastMetrics().weightedValue, ctx.form.currency, "symbol", "1.0-0"), " ");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", (ctx.form.amount ?? 0) > 0)("ngIfElse", noForecastData_r96);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("multiple", true)("value", ctx.tabSectionPanels("people"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSectionVisible("pre-sales-team"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSectionVisible("deal-stakeholders"));
            i0.ɵɵadvance();
            i0.ɵɵattribute("data-deal-section", "deal-activity");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate1(" ", ctx.recentDealActivities().length, " activities ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isEditMode());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("multiple", true)("value", ctx.tabSectionPanels("compliance"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSectionVisible("approval-workflow"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSectionVisible("security-legal"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSectionVisible("review-thread"));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("multiple", true)("value", ctx.tabSectionPanels("delivery"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSectionVisible("delivery-handoff"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSectionVisible("onboarding"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSectionVisible("deal-health-score"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isSectionVisible("deal-aging"));
            i0.ɵɵadvance();
            i0.ɵɵattribute("data-deal-section", "deal-attachments");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate2(" ", ctx.dealAttachments().length, " file", ctx.dealAttachments().length !== 1 ? "s" : "", " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isEditMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.decisionReviewMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.decisionReviewMode());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("label", ctx.primarySaveLabel())("disabled", ctx.saving() || ctx.draftSaving() || ctx.decisionReviewMode() || ctx.requesterApprovalLocked());
            i0.ɵɵadvance();
            i0.ɵɵproperty("label", ctx.draftButtonLabel())("disabled", ctx.saving() || ctx.draftSaving() || ctx.decisionReviewMode() || ctx.requesterApprovalLocked())("model", ctx.draftSplitButtonItems());
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(217, _c4));
            i0.ɵɵproperty("header", ctx.duplicateDialogTitle())("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.duplicateDialogVisible());
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.duplicateDialogMessage());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.duplicateMatches().length)("ngIfElse", noDuplicateMatches_r97);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", !ctx.duplicateIsBlocked());
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, FormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.CheckboxControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.RequiredValidator, i2.NgModel, i2.NgForm, RouterModule, i3.RouterLink, ButtonModule, i4.ButtonDirective, i5.PrimeTemplate, InputTextModule, i6.InputText, InputNumberModule, i7.InputNumber, TextareaModule, i8.Textarea, SelectModule, i9.Select, DatePickerModule, i10.DatePicker, AccordionModule, i11.Accordion, i11.AccordionPanel, i11.AccordionHeader, i11.AccordionContent, TabsModule, i12.Tabs, i12.TabPanels, i12.TabPanel, i12.TabList, i12.Tab, DialogModule, i13.Dialog, TableModule, i14.Table, FileUploadModule, i15.FileUpload, ChartModule, i16.UIChart, InputGroupModule, i17.InputGroup, InputGroupAddonModule, i18.InputGroupAddon, KnobModule, i19.Knob, SplitButtonModule, i20.SplitButton, BreadcrumbsComponent, i1.DecimalPipe, i1.TitleCasePipe, i1.CurrencyPipe, i1.DatePipe], styles: ["@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n[_nghost-%COMP%] {\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.opportunity-form-page[_ngcontent-%COMP%] {\n  @include form.form-page-base;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.form-header[_ngcontent-%COMP%] {\n  @include form.form-page-header;\n  position: relative;\n  top: auto;\n  overflow: visible;\n}\n\n.header-content[_ngcontent-%COMP%] {\n  @include form.form-header-content;\n}\n\n.back-link[_ngcontent-%COMP%] {\n  @include form.form-back-link;\n}\n\n.header-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n\n.header-title[_ngcontent-%COMP%] {\n  @include form.form-header-title;\n}\n\n.deal-header-progress[_ngcontent-%COMP%] {\n  --deal-header-score-color: #2563eb;\n  display: flex;\n  align-items: center;\n  gap: 0.9rem;\n  margin-top: 1rem;\n  padding: 0.78rem 0.9rem;\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  background:\n    radial-gradient(circle at 8% 15%, rgba(59, 130, 246, 0.14), transparent 42%),\n    radial-gradient(circle at 90% 18%, rgba(16, 185, 129, 0.11), transparent 36%),\n    linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0.68));\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.54),\n    0 14px 26px rgba(15, 23, 42, 0.08);\n  backdrop-filter: blur(12px) saturate(124%);\n  -webkit-backdrop-filter: blur(12px) saturate(124%);\n  max-width: 34rem;\n}\n\n.deal-header-progress__dial[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 96px;\n  height: 96px;\n  border-radius: 20px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(241, 245, 249, 0.7));\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.54),\n    0 10px 18px rgba(15, 23, 42, 0.05);\n}\n\n[_nghost-%COMP%]     .deal-header-progress__knob {\n  width: 92px;\n}\n\n[_nghost-%COMP%]     .deal-header-progress__knob .p-knob-text {\n  font-size: 1rem;\n  font-weight: 800;\n  fill: #1e293b;\n}\n\n.deal-header-progress__content[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: grid;\n  gap: 0.22rem;\n  align-content: center;\n}\n\n.deal-header-progress__eyebrow[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n\n.deal-header-progress__meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n\n.deal-header-progress__status[_ngcontent-%COMP%], \n.deal-header-progress__step[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 1.8rem;\n  padding: 0.2rem 0.55rem;\n  border-radius: 999px;\n  font-size: 0.76rem;\n  font-weight: 700;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.72);\n  color: #1e293b;\n}\n\n.deal-header-progress__status[_ngcontent-%COMP%] {\n  color: #0f766e;\n  background: rgba(204, 251, 241, 0.82);\n  border-color: rgba(45, 212, 191, 0.28);\n}\n\n.deal-header-progress__copy[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #475569;\n  font-size: 0.82rem;\n  line-height: 1.5;\n  max-width: 28rem;\n}\n\n.header-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n\n.presence-strip[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n\n.presence-focus[_ngcontent-%COMP%] {\n  margin-top: 0.55rem;\n  display: inline-flex;\n  position: relative;\n  align-items: center;\n  gap: 0.45rem;\n  border-radius: 0.75rem;\n  padding: 0.4rem 0.7rem;\n  font-size: 0.8rem;\n  font-weight: 700;\n  border: 1px solid rgba(14, 165, 233, 0.22);\n  color: #0c4a6e;\n  background: linear-gradient(135deg, rgba(224, 242, 254, 0.95), rgba(186, 230, 253, 0.92));\n  box-shadow: 0 8px 18px rgba(2, 132, 199, 0.18), 0 0 0 1px rgba(125, 211, 252, 0.28) inset;\n  -webkit-user-select: none;\n  user-select: none;\n  caret-color: transparent;\n  cursor: default;\n\n  &::selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  &::-moz-selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  // Glowing comet that orbits OUTSIDE the chip border\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 2rem;\n    height: 2px;\n    border-radius: 999px;\n    background: linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.6) 15%,\n      rgba(255, 255, 255, 1) 50%,\n      rgba(255, 255, 255, 0.6) 85%,\n      transparent 100%\n    );\n    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1))\n            drop-shadow(0 0 5px rgba(186, 230, 253, 0.9))\n            drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))\n            drop-shadow(0 0 18px rgba(14, 165, 233, 0.35));\n    offset-path: inset(0px round 0.75rem);\n    offset-distance: 0%;\n    offset-rotate: auto;\n    animation: _ngcontent-%COMP%_presence-border-tail 3.5s linear infinite;\n    will-change: offset-distance;\n    pointer-events: none;\n    z-index: 3;\n  }\n\n  > * {\n    position: relative;\n    z-index: 1;\n  }\n\n  i {\n    color: #0284c7;\n    font-size: 0.85rem;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_presence-border-tail {\n  from { offset-distance: 0%; }\n  to   { offset-distance: 100%; }\n}\n\n.presence-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #64748b;\n  font-weight: 600;\n}\n\n.presence-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #0f172a;\n  border: 1px solid rgba(14, 165, 233, 0.32);\n  background: rgba(224, 242, 254, 0.8);\n}\n\n.presence-editing-note[_ngcontent-%COMP%] {\n  margin-top: 0.45rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  border: 1px solid rgba(251, 146, 60, 0.45);\n  background: linear-gradient(135deg, rgba(255, 247, 237, 0.98), rgba(254, 215, 170, 0.85));\n  color: #9a3412;\n  border-radius: 0.65rem;\n  padding: 0.35rem 0.65rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  box-shadow: 0 8px 18px rgba(251, 146, 60, 0.18), 0 0 0 1px rgba(254, 215, 170, 0.32) inset;\n}\n\n.meta-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n\n  i {\n    color: #0ea5e9;\n  }\n}\n\n.policy-gate-banner[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  width: min(1400px, calc(100% - 3rem));\n  margin: 0 auto;\n  padding: 0.85rem 1rem;\n  border-radius: 14px;\n  background: rgba(255, 247, 237, 0.9);\n  border: 1px solid rgba(251, 146, 60, 0.35);\n  color: #7c2d12;\n  display: flex;\n  gap: 0.75rem;\n  align-items: flex-start;\n  box-shadow: 0 10px 24px rgba(124, 45, 18, 0.08);\n\n  i {\n    color: #f97316;\n    margin-top: 0.2rem;\n  }\n\n  strong {\n    display: block;\n    font-size: 0.95rem;\n    margin-bottom: 0.15rem;\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.9rem;\n    line-height: 1.4;\n  }\n\n  .policy-gate-actions {\n    margin-left: auto;\n    align-self: center;\n  }\n\n  .policy-gate-action-button.p-button {\n    border-radius: 999px;\n    padding: 0.45rem 0.8rem;\n    background: linear-gradient(135deg, rgba(37, 99, 235, 0.95), rgba(99, 102, 241, 0.92)) !important;\n    border: 1px solid rgba(191, 219, 254, 0.75) !important;\n    color: #fff !important;\n    box-shadow: 0 10px 22px rgba(37, 99, 235, 0.22);\n    font-weight: 600;\n  }\n}\n\n.decision-review-banner[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  width: min(1400px, calc(100% - 3rem));\n  margin: 0 auto;\n  padding: 0.85rem 1rem;\n  border-radius: 14px;\n  background: rgba(224, 242, 254, 0.72);\n  border: 1px solid rgba(14, 116, 144, 0.25);\n  color: rgba(12, 74, 110, 0.95);\n  display: flex;\n  gap: 0.75rem;\n  align-items: flex-start;\n  box-shadow: 0 10px 24px rgba(12, 74, 110, 0.08);\n\n  i {\n    color: #0284c7;\n    margin-top: 0.2rem;\n  }\n\n  strong {\n    display: block;\n    font-size: 0.95rem;\n    margin-bottom: 0.1rem;\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.9rem;\n    line-height: 1.4;\n  }\n}\n\n.approval-lock-banner[_ngcontent-%COMP%] {\n  background: rgba(254, 242, 242, 0.8);\n  border-color: rgba(239, 68, 68, 0.28);\n  color: rgba(127, 29, 29, 0.95);\n\n  i {\n    color: #dc2626;\n  }\n}\n\n.form-body[_ngcontent-%COMP%] {\n  @include form.form-container;\n}\n\n.deal-sticky-summary[_ngcontent-%COMP%] {\n  position: relative;\n  top: auto;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 0.6rem;\n  margin-bottom: 0.9rem;\n  padding: 0.65rem;\n  border-radius: 14px;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(248, 250, 252, 0.8)),\n    linear-gradient(135deg, rgba(59, 130, 246, 0.09), rgba(14, 165, 233, 0.08));\n  box-shadow:\n    0 10px 24px rgba(15, 23, 42, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.72);\n  backdrop-filter: blur(10px);\n}\n\n.deal-sticky-summary[_ngcontent-%COMP%]   .metric-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  min-width: 0;\n  min-height: 92px;\n  transition: all $transition-base;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 6 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-lg;\n    color: white;\n    flex-shrink: 0;\n    transition: transform $transition-spring;\n  }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n  }\n\n  .metric-value {\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-800;\n    min-width: 0;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    line-height: 1.2;\n  }\n}\n\n.deal-sticky-summary[_ngcontent-%COMP%]   .metric-card--total[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%], \n.deal-sticky-summary[_ngcontent-%COMP%]   .metric-card--leads[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%], \n.deal-sticky-summary[_ngcontent-%COMP%]   .metric-card--customers[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%] {\n  white-space: normal;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  overflow: hidden;\n}\n\n.deal-sticky-summary[_ngcontent-%COMP%]   .metric-card--total[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] { background: $primary-gradient; }\n.deal-sticky-summary[_ngcontent-%COMP%]   .metric-card--leads[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] { background: $cyan-gradient; }\n.deal-sticky-summary[_ngcontent-%COMP%]   .metric-card--prospects[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n.deal-sticky-summary[_ngcontent-%COMP%]   .metric-card--customers[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] { background: $success-gradient; }\n.deal-sticky-summary[_ngcontent-%COMP%]   .metric-card--risk[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] { background: $orange-gradient; }\n.deal-sticky-summary[_ngcontent-%COMP%]   .metric-card--approval[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] { background: linear-gradient(135deg, #ef4444 0%, #f43f5e 100%); }\n\n.deal-sticky-summary[_ngcontent-%COMP%]   .metric-card--risk[_ngcontent-%COMP%], \n.deal-sticky-summary[_ngcontent-%COMP%]   .metric-card--approval[_ngcontent-%COMP%] {\n  align-items: center;\n}\n\n.deal-sticky-summary[_ngcontent-%COMP%]   .metric-card__status-badge[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  align-self: flex-start;\n  display: inline-flex;\n  width: fit-content;\n  max-width: 100%;\n  text-align: left;\n  white-space: normal;\n  overflow: visible;\n  text-overflow: clip;\n  overflow-wrap: anywhere;\n  line-height: 1.2;\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.form-layout[_ngcontent-%COMP%] {\n  @include form.form-layout;\n}\n\n.form-lock-fieldset[_ngcontent-%COMP%] {\n  border: 0;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Deal[_ngcontent-%COMP%]   Tabs[_ngcontent-%COMP%]   \u2500\u2500\n.deal-tabs-shell[_ngcontent-%COMP%] {\n  margin-bottom: 0.55rem;\n  padding: 0;\n  border-radius: 16px;\n  background: transparent;\n  border: none;\n  box-shadow: none;\n}\n\n[_nghost-%COMP%]     .deal-tabs .p-tablist {\n  display: flex;\n  gap: 0;\n  flex-wrap: nowrap;\n  padding: 0;\n  border-radius: 16px;\n  background: linear-gradient(180deg, rgba(23, 50, 93, 0.84), rgba(16, 37, 71, 0.9));\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.12),\n    0 8px 18px rgba(15, 23, 42, 0.08);\n  overflow: hidden;\n  position: relative;\n  backdrop-filter: blur(10px) saturate(125%);\n  -webkit-backdrop-filter: blur(10px) saturate(125%);\n}\n\n[_nghost-%COMP%]     .deal-tabs .p-tablist-tab-list {\n  border: none !important;\n}\n\n[_nghost-%COMP%]     .deal-tabs .p-tab {\n  flex: 1 1 0;\n  min-width: 0;\n  min-height: 56px;\n  border: none;\n  border-radius: 0;\n  padding: 0.35rem 0.8rem 0.4rem;\n  font-size: 0.86rem;\n  font-weight: 700;\n  color: rgba(255, 255, 255, 0.96);\n  opacity: 1 !important;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  line-height: 1.18;\n  cursor: pointer;\n  transition: transform 0.18s ease, filter 0.18s ease, box-shadow 0.18s ease;\n  position: relative;\n  overflow: visible;\n  z-index: 1;\n  text-shadow: 0 1px 2px rgba(15, 23, 42, 0.28);\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),\n    var(--deal-tab-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n  clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%, 14px 50%);\n  margin-right: -20px;\n  filter: none;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.1),\n    inset 0 -1px 0 rgba(255, 255, 255, 0.08);\n  backdrop-filter: blur(8px) saturate(120%);\n  -webkit-backdrop-filter: blur(8px) saturate(120%);\n}\n\n[_nghost-%COMP%]     .deal-tabs .p-tab::before {\n  content: '';\n  position: absolute;\n  inset: 0 0 auto 0;\n  height: 45%;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));\n  opacity: 0.8;\n  pointer-events: none;\n  clip-path: inherit;\n}\n\n[_nghost-%COMP%]     .deal-tabs .p-tab::after {\n  content: '';\n  position: absolute;\n  left: 6%;\n  right: 8%;\n  bottom: 4px;\n  height: 2px;\n  border-radius: 999px;\n  background: linear-gradient(90deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.12));\n  opacity: 0.45;\n  pointer-events: none;\n}\n\n[_nghost-%COMP%]     .deal-tabs .p-tab:first-child {\n  clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%);\n  margin-left: 0;\n  border-top-left-radius: 12px;\n  border-bottom-left-radius: 12px;\n  z-index: 2;\n}\n\n[_nghost-%COMP%]     .deal-tabs .p-tab:last-child {\n  clip-path: polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%);\n  margin-right: 0;\n  border-top-right-radius: 12px;\n  border-bottom-right-radius: 12px;\n}\n\n//   Per-tab   gradient   colours\n[_nghost-%COMP%]     .deal-tabs .p-tab:nth-child(1) {\n  --deal-tab-bg: linear-gradient(135deg, #3f8dff 0%, #2364da 100%); // Core \u2013 blue\n}\n[_nghost-%COMP%]     .deal-tabs .p-tab:nth-child(2) {\n  --deal-tab-bg: linear-gradient(135deg, #36c3df 0%, #1497c0 100%); // Commercial \u2013 cyan\n}\n[_nghost-%COMP%]     .deal-tabs .p-tab:nth-child(3) {\n  --deal-tab-bg: linear-gradient(135deg, #ffaf47 0%, #f07f10 100%); // People \u2013 orange\n}\n[_nghost-%COMP%]     .deal-tabs .p-tab:nth-child(4) {\n  --deal-tab-bg: linear-gradient(135deg, #8b6bff 0%, #6948e4 100%); // Compliance \u2013 purple\n}\n[_nghost-%COMP%]     .deal-tabs .p-tab:nth-child(5) {\n  --deal-tab-bg: linear-gradient(135deg, #6f84aa 0%, #556f94 100%); // Delivery \u2013 slate\n}\n\n//   \u2500\u2500   Active   tab   \u2500\u2500\n[_nghost-%COMP%]     .deal-tabs .p-tab.p-tab-active, \n[_nghost-%COMP%]     .deal-tabs .p-tab[aria-selected='true'], \n[_nghost-%COMP%]     .deal-tabs .p-tab[data-p-active='true'] {\n  z-index: 4;\n  opacity: 1;\n  filter: brightness(1.05) saturate(1.1);\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.12)),\n    radial-gradient(circle at 50% 16%, rgba(255, 255, 255, 0.28), transparent 58%),\n    var(--deal-tab-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.32),\n    inset 0 -1px 0 rgba(255, 255, 255, 0.2),\n    0 0 0 1px rgba(255, 255, 255, 0.28),\n    0 0 0 3px rgba(255, 255, 255, 0.12),\n    0 10px 22px rgba(15, 23, 42, 0.22),\n    0 0 32px rgba(125, 211, 252, 0.3);\n  transform: translateY(-2px) scale(1.02);\n  animation: deal-tab-breathe 1.8s ease-in-out infinite;\n}\n\n[_nghost-%COMP%]     .deal-tabs .p-tab.p-tab-active .deal-tab-label, \n[_nghost-%COMP%]     .deal-tabs .p-tab[aria-selected='true'] .deal-tab-label, \n[_nghost-%COMP%]     .deal-tabs .p-tab[data-p-active='true'] .deal-tab-label {\n  color: #ffffff;\n  text-shadow: 0 1px 1px rgba(15, 23, 42, 0.18), 0 0 12px rgba(255, 255, 255, 0.16);\n}\n\n[_nghost-%COMP%]     .deal-tabs .p-tab.p-tab-active::after, \n[_nghost-%COMP%]     .deal-tabs .p-tab[aria-selected='true']::after, \n[_nghost-%COMP%]     .deal-tabs .p-tab[data-p-active='true']::after {\n  height: 3px;\n  bottom: 3px;\n  left: 8%;\n  right: 10%;\n  opacity: 1;\n  background: linear-gradient(\n    90deg,\n    rgba(255, 255, 255, 0.16) 0%,\n    rgba(239, 68, 68, 0.95) 12%,\n    rgba(245, 158, 11, 0.95) 26%,\n    rgba(250, 204, 21, 0.95) 38%,\n    rgba(34, 197, 94, 0.95) 50%,\n    rgba(59, 130, 246, 0.98) 64%,\n    rgba(139, 92, 246, 0.98) 78%,\n    rgba(236, 72, 153, 0.95) 90%,\n    rgba(255, 255, 255, 0.18) 100%\n  );\n  box-shadow:\n    0 0 6px rgba(255, 255, 255, 0.35),\n    0 0 14px rgba(59, 130, 246, 0.28),\n    0 0 20px rgba(236, 72, 153, 0.2),\n    0 1px 0 rgba(15, 23, 42, 0.12);\n  background-size: 320% 100%;\n  animation: _ngcontent-%COMP%_deal-tab-active-strip 3.4s linear infinite;\n}\n\n[_nghost-%COMP%]     .deal-tabs .p-tab.p-tab-active::before, \n[_nghost-%COMP%]     .deal-tabs .p-tab[aria-selected='true']::before, \n[_nghost-%COMP%]     .deal-tabs .p-tab[data-p-active='true']::before {\n  opacity: 0.95;\n}\n\n//   \u2500\u2500   Inactive   /   hover   /   focus   /   disabled   \u2500\u2500\n[_nghost-%COMP%]     .deal-tabs .p-tab:not(.p-tab-active):not([aria-selected='true']):not([data-p-active='true']) {\n  opacity: 1;\n  transition: opacity 250ms, transform 250ms, filter 250ms;\n}\n\n[_nghost-%COMP%]     .deal-tabs .p-tab:hover:not(.p-disabled):not(.p-tab-active):not([aria-selected='true']):not([data-p-active='true']) {\n  opacity: 1;\n  transform: translateY(-1px);\n  filter: brightness(1.05) saturate(1.05);\n  z-index: 6;\n}\n\n[_nghost-%COMP%]     .deal-tabs .p-tab:focus-visible {\n  outline: none;\n  z-index: 6;\n  box-shadow:\n    0 0 0 2px rgba(255, 255, 255, 0.28),\n    0 0 0 5px rgba(59, 130, 246, 0.2);\n}\n\n[_nghost-%COMP%]     .deal-tabs .p-tab.p-disabled {\n  cursor: not-allowed;\n  opacity: 0.62;\n  filter: grayscale(0.08) saturate(0.65);\n}\n\n.deal-tab-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  max-width: 100%;\n  text-wrap: balance;\n  white-space: normal;\n  font-size: 0.88rem;\n  font-weight: 700;\n  letter-spacing: 0.005em;\n\n  i {\n    font-size: 0.92rem;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Tab[_ngcontent-%COMP%]   animations[_ngcontent-%COMP%]   \u2500\u2500\n@keyframes[_ngcontent-%COMP%]   deal-tab-breathe[_ngcontent-%COMP%] {\n  0%, 100% {\n    box-shadow:\n      inset 0 1px 0 rgba(255, 255, 255, 0.24),\n      inset 0 -1px 0 rgba(255, 255, 255, 0.16),\n      0 0 0 1px rgba(255, 255, 255, 0.2),\n      0 0 0 3px rgba(255, 255, 255, 0.08),\n      0 10px 18px rgba(15, 23, 42, 0.16),\n      0 0 20px rgba(125, 211, 252, 0.18);\n  }\n  50% {\n    box-shadow:\n      inset 0 1px 0 rgba(255, 255, 255, 0.28),\n      inset 0 -1px 0 rgba(255, 255, 255, 0.18),\n      0 0 0 1px rgba(255, 255, 255, 0.28),\n      0 0 0 4px rgba(255, 255, 255, 0.1),\n      0 12px 22px rgba(15, 23, 42, 0.18),\n      0 0 30px rgba(255, 255, 255, 0.16),\n      0 0 34px rgba(125, 211, 252, 0.24);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_deal-tab-active-strip {\n  0%, 100% {\n    background-position: 0% 50%;\n    opacity: 0.88;\n    transform: scaleX(0.985);\n  }\n  50% {\n    background-position: 100% 50%;\n    opacity: 1;\n    transform: scaleX(1);\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  [_nghost-%COMP%]     .deal-tabs .p-tab.p-tab-active {\n    animation: none;\n  }\n  [_nghost-%COMP%]     .deal-tabs .p-tab.p-tab-active::after {\n    animation: none;\n  }\n}\n\n@media (max-width: 980px) {\n  [_nghost-%COMP%]     .deal-tabs .p-tablist {\n    overflow-x: auto;\n    padding-bottom: 0.35rem;\n    scrollbar-width: thin;\n  }\n}\n\n.form-layout--read-only[_ngcontent-%COMP%] {\n  .form-lock-fieldset {\n    opacity: 0.62;\n    filter: saturate(0.72);\n  }\n\n  .opportunity-accordion-card input,\n  .opportunity-accordion-card textarea,\n  .opportunity-accordion-card .p-inputtext,\n  .opportunity-accordion-card .p-inputnumber,\n  .opportunity-accordion-card .p-datepicker,\n  .opportunity-accordion-card .p-select,\n  .opportunity-accordion-card .btn-glass,\n  .opportunity-accordion-card .crm-button--primary,\n  .opportunity-accordion-card .crm-button--ghost {\n    pointer-events: none;\n  }\n\n  .opportunity-accordion-card input,\n  .opportunity-accordion-card textarea,\n  .opportunity-accordion-card .p-inputtext,\n  .opportunity-accordion-card .p-inputnumber .p-inputtext,\n  .opportunity-accordion-card .p-select,\n  .opportunity-accordion-card .p-datepicker input,\n  .opportunity-accordion-card .p-multiselect,\n  .opportunity-accordion-card .p-inputnumber-input {\n    background: rgba(248, 250, 252, 0.72) !important;\n    color: rgba(51, 65, 85, 0.85) !important;\n  }\n\n  .decision-review-panel textarea,\n  .decision-review-panel .crm-button--primary,\n  .decision-review-panel .crm-button--ghost {\n    pointer-events: auto;\n  }\n}\n\n.opportunity-section-accordion[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.9rem;\n}\n\n.opportunity-accordion-header[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n\n.opportunity-accordion-header-meta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.opportunity-accordion-title[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n\n  i {\n    color: #2563eb;\n    font-size: 0.95rem;\n  }\n}\n\n.opportunity-accordion-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.22rem 0.6rem;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  background: rgba(255, 255, 255, 0.86);\n  color: rgba(51, 65, 85, 0.9);\n  font-size: 0.72rem;\n  font-weight: 700;\n  line-height: 1.1;\n  white-space: nowrap;\n  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);\n}\n\n.opportunity-accordion-badge--neutral[_ngcontent-%COMP%] { background: rgba(248, 250, 252, 0.9); color: rgba(71, 85, 105, 0.95); }\n.opportunity-accordion-badge--info[_ngcontent-%COMP%] { background: rgba(59, 130, 246, 0.12); border-color: rgba(59, 130, 246, 0.22); color: #1d4ed8; }\n.opportunity-accordion-badge--warning[_ngcontent-%COMP%] { background: rgba(245, 158, 11, 0.14); border-color: rgba(245, 158, 11, 0.26); color: #b45309; }\n.opportunity-accordion-badge--success[_ngcontent-%COMP%] { background: rgba(16, 185, 129, 0.14); border-color: rgba(16, 185, 129, 0.24); color: #047857; }\n.opportunity-accordion-badge--danger[_ngcontent-%COMP%] { background: rgba(239, 68, 68, 0.14); border-color: rgba(239, 68, 68, 0.24); color: #b91c1c; }\n\n.opportunity-accordion-card[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n[_nghost-%COMP%]     .opportunity-section-accordion .p-accordionpanel {\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.7);\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);\n  overflow: hidden;\n}\n\n[_nghost-%COMP%]     .opportunity-section-accordion .p-accordionheader .p-accordionheader-link {\n  padding: 0.9rem 1rem;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(248, 250, 252, 0.72));\n  border: 0;\n}\n\n[_nghost-%COMP%]     .opportunity-section-accordion .p-accordionpanel.p-disabled, \n[_nghost-%COMP%]     .opportunity-section-accordion .p-accordionpanel[aria-disabled='true'] {\n  border-color: rgba(239, 68, 68, 0.2);\n  background: rgba(248, 250, 252, 0.62);\n}\n\n[_nghost-%COMP%]     .opportunity-section-accordion .p-accordionheader[aria-disabled='true'] .p-accordionheader-link {\n  opacity: 0.82;\n  cursor: not-allowed;\n}\n\n[_nghost-%COMP%]     .opportunity-section-accordion .p-accordionheader[aria-disabled='true'] .opportunity-accordion-title i {\n  color: #dc2626;\n}\n\n[_nghost-%COMP%]     .opportunity-section-accordion .p-accordioncontent, \n[_nghost-%COMP%]     .opportunity-section-accordion .p-accordioncontent-content {\n  border: 0;\n  background: transparent;\n  padding: 0;\n}\n\n.form-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  @include form.section-title;\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  @include form.form-grid;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: normal;\n    min-width: 0;\n    flex-shrink: 1;\n    text-align: left;\n    transition: color 0.2s ease;\n\n    .required {\n      @include form.form-required;\n    }\n  }\n\n  .field-error {\n    margin: 0.35rem 0 0;\n    font-size: 0.75rem;\n    color: #b91c1c;\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea {\n    flex: none;\n    min-width: 0;\n    width: 100%;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    grid-column: 1 / -1;\n    flex-direction: column;\n    align-items: stretch;\n    > label {\n      text-align: left;\n      min-width: unset;\n    }\n  }\n}\n\n.field-label-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n\n  label {\n    margin: 0;\n  }\n}\n\n.approval-requirement-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.55rem;\n  border-radius: 999px;\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n  line-height: 1.1;\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  background: rgba(255, 255, 255, 0.75);\n  color: rgba(51, 65, 85, 0.88);\n  white-space: nowrap;\n  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);\n}\n\n.approval-requirement-badge--neutral[_ngcontent-%COMP%] {\n  background: rgba(248, 250, 252, 0.85);\n  color: rgba(71, 85, 105, 0.9);\n}\n\n.approval-requirement-badge--info[_ngcontent-%COMP%] {\n  background: rgba(59, 130, 246, 0.12);\n  border-color: rgba(59, 130, 246, 0.26);\n  color: #1d4ed8;\n}\n\n.approval-requirement-badge--warning[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.16);\n  border-color: rgba(245, 158, 11, 0.3);\n  color: #b45309;\n}\n\n.approval-requirement-badge--success[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.14);\n  border-color: rgba(16, 185, 129, 0.28);\n  color: #047857;\n}\n\n.approval-requirement-badge--danger[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.14);\n  border-color: rgba(239, 68, 68, 0.28);\n  color: #b91c1c;\n}\n\n.related-summary[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  width: min(1400px, calc(100% - 3rem));\n  margin: 1rem auto 0;\n  padding: 0.75rem 1rem;\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n  display: grid;\n  gap: 0.5rem;\n}\n\n.related-summary-label[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: rgba(71, 85, 105, 0.75);\n}\n\n.related-summary-links[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n\n.related-summary-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.35rem 0.7rem;\n  border-radius: 999px;\n  border: 1px solid rgba(59, 130, 246, 0.25);\n  background: rgba(59, 130, 246, 0.08);\n  color: #1d4ed8;\n  font-weight: 600;\n  text-decoration: none;\n  font-size: 0.85rem;\n}\n\n.related-summary-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n\n.related-summary-link[_ngcontent-%COMP%]:hover {\n  background: rgba(59, 130, 246, 0.15);\n  color: #1e40af;\n}\n\n.related-summary-empty[_ngcontent-%COMP%] {\n  color: rgba(71, 85, 105, 0.8);\n  font-size: 0.85rem;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  @include form.form-actions;\n\n  .crm-button--ghost {\n    @include form.button-ghost;\n  }\n\n  .crm-button--primary {\n    @include form.button-primary;\n  }\n}\n\n.review-checklist[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.review-thread-card[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n\n.review-thread-controls[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  padding: 0.85rem;\n  border-radius: 0.9rem;\n  border: 1px solid rgba(99, 102, 241, 0.18);\n  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(14, 165, 233, 0.08));\n}\n\n.review-thread-controls--rep[_ngcontent-%COMP%] {\n  align-items: start;\n}\n\n.review-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.65rem 0.75rem;\n  border-radius: 0.75rem;\n  border: 1px solid rgba(148, 163, 184, 0.45);\n  background: rgba(255, 255, 255, 0.9);\n  color: inherit;\n}\n\n.review-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.decision-review-actions[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n\n.decision-action-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(220px, 320px) auto;\n  gap: 1rem;\n  align-items: center;\n  margin-top: 0.85rem;\n  justify-content: end;\n  justify-items: end;\n\n  .crm-button--primary {\n    padding: 0.42rem 0.78rem;\n    min-height: 34px;\n    font-size: 0.84rem;\n    line-height: 1;\n    min-width: 128px;\n    width: fit-content !important;\n    justify-self: start;\n    align-self: center;\n  }\n}\n\n.decision-summary[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border-radius: 0.85rem;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  background: rgba(255, 255, 255, 0.78);\n  margin-bottom: 0.75rem;\n}\n\n.decision-summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 0.6rem;\n}\n\n.decision-summary-item[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.15rem;\n}\n\n.decision-summary-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: rgba(71, 85, 105, 0.78);\n}\n\n.decision-summary-value[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: rgba(30, 41, 59, 0.92);\n}\n\n.approval-history-section[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.approval-history-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n\n.approval-history-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.65rem;\n}\n\n.approval-history-item[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  padding: 0.75rem;\n  border-radius: 0.9rem;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  background: rgba(255, 255, 255, 0.8);\n}\n\n.approval-history-item__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n}\n\n.approval-history-item__details[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.8rem;\n  color: rgba(71, 85, 105, 0.85);\n  font-size: 0.8rem;\n}\n\n.approval-history-meta[_ngcontent-%COMP%] {\n  color: rgba(71, 85, 105, 0.85);\n  font-size: 0.8rem;\n}\n\n.approval-history-notes[_ngcontent-%COMP%], \n.approval-history-policy[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(30, 41, 59, 0.88);\n  font-size: 0.88rem;\n}\n\n.review-thread-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.review-thread-item[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n  padding: 0.85rem;\n  border-radius: 0.9rem;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  background: rgba(255, 255, 255, 0.78);\n  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);\n}\n\n.review-thread-item__header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.45rem 0.6rem;\n}\n\n.review-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.55rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  border: 1px solid transparent;\n}\n\n.review-badge.review[_ngcontent-%COMP%] {\n  background: rgba(14, 116, 144, 0.12);\n  border-color: rgba(14, 116, 144, 0.28);\n  color: rgba(14, 116, 144, 0.95);\n}\n\n.review-badge.ack[_ngcontent-%COMP%] {\n  background: rgba(79, 70, 229, 0.12);\n  border-color: rgba(79, 70, 229, 0.28);\n  color: rgba(79, 70, 229, 0.95);\n}\n\n.review-outcome[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n}\n\n.review-meta[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: rgba(71, 85, 105, 0.9);\n}\n\n.review-thread-item__comment[_ngcontent-%COMP%] {\n  font-size: 0.92rem;\n  line-height: 1.45;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.review-thread-item__dates[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem 0.8rem;\n  font-size: 0.8rem;\n  color: rgba(71, 85, 105, 0.85);\n}\n\n.approval-request[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n}\n\n.approval-current-status[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  margin-bottom: 0.6rem;\n  padding: 0.55rem 0.65rem;\n  border-radius: 0.7rem;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(255, 255, 255, 0.68);\n}\n\n.approval-current-status__label[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: rgba(71, 85, 105, 0.8);\n}\n\n.approval-request-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr)) auto;\n  gap: 1rem;\n  align-items: end;\n}\n\n.approval-action[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.approval-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.approval-summary-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.approval-item[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n  padding: 0.75rem;\n  border-radius: 0.9rem;\n  background: rgba(255, 255, 255, 0.72);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.06);\n}\n\n.approval-summary-item[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n  padding: 0.75rem;\n  border-radius: 0.9rem;\n  background: rgba(255, 255, 255, 0.72);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.06);\n}\n\n.approval-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.approval-status[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.6rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  background: rgba(148, 163, 184, 0.2);\n  color: rgba(51, 65, 85, 0.9);\n}\n\n.approval-status--pending[_ngcontent-%COMP%] {\n  background: rgba(251, 191, 36, 0.2);\n  color: #92400e;\n}\n\n.approval-status--approved[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.2);\n  color: #166534;\n}\n\n.approval-status--rejected[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.2);\n  color: #991b1b;\n}\n\n.approval-purpose[_ngcontent-%COMP%], \n.approval-amount[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: rgba(30, 41, 59, 0.85);\n}\n\n.approval-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  font-size: 0.8rem;\n  color: rgba(71, 85, 105, 0.8);\n}\n\n.approval-notes[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: rgba(51, 65, 85, 0.85);\n}\n\n.approval-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  gap: 0.5rem;\n  align-items: center;\n}\n\n.checklist-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n\n  h4 {\n    margin: 0;\n    font-size: 0.95rem;\n    font-weight: 600;\n    color: rgba(30, 41, 59, 0.9);\n  }\n}\n\n.checklist-add[_ngcontent-%COMP%], \n.checklist-form[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  width: 100%;\n\n  input {\n    flex: 1;\n  }\n}\n\n.checklist-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n}\n\n.checklist-item[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 0.5rem;\n  align-items: center;\n  padding: 0.5rem;\n  border-radius: 0.75rem;\n  background: rgba(255, 255, 255, 0.65);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n}\n\n.checklist-status[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: rgba(71, 85, 105, 0.8);\n}\n\n.checklist-status.saved[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n\n.helper-text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  color: rgba(71, 85, 105, 0.75);\n}\n\n.section-loading-card[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  min-height: 92px;\n}\n\n.section-subtitle[_ngcontent-%COMP%] {\n  margin: -0.25rem 0 1rem;\n  font-size: 0.9rem;\n  color: rgba(71, 85, 105, 0.7);\n}\n\n.team-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.team-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.5fr 1fr auto;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n.team-actions[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  display: flex;\n  justify-content: flex-start;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n\n.quote-workspace[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 1px solid rgba(148, 163, 184, 0.25);\n}\n\n.quote-workspace__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.75rem;\n\n  h4 {\n    margin: 0;\n    font-size: 0.95rem;\n    font-weight: 700;\n    color: rgba(30, 41, 59, 0.9);\n  }\n}\n\n.quote-lines[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.quote-line[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.7fr 1.4fr 0.6fr 0.9fr 0.7fr 0.9fr auto;\n  gap: 0.5rem;\n  align-items: center;\n}\n\n.quote-line--header[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: rgba(71, 85, 105, 0.85);\n}\n\n.quote-item-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n\n.quote-item-option__badges[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n\n.quote-item-type-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.1rem 0.45rem;\n  border-radius: 999px;\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  border: 1px solid transparent;\n}\n\n.quote-item-type-pill.product[_ngcontent-%COMP%] {\n  color: #1d4ed8;\n  background: #dbeafe;\n  border-color: rgba(59, 130, 246, 0.35);\n}\n\n.quote-item-type-pill.service[_ngcontent-%COMP%] {\n  color: #7c3aed;\n  background: #ede9fe;\n  border-color: rgba(168, 85, 247, 0.35);\n}\n\n.quote-item-type-pill.inactive[_ngcontent-%COMP%] {\n  color: #7f1d1d;\n  background: #fee2e2;\n  border-color: rgba(239, 68, 68, 0.35);\n}\n\n.quote-summary[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n  font-size: 0.84rem;\n  color: rgba(51, 65, 85, 0.9);\n}\n\n.proposal-preview-card[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  padding: 0.75rem 0.85rem;\n  border-radius: 12px;\n  border: 1px solid rgba(14, 116, 144, 0.2);\n  background: rgba(236, 254, 255, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n\n.proposal-preview-card__info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n  min-width: 0;\n}\n\n.proposal-preview-card__label[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n  color: rgba(8, 47, 73, 0.86);\n}\n\n.proposal-preview-card__link[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: rgba(3, 105, 161, 0.9);\n  text-decoration: none;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n\n  &:hover {\n    color: rgba(3, 105, 161, 1);\n    text-decoration: underline;\n  }\n}\n\n.proposal-preview-card__actions[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  flex-wrap: wrap;\n}\n\n.proposal-send-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.proposal-send-dialog__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  margin-top: 0.25rem;\n  flex-wrap: wrap;\n}\n\n.proposal-activity-card[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  padding: 0.75rem 0.85rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  background: rgba(248, 250, 252, 0.85);\n\n  h5 {\n    margin: 0 0 0.55rem;\n    font-size: 0.82rem;\n    text-transform: uppercase;\n    letter-spacing: 0.02em;\n    color: rgba(51, 65, 85, 0.88);\n  }\n}\n\n.proposal-activity-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.6rem;\n  padding: 0.42rem 0;\n  border-top: 1px dashed rgba(148, 163, 184, 0.32);\n\n  &:first-of-type {\n    border-top: none;\n    padding-top: 0;\n  }\n}\n\n.proposal-activity-row__title[_ngcontent-%COMP%] {\n  font-size: 0.83rem;\n  font-weight: 600;\n  color: rgba(30, 41, 59, 0.92);\n}\n\n.proposal-activity-row__meta[_ngcontent-%COMP%] {\n  display: inline-flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: flex-end;\n  font-size: 0.78rem;\n  color: rgba(71, 85, 105, 0.88);\n}\n\n.proposal-resent-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.28rem;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(3, 105, 161, 0.95);\n  background: rgba(186, 230, 253, 0.55);\n  border: 1px solid rgba(3, 105, 161, 0.25);\n  padding: 0.16rem 0.46rem;\n  border-radius: 999px;\n}\n\n.proposal-send-hint[_ngcontent-%COMP%] {\n  margin: 0.45rem 0 0;\n  font-size: 0.8rem;\n  color: rgba(180, 83, 9, 0.9);\n}\n\n.btn-icon[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(71, 85, 105, 0.7);\n}\n\n@media (max-width: 1200px) {\n}\n\n@media (max-width: 900px) {\n  .deal-header-progress[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n\n  .deal-sticky-summary[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .deal-sticky-summary[_ngcontent-%COMP%]   .metric-card--risk[_ngcontent-%COMP%], \n   .deal-sticky-summary[_ngcontent-%COMP%]   .metric-card--approval[_ngcontent-%COMP%] {\n    .opportunity-accordion-badge {\n      font-size: 0.7rem;\n    }\n  }\n\n  .opportunity-accordion-header[_ngcontent-%COMP%] {\n    align-items: flex-start;\n  }\n\n  .opportunity-accordion-header-meta[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n\n  .opportunity-accordion-title[_ngcontent-%COMP%] {\n    white-space: normal;\n  }\n\n  .checklist-item[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .approval-request-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .approval-actions[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .team-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .quote-line[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .quote-line--header[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .approval-history-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .decision-action-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    justify-content: stretch;\n    justify-items: stretch;\n  }\n\n  .proposal-preview-card[_ngcontent-%COMP%] {\n    align-items: stretch;\n  }\n\n  .proposal-preview-card__actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n  .proposal-activity-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.2rem;\n  }\n\n  .proposal-activity-row__meta[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n}\n\n[_nghost-%COMP%]     .p-inputtext, \n[_nghost-%COMP%]     .p-inputnumber .p-inputtext, \n[_nghost-%COMP%]     .p-dropdown, \n[_nghost-%COMP%]     .p-inputtextarea, \n[_nghost-%COMP%]     .p-datepicker input {\n  @include form.premium-input;\n}\n\n[_nghost-%COMP%]     .p-inputtext:hover, \n[_nghost-%COMP%]     .p-inputnumber .p-inputtext:hover, \n[_nghost-%COMP%]     .p-dropdown:hover, \n[_nghost-%COMP%]     .p-inputtextarea:hover, \n[_nghost-%COMP%]     .p-datepicker input:hover {\n  @include form.premium-input-hover;\n}\n\n[_nghost-%COMP%]     .p-inputtext:focus, \n[_nghost-%COMP%]     .p-inputnumber .p-inputtext:focus, \n[_nghost-%COMP%]     .p-dropdown:focus-within, \n[_nghost-%COMP%]     .p-inputtextarea:focus, \n[_nghost-%COMP%]     .p-datepicker input:focus {\n  @include form.premium-input-focus;\n}\n\n@media (max-width: 768px) {\n  .deal-header-progress[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .deal-header-progress__dial[_ngcontent-%COMP%] {\n    align-self: flex-start;\n  }\n\n  .deal-sticky-summary[_ngcontent-%COMP%] {\n    top: calc(var(--shell-topbar-height, 106px) + var(--shell-topbar-strip-height, 4px) + var(--shell-floating-gap, 6px) + 8px);\n    grid-template-columns: 1fr;\n  }\n\n  .opportunity-accordion-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .opportunity-accordion-badge[_ngcontent-%COMP%] {\n    white-space: normal;\n    max-width: 100%;\n  }\n\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n\n\n\n\n.deal-activity-timeline[_ngcontent-%COMP%] {\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 1rem;\n\n    h3 {\n      margin: 0;\n      font-size: 0.9375rem;\n      font-weight: 600;\n      color: #1f2937;\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n\n      i { color: #6366f1; font-size: 1rem; }\n    }\n  }\n\n  &__loading {\n    padding: 2rem;\n    text-align: center;\n    color: #9ca3af;\n    font-size: 0.875rem;\n\n    i { margin-right: 0.375rem; }\n  }\n\n  &__list {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  &__item {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.75rem;\n    padding: 0.75rem 1rem;\n    border: none;\n    background: transparent;\n    text-align: left;\n    cursor: pointer;\n    border-radius: 10px;\n    transition: background 0.15s ease;\n    width: 100%;\n    font-family: inherit;\n\n    &:hover {\n      background: rgba(99, 102, 241, 0.06);\n    }\n  }\n\n  &__icon {\n    width: 32px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 8px;\n    flex-shrink: 0;\n    font-size: 0.8125rem;\n\n    &[data-type='Meeting'] { background: rgba(59, 130, 246, 0.12); color: #3b82f6; }\n    &[data-type='Call']    { background: rgba(34, 197, 94, 0.12); color: #22c55e; }\n    &[data-type='Email']   { background: rgba(236, 72, 153, 0.12); color: #ec4899; }\n    &[data-type='Task']    { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }\n    &[data-type='Note']    { background: rgba(107, 114, 128, 0.12); color: #6b7280; }\n  }\n\n  &__content {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &__top {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.5rem;\n    margin-bottom: 2px;\n  }\n\n  &__subject {\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #1f2937;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  &__status {\n    font-size: 0.6875rem;\n    font-weight: 600;\n    padding: 2px 8px;\n    border-radius: 6px;\n    flex-shrink: 0;\n    text-transform: capitalize;\n\n    &[data-status='Completed'] { background: rgba(34, 197, 94, 0.12); color: #16a34a; }\n    &[data-status='Upcoming']  { background: rgba(59, 130, 246, 0.12); color: #3b82f6; }\n    &[data-status='Overdue']   { background: rgba(239, 68, 68, 0.12); color: #dc2626; }\n  }\n\n  &__meta {\n    font-size: 0.75rem;\n    color: #9ca3af;\n    display: flex;\n    gap: 0.25rem;\n    flex-wrap: wrap;\n  }\n\n  &__outcome {\n    margin-top: 4px;\n    font-size: 0.75rem;\n    color: #6b7280;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n}\n\n.deal-activity-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2.5rem 1rem;\n  color: #d1d5db;\n  text-align: center;\n\n  i {\n    font-size: 2rem;\n    margin-bottom: 0.75rem;\n  }\n\n  p {\n    margin: 0 0 0.25rem;\n    font-size: 0.875rem;\n    color: #9ca3af;\n    font-weight: 500;\n  }\n\n  &__hint {\n    font-size: 0.75rem;\n    color: #d1d5db;\n    max-width: 300px;\n  }\n}\n\n\n\n\n.deal-stakeholders-section[_ngcontent-%COMP%] {\n  padding: $space-4;\n}\n\n.deal-stakeholders[_ngcontent-%COMP%] {\n  &__add-form {\n    margin-bottom: $space-4;\n    padding: $space-3 $space-4;\n    background: rgba(99, 102, 241, 0.04);\n    border: 1px solid rgba(99, 102, 241, 0.1);\n    border-radius: $radius-lg;\n  }\n\n  &__add-row {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    flex-wrap: wrap;\n\n    .stakeholder-select {\n      flex: 1;\n      min-width: 180px;\n    }\n\n    .stakeholder-role-select {\n      width: 160px;\n      flex-shrink: 0;\n    }\n  }\n\n  &__notes-row {\n    margin-top: $space-2;\n  }\n\n  &__loading {\n    padding: 2rem;\n    text-align: center;\n    color: $gray-500;\n    font-size: $font-size-sm;\n\n    i { margin-right: 0.375rem; }\n  }\n\n  &__list {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  &__item {\n    display: flex;\n    align-items: flex-start;\n    gap: $space-3;\n    padding: $space-3 $space-4;\n    border-radius: 10px;\n    transition: background 0.15s ease;\n\n    &:hover {\n      background: rgba(99, 102, 241, 0.04);\n    }\n  }\n\n  &__avatar {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);\n    color: #6366f1;\n    font-size: $font-size-base;\n    flex-shrink: 0;\n  }\n\n  &__info {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &__top {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    margin-bottom: 2px;\n    flex-wrap: wrap;\n  }\n\n  &__name {\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: #1f2937;\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n  }\n\n  &__primary-badge {\n    display: inline-block;\n    font-size: 0.6875rem;\n    font-weight: 700;\n    padding: 1px 6px;\n    border-radius: $radius-sm;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n  }\n\n  &__role-badge {\n    font-size: 0.6875rem;\n    font-weight: 600;\n    padding: 2px 8px;\n    border-radius: 6px;\n    flex-shrink: 0;\n    text-transform: capitalize;\n\n    &[data-role='Decision Maker'] { background: rgba(239, 68, 68, 0.12); color: #dc2626; }\n    &[data-role='Champion']       { background: rgba(34, 197, 94, 0.12); color: #16a34a; }\n    &[data-role='Influencer']     { background: rgba(59, 130, 246, 0.12); color: #3b82f6; }\n    &[data-role='Evaluator']      { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }\n    &[data-role='Blocker']        { background: rgba(107, 114, 128, 0.12); color: #6b7280; }\n  }\n\n  &__meta {\n    font-size: 0.75rem;\n    color: #9ca3af;\n    display: flex;\n    gap: 0.25rem;\n    flex-wrap: wrap;\n  }\n\n  &__notes {\n    margin-top: 4px;\n    font-size: 0.75rem;\n    color: #6b7280;\n    font-style: italic;\n  }\n\n  &__actions {\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n  }\n\n  &__empty {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 2.5rem 1rem;\n    color: #d1d5db;\n    text-align: center;\n\n    i {\n      font-size: 2rem;\n      margin-bottom: 0.75rem;\n    }\n\n    p {\n      margin: 0 0 0.25rem;\n      font-size: $font-size-sm;\n      color: #9ca3af;\n      font-weight: 500;\n    }\n\n    &-hint {\n      font-size: 0.75rem;\n      color: #d1d5db;\n      max-width: 340px;\n    }\n  }\n}\n\n.stakeholder-primary-toggle[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  color: $gray-600;\n  cursor: pointer;\n  white-space: nowrap;\n\n  input[type='checkbox'] {\n    accent-color: #667eea;\n  }\n}\n\n\n\n\n.deal-health-section[_ngcontent-%COMP%] {\n  padding: $space-4;\n}\n\n.deal-health[_ngcontent-%COMP%] {\n  &__header {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: $space-3;\n    margin-bottom: $space-4;\n\n    .section-subtitle {\n      flex: 1;\n    }\n  }\n\n  &__overview {\n    display: flex;\n    gap: $space-6;\n    align-items: flex-start;\n    margin-bottom: $space-5;\n\n    @media (max-width: 768px) {\n      flex-direction: column;\n      align-items: center;\n    }\n  }\n\n  &__gauge {\n    flex-shrink: 0;\n\n    &-svg {\n      width: 120px;\n      height: 120px;\n    }\n\n    &-fill {\n      transition: stroke-dasharray 1s ease-out;\n    }\n\n    &-value {\n      font-size: 28px;\n      font-weight: 800;\n      fill: #1f2937;\n    }\n\n    &-label {\n      font-size: 11px;\n      font-weight: 600;\n      fill: #6b7280;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n  }\n\n  &__details {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &__rationale {\n    display: flex;\n    gap: $space-2;\n    padding: $space-3;\n    background: rgba(59, 130, 246, 0.05);\n    border: 1px solid rgba(59, 130, 246, 0.12);\n    border-radius: $radius-md;\n    font-size: $font-size-sm;\n    color: #374151;\n    line-height: 1.5;\n    margin-bottom: $space-3;\n\n    i {\n      color: #3b82f6;\n      flex-shrink: 0;\n      margin-top: 2px;\n    }\n  }\n\n  &__meta {\n    display: flex;\n    gap: $space-4;\n    flex-wrap: wrap;\n  }\n\n  &__confidence,\n  &__computed {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: 0.75rem;\n    color: #9ca3af;\n\n    i {\n      font-size: 0.75rem;\n    }\n  }\n\n  &__confidence i {\n    color: #22c55e;\n  }\n\n  &__factors {\n    border-top: 1px solid rgba(0, 0, 0, 0.06);\n    padding-top: $space-4;\n  }\n\n  &__factors-title {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: #374151;\n    margin: 0 0 $space-3;\n\n    i {\n      font-size: $font-size-sm;\n      color: #6366f1;\n    }\n  }\n\n  &__factor {\n    margin-bottom: $space-3;\n\n    &:last-child {\n      margin-bottom: 0;\n    }\n  }\n\n  &__factor-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 4px;\n  }\n\n  &__factor-name {\n    font-size: 0.8125rem;\n    font-weight: 500;\n    color: #4b5563;\n  }\n\n  &__factor-score {\n    font-size: 0.75rem;\n    font-weight: 600;\n    color: #6b7280;\n  }\n\n  &__factor-bar {\n    width: 100%;\n    height: 6px;\n    background: #e5e7eb;\n    border-radius: 3px;\n    overflow: hidden;\n\n    &-fill {\n      height: 100%;\n      border-radius: 3px;\n      transition: width 0.8s ease-out;\n    }\n  }\n\n  &__empty {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 2.5rem 1rem;\n    color: #d1d5db;\n    text-align: center;\n\n    i {\n      font-size: 2rem;\n      margin-bottom: 0.75rem;\n    }\n\n    p {\n      margin: 0 0 0.25rem;\n      font-size: $font-size-sm;\n      color: #9ca3af;\n      font-weight: 500;\n    }\n\n    &-hint {\n      font-size: 0.75rem;\n      color: #d1d5db;\n      max-width: 340px;\n    }\n  }\n}\n\n\n\n\n.deal-aging[_ngcontent-%COMP%] {\n  padding: $space-4;\n\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: $space-4;\n    padding-bottom: $space-3;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  }\n\n  &__total {\n    display: flex;\n    align-items: baseline;\n    gap: $space-2;\n  }\n\n  &__total-value {\n    font-size: 2rem;\n    font-weight: 800;\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n  }\n\n  &__total-label {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    font-weight: 500;\n  }\n\n  &__stage-count {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    font-weight: 500;\n    padding: $space-1 $space-3;\n    background: $glass-bg-subtle;\n    border-radius: $radius-full;\n    border: 1px solid $glass-border;\n  }\n\n  \n\n  &__bar-container {\n    display: flex;\n    height: 10px;\n    border-radius: $radius-full;\n    overflow: hidden;\n    margin-bottom: $space-5;\n    background: $gray-200;\n    gap: 2px;\n  }\n\n  &__bar-segment {\n    min-width: 6px;\n    background: linear-gradient(135deg, #818cf8 0%, #667eea 100%);\n    transition: flex 600ms ease-out;\n\n    &:nth-child(2) { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n    &:nth-child(3) { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n    &:nth-child(4) { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }\n    &:nth-child(5) { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n    &:nth-child(6) { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); }\n    &:nth-child(n+7) { background: linear-gradient(135deg, #64748b 0%, #475569 100%); }\n\n    &--current {\n      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%) !important;\n      animation: _ngcontent-%COMP%_pulse-bar 2s ease-in-out infinite;\n    }\n  }\n\n  \n\n  &__stages {\n    display: flex;\n    flex-direction: column;\n    gap: 0;\n  }\n\n  &__stage {\n    display: flex;\n    gap: $space-3;\n    padding: $space-2 0;\n    transition: background 200ms;\n\n    &:hover {\n      background: rgba($primary, 0.03);\n      border-radius: $radius-md;\n    }\n\n    &--current {\n      .deal-aging__stage-name {\n        color: #16a34a;\n        font-weight: 700;\n      }\n    }\n  }\n\n  &__stage-marker {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    width: 20px;\n    flex-shrink: 0;\n    padding-top: 4px;\n  }\n\n  &__stage-dot {\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background: #cbd5e1;\n    flex-shrink: 0;\n\n    &--current {\n      background: #22c55e;\n      box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);\n      animation: pulse-glow 2s ease-in-out infinite;\n    }\n  }\n\n  &__stage-line {\n    flex: 1;\n    width: 2px;\n    min-height: 24px;\n    background: #e2e8f0;\n    margin-top: 4px;\n  }\n\n  &__stage-info {\n    flex: 1;\n    min-width: 0;\n    padding-bottom: $space-2;\n  }\n\n  &__stage-name {\n    font-size: $font-size-md;\n    font-weight: 600;\n    color: $gray-800;\n    margin-bottom: 2px;\n  }\n\n  &__stage-duration {\n    font-size: $font-size-sm;\n    color: $gray-600;\n\n    strong {\n      font-weight: 700;\n      color: $gray-800;\n    }\n  }\n\n  &__stage-badge {\n    display: inline-block;\n    margin-left: $space-2;\n    padding: 1px $space-2;\n    font-size: 0.7rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: #16a34a;\n    background: rgba(34, 197, 94, 0.12);\n    border-radius: $radius-full;\n  }\n\n  &__stage-date {\n    font-size: $font-size-xs;\n    color: $gray-400;\n    margin-top: 2px;\n  }\n\n  &__empty {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-6 0;\n    text-align: center;\n\n    i {\n      font-size: 2rem;\n      color: #d1d5db;\n    }\n\n    p {\n      font-size: $font-size-sm;\n      color: #d1d5db;\n      max-width: 340px;\n    }\n  }\n}\n\n@keyframes _ngcontent-%COMP%_pulse-bar {\n  0%,\n  100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.7;\n  }\n}\n\n\n\n\n.deal-attachments-section[_ngcontent-%COMP%] {\n  padding: $space-4;\n}\n\n.deal-attachments[_ngcontent-%COMP%] {\n  &__upload {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    margin-bottom: $space-4;\n  }\n\n  &__upload-hint {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    display: inline-flex;\n    align-items: center;\n    gap: $space-1;\n  }\n\n  &__loading {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-4;\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n\n  &__empty {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 2.5rem 1rem;\n    color: #d1d5db;\n    text-align: center;\n\n    i {\n      font-size: 2rem;\n      margin-bottom: 0.75rem;\n    }\n\n    p {\n      margin: 0 0 0.25rem;\n      font-size: 0.875rem;\n      color: #9ca3af;\n      font-weight: 500;\n    }\n\n    &-hint {\n      font-size: 0.75rem;\n      color: #d1d5db;\n      max-width: 300px;\n    }\n  }\n}\n\n.deal-attachment-name[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-800;\n\n  i {\n    color: $primary;\n    font-size: $font-size-base;\n  }\n}\n\n.deal-attachment-actions[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n\n\n\n.revenue-forecast-section[_ngcontent-%COMP%] {\n  padding: $space-4;\n}\n\n.revenue-forecast[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-5;\n}\n\n.forecast-metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: $space-3;\n}\n\n.forecast-metric[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: $space-3 $space-4;\n  background: $glass-bg-subtle;\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow;\n  }\n\n  &__label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n  }\n\n  &__value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  &--primary &__value { color: #667eea; }\n  &--success &__value { color: #22c55e; }\n  &--info &__value { color: #3b82f6; }\n  &--warn &__value { color: #f59e0b; }\n  &--neutral &__value { color: $gray-700; }\n}\n\n.forecast-chart-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  max-width: 320px;\n  margin: 0 auto;\n}\n\n.forecast-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2.5rem 1rem;\n  color: #d1d5db;\n  text-align: center;\n\n  i {\n    font-size: 2rem;\n    margin-bottom: 0.75rem;\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.875rem;\n    color: #9ca3af;\n    font-weight: 500;\n  }\n}\n\n\n\n.duplicate-dialog[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.85rem;\n}\n\n.duplicate-dialog__message[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(var(--apple-gray-0), 0.85);\n}\n\n.duplicate-dialog__list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.65rem;\n  max-height: 20rem;\n  overflow: auto;\n  padding-right: 0.25rem;\n}\n\n.duplicate-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  gap: 0.75rem;\n  align-items: center;\n  padding: 0.65rem 0.75rem;\n  border: 1px solid rgba(var(--apple-gray-2), 0.16);\n  border-radius: 12px;\n  background: rgba(var(--apple-gray-6), 0.45);\n}\n\n.duplicate-row__meta[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.duplicate-row__name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: rgba(var(--apple-gray-0), 0.95);\n}\n\n.duplicate-row__account[_ngcontent-%COMP%], \n.duplicate-row__stage[_ngcontent-%COMP%], \n.duplicate-row__signals[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: rgba(var(--apple-gray-1), 0.76);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.duplicate-row__score[_ngcontent-%COMP%] {\n  display: grid;\n  justify-items: end;\n  font-size: 0.8rem;\n  color: rgba(var(--apple-gray-1), 0.86);\n}\n\n.duplicate-row__badge[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  padding: 0.12rem 0.4rem;\n  border-radius: 999px;\n  border: 1px solid rgba(var(--apple-gray-2), 0.3);\n}\n\n.duplicate-row__badge[data-level='block'][_ngcontent-%COMP%] {\n  color: #dc2626;\n  border-color: rgba(220, 38, 38, 0.32);\n  background: rgba(220, 38, 38, 0.08);\n}\n\n.duplicate-row__badge[data-level='warning'][_ngcontent-%COMP%] {\n  color: #d97706;\n  border-color: rgba(217, 119, 6, 0.32);\n  background: rgba(217, 119, 6, 0.08);\n}\n\n.duplicate-dialog__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding-top: 0.25rem;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OpportunityFormPage, [{
        type: Component,
        args: [{ selector: 'app-opportunity-form-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    RouterModule,
                    ButtonModule,
                    InputTextModule,
                    InputNumberModule,
                    TextareaModule,
                    SelectModule,
                    DatePickerModule,
                    AccordionModule,
                    TabsModule,
                    DialogModule,
                    TableModule,
                    FileUploadModule,
                    ChartModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    KnobModule,
                    SplitButtonModule,
                    BreadcrumbsComponent
                ], template: "\n    <section class=\"opportunity-form-page\">\n      <p-dialog\n        header=\"Saved drafts available\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"draftPromptVisible()\"\n        [style]=\"{ width: '38rem', maxWidth: '96vw' }\"\n        styleClass=\"form-draft-prompt-dialog\"\n        (visibleChange)=\"draftPromptVisible.set($event)\"\n        (onHide)=\"dismissDraftPrompt()\"\n      >\n        <div class=\"form-draft-prompt\">\n          <div class=\"form-draft-prompt__hero\">\n            <div class=\"form-draft-prompt__icon\">\n              <i class=\"pi pi-bookmark\"></i>\n            </div>\n            <div>\n              <h3>Resume a saved opportunity draft?</h3>\n              <p>You have saved deal drafts. Choose one to continue where you left off, or start with a blank form.</p>\n            </div>\n          </div>\n          <div class=\"form-draft-list\" *ngIf=\"recentDrafts().length; else noOpportunityPromptDrafts\">\n            <div class=\"form-draft-list__item\" *ngFor=\"let draft of recentDrafts()\">\n              <span class=\"form-draft-list__title\">{{ draft.title }}</span>\n              <span class=\"form-draft-list__meta\">{{ draft.subtitle || 'No account' }} \u00B7 {{ formatDraftTimestamp(draft.updatedAtUtc) }}</span>\n              <span class=\"form-draft-list__actions\">\n                <button type=\"button\" class=\"form-draft-list__resume\" (click)=\"loadDraftFromPrompt(draft)\">Load draft</button>\n              </span>\n            </div>\n          </div>\n          <ng-template #noOpportunityPromptDrafts>\n            <p class=\"form-draft-dialog__empty\">No saved drafts available.</p>\n          </ng-template>\n          <div class=\"lead-status-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Start fresh\" (click)=\"dismissDraftPrompt()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"View all drafts\" (click)=\"dismissDraftPrompt(); openDraftLibrary()\"></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        header=\"Open saved draft?\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"draftOpenConfirmVisible()\"\n        [style]=\"{ width: '28rem', maxWidth: '94vw' }\"\n        (visibleChange)=\"draftOpenConfirmVisible.set($event)\"\n        (onHide)=\"cancelOpenDraft()\"\n      >\n        <div class=\"form-draft-dialog\">\n          <p>Your current unsaved changes will be replaced by the selected draft.</p>\n          <div class=\"lead-status-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Cancel\" (click)=\"cancelOpenDraft()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Open Draft\" (click)=\"confirmOpenDraft()\"></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        header=\"Unsaved deal changes\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"false\"\n        [visible]=\"leavePromptVisible()\"\n        [style]=\"{ width: '36rem', maxWidth: '96vw' }\"\n        styleClass=\"form-leave-dialog\"\n        (visibleChange)=\"leavePromptVisible.set($event)\"\n        (onHide)=\"stayOnForm()\"\n      >\n        <div class=\"form-leave-dialog__body\">\n          <div class=\"form-leave-dialog__hero\">\n            <div class=\"form-leave-dialog__icon\">\n              <i class=\"pi pi-exclamation-circle\"></i>\n            </div>\n            <div>\n              <h3>Your deal form has unsaved changes.</h3>\n              <p>Choose whether to save the current state as a draft, submit the deal now, or leave without saving.</p>\n            </div>\n          </div>\n          <div class=\"form-leave-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Stay on form\" [disabled]=\"saving() || draftSaving()\" (click)=\"stayOnForm()\"></button>\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Leave without saving\" [disabled]=\"saving() || draftSaving()\" (click)=\"leaveWithoutSaving()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--secondary\" label=\"Save to draft\" [loading]=\"draftSaving()\" [disabled]=\"saving() || draftSaving()\" (click)=\"saveDraftAndLeave()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" [label]=\"primarySaveLabel()\" [loading]=\"saving()\" [disabled]=\"saving() || draftSaving()\" (click)=\"submitAndLeave()\"></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        header=\"Saved deal drafts\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"draftLibraryVisible()\"\n        [style]=\"{ width: '42rem', maxWidth: '96vw' }\"\n        (visibleChange)=\"draftLibraryVisible.set($event)\"\n        (onHide)=\"closeDraftLibrary()\"\n      >\n        <div class=\"form-draft-dialog\">\n          <p class=\"form-draft-dialog__empty\" *ngIf=\"!draftLibraryLoading() && !draftLibraryItems().length\">No saved drafts yet.</p>\n          <div class=\"form-draft-list\" *ngIf=\"draftLibraryItems().length\">\n            <div class=\"form-draft-list__item\" *ngFor=\"let draft of draftLibraryItems()\">\n              <span class=\"form-draft-list__title\">{{ draft.title }}</span>\n              <span class=\"form-draft-list__meta\">{{ draft.subtitle || 'No account' }} \u00B7 {{ formatDraftTimestamp(draft.updatedAtUtc) }}</span>\n              <span class=\"form-draft-list__actions\">\n                <button type=\"button\" class=\"form-draft-list__resume\" (click)=\"openDraftFromSummary(draft)\">Resume</button>\n                <button type=\"button\" class=\"form-draft-list__discard\" (click)=\"discardDraft(draft, $event)\">Discard</button>\n              </span>\n            </div>\n          </div>\n        </div>\n      </p-dialog>\n      <div class=\"form-header\">\n        <div class=\"header-content\">\n          <app-breadcrumbs></app-breadcrumbs>\n\n          <button type=\"button\" class=\"back-link\" routerLink=\"/app/deals\">\n            <i class=\"pi pi-arrow-left\"></i>\n            Back to Deals\n          </button>\n\n          <div class=\"header-row\">\n            <div class=\"header-title\">\n              <h1 class=\"hero-title\">\n                <span class=\"title-gradient\">{{ isEditMode() ? 'Update' : 'Create' }}</span>\n                <span class=\"title-light\">Deal</span>\n              </h1>\n              <p>Capture the deal details, set your stage, and keep the team aligned on next steps.</p>\n              <div class=\"deal-header-progress\" *ngIf=\"isEditMode()\">\n                <div class=\"deal-header-progress__dial\">\n                  <p-knob\n                    [ngModel]=\"dealHeaderScoreValue()\"\n                    [readonly]=\"true\"\n                    [valueTemplate]=\"'{value}%'\"\n                    [size]=\"92\"\n                    [strokeWidth]=\"9\"\n                    [showValue]=\"true\"\n                    [min]=\"0\"\n                    [max]=\"100\"\n                    valueColor=\"var(--deal-header-score-color)\"\n                    rangeColor=\"rgba(148, 163, 184, 0.18)\"\n                    textColor=\"#1e293b\"\n                    styleClass=\"deal-header-progress__knob\"\n                  ></p-knob>\n                </div>\n                <div class=\"deal-header-progress__content\" [style.--deal-header-score-color]=\"dealHeaderScoreColor()\">\n                  <span class=\"deal-header-progress__eyebrow\">Overall deal score</span>\n                  <div class=\"deal-header-progress__meta\">\n                    <span class=\"deal-header-progress__status\">{{ selectedStage || 'Prospecting' }}</span>\n                    <span class=\"deal-header-progress__step\">{{ dealHeaderStageSummary() }}</span>\n                  </div>\n                  <p class=\"deal-header-progress__copy\">{{ dealHeaderScoreMessage() }}</p>\n                </div>\n              </div>\n              <div class=\"form-draft-status\" *ngIf=\"draftStatusMessage() as draftStatus\">\n                <i class=\"pi pi-bookmark\"></i>\n                <span>{{ draftStatus }}</span>\n              </div>\n              <div class=\"form-draft-banner\" *ngIf=\"draftModeActive()\">\n                <i class=\"pi pi-info-circle\"></i>\n                <span>This form is loaded from a saved draft. Final Save will create or update the live CRM record.</span>\n              </div>\n              <div class=\"presence-focus\" *ngIf=\"isEditMode() && visiblePresenceUsers().length\">\n                <i class=\"pi pi-eye\"></i>\n                <span>{{ viewingPresenceSummary() }}</span>\n              </div>\n              <div class=\"presence-editing-note\" *ngIf=\"isEditMode() && activeEditors().length\">\n                <i class=\"pi pi-pencil\"></i>\n                <span>{{ editingPresenceSummary() }}</span>\n              </div>\n            </div>\n            <div class=\"header-meta\">\n              <span class=\"meta-chip\">\n                <i class=\"pi pi-flag\"></i>\n                {{ selectedStage || 'Prospecting' }}\n              </span>\n              <span class=\"meta-chip\">\n                <i class=\"pi pi-percentage\"></i>\n                {{ form.probability ?? 0 }}%\n              </span>\n              <span class=\"meta-chip\">\n                <i class=\"pi pi-money-bill\"></i>\n                {{ form.currency || resolveCurrencyCode() }}\n              </span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"policy-gate-banner\" *ngIf=\"policyGateMessage() as gateMessage\">\n        <i class=\"pi pi-shield\"></i>\n        <div>\n          <strong>Policy gate triggered</strong>\n          <p>{{ gateMessage }}</p>\n        </div>\n        <div class=\"policy-gate-actions\" *ngIf=\"canRequestStageOverride()\">\n          <button\n            pButton\n            type=\"button\"\n            class=\"policy-gate-action-button\"\n            icon=\"pi pi-send\"\n            [label]=\"stageOverrideRequesting() ? 'Submitting...' : 'Request Stage Override'\"\n            [loading]=\"stageOverrideRequesting()\"\n            [disabled]=\"stageOverrideRequesting()\"\n            (click)=\"requestStageOverride()\">\n          </button>\n        </div>\n      </div>\n\n      <section class=\"decision-review-banner\" *ngIf=\"decisionReviewMode()\">\n        <i class=\"pi pi-eye\"></i>\n        <div>\n          <strong>Decision review mode</strong>\n          <p>This record is opened from Pending Action in read-only mode. Use the review panel to decide or send back.</p>\n        </div>\n      </section>\n\n      <section class=\"decision-review-banner approval-lock-banner\" *ngIf=\"requesterApprovalLocked() && !decisionReviewMode()\">\n        <i class=\"pi pi-lock\"></i>\n        <div>\n          <strong>Approval Pending - Record Locked</strong>\n          <p>This deal is read-only for all users until the pending approval is approved or rejected.</p>\n        </div>\n      </section>\n\n      <section class=\"related-summary\" *ngIf=\"isEditMode()\">\n        <div class=\"related-summary-label\">Related record</div>\n        <div class=\"related-summary-links\" *ngIf=\"accountLink() as link; else noAccountSummary\">\n          <a class=\"related-summary-link\" [routerLink]=\"link\">\n            <i class=\"pi pi-building\"></i>\n            Account: {{ accountLabel() }}\n          </a>\n        </div>\n        <ng-template #noAccountSummary>\n          <span class=\"related-summary-empty\">No linked account yet.</span>\n        </ng-template>\n      </section>\n\n      <div class=\"form-body\">\n        <section class=\"deal-sticky-summary\">\n          <div class=\"metric-card metric-card--total\">\n            <div class=\"metric-icon\">\n              <i class=\"pi pi-briefcase\"></i>\n            </div>\n            <div class=\"metric-content\">\n              <span class=\"metric-label\">Deal</span>\n              <strong class=\"metric-value\">{{ form.name || 'Untitled deal' }}</strong>\n            </div>\n          </div>\n          <div class=\"metric-card metric-card--leads\">\n            <div class=\"metric-icon\">\n              <i class=\"pi pi-flag\"></i>\n            </div>\n            <div class=\"metric-content\">\n              <span class=\"metric-label\">Stage</span>\n              <strong class=\"metric-value\">{{ selectedStage || 'Prospecting' }}</strong>\n            </div>\n          </div>\n          <div class=\"metric-card metric-card--prospects\">\n            <div class=\"metric-icon\">\n              <i class=\"pi pi-money-bill\"></i>\n            </div>\n            <div class=\"metric-content\">\n              <span class=\"metric-label\">Amount</span>\n              <strong class=\"metric-value\">{{ (form.amount || 0) | currency:resolveCurrencyCode():'symbol':'1.0-0' }}</strong>\n            </div>\n          </div>\n          <div class=\"metric-card metric-card--customers\">\n            <div class=\"metric-icon\">\n              <i class=\"pi pi-user\"></i>\n            </div>\n            <div class=\"metric-content\">\n              <span class=\"metric-label\">Owner</span>\n              <strong class=\"metric-value\">{{ dealOwnerLabel() }}</strong>\n            </div>\n          </div>\n          <div class=\"metric-card metric-card--risk\">\n            <div class=\"metric-icon\">\n              <i class=\"pi pi-shield\"></i>\n            </div>\n            <div class=\"metric-content\">\n              <span class=\"metric-label\">Risk</span>\n              <span\n                class=\"opportunity-accordion-badge metric-card__status-badge\"\n                [class]=\"'opportunity-accordion-badge metric-card__status-badge opportunity-accordion-badge--' + dealRiskSummary().tone\"\n                [title]=\"dealRiskSummary().detail || ''\"\n              >\n                {{ dealRiskSummary().label }}\n              </span>\n            </div>\n          </div>\n          <div class=\"metric-card metric-card--approval\">\n            <div class=\"metric-icon\">\n              <i class=\"pi pi-lock\"></i>\n            </div>\n            <div class=\"metric-content\">\n              <span class=\"metric-label\">Approval</span>\n              <span\n                class=\"opportunity-accordion-badge metric-card__status-badge\"\n                [class]=\"'opportunity-accordion-badge metric-card__status-badge opportunity-accordion-badge--' + currentApprovalStatusTone()\"\n                [title]=\"approvalPendingSummaryDetail()\"\n              >\n                {{ requesterApprovalLocked() ? 'Approval Pending' : currentApprovalStatusLabel() }}\n              </span>\n            </div>\n          </div>\n        </section>\n\n\n        <form class=\"form-layout\" [class.form-layout--read-only]=\"decisionReviewMode() || requesterApprovalLocked()\" (ngSubmit)=\"onSave()\">\n          <fieldset\n            class=\"form-lock-fieldset\"\n            [disabled]=\"decisionReviewMode() || requesterApprovalLocked()\"\n            [attr.aria-busy]=\"decisionReviewMode() || requesterApprovalLocked()\"\n          >\n            <p-tabs class=\"deal-tabs-shell\" [value]=\"activeTab()\" (valueChange)=\"onActiveTabChange($event)\">\n              <p-tablist class=\"deal-tabs\">\n                @for (tab of tabOrder; track tab) {\n                  @if (isTabVisible(tab)) {\n                    <p-tab [value]=\"tab\" [pt]=\"{ root: { class: 'deal-tab' } }\">\n                      <span class=\"deal-tab-label\">\n                        <i [class]=\"tabMeta[tab].icon\"></i>\n                        <span>{{ tabMeta[tab].label }}</span>\n                      </span>\n                    </p-tab>\n                  }\n                }\n              </p-tablist>\n              <p-tabpanels>\n\n                <!-- CORE tab -->\n                <p-tabpanel value=\"core\">\n                  <p-accordion\n                    class=\"opportunity-section-accordion\"\n                    [multiple]=\"true\"\n                    [value]=\"tabSectionPanels('core')\"\n                    (valueChange)=\"onTabAccordionChange('core', $event)\"\n                  >\n            <p-accordion-panel value=\"opportunity-details\" [disabled]=\"isSectionLocked('opportunity-details')\" [attr.data-deal-section]=\"'opportunity-details'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-briefcase\"></i>\n                    Deal Details\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span class=\"opportunity-accordion-badge\">{{ opportunityDetailsBadge() }}</span>\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + sectionStatusTone('opportunity-details')\"\n                    >\n                      {{ sectionStatusLabel('opportunity-details') }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n          <section class=\"form-card opportunity-accordion-card\">\n            <div class=\"form-grid\">\n              <div class=\"form-field\">\n                <label for=\"oppName\">Deal name <span class=\"required\">*</span></label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                    <i class=\"pi pi-tag\"></i>\n                  </p-inputgroup-addon>\n                  <input\n                    pInputText\n                    id=\"oppName\"\n                    name=\"name\"\n                    [(ngModel)]=\"form.name\"\n                    required\n                    placeholder=\"ACME rollout\"\n                  />\n                </p-inputgroup>\n                <p class=\"field-error\" *ngIf=\"dealNameError()\">{{ dealNameError() }}</p>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppAccount\">Account</label>\n                <p-select\n                  inputId=\"oppAccount\"\n                  appendTo=\"body\"\n                  [options]=\"accountOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"accountId\"\n                  [(ngModel)]=\"form.accountId\"\n                  placeholder=\"Select account\"\n                  styleClass=\"w-full\"\n                ></p-select>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppStage\">Stage *</label>\n                <p-select\n                  inputId=\"oppStage\"\n                  appendTo=\"body\"\n                  [options]=\"stageOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"stage\"\n                  [(ngModel)]=\"selectedStage\"\n                  (ngModelChange)=\"onStageChange($event)\"\n                  placeholder=\"Pick stage\"\n                  styleClass=\"w-full\"\n                ></p-select>\n                <small class=\"field-hint\" *ngIf=\"stageRequirementHint() as stageHint\">{{ stageHint }}</small>\n                <small class=\"field-hint\" *ngIf=\"demoOutcomeGuidance() as guidance\">{{ guidance }}</small>\n                <small class=\"field-hint\" *ngIf=\"discoveryGuidance() as discoveryGuidance\">{{ discoveryGuidance }}</small>\n                <small class=\"field-hint\" *ngIf=\"decisionMakerGuidance() as decisionGuidance\">{{ decisionGuidance }}</small>\n                <small class=\"field-hint\" *ngIf=\"selectedStage === 'Commit'\">Commit requires an expected close date and verified checklist items.</small>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppClose\">Expected close</label>\n                <p-datePicker\n                  inputId=\"oppClose\"\n                  appendTo=\"body\"\n                  name=\"closeDate\"\n                  [(ngModel)]=\"form.expectedCloseDate\"\n                  [showIcon]=\"true\"\n                  styleClass=\"w-full\"\n                ></p-datePicker>\n              </div>\n            </div>\n          </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel value=\"deal-settings\" [disabled]=\"isSectionLocked('deal-settings')\" [attr.data-deal-section]=\"'deal-settings'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-chart-line\"></i>\n                    Deal Settings\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + amountApprovalBadge().tone\"\n                    >\n                      {{ dealSettingsHeaderBadge() }}\n                    </span>\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + sectionStatusTone('deal-settings')\"\n                    >\n                      {{ sectionStatusLabel('deal-settings') }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n          <section class=\"form-card opportunity-accordion-card\">\n            <div class=\"form-grid\">\n              <div class=\"form-field\">\n                <div class=\"field-label-row\">\n                  <label for=\"oppAmount\">Amount</label>\n                  <span\n                    class=\"approval-requirement-badge\"\n                    [class]=\"'approval-requirement-badge approval-requirement-badge--' + amountApprovalBadge().tone\"\n                    [title]=\"amountApprovalBadge().detail || ''\"\n                  >\n                    {{ amountApprovalBadge().label }}\n                  </span>\n                </div>\n                <p-inputNumber\n                  inputId=\"oppAmount\"\n                  [(ngModel)]=\"form.amount\"\n                  name=\"amount\"\n                  (ngModelChange)=\"syncApprovalAmount()\"\n                  mode=\"currency\"\n                  [currency]=\"resolveCurrency(form.currency)\"\n                  placeholder=\"0\"\n                  class=\"w-full\"\n                ></p-inputNumber>\n                <small class=\"field-hint\" *ngIf=\"amountApprovalBadge().detail\">{{ amountApprovalBadge().detail }}</small>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppCurrency\">Currency</label>\n                <p-select\n                  inputId=\"oppCurrency\"\n                  appendTo=\"body\"\n                  [options]=\"currencyOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"currency\"\n                  [(ngModel)]=\"form.currency\"\n                  (ngModelChange)=\"onCurrencyChange($event)\"\n                  placeholder=\"Currency\"\n                  styleClass=\"w-full\"\n                ></p-select>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppProbability\">Probability (%)</label>\n                <p-inputNumber\n                  inputId=\"oppProbability\"\n                  [(ngModel)]=\"form.probability\"\n                  name=\"probability\"\n                  suffix=\"%\"\n                  [min]=\"0\"\n                  [max]=\"100\"\n                  class=\"w-full\"\n                ></p-inputNumber>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppForecast\">Forecast category</label>\n                <p-select\n                  inputId=\"oppForecast\"\n                  appendTo=\"body\"\n                  [options]=\"forecastCategoryOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"forecastCategory\"\n                  [(ngModel)]=\"form.forecastCategory\"\n                  placeholder=\"Select forecast\"\n                  [disabled]=\"isForecastLocked()\"\n                  styleClass=\"w-full\"\n                ></p-select>\n                <small class=\"field-hint\" *ngIf=\"forecastGuidance() as guidance\">{{ guidance }}</small>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppType\">Deal type</label>\n                <p-select\n                  inputId=\"oppType\"\n                  appendTo=\"body\"\n                  [options]=\"opportunityTypeOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"opportunityType\"\n                  [(ngModel)]=\"form.opportunityType\"\n                  placeholder=\"Type\"\n                  styleClass=\"w-full\"\n                ></p-select>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppContractStart\">Contract start</label>\n                <p-datePicker\n                  inputId=\"oppContractStart\"\n                  appendTo=\"body\"\n                  name=\"contractStartDateUtc\"\n                  [(ngModel)]=\"form.contractStartDateUtc\"\n                  [showIcon]=\"true\"\n                  styleClass=\"w-full\"\n                ></p-datePicker>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppContractEnd\">Contract end</label>\n                <p-datePicker\n                  inputId=\"oppContractEnd\"\n                  appendTo=\"body\"\n                  name=\"contractEndDateUtc\"\n                  [(ngModel)]=\"form.contractEndDateUtc\"\n                  [showIcon]=\"true\"\n                  styleClass=\"w-full\"\n                ></p-datePicker>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppReason\">Win/Loss reason</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                    <i class=\"pi pi-info-circle\"></i>\n                  </p-inputgroup-addon>\n                  <input\n                    pInputText\n                    id=\"oppReason\"\n                    name=\"reason\"\n                    [(ngModel)]=\"form.winLossReason\"\n                    placeholder=\"Optional\"\n                  />\n                </p-inputgroup>\n              </div>\n              <div class=\"form-field full-row\">\n                <label for=\"oppSummary\">Summary</label>\n                <textarea\n                  pTextarea\n                  id=\"oppSummary\"\n                  rows=\"4\"\n                  name=\"summary\"\n                  [(ngModel)]=\"form.summary\"\n                  placeholder=\"Key notes, stakeholders, risks\"\n                  class=\"w-full\"\n                ></textarea>\n                <small class=\"field-hint\" *ngIf=\"isPainConfirmationRequired()\">Required before moving to Qualification or later stages.</small>\n              </div>\n              <div class=\"form-field full-row\">\n                <label>Requirements <span class=\"required\" *ngIf=\"isQualificationFitRequired()\">*</span></label>\n                <textarea\n                  pTextarea\n                  rows=\"3\"\n                  name=\"requirements\"\n                  [(ngModel)]=\"form.requirements\"\n                  placeholder=\"Key requirements, scope, constraints\"\n                  class=\"w-full\"\n                ></textarea>\n              </div>\n              <div class=\"form-field full-row\">\n                <label>Buying process <span class=\"required\" *ngIf=\"isQualificationFitRequired()\">*</span></label>\n                <textarea\n                  pTextarea\n                  rows=\"3\"\n                  name=\"buyingProcess\"\n                  [(ngModel)]=\"form.buyingProcess\"\n                  placeholder=\"Decision steps, stakeholders, approvals\"\n                  class=\"w-full\"\n                ></textarea>\n              </div>\n              <div class=\"form-field full-row\">\n                <label>Success criteria <span class=\"required\" *ngIf=\"isQualificationFitRequired()\">*</span></label>\n                <textarea\n                  pTextarea\n                  rows=\"3\"\n                  name=\"successCriteria\"\n                  [(ngModel)]=\"form.successCriteria\"\n                  placeholder=\"What must be true for a win\"\n                  class=\"w-full\"\n                ></textarea>\n              </div>\n            </div>\n          </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n                  </p-accordion>\n                </p-tabpanel>\n\n                <!-- COMMERCIAL tab -->\n                <p-tabpanel value=\"commercial\">\n                  <p-accordion\n                    class=\"opportunity-section-accordion\"\n                    [multiple]=\"true\"\n                    [value]=\"tabSectionPanels('commercial')\"\n                    (valueChange)=\"onTabAccordionChange('commercial', $event)\"\n                  >\n            <p-accordion-panel value=\"pricing-discounts\" [disabled]=\"isSectionLocked('pricing-discounts')\" [attr.data-deal-section]=\"'pricing-discounts'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-percentage\"></i>\n                    Pricing & Discounts\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + discountApprovalBadge().tone\"\n                    >\n                      {{ pricingHeaderBadge() }}\n                    </span>\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + sectionStatusTone('pricing-discounts')\"\n                    >\n                      {{ sectionStatusLabel('pricing-discounts') }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n          <section class=\"form-card opportunity-accordion-card\">\n            <div class=\"form-grid\">\n              <div class=\"form-field\">\n                <div class=\"field-label-row\">\n                  <label for=\"oppDiscountPercent\">Discount (%)</label>\n                  <span\n                    class=\"approval-requirement-badge\"\n                    [class]=\"'approval-requirement-badge approval-requirement-badge--' + discountApprovalBadge().tone\"\n                    [title]=\"discountApprovalBadge().detail || ''\"\n                  >\n                    {{ discountApprovalBadge().label }}\n                  </span>\n                </div>\n                <p-inputNumber\n                  inputId=\"oppDiscountPercent\"\n                  [(ngModel)]=\"form.discountPercent\"\n                  name=\"discountPercent\"\n                  suffix=\"%\"\n                  [min]=\"0\"\n                  [max]=\"100\"\n                  class=\"w-full\"\n                ></p-inputNumber>\n                <small class=\"field-hint\" *ngIf=\"discountApprovalBadge().detail\">{{ discountApprovalBadge().detail }}</small>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppDiscountAmount\">Discount Amount</label>\n                <p-inputNumber\n                  inputId=\"oppDiscountAmount\"\n                  [(ngModel)]=\"form.discountAmount\"\n                  name=\"discountAmount\"\n                  (ngModelChange)=\"syncApprovalAmount()\"\n                  mode=\"currency\"\n                  [currency]=\"resolveCurrency(form.currency)\"\n                  placeholder=\"0\"\n                  class=\"w-full\"\n                ></p-inputNumber>\n              </div>\n              <div class=\"form-field full-row\">\n                <label for=\"oppPricingNotes\">Pricing notes & objections</label>\n                <textarea\n                  pTextarea\n                  id=\"oppPricingNotes\"\n                  rows=\"3\"\n                  name=\"pricingNotes\"\n                  [(ngModel)]=\"form.pricingNotes\"\n                  placeholder=\"Discount rationale, objections, approvals, or constraints\"\n                  class=\"w-full\"\n                ></textarea>\n              </div>\n            </div>\n          </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel *ngIf=\"isSectionVisible('quote-proposal')\" value=\"quote-proposal\" [disabled]=\"isSectionLocked('quote-proposal')\" [attr.data-deal-section]=\"'quote-proposal'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-file-edit\"></i>\n                    Quote / Proposal\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span class=\"opportunity-accordion-badge\">{{ proposalHeaderBadge() }}</span>\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + sectionStatusTone('quote-proposal')\"\n                    >\n                      {{ sectionStatusLabel('quote-proposal') }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n          <section class=\"form-card opportunity-accordion-card\">\n            <p class=\"section-subtitle\">Generate and track the proposal before sending to the customer.</p>\n            <div class=\"form-grid\">\n              <div class=\"form-field\">\n                <label for=\"oppProposalStatus\">Proposal status</label>\n                <p-select\n                  inputId=\"oppProposalStatus\"\n                  appendTo=\"body\"\n                  [options]=\"proposalStatusOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"proposalStatus\"\n                  [(ngModel)]=\"form.proposalStatus\"\n                  placeholder=\"Select status\"\n                  styleClass=\"w-full\"\n                ></p-select>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppProposalLink\">Proposal link</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--website\">\n                    <i class=\"pi pi-link\"></i>\n                  </p-inputgroup-addon>\n                  <input\n                    pInputText\n                    id=\"oppProposalLink\"\n                    name=\"proposalLink\"\n                    [(ngModel)]=\"form.proposalLink\"\n                    placeholder=\"Paste proposal URL\"\n                  />\n                </p-inputgroup>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppProposalGenerated\">Generated on</label>\n                <p-datePicker\n                  inputId=\"oppProposalGenerated\"\n                  [(ngModel)]=\"form.proposalGeneratedAtUtc\"\n                  name=\"proposalGeneratedAtUtc\"\n                  [showIcon]=\"true\"\n                  appendTo=\"body\"\n                  class=\"w-full\"\n                ></p-datePicker>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppProposalSent\">Sent on</label>\n                <p-datePicker\n                  inputId=\"oppProposalSent\"\n                  [(ngModel)]=\"form.proposalSentAtUtc\"\n                  name=\"proposalSentAtUtc\"\n                  [showIcon]=\"true\"\n                  appendTo=\"body\"\n                  class=\"w-full\"\n                ></p-datePicker>\n              </div>\n              <div class=\"form-field full-row\">\n                <label for=\"oppProposalNotes\">Proposal summary</label>\n                <textarea\n                  pTextarea\n                  id=\"oppProposalNotes\"\n                  rows=\"3\"\n                  name=\"proposalNotes\"\n                  [(ngModel)]=\"form.proposalNotes\"\n                  placeholder=\"Scope summary, key terms, or customer notes\"\n                  class=\"w-full\"\n                ></textarea>\n              </div>\n            </div>\n            <div class=\"quote-workspace\">\n              <div class=\"quote-workspace__header\">\n                <h4>Quote Workspace</h4>\n                <span class=\"field-hint\" *ngIf=\"activeQuote\">Quote #{{ activeQuote.quoteNumber }}</span>\n              </div>\n              <div class=\"form-grid\">\n                <div class=\"form-field\">\n                  <label for=\"oppQuoteSelect\">Quote draft</label>\n                  <p-select\n                    inputId=\"oppQuoteSelect\"\n                    appendTo=\"body\"\n                    [options]=\"quoteSummaries\"\n                    optionLabel=\"name\"\n                    optionValue=\"id\"\n                    [showClear]=\"true\"\n                    [ngModel]=\"selectedQuoteId\"\n                    name=\"quoteSelect\"\n                    (ngModelChange)=\"onQuoteSelectionChange($event)\"\n                    placeholder=\"Select quote\"\n                    styleClass=\"w-full\"\n                  ></p-select>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"oppQuoteName\">Quote name</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                      <i class=\"pi pi-tag\"></i>\n                    </p-inputgroup-addon>\n                    <input\n                      pInputText\n                      id=\"oppQuoteName\"\n                      [(ngModel)]=\"quoteName\"\n                      name=\"quoteName\"\n                      placeholder=\"Quote name\"\n                    />\n                  </p-inputgroup>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"oppQuotePriceList\">Price list</label>\n                  <p-select\n                    inputId=\"oppQuotePriceList\"\n                    appendTo=\"body\"\n                    [options]=\"priceListOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    [(ngModel)]=\"quotePriceListId\"\n                    name=\"quotePriceListId\"\n                    placeholder=\"Select price list\"\n                    styleClass=\"w-full\"\n                  ></p-select>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"oppQuoteTax\">Tax amount</label>\n                  <p-inputNumber\n                    inputId=\"oppQuoteTax\"\n                    [(ngModel)]=\"quoteTaxAmount\"\n                    name=\"quoteTaxAmount\"\n                    mode=\"currency\"\n                    [currency]=\"resolveCurrency(quoteCurrency || form.currency)\"\n                    class=\"w-full\"\n                  ></p-inputNumber>\n                </div>\n              </div>\n\n              <div class=\"quote-lines\" *ngIf=\"quoteLines.length; else emptyQuoteLines\">\n                <div class=\"quote-line quote-line--header\">\n                  <span>Product</span>\n                  <span>Description</span>\n                  <span>Qty</span>\n                  <span>Unit Price</span>\n                  <span>Disc %</span>\n                  <span>Total</span>\n                  <span></span>\n                </div>\n                <div class=\"quote-line\" *ngFor=\"let line of quoteLines; let i = index\">\n                  <p-select\n                    appendTo=\"body\"\n                    [options]=\"itemOptionsForLine(line)\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    [(ngModel)]=\"line.itemMasterId\"\n                    name=\"quoteItem{{ i }}\"\n                    placeholder=\"Item\"\n                    (ngModelChange)=\"onQuoteItemChanged(i)\"\n                    styleClass=\"w-full\"\n                  >\n                    <ng-template pTemplate=\"item\" let-option>\n                      <div class=\"quote-item-option\">\n                        <span>{{ option.label }}</span>\n                        <span class=\"quote-item-option__badges\">\n                          <span class=\"quote-item-type-pill\" [ngClass]=\"option.itemType === 'Service' ? 'service' : 'product'\">\n                            {{ option.itemType || 'Product' }}\n                          </span>\n                          <span class=\"quote-item-type-pill inactive\" *ngIf=\"option.inactive\">Inactive</span>\n                        </span>\n                      </div>\n                    </ng-template>\n                    <ng-template pTemplate=\"value\" let-option>\n                      <div class=\"quote-item-option\" *ngIf=\"option\">\n                        <span>{{ option.label }}</span>\n                        <span class=\"quote-item-option__badges\">\n                          <span class=\"quote-item-type-pill\" [ngClass]=\"option.itemType === 'Service' ? 'service' : 'product'\">\n                            {{ option.itemType || 'Product' }}\n                          </span>\n                        </span>\n                      </div>\n                      <span class=\"select-placeholder\" *ngIf=\"!option\">Item</span>\n                    </ng-template>\n                  </p-select>\n                  <input\n                    pInputText\n                    [(ngModel)]=\"line.description\"\n                    name=\"quoteDescription{{ i }}\"\n                    (ngModelChange)=\"onQuoteLineChanged()\"\n                    placeholder=\"Line description\"\n                    class=\"w-full\"\n                  />\n                  <p-inputNumber\n                    [(ngModel)]=\"line.quantity\"\n                    name=\"quoteQty{{ i }}\"\n                    [min]=\"1\"\n                    (ngModelChange)=\"onQuoteLineChanged()\"\n                    class=\"w-full\"\n                  ></p-inputNumber>\n                  <p-inputNumber\n                    [(ngModel)]=\"line.unitPrice\"\n                    name=\"quoteUnitPrice{{ i }}\"\n                    mode=\"currency\"\n                    [currency]=\"resolveCurrency(quoteCurrency || form.currency)\"\n                    (ngModelChange)=\"onQuoteLineChanged()\"\n                    class=\"w-full\"\n                  ></p-inputNumber>\n                  <p-inputNumber\n                    [(ngModel)]=\"line.discountPercent\"\n                    name=\"quoteDiscount{{ i }}\"\n                    suffix=\"%\"\n                    [min]=\"0\"\n                    [max]=\"100\"\n                    (ngModelChange)=\"onQuoteLineChanged()\"\n                    class=\"w-full\"\n                  ></p-inputNumber>\n                  <p-inputNumber\n                    [ngModel]=\"line.lineTotal\"\n                    [ngModelOptions]=\"{standalone: true}\"\n                    [disabled]=\"true\"\n                    mode=\"currency\"\n                    [currency]=\"resolveCurrency(quoteCurrency || form.currency)\"\n                    class=\"w-full\"\n                  ></p-inputNumber>\n                  <button type=\"button\" class=\"btn-glass btn-icon\" (click)=\"removeQuoteLine(i)\">\n                    <i class=\"pi pi-times\"></i>\n                  </button>\n                </div>\n              </div>\n              <ng-template #emptyQuoteLines>\n                <p class=\"empty-state\">No quote lines yet. Add products to build this quote.</p>\n              </ng-template>\n\n              <div class=\"quote-summary\">\n                <span>Subtotal: {{ quoteSubtotal() | number: '1.2-2' }}</span>\n                <span>Discount: {{ quoteDiscountAmount() | number: '1.2-2' }}</span>\n                <span>Total: {{ quoteTotal() | number: '1.2-2' }}</span>\n              </div>\n              <div class=\"proposal-preview-card\" *ngIf=\"proposalPreviewUrl() as proposalUrl\">\n                <div class=\"proposal-preview-card__info\">\n                  <span class=\"proposal-preview-card__label\">Proposal file ready</span>\n                  <a class=\"proposal-preview-card__link\" [href]=\"proposalUrl\" target=\"_blank\" rel=\"noopener\">\n                    {{ form.proposalLink }}\n                  </a>\n                </div>\n                <div class=\"proposal-preview-card__actions\">\n                  <a\n                    pButton\n                    [href]=\"proposalUrl\"\n                    target=\"_blank\"\n                    rel=\"noopener\"\n                    class=\"p-button-sm p-button-text\"\n                    icon=\"pi pi-eye\"\n                    label=\"Preview\"\n                  ></a>\n                  <a\n                    pButton\n                    [href]=\"proposalUrl\"\n                    target=\"_blank\"\n                    rel=\"noopener\"\n                    download\n                    class=\"p-button-sm\"\n                    icon=\"pi pi-download\"\n                    label=\"Download\"\n                  ></a>\n                </div>\n              </div>\n              <div class=\"proposal-activity-card\" *ngIf=\"proposalActivityTimeline().length\">\n                <h5>Proposal activity</h5>\n                <div class=\"proposal-activity-row\" *ngFor=\"let event of proposalActivityTimeline()\">\n                  <div class=\"proposal-activity-row__title\">\n                    {{ proposalActivityLabel(event) }}\n                    <span *ngIf=\"event.field === 'ProposalSentTo' && event.newValue\">to {{ event.newValue }}</span>\n                  </div>\n                  <div class=\"proposal-activity-row__meta\">\n                    <span>{{ event.createdAtUtc | date: 'medium' }}</span>\n                    <span *ngIf=\"event.changedByName\">by {{ event.changedByName }}</span>\n                    <button\n                      *ngIf=\"event.action === 'ProposalSent' && isLatestProposalSentEvent(event)\"\n                      pButton\n                      type=\"button\"\n                      class=\"p-button-sm p-button-text\"\n                      icon=\"pi pi-replay\"\n                      label=\"Resend\"\n                      (click)=\"resendProposalFromActivity(event)\"\n                    ></button>\n                    <span\n                      *ngIf=\"isRecentlyResentEvent(event)\"\n                      class=\"proposal-resent-chip\"\n                    >\n                      <i class=\"pi pi-check\"></i>\n                      Resent just now\n                    </span>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"team-actions\">\n              <button type=\"button\" class=\"btn-glass\" (click)=\"addQuoteLine()\">\n                <i class=\"pi pi-plus\"></i>\n                Add line\n              </button>\n              <button type=\"button\" class=\"btn-glass btn-primary\" [disabled]=\"quoteSaving()\" (click)=\"saveQuoteAsDraft()\">\n                <i class=\"pi pi-save\"></i>\n                Save quote\n              </button>\n              <button\n                type=\"button\"\n                class=\"btn-glass\"\n                [disabled]=\"quoteApprovalSubmitting() || !selectedQuoteId\"\n                (click)=\"submitQuoteForApproval()\"\n              >\n                <i class=\"pi pi-check-circle\"></i>\n                Submit for approval\n              </button>\n              <button type=\"button\" class=\"btn-glass\" [disabled]=\"proposalGenerating() || !selectedQuoteId\" (click)=\"generateProposal()\">\n                <i class=\"pi pi-file\"></i>\n                {{ proposalGenerating() ? 'Generating...' : 'Generate proposal' }}\n              </button>\n              <button type=\"button\" class=\"btn-glass\" [disabled]=\"proposalSending() || !selectedQuoteId || !proposalPreviewUrl()\" (click)=\"openSendProposalDialog()\">\n                <i class=\"pi pi-send\"></i>\n                {{ proposalSending() ? 'Sending...' : 'Send proposal' }}\n              </button>\n            </div>\n            <p class=\"proposal-send-hint\" *ngIf=\"selectedQuoteId && !proposalPreviewUrl()\">\n              Generate proposal first to enable sending.\n            </p>\n            <p-dialog\n              header=\"Send Proposal\"\n              [(visible)]=\"proposalSendDialogVisible\"\n              [modal]=\"true\"\n              [draggable]=\"false\"\n              [resizable]=\"false\"\n              [style]=\"{ width: '34rem', maxWidth: '95vw' }\"\n            >\n              <div class=\"proposal-send-dialog\">\n                <div class=\"form-field\">\n                  <label for=\"proposalSendRecipient\">Recipient email (optional)</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--email\">\n                      <i class=\"pi pi-envelope\"></i>\n                    </p-inputgroup-addon>\n                    <input\n                      pInputText\n                      id=\"proposalSendRecipient\"\n                      [(ngModel)]=\"proposalSendRecipient\"\n                      name=\"proposalSendRecipient\"\n                      placeholder=\"Leave empty to use primary contact email\"\n                    />\n                  </p-inputgroup>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"proposalSendMessage\">Message (optional)</label>\n                  <textarea\n                    pTextarea\n                    id=\"proposalSendMessage\"\n                    [(ngModel)]=\"proposalSendMessage\"\n                    name=\"proposalSendMessage\"\n                    class=\"w-full\"\n                    rows=\"4\"\n                    placeholder=\"Add a short custom message\"\n                  ></textarea>\n                </div>\n                <div class=\"proposal-send-dialog__actions\">\n                  <button\n                    pButton\n                    type=\"button\"\n                    class=\"p-button-text\"\n                    label=\"Cancel\"\n                    icon=\"pi pi-times\"\n                    (click)=\"proposalSendDialogVisible = false\"\n                  ></button>\n                  <button\n                    pButton\n                    type=\"button\"\n                    label=\"{{ proposalSending() ? 'Sending...' : 'Send proposal' }}\"\n                    icon=\"pi pi-send\"\n                    [disabled]=\"proposalSending()\"\n                    (click)=\"markProposalSent()\"\n                  ></button>\n                </div>\n              </div>\n            </p-dialog>\n          </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel value=\"revenue-forecast\" [attr.data-deal-section]=\"'revenue-forecast'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-chart-bar\"></i>\n                    Revenue Forecast\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span class=\"opportunity-accordion-badge opportunity-accordion-badge--info\">\n                      {{ forecastMetrics().weightedValue | currency:form.currency:'symbol':'1.0-0' }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-card opportunity-accordion-card revenue-forecast-section\">\n                  <div class=\"revenue-forecast\" *ngIf=\"(form.amount ?? 0) > 0; else noForecastData\">\n                    <!-- Metric summary cards -->\n                    <div class=\"forecast-metrics\">\n                      <div class=\"forecast-metric forecast-metric--primary\">\n                        <span class=\"forecast-metric__label\">Deal Value</span>\n                        <strong class=\"forecast-metric__value\">{{ forecastMetrics().amount | currency:form.currency:'symbol':'1.0-0' }}</strong>\n                      </div>\n                      <div class=\"forecast-metric forecast-metric--success\">\n                        <span class=\"forecast-metric__label\">Net Amount</span>\n                        <strong class=\"forecast-metric__value\">{{ forecastMetrics().netAmount | currency:form.currency:'symbol':'1.0-0' }}</strong>\n                      </div>\n                      <div class=\"forecast-metric forecast-metric--info\">\n                        <span class=\"forecast-metric__label\">Weighted Revenue</span>\n                        <strong class=\"forecast-metric__value\">{{ forecastMetrics().weightedValue | currency:form.currency:'symbol':'1.0-0' }}</strong>\n                      </div>\n                      <div class=\"forecast-metric forecast-metric--warn\" *ngIf=\"forecastMetrics().discount > 0\">\n                        <span class=\"forecast-metric__label\">Discount</span>\n                        <strong class=\"forecast-metric__value\">{{ forecastMetrics().discount | currency:form.currency:'symbol':'1.0-0' }}</strong>\n                      </div>\n                      <div class=\"forecast-metric forecast-metric--neutral\">\n                        <span class=\"forecast-metric__label\">Win Probability</span>\n                        <strong class=\"forecast-metric__value\">{{ forecastMetrics().probability }}%</strong>\n                      </div>\n                    </div>\n\n                    <!-- Doughnut chart -->\n                    <div class=\"forecast-chart-container\">\n                      <p-chart type=\"doughnut\" [data]=\"forecastChartData()\" [options]=\"forecastChartOptions\" height=\"260px\"></p-chart>\n                    </div>\n                  </div>\n\n                  <ng-template #noForecastData>\n                    <div class=\"forecast-empty\">\n                      <i class=\"pi pi-chart-bar\"></i>\n                      <p>Enter a deal amount to see the revenue forecast.</p>\n                    </div>\n                  </ng-template>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n                  </p-accordion>\n                </p-tabpanel>\n\n                <!-- PEOPLE tab -->\n                <p-tabpanel value=\"people\">\n                  <p-accordion\n                    class=\"opportunity-section-accordion\"\n                    [multiple]=\"true\"\n                    [value]=\"tabSectionPanels('people')\"\n                    (valueChange)=\"onTabAccordionChange('people', $event)\"\n                  >\n            <p-accordion-panel *ngIf=\"isSectionVisible('pre-sales-team')\" value=\"pre-sales-team\" [disabled]=\"isSectionLocked('pre-sales-team')\" [attr.data-deal-section]=\"'pre-sales-team'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-users\"></i>\n                    Pre-Sales Team\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span class=\"opportunity-accordion-badge\">{{ preSalesTeamHeaderBadge() }}</span>\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + sectionStatusTone('pre-sales-team')\"\n                    >\n                      {{ sectionStatusLabel('pre-sales-team') }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n          <ng-container *ngIf=\"!isEditMode() || isSectionLoaded('pre-sales-team'); else preSalesLoading\">\n          <section class=\"form-card opportunity-accordion-card\">\n            <p class=\"section-subtitle\">Track solution partners and demo owners supporting this deal.</p>\n            <div class=\"team-grid\" *ngIf=\"teamMembers.length; else emptyTeam\">\n              <div class=\"team-row\" *ngFor=\"let member of teamMembers; let i = index\">\n                <p-select\n                  appendTo=\"body\"\n                  [options]=\"teamMemberOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"teamUser{{ i }}\"\n                  [(ngModel)]=\"teamMembers[i].userId\"\n                  (ngModelChange)=\"markTeamDirty()\"\n                  placeholder=\"Select teammate\"\n                  styleClass=\"w-full\"\n                ></p-select>\n                <p-select\n                  appendTo=\"body\"\n                  [options]=\"teamRoleOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"teamRole{{ i }}\"\n                  [(ngModel)]=\"teamMembers[i].role\"\n                  (ngModelChange)=\"markTeamDirty()\"\n                  placeholder=\"Role\"\n                  styleClass=\"w-full\"\n                ></p-select>\n                <button type=\"button\" class=\"btn-glass btn-icon\" (click)=\"removeTeamMember(i)\">\n                  <i class=\"pi pi-times\"></i>\n                </button>\n              </div>\n            </div>\n            <ng-template #emptyTeam>\n              <p class=\"empty-state\">No pre-sales teammates yet.</p>\n            </ng-template>\n            <div class=\"team-actions\">\n              <button type=\"button\" class=\"btn-glass\" (click)=\"addTeamMember()\">\n                <i class=\"pi pi-plus\"></i>\n                Add teammate\n              </button>\n            </div>\n            <div class=\"form-grid\">\n              <div class=\"form-field full-row\">\n                <label for=\"oppPreSalesScope\">Scope summary</label>\n                <textarea\n                  pTextarea\n                  id=\"oppPreSalesScope\"\n                  rows=\"3\"\n                  name=\"preSalesScope\"\n                  [(ngModel)]=\"form.preSalesScope\"\n                  placeholder=\"Solution scope, deliverables, and boundaries\"\n                  class=\"w-full\"\n                ></textarea>\n              </div>\n              <div class=\"form-field full-row\">\n                <label for=\"oppPreSalesApproach\">Approach / solution outline</label>\n                <textarea\n                  pTextarea\n                  id=\"oppPreSalesApproach\"\n                  rows=\"3\"\n                  name=\"preSalesApproach\"\n                  [(ngModel)]=\"form.preSalesApproach\"\n                  placeholder=\"Proposed approach, timeline, and key assumptions\"\n                  class=\"w-full\"\n                ></textarea>\n              </div>\n            </div>\n          </section>\n          </ng-container>\n          <ng-template #preSalesLoading>\n            <section class=\"form-card opportunity-accordion-card section-loading-card\">\n              <p class=\"helper-text\">{{ isSectionLoading('pre-sales-team') ? 'Loading pre-sales team\u2026' : 'Open section to load pre-sales team.' }}</p>\n            </section>\n          </ng-template>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel *ngIf=\"isSectionVisible('deal-stakeholders')\" value=\"deal-stakeholders\" [disabled]=\"isSectionLocked('deal-stakeholders')\" [attr.data-deal-section]=\"'deal-stakeholders'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-id-card\"></i>\n                    Stakeholders\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span class=\"opportunity-accordion-badge opportunity-accordion-badge--info\">\n                      {{ dealContactRoles().length }} stakeholder{{ dealContactRoles().length !== 1 ? 's' : '' }}\n                    </span>\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + sectionStatusTone('deal-stakeholders')\"\n                    >\n                      {{ sectionStatusLabel('deal-stakeholders') }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n                <ng-container *ngIf=\"isSectionLoaded('deal-stakeholders'); else stakeholdersLoading\">\n                  <section class=\"form-card opportunity-accordion-card deal-stakeholders-section\">\n                    <p class=\"section-subtitle\">Map contacts involved in this deal and their influence on the buying decision.</p>\n\n                    <!-- Add Stakeholder Form -->\n                    <div class=\"deal-stakeholders__add-form\">\n                      <div class=\"deal-stakeholders__add-row\">\n                        <p-select\n                          appendTo=\"body\"\n                          [options]=\"stakeholderContactOptions()\"\n                          optionLabel=\"label\"\n                          optionValue=\"value\"\n                          [(ngModel)]=\"stakeholderSelectedContactId\"\n                          name=\"stakeholderContactId\"\n                          placeholder=\"Select contact\"\n                          [filter]=\"true\"\n                          filterPlaceholder=\"Search contacts\u2026\"\n                          styleClass=\"stakeholder-select\"\n                          [loading]=\"stakeholderContactSearching()\"\n                        ></p-select>\n                        <p-select\n                          appendTo=\"body\"\n                          [options]=\"stakeholderRoleOptions\"\n                          optionLabel=\"label\"\n                          optionValue=\"value\"\n                          [(ngModel)]=\"stakeholderSelectedRole\"\n                          name=\"stakeholderRole\"\n                          placeholder=\"Role\"\n                          styleClass=\"stakeholder-role-select\"\n                        ></p-select>\n                        <label class=\"stakeholder-primary-toggle\">\n                          <input type=\"checkbox\" [(ngModel)]=\"stakeholderIsPrimary\" name=\"stakeholderPrimary\" />\n                          <span>Primary</span>\n                        </label>\n                        <button\n                          type=\"button\"\n                          class=\"action-btn action-btn--add action-btn--sm\"\n                          [disabled]=\"!stakeholderSelectedContactId || !stakeholderSelectedRole || stakeholderAdding()\"\n                          (click)=\"addDealStakeholder()\"\n                        >\n                          <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n                          <span>Add</span>\n                        </button>\n                      </div>\n                      <div class=\"deal-stakeholders__notes-row\" *ngIf=\"stakeholderSelectedContactId\">\n                        <input\n                          pInputText\n                          [(ngModel)]=\"stakeholderNotes\"\n                          name=\"stakeholderNotes\"\n                          placeholder=\"Optional notes about this stakeholder's role\u2026\"\n                          class=\"w-full\"\n                        />\n                      </div>\n                    </div>\n\n                    <!-- Stakeholder List -->\n                    <div class=\"deal-stakeholders__loading\" *ngIf=\"dealContactRolesLoading()\">\n                      <i class=\"pi pi-spin pi-spinner\"></i> Loading stakeholders\u2026\n                    </div>\n\n                    <div class=\"deal-stakeholders__list\" *ngIf=\"!dealContactRolesLoading() && dealContactRoles().length; else noStakeholders\">\n                      <div class=\"deal-stakeholders__item\" *ngFor=\"let role of dealContactRoles()\">\n                        <div class=\"deal-stakeholders__avatar\">\n                          <i [class]=\"stakeholderRoleIcon(role.role)\"></i>\n                        </div>\n                        <div class=\"deal-stakeholders__info\">\n                          <div class=\"deal-stakeholders__top\">\n                            <span class=\"deal-stakeholders__name\">\n                              {{ role.contactName }}\n                              <span class=\"deal-stakeholders__primary-badge\" *ngIf=\"role.isPrimary\">Primary</span>\n                            </span>\n                            <span class=\"deal-stakeholders__role-badge\" [attr.data-role]=\"role.role\">{{ role.role }}</span>\n                          </div>\n                          <div class=\"deal-stakeholders__meta\">\n                            <span *ngIf=\"role.jobTitle\">{{ role.jobTitle }}</span>\n                            <span *ngIf=\"role.email\">\u2022 {{ role.email }}</span>\n                          </div>\n                          <div class=\"deal-stakeholders__notes\" *ngIf=\"role.notes\">{{ role.notes }}</div>\n                        </div>\n                        <div class=\"deal-stakeholders__actions\">\n                          <button\n                            type=\"button\"\n                            class=\"row-action-btn row-action-btn--delete\"\n                            title=\"Remove stakeholder\"\n                            [disabled]=\"stakeholderRemovingIds().includes(role.id)\"\n                            (click)=\"removeDealStakeholder(role.id)\"\n                          >\n                            <i class=\"pi\" [ngClass]=\"stakeholderRemovingIds().includes(role.id) ? 'pi-spin pi-spinner' : 'pi-trash'\"></i>\n                          </button>\n                        </div>\n                      </div>\n                    </div>\n\n                    <ng-template #noStakeholders>\n                      <div class=\"deal-stakeholders__empty\" *ngIf=\"!dealContactRolesLoading()\">\n                        <i class=\"pi pi-id-card\"></i>\n                        <p>No stakeholders mapped yet.</p>\n                        <span class=\"deal-stakeholders__empty-hint\">Add contacts and their roles in the buying process to track stakeholder influence.</span>\n                      </div>\n                    </ng-template>\n                  </section>\n                </ng-container>\n                <ng-template #stakeholdersLoading>\n                  <section class=\"form-card opportunity-accordion-card section-loading-card\">\n                    <p class=\"helper-text\">{{ isSectionLoading('deal-stakeholders') ? 'Loading stakeholders\u2026' : 'Open section to load stakeholders.' }}</p>\n                  </section>\n                </ng-template>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel value=\"deal-activity\" [attr.data-deal-section]=\"'deal-activity'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-clock\"></i>\n                    Deal Activity Timeline\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span class=\"opportunity-accordion-badge opportunity-accordion-badge--info\">\n                      {{ recentDealActivities().length }} activities\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-card opportunity-accordion-card deal-activity-section\">\n                  <div class=\"deal-activity-timeline\" *ngIf=\"isEditMode()\">\n                    <div class=\"deal-activity-timeline__header\">\n                      <h3>\n                        <i class=\"pi pi-history\"></i>\n                        Recent Activities\n                      </h3>\n                      <button\n                        type=\"button\"\n                        class=\"action-btn action-btn--add action-btn--sm\"\n                        (click)=\"logDealActivity()\"\n                      >\n                        <span class=\"action-btn__icon\"><i class=\"pi pi-external-link\"></i></span>\n                        <span>Open Activities</span>\n                      </button>\n                    </div>\n\n                    <div class=\"deal-activity-timeline__loading\" *ngIf=\"recentDealActivitiesLoading()\">\n                      <i class=\"pi pi-spin pi-spinner\"></i> Loading activities\u2026\n                    </div>\n\n                    <div class=\"deal-activity-timeline__list\" *ngIf=\"!recentDealActivitiesLoading() && recentDealActivities().length; else noDealActivities\">\n                      <button\n                        type=\"button\"\n                        class=\"deal-activity-timeline__item\"\n                        *ngFor=\"let activity of recentDealActivities()\"\n                        (click)=\"openActivityRecord(activity.id)\"\n                      >\n                        <div class=\"deal-activity-timeline__icon\" [attr.data-type]=\"activity.type\">\n                          <i class=\"pi\" [ngClass]=\"activityTypeIcon(activity.type)\"></i>\n                        </div>\n                        <div class=\"deal-activity-timeline__content\">\n                          <div class=\"deal-activity-timeline__top\">\n                            <span class=\"deal-activity-timeline__subject\">{{ activity.subject }}</span>\n                            <span class=\"deal-activity-timeline__status\" [attr.data-status]=\"activity.status\">{{ activity.status }}</span>\n                          </div>\n                          <div class=\"deal-activity-timeline__meta\">\n                            <span>{{ activity.type }}</span>\n                            <span *ngIf=\"activity.ownerName\">\u2022 {{ activity.ownerName }}</span>\n                            <span *ngIf=\"activityTimelineDateLabel(activity)\">\u2022 {{ activityTimelineDateLabel(activity) | date:'medium' }}</span>\n                          </div>\n                          <div class=\"deal-activity-timeline__outcome\" *ngIf=\"activity.outcome\">{{ activity.outcome }}</div>\n                        </div>\n                      </button>\n                    </div>\n\n                    <ng-template #noDealActivities>\n                      <div class=\"deal-activity-empty\" *ngIf=\"!recentDealActivitiesLoading()\">\n                        <i class=\"pi pi-inbox\"></i>\n                        <p>No activities logged for this deal yet.</p>\n                        <span class=\"deal-activity-empty__hint\">Activities from the Activities module that reference this opportunity will appear here.</span>\n                      </div>\n                    </ng-template>\n                  </div>\n\n                  <div class=\"deal-activity-empty\" *ngIf=\"!isEditMode()\">\n                    <i class=\"pi pi-inbox\"></i>\n                    <p>Save the deal first to track activities.</p>\n                  </div>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n                  </p-accordion>\n                </p-tabpanel>\n\n                <!-- COMPLIANCE tab -->\n                <p-tabpanel value=\"compliance\">\n                  <p-accordion\n                    class=\"opportunity-section-accordion\"\n                    [multiple]=\"true\"\n                    [value]=\"tabSectionPanels('compliance')\"\n                    (valueChange)=\"onTabAccordionChange('compliance', $event)\"\n                  >\n            <p-accordion-panel value=\"approval-workflow\" *ngIf=\"isSectionVisible('approval-workflow')\" [disabled]=\"isSectionLocked('approval-workflow')\" [attr.data-deal-section]=\"'approval-workflow'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-check-circle\"></i>\n                    Approval Workflow\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + approvalWorkflowHeaderTone()\"\n                    >\n                      {{ approvalWorkflowHeaderBadge() }}\n                    </span>\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + sectionStatusTone('approval-workflow')\"\n                    >\n                      {{ sectionStatusLabel('approval-workflow') }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n          <ng-container *ngIf=\"!isEditMode() || isSectionLoaded('approval-workflow'); else approvalLoading\">\n          <section class=\"form-card opportunity-accordion-card\" *ngIf=\"isEditMode()\">\n            <div class=\"approval-current-status\">\n              <span class=\"approval-current-status__label\">Current Approval Status</span>\n              <span\n                class=\"opportunity-accordion-badge\"\n                [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + currentApprovalStatusTone()\"\n              >\n                {{ currentApprovalStatusLabel() }}\n              </span>\n            </div>\n\n            <div class=\"approval-request\">\n              <div class=\"approval-request-row\">\n                <div class=\"form-field\">\n                  <label>Purpose</label>\n                  <p-select\n                    appendTo=\"body\"\n                    [options]=\"approvalPurposeOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    name=\"approvalPurpose\"\n                    [(ngModel)]=\"approvalRequest.purpose\"\n                    (ngModelChange)=\"onApprovalPurposeChange($event)\"\n                    placeholder=\"Purpose\"\n                    styleClass=\"w-full\"\n                  ></p-select>\n                </div>\n                <div class=\"form-field\">\n                  <label>Amount</label>\n                  <p-inputNumber\n                    [(ngModel)]=\"approvalRequest.amount\"\n                    name=\"approvalAmount\"\n                    mode=\"currency\"\n                    [currency]=\"resolveCurrency(approvalRequest.currency)\"\n                    class=\"w-full\"\n                    (ngModelChange)=\"onApprovalAmountEdited()\"\n                  ></p-inputNumber>\n                </div>\n                <div class=\"form-field\">\n                  <label>Currency</label>\n                  <p-select\n                    appendTo=\"body\"\n                    [options]=\"currencyOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    name=\"approvalCurrency\"\n                    [(ngModel)]=\"approvalRequest.currency\"\n                    placeholder=\"Currency\"\n                    styleClass=\"w-full\"\n                  ></p-select>\n                </div>\n                <div class=\"form-field approval-action\">\n                  <label>&nbsp;</label>\n                  <button\n                    pButton\n                    type=\"button\"\n                    class=\"crm-button--primary\"\n                    [disabled]=\"!canRequestApproval() || approvalRequesting()\"\n                    (click)=\"requestApproval()\"\n                  >\n                    <span *ngIf=\"!approvalRequesting()\">Request approval</span>\n                    <span *ngIf=\"approvalRequesting()\">Requesting\u2026</span>\n                  </button>\n                </div>\n              </div>\n              <p class=\"helper-text\" *ngIf=\"canRequestApproval(); else noApprovalPermission\">\n                Request approval before closing or applying large discounts.\n              </p>\n              <ng-template #noApprovalPermission>\n                <p class=\"helper-text muted\">You don\u2019t have permission to request approvals.</p>\n              </ng-template>\n            </div>\n\n            <div class=\"approval-summary-list\" *ngIf=\"approvals.length; else noApprovals\">\n              <div class=\"approval-summary-item\" *ngFor=\"let approval of approvals\">\n                <div class=\"approval-meta\">\n                  <span [class]=\"approvalStatusClass(approval.status)\">{{ approval.status }}</span>\n                  <span class=\"approval-purpose\">{{ approval.purpose }}</span>\n                  <span class=\"approval-amount\">\n                    {{ approval.amount | number:'1.0-2' }} {{ approval.currency }}\n                  </span>\n                </div>\n                <div class=\"approval-details\">\n                  <span>Requested by {{ approval.requestedByName || 'Unknown' }}</span>\n                  <span>{{ approval.requestedOn | date:'medium' }}</span>\n                  <span *ngIf=\"approval.totalSteps && approval.totalSteps > 1\">\n                    Step {{ approval.stepOrder || 1 }} of {{ approval.totalSteps }}\n                  </span>\n                  <span *ngIf=\"approval.totalSteps && approval.totalSteps > 1\">\n                    Chain status: {{ approval.chainStatus || approval.status }}\n                  </span>\n                  <span *ngIf=\"approval.approverRole\">Approver role: {{ approval.approverRole }}</span>\n                  <span *ngIf=\"approval.approverName\">Approved by: {{ approval.approverName }}</span>\n                  <span *ngIf=\"approval.decisionOn\">Decision: {{ approval.decisionOn | date:'medium' }}</span>\n                </div>\n                <div class=\"approval-notes\" *ngIf=\"approval.status !== 'Pending' && approval.notes\">\n                  {{ approval.notes }}\n                </div>\n              </div>\n            </div>\n            <ng-template #noApprovals>\n              <p class=\"helper-text\">No approvals requested yet.</p>\n            </ng-template>\n            <p class=\"helper-text muted\" *ngIf=\"decisionReviewMode()\">\n              Decision actions are handled in the Review Action section.\n            </p>\n          </section>\n          </ng-container>\n          <ng-template #approvalLoading>\n            <section class=\"form-card opportunity-accordion-card section-loading-card\">\n              <p class=\"helper-text\">{{ isSectionLoading('approval-workflow') ? 'Loading approvals\u2026' : 'Open section to load approvals.' }}</p>\n            </section>\n          </ng-template>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel *ngIf=\"isSectionVisible('security-legal')\" value=\"security-legal\" [disabled]=\"isSectionLocked('security-legal')\" [attr.data-deal-section]=\"'security-legal'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-shield\"></i>\n                    Security & Legal Review\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span class=\"opportunity-accordion-badge\">{{ securityLegalHeaderBadge() }}</span>\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + sectionStatusTone('security-legal')\"\n                    >\n                      {{ sectionStatusLabel('security-legal') }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n          <ng-container *ngIf=\"!isEditMode() || isSectionLoaded('security-legal'); else securityLoading\">\n          <section class=\"form-card opportunity-accordion-card\">\n            <div class=\"form-grid\">\n              <div class=\"form-field\">\n                <label for=\"oppSecurityStatus\">Security status</label>\n                <p-select\n                  inputId=\"oppSecurityStatus\"\n                  appendTo=\"body\"\n                  [options]=\"reviewStatusOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"securityReviewStatus\"\n                  [(ngModel)]=\"form.securityReviewStatus\"\n                  placeholder=\"Select status\"\n                  styleClass=\"w-full\"\n                ></p-select>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppLegalStatus\">Legal status</label>\n                <p-select\n                  inputId=\"oppLegalStatus\"\n                  appendTo=\"body\"\n                  [options]=\"reviewStatusOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"legalReviewStatus\"\n                  [(ngModel)]=\"form.legalReviewStatus\"\n                  placeholder=\"Select status\"\n                  styleClass=\"w-full\"\n                ></p-select>\n              </div>\n              <div class=\"form-field full-row review-checklist\">\n                <div class=\"checklist-header\">\n                  <h4>Security checklist</h4>\n                  <div class=\"checklist-add\">\n                    <input\n                      pInputText\n                      name=\"newSecurityItem\"\n                      [(ngModel)]=\"newSecurityItem\"\n                      placeholder=\"Add security task\"\n                      class=\"w-full\"\n                    />\n                    <button pButton type=\"button\" class=\"btn-glass btn-sm\" (click)=\"addChecklistItem('Security')\">\n                      <i class=\"pi pi-plus\"></i>\n                      Add\n                    </button>\n                  </div>\n                </div>\n                <div class=\"checklist-list\" *ngIf=\"securityChecklist.length; else emptySecurityChecklist\">\n                  <div class=\"checklist-item\" *ngFor=\"let item of securityChecklist\">\n                    <input\n                      pInputText\n                      [(ngModel)]=\"item.title\"\n                      name=\"securityTitle{{item.id}}\"\n                      (blur)=\"saveChecklistItem(item)\"\n                      class=\"w-full\"\n                    />\n                    <p-select\n                      appendTo=\"body\"\n                      [options]=\"reviewStatusOptions\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      [(ngModel)]=\"item.status\"\n                      name=\"securityStatus{{item.id}}\"\n                      (onChange)=\"saveChecklistItem(item)\"\n                      styleClass=\"w-full\"\n                    ></p-select>\n                    <input\n                      pInputText\n                      [(ngModel)]=\"item.notes\"\n                      name=\"securityNotes{{item.id}}\"\n                      placeholder=\"Notes (optional)\"\n                      (blur)=\"saveChecklistItem(item)\"\n                      class=\"w-full\"\n                    />\n                    <span class=\"checklist-status\" *ngIf=\"isChecklistSaving(item)\">\n                      Saving\u2026\n                    </span>\n                    <span class=\"checklist-status saved\" *ngIf=\"isChecklistSaved(item)\">\n                      Saved\n                    </span>\n                    <button pButton type=\"button\" class=\"btn-glass btn-sm\" (click)=\"deleteChecklistItem(item)\">\n                      <i class=\"pi pi-trash\"></i>\n                    </button>\n                  </div>\n                </div>\n                <ng-template #emptySecurityChecklist>\n                  <p class=\"helper-text\">No security checklist items yet.</p>\n                </ng-template>\n              </div>\n\n              <div class=\"form-field full-row review-checklist\">\n                <div class=\"checklist-header\">\n                  <h4>Legal checklist</h4>\n                  <div class=\"checklist-add\">\n                    <input\n                      pInputText\n                      name=\"newLegalItem\"\n                      [(ngModel)]=\"newLegalItem\"\n                      placeholder=\"Add legal task\"\n                      class=\"w-full\"\n                    />\n                    <button pButton type=\"button\" class=\"btn-glass btn-sm\" (click)=\"addChecklistItem('Legal')\">\n                      <i class=\"pi pi-plus\"></i>\n                      Add\n                    </button>\n                  </div>\n                </div>\n                <div class=\"checklist-list\" *ngIf=\"legalChecklist.length; else emptyLegalChecklist\">\n                  <div class=\"checklist-item\" *ngFor=\"let item of legalChecklist\">\n                    <input\n                      pInputText\n                      [(ngModel)]=\"item.title\"\n                      name=\"legalTitle{{item.id}}\"\n                      (blur)=\"saveChecklistItem(item)\"\n                      class=\"w-full\"\n                    />\n                    <p-select\n                      appendTo=\"body\"\n                      [options]=\"reviewStatusOptions\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      [(ngModel)]=\"item.status\"\n                      name=\"legalStatus{{item.id}}\"\n                      (onChange)=\"saveChecklistItem(item)\"\n                      styleClass=\"w-full\"\n                    ></p-select>\n                    <input\n                      pInputText\n                      [(ngModel)]=\"item.notes\"\n                      name=\"legalNotes{{item.id}}\"\n                      placeholder=\"Notes (optional)\"\n                      (blur)=\"saveChecklistItem(item)\"\n                      class=\"w-full\"\n                    />\n                    <span class=\"checklist-status\" *ngIf=\"isChecklistSaving(item)\">\n                      Saving\u2026\n                    </span>\n                    <span class=\"checklist-status saved\" *ngIf=\"isChecklistSaved(item)\">\n                      Saved\n                    </span>\n                    <button pButton type=\"button\" class=\"btn-glass btn-sm\" (click)=\"deleteChecklistItem(item)\">\n                      <i class=\"pi pi-trash\"></i>\n                    </button>\n                  </div>\n                </div>\n                <ng-template #emptyLegalChecklist>\n                  <p class=\"helper-text\">No legal checklist items yet.</p>\n                </ng-template>\n              </div>\n\n              <div class=\"form-field full-row review-checklist\">\n                <div class=\"checklist-header\">\n                  <h4>Technical risk checklist</h4>\n                  <div class=\"checklist-add\">\n                    <input\n                      pInputText\n                      name=\"newTechnicalItem\"\n                      [(ngModel)]=\"newTechnicalItem\"\n                      placeholder=\"Add technical risk\"\n                      class=\"w-full\"\n                    />\n                    <button pButton type=\"button\" class=\"btn-glass btn-sm\" (click)=\"addChecklistItem('Technical')\">\n                      <i class=\"pi pi-plus\"></i>\n                      Add\n                    </button>\n                  </div>\n                </div>\n                <div class=\"checklist-list\" *ngIf=\"technicalChecklist.length; else emptyTechnicalChecklist\">\n                  <div class=\"checklist-item\" *ngFor=\"let item of technicalChecklist\">\n                    <input\n                      pInputText\n                      [(ngModel)]=\"item.title\"\n                      name=\"technicalTitle{{item.id}}\"\n                      (blur)=\"saveChecklistItem(item)\"\n                      class=\"w-full\"\n                    />\n                    <p-select\n                      appendTo=\"body\"\n                      [options]=\"reviewStatusOptions\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      [(ngModel)]=\"item.status\"\n                      name=\"technicalStatus{{item.id}}\"\n                      (onChange)=\"saveChecklistItem(item)\"\n                      styleClass=\"w-full\"\n                    ></p-select>\n                    <input\n                      pInputText\n                      [(ngModel)]=\"item.notes\"\n                      name=\"technicalNotes{{item.id}}\"\n                      placeholder=\"Notes (optional)\"\n                      (blur)=\"saveChecklistItem(item)\"\n                      class=\"w-full\"\n                    />\n                    <span class=\"checklist-status\" *ngIf=\"isChecklistSaving(item)\">\n                      Saving\u2026\n                    </span>\n                    <span class=\"checklist-status saved\" *ngIf=\"isChecklistSaved(item)\">\n                      Saved\n                    </span>\n                    <button pButton type=\"button\" class=\"btn-glass btn-sm\" (click)=\"deleteChecklistItem(item)\">\n                      <i class=\"pi pi-trash\"></i>\n                    </button>\n                  </div>\n                </div>\n                <ng-template #emptyTechnicalChecklist>\n                  <p class=\"helper-text\">No technical risks logged yet.</p>\n                </ng-template>\n              </div>\n            </div>\n          </section>\n          </ng-container>\n          <ng-template #securityLoading>\n            <section class=\"form-card opportunity-accordion-card section-loading-card\">\n              <p class=\"helper-text\">{{ isSectionLoading('security-legal') ? 'Loading security and legal checklists\u2026' : 'Open section to load checklists.' }}</p>\n            </section>\n          </ng-template>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel value=\"review-thread\" *ngIf=\"isSectionVisible('review-thread')\" [disabled]=\"isSectionLocked('review-thread')\" [attr.data-deal-section]=\"'review-thread'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-comments\"></i>\n                    Deal Review Thread\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + reviewThreadHeaderTone()\"\n                    >\n                      {{ reviewThreadHeaderBadge() }}\n                    </span>\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + sectionStatusTone('review-thread')\"\n                    >\n                      {{ sectionStatusLabel('review-thread') }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n          <ng-container *ngIf=\"isSectionLoaded('review-thread'); else reviewLoading\">\n          <section class=\"form-card review-thread-card opportunity-accordion-card\" *ngIf=\"isEditMode()\">\n\n            <div class=\"review-thread-controls\" *ngIf=\"isManager(); else repAckBlock\">\n              <div class=\"form-grid\">\n                <div class=\"form-field\">\n                  <label for=\"reviewOutcome\">Review outcome</label>\n                  <p-select\n                    inputId=\"reviewOutcome\"\n                    appendTo=\"body\"\n                    [options]=\"reviewOutcomeOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    [(ngModel)]=\"reviewOutcome\"\n                    name=\"reviewOutcome\"\n                    styleClass=\"w-full\"\n                  ></p-select>\n                </div>\n                <div class=\"form-field\" *ngIf=\"reviewOutcome !== 'Approved'\">\n                  <label for=\"reviewDue\">Acknowledgment due</label>\n                  <input\n                    id=\"reviewDue\"\n                    type=\"datetime-local\"\n                    class=\"review-input\"\n                    [(ngModel)]=\"reviewAckDueLocal\"\n                    name=\"reviewAckDueLocal\"\n                  />\n                </div>\n                <div class=\"form-field full-row\">\n                  <label for=\"reviewComment\">Manager comment</label>\n                  <textarea\n                    id=\"reviewComment\"\n                    pTextarea\n                    rows=\"3\"\n                    class=\"w-full\"\n                    [(ngModel)]=\"reviewComment\"\n                    name=\"reviewComment\"\n                    placeholder=\"Explain what needs to change, or confirm approval.\"\n                  ></textarea>\n                </div>\n              </div>\n              <div class=\"review-actions\">\n                <button\n                  pButton\n                  type=\"button\"\n                  class=\"btn-gradient\"\n                  (click)=\"submitReviewOutcome()\"\n                  [disabled]=\"reviewSubmitting\"\n                >\n                  {{ reviewSubmitting ? 'Saving...' : 'Save review outcome' }}\n                </button>\n              </div>\n            </div>\n\n            <ng-template #repAckBlock>\n              <div class=\"review-thread-controls review-thread-controls--rep\">\n                <p class=\"helper-text\" *ngIf=\"hasPendingAcknowledgment(); else noAckNeeded\">\n                  A manager has requested acknowledgment on this deal review.\n                </p>\n                <ng-template #noAckNeeded>\n                  <p class=\"helper-text\">No manager acknowledgment is required right now.</p>\n                </ng-template>\n                <div class=\"review-actions\" *ngIf=\"hasPendingAcknowledgment()\">\n                  <button\n                    pButton\n                    type=\"button\"\n                    class=\"btn-gradient\"\n                    (click)=\"acknowledgeReview()\"\n                    [disabled]=\"ackSubmitting\"\n                  >\n                    {{ ackSubmitting ? 'Acknowledging...' : 'Acknowledge review' }}\n                  </button>\n                </div>\n              </div>\n            </ng-template>\n\n            <div class=\"review-thread-list\" *ngIf=\"reviewThread().length; else emptyReviewThread\">\n              <div class=\"review-thread-item\" *ngFor=\"let item of reviewThread()\">\n                <div class=\"review-thread-item__header\">\n                  <span class=\"review-badge\" [ngClass]=\"item.kind === 'Acknowledgment' ? 'ack' : 'review'\">\n                    {{ item.kind }}\n                  </span>\n                  <strong class=\"review-outcome\">{{ item.outcome }}</strong>\n                  <span class=\"review-meta\">\n                    {{ item.ownerName }} \u00B7 {{ item.createdAtUtc | date: 'MMM d, y, h:mm a' }}\n                  </span>\n                </div>\n                <div class=\"review-thread-item__comment\" *ngIf=\"item.comment\">\n                  {{ item.comment }}\n                </div>\n                <div class=\"review-thread-item__dates\" *ngIf=\"item.dueDateUtc || item.completedDateUtc\">\n                  <span *ngIf=\"item.dueDateUtc\">\n                    Due: {{ item.dueDateUtc | date: 'MMM d, y, h:mm a' }}\n                  </span>\n                  <span *ngIf=\"item.completedDateUtc\">\n                    Completed: {{ item.completedDateUtc | date: 'MMM d, y, h:mm a' }}\n                  </span>\n                </div>\n              </div>\n            </div>\n            <ng-template #emptyReviewThread>\n              <p class=\"helper-text\">No manager review comments yet.</p>\n            </ng-template>\n          </section>\n          </ng-container>\n          <ng-template #reviewLoading>\n            <section class=\"form-card opportunity-accordion-card section-loading-card\">\n              <p class=\"helper-text\">{{ isSectionLoading('review-thread') ? 'Loading review history\u2026' : 'Open section to load review history.' }}</p>\n            </section>\n          </ng-template>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n                  </p-accordion>\n                </p-tabpanel>\n\n                <!-- DELIVERY tab -->\n                <p-tabpanel value=\"delivery\">\n                  <p-accordion\n                    class=\"opportunity-section-accordion\"\n                    [multiple]=\"true\"\n                    [value]=\"tabSectionPanels('delivery')\"\n                    (valueChange)=\"onTabAccordionChange('delivery', $event)\"\n                  >\n            <p-accordion-panel *ngIf=\"isSectionVisible('delivery-handoff')\" value=\"delivery-handoff\" [disabled]=\"isSectionLocked('delivery-handoff')\" [attr.data-deal-section]=\"'delivery-handoff'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-briefcase\"></i>\n                    Delivery Handoff\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span class=\"opportunity-accordion-badge\">{{ deliveryHeaderBadge() }}</span>\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + sectionStatusTone('delivery-handoff')\"\n                    >\n                      {{ sectionStatusLabel('delivery-handoff') }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n          <section class=\"form-card opportunity-accordion-card\">\n            <p class=\"section-subtitle\">Capture scope, risks, and delivery ownership before kickoff.</p>\n            <div class=\"form-grid\">\n              <div class=\"form-field\">\n                <label for=\"oppDeliveryOwner\">Delivery owner</label>\n                <p-select\n                  inputId=\"oppDeliveryOwner\"\n                  appendTo=\"body\"\n                  [options]=\"teamMemberOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"deliveryOwnerId\"\n                  [(ngModel)]=\"form.deliveryOwnerId\"\n                  placeholder=\"Select owner\"\n                  styleClass=\"w-full\"\n                ></p-select>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"oppDeliveryStatus\">Delivery status</label>\n                <p-select\n                  inputId=\"oppDeliveryStatus\"\n                  appendTo=\"body\"\n                  [options]=\"deliveryStatusOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  name=\"deliveryStatus\"\n                  [(ngModel)]=\"form.deliveryStatus\"\n                  placeholder=\"Status\"\n                  styleClass=\"w-full\"\n                ></p-select>\n              </div>\n              <div class=\"form-field full-row\">\n                <label for=\"oppDeliveryScope\">Scope</label>\n                <textarea\n                  pTextarea\n                  id=\"oppDeliveryScope\"\n                  rows=\"3\"\n                  name=\"deliveryHandoffScope\"\n                  [(ngModel)]=\"form.deliveryHandoffScope\"\n                  placeholder=\"Implementation scope and key deliverables\"\n                  class=\"w-full\"\n                ></textarea>\n              </div>\n              <div class=\"form-field full-row\">\n                <label for=\"oppDeliveryRisks\">Risks</label>\n                <textarea\n                  pTextarea\n                  id=\"oppDeliveryRisks\"\n                  rows=\"3\"\n                  name=\"deliveryHandoffRisks\"\n                  [(ngModel)]=\"form.deliveryHandoffRisks\"\n                  placeholder=\"Dependencies, blockers, or risks\"\n                  class=\"w-full\"\n                ></textarea>\n              </div>\n              <div class=\"form-field full-row\">\n                <label for=\"oppDeliveryTimeline\">Timeline</label>\n                <textarea\n                  pTextarea\n                  id=\"oppDeliveryTimeline\"\n                  rows=\"2\"\n                  name=\"deliveryHandoffTimeline\"\n                  [(ngModel)]=\"form.deliveryHandoffTimeline\"\n                  placeholder=\"Target milestones and timing\"\n                  class=\"w-full\"\n                ></textarea>\n              </div>\n              <div class=\"form-field full-row\">\n                <button\n                  pButton\n                  type=\"button\"\n                  class=\"crm-button crm-button--primary\"\n                  icon=\"pi pi-calendar-plus\"\n                  label=\"Trigger kickoff\"\n                  [disabled]=\"!isEditMode()\"\n                  (click)=\"triggerKickoff()\"\n                ></button>\n              </div>\n            </div>\n          </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel *ngIf=\"isSectionVisible('onboarding')\" value=\"onboarding\" [disabled]=\"isSectionLocked('onboarding')\" [attr.data-deal-section]=\"'onboarding'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-list-check\"></i>\n                    Onboarding Checklist & Milestones\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span class=\"opportunity-accordion-badge\">{{ onboardingHeaderBadge() }}</span>\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + sectionStatusTone('onboarding')\"\n                    >\n                      {{ sectionStatusLabel('onboarding') }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n          <ng-container *ngIf=\"!isEditMode() || isSectionLoaded('onboarding'); else onboardingLoading\">\n          <section class=\"form-card opportunity-accordion-card\">\n            <div class=\"checklist-form\">\n              <input\n                pInputText\n                type=\"text\"\n                name=\"newOnboardingChecklistItem\"\n                [(ngModel)]=\"newOnboardingChecklistItem\"\n                placeholder=\"Add onboarding checklist item\"\n                class=\"w-full\"\n              />\n              <button pButton type=\"button\" class=\"btn-glass btn-sm\" (click)=\"addOnboardingItem('Checklist')\">\n                Add checklist\n              </button>\n            </div>\n            <div class=\"checklist-list\" *ngIf=\"onboardingChecklist.length; else emptyOnboardingChecklist\">\n              <div class=\"checklist-item\" *ngFor=\"let item of onboardingChecklist\">\n                <input\n                  pInputText\n                  type=\"text\"\n                  [(ngModel)]=\"item.title\"\n                  [ngModelOptions]=\"{ standalone: true }\"\n                  (blur)=\"saveOnboardingItem(item)\"\n                  class=\"w-full\"\n                />\n                <p-select\n                  appendTo=\"body\"\n                  [options]=\"onboardingStatusOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  [(ngModel)]=\"item.status\"\n                  [ngModelOptions]=\"{ standalone: true }\"\n                  (onChange)=\"saveOnboardingItem(item)\"\n                  styleClass=\"w-full\"\n                ></p-select>\n                <p-datePicker\n                  appendTo=\"body\"\n                  [(ngModel)]=\"item.dueDateUtc\"\n                  [ngModelOptions]=\"{ standalone: true }\"\n                  (onSelect)=\"saveOnboardingItem(item)\"\n                  [showIcon]=\"true\"\n                  styleClass=\"w-full\"\n                ></p-datePicker>\n                <textarea\n                  pTextarea\n                  rows=\"2\"\n                  [(ngModel)]=\"item.notes\"\n                  [ngModelOptions]=\"{ standalone: true }\"\n                  (blur)=\"saveOnboardingItem(item)\"\n                  placeholder=\"Notes\"\n                  class=\"w-full\"\n                ></textarea>\n                <span class=\"checklist-status\" *ngIf=\"isOnboardingSaving(item)\">Saving...</span>\n                <span class=\"checklist-status saved\" *ngIf=\"isOnboardingSaved(item)\">Saved</span>\n                <button pButton type=\"button\" class=\"btn-glass btn-sm\" (click)=\"deleteOnboardingItem(item)\">\n                  Remove\n                </button>\n              </div>\n            </div>\n            <ng-template #emptyOnboardingChecklist>\n              <p class=\"empty-state\">No onboarding checklist items yet.</p>\n            </ng-template>\n\n            <div class=\"checklist-form\">\n              <input\n                pInputText\n                type=\"text\"\n                name=\"newOnboardingMilestoneItem\"\n                [(ngModel)]=\"newOnboardingMilestoneItem\"\n                placeholder=\"Add onboarding milestone\"\n                class=\"w-full\"\n              />\n              <button pButton type=\"button\" class=\"btn-glass btn-sm\" (click)=\"addOnboardingItem('Milestone')\">\n                Add milestone\n              </button>\n            </div>\n            <div class=\"checklist-list\" *ngIf=\"onboardingMilestones.length; else emptyOnboardingMilestones\">\n              <div class=\"checklist-item\" *ngFor=\"let item of onboardingMilestones\">\n                <input\n                  pInputText\n                  type=\"text\"\n                  [(ngModel)]=\"item.title\"\n                  [ngModelOptions]=\"{ standalone: true }\"\n                  (blur)=\"saveOnboardingItem(item)\"\n                  class=\"w-full\"\n                />\n                <p-select\n                  appendTo=\"body\"\n                  [options]=\"onboardingStatusOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  [(ngModel)]=\"item.status\"\n                  [ngModelOptions]=\"{ standalone: true }\"\n                  (onChange)=\"saveOnboardingItem(item)\"\n                  styleClass=\"w-full\"\n                ></p-select>\n                <p-datePicker\n                  appendTo=\"body\"\n                  [(ngModel)]=\"item.dueDateUtc\"\n                  [ngModelOptions]=\"{ standalone: true }\"\n                  (onSelect)=\"saveOnboardingItem(item)\"\n                  [showIcon]=\"true\"\n                  styleClass=\"w-full\"\n                ></p-datePicker>\n                <textarea\n                  pTextarea\n                  rows=\"2\"\n                  [(ngModel)]=\"item.notes\"\n                  [ngModelOptions]=\"{ standalone: true }\"\n                  (blur)=\"saveOnboardingItem(item)\"\n                  placeholder=\"Notes\"\n                  class=\"w-full\"\n                ></textarea>\n                <span class=\"checklist-status\" *ngIf=\"isOnboardingSaving(item)\">Saving...</span>\n                <span class=\"checklist-status saved\" *ngIf=\"isOnboardingSaved(item)\">Saved</span>\n                <button pButton type=\"button\" class=\"btn-glass btn-sm\" (click)=\"deleteOnboardingItem(item)\">\n                  Remove\n                </button>\n              </div>\n            </div>\n            <ng-template #emptyOnboardingMilestones>\n              <p class=\"empty-state\">No onboarding milestones yet.</p>\n            </ng-template>\n          </section>\n          </ng-container>\n          <ng-template #onboardingLoading>\n            <section class=\"form-card opportunity-accordion-card section-loading-card\">\n              <p class=\"helper-text\">{{ isSectionLoading('onboarding') ? 'Loading onboarding checklist\u2026' : 'Open section to load onboarding.' }}</p>\n            </section>\n          </ng-template>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel *ngIf=\"isSectionVisible('deal-health-score')\" value=\"deal-health-score\" [disabled]=\"isSectionLocked('deal-health-score')\" [attr.data-deal-section]=\"'deal-health-score'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-heart\"></i>\n                    Deal Health\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span class=\"opportunity-accordion-badge opportunity-accordion-badge--info\" *ngIf=\"dealHealthScore()\">\n                      Score: {{ dealHealthScore()!.score }}\n                    </span>\n                    <span\n                      class=\"opportunity-accordion-badge\"\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + sectionStatusTone('deal-health-score')\"\n                    >\n                      {{ sectionStatusLabel('deal-health-score') }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n                <ng-container *ngIf=\"isSectionLoaded('deal-health-score'); else healthScoreLoading\">\n                  <section class=\"form-card opportunity-accordion-card deal-health-section\">\n                    <div class=\"deal-health__header\">\n                      <p class=\"section-subtitle\">AI-powered health assessment based on deal completeness, activity recency, stakeholder coverage, and process compliance.</p>\n                      <button type=\"button\" class=\"action-btn action-btn--refresh action-btn--sm\" (click)=\"refreshDealHealthScore()\" [disabled]=\"dealHealthScoreLoading()\">\n                        <span class=\"action-btn__icon\"><i class=\"pi\" [ngClass]=\"dealHealthScoreLoading() ? 'pi-spin pi-spinner' : 'pi-refresh'\"></i></span>\n                        <span>Refresh</span>\n                      </button>\n                    </div>\n\n                    <ng-container *ngIf=\"dealHealthScore(); else noHealthScore\">\n                      <div class=\"deal-health__overview\">\n                        <!-- Score Gauge -->\n                        <div class=\"deal-health__gauge\">\n                          <svg viewBox=\"0 0 120 120\" class=\"deal-health__gauge-svg\">\n                            <circle cx=\"60\" cy=\"60\" r=\"52\" fill=\"none\" stroke=\"#e5e7eb\" stroke-width=\"8\" />\n                            <circle cx=\"60\" cy=\"60\" r=\"52\"\n                              fill=\"none\"\n                              [attr.stroke]=\"healthScoreColor(dealHealthScore()!.score)\"\n                              stroke-width=\"8\"\n                              stroke-linecap=\"round\"\n                              [attr.stroke-dasharray]=\"(dealHealthScore()!.score / 100 * 326.7) + ' 326.7'\"\n                              transform=\"rotate(-90 60 60)\"\n                              class=\"deal-health__gauge-fill\"\n                            />\n                            <text x=\"60\" y=\"55\" text-anchor=\"middle\" class=\"deal-health__gauge-value\">{{ dealHealthScore()!.score }}</text>\n                            <text x=\"60\" y=\"72\" text-anchor=\"middle\" class=\"deal-health__gauge-label\">{{ dealHealthScore()!.label }}</text>\n                          </svg>\n                        </div>\n\n                        <!-- Score Details -->\n                        <div class=\"deal-health__details\">\n                          <div class=\"deal-health__rationale\">\n                            <i class=\"pi pi-info-circle\"></i>\n                            <span>{{ dealHealthScore()!.rationale }}</span>\n                          </div>\n                          <div class=\"deal-health__meta\">\n                            <span class=\"deal-health__confidence\">\n                              <i class=\"pi pi-verified\"></i>\n                              Confidence: {{ (dealHealthScore()!.confidence * 100) | number:'1.0-0' }}%\n                            </span>\n                            <span class=\"deal-health__computed\">\n                              Computed {{ dealHealthScore()!.computedUtc | date:'short' }}\n                            </span>\n                          </div>\n                        </div>\n                      </div>\n\n                      <!-- Factor Breakdown -->\n                      <div class=\"deal-health__factors\">\n                        <h4 class=\"deal-health__factors-title\">\n                          <i class=\"pi pi-chart-bar\"></i>\n                          Score Breakdown\n                        </h4>\n                        <div class=\"deal-health__factor\" *ngFor=\"let factor of dealHealthScore()!.factors\">\n                          <div class=\"deal-health__factor-header\">\n                            <span class=\"deal-health__factor-name\">{{ factor.factor }}</span>\n                            <span class=\"deal-health__factor-score\">{{ factor.score }} / {{ factor.maxScore }}</span>\n                          </div>\n                          <div class=\"deal-health__factor-bar\">\n                            <div class=\"deal-health__factor-bar-fill\"\n                              [style.width.%]=\"factor.maxScore > 0 ? (factor.score / factor.maxScore * 100) : 0\"\n                              [style.background]=\"healthScoreColor(factor.maxScore > 0 ? (factor.score / factor.maxScore * 100) : 0)\"\n                            ></div>\n                          </div>\n                        </div>\n                      </div>\n                    </ng-container>\n\n                    <ng-template #noHealthScore>\n                      <div class=\"deal-health__empty\">\n                        <i class=\"pi pi-heart\"></i>\n                        <p>Health score not yet computed.</p>\n                        <span class=\"deal-health__empty-hint\">Click Refresh to compute the deal health score.</span>\n                      </div>\n                    </ng-template>\n                  </section>\n                </ng-container>\n                <ng-template #healthScoreLoading>\n                  <section class=\"form-card opportunity-accordion-card section-loading-card\">\n                    <p class=\"helper-text\">{{ isSectionLoading('deal-health-score') ? 'Computing health score\u2026' : 'Open section to load health score.' }}</p>\n                  </section>\n                </ng-template>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel *ngIf=\"isSectionVisible('deal-aging')\" value=\"deal-aging\" [disabled]=\"isSectionLocked('deal-aging')\" [attr.data-deal-section]=\"'deal-aging'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-stopwatch\"></i>\n                    Deal Aging\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span\n                      [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + sectionStatusTone('deal-aging')\"\n                    >\n                      {{ sectionStatusLabel('deal-aging') }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n                <ng-container *ngIf=\"isSectionLoaded('deal-aging'); else agingLoading\">\n                  <section class=\"form-card opportunity-accordion-card deal-aging\">\n                    <!-- Total age header -->\n                    <div class=\"deal-aging__header\">\n                      <div class=\"deal-aging__total\">\n                        <span class=\"deal-aging__total-value\">{{ totalDealAgeDays() }}</span>\n                        <span class=\"deal-aging__total-label\">days total</span>\n                      </div>\n                      <div class=\"deal-aging__stage-count\">\n                        {{ stageDurations().length }} stage{{ stageDurations().length === 1 ? '' : 's' }}\n                      </div>\n                    </div>\n\n                    <!-- Stage timeline -->\n                    <div class=\"deal-aging__timeline\" *ngIf=\"stageDurations().length; else agingEmpty\">\n                      <div class=\"deal-aging__bar-container\">\n                        <div\n                          *ngFor=\"let sd of stageDurations(); let i = index\"\n                          class=\"deal-aging__bar-segment\"\n                          [style.flex]=\"sd.durationDays || 1\"\n                          [class.deal-aging__bar-segment--current]=\"sd.isCurrent\"\n                          [title]=\"sd.stage + ': ' + sd.durationDays + ' days'\"\n                        ></div>\n                      </div>\n\n                      <div class=\"deal-aging__stages\">\n                        <div\n                          *ngFor=\"let sd of stageDurations(); let i = index\"\n                          class=\"deal-aging__stage\"\n                          [class.deal-aging__stage--current]=\"sd.isCurrent\"\n                        >\n                          <div class=\"deal-aging__stage-marker\">\n                            <span class=\"deal-aging__stage-dot\" [class.deal-aging__stage-dot--current]=\"sd.isCurrent\"></span>\n                            <span class=\"deal-aging__stage-line\" *ngIf=\"i < stageDurations().length - 1\"></span>\n                          </div>\n                          <div class=\"deal-aging__stage-info\">\n                            <div class=\"deal-aging__stage-name\">{{ sd.stage }}</div>\n                            <div class=\"deal-aging__stage-duration\">\n                              <strong>{{ sd.durationDays }}</strong> day{{ sd.durationDays === 1 ? '' : 's' }}\n                              <span class=\"deal-aging__stage-badge\" *ngIf=\"sd.isCurrent\">Current</span>\n                            </div>\n                            <div class=\"deal-aging__stage-date\">\n                              {{ sd.enteredAt | date:'MMM d, yyyy' }}\n                              <span *ngIf=\"sd.exitedAt\"> \u2192 {{ sd.exitedAt | date:'MMM d, yyyy' }}</span>\n                              <span *ngIf=\"!sd.exitedAt\"> \u2192 now</span>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n\n                    <ng-template #agingEmpty>\n                      <div class=\"deal-aging__empty\">\n                        <i class=\"pi pi-stopwatch\"></i>\n                        <p>No stage history recorded yet.</p>\n                      </div>\n                    </ng-template>\n                  </section>\n                </ng-container>\n                <ng-template #agingLoading>\n                  <section class=\"form-card opportunity-accordion-card section-loading-card\">\n                    <p class=\"helper-text\">{{ isSectionLoading('deal-aging') ? 'Loading stage history\u2026' : 'Open section to load stage history.' }}</p>\n                  </section>\n                </ng-template>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel value=\"deal-attachments\" [attr.data-deal-section]=\"'deal-attachments'\">\n              <p-accordion-header>\n                <div class=\"opportunity-accordion-header\">\n                  <span class=\"opportunity-accordion-title\">\n                    <i class=\"pi pi-paperclip\"></i>\n                    File Attachments\n                  </span>\n                  <span class=\"opportunity-accordion-header-meta\">\n                    <span class=\"opportunity-accordion-badge opportunity-accordion-badge--info\">\n                      {{ dealAttachments().length }} file{{ dealAttachments().length !== 1 ? 's' : '' }}\n                    </span>\n                  </span>\n                </div>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-card opportunity-accordion-card deal-attachments-section\">\n                  <div class=\"deal-attachments\" *ngIf=\"isEditMode()\">\n                    <!-- Upload area -->\n                    <div class=\"deal-attachments__upload\">\n                      <p-fileUpload\n                        mode=\"basic\"\n                        [customUpload]=\"true\"\n                        [auto]=\"true\"\n                        chooseLabel=\"Attach File\"\n                        chooseIcon=\"pi pi-upload\"\n                        (uploadHandler)=\"onDealAttachmentUpload($event)\"\n                        [disabled]=\"dealAttachmentUploading()\"\n                      ></p-fileUpload>\n                      <span class=\"deal-attachments__upload-hint\" *ngIf=\"dealAttachmentUploading()\">\n                        <i class=\"pi pi-spinner pi-spin\"></i> Uploading\u2026\n                      </span>\n                    </div>\n\n                    <!-- Loading state -->\n                    <div class=\"deal-attachments__loading\" *ngIf=\"dealAttachmentsLoading()\">\n                      <i class=\"pi pi-spinner pi-spin\"></i> Loading attachments\u2026\n                    </div>\n\n                    <!-- File list -->\n                    <p-table\n                      *ngIf=\"!dealAttachmentsLoading() && dealAttachments().length\"\n                      [value]=\"dealAttachments()\"\n                      [rows]=\"10\"\n                      styleClass=\"p-datatable-sm\"\n                    >\n                      <ng-template pTemplate=\"header\">\n                        <tr>\n                          <th>File Name</th>\n                          <th>Size</th>\n                          <th>Uploaded</th>\n                          <th style=\"width: 100px; text-align: center;\">Actions</th>\n                        </tr>\n                      </ng-template>\n                      <ng-template pTemplate=\"body\" let-item>\n                        <tr>\n                          <td>\n                            <div class=\"deal-attachment-name\">\n                              <i class=\"pi pi-file\"></i>\n                              <span>{{ item.fileName }}</span>\n                            </div>\n                          </td>\n                          <td>{{ item.size | number:'1.0-0' }} KB</td>\n                          <td>{{ item.createdAtUtc | date:'mediumDate' }}</td>\n                          <td class=\"deal-attachment-actions\">\n                            <div class=\"row-actions\">\n                              <button type=\"button\" class=\"row-action-btn row-action-btn--view\" title=\"Download\" (click)=\"downloadDealAttachment(item)\">\n                                <i class=\"pi pi-download\"></i>\n                              </button>\n                              <button\n                                type=\"button\"\n                                class=\"row-action-btn row-action-btn--delete\"\n                                title=\"Delete\"\n                                (click)=\"deleteDealAttachment(item)\"\n                                [disabled]=\"dealAttachmentDeletingIds().includes(item.id)\"\n                              >\n                                <i class=\"pi\" [ngClass]=\"dealAttachmentDeletingIds().includes(item.id) ? 'pi-spinner pi-spin' : 'pi-trash'\"></i>\n                              </button>\n                            </div>\n                          </td>\n                        </tr>\n                      </ng-template>\n                    </p-table>\n\n                    <!-- Empty state -->\n                    <div class=\"deal-attachments__empty\" *ngIf=\"!dealAttachmentsLoading() && !dealAttachments().length\">\n                      <i class=\"pi pi-cloud-upload\"></i>\n                      <p>No files attached yet.</p>\n                      <span class=\"deal-attachments__empty-hint\">Upload contracts, proposals, or other documents related to this deal.</span>\n                    </div>\n                  </div>\n\n                  <div class=\"deal-attachments__empty\" *ngIf=\"!isEditMode()\">\n                    <i class=\"pi pi-inbox\"></i>\n                    <p>Save the deal first to attach files.</p>\n                  </div>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n                  </p-accordion>\n                </p-tabpanel>\n              </p-tabpanels>\n            </p-tabs>\n          </fieldset>\n\n          <section class=\"form-card opportunity-accordion-card decision-review-panel\" *ngIf=\"decisionReviewMode()\">\n            <h2 class=\"section-title\">Review Action</h2>\n            <p class=\"section-subtitle\">Decision summary and reviewer comment for this pending case.</p>\n            <div class=\"decision-summary\" *ngIf=\"decisionReviewSummary() as summary\">\n              <div class=\"decision-summary-grid\">\n                <div class=\"decision-summary-item\">\n                  <span class=\"decision-summary-label\">Purpose</span>\n                  <span class=\"decision-summary-value\">{{ summary.purpose }}</span>\n                </div>\n                <div class=\"decision-summary-item\">\n                  <span class=\"decision-summary-label\">Status</span>\n                  <span class=\"decision-summary-value\">{{ summary.status }}</span>\n                </div>\n                <div class=\"decision-summary-item\">\n                  <span class=\"decision-summary-label\">Amount</span>\n                  <span class=\"decision-summary-value\">{{ summary.amount | number:'1.0-2' }} {{ summary.currency }}</span>\n                </div>\n                <div class=\"decision-summary-item\">\n                  <span class=\"decision-summary-label\">Requested by</span>\n                  <span class=\"decision-summary-value\">{{ summary.requestedByName || 'Unknown' }}</span>\n                </div>\n                <div class=\"decision-summary-item\">\n                  <span class=\"decision-summary-label\">Requested on</span>\n                  <span class=\"decision-summary-value\">{{ summary.requestedOn | date:'MMM d, y, h:mm a' }}</span>\n                </div>\n                <div class=\"decision-summary-item\" *ngIf=\"summary.approverRole\">\n                  <span class=\"decision-summary-label\">Approver role</span>\n                  <span class=\"decision-summary-value\">{{ summary.approverRole }}</span>\n                </div>\n              </div>\n            </div>\n            <div class=\"form-grid\">\n              <div class=\"form-field full-row\">\n                <label for=\"decisionReviewComment\">Comment for reviewer / requester</label>\n                <textarea\n                  id=\"decisionReviewComment\"\n                  pTextarea\n                  rows=\"3\"\n                  class=\"w-full\"\n                  [(ngModel)]=\"decisionReviewComment\"\n                  name=\"decisionReviewComment\"\n                  placeholder=\"Explain decision rationale or required changes\"\n                ></textarea>\n              </div>\n            </div>\n            <div class=\"decision-action-row\">\n              <p-select\n                appendTo=\"body\"\n                [options]=\"decisionActionOptions\"\n                optionLabel=\"label\"\n                optionValue=\"value\"\n                name=\"decisionAction\"\n                [(ngModel)]=\"decisionAction\"\n                placeholder=\"Select action\"\n                styleClass=\"w-full\"\n              ></p-select>\n              <button\n                pButton\n                type=\"button\"\n                class=\"crm-button--primary\"\n                [disabled]=\"decisionActionSubmitting() || !decisionAction\"\n                (click)=\"submitDecisionAction()\"\n              >\n                {{ decisionActionSubmitting() ? 'Submitting...' : 'Submit Action' }}\n              </button>\n            </div>\n          </section>\n\n          <section class=\"form-card opportunity-accordion-card approval-history-section\" *ngIf=\"decisionReviewMode()\">\n            <div class=\"approval-history-header\">\n              <h2 class=\"section-title\">Approval History</h2>\n              <span class=\"opportunity-accordion-badge\">{{ decisionHistory().length }} entries</span>\n            </div>\n\n            <div class=\"approval-history-list\" *ngIf=\"decisionHistory().length; else emptyDecisionHistory\">\n              <article class=\"approval-history-item\" *ngFor=\"let item of decisionHistory()\">\n                <div class=\"approval-history-item__header\">\n                  <span\n                    class=\"opportunity-accordion-badge\"\n                    [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + decisionHistoryTone(item)\"\n                  >\n                    {{ item.action }}\n                  </span>\n                  <span\n                    class=\"opportunity-accordion-badge\"\n                    [class]=\"'opportunity-accordion-badge opportunity-accordion-badge--' + decisionStatusTone(item.status)\"\n                  >\n                    {{ item.status }}\n                  </span>\n                  <span class=\"approval-history-meta\">\n                    {{ item.actorName || 'System' }} \u00B7 {{ item.actionAtUtc | date: 'MMM d, y, h:mm a' }}\n                  </span>\n                </div>\n                <div class=\"approval-history-item__details\">\n                  <span>Priority: {{ item.priority || 'normal' }}</span>\n                  <span>Risk: {{ item.riskLevel || 'low' }}</span>\n                  <span *ngIf=\"item.isEscalated\">Escalated</span>\n                </div>\n                <p class=\"approval-history-notes\" *ngIf=\"item.notes\">{{ item.notes }}</p>\n                <p class=\"approval-history-policy\" *ngIf=\"item.policyReason\">{{ item.policyReason }}</p>\n              </article>\n            </div>\n            <ng-template #emptyDecisionHistory>\n              <p class=\"helper-text\">No approval history yet for this decision.</p>\n            </ng-template>\n          </section>\n\n          <div class=\"form-actions\">\n            <button\n              type=\"button\"\n              pButton\n              label=\"Cancel\"\n              class=\"crm-button--ghost\"\n              (click)=\"router.navigate(['/app/deals'])\"\n            ></button>\n            <button\n              type=\"button\"\n              pButton\n              [label]=\"primarySaveLabel()\"\n              icon=\"pi pi-check\"\n              class=\"crm-button--primary\"\n              [disabled]=\"saving() || draftSaving() || decisionReviewMode() || requesterApprovalLocked()\"\n              (click)=\"onSave()\"\n            ></button>\n            <p-splitbutton\n              [label]=\"draftButtonLabel()\"\n              icon=\"pi pi-bookmark\"\n              styleClass=\"crm-draft-splitbutton\"\n              buttonStyleClass=\"crm-button--secondary\"\n              menuButtonStyleClass=\"crm-button--secondary\"\n              appendTo=\"body\"\n              [disabled]=\"saving() || draftSaving() || decisionReviewMode() || requesterApprovalLocked()\"\n              [model]=\"draftSplitButtonItems()\"\n              (onClick)=\"saveDraft()\"\n            ></p-splitbutton>\n          </div>\n        </form>\n\n        <!-- Duplicate Check Dialog -->\n        <p-dialog\n          [header]=\"duplicateDialogTitle()\"\n          [modal]=\"true\"\n          [draggable]=\"false\"\n          [resizable]=\"false\"\n          [closable]=\"true\"\n          [dismissableMask]=\"true\"\n          [visible]=\"duplicateDialogVisible()\"\n          [style]=\"{ width: '42rem', maxWidth: '95vw' }\"\n          (visibleChange)=\"duplicateDialogVisible.set($event)\"\n          (onHide)=\"dismissDuplicateDialog()\"\n        >\n          <div class=\"duplicate-dialog\">\n            <p class=\"duplicate-dialog__message\">{{ duplicateDialogMessage() }}</p>\n            <div class=\"duplicate-dialog__list\" *ngIf=\"duplicateMatches().length; else noDuplicateMatches\">\n              <div class=\"duplicate-row\" *ngFor=\"let match of duplicateMatches()\">\n                <div class=\"duplicate-row__meta\">\n                  <div class=\"duplicate-row__name\">{{ match.name }}</div>\n                  <div class=\"duplicate-row__account\">{{ match.accountName || 'No account' }}</div>\n                  <div class=\"duplicate-row__stage\">{{ match.stageName }}</div>\n                  <div class=\"duplicate-row__signals\">{{ match.matchedSignals.join(', ') }}</div>\n                </div>\n                <div class=\"duplicate-row__score\">\n                  <span class=\"duplicate-row__badge\" [attr.data-level]=\"match.matchLevel\">{{ match.matchLevel | titlecase }}</span>\n                  <span>Score {{ match.matchScore }}</span>\n                </div>\n                <button pButton type=\"button\" class=\"p-button-text p-button-sm\" label=\"Open\"\n                  (click)=\"reviewDuplicate(match)\"></button>\n              </div>\n            </div>\n            <ng-template #noDuplicateMatches>\n              <p class=\"duplicate-dialog__message\">No duplicate details found.</p>\n            </ng-template>\n            <div class=\"duplicate-dialog__actions\">\n              <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Cancel\" (click)=\"dismissDuplicateDialog()\"></button>\n              <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Save Anyway\"\n                *ngIf=\"!duplicateIsBlocked()\" (click)=\"saveDespiteWarning()\"></button>\n            </div>\n          </div>\n        </p-dialog>\n\n      </div>\n    </section>\n  \n", styles: ["@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n:host {\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.opportunity-form-page {\n  @include form.form-page-base;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.form-header {\n  @include form.form-page-header;\n  position: relative;\n  top: auto;\n  overflow: visible;\n}\n\n.header-content {\n  @include form.form-header-content;\n}\n\n.back-link {\n  @include form.form-back-link;\n}\n\n.header-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n\n.header-title {\n  @include form.form-header-title;\n}\n\n.deal-header-progress {\n  --deal-header-score-color: #2563eb;\n  display: flex;\n  align-items: center;\n  gap: 0.9rem;\n  margin-top: 1rem;\n  padding: 0.78rem 0.9rem;\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.18);\n  background:\n    radial-gradient(circle at 8% 15%, rgba(59, 130, 246, 0.14), transparent 42%),\n    radial-gradient(circle at 90% 18%, rgba(16, 185, 129, 0.11), transparent 36%),\n    linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0.68));\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.54),\n    0 14px 26px rgba(15, 23, 42, 0.08);\n  backdrop-filter: blur(12px) saturate(124%);\n  -webkit-backdrop-filter: blur(12px) saturate(124%);\n  max-width: 34rem;\n}\n\n.deal-header-progress__dial {\n  flex: 0 0 auto;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 96px;\n  height: 96px;\n  border-radius: 20px;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(241, 245, 249, 0.7));\n  border: 1px solid rgba(148, 163, 184, 0.14);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.54),\n    0 10px 18px rgba(15, 23, 42, 0.05);\n}\n\n:host ::ng-deep .deal-header-progress__knob {\n  width: 92px;\n}\n\n:host ::ng-deep .deal-header-progress__knob .p-knob-text {\n  font-size: 1rem;\n  font-weight: 800;\n  fill: #1e293b;\n}\n\n.deal-header-progress__content {\n  min-width: 0;\n  display: grid;\n  gap: 0.22rem;\n  align-content: center;\n}\n\n.deal-header-progress__eyebrow {\n  font-size: 0.7rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #64748b;\n}\n\n.deal-header-progress__meta {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n\n.deal-header-progress__status,\n.deal-header-progress__step {\n  display: inline-flex;\n  align-items: center;\n  min-height: 1.8rem;\n  padding: 0.2rem 0.55rem;\n  border-radius: 999px;\n  font-size: 0.76rem;\n  font-weight: 700;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.72);\n  color: #1e293b;\n}\n\n.deal-header-progress__status {\n  color: #0f766e;\n  background: rgba(204, 251, 241, 0.82);\n  border-color: rgba(45, 212, 191, 0.28);\n}\n\n.deal-header-progress__copy {\n  margin: 0;\n  color: #475569;\n  font-size: 0.82rem;\n  line-height: 1.5;\n  max-width: 28rem;\n}\n\n.header-meta {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n\n.presence-strip {\n  margin-top: 0.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n\n.presence-focus {\n  margin-top: 0.55rem;\n  display: inline-flex;\n  position: relative;\n  align-items: center;\n  gap: 0.45rem;\n  border-radius: 0.75rem;\n  padding: 0.4rem 0.7rem;\n  font-size: 0.8rem;\n  font-weight: 700;\n  border: 1px solid rgba(14, 165, 233, 0.22);\n  color: #0c4a6e;\n  background: linear-gradient(135deg, rgba(224, 242, 254, 0.95), rgba(186, 230, 253, 0.92));\n  box-shadow: 0 8px 18px rgba(2, 132, 199, 0.18), 0 0 0 1px rgba(125, 211, 252, 0.28) inset;\n  -webkit-user-select: none;\n  user-select: none;\n  caret-color: transparent;\n  cursor: default;\n\n  &::selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  &::-moz-selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  // Glowing comet that orbits OUTSIDE the chip border\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 2rem;\n    height: 2px;\n    border-radius: 999px;\n    background: linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.6) 15%,\n      rgba(255, 255, 255, 1) 50%,\n      rgba(255, 255, 255, 0.6) 85%,\n      transparent 100%\n    );\n    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1))\n            drop-shadow(0 0 5px rgba(186, 230, 253, 0.9))\n            drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))\n            drop-shadow(0 0 18px rgba(14, 165, 233, 0.35));\n    offset-path: inset(0px round 0.75rem);\n    offset-distance: 0%;\n    offset-rotate: auto;\n    animation: presence-border-tail 3.5s linear infinite;\n    will-change: offset-distance;\n    pointer-events: none;\n    z-index: 3;\n  }\n\n  > * {\n    position: relative;\n    z-index: 1;\n  }\n\n  i {\n    color: #0284c7;\n    font-size: 0.85rem;\n  }\n}\n\n@keyframes presence-border-tail {\n  from { offset-distance: 0%; }\n  to   { offset-distance: 100%; }\n}\n\n.presence-label {\n  font-size: 0.75rem;\n  color: #64748b;\n  font-weight: 600;\n}\n\n.presence-chip {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #0f172a;\n  border: 1px solid rgba(14, 165, 233, 0.32);\n  background: rgba(224, 242, 254, 0.8);\n}\n\n.presence-editing-note {\n  margin-top: 0.45rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  border: 1px solid rgba(251, 146, 60, 0.45);\n  background: linear-gradient(135deg, rgba(255, 247, 237, 0.98), rgba(254, 215, 170, 0.85));\n  color: #9a3412;\n  border-radius: 0.65rem;\n  padding: 0.35rem 0.65rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  box-shadow: 0 8px 18px rgba(251, 146, 60, 0.18), 0 0 0 1px rgba(254, 215, 170, 0.32) inset;\n}\n\n.meta-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  padding: 0.35rem 0.75rem;\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n\n  i {\n    color: #0ea5e9;\n  }\n}\n\n.policy-gate-banner {\n  max-width: 1400px;\n  width: min(1400px, calc(100% - 3rem));\n  margin: 0 auto;\n  padding: 0.85rem 1rem;\n  border-radius: 14px;\n  background: rgba(255, 247, 237, 0.9);\n  border: 1px solid rgba(251, 146, 60, 0.35);\n  color: #7c2d12;\n  display: flex;\n  gap: 0.75rem;\n  align-items: flex-start;\n  box-shadow: 0 10px 24px rgba(124, 45, 18, 0.08);\n\n  i {\n    color: #f97316;\n    margin-top: 0.2rem;\n  }\n\n  strong {\n    display: block;\n    font-size: 0.95rem;\n    margin-bottom: 0.15rem;\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.9rem;\n    line-height: 1.4;\n  }\n\n  .policy-gate-actions {\n    margin-left: auto;\n    align-self: center;\n  }\n\n  .policy-gate-action-button.p-button {\n    border-radius: 999px;\n    padding: 0.45rem 0.8rem;\n    background: linear-gradient(135deg, rgba(37, 99, 235, 0.95), rgba(99, 102, 241, 0.92)) !important;\n    border: 1px solid rgba(191, 219, 254, 0.75) !important;\n    color: #fff !important;\n    box-shadow: 0 10px 22px rgba(37, 99, 235, 0.22);\n    font-weight: 600;\n  }\n}\n\n.decision-review-banner {\n  max-width: 1400px;\n  width: min(1400px, calc(100% - 3rem));\n  margin: 0 auto;\n  padding: 0.85rem 1rem;\n  border-radius: 14px;\n  background: rgba(224, 242, 254, 0.72);\n  border: 1px solid rgba(14, 116, 144, 0.25);\n  color: rgba(12, 74, 110, 0.95);\n  display: flex;\n  gap: 0.75rem;\n  align-items: flex-start;\n  box-shadow: 0 10px 24px rgba(12, 74, 110, 0.08);\n\n  i {\n    color: #0284c7;\n    margin-top: 0.2rem;\n  }\n\n  strong {\n    display: block;\n    font-size: 0.95rem;\n    margin-bottom: 0.1rem;\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.9rem;\n    line-height: 1.4;\n  }\n}\n\n.approval-lock-banner {\n  background: rgba(254, 242, 242, 0.8);\n  border-color: rgba(239, 68, 68, 0.28);\n  color: rgba(127, 29, 29, 0.95);\n\n  i {\n    color: #dc2626;\n  }\n}\n\n.form-body {\n  @include form.form-container;\n}\n\n.deal-sticky-summary {\n  position: relative;\n  top: auto;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 0.6rem;\n  margin-bottom: 0.9rem;\n  padding: 0.65rem;\n  border-radius: 14px;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(248, 250, 252, 0.8)),\n    linear-gradient(135deg, rgba(59, 130, 246, 0.09), rgba(14, 165, 233, 0.08));\n  box-shadow:\n    0 10px 24px rgba(15, 23, 42, 0.08),\n    inset 0 1px 0 rgba(255, 255, 255, 0.72);\n  backdrop-filter: blur(10px);\n}\n\n.deal-sticky-summary .metric-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  min-width: 0;\n  min-height: 92px;\n  transition: all $transition-base;\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 6 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-lg;\n    color: white;\n    flex-shrink: 0;\n    transition: transform $transition-spring;\n  }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n  }\n\n  .metric-value {\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-800;\n    min-width: 0;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    line-height: 1.2;\n  }\n}\n\n.deal-sticky-summary .metric-card--total .metric-value,\n.deal-sticky-summary .metric-card--leads .metric-value,\n.deal-sticky-summary .metric-card--customers .metric-value {\n  white-space: normal;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  overflow: hidden;\n}\n\n.deal-sticky-summary .metric-card--total .metric-icon { background: $primary-gradient; }\n.deal-sticky-summary .metric-card--leads .metric-icon { background: $cyan-gradient; }\n.deal-sticky-summary .metric-card--prospects .metric-icon { background: linear-gradient(135deg, $purple 0%, #9333ea 100%); }\n.deal-sticky-summary .metric-card--customers .metric-icon { background: $success-gradient; }\n.deal-sticky-summary .metric-card--risk .metric-icon { background: $orange-gradient; }\n.deal-sticky-summary .metric-card--approval .metric-icon { background: linear-gradient(135deg, #ef4444 0%, #f43f5e 100%); }\n\n.deal-sticky-summary .metric-card--risk,\n.deal-sticky-summary .metric-card--approval {\n  align-items: center;\n}\n\n.deal-sticky-summary .metric-card__status-badge {\n  margin-top: 0.2rem;\n  align-self: flex-start;\n  display: inline-flex;\n  width: fit-content;\n  max-width: 100%;\n  text-align: left;\n  white-space: normal;\n  overflow: visible;\n  text-overflow: clip;\n  overflow-wrap: anywhere;\n  line-height: 1.2;\n}\n\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.form-layout {\n  @include form.form-layout;\n}\n\n.form-lock-fieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\n\n// \u2500\u2500 Deal Tabs \u2500\u2500\n.deal-tabs-shell {\n  margin-bottom: 0.55rem;\n  padding: 0;\n  border-radius: 16px;\n  background: transparent;\n  border: none;\n  box-shadow: none;\n}\n\n:host ::ng-deep .deal-tabs .p-tablist {\n  display: flex;\n  gap: 0;\n  flex-wrap: nowrap;\n  padding: 0;\n  border-radius: 16px;\n  background: linear-gradient(180deg, rgba(23, 50, 93, 0.84), rgba(16, 37, 71, 0.9));\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.12),\n    0 8px 18px rgba(15, 23, 42, 0.08);\n  overflow: hidden;\n  position: relative;\n  backdrop-filter: blur(10px) saturate(125%);\n  -webkit-backdrop-filter: blur(10px) saturate(125%);\n}\n\n:host ::ng-deep .deal-tabs .p-tablist-tab-list {\n  border: none !important;\n}\n\n:host ::ng-deep .deal-tabs .p-tab {\n  flex: 1 1 0;\n  min-width: 0;\n  min-height: 56px;\n  border: none;\n  border-radius: 0;\n  padding: 0.35rem 0.8rem 0.4rem;\n  font-size: 0.86rem;\n  font-weight: 700;\n  color: rgba(255, 255, 255, 0.96);\n  opacity: 1 !important;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  line-height: 1.18;\n  cursor: pointer;\n  transition: transform 0.18s ease, filter 0.18s ease, box-shadow 0.18s ease;\n  position: relative;\n  overflow: visible;\n  z-index: 1;\n  text-shadow: 0 1px 2px rgba(15, 23, 42, 0.28);\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),\n    var(--deal-tab-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n  clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%, 14px 50%);\n  margin-right: -20px;\n  filter: none;\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.1),\n    inset 0 -1px 0 rgba(255, 255, 255, 0.08);\n  backdrop-filter: blur(8px) saturate(120%);\n  -webkit-backdrop-filter: blur(8px) saturate(120%);\n}\n\n:host ::ng-deep .deal-tabs .p-tab::before {\n  content: '';\n  position: absolute;\n  inset: 0 0 auto 0;\n  height: 45%;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));\n  opacity: 0.8;\n  pointer-events: none;\n  clip-path: inherit;\n}\n\n:host ::ng-deep .deal-tabs .p-tab::after {\n  content: '';\n  position: absolute;\n  left: 6%;\n  right: 8%;\n  bottom: 4px;\n  height: 2px;\n  border-radius: 999px;\n  background: linear-gradient(90deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.12));\n  opacity: 0.45;\n  pointer-events: none;\n}\n\n:host ::ng-deep .deal-tabs .p-tab:first-child {\n  clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%);\n  margin-left: 0;\n  border-top-left-radius: 12px;\n  border-bottom-left-radius: 12px;\n  z-index: 2;\n}\n\n:host ::ng-deep .deal-tabs .p-tab:last-child {\n  clip-path: polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%);\n  margin-right: 0;\n  border-top-right-radius: 12px;\n  border-bottom-right-radius: 12px;\n}\n\n// Per-tab gradient colours\n:host ::ng-deep .deal-tabs .p-tab:nth-child(1) {\n  --deal-tab-bg: linear-gradient(135deg, #3f8dff 0%, #2364da 100%); // Core \u2013 blue\n}\n:host ::ng-deep .deal-tabs .p-tab:nth-child(2) {\n  --deal-tab-bg: linear-gradient(135deg, #36c3df 0%, #1497c0 100%); // Commercial \u2013 cyan\n}\n:host ::ng-deep .deal-tabs .p-tab:nth-child(3) {\n  --deal-tab-bg: linear-gradient(135deg, #ffaf47 0%, #f07f10 100%); // People \u2013 orange\n}\n:host ::ng-deep .deal-tabs .p-tab:nth-child(4) {\n  --deal-tab-bg: linear-gradient(135deg, #8b6bff 0%, #6948e4 100%); // Compliance \u2013 purple\n}\n:host ::ng-deep .deal-tabs .p-tab:nth-child(5) {\n  --deal-tab-bg: linear-gradient(135deg, #6f84aa 0%, #556f94 100%); // Delivery \u2013 slate\n}\n\n// \u2500\u2500 Active tab \u2500\u2500\n:host ::ng-deep .deal-tabs .p-tab.p-tab-active,\n:host ::ng-deep .deal-tabs .p-tab[aria-selected='true'],\n:host ::ng-deep .deal-tabs .p-tab[data-p-active='true'] {\n  z-index: 4;\n  opacity: 1;\n  filter: brightness(1.05) saturate(1.1);\n  background:\n    linear-gradient(180deg, rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.12)),\n    radial-gradient(circle at 50% 16%, rgba(255, 255, 255, 0.28), transparent 58%),\n    var(--deal-tab-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, 0.32),\n    inset 0 -1px 0 rgba(255, 255, 255, 0.2),\n    0 0 0 1px rgba(255, 255, 255, 0.28),\n    0 0 0 3px rgba(255, 255, 255, 0.12),\n    0 10px 22px rgba(15, 23, 42, 0.22),\n    0 0 32px rgba(125, 211, 252, 0.3);\n  transform: translateY(-2px) scale(1.02);\n  animation: deal-tab-breathe 1.8s ease-in-out infinite;\n}\n\n:host ::ng-deep .deal-tabs .p-tab.p-tab-active .deal-tab-label,\n:host ::ng-deep .deal-tabs .p-tab[aria-selected='true'] .deal-tab-label,\n:host ::ng-deep .deal-tabs .p-tab[data-p-active='true'] .deal-tab-label {\n  color: #ffffff;\n  text-shadow: 0 1px 1px rgba(15, 23, 42, 0.18), 0 0 12px rgba(255, 255, 255, 0.16);\n}\n\n:host ::ng-deep .deal-tabs .p-tab.p-tab-active::after,\n:host ::ng-deep .deal-tabs .p-tab[aria-selected='true']::after,\n:host ::ng-deep .deal-tabs .p-tab[data-p-active='true']::after {\n  height: 3px;\n  bottom: 3px;\n  left: 8%;\n  right: 10%;\n  opacity: 1;\n  background: linear-gradient(\n    90deg,\n    rgba(255, 255, 255, 0.16) 0%,\n    rgba(239, 68, 68, 0.95) 12%,\n    rgba(245, 158, 11, 0.95) 26%,\n    rgba(250, 204, 21, 0.95) 38%,\n    rgba(34, 197, 94, 0.95) 50%,\n    rgba(59, 130, 246, 0.98) 64%,\n    rgba(139, 92, 246, 0.98) 78%,\n    rgba(236, 72, 153, 0.95) 90%,\n    rgba(255, 255, 255, 0.18) 100%\n  );\n  box-shadow:\n    0 0 6px rgba(255, 255, 255, 0.35),\n    0 0 14px rgba(59, 130, 246, 0.28),\n    0 0 20px rgba(236, 72, 153, 0.2),\n    0 1px 0 rgba(15, 23, 42, 0.12);\n  background-size: 320% 100%;\n  animation: deal-tab-active-strip 3.4s linear infinite;\n}\n\n:host ::ng-deep .deal-tabs .p-tab.p-tab-active::before,\n:host ::ng-deep .deal-tabs .p-tab[aria-selected='true']::before,\n:host ::ng-deep .deal-tabs .p-tab[data-p-active='true']::before {\n  opacity: 0.95;\n}\n\n// \u2500\u2500 Inactive / hover / focus / disabled \u2500\u2500\n:host ::ng-deep .deal-tabs .p-tab:not(.p-tab-active):not([aria-selected='true']):not([data-p-active='true']) {\n  opacity: 1;\n  transition: opacity 250ms, transform 250ms, filter 250ms;\n}\n\n:host ::ng-deep .deal-tabs .p-tab:hover:not(.p-disabled):not(.p-tab-active):not([aria-selected='true']):not([data-p-active='true']) {\n  opacity: 1;\n  transform: translateY(-1px);\n  filter: brightness(1.05) saturate(1.05);\n  z-index: 6;\n}\n\n:host ::ng-deep .deal-tabs .p-tab:focus-visible {\n  outline: none;\n  z-index: 6;\n  box-shadow:\n    0 0 0 2px rgba(255, 255, 255, 0.28),\n    0 0 0 5px rgba(59, 130, 246, 0.2);\n}\n\n:host ::ng-deep .deal-tabs .p-tab.p-disabled {\n  cursor: not-allowed;\n  opacity: 0.62;\n  filter: grayscale(0.08) saturate(0.65);\n}\n\n.deal-tab-label {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  max-width: 100%;\n  text-wrap: balance;\n  white-space: normal;\n  font-size: 0.88rem;\n  font-weight: 700;\n  letter-spacing: 0.005em;\n\n  i {\n    font-size: 0.92rem;\n  }\n}\n\n// \u2500\u2500 Tab animations \u2500\u2500\n@keyframes deal-tab-breathe {\n  0%, 100% {\n    box-shadow:\n      inset 0 1px 0 rgba(255, 255, 255, 0.24),\n      inset 0 -1px 0 rgba(255, 255, 255, 0.16),\n      0 0 0 1px rgba(255, 255, 255, 0.2),\n      0 0 0 3px rgba(255, 255, 255, 0.08),\n      0 10px 18px rgba(15, 23, 42, 0.16),\n      0 0 20px rgba(125, 211, 252, 0.18);\n  }\n  50% {\n    box-shadow:\n      inset 0 1px 0 rgba(255, 255, 255, 0.28),\n      inset 0 -1px 0 rgba(255, 255, 255, 0.18),\n      0 0 0 1px rgba(255, 255, 255, 0.28),\n      0 0 0 4px rgba(255, 255, 255, 0.1),\n      0 12px 22px rgba(15, 23, 42, 0.18),\n      0 0 30px rgba(255, 255, 255, 0.16),\n      0 0 34px rgba(125, 211, 252, 0.24);\n  }\n}\n\n@keyframes deal-tab-active-strip {\n  0%, 100% {\n    background-position: 0% 50%;\n    opacity: 0.88;\n    transform: scaleX(0.985);\n  }\n  50% {\n    background-position: 100% 50%;\n    opacity: 1;\n    transform: scaleX(1);\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  :host ::ng-deep .deal-tabs .p-tab.p-tab-active {\n    animation: none;\n  }\n  :host ::ng-deep .deal-tabs .p-tab.p-tab-active::after {\n    animation: none;\n  }\n}\n\n@media (max-width: 980px) {\n  :host ::ng-deep .deal-tabs .p-tablist {\n    overflow-x: auto;\n    padding-bottom: 0.35rem;\n    scrollbar-width: thin;\n  }\n}\n\n.form-layout--read-only {\n  .form-lock-fieldset {\n    opacity: 0.62;\n    filter: saturate(0.72);\n  }\n\n  .opportunity-accordion-card input,\n  .opportunity-accordion-card textarea,\n  .opportunity-accordion-card .p-inputtext,\n  .opportunity-accordion-card .p-inputnumber,\n  .opportunity-accordion-card .p-datepicker,\n  .opportunity-accordion-card .p-select,\n  .opportunity-accordion-card .btn-glass,\n  .opportunity-accordion-card .crm-button--primary,\n  .opportunity-accordion-card .crm-button--ghost {\n    pointer-events: none;\n  }\n\n  .opportunity-accordion-card input,\n  .opportunity-accordion-card textarea,\n  .opportunity-accordion-card .p-inputtext,\n  .opportunity-accordion-card .p-inputnumber .p-inputtext,\n  .opportunity-accordion-card .p-select,\n  .opportunity-accordion-card .p-datepicker input,\n  .opportunity-accordion-card .p-multiselect,\n  .opportunity-accordion-card .p-inputnumber-input {\n    background: rgba(248, 250, 252, 0.72) !important;\n    color: rgba(51, 65, 85, 0.85) !important;\n  }\n\n  .decision-review-panel textarea,\n  .decision-review-panel .crm-button--primary,\n  .decision-review-panel .crm-button--ghost {\n    pointer-events: auto;\n  }\n}\n\n.opportunity-section-accordion {\n  display: grid;\n  gap: 0.9rem;\n}\n\n.opportunity-accordion-header {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n\n.opportunity-accordion-header-meta {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.opportunity-accordion-title {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.55rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n\n  i {\n    color: #2563eb;\n    font-size: 0.95rem;\n  }\n}\n\n.opportunity-accordion-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.22rem 0.6rem;\n  border-radius: 999px;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  background: rgba(255, 255, 255, 0.86);\n  color: rgba(51, 65, 85, 0.9);\n  font-size: 0.72rem;\n  font-weight: 700;\n  line-height: 1.1;\n  white-space: nowrap;\n  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);\n}\n\n.opportunity-accordion-badge--neutral { background: rgba(248, 250, 252, 0.9); color: rgba(71, 85, 105, 0.95); }\n.opportunity-accordion-badge--info { background: rgba(59, 130, 246, 0.12); border-color: rgba(59, 130, 246, 0.22); color: #1d4ed8; }\n.opportunity-accordion-badge--warning { background: rgba(245, 158, 11, 0.14); border-color: rgba(245, 158, 11, 0.26); color: #b45309; }\n.opportunity-accordion-badge--success { background: rgba(16, 185, 129, 0.14); border-color: rgba(16, 185, 129, 0.24); color: #047857; }\n.opportunity-accordion-badge--danger { background: rgba(239, 68, 68, 0.14); border-color: rgba(239, 68, 68, 0.24); color: #b91c1c; }\n\n.opportunity-accordion-card {\n  margin: 0;\n}\n\n:host ::ng-deep .opportunity-section-accordion .p-accordionpanel {\n  border-radius: 18px;\n  border: 1px solid rgba(148, 163, 184, 0.16);\n  background: rgba(255, 255, 255, 0.7);\n  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);\n  overflow: hidden;\n}\n\n:host ::ng-deep .opportunity-section-accordion .p-accordionheader .p-accordionheader-link {\n  padding: 0.9rem 1rem;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(248, 250, 252, 0.72));\n  border: 0;\n}\n\n:host ::ng-deep .opportunity-section-accordion .p-accordionpanel.p-disabled,\n:host ::ng-deep .opportunity-section-accordion .p-accordionpanel[aria-disabled='true'] {\n  border-color: rgba(239, 68, 68, 0.2);\n  background: rgba(248, 250, 252, 0.62);\n}\n\n:host ::ng-deep .opportunity-section-accordion .p-accordionheader[aria-disabled='true'] .p-accordionheader-link {\n  opacity: 0.82;\n  cursor: not-allowed;\n}\n\n:host ::ng-deep .opportunity-section-accordion .p-accordionheader[aria-disabled='true'] .opportunity-accordion-title i {\n  color: #dc2626;\n}\n\n:host ::ng-deep .opportunity-section-accordion .p-accordioncontent,\n:host ::ng-deep .opportunity-section-accordion .p-accordioncontent-content {\n  border: 0;\n  background: transparent;\n  padding: 0;\n}\n\n.form-card {\n  @include form.form-section;\n}\n\n.section-title {\n  @include form.section-title;\n}\n\n.form-grid {\n  @include form.form-grid;\n}\n\n.form-field {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: normal;\n    min-width: 0;\n    flex-shrink: 1;\n    text-align: left;\n    transition: color 0.2s ease;\n\n    .required {\n      @include form.form-required;\n    }\n  }\n\n  .field-error {\n    margin: 0.35rem 0 0;\n    font-size: 0.75rem;\n    color: #b91c1c;\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea {\n    flex: none;\n    min-width: 0;\n    width: 100%;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    grid-column: 1 / -1;\n    flex-direction: column;\n    align-items: stretch;\n    > label {\n      text-align: left;\n      min-width: unset;\n    }\n  }\n}\n\n.field-label-row {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n\n  label {\n    margin: 0;\n  }\n}\n\n.approval-requirement-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.55rem;\n  border-radius: 999px;\n  font-size: 0.7rem;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n  line-height: 1.1;\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  background: rgba(255, 255, 255, 0.75);\n  color: rgba(51, 65, 85, 0.88);\n  white-space: nowrap;\n  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);\n}\n\n.approval-requirement-badge--neutral {\n  background: rgba(248, 250, 252, 0.85);\n  color: rgba(71, 85, 105, 0.9);\n}\n\n.approval-requirement-badge--info {\n  background: rgba(59, 130, 246, 0.12);\n  border-color: rgba(59, 130, 246, 0.26);\n  color: #1d4ed8;\n}\n\n.approval-requirement-badge--warning {\n  background: rgba(245, 158, 11, 0.16);\n  border-color: rgba(245, 158, 11, 0.3);\n  color: #b45309;\n}\n\n.approval-requirement-badge--success {\n  background: rgba(16, 185, 129, 0.14);\n  border-color: rgba(16, 185, 129, 0.28);\n  color: #047857;\n}\n\n.approval-requirement-badge--danger {\n  background: rgba(239, 68, 68, 0.14);\n  border-color: rgba(239, 68, 68, 0.28);\n  color: #b91c1c;\n}\n\n.related-summary {\n  max-width: 1400px;\n  width: min(1400px, calc(100% - 3rem));\n  margin: 1rem auto 0;\n  padding: 0.75rem 1rem;\n  border-radius: 16px;\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n  display: grid;\n  gap: 0.5rem;\n}\n\n.related-summary-label {\n  font-size: 0.78rem;\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: rgba(71, 85, 105, 0.75);\n}\n\n.related-summary-links {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n\n.related-summary-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.35rem 0.7rem;\n  border-radius: 999px;\n  border: 1px solid rgba(59, 130, 246, 0.25);\n  background: rgba(59, 130, 246, 0.08);\n  color: #1d4ed8;\n  font-weight: 600;\n  text-decoration: none;\n  font-size: 0.85rem;\n}\n\n.related-summary-link i {\n  font-size: 0.9rem;\n}\n\n.related-summary-link:hover {\n  background: rgba(59, 130, 246, 0.15);\n  color: #1e40af;\n}\n\n.related-summary-empty {\n  color: rgba(71, 85, 105, 0.8);\n  font-size: 0.85rem;\n}\n\n.form-actions {\n  @include form.form-actions;\n\n  .crm-button--ghost {\n    @include form.button-ghost;\n  }\n\n  .crm-button--primary {\n    @include form.button-primary;\n  }\n}\n\n.review-checklist {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.review-thread-card {\n  display: grid;\n  gap: 1rem;\n}\n\n.review-thread-controls {\n  display: grid;\n  gap: 0.75rem;\n  padding: 0.85rem;\n  border-radius: 0.9rem;\n  border: 1px solid rgba(99, 102, 241, 0.18);\n  background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(14, 165, 233, 0.08));\n}\n\n.review-thread-controls--rep {\n  align-items: start;\n}\n\n.review-input {\n  width: 100%;\n  padding: 0.65rem 0.75rem;\n  border-radius: 0.75rem;\n  border: 1px solid rgba(148, 163, 184, 0.45);\n  background: rgba(255, 255, 255, 0.9);\n  color: inherit;\n}\n\n.review-actions {\n  display: flex;\n  justify-content: flex-end;\n}\n\n.decision-review-actions {\n  flex-wrap: wrap;\n  gap: 0.5rem;\n}\n\n.decision-action-row {\n  display: grid;\n  grid-template-columns: minmax(220px, 320px) auto;\n  gap: 1rem;\n  align-items: center;\n  margin-top: 0.85rem;\n  justify-content: end;\n  justify-items: end;\n\n  .crm-button--primary {\n    padding: 0.42rem 0.78rem;\n    min-height: 34px;\n    font-size: 0.84rem;\n    line-height: 1;\n    min-width: 128px;\n    width: fit-content !important;\n    justify-self: start;\n    align-self: center;\n  }\n}\n\n.decision-summary {\n  padding: 0.75rem;\n  border-radius: 0.85rem;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  background: rgba(255, 255, 255, 0.78);\n  margin-bottom: 0.75rem;\n}\n\n.decision-summary-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 0.6rem;\n}\n\n.decision-summary-item {\n  display: grid;\n  gap: 0.15rem;\n}\n\n.decision-summary-label {\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: rgba(71, 85, 105, 0.78);\n}\n\n.decision-summary-value {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: rgba(30, 41, 59, 0.92);\n}\n\n.approval-history-section {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.approval-history-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n\n.approval-history-list {\n  display: grid;\n  gap: 0.65rem;\n}\n\n.approval-history-item {\n  display: grid;\n  gap: 0.35rem;\n  padding: 0.75rem;\n  border-radius: 0.9rem;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  background: rgba(255, 255, 255, 0.8);\n}\n\n.approval-history-item__header {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n}\n\n.approval-history-item__details {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 0.8rem;\n  color: rgba(71, 85, 105, 0.85);\n  font-size: 0.8rem;\n}\n\n.approval-history-meta {\n  color: rgba(71, 85, 105, 0.85);\n  font-size: 0.8rem;\n}\n\n.approval-history-notes,\n.approval-history-policy {\n  margin: 0;\n  color: rgba(30, 41, 59, 0.88);\n  font-size: 0.88rem;\n}\n\n.review-thread-list {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.review-thread-item {\n  display: grid;\n  gap: 0.35rem;\n  padding: 0.85rem;\n  border-radius: 0.9rem;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  background: rgba(255, 255, 255, 0.78);\n  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);\n}\n\n.review-thread-item__header {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.45rem 0.6rem;\n}\n\n.review-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.55rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n  text-transform: uppercase;\n  border: 1px solid transparent;\n}\n\n.review-badge.review {\n  background: rgba(14, 116, 144, 0.12);\n  border-color: rgba(14, 116, 144, 0.28);\n  color: rgba(14, 116, 144, 0.95);\n}\n\n.review-badge.ack {\n  background: rgba(79, 70, 229, 0.12);\n  border-color: rgba(79, 70, 229, 0.28);\n  color: rgba(79, 70, 229, 0.95);\n}\n\n.review-outcome {\n  font-size: 0.95rem;\n}\n\n.review-meta {\n  font-size: 0.82rem;\n  color: rgba(71, 85, 105, 0.9);\n}\n\n.review-thread-item__comment {\n  font-size: 0.92rem;\n  line-height: 1.45;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.review-thread-item__dates {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem 0.8rem;\n  font-size: 0.8rem;\n  color: rgba(71, 85, 105, 0.85);\n}\n\n.approval-request {\n  display: grid;\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n}\n\n.approval-current-status {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  margin-bottom: 0.6rem;\n  padding: 0.55rem 0.65rem;\n  border-radius: 0.7rem;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(255, 255, 255, 0.68);\n}\n\n.approval-current-status__label {\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: rgba(71, 85, 105, 0.8);\n}\n\n.approval-request-row {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr)) auto;\n  gap: 1rem;\n  align-items: end;\n}\n\n.approval-action {\n  display: flex;\n  flex-direction: column;\n}\n\n.approval-list {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.approval-summary-list {\n  display: grid;\n  gap: 0.75rem;\n}\n\n.approval-item {\n  display: grid;\n  gap: 0.5rem;\n  padding: 0.75rem;\n  border-radius: 0.9rem;\n  background: rgba(255, 255, 255, 0.72);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.06);\n}\n\n.approval-summary-item {\n  display: grid;\n  gap: 0.5rem;\n  padding: 0.75rem;\n  border-radius: 0.9rem;\n  background: rgba(255, 255, 255, 0.72);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.06);\n}\n\n.approval-meta {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.approval-status {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.6rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  background: rgba(148, 163, 184, 0.2);\n  color: rgba(51, 65, 85, 0.9);\n}\n\n.approval-status--pending {\n  background: rgba(251, 191, 36, 0.2);\n  color: #92400e;\n}\n\n.approval-status--approved {\n  background: rgba(34, 197, 94, 0.2);\n  color: #166534;\n}\n\n.approval-status--rejected {\n  background: rgba(239, 68, 68, 0.2);\n  color: #991b1b;\n}\n\n.approval-purpose,\n.approval-amount {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: rgba(30, 41, 59, 0.85);\n}\n\n.approval-details {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  font-size: 0.8rem;\n  color: rgba(71, 85, 105, 0.8);\n}\n\n.approval-notes {\n  font-size: 0.85rem;\n  color: rgba(51, 65, 85, 0.85);\n}\n\n.approval-actions {\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  gap: 0.5rem;\n  align-items: center;\n}\n\n.checklist-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n\n  h4 {\n    margin: 0;\n    font-size: 0.95rem;\n    font-weight: 600;\n    color: rgba(30, 41, 59, 0.9);\n  }\n}\n\n.checklist-add,\n.checklist-form {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  width: 100%;\n\n  input {\n    flex: 1;\n  }\n}\n\n.checklist-list {\n  display: grid;\n  gap: 0.5rem;\n}\n\n.checklist-item {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 0.5rem;\n  align-items: center;\n  padding: 0.5rem;\n  border-radius: 0.75rem;\n  background: rgba(255, 255, 255, 0.65);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n}\n\n.checklist-status {\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: rgba(71, 85, 105, 0.8);\n}\n\n.checklist-status.saved {\n  color: #16a34a;\n}\n\n.helper-text {\n  margin: 0;\n  font-size: 0.85rem;\n  color: rgba(71, 85, 105, 0.75);\n}\n\n.section-loading-card {\n  display: grid;\n  place-items: center;\n  min-height: 92px;\n}\n\n.section-subtitle {\n  margin: -0.25rem 0 1rem;\n  font-size: 0.9rem;\n  color: rgba(71, 85, 105, 0.7);\n}\n\n.team-grid {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.team-row {\n  display: grid;\n  grid-template-columns: 1.5fr 1fr auto;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n.team-actions {\n  margin-top: 0.75rem;\n  display: flex;\n  justify-content: flex-start;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n}\n\n.quote-workspace {\n  margin-top: 1rem;\n  padding-top: 1rem;\n  border-top: 1px solid rgba(148, 163, 184, 0.25);\n}\n\n.quote-workspace__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.75rem;\n\n  h4 {\n    margin: 0;\n    font-size: 0.95rem;\n    font-weight: 700;\n    color: rgba(30, 41, 59, 0.9);\n  }\n}\n\n.quote-lines {\n  margin-top: 0.75rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.quote-line {\n  display: grid;\n  grid-template-columns: 1.7fr 1.4fr 0.6fr 0.9fr 0.7fr 0.9fr auto;\n  gap: 0.5rem;\n  align-items: center;\n}\n\n.quote-line--header {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: rgba(71, 85, 105, 0.85);\n}\n\n.quote-item-option {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n\n.quote-item-option__badges {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n\n.quote-item-type-pill {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.1rem 0.45rem;\n  border-radius: 999px;\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  border: 1px solid transparent;\n}\n\n.quote-item-type-pill.product {\n  color: #1d4ed8;\n  background: #dbeafe;\n  border-color: rgba(59, 130, 246, 0.35);\n}\n\n.quote-item-type-pill.service {\n  color: #7c3aed;\n  background: #ede9fe;\n  border-color: rgba(168, 85, 247, 0.35);\n}\n\n.quote-item-type-pill.inactive {\n  color: #7f1d1d;\n  background: #fee2e2;\n  border-color: rgba(239, 68, 68, 0.35);\n}\n\n.quote-summary {\n  margin-top: 0.75rem;\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n  font-size: 0.84rem;\n  color: rgba(51, 65, 85, 0.9);\n}\n\n.proposal-preview-card {\n  margin-top: 0.75rem;\n  padding: 0.75rem 0.85rem;\n  border-radius: 12px;\n  border: 1px solid rgba(14, 116, 144, 0.2);\n  background: rgba(236, 254, 255, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n\n.proposal-preview-card__info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n  min-width: 0;\n}\n\n.proposal-preview-card__label {\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n  color: rgba(8, 47, 73, 0.86);\n}\n\n.proposal-preview-card__link {\n  font-size: 0.82rem;\n  color: rgba(3, 105, 161, 0.9);\n  text-decoration: none;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n\n  &:hover {\n    color: rgba(3, 105, 161, 1);\n    text-decoration: underline;\n  }\n}\n\n.proposal-preview-card__actions {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  flex-wrap: wrap;\n}\n\n.proposal-send-dialog {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.proposal-send-dialog__actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  margin-top: 0.25rem;\n  flex-wrap: wrap;\n}\n\n.proposal-activity-card {\n  margin-top: 0.75rem;\n  padding: 0.75rem 0.85rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.24);\n  background: rgba(248, 250, 252, 0.85);\n\n  h5 {\n    margin: 0 0 0.55rem;\n    font-size: 0.82rem;\n    text-transform: uppercase;\n    letter-spacing: 0.02em;\n    color: rgba(51, 65, 85, 0.88);\n  }\n}\n\n.proposal-activity-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.6rem;\n  padding: 0.42rem 0;\n  border-top: 1px dashed rgba(148, 163, 184, 0.32);\n\n  &:first-of-type {\n    border-top: none;\n    padding-top: 0;\n  }\n}\n\n.proposal-activity-row__title {\n  font-size: 0.83rem;\n  font-weight: 600;\n  color: rgba(30, 41, 59, 0.92);\n}\n\n.proposal-activity-row__meta {\n  display: inline-flex;\n  gap: 0.5rem;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: flex-end;\n  font-size: 0.78rem;\n  color: rgba(71, 85, 105, 0.88);\n}\n\n.proposal-resent-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.28rem;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(3, 105, 161, 0.95);\n  background: rgba(186, 230, 253, 0.55);\n  border: 1px solid rgba(3, 105, 161, 0.25);\n  padding: 0.16rem 0.46rem;\n  border-radius: 999px;\n}\n\n.proposal-send-hint {\n  margin: 0.45rem 0 0;\n  font-size: 0.8rem;\n  color: rgba(180, 83, 9, 0.9);\n}\n\n.btn-icon {\n  width: 38px;\n  height: 38px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.empty-state {\n  margin: 0;\n  color: rgba(71, 85, 105, 0.7);\n}\n\n@media (max-width: 1200px) {\n}\n\n@media (max-width: 900px) {\n  .deal-header-progress {\n    max-width: 100%;\n  }\n\n  .deal-sticky-summary {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .deal-sticky-summary .metric-card--risk,\n  .deal-sticky-summary .metric-card--approval {\n    .opportunity-accordion-badge {\n      font-size: 0.7rem;\n    }\n  }\n\n  .opportunity-accordion-header {\n    align-items: flex-start;\n  }\n\n  .opportunity-accordion-header-meta {\n    justify-content: flex-start;\n  }\n\n  .opportunity-accordion-title {\n    white-space: normal;\n  }\n\n  .checklist-item {\n    grid-template-columns: 1fr;\n  }\n\n  .approval-request-row {\n    grid-template-columns: 1fr;\n  }\n\n  .approval-actions {\n    grid-template-columns: 1fr;\n  }\n\n  .team-row {\n    grid-template-columns: 1fr;\n  }\n\n  .quote-line {\n    grid-template-columns: 1fr;\n  }\n\n  .quote-line--header {\n    display: none;\n  }\n\n  .approval-history-header {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .decision-action-row {\n    grid-template-columns: 1fr;\n    justify-content: stretch;\n    justify-items: stretch;\n  }\n\n  .proposal-preview-card {\n    align-items: stretch;\n  }\n\n  .proposal-preview-card__actions {\n    width: 100%;\n  }\n\n  .proposal-activity-row {\n    flex-direction: column;\n    gap: 0.2rem;\n  }\n\n  .proposal-activity-row__meta {\n    justify-content: flex-start;\n  }\n}\n\n:host ::ng-deep .p-inputtext,\n:host ::ng-deep .p-inputnumber .p-inputtext,\n:host ::ng-deep .p-dropdown,\n:host ::ng-deep .p-inputtextarea,\n:host ::ng-deep .p-datepicker input {\n  @include form.premium-input;\n}\n\n:host ::ng-deep .p-inputtext:hover,\n:host ::ng-deep .p-inputnumber .p-inputtext:hover,\n:host ::ng-deep .p-dropdown:hover,\n:host ::ng-deep .p-inputtextarea:hover,\n:host ::ng-deep .p-datepicker input:hover {\n  @include form.premium-input-hover;\n}\n\n:host ::ng-deep .p-inputtext:focus,\n:host ::ng-deep .p-inputnumber .p-inputtext:focus,\n:host ::ng-deep .p-dropdown:focus-within,\n:host ::ng-deep .p-inputtextarea:focus,\n:host ::ng-deep .p-datepicker input:focus {\n  @include form.premium-input-focus;\n}\n\n@media (max-width: 768px) {\n  .deal-header-progress {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .deal-header-progress__dial {\n    align-self: flex-start;\n  }\n\n  .deal-sticky-summary {\n    top: calc(var(--shell-topbar-height, 106px) + var(--shell-topbar-strip-height, 4px) + var(--shell-floating-gap, 6px) + 8px);\n    grid-template-columns: 1fr;\n  }\n\n  .opportunity-accordion-header {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .opportunity-accordion-badge {\n    white-space: normal;\n    max-width: 100%;\n  }\n\n  .form-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   DEAL ACTIVITY TIMELINE\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.deal-activity-timeline {\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 1rem;\n\n    h3 {\n      margin: 0;\n      font-size: 0.9375rem;\n      font-weight: 600;\n      color: #1f2937;\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n\n      i { color: #6366f1; font-size: 1rem; }\n    }\n  }\n\n  &__loading {\n    padding: 2rem;\n    text-align: center;\n    color: #9ca3af;\n    font-size: 0.875rem;\n\n    i { margin-right: 0.375rem; }\n  }\n\n  &__list {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  &__item {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.75rem;\n    padding: 0.75rem 1rem;\n    border: none;\n    background: transparent;\n    text-align: left;\n    cursor: pointer;\n    border-radius: 10px;\n    transition: background 0.15s ease;\n    width: 100%;\n    font-family: inherit;\n\n    &:hover {\n      background: rgba(99, 102, 241, 0.06);\n    }\n  }\n\n  &__icon {\n    width: 32px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 8px;\n    flex-shrink: 0;\n    font-size: 0.8125rem;\n\n    &[data-type='Meeting'] { background: rgba(59, 130, 246, 0.12); color: #3b82f6; }\n    &[data-type='Call']    { background: rgba(34, 197, 94, 0.12); color: #22c55e; }\n    &[data-type='Email']   { background: rgba(236, 72, 153, 0.12); color: #ec4899; }\n    &[data-type='Task']    { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }\n    &[data-type='Note']    { background: rgba(107, 114, 128, 0.12); color: #6b7280; }\n  }\n\n  &__content {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &__top {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 0.5rem;\n    margin-bottom: 2px;\n  }\n\n  &__subject {\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #1f2937;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n\n  &__status {\n    font-size: 0.6875rem;\n    font-weight: 600;\n    padding: 2px 8px;\n    border-radius: 6px;\n    flex-shrink: 0;\n    text-transform: capitalize;\n\n    &[data-status='Completed'] { background: rgba(34, 197, 94, 0.12); color: #16a34a; }\n    &[data-status='Upcoming']  { background: rgba(59, 130, 246, 0.12); color: #3b82f6; }\n    &[data-status='Overdue']   { background: rgba(239, 68, 68, 0.12); color: #dc2626; }\n  }\n\n  &__meta {\n    font-size: 0.75rem;\n    color: #9ca3af;\n    display: flex;\n    gap: 0.25rem;\n    flex-wrap: wrap;\n  }\n\n  &__outcome {\n    margin-top: 4px;\n    font-size: 0.75rem;\n    color: #6b7280;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n}\n\n.deal-activity-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2.5rem 1rem;\n  color: #d1d5db;\n  text-align: center;\n\n  i {\n    font-size: 2rem;\n    margin-bottom: 0.75rem;\n  }\n\n  p {\n    margin: 0 0 0.25rem;\n    font-size: 0.875rem;\n    color: #9ca3af;\n    font-weight: 500;\n  }\n\n  &__hint {\n    font-size: 0.75rem;\n    color: #d1d5db;\n    max-width: 300px;\n  }\n}\n\n/* \u2500\u2500 Deal Stakeholders / Contact Roles \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.deal-stakeholders-section {\n  padding: $space-4;\n}\n\n.deal-stakeholders {\n  &__add-form {\n    margin-bottom: $space-4;\n    padding: $space-3 $space-4;\n    background: rgba(99, 102, 241, 0.04);\n    border: 1px solid rgba(99, 102, 241, 0.1);\n    border-radius: $radius-lg;\n  }\n\n  &__add-row {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    flex-wrap: wrap;\n\n    .stakeholder-select {\n      flex: 1;\n      min-width: 180px;\n    }\n\n    .stakeholder-role-select {\n      width: 160px;\n      flex-shrink: 0;\n    }\n  }\n\n  &__notes-row {\n    margin-top: $space-2;\n  }\n\n  &__loading {\n    padding: 2rem;\n    text-align: center;\n    color: $gray-500;\n    font-size: $font-size-sm;\n\n    i { margin-right: 0.375rem; }\n  }\n\n  &__list {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  &__item {\n    display: flex;\n    align-items: flex-start;\n    gap: $space-3;\n    padding: $space-3 $space-4;\n    border-radius: 10px;\n    transition: background 0.15s ease;\n\n    &:hover {\n      background: rgba(99, 102, 241, 0.04);\n    }\n  }\n\n  &__avatar {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);\n    color: #6366f1;\n    font-size: $font-size-base;\n    flex-shrink: 0;\n  }\n\n  &__info {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &__top {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    margin-bottom: 2px;\n    flex-wrap: wrap;\n  }\n\n  &__name {\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: #1f2937;\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n  }\n\n  &__primary-badge {\n    display: inline-block;\n    font-size: 0.6875rem;\n    font-weight: 700;\n    padding: 1px 6px;\n    border-radius: $radius-sm;\n    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n    color: white;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n  }\n\n  &__role-badge {\n    font-size: 0.6875rem;\n    font-weight: 600;\n    padding: 2px 8px;\n    border-radius: 6px;\n    flex-shrink: 0;\n    text-transform: capitalize;\n\n    &[data-role='Decision Maker'] { background: rgba(239, 68, 68, 0.12); color: #dc2626; }\n    &[data-role='Champion']       { background: rgba(34, 197, 94, 0.12); color: #16a34a; }\n    &[data-role='Influencer']     { background: rgba(59, 130, 246, 0.12); color: #3b82f6; }\n    &[data-role='Evaluator']      { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }\n    &[data-role='Blocker']        { background: rgba(107, 114, 128, 0.12); color: #6b7280; }\n  }\n\n  &__meta {\n    font-size: 0.75rem;\n    color: #9ca3af;\n    display: flex;\n    gap: 0.25rem;\n    flex-wrap: wrap;\n  }\n\n  &__notes {\n    margin-top: 4px;\n    font-size: 0.75rem;\n    color: #6b7280;\n    font-style: italic;\n  }\n\n  &__actions {\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n  }\n\n  &__empty {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 2.5rem 1rem;\n    color: #d1d5db;\n    text-align: center;\n\n    i {\n      font-size: 2rem;\n      margin-bottom: 0.75rem;\n    }\n\n    p {\n      margin: 0 0 0.25rem;\n      font-size: $font-size-sm;\n      color: #9ca3af;\n      font-weight: 500;\n    }\n\n    &-hint {\n      font-size: 0.75rem;\n      color: #d1d5db;\n      max-width: 340px;\n    }\n  }\n}\n\n.stakeholder-primary-toggle {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-sm;\n  color: $gray-600;\n  cursor: pointer;\n  white-space: nowrap;\n\n  input[type='checkbox'] {\n    accent-color: #667eea;\n  }\n}\n\n/* \u2500\u2500 Deal Health Score \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.deal-health-section {\n  padding: $space-4;\n}\n\n.deal-health {\n  &__header {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    gap: $space-3;\n    margin-bottom: $space-4;\n\n    .section-subtitle {\n      flex: 1;\n    }\n  }\n\n  &__overview {\n    display: flex;\n    gap: $space-6;\n    align-items: flex-start;\n    margin-bottom: $space-5;\n\n    @media (max-width: 768px) {\n      flex-direction: column;\n      align-items: center;\n    }\n  }\n\n  &__gauge {\n    flex-shrink: 0;\n\n    &-svg {\n      width: 120px;\n      height: 120px;\n    }\n\n    &-fill {\n      transition: stroke-dasharray 1s ease-out;\n    }\n\n    &-value {\n      font-size: 28px;\n      font-weight: 800;\n      fill: #1f2937;\n    }\n\n    &-label {\n      font-size: 11px;\n      font-weight: 600;\n      fill: #6b7280;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n    }\n  }\n\n  &__details {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &__rationale {\n    display: flex;\n    gap: $space-2;\n    padding: $space-3;\n    background: rgba(59, 130, 246, 0.05);\n    border: 1px solid rgba(59, 130, 246, 0.12);\n    border-radius: $radius-md;\n    font-size: $font-size-sm;\n    color: #374151;\n    line-height: 1.5;\n    margin-bottom: $space-3;\n\n    i {\n      color: #3b82f6;\n      flex-shrink: 0;\n      margin-top: 2px;\n    }\n  }\n\n  &__meta {\n    display: flex;\n    gap: $space-4;\n    flex-wrap: wrap;\n  }\n\n  &__confidence,\n  &__computed {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: 0.75rem;\n    color: #9ca3af;\n\n    i {\n      font-size: 0.75rem;\n    }\n  }\n\n  &__confidence i {\n    color: #22c55e;\n  }\n\n  &__factors {\n    border-top: 1px solid rgba(0, 0, 0, 0.06);\n    padding-top: $space-4;\n  }\n\n  &__factors-title {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: #374151;\n    margin: 0 0 $space-3;\n\n    i {\n      font-size: $font-size-sm;\n      color: #6366f1;\n    }\n  }\n\n  &__factor {\n    margin-bottom: $space-3;\n\n    &:last-child {\n      margin-bottom: 0;\n    }\n  }\n\n  &__factor-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 4px;\n  }\n\n  &__factor-name {\n    font-size: 0.8125rem;\n    font-weight: 500;\n    color: #4b5563;\n  }\n\n  &__factor-score {\n    font-size: 0.75rem;\n    font-weight: 600;\n    color: #6b7280;\n  }\n\n  &__factor-bar {\n    width: 100%;\n    height: 6px;\n    background: #e5e7eb;\n    border-radius: 3px;\n    overflow: hidden;\n\n    &-fill {\n      height: 100%;\n      border-radius: 3px;\n      transition: width 0.8s ease-out;\n    }\n  }\n\n  &__empty {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 2.5rem 1rem;\n    color: #d1d5db;\n    text-align: center;\n\n    i {\n      font-size: 2rem;\n      margin-bottom: 0.75rem;\n    }\n\n    p {\n      margin: 0 0 0.25rem;\n      font-size: $font-size-sm;\n      color: #9ca3af;\n      font-weight: 500;\n    }\n\n    &-hint {\n      font-size: 0.75rem;\n      color: #d1d5db;\n      max-width: 340px;\n    }\n  }\n}\n\n/* \u2500\u2500 Deal Aging / Stage Duration \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.deal-aging {\n  padding: $space-4;\n\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: $space-4;\n    padding-bottom: $space-3;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  }\n\n  &__total {\n    display: flex;\n    align-items: baseline;\n    gap: $space-2;\n  }\n\n  &__total-value {\n    font-size: 2rem;\n    font-weight: 800;\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n  }\n\n  &__total-label {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    font-weight: 500;\n  }\n\n  &__stage-count {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    font-weight: 500;\n    padding: $space-1 $space-3;\n    background: $glass-bg-subtle;\n    border-radius: $radius-full;\n    border: 1px solid $glass-border;\n  }\n\n  /* Horizontal stacked bar */\n  &__bar-container {\n    display: flex;\n    height: 10px;\n    border-radius: $radius-full;\n    overflow: hidden;\n    margin-bottom: $space-5;\n    background: $gray-200;\n    gap: 2px;\n  }\n\n  &__bar-segment {\n    min-width: 6px;\n    background: linear-gradient(135deg, #818cf8 0%, #667eea 100%);\n    transition: flex 600ms ease-out;\n\n    &:nth-child(2) { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n    &:nth-child(3) { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n    &:nth-child(4) { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }\n    &:nth-child(5) { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n    &:nth-child(6) { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); }\n    &:nth-child(n+7) { background: linear-gradient(135deg, #64748b 0%, #475569 100%); }\n\n    &--current {\n      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%) !important;\n      animation: pulse-bar 2s ease-in-out infinite;\n    }\n  }\n\n  /* Timeline list */\n  &__stages {\n    display: flex;\n    flex-direction: column;\n    gap: 0;\n  }\n\n  &__stage {\n    display: flex;\n    gap: $space-3;\n    padding: $space-2 0;\n    transition: background 200ms;\n\n    &:hover {\n      background: rgba($primary, 0.03);\n      border-radius: $radius-md;\n    }\n\n    &--current {\n      .deal-aging__stage-name {\n        color: #16a34a;\n        font-weight: 700;\n      }\n    }\n  }\n\n  &__stage-marker {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    width: 20px;\n    flex-shrink: 0;\n    padding-top: 4px;\n  }\n\n  &__stage-dot {\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background: #cbd5e1;\n    flex-shrink: 0;\n\n    &--current {\n      background: #22c55e;\n      box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);\n      animation: pulse-glow 2s ease-in-out infinite;\n    }\n  }\n\n  &__stage-line {\n    flex: 1;\n    width: 2px;\n    min-height: 24px;\n    background: #e2e8f0;\n    margin-top: 4px;\n  }\n\n  &__stage-info {\n    flex: 1;\n    min-width: 0;\n    padding-bottom: $space-2;\n  }\n\n  &__stage-name {\n    font-size: $font-size-md;\n    font-weight: 600;\n    color: $gray-800;\n    margin-bottom: 2px;\n  }\n\n  &__stage-duration {\n    font-size: $font-size-sm;\n    color: $gray-600;\n\n    strong {\n      font-weight: 700;\n      color: $gray-800;\n    }\n  }\n\n  &__stage-badge {\n    display: inline-block;\n    margin-left: $space-2;\n    padding: 1px $space-2;\n    font-size: 0.7rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: #16a34a;\n    background: rgba(34, 197, 94, 0.12);\n    border-radius: $radius-full;\n  }\n\n  &__stage-date {\n    font-size: $font-size-xs;\n    color: $gray-400;\n    margin-top: 2px;\n  }\n\n  &__empty {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-6 0;\n    text-align: center;\n\n    i {\n      font-size: 2rem;\n      color: #d1d5db;\n    }\n\n    p {\n      font-size: $font-size-sm;\n      color: #d1d5db;\n      max-width: 340px;\n    }\n  }\n}\n\n@keyframes pulse-bar {\n  0%,\n  100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.7;\n  }\n}\n\n/* \u2500\u2500 Deal Attachments \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.deal-attachments-section {\n  padding: $space-4;\n}\n\n.deal-attachments {\n  &__upload {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    margin-bottom: $space-4;\n  }\n\n  &__upload-hint {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    display: inline-flex;\n    align-items: center;\n    gap: $space-1;\n  }\n\n  &__loading {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-4;\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n\n  &__empty {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    padding: 2.5rem 1rem;\n    color: #d1d5db;\n    text-align: center;\n\n    i {\n      font-size: 2rem;\n      margin-bottom: 0.75rem;\n    }\n\n    p {\n      margin: 0 0 0.25rem;\n      font-size: 0.875rem;\n      color: #9ca3af;\n      font-weight: 500;\n    }\n\n    &-hint {\n      font-size: 0.75rem;\n      color: #d1d5db;\n      max-width: 300px;\n    }\n  }\n}\n\n.deal-attachment-name {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-800;\n\n  i {\n    color: $primary;\n    font-size: $font-size-base;\n  }\n}\n\n.deal-attachment-actions {\n  text-align: center;\n}\n\n/* \u2500\u2500 Revenue Forecast \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n.revenue-forecast-section {\n  padding: $space-4;\n}\n\n.revenue-forecast {\n  display: flex;\n  flex-direction: column;\n  gap: $space-5;\n}\n\n.forecast-metrics {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: $space-3;\n}\n\n.forecast-metric {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: $space-3 $space-4;\n  background: $glass-bg-subtle;\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow;\n  }\n\n  &__label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n  }\n\n  &__value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  &--primary &__value { color: #667eea; }\n  &--success &__value { color: #22c55e; }\n  &--info &__value { color: #3b82f6; }\n  &--warn &__value { color: #f59e0b; }\n  &--neutral &__value { color: $gray-700; }\n}\n\n.forecast-chart-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  max-width: 320px;\n  margin: 0 auto;\n}\n\n.forecast-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 2.5rem 1rem;\n  color: #d1d5db;\n  text-align: center;\n\n  i {\n    font-size: 2rem;\n    margin-bottom: 0.75rem;\n  }\n\n  p {\n    margin: 0;\n    font-size: 0.875rem;\n    color: #9ca3af;\n    font-weight: 500;\n  }\n}\n\n/* \u2500\u2500 Duplicate Check Dialog \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n.duplicate-dialog {\n  display: grid;\n  gap: 0.85rem;\n}\n\n.duplicate-dialog__message {\n  margin: 0;\n  color: rgba(var(--apple-gray-0), 0.85);\n}\n\n.duplicate-dialog__list {\n  display: grid;\n  gap: 0.65rem;\n  max-height: 20rem;\n  overflow: auto;\n  padding-right: 0.25rem;\n}\n\n.duplicate-row {\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  gap: 0.75rem;\n  align-items: center;\n  padding: 0.65rem 0.75rem;\n  border: 1px solid rgba(var(--apple-gray-2), 0.16);\n  border-radius: 12px;\n  background: rgba(var(--apple-gray-6), 0.45);\n}\n\n.duplicate-row__meta {\n  min-width: 0;\n}\n\n.duplicate-row__name {\n  font-weight: 600;\n  color: rgba(var(--apple-gray-0), 0.95);\n}\n\n.duplicate-row__account,\n.duplicate-row__stage,\n.duplicate-row__signals {\n  font-size: 0.82rem;\n  color: rgba(var(--apple-gray-1), 0.76);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.duplicate-row__score {\n  display: grid;\n  justify-items: end;\n  font-size: 0.8rem;\n  color: rgba(var(--apple-gray-1), 0.86);\n}\n\n.duplicate-row__badge {\n  font-size: 0.7rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  padding: 0.12rem 0.4rem;\n  border-radius: 999px;\n  border: 1px solid rgba(var(--apple-gray-2), 0.3);\n}\n\n.duplicate-row__badge[data-level='block'] {\n  color: #dc2626;\n  border-color: rgba(220, 38, 38, 0.32);\n  background: rgba(220, 38, 38, 0.08);\n}\n\n.duplicate-row__badge[data-level='warning'] {\n  color: #d97706;\n  border-color: rgba(217, 119, 6, 0.32);\n  background: rgba(217, 119, 6, 0.08);\n}\n\n.duplicate-dialog__actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.5rem;\n  padding-top: 0.25rem;\n}\n"] }]
    }], null, { onBeforeUnload: [{
            type: HostListener,
            args: ['window:beforeunload', ['$event']]
        }], onCollaborativeEditingActivity: [{
            type: HostListener,
            args: ['input']
        }, {
            type: HostListener,
            args: ['change']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OpportunityFormPage, { className: "OpportunityFormPage", filePath: "src/app/crm/features/opportunities/pages/opportunity-form.page.ts", lineNumber: 172 }); })();
