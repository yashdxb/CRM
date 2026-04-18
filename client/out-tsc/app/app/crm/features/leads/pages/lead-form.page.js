import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { KnobModule } from 'primeng/knob';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { TabsModule } from 'primeng/tabs';
import { AccordionModule } from 'primeng/accordion';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ChartModule } from 'primeng/chart';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { map } from 'rxjs';
import { LEAD_STATUSES } from '../models/lead.model';
import { LeadDataService } from '../services/lead-data.service';
import { UserAdminDataService } from '../../settings/services/user-admin-data.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AuthService } from '../../../../core/auth/auth.service';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, readUserEmail, readUserId, tokenHasPermission } from '../../../../core/auth/token.utils';
import { TooltipModule } from 'primeng/tooltip';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { AttachmentDataService } from '../../../../shared/services/attachment-data.service';
import { computeLeadScore, computeQualificationRawScore } from './lead-scoring.util';
import { ActivityDataService } from '../../activities/services/activity-data.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { FormDraftService } from '../../../../core/drafts/form-draft.service';
import { MailComposeService } from '../../../../core/email/mail-compose.service';
import { TenantContextService } from '../../../../core/tenant/tenant-context.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/api";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/select";
import * as i7 from "primeng/inputnumber";
import * as i8 from "primeng/textarea";
import * as i9 from "primeng/progressbar";
import * as i10 from "primeng/knob";
import * as i11 from "primeng/table";
import * as i12 from "primeng/fileupload";
import * as i13 from "primeng/tag";
import * as i14 from "primeng/dialog";
import * as i15 from "primeng/datepicker";
import * as i16 from "primeng/tooltip";
import * as i17 from "primeng/inputgroup";
import * as i18 from "primeng/inputgroupaddon";
import * as i19 from "primeng/inputmask";
import * as i20 from "primeng/tabs";
import * as i21 from "primeng/accordion";
import * as i22 from "primeng/splitbutton";
import * as i23 from "primeng/chart";
const _c0 = () => ({ width: "28rem", maxWidth: "94vw" });
const _c1 = () => ({ width: "34rem", maxWidth: "96vw" });
const _c2 = () => ({ width: "38rem", maxWidth: "96vw" });
const _c3 = () => ({ width: "36rem", maxWidth: "96vw" });
const _c4 = () => ({ width: "42rem", maxWidth: "96vw" });
const _c5 = () => ({ width: "42rem", maxWidth: "95vw" });
const _c6 = () => ({ class: "lead-tab" });
const _c7 = a0 => ({ root: a0 });
const _c8 = () => ({ standalone: true });
const _c9 = (a0, a1) => ["option-icon", a0, a1];
const _forTrack0 = ($index, $item) => $item.status;
const _forTrack1 = ($index, $item) => $item.date;
function LeadFormPage_input_14_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 188);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_input_14_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.closureCompetitor, $event) || (ctx_r2.closureCompetitor = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.closureCompetitor);
} }
function LeadFormPage_input_15_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 189);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_input_15_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.closureNotes, $event) || (ctx_r2.closureNotes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.closureNotes);
} }
function LeadFormPage_div_29_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 192)(1, "span", 193);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 194);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 195)(6, "button", 196);
    i0.ɵɵlistener("click", function LeadFormPage_div_29_div_1_Template_button_click_6_listener() { const draft_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.loadDraftFromPrompt(draft_r6)); });
    i0.ɵɵtext(7, "Load draft");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const draft_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(draft_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", draft_r6.subtitle || "No company", " \u00B7 ", ctx_r2.formatDraftTimestamp(draft_r6.updatedAtUtc));
} }
function LeadFormPage_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 190);
    i0.ɵɵtemplate(1, LeadFormPage_div_29_div_1_Template, 8, 3, "div", 191);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.recentDrafts());
} }
function LeadFormPage_ng_template_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 197);
    i0.ɵɵtext(1, "No saved drafts available.");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_p_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 197);
    i0.ɵɵtext(1, "No saved drafts yet.");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_div_61_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 192)(1, "span", 193);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 194);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 195)(6, "button", 196);
    i0.ɵɵlistener("click", function LeadFormPage_div_61_div_1_Template_button_click_6_listener() { const draft_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openDraftFromSummary(draft_r8)); });
    i0.ɵɵtext(7, "Resume");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 198);
    i0.ɵɵlistener("click", function LeadFormPage_div_61_div_1_Template_button_click_8_listener($event) { const draft_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.discardDraft(draft_r8, $event)); });
    i0.ɵɵtext(9, "Discard");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const draft_r8 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(draft_r8.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", draft_r8.subtitle || "No company", " \u00B7 ", ctx_r2.formatDraftTimestamp(draft_r8.updatedAtUtc));
} }
function LeadFormPage_div_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 190);
    i0.ɵɵtemplate(1, LeadFormPage_div_61_div_1_Template, 10, 3, "div", 191);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.draftLibraryItems());
} }
function LeadFormPage_div_66_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 201)(1, "div", 202)(2, "div", 203);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 204);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 205);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 206)(9, "span", 207);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "titlecase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "button", 208);
    i0.ɵɵlistener("click", function LeadFormPage_div_66_div_1_Template_button_click_14_listener() { const match_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.reviewDuplicate(match_r10)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const match_r10 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(match_r10.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(match_r10.companyName || "No company");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(match_r10.matchedSignals.join(", "));
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-level", match_r10.matchLevel);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(11, 6, match_r10.matchLevel));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Match ", match_r10.matchScore, "%");
} }
function LeadFormPage_div_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 199);
    i0.ɵɵtemplate(1, LeadFormPage_div_66_div_1_Template, 15, 8, "div", 200);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.duplicateMatches());
} }
function LeadFormPage_ng_template_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 49);
    i0.ɵɵtext(1, "No duplicate details found.");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_button_71_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 209);
    i0.ɵɵlistener("click", function LeadFormPage_button_71_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.saveDespiteWarning()); });
    i0.ɵɵelementEnd();
} }
function LeadFormPage_button_79_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 210);
    i0.ɵɵlistener("click", function LeadFormPage_button_79_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r12); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.logActivity()); });
    i0.ɵɵelement(1, "i", 211);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Log activity");
    i0.ɵɵelementEnd()();
} }
function LeadFormPage_div_89_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 212)(1, "span", 213);
    i0.ɵɵtext(2, "Lead Number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const currentLeadNumber_r13 = ctx.ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(currentLeadNumber_r13);
} }
function LeadFormPage_div_90_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 214)(1, "div", 215);
    i0.ɵɵelement(2, "p-knob", 216);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 217)(4, "span", 218);
    i0.ɵɵtext(5, "Overall lead score");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 219)(7, "span", 220);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 221);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "p", 222);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngModel", ctx_r2.leadHeaderScoreValue())("readonly", true)("valueTemplate", "{value}%")("size", 92)("strokeWidth", 9)("showValue", true)("min", 0)("max", 100)("valueColor", ctx_r2.leadHeaderScoreColor());
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.form.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.leadProgressSummary());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.leadHeaderProgressMessage(), " ");
} }
function LeadFormPage_div_91_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 223);
    i0.ɵɵelement(1, "i", 28);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const draftStatus_r14 = ctx.ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(draftStatus_r14);
} }
function LeadFormPage_div_92_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 224);
    i0.ɵɵelement(1, "i", 225);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "This form is loaded from a saved draft. Final Save will create or update the live CRM record.");
    i0.ɵɵelementEnd()();
} }
function LeadFormPage_div_93_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 226);
    i0.ɵɵelement(1, "i", 227);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.viewingPresenceSummary());
} }
function LeadFormPage_div_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 228);
    i0.ɵɵelement(1, "i", 229);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.editingPresenceSummary());
} }
function LeadFormPage_div_95_span_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 271);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r16 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(action_r16.label);
} }
function LeadFormPage_div_95_For_26_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 277);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(step_r18.timeInStage);
} }
function LeadFormPage_div_95_For_26_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 278);
} if (rf & 2) {
    const step_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("data-filled", step_r18.state === "completed");
} }
function LeadFormPage_div_95_For_26_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 272);
    i0.ɵɵlistener("click", function LeadFormPage_div_95_For_26_Template_div_click_0_listener() { const step_r18 = i0.ɵɵrestoreView(_r17).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(step_r18.state !== "current" ? ctx_r2.onStepClick(step_r18) : null); });
    i0.ɵɵelementStart(1, "div", 273);
    i0.ɵɵelement(2, "i", 242);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 274);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, LeadFormPage_div_95_For_26_span_5_Template, 2, 1, "span", 275);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, LeadFormPage_div_95_For_26_div_6_Template, 1, 1, "div", 276);
} if (rf & 2) {
    const step_r18 = ctx.$implicit;
    const ɵ$index_371_r19 = ctx.$index;
    const ɵ$count_371_r20 = ctx.$count;
    i0.ɵɵclassProp("lead-stepper__step--clickable", step_r18.state !== "current");
    i0.ɵɵproperty("pTooltip", step_r18.state === "locked" ? step_r18.unlockHint ? step_r18.unlockHint + " (click to go there)" : undefined : undefined);
    i0.ɵɵattribute("data-state", step_r18.state);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", step_r18.state === "completed" ? "pi-check" : step_r18.state === "locked" ? "pi-lock" : step_r18.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r18.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", step_r18.timeInStage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !(ɵ$index_371_r19 === ɵ$count_371_r20 - 1));
} }
function LeadFormPage_div_95_div_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 279);
    i0.ɵɵelement(1, "i", 280);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-quality", ctx_r2.form.score >= 80 ? "high" : ctx_r2.form.score >= 50 ? "medium" : "low");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.form.score);
} }
function LeadFormPage_div_95_p_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 281);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const instruction_r21 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(instruction_r21);
} }
function LeadFormPage_div_95_div_46_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const blocker_r22 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(blocker_r22);
} }
function LeadFormPage_div_95_div_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 282)(1, "span", 283);
    i0.ɵɵtext(2, "To move forward:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul", 284);
    i0.ɵɵtemplate(4, LeadFormPage_div_95_div_46_li_4_Template, 2, 1, "li", 285);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r2.progressActionBlockedReasons());
} }
function LeadFormPage_div_95_div_47_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 286);
    i0.ɵɵelement(1, "i", 287);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Move back to ");
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6, "?");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 288);
    i0.ɵɵlistener("click", function LeadFormPage_div_95_div_47_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r23); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.confirmBackward()); });
    i0.ɵɵelement(8, "i", 186);
    i0.ɵɵtext(9, " Yes ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 289);
    i0.ɵɵlistener("click", function LeadFormPage_div_95_div_47_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r23); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.cancelBackward()); });
    i0.ɵɵelement(11, "i", 184);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_5_0;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_5_0 = ctx_r2.backwardConfirmTarget()) == null ? null : tmp_5_0.label);
} }
function LeadFormPage_div_95_button_49_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 290);
    i0.ɵɵlistener("click", function LeadFormPage_div_95_button_49_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r24); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.triggerPrimaryStatusAction()); });
    i0.ɵɵelement(1, "i", 242);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const action_r25 = ctx.ngIf;
    i0.ɵɵproperty("disabled", action_r25.disabled);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", action_r25.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(action_r25.label);
} }
function LeadFormPage_div_95_button_50_Template(rf, ctx) { if (rf & 1) {
    const _r26 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 291);
    i0.ɵɵlistener("click", function LeadFormPage_div_95_button_50_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r26); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onNurtureBranchClick()); });
    i0.ɵɵelement(1, "i", 242);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const branch_r27 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", branch_r27.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(branch_r27.label);
} }
function LeadFormPage_div_95_div_51_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r28 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 294);
    i0.ɵɵlistener("click", function LeadFormPage_div_95_div_51_button_1_Template_button_click_0_listener() { const action_r29 = i0.ɵɵrestoreView(_r28).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.onOutcomeClick(action_r29.status)); });
    i0.ɵɵelement(1, "i", 242);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const action_r29 = ctx.$implicit;
    i0.ɵɵproperty("disabled", action_r29.disabled);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", action_r29.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(action_r29.label);
} }
function LeadFormPage_div_95_div_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 292);
    i0.ɵɵtemplate(1, LeadFormPage_div_95_div_51_button_1_Template, 4, 3, "button", 293);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.secondaryOutcomeActions());
} }
function LeadFormPage_div_95_div_52_For_2_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 299);
    i0.ɵɵtext(1, "\u2192");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_div_95_div_52_For_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 296);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 297);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, LeadFormPage_div_95_div_52_For_2_span_4_Template, 2, 0, "span", 298);
} if (rf & 2) {
    const entry_r30 = ctx.$implicit;
    const ɵ$index_507_r31 = ctx.$index;
    const ɵ$count_507_r32 = ctx.$count;
    i0.ɵɵattribute("data-status", entry_r30.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entry_r30.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r30.date);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !(ɵ$index_507_r31 === ɵ$count_507_r32 - 1));
} }
function LeadFormPage_div_95_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 295);
    i0.ɵɵrepeaterCreate(1, LeadFormPage_div_95_div_52_For_2_Template, 5, 4, null, null, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r2.statusAuditTrail());
} }
function LeadFormPage_div_95_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 230)(1, "div", 231)(2, "div", 232)(3, "div", 233)(4, "div", 234);
    i0.ɵɵelement(5, "p-knob", 235);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 236)(7, "span", 237);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 238);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "span", 239);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "div", 240)(14, "button", 241);
    i0.ɵɵlistener("click", function LeadFormPage_div_95_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleStatusPath()); });
    i0.ɵɵelement(15, "i", 242);
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(18, "div", 243)(19, "div", 244)(20, "span", 245);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(22, LeadFormPage_div_95_span_22_Template, 2, 1, "span", 246);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 247)(24, "div", 248);
    i0.ɵɵrepeaterCreate(25, LeadFormPage_div_95_For_26_Template, 7, 8, null, null, _forTrack0);
    i0.ɵɵtemplate(27, LeadFormPage_div_95_div_27_Template, 4, 2, "div", 249);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 250);
    i0.ɵɵelement(29, "div", 251);
    i0.ɵɵelementStart(30, "button", 252);
    i0.ɵɵlistener("click", function LeadFormPage_div_95_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onNurtureBranchClick()); });
    i0.ɵɵelementStart(31, "span", 253);
    i0.ɵɵelement(32, "i", 254);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span", 255)(34, "span", 256);
    i0.ɵɵtext(35, "Nurture");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "span", 257);
    i0.ɵɵtext(37, "Branch for long-tail follow-up");
    i0.ɵɵelementEnd()()()()()();
    i0.ɵɵelementStart(38, "div", 258)(39, "div", 259)(40, "div", 260)(41, "span", 261);
    i0.ɵɵtext(42, "Current status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "span", 262);
    i0.ɵɵtext(44);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(45, LeadFormPage_div_95_p_45_Template, 2, 1, "p", 263)(46, LeadFormPage_div_95_div_46_Template, 5, 1, "div", 264)(47, LeadFormPage_div_95_div_47_Template, 12, 1, "div", 265);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "div", 266);
    i0.ɵɵtemplate(49, LeadFormPage_div_95_button_49_Template, 4, 3, "button", 267)(50, LeadFormPage_div_95_button_50_Template, 4, 2, "button", 268)(51, LeadFormPage_div_95_div_51_Template, 2, 1, "div", 269);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(52, LeadFormPage_div_95_div_52_Template, 3, 0, "div", 270);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngModel", ctx_r2.leadHeaderScoreValue())("readonly", true)("valueTemplate", "{value}%")("size", 92)("strokeWidth", 9)("showValue", true)("min", 0)("max", 100)("valueColor", ctx_r2.leadHeaderScoreColor());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.form.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.leadProgressSummary());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.leadHeaderProgressMessage());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngClass", ctx_r2.statusPathExpanded() ? "pi-chevron-up" : "pi-chevron-down");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.statusPathExpanded() ? "Hide status path" : "View status path");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.form.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.primaryStatusAction());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("lead-stepper__desktop-path--expanded", ctx_r2.statusPathExpanded());
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r2.stepperSteps());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.form.score);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-state", ctx_r2.nurtureBranchState());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("lead-stepper__branch--clickable", ctx_r2.nurtureBranchState() === "available");
    i0.ɵɵattribute("data-state", ctx_r2.nurtureBranchState());
    i0.ɵɵadvance(14);
    i0.ɵɵtextInterpolate(ctx_r2.form.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.currentStatusInstruction());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.progressActionBlockedReasons().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.backwardConfirmPending());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.primaryStatusAction());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.nurtureBranchAction());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.canRecycleLead() && !ctx_r2.isOutcomeStatus());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.statusAuditTrail().length);
} }
function LeadFormPage_div_96_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 300);
    i0.ɵɵelement(1, "i", 301);
    i0.ɵɵelementStart(2, "div", 302)(3, "strong");
    i0.ɵɵtext(4, "Read-only mode");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r2.lockingEditorName(), " is currently editing this record. You can view but not make changes until they save or leave.");
} }
function LeadFormPage_section_97_div_3_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 308);
    i0.ɵɵelement(1, "i", 104);
    i0.ɵɵtext(2, " Account ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const link_r33 = ctx.ngIf;
    i0.ɵɵproperty("routerLink", link_r33);
} }
function LeadFormPage_section_97_div_3_a_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 308);
    i0.ɵɵelement(1, "i", 91);
    i0.ɵɵtext(2, " Contact ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const link_r34 = ctx.ngIf;
    i0.ɵɵproperty("routerLink", link_r34);
} }
function LeadFormPage_section_97_div_3_a_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 308);
    i0.ɵɵelement(1, "i", 309);
    i0.ɵɵtext(2, " Opportunity ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const link_r35 = ctx.ngIf;
    i0.ɵɵproperty("routerLink", link_r35);
} }
function LeadFormPage_section_97_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 306);
    i0.ɵɵtemplate(1, LeadFormPage_section_97_div_3_a_1_Template, 3, 1, "a", 307)(2, LeadFormPage_section_97_div_3_a_2_Template, 3, 1, "a", 307)(3, LeadFormPage_section_97_div_3_a_3_Template, 3, 1, "a", 307);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.linkedAccountLink());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.linkedContactLink());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.linkedOpportunityLink());
} }
function LeadFormPage_section_97_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 310);
    i0.ɵɵtext(1, "No linked records yet.");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_section_97_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 303)(1, "div", 304);
    i0.ɵɵtext(2, "Converted to");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, LeadFormPage_section_97_div_3_Template, 4, 3, "div", 305)(4, LeadFormPage_section_97_ng_template_4_Template, 2, 0, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const noLinkedSummary_r36 = i0.ɵɵreference(5);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("related-summary--empty", !ctx_r2.hasLinkedRecords());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.hasLinkedRecords())("ngIfElse", noLinkedSummary_r36);
} }
function LeadFormPage_span_111_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 311);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.activityTabBadge());
} }
function LeadFormPage_span_115_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 312);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.qualificationTabBadge());
} }
function LeadFormPage_span_121_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 313);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.attachments().length);
} }
function LeadFormPage_ng_template_172_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 314);
    i0.ɵɵelement(1, "i", 242);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r37 = ctx.$implicit;
    i0.ɵɵattribute("data-status", option_r37.value);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r37.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r37.label);
} }
function LeadFormPage_ng_template_173_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 314);
    i0.ɵɵelement(1, "i", 242);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r38 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("data-status", option_r38.value);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", option_r38.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r38.label);
} }
function LeadFormPage_ng_template_173_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 317);
    i0.ɵɵtext(1, "Select status");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_ng_template_173_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, LeadFormPage_ng_template_173_div_0_Template, 4, 3, "div", 315)(1, LeadFormPage_ng_template_173_span_1_Template, 2, 0, "span", 316);
} if (rf & 2) {
    const option_r38 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r38);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r38);
} }
function LeadFormPage_div_174_a_3_Template(rf, ctx) { if (rf & 1) {
    const _r39 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 320);
    i0.ɵɵlistener("click", function LeadFormPage_div_174_a_3_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r39); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.goToActivityTab()); });
    i0.ɵɵelement(1, "i", 321);
    i0.ɵɵtext(2, " Log an activity");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_div_174_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 318)(1, "p");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, LeadFormPage_div_174_a_3_Template, 3, 0, "a", 319);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const hint_r40 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(hint_r40);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.isActivityDrivenHint());
} }
function LeadFormPage_ng_template_179_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 322);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r41 = ctx.$implicit;
    i0.ɵɵattribute("data-testid", "lead-assignment-option-" + option_r41.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r41.label, " ");
} }
function LeadFormPage_ng_template_180_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 322);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r42 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵattribute("data-testid", "lead-assignment-selected");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r42.label, " ");
} }
function LeadFormPage_ng_template_180_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 325);
    i0.ɵɵtext(1, "Select assignment");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_ng_template_180_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, LeadFormPage_ng_template_180_div_0_Template, 2, 2, "div", 323)(1, LeadFormPage_ng_template_180_span_1_Template, 2, 0, "span", 324);
} if (rf & 2) {
    const option_r42 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r42);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r42);
} }
function LeadFormPage_div_181_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 322);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r44 = ctx.$implicit;
    i0.ɵɵattribute("data-testid", "lead-owner-option-" + option_r44.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r44.label, " ");
} }
function LeadFormPage_div_181_ng_template_5_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 322);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r45 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r45.label, " ");
} }
function LeadFormPage_div_181_ng_template_5_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 325);
    i0.ɵɵtext(1, "Select owner");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_div_181_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, LeadFormPage_div_181_ng_template_5_div_0_Template, 2, 1, "div", 323)(1, LeadFormPage_div_181_ng_template_5_span_1_Template, 2, 0, "span", 324);
} if (rf & 2) {
    const option_r45 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r45);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !option_r45);
} }
function LeadFormPage_div_181_Template(rf, ctx) { if (rf & 1) {
    const _r43 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 95)(1, "label");
    i0.ɵɵtext(2, "Owner");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-select", 326);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_div_181_Template_p_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r43); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.form.ownerId, $event) || (ctx_r2.form.ownerId = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵtemplate(4, LeadFormPage_div_181_ng_template_4_Template, 2, 2, "ng-template", 112)(5, LeadFormPage_div_181_ng_template_5_Template, 2, 2, "ng-template", 113);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("options", ctx_r2.ownerOptions());
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.ownerId);
    i0.ɵɵproperty("readonly", ctx_r2.isOwnerReadOnly())("disabled", ctx_r2.isOwnerReadOnly());
} }
function LeadFormPage_a_198_Template(rf, ctx) { if (rf & 1) {
    const _r46 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 327);
    i0.ɵɵlistener("click", function LeadFormPage_a_198_Template_a_click_0_listener($event) { i0.ɵɵrestoreView(_r46); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.composeToCurrentLead($event)); });
    i0.ɵɵelement(1, "i", 328);
    i0.ɵɵtext(2, " Send email ");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_p_199_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 329);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.emailError());
} }
function LeadFormPage_ng_template_206_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 331)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r47 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", option_r47.flag, " ", option_r47.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r47.dialCode);
} }
function LeadFormPage_ng_template_206_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, LeadFormPage_ng_template_206_div_0_Template, 5, 3, "div", 330);
} if (rf & 2) {
    const option_r47 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r47);
} }
function LeadFormPage_ng_template_207_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 331)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r48 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", option_r48.flag, " ", option_r48.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r48.dialCode);
} }
function LeadFormPage_ng_container_208_Template(rf, ctx) { if (rf & 1) {
    const _r49 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "p-inputMask", 332);
    i0.ɵɵlistener("ngModelChange", function LeadFormPage_ng_container_208_Template_p_inputMask_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r49); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onPhoneChange($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("mask", ctx_r2.phoneMask())("slotChar", "_")("autoClear", false)("unmask", false)("ngModel", ctx_r2.phoneNationalNumber)("placeholder", ctx_r2.phonePlaceholder());
} }
function LeadFormPage_ng_template_209_Template(rf, ctx) { if (rf & 1) {
    const _r50 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 333);
    i0.ɵɵlistener("ngModelChange", function LeadFormPage_ng_template_209_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r50); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onPhoneChange($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngModel", ctx_r2.phoneNationalNumber);
} }
function LeadFormPage_p_211_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 329);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.phoneError());
} }
function LeadFormPage_div_226_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 95)(1, "label", 334);
    i0.ɵɵtext(2, "Routing reason");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-inputgroup")(4, "p-inputgroup-addon", 133);
    i0.ɵɵelement(5, "i", 335);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(6, "input", 336);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r2.routingReason())("ngModelOptions", i0.ɵɵpureFunction0(3, _c8))("disabled", true);
} }
function LeadFormPage_p_accordion_panel_227_Template(rf, ctx) { if (rf & 1) {
    const _r51 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-accordion-panel", 337)(1, "p-accordion-header")(2, "h2", 90);
    i0.ɵɵelement(3, "i", 338);
    i0.ɵɵtext(4, " Buyer Profile ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p-accordion-content")(6, "section", 339)(7, "div", 119)(8, "div", 95)(9, "label", 340);
    i0.ɵɵtext(10, "Buyer type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "p-select", 341);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_p_accordion_panel_227_Template_p_select_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r51); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.form.buyerType, $event) || (ctx_r2.form.buyerType = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 95)(13, "label", 342);
    i0.ɵɵtext(14, "Preferred area");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p-select", 343);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_p_accordion_panel_227_Template_p_select_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r51); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.form.preferredArea, $event) || (ctx_r2.form.preferredArea = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 95)(17, "label", 344);
    i0.ɵɵtext(18, "Property type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "p-select", 345);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_p_accordion_panel_227_Template_p_select_ngModelChange_19_listener($event) { i0.ɵɵrestoreView(_r51); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.form.preferredPropertyType, $event) || (ctx_r2.form.preferredPropertyType = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 95)(21, "label", 346);
    i0.ɵɵtext(22, "Budget band");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "p-select", 347);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_p_accordion_panel_227_Template_p_select_ngModelChange_23_listener($event) { i0.ɵɵrestoreView(_r51); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.form.budgetBand, $event) || (ctx_r2.form.budgetBand = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("options", ctx_r2.buyerTypeOptions());
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.buyerType);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r2.preferredAreaOptions());
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.preferredArea);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r2.propertyTypeOptions());
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.preferredPropertyType);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r2.budgetBandOptions());
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.budgetBand);
} }
function LeadFormPage_span_237_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 172);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const confidence_r52 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", confidence_r52, " ");
} }
function LeadFormPage_span_238_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 172);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const source_r53 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", source_r53, " ");
} }
function LeadFormPage_p_progressBar_241_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-progressBar", 348);
} }
function LeadFormPage_span_251_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Preview: ", ctx_r2.computeAutoScore(), ".");
} }
function LeadFormPage_p_tag_252_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 349);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", ctx_r2.aiScoreConfidenceLabel());
} }
function LeadFormPage_p_tag_253_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 350);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", ctx_r2.scoreSourceBadge());
} }
function LeadFormPage_div_254_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 356);
    i0.ɵɵelement(1, "i", 242);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngClass", ctx_r2.aiScoreClass());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r2.aiScoreIcon());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.aiScoreNote());
} }
function LeadFormPage_div_254_Template(rf, ctx) { if (rf & 1) {
    const _r54 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 351)(1, "button", 352);
    i0.ɵɵlistener("click", function LeadFormPage_div_254_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r54); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onAiScore()); });
    i0.ɵɵelementStart(2, "span", 353);
    i0.ɵɵelement(3, "i", 354);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Refresh score");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, LeadFormPage_div_254_div_6_Template, 4, 3, "div", 355);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.aiScoring() || !ctx_r2.canRefreshScore());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r2.aiScoreNote() && !ctx_r2.aiScoring());
} }
function LeadFormPage_section_263_div_44_li_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const blocker_r56 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(blocker_r56);
} }
function LeadFormPage_section_263_div_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 393)(1, "span", 394);
    i0.ɵɵtext(2, "Current blockers");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "ul");
    i0.ɵɵtemplate(4, LeadFormPage_section_263_div_44_li_4_Template, 2, 1, "li", 285);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r2.qualificationReadinessBlockers());
} }
function LeadFormPage_section_263_p_chart_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-chart", 395);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("data", ctx_r2.cqvsRadarChartData())("options", ctx_r2.cqvsRadarChartOptions);
} }
function LeadFormPage_section_263_article_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 396)(1, "div", 397)(2, "span", 398);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 399)(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 400)(10, "span", 401);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 402);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 403);
    i0.ɵɵelement(15, "span", 404);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const group_r57 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("data-cqvs", group_r57.code);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-cqvs", group_r57.code);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(group_r57.code);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(group_r57.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(group_r57.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", group_r57.score, " / ", group_r57.maxScore);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", group_r57.weight, "% Weight");
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r2.cqvsGroupPercent(group_r57), "%");
} }
function LeadFormPage_section_263_ng_template_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "CQVS Factor");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Weight");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Selected Value");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Confidence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Evidence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Contribution");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Score");
    i0.ɵɵelementEnd()();
} }
function LeadFormPage_section_263_ng_template_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 405)(2, "span", 406);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td", 407);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td", 408);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 409)(11, "span", 410);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "td", 411);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td", 412)(16, "div", 403);
    i0.ɵɵelement(17, "span", 404);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "td", 413);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r58 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-cqvs", row_r58.cqvs);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r58.factor.slice(0, 1));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r58.factor);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r58.weight);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r58.selectedValue);
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("data-confidence", row_r58.confidence.toLowerCase());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r58.confidence);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r58.evidence);
    i0.ɵɵadvance(3);
    i0.ɵɵstyleProp("width", ctx_r2.scoreContributionPercent(row_r58), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r2.scoreContributionPercent(row_r58), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", row_r58.score, " / ", row_r58.maxScore);
} }
function LeadFormPage_section_263_div_73_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 416);
    i0.ɵɵelement(1, "i", 417);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const flag_r59 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(flag_r59);
} }
function LeadFormPage_section_263_div_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 414);
    i0.ɵɵtemplate(1, LeadFormPage_section_263_div_73_div_1_Template, 4, 1, "div", 415);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.riskFlags().slice(0, 5));
} }
function LeadFormPage_section_263_ng_template_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 414)(1, "div", 416);
    i0.ɵɵelement(2, "i", 417);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "No material risks detected yet.");
    i0.ɵɵelementEnd()()();
} }
function LeadFormPage_section_263_Template(rf, ctx) { if (rf & 1) {
    const _r55 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 357)(1, "header", 358)(2, "div", 359)(3, "span", 360);
    i0.ɵɵelement(4, "i", 361);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div")(6, "span", 362);
    i0.ɵɵtext(7, "Qualification Scoring");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "h2");
    i0.ɵɵtext(9, "Qualification Summary");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p");
    i0.ɵɵtext(11, "Review readiness, close the blockers, and move the lead forward with defensible evidence.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 363)(13, "button", 364);
    i0.ɵɵlistener("click", function LeadFormPage_section_263_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r55); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onGenerateConversationSummary()); });
    i0.ɵɵelementStart(14, "span", 353);
    i0.ɵɵelement(15, "i", 365);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17, "Generate AI Insights");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(18, "section", 366)(19, "div", 367)(20, "span", 368);
    i0.ɵɵtext(21, "Qualification readiness");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "h3");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "p");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 369)(27, "article", 370)(28, "span", 371);
    i0.ɵɵtext(29, "CQVS Qualification");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "strong");
    i0.ɵɵtext(31);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "article", 370)(33, "span", 371);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "strong");
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "small");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "article", 372)(40, "span", 371);
    i0.ɵɵtext(41, "Next best action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "strong");
    i0.ɵɵtext(43);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(44, LeadFormPage_section_263_div_44_Template, 5, 1, "div", 373);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(45, "details", 374)(46, "summary")(47, "span");
    i0.ɵɵtext(48, "Scoring details");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "small");
    i0.ɵɵtext(50, "Open CQVS radar, weighted breakdown, and top risks");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(51, "div", 375)(52, "div", 376)(53, "div", 377)(54, "header", 378)(55, "span", 379);
    i0.ɵɵelement(56, "i", 380);
    i0.ɵɵtext(57, " CQVS Radar ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(58, "span", 381);
    i0.ɵɵtext(59, "Score % per pillar");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(60, LeadFormPage_section_263_p_chart_60_Template, 1, 2, "p-chart", 382);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(61, "div", 383);
    i0.ɵɵtemplate(62, LeadFormPage_section_263_article_62_Template, 16, 10, "article", 384);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(63, "section", 385)(64, "div", 386)(65, "header", 387);
    i0.ɵɵtext(66, "CQVS Breakdown");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(67, "p-table", 388);
    i0.ɵɵtemplate(68, LeadFormPage_section_263_ng_template_68_Template, 15, 0, "ng-template", 389)(69, LeadFormPage_section_263_ng_template_69_Template, 22, 13, "ng-template", 390);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(70, "aside", 391)(71, "h4");
    i0.ɵɵtext(72, "Top Risks");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(73, LeadFormPage_section_263_div_73_Template, 2, 1, "div", 392)(74, LeadFormPage_section_263_ng_template_74_Template, 5, 0, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const fallbackRisks_r60 = i0.ɵɵreference(75);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(13);
    i0.ɵɵproperty("disabled", ctx_r2.conversationAiSummaryLoading());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r2.conversationAiSummaryLoading() ? "pi-spin pi-spinner" : "pi-sparkles");
    i0.ɵɵadvance(3);
    i0.ɵɵattribute("data-state", ctx_r2.qualificationReadinessState());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.qualificationReadinessTitle());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.qualificationReadinessDescription());
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r2.qualificationContributionTotal(), " / 100");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.qualificationConfidenceMetricLabel());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r2.qualificationConfidencePercent(), "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.qualificationConfidenceDisplayLabel());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.conversationNextActionDisplay() || "Ask about budget and timeline.");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.qualificationReadinessBlockers().length);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngIf", ctx_r2.showCqvsRadar());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.cqvsGroupRows());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r2.scoreBreakdownRows());
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r2.riskFlags().length)("ngIfElse", fallbackRisks_r60);
} }
function LeadFormPage_span_273_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 172);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const label_r61 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", label_r61, " ");
} }
function LeadFormPage_article_277_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 429);
    i0.ɵɵtext(1, "Required");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_article_277_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 430);
    i0.ɵɵtext(1, "Context only");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_article_277_ng_container_15_p_select_1_ng_template_1_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 440);
    i0.ɵɵelement(1, "i", 441);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r65 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(2, _c9, "tone-" + option_r65.tone, option_r65.icon));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r65.label);
} }
function LeadFormPage_article_277_ng_container_15_p_select_1_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, LeadFormPage_article_277_ng_container_15_p_select_1_ng_template_1_div_0_Template, 4, 5, "div", 439);
} if (rf & 2) {
    const option_r65 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r65);
} }
function LeadFormPage_article_277_ng_container_15_p_select_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 440);
    i0.ɵɵelement(1, "i", 441);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r66 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(2, _c9, "tone-" + option_r66.tone, option_r66.icon));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r66.label);
} }
function LeadFormPage_article_277_ng_container_15_p_select_1_Template(rf, ctx) { if (rf & 1) {
    const _r63 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 438);
    i0.ɵɵlistener("ngModelChange", function LeadFormPage_article_277_ng_container_15_p_select_1_Template_p_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r63); const factor_r64 = i0.ɵɵnextContext(2).$implicit; const ctx_r2 = i0.ɵɵnextContext(); ctx_r2.setCustomFactorValue(factor_r64.key, $event); return i0.ɵɵresetView(ctx_r2.onQualificationFactorChange()); });
    i0.ɵɵtemplate(1, LeadFormPage_article_277_ng_container_15_p_select_1_ng_template_1_Template, 1, 1, "ng-template", 130)(2, LeadFormPage_article_277_ng_container_15_p_select_1_ng_template_2_Template, 4, 5, "ng-template", 112);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const factor_r64 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("inputId", "lead-factor-" + factor_r64.key)("name", "lead-factor-" + factor_r64.key)("options", factor_r64.valueOptions)("ngModel", factor_r64.value);
} }
function LeadFormPage_article_277_ng_container_15_p_select_2_Template(rf, ctx) { if (rf & 1) {
    const _r67 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 442);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_article_277_ng_container_15_p_select_2_Template_p_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r67); const ctx_r2 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r2.form.budgetAvailability, $event) || (ctx_r2.form.budgetAvailability = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadFormPage_article_277_ng_container_15_p_select_2_Template_p_select_ngModelChange_0_listener() { i0.ɵɵrestoreView(_r67); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.onQualificationFactorChange()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const factor_r64 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("inputId", "lead-factor-" + factor_r64.key)("options", ctx_r2.budgetOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.budgetAvailability);
} }
function LeadFormPage_article_277_ng_container_15_p_select_3_Template(rf, ctx) { if (rf & 1) {
    const _r68 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 443);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_article_277_ng_container_15_p_select_3_Template_p_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r68); const ctx_r2 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r2.form.readinessToSpend, $event) || (ctx_r2.form.readinessToSpend = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadFormPage_article_277_ng_container_15_p_select_3_Template_p_select_ngModelChange_0_listener() { i0.ɵɵrestoreView(_r68); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.onQualificationFactorChange()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const factor_r64 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("inputId", "lead-factor-" + factor_r64.key)("options", ctx_r2.readinessOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.readinessToSpend);
} }
function LeadFormPage_article_277_ng_container_15_p_select_4_Template(rf, ctx) { if (rf & 1) {
    const _r69 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 444);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_article_277_ng_container_15_p_select_4_Template_p_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r69); const ctx_r2 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r2.form.buyingTimeline, $event) || (ctx_r2.form.buyingTimeline = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadFormPage_article_277_ng_container_15_p_select_4_Template_p_select_ngModelChange_0_listener() { i0.ɵɵrestoreView(_r69); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.onQualificationFactorChange()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const factor_r64 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("inputId", "lead-factor-" + factor_r64.key)("options", ctx_r2.timelineOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.buyingTimeline);
} }
function LeadFormPage_article_277_ng_container_15_p_select_5_Template(rf, ctx) { if (rf & 1) {
    const _r70 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 445);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_article_277_ng_container_15_p_select_5_Template_p_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r70); const ctx_r2 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r2.form.problemSeverity, $event) || (ctx_r2.form.problemSeverity = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadFormPage_article_277_ng_container_15_p_select_5_Template_p_select_ngModelChange_0_listener() { i0.ɵɵrestoreView(_r70); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.onQualificationFactorChange()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const factor_r64 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("inputId", "lead-factor-" + factor_r64.key)("options", ctx_r2.problemOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.problemSeverity);
} }
function LeadFormPage_article_277_ng_container_15_p_select_6_Template(rf, ctx) { if (rf & 1) {
    const _r71 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 446);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_article_277_ng_container_15_p_select_6_Template_p_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r71); const ctx_r2 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r2.form.economicBuyer, $event) || (ctx_r2.form.economicBuyer = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadFormPage_article_277_ng_container_15_p_select_6_Template_p_select_ngModelChange_0_listener() { i0.ɵɵrestoreView(_r71); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.onQualificationFactorChange()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const factor_r64 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("inputId", "lead-factor-" + factor_r64.key)("options", ctx_r2.economicBuyerOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.economicBuyer);
} }
function LeadFormPage_article_277_ng_container_15_p_select_7_Template(rf, ctx) { if (rf & 1) {
    const _r72 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-select", 447);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_article_277_ng_container_15_p_select_7_Template_p_select_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r72); const ctx_r2 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r2.form.icpFit, $event) || (ctx_r2.form.icpFit = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadFormPage_article_277_ng_container_15_p_select_7_Template_p_select_ngModelChange_0_listener() { i0.ɵɵrestoreView(_r72); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.onQualificationFactorChange()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const factor_r64 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("inputId", "lead-factor-" + factor_r64.key)("options", ctx_r2.icpFitOptions);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.icpFit);
} }
function LeadFormPage_article_277_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, LeadFormPage_article_277_ng_container_15_p_select_1_Template, 3, 4, "p-select", 431)(2, LeadFormPage_article_277_ng_container_15_p_select_2_Template, 1, 3, "p-select", 432)(3, LeadFormPage_article_277_ng_container_15_p_select_3_Template, 1, 3, "p-select", 433)(4, LeadFormPage_article_277_ng_container_15_p_select_4_Template, 1, 3, "p-select", 434)(5, LeadFormPage_article_277_ng_container_15_p_select_5_Template, 1, 3, "p-select", 435)(6, LeadFormPage_article_277_ng_container_15_p_select_6_Template, 1, 3, "p-select", 436)(7, LeadFormPage_article_277_ng_container_15_p_select_7_Template, 1, 3, "p-select", 437);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const factor_r64 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", factor_r64.key !== "budget" && factor_r64.key !== "readiness" && factor_r64.key !== "timeline" && factor_r64.key !== "problem" && factor_r64.key !== "economicBuyer" && factor_r64.key !== "icpFit");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", factor_r64.key === "budget");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", factor_r64.key === "readiness");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", factor_r64.key === "timeline");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", factor_r64.key === "problem");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", factor_r64.key === "economicBuyer");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", factor_r64.key === "icpFit");
} }
function LeadFormPage_article_277_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    const _r73 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 448);
    i0.ɵɵlistener("ngModelChange", function LeadFormPage_article_277_ng_template_16_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r73); const factor_r64 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); ctx_r2.setCustomFactorValue(factor_r64.key, $event); return i0.ɵɵresetView(ctx_r2.onQualificationFactorChange()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const factor_r64 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("id", "lead-factor-" + factor_r64.key)("name", "lead-factor-" + factor_r64.key)("ngModel", factor_r64.value);
} }
function LeadFormPage_article_277_div_29_ng_template_4_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 440);
    i0.ɵɵelement(1, "i", 441);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r75 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(2, _c9, "tone-" + option_r75.tone, option_r75.icon));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r75.label);
} }
function LeadFormPage_article_277_div_29_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, LeadFormPage_article_277_div_29_ng_template_4_div_0_Template, 4, 5, "div", 439);
} if (rf & 2) {
    const option_r75 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r75);
} }
function LeadFormPage_article_277_div_29_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 440);
    i0.ɵɵelement(1, "i", 441);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r76 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(2, _c9, "tone-" + option_r76.tone, option_r76.icon));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r76.label);
} }
function LeadFormPage_article_277_div_29_Template(rf, ctx) { if (rf & 1) {
    const _r74 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 449)(1, "label");
    i0.ɵɵtext(2, "Evidence source");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-select", 450);
    i0.ɵɵlistener("ngModelChange", function LeadFormPage_article_277_div_29_Template_p_select_ngModelChange_3_listener($event) { i0.ɵɵrestoreView(_r74); const factor_r64 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); ctx_r2.setEvidenceValueForFactor(factor_r64.key, $event); return i0.ɵɵresetView(ctx_r2.onQualificationFactorChange()); });
    i0.ɵɵtemplate(4, LeadFormPage_article_277_div_29_ng_template_4_Template, 1, 1, "ng-template", 130)(5, LeadFormPage_article_277_div_29_ng_template_5_Template, 4, 5, "ng-template", 112);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const factor_r64 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵattribute("for", "lead-factor-evidence-" + factor_r64.key);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("inputId", "lead-factor-evidence-" + factor_r64.key)("name", "lead-factor-evidence-" + factor_r64.key)("options", factor_r64.evidenceOptions)("ngModel", factor_r64.evidence);
} }
function LeadFormPage_article_277_Template(rf, ctx) { if (rf & 1) {
    const _r62 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 418)(1, "header", 419)(2, "div")(3, "div", 420)(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, LeadFormPage_article_277_span_6_Template, 2, 0, "span", 421)(7, LeadFormPage_article_277_span_7_Template, 2, 0, "span", 422);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "span", 145);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 423)(13, "label");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, LeadFormPage_article_277_ng_container_15_Template, 8, 7, "ng-container", 131)(16, LeadFormPage_article_277_ng_template_16_Template, 1, 3, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 424)(19, "div", 425)(20, "span", 426);
    i0.ɵɵtext(21, "Evidence");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "strong");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "button", 427);
    i0.ɵɵlistener("click", function LeadFormPage_article_277_Template_button_click_24_listener() { const factor_r64 = i0.ɵɵrestoreView(_r62).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleEvidenceExpanded(factor_r64.key)); });
    i0.ɵɵelementStart(25, "span", 353);
    i0.ɵɵelement(26, "i", 242);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(29, LeadFormPage_article_277_div_29_Template, 6, 5, "div", 428);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const factor_r64 = ctx.$implicit;
    const qualificationTextFactor_r77 = i0.ɵɵreference(17);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(factor_r64.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", factor_r64.required);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !factor_r64.includeInScore);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(factor_r64.helperText);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", ctx_r2.qualificationStatusChipTone(factor_r64.key));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.qualificationStatusChipLabel(factor_r64.key), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵattribute("for", "lead-factor-" + factor_r64.key);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(factor_r64.customText ? "Detail" : "Qualification state");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !factor_r64.customText)("ngIfElse", qualificationTextFactor_r77);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.evidenceSummaryLabel(factor_r64.key));
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r2.isEvidenceDisabled(factor_r64.value));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r2.shouldShowEvidenceField(factor_r64.key) ? "pi-chevron-up" : "pi-chevron-down");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.shouldShowEvidenceField(factor_r64.key) ? "Hide evidence" : "Add evidence");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.shouldShowEvidenceField(factor_r64.key));
} }
function LeadFormPage_div_306_Template(rf, ctx) { if (rf & 1) {
    const _r78 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 106)(1, "div", 451)(2, "button", 452);
    i0.ɵɵlistener("click", function LeadFormPage_div_306_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r78); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.recycleToNurture()); });
    i0.ɵɵelementStart(3, "span", 353);
    i0.ɵɵelement(4, "i", 453);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6, "Recycle to nurture");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 454);
    i0.ɵɵtext(8, "Moves the lead back into nurture and schedules a follow-up.");
    i0.ɵɵelementEnd()()();
} }
function LeadFormPage_div_307_Template(rf, ctx) { if (rf & 1) {
    const _r79 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 95)(1, "label", 455);
    i0.ɵɵtext(2, "Nurture follow-up date ");
    i0.ɵɵelementStart(3, "span", 97);
    i0.ɵɵtext(4, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p-datepicker", 456);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_div_307_Template_p_datepicker_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r79); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.form.nurtureFollowUpAtUtc, $event) || (ctx_r2.form.nurtureFollowUpAtUtc = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.nurtureFollowUpAtUtc);
} }
function LeadFormPage_div_308_Template(rf, ctx) { if (rf & 1) {
    const _r80 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 106)(1, "label", 457);
    i0.ɵɵtext(2, "Disqualified reason ");
    i0.ɵɵelementStart(3, "span", 97);
    i0.ɵɵtext(4, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p-select", 458);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_div_308_Template_p_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r80); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.form.disqualifiedReason, $event) || (ctx_r2.form.disqualifiedReason = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("options", ctx_r2.disqualificationReasonOptions());
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.disqualifiedReason);
} }
function LeadFormPage_div_309_Template(rf, ctx) { if (rf & 1) {
    const _r81 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 106)(1, "label", 459);
    i0.ɵɵtext(2, "Loss reason ");
    i0.ɵɵelementStart(3, "span", 97);
    i0.ɵɵtext(4, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p-select", 460);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_div_309_Template_p_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r81); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.form.lossReason, $event) || (ctx_r2.form.lossReason = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("options", ctx_r2.lossReasonOptions());
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.lossReason);
} }
function LeadFormPage_div_310_Template(rf, ctx) { if (rf & 1) {
    const _r82 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 95)(1, "label", 461);
    i0.ɵɵtext(2, "Competitor ");
    i0.ɵɵelementStart(3, "span", 97);
    i0.ɵɵtext(4, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p-inputgroup")(6, "p-inputgroup-addon", 462);
    i0.ɵɵelement(7, "i", 463);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "input", 464);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_div_310_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r82); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.form.lossCompetitor, $event) || (ctx_r2.form.lossCompetitor = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.lossCompetitor);
} }
function LeadFormPage_div_311_Template(rf, ctx) { if (rf & 1) {
    const _r83 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 106)(1, "label", 465);
    i0.ɵɵtext(2, "Loss notes ");
    i0.ɵɵelementStart(3, "span", 97);
    i0.ɵɵtext(4, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "textarea", 466);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_div_311_Template_textarea_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r83); const ctx_r2 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r2.form.lossNotes, $event) || (ctx_r2.form.lossNotes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r2.form.lossNotes);
} }
function LeadFormPage_p_accordion_313_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 108);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.followUpHint());
} }
function LeadFormPage_p_accordion_313_div_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 476);
    i0.ɵɵtext(1, "Loading activities...");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_p_accordion_313_div_65_button_1_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const activity_r86 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2022 ", activity_r86.ownerName);
} }
function LeadFormPage_p_accordion_313_div_65_button_1_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const activity_r86 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2022 ", i0.ɵɵpipeBind2(2, 1, ctx_r2.activityTimelineDateLabel(activity_r86), "medium"));
} }
function LeadFormPage_p_accordion_313_div_65_button_1_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 493);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const activity_r86 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(activity_r86.outcome);
} }
function LeadFormPage_p_accordion_313_div_65_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r85 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 485);
    i0.ɵɵlistener("click", function LeadFormPage_p_accordion_313_div_65_button_1_Template_button_click_0_listener() { const activity_r86 = i0.ɵɵrestoreView(_r85).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openActivityRecord(activity_r86.id)); });
    i0.ɵɵelementStart(1, "div", 486);
    i0.ɵɵelement(2, "i", 242);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 487)(4, "div", 488)(5, "span", 489);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 490);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 491)(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(12, LeadFormPage_p_accordion_313_div_65_button_1_span_12_Template, 2, 1, "span", 155)(13, LeadFormPage_p_accordion_313_div_65_button_1_span_13_Template, 3, 4, "span", 155);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, LeadFormPage_p_accordion_313_div_65_button_1_div_14_Template, 2, 1, "div", 492);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const activity_r86 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-type", activity_r86.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r2.activityTypeIcon(activity_r86.type));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(activity_r86.subject);
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-status", activity_r86.status);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(activity_r86.status);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(activity_r86.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", activity_r86.ownerName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activityTimelineDateLabel(activity_r86));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", activity_r86.outcome);
} }
function LeadFormPage_p_accordion_313_div_65_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 483);
    i0.ɵɵtemplate(1, LeadFormPage_p_accordion_313_div_65_button_1_Template, 15, 9, "button", 484);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.recentLeadActivities());
} }
function LeadFormPage_p_accordion_313_ng_template_66_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 476);
    i0.ɵɵtext(1, "No related activities yet.");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_p_accordion_313_ng_template_66_div_1_div_7_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const last_r88 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u2022 ", i0.ɵɵpipeBind2(2, 1, ctx_r2.activityTimelineDateLabel(last_r88), "medium"));
} }
function LeadFormPage_p_accordion_313_ng_template_66_div_1_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 500)(1, "span", 501);
    i0.ɵɵtext(2, "Last transferred activity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵtemplate(7, LeadFormPage_p_accordion_313_ng_template_66_div_1_div_7_ng_container_7_Template, 3, 4, "ng-container", 155);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const last_r88 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(last_r88.subject);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", last_r88.type, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activityTimelineDateLabel(last_r88));
} }
function LeadFormPage_p_accordion_313_ng_template_66_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r87 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 495)(1, "div", 496);
    i0.ɵɵelement(2, "i", 497);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Converted lead activity summary");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "p", 498);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, LeadFormPage_p_accordion_313_ng_template_66_div_1_div_7_Template, 8, 3, "div", 499);
    i0.ɵɵelementStart(8, "button", 480);
    i0.ɵɵlistener("click", function LeadFormPage_p_accordion_313_ng_template_66_div_1_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r87); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.openConvertedActivityTimeline()); });
    i0.ɵɵelementStart(9, "span", 353);
    i0.ɵɵelement(10, "i", 328);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12, "Open transferred activities");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.transferredActivitySummaryLabel());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.transferredLastActivity());
} }
function LeadFormPage_p_accordion_313_ng_template_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, LeadFormPage_p_accordion_313_ng_template_66_div_0_Template, 2, 0, "div", 481)(1, LeadFormPage_p_accordion_313_ng_template_66_div_1_Template, 13, 2, "div", 494);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", !ctx_r2.recentLeadActivitiesLoading() && !ctx_r2.hasTransferredActivitySummary());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.recentLeadActivitiesLoading() && ctx_r2.hasTransferredActivitySummary());
} }
function LeadFormPage_p_accordion_313_Template(rf, ctx) { if (rf & 1) {
    const _r84 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-accordion", 165);
    i0.ɵɵlistener("valueChange", function LeadFormPage_p_accordion_313_Template_p_accordion_valueChange_0_listener($event) { i0.ɵɵrestoreView(_r84); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onAccordionValueChange("activity", $event)); });
    i0.ɵɵelementStart(1, "p-accordion-panel", 467)(2, "p-accordion-header")(3, "h2", 90);
    i0.ɵɵelement(4, "i", 468);
    i0.ɵɵtext(5, " Next Lead Action ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p-accordion-content")(7, "section", 469);
    i0.ɵɵtemplate(8, LeadFormPage_p_accordion_313_p_8_Template, 2, 1, "p", 470);
    i0.ɵɵelementStart(9, "div", 471)(10, "div", 95)(11, "label");
    i0.ɵɵtext(12, "Recommended channel");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 472);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 95)(16, "label");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "div", 472);
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 106)(22, "label");
    i0.ɵɵtext(23, "Planning note");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 472);
    i0.ɵɵtext(25, " Lead follow-up planning is shown here for visibility. Use ");
    i0.ɵɵelementStart(26, "strong");
    i0.ɵɵtext(27, "Log activity");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(28, " to record the actual outreach and keep the activity timeline as the source of truth. ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(29, "div", 473)(30, "button", 474);
    i0.ɵɵlistener("click", function LeadFormPage_p_accordion_313_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r84); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openQuickActivity("Call")); });
    i0.ɵɵelementStart(31, "span", 353);
    i0.ɵɵelement(32, "i", 118);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span");
    i0.ɵɵtext(34, "Log call");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(35, "button", 474);
    i0.ɵɵlistener("click", function LeadFormPage_p_accordion_313_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r84); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openQuickActivity("Email")); });
    i0.ɵɵelementStart(36, "span", 353);
    i0.ɵɵelement(37, "i", 122);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(38, "span");
    i0.ɵɵtext(39, "Log email");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(40, "button", 474);
    i0.ɵɵlistener("click", function LeadFormPage_p_accordion_313_Template_button_click_40_listener() { i0.ɵɵrestoreView(_r84); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openQuickActivity("Task")); });
    i0.ɵɵelementStart(41, "span", 353);
    i0.ɵɵelement(42, "i", 254);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "span");
    i0.ɵɵtext(44, "Schedule follow-up");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(45, "button", 475);
    i0.ɵɵlistener("click", function LeadFormPage_p_accordion_313_Template_button_click_45_listener() { i0.ɵɵrestoreView(_r84); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.logActivity(ctx_r2.form.status === "Nurture" ? "reengagement" : "follow-up")); });
    i0.ɵɵelementStart(46, "span", 353);
    i0.ɵɵelement(47, "i", 211);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "span");
    i0.ɵɵtext(49);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(50, "div", 476);
    i0.ɵɵtext(51);
    i0.ɵɵelementStart(52, "span", 477);
    i0.ɵɵtext(53, "Activities recorded from the Activities module appear below in Recent Lead Activities.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(54, "div", 478)(55, "div", 479)(56, "h3");
    i0.ɵɵelement(57, "i", 254);
    i0.ɵɵtext(58, " Recent Lead Activities ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(59, "button", 480);
    i0.ɵɵlistener("click", function LeadFormPage_p_accordion_313_Template_button_click_59_listener() { i0.ɵɵrestoreView(_r84); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.logActivity()); });
    i0.ɵɵelementStart(60, "span", 353);
    i0.ɵɵelement(61, "i", 328);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(62, "span");
    i0.ɵɵtext(63, "Open Activities");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(64, LeadFormPage_p_accordion_313_div_64_Template, 2, 0, "div", 481)(65, LeadFormPage_p_accordion_313_div_65_Template, 2, 1, "div", 482)(66, LeadFormPage_p_accordion_313_ng_template_66_Template, 2, 2, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const noLeadActivities_r89 = i0.ɵɵreference(67);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("multiple", true)("value", ctx_r2.activityAccordionOpenPanels());
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r2.followUpHint());
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.nextLeadActionChannel());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.nextLeadActionDueLabel());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.nextLeadActionDueDate() ? i0.ɵɵpipeBind2(20, 11, ctx_r2.nextLeadActionDueDate(), "MM/dd/yyyy hh:mm a") : "No date scheduled", " ");
    i0.ɵɵadvance(30);
    i0.ɵɵtextInterpolate(ctx_r2.nextLeadActionButtonLabel());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.lastLeadActivitySummary(), " ");
    i0.ɵɵadvance(13);
    i0.ɵɵproperty("ngIf", ctx_r2.recentLeadActivitiesLoading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.recentLeadActivitiesLoading() && ctx_r2.recentLeadActivities().length)("ngIfElse", noLeadActivities_r89);
} }
function LeadFormPage_p_accordion_315_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 514);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.supportingDocumentRemainingCount(), " remaining ");
} }
function LeadFormPage_p_accordion_315_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 515);
    i0.ɵɵtext(1, "Limit reached");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_p_accordion_315_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 329);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.attachmentUploadError());
} }
function LeadFormPage_p_accordion_315_div_22_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "File");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Uploaded by");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Size");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "th");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_p_accordion_315_div_22_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r91 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td", 518);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 519)(13, "button", 520);
    i0.ɵɵlistener("click", function LeadFormPage_p_accordion_315_div_22_ng_template_3_Template_button_click_13_listener() { const row_r92 = i0.ɵɵrestoreView(_r91).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.deleteAttachment(row_r92)); });
    i0.ɵɵelement(14, "i", 521);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 522);
    i0.ɵɵlistener("click", function LeadFormPage_p_accordion_315_div_22_ng_template_3_Template_button_click_15_listener() { const row_r92 = i0.ɵɵrestoreView(_r91).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.downloadAttachment(row_r92)); });
    i0.ɵɵelement(16, "i", 523);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r92 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r92.fileName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r92.contentType || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r92.uploadedBy || "\u2014");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.attachmentSizeLabel(row_r92.size));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(11, 7, row_r92.createdAtUtc, "MMM d, yyyy \u00B7 h:mm a"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r2.attachmentDeleting(row_r92.id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.attachmentDeleting(row_r92.id));
} }
function LeadFormPage_p_accordion_315_div_22_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 476);
    i0.ɵɵtext(1, "No supporting documents uploaded yet.");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_p_accordion_315_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 516)(1, "p-table", 517);
    i0.ɵɵtemplate(2, LeadFormPage_p_accordion_315_div_22_ng_template_2_Template, 12, 0, "ng-template", 389)(3, LeadFormPage_p_accordion_315_div_22_ng_template_3_Template, 17, 10, "ng-template", 390);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, LeadFormPage_p_accordion_315_div_22_div_4_Template, 2, 0, "div", 481);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.attachments())("paginator", false)("rows", 10);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !ctx_r2.attachments().length);
} }
function LeadFormPage_p_accordion_315_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 476);
    i0.ɵɵtext(1, "Loading supporting documents...");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_p_accordion_315_Template(rf, ctx) { if (rf & 1) {
    const _r90 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-accordion", 165);
    i0.ɵɵlistener("valueChange", function LeadFormPage_p_accordion_315_Template_p_accordion_valueChange_0_listener($event) { i0.ɵɵrestoreView(_r90); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onAccordionValueChange("documents", $event)); });
    i0.ɵɵelementStart(1, "p-accordion-panel", 502)(2, "p-accordion-header")(3, "h2", 90);
    i0.ɵɵelement(4, "i", 503);
    i0.ɵɵtext(5, " Supporting documents ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p-accordion-content")(7, "section", 504)(8, "div", 505)(9, "div")(10, "p", 108);
    i0.ɵɵtext(11, " Add proposal files, requirements, screenshots, or supporting evidence for this lead. ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 506)(13, "span", 507);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, LeadFormPage_p_accordion_315_span_15_Template, 2, 1, "span", 508)(16, LeadFormPage_p_accordion_315_span_16_Template, 2, 0, "span", 509);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 510)(18, "p-fileUpload", 511);
    i0.ɵɵlistener("uploadHandler", function LeadFormPage_p_accordion_315_Template_p_fileUpload_uploadHandler_18_listener($event) { i0.ɵɵrestoreView(_r90); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onAttachmentUpload($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 512);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, LeadFormPage_p_accordion_315_div_21_Template, 2, 1, "div", 125);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(22, LeadFormPage_p_accordion_315_div_22_Template, 5, 4, "div", 513)(23, LeadFormPage_p_accordion_315_ng_template_23_Template, 2, 0, "ng-template", null, 7, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const docsLoadingTpl_r93 = i0.ɵɵreference(24);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("multiple", true)("value", ctx_r2.documentsAccordionOpenPanels());
    i0.ɵɵadvance(14);
    i0.ɵɵtextInterpolate(ctx_r2.supportingDocumentUsageLabel());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.isSupportingDocumentLimitReached());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.isSupportingDocumentLimitReached());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("customUpload", true)("auto", true)("disabled", ctx_r2.attachmentUploading() || ctx_r2.isSupportingDocumentLimitReached());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" Allowed: ", ctx_r2.supportingDocumentAllowedExtensions(), " \u00B7 Max ", ctx_r2.supportingDocumentMaxFileSizeMb(), " MB/file ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.attachmentUploadError());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.attachmentsLoading())("ngIfElse", docsLoadingTpl_r93);
} }
function LeadFormPage_p_accordion_317_div_8_div_1_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 531);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r95 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(entry_r95.detail);
} }
function LeadFormPage_p_accordion_317_div_8_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 535)(1, "div", 536);
    i0.ɵɵelement(2, "i", 242);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 537)(4, "div", 538)(5, "span", 539);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 540);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 530)(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(13, LeadFormPage_p_accordion_317_div_8_div_1_div_13_Template, 2, 1, "div", 541);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const entry_r95 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵattribute("data-tone", entry_r95.tone);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", entry_r95.icon);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(entry_r95.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(9, 6, entry_r95.occurredAtUtc, "medium"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(entry_r95.subtitle);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", entry_r95.detail);
} }
function LeadFormPage_p_accordion_317_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 533);
    i0.ɵɵtemplate(1, LeadFormPage_p_accordion_317_div_8_div_1_Template, 14, 9, "div", 534);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.mergedHistoryItems());
} }
function LeadFormPage_p_accordion_317_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 476);
    i0.ɵɵtext(1, "No timeline events recorded yet.");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_p_accordion_317_div_18_div_1_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 531);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r96 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", entry_r96.oldValue || "empty", " \u2192 ", entry_r96.newValue || "empty", " ");
} }
function LeadFormPage_p_accordion_317_div_18_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 544)(1, "div", 538);
    i0.ɵɵelement(2, "p-tag", 545);
    i0.ɵɵelementStart(3, "span", 540);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 530)(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(9, LeadFormPage_p_accordion_317_div_18_div_1_div_9_Template, 2, 2, "div", 541);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const entry_r96 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", entry_r96.field || entry_r96.action);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 4, entry_r96.createdAtUtc, "medium"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Changed by ", entry_r96.changedByName || "system");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", entry_r96.oldValue || entry_r96.newValue);
} }
function LeadFormPage_p_accordion_317_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 542);
    i0.ɵɵtemplate(1, LeadFormPage_p_accordion_317_div_18_div_1_Template, 10, 7, "div", 543);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.scoreAuditEvents());
} }
function LeadFormPage_p_accordion_317_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 476);
    i0.ɵɵtext(1, "No score changes recorded yet.");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_p_accordion_317_span_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Intent ", ctx_r2.conversationAiSemanticIntent());
} }
function LeadFormPage_p_accordion_317_div_36_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const stats_r97 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Last email ", i0.ɵɵpipeBind2(2, 1, stats_r97.lastEmailDate, "medium"));
} }
function LeadFormPage_p_accordion_317_div_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 530)(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, LeadFormPage_p_accordion_317_div_36_span_3_Template, 3, 4, "span", 155);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const stats_r97 = ctx.ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Total ", stats_r97.total, " \u00B7 Open rate ", stats_r97.openRate, "%");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", stats_r97.lastEmailDate);
} }
function LeadFormPage_p_accordion_317_div_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 476);
    i0.ɵɵtext(1, "Loading related emails...");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_p_accordion_317_ng_container_38_div_1_div_1_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 530);
    i0.ɵɵelement(1, "p-tag", 545);
    i0.ɵɵelementStart(2, "span", 540);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const email_r99 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", email_r99.status);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 4, email_r99.sentAtUtc || email_r99.createdAtUtc, "medium"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2(" ", ctx_r2.emailDirection(email_r99) === "inbound" ? "Inbound" : "Outbound", " \u00B7 ", email_r99.toName || email_r99.toEmail, " ");
} }
function LeadFormPage_p_accordion_317_ng_container_38_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r98 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 544)(1, "div", 538)(2, "button", 480);
    i0.ɵɵlistener("click", function LeadFormPage_p_accordion_317_ng_container_38_div_1_div_1_Template_button_click_2_listener() { const email_r99 = i0.ɵɵrestoreView(_r98).$implicit; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.toggleLeadEmailDetails(email_r99.id)); });
    i0.ɵɵelementStart(3, "span", 353);
    i0.ɵɵelement(4, "i", 242);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(7, LeadFormPage_p_accordion_317_ng_container_38_div_1_div_1_div_7_Template, 7, 7, "div", 532);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const email_r99 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r2.isLeadEmailExpanded(email_r99.id) ? "pi-chevron-down" : "pi-chevron-right");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(email_r99.subject);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.isLeadEmailExpanded(email_r99.id));
} }
function LeadFormPage_p_accordion_317_ng_container_38_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 542);
    i0.ɵɵtemplate(1, LeadFormPage_p_accordion_317_ng_container_38_div_1_div_1_Template, 8, 3, "div", 547);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.leadEmailsToDisplay())("ngForTrackBy", ctx_r2.trackEmailById);
} }
function LeadFormPage_p_accordion_317_ng_container_38_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r100 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 480);
    i0.ɵɵlistener("click", function LeadFormPage_p_accordion_317_ng_container_38_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r100); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.toggleEmailsExpanded()); });
    i0.ɵɵelementStart(1, "span", 353);
    i0.ɵɵelement(2, "i", 242);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r2.leadEmailsExpanded() ? "pi-angle-up" : "pi-angle-down");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.leadEmailsExpanded() ? "Show less" : "Show all related emails");
} }
function LeadFormPage_p_accordion_317_ng_container_38_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, LeadFormPage_p_accordion_317_ng_container_38_div_1_Template, 2, 2, "div", 528)(2, LeadFormPage_p_accordion_317_ng_container_38_button_2_Template, 5, 2, "button", 546);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const noRelatedEmails_r101 = i0.ɵɵreference(40);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.leadEmails().length)("ngIfElse", noRelatedEmails_r101);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.leadEmails().length > 5);
} }
function LeadFormPage_p_accordion_317_ng_template_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 476);
    i0.ɵɵtext(1, "No emails linked to this lead yet.");
    i0.ɵɵelementEnd();
} }
function LeadFormPage_p_accordion_317_Template(rf, ctx) { if (rf & 1) {
    const _r94 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-accordion", 165);
    i0.ɵɵlistener("valueChange", function LeadFormPage_p_accordion_317_Template_p_accordion_valueChange_0_listener($event) { i0.ɵɵrestoreView(_r94); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onAccordionValueChange("history", $event)); });
    i0.ɵɵelementStart(1, "p-accordion-panel", 524)(2, "p-accordion-header")(3, "h2", 90);
    i0.ɵɵelement(4, "i", 525);
    i0.ɵɵtext(5, " Status history ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p-accordion-content")(7, "section", 339);
    i0.ɵɵtemplate(8, LeadFormPage_p_accordion_317_div_8_Template, 2, 1, "div", 526)(9, LeadFormPage_p_accordion_317_ng_template_9_Template, 2, 0, "ng-template", null, 8, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "p-accordion-panel", 527)(12, "p-accordion-header")(13, "h2", 90);
    i0.ɵɵelement(14, "i", 143);
    i0.ɵɵtext(15, " Score change audit ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "p-accordion-content")(17, "section", 339);
    i0.ɵɵtemplate(18, LeadFormPage_p_accordion_317_div_18_Template, 2, 1, "div", 528)(19, LeadFormPage_p_accordion_317_ng_template_19_Template, 2, 0, "ng-template", null, 9, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "p-accordion-panel", 529)(22, "p-accordion-header")(23, "h2", 90);
    i0.ɵɵelement(24, "i", 122);
    i0.ɵɵtext(25, " Related emails ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "p-accordion-content")(27, "section", 339)(28, "div", 530)(29, "span");
    i0.ɵɵtext(30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "span");
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(33, LeadFormPage_p_accordion_317_span_33_Template, 2, 1, "span", 155);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "div", 531);
    i0.ɵɵtext(35);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(36, LeadFormPage_p_accordion_317_div_36_Template, 4, 3, "div", 532)(37, LeadFormPage_p_accordion_317_div_37_Template, 2, 0, "div", 481)(38, LeadFormPage_p_accordion_317_ng_container_38_Template, 3, 3, "ng-container", 155)(39, LeadFormPage_p_accordion_317_ng_template_39_Template, 2, 0, "ng-template", null, 10, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const noHistory_r102 = i0.ɵɵreference(10);
    const noScoreAudit_r103 = i0.ɵɵreference(20);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("multiple", true)("value", ctx_r2.historyAccordionOpenPanels());
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("ngIf", ctx_r2.mergedHistoryItems().length)("ngIfElse", noHistory_r102);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngIf", ctx_r2.scoreAuditEvents().length)("ngIfElse", noScoreAudit_r103);
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate1("Conversation Score ", ctx_r2.conversationContributionTotal(), " / 100");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Sentiment ", ctx_r2.conversationSentimentDisplay());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.conversationAiSemanticIntent());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.conversationSummaryDisplay(), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.emailEngagementStats());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.leadEmailsLoading());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.leadEmailsLoading());
} }
/** Progression statuses shown in the stepper (left → right) */
const LEAD_PROGRESSION_STATUSES = ['New', 'Contacted', 'Qualified'];
/** Outcome statuses shown as exit buttons below the stepper */
const LEAD_OUTCOME_STATUSES = ['Converted', 'Lost', 'Disqualified'];
const CQVS_GROUP_DEFINITIONS = [
    {
        code: 'C',
        title: 'Company Fit',
        description: 'ICP alignment and account fit.',
        weight: 10,
        factors: ['ICP Fit']
    },
    {
        code: 'Q',
        title: 'Qualification Readiness',
        description: 'Budget, readiness, and buying timeline.',
        weight: 60,
        factors: ['Budget', 'Readiness', 'Timeline']
    },
    {
        code: 'V',
        title: 'Value / Problem Severity',
        description: 'Business pain and urgency.',
        weight: 20,
        factors: ['Problem']
    },
    {
        code: 'S',
        title: 'Stakeholder Access',
        description: 'Economic buyer engagement.',
        weight: 10,
        factors: ['Economic Buyer']
    }
];
export class LeadFormPage {
    static ACCORDION_STATE_STORAGE_KEY = 'crm.lead-form.accordion-state.v1';
    activeTab = signal('overview', ...(ngDevMode ? [{ debugName: "activeTab" }] : []));
    /** Inline closure form state (Strategy C – stepper morphs) */
    closureFormActive = signal(false, ...(ngDevMode ? [{ debugName: "closureFormActive" }] : []));
    closureFormStatus = signal(null, ...(ngDevMode ? [{ debugName: "closureFormStatus" }] : []));
    closureReason = '';
    closureCompetitor = '';
    closureNotes = '';
    /** Backward movement confirmation state */
    backwardConfirmPending = signal(false, ...(ngDevMode ? [{ debugName: "backwardConfirmPending" }] : []));
    backwardConfirmTarget = signal(null, ...(ngDevMode ? [{ debugName: "backwardConfirmTarget" }] : []));
    /** Inline convert form state (Strategy C – stepper morphs for Convert) */
    convertFormActive = signal(false, ...(ngDevMode ? [{ debugName: "convertFormActive" }] : []));
    statusPathExpanded = signal(false, ...(ngDevMode ? [{ debugName: "statusPathExpanded" }] : []));
    overviewAccordionOpenPanels = signal(['lead-basics', 'contact-details', 'score'], ...(ngDevMode ? [{ debugName: "overviewAccordionOpenPanels" }] : []));
    qualificationAccordionOpenPanels = signal([
        'qualification-factors',
        'qualification-context',
        'qualification-disposition'
    ], ...(ngDevMode ? [{ debugName: "qualificationAccordionOpenPanels" }] : []));
    activityAccordionOpenPanels = signal(['activity-main'], ...(ngDevMode ? [{ debugName: "activityAccordionOpenPanels" }] : []));
    documentsAccordionOpenPanels = signal(['documents-main'], ...(ngDevMode ? [{ debugName: "documentsAccordionOpenPanels" }] : []));
    historyAccordionOpenPanels = signal(['history-main'], ...(ngDevMode ? [{ debugName: "historyAccordionOpenPanels" }] : []));
    qualificationEvidenceExpanded = signal([], ...(ngDevMode ? [{ debugName: "qualificationEvidenceExpanded" }] : []));
    statusOptions = LEAD_STATUSES.map((status) => ({
        label: status,
        value: status,
        icon: this.statusIcon(status)
    }));
    assignmentOptions = [
        { label: 'Manual', value: 'Manual' },
        { label: 'Round robin', value: 'RoundRobin' },
        { label: 'Territory', value: 'Territory' }
    ];
    budgetOptions = [
        { label: 'Unknown / not yet discussed', value: 'Unknown / not yet discussed', icon: 'pi pi-question-circle', tone: 'unknown' },
        { label: 'Indicative range mentioned', value: 'Indicative range mentioned', icon: 'pi pi-info-circle', tone: 'assumed' },
        { label: 'Budget allocated and approved', value: 'Budget allocated and approved', icon: 'pi pi-check-circle', tone: 'verified' },
        { label: 'Budget identified but unapproved', value: 'Budget identified but unapproved', icon: 'pi pi-info-circle', tone: 'assumed' },
        { label: 'No defined budget', value: 'No defined budget', icon: 'pi pi-times-circle', tone: 'invalid' },
        { label: 'Budget explicitly unavailable', value: 'Budget explicitly unavailable', icon: 'pi pi-times-circle', tone: 'invalid' }
    ];
    readinessOptions = [
        { label: 'Unknown / unclear', value: 'Unknown / unclear', icon: 'pi pi-question-circle', tone: 'unknown' },
        { label: 'Interest expressed, no urgency', value: 'Interest expressed, no urgency', icon: 'pi pi-info-circle', tone: 'assumed' },
        { label: 'Actively evaluating solutions', value: 'Actively evaluating solutions', icon: 'pi pi-info-circle', tone: 'assumed' },
        { label: 'Internal decision in progress', value: 'Internal decision in progress', icon: 'pi pi-check-circle', tone: 'verified' },
        { label: 'Ready to proceed pending final step', value: 'Ready to proceed pending final step', icon: 'pi pi-check-circle', tone: 'verified' },
        { label: 'Not planning to spend', value: 'Not planning to spend', icon: 'pi pi-times-circle', tone: 'invalid' }
    ];
    timelineOptions = [
        { label: 'Unknown / not discussed', value: 'Unknown / not discussed', icon: 'pi pi-question-circle', tone: 'unknown' },
        { label: 'Rough timeline mentioned', value: 'Rough timeline mentioned', icon: 'pi pi-info-circle', tone: 'assumed' },
        { label: 'Target date verbally confirmed', value: 'Target date verbally confirmed', icon: 'pi pi-info-circle', tone: 'assumed' },
        { label: 'Decision date confirmed internally', value: 'Decision date confirmed internally', icon: 'pi pi-check-circle', tone: 'verified' },
        { label: 'Date missed / repeatedly pushed', value: 'Date missed / repeatedly pushed', icon: 'pi pi-times-circle', tone: 'invalid' },
        { label: 'No defined timeline', value: 'No defined timeline', icon: 'pi pi-times-circle', tone: 'invalid' }
    ];
    problemOptions = [
        { label: 'Unknown / not validated', value: 'Unknown / not validated', icon: 'pi pi-question-circle', tone: 'unknown' },
        { label: 'Mild inconvenience', value: 'Mild inconvenience', icon: 'pi pi-info-circle', tone: 'assumed' },
        { label: 'Recognized operational problem', value: 'Recognized operational problem', icon: 'pi pi-info-circle', tone: 'assumed' },
        { label: 'High business impact', value: 'High business impact', icon: 'pi pi-info-circle', tone: 'assumed' },
        { label: 'Critical business impact', value: 'Critical business impact', icon: 'pi pi-check-circle', tone: 'verified' },
        { label: 'Executive-level priority', value: 'Executive-level priority', icon: 'pi pi-check-circle', tone: 'verified' },
        { label: 'Problem acknowledged but deprioritized', value: 'Problem acknowledged but deprioritized', icon: 'pi pi-times-circle', tone: 'invalid' }
    ];
    economicBuyerOptions = [
        { label: 'Unknown / not identified', value: 'Unknown / not identified', icon: 'pi pi-question-circle', tone: 'unknown' },
        { label: 'Influencer identified', value: 'Influencer identified', icon: 'pi pi-info-circle', tone: 'assumed' },
        { label: 'Buyer identified, not engaged', value: 'Buyer identified, not engaged', icon: 'pi pi-info-circle', tone: 'assumed' },
        { label: 'Buyer engaged in discussion', value: 'Buyer engaged in discussion', icon: 'pi pi-check-circle', tone: 'verified' },
        { label: 'Buyer verbally supportive', value: 'Buyer verbally supportive', icon: 'pi pi-check-circle', tone: 'verified' },
        { label: 'Buyer explicitly not involved', value: 'Buyer explicitly not involved', icon: 'pi pi-times-circle', tone: 'invalid' }
    ];
    icpFitOptions = [
        { label: 'Unknown / not assessed', value: 'Unknown / not assessed', icon: 'pi pi-question-circle', tone: 'unknown' },
        { label: 'Partial ICP fit', value: 'Partial ICP fit', icon: 'pi pi-info-circle', tone: 'assumed' },
        { label: 'Strong ICP fit', value: 'Strong ICP fit', icon: 'pi pi-check-circle', tone: 'verified' },
        { label: 'Out-of-profile but exploratory', value: 'Out-of-profile but exploratory', icon: 'pi pi-info-circle', tone: 'assumed' },
        { label: 'Clearly out of ICP', value: 'Clearly out of ICP', icon: 'pi pi-times-circle', tone: 'invalid' }
    ];
    disqualificationReasonOptions = signal([], ...(ngDevMode ? [{ debugName: "disqualificationReasonOptions" }] : []));
    lossReasonOptions = signal([], ...(ngDevMode ? [{ debugName: "lossReasonOptions" }] : []));
    buyerTypeOptions = signal([], ...(ngDevMode ? [{ debugName: "buyerTypeOptions" }] : []));
    motivationUrgencyOptions = signal([], ...(ngDevMode ? [{ debugName: "motivationUrgencyOptions" }] : []));
    financingReadinessOptions = signal([], ...(ngDevMode ? [{ debugName: "financingReadinessOptions" }] : []));
    preApprovalStatusOptions = signal([], ...(ngDevMode ? [{ debugName: "preApprovalStatusOptions" }] : []));
    preferredAreaOptions = signal([], ...(ngDevMode ? [{ debugName: "preferredAreaOptions" }] : []));
    propertyTypeOptions = signal([], ...(ngDevMode ? [{ debugName: "propertyTypeOptions" }] : []));
    budgetBandOptions = signal([], ...(ngDevMode ? [{ debugName: "budgetBandOptions" }] : []));
    verticalPresetConfiguration = signal(null, ...(ngDevMode ? [{ debugName: "verticalPresetConfiguration" }] : []));
    tenantIndustryPreset = signal(null, ...(ngDevMode ? [{ debugName: "tenantIndustryPreset" }] : []));
    tenantPropertiesFeatureEnabled = signal(false, ...(ngDevMode ? [{ debugName: "tenantPropertiesFeatureEnabled" }] : []));
    evidenceOptions = LeadFormPage.defaultEvidenceSources().map((source) => LeadFormPage.toEvidenceOption(source));
    ownerOptions = signal([], ...(ngDevMode ? [{ debugName: "ownerOptions" }] : []));
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
    aiScoring = signal(false, ...(ngDevMode ? [{ debugName: "aiScoring" }] : []));
    statusApiError = signal(null, ...(ngDevMode ? [{ debugName: "statusApiError" }] : []));
    aiScoreNote = signal(null, ...(ngDevMode ? [{ debugName: "aiScoreNote" }] : []));
    aiScoreSeverity = signal('info', ...(ngDevMode ? [{ debugName: "aiScoreSeverity" }] : []));
    aiScoreConfidence = signal(null, ...(ngDevMode ? [{ debugName: "aiScoreConfidence" }] : []));
    emailError = signal(null, ...(ngDevMode ? [{ debugName: "emailError" }] : []));
    phoneError = signal(null, ...(ngDevMode ? [{ debugName: "phoneError" }] : []));
    assignmentEditable = signal(false, ...(ngDevMode ? [{ debugName: "assignmentEditable" }] : []));
    qualificationConfidenceLabel = signal(null, ...(ngDevMode ? [{ debugName: "qualificationConfidenceLabel" }] : []));
    qualificationConfidence = signal(null, ...(ngDevMode ? [{ debugName: "qualificationConfidence" }] : []));
    truthCoverage = signal(null, ...(ngDevMode ? [{ debugName: "truthCoverage" }] : []));
    assumptionsOutstanding = signal(null, ...(ngDevMode ? [{ debugName: "assumptionsOutstanding" }] : []));
    conversationScore = signal(null, ...(ngDevMode ? [{ debugName: "conversationScore" }] : []));
    conversationScoreLabel = signal(null, ...(ngDevMode ? [{ debugName: "conversationScoreLabel" }] : []));
    conversationScoreReasons = signal([], ...(ngDevMode ? [{ debugName: "conversationScoreReasons" }] : []));
    conversationScoreUpdatedAtUtc = signal(null, ...(ngDevMode ? [{ debugName: "conversationScoreUpdatedAtUtc" }] : []));
    conversationSignalAvailable = signal(false, ...(ngDevMode ? [{ debugName: "conversationSignalAvailable" }] : []));
    conversationAiDimensionScore = signal(null, ...(ngDevMode ? [{ debugName: "conversationAiDimensionScore" }] : []));
    conversationAiToneLabel = signal(null, ...(ngDevMode ? [{ debugName: "conversationAiToneLabel" }] : []));
    conversationAiSentiment = signal(null, ...(ngDevMode ? [{ debugName: "conversationAiSentiment" }] : []));
    conversationAiBuyingReadiness = signal(null, ...(ngDevMode ? [{ debugName: "conversationAiBuyingReadiness" }] : []));
    conversationAiSemanticIntent = signal(null, ...(ngDevMode ? [{ debugName: "conversationAiSemanticIntent" }] : []));
    conversationAiToneJustification = signal(null, ...(ngDevMode ? [{ debugName: "conversationAiToneJustification" }] : []));
    conversionReadiness = signal(null, ...(ngDevMode ? [{ debugName: "conversionReadiness" }] : []));
    lifecycleScore = signal(null, ...(ngDevMode ? [{ debugName: "lifecycleScore" }] : []));
    leadNumber = signal(null, ...(ngDevMode ? [{ debugName: "leadNumber" }] : []));
    serverNextEvidenceSuggestions = signal([], ...(ngDevMode ? [{ debugName: "serverNextEvidenceSuggestions" }] : []));
    nextEvidenceSuggestions = signal([], ...(ngDevMode ? [{ debugName: "nextEvidenceSuggestions" }] : []));
    qualificationFeedback = signal(null, ...(ngDevMode ? [{ debugName: "qualificationFeedback" }] : []));
    presenceUsers = signal([], ...(ngDevMode ? [{ debugName: "presenceUsers" }] : []));
    serverWeakestSignal = signal(null, ...(ngDevMode ? [{ debugName: "serverWeakestSignal" }] : []));
    serverWeakestState = signal(null, ...(ngDevMode ? [{ debugName: "serverWeakestState" }] : []));
    scoreBreakdown = signal([], ...(ngDevMode ? [{ debugName: "scoreBreakdown" }] : []));
    riskFlags = signal([], ...(ngDevMode ? [{ debugName: "riskFlags" }] : []));
    routingReason = signal(null, ...(ngDevMode ? [{ debugName: "routingReason" }] : []));
    statusHistory = signal([], ...(ngDevMode ? [{ debugName: "statusHistory" }] : []));
    scoreAuditEvents = signal([], ...(ngDevMode ? [{ debugName: "scoreAuditEvents" }] : []));
    attachments = signal([], ...(ngDevMode ? [{ debugName: "attachments" }] : []));
    attachmentsLoading = signal(false, ...(ngDevMode ? [{ debugName: "attachmentsLoading" }] : []));
    attachmentUploading = signal(false, ...(ngDevMode ? [{ debugName: "attachmentUploading" }] : []));
    attachmentDeletingIds = signal([], ...(ngDevMode ? [{ debugName: "attachmentDeletingIds" }] : []));
    attachmentUploadError = signal(null, ...(ngDevMode ? [{ debugName: "attachmentUploadError" }] : []));
    recentLeadActivities = signal([], ...(ngDevMode ? [{ debugName: "recentLeadActivities" }] : []));
    recentLeadActivitiesLoading = signal(false, ...(ngDevMode ? [{ debugName: "recentLeadActivitiesLoading" }] : []));
    leadEmails = signal([], ...(ngDevMode ? [{ debugName: "leadEmails" }] : []));
    leadEmailsLoading = signal(false, ...(ngDevMode ? [{ debugName: "leadEmailsLoading" }] : []));
    leadEmailsExpanded = signal(false, ...(ngDevMode ? [{ debugName: "leadEmailsExpanded" }] : []));
    expandedLeadEmailIds = signal([], ...(ngDevMode ? [{ debugName: "expandedLeadEmailIds" }] : []));
    leadEmailsTotalCount = signal(0, ...(ngDevMode ? [{ debugName: "leadEmailsTotalCount" }] : []));
    conversationAiSummary = signal(null, ...(ngDevMode ? [{ debugName: "conversationAiSummary" }] : []));
    conversationAiSummaryLoading = signal(false, ...(ngDevMode ? [{ debugName: "conversationAiSummaryLoading" }] : []));
    transferredActivityCount = signal(0, ...(ngDevMode ? [{ debugName: "transferredActivityCount" }] : []));
    transferredLastActivity = signal(null, ...(ngDevMode ? [{ debugName: "transferredLastActivity" }] : []));
    transferredActivityEntityType = signal(null, ...(ngDevMode ? [{ debugName: "transferredActivityEntityType" }] : []));
    phoneTypeOptions = [];
    phoneCountryOptions = [];
    phoneCountryIso = '';
    phoneNationalNumber = '';
    phoneMask = signal('', ...(ngDevMode ? [{ debugName: "phoneMask" }] : []));
    phonePlaceholder = signal('Phone number', ...(ngDevMode ? [{ debugName: "phonePlaceholder" }] : []));
    linkedAccountId = signal(null, ...(ngDevMode ? [{ debugName: "linkedAccountId" }] : []));
    linkedContactId = signal(null, ...(ngDevMode ? [{ debugName: "linkedContactId" }] : []));
    linkedOpportunityId = signal(null, ...(ngDevMode ? [{ debugName: "linkedOpportunityId" }] : []));
    firstTouchDueAtUtc = signal(null, ...(ngDevMode ? [{ debugName: "firstTouchDueAtUtc" }] : []));
    firstTouchedAtUtc = signal(null, ...(ngDevMode ? [{ debugName: "firstTouchedAtUtc" }] : []));
    followUpHint = signal(null, ...(ngDevMode ? [{ debugName: "followUpHint" }] : []));
    duplicateDialogVisible = signal(false, ...(ngDevMode ? [{ debugName: "duplicateDialogVisible" }] : []));
    duplicateCheckResult = signal(null, ...(ngDevMode ? [{ debugName: "duplicateCheckResult" }] : []));
    duplicateMatches = signal([], ...(ngDevMode ? [{ debugName: "duplicateMatches" }] : []));
    qualificationPolicyConfig = signal(null, ...(ngDevMode ? [{ debugName: "qualificationPolicyConfig" }] : []));
    supportingDocumentPolicy = signal(null, ...(ngDevMode ? [{ debugName: "supportingDocumentPolicy" }] : []));
    toastService = inject(AppToastService);
    phoneUtil = PhoneNumberUtil.getInstance();
    regionDisplay = typeof Intl !== 'undefined' && 'DisplayNames' in Intl
        ? new Intl.DisplayNames(['en'], { type: 'region' })
        : null;
    leadData = inject(LeadDataService);
    userAdminData = inject(UserAdminDataService);
    referenceData = inject(ReferenceDataService);
    workspaceSettings = inject(WorkspaceSettingsService);
    attachmentData = inject(AttachmentDataService);
    activityData = inject(ActivityDataService);
    authService = inject(AuthService);
    formDraftService = inject(FormDraftService);
    mailCompose = inject(MailComposeService);
    tenantContextService = inject(TenantContextService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    crmEvents = inject(CrmEventsService);
    destroyRef = inject(DestroyRef);
    currentUserId = readUserId();
    editingId = null;
    leadDataWeights = [];
    pendingSavePayload = null;
    pendingDraftToOpen = null;
    pendingSaveIsEdit = false;
    localEditingState = false;
    editingIdleTimer = null;
    formSnapshot = null;
    hasShownDraftPrompt = false;
    pendingLeaveResolver = null;
    pendingLeaveDecision = null;
    leaveAfterSave = false;
    leaveAfterDraftSave = false;
    cqvsRadarRenderTimer = null;
    showCqvsRadar = signal(false, ...(ngDevMode ? [{ debugName: "showCqvsRadar" }] : []));
    ngOnInit() {
        this.editingId = this.route.snapshot.paramMap.get('id');
        this.loadRecentDrafts();
        this.activeTab.set(this.getDefaultTab());
        this.scheduleCqvsRadarRender(this.activeTab() === 'qualification');
        this.restoreAccordionState();
        const lead = history.state?.lead;
        this.loadOwners();
        this.loadEvidenceSources();
        this.loadTenantContext();
        this.loadLeadDispositionPolicy();
        this.loadPhoneTypes();
        this.loadPhoneCountries();
        this.loadLeadDataWeights();
        this.loadSupportingDocumentPolicy();
        this.resolveAssignmentAccess();
        if (!this.editingId) {
            this.captureFormSnapshot();
        }
        if (this.editingId) {
            this.initializePresence(this.editingId);
            if (lead) {
                this.prefillFromLead(lead);
            }
            this.leadData.get(this.editingId).subscribe({
                next: (data) => {
                    this.prefillFromLead(data);
                    this.loadStatusHistory(this.editingId);
                    this.loadRecentLeadActivities(this.editingId);
                    this.loadSupportingDocuments(this.editingId);
                    this.loadLeadEmails(this.editingId);
                },
                error: (err) => {
                    console.error('Lead load failed:', err);
                    const status = err?.status;
                    const parsed = this.extractApiError(err, 'This lead is no longer available.');
                    const detail = status ? `(HTTP ${status}) ${parsed.message}` : parsed.message;
                    this.raiseToast('error', detail);
                    this.router.navigate(['/app/leads']);
                }
            });
        }
    }
    ngOnDestroy() {
        this.resolvePendingLeave(false);
        this.clearEditingIdleTimer();
        this.clearCqvsRadarRenderTimer();
        if (this.editingId) {
            this.crmEvents.setRecordEditingState('lead', this.editingId, false);
            this.crmEvents.leaveRecordPresence('lead', this.editingId);
        }
    }
    composeToCurrentLead(event) {
        event?.preventDefault();
        if (!this.isEditMode() || !this.form.email || !this.editingId) {
            return;
        }
        const displayName = `${this.form.firstName ?? ''} ${this.form.lastName ?? ''}`.trim();
        this.mailCompose.open({
            toEmail: this.form.email,
            toName: displayName || undefined,
            relatedEntityType: 'Lead',
            relatedEntityId: this.editingId
        });
    }
    onCollaborativeEditingActivity() {
        if (!this.editingId || !this.isEditMode()) {
            return;
        }
        if (!this.localEditingState) {
            this.localEditingState = true;
            this.crmEvents.setRecordEditingState('lead', this.editingId, true);
            console.debug('[LeadForm] Broadcasting editing state: true');
        }
        this.clearEditingIdleTimer();
        this.editingIdleTimer = setTimeout(() => {
            if (!this.editingId) {
                return;
            }
            // Keep editing state ON if form has uncommitted changes
            if (this.hasUncommittedChanges()) {
                console.debug('[LeadForm] Form has uncommitted changes, keeping editing state ON');
                return;
            }
            this.localEditingState = false;
            this.crmEvents.setRecordEditingState('lead', this.editingId, false);
            console.debug('[LeadForm] Broadcasting editing state: false (idle timeout)');
        }, 8000);
    }
    /**
     * Check if the form has uncommitted changes by comparing current values to the loaded snapshot.
     */
    hasUncommittedChanges() {
        if (!this.formSnapshot || !this.isEditMode()) {
            return false;
        }
        const currentSnapshot = this.createFormSnapshot();
        return currentSnapshot !== this.formSnapshot;
    }
    createFormSnapshot() {
        // Serialize key form fields for comparison
        const snapshotData = {
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            companyName: this.form.companyName,
            leadSummary: this.form.leadSummary,
            email: this.form.email,
            phone: this.form.phone,
            status: this.form.status,
            source: this.form.source,
            jobTitle: this.form.jobTitle,
            ownerId: this.form.ownerId,
            territory: this.form.territory,
            disqualifiedReason: this.form.disqualifiedReason,
            qualifiedNotes: this.form.qualifiedNotes,
            buyerType: this.form.buyerType,
            motivationUrgency: this.form.motivationUrgency,
            financingReadiness: this.form.financingReadiness,
            preApprovalStatus: this.form.preApprovalStatus,
            preferredArea: this.form.preferredArea,
            preferredPropertyType: this.form.preferredPropertyType,
            budgetBand: this.form.budgetBand,
            budgetAvailability: this.form.budgetAvailability,
            budgetEvidence: this.form.budgetEvidence,
            readinessToSpend: this.form.readinessToSpend,
            readinessEvidence: this.form.readinessEvidence,
            buyingTimeline: this.form.buyingTimeline,
            timelineEvidence: this.form.timelineEvidence,
            problemSeverity: this.form.problemSeverity,
            problemEvidence: this.form.problemEvidence,
            economicBuyer: this.form.economicBuyer,
            economicBuyerEvidence: this.form.economicBuyerEvidence,
            icpFit: this.form.icpFit,
            icpFitEvidence: this.form.icpFitEvidence,
            customQualificationFactors: this.form.customQualificationFactors
        };
        return JSON.stringify(snapshotData);
    }
    captureFormSnapshot() {
        this.formSnapshot = this.createFormSnapshot();
        console.debug('[LeadForm] Form snapshot captured');
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
    resetEditingState() {
        if (this.editingId && this.localEditingState) {
            this.localEditingState = false;
            this.crmEvents.setRecordEditingState('lead', this.editingId, false);
            console.debug('[LeadForm] Broadcasting editing state: false (after save)');
        }
        this.clearEditingIdleTimer();
    }
    isEditMode() {
        return !!this.editingId;
    }
    hasUnsavedChanges() {
        return this.hasDraftFormChanges();
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
    onAccordionValueChange(section, value) {
        const normalized = Array.isArray(value)
            ? value
                .map((item) => (typeof item === 'number' ? String(item) : item))
                .filter((item) => typeof item === 'string')
            : typeof value === 'string'
                ? [value]
                : typeof value === 'number'
                    ? [String(value)]
                    : [];
        switch (section) {
            case 'overview':
                this.overviewAccordionOpenPanels.set(normalized);
                break;
            case 'qualification':
                this.qualificationAccordionOpenPanels.set(normalized);
                break;
            case 'activity':
                this.activityAccordionOpenPanels.set(normalized);
                break;
            case 'documents':
                this.documentsAccordionOpenPanels.set(normalized);
                break;
            case 'history':
                this.historyAccordionOpenPanels.set(normalized);
                break;
        }
        this.persistAccordionState();
    }
    setActiveTab(tab) {
        if (this.isTabDisabled(tab)) {
            return;
        }
        this.activeTab.set(tab);
        this.scheduleCqvsRadarRender(tab === 'qualification');
    }
    onActiveTabChange(tab) {
        if (typeof tab !== 'string') {
            return;
        }
        if (tab === 'overview' || tab === 'qualification' || tab === 'activity' || tab === 'history' || tab === 'documents') {
            this.setActiveTab(tab);
        }
    }
    scheduleCqvsRadarRender(shouldRender) {
        this.clearCqvsRadarRenderTimer();
        if (!shouldRender) {
            this.showCqvsRadar.set(false);
            return;
        }
        this.showCqvsRadar.set(false);
        this.cqvsRadarRenderTimer = setTimeout(() => {
            this.showCqvsRadar.set(true);
            this.cqvsRadarRenderTimer = null;
        }, 60);
    }
    isTabDisabled(tab) {
        return !this.isEditMode() && tab !== 'overview';
    }
    isOwnerReadOnly() {
        return !this.assignmentEditable();
    }
    onEmailChange(value) {
        this.form.email = value;
        if (!value?.trim()) {
            this.emailError.set(null);
            return;
        }
        this.emailError.set(this.isValidEmail(value) ? null : 'Enter a valid email address.');
    }
    onPhoneChange(value) {
        this.phoneNationalNumber = value;
        this.updatePhoneFromInputs();
    }
    onPhoneCountryChange(value) {
        this.phoneCountryIso = value;
        this.refreshPhoneCountryMeta();
        this.phoneNationalNumber = this.applyMaskToDigits(this.getDigitsOnly(this.phoneNationalNumber), this.phoneMask());
        this.updatePhoneFromInputs();
    }
    leadDisplayName() {
        const first = this.form.firstName?.trim() ?? '';
        const last = this.form.lastName?.trim() ?? '';
        return `${first} ${last}`.trim() || 'Lead';
    }
    qualificationInlineError() {
        if (this.form.status !== 'Qualified')
            return null;
        const minimum = this.minimumRequiredQualificationFactors();
        if (this.countQualificationFactors() < minimum) {
            return `${minimum} qualification factor${minimum === 1 ? '' : 's'} required to qualify.`;
        }
        if (this.requiresEvidenceBeforeQualified() && this.truthCoveragePercent() < this.minimumEvidenceCoveragePercent()) {
            return `Evidence coverage must be at least ${this.minimumEvidenceCoveragePercent()}% to qualify.`;
        }
        return null;
    }
    qualificationTabBadge() {
        const blockers = this.qualificationReadinessBlockers();
        if (!this.isEditMode()) {
            return null;
        }
        if (!blockers.length && this.countQualificationFactors() > 0) {
            return 'Ready';
        }
        if (!blockers.length) {
            return null;
        }
        return `${blockers.length} blocker${blockers.length === 1 ? '' : 's'}`;
    }
    activityTabBadge() {
        const due = this.nextLeadActionDueDate();
        if (!due)
            return null;
        const now = new Date();
        if (due.getTime() < now.getTime()) {
            return 'Overdue';
        }
        return null;
    }
    logActivity(mode = 'follow-up') {
        if (!this.editingId) {
            return;
        }
        const fullName = `${this.form.firstName ?? ''} ${this.form.lastName ?? ''}`.trim();
        const subject = mode === 'reengagement'
            ? (fullName ? `Re-engagement: ${fullName}` : 'Lead re-engagement')
            : mode === 'first-touch'
                ? (fullName ? `First touch: ${fullName}` : 'Lead first touch')
                : (fullName ? `Follow up: ${fullName}` : 'Lead follow-up');
        this.router.navigate(['/app/activities/new'], {
            queryParams: {
                relatedType: 'Lead',
                relatedId: this.editingId,
                subject,
                leadFirstTouchDueAtUtc: this.firstTouchDueAtUtc() ?? undefined
            }
        });
    }
    canConvertLead() {
        return this.isEditMode() && this.form.status === 'Qualified';
    }
    canRefreshScore() {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.leadsManage);
    }
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
    statusOptionsForView() {
        if (this.hasAdministrationManagePermission()) {
            return this.statusOptions.map((option) => ({ ...option, disabled: false }));
        }
        if (!this.isEditMode()) {
            return this.statusOptions.map((option) => ({
                ...option,
                disabled: option.value !== 'New'
            }));
        }
        return this.statusOptions.map((option) => ({
            ...option,
            disabled: this.isStatusSelectionDisabled(option.value)
        }));
    }
    statusPolicyHint() {
        const apiError = this.statusApiError();
        if (apiError) {
            return apiError;
        }
        if (!this.isEditMode()) {
            return null;
        }
        if (this.form.status === 'Converted') {
            return 'This lead is already converted. Update the opportunity instead.';
        }
        if (this.form.status === 'New' && !this.firstTouchedAtUtc()) {
            return 'Contacted is activity-driven. Log a completed call, email, or meeting to unlock it.';
        }
        if (this.form.status === 'Contacted' && this.firstTouchedAtUtc()) {
            return 'Contacted was set by completed activity.';
        }
        if (this.form.status === 'Nurture' && !this.hasRecentReengagementActivity()) {
            return 'Log a new re-engagement activity before resuming this lead to Contacted or Qualified.';
        }
        return null;
    }
    isActivityDrivenHint() {
        return this.isEditMode() && this.form.status === 'New' && !this.firstTouchedAtUtc();
    }
    goToActivityTab() {
        this.setActiveTab('activity');
    }
    nextRecommendedStatusChip() {
        if (!this.isEditMode() || this.form.status === 'Converted') {
            return null;
        }
        const hasFirstTouch = !!this.firstTouchedAtUtc();
        const hasQualifiedSignals = this.countQualificationFactors() >= 3;
        if ((this.form.status === 'New' || this.form.status === 'Nurture') && !hasFirstTouch) {
            return { label: 'Next recommended: Contacted', tone: 'warn' };
        }
        if ((this.form.status === 'New' || this.form.status === 'Contacted' || this.form.status === 'Nurture') && hasFirstTouch && hasQualifiedSignals) {
            if (this.requiresEvidenceBeforeQualified() && this.truthCoveragePercent() < this.minimumEvidenceCoveragePercent()) {
                return { label: 'Next recommended: Add evidence', tone: 'warn' };
            }
            return { label: 'Next recommended: Qualified', tone: 'success' };
        }
        if ((this.form.status === 'New' || this.form.status === 'Contacted' || this.form.status === 'Nurture') && hasFirstTouch) {
            return { label: 'Next recommended: Contacted', tone: 'info' };
        }
        if (this.form.status === 'Qualified' && this.canConvertLead()) {
            return { label: 'Next recommended: Convert lead', tone: 'success' };
        }
        return null;
    }
    primaryStatusAction() {
        if (!this.isEditMode()) {
            return null;
        }
        if (this.canRecycleLead()) {
            return {
                kind: 'recycle',
                label: 'Recycle to Nurture',
                icon: 'pi pi-refresh',
                disabled: false
            };
        }
        if (this.form.status === 'Qualified') {
            return {
                kind: 'convert',
                label: 'Convert Lead',
                icon: 'pi pi-arrow-up-right',
                disabled: !this.canConvertLead()
            };
        }
        if (this.form.status === 'New' && !this.hasAnyCompletedLeadActivityEvidence()) {
            return {
                kind: 'logActivity',
                label: 'Log first activity',
                icon: 'pi pi-calendar-plus',
                disabled: false
            };
        }
        if (this.form.status === 'Nurture') {
            if (!this.hasRecentReengagementActivity()) {
                return {
                    kind: 'logActivity',
                    label: 'Log re-engagement',
                    icon: 'pi pi-calendar-plus',
                    disabled: false
                };
            }
            const resumeStatus = this.hasReachedContactedStage() ? 'Contacted' : 'New';
            return {
                kind: 'progress',
                status: resumeStatus,
                label: resumeStatus === 'Contacted' ? 'Resume to Contacted' : 'Move to New',
                icon: this.statusIcon(resumeStatus),
                disabled: false
            };
        }
        const nextStatus = this.nextProgressionStatus();
        if (!nextStatus) {
            return null;
        }
        return {
            kind: 'progress',
            status: nextStatus,
            label: this.progressActionLabel(nextStatus),
            icon: this.statusIcon(nextStatus),
            disabled: this.progressActionBlockedReasons().length > 0
        };
    }
    triggerPrimaryStatusAction() {
        const action = this.primaryStatusAction();
        if (!action || action.disabled) {
            return;
        }
        switch (action.kind) {
            case 'progress':
                if (action.status) {
                    this.form.status = action.status;
                }
                return;
            case 'logActivity':
                this.logActivity(this.form.status === 'Nurture' ? 'reengagement' : 'first-touch');
                return;
            case 'convert':
                this.onOutcomeClick('Converted');
                return;
            case 'recycle':
                this.recycleToNurture();
                return;
        }
    }
    toggleStatusPath() {
        this.statusPathExpanded.update((value) => !value);
    }
    progressActionBlockedReasons() {
        const status = this.nextMainProgressionTarget();
        if (!status) {
            return [];
        }
        return this.transitionBlockedReasons(status);
    }
    secondaryOutcomeActions() {
        return [
            {
                status: 'Lost',
                label: 'Mark Lost',
                icon: 'pi pi-times-circle',
                disabled: !this.isOutcomeAvailable('Lost')
            },
            {
                status: 'Disqualified',
                label: 'Disqualify',
                icon: 'pi pi-ban',
                disabled: !this.isOutcomeAvailable('Disqualified')
            }
        ];
    }
    currentStatusInstruction() {
        const action = this.primaryStatusAction();
        if (!action) {
            return this.statusPolicyHint();
        }
        if (action.kind === 'progress') {
            if (this.progressActionBlockedReasons().length) {
                return 'Complete the required evidence below to unlock the next main step.';
            }
            return `Recommended next step: ${action.label}`;
        }
        if (action.kind === 'logActivity') {
            return action.label === 'Log re-engagement'
                ? 'Re-engagement required'
                : 'Log the first completed activity before moving this lead forward.';
        }
        if (action.kind === 'convert') {
            return action.disabled ? 'Conversion is blocked until qualification and policy requirements are met.' : 'Lead is ready for conversion.';
        }
        if (action.kind === 'recycle') {
            return 'This lead can be recycled back into nurture for follow-up.';
        }
        return null;
    }
    nurtureBranchAction() {
        if (!this.isEditMode() || this.form.status === 'Converted' || this.canRecycleLead()) {
            return null;
        }
        if (this.form.status === 'Nurture') {
            return null;
        }
        return {
            label: 'Move to Nurture',
            icon: 'pi pi-clock'
        };
    }
    nurtureBranchState() {
        const current = this.form.status;
        if (current === 'Nurture') {
            return 'current';
        }
        if (current === 'Converted' || current === 'Lost' || current === 'Disqualified') {
            return 'locked';
        }
        return 'available';
    }
    onNurtureBranchClick() {
        if (!this.isEditMode() || this.form.status === 'Nurture' || this.nurtureBranchState() === 'locked') {
            return;
        }
        if (this.form.status === 'Contacted' && !this.hasAnyCompletedLeadActivityEvidence()) {
            this.raiseToast('error', 'Log a completed activity before moving a contacted lead into nurture.');
            this.setActiveTab('activity');
            return;
        }
        this.form.status = 'Nurture';
        if (!this.form.nurtureFollowUpAtUtc) {
            this.form.nurtureFollowUpAtUtc = this.toDateValue(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString());
        }
        this.setActiveTab('qualification');
    }
    nextProgressionStatus() {
        const currentIndex = this.progressionIndex(this.form.status);
        if (currentIndex < 0 || currentIndex >= LEAD_PROGRESSION_STATUSES.length - 1) {
            return null;
        }
        return LEAD_PROGRESSION_STATUSES[currentIndex + 1];
    }
    progressActionLabel(status) {
        switch (status) {
            case 'Contacted':
                return 'Mark as Contacted';
            case 'Nurture':
                return 'Move to Nurture';
            case 'Qualified':
                return 'Move to Qualified';
            default:
                return `Move to ${status}`;
        }
    }
    nextMainProgressionTarget() {
        const current = this.form.status;
        if (current === 'Nurture') {
            return this.hasReachedContactedStage() ? 'Contacted' : 'New';
        }
        return this.nextProgressionStatus();
    }
    // ─── Status Stepper ────────────────────────────────────────────
    /** Whether to show the visual stepper (edit mode — all roles including admin) */
    showStatusStepper() {
        return this.isEditMode();
    }
    /** The ordered progression order index for the current status */
    progressionIndex(status) {
        return LEAD_PROGRESSION_STATUSES.indexOf(status);
    }
    /** Build the stepper steps with state + unlock hints */
    stepperSteps() {
        const current = this.form.status;
        const currentIdx = this.progressionIndex(current);
        const hasFirstTouch = !!this.firstTouchedAtUtc();
        const qualFactors = this.countQualificationFactors();
        const meetsEvidence = !this.requiresEvidenceBeforeQualified() || this.truthCoveragePercent() >= this.minimumEvidenceCoveragePercent();
        const isAdmin = this.hasAdministrationManagePermission();
        return LEAD_PROGRESSION_STATUSES.map((status, idx) => {
            let state;
            let unlockHint = null;
            if (status === current) {
                state = 'current';
            }
            else if (currentIdx >= 0 && idx < currentIdx) {
                // Steps before current are completed (in the progression)
                state = 'completed';
            }
            else {
                // Admins bypass gates — all steps are available
                if (isAdmin) {
                    state = 'available';
                }
                else {
                    state = this.transitionBlockedReasons(status).length === 0 ? 'available' : 'locked';
                    if (state === 'locked') {
                        unlockHint = this.transitionBlockedReasons(status).join(' ');
                    }
                }
            }
            // Special case: branch/outcome states that sit outside the main linear path
            if (currentIdx < 0) {
                if (current === 'Nurture') {
                    if (status === 'New') {
                        state = 'completed';
                    }
                    else if (status === 'Contacted') {
                        if (this.hasReachedContactedStage()) {
                            state = 'completed';
                        }
                        else if (isAdmin) {
                            state = 'available';
                        }
                        else {
                            state = this.transitionBlockedReasons(status).length === 0 ? 'available' : 'locked';
                            if (state === 'locked') {
                                unlockHint = this.transitionBlockedReasons(status).join(' ');
                            }
                        }
                    }
                    else if (status === 'Qualified') {
                        if (isAdmin) {
                            state = 'available';
                        }
                        else {
                            state = this.transitionBlockedReasons(status).length === 0 ? 'available' : 'locked';
                            if (state === 'locked') {
                                unlockHint = this.transitionBlockedReasons(status).join(' ');
                            }
                        }
                    }
                    else {
                        state = 'completed';
                    }
                }
                else if (current === 'Converted') {
                    state = 'completed';
                }
                else {
                    // Lost/Disqualified — show steps as they were before exit
                    state = idx === 0 ? 'completed' : 'locked';
                }
            }
            return {
                status,
                label: status,
                icon: this.statusIcon(status),
                state,
                unlockHint,
                timeInStage: state === 'current' ? this.computeTimeInStage(status) : null
            };
        });
    }
    /** Compute how long the lead has been in the given status */
    computeTimeInStage(status) {
        const history = this.statusHistory();
        if (!history.length)
            return null;
        // Find the most recent entry matching current status
        const entry = history.find(h => h.status === status);
        if (!entry?.changedAtUtc)
            return null;
        const changed = new Date(entry.changedAtUtc.endsWith('Z') ? entry.changedAtUtc : entry.changedAtUtc + 'Z');
        const now = new Date();
        const diffMs = now.getTime() - changed.getTime();
        if (diffMs < 0)
            return null;
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 60)
            return `${diffMins}m`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24)
            return `${diffHours}h`;
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 30)
            return `${diffDays}d`;
        const diffMonths = Math.floor(diffDays / 30);
        return `${diffMonths}mo`;
    }
    /** Build a compact audit trail from status history for display near the stepper */
    statusAuditTrail() {
        const history = this.statusHistory();
        if (!history.length)
            return [];
        // Show history in chronological order (oldest first), limit to last 6
        return [...history]
            .sort((a, b) => new Date(a.changedAtUtc).getTime() - new Date(b.changedAtUtc).getTime())
            .slice(-6)
            .map(h => ({
            status: h.status,
            date: new Date(h.changedAtUtc.endsWith('Z') ? h.changedAtUtc : h.changedAtUtc + 'Z')
                .toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }));
    }
    isStepUnlocked(status, hasFirstTouch, qualFactors, meetsEvidence) {
        switch (status) {
            case 'Contacted':
                return hasFirstTouch;
            case 'Nurture':
                return true; // Nurture is always available as a parking state
            case 'Qualified':
                return hasFirstTouch && qualFactors >= 3 && meetsEvidence;
            default:
                return true;
        }
    }
    stepUnlockHint(status, hasFirstTouch, qualFactors, meetsEvidence) {
        switch (status) {
            case 'Contacted':
                return 'Log a completed call, email, or meeting to unlock this step';
            case 'Qualified': {
                const missing = [];
                const minimum = this.minimumRequiredQualificationFactors();
                if (!hasFirstTouch)
                    missing.push('log an activity');
                if (qualFactors < minimum)
                    missing.push(`complete ${minimum - qualFactors} more qualification factor${minimum - qualFactors > 1 ? 's' : ''}`);
                if (!meetsEvidence)
                    missing.push('add evidence to meet coverage threshold');
                return `To unlock: ${missing.join(', ')}`;
            }
            default:
                return 'Complete the previous steps first';
        }
    }
    hasReachedContactedStage() {
        if (!!this.firstTouchedAtUtc()) {
            return true;
        }
        const current = this.form.status;
        if (current === 'Contacted' || current === 'Qualified' || current === 'Converted') {
            return true;
        }
        return this.statusHistory().some((entry) => entry.status === 'Contacted');
    }
    /** Whether the current status is an outcome (below the stepper) */
    isOutcomeStatus() {
        return !!this.form.status && LEAD_OUTCOME_STATUSES.includes(this.form.status);
    }
    /** Click handler for a stepper step */
    onStepClick(step) {
        if (step.state === 'current')
            return;
        // Locked step: navigate to the tab that helps satisfy unlock requirements
        if (step.state === 'locked') {
            this.onLockedStepClick(step);
            return;
        }
        // Backward movement: clicking a completed step to regress
        if (step.state === 'completed') {
            this.backwardConfirmTarget.set(step);
            this.backwardConfirmPending.set(true);
            return;
        }
        const blockedReasons = this.transitionBlockedReasons(step.status);
        if (blockedReasons.length) {
            this.raiseToast('error', blockedReasons[0]);
            this.onLockedStepClick(step);
            return;
        }
        this.form.status = step.status;
    }
    /** Navigate to the relevant tab when a locked step is clicked */
    onLockedStepClick(step) {
        if (step.status === 'Contacted') {
            this.setActiveTab('activity');
        }
        else if (step.status === 'Qualified') {
            const current = this.form.status;
            if (current === 'Nurture' && !this.hasRecentReengagementActivity()) {
                this.setActiveTab('activity');
                return;
            }
            this.setActiveTab('qualification');
        }
    }
    /** Confirm backward movement */
    confirmBackward() {
        const target = this.backwardConfirmTarget();
        if (target) {
            const blockedReasons = this.transitionBlockedReasons(target.status);
            if (blockedReasons.length) {
                this.raiseToast('error', blockedReasons[0]);
                this.onLockedStepClick(target);
            }
            else {
                this.form.status = target.status;
            }
        }
        this.backwardConfirmPending.set(false);
        this.backwardConfirmTarget.set(null);
    }
    /** Cancel backward movement */
    cancelBackward() {
        this.backwardConfirmPending.set(false);
        this.backwardConfirmTarget.set(null);
    }
    /** Click handler for outcome exit buttons */
    onOutcomeClick(status) {
        if (status === 'Converted') {
            this.convertFormActive.set(true);
        }
        else if (status === 'Lost' || status === 'Disqualified') {
            this.closureReason = '';
            this.closureCompetitor = '';
            this.closureNotes = '';
            this.closureFormStatus.set(status);
            this.closureFormActive.set(true);
        }
    }
    /** Confirm inline convert → navigate to the convert page */
    confirmConvert() {
        this.convertFormActive.set(false);
        this.onConvertLead();
    }
    /** Cancel the inline convert prompt */
    cancelConvert() {
        this.convertFormActive.set(false);
    }
    /** Confirm the closure: apply status + populate form fields, then trigger save */
    confirmClosure() {
        const status = this.closureFormStatus();
        if (!status)
            return;
        if (status === 'Lost') {
            if (!this.closureReason?.trim())
                return;
            this.form.status = status;
            this.form.lossReason = this.closureReason;
            this.form.lossCompetitor = this.closureCompetitor;
            this.form.lossNotes = this.closureNotes;
        }
        else {
            if (!this.closureReason?.trim())
                return;
            this.form.status = status;
            this.form.disqualifiedReason = this.closureReason;
        }
        // Trigger save — closure form closes only on success (inside performSave)
        this.onSave();
    }
    /** Cancel the inline closure form without changing status */
    cancelClosure() {
        this.closureFormActive.set(false);
        this.closureFormStatus.set(null);
    }
    /** Whether a specific outcome action is available */
    isOutcomeAvailable(status) {
        if (status === 'Converted')
            return this.canConvertLead();
        if (status === 'Lost' || status === 'Disqualified') {
            const current = this.form.status;
            return current !== 'Converted'; // Can exit to lost/disqualified from any non-converted status
        }
        return false;
    }
    hasLinkedRecords() {
        return !!(this.linkedAccountId() || this.linkedContactId() || this.linkedOpportunityId());
    }
    linkedAccountLink() {
        const id = this.linkedAccountId();
        return id ? `/app/customers/${id}/edit` : null;
    }
    linkedContactLink() {
        const id = this.linkedContactId();
        return id ? `/app/contacts/${id}/edit` : null;
    }
    linkedOpportunityLink() {
        const id = this.linkedOpportunityId();
        return id ? `/app/deals/${id}/edit` : null;
    }
    onConvertLead() {
        if (!this.editingId || !this.canConvertLead()) {
            return;
        }
        this.router.navigate(['/app/leads', this.editingId, 'convert']);
    }
    canRecycleLead() {
        return this.isEditMode() && (this.form.status === 'Lost' || this.form.status === 'Disqualified');
    }
    recycleToNurture() {
        if (!this.editingId || !this.canRecycleLead()) {
            return;
        }
        this.leadData.recycleToNurture(this.editingId).subscribe({
            next: () => {
                this.raiseToast('success', 'Lead recycled to nurture.');
                this.form.status = 'Nurture';
                this.form.nurtureFollowUpAtUtc = this.toDateValue(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString());
                this.reloadLeadDetails(this.editingId);
            },
            error: () => {
                this.raiseToast('error', 'Unable to recycle lead to nurture.');
            }
        });
    }
    onSave() {
        if (!this.form.firstName || !this.form.lastName) {
            return false;
        }
        if (!this.validateOverviewFields()) {
            return false;
        }
        const outcomeError = this.validateOutcome();
        if (outcomeError) {
            this.raiseToast('error', outcomeError);
            return false;
        }
        const resolvedScore = this.form.autoScore ? this.computeAutoScore() : (this.form.score ?? 0);
        const nurtureFollowUpAtUtc = this.form.status === 'Nurture' ? this.localToUtcIso(this.form.nurtureFollowUpAtUtc) : undefined;
        const payload = {
            ...this.form,
            score: resolvedScore,
            ownerId: this.form.assignmentStrategy === 'Manual' ? this.form.ownerId : undefined,
            territory: this.form.assignmentStrategy === 'Territory' ? this.form.territory : this.form.territory,
            nurtureFollowUpAtUtc
        };
        if (this.form.autoScore) {
            this.form.score = resolvedScore;
        }
        this.statusApiError.set(null);
        this.saving.set(true);
        const isEdit = !!this.editingId;
        this.submitWithDuplicateGuard(payload, isEdit);
        return true;
    }
    dismissDuplicateDialog() {
        this.duplicateDialogVisible.set(false);
        this.duplicateCheckResult.set(null);
        this.duplicateMatches.set([]);
        this.pendingSavePayload = null;
    }
    reviewDuplicate(candidate) {
        this.dismissDuplicateDialog();
        this.router.navigate(['/app/leads', candidate.leadId, 'edit']);
    }
    saveDespiteWarning() {
        if (!this.pendingSavePayload) {
            this.dismissDuplicateDialog();
            return;
        }
        const payload = this.pendingSavePayload;
        const isEdit = this.pendingSaveIsEdit;
        this.dismissDuplicateDialog();
        this.performSave(payload, isEdit);
    }
    duplicateIsBlocked() {
        return this.duplicateCheckResult()?.isBlocked ?? false;
    }
    duplicateDialogTitle() {
        return this.duplicateIsBlocked() ? 'Duplicate Lead Blocked' : 'Possible Duplicate Leads';
    }
    duplicateDialogMessage() {
        if (this.duplicateIsBlocked()) {
            return 'An exact duplicate exists. Open the existing lead and continue there.';
        }
        return 'Similar leads were found. Review and decide whether to save anyway.';
    }
    primarySaveLabel() {
        return this.isEditMode() ? 'Update Lead' : 'Create Lead';
    }
    draftButtonLabel() {
        const count = this.recentDrafts().length;
        return count > 0 ? `Save Draft (${count})` : 'Save Draft';
    }
    draftSplitButtonItems() {
        const items = [];
        const drafts = this.recentDrafts();
        items.push({
            label: 'Saved drafts',
            disabled: true,
            styleClass: 'crm-draft-menu-heading'
        });
        if (!drafts.length) {
            items.push({
                label: 'No saved drafts yet',
                disabled: true,
                styleClass: 'crm-draft-menu-empty'
            });
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
        items.push({
            label: 'View all drafts',
            icon: 'pi pi-list',
            command: () => this.openDraftLibrary()
        });
        return items;
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
    saveDraft() {
        this.draftSaving.set(true);
        this.formDraftService.save({
            id: this.activeDraftId(),
            entityType: 'lead',
            title: this.buildDraftTitle(),
            subtitle: this.buildDraftSubtitle(),
            payloadJson: this.serializeDraftPayload()
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
    submitWithDuplicateGuard(payload, isEdit) {
        this.leadData.checkDuplicates({
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            phone: payload.phone,
            companyName: payload.companyName,
            excludeLeadId: isEdit ? this.editingId ?? undefined : undefined
        }).subscribe({
            next: (result) => {
                if (result.isBlocked) {
                    this.pendingSavePayload = payload;
                    this.pendingSaveIsEdit = isEdit;
                    this.duplicateCheckResult.set(result);
                    this.duplicateMatches.set(result.matches ?? []);
                    this.duplicateDialogVisible.set(true);
                    this.raiseToast('error', 'Exact duplicate detected. Open the existing lead instead of creating another.');
                    return;
                }
                if (result.hasWarnings) {
                    this.pendingSavePayload = payload;
                    this.pendingSaveIsEdit = isEdit;
                    this.duplicateCheckResult.set(result);
                    this.duplicateMatches.set(result.matches ?? []);
                    this.duplicateDialogVisible.set(true);
                    return;
                }
                this.performSave(payload, isEdit);
            },
            error: () => {
                // Duplicate-check should not block saves if the helper endpoint is temporarily unavailable.
                this.performSave(payload, isEdit);
            }
        });
    }
    performSave(payload, isEdit) {
        this.saving.set(true);
        const request$ = isEdit
            ? this.leadData.update(this.editingId, payload).pipe(map(() => null))
            : this.leadData.create(payload);
        request$.subscribe({
            next: (created) => {
                const activeDraftId = this.activeDraftId();
                this.saving.set(false);
                if (activeDraftId) {
                    this.formDraftService.complete(activeDraftId).subscribe({ next: () => { }, error: () => { } });
                    this.activeDraftId.set(null);
                    this.draftModeActive.set(false);
                }
                if (!isEdit && created) {
                    this.editingId = created.id;
                    if (!this.leaveAfterSave) {
                        this.router.navigate(['/app/leads', created.id, 'edit'], {
                            state: { lead: created, defaultTab: 'qualification' }
                        });
                    }
                }
                if (isEdit) {
                    // Stay on page and refresh data so user can perform follow-up actions (e.g., convert)
                    if (!this.leaveAfterSave) {
                        this.reloadLeadDetails(this.editingId);
                    }
                }
                this.statusApiError.set(null);
                // Close inline closure form on successful save
                if (this.closureFormActive()) {
                    this.closureFormActive.set(false);
                    this.closureFormStatus.set(null);
                }
                const message = isEdit ? 'Lead updated.' : 'Lead created. Complete qualification now or later.';
                this.raiseToast('success', message);
                this.updateQualificationFeedback();
                this.loadRecentDrafts();
                this.captureFormSnapshot();
                this.finalizeLeaveAfterSave(true);
            },
            error: (err) => {
                this.saving.set(false);
                const fallback = this.editingId ? 'Unable to update lead.' : 'Unable to create lead.';
                const parsed = this.extractApiError(err, fallback);
                this.statusApiError.set(this.mapLeadStatusErrorToHint(parsed.code, parsed.message));
                this.raiseToast('error', parsed.message);
                this.finalizeLeaveAfterSave(false);
            }
        });
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, tone === 'error' ? 5000 : 3000);
    }
    loadRecentDrafts() {
        this.formDraftService.list('lead', { limit: 5, page: 1, pageSize: 5 }).subscribe({
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
        this.formDraftService.list('lead', { page: 1, pageSize: 50 }).subscribe({
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
                    ...payload
                };
                this.activeDraftId.set(draft.id);
                this.draftModeActive.set(true);
                this.draftStatusMessage.set(`Draft loaded from ${this.formatDraftTimestamp(draft.updatedAtUtc)}.`);
                this.draftLibraryVisible.set(false);
                this.updateQualificationFeedback();
                this.updateFollowUpGuidance();
                this.captureFormSnapshot();
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
    serializeDraftPayload() {
        return JSON.stringify(this.form);
    }
    hasDraftFormChanges() {
        if (this.formSnapshot) {
            return this.createFormSnapshot() !== this.formSnapshot;
        }
        const payload = this.serializeDraftPayload();
        return payload !== JSON.stringify(this.createEmptyForm());
    }
    buildDraftTitle() {
        const fullName = `${this.form.firstName ?? ''} ${this.form.lastName ?? ''}`.trim();
        return fullName || 'Untitled lead draft';
    }
    buildDraftSubtitle() {
        return this.form.companyName?.trim() || null;
    }
    buildDraftMenuMarkup(draft) {
        const title = this.escapeDraftText(draft.title);
        const subtitle = this.escapeDraftText(draft.subtitle?.trim() || 'No company');
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
    extractApiError(error, fallback) {
        const httpError = error;
        const payload = httpError?.error;
        const code = payload?.code;
        if (typeof payload === 'string' && payload.trim().length > 0) {
            return { message: payload.trim(), code: null };
        }
        const errors = payload?.errors;
        if (errors && typeof errors === 'object') {
            const firstKey = Object.keys(errors)[0];
            const value = firstKey ? errors[firstKey] : null;
            if (Array.isArray(value) && value[0]) {
                return { message: value[0], code: code ?? null };
            }
            if (typeof value === 'string' && value.trim().length > 0) {
                return { message: value.trim(), code: code ?? null };
            }
        }
        const message = payload?.message;
        if (typeof message === 'string' && message.trim().length > 0) {
            return { message: message.trim(), code: code ?? null };
        }
        const title = payload?.title;
        if (typeof title === 'string' && title.trim().length > 0 && title !== 'One or more validation errors occurred.') {
            return { message: title.trim(), code: code ?? null };
        }
        return { message: fallback, code: code ?? null };
    }
    extractApiErrorMessage(error, fallback) {
        return this.extractApiError(error, fallback).message;
    }
    mapLeadStatusErrorToHint(code, fallbackMessage) {
        switch (code) {
            case 'LEAD_STATUS_REQUIRES_ACTIVITY':
                return 'Log a completed call, email, or meeting before setting the lead to Contacted.';
            case 'LEAD_STATUS_REQUIRES_DISCOVERY_MEETING':
                return 'Complete or schedule a discovery meeting before setting the lead to Qualified.';
            case 'LEAD_STATUS_REQUIRES_QUALIFICATION_FACTORS':
                return `Select at least ${this.minimumRequiredQualificationFactors()} qualification factors before setting the lead to Qualified.`;
            case 'LEAD_STATUS_REQUIRES_QUALIFICATION_NOTES':
                return 'Add qualification notes before setting the lead to Qualified.';
            case 'LEAD_STATUS_REQUIRES_EVIDENCE_COVERAGE':
                return `Add evidence until coverage reaches at least ${this.minimumEvidenceCoveragePercent()}% before setting the lead to Qualified.`;
            case 'LEAD_STATUS_REQUIRES_NURTURE_FOLLOWUP':
                return 'Add a nurture follow-up date before setting the lead to Nurture.';
            case 'LEAD_STATUS_REQUIRES_OUTCOME_REASON':
                return 'Add the required reason/details before moving to this lead outcome status.';
            case 'LEAD_STATUS_INVALID_TRANSITION':
                return fallbackMessage;
            default:
                return null;
        }
    }
    prefillFromLead(lead) {
        const [firstName, ...rest] = lead.name.split(' ');
        this.leadNumber.set(lead.leadNumber ?? null);
        this.form = {
            firstName,
            lastName: rest.join(' '),
            companyName: lead.company,
            email: lead.email,
            phone: lead.phone,
            phoneTypeId: lead.phoneTypeId ?? undefined,
            status: lead.status,
            score: lead.score ?? 0,
            autoScore: true,
            source: lead.source ?? '',
            jobTitle: lead.jobTitle ?? '',
            leadSummary: lead.leadSummary ?? '',
            ownerId: lead.ownerId,
            assignmentStrategy: 'Manual',
            territory: lead.territory ?? '',
            disqualifiedReason: lead.disqualifiedReason ?? '',
            lossReason: lead.lossReason ?? '',
            lossCompetitor: lead.lossCompetitor ?? '',
            lossNotes: lead.lossNotes ?? '',
            nurtureFollowUpAtUtc: this.toDateValue(lead.nurtureFollowUpAtUtc),
            qualifiedNotes: lead.qualifiedNotes ?? '',
            buyerType: lead.buyerType ?? '',
            motivationUrgency: lead.motivationUrgency ?? '',
            financingReadiness: lead.financingReadiness ?? '',
            preApprovalStatus: lead.preApprovalStatus ?? '',
            preferredArea: lead.preferredArea ?? '',
            preferredPropertyType: lead.preferredPropertyType ?? '',
            budgetBand: lead.budgetBand ?? '',
            budgetAvailability: lead.budgetAvailability || 'Unknown / not yet discussed',
            budgetEvidence: lead.budgetEvidence || 'No evidence yet',
            readinessToSpend: lead.readinessToSpend || 'Unknown / unclear',
            readinessEvidence: lead.readinessEvidence || 'No evidence yet',
            buyingTimeline: lead.buyingTimeline || 'Unknown / not discussed',
            timelineEvidence: lead.timelineEvidence || 'No evidence yet',
            problemSeverity: lead.problemSeverity || 'Unknown / not validated',
            problemEvidence: lead.problemEvidence || 'No evidence yet',
            economicBuyer: lead.economicBuyer || 'Unknown / not identified',
            economicBuyerEvidence: lead.economicBuyerEvidence || 'No evidence yet',
            icpFit: lead.icpFit || 'Unknown / not assessed',
            icpFitEvidence: lead.icpFitEvidence || 'No evidence yet',
            customQualificationFactors: (lead.customQualificationFactors ?? []).map((factor) => ({
                key: factor.key,
                value: factor.value ?? '',
                evidence: factor.evidence ?? 'No evidence yet'
            }))
        };
        // Always derive score from current lead inputs to avoid stale persisted values.
        this.form.score = this.computeAutoScore();
        this.ensureEvidenceOptionsContainSelections();
        this.linkedAccountId.set(lead.accountId ?? null);
        this.linkedContactId.set(lead.contactId ?? null);
        this.linkedOpportunityId.set(lead.convertedOpportunityId ?? null);
        this.firstTouchDueAtUtc.set(lead.firstTouchDueAtUtc ?? null);
        this.firstTouchedAtUtc.set(lead.firstTouchedAtUtc ?? null);
        this.routingReason.set(lead.routingReason ?? null);
        this.qualificationConfidenceLabel.set(lead.qualificationConfidenceLabel ?? null);
        this.qualificationConfidence.set(lead.qualificationConfidence ?? null);
        this.truthCoverage.set(lead.truthCoverage ?? null);
        this.assumptionsOutstanding.set(lead.assumptionsOutstanding ?? null);
        this.conversationScore.set(lead.conversationScore ?? null);
        this.conversationScoreLabel.set(lead.conversationScoreLabel ?? null);
        this.conversationScoreReasons.set(lead.conversationScoreReasons ?? []);
        this.conversationScoreUpdatedAtUtc.set(lead.conversationScoreUpdatedAtUtc ?? null);
        this.conversationSignalAvailable.set(lead.conversationSignalAvailable === true);
        this.conversationAiDimensionScore.set(lead.conversationAiDimensionScore ?? null);
        this.conversationAiToneLabel.set(lead.conversationAiToneLabel ?? null);
        this.conversationAiSentiment.set(lead.conversationAiSentiment ?? null);
        this.conversationAiBuyingReadiness.set(lead.conversationAiBuyingReadiness ?? null);
        this.conversationAiSemanticIntent.set(lead.conversationAiSemanticIntent ?? null);
        this.conversationAiToneJustification.set(lead.conversationAiToneJustification ?? null);
        this.conversionReadiness.set(lead.conversionReadiness ?? null);
        this.lifecycleScore.set(lead.lifecycleScore ?? null);
        this.serverWeakestSignal.set(lead.weakestSignal ?? null);
        this.serverWeakestState.set(lead.weakestState ?? null);
        this.serverNextEvidenceSuggestions.set(lead.nextEvidenceSuggestions ?? []);
        const breakdown = lead.scoreBreakdown && lead.scoreBreakdown.length ? lead.scoreBreakdown : this.buildScoreBreakdown();
        this.scoreBreakdown.set(breakdown);
        this.riskFlags.set(lead.riskFlags ?? []);
        this.syncPhoneInputsFromE164(lead.phone ?? null);
        this.normalizeEvidence();
        this.updateQualificationFeedback(true);
        this.updateEpistemicSummary(true);
        this.updateFollowUpGuidance();
        // Capture form snapshot after fully populating form for uncommitted changes detection
        this.captureFormSnapshot();
    }
    loadStatusHistory(leadId) {
        this.leadData.getStatusHistory(leadId).subscribe({
            next: (history) => this.statusHistory.set(history),
            error: () => this.statusHistory.set([])
        });
        this.leadData.getAudit(leadId).subscribe({
            next: (items) => {
                const scoreEvents = (items ?? []).filter((item) => {
                    const field = (item.field ?? '').toLowerCase();
                    const action = (item.action ?? '').toLowerCase();
                    return field.includes('score') || field.includes('qualification') || field.includes('conversation') || action.includes('score');
                });
                this.scoreAuditEvents.set(scoreEvents);
            },
            error: () => this.scoreAuditEvents.set([])
        });
    }
    loadRecentLeadActivities(leadId) {
        this.recentLeadActivitiesLoading.set(true);
        this.transferredActivityCount.set(0);
        this.transferredLastActivity.set(null);
        this.transferredActivityEntityType.set(null);
        this.activityData
            .search({
            page: 1,
            pageSize: 6,
            relatedEntityType: 'Lead',
            relatedEntityId: leadId
        })
            .subscribe({
            next: (res) => {
                const items = (res.items ?? []).slice(0, 6);
                this.recentLeadActivities.set(items);
                if (items.length > 0) {
                    this.recentLeadActivitiesLoading.set(false);
                    return;
                }
                if (this.form.status === 'Converted' && (this.linkedOpportunityId() || this.linkedAccountId())) {
                    this.loadTransferredActivitiesSummary();
                    return;
                }
                this.recentLeadActivitiesLoading.set(false);
            },
            error: () => {
                this.recentLeadActivities.set([]);
                this.recentLeadActivitiesLoading.set(false);
            }
        });
    }
    loadLeadEmails(leadId) {
        this.leadEmailsLoading.set(true);
        this.leadData.getLeadEmails(leadId).subscribe({
            next: (res) => {
                this.leadEmails.set(res.items ?? []);
                this.leadEmailsTotalCount.set(res.total ?? 0);
                this.leadEmailsLoading.set(false);
            },
            error: () => {
                this.leadEmails.set([]);
                this.leadEmailsLoading.set(false);
            }
        });
    }
    emailEngagementStats() {
        const emails = this.leadEmails();
        if (!emails.length)
            return null;
        const sent = emails.filter(e => e.status !== 'Failed');
        const opened = emails.filter(e => e.status === 'Opened' || e.status === 'Clicked');
        const sorted = [...emails].sort((a, b) => new Date(b.sentAtUtc || b.createdAtUtc).getTime() - new Date(a.sentAtUtc || a.createdAtUtc).getTime());
        return {
            total: this.leadEmailsTotalCount(),
            displayed: emails.length,
            openRate: sent.length ? Math.round((opened.length / sent.length) * 100) : 0,
            lastEmailDate: sorted[0]?.sentAtUtc || sorted[0]?.createdAtUtc || null
        };
    }
    toggleEmailsExpanded() {
        this.leadEmailsExpanded.update(v => !v);
    }
    toggleLeadEmailDetails(emailId) {
        this.expandedLeadEmailIds.update((ids) => ids.includes(emailId) ? ids.filter((id) => id !== emailId) : [...ids, emailId]);
    }
    isLeadEmailExpanded(emailId) {
        return this.expandedLeadEmailIds().includes(emailId);
    }
    leadEmailsToDisplay() {
        const emails = this.leadEmails();
        if (this.leadEmailsExpanded()) {
            return emails;
        }
        return emails.slice(0, 5);
    }
    trackEmailById(_index, email) {
        return email.id;
    }
    emailDirection(email) {
        const currentEmail = readUserEmail();
        if (!currentEmail)
            return 'outbound';
        return email.toEmail?.toLowerCase() === currentEmail.toLowerCase() ? 'inbound' : 'outbound';
    }
    onGenerateConversationSummary() {
        if (!this.editingId || this.conversationAiSummaryLoading())
            return;
        this.conversationAiSummaryLoading.set(true);
        this.leadData.generateConversationSummary(this.editingId).subscribe({
            next: (result) => {
                this.conversationAiSummary.set(result);
                this.conversationAiSummaryLoading.set(false);
                this.raiseToast('success', 'AI conversation summary generated.');
            },
            error: (err) => {
                this.conversationAiSummaryLoading.set(false);
                this.raiseToast('error', this.extractApiErrorMessage(err, 'Unable to generate conversation summary.'));
            }
        });
    }
    sentimentIcon(sentiment) {
        switch (sentiment?.toLowerCase()) {
            case 'positive': return 'pi-thumbs-up';
            case 'cautious': return 'pi-exclamation-triangle';
            case 'negative': return 'pi-thumbs-down';
            default: return 'pi-minus';
        }
    }
    sentimentClass(sentiment) {
        switch (sentiment?.toLowerCase()) {
            case 'positive': return 'sentiment--positive';
            case 'cautious': return 'sentiment--cautious';
            case 'negative': return 'sentiment--negative';
            default: return 'sentiment--neutral';
        }
    }
    loadTransferredActivitiesSummary() {
        const opportunityId = this.linkedOpportunityId();
        const accountId = this.linkedAccountId();
        const targetType = opportunityId ? 'Opportunity' : (accountId ? 'Account' : null);
        const targetId = opportunityId ?? accountId;
        if (!targetType || !targetId) {
            this.recentLeadActivitiesLoading.set(false);
            return;
        }
        this.activityData.search({
            page: 1,
            pageSize: 10,
            relatedEntityType: targetType,
            relatedEntityId: targetId
        }).subscribe({
            next: (res) => {
                const items = res.items ?? [];
                this.transferredActivityCount.set(res.total ?? items.length);
                this.transferredLastActivity.set(items[0] ?? null);
                this.transferredActivityEntityType.set(targetType);
                this.recentLeadActivitiesLoading.set(false);
            },
            error: () => {
                this.transferredActivityCount.set(0);
                this.transferredLastActivity.set(null);
                this.transferredActivityEntityType.set(null);
                this.recentLeadActivitiesLoading.set(false);
            }
        });
    }
    reloadLeadDetails(leadId) {
        this.leadData.get(leadId).subscribe({
            next: (lead) => {
                this.prefillFromLead(lead);
                this.loadStatusHistory(leadId);
                this.loadRecentLeadActivities(leadId);
                this.loadSupportingDocuments(leadId);
            }
        });
    }
    isFirstTouchPending() {
        return !!this.firstTouchDueAtUtc() && !this.firstTouchedAtUtc();
    }
    nextLeadActionDueDate() {
        if (this.form.status === 'Nurture' && this.form.nurtureFollowUpAtUtc instanceof Date) {
            return this.form.nurtureFollowUpAtUtc;
        }
        const firstTouchDue = this.firstTouchDueAtUtc();
        if (firstTouchDue && !this.firstTouchedAtUtc()) {
            return new Date(firstTouchDue);
        }
        return null;
    }
    nextLeadActionDueLabel() {
        if (this.form.status === 'Nurture' && this.form.nurtureFollowUpAtUtc) {
            return 'Nurture follow-up date';
        }
        if (this.isFirstTouchPending()) {
            return 'First touch due';
        }
        return 'No scheduled lead follow-up';
    }
    nextLeadActionChannel() {
        const readiness = this.form.readinessToSpend?.toLowerCase() ?? '';
        const timeline = this.form.buyingTimeline?.toLowerCase() ?? '';
        if (this.form.status === 'Nurture' || readiness === 'not planning to spend') {
            return 'Email';
        }
        if (this.isFirstTouchPending() || timeline.includes('confirmed')) {
            return 'Call';
        }
        return 'Use the related activity type';
    }
    nextLeadActionButtonLabel() {
        if (this.form.status === 'Nurture' && !this.hasRecentReengagementActivity()) {
            return 'Log re-engagement';
        }
        if (this.form.status === 'New' && !this.hasAnyCompletedLeadActivityEvidence()) {
            return 'Log first activity';
        }
        return 'Log activity';
    }
    openQuickActivity(type) {
        if (!this.editingId) {
            return;
        }
        const fullName = this.leadDisplayName();
        const subject = type === 'Call'
            ? `Call: ${fullName}`
            : type === 'Email'
                ? `Email follow-up: ${fullName}`
                : type === 'Meeting'
                    ? `Meeting: ${fullName}`
                    : `Follow-up task: ${fullName}`;
        this.router.navigate(['/app/activities/new'], {
            queryParams: {
                relatedType: 'Lead',
                relatedId: this.editingId,
                subject,
                type,
                leadFirstTouchDueAtUtc: this.firstTouchDueAtUtc() ?? undefined
            }
        });
    }
    lastLeadActivitySummary() {
        const latest = this.recentLeadActivities()[0];
        if (!latest) {
            if (this.form.status === 'Nurture' && !this.hasRecentReengagementActivity()) {
                return 'No re-engagement activity has been recorded yet.';
            }
            return 'No activity has been recorded yet.';
        }
        const owner = latest.ownerName?.trim();
        const dateLabel = this.activityTimelineDateLabel(latest);
        const at = dateLabel ? new Date(dateLabel).toLocaleString() : null;
        const parts = [latest.type];
        if (owner)
            parts.push(owner);
        if (at)
            parts.push(at);
        return parts.join(' • ');
    }
    activityTypeIcon(type) {
        switch (type) {
            case 'Meeting':
                return 'pi pi-users';
            case 'Call':
                return 'pi pi-phone';
            case 'Email':
                return 'pi pi-envelope';
            case 'Task':
                return 'pi pi-check-square';
            case 'Note':
            default:
                return 'pi pi-file-edit';
        }
    }
    activityTimelineDateLabel(item) {
        return item.completedDateUtc ?? item.dueDateUtc ?? item.createdAtUtc;
    }
    activityEffectiveDate(item) {
        const raw = item.completedDateUtc ?? item.createdAtUtc ?? item.dueDateUtc;
        if (!raw) {
            return null;
        }
        const parsed = new Date(raw);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
    isCompletedActivityEvidence(item) {
        return item.status === 'Completed' || !!item.completedDateUtc;
    }
    latestStatusChangedAt(status) {
        const matching = this.statusHistory()
            .filter((entry) => entry.status === status && !!entry.changedAtUtc)
            .map((entry) => new Date(entry.changedAtUtc.endsWith('Z') ? entry.changedAtUtc : `${entry.changedAtUtc}Z`))
            .filter((value) => !Number.isNaN(value.getTime()))
            .sort((a, b) => b.getTime() - a.getTime());
        return matching[0] ?? null;
    }
    hasAnyCompletedLeadActivityEvidence() {
        return this.recentLeadActivities().some((item) => this.isCompletedActivityEvidence(item));
    }
    hasCompletedActivitySince(anchor) {
        return this.recentLeadActivities().some((item) => {
            if (!this.isCompletedActivityEvidence(item)) {
                return false;
            }
            const effective = this.activityEffectiveDate(item);
            if (!effective) {
                return false;
            }
            return !anchor || effective.getTime() >= anchor.getTime();
        });
    }
    hasRecentReengagementActivity() {
        const nurtureAnchor = this.latestStatusChangedAt('Nurture');
        return this.hasCompletedActivitySince(nurtureAnchor);
    }
    hasRecentContactProgressActivity() {
        const contactedAnchor = this.latestStatusChangedAt('Contacted');
        return this.hasCompletedActivitySince(contactedAnchor);
    }
    openActivityRecord(activityId) {
        void this.router.navigate(['/app/activities', activityId, 'edit']);
    }
    onStatusSelectionChange(nextStatus) {
        if (nextStatus === this.form.status) {
            return;
        }
        const blockedReasons = this.transitionBlockedReasons(nextStatus);
        if (blockedReasons.length) {
            this.raiseToast('error', blockedReasons[0]);
            if (nextStatus === 'Contacted') {
                this.setActiveTab('activity');
            }
            else if (nextStatus === 'Qualified') {
                this.setActiveTab(this.form.status === 'Nurture' && !this.hasRecentReengagementActivity() ? 'activity' : 'qualification');
            }
            return;
        }
        if (nextStatus === 'Nurture' && !this.form.nurtureFollowUpAtUtc) {
            this.form.nurtureFollowUpAtUtc = this.toDateValue(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString());
        }
        this.form.status = nextStatus;
    }
    transitionBlockedReasons(target) {
        const current = this.form.status;
        const hasFirstTouch = !!this.firstTouchedAtUtc();
        const qualFactors = this.countQualificationFactors();
        const meetsEvidence = !this.requiresEvidenceBeforeQualified() || this.truthCoveragePercent() >= this.minimumEvidenceCoveragePercent();
        if (target === current) {
            return [];
        }
        if (target === 'New') {
            return [];
        }
        if (target === 'Nurture') {
            if (current === 'Contacted' && !this.hasAnyCompletedLeadActivityEvidence()) {
                return ['Log a completed activity before moving a contacted lead into nurture.'];
            }
            return [];
        }
        if (target === 'Contacted') {
            if (current === 'Nurture' && !this.hasRecentReengagementActivity()) {
                return ['Log a recent re-engagement activity before resuming this lead to Contacted.'];
            }
            if (!hasFirstTouch && !this.hasAnyCompletedLeadActivityEvidence()) {
                return ['Log a completed activity before moving this lead to Contacted.'];
            }
            return [];
        }
        if (target === 'Qualified') {
            const reasons = [];
            if (current === 'Nurture') {
                if (!this.hasRecentReengagementActivity()) {
                    reasons.push('Log a recent re-engagement activity before moving this lead to Qualified.');
                }
            }
            else if (current === 'Contacted') {
                if (!this.hasRecentContactProgressActivity()) {
                    reasons.push('Log a recent completed activity before moving this lead to Qualified.');
                }
            }
            else if (!hasFirstTouch && !this.hasAnyCompletedLeadActivityEvidence()) {
                reasons.push('Log a completed activity before moving this lead to Qualified.');
            }
            const minimum = this.minimumRequiredQualificationFactors();
            if (qualFactors < minimum) {
                reasons.push(`Complete ${minimum - qualFactors} more qualification factor${minimum - qualFactors > 1 ? 's' : ''}.`);
            }
            if (!meetsEvidence) {
                reasons.push('Add evidence to meet the coverage threshold.');
            }
            return reasons;
        }
        return [];
    }
    isStatusSelectionDisabled(status) {
        const current = this.form.status;
        const isConverted = current === 'Converted';
        if (status === current) {
            return false;
        }
        if (status === 'Converted') {
            return !isConverted;
        }
        if (status === 'New' && current === 'Contacted') {
            return true;
        }
        return this.transitionBlockedReasons(status).length > 0;
    }
    hasTransferredActivitySummary() {
        return this.transferredActivityCount() > 0;
    }
    transferredActivitySummaryLabel() {
        const count = this.transferredActivityCount();
        const entityType = this.transferredActivityEntityType();
        if (!count || !entityType) {
            return 'No transferred activities found.';
        }
        const target = entityType === 'Opportunity' ? 'opportunity' : 'account';
        return `${count} ${count === 1 ? 'activity was' : 'activities were'} transferred to the converted ${target}.`;
    }
    openConvertedActivityTimeline() {
        const opportunityId = this.linkedOpportunityId();
        if (opportunityId) {
            void this.router.navigate(['/app/activities'], {
                queryParams: { relatedEntityType: 'Opportunity', relatedEntityId: opportunityId }
            });
            return;
        }
        const accountId = this.linkedAccountId();
        if (accountId) {
            void this.router.navigate(['/app/activities'], {
                queryParams: { relatedEntityType: 'Account', relatedEntityId: accountId }
            });
        }
    }
    defaultCadenceDueLocal() {
        const due = new Date();
        due.setDate(due.getDate() + 2);
        due.setMinutes(due.getMinutes() - due.getTimezoneOffset());
        return due;
    }
    localToUtcIso(localValue) {
        if (!localValue)
            return null;
        const parsed = localValue instanceof Date ? localValue : new Date(localValue);
        return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
    }
    createEmptyForm() {
        return {
            firstName: '',
            lastName: '',
            companyName: '',
            leadSummary: '',
            email: '',
            phone: '',
            phoneTypeId: undefined,
            jobTitle: '',
            source: '',
            territory: '',
            status: 'New',
            score: 0,
            autoScore: true,
            assignmentStrategy: 'Manual',
            ownerId: readUserId() ?? undefined,
            disqualifiedReason: '',
            lossReason: '',
            lossCompetitor: '',
            lossNotes: '',
            nurtureFollowUpAtUtc: null,
            qualifiedNotes: '',
            buyerType: '',
            motivationUrgency: '',
            financingReadiness: '',
            preApprovalStatus: '',
            preferredArea: '',
            preferredPropertyType: '',
            budgetBand: '',
            budgetAvailability: 'Unknown / not yet discussed',
            budgetEvidence: 'No evidence yet',
            readinessToSpend: 'Unknown / unclear',
            readinessEvidence: 'No evidence yet',
            buyingTimeline: 'Unknown / not discussed',
            timelineEvidence: 'No evidence yet',
            problemSeverity: 'Unknown / not validated',
            problemEvidence: 'No evidence yet',
            economicBuyer: 'Unknown / not identified',
            economicBuyerEvidence: 'No evidence yet',
            icpFit: 'Unknown / not assessed',
            icpFitEvidence: 'No evidence yet',
            customQualificationFactors: []
        };
    }
    loadOwners() {
        this.userAdminData.lookupActive(undefined, 200).subscribe({
            next: (items) => {
                const options = this.ensureOwnerOptions(this.mapOwnerOptions(items));
                this.ownerOptions.set(options);
                this.applyOwnerDefault(options);
            },
            error: () => {
                const options = this.ensureOwnerOptions([]);
                this.ownerOptions.set(options);
                this.applyOwnerDefault(options);
            }
        });
    }
    mapOwnerOptions(users) {
        return users.map((user) => ({
            label: user.fullName,
            value: user.id,
            email: user.email?.trim().toLowerCase()
        }));
    }
    loadEvidenceSources() {
        this.leadData.getEvidenceSources().subscribe({
            next: (items) => {
                const normalized = (items ?? [])
                    .map((item) => (item ?? '').trim())
                    .filter((item, index, all) => item.length > 0 && all.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index);
                const catalog = normalized.length ? normalized : LeadFormPage.defaultEvidenceSources();
                if (!catalog.some((item) => item.toLowerCase() === 'no evidence yet')) {
                    catalog.unshift('No evidence yet');
                }
                this.evidenceOptions = catalog.map((source) => LeadFormPage.toEvidenceOption(source));
                this.ensureEvidenceOptionsContainSelections();
            },
            error: () => {
                this.evidenceOptions = LeadFormPage.defaultEvidenceSources().map((source) => LeadFormPage.toEvidenceOption(source));
                this.ensureEvidenceOptionsContainSelections();
            }
        });
    }
    loadPhoneTypes() {
        this.referenceData.getPhoneTypes().subscribe({
            next: (items) => {
                this.phoneTypeOptions = items
                    .filter((item) => item.isActive)
                    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
                    .map((item) => ({ label: item.name, value: item.id, isDefault: item.isDefault }));
            },
            error: () => {
                this.phoneTypeOptions = [];
            }
        });
    }
    loadLeadDispositionPolicy() {
        this.workspaceSettings.getSettings().subscribe({
            next: (settings) => {
                const policy = LeadFormPage.normalizeLeadDispositionPolicy(settings.leadDispositionPolicy);
                this.disqualificationReasonOptions.set(policy.disqualificationReasons.map((value) => ({ label: value, value })));
                this.lossReasonOptions.set(policy.lossReasons.map((value) => ({ label: value, value })));
                this.applyVerticalPresetConfiguration(settings.verticalPresetConfiguration ?? null);
                this.ensureDispositionSelectionsRemainVisible();
            },
            error: () => {
                this.disqualificationReasonOptions.set([]);
                this.lossReasonOptions.set([]);
                this.applyVerticalPresetConfiguration(null);
                this.ensureDispositionSelectionsRemainVisible();
            }
        });
    }
    ensureDispositionSelectionsRemainVisible() {
        const disqualification = (this.form.disqualifiedReason ?? '').trim();
        if (disqualification && !this.disqualificationReasonOptions().some((item) => item.value.toLowerCase() === disqualification.toLowerCase())) {
            this.disqualificationReasonOptions.update((items) => [...items, { label: disqualification, value: disqualification }]);
        }
        const loss = (this.form.lossReason ?? '').trim();
        if (loss && !this.lossReasonOptions().some((item) => item.value.toLowerCase() === loss.toLowerCase())) {
            this.lossReasonOptions.update((items) => [...items, { label: loss, value: loss }]);
        }
    }
    loadLeadDataWeights() {
        this.workspaceSettings.getSettings().subscribe({
            next: (settings) => {
                this.qualificationPolicyConfig.set(settings.qualificationPolicy ?? null);
                this.applyVerticalPresetConfiguration(settings.verticalPresetConfiguration ?? null);
                this.leadDataWeights = settings.qualificationPolicy?.leadDataWeights ?? [];
                if (this.form.autoScore) {
                    this.form.score = this.computeAutoScore();
                }
            },
            error: () => {
                this.qualificationPolicyConfig.set(null);
                this.leadDataWeights = [];
            }
        });
    }
    loadSupportingDocumentPolicy() {
        this.workspaceSettings.getSettings().subscribe({
            next: (settings) => {
                this.applyVerticalPresetConfiguration(settings.verticalPresetConfiguration ?? null);
                this.supportingDocumentPolicy.set(settings.supportingDocumentPolicy ?? this.defaultSupportingDocumentPolicy());
            },
            error: () => {
                this.applyVerticalPresetConfiguration(null);
                this.supportingDocumentPolicy.set(this.defaultSupportingDocumentPolicy());
            }
        });
    }
    isBrokeragePreset() {
        const presetId = this.verticalPresetConfiguration()?.presetId
            ?? this.tenantIndustryPreset()
            ?? 'CoreCRM';
        return this.tenantPropertiesFeatureEnabled()
            || LeadFormPage.normalizePresetId(presetId) === LeadFormPage.normalizePresetId('RealEstateBrokerage');
    }
    qualificationSectionTitle() {
        return this.isBrokeragePreset() ? 'Buyer Readiness Summary' : 'Qualification Summary';
    }
    qualificationGuidanceText() {
        return this.verticalPresetConfiguration()?.vocabulary?.qualificationGuidance
            ?? this.qualificationStatusHint();
    }
    applyVerticalPresetConfiguration(config) {
        this.verticalPresetConfiguration.set(config);
        const catalog = config?.brokerageLeadProfileCatalog;
        this.buyerTypeOptions.set(this.mapCatalogOptions(catalog?.buyerTypes));
        this.motivationUrgencyOptions.set(this.mapCatalogOptions(catalog?.motivationUrgencies));
        this.financingReadinessOptions.set(this.mapCatalogOptions(catalog?.financingReadinessOptions));
        this.preApprovalStatusOptions.set(this.mapCatalogOptions(catalog?.preApprovalStatuses));
        this.preferredAreaOptions.set(this.mapCatalogOptions(catalog?.preferredAreas));
        this.propertyTypeOptions.set(this.mapCatalogOptions(catalog?.propertyTypes));
        this.budgetBandOptions.set(this.mapCatalogOptions(catalog?.budgetBands));
        if (LeadFormPage.normalizePresetId(config?.presetId) === LeadFormPage.normalizePresetId('RealEstateBrokerage')) {
            this.overviewAccordionOpenPanels.update((items) => items.includes('buyer-profile') ? items : [...items, 'buyer-profile']);
        }
        this.ensureBrokerageSelectionsRemainVisible();
    }
    loadTenantContext() {
        this.tenantContextService.getTenantContext()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (context) => {
                this.tenantIndustryPreset.set(context.industryPreset ?? context.verticalPresetConfiguration?.presetId ?? null);
                this.tenantPropertiesFeatureEnabled.set(!!context.featureFlags?.['properties']);
                if (LeadFormPage.normalizePresetId(context.industryPreset ?? context.verticalPresetConfiguration?.presetId) === LeadFormPage.normalizePresetId('RealEstateBrokerage')) {
                    this.overviewAccordionOpenPanels.update((items) => items.includes('buyer-profile') ? items : [...items, 'buyer-profile']);
                }
            },
            error: () => {
                this.tenantIndustryPreset.set(null);
                this.tenantPropertiesFeatureEnabled.set(false);
            }
        });
    }
    mapCatalogOptions(values) {
        return (values ?? [])
            .map((value) => (value ?? '').trim())
            .filter((value, index, all) => value.length > 0 && all.findIndex((candidate) => candidate.toLowerCase() === value.toLowerCase()) === index)
            .map((value) => ({ label: value, value }));
    }
    static normalizePresetId(value) {
        return (value ?? '')
            .trim()
            .toLowerCase()
            .replace(/[\s_-]+/g, '');
    }
    ensureBrokerageSelectionsRemainVisible() {
        this.ensureOptionIncludesSelection(this.buyerTypeOptions, this.form.buyerType);
        this.ensureOptionIncludesSelection(this.motivationUrgencyOptions, this.form.motivationUrgency);
        this.ensureOptionIncludesSelection(this.financingReadinessOptions, this.form.financingReadiness);
        this.ensureOptionIncludesSelection(this.preApprovalStatusOptions, this.form.preApprovalStatus);
        this.ensureOptionIncludesSelection(this.preferredAreaOptions, this.form.preferredArea);
        this.ensureOptionIncludesSelection(this.propertyTypeOptions, this.form.preferredPropertyType);
        this.ensureOptionIncludesSelection(this.budgetBandOptions, this.form.budgetBand);
    }
    ensureOptionIncludesSelection(signalOptions, selectedValue) {
        const value = (selectedValue ?? '').trim();
        if (!value) {
            return;
        }
        const exists = signalOptions().some((item) => item.value.toLowerCase() === value.toLowerCase());
        if (!exists) {
            signalOptions.update((items) => [...items, { label: value, value }]);
        }
    }
    loadSupportingDocuments(leadId) {
        this.attachmentsLoading.set(true);
        this.attachmentData.list('Lead', leadId).subscribe({
            next: (items) => {
                this.attachments.set(items);
                this.attachmentsLoading.set(false);
            },
            error: (err) => {
                this.attachments.set([]);
                this.attachmentsLoading.set(false);
                const httpError = err;
                if (httpError?.status === 404 || httpError?.status === 400) {
                    return;
                }
                this.raiseToast('error', this.extractApiErrorMessage(err, 'Unable to load supporting documents.'));
            }
        });
    }
    onAttachmentUpload(event) {
        if (!this.editingId || !event.files?.length || this.attachmentUploading()) {
            return;
        }
        if (this.isSupportingDocumentLimitReached()) {
            this.raiseToast('error', `Supporting document limit reached (${this.supportingDocumentMaxCount()} per record).`);
            return;
        }
        const file = event.files[0];
        const maxSizeBytes = this.supportingDocumentMaxFileSizeMb() * 1024 * 1024;
        if (file.size > maxSizeBytes) {
            this.attachmentUploadError.set(`File exceeds ${this.supportingDocumentMaxFileSizeMb()} MB limit.`);
            this.raiseToast('error', `File exceeds ${this.supportingDocumentMaxFileSizeMb()} MB limit.`);
            return;
        }
        const allowedExts = this.supportingDocumentPolicy()?.allowedExtensions ?? this.defaultSupportingDocumentPolicy().allowedExtensions;
        const fileExt = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');
        if (!allowedExts.includes(fileExt)) {
            const message = `File type "${fileExt}" is not allowed. Accepted: ${allowedExts.join(', ')}`;
            this.attachmentUploadError.set(message);
            this.raiseToast('error', message);
            return;
        }
        this.attachmentUploadError.set(null);
        this.attachmentUploading.set(true);
        this.attachmentData.upload(file, 'Lead', this.editingId).subscribe({
            next: (attachment) => {
                this.attachmentUploading.set(false);
                this.attachments.set([attachment, ...this.attachments()]);
                this.raiseToast('success', 'Supporting document uploaded.');
            },
            error: (err) => {
                this.attachmentUploading.set(false);
                const message = this.extractApiErrorMessage(err, 'Unable to upload supporting document.');
                this.attachmentUploadError.set(message);
                this.raiseToast('error', message);
            }
        });
    }
    downloadAttachment(item) {
        window.open(this.attachmentData.downloadUrl(item.id), '_blank');
    }
    deleteAttachment(item) {
        if (!item?.id) {
            return;
        }
        const confirmed = window.confirm(`Delete supporting document \"${item.fileName}\"?`);
        if (!confirmed) {
            return;
        }
        if (this.attachmentDeletingIds().includes(item.id)) {
            return;
        }
        this.attachmentDeletingIds.set([...this.attachmentDeletingIds(), item.id]);
        this.attachmentData.delete(item.id).subscribe({
            next: () => {
                this.attachments.set(this.attachments().filter((entry) => entry.id !== item.id));
                this.attachmentDeletingIds.set(this.attachmentDeletingIds().filter((id) => id !== item.id));
                this.raiseToast('success', 'Supporting document deleted.');
            },
            error: (err) => {
                this.attachmentDeletingIds.set(this.attachmentDeletingIds().filter((id) => id !== item.id));
                this.raiseToast('error', this.extractApiErrorMessage(err, 'Unable to delete supporting document.'));
            }
        });
    }
    attachmentDeleting(itemId) {
        return this.attachmentDeletingIds().includes(itemId);
    }
    supportingDocumentMaxCount() {
        return this.supportingDocumentPolicy()?.maxDocumentsPerRecord ?? 10;
    }
    supportingDocumentMaxFileSizeMb() {
        return this.supportingDocumentPolicy()?.maxFileSizeMb ?? 10;
    }
    supportingDocumentAllowedExtensions() {
        return (this.supportingDocumentPolicy()?.allowedExtensions ?? this.defaultSupportingDocumentPolicy().allowedExtensions).join(', ');
    }
    supportingDocumentRemainingCount() {
        return Math.max(0, this.supportingDocumentMaxCount() - this.attachments().length);
    }
    isSupportingDocumentLimitReached() {
        return this.attachments().length >= this.supportingDocumentMaxCount();
    }
    supportingDocumentUsageLabel() {
        return `Used ${this.attachments().length} / ${this.supportingDocumentMaxCount()}`;
    }
    attachmentSizeLabel(size) {
        const normalized = typeof size === 'number' ? size : 0;
        if (normalized <= 0) {
            return '0 B';
        }
        const units = ['B', 'KB', 'MB', 'GB'];
        const exponent = Math.min(Math.floor(Math.log(normalized) / Math.log(1024)), units.length - 1);
        const value = normalized / (1024 ** exponent);
        const digits = exponent === 0 ? 0 : value >= 10 ? 0 : 1;
        return `${value.toFixed(digits)} ${units[exponent]}`;
    }
    defaultSupportingDocumentPolicy() {
        return {
            maxDocumentsPerRecord: 10,
            maxFileSizeMb: 10,
            allowedExtensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.png', '.jpg', '.jpeg', '.webp']
        };
    }
    restoreAccordionState() {
        const stored = this.readAccordionStateStorage();
        if (!stored) {
            return;
        }
        this.overviewAccordionOpenPanels.set(this.normalizeAccordionPanelState(stored.overview, ['lead-basics', 'contact-details', 'score']));
        const qualificationFallback = [
            'qualification-factors',
            'qualification-scoring',
            'qualification-context',
            'qualification-disposition'
        ];
        const qualificationStored = Array.isArray(stored.qualification) ? stored.qualification : [];
        const hasLegacyQualificationPanel = qualificationStored.some((value) => value === 'qualification-main');
        this.qualificationAccordionOpenPanels.set(hasLegacyQualificationPanel
            ? qualificationFallback
            : this.normalizeAccordionPanelState(stored.qualification, qualificationFallback));
        this.activityAccordionOpenPanels.set(this.normalizeAccordionPanelState(stored.activity, ['activity-main']));
        this.documentsAccordionOpenPanels.set(this.normalizeAccordionPanelState(stored.documents, ['documents-main']));
        this.historyAccordionOpenPanels.set(this.normalizeAccordionPanelState(stored.history, ['history-main']));
    }
    persistAccordionState() {
        if (typeof localStorage === 'undefined') {
            return;
        }
        const state = {
            overview: this.overviewAccordionOpenPanels(),
            qualification: this.qualificationAccordionOpenPanels(),
            activity: this.activityAccordionOpenPanels(),
            documents: this.documentsAccordionOpenPanels(),
            history: this.historyAccordionOpenPanels()
        };
        try {
            localStorage.setItem(LeadFormPage.ACCORDION_STATE_STORAGE_KEY, JSON.stringify(state));
        }
        catch {
            // Ignore storage write failures (private mode/quota) and keep UI state in memory only.
        }
    }
    readAccordionStateStorage() {
        if (typeof localStorage === 'undefined') {
            return null;
        }
        try {
            const raw = localStorage.getItem(LeadFormPage.ACCORDION_STATE_STORAGE_KEY);
            if (!raw) {
                return null;
            }
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : null;
        }
        catch {
            return null;
        }
    }
    normalizeAccordionPanelState(value, fallback) {
        if (!Array.isArray(value)) {
            return [...fallback];
        }
        const normalized = value.filter((item) => typeof item === 'string' && item.trim().length > 0);
        return normalized;
    }
    applyOwnerDefault(options) {
        if (this.form.ownerId) {
            const isCurrentOwnerSelectable = options.some((opt) => opt.value === this.form.ownerId);
            if (isCurrentOwnerSelectable) {
                return;
            }
            // Do not keep inactive/deleted owners selected in the edit form.
            this.form.ownerId = undefined;
        }
        const userId = readUserId();
        if (userId && options.some((opt) => opt.value === userId)) {
            this.form.ownerId = userId;
            return;
        }
        const userEmail = readUserEmail();
        if (userEmail) {
            const emailMatch = options.find((opt) => (opt.email ?? '').toLowerCase() === userEmail);
            if (emailMatch) {
                this.form.ownerId = emailMatch.value;
                return;
            }
        }
        const fullName = this.authService.currentUser()?.fullName?.trim().toLowerCase();
        if (!fullName)
            return;
        const match = options.find((opt) => opt.label.trim().toLowerCase() === fullName);
        if (match) {
            this.form.ownerId = match.value;
        }
    }
    ensureOwnerOptions(options) {
        const unique = new Map();
        for (const option of options) {
            if (!option.value || !option.label?.trim()) {
                continue;
            }
            if (!unique.has(option.value)) {
                unique.set(option.value, option);
            }
        }
        return Array.from(unique.values());
    }
    canEditAssignment() {
        return this.assignmentEditable();
    }
    resolveAssignmentAccess() {
        this.assignmentEditable.set(this.hasAdministrationManagePermission());
    }
    hasAdministrationManagePermission() {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.administrationManage);
    }
    validateOverviewFields() {
        const hasTypedPhoneInput = this.getDigitsOnly(this.phoneNationalNumber ?? '').length > 0;
        if (this.phoneNationalNumber) {
            if (this.phoneCountryIso) {
                this.updatePhoneFromInputs();
            }
            else if (!this.form.phone?.trim()) {
                this.phoneError.set('Select a country code.');
            }
            else {
                this.phoneError.set(null);
            }
        }
        const email = this.form.email?.trim() ?? '';
        const phone = this.form.phone?.trim() ?? '';
        const emailError = email ? (this.isValidEmail(email) ? null : 'Enter a valid email address.') : null;
        const phoneError = hasTypedPhoneInput
            ? (phone ? (this.isValidInternationalPhone(phone) ? null : 'Enter a valid phone number for the selected country.') : (this.phoneError() ?? 'Enter a valid phone number for the selected country.'))
            : (phone ? (this.isValidInternationalPhone(phone) ? null : 'Enter a valid phone number for the selected country.') : null);
        this.emailError.set(emailError);
        this.phoneError.set(phoneError);
        if (emailError) {
            this.raiseToast('error', emailError);
            return false;
        }
        if (phoneError) {
            this.raiseToast('error', phoneError);
            return false;
        }
        return true;
    }
    isValidEmail(value) {
        return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim());
    }
    isValidInternationalPhone(value) {
        try {
            const parsed = this.phoneUtil.parse(value);
            return this.phoneUtil.isValidNumber(parsed);
        }
        catch {
            return false;
        }
    }
    updatePhoneFromInputs() {
        const country = this.phoneCountryIso;
        const rawNumber = this.phoneNationalNumber?.trim() ?? '';
        const digitsOnly = this.getDigitsOnly(rawNumber);
        if (!rawNumber) {
            this.form.phone = '';
            this.phoneError.set(null);
            return;
        }
        if (!digitsOnly) {
            this.form.phone = '';
            this.phoneError.set(null);
            return;
        }
        if (!country) {
            this.form.phone = '';
            this.phoneError.set('Select a country code.');
            return;
        }
        try {
            const parsed = this.phoneUtil.parse(rawNumber.replace(/_/g, ''), country);
            const valid = this.phoneUtil.isValidNumberForRegion(parsed, country);
            if (!valid) {
                this.form.phone = '';
                this.phoneError.set('Enter a valid phone number for the selected country.');
                return;
            }
            this.form.phone = this.phoneUtil.format(parsed, PhoneNumberFormat.E164);
            this.phoneError.set(null);
        }
        catch {
            this.form.phone = '';
            this.phoneError.set('Enter a valid phone number for the selected country.');
        }
    }
    syncPhoneInputsFromE164(value) {
        if (!value) {
            this.phoneNationalNumber = '';
            this.phoneCountryIso = '';
            this.refreshPhoneCountryMeta();
            return;
        }
        try {
            const parsed = this.phoneUtil.parse(value);
            const region = this.phoneUtil.getRegionCodeForNumber(parsed) ?? '';
            this.phoneCountryIso = region;
            this.refreshPhoneCountryMeta();
            const digits = String(parsed.getNationalNumber());
            this.phoneNationalNumber = this.applyMaskToDigits(digits, this.phoneMask());
        }
        catch {
            this.syncPhoneInputsFromDialCode(value);
        }
    }
    syncPhoneInputsFromDialCode(value) {
        const raw = value.trim();
        const rawDigits = this.getDigitsOnly(raw);
        if (!rawDigits) {
            this.phoneNationalNumber = raw;
            this.phoneCountryIso = '';
            this.refreshPhoneCountryMeta();
            return;
        }
        const match = this.phoneCountryOptions
            .map((option) => ({ option, digits: option.dialCode.replace('+', '') }))
            .filter((item) => rawDigits.startsWith(item.digits))
            .sort((a, b) => b.digits.length - a.digits.length)[0];
        if (!match) {
            this.phoneNationalNumber = raw;
            this.phoneCountryIso = '';
            this.refreshPhoneCountryMeta();
            return;
        }
        this.phoneCountryIso = match.option.value;
        this.refreshPhoneCountryMeta();
        const nationalDigits = rawDigits.slice(match.digits.length);
        this.phoneNationalNumber = this.applyMaskToDigits(nationalDigits, this.phoneMask());
    }
    loadPhoneCountries() {
        const regions = Array.from(this.phoneUtil.getSupportedRegions());
        const display = this.regionDisplay;
        this.phoneCountryOptions = regions
            .map((region) => {
            const dialCode = this.phoneUtil.getCountryCodeForRegion(region);
            const name = display?.of(region) ?? region;
            return {
                label: `${name} (+${dialCode})`,
                value: region,
                dialCode: `+${dialCode}`,
                flag: this.toFlagEmoji(region),
                name
            };
        })
            .sort((a, b) => a.name.localeCompare(b.name));
        this.refreshPhoneCountryMeta();
    }
    refreshPhoneCountryMeta() {
        const selected = this.phoneCountryOptions.find((option) => option.value === this.phoneCountryIso) ?? null;
        const maskParts = this.getPhoneMaskForRegion(this.phoneCountryIso);
        this.phoneMask.set(maskParts.mask);
        this.phonePlaceholder.set(selected ? `${selected.flag} ${maskParts.placeholder}` : 'Phone number');
    }
    getPhoneMaskForRegion(region) {
        if (!region) {
            return { mask: '', placeholder: 'Phone number' };
        }
        try {
            const example = this.phoneUtil.getExampleNumber(region);
            if (!example) {
                return { mask: '999999999999999', placeholder: 'Phone number' };
            }
            const national = this.phoneUtil.format(example, PhoneNumberFormat.NATIONAL);
            const mask = national.replace(/\d/g, '9');
            const placeholder = national;
            return { mask, placeholder };
        }
        catch {
            return { mask: '999999999999999', placeholder: 'Phone number' };
        }
    }
    getDigitsOnly(value) {
        return (value ?? '').replace(/\D/g, '');
    }
    applyMaskToDigits(digits, mask) {
        if (!digits || !mask) {
            return digits ?? '';
        }
        let cursor = 0;
        let out = '';
        for (const ch of mask) {
            if (ch === '9') {
                if (cursor >= digits.length) {
                    break;
                }
                out += digits[cursor++];
            }
            else {
                out += ch;
            }
        }
        return out.trim();
    }
    toFlagEmoji(region) {
        const iso = region.toUpperCase();
        if (!/^[A-Z]{2}$/.test(iso)) {
            return '';
        }
        return String.fromCodePoint(...iso.split('').map((char) => 127397 + char.charCodeAt(0)));
    }
    getSlaStatusLabel() {
        const due = this.firstTouchDueAtUtc();
        const touched = this.firstTouchedAtUtc();
        if (touched)
            return 'First touch completed';
        if (!due)
            return 'SLA not started';
        const dueDate = new Date(due);
        if (Number.isNaN(dueDate.getTime()))
            return 'SLA pending';
        return dueDate.getTime() < Date.now() ? 'SLA overdue' : 'SLA due';
    }
    getSlaTone() {
        const due = this.firstTouchDueAtUtc();
        const touched = this.firstTouchedAtUtc();
        if (touched)
            return 'done';
        if (!due)
            return 'pending';
        const dueDate = new Date(due);
        if (Number.isNaN(dueDate.getTime()))
            return 'pending';
        return dueDate.getTime() < Date.now() ? 'overdue' : 'due';
    }
    computeAutoScore() {
        return computeLeadScore(this.toScoreInputs(), this.leadDataWeights, this.activeQualificationFactorConfigs(), this.lifecycleWeightsFromPolicy()).finalLeadScore;
    }
    computeQualificationScore() {
        return computeQualificationRawScore(this.form, this.activeQualificationFactorConfigs());
    }
    scoreSnapshot() {
        return computeLeadScore(this.toScoreInputs(), this.leadDataWeights, this.activeQualificationFactorConfigs(), this.lifecycleWeightsFromPolicy());
    }
    preferredScoreSnapshot() {
        const lifecycle = this.lifecycleScore();
        if (this.isEditMode() && lifecycle && !this.hasUncommittedChanges()) {
            return {
                buyerDataQualityScore100: lifecycle.leadDataQualityScore,
                qualificationRawScore100: lifecycle.qualificationScore > 0 ? lifecycle.qualificationScore : null,
                qualificationScore100: lifecycle.qualificationScore,
                leadContributionScore100: lifecycle.leadDataQualityScore,
                qualificationContributionScore100: lifecycle.qualificationScore,
                conversationContributionScore100: lifecycle.conversationScore,
                historyContributionScore100: lifecycle.historyExecutionScore,
                finalLeadScore: lifecycle.overallScore
            };
        }
        return this.scoreSnapshot();
    }
    lifecycleWeightsFromPolicy() {
        const configured = this.qualificationPolicyConfig()?.lifecycleScoreWeights;
        if (!configured) {
            return null;
        }
        return {
            qualificationWeight: configured.qualificationWeight,
            leadDataQualityWeight: configured.leadDataQualityWeight,
            conversationWeight: configured.conversationWeight,
            historyWeight: configured.historyWeight
        };
    }
    toScoreInputs() {
        return {
            firstName: this.form.firstName ?? null,
            lastName: this.form.lastName ?? null,
            email: this.form.email ?? null,
            phone: this.form.phone ?? null,
            companyName: this.form.companyName ?? null,
            jobTitle: this.form.jobTitle ?? null,
            source: this.form.source ?? null,
            territory: this.form.territory ?? null,
            budgetAvailability: this.form.budgetAvailability ?? null,
            readinessToSpend: this.form.readinessToSpend ?? null,
            buyingTimeline: this.form.buyingTimeline ?? null,
            problemSeverity: this.form.problemSeverity ?? null,
            economicBuyer: this.form.economicBuyer ?? null,
            icpFit: this.form.icpFit ?? null,
            conversationScore100: this.conversationSignalAvailable() ? this.conversationScore() : null,
            firstTouchDueAtUtc: this.firstTouchDueAtUtc(),
            firstTouchedAtUtc: this.firstTouchedAtUtc(),
            status: this.form.status ?? null
        };
    }
    getBudgetScore(value) {
        switch (value?.toLowerCase()) {
            case 'budget allocated and approved':
                return 25;
            case 'budget identified but unapproved':
            case 'indicative range mentioned':
                return 15;
            case 'no defined budget':
                return 5;
            default:
                return 0;
        }
    }
    getReadinessScore(value) {
        switch (value?.toLowerCase()) {
            case 'internal decision in progress':
            case 'ready to proceed pending final step':
                return 20;
            case 'actively evaluating solutions':
                return 15;
            case 'interest expressed, no urgency':
                return 8;
            default:
                return 0;
        }
    }
    getTimelineScore(value) {
        switch (value?.toLowerCase()) {
            case 'decision date confirmed internally':
                return 15;
            case 'target date verbally confirmed':
                return 12;
            case 'rough timeline mentioned':
                return 6;
            default:
                return 0;
        }
    }
    getProblemScore(value) {
        switch (value?.toLowerCase()) {
            case 'executive-level priority':
                return 20;
            case 'critical business impact':
                return 20;
            case 'high business impact':
                return 15;
            case 'recognized operational problem':
                return 8;
            case 'mild inconvenience':
                return 2;
            default:
                return 0;
        }
    }
    getEconomicBuyerScore(value) {
        switch (value?.toLowerCase()) {
            case 'buyer engaged in discussion':
            case 'buyer verbally supportive':
                return 10;
            case 'buyer identified, not engaged':
            case 'influencer identified':
                return 5;
            default:
                return 0;
        }
    }
    getIcpFitScore(value) {
        switch (value?.toLowerCase()) {
            case 'strong icp fit':
                return 10;
            case 'partial icp fit':
            case 'out-of-profile but exploratory':
                return 5;
            default:
                return 0;
        }
    }
    onAiScore() {
        if (!this.editingId || this.aiScoring() || !this.canRefreshScore()) {
            return;
        }
        this.aiScoring.set(true);
        this.leadData.aiScore(this.editingId).subscribe({
            next: (result) => {
                this.aiScoring.set(false);
                this.form.score = result.score;
                this.form.autoScore = false;
                const confidencePct = Math.round((result.confidence ?? 0) * 100);
                this.aiScoreConfidence.set(confidencePct);
                this.aiScoreNote.set(`Score refreshed to ${result.score}${result.rationale ? ` - ${result.rationale}` : ''}`.trim());
                this.aiScoreSeverity.set(this.resolveAiSeverity(result.score));
                this.raiseToast('success', `Score refreshed to ${result.score}.`);
            },
            error: (err) => {
                this.aiScoring.set(false);
                this.raiseToast('error', this.extractApiErrorMessage(err, 'Unable to refresh score.'));
            }
        });
    }
    resolveAiSeverity(score) {
        if (score >= 70)
            return 'success';
        if (score >= 45)
            return 'info';
        if (score >= 25)
            return 'warn';
        return 'error';
    }
    aiScoreClass() {
        return `is-${this.aiScoreSeverity()}`;
    }
    aiScoreIcon() {
        switch (this.aiScoreSeverity()) {
            case 'success':
                return 'pi-check-circle';
            case 'warn':
                return 'pi-exclamation-triangle';
            case 'error':
                return 'pi-times-circle';
            default:
                return 'pi-info-circle';
        }
    }
    aiScoreConfidenceLabel() {
        const confidence = this.aiScoreConfidence();
        if (confidence === null)
            return null;
        if (confidence >= 75)
            return 'High confidence';
        if (confidence >= 45)
            return 'Medium confidence';
        return 'Low confidence';
    }
    scoreSourceBadge() {
        const note = this.aiScoreNote()?.toLowerCase();
        if (!note) {
            return null;
        }
        return note.includes('fallback') ? 'Rules fallback' : 'AI';
    }
    qualificationConfidencePercent() {
        if (!this.hasQualificationFactors()) {
            return 0;
        }
        const serverConfidence = this.qualificationConfidence();
        if (serverConfidence !== null) {
            return Math.round(serverConfidence * 100);
        }
        const count = this.countQualificationFactors();
        const scoreBearing = Math.max(1, this.activeQualificationFactors().filter((factor) => factor.includeInScore).length);
        return Math.round((Math.min(count, scoreBearing) / scoreBearing) * 100);
    }
    qualificationConfidenceDisplayLabel() {
        if (!this.hasQualificationFactors())
            return 'Not available';
        const serverLabel = this.qualificationConfidenceLabel();
        if (serverLabel) {
            return serverLabel;
        }
        const percent = this.qualificationConfidencePercent();
        if (percent >= 75)
            return 'High';
        if (percent >= 45)
            return 'Medium';
        return 'Low';
    }
    qualificationConfidenceMetricLabel() {
        return this.qualificationConfidence() !== null ? 'Confidence' : 'Coverage estimate';
    }
    qualificationConfidenceHint() {
        if (!this.hasQualificationFactors()) {
            return null;
        }
        const percent = this.qualificationConfidencePercent();
        if (percent >= 80)
            return null;
        return 'Improve confidence by completing more qualification factors.';
    }
    qualificationStatusLabel() {
        const factorCount = this.countQualificationFactors();
        if (factorCount === 0)
            return 'Not started';
        const qualificationScore = this.preferredScoreSnapshot().qualificationScore100;
        return `${qualificationScore} / 100`;
    }
    leadDataQualityScore() {
        return this.preferredScoreSnapshot().buyerDataQualityScore100;
    }
    overallScorePrimaryLabel() {
        const value = this.overallScoreBadgeValue();
        return `Overall score ${value} / 100`;
    }
    overallScoreBadgeValue() {
        const value = this.preferredScoreSnapshot().finalLeadScore;
        return Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : 0;
    }
    overallScoreBadgeTone() {
        const score = this.overallScoreBadgeValue();
        if (!score)
            return 'none';
        if (score >= 70)
            return 'high';
        if (score >= 45)
            return 'medium';
        return 'low';
    }
    qualificationSubtitleLabel() {
        const factorCount = this.countQualificationFactors();
        if (factorCount === 0) {
            return 'Qualification Not started';
        }
        return `Qualification ${this.preferredScoreSnapshot().qualificationScore100} / 100`;
    }
    qualificationStatusHint() {
        const factorCount = this.countQualificationFactors();
        if (factorCount === 0)
            return 'No qualification factors selected yet.';
        const qualificationScore = this.preferredScoreSnapshot().qualificationScore100;
        const coverage = this.truthCoveragePercent();
        return `Qualification in progress: ${qualificationScore}/100 with ${factorCount}/${this.activeQualificationFactorCount()} active factors and ${coverage}% evidence coverage.`;
    }
    qualificationFactorsSelectedLabel() {
        return `${this.countQualificationFactors()} / ${this.activeQualificationFactorCount()}`;
    }
    qualificationFactorsBadgeLabel() {
        return `${this.countQualificationFactors()}/${this.activeQualificationFactorCount()} selected`;
    }
    qualificationFactorsBadgeTone() {
        const count = this.countQualificationFactors();
        if (count === 0)
            return 'none';
        if (count >= 5)
            return 'high';
        if (count >= 3)
            return 'medium';
        return 'low';
    }
    /** Dynamic icon class for Evidence Coverage metric (red at 0%, amber <50%, green ≥50%) */
    coverageMetricIcon() {
        const pct = this.truthCoveragePercent();
        if (pct === 0)
            return 'pi-times-circle';
        if (pct < 50)
            return 'pi-exclamation-circle';
        return 'pi-check-circle';
    }
    /** Severity tone for Evidence Coverage metric card */
    coverageMetricTone() {
        const pct = this.truthCoveragePercent();
        if (pct === 0)
            return 'none';
        if (pct < 30)
            return 'low';
        if (pct < 60)
            return 'medium';
        return 'high';
    }
    /** Severity tone for Confidence metric card */
    confidenceMetricTone() {
        if (!this.hasQualificationFactors())
            return 'none';
        const pct = this.qualificationConfidencePercent();
        if (pct < 30)
            return 'low';
        if (pct < 60)
            return 'medium';
        return 'high';
    }
    /** Severity tone for Conversation Score metric card */
    conversationMetricTone() {
        if (!this.conversationSignalAvailable())
            return 'none';
        const score = this.conversationScore() ?? 0;
        if (score < 25)
            return 'low';
        if (score < 55)
            return 'medium';
        return 'high';
    }
    /** Icon for Conversation Score metric (dynamic based on signal availability) */
    conversationMetricIcon() {
        if (!this.conversationSignalAvailable())
            return 'pi-minus-circle';
        const score = this.conversationScore() ?? 0;
        if (score < 25)
            return 'pi-exclamation-circle';
        return 'pi-comments';
    }
    /** Qualification progress — how many more factors needed to meet minimum */
    qualificationProgressRemaining() {
        return Math.max(0, this.minimumRequiredQualificationFactors() - this.countQualificationFactors());
    }
    /** Qualification progress percentage (factors selected / minimum required) */
    qualificationProgressPercent() {
        const min = this.minimumRequiredQualificationFactors();
        if (min === 0)
            return 0;
        return Math.min(100, Math.round((this.countQualificationFactors() / min) * 100));
    }
    /** Text for the qualification progress indicator */
    qualificationProgressLabel() {
        const remaining = this.qualificationProgressRemaining();
        if (remaining === 0 && this.countQualificationFactors() > 0)
            return 'Minimum factors met';
        if (remaining === 0)
            return 'Select qualification factors to begin';
        return `${remaining} more factor${remaining === 1 ? '' : 's'} needed to qualify`;
    }
    /** Severity tone for Conversion Readiness */
    conversionReadinessTone() {
        const score = this.conversionReadiness()?.score ?? 0;
        if (score === 0)
            return 'none';
        if (score < 35)
            return 'low';
        if (score < 65)
            return 'medium';
        return 'high';
    }
    qualificationRequiredBadgeLabel() {
        const remaining = Math.max(0, this.minimumRequiredQualificationFactors() - this.countQualificationFactors());
        return remaining > 0 ? `${remaining} more to qualify` : null;
    }
    qualificationReadinessState() {
        if (this.form.status === 'Qualified') {
            return 'qualified';
        }
        if (this.countQualificationFactors() < this.minimumRequiredQualificationFactors()) {
            return 'not-ready';
        }
        if (this.requiresEvidenceBeforeQualified() && this.truthCoveragePercent() < this.minimumEvidenceCoveragePercent()) {
            return 'needs-evidence';
        }
        return 'ready';
    }
    qualificationReadinessTitle() {
        switch (this.qualificationReadinessState()) {
            case 'qualified':
                return 'Qualified';
            case 'ready':
                return 'Ready to qualify';
            case 'needs-evidence':
                return 'Needs evidence';
            default:
                return 'Not ready';
        }
    }
    qualificationReadinessDescription() {
        const state = this.qualificationReadinessState();
        if (state === 'qualified') {
            return 'This lead already meets the qualification state. Review factors and supporting evidence before conversion.';
        }
        if (state === 'ready') {
            return 'Core qualification inputs are complete and evidence coverage meets the current policy threshold.';
        }
        if (state === 'needs-evidence') {
            return `Qualification inputs are present, but evidence coverage is below the ${this.minimumEvidenceCoveragePercent()}% policy threshold.`;
        }
        return 'Capture the core qualification signals first so the CRM can assess readiness accurately.';
    }
    qualificationReadinessBlockers() {
        const blockers = [];
        const missingFactors = this.minimumRequiredQualificationFactors() - this.countQualificationFactors();
        if (missingFactors > 0) {
            blockers.push(`Capture ${missingFactors} more qualification factor${missingFactors === 1 ? '' : 's'}.`);
        }
        if (this.requiresEvidenceBeforeQualified() && this.truthCoveragePercent() < this.minimumEvidenceCoveragePercent()) {
            blockers.push(`Increase evidence coverage to at least ${this.minimumEvidenceCoveragePercent()}%.`);
        }
        const weakest = this.qualificationFeedback()?.weakestSignal;
        if (!blockers.length && weakest) {
            blockers.push(`Strengthen the weakest signal: ${weakest}.`);
        }
        return blockers;
    }
    qualificationFactorCards() {
        return this.activeQualificationFactors().map((factor) => ({
            key: factor.key,
            label: factor.displayLabel,
            helperText: this.qualificationFactorHelperText(factor.key),
            required: factor.isRequired,
            customText: factor.valueType === 'text',
            includeInScore: factor.includeInScore,
            value: this.formValueForFactor(factor.key),
            evidence: this.evidenceValueForFactor(factor.key),
            valueOptions: this.optionsForFactor(factor.key),
            evidenceOptions: this.evidenceOptionsForFactor(factor.key)
        }));
    }
    isEvidenceExpanded(key) {
        return this.qualificationEvidenceExpanded().includes(key);
    }
    toggleEvidenceExpanded(key) {
        this.qualificationEvidenceExpanded.update((keys) => keys.includes(key) ? keys.filter((item) => item !== key) : [...keys, key]);
    }
    shouldShowEvidenceField(key) {
        const value = this.formValueForFactor(key);
        if (this.isEvidenceDisabled(value)) {
            return false;
        }
        const evidence = (this.evidenceValueForFactor(key) ?? '').trim();
        return this.isEvidenceExpanded(key) || (evidence.length > 0 && evidence !== 'No evidence yet');
    }
    evidenceSummaryLabel(key) {
        const evidence = (this.evidenceValueForFactor(key) ?? '').trim();
        if (!evidence || evidence === 'No evidence yet') {
            return this.requiresEvidenceBeforeQualified() ? 'Evidence required' : 'No evidence added';
        }
        return evidence;
    }
    qualificationStatusChipTone(key) {
        const state = this.getFactorState(this.qualificationFactorLabel(key, key), this.formValueForFactor(key), this.optionsForFactor(key)).state;
        switch (state) {
            case 'Verified':
                return 'high';
            case 'Assumed':
                return 'medium';
            case 'Invalid':
                return 'low';
            default:
                return 'none';
        }
    }
    qualificationStatusChipLabel(key) {
        return this.getFactorState(this.qualificationFactorLabel(key, key), this.formValueForFactor(key), this.optionsForFactor(key)).state;
    }
    mergedHistoryItems() {
        const statusItems = this.statusHistory().map((entry) => ({
            id: `status-${entry.id}`,
            type: 'status',
            title: `Status changed to ${entry.status}`,
            subtitle: `Changed by ${entry.changedBy || 'system'}`,
            detail: entry.notes || entry.reason || null,
            occurredAtUtc: entry.changedAtUtc,
            icon: this.statusIcon(entry.status ?? 'New'),
            tone: entry.status === 'Qualified' || entry.status === 'Converted'
                ? 'success'
                : entry.status === 'Lost' || entry.status === 'Disqualified'
                    ? 'danger'
                    : 'info'
        }));
        const auditItems = this.scoreAuditEvents().map((entry) => ({
            id: `audit-${entry.id}`,
            type: 'score',
            title: entry.field ? `${entry.field} updated` : entry.action,
            subtitle: `Changed by ${entry.changedByName || 'system'}`,
            detail: entry.oldValue || entry.newValue ? `${entry.oldValue || 'empty'} → ${entry.newValue || 'empty'}` : null,
            occurredAtUtc: entry.createdAtUtc,
            icon: 'pi-chart-line',
            tone: 'warn'
        }));
        const emailItems = this.leadEmails().map((email) => ({
            id: `email-${email.id}`,
            type: 'email',
            title: email.subject,
            subtitle: `${this.emailDirection(email) === 'inbound' ? 'Inbound' : 'Outbound'} email • ${email.status}`,
            detail: email.toName || email.toEmail || null,
            occurredAtUtc: email.sentAtUtc || email.createdAtUtc,
            icon: 'pi-envelope',
            tone: email.status === 'Failed' || email.status === 'Bounced'
                ? 'danger'
                : email.status === 'Opened' || email.status === 'Clicked'
                    ? 'success'
                    : 'info'
        }));
        return [...statusItems, ...auditItems, ...emailItems]
            .filter((item) => !!item.occurredAtUtc)
            .sort((a, b) => new Date(b.occurredAtUtc).getTime() - new Date(a.occurredAtUtc).getTime());
    }
    qualifiedNotesBadgeLabel() {
        const notes = this.form.qualifiedNotes?.trim() ?? '';
        return notes ? `${Math.min(notes.length, 999)} chars` : 'No notes';
    }
    qualifiedNotesBadgeVariant() {
        return (this.form.qualifiedNotes?.trim()?.length ?? 0) > 0 ? 'cyan' : 'neutral';
    }
    dispositionBadgeLabel() {
        switch (this.form.status) {
            case 'Nurture':
                return this.form.nurtureFollowUpAtUtc ? 'Nurture scheduled' : 'Nurture pending';
            case 'Lost':
                return this.form.lossReason?.trim() ? 'Loss details added' : 'Loss details required';
            case 'Disqualified':
                return this.form.disqualifiedReason?.trim() ? 'Reason captured' : 'Reason required';
            default:
                return 'Active path';
        }
    }
    dispositionBadgeVariant() {
        switch (this.form.status) {
            case 'Nurture':
                return 'orange';
            case 'Lost':
            case 'Disqualified':
                return 'danger';
            default:
                return 'neutral';
        }
    }
    scoreKnobValueColor() {
        const confidence = this.qualificationConfidencePercent();
        if (confidence >= 75)
            return '#0ea5a4';
        if (confidence >= 50)
            return '#0284c7';
        if (confidence >= 30)
            return '#d97706';
        return '#dc2626';
    }
    scoreItemClass(item) {
        if (item.score === 0)
            return 'is-zero';
        if (item.score >= item.maxScore)
            return 'is-full';
        return '';
    }
    scoreBreakdownRows() {
        const scoreByFactor = new Map(this.scoreBreakdown().map((item) => [item.factor, item]));
        return [
            {
                cqvs: 'Q',
                factor: 'Budget',
                weight: 25,
                selectedValue: this.form.budgetAvailability ?? 'Unknown / not yet discussed',
                confidence: this.getConfidenceForValue(this.form.budgetAvailability, this.budgetOptions),
                evidence: this.form.budgetEvidence ?? 'No evidence yet',
                score: scoreByFactor.get('Budget')?.score ?? 0,
                maxScore: scoreByFactor.get('Budget')?.maxScore ?? 25
            },
            {
                cqvs: 'Q',
                factor: 'Readiness',
                weight: 20,
                selectedValue: this.form.readinessToSpend ?? 'Unknown / unclear',
                confidence: this.getConfidenceForValue(this.form.readinessToSpend, this.readinessOptions),
                evidence: this.form.readinessEvidence ?? 'No evidence yet',
                score: scoreByFactor.get('Readiness')?.score ?? 0,
                maxScore: scoreByFactor.get('Readiness')?.maxScore ?? 20
            },
            {
                cqvs: 'Q',
                factor: 'Timeline',
                weight: 15,
                selectedValue: this.form.buyingTimeline ?? 'Unknown / not discussed',
                confidence: this.getConfidenceForValue(this.form.buyingTimeline, this.timelineOptions),
                evidence: this.form.timelineEvidence ?? 'No evidence yet',
                score: scoreByFactor.get('Timeline')?.score ?? 0,
                maxScore: scoreByFactor.get('Timeline')?.maxScore ?? 15
            },
            {
                cqvs: 'V',
                factor: 'Problem',
                weight: 20,
                selectedValue: this.form.problemSeverity ?? 'Unknown / not validated',
                confidence: this.getConfidenceForValue(this.form.problemSeverity, this.problemOptions),
                evidence: this.form.problemEvidence ?? 'No evidence yet',
                score: scoreByFactor.get('Problem')?.score ?? 0,
                maxScore: scoreByFactor.get('Problem')?.maxScore ?? 20
            },
            {
                cqvs: 'S',
                factor: 'Economic Buyer',
                weight: 10,
                selectedValue: this.form.economicBuyer ?? 'Unknown / not identified',
                confidence: this.getConfidenceForValue(this.form.economicBuyer, this.economicBuyerOptions),
                evidence: this.form.economicBuyerEvidence ?? 'No evidence yet',
                score: scoreByFactor.get('Economic Buyer')?.score ?? 0,
                maxScore: scoreByFactor.get('Economic Buyer')?.maxScore ?? 10
            },
            {
                cqvs: 'C',
                factor: 'ICP Fit',
                weight: 10,
                selectedValue: this.form.icpFit ?? 'Unknown / not assessed',
                confidence: this.getConfidenceForValue(this.form.icpFit, this.icpFitOptions),
                evidence: this.form.icpFitEvidence ?? 'No evidence yet',
                score: scoreByFactor.get('ICP Fit')?.score ?? 0,
                maxScore: scoreByFactor.get('ICP Fit')?.maxScore ?? 10
            }
        ];
    }
    cqvsGroupRows() {
        const factorRows = this.scoreBreakdownRows();
        const byFactor = new Map(factorRows.map((row) => [row.factor, row]));
        return CQVS_GROUP_DEFINITIONS.map((group) => {
            const groupRows = group.factors
                .map((factor) => byFactor.get(factor))
                .filter((row) => !!row);
            const score = groupRows.reduce((sum, row) => sum + row.score, 0);
            const maxScore = groupRows.reduce((sum, row) => sum + row.maxScore, 0);
            return {
                code: group.code,
                title: group.title,
                description: group.description,
                weight: group.weight,
                score,
                maxScore
            };
        });
    }
    cqvsGroupPercent(group) {
        if (!group.maxScore)
            return 0;
        return Math.max(0, Math.min(100, Math.round((group.score / group.maxScore) * 100)));
    }
    cqvsRadarChartData() {
        const groups = this.cqvsGroupRows();
        const dataPoints = groups.map((g) => this.cqvsGroupPercent(g));
        const compactLabels = groups.map((g) => {
            switch (g.code) {
                case 'C':
                    return 'C - Fit';
                case 'Q':
                    return 'Q - Qualify';
                case 'V':
                    return 'V - Value';
                case 'S':
                    return 'S - Stakeholder';
                default:
                    return g.code;
            }
        });
        return {
            labels: compactLabels,
            datasets: [
                {
                    label: 'Score %',
                    data: dataPoints,
                    backgroundColor: 'rgba(102, 126, 234, 0.18)',
                    borderColor: '#667eea',
                    borderWidth: 2,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 1.5,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        };
    }
    cqvsRadarChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
            padding: {
                top: 12,
                right: 28,
                bottom: 18,
                left: 28
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => `${ctx.parsed.r}%`
                }
            }
        },
        scales: {
            r: {
                min: 0,
                max: 100,
                ticks: {
                    stepSize: 25,
                    color: '#9ca3af',
                    font: { size: 10 },
                    backdropColor: 'transparent'
                },
                grid: { color: 'rgba(156, 163, 175, 0.25)' },
                angleLines: { color: 'rgba(156, 163, 175, 0.35)' },
                pointLabels: {
                    color: '#374151',
                    font: { size: 10, weight: '600' }
                }
            }
        }
    };
    scoreFormulaHint() {
        const snapshot = this.preferredScoreSnapshot();
        const hasConversation = this.conversationSignalAvailable();
        const conversationPart = hasConversation ? `, Conversation ${snapshot.conversationContributionScore100}/100` : '';
        const weights = this.lifecycleWeightsFromPolicy() ?? {
            qualificationWeight: 50,
            leadDataQualityWeight: 20,
            conversationWeight: 20,
            historyWeight: 10
        };
        return `Overall ${snapshot.finalLeadScore}/100 = weighted lifecycle composite (Qualification ${weights.qualificationWeight}%, Lead Data Quality ${weights.leadDataQualityWeight}%, Conversation ${weights.conversationWeight}%${hasConversation ? '' : ' (excluded until signal exists)'}, History ${weights.historyWeight}%). CQVS Qualification = ${snapshot.qualificationScore100}/100${conversationPart}.`;
    }
    qualificationContributionTotal() {
        return this.preferredScoreSnapshot().qualificationScore100;
    }
    leadDataQualityTotal() {
        return this.preferredScoreSnapshot().buyerDataQualityScore100;
    }
    conversationContributionTotal() {
        return this.preferredScoreSnapshot().conversationContributionScore100;
    }
    historyExecutionTotal() {
        return this.preferredScoreSnapshot().historyContributionScore100;
    }
    leadHeaderScoreValue() {
        return this.preferredScoreSnapshot().finalLeadScore;
    }
    leadHeaderScoreColor() {
        const score = this.leadHeaderScoreValue();
        if (score >= 80)
            return '#16a34a';
        if (score >= 55)
            return '#2563eb';
        if (score >= 35)
            return '#d97706';
        return '#dc2626';
    }
    leadProgressSummary() {
        const status = this.form.status;
        const progressionIndex = this.progressionIndex(status);
        if (progressionIndex >= 0) {
            return `Stage ${progressionIndex + 1} of ${LEAD_PROGRESSION_STATUSES.length}`;
        }
        if (status === 'Nurture') {
            return this.hasReachedContactedStage() ? 'Nurture branch after Contacted' : 'Nurture branch from New';
        }
        if (LEAD_OUTCOME_STATUSES.includes(status)) {
            return 'Outcome recorded';
        }
        return 'Initial stage';
    }
    leadHeaderProgressMessage() {
        const status = this.form.status;
        const hasFirstTouch = !!this.firstTouchedAtUtc();
        const qualFactors = this.countQualificationFactors();
        const meetsEvidence = !this.requiresEvidenceBeforeQualified() || this.truthCoveragePercent() >= this.minimumEvidenceCoveragePercent();
        switch (status) {
            case 'New':
                return hasFirstTouch ? 'First outreach logged' : 'Awaiting first outreach';
            case 'Contacted':
                return hasFirstTouch && qualFactors >= this.minimumRequiredQualificationFactors() && meetsEvidence
                    ? 'Ready for qualification'
                    : 'Discovery in progress';
            case 'Nurture':
                return 'In nurture follow-up';
            case 'Qualified':
                return 'Ready to convert';
            case 'Converted':
                return 'Converted to a live record';
            case 'Lost':
                return 'Closed as lost';
            case 'Disqualified':
                return 'Closed as disqualified';
            default:
                return 'Lead status summary';
        }
    }
    scoreContributionPercent(row) {
        if (!row.maxScore)
            return 0;
        return Math.max(0, Math.min(100, Math.round((row.score / row.maxScore) * 100)));
    }
    statusSeverity(status) {
        switch (status) {
            case 'Qualified':
            case 'Converted':
                return 'success';
            case 'Contacted':
            case 'Nurture':
                return 'info';
            case 'Disqualified':
            case 'Lost':
                return 'danger';
            default:
                return 'warn';
        }
    }
    validateOutcome() {
        if (this.form.status === 'Qualified' && this.countQualificationFactors() < this.minimumRequiredQualificationFactors()) {
            return `At least ${this.minimumRequiredQualificationFactors()} qualification factors are required before marking a lead as Qualified.`;
        }
        if (this.form.status === 'Nurture' && !this.form.nurtureFollowUpAtUtc) {
            return 'Nurture follow-up date is required when setting a lead to Nurture.';
        }
        if (this.form.status === 'Disqualified' && !this.form.disqualifiedReason?.trim()) {
            return 'Disqualified reason is required when closing a lead as Disqualified.';
        }
        if (this.form.status === 'Lost') {
            if (!this.form.lossReason?.trim()) {
                return 'Loss reason is required when closing a lead as Lost.';
            }
            if (!this.form.lossCompetitor?.trim()) {
                return 'Competitor is required when closing a lead as Lost.';
            }
            if (!this.form.lossNotes?.trim()) {
                return 'Loss notes are required when closing a lead as Lost.';
            }
        }
        return null;
    }
    countQualificationFactors() {
        const factors = this.activeQualificationFactors().map((factor) => this.formValueForFactor(factor.key));
        return factors.filter((value) => this.isMeaningfulFactor(value)).length;
    }
    isQualificationFactorActive(key) {
        return this.activeQualificationFactors().some((factor) => factor.key === key);
    }
    qualificationFactorLabel(key, fallback) {
        return this.allQualificationFactors().find((factor) => factor.key === key)?.displayLabel ?? fallback;
    }
    minimumRequiredQualificationFactors() {
        const activeFactors = this.activeQualificationFactors();
        if (!activeFactors.length) {
            return 0;
        }
        const configuredRequired = activeFactors.filter((factor) => factor.isRequired).length;
        return configuredRequired > 0 ? configuredRequired : Math.min(3, activeFactors.length);
    }
    activeQualificationFactorCount() {
        return this.activeQualificationFactors().length;
    }
    customQualificationFactors() {
        return this.activeQualificationFactors().filter((factor) => factor.factorType === 'custom');
    }
    activeQualificationFactorConfigs() {
        return this.activeQualificationFactors().map((factor) => ({
            key: factor.key,
            displayLabel: factor.displayLabel,
            isActive: factor.isActive,
            isRequired: factor.isRequired,
            order: factor.order,
            factorType: factor.factorType,
            valueType: factor.valueType,
            includeInScore: factor.includeInScore,
            options: factor.options
        }));
    }
    activeQualificationFactors() {
        return this.allQualificationFactors().filter((factor) => factor.isActive);
    }
    allQualificationFactors() {
        const configured = this.qualificationPolicyConfig()?.factors ?? [];
        const defaults = [
            { key: 'budget', displayLabel: 'Budget availability', isActive: true, isRequired: true, order: 10, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
            { key: 'readiness', displayLabel: 'Readiness to spend', isActive: true, isRequired: false, order: 20, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
            { key: 'timeline', displayLabel: 'Buying timeline', isActive: true, isRequired: true, order: 30, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
            { key: 'problem', displayLabel: 'Problem severity', isActive: true, isRequired: true, order: 40, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
            { key: 'economicBuyer', displayLabel: 'Economic buyer', isActive: true, isRequired: true, order: 50, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
            { key: 'icpFit', displayLabel: 'ICP fit', isActive: true, isRequired: false, order: 60, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] }
        ];
        if (!configured.length) {
            return defaults;
        }
        const byKey = new Map(configured.map((factor) => [factor.key, factor]));
        const mergedDefaults = defaults.map((factor) => {
            const override = byKey.get(factor.key);
            return override
                ? {
                    ...factor,
                    ...override,
                    displayLabel: (override.displayLabel ?? '').trim() || factor.displayLabel,
                    options: override.options ?? factor.options
                }
                : factor;
        });
        const custom = configured
            .filter((factor) => factor.factorType === 'custom')
            .map((factor) => ({
            ...factor,
            displayLabel: factor.displayLabel.trim() || factor.key,
            options: factor.options ?? []
        }));
        return [...mergedDefaults, ...custom]
            .sort((a, b) => a.order - b.order || a.displayLabel.localeCompare(b.displayLabel));
    }
    formValueForFactor(key) {
        switch (key) {
            case 'budget':
                return this.form.budgetAvailability ?? null;
            case 'readiness':
                return this.form.readinessToSpend ?? null;
            case 'timeline':
                return this.form.buyingTimeline ?? null;
            case 'problem':
                return this.form.problemSeverity ?? null;
            case 'economicBuyer':
                return this.form.economicBuyer ?? null;
            case 'icpFit':
                return this.form.icpFit ?? null;
            default:
                return this.customFactorValue(key);
        }
    }
    evidenceValueForFactor(key) {
        switch (key) {
            case 'budget':
                return this.form.budgetEvidence ?? null;
            case 'readiness':
                return this.form.readinessEvidence ?? null;
            case 'timeline':
                return this.form.timelineEvidence ?? null;
            case 'problem':
                return this.form.problemEvidence ?? null;
            case 'economicBuyer':
                return this.form.economicBuyerEvidence ?? null;
            case 'icpFit':
                return this.form.icpFitEvidence ?? null;
            default:
                return this.customFactorEvidence(key);
        }
    }
    setEvidenceValueForFactor(key, value) {
        switch (key) {
            case 'budget':
                this.form.budgetEvidence = value;
                return;
            case 'readiness':
                this.form.readinessEvidence = value;
                return;
            case 'timeline':
                this.form.timelineEvidence = value;
                return;
            case 'problem':
                this.form.problemEvidence = value;
                return;
            case 'economicBuyer':
                this.form.economicBuyerEvidence = value;
                return;
            case 'icpFit':
                this.form.icpFitEvidence = value;
                return;
            default:
                this.setCustomFactorEvidence(key, value);
                return;
        }
    }
    optionsForFactor(key) {
        switch (key) {
            case 'budget':
                return this.budgetOptions;
            case 'readiness':
                return this.readinessOptions;
            case 'timeline':
                return this.timelineOptions;
            case 'problem':
                return this.problemOptions;
            case 'economicBuyer':
                return this.economicBuyerOptions;
            case 'icpFit':
                return this.icpFitOptions;
            default:
                return this.customFactorOptions(key);
        }
    }
    scoreForFactor(key) {
        const factor = this.allQualificationFactors().find((item) => item.key === key);
        if (!factor?.includeInScore) {
            return 0;
        }
        switch (key) {
            case 'budget':
                return this.getBudgetScore(this.form.budgetAvailability);
            case 'readiness':
                return this.getReadinessScore(this.form.readinessToSpend);
            case 'timeline':
                return this.getTimelineScore(this.form.buyingTimeline);
            case 'problem':
                return this.getProblemScore(this.form.problemSeverity);
            case 'economicBuyer':
                return this.getEconomicBuyerScore(this.form.economicBuyer);
            case 'icpFit':
                return this.getIcpFitScore(this.form.icpFit);
            default:
                return 0;
        }
    }
    maxScoreForFactor(key) {
        const factor = this.allQualificationFactors().find((item) => item.key === key);
        if (!factor?.includeInScore) {
            return 0;
        }
        switch (key) {
            case 'budget':
                return 25;
            case 'readiness':
                return 20;
            case 'timeline':
                return 15;
            case 'problem':
                return 20;
            case 'economicBuyer':
                return 10;
            case 'icpFit':
                return 10;
            default:
                return 0;
        }
    }
    hasQualificationFactors() {
        return this.countQualificationFactors() > 0;
    }
    isMeaningfulFactor(value) {
        if (!value)
            return false;
        return value.trim().length > 0 && !this.isUnknownValue(value);
    }
    onQualificationFactorChange() {
        this.normalizeEvidence();
        this.updateFollowUpGuidance();
        this.refreshScoreBreakdown();
        if (this.form.autoScore) {
            this.form.score = this.computeAutoScore();
        }
        this.updateQualificationFeedback();
        this.updateEpistemicSummary();
    }
    isEvidenceDisabled(value) {
        if (!value)
            return true;
        return this.isUnknownValue(value);
    }
    evidenceOptionsForFactor(factorKey) {
        const rules = this.qualificationPolicyConfig()?.factorEvidenceRules ?? [];
        const rule = rules.find((candidate) => (candidate.factorKey ?? '').toLowerCase() === factorKey.toLowerCase());
        const allowed = (rule?.allowedEvidenceSources ?? [])
            .map((value) => (value ?? '').trim().toLowerCase())
            .filter((value) => value.length > 0);
        if (!allowed.length) {
            return this.evidenceOptions;
        }
        const filtered = this.evidenceOptions.filter((option) => allowed.includes(option.value.toLowerCase()));
        return filtered.length ? filtered : this.evidenceOptions;
    }
    customFactorValue(key) {
        return this.form.customQualificationFactors?.find((factor) => factor.key === key)?.value ?? null;
    }
    customFactorEvidence(key) {
        return this.form.customQualificationFactors?.find((factor) => factor.key === key)?.evidence ?? null;
    }
    setCustomFactorValue(key, value) {
        const factors = [...(this.form.customQualificationFactors ?? [])];
        const current = factors.find((factor) => factor.key === key);
        if (current) {
            current.value = value;
        }
        else {
            factors.push({ key, value, evidence: 'No evidence yet' });
        }
        this.form.customQualificationFactors = factors;
    }
    setCustomFactorEvidence(key, evidence) {
        const factors = [...(this.form.customQualificationFactors ?? [])];
        const current = factors.find((factor) => factor.key === key);
        if (current) {
            current.evidence = evidence;
        }
        else {
            factors.push({ key, value: null, evidence });
        }
        this.form.customQualificationFactors = factors;
    }
    trackCustomQualificationFactor(_index, factor) {
        return factor.key;
    }
    isCustomTextFactor(factor) {
        return factor.valueType === 'text';
    }
    customFactorOptions(key) {
        const factor = this.allQualificationFactors().find((item) => item.key === key);
        return (factor?.options ?? []).map((option) => ({
            label: option,
            value: option,
            icon: this.resolveCustomFactorOptionIcon(option),
            tone: this.resolveCustomFactorOptionTone(option)
        }));
    }
    qualificationFactorHelperText(key) {
        switch (key) {
            case 'budget':
                return 'Confirm spending capacity and whether budget is explicitly documented.';
            case 'readiness':
                return 'Capture how actively the lead is planning to move this purchase forward.';
            case 'timeline':
                return 'Document the target decision window or expected buying horizon.';
            case 'problem':
                return 'Measure how urgent and painful the underlying business problem is.';
            case 'economicBuyer':
                return 'Confirm who controls budget and whether they are actively engaged.';
            case 'icpFit':
                return 'Assess alignment to the ideal customer profile and target use case.';
            default:
                return 'Capture the qualification signal and attach supporting evidence where available.';
        }
    }
    isUnknownValue(value) {
        if (!value)
            return true;
        return value.trim().toLowerCase().includes('unknown');
    }
    normalizeEvidence() {
        for (const factor of this.allQualificationFactors()) {
            if (this.isEvidenceDisabled(this.formValueForFactor(factor.key))) {
                this.setEvidenceValueForFactor(factor.key, 'No evidence yet');
            }
        }
    }
    ensureEvidenceOptionsContainSelections() {
        const selectedValues = [
            this.form.budgetEvidence,
            this.form.readinessEvidence,
            this.form.timelineEvidence,
            this.form.problemEvidence,
            this.form.economicBuyerEvidence,
            this.form.icpFitEvidence,
            ...(this.form.customQualificationFactors ?? []).map((factor) => factor.evidence)
        ]
            .map((value) => (value ?? '').trim())
            .filter((value) => value.length > 0);
        const existing = new Set(this.evidenceOptions.map((option) => option.value.toLowerCase()));
        const additions = selectedValues
            .filter((value) => !existing.has(value.toLowerCase()))
            .map((value) => LeadFormPage.toEvidenceOption(value));
        if (additions.length) {
            this.evidenceOptions = [...this.evidenceOptions, ...additions];
        }
    }
    static defaultEvidenceSources() {
        return [
            'No evidence yet',
            'Customer call',
            'Call notes',
            'Call recap',
            'Follow-up call notes',
            'Discovery call notes',
            'Discovery meeting notes',
            'Meeting notes',
            'Email confirmation',
            'Email from buyer',
            'Buyer email',
            'Written confirmation',
            'Chat transcript',
            'Proposal feedback',
            'Internal plan mention',
            'Ops review notes',
            'Org chart reference',
            'Account research',
            'Third-party confirmation',
            'Historical / prior deal',
            'Inferred from context'
        ];
    }
    static normalizeLeadDispositionPolicy(policy) {
        const normalize = (items) => {
            return (items ?? [])
                .map((item) => (item ?? '').trim())
                .filter((item, index, all) => item.length > 0 && all.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index);
        };
        return {
            disqualificationReasons: normalize(policy?.disqualificationReasons),
            lossReasons: normalize(policy?.lossReasons)
        };
    }
    static toEvidenceOption(source) {
        const value = source.trim();
        return {
            label: value,
            value,
            icon: LeadFormPage.resolveEvidenceIcon(value),
            tone: LeadFormPage.resolveEvidenceTone(value)
        };
    }
    static resolveEvidenceTone(source) {
        const normalized = source.trim().toLowerCase();
        if (normalized.includes('no evidence') || normalized.includes('unknown')) {
            return 'unknown';
        }
        if (normalized.includes('inferred') || normalized.includes('assumption')) {
            return 'invalid';
        }
        if (normalized.includes('confirmation')
            || normalized.includes('email')
            || normalized.includes('buyer')
            || normalized.includes('meeting')
            || normalized.includes('call')) {
            return 'verified';
        }
        if (normalized.includes('history') || normalized.includes('prior')) {
            return 'neutral';
        }
        return 'assumed';
    }
    static resolveEvidenceIcon(source) {
        const normalized = source.trim().toLowerCase();
        if (normalized.includes('no evidence'))
            return 'pi pi-minus-circle';
        if (normalized.includes('email'))
            return 'pi pi-envelope';
        if (normalized.includes('meeting'))
            return 'pi pi-calendar';
        if (normalized.includes('call'))
            return 'pi pi-phone';
        if (normalized.includes('chat'))
            return 'pi pi-comments';
        if (normalized.includes('org chart'))
            return 'pi pi-sitemap';
        if (normalized.includes('research'))
            return 'pi pi-search';
        if (normalized.includes('history') || normalized.includes('prior'))
            return 'pi pi-history';
        if (normalized.includes('third-party'))
            return 'pi pi-users';
        if (normalized.includes('proposal'))
            return 'pi pi-file';
        if (normalized.includes('inferred'))
            return 'pi pi-compass';
        return 'pi pi-file';
    }
    updateQualificationFeedback(preferServer = false) {
        const factors = this.getQualificationFactors();
        const weakest = this.getWeakestFactor(factors);
        const serverWeakestSignal = this.serverWeakestSignal();
        const serverWeakestState = this.serverWeakestState();
        const serverSuggestions = this.serverNextEvidenceSuggestions();
        const confidenceLabel = this.deriveConfidenceLabel(factors);
        const suggestions = preferServer && serverSuggestions.length
            ? serverSuggestions
            : this.buildNextEvidenceSuggestions(weakest?.label ?? null);
        this.qualificationFeedback.set({
            confidenceLabel,
            weakestSignal: preferServer && serverWeakestSignal ? serverWeakestSignal : weakest?.label ?? null,
            weakestState: preferServer && serverWeakestState ? serverWeakestState : weakest?.state ?? null
        });
        this.nextEvidenceSuggestions.set(suggestions);
    }
    refreshScoreBreakdown() {
        this.scoreBreakdown.set(this.buildScoreBreakdown());
    }
    buildScoreBreakdown() {
        return this.activeQualificationFactors()
            .filter((factor) => factor.includeInScore)
            .map((factor) => ({
            factor: factor.displayLabel,
            score: this.scoreForFactor(factor.key),
            maxScore: this.maxScoreForFactor(factor.key)
        }));
    }
    updateEpistemicSummary(preferServer = false) {
        const factors = this.getQualificationFactors();
        const computedTruthCoverage = this.computeTruthCoverage(factors);
        const computedAssumptions = this.computeAssumptionsOutstanding(factors);
        if (preferServer) {
            this.truthCoverage.set(this.truthCoverage() ?? computedTruthCoverage);
            this.assumptionsOutstanding.set(this.assumptionsOutstanding() ?? computedAssumptions);
        }
        else {
            this.truthCoverage.set(computedTruthCoverage);
            this.assumptionsOutstanding.set(computedAssumptions);
        }
    }
    truthCoveragePercent() {
        const coverage = this.truthCoverage();
        if (coverage === null || Number.isNaN(coverage))
            return 0;
        return Math.round(coverage * 100);
    }
    requiresEvidenceBeforeQualified() {
        return this.qualificationPolicyConfig()?.requireEvidenceBeforeQualified ?? false;
    }
    minimumEvidenceCoveragePercent() {
        const configured = this.qualificationPolicyConfig()?.minimumEvidenceCoveragePercent;
        if (configured === null || configured === undefined || Number.isNaN(configured)) {
            return 50;
        }
        return Math.min(100, Math.max(0, Math.round(configured)));
    }
    assumptionsOutstandingLabel() {
        const count = this.assumptionsOutstanding();
        if (!count)
            return '0 assumptions';
        return `${count} assumption${count === 1 ? '' : 's'}`;
    }
    conversationScoreValueLabel() {
        if (!this.conversationSignalAvailable()) {
            return 'Signal unavailable';
        }
        return `${this.conversationScore() ?? 0} / 100`;
    }
    conversationScoreDisplayLabel() {
        if (!this.conversationSignalAvailable()) {
            return 'Unavailable';
        }
        return this.conversationScoreLabel() ?? 'Scored';
    }
    conversationScoreUpdatedLabel() {
        const value = this.conversationScoreUpdatedAtUtc();
        if (!value) {
            return null;
        }
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) {
            return null;
        }
        return `Updated ${parsed.toLocaleString()}`;
    }
    conversationSignalStateLabel() {
        if (!this.conversationSignalAvailable()) {
            return 'No signal';
        }
        if (this.isConversationRiskState()) {
            return 'Risk signal';
        }
        if ((this.conversationScore() ?? 0) >= 70 || this.isHighBuyingIntentState()) {
            return 'Healthy signal';
        }
        return 'Weak signal';
    }
    conversationSignalStateTone() {
        const state = this.conversationSignalStateLabel();
        switch (state) {
            case 'Healthy signal':
                return 'healthy';
            case 'Risk signal':
                return 'risk';
            case 'Weak signal':
                return 'weak';
            default:
                return 'neutral';
        }
    }
    conversationSentimentDisplay() {
        return this.conversationAiSummary()?.sentiment?.trim()
            || this.conversationAiSentiment()?.trim()
            || 'Not detected';
    }
    conversationSummaryDisplay() {
        const aiSummary = this.conversationAiSummary()?.summary?.trim();
        if (aiSummary) {
            return aiSummary;
        }
        const stats = this.emailEngagementStats();
        if (!stats?.total) {
            return 'No conversation signal exists yet because this lead does not have a linked email thread or recorded outreach. Log a real touchpoint so the CRM can assess tone, intent, and readiness.';
        }
        if (!this.conversationSignalAvailable()) {
            return 'Email activity is recorded, but the signal is still too thin to score confidently. Two-way replies, objections, or buying signals will make the guidance more reliable.';
        }
        return `This lead has ${stats.total} recorded email touchpoint${stats.total === 1 ? '' : 's'} and a ${this.conversationScoreDisplayLabel().toLowerCase()} conversation signal. Review the detected signals below before advancing the lead.`;
    }
    conversationNextActionDisplay() {
        const aiAction = this.conversationAiSummary()?.nextAction?.trim();
        if (aiAction) {
            return aiAction;
        }
        const riskSignal = this.conversationRiskSignals()[0];
        if (riskSignal) {
            return `Address this gap next: ${riskSignal}.`;
        }
        const positiveSignal = this.conversationPositiveSignals()[0];
        if (positiveSignal) {
            return `Build on the current momentum: ${positiveSignal.toLowerCase()}.`;
        }
        return 'Add the next meaningful touchpoint or meeting outcome so the CRM can convert conversation activity into readiness guidance.';
    }
    conversationPositiveSignals() {
        return this.conversationClassifiedSignals().positive;
    }
    conversationRiskSignals() {
        return this.conversationClassifiedSignals().risk;
    }
    conversationNeutralSignals() {
        return this.conversationClassifiedSignals().neutral;
    }
    isConversationRiskState() {
        return ['negative', 'cautious'].includes((this.conversationSentimentDisplay() ?? '').trim().toLowerCase())
            || ['guarded', 'dismissive'].includes((this.conversationAiToneLabel() ?? '').trim().toLowerCase())
            || ['stalling', 'objecting', 'disengaged'].includes((this.conversationAiBuyingReadiness() ?? '').trim().toLowerCase())
            || ['going silent', 'raising objections'].includes((this.conversationAiSemanticIntent() ?? '').trim().toLowerCase());
    }
    isHighBuyingIntentState() {
        return ['ready to buy', 'actively evaluating'].includes((this.conversationAiBuyingReadiness() ?? '').trim().toLowerCase())
            || ['seeking solution', 'negotiating terms', 'comparing options'].includes((this.conversationAiSemanticIntent() ?? '').trim().toLowerCase());
    }
    conversationClassifiedSignals() {
        const deduped = Array.from(new Set(this.conversationScoreReasons().map((reason) => reason.trim()).filter(Boolean)));
        const positive = [];
        const risk = [];
        const neutral = [];
        for (const reason of deduped) {
            const normalized = reason.toLowerCase();
            if (/(no |not |missing|lack|stale|stalled|weak|risk|only outbound|unavailable|not engaged|no reply|no budget|no timeline|no buyer)/.test(normalized)) {
                risk.push(reason);
            }
            else if (/(recent|engaged|reply|replies|stakeholder|buyer|budget mentioned|timeline discussed|momentum|positive)/.test(normalized)) {
                positive.push(reason);
            }
            else {
                neutral.push(reason);
            }
        }
        return { positive, risk, neutral };
    }
    conversionReadinessScoreLabel() {
        return `${this.conversionReadiness()?.score ?? 0} / 100`;
    }
    conversionReadinessDisplayLabel() {
        return this.conversionReadiness()?.label ?? 'Not assessed';
    }
    conversionReadinessSummary() {
        return this.conversionReadiness()?.summary ?? 'Conversion readiness is derived from qualification proof and conversation signal.';
    }
    conversionReadinessPrimaryGap() {
        return this.conversionReadiness()?.primaryGap ?? null;
    }
    conversionReadinessReasons() {
        return this.conversionReadiness()?.reasons ?? [];
    }
    conversionReadinessManagerReview() {
        return this.conversionReadiness()?.managerReviewRecommended === true;
    }
    computeTruthCoverage(factors) {
        if (!factors.length)
            return 0;
        const verifiedCount = factors.filter((factor) => factor.state === 'Verified').length;
        return verifiedCount / factors.length;
    }
    computeAssumptionsOutstanding(factors) {
        const highImpactKeys = new Set(['budget', 'timeline', 'economicBuyer']);
        return this.activeQualificationFactors()
            .filter((factor) => highImpactKeys.has(factor.key))
            .map((factor) => factors.find((item) => item.label === factor.displayLabel))
            .filter((factor) => !!factor)
            .filter((factor) => factor.state === 'Unknown' || factor.state === 'Assumed')
            .length;
    }
    buildNextEvidenceSuggestions(label) {
        switch (label) {
            case 'Budget availability':
                return [
                    'Capture budget range and approval owner.',
                    'Ask for confirmation of funding source and timeline.'
                ];
            case 'Readiness to spend':
                return [
                    'Confirm internal priority vs competing initiatives.',
                    'Ask for target decision date and blockers.'
                ];
            case 'Buying timeline':
                return [
                    'Document target go-live date and procurement steps.',
                    'Confirm key milestones and dependencies.'
                ];
            case 'Problem severity':
                return [
                    'Capture quantified impact (time/cost/risk).',
                    'Ask for a recent example or incident.'
                ];
            case 'Economic buyer':
                return [
                    'Identify budget owner and approval chain.',
                    'Confirm who signs and who influences.'
                ];
            case 'ICP fit':
                return [
                    'Validate company size, industry, and stack fit.',
                    'Confirm urgency relative to ICP triggers.'
                ];
            default:
                return [
                    'Log specific evidence for the weakest factor.',
                    'Confirm the next step and decision owner.'
                ];
        }
    }
    getQualificationFactors() {
        return this.activeQualificationFactors().map((factor) => this.getFactorState(factor.displayLabel, this.formValueForFactor(factor.key), this.optionsForFactor(factor.key)));
    }
    getFactorState(label, value, options) {
        const tone = this.resolveTone(value, options);
        const weight = this.toneWeight(tone);
        return { label, state: this.toneLabel(tone), weight };
    }
    resolveTone(value, options) {
        if (!value)
            return 'unknown';
        const match = options.find((option) => option.value === value);
        return match?.tone ?? (this.isUnknownValue(value) ? 'unknown' : 'assumed');
    }
    resolveCustomFactorOptionTone(value) {
        const normalized = value.trim().toLowerCase();
        if (normalized.includes('unknown'))
            return 'unknown';
        if (normalized.includes('blocked') || normalized.includes('not ') || normalized.includes('no '))
            return 'invalid';
        if (normalized.includes('confirmed') || normalized.includes('validated') || normalized.includes('approved'))
            return 'verified';
        return 'assumed';
    }
    resolveCustomFactorOptionIcon(value) {
        switch (this.resolveCustomFactorOptionTone(value)) {
            case 'verified':
                return 'pi pi-check-circle';
            case 'invalid':
                return 'pi pi-times-circle';
            case 'unknown':
                return 'pi pi-question-circle';
            default:
                return 'pi pi-info-circle';
        }
    }
    toneWeight(tone) {
        switch (tone) {
            case 'verified':
                return 3;
            case 'assumed':
                return 2;
            case 'unknown':
                return 1;
            case 'invalid':
                return 0;
            default:
                return 2;
        }
    }
    toneLabel(tone) {
        switch (tone) {
            case 'verified':
                return 'Verified';
            case 'assumed':
                return 'Assumed';
            case 'invalid':
                return 'Invalid';
            default:
                return 'Unknown';
        }
    }
    getConfidenceForValue(value, options) {
        const tone = this.resolveTone(value, options);
        return this.toneLabel(tone);
    }
    getWeakestFactor(factors) {
        return factors.reduce((weakest, current) => {
            if (!weakest)
                return current;
            if (current.weight < weakest.weight)
                return current;
            return weakest;
        }, null);
    }
    deriveConfidenceLabel(factors) {
        if (!factors.length)
            return 'Neutral';
        const average = factors.reduce((sum, factor) => sum + factor.weight, 0) / factors.length;
        if (average >= 2.6)
            return 'High';
        if (average >= 1.6)
            return 'Medium';
        return 'Low';
    }
    updateFollowUpGuidance() {
        const readiness = this.form.readinessToSpend?.toLowerCase() ?? '';
        const timeline = this.form.buyingTimeline?.toLowerCase() ?? '';
        let hint = null;
        if (readiness === 'not planning to spend') {
            hint = 'Readiness is “Not planning to spend.” Move the lead to Nurture when appropriate and record the real outreach from Log activity.';
        }
        if (timeline.includes('target date verbally confirmed')) {
            hint = 'Timeline has a confirmed target date. Record the next customer touch through Log activity so the timeline stays accurate.';
        }
        this.followUpHint.set(hint);
    }
    getDefaultTab() {
        const stateTab = history.state?.defaultTab;
        if (stateTab === 'qualification' || stateTab === 'overview' || stateTab === 'activity' || stateTab === 'history' || stateTab === 'documents') {
            return stateTab;
        }
        if (!this.isEditMode()) {
            return 'overview';
        }
        const roles = this.authService.currentUser()?.roles ?? [];
        const normalized = roles.map((role) => role.toLowerCase());
        const isManager = normalized.some((role) => role.includes('manager') || role.includes('director') || role.includes('vp') || role.includes('admin'));
        if (normalized.length === 0) {
            return 'overview';
        }
        return isManager ? 'overview' : 'qualification';
    }
    toDateValue(value) {
        if (!value)
            return null;
        const date = new Date(value);
        if (Number.isNaN(date.getTime()))
            return null;
        return date;
    }
    initializePresence(recordId) {
        console.debug('[LeadForm] initializePresence called for recordId:', recordId);
        const normalizedRecordId = recordId.toLowerCase();
        this.crmEvents.events$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => {
            if (!event?.payload) {
                return;
            }
            const entityType = String(event.payload['entityType'] ?? '').toLowerCase();
            const payloadRecordId = String(event.payload['recordId'] ?? '').toLowerCase();
            // Log all presence events for this record
            if (event.eventType.startsWith('record.presence') && entityType === 'lead' && payloadRecordId === normalizedRecordId) {
                console.debug('[LeadForm] Received presence event:', event);
            }
            if (entityType !== 'lead' || payloadRecordId !== normalizedRecordId) {
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
                console.debug('[LeadForm] Setting presenceUsers from snapshot:', users);
                this.presenceUsers.set(users);
                return;
            }
            if (event.eventType === 'record.presence.changed') {
                const userId = String(event.payload['userId'] ?? '');
                const displayName = String(event.payload['displayName'] ?? 'User');
                const action = String(event.payload['action'] ?? '').toLowerCase();
                const isEditing = !!event.payload['isEditing'];
                console.debug('[LeadForm] Presence changed:', { userId, displayName, action, isEditing });
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
        this.crmEvents.joinRecordPresence('lead', recordId);
    }
    visiblePresenceUsers() {
        return this.presenceUsers().filter((viewer) => !this.isCurrentUser(viewer.userId));
    }
    activeEditors() {
        return this.visiblePresenceUsers().filter((viewer) => viewer.isEditing);
    }
    /**
     * Returns true if another user has uncommitted changes, putting this form into read-only mode.
     */
    isReadOnlyDueToEditing() {
        return this.activeEditors().length > 0;
    }
    /**
     * Returns the name of the user who has the edit lock (first active editor).
     */
    lockingEditorName() {
        const editors = this.activeEditors();
        return editors.length > 0 ? editors[0].displayName : null;
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
    clearCqvsRadarRenderTimer() {
        if (this.cqvsRadarRenderTimer) {
            clearTimeout(this.cqvsRadarRenderTimer);
            this.cqvsRadarRenderTimer = null;
        }
    }
    isCurrentUser(userId) {
        if (!this.currentUserId || !userId) {
            return false;
        }
        return userId.toLowerCase() === this.currentUserId.toLowerCase();
    }
    static ɵfac = function LeadFormPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LeadFormPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LeadFormPage, selectors: [["app-lead-form-page"]], hostBindings: function LeadFormPage_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("input", function LeadFormPage_input_HostBindingHandler() { return ctx.onCollaborativeEditingActivity(); })("change", function LeadFormPage_change_HostBindingHandler() { return ctx.onCollaborativeEditingActivity(); })("beforeunload", function LeadFormPage_beforeunload_HostBindingHandler($event) { return ctx.onBeforeUnload($event); }, i0.ɵɵresolveWindow);
        } }, decls: 328, vars: 197, consts: [["noLeadPromptDrafts", ""], ["noDuplicateMatches", ""], ["plainPhoneInput", ""], ["noLinkedSummary", ""], ["fallbackRisks", ""], ["qualificationTextFactor", ""], ["noLeadActivities", ""], ["docsLoadingTpl", ""], ["noHistory", ""], ["noScoreAudit", ""], ["noRelatedEmails", ""], [1, "lead-form-page"], ["header", "Convert Lead", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "lead-status-dialog"], [1, "lead-status-dialog__body"], [1, "lead-status-dialog__actions"], ["pButton", "", "type", "button", "label", "Cancel", 1, "p-button-outlined", 3, "click"], ["pButton", "", "type", "button", "label", "Proceed", 1, "crm-button", "crm-button--primary", 3, "click"], [3, "visibleChange", "onHide", "header", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "lead-status-dialog__body", "lead-status-dialog__body--stacked"], ["optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "placeholder"], ["pInputText", "", "placeholder", "Competitor", "class", "w-full", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["pInputText", "", "placeholder", "Loss notes", "class", "w-full", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["pButton", "", "type", "button", 1, "crm-button", "crm-button--primary", 3, "click", "label", "disabled"], ["header", "Saved drafts available", "styleClass", "form-draft-prompt-dialog", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "form-draft-prompt"], [1, "form-draft-prompt__hero"], [1, "form-draft-prompt__icon"], [1, "pi", "pi-bookmark"], ["class", "form-draft-list", 4, "ngIf", "ngIfElse"], ["pButton", "", "type", "button", "label", "Start fresh", 1, "p-button-outlined", 3, "click"], ["pButton", "", "type", "button", "label", "View all drafts", 1, "crm-button", "crm-button--primary", 3, "click"], ["header", "Open saved draft?", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], ["pButton", "", "type", "button", "label", "Open Draft", 1, "crm-button", "crm-button--primary", 3, "click"], ["header", "Unsaved lead changes", "styleClass", "form-leave-dialog", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "form-leave-dialog__body"], [1, "form-leave-dialog__hero"], [1, "form-leave-dialog__icon"], [1, "pi", "pi-exclamation-circle"], [1, "form-leave-dialog__actions"], ["pButton", "", "type", "button", "label", "Stay on form", 1, "p-button-outlined", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Leave without saving", 1, "p-button-outlined", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Save to draft", 1, "crm-button", "crm-button--secondary", 3, "click", "loading", "disabled"], ["pButton", "", "type", "button", 1, "crm-button", "crm-button--primary", 3, "click", "label", "loading", "disabled"], ["header", "Saved lead drafts", 3, "visibleChange", "onHide", "modal", "draggable", "resizable", "closable", "dismissableMask", "visible"], [1, "form-draft-dialog"], ["class", "form-draft-dialog__empty", 4, "ngIf"], ["class", "form-draft-list", 4, "ngIf"], [1, "duplicate-dialog"], [1, "duplicate-dialog__message"], ["class", "duplicate-dialog__list", 4, "ngIf", "ngIfElse"], [1, "duplicate-dialog__actions"], ["pButton", "", "type", "button", "class", "crm-button crm-button--primary", "label", "Save Anyway", 3, "click", 4, "ngIf"], [1, "page-header"], [1, "header-content"], [1, "header-top"], ["type", "button", "routerLink", "/app/leads", 1, "back-link"], [1, "pi", "pi-arrow-left"], ["type", "button", "class", "lead-btn lead-btn--accent", 3, "click", 4, "ngIf"], [1, "header-row"], [1, "header-title"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], ["class", "lead-record-number", 4, "ngIf"], ["class", "lead-header-progress", 4, "ngIf"], ["class", "form-draft-status", 4, "ngIf"], ["class", "form-draft-banner", 4, "ngIf"], ["class", "presence-focus presence-focus--viewing", 4, "ngIf"], ["class", "presence-editing-note", 4, "ngIf"], ["class", "status-ribbon", 4, "ngIf"], ["class", "read-only-banner", 4, "ngIf"], ["class", "related-summary", 3, "related-summary--empty", 4, "ngIf"], [1, "form-container"], [1, "lead-form", 3, "ngSubmit"], [1, "form-fieldset", 3, "disabled"], [1, "lead-tabs-shell", 3, "valueChange", "value"], [1, "lead-tabs"], ["value", "overview", 3, "disabled", "pt"], [1, "lead-tab-label"], ["value", "activity", 3, "disabled", "pt"], ["class", "tab-badge warn", 4, "ngIf"], ["value", "qualification", 3, "disabled", "pt"], ["class", "tab-badge danger", 4, "ngIf"], ["value", "documents", 3, "disabled", "pt"], ["class", "tab-badge", 4, "ngIf"], ["value", "history", 3, "disabled", "pt"], ["value", "overview"], [1, "overview-accordion-shell", 3, "valueChange", "multiple", "value"], ["value", "lead-basics"], [1, "section-title", "section-title--accordion"], [1, "pi", "pi-user"], [1, "form-section", "form-section--overview", "form-section--accordion-body"], [1, "section-block"], [1, "form-grid", "qualification-grid"], [1, "form-field"], ["for", "lead-firstName"], [1, "required"], [1, "icon-addon", "icon-addon--name"], ["pInputText", "", "id", "lead-firstName", "name", "firstName", "required", "", "placeholder", "First name", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "lead-lastName"], ["pInputText", "", "id", "lead-lastName", "name", "lastName", "required", "", "placeholder", "Last name", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "lead-companyName"], [1, "icon-addon", "icon-addon--company"], [1, "pi", "pi-building"], ["pInputText", "", "id", "lead-companyName", "name", "companyName", "placeholder", "Company", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "form-field", "full-row"], ["for", "lead-leadSummary"], [1, "hint-text", "compact"], ["pTextarea", "", "id", "lead-leadSummary", "name", "leadSummary", "rows", "3", "placeholder", "What is this lead about, what are they evaluating, and why now?", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "form-field", "form-field--status-fallback"], ["optionLabel", "label", "optionValue", "value", "optionDisabled", "disabled", "name", "status", "placeholder", "Select status", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["pTemplate", "item"], ["pTemplate", "value"], ["class", "status-note", 4, "ngIf"], ["optionLabel", "label", "optionValue", "value", "name", "assignmentStrategy", "placeholder", "Select assignment", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "disabled"], ["class", "form-field", 4, "ngIf"], ["value", "contact-details"], [1, "pi", "pi-phone"], [1, "form-grid"], ["for", "lead-email"], [1, "icon-addon", "icon-addon--email"], [1, "pi", "pi-envelope"], ["pInputText", "", "id", "lead-email", "name", "email", "type", "email", "placeholder", "name@company.com", 1, "w-full", 3, "ngModelChange", "ngModel"], ["class", "field-link", "href", "", 3, "click", 4, "ngIf"], ["class", "field-error", 4, "ngIf"], ["for", "lead-phoneType"], [1, "phone-grid"], ["optionLabel", "label", "optionValue", "value", "name", "phoneTypeId", "placeholder", "Select type", "appendTo", "body", "styleClass", "phone-type-select w-full", 3, "ngModelChange", "options", "ngModel"], ["optionLabel", "label", "optionValue", "value", "name", "phoneCountry", "placeholder", "Select country", "filterBy", "label", "appendTo", "body", "styleClass", "phone-country-select w-full", 3, "ngModelChange", "options", "ngModel", "filter"], ["pTemplate", "selectedItem"], [4, "ngIf", "ngIfElse"], ["for", "lead-jobTitle"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-id-card"], ["pInputText", "", "id", "lead-jobTitle", "name", "jobTitle", "placeholder", "Role or title", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "lead-source"], [1, "icon-addon", "icon-addon--industry"], [1, "pi", "pi-compass"], ["pInputText", "", "id", "lead-source", "name", "source", "placeholder", "Web, Referral, Event", 1, "w-full", 3, "ngModelChange", "ngModel"], ["value", "buyer-profile", 4, "ngIf"], ["value", "score"], [1, "section-title", "section-title--accordion", "section-title--accordion-summary"], [1, "pi", "pi-chart-line"], [1, "accordion-header-summary"], [1, "accordion-header-badge", "accordion-header-badge--score"], ["class", "accordion-header-badge accordion-header-badge--meta", 4, "ngIf"], [1, "form-section", "form-section--score", "form-section--accordion-body"], ["styleClass", "ai-score-progress ai-score-progress--top", "mode", "indeterminate", 4, "ngIf"], [1, "form-field", "score-field"], ["for", "lead-score"], [1, "score-content"], ["id", "lead-score", "name", "score", "placeholder", "0-100", 1, "w-full", 3, "ngModelChange", "ngModel", "min", "max", "disabled"], [1, "score-meta"], [1, "hint-text"], [4, "ngIf"], ["severity", "info", 3, "value", 4, "ngIf"], ["severity", "secondary", 3, "value", 4, "ngIf"], ["class", "ai-score-row", 4, "ngIf"], ["for", "lead-territory"], [1, "icon-addon", "icon-addon--address"], [1, "pi", "pi-map"], ["pInputText", "", "id", "lead-territory", "name", "territory", "placeholder", "West, EMEA, APAC", 1, "w-full", 3, "ngModelChange", "ngModel"], ["value", "qualification"], ["class", "qualification-scoring-shell", "aria-label", "Qualification scoring", 4, "ngIf"], [1, "tab-content-accordion-shell", 3, "valueChange", "multiple", "value"], ["value", "qualification-factors"], [1, "form-section", "form-section--qualification", "form-section--accordion-body"], [1, "qualification-factor-grid"], ["class", "qualification-factor-card", 4, "ngFor", "ngForOf"], ["value", "qualification-context"], [1, "pi", "pi-file-edit"], [1, "accordion-header-badge", "accordion-header-badge--meta"], ["for", "lead-qualifiedNotes"], ["pTextarea", "", "id", "lead-qualifiedNotes", "name", "qualifiedNotes", "rows", "5", "placeholder", "Key context, objections, and next steps (non-scoring)", 1, "w-full", 3, "ngModelChange", "ngModel"], ["value", "qualification-disposition"], [1, "pi", "pi-flag"], ["class", "form-field full-row", 4, "ngIf"], ["value", "activity"], ["class", "tab-content-accordion-shell", 3, "multiple", "value", "valueChange", 4, "ngIf"], ["value", "documents"], ["value", "history"], [1, "form-actions"], ["type", "button", 1, "lead-btn", "lead-btn--secondary", 3, "click"], [1, "pi", "pi-times"], ["type", "button", 1, "lead-btn", "lead-btn--primary", 3, "click", "disabled"], [1, "pi", "pi-check"], ["icon", "pi pi-bookmark", "styleClass", "crm-draft-splitbutton", "buttonStyleClass", "lead-btn lead-btn--secondary", "menuButtonStyleClass", "lead-btn lead-btn--secondary", "appendTo", "body", 3, "onClick", "label", "disabled", "model"], ["pInputText", "", "placeholder", "Competitor", 1, "w-full", 3, "ngModelChange", "ngModel"], ["pInputText", "", "placeholder", "Loss notes", 1, "w-full", 3, "ngModelChange", "ngModel"], [1, "form-draft-list"], ["class", "form-draft-list__item", 4, "ngFor", "ngForOf"], [1, "form-draft-list__item"], [1, "form-draft-list__title"], [1, "form-draft-list__meta"], [1, "form-draft-list__actions"], ["type", "button", 1, "form-draft-list__resume", 3, "click"], [1, "form-draft-dialog__empty"], ["type", "button", 1, "form-draft-list__discard", 3, "click"], [1, "duplicate-dialog__list"], ["class", "duplicate-row", 4, "ngFor", "ngForOf"], [1, "duplicate-row"], [1, "duplicate-row__meta"], [1, "duplicate-row__name"], [1, "duplicate-row__company"], [1, "duplicate-row__signals"], [1, "duplicate-row__score"], [1, "duplicate-row__badge"], ["pButton", "", "type", "button", "label", "Open", 1, "p-button-text", "p-button-sm", 3, "click"], ["pButton", "", "type", "button", "label", "Save Anyway", 1, "crm-button", "crm-button--primary", 3, "click"], ["type", "button", 1, "lead-btn", "lead-btn--accent", 3, "click"], [1, "pi", "pi-calendar-plus"], [1, "lead-record-number"], [1, "lead-record-number__label"], [1, "lead-header-progress"], [1, "lead-header-progress__dial"], ["valueColor", "var(--lead-header-score-color)", "rangeColor", "rgba(148, 163, 184, 0.18)", "textColor", "#1e293b", "styleClass", "lead-header-progress__knob", 3, "ngModel", "readonly", "valueTemplate", "size", "strokeWidth", "showValue", "min", "max", "valueColor"], [1, "lead-header-progress__content"], [1, "lead-header-progress__eyebrow"], [1, "lead-header-progress__meta"], [1, "lead-header-progress__status"], [1, "lead-header-progress__step"], [1, "lead-header-progress__copy"], [1, "form-draft-status"], [1, "form-draft-banner"], [1, "pi", "pi-info-circle"], [1, "presence-focus", "presence-focus--viewing"], [1, "pi", "pi-eye"], [1, "presence-editing-note"], [1, "pi", "pi-pencil"], [1, "status-ribbon"], [1, "status-ribbon__inner"], [1, "status-ribbon__meta-strip"], [1, "status-ribbon__score"], [1, "status-ribbon__score-knob"], ["valueColor", "var(--lead-header-score-color)", "rangeColor", "rgba(148, 163, 184, 0.18)", "textColor", "#1e293b", "styleClass", "status-ribbon__score-knob-control", 3, "ngModel", "readonly", "valueTemplate", "size", "strokeWidth", "showValue", "min", "max", "valueColor"], [1, "status-ribbon__meta-pills"], [1, "status-ribbon__meta-pill", "status-ribbon__meta-pill--status"], [1, "status-ribbon__meta-pill"], [1, "status-ribbon__meta-copy"], [1, "status-ribbon__mobile-toggle"], ["type", "button", 1, "status-ribbon__mobile-toggle-btn", 3, "click"], [1, "pi", 3, "ngClass"], [1, "lead-stepper", "lead-stepper--ribbon"], [1, "lead-stepper__mobile-summary"], [1, "lead-stepper__mobile-status"], ["class", "lead-stepper__mobile-next", 4, "ngIf"], [1, "lead-stepper__desktop-path"], [1, "lead-stepper__track"], ["class", "lead-stepper__score-badge", 4, "ngIf"], [1, "lead-stepper__branch-lane"], [1, "lead-stepper__branch-stem"], ["type", "button", 1, "lead-stepper__branch", 3, "click"], [1, "lead-stepper__branch-icon"], [1, "pi", "pi-clock"], [1, "lead-stepper__branch-copy"], [1, "lead-stepper__branch-label"], [1, "lead-stepper__branch-meta"], [1, "lead-status-rail"], [1, "lead-status-rail__summary"], [1, "lead-status-rail__current"], [1, "lead-status-rail__eyebrow"], [1, "lead-status-rail__value"], ["class", "lead-status-rail__instruction", 4, "ngIf"], ["class", "lead-status-rail__blocker-panel", 4, "ngIf"], ["class", "lead-stepper__backward-confirm", 4, "ngIf"], [1, "lead-status-rail__actions"], ["type", "button", "class", "lead-status-rail__primary", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "class", "lead-status-rail__branch", 3, "click", 4, "ngIf"], ["class", "lead-status-rail__secondary", 4, "ngIf"], ["class", "stepper-audit-trail", 4, "ngIf"], [1, "lead-stepper__mobile-next"], ["tooltipPosition", "top", 1, "lead-stepper__step", 3, "click", "pTooltip"], [1, "lead-stepper__icon"], [1, "lead-stepper__label"], ["class", "lead-stepper__duration", 4, "ngIf"], ["class", "lead-stepper__connector", 4, "ngIf"], [1, "lead-stepper__duration"], [1, "lead-stepper__connector"], [1, "lead-stepper__score-badge"], [1, "pi", "pi-bolt"], [1, "lead-status-rail__instruction"], [1, "lead-status-rail__blocker-panel"], [1, "lead-status-rail__blocker-label"], [1, "lead-status-rail__blockers"], [4, "ngFor", "ngForOf"], [1, "lead-stepper__backward-confirm"], [1, "pi", "pi-exclamation-triangle"], ["type", "button", 1, "backward-confirm__yes", 3, "click"], ["type", "button", 1, "backward-confirm__no", 3, "click"], ["type", "button", 1, "lead-status-rail__primary", 3, "click", "disabled"], ["type", "button", 1, "lead-status-rail__branch", 3, "click"], [1, "lead-status-rail__secondary"], ["type", "button", "class", "lead-status-rail__secondary-btn", 3, "disabled", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "lead-status-rail__secondary-btn", 3, "click", "disabled"], [1, "stepper-audit-trail"], [1, "audit-trail__entry"], [1, "audit-trail__date"], ["class", "audit-trail__arrow", 4, "ngIf"], [1, "audit-trail__arrow"], [1, "read-only-banner"], [1, "pi", "pi-lock"], [1, "read-only-banner__content"], [1, "related-summary"], [1, "related-summary-label"], ["class", "related-summary-links", 4, "ngIf", "ngIfElse"], [1, "related-summary-links"], ["class", "related-summary-link", 3, "routerLink", 4, "ngIf"], [1, "related-summary-link", 3, "routerLink"], [1, "pi", "pi-briefcase"], [1, "related-summary-empty"], [1, "tab-badge", "warn"], [1, "tab-badge", "danger"], [1, "tab-badge"], [1, "status-option"], ["class", "status-option", 4, "ngIf"], ["class", "status-placeholder", 4, "ngIf"], [1, "status-placeholder"], [1, "status-note"], ["class", "status-action-link", 3, "click", 4, "ngIf"], [1, "status-action-link", 3, "click"], [1, "pi", "pi-plus-circle"], [1, "option-row"], ["class", "option-row", 4, "ngIf"], ["class", "select-placeholder", 4, "ngIf"], [1, "select-placeholder"], ["optionLabel", "label", "optionValue", "value", "name", "ownerId", "placeholder", "Select owner", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "readonly", "disabled"], ["href", "", 1, "field-link", 3, "click"], [1, "pi", "pi-external-link"], [1, "field-error"], ["class", "phone-country-option", 4, "ngIf"], [1, "phone-country-option"], ["name", "phoneNumber", "styleClass", "w-full", 3, "ngModelChange", "mask", "slotChar", "autoClear", "unmask", "ngModel", "placeholder"], ["pInputText", "", "name", "phoneNumberPlain", "placeholder", "Phone number", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "lead-routingReason"], [1, "pi", "pi-directions"], ["pInputText", "", "id", "lead-routingReason", 1, "w-full", 3, "ngModel", "ngModelOptions", "disabled"], ["value", "buyer-profile"], [1, "pi", "pi-home"], [1, "form-section", "form-section--accordion-body"], ["for", "lead-buyerType"], ["id", "lead-buyerType", "name", "buyerType", "optionLabel", "label", "optionValue", "value", "placeholder", "Select buyer type", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "lead-preferredArea"], ["id", "lead-preferredArea", "name", "preferredArea", "optionLabel", "label", "optionValue", "value", "placeholder", "Select preferred area", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "lead-preferredPropertyType"], ["id", "lead-preferredPropertyType", "name", "preferredPropertyType", "optionLabel", "label", "optionValue", "value", "placeholder", "Select property type", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "lead-budgetBand"], ["id", "lead-budgetBand", "name", "budgetBand", "optionLabel", "label", "optionValue", "value", "placeholder", "Select budget band", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["styleClass", "ai-score-progress ai-score-progress--top", "mode", "indeterminate"], ["severity", "info", 3, "value"], ["severity", "secondary", 3, "value"], [1, "ai-score-row"], ["type", "button", 1, "action-btn", "action-btn--refresh", "ai-score-button", 3, "click", "disabled"], [1, "action-btn__icon"], [1, "pi", "pi-sync"], ["class", "ai-score-inline", 3, "ngClass", 4, "ngIf"], [1, "ai-score-inline", 3, "ngClass"], ["aria-label", "Qualification scoring", 1, "qualification-scoring-shell"], [1, "qualification-scoring-shell__header"], [1, "qual-shell-title"], [1, "qual-shell-title__icon"], ["aria-hidden", "true", 1, "pi", "pi-sitemap"], [1, "qual-shell-title__eyebrow"], [1, "qual-shell-actions"], ["type", "button", 1, "action-btn", "action-btn--refresh", "qual-shell-actions__primary", 3, "click", "disabled"], ["aria-hidden", "true", 1, "pi", 3, "ngClass"], [1, "qualification-readiness-panel"], [1, "qualification-readiness-panel__status"], [1, "qualification-readiness-panel__eyebrow"], [1, "qualification-readiness-panel__metrics"], [1, "qualification-summary-metric"], [1, "qualification-summary-metric__label"], [1, "qualification-summary-metric", "qualification-summary-metric--action"], ["class", "qualification-readiness-panel__blockers", 4, "ngIf"], [1, "qualification-scoring-details"], [1, "qualification-scoring-details__body"], [1, "qual-cqvs-section"], [1, "qual-cqvs-radar"], [1, "qual-cqvs-radar__header"], [1, "qual-cqvs-radar__title"], ["aria-hidden", "true", 1, "pi", "pi-chart-scatter"], [1, "qual-cqvs-radar__sub"], ["type", "radar", 3, "data", "options", 4, "ngIf"], [1, "qual-cqvs-cards"], ["class", "cqvs-group-card", 4, "ngFor", "ngForOf"], [1, "qual-breakdown-grid"], [1, "qual-breakdown-main"], [1, "qual-breakdown-main__header"], ["styleClass", "score-breakdown-table score-breakdown-table--hero", 3, "value"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "qual-risk-card"], ["class", "qual-risk-list", 4, "ngIf", "ngIfElse"], [1, "qualification-readiness-panel__blockers"], [1, "qualification-readiness-panel__blockers-title"], ["type", "radar", 3, "data", "options"], [1, "cqvs-group-card"], [1, "cqvs-group-card__head"], [1, "cqvs-code"], [1, "cqvs-group-card__title"], [1, "cqvs-group-card__metrics"], [1, "score-val"], [1, "weight-pill"], [1, "factor-rail", "compact"], [1, "factor-rail__fill"], [1, "col-factor", "col-factor--with-cqvs"], [1, "cqvs-badge"], [1, "col-weight"], [1, "col-selected"], [1, "col-confidence"], [1, "confidence-badge"], [1, "col-evidence"], [1, "col-contribution"], [1, "col-score"], [1, "qual-risk-list"], ["class", "qual-risk-item", 4, "ngFor", "ngForOf"], [1, "qual-risk-item"], ["aria-hidden", "true", 1, "pi", "pi-exclamation-circle"], [1, "qualification-factor-card"], [1, "qualification-factor-card__header"], [1, "qualification-factor-card__title-row"], ["class", "factor-required-badge", 4, "ngIf"], ["class", "factor-scoring-badge", 4, "ngIf"], [1, "qualification-factor-card__field"], [1, "qualification-factor-card__evidence-row"], [1, "qualification-factor-card__evidence-summary"], [1, "qualification-factor-card__evidence-label"], ["type", "button", 1, "action-btn", "action-btn--settings", "qualification-factor-card__evidence-toggle", 3, "click", "disabled"], ["class", "qualification-factor-card__field qualification-factor-card__field--evidence", 4, "ngIf"], [1, "factor-required-badge"], [1, "factor-scoring-badge"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not assessed", "appendTo", "body", "class", "w-full", 3, "inputId", "name", "options", "ngModel", "ngModelChange", 4, "ngIf"], ["name", "budgetAvailability", "optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not yet discussed", "appendTo", "body", "class", "w-full", 3, "inputId", "options", "ngModel", "ngModelChange", 4, "ngIf"], ["name", "readinessToSpend", "optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not yet discussed", "appendTo", "body", "class", "w-full", 3, "inputId", "options", "ngModel", "ngModelChange", 4, "ngIf"], ["name", "buyingTimeline", "optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not yet discussed", "appendTo", "body", "class", "w-full", 3, "inputId", "options", "ngModel", "ngModelChange", 4, "ngIf"], ["name", "problemSeverity", "optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not yet discussed", "appendTo", "body", "class", "w-full", 3, "inputId", "options", "ngModel", "ngModelChange", 4, "ngIf"], ["name", "economicBuyer", "optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not yet discussed", "appendTo", "body", "class", "w-full", 3, "inputId", "options", "ngModel", "ngModelChange", 4, "ngIf"], ["name", "icpFit", "optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not yet discussed", "appendTo", "body", "class", "w-full", 3, "inputId", "options", "ngModel", "ngModelChange", 4, "ngIf"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not assessed", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "inputId", "name", "options", "ngModel"], ["class", "select-option", 4, "ngIf"], [1, "select-option"], [3, "ngClass"], ["name", "budgetAvailability", "optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not yet discussed", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "inputId", "options", "ngModel"], ["name", "readinessToSpend", "optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not yet discussed", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "inputId", "options", "ngModel"], ["name", "buyingTimeline", "optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not yet discussed", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "inputId", "options", "ngModel"], ["name", "problemSeverity", "optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not yet discussed", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "inputId", "options", "ngModel"], ["name", "economicBuyer", "optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not yet discussed", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "inputId", "options", "ngModel"], ["name", "icpFit", "optionLabel", "label", "optionValue", "value", "placeholder", "Unknown / not yet discussed", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "inputId", "options", "ngModel"], ["pInputText", "", "placeholder", "Enter qualification detail", 1, "w-full", 3, "ngModelChange", "id", "name", "ngModel"], [1, "qualification-factor-card__field", "qualification-factor-card__field--evidence"], ["optionLabel", "label", "optionValue", "value", "appendTo", "body", 1, "w-full", 3, "ngModelChange", "inputId", "name", "options", "ngModel"], [1, "disposition-actions"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click"], [1, "pi", "pi-refresh"], [1, "disposition-actions__hint"], ["for", "lead-nurtureFollowUp"], ["id", "lead-nurtureFollowUp", "name", "nurtureFollowUpAtUtc", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "ngModel"], ["for", "lead-disqualifiedReason"], ["id", "lead-disqualifiedReason", "name", "disqualifiedReason", "optionLabel", "label", "optionValue", "value", "placeholder", "Select the primary disqualification reason", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "lead-lossReason"], ["id", "lead-lossReason", "name", "lossReason", "optionLabel", "label", "optionValue", "value", "placeholder", "Select the primary loss reason", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["for", "lead-competitor"], [1, "icon-addon", "icon-addon--danger"], [1, "pi", "pi-shield"], ["pInputText", "", "id", "lead-competitor", "name", "lossCompetitor", "placeholder", "Competitor name", 1, "w-full", 3, "ngModelChange", "ngModel"], ["for", "lead-lossNotes"], ["pTextarea", "", "id", "lead-lossNotes", "name", "lossNotes", "rows", "3", "placeholder", "Add the key evidence behind the loss decision", 1, "w-full", 3, "ngModelChange", "ngModel"], ["value", "activity-main"], [1, "pi", "pi-bullseye"], [1, "form-section", "cadence-section", "form-section--accordion-body"], ["class", "hint-text compact", 4, "ngIf"], [1, "cadence-grid"], [1, "cadence-input", "cadence-input--readonly"], [1, "cadence-actions"], ["type", "button", 1, "action-btn", "action-btn--secondary", 3, "click"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click"], [1, "history-empty"], [1, "history-empty__subtle"], [1, "lead-activity-timeline"], [1, "lead-activity-timeline__header"], ["type", "button", 1, "action-btn", "action-btn--settings", 3, "click"], ["class", "history-empty", 4, "ngIf"], ["class", "lead-activity-timeline__list", 4, "ngIf", "ngIfElse"], [1, "lead-activity-timeline__list"], ["type", "button", "class", "lead-activity-timeline__item", 3, "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "lead-activity-timeline__item", 3, "click"], [1, "lead-activity-timeline__icon"], [1, "lead-activity-timeline__content"], [1, "lead-activity-timeline__top"], [1, "lead-activity-timeline__subject"], [1, "lead-activity-timeline__status"], [1, "lead-activity-timeline__meta"], ["class", "lead-activity-timeline__outcome", 4, "ngIf"], [1, "lead-activity-timeline__outcome"], ["class", "lead-activity-transfer-summary", 4, "ngIf"], [1, "lead-activity-transfer-summary"], [1, "lead-activity-transfer-summary__header"], [1, "pi", "pi-share-alt"], [1, "lead-activity-transfer-summary__text"], ["class", "lead-activity-transfer-summary__last", 4, "ngIf"], [1, "lead-activity-transfer-summary__last"], [1, "lead-activity-transfer-summary__label"], ["value", "documents-main"], [1, "pi", "pi-paperclip"], [1, "form-section", "supporting-documents-panel", "form-section--accordion-body"], [1, "supporting-documents-header"], [1, "supporting-documents-stats"], [1, "docs-usage-pill"], ["class", "docs-remaining-pill", 4, "ngIf"], ["class", "docs-limit-pill", 4, "ngIf"], [1, "supporting-documents-uploader"], ["mode", "basic", "chooseLabel", "Upload file", "styleClass", "lead-doc-upload", 3, "uploadHandler", "customUpload", "auto", "disabled"], [1, "docs-policy-note"], ["class", "supporting-documents-list", 4, "ngIf", "ngIfElse"], [1, "docs-remaining-pill"], [1, "docs-limit-pill"], [1, "supporting-documents-list"], ["styleClass", "compact-table docs-table", 3, "value", "paginator", "rows"], [1, "docs-file-name"], [1, "table-actions"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "pi", "pi-trash"], ["type", "button", "title", "Download", 1, "row-action-btn", "row-action-btn--view", 3, "click", "disabled"], [1, "pi", "pi-download"], ["value", "history-main"], [1, "pi", "pi-history"], ["class", "history-list history-list--merged", 4, "ngIf", "ngIfElse"], ["value", "history-score-audit"], ["class", "history-list", 4, "ngIf", "ngIfElse"], ["value", "history-related-emails"], [1, "history-meta"], [1, "history-notes"], ["class", "history-meta", 4, "ngIf"], [1, "history-list", "history-list--merged"], ["class", "history-item history-item--merged", 4, "ngFor", "ngForOf"], [1, "history-item", "history-item--merged"], [1, "history-item__icon"], [1, "history-item__content"], [1, "history-header"], [1, "history-item__title"], [1, "history-time"], ["class", "history-notes", 4, "ngIf"], [1, "history-list"], ["class", "history-item", 4, "ngFor", "ngForOf"], [1, "history-item"], [3, "value"], ["type", "button", "class", "action-btn action-btn--settings", 3, "click", 4, "ngIf"], ["class", "history-item", 4, "ngFor", "ngForOf", "ngForTrackBy"]], template: function LeadFormPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 11);
            i0.ɵɵelement(1, "app-breadcrumbs");
            i0.ɵɵelementStart(2, "p-dialog", 12);
            i0.ɵɵlistener("visibleChange", function LeadFormPage_Template_p_dialog_visibleChange_2_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.convertFormActive.set($event)); })("onHide", function LeadFormPage_Template_p_dialog_onHide_2_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelConvert()); });
            i0.ɵɵelementStart(3, "div", 13)(4, "div", 14)(5, "p");
            i0.ɵɵtext(6, "Create account, contact, and opportunity from this lead.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 15)(8, "button", 16);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelConvert()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "button", 17);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.confirmConvert()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(10, "p-dialog", 18);
            i0.ɵɵlistener("visibleChange", function LeadFormPage_Template_p_dialog_visibleChange_10_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closureFormActive.set($event)); })("onHide", function LeadFormPage_Template_p_dialog_onHide_10_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelClosure()); });
            i0.ɵɵelementStart(11, "div", 13)(12, "div", 19)(13, "p-select", 20);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_Template_p_select_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.closureReason, $event) || (ctx.closureReason = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(14, LeadFormPage_input_14_Template, 1, 1, "input", 21)(15, LeadFormPage_input_15_Template, 1, 1, "input", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 15)(17, "button", 16);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelClosure()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "button", 23);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.confirmClosure()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(19, "p-dialog", 24);
            i0.ɵɵlistener("visibleChange", function LeadFormPage_Template_p_dialog_visibleChange_19_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.draftPromptVisible.set($event)); })("onHide", function LeadFormPage_Template_p_dialog_onHide_19_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.dismissDraftPrompt()); });
            i0.ɵɵelementStart(20, "div", 25)(21, "div", 26)(22, "div", 27);
            i0.ɵɵelement(23, "i", 28);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div")(25, "h3");
            i0.ɵɵtext(26, "Resume a saved lead draft?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "p");
            i0.ɵɵtext(28, "You have saved lead drafts. Choose one to continue where you left off, or start with a blank form.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(29, LeadFormPage_div_29_Template, 2, 1, "div", 29)(30, LeadFormPage_ng_template_30_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(32, "div", 15)(33, "button", 30);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_33_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.dismissDraftPrompt()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "button", 31);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_34_listener() { i0.ɵɵrestoreView(_r1); ctx.dismissDraftPrompt(); return i0.ɵɵresetView(ctx.openDraftLibrary()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(35, "p-dialog", 32);
            i0.ɵɵlistener("visibleChange", function LeadFormPage_Template_p_dialog_visibleChange_35_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.draftOpenConfirmVisible.set($event)); })("onHide", function LeadFormPage_Template_p_dialog_onHide_35_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelOpenDraft()); });
            i0.ɵɵelementStart(36, "div", 13)(37, "div", 14)(38, "p");
            i0.ɵɵtext(39, "Your current unsaved changes will be replaced by the selected draft.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "div", 15)(41, "button", 16);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_41_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.cancelOpenDraft()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "button", 33);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_42_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.confirmOpenDraft()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(43, "p-dialog", 34);
            i0.ɵɵlistener("visibleChange", function LeadFormPage_Template_p_dialog_visibleChange_43_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.leavePromptVisible.set($event)); })("onHide", function LeadFormPage_Template_p_dialog_onHide_43_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.stayOnForm()); });
            i0.ɵɵelementStart(44, "div", 35)(45, "div", 36)(46, "div", 37);
            i0.ɵɵelement(47, "i", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div")(49, "h3");
            i0.ɵɵtext(50, "Your lead form has unsaved changes.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "p");
            i0.ɵɵtext(52, "Choose whether to save the current state as a draft, submit the lead now, or leave without saving.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(53, "div", 39)(54, "button", 40);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_54_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.stayOnForm()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "button", 41);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_55_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.leaveWithoutSaving()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "button", 42);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_56_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.saveDraftAndLeave()); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "button", 43);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_57_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.submitAndLeave()); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(58, "p-dialog", 44);
            i0.ɵɵlistener("visibleChange", function LeadFormPage_Template_p_dialog_visibleChange_58_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.draftLibraryVisible.set($event)); })("onHide", function LeadFormPage_Template_p_dialog_onHide_58_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeDraftLibrary()); });
            i0.ɵɵelementStart(59, "div", 45);
            i0.ɵɵtemplate(60, LeadFormPage_p_60_Template, 2, 0, "p", 46)(61, LeadFormPage_div_61_Template, 2, 1, "div", 47);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(62, "p-dialog", 18);
            i0.ɵɵlistener("visibleChange", function LeadFormPage_Template_p_dialog_visibleChange_62_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.duplicateDialogVisible.set($event)); })("onHide", function LeadFormPage_Template_p_dialog_onHide_62_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.dismissDuplicateDialog()); });
            i0.ɵɵelementStart(63, "div", 48)(64, "p", 49);
            i0.ɵɵtext(65);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(66, LeadFormPage_div_66_Template, 2, 1, "div", 50)(67, LeadFormPage_ng_template_67_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(69, "div", 51)(70, "button", 16);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_70_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.dismissDuplicateDialog()); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(71, LeadFormPage_button_71_Template, 1, 0, "button", 52);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(72, "header", 53)(73, "div", 54)(74, "div", 55)(75, "button", 56);
            i0.ɵɵelement(76, "i", 57);
            i0.ɵɵelementStart(77, "span");
            i0.ɵɵtext(78, "Back to leads");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(79, LeadFormPage_button_79_Template, 4, 0, "button", 58);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "div", 59)(81, "div", 60)(82, "h1", 61)(83, "span", 62);
            i0.ɵɵtext(84);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(85, "span", 63);
            i0.ɵɵtext(86, "Lead");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(87, "p");
            i0.ɵɵtext(88);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(89, LeadFormPage_div_89_Template, 5, 1, "div", 64)(90, LeadFormPage_div_90_Template, 13, 12, "div", 65)(91, LeadFormPage_div_91_Template, 4, 1, "div", 66)(92, LeadFormPage_div_92_Template, 4, 0, "div", 67)(93, LeadFormPage_div_93_Template, 4, 1, "div", 68)(94, LeadFormPage_div_94_Template, 4, 1, "div", 69);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(95, LeadFormPage_div_95_Template, 53, 31, "div", 70);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(96, LeadFormPage_div_96_Template, 7, 1, "div", 71)(97, LeadFormPage_section_97_Template, 6, 4, "section", 72);
            i0.ɵɵelementStart(98, "main", 73)(99, "form", 74);
            i0.ɵɵlistener("ngSubmit", function LeadFormPage_Template_form_ngSubmit_99_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSave()); });
            i0.ɵɵelementStart(100, "fieldset", 75)(101, "p-tabs", 76);
            i0.ɵɵlistener("valueChange", function LeadFormPage_Template_p_tabs_valueChange_101_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onActiveTabChange($event)); });
            i0.ɵɵelementStart(102, "p-tablist", 77)(103, "p-tab", 78)(104, "span", 79);
            i0.ɵɵtext(105, "Overview");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(106, "p-tab", 80)(107, "span", 79);
            i0.ɵɵtext(108, "Activity &");
            i0.ɵɵelement(109, "br");
            i0.ɵɵtext(110, "Follow-up");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(111, LeadFormPage_span_111_Template, 2, 1, "span", 81);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(112, "p-tab", 82)(113, "span", 79);
            i0.ɵɵtext(114, "Qualifications");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(115, LeadFormPage_span_115_Template, 2, 1, "span", 83);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(116, "p-tab", 84)(117, "span", 79);
            i0.ɵɵtext(118, "Supporting");
            i0.ɵɵelement(119, "br");
            i0.ɵɵtext(120, "Documents");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(121, LeadFormPage_span_121_Template, 2, 1, "span", 85);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(122, "p-tab", 86)(123, "span", 79);
            i0.ɵɵtext(124, "History");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(125, "p-tabpanels")(126, "p-tabpanel", 87)(127, "p-accordion", 88);
            i0.ɵɵlistener("valueChange", function LeadFormPage_Template_p_accordion_valueChange_127_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onAccordionValueChange("overview", $event)); });
            i0.ɵɵelementStart(128, "p-accordion-panel", 89)(129, "p-accordion-header")(130, "h2", 90);
            i0.ɵɵelement(131, "i", 91);
            i0.ɵɵtext(132, " Lead basics ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(133, "p-accordion-content")(134, "section", 92)(135, "div", 93)(136, "div", 94)(137, "div", 95)(138, "label", 96);
            i0.ɵɵtext(139, "First name ");
            i0.ɵɵelementStart(140, "span", 97);
            i0.ɵɵtext(141, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(142, "p-inputgroup")(143, "p-inputgroup-addon", 98);
            i0.ɵɵelement(144, "i", 91);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(145, "input", 99);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_Template_input_ngModelChange_145_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.firstName, $event) || (ctx.form.firstName = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(146, "div", 95)(147, "label", 100);
            i0.ɵɵtext(148, "Last name ");
            i0.ɵɵelementStart(149, "span", 97);
            i0.ɵɵtext(150, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(151, "p-inputgroup")(152, "p-inputgroup-addon", 98);
            i0.ɵɵelement(153, "i", 91);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(154, "input", 101);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_Template_input_ngModelChange_154_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.lastName, $event) || (ctx.form.lastName = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(155, "div", 95)(156, "label", 102);
            i0.ɵɵtext(157, "Company");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(158, "p-inputgroup")(159, "p-inputgroup-addon", 103);
            i0.ɵɵelement(160, "i", 104);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(161, "input", 105);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_Template_input_ngModelChange_161_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.companyName, $event) || (ctx.form.companyName = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(162, "div", 106)(163, "label", 107);
            i0.ɵɵtext(164, "Lead summary");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(165, "p", 108);
            i0.ɵɵtext(166, "Initial business context for the lead.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(167, "textarea", 109);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_Template_textarea_ngModelChange_167_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.leadSummary, $event) || (ctx.form.leadSummary = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(168, "div", 110)(169, "label");
            i0.ɵɵtext(170, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(171, "p-select", 111);
            i0.ɵɵlistener("ngModelChange", function LeadFormPage_Template_p_select_ngModelChange_171_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onStatusSelectionChange($event)); });
            i0.ɵɵtemplate(172, LeadFormPage_ng_template_172_Template, 4, 3, "ng-template", 112)(173, LeadFormPage_ng_template_173_Template, 2, 2, "ng-template", 113);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(174, LeadFormPage_div_174_Template, 4, 2, "div", 114);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(175, "div", 95)(176, "label");
            i0.ɵɵtext(177, "Assignment");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(178, "p-select", 115);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_Template_p_select_ngModelChange_178_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.assignmentStrategy, $event) || (ctx.form.assignmentStrategy = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵtemplate(179, LeadFormPage_ng_template_179_Template, 2, 2, "ng-template", 112)(180, LeadFormPage_ng_template_180_Template, 2, 2, "ng-template", 113);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(181, LeadFormPage_div_181_Template, 6, 4, "div", 116);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(182, "p-accordion-panel", 117)(183, "p-accordion-header")(184, "h2", 90);
            i0.ɵɵelement(185, "i", 118);
            i0.ɵɵtext(186, " Contact details ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(187, "p-accordion-content")(188, "section", 92)(189, "div", 93)(190, "div", 119)(191, "div", 95)(192, "label", 120);
            i0.ɵɵtext(193, "Email");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(194, "p-inputgroup")(195, "p-inputgroup-addon", 121);
            i0.ɵɵelement(196, "i", 122);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(197, "input", 123);
            i0.ɵɵlistener("ngModelChange", function LeadFormPage_Template_input_ngModelChange_197_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onEmailChange($event)); });
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(198, LeadFormPage_a_198_Template, 3, 0, "a", 124)(199, LeadFormPage_p_199_Template, 2, 1, "p", 125);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(200, "div", 95)(201, "label", 126);
            i0.ɵɵtext(202, "Phone");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(203, "div", 127)(204, "p-select", 128);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_Template_p_select_ngModelChange_204_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.phoneTypeId, $event) || (ctx.form.phoneTypeId = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(205, "p-select", 129);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_Template_p_select_ngModelChange_205_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.phoneCountryIso, $event) || (ctx.phoneCountryIso = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵlistener("ngModelChange", function LeadFormPage_Template_p_select_ngModelChange_205_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onPhoneCountryChange($event)); });
            i0.ɵɵtemplate(206, LeadFormPage_ng_template_206_Template, 1, 1, "ng-template", 130)(207, LeadFormPage_ng_template_207_Template, 5, 3, "ng-template", 112);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(208, LeadFormPage_ng_container_208_Template, 2, 6, "ng-container", 131)(209, LeadFormPage_ng_template_209_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(211, LeadFormPage_p_211_Template, 2, 1, "p", 125);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(212, "div", 95)(213, "label", 132);
            i0.ɵɵtext(214, "Job title");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(215, "p-inputgroup")(216, "p-inputgroup-addon", 133);
            i0.ɵɵelement(217, "i", 134);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(218, "input", 135);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_Template_input_ngModelChange_218_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.jobTitle, $event) || (ctx.form.jobTitle = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(219, "div", 95)(220, "label", 136);
            i0.ɵɵtext(221, "Source");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(222, "p-inputgroup")(223, "p-inputgroup-addon", 137);
            i0.ɵɵelement(224, "i", 138);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(225, "input", 139);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_Template_input_ngModelChange_225_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.source, $event) || (ctx.form.source = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(226, LeadFormPage_div_226_Template, 7, 4, "div", 116);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵtemplate(227, LeadFormPage_p_accordion_panel_227_Template, 24, 8, "p-accordion-panel", 140);
            i0.ɵɵelementStart(228, "p-accordion-panel", 141)(229, "p-accordion-header")(230, "h2", 142);
            i0.ɵɵelement(231, "i", 143);
            i0.ɵɵelementStart(232, "span");
            i0.ɵɵtext(233, "Score");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(234, "span", 144)(235, "span", 145);
            i0.ɵɵtext(236);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(237, LeadFormPage_span_237_Template, 2, 1, "span", 146)(238, LeadFormPage_span_238_Template, 2, 1, "span", 146);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(239, "p-accordion-content")(240, "section", 147);
            i0.ɵɵtemplate(241, LeadFormPage_p_progressBar_241_Template, 1, 0, "p-progressBar", 148);
            i0.ɵɵelementStart(242, "div", 119)(243, "div", 149)(244, "label", 150);
            i0.ɵɵtext(245, "Score");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(246, "div", 151)(247, "p-inputNumber", 152);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_Template_p_inputNumber_ngModelChange_247_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.score, $event) || (ctx.form.score = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(248, "div", 153)(249, "p", 154);
            i0.ɵɵtext(250, " Primary prioritization score, calculated from lead signals and qualification factors. Manual entry is disabled. ");
            i0.ɵɵtemplate(251, LeadFormPage_span_251_Template, 2, 1, "span", 155);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(252, LeadFormPage_p_tag_252_Template, 1, 1, "p-tag", 156)(253, LeadFormPage_p_tag_253_Template, 1, 1, "p-tag", 157);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(254, LeadFormPage_div_254_Template, 7, 2, "div", 158);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(255, "div", 95)(256, "label", 159);
            i0.ɵɵtext(257, "Territory");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(258, "p-inputgroup")(259, "p-inputgroup-addon", 160);
            i0.ɵɵelement(260, "i", 161);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(261, "input", 162);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_Template_input_ngModelChange_261_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.territory, $event) || (ctx.form.territory = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()()()()()()()();
            i0.ɵɵelementStart(262, "p-tabpanel", 163);
            i0.ɵɵtemplate(263, LeadFormPage_section_263_Template, 76, 16, "section", 164);
            i0.ɵɵelementStart(264, "p-accordion", 165);
            i0.ɵɵlistener("valueChange", function LeadFormPage_Template_p_accordion_valueChange_264_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onAccordionValueChange("qualification", $event)); });
            i0.ɵɵelementStart(265, "p-accordion-panel", 166)(266, "p-accordion-header")(267, "h2", 142);
            i0.ɵɵelement(268, "i", 143);
            i0.ɵɵtext(269, " Qualification factors ");
            i0.ɵɵelementStart(270, "span", 144)(271, "span", 145);
            i0.ɵɵtext(272);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(273, LeadFormPage_span_273_Template, 2, 1, "span", 146);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(274, "p-accordion-content")(275, "section", 167)(276, "div", 168);
            i0.ɵɵtemplate(277, LeadFormPage_article_277_Template, 30, 15, "article", 169);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(278, "p-accordion-panel", 170)(279, "p-accordion-header")(280, "h2", 142);
            i0.ɵɵelement(281, "i", 171);
            i0.ɵɵtext(282, " Context & supporting notes ");
            i0.ɵɵelementStart(283, "span", 144)(284, "span", 172);
            i0.ɵɵtext(285);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(286, "p-accordion-content")(287, "section", 167)(288, "div", 119)(289, "div", 106)(290, "label", 173);
            i0.ɵɵtext(291, "Context & supporting notes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(292, "p", 108);
            i0.ɵɵtext(293, "Context only. Does not change Score.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(294, "textarea", 174);
            i0.ɵɵtwoWayListener("ngModelChange", function LeadFormPage_Template_textarea_ngModelChange_294_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.form.qualifiedNotes, $event) || (ctx.form.qualifiedNotes = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(295, "p-accordion-panel", 175)(296, "p-accordion-header")(297, "h2", 142);
            i0.ɵɵelement(298, "i", 176);
            i0.ɵɵtext(299, " Disposition & outcome details ");
            i0.ɵɵelementStart(300, "span", 144)(301, "span", 172);
            i0.ɵɵtext(302);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(303, "p-accordion-content")(304, "section", 167)(305, "div", 119);
            i0.ɵɵtemplate(306, LeadFormPage_div_306_Template, 9, 0, "div", 177)(307, LeadFormPage_div_307_Template, 6, 1, "div", 116)(308, LeadFormPage_div_308_Template, 6, 2, "div", 177)(309, LeadFormPage_div_309_Template, 6, 2, "div", 177)(310, LeadFormPage_div_310_Template, 9, 1, "div", 116)(311, LeadFormPage_div_311_Template, 6, 1, "div", 177);
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(312, "p-tabpanel", 178);
            i0.ɵɵtemplate(313, LeadFormPage_p_accordion_313_Template, 68, 14, "p-accordion", 179);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(314, "p-tabpanel", 180);
            i0.ɵɵtemplate(315, LeadFormPage_p_accordion_315_Template, 25, 13, "p-accordion", 179);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(316, "p-tabpanel", 181);
            i0.ɵɵtemplate(317, LeadFormPage_p_accordion_317_Template, 41, 13, "p-accordion", 179);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(318, "footer", 182)(319, "button", 183);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_319_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.router.navigate(["/app/leads"])); });
            i0.ɵɵelement(320, "i", 184);
            i0.ɵɵelementStart(321, "span");
            i0.ɵɵtext(322, "Cancel");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(323, "button", 185);
            i0.ɵɵlistener("click", function LeadFormPage_Template_button_click_323_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSave()); });
            i0.ɵɵelement(324, "i", 186);
            i0.ɵɵelementStart(325, "span");
            i0.ɵɵtext(326);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(327, "p-splitbutton", 187);
            i0.ɵɵlistener("onClick", function LeadFormPage_Template_p_splitbutton_onClick_327_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.saveDraft()); });
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            const noLeadPromptDrafts_r104 = i0.ɵɵreference(31);
            const noDuplicateMatches_r105 = i0.ɵɵreference(68);
            const plainPhoneInput_r106 = i0.ɵɵreference(210);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(175, _c0));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.convertFormActive());
            i0.ɵɵadvance(8);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(176, _c1));
            i0.ɵɵproperty("header", ctx.closureFormStatus() === "Lost" ? "Mark Lead as Lost" : "Disqualify Lead")("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.closureFormActive());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("options", ctx.closureFormStatus() === "Lost" ? ctx.lossReasonOptions() : ctx.disqualificationReasonOptions());
            i0.ɵɵtwoWayProperty("ngModel", ctx.closureReason);
            i0.ɵɵproperty("placeholder", ctx.closureFormStatus() === "Lost" ? "Loss reason *" : "Disqualification reason *");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.closureFormStatus() === "Lost");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.closureFormStatus() === "Lost");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("label", ctx.closureFormStatus() === "Lost" ? "Confirm Lost" : "Confirm Disqualified")("disabled", !ctx.closureReason.trim());
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(177, _c2));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.draftPromptVisible());
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", ctx.recentDrafts().length)("ngIfElse", noLeadPromptDrafts_r104);
            i0.ɵɵadvance(6);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(178, _c0));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.draftOpenConfirmVisible());
            i0.ɵɵadvance(8);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(179, _c3));
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
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(180, _c4));
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.draftLibraryVisible());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.draftLibraryLoading() && !ctx.draftLibraryItems().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.draftLibraryItems().length);
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(181, _c5));
            i0.ɵɵproperty("header", ctx.duplicateDialogTitle())("modal", true)("draggable", false)("resizable", false)("closable", true)("dismissableMask", true)("visible", ctx.duplicateDialogVisible());
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.duplicateDialogMessage());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.duplicateMatches().length)("ngIfElse", noDuplicateMatches_r105);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", !ctx.duplicateIsBlocked());
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Edit" : "Create New");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.isEditMode() ? "Update lead details and status" : "Add a new lead to your pipeline");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode() && ctx.leadNumber());
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
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showStatusStepper());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode() && ctx.isReadOnlyDueToEditing());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.isReadOnlyDueToEditing());
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.activeTab());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.isTabDisabled("overview"))("pt", i0.ɵɵpureFunction1(183, _c7, i0.ɵɵpureFunction0(182, _c6)));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.isTabDisabled("activity"))("pt", i0.ɵɵpureFunction1(186, _c7, i0.ɵɵpureFunction0(185, _c6)));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.activityTabBadge());
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.isTabDisabled("qualification"))("pt", i0.ɵɵpureFunction1(189, _c7, i0.ɵɵpureFunction0(188, _c6)));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.qualificationTabBadge());
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.isTabDisabled("documents"))("pt", i0.ɵɵpureFunction1(192, _c7, i0.ɵɵpureFunction0(191, _c6)));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.isEditMode() && ctx.attachments().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.isTabDisabled("history"))("pt", i0.ɵɵpureFunction1(195, _c7, i0.ɵɵpureFunction0(194, _c6)));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("multiple", true)("value", ctx.overviewAccordionOpenPanels());
            i0.ɵɵadvance(18);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.firstName);
            i0.ɵɵadvance(9);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.lastName);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.companyName);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.leadSummary);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.statusOptionsForView())("ngModel", ctx.form.status);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.statusPolicyHint());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.assignmentOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.assignmentStrategy);
            i0.ɵɵproperty("disabled", !ctx.canEditAssignment());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.form.assignmentStrategy === "Manual");
            i0.ɵɵadvance(16);
            i0.ɵɵproperty("ngModel", ctx.form.email);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode() && ctx.form.email);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.emailError());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("options", ctx.phoneTypeOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.phoneTypeId);
            i0.ɵɵadvance();
            i0.ɵɵproperty("options", ctx.phoneCountryOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.phoneCountryIso);
            i0.ɵɵproperty("filter", true);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.phoneCountryIso)("ngIfElse", plainPhoneInput_r106);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.phoneError());
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.jobTitle);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.source);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.routingReason());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isBrokeragePreset());
            i0.ɵɵadvance(8);
            i0.ɵɵattribute("data-tone", ctx.overallScoreBadgeTone());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" Overall ", ctx.overallScoreBadgeValue(), "/100 ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.aiScoreConfidenceLabel());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.scoreSourceBadge());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.aiScoring());
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.score);
            i0.ɵɵproperty("min", 0)("max", 100)("disabled", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.form.autoScore);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.aiScoreConfidenceLabel());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.scoreSourceBadge());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.territory);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance();
            i0.ɵɵproperty("multiple", true)("value", ctx.qualificationAccordionOpenPanels());
            i0.ɵɵadvance(7);
            i0.ɵɵattribute("data-tone", ctx.qualificationFactorsBadgeTone());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.qualificationFactorsBadgeLabel(), " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.qualificationRequiredBadgeLabel());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.qualificationFactorCards());
            i0.ɵɵadvance(7);
            i0.ɵɵattribute("data-variant", ctx.qualifiedNotesBadgeVariant());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.qualifiedNotesBadgeLabel(), " ");
            i0.ɵɵadvance(9);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.qualifiedNotes);
            i0.ɵɵadvance(7);
            i0.ɵɵattribute("data-variant", ctx.dispositionBadgeVariant());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.dispositionBadgeLabel(), " ");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.canRecycleLead());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.form.status === "Nurture");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.form.status === "Disqualified");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.form.status === "Lost");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.form.status === "Lost");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.form.status === "Lost");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("disabled", ctx.saving() || ctx.draftSaving() || ctx.isReadOnlyDueToEditing());
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.primarySaveLabel());
            i0.ɵɵadvance();
            i0.ɵɵproperty("label", ctx.draftButtonLabel())("disabled", ctx.saving() || ctx.draftSaving() || ctx.isReadOnlyDueToEditing())("model", ctx.draftSplitButtonItems());
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, FormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.RequiredValidator, i2.NgModel, i2.NgForm, RouterLink,
            ButtonModule, i3.ButtonDirective, i4.PrimeTemplate, CheckboxModule,
            InputTextModule, i5.InputText, SelectModule, i6.Select, InputNumberModule, i7.InputNumber, TextareaModule, i8.Textarea, ProgressBarModule, i9.ProgressBar, KnobModule, i10.Knob, TableModule, i11.Table, FileUploadModule, i12.FileUpload, TagModule, i13.Tag, DialogModule, i14.Dialog, DatePickerModule, i15.DatePicker, TooltipModule, i16.Tooltip, InputGroupModule, i17.InputGroup, InputGroupAddonModule, i18.InputGroupAddon, InputMaskModule, i19.InputMask, TabsModule, i20.Tabs, i20.TabPanels, i20.TabPanel, i20.TabList, i20.Tab, AccordionModule, i21.Accordion, i21.AccordionPanel, i21.AccordionHeader, i21.AccordionContent, SplitButtonModule, i22.SplitButton, ChartModule, i23.UIChart, BreadcrumbsComponent, i1.TitleCasePipe, i1.DatePipe], styles: ["[_nghost-%COMP%] {\n      display: block;\n      width: 100%;\n      \n\n      --apple-blue: 0, 122, 255;\n      --apple-purple: 175, 82, 222;\n      --apple-pink: 255, 45, 85;\n      --apple-teal: 90, 200, 250;\n      --apple-green: 52, 199, 89;\n      --apple-gray-1: 142, 142, 147;\n      --apple-gray-2: 174, 174, 178;\n      --apple-gray-3: 199, 199, 204;\n      --apple-gray-4: 209, 209, 214;\n      --apple-gray-5: 229, 229, 234;\n      --apple-gray-6: 242, 242, 247;\n      --apple-label: 0, 0, 0;\n      --apple-secondary: 60, 60, 67;\n      --apple-tertiary: 60, 60, 67;\n      --apple-fill: 120, 120, 128;\n      \n      \n\n      --gradient-start: rgba(var(--apple-blue), 0.6);\n      --gradient-mid: rgba(var(--apple-purple), 0.4);\n      --gradient-end: rgba(var(--apple-teal), 0.5);\n    }\n\n    .lead-form-page[_ngcontent-%COMP%] {\n      min-height: 100vh;\n      width: 100%;\n      position: relative;\n      \n\n      background: \n        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(var(--apple-blue), 0.08) 0%, transparent 50%),\n        radial-gradient(ellipse 60% 40% at 90% 10%, rgba(var(--apple-purple), 0.06) 0%, transparent 40%),\n        radial-gradient(ellipse 50% 30% at 10% 60%, rgba(var(--apple-teal), 0.05) 0%, transparent 40%),\n        linear-gradient(180deg, \n          rgba(var(--apple-gray-6), 0.95) 0%, \n          rgba(255, 255, 255, 1) 40%,\n          rgba(var(--apple-gray-6), 0.3) 100%);\n      padding-bottom: 5rem;\n    }\n\n    \n\n    .lead-form-page[_ngcontent-%COMP%]::before {\n      content: '';\n      position: fixed;\n      top: -15%;\n      left: -5%;\n      width: 50%;\n      height: 50%;\n      background: radial-gradient(\n        circle,\n        rgba(var(--apple-blue), 0.08) 0%,\n        rgba(var(--apple-blue), 0.03) 30%,\n        transparent 60%\n      );\n      pointer-events: none;\n      z-index: 0;\n      animation: _ngcontent-%COMP%_float-orb-1 18s ease-in-out infinite;\n    }\n\n    .lead-form-page[_ngcontent-%COMP%]::after {\n      content: '';\n      position: fixed;\n      bottom: -20%;\n      right: -10%;\n      width: 60%;\n      height: 60%;\n      background: radial-gradient(\n        circle,\n        rgba(var(--apple-purple), 0.07) 0%,\n        rgba(var(--apple-teal), 0.03) 35%,\n        transparent 60%\n      );\n      pointer-events: none;\n      z-index: 0;\n      animation: _ngcontent-%COMP%_float-orb-2 22s ease-in-out infinite;\n    }\n\n    @keyframes _ngcontent-%COMP%_float-orb-1 {\n      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }\n      25% { transform: translate(30px, -20px) scale(1.05); opacity: 1; }\n      50% { transform: translate(15px, -40px) scale(1.02); opacity: 0.9; }\n      75% { transform: translate(-10px, -15px) scale(1.08); opacity: 1; }\n    }\n\n    @keyframes _ngcontent-%COMP%_float-orb-2 {\n      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }\n      33% { transform: translate(-25px, 25px) scale(1.06); opacity: 1; }\n      66% { transform: translate(15px, 10px) scale(0.98); opacity: 0.85; }\n    }\n\n    .page-header[_ngcontent-%COMP%] {\n      position: relative;\n      width: 100%;\n      top: auto;\n      z-index: 100;\n      \n\n      background: rgba(255, 255, 255, 0.65);\n      backdrop-filter: blur(40px) saturate(200%);\n      -webkit-backdrop-filter: blur(40px) saturate(200%);\n      \n\n      border-bottom: 1px solid transparent;\n      background-image: \n        linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)),\n        linear-gradient(90deg, rgba(var(--apple-gray-4), 0.3), rgba(var(--apple-gray-3), 0.2), rgba(var(--apple-gray-4), 0.3));\n      background-origin: border-box;\n      background-clip: padding-box, border-box;\n      padding: 1rem 1.5rem;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);\n      overflow-y: auto;\n      overscroll-behavior: contain;\n      scrollbar-gutter: stable;\n    }\n\n    .header-content[_ngcontent-%COMP%] {\n      width: 100%;\n      max-width: none;\n      margin: 0 auto;\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .back-link[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.375rem;\n      padding: 0.375rem 0.625rem 0.375rem 0.375rem;\n      margin-left: -0.375rem;\n      border: none;\n      background: transparent;\n      color: rgba(var(--apple-blue), 1);\n      font-size: 0.9375rem;\n      font-weight: 500;\n      letter-spacing: -0.01em;\n      border-radius: 8px;\n      cursor: pointer;\n      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    }\n\n    .back-link[_ngcontent-%COMP%]:hover {\n      background: rgba(var(--apple-blue), 0.1);\n      transform: translateX(-2px);\n    }\n\n    .back-link[_ngcontent-%COMP%]:active {\n      background: rgba(var(--apple-blue), 0.15);\n      transform: scale(0.97);\n    }\n\n    .back-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      font-size: 1rem;\n      transition: transform 0.2s ease;\n    }\n\n    .back-link[_ngcontent-%COMP%]:hover   i[_ngcontent-%COMP%] {\n      transform: translateX(-3px);\n    }\n\n    .header-row[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: stretch;\n      gap: 0.75rem;\n    }\n\n    .header-title[_ngcontent-%COMP%] {\n      flex-shrink: 0;\n      max-width: 34rem;\n    }\n\n    .header-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n      margin: 0 0 0.1rem;\n    }\n\n    .header-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n      color: #6b7280;\n      font-size: 0.92rem;\n      font-weight: 400;\n      max-width: 500px;\n      line-height: 1.45;\n      margin: 0;\n    }\n\n    .lead-record-number[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: baseline;\n      gap: 0.45rem;\n      margin-top: 0.55rem;\n      padding: 0.4rem 0.7rem;\n      border-radius: 999px;\n      background: rgba(var(--apple-blue), 0.08);\n      border: 1px solid rgba(var(--apple-blue), 0.16);\n      color: rgba(var(--apple-blue), 0.96);\n      width: fit-content;\n    }\n\n    .lead-record-number__label[_ngcontent-%COMP%] {\n      font-size: 0.74rem;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: rgba(var(--apple-secondary), 0.72);\n    }\n\n    .lead-header-progress[_ngcontent-%COMP%] {\n      --lead-header-score-color: #2563eb;\n      display: flex;\n      align-items: center;\n      gap: 0.7rem;\n      margin-top: 0.65rem;\n      padding: 0.55rem 0.7rem;\n      border-radius: 16px;\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.72));\n      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n      max-width: 29rem;\n    }\n\n    @media (min-width: 901px) {\n      .lead-header-progress[_ngcontent-%COMP%] {\n        display: none;\n      }\n    }\n\n    .lead-header-progress__dial[_ngcontent-%COMP%] {\n      flex: 0 0 auto;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 78px;\n      height: 78px;\n      border-radius: 16px;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(241, 245, 249, 0.7));\n      border: 1px solid rgba(148, 163, 184, 0.14);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.54),\n        0 10px 18px rgba(15, 23, 42, 0.05);\n    }\n\n    [_nghost-%COMP%]     .lead-header-progress__knob {\n      width: 72px;\n    }\n\n    [_nghost-%COMP%]     .lead-header-progress__knob .p-knob-text {\n      font-size: 0.86rem;\n      font-weight: 800;\n      fill: #1e293b;\n    }\n\n    .lead-header-progress__content[_ngcontent-%COMP%] {\n      min-width: 0;\n      display: grid;\n      gap: 0.22rem;\n      align-content: center;\n    }\n\n    .lead-header-progress__eyebrow[_ngcontent-%COMP%] {\n      font-size: 0.64rem;\n      font-weight: 800;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n    }\n\n    .lead-header-progress__meta[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n    }\n\n    .lead-header-progress__status[_ngcontent-%COMP%], \n   .lead-header-progress__step[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      min-height: 1.55rem;\n      padding: 0.14rem 0.45rem;\n      border-radius: 999px;\n      font-size: 0.7rem;\n      font-weight: 700;\n      border: 1px solid rgba(148, 163, 184, 0.16);\n      background: rgba(255, 255, 255, 0.72);\n      color: #1e293b;\n    }\n\n    .lead-header-progress__status[_ngcontent-%COMP%] {\n      color: #1d4ed8;\n      background: rgba(219, 234, 254, 0.82);\n      border-color: rgba(96, 165, 250, 0.28);\n    }\n\n    .lead-header-progress__copy[_ngcontent-%COMP%] {\n      margin: 0;\n      color: #475569;\n      font-size: 0.76rem;\n      line-height: 1.35;\n      max-width: 22rem;\n    }\n\n    .sla-strip[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n.sla-strip--inline[_ngcontent-%COMP%] {\n  margin: 0 0 1rem;\n}\n\n.sla-strip--sticky[_ngcontent-%COMP%] {\n  justify-content: flex-end;\n  margin-bottom: 0.45rem;\n}\n\n.sla-pill[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.5rem;\n      padding: 0.5rem 0.75rem;\n      border-radius: 999px;\n      font-weight: 600;\n      font-size: 0.875rem;\n      border: 1px solid rgba(148, 163, 184, 0.4);\n      background: rgba(255, 255, 255, 0.8);\n      color: #475569;\n\n      i {\n        font-size: 0.95rem;\n      }\n    }\n\n    .sla-pill.overdue[_ngcontent-%COMP%] {\n      background: rgba(239, 68, 68, 0.12);\n      color: #b91c1c;\n      border-color: rgba(239, 68, 68, 0.3);\n    }\n\n    .sla-pill.due[_ngcontent-%COMP%] {\n      background: rgba(245, 158, 11, 0.12);\n      color: #b45309;\n      border-color: rgba(245, 158, 11, 0.3);\n    }\n\n    .sla-pill.done[_ngcontent-%COMP%] {\n      background: rgba(34, 197, 94, 0.12);\n      color: #15803d;\n      border-color: rgba(34, 197, 94, 0.3);\n    }\n\n    .sla-pill.pending[_ngcontent-%COMP%] {\n      background: rgba(148, 163, 184, 0.12);\n      color: #475569;\n      border-color: rgba(148, 163, 184, 0.3);\n    }\n\n    .sla-label[_ngcontent-%COMP%] {\n      white-space: nowrap;\n    }\n\n    .sla-time[_ngcontent-%COMP%] {\n      color: #334155;\n      font-weight: 500;\n    }\n\n    .sla-meta[_ngcontent-%COMP%] {\n      font-size: 0.85rem;\n      color: #64748b;\n    }\n\n    .header-top[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 1rem;\n      flex-wrap: wrap;\n    }\n\n    .form-container[_ngcontent-%COMP%] {\n      position: relative;\n      z-index: 1;\n      width: 100%;\n      max-width: none;\n      margin: 0 auto;\n      padding: 1rem;\n    }\n\n.lead-status-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.lead-status-dialog__body[_ngcontent-%COMP%] {\n  color: #475569;\n  font-size: 0.95rem;\n  line-height: 1.55;\n}\n\n.lead-status-dialog__body--stacked[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.85rem;\n}\n\n.lead-status-dialog__actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n\n.lead-sticky-meta[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n      margin-top: 0.35rem;\n    }\n\n    .status-chip[_ngcontent-%COMP%], \n   .score-chip[_ngcontent-%COMP%], \n   .confidence-chip[_ngcontent-%COMP%], \n   .truth-chip[_ngcontent-%COMP%], \n   .assumption-chip[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.3rem 0.65rem;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      font-weight: 600;\n      background: rgba(99, 102, 241, 0.12);\n      color: #4338ca;\n    }\n\n    .score-chip[_ngcontent-%COMP%] {\n      background: rgba(15, 118, 110, 0.12);\n      color: #0f766e;\n    }\n\n    .score-stack[_ngcontent-%COMP%] {\n      display: inline-flex;\n      flex-direction: column;\n      gap: 0.2rem;\n    }\n\n    .score-primary[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.34rem 0.72rem;\n      border-radius: 10px;\n      font-size: 0.82rem;\n      font-weight: 700;\n      color: #0f766e;\n      background: linear-gradient(140deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.14));\n      border: 1px solid rgba(13, 148, 136, 0.28);\n      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);\n    }\n\n    .score-subtitles[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.35rem;\n      flex-wrap: wrap;\n    }\n\n    .score-subtitle[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.2rem 0.5rem;\n      border-radius: 8px;\n      font-size: 0.72rem;\n      font-weight: 600;\n      color: #0e7490;\n      background: rgba(14, 116, 144, 0.1);\n      border: 1px solid rgba(14, 116, 144, 0.16);\n    }\n\n    .confidence-chip[_ngcontent-%COMP%] {\n      background: rgba(14, 116, 144, 0.12);\n      color: #0e7490;\n    }\n\n    .truth-chip[_ngcontent-%COMP%] {\n      background: rgba(16, 185, 129, 0.12);\n      color: #047857;\n    }\n\n    .assumption-chip[_ngcontent-%COMP%] {\n      background: rgba(234, 88, 12, 0.12);\n      color: #c2410c;\n    }\n\n    .field-error[_ngcontent-%COMP%] {\n      margin: 0.35rem 0 0;\n      font-size: 0.75rem;\n      color: #b91c1c;\n    }\n\n    .field-hint[_ngcontent-%COMP%] {\n      margin: 0.35rem 0 0;\n      font-size: 0.75rem;\n      color: #64748b;\n    }\n\n    .lead-tabs-shell[_ngcontent-%COMP%] {\n      margin-bottom: 0.55rem;\n      padding: 0;\n      border-radius: 16px;\n      background: transparent;\n      border: none;\n      box-shadow: none;\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tablist {\n      display: flex;\n      gap: 0;\n      flex-wrap: nowrap;\n      padding: 0;\n      border-radius: 16px;\n      background: linear-gradient(180deg, rgba(23, 50, 93, 0.84), rgba(16, 37, 71, 0.9));\n      border: 1px solid rgba(148, 163, 184, 0.22);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.12),\n        0 8px 18px rgba(15, 23, 42, 0.08);\n      overflow: hidden;\n      position: relative;\n      backdrop-filter: blur(10px) saturate(125%);\n      -webkit-backdrop-filter: blur(10px) saturate(125%);\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tablist-tab-list {\n      border: none !important;\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab {\n      flex: 1 1 0;\n      min-width: 0;\n      min-height: 56px;\n      border: none;\n      border-radius: 0;\n      padding: 0.35rem 0.8rem 0.4rem;\n      font-size: 0.86rem;\n      font-weight: 700;\n      color: rgba(255, 255, 255, 0.96);\n      opacity: 1 !important;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      text-align: center;\n      line-height: 1.18;\n      cursor: pointer;\n      transition: transform 0.18s ease, filter 0.18s ease, box-shadow 0.18s ease;\n      position: relative;\n      overflow: visible;\n      z-index: 1;\n      text-shadow: 0 1px 2px rgba(15, 23, 42, 0.28);\n      background:\n        linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),\n        var(--lead-tab-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n      clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%, 14px 50%);\n      margin-right: -20px;\n      filter: brightness(1) saturate(1);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.1),\n        inset 0 -1px 0 rgba(255, 255, 255, 0.08);\n      backdrop-filter: blur(8px) saturate(120%);\n      -webkit-backdrop-filter: blur(8px) saturate(120%);\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab::before {\n      content: '';\n      position: absolute;\n      inset: 0 0 auto 0;\n      height: 45%;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));\n      opacity: 0.8;\n      pointer-events: none;\n      clip-path: inherit;\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab::after {\n      content: '';\n      position: absolute;\n      left: 6%;\n      right: 8%;\n      bottom: 4px;\n      height: 2px;\n      border-radius: 999px;\n      background: linear-gradient(90deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.12));\n      opacity: 0.45;\n      pointer-events: none;\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab:first-child {\n      clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%);\n      margin-left: 0;\n      border-top-left-radius: 12px;\n      border-bottom-left-radius: 12px;\n      z-index: 2;\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab:last-child {\n      clip-path: polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%);\n      margin-right: 0;\n      border-top-right-radius: 12px;\n      border-bottom-right-radius: 12px;\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab:nth-child(1) {\n      --lead-tab-bg: linear-gradient(135deg, #3f8dff 0%, #2364da 100%);\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab:nth-child(2) {\n      --lead-tab-bg: linear-gradient(135deg, #36c3df 0%, #1497c0 100%);\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab:nth-child(3) {\n      --lead-tab-bg: linear-gradient(135deg, #ffaf47 0%, #f07f10 100%);\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab:nth-child(4) {\n      --lead-tab-bg: linear-gradient(135deg, #8b6bff 0%, #6948e4 100%);\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab:nth-child(5) {\n      --lead-tab-bg: linear-gradient(135deg, #6f84aa 0%, #556f94 100%);\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab.p-tab-active, \n   [_nghost-%COMP%]     .lead-tabs .p-tab[aria-selected='true'], \n   [_nghost-%COMP%]     .lead-tabs .p-tab[data-p-active='true'] {\n      z-index: 4;\n      opacity: 1;\n      filter: brightness(1.05) saturate(1.1);\n      background:\n        linear-gradient(180deg, rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.12)),\n        radial-gradient(circle at 50% 16%, rgba(255, 255, 255, 0.28), transparent 58%),\n        var(--lead-tab-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.32),\n        inset 0 -1px 0 rgba(255, 255, 255, 0.2),\n        0 0 0 1px rgba(255, 255, 255, 0.28),\n        0 0 0 3px rgba(255, 255, 255, 0.12),\n        0 10px 22px rgba(15, 23, 42, 0.22),\n        0 0 32px rgba(125, 211, 252, 0.3);\n      transform: translateY(-2px) scale(1.02);\n      animation: _ngcontent-%COMP%_lead-tab-breathe 1.8s ease-in-out infinite;\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab.p-tab-active .lead-tab-label, \n   [_nghost-%COMP%]     .lead-tabs .p-tab[aria-selected='true'] .lead-tab-label, \n   [_nghost-%COMP%]     .lead-tabs .p-tab[data-p-active='true'] .lead-tab-label {\n      color: #ffffff;\n      text-shadow: 0 1px 1px rgba(15, 23, 42, 0.18), 0 0 12px rgba(255, 255, 255, 0.16);\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab.p-tab-active::after, \n   [_nghost-%COMP%]     .lead-tabs .p-tab[aria-selected='true']::after, \n   [_nghost-%COMP%]     .lead-tabs .p-tab[data-p-active='true']::after {\n      height: 3px;\n      bottom: 3px;\n      left: 8%;\n      right: 10%;\n      opacity: 1;\n      background: linear-gradient(\n        90deg,\n        rgba(255, 255, 255, 0.16) 0%,\n        rgba(239, 68, 68, 0.95) 12%,\n        rgba(245, 158, 11, 0.95) 26%,\n        rgba(250, 204, 21, 0.95) 38%,\n        rgba(34, 197, 94, 0.95) 50%,\n        rgba(59, 130, 246, 0.98) 64%,\n        rgba(139, 92, 246, 0.98) 78%,\n        rgba(236, 72, 153, 0.95) 90%,\n        rgba(255, 255, 255, 0.18) 100%\n      );\n      box-shadow:\n        0 0 6px rgba(255, 255, 255, 0.35),\n        0 0 14px rgba(59, 130, 246, 0.28),\n        0 0 20px rgba(236, 72, 153, 0.2),\n        0 1px 0 rgba(15, 23, 42, 0.12);\n      background-size: 320% 100%;\n      animation: _ngcontent-%COMP%_lead-tab-active-strip 3.4s linear infinite;\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab.p-tab-active::before, \n   [_nghost-%COMP%]     .lead-tabs .p-tab[aria-selected='true']::before, \n   [_nghost-%COMP%]     .lead-tabs .p-tab[data-p-active='true']::before {\n      opacity: 0.95;\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab:not(.p-tab-active):not([aria-selected='true']):not([data-p-active='true']) {\n      opacity: 1;\n      transition: opacity 250ms, transform 250ms, filter 250ms;\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab:hover:not(.p-disabled):not(.p-tab-active):not([aria-selected='true']):not([data-p-active='true']) {\n      opacity: 1;\n      transform: translateY(-1px);\n      filter: brightness(1.05) saturate(1.05);\n      z-index: 6;\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab:focus-visible {\n      outline: none;\n      z-index: 6;\n      box-shadow:\n        0 0 0 2px rgba(255, 255, 255, 0.28),\n        0 0 0 5px rgba(59, 130, 246, 0.2);\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab.p-disabled {\n      cursor: not-allowed;\n      opacity: 0.62;\n      filter: grayscale(0.08) saturate(0.65);\n    }\n\n    .tab-badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      position: absolute;\n      top: 8px;\n      right: 14px;\n      min-width: 18px;\n      height: 18px;\n      padding: 0 0.35rem;\n      border-radius: 999px;\n      font-size: 0.62rem;\n      font-weight: 700;\n      background: rgba(255, 255, 255, 0.22);\n      color: #fff;\n      border: 1px solid rgba(255, 255, 255, 0.28);\n      text-shadow: none;\n    }\n\n    .tab-badge.warn[_ngcontent-%COMP%] {\n      background: rgba(255, 255, 255, 0.24);\n      color: #fff;\n    }\n\n    .tab-badge.danger[_ngcontent-%COMP%] {\n      background: linear-gradient(180deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.92));\n      color: #fff;\n      border-color: rgba(255, 255, 255, 0.22);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.2),\n        0 6px 12px rgba(185, 28, 28, 0.22);\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab.p-tab-active .tab-badge, \n   [_nghost-%COMP%]     .lead-tabs .p-tab.p-tab-active .tab-badge.warn {\n      background: rgba(255, 255, 255, 0.34);\n      border-color: rgba(255, 255, 255, 0.4);\n      box-shadow: 0 0 10px rgba(255, 255, 255, 0.14);\n    }\n\n    [_nghost-%COMP%]     .lead-tabs .p-tab.p-tab-active .tab-badge.danger {\n      color: #fff;\n      text-shadow: 0 1px 1px rgba(127, 29, 29, 0.35);\n      background: linear-gradient(180deg, rgba(239, 68, 68, 1), rgba(220, 38, 38, 0.98));\n      border-color: rgba(255, 255, 255, 0.52);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.3),\n        0 0 0 1px rgba(127, 29, 29, 0.1),\n        0 0 14px rgba(239, 68, 68, 0.34);\n    }\n\n    .lead-tab-label[_ngcontent-%COMP%] {\n      display: inline-block;\n      max-width: 100%;\n      text-wrap: balance;\n      white-space: normal;\n      font-size: 0.88rem;\n      font-weight: 700;\n      letter-spacing: 0.005em;\n    }\n\n    @keyframes _ngcontent-%COMP%_lead-tab-breathe {\n      0%, 100% {\n        box-shadow:\n          inset 0 1px 0 rgba(255, 255, 255, 0.24),\n          inset 0 -1px 0 rgba(255, 255, 255, 0.16),\n          0 0 0 1px rgba(255, 255, 255, 0.2),\n          0 0 0 3px rgba(255, 255, 255, 0.08),\n          0 10px 18px rgba(15, 23, 42, 0.16),\n          0 0 20px rgba(125, 211, 252, 0.18);\n      }\n      50% {\n        box-shadow:\n          inset 0 1px 0 rgba(255, 255, 255, 0.28),\n          inset 0 -1px 0 rgba(255, 255, 255, 0.18),\n          0 0 0 1px rgba(255, 255, 255, 0.28),\n          0 0 0 4px rgba(255, 255, 255, 0.1),\n          0 12px 22px rgba(15, 23, 42, 0.18),\n          0 0 30px rgba(255, 255, 255, 0.16),\n          0 0 34px rgba(125, 211, 252, 0.24);\n      }\n    }\n\n    @keyframes _ngcontent-%COMP%_lead-tab-active-strip {\n      0%, 100% {\n        background-position: 0% 50%;\n        opacity: 0.88;\n        transform: scaleX(0.985);\n      }\n      50% {\n        background-position: 100% 50%;\n        opacity: 1;\n        transform: scaleX(1);\n      }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      [_nghost-%COMP%]     .lead-tabs .p-tab.p-tab-active {\n        animation: none;\n      }\n\n      [_nghost-%COMP%]     .lead-tabs .p-tab.p-tab-active::after {\n        animation: none;\n      }\n    }\n\n    @media (max-width: 980px) {\n      [_nghost-%COMP%]     .lead-tabs .p-tablist {\n        overflow-x: auto;\n        padding-bottom: 0.35rem;\n        scrollbar-width: thin;\n      }\n\n      [_nghost-%COMP%]     .lead-tabs .p-tab {\n        flex: 0 0 220px;\n        min-height: 56px;\n        font-size: 0.84rem;\n        margin-right: -18px;\n      }\n    }\n\n    @media (max-width: 768px) {\n      [_nghost-%COMP%]     .lead-tabs .p-tablist {\n        flex-wrap: wrap;\n        gap: 0.45rem;\n        overflow: visible;\n        padding: 0.45rem;\n        background:\n          linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(15, 23, 42, 0.08)),\n          linear-gradient(135deg, rgba(148, 163, 184, 0.18), rgba(59, 130, 246, 0.08));\n        border: 1px solid rgba(148, 163, 184, 0.28);\n        box-shadow:\n          inset 0 1px 0 rgba(255, 255, 255, 0.22),\n          0 10px 26px rgba(15, 23, 42, 0.08);\n      }\n\n      [_nghost-%COMP%]     .lead-tabs .p-tab {\n        flex: 1 1 calc(50% - 0.25rem);\n        min-width: 140px;\n        min-height: 52px;\n        margin-right: 0;\n        border-radius: 12px;\n        clip-path: none;\n        padding: 0.5rem 0.65rem;\n      }\n\n      [_nghost-%COMP%]     .lead-tabs .p-tab.p-tab-active {\n        transform: none;\n      }\n\n      [_nghost-%COMP%]     .lead-tabs .p-tab::before, \n   [_nghost-%COMP%]     .lead-tabs .p-tab::after {\n        clip-path: none;\n      }\n\n      .tab-badge[_ngcontent-%COMP%] {\n        top: 6px;\n        right: 8px;\n      }\n    }\n\n    .lead-form[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .overview-accordion-shell[_ngcontent-%COMP%], \n   .tab-content-accordion-shell[_ngcontent-%COMP%] {\n      display: block;\n      margin-bottom: 0.15rem;\n    }\n\n    .qualification-summary-card[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 1rem;\n      margin-bottom: 0.85rem;\n      padding: 1.05rem 1.15rem 1.15rem;\n      position: relative;\n      border-radius: 20px;\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      background:\n        radial-gradient(circle at 8% 12%, rgba(56, 189, 248, 0.22), transparent 42%),\n        radial-gradient(circle at 88% 10%, rgba(139, 92, 246, 0.18), transparent 48%),\n        radial-gradient(circle at 58% 92%, rgba(244, 114, 182, 0.12), transparent 30%),\n        linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.72));\n      box-shadow:\n        0 18px 38px rgba(15, 23, 42, 0.1),\n        0 0 0 1px rgba(255, 255, 255, 0.2),\n        inset 0 1px 0 rgba(255, 255, 255, 0.65),\n        inset 0 -1px 0 rgba(148, 163, 184, 0.08);\n      backdrop-filter: blur(18px) saturate(140%);\n      -webkit-backdrop-filter: blur(18px) saturate(140%);\n    }\n\n    .qualification-summary-card[_ngcontent-%COMP%]::before {\n      content: '';\n      position: absolute;\n      inset: 0;\n      border-radius: inherit;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));\n      pointer-events: none;\n    }\n\n    .qualification-summary-card__header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 0.9rem;\n      flex-wrap: wrap;\n    }\n\n    .qualification-summary-card__title[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: 0.6rem;\n      min-width: 0;\n    }\n\n    .qualification-summary-card__title[_ngcontent-%COMP%]    > i[_ngcontent-%COMP%] {\n      width: 2.4rem;\n      height: 2.4rem;\n      border-radius: 14px;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      color: #0f4ecf;\n      background: linear-gradient(135deg, rgba(59, 130, 246, 0.22), rgba(14, 165, 233, 0.14));\n      border: 1px solid rgba(96, 165, 250, 0.24);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.34),\n        0 12px 24px rgba(59, 130, 246, 0.12);\n      flex: 0 0 auto;\n      font-size: 1.05rem;\n    }\n\n    .qualification-summary-card__title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 2rem;\n      font-weight: 800;\n      letter-spacing: -0.02em;\n      color: #1f2640;\n    }\n\n    .qualification-summary-card__title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      margin: 0.2rem 0 0;\n      font-size: 1rem;\n      color: #667089;\n      line-height: 1.45;\n      max-width: 48rem;\n    }\n\n    .qualification-eyebrow[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.16rem 0.55rem;\n      border-radius: 999px;\n      margin-bottom: 0.2rem;\n      font-size: 0.72rem;\n      font-weight: 800;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      background: rgba(99, 102, 241, 0.12);\n      color: #5b5ce6;\n    }\n\n    .qualification-summary-card__actions[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.6rem;\n      margin-left: auto;\n    }\n\n    .qual-menu-btn[_ngcontent-%COMP%] {\n      width: 44px;\n      height: 44px;\n      border-radius: 14px;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: rgba(255, 255, 255, 0.85);\n      color: #667089;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      box-shadow: 0 10px 20px rgba(15, 23, 42, 0.06);\n      cursor: pointer;\n      transition: all 0.2s ease;\n\n      &:hover {\n        transform: translateY(-1px);\n        background: #ffffff;\n      }\n    }\n\n    \n\n    .readiness-score-row[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.65rem;\n      flex-wrap: wrap;\n      margin: 0.45rem 0 0.35rem;\n    }\n\n    .readiness-score-badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.35rem;\n      padding: 0.32rem 0.72rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.7);\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 6px 12px rgba(15, 23, 42, 0.04);\n\n      strong {\n        font-size: 1rem;\n        color: rgba(15, 23, 42, 0.9);\n      }\n\n      span {\n        font-size: 0.78rem;\n        font-weight: 600;\n        color: rgba(100, 116, 139, 0.8);\n      }\n\n      &[data-tone=\"high\"] {\n        background: rgba(34, 197, 94, 0.12);\n        border-color: rgba(34, 197, 94, 0.22);\n\n        strong { color: #166534; }\n        span { color: #15803d; }\n      }\n\n      &[data-tone=\"medium\"] {\n        background: rgba(59, 130, 246, 0.1);\n        border-color: rgba(59, 130, 246, 0.2);\n\n        strong { color: #1e40af; }\n        span { color: #2563eb; }\n      }\n\n      &[data-tone=\"low\"] {\n        background: rgba(245, 158, 11, 0.12);\n        border-color: rgba(245, 158, 11, 0.2);\n\n        strong { color: #92400e; }\n        span { color: #b45309; }\n      }\n\n      &[data-tone=\"none\"] {\n        strong { color: rgba(100, 116, 139, 0.7); }\n      }\n    }\n\n    .readiness-manager-chip[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      padding: 0.28rem 0.62rem;\n      border-radius: 999px;\n      font-size: 0.74rem;\n      font-weight: 700;\n      letter-spacing: 0.01em;\n      background: rgba(245, 158, 11, 0.12);\n      border: 1px solid rgba(245, 158, 11, 0.2);\n      color: #92400e;\n\n      i {\n        font-size: 0.72rem;\n        color: #f59e0b;\n      }\n    }\n\n    .readiness-summary[_ngcontent-%COMP%] {\n      margin: 0.25rem 0 0.45rem;\n      font-size: 0.84rem;\n      line-height: 1.55;\n      color: #334155;\n      font-weight: 500;\n    }\n\n    .readiness-primary-gap[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: 0.45rem;\n      padding: 0.55rem 0.68rem;\n      border-radius: 12px;\n      background: rgba(239, 68, 68, 0.06);\n      border: 1px solid rgba(239, 68, 68, 0.14);\n      margin-bottom: 0.45rem;\n\n      > i {\n        color: #ef4444;\n        font-size: 0.88rem;\n        margin-top: 2px;\n        flex-shrink: 0;\n      }\n\n      &__label {\n        display: block;\n        font-size: 0.68rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.06em;\n        color: rgba(239, 68, 68, 0.8);\n        margin-bottom: 1px;\n      }\n\n      strong {\n        font-size: 0.84rem;\n        color: #991b1b;\n        font-weight: 600;\n      }\n    }\n\n    \n\n    .readiness-score-hero[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.85rem;\n      margin: 0.55rem 0 0.5rem;\n    }\n\n    .readiness-score-hero__gauge[_ngcontent-%COMP%] {\n      position: relative;\n      width: 60px;\n      height: 60px;\n      flex-shrink: 0;\n\n      svg {\n        width: 100%;\n        height: 100%;\n        transform: rotate(-90deg);\n      }\n    }\n\n    .readiness-gauge-bg[_ngcontent-%COMP%] {\n      fill: none;\n      stroke: rgba(148, 163, 184, 0.2);\n      stroke-width: 3;\n    }\n\n    .readiness-gauge-fill[_ngcontent-%COMP%] {\n      fill: none;\n      stroke-width: 3;\n      stroke-linecap: round;\n      transition: stroke-dasharray 0.8s ease-out;\n      stroke: #94a3b8;\n\n      [data-tone=\"low\"]-shadowcsshost-no-combinator & , [data-tone=\"low\"] -shadowcsshost-no-combinator & { stroke: #ef4444; }\n      [data-tone=\"medium\"]-shadowcsshost-no-combinator & , [data-tone=\"medium\"] -shadowcsshost-no-combinator & { stroke: #f59e0b; }\n      [data-tone=\"high\"]-shadowcsshost-no-combinator & , [data-tone=\"high\"] -shadowcsshost-no-combinator & { stroke: #22c55e; }\n    }\n\n    .readiness-score-hero[data-tone=\"low\"][_ngcontent-%COMP%]   .readiness-gauge-fill[_ngcontent-%COMP%] { stroke: #ef4444; }\n    .readiness-score-hero[data-tone=\"medium\"][_ngcontent-%COMP%]   .readiness-gauge-fill[_ngcontent-%COMP%] { stroke: #f59e0b; }\n    .readiness-score-hero[data-tone=\"high\"][_ngcontent-%COMP%]   .readiness-gauge-fill[_ngcontent-%COMP%] { stroke: #22c55e; }\n\n    .readiness-score-hero__number[_ngcontent-%COMP%] {\n      position: absolute;\n      inset: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 1.1rem;\n      font-weight: 800;\n      color: rgba(15, 23, 42, 0.88);\n      letter-spacing: -0.02em;\n    }\n\n    .readiness-score-hero__content[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.4rem;\n    }\n\n    .readiness-score-hero__label-row[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n    }\n\n    .readiness-score-hero__denom[_ngcontent-%COMP%] {\n      font-size: 0.8rem;\n      font-weight: 600;\n      color: rgba(100, 116, 139, 0.7);\n    }\n\n    .readiness-score-hero__status-chip[_ngcontent-%COMP%] {\n      display: inline-flex;\n      padding: 0.22rem 0.6rem;\n      border-radius: 999px;\n      font-size: 0.72rem;\n      font-weight: 800;\n      letter-spacing: 0.04em;\n      text-transform: uppercase;\n      background: rgba(148, 163, 184, 0.15);\n      color: #475569;\n      border: 1.5px solid rgba(148, 163, 184, 0.25);\n\n      &[data-tone=\"low\"] {\n        background: rgba(239, 68, 68, 0.14);\n        border-color: rgba(239, 68, 68, 0.3);\n        color: #991b1b;\n      }\n\n      &[data-tone=\"medium\"] {\n        background: rgba(245, 158, 11, 0.14);\n        border-color: rgba(245, 158, 11, 0.28);\n        color: #92400e;\n      }\n\n      &[data-tone=\"high\"] {\n        background: rgba(34, 197, 94, 0.14);\n        border-color: rgba(34, 197, 94, 0.28);\n        color: #166534;\n      }\n    }\n\n    \n\n    .feedback-reasons-label[_ngcontent-%COMP%] {\n      display: block;\n      font-size: 0.68rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.07em;\n      color: rgba(30, 64, 175, 0.8);\n      margin-bottom: 0.45rem;\n    }\n\n    .verdict-chip-cloud[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.4rem;\n    }\n\n    .verdict-chip[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      padding: 0.28rem 0.6rem;\n      border-radius: 999px;\n      font-size: 0.76rem;\n      font-weight: 600;\n      line-height: 1.3;\n      border: 1.5px solid transparent;\n      background: rgba(148, 163, 184, 0.12);\n      color: #475569;\n\n      i { font-size: 0.72rem; }\n\n      &[data-tone=\"low\"] {\n        background: rgba(239, 68, 68, 0.1);\n        border-color: rgba(239, 68, 68, 0.2);\n        color: #991b1b;\n        i { color: #ef4444; }\n      }\n\n      &[data-tone=\"medium\"] {\n        background: rgba(245, 158, 11, 0.1);\n        border-color: rgba(245, 158, 11, 0.2);\n        color: #92400e;\n        i { color: #f59e0b; }\n      }\n\n      &[data-tone=\"high\"] {\n        background: rgba(34, 197, 94, 0.1);\n        border-color: rgba(34, 197, 94, 0.2);\n        color: #166534;\n        i { color: #22c55e; }\n      }\n    }\n\n    \n\n    .status-alert-header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n      padding: 0.55rem 0.72rem;\n      margin: 0.5rem 0;\n      border-radius: 12px;\n      background: rgba(239, 68, 68, 0.07);\n      border: 1px solid rgba(239, 68, 68, 0.16);\n      border-left: 3px solid #ef4444;\n    }\n\n    .status-alert-header__pill[_ngcontent-%COMP%] {\n      border-radius: 999px;\n      padding: 0.16rem 0.45rem;\n      font-size: 0.66rem;\n      font-weight: 800;\n      letter-spacing: 0.05em;\n      text-transform: uppercase;\n      color: #991b1b;\n      background: rgba(239, 68, 68, 0.14);\n      border: 1px solid rgba(239, 68, 68, 0.22);\n    }\n\n    .status-alert-header__value[_ngcontent-%COMP%] {\n      font-size: 0.88rem;\n      font-weight: 700;\n      color: #991b1b;\n    }\n\n    .status-alert-header__state[_ngcontent-%COMP%] {\n      font-size: 0.75rem;\n      color: rgba(153, 27, 27, 0.7);\n    }\n\n    .status-kpi-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 0.55rem;\n      margin: 0.55rem 0;\n    }\n\n    .kpi-tile[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.3rem;\n      padding: 0.65rem 0.7rem;\n      border-radius: 14px;\n      background: rgba(255, 255, 255, 0.75);\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      border-top: 3px solid rgba(148, 163, 184, 0.3);\n      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 6px 12px rgba(15, 23, 42, 0.04);\n\n      &__icon {\n        width: 28px;\n        height: 28px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        border-radius: 8px;\n        font-size: 0.82rem;\n        background: rgba(148, 163, 184, 0.14);\n        color: #64748b;\n      }\n\n      &__label {\n        font-size: 0.66rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.06em;\n        color: rgba(100, 116, 139, 0.75);\n      }\n\n      &__value {\n        font-size: 1rem;\n        font-weight: 800;\n        color: rgba(15, 23, 42, 0.88);\n        letter-spacing: -0.01em;\n      }\n\n      &[data-tone=\"low\"] {\n        border-top-color: #ef4444;\n        .kpi-tile__icon { background: rgba(239, 68, 68, 0.12); color: #ef4444; }\n        .kpi-tile__value { color: #991b1b; }\n      }\n\n      &[data-tone=\"medium\"] {\n        border-top-color: #f59e0b;\n        .kpi-tile__icon { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }\n        .kpi-tile__value { color: #92400e; }\n      }\n\n      &[data-tone=\"high\"] {\n        border-top-color: #22c55e;\n        .kpi-tile__icon { background: rgba(34, 197, 94, 0.12); color: #22c55e; }\n        .kpi-tile__value { color: #166534; }\n      }\n    }\n\n    .weakest-signal-callout[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.42rem;\n      flex-wrap: wrap;\n      padding: 0.5rem 0.72rem;\n      margin-bottom: 0.45rem;\n      border-radius: 10px;\n      background: rgba(245, 158, 11, 0.07);\n      border: 1px solid rgba(245, 158, 11, 0.18);\n      border-left: 3px solid #f59e0b;\n      font-size: 0.82rem;\n\n      > i {\n        color: #f59e0b;\n        font-size: 0.85rem;\n        flex-shrink: 0;\n      }\n\n      &__label {\n        font-size: 0.69rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.05em;\n        color: #b45309;\n      }\n\n      strong {\n        font-weight: 700;\n        color: #92400e;\n      }\n\n      &__state {\n        font-size: 0.76rem;\n        color: rgba(146, 64, 14, 0.7);\n      }\n    }\n\n    .evidence-step-list[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.38rem;\n      margin-top: 0.35rem;\n    }\n\n    .evidence-step[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: baseline;\n      gap: 0.5rem;\n      font-size: 0.81rem;\n      line-height: 1.45;\n      color: rgba(15, 23, 42, 0.82);\n\n      &__num {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        width: 18px;\n        height: 18px;\n        flex-shrink: 0;\n        border-radius: 50%;\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n        color: white;\n        font-size: 0.62rem;\n        font-weight: 800;\n      }\n    }\n\n    \n\n    .conv-score-strip[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.55rem;\n      align-items: stretch;\n      margin-bottom: 0.85rem;\n    }\n\n    .conv-score-cell[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      gap: 0.22rem;\n      padding: 0.6rem 0.75rem;\n      border-radius: 12px;\n      background: rgba(255, 255, 255, 0.75);\n      border: 1px solid rgba(148, 163, 184, 0.16);\n      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 4px 10px rgba(15, 23, 42, 0.04);\n      min-width: 80px;\n\n      &__lbl {\n        font-size: 0.64rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.07em;\n        color: #94a3b8;\n      }\n\n      &__denom {\n        font-size: 0.75rem;\n        color: rgba(100, 116, 139, 0.7);\n        font-weight: 600;\n      }\n\n      &__time {\n        font-size: 0.72rem;\n        color: #64748b;\n      }\n\n      &__sentiment {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.25rem;\n        font-size: 0.82rem;\n        font-weight: 700;\n        color: rgba(15, 23, 42, 0.82);\n\n        i { font-size: 0.78rem; }\n      }\n\n      strong {\n        font-size: 0.88rem;\n        font-weight: 700;\n        color: rgba(15, 23, 42, 0.88);\n      }\n\n      &--score {\n        flex-direction: row;\n        align-items: center;\n        gap: 0.55rem;\n        flex-shrink: 0;\n      }\n\n      &--time {\n        opacity: 0.72;\n        background: transparent;\n        border-color: transparent;\n        box-shadow: none;\n      }\n\n      &.sentiment--positive { background: rgba(34, 197, 94, 0.08); border-color: rgba(34, 197, 94, 0.18); }\n      &.sentiment--cautious { background: rgba(245, 158, 11, 0.08); border-color: rgba(245, 158, 11, 0.18); }\n      &.sentiment--negative { background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.18); }\n    }\n\n    .conv-score-gauge[_ngcontent-%COMP%] {\n      position: relative;\n      width: 48px;\n      height: 48px;\n      flex-shrink: 0;\n\n      svg {\n        width: 100%;\n        height: 100%;\n        transform: rotate(-90deg);\n      }\n    }\n\n    .conv-gauge-bg[_ngcontent-%COMP%] {\n      fill: none;\n      stroke: rgba(148, 163, 184, 0.2);\n      stroke-width: 3;\n    }\n\n    .conv-gauge-fill[_ngcontent-%COMP%] {\n      fill: none;\n      stroke-width: 3;\n      stroke-linecap: round;\n      transition: stroke-dasharray 0.8s ease-out;\n      stroke: #94a3b8;\n\n      &[data-tone=\"healthy\"] { stroke: #22c55e; }\n      &[data-tone=\"risk\"] { stroke: #ef4444; }\n      &[data-tone=\"weak\"] { stroke: #f59e0b; }\n    }\n\n    .conv-score-gauge__num[_ngcontent-%COMP%] {\n      position: absolute;\n      inset: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 0.85rem;\n      font-weight: 800;\n      color: rgba(15, 23, 42, 0.88);\n      letter-spacing: -0.02em;\n    }\n\n    .conv-score-cell__detail[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.1rem;\n    }\n\n    .conv-band-chip[_ngcontent-%COMP%] {\n      display: inline-flex;\n      padding: 0.28rem 0.6rem;\n      border-radius: 999px;\n      font-size: 0.75rem;\n      font-weight: 800;\n      letter-spacing: 0.03em;\n      background: rgba(148, 163, 184, 0.14);\n      color: #475569;\n      border: 1.5px solid rgba(148, 163, 184, 0.22);\n\n      &[data-tone=\"healthy\"] {\n        background: rgba(34, 197, 94, 0.14);\n        border-color: rgba(34, 197, 94, 0.28);\n        color: #166534;\n      }\n\n      &[data-tone=\"risk\"] {\n        background: rgba(239, 68, 68, 0.14);\n        border-color: rgba(239, 68, 68, 0.28);\n        color: #991b1b;\n      }\n\n      &[data-tone=\"weak\"] {\n        background: rgba(245, 158, 11, 0.14);\n        border-color: rgba(245, 158, 11, 0.28);\n        color: #92400e;\n      }\n    }\n\n    \n\n    .conversation-signal-card--know[_ngcontent-%COMP%] {\n      background: linear-gradient(180deg, rgba(220, 252, 231, 0.7), rgba(255, 255, 255, 0.65)) !important;\n      border-color: rgba(34, 197, 94, 0.18) !important;\n\n      .conversation-signal-card__label {\n        color: #166534 !important;\n      }\n    }\n\n    .conversation-signal-card--missing[_ngcontent-%COMP%] {\n      background: linear-gradient(180deg, rgba(254, 226, 226, 0.65), rgba(255, 255, 255, 0.65)) !important;\n      border-color: rgba(239, 68, 68, 0.18) !important;\n\n      .conversation-signal-card__label {\n        color: #991b1b !important;\n      }\n    }\n\n    .conversation-signal-chip--risk[_ngcontent-%COMP%] {\n      background: rgba(239, 68, 68, 0.1) !important;\n      border-color: rgba(239, 68, 68, 0.18) !important;\n      color: #991b1b !important;\n    }\n\n    \n\n    .conversation-next-action-card--indigo[_ngcontent-%COMP%] {\n      border-left: 3px solid #6366f1 !important;\n      border-color: rgba(99, 102, 241, 0.2) !important;\n      background: linear-gradient(180deg, rgba(238, 242, 255, 0.9), rgba(255, 255, 255, 0.78)) !important;\n\n      .conversation-next-action-card__label {\n        color: #4338ca !important;\n      }\n    }\n\n    \n\n    .qualification-scoring-shell[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.78rem;\n      margin-bottom: 0.9rem;\n    }\n\n    .qualification-scoring-shell__header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n    .qual-shell-title[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: 0.65rem;\n\n      &__icon {\n        width: 44px;\n        height: 44px;\n        border-radius: 14px;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        color: #fff;\n        background: linear-gradient(135deg, #6d5ef7, #4f46e5);\n        box-shadow: 0 10px 24px rgba(79, 70, 229, 0.24);\n        flex-shrink: 0;\n\n        i { font-size: 0.9rem; }\n      }\n\n      &__eyebrow {\n        display: inline-flex;\n        margin-bottom: 0.1rem;\n        font-size: 0.82rem;\n        font-weight: 700;\n        color: #5b5ce6;\n      }\n\n      h2 {\n        margin: 0;\n        font-size: 1.56rem;\n        line-height: 1.12;\n        font-weight: 800;\n        color: #1f2640;\n        letter-spacing: -0.03em;\n      }\n\n      p {\n        margin: 0.25rem 0 0;\n        color: #667089;\n        font-size: 0.88rem;\n      }\n    }\n\n    .qual-shell-actions[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.55rem;\n      margin-left: auto;\n    }\n\n    .qual-stat-chips[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(5, minmax(0, 1fr));\n      gap: 0.55rem;\n    }\n\n    .qual-stat-chip[_ngcontent-%COMP%] {\n      border-radius: 14px;\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      background: rgba(255, 255, 255, 0.86);\n      padding: 0.55rem 0.75rem;\n      display: flex;\n      align-items: center;\n      gap: 0.62rem;\n\n      .qual-stat-chip__icon {\n        width: 34px;\n        height: 34px;\n        border-radius: 10px;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        color: #ffffff;\n        font-size: 0.88rem;\n        flex: 0 0 auto;\n        box-shadow: 0 6px 14px rgba(15, 23, 42, 0.14);\n      }\n\n      .qual-stat-chip__content {\n        display: grid;\n        gap: 0.1rem;\n        min-width: 0;\n      }\n\n      .chip-label {\n        font-size: 0.72rem;\n        color: #6b7280;\n      }\n\n      strong {\n        font-size: 1.22rem;\n        font-weight: 800;\n        line-height: 1.1;\n      }\n\n      &--teal {\n        strong { color: #0f766e; }\n        .qual-stat-chip__icon { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n      }\n\n      &--violet {\n        strong { color: #5b21b6; }\n        .qual-stat-chip__icon { background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); }\n      }\n\n      &--blue {\n        strong { color: #1d4ed8; }\n        .qual-stat-chip__icon { background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%); }\n      }\n\n      &--amber {\n        strong { color: #9a3412; }\n        .qual-stat-chip__icon { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }\n      }\n\n      &--slate {\n        strong { color: #334155; }\n        .qual-stat-chip__icon { background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%); }\n      }\n    }\n\n    .qual-hero-card[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 1.8fr 1.9fr 1fr;\n      gap: 0.85rem;\n      border-radius: 16px;\n      border: 1px solid rgba(148, 163, 184, 0.22);\n      background: linear-gradient(180deg, rgba(236, 233, 255, 0.7), rgba(243, 244, 255, 0.62));\n      padding: 0.8rem;\n    }\n\n    .qual-hero-card__confidence[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      border-right: 1px solid rgba(148, 163, 184, 0.25);\n      padding-right: 0.7rem;\n    }\n\n    .qual-hero-ring[_ngcontent-%COMP%] {\n      position: relative;\n      width: 132px;\n      height: 132px;\n      flex-shrink: 0;\n\n      svg {\n        width: 100%;\n        height: 100%;\n        transform: rotate(-90deg);\n      }\n\n      .qual-gauge-bg {\n        fill: none;\n        stroke: rgba(99, 102, 241, 0.18);\n        stroke-width: 3;\n      }\n\n      .qual-gauge-fill {\n        fill: none;\n        stroke: #5b5ce6;\n        stroke-width: 3;\n        stroke-linecap: round;\n      }\n    }\n\n    .qual-hero-copy[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.2rem;\n\n      &__label {\n        font-size: 0.82rem;\n        font-weight: 700;\n        color: #5b5ce6;\n        text-transform: uppercase;\n      }\n\n      strong {\n        font-size: 1.42rem;\n        line-height: 1.1;\n        color: #1f2640;\n      }\n\n      p {\n        margin: 0;\n        font-size: 0.84rem;\n        color: #64748b;\n      }\n    }\n\n    .qual-hero-card__middle[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 0.65rem;\n      border-right: 1px solid rgba(148, 163, 184, 0.25);\n      padding-right: 0.7rem;\n    }\n\n    .hero-mid-block[_ngcontent-%COMP%] {\n      border-radius: 12px;\n      background: rgba(255, 255, 255, 0.7);\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      padding: 0.6rem 0.7rem;\n      display: grid;\n      gap: 0.35rem;\n\n      &__label {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.3rem;\n        font-size: 0.72rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        color: #516079;\n      }\n\n      p {\n        margin: 0;\n        font-size: 0.9rem;\n        color: #334155;\n      }\n\n      strong {\n        color: #4338ca;\n        font-size: 0.95rem;\n      }\n\n      &__link {\n        font-size: 0.84rem;\n        color: #4f46e5;\n        text-decoration: none;\n      }\n    }\n\n    .qual-hero-card__tip[_ngcontent-%COMP%] {\n      display: grid;\n      align-content: center;\n      justify-items: center;\n      gap: 0.35rem;\n\n      p {\n        margin: 0;\n        font-size: 0.82rem;\n        line-height: 1.35;\n        text-align: center;\n        color: #6b7280;\n      }\n    }\n\n    .qual-tip-bot[_ngcontent-%COMP%] {\n      width: 70px;\n      height: 70px;\n      border-radius: 18px;\n      background: radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.95), rgba(191, 219, 254, 0.5));\n      border: 1px solid rgba(147, 197, 253, 0.45);\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      color: #3b82f6;\n\n      i { font-size: 1.25rem; }\n    }\n\n    .qual-tip-pill[_ngcontent-%COMP%] {\n      padding: 0.2rem 0.55rem;\n      border-radius: 999px;\n      background: rgba(139, 92, 246, 0.18);\n      color: #6d28d9;\n      font-size: 0.7rem;\n      font-weight: 700;\n      text-transform: uppercase;\n    }\n\n    //[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   CQVS[_ngcontent-%COMP%]   radar[_ngcontent-%COMP%]    + card[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n[_ngcontent-%COMP%]   .qual-cqvs-section[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 320px minmax(0, 1fr);\n      gap: 0.72rem;\n      align-items: start;\n    }\n\n    .qual-cqvs-radar[_ngcontent-%COMP%] {\n      border-radius: 16px;\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      background: rgba(255, 255, 255, 0.9);\n      padding: 0.62rem 0.62rem 0.45rem;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      min-height: 292px;\n      gap: 0.32rem;\n\n      &__header {\n        width: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        margin-bottom: 0.1rem;\n      }\n\n      &__title {\n        display: flex;\n        align-items: center;\n        gap: 0.35rem;\n        font-size: 0.76rem;\n        font-weight: 700;\n        color: #4338ca;\n\n        i { font-size: 0.75rem; }\n      }\n\n      &__sub {\n        font-size: 0.66rem;\n        color: #9ca3af;\n      }\n\n      ::ng-deep canvas {\n        max-width: 286px !important;\n        max-height: 286px !important;\n      }\n    }\n\n    .qual-cqvs-cards[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.5rem;\n    }\n\n    .cqvs-group-card[_ngcontent-%COMP%] {\n      border-radius: 14px;\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      background: rgba(255, 255, 255, 0.86);\n      padding: 0.58rem 0.62rem;\n\n      .score-val {\n        font-size: 1.08rem;\n        font-weight: 800;\n        color: #1e293b;\n      }\n\n      .weight-pill {\n        font-size: 0.72rem;\n        padding: 0.12rem 0.45rem;\n        border-radius: 999px;\n        background: rgba(59, 130, 246, 0.14);\n        color: #1d4ed8;\n      }\n    }\n\n    .qual-breakdown-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: minmax(0, 4fr) minmax(200px, 1fr);\n      gap: 0.8rem;\n    }\n\n    .qual-breakdown-main[_ngcontent-%COMP%] {\n      border-radius: 16px;\n      overflow: hidden;\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      background: rgba(255, 255, 255, 0.88);\n\n      &__header {\n        padding: 0.62rem 0.82rem;\n        font-size: 0.84rem;\n        font-weight: 700;\n        color: #ffffff;\n        background: linear-gradient(90deg, #5b5ce6 0%, #3b82f6 100%);\n      }\n    }\n\n    .score-breakdown-table--hero[_ngcontent-%COMP%] {\n      ::ng-deep .p-datatable-thead > tr > th {\n        font-size: 0.67rem;\n        color: #64748b;\n      }\n\n      ::ng-deep .p-datatable-tbody > tr:nth-child(even) > td {\n        background: rgba(148, 163, 184, 0.045);\n      }\n\n      ::ng-deep .p-datatable-tbody > tr:hover > td {\n        background: rgba(59, 130, 246, 0.06);\n      }\n\n      .col-factor--with-cqvs {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.45rem;\n      }\n\n      .factor-rail.compact {\n        height: 7px;\n      }\n    }\n\n    .qual-risk-card[_ngcontent-%COMP%] {\n      border-radius: 14px;\n      border: 1px solid rgba(244, 63, 94, 0.22);\n      background: rgba(254, 242, 242, 0.82);\n      padding: 0.7rem;\n      display: grid;\n      gap: 0.6rem;\n\n      h4 {\n        margin: 0;\n        font-size: 1rem;\n        color: #991b1b;\n      }\n    }\n\n    .qual-risk-list[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.45rem;\n    }\n\n    .qual-risk-item[_ngcontent-%COMP%] {\n      border-radius: 10px;\n      background: rgba(255, 255, 255, 0.76);\n      border: 1px solid rgba(244, 63, 94, 0.18);\n      padding: 0.45rem 0.52rem;\n      display: inline-flex;\n      align-items: center;\n      gap: 0.45rem;\n      font-size: 0.82rem;\n      color: #475569;\n\n      i {\n        color: #ef4444;\n        font-size: 0.8rem;\n      }\n    }\n\n    .qual-smart-insight[_ngcontent-%COMP%] {\n      border-radius: 10px;\n      border: 1px solid rgba(16, 185, 129, 0.24);\n      background: rgba(236, 253, 245, 0.85);\n      padding: 0.6rem 0.8rem;\n      display: inline-flex;\n      align-items: center;\n      gap: 0.45rem;\n      font-size: 0.86rem;\n      color: #14532d;\n\n      i { color: #10b981; }\n    }\n\n    @media (max-width: 1200px) {\n      .qual-stat-chips[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .qual-cqvs-section[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n\n      .qual-cqvs-cards[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .qual-hero-card[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n\n      .qual-hero-card__confidence[_ngcontent-%COMP%], \n   .qual-hero-card__middle[_ngcontent-%COMP%] {\n        border-right: none;\n        padding-right: 0;\n      }\n\n      .qual-breakdown-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n    }\n\n    @media (max-width: 950px) {\n      .qual-cqvs-cards[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n    }\n\n    @media (max-width: 700px) {\n      .qual-stat-chips[_ngcontent-%COMP%], \n   .qual-cqvs-cards[_ngcontent-%COMP%], \n   .qual-hero-card__middle[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n\n      .qual-shell-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n        font-size: 1.35rem;\n      }\n    }\n\n    \n\n\n    //[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Top[_ngcontent-%COMP%]   card[_ngcontent-%COMP%]   (ring + KPIs row)[_ngcontent-%COMP%]   \u2500\u2500\n[_ngcontent-%COMP%]   .qual-review-topcard[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 1.25rem;\n      background: rgba(255, 255, 255, 0.88);\n      border-radius: 18px;\n      padding: 1.25rem 1.35rem;\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);\n      margin-bottom: 0.75rem;\n      flex-wrap: wrap;\n\n      &[data-tone=\"low\"]    { border-left: 3px solid #ef4444; }\n      &[data-tone=\"medium\"] { border-left: 3px solid #f59e0b; }\n      &[data-tone=\"high\"]   { border-left: 3px solid #22c55e; }\n    }\n\n    .qual-review-score-block[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-shrink: 0;\n    }\n\n    .qual-review-gauge[_ngcontent-%COMP%] {\n      position: relative;\n      width: 116px;\n      height: 116px;\n      flex-shrink: 0;\n\n      svg {\n        width: 100%;\n        height: 100%;\n        transform: rotate(-90deg);\n      }\n\n      .qual-gauge-bg {\n        fill: none;\n        stroke: rgba(148, 163, 184, 0.18);\n        stroke-width: 3;\n      }\n\n      .qual-gauge-fill {\n        fill: none;\n        stroke-width: 3;\n        stroke-linecap: round;\n        stroke: #22c55e;\n        transition: stroke-dasharray 0.8s ease-out;\n\n        [data-tone=\"low\"]    & { stroke: #ef4444; }\n        [data-tone=\"medium\"] & { stroke: #f59e0b; }\n        [data-tone=\"high\"]   & { stroke: #22c55e; }\n      }\n    }\n\n    .qual-gauge-num[_ngcontent-%COMP%] {\n      position: absolute;\n      inset: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 3rem;\n      font-weight: 800;\n      color: #1e293b;\n    }\n\n    .qual-gauge-denom[_ngcontent-%COMP%] {\n      font-size: 0.95rem;\n      color: #94a3b8;\n      font-weight: 700;\n    }\n\n    .qual-review-summary[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.45rem;\n      min-width: 0;\n      flex: 1;\n      max-width: 360px;\n\n      &__title {\n        font-size: 2rem;\n        font-weight: 700;\n        color: #1e293b;\n        line-height: 1.18;\n      }\n\n      &__desc {\n        font-size: 1rem;\n        color: #64748b;\n        margin: 0;\n      }\n    }\n\n    .qual-status-chip[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      padding: 0.2rem 0.55rem;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      width: fit-content;\n      background: rgba(148, 163, 184, 0.12);\n      color: #475569;\n      border: 1px solid rgba(148, 163, 184, 0.2);\n\n      &[data-tone=\"low\"]    { background: rgba(239, 68, 68, 0.1); color: #991b1b; border-color: rgba(239, 68, 68, 0.2); }\n      &[data-tone=\"medium\"] { background: rgba(245, 158, 11, 0.1); color: #92400e; border-color: rgba(245, 158, 11, 0.2); }\n      &[data-tone=\"high\"]   { background: rgba(34, 197, 94, 0.1); color: #166534; border-color: rgba(34, 197, 94, 0.2); }\n    }\n\n    //[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   4-tile[_ngcontent-%COMP%]   KPI[_ngcontent-%COMP%]   strip[_ngcontent-%COMP%]   \u2500\u2500\n[_ngcontent-%COMP%]   .qual-kpi-strip[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: stretch;\n      margin-left: auto;\n      border-left: 1px solid rgba(0, 0, 0, 0.07);\n      padding-left: 1.15rem;\n      gap: 0;\n    }\n\n    .qual-kpi-tile[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.15rem;\n      padding: 0.5rem 0.9rem;\n      min-width: 160px;\n      border-right: 1px solid rgba(0, 0, 0, 0.05);\n      position: relative;\n\n      &:last-child { border-right: none; }\n\n      &[data-tone=\"low\"]    { border-top: 2px solid #ef4444; }\n      &[data-tone=\"medium\"] { border-top: 2px solid #f59e0b; }\n      &[data-tone=\"high\"]   { border-top: 2px solid #22c55e; }\n\n      &--weakest { border-top: 2px solid #a855f7; }\n\n      &__icon {\n        font-size: 0.9rem;\n        color: #94a3b8;\n        margin-bottom: 0.1rem;\n      }\n\n      &__label {\n        font-size: 0.76rem;\n        font-weight: 600;\n        text-transform: uppercase;\n        letter-spacing: 0.07em;\n        color: #94a3b8;\n      }\n\n      &__value {\n        font-size: 1.7rem;\n        font-weight: 700;\n        color: #1e293b;\n        line-height: 1.15;\n      }\n\n      &__hint {\n        font-size: 0.84rem;\n        color: #94a3b8;\n      }\n    }\n\n    .qual-kpi-badge[_ngcontent-%COMP%] {\n      display: inline-block;\n      padding: 0.1rem 0.4rem;\n      border-radius: 4px;\n      font-size: 0.6rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      background: rgba(168, 85, 247, 0.1);\n      color: #7e22ce;\n    }\n\n    //[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   3-column[_ngcontent-%COMP%]   body[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   \u2500\u2500\n[_ngcontent-%COMP%]   .qual-review-body[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.9rem;\n\n      &__header {\n        height: 4px;\n      }\n\n      &__rule {\n        display: block;\n        width: 100%;\n        border-top: 1px solid rgba(148, 163, 184, 0.2);\n      }\n\n      &__stats {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n        flex-wrap: wrap;\n      }\n    }\n\n    .qual-review-cols[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 1fr 1fr 1fr;\n      gap: 0.75rem;\n\n      @media (max-width: 900px) {\n        grid-template-columns: 1fr;\n      }\n    }\n\n    .qual-col[_ngcontent-%COMP%] {\n      border-radius: 18px;\n      padding: 1rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n\n      &--know    { background: rgba(220, 252, 231, 0.35); border: 1px solid rgba(34, 197, 94, 0.18); }\n      &--missing { background: rgba(254, 226, 226, 0.35); border: 1px solid rgba(239, 68, 68, 0.18); }\n      &--ai      { background: rgba(238, 242, 255, 0.45); border: 1px solid rgba(99, 102, 241, 0.18); }\n\n      &__header {\n        display: flex;\n        align-items: flex-start;\n        gap: 0.5rem;\n        flex-wrap: wrap;\n\n        div {\n          display: flex;\n          flex-direction: column;\n          gap: 0.12rem;\n          flex: 1;\n          min-width: 0;\n\n          strong {\n            font-size: 1.02rem;\n            font-weight: 700;\n            color: #1e293b;\n          }\n\n          span {\n            font-size: 0.88rem;\n            color: #64748b;\n          }\n        }\n      }\n\n      &__icon {\n        width: 26px;\n        height: 26px;\n        border-radius: 999px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 0.72rem;\n        flex-shrink: 0;\n\n        &--know    { background: rgba(34, 197, 94, 0.15); color: #16a34a; }\n        &--missing { background: rgba(239, 68, 68, 0.15); color: #dc2626; }\n        &--ai      { background: rgba(99, 102, 241, 0.15); color: #6366f1; }\n      }\n\n      &__empty {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        gap: 0.35rem;\n        padding: 1.25rem;\n        text-align: center;\n        color: #94a3b8;\n        font-size: 0.72rem;\n\n        i { font-size: 1.1rem; }\n      }\n    }\n\n    .qual-priority-badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.15rem 0.45rem;\n      background: rgba(239, 68, 68, 0.12);\n      color: #991b1b;\n      border-radius: 999px;\n      font-size: 0.72rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      flex-shrink: 0;\n    }\n\n    //[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Engagement[_ngcontent-%COMP%]   block[_ngcontent-%COMP%]   (col 1)[_ngcontent-%COMP%]   \u2500\u2500\n[_ngcontent-%COMP%]   .qual-engagement-block[_ngcontent-%COMP%] {\n      background: rgba(255, 255, 255, 0.55);\n      border: 1px solid rgba(0, 0, 0, 0.06);\n      border-radius: 14px;\n      padding: 0.78rem 0.88rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.5rem;\n    }\n\n    .qual-engagement-tag[_ngcontent-%COMP%] {\n      font-size: 0.72rem;\n      font-weight: 600;\n      color: #94a3b8;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n\n    .qual-engagement-row[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 0.5rem;\n\n      > div {\n        display: flex;\n        flex-direction: column;\n        gap: 0.12rem;\n\n        strong {\n          font-size: 2rem;\n          font-weight: 700;\n          color: #1e293b;\n          line-height: 1.1;\n        }\n\n        span {\n          font-size: 0.92rem;\n          color: #64748b;\n        }\n      }\n    }\n\n    .qual-block-row[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.5rem;\n    }\n\n    .qual-block-label[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.3rem;\n      font-size: 0.78rem;\n      font-weight: 600;\n      color: #64748b;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n\n    //[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Signals[_ngcontent-%COMP%]   block[_ngcontent-%COMP%]   \u2500\u2500\n[_ngcontent-%COMP%]   .qual-signals-block[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.4rem;\n    }\n\n    .qual-signals-list[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.3rem;\n    }\n\n    .qual-signal-item[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: 0.35rem;\n      font-size: 0.92rem;\n      color: #1e293b;\n      background: rgba(255, 255, 255, 0.5);\n      border-radius: 10px;\n      padding: 0.48rem 0.62rem;\n\n      i { color: #16a34a; font-size: 0.65rem; margin-top: 0.12rem; flex-shrink: 0; }\n\n      &--neutral i { color: #64748b; }\n    }\n\n    //[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Gap[_ngcontent-%COMP%]   grid[_ngcontent-%COMP%]   (col 2)[_ngcontent-%COMP%]   \u2500\u2500\n[_ngcontent-%COMP%]   .qual-gap-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 0.4rem;\n\n      @media (max-width: 600px) { grid-template-columns: 1fr; }\n    }\n\n    .qual-gap-card[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.2rem;\n      background: rgba(255, 255, 255, 0.55);\n      border: 1px solid rgba(239, 68, 68, 0.12);\n      border-radius: 14px;\n      padding: 0.72rem 0.78rem;\n\n      &__icon {\n        font-size: 1rem;\n        color: #dc2626;\n      }\n\n      &__label {\n        font-size: 0.78rem;\n        font-weight: 700;\n        letter-spacing: 0.04em;\n        text-transform: uppercase;\n        color: #64748b;\n      }\n\n      &__text {\n        font-size: 0.95rem;\n        font-weight: 600;\n        color: #1e293b;\n        line-height: 1.35;\n      }\n\n      &__impact {\n        display: inline-flex;\n        width: fit-content;\n        font-size: 0.7rem;\n        font-weight: 700;\n        border-radius: 999px;\n        padding: 0.15rem 0.48rem;\n      }\n\n      &--high .qual-gap-card__impact {\n        color: #be123c;\n        background: rgba(244, 63, 94, 0.14);\n      }\n\n      &--medium .qual-gap-card__impact {\n        color: #b45309;\n        background: rgba(245, 158, 11, 0.16);\n      }\n\n      &--review .qual-gap-card__impact {\n        color: #4338ca;\n        background: rgba(99, 102, 241, 0.14);\n      }\n    }\n\n    //[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Evidence[_ngcontent-%COMP%]   checklist[_ngcontent-%COMP%]   (col 2 bottom)[_ngcontent-%COMP%]   \u2500\u2500\n[_ngcontent-%COMP%]   .qual-evidence-block[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.4rem;\n    }\n\n    .qual-evidence-list[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.3rem;\n    }\n\n    .qual-evidence-item[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: 0.35rem;\n      font-size: 0.88rem;\n      color: #1e293b;\n\n      i { color: #64748b; font-size: 0.65rem; margin-top: 0.12rem; flex-shrink: 0; }\n    }\n\n    //[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   AI[_ngcontent-%COMP%]   Insight[_ngcontent-%COMP%]   column[_ngcontent-%COMP%]   (col 3)[_ngcontent-%COMP%]   \u2500\u2500\n[_ngcontent-%COMP%]   .qual-ai-insight-text[_ngcontent-%COMP%] {\n      font-size: 1.05rem;\n      color: #334155;\n      line-height: 1.55;\n      margin: 0;\n      font-weight: 600;\n    }\n\n    .qual-suggested-message[_ngcontent-%COMP%] {\n      background: rgba(99, 102, 241, 0.07);\n      border: 1px solid rgba(99, 102, 241, 0.15);\n      border-left: 3px solid #6366f1;\n      border-radius: 0 8px 8px 0;\n      padding: 0.6rem 0.75rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.3rem;\n\n      &__label {\n        font-size: 0.74rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.06em;\n        color: #6366f1;\n      }\n\n      &__body {\n        font-size: 0.93rem;\n        color: #1e293b;\n        font-style: italic;\n        margin: 0;\n        line-height: 1.45;\n      }\n    }\n\n    .qual-ai-chips[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.4rem;\n    }\n\n    .qual-ai-chip[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.2rem 0.5rem;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      font-weight: 600;\n\n      &--tone   { background: rgba(99, 102, 241, 0.1); color: #4338ca; }\n      &--intent { background: rgba(168, 85, 247, 0.1); color: #7e22ce; }\n    }\n\n    //[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Footer[_ngcontent-%COMP%]   recommended[_ngcontent-%COMP%]   action[_ngcontent-%COMP%]   bar[_ngcontent-%COMP%]   \u2500\u2500\n[_ngcontent-%COMP%]   .qual-review-footer[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      background: rgba(238, 242, 255, 0.5);\n      border: 2px solid rgba(99, 102, 241, 0.4);\n      border-radius: 16px;\n      padding: 0.95rem 1.1rem;\n      flex-wrap: wrap;\n    }\n\n    .qual-footer-badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.2rem 0.55rem;\n      background: rgba(99, 102, 241, 0.12);\n      color: #4338ca;\n      border-radius: 999px;\n      font-size: 0.65rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      white-space: nowrap;\n      flex-shrink: 0;\n    }\n\n    .qual-footer-content[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.12rem;\n      flex: 1;\n      min-width: 0;\n\n      strong {\n        font-size: 1.5rem;\n        font-weight: 700;\n        color: #1e293b;\n      }\n\n      p {\n        font-size: 0.96rem;\n        color: #64748b;\n        margin: 0;\n      }\n    }\n\n    .qual-footer-actions[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.65rem;\n      margin-left: auto;\n      flex-wrap: wrap;\n    }\n\n    .qual-footer-btn[_ngcontent-%COMP%] {\n      min-height: 40px;\n\n      &--ghost {\n        background: #fff;\n        border: 1px solid rgba(99, 102, 241, 0.32);\n        color: #4f46e5;\n      }\n    }\n\n    .qual-review-note[_ngcontent-%COMP%] {\n      margin-top: 0.45rem;\n      display: inline-flex;\n      align-items: center;\n      gap: 0.5rem;\n      font-size: 0.78rem;\n      color: #7c859d;\n\n      i {\n        color: #667eea;\n        font-size: 0.86rem;\n      }\n    }\n\n    //[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Email[_ngcontent-%COMP%]   thread[_ngcontent-%COMP%]   (inside qual-review-body)[_ngcontent-%COMP%]   \u2500\u2500\n[_ngcontent-%COMP%]   .qual-email-thread[_ngcontent-%COMP%] {\n      border-top: 1px solid rgba(0, 0, 0, 0.06);\n      padding-top: 0.75rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.4rem;\n    }\n\n    \n\n    .email-engagement-panel__empty[_ngcontent-%COMP%] {\n      strong {\n        display: block;\n        font-size: 0.88rem;\n        color: rgba(15, 23, 42, 0.8);\n        margin-top: 0.3rem;\n      }\n\n      .empty-state-cta {\n        margin-top: 0.65rem;\n      }\n    }\n\n    .qualification-insight-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.8rem;\n      align-items: stretch;\n    }\n\n    .qualification-summary-card__focus[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n      padding: 0.62rem 0.72rem;\n      border-radius: 14px;\n      background:\n        radial-gradient(circle at 8% 10%, rgba(245, 158, 11, 0.14), transparent 50%),\n        rgba(255, 255, 255, 0.62);\n      border: 1px solid rgba(245, 158, 11, 0.18);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.4),\n        0 8px 16px rgba(15, 23, 42, 0.04);\n    }\n\n    .focus-pill[_ngcontent-%COMP%] {\n      border-radius: 999px;\n      padding: 0.18rem 0.45rem;\n      font-size: 0.67rem;\n      font-weight: 800;\n      letter-spacing: 0.05em;\n      text-transform: uppercase;\n      color: #9a3412;\n      background: rgba(251, 191, 36, 0.18);\n      border: 1px solid rgba(245, 158, 11, 0.18);\n    }\n\n    .qualification-summary-card__focus[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n      color: rgba(var(--apple-secondary), 0.98);\n      font-size: 0.9rem;\n    }\n\n    .focus-state[_ngcontent-%COMP%] {\n      font-size: 0.75rem;\n      color: rgba(var(--apple-gray-1), 0.82);\n    }\n\n    .qualification-summary-card__error[_ngcontent-%COMP%] {\n      margin: 0;\n    }\n\n    .qualification-feedback--summary[_ngcontent-%COMP%] {\n      margin-top: 0;\n      border-radius: 18px;\n      position: relative;\n      overflow: hidden;\n      background:\n        radial-gradient(circle at 10% 10%, rgba(56, 189, 248, 0.14), transparent 50%),\n        radial-gradient(circle at 90% 8%, rgba(139, 92, 246, 0.12), transparent 52%),\n        linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5));\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.45),\n        inset 0 -1px 0 rgba(148, 163, 184, 0.06),\n        0 14px 24px rgba(15, 23, 42, 0.06);\n      padding: 0.95rem 1rem 1rem;\n      backdrop-filter: blur(12px) saturate(128%);\n      -webkit-backdrop-filter: blur(12px) saturate(128%);\n    }\n\n    .qualification-feedback--summary[_ngcontent-%COMP%]::before {\n      content: '';\n      position: absolute;\n      inset: 0 0 auto 0;\n      height: 42%;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0));\n      pointer-events: none;\n    }\n\n    .qualification-feedback--summary[_ngcontent-%COMP%]   .feedback-title[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.42rem;\n      padding: 0.28rem 0.56rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.7);\n      border: 1px solid rgba(148, 163, 184, 0.16);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.4),\n        0 8px 16px rgba(15, 23, 42, 0.04);\n      font-weight: 700;\n    }\n\n    .qualification-feedback--summary[_ngcontent-%COMP%]   .feedback-metrics[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      font-size: 0.84rem;\n      gap: 0.55rem;\n      margin-top: 0.35rem;\n    }\n\n    .qualification-feedback--summary[_ngcontent-%COMP%]   .feedback-item[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.32rem;\n      padding: 0.3rem 0.58rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.9);\n      border: 1px solid rgba(148, 163, 184, 0.16);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.45),\n        0 8px 14px rgba(15, 23, 42, 0.04);\n    }\n\n    .qualification-feedback--summary[_ngcontent-%COMP%]   .feedback-suggestions[_ngcontent-%COMP%] {\n      margin-top: 0.45rem;\n      padding: 0.7rem 0.78rem;\n      border-radius: 14px;\n      background:\n        linear-gradient(180deg, rgba(255, 255, 255, 0.64), rgba(255, 255, 255, 0.5));\n      border: 1px dashed rgba(148, 163, 184, 0.22);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.28),\n        0 8px 16px rgba(15, 23, 42, 0.03);\n    }\n\n    .qualification-feedback--summary[_ngcontent-%COMP%]   .feedback-suggestions[_ngcontent-%COMP%]   .feedback-title[_ngcontent-%COMP%] {\n      background: transparent;\n      border: none;\n      box-shadow: none;\n      padding: 0;\n      border-radius: 0;\n      color: rgba(30, 64, 175, 0.85);\n    }\n\n    .qualification-feedback--summary[_ngcontent-%COMP%]   .feedback-suggestions-list[_ngcontent-%COMP%] {\n      margin-top: 0.3rem;\n      padding-left: 1rem;\n      display: grid;\n      gap: 0.2rem;\n    }\n\n    .qualification-feedback--summary[_ngcontent-%COMP%]   .feedback-suggestions-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n      font-size: 0.81rem;\n      line-height: 1.4;\n      color: rgba(var(--apple-secondary), 0.9);\n    }\n\n    .qualification-feedback--summary[_ngcontent-%COMP%]   .feedback-state[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.05rem 0.32rem;\n      border-radius: 999px;\n      background: rgba(148, 163, 184, 0.12);\n      border: 1px solid rgba(148, 163, 184, 0.16);\n    }\n\n    .qualification-feedback--readiness[_ngcontent-%COMP%] {\n      background:\n        radial-gradient(circle at 8% 12%, rgba(59, 130, 246, 0.16), transparent 48%),\n        radial-gradient(circle at 88% 18%, rgba(14, 165, 233, 0.14), transparent 36%),\n        linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(239, 246, 255, 0.54));\n    }\n\n    .qualification-feedback--status[_ngcontent-%COMP%] {\n      background:\n        radial-gradient(circle at 12% 10%, rgba(139, 92, 246, 0.14), transparent 48%),\n        radial-gradient(circle at 86% 22%, rgba(244, 114, 182, 0.12), transparent 34%),\n        linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(250, 245, 255, 0.54));\n    }\n\n    \n\n\n\n\n    .conversation-intelligence-panel[_ngcontent-%COMP%] {\n      margin-top: 0.65rem;\n      border-radius: 20px;\n      position: relative;\n      overflow: hidden;\n      background:\n        radial-gradient(circle at 85% 15%, rgba(236, 72, 153, 0.1), transparent 52%),\n        radial-gradient(circle at 15% 85%, rgba(59, 130, 246, 0.08), transparent 46%),\n        radial-gradient(circle at 60% 10%, rgba(129, 140, 248, 0.12), transparent 34%),\n        linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5));\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.45),\n        0 16px 28px rgba(15, 23, 42, 0.07);\n      padding: 1rem 1.05rem 1.05rem;\n      backdrop-filter: blur(14px) saturate(132%);\n      -webkit-backdrop-filter: blur(14px) saturate(132%);\n    }\n\n    .conversation-intelligence-panel__header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 0.9rem;\n      margin-bottom: 0.95rem;\n      flex-wrap: wrap;\n    }\n\n    .conversation-intelligence-panel__title[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.55rem;\n\n      > i {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 40px;\n        height: 40px;\n        border-radius: 14px;\n        background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.16));\n        color: #5b5cf0;\n        font-size: 1rem;\n        flex-shrink: 0;\n        box-shadow:\n          inset 0 1px 0 rgba(255, 255, 255, 0.3),\n          0 12px 22px rgba(99, 102, 241, 0.12);\n      }\n\n      h3 {\n        margin: 0;\n        font-size: 1rem;\n        font-weight: 800;\n        letter-spacing: -0.01em;\n        color: rgba(15, 23, 42, 0.88);\n      }\n\n      p {\n        margin: 0;\n        font-size: 0.78rem;\n        color: rgba(100, 116, 139, 0.8);\n        line-height: 1.45;\n      }\n    }\n\n    .conversation-intelligence-panel__actions[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.55rem;\n      justify-items: end;\n    }\n\n    .conversation-intelligence-panel__stats[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.6rem;\n      flex-wrap: wrap;\n      justify-content: flex-end;\n    }\n\n    .conversation-intelligence-panel__overview[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.7rem;\n      margin-bottom: 0.95rem;\n    }\n\n    .conversation-intelligence-summary[_ngcontent-%COMP%], \n   .conversation-next-action-card[_ngcontent-%COMP%], \n   .conversation-signal-card[_ngcontent-%COMP%] {\n      border-radius: 16px;\n      background:\n        linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.66));\n      border: 1px solid rgba(148, 163, 184, 0.14);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.4),\n        0 10px 20px rgba(15, 23, 42, 0.05);\n      padding: 0.9rem 0.95rem;\n    }\n\n    .conversation-intelligence-summary__label[_ngcontent-%COMP%], \n   .conversation-signal-card__label[_ngcontent-%COMP%], \n   .conversation-next-action-card__label[_ngcontent-%COMP%] {\n      font-size: 0.69rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.07em;\n      color: #7c8aa0;\n      margin-bottom: 0.45rem;\n    }\n\n    .conversation-intelligence-summary[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .conversation-next-action-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 0.84rem;\n      line-height: 1.6;\n      color: #334155;\n      font-weight: 500;\n    }\n\n    .conversation-intelligence-meta[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      align-content: flex-start;\n      gap: 0.65rem;\n    }\n\n    .conversation-state-strip[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.55rem;\n      margin-bottom: 0.85rem;\n    }\n\n    .conversation-state-pill[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.36rem 0.68rem;\n      border-radius: 999px;\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      background: rgba(241, 245, 249, 0.9);\n      color: #334155;\n      font-size: 0.76rem;\n      font-weight: 700;\n      line-height: 1.2;\n    }\n\n    .conversation-state-pill--detail[_ngcontent-%COMP%] {\n      font-weight: 600;\n    }\n\n    .conversation-state-pill[data-tone=\"healthy\"][_ngcontent-%COMP%] {\n      background: rgba(34, 197, 94, 0.12);\n      border-color: rgba(34, 197, 94, 0.18);\n      color: #166534;\n    }\n\n    .conversation-state-pill[data-tone=\"risk\"][_ngcontent-%COMP%] {\n      background: rgba(239, 68, 68, 0.1);\n      border-color: rgba(239, 68, 68, 0.16);\n      color: #991b1b;\n    }\n\n    .conversation-state-pill[data-tone=\"weak\"][_ngcontent-%COMP%] {\n      background: rgba(245, 158, 11, 0.12);\n      border-color: rgba(245, 158, 11, 0.18);\n      color: #b45309;\n    }\n\n    .conversation-next-action-card--pinned[_ngcontent-%COMP%] {\n      margin-bottom: 0.8rem;\n      border-color: rgba(59, 130, 246, 0.18);\n      background:\n        linear-gradient(180deg, rgba(239, 246, 255, 0.88), rgba(255, 255, 255, 0.75));\n    }\n\n    //[_ngcontent-%COMP%]   AI[_ngcontent-%COMP%]   Tone[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   Intent[_ngcontent-%COMP%]   Analysis[_ngcontent-%COMP%]   panel\n[_ngcontent-%COMP%]   .ai-tone-panel[_ngcontent-%COMP%] {\n      background: rgba(99, 102, 241, 0.06);\n      border: 1px solid rgba(99, 102, 241, 0.15);\n      border-radius: 0.75rem;\n      padding: 0.75rem 1rem;\n      margin-bottom: 0.8rem;\n\n      &__header {\n        display: flex;\n        align-items: center;\n        gap: 0.5rem;\n        margin-bottom: 0.65rem;\n        font-size: 0.8125rem;\n        font-weight: 600;\n        color: #4338ca;\n\n        i { color: #6366f1; font-size: 0.9rem; }\n      }\n\n      &__score {\n        margin-left: auto;\n        font-size: 0.8125rem;\n        font-weight: 700;\n        color: #6366f1;\n        background: rgba(99, 102, 241, 0.12);\n        padding: 2px 8px;\n        border-radius: 9999px;\n      }\n\n      &__grid {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        gap: 0.5rem;\n        margin-bottom: 0.5rem;\n\n        @media (max-width: 640px) {\n          grid-template-columns: 1fr;\n        }\n      }\n\n      &__justification {\n        display: flex;\n        align-items: flex-start;\n        gap: 0.4rem;\n        font-size: 0.78rem;\n        color: #6b7280;\n        line-height: 1.45;\n\n        i {\n          color: #a5b4fc;\n          font-size: 0.8rem;\n          margin-top: 2px;\n          flex-shrink: 0;\n        }\n      }\n    }\n\n    .ai-tone-chip[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n      padding: 0.45rem 0.65rem;\n      border-radius: 0.5rem;\n      background: rgba(255, 255, 255, 0.8);\n      border: 1px solid rgba(0, 0, 0, 0.06);\n\n      &__label {\n        font-size: 0.7rem;\n        font-weight: 600;\n        text-transform: uppercase;\n        letter-spacing: 0.04em;\n        color: #9ca3af;\n      }\n\n      strong {\n        font-size: 0.82rem;\n        font-weight: 600;\n        color: #1e293b;\n      }\n\n      &--tone { border-left: 3px solid #6366f1; }\n      &--buying { border-left: 3px solid #22c55e; }\n      &--intent { border-left: 3px solid #06b6d4; }\n    }\n\n    .conversation-intelligence-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.8rem;\n      margin-bottom: 0.8rem;\n    }\n\n    .conversation-signal-card__chips[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.45rem;\n    }\n\n    .conversation-signal-chip[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.22rem 0.5rem;\n      border-radius: 999px;\n      font-size: 0.74rem;\n      font-weight: 600;\n      line-height: 1.35;\n      border: 1px solid transparent;\n    }\n\n    .conversation-signal-chip--positive[_ngcontent-%COMP%] {\n      background: rgba(34, 197, 94, 0.12);\n      border-color: rgba(34, 197, 94, 0.16);\n      color: #15803d;\n    }\n\n    .conversation-signal-chip--risk[_ngcontent-%COMP%] {\n      background: rgba(245, 158, 11, 0.12);\n      border-color: rgba(245, 158, 11, 0.16);\n      color: #b45309;\n    }\n\n    .conversation-signal-chip--neutral[_ngcontent-%COMP%] {\n      background: rgba(99, 102, 241, 0.1);\n      border-color: rgba(99, 102, 241, 0.12);\n      color: #4338ca;\n    }\n\n    .email-engagement-panel[_ngcontent-%COMP%] {\n      margin-top: 0.65rem;\n    }\n\n    .email-engagement-panel__header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 0.75rem;\n      margin-bottom: 0.6rem;\n      flex-wrap: wrap;\n    }\n\n    .email-engagement-panel__title[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n\n      > i {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 32px;\n        height: 32px;\n        border-radius: 8px;\n        background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(219, 39, 119, 0.1));\n        color: #ec4899;\n        font-size: 0.95rem;\n        flex-shrink: 0;\n      }\n\n      h3 {\n        margin: 0;\n        font-size: 0.92rem;\n        font-weight: 700;\n        color: rgba(15, 23, 42, 0.88);\n      }\n\n      p {\n        margin: 0;\n        font-size: 0.76rem;\n        color: rgba(100, 116, 139, 0.8);\n      }\n    }\n\n    .email-engagement-panel__stats[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.55rem;\n      flex-wrap: wrap;\n    }\n\n    .email-stat[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.25rem;\n      padding: 0.18rem 0.45rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.75);\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      font-size: 0.78rem;\n      color: rgba(51, 65, 85, 0.9);\n      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);\n\n      i { font-size: 0.72rem; }\n      strong { font-weight: 600; }\n\n      &--open i { color: #22c55e; }\n      &--date i { color: #3b82f6; }\n    }\n\n    .email-thread-list[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.35rem;\n    }\n\n    .email-thread-item[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.55rem;\n      padding: 0.45rem 0.55rem;\n      border-radius: 10px;\n      background: rgba(255, 255, 255, 0.72);\n      border: 1px solid rgba(148, 163, 184, 0.12);\n      transition: all 200ms ease;\n\n      &:hover {\n        background: rgba(255, 255, 255, 0.92);\n        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);\n        transform: translateX(2px);\n      }\n    }\n\n    .email-thread-item__direction[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 26px;\n      height: 26px;\n      border-radius: 50%;\n      flex-shrink: 0;\n\n      i { font-size: 0.72rem; }\n\n      .email-thread-item--outbound & {\n        background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.1));\n        color: #3b82f6;\n      }\n\n      .email-thread-item--inbound & {\n        background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.1));\n        color: #22c55e;\n      }\n    }\n\n    .email-thread-item__body[_ngcontent-%COMP%] {\n      flex: 1;\n      min-width: 0;\n    }\n\n    .email-thread-item__meta[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.4rem;\n    }\n\n    .email-thread-item__sender[_ngcontent-%COMP%] {\n      font-size: 0.8rem;\n      font-weight: 600;\n      color: rgba(15, 23, 42, 0.85);\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      max-width: 180px;\n    }\n\n    .email-thread-item__date[_ngcontent-%COMP%] {\n      font-size: 0.72rem;\n      color: rgba(100, 116, 139, 0.7);\n      white-space: nowrap;\n    }\n\n    .email-thread-item__subject[_ngcontent-%COMP%] {\n      display: block;\n      font-size: 0.78rem;\n      color: rgba(51, 65, 85, 0.8);\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n\n    .email-thread-item__status[_ngcontent-%COMP%] {\n      flex-shrink: 0;\n    }\n\n    .email-status-badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      padding: 0.1rem 0.38rem;\n      font-size: 0.68rem;\n      font-weight: 600;\n      border-radius: 999px;\n      text-transform: capitalize;\n\n      &[data-status=\"sent\"] {\n        background: rgba(59, 130, 246, 0.12);\n        color: #2563eb;\n      }\n      &[data-status=\"delivered\"] {\n        background: rgba(34, 197, 94, 0.12);\n        color: #16a34a;\n      }\n      &[data-status=\"opened\"] {\n        background: rgba(34, 197, 94, 0.18);\n        color: #15803d;\n      }\n      &[data-status=\"clicked\"] {\n        background: rgba(168, 85, 247, 0.15);\n        color: #7c3aed;\n      }\n      &[data-status=\"bounced\"] {\n        background: rgba(239, 68, 68, 0.12);\n        color: #dc2626;\n      }\n      &[data-status=\"failed\"] {\n        background: rgba(239, 68, 68, 0.15);\n        color: #b91c1c;\n      }\n      &[data-status=\"pending\"],\n      &[data-status=\"queued\"] {\n        background: rgba(148, 163, 184, 0.14);\n        color: #64748b;\n      }\n    }\n\n    .email-engagement-panel__empty[_ngcontent-%COMP%], \n   .email-engagement-panel__loading[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.4rem;\n      padding: 1.2rem 0;\n      font-size: 0.82rem;\n      color: rgba(100, 116, 139, 0.7);\n\n      i { font-size: 1.2rem; }\n    }\n\n    .email-engagement-panel__toggle[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.3rem;\n      width: 100%;\n      margin-top: 0.45rem;\n      padding: 0.35rem 0;\n      border: none;\n      border-radius: 8px;\n      background: rgba(255, 255, 255, 0.5);\n      color: rgba(59, 130, 246, 0.85);\n      font-size: 0.78rem;\n      font-weight: 600;\n      cursor: pointer;\n      transition: all 200ms ease;\n\n      &:hover {\n        background: rgba(59, 130, 246, 0.08);\n        color: #2563eb;\n      }\n\n      i { font-size: 0.68rem; }\n    }\n\n    @media (max-width: 960px) {\n      .conversation-intelligence-panel__overview[_ngcontent-%COMP%], \n   .conversation-intelligence-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n\n      .conversation-intelligence-panel__actions[_ngcontent-%COMP%] {\n        width: 100%;\n        justify-items: stretch;\n      }\n\n      .conversation-intelligence-panel__stats[_ngcontent-%COMP%] {\n        justify-content: flex-start;\n      }\n    }\n\n    \n\n    .ai-summary-card[_ngcontent-%COMP%] {\n      position: relative;\n      margin-top: 1rem;\n      padding: 1rem 1.15rem;\n      background: rgba(255, 255, 255, 0.88);\n      backdrop-filter: blur(18px);\n      border: 1px solid rgba(168, 85, 247, 0.18);\n      border-radius: 14px;\n      box-shadow: 0 4px 18px rgba(168, 85, 247, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04);\n      animation: fade-in-up 0.45s ease-out;\n      overflow: hidden;\n\n      &::before {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        height: 3px;\n        background: linear-gradient(90deg, #667eea, #a855f7, #22d3ee);\n        border-radius: 14px 14px 0 0;\n      }\n    }\n\n    .ai-summary-card__header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n      margin-bottom: 0.75rem;\n    }\n\n    .ai-summary-card__title[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.65rem;\n\n      > i {\n        font-size: 1.1rem;\n        color: #a855f7;\n        flex-shrink: 0;\n      }\n\n      h3 {\n        margin: 0;\n        font-size: 0.9rem;\n        font-weight: 700;\n        color: #1f2937;\n        line-height: 1.2;\n      }\n\n      p {\n        margin: 0;\n        font-size: 0.72rem;\n        color: #6b7280;\n        line-height: 1.3;\n      }\n    }\n\n    .ai-summary-card__generate[_ngcontent-%COMP%] {\n      flex-shrink: 0;\n    }\n\n    .ai-summary-card__body[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .ai-summary-card__summary[_ngcontent-%COMP%] {\n      p {\n        margin: 0;\n        font-size: 0.82rem;\n        color: #374151;\n        line-height: 1.55;\n        font-weight: 450;\n      }\n    }\n\n    .ai-summary-card__section-label[_ngcontent-%COMP%] {\n      font-size: 0.68rem;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      color: #9ca3af;\n      margin-bottom: 0.3rem;\n    }\n\n    .ai-summary-card__meta[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.55rem;\n    }\n\n    .ai-summary-meta-item[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.35rem;\n      padding: 0.35rem 0.65rem;\n      background: rgba(243, 244, 246, 0.7);\n      border-radius: 8px;\n      font-size: 0.76rem;\n      color: #4b5563;\n      transition: all 200ms ease;\n\n      > i {\n        font-size: 0.72rem;\n      }\n\n      .ai-summary-meta-label {\n        color: #9ca3af;\n        font-weight: 500;\n        margin-right: 0.15rem;\n      }\n\n      strong {\n        font-weight: 650;\n        color: #1f2937;\n      }\n\n      &.sentiment--positive {\n        background: rgba(34, 197, 94, 0.1);\n        > i { color: #22c55e; }\n        strong { color: #15803d; }\n      }\n\n      &.sentiment--cautious {\n        background: rgba(245, 158, 11, 0.1);\n        > i { color: #f59e0b; }\n        strong { color: #b45309; }\n      }\n\n      &.sentiment--negative {\n        background: rgba(239, 68, 68, 0.1);\n        > i { color: #ef4444; }\n        strong { color: #b91c1c; }\n      }\n\n      &.sentiment--neutral {\n        background: rgba(107, 114, 128, 0.1);\n        > i { color: #6b7280; }\n        strong { color: #374151; }\n      }\n\n      &--action {\n        background: rgba(99, 102, 241, 0.08);\n        > i { color: #6366f1; }\n        strong { color: #4338ca; }\n      }\n\n      &--time {\n        color: #9ca3af;\n        background: transparent;\n        font-size: 0.7rem;\n        padding: 0.3rem 0;\n      }\n    }\n\n    .ai-summary-card__empty[_ngcontent-%COMP%], \n   .ai-summary-card__loading[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.5rem;\n      padding: 1.5rem 0.75rem;\n      color: #9ca3af;\n      font-size: 0.78rem;\n      text-align: center;\n\n      > i {\n        font-size: 1rem;\n        opacity: 0.7;\n      }\n    }\n\n    [_nghost-%COMP%]     .overview-accordion-shell.p-accordion, \n   [_nghost-%COMP%]     .tab-content-accordion-shell.p-accordion {\n      display: grid;\n      gap: 0.65rem;\n      background: transparent;\n      border: none;\n    }\n\n    [_nghost-%COMP%]     .overview-accordion-shell .p-accordionpanel, \n   [_nghost-%COMP%]     .tab-content-accordion-shell .p-accordionpanel {\n      border-radius: 14px;\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      background: rgba(255, 255, 255, 0.68);\n      box-shadow:\n        0 8px 22px rgba(15, 23, 42, 0.05),\n        inset 0 1px 0 rgba(255, 255, 255, 0.45);\n      overflow: hidden;\n      backdrop-filter: blur(10px);\n      -webkit-backdrop-filter: blur(10px);\n    }\n\n    [_nghost-%COMP%]     .overview-accordion-shell .p-accordionheader, \n   [_nghost-%COMP%]     .tab-content-accordion-shell .p-accordionheader {\n      border: 0;\n      background: transparent;\n    }\n\n    [_nghost-%COMP%]     .overview-accordion-shell .p-accordionheader .p-accordionheader-toggle-icon, \n   [_nghost-%COMP%]     .tab-content-accordion-shell .p-accordionheader .p-accordionheader-toggle-icon {\n      color: rgba(30, 41, 59, 0.7);\n      font-size: 0.85rem;\n    }\n\n    [_nghost-%COMP%]     .overview-accordion-shell .p-accordionheader .p-accordionheader-toggle-icon, \n   [_nghost-%COMP%]     .overview-accordion-shell .p-accordionheader .p-icon-wrapper, \n   [_nghost-%COMP%]     .tab-content-accordion-shell .p-accordionheader .p-accordionheader-toggle-icon, \n   [_nghost-%COMP%]     .tab-content-accordion-shell .p-accordionheader .p-icon-wrapper {\n      margin-inline-end: 0.25rem;\n    }\n\n    [_nghost-%COMP%]     .overview-accordion-shell .p-accordionheader, \n   [_nghost-%COMP%]     .overview-accordion-shell p-accordion-header, \n   [_nghost-%COMP%]     .tab-content-accordion-shell .p-accordionheader, \n   [_nghost-%COMP%]     .tab-content-accordion-shell p-accordion-header {\n      padding: 0.15rem 0.25rem;\n    }\n\n    [_nghost-%COMP%]     .overview-accordion-shell .p-accordioncontent, \n   [_nghost-%COMP%]     .overview-accordion-shell .p-accordioncontent-content, \n   [_nghost-%COMP%]     .tab-content-accordion-shell .p-accordioncontent, \n   [_nghost-%COMP%]     .tab-content-accordion-shell .p-accordioncontent-content {\n      background: transparent;\n      border: 0;\n    }\n\n    [_nghost-%COMP%]     .overview-accordion-shell .p-accordioncontent-content, \n   [_nghost-%COMP%]     .tab-content-accordion-shell .p-accordioncontent-content {\n      padding: 0 0.2rem 0.2rem;\n    }\n\n    .form-section--accordion-body[_ngcontent-%COMP%] {\n      padding: 0.35rem 0.4rem 0.45rem;\n      border: 0;\n      background: transparent;\n    }\n\n    .section-title--accordion[_ngcontent-%COMP%] {\n      margin: 0;\n      width: 100%;\n      border-bottom: 0;\n      padding: 0.45rem 0.55rem;\n      border-radius: 10px;\n      background: rgba(255, 255, 255, 0.35);\n    }\n\n    .section-title--accordion-summary[_ngcontent-%COMP%] {\n      gap: 0.45rem;\n    }\n\n    .accordion-header-summary[_ngcontent-%COMP%] {\n      margin-left: auto;\n      display: inline-flex;\n      align-items: center;\n      justify-content: flex-end;\n      gap: 0.35rem;\n      flex-wrap: wrap;\n      max-width: 68%;\n    }\n\n    .accordion-header-badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      min-height: 26px;\n      padding: 0.22rem 0.55rem;\n      border-radius: 999px;\n      font-size: 0.72rem;\n      font-weight: 800;\n      letter-spacing: 0.02em;\n      line-height: 1;\n      white-space: nowrap;\n      border: 1px solid rgba(148, 163, 184, 0.22);\n      background: rgba(255, 255, 255, 0.72);\n      color: rgba(var(--apple-secondary), 0.92);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.38),\n        0 4px 10px rgba(15, 23, 42, 0.05);\n    }\n\n    .accordion-header-badge--meta[_ngcontent-%COMP%] {\n      font-weight: 700;\n      font-size: 0.68rem;\n      padding-inline: 0.45rem;\n      background: rgba(255, 255, 255, 0.62);\n      color: rgba(var(--apple-gray-0), 0.86);\n      border-color: rgba(148, 163, 184, 0.2);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.32),\n        0 3px 8px rgba(15, 23, 42, 0.04);\n    }\n\n    .accordion-header-badge--meta[data-variant='cyan'][_ngcontent-%COMP%] {\n      background: rgba(6, 182, 212, 0.13);\n      border-color: rgba(14, 165, 233, 0.26);\n      color: #0e7490;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.34),\n        0 4px 10px rgba(14, 165, 233, 0.08);\n    }\n\n    .accordion-header-badge--meta[data-variant='orange'][_ngcontent-%COMP%] {\n      background: rgba(245, 158, 11, 0.14);\n      border-color: rgba(245, 158, 11, 0.24);\n      color: #b45309;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.26),\n        0 4px 10px rgba(245, 158, 11, 0.08);\n    }\n\n    .accordion-header-badge--meta[data-variant='danger'][_ngcontent-%COMP%] {\n      background: rgba(239, 68, 68, 0.13);\n      border-color: rgba(239, 68, 68, 0.24);\n      color: #b91c1c;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.26),\n        0 4px 10px rgba(239, 68, 68, 0.08);\n    }\n\n    .accordion-header-badge--score[data-tone='high'][_ngcontent-%COMP%] {\n      color: #065f46;\n      background: rgba(16, 185, 129, 0.14);\n      border-color: rgba(16, 185, 129, 0.24);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.22),\n        0 6px 12px rgba(16, 185, 129, 0.1);\n    }\n\n    .accordion-header-badge--score[data-tone='medium'][_ngcontent-%COMP%] {\n      color: #92400e;\n      background: rgba(245, 158, 11, 0.14);\n      border-color: rgba(245, 158, 11, 0.24);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.22),\n        0 6px 12px rgba(245, 158, 11, 0.1);\n    }\n\n    .accordion-header-badge--score[data-tone='low'][_ngcontent-%COMP%] {\n      color: #991b1b;\n      background: rgba(239, 68, 68, 0.14);\n      border-color: rgba(239, 68, 68, 0.24);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.22),\n        0 6px 12px rgba(239, 68, 68, 0.1);\n    }\n\n    .accordion-header-badge--score[data-tone='none'][_ngcontent-%COMP%] {\n      opacity: 0.88;\n    }\n\n    @media (max-width: 760px) {\n      .section-title--accordion-summary[_ngcontent-%COMP%] {\n        align-items: flex-start;\n      }\n\n      .accordion-header-summary[_ngcontent-%COMP%] {\n        max-width: 100%;\n        width: 100%;\n        margin-left: 0;\n        justify-content: flex-start;\n        padding-top: 0.15rem;\n      }\n    }\n\n    .qualification-header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 1rem;\n      flex-wrap: wrap;\n      padding: 0.35rem 0;\n    }\n\n    .qualification-legend[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n      padding: 0.25rem 0.5rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.7);\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);\n    }\n\n    .legend-chips[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.4rem;\n      padding: 0.35rem 0.6rem;\n      border-radius: 999px;\n      background: rgba(248, 250, 252, 0.9);\n      border: 1px solid rgba(148, 163, 184, 0.25);\n    }\n\n    .qualification-feedback[_ngcontent-%COMP%] {\n      margin-top: 0.75rem;\n      padding: 0.9rem 1.1rem 1rem;\n      border-radius: 18px;\n      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(239, 246, 255, 0.75));\n      border: 1px solid rgba(59, 130, 246, 0.22);\n      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);\n      display: grid;\n      gap: 0.45rem;\n      position: relative;\n      overflow: hidden;\n    }\n\n    .qualification-feedback[_ngcontent-%COMP%]::before {\n      content: '';\n      position: absolute;\n      inset: 0;\n      background: radial-gradient(circle at 12% 0%, rgba(59, 130, 246, 0.16), transparent 55%);\n      pointer-events: none;\n    }\n\n    .qualification-feedback[_ngcontent-%COMP%]   .feedback-title[_ngcontent-%COMP%] {\n      font-size: 0.78rem;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: rgba(30, 64, 175, 0.85);\n    }\n\n    .qualification-feedback[_ngcontent-%COMP%]   .feedback-metrics[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.8rem;\n      align-items: center;\n      font-size: 0.92rem;\n      color: #0f172a;\n    }\n\n    .qualification-feedback[_ngcontent-%COMP%]   .feedback-item[_ngcontent-%COMP%] {\n      padding: 0.25rem 0.55rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.9);\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);\n    }\n\n    .feedback-icon[_ngcontent-%COMP%] {\n      font-size: 0.85rem;\n      color: rgba(59, 130, 246, 0.9);\n    }\n\n    .feedback-item--confidence[_ngcontent-%COMP%] {\n      color: rgba(37, 99, 235, 0.95);\n    }\n\n    .feedback-item--confidence[_ngcontent-%COMP%]   .feedback-icon[_ngcontent-%COMP%] {\n      color: rgba(37, 99, 235, 0.95);\n    }\n\n    .feedback-item--truth[_ngcontent-%COMP%] {\n      color: rgba(5, 150, 105, 0.95);\n    }\n\n    .feedback-item--truth[_ngcontent-%COMP%]   .feedback-icon[_ngcontent-%COMP%] {\n      color: rgba(5, 150, 105, 0.95);\n    }\n\n    .feedback-item--assumptions[_ngcontent-%COMP%] {\n      color: rgba(217, 119, 6, 0.95);\n    }\n\n    .feedback-item--assumptions[_ngcontent-%COMP%]   .feedback-icon[_ngcontent-%COMP%] {\n      color: rgba(217, 119, 6, 0.95);\n    }\n\n    .feedback-item--weakest[_ngcontent-%COMP%] {\n      color: rgba(124, 58, 237, 0.95);\n    }\n\n    .feedback-item--weakest[_ngcontent-%COMP%]   .feedback-icon[_ngcontent-%COMP%] {\n      color: rgba(124, 58, 237, 0.95);\n    }\n\n    .qualification-feedback[_ngcontent-%COMP%]   .feedback-item[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.45rem;\n      font-weight: 600;\n    }\n\n    .qualification-feedback[_ngcontent-%COMP%]   .feedback-state[_ngcontent-%COMP%] {\n      font-weight: 600;\n      color: rgba(71, 85, 105, 0.95);\n    }\n\n    .qualification-feedback[_ngcontent-%COMP%]   .feedback-suggestions[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.4rem;\n    }\n\n    .qualification-feedback[_ngcontent-%COMP%]   .feedback-suggestions-list[_ngcontent-%COMP%] {\n      margin: 0;\n      padding-left: 1.1rem;\n      color: rgba(30, 64, 175, 0.85);\n      font-size: 0.9rem;\n      line-height: 1.3;\n    }\n\n    .legend-title[_ngcontent-%COMP%] {\n      font-size: 0.8rem;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n      color: rgba(71, 85, 105, 0.8);\n    }\n\n    .qualification-grid[_ngcontent-%COMP%] {\n      margin-top: 0.45rem;\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.6rem 0.75rem;\n    }\n\n    .qualification-grid[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%] {\n      border: 0;\n      border-radius: 0;\n      padding: 0;\n      background: transparent;\n      box-shadow: none;\n      flex-wrap: wrap;\n    }\n\n    .qualification-grid[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n      font-size: 0.78rem;\n      letter-spacing: 0.04em;\n      text-transform: uppercase;\n      color: rgba(71, 85, 105, 0.8);\n    }\n\n    .qual-info-icon[_ngcontent-%COMP%] {\n      font-size: 0.72rem;\n      color: #94a3b8;\n      margin-left: 0.25rem;\n      cursor: help;\n      vertical-align: middle;\n      transition: color 0.2s ease;\n\n      &:hover {\n        color: #667eea;\n      }\n    }\n\n    .select-option[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.55rem;\n    }\n\n    .option-icon[_ngcontent-%COMP%] {\n      font-size: 0.95rem;\n    }\n\n    .tone-unknown[_ngcontent-%COMP%] {\n      color: #64748b;\n    }\n\n    .tone-assumed[_ngcontent-%COMP%] {\n      color: #0ea5e9;\n    }\n\n    .tone-verified[_ngcontent-%COMP%] {\n      color: #16a34a;\n    }\n\n    .tone-invalid[_ngcontent-%COMP%] {\n      color: #ef4444;\n    }\n\n    .tone-neutral[_ngcontent-%COMP%] {\n      color: #a855f7;\n    }\n\n    .history-list[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.85rem;\n      margin-top: 0.5rem;\n    }\n\n    .history-item[_ngcontent-%COMP%] {\n      padding: 0.85rem 1rem;\n      border-radius: 14px;\n      background: rgba(255, 255, 255, 0.7);\n      border: 1px solid rgba(15, 23, 42, 0.08);\n      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);\n      display: grid;\n      gap: 0.4rem;\n    }\n\n    .history-header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n    }\n\n    .history-time[_ngcontent-%COMP%] {\n      font-size: 0.85rem;\n      color: rgba(51, 65, 85, 0.75);\n    }\n\n    .history-meta[_ngcontent-%COMP%] {\n      font-size: 0.85rem;\n      color: rgba(51, 65, 85, 0.8);\n    }\n\n    .history-notes[_ngcontent-%COMP%] {\n      font-size: 0.9rem;\n      color: rgba(30, 41, 59, 0.9);\n    }\n\n    .history-empty[_ngcontent-%COMP%] {\n      padding: 0.85rem 1rem;\n      border-radius: 12px;\n      background: rgba(255, 255, 255, 0.5);\n      border: 1px dashed rgba(148, 163, 184, 0.6);\n      color: rgba(71, 85, 105, 0.9);\n      font-size: 0.9rem;\n    }\n\n    .history-empty__subtle[_ngcontent-%COMP%] {\n      display: block;\n      margin-top: 0.35rem;\n      font-size: 0.82rem;\n      color: rgba(71, 85, 105, 0.78);\n      line-height: 1.35;\n    }\n\n    .cadence-section[_ngcontent-%COMP%] {\n      border: 1px solid rgba(59, 130, 246, 0.18);\n    }\n\n    .cadence-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 1rem 1.25rem;\n    }\n\n    .cadence-actions[_ngcontent-%COMP%] {\n      margin-top: 1rem;\n      display: flex;\n      justify-content: flex-end;\n    }\n\n    .cadence-input[_ngcontent-%COMP%] {\n      width: 100%;\n      border-radius: 14px;\n      border: 1px solid rgba(148, 163, 184, 0.45);\n      background: rgba(255, 255, 255, 0.8);\n      padding: 0.7rem 0.85rem;\n      font-size: 0.95rem;\n      transition: border-color 0.2s ease, box-shadow 0.2s ease;\n    }\n\n    .cadence-input--readonly[_ngcontent-%COMP%] {\n      min-height: 3rem;\n      display: block;\n      line-height: 1.45;\n      color: #334155;\n      background: rgba(248, 250, 252, 0.92);\n      border-style: solid;\n      white-space: normal;\n      word-break: break-word;\n\n      strong {\n        font-weight: 700;\n      }\n    }\n\n    .cadence-input[_ngcontent-%COMP%]:focus {\n      outline: none;\n      border-color: rgba(59, 130, 246, 0.7);\n      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n    }\n\n    .cadence-history[_ngcontent-%COMP%] {\n      margin-top: 1.1rem;\n      display: grid;\n      gap: 0.6rem;\n    }\n\n    .cadence-item[_ngcontent-%COMP%] {\n      padding: 0.75rem 0.9rem;\n      border-radius: 14px;\n      border: 1px solid rgba(59, 130, 246, 0.18);\n      background: rgba(59, 130, 246, 0.06);\n      display: grid;\n      gap: 0.2rem;\n    }\n\n    .cadence-item__meta[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n      font-size: 0.9rem;\n      color: rgba(30, 41, 59, 0.85);\n    }\n\n    .cadence-item__outcome[_ngcontent-%COMP%] {\n      font-weight: 600;\n      color: rgba(15, 23, 42, 0.92);\n    }\n\n    .cadence-item__next[_ngcontent-%COMP%] {\n      font-size: 0.85rem;\n      color: rgba(15, 23, 42, 0.7);\n    }\n\n    .lead-activity-timeline[_ngcontent-%COMP%] {\n      margin-top: 1.15rem;\n      padding-top: 1rem;\n      border-top: 1px solid rgba(148, 163, 184, 0.24);\n      display: grid;\n      gap: 0.9rem;\n    }\n\n    .lead-activity-timeline__header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n    .lead-activity-timeline__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n      margin: 0;\n      display: inline-flex;\n      align-items: center;\n      gap: 0.5rem;\n      font-size: 1.1rem;\n      font-weight: 800;\n      letter-spacing: 0.01em;\n      color: rgba(15, 23, 42, 0.92);\n    }\n\n    .lead-activity-timeline__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      color: #2563eb;\n      filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.22));\n    }\n\n    .lead-activity-timeline__list[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.75rem;\n    }\n\n    .lead-activity-timeline__item[_ngcontent-%COMP%] {\n      width: 100%;\n      display: grid;\n      grid-template-columns: auto 1fr;\n      gap: 0.75rem;\n      align-items: flex-start;\n      text-align: left;\n      border: 1px solid rgba(148, 163, 184, 0.28);\n      border-radius: 16px;\n      background:\n        linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(248, 250, 252, 0.7));\n      padding: 0.9rem 1rem;\n      cursor: pointer;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.75),\n        0 6px 14px rgba(15, 23, 42, 0.04);\n      transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease,\n        background-color 0.18s ease;\n    }\n\n    .lead-activity-timeline__item[_ngcontent-%COMP%]:hover {\n      border-color: rgba(59, 130, 246, 0.35);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.82),\n        0 12px 22px rgba(37, 99, 235, 0.09);\n      transform: translateY(-1px);\n    }\n\n    .lead-activity-timeline__icon[_ngcontent-%COMP%] {\n      width: 2.35rem;\n      height: 2.35rem;\n      border-radius: 12px;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      border: 1px solid rgba(148, 163, 184, 0.28);\n      background: rgba(255, 255, 255, 0.72);\n      color: rgba(51, 65, 85, 0.88);\n      font-size: 1rem;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.7),\n        0 4px 10px rgba(15, 23, 42, 0.05);\n      flex-shrink: 0;\n    }\n\n    .lead-activity-timeline__icon[data-type='Meeting'][_ngcontent-%COMP%] {\n      color: #1d4ed8;\n      background: linear-gradient(180deg, rgba(191, 219, 254, 0.92), rgba(219, 234, 254, 0.8));\n      border-color: rgba(59, 130, 246, 0.32);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.72),\n        0 4px 12px rgba(59, 130, 246, 0.16);\n    }\n\n    .lead-activity-timeline__icon[data-type='Call'][_ngcontent-%COMP%] {\n      color: #0e7490;\n      background: linear-gradient(180deg, rgba(165, 243, 252, 0.92), rgba(207, 250, 254, 0.84));\n      border-color: rgba(6, 182, 212, 0.32);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.72),\n        0 4px 12px rgba(6, 182, 212, 0.14);\n    }\n\n    .lead-activity-timeline__icon[data-type='Email'][_ngcontent-%COMP%] {\n      color: #6d28d9;\n      background: linear-gradient(180deg, rgba(221, 214, 254, 0.94), rgba(237, 233, 254, 0.86));\n      border-color: rgba(139, 92, 246, 0.32);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.72),\n        0 4px 12px rgba(139, 92, 246, 0.14);\n    }\n\n    .lead-activity-timeline__icon[data-type='Task'][_ngcontent-%COMP%] {\n      color: #15803d;\n      background: linear-gradient(180deg, rgba(187, 247, 208, 0.92), rgba(220, 252, 231, 0.84));\n      border-color: rgba(34, 197, 94, 0.32);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.72),\n        0 4px 12px rgba(34, 197, 94, 0.14);\n    }\n\n    .lead-activity-timeline__content[_ngcontent-%COMP%] {\n      min-width: 0;\n      display: grid;\n      gap: 0.35rem;\n    }\n\n    .lead-activity-timeline__top[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n    .lead-activity-timeline__subject[_ngcontent-%COMP%] {\n      font-weight: 700;\n      font-size: 1rem;\n      line-height: 1.25;\n      color: rgba(15, 23, 42, 0.94);\n    }\n\n    .lead-activity-timeline__status[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: 999px;\n      padding: 0.2rem 0.55rem;\n      font-size: 0.78rem;\n      font-weight: 800;\n      letter-spacing: 0.02em;\n      border: 1px solid rgba(148, 163, 184, 0.22);\n      background: rgba(255, 255, 255, 0.72);\n      color: rgba(51, 65, 85, 0.9);\n    }\n\n    .lead-activity-timeline__status[data-status='Completed'][_ngcontent-%COMP%] {\n      color: #166534;\n      background: linear-gradient(180deg, rgba(187, 247, 208, 0.92), rgba(220, 252, 231, 0.85));\n      border-color: rgba(34, 197, 94, 0.3);\n    }\n\n    .lead-activity-timeline__status[data-status='Overdue'][_ngcontent-%COMP%] {\n      color: #991b1b;\n      background: linear-gradient(180deg, rgba(254, 202, 202, 0.94), rgba(254, 226, 226, 0.9));\n      border-color: rgba(239, 68, 68, 0.3);\n    }\n\n    .lead-activity-timeline__status[data-status='Open'][_ngcontent-%COMP%] {\n      color: #92400e;\n      background: linear-gradient(180deg, rgba(253, 230, 138, 0.92), rgba(254, 243, 199, 0.88));\n      border-color: rgba(245, 158, 11, 0.3);\n    }\n\n    .lead-activity-timeline__meta[_ngcontent-%COMP%] {\n      font-size: 0.9rem;\n      color: rgba(51, 65, 85, 0.82);\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.35rem;\n      line-height: 1.35;\n    }\n\n  .lead-activity-timeline__outcome[_ngcontent-%COMP%] {\n      font-size: 0.96rem;\n      color: rgba(30, 41, 59, 0.92);\n      line-height: 1.45;\n      background: rgba(59, 130, 246, 0.05);\n      border: 1px solid rgba(59, 130, 246, 0.12);\n      border-radius: 10px;\n      padding: 0.35rem 0.5rem;\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: vertical;\n      overflow: hidden;\n  }\n\n  .lead-activity-transfer-summary[_ngcontent-%COMP%] {\n    margin-top: 0.25rem;\n    display: grid;\n    gap: 0.55rem;\n    padding: 0.85rem 0.95rem;\n    border-radius: 14px;\n    border: 1px solid rgba(99, 102, 241, 0.22);\n    background: linear-gradient(180deg, rgba(238, 242, 255, 0.78), rgba(224, 231, 255, 0.6));\n    box-shadow: 0 10px 22px rgba(79, 70, 229, 0.08);\n  }\n\n  .lead-activity-transfer-summary__header[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    font-weight: 700;\n    color: #3730a3;\n  }\n\n  .lead-activity-transfer-summary__header[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n    color: #4f46e5;\n  }\n\n  .lead-activity-transfer-summary__text[_ngcontent-%COMP%] {\n    margin: 0;\n    color: rgba(30, 41, 59, 0.88);\n    font-size: 0.9rem;\n    line-height: 1.35;\n  }\n\n  .lead-activity-transfer-summary__last[_ngcontent-%COMP%] {\n    display: grid;\n    gap: 0.2rem;\n    padding: 0.55rem 0.65rem;\n    border-radius: 10px;\n    border: 1px solid rgba(148, 163, 184, 0.18);\n    background: rgba(255, 255, 255, 0.7);\n  }\n\n  .lead-activity-transfer-summary__label[_ngcontent-%COMP%] {\n    font-size: 0.72rem;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: rgba(71, 85, 105, 0.78);\n    font-weight: 700;\n  }\n\n  .lead-activity-transfer-summary__last[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n    color: rgba(15, 23, 42, 0.95);\n  }\n\n  .lead-activity-transfer-summary__last[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child {\n    font-size: 0.82rem;\n    color: rgba(71, 85, 105, 0.85);\n  }\n\n    \n\n\n\n\n    .form-section[_ngcontent-%COMP%] {\n      position: relative;\n      background: transparent;\n      border-radius: 0;\n      padding: 0.55rem 0.2rem 0.65rem;\n      border: 0;\n      box-shadow: none;\n      overflow: visible;\n    }\n\n    .form-section[_ngcontent-%COMP%]    + .form-section[_ngcontent-%COMP%] {\n      border-top: 1px solid rgba(148, 163, 184, 0.2);\n      padding-top: 0.75rem;\n    }\n\n    .form-section--qualification[_ngcontent-%COMP%] {\n      padding-bottom: 0.9rem;\n    }\n\n    .form-section--overview[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .section-block[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.7rem;\n      padding: 0.7rem 0.75rem;\n      border-radius: 14px;\n      background: linear-gradient(\n        180deg,\n        rgba(255, 255, 255, 0.56) 0%,\n        rgba(255, 255, 255, 0.42) 100%\n      );\n      border: 1px solid rgba(148, 163, 184, 0.14);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.75),\n        0 6px 18px rgba(15, 23, 42, 0.04);\n    }\n\n    .section-divider[_ngcontent-%COMP%] {\n      height: 1px;\n      width: 100%;\n      background: rgba(148, 163, 184, 0.18);\n    }\n\n    \n\n\n\n\n    .section-title[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.55rem;\n      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n      font-size: 1rem;\n      font-weight: 600;\n      text-transform: none;\n      letter-spacing: -0.01em;\n      color: #0e7490;\n      margin: 0 0 0.4rem;\n      padding-bottom: 0.35rem;\n      border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n      transition: all 0.3s ease;\n    }\n\n    .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      width: 30px;\n      height: 30px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(8, 145, 178, 0.1) 100%);\n      color: #06b6d4;\n      font-size: 0.95rem;\n      border-radius: 8px;\n      transition: all 0.3s ease;\n      box-shadow: 0 2px 8px rgba(6, 182, 212, 0.15);\n    }\n\n    \n\n\n\n\n    .form-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 0.9rem 1rem;\n    }\n\n    .full-row[_ngcontent-%COMP%] {\n      grid-column: 1 / -1;\n    }\n\n    \n\n    .form-field[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 0.35rem 0.45rem 0.45rem;\n      border-radius: 12px;\n      background: rgba(255, 255, 255, 0.35);\n      border: 1px solid transparent;\n      transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n      > label {\n        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n        font-size: 0.8125rem;\n        font-weight: 600;\n        color: #475569;\n        letter-spacing: 0.01em;\n        white-space: nowrap;\n        min-width: 110px;\n        flex-shrink: 0;\n        text-align: right;\n        transition: color 0.2s ease;\n      }\n\n      > p-inputgroup,\n      > -shadowcsshost-no-combinator ::ng-deep p-inputgroup,\n      > p-select,\n      > p-inputnumber,\n      > p-datepicker,\n      > input,\n      > textarea,\n      > .phone-grid,\n      > .score-content {\n        flex: 1;\n        min-width: 0;\n      }\n\n      &:hover {\n        background: rgba(255, 255, 255, 0.5);\n        border-color: rgba(148, 163, 184, 0.16);\n\n        > label { color: #334155; }\n      }\n\n      &:focus-within {\n        background: rgba(255, 255, 255, 0.72);\n        border-color: rgba(var(--apple-blue), 0.22);\n        box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n\n        > label { color: #4f46e5; }\n      }\n\n      &.full-row {\n        flex-direction: column;\n        align-items: stretch;\n\n        > label {\n          text-align: left;\n          min-width: unset;\n        }\n      }\n    }\n\n    .required[_ngcontent-%COMP%] {\n      color: rgba(var(--apple-pink), 1);\n      font-weight: 600;\n    }\n\n    \n\n\n\n\n    [_nghost-%COMP%]     .p-inputtext, \n   [_nghost-%COMP%]     .p-select, \n   [_nghost-%COMP%]     .p-inputnumber, \n   [_nghost-%COMP%]     .p-textarea {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;\n      color: #1e293b !important;\n      font-weight: 500 !important;\n      background: rgba(var(--apple-gray-6), 0.5) !important;\n      border: 1px solid rgba(var(--apple-gray-4), 0.4) !important;\n      border-radius: 12px !important;\n      font-size: 0.9375rem !important;\n      padding: 0.75rem 1rem !important;\n      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      box-shadow: \n        inset 0 1px 2px rgba(0, 0, 0, 0.02),\n        0 1px 2px rgba(255, 255, 255, 0.5) !important;\n    }\n\n    [_nghost-%COMP%]     .p-inputgroup .phone-type-select {\n      min-width: 9rem;\n    }\n\n    [_nghost-%COMP%]     .p-inputgroup .phone-country-select {\n      min-width: 12rem;\n    }\n\n    [_nghost-%COMP%]     .p-inputgroup .p-inputtext {\n      min-width: 0;\n    }\n\n    .phone-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: minmax(9rem, 0.8fr) minmax(15rem, 1.4fr) minmax(16rem, 1.4fr);\n      gap: 0.6rem;\n      align-items: center;\n      padding: 0.35rem;\n      border-radius: 12px;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.42));\n      border: 1px solid rgba(59, 130, 246, 0.08);\n    }\n\n    .phone-country-option[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n\n      span {\n        white-space: nowrap;\n      }\n\n      strong {\n        color: rgba(var(--apple-blue), 1);\n        font-size: 0.8rem;\n      }\n    }\n\n    .field-note[_ngcontent-%COMP%] {\n      margin: 0.1rem 0 0;\n      font-size: 0.78rem;\n      color: rgba(var(--apple-secondary), 0.62);\n    }\n\n    [_nghost-%COMP%]     .p-inputtext:hover, \n   [_nghost-%COMP%]     .p-select:hover, \n   [_nghost-%COMP%]     .p-inputnumber:hover, \n   [_nghost-%COMP%]     .p-textarea:hover {\n      background: rgba(var(--apple-gray-5), 0.6) !important;\n      border-color: rgba(var(--apple-gray-3), 0.5) !important;\n      box-shadow: \n        inset 0 1px 2px rgba(0, 0, 0, 0.02),\n        0 2px 4px rgba(0, 0, 0, 0.02) !important;\n    }\n\n    [_nghost-%COMP%]     .p-inputtext:focus, \n   [_nghost-%COMP%]     .p-select:focus, \n   [_nghost-%COMP%]     .p-select.p-focus, \n   [_nghost-%COMP%]     .p-inputnumber:focus, \n   [_nghost-%COMP%]     .p-textarea:focus {\n      background: rgba(255, 255, 255, 0.95) !important;\n      border-color: rgba(var(--apple-blue), 0.5) !important;\n      box-shadow: \n        0 0 0 4px rgba(var(--apple-blue), 0.15),\n        0 4px 12px rgba(var(--apple-blue), 0.1),\n        inset 0 0 0 1px rgba(var(--apple-blue), 0.2) !important;\n      outline: none !important;\n    }\n\n    [_nghost-%COMP%]     .p-inputtext::placeholder {\n      color: rgba(var(--apple-gray-1), 0.6);\n      font-weight: 400;\n    }\n\n    [_nghost-%COMP%]     .p-select.p-disabled, \n   [_nghost-%COMP%]     .p-select[aria-disabled='true'] {\n      opacity: 0.82 !important;\n      filter: grayscale(0.04);\n      cursor: not-allowed !important;\n      pointer-events: none;\n      background: rgba(var(--apple-gray-6), 0.62) !important;\n      border-color: rgba(var(--apple-gray-4), 0.4) !important;\n      box-shadow: none !important;\n    }\n\n    [_nghost-%COMP%]     .form-section--qualification .p-select .p-select-label, \n   [_nghost-%COMP%]     .form-section--qualification .p-select .p-placeholder, \n   [_nghost-%COMP%]     .form-section--qualification .p-select .select-option span {\n      color: #334155 !important;\n      font-weight: 600 !important;\n    }\n\n    [_nghost-%COMP%]     .form-section--qualification .p-select .p-select-dropdown {\n      color: #94a3b8 !important;\n    }\n\n    .status-option[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.5rem;\n      font-weight: 600;\n    }\n\n    .status-option[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      font-size: 0.9rem;\n    }\n\n    @media (max-width: 860px) {\n      .phone-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n        gap: 0.5rem;\n        padding: 0.45rem;\n      }\n\n    }\n\n    .status-placeholder[_ngcontent-%COMP%] {\n      color: rgba(var(--apple-gray-1), 0.6);\n      font-weight: 500;\n    }\n\n    .disposition-actions[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n    .disposition-actions__hint[_ngcontent-%COMP%] {\n      font-size: 0.9rem;\n      color: rgba(var(--apple-gray-1), 0.78);\n    }\n\n    .form-field--status-fallback[_ngcontent-%COMP%] {\n      border: 1px dashed rgba(148, 163, 184, 0.32);\n      border-radius: 16px;\n      padding: 0.85rem;\n      background: rgba(248, 250, 252, 0.65);\n    }\n\n    .status-option[data-status=\"New\"][_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: #06b6d4; }\n    .status-option[data-status=\"Contacted\"][_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: #f59e0b; }\n    .status-option[data-status=\"Qualified\"][_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: #10b981; }\n    .status-option[data-status=\"Converted\"][_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: #6366f1; }\n    .status-option[data-status=\"Lost\"][_ngcontent-%COMP%]   i[_ngcontent-%COMP%] { color: #ef4444; }\n\n    .status-note[_ngcontent-%COMP%] {\n      margin: 0.5rem 0 0;\n      font-size: 0.82rem;\n      color: rgba(var(--apple-secondary), 0.7);\n\n      p { margin: 0; }\n\n      .status-action-link {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.3rem;\n        margin-top: 0.35rem;\n        font-size: 0.8rem;\n        font-weight: 600;\n        color: #4f46e5;\n        cursor: pointer;\n        transition: color 200ms;\n\n        &:hover { color: #4338ca; }\n\n        i { font-size: 0.75rem; }\n      }\n    }\n\n    .status-rule[_ngcontent-%COMP%] {\n      margin: 0.35rem 0 0;\n      font-size: 0.78rem;\n      color: rgba(100, 116, 139, 0.9);\n    }\n\n    .status-error[_ngcontent-%COMP%] {\n      margin: 0.25rem 0 0;\n      font-size: 0.8rem;\n      font-weight: 600;\n      color: #b91c1c;\n    }\n\n    .info-icon[_ngcontent-%COMP%] {\n      margin-left: 0.35rem;\n      color: rgba(99, 102, 241, 0.8);\n      cursor: pointer;\n    }\n\n    .status-note[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n      color: rgba(var(--apple-label), 0.9);\n    }\n\n    \n\n\n    .form-field--stepper[_ngcontent-%COMP%] {\n      flex-direction: column !important;\n      align-items: flex-start !important;\n\n      > label {\n        text-align: left;\n        min-width: unset;\n        margin-bottom: 0.35rem;\n      }\n    }\n\n    \n\n\n    .status-ribbon[_ngcontent-%COMP%] {\n      flex: 1;\n      min-width: 0;\n      animation: fade-in-up 0.5s ease-out 0.15s both;\n    }\n\n    .status-ribbon__inner[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: minmax(16rem, auto) minmax(0, 1fr);\n      align-items: end;\n      column-gap: 1.1rem;\n      row-gap: 0.45rem;\n      padding: 0.35rem 0.8rem;\n      background: rgba(255, 255, 255, 0.55);\n      -webkit-backdrop-filter: blur(16px);\n      backdrop-filter: blur(16px);\n      border: 1px solid rgba(255, 255, 255, 0.45);\n      border-radius: 14px;\n      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);\n      max-height: min(26rem, calc(100vh - 12rem));\n      overflow-y: auto;\n      overscroll-behavior: contain;\n\n      .lead-stepper--ribbon {\n        display: flex;\n        flex-direction: column;\n        align-items: stretch;\n        gap: 0.4rem;\n        flex: 1;\n        min-width: 0;\n        grid-column: 2;\n        align-self: end;\n      }\n\n      .lead-stepper__mobile-summary {\n        display: none;\n      }\n\n      .status-ribbon__meta-strip {\n        display: flex;\n        flex-direction: column;\n        align-items: flex-start;\n        justify-content: flex-end;\n        gap: 0.45rem;\n        padding-bottom: 0.7rem;\n        min-width: 0;\n        grid-column: 1;\n      }\n\n      .status-ribbon__score {\n        display: inline-flex;\n        align-items: center;\n        flex: 0 0 auto;\n      }\n\n      .status-ribbon__score-knob {\n        display: inline-flex;\n      }\n\n      -shadowcsshost-no-combinator ::ng-deep .status-ribbon__score-knob-control {\n        width: 92px;\n        height: 92px;\n      }\n\n      -shadowcsshost-no-combinator ::ng-deep .status-ribbon__score-knob-control .p-knob-text {\n        font-size: 1rem;\n        font-weight: 800;\n      }\n\n      .status-ribbon__meta-pills {\n        display: inline-flex;\n        gap: 0.35rem;\n        min-width: 0;\n        flex-wrap: wrap;\n      }\n\n      .status-ribbon__meta-pill {\n        display: inline-flex;\n        padding: 0.22rem 0.6rem;\n        border-radius: 999px;\n        color: #334155;\n        font-size: 0.74rem;\n      }\n\n      .status-ribbon__meta-pill--status {\n        color: #2563eb;\n        background: rgba(219, 234, 254, 0.82);\n      }\n\n      .status-ribbon__meta-copy {\n        color: #475569;\n        font-size: 0.8rem;\n      }\n\n      .lead-stepper__desktop-path {\n        display: block;\n        position: relative;\n        padding-bottom: 3.5rem;\n      }\n\n      .lead-stepper__track {\n        flex: 1;\n        padding: 0.1rem 0;\n      }\n\n      .lead-stepper__branch-lane {\n        position: absolute;\n        left: 50%;\n        top: 2.85rem;\n        width: 12.5rem;\n        height: 3.45rem;\n        transform: translateX(-50%);\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        gap: 0.35rem;\n      }\n\n      .lead-stepper__branch-stem {\n        position: static;\n        width: 2px;\n        height: 0.7rem;\n        border-left: none;\n        border-bottom: none;\n        border-radius: 999px;\n        background: rgba(148, 163, 184, 0.35);\n\n        &[data-state=\"current\"] {\n          background: linear-gradient(180deg, #8b5cf6, #7c3aed);\n        }\n\n        &[data-state=\"available\"] {\n          background: linear-gradient(180deg, rgba(99, 102, 241, 0.45), rgba(99, 102, 241, 0.18));\n        }\n\n        &[data-state=\"locked\"] {\n          background: rgba(148, 163, 184, 0.2);\n        }\n      }\n\n      .lead-stepper__icon {\n        width: 30px;\n        height: 30px;\n        font-size: 0.74rem;\n      }\n\n      .lead-stepper__label {\n        font-size: 0.64rem;\n        max-width: 72px;\n      }\n\n      .lead-stepper__connector {\n        min-width: 14px;\n      }\n\n      .lead-status-rail {\n        display: grid;\n        grid-template-columns: minmax(16rem, auto) minmax(0, 1fr);\n        align-items: start;\n        gap: 0.75rem;\n        padding-top: 0.15rem;\n        border-top: 1px solid rgba(148, 163, 184, 0.16);\n        grid-column: 1 / -1;\n      }\n    }\n\n    .status-ribbon__mobile-toggle[_ngcontent-%COMP%] {\n      display: none;\n    }\n\n    @media (max-width: 1180px) and (min-width: 769px) {\n      .status-ribbon__inner[_ngcontent-%COMP%] {\n        .lead-stepper__branch-lane {\n          top: 2.7rem;\n          width: 11.8rem;\n          height: 3.2rem;\n        }\n      }\n    }\n\n    @media (max-width: 768px) {\n      .status-ribbon__inner[_ngcontent-%COMP%] {\n        display: flex;\n        flex-direction: column;\n        align-items: stretch;\n        padding: 0.5rem 0.75rem;\n        border-radius: 12px;\n\n        .status-ribbon__meta-strip {\n          display: none;\n        }\n\n        .lead-status-rail {\n          display: flex;\n          flex-direction: column;\n        }\n\n        .lead-status-rail__actions {\n          width: 100%;\n          min-width: 0;\n          align-items: stretch;\n        }\n\n        .lead-status-rail__primary {\n          width: 100%;\n        }\n\n        .lead-status-rail__secondary {\n          justify-content: stretch;\n        }\n\n        .lead-stepper__branch-lane {\n          position: static;\n          width: auto;\n          height: auto;\n          transform: none;\n          display: flex;\n          align-items: flex-start;\n          gap: 0.65rem;\n          padding-left: 5.6rem;\n          margin-top: 0.2rem;\n        }\n\n        .lead-stepper__branch-stem {\n          position: static;\n          width: 2px;\n          height: 22px;\n          margin-left: 0.9rem;\n          border-left: none;\n          border-bottom: none;\n          border-radius: 999px;\n          background: rgba(148, 163, 184, 0.35);\n\n          &[data-state=\"current\"] {\n            background: linear-gradient(180deg, #8b5cf6, #7c3aed);\n          }\n\n          &[data-state=\"available\"] {\n            background: linear-gradient(180deg, rgba(99, 102, 241, 0.45), rgba(99, 102, 241, 0.18));\n          }\n\n          &[data-state=\"locked\"] {\n            background: rgba(148, 163, 184, 0.2);\n          }\n        }\n\n        .lead-stepper__branch {\n          position: static;\n        }\n      }\n\n      .status-ribbon__mobile-toggle[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: flex-end;\n      }\n\n      .status-ribbon__mobile-toggle-btn[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.4rem;\n        border: none;\n        background: transparent;\n        color: #2563eb;\n        font-weight: 700;\n        font-size: 0.82rem;\n        padding: 0;\n        cursor: pointer;\n      }\n\n      .status-ribbon[_ngcontent-%COMP%]   .lead-stepper__mobile-summary[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        gap: 0.75rem;\n        padding: 0.7rem 0.85rem;\n        border-radius: 12px;\n        background: rgba(255, 255, 255, 0.82);\n        border: 1px solid rgba(148, 163, 184, 0.18);\n      }\n\n      .status-ribbon[_ngcontent-%COMP%]   .lead-stepper__mobile-status[_ngcontent-%COMP%] {\n        font-size: 0.88rem;\n        font-weight: 700;\n        color: #0f172a;\n      }\n\n      .status-ribbon[_ngcontent-%COMP%]   .lead-stepper__mobile-next[_ngcontent-%COMP%] {\n        font-size: 0.78rem;\n        color: #475569;\n        text-align: right;\n      }\n\n      .status-ribbon[_ngcontent-%COMP%]   .lead-stepper__desktop-path[_ngcontent-%COMP%] {\n        display: none;\n      }\n\n      .status-ribbon[_ngcontent-%COMP%]   .lead-stepper__desktop-path--expanded[_ngcontent-%COMP%] {\n        display: block;\n      }\n    }\n\n    .lead-status-rail__summary[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.25rem;\n      min-width: 0;\n      grid-column: 1;\n    }\n\n    .lead-status-rail__current[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.15rem;\n    }\n\n    .lead-status-rail__eyebrow[_ngcontent-%COMP%] {\n      font-size: 0.64rem;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n    }\n\n    .lead-status-rail__value[_ngcontent-%COMP%] {\n      font-size: 0.88rem;\n      font-weight: 700;\n      color: #0f172a;\n    }\n\n    .lead-status-rail__instruction[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 0.8rem;\n      color: #334155;\n    }\n\n    .lead-status-rail__blocker-panel[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.35rem;\n    }\n\n    .lead-status-rail__blocker-label[_ngcontent-%COMP%] {\n      font-size: 0.79rem;\n      font-weight: 700;\n      color: #92400e;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n    }\n\n    .lead-status-rail__blockers[_ngcontent-%COMP%] {\n      margin: 0;\n      padding-left: 1rem;\n      color: #b45309;\n      font-size: 0.84rem;\n      display: grid;\n      gap: 0.2rem;\n    }\n\n    .lead-status-rail__actions[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-end;\n      gap: 0.45rem;\n      min-width: 12rem;\n      grid-column: 2;\n      justify-self: end;\n      align-self: start;\n    }\n\n    .lead-status-rail__primary[_ngcontent-%COMP%], \n   .lead-status-rail__branch[_ngcontent-%COMP%], \n   .lead-status-rail__secondary-btn[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.45rem;\n      border-radius: 12px;\n      border: 1px solid rgba(59, 130, 246, 0.2);\n      padding: 0.55rem 0.85rem;\n      font-weight: 700;\n      cursor: pointer;\n      transition: all 0.2s ease;\n      white-space: nowrap;\n      font-size: 0.82rem;\n    }\n\n    .lead-status-rail__primary[_ngcontent-%COMP%] {\n      min-width: 11.75rem;\n      background: linear-gradient(135deg, #3b82f6, #2563eb);\n      color: #fff;\n      box-shadow: 0 10px 22px rgba(37, 99, 235, 0.24);\n    }\n\n    .lead-status-rail__branch[_ngcontent-%COMP%] {\n      min-width: 11.75rem;\n      background: linear-gradient(135deg, rgba(139, 92, 246, 0.16), rgba(124, 58, 237, 0.12));\n      color: #6d28d9;\n      border-color: rgba(124, 58, 237, 0.22);\n      box-shadow: 0 8px 20px rgba(124, 58, 237, 0.14);\n    }\n\n    .lead-status-rail__primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 14px 26px rgba(37, 99, 235, 0.28);\n    }\n\n    .lead-status-rail__branch[_ngcontent-%COMP%]:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 12px 24px rgba(124, 58, 237, 0.18);\n    }\n\n    .lead-status-rail__primary[_ngcontent-%COMP%]:disabled, \n   .lead-status-rail__branch[_ngcontent-%COMP%]:disabled, \n   .lead-status-rail__secondary-btn[_ngcontent-%COMP%]:disabled {\n      opacity: 0.55;\n      cursor: not-allowed;\n      box-shadow: none;\n    }\n\n    .lead-status-rail__secondary[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      justify-content: flex-end;\n      gap: 0.55rem;\n    }\n\n    .lead-status-rail__secondary-btn[_ngcontent-%COMP%] {\n      background: rgba(255, 255, 255, 0.62);\n      color: #475569;\n      border-color: rgba(148, 163, 184, 0.18);\n      font-weight: 600;\n      box-shadow: none;\n    }\n\n    @media (max-width: 600px) {\n      .status-ribbon__inner[_ngcontent-%COMP%] {\n        .lead-stepper__icon {\n          width: 28px;\n          height: 28px;\n          font-size: 0.72rem;\n        }\n\n        .lead-stepper__label {\n          font-size: 0.6rem;\n          max-width: 50px;\n        }\n\n        .lead-stepper__connector {\n          min-width: 10px;\n        }\n\n        .lead-stepper__branch-lane {\n          padding-left: 5.2rem;\n        }\n\n        .lead-stepper__branch {\n          position: static;\n          min-width: 0;\n          width: 100%;\n        }\n      }\n    }\n\n    \n\n\n    .lead-stepper[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n\n    .lead-stepper__track[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0;\n      padding: 0.6rem 0;\n    }\n\n    .lead-stepper__branch-lane[_ngcontent-%COMP%] {\n      position: absolute;\n      left: 50%;\n      top: 2.4rem;\n      width: 11.5rem;\n      height: 2.9rem;\n      transform: translateX(-50%);\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 0.2rem;\n    }\n\n    .lead-stepper__branch[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.7rem;\n      border: 1px solid rgba(148, 163, 184, 0.22);\n      border-radius: 14px;\n      background: rgba(255, 255, 255, 0.78);\n      padding: 0.36rem 0.58rem;\n      min-width: 11.5rem;\n      text-align: left;\n      transition: all 200ms ease;\n      cursor: default;\n      position: static;\n    }\n\n    .lead-stepper__branch--clickable[_ngcontent-%COMP%] {\n      cursor: pointer;\n\n      &:hover {\n        transform: translateY(-1px);\n        box-shadow: 0 10px 24px rgba(124, 58, 237, 0.14);\n      }\n    }\n\n    .lead-stepper__branch-icon[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 26px;\n      height: 26px;\n      border-radius: 50%;\n      background: rgba(139, 92, 246, 0.12);\n      color: #7c3aed;\n      flex-shrink: 0;\n    }\n\n    .lead-stepper__branch-copy[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.12rem;\n      min-width: 0;\n    }\n\n    .lead-stepper__branch-label[_ngcontent-%COMP%] {\n      font-size: 0.68rem;\n      font-weight: 700;\n      color: #4c1d95;\n    }\n\n    .lead-stepper__branch-meta[_ngcontent-%COMP%] {\n      font-size: 0.58rem;\n      color: #6b7280;\n    }\n\n    .lead-stepper__branch[data-state=\"current\"][_ngcontent-%COMP%] {\n      border-color: rgba(124, 58, 237, 0.26);\n      background: linear-gradient(135deg, rgba(139, 92, 246, 0.14), rgba(255, 255, 255, 0.92));\n      box-shadow: 0 10px 22px rgba(124, 58, 237, 0.16);\n\n      .lead-stepper__branch-icon {\n        background: linear-gradient(135deg, #8b5cf6, #7c3aed);\n        color: #fff;\n      }\n    }\n\n    .lead-stepper__branch[data-state=\"locked\"][_ngcontent-%COMP%] {\n      opacity: 0.55;\n    }\n\n    .lead-stepper__step[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 0.35rem;\n      flex-shrink: 0;\n      cursor: default;\n      transition: opacity 200ms, transform 200ms;\n    }\n\n    .lead-stepper__step--clickable[_ngcontent-%COMP%] {\n      cursor: pointer;\n\n      &:hover {\n        transform: translateY(-2px);\n\n        .lead-stepper__icon {\n          box-shadow: 0 4px 14px rgba(102, 126, 234, 0.35);\n          transform: scale(1.08);\n        }\n      }\n    }\n\n    .lead-stepper__icon[_ngcontent-%COMP%] {\n      width: 36px;\n      height: 36px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 0.85rem;\n      font-weight: 600;\n      border: 2px solid transparent;\n      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    }\n\n    .lead-stepper__label[_ngcontent-%COMP%] {\n      font-size: 0.72rem;\n      font-weight: 600;\n      letter-spacing: 0.02em;\n      text-align: center;\n      max-width: 72px;\n      line-height: 1.2;\n      transition: color 200ms;\n    }\n\n    .lead-stepper__connector[_ngcontent-%COMP%] {\n      flex: 1;\n      min-width: 24px;\n      height: 2px;\n      background: rgba(148, 163, 184, 0.35);\n      margin: 0 0.15rem;\n      margin-bottom: 1.2rem; // offset for label height\n      border-radius: 1px;\n      transition: background 400ms;\n\n      &[data-filled=\"true\"] {\n        background: linear-gradient(90deg, #22c55e, #4ade80);\n      }\n    }\n\n    \n\n    .lead-stepper__step[data-state=\"completed\"][_ngcontent-%COMP%] {\n      .lead-stepper__icon {\n        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);\n        color: #fff;\n        border-color: #22c55e;\n        box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);\n      }\n      .lead-stepper__label {\n        color: #16a34a;\n        font-weight: 700;\n      }\n    }\n\n    .lead-stepper__step[data-state=\"current\"][_ngcontent-%COMP%] {\n      .lead-stepper__icon {\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n        color: #fff;\n        border-color: #667eea;\n        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.18), 0 4px 12px rgba(102, 126, 234, 0.25);\n        animation: _ngcontent-%COMP%_stepper-pulse 2s ease-in-out infinite;\n      }\n      .lead-stepper__label {\n        color: #4338ca;\n        font-weight: 700;\n      }\n    }\n\n    .lead-stepper__step[data-state=\"available\"][_ngcontent-%COMP%] {\n      .lead-stepper__icon {\n        background: rgba(255, 255, 255, 0.85);\n        color: #667eea;\n        border-color: rgba(102, 126, 234, 0.4);\n      }\n      .lead-stepper__label {\n        color: #475569;\n      }\n    }\n\n    .lead-stepper__step[data-state=\"locked\"][_ngcontent-%COMP%] {\n      opacity: 0.5;\n      cursor: not-allowed;\n\n      .lead-stepper__icon {\n        background: rgba(148, 163, 184, 0.15);\n        color: #94a3b8;\n        border-color: rgba(148, 163, 184, 0.3);\n      }\n      .lead-stepper__label {\n        color: #94a3b8;\n      }\n    }\n\n    @keyframes _ngcontent-%COMP%_stepper-pulse {\n      0%, 100% { box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.18), 0 4px 12px rgba(102, 126, 234, 0.25); }\n      50% { box-shadow: 0 0 0 6px rgba(102, 126, 234, 0.12), 0 4px 16px rgba(102, 126, 234, 0.35); }\n    }\n\n    \n\n    .lead-stepper__outcomes[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 0.5rem;\n      margin-top: 0.6rem;\n      flex-wrap: wrap;\n    }\n\n    .lead-stepper__outcome[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.35rem;\n      padding: 0.35rem 0.75rem;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      font-weight: 600;\n      border: 1px solid;\n      cursor: pointer;\n      transition: all 200ms;\n      background: transparent;\n\n      &:disabled {\n        opacity: 0.4;\n        cursor: not-allowed;\n      }\n\n      i { font-size: 0.72rem; }\n\n      &--convert {\n        color: #6366f1;\n        border-color: rgba(99, 102, 241, 0.35);\n\n        &:not(:disabled):hover {\n          background: rgba(99, 102, 241, 0.1);\n          border-color: #6366f1;\n          transform: translateY(-1px);\n        }\n      }\n\n      &--lost {\n        color: #ef4444;\n        border-color: rgba(239, 68, 68, 0.3);\n\n        &:not(:disabled):hover {\n          background: rgba(239, 68, 68, 0.08);\n          border-color: #ef4444;\n        }\n      }\n\n      &--disqualified {\n        color: #94a3b8;\n        border-color: rgba(148, 163, 184, 0.35);\n\n        &:not(:disabled):hover {\n          background: rgba(148, 163, 184, 0.1);\n          border-color: #94a3b8;\n        }\n      }\n    }\n\n    .lead-stepper__outcome-active[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.4rem;\n      margin-top: 0.6rem;\n      padding: 0.4rem 0.85rem;\n      border-radius: 999px;\n      font-size: 0.82rem;\n      font-weight: 700;\n      background: rgba(99, 102, 241, 0.1);\n      color: #4338ca;\n      border: 1px solid rgba(99, 102, 241, 0.25);\n\n      i { font-size: 0.78rem; }\n    }\n\n    \n\n    .lead-stepper__closure-form[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.4rem;\n      margin-top: 0.6rem;\n      flex-wrap: wrap;\n      animation: _ngcontent-%COMP%_closure-slide-in 250ms ease-out;\n    }\n\n    .closure-form__label[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      font-size: 0.78rem;\n      font-weight: 700;\n      padding: 0.3rem 0.65rem;\n      border-radius: 999px;\n      white-space: nowrap;\n\n      .pi-times-circle { color: #ef4444; }\n      .pi-ban { color: #94a3b8; }\n    }\n\n    [_nghost-%COMP%]     .closure-form__select {\n      min-width: 160px;\n      max-width: 220px;\n      font-size: 0.78rem;\n\n      .p-select-label {\n        padding: 0.35rem 0.5rem;\n        font-size: 0.78rem;\n      }\n    }\n\n    .closure-form__input[_ngcontent-%COMP%] {\n      min-width: 100px;\n      max-width: 160px;\n      padding: 0.35rem 0.5rem !important;\n      font-size: 0.78rem !important;\n      border-radius: 8px;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: rgba(255, 255, 255, 0.7);\n      transition: border-color 200ms;\n\n      &:focus {\n        border-color: rgba(99, 102, 241, 0.5);\n        outline: none;\n        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);\n      }\n    }\n\n    .closure-form__confirm[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      padding: 0.35rem 0.7rem;\n      border-radius: 999px;\n      font-size: 0.75rem;\n      font-weight: 600;\n      border: none;\n      cursor: pointer;\n      color: white;\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n      transition: all 200ms;\n\n      &:hover:not(:disabled) {\n        transform: translateY(-1px);\n        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n      }\n\n      &:disabled {\n        opacity: 0.45;\n        cursor: not-allowed;\n      }\n\n      i { font-size: 0.7rem; }\n    }\n\n    .closure-form__cancel[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 26px;\n      height: 26px;\n      border-radius: 50%;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: rgba(255, 255, 255, 0.6);\n      color: #64748b;\n      cursor: pointer;\n      font-size: 0.72rem;\n      transition: all 200ms;\n\n      &:hover {\n        background: rgba(239, 68, 68, 0.08);\n        border-color: rgba(239, 68, 68, 0.3);\n        color: #ef4444;\n      }\n    }\n\n    @keyframes _ngcontent-%COMP%_closure-slide-in {\n      from {\n        opacity: 0;\n        transform: translateX(10px);\n      }\n      to {\n        opacity: 1;\n        transform: translateX(0);\n      }\n    }\n\n    \n\n    .lead-stepper__step[data-state=\"completed\"].lead-stepper__step--clickable[_ngcontent-%COMP%] {\n      cursor: pointer;\n\n      &:hover {\n        .lead-stepper__icon {\n          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);\n          transform: scale(1.08);\n        }\n      }\n    }\n\n    \n\n    .lead-stepper__duration[_ngcontent-%COMP%] {\n      font-size: 0.62rem;\n      font-weight: 600;\n      color: #667eea;\n      background: rgba(102, 126, 234, 0.1);\n      padding: 1px 6px;\n      border-radius: 999px;\n      letter-spacing: 0.02em;\n      margin-top: -2px;\n    }\n\n    \n\n    .lead-stepper__score-badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.2rem;\n      padding: 0.2rem 0.5rem;\n      border-radius: 999px;\n      font-size: 0.7rem;\n      font-weight: 700;\n      margin-left: 0.3rem;\n      flex-shrink: 0;\n      transition: transform 200ms;\n\n      i { font-size: 0.62rem; }\n\n      &[data-quality=\"high\"] {\n        background: rgba(34, 197, 94, 0.15);\n        color: #16a34a;\n      }\n      &[data-quality=\"medium\"] {\n        background: rgba(245, 158, 11, 0.15);\n        color: #d97706;\n      }\n      &[data-quality=\"low\"] {\n        background: rgba(239, 68, 68, 0.12);\n        color: #dc2626;\n      }\n\n      &:hover {\n        transform: scale(1.08);\n      }\n    }\n\n    \n\n    .lead-stepper__backward-confirm[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.4rem;\n      margin-top: 0.6rem;\n      padding: 0.35rem 0.7rem;\n      border-radius: 999px;\n      background: rgba(245, 158, 11, 0.1);\n      border: 1px solid rgba(245, 158, 11, 0.3);\n      animation: _ngcontent-%COMP%_closure-slide-in 250ms ease-out;\n\n      > i {\n        font-size: 0.78rem;\n        color: #d97706;\n      }\n\n      > span {\n        font-size: 0.78rem;\n        color: #92400e;\n        white-space: nowrap;\n\n        strong {\n          font-weight: 700;\n        }\n      }\n    }\n\n    .backward-confirm__yes[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.25rem;\n      padding: 0.25rem 0.55rem;\n      border-radius: 999px;\n      font-size: 0.72rem;\n      font-weight: 600;\n      border: none;\n      cursor: pointer;\n      color: white;\n      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\n      box-shadow: 0 2px 6px rgba(245, 158, 11, 0.3);\n      transition: all 200ms;\n\n      &:hover {\n        transform: translateY(-1px);\n        box-shadow: 0 4px 10px rgba(245, 158, 11, 0.4);\n      }\n\n      i { font-size: 0.65rem; }\n    }\n\n    .backward-confirm__no[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 24px;\n      height: 24px;\n      border-radius: 50%;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: rgba(255, 255, 255, 0.6);\n      color: #64748b;\n      cursor: pointer;\n      font-size: 0.65rem;\n      transition: all 200ms;\n\n      &:hover {\n        background: rgba(239, 68, 68, 0.08);\n        border-color: rgba(239, 68, 68, 0.3);\n        color: #ef4444;\n      }\n    }\n\n    \n\n    .lead-stepper__convert-form[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.4rem;\n      margin-top: 0.6rem;\n      flex-wrap: wrap;\n      animation: _ngcontent-%COMP%_closure-slide-in 250ms ease-out;\n    }\n\n    .convert-form__label[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      font-size: 0.78rem;\n      font-weight: 700;\n      padding: 0.3rem 0.65rem;\n      border-radius: 999px;\n      color: #6366f1;\n      background: rgba(99, 102, 241, 0.1);\n      white-space: nowrap;\n\n      i { font-size: 0.72rem; }\n    }\n\n    .convert-form__message[_ngcontent-%COMP%] {\n      font-size: 0.75rem;\n      color: #475569;\n      white-space: nowrap;\n    }\n\n    .convert-form__confirm[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      padding: 0.35rem 0.7rem;\n      border-radius: 999px;\n      font-size: 0.75rem;\n      font-weight: 600;\n      border: none;\n      cursor: pointer;\n      color: white;\n      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);\n      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);\n      transition: all 200ms;\n\n      &:hover {\n        transform: translateY(-1px);\n        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);\n      }\n\n      i { font-size: 0.7rem; }\n    }\n\n    .convert-form__cancel[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 26px;\n      height: 26px;\n      border-radius: 50%;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: rgba(255, 255, 255, 0.6);\n      color: #64748b;\n      cursor: pointer;\n      font-size: 0.72rem;\n      transition: all 200ms;\n\n      &:hover {\n        background: rgba(239, 68, 68, 0.08);\n        border-color: rgba(239, 68, 68, 0.3);\n        color: #ef4444;\n      }\n    }\n\n    \n\n    .stepper-audit-trail[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.3rem;\n      margin-top: 0.5rem;\n      padding: 0.3rem 0.6rem;\n      border-radius: 8px;\n      background: rgba(255, 255, 255, 0.5);\n      border: 1px solid rgba(148, 163, 184, 0.15);\n      flex-wrap: wrap;\n    }\n\n    .audit-trail__entry[_ngcontent-%COMP%] {\n      font-size: 0.65rem;\n      font-weight: 600;\n      padding: 1px 6px;\n      border-radius: 999px;\n      white-space: nowrap;\n\n      &[data-status=\"New\"] {\n        background: rgba(59, 130, 246, 0.12);\n        color: #2563eb;\n      }\n      &[data-status=\"Contacted\"] {\n        background: rgba(6, 182, 212, 0.12);\n        color: #0891b2;\n      }\n      &[data-status=\"Nurture\"] {\n        background: rgba(168, 85, 247, 0.12);\n        color: #7c3aed;\n      }\n      &[data-status=\"Qualified\"] {\n        background: rgba(34, 197, 94, 0.12);\n        color: #16a34a;\n      }\n      &[data-status=\"Converted\"] {\n        background: rgba(99, 102, 241, 0.12);\n        color: #4f46e5;\n      }\n      &[data-status=\"Lost\"] {\n        background: rgba(239, 68, 68, 0.1);\n        color: #dc2626;\n      }\n      &[data-status=\"Disqualified\"] {\n        background: rgba(148, 163, 184, 0.15);\n        color: #64748b;\n      }\n    }\n\n    .audit-trail__date[_ngcontent-%COMP%] {\n      font-size: 0.6rem;\n      color: #94a3b8;\n      white-space: nowrap;\n    }\n\n    .audit-trail__arrow[_ngcontent-%COMP%] {\n      font-size: 0.6rem;\n      color: #cbd5e1;\n    }\n\n    @media (max-width: 600px) {\n      .lead-stepper__track[_ngcontent-%COMP%] {\n        flex-wrap: wrap;\n        gap: 0.25rem;\n      }\n\n      .lead-stepper__connector[_ngcontent-%COMP%] {\n        min-width: 12px;\n      }\n\n      .lead-stepper__label[_ngcontent-%COMP%] {\n        font-size: 0.65rem;\n        max-width: 56px;\n      }\n\n      .lead-stepper__icon[_ngcontent-%COMP%] {\n        width: 30px;\n        height: 30px;\n        font-size: 0.75rem;\n      }\n\n      .lead-stepper__duration[_ngcontent-%COMP%] {\n        font-size: 0.55rem;\n      }\n\n      .lead-stepper__score-badge[_ngcontent-%COMP%] {\n        font-size: 0.6rem;\n      }\n\n      .lead-stepper__backward-confirm[_ngcontent-%COMP%] {\n        flex-wrap: wrap;\n      }\n\n      .lead-stepper__convert-form[_ngcontent-%COMP%] {\n        flex-wrap: wrap;\n      }\n\n      .stepper-audit-trail[_ngcontent-%COMP%] {\n        font-size: 0.58rem;\n      }\n    }\n\n    \n\n\n    .related-summary[_ngcontent-%COMP%] {\n      max-width: none;\n      width: calc(100% - 3rem);\n      margin: 1rem auto 0;\n      padding: 0.75rem 1rem;\n      border-radius: 16px;\n      background: rgba(255, 255, 255, 0.75);\n      border: 1px solid rgba(148, 163, 184, 0.25);\n      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n      display: grid;\n      gap: 0.5rem;\n      min-width: 0;\n    }\n\n    .related-summary--empty[_ngcontent-%COMP%] {\n      padding: 0.45rem 1rem;\n      gap: 0.2rem;\n      background: rgba(255, 255, 255, 0.48);\n      border-color: rgba(148, 163, 184, 0.16);\n      box-shadow: none;\n    }\n\n    .related-summary-label[_ngcontent-%COMP%] {\n      font-size: 0.78rem;\n      font-weight: 600;\n      letter-spacing: 0.04em;\n      text-transform: uppercase;\n      color: rgba(71, 85, 105, 0.75);\n    }\n\n    .related-summary-links[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.5rem;\n    }\n\n    .related-summary-link[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.45rem;\n      padding: 0.35rem 0.7rem;\n      border-radius: 999px;\n      border: 1px solid rgba(59, 130, 246, 0.25);\n      background: rgba(59, 130, 246, 0.08);\n      color: #1d4ed8;\n      font-weight: 600;\n      text-decoration: none;\n      font-size: 0.85rem;\n    }\n\n    .related-summary-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      font-size: 0.9rem;\n    }\n\n    .related-summary-link[_ngcontent-%COMP%]:hover {\n      background: rgba(59, 130, 246, 0.15);\n      color: #1e40af;\n    }\n\n    .related-summary-empty[_ngcontent-%COMP%] {\n      color: rgba(71, 85, 105, 0.8);\n      font-size: 0.85rem;\n    }\n\n    .related-summary--empty[_ngcontent-%COMP%]   .related-summary-label[_ngcontent-%COMP%] {\n      color: rgba(100, 116, 139, 0.62);\n    }\n\n    .related-summary--empty[_ngcontent-%COMP%]   .related-summary-empty[_ngcontent-%COMP%] {\n      font-size: 0.8rem;\n      color: rgba(100, 116, 139, 0.72);\n    }\n\n    \n\n\n\n\n    .checkbox-row[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.625rem;\n      margin-top: 0.5rem;\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 0.875rem;\n      font-weight: 500;\n      color: rgba(var(--apple-label), 0.8);\n      cursor: pointer;\n      user-select: none;\n      padding: 0.375rem 0.75rem 0.375rem 0;\n      border-radius: 8px;\n      transition: all 0.2s ease;\n    }\n\n    .checkbox-row[_ngcontent-%COMP%]:hover {\n      color: rgba(var(--apple-blue), 1);\n    }\n\n    .checkbox-row[_ngcontent-%COMP%]   .p-checkbox[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n    }\n\n    [_nghost-%COMP%]     .p-checkbox .p-checkbox-box {\n      width: 22px !important;\n      height: 22px !important;\n      border-radius: 7px !important;\n      border: 1.5px solid rgba(var(--apple-gray-2), 0.8) !important;\n      background: rgba(255, 255, 255, 0.8) !important;\n      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;\n    }\n\n    [_nghost-%COMP%]     .p-checkbox .p-checkbox-box:hover {\n      border-color: rgba(var(--apple-blue), 0.5) !important;\n      background: rgba(255, 255, 255, 0.95) !important;\n    }\n\n    [_nghost-%COMP%]     .p-checkbox .p-checkbox-box.p-highlight {\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 1) 0%, \n        rgba(var(--apple-blue), 0.85) 100%) !important;\n      border-color: rgba(var(--apple-blue), 1) !important;\n      box-shadow: \n        0 2px 8px rgba(var(--apple-blue), 0.3),\n        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;\n    }\n\n    \n\n\n\n\n    .hint-text[_ngcontent-%COMP%] {\n      margin: 0.5rem 0 0;\n      padding: 0.625rem 0.875rem;\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 0.75rem;\n      color: rgba(var(--apple-secondary), 0.6);\n      line-height: 1.5;\n      background: linear-gradient(135deg, \n        rgba(var(--apple-gray-6), 0.5) 0%, \n        rgba(var(--apple-gray-5), 0.3) 100%);\n      border-radius: 10px;\n      border: 1px solid rgba(var(--apple-gray-4), 0.3);\n      backdrop-filter: blur(10px);\n    }\n\n    .hint-text.compact[_ngcontent-%COMP%] {\n      margin-top: 0.35rem;\n      padding: 0.4rem 0.6rem;\n      font-size: 0.7rem;\n    }\n\n    \n\n\n\n\n    .ai-score-row[_ngcontent-%COMP%] {\n      margin-top: 1rem;\n      display: flex;\n      align-items: center;\n      gap: 1rem;\n      flex-wrap: wrap;\n    }\n\n    .ai-score-inline[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.5rem;\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 0.8125rem;\n      font-weight: 600;\n      padding: 0.5rem 0.875rem;\n      border-radius: 10px;\n      backdrop-filter: blur(8px);\n      transition: all 0.2s ease;\n    }\n\n    .ai-score-inline[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      font-size: 0.875rem;\n    }\n\n    .ai-score-inline.is-success[_ngcontent-%COMP%] {\n      color: rgb(52, 199, 89);\n      background: linear-gradient(135deg, \n        rgba(52, 199, 89, 0.12) 0%, \n        rgba(52, 199, 89, 0.08) 100%);\n      border: 1px solid rgba(52, 199, 89, 0.2);\n    }\n\n    .ai-score-inline.is-info[_ngcontent-%COMP%] {\n      color: rgba(var(--apple-blue), 1);\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.12) 0%, \n        rgba(var(--apple-blue), 0.08) 100%);\n      border: 1px solid rgba(var(--apple-blue), 0.2);\n    }\n\n    .ai-score-inline.is-warn[_ngcontent-%COMP%] {\n      color: rgb(255, 149, 0);\n      background: linear-gradient(135deg, \n        rgba(255, 149, 0, 0.12) 0%, \n        rgba(255, 149, 0, 0.08) 100%);\n      border: 1px solid rgba(255, 149, 0, 0.2);\n    }\n\n    .ai-score-inline.is-error[_ngcontent-%COMP%] {\n      color: rgba(var(--apple-pink), 1);\n      background: linear-gradient(135deg, \n        rgba(var(--apple-pink), 0.12) 0%, \n        rgba(var(--apple-pink), 0.08) 100%);\n      border: 1px solid rgba(var(--apple-pink), 0.2);\n    }\n\n    [_nghost-%COMP%]     .ai-score-progress {\n      width: 140px;\n      height: 4px;\n      border-radius: 2px;\n      background: rgba(var(--apple-gray-4), 0.4);\n      overflow: hidden;\n    }\n\n    [_nghost-%COMP%]     .ai-score-progress .p-progressbar-value {\n      background: linear-gradient(90deg, \n        rgba(var(--apple-blue), 1) 0%, \n        rgba(var(--apple-purple), 0.9) 50%,\n        rgba(var(--apple-teal), 1) 100%);\n      border-radius: 2px;\n      animation: _ngcontent-%COMP%_shimmer 2s ease-in-out infinite;\n    }\n\n    @keyframes _ngcontent-%COMP%_shimmer {\n      0% { background-position: -200% 0; }\n      100% { background-position: 200% 0; }\n    }\n\n    [_nghost-%COMP%]     .ai-score-progress--top {\n      width: 100%;\n      height: 3px;\n      margin: 0.625rem 0 1rem;\n    }\n\n    .score-field[_ngcontent-%COMP%] {\n      grid-column: 1 / -1;\n    }\n\n    .score-meta[_ngcontent-%COMP%] {\n      margin-top: 0.5rem;\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n    [_nghost-%COMP%]     .score-meta .p-tag {\n      font-size: 0.6875rem;\n      font-weight: 600;\n      border-radius: 999px;\n      padding: 0.25rem 0.6rem;\n      background: rgba(var(--apple-blue), 0.12);\n      color: rgba(var(--apple-blue), 0.95);\n      border: 1px solid rgba(var(--apple-blue), 0.2);\n    }\n\n    .qualification-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 0.95rem;\n      font-weight: 700;\n      color: rgba(var(--apple-secondary), 0.9);\n    }\n\n    .score-breakdown[_ngcontent-%COMP%] {\n      margin-top: 0.5rem;\n      padding: 0.95rem 1rem 1rem;\n      border-radius: 12px;\n      border: 1px solid rgba(148, 163, 184, 0.26);\n      background:\n        linear-gradient(160deg, rgba(255, 255, 255, 0.86) 0%, rgba(239, 246, 255, 0.62) 45%, rgba(236, 254, 255, 0.66) 100%);\n      backdrop-filter: blur(14px) saturate(1.12);\n      position: relative;\n      overflow: hidden;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.8),\n        0 10px 24px rgba(15, 23, 42, 0.09),\n        0 1px 0 rgba(6, 182, 212, 0.05);\n    }\n\n    .score-breakdown[_ngcontent-%COMP%]::before {\n      content: '';\n      position: absolute;\n      inset: 0 auto auto 0;\n      height: 2px;\n      width: 100%;\n      background: linear-gradient(90deg, rgba(56, 189, 248, 0.95), rgba(14, 165, 233, 0.75), rgba(6, 182, 212, 0.8));\n      opacity: 0.9;\n      pointer-events: none;\n    }\n\n    .score-breakdown__header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 0.75rem;\n      margin-bottom: 0.7rem;\n    }\n\n    .score-breakdown__title[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 0.12rem;\n    }\n\n    .score-breakdown__title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n      font-size: 1.06rem;\n      line-height: 1.2;\n      font-weight: 800;\n      color: rgba(var(--apple-secondary), 0.92);\n    }\n\n    .score-formula[_ngcontent-%COMP%] {\n      font-size: 0.82rem;\n      color: rgba(71, 85, 105, 0.86);\n      font-style: italic;\n      line-height: 1.35;\n    }\n\n    .score-breakdown__title[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {\n      font-size: 0.76rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      font-weight: 600;\n      color: rgba(14, 116, 144, 0.82);\n    }\n\n    .score-breakdown__summary[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.4rem;\n      flex-wrap: wrap;\n      justify-content: flex-end;\n    }\n\n    .cqvs-group-grid[_ngcontent-%COMP%] {\n      margin: 0.6rem 0 0.75rem;\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.65rem;\n    }\n\n    .cqvs-group-card[_ngcontent-%COMP%] {\n      border: 1px solid rgba(14, 165, 233, 0.18);\n      border-radius: 10px;\n      background: rgba(255, 255, 255, 0.72);\n      padding: 0.62rem 0.7rem;\n      display: grid;\n      gap: 0.45rem;\n      box-shadow:\n        inset 0 1px 0 rgba(255,255,255,0.45),\n        0 8px 16px rgba(15, 23, 42, 0.05);\n    }\n\n    .cqvs-group-card[data-cqvs='C'][_ngcontent-%COMP%] {\n      border-color: rgba(59, 130, 246, 0.26);\n      background: linear-gradient(180deg, rgba(239, 246, 255, 0.82), rgba(255, 255, 255, 0.74));\n    }\n\n    .cqvs-group-card[data-cqvs='Q'][_ngcontent-%COMP%] {\n      border-color: rgba(14, 165, 233, 0.28);\n      background: linear-gradient(180deg, rgba(236, 254, 255, 0.86), rgba(255, 255, 255, 0.74));\n    }\n\n    .cqvs-group-card[data-cqvs='V'][_ngcontent-%COMP%] {\n      border-color: rgba(245, 158, 11, 0.26);\n      background: linear-gradient(180deg, rgba(255, 251, 235, 0.88), rgba(255, 255, 255, 0.74));\n    }\n\n    .cqvs-group-card[data-cqvs='S'][_ngcontent-%COMP%] {\n      border-color: rgba(168, 85, 247, 0.24);\n      background: linear-gradient(180deg, rgba(250, 245, 255, 0.86), rgba(255, 255, 255, 0.74));\n    }\n\n    .cqvs-group-card__head[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.48rem;\n    }\n\n    .cqvs-group-card__title[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.08rem;\n    }\n\n    .cqvs-group-card__title[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n      font-size: 0.9rem;\n      color: rgba(var(--apple-secondary), 0.9);\n      line-height: 1.15;\n    }\n\n    .cqvs-group-card__title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      font-size: 0.76rem;\n      color: rgba(71, 85, 105, 0.88);\n      line-height: 1.2;\n    }\n\n    .cqvs-group-card__metrics[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.35rem;\n    }\n\n    .cqvs-code[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 24px;\n      height: 24px;\n      border-radius: 999px;\n      background: rgba(2, 132, 199, 0.16);\n      border: 1px solid rgba(14, 165, 233, 0.28);\n      color: rgba(3, 105, 161, 0.95);\n      font-weight: 800;\n      font-size: 0.76rem;\n      letter-spacing: 0.04em;\n    }\n\n    .cqvs-code[data-cqvs='C'][_ngcontent-%COMP%] {\n      background: rgba(59, 130, 246, 0.14);\n      border-color: rgba(59, 130, 246, 0.3);\n      color: #1d4ed8;\n    }\n\n    .cqvs-code[data-cqvs='Q'][_ngcontent-%COMP%] {\n      background: rgba(14, 165, 233, 0.14);\n      border-color: rgba(14, 165, 233, 0.3);\n      color: #0369a1;\n    }\n\n    .cqvs-code[data-cqvs='V'][_ngcontent-%COMP%] {\n      background: rgba(245, 158, 11, 0.14);\n      border-color: rgba(245, 158, 11, 0.3);\n      color: #b45309;\n    }\n\n    .cqvs-code[data-cqvs='S'][_ngcontent-%COMP%] {\n      background: rgba(168, 85, 247, 0.14);\n      border-color: rgba(168, 85, 247, 0.28);\n      color: #7c3aed;\n    }\n\n    .confidence-gauge[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.8rem;\n      color: rgba(var(--apple-secondary), 0.7);\n    }\n\n    .confidence-gauge-panel[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n      margin-bottom: 0.45rem;\n      border-radius: 12px;\n      padding: 0.35rem 0.5rem;\n      background: rgba(255, 255, 255, 0.58);\n      border: 1px solid rgba(148, 163, 184, 0.2);\n    }\n\n    .confidence-gauge-panel.compact[_ngcontent-%COMP%] {\n      border-radius: 10px;\n    }\n\n    .confidence-gauge__label[_ngcontent-%COMP%] {\n      font-size: 0.82rem;\n      font-weight: 600;\n      color: rgba(var(--apple-secondary), 0.8);\n    }\n\n    [_nghost-%COMP%]     .confidence-gauge__knob {\n      width: 70px;\n    }\n\n    [_nghost-%COMP%]     .confidence-gauge__knob .p-knob-text {\n      font-weight: 600;\n      font-size: 0.92rem;\n    }\n\n    .confidence-pill[_ngcontent-%COMP%] {\n      font-size: 0.78rem;\n      font-weight: 600;\n      line-height: 1;\n      padding: 0.34rem 0.7rem;\n      border-radius: 999px;\n      background: rgba(56, 189, 248, 0.13);\n      color: rgba(3, 105, 161, 0.95);\n      border: 1px solid rgba(14, 165, 233, 0.25);\n    }\n\n    .total-pill[_ngcontent-%COMP%] {\n      font-size: 0.78rem;\n      font-weight: 700;\n      line-height: 1;\n      padding: 0.34rem 0.7rem;\n      border-radius: 999px;\n      background: rgba(15, 118, 110, 0.12);\n      color: rgba(15, 118, 110, 0.95);\n      border: 1px solid rgba(13, 148, 136, 0.26);\n    }\n\n    [_nghost-%COMP%]     .score-breakdown-table {\n      margin-top: 0.25rem;\n    }\n\n    [_nghost-%COMP%]     .score-breakdown-table .p-datatable-thead > tr > th {\n      background: rgba(248, 250, 252, 0.86);\n      border-color: rgba(148, 163, 184, 0.22);\n      color: rgba(71, 85, 105, 0.92);\n      font-size: 0.79rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      padding: 0.58rem 0.6rem;\n    }\n\n    [_nghost-%COMP%]     .score-breakdown-table .p-datatable-tbody > tr > td {\n      border-color: rgba(148, 163, 184, 0.2);\n      padding: 0.58rem 0.6rem;\n      font-size: 0.88rem;\n      color: rgba(30, 41, 59, 0.92);\n      vertical-align: middle;\n      background: rgba(255, 255, 255, 0.62);\n    }\n\n    .col-factor[_ngcontent-%COMP%] {\n      font-weight: 700;\n      color: #0f172a;\n    }\n\n    .col-cqvs[_ngcontent-%COMP%] {\n      width: 60px;\n      text-align: center;\n    }\n\n    .cqvs-badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 26px;\n      height: 26px;\n      border-radius: 999px;\n      background: rgba(3, 105, 161, 0.16);\n      border: 1px solid rgba(14, 165, 233, 0.3);\n      color: rgba(3, 105, 161, 0.95);\n      font-size: 0.82rem;\n      font-weight: 800;\n      letter-spacing: 0.04em;\n    }\n\n    .cqvs-badge[data-cqvs='C'][_ngcontent-%COMP%] {\n      background: rgba(59, 130, 246, 0.16);\n      border-color: rgba(59, 130, 246, 0.3);\n      color: #1d4ed8;\n    }\n\n    .cqvs-badge[data-cqvs='Q'][_ngcontent-%COMP%] {\n      background: rgba(14, 165, 233, 0.16);\n      border-color: rgba(14, 165, 233, 0.3);\n      color: #0369a1;\n    }\n\n    .cqvs-badge[data-cqvs='V'][_ngcontent-%COMP%] {\n      background: rgba(245, 158, 11, 0.16);\n      border-color: rgba(245, 158, 11, 0.3);\n      color: #b45309;\n    }\n\n    .cqvs-badge[data-cqvs='S'][_ngcontent-%COMP%] {\n      background: rgba(168, 85, 247, 0.16);\n      border-color: rgba(168, 85, 247, 0.28);\n      color: #7c3aed;\n    }\n\n    .col-weight[_ngcontent-%COMP%], \n   .col-score[_ngcontent-%COMP%] {\n      white-space: nowrap;\n      font-weight: 700;\n    }\n\n    .col-selected[_ngcontent-%COMP%], \n   .col-evidence[_ngcontent-%COMP%] {\n      color: rgba(51, 65, 85, 0.92);\n      max-width: 240px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n\n    .col-contribution[_ngcontent-%COMP%] {\n      min-width: 130px;\n      display: inline-flex;\n      align-items: center;\n      gap: 0.4rem;\n      white-space: nowrap;\n    }\n\n    .confidence-badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.14rem 0.44rem;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      font-weight: 700;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: rgba(148, 163, 184, 0.14);\n      color: rgba(51, 65, 85, 0.92);\n    }\n\n    [_nghost-%COMP%]     .score-breakdown-table .p-datatable-tbody > tr:hover > td {\n      background: rgba(255, 255, 255, 0.9);\n    }\n\n    @media (max-width: 900px) {\n      .score-breakdown[_ngcontent-%COMP%] {\n        padding: 0.8rem 0.8rem 0.9rem;\n      }\n\n      .score-breakdown__header[_ngcontent-%COMP%] {\n        flex-direction: column;\n        align-items: stretch;\n      }\n\n      .score-breakdown__summary[_ngcontent-%COMP%] {\n        justify-content: flex-start;\n      }\n    }\n\n    .confidence-badge[data-confidence='verified'][_ngcontent-%COMP%] {\n      background: rgba(56, 189, 248, 0.12);\n      color: rgba(2, 132, 199, 0.96);\n      border-color: rgba(14, 165, 233, 0.3);\n    }\n\n    .confidence-badge[data-confidence='assumed'][_ngcontent-%COMP%] {\n      background: rgba(251, 146, 60, 0.14);\n      color: rgba(194, 65, 12, 0.96);\n      border-color: rgba(249, 115, 22, 0.32);\n    }\n\n    .confidence-badge[data-confidence='invalid'][_ngcontent-%COMP%] {\n      background: rgba(248, 113, 113, 0.12);\n      color: rgba(185, 28, 28, 0.95);\n      border-color: rgba(248, 113, 113, 0.3);\n    }\n\n    .confidence-badge[data-confidence='unknown'][_ngcontent-%COMP%] {\n      background: rgba(148, 163, 184, 0.14);\n      color: rgba(71, 85, 105, 0.92);\n      border-color: rgba(148, 163, 184, 0.32);\n    }\n\n    .factor-rail[_ngcontent-%COMP%] {\n      width: 72px;\n      height: 5px;\n      background: rgba(148, 163, 184, 0.24);\n      overflow: hidden;\n      position: relative;\n    }\n\n    .factor-rail.compact[_ngcontent-%COMP%] {\n      width: 64px;\n    }\n\n    .factor-rail__fill[_ngcontent-%COMP%] {\n      display: block;\n      height: 100%;\n      min-width: 2px;\n      border-radius: inherit;\n      background: linear-gradient(90deg, rgba(56, 189, 248, 0.95), rgba(14, 165, 233, 0.8));\n      transition: width 180ms ease;\n    }\n\n    .risk-flags[_ngcontent-%COMP%] {\n      margin-top: 0.45rem;\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.4rem;\n      align-items: center;\n    }\n\n    .risk-label[_ngcontent-%COMP%] {\n      font-size: 0.68rem;\n      font-weight: 700;\n      letter-spacing: 0.05em;\n      text-transform: uppercase;\n      color: rgba(185, 28, 28, 0.78);\n    }\n\n    .risk-flag[_ngcontent-%COMP%] {\n      font-size: 0.68rem;\n      padding: 0.24rem 0.52rem;\n      border-radius: 999px;\n      background: rgba(254, 226, 226, 0.76);\n      color: rgba(185, 28, 28, 0.9);\n      border: 1px solid rgba(248, 113, 113, 0.3);\n    }\n\n    @media (max-width: 900px) {\n      .cqvs-group-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n    }\n\n    \n\n\n\n\n    [_nghost-%COMP%]     .ai-score-button {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;\n      border-radius: 980px !important;\n      font-weight: 600 !important;\n      font-size: 0.875rem !important;\n      padding: 0.625rem 1.25rem !important;\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 1) 0%, \n        rgba(var(--apple-purple), 0.9) 100%) !important;\n      border: none !important;\n      color: white !important;\n      box-shadow: \n        0 2px 4px rgba(0, 0, 0, 0.1),\n        0 4px 12px rgba(var(--apple-blue), 0.25),\n        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;\n      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      letter-spacing: -0.01em !important;\n    }\n\n    [_nghost-%COMP%]     .ai-score-button:hover {\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.9) 0%, \n        rgba(var(--apple-purple), 0.85) 100%) !important;\n      transform: translateY(-1px) scale(1.02) !important;\n      box-shadow: \n        0 4px 8px rgba(0, 0, 0, 0.12),\n        0 8px 20px rgba(var(--apple-blue), 0.3),\n        inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;\n    }\n\n    [_nghost-%COMP%]     .ai-score-button:active {\n      transform: translateY(0) scale(0.98) !important;\n      box-shadow: \n        0 1px 3px rgba(0, 0, 0, 0.1),\n        0 2px 8px rgba(var(--apple-blue), 0.2),\n        inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;\n    }\n\n    [_nghost-%COMP%]     .ai-score-button .pi {\n      font-size: 0.9375rem;\n    }\n\n    \n\n\n\n\n    .lead-btn[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.5rem;\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 1rem;\n      font-weight: 600;\n      letter-spacing: -0.01em;\n      padding: 0.75rem 1.75rem;\n      border-radius: 12px;\n      border: none;\n      cursor: pointer;\n      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n      white-space: nowrap;\n      min-width: 140px;\n\n      i { font-size: 1rem; }\n    }\n\n    .lead-btn--primary[_ngcontent-%COMP%] {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      color: #fff;\n      box-shadow:\n        0 4px 14px rgba(102, 126, 234, 0.4),\n        inset 0 1px 0 rgba(255, 255, 255, 0.15);\n\n      &:hover:not(:disabled) {\n        transform: translateY(-2px);\n        box-shadow:\n          0 6px 20px rgba(102, 126, 234, 0.5),\n          inset 0 1px 0 rgba(255, 255, 255, 0.2);\n      }\n\n      &:active:not(:disabled) {\n        transform: translateY(0) scale(0.98);\n      }\n\n      &:disabled {\n        background: rgba(var(--apple-gray-4), 0.8);\n        color: rgba(var(--apple-gray-1), 1);\n        box-shadow: none;\n        cursor: not-allowed;\n      }\n    }\n\n    .lead-btn--secondary[_ngcontent-%COMP%] {\n      background: rgba(255, 255, 255, 0.75);\n      -webkit-backdrop-filter: blur(12px);\n      backdrop-filter: blur(12px);\n      border: 1px solid rgba(var(--apple-gray-3), 0.5);\n      color: rgba(var(--apple-label), 0.8);\n      box-shadow:\n        0 1px 4px rgba(0, 0, 0, 0.05),\n        inset 0 1px 0 rgba(255, 255, 255, 0.8);\n\n      &:hover {\n        background: rgba(255, 255, 255, 0.92);\n        border-color: rgba(var(--apple-gray-2), 0.6);\n        color: rgba(var(--apple-label), 0.95);\n        transform: translateY(-1px);\n        box-shadow:\n          0 3px 10px rgba(0, 0, 0, 0.07),\n          inset 0 1px 0 rgba(255, 255, 255, 1);\n      }\n\n      &:active {\n        transform: translateY(0) scale(0.98);\n      }\n    }\n\n    .lead-btn--accent[_ngcontent-%COMP%] {\n      background: rgba(255, 255, 255, 0.65);\n      -webkit-backdrop-filter: blur(12px);\n      backdrop-filter: blur(12px);\n      border: 1px solid rgba(99, 102, 241, 0.25);\n      color: #6366f1;\n      box-shadow:\n        0 1px 4px rgba(99, 102, 241, 0.08),\n        inset 0 1px 0 rgba(255, 255, 255, 0.7);\n      padding: 0.6rem 1.25rem;\n      min-width: unset;\n\n      &:hover {\n        background: rgba(99, 102, 241, 0.08);\n        border-color: rgba(99, 102, 241, 0.4);\n        transform: translateY(-1px);\n        box-shadow:\n          0 3px 12px rgba(99, 102, 241, 0.15),\n          inset 0 1px 0 rgba(255, 255, 255, 0.8);\n      }\n\n      &:active {\n        transform: translateY(0) scale(0.98);\n      }\n    }\n\n    .form-actions[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: flex-end;\n      gap: 0.75rem;\n      padding-top: 1rem;\n    }\n\n    \n\n\n\n\n    @media (max-width: 768px) {\n      .page-header[_ngcontent-%COMP%] {\n        padding: 1rem;\n        max-height: calc(100vh - 0.5rem);\n      }\n\n      .form-container[_ngcontent-%COMP%] {\n        padding: 1rem;\n      }\n\n      .form-section[_ngcontent-%COMP%] {\n        padding: 0.45rem 0;\n        border-radius: 0;\n      }\n\n      .form-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n        gap: 0.55rem;\n      }\n\n      .cadence-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n\n      .cadence-actions[_ngcontent-%COMP%] {\n        justify-content: stretch;\n      }\n\n      .form-actions[_ngcontent-%COMP%] {\n        flex-direction: column;\n      }\n\n      .lead-btn[_ngcontent-%COMP%] {\n        width: 100%;\n        min-width: auto;\n      }\n\n      .status-ribbon__inner[_ngcontent-%COMP%] {\n        max-height: calc(100vh - 9.5rem);\n      }\n    }\n\n    \n\n\n\n\n    [_nghost-%COMP%] {\n      scrollbar-width: thin;\n      scrollbar-color: rgba(var(--apple-gray-2), 0.4) transparent;\n    }\n\n    [_nghost-%COMP%]::-webkit-scrollbar {\n      width: 10px;\n    }\n\n    [_nghost-%COMP%]::-webkit-scrollbar-track {\n      background: transparent;\n    }\n\n    [_nghost-%COMP%]::-webkit-scrollbar-thumb {\n      background: rgba(var(--apple-gray-2), 0.4);\n      border-radius: 5px;\n      border: 3px solid transparent;\n      background-clip: content-box;\n    }\n\n    [_nghost-%COMP%]::-webkit-scrollbar-thumb:hover {\n      background: rgba(var(--apple-gray-1), 0.5);\n      background-clip: content-box;\n    }\n\n    \n\n\n\n\n    [_nghost-%COMP%]     *:focus-visible {\n      outline: none;\n      box-shadow: \n        0 0 0 3px rgba(var(--apple-blue), 0.25),\n        0 0 0 6px rgba(var(--apple-blue), 0.1) !important;\n    }\n\n    \n\n\n\n\n    [_ngcontent-%COMP%]::selection {\n      background: rgba(var(--apple-blue), 0.25);\n      color: inherit;\n    }\n\n    \n\n\n\n\n    .form-section[_ngcontent-%COMP%], \n   .form-section[_ngcontent-%COMP%]::before, \n   .form-section[_ngcontent-%COMP%]::after, \n   .section-title[_ngcontent-%COMP%], \n   .section-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \n   .form-field[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%], \n   .back-link[_ngcontent-%COMP%], \n   .back-link[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    }\n\n    .duplicate-dialog[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.85rem;\n    }\n\n    .duplicate-dialog__message[_ngcontent-%COMP%] {\n      margin: 0;\n      color: rgba(var(--apple-gray-0), 0.85);\n    }\n\n    .duplicate-dialog__list[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.65rem;\n      max-height: 20rem;\n      overflow: auto;\n      padding-right: 0.25rem;\n    }\n\n    .duplicate-row[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: 1fr auto auto;\n      gap: 0.75rem;\n      align-items: center;\n      padding: 0.65rem 0.75rem;\n      border: 1px solid rgba(var(--apple-gray-2), 0.16);\n      border-radius: 12px;\n      background: rgba(var(--apple-gray-6), 0.45);\n    }\n\n    .duplicate-row__meta[_ngcontent-%COMP%] {\n      min-width: 0;\n    }\n\n    .duplicate-row__name[_ngcontent-%COMP%] {\n      font-weight: 600;\n      color: rgba(var(--apple-gray-0), 0.95);\n    }\n\n    .duplicate-row__company[_ngcontent-%COMP%], \n   .duplicate-row__signals[_ngcontent-%COMP%] {\n      font-size: 0.82rem;\n      color: rgba(var(--apple-gray-1), 0.76);\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n\n    .duplicate-row__score[_ngcontent-%COMP%] {\n      display: grid;\n      justify-items: end;\n      font-size: 0.8rem;\n      color: rgba(var(--apple-gray-1), 0.86);\n    }\n\n    .duplicate-row__badge[_ngcontent-%COMP%] {\n      font-size: 0.7rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.04em;\n      padding: 0.12rem 0.4rem;\n      border-radius: 999px;\n      border: 1px solid rgba(var(--apple-gray-2), 0.3);\n    }\n\n    .duplicate-row__badge[data-level='block'][_ngcontent-%COMP%] {\n      color: #dc2626;\n      border-color: rgba(220, 38, 38, 0.32);\n      background: rgba(220, 38, 38, 0.08);\n    }\n\n    .duplicate-row__badge[data-level='warning'][_ngcontent-%COMP%] {\n      color: #d97706;\n      border-color: rgba(217, 119, 6, 0.32);\n      background: rgba(217, 119, 6, 0.08);\n    }\n\n    .duplicate-dialog__actions[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: flex-end;\n      gap: 0.5rem;\n      padding-top: 0.25rem;\n    }\n\n    .supporting-documents-panel[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 1rem;\n    }\n\n    .supporting-documents-header[_ngcontent-%COMP%] {\n      display: flex;\n      justify-content: space-between;\n      align-items: flex-start;\n      gap: 0.85rem;\n      flex-wrap: wrap;\n    }\n\n    .supporting-documents-stats[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 0.5rem;\n      align-items: center;\n      flex-wrap: wrap;\n    }\n\n    .docs-usage-pill[_ngcontent-%COMP%], \n   .docs-remaining-pill[_ngcontent-%COMP%], \n   .docs-limit-pill[_ngcontent-%COMP%] {\n      border-radius: 999px;\n      padding: 0.25rem 0.6rem;\n      font-size: 0.75rem;\n      font-weight: 700;\n      letter-spacing: 0.02em;\n      border: 1px solid rgba(var(--apple-gray-2), 0.2);\n      background: rgba(var(--apple-gray-5), 0.36);\n      color: rgba(var(--apple-gray-0), 0.9);\n    }\n\n    .docs-remaining-pill[_ngcontent-%COMP%] {\n      background: rgba(56, 189, 248, 0.12);\n      border-color: rgba(56, 189, 248, 0.24);\n      color: #bae6fd;\n    }\n\n    .docs-limit-pill[_ngcontent-%COMP%] {\n      background: rgba(239, 68, 68, 0.12);\n      border-color: rgba(239, 68, 68, 0.26);\n      color: #fecaca;\n    }\n\n    .supporting-documents-uploader[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.55rem;\n      padding: 0.85rem;\n      border-radius: 14px;\n      border: 1px solid rgba(var(--apple-gray-2), 0.16);\n      background: rgba(var(--apple-gray-6), 0.35);\n    }\n\n    [_nghost-%COMP%]     .lead-doc-upload .p-button {\n      border-radius: 12px;\n      border: 1px solid rgba(var(--apple-blue), 0.34);\n      background:\n        radial-gradient(circle at 18% 15%, rgba(125, 211, 252, 0.22), transparent 48%),\n        linear-gradient(180deg, rgba(30, 64, 175, 0.92), rgba(15, 23, 42, 0.9));\n      color: #f8fbff;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.16),\n        inset 0 -1px 0 rgba(30, 64, 175, 0.25),\n        0 10px 24px rgba(2, 6, 23, 0.24),\n        0 0 0 1px rgba(56, 189, 248, 0.08);\n      font-weight: 700;\n      letter-spacing: 0.01em;\n      padding: 0.6rem 0.9rem;\n      text-shadow: 0 1px 2px rgba(2, 6, 23, 0.35);\n    }\n\n    [_nghost-%COMP%]     .lead-doc-upload .p-button:hover:not(:disabled) {\n      border-color: rgba(125, 211, 252, 0.45);\n      background:\n        radial-gradient(circle at 20% 12%, rgba(186, 230, 253, 0.28), transparent 50%),\n        linear-gradient(180deg, rgba(37, 99, 235, 0.95), rgba(30, 41, 59, 0.92));\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.22),\n        0 14px 30px rgba(37, 99, 235, 0.2),\n        0 0 0 1px rgba(125, 211, 252, 0.12);\n    }\n\n    [_nghost-%COMP%]     .lead-doc-upload .p-button:disabled {\n      opacity: 0.62;\n      cursor: not-allowed;\n      background:\n        linear-gradient(180deg, rgba(71, 85, 105, 0.55), rgba(30, 41, 59, 0.58));\n      border-color: rgba(var(--apple-gray-2), 0.2);\n      box-shadow: none;\n      text-shadow: none;\n    }\n\n    .docs-policy-note[_ngcontent-%COMP%] {\n      font-size: 0.8rem;\n      color: rgba(var(--apple-gray-1), 0.78);\n      line-height: 1.35;\n    }\n\n    .supporting-documents-list[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.75rem;\n    }\n\n    .supporting-documents-list[_ngcontent-%COMP%]   .table-actions[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: flex-end;\n      gap: 0.35rem;\n      white-space: nowrap;\n    }\n\n    [_nghost-%COMP%]     .supporting-documents-list .icon-btn.p-button {\n      width: 2rem;\n      height: 2rem;\n      min-width: 2rem;\n      padding: 0;\n      border-radius: 10px;\n      border: 1px solid rgba(var(--apple-gray-2), 0.18);\n      background: rgba(255, 255, 255, 0.72);\n      color: rgba(var(--apple-secondary), 0.9);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.35),\n        0 4px 14px rgba(15, 23, 42, 0.06);\n      transition: all 0.18s ease;\n    }\n\n    [_nghost-%COMP%]     .supporting-documents-list .icon-btn.p-button .p-button-icon {\n      color: inherit;\n      font-size: 0.85rem;\n    }\n\n    [_nghost-%COMP%]     .supporting-documents-list .icon-btn.p-button:hover:not(:disabled) {\n      border-color: rgba(var(--apple-blue), 0.24);\n      background: rgba(var(--apple-blue), 0.08);\n      color: rgba(var(--apple-blue), 1);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.45),\n        0 8px 18px rgba(var(--apple-blue), 0.12);\n      transform: translateY(-1px);\n    }\n\n    [_nghost-%COMP%]     .supporting-documents-list .icon-btn.danger.p-button {\n      color: #b91c1c;\n      border-color: rgba(239, 68, 68, 0.22);\n      background: rgba(254, 242, 242, 0.85);\n    }\n\n    [_nghost-%COMP%]     .supporting-documents-list .icon-btn.danger.p-button:hover:not(:disabled) {\n      color: #991b1b;\n      border-color: rgba(239, 68, 68, 0.34);\n      background: rgba(239, 68, 68, 0.12);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.45),\n        0 8px 18px rgba(239, 68, 68, 0.12);\n    }\n\n    [_nghost-%COMP%]     .supporting-documents-list .icon-btn.p-button:disabled {\n      opacity: 0.55;\n      box-shadow: none;\n      transform: none;\n    }\n\n    .docs-table[_ngcontent-%COMP%]   .docs-file-name[_ngcontent-%COMP%] {\n      max-width: 18rem;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      font-weight: 600;\n    }\n\n    @media (max-width: 768px) {\n      .docs-table[_ngcontent-%COMP%]   .docs-file-name[_ngcontent-%COMP%] {\n        max-width: 10rem;\n      }\n    }\n\n    @media (max-width: 900px) {\n      .lead-sticky-bar[_ngcontent-%COMP%] {\n        position: static;\n        top: auto;\n        align-items: stretch;\n        flex-direction: column;\n      }\n\n      .lead-sticky-left[_ngcontent-%COMP%], \n   .lead-sticky-right[_ngcontent-%COMP%] {\n        width: 100%;\n        min-width: 0;\n      }\n\n      .lead-sticky-right[_ngcontent-%COMP%] {\n        align-items: stretch;\n      }\n\n      .lead-sticky-right[_ngcontent-%COMP%]   .crm-button--primary[_ngcontent-%COMP%], \n   .lead-sticky-right[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%] {\n        width: 100%;\n      }\n\n      .lead-sticky-meta[_ngcontent-%COMP%] {\n        gap: 0.4rem;\n      }\n\n      .qualification-summary-card[_ngcontent-%COMP%] {\n        position: static;\n      }\n\n      .qualification-summary-card__metrics[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .summary-metric[_ngcontent-%COMP%] {\n        grid-column: span 1;\n      }\n\n      .summary-metric--primary[_ngcontent-%COMP%] {\n        grid-column: span 2;\n      }\n\n      .qualification-insight-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n    }\n\n    @media (max-width: 560px) {\n      .header-top[_ngcontent-%COMP%] {\n        align-items: stretch;\n      }\n\n      .header-top[_ngcontent-%COMP%]   .back-link[_ngcontent-%COMP%] {\n        width: 100%;\n        justify-content: flex-start;\n        margin-left: 0;\n      }\n\n      .header-top[_ngcontent-%COMP%]   .crm-button--primary[_ngcontent-%COMP%], \n   .header-top[_ngcontent-%COMP%]   .p-button[_ngcontent-%COMP%] {\n        width: 100%;\n      }\n\n      .header-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        max-width: 100%;\n      }\n\n      .lead-header-progress[_ngcontent-%COMP%] {\n        max-width: 100%;\n      }\n\n      [_nghost-%COMP%]     .lead-tabs .p-tab {\n        flex: 1 1 100%;\n        min-width: 0;\n      }\n\n      .related-summary[_ngcontent-%COMP%] {\n        width: calc(100% - 2rem);\n        margin-top: 0.75rem;\n        padding: 0.65rem 0.75rem;\n      }\n\n      .lead-sticky-bar[_ngcontent-%COMP%] {\n        padding: 0.75rem 0.8rem;\n        border-radius: 14px;\n      }\n\n      .lead-sticky-left[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n        font-size: 0.98rem;\n      }\n\n      .lead-sticky-meta[_ngcontent-%COMP%] {\n        margin-top: 0.25rem;\n      }\n\n      .qualification-summary-card__metrics[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n\n      .summary-metric[_ngcontent-%COMP%] {\n        grid-column: span 1;\n        min-height: 64px;\n      }\n\n      .summary-metric--primary[_ngcontent-%COMP%] {\n        grid-column: span 1;\n      }\n\n      .lead-header-progress[_ngcontent-%COMP%] {\n        flex-direction: column;\n        align-items: stretch;\n      }\n\n      .lead-header-progress__dial[_ngcontent-%COMP%] {\n        align-self: flex-start;\n      }\n    }\n  \n.presence-strip[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n\n\n\n.qualification-scoring-shell[_ngcontent-%COMP%] {\n  padding-top: 0.55rem;\n}\n\n.qual-shell-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.38rem;\n  letter-spacing: -0.02em;\n}\n\n.qual-shell-title[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  max-width: 42rem;\n}\n\n.qual-shell-actions__primary[_ngcontent-%COMP%] {\n  min-height: 42px;\n  border-radius: 10px;\n  padding-inline: 0.8rem;\n  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.24);\n}\n\n.qual-shell-actions__primary[_ngcontent-%COMP%]   .action-btn__icon[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n}\n\n.qual-shell-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, \n.hero-mid-block__link[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid rgba(79, 70, 229, 0.55);\n  outline-offset: 2px;\n}\n\n.qual-hero-ring[_ngcontent-%COMP%]   .qual-gauge-bg[_ngcontent-%COMP%] {\n  fill: none !important;\n  stroke: rgba(99, 102, 241, 0.18) !important;\n  stroke-width: 3 !important;\n}\n\n.qual-hero-ring[_ngcontent-%COMP%]   .qual-gauge-fill[_ngcontent-%COMP%] {\n  fill: none !important;\n  stroke: #5b5ce6 !important;\n  stroke-width: 3 !important;\n  stroke-linecap: round !important;\n}\n\n.qual-risk-item__action[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 0.72rem;\n  font-weight: 700;\n  color: #4f46e5;\n  background: rgba(79, 70, 229, 0.08);\n  border-radius: 999px;\n  padding: 0.12rem 0.4rem;\n  white-space: nowrap;\n}\n\n.form-section--qualification[_ngcontent-%COMP%]   .form-grid.qualification-grid--factors[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.6rem 0.75rem;\n}\n\n.form-section--qualification[_ngcontent-%COMP%]   .qualification-grid--factors[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%] {\n  min-height: 56px;\n  align-items: center;\n}\n\n.form-section--qualification[_ngcontent-%COMP%]   .qualification-grid--factors[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  min-width: 140px;\n}\n\n@media (max-width: 1100px) {\n  .form-section--qualification[_ngcontent-%COMP%]   .form-grid.qualification-grid--factors[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .form-section--qualification[_ngcontent-%COMP%]   .qualification-grid--factors[_ngcontent-%COMP%]   .form-field[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n    min-width: 120px;\n  }\n}\n\n@media (max-width: 1200px) {\n  .qual-hero-card__tip[_ngcontent-%COMP%] {\n    justify-items: start;\n    text-align: left;\n  }\n\n  .qual-hero-card__tip[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    text-align: left;\n  }\n}\n\n.presence-focus[_ngcontent-%COMP%] {\n  margin-top: 0.55rem;\n  display: inline-flex;\n  position: relative;\n  align-items: center;\n  gap: 0.45rem;\n  border-radius: 0.75rem;\n  padding: 0.4rem 0.7rem;\n  font-size: 0.8rem;\n  font-weight: 700;\n  border: 1px solid rgba(14, 165, 233, 0.22);\n  color: #0c4a6e;\n  background: linear-gradient(135deg, rgba(224, 242, 254, 0.95), rgba(186, 230, 253, 0.92));\n  box-shadow: 0 8px 18px rgba(2, 132, 199, 0.18), 0 0 0 1px rgba(125, 211, 252, 0.28) inset;\n  -webkit-user-select: none;\n  user-select: none;\n  caret-color: transparent;\n  cursor: default;\n\n  &::selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  &::-moz-selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  // Glowing comet that orbits OUTSIDE the chip border\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 2rem;\n    height: 2px;\n    border-radius: 999px;\n    background: linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.6) 15%,\n      rgba(255, 255, 255, 1) 50%,\n      rgba(255, 255, 255, 0.6) 85%,\n      transparent 100%\n    );\n    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1))\n            drop-shadow(0 0 5px rgba(186, 230, 253, 0.9))\n            drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))\n            drop-shadow(0 0 18px rgba(14, 165, 233, 0.35));\n    offset-path: inset(0px round 0.75rem);\n    offset-distance: 0%;\n    offset-rotate: auto;\n    animation: _ngcontent-%COMP%_presence-border-tail 3.5s linear infinite;\n    will-change: offset-distance;\n    pointer-events: none;\n    z-index: 3;\n  }\n\n  > * {\n    position: relative;\n    z-index: 1;\n  }\n\n  i {\n    color: #0284c7;\n    font-size: 0.85rem;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_presence-border-tail {\n  from { offset-distance: 0%; }\n  to   { offset-distance: 100%; }\n}\n\n.presence-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #64748b;\n  font-weight: 600;\n}\n\n.presence-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #0f172a;\n  border: 1px solid rgba(14, 165, 233, 0.32);\n  background: rgba(224, 242, 254, 0.8);\n}\n\n.presence-chip--editing[_ngcontent-%COMP%] {\n  border-color: rgba(251, 146, 60, 0.4);\n  background: rgba(255, 237, 213, 0.9);\n}\n\n.presence-editing-note[_ngcontent-%COMP%] {\n  margin-top: 0.5rem;\n  display: inline-flex;\n  position: relative;\n  align-items: center;\n  gap: 0.4rem;\n  border: 1px solid rgba(251, 146, 60, 0.45);\n  background: linear-gradient(135deg, rgba(255, 247, 237, 0.98), rgba(254, 215, 170, 0.85));\n  color: #9a3412;\n  border-radius: 0.65rem;\n  padding: 0.35rem 0.65rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  box-shadow: 0 8px 18px rgba(251, 146, 60, 0.18), 0 0 0 1px rgba(254, 215, 170, 0.32) inset;\n\n  // Glowing comet that orbits OUTSIDE the chip border (orange theme)\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 2rem;\n    height: 2px;\n    border-radius: 999px;\n    background: linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.6) 15%,\n      rgba(255, 255, 255, 1) 50%,\n      rgba(255, 255, 255, 0.6) 85%,\n      transparent 100%\n    );\n    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1))\n            drop-shadow(0 0 5px rgba(254, 215, 170, 0.9))\n            drop-shadow(0 0 10px rgba(251, 146, 60, 0.6))\n            drop-shadow(0 0 18px rgba(234, 88, 12, 0.35));\n    offset-path: inset(0px round 0.65rem);\n    offset-distance: 0%;\n    offset-rotate: auto;\n    animation: _ngcontent-%COMP%_presence-border-tail 3.5s linear infinite;\n    will-change: offset-distance;\n    pointer-events: none;\n    z-index: 3;\n  }\n\n  > * {\n    position: relative;\n    z-index: 1;\n  }\n\n  i {\n    color: #ea580c;\n    font-size: 0.85rem;\n  }\n}\n\n//[_ngcontent-%COMP%]   Read-only[_ngcontent-%COMP%]   mode[_ngcontent-%COMP%]   banner[_ngcontent-%COMP%]   (shown when another user is editing)\n.read-only-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  margin: 0.75rem 0 1rem;\n  background: linear-gradient(135deg, rgba(254, 243, 199, 0.95), rgba(253, 230, 138, 0.85));\n  border: 1px solid rgba(251, 191, 36, 0.5);\n  border-radius: 0.75rem;\n  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.15), 0 0 0 1px rgba(253, 230, 138, 0.4) inset;\n\n  > i {\n    font-size: 1.25rem;\n    color: #b45309;\n    margin-top: 0.15rem;\n    flex-shrink: 0;\n  }\n\n  &__content {\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n\n    strong {\n      font-size: 0.9rem;\n      font-weight: 700;\n      color: #92400e;\n    }\n\n    span {\n      font-size: 0.82rem;\n      color: #a16207;\n      line-height: 1.4;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   Fieldset[_ngcontent-%COMP%]   wrapper[_ngcontent-%COMP%]   for[_ngcontent-%COMP%]   read-only[_ngcontent-%COMP%]   mode\n.form-fieldset[_ngcontent-%COMP%] {\n  border: none;\n  padding: 0;\n  margin: 0;\n  min-width: 0;\n\n  &:disabled {\n    opacity: 1;\n    pointer-events: none;\n\n    input,\n    textarea,\n    select,\n    button:not(.p-tab),\n    .p-inputtext,\n    .p-select,\n    .p-dropdown,\n    .p-calendar,\n    .p-inputnumber,\n    .p-inputtextarea,\n    .p-checkbox,\n    .p-radiobutton {\n      cursor: not-allowed;\n      background: rgba(229, 231, 235, 0.5);\n    }\n\n    // Keep tabs clickable for navigation\n    .p-tab {\n      pointer-events: auto;\n      opacity: 1;\n    }\n  }\n}\n\n.qualification-readiness-panel[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);\n  gap: 1rem;\n  padding: 1.2rem;\n  border: 1px solid rgba(118, 144, 255, 0.18);\n  border-radius: 1.25rem;\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(244, 247, 255, 0.88));\n  box-shadow: 0 18px 40px rgba(43, 72, 132, 0.08);\n}\n\n.qualification-readiness-panel[data-state=\"ready\"][_ngcontent-%COMP%] {\n  border-color: rgba(16, 185, 129, 0.26);\n}\n\n.qualification-readiness-panel[data-state=\"needs-evidence\"][_ngcontent-%COMP%] {\n  border-color: rgba(245, 158, 11, 0.3);\n}\n\n.qualification-readiness-panel[data-state=\"not-ready\"][_ngcontent-%COMP%] {\n  border-color: rgba(239, 68, 68, 0.22);\n}\n\n.qualification-readiness-panel__eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin-bottom: 0.45rem;\n  font-size: 0.74rem;\n  font-weight: 700;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: #5b6ea6;\n}\n\n.qualification-readiness-panel__status[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 0.45rem;\n  font-size: 1.45rem;\n  color: #21304d;\n}\n\n.qualification-readiness-panel__status[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #60708f;\n  line-height: 1.6;\n}\n\n.qualification-readiness-panel__metrics[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.75rem;\n}\n\n.qualification-summary-metric[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  padding: 0.95rem 1rem;\n  border-radius: 1rem;\n  border: 1px solid rgba(118, 144, 255, 0.14);\n  background: rgba(246, 249, 255, 0.92);\n}\n\n.qualification-summary-metric__label[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #6d7da0;\n}\n\n.qualification-summary-metric[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #243354;\n  font-size: 1.1rem;\n  line-height: 1.35;\n}\n\n.qualification-summary-metric[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #7383a7;\n}\n\n.qualification-readiness-panel__blockers[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n  padding: 0.9rem 1rem 0;\n  border-top: 1px solid rgba(148, 163, 184, 0.22);\n}\n\n.qualification-readiness-panel__blockers-title[_ngcontent-%COMP%] {\n  display: inline-flex;\n  margin-bottom: 0.45rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #c05c2f;\n}\n\n.qualification-readiness-panel__blockers[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: 1.1rem;\n  color: #5f6f8f;\n  line-height: 1.55;\n}\n\n.qualification-scoring-details[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  border: 1px solid rgba(118, 144, 255, 0.14);\n  border-radius: 1.15rem;\n  background: rgba(255, 255, 255, 0.84);\n}\n\n.qualification-scoring-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.15rem;\n  cursor: pointer;\n  list-style: none;\n  font-weight: 700;\n  color: #243354;\n}\n\n.qualification-scoring-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]::-webkit-details-marker {\n  display: none;\n}\n\n.qualification-scoring-details[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #7182a7;\n}\n\n.qualification-scoring-details__body[_ngcontent-%COMP%] {\n  padding: 0 1rem 1rem;\n}\n\n.qualification-factor-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}\n\n.qualification-factor-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.9rem;\n  padding: 1rem;\n  border-radius: 1.15rem;\n  border: 1px solid rgba(120, 144, 255, 0.14);\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(246, 249, 255, 0.92));\n  box-shadow: 0 16px 28px rgba(29, 48, 87, 0.06);\n}\n\n.qualification-factor-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: flex-start;\n}\n\n.qualification-factor-card__title-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n  align-items: center;\n}\n\n.qualification-factor-card__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  color: #22304d;\n}\n\n.qualification-factor-card__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  color: #6d7d9f;\n  line-height: 1.55;\n}\n\n.factor-required-badge[_ngcontent-%COMP%], \n.factor-scoring-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n}\n\n.factor-required-badge[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.12);\n  color: #c24141;\n}\n\n.factor-scoring-badge[_ngcontent-%COMP%] {\n  background: rgba(99, 102, 241, 0.12);\n  color: #4f5ecf;\n}\n\n.qualification-factor-card__field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n\n.qualification-factor-card__field[_ngcontent-%COMP%]    > label[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  font-weight: 700;\n  color: #52617e;\n}\n\n.qualification-factor-card__evidence-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding-top: 0.2rem;\n}\n\n.qualification-factor-card__evidence-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n\n.qualification-factor-card__evidence-label[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #7a88a8;\n}\n\n.qualification-factor-card__evidence-summary[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #2c3a5a;\n  font-size: 0.92rem;\n}\n\n.qualification-factor-card__evidence-toggle[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n\n.action-btn--secondary[_ngcontent-%COMP%] {\n  border: 1px solid rgba(95, 129, 255, 0.22);\n  background: rgba(240, 245, 255, 0.95);\n  color: #3451b2;\n}\n\n.history-list--merged[_ngcontent-%COMP%] {\n  gap: 0.85rem;\n}\n\n.history-item--merged[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.85rem;\n}\n\n.history-item__icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.15rem;\n  height: 2.15rem;\n  border-radius: 0.85rem;\n  background: rgba(148, 163, 184, 0.14);\n  color: #5f6f8d;\n  flex-shrink: 0;\n}\n\n.history-item__icon[data-tone=\"success\"][_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.12);\n  color: #109669;\n}\n\n.history-item__icon[data-tone=\"warn\"][_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.12);\n  color: #d0860d;\n}\n\n.history-item__icon[data-tone=\"danger\"][_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.12);\n  color: #d34545;\n}\n\n.history-item__content[_ngcontent-%COMP%] {\n  min-width: 0;\n  flex: 1;\n}\n\n.history-item__title[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #253451;\n}\n\n@media (max-width: 1024px) {\n  .qualification-readiness-panel[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .qualification-readiness-panel__metrics[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .qualification-factor-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LeadFormPage, [{
        type: Component,
        args: [{ selector: 'app-lead-form-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    RouterLink,
                    ButtonModule,
                    CheckboxModule,
                    InputTextModule,
                    SelectModule,
                    InputNumberModule,
                    TextareaModule,
                    ProgressBarModule,
                    KnobModule,
                    TableModule,
                    FileUploadModule,
                    TagModule,
                    DialogModule,
                    DatePickerModule,
                    TooltipModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    InputMaskModule,
                    TabsModule,
                    AccordionModule,
                    SplitButtonModule,
                    ChartModule,
                    BreadcrumbsComponent
                ], template: "\n    <div class=\"lead-form-page\">\n      <app-breadcrumbs></app-breadcrumbs>\n      <p-dialog\n        header=\"Convert Lead\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"convertFormActive()\"\n        [style]=\"{ width: '28rem', maxWidth: '94vw' }\"\n        (visibleChange)=\"convertFormActive.set($event)\"\n        (onHide)=\"cancelConvert()\"\n      >\n        <div class=\"lead-status-dialog\">\n          <div class=\"lead-status-dialog__body\">\n            <p>Create account, contact, and opportunity from this lead.</p>\n          </div>\n          <div class=\"lead-status-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Cancel\" (click)=\"cancelConvert()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Proceed\" (click)=\"confirmConvert()\"></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        [header]=\"closureFormStatus() === 'Lost' ? 'Mark Lead as Lost' : 'Disqualify Lead'\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"closureFormActive()\"\n        [style]=\"{ width: '34rem', maxWidth: '96vw' }\"\n        (visibleChange)=\"closureFormActive.set($event)\"\n        (onHide)=\"cancelClosure()\"\n      >\n        <div class=\"lead-status-dialog\">\n          <div class=\"lead-status-dialog__body lead-status-dialog__body--stacked\">\n            <p-select\n              [options]=\"closureFormStatus() === 'Lost' ? lossReasonOptions() : disqualificationReasonOptions()\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              [(ngModel)]=\"closureReason\"\n              [placeholder]=\"closureFormStatus() === 'Lost' ? 'Loss reason *' : 'Disqualification reason *'\"\n              appendTo=\"body\"\n              styleClass=\"w-full\"\n            ></p-select>\n            <input\n              *ngIf=\"closureFormStatus() === 'Lost'\"\n              pInputText\n              [(ngModel)]=\"closureCompetitor\"\n              placeholder=\"Competitor\"\n              class=\"w-full\"\n            />\n            <input\n              *ngIf=\"closureFormStatus() === 'Lost'\"\n              pInputText\n              [(ngModel)]=\"closureNotes\"\n              placeholder=\"Loss notes\"\n              class=\"w-full\"\n            />\n          </div>\n          <div class=\"lead-status-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Cancel\" (click)=\"cancelClosure()\"></button>\n            <button\n              pButton\n              type=\"button\"\n              class=\"crm-button crm-button--primary\"\n              [label]=\"closureFormStatus() === 'Lost' ? 'Confirm Lost' : 'Confirm Disqualified'\"\n              [disabled]=\"!closureReason.trim()\"\n              (click)=\"confirmClosure()\"\n            ></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        header=\"Saved drafts available\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"draftPromptVisible()\"\n        [style]=\"{ width: '38rem', maxWidth: '96vw' }\"\n        styleClass=\"form-draft-prompt-dialog\"\n        (visibleChange)=\"draftPromptVisible.set($event)\"\n        (onHide)=\"dismissDraftPrompt()\"\n      >\n        <div class=\"form-draft-prompt\">\n          <div class=\"form-draft-prompt__hero\">\n            <div class=\"form-draft-prompt__icon\">\n              <i class=\"pi pi-bookmark\"></i>\n            </div>\n            <div>\n              <h3>Resume a saved lead draft?</h3>\n              <p>You have saved lead drafts. Choose one to continue where you left off, or start with a blank form.</p>\n            </div>\n          </div>\n          <div class=\"form-draft-list\" *ngIf=\"recentDrafts().length; else noLeadPromptDrafts\">\n            <div class=\"form-draft-list__item\" *ngFor=\"let draft of recentDrafts()\">\n              <span class=\"form-draft-list__title\">{{ draft.title }}</span>\n              <span class=\"form-draft-list__meta\">{{ draft.subtitle || 'No company' }} \u00B7 {{ formatDraftTimestamp(draft.updatedAtUtc) }}</span>\n              <span class=\"form-draft-list__actions\">\n                <button type=\"button\" class=\"form-draft-list__resume\" (click)=\"loadDraftFromPrompt(draft)\">Load draft</button>\n              </span>\n            </div>\n          </div>\n          <ng-template #noLeadPromptDrafts>\n            <p class=\"form-draft-dialog__empty\">No saved drafts available.</p>\n          </ng-template>\n          <div class=\"lead-status-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Start fresh\" (click)=\"dismissDraftPrompt()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"View all drafts\" (click)=\"dismissDraftPrompt(); openDraftLibrary()\"></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        header=\"Open saved draft?\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"draftOpenConfirmVisible()\"\n        [style]=\"{ width: '28rem', maxWidth: '94vw' }\"\n        (visibleChange)=\"draftOpenConfirmVisible.set($event)\"\n        (onHide)=\"cancelOpenDraft()\"\n      >\n        <div class=\"lead-status-dialog\">\n          <div class=\"lead-status-dialog__body\">\n            <p>Your current unsaved changes will be replaced by the selected draft.</p>\n          </div>\n          <div class=\"lead-status-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Cancel\" (click)=\"cancelOpenDraft()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Open Draft\" (click)=\"confirmOpenDraft()\"></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        header=\"Unsaved lead changes\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"false\"\n        [visible]=\"leavePromptVisible()\"\n        [style]=\"{ width: '36rem', maxWidth: '96vw' }\"\n        styleClass=\"form-leave-dialog\"\n        (visibleChange)=\"leavePromptVisible.set($event)\"\n        (onHide)=\"stayOnForm()\"\n      >\n        <div class=\"form-leave-dialog__body\">\n          <div class=\"form-leave-dialog__hero\">\n            <div class=\"form-leave-dialog__icon\">\n              <i class=\"pi pi-exclamation-circle\"></i>\n            </div>\n            <div>\n              <h3>Your lead form has unsaved changes.</h3>\n              <p>Choose whether to save the current state as a draft, submit the lead now, or leave without saving.</p>\n            </div>\n          </div>\n          <div class=\"form-leave-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Stay on form\" [disabled]=\"saving() || draftSaving()\" (click)=\"stayOnForm()\"></button>\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Leave without saving\" [disabled]=\"saving() || draftSaving()\" (click)=\"leaveWithoutSaving()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--secondary\" label=\"Save to draft\" [loading]=\"draftSaving()\" [disabled]=\"saving() || draftSaving()\" (click)=\"saveDraftAndLeave()\"></button>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary\" [label]=\"primarySaveLabel()\" [loading]=\"saving()\" [disabled]=\"saving() || draftSaving()\" (click)=\"submitAndLeave()\"></button>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        header=\"Saved lead drafts\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"draftLibraryVisible()\"\n        [style]=\"{ width: '42rem', maxWidth: '96vw' }\"\n        (visibleChange)=\"draftLibraryVisible.set($event)\"\n        (onHide)=\"closeDraftLibrary()\"\n      >\n        <div class=\"form-draft-dialog\">\n          <p class=\"form-draft-dialog__empty\" *ngIf=\"!draftLibraryLoading() && !draftLibraryItems().length\">No saved drafts yet.</p>\n          <div class=\"form-draft-list\" *ngIf=\"draftLibraryItems().length\">\n            <div class=\"form-draft-list__item\" *ngFor=\"let draft of draftLibraryItems()\">\n              <span class=\"form-draft-list__title\">{{ draft.title }}</span>\n              <span class=\"form-draft-list__meta\">{{ draft.subtitle || 'No company' }} \u00B7 {{ formatDraftTimestamp(draft.updatedAtUtc) }}</span>\n              <span class=\"form-draft-list__actions\">\n                <button type=\"button\" class=\"form-draft-list__resume\" (click)=\"openDraftFromSummary(draft)\">Resume</button>\n                <button type=\"button\" class=\"form-draft-list__discard\" (click)=\"discardDraft(draft, $event)\">Discard</button>\n              </span>\n            </div>\n          </div>\n        </div>\n      </p-dialog>\n      <p-dialog\n        [header]=\"duplicateDialogTitle()\"\n        [modal]=\"true\"\n        [draggable]=\"false\"\n        [resizable]=\"false\"\n        [closable]=\"true\"\n        [dismissableMask]=\"true\"\n        [visible]=\"duplicateDialogVisible()\"\n        [style]=\"{ width: '42rem', maxWidth: '95vw' }\"\n        (visibleChange)=\"duplicateDialogVisible.set($event)\"\n        (onHide)=\"dismissDuplicateDialog()\"\n      >\n        <div class=\"duplicate-dialog\">\n          <p class=\"duplicate-dialog__message\">{{ duplicateDialogMessage() }}</p>\n          <div class=\"duplicate-dialog__list\" *ngIf=\"duplicateMatches().length; else noDuplicateMatches\">\n            <div class=\"duplicate-row\" *ngFor=\"let match of duplicateMatches()\">\n              <div class=\"duplicate-row__meta\">\n                <div class=\"duplicate-row__name\">{{ match.name }}</div>\n                <div class=\"duplicate-row__company\">{{ match.companyName || 'No company' }}</div>\n                <div class=\"duplicate-row__signals\">{{ match.matchedSignals.join(', ') }}</div>\n              </div>\n              <div class=\"duplicate-row__score\">\n                <span class=\"duplicate-row__badge\" [attr.data-level]=\"match.matchLevel\">{{ match.matchLevel | titlecase }}</span>\n                <span>Match {{ match.matchScore }}%</span>\n              </div>\n              <button\n                pButton\n                type=\"button\"\n                class=\"p-button-text p-button-sm\"\n                label=\"Open\"\n                (click)=\"reviewDuplicate(match)\"\n              ></button>\n            </div>\n          </div>\n          <ng-template #noDuplicateMatches>\n            <p class=\"duplicate-dialog__message\">No duplicate details found.</p>\n          </ng-template>\n          <div class=\"duplicate-dialog__actions\">\n            <button pButton type=\"button\" class=\"p-button-outlined\" label=\"Cancel\" (click)=\"dismissDuplicateDialog()\"></button>\n            <button\n              pButton\n              type=\"button\"\n              class=\"crm-button crm-button--primary\"\n              label=\"Save Anyway\"\n              *ngIf=\"!duplicateIsBlocked()\"\n              (click)=\"saveDespiteWarning()\"\n            ></button>\n          </div>\n        </div>\n      </p-dialog>\n      <header class=\"page-header\">\n        <div class=\"header-content\">\n          <div class=\"header-top\">\n            <button type=\"button\" class=\"back-link\" routerLink=\"/app/leads\">\n              <i class=\"pi pi-arrow-left\"></i>\n              <span>Back to leads</span>\n            </button>\n            <button\n              type=\"button\"\n              class=\"lead-btn lead-btn--accent\"\n              *ngIf=\"isEditMode()\"\n              (click)=\"logActivity()\"\n            >\n              <i class=\"pi pi-calendar-plus\"></i>\n              <span>Log activity</span>\n            </button>\n          </div>\n          <div class=\"header-row\">\n            <div class=\"header-title\">\n              <h1 class=\"hero-title\">\n                <span class=\"title-gradient\">{{ isEditMode() ? 'Edit' : 'Create New' }}</span>\n                <span class=\"title-light\">Lead</span>\n              </h1>\n              <p>{{ isEditMode() ? 'Update lead details and status' : 'Add a new lead to your pipeline' }}</p>\n              <div class=\"lead-record-number\" *ngIf=\"isEditMode() && leadNumber() as currentLeadNumber\">\n                <span class=\"lead-record-number__label\">Lead Number</span>\n                <strong>{{ currentLeadNumber }}</strong>\n              </div>\n              <div class=\"lead-header-progress\" *ngIf=\"isEditMode()\">\n                <div class=\"lead-header-progress__dial\">\n                  <p-knob\n                    [ngModel]=\"leadHeaderScoreValue()\"\n                    [readonly]=\"true\"\n                    [valueTemplate]=\"'{value}%'\"\n                    [size]=\"92\"\n                    [strokeWidth]=\"9\"\n                    [showValue]=\"true\"\n                    [min]=\"0\"\n                    [max]=\"100\"\n                    [valueColor]=\"leadHeaderScoreColor()\"\n                    valueColor=\"var(--lead-header-score-color)\"\n                    rangeColor=\"rgba(148, 163, 184, 0.18)\"\n                    textColor=\"#1e293b\"\n                    styleClass=\"lead-header-progress__knob\"\n                  ></p-knob>\n                </div>\n                <div class=\"lead-header-progress__content\">\n                  <span class=\"lead-header-progress__eyebrow\">Overall lead score</span>\n                  <div class=\"lead-header-progress__meta\">\n                    <span class=\"lead-header-progress__status\">{{ form.status }}</span>\n                    <span class=\"lead-header-progress__step\">{{ leadProgressSummary() }}</span>\n                  </div>\n                  <p class=\"lead-header-progress__copy\">\n                    {{ leadHeaderProgressMessage() }}\n                  </p>\n                </div>\n              </div>\n              <div class=\"form-draft-status\" *ngIf=\"draftStatusMessage() as draftStatus\">\n                <i class=\"pi pi-bookmark\"></i>\n                <span>{{ draftStatus }}</span>\n              </div>\n              <div class=\"form-draft-banner\" *ngIf=\"draftModeActive()\">\n                <i class=\"pi pi-info-circle\"></i>\n                <span>This form is loaded from a saved draft. Final Save will create or update the live CRM record.</span>\n              </div>\n              <div class=\"presence-focus presence-focus--viewing\" *ngIf=\"isEditMode() && visiblePresenceUsers().length\">\n                <i class=\"pi pi-eye\"></i>\n                <span>{{ viewingPresenceSummary() }}</span>\n              </div>\n              <div class=\"presence-editing-note\" *ngIf=\"isEditMode() && activeEditors().length\">\n                <i class=\"pi pi-pencil\"></i>\n                <span>{{ editingPresenceSummary() }}</span>\n              </div>\n            </div>\n\n            <!-- Hero Status Ribbon (visual stepper beside title) -->\n            <div class=\"status-ribbon\" *ngIf=\"showStatusStepper()\">\n            <div class=\"status-ribbon__inner\">\n              <div class=\"status-ribbon__meta-strip\">\n                <div class=\"status-ribbon__score\">\n                  <div class=\"status-ribbon__score-knob\">\n                    <p-knob\n                      [ngModel]=\"leadHeaderScoreValue()\"\n                      [readonly]=\"true\"\n                      [valueTemplate]=\"'{value}%'\"\n                      [size]=\"92\"\n                      [strokeWidth]=\"9\"\n                      [showValue]=\"true\"\n                      [min]=\"0\"\n                      [max]=\"100\"\n                      [valueColor]=\"leadHeaderScoreColor()\"\n                      valueColor=\"var(--lead-header-score-color)\"\n                      rangeColor=\"rgba(148, 163, 184, 0.18)\"\n                      textColor=\"#1e293b\"\n                      styleClass=\"status-ribbon__score-knob-control\"\n                    ></p-knob>\n                  </div>\n                </div>\n                <div class=\"status-ribbon__meta-pills\">\n                  <span class=\"status-ribbon__meta-pill status-ribbon__meta-pill--status\">{{ form.status }}</span>\n                  <span class=\"status-ribbon__meta-pill\">{{ leadProgressSummary() }}</span>\n                </div>\n                <span class=\"status-ribbon__meta-copy\">{{ leadHeaderProgressMessage() }}</span>\n              </div>\n              <div class=\"status-ribbon__mobile-toggle\">\n                <button type=\"button\" class=\"status-ribbon__mobile-toggle-btn\" (click)=\"toggleStatusPath()\">\n                  <i class=\"pi\" [ngClass]=\"statusPathExpanded() ? 'pi-chevron-up' : 'pi-chevron-down'\"></i>\n                  <span>{{ statusPathExpanded() ? 'Hide status path' : 'View status path' }}</span>\n                </button>\n              </div>\n              <div class=\"lead-stepper lead-stepper--ribbon\">\n                <div class=\"lead-stepper__mobile-summary\">\n                  <span class=\"lead-stepper__mobile-status\">{{ form.status }}</span>\n                  <span class=\"lead-stepper__mobile-next\" *ngIf=\"primaryStatusAction() as action\">{{ action.label }}</span>\n                </div>\n                <div class=\"lead-stepper__desktop-path\" [class.lead-stepper__desktop-path--expanded]=\"statusPathExpanded()\">\n                <div class=\"lead-stepper__track\">\n                  @for (step of stepperSteps(); track step.status; let i = $index; let last = $last) {\n                    <div\n                      class=\"lead-stepper__step\"\n                      [attr.data-state]=\"step.state\"\n                      [class.lead-stepper__step--clickable]=\"step.state !== 'current'\"\n                      (click)=\"step.state !== 'current' ? onStepClick(step) : null\"\n                      [pTooltip]=\"step.state === 'locked' ? (step.unlockHint ? step.unlockHint + ' (click to go there)' : undefined) : undefined\"\n                      tooltipPosition=\"top\"\n                    >\n                      <div class=\"lead-stepper__icon\">\n                        <i class=\"pi\" [ngClass]=\"step.state === 'completed' ? 'pi-check' : (step.state === 'locked' ? 'pi-lock' : step.icon)\"></i>\n                      </div>\n                      <span class=\"lead-stepper__label\">{{ step.label }}</span>\n                      <span class=\"lead-stepper__duration\" *ngIf=\"step.timeInStage\">{{ step.timeInStage }}</span>\n                    </div>\n                    <div class=\"lead-stepper__connector\" *ngIf=\"!last\" [attr.data-filled]=\"step.state === 'completed'\"></div>\n                  }\n\n                  <!-- AI Score badge near Qualified step -->\n                  <div class=\"lead-stepper__score-badge\" *ngIf=\"form.score\" [attr.data-quality]=\"form.score >= 80 ? 'high' : (form.score >= 50 ? 'medium' : 'low')\">\n                    <i class=\"pi pi-bolt\"></i>\n                    <span>{{ form.score }}</span>\n                  </div>\n                </div>\n                <div class=\"lead-stepper__branch-lane\">\n                  <div class=\"lead-stepper__branch-stem\" [attr.data-state]=\"nurtureBranchState()\"></div>\n                  <button\n                    type=\"button\"\n                    class=\"lead-stepper__branch\"\n                    [attr.data-state]=\"nurtureBranchState()\"\n                    [class.lead-stepper__branch--clickable]=\"nurtureBranchState() === 'available'\"\n                    (click)=\"onNurtureBranchClick()\"\n                  >\n                    <span class=\"lead-stepper__branch-icon\">\n                      <i class=\"pi pi-clock\"></i>\n                    </span>\n                    <span class=\"lead-stepper__branch-copy\">\n                      <span class=\"lead-stepper__branch-label\">Nurture</span>\n                      <span class=\"lead-stepper__branch-meta\">Branch for long-tail follow-up</span>\n                    </span>\n                  </button>\n                </div>\n                </div>\n              </div>\n\n              <div class=\"lead-status-rail\">\n              <div class=\"lead-status-rail__summary\">\n                <div class=\"lead-status-rail__current\">\n                  <span class=\"lead-status-rail__eyebrow\">Current status</span>\n                  <span class=\"lead-status-rail__value\">{{ form.status }}</span>\n                </div>\n                  <p class=\"lead-status-rail__instruction\" *ngIf=\"currentStatusInstruction() as instruction\">{{ instruction }}</p>\n                  <div class=\"lead-status-rail__blocker-panel\" *ngIf=\"progressActionBlockedReasons().length\">\n                  <span class=\"lead-status-rail__blocker-label\">To move forward:</span>\n                  <ul class=\"lead-status-rail__blockers\">\n                    <li *ngFor=\"let blocker of progressActionBlockedReasons()\">{{ blocker }}</li>\n                  </ul>\n                  </div>\n                  <div class=\"lead-stepper__backward-confirm\" *ngIf=\"backwardConfirmPending()\">\n                    <i class=\"pi pi-exclamation-triangle\"></i>\n                    <span>Move back to <strong>{{ backwardConfirmTarget()?.label }}</strong>?</span>\n                    <button type=\"button\" class=\"backward-confirm__yes\" (click)=\"confirmBackward()\">\n                      <i class=\"pi pi-check\"></i> Yes\n                    </button>\n                    <button type=\"button\" class=\"backward-confirm__no\" (click)=\"cancelBackward()\">\n                      <i class=\"pi pi-times\"></i>\n                    </button>\n                  </div>\n                </div>\n                <div class=\"lead-status-rail__actions\">\n                  <button\n                    *ngIf=\"primaryStatusAction() as action\"\n                    type=\"button\"\n                    class=\"lead-status-rail__primary\"\n                    [disabled]=\"action.disabled\"\n                    (click)=\"triggerPrimaryStatusAction()\"\n                  >\n                    <i class=\"pi\" [ngClass]=\"action.icon\"></i>\n                    <span>{{ action.label }}</span>\n                  </button>\n                  <button\n                    *ngIf=\"nurtureBranchAction() as branch\"\n                    type=\"button\"\n                    class=\"lead-status-rail__branch\"\n                    (click)=\"onNurtureBranchClick()\"\n                  >\n                    <i class=\"pi\" [ngClass]=\"branch.icon\"></i>\n                    <span>{{ branch.label }}</span>\n                  </button>\n                  <div class=\"lead-status-rail__secondary\" *ngIf=\"!canRecycleLead() && !isOutcomeStatus()\">\n                    <button\n                      *ngFor=\"let action of secondaryOutcomeActions()\"\n                      type=\"button\"\n                      class=\"lead-status-rail__secondary-btn\"\n                      [disabled]=\"action.disabled\"\n                      (click)=\"onOutcomeClick(action.status)\"\n                    >\n                      <i class=\"pi\" [ngClass]=\"action.icon\"></i>\n                      <span>{{ action.label }}</span>\n                    </button>\n                  </div>\n                </div>\n              </div>\n\n              <!-- Compact audit trail -->\n              <div class=\"stepper-audit-trail\" *ngIf=\"statusAuditTrail().length\">\n                @for (entry of statusAuditTrail(); track entry.date; let last = $last) {\n                  <span class=\"audit-trail__entry\" [attr.data-status]=\"entry.status\">{{ entry.status }}</span>\n                  <span class=\"audit-trail__date\">{{ entry.date }}</span>\n                  <span class=\"audit-trail__arrow\" *ngIf=\"!last\">\u2192</span>\n                }\n              </div>\n            </div>\n          </div>\n          </div>\n\n        </div>\n      </header>\n\n      <!-- Read-only mode banner when another user is editing -->\n      <div class=\"read-only-banner\" *ngIf=\"isEditMode() && isReadOnlyDueToEditing()\">\n        <i class=\"pi pi-lock\"></i>\n        <div class=\"read-only-banner__content\">\n          <strong>Read-only mode</strong>\n          <span>{{ lockingEditorName() }} is currently editing this record. You can view but not make changes until they save or leave.</span>\n        </div>\n      </div>\n\n      <section class=\"related-summary\" *ngIf=\"isEditMode()\" [class.related-summary--empty]=\"!hasLinkedRecords()\">\n        <div class=\"related-summary-label\">Converted to</div>\n        <div class=\"related-summary-links\" *ngIf=\"hasLinkedRecords(); else noLinkedSummary\">\n          <a *ngIf=\"linkedAccountLink() as link\" [routerLink]=\"link\" class=\"related-summary-link\">\n            <i class=\"pi pi-building\"></i>\n            Account\n          </a>\n          <a *ngIf=\"linkedContactLink() as link\" [routerLink]=\"link\" class=\"related-summary-link\">\n            <i class=\"pi pi-user\"></i>\n            Contact\n          </a>\n          <a *ngIf=\"linkedOpportunityLink() as link\" [routerLink]=\"link\" class=\"related-summary-link\">\n            <i class=\"pi pi-briefcase\"></i>\n            Opportunity\n          </a>\n        </div>\n        <ng-template #noLinkedSummary>\n          <span class=\"related-summary-empty\">No linked records yet.</span>\n        </ng-template>\n      </section>\n\n      <main class=\"form-container\">\n        <form class=\"lead-form\" (ngSubmit)=\"onSave()\">\n          <fieldset class=\"form-fieldset\" [disabled]=\"isReadOnlyDueToEditing()\">\n          <p-tabs class=\"lead-tabs-shell\" [value]=\"activeTab()\" (valueChange)=\"onActiveTabChange($event)\">\n            <p-tablist class=\"lead-tabs\">\n              <p-tab value=\"overview\" [disabled]=\"isTabDisabled('overview')\" [pt]=\"{ root: { class: 'lead-tab' } }\">\n                <span class=\"lead-tab-label\">Overview</span>\n              </p-tab>\n              <p-tab value=\"activity\" [disabled]=\"isTabDisabled('activity')\" [pt]=\"{ root: { class: 'lead-tab' } }\">\n                <span class=\"lead-tab-label\">Activity &amp;<br />Follow-up</span>\n                <span class=\"tab-badge warn\" *ngIf=\"activityTabBadge()\">{{ activityTabBadge() }}</span>\n              </p-tab>\n              <p-tab value=\"qualification\" [disabled]=\"isTabDisabled('qualification')\" [pt]=\"{ root: { class: 'lead-tab' } }\">\n                <span class=\"lead-tab-label\">Qualifications</span>\n                <span class=\"tab-badge danger\" *ngIf=\"qualificationTabBadge()\">{{ qualificationTabBadge() }}</span>\n              </p-tab>\n              <p-tab value=\"documents\" [disabled]=\"isTabDisabled('documents')\" [pt]=\"{ root: { class: 'lead-tab' } }\">\n                <span class=\"lead-tab-label\">Supporting<br />Documents</span>\n                <span class=\"tab-badge\" *ngIf=\"isEditMode() && attachments().length\">{{ attachments().length }}</span>\n              </p-tab>\n              <p-tab value=\"history\" [disabled]=\"isTabDisabled('history')\" [pt]=\"{ root: { class: 'lead-tab' } }\">\n                <span class=\"lead-tab-label\">History</span>\n              </p-tab>\n            </p-tablist>\n            <p-tabpanels>\n              <p-tabpanel value=\"overview\">\n          <p-accordion\n            class=\"overview-accordion-shell\"\n            [multiple]=\"true\"\n            [value]=\"overviewAccordionOpenPanels()\"\n            (valueChange)=\"onAccordionValueChange('overview', $event)\"\n          >\n            <p-accordion-panel value=\"lead-basics\">\n              <p-accordion-header>\n                <h2 class=\"section-title section-title--accordion\">\n                  <i class=\"pi pi-user\"></i>\n                  Lead basics\n                </h2>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-section form-section--overview form-section--accordion-body\">\n                  <div class=\"section-block\">\n                    <div class=\"form-grid qualification-grid\">\n                <div class=\"form-field\">\n                  <label for=\"lead-firstName\">First name <span class=\"required\">*</span></label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                      <i class=\"pi pi-user\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"lead-firstName\" name=\"firstName\" [(ngModel)]=\"form.firstName\" required placeholder=\"First name\" class=\"w-full\" />\n                  </p-inputgroup>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"lead-lastName\">Last name <span class=\"required\">*</span></label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                      <i class=\"pi pi-user\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"lead-lastName\" name=\"lastName\" [(ngModel)]=\"form.lastName\" required placeholder=\"Last name\" class=\"w-full\" />\n                  </p-inputgroup>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"lead-companyName\">Company</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--company\">\n                      <i class=\"pi pi-building\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"lead-companyName\" name=\"companyName\" [(ngModel)]=\"form.companyName\" placeholder=\"Company\" class=\"w-full\" />\n                  </p-inputgroup>\n                </div>\n                <div class=\"form-field full-row\">\n                  <label for=\"lead-leadSummary\">Lead summary</label>\n                  <p class=\"hint-text compact\">Initial business context for the lead.</p>\n                  <textarea\n                    pTextarea\n                    id=\"lead-leadSummary\"\n                    name=\"leadSummary\"\n                    rows=\"3\"\n                    placeholder=\"What is this lead about, what are they evaluating, and why now?\"\n                    class=\"w-full\"\n                    [(ngModel)]=\"form.leadSummary\"\n                  ></textarea>\n                </div>\n                <div class=\"form-field form-field--status-fallback\">\n                  <label>Status</label>\n                  <p-select\n                    [options]=\"statusOptionsForView()\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    optionDisabled=\"disabled\"\n                    name=\"status\"\n                    [ngModel]=\"form.status\"\n                    (ngModelChange)=\"onStatusSelectionChange($event)\"\n                    placeholder=\"Select status\"\n                    appendTo=\"body\"\n                    styleClass=\"w-full\"\n                  >\n                    <ng-template pTemplate=\"item\" let-option>\n                      <div class=\"status-option\" [attr.data-status]=\"option.value\">\n                        <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                        <span>{{ option.label }}</span>\n                      </div>\n                    </ng-template>\n                    <ng-template pTemplate=\"value\" let-option>\n                      <div class=\"status-option\" *ngIf=\"option\" [attr.data-status]=\"option.value\">\n                        <i class=\"pi\" [ngClass]=\"option.icon\"></i>\n                        <span>{{ option.label }}</span>\n                      </div>\n                      <span *ngIf=\"!option\" class=\"status-placeholder\">Select status</span>\n                    </ng-template>\n                  </p-select>\n                  <div class=\"status-note\" *ngIf=\"statusPolicyHint() as hint\">\n                    <p>{{ hint }}</p>\n                    <a class=\"status-action-link\" *ngIf=\"isActivityDrivenHint()\" (click)=\"goToActivityTab()\"><i class=\"pi pi-plus-circle\"></i> Log an activity</a>\n                  </div>\n                </div>\n                <div class=\"form-field\">\n                  <label>Assignment</label>\n                  <p-select\n                    [options]=\"assignmentOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    name=\"assignmentStrategy\"\n                    [(ngModel)]=\"form.assignmentStrategy\"\n                    placeholder=\"Select assignment\"\n                    appendTo=\"body\"\n                    styleClass=\"w-full\"\n                    [disabled]=\"!canEditAssignment()\"\n                  >\n                    <ng-template pTemplate=\"item\" let-option>\n                      <div class=\"option-row\" [attr.data-testid]=\"'lead-assignment-option-' + option.value\">\n                        {{ option.label }}\n                      </div>\n                    </ng-template>\n                    <ng-template pTemplate=\"value\" let-option>\n                      <div class=\"option-row\" *ngIf=\"option\" [attr.data-testid]=\"'lead-assignment-selected'\">\n                        {{ option.label }}\n                      </div>\n                      <span *ngIf=\"!option\" class=\"select-placeholder\">Select assignment</span>\n                    </ng-template>\n                  </p-select>\n                </div>\n                <div class=\"form-field\" *ngIf=\"form.assignmentStrategy === 'Manual'\">\n                  <label>Owner</label>\n                  <p-select\n                    [options]=\"ownerOptions()\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    name=\"ownerId\"\n                    [(ngModel)]=\"form.ownerId\"\n                    placeholder=\"Select owner\"\n                    appendTo=\"body\"\n                    styleClass=\"w-full\"\n                    [readonly]=\"isOwnerReadOnly()\"\n                    [disabled]=\"isOwnerReadOnly()\"\n                  >\n                    <ng-template pTemplate=\"item\" let-option>\n                      <div class=\"option-row\" [attr.data-testid]=\"'lead-owner-option-' + option.value\">\n                        {{ option.label }}\n                      </div>\n                    </ng-template>\n                    <ng-template pTemplate=\"value\" let-option>\n                      <div class=\"option-row\" *ngIf=\"option\">\n                        {{ option.label }}\n                      </div>\n                      <span *ngIf=\"!option\" class=\"select-placeholder\">Select owner</span>\n                    </ng-template>\n                    </p-select>\n                  </div>\n                    </div>\n                  </div>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel value=\"contact-details\">\n              <p-accordion-header>\n                <h2 class=\"section-title section-title--accordion\">\n                  <i class=\"pi pi-phone\"></i>\n                  Contact details\n                </h2>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-section form-section--overview form-section--accordion-body\">\n                  <div class=\"section-block\">\n                    <div class=\"form-grid\">\n                <div class=\"form-field\">\n                  <label for=\"lead-email\">Email</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--email\">\n                      <i class=\"pi pi-envelope\"></i>\n                    </p-inputgroup-addon>\n                    <input\n                      pInputText\n                      id=\"lead-email\"\n                      name=\"email\"\n                      [ngModel]=\"form.email\"\n                      (ngModelChange)=\"onEmailChange($event)\"\n                      type=\"email\"\n                      placeholder=\"name@company.com\"\n                      class=\"w-full\"\n                    />\n                  </p-inputgroup>\n                  <a *ngIf=\"isEditMode() && form.email\" class=\"field-link\" href=\"\" (click)=\"composeToCurrentLead($event)\">\n                    <i class=\"pi pi-external-link\"></i> Send email\n                  </a>\n                  <p class=\"field-error\" *ngIf=\"emailError()\">{{ emailError() }}</p>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"lead-phoneType\">Phone</label>\n                  <div class=\"phone-grid\">\n                    <p-select\n                      [options]=\"phoneTypeOptions\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      name=\"phoneTypeId\"\n                      [(ngModel)]=\"form.phoneTypeId\"\n                      placeholder=\"Select type\"\n                      appendTo=\"body\"\n                      styleClass=\"phone-type-select w-full\"\n                    ></p-select>\n                    <p-select\n                      [options]=\"phoneCountryOptions\"\n                      optionLabel=\"label\"\n                      optionValue=\"value\"\n                      name=\"phoneCountry\"\n                      [(ngModel)]=\"phoneCountryIso\"\n                      (ngModelChange)=\"onPhoneCountryChange($event)\"\n                      placeholder=\"Select country\"\n                      [filter]=\"true\"\n                      filterBy=\"label\"\n                      appendTo=\"body\"\n                      styleClass=\"phone-country-select w-full\"\n                    >\n                      <ng-template pTemplate=\"selectedItem\" let-option>\n                        <div class=\"phone-country-option\" *ngIf=\"option\">\n                          <span>{{ option.flag }} {{ option.name }}</span>\n                          <strong>{{ option.dialCode }}</strong>\n                        </div>\n                      </ng-template>\n                      <ng-template pTemplate=\"item\" let-option>\n                        <div class=\"phone-country-option\">\n                          <span>{{ option.flag }} {{ option.name }}</span>\n                          <strong>{{ option.dialCode }}</strong>\n                        </div>\n                      </ng-template>\n                    </p-select>\n                    <ng-container *ngIf=\"phoneCountryIso; else plainPhoneInput\">\n                      <p-inputMask\n                        name=\"phoneNumber\"\n                        [mask]=\"phoneMask()\"\n                        [slotChar]=\"'_'\"\n                        [autoClear]=\"false\"\n                        [unmask]=\"false\"\n                        [ngModel]=\"phoneNationalNumber\"\n                        (ngModelChange)=\"onPhoneChange($event)\"\n                        [placeholder]=\"phonePlaceholder()\"\n                        styleClass=\"w-full\"\n                      ></p-inputMask>\n                    </ng-container>\n                    <ng-template #plainPhoneInput>\n                      <input\n                        pInputText\n                        name=\"phoneNumberPlain\"\n                        [ngModel]=\"phoneNationalNumber\"\n                        (ngModelChange)=\"onPhoneChange($event)\"\n                        placeholder=\"Phone number\"\n                        class=\"w-full\"\n                      />\n                    </ng-template>\n                  </div>\n                  <p class=\"field-error\" *ngIf=\"phoneError()\">{{ phoneError() }}</p>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"lead-jobTitle\">Job title</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                      <i class=\"pi pi-id-card\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"lead-jobTitle\" name=\"jobTitle\" [(ngModel)]=\"form.jobTitle\" placeholder=\"Role or title\" class=\"w-full\" />\n                  </p-inputgroup>\n                </div>\n                <div class=\"form-field\">\n                  <label for=\"lead-source\">Source</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--industry\">\n                      <i class=\"pi pi-compass\"></i>\n                    </p-inputgroup-addon>\n                    <input pInputText id=\"lead-source\" name=\"source\" [(ngModel)]=\"form.source\" placeholder=\"Web, Referral, Event\" class=\"w-full\" />\n                  </p-inputgroup>\n                </div>\n                <div class=\"form-field\" *ngIf=\"routingReason()\">\n                  <label for=\"lead-routingReason\">Routing reason</label>\n                  <p-inputgroup>\n                    <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                      <i class=\"pi pi-directions\"></i>\n                    </p-inputgroup-addon>\n                    <input\n                      pInputText\n                      id=\"lead-routingReason\"\n                      [ngModel]=\"routingReason()\"\n                      [ngModelOptions]=\"{ standalone: true }\"\n                      class=\"w-full\"\n                      [disabled]=\"true\"\n                    />\n                  </p-inputgroup>\n                </div>\n                    </div>\n                  </div>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel value=\"buyer-profile\" *ngIf=\"isBrokeragePreset()\">\n              <p-accordion-header>\n                <h2 class=\"section-title section-title--accordion\">\n                  <i class=\"pi pi-home\"></i>\n                  Buyer Profile\n                </h2>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-section form-section--accordion-body\">\n                  <div class=\"form-grid\">\n                    <div class=\"form-field\">\n                      <label for=\"lead-buyerType\">Buyer type</label>\n                      <p-select\n                        id=\"lead-buyerType\"\n                        name=\"buyerType\"\n                        [options]=\"buyerTypeOptions()\"\n                        optionLabel=\"label\"\n                        optionValue=\"value\"\n                        placeholder=\"Select buyer type\"\n                        appendTo=\"body\"\n                        styleClass=\"w-full\"\n                        [(ngModel)]=\"form.buyerType\"\n                      ></p-select>\n                    </div>\n                    <div class=\"form-field\">\n                      <label for=\"lead-preferredArea\">Preferred area</label>\n                      <p-select\n                        id=\"lead-preferredArea\"\n                        name=\"preferredArea\"\n                        [options]=\"preferredAreaOptions()\"\n                        optionLabel=\"label\"\n                        optionValue=\"value\"\n                        placeholder=\"Select preferred area\"\n                        appendTo=\"body\"\n                        styleClass=\"w-full\"\n                        [(ngModel)]=\"form.preferredArea\"\n                      ></p-select>\n                    </div>\n                    <div class=\"form-field\">\n                      <label for=\"lead-preferredPropertyType\">Property type</label>\n                      <p-select\n                        id=\"lead-preferredPropertyType\"\n                        name=\"preferredPropertyType\"\n                        [options]=\"propertyTypeOptions()\"\n                        optionLabel=\"label\"\n                        optionValue=\"value\"\n                        placeholder=\"Select property type\"\n                        appendTo=\"body\"\n                        styleClass=\"w-full\"\n                        [(ngModel)]=\"form.preferredPropertyType\"\n                      ></p-select>\n                    </div>\n                    <div class=\"form-field\">\n                      <label for=\"lead-budgetBand\">Budget band</label>\n                      <p-select\n                        id=\"lead-budgetBand\"\n                        name=\"budgetBand\"\n                        [options]=\"budgetBandOptions()\"\n                        optionLabel=\"label\"\n                        optionValue=\"value\"\n                        placeholder=\"Select budget band\"\n                        appendTo=\"body\"\n                        styleClass=\"w-full\"\n                        [(ngModel)]=\"form.budgetBand\"\n                      ></p-select>\n                    </div>\n                  </div>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel value=\"score\">\n              <p-accordion-header>\n                <h2 class=\"section-title section-title--accordion section-title--accordion-summary\">\n                  <i class=\"pi pi-chart-line\"></i>\n                  <span>Score</span>\n                  <span class=\"accordion-header-summary\">\n                    <span class=\"accordion-header-badge accordion-header-badge--score\" [attr.data-tone]=\"overallScoreBadgeTone()\">\n                      Overall {{ overallScoreBadgeValue() }}/100\n                    </span>\n                    <span class=\"accordion-header-badge accordion-header-badge--meta\" *ngIf=\"aiScoreConfidenceLabel() as confidence\">\n                      {{ confidence }}\n                    </span>\n                    <span class=\"accordion-header-badge accordion-header-badge--meta\" *ngIf=\"scoreSourceBadge() as source\">\n                      {{ source }}\n                    </span>\n                  </span>\n                </h2>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-section form-section--score form-section--accordion-body\">\n                  <p-progressBar\n                    *ngIf=\"aiScoring()\"\n                    styleClass=\"ai-score-progress ai-score-progress--top\"\n                    mode=\"indeterminate\"\n                  ></p-progressBar>\n                  <div class=\"form-grid\">\n              <div class=\"form-field score-field\">\n                <label for=\"lead-score\">Score</label>\n                <div class=\"score-content\">\n                  <p-inputNumber\n                    id=\"lead-score\"\n                    name=\"score\"\n                    [(ngModel)]=\"form.score\"\n                    [min]=\"0\"\n                    [max]=\"100\"\n                    placeholder=\"0-100\"\n                    class=\"w-full\"\n                    [disabled]=\"true\"\n                  ></p-inputNumber>\n                  <div class=\"score-meta\">\n                    <p class=\"hint-text\">\n                      Primary prioritization score, calculated from lead signals and qualification factors.\n                      Manual entry is disabled.\n                      <span *ngIf=\"form.autoScore\"> Preview: {{ computeAutoScore() }}.</span>\n                    </p>\n                    <p-tag *ngIf=\"aiScoreConfidenceLabel()\" [value]=\"aiScoreConfidenceLabel()!\" severity=\"info\"></p-tag>\n                    <p-tag *ngIf=\"scoreSourceBadge()\" [value]=\"scoreSourceBadge()!\" severity=\"secondary\"></p-tag>\n                  </div>\n                  <div class=\"ai-score-row\" *ngIf=\"isEditMode()\">\n                    <button\n                      type=\"button\"\n                      class=\"action-btn action-btn--refresh ai-score-button\"\n                      (click)=\"onAiScore()\"\n                      [disabled]=\"aiScoring() || !canRefreshScore()\"\n                    >\n                      <span class=\"action-btn__icon\"><i class=\"pi pi-sync\"></i></span>\n                      <span>Refresh score</span>\n                    </button>\n                    <div class=\"ai-score-inline\" *ngIf=\"aiScoreNote() && !aiScoring()\" [ngClass]=\"aiScoreClass()\">\n                      <i class=\"pi\" [ngClass]=\"aiScoreIcon()\"></i>\n                      <span>{{ aiScoreNote() }}</span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"form-field\">\n                <label for=\"lead-territory\">Territory</label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--address\">\n                    <i class=\"pi pi-map\"></i>\n                  </p-inputgroup-addon>\n                  <input pInputText id=\"lead-territory\" name=\"territory\" [(ngModel)]=\"form.territory\" placeholder=\"West, EMEA, APAC\" class=\"w-full\" />\n                </p-inputgroup>\n              </div>\n                  </div>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n          </p-accordion>\n\n              </p-tabpanel>\n              <p-tabpanel value=\"qualification\">\n          <section class=\"qualification-scoring-shell\" *ngIf=\"isEditMode()\" aria-label=\"Qualification scoring\">\n            <header class=\"qualification-scoring-shell__header\">\n              <div class=\"qual-shell-title\">\n                <span class=\"qual-shell-title__icon\"><i class=\"pi pi-sitemap\" aria-hidden=\"true\"></i></span>\n                <div>\n                  <span class=\"qual-shell-title__eyebrow\">Qualification Scoring</span>\n                  <h2>Qualification Summary</h2>\n                  <p>Review readiness, close the blockers, and move the lead forward with defensible evidence.</p>\n                </div>\n              </div>\n              <div class=\"qual-shell-actions\">\n                <button\n                  type=\"button\"\n                  class=\"action-btn action-btn--refresh qual-shell-actions__primary\"\n                  (click)=\"onGenerateConversationSummary()\"\n                  [disabled]=\"conversationAiSummaryLoading()\"\n                >\n                  <span class=\"action-btn__icon\">\n                    <i class=\"pi\" [ngClass]=\"conversationAiSummaryLoading() ? 'pi-spin pi-spinner' : 'pi-sparkles'\" aria-hidden=\"true\"></i>\n                  </span>\n                  <span>Generate AI Insights</span>\n                </button>\n              </div>\n            </header>\n\n            <section class=\"qualification-readiness-panel\" [attr.data-state]=\"qualificationReadinessState()\">\n              <div class=\"qualification-readiness-panel__status\">\n                <span class=\"qualification-readiness-panel__eyebrow\">Qualification readiness</span>\n                <h3>{{ qualificationReadinessTitle() }}</h3>\n                <p>{{ qualificationReadinessDescription() }}</p>\n              </div>\n              <div class=\"qualification-readiness-panel__metrics\">\n                <article class=\"qualification-summary-metric\">\n                  <span class=\"qualification-summary-metric__label\">CQVS Qualification</span>\n                  <strong>{{ qualificationContributionTotal() }} / 100</strong>\n                </article>\n                <article class=\"qualification-summary-metric\">\n                  <span class=\"qualification-summary-metric__label\">{{ qualificationConfidenceMetricLabel() }}</span>\n                  <strong>{{ qualificationConfidencePercent() }}%</strong>\n                  <small>{{ qualificationConfidenceDisplayLabel() }}</small>\n                </article>\n                <article class=\"qualification-summary-metric qualification-summary-metric--action\">\n                  <span class=\"qualification-summary-metric__label\">Next best action</span>\n                  <strong>{{ conversationNextActionDisplay() || 'Ask about budget and timeline.' }}</strong>\n                </article>\n              </div>\n              <div class=\"qualification-readiness-panel__blockers\" *ngIf=\"qualificationReadinessBlockers().length\">\n                <span class=\"qualification-readiness-panel__blockers-title\">Current blockers</span>\n                <ul>\n                  <li *ngFor=\"let blocker of qualificationReadinessBlockers()\">{{ blocker }}</li>\n                </ul>\n              </div>\n            </section>\n\n            <details class=\"qualification-scoring-details\">\n              <summary>\n                <span>Scoring details</span>\n                <small>Open CQVS radar, weighted breakdown, and top risks</small>\n              </summary>\n              <div class=\"qualification-scoring-details__body\">\n                <div class=\"qual-cqvs-section\">\n                  <div class=\"qual-cqvs-radar\">\n                    <header class=\"qual-cqvs-radar__header\">\n                      <span class=\"qual-cqvs-radar__title\">\n                        <i class=\"pi pi-chart-scatter\" aria-hidden=\"true\"></i>\n                        CQVS Radar\n                      </span>\n                      <span class=\"qual-cqvs-radar__sub\">Score % per pillar</span>\n                    </header>\n                    <p-chart *ngIf=\"showCqvsRadar()\" type=\"radar\" [data]=\"cqvsRadarChartData()\" [options]=\"cqvsRadarChartOptions\"></p-chart>\n                  </div>\n                  <div class=\"qual-cqvs-cards\">\n                    <article class=\"cqvs-group-card\" *ngFor=\"let group of cqvsGroupRows()\" [attr.data-cqvs]=\"group.code\">\n                      <div class=\"cqvs-group-card__head\">\n                        <span class=\"cqvs-code\" [attr.data-cqvs]=\"group.code\">{{ group.code }}</span>\n                        <div class=\"cqvs-group-card__title\">\n                          <strong>{{ group.title }}</strong>\n                          <span>{{ group.description }}</span>\n                        </div>\n                      </div>\n                      <div class=\"cqvs-group-card__metrics\">\n                        <span class=\"score-val\">{{ group.score }} / {{ group.maxScore }}</span>\n                        <span class=\"weight-pill\">{{ group.weight }}% Weight</span>\n                      </div>\n                      <div class=\"factor-rail compact\">\n                        <span class=\"factor-rail__fill\" [style.width.%]=\"cqvsGroupPercent(group)\"></span>\n                      </div>\n                    </article>\n                  </div>\n                </div>\n\n                <section class=\"qual-breakdown-grid\">\n                  <div class=\"qual-breakdown-main\">\n                    <header class=\"qual-breakdown-main__header\">CQVS Breakdown</header>\n                    <p-table [value]=\"scoreBreakdownRows()\" styleClass=\"score-breakdown-table score-breakdown-table--hero\">\n                      <ng-template pTemplate=\"header\">\n                        <tr>\n                          <th>CQVS Factor</th>\n                          <th>Weight</th>\n                          <th>Selected Value</th>\n                          <th>Confidence</th>\n                          <th>Evidence</th>\n                          <th>Contribution</th>\n                          <th>Score</th>\n                        </tr>\n                      </ng-template>\n                      <ng-template pTemplate=\"body\" let-row>\n                        <tr>\n                          <td class=\"col-factor col-factor--with-cqvs\">\n                            <span class=\"cqvs-badge\" [attr.data-cqvs]=\"row.cqvs\">{{ row.factor.slice(0, 1) }}</span>\n                            <span>{{ row.factor }}</span>\n                          </td>\n                          <td class=\"col-weight\">{{ row.weight }}</td>\n                          <td class=\"col-selected\">{{ row.selectedValue }}</td>\n                          <td class=\"col-confidence\">\n                            <span class=\"confidence-badge\" [attr.data-confidence]=\"row.confidence.toLowerCase()\">{{ row.confidence }}</span>\n                          </td>\n                          <td class=\"col-evidence\">{{ row.evidence }}</td>\n                          <td class=\"col-contribution\">\n                            <div class=\"factor-rail compact\">\n                              <span class=\"factor-rail__fill\" [style.width.%]=\"scoreContributionPercent(row)\"></span>\n                            </div>\n                            <span>{{ scoreContributionPercent(row) }}%</span>\n                          </td>\n                          <td class=\"col-score\">{{ row.score }} / {{ row.maxScore }}</td>\n                        </tr>\n                      </ng-template>\n                    </p-table>\n                  </div>\n                  <aside class=\"qual-risk-card\">\n                    <h4>Top Risks</h4>\n                    <div class=\"qual-risk-list\" *ngIf=\"riskFlags().length; else fallbackRisks\">\n                      <div class=\"qual-risk-item\" *ngFor=\"let flag of riskFlags().slice(0, 5)\">\n                        <i class=\"pi pi-exclamation-circle\" aria-hidden=\"true\"></i>\n                        <span>{{ flag }}</span>\n                      </div>\n                    </div>\n                    <ng-template #fallbackRisks>\n                      <div class=\"qual-risk-list\">\n                        <div class=\"qual-risk-item\"><i class=\"pi pi-exclamation-circle\" aria-hidden=\"true\"></i><span>No material risks detected yet.</span></div>\n                      </div>\n                    </ng-template>\n                  </aside>\n                </section>\n              </div>\n            </details>\n          </section>\n\n          <p-accordion\n            class=\"tab-content-accordion-shell\"\n            [multiple]=\"true\"\n            [value]=\"qualificationAccordionOpenPanels()\"\n            (valueChange)=\"onAccordionValueChange('qualification', $event)\"\n          >\n            <p-accordion-panel value=\"qualification-factors\">\n              <p-accordion-header>\n                <h2 class=\"section-title section-title--accordion section-title--accordion-summary\">\n                  <i class=\"pi pi-chart-line\"></i>\n                  Qualification factors\n                  <span class=\"accordion-header-summary\">\n                    <span class=\"accordion-header-badge accordion-header-badge--score\" [attr.data-tone]=\"qualificationFactorsBadgeTone()\">\n                      {{ qualificationFactorsBadgeLabel() }}\n                    </span>\n                    <span class=\"accordion-header-badge accordion-header-badge--meta\" *ngIf=\"qualificationRequiredBadgeLabel() as label\">\n                      {{ label }}\n                    </span>\n                  </span>\n                </h2>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-section form-section--qualification form-section--accordion-body\">\n                  <div class=\"qualification-factor-grid\">\n                    <article class=\"qualification-factor-card\" *ngFor=\"let factor of qualificationFactorCards()\">\n                      <header class=\"qualification-factor-card__header\">\n                        <div>\n                          <div class=\"qualification-factor-card__title-row\">\n                            <h3>{{ factor.label }}</h3>\n                            <span class=\"factor-required-badge\" *ngIf=\"factor.required\">Required</span>\n                            <span class=\"factor-scoring-badge\" *ngIf=\"!factor.includeInScore\">Context only</span>\n                          </div>\n                          <p>{{ factor.helperText }}</p>\n                        </div>\n                        <span class=\"accordion-header-badge accordion-header-badge--score\" [attr.data-tone]=\"qualificationStatusChipTone(factor.key)\">\n                          {{ qualificationStatusChipLabel(factor.key) }}\n                        </span>\n                      </header>\n\n                      <div class=\"qualification-factor-card__field\">\n                        <label [attr.for]=\"'lead-factor-' + factor.key\">{{ factor.customText ? 'Detail' : 'Qualification state' }}</label>\n                        <ng-container *ngIf=\"!factor.customText; else qualificationTextFactor\">\n                          <p-select\n                            [inputId]=\"'lead-factor-' + factor.key\"\n                            [name]=\"'lead-factor-' + factor.key\"\n                            [options]=\"factor.valueOptions\"\n                            optionLabel=\"label\"\n                            optionValue=\"value\"\n                            [ngModel]=\"factor.value\"\n                            (ngModelChange)=\"setCustomFactorValue(factor.key, $event); onQualificationFactorChange()\"\n                            *ngIf=\"factor.key !== 'budget' && factor.key !== 'readiness' && factor.key !== 'timeline' && factor.key !== 'problem' && factor.key !== 'economicBuyer' && factor.key !== 'icpFit'\"\n                            placeholder=\"Unknown / not assessed\"\n                            appendTo=\"body\"\n                            class=\"w-full\"\n                          >\n                            <ng-template pTemplate=\"selectedItem\" let-option>\n                              <div class=\"select-option\" *ngIf=\"option\">\n                                <i [ngClass]=\"['option-icon', 'tone-' + option.tone, option.icon]\"></i>\n                                <span>{{ option.label }}</span>\n                              </div>\n                            </ng-template>\n                            <ng-template pTemplate=\"item\" let-option>\n                              <div class=\"select-option\">\n                                <i [ngClass]=\"['option-icon', 'tone-' + option.tone, option.icon]\"></i>\n                                <span>{{ option.label }}</span>\n                              </div>\n                            </ng-template>\n                          </p-select>\n\n                          <p-select\n                            *ngIf=\"factor.key === 'budget'\"\n                            [inputId]=\"'lead-factor-' + factor.key\"\n                            name=\"budgetAvailability\"\n                            [options]=\"budgetOptions\"\n                            optionLabel=\"label\"\n                            optionValue=\"value\"\n                            [(ngModel)]=\"form.budgetAvailability\"\n                            (ngModelChange)=\"onQualificationFactorChange()\"\n                            placeholder=\"Unknown / not yet discussed\"\n                            appendTo=\"body\"\n                            class=\"w-full\"\n                          ></p-select>\n                          <p-select\n                            *ngIf=\"factor.key === 'readiness'\"\n                            [inputId]=\"'lead-factor-' + factor.key\"\n                            name=\"readinessToSpend\"\n                            [options]=\"readinessOptions\"\n                            optionLabel=\"label\"\n                            optionValue=\"value\"\n                            [(ngModel)]=\"form.readinessToSpend\"\n                            (ngModelChange)=\"onQualificationFactorChange()\"\n                            placeholder=\"Unknown / not yet discussed\"\n                            appendTo=\"body\"\n                            class=\"w-full\"\n                          ></p-select>\n                          <p-select\n                            *ngIf=\"factor.key === 'timeline'\"\n                            [inputId]=\"'lead-factor-' + factor.key\"\n                            name=\"buyingTimeline\"\n                            [options]=\"timelineOptions\"\n                            optionLabel=\"label\"\n                            optionValue=\"value\"\n                            [(ngModel)]=\"form.buyingTimeline\"\n                            (ngModelChange)=\"onQualificationFactorChange()\"\n                            placeholder=\"Unknown / not yet discussed\"\n                            appendTo=\"body\"\n                            class=\"w-full\"\n                          ></p-select>\n                          <p-select\n                            *ngIf=\"factor.key === 'problem'\"\n                            [inputId]=\"'lead-factor-' + factor.key\"\n                            name=\"problemSeverity\"\n                            [options]=\"problemOptions\"\n                            optionLabel=\"label\"\n                            optionValue=\"value\"\n                            [(ngModel)]=\"form.problemSeverity\"\n                            (ngModelChange)=\"onQualificationFactorChange()\"\n                            placeholder=\"Unknown / not yet discussed\"\n                            appendTo=\"body\"\n                            class=\"w-full\"\n                          ></p-select>\n                          <p-select\n                            *ngIf=\"factor.key === 'economicBuyer'\"\n                            [inputId]=\"'lead-factor-' + factor.key\"\n                            name=\"economicBuyer\"\n                            [options]=\"economicBuyerOptions\"\n                            optionLabel=\"label\"\n                            optionValue=\"value\"\n                            [(ngModel)]=\"form.economicBuyer\"\n                            (ngModelChange)=\"onQualificationFactorChange()\"\n                            placeholder=\"Unknown / not yet discussed\"\n                            appendTo=\"body\"\n                            class=\"w-full\"\n                          ></p-select>\n                          <p-select\n                            *ngIf=\"factor.key === 'icpFit'\"\n                            [inputId]=\"'lead-factor-' + factor.key\"\n                            name=\"icpFit\"\n                            [options]=\"icpFitOptions\"\n                            optionLabel=\"label\"\n                            optionValue=\"value\"\n                            [(ngModel)]=\"form.icpFit\"\n                            (ngModelChange)=\"onQualificationFactorChange()\"\n                            placeholder=\"Unknown / not yet discussed\"\n                            appendTo=\"body\"\n                            class=\"w-full\"\n                          ></p-select>\n                        </ng-container>\n\n                        <ng-template #qualificationTextFactor>\n                          <input\n                            pInputText\n                            [id]=\"'lead-factor-' + factor.key\"\n                            [name]=\"'lead-factor-' + factor.key\"\n                            [ngModel]=\"factor.value\"\n                            (ngModelChange)=\"setCustomFactorValue(factor.key, $event); onQualificationFactorChange()\"\n                            placeholder=\"Enter qualification detail\"\n                            class=\"w-full\"\n                          />\n                        </ng-template>\n                      </div>\n\n                      <div class=\"qualification-factor-card__evidence-row\">\n                        <div class=\"qualification-factor-card__evidence-summary\">\n                          <span class=\"qualification-factor-card__evidence-label\">Evidence</span>\n                          <strong>{{ evidenceSummaryLabel(factor.key) }}</strong>\n                        </div>\n                        <button\n                          type=\"button\"\n                          class=\"action-btn action-btn--settings qualification-factor-card__evidence-toggle\"\n                          (click)=\"toggleEvidenceExpanded(factor.key)\"\n                          [disabled]=\"isEvidenceDisabled(factor.value)\"\n                        >\n                          <span class=\"action-btn__icon\"><i class=\"pi\" [ngClass]=\"shouldShowEvidenceField(factor.key) ? 'pi-chevron-up' : 'pi-chevron-down'\"></i></span>\n                          <span>{{ shouldShowEvidenceField(factor.key) ? 'Hide evidence' : 'Add evidence' }}</span>\n                        </button>\n                      </div>\n\n                      <div class=\"qualification-factor-card__field qualification-factor-card__field--evidence\" *ngIf=\"shouldShowEvidenceField(factor.key)\">\n                        <label [attr.for]=\"'lead-factor-evidence-' + factor.key\">Evidence source</label>\n                        <p-select\n                          [inputId]=\"'lead-factor-evidence-' + factor.key\"\n                          [name]=\"'lead-factor-evidence-' + factor.key\"\n                          [options]=\"factor.evidenceOptions\"\n                          optionLabel=\"label\"\n                          optionValue=\"value\"\n                          [ngModel]=\"factor.evidence\"\n                          (ngModelChange)=\"setEvidenceValueForFactor(factor.key, $event); onQualificationFactorChange()\"\n                          appendTo=\"body\"\n                          class=\"w-full\"\n                        >\n                          <ng-template pTemplate=\"selectedItem\" let-option>\n                            <div class=\"select-option\" *ngIf=\"option\">\n                              <i [ngClass]=\"['option-icon', 'tone-' + option.tone, option.icon]\"></i>\n                              <span>{{ option.label }}</span>\n                            </div>\n                          </ng-template>\n                          <ng-template pTemplate=\"item\" let-option>\n                            <div class=\"select-option\">\n                              <i [ngClass]=\"['option-icon', 'tone-' + option.tone, option.icon]\"></i>\n                              <span>{{ option.label }}</span>\n                            </div>\n                          </ng-template>\n                        </p-select>\n                      </div>\n                    </article>\n                  </div>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel value=\"qualification-context\">\n              <p-accordion-header>\n                <h2 class=\"section-title section-title--accordion section-title--accordion-summary\">\n                  <i class=\"pi pi-file-edit\"></i>\n                  Context &amp; supporting notes\n                  <span class=\"accordion-header-summary\">\n                    <span class=\"accordion-header-badge accordion-header-badge--meta\" [attr.data-variant]=\"qualifiedNotesBadgeVariant()\">\n                      {{ qualifiedNotesBadgeLabel() }}\n                    </span>\n                  </span>\n                </h2>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-section form-section--qualification form-section--accordion-body\">\n                  <div class=\"form-grid\">\n              <div class=\"form-field full-row\">\n                <label for=\"lead-qualifiedNotes\">Context &amp; supporting notes</label>\n                <p class=\"hint-text compact\">Context only. Does not change Score.</p>\n                <textarea\n                  pTextarea\n                  id=\"lead-qualifiedNotes\"\n                  name=\"qualifiedNotes\"\n                  rows=\"5\"\n                  placeholder=\"Key context, objections, and next steps (non-scoring)\"\n                  class=\"w-full\"\n                  [(ngModel)]=\"form.qualifiedNotes\"\n                ></textarea>\n              </div>\n                  </div>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n\n            <p-accordion-panel value=\"qualification-disposition\">\n              <p-accordion-header>\n                <h2 class=\"section-title section-title--accordion section-title--accordion-summary\">\n                  <i class=\"pi pi-flag\"></i>\n                  Disposition &amp; outcome details\n                  <span class=\"accordion-header-summary\">\n                    <span class=\"accordion-header-badge accordion-header-badge--meta\" [attr.data-variant]=\"dispositionBadgeVariant()\">\n                      {{ dispositionBadgeLabel() }}\n                    </span>\n                  </span>\n                </h2>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-section form-section--qualification form-section--accordion-body\">\n                  <div class=\"form-grid\">\n              <div class=\"form-field full-row\" *ngIf=\"canRecycleLead()\">\n                <div class=\"disposition-actions\">\n                  <button\n                    type=\"button\"\n                    class=\"action-btn action-btn--refresh\"\n                    (click)=\"recycleToNurture()\"\n                  >\n                    <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n                    <span>Recycle to nurture</span>\n                  </button>\n                  <span class=\"disposition-actions__hint\">Moves the lead back into nurture and schedules a follow-up.</span>\n                </div>\n              </div>\n              <div class=\"form-field\" *ngIf=\"form.status === 'Nurture'\">\n                <label for=\"lead-nurtureFollowUp\">Nurture follow-up date <span class=\"required\">*</span></label>\n                <p-datepicker\n                  id=\"lead-nurtureFollowUp\"\n                  name=\"nurtureFollowUpAtUtc\"\n                  [(ngModel)]=\"form.nurtureFollowUpAtUtc\"\n                  appendTo=\"body\"\n                  styleClass=\"w-full\"\n                ></p-datepicker>\n              </div>\n              <div class=\"form-field full-row\" *ngIf=\"form.status === 'Disqualified'\">\n                <label for=\"lead-disqualifiedReason\">Disqualified reason <span class=\"required\">*</span></label>\n                <p-select\n                  id=\"lead-disqualifiedReason\"\n                  name=\"disqualifiedReason\"\n                  [options]=\"disqualificationReasonOptions()\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  placeholder=\"Select the primary disqualification reason\"\n                  appendTo=\"body\"\n                  styleClass=\"w-full\"\n                  [(ngModel)]=\"form.disqualifiedReason\"\n                ></p-select>\n              </div>\n              <div class=\"form-field full-row\" *ngIf=\"form.status === 'Lost'\">\n                <label for=\"lead-lossReason\">Loss reason <span class=\"required\">*</span></label>\n                <p-select\n                  id=\"lead-lossReason\"\n                  name=\"lossReason\"\n                  [options]=\"lossReasonOptions()\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  placeholder=\"Select the primary loss reason\"\n                  appendTo=\"body\"\n                  styleClass=\"w-full\"\n                  [(ngModel)]=\"form.lossReason\"\n                ></p-select>\n              </div>\n              <div class=\"form-field\" *ngIf=\"form.status === 'Lost'\">\n                <label for=\"lead-competitor\">Competitor <span class=\"required\">*</span></label>\n                <p-inputgroup>\n                  <p-inputgroup-addon class=\"icon-addon icon-addon--danger\">\n                    <i class=\"pi pi-shield\"></i>\n                  </p-inputgroup-addon>\n                  <input\n                    pInputText\n                    id=\"lead-competitor\"\n                    name=\"lossCompetitor\"\n                    placeholder=\"Competitor name\"\n                    class=\"w-full\"\n                    [(ngModel)]=\"form.lossCompetitor\"\n                  />\n                </p-inputgroup>\n              </div>\n              <div class=\"form-field full-row\" *ngIf=\"form.status === 'Lost'\">\n                <label for=\"lead-lossNotes\">Loss notes <span class=\"required\">*</span></label>\n                <textarea\n                  pTextarea\n                  id=\"lead-lossNotes\"\n                  name=\"lossNotes\"\n                  rows=\"3\"\n                  placeholder=\"Add the key evidence behind the loss decision\"\n                  class=\"w-full\"\n                  [(ngModel)]=\"form.lossNotes\"\n                ></textarea>\n              </div>\n                  </div>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n          </p-accordion>\n\n              </p-tabpanel>\n              <p-tabpanel value=\"activity\">\n          <p-accordion\n            class=\"tab-content-accordion-shell\"\n            [multiple]=\"true\"\n            [value]=\"activityAccordionOpenPanels()\"\n            (valueChange)=\"onAccordionValueChange('activity', $event)\"\n            *ngIf=\"isEditMode()\"\n          >\n              <p-accordion-panel value=\"activity-main\">\n              <p-accordion-header>\n                <h2 class=\"section-title section-title--accordion\">\n                  <i class=\"pi pi-bullseye\"></i>\n                  Next Lead Action\n                </h2>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-section cadence-section form-section--accordion-body\">\n                  <p class=\"hint-text compact\" *ngIf=\"followUpHint()\">{{ followUpHint() }}</p>\n                  <div class=\"cadence-grid\">\n                    <div class=\"form-field\">\n                      <label>Recommended channel</label>\n                      <div class=\"cadence-input cadence-input--readonly\">{{ nextLeadActionChannel() }}</div>\n                    </div>\n                    <div class=\"form-field\">\n                      <label>{{ nextLeadActionDueLabel() }}</label>\n                      <div class=\"cadence-input cadence-input--readonly\">\n                        {{ nextLeadActionDueDate() ? (nextLeadActionDueDate() | date:'MM/dd/yyyy hh:mm a') : 'No date scheduled' }}\n                      </div>\n                    </div>\n                    <div class=\"form-field full-row\">\n                      <label>Planning note</label>\n                      <div class=\"cadence-input cadence-input--readonly\">\n                        Lead follow-up planning is shown here for visibility. Use <strong>Log activity</strong> to record the actual outreach and keep the activity timeline as the source of truth.\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"cadence-actions\">\n                    <button\n                      type=\"button\"\n                      class=\"action-btn action-btn--secondary\"\n                      (click)=\"openQuickActivity('Call')\"\n                    >\n                      <span class=\"action-btn__icon\"><i class=\"pi pi-phone\"></i></span>\n                      <span>Log call</span>\n                    </button>\n                    <button\n                      type=\"button\"\n                      class=\"action-btn action-btn--secondary\"\n                      (click)=\"openQuickActivity('Email')\"\n                    >\n                      <span class=\"action-btn__icon\"><i class=\"pi pi-envelope\"></i></span>\n                      <span>Log email</span>\n                    </button>\n                    <button\n                      type=\"button\"\n                      class=\"action-btn action-btn--secondary\"\n                      (click)=\"openQuickActivity('Task')\"\n                    >\n                      <span class=\"action-btn__icon\"><i class=\"pi pi-clock\"></i></span>\n                      <span>Schedule follow-up</span>\n                    </button>\n                    <button\n                      type=\"button\"\n                      class=\"action-btn action-btn--add\"\n                      (click)=\"logActivity(form.status === 'Nurture' ? 'reengagement' : 'follow-up')\"\n                    >\n                      <span class=\"action-btn__icon\"><i class=\"pi pi-calendar-plus\"></i></span>\n                      <span>{{ nextLeadActionButtonLabel() }}</span>\n                    </button>\n                  </div>\n                  <div class=\"history-empty\">\n                    {{ lastLeadActivitySummary() }}\n                    <span class=\"history-empty__subtle\">Activities recorded from the Activities module appear below in Recent Lead Activities.</span>\n                  </div>\n\n                  <div class=\"lead-activity-timeline\">\n                    <div class=\"lead-activity-timeline__header\">\n                      <h3>\n                        <i class=\"pi pi-clock\"></i>\n                        Recent Lead Activities\n                      </h3>\n                      <button\n                        type=\"button\"\n                        class=\"action-btn action-btn--settings\"\n                        (click)=\"logActivity()\"\n                      >\n                        <span class=\"action-btn__icon\"><i class=\"pi pi-external-link\"></i></span>\n                        <span>Open Activities</span>\n                      </button>\n                    </div>\n\n                    <div class=\"history-empty\" *ngIf=\"recentLeadActivitiesLoading()\">Loading activities...</div>\n\n                    <div class=\"lead-activity-timeline__list\" *ngIf=\"!recentLeadActivitiesLoading() && recentLeadActivities().length; else noLeadActivities\">\n                      <button\n                        type=\"button\"\n                        class=\"lead-activity-timeline__item\"\n                        *ngFor=\"let activity of recentLeadActivities()\"\n                        (click)=\"openActivityRecord(activity.id)\"\n                      >\n                        <div class=\"lead-activity-timeline__icon\" [attr.data-type]=\"activity.type\">\n                          <i class=\"pi\" [ngClass]=\"activityTypeIcon(activity.type)\"></i>\n                        </div>\n                        <div class=\"lead-activity-timeline__content\">\n                          <div class=\"lead-activity-timeline__top\">\n                            <span class=\"lead-activity-timeline__subject\">{{ activity.subject }}</span>\n                            <span class=\"lead-activity-timeline__status\" [attr.data-status]=\"activity.status\">{{ activity.status }}</span>\n                          </div>\n                          <div class=\"lead-activity-timeline__meta\">\n                            <span>{{ activity.type }}</span>\n                            <span *ngIf=\"activity.ownerName\">\u2022 {{ activity.ownerName }}</span>\n                            <span *ngIf=\"activityTimelineDateLabel(activity)\">\u2022 {{ activityTimelineDateLabel(activity) | date:'medium' }}</span>\n                          </div>\n                          <div class=\"lead-activity-timeline__outcome\" *ngIf=\"activity.outcome\">{{ activity.outcome }}</div>\n                        </div>\n                      </button>\n                    </div>\n\n                    <ng-template #noLeadActivities>\n                      <div class=\"history-empty\" *ngIf=\"!recentLeadActivitiesLoading() && !hasTransferredActivitySummary()\">No related activities yet.</div>\n                      <div class=\"lead-activity-transfer-summary\" *ngIf=\"!recentLeadActivitiesLoading() && hasTransferredActivitySummary()\">\n                        <div class=\"lead-activity-transfer-summary__header\">\n                          <i class=\"pi pi-share-alt\"></i>\n                          <span>Converted lead activity summary</span>\n                        </div>\n                        <p class=\"lead-activity-transfer-summary__text\">{{ transferredActivitySummaryLabel() }}</p>\n                        <div class=\"lead-activity-transfer-summary__last\" *ngIf=\"transferredLastActivity() as last\">\n                          <span class=\"lead-activity-transfer-summary__label\">Last transferred activity</span>\n                          <strong>{{ last.subject }}</strong>\n                          <span>\n                            {{ last.type }}\n                            <ng-container *ngIf=\"activityTimelineDateLabel(last)\">\u2022 {{ activityTimelineDateLabel(last) | date:'medium' }}</ng-container>\n                          </span>\n                        </div>\n                        <button\n                          type=\"button\"\n                          class=\"action-btn action-btn--settings\"\n                          (click)=\"openConvertedActivityTimeline()\"\n                        >\n                          <span class=\"action-btn__icon\"><i class=\"pi pi-external-link\"></i></span>\n                          <span>Open transferred activities</span>\n                        </button>\n                      </div>\n                    </ng-template>\n                  </div>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n          </p-accordion>\n\n              </p-tabpanel>\n              <p-tabpanel value=\"documents\">\n          <p-accordion\n            class=\"tab-content-accordion-shell\"\n            [multiple]=\"true\"\n            [value]=\"documentsAccordionOpenPanels()\"\n            (valueChange)=\"onAccordionValueChange('documents', $event)\"\n            *ngIf=\"isEditMode()\"\n          >\n            <p-accordion-panel value=\"documents-main\">\n              <p-accordion-header>\n                <h2 class=\"section-title section-title--accordion\">\n                  <i class=\"pi pi-paperclip\"></i>\n                  Supporting documents\n                </h2>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-section supporting-documents-panel form-section--accordion-body\">\n                  <div class=\"supporting-documents-header\">\n              <div>\n                <p class=\"hint-text compact\">\n                  Add proposal files, requirements, screenshots, or supporting evidence for this lead.\n                </p>\n              </div>\n              <div class=\"supporting-documents-stats\">\n                <span class=\"docs-usage-pill\">{{ supportingDocumentUsageLabel() }}</span>\n                <span class=\"docs-remaining-pill\" *ngIf=\"!isSupportingDocumentLimitReached()\">\n                  {{ supportingDocumentRemainingCount() }} remaining\n                </span>\n                <span class=\"docs-limit-pill\" *ngIf=\"isSupportingDocumentLimitReached()\">Limit reached</span>\n              </div>\n                  </div>\n\n                  <div class=\"supporting-documents-uploader\">\n              <p-fileUpload\n                mode=\"basic\"\n                chooseLabel=\"Upload file\"\n                [customUpload]=\"true\"\n                [auto]=\"true\"\n                styleClass=\"lead-doc-upload\"\n                [disabled]=\"attachmentUploading() || isSupportingDocumentLimitReached()\"\n                (uploadHandler)=\"onAttachmentUpload($event)\"\n              ></p-fileUpload>\n              <div class=\"docs-policy-note\">\n                Allowed: {{ supportingDocumentAllowedExtensions() }} \u00B7 Max {{ supportingDocumentMaxFileSizeMb() }} MB/file\n              </div>\n              <div class=\"field-error\" *ngIf=\"attachmentUploadError()\">{{ attachmentUploadError() }}</div>\n                  </div>\n\n                  <div class=\"supporting-documents-list\" *ngIf=\"!attachmentsLoading(); else docsLoadingTpl\">\n              <p-table [value]=\"attachments()\" [paginator]=\"false\" [rows]=\"10\" styleClass=\"compact-table docs-table\">\n                <ng-template pTemplate=\"header\">\n                  <tr>\n                    <th>File</th>\n                    <th>Type</th>\n                    <th>Uploaded by</th>\n                    <th>Size</th>\n                    <th>Date</th>\n                    <th></th>\n                  </tr>\n                </ng-template>\n                <ng-template pTemplate=\"body\" let-row>\n                  <tr>\n                    <td class=\"docs-file-name\">{{ row.fileName }}</td>\n                    <td>{{ row.contentType || '\u2014' }}</td>\n                    <td>{{ row.uploadedBy || '\u2014' }}</td>\n                    <td>{{ attachmentSizeLabel(row.size) }}</td>\n                    <td>{{ row.createdAtUtc | date:'MMM d, yyyy \u00B7 h:mm a' }}</td>\n                    <td class=\"table-actions\">\n                      <button\n                        type=\"button\"\n                        class=\"row-action-btn row-action-btn--delete\"\n                        title=\"Delete\"\n                        (click)=\"deleteAttachment(row)\"\n                        [disabled]=\"attachmentDeleting(row.id)\"\n                      >\n                        <i class=\"pi pi-trash\"></i>\n                      </button>\n                      <button\n                        type=\"button\"\n                        class=\"row-action-btn row-action-btn--view\"\n                        title=\"Download\"\n                        (click)=\"downloadAttachment(row)\"\n                        [disabled]=\"attachmentDeleting(row.id)\"\n                      >\n                        <i class=\"pi pi-download\"></i>\n                      </button>\n                    </td>\n                  </tr>\n                </ng-template>\n              </p-table>\n              <div class=\"history-empty\" *ngIf=\"!attachments().length\">No supporting documents uploaded yet.</div>\n                  </div>\n                  <ng-template #docsLoadingTpl>\n                    <div class=\"history-empty\">Loading supporting documents...</div>\n                  </ng-template>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n          </p-accordion>\n              </p-tabpanel>\n              <p-tabpanel value=\"history\">\n          <p-accordion\n            class=\"tab-content-accordion-shell\"\n            [multiple]=\"true\"\n            [value]=\"historyAccordionOpenPanels()\"\n            (valueChange)=\"onAccordionValueChange('history', $event)\"\n            *ngIf=\"isEditMode()\"\n          >\n            <p-accordion-panel value=\"history-main\">\n              <p-accordion-header>\n                <h2 class=\"section-title section-title--accordion\">\n                  <i class=\"pi pi-history\"></i>\n                  Status history\n                </h2>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-section form-section--accordion-body\">\n                  <div class=\"history-list history-list--merged\" *ngIf=\"mergedHistoryItems().length; else noHistory\">\n              <div class=\"history-item history-item--merged\" *ngFor=\"let entry of mergedHistoryItems()\">\n                <div class=\"history-item__icon\" [attr.data-tone]=\"entry.tone\">\n                  <i class=\"pi\" [ngClass]=\"entry.icon\"></i>\n                </div>\n                <div class=\"history-item__content\">\n                  <div class=\"history-header\">\n                    <span class=\"history-item__title\">{{ entry.title }}</span>\n                    <span class=\"history-time\">{{ entry.occurredAtUtc | date:'medium' }}</span>\n                  </div>\n                  <div class=\"history-meta\">\n                    <span>{{ entry.subtitle }}</span>\n                  </div>\n                  <div class=\"history-notes\" *ngIf=\"entry.detail\">{{ entry.detail }}</div>\n                </div>\n              </div>\n                  </div>\n                  <ng-template #noHistory>\n                    <div class=\"history-empty\">No timeline events recorded yet.</div>\n                  </ng-template>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n            <p-accordion-panel value=\"history-score-audit\">\n              <p-accordion-header>\n                <h2 class=\"section-title section-title--accordion\">\n                  <i class=\"pi pi-chart-line\"></i>\n                  Score change audit\n                </h2>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-section form-section--accordion-body\">\n                  <div class=\"history-list\" *ngIf=\"scoreAuditEvents().length; else noScoreAudit\">\n                    <div class=\"history-item\" *ngFor=\"let entry of scoreAuditEvents()\">\n                      <div class=\"history-header\">\n                        <p-tag [value]=\"entry.field || entry.action\"></p-tag>\n                        <span class=\"history-time\">{{ entry.createdAtUtc | date:'medium' }}</span>\n                      </div>\n                      <div class=\"history-meta\">\n                        <span>Changed by {{ entry.changedByName || 'system' }}</span>\n                      </div>\n                      <div class=\"history-notes\" *ngIf=\"entry.oldValue || entry.newValue\">\n                        {{ (entry.oldValue || 'empty') }} \u2192 {{ (entry.newValue || 'empty') }}\n                      </div>\n                    </div>\n                  </div>\n                  <ng-template #noScoreAudit>\n                    <div class=\"history-empty\">No score changes recorded yet.</div>\n                  </ng-template>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n            <p-accordion-panel value=\"history-related-emails\">\n              <p-accordion-header>\n                <h2 class=\"section-title section-title--accordion\">\n                  <i class=\"pi pi-envelope\"></i>\n                  Related emails\n                </h2>\n              </p-accordion-header>\n              <p-accordion-content>\n                <section class=\"form-section form-section--accordion-body\">\n                  <div class=\"history-meta\">\n                    <span>Conversation Score {{ conversationContributionTotal() }} / 100</span>\n                    <span>Sentiment {{ conversationSentimentDisplay() }}</span>\n                    <span *ngIf=\"conversationAiSemanticIntent()\">Intent {{ conversationAiSemanticIntent() }}</span>\n                  </div>\n                  <div class=\"history-notes\">\n                    {{ conversationSummaryDisplay() }}\n                  </div>\n\n                  <div class=\"history-meta\" *ngIf=\"emailEngagementStats() as stats\">\n                    <span>Total {{ stats.total }} \u00B7 Open rate {{ stats.openRate }}%</span>\n                    <span *ngIf=\"stats.lastEmailDate\">Last email {{ stats.lastEmailDate | date:'medium' }}</span>\n                  </div>\n\n                  <div class=\"history-empty\" *ngIf=\"leadEmailsLoading()\">Loading related emails...</div>\n\n                  <ng-container *ngIf=\"!leadEmailsLoading()\">\n                    <div class=\"history-list\" *ngIf=\"leadEmails().length; else noRelatedEmails\">\n                      <div class=\"history-item\" *ngFor=\"let email of leadEmailsToDisplay(); trackBy: trackEmailById\">\n                        <div class=\"history-header\">\n                          <button\n                            type=\"button\"\n                            class=\"action-btn action-btn--settings\"\n                            (click)=\"toggleLeadEmailDetails(email.id)\"\n                          >\n                            <span class=\"action-btn__icon\">\n                              <i class=\"pi\" [ngClass]=\"isLeadEmailExpanded(email.id) ? 'pi-chevron-down' : 'pi-chevron-right'\"></i>\n                            </span>\n                            <span>{{ email.subject }}</span>\n                          </button>\n                        </div>\n                        <div class=\"history-meta\" *ngIf=\"isLeadEmailExpanded(email.id)\">\n                          <p-tag [value]=\"email.status\"></p-tag>\n                          <span class=\"history-time\">{{ (email.sentAtUtc || email.createdAtUtc) | date:'medium' }}</span>\n                          <span>\n                            {{ emailDirection(email) === 'inbound' ? 'Inbound' : 'Outbound' }}\n                            \u00B7 {{ email.toName || email.toEmail }}\n                          </span>\n                        </div>\n                      </div>\n                    </div>\n\n                    <button\n                      type=\"button\"\n                      class=\"action-btn action-btn--settings\"\n                      *ngIf=\"leadEmails().length > 5\"\n                      (click)=\"toggleEmailsExpanded()\"\n                    >\n                      <span class=\"action-btn__icon\"><i class=\"pi\" [ngClass]=\"leadEmailsExpanded() ? 'pi-angle-up' : 'pi-angle-down'\"></i></span>\n                      <span>{{ leadEmailsExpanded() ? 'Show less' : 'Show all related emails' }}</span>\n                    </button>\n                  </ng-container>\n\n                  <ng-template #noRelatedEmails>\n                    <div class=\"history-empty\">No emails linked to this lead yet.</div>\n                  </ng-template>\n                </section>\n              </p-accordion-content>\n            </p-accordion-panel>\n          </p-accordion>\n\n              </p-tabpanel>\n            </p-tabpanels>\n          </p-tabs>\n\n          <footer class=\"form-actions\">\n            <button type=\"button\" class=\"lead-btn lead-btn--secondary\" (click)=\"router.navigate(['/app/leads'])\">\n              <i class=\"pi pi-times\"></i>\n              <span>Cancel</span>\n            </button>\n            <button\n              type=\"button\"\n              class=\"lead-btn lead-btn--primary\"\n              [disabled]=\"saving() || draftSaving() || isReadOnlyDueToEditing()\"\n              (click)=\"onSave()\"\n            >\n              <i class=\"pi pi-check\"></i>\n              <span>{{ primarySaveLabel() }}</span>\n            </button>\n            <p-splitbutton\n              [label]=\"draftButtonLabel()\"\n              icon=\"pi pi-bookmark\"\n              styleClass=\"crm-draft-splitbutton\"\n              buttonStyleClass=\"lead-btn lead-btn--secondary\"\n              menuButtonStyleClass=\"lead-btn lead-btn--secondary\"\n              appendTo=\"body\"\n              [disabled]=\"saving() || draftSaving() || isReadOnlyDueToEditing()\"\n              [model]=\"draftSplitButtonItems()\"\n              (onClick)=\"saveDraft()\"\n            ></p-splitbutton>\n          </footer>\n          </fieldset>\n        </form>\n      </main>\n    </div>\n  \n", styles: ["\n    :host {\n      display: block;\n      width: 100%;\n      /* Premium color palette */\n      --apple-blue: 0, 122, 255;\n      --apple-purple: 175, 82, 222;\n      --apple-pink: 255, 45, 85;\n      --apple-teal: 90, 200, 250;\n      --apple-green: 52, 199, 89;\n      --apple-gray-1: 142, 142, 147;\n      --apple-gray-2: 174, 174, 178;\n      --apple-gray-3: 199, 199, 204;\n      --apple-gray-4: 209, 209, 214;\n      --apple-gray-5: 229, 229, 234;\n      --apple-gray-6: 242, 242, 247;\n      --apple-label: 0, 0, 0;\n      --apple-secondary: 60, 60, 67;\n      --apple-tertiary: 60, 60, 67;\n      --apple-fill: 120, 120, 128;\n      \n      /* Gradient border colors for hover */\n      --gradient-start: rgba(var(--apple-blue), 0.6);\n      --gradient-mid: rgba(var(--apple-purple), 0.4);\n      --gradient-end: rgba(var(--apple-teal), 0.5);\n    }\n\n    .lead-form-page {\n      min-height: 100vh;\n      width: 100%;\n      position: relative;\n      /* Soft mesh gradient background */\n      background: \n        radial-gradient(ellipse 80% 50% at 50% -20%, rgba(var(--apple-blue), 0.08) 0%, transparent 50%),\n        radial-gradient(ellipse 60% 40% at 90% 10%, rgba(var(--apple-purple), 0.06) 0%, transparent 40%),\n        radial-gradient(ellipse 50% 30% at 10% 60%, rgba(var(--apple-teal), 0.05) 0%, transparent 40%),\n        linear-gradient(180deg, \n          rgba(var(--apple-gray-6), 0.95) 0%, \n          rgba(255, 255, 255, 1) 40%,\n          rgba(var(--apple-gray-6), 0.3) 100%);\n      padding-bottom: 5rem;\n    }\n\n    /* Animated ambient orbs */\n    .lead-form-page::before {\n      content: '';\n      position: fixed;\n      top: -15%;\n      left: -5%;\n      width: 50%;\n      height: 50%;\n      background: radial-gradient(\n        circle,\n        rgba(var(--apple-blue), 0.08) 0%,\n        rgba(var(--apple-blue), 0.03) 30%,\n        transparent 60%\n      );\n      pointer-events: none;\n      z-index: 0;\n      animation: float-orb-1 18s ease-in-out infinite;\n    }\n\n    .lead-form-page::after {\n      content: '';\n      position: fixed;\n      bottom: -20%;\n      right: -10%;\n      width: 60%;\n      height: 60%;\n      background: radial-gradient(\n        circle,\n        rgba(var(--apple-purple), 0.07) 0%,\n        rgba(var(--apple-teal), 0.03) 35%,\n        transparent 60%\n      );\n      pointer-events: none;\n      z-index: 0;\n      animation: float-orb-2 22s ease-in-out infinite;\n    }\n\n    @keyframes float-orb-1 {\n      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }\n      25% { transform: translate(30px, -20px) scale(1.05); opacity: 1; }\n      50% { transform: translate(15px, -40px) scale(1.02); opacity: 0.9; }\n      75% { transform: translate(-10px, -15px) scale(1.08); opacity: 1; }\n    }\n\n    @keyframes float-orb-2 {\n      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }\n      33% { transform: translate(-25px, 25px) scale(1.06); opacity: 1; }\n      66% { transform: translate(15px, 10px) scale(0.98); opacity: 0.85; }\n    }\n\n    .page-header {\n      position: relative;\n      width: 100%;\n      top: auto;\n      z-index: 100;\n      /* Premium frosted glass */\n      background: rgba(255, 255, 255, 0.65);\n      backdrop-filter: blur(40px) saturate(200%);\n      -webkit-backdrop-filter: blur(40px) saturate(200%);\n      /* Subtle gradient border */\n      border-bottom: 1px solid transparent;\n      background-image: \n        linear-gradient(rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.65)),\n        linear-gradient(90deg, rgba(var(--apple-gray-4), 0.3), rgba(var(--apple-gray-3), 0.2), rgba(var(--apple-gray-4), 0.3));\n      background-origin: border-box;\n      background-clip: padding-box, border-box;\n      padding: 1rem 1.5rem;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);\n      overflow-y: auto;\n      overscroll-behavior: contain;\n      scrollbar-gutter: stable;\n    }\n\n    .header-content {\n      width: 100%;\n      max-width: none;\n      margin: 0 auto;\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .back-link {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.375rem;\n      padding: 0.375rem 0.625rem 0.375rem 0.375rem;\n      margin-left: -0.375rem;\n      border: none;\n      background: transparent;\n      color: rgba(var(--apple-blue), 1);\n      font-size: 0.9375rem;\n      font-weight: 500;\n      letter-spacing: -0.01em;\n      border-radius: 8px;\n      cursor: pointer;\n      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    }\n\n    .back-link:hover {\n      background: rgba(var(--apple-blue), 0.1);\n      transform: translateX(-2px);\n    }\n\n    .back-link:active {\n      background: rgba(var(--apple-blue), 0.15);\n      transform: scale(0.97);\n    }\n\n    .back-link i {\n      font-size: 1rem;\n      transition: transform 0.2s ease;\n    }\n\n    .back-link:hover i {\n      transform: translateX(-3px);\n    }\n\n    .header-row {\n      display: flex;\n      flex-direction: column;\n      align-items: stretch;\n      gap: 0.75rem;\n    }\n\n    .header-title {\n      flex-shrink: 0;\n      max-width: 34rem;\n    }\n\n    .header-title h1 {\n      margin: 0 0 0.1rem;\n    }\n\n    .header-title p {\n      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n      color: #6b7280;\n      font-size: 0.92rem;\n      font-weight: 400;\n      max-width: 500px;\n      line-height: 1.45;\n      margin: 0;\n    }\n\n    .lead-record-number {\n      display: inline-flex;\n      align-items: baseline;\n      gap: 0.45rem;\n      margin-top: 0.55rem;\n      padding: 0.4rem 0.7rem;\n      border-radius: 999px;\n      background: rgba(var(--apple-blue), 0.08);\n      border: 1px solid rgba(var(--apple-blue), 0.16);\n      color: rgba(var(--apple-blue), 0.96);\n      width: fit-content;\n    }\n\n    .lead-record-number__label {\n      font-size: 0.74rem;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: rgba(var(--apple-secondary), 0.72);\n    }\n\n    .lead-header-progress {\n      --lead-header-score-color: #2563eb;\n      display: flex;\n      align-items: center;\n      gap: 0.7rem;\n      margin-top: 0.65rem;\n      padding: 0.55rem 0.7rem;\n      border-radius: 16px;\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.72));\n      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n      max-width: 29rem;\n    }\n\n    @media (min-width: 901px) {\n      .lead-header-progress {\n        display: none;\n      }\n    }\n\n    .lead-header-progress__dial {\n      flex: 0 0 auto;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 78px;\n      height: 78px;\n      border-radius: 16px;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.76), rgba(241, 245, 249, 0.7));\n      border: 1px solid rgba(148, 163, 184, 0.14);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.54),\n        0 10px 18px rgba(15, 23, 42, 0.05);\n    }\n\n    :host ::ng-deep .lead-header-progress__knob {\n      width: 72px;\n    }\n\n    :host ::ng-deep .lead-header-progress__knob .p-knob-text {\n      font-size: 0.86rem;\n      font-weight: 800;\n      fill: #1e293b;\n    }\n\n    .lead-header-progress__content {\n      min-width: 0;\n      display: grid;\n      gap: 0.22rem;\n      align-content: center;\n    }\n\n    .lead-header-progress__eyebrow {\n      font-size: 0.64rem;\n      font-weight: 800;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n    }\n\n    .lead-header-progress__meta {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n    }\n\n    .lead-header-progress__status,\n    .lead-header-progress__step {\n      display: inline-flex;\n      align-items: center;\n      min-height: 1.55rem;\n      padding: 0.14rem 0.45rem;\n      border-radius: 999px;\n      font-size: 0.7rem;\n      font-weight: 700;\n      border: 1px solid rgba(148, 163, 184, 0.16);\n      background: rgba(255, 255, 255, 0.72);\n      color: #1e293b;\n    }\n\n    .lead-header-progress__status {\n      color: #1d4ed8;\n      background: rgba(219, 234, 254, 0.82);\n      border-color: rgba(96, 165, 250, 0.28);\n    }\n\n    .lead-header-progress__copy {\n      margin: 0;\n      color: #475569;\n      font-size: 0.76rem;\n      line-height: 1.35;\n      max-width: 22rem;\n    }\n\n    .sla-strip {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n.sla-strip--inline {\n  margin: 0 0 1rem;\n}\n\n.sla-strip--sticky {\n  justify-content: flex-end;\n  margin-bottom: 0.45rem;\n}\n\n.sla-pill {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.5rem;\n      padding: 0.5rem 0.75rem;\n      border-radius: 999px;\n      font-weight: 600;\n      font-size: 0.875rem;\n      border: 1px solid rgba(148, 163, 184, 0.4);\n      background: rgba(255, 255, 255, 0.8);\n      color: #475569;\n\n      i {\n        font-size: 0.95rem;\n      }\n    }\n\n    .sla-pill.overdue {\n      background: rgba(239, 68, 68, 0.12);\n      color: #b91c1c;\n      border-color: rgba(239, 68, 68, 0.3);\n    }\n\n    .sla-pill.due {\n      background: rgba(245, 158, 11, 0.12);\n      color: #b45309;\n      border-color: rgba(245, 158, 11, 0.3);\n    }\n\n    .sla-pill.done {\n      background: rgba(34, 197, 94, 0.12);\n      color: #15803d;\n      border-color: rgba(34, 197, 94, 0.3);\n    }\n\n    .sla-pill.pending {\n      background: rgba(148, 163, 184, 0.12);\n      color: #475569;\n      border-color: rgba(148, 163, 184, 0.3);\n    }\n\n    .sla-label {\n      white-space: nowrap;\n    }\n\n    .sla-time {\n      color: #334155;\n      font-weight: 500;\n    }\n\n    .sla-meta {\n      font-size: 0.85rem;\n      color: #64748b;\n    }\n\n    .header-top {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 1rem;\n      flex-wrap: wrap;\n    }\n\n    .form-container {\n      position: relative;\n      z-index: 1;\n      width: 100%;\n      max-width: none;\n      margin: 0 auto;\n      padding: 1rem;\n    }\n\n.lead-status-dialog {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.lead-status-dialog__body {\n  color: #475569;\n  font-size: 0.95rem;\n  line-height: 1.55;\n}\n\n.lead-status-dialog__body--stacked {\n  display: flex;\n  flex-direction: column;\n  gap: 0.85rem;\n}\n\n.lead-status-dialog__actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n\n.lead-sticky-meta {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n      margin-top: 0.35rem;\n    }\n\n    .status-chip,\n    .score-chip,\n    .confidence-chip,\n    .truth-chip,\n    .assumption-chip {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.3rem 0.65rem;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      font-weight: 600;\n      background: rgba(99, 102, 241, 0.12);\n      color: #4338ca;\n    }\n\n    .score-chip {\n      background: rgba(15, 118, 110, 0.12);\n      color: #0f766e;\n    }\n\n    .score-stack {\n      display: inline-flex;\n      flex-direction: column;\n      gap: 0.2rem;\n    }\n\n    .score-primary {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.34rem 0.72rem;\n      border-radius: 10px;\n      font-size: 0.82rem;\n      font-weight: 700;\n      color: #0f766e;\n      background: linear-gradient(140deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.14));\n      border: 1px solid rgba(13, 148, 136, 0.28);\n      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);\n    }\n\n    .score-subtitles {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.35rem;\n      flex-wrap: wrap;\n    }\n\n    .score-subtitle {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.2rem 0.5rem;\n      border-radius: 8px;\n      font-size: 0.72rem;\n      font-weight: 600;\n      color: #0e7490;\n      background: rgba(14, 116, 144, 0.1);\n      border: 1px solid rgba(14, 116, 144, 0.16);\n    }\n\n    .confidence-chip {\n      background: rgba(14, 116, 144, 0.12);\n      color: #0e7490;\n    }\n\n    .truth-chip {\n      background: rgba(16, 185, 129, 0.12);\n      color: #047857;\n    }\n\n    .assumption-chip {\n      background: rgba(234, 88, 12, 0.12);\n      color: #c2410c;\n    }\n\n    .field-error {\n      margin: 0.35rem 0 0;\n      font-size: 0.75rem;\n      color: #b91c1c;\n    }\n\n    .field-hint {\n      margin: 0.35rem 0 0;\n      font-size: 0.75rem;\n      color: #64748b;\n    }\n\n    .lead-tabs-shell {\n      margin-bottom: 0.55rem;\n      padding: 0;\n      border-radius: 16px;\n      background: transparent;\n      border: none;\n      box-shadow: none;\n    }\n\n    :host ::ng-deep .lead-tabs .p-tablist {\n      display: flex;\n      gap: 0;\n      flex-wrap: nowrap;\n      padding: 0;\n      border-radius: 16px;\n      background: linear-gradient(180deg, rgba(23, 50, 93, 0.84), rgba(16, 37, 71, 0.9));\n      border: 1px solid rgba(148, 163, 184, 0.22);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.12),\n        0 8px 18px rgba(15, 23, 42, 0.08);\n      overflow: hidden;\n      position: relative;\n      backdrop-filter: blur(10px) saturate(125%);\n      -webkit-backdrop-filter: blur(10px) saturate(125%);\n    }\n\n    :host ::ng-deep .lead-tabs .p-tablist-tab-list {\n      border: none !important;\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab {\n      flex: 1 1 0;\n      min-width: 0;\n      min-height: 56px;\n      border: none;\n      border-radius: 0;\n      padding: 0.35rem 0.8rem 0.4rem;\n      font-size: 0.86rem;\n      font-weight: 700;\n      color: rgba(255, 255, 255, 0.96);\n      opacity: 1 !important;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      text-align: center;\n      line-height: 1.18;\n      cursor: pointer;\n      transition: transform 0.18s ease, filter 0.18s ease, box-shadow 0.18s ease;\n      position: relative;\n      overflow: visible;\n      z-index: 1;\n      text-shadow: 0 1px 2px rgba(15, 23, 42, 0.28);\n      background:\n        linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),\n        var(--lead-tab-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n      clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%, 14px 50%);\n      margin-right: -20px;\n      filter: brightness(1) saturate(1);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.1),\n        inset 0 -1px 0 rgba(255, 255, 255, 0.08);\n      backdrop-filter: blur(8px) saturate(120%);\n      -webkit-backdrop-filter: blur(8px) saturate(120%);\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab::before {\n      content: '';\n      position: absolute;\n      inset: 0 0 auto 0;\n      height: 45%;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));\n      opacity: 0.8;\n      pointer-events: none;\n      clip-path: inherit;\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab::after {\n      content: '';\n      position: absolute;\n      left: 6%;\n      right: 8%;\n      bottom: 4px;\n      height: 2px;\n      border-radius: 999px;\n      background: linear-gradient(90deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.12));\n      opacity: 0.45;\n      pointer-events: none;\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab:first-child {\n      clip-path: polygon(0 0, calc(100% - 22px) 0, 100% 50%, calc(100% - 22px) 100%, 0 100%);\n      margin-left: 0;\n      border-top-left-radius: 12px;\n      border-bottom-left-radius: 12px;\n      z-index: 2;\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab:last-child {\n      clip-path: polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%);\n      margin-right: 0;\n      border-top-right-radius: 12px;\n      border-bottom-right-radius: 12px;\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab:nth-child(1) {\n      --lead-tab-bg: linear-gradient(135deg, #3f8dff 0%, #2364da 100%);\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab:nth-child(2) {\n      --lead-tab-bg: linear-gradient(135deg, #36c3df 0%, #1497c0 100%);\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab:nth-child(3) {\n      --lead-tab-bg: linear-gradient(135deg, #ffaf47 0%, #f07f10 100%);\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab:nth-child(4) {\n      --lead-tab-bg: linear-gradient(135deg, #8b6bff 0%, #6948e4 100%);\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab:nth-child(5) {\n      --lead-tab-bg: linear-gradient(135deg, #6f84aa 0%, #556f94 100%);\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab.p-tab-active,\n    :host ::ng-deep .lead-tabs .p-tab[aria-selected='true'],\n    :host ::ng-deep .lead-tabs .p-tab[data-p-active='true'] {\n      z-index: 4;\n      opacity: 1;\n      filter: brightness(1.05) saturate(1.1);\n      background:\n        linear-gradient(180deg, rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.12)),\n        radial-gradient(circle at 50% 16%, rgba(255, 255, 255, 0.28), transparent 58%),\n        var(--lead-tab-bg, linear-gradient(135deg, #3b82f6, #1d4ed8));\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.32),\n        inset 0 -1px 0 rgba(255, 255, 255, 0.2),\n        0 0 0 1px rgba(255, 255, 255, 0.28),\n        0 0 0 3px rgba(255, 255, 255, 0.12),\n        0 10px 22px rgba(15, 23, 42, 0.22),\n        0 0 32px rgba(125, 211, 252, 0.3);\n      transform: translateY(-2px) scale(1.02);\n      animation: lead-tab-breathe 1.8s ease-in-out infinite;\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab.p-tab-active .lead-tab-label,\n    :host ::ng-deep .lead-tabs .p-tab[aria-selected='true'] .lead-tab-label,\n    :host ::ng-deep .lead-tabs .p-tab[data-p-active='true'] .lead-tab-label {\n      color: #ffffff;\n      text-shadow: 0 1px 1px rgba(15, 23, 42, 0.18), 0 0 12px rgba(255, 255, 255, 0.16);\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab.p-tab-active::after,\n    :host ::ng-deep .lead-tabs .p-tab[aria-selected='true']::after,\n    :host ::ng-deep .lead-tabs .p-tab[data-p-active='true']::after {\n      height: 3px;\n      bottom: 3px;\n      left: 8%;\n      right: 10%;\n      opacity: 1;\n      background: linear-gradient(\n        90deg,\n        rgba(255, 255, 255, 0.16) 0%,\n        rgba(239, 68, 68, 0.95) 12%,\n        rgba(245, 158, 11, 0.95) 26%,\n        rgba(250, 204, 21, 0.95) 38%,\n        rgba(34, 197, 94, 0.95) 50%,\n        rgba(59, 130, 246, 0.98) 64%,\n        rgba(139, 92, 246, 0.98) 78%,\n        rgba(236, 72, 153, 0.95) 90%,\n        rgba(255, 255, 255, 0.18) 100%\n      );\n      box-shadow:\n        0 0 6px rgba(255, 255, 255, 0.35),\n        0 0 14px rgba(59, 130, 246, 0.28),\n        0 0 20px rgba(236, 72, 153, 0.2),\n        0 1px 0 rgba(15, 23, 42, 0.12);\n      background-size: 320% 100%;\n      animation: lead-tab-active-strip 3.4s linear infinite;\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab.p-tab-active::before,\n    :host ::ng-deep .lead-tabs .p-tab[aria-selected='true']::before,\n    :host ::ng-deep .lead-tabs .p-tab[data-p-active='true']::before {\n      opacity: 0.95;\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab:not(.p-tab-active):not([aria-selected='true']):not([data-p-active='true']) {\n      opacity: 1;\n      transition: opacity 250ms, transform 250ms, filter 250ms;\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab:hover:not(.p-disabled):not(.p-tab-active):not([aria-selected='true']):not([data-p-active='true']) {\n      opacity: 1;\n      transform: translateY(-1px);\n      filter: brightness(1.05) saturate(1.05);\n      z-index: 6;\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab:focus-visible {\n      outline: none;\n      z-index: 6;\n      box-shadow:\n        0 0 0 2px rgba(255, 255, 255, 0.28),\n        0 0 0 5px rgba(59, 130, 246, 0.2);\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab.p-disabled {\n      cursor: not-allowed;\n      opacity: 0.62;\n      filter: grayscale(0.08) saturate(0.65);\n    }\n\n    .tab-badge {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      position: absolute;\n      top: 8px;\n      right: 14px;\n      min-width: 18px;\n      height: 18px;\n      padding: 0 0.35rem;\n      border-radius: 999px;\n      font-size: 0.62rem;\n      font-weight: 700;\n      background: rgba(255, 255, 255, 0.22);\n      color: #fff;\n      border: 1px solid rgba(255, 255, 255, 0.28);\n      text-shadow: none;\n    }\n\n    .tab-badge.warn {\n      background: rgba(255, 255, 255, 0.24);\n      color: #fff;\n    }\n\n    .tab-badge.danger {\n      background: linear-gradient(180deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.92));\n      color: #fff;\n      border-color: rgba(255, 255, 255, 0.22);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.2),\n        0 6px 12px rgba(185, 28, 28, 0.22);\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab.p-tab-active .tab-badge,\n    :host ::ng-deep .lead-tabs .p-tab.p-tab-active .tab-badge.warn {\n      background: rgba(255, 255, 255, 0.34);\n      border-color: rgba(255, 255, 255, 0.4);\n      box-shadow: 0 0 10px rgba(255, 255, 255, 0.14);\n    }\n\n    :host ::ng-deep .lead-tabs .p-tab.p-tab-active .tab-badge.danger {\n      color: #fff;\n      text-shadow: 0 1px 1px rgba(127, 29, 29, 0.35);\n      background: linear-gradient(180deg, rgba(239, 68, 68, 1), rgba(220, 38, 38, 0.98));\n      border-color: rgba(255, 255, 255, 0.52);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.3),\n        0 0 0 1px rgba(127, 29, 29, 0.1),\n        0 0 14px rgba(239, 68, 68, 0.34);\n    }\n\n    .lead-tab-label {\n      display: inline-block;\n      max-width: 100%;\n      text-wrap: balance;\n      white-space: normal;\n      font-size: 0.88rem;\n      font-weight: 700;\n      letter-spacing: 0.005em;\n    }\n\n    @keyframes lead-tab-breathe {\n      0%, 100% {\n        box-shadow:\n          inset 0 1px 0 rgba(255, 255, 255, 0.24),\n          inset 0 -1px 0 rgba(255, 255, 255, 0.16),\n          0 0 0 1px rgba(255, 255, 255, 0.2),\n          0 0 0 3px rgba(255, 255, 255, 0.08),\n          0 10px 18px rgba(15, 23, 42, 0.16),\n          0 0 20px rgba(125, 211, 252, 0.18);\n      }\n      50% {\n        box-shadow:\n          inset 0 1px 0 rgba(255, 255, 255, 0.28),\n          inset 0 -1px 0 rgba(255, 255, 255, 0.18),\n          0 0 0 1px rgba(255, 255, 255, 0.28),\n          0 0 0 4px rgba(255, 255, 255, 0.1),\n          0 12px 22px rgba(15, 23, 42, 0.18),\n          0 0 30px rgba(255, 255, 255, 0.16),\n          0 0 34px rgba(125, 211, 252, 0.24);\n      }\n    }\n\n    @keyframes lead-tab-active-strip {\n      0%, 100% {\n        background-position: 0% 50%;\n        opacity: 0.88;\n        transform: scaleX(0.985);\n      }\n      50% {\n        background-position: 100% 50%;\n        opacity: 1;\n        transform: scaleX(1);\n      }\n    }\n\n    @media (prefers-reduced-motion: reduce) {\n      :host ::ng-deep .lead-tabs .p-tab.p-tab-active {\n        animation: none;\n      }\n\n      :host ::ng-deep .lead-tabs .p-tab.p-tab-active::after {\n        animation: none;\n      }\n    }\n\n    @media (max-width: 980px) {\n      :host ::ng-deep .lead-tabs .p-tablist {\n        overflow-x: auto;\n        padding-bottom: 0.35rem;\n        scrollbar-width: thin;\n      }\n\n      :host ::ng-deep .lead-tabs .p-tab {\n        flex: 0 0 220px;\n        min-height: 56px;\n        font-size: 0.84rem;\n        margin-right: -18px;\n      }\n    }\n\n    @media (max-width: 768px) {\n      :host ::ng-deep .lead-tabs .p-tablist {\n        flex-wrap: wrap;\n        gap: 0.45rem;\n        overflow: visible;\n        padding: 0.45rem;\n        background:\n          linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(15, 23, 42, 0.08)),\n          linear-gradient(135deg, rgba(148, 163, 184, 0.18), rgba(59, 130, 246, 0.08));\n        border: 1px solid rgba(148, 163, 184, 0.28);\n        box-shadow:\n          inset 0 1px 0 rgba(255, 255, 255, 0.22),\n          0 10px 26px rgba(15, 23, 42, 0.08);\n      }\n\n      :host ::ng-deep .lead-tabs .p-tab {\n        flex: 1 1 calc(50% - 0.25rem);\n        min-width: 140px;\n        min-height: 52px;\n        margin-right: 0;\n        border-radius: 12px;\n        clip-path: none;\n        padding: 0.5rem 0.65rem;\n      }\n\n      :host ::ng-deep .lead-tabs .p-tab.p-tab-active {\n        transform: none;\n      }\n\n      :host ::ng-deep .lead-tabs .p-tab::before,\n      :host ::ng-deep .lead-tabs .p-tab::after {\n        clip-path: none;\n      }\n\n      .tab-badge {\n        top: 6px;\n        right: 8px;\n      }\n    }\n\n    .lead-form {\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .overview-accordion-shell,\n    .tab-content-accordion-shell {\n      display: block;\n      margin-bottom: 0.15rem;\n    }\n\n    .qualification-summary-card {\n      display: grid;\n      gap: 1rem;\n      margin-bottom: 0.85rem;\n      padding: 1.05rem 1.15rem 1.15rem;\n      position: relative;\n      border-radius: 20px;\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      background:\n        radial-gradient(circle at 8% 12%, rgba(56, 189, 248, 0.22), transparent 42%),\n        radial-gradient(circle at 88% 10%, rgba(139, 92, 246, 0.18), transparent 48%),\n        radial-gradient(circle at 58% 92%, rgba(244, 114, 182, 0.12), transparent 30%),\n        linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.72));\n      box-shadow:\n        0 18px 38px rgba(15, 23, 42, 0.1),\n        0 0 0 1px rgba(255, 255, 255, 0.2),\n        inset 0 1px 0 rgba(255, 255, 255, 0.65),\n        inset 0 -1px 0 rgba(148, 163, 184, 0.08);\n      backdrop-filter: blur(18px) saturate(140%);\n      -webkit-backdrop-filter: blur(18px) saturate(140%);\n    }\n\n    .qualification-summary-card::before {\n      content: '';\n      position: absolute;\n      inset: 0;\n      border-radius: inherit;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));\n      pointer-events: none;\n    }\n\n    .qualification-summary-card__header {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 0.9rem;\n      flex-wrap: wrap;\n    }\n\n    .qualification-summary-card__title {\n      display: flex;\n      align-items: flex-start;\n      gap: 0.6rem;\n      min-width: 0;\n    }\n\n    .qualification-summary-card__title > i {\n      width: 2.4rem;\n      height: 2.4rem;\n      border-radius: 14px;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      color: #0f4ecf;\n      background: linear-gradient(135deg, rgba(59, 130, 246, 0.22), rgba(14, 165, 233, 0.14));\n      border: 1px solid rgba(96, 165, 250, 0.24);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.34),\n        0 12px 24px rgba(59, 130, 246, 0.12);\n      flex: 0 0 auto;\n      font-size: 1.05rem;\n    }\n\n    .qualification-summary-card__title h2 {\n      margin: 0;\n      font-size: 2rem;\n      font-weight: 800;\n      letter-spacing: -0.02em;\n      color: #1f2640;\n    }\n\n    .qualification-summary-card__title p {\n      margin: 0.2rem 0 0;\n      font-size: 1rem;\n      color: #667089;\n      line-height: 1.45;\n      max-width: 48rem;\n    }\n\n    .qualification-eyebrow {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.16rem 0.55rem;\n      border-radius: 999px;\n      margin-bottom: 0.2rem;\n      font-size: 0.72rem;\n      font-weight: 800;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      background: rgba(99, 102, 241, 0.12);\n      color: #5b5ce6;\n    }\n\n    .qualification-summary-card__actions {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.6rem;\n      margin-left: auto;\n    }\n\n    .qual-menu-btn {\n      width: 44px;\n      height: 44px;\n      border-radius: 14px;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: rgba(255, 255, 255, 0.85);\n      color: #667089;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      box-shadow: 0 10px 20px rgba(15, 23, 42, 0.06);\n      cursor: pointer;\n      transition: all 0.2s ease;\n\n      &:hover {\n        transform: translateY(-1px);\n        background: #ffffff;\n      }\n    }\n\n    /* \u2500\u2500\u2500 Conversion readiness card improvements \u2500\u2500\u2500 */\n    .readiness-score-row {\n      display: flex;\n      align-items: center;\n      gap: 0.65rem;\n      flex-wrap: wrap;\n      margin: 0.45rem 0 0.35rem;\n    }\n\n    .readiness-score-badge {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.35rem;\n      padding: 0.32rem 0.72rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.7);\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 6px 12px rgba(15, 23, 42, 0.04);\n\n      strong {\n        font-size: 1rem;\n        color: rgba(15, 23, 42, 0.9);\n      }\n\n      span {\n        font-size: 0.78rem;\n        font-weight: 600;\n        color: rgba(100, 116, 139, 0.8);\n      }\n\n      &[data-tone=\"high\"] {\n        background: rgba(34, 197, 94, 0.12);\n        border-color: rgba(34, 197, 94, 0.22);\n\n        strong { color: #166534; }\n        span { color: #15803d; }\n      }\n\n      &[data-tone=\"medium\"] {\n        background: rgba(59, 130, 246, 0.1);\n        border-color: rgba(59, 130, 246, 0.2);\n\n        strong { color: #1e40af; }\n        span { color: #2563eb; }\n      }\n\n      &[data-tone=\"low\"] {\n        background: rgba(245, 158, 11, 0.12);\n        border-color: rgba(245, 158, 11, 0.2);\n\n        strong { color: #92400e; }\n        span { color: #b45309; }\n      }\n\n      &[data-tone=\"none\"] {\n        strong { color: rgba(100, 116, 139, 0.7); }\n      }\n    }\n\n    .readiness-manager-chip {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      padding: 0.28rem 0.62rem;\n      border-radius: 999px;\n      font-size: 0.74rem;\n      font-weight: 700;\n      letter-spacing: 0.01em;\n      background: rgba(245, 158, 11, 0.12);\n      border: 1px solid rgba(245, 158, 11, 0.2);\n      color: #92400e;\n\n      i {\n        font-size: 0.72rem;\n        color: #f59e0b;\n      }\n    }\n\n    .readiness-summary {\n      margin: 0.25rem 0 0.45rem;\n      font-size: 0.84rem;\n      line-height: 1.55;\n      color: #334155;\n      font-weight: 500;\n    }\n\n    .readiness-primary-gap {\n      display: flex;\n      align-items: flex-start;\n      gap: 0.45rem;\n      padding: 0.55rem 0.68rem;\n      border-radius: 12px;\n      background: rgba(239, 68, 68, 0.06);\n      border: 1px solid rgba(239, 68, 68, 0.14);\n      margin-bottom: 0.45rem;\n\n      > i {\n        color: #ef4444;\n        font-size: 0.88rem;\n        margin-top: 2px;\n        flex-shrink: 0;\n      }\n\n      &__label {\n        display: block;\n        font-size: 0.68rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.06em;\n        color: rgba(239, 68, 68, 0.8);\n        margin-bottom: 1px;\n      }\n\n      strong {\n        font-size: 0.84rem;\n        color: #991b1b;\n        font-weight: 600;\n      }\n    }\n\n    /* \u2500\u2500\u2500 Score Hero (Conversion Readiness) \u2500\u2500\u2500 */\n    .readiness-score-hero {\n      display: flex;\n      align-items: center;\n      gap: 0.85rem;\n      margin: 0.55rem 0 0.5rem;\n    }\n\n    .readiness-score-hero__gauge {\n      position: relative;\n      width: 60px;\n      height: 60px;\n      flex-shrink: 0;\n\n      svg {\n        width: 100%;\n        height: 100%;\n        transform: rotate(-90deg);\n      }\n    }\n\n    .readiness-gauge-bg {\n      fill: none;\n      stroke: rgba(148, 163, 184, 0.2);\n      stroke-width: 3;\n    }\n\n    .readiness-gauge-fill {\n      fill: none;\n      stroke-width: 3;\n      stroke-linecap: round;\n      transition: stroke-dasharray 0.8s ease-out;\n      stroke: #94a3b8;\n\n      :host-context([data-tone=\"low\"]) & { stroke: #ef4444; }\n      :host-context([data-tone=\"medium\"]) & { stroke: #f59e0b; }\n      :host-context([data-tone=\"high\"]) & { stroke: #22c55e; }\n    }\n\n    .readiness-score-hero[data-tone=\"low\"] .readiness-gauge-fill { stroke: #ef4444; }\n    .readiness-score-hero[data-tone=\"medium\"] .readiness-gauge-fill { stroke: #f59e0b; }\n    .readiness-score-hero[data-tone=\"high\"] .readiness-gauge-fill { stroke: #22c55e; }\n\n    .readiness-score-hero__number {\n      position: absolute;\n      inset: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 1.1rem;\n      font-weight: 800;\n      color: rgba(15, 23, 42, 0.88);\n      letter-spacing: -0.02em;\n    }\n\n    .readiness-score-hero__content {\n      display: flex;\n      flex-direction: column;\n      gap: 0.4rem;\n    }\n\n    .readiness-score-hero__label-row {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n    }\n\n    .readiness-score-hero__denom {\n      font-size: 0.8rem;\n      font-weight: 600;\n      color: rgba(100, 116, 139, 0.7);\n    }\n\n    .readiness-score-hero__status-chip {\n      display: inline-flex;\n      padding: 0.22rem 0.6rem;\n      border-radius: 999px;\n      font-size: 0.72rem;\n      font-weight: 800;\n      letter-spacing: 0.04em;\n      text-transform: uppercase;\n      background: rgba(148, 163, 184, 0.15);\n      color: #475569;\n      border: 1.5px solid rgba(148, 163, 184, 0.25);\n\n      &[data-tone=\"low\"] {\n        background: rgba(239, 68, 68, 0.14);\n        border-color: rgba(239, 68, 68, 0.3);\n        color: #991b1b;\n      }\n\n      &[data-tone=\"medium\"] {\n        background: rgba(245, 158, 11, 0.14);\n        border-color: rgba(245, 158, 11, 0.28);\n        color: #92400e;\n      }\n\n      &[data-tone=\"high\"] {\n        background: rgba(34, 197, 94, 0.14);\n        border-color: rgba(34, 197, 94, 0.28);\n        color: #166534;\n      }\n    }\n\n    /* \u2500\u2500\u2500 Verdict chips (Reasons list) \u2500\u2500\u2500 */\n    .feedback-reasons-label {\n      display: block;\n      font-size: 0.68rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.07em;\n      color: rgba(30, 64, 175, 0.8);\n      margin-bottom: 0.45rem;\n    }\n\n    .verdict-chip-cloud {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.4rem;\n    }\n\n    .verdict-chip {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      padding: 0.28rem 0.6rem;\n      border-radius: 999px;\n      font-size: 0.76rem;\n      font-weight: 600;\n      line-height: 1.3;\n      border: 1.5px solid transparent;\n      background: rgba(148, 163, 184, 0.12);\n      color: #475569;\n\n      i { font-size: 0.72rem; }\n\n      &[data-tone=\"low\"] {\n        background: rgba(239, 68, 68, 0.1);\n        border-color: rgba(239, 68, 68, 0.2);\n        color: #991b1b;\n        i { color: #ef4444; }\n      }\n\n      &[data-tone=\"medium\"] {\n        background: rgba(245, 158, 11, 0.1);\n        border-color: rgba(245, 158, 11, 0.2);\n        color: #92400e;\n        i { color: #f59e0b; }\n      }\n\n      &[data-tone=\"high\"] {\n        background: rgba(34, 197, 94, 0.1);\n        border-color: rgba(34, 197, 94, 0.2);\n        color: #166534;\n        i { color: #22c55e; }\n      }\n    }\n\n    /* \u2500\u2500\u2500 Status Panel: Alert Header, KPI Tiles, Callout, Steps \u2500\u2500\u2500 */\n    .status-alert-header {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n      padding: 0.55rem 0.72rem;\n      margin: 0.5rem 0;\n      border-radius: 12px;\n      background: rgba(239, 68, 68, 0.07);\n      border: 1px solid rgba(239, 68, 68, 0.16);\n      border-left: 3px solid #ef4444;\n    }\n\n    .status-alert-header__pill {\n      border-radius: 999px;\n      padding: 0.16rem 0.45rem;\n      font-size: 0.66rem;\n      font-weight: 800;\n      letter-spacing: 0.05em;\n      text-transform: uppercase;\n      color: #991b1b;\n      background: rgba(239, 68, 68, 0.14);\n      border: 1px solid rgba(239, 68, 68, 0.22);\n    }\n\n    .status-alert-header__value {\n      font-size: 0.88rem;\n      font-weight: 700;\n      color: #991b1b;\n    }\n\n    .status-alert-header__state {\n      font-size: 0.75rem;\n      color: rgba(153, 27, 27, 0.7);\n    }\n\n    .status-kpi-grid {\n      display: grid;\n      grid-template-columns: repeat(3, 1fr);\n      gap: 0.55rem;\n      margin: 0.55rem 0;\n    }\n\n    .kpi-tile {\n      display: flex;\n      flex-direction: column;\n      gap: 0.3rem;\n      padding: 0.65rem 0.7rem;\n      border-radius: 14px;\n      background: rgba(255, 255, 255, 0.75);\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      border-top: 3px solid rgba(148, 163, 184, 0.3);\n      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 6px 12px rgba(15, 23, 42, 0.04);\n\n      &__icon {\n        width: 28px;\n        height: 28px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        border-radius: 8px;\n        font-size: 0.82rem;\n        background: rgba(148, 163, 184, 0.14);\n        color: #64748b;\n      }\n\n      &__label {\n        font-size: 0.66rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.06em;\n        color: rgba(100, 116, 139, 0.75);\n      }\n\n      &__value {\n        font-size: 1rem;\n        font-weight: 800;\n        color: rgba(15, 23, 42, 0.88);\n        letter-spacing: -0.01em;\n      }\n\n      &[data-tone=\"low\"] {\n        border-top-color: #ef4444;\n        .kpi-tile__icon { background: rgba(239, 68, 68, 0.12); color: #ef4444; }\n        .kpi-tile__value { color: #991b1b; }\n      }\n\n      &[data-tone=\"medium\"] {\n        border-top-color: #f59e0b;\n        .kpi-tile__icon { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }\n        .kpi-tile__value { color: #92400e; }\n      }\n\n      &[data-tone=\"high\"] {\n        border-top-color: #22c55e;\n        .kpi-tile__icon { background: rgba(34, 197, 94, 0.12); color: #22c55e; }\n        .kpi-tile__value { color: #166534; }\n      }\n    }\n\n    .weakest-signal-callout {\n      display: flex;\n      align-items: center;\n      gap: 0.42rem;\n      flex-wrap: wrap;\n      padding: 0.5rem 0.72rem;\n      margin-bottom: 0.45rem;\n      border-radius: 10px;\n      background: rgba(245, 158, 11, 0.07);\n      border: 1px solid rgba(245, 158, 11, 0.18);\n      border-left: 3px solid #f59e0b;\n      font-size: 0.82rem;\n\n      > i {\n        color: #f59e0b;\n        font-size: 0.85rem;\n        flex-shrink: 0;\n      }\n\n      &__label {\n        font-size: 0.69rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.05em;\n        color: #b45309;\n      }\n\n      strong {\n        font-weight: 700;\n        color: #92400e;\n      }\n\n      &__state {\n        font-size: 0.76rem;\n        color: rgba(146, 64, 14, 0.7);\n      }\n    }\n\n    .evidence-step-list {\n      display: flex;\n      flex-direction: column;\n      gap: 0.38rem;\n      margin-top: 0.35rem;\n    }\n\n    .evidence-step {\n      display: flex;\n      align-items: baseline;\n      gap: 0.5rem;\n      font-size: 0.81rem;\n      line-height: 1.45;\n      color: rgba(15, 23, 42, 0.82);\n\n      &__num {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        width: 18px;\n        height: 18px;\n        flex-shrink: 0;\n        border-radius: 50%;\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n        color: white;\n        font-size: 0.62rem;\n        font-weight: 800;\n      }\n    }\n\n    /* \u2500\u2500\u2500 Conversation Score Strip \u2500\u2500\u2500 */\n    .conv-score-strip {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.55rem;\n      align-items: stretch;\n      margin-bottom: 0.85rem;\n    }\n\n    .conv-score-cell {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      gap: 0.22rem;\n      padding: 0.6rem 0.75rem;\n      border-radius: 12px;\n      background: rgba(255, 255, 255, 0.75);\n      border: 1px solid rgba(148, 163, 184, 0.16);\n      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 4px 10px rgba(15, 23, 42, 0.04);\n      min-width: 80px;\n\n      &__lbl {\n        font-size: 0.64rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.07em;\n        color: #94a3b8;\n      }\n\n      &__denom {\n        font-size: 0.75rem;\n        color: rgba(100, 116, 139, 0.7);\n        font-weight: 600;\n      }\n\n      &__time {\n        font-size: 0.72rem;\n        color: #64748b;\n      }\n\n      &__sentiment {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.25rem;\n        font-size: 0.82rem;\n        font-weight: 700;\n        color: rgba(15, 23, 42, 0.82);\n\n        i { font-size: 0.78rem; }\n      }\n\n      strong {\n        font-size: 0.88rem;\n        font-weight: 700;\n        color: rgba(15, 23, 42, 0.88);\n      }\n\n      &--score {\n        flex-direction: row;\n        align-items: center;\n        gap: 0.55rem;\n        flex-shrink: 0;\n      }\n\n      &--time {\n        opacity: 0.72;\n        background: transparent;\n        border-color: transparent;\n        box-shadow: none;\n      }\n\n      &.sentiment--positive { background: rgba(34, 197, 94, 0.08); border-color: rgba(34, 197, 94, 0.18); }\n      &.sentiment--cautious { background: rgba(245, 158, 11, 0.08); border-color: rgba(245, 158, 11, 0.18); }\n      &.sentiment--negative { background: rgba(239, 68, 68, 0.08); border-color: rgba(239, 68, 68, 0.18); }\n    }\n\n    .conv-score-gauge {\n      position: relative;\n      width: 48px;\n      height: 48px;\n      flex-shrink: 0;\n\n      svg {\n        width: 100%;\n        height: 100%;\n        transform: rotate(-90deg);\n      }\n    }\n\n    .conv-gauge-bg {\n      fill: none;\n      stroke: rgba(148, 163, 184, 0.2);\n      stroke-width: 3;\n    }\n\n    .conv-gauge-fill {\n      fill: none;\n      stroke-width: 3;\n      stroke-linecap: round;\n      transition: stroke-dasharray 0.8s ease-out;\n      stroke: #94a3b8;\n\n      &[data-tone=\"healthy\"] { stroke: #22c55e; }\n      &[data-tone=\"risk\"] { stroke: #ef4444; }\n      &[data-tone=\"weak\"] { stroke: #f59e0b; }\n    }\n\n    .conv-score-gauge__num {\n      position: absolute;\n      inset: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 0.85rem;\n      font-weight: 800;\n      color: rgba(15, 23, 42, 0.88);\n      letter-spacing: -0.02em;\n    }\n\n    .conv-score-cell__detail {\n      display: flex;\n      flex-direction: column;\n      gap: 0.1rem;\n    }\n\n    .conv-band-chip {\n      display: inline-flex;\n      padding: 0.28rem 0.6rem;\n      border-radius: 999px;\n      font-size: 0.75rem;\n      font-weight: 800;\n      letter-spacing: 0.03em;\n      background: rgba(148, 163, 184, 0.14);\n      color: #475569;\n      border: 1.5px solid rgba(148, 163, 184, 0.22);\n\n      &[data-tone=\"healthy\"] {\n        background: rgba(34, 197, 94, 0.14);\n        border-color: rgba(34, 197, 94, 0.28);\n        color: #166534;\n      }\n\n      &[data-tone=\"risk\"] {\n        background: rgba(239, 68, 68, 0.14);\n        border-color: rgba(239, 68, 68, 0.28);\n        color: #991b1b;\n      }\n\n      &[data-tone=\"weak\"] {\n        background: rgba(245, 158, 11, 0.14);\n        border-color: rgba(245, 158, 11, 0.28);\n        color: #92400e;\n      }\n    }\n\n    /* \u2500\u2500\u2500 Signal card polarity tints \u2500\u2500\u2500 */\n    .conversation-signal-card--know {\n      background: linear-gradient(180deg, rgba(220, 252, 231, 0.7), rgba(255, 255, 255, 0.65)) !important;\n      border-color: rgba(34, 197, 94, 0.18) !important;\n\n      .conversation-signal-card__label {\n        color: #166534 !important;\n      }\n    }\n\n    .conversation-signal-card--missing {\n      background: linear-gradient(180deg, rgba(254, 226, 226, 0.65), rgba(255, 255, 255, 0.65)) !important;\n      border-color: rgba(239, 68, 68, 0.18) !important;\n\n      .conversation-signal-card__label {\n        color: #991b1b !important;\n      }\n    }\n\n    .conversation-signal-chip--risk {\n      background: rgba(239, 68, 68, 0.1) !important;\n      border-color: rgba(239, 68, 68, 0.18) !important;\n      color: #991b1b !important;\n    }\n\n    /* \u2500\u2500\u2500 Next action card indigo accent \u2500\u2500\u2500 */\n    .conversation-next-action-card--indigo {\n      border-left: 3px solid #6366f1 !important;\n      border-color: rgba(99, 102, 241, 0.2) !important;\n      background: linear-gradient(180deg, rgba(238, 242, 255, 0.9), rgba(255, 255, 255, 0.78)) !important;\n\n      .conversation-next-action-card__label {\n        color: #4338ca !important;\n      }\n    }\n\n    /* \u2500\u2500\u2500 Qualification Scoring (Latest Design) \u2500\u2500\u2500 */\n    .qualification-scoring-shell {\n      display: grid;\n      gap: 0.78rem;\n      margin-bottom: 0.9rem;\n    }\n\n    .qualification-scoring-shell__header {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n    .qual-shell-title {\n      display: flex;\n      align-items: flex-start;\n      gap: 0.65rem;\n\n      &__icon {\n        width: 44px;\n        height: 44px;\n        border-radius: 14px;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        color: #fff;\n        background: linear-gradient(135deg, #6d5ef7, #4f46e5);\n        box-shadow: 0 10px 24px rgba(79, 70, 229, 0.24);\n        flex-shrink: 0;\n\n        i { font-size: 0.9rem; }\n      }\n\n      &__eyebrow {\n        display: inline-flex;\n        margin-bottom: 0.1rem;\n        font-size: 0.82rem;\n        font-weight: 700;\n        color: #5b5ce6;\n      }\n\n      h2 {\n        margin: 0;\n        font-size: 1.56rem;\n        line-height: 1.12;\n        font-weight: 800;\n        color: #1f2640;\n        letter-spacing: -0.03em;\n      }\n\n      p {\n        margin: 0.25rem 0 0;\n        color: #667089;\n        font-size: 0.88rem;\n      }\n    }\n\n    .qual-shell-actions {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.55rem;\n      margin-left: auto;\n    }\n\n    .qual-stat-chips {\n      display: grid;\n      grid-template-columns: repeat(5, minmax(0, 1fr));\n      gap: 0.55rem;\n    }\n\n    .qual-stat-chip {\n      border-radius: 14px;\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      background: rgba(255, 255, 255, 0.86);\n      padding: 0.55rem 0.75rem;\n      display: flex;\n      align-items: center;\n      gap: 0.62rem;\n\n      .qual-stat-chip__icon {\n        width: 34px;\n        height: 34px;\n        border-radius: 10px;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        color: #ffffff;\n        font-size: 0.88rem;\n        flex: 0 0 auto;\n        box-shadow: 0 6px 14px rgba(15, 23, 42, 0.14);\n      }\n\n      .qual-stat-chip__content {\n        display: grid;\n        gap: 0.1rem;\n        min-width: 0;\n      }\n\n      .chip-label {\n        font-size: 0.72rem;\n        color: #6b7280;\n      }\n\n      strong {\n        font-size: 1.22rem;\n        font-weight: 800;\n        line-height: 1.1;\n      }\n\n      &--teal {\n        strong { color: #0f766e; }\n        .qual-stat-chip__icon { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n      }\n\n      &--violet {\n        strong { color: #5b21b6; }\n        .qual-stat-chip__icon { background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); }\n      }\n\n      &--blue {\n        strong { color: #1d4ed8; }\n        .qual-stat-chip__icon { background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%); }\n      }\n\n      &--amber {\n        strong { color: #9a3412; }\n        .qual-stat-chip__icon { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }\n      }\n\n      &--slate {\n        strong { color: #334155; }\n        .qual-stat-chip__icon { background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%); }\n      }\n    }\n\n    .qual-hero-card {\n      display: grid;\n      grid-template-columns: 1.8fr 1.9fr 1fr;\n      gap: 0.85rem;\n      border-radius: 16px;\n      border: 1px solid rgba(148, 163, 184, 0.22);\n      background: linear-gradient(180deg, rgba(236, 233, 255, 0.7), rgba(243, 244, 255, 0.62));\n      padding: 0.8rem;\n    }\n\n    .qual-hero-card__confidence {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      border-right: 1px solid rgba(148, 163, 184, 0.25);\n      padding-right: 0.7rem;\n    }\n\n    .qual-hero-ring {\n      position: relative;\n      width: 132px;\n      height: 132px;\n      flex-shrink: 0;\n\n      svg {\n        width: 100%;\n        height: 100%;\n        transform: rotate(-90deg);\n      }\n\n      .qual-gauge-bg {\n        fill: none;\n        stroke: rgba(99, 102, 241, 0.18);\n        stroke-width: 3;\n      }\n\n      .qual-gauge-fill {\n        fill: none;\n        stroke: #5b5ce6;\n        stroke-width: 3;\n        stroke-linecap: round;\n      }\n    }\n\n    .qual-hero-copy {\n      display: grid;\n      gap: 0.2rem;\n\n      &__label {\n        font-size: 0.82rem;\n        font-weight: 700;\n        color: #5b5ce6;\n        text-transform: uppercase;\n      }\n\n      strong {\n        font-size: 1.42rem;\n        line-height: 1.1;\n        color: #1f2640;\n      }\n\n      p {\n        margin: 0;\n        font-size: 0.84rem;\n        color: #64748b;\n      }\n    }\n\n    .qual-hero-card__middle {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 0.65rem;\n      border-right: 1px solid rgba(148, 163, 184, 0.25);\n      padding-right: 0.7rem;\n    }\n\n    .hero-mid-block {\n      border-radius: 12px;\n      background: rgba(255, 255, 255, 0.7);\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      padding: 0.6rem 0.7rem;\n      display: grid;\n      gap: 0.35rem;\n\n      &__label {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.3rem;\n        font-size: 0.72rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        color: #516079;\n      }\n\n      p {\n        margin: 0;\n        font-size: 0.9rem;\n        color: #334155;\n      }\n\n      strong {\n        color: #4338ca;\n        font-size: 0.95rem;\n      }\n\n      &__link {\n        font-size: 0.84rem;\n        color: #4f46e5;\n        text-decoration: none;\n      }\n    }\n\n    .qual-hero-card__tip {\n      display: grid;\n      align-content: center;\n      justify-items: center;\n      gap: 0.35rem;\n\n      p {\n        margin: 0;\n        font-size: 0.82rem;\n        line-height: 1.35;\n        text-align: center;\n        color: #6b7280;\n      }\n    }\n\n    .qual-tip-bot {\n      width: 70px;\n      height: 70px;\n      border-radius: 18px;\n      background: radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.95), rgba(191, 219, 254, 0.5));\n      border: 1px solid rgba(147, 197, 253, 0.45);\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      color: #3b82f6;\n\n      i { font-size: 1.25rem; }\n    }\n\n    .qual-tip-pill {\n      padding: 0.2rem 0.55rem;\n      border-radius: 999px;\n      background: rgba(139, 92, 246, 0.18);\n      color: #6d28d9;\n      font-size: 0.7rem;\n      font-weight: 700;\n      text-transform: uppercase;\n    }\n\n    // \u2500\u2500 CQVS radar + card section \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n    .qual-cqvs-section {\n      display: grid;\n      grid-template-columns: 320px minmax(0, 1fr);\n      gap: 0.72rem;\n      align-items: start;\n    }\n\n    .qual-cqvs-radar {\n      border-radius: 16px;\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      background: rgba(255, 255, 255, 0.9);\n      padding: 0.62rem 0.62rem 0.45rem;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      min-height: 292px;\n      gap: 0.32rem;\n\n      &__header {\n        width: 100%;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        margin-bottom: 0.1rem;\n      }\n\n      &__title {\n        display: flex;\n        align-items: center;\n        gap: 0.35rem;\n        font-size: 0.76rem;\n        font-weight: 700;\n        color: #4338ca;\n\n        i { font-size: 0.75rem; }\n      }\n\n      &__sub {\n        font-size: 0.66rem;\n        color: #9ca3af;\n      }\n\n      ::ng-deep canvas {\n        max-width: 286px !important;\n        max-height: 286px !important;\n      }\n    }\n\n    .qual-cqvs-cards {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.5rem;\n    }\n\n    .cqvs-group-card {\n      border-radius: 14px;\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      background: rgba(255, 255, 255, 0.86);\n      padding: 0.58rem 0.62rem;\n\n      .score-val {\n        font-size: 1.08rem;\n        font-weight: 800;\n        color: #1e293b;\n      }\n\n      .weight-pill {\n        font-size: 0.72rem;\n        padding: 0.12rem 0.45rem;\n        border-radius: 999px;\n        background: rgba(59, 130, 246, 0.14);\n        color: #1d4ed8;\n      }\n    }\n\n    .qual-breakdown-grid {\n      display: grid;\n      grid-template-columns: minmax(0, 4fr) minmax(200px, 1fr);\n      gap: 0.8rem;\n    }\n\n    .qual-breakdown-main {\n      border-radius: 16px;\n      overflow: hidden;\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      background: rgba(255, 255, 255, 0.88);\n\n      &__header {\n        padding: 0.62rem 0.82rem;\n        font-size: 0.84rem;\n        font-weight: 700;\n        color: #ffffff;\n        background: linear-gradient(90deg, #5b5ce6 0%, #3b82f6 100%);\n      }\n    }\n\n    .score-breakdown-table--hero {\n      ::ng-deep .p-datatable-thead > tr > th {\n        font-size: 0.67rem;\n        color: #64748b;\n      }\n\n      ::ng-deep .p-datatable-tbody > tr:nth-child(even) > td {\n        background: rgba(148, 163, 184, 0.045);\n      }\n\n      ::ng-deep .p-datatable-tbody > tr:hover > td {\n        background: rgba(59, 130, 246, 0.06);\n      }\n\n      .col-factor--with-cqvs {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.45rem;\n      }\n\n      .factor-rail.compact {\n        height: 7px;\n      }\n    }\n\n    .qual-risk-card {\n      border-radius: 14px;\n      border: 1px solid rgba(244, 63, 94, 0.22);\n      background: rgba(254, 242, 242, 0.82);\n      padding: 0.7rem;\n      display: grid;\n      gap: 0.6rem;\n\n      h4 {\n        margin: 0;\n        font-size: 1rem;\n        color: #991b1b;\n      }\n    }\n\n    .qual-risk-list {\n      display: grid;\n      gap: 0.45rem;\n    }\n\n    .qual-risk-item {\n      border-radius: 10px;\n      background: rgba(255, 255, 255, 0.76);\n      border: 1px solid rgba(244, 63, 94, 0.18);\n      padding: 0.45rem 0.52rem;\n      display: inline-flex;\n      align-items: center;\n      gap: 0.45rem;\n      font-size: 0.82rem;\n      color: #475569;\n\n      i {\n        color: #ef4444;\n        font-size: 0.8rem;\n      }\n    }\n\n    .qual-smart-insight {\n      border-radius: 10px;\n      border: 1px solid rgba(16, 185, 129, 0.24);\n      background: rgba(236, 253, 245, 0.85);\n      padding: 0.6rem 0.8rem;\n      display: inline-flex;\n      align-items: center;\n      gap: 0.45rem;\n      font-size: 0.86rem;\n      color: #14532d;\n\n      i { color: #10b981; }\n    }\n\n    @media (max-width: 1200px) {\n      .qual-stat-chips {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .qual-cqvs-section {\n        grid-template-columns: 1fr;\n      }\n\n      .qual-cqvs-cards {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .qual-hero-card {\n        grid-template-columns: 1fr;\n      }\n\n      .qual-hero-card__confidence,\n      .qual-hero-card__middle {\n        border-right: none;\n        padding-right: 0;\n      }\n\n      .qual-breakdown-grid {\n        grid-template-columns: 1fr;\n      }\n    }\n\n    @media (max-width: 950px) {\n      .qual-cqvs-cards {\n        grid-template-columns: 1fr;\n      }\n    }\n\n    @media (max-width: 700px) {\n      .qual-stat-chips,\n      .qual-cqvs-cards,\n      .qual-hero-card__middle {\n        grid-template-columns: 1fr;\n      }\n\n      .qual-shell-title h2 {\n        font-size: 1.35rem;\n      }\n    }\n\n    /* \u2500\u2500\u2500 Qualification Review Redesign \u2500\u2500\u2500 */\n\n    // \u2500\u2500 Top card (ring + KPIs row) \u2500\u2500\n    .qual-review-topcard {\n      display: flex;\n      align-items: center;\n      gap: 1.25rem;\n      background: rgba(255, 255, 255, 0.88);\n      border-radius: 18px;\n      padding: 1.25rem 1.35rem;\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);\n      margin-bottom: 0.75rem;\n      flex-wrap: wrap;\n\n      &[data-tone=\"low\"]    { border-left: 3px solid #ef4444; }\n      &[data-tone=\"medium\"] { border-left: 3px solid #f59e0b; }\n      &[data-tone=\"high\"]   { border-left: 3px solid #22c55e; }\n    }\n\n    .qual-review-score-block {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-shrink: 0;\n    }\n\n    .qual-review-gauge {\n      position: relative;\n      width: 116px;\n      height: 116px;\n      flex-shrink: 0;\n\n      svg {\n        width: 100%;\n        height: 100%;\n        transform: rotate(-90deg);\n      }\n\n      .qual-gauge-bg {\n        fill: none;\n        stroke: rgba(148, 163, 184, 0.18);\n        stroke-width: 3;\n      }\n\n      .qual-gauge-fill {\n        fill: none;\n        stroke-width: 3;\n        stroke-linecap: round;\n        stroke: #22c55e;\n        transition: stroke-dasharray 0.8s ease-out;\n\n        [data-tone=\"low\"]    & { stroke: #ef4444; }\n        [data-tone=\"medium\"] & { stroke: #f59e0b; }\n        [data-tone=\"high\"]   & { stroke: #22c55e; }\n      }\n    }\n\n    .qual-gauge-num {\n      position: absolute;\n      inset: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 3rem;\n      font-weight: 800;\n      color: #1e293b;\n    }\n\n    .qual-gauge-denom {\n      font-size: 0.95rem;\n      color: #94a3b8;\n      font-weight: 700;\n    }\n\n    .qual-review-summary {\n      display: flex;\n      flex-direction: column;\n      gap: 0.45rem;\n      min-width: 0;\n      flex: 1;\n      max-width: 360px;\n\n      &__title {\n        font-size: 2rem;\n        font-weight: 700;\n        color: #1e293b;\n        line-height: 1.18;\n      }\n\n      &__desc {\n        font-size: 1rem;\n        color: #64748b;\n        margin: 0;\n      }\n    }\n\n    .qual-status-chip {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      padding: 0.2rem 0.55rem;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      width: fit-content;\n      background: rgba(148, 163, 184, 0.12);\n      color: #475569;\n      border: 1px solid rgba(148, 163, 184, 0.2);\n\n      &[data-tone=\"low\"]    { background: rgba(239, 68, 68, 0.1); color: #991b1b; border-color: rgba(239, 68, 68, 0.2); }\n      &[data-tone=\"medium\"] { background: rgba(245, 158, 11, 0.1); color: #92400e; border-color: rgba(245, 158, 11, 0.2); }\n      &[data-tone=\"high\"]   { background: rgba(34, 197, 94, 0.1); color: #166534; border-color: rgba(34, 197, 94, 0.2); }\n    }\n\n    // \u2500\u2500 4-tile KPI strip \u2500\u2500\n    .qual-kpi-strip {\n      display: flex;\n      align-items: stretch;\n      margin-left: auto;\n      border-left: 1px solid rgba(0, 0, 0, 0.07);\n      padding-left: 1.15rem;\n      gap: 0;\n    }\n\n    .qual-kpi-tile {\n      display: flex;\n      flex-direction: column;\n      gap: 0.15rem;\n      padding: 0.5rem 0.9rem;\n      min-width: 160px;\n      border-right: 1px solid rgba(0, 0, 0, 0.05);\n      position: relative;\n\n      &:last-child { border-right: none; }\n\n      &[data-tone=\"low\"]    { border-top: 2px solid #ef4444; }\n      &[data-tone=\"medium\"] { border-top: 2px solid #f59e0b; }\n      &[data-tone=\"high\"]   { border-top: 2px solid #22c55e; }\n\n      &--weakest { border-top: 2px solid #a855f7; }\n\n      &__icon {\n        font-size: 0.9rem;\n        color: #94a3b8;\n        margin-bottom: 0.1rem;\n      }\n\n      &__label {\n        font-size: 0.76rem;\n        font-weight: 600;\n        text-transform: uppercase;\n        letter-spacing: 0.07em;\n        color: #94a3b8;\n      }\n\n      &__value {\n        font-size: 1.7rem;\n        font-weight: 700;\n        color: #1e293b;\n        line-height: 1.15;\n      }\n\n      &__hint {\n        font-size: 0.84rem;\n        color: #94a3b8;\n      }\n    }\n\n    .qual-kpi-badge {\n      display: inline-block;\n      padding: 0.1rem 0.4rem;\n      border-radius: 4px;\n      font-size: 0.6rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      background: rgba(168, 85, 247, 0.1);\n      color: #7e22ce;\n    }\n\n    // \u2500\u2500 3-column body section \u2500\u2500\n    .qual-review-body {\n      display: flex;\n      flex-direction: column;\n      gap: 0.9rem;\n\n      &__header {\n        height: 4px;\n      }\n\n      &__rule {\n        display: block;\n        width: 100%;\n        border-top: 1px solid rgba(148, 163, 184, 0.2);\n      }\n\n      &__stats {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n        flex-wrap: wrap;\n      }\n    }\n\n    .qual-review-cols {\n      display: grid;\n      grid-template-columns: 1fr 1fr 1fr;\n      gap: 0.75rem;\n\n      @media (max-width: 900px) {\n        grid-template-columns: 1fr;\n      }\n    }\n\n    .qual-col {\n      border-radius: 18px;\n      padding: 1rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n\n      &--know    { background: rgba(220, 252, 231, 0.35); border: 1px solid rgba(34, 197, 94, 0.18); }\n      &--missing { background: rgba(254, 226, 226, 0.35); border: 1px solid rgba(239, 68, 68, 0.18); }\n      &--ai      { background: rgba(238, 242, 255, 0.45); border: 1px solid rgba(99, 102, 241, 0.18); }\n\n      &__header {\n        display: flex;\n        align-items: flex-start;\n        gap: 0.5rem;\n        flex-wrap: wrap;\n\n        div {\n          display: flex;\n          flex-direction: column;\n          gap: 0.12rem;\n          flex: 1;\n          min-width: 0;\n\n          strong {\n            font-size: 1.02rem;\n            font-weight: 700;\n            color: #1e293b;\n          }\n\n          span {\n            font-size: 0.88rem;\n            color: #64748b;\n          }\n        }\n      }\n\n      &__icon {\n        width: 26px;\n        height: 26px;\n        border-radius: 999px;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 0.72rem;\n        flex-shrink: 0;\n\n        &--know    { background: rgba(34, 197, 94, 0.15); color: #16a34a; }\n        &--missing { background: rgba(239, 68, 68, 0.15); color: #dc2626; }\n        &--ai      { background: rgba(99, 102, 241, 0.15); color: #6366f1; }\n      }\n\n      &__empty {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        gap: 0.35rem;\n        padding: 1.25rem;\n        text-align: center;\n        color: #94a3b8;\n        font-size: 0.72rem;\n\n        i { font-size: 1.1rem; }\n      }\n    }\n\n    .qual-priority-badge {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.15rem 0.45rem;\n      background: rgba(239, 68, 68, 0.12);\n      color: #991b1b;\n      border-radius: 999px;\n      font-size: 0.72rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      flex-shrink: 0;\n    }\n\n    // \u2500\u2500 Engagement block (col 1) \u2500\u2500\n    .qual-engagement-block {\n      background: rgba(255, 255, 255, 0.55);\n      border: 1px solid rgba(0, 0, 0, 0.06);\n      border-radius: 14px;\n      padding: 0.78rem 0.88rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.5rem;\n    }\n\n    .qual-engagement-tag {\n      font-size: 0.72rem;\n      font-weight: 600;\n      color: #94a3b8;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n\n    .qual-engagement-row {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 0.5rem;\n\n      > div {\n        display: flex;\n        flex-direction: column;\n        gap: 0.12rem;\n\n        strong {\n          font-size: 2rem;\n          font-weight: 700;\n          color: #1e293b;\n          line-height: 1.1;\n        }\n\n        span {\n          font-size: 0.92rem;\n          color: #64748b;\n        }\n      }\n    }\n\n    .qual-block-row {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.5rem;\n    }\n\n    .qual-block-label {\n      display: flex;\n      align-items: center;\n      gap: 0.3rem;\n      font-size: 0.78rem;\n      font-weight: 600;\n      color: #64748b;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n\n    // \u2500\u2500 Signals block \u2500\u2500\n    .qual-signals-block {\n      display: flex;\n      flex-direction: column;\n      gap: 0.4rem;\n    }\n\n    .qual-signals-list {\n      display: flex;\n      flex-direction: column;\n      gap: 0.3rem;\n    }\n\n    .qual-signal-item {\n      display: flex;\n      align-items: flex-start;\n      gap: 0.35rem;\n      font-size: 0.92rem;\n      color: #1e293b;\n      background: rgba(255, 255, 255, 0.5);\n      border-radius: 10px;\n      padding: 0.48rem 0.62rem;\n\n      i { color: #16a34a; font-size: 0.65rem; margin-top: 0.12rem; flex-shrink: 0; }\n\n      &--neutral i { color: #64748b; }\n    }\n\n    // \u2500\u2500 Gap grid (col 2) \u2500\u2500\n    .qual-gap-grid {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 0.4rem;\n\n      @media (max-width: 600px) { grid-template-columns: 1fr; }\n    }\n\n    .qual-gap-card {\n      display: flex;\n      flex-direction: column;\n      gap: 0.2rem;\n      background: rgba(255, 255, 255, 0.55);\n      border: 1px solid rgba(239, 68, 68, 0.12);\n      border-radius: 14px;\n      padding: 0.72rem 0.78rem;\n\n      &__icon {\n        font-size: 1rem;\n        color: #dc2626;\n      }\n\n      &__label {\n        font-size: 0.78rem;\n        font-weight: 700;\n        letter-spacing: 0.04em;\n        text-transform: uppercase;\n        color: #64748b;\n      }\n\n      &__text {\n        font-size: 0.95rem;\n        font-weight: 600;\n        color: #1e293b;\n        line-height: 1.35;\n      }\n\n      &__impact {\n        display: inline-flex;\n        width: fit-content;\n        font-size: 0.7rem;\n        font-weight: 700;\n        border-radius: 999px;\n        padding: 0.15rem 0.48rem;\n      }\n\n      &--high .qual-gap-card__impact {\n        color: #be123c;\n        background: rgba(244, 63, 94, 0.14);\n      }\n\n      &--medium .qual-gap-card__impact {\n        color: #b45309;\n        background: rgba(245, 158, 11, 0.16);\n      }\n\n      &--review .qual-gap-card__impact {\n        color: #4338ca;\n        background: rgba(99, 102, 241, 0.14);\n      }\n    }\n\n    // \u2500\u2500 Evidence checklist (col 2 bottom) \u2500\u2500\n    .qual-evidence-block {\n      display: flex;\n      flex-direction: column;\n      gap: 0.4rem;\n    }\n\n    .qual-evidence-list {\n      display: flex;\n      flex-direction: column;\n      gap: 0.3rem;\n    }\n\n    .qual-evidence-item {\n      display: flex;\n      align-items: flex-start;\n      gap: 0.35rem;\n      font-size: 0.88rem;\n      color: #1e293b;\n\n      i { color: #64748b; font-size: 0.65rem; margin-top: 0.12rem; flex-shrink: 0; }\n    }\n\n    // \u2500\u2500 AI Insight column (col 3) \u2500\u2500\n    .qual-ai-insight-text {\n      font-size: 1.05rem;\n      color: #334155;\n      line-height: 1.55;\n      margin: 0;\n      font-weight: 600;\n    }\n\n    .qual-suggested-message {\n      background: rgba(99, 102, 241, 0.07);\n      border: 1px solid rgba(99, 102, 241, 0.15);\n      border-left: 3px solid #6366f1;\n      border-radius: 0 8px 8px 0;\n      padding: 0.6rem 0.75rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.3rem;\n\n      &__label {\n        font-size: 0.74rem;\n        font-weight: 700;\n        text-transform: uppercase;\n        letter-spacing: 0.06em;\n        color: #6366f1;\n      }\n\n      &__body {\n        font-size: 0.93rem;\n        color: #1e293b;\n        font-style: italic;\n        margin: 0;\n        line-height: 1.45;\n      }\n    }\n\n    .qual-ai-chips {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.4rem;\n    }\n\n    .qual-ai-chip {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.2rem 0.5rem;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      font-weight: 600;\n\n      &--tone   { background: rgba(99, 102, 241, 0.1); color: #4338ca; }\n      &--intent { background: rgba(168, 85, 247, 0.1); color: #7e22ce; }\n    }\n\n    // \u2500\u2500 Footer recommended action bar \u2500\u2500\n    .qual-review-footer {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      background: rgba(238, 242, 255, 0.5);\n      border: 2px solid rgba(99, 102, 241, 0.4);\n      border-radius: 16px;\n      padding: 0.95rem 1.1rem;\n      flex-wrap: wrap;\n    }\n\n    .qual-footer-badge {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.2rem 0.55rem;\n      background: rgba(99, 102, 241, 0.12);\n      color: #4338ca;\n      border-radius: 999px;\n      font-size: 0.65rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      white-space: nowrap;\n      flex-shrink: 0;\n    }\n\n    .qual-footer-content {\n      display: flex;\n      flex-direction: column;\n      gap: 0.12rem;\n      flex: 1;\n      min-width: 0;\n\n      strong {\n        font-size: 1.5rem;\n        font-weight: 700;\n        color: #1e293b;\n      }\n\n      p {\n        font-size: 0.96rem;\n        color: #64748b;\n        margin: 0;\n      }\n    }\n\n    .qual-footer-actions {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.65rem;\n      margin-left: auto;\n      flex-wrap: wrap;\n    }\n\n    .qual-footer-btn {\n      min-height: 40px;\n\n      &--ghost {\n        background: #fff;\n        border: 1px solid rgba(99, 102, 241, 0.32);\n        color: #4f46e5;\n      }\n    }\n\n    .qual-review-note {\n      margin-top: 0.45rem;\n      display: inline-flex;\n      align-items: center;\n      gap: 0.5rem;\n      font-size: 0.78rem;\n      color: #7c859d;\n\n      i {\n        color: #667eea;\n        font-size: 0.86rem;\n      }\n    }\n\n    // \u2500\u2500 Email thread (inside qual-review-body) \u2500\u2500\n    .qual-email-thread {\n      border-top: 1px solid rgba(0, 0, 0, 0.06);\n      padding-top: 0.75rem;\n      display: flex;\n      flex-direction: column;\n      gap: 0.4rem;\n    }\n\n    /* \u2500\u2500\u2500 Empty state CTA improvements \u2500\u2500\u2500 */\n    .email-engagement-panel__empty {\n      strong {\n        display: block;\n        font-size: 0.88rem;\n        color: rgba(15, 23, 42, 0.8);\n        margin-top: 0.3rem;\n      }\n\n      .empty-state-cta {\n        margin-top: 0.65rem;\n      }\n    }\n\n    .qualification-insight-grid {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.8rem;\n      align-items: stretch;\n    }\n\n    .qualification-summary-card__focus {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      flex-wrap: wrap;\n      padding: 0.62rem 0.72rem;\n      border-radius: 14px;\n      background:\n        radial-gradient(circle at 8% 10%, rgba(245, 158, 11, 0.14), transparent 50%),\n        rgba(255, 255, 255, 0.62);\n      border: 1px solid rgba(245, 158, 11, 0.18);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.4),\n        0 8px 16px rgba(15, 23, 42, 0.04);\n    }\n\n    .focus-pill {\n      border-radius: 999px;\n      padding: 0.18rem 0.45rem;\n      font-size: 0.67rem;\n      font-weight: 800;\n      letter-spacing: 0.05em;\n      text-transform: uppercase;\n      color: #9a3412;\n      background: rgba(251, 191, 36, 0.18);\n      border: 1px solid rgba(245, 158, 11, 0.18);\n    }\n\n    .qualification-summary-card__focus strong {\n      color: rgba(var(--apple-secondary), 0.98);\n      font-size: 0.9rem;\n    }\n\n    .focus-state {\n      font-size: 0.75rem;\n      color: rgba(var(--apple-gray-1), 0.82);\n    }\n\n    .qualification-summary-card__error {\n      margin: 0;\n    }\n\n    .qualification-feedback--summary {\n      margin-top: 0;\n      border-radius: 18px;\n      position: relative;\n      overflow: hidden;\n      background:\n        radial-gradient(circle at 10% 10%, rgba(56, 189, 248, 0.14), transparent 50%),\n        radial-gradient(circle at 90% 8%, rgba(139, 92, 246, 0.12), transparent 52%),\n        linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5));\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.45),\n        inset 0 -1px 0 rgba(148, 163, 184, 0.06),\n        0 14px 24px rgba(15, 23, 42, 0.06);\n      padding: 0.95rem 1rem 1rem;\n      backdrop-filter: blur(12px) saturate(128%);\n      -webkit-backdrop-filter: blur(12px) saturate(128%);\n    }\n\n    .qualification-feedback--summary::before {\n      content: '';\n      position: absolute;\n      inset: 0 0 auto 0;\n      height: 42%;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0));\n      pointer-events: none;\n    }\n\n    .qualification-feedback--summary .feedback-title {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.42rem;\n      padding: 0.28rem 0.56rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.7);\n      border: 1px solid rgba(148, 163, 184, 0.16);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.4),\n        0 8px 16px rgba(15, 23, 42, 0.04);\n      font-weight: 700;\n    }\n\n    .qualification-feedback--summary .feedback-metrics {\n      display: flex;\n      flex-wrap: wrap;\n      font-size: 0.84rem;\n      gap: 0.55rem;\n      margin-top: 0.35rem;\n    }\n\n    .qualification-feedback--summary .feedback-item {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.32rem;\n      padding: 0.3rem 0.58rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.9);\n      border: 1px solid rgba(148, 163, 184, 0.16);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.45),\n        0 8px 14px rgba(15, 23, 42, 0.04);\n    }\n\n    .qualification-feedback--summary .feedback-suggestions {\n      margin-top: 0.45rem;\n      padding: 0.7rem 0.78rem;\n      border-radius: 14px;\n      background:\n        linear-gradient(180deg, rgba(255, 255, 255, 0.64), rgba(255, 255, 255, 0.5));\n      border: 1px dashed rgba(148, 163, 184, 0.22);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.28),\n        0 8px 16px rgba(15, 23, 42, 0.03);\n    }\n\n    .qualification-feedback--summary .feedback-suggestions .feedback-title {\n      background: transparent;\n      border: none;\n      box-shadow: none;\n      padding: 0;\n      border-radius: 0;\n      color: rgba(30, 64, 175, 0.85);\n    }\n\n    .qualification-feedback--summary .feedback-suggestions-list {\n      margin-top: 0.3rem;\n      padding-left: 1rem;\n      display: grid;\n      gap: 0.2rem;\n    }\n\n    .qualification-feedback--summary .feedback-suggestions-list li {\n      font-size: 0.81rem;\n      line-height: 1.4;\n      color: rgba(var(--apple-secondary), 0.9);\n    }\n\n    .qualification-feedback--summary .feedback-state {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.05rem 0.32rem;\n      border-radius: 999px;\n      background: rgba(148, 163, 184, 0.12);\n      border: 1px solid rgba(148, 163, 184, 0.16);\n    }\n\n    .qualification-feedback--readiness {\n      background:\n        radial-gradient(circle at 8% 12%, rgba(59, 130, 246, 0.16), transparent 48%),\n        radial-gradient(circle at 88% 18%, rgba(14, 165, 233, 0.14), transparent 36%),\n        linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(239, 246, 255, 0.54));\n    }\n\n    .qualification-feedback--status {\n      background:\n        radial-gradient(circle at 12% 10%, rgba(139, 92, 246, 0.14), transparent 48%),\n        radial-gradient(circle at 86% 22%, rgba(244, 114, 182, 0.12), transparent 34%),\n        linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(250, 245, 255, 0.54));\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       EMAIL ENGAGEMENT PANEL\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .conversation-intelligence-panel {\n      margin-top: 0.65rem;\n      border-radius: 20px;\n      position: relative;\n      overflow: hidden;\n      background:\n        radial-gradient(circle at 85% 15%, rgba(236, 72, 153, 0.1), transparent 52%),\n        radial-gradient(circle at 15% 85%, rgba(59, 130, 246, 0.08), transparent 46%),\n        radial-gradient(circle at 60% 10%, rgba(129, 140, 248, 0.12), transparent 34%),\n        linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5));\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.45),\n        0 16px 28px rgba(15, 23, 42, 0.07);\n      padding: 1rem 1.05rem 1.05rem;\n      backdrop-filter: blur(14px) saturate(132%);\n      -webkit-backdrop-filter: blur(14px) saturate(132%);\n    }\n\n    .conversation-intelligence-panel__header {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 0.9rem;\n      margin-bottom: 0.95rem;\n      flex-wrap: wrap;\n    }\n\n    .conversation-intelligence-panel__title {\n      display: flex;\n      align-items: center;\n      gap: 0.55rem;\n\n      > i {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 40px;\n        height: 40px;\n        border-radius: 14px;\n        background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.16));\n        color: #5b5cf0;\n        font-size: 1rem;\n        flex-shrink: 0;\n        box-shadow:\n          inset 0 1px 0 rgba(255, 255, 255, 0.3),\n          0 12px 22px rgba(99, 102, 241, 0.12);\n      }\n\n      h3 {\n        margin: 0;\n        font-size: 1rem;\n        font-weight: 800;\n        letter-spacing: -0.01em;\n        color: rgba(15, 23, 42, 0.88);\n      }\n\n      p {\n        margin: 0;\n        font-size: 0.78rem;\n        color: rgba(100, 116, 139, 0.8);\n        line-height: 1.45;\n      }\n    }\n\n    .conversation-intelligence-panel__actions {\n      display: grid;\n      gap: 0.55rem;\n      justify-items: end;\n    }\n\n    .conversation-intelligence-panel__stats {\n      display: flex;\n      align-items: center;\n      gap: 0.6rem;\n      flex-wrap: wrap;\n      justify-content: flex-end;\n    }\n\n    .conversation-intelligence-panel__overview {\n      display: flex;\n      flex-direction: column;\n      gap: 0.7rem;\n      margin-bottom: 0.95rem;\n    }\n\n    .conversation-intelligence-summary,\n    .conversation-next-action-card,\n    .conversation-signal-card {\n      border-radius: 16px;\n      background:\n        linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.66));\n      border: 1px solid rgba(148, 163, 184, 0.14);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.4),\n        0 10px 20px rgba(15, 23, 42, 0.05);\n      padding: 0.9rem 0.95rem;\n    }\n\n    .conversation-intelligence-summary__label,\n    .conversation-signal-card__label,\n    .conversation-next-action-card__label {\n      font-size: 0.69rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.07em;\n      color: #7c8aa0;\n      margin-bottom: 0.45rem;\n    }\n\n    .conversation-intelligence-summary p,\n    .conversation-next-action-card p {\n      margin: 0;\n      font-size: 0.84rem;\n      line-height: 1.6;\n      color: #334155;\n      font-weight: 500;\n    }\n\n    .conversation-intelligence-meta {\n      display: flex;\n      flex-wrap: wrap;\n      align-content: flex-start;\n      gap: 0.65rem;\n    }\n\n    .conversation-state-strip {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.55rem;\n      margin-bottom: 0.85rem;\n    }\n\n    .conversation-state-pill {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.36rem 0.68rem;\n      border-radius: 999px;\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      background: rgba(241, 245, 249, 0.9);\n      color: #334155;\n      font-size: 0.76rem;\n      font-weight: 700;\n      line-height: 1.2;\n    }\n\n    .conversation-state-pill--detail {\n      font-weight: 600;\n    }\n\n    .conversation-state-pill[data-tone=\"healthy\"] {\n      background: rgba(34, 197, 94, 0.12);\n      border-color: rgba(34, 197, 94, 0.18);\n      color: #166534;\n    }\n\n    .conversation-state-pill[data-tone=\"risk\"] {\n      background: rgba(239, 68, 68, 0.1);\n      border-color: rgba(239, 68, 68, 0.16);\n      color: #991b1b;\n    }\n\n    .conversation-state-pill[data-tone=\"weak\"] {\n      background: rgba(245, 158, 11, 0.12);\n      border-color: rgba(245, 158, 11, 0.18);\n      color: #b45309;\n    }\n\n    .conversation-next-action-card--pinned {\n      margin-bottom: 0.8rem;\n      border-color: rgba(59, 130, 246, 0.18);\n      background:\n        linear-gradient(180deg, rgba(239, 246, 255, 0.88), rgba(255, 255, 255, 0.75));\n    }\n\n    // AI Tone & Intent Analysis panel\n    .ai-tone-panel {\n      background: rgba(99, 102, 241, 0.06);\n      border: 1px solid rgba(99, 102, 241, 0.15);\n      border-radius: 0.75rem;\n      padding: 0.75rem 1rem;\n      margin-bottom: 0.8rem;\n\n      &__header {\n        display: flex;\n        align-items: center;\n        gap: 0.5rem;\n        margin-bottom: 0.65rem;\n        font-size: 0.8125rem;\n        font-weight: 600;\n        color: #4338ca;\n\n        i { color: #6366f1; font-size: 0.9rem; }\n      }\n\n      &__score {\n        margin-left: auto;\n        font-size: 0.8125rem;\n        font-weight: 700;\n        color: #6366f1;\n        background: rgba(99, 102, 241, 0.12);\n        padding: 2px 8px;\n        border-radius: 9999px;\n      }\n\n      &__grid {\n        display: grid;\n        grid-template-columns: repeat(3, 1fr);\n        gap: 0.5rem;\n        margin-bottom: 0.5rem;\n\n        @media (max-width: 640px) {\n          grid-template-columns: 1fr;\n        }\n      }\n\n      &__justification {\n        display: flex;\n        align-items: flex-start;\n        gap: 0.4rem;\n        font-size: 0.78rem;\n        color: #6b7280;\n        line-height: 1.45;\n\n        i {\n          color: #a5b4fc;\n          font-size: 0.8rem;\n          margin-top: 2px;\n          flex-shrink: 0;\n        }\n      }\n    }\n\n    .ai-tone-chip {\n      display: flex;\n      flex-direction: column;\n      gap: 2px;\n      padding: 0.45rem 0.65rem;\n      border-radius: 0.5rem;\n      background: rgba(255, 255, 255, 0.8);\n      border: 1px solid rgba(0, 0, 0, 0.06);\n\n      &__label {\n        font-size: 0.7rem;\n        font-weight: 600;\n        text-transform: uppercase;\n        letter-spacing: 0.04em;\n        color: #9ca3af;\n      }\n\n      strong {\n        font-size: 0.82rem;\n        font-weight: 600;\n        color: #1e293b;\n      }\n\n      &--tone { border-left: 3px solid #6366f1; }\n      &--buying { border-left: 3px solid #22c55e; }\n      &--intent { border-left: 3px solid #06b6d4; }\n    }\n\n    .conversation-intelligence-grid {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.8rem;\n      margin-bottom: 0.8rem;\n    }\n\n    .conversation-signal-card__chips {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.45rem;\n    }\n\n    .conversation-signal-chip {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.22rem 0.5rem;\n      border-radius: 999px;\n      font-size: 0.74rem;\n      font-weight: 600;\n      line-height: 1.35;\n      border: 1px solid transparent;\n    }\n\n    .conversation-signal-chip--positive {\n      background: rgba(34, 197, 94, 0.12);\n      border-color: rgba(34, 197, 94, 0.16);\n      color: #15803d;\n    }\n\n    .conversation-signal-chip--risk {\n      background: rgba(245, 158, 11, 0.12);\n      border-color: rgba(245, 158, 11, 0.16);\n      color: #b45309;\n    }\n\n    .conversation-signal-chip--neutral {\n      background: rgba(99, 102, 241, 0.1);\n      border-color: rgba(99, 102, 241, 0.12);\n      color: #4338ca;\n    }\n\n    .email-engagement-panel {\n      margin-top: 0.65rem;\n    }\n\n    .email-engagement-panel__header {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 0.75rem;\n      margin-bottom: 0.6rem;\n      flex-wrap: wrap;\n    }\n\n    .email-engagement-panel__title {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n\n      > i {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 32px;\n        height: 32px;\n        border-radius: 8px;\n        background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(219, 39, 119, 0.1));\n        color: #ec4899;\n        font-size: 0.95rem;\n        flex-shrink: 0;\n      }\n\n      h3 {\n        margin: 0;\n        font-size: 0.92rem;\n        font-weight: 700;\n        color: rgba(15, 23, 42, 0.88);\n      }\n\n      p {\n        margin: 0;\n        font-size: 0.76rem;\n        color: rgba(100, 116, 139, 0.8);\n      }\n    }\n\n    .email-engagement-panel__stats {\n      display: flex;\n      align-items: center;\n      gap: 0.55rem;\n      flex-wrap: wrap;\n    }\n\n    .email-stat {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.25rem;\n      padding: 0.18rem 0.45rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.75);\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      font-size: 0.78rem;\n      color: rgba(51, 65, 85, 0.9);\n      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);\n\n      i { font-size: 0.72rem; }\n      strong { font-weight: 600; }\n\n      &--open i { color: #22c55e; }\n      &--date i { color: #3b82f6; }\n    }\n\n    .email-thread-list {\n      display: grid;\n      gap: 0.35rem;\n    }\n\n    .email-thread-item {\n      display: flex;\n      align-items: center;\n      gap: 0.55rem;\n      padding: 0.45rem 0.55rem;\n      border-radius: 10px;\n      background: rgba(255, 255, 255, 0.72);\n      border: 1px solid rgba(148, 163, 184, 0.12);\n      transition: all 200ms ease;\n\n      &:hover {\n        background: rgba(255, 255, 255, 0.92);\n        box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);\n        transform: translateX(2px);\n      }\n    }\n\n    .email-thread-item__direction {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 26px;\n      height: 26px;\n      border-radius: 50%;\n      flex-shrink: 0;\n\n      i { font-size: 0.72rem; }\n\n      .email-thread-item--outbound & {\n        background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.1));\n        color: #3b82f6;\n      }\n\n      .email-thread-item--inbound & {\n        background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.1));\n        color: #22c55e;\n      }\n    }\n\n    .email-thread-item__body {\n      flex: 1;\n      min-width: 0;\n    }\n\n    .email-thread-item__meta {\n      display: flex;\n      align-items: center;\n      gap: 0.4rem;\n    }\n\n    .email-thread-item__sender {\n      font-size: 0.8rem;\n      font-weight: 600;\n      color: rgba(15, 23, 42, 0.85);\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      max-width: 180px;\n    }\n\n    .email-thread-item__date {\n      font-size: 0.72rem;\n      color: rgba(100, 116, 139, 0.7);\n      white-space: nowrap;\n    }\n\n    .email-thread-item__subject {\n      display: block;\n      font-size: 0.78rem;\n      color: rgba(51, 65, 85, 0.8);\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n\n    .email-thread-item__status {\n      flex-shrink: 0;\n    }\n\n    .email-status-badge {\n      display: inline-flex;\n      padding: 0.1rem 0.38rem;\n      font-size: 0.68rem;\n      font-weight: 600;\n      border-radius: 999px;\n      text-transform: capitalize;\n\n      &[data-status=\"sent\"] {\n        background: rgba(59, 130, 246, 0.12);\n        color: #2563eb;\n      }\n      &[data-status=\"delivered\"] {\n        background: rgba(34, 197, 94, 0.12);\n        color: #16a34a;\n      }\n      &[data-status=\"opened\"] {\n        background: rgba(34, 197, 94, 0.18);\n        color: #15803d;\n      }\n      &[data-status=\"clicked\"] {\n        background: rgba(168, 85, 247, 0.15);\n        color: #7c3aed;\n      }\n      &[data-status=\"bounced\"] {\n        background: rgba(239, 68, 68, 0.12);\n        color: #dc2626;\n      }\n      &[data-status=\"failed\"] {\n        background: rgba(239, 68, 68, 0.15);\n        color: #b91c1c;\n      }\n      &[data-status=\"pending\"],\n      &[data-status=\"queued\"] {\n        background: rgba(148, 163, 184, 0.14);\n        color: #64748b;\n      }\n    }\n\n    .email-engagement-panel__empty,\n    .email-engagement-panel__loading {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.4rem;\n      padding: 1.2rem 0;\n      font-size: 0.82rem;\n      color: rgba(100, 116, 139, 0.7);\n\n      i { font-size: 1.2rem; }\n    }\n\n    .email-engagement-panel__toggle {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.3rem;\n      width: 100%;\n      margin-top: 0.45rem;\n      padding: 0.35rem 0;\n      border: none;\n      border-radius: 8px;\n      background: rgba(255, 255, 255, 0.5);\n      color: rgba(59, 130, 246, 0.85);\n      font-size: 0.78rem;\n      font-weight: 600;\n      cursor: pointer;\n      transition: all 200ms ease;\n\n      &:hover {\n        background: rgba(59, 130, 246, 0.08);\n        color: #2563eb;\n      }\n\n      i { font-size: 0.68rem; }\n    }\n\n    @media (max-width: 960px) {\n      .conversation-intelligence-panel__overview,\n      .conversation-intelligence-grid {\n        grid-template-columns: 1fr;\n      }\n\n      .conversation-intelligence-panel__actions {\n        width: 100%;\n        justify-items: stretch;\n      }\n\n      .conversation-intelligence-panel__stats {\n        justify-content: flex-start;\n      }\n    }\n\n    /* \u2550\u2550\u2550 AI Conversation Summary Card \u2550\u2550\u2550 */\n    .ai-summary-card {\n      position: relative;\n      margin-top: 1rem;\n      padding: 1rem 1.15rem;\n      background: rgba(255, 255, 255, 0.88);\n      backdrop-filter: blur(18px);\n      border: 1px solid rgba(168, 85, 247, 0.18);\n      border-radius: 14px;\n      box-shadow: 0 4px 18px rgba(168, 85, 247, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04);\n      animation: fade-in-up 0.45s ease-out;\n      overflow: hidden;\n\n      &::before {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        height: 3px;\n        background: linear-gradient(90deg, #667eea, #a855f7, #22d3ee);\n        border-radius: 14px 14px 0 0;\n      }\n    }\n\n    .ai-summary-card__header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n      margin-bottom: 0.75rem;\n    }\n\n    .ai-summary-card__title {\n      display: flex;\n      align-items: center;\n      gap: 0.65rem;\n\n      > i {\n        font-size: 1.1rem;\n        color: #a855f7;\n        flex-shrink: 0;\n      }\n\n      h3 {\n        margin: 0;\n        font-size: 0.9rem;\n        font-weight: 700;\n        color: #1f2937;\n        line-height: 1.2;\n      }\n\n      p {\n        margin: 0;\n        font-size: 0.72rem;\n        color: #6b7280;\n        line-height: 1.3;\n      }\n    }\n\n    .ai-summary-card__generate {\n      flex-shrink: 0;\n    }\n\n    .ai-summary-card__body {\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .ai-summary-card__summary {\n      p {\n        margin: 0;\n        font-size: 0.82rem;\n        color: #374151;\n        line-height: 1.55;\n        font-weight: 450;\n      }\n    }\n\n    .ai-summary-card__section-label {\n      font-size: 0.68rem;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      color: #9ca3af;\n      margin-bottom: 0.3rem;\n    }\n\n    .ai-summary-card__meta {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.55rem;\n    }\n\n    .ai-summary-meta-item {\n      display: flex;\n      align-items: center;\n      gap: 0.35rem;\n      padding: 0.35rem 0.65rem;\n      background: rgba(243, 244, 246, 0.7);\n      border-radius: 8px;\n      font-size: 0.76rem;\n      color: #4b5563;\n      transition: all 200ms ease;\n\n      > i {\n        font-size: 0.72rem;\n      }\n\n      .ai-summary-meta-label {\n        color: #9ca3af;\n        font-weight: 500;\n        margin-right: 0.15rem;\n      }\n\n      strong {\n        font-weight: 650;\n        color: #1f2937;\n      }\n\n      &.sentiment--positive {\n        background: rgba(34, 197, 94, 0.1);\n        > i { color: #22c55e; }\n        strong { color: #15803d; }\n      }\n\n      &.sentiment--cautious {\n        background: rgba(245, 158, 11, 0.1);\n        > i { color: #f59e0b; }\n        strong { color: #b45309; }\n      }\n\n      &.sentiment--negative {\n        background: rgba(239, 68, 68, 0.1);\n        > i { color: #ef4444; }\n        strong { color: #b91c1c; }\n      }\n\n      &.sentiment--neutral {\n        background: rgba(107, 114, 128, 0.1);\n        > i { color: #6b7280; }\n        strong { color: #374151; }\n      }\n\n      &--action {\n        background: rgba(99, 102, 241, 0.08);\n        > i { color: #6366f1; }\n        strong { color: #4338ca; }\n      }\n\n      &--time {\n        color: #9ca3af;\n        background: transparent;\n        font-size: 0.7rem;\n        padding: 0.3rem 0;\n      }\n    }\n\n    .ai-summary-card__empty,\n    .ai-summary-card__loading {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.5rem;\n      padding: 1.5rem 0.75rem;\n      color: #9ca3af;\n      font-size: 0.78rem;\n      text-align: center;\n\n      > i {\n        font-size: 1rem;\n        opacity: 0.7;\n      }\n    }\n\n    :host ::ng-deep .overview-accordion-shell.p-accordion,\n    :host ::ng-deep .tab-content-accordion-shell.p-accordion {\n      display: grid;\n      gap: 0.65rem;\n      background: transparent;\n      border: none;\n    }\n\n    :host ::ng-deep .overview-accordion-shell .p-accordionpanel,\n    :host ::ng-deep .tab-content-accordion-shell .p-accordionpanel {\n      border-radius: 14px;\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      background: rgba(255, 255, 255, 0.68);\n      box-shadow:\n        0 8px 22px rgba(15, 23, 42, 0.05),\n        inset 0 1px 0 rgba(255, 255, 255, 0.45);\n      overflow: hidden;\n      backdrop-filter: blur(10px);\n      -webkit-backdrop-filter: blur(10px);\n    }\n\n    :host ::ng-deep .overview-accordion-shell .p-accordionheader,\n    :host ::ng-deep .tab-content-accordion-shell .p-accordionheader {\n      border: 0;\n      background: transparent;\n    }\n\n    :host ::ng-deep .overview-accordion-shell .p-accordionheader .p-accordionheader-toggle-icon,\n    :host ::ng-deep .tab-content-accordion-shell .p-accordionheader .p-accordionheader-toggle-icon {\n      color: rgba(30, 41, 59, 0.7);\n      font-size: 0.85rem;\n    }\n\n    :host ::ng-deep .overview-accordion-shell .p-accordionheader .p-accordionheader-toggle-icon,\n    :host ::ng-deep .overview-accordion-shell .p-accordionheader .p-icon-wrapper,\n    :host ::ng-deep .tab-content-accordion-shell .p-accordionheader .p-accordionheader-toggle-icon,\n    :host ::ng-deep .tab-content-accordion-shell .p-accordionheader .p-icon-wrapper {\n      margin-inline-end: 0.25rem;\n    }\n\n    :host ::ng-deep .overview-accordion-shell .p-accordionheader,\n    :host ::ng-deep .overview-accordion-shell p-accordion-header,\n    :host ::ng-deep .tab-content-accordion-shell .p-accordionheader,\n    :host ::ng-deep .tab-content-accordion-shell p-accordion-header {\n      padding: 0.15rem 0.25rem;\n    }\n\n    :host ::ng-deep .overview-accordion-shell .p-accordioncontent,\n    :host ::ng-deep .overview-accordion-shell .p-accordioncontent-content,\n    :host ::ng-deep .tab-content-accordion-shell .p-accordioncontent,\n    :host ::ng-deep .tab-content-accordion-shell .p-accordioncontent-content {\n      background: transparent;\n      border: 0;\n    }\n\n    :host ::ng-deep .overview-accordion-shell .p-accordioncontent-content,\n    :host ::ng-deep .tab-content-accordion-shell .p-accordioncontent-content {\n      padding: 0 0.2rem 0.2rem;\n    }\n\n    .form-section--accordion-body {\n      padding: 0.35rem 0.4rem 0.45rem;\n      border: 0;\n      background: transparent;\n    }\n\n    .section-title--accordion {\n      margin: 0;\n      width: 100%;\n      border-bottom: 0;\n      padding: 0.45rem 0.55rem;\n      border-radius: 10px;\n      background: rgba(255, 255, 255, 0.35);\n    }\n\n    .section-title--accordion-summary {\n      gap: 0.45rem;\n    }\n\n    .accordion-header-summary {\n      margin-left: auto;\n      display: inline-flex;\n      align-items: center;\n      justify-content: flex-end;\n      gap: 0.35rem;\n      flex-wrap: wrap;\n      max-width: 68%;\n    }\n\n    .accordion-header-badge {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      min-height: 26px;\n      padding: 0.22rem 0.55rem;\n      border-radius: 999px;\n      font-size: 0.72rem;\n      font-weight: 800;\n      letter-spacing: 0.02em;\n      line-height: 1;\n      white-space: nowrap;\n      border: 1px solid rgba(148, 163, 184, 0.22);\n      background: rgba(255, 255, 255, 0.72);\n      color: rgba(var(--apple-secondary), 0.92);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.38),\n        0 4px 10px rgba(15, 23, 42, 0.05);\n    }\n\n    .accordion-header-badge--meta {\n      font-weight: 700;\n      font-size: 0.68rem;\n      padding-inline: 0.45rem;\n      background: rgba(255, 255, 255, 0.62);\n      color: rgba(var(--apple-gray-0), 0.86);\n      border-color: rgba(148, 163, 184, 0.2);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.32),\n        0 3px 8px rgba(15, 23, 42, 0.04);\n    }\n\n    .accordion-header-badge--meta[data-variant='cyan'] {\n      background: rgba(6, 182, 212, 0.13);\n      border-color: rgba(14, 165, 233, 0.26);\n      color: #0e7490;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.34),\n        0 4px 10px rgba(14, 165, 233, 0.08);\n    }\n\n    .accordion-header-badge--meta[data-variant='orange'] {\n      background: rgba(245, 158, 11, 0.14);\n      border-color: rgba(245, 158, 11, 0.24);\n      color: #b45309;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.26),\n        0 4px 10px rgba(245, 158, 11, 0.08);\n    }\n\n    .accordion-header-badge--meta[data-variant='danger'] {\n      background: rgba(239, 68, 68, 0.13);\n      border-color: rgba(239, 68, 68, 0.24);\n      color: #b91c1c;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.26),\n        0 4px 10px rgba(239, 68, 68, 0.08);\n    }\n\n    .accordion-header-badge--score[data-tone='high'] {\n      color: #065f46;\n      background: rgba(16, 185, 129, 0.14);\n      border-color: rgba(16, 185, 129, 0.24);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.22),\n        0 6px 12px rgba(16, 185, 129, 0.1);\n    }\n\n    .accordion-header-badge--score[data-tone='medium'] {\n      color: #92400e;\n      background: rgba(245, 158, 11, 0.14);\n      border-color: rgba(245, 158, 11, 0.24);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.22),\n        0 6px 12px rgba(245, 158, 11, 0.1);\n    }\n\n    .accordion-header-badge--score[data-tone='low'] {\n      color: #991b1b;\n      background: rgba(239, 68, 68, 0.14);\n      border-color: rgba(239, 68, 68, 0.24);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.22),\n        0 6px 12px rgba(239, 68, 68, 0.1);\n    }\n\n    .accordion-header-badge--score[data-tone='none'] {\n      opacity: 0.88;\n    }\n\n    @media (max-width: 760px) {\n      .section-title--accordion-summary {\n        align-items: flex-start;\n      }\n\n      .accordion-header-summary {\n        max-width: 100%;\n        width: 100%;\n        margin-left: 0;\n        justify-content: flex-start;\n        padding-top: 0.15rem;\n      }\n    }\n\n    .qualification-header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 1rem;\n      flex-wrap: wrap;\n      padding: 0.35rem 0;\n    }\n\n    .qualification-legend {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n      padding: 0.25rem 0.5rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.7);\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);\n    }\n\n    .legend-chips {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.4rem;\n      padding: 0.35rem 0.6rem;\n      border-radius: 999px;\n      background: rgba(248, 250, 252, 0.9);\n      border: 1px solid rgba(148, 163, 184, 0.25);\n    }\n\n    .qualification-feedback {\n      margin-top: 0.75rem;\n      padding: 0.9rem 1.1rem 1rem;\n      border-radius: 18px;\n      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(239, 246, 255, 0.75));\n      border: 1px solid rgba(59, 130, 246, 0.22);\n      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);\n      display: grid;\n      gap: 0.45rem;\n      position: relative;\n      overflow: hidden;\n    }\n\n    .qualification-feedback::before {\n      content: '';\n      position: absolute;\n      inset: 0;\n      background: radial-gradient(circle at 12% 0%, rgba(59, 130, 246, 0.16), transparent 55%);\n      pointer-events: none;\n    }\n\n    .qualification-feedback .feedback-title {\n      font-size: 0.78rem;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: rgba(30, 64, 175, 0.85);\n    }\n\n    .qualification-feedback .feedback-metrics {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.8rem;\n      align-items: center;\n      font-size: 0.92rem;\n      color: #0f172a;\n    }\n\n    .qualification-feedback .feedback-item {\n      padding: 0.25rem 0.55rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.9);\n      border: 1px solid rgba(148, 163, 184, 0.2);\n      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);\n    }\n\n    .feedback-icon {\n      font-size: 0.85rem;\n      color: rgba(59, 130, 246, 0.9);\n    }\n\n    .feedback-item--confidence {\n      color: rgba(37, 99, 235, 0.95);\n    }\n\n    .feedback-item--confidence .feedback-icon {\n      color: rgba(37, 99, 235, 0.95);\n    }\n\n    .feedback-item--truth {\n      color: rgba(5, 150, 105, 0.95);\n    }\n\n    .feedback-item--truth .feedback-icon {\n      color: rgba(5, 150, 105, 0.95);\n    }\n\n    .feedback-item--assumptions {\n      color: rgba(217, 119, 6, 0.95);\n    }\n\n    .feedback-item--assumptions .feedback-icon {\n      color: rgba(217, 119, 6, 0.95);\n    }\n\n    .feedback-item--weakest {\n      color: rgba(124, 58, 237, 0.95);\n    }\n\n    .feedback-item--weakest .feedback-icon {\n      color: rgba(124, 58, 237, 0.95);\n    }\n\n    .qualification-feedback .feedback-item {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.45rem;\n      font-weight: 600;\n    }\n\n    .qualification-feedback .feedback-state {\n      font-weight: 600;\n      color: rgba(71, 85, 105, 0.95);\n    }\n\n    .qualification-feedback .feedback-suggestions {\n      display: grid;\n      gap: 0.4rem;\n    }\n\n    .qualification-feedback .feedback-suggestions-list {\n      margin: 0;\n      padding-left: 1.1rem;\n      color: rgba(30, 64, 175, 0.85);\n      font-size: 0.9rem;\n      line-height: 1.3;\n    }\n\n    .legend-title {\n      font-size: 0.8rem;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n      color: rgba(71, 85, 105, 0.8);\n    }\n\n    .qualification-grid {\n      margin-top: 0.45rem;\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.6rem 0.75rem;\n    }\n\n    .qualification-grid .form-field {\n      border: 0;\n      border-radius: 0;\n      padding: 0;\n      background: transparent;\n      box-shadow: none;\n      flex-wrap: wrap;\n    }\n\n    .qualification-grid .form-field > label {\n      font-size: 0.78rem;\n      letter-spacing: 0.04em;\n      text-transform: uppercase;\n      color: rgba(71, 85, 105, 0.8);\n    }\n\n    .qual-info-icon {\n      font-size: 0.72rem;\n      color: #94a3b8;\n      margin-left: 0.25rem;\n      cursor: help;\n      vertical-align: middle;\n      transition: color 0.2s ease;\n\n      &:hover {\n        color: #667eea;\n      }\n    }\n\n    .select-option {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.55rem;\n    }\n\n    .option-icon {\n      font-size: 0.95rem;\n    }\n\n    .tone-unknown {\n      color: #64748b;\n    }\n\n    .tone-assumed {\n      color: #0ea5e9;\n    }\n\n    .tone-verified {\n      color: #16a34a;\n    }\n\n    .tone-invalid {\n      color: #ef4444;\n    }\n\n    .tone-neutral {\n      color: #a855f7;\n    }\n\n    .history-list {\n      display: grid;\n      gap: 0.85rem;\n      margin-top: 0.5rem;\n    }\n\n    .history-item {\n      padding: 0.85rem 1rem;\n      border-radius: 14px;\n      background: rgba(255, 255, 255, 0.7);\n      border: 1px solid rgba(15, 23, 42, 0.08);\n      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);\n      display: grid;\n      gap: 0.4rem;\n    }\n\n    .history-header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n    }\n\n    .history-time {\n      font-size: 0.85rem;\n      color: rgba(51, 65, 85, 0.75);\n    }\n\n    .history-meta {\n      font-size: 0.85rem;\n      color: rgba(51, 65, 85, 0.8);\n    }\n\n    .history-notes {\n      font-size: 0.9rem;\n      color: rgba(30, 41, 59, 0.9);\n    }\n\n    .history-empty {\n      padding: 0.85rem 1rem;\n      border-radius: 12px;\n      background: rgba(255, 255, 255, 0.5);\n      border: 1px dashed rgba(148, 163, 184, 0.6);\n      color: rgba(71, 85, 105, 0.9);\n      font-size: 0.9rem;\n    }\n\n    .history-empty__subtle {\n      display: block;\n      margin-top: 0.35rem;\n      font-size: 0.82rem;\n      color: rgba(71, 85, 105, 0.78);\n      line-height: 1.35;\n    }\n\n    .cadence-section {\n      border: 1px solid rgba(59, 130, 246, 0.18);\n    }\n\n    .cadence-grid {\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 1rem 1.25rem;\n    }\n\n    .cadence-actions {\n      margin-top: 1rem;\n      display: flex;\n      justify-content: flex-end;\n    }\n\n    .cadence-input {\n      width: 100%;\n      border-radius: 14px;\n      border: 1px solid rgba(148, 163, 184, 0.45);\n      background: rgba(255, 255, 255, 0.8);\n      padding: 0.7rem 0.85rem;\n      font-size: 0.95rem;\n      transition: border-color 0.2s ease, box-shadow 0.2s ease;\n    }\n\n    .cadence-input--readonly {\n      min-height: 3rem;\n      display: block;\n      line-height: 1.45;\n      color: #334155;\n      background: rgba(248, 250, 252, 0.92);\n      border-style: solid;\n      white-space: normal;\n      word-break: break-word;\n\n      strong {\n        font-weight: 700;\n      }\n    }\n\n    .cadence-input:focus {\n      outline: none;\n      border-color: rgba(59, 130, 246, 0.7);\n      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);\n    }\n\n    .cadence-history {\n      margin-top: 1.1rem;\n      display: grid;\n      gap: 0.6rem;\n    }\n\n    .cadence-item {\n      padding: 0.75rem 0.9rem;\n      border-radius: 14px;\n      border: 1px solid rgba(59, 130, 246, 0.18);\n      background: rgba(59, 130, 246, 0.06);\n      display: grid;\n      gap: 0.2rem;\n    }\n\n    .cadence-item__meta {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n      font-size: 0.9rem;\n      color: rgba(30, 41, 59, 0.85);\n    }\n\n    .cadence-item__outcome {\n      font-weight: 600;\n      color: rgba(15, 23, 42, 0.92);\n    }\n\n    .cadence-item__next {\n      font-size: 0.85rem;\n      color: rgba(15, 23, 42, 0.7);\n    }\n\n    .lead-activity-timeline {\n      margin-top: 1.15rem;\n      padding-top: 1rem;\n      border-top: 1px solid rgba(148, 163, 184, 0.24);\n      display: grid;\n      gap: 0.9rem;\n    }\n\n    .lead-activity-timeline__header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n    .lead-activity-timeline__header h3 {\n      margin: 0;\n      display: inline-flex;\n      align-items: center;\n      gap: 0.5rem;\n      font-size: 1.1rem;\n      font-weight: 800;\n      letter-spacing: 0.01em;\n      color: rgba(15, 23, 42, 0.92);\n    }\n\n    .lead-activity-timeline__header h3 i {\n      color: #2563eb;\n      filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.22));\n    }\n\n    .lead-activity-timeline__list {\n      display: grid;\n      gap: 0.75rem;\n    }\n\n    .lead-activity-timeline__item {\n      width: 100%;\n      display: grid;\n      grid-template-columns: auto 1fr;\n      gap: 0.75rem;\n      align-items: flex-start;\n      text-align: left;\n      border: 1px solid rgba(148, 163, 184, 0.28);\n      border-radius: 16px;\n      background:\n        linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(248, 250, 252, 0.7));\n      padding: 0.9rem 1rem;\n      cursor: pointer;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.75),\n        0 6px 14px rgba(15, 23, 42, 0.04);\n      transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease,\n        background-color 0.18s ease;\n    }\n\n    .lead-activity-timeline__item:hover {\n      border-color: rgba(59, 130, 246, 0.35);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.82),\n        0 12px 22px rgba(37, 99, 235, 0.09);\n      transform: translateY(-1px);\n    }\n\n    .lead-activity-timeline__icon {\n      width: 2.35rem;\n      height: 2.35rem;\n      border-radius: 12px;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      border: 1px solid rgba(148, 163, 184, 0.28);\n      background: rgba(255, 255, 255, 0.72);\n      color: rgba(51, 65, 85, 0.88);\n      font-size: 1rem;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.7),\n        0 4px 10px rgba(15, 23, 42, 0.05);\n      flex-shrink: 0;\n    }\n\n    .lead-activity-timeline__icon[data-type='Meeting'] {\n      color: #1d4ed8;\n      background: linear-gradient(180deg, rgba(191, 219, 254, 0.92), rgba(219, 234, 254, 0.8));\n      border-color: rgba(59, 130, 246, 0.32);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.72),\n        0 4px 12px rgba(59, 130, 246, 0.16);\n    }\n\n    .lead-activity-timeline__icon[data-type='Call'] {\n      color: #0e7490;\n      background: linear-gradient(180deg, rgba(165, 243, 252, 0.92), rgba(207, 250, 254, 0.84));\n      border-color: rgba(6, 182, 212, 0.32);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.72),\n        0 4px 12px rgba(6, 182, 212, 0.14);\n    }\n\n    .lead-activity-timeline__icon[data-type='Email'] {\n      color: #6d28d9;\n      background: linear-gradient(180deg, rgba(221, 214, 254, 0.94), rgba(237, 233, 254, 0.86));\n      border-color: rgba(139, 92, 246, 0.32);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.72),\n        0 4px 12px rgba(139, 92, 246, 0.14);\n    }\n\n    .lead-activity-timeline__icon[data-type='Task'] {\n      color: #15803d;\n      background: linear-gradient(180deg, rgba(187, 247, 208, 0.92), rgba(220, 252, 231, 0.84));\n      border-color: rgba(34, 197, 94, 0.32);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.72),\n        0 4px 12px rgba(34, 197, 94, 0.14);\n    }\n\n    .lead-activity-timeline__content {\n      min-width: 0;\n      display: grid;\n      gap: 0.35rem;\n    }\n\n    .lead-activity-timeline__top {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n    .lead-activity-timeline__subject {\n      font-weight: 700;\n      font-size: 1rem;\n      line-height: 1.25;\n      color: rgba(15, 23, 42, 0.94);\n    }\n\n    .lead-activity-timeline__status {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: 999px;\n      padding: 0.2rem 0.55rem;\n      font-size: 0.78rem;\n      font-weight: 800;\n      letter-spacing: 0.02em;\n      border: 1px solid rgba(148, 163, 184, 0.22);\n      background: rgba(255, 255, 255, 0.72);\n      color: rgba(51, 65, 85, 0.9);\n    }\n\n    .lead-activity-timeline__status[data-status='Completed'] {\n      color: #166534;\n      background: linear-gradient(180deg, rgba(187, 247, 208, 0.92), rgba(220, 252, 231, 0.85));\n      border-color: rgba(34, 197, 94, 0.3);\n    }\n\n    .lead-activity-timeline__status[data-status='Overdue'] {\n      color: #991b1b;\n      background: linear-gradient(180deg, rgba(254, 202, 202, 0.94), rgba(254, 226, 226, 0.9));\n      border-color: rgba(239, 68, 68, 0.3);\n    }\n\n    .lead-activity-timeline__status[data-status='Open'] {\n      color: #92400e;\n      background: linear-gradient(180deg, rgba(253, 230, 138, 0.92), rgba(254, 243, 199, 0.88));\n      border-color: rgba(245, 158, 11, 0.3);\n    }\n\n    .lead-activity-timeline__meta {\n      font-size: 0.9rem;\n      color: rgba(51, 65, 85, 0.82);\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.35rem;\n      line-height: 1.35;\n    }\n\n  .lead-activity-timeline__outcome {\n      font-size: 0.96rem;\n      color: rgba(30, 41, 59, 0.92);\n      line-height: 1.45;\n      background: rgba(59, 130, 246, 0.05);\n      border: 1px solid rgba(59, 130, 246, 0.12);\n      border-radius: 10px;\n      padding: 0.35rem 0.5rem;\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: vertical;\n      overflow: hidden;\n  }\n\n  .lead-activity-transfer-summary {\n    margin-top: 0.25rem;\n    display: grid;\n    gap: 0.55rem;\n    padding: 0.85rem 0.95rem;\n    border-radius: 14px;\n    border: 1px solid rgba(99, 102, 241, 0.22);\n    background: linear-gradient(180deg, rgba(238, 242, 255, 0.78), rgba(224, 231, 255, 0.6));\n    box-shadow: 0 10px 22px rgba(79, 70, 229, 0.08);\n  }\n\n  .lead-activity-transfer-summary__header {\n    display: inline-flex;\n    align-items: center;\n    gap: 0.45rem;\n    font-weight: 700;\n    color: #3730a3;\n  }\n\n  .lead-activity-transfer-summary__header i {\n    color: #4f46e5;\n  }\n\n  .lead-activity-transfer-summary__text {\n    margin: 0;\n    color: rgba(30, 41, 59, 0.88);\n    font-size: 0.9rem;\n    line-height: 1.35;\n  }\n\n  .lead-activity-transfer-summary__last {\n    display: grid;\n    gap: 0.2rem;\n    padding: 0.55rem 0.65rem;\n    border-radius: 10px;\n    border: 1px solid rgba(148, 163, 184, 0.18);\n    background: rgba(255, 255, 255, 0.7);\n  }\n\n  .lead-activity-transfer-summary__label {\n    font-size: 0.72rem;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: rgba(71, 85, 105, 0.78);\n    font-weight: 700;\n  }\n\n  .lead-activity-transfer-summary__last strong {\n    font-size: 0.95rem;\n    color: rgba(15, 23, 42, 0.95);\n  }\n\n  .lead-activity-transfer-summary__last > span:last-child {\n    font-size: 0.82rem;\n    color: rgba(71, 85, 105, 0.85);\n  }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       FORM SECTIONS - Premium Glass Cards with Hover Focus\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .form-section {\n      position: relative;\n      background: transparent;\n      border-radius: 0;\n      padding: 0.55rem 0.2rem 0.65rem;\n      border: 0;\n      box-shadow: none;\n      overflow: visible;\n    }\n\n    .form-section + .form-section {\n      border-top: 1px solid rgba(148, 163, 184, 0.2);\n      padding-top: 0.75rem;\n    }\n\n    .form-section--qualification {\n      padding-bottom: 0.9rem;\n    }\n\n    .form-section--overview {\n      display: flex;\n      flex-direction: column;\n      gap: 0.75rem;\n    }\n\n    .section-block {\n      display: flex;\n      flex-direction: column;\n      gap: 0.7rem;\n      padding: 0.7rem 0.75rem;\n      border-radius: 14px;\n      background: linear-gradient(\n        180deg,\n        rgba(255, 255, 255, 0.56) 0%,\n        rgba(255, 255, 255, 0.42) 100%\n      );\n      border: 1px solid rgba(148, 163, 184, 0.14);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.75),\n        0 6px 18px rgba(15, 23, 42, 0.04);\n    }\n\n    .section-divider {\n      height: 1px;\n      width: 100%;\n      background: rgba(148, 163, 184, 0.18);\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       SECTION HEADERS - Premium Typography\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .section-title {\n      display: flex;\n      align-items: center;\n      gap: 0.55rem;\n      font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n      font-size: 1rem;\n      font-weight: 600;\n      text-transform: none;\n      letter-spacing: -0.01em;\n      color: #0e7490;\n      margin: 0 0 0.4rem;\n      padding-bottom: 0.35rem;\n      border-bottom: 1px solid rgba(148, 163, 184, 0.2);\n      transition: all 0.3s ease;\n    }\n\n    .section-title i {\n      width: 30px;\n      height: 30px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(8, 145, 178, 0.1) 100%);\n      color: #06b6d4;\n      font-size: 0.95rem;\n      border-radius: 8px;\n      transition: all 0.3s ease;\n      box-shadow: 0 2px 8px rgba(6, 182, 212, 0.15);\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       FORM GRID\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .form-grid {\n      display: grid;\n      grid-template-columns: repeat(2, 1fr);\n      gap: 0.9rem 1rem;\n    }\n\n    .full-row {\n      grid-column: 1 / -1;\n    }\n\n    /* \u2500\u2500 Gold-standard horizontal form field \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n    .form-field {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      gap: 0.75rem;\n      padding: 0.35rem 0.45rem 0.45rem;\n      border-radius: 12px;\n      background: rgba(255, 255, 255, 0.35);\n      border: 1px solid transparent;\n      transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n      > label {\n        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n        font-size: 0.8125rem;\n        font-weight: 600;\n        color: #475569;\n        letter-spacing: 0.01em;\n        white-space: nowrap;\n        min-width: 110px;\n        flex-shrink: 0;\n        text-align: right;\n        transition: color 0.2s ease;\n      }\n\n      > p-inputgroup,\n      > :host ::ng-deep p-inputgroup,\n      > p-select,\n      > p-inputnumber,\n      > p-datepicker,\n      > input,\n      > textarea,\n      > .phone-grid,\n      > .score-content {\n        flex: 1;\n        min-width: 0;\n      }\n\n      &:hover {\n        background: rgba(255, 255, 255, 0.5);\n        border-color: rgba(148, 163, 184, 0.16);\n\n        > label { color: #334155; }\n      }\n\n      &:focus-within {\n        background: rgba(255, 255, 255, 0.72);\n        border-color: rgba(var(--apple-blue), 0.22);\n        box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n\n        > label { color: #4f46e5; }\n      }\n\n      &.full-row {\n        flex-direction: column;\n        align-items: stretch;\n\n        > label {\n          text-align: left;\n          min-width: unset;\n        }\n      }\n    }\n\n    .required {\n      color: rgba(var(--apple-pink), 1);\n      font-weight: 600;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       INPUT FIELDS - Premium Glass Inputs\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    :host ::ng-deep .p-inputtext,\n    :host ::ng-deep .p-select,\n    :host ::ng-deep .p-inputnumber,\n    :host ::ng-deep .p-textarea {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;\n      color: #1e293b !important;\n      font-weight: 500 !important;\n      background: rgba(var(--apple-gray-6), 0.5) !important;\n      border: 1px solid rgba(var(--apple-gray-4), 0.4) !important;\n      border-radius: 12px !important;\n      font-size: 0.9375rem !important;\n      padding: 0.75rem 1rem !important;\n      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      box-shadow: \n        inset 0 1px 2px rgba(0, 0, 0, 0.02),\n        0 1px 2px rgba(255, 255, 255, 0.5) !important;\n    }\n\n    :host ::ng-deep .p-inputgroup .phone-type-select {\n      min-width: 9rem;\n    }\n\n    :host ::ng-deep .p-inputgroup .phone-country-select {\n      min-width: 12rem;\n    }\n\n    :host ::ng-deep .p-inputgroup .p-inputtext {\n      min-width: 0;\n    }\n\n    .phone-grid {\n      display: grid;\n      grid-template-columns: minmax(9rem, 0.8fr) minmax(15rem, 1.4fr) minmax(16rem, 1.4fr);\n      gap: 0.6rem;\n      align-items: center;\n      padding: 0.35rem;\n      border-radius: 12px;\n      background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.42));\n      border: 1px solid rgba(59, 130, 246, 0.08);\n    }\n\n    .phone-country-option {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n\n      span {\n        white-space: nowrap;\n      }\n\n      strong {\n        color: rgba(var(--apple-blue), 1);\n        font-size: 0.8rem;\n      }\n    }\n\n    .field-note {\n      margin: 0.1rem 0 0;\n      font-size: 0.78rem;\n      color: rgba(var(--apple-secondary), 0.62);\n    }\n\n    :host ::ng-deep .p-inputtext:hover,\n    :host ::ng-deep .p-select:hover,\n    :host ::ng-deep .p-inputnumber:hover,\n    :host ::ng-deep .p-textarea:hover {\n      background: rgba(var(--apple-gray-5), 0.6) !important;\n      border-color: rgba(var(--apple-gray-3), 0.5) !important;\n      box-shadow: \n        inset 0 1px 2px rgba(0, 0, 0, 0.02),\n        0 2px 4px rgba(0, 0, 0, 0.02) !important;\n    }\n\n    :host ::ng-deep .p-inputtext:focus,\n    :host ::ng-deep .p-select:focus,\n    :host ::ng-deep .p-select.p-focus,\n    :host ::ng-deep .p-inputnumber:focus,\n    :host ::ng-deep .p-textarea:focus {\n      background: rgba(255, 255, 255, 0.95) !important;\n      border-color: rgba(var(--apple-blue), 0.5) !important;\n      box-shadow: \n        0 0 0 4px rgba(var(--apple-blue), 0.15),\n        0 4px 12px rgba(var(--apple-blue), 0.1),\n        inset 0 0 0 1px rgba(var(--apple-blue), 0.2) !important;\n      outline: none !important;\n    }\n\n    :host ::ng-deep .p-inputtext::placeholder {\n      color: rgba(var(--apple-gray-1), 0.6);\n      font-weight: 400;\n    }\n\n    :host ::ng-deep .p-select.p-disabled,\n    :host ::ng-deep .p-select[aria-disabled='true'] {\n      opacity: 0.82 !important;\n      filter: grayscale(0.04);\n      cursor: not-allowed !important;\n      pointer-events: none;\n      background: rgba(var(--apple-gray-6), 0.62) !important;\n      border-color: rgba(var(--apple-gray-4), 0.4) !important;\n      box-shadow: none !important;\n    }\n\n    :host ::ng-deep .form-section--qualification .p-select .p-select-label,\n    :host ::ng-deep .form-section--qualification .p-select .p-placeholder,\n    :host ::ng-deep .form-section--qualification .p-select .select-option span {\n      color: #334155 !important;\n      font-weight: 600 !important;\n    }\n\n    :host ::ng-deep .form-section--qualification .p-select .p-select-dropdown {\n      color: #94a3b8 !important;\n    }\n\n    .status-option {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.5rem;\n      font-weight: 600;\n    }\n\n    .status-option i {\n      font-size: 0.9rem;\n    }\n\n    @media (max-width: 860px) {\n      .phone-grid {\n        grid-template-columns: 1fr;\n        gap: 0.5rem;\n        padding: 0.45rem;\n      }\n\n    }\n\n    .status-placeholder {\n      color: rgba(var(--apple-gray-1), 0.6);\n      font-weight: 500;\n    }\n\n    .disposition-actions {\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n    .disposition-actions__hint {\n      font-size: 0.9rem;\n      color: rgba(var(--apple-gray-1), 0.78);\n    }\n\n    .form-field--status-fallback {\n      border: 1px dashed rgba(148, 163, 184, 0.32);\n      border-radius: 16px;\n      padding: 0.85rem;\n      background: rgba(248, 250, 252, 0.65);\n    }\n\n    .status-option[data-status=\"New\"] i { color: #06b6d4; }\n    .status-option[data-status=\"Contacted\"] i { color: #f59e0b; }\n    .status-option[data-status=\"Qualified\"] i { color: #10b981; }\n    .status-option[data-status=\"Converted\"] i { color: #6366f1; }\n    .status-option[data-status=\"Lost\"] i { color: #ef4444; }\n\n    .status-note {\n      margin: 0.5rem 0 0;\n      font-size: 0.82rem;\n      color: rgba(var(--apple-secondary), 0.7);\n\n      p { margin: 0; }\n\n      .status-action-link {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.3rem;\n        margin-top: 0.35rem;\n        font-size: 0.8rem;\n        font-weight: 600;\n        color: #4f46e5;\n        cursor: pointer;\n        transition: color 200ms;\n\n        &:hover { color: #4338ca; }\n\n        i { font-size: 0.75rem; }\n      }\n    }\n\n    .status-rule {\n      margin: 0.35rem 0 0;\n      font-size: 0.78rem;\n      color: rgba(100, 116, 139, 0.9);\n    }\n\n    .status-error {\n      margin: 0.25rem 0 0;\n      font-size: 0.8rem;\n      font-weight: 600;\n      color: #b91c1c;\n    }\n\n    .info-icon {\n      margin-left: 0.35rem;\n      color: rgba(99, 102, 241, 0.8);\n      cursor: pointer;\n    }\n\n    .status-note strong {\n      color: rgba(var(--apple-label), 0.9);\n    }\n\n    /* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 Lead Status Stepper \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n    .form-field--stepper {\n      flex-direction: column !important;\n      align-items: flex-start !important;\n\n      > label {\n        text-align: left;\n        min-width: unset;\n        margin-bottom: 0.35rem;\n      }\n    }\n\n    /* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 Status Ribbon (hero-integrated, inside header) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n    .status-ribbon {\n      flex: 1;\n      min-width: 0;\n      animation: fade-in-up 0.5s ease-out 0.15s both;\n    }\n\n    .status-ribbon__inner {\n      display: grid;\n      grid-template-columns: minmax(16rem, auto) minmax(0, 1fr);\n      align-items: end;\n      column-gap: 1.1rem;\n      row-gap: 0.45rem;\n      padding: 0.35rem 0.8rem;\n      background: rgba(255, 255, 255, 0.55);\n      -webkit-backdrop-filter: blur(16px);\n      backdrop-filter: blur(16px);\n      border: 1px solid rgba(255, 255, 255, 0.45);\n      border-radius: 14px;\n      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);\n      max-height: min(26rem, calc(100vh - 12rem));\n      overflow-y: auto;\n      overscroll-behavior: contain;\n\n      .lead-stepper--ribbon {\n        display: flex;\n        flex-direction: column;\n        align-items: stretch;\n        gap: 0.4rem;\n        flex: 1;\n        min-width: 0;\n        grid-column: 2;\n        align-self: end;\n      }\n\n      .lead-stepper__mobile-summary {\n        display: none;\n      }\n\n      .status-ribbon__meta-strip {\n        display: flex;\n        flex-direction: column;\n        align-items: flex-start;\n        justify-content: flex-end;\n        gap: 0.45rem;\n        padding-bottom: 0.7rem;\n        min-width: 0;\n        grid-column: 1;\n      }\n\n      .status-ribbon__score {\n        display: inline-flex;\n        align-items: center;\n        flex: 0 0 auto;\n      }\n\n      .status-ribbon__score-knob {\n        display: inline-flex;\n      }\n\n      :host ::ng-deep .status-ribbon__score-knob-control {\n        width: 92px;\n        height: 92px;\n      }\n\n      :host ::ng-deep .status-ribbon__score-knob-control .p-knob-text {\n        font-size: 1rem;\n        font-weight: 800;\n      }\n\n      .status-ribbon__meta-pills {\n        display: inline-flex;\n        gap: 0.35rem;\n        min-width: 0;\n        flex-wrap: wrap;\n      }\n\n      .status-ribbon__meta-pill {\n        display: inline-flex;\n        padding: 0.22rem 0.6rem;\n        border-radius: 999px;\n        color: #334155;\n        font-size: 0.74rem;\n      }\n\n      .status-ribbon__meta-pill--status {\n        color: #2563eb;\n        background: rgba(219, 234, 254, 0.82);\n      }\n\n      .status-ribbon__meta-copy {\n        color: #475569;\n        font-size: 0.8rem;\n      }\n\n      .lead-stepper__desktop-path {\n        display: block;\n        position: relative;\n        padding-bottom: 3.5rem;\n      }\n\n      .lead-stepper__track {\n        flex: 1;\n        padding: 0.1rem 0;\n      }\n\n      .lead-stepper__branch-lane {\n        position: absolute;\n        left: 50%;\n        top: 2.85rem;\n        width: 12.5rem;\n        height: 3.45rem;\n        transform: translateX(-50%);\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        gap: 0.35rem;\n      }\n\n      .lead-stepper__branch-stem {\n        position: static;\n        width: 2px;\n        height: 0.7rem;\n        border-left: none;\n        border-bottom: none;\n        border-radius: 999px;\n        background: rgba(148, 163, 184, 0.35);\n\n        &[data-state=\"current\"] {\n          background: linear-gradient(180deg, #8b5cf6, #7c3aed);\n        }\n\n        &[data-state=\"available\"] {\n          background: linear-gradient(180deg, rgba(99, 102, 241, 0.45), rgba(99, 102, 241, 0.18));\n        }\n\n        &[data-state=\"locked\"] {\n          background: rgba(148, 163, 184, 0.2);\n        }\n      }\n\n      .lead-stepper__icon {\n        width: 30px;\n        height: 30px;\n        font-size: 0.74rem;\n      }\n\n      .lead-stepper__label {\n        font-size: 0.64rem;\n        max-width: 72px;\n      }\n\n      .lead-stepper__connector {\n        min-width: 14px;\n      }\n\n      .lead-status-rail {\n        display: grid;\n        grid-template-columns: minmax(16rem, auto) minmax(0, 1fr);\n        align-items: start;\n        gap: 0.75rem;\n        padding-top: 0.15rem;\n        border-top: 1px solid rgba(148, 163, 184, 0.16);\n        grid-column: 1 / -1;\n      }\n    }\n\n    .status-ribbon__mobile-toggle {\n      display: none;\n    }\n\n    @media (max-width: 1180px) and (min-width: 769px) {\n      .status-ribbon__inner {\n        .lead-stepper__branch-lane {\n          top: 2.7rem;\n          width: 11.8rem;\n          height: 3.2rem;\n        }\n      }\n    }\n\n    @media (max-width: 768px) {\n      .status-ribbon__inner {\n        display: flex;\n        flex-direction: column;\n        align-items: stretch;\n        padding: 0.5rem 0.75rem;\n        border-radius: 12px;\n\n        .status-ribbon__meta-strip {\n          display: none;\n        }\n\n        .lead-status-rail {\n          display: flex;\n          flex-direction: column;\n        }\n\n        .lead-status-rail__actions {\n          width: 100%;\n          min-width: 0;\n          align-items: stretch;\n        }\n\n        .lead-status-rail__primary {\n          width: 100%;\n        }\n\n        .lead-status-rail__secondary {\n          justify-content: stretch;\n        }\n\n        .lead-stepper__branch-lane {\n          position: static;\n          width: auto;\n          height: auto;\n          transform: none;\n          display: flex;\n          align-items: flex-start;\n          gap: 0.65rem;\n          padding-left: 5.6rem;\n          margin-top: 0.2rem;\n        }\n\n        .lead-stepper__branch-stem {\n          position: static;\n          width: 2px;\n          height: 22px;\n          margin-left: 0.9rem;\n          border-left: none;\n          border-bottom: none;\n          border-radius: 999px;\n          background: rgba(148, 163, 184, 0.35);\n\n          &[data-state=\"current\"] {\n            background: linear-gradient(180deg, #8b5cf6, #7c3aed);\n          }\n\n          &[data-state=\"available\"] {\n            background: linear-gradient(180deg, rgba(99, 102, 241, 0.45), rgba(99, 102, 241, 0.18));\n          }\n\n          &[data-state=\"locked\"] {\n            background: rgba(148, 163, 184, 0.2);\n          }\n        }\n\n        .lead-stepper__branch {\n          position: static;\n        }\n      }\n\n      .status-ribbon__mobile-toggle {\n        display: flex;\n        justify-content: flex-end;\n      }\n\n      .status-ribbon__mobile-toggle-btn {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.4rem;\n        border: none;\n        background: transparent;\n        color: #2563eb;\n        font-weight: 700;\n        font-size: 0.82rem;\n        padding: 0;\n        cursor: pointer;\n      }\n\n      .status-ribbon .lead-stepper__mobile-summary {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        gap: 0.75rem;\n        padding: 0.7rem 0.85rem;\n        border-radius: 12px;\n        background: rgba(255, 255, 255, 0.82);\n        border: 1px solid rgba(148, 163, 184, 0.18);\n      }\n\n      .status-ribbon .lead-stepper__mobile-status {\n        font-size: 0.88rem;\n        font-weight: 700;\n        color: #0f172a;\n      }\n\n      .status-ribbon .lead-stepper__mobile-next {\n        font-size: 0.78rem;\n        color: #475569;\n        text-align: right;\n      }\n\n      .status-ribbon .lead-stepper__desktop-path {\n        display: none;\n      }\n\n      .status-ribbon .lead-stepper__desktop-path--expanded {\n        display: block;\n      }\n    }\n\n    .lead-status-rail__summary {\n      display: flex;\n      flex-direction: column;\n      gap: 0.25rem;\n      min-width: 0;\n      grid-column: 1;\n    }\n\n    .lead-status-rail__current {\n      display: flex;\n      flex-direction: column;\n      gap: 0.15rem;\n    }\n\n    .lead-status-rail__eyebrow {\n      font-size: 0.64rem;\n      font-weight: 700;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      color: #64748b;\n    }\n\n    .lead-status-rail__value {\n      font-size: 0.88rem;\n      font-weight: 700;\n      color: #0f172a;\n    }\n\n    .lead-status-rail__instruction {\n      margin: 0;\n      font-size: 0.8rem;\n      color: #334155;\n    }\n\n    .lead-status-rail__blocker-panel {\n      display: grid;\n      gap: 0.35rem;\n    }\n\n    .lead-status-rail__blocker-label {\n      font-size: 0.79rem;\n      font-weight: 700;\n      color: #92400e;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n    }\n\n    .lead-status-rail__blockers {\n      margin: 0;\n      padding-left: 1rem;\n      color: #b45309;\n      font-size: 0.84rem;\n      display: grid;\n      gap: 0.2rem;\n    }\n\n    .lead-status-rail__actions {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-end;\n      gap: 0.45rem;\n      min-width: 12rem;\n      grid-column: 2;\n      justify-self: end;\n      align-self: start;\n    }\n\n    .lead-status-rail__primary,\n    .lead-status-rail__branch,\n    .lead-status-rail__secondary-btn {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.45rem;\n      border-radius: 12px;\n      border: 1px solid rgba(59, 130, 246, 0.2);\n      padding: 0.55rem 0.85rem;\n      font-weight: 700;\n      cursor: pointer;\n      transition: all 0.2s ease;\n      white-space: nowrap;\n      font-size: 0.82rem;\n    }\n\n    .lead-status-rail__primary {\n      min-width: 11.75rem;\n      background: linear-gradient(135deg, #3b82f6, #2563eb);\n      color: #fff;\n      box-shadow: 0 10px 22px rgba(37, 99, 235, 0.24);\n    }\n\n    .lead-status-rail__branch {\n      min-width: 11.75rem;\n      background: linear-gradient(135deg, rgba(139, 92, 246, 0.16), rgba(124, 58, 237, 0.12));\n      color: #6d28d9;\n      border-color: rgba(124, 58, 237, 0.22);\n      box-shadow: 0 8px 20px rgba(124, 58, 237, 0.14);\n    }\n\n    .lead-status-rail__primary:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 14px 26px rgba(37, 99, 235, 0.28);\n    }\n\n    .lead-status-rail__branch:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 12px 24px rgba(124, 58, 237, 0.18);\n    }\n\n    .lead-status-rail__primary:disabled,\n    .lead-status-rail__branch:disabled,\n    .lead-status-rail__secondary-btn:disabled {\n      opacity: 0.55;\n      cursor: not-allowed;\n      box-shadow: none;\n    }\n\n    .lead-status-rail__secondary {\n      display: flex;\n      flex-wrap: wrap;\n      justify-content: flex-end;\n      gap: 0.55rem;\n    }\n\n    .lead-status-rail__secondary-btn {\n      background: rgba(255, 255, 255, 0.62);\n      color: #475569;\n      border-color: rgba(148, 163, 184, 0.18);\n      font-weight: 600;\n      box-shadow: none;\n    }\n\n    @media (max-width: 600px) {\n      .status-ribbon__inner {\n        .lead-stepper__icon {\n          width: 28px;\n          height: 28px;\n          font-size: 0.72rem;\n        }\n\n        .lead-stepper__label {\n          font-size: 0.6rem;\n          max-width: 50px;\n        }\n\n        .lead-stepper__connector {\n          min-width: 10px;\n        }\n\n        .lead-stepper__branch-lane {\n          padding-left: 5.2rem;\n        }\n\n        .lead-stepper__branch {\n          position: static;\n          min-width: 0;\n          width: 100%;\n        }\n      }\n    }\n\n    /* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 End Status Ribbon \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n    .lead-stepper {\n      width: 100%;\n    }\n\n    .lead-stepper__track {\n      display: flex;\n      align-items: center;\n      gap: 0;\n      padding: 0.6rem 0;\n    }\n\n    .lead-stepper__branch-lane {\n      position: absolute;\n      left: 50%;\n      top: 2.4rem;\n      width: 11.5rem;\n      height: 2.9rem;\n      transform: translateX(-50%);\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 0.2rem;\n    }\n\n    .lead-stepper__branch {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.7rem;\n      border: 1px solid rgba(148, 163, 184, 0.22);\n      border-radius: 14px;\n      background: rgba(255, 255, 255, 0.78);\n      padding: 0.36rem 0.58rem;\n      min-width: 11.5rem;\n      text-align: left;\n      transition: all 200ms ease;\n      cursor: default;\n      position: static;\n    }\n\n    .lead-stepper__branch--clickable {\n      cursor: pointer;\n\n      &:hover {\n        transform: translateY(-1px);\n        box-shadow: 0 10px 24px rgba(124, 58, 237, 0.14);\n      }\n    }\n\n    .lead-stepper__branch-icon {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 26px;\n      height: 26px;\n      border-radius: 50%;\n      background: rgba(139, 92, 246, 0.12);\n      color: #7c3aed;\n      flex-shrink: 0;\n    }\n\n    .lead-stepper__branch-copy {\n      display: flex;\n      flex-direction: column;\n      gap: 0.12rem;\n      min-width: 0;\n    }\n\n    .lead-stepper__branch-label {\n      font-size: 0.68rem;\n      font-weight: 700;\n      color: #4c1d95;\n    }\n\n    .lead-stepper__branch-meta {\n      font-size: 0.58rem;\n      color: #6b7280;\n    }\n\n    .lead-stepper__branch[data-state=\"current\"] {\n      border-color: rgba(124, 58, 237, 0.26);\n      background: linear-gradient(135deg, rgba(139, 92, 246, 0.14), rgba(255, 255, 255, 0.92));\n      box-shadow: 0 10px 22px rgba(124, 58, 237, 0.16);\n\n      .lead-stepper__branch-icon {\n        background: linear-gradient(135deg, #8b5cf6, #7c3aed);\n        color: #fff;\n      }\n    }\n\n    .lead-stepper__branch[data-state=\"locked\"] {\n      opacity: 0.55;\n    }\n\n    .lead-stepper__step {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 0.35rem;\n      flex-shrink: 0;\n      cursor: default;\n      transition: opacity 200ms, transform 200ms;\n    }\n\n    .lead-stepper__step--clickable {\n      cursor: pointer;\n\n      &:hover {\n        transform: translateY(-2px);\n\n        .lead-stepper__icon {\n          box-shadow: 0 4px 14px rgba(102, 126, 234, 0.35);\n          transform: scale(1.08);\n        }\n      }\n    }\n\n    .lead-stepper__icon {\n      width: 36px;\n      height: 36px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      font-size: 0.85rem;\n      font-weight: 600;\n      border: 2px solid transparent;\n      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    }\n\n    .lead-stepper__label {\n      font-size: 0.72rem;\n      font-weight: 600;\n      letter-spacing: 0.02em;\n      text-align: center;\n      max-width: 72px;\n      line-height: 1.2;\n      transition: color 200ms;\n    }\n\n    .lead-stepper__connector {\n      flex: 1;\n      min-width: 24px;\n      height: 2px;\n      background: rgba(148, 163, 184, 0.35);\n      margin: 0 0.15rem;\n      margin-bottom: 1.2rem; // offset for label height\n      border-radius: 1px;\n      transition: background 400ms;\n\n      &[data-filled=\"true\"] {\n        background: linear-gradient(90deg, #22c55e, #4ade80);\n      }\n    }\n\n    /* Step states */\n    .lead-stepper__step[data-state=\"completed\"] {\n      .lead-stepper__icon {\n        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);\n        color: #fff;\n        border-color: #22c55e;\n        box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);\n      }\n      .lead-stepper__label {\n        color: #16a34a;\n        font-weight: 700;\n      }\n    }\n\n    .lead-stepper__step[data-state=\"current\"] {\n      .lead-stepper__icon {\n        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n        color: #fff;\n        border-color: #667eea;\n        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.18), 0 4px 12px rgba(102, 126, 234, 0.25);\n        animation: stepper-pulse 2s ease-in-out infinite;\n      }\n      .lead-stepper__label {\n        color: #4338ca;\n        font-weight: 700;\n      }\n    }\n\n    .lead-stepper__step[data-state=\"available\"] {\n      .lead-stepper__icon {\n        background: rgba(255, 255, 255, 0.85);\n        color: #667eea;\n        border-color: rgba(102, 126, 234, 0.4);\n      }\n      .lead-stepper__label {\n        color: #475569;\n      }\n    }\n\n    .lead-stepper__step[data-state=\"locked\"] {\n      opacity: 0.5;\n      cursor: not-allowed;\n\n      .lead-stepper__icon {\n        background: rgba(148, 163, 184, 0.15);\n        color: #94a3b8;\n        border-color: rgba(148, 163, 184, 0.3);\n      }\n      .lead-stepper__label {\n        color: #94a3b8;\n      }\n    }\n\n    @keyframes stepper-pulse {\n      0%, 100% { box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.18), 0 4px 12px rgba(102, 126, 234, 0.25); }\n      50% { box-shadow: 0 0 0 6px rgba(102, 126, 234, 0.12), 0 4px 16px rgba(102, 126, 234, 0.35); }\n    }\n\n    /* Outcome buttons */\n    .lead-stepper__outcomes {\n      display: flex;\n      gap: 0.5rem;\n      margin-top: 0.6rem;\n      flex-wrap: wrap;\n    }\n\n    .lead-stepper__outcome {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.35rem;\n      padding: 0.35rem 0.75rem;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      font-weight: 600;\n      border: 1px solid;\n      cursor: pointer;\n      transition: all 200ms;\n      background: transparent;\n\n      &:disabled {\n        opacity: 0.4;\n        cursor: not-allowed;\n      }\n\n      i { font-size: 0.72rem; }\n\n      &--convert {\n        color: #6366f1;\n        border-color: rgba(99, 102, 241, 0.35);\n\n        &:not(:disabled):hover {\n          background: rgba(99, 102, 241, 0.1);\n          border-color: #6366f1;\n          transform: translateY(-1px);\n        }\n      }\n\n      &--lost {\n        color: #ef4444;\n        border-color: rgba(239, 68, 68, 0.3);\n\n        &:not(:disabled):hover {\n          background: rgba(239, 68, 68, 0.08);\n          border-color: #ef4444;\n        }\n      }\n\n      &--disqualified {\n        color: #94a3b8;\n        border-color: rgba(148, 163, 184, 0.35);\n\n        &:not(:disabled):hover {\n          background: rgba(148, 163, 184, 0.1);\n          border-color: #94a3b8;\n        }\n      }\n    }\n\n    .lead-stepper__outcome-active {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.4rem;\n      margin-top: 0.6rem;\n      padding: 0.4rem 0.85rem;\n      border-radius: 999px;\n      font-size: 0.82rem;\n      font-weight: 700;\n      background: rgba(99, 102, 241, 0.1);\n      color: #4338ca;\n      border: 1px solid rgba(99, 102, 241, 0.25);\n\n      i { font-size: 0.78rem; }\n    }\n\n    /* \u2500\u2500 Inline closure form (Strategy C \u2013 stepper morphs) \u2500\u2500 */\n    .lead-stepper__closure-form {\n      display: flex;\n      align-items: center;\n      gap: 0.4rem;\n      margin-top: 0.6rem;\n      flex-wrap: wrap;\n      animation: closure-slide-in 250ms ease-out;\n    }\n\n    .closure-form__label {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      font-size: 0.78rem;\n      font-weight: 700;\n      padding: 0.3rem 0.65rem;\n      border-radius: 999px;\n      white-space: nowrap;\n\n      .pi-times-circle { color: #ef4444; }\n      .pi-ban { color: #94a3b8; }\n    }\n\n    :host ::ng-deep .closure-form__select {\n      min-width: 160px;\n      max-width: 220px;\n      font-size: 0.78rem;\n\n      .p-select-label {\n        padding: 0.35rem 0.5rem;\n        font-size: 0.78rem;\n      }\n    }\n\n    .closure-form__input {\n      min-width: 100px;\n      max-width: 160px;\n      padding: 0.35rem 0.5rem !important;\n      font-size: 0.78rem !important;\n      border-radius: 8px;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: rgba(255, 255, 255, 0.7);\n      transition: border-color 200ms;\n\n      &:focus {\n        border-color: rgba(99, 102, 241, 0.5);\n        outline: none;\n        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);\n      }\n    }\n\n    .closure-form__confirm {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      padding: 0.35rem 0.7rem;\n      border-radius: 999px;\n      font-size: 0.75rem;\n      font-weight: 600;\n      border: none;\n      cursor: pointer;\n      color: white;\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n      transition: all 200ms;\n\n      &:hover:not(:disabled) {\n        transform: translateY(-1px);\n        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n      }\n\n      &:disabled {\n        opacity: 0.45;\n        cursor: not-allowed;\n      }\n\n      i { font-size: 0.7rem; }\n    }\n\n    .closure-form__cancel {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 26px;\n      height: 26px;\n      border-radius: 50%;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: rgba(255, 255, 255, 0.6);\n      color: #64748b;\n      cursor: pointer;\n      font-size: 0.72rem;\n      transition: all 200ms;\n\n      &:hover {\n        background: rgba(239, 68, 68, 0.08);\n        border-color: rgba(239, 68, 68, 0.3);\n        color: #ef4444;\n      }\n    }\n\n    @keyframes closure-slide-in {\n      from {\n        opacity: 0;\n        transform: translateX(10px);\n      }\n      to {\n        opacity: 1;\n        transform: translateX(0);\n      }\n    }\n\n    /* \u2500\u2500 Completed steps are also clickable for backward movement \u2500\u2500 */\n    .lead-stepper__step[data-state=\"completed\"].lead-stepper__step--clickable {\n      cursor: pointer;\n\n      &:hover {\n        .lead-stepper__icon {\n          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.4);\n          transform: scale(1.08);\n        }\n      }\n    }\n\n    /* \u2500\u2500 Time-in-stage duration label \u2500\u2500 */\n    .lead-stepper__duration {\n      font-size: 0.62rem;\n      font-weight: 600;\n      color: #667eea;\n      background: rgba(102, 126, 234, 0.1);\n      padding: 1px 6px;\n      border-radius: 999px;\n      letter-spacing: 0.02em;\n      margin-top: -2px;\n    }\n\n    /* \u2500\u2500 AI Score badge \u2500\u2500 */\n    .lead-stepper__score-badge {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.2rem;\n      padding: 0.2rem 0.5rem;\n      border-radius: 999px;\n      font-size: 0.7rem;\n      font-weight: 700;\n      margin-left: 0.3rem;\n      flex-shrink: 0;\n      transition: transform 200ms;\n\n      i { font-size: 0.62rem; }\n\n      &[data-quality=\"high\"] {\n        background: rgba(34, 197, 94, 0.15);\n        color: #16a34a;\n      }\n      &[data-quality=\"medium\"] {\n        background: rgba(245, 158, 11, 0.15);\n        color: #d97706;\n      }\n      &[data-quality=\"low\"] {\n        background: rgba(239, 68, 68, 0.12);\n        color: #dc2626;\n      }\n\n      &:hover {\n        transform: scale(1.08);\n      }\n    }\n\n    /* \u2500\u2500 Backward movement confirmation \u2500\u2500 */\n    .lead-stepper__backward-confirm {\n      display: flex;\n      align-items: center;\n      gap: 0.4rem;\n      margin-top: 0.6rem;\n      padding: 0.35rem 0.7rem;\n      border-radius: 999px;\n      background: rgba(245, 158, 11, 0.1);\n      border: 1px solid rgba(245, 158, 11, 0.3);\n      animation: closure-slide-in 250ms ease-out;\n\n      > i {\n        font-size: 0.78rem;\n        color: #d97706;\n      }\n\n      > span {\n        font-size: 0.78rem;\n        color: #92400e;\n        white-space: nowrap;\n\n        strong {\n          font-weight: 700;\n        }\n      }\n    }\n\n    .backward-confirm__yes {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.25rem;\n      padding: 0.25rem 0.55rem;\n      border-radius: 999px;\n      font-size: 0.72rem;\n      font-weight: 600;\n      border: none;\n      cursor: pointer;\n      color: white;\n      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\n      box-shadow: 0 2px 6px rgba(245, 158, 11, 0.3);\n      transition: all 200ms;\n\n      &:hover {\n        transform: translateY(-1px);\n        box-shadow: 0 4px 10px rgba(245, 158, 11, 0.4);\n      }\n\n      i { font-size: 0.65rem; }\n    }\n\n    .backward-confirm__no {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 24px;\n      height: 24px;\n      border-radius: 50%;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: rgba(255, 255, 255, 0.6);\n      color: #64748b;\n      cursor: pointer;\n      font-size: 0.65rem;\n      transition: all 200ms;\n\n      &:hover {\n        background: rgba(239, 68, 68, 0.08);\n        border-color: rgba(239, 68, 68, 0.3);\n        color: #ef4444;\n      }\n    }\n\n    /* \u2500\u2500 Inline convert form (Strategy C morph) \u2500\u2500 */\n    .lead-stepper__convert-form {\n      display: flex;\n      align-items: center;\n      gap: 0.4rem;\n      margin-top: 0.6rem;\n      flex-wrap: wrap;\n      animation: closure-slide-in 250ms ease-out;\n    }\n\n    .convert-form__label {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      font-size: 0.78rem;\n      font-weight: 700;\n      padding: 0.3rem 0.65rem;\n      border-radius: 999px;\n      color: #6366f1;\n      background: rgba(99, 102, 241, 0.1);\n      white-space: nowrap;\n\n      i { font-size: 0.72rem; }\n    }\n\n    .convert-form__message {\n      font-size: 0.75rem;\n      color: #475569;\n      white-space: nowrap;\n    }\n\n    .convert-form__confirm {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.3rem;\n      padding: 0.35rem 0.7rem;\n      border-radius: 999px;\n      font-size: 0.75rem;\n      font-weight: 600;\n      border: none;\n      cursor: pointer;\n      color: white;\n      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);\n      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);\n      transition: all 200ms;\n\n      &:hover {\n        transform: translateY(-1px);\n        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);\n      }\n\n      i { font-size: 0.7rem; }\n    }\n\n    .convert-form__cancel {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 26px;\n      height: 26px;\n      border-radius: 50%;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: rgba(255, 255, 255, 0.6);\n      color: #64748b;\n      cursor: pointer;\n      font-size: 0.72rem;\n      transition: all 200ms;\n\n      &:hover {\n        background: rgba(239, 68, 68, 0.08);\n        border-color: rgba(239, 68, 68, 0.3);\n        color: #ef4444;\n      }\n    }\n\n    /* \u2500\u2500 Compact audit trail \u2500\u2500 */\n    .stepper-audit-trail {\n      display: flex;\n      align-items: center;\n      gap: 0.3rem;\n      margin-top: 0.5rem;\n      padding: 0.3rem 0.6rem;\n      border-radius: 8px;\n      background: rgba(255, 255, 255, 0.5);\n      border: 1px solid rgba(148, 163, 184, 0.15);\n      flex-wrap: wrap;\n    }\n\n    .audit-trail__entry {\n      font-size: 0.65rem;\n      font-weight: 600;\n      padding: 1px 6px;\n      border-radius: 999px;\n      white-space: nowrap;\n\n      &[data-status=\"New\"] {\n        background: rgba(59, 130, 246, 0.12);\n        color: #2563eb;\n      }\n      &[data-status=\"Contacted\"] {\n        background: rgba(6, 182, 212, 0.12);\n        color: #0891b2;\n      }\n      &[data-status=\"Nurture\"] {\n        background: rgba(168, 85, 247, 0.12);\n        color: #7c3aed;\n      }\n      &[data-status=\"Qualified\"] {\n        background: rgba(34, 197, 94, 0.12);\n        color: #16a34a;\n      }\n      &[data-status=\"Converted\"] {\n        background: rgba(99, 102, 241, 0.12);\n        color: #4f46e5;\n      }\n      &[data-status=\"Lost\"] {\n        background: rgba(239, 68, 68, 0.1);\n        color: #dc2626;\n      }\n      &[data-status=\"Disqualified\"] {\n        background: rgba(148, 163, 184, 0.15);\n        color: #64748b;\n      }\n    }\n\n    .audit-trail__date {\n      font-size: 0.6rem;\n      color: #94a3b8;\n      white-space: nowrap;\n    }\n\n    .audit-trail__arrow {\n      font-size: 0.6rem;\n      color: #cbd5e1;\n    }\n\n    @media (max-width: 600px) {\n      .lead-stepper__track {\n        flex-wrap: wrap;\n        gap: 0.25rem;\n      }\n\n      .lead-stepper__connector {\n        min-width: 12px;\n      }\n\n      .lead-stepper__label {\n        font-size: 0.65rem;\n        max-width: 56px;\n      }\n\n      .lead-stepper__icon {\n        width: 30px;\n        height: 30px;\n        font-size: 0.75rem;\n      }\n\n      .lead-stepper__duration {\n        font-size: 0.55rem;\n      }\n\n      .lead-stepper__score-badge {\n        font-size: 0.6rem;\n      }\n\n      .lead-stepper__backward-confirm {\n        flex-wrap: wrap;\n      }\n\n      .lead-stepper__convert-form {\n        flex-wrap: wrap;\n      }\n\n      .stepper-audit-trail {\n        font-size: 0.58rem;\n      }\n    }\n\n    /* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 End Lead Status Stepper \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\n\n    .related-summary {\n      max-width: none;\n      width: calc(100% - 3rem);\n      margin: 1rem auto 0;\n      padding: 0.75rem 1rem;\n      border-radius: 16px;\n      background: rgba(255, 255, 255, 0.75);\n      border: 1px solid rgba(148, 163, 184, 0.25);\n      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);\n      display: grid;\n      gap: 0.5rem;\n      min-width: 0;\n    }\n\n    .related-summary--empty {\n      padding: 0.45rem 1rem;\n      gap: 0.2rem;\n      background: rgba(255, 255, 255, 0.48);\n      border-color: rgba(148, 163, 184, 0.16);\n      box-shadow: none;\n    }\n\n    .related-summary-label {\n      font-size: 0.78rem;\n      font-weight: 600;\n      letter-spacing: 0.04em;\n      text-transform: uppercase;\n      color: rgba(71, 85, 105, 0.75);\n    }\n\n    .related-summary-links {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.5rem;\n    }\n\n    .related-summary-link {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.45rem;\n      padding: 0.35rem 0.7rem;\n      border-radius: 999px;\n      border: 1px solid rgba(59, 130, 246, 0.25);\n      background: rgba(59, 130, 246, 0.08);\n      color: #1d4ed8;\n      font-weight: 600;\n      text-decoration: none;\n      font-size: 0.85rem;\n    }\n\n    .related-summary-link i {\n      font-size: 0.9rem;\n    }\n\n    .related-summary-link:hover {\n      background: rgba(59, 130, 246, 0.15);\n      color: #1e40af;\n    }\n\n    .related-summary-empty {\n      color: rgba(71, 85, 105, 0.8);\n      font-size: 0.85rem;\n    }\n\n    .related-summary--empty .related-summary-label {\n      color: rgba(100, 116, 139, 0.62);\n    }\n\n    .related-summary--empty .related-summary-empty {\n      font-size: 0.8rem;\n      color: rgba(100, 116, 139, 0.72);\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       CHECKBOX - Premium Toggle\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .checkbox-row {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.625rem;\n      margin-top: 0.5rem;\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 0.875rem;\n      font-weight: 500;\n      color: rgba(var(--apple-label), 0.8);\n      cursor: pointer;\n      user-select: none;\n      padding: 0.375rem 0.75rem 0.375rem 0;\n      border-radius: 8px;\n      transition: all 0.2s ease;\n    }\n\n    .checkbox-row:hover {\n      color: rgba(var(--apple-blue), 1);\n    }\n\n    .checkbox-row .p-checkbox {\n      display: inline-flex;\n      align-items: center;\n    }\n\n    :host ::ng-deep .p-checkbox .p-checkbox-box {\n      width: 22px !important;\n      height: 22px !important;\n      border-radius: 7px !important;\n      border: 1.5px solid rgba(var(--apple-gray-2), 0.8) !important;\n      background: rgba(255, 255, 255, 0.8) !important;\n      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;\n    }\n\n    :host ::ng-deep .p-checkbox .p-checkbox-box:hover {\n      border-color: rgba(var(--apple-blue), 0.5) !important;\n      background: rgba(255, 255, 255, 0.95) !important;\n    }\n\n    :host ::ng-deep .p-checkbox .p-checkbox-box.p-highlight {\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 1) 0%, \n        rgba(var(--apple-blue), 0.85) 100%) !important;\n      border-color: rgba(var(--apple-blue), 1) !important;\n      box-shadow: \n        0 2px 8px rgba(var(--apple-blue), 0.3),\n        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       HINT TEXT - Premium Info Box\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .hint-text {\n      margin: 0.5rem 0 0;\n      padding: 0.625rem 0.875rem;\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 0.75rem;\n      color: rgba(var(--apple-secondary), 0.6);\n      line-height: 1.5;\n      background: linear-gradient(135deg, \n        rgba(var(--apple-gray-6), 0.5) 0%, \n        rgba(var(--apple-gray-5), 0.3) 100%);\n      border-radius: 10px;\n      border: 1px solid rgba(var(--apple-gray-4), 0.3);\n      backdrop-filter: blur(10px);\n    }\n\n    .hint-text.compact {\n      margin-top: 0.35rem;\n      padding: 0.4rem 0.6rem;\n      font-size: 0.7rem;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       AI SCORE SECTION\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .ai-score-row {\n      margin-top: 1rem;\n      display: flex;\n      align-items: center;\n      gap: 1rem;\n      flex-wrap: wrap;\n    }\n\n    .ai-score-inline {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.5rem;\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 0.8125rem;\n      font-weight: 600;\n      padding: 0.5rem 0.875rem;\n      border-radius: 10px;\n      backdrop-filter: blur(8px);\n      transition: all 0.2s ease;\n    }\n\n    .ai-score-inline i {\n      font-size: 0.875rem;\n    }\n\n    .ai-score-inline.is-success {\n      color: rgb(52, 199, 89);\n      background: linear-gradient(135deg, \n        rgba(52, 199, 89, 0.12) 0%, \n        rgba(52, 199, 89, 0.08) 100%);\n      border: 1px solid rgba(52, 199, 89, 0.2);\n    }\n\n    .ai-score-inline.is-info {\n      color: rgba(var(--apple-blue), 1);\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.12) 0%, \n        rgba(var(--apple-blue), 0.08) 100%);\n      border: 1px solid rgba(var(--apple-blue), 0.2);\n    }\n\n    .ai-score-inline.is-warn {\n      color: rgb(255, 149, 0);\n      background: linear-gradient(135deg, \n        rgba(255, 149, 0, 0.12) 0%, \n        rgba(255, 149, 0, 0.08) 100%);\n      border: 1px solid rgba(255, 149, 0, 0.2);\n    }\n\n    .ai-score-inline.is-error {\n      color: rgba(var(--apple-pink), 1);\n      background: linear-gradient(135deg, \n        rgba(var(--apple-pink), 0.12) 0%, \n        rgba(var(--apple-pink), 0.08) 100%);\n      border: 1px solid rgba(var(--apple-pink), 0.2);\n    }\n\n    :host ::ng-deep .ai-score-progress {\n      width: 140px;\n      height: 4px;\n      border-radius: 2px;\n      background: rgba(var(--apple-gray-4), 0.4);\n      overflow: hidden;\n    }\n\n    :host ::ng-deep .ai-score-progress .p-progressbar-value {\n      background: linear-gradient(90deg, \n        rgba(var(--apple-blue), 1) 0%, \n        rgba(var(--apple-purple), 0.9) 50%,\n        rgba(var(--apple-teal), 1) 100%);\n      border-radius: 2px;\n      animation: shimmer 2s ease-in-out infinite;\n    }\n\n    @keyframes shimmer {\n      0% { background-position: -200% 0; }\n      100% { background-position: 200% 0; }\n    }\n\n    :host ::ng-deep .ai-score-progress--top {\n      width: 100%;\n      height: 3px;\n      margin: 0.625rem 0 1rem;\n    }\n\n    .score-field {\n      grid-column: 1 / -1;\n    }\n\n    .score-meta {\n      margin-top: 0.5rem;\n      display: flex;\n      align-items: center;\n      gap: 0.75rem;\n      flex-wrap: wrap;\n    }\n\n    :host ::ng-deep .score-meta .p-tag {\n      font-size: 0.6875rem;\n      font-weight: 600;\n      border-radius: 999px;\n      padding: 0.25rem 0.6rem;\n      background: rgba(var(--apple-blue), 0.12);\n      color: rgba(var(--apple-blue), 0.95);\n      border: 1px solid rgba(var(--apple-blue), 0.2);\n    }\n\n    .qualification-header h3 {\n      margin: 0;\n      font-size: 0.95rem;\n      font-weight: 700;\n      color: rgba(var(--apple-secondary), 0.9);\n    }\n\n    .score-breakdown {\n      margin-top: 0.5rem;\n      padding: 0.95rem 1rem 1rem;\n      border-radius: 12px;\n      border: 1px solid rgba(148, 163, 184, 0.26);\n      background:\n        linear-gradient(160deg, rgba(255, 255, 255, 0.86) 0%, rgba(239, 246, 255, 0.62) 45%, rgba(236, 254, 255, 0.66) 100%);\n      backdrop-filter: blur(14px) saturate(1.12);\n      position: relative;\n      overflow: hidden;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.8),\n        0 10px 24px rgba(15, 23, 42, 0.09),\n        0 1px 0 rgba(6, 182, 212, 0.05);\n    }\n\n    .score-breakdown::before {\n      content: '';\n      position: absolute;\n      inset: 0 auto auto 0;\n      height: 2px;\n      width: 100%;\n      background: linear-gradient(90deg, rgba(56, 189, 248, 0.95), rgba(14, 165, 233, 0.75), rgba(6, 182, 212, 0.8));\n      opacity: 0.9;\n      pointer-events: none;\n    }\n\n    .score-breakdown__header {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 0.75rem;\n      margin-bottom: 0.7rem;\n    }\n\n    .score-breakdown__title {\n      display: flex;\n      flex-direction: column;\n      gap: 0.12rem;\n    }\n\n    .score-breakdown__title strong {\n      font-size: 1.06rem;\n      line-height: 1.2;\n      font-weight: 800;\n      color: rgba(var(--apple-secondary), 0.92);\n    }\n\n    .score-formula {\n      font-size: 0.82rem;\n      color: rgba(71, 85, 105, 0.86);\n      font-style: italic;\n      line-height: 1.35;\n    }\n\n    .score-breakdown__title .eyebrow {\n      font-size: 0.76rem;\n      letter-spacing: 0.08em;\n      text-transform: uppercase;\n      font-weight: 600;\n      color: rgba(14, 116, 144, 0.82);\n    }\n\n    .score-breakdown__summary {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.4rem;\n      flex-wrap: wrap;\n      justify-content: flex-end;\n    }\n\n    .cqvs-group-grid {\n      margin: 0.6rem 0 0.75rem;\n      display: grid;\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n      gap: 0.65rem;\n    }\n\n    .cqvs-group-card {\n      border: 1px solid rgba(14, 165, 233, 0.18);\n      border-radius: 10px;\n      background: rgba(255, 255, 255, 0.72);\n      padding: 0.62rem 0.7rem;\n      display: grid;\n      gap: 0.45rem;\n      box-shadow:\n        inset 0 1px 0 rgba(255,255,255,0.45),\n        0 8px 16px rgba(15, 23, 42, 0.05);\n    }\n\n    .cqvs-group-card[data-cqvs='C'] {\n      border-color: rgba(59, 130, 246, 0.26);\n      background: linear-gradient(180deg, rgba(239, 246, 255, 0.82), rgba(255, 255, 255, 0.74));\n    }\n\n    .cqvs-group-card[data-cqvs='Q'] {\n      border-color: rgba(14, 165, 233, 0.28);\n      background: linear-gradient(180deg, rgba(236, 254, 255, 0.86), rgba(255, 255, 255, 0.74));\n    }\n\n    .cqvs-group-card[data-cqvs='V'] {\n      border-color: rgba(245, 158, 11, 0.26);\n      background: linear-gradient(180deg, rgba(255, 251, 235, 0.88), rgba(255, 255, 255, 0.74));\n    }\n\n    .cqvs-group-card[data-cqvs='S'] {\n      border-color: rgba(168, 85, 247, 0.24);\n      background: linear-gradient(180deg, rgba(250, 245, 255, 0.86), rgba(255, 255, 255, 0.74));\n    }\n\n    .cqvs-group-card__head {\n      display: flex;\n      align-items: center;\n      gap: 0.48rem;\n    }\n\n    .cqvs-group-card__title {\n      display: grid;\n      gap: 0.08rem;\n    }\n\n    .cqvs-group-card__title strong {\n      font-size: 0.9rem;\n      color: rgba(var(--apple-secondary), 0.9);\n      line-height: 1.15;\n    }\n\n    .cqvs-group-card__title span {\n      font-size: 0.76rem;\n      color: rgba(71, 85, 105, 0.88);\n      line-height: 1.2;\n    }\n\n    .cqvs-group-card__metrics {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.35rem;\n    }\n\n    .cqvs-code {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 24px;\n      height: 24px;\n      border-radius: 999px;\n      background: rgba(2, 132, 199, 0.16);\n      border: 1px solid rgba(14, 165, 233, 0.28);\n      color: rgba(3, 105, 161, 0.95);\n      font-weight: 800;\n      font-size: 0.76rem;\n      letter-spacing: 0.04em;\n    }\n\n    .cqvs-code[data-cqvs='C'] {\n      background: rgba(59, 130, 246, 0.14);\n      border-color: rgba(59, 130, 246, 0.3);\n      color: #1d4ed8;\n    }\n\n    .cqvs-code[data-cqvs='Q'] {\n      background: rgba(14, 165, 233, 0.14);\n      border-color: rgba(14, 165, 233, 0.3);\n      color: #0369a1;\n    }\n\n    .cqvs-code[data-cqvs='V'] {\n      background: rgba(245, 158, 11, 0.14);\n      border-color: rgba(245, 158, 11, 0.3);\n      color: #b45309;\n    }\n\n    .cqvs-code[data-cqvs='S'] {\n      background: rgba(168, 85, 247, 0.14);\n      border-color: rgba(168, 85, 247, 0.28);\n      color: #7c3aed;\n    }\n\n    .confidence-gauge {\n      display: flex;\n      align-items: center;\n      gap: 0.8rem;\n      color: rgba(var(--apple-secondary), 0.7);\n    }\n\n    .confidence-gauge-panel {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n      margin-bottom: 0.45rem;\n      border-radius: 12px;\n      padding: 0.35rem 0.5rem;\n      background: rgba(255, 255, 255, 0.58);\n      border: 1px solid rgba(148, 163, 184, 0.2);\n    }\n\n    .confidence-gauge-panel.compact {\n      border-radius: 10px;\n    }\n\n    .confidence-gauge__label {\n      font-size: 0.82rem;\n      font-weight: 600;\n      color: rgba(var(--apple-secondary), 0.8);\n    }\n\n    :host ::ng-deep .confidence-gauge__knob {\n      width: 70px;\n    }\n\n    :host ::ng-deep .confidence-gauge__knob .p-knob-text {\n      font-weight: 600;\n      font-size: 0.92rem;\n    }\n\n    .confidence-pill {\n      font-size: 0.78rem;\n      font-weight: 600;\n      line-height: 1;\n      padding: 0.34rem 0.7rem;\n      border-radius: 999px;\n      background: rgba(56, 189, 248, 0.13);\n      color: rgba(3, 105, 161, 0.95);\n      border: 1px solid rgba(14, 165, 233, 0.25);\n    }\n\n    .total-pill {\n      font-size: 0.78rem;\n      font-weight: 700;\n      line-height: 1;\n      padding: 0.34rem 0.7rem;\n      border-radius: 999px;\n      background: rgba(15, 118, 110, 0.12);\n      color: rgba(15, 118, 110, 0.95);\n      border: 1px solid rgba(13, 148, 136, 0.26);\n    }\n\n    :host ::ng-deep .score-breakdown-table {\n      margin-top: 0.25rem;\n    }\n\n    :host ::ng-deep .score-breakdown-table .p-datatable-thead > tr > th {\n      background: rgba(248, 250, 252, 0.86);\n      border-color: rgba(148, 163, 184, 0.22);\n      color: rgba(71, 85, 105, 0.92);\n      font-size: 0.79rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n      padding: 0.58rem 0.6rem;\n    }\n\n    :host ::ng-deep .score-breakdown-table .p-datatable-tbody > tr > td {\n      border-color: rgba(148, 163, 184, 0.2);\n      padding: 0.58rem 0.6rem;\n      font-size: 0.88rem;\n      color: rgba(30, 41, 59, 0.92);\n      vertical-align: middle;\n      background: rgba(255, 255, 255, 0.62);\n    }\n\n    .col-factor {\n      font-weight: 700;\n      color: #0f172a;\n    }\n\n    .col-cqvs {\n      width: 60px;\n      text-align: center;\n    }\n\n    .cqvs-badge {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      width: 26px;\n      height: 26px;\n      border-radius: 999px;\n      background: rgba(3, 105, 161, 0.16);\n      border: 1px solid rgba(14, 165, 233, 0.3);\n      color: rgba(3, 105, 161, 0.95);\n      font-size: 0.82rem;\n      font-weight: 800;\n      letter-spacing: 0.04em;\n    }\n\n    .cqvs-badge[data-cqvs='C'] {\n      background: rgba(59, 130, 246, 0.16);\n      border-color: rgba(59, 130, 246, 0.3);\n      color: #1d4ed8;\n    }\n\n    .cqvs-badge[data-cqvs='Q'] {\n      background: rgba(14, 165, 233, 0.16);\n      border-color: rgba(14, 165, 233, 0.3);\n      color: #0369a1;\n    }\n\n    .cqvs-badge[data-cqvs='V'] {\n      background: rgba(245, 158, 11, 0.16);\n      border-color: rgba(245, 158, 11, 0.3);\n      color: #b45309;\n    }\n\n    .cqvs-badge[data-cqvs='S'] {\n      background: rgba(168, 85, 247, 0.16);\n      border-color: rgba(168, 85, 247, 0.28);\n      color: #7c3aed;\n    }\n\n    .col-weight,\n    .col-score {\n      white-space: nowrap;\n      font-weight: 700;\n    }\n\n    .col-selected,\n    .col-evidence {\n      color: rgba(51, 65, 85, 0.92);\n      max-width: 240px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n\n    .col-contribution {\n      min-width: 130px;\n      display: inline-flex;\n      align-items: center;\n      gap: 0.4rem;\n      white-space: nowrap;\n    }\n\n    .confidence-badge {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.14rem 0.44rem;\n      border-radius: 999px;\n      font-size: 0.78rem;\n      font-weight: 700;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: rgba(148, 163, 184, 0.14);\n      color: rgba(51, 65, 85, 0.92);\n    }\n\n    :host ::ng-deep .score-breakdown-table .p-datatable-tbody > tr:hover > td {\n      background: rgba(255, 255, 255, 0.9);\n    }\n\n    @media (max-width: 900px) {\n      .score-breakdown {\n        padding: 0.8rem 0.8rem 0.9rem;\n      }\n\n      .score-breakdown__header {\n        flex-direction: column;\n        align-items: stretch;\n      }\n\n      .score-breakdown__summary {\n        justify-content: flex-start;\n      }\n    }\n\n    .confidence-badge[data-confidence='verified'] {\n      background: rgba(56, 189, 248, 0.12);\n      color: rgba(2, 132, 199, 0.96);\n      border-color: rgba(14, 165, 233, 0.3);\n    }\n\n    .confidence-badge[data-confidence='assumed'] {\n      background: rgba(251, 146, 60, 0.14);\n      color: rgba(194, 65, 12, 0.96);\n      border-color: rgba(249, 115, 22, 0.32);\n    }\n\n    .confidence-badge[data-confidence='invalid'] {\n      background: rgba(248, 113, 113, 0.12);\n      color: rgba(185, 28, 28, 0.95);\n      border-color: rgba(248, 113, 113, 0.3);\n    }\n\n    .confidence-badge[data-confidence='unknown'] {\n      background: rgba(148, 163, 184, 0.14);\n      color: rgba(71, 85, 105, 0.92);\n      border-color: rgba(148, 163, 184, 0.32);\n    }\n\n    .factor-rail {\n      width: 72px;\n      height: 5px;\n      background: rgba(148, 163, 184, 0.24);\n      overflow: hidden;\n      position: relative;\n    }\n\n    .factor-rail.compact {\n      width: 64px;\n    }\n\n    .factor-rail__fill {\n      display: block;\n      height: 100%;\n      min-width: 2px;\n      border-radius: inherit;\n      background: linear-gradient(90deg, rgba(56, 189, 248, 0.95), rgba(14, 165, 233, 0.8));\n      transition: width 180ms ease;\n    }\n\n    .risk-flags {\n      margin-top: 0.45rem;\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.4rem;\n      align-items: center;\n    }\n\n    .risk-label {\n      font-size: 0.68rem;\n      font-weight: 700;\n      letter-spacing: 0.05em;\n      text-transform: uppercase;\n      color: rgba(185, 28, 28, 0.78);\n    }\n\n    .risk-flag {\n      font-size: 0.68rem;\n      padding: 0.24rem 0.52rem;\n      border-radius: 999px;\n      background: rgba(254, 226, 226, 0.76);\n      color: rgba(185, 28, 28, 0.9);\n      border: 1px solid rgba(248, 113, 113, 0.3);\n    }\n\n    @media (max-width: 900px) {\n      .cqvs-group-grid {\n        grid-template-columns: 1fr;\n      }\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       AI BUTTON - Premium Pill Button (Keeping the style user likes)\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    :host ::ng-deep .ai-score-button {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif !important;\n      border-radius: 980px !important;\n      font-weight: 600 !important;\n      font-size: 0.875rem !important;\n      padding: 0.625rem 1.25rem !important;\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 1) 0%, \n        rgba(var(--apple-purple), 0.9) 100%) !important;\n      border: none !important;\n      color: white !important;\n      box-shadow: \n        0 2px 4px rgba(0, 0, 0, 0.1),\n        0 4px 12px rgba(var(--apple-blue), 0.25),\n        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;\n      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;\n      letter-spacing: -0.01em !important;\n    }\n\n    :host ::ng-deep .ai-score-button:hover {\n      background: linear-gradient(135deg, \n        rgba(var(--apple-blue), 0.9) 0%, \n        rgba(var(--apple-purple), 0.85) 100%) !important;\n      transform: translateY(-1px) scale(1.02) !important;\n      box-shadow: \n        0 4px 8px rgba(0, 0, 0, 0.12),\n        0 8px 20px rgba(var(--apple-blue), 0.3),\n        inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;\n    }\n\n    :host ::ng-deep .ai-score-button:active {\n      transform: translateY(0) scale(0.98) !important;\n      box-shadow: \n        0 1px 3px rgba(0, 0, 0, 0.1),\n        0 2px 8px rgba(var(--apple-blue), 0.2),\n        inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;\n    }\n\n    :host ::ng-deep .ai-score-button .pi {\n      font-size: 0.9375rem;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       LEAD FORM BUTTONS - Primary / Secondary / Accent\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .lead-btn {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      gap: 0.5rem;\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 1rem;\n      font-weight: 600;\n      letter-spacing: -0.01em;\n      padding: 0.75rem 1.75rem;\n      border-radius: 12px;\n      border: none;\n      cursor: pointer;\n      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n      white-space: nowrap;\n      min-width: 140px;\n\n      i { font-size: 1rem; }\n    }\n\n    .lead-btn--primary {\n      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n      color: #fff;\n      box-shadow:\n        0 4px 14px rgba(102, 126, 234, 0.4),\n        inset 0 1px 0 rgba(255, 255, 255, 0.15);\n\n      &:hover:not(:disabled) {\n        transform: translateY(-2px);\n        box-shadow:\n          0 6px 20px rgba(102, 126, 234, 0.5),\n          inset 0 1px 0 rgba(255, 255, 255, 0.2);\n      }\n\n      &:active:not(:disabled) {\n        transform: translateY(0) scale(0.98);\n      }\n\n      &:disabled {\n        background: rgba(var(--apple-gray-4), 0.8);\n        color: rgba(var(--apple-gray-1), 1);\n        box-shadow: none;\n        cursor: not-allowed;\n      }\n    }\n\n    .lead-btn--secondary {\n      background: rgba(255, 255, 255, 0.75);\n      -webkit-backdrop-filter: blur(12px);\n      backdrop-filter: blur(12px);\n      border: 1px solid rgba(var(--apple-gray-3), 0.5);\n      color: rgba(var(--apple-label), 0.8);\n      box-shadow:\n        0 1px 4px rgba(0, 0, 0, 0.05),\n        inset 0 1px 0 rgba(255, 255, 255, 0.8);\n\n      &:hover {\n        background: rgba(255, 255, 255, 0.92);\n        border-color: rgba(var(--apple-gray-2), 0.6);\n        color: rgba(var(--apple-label), 0.95);\n        transform: translateY(-1px);\n        box-shadow:\n          0 3px 10px rgba(0, 0, 0, 0.07),\n          inset 0 1px 0 rgba(255, 255, 255, 1);\n      }\n\n      &:active {\n        transform: translateY(0) scale(0.98);\n      }\n    }\n\n    .lead-btn--accent {\n      background: rgba(255, 255, 255, 0.65);\n      -webkit-backdrop-filter: blur(12px);\n      backdrop-filter: blur(12px);\n      border: 1px solid rgba(99, 102, 241, 0.25);\n      color: #6366f1;\n      box-shadow:\n        0 1px 4px rgba(99, 102, 241, 0.08),\n        inset 0 1px 0 rgba(255, 255, 255, 0.7);\n      padding: 0.6rem 1.25rem;\n      min-width: unset;\n\n      &:hover {\n        background: rgba(99, 102, 241, 0.08);\n        border-color: rgba(99, 102, 241, 0.4);\n        transform: translateY(-1px);\n        box-shadow:\n          0 3px 12px rgba(99, 102, 241, 0.15),\n          inset 0 1px 0 rgba(255, 255, 255, 0.8);\n      }\n\n      &:active {\n        transform: translateY(0) scale(0.98);\n      }\n    }\n\n    .form-actions {\n      display: flex;\n      justify-content: flex-end;\n      gap: 0.75rem;\n      padding-top: 1rem;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       RESPONSIVE\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    @media (max-width: 768px) {\n      .page-header {\n        padding: 1rem;\n        max-height: calc(100vh - 0.5rem);\n      }\n\n      .form-container {\n        padding: 1rem;\n      }\n\n      .form-section {\n        padding: 0.45rem 0;\n        border-radius: 0;\n      }\n\n      .form-grid {\n        grid-template-columns: 1fr;\n        gap: 0.55rem;\n      }\n\n      .cadence-grid {\n        grid-template-columns: 1fr;\n      }\n\n      .cadence-actions {\n        justify-content: stretch;\n      }\n\n      .form-actions {\n        flex-direction: column;\n      }\n\n      .lead-btn {\n        width: 100%;\n        min-width: auto;\n      }\n\n      .status-ribbon__inner {\n        max-height: calc(100vh - 9.5rem);\n      }\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       CUSTOM SCROLLBAR - Premium Style\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    :host {\n      scrollbar-width: thin;\n      scrollbar-color: rgba(var(--apple-gray-2), 0.4) transparent;\n    }\n\n    :host::-webkit-scrollbar {\n      width: 10px;\n    }\n\n    :host::-webkit-scrollbar-track {\n      background: transparent;\n    }\n\n    :host::-webkit-scrollbar-thumb {\n      background: rgba(var(--apple-gray-2), 0.4);\n      border-radius: 5px;\n      border: 3px solid transparent;\n      background-clip: content-box;\n    }\n\n    :host::-webkit-scrollbar-thumb:hover {\n      background: rgba(var(--apple-gray-1), 0.5);\n      background-clip: content-box;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       FOCUS STATES - Premium Accessibility Ring\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    :host ::ng-deep *:focus-visible {\n      outline: none;\n      box-shadow: \n        0 0 0 3px rgba(var(--apple-blue), 0.25),\n        0 0 0 6px rgba(var(--apple-blue), 0.1) !important;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       SELECTION - Premium Style\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    ::selection {\n      background: rgba(var(--apple-blue), 0.25);\n      color: inherit;\n    }\n\n    /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       SMOOTH TRANSITIONS FOR ALL INTERACTIVE ELEMENTS\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n    .form-section,\n    .form-section::before,\n    .form-section::after,\n    .section-title,\n    .section-title i,\n    .form-field > label,\n    .back-link,\n    .back-link i {\n      transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n    }\n\n    .duplicate-dialog {\n      display: grid;\n      gap: 0.85rem;\n    }\n\n    .duplicate-dialog__message {\n      margin: 0;\n      color: rgba(var(--apple-gray-0), 0.85);\n    }\n\n    .duplicate-dialog__list {\n      display: grid;\n      gap: 0.65rem;\n      max-height: 20rem;\n      overflow: auto;\n      padding-right: 0.25rem;\n    }\n\n    .duplicate-row {\n      display: grid;\n      grid-template-columns: 1fr auto auto;\n      gap: 0.75rem;\n      align-items: center;\n      padding: 0.65rem 0.75rem;\n      border: 1px solid rgba(var(--apple-gray-2), 0.16);\n      border-radius: 12px;\n      background: rgba(var(--apple-gray-6), 0.45);\n    }\n\n    .duplicate-row__meta {\n      min-width: 0;\n    }\n\n    .duplicate-row__name {\n      font-weight: 600;\n      color: rgba(var(--apple-gray-0), 0.95);\n    }\n\n    .duplicate-row__company,\n    .duplicate-row__signals {\n      font-size: 0.82rem;\n      color: rgba(var(--apple-gray-1), 0.76);\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n\n    .duplicate-row__score {\n      display: grid;\n      justify-items: end;\n      font-size: 0.8rem;\n      color: rgba(var(--apple-gray-1), 0.86);\n    }\n\n    .duplicate-row__badge {\n      font-size: 0.7rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.04em;\n      padding: 0.12rem 0.4rem;\n      border-radius: 999px;\n      border: 1px solid rgba(var(--apple-gray-2), 0.3);\n    }\n\n    .duplicate-row__badge[data-level='block'] {\n      color: #dc2626;\n      border-color: rgba(220, 38, 38, 0.32);\n      background: rgba(220, 38, 38, 0.08);\n    }\n\n    .duplicate-row__badge[data-level='warning'] {\n      color: #d97706;\n      border-color: rgba(217, 119, 6, 0.32);\n      background: rgba(217, 119, 6, 0.08);\n    }\n\n    .duplicate-dialog__actions {\n      display: flex;\n      justify-content: flex-end;\n      gap: 0.5rem;\n      padding-top: 0.25rem;\n    }\n\n    .supporting-documents-panel {\n      display: grid;\n      gap: 1rem;\n    }\n\n    .supporting-documents-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: flex-start;\n      gap: 0.85rem;\n      flex-wrap: wrap;\n    }\n\n    .supporting-documents-stats {\n      display: flex;\n      gap: 0.5rem;\n      align-items: center;\n      flex-wrap: wrap;\n    }\n\n    .docs-usage-pill,\n    .docs-remaining-pill,\n    .docs-limit-pill {\n      border-radius: 999px;\n      padding: 0.25rem 0.6rem;\n      font-size: 0.75rem;\n      font-weight: 700;\n      letter-spacing: 0.02em;\n      border: 1px solid rgba(var(--apple-gray-2), 0.2);\n      background: rgba(var(--apple-gray-5), 0.36);\n      color: rgba(var(--apple-gray-0), 0.9);\n    }\n\n    .docs-remaining-pill {\n      background: rgba(56, 189, 248, 0.12);\n      border-color: rgba(56, 189, 248, 0.24);\n      color: #bae6fd;\n    }\n\n    .docs-limit-pill {\n      background: rgba(239, 68, 68, 0.12);\n      border-color: rgba(239, 68, 68, 0.26);\n      color: #fecaca;\n    }\n\n    .supporting-documents-uploader {\n      display: grid;\n      gap: 0.55rem;\n      padding: 0.85rem;\n      border-radius: 14px;\n      border: 1px solid rgba(var(--apple-gray-2), 0.16);\n      background: rgba(var(--apple-gray-6), 0.35);\n    }\n\n    :host ::ng-deep .lead-doc-upload .p-button {\n      border-radius: 12px;\n      border: 1px solid rgba(var(--apple-blue), 0.34);\n      background:\n        radial-gradient(circle at 18% 15%, rgba(125, 211, 252, 0.22), transparent 48%),\n        linear-gradient(180deg, rgba(30, 64, 175, 0.92), rgba(15, 23, 42, 0.9));\n      color: #f8fbff;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.16),\n        inset 0 -1px 0 rgba(30, 64, 175, 0.25),\n        0 10px 24px rgba(2, 6, 23, 0.24),\n        0 0 0 1px rgba(56, 189, 248, 0.08);\n      font-weight: 700;\n      letter-spacing: 0.01em;\n      padding: 0.6rem 0.9rem;\n      text-shadow: 0 1px 2px rgba(2, 6, 23, 0.35);\n    }\n\n    :host ::ng-deep .lead-doc-upload .p-button:hover:not(:disabled) {\n      border-color: rgba(125, 211, 252, 0.45);\n      background:\n        radial-gradient(circle at 20% 12%, rgba(186, 230, 253, 0.28), transparent 50%),\n        linear-gradient(180deg, rgba(37, 99, 235, 0.95), rgba(30, 41, 59, 0.92));\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.22),\n        0 14px 30px rgba(37, 99, 235, 0.2),\n        0 0 0 1px rgba(125, 211, 252, 0.12);\n    }\n\n    :host ::ng-deep .lead-doc-upload .p-button:disabled {\n      opacity: 0.62;\n      cursor: not-allowed;\n      background:\n        linear-gradient(180deg, rgba(71, 85, 105, 0.55), rgba(30, 41, 59, 0.58));\n      border-color: rgba(var(--apple-gray-2), 0.2);\n      box-shadow: none;\n      text-shadow: none;\n    }\n\n    .docs-policy-note {\n      font-size: 0.8rem;\n      color: rgba(var(--apple-gray-1), 0.78);\n      line-height: 1.35;\n    }\n\n    .supporting-documents-list {\n      display: grid;\n      gap: 0.75rem;\n    }\n\n    .supporting-documents-list .table-actions {\n      display: inline-flex;\n      align-items: center;\n      justify-content: flex-end;\n      gap: 0.35rem;\n      white-space: nowrap;\n    }\n\n    :host ::ng-deep .supporting-documents-list .icon-btn.p-button {\n      width: 2rem;\n      height: 2rem;\n      min-width: 2rem;\n      padding: 0;\n      border-radius: 10px;\n      border: 1px solid rgba(var(--apple-gray-2), 0.18);\n      background: rgba(255, 255, 255, 0.72);\n      color: rgba(var(--apple-secondary), 0.9);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.35),\n        0 4px 14px rgba(15, 23, 42, 0.06);\n      transition: all 0.18s ease;\n    }\n\n    :host ::ng-deep .supporting-documents-list .icon-btn.p-button .p-button-icon {\n      color: inherit;\n      font-size: 0.85rem;\n    }\n\n    :host ::ng-deep .supporting-documents-list .icon-btn.p-button:hover:not(:disabled) {\n      border-color: rgba(var(--apple-blue), 0.24);\n      background: rgba(var(--apple-blue), 0.08);\n      color: rgba(var(--apple-blue), 1);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.45),\n        0 8px 18px rgba(var(--apple-blue), 0.12);\n      transform: translateY(-1px);\n    }\n\n    :host ::ng-deep .supporting-documents-list .icon-btn.danger.p-button {\n      color: #b91c1c;\n      border-color: rgba(239, 68, 68, 0.22);\n      background: rgba(254, 242, 242, 0.85);\n    }\n\n    :host ::ng-deep .supporting-documents-list .icon-btn.danger.p-button:hover:not(:disabled) {\n      color: #991b1b;\n      border-color: rgba(239, 68, 68, 0.34);\n      background: rgba(239, 68, 68, 0.12);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.45),\n        0 8px 18px rgba(239, 68, 68, 0.12);\n    }\n\n    :host ::ng-deep .supporting-documents-list .icon-btn.p-button:disabled {\n      opacity: 0.55;\n      box-shadow: none;\n      transform: none;\n    }\n\n    .docs-table .docs-file-name {\n      max-width: 18rem;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      font-weight: 600;\n    }\n\n    @media (max-width: 768px) {\n      .docs-table .docs-file-name {\n        max-width: 10rem;\n      }\n    }\n\n    @media (max-width: 900px) {\n      .lead-sticky-bar {\n        position: static;\n        top: auto;\n        align-items: stretch;\n        flex-direction: column;\n      }\n\n      .lead-sticky-left,\n      .lead-sticky-right {\n        width: 100%;\n        min-width: 0;\n      }\n\n      .lead-sticky-right {\n        align-items: stretch;\n      }\n\n      .lead-sticky-right .crm-button--primary,\n      .lead-sticky-right .p-button {\n        width: 100%;\n      }\n\n      .lead-sticky-meta {\n        gap: 0.4rem;\n      }\n\n      .qualification-summary-card {\n        position: static;\n      }\n\n      .qualification-summary-card__metrics {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .summary-metric {\n        grid-column: span 1;\n      }\n\n      .summary-metric--primary {\n        grid-column: span 2;\n      }\n\n      .qualification-insight-grid {\n        grid-template-columns: 1fr;\n      }\n    }\n\n    @media (max-width: 560px) {\n      .header-top {\n        align-items: stretch;\n      }\n\n      .header-top .back-link {\n        width: 100%;\n        justify-content: flex-start;\n        margin-left: 0;\n      }\n\n      .header-top .crm-button--primary,\n      .header-top .p-button {\n        width: 100%;\n      }\n\n      .header-title p {\n        max-width: 100%;\n      }\n\n      .lead-header-progress {\n        max-width: 100%;\n      }\n\n      :host ::ng-deep .lead-tabs .p-tab {\n        flex: 1 1 100%;\n        min-width: 0;\n      }\n\n      .related-summary {\n        width: calc(100% - 2rem);\n        margin-top: 0.75rem;\n        padding: 0.65rem 0.75rem;\n      }\n\n      .lead-sticky-bar {\n        padding: 0.75rem 0.8rem;\n        border-radius: 14px;\n      }\n\n      .lead-sticky-left h3 {\n        font-size: 0.98rem;\n      }\n\n      .lead-sticky-meta {\n        margin-top: 0.25rem;\n      }\n\n      .qualification-summary-card__metrics {\n        grid-template-columns: 1fr;\n      }\n\n      .summary-metric {\n        grid-column: span 1;\n        min-height: 64px;\n      }\n\n      .summary-metric--primary {\n        grid-column: span 1;\n      }\n\n      .lead-header-progress {\n        flex-direction: column;\n        align-items: stretch;\n      }\n\n      .lead-header-progress__dial {\n        align-self: flex-start;\n      }\n    }\n  \n.presence-strip {\n  margin-top: 0.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n  flex-wrap: wrap;\n}\n\n/* Qualification + CQVS hardening (root-level to avoid nesting/scope drift) */\n.qualification-scoring-shell {\n  padding-top: 0.55rem;\n}\n\n.qual-shell-title h2 {\n  font-size: 1.38rem;\n  letter-spacing: -0.02em;\n}\n\n.qual-shell-title p {\n  margin-top: 0.2rem;\n  max-width: 42rem;\n}\n\n.qual-shell-actions__primary {\n  min-height: 42px;\n  border-radius: 10px;\n  padding-inline: 0.8rem;\n  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.24);\n}\n\n.qual-shell-actions__primary .action-btn__icon {\n  width: 24px;\n  height: 24px;\n}\n\n.qual-shell-actions button:focus-visible,\n.hero-mid-block__link:focus-visible {\n  outline: 2px solid rgba(79, 70, 229, 0.55);\n  outline-offset: 2px;\n}\n\n.qual-hero-ring .qual-gauge-bg {\n  fill: none !important;\n  stroke: rgba(99, 102, 241, 0.18) !important;\n  stroke-width: 3 !important;\n}\n\n.qual-hero-ring .qual-gauge-fill {\n  fill: none !important;\n  stroke: #5b5ce6 !important;\n  stroke-width: 3 !important;\n  stroke-linecap: round !important;\n}\n\n.qual-risk-item__action {\n  margin-left: auto;\n  font-size: 0.72rem;\n  font-weight: 700;\n  color: #4f46e5;\n  background: rgba(79, 70, 229, 0.08);\n  border-radius: 999px;\n  padding: 0.12rem 0.4rem;\n  white-space: nowrap;\n}\n\n.form-section--qualification .form-grid.qualification-grid--factors {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.6rem 0.75rem;\n}\n\n.form-section--qualification .qualification-grid--factors .form-field {\n  min-height: 56px;\n  align-items: center;\n}\n\n.form-section--qualification .qualification-grid--factors .form-field > label {\n  min-width: 140px;\n}\n\n@media (max-width: 1100px) {\n  .form-section--qualification .form-grid.qualification-grid--factors {\n    grid-template-columns: 1fr;\n  }\n\n  .form-section--qualification .qualification-grid--factors .form-field > label {\n    min-width: 120px;\n  }\n}\n\n@media (max-width: 1200px) {\n  .qual-hero-card__tip {\n    justify-items: start;\n    text-align: left;\n  }\n\n  .qual-hero-card__tip p {\n    text-align: left;\n  }\n}\n\n.presence-focus {\n  margin-top: 0.55rem;\n  display: inline-flex;\n  position: relative;\n  align-items: center;\n  gap: 0.45rem;\n  border-radius: 0.75rem;\n  padding: 0.4rem 0.7rem;\n  font-size: 0.8rem;\n  font-weight: 700;\n  border: 1px solid rgba(14, 165, 233, 0.22);\n  color: #0c4a6e;\n  background: linear-gradient(135deg, rgba(224, 242, 254, 0.95), rgba(186, 230, 253, 0.92));\n  box-shadow: 0 8px 18px rgba(2, 132, 199, 0.18), 0 0 0 1px rgba(125, 211, 252, 0.28) inset;\n  -webkit-user-select: none;\n  user-select: none;\n  caret-color: transparent;\n  cursor: default;\n\n  &::selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  &::-moz-selection {\n    background: transparent;\n    color: inherit;\n  }\n\n  // Glowing comet that orbits OUTSIDE the chip border\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 2rem;\n    height: 2px;\n    border-radius: 999px;\n    background: linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.6) 15%,\n      rgba(255, 255, 255, 1) 50%,\n      rgba(255, 255, 255, 0.6) 85%,\n      transparent 100%\n    );\n    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1))\n            drop-shadow(0 0 5px rgba(186, 230, 253, 0.9))\n            drop-shadow(0 0 10px rgba(56, 189, 248, 0.6))\n            drop-shadow(0 0 18px rgba(14, 165, 233, 0.35));\n    offset-path: inset(0px round 0.75rem);\n    offset-distance: 0%;\n    offset-rotate: auto;\n    animation: presence-border-tail 3.5s linear infinite;\n    will-change: offset-distance;\n    pointer-events: none;\n    z-index: 3;\n  }\n\n  > * {\n    position: relative;\n    z-index: 1;\n  }\n\n  i {\n    color: #0284c7;\n    font-size: 0.85rem;\n  }\n}\n\n@keyframes presence-border-tail {\n  from { offset-distance: 0%; }\n  to   { offset-distance: 100%; }\n}\n\n.presence-label {\n  font-size: 0.75rem;\n  color: #64748b;\n  font-weight: 600;\n}\n\n.presence-chip {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #0f172a;\n  border: 1px solid rgba(14, 165, 233, 0.32);\n  background: rgba(224, 242, 254, 0.8);\n}\n\n.presence-chip--editing {\n  border-color: rgba(251, 146, 60, 0.4);\n  background: rgba(255, 237, 213, 0.9);\n}\n\n.presence-editing-note {\n  margin-top: 0.5rem;\n  display: inline-flex;\n  position: relative;\n  align-items: center;\n  gap: 0.4rem;\n  border: 1px solid rgba(251, 146, 60, 0.45);\n  background: linear-gradient(135deg, rgba(255, 247, 237, 0.98), rgba(254, 215, 170, 0.85));\n  color: #9a3412;\n  border-radius: 0.65rem;\n  padding: 0.35rem 0.65rem;\n  font-size: 0.78rem;\n  font-weight: 600;\n  box-shadow: 0 8px 18px rgba(251, 146, 60, 0.18), 0 0 0 1px rgba(254, 215, 170, 0.32) inset;\n\n  // Glowing comet that orbits OUTSIDE the chip border (orange theme)\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 2rem;\n    height: 2px;\n    border-radius: 999px;\n    background: linear-gradient(\n      90deg,\n      transparent 0%,\n      rgba(255, 255, 255, 0.6) 15%,\n      rgba(255, 255, 255, 1) 50%,\n      rgba(255, 255, 255, 0.6) 85%,\n      transparent 100%\n    );\n    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 1))\n            drop-shadow(0 0 5px rgba(254, 215, 170, 0.9))\n            drop-shadow(0 0 10px rgba(251, 146, 60, 0.6))\n            drop-shadow(0 0 18px rgba(234, 88, 12, 0.35));\n    offset-path: inset(0px round 0.65rem);\n    offset-distance: 0%;\n    offset-rotate: auto;\n    animation: presence-border-tail 3.5s linear infinite;\n    will-change: offset-distance;\n    pointer-events: none;\n    z-index: 3;\n  }\n\n  > * {\n    position: relative;\n    z-index: 1;\n  }\n\n  i {\n    color: #ea580c;\n    font-size: 0.85rem;\n  }\n}\n\n// Read-only mode banner (shown when another user is editing)\n.read-only-banner {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  margin: 0.75rem 0 1rem;\n  background: linear-gradient(135deg, rgba(254, 243, 199, 0.95), rgba(253, 230, 138, 0.85));\n  border: 1px solid rgba(251, 191, 36, 0.5);\n  border-radius: 0.75rem;\n  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.15), 0 0 0 1px rgba(253, 230, 138, 0.4) inset;\n\n  > i {\n    font-size: 1.25rem;\n    color: #b45309;\n    margin-top: 0.15rem;\n    flex-shrink: 0;\n  }\n\n  &__content {\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n\n    strong {\n      font-size: 0.9rem;\n      font-weight: 700;\n      color: #92400e;\n    }\n\n    span {\n      font-size: 0.82rem;\n      color: #a16207;\n      line-height: 1.4;\n    }\n  }\n}\n\n// Fieldset wrapper for read-only mode\n.form-fieldset {\n  border: none;\n  padding: 0;\n  margin: 0;\n  min-width: 0;\n\n  &:disabled {\n    opacity: 1;\n    pointer-events: none;\n\n    input,\n    textarea,\n    select,\n    button:not(.p-tab),\n    .p-inputtext,\n    .p-select,\n    .p-dropdown,\n    .p-calendar,\n    .p-inputnumber,\n    .p-inputtextarea,\n    .p-checkbox,\n    .p-radiobutton {\n      cursor: not-allowed;\n      background: rgba(229, 231, 235, 0.5);\n    }\n\n    // Keep tabs clickable for navigation\n    .p-tab {\n      pointer-events: auto;\n      opacity: 1;\n    }\n  }\n}\n\n.qualification-readiness-panel {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);\n  gap: 1rem;\n  padding: 1.2rem;\n  border: 1px solid rgba(118, 144, 255, 0.18);\n  border-radius: 1.25rem;\n  background: linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(244, 247, 255, 0.88));\n  box-shadow: 0 18px 40px rgba(43, 72, 132, 0.08);\n}\n\n.qualification-readiness-panel[data-state=\"ready\"] {\n  border-color: rgba(16, 185, 129, 0.26);\n}\n\n.qualification-readiness-panel[data-state=\"needs-evidence\"] {\n  border-color: rgba(245, 158, 11, 0.3);\n}\n\n.qualification-readiness-panel[data-state=\"not-ready\"] {\n  border-color: rgba(239, 68, 68, 0.22);\n}\n\n.qualification-readiness-panel__eyebrow {\n  display: inline-flex;\n  margin-bottom: 0.45rem;\n  font-size: 0.74rem;\n  font-weight: 700;\n  letter-spacing: 0.14em;\n  text-transform: uppercase;\n  color: #5b6ea6;\n}\n\n.qualification-readiness-panel__status h3 {\n  margin: 0 0 0.45rem;\n  font-size: 1.45rem;\n  color: #21304d;\n}\n\n.qualification-readiness-panel__status p {\n  margin: 0;\n  color: #60708f;\n  line-height: 1.6;\n}\n\n.qualification-readiness-panel__metrics {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.75rem;\n}\n\n.qualification-summary-metric {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  padding: 0.95rem 1rem;\n  border-radius: 1rem;\n  border: 1px solid rgba(118, 144, 255, 0.14);\n  background: rgba(246, 249, 255, 0.92);\n}\n\n.qualification-summary-metric__label {\n  font-size: 0.74rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #6d7da0;\n}\n\n.qualification-summary-metric strong {\n  color: #243354;\n  font-size: 1.1rem;\n  line-height: 1.35;\n}\n\n.qualification-summary-metric small {\n  color: #7383a7;\n}\n\n.qualification-readiness-panel__blockers {\n  grid-column: 1 / -1;\n  padding: 0.9rem 1rem 0;\n  border-top: 1px solid rgba(148, 163, 184, 0.22);\n}\n\n.qualification-readiness-panel__blockers-title {\n  display: inline-flex;\n  margin-bottom: 0.45rem;\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #c05c2f;\n}\n\n.qualification-readiness-panel__blockers ul {\n  margin: 0;\n  padding-left: 1.1rem;\n  color: #5f6f8f;\n  line-height: 1.55;\n}\n\n.qualification-scoring-details {\n  margin-top: 1rem;\n  border: 1px solid rgba(118, 144, 255, 0.14);\n  border-radius: 1.15rem;\n  background: rgba(255, 255, 255, 0.84);\n}\n\n.qualification-scoring-details summary {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.15rem;\n  cursor: pointer;\n  list-style: none;\n  font-weight: 700;\n  color: #243354;\n}\n\n.qualification-scoring-details summary::-webkit-details-marker {\n  display: none;\n}\n\n.qualification-scoring-details summary small {\n  font-weight: 500;\n  color: #7182a7;\n}\n\n.qualification-scoring-details__body {\n  padding: 0 1rem 1rem;\n}\n\n.qualification-factor-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}\n\n.qualification-factor-card {\n  display: flex;\n  flex-direction: column;\n  gap: 0.9rem;\n  padding: 1rem;\n  border-radius: 1.15rem;\n  border: 1px solid rgba(120, 144, 255, 0.14);\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.97), rgba(246, 249, 255, 0.92));\n  box-shadow: 0 16px 28px rgba(29, 48, 87, 0.06);\n}\n\n.qualification-factor-card__header {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: flex-start;\n}\n\n.qualification-factor-card__title-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.45rem;\n  align-items: center;\n}\n\n.qualification-factor-card__header h3 {\n  margin: 0;\n  font-size: 1rem;\n  color: #22304d;\n}\n\n.qualification-factor-card__header p {\n  margin: 0.35rem 0 0;\n  color: #6d7d9f;\n  line-height: 1.55;\n}\n\n.factor-required-badge,\n.factor-scoring-badge {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.2rem 0.5rem;\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 700;\n}\n\n.factor-required-badge {\n  background: rgba(239, 68, 68, 0.12);\n  color: #c24141;\n}\n\n.factor-scoring-badge {\n  background: rgba(99, 102, 241, 0.12);\n  color: #4f5ecf;\n}\n\n.qualification-factor-card__field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.45rem;\n}\n\n.qualification-factor-card__field > label {\n  font-size: 0.82rem;\n  font-weight: 700;\n  color: #52617e;\n}\n\n.qualification-factor-card__evidence-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  padding-top: 0.2rem;\n}\n\n.qualification-factor-card__evidence-summary {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n}\n\n.qualification-factor-card__evidence-label {\n  font-size: 0.74rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #7a88a8;\n}\n\n.qualification-factor-card__evidence-summary strong {\n  color: #2c3a5a;\n  font-size: 0.92rem;\n}\n\n.qualification-factor-card__evidence-toggle {\n  flex-shrink: 0;\n}\n\n.action-btn--secondary {\n  border: 1px solid rgba(95, 129, 255, 0.22);\n  background: rgba(240, 245, 255, 0.95);\n  color: #3451b2;\n}\n\n.history-list--merged {\n  gap: 0.85rem;\n}\n\n.history-item--merged {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.85rem;\n}\n\n.history-item__icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.15rem;\n  height: 2.15rem;\n  border-radius: 0.85rem;\n  background: rgba(148, 163, 184, 0.14);\n  color: #5f6f8d;\n  flex-shrink: 0;\n}\n\n.history-item__icon[data-tone=\"success\"] {\n  background: rgba(16, 185, 129, 0.12);\n  color: #109669;\n}\n\n.history-item__icon[data-tone=\"warn\"] {\n  background: rgba(245, 158, 11, 0.12);\n  color: #d0860d;\n}\n\n.history-item__icon[data-tone=\"danger\"] {\n  background: rgba(239, 68, 68, 0.12);\n  color: #d34545;\n}\n\n.history-item__content {\n  min-width: 0;\n  flex: 1;\n}\n\n.history-item__title {\n  font-weight: 700;\n  color: #253451;\n}\n\n@media (max-width: 1024px) {\n  .qualification-readiness-panel {\n    grid-template-columns: 1fr;\n  }\n\n  .qualification-readiness-panel__metrics {\n    grid-template-columns: 1fr;\n  }\n\n  .qualification-factor-grid {\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
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
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LeadFormPage, { className: "LeadFormPage", filePath: "src/app/crm/features/leads/pages/lead-form.page.ts", lineNumber: 252 }); })();
