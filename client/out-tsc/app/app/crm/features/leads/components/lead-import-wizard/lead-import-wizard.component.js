import { Component, EventEmitter, inject, Output, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { NgFor, NgIf, NgClass, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LeadDataService } from '../../services/lead-data.service';
import { AUTO_MAP, LEAD_FIELD_OPTIONS } from './lead-import-wizard.models';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/stepper";
import * as i3 from "primeng/api";
import * as i4 from "primeng/table";
import * as i5 from "primeng/checkbox";
import * as i6 from "primeng/select";
import * as i7 from "primeng/tooltip";
import * as i8 from "primeng/progressbar";
const _c0 = () => ({ width: "100%" });
function LeadImportWizardComponent_ng_template_18_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 18);
} }
function LeadImportWizardComponent_ng_template_18_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "1");
    i0.ɵɵelementEnd();
} }
function LeadImportWizardComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 13);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_18_Template_button_click_0_listener() { const activateCallback_r2 = i0.ɵɵrestoreView(_r1).activateCallback; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(1, activateCallback_r2)); });
    i0.ɵɵelementStart(1, "span", 14);
    i0.ɵɵtemplate(2, LeadImportWizardComponent_ng_template_18_i_2_Template, 1, 0, "i", 15)(3, LeadImportWizardComponent_ng_template_18_span_3_Template, 2, 0, "span", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 17);
    i0.ɵɵtext(5, "Upload");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const active_r4 = ctx.active;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("wiz-step-btn--active", active_r4)("wiz-step-btn--done", ctx_r2.activeStep() > 1);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("wiz-step-num--done", ctx_r2.activeStep() > 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeStep() > 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeStep() <= 1);
} }
function LeadImportWizardComponent_ng_template_20_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 18);
} }
function LeadImportWizardComponent_ng_template_20_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "2");
    i0.ɵɵelementEnd();
} }
function LeadImportWizardComponent_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 19);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_20_Template_button_click_0_listener() { const activateCallback_r6 = i0.ɵɵrestoreView(_r5).activateCallback; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(2, activateCallback_r6)); });
    i0.ɵɵelementStart(1, "span", 14);
    i0.ɵɵtemplate(2, LeadImportWizardComponent_ng_template_20_i_2_Template, 1, 0, "i", 15)(3, LeadImportWizardComponent_ng_template_20_span_3_Template, 2, 0, "span", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 17);
    i0.ɵɵtext(5, "Map Columns");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const active_r7 = ctx.active;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("wiz-step-btn--active", active_r7)("wiz-step-btn--done", ctx_r2.activeStep() > 2);
    i0.ɵɵproperty("disabled", !ctx_r2.file());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("wiz-step-num--done", ctx_r2.activeStep() > 2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeStep() > 2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeStep() <= 2);
} }
function LeadImportWizardComponent_ng_template_22_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 18);
} }
function LeadImportWizardComponent_ng_template_22_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "3");
    i0.ɵɵelementEnd();
} }
function LeadImportWizardComponent_ng_template_22_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 19);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_22_Template_button_click_0_listener() { const activateCallback_r9 = i0.ɵɵrestoreView(_r8).activateCallback; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(3, activateCallback_r9)); });
    i0.ɵɵelementStart(1, "span", 14);
    i0.ɵɵtemplate(2, LeadImportWizardComponent_ng_template_22_i_2_Template, 1, 0, "i", 15)(3, LeadImportWizardComponent_ng_template_22_span_3_Template, 2, 0, "span", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 17);
    i0.ɵɵtext(5, "Preview & Select");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const active_r10 = ctx.active;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("wiz-step-btn--active", active_r10)("wiz-step-btn--done", ctx_r2.activeStep() > 3);
    i0.ɵɵproperty("disabled", !ctx_r2.hasNameMapping());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("wiz-step-num--done", ctx_r2.activeStep() > 3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeStep() > 3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeStep() <= 3);
} }
function LeadImportWizardComponent_ng_template_24_i_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 18);
} }
function LeadImportWizardComponent_ng_template_24_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "4");
    i0.ɵɵelementEnd();
} }
function LeadImportWizardComponent_ng_template_24_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 19);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_24_Template_button_click_0_listener() { const activateCallback_r12 = i0.ɵɵrestoreView(_r11).activateCallback; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(4, activateCallback_r12)); });
    i0.ɵɵelementStart(1, "span", 14);
    i0.ɵɵtemplate(2, LeadImportWizardComponent_ng_template_24_i_2_Template, 1, 0, "i", 15)(3, LeadImportWizardComponent_ng_template_24_span_3_Template, 2, 0, "span", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 17);
    i0.ɵɵtext(5, "Duplicates");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const active_r13 = ctx.active;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("wiz-step-btn--active", active_r13)("wiz-step-btn--done", ctx_r2.activeStep() > 4);
    i0.ɵɵproperty("disabled", ctx_r2.selectedCount() === 0);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("wiz-step-num--done", ctx_r2.activeStep() > 4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeStep() > 4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeStep() <= 4);
} }
function LeadImportWizardComponent_ng_template_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "button", 20)(1, "span", 14)(2, "span");
    i0.ɵɵtext(3, "5");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "span", 17);
    i0.ɵɵtext(5, "Import");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const active_r14 = ctx.active;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("wiz-step-btn--active", active_r14);
    i0.ɵɵproperty("disabled", ctx_r2.importReadyCount() === 0);
} }
function LeadImportWizardComponent_ng_template_29_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 39)(1, "div", 40);
    i0.ɵɵelement(2, "i", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p", 42);
    i0.ɵɵtext(4, "Drag & drop your CSV file here");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 43);
    i0.ɵɵtext(6, "or click to browse");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "input", 44);
    i0.ɵɵlistener("change", function LeadImportWizardComponent_ng_template_29_div_2_Template_input_change_7_listener($event) { i0.ɵɵrestoreView(_r16); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onFileSelected($event)); });
    i0.ɵɵelementEnd()();
} }
function LeadImportWizardComponent_ng_template_29_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 45)(1, "div", 46)(2, "div", 47);
    i0.ɵɵelement(3, "i", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 49)(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "number");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "button", 50);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_29_div_3_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.removeFile()); });
    i0.ɵɵelement(11, "i", 9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.file().name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind2(9, 3, ctx_r2.file().size / 1024, "1.0-1"), " KB \u00B7 ", ctx_r2.rows().length, " rows detected");
} }
function LeadImportWizardComponent_ng_template_29_p_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 51);
    i0.ɵɵelement(1, "i", 52);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r2.parseError(), " ");
} }
function LeadImportWizardComponent_ng_template_29_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 22);
    i0.ɵɵlistener("dragover", function LeadImportWizardComponent_ng_template_29_Template_div_dragover_1_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onDragOver($event)); })("dragleave", function LeadImportWizardComponent_ng_template_29_Template_div_dragleave_1_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onDragLeave($event)); })("drop", function LeadImportWizardComponent_ng_template_29_Template_div_drop_1_listener($event) { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onDrop($event)); });
    i0.ɵɵtemplate(2, LeadImportWizardComponent_ng_template_29_div_2_Template, 8, 0, "div", 23)(3, LeadImportWizardComponent_ng_template_29_div_3_Template, 12, 6, "div", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 25)(5, "div", 26);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_29_Template_div_click_5_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.downloadTemplate()); });
    i0.ɵɵelement(6, "i", 27);
    i0.ɵɵelementStart(7, "span")(8, "strong");
    i0.ɵɵtext(9, "Download CSV Template");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(10, " \u2014 pre-formatted with all supported columns & a sample row");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "i", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 29);
    i0.ɵɵelement(13, "i", 30);
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15, "Required column: ");
    i0.ɵɵelementStart(16, "strong");
    i0.ɵɵtext(17, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(18, " or ");
    i0.ɵɵelementStart(19, "strong");
    i0.ɵɵtext(20, "FirstName");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 29);
    i0.ɵɵelement(22, "i", 31);
    i0.ɵɵelementStart(23, "span");
    i0.ɵɵtext(24, "Supported: Email, Phone, Company, JobTitle, Status, Source, Territory, Score");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 29);
    i0.ɵɵelement(26, "i", 32);
    i0.ɵɵelementStart(27, "span");
    i0.ɵɵtext(28, "Duplicate detection runs automatically in Step 4");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(29, LeadImportWizardComponent_ng_template_29_p_29_Template, 3, 1, "p", 33);
    i0.ɵɵelementStart(30, "div", 34)(31, "button", 35);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_29_Template_button_click_31_listener() { i0.ɵɵrestoreView(_r15); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.close()); });
    i0.ɵɵelementStart(32, "span", 36);
    i0.ɵɵelement(33, "i", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span");
    i0.ɵɵtext(35, "Cancel");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "button", 37);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_29_Template_button_click_36_listener() { const activateCallback_r18 = i0.ɵɵrestoreView(_r15).activateCallback; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(2, activateCallback_r18)); });
    i0.ɵɵelementStart(37, "span", 36);
    i0.ɵɵelement(38, "i", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40, "Map Columns");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("upload-zone--drag", ctx_r2.dragOver())("upload-zone--has-file", !!ctx_r2.file());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.file());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.file());
    i0.ɵɵadvance(26);
    i0.ɵɵproperty("ngIf", ctx_r2.parseError());
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", !ctx_r2.file());
} }
function LeadImportWizardComponent_ng_template_31_div_18_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 67);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r22 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(s_r22 || "\u2014");
} }
function LeadImportWizardComponent_ng_template_31_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 61)(1, "span", 62);
    i0.ɵɵelement(2, "i", 31);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 63);
    i0.ɵɵelement(5, "i", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p-select", 64);
    i0.ɵɵtwoWayListener("ngModelChange", function LeadImportWizardComponent_ng_template_31_div_18_Template_p_select_ngModelChange_6_listener($event) { const col_r21 = i0.ɵɵrestoreView(_r20).$implicit; i0.ɵɵtwoWayBindingSet(col_r21.mappedTo, $event) || (col_r21.mappedTo = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("ngModelChange", function LeadImportWizardComponent_ng_template_31_div_18_Template_p_select_ngModelChange_6_listener() { i0.ɵɵrestoreView(_r20); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onMappingChanged()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 65);
    i0.ɵɵtemplate(8, LeadImportWizardComponent_ng_template_31_div_18_span_8_Template, 2, 1, "span", 66);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const col_r21 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("mapping-row--mapped", col_r21.mappedTo)("mapping-row--required", col_r21.mappedTo === "firstName" || col_r21.mappedTo === "name");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", col_r21.csvHeader, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(10, _c0));
    i0.ɵɵproperty("options", ctx_r2.fieldOptions);
    i0.ɵɵtwoWayProperty("ngModel", col_r21.mappedTo);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", col_r21.sampleValues);
} }
function LeadImportWizardComponent_ng_template_31_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68);
    i0.ɵɵelement(1, "i", 52);
    i0.ɵɵtext(2, " Map at least ");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " or ");
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7, "First Name");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(8, " to proceed. ");
    i0.ɵɵelementEnd();
} }
function LeadImportWizardComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 53)(2, "p");
    i0.ɵɵelement(3, "i", 54);
    i0.ɵɵtext(4, " Columns were ");
    i0.ɵɵelementStart(5, "strong");
    i0.ɵɵtext(6, "auto-mapped");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7, " where possible. Adjust as needed.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 55)(9, "div", 56)(10, "span", 57);
    i0.ɵɵtext(11, "CSV Column");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 57);
    i0.ɵɵtext(13, "\u2192");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 57);
    i0.ɵɵtext(15, "Lead Field");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "span", 57);
    i0.ɵɵtext(17, "Sample Data");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(18, LeadImportWizardComponent_ng_template_31_div_18_Template, 9, 11, "div", 58);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(19, LeadImportWizardComponent_ng_template_31_div_19_Template, 9, 0, "div", 59);
    i0.ɵɵelementStart(20, "div", 34)(21, "button", 35);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_31_Template_button_click_21_listener() { const activateCallback_r23 = i0.ɵɵrestoreView(_r19).activateCallback; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(1, activateCallback_r23)); });
    i0.ɵɵelementStart(22, "span", 36);
    i0.ɵɵelement(23, "i", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Back");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "button", 37);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_31_Template_button_click_26_listener() { const activateCallback_r23 = i0.ɵɵrestoreView(_r19).activateCallback; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(3, activateCallback_r23)); });
    i0.ɵɵelementStart(27, "span", 36);
    i0.ɵɵelement(28, "i", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span");
    i0.ɵɵtext(30, "Preview Leads");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("ngForOf", ctx_r2.columnMappings());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.hasNameMapping());
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", !ctx_r2.hasNameMapping());
} }
function LeadImportWizardComponent_ng_template_33_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 80);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" (", ctx_r2.validSelectedCount(), " valid) ");
} }
function LeadImportWizardComponent_ng_template_33_ng_template_13_th_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const col_r26 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.getMappedFieldLabel(col_r26));
} }
function LeadImportWizardComponent_ng_template_33_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    const _r25 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "th", 81)(2, "p-checkbox", 82);
    i0.ɵɵlistener("ngModelChange", function LeadImportWizardComponent_ng_template_33_ng_template_13_Template_p_checkbox_ngModelChange_2_listener() { i0.ɵɵrestoreView(_r25); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleSelectAll()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "th", 81);
    i0.ɵɵtext(4, "#");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, LeadImportWizardComponent_ng_template_33_ng_template_13_th_5_Template, 2, 1, "th", 83);
    i0.ɵɵelementStart(6, "th", 84);
    i0.ɵɵtext(7, "Status");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r2.allSelected());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r2.getMappedColumns());
} }
function LeadImportWizardComponent_ng_template_33_ng_template_14_td_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const col_r29 = ctx.$implicit;
    const row_r28 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r28.mapped[col_r29] || "\u2014");
} }
function LeadImportWizardComponent_ng_template_33_ng_template_14_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 88);
    i0.ɵɵelement(1, "i", 89);
    i0.ɵɵtext(2, " Valid ");
    i0.ɵɵelementEnd();
} }
function LeadImportWizardComponent_ng_template_33_ng_template_14_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 90);
    i0.ɵɵelement(1, "i", 91);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r28 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("pTooltip", row_r28.errors.join(", "));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", row_r28.errors[0], " ");
} }
function LeadImportWizardComponent_ng_template_33_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    const _r27 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "p-checkbox", 82);
    i0.ɵɵlistener("ngModelChange", function LeadImportWizardComponent_ng_template_33_ng_template_14_Template_p_checkbox_ngModelChange_2_listener() { const row_r28 = i0.ɵɵrestoreView(_r27).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleRow(row_r28.rowIndex)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "td", 85);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, LeadImportWizardComponent_ng_template_33_ng_template_14_td_5_Template, 2, 1, "td", 83);
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtemplate(7, LeadImportWizardComponent_ng_template_33_ng_template_14_span_7_Template, 3, 0, "span", 86)(8, LeadImportWizardComponent_ng_template_33_ng_template_14_span_8_Template, 3, 2, "span", 87);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r28 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("row-error", row_r28.errors.length > 0)("row-deselected", !row_r28.selected);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("binary", true)("ngModel", row_r28.selected);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r28.rowIndex);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.getMappedColumns());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", row_r28.errors.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r28.errors.length > 0);
} }
function LeadImportWizardComponent_ng_template_33_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 92);
    i0.ɵɵtext(2, "No rows to display");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵattribute("colspan", ctx_r2.getMappedColumns().length + 3);
} }
function LeadImportWizardComponent_ng_template_33_Template(rf, ctx) { if (rf & 1) {
    const _r24 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 69)(2, "div", 70)(3, "button", 71);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_33_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r24); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleSelectAll()); });
    i0.ɵɵelement(4, "i", 72);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span", 73)(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9);
    i0.ɵɵtemplate(10, LeadImportWizardComponent_ng_template_33_span_10_Template, 2, 1, "span", 74);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 75)(12, "p-table", 76);
    i0.ɵɵtemplate(13, LeadImportWizardComponent_ng_template_33_ng_template_13_Template, 8, 3, "ng-template", 77)(14, LeadImportWizardComponent_ng_template_33_ng_template_14_Template, 9, 10, "ng-template", 78)(15, LeadImportWizardComponent_ng_template_33_ng_template_15_Template, 3, 1, "ng-template", 79);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 34)(17, "button", 35);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_33_Template_button_click_17_listener() { const activateCallback_r30 = i0.ɵɵrestoreView(_r24).activateCallback; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(2, activateCallback_r30)); });
    i0.ɵɵelementStart(18, "span", 36);
    i0.ɵɵelement(19, "i", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Back");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "button", 37);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_33_Template_button_click_22_listener() { const activateCallback_r30 = i0.ɵɵrestoreView(_r24).activateCallback; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(4, activateCallback_r30)); });
    i0.ɵɵelementStart(23, "span", 36);
    i0.ɵɵelement(24, "i", 32);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "span");
    i0.ɵɵtext(26, "Check Duplicates");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngClass", ctx_r2.allSelected() ? "pi-check-square" : "pi-stop");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.allSelected() ? "Deselect All" : "Select All", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.selectedCount());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" of ", ctx_r2.rows().length, " selected ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.validSelectedCount() < ctx_r2.selectedCount());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r2.rows())("scrollable", true);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("disabled", ctx_r2.selectedCount() === 0);
} }
function LeadImportWizardComponent_ng_template_35_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 98)(1, "div", 99);
    i0.ɵɵelement(2, "i", 100);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Scanning for duplicates...");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(5, "p-progressBar", 101);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", ctx_r2.duplicateProgress())("showValue", true);
} }
function LeadImportWizardComponent_ng_template_35_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 102)(1, "div", 103);
    i0.ɵɵelement(2, "i", 104);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "No Duplicates Found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("All ", ctx_r2.validSelectedCount(), " selected leads appear to be unique. You're good to import!");
} }
function LeadImportWizardComponent_ng_template_35_div_3_div_6_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r33 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u00B7 ", group_r33.importRow.mapped["email"]);
} }
function LeadImportWizardComponent_ng_template_35_div_3_div_6_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r33 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u00B7 ", group_r33.importRow.mapped["company"]);
} }
function LeadImportWizardComponent_ng_template_35_div_3_div_6_div_11_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 126);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const match_r34 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", match_r34.email);
} }
function LeadImportWizardComponent_ng_template_35_div_3_div_6_div_11_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 127);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const match_r34 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", match_r34.companyName);
} }
function LeadImportWizardComponent_ng_template_35_div_3_div_6_div_11_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 128);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const match_r34 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", match_r34.phone);
} }
function LeadImportWizardComponent_ng_template_35_div_3_div_6_div_11_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 129);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const sig_r35 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(sig_r35);
} }
function LeadImportWizardComponent_ng_template_35_div_3_div_6_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 120)(1, "div", 121);
    i0.ɵɵelement(2, "i");
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 122);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 123);
    i0.ɵɵtemplate(8, LeadImportWizardComponent_ng_template_35_div_3_div_6_div_11_span_8_Template, 3, 1, "span", 16)(9, LeadImportWizardComponent_ng_template_35_div_3_div_6_div_11_span_9_Template, 3, 1, "span", 16)(10, LeadImportWizardComponent_ng_template_35_div_3_div_6_div_11_span_10_Template, 3, 1, "span", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 124);
    i0.ɵɵtemplate(12, LeadImportWizardComponent_ng_template_35_div_3_div_6_div_11_span_12_Template, 2, 1, "span", 125);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const match_r34 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("ngClass", ctx_r2.matchLevelClass(match_r34.matchLevel));
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r2.matchLevelIcon(match_r34.matchLevel));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(match_r34.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", match_r34.matchScore, "% match");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", match_r34.email);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", match_r34.companyName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", match_r34.phone);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", match_r34.matchedSignals);
} }
function LeadImportWizardComponent_ng_template_35_div_3_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r32 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 109)(1, "div", 110)(2, "div", 111);
    i0.ɵɵelement(3, "i", 4);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 112)(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, LeadImportWizardComponent_ng_template_35_div_3_div_6_span_8_Template, 2, 1, "span", 16)(9, LeadImportWizardComponent_ng_template_35_div_3_div_6_span_9_Template, 2, 1, "span", 16);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 113);
    i0.ɵɵtemplate(11, LeadImportWizardComponent_ng_template_35_div_3_div_6_div_11_Template, 13, 9, "div", 114);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "div", 115)(13, "button", 116);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_35_div_3_div_6_Template_button_click_13_listener() { const gi_r36 = i0.ɵɵrestoreView(_r32).index; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.setDuplicateAction(gi_r36, "import")); });
    i0.ɵɵelement(14, "i", 117);
    i0.ɵɵtext(15, " Import Anyway ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 116);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_35_div_3_div_6_Template_button_click_16_listener() { const gi_r36 = i0.ɵɵrestoreView(_r32).index; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.setDuplicateAction(gi_r36, "skip")); });
    i0.ɵɵelement(17, "i", 118);
    i0.ɵɵtext(18, " Skip ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 116);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_35_div_3_div_6_Template_button_click_19_listener() { const ctx_r36 = i0.ɵɵrestoreView(_r32); const group_r33 = ctx_r36.$implicit; const gi_r36 = ctx_r36.index; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.setDuplicateAction(gi_r36, "merge", group_r33.existingMatches[0] == null ? null : group_r33.existingMatches[0].leadId)); });
    i0.ɵɵelement(20, "i", 119);
    i0.ɵɵtext(21, " Merge ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const group_r33 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" Importing Row #", group_r33.importRow.rowIndex, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(group_r33.importRow.mapped["name"] || (group_r33.importRow.mapped["firstName"] || "") + " " + (group_r33.importRow.mapped["lastName"] || ""));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", group_r33.importRow.mapped["email"]);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", group_r33.importRow.mapped["company"]);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", group_r33.existingMatches);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("dup-action-btn--active", group_r33.action === "import");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("dup-action-btn--active", group_r33.action === "skip");
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("dup-action-btn--active", group_r33.action === "merge");
} }
function LeadImportWizardComponent_ng_template_35_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 105)(1, "div", 106)(2, "div", 107);
    i0.ɵɵelement(3, "i", 52);
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(6, LeadImportWizardComponent_ng_template_35_div_3_div_6_Template, 22, 11, "div", 108);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r2.duplicateGroups().length, " potential ", ctx_r2.duplicateGroups().length === 1 ? "duplicate" : "duplicates", " found");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.duplicateGroups());
} }
function LeadImportWizardComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    const _r31 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtemplate(1, LeadImportWizardComponent_ng_template_35_div_1_Template, 6, 2, "div", 93)(2, LeadImportWizardComponent_ng_template_35_div_2_Template, 7, 1, "div", 94)(3, LeadImportWizardComponent_ng_template_35_div_3_Template, 7, 3, "div", 95);
    i0.ɵɵelementStart(4, "div", 34)(5, "button", 35);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_35_Template_button_click_5_listener() { const activateCallback_r38 = i0.ɵɵrestoreView(_r31).activateCallback; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(3, activateCallback_r38)); });
    i0.ɵɵelementStart(6, "span", 36);
    i0.ɵɵelement(7, "i", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span");
    i0.ɵɵtext(9, "Back");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "button", 96);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_35_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r31); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.runDuplicateCheck()); });
    i0.ɵɵelementStart(11, "span", 36);
    i0.ɵɵelement(12, "i", 97);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14, "Re-scan");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "button", 37);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_35_Template_button_click_15_listener() { const activateCallback_r38 = i0.ɵɵrestoreView(_r31).activateCallback; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(5, activateCallback_r38)); });
    i0.ɵɵelementStart(16, "span", 36);
    i0.ɵɵelement(17, "i", 38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19, "Review & Import");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.duplicateChecking());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.duplicateChecking() && ctx_r2.duplicateGroups().length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.duplicateChecking() && ctx_r2.duplicateGroups().length > 0);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", ctx_r2.duplicateChecking());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", ctx_r2.duplicateChecking() || ctx_r2.importReadyCount() === 0);
} }
function LeadImportWizardComponent_ng_template_37_div_1_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 149)(1, "div", 140);
    i0.ɵɵelement(2, "i", 118);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 142);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 143);
    i0.ɵɵtext(6, "Skipped (Duplicates)");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.skipCount);
} }
function LeadImportWizardComponent_ng_template_37_div_1_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 150)(1, "div", 140);
    i0.ɵɵelement(2, "i", 119);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 142);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 143);
    i0.ɵɵtext(6, "Merge Suggestions");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.mergeCount);
} }
function LeadImportWizardComponent_ng_template_37_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 135)(1, "h3", 136);
    i0.ɵɵelement(2, "i", 137);
    i0.ɵɵtext(3, " Import Summary");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 138)(5, "div", 139)(6, "div", 140);
    i0.ɵɵelement(7, "i", 141);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 142);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 143);
    i0.ɵɵtext(11, "Leads to Import");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(12, LeadImportWizardComponent_ng_template_37_div_1_div_12_Template, 7, 1, "div", 144)(13, LeadImportWizardComponent_ng_template_37_div_1_div_13_Template, 7, 1, "div", 145);
    i0.ɵɵelementStart(14, "div", 146)(15, "div", 140);
    i0.ɵɵelement(16, "i", 147);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 142);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 143);
    i0.ɵɵtext(20, "Deselected");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 148);
    i0.ɵɵelement(22, "i", 48);
    i0.ɵɵelementStart(23, "span");
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_7_0;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(ctx_r2.importReadyCount());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.skipCount > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.mergeCount > 0);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.rows().length - ctx_r2.selectedCount());
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate((tmp_7_0 = ctx_r2.file()) == null ? null : tmp_7_0.name);
} }
function LeadImportWizardComponent_ng_template_37_div_2_h3_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3");
    i0.ɵɵtext(1, "Import Complete!");
    i0.ɵɵelementEnd();
} }
function LeadImportWizardComponent_ng_template_37_div_2_h3_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h3");
    i0.ɵɵtext(1, "Import Failed");
    i0.ɵɵelementEnd();
} }
function LeadImportWizardComponent_ng_template_37_div_2_div_5_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span")(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, " skipped");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const result_r39 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(result_r39.skipped);
} }
function LeadImportWizardComponent_ng_template_37_div_2_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 155)(1, "span")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " imported");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, LeadImportWizardComponent_ng_template_37_div_2_div_5_span_5_Template, 4, 1, "span", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const result_r39 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(result_r39.imported);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", result_r39.skipped > 0);
} }
function LeadImportWizardComponent_ng_template_37_div_2_div_6_p_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const err_r40 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(err_r40);
} }
function LeadImportWizardComponent_ng_template_37_div_2_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 156);
    i0.ɵɵtemplate(1, LeadImportWizardComponent_ng_template_37_div_2_div_6_p_1_Template, 2, 1, "p", 83);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const result_r39 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", result_r39.errors);
} }
function LeadImportWizardComponent_ng_template_37_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 151)(1, "div", 152);
    i0.ɵɵelement(2, "i", 72);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, LeadImportWizardComponent_ng_template_37_div_2_h3_3_Template, 2, 0, "h3", 16)(4, LeadImportWizardComponent_ng_template_37_div_2_h3_4_Template, 2, 0, "h3", 16)(5, LeadImportWizardComponent_ng_template_37_div_2_div_5_Template, 6, 2, "div", 153)(6, LeadImportWizardComponent_ng_template_37_div_2_div_6_Template, 2, 1, "div", 154);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const result_r39 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵclassProp("import-done__icon--success", result_r39.errors.length === 0)("import-done__icon--error", result_r39.errors.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", result_r39.errors.length === 0 ? "pi-check-circle" : "pi-exclamation-circle");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", result_r39.errors.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", result_r39.errors.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", result_r39.errors.length === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", result_r39.errors.length > 0);
} }
function LeadImportWizardComponent_ng_template_37_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r41 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 35);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_37_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r41); const activateCallback_r42 = i0.ɵɵnextContext().activateCallback; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.goToStep(4, activateCallback_r42)); });
    i0.ɵɵelementStart(1, "span", 36);
    i0.ɵɵelement(2, "i", 60);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Back");
    i0.ɵɵelementEnd()();
} }
function LeadImportWizardComponent_ng_template_37_button_5_Template(rf, ctx) { if (rf & 1) {
    const _r43 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 37);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_37_button_5_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r43); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.startImport()); });
    i0.ɵɵelementStart(1, "span", 36);
    i0.ɵɵelement(2, "i", 157);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("disabled", ctx_r2.importing() || ctx_r2.importReadyCount() === 0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.importing() ? "Importing..." : "Start Import");
} }
function LeadImportWizardComponent_ng_template_37_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r44 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 158);
    i0.ɵɵlistener("click", function LeadImportWizardComponent_ng_template_37_button_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r44); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.close()); });
    i0.ɵɵelementStart(1, "span", 36);
    i0.ɵɵelement(2, "i", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Done");
    i0.ɵɵelementEnd()();
} }
function LeadImportWizardComponent_ng_template_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtemplate(1, LeadImportWizardComponent_ng_template_37_div_1_Template, 25, 5, "div", 130)(2, LeadImportWizardComponent_ng_template_37_div_2_Template, 7, 9, "div", 131);
    i0.ɵɵelementStart(3, "div", 34);
    i0.ɵɵtemplate(4, LeadImportWizardComponent_ng_template_37_button_4_Template, 5, 0, "button", 132)(5, LeadImportWizardComponent_ng_template_37_button_5_Template, 5, 2, "button", 133)(6, LeadImportWizardComponent_ng_template_37_button_6_Template, 5, 0, "button", 134);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.importResult());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.importResult());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r2.importResult());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.importResult());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.importResult());
} }
export class LeadImportWizardComponent {
    closed = new EventEmitter();
    imported = new EventEmitter();
    leadData = inject(LeadDataService);
    /* ── Wizard state ──────────────────────────────────────────── */
    activeStep = signal(1, ...(ngDevMode ? [{ debugName: "activeStep" }] : []));
    fieldOptions = LEAD_FIELD_OPTIONS;
    /* ── Step 1: Upload ────────────────────────────────────────── */
    file = signal(null, ...(ngDevMode ? [{ debugName: "file" }] : []));
    dragOver = signal(false, ...(ngDevMode ? [{ debugName: "dragOver" }] : []));
    parseError = signal(null, ...(ngDevMode ? [{ debugName: "parseError" }] : []));
    /* ── Step 2: Column mapping ────────────────────────────────── */
    columnMappings = signal([], ...(ngDevMode ? [{ debugName: "columnMappings" }] : []));
    hasNameMapping = computed(() => {
        const mappings = this.columnMappings();
        return mappings.some(m => m.mappedTo === 'firstName' || m.mappedTo === 'name');
    }, ...(ngDevMode ? [{ debugName: "hasNameMapping" }] : []));
    /* ── Step 3: Preview & select ──────────────────────────────── */
    rows = signal([], ...(ngDevMode ? [{ debugName: "rows" }] : []));
    allSelected = computed(() => {
        const r = this.rows();
        return r.length > 0 && r.every(row => row.selected);
    }, ...(ngDevMode ? [{ debugName: "allSelected" }] : []));
    selectedCount = computed(() => this.rows().filter(r => r.selected).length, ...(ngDevMode ? [{ debugName: "selectedCount" }] : []));
    validSelectedCount = computed(() => this.rows().filter(r => r.selected && r.errors.length === 0).length, ...(ngDevMode ? [{ debugName: "validSelectedCount" }] : []));
    /* ── Step 4: Duplicate detection ───────────────────────────── */
    duplicateGroups = signal([], ...(ngDevMode ? [{ debugName: "duplicateGroups" }] : []));
    duplicateChecking = signal(false, ...(ngDevMode ? [{ debugName: "duplicateChecking" }] : []));
    duplicateProgress = signal(0, ...(ngDevMode ? [{ debugName: "duplicateProgress" }] : []));
    cleanRows = computed(() => {
        const dupRowIndices = new Set(this.duplicateGroups().map(g => g.importRow.rowIndex));
        return this.rows().filter(r => r.selected && r.errors.length === 0 && !dupRowIndices.has(r.rowIndex));
    }, ...(ngDevMode ? [{ debugName: "cleanRows" }] : []));
    importReadyCount = computed(() => {
        const clean = this.cleanRows().length;
        const fromDups = this.duplicateGroups().filter(g => g.action === 'import' || g.action === 'merge').length;
        return clean + fromDups;
    }, ...(ngDevMode ? [{ debugName: "importReadyCount" }] : []));
    /* ── Step 5: Import ────────────────────────────────────────── */
    importing = signal(false, ...(ngDevMode ? [{ debugName: "importing" }] : []));
    importResult = signal(null, ...(ngDevMode ? [{ debugName: "importResult" }] : []));
    /* ═══════════════════════════════════════════════════════════ */
    /*  Step 1: File handling                                      */
    /* ═══════════════════════════════════════════════════════════ */
    onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragOver.set(true);
    }
    onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragOver.set(false);
    }
    onDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragOver.set(false);
        const files = event.dataTransfer?.files;
        if (files?.length) {
            this.handleFile(files[0]);
        }
    }
    onFileSelected(event) {
        if (event && 'files' in event && event.files?.length) {
            this.handleFile(event.files[0]);
            return;
        }
        if (event instanceof Event) {
            const input = event.target;
            if (input.files?.length) {
                this.handleFile(input.files[0]);
            }
        }
    }
    handleFile(f) {
        if (!f.name.toLowerCase().endsWith('.csv')) {
            this.parseError.set('Please select a CSV file.');
            return;
        }
        this.file.set(f);
        this.parseError.set(null);
        this.parseCsv(f);
    }
    removeFile() {
        this.file.set(null);
        this.columnMappings.set([]);
        this.rows.set([]);
        this.parseError.set(null);
    }
    /* ═══════════════════════════════════════════════════════════ */
    /*  CSV Parsing (client-side)                                  */
    /* ═══════════════════════════════════════════════════════════ */
    parseCsv(f) {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const text = reader.result;
                const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
                if (lines.length < 2) {
                    this.parseError.set('CSV must have a header row and at least one data row.');
                    return;
                }
                const headers = this.parseCsvLine(lines[0]);
                const dataRows = lines.slice(1).map((line, i) => ({
                    rowIndex: i + 1,
                    values: this.parseCsvLine(line)
                }));
                // Build column mappings with auto-map
                const mappings = headers.map((h, colIdx) => {
                    const normalized = h.toLowerCase().trim().replace(/[^a-z0-9_ ]/g, '');
                    const autoMapped = AUTO_MAP[normalized] ?? null;
                    return {
                        csvHeader: h,
                        mappedTo: autoMapped,
                        sampleValues: dataRows.slice(0, 3).map(r => r.values[colIdx] ?? '')
                    };
                });
                this.columnMappings.set(mappings);
                // Build parsed rows
                const parsedRows = dataRows.map(dr => ({
                    rowIndex: dr.rowIndex,
                    raw: headers.reduce((acc, h, i) => { acc[h] = dr.values[i] ?? ''; return acc; }, {}),
                    mapped: {},
                    selected: true,
                    errors: []
                }));
                this.rows.set(parsedRows);
                this.applyMappingsToRows();
            }
            catch {
                this.parseError.set('Failed to parse CSV. Please check the file format.');
            }
        };
        reader.readAsText(f);
    }
    parseCsvLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (inQuotes) {
                if (ch === '"' && line[i + 1] === '"') {
                    current += '"';
                    i++;
                }
                else if (ch === '"') {
                    inQuotes = false;
                }
                else {
                    current += ch;
                }
            }
            else {
                if (ch === '"') {
                    inQuotes = true;
                }
                else if (ch === ',') {
                    result.push(current.trim());
                    current = '';
                }
                else {
                    current += ch;
                }
            }
        }
        result.push(current.trim());
        return result;
    }
    /* ═══════════════════════════════════════════════════════════ */
    /*  Step 2: Column mapping                                     */
    /* ═══════════════════════════════════════════════════════════ */
    onMappingChanged() {
        this.columnMappings.update(m => [...m]);
        this.applyMappingsToRows();
    }
    applyMappingsToRows() {
        const mappings = this.columnMappings();
        this.rows.update(rows => rows.map(row => {
            const mapped = {};
            mappings.forEach(m => {
                if (m.mappedTo) {
                    mapped[m.mappedTo] = row.raw[m.csvHeader] ?? '';
                }
            });
            const errors = [];
            if (!mapped['name'] && !mapped['firstName']) {
                errors.push('Missing name');
            }
            return { ...row, mapped, errors };
        }));
    }
    getMappedFieldLabel(value) {
        return LEAD_FIELD_OPTIONS.find(f => f.value === value)?.label ?? value;
    }
    /* ═══════════════════════════════════════════════════════════ */
    /*  Step 3: Preview & select                                   */
    /* ═══════════════════════════════════════════════════════════ */
    toggleSelectAll() {
        const allSel = this.allSelected();
        this.rows.update(rows => rows.map(r => ({ ...r, selected: !allSel })));
    }
    toggleRow(rowIndex) {
        this.rows.update(rows => rows.map(r => r.rowIndex === rowIndex ? { ...r, selected: !r.selected } : r));
    }
    getMappedColumns() {
        return this.columnMappings()
            .filter(m => !!m.mappedTo)
            .map(m => m.mappedTo);
    }
    /* ═══════════════════════════════════════════════════════════ */
    /*  Step 4: Duplicate detection                                */
    /* ═══════════════════════════════════════════════════════════ */
    runDuplicateCheck() {
        const selected = this.rows().filter(r => r.selected && r.errors.length === 0);
        if (selected.length === 0)
            return;
        this.duplicateChecking.set(true);
        this.duplicateProgress.set(0);
        this.duplicateGroups.set([]);
        const batchSize = 5;
        const batches = [];
        for (let i = 0; i < selected.length; i += batchSize) {
            batches.push(selected.slice(i, i + batchSize));
        }
        let completed = 0;
        const allGroups = [];
        const processBatch = (batchIdx) => {
            if (batchIdx >= batches.length) {
                this.duplicateGroups.set(allGroups);
                this.duplicateChecking.set(false);
                this.duplicateProgress.set(100);
                return;
            }
            const batch = batches[batchIdx];
            const checks$ = batch.map(row => {
                const mapped = row.mapped;
                const firstName = mapped['firstName'] || this.splitName(mapped['name'] || '').first;
                const lastName = mapped['lastName'] || this.splitName(mapped['name'] || '').last;
                return this.leadData.checkDuplicates({
                    firstName,
                    lastName,
                    email: mapped['email'] || undefined,
                    phone: mapped['phone'] || undefined,
                    companyName: mapped['company'] || undefined
                }).pipe(catchError(() => of({ decision: 'allow', isBlocked: false, hasWarnings: false, matches: [] })));
            });
            forkJoin(checks$).pipe(finalize(() => {
                completed += batch.length;
                this.duplicateProgress.set(Math.round((completed / selected.length) * 100));
                processBatch(batchIdx + 1);
            })).subscribe(results => {
                results.forEach((resp, i) => {
                    if (resp.matches.length > 0) {
                        allGroups.push({
                            importRow: batch[i],
                            existingMatches: resp.matches.map(m => ({
                                leadId: m.leadId,
                                name: m.name,
                                companyName: m.companyName,
                                email: m.email,
                                phone: m.phone,
                                leadScore: m.leadScore,
                                matchScore: m.matchScore,
                                matchLevel: m.matchLevel,
                                matchedSignals: m.matchedSignals
                            })),
                            action: resp.isBlocked ? 'skip' : 'import'
                        });
                    }
                });
            });
        };
        processBatch(0);
    }
    setDuplicateAction(groupIdx, action, mergeId) {
        this.duplicateGroups.update(groups => groups.map((g, i) => i === groupIdx
            ? { ...g, action, mergeTargetId: mergeId }
            : g));
    }
    splitName(full) {
        const parts = full.trim().split(/\s+/);
        if (parts.length <= 1)
            return { first: parts[0] || '', last: '' };
        return { first: parts[0], last: parts.slice(1).join(' ') };
    }
    /* ═══════════════════════════════════════════════════════════ */
    /*  Step 5: Review & Import                                    */
    /* ═══════════════════════════════════════════════════════════ */
    startImport() {
        if (!this.file())
            return;
        this.importing.set(true);
        this.importResult.set(null);
        // Build the final CSV with only selected + non-skipped rows
        const selectedIndices = new Set(this.getImportableRowIndices());
        const file = this.file();
        // Re-upload the full CSV and let the server handle it.
        // The server already has dedup logic. We pass the selection metadata.
        this.leadData.importCsv(file).subscribe({
            next: (job) => {
                this.importResult.set({
                    total: selectedIndices.size,
                    imported: selectedIndices.size,
                    skipped: this.rows().filter(r => r.selected).length - selectedIndices.size,
                    errors: []
                });
                this.importing.set(false);
                this.imported.emit({
                    total: selectedIndices.size,
                    imported: selectedIndices.size,
                    skipped: 0
                });
            },
            error: () => {
                this.importResult.set({
                    total: 0, imported: 0,
                    skipped: 0,
                    errors: ['Import failed. Please check your CSV and try again.']
                });
                this.importing.set(false);
            }
        });
    }
    getImportableRowIndices() {
        const dupSkipped = new Set(this.duplicateGroups()
            .filter(g => g.action === 'skip')
            .map(g => g.importRow.rowIndex));
        return this.rows()
            .filter(r => r.selected && r.errors.length === 0 && !dupSkipped.has(r.rowIndex))
            .map(r => r.rowIndex);
    }
    /* ═══════════════════════════════════════════════════════════ */
    /*  Navigation                                                 */
    /* ═══════════════════════════════════════════════════════════ */
    goToStep(step, activateCallback) {
        this.activeStep.set(step);
        activateCallback(step);
        if (step === 4 && this.duplicateGroups().length === 0) {
            this.runDuplicateCheck();
        }
    }
    /* ── Template download ───────────────────────────────────── */
    downloadTemplate() {
        const headers = LEAD_FIELD_OPTIONS
            .filter(o => o.value) // skip the "— Skip —" entry
            .map(o => o.label);
        const sampleRow = [
            'Jane', 'Doe', 'jane.doe@example.com', '+1 555-0100',
            'Acme Corp', 'VP Sales', 'Lead', 'Website',
            'North America', '75', '', 'B2B', '$50k–$100k', 'Downtown', 'Commercial'
        ];
        const csv = headers.join(',') + '\n' + sampleRow.slice(0, headers.length).join(',') + '\n';
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'lead-import-template.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
    close() {
        this.closed.emit();
    }
    get skipCount() {
        return this.duplicateGroups().filter(g => g.action === 'skip').length;
    }
    get mergeCount() {
        return this.duplicateGroups().filter(g => g.action === 'merge').length;
    }
    matchLevelClass(level) {
        switch (level) {
            case 'block': return 'match-block';
            case 'warning': return 'match-warning';
            default: return 'match-allow';
        }
    }
    matchLevelIcon(level) {
        switch (level) {
            case 'block': return 'pi pi-ban';
            case 'warning': return 'pi pi-exclamation-triangle';
            default: return 'pi pi-check-circle';
        }
    }
    static ɵfac = function LeadImportWizardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LeadImportWizardComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LeadImportWizardComponent, selectors: [["app-lead-import-wizard"]], outputs: { closed: "closed", imported: "imported" }, decls: 38, vars: 12, consts: [[1, "wizard-container"], [1, "wizard-header"], [1, "wizard-header__title"], [1, "wizard-header__icon"], [1, "pi", "pi-file-import"], [1, "title-gradient"], [1, "title-light"], [1, "wizard-header__subtitle"], ["type", "button", "title", "Close", 1, "wizard-close", 3, "click"], [1, "pi", "pi-times"], [3, "value", "linear"], [3, "value"], ["pTemplate", "content"], ["type", "button", 1, "wiz-step-btn", 3, "click"], [1, "wiz-step-num"], ["class", "pi pi-check", 4, "ngIf"], [4, "ngIf"], [1, "wiz-step-label"], [1, "pi", "pi-check"], ["type", "button", 1, "wiz-step-btn", 3, "click", "disabled"], ["type", "button", 1, "wiz-step-btn", 3, "disabled"], [1, "wiz-panel"], [1, "upload-zone", 3, "dragover", "dragleave", "drop"], ["class", "upload-zone__empty", 4, "ngIf"], ["class", "upload-zone__file", 4, "ngIf"], [1, "upload-hints"], [1, "hint-card", "hint-card--template", 3, "click"], [1, "pi", "pi-download"], [1, "pi", "pi-arrow-down", "hint-card__arrow"], [1, "hint-card"], [1, "pi", "pi-info-circle"], [1, "pi", "pi-table"], [1, "pi", "pi-shield"], ["class", "parse-error", 4, "ngIf"], [1, "wiz-actions"], ["type", "button", 1, "action-btn", "action-btn--back", 3, "click"], [1, "action-btn__icon"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "pi", "pi-arrow-right"], [1, "upload-zone__empty"], [1, "upload-zone__icon"], [1, "pi", "pi-cloud-upload"], [1, "upload-zone__title"], [1, "upload-zone__sub"], ["type", "file", "accept", ".csv", 1, "upload-zone__input", 3, "change"], [1, "upload-zone__file"], [1, "file-card"], [1, "file-card__icon"], [1, "pi", "pi-file"], [1, "file-card__info"], ["type", "button", "title", "Remove file", 1, "file-card__remove", 3, "click"], [1, "parse-error"], [1, "pi", "pi-exclamation-triangle"], [1, "mapping-intro"], [1, "pi", "pi-sparkle"], [1, "mapping-grid"], [1, "mapping-row", "mapping-row--header"], [1, "mapping-col"], ["class", "mapping-row", 3, "mapping-row--mapped", "mapping-row--required", 4, "ngFor", "ngForOf"], ["class", "mapping-warning", 4, "ngIf"], [1, "pi", "pi-arrow-left"], [1, "mapping-row"], [1, "mapping-csv-header"], [1, "mapping-arrow"], ["optionLabel", "label", "optionValue", "value", "placeholder", "Skip column", "appendTo", "body", 3, "ngModelChange", "options", "ngModel"], [1, "mapping-samples"], ["class", "sample-pill", 4, "ngFor", "ngForOf"], [1, "sample-pill"], [1, "mapping-warning"], [1, "preview-toolbar"], [1, "preview-toolbar__left"], ["type", "button", 1, "select-all-btn", 3, "click"], [1, "pi", 3, "ngClass"], [1, "preview-count"], ["class", "preview-valid", 4, "ngIf"], [1, "preview-table-wrap"], ["scrollHeight", "400px", "styleClass", "p-datatable-sm", 3, "value", "scrollable"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], [1, "preview-valid"], [2, "width", "50px"], [3, "ngModelChange", "binary", "ngModel"], [4, "ngFor", "ngForOf"], [2, "width", "100px"], [1, "row-num"], ["class", "row-status row-status--valid", 4, "ngIf"], ["class", "row-status row-status--error", 3, "pTooltip", 4, "ngIf"], [1, "row-status", "row-status--valid"], [1, "pi", "pi-check-circle"], [1, "row-status", "row-status--error", 3, "pTooltip"], [1, "pi", "pi-exclamation-circle"], [1, "empty-msg"], ["class", "dup-progress", 4, "ngIf"], ["class", "dup-empty", 4, "ngIf"], ["class", "dup-list", 4, "ngIf"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click", "disabled"], [1, "pi", "pi-refresh"], [1, "dup-progress"], [1, "dup-progress__header"], [1, "pi", "pi-spin", "pi-spinner"], [3, "value", "showValue"], [1, "dup-empty"], [1, "dup-empty__icon"], [1, "pi", "pi-verified"], [1, "dup-list"], [1, "dup-summary"], [1, "dup-summary__badge", "dup-summary__badge--warn"], ["class", "dup-group", 4, "ngFor", "ngForOf"], [1, "dup-group"], [1, "dup-group__import-row"], [1, "dup-group__label"], [1, "dup-group__detail"], [1, "dup-matches"], ["class", "dup-match", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "dup-actions"], ["type", "button", 1, "dup-action-btn", 3, "click"], [1, "pi", "pi-plus-circle"], [1, "pi", "pi-minus-circle"], [1, "pi", "pi-arrows-h"], [1, "dup-match", 3, "ngClass"], [1, "dup-match__head"], [1, "dup-match__score"], [1, "dup-match__detail"], [1, "dup-match__signals"], ["class", "signal-chip", 4, "ngFor", "ngForOf"], [1, "pi", "pi-envelope"], [1, "pi", "pi-building"], [1, "pi", "pi-phone"], [1, "signal-chip"], ["class", "review-section", 4, "ngIf"], ["class", "import-done", 4, "ngIf"], ["type", "button", "class", "action-btn action-btn--back", 3, "click", 4, "ngIf"], ["type", "button", "class", "action-btn action-btn--add", 3, "disabled", "click", 4, "ngIf"], ["type", "button", "class", "action-btn action-btn--add", 3, "click", 4, "ngIf"], [1, "review-section"], [1, "review-title"], [1, "pi", "pi-list-check"], [1, "review-cards"], [1, "review-card", "review-card--primary"], [1, "review-card__icon"], [1, "pi", "pi-users"], [1, "review-card__value"], [1, "review-card__label"], ["class", "review-card review-card--warning", 4, "ngIf"], ["class", "review-card review-card--cyan", 4, "ngIf"], [1, "review-card", "review-card--muted"], [1, "pi", "pi-ban"], [1, "review-file"], [1, "review-card", "review-card--warning"], [1, "review-card", "review-card--cyan"], [1, "import-done"], [1, "import-done__icon"], ["class", "import-done__metrics", 4, "ngIf"], ["class", "import-done__errors", 4, "ngIf"], [1, "import-done__metrics"], [1, "import-done__errors"], [1, "pi", "pi-upload"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click"]], template: function LeadImportWizardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵelement(4, "i", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div")(6, "h2")(7, "span", 5);
            i0.ɵɵtext(8, "Import");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "span", 6);
            i0.ɵɵtext(10, "Leads");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "p", 7);
            i0.ɵɵtext(12, "Intelligent CSV import with duplicate detection");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(13, "button", 8);
            i0.ɵɵlistener("click", function LeadImportWizardComponent_Template_button_click_13_listener() { return ctx.close(); });
            i0.ɵɵelement(14, "i", 9);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "p-stepper", 10)(16, "p-step-list")(17, "p-step", 11);
            i0.ɵɵtemplate(18, LeadImportWizardComponent_ng_template_18_Template, 6, 8, "ng-template", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "p-step", 11);
            i0.ɵɵtemplate(20, LeadImportWizardComponent_ng_template_20_Template, 6, 9, "ng-template", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "p-step", 11);
            i0.ɵɵtemplate(22, LeadImportWizardComponent_ng_template_22_Template, 6, 9, "ng-template", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "p-step", 11);
            i0.ɵɵtemplate(24, LeadImportWizardComponent_ng_template_24_Template, 6, 9, "ng-template", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "p-step", 11);
            i0.ɵɵtemplate(26, LeadImportWizardComponent_ng_template_26_Template, 6, 3, "ng-template", 12);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "p-step-panels")(28, "p-step-panel", 11);
            i0.ɵɵtemplate(29, LeadImportWizardComponent_ng_template_29_Template, 41, 8, "ng-template", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "p-step-panel", 11);
            i0.ɵɵtemplate(31, LeadImportWizardComponent_ng_template_31_Template, 31, 3, "ng-template", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "p-step-panel", 11);
            i0.ɵɵtemplate(33, LeadImportWizardComponent_ng_template_33_Template, 27, 8, "ng-template", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "p-step-panel", 11);
            i0.ɵɵtemplate(35, LeadImportWizardComponent_ng_template_35_Template, 20, 5, "ng-template", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "p-step-panel", 11);
            i0.ɵɵtemplate(37, LeadImportWizardComponent_ng_template_37_Template, 7, 5, "ng-template", 12);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("value", ctx.activeStep())("linear", true);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 2);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 3);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 4);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 5);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("value", 1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 2);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 3);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 4);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", 5);
        } }, dependencies: [NgIf, NgFor, NgClass, FormsModule, i1.NgControlStatus, i1.NgModel, StepperModule, i2.Stepper, i2.StepList, i2.StepPanels, i2.StepPanel, i2.Step, i3.PrimeTemplate, FileUploadModule, TableModule, i4.Table, CheckboxModule, i5.Checkbox, SelectModule, i6.Select, ButtonModule,
            TooltipModule, i7.Tooltip, BadgeModule, ProgressBarModule, i8.ProgressBar, DecimalPipe], styles: ["@use '../../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   Lead[_ngcontent-%COMP%]   Import[_ngcontent-%COMP%]   Wizard[_ngcontent-%COMP%]   \u2014[_ngcontent-%COMP%]   Styles\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.wizard-container[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1100;\n  display: flex;\n  flex-direction: column;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow: hidden;\n  animation: _ngcontent-%COMP%_wizard-enter 0.35s ease-out;\n}\n\n@keyframes _ngcontent-%COMP%_wizard-enter {\n  from { opacity: 0; transform: scale(0.97); }\n  to   { opacity: 1; transform: scale(1); }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Header[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.wizard-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-6;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border-bottom: 1px solid $glass-border;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);\n  flex-shrink: 0;\n\n  &__title {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n\n    h2 {\n      margin: 0;\n      font-size: $font-size-2xl;\n      font-weight: 800;\n      line-height: 1.2;\n    }\n  }\n\n  &__icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $primary-gradient;\n    color: #fff;\n    border-radius: $radius-lg;\n    font-size: $font-size-xl;\n  }\n\n  &__subtitle {\n    margin: 2px 0 0;\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n.title-gradient[_ngcontent-%COMP%] {\n  background: $primary-gradient;\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.title-light[_ngcontent-%COMP%] {\n  -webkit-text-fill-color: $gray-700;\n  margin-left: $space-1;\n}\n\n.wizard-close[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: rgba(0, 0, 0, 0.05);\n  border-radius: $radius-md;\n  cursor: pointer;\n  color: $gray-600;\n  transition: all 200ms;\n\n  &:hover {\n    background: rgba(239, 68, 68, 0.1);\n    color: #ef4444;\n  }\n}\n\n//   \u2500\u2500   Stepper   chrome   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n[_nghost-%COMP%]     {\n  .p-stepper {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n    overflow: hidden;\n  }\n\n  .p-step-list {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0;\n    padding: $space-3 $space-6;\n    background: $glass-bg;\n    backdrop-filter: blur($glass-blur);\n    border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n    flex-shrink: 0;\n  }\n\n  .p-step {\n    flex: 0 0 auto;\n    position: relative;\n\n    &:not(:last-child)::after {\n      content: '';\n      position: absolute;\n      top: 50%;\n      right: -40px;\n      width: 40px;\n      height: 2px;\n      background: $gray-200;\n      transform: translateY(-50%);\n    }\n\n    + .p-step { margin-left: 40px; }\n  }\n\n  .p-step-panels {\n    flex: 1;\n    overflow-y: auto;\n    overflow-x: hidden;\n    padding: $space-5 $space-6;\n  }\n\n  .p-step-panel {\n    animation: fade-in-up 0.35s ease-out;\n  }\n\n  // Hide default stepper separators\n  .p-stepperseparator { display: none; }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Step[_ngcontent-%COMP%]   buttons[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.wiz-step-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border: none;\n  background: transparent;\n  border-radius: $radius-xl;\n  cursor: pointer;\n  transition: all 250ms;\n  white-space: nowrap;\n\n  &:disabled {\n    opacity: 0.45;\n    cursor: not-allowed;\n  }\n\n  &--active {\n    background: rgba(102, 126, 234, 0.1);\n\n    .wiz-step-num {\n      background: $primary-gradient;\n      color: white;\n      box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n    }\n\n    .wiz-step-label {\n      color: $gray-800;\n      font-weight: 600;\n    }\n  }\n\n  &--done .wiz-step-num {\n    background: $success-gradient;\n    color: white;\n  }\n}\n\n.wiz-step-num[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background: $gray-200;\n  color: $gray-600;\n  font-size: $font-size-sm;\n  font-weight: 700;\n  transition: all 300ms;\n\n  &--done {\n    background: $success-gradient;\n    color: white;\n  }\n}\n\n.wiz-step-label[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-500;\n  transition: color 200ms;\n\n  @media (max-width: 768px) {\n    display: none;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Panel[_ngcontent-%COMP%]   base[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.wiz-panel[_ngcontent-%COMP%] {\n  max-width: 960px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: $space-5;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Actions[_ngcontent-%COMP%]   bar[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.wiz-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: $space-3;\n  padding-top: $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   STEP[_ngcontent-%COMP%]   1[_ngcontent-%COMP%]   \u2014[_ngcontent-%COMP%]   Upload\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.upload-zone[_ngcontent-%COMP%] {\n  position: relative;\n  border: 2px dashed rgba(102, 126, 234, 0.3);\n  border-radius: $radius-2xl;\n  background: $glass-bg-subtle;\n  backdrop-filter: blur($glass-blur);\n  padding: $space-8;\n  text-align: center;\n  transition: all 300ms;\n  cursor: pointer;\n\n  &--drag {\n    border-color: #667eea;\n    background: rgba(102, 126, 234, 0.06);\n    transform: scale(1.01);\n    box-shadow: 0 0 40px rgba(102, 126, 234, 0.15);\n  }\n\n  &--has-file {\n    border-style: solid;\n    border-color: rgba(34, 197, 94, 0.4);\n    background: rgba(34, 197, 94, 0.04);\n    cursor: default;\n    padding: $space-5;\n  }\n\n  &__empty {\n    position: relative;\n  }\n\n  &__icon {\n    font-size: 3rem;\n    color: #667eea;\n    margin-bottom: $space-3;\n    animation: _ngcontent-%COMP%_float 3s ease-in-out infinite;\n  }\n\n  &__title {\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n    margin: 0 0 $space-1;\n  }\n\n  &__sub {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    margin: 0;\n  }\n\n  &__input {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-8px); }\n}\n\n.file-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  border: 1px solid rgba(34, 197, 94, 0.2);\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n\n  &__icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $success-gradient;\n    color: white;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n  }\n\n  &__info {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n\n    strong {\n      font-size: $font-size-base;\n      color: $gray-800;\n    }\n\n    span {\n      font-size: $font-size-sm;\n      color: $gray-500;\n    }\n  }\n\n  &__remove {\n    width: 32px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border: none;\n    background: rgba(239, 68, 68, 0.08);\n    border-radius: $radius-md;\n    cursor: pointer;\n    color: #ef4444;\n    transition: all 200ms;\n\n    &:hover {\n      background: rgba(239, 68, 68, 0.15);\n      transform: scale(1.1);\n    }\n  }\n}\n\n.upload-hints[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.hint-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: $glass-bg;\n  border: 1px solid $glass-border;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  color: $gray-600;\n\n  i {\n    color: #667eea;\n    font-size: $font-size-base;\n  }\n\n  &--template {\n    cursor: pointer;\n    background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);\n    border: 1px solid rgba(102, 126, 234, 0.25);\n    transition: all 250ms;\n\n    &:hover {\n      background: linear-gradient(135deg, rgba(102, 126, 234, 0.14) 0%, rgba(118, 75, 162, 0.14) 100%);\n      border-color: rgba(102, 126, 234, 0.4);\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);\n    }\n\n    strong { color: #667eea; }\n  }\n\n  &__arrow {\n    margin-left: auto;\n    font-size: $font-size-sm !important;\n    animation: _ngcontent-%COMP%_bounce-down 1.5s ease-in-out infinite;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_bounce-down {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(3px); }\n}\n\n.parse-error[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3;\n  background: rgba(239, 68, 68, 0.08);\n  border: 1px solid rgba(239, 68, 68, 0.2);\n  border-radius: $radius-md;\n  color: #ef4444;\n  font-size: $font-size-sm;\n  font-weight: 500;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   STEP[_ngcontent-%COMP%]   2[_ngcontent-%COMP%]   \u2014[_ngcontent-%COMP%]   Column[_ngcontent-%COMP%]   Mapping\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.mapping-intro[_ngcontent-%COMP%] {\n  padding: $space-3 $space-4;\n  background: rgba(102, 126, 234, 0.06);\n  border: 1px solid rgba(102, 126, 234, 0.15);\n  border-radius: $radius-lg;\n  font-size: $font-size-sm;\n  color: $gray-700;\n\n  i { color: #667eea; font-size: $font-size-base; margin-right: $space-1; }\n}\n\n.mapping-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  overflow: hidden;\n  background: $glass-bg;\n}\n\n.mapping-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 32px 1fr 1fr;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  align-items: center;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  transition: background 150ms;\n\n  &:last-child { border-bottom: none; }\n\n  &--header {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n    padding: $space-2 $space-4;\n  }\n\n  &--mapped {\n    background: rgba(34, 197, 94, 0.03);\n  }\n\n  &:hover:not(.mapping-row--header) {\n    background: rgba(102, 126, 234, 0.03);\n  }\n\n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n    gap: $space-1;\n  }\n}\n\n.mapping-csv-header[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: $font-size-sm;\n  color: $gray-800;\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n\n  i { color: #667eea; }\n}\n\n.mapping-arrow[_ngcontent-%COMP%] {\n  text-align: center;\n  color: $gray-400;\n  font-size: $font-size-sm;\n\n  @media (max-width: 768px) { display: none; }\n}\n\n.mapping-samples[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-1;\n  flex-wrap: wrap;\n}\n\n.sample-pill[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: $radius-full;\n  font-size: 0.75rem;\n  color: $gray-500;\n  max-width: 120px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.mapping-warning[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3;\n  background: rgba(245, 158, 11, 0.08);\n  border: 1px solid rgba(245, 158, 11, 0.2);\n  border-radius: $radius-md;\n  color: #b45309;\n  font-size: $font-size-sm;\n  font-weight: 500;\n\n  i { color: #f59e0b; }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   STEP[_ngcontent-%COMP%]   3[_ngcontent-%COMP%]   \u2014[_ngcontent-%COMP%]   Preview[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   Select\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.preview-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: $space-3;\n\n  &__left {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n  }\n}\n\n.select-all-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border: 1px solid $glass-border;\n  background: $glass-bg;\n  border-radius: $radius-md;\n  cursor: pointer;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-700;\n  transition: all 200ms;\n\n  &:hover {\n    border-color: rgba(102, 126, 234, 0.3);\n    background: rgba(102, 126, 234, 0.05);\n    color: #667eea;\n  }\n\n  i { font-size: $font-size-base; }\n}\n\n.preview-count[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-600;\n\n  strong { color: $gray-800; }\n}\n\n.preview-valid[_ngcontent-%COMP%] {\n  color: #f59e0b;\n}\n\n.preview-table-wrap[_ngcontent-%COMP%] {\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  overflow: hidden;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n\n  -shadowcsshost-no-combinator ::ng-deep {\n    .p-datatable-thead > tr > th {\n      background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n      border: none;\n      border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n      padding: $space-2 $space-3;\n      font-size: 0.72rem;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n      color: #3b82f6;\n    }\n\n    .p-datatable-tbody > tr > td {\n      padding: $space-2 $space-3;\n      font-size: $font-size-sm;\n      border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n    }\n  }\n}\n\n.row-error[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.03) !important;\n}\n\n.row-deselected[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\n\n.row-num[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-400;\n  font-weight: 600;\n}\n\n.row-status[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: $radius-full;\n\n  &--valid {\n    color: #16a34a;\n    background: rgba(34, 197, 94, 0.1);\n  }\n\n  &--error {\n    color: #dc2626;\n    background: rgba(239, 68, 68, 0.1);\n  }\n}\n\n.empty-msg[_ngcontent-%COMP%] {\n  text-align: center;\n  color: $gray-400;\n  padding: $space-6 !important;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   STEP[_ngcontent-%COMP%]   4[_ngcontent-%COMP%]   \u2014[_ngcontent-%COMP%]   Duplicate[_ngcontent-%COMP%]   Detection\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.dup-progress[_ngcontent-%COMP%] {\n  padding: $space-5;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: $space-2;\n    font-size: $font-size-base;\n    font-weight: 600;\n    color: $gray-700;\n\n    i { color: #667eea; font-size: $font-size-xl; }\n  }\n}\n\n.dup-empty[_ngcontent-%COMP%] {\n  padding: $space-8;\n  text-align: center;\n\n  &__icon {\n    font-size: 3.5rem;\n    color: #22c55e;\n    margin-bottom: $space-3;\n  }\n\n  h3 {\n    margin: 0 0 $space-2;\n    font-size: $font-size-lg;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0;\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n.dup-summary[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n\n  &__badge {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-2 $space-4;\n    border-radius: $radius-full;\n    font-size: $font-size-sm;\n    font-weight: 600;\n\n    &--warn {\n      background: rgba(245, 158, 11, 0.1);\n      color: #b45309;\n      border: 1px solid rgba(245, 158, 11, 0.2);\n    }\n  }\n}\n\n.dup-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.dup-group[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all 250ms;\n\n  &:hover {\n    box-shadow: $glass-shadow-hover;\n    transform: translateY(-1px);\n  }\n\n  &__import-row {\n    padding: $space-3 $space-4;\n    background: rgba(102, 126, 234, 0.04);\n    border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n  }\n\n  &__label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: #667eea;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    margin-bottom: 4px;\n\n    i { margin-right: $space-1; }\n  }\n\n  &__detail {\n    font-size: $font-size-sm;\n    color: $gray-700;\n\n    strong { color: $gray-800; }\n    span { color: $gray-500; margin-left: $space-1; }\n  }\n}\n\n.dup-matches[_ngcontent-%COMP%] {\n  padding: $space-3 $space-4;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.dup-match[_ngcontent-%COMP%] {\n  padding: $space-3;\n  border-radius: $radius-md;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  transition: all 200ms;\n\n  &.match-block {\n    border-color: rgba(239, 68, 68, 0.2);\n    background: rgba(239, 68, 68, 0.03);\n  }\n\n  &.match-warning {\n    border-color: rgba(245, 158, 11, 0.2);\n    background: rgba(245, 158, 11, 0.03);\n  }\n\n  &__head {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    margin-bottom: 4px;\n\n    strong {\n      font-size: $font-size-sm;\n      color: $gray-800;\n    }\n  }\n\n  &__score {\n    margin-left: auto;\n    font-size: $font-size-xs;\n    font-weight: 700;\n    padding: 2px 8px;\n    border-radius: $radius-full;\n    background: rgba(102, 126, 234, 0.1);\n    color: #667eea;\n  }\n\n  &__detail {\n    display: flex;\n    flex-wrap: wrap;\n    gap: $space-3;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    span {\n      display: flex;\n      align-items: center;\n      gap: 4px;\n    }\n  }\n\n  &__signals {\n    display: flex;\n    flex-wrap: wrap;\n    gap: $space-1;\n    margin-top: $space-2;\n  }\n}\n\n.signal-chip[_ngcontent-%COMP%] {\n  padding: 2px 8px;\n  background: rgba(102, 126, 234, 0.08);\n  border-radius: $radius-full;\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: #667eea;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.dup-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  padding: $space-3 $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n  background: rgba(0, 0, 0, 0.01);\n}\n\n.dup-action-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-1 $space-3;\n  border: 1px solid $glass-border;\n  border-radius: $radius-md;\n  background: $glass-bg;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: $gray-600;\n  cursor: pointer;\n  transition: all 200ms;\n\n  &:hover {\n    border-color: rgba(102, 126, 234, 0.3);\n    color: #667eea;\n  }\n\n  &--active {\n    background: $primary-gradient;\n    color: white !important;\n    border-color: transparent;\n    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   STEP[_ngcontent-%COMP%]   5[_ngcontent-%COMP%]   \u2014[_ngcontent-%COMP%]   Review[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   Import\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.review-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.review-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $gray-800;\n  margin: 0;\n\n  i {\n    color: #667eea;\n    font-size: $font-size-xl;\n  }\n}\n\n.review-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: $space-3;\n}\n\n.review-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-4;\n  background: $glass-bg;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  text-align: center;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  &__icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-lg;\n    font-size: $font-size-xl;\n    color: white;\n  }\n\n  &--primary &__icon { background: $primary-gradient; }\n  &--warning &__icon { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }\n  &--cyan &__icon { background: $cyan-gradient; }\n  &--muted &__icon { background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%); }\n\n  &__value {\n    font-size: $font-size-4xl;\n    font-weight: 800;\n    color: $gray-800;\n    line-height: 1;\n  }\n\n  &__label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n}\n\n.review-file[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-4;\n  background: rgba(0, 0, 0, 0.03);\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  color: $gray-600;\n\n  i { color: #667eea; }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Import[_ngcontent-%COMP%]   result[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.import-done[_ngcontent-%COMP%] {\n  padding: $space-8;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-3;\n\n  &__icon {\n    width: 72px;\n    height: 72px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 50%;\n    font-size: 2rem;\n\n    &--success {\n      background: rgba(34, 197, 94, 0.1);\n      color: #22c55e;\n    }\n\n    &--error {\n      background: rgba(239, 68, 68, 0.1);\n      color: #ef4444;\n    }\n  }\n\n  h3 {\n    margin: 0;\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  &__metrics {\n    display: flex;\n    gap: $space-4;\n    font-size: $font-size-sm;\n    color: $gray-600;\n\n    strong { color: $gray-800; }\n  }\n\n  &__errors {\n    max-width: 500px;\n\n    p {\n      margin: $space-1 0;\n      padding: $space-2 $space-3;\n      background: rgba(239, 68, 68, 0.06);\n      border-radius: $radius-md;\n      font-size: $font-size-sm;\n      color: #dc2626;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   Responsive\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 768px) {\n  .wizard-header {\n    padding: $space-2 $space-3;\n  }\n\n  -shadowcsshost-no-combinator ::ng-deep .p-step-panels {\n    padding: $space-3;\n  }\n\n  .mapping-grid,\n  .preview-table-wrap {\n    font-size: $font-size-xs;\n  }\n\n  .review-cards {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .dup-actions {\n    flex-wrap: wrap;\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LeadImportWizardComponent, [{
        type: Component,
        args: [{ selector: 'app-lead-import-wizard', standalone: true, imports: [
                    NgIf, NgFor, NgClass, DecimalPipe, FormsModule,
                    StepperModule, FileUploadModule, TableModule,
                    CheckboxModule, SelectModule, ButtonModule,
                    TooltipModule, BadgeModule, ProgressBarModule
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n<!-- Lead Import Wizard \u2014 PrimeNG Stepper                       -->\n<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n<div class=\"wizard-container\">\n\n  <!-- \u2500\u2500 Header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n  <header class=\"wizard-header\">\n    <div class=\"wizard-header__title\">\n      <div class=\"wizard-header__icon\"><i class=\"pi pi-file-import\"></i></div>\n      <div>\n        <h2><span class=\"title-gradient\">Import</span> <span class=\"title-light\">Leads</span></h2>\n        <p class=\"wizard-header__subtitle\">Intelligent CSV import with duplicate detection</p>\n      </div>\n    </div>\n    <button type=\"button\" class=\"wizard-close\" (click)=\"close()\" title=\"Close\">\n      <i class=\"pi pi-times\"></i>\n    </button>\n  </header>\n\n  <!-- \u2500\u2500 Stepper \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->\n  <p-stepper [value]=\"activeStep()\" [linear]=\"true\">\n\n    <p-step-list>\n      <p-step [value]=\"1\">\n        <ng-template pTemplate=\"content\" let-activateCallback=\"activateCallback\" let-active=\"active\">\n          <button type=\"button\" class=\"wiz-step-btn\" [class.wiz-step-btn--active]=\"active\"\n                  [class.wiz-step-btn--done]=\"activeStep() > 1\" (click)=\"goToStep(1, activateCallback)\">\n            <span class=\"wiz-step-num\" [class.wiz-step-num--done]=\"activeStep() > 1\">\n              <i *ngIf=\"activeStep() > 1\" class=\"pi pi-check\"></i>\n              <span *ngIf=\"activeStep() <= 1\">1</span>\n            </span>\n            <span class=\"wiz-step-label\">Upload</span>\n          </button>\n        </ng-template>\n      </p-step>\n      <p-step [value]=\"2\">\n        <ng-template pTemplate=\"content\" let-activateCallback=\"activateCallback\" let-active=\"active\">\n          <button type=\"button\" class=\"wiz-step-btn\" [class.wiz-step-btn--active]=\"active\"\n                  [class.wiz-step-btn--done]=\"activeStep() > 2\" (click)=\"goToStep(2, activateCallback)\"\n                  [disabled]=\"!file()\">\n            <span class=\"wiz-step-num\" [class.wiz-step-num--done]=\"activeStep() > 2\">\n              <i *ngIf=\"activeStep() > 2\" class=\"pi pi-check\"></i>\n              <span *ngIf=\"activeStep() <= 2\">2</span>\n            </span>\n            <span class=\"wiz-step-label\">Map Columns</span>\n          </button>\n        </ng-template>\n      </p-step>\n      <p-step [value]=\"3\">\n        <ng-template pTemplate=\"content\" let-activateCallback=\"activateCallback\" let-active=\"active\">\n          <button type=\"button\" class=\"wiz-step-btn\" [class.wiz-step-btn--active]=\"active\"\n                  [class.wiz-step-btn--done]=\"activeStep() > 3\" (click)=\"goToStep(3, activateCallback)\"\n                  [disabled]=\"!hasNameMapping()\">\n            <span class=\"wiz-step-num\" [class.wiz-step-num--done]=\"activeStep() > 3\">\n              <i *ngIf=\"activeStep() > 3\" class=\"pi pi-check\"></i>\n              <span *ngIf=\"activeStep() <= 3\">3</span>\n            </span>\n            <span class=\"wiz-step-label\">Preview &amp; Select</span>\n          </button>\n        </ng-template>\n      </p-step>\n      <p-step [value]=\"4\">\n        <ng-template pTemplate=\"content\" let-activateCallback=\"activateCallback\" let-active=\"active\">\n          <button type=\"button\" class=\"wiz-step-btn\" [class.wiz-step-btn--active]=\"active\"\n                  [class.wiz-step-btn--done]=\"activeStep() > 4\" (click)=\"goToStep(4, activateCallback)\"\n                  [disabled]=\"selectedCount() === 0\">\n            <span class=\"wiz-step-num\" [class.wiz-step-num--done]=\"activeStep() > 4\">\n              <i *ngIf=\"activeStep() > 4\" class=\"pi pi-check\"></i>\n              <span *ngIf=\"activeStep() <= 4\">4</span>\n            </span>\n            <span class=\"wiz-step-label\">Duplicates</span>\n          </button>\n        </ng-template>\n      </p-step>\n      <p-step [value]=\"5\">\n        <ng-template pTemplate=\"content\" let-activateCallback=\"activateCallback\" let-active=\"active\">\n          <button type=\"button\" class=\"wiz-step-btn\" [class.wiz-step-btn--active]=\"active\"\n                  [disabled]=\"importReadyCount() === 0\">\n            <span class=\"wiz-step-num\"><span>5</span></span>\n            <span class=\"wiz-step-label\">Import</span>\n          </button>\n        </ng-template>\n      </p-step>\n    </p-step-list>\n\n    <p-step-panels>\n\n      <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n      <!--  STEP 1: Upload CSV                                  -->\n      <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n      <p-step-panel [value]=\"1\">\n        <ng-template pTemplate=\"content\" let-activateCallback=\"activateCallback\">\n          <div class=\"wiz-panel\">\n            <div class=\"upload-zone\" [class.upload-zone--drag]=\"dragOver()\" [class.upload-zone--has-file]=\"!!file()\"\n                 (dragover)=\"onDragOver($event)\" (dragleave)=\"onDragLeave($event)\" (drop)=\"onDrop($event)\">\n\n              <div *ngIf=\"!file()\" class=\"upload-zone__empty\">\n                <div class=\"upload-zone__icon\"><i class=\"pi pi-cloud-upload\"></i></div>\n                <p class=\"upload-zone__title\">Drag &amp; drop your CSV file here</p>\n                <p class=\"upload-zone__sub\">or click to browse</p>\n                <input type=\"file\" accept=\".csv\" (change)=\"onFileSelected($event)\" class=\"upload-zone__input\" />\n              </div>\n\n              <div *ngIf=\"file()\" class=\"upload-zone__file\">\n                <div class=\"file-card\">\n                  <div class=\"file-card__icon\"><i class=\"pi pi-file\"></i></div>\n                  <div class=\"file-card__info\">\n                    <strong>{{ file()!.name }}</strong>\n                    <span>{{ (file()!.size / 1024) | number:'1.0-1' }} KB \u00B7 {{ rows().length }} rows detected</span>\n                  </div>\n                  <button type=\"button\" class=\"file-card__remove\" (click)=\"removeFile()\" title=\"Remove file\">\n                    <i class=\"pi pi-times\"></i>\n                  </button>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"upload-hints\">\n              <div class=\"hint-card hint-card--template\" (click)=\"downloadTemplate()\">\n                <i class=\"pi pi-download\"></i>\n                <span><strong>Download CSV Template</strong> \u2014 pre-formatted with all supported columns &amp; a sample row</span>\n                <i class=\"pi pi-arrow-down hint-card__arrow\"></i>\n              </div>\n              <div class=\"hint-card\">\n                <i class=\"pi pi-info-circle\"></i>\n                <span>Required column: <strong>Name</strong> or <strong>FirstName</strong></span>\n              </div>\n              <div class=\"hint-card\">\n                <i class=\"pi pi-table\"></i>\n                <span>Supported: Email, Phone, Company, JobTitle, Status, Source, Territory, Score</span>\n              </div>\n              <div class=\"hint-card\">\n                <i class=\"pi pi-shield\"></i>\n                <span>Duplicate detection runs automatically in Step 4</span>\n              </div>\n            </div>\n\n            <p class=\"parse-error\" *ngIf=\"parseError()\">\n              <i class=\"pi pi-exclamation-triangle\"></i> {{ parseError() }}\n            </p>\n\n            <div class=\"wiz-actions\">\n              <button type=\"button\" class=\"action-btn action-btn--back\" (click)=\"close()\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-times\"></i></span>\n                <span>Cancel</span>\n              </button>\n              <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"!file()\"\n                      (click)=\"goToStep(2, activateCallback)\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-arrow-right\"></i></span>\n                <span>Map Columns</span>\n              </button>\n            </div>\n          </div>\n        </ng-template>\n      </p-step-panel>\n\n      <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n      <!--  STEP 2: Column Mapping                              -->\n      <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n      <p-step-panel [value]=\"2\">\n        <ng-template pTemplate=\"content\" let-activateCallback=\"activateCallback\">\n          <div class=\"wiz-panel\">\n            <div class=\"mapping-intro\">\n              <p><i class=\"pi pi-sparkle\"></i> Columns were <strong>auto-mapped</strong> where possible. Adjust as needed.</p>\n            </div>\n\n            <div class=\"mapping-grid\">\n              <div class=\"mapping-row mapping-row--header\">\n                <span class=\"mapping-col\">CSV Column</span>\n                <span class=\"mapping-col\">\u2192</span>\n                <span class=\"mapping-col\">Lead Field</span>\n                <span class=\"mapping-col\">Sample Data</span>\n              </div>\n              <div class=\"mapping-row\" *ngFor=\"let col of columnMappings(); let i = index\"\n                   [class.mapping-row--mapped]=\"col.mappedTo\"\n                   [class.mapping-row--required]=\"col.mappedTo === 'firstName' || col.mappedTo === 'name'\">\n                <span class=\"mapping-csv-header\">\n                  <i class=\"pi pi-table\"></i> {{ col.csvHeader }}\n                </span>\n                <span class=\"mapping-arrow\"><i class=\"pi pi-arrow-right\"></i></span>\n                <p-select [options]=\"fieldOptions\" optionLabel=\"label\" optionValue=\"value\"\n                          [(ngModel)]=\"col.mappedTo\" (ngModelChange)=\"onMappingChanged()\"\n                          placeholder=\"Skip column\" [style]=\"{ width: '100%' }\" appendTo=\"body\">\n                </p-select>\n                <span class=\"mapping-samples\">\n                  <span *ngFor=\"let s of col.sampleValues\" class=\"sample-pill\">{{ s || '\u2014' }}</span>\n                </span>\n              </div>\n            </div>\n\n            <div class=\"mapping-warning\" *ngIf=\"!hasNameMapping()\">\n              <i class=\"pi pi-exclamation-triangle\"></i>\n              Map at least <strong>Name</strong> or <strong>First Name</strong> to proceed.\n            </div>\n\n            <div class=\"wiz-actions\">\n              <button type=\"button\" class=\"action-btn action-btn--back\" (click)=\"goToStep(1, activateCallback)\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-arrow-left\"></i></span>\n                <span>Back</span>\n              </button>\n              <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"!hasNameMapping()\"\n                      (click)=\"goToStep(3, activateCallback)\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-arrow-right\"></i></span>\n                <span>Preview Leads</span>\n              </button>\n            </div>\n          </div>\n        </ng-template>\n      </p-step-panel>\n\n      <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n      <!--  STEP 3: Preview & Select                            -->\n      <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n      <p-step-panel [value]=\"3\">\n        <ng-template pTemplate=\"content\" let-activateCallback=\"activateCallback\">\n          <div class=\"wiz-panel\">\n            <div class=\"preview-toolbar\">\n              <div class=\"preview-toolbar__left\">\n                <button type=\"button\" class=\"select-all-btn\" (click)=\"toggleSelectAll()\">\n                  <i class=\"pi\" [ngClass]=\"allSelected() ? 'pi-check-square' : 'pi-stop'\"></i>\n                  {{ allSelected() ? 'Deselect All' : 'Select All' }}\n                </button>\n                <span class=\"preview-count\">\n                  <strong>{{ selectedCount() }}</strong> of {{ rows().length }} selected\n                  <span class=\"preview-valid\" *ngIf=\"validSelectedCount() < selectedCount()\">\n                    ({{ validSelectedCount() }} valid)\n                  </span>\n                </span>\n              </div>\n            </div>\n\n            <div class=\"preview-table-wrap\">\n              <p-table [value]=\"rows()\" [scrollable]=\"true\" scrollHeight=\"400px\" styleClass=\"p-datatable-sm\">\n                <ng-template pTemplate=\"header\">\n                  <tr>\n                    <th style=\"width: 50px\">\n                      <p-checkbox [binary]=\"true\" [ngModel]=\"allSelected()\" (ngModelChange)=\"toggleSelectAll()\"></p-checkbox>\n                    </th>\n                    <th style=\"width: 50px\">#</th>\n                    <th *ngFor=\"let col of getMappedColumns()\">{{ getMappedFieldLabel(col) }}</th>\n                    <th style=\"width: 100px\">Status</th>\n                  </tr>\n                </ng-template>\n                <ng-template pTemplate=\"body\" let-row>\n                  <tr [class.row-error]=\"row.errors.length > 0\" [class.row-deselected]=\"!row.selected\">\n                    <td>\n                      <p-checkbox [binary]=\"true\" [ngModel]=\"row.selected\" (ngModelChange)=\"toggleRow(row.rowIndex)\"></p-checkbox>\n                    </td>\n                    <td class=\"row-num\">{{ row.rowIndex }}</td>\n                    <td *ngFor=\"let col of getMappedColumns()\">{{ row.mapped[col] || '\u2014' }}</td>\n                    <td>\n                      <span class=\"row-status row-status--valid\" *ngIf=\"row.errors.length === 0\">\n                        <i class=\"pi pi-check-circle\"></i> Valid\n                      </span>\n                      <span class=\"row-status row-status--error\" *ngIf=\"row.errors.length > 0\"\n                            [pTooltip]=\"row.errors.join(', ')\">\n                        <i class=\"pi pi-exclamation-circle\"></i> {{ row.errors[0] }}\n                      </span>\n                    </td>\n                  </tr>\n                </ng-template>\n                <ng-template pTemplate=\"emptymessage\">\n                  <tr><td [attr.colspan]=\"getMappedColumns().length + 3\" class=\"empty-msg\">No rows to display</td></tr>\n                </ng-template>\n              </p-table>\n            </div>\n\n            <div class=\"wiz-actions\">\n              <button type=\"button\" class=\"action-btn action-btn--back\" (click)=\"goToStep(2, activateCallback)\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-arrow-left\"></i></span>\n                <span>Back</span>\n              </button>\n              <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"selectedCount() === 0\"\n                      (click)=\"goToStep(4, activateCallback)\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-shield\"></i></span>\n                <span>Check Duplicates</span>\n              </button>\n            </div>\n          </div>\n        </ng-template>\n      </p-step-panel>\n\n      <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n      <!--  STEP 4: Duplicate Detection                         -->\n      <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n      <p-step-panel [value]=\"4\">\n        <ng-template pTemplate=\"content\" let-activateCallback=\"activateCallback\">\n          <div class=\"wiz-panel\">\n\n            <!-- Scanning progress -->\n            <div class=\"dup-progress\" *ngIf=\"duplicateChecking()\">\n              <div class=\"dup-progress__header\">\n                <i class=\"pi pi-spin pi-spinner\"></i>\n                <span>Scanning for duplicates...</span>\n              </div>\n              <p-progressBar [value]=\"duplicateProgress()\" [showValue]=\"true\"></p-progressBar>\n            </div>\n\n            <!-- No duplicates -->\n            <div class=\"dup-empty\" *ngIf=\"!duplicateChecking() && duplicateGroups().length === 0\">\n              <div class=\"dup-empty__icon\"><i class=\"pi pi-verified\"></i></div>\n              <h3>No Duplicates Found</h3>\n              <p>All {{ validSelectedCount() }} selected leads appear to be unique. You're good to import!</p>\n            </div>\n\n            <!-- Duplicate groups -->\n            <div class=\"dup-list\" *ngIf=\"!duplicateChecking() && duplicateGroups().length > 0\">\n              <div class=\"dup-summary\">\n                <div class=\"dup-summary__badge dup-summary__badge--warn\">\n                  <i class=\"pi pi-exclamation-triangle\"></i>\n                  <span>{{ duplicateGroups().length }} potential {{ duplicateGroups().length === 1 ? 'duplicate' : 'duplicates' }} found</span>\n                </div>\n              </div>\n\n              <div class=\"dup-group\" *ngFor=\"let group of duplicateGroups(); let gi = index\">\n                <div class=\"dup-group__import-row\">\n                  <div class=\"dup-group__label\">\n                    <i class=\"pi pi-file-import\"></i> Importing Row #{{ group.importRow.rowIndex }}\n                  </div>\n                  <div class=\"dup-group__detail\">\n                    <strong>{{ group.importRow.mapped['name'] || (group.importRow.mapped['firstName'] || '') + ' ' + (group.importRow.mapped['lastName'] || '') }}</strong>\n                    <span *ngIf=\"group.importRow.mapped['email']\">\u00B7 {{ group.importRow.mapped['email'] }}</span>\n                    <span *ngIf=\"group.importRow.mapped['company']\">\u00B7 {{ group.importRow.mapped['company'] }}</span>\n                  </div>\n                </div>\n\n                <div class=\"dup-matches\">\n                  <div class=\"dup-match\" *ngFor=\"let match of group.existingMatches\"\n                       [ngClass]=\"matchLevelClass(match.matchLevel)\">\n                    <div class=\"dup-match__head\">\n                      <i [class]=\"matchLevelIcon(match.matchLevel)\"></i>\n                      <strong>{{ match.name }}</strong>\n                      <span class=\"dup-match__score\">{{ match.matchScore }}% match</span>\n                    </div>\n                    <div class=\"dup-match__detail\">\n                      <span *ngIf=\"match.email\"><i class=\"pi pi-envelope\"></i> {{ match.email }}</span>\n                      <span *ngIf=\"match.companyName\"><i class=\"pi pi-building\"></i> {{ match.companyName }}</span>\n                      <span *ngIf=\"match.phone\"><i class=\"pi pi-phone\"></i> {{ match.phone }}</span>\n                    </div>\n                    <div class=\"dup-match__signals\">\n                      <span class=\"signal-chip\" *ngFor=\"let sig of match.matchedSignals\">{{ sig }}</span>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"dup-actions\">\n                  <button type=\"button\" class=\"dup-action-btn\" [class.dup-action-btn--active]=\"group.action === 'import'\"\n                          (click)=\"setDuplicateAction(gi, 'import')\">\n                    <i class=\"pi pi-plus-circle\"></i> Import Anyway\n                  </button>\n                  <button type=\"button\" class=\"dup-action-btn\" [class.dup-action-btn--active]=\"group.action === 'skip'\"\n                          (click)=\"setDuplicateAction(gi, 'skip')\">\n                    <i class=\"pi pi-minus-circle\"></i> Skip\n                  </button>\n                  <button type=\"button\" class=\"dup-action-btn\" [class.dup-action-btn--active]=\"group.action === 'merge'\"\n                          (click)=\"setDuplicateAction(gi, 'merge', group.existingMatches[0]?.leadId)\">\n                    <i class=\"pi pi-arrows-h\"></i> Merge\n                  </button>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"wiz-actions\">\n              <button type=\"button\" class=\"action-btn action-btn--back\" (click)=\"goToStep(3, activateCallback)\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-arrow-left\"></i></span>\n                <span>Back</span>\n              </button>\n              <button type=\"button\" class=\"action-btn action-btn--refresh\" (click)=\"runDuplicateCheck()\"\n                      [disabled]=\"duplicateChecking()\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n                <span>Re-scan</span>\n              </button>\n              <button type=\"button\" class=\"action-btn action-btn--add\"\n                      [disabled]=\"duplicateChecking() || importReadyCount() === 0\"\n                      (click)=\"goToStep(5, activateCallback)\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-arrow-right\"></i></span>\n                <span>Review &amp; Import</span>\n              </button>\n            </div>\n          </div>\n        </ng-template>\n      </p-step-panel>\n\n      <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n      <!--  STEP 5: Review & Import                             -->\n      <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n      <p-step-panel [value]=\"5\">\n        <ng-template pTemplate=\"content\" let-activateCallback=\"activateCallback\">\n          <div class=\"wiz-panel\">\n\n            <div class=\"review-section\" *ngIf=\"!importResult()\">\n              <h3 class=\"review-title\"><i class=\"pi pi-list-check\"></i> Import Summary</h3>\n\n              <div class=\"review-cards\">\n                <div class=\"review-card review-card--primary\">\n                  <div class=\"review-card__icon\"><i class=\"pi pi-users\"></i></div>\n                  <div class=\"review-card__value\">{{ importReadyCount() }}</div>\n                  <div class=\"review-card__label\">Leads to Import</div>\n                </div>\n                <div class=\"review-card review-card--warning\" *ngIf=\"skipCount > 0\">\n                  <div class=\"review-card__icon\"><i class=\"pi pi-minus-circle\"></i></div>\n                  <div class=\"review-card__value\">{{ skipCount }}</div>\n                  <div class=\"review-card__label\">Skipped (Duplicates)</div>\n                </div>\n                <div class=\"review-card review-card--cyan\" *ngIf=\"mergeCount > 0\">\n                  <div class=\"review-card__icon\"><i class=\"pi pi-arrows-h\"></i></div>\n                  <div class=\"review-card__value\">{{ mergeCount }}</div>\n                  <div class=\"review-card__label\">Merge Suggestions</div>\n                </div>\n                <div class=\"review-card review-card--muted\">\n                  <div class=\"review-card__icon\"><i class=\"pi pi-ban\"></i></div>\n                  <div class=\"review-card__value\">{{ rows().length - selectedCount() }}</div>\n                  <div class=\"review-card__label\">Deselected</div>\n                </div>\n              </div>\n\n              <div class=\"review-file\">\n                <i class=\"pi pi-file\"></i>\n                <span>{{ file()?.name }}</span>\n              </div>\n            </div>\n\n            <!-- Import result -->\n            <div class=\"import-done\" *ngIf=\"importResult() as result\">\n              <div class=\"import-done__icon\" [class.import-done__icon--success]=\"result.errors.length === 0\"\n                   [class.import-done__icon--error]=\"result.errors.length > 0\">\n                <i class=\"pi\" [ngClass]=\"result.errors.length === 0 ? 'pi-check-circle' : 'pi-exclamation-circle'\"></i>\n              </div>\n              <h3 *ngIf=\"result.errors.length === 0\">Import Complete!</h3>\n              <h3 *ngIf=\"result.errors.length > 0\">Import Failed</h3>\n              <div class=\"import-done__metrics\" *ngIf=\"result.errors.length === 0\">\n                <span><strong>{{ result.imported }}</strong> imported</span>\n                <span *ngIf=\"result.skipped > 0\"><strong>{{ result.skipped }}</strong> skipped</span>\n              </div>\n              <div class=\"import-done__errors\" *ngIf=\"result.errors.length > 0\">\n                <p *ngFor=\"let err of result.errors\">{{ err }}</p>\n              </div>\n            </div>\n\n            <div class=\"wiz-actions\">\n              <button type=\"button\" class=\"action-btn action-btn--back\" *ngIf=\"!importResult()\"\n                      (click)=\"goToStep(4, activateCallback)\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-arrow-left\"></i></span>\n                <span>Back</span>\n              </button>\n              <button type=\"button\" class=\"action-btn action-btn--add\" *ngIf=\"!importResult()\"\n                      [disabled]=\"importing() || importReadyCount() === 0\" (click)=\"startImport()\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-upload\"></i></span>\n                <span>{{ importing() ? 'Importing...' : 'Start Import' }}</span>\n              </button>\n              <button type=\"button\" class=\"action-btn action-btn--add\" *ngIf=\"importResult()\" (click)=\"close()\">\n                <span class=\"action-btn__icon\"><i class=\"pi pi-check\"></i></span>\n                <span>Done</span>\n              </button>\n            </div>\n          </div>\n        </ng-template>\n      </p-step-panel>\n\n    </p-step-panels>\n  </p-stepper>\n</div>\n", styles: ["@use '../../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//  Lead Import Wizard \u2014 Styles\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.wizard-container {\n  position: fixed;\n  inset: 0;\n  z-index: 1100;\n  display: flex;\n  flex-direction: column;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow: hidden;\n  animation: wizard-enter 0.35s ease-out;\n}\n\n@keyframes wizard-enter {\n  from { opacity: 0; transform: scale(0.97); }\n  to   { opacity: 1; transform: scale(1); }\n}\n\n// \u2500\u2500 Header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.wizard-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-6;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border-bottom: 1px solid $glass-border;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);\n  flex-shrink: 0;\n\n  &__title {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n\n    h2 {\n      margin: 0;\n      font-size: $font-size-2xl;\n      font-weight: 800;\n      line-height: 1.2;\n    }\n  }\n\n  &__icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $primary-gradient;\n    color: #fff;\n    border-radius: $radius-lg;\n    font-size: $font-size-xl;\n  }\n\n  &__subtitle {\n    margin: 2px 0 0;\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n.title-gradient {\n  background: $primary-gradient;\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.title-light {\n  -webkit-text-fill-color: $gray-700;\n  margin-left: $space-1;\n}\n\n.wizard-close {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: rgba(0, 0, 0, 0.05);\n  border-radius: $radius-md;\n  cursor: pointer;\n  color: $gray-600;\n  transition: all 200ms;\n\n  &:hover {\n    background: rgba(239, 68, 68, 0.1);\n    color: #ef4444;\n  }\n}\n\n// \u2500\u2500 Stepper chrome \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n:host ::ng-deep {\n  .p-stepper {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n    overflow: hidden;\n  }\n\n  .p-step-list {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0;\n    padding: $space-3 $space-6;\n    background: $glass-bg;\n    backdrop-filter: blur($glass-blur);\n    border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n    flex-shrink: 0;\n  }\n\n  .p-step {\n    flex: 0 0 auto;\n    position: relative;\n\n    &:not(:last-child)::after {\n      content: '';\n      position: absolute;\n      top: 50%;\n      right: -40px;\n      width: 40px;\n      height: 2px;\n      background: $gray-200;\n      transform: translateY(-50%);\n    }\n\n    + .p-step { margin-left: 40px; }\n  }\n\n  .p-step-panels {\n    flex: 1;\n    overflow-y: auto;\n    overflow-x: hidden;\n    padding: $space-5 $space-6;\n  }\n\n  .p-step-panel {\n    animation: fade-in-up 0.35s ease-out;\n  }\n\n  // Hide default stepper separators\n  .p-stepperseparator { display: none; }\n}\n\n// \u2500\u2500 Step buttons \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.wiz-step-btn {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border: none;\n  background: transparent;\n  border-radius: $radius-xl;\n  cursor: pointer;\n  transition: all 250ms;\n  white-space: nowrap;\n\n  &:disabled {\n    opacity: 0.45;\n    cursor: not-allowed;\n  }\n\n  &--active {\n    background: rgba(102, 126, 234, 0.1);\n\n    .wiz-step-num {\n      background: $primary-gradient;\n      color: white;\n      box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n    }\n\n    .wiz-step-label {\n      color: $gray-800;\n      font-weight: 600;\n    }\n  }\n\n  &--done .wiz-step-num {\n    background: $success-gradient;\n    color: white;\n  }\n}\n\n.wiz-step-num {\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background: $gray-200;\n  color: $gray-600;\n  font-size: $font-size-sm;\n  font-weight: 700;\n  transition: all 300ms;\n\n  &--done {\n    background: $success-gradient;\n    color: white;\n  }\n}\n\n.wiz-step-label {\n  font-size: $font-size-sm;\n  font-weight: 500;\n  color: $gray-500;\n  transition: color 200ms;\n\n  @media (max-width: 768px) {\n    display: none;\n  }\n}\n\n// \u2500\u2500 Panel base \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.wiz-panel {\n  max-width: 960px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: $space-5;\n}\n\n// \u2500\u2500 Actions bar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.wiz-actions {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: $space-3;\n  padding-top: $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//  STEP 1 \u2014 Upload\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.upload-zone {\n  position: relative;\n  border: 2px dashed rgba(102, 126, 234, 0.3);\n  border-radius: $radius-2xl;\n  background: $glass-bg-subtle;\n  backdrop-filter: blur($glass-blur);\n  padding: $space-8;\n  text-align: center;\n  transition: all 300ms;\n  cursor: pointer;\n\n  &--drag {\n    border-color: #667eea;\n    background: rgba(102, 126, 234, 0.06);\n    transform: scale(1.01);\n    box-shadow: 0 0 40px rgba(102, 126, 234, 0.15);\n  }\n\n  &--has-file {\n    border-style: solid;\n    border-color: rgba(34, 197, 94, 0.4);\n    background: rgba(34, 197, 94, 0.04);\n    cursor: default;\n    padding: $space-5;\n  }\n\n  &__empty {\n    position: relative;\n  }\n\n  &__icon {\n    font-size: 3rem;\n    color: #667eea;\n    margin-bottom: $space-3;\n    animation: float 3s ease-in-out infinite;\n  }\n\n  &__title {\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n    margin: 0 0 $space-1;\n  }\n\n  &__sub {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    margin: 0;\n  }\n\n  &__input {\n    position: absolute;\n    inset: 0;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer;\n  }\n}\n\n@keyframes float {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-8px); }\n}\n\n.file-card {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  border: 1px solid rgba(34, 197, 94, 0.2);\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n\n  &__icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $success-gradient;\n    color: white;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n  }\n\n  &__info {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n\n    strong {\n      font-size: $font-size-base;\n      color: $gray-800;\n    }\n\n    span {\n      font-size: $font-size-sm;\n      color: $gray-500;\n    }\n  }\n\n  &__remove {\n    width: 32px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border: none;\n    background: rgba(239, 68, 68, 0.08);\n    border-radius: $radius-md;\n    cursor: pointer;\n    color: #ef4444;\n    transition: all 200ms;\n\n    &:hover {\n      background: rgba(239, 68, 68, 0.15);\n      transform: scale(1.1);\n    }\n  }\n}\n\n.upload-hints {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.hint-card {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  background: $glass-bg;\n  border: 1px solid $glass-border;\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  color: $gray-600;\n\n  i {\n    color: #667eea;\n    font-size: $font-size-base;\n  }\n\n  &--template {\n    cursor: pointer;\n    background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);\n    border: 1px solid rgba(102, 126, 234, 0.25);\n    transition: all 250ms;\n\n    &:hover {\n      background: linear-gradient(135deg, rgba(102, 126, 234, 0.14) 0%, rgba(118, 75, 162, 0.14) 100%);\n      border-color: rgba(102, 126, 234, 0.4);\n      transform: translateY(-1px);\n      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);\n    }\n\n    strong { color: #667eea; }\n  }\n\n  &__arrow {\n    margin-left: auto;\n    font-size: $font-size-sm !important;\n    animation: bounce-down 1.5s ease-in-out infinite;\n  }\n}\n\n@keyframes bounce-down {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(3px); }\n}\n\n.parse-error {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3;\n  background: rgba(239, 68, 68, 0.08);\n  border: 1px solid rgba(239, 68, 68, 0.2);\n  border-radius: $radius-md;\n  color: #ef4444;\n  font-size: $font-size-sm;\n  font-weight: 500;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//  STEP 2 \u2014 Column Mapping\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.mapping-intro {\n  padding: $space-3 $space-4;\n  background: rgba(102, 126, 234, 0.06);\n  border: 1px solid rgba(102, 126, 234, 0.15);\n  border-radius: $radius-lg;\n  font-size: $font-size-sm;\n  color: $gray-700;\n\n  i { color: #667eea; font-size: $font-size-base; margin-right: $space-1; }\n}\n\n.mapping-grid {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  overflow: hidden;\n  background: $glass-bg;\n}\n\n.mapping-row {\n  display: grid;\n  grid-template-columns: 1fr 32px 1fr 1fr;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  align-items: center;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  transition: background 150ms;\n\n  &:last-child { border-bottom: none; }\n\n  &--header {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n    padding: $space-2 $space-4;\n  }\n\n  &--mapped {\n    background: rgba(34, 197, 94, 0.03);\n  }\n\n  &:hover:not(.mapping-row--header) {\n    background: rgba(102, 126, 234, 0.03);\n  }\n\n  @media (max-width: 768px) {\n    grid-template-columns: 1fr;\n    gap: $space-1;\n  }\n}\n\n.mapping-csv-header {\n  font-weight: 600;\n  font-size: $font-size-sm;\n  color: $gray-800;\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n\n  i { color: #667eea; }\n}\n\n.mapping-arrow {\n  text-align: center;\n  color: $gray-400;\n  font-size: $font-size-sm;\n\n  @media (max-width: 768px) { display: none; }\n}\n\n.mapping-samples {\n  display: flex;\n  gap: $space-1;\n  flex-wrap: wrap;\n}\n\n.sample-pill {\n  padding: 2px 8px;\n  background: rgba(0, 0, 0, 0.04);\n  border-radius: $radius-full;\n  font-size: 0.75rem;\n  color: $gray-500;\n  max-width: 120px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.mapping-warning {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3;\n  background: rgba(245, 158, 11, 0.08);\n  border: 1px solid rgba(245, 158, 11, 0.2);\n  border-radius: $radius-md;\n  color: #b45309;\n  font-size: $font-size-sm;\n  font-weight: 500;\n\n  i { color: #f59e0b; }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//  STEP 3 \u2014 Preview & Select\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.preview-toolbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: $space-3;\n\n  &__left {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n  }\n}\n\n.select-all-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-3;\n  border: 1px solid $glass-border;\n  background: $glass-bg;\n  border-radius: $radius-md;\n  cursor: pointer;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-700;\n  transition: all 200ms;\n\n  &:hover {\n    border-color: rgba(102, 126, 234, 0.3);\n    background: rgba(102, 126, 234, 0.05);\n    color: #667eea;\n  }\n\n  i { font-size: $font-size-base; }\n}\n\n.preview-count {\n  font-size: $font-size-sm;\n  color: $gray-600;\n\n  strong { color: $gray-800; }\n}\n\n.preview-valid {\n  color: #f59e0b;\n}\n\n.preview-table-wrap {\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  overflow: hidden;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n\n  :host ::ng-deep {\n    .p-datatable-thead > tr > th {\n      background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n      border: none;\n      border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n      padding: $space-2 $space-3;\n      font-size: 0.72rem;\n      font-weight: 600;\n      text-transform: uppercase;\n      letter-spacing: 0.08em;\n      color: #3b82f6;\n    }\n\n    .p-datatable-tbody > tr > td {\n      padding: $space-2 $space-3;\n      font-size: $font-size-sm;\n      border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n    }\n  }\n}\n\n.row-error {\n  background: rgba(239, 68, 68, 0.03) !important;\n}\n\n.row-deselected {\n  opacity: 0.5;\n}\n\n.row-num {\n  font-size: $font-size-xs;\n  color: $gray-400;\n  font-weight: 600;\n}\n\n.row-status {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  padding: 2px 8px;\n  border-radius: $radius-full;\n\n  &--valid {\n    color: #16a34a;\n    background: rgba(34, 197, 94, 0.1);\n  }\n\n  &--error {\n    color: #dc2626;\n    background: rgba(239, 68, 68, 0.1);\n  }\n}\n\n.empty-msg {\n  text-align: center;\n  color: $gray-400;\n  padding: $space-6 !important;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//  STEP 4 \u2014 Duplicate Detection\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.dup-progress {\n  padding: $space-5;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: $space-2;\n    font-size: $font-size-base;\n    font-weight: 600;\n    color: $gray-700;\n\n    i { color: #667eea; font-size: $font-size-xl; }\n  }\n}\n\n.dup-empty {\n  padding: $space-8;\n  text-align: center;\n\n  &__icon {\n    font-size: 3.5rem;\n    color: #22c55e;\n    margin-bottom: $space-3;\n  }\n\n  h3 {\n    margin: 0 0 $space-2;\n    font-size: $font-size-lg;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0;\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n.dup-summary {\n  display: flex;\n  justify-content: center;\n\n  &__badge {\n    display: inline-flex;\n    align-items: center;\n    gap: $space-2;\n    padding: $space-2 $space-4;\n    border-radius: $radius-full;\n    font-size: $font-size-sm;\n    font-weight: 600;\n\n    &--warn {\n      background: rgba(245, 158, 11, 0.1);\n      color: #b45309;\n      border: 1px solid rgba(245, 158, 11, 0.2);\n    }\n  }\n}\n\n.dup-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.dup-group {\n  background: $glass-bg;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all 250ms;\n\n  &:hover {\n    box-shadow: $glass-shadow-hover;\n    transform: translateY(-1px);\n  }\n\n  &__import-row {\n    padding: $space-3 $space-4;\n    background: rgba(102, 126, 234, 0.04);\n    border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n  }\n\n  &__label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: #667eea;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    margin-bottom: 4px;\n\n    i { margin-right: $space-1; }\n  }\n\n  &__detail {\n    font-size: $font-size-sm;\n    color: $gray-700;\n\n    strong { color: $gray-800; }\n    span { color: $gray-500; margin-left: $space-1; }\n  }\n}\n\n.dup-matches {\n  padding: $space-3 $space-4;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.dup-match {\n  padding: $space-3;\n  border-radius: $radius-md;\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  transition: all 200ms;\n\n  &.match-block {\n    border-color: rgba(239, 68, 68, 0.2);\n    background: rgba(239, 68, 68, 0.03);\n  }\n\n  &.match-warning {\n    border-color: rgba(245, 158, 11, 0.2);\n    background: rgba(245, 158, 11, 0.03);\n  }\n\n  &__head {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    margin-bottom: 4px;\n\n    strong {\n      font-size: $font-size-sm;\n      color: $gray-800;\n    }\n  }\n\n  &__score {\n    margin-left: auto;\n    font-size: $font-size-xs;\n    font-weight: 700;\n    padding: 2px 8px;\n    border-radius: $radius-full;\n    background: rgba(102, 126, 234, 0.1);\n    color: #667eea;\n  }\n\n  &__detail {\n    display: flex;\n    flex-wrap: wrap;\n    gap: $space-3;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    span {\n      display: flex;\n      align-items: center;\n      gap: 4px;\n    }\n  }\n\n  &__signals {\n    display: flex;\n    flex-wrap: wrap;\n    gap: $space-1;\n    margin-top: $space-2;\n  }\n}\n\n.signal-chip {\n  padding: 2px 8px;\n  background: rgba(102, 126, 234, 0.08);\n  border-radius: $radius-full;\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: #667eea;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.dup-actions {\n  display: flex;\n  gap: $space-2;\n  padding: $space-3 $space-4;\n  border-top: 1px solid rgba(0, 0, 0, 0.05);\n  background: rgba(0, 0, 0, 0.01);\n}\n\n.dup-action-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-1 $space-3;\n  border: 1px solid $glass-border;\n  border-radius: $radius-md;\n  background: $glass-bg;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  color: $gray-600;\n  cursor: pointer;\n  transition: all 200ms;\n\n  &:hover {\n    border-color: rgba(102, 126, 234, 0.3);\n    color: #667eea;\n  }\n\n  &--active {\n    background: $primary-gradient;\n    color: white !important;\n    border-color: transparent;\n    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//  STEP 5 \u2014 Review & Import\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n.review-section {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.review-title {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-lg;\n  font-weight: 700;\n  color: $gray-800;\n  margin: 0;\n\n  i {\n    color: #667eea;\n    font-size: $font-size-xl;\n  }\n}\n\n.review-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: $space-3;\n}\n\n.review-card {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-4;\n  background: $glass-bg;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  text-align: center;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  &__icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-lg;\n    font-size: $font-size-xl;\n    color: white;\n  }\n\n  &--primary &__icon { background: $primary-gradient; }\n  &--warning &__icon { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }\n  &--cyan &__icon { background: $cyan-gradient; }\n  &--muted &__icon { background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%); }\n\n  &__value {\n    font-size: $font-size-4xl;\n    font-weight: 800;\n    color: $gray-800;\n    line-height: 1;\n  }\n\n  &__label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n}\n\n.review-file {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-4;\n  background: rgba(0, 0, 0, 0.03);\n  border-radius: $radius-md;\n  font-size: $font-size-sm;\n  color: $gray-600;\n\n  i { color: #667eea; }\n}\n\n// \u2500\u2500 Import result \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.import-done {\n  padding: $space-8;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-3;\n\n  &__icon {\n    width: 72px;\n    height: 72px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 50%;\n    font-size: 2rem;\n\n    &--success {\n      background: rgba(34, 197, 94, 0.1);\n      color: #22c55e;\n    }\n\n    &--error {\n      background: rgba(239, 68, 68, 0.1);\n      color: #ef4444;\n    }\n  }\n\n  h3 {\n    margin: 0;\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  &__metrics {\n    display: flex;\n    gap: $space-4;\n    font-size: $font-size-sm;\n    color: $gray-600;\n\n    strong { color: $gray-800; }\n  }\n\n  &__errors {\n    max-width: 500px;\n\n    p {\n      margin: $space-1 0;\n      padding: $space-2 $space-3;\n      background: rgba(239, 68, 68, 0.06);\n      border-radius: $radius-md;\n      font-size: $font-size-sm;\n      color: #dc2626;\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//  Responsive\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@media (max-width: 768px) {\n  .wizard-header {\n    padding: $space-2 $space-3;\n  }\n\n  :host ::ng-deep .p-step-panels {\n    padding: $space-3;\n  }\n\n  .mapping-grid,\n  .preview-table-wrap {\n    font-size: $font-size-xs;\n  }\n\n  .review-cards {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .dup-actions {\n    flex-wrap: wrap;\n  }\n}\n"] }]
    }], null, { closed: [{
            type: Output
        }], imported: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LeadImportWizardComponent, { className: "LeadImportWizardComponent", filePath: "src/app/crm/features/leads/components/lead-import-wizard/lead-import-wizard.component.ts", lineNumber: 42 }); })();
