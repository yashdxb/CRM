import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { ApprovalWorkflowBuilderFacade } from '../services/approval-workflow-builder.facade';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/accordion";
import * as i4 from "primeng/api";
import * as i5 from "primeng/button";
import * as i6 from "primeng/card";
import * as i7 from "primeng/chip";
import * as i8 from "primeng/divider";
import * as i9 from "primeng/inputnumber";
import * as i10 from "primeng/inputtext";
import * as i11 from "primeng/menu";
import * as i12 from "primeng/message";
import * as i13 from "primeng/panel";
import * as i14 from "primeng/select";
import * as i15 from "primeng/tag";
import * as i16 from "primeng/textarea";
import * as i17 from "primeng/toggleswitch";
import * as i18 from "primeng/tooltip";
const _c0 = () => ({ label: "Sequential", value: "Sequential" });
const _c1 = () => ({ label: "Final", value: "Final" });
const _c2 = (a0, a1) => [a0, a1];
const _c3 = () => [];
const _forTrack0 = ($index, $item) => $item.id;
function WorkflowBuilderPage_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 97);
    i0.ɵɵelement(1, "i", 98);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Loading live workflow metadata, role catalog, and approver sources.");
    i0.ɵɵelementEnd()();
} }
function WorkflowBuilderPage_div_84_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 99);
    i0.ɵɵelement(1, "i", 48);
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3, "No conditions yet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Create a rule group to control when this workflow should start.");
    i0.ɵɵelementEnd()();
} }
function WorkflowBuilderPage_p_panel_85_div_12_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 119);
    i0.ɵɵelement(1, "p-tag", 120);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_7_0;
    const ruleControl_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", (tmp_7_0 = ruleControl_r5.get("combinator")) == null ? null : tmp_7_0.value);
} }
function WorkflowBuilderPage_p_panel_85_div_12_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 114)(1, "label", 103);
    i0.ɵɵtext(2, "Joiner");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "p-select", 105);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ruleIndex_r6 = i0.ɵɵnextContext().index;
    const groupIndex_r2 = i0.ɵɵnextContext().index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("for", "condition-joiner-" + groupIndex_r2 + "-" + ruleIndex_r6);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "condition-joiner-" + groupIndex_r2 + "-" + ruleIndex_r6)("options", ctx_r2.combinatorOptions);
} }
function WorkflowBuilderPage_p_panel_85_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 111);
    i0.ɵɵtemplate(1, WorkflowBuilderPage_p_panel_85_div_12_div_1_Template, 2, 1, "div", 112);
    i0.ɵɵelementStart(2, "div", 29)(3, "label", 103);
    i0.ɵɵtext(4, "Field");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "p-select", 113);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 114)(7, "label", 103);
    i0.ɵɵtext(8, "Operator");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "p-select", 115);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 29)(11, "label", 103);
    i0.ɵɵtext(12, "Value");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "input", 116);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, WorkflowBuilderPage_p_panel_85_div_12_div_14_Template, 4, 3, "div", 117);
    i0.ɵɵelementStart(15, "button", 118);
    i0.ɵɵlistener("click", function WorkflowBuilderPage_p_panel_85_div_12_Template_button_click_15_listener() { const ruleIndex_r6 = i0.ɵɵrestoreView(_r4).index; const groupIndex_r2 = i0.ɵɵnextContext().index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.removeCondition(groupIndex_r2, ruleIndex_r6)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ruleIndex_r6 = ctx.index;
    const groupIndex_r2 = i0.ɵɵnextContext().index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroupName", ruleIndex_r6);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ruleIndex_r6 > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "condition-field-" + groupIndex_r2 + "-" + ruleIndex_r6);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "condition-field-" + groupIndex_r2 + "-" + ruleIndex_r6)("options", ctx_r2.conditionFieldOptions());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "condition-operator-" + groupIndex_r2 + "-" + ruleIndex_r6);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "condition-operator-" + groupIndex_r2 + "-" + ruleIndex_r6)("options", ctx_r2.conditionOperatorOptions());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "condition-value-" + groupIndex_r2 + "-" + ruleIndex_r6);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "condition-value-" + groupIndex_r2 + "-" + ruleIndex_r6);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ruleIndex_r6 > 0);
} }
function WorkflowBuilderPage_p_panel_85_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "p-panel", 100)(1, "div", 101)(2, "div", 102)(3, "label", 103);
    i0.ɵɵtext(4, "Group Label");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "input", 104);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 102)(7, "label", 103);
    i0.ɵɵtext(8, "Group Logic");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "p-select", 105);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 106);
    i0.ɵɵlistener("click", function WorkflowBuilderPage_p_panel_85_Template_button_click_10_listener() { const groupIndex_r2 = i0.ɵɵrestoreView(_r1).index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.removeConditionGroup(groupIndex_r2)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 107);
    i0.ɵɵtemplate(12, WorkflowBuilderPage_p_panel_85_div_12_Template, 16, 11, "div", 108);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 109)(14, "button", 110);
    i0.ɵɵlistener("click", function WorkflowBuilderPage_p_panel_85_Template_button_click_14_listener() { const groupIndex_r2 = i0.ɵɵrestoreView(_r1).index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.addCondition(groupIndex_r2)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const groupIndex_r2 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroupName", groupIndex_r2)("toggleable", false)("header", "Condition Group " + (groupIndex_r2 + 1));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("for", "condition-group-label-" + groupIndex_r2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "condition-group-label-" + groupIndex_r2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "condition-group-combinator-" + groupIndex_r2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "condition-group-combinator-" + groupIndex_r2)("options", ctx_r2.combinatorOptions);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r2.conditionRules(groupIndex_r2).controls);
} }
function WorkflowBuilderPage_div_103_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 99);
    i0.ɵɵelement(1, "i", 56);
    i0.ɵɵelementStart(2, "strong");
    i0.ɵɵtext(3, "No approval path defined");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Add a sequential step or a parallel group to build the approval flow.");
    i0.ɵɵelementEnd()();
} }
function WorkflowBuilderPage_div_104_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 136);
} }
function WorkflowBuilderPage_div_104_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 137);
    i0.ɵɵelement(1, "p-tag", 9);
    i0.ɵɵelementStart(2, "span", 138);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 138);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    const stepControl_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("severity", ctx_r2.facade.stepTypeTagSeverity[(tmp_5_0 = stepControl_r8.get("stepType")) == null ? null : tmp_5_0.value])("value", (tmp_6_0 = stepControl_r8.get("stepType")) == null ? null : tmp_6_0.value);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r2.statusChipClass((tmp_7_0 = stepControl_r8.get("completionRule")) == null ? null : tmp_7_0.value));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate((tmp_8_0 = stepControl_r8.get("completionRule")) == null ? null : tmp_8_0.value);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r2.statusChipClass((tmp_9_0 = stepControl_r8.get("escalationRule")) == null ? null : tmp_9_0.value));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate((tmp_10_0 = stepControl_r8.get("escalationRule")) == null ? null : tmp_10_0.value);
} }
function WorkflowBuilderPage_div_104_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 137)(1, "span", 139);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 140);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    const stepControl_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_5_0 = stepControl_r8.get("completionMode")) == null ? null : tmp_5_0.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", (tmp_6_0 = stepControl_r8.get("requiredApprovals")) == null ? null : tmp_6_0.value, " required");
} }
function WorkflowBuilderPage_div_104_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 141)(1, "div", 29)(2, "label", 103);
    i0.ɵɵtext(3, "Step Title");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 142);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 29)(6, "label", 103);
    i0.ɵɵtext(7, "Step Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "p-select", 143);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 29)(10, "label", 103);
    i0.ɵɵtext(11, "Approver Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "p-select", 144);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 29)(14, "label", 103);
    i0.ɵɵtext(15, "Approver");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "p-select", 145);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 29)(18, "label", 103);
    i0.ɵɵtext(19, "SLA Hours");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(20, "p-inputNumber", 146);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "div", 29)(22, "label", 103);
    i0.ɵɵtext(23, "Escalation Rule");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(24, "p-select", 147);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 29)(26, "label", 103);
    i0.ɵɵtext(27, "Completion Rule");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(28, "p-select", 148);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext();
    const stepControl_r8 = ctx_r10.$implicit;
    const stepIndex_r9 = ctx_r10.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "step-title-" + stepIndex_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "step-title-" + stepIndex_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "step-type-" + stepIndex_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "step-type-" + stepIndex_r9)("options", i0.ɵɵpureFunction2(22, _c2, i0.ɵɵpureFunction0(20, _c0), i0.ɵɵpureFunction0(21, _c1)));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "step-approver-type-" + stepIndex_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "step-approver-type-" + stepIndex_r9)("options", ctx_r2.approverTypeOptions());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "step-approver-" + stepIndex_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "step-approver-" + stepIndex_r9)("options", ctx_r2.approverSelectorOptionsFor(stepControl_r8));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "step-sla-" + stepIndex_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("inputId", "step-sla-" + stepIndex_r9)("min", 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "step-escalation-" + stepIndex_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "step-escalation-" + stepIndex_r9)("options", ctx_r2.escalationRuleOptions());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "step-completion-" + stepIndex_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "step-completion-" + stepIndex_r9)("options", ctx_r2.completionRuleOptions());
} }
function WorkflowBuilderPage_div_104_div_19_div_15_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 156)(1, "div", 157)(2, "div")(3, "h4");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 137)(6, "span", 139);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 158);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(10, "button", 159);
    i0.ɵɵlistener("click", function WorkflowBuilderPage_div_104_div_19_div_15_Template_button_click_10_listener() { const approverIndex_r14 = i0.ɵɵrestoreView(_r13).index; const stepIndex_r9 = i0.ɵɵnextContext(2).index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.removeParallelApprover(stepIndex_r9, approverIndex_r14)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 160)(12, "div", 29)(13, "label");
    i0.ɵɵtext(14, "Title");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "input", 161);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 29)(17, "label");
    i0.ɵɵtext(18, "Approver Type");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(19, "p-select", 162);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 29)(21, "label");
    i0.ɵɵtext(22, "Approver");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(23, "p-select", 163);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 29)(25, "label");
    i0.ɵɵtext(26, "SLA Hours");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(27, "p-inputNumber", 164);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "div", 29)(29, "label");
    i0.ɵɵtext(30, "Escalation");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(31, "p-select", 165);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "div", 29)(33, "label");
    i0.ɵɵtext(34, "Completion");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(35, "p-select", 166);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    const approverControl_r15 = ctx.$implicit;
    const approverIndex_r14 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("formGroupName", approverIndex_r14);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(((tmp_9_0 = approverControl_r15.get("title")) == null ? null : tmp_9_0.value) || "Approver " + (approverIndex_r14 + 1));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate((tmp_10_0 = approverControl_r15.get("completionRule")) == null ? null : tmp_10_0.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_11_0 = approverControl_r15.get("escalationRule")) == null ? null : tmp_11_0.value);
    i0.ɵɵadvance();
    i0.ɵɵproperty("text", true);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("options", ctx_r2.approverTypeOptions());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r2.approverSelectorOptionsFor(approverControl_r15));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("min", 1);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r2.escalationRuleOptions());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r2.completionRuleOptions());
} }
function WorkflowBuilderPage_div_104_div_19_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 149)(1, "div", 150)(2, "div", 29)(3, "label", 103);
    i0.ɵɵtext(4, "Parallel Group");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "input", 142);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 29)(7, "label", 103);
    i0.ɵɵtext(8, "Completion Mode");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "p-select", 151);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 29)(11, "label", 103);
    i0.ɵɵtext(12, "Required Approvals");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "p-inputNumber", 152);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "div", 153);
    i0.ɵɵtemplate(15, WorkflowBuilderPage_div_104_div_19_div_15_Template, 36, 10, "div", 154);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 109)(17, "button", 155);
    i0.ɵɵlistener("click", function WorkflowBuilderPage_div_104_div_19_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r12); const stepIndex_r9 = i0.ɵɵnextContext().index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.addParallelApprover(stepIndex_r9)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const stepIndex_r9 = i0.ɵɵnextContext().index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("for", "parallel-title-" + stepIndex_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "parallel-title-" + stepIndex_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "parallel-mode-" + stepIndex_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", "parallel-mode-" + stepIndex_r9)("options", ctx_r2.completionModeOptions());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("for", "parallel-required-" + stepIndex_r9);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("inputId", "parallel-required-" + stepIndex_r9)("min", 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.parallelApprovers(stepIndex_r9).controls);
} }
function WorkflowBuilderPage_div_104_p_accordion_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-accordion", 120)(1, "p-accordion-panel", 167)(2, "p-accordion-header");
    i0.ɵɵtext(3, "Advanced Settings");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p-accordion-content")(5, "div", 168)(6, "div", 29)(7, "label");
    i0.ɵɵtext(8, "Reminder Hours");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "p-inputNumber", 169);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 29)(11, "label");
    i0.ɵɵtext(12, "Escalation Contact");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(13, "p-select", 170);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 39)(15, "label");
    i0.ɵɵtext(16, "Require Comment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 41);
    i0.ɵɵelement(18, "p-toggleswitch", 171);
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 39)(22, "label");
    i0.ɵɵtext(23, "Allow Delegate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "div", 41);
    i0.ɵɵelement(25, "p-toggleswitch", 172);
    i0.ɵɵelementStart(26, "span");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(28, "div", 43)(29, "label");
    i0.ɵɵtext(30, "Implementation Notes");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(31, "textarea", 173);
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    let tmp_9_0;
    let tmp_10_0;
    const stepControl_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", i0.ɵɵpureFunction0(6, _c3));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("formGroup", ctx_r2.advancedSettingsGroup(stepControl_r8));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("min", 0);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("options", ctx_r2.approverSelectorOptionsFor(stepControl_r8));
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(((tmp_9_0 = stepControl_r8.get("advanced.requireDecisionComment")) == null ? null : tmp_9_0.value) ? "Required" : "Optional");
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(((tmp_10_0 = stepControl_r8.get("advanced.allowDelegateApproval")) == null ? null : tmp_10_0.value) ? "Allowed" : "Blocked");
} }
function WorkflowBuilderPage_div_104_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 121);
    i0.ɵɵtemplate(1, WorkflowBuilderPage_div_104_div_1_Template, 1, 0, "div", 122);
    i0.ɵɵelementStart(2, "div", 123)(3, "div", 124)(4, "span", 125);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div")(7, "h3");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, WorkflowBuilderPage_div_104_div_9_Template, 6, 6, "div", 126)(10, WorkflowBuilderPage_div_104_div_10_Template, 5, 2, "div", 126);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 127)(12, "button", 128);
    i0.ɵɵlistener("click", function WorkflowBuilderPage_div_104_Template_button_click_12_listener() { let tmp_5_0; const stepControl_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectFlowItem((tmp_5_0 = stepControl_r8.get("id")) == null ? null : tmp_5_0.value)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "button", 129);
    i0.ɵɵlistener("click", function WorkflowBuilderPage_div_104_Template_button_click_13_listener() { const stepIndex_r9 = i0.ɵɵrestoreView(_r7).index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.moveFlowItem(stepIndex_r9, -1)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 130);
    i0.ɵɵlistener("click", function WorkflowBuilderPage_div_104_Template_button_click_14_listener() { const stepIndex_r9 = i0.ɵɵrestoreView(_r7).index; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.moveFlowItem(stepIndex_r9, 1)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "p-menu", 131, 0);
    i0.ɵɵelementStart(17, "button", 132);
    i0.ɵɵlistener("click", function WorkflowBuilderPage_div_104_Template_button_click_17_listener($event) { i0.ɵɵrestoreView(_r7); const stepMenu_r10 = i0.ɵɵreference(16); return i0.ɵɵresetView(stepMenu_r10.toggle($event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(18, WorkflowBuilderPage_div_104_div_18_Template, 29, 25, "div", 133)(19, WorkflowBuilderPage_div_104_div_19_Template, 18, 9, "div", 134)(20, WorkflowBuilderPage_div_104_p_accordion_20_Template, 32, 7, "p-accordion", 135);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_4_0;
    let tmp_9_0;
    const stepControl_r8 = ctx.$implicit;
    const stepIndex_r9 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("flow-item--selected", ctx_r2.isSelectedFlowItem((tmp_4_0 = stepControl_r8.get("id")) == null ? null : tmp_4_0.value))("flow-item--parallel", ctx_r2.isParallelGroup(stepControl_r8));
    i0.ɵɵproperty("formGroupName", stepIndex_r9);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", stepIndex_r9 < ctx_r2.flowSteps.length - 1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1("Step ", stepIndex_r9 + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(((tmp_9_0 = stepControl_r8.get("title")) == null ? null : tmp_9_0.value) || (ctx_r2.isParallelGroup(stepControl_r8) ? "Parallel Group" : "New Step"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.isParallelGroup(stepControl_r8));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.isParallelGroup(stepControl_r8));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("text", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("text", true)("disabled", stepIndex_r9 === 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("text", true)("disabled", stepIndex_r9 === ctx_r2.flowSteps.length - 1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("model", ctx_r2.stepMenuItems(stepIndex_r9))("popup", true);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("text", true);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.isParallelGroup(stepControl_r8));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.isParallelGroup(stepControl_r8));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.isParallelGroup(stepControl_r8));
} }
function WorkflowBuilderPage_ng_template_160_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 174)(1, "div")(2, "span", 175);
    i0.ɵɵtext(3, "Workflow Summary");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Live rollout summary");
    i0.ɵɵelementEnd()()();
} }
function WorkflowBuilderPage_ng_template_194_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 174)(1, "div")(2, "span", 175);
    i0.ɵɵtext(3, "Live Logic Preview");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Human-readable workflow narrative");
    i0.ɵɵelementEnd()()();
} }
function WorkflowBuilderPage_ng_template_199_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 174)(1, "div")(2, "span", 175);
    i0.ɵɵtext(3, "Validation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Readiness checks");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(6, "p-tag", 9);
    i0.ɵɵpipe(7, "titlecase");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("severity", ctx_r2.validationSeverity())("value", i0.ɵɵpipeBind1(7, 2, ctx_r2.validationSeverity()));
} }
function WorkflowBuilderPage_ng_container_201_p_message_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-message", 177);
} if (rf & 2) {
    const item_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("severity", item_r16.severity)("text", item_r16.title + " \u2014 " + item_r16.detail);
} }
function WorkflowBuilderPage_ng_container_201_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 178);
    i0.ɵɵelement(1, "p-tag", 179);
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r16 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r16.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r16.detail);
} }
function WorkflowBuilderPage_ng_container_201_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, WorkflowBuilderPage_ng_container_201_p_message_1_Template, 1, 2, "p-message", 176)(2, WorkflowBuilderPage_ng_container_201_ng_template_2_Template, 7, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r16 = ctx.$implicit;
    const validationSuccess_r17 = i0.ɵɵreference(3);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.isValidationMessage(item_r16.severity))("ngIfElse", validationSuccess_r17);
} }
function WorkflowBuilderPage_ng_template_203_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 174)(1, "div")(2, "span", 175);
    i0.ɵɵtext(3, "Test Scenario");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Evaluate a sample record");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(6, "p-tag", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("severity", ctx_r2.scenarioResult().matches ? "success" : "warn")("value", ctx_r2.scenarioResult().badge);
} }
function WorkflowBuilderPage_ng_template_225_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 174)(1, "div")(2, "span", 175);
    i0.ɵɵtext(3, "Simulation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h2");
    i0.ɵɵtext(5, "Traversed nodes & outcome");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(6, "p-tag", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("severity", ctx_r2.simulationResult().triggered ? "success" : "warn")("value", ctx_r2.simulationResult().badge);
} }
function WorkflowBuilderPage_For_228_Case_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 63);
} }
function WorkflowBuilderPage_For_228_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 182);
} }
function WorkflowBuilderPage_For_228_Case_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 183);
} }
function WorkflowBuilderPage_For_228_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 180)(1, "span", 181);
    i0.ɵɵconditionalCreate(2, WorkflowBuilderPage_For_228_Case_2_Template, 1, 0, "i", 63)(3, WorkflowBuilderPage_For_228_Case_3_Template, 1, 0, "i", 182)(4, WorkflowBuilderPage_For_228_Case_4_Template, 1, 0, "i", 183);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 184)(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 185);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_11_0;
    const node_r18 = ctx.$implicit;
    i0.ɵɵclassMap("simulation-node--" + node_r18.status);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_11_0 = node_r18.status) === "passed" ? 2 : tmp_11_0 === "skipped" ? 3 : tmp_11_0 === "pending" ? 4 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(node_r18.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(node_r18.detail);
} }
export class WorkflowBuilderPage {
    fb = inject(FormBuilder);
    facade = inject(ApprovalWorkflowBuilderFacade);
    toast = inject(AppToastService);
    destroyRef = inject(DestroyRef);
    route = inject(ActivatedRoute);
    currentDefinition = signal(this.loadInitialDefinition(), ...(ngDevMode ? [{ debugName: "currentDefinition" }] : []));
    savedSnapshot = signal(this.loadInitialDefinition(), ...(ngDevMode ? [{ debugName: "savedSnapshot" }] : []));
    workflowStatus = signal(this.savedSnapshot().status, ...(ngDevMode ? [{ debugName: "workflowStatus" }] : []));
    selectedFlowItemId = signal(this.savedSnapshot().steps[0]?.id ?? null, ...(ngDevMode ? [{ debugName: "selectedFlowItemId" }] : []));
    metadataLoading = this.facade.metadataLoading;
    expandedSections = signal(['details'], ...(ngDevMode ? [{ debugName: "expandedSections" }] : []));
    moduleOptions = this.facade.moduleOptions;
    triggerOptions = this.facade.triggerOptions;
    combinatorOptions = this.facade.combinatorOptions;
    approverTypeOptions = this.facade.approverTypeOptions;
    conditionFieldOptions = computed(() => this.facade.buildConditionFieldOptions(this.currentDefinition()), ...(ngDevMode ? [{ debugName: "conditionFieldOptions" }] : []));
    conditionOperatorOptions = computed(() => this.facade.buildConditionOperatorOptions(this.currentDefinition()), ...(ngDevMode ? [{ debugName: "conditionOperatorOptions" }] : []));
    escalationRuleOptions = computed(() => this.facade.buildEscalationRuleOptions(this.currentDefinition()), ...(ngDevMode ? [{ debugName: "escalationRuleOptions" }] : []));
    completionRuleOptions = computed(() => this.facade.buildCompletionRuleOptions(this.currentDefinition()), ...(ngDevMode ? [{ debugName: "completionRuleOptions" }] : []));
    completionModeOptions = computed(() => this.facade.buildCompletionModeOptions(this.currentDefinition()), ...(ngDevMode ? [{ debugName: "completionModeOptions" }] : []));
    outcomeActionOptions = computed(() => this.facade.buildOutcomeActionOptions(this.currentDefinition()), ...(ngDevMode ? [{ debugName: "outcomeActionOptions" }] : []));
    form = this.buildForm(this.savedSnapshot());
    summary = computed(() => this.facade.buildSummary(this.currentDefinition()), ...(ngDevMode ? [{ debugName: "summary" }] : []));
    logicPreview = computed(() => this.facade.buildLogicPreview(this.currentDefinition()), ...(ngDevMode ? [{ debugName: "logicPreview" }] : []));
    validationItems = computed(() => this.facade.buildValidation(this.currentDefinition()), ...(ngDevMode ? [{ debugName: "validationItems" }] : []));
    scenarioResult = computed(() => this.facade.evaluateScenario(this.currentDefinition(), this.currentDefinition().testScenario), ...(ngDevMode ? [{ debugName: "scenarioResult" }] : []));
    simulationResult = computed(() => this.facade.runSimulation(this.currentDefinition(), this.currentDefinition().testScenario), ...(ngDevMode ? [{ debugName: "simulationResult" }] : []));
    statusSeverity = computed(() => this.workflowStatus() === 'Active' ? 'success' : 'info', ...(ngDevMode ? [{ debugName: "statusSeverity" }] : []));
    validationSeverity = computed(() => {
        const validations = this.validationItems();
        if (validations.some((item) => item.severity === 'error')) {
            return 'danger';
        }
        if (validations.some((item) => item.severity === 'warn')) {
            return 'warn';
        }
        return 'success';
    }, ...(ngDevMode ? [{ debugName: "validationSeverity" }] : []));
    canPublish = computed(() => this.form.valid && !this.validationItems().some((item) => item.severity === 'error'), ...(ngDevMode ? [{ debugName: "canPublish" }] : []));
    lastSavedLabel = computed(() => this.formatDate(this.facade.lastSavedAtUtc()), ...(ngDevMode ? [{ debugName: "lastSavedLabel" }] : []));
    constructor() {
        this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this.currentDefinition.set(this.serializeWorkflow());
        });
        this.currentDefinition.set(this.serializeWorkflow());
        this.facade
            .loadMetadata(this.savedSnapshot())
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }
    loadInitialDefinition() {
        const templateId = this.route.snapshot.queryParamMap.get('template');
        if (templateId) {
            const fromTemplate = this.facade.createFromTemplate(templateId);
            if (fromTemplate)
                return fromTemplate;
        }
        return this.facade.loadDraft();
    }
    get conditionGroups() {
        return this.form.get('conditionGroups');
    }
    get flowSteps() {
        return this.form.get('steps');
    }
    get testScenarioGroup() {
        return this.form.get('testScenario');
    }
    getOutcomeGroup(key) {
        return this.form.get(['outcomes', key]);
    }
    conditionRules(groupIndex) {
        return this.conditionGroups.at(groupIndex).get('rules');
    }
    parallelApprovers(stepIndex) {
        return this.flowSteps.at(stepIndex).get('approvers');
    }
    isParallelGroup(stepControl) {
        return stepControl?.get('kind')?.value === 'parallel-group';
    }
    advancedSettingsGroup(stepControl) {
        return stepControl?.get('advanced');
    }
    approverSelectorOptionsFor(stepControl) {
        const type = stepControl?.get('approverType')?.value;
        return this.facade.approverOptionsFor(type ?? 'Role', this.currentDefinition());
    }
    selectFlowItem(itemId) {
        this.selectedFlowItemId.set(itemId);
    }
    isSelectedFlowItem(itemId) {
        return this.selectedFlowItemId() === itemId;
    }
    addCondition(groupIndex) {
        this.conditionRules(groupIndex).push(this.createConditionRuleForm());
        this.touchDefinition();
    }
    addConditionGroup() {
        this.conditionGroups.push(this.createConditionGroupForm());
        this.touchDefinition();
    }
    removeCondition(groupIndex, ruleIndex) {
        this.conditionRules(groupIndex).removeAt(ruleIndex);
        this.touchDefinition();
    }
    removeConditionGroup(groupIndex) {
        this.conditionGroups.removeAt(groupIndex);
        this.touchDefinition();
    }
    addSequentialStep(stepType = 'Sequential') {
        const step = this.createStepForm({
            id: crypto.randomUUID(),
            kind: 'step',
            title: stepType === 'Final' ? 'Final approval step' : 'New sequential approval',
            stepType,
            approverType: 'Role',
            approverSelector: '',
            slaHours: stepType === 'Final' ? 24 : 8,
            escalationRule: 'Escalates in 24h',
            completionRule: 'Required',
            advanced: {
                reminderHours: 4,
                escalationContact: 'VP Sales',
                requireDecisionComment: true,
                allowDelegateApproval: false,
                notes: ''
            }
        });
        this.flowSteps.push(step);
        this.selectedFlowItemId.set(step.get('id')?.value ?? null);
        this.touchDefinition();
    }
    addParallelGroup() {
        const group = this.createParallelGroupForm({
            id: crypto.randomUUID(),
            kind: 'parallel-group',
            title: 'Parallel approval group',
            completionMode: 'All must approve',
            requiredApprovals: 2,
            approvers: [
                {
                    id: crypto.randomUUID(),
                    kind: 'step',
                    title: 'Parallel approver 1',
                    stepType: 'Sequential',
                    approverType: 'Role',
                    approverSelector: 'Finance Manager',
                    slaHours: 12,
                    escalationRule: 'Escalates in 24h',
                    completionRule: 'Required',
                    advanced: {
                        reminderHours: 4,
                        escalationContact: 'VP Sales',
                        requireDecisionComment: true,
                        allowDelegateApproval: false,
                        notes: ''
                    }
                },
                {
                    id: crypto.randomUUID(),
                    kind: 'step',
                    title: 'Parallel approver 2',
                    stepType: 'Sequential',
                    approverType: 'Role',
                    approverSelector: 'Legal Reviewer',
                    slaHours: 12,
                    escalationRule: 'Escalates in 24h',
                    completionRule: 'Required',
                    advanced: {
                        reminderHours: 4,
                        escalationContact: 'VP Sales',
                        requireDecisionComment: true,
                        allowDelegateApproval: false,
                        notes: ''
                    }
                }
            ]
        });
        this.flowSteps.push(group);
        this.selectedFlowItemId.set(group.get('id')?.value ?? null);
        this.touchDefinition();
    }
    addParallelApprover(stepIndex) {
        this.parallelApprovers(stepIndex).push(this.createStepForm({
            id: crypto.randomUUID(),
            kind: 'step',
            title: `Parallel approver ${this.parallelApprovers(stepIndex).length + 1}`,
            stepType: 'Sequential',
            approverType: 'Role',
            approverSelector: '',
            slaHours: 8,
            escalationRule: 'Escalates in 24h',
            completionRule: 'Required',
            advanced: {
                reminderHours: 4,
                escalationContact: 'VP Sales',
                requireDecisionComment: true,
                allowDelegateApproval: false,
                notes: ''
            }
        }));
        this.touchDefinition();
    }
    removeParallelApprover(stepIndex, approverIndex) {
        this.parallelApprovers(stepIndex).removeAt(approverIndex);
        this.touchDefinition();
    }
    moveFlowItem(stepIndex, direction) {
        const targetIndex = stepIndex + direction;
        if (targetIndex < 0 || targetIndex >= this.flowSteps.length) {
            return;
        }
        const current = this.flowSteps.at(stepIndex);
        const target = this.flowSteps.at(targetIndex);
        this.flowSteps.setControl(stepIndex, target);
        this.flowSteps.setControl(targetIndex, current);
        this.touchDefinition();
    }
    duplicateFlowItem(stepIndex) {
        const item = this.serializeFlowItem(this.flowSteps.at(stepIndex));
        const duplicated = this.isParallelGroup(this.flowSteps.at(stepIndex))
            ? this.createParallelGroupForm({
                ...item,
                id: crypto.randomUUID(),
                title: `${item.title} Copy`,
                approvers: item.approvers.map((approver) => ({
                    ...approver,
                    id: crypto.randomUUID()
                }))
            })
            : this.createStepForm({
                ...item,
                id: crypto.randomUUID(),
                title: `${item.title} Copy`
            });
        this.flowSteps.insert(stepIndex + 1, duplicated);
        this.touchDefinition();
    }
    deleteFlowItem(stepIndex) {
        const itemId = this.flowSteps.at(stepIndex).get('id')?.value;
        this.flowSteps.removeAt(stepIndex);
        if (this.selectedFlowItemId() === itemId) {
            this.selectedFlowItemId.set(this.flowSteps.at(Math.max(0, stepIndex - 1))?.get('id')?.value ?? null);
        }
        this.touchDefinition();
    }
    stepMenuItems(stepIndex) {
        return [
            {
                label: 'Duplicate',
                icon: 'pi pi-copy',
                command: () => this.duplicateFlowItem(stepIndex)
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => this.deleteFlowItem(stepIndex)
            }
        ];
    }
    saveDraft() {
        const saved = this.facade.saveDraft(this.serializeWorkflow());
        this.savedSnapshot.set(saved);
        this.workflowStatus.set('Draft');
        this.form.controls.isActive.setValue(false, { emitEvent: false });
        this.currentDefinition.set(this.serializeWorkflow());
        this.facade.loadMetadata(saved).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
        this.toast.show('success', 'Workflow draft saved.', 2200);
    }
    publish() {
        if (!this.canPublish()) {
            this.toast.show('error', 'Resolve validation errors before publishing.', 2600);
            return;
        }
        const published = this.facade.publish(this.serializeWorkflow());
        this.savedSnapshot.set(published);
        this.workflowStatus.set('Active');
        this.form.controls.isActive.setValue(true, { emitEvent: false });
        this.currentDefinition.set(this.serializeWorkflow());
        this.facade.loadMetadata(published).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
        this.toast.show('success', 'Workflow published.', 2200);
    }
    cancelChanges() {
        this.patchForm(this.savedSnapshot());
        this.workflowStatus.set(this.savedSnapshot().status);
        this.facade.loadMetadata(this.savedSnapshot()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
        this.toast.show('success', 'Workflow changes reverted.', 2200);
    }
    statusChipClass(rule) {
        if (rule === 'All must approve' || rule === 'Required' || rule === 'Escalates in 24h') {
            return 'chip chip--primary';
        }
        if (rule === 'Any one can approve') {
            return 'chip chip--accent';
        }
        if (String(rule).includes('Escalates')) {
            return 'chip chip--warning';
        }
        return 'chip chip--neutral';
    }
    validationTagSeverity(severity) {
        if (severity === 'error') {
            return 'danger';
        }
        if (severity === 'warn') {
            return 'warn';
        }
        return 'success';
    }
    isValidationMessage(severity) {
        return severity !== 'success';
    }
    buildForm(definition) {
        return this.fb.group({
            id: this.fb.control(definition.id),
            name: this.fb.control(definition.name, Validators.required),
            module: this.fb.control(definition.module, Validators.required),
            triggerType: this.fb.control(definition.triggerType, Validators.required),
            version: this.fb.control(definition.version, Validators.required),
            isActive: this.fb.control(definition.isActive),
            description: this.fb.control(definition.description),
            conditionGroups: this.fb.array(definition.conditionGroups.map((group) => this.createConditionGroupForm(group))),
            steps: this.fb.array(definition.steps.map((step) => this.createFlowItemForm(step))),
            outcomes: this.fb.group({
                approve: this.createOutcomeForm(definition.outcomes.find((item) => item.event === 'approve')),
                reject: this.createOutcomeForm(definition.outcomes.find((item) => item.event === 'reject')),
                timeout: this.createOutcomeForm(definition.outcomes.find((item) => item.event === 'timeout'))
            }),
            testScenario: this.fb.group({
                discountPercent: this.fb.control(definition.testScenario.discountPercent, Validators.required),
                dealValue: this.fb.control(definition.testScenario.dealValue, Validators.required),
                region: this.fb.control(definition.testScenario.region, Validators.required),
                dealType: this.fb.control(definition.testScenario.dealType, Validators.required)
            })
        });
    }
    createOutcomeForm(outcome) {
        return this.fb.group({
            event: this.fb.control(outcome?.event ?? 'approve'),
            action: this.fb.control(outcome?.action ?? '', Validators.required),
            config: this.fb.control(outcome?.config ?? '')
        });
    }
    createConditionGroupForm(group) {
        return this.fb.group({
            id: this.fb.control(group?.id ?? crypto.randomUUID()),
            label: this.fb.control(group?.label ?? 'New condition group', Validators.required),
            combinator: this.fb.control(group?.combinator ?? 'AND', Validators.required),
            rules: this.fb.array((group?.rules ?? [undefined]).map((rule) => this.createConditionRuleForm(rule)))
        });
    }
    createConditionRuleForm(rule) {
        return this.fb.group({
            id: this.fb.control(rule?.id ?? crypto.randomUUID()),
            field: this.fb.control(rule?.field ?? 'discountPercent', Validators.required),
            operator: this.fb.control(rule?.operator ?? '>', Validators.required),
            value: this.fb.control(rule?.value ?? '', Validators.required),
            combinator: this.fb.control(rule?.combinator ?? 'AND', Validators.required)
        });
    }
    createFlowItemForm(item) {
        return item.kind === 'parallel-group' ? this.createParallelGroupForm(item) : this.createStepForm(item);
    }
    createParallelGroupForm(group) {
        return this.fb.group({
            id: this.fb.control(group.id),
            kind: this.fb.control('parallel-group'),
            title: this.fb.control(group.title, Validators.required),
            completionMode: this.fb.control(group.completionMode, Validators.required),
            requiredApprovals: this.fb.control(group.requiredApprovals, [Validators.required, Validators.min(1)]),
            approvers: this.fb.array(group.approvers.map((approver) => this.createStepForm(approver)))
        });
    }
    createStepForm(step) {
        return this.fb.group({
            id: this.fb.control(step.id),
            kind: this.fb.control('step'),
            title: this.fb.control(step.title, Validators.required),
            stepType: this.fb.control(step.stepType, Validators.required),
            approverType: this.fb.control(step.approverType, Validators.required),
            approverSelector: this.fb.control(step.approverSelector, Validators.required),
            slaHours: this.fb.control(step.slaHours, [Validators.required, Validators.min(1)]),
            escalationRule: this.fb.control(step.escalationRule, Validators.required),
            completionRule: this.fb.control(step.completionRule, Validators.required),
            advanced: this.fb.group({
                reminderHours: this.fb.control(step.advanced.reminderHours),
                escalationContact: this.fb.control(step.advanced.escalationContact),
                requireDecisionComment: this.fb.control(step.advanced.requireDecisionComment),
                allowDelegateApproval: this.fb.control(step.advanced.allowDelegateApproval),
                notes: this.fb.control(step.advanced.notes)
            })
        });
    }
    serializeWorkflow() {
        const base = this.savedSnapshot();
        return {
            id: this.form.controls.id.getRawValue() ?? '',
            name: this.form.controls.name.getRawValue() ?? '',
            processName: base.processName,
            requesterLabel: base.requesterLabel,
            module: this.form.controls.module.getRawValue() ?? '',
            triggerType: this.form.controls.triggerType.getRawValue() ?? '',
            version: this.form.controls.version.getRawValue() ?? '',
            isActive: this.form.controls.isActive.getRawValue() ?? false,
            status: this.workflowStatus(),
            description: this.form.controls.description.getRawValue() ?? '',
            conditionGroups: this.conditionGroups.controls.map((group) => this.serializeConditionGroup(group)),
            steps: this.flowSteps.controls.map((step) => this.serializeFlowItem(step)),
            outcomes: ['approve', 'reject', 'timeout'].map((key) => this.serializeOutcome(this.getOutcomeGroup(key))),
            testScenario: this.testScenarioGroup.getRawValue()
        };
    }
    serializeConditionGroup(group) {
        return {
            id: group.get('id')?.getRawValue(),
            label: group.get('label')?.getRawValue(),
            combinator: group.get('combinator')?.getRawValue(),
            rules: group.get('rules').controls.map((rule) => this.serializeConditionRule(rule))
        };
    }
    serializeConditionRule(rule) {
        return {
            id: rule.get('id')?.getRawValue(),
            field: rule.get('field')?.getRawValue(),
            operator: rule.get('operator')?.getRawValue(),
            value: rule.get('value')?.getRawValue(),
            combinator: rule.get('combinator')?.getRawValue()
        };
    }
    serializeFlowItem(stepGroup) {
        const kind = stepGroup.get('kind')?.getRawValue();
        if (kind === 'parallel-group') {
            return {
                id: stepGroup.get('id')?.getRawValue(),
                kind: 'parallel-group',
                title: stepGroup.get('title')?.getRawValue(),
                completionMode: stepGroup.get('completionMode')?.getRawValue(),
                requiredApprovals: Number(stepGroup.get('requiredApprovals')?.getRawValue() ?? 0),
                approvers: stepGroup.get('approvers').controls.map((approver) => this.serializeFlowItem(approver))
            };
        }
        return {
            id: stepGroup.get('id')?.getRawValue(),
            kind: 'step',
            title: stepGroup.get('title')?.getRawValue(),
            stepType: stepGroup.get('stepType')?.getRawValue(),
            approverType: stepGroup.get('approverType')?.getRawValue(),
            approverSelector: stepGroup.get('approverSelector')?.getRawValue(),
            slaHours: Number(stepGroup.get('slaHours')?.getRawValue() ?? 0),
            escalationRule: stepGroup.get('escalationRule')?.getRawValue(),
            completionRule: stepGroup.get('completionRule')?.getRawValue(),
            advanced: stepGroup.get('advanced').getRawValue()
        };
    }
    serializeOutcome(group) {
        return group.getRawValue();
    }
    patchForm(definition) {
        this.form.setControl('conditionGroups', this.fb.array(definition.conditionGroups.map((group) => this.createConditionGroupForm(group))));
        this.form.setControl('steps', this.fb.array(definition.steps.map((step) => this.createFlowItemForm(step))));
        this.form.setControl('outcomes', this.fb.group({
            approve: this.createOutcomeForm(definition.outcomes.find((item) => item.event === 'approve')),
            reject: this.createOutcomeForm(definition.outcomes.find((item) => item.event === 'reject')),
            timeout: this.createOutcomeForm(definition.outcomes.find((item) => item.event === 'timeout'))
        }));
        this.form.setControl('testScenario', this.fb.group({
            discountPercent: this.fb.control(definition.testScenario.discountPercent, Validators.required),
            dealValue: this.fb.control(definition.testScenario.dealValue, Validators.required),
            region: this.fb.control(definition.testScenario.region, Validators.required),
            dealType: this.fb.control(definition.testScenario.dealType, Validators.required)
        }));
        this.form.patchValue({
            id: definition.id,
            name: definition.name,
            module: definition.module,
            triggerType: definition.triggerType,
            version: definition.version,
            isActive: definition.isActive,
            description: definition.description
        });
        this.selectedFlowItemId.set(definition.steps[0]?.id ?? null);
        this.currentDefinition.set(this.serializeWorkflow());
    }
    touchDefinition() {
        this.currentDefinition.set(this.serializeWorkflow());
    }
    formatDate(value) {
        return new Date(value).toLocaleString();
    }
    static ɵfac = function WorkflowBuilderPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WorkflowBuilderPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WorkflowBuilderPage, selectors: [["app-workflow-builder-page"]], features: [i0.ɵɵProvidersFeature([ApprovalWorkflowBuilderFacade])], decls: 240, vars: 32, consts: [["stepMenu", ""], ["validationSuccess", ""], [1, "workflow-builder-page", 3, "formGroup"], [1, "page-header"], [1, "page-header__crumbs"], [1, "page-header__main"], [1, "page-header__content"], [1, "page-header__eyebrow"], [1, "eyebrow-label"], [3, "severity", "value"], [1, "page-header__actions"], ["pButton", "", "type", "button", "styleClass", "wf-btn wf-btn--nav", "label", "Back to Workflows", "icon", "pi pi-arrow-left", "routerLink", "/app/workflows"], ["pButton", "", "type", "button", "styleClass", "wf-btn wf-btn--neutral", "label", "Cancel", "icon", "pi pi-times", 3, "click"], ["pButton", "", "type", "button", "styleClass", "wf-btn wf-btn--draft", "label", "Save Draft", "icon", "pi pi-save", 3, "click"], ["pButton", "", "type", "button", "styleClass", "wf-btn wf-btn--publish", "label", "Publish", "icon", "pi pi-send", 3, "click", "disabled"], [1, "builder-layout"], [1, "builder-canvas"], ["styleClass", "builder-accordion", 3, "value", "multiple"], ["value", "details"], [1, "accordion-header-content"], [1, "accordion-header-icon", "accordion-header-icon--details"], [1, "pi", "pi-id-card"], [1, "accordion-header-text"], [1, "accordion-kicker"], [1, "accordion-header-meta"], ["label", "Versioned"], [1, "save-note"], ["class", "metadata-banner", 4, "ngIf"], [1, "field-grid", "field-grid--details"], [1, "field"], ["for", "workflow-name"], ["id", "workflow-name", "type", "text", "pInputText", "", "formControlName", "name", "placeholder", "Workflow name"], ["for", "workflow-module"], ["id", "workflow-module", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "module", "placeholder", "Select module", 3, "options"], ["for", "workflow-trigger"], ["id", "workflow-trigger", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "triggerType", "placeholder", "Select trigger", 3, "options"], [1, "field", "field--version"], ["for", "workflow-version"], ["id", "workflow-version", "type", "text", "pInputText", "", "formControlName", "version", "placeholder", "v1.0"], [1, "field", "field--toggle"], ["for", "workflow-active"], [1, "toggle-shell"], ["inputId", "workflow-active", "formControlName", "isActive"], [1, "field", "field--full"], ["for", "workflow-description"], ["id", "workflow-description", "pTextarea", "", "rows", "3", "formControlName", "description", "placeholder", "Describe the purpose of this workflow."], ["value", "conditions"], [1, "accordion-header-icon", "accordion-header-icon--conditions"], [1, "pi", "pi-filter"], [1, "accordion-header-actions"], ["pButton", "", "type", "button", "styleClass", "wf-btn wf-btn--add", "icon", "pi pi-plus", "label", "Add Group", 3, "click"], ["formArrayName", "conditionGroups", 1, "conditions-stack"], ["class", "empty-state", 4, "ngIf"], ["styleClass", "condition-group", 3, "formGroupName", "toggleable", "header", 4, "ngFor", "ngForOf"], ["value", "steps"], [1, "accordion-header-icon", "accordion-header-icon--steps"], [1, "pi", "pi-share-alt"], ["pButton", "", "type", "button", "styleClass", "wf-btn wf-btn--add", "icon", "pi pi-plus", "label", "Add Step", 3, "click"], ["pButton", "", "type", "button", "styleClass", "wf-btn wf-btn--group", "icon", "pi pi-sitemap", "label", "Add Parallel Group", 3, "click"], ["formArrayName", "steps", 1, "flow-stack"], ["class", "flow-item", 3, "formGroupName", "flow-item--selected", "flow-item--parallel", 4, "ngFor", "ngForOf"], ["value", "outcomes"], [1, "accordion-header-icon", "accordion-header-icon--outcomes"], [1, "pi", "pi-check-circle"], ["formGroupName", "outcomes", 1, "outcomes-grid"], ["formGroupName", "approve", 1, "outcome-card"], [1, "outcome-card__header"], ["severity", "success", "value", "Success Path"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "action", 3, "options"], ["pTextarea", "", "rows", "3", "formControlName", "config", "placeholder", "Add post-approval instructions"], ["formGroupName", "reject", 1, "outcome-card"], ["severity", "danger", "value", "Exit Path"], ["pTextarea", "", "rows", "3", "formControlName", "config", "placeholder", "Add rejection handling instructions"], ["formGroupName", "timeout", 1, "outcome-card"], ["severity", "warn", "value", "SLA Breach"], ["pTextarea", "", "rows", "3", "formControlName", "config", "placeholder", "Add timeout escalation instructions"], [1, "builder-sidebar"], ["styleClass", "sidebar-card"], ["pTemplate", "header"], [1, "summary-grid"], [1, "summary-metric"], [1, "summary-detail"], [1, "logic-preview"], [1, "validation-stack"], [4, "ngFor", "ngForOf"], ["formGroupName", "testScenario", 1, "test-grid"], ["formControlName", "discountPercent", 3, "min", "max"], ["formControlName", "dealValue", 3, "min"], ["type", "text", "pInputText", "", "formControlName", "region"], ["type", "text", "pInputText", "", "formControlName", "dealType"], [1, "test-result"], ["styleClass", "sidebar-card sidebar-card--simulation"], [1, "simulation-stack"], [1, "simulation-node", 3, "class"], [1, "simulation-footer"], [1, "simulation-footer__meta"], [1, "simulation-footer__label"], [1, "metadata-banner"], [1, "pi", "pi-spin", "pi-spinner"], [1, "empty-state"], ["styleClass", "condition-group", 3, "formGroupName", "toggleable", "header"], [1, "group-toolbar"], [1, "field", "field--compact"], [3, "for"], ["type", "text", "pInputText", "", "formControlName", "label", 3, "id"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "combinator", 3, "id", "options"], ["pButton", "", "type", "button", "styleClass", "wf-btn wf-btn--danger", "icon", "pi pi-trash", "label", "Remove Group", 3, "click"], ["formArrayName", "rules", 1, "rule-stack"], ["class", "rule-row", 3, "formGroupName", 4, "ngFor", "ngForOf"], [1, "panel-actions"], ["pButton", "", "type", "button", "styleClass", "wf-btn wf-btn--add", "icon", "pi pi-plus", "label", "Add Condition", 3, "click"], [1, "rule-row", 3, "formGroupName"], ["class", "rule-row__joiner", 4, "ngIf"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "field", 3, "id", "options"], [1, "field", "field--operator"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "operator", 3, "id", "options"], ["type", "text", "pInputText", "", "formControlName", "value", "placeholder", "Enter comparison value", 3, "id"], ["class", "field field--operator", 4, "ngIf"], ["pButton", "", "type", "button", "severity", "secondary", "text", "true", "icon", "pi pi-trash", 1, "rule-row__delete", 3, "click"], [1, "rule-row__joiner"], [3, "value"], [1, "flow-item", 3, "formGroupName"], ["class", "flow-item__connector", 4, "ngIf"], [1, "flow-item__header"], [1, "flow-item__identity"], [1, "flow-step-number"], ["class", "flow-item__tags", 4, "ngIf"], [1, "flow-item__actions"], ["pButton", "", "type", "button", "icon", "pi pi-pencil", "pTooltip", "Edit", 3, "click", "text"], ["pButton", "", "type", "button", "icon", "pi pi-arrow-up", "pTooltip", "Move up", 3, "click", "text", "disabled"], ["pButton", "", "type", "button", "icon", "pi pi-arrow-down", "pTooltip", "Move down", 3, "click", "text", "disabled"], ["appendTo", "body", 3, "model", "popup"], ["pButton", "", "type", "button", "icon", "pi pi-ellipsis-v", "pTooltip", "More actions", 3, "click", "text"], ["class", "step-grid", 4, "ngIf"], ["class", "parallel-shell", 4, "ngIf"], [3, "value", 4, "ngIf"], [1, "flow-item__connector"], [1, "flow-item__tags"], [1, "chip", 3, "ngClass"], [1, "chip", "chip--primary"], [1, "chip", "chip--accent"], [1, "step-grid"], ["type", "text", "pInputText", "", "formControlName", "title", 3, "id"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "stepType", 3, "id", "options"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "approverType", 3, "id", "options"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "approverSelector", 3, "id", "options"], ["formControlName", "slaHours", 3, "inputId", "min"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "escalationRule", 3, "id", "options"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "completionRule", 3, "id", "options"], [1, "parallel-shell"], [1, "parallel-grid"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "completionMode", 3, "id", "options"], ["formControlName", "requiredApprovals", 3, "inputId", "min"], ["formArrayName", "approvers", 1, "parallel-approvers"], ["class", "parallel-approver", 3, "formGroupName", 4, "ngFor", "ngForOf"], ["pButton", "", "type", "button", "styleClass", "wf-btn wf-btn--add", "icon", "pi pi-plus", "label", "Add Parallel Approver", 3, "click"], [1, "parallel-approver", 3, "formGroupName"], [1, "parallel-approver__header"], [1, "chip", "chip--warning"], ["pButton", "", "type", "button", "styleClass", "wf-btn-icon wf-btn-icon--danger", "icon", "pi pi-trash", 3, "click", "text"], [1, "step-grid", "step-grid--compact"], ["type", "text", "pInputText", "", "formControlName", "title"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "approverType", 3, "options"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "approverSelector", 3, "options"], ["formControlName", "slaHours", 3, "min"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "escalationRule", 3, "options"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "completionRule", 3, "options"], ["value", "advanced"], [1, "advanced-grid", 3, "formGroup"], ["formControlName", "reminderHours", 3, "min"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "formControlName", "escalationContact", 3, "options"], ["formControlName", "requireDecisionComment"], ["formControlName", "allowDelegateApproval"], ["pTextarea", "", "rows", "3", "formControlName", "notes", "placeholder", "Document policy nuances, escalation detail, or reviewer guidance."], [1, "sidebar-card__header"], [1, "card-kicker"], [3, "severity", "text", 4, "ngIf", "ngIfElse"], [3, "severity", "text"], [1, "validation-success"], ["severity", "success", "value", "Ready"], [1, "simulation-node"], [1, "simulation-node__icon"], [1, "pi", "pi-minus-circle"], [1, "pi", "pi-clock"], [1, "simulation-node__body"], [1, "simulation-node__detail"]], template: function WorkflowBuilderPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2)(1, "header", 3)(2, "div", 4);
            i0.ɵɵelement(3, "app-breadcrumbs");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 5)(5, "div", 6)(6, "div", 7)(7, "span", 8);
            i0.ɵɵtext(8, "Automation Admin");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(9, "p-tag", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "h1");
            i0.ɵɵtext(11, "Approval Workflow Builder");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "p");
            i0.ɵɵtext(13, " Design sequential approvals, parallel review groups, escalations, and outcome actions for complex enterprise approvals without leaving CRM. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 10);
            i0.ɵɵelement(15, "button", 11);
            i0.ɵɵelementStart(16, "button", 12);
            i0.ɵɵlistener("click", function WorkflowBuilderPage_Template_button_click_16_listener() { return ctx.cancelChanges(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "button", 13);
            i0.ɵɵlistener("click", function WorkflowBuilderPage_Template_button_click_17_listener() { return ctx.saveDraft(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "button", 14);
            i0.ɵɵlistener("click", function WorkflowBuilderPage_Template_button_click_18_listener() { return ctx.publish(); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(19, "div", 15)(20, "section", 16)(21, "p-accordion", 17)(22, "p-accordion-panel", 18)(23, "p-accordion-header")(24, "div", 19)(25, "div", 20);
            i0.ɵɵelement(26, "i", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 22)(28, "span", 23);
            i0.ɵɵtext(29, "Step 1");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "h2");
            i0.ɵɵtext(31, "Workflow Details");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "p");
            i0.ɵɵtext(33, "Control the identity, trigger, and activation state.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 24);
            i0.ɵɵelement(35, "p-chip", 25);
            i0.ɵɵelementStart(36, "span", 26);
            i0.ɵɵtext(37);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(38, "p-accordion-content");
            i0.ɵɵtemplate(39, WorkflowBuilderPage_div_39_Template, 4, 0, "div", 27);
            i0.ɵɵelementStart(40, "div", 28)(41, "div", 29)(42, "label", 30);
            i0.ɵɵtext(43, "Workflow Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(44, "input", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "div", 29)(46, "label", 32);
            i0.ɵɵtext(47, "Module / Entity");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(48, "p-select", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "div", 29)(50, "label", 34);
            i0.ɵɵtext(51, "Trigger Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(52, "p-select", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "div", 36)(54, "label", 37);
            i0.ɵɵtext(55, "Version");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(56, "input", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "div", 39)(58, "label", 40);
            i0.ɵɵtext(59, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "div", 41);
            i0.ɵɵelement(61, "p-toggleswitch", 42);
            i0.ɵɵelementStart(62, "span");
            i0.ɵɵtext(63);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(64, "div", 43)(65, "label", 44);
            i0.ɵɵtext(66, "Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(67, "textarea", 45);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(68, "p-accordion-panel", 46)(69, "p-accordion-header")(70, "div", 19)(71, "div", 47);
            i0.ɵɵelement(72, "i", 48);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "div", 22)(74, "span", 23);
            i0.ɵɵtext(75, "Step 2");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "h2");
            i0.ɵɵtext(77, "Entry Conditions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "p");
            i0.ɵɵtext(79, "Model entry conditions with readable rule groups.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(80, "div", 49)(81, "button", 50);
            i0.ɵɵlistener("click", function WorkflowBuilderPage_Template_button_click_81_listener($event) { ctx.addConditionGroup(); return $event.stopPropagation(); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(82, "p-accordion-content")(83, "div", 51);
            i0.ɵɵtemplate(84, WorkflowBuilderPage_div_84_Template, 6, 0, "div", 52)(85, WorkflowBuilderPage_p_panel_85_Template, 15, 9, "p-panel", 53);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(86, "p-accordion-panel", 54)(87, "p-accordion-header")(88, "div", 19)(89, "div", 55);
            i0.ɵɵelement(90, "i", 56);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "div", 22)(92, "span", 23);
            i0.ɵɵtext(93, "Step 3");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "h2");
            i0.ɵɵtext(95, "Approval Steps");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "p");
            i0.ɵɵtext(97, "Combine sequential routing with parallel review groups.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(98, "div", 49)(99, "button", 57);
            i0.ɵɵlistener("click", function WorkflowBuilderPage_Template_button_click_99_listener($event) { ctx.addSequentialStep(); return $event.stopPropagation(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(100, "button", 58);
            i0.ɵɵlistener("click", function WorkflowBuilderPage_Template_button_click_100_listener($event) { ctx.addParallelGroup(); return $event.stopPropagation(); });
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(101, "p-accordion-content")(102, "div", 59);
            i0.ɵɵtemplate(103, WorkflowBuilderPage_div_103_Template, 6, 0, "div", 52)(104, WorkflowBuilderPage_div_104_Template, 21, 21, "div", 60);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(105, "p-accordion-panel", 61)(106, "p-accordion-header")(107, "div", 19)(108, "div", 62);
            i0.ɵɵelement(109, "i", 63);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(110, "div", 22)(111, "span", 23);
            i0.ɵɵtext(112, "Step 4");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(113, "h2");
            i0.ɵɵtext(114, "Actions & Outcomes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(115, "p");
            i0.ɵɵtext(116, "Define what happens when the workflow approves, rejects, or times out.");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(117, "p-accordion-content")(118, "div", 64)(119, "div", 65)(120, "div", 66)(121, "h3");
            i0.ɵɵtext(122, "On Approve");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(123, "p-tag", 67);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(124, "div", 29)(125, "label");
            i0.ɵɵtext(126, "Action");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(127, "p-select", 68);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(128, "div", 29)(129, "label");
            i0.ɵɵtext(130, "Configuration");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(131, "textarea", 69);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(132, "div", 70)(133, "div", 66)(134, "h3");
            i0.ɵɵtext(135, "On Reject");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(136, "p-tag", 71);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(137, "div", 29)(138, "label");
            i0.ɵɵtext(139, "Action");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(140, "p-select", 68);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(141, "div", 29)(142, "label");
            i0.ɵɵtext(143, "Configuration");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(144, "textarea", 72);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(145, "div", 73)(146, "div", 66)(147, "h3");
            i0.ɵɵtext(148, "On Timeout");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(149, "p-tag", 74);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(150, "div", 29)(151, "label");
            i0.ɵɵtext(152, "Action");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(153, "p-select", 68);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(154, "div", 29)(155, "label");
            i0.ɵɵtext(156, "Configuration");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(157, "textarea", 75);
            i0.ɵɵelementEnd()()()()()()();
            i0.ɵɵelementStart(158, "aside", 76)(159, "p-card", 77);
            i0.ɵɵtemplate(160, WorkflowBuilderPage_ng_template_160_Template, 6, 0, "ng-template", 78);
            i0.ɵɵelementStart(161, "div", 79)(162, "div", 80)(163, "span");
            i0.ɵɵtext(164, "Module");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(165, "strong");
            i0.ɵɵtext(166);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(167, "div", 80)(168, "span");
            i0.ɵɵtext(169, "Trigger");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(170, "strong");
            i0.ɵɵtext(171);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(172, "div", 80)(173, "span");
            i0.ɵɵtext(174, "Total Steps");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(175, "strong");
            i0.ɵɵtext(176);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(177, "div", 80)(178, "span");
            i0.ɵɵtext(179, "Parallel Groups");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(180, "strong");
            i0.ɵɵtext(181);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(182, "p-divider");
            i0.ɵɵelementStart(183, "div", 81)(184, "label");
            i0.ɵɵtext(185, "Estimated Approval Path");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(186, "p");
            i0.ɵɵtext(187);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(188, "div", 81)(189, "label");
            i0.ɵɵtext(190, "SLA Summary");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(191, "p");
            i0.ɵɵtext(192);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(193, "p-card", 77);
            i0.ɵɵtemplate(194, WorkflowBuilderPage_ng_template_194_Template, 6, 0, "ng-template", 78);
            i0.ɵɵelementStart(195, "div", 82)(196, "p");
            i0.ɵɵtext(197);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(198, "p-card", 77);
            i0.ɵɵtemplate(199, WorkflowBuilderPage_ng_template_199_Template, 8, 4, "ng-template", 78);
            i0.ɵɵelementStart(200, "div", 83);
            i0.ɵɵtemplate(201, WorkflowBuilderPage_ng_container_201_Template, 4, 2, "ng-container", 84);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(202, "p-card", 77);
            i0.ɵɵtemplate(203, WorkflowBuilderPage_ng_template_203_Template, 7, 2, "ng-template", 78);
            i0.ɵɵelementStart(204, "div", 85)(205, "div", 29)(206, "label");
            i0.ɵɵtext(207, "Discount %");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(208, "p-inputNumber", 86);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(209, "div", 29)(210, "label");
            i0.ɵɵtext(211, "Deal Value");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(212, "p-inputNumber", 87);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(213, "div", 29)(214, "label");
            i0.ɵɵtext(215, "Region");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(216, "input", 88);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(217, "div", 29)(218, "label");
            i0.ɵɵtext(219, "Deal Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(220, "input", 89);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(221, "div", 90)(222, "p");
            i0.ɵɵtext(223);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(224, "p-card", 91);
            i0.ɵɵtemplate(225, WorkflowBuilderPage_ng_template_225_Template, 7, 2, "ng-template", 78);
            i0.ɵɵelementStart(226, "div", 92);
            i0.ɵɵrepeaterCreate(227, WorkflowBuilderPage_For_228_Template, 10, 5, "div", 93, _forTrack0);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(229, "div", 94)(230, "div", 95)(231, "span", 96);
            i0.ɵɵtext(232, "Est. Duration");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(233, "strong");
            i0.ɵɵtext(234);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(235, "div", 95)(236, "span", 96);
            i0.ɵɵtext(237, "Outcome");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(238, "strong");
            i0.ɵɵtext(239);
            i0.ɵɵelementEnd()()()()()()();
        } if (rf & 2) {
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("severity", ctx.statusSeverity())("value", ctx.workflowStatus());
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("disabled", !ctx.canPublish());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("value", ctx.expandedSections())("multiple", true);
            i0.ɵɵadvance(16);
            i0.ɵɵtextInterpolate1("Last saved ", ctx.lastSavedLabel());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.metadataLoading());
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("options", ctx.moduleOptions());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.triggerOptions());
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.form.controls.isActive.value ? "Enabled" : "Disabled");
            i0.ɵɵadvance(21);
            i0.ɵɵproperty("ngIf", ctx.conditionGroups.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.conditionGroups.controls);
            i0.ɵɵadvance(18);
            i0.ɵɵproperty("ngIf", ctx.flowSteps.length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.flowSteps.controls);
            i0.ɵɵadvance(23);
            i0.ɵɵproperty("options", ctx.outcomeActionOptions());
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("options", ctx.outcomeActionOptions());
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("options", ctx.outcomeActionOptions());
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(ctx.summary().module);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary().trigger);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary().totalSteps);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary().parallelGroups);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.summary().estimatedApprovalPath);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.summary().slaSummary);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.logicPreview());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.validationItems());
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("min", 0)("max", 100);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("min", 0);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate(ctx.scenarioResult().detail);
            i0.ɵɵadvance(4);
            i0.ɵɵrepeater(ctx.simulationResult().traversedNodes);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.simulationResult().estimatedDuration);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.simulationResult().finalOutcome);
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgIf, ReactiveFormsModule, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, i2.FormGroupName, i2.FormArrayName, RouterLink,
            AccordionModule, i3.Accordion, i4.PrimeTemplate, i3.AccordionPanel, i3.AccordionHeader, i3.AccordionContent, BreadcrumbsComponent,
            ButtonModule, i5.ButtonDirective, CardModule, i6.Card, ChipModule, i7.Chip, DividerModule, i8.Divider, InputNumberModule, i9.InputNumber, InputTextModule, i10.InputText, MenuModule, i11.Menu, MessageModule, i12.Message, PanelModule, i13.Panel, SelectModule, i14.Select, TagModule, i15.Tag, TextareaModule, i16.Textarea, ToggleSwitchModule, i17.ToggleSwitch, TooltipModule, i18.Tooltip, i1.TitleCasePipe], styles: ["[_nghost-%COMP%] {\n  display: block;\n  background: #f4f7fb;\n  min-height: 100%;\n}\n\n.workflow-builder-page[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  color: #162033;\n}\n\n.page-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 6;\n  display: grid;\n  gap: 1rem;\n  padding-bottom: 1rem;\n  margin-bottom: 1.5rem;\n  background: linear-gradient(180deg, #f4f7fb 0%, rgba(244, 247, 251, 0.96) 80%, rgba(244, 247, 251, 0) 100%);\n  backdrop-filter: blur(4px);\n}\n\n.page-header__main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1.5rem;\n  padding: 1.25rem 1.5rem;\n  border: 1px solid #d7e3f4;\n  border-radius: 1.125rem;\n  background: #ffffff;\n  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);\n}\n\n.page-header__content[_ngcontent-%COMP%] {\n  max-width: 60rem;\n}\n\n.page-header__eyebrow[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  margin-bottom: 0.5rem;\n}\n\n.eyebrow-label[_ngcontent-%COMP%], \n.card-kicker[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #2f6fe4;\n}\n\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 2rem;\n  line-height: 1.1;\n  color: #162033;\n}\n\n.page-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.5rem 0 0;\n  max-width: 52rem;\n  font-size: 0.98rem;\n  line-height: 1.6;\n  color: #53627c;\n}\n\n.page-header__actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n\n.builder-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 22rem;\n  gap: 1.5rem;\n  align-items: start;\n}\n\n.builder-canvas[_ngcontent-%COMP%], \n.builder-sidebar[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1.5rem;\n}\n\n.builder-sidebar[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 9rem;\n}\n\n[_nghost-%COMP%]     .builder-card, \n[_nghost-%COMP%]     .sidebar-card {\n  border: 1px solid #d8e1ef;\n  border-radius: 1.125rem;\n  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.05);\n  overflow: hidden;\n}\n\n[_nghost-%COMP%]     .builder-card .p-card-body, \n[_nghost-%COMP%]     .sidebar-card .p-card-body {\n  padding: 1.25rem 1.35rem 1.35rem;\n}\n\n[_nghost-%COMP%]     .builder-card .p-card-header, \n[_nghost-%COMP%]     .sidebar-card .p-card-header {\n  border-bottom: 1px solid #e7edf6;\n  background: #ffffff;\n}\n\n[_nghost-%COMP%]     .wf-btn.p-button {\n  border-radius: 0.9rem;\n  border-width: 1px;\n  font-weight: 700;\n  box-shadow: none !important;\n  transition: background-color 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease;\n}\n\n[_nghost-%COMP%]     .wf-btn.p-button:not(:disabled):hover {\n  transform: translateY(-1px);\n}\n\n[_nghost-%COMP%]     .wf-btn--nav.p-button {\n  background: #314a74 !important;\n  border-color: #314a74 !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn--nav.p-button:not(:disabled):hover, \n[_nghost-%COMP%]     .wf-btn--nav.p-button:not(:disabled):focus {\n  background: #263a5a !important;\n  border-color: #263a5a !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn--neutral.p-button {\n  background: #5e6b82 !important;\n  border-color: #5e6b82 !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn--neutral.p-button:not(:disabled):hover, \n[_nghost-%COMP%]     .wf-btn--neutral.p-button:not(:disabled):focus {\n  background: #4a566b !important;\n  border-color: #4a566b !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn--draft.p-button {\n  background: #2563eb !important;\n  border-color: #2563eb !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn--draft.p-button:not(:disabled):hover, \n[_nghost-%COMP%]     .wf-btn--draft.p-button:not(:disabled):focus {\n  background: #1d4ed8 !important;\n  border-color: #1d4ed8 !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn--publish.p-button {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;\n  border-color: #667eea !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn--publish.p-button:not(:disabled):hover, \n[_nghost-%COMP%]     .wf-btn--publish.p-button:not(:disabled):focus {\n  background: linear-gradient(135deg, #5a6fdf 0%, #6a4197 100%) !important;\n  border-color: #5a6fdf !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn--add.p-button {\n  background: #0891b2 !important;\n  border-color: #0891b2 !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn--add.p-button:not(:disabled):hover, \n[_nghost-%COMP%]     .wf-btn--add.p-button:not(:disabled):focus {\n  background: #0e7490 !important;\n  border-color: #0e7490 !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn--group.p-button {\n  background: #5b4acb !important;\n  border-color: #5b4acb !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn--group.p-button:not(:disabled):hover, \n[_nghost-%COMP%]     .wf-btn--group.p-button:not(:disabled):focus {\n  background: #493bb0 !important;\n  border-color: #493bb0 !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn--danger.p-button {\n  background: #c2414b !important;\n  border-color: #c2414b !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn--danger.p-button:not(:disabled):hover, \n[_nghost-%COMP%]     .wf-btn--danger.p-button:not(:disabled):focus {\n  background: #a7353e !important;\n  border-color: #a7353e !important;\n  color: #ffffff !important;\n}\n\n[_nghost-%COMP%]     .wf-btn-icon.p-button {\n  color: #47556b;\n}\n\n[_nghost-%COMP%]     .wf-btn-icon--danger.p-button {\n  color: #c2414b;\n}\n\n[_nghost-%COMP%]     .wf-btn-icon--danger.p-button:not(:disabled):hover, \n[_nghost-%COMP%]     .wf-btn-icon--danger.p-button:not(:disabled):focus {\n  background: rgba(194, 65, 75, 0.12);\n  color: #a7353e;\n}\n\n.card-header[_ngcontent-%COMP%], \n.sidebar-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.25rem 1.35rem 1rem;\n}\n\n.card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], \n.sidebar-card__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0.3rem 0 0;\n  font-size: 1.08rem;\n  font-weight: 700;\n  color: #1b2740;\n}\n\n.card-header__actions[_ngcontent-%COMP%], \n.card-header__meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n\n.save-note[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: #6c7b95;\n}\n\n.metadata-banner[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  margin-bottom: 1rem;\n  padding: 0.7rem 0.9rem;\n  border: 1px solid #dbe5f4;\n  border-radius: 0.85rem;\n  background: #f8fbff;\n  color: #4f607b;\n  font-size: 0.88rem;\n}\n\n.section-helper[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  font-size: 0.88rem;\n  line-height: 1.5;\n  color: #607089;\n}\n\n.field-grid[_ngcontent-%COMP%], \n.step-grid[_ngcontent-%COMP%], \n.parallel-grid[_ngcontent-%COMP%], \n.advanced-grid[_ngcontent-%COMP%], \n.summary-grid[_ngcontent-%COMP%], \n.test-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n\n.field-grid--details[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(12, minmax(0, 1fr));\n}\n\n.field-grid--details[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]:nth-child(1), \n.field-grid--details[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]:nth-child(2), \n.field-grid--details[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]:nth-child(3) {\n  grid-column: span 4;\n}\n\n.field-grid--details[_ngcontent-%COMP%]   .field--version[_ngcontent-%COMP%], \n.field-grid--details[_ngcontent-%COMP%]   .field--toggle[_ngcontent-%COMP%] {\n  grid-column: span 3;\n}\n\n.field-grid--details[_ngcontent-%COMP%]   .field--full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n\n.field[_ngcontent-%COMP%], \n.summary-detail[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n}\n\n.field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n.summary-detail[_ngcontent-%COMP%]   label[_ngcontent-%COMP%], \n.summary-metric[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.76rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  color: #2f6fe4;\n}\n\n.field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.field[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n[_nghost-%COMP%]     .field .p-inputtext, \n[_nghost-%COMP%]     .field .p-select, \n[_nghost-%COMP%]     .field .p-inputnumber, \n[_nghost-%COMP%]     .field .p-inputnumber-input, \n[_nghost-%COMP%]     .field textarea.p-textarea {\n  width: 100%;\n}\n\n[_nghost-%COMP%]     .field .p-inputtext, \n[_nghost-%COMP%]     .field .p-select-label, \n[_nghost-%COMP%]     .field .p-inputnumber-input, \n[_nghost-%COMP%]     .field textarea.p-textarea {\n  border-radius: 0.85rem;\n  border-color: #cad6e8;\n  min-height: 2.95rem;\n  color: #162033;\n}\n\n[_nghost-%COMP%]     .field textarea.p-textarea {\n  min-height: 6.5rem;\n  resize: vertical;\n}\n\n.toggle-shell[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-height: 2.95rem;\n}\n\n.conditions-stack[_ngcontent-%COMP%], \n.rule-stack[_ngcontent-%COMP%], \n.flow-stack[_ngcontent-%COMP%], \n.parallel-approvers[_ngcontent-%COMP%], \n.validation-stack[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n\n[_nghost-%COMP%]     .condition-group {\n  border: 1px solid #d8e1ef;\n  border-radius: 1rem;\n  background: #fbfcfe;\n}\n\n[_nghost-%COMP%]     .condition-group .p-panel-header, \n[_nghost-%COMP%]     .condition-group .p-panel-content {\n  border: none;\n}\n\n[_nghost-%COMP%]     .condition-group .p-panel-header {\n  padding-bottom: 0.5rem;\n  background: transparent;\n}\n\n.group-toolbar[_ngcontent-%COMP%], \n.panel-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: end;\n  gap: 1rem;\n}\n\n.field--compact[_ngcontent-%COMP%] {\n  min-width: 14rem;\n}\n\n.rule-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 6.5rem minmax(0, 1fr) 13rem minmax(0, 1fr) auto auto;\n  align-items: end;\n  gap: 0.85rem;\n  padding: 0.95rem 1rem;\n  border: 1px solid #deE7f5;\n  border-radius: 0.95rem;\n  background: #ffffff;\n  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.04);\n}\n\n.rule-row__joiner[_ngcontent-%COMP%] {\n  align-self: center;\n}\n\n.rule-row__delete[_ngcontent-%COMP%] {\n  align-self: center;\n}\n\n.flow-stack[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.flow-item[_ngcontent-%COMP%] {\n  position: relative;\n  display: grid;\n  gap: 1rem;\n  padding: 1.1rem 1.15rem;\n  border: 1px solid #d8e2f0;\n  border-radius: 1rem;\n  background: #ffffff;\n  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);\n  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;\n}\n\n.flow-item[_ngcontent-%COMP%]:hover {\n  transform: translateY(-1px);\n  border-color: #bcd0ef;\n  box-shadow: 0 16px 28px rgba(15, 23, 42, 0.08);\n}\n\n.flow-item--selected[_ngcontent-%COMP%] {\n  border-color: #2f6fe4;\n  box-shadow: 0 0 0 3px rgba(47, 111, 228, 0.08), 0 16px 28px rgba(15, 23, 42, 0.09);\n}\n\n.flow-item--parallel[_ngcontent-%COMP%] {\n  border-left: 4px solid #2f6fe4;\n  background: linear-gradient(180deg, #ffffff 0%, #f9fbff 100%);\n}\n\n.flow-item__connector[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 1.65rem;\n  bottom: -1.05rem;\n  width: 2px;\n  height: 1.05rem;\n  background: linear-gradient(180deg, #90b2e8 0%, #d5e2f6 100%);\n}\n\n.flow-item__header[_ngcontent-%COMP%], \n.parallel-approver__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.flow-item__identity[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n}\n\n.flow-step-number[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 3rem;\n  height: 3rem;\n  border-radius: 0.95rem;\n  background: #edf4ff;\n  color: #2f6fe4;\n  font-weight: 800;\n  font-size: 0.92rem;\n}\n\n.flow-item__identity[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.parallel-approver__header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  color: #162033;\n}\n\n.flow-item__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.15rem;\n}\n\n.flow-item__tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.55rem;\n  margin-top: 0.45rem;\n}\n\n.step-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n\n.step-grid--compact[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.parallel-shell[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n  padding: 1rem;\n  border: 1px dashed #bfd3f2;\n  border-radius: 1rem;\n  background: #fbfdff;\n}\n\n.parallel-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.parallel-approver[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.85rem;\n  padding: 1rem;\n  border: 1px solid #dbe6f6;\n  border-radius: 0.95rem;\n  background: #ffffff;\n}\n\n.advanced-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  padding-top: 0.5rem;\n}\n\n.advanced-grid[_ngcontent-%COMP%]   .field--full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n\n.outcomes-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1rem;\n}\n\n.outcome-card[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.85rem;\n  padding: 1rem;\n  border: 1px solid #dce5f3;\n  border-radius: 1rem;\n  background: #fbfcff;\n}\n\n.outcome-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.outcome-card__header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n}\n\n.summary-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.summary-metric[_ngcontent-%COMP%] {\n  padding: 0.95rem 1rem;\n  border: 1px solid #dbe5f4;\n  border-radius: 0.95rem;\n  background: #fbfcff;\n}\n\n.summary-metric[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.35rem;\n  font-size: 1rem;\n  color: #162033;\n}\n\n.summary-detail[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.logic-preview[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.test-result[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n.validation-success[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0.35rem 0 0;\n  line-height: 1.6;\n  color: #55637d;\n}\n\n.logic-preview[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border: 1px solid #dbe4f4;\n  border-radius: 0.95rem;\n  background: linear-gradient(180deg, #fbfdff 0%, #f4f8ff 100%);\n}\n\n.validation-success[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0.85rem;\n  padding: 1rem;\n  border: 1px solid #d9f0df;\n  border-radius: 0.95rem;\n  background: #f7fcf8;\n}\n\n.test-grid[_ngcontent-%COMP%] {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.test-result[_ngcontent-%COMP%] {\n  padding: 0.95rem 1rem;\n  border: 1px solid #dbe4f4;\n  border-radius: 0.95rem;\n  background: #fbfcff;\n}\n\n.chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  min-height: 1.95rem;\n  padding: 0.3rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n\n.chip--primary[_ngcontent-%COMP%] {\n  color: #1f5cca;\n  background: #e9f1ff;\n}\n\n.chip--accent[_ngcontent-%COMP%] {\n  color: #6a3fb7;\n  background: #f0e9ff;\n}\n\n.chip--warning[_ngcontent-%COMP%] {\n  color: #a95b00;\n  background: #fff1de;\n}\n\n.chip--neutral[_ngcontent-%COMP%] {\n  color: #53627c;\n  background: #eef3f8;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  gap: 0.45rem;\n  padding: 2rem 1.25rem;\n  border: 1px dashed #c8d7ee;\n  border-radius: 1rem;\n  color: #607089;\n  background: #fbfdff;\n  text-align: center;\n}\n\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  color: #2f6fe4;\n}\n\n\n\n\n[_nghost-%COMP%]     .builder-accordion {\n  display: grid;\n  gap: 1.25rem;\n}\n\n[_nghost-%COMP%]     .builder-accordion .p-accordionpanel {\n  border: 1px solid #d8e1ef;\n  border-radius: 1.125rem;\n  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.05);\n  overflow: hidden;\n  background: #ffffff;\n}\n\n[_nghost-%COMP%]     .builder-accordion .p-accordionheader {\n  padding: 0;\n  border: none;\n  background: transparent;\n}\n\n[_nghost-%COMP%]     .builder-accordion .p-accordioncontent-content {\n  padding: 1.25rem 1.35rem 1.35rem;\n  border-top: 1px solid #e7edf6;\n}\n\n.accordion-header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.35rem;\n  width: 100%;\n}\n\n.accordion-header-icon[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.75rem;\n  height: 2.75rem;\n  border-radius: 0.85rem;\n  flex-shrink: 0;\n  font-size: 1.15rem;\n  color: #ffffff;\n  transition: transform 0.25s ease;\n\n  &--details { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n  &--conditions { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n  &--steps { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }\n  &--outcomes { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n}\n\n[_nghost-%COMP%]     .builder-accordion .p-accordionpanel-active .accordion-header-icon {\n  transform: scale(1.08);\n}\n\n.accordion-header-text[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n\n  h2 {\n    margin: 0;\n    font-size: 1.08rem;\n    font-weight: 700;\n    color: #1b2740;\n    line-height: 1.3;\n  }\n\n  p {\n    margin: 0.15rem 0 0;\n    font-size: 0.85rem;\n    color: #607089;\n    line-height: 1.4;\n  }\n}\n\n.accordion-kicker[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #2f6fe4;\n  margin-bottom: 0.15rem;\n}\n\n.accordion-header-meta[_ngcontent-%COMP%], \n.accordion-header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  flex-shrink: 0;\n}\n\n@media (max-width: 1400px) {\n  .builder-layout[_ngcontent-%COMP%] {\n    grid-template-columns: minmax(0, 1fr);\n  }\n\n  .builder-sidebar[_ngcontent-%COMP%] {\n    position: static;\n  }\n}\n\n@media (max-width: 1100px) {\n  .page-header__main[_ngcontent-%COMP%], \n   .card-header[_ngcontent-%COMP%], \n   .sidebar-card__header[_ngcontent-%COMP%], \n   .group-toolbar[_ngcontent-%COMP%], \n   .panel-actions[_ngcontent-%COMP%], \n   .outcome-card__header[_ngcontent-%COMP%], \n   .flow-item__header[_ngcontent-%COMP%], \n   .parallel-approver__header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .field-grid--details[_ngcontent-%COMP%], \n   .step-grid[_ngcontent-%COMP%], \n   .parallel-grid[_ngcontent-%COMP%], \n   .advanced-grid[_ngcontent-%COMP%], \n   .outcomes-grid[_ngcontent-%COMP%], \n   .summary-grid[_ngcontent-%COMP%], \n   .test-grid[_ngcontent-%COMP%], \n   .step-grid--compact[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .field-grid--details[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%], \n   .advanced-grid[_ngcontent-%COMP%]   .field--full[_ngcontent-%COMP%] {\n    grid-column: auto;\n  }\n\n  .rule-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .flow-item__identity[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n\n@media (max-width: 720px) {\n  .workflow-builder-page[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.6rem;\n  }\n\n  .field-grid--details[_ngcontent-%COMP%], \n   .step-grid[_ngcontent-%COMP%], \n   .parallel-grid[_ngcontent-%COMP%], \n   .advanced-grid[_ngcontent-%COMP%], \n   .outcomes-grid[_ngcontent-%COMP%], \n   .summary-grid[_ngcontent-%COMP%], \n   .test-grid[_ngcontent-%COMP%], \n   .step-grid--compact[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   SIMULATION[_ngcontent-%COMP%]   PANEL\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.simulation-stack[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.simulation-node[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.625rem;\n  padding: 0.5rem 0.625rem;\n  border-radius: 0.5rem;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid #e5e7eb;\n  transition: background 150ms;\n\n  &--passed {\n    border-color: rgba(34, 197, 94, 0.25);\n    background: rgba(34, 197, 94, 0.06);\n\n    .simulation-node__icon { color: #22c55e; }\n  }\n\n  &--skipped {\n    border-color: rgba(156, 163, 175, 0.3);\n    opacity: 0.7;\n\n    .simulation-node__icon { color: #9ca3af; }\n  }\n\n  &--pending {\n    border-color: rgba(245, 158, 11, 0.25);\n    background: rgba(245, 158, 11, 0.06);\n\n    .simulation-node__icon { color: #f59e0b; }\n  }\n\n  &__icon {\n    font-size: 1rem;\n    line-height: 1;\n    margin-top: 2px;\n    flex-shrink: 0;\n  }\n\n  &__body {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n\n    strong {\n      font-size: 0.8125rem;\n      color: #1f2937;\n    }\n  }\n\n  &__detail {\n    font-size: 0.75rem;\n    color: #6b7280;\n  }\n}\n\n.simulation-footer[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1.5rem;\n  margin-top: 0.75rem;\n  padding-top: 0.75rem;\n  border-top: 1px solid #e5e7eb;\n\n  &__meta {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  &__label {\n    font-size: 0.6875rem;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: #9ca3af;\n    font-weight: 600;\n  }\n\n  strong {\n    font-size: 0.8125rem;\n    color: #1f2937;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkflowBuilderPage, [{
        type: Component,
        args: [{ selector: 'app-workflow-builder-page', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    RouterLink,
                    AccordionModule,
                    BreadcrumbsComponent,
                    ButtonModule,
                    CardModule,
                    ChipModule,
                    DividerModule,
                    InputNumberModule,
                    InputTextModule,
                    MenuModule,
                    MessageModule,
                    PanelModule,
                    SelectModule,
                    TagModule,
                    TextareaModule,
                    ToggleSwitchModule,
                    TooltipModule
                ], providers: [ApprovalWorkflowBuilderFacade], template: "<div class=\"workflow-builder-page\" [formGroup]=\"form\">\n  <header class=\"page-header\">\n    <div class=\"page-header__crumbs\">\n      <app-breadcrumbs></app-breadcrumbs>\n    </div>\n\n    <div class=\"page-header__main\">\n      <div class=\"page-header__content\">\n        <div class=\"page-header__eyebrow\">\n          <span class=\"eyebrow-label\">Automation Admin</span>\n          <p-tag [severity]=\"statusSeverity()\" [value]=\"workflowStatus()\"></p-tag>\n        </div>\n        <h1>Approval Workflow Builder</h1>\n        <p>\n          Design sequential approvals, parallel review groups, escalations, and outcome actions for complex\n          enterprise approvals without leaving CRM.\n        </p>\n      </div>\n\n      <div class=\"page-header__actions\">\n        <button pButton type=\"button\" styleClass=\"wf-btn wf-btn--nav\" label=\"Back to Workflows\" icon=\"pi pi-arrow-left\" routerLink=\"/app/workflows\"></button>\n        <button pButton type=\"button\" styleClass=\"wf-btn wf-btn--neutral\" label=\"Cancel\" icon=\"pi pi-times\" (click)=\"cancelChanges()\"></button>\n        <button pButton type=\"button\" styleClass=\"wf-btn wf-btn--draft\" label=\"Save Draft\" icon=\"pi pi-save\" (click)=\"saveDraft()\"></button>\n        <button pButton type=\"button\" styleClass=\"wf-btn wf-btn--publish\" label=\"Publish\" icon=\"pi pi-send\" [disabled]=\"!canPublish()\" (click)=\"publish()\"></button>\n      </div>\n    </div>\n  </header>\n\n  <div class=\"builder-layout\">\n    <section class=\"builder-canvas\">\n      <p-accordion [value]=\"expandedSections()\" [multiple]=\"true\" styleClass=\"builder-accordion\">\n\n      <!-- \u2500\u2500 1. Workflow Details \u2500\u2500 -->\n      <p-accordion-panel value=\"details\">\n        <p-accordion-header>\n          <div class=\"accordion-header-content\">\n            <div class=\"accordion-header-icon accordion-header-icon--details\">\n              <i class=\"pi pi-id-card\"></i>\n            </div>\n            <div class=\"accordion-header-text\">\n              <span class=\"accordion-kicker\">Step 1</span>\n              <h2>Workflow Details</h2>\n              <p>Control the identity, trigger, and activation state.</p>\n            </div>\n            <div class=\"accordion-header-meta\">\n              <p-chip label=\"Versioned\"></p-chip>\n              <span class=\"save-note\">Last saved {{ lastSavedLabel() }}</span>\n            </div>\n          </div>\n        </p-accordion-header>\n        <p-accordion-content>\n\n        <div class=\"metadata-banner\" *ngIf=\"metadataLoading()\">\n          <i class=\"pi pi-spin pi-spinner\"></i>\n          <span>Loading live workflow metadata, role catalog, and approver sources.</span>\n        </div>\n\n        <div class=\"field-grid field-grid--details\">\n          <div class=\"field\">\n            <label for=\"workflow-name\">Workflow Name</label>\n            <input id=\"workflow-name\" type=\"text\" pInputText formControlName=\"name\" placeholder=\"Workflow name\" />\n          </div>\n\n          <div class=\"field\">\n            <label for=\"workflow-module\">Module / Entity</label>\n            <p-select\n              id=\"workflow-module\"\n              appendTo=\"body\"\n              [options]=\"moduleOptions()\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              formControlName=\"module\"\n              placeholder=\"Select module\"\n            ></p-select>\n          </div>\n\n          <div class=\"field\">\n            <label for=\"workflow-trigger\">Trigger Type</label>\n            <p-select\n              id=\"workflow-trigger\"\n              appendTo=\"body\"\n              [options]=\"triggerOptions()\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              formControlName=\"triggerType\"\n              placeholder=\"Select trigger\"\n            ></p-select>\n          </div>\n\n          <div class=\"field field--version\">\n            <label for=\"workflow-version\">Version</label>\n            <input id=\"workflow-version\" type=\"text\" pInputText formControlName=\"version\" placeholder=\"v1.0\" />\n          </div>\n\n          <div class=\"field field--toggle\">\n            <label for=\"workflow-active\">Active</label>\n            <div class=\"toggle-shell\">\n              <p-toggleswitch inputId=\"workflow-active\" formControlName=\"isActive\"></p-toggleswitch>\n              <span>{{ form.controls.isActive.value ? 'Enabled' : 'Disabled' }}</span>\n            </div>\n          </div>\n\n          <div class=\"field field--full\">\n            <label for=\"workflow-description\">Description</label>\n            <textarea\n              id=\"workflow-description\"\n              pTextarea\n              rows=\"3\"\n              formControlName=\"description\"\n              placeholder=\"Describe the purpose of this workflow.\"\n            ></textarea>\n          </div>\n        </div>\n      </p-accordion-content>\n      </p-accordion-panel>\n\n      <!-- \u2500\u2500 2. Entry Conditions \u2500\u2500 -->\n      <p-accordion-panel value=\"conditions\">\n        <p-accordion-header>\n          <div class=\"accordion-header-content\">\n            <div class=\"accordion-header-icon accordion-header-icon--conditions\">\n              <i class=\"pi pi-filter\"></i>\n            </div>\n            <div class=\"accordion-header-text\">\n              <span class=\"accordion-kicker\">Step 2</span>\n              <h2>Entry Conditions</h2>\n              <p>Model entry conditions with readable rule groups.</p>\n            </div>\n            <div class=\"accordion-header-actions\">\n              <button pButton type=\"button\" styleClass=\"wf-btn wf-btn--add\" icon=\"pi pi-plus\" label=\"Add Group\" (click)=\"addConditionGroup(); $event.stopPropagation()\"></button>\n            </div>\n          </div>\n        </p-accordion-header>\n        <p-accordion-content>\n\n        <div class=\"conditions-stack\" formArrayName=\"conditionGroups\">\n          <div class=\"empty-state\" *ngIf=\"conditionGroups.length === 0\">\n            <i class=\"pi pi-filter\"></i>\n            <strong>No conditions yet</strong>\n            <span>Create a rule group to control when this workflow should start.</span>\n          </div>\n\n          <p-panel\n            *ngFor=\"let groupControl of conditionGroups.controls; let groupIndex = index\"\n            [formGroupName]=\"groupIndex\"\n            [toggleable]=\"false\"\n            styleClass=\"condition-group\"\n            [header]=\"'Condition Group ' + (groupIndex + 1)\"\n          >\n            <div class=\"group-toolbar\">\n              <div class=\"field field--compact\">\n                <label [for]=\"'condition-group-label-' + groupIndex\">Group Label</label>\n                <input [id]=\"'condition-group-label-' + groupIndex\" type=\"text\" pInputText formControlName=\"label\" />\n              </div>\n              <div class=\"field field--compact\">\n                <label [for]=\"'condition-group-combinator-' + groupIndex\">Group Logic</label>\n                <p-select\n                  [id]=\"'condition-group-combinator-' + groupIndex\"\n                  appendTo=\"body\"\n                  [options]=\"combinatorOptions\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  formControlName=\"combinator\"\n                ></p-select>\n              </div>\n                <button\n                  pButton\n                  type=\"button\"\n                  styleClass=\"wf-btn wf-btn--danger\"\n                  icon=\"pi pi-trash\"\n                label=\"Remove Group\"\n                (click)=\"removeConditionGroup(groupIndex)\"\n              ></button>\n            </div>\n\n            <div class=\"rule-stack\" formArrayName=\"rules\">\n              <div class=\"rule-row\" *ngFor=\"let ruleControl of conditionRules(groupIndex).controls; let ruleIndex = index\" [formGroupName]=\"ruleIndex\">\n                <div class=\"rule-row__joiner\" *ngIf=\"ruleIndex > 0\">\n                  <p-tag [value]=\"ruleControl.get('combinator')?.value\"></p-tag>\n                </div>\n\n                <div class=\"field\">\n                  <label [for]=\"'condition-field-' + groupIndex + '-' + ruleIndex\">Field</label>\n                  <p-select\n                    [id]=\"'condition-field-' + groupIndex + '-' + ruleIndex\"\n                    appendTo=\"body\"\n                    [options]=\"conditionFieldOptions()\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    formControlName=\"field\"\n                  ></p-select>\n                </div>\n\n                <div class=\"field field--operator\">\n                  <label [for]=\"'condition-operator-' + groupIndex + '-' + ruleIndex\">Operator</label>\n                  <p-select\n                    [id]=\"'condition-operator-' + groupIndex + '-' + ruleIndex\"\n                    appendTo=\"body\"\n                    [options]=\"conditionOperatorOptions()\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    formControlName=\"operator\"\n                  ></p-select>\n                </div>\n\n                <div class=\"field\">\n                  <label [for]=\"'condition-value-' + groupIndex + '-' + ruleIndex\">Value</label>\n                  <input\n                    [id]=\"'condition-value-' + groupIndex + '-' + ruleIndex\"\n                    type=\"text\"\n                    pInputText\n                    formControlName=\"value\"\n                    placeholder=\"Enter comparison value\"\n                  />\n                </div>\n\n                <div class=\"field field--operator\" *ngIf=\"ruleIndex > 0\">\n                  <label [for]=\"'condition-joiner-' + groupIndex + '-' + ruleIndex\">Joiner</label>\n                  <p-select\n                    [id]=\"'condition-joiner-' + groupIndex + '-' + ruleIndex\"\n                    appendTo=\"body\"\n                    [options]=\"combinatorOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    formControlName=\"combinator\"\n                  ></p-select>\n                </div>\n\n                <button\n                  pButton\n                  type=\"button\"\n                  severity=\"secondary\"\n                  text=\"true\"\n                  icon=\"pi pi-trash\"\n                  class=\"rule-row__delete\"\n                  (click)=\"removeCondition(groupIndex, ruleIndex)\"\n                ></button>\n              </div>\n            </div>\n\n            <div class=\"panel-actions\">\n              <button pButton type=\"button\" styleClass=\"wf-btn wf-btn--add\" icon=\"pi pi-plus\" label=\"Add Condition\" (click)=\"addCondition(groupIndex)\"></button>\n            </div>\n          </p-panel>\n        </div>\n\n      </p-accordion-content>\n      </p-accordion-panel>\n\n      <!-- \u2500\u2500 3. Approval Steps \u2500\u2500 -->\n      <p-accordion-panel value=\"steps\">\n        <p-accordion-header>\n          <div class=\"accordion-header-content\">\n            <div class=\"accordion-header-icon accordion-header-icon--steps\">\n              <i class=\"pi pi-share-alt\"></i>\n            </div>\n            <div class=\"accordion-header-text\">\n              <span class=\"accordion-kicker\">Step 3</span>\n              <h2>Approval Steps</h2>\n              <p>Combine sequential routing with parallel review groups.</p>\n            </div>\n            <div class=\"accordion-header-actions\">\n              <button pButton type=\"button\" styleClass=\"wf-btn wf-btn--add\" icon=\"pi pi-plus\" label=\"Add Step\" (click)=\"addSequentialStep(); $event.stopPropagation()\"></button>\n              <button pButton type=\"button\" styleClass=\"wf-btn wf-btn--group\" icon=\"pi pi-sitemap\" label=\"Add Parallel Group\" (click)=\"addParallelGroup(); $event.stopPropagation()\"></button>\n            </div>\n          </div>\n        </p-accordion-header>\n        <p-accordion-content>\n\n        <div class=\"flow-stack\" formArrayName=\"steps\">\n          <div class=\"empty-state\" *ngIf=\"flowSteps.length === 0\">\n            <i class=\"pi pi-share-alt\"></i>\n            <strong>No approval path defined</strong>\n            <span>Add a sequential step or a parallel group to build the approval flow.</span>\n          </div>\n\n          <div\n            class=\"flow-item\"\n            *ngFor=\"let stepControl of flowSteps.controls; let stepIndex = index\"\n            [formGroupName]=\"stepIndex\"\n            [class.flow-item--selected]=\"isSelectedFlowItem(stepControl.get('id')?.value)\"\n            [class.flow-item--parallel]=\"isParallelGroup(stepControl)\"\n          >\n            <div class=\"flow-item__connector\" *ngIf=\"stepIndex < flowSteps.length - 1\"></div>\n\n            <div class=\"flow-item__header\">\n              <div class=\"flow-item__identity\">\n                <span class=\"flow-step-number\">Step {{ stepIndex + 1 }}</span>\n                <div>\n                  <h3>{{ stepControl.get('title')?.value || (isParallelGroup(stepControl) ? 'Parallel Group' : 'New Step') }}</h3>\n                  <div class=\"flow-item__tags\" *ngIf=\"!isParallelGroup(stepControl)\">\n                    <p-tag [severity]=\"facade.stepTypeTagSeverity[stepControl.get('stepType')?.value]\" [value]=\"stepControl.get('stepType')?.value\"></p-tag>\n                    <span class=\"chip\" [ngClass]=\"statusChipClass(stepControl.get('completionRule')?.value)\">{{ stepControl.get('completionRule')?.value }}</span>\n                    <span class=\"chip\" [ngClass]=\"statusChipClass(stepControl.get('escalationRule')?.value)\">{{ stepControl.get('escalationRule')?.value }}</span>\n                  </div>\n                  <div class=\"flow-item__tags\" *ngIf=\"isParallelGroup(stepControl)\">\n                    <span class=\"chip chip--primary\">{{ stepControl.get('completionMode')?.value }}</span>\n                    <span class=\"chip chip--accent\">{{ stepControl.get('requiredApprovals')?.value }} required</span>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"flow-item__actions\">\n                <button pButton type=\"button\" [text]=\"true\" icon=\"pi pi-pencil\" pTooltip=\"Edit\" (click)=\"selectFlowItem(stepControl.get('id')?.value)\"></button>\n                <button pButton type=\"button\" [text]=\"true\" icon=\"pi pi-arrow-up\" pTooltip=\"Move up\" [disabled]=\"stepIndex === 0\" (click)=\"moveFlowItem(stepIndex, -1)\"></button>\n                <button pButton type=\"button\" [text]=\"true\" icon=\"pi pi-arrow-down\" pTooltip=\"Move down\" [disabled]=\"stepIndex === flowSteps.length - 1\" (click)=\"moveFlowItem(stepIndex, 1)\"></button>\n                <p-menu #stepMenu [model]=\"stepMenuItems(stepIndex)\" [popup]=\"true\" appendTo=\"body\"></p-menu>\n                <button pButton type=\"button\" [text]=\"true\" icon=\"pi pi-ellipsis-v\" pTooltip=\"More actions\" (click)=\"stepMenu.toggle($event)\"></button>\n              </div>\n            </div>\n\n            <div class=\"step-grid\" *ngIf=\"!isParallelGroup(stepControl)\">\n              <div class=\"field\">\n                <label [for]=\"'step-title-' + stepIndex\">Step Title</label>\n                <input [id]=\"'step-title-' + stepIndex\" type=\"text\" pInputText formControlName=\"title\" />\n              </div>\n              <div class=\"field\">\n                <label [for]=\"'step-type-' + stepIndex\">Step Type</label>\n                <p-select\n                  [id]=\"'step-type-' + stepIndex\"\n                  appendTo=\"body\"\n                  [options]=\"[{ label: 'Sequential', value: 'Sequential' }, { label: 'Final', value: 'Final' }]\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  formControlName=\"stepType\"\n                ></p-select>\n              </div>\n              <div class=\"field\">\n                <label [for]=\"'step-approver-type-' + stepIndex\">Approver Type</label>\n                <p-select\n                  [id]=\"'step-approver-type-' + stepIndex\"\n                  appendTo=\"body\"\n                  [options]=\"approverTypeOptions()\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  formControlName=\"approverType\"\n                ></p-select>\n              </div>\n              <div class=\"field\">\n                <label [for]=\"'step-approver-' + stepIndex\">Approver</label>\n                <p-select\n                  [id]=\"'step-approver-' + stepIndex\"\n                  appendTo=\"body\"\n                  [options]=\"approverSelectorOptionsFor(stepControl)\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  formControlName=\"approverSelector\"\n                ></p-select>\n              </div>\n              <div class=\"field\">\n                <label [for]=\"'step-sla-' + stepIndex\">SLA Hours</label>\n                <p-inputNumber [inputId]=\"'step-sla-' + stepIndex\" formControlName=\"slaHours\" [min]=\"1\"></p-inputNumber>\n              </div>\n              <div class=\"field\">\n                <label [for]=\"'step-escalation-' + stepIndex\">Escalation Rule</label>\n                <p-select\n                  [id]=\"'step-escalation-' + stepIndex\"\n                  appendTo=\"body\"\n                  [options]=\"escalationRuleOptions()\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  formControlName=\"escalationRule\"\n                ></p-select>\n              </div>\n              <div class=\"field\">\n                <label [for]=\"'step-completion-' + stepIndex\">Completion Rule</label>\n                <p-select\n                  [id]=\"'step-completion-' + stepIndex\"\n                  appendTo=\"body\"\n                  [options]=\"completionRuleOptions()\"\n                  optionLabel=\"label\"\n                  optionValue=\"value\"\n                  formControlName=\"completionRule\"\n                ></p-select>\n              </div>\n            </div>\n\n            <div class=\"parallel-shell\" *ngIf=\"isParallelGroup(stepControl)\">\n              <div class=\"parallel-grid\">\n                <div class=\"field\">\n                  <label [for]=\"'parallel-title-' + stepIndex\">Parallel Group</label>\n                  <input [id]=\"'parallel-title-' + stepIndex\" type=\"text\" pInputText formControlName=\"title\" />\n                </div>\n                <div class=\"field\">\n                  <label [for]=\"'parallel-mode-' + stepIndex\">Completion Mode</label>\n                  <p-select\n                    [id]=\"'parallel-mode-' + stepIndex\"\n                    appendTo=\"body\"\n                    [options]=\"completionModeOptions()\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    formControlName=\"completionMode\"\n                  ></p-select>\n                </div>\n                <div class=\"field\">\n                  <label [for]=\"'parallel-required-' + stepIndex\">Required Approvals</label>\n                  <p-inputNumber [inputId]=\"'parallel-required-' + stepIndex\" formControlName=\"requiredApprovals\" [min]=\"1\"></p-inputNumber>\n                </div>\n              </div>\n\n              <div class=\"parallel-approvers\" formArrayName=\"approvers\">\n                <div class=\"parallel-approver\" *ngFor=\"let approverControl of parallelApprovers(stepIndex).controls; let approverIndex = index\" [formGroupName]=\"approverIndex\">\n                  <div class=\"parallel-approver__header\">\n                    <div>\n                      <h4>{{ approverControl.get('title')?.value || ('Approver ' + (approverIndex + 1)) }}</h4>\n                      <div class=\"flow-item__tags\">\n                        <span class=\"chip chip--primary\">{{ approverControl.get('completionRule')?.value }}</span>\n                        <span class=\"chip chip--warning\">{{ approverControl.get('escalationRule')?.value }}</span>\n                      </div>\n                    </div>\n                    <button pButton type=\"button\" styleClass=\"wf-btn-icon wf-btn-icon--danger\" [text]=\"true\" icon=\"pi pi-trash\" (click)=\"removeParallelApprover(stepIndex, approverIndex)\"></button>\n                  </div>\n\n                  <div class=\"step-grid step-grid--compact\">\n                    <div class=\"field\">\n                      <label>Title</label>\n                      <input type=\"text\" pInputText formControlName=\"title\" />\n                    </div>\n                    <div class=\"field\">\n                      <label>Approver Type</label>\n                      <p-select appendTo=\"body\" [options]=\"approverTypeOptions()\" optionLabel=\"label\" optionValue=\"value\" formControlName=\"approverType\"></p-select>\n                    </div>\n                    <div class=\"field\">\n                      <label>Approver</label>\n                      <p-select appendTo=\"body\" [options]=\"approverSelectorOptionsFor(approverControl)\" optionLabel=\"label\" optionValue=\"value\" formControlName=\"approverSelector\"></p-select>\n                    </div>\n                    <div class=\"field\">\n                      <label>SLA Hours</label>\n                      <p-inputNumber formControlName=\"slaHours\" [min]=\"1\"></p-inputNumber>\n                    </div>\n                    <div class=\"field\">\n                      <label>Escalation</label>\n                      <p-select appendTo=\"body\" [options]=\"escalationRuleOptions()\" optionLabel=\"label\" optionValue=\"value\" formControlName=\"escalationRule\"></p-select>\n                    </div>\n                    <div class=\"field\">\n                      <label>Completion</label>\n                      <p-select appendTo=\"body\" [options]=\"completionRuleOptions()\" optionLabel=\"label\" optionValue=\"value\" formControlName=\"completionRule\"></p-select>\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"panel-actions\">\n                <button pButton type=\"button\" styleClass=\"wf-btn wf-btn--add\" icon=\"pi pi-plus\" label=\"Add Parallel Approver\" (click)=\"addParallelApprover(stepIndex)\"></button>\n              </div>\n            </div>\n\n            <p-accordion *ngIf=\"!isParallelGroup(stepControl)\" [value]=\"[]\">\n              <p-accordion-panel value=\"advanced\">\n                <p-accordion-header>Advanced Settings</p-accordion-header>\n                <p-accordion-content>\n                  <div class=\"advanced-grid\" [formGroup]=\"advancedSettingsGroup(stepControl)\">\n                    <div class=\"field\">\n                      <label>Reminder Hours</label>\n                      <p-inputNumber formControlName=\"reminderHours\" [min]=\"0\"></p-inputNumber>\n                    </div>\n                    <div class=\"field\">\n                      <label>Escalation Contact</label>\n                      <p-select\n                        appendTo=\"body\"\n                        [options]=\"approverSelectorOptionsFor(stepControl)\"\n                        optionLabel=\"label\"\n                        optionValue=\"value\"\n                        formControlName=\"escalationContact\"\n                      ></p-select>\n                    </div>\n                    <div class=\"field field--toggle\">\n                      <label>Require Comment</label>\n                      <div class=\"toggle-shell\">\n                        <p-toggleswitch formControlName=\"requireDecisionComment\"></p-toggleswitch>\n                        <span>{{ stepControl.get('advanced.requireDecisionComment')?.value ? 'Required' : 'Optional' }}</span>\n                      </div>\n                    </div>\n                    <div class=\"field field--toggle\">\n                      <label>Allow Delegate</label>\n                      <div class=\"toggle-shell\">\n                        <p-toggleswitch formControlName=\"allowDelegateApproval\"></p-toggleswitch>\n                        <span>{{ stepControl.get('advanced.allowDelegateApproval')?.value ? 'Allowed' : 'Blocked' }}</span>\n                      </div>\n                    </div>\n                    <div class=\"field field--full\">\n                      <label>Implementation Notes</label>\n                      <textarea pTextarea rows=\"3\" formControlName=\"notes\" placeholder=\"Document policy nuances, escalation detail, or reviewer guidance.\"></textarea>\n                    </div>\n                  </div>\n                </p-accordion-content>\n              </p-accordion-panel>\n            </p-accordion>\n          </div>\n        </div>\n\n      </p-accordion-content>\n      </p-accordion-panel>\n\n      <!-- \u2500\u2500 4. Actions & Outcomes \u2500\u2500 -->\n      <p-accordion-panel value=\"outcomes\">\n        <p-accordion-header>\n          <div class=\"accordion-header-content\">\n            <div class=\"accordion-header-icon accordion-header-icon--outcomes\">\n              <i class=\"pi pi-check-circle\"></i>\n            </div>\n            <div class=\"accordion-header-text\">\n              <span class=\"accordion-kicker\">Step 4</span>\n              <h2>Actions &amp; Outcomes</h2>\n              <p>Define what happens when the workflow approves, rejects, or times out.</p>\n            </div>\n          </div>\n        </p-accordion-header>\n        <p-accordion-content>\n\n        <div class=\"outcomes-grid\" formGroupName=\"outcomes\">\n          <div class=\"outcome-card\" formGroupName=\"approve\">\n            <div class=\"outcome-card__header\">\n              <h3>On Approve</h3>\n              <p-tag severity=\"success\" value=\"Success Path\"></p-tag>\n            </div>\n            <div class=\"field\">\n              <label>Action</label>\n              <p-select appendTo=\"body\" [options]=\"outcomeActionOptions()\" optionLabel=\"label\" optionValue=\"value\" formControlName=\"action\"></p-select>\n            </div>\n            <div class=\"field\">\n              <label>Configuration</label>\n              <textarea pTextarea rows=\"3\" formControlName=\"config\" placeholder=\"Add post-approval instructions\"></textarea>\n            </div>\n          </div>\n\n          <div class=\"outcome-card\" formGroupName=\"reject\">\n            <div class=\"outcome-card__header\">\n              <h3>On Reject</h3>\n              <p-tag severity=\"danger\" value=\"Exit Path\"></p-tag>\n            </div>\n            <div class=\"field\">\n              <label>Action</label>\n              <p-select appendTo=\"body\" [options]=\"outcomeActionOptions()\" optionLabel=\"label\" optionValue=\"value\" formControlName=\"action\"></p-select>\n            </div>\n            <div class=\"field\">\n              <label>Configuration</label>\n              <textarea pTextarea rows=\"3\" formControlName=\"config\" placeholder=\"Add rejection handling instructions\"></textarea>\n            </div>\n          </div>\n\n          <div class=\"outcome-card\" formGroupName=\"timeout\">\n            <div class=\"outcome-card__header\">\n              <h3>On Timeout</h3>\n              <p-tag severity=\"warn\" value=\"SLA Breach\"></p-tag>\n            </div>\n            <div class=\"field\">\n              <label>Action</label>\n              <p-select appendTo=\"body\" [options]=\"outcomeActionOptions()\" optionLabel=\"label\" optionValue=\"value\" formControlName=\"action\"></p-select>\n            </div>\n            <div class=\"field\">\n              <label>Configuration</label>\n              <textarea pTextarea rows=\"3\" formControlName=\"config\" placeholder=\"Add timeout escalation instructions\"></textarea>\n            </div>\n          </div>\n        </div>\n      </p-accordion-content>\n      </p-accordion-panel>\n\n      </p-accordion>\n    </section>\n\n    <aside class=\"builder-sidebar\">\n      <p-card styleClass=\"sidebar-card\">\n        <ng-template pTemplate=\"header\">\n          <div class=\"sidebar-card__header\">\n            <div>\n              <span class=\"card-kicker\">Workflow Summary</span>\n              <h2>Live rollout summary</h2>\n            </div>\n          </div>\n        </ng-template>\n\n        <div class=\"summary-grid\">\n          <div class=\"summary-metric\">\n            <span>Module</span>\n            <strong>{{ summary().module }}</strong>\n          </div>\n          <div class=\"summary-metric\">\n            <span>Trigger</span>\n            <strong>{{ summary().trigger }}</strong>\n          </div>\n          <div class=\"summary-metric\">\n            <span>Total Steps</span>\n            <strong>{{ summary().totalSteps }}</strong>\n          </div>\n          <div class=\"summary-metric\">\n            <span>Parallel Groups</span>\n            <strong>{{ summary().parallelGroups }}</strong>\n          </div>\n        </div>\n\n        <p-divider></p-divider>\n\n        <div class=\"summary-detail\">\n          <label>Estimated Approval Path</label>\n          <p>{{ summary().estimatedApprovalPath }}</p>\n        </div>\n\n        <div class=\"summary-detail\">\n          <label>SLA Summary</label>\n          <p>{{ summary().slaSummary }}</p>\n        </div>\n      </p-card>\n\n      <p-card styleClass=\"sidebar-card\">\n        <ng-template pTemplate=\"header\">\n          <div class=\"sidebar-card__header\">\n            <div>\n              <span class=\"card-kicker\">Live Logic Preview</span>\n              <h2>Human-readable workflow narrative</h2>\n            </div>\n          </div>\n        </ng-template>\n\n        <div class=\"logic-preview\">\n          <p>{{ logicPreview() }}</p>\n        </div>\n      </p-card>\n\n      <p-card styleClass=\"sidebar-card\">\n        <ng-template pTemplate=\"header\">\n          <div class=\"sidebar-card__header\">\n            <div>\n              <span class=\"card-kicker\">Validation</span>\n              <h2>Readiness checks</h2>\n            </div>\n            <p-tag [severity]=\"validationSeverity()\" [value]=\"validationSeverity() | titlecase\"></p-tag>\n          </div>\n        </ng-template>\n\n        <div class=\"validation-stack\">\n          <ng-container *ngFor=\"let item of validationItems()\">\n            <p-message\n              *ngIf=\"isValidationMessage(item.severity); else validationSuccess\"\n              [severity]=\"item.severity\"\n              [text]=\"item.title + ' \u2014 ' + item.detail\"\n            ></p-message>\n            <ng-template #validationSuccess>\n              <div class=\"validation-success\">\n                <p-tag severity=\"success\" value=\"Ready\"></p-tag>\n                <div>\n                  <strong>{{ item.title }}</strong>\n                  <p>{{ item.detail }}</p>\n                </div>\n              </div>\n            </ng-template>\n          </ng-container>\n        </div>\n      </p-card>\n\n      <p-card styleClass=\"sidebar-card\">\n        <ng-template pTemplate=\"header\">\n          <div class=\"sidebar-card__header\">\n            <div>\n              <span class=\"card-kicker\">Test Scenario</span>\n              <h2>Evaluate a sample record</h2>\n            </div>\n            <p-tag [severity]=\"scenarioResult().matches ? 'success' : 'warn'\" [value]=\"scenarioResult().badge\"></p-tag>\n          </div>\n        </ng-template>\n\n        <div class=\"test-grid\" formGroupName=\"testScenario\">\n          <div class=\"field\">\n            <label>Discount %</label>\n            <p-inputNumber formControlName=\"discountPercent\" [min]=\"0\" [max]=\"100\"></p-inputNumber>\n          </div>\n          <div class=\"field\">\n            <label>Deal Value</label>\n            <p-inputNumber formControlName=\"dealValue\" [min]=\"0\"></p-inputNumber>\n          </div>\n          <div class=\"field\">\n            <label>Region</label>\n            <input type=\"text\" pInputText formControlName=\"region\" />\n          </div>\n          <div class=\"field\">\n            <label>Deal Type</label>\n            <input type=\"text\" pInputText formControlName=\"dealType\" />\n          </div>\n        </div>\n\n        <div class=\"test-result\">\n          <p>{{ scenarioResult().detail }}</p>\n        </div>\n      </p-card>\n\n      <!-- \u2500\u2500 Simulation \u2500\u2500 -->\n      <p-card styleClass=\"sidebar-card sidebar-card--simulation\">\n        <ng-template pTemplate=\"header\">\n          <div class=\"sidebar-card__header\">\n            <div>\n              <span class=\"card-kicker\">Simulation</span>\n              <h2>Traversed nodes &amp; outcome</h2>\n            </div>\n            <p-tag [severity]=\"simulationResult().triggered ? 'success' : 'warn'\" [value]=\"simulationResult().badge\"></p-tag>\n          </div>\n        </ng-template>\n\n        <div class=\"simulation-stack\">\n          @for (node of simulationResult().traversedNodes; track node.id) {\n            <div class=\"simulation-node\" [class]=\"'simulation-node--' + node.status\">\n              <span class=\"simulation-node__icon\">\n                @switch (node.status) {\n                  @case ('passed') { <i class=\"pi pi-check-circle\"></i> }\n                  @case ('skipped') { <i class=\"pi pi-minus-circle\"></i> }\n                  @case ('pending') { <i class=\"pi pi-clock\"></i> }\n                }\n              </span>\n              <div class=\"simulation-node__body\">\n                <strong>{{ node.title }}</strong>\n                <span class=\"simulation-node__detail\">{{ node.detail }}</span>\n              </div>\n            </div>\n          }\n        </div>\n\n        <div class=\"simulation-footer\">\n          <div class=\"simulation-footer__meta\">\n            <span class=\"simulation-footer__label\">Est. Duration</span>\n            <strong>{{ simulationResult().estimatedDuration }}</strong>\n          </div>\n          <div class=\"simulation-footer__meta\">\n            <span class=\"simulation-footer__label\">Outcome</span>\n            <strong>{{ simulationResult().finalOutcome }}</strong>\n          </div>\n        </div>\n      </p-card>\n    </aside>\n  </div>\n</div>\n", styles: [":host {\n  display: block;\n  background: #f4f7fb;\n  min-height: 100%;\n}\n\n.workflow-builder-page {\n  padding: 1.5rem;\n  color: #162033;\n}\n\n.page-header {\n  position: sticky;\n  top: 0;\n  z-index: 6;\n  display: grid;\n  gap: 1rem;\n  padding-bottom: 1rem;\n  margin-bottom: 1.5rem;\n  background: linear-gradient(180deg, #f4f7fb 0%, rgba(244, 247, 251, 0.96) 80%, rgba(244, 247, 251, 0) 100%);\n  backdrop-filter: blur(4px);\n}\n\n.page-header__main {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1.5rem;\n  padding: 1.25rem 1.5rem;\n  border: 1px solid #d7e3f4;\n  border-radius: 1.125rem;\n  background: #ffffff;\n  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);\n}\n\n.page-header__content {\n  max-width: 60rem;\n}\n\n.page-header__eyebrow {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  margin-bottom: 0.5rem;\n}\n\n.eyebrow-label,\n.card-kicker {\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #2f6fe4;\n}\n\n.page-header h1 {\n  margin: 0;\n  font-size: 2rem;\n  line-height: 1.1;\n  color: #162033;\n}\n\n.page-header p {\n  margin: 0.5rem 0 0;\n  max-width: 52rem;\n  font-size: 0.98rem;\n  line-height: 1.6;\n  color: #53627c;\n}\n\n.page-header__actions {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n\n.builder-layout {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 22rem;\n  gap: 1.5rem;\n  align-items: start;\n}\n\n.builder-canvas,\n.builder-sidebar {\n  display: grid;\n  gap: 1.5rem;\n}\n\n.builder-sidebar {\n  position: sticky;\n  top: 9rem;\n}\n\n:host ::ng-deep .builder-card,\n:host ::ng-deep .sidebar-card {\n  border: 1px solid #d8e1ef;\n  border-radius: 1.125rem;\n  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.05);\n  overflow: hidden;\n}\n\n:host ::ng-deep .builder-card .p-card-body,\n:host ::ng-deep .sidebar-card .p-card-body {\n  padding: 1.25rem 1.35rem 1.35rem;\n}\n\n:host ::ng-deep .builder-card .p-card-header,\n:host ::ng-deep .sidebar-card .p-card-header {\n  border-bottom: 1px solid #e7edf6;\n  background: #ffffff;\n}\n\n:host ::ng-deep .wf-btn.p-button {\n  border-radius: 0.9rem;\n  border-width: 1px;\n  font-weight: 700;\n  box-shadow: none !important;\n  transition: background-color 0.16s ease, border-color 0.16s ease, color 0.16s ease, transform 0.16s ease;\n}\n\n:host ::ng-deep .wf-btn.p-button:not(:disabled):hover {\n  transform: translateY(-1px);\n}\n\n:host ::ng-deep .wf-btn--nav.p-button {\n  background: #314a74 !important;\n  border-color: #314a74 !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn--nav.p-button:not(:disabled):hover,\n:host ::ng-deep .wf-btn--nav.p-button:not(:disabled):focus {\n  background: #263a5a !important;\n  border-color: #263a5a !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn--neutral.p-button {\n  background: #5e6b82 !important;\n  border-color: #5e6b82 !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn--neutral.p-button:not(:disabled):hover,\n:host ::ng-deep .wf-btn--neutral.p-button:not(:disabled):focus {\n  background: #4a566b !important;\n  border-color: #4a566b !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn--draft.p-button {\n  background: #2563eb !important;\n  border-color: #2563eb !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn--draft.p-button:not(:disabled):hover,\n:host ::ng-deep .wf-btn--draft.p-button:not(:disabled):focus {\n  background: #1d4ed8 !important;\n  border-color: #1d4ed8 !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn--publish.p-button {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;\n  border-color: #667eea !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn--publish.p-button:not(:disabled):hover,\n:host ::ng-deep .wf-btn--publish.p-button:not(:disabled):focus {\n  background: linear-gradient(135deg, #5a6fdf 0%, #6a4197 100%) !important;\n  border-color: #5a6fdf !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn--add.p-button {\n  background: #0891b2 !important;\n  border-color: #0891b2 !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn--add.p-button:not(:disabled):hover,\n:host ::ng-deep .wf-btn--add.p-button:not(:disabled):focus {\n  background: #0e7490 !important;\n  border-color: #0e7490 !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn--group.p-button {\n  background: #5b4acb !important;\n  border-color: #5b4acb !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn--group.p-button:not(:disabled):hover,\n:host ::ng-deep .wf-btn--group.p-button:not(:disabled):focus {\n  background: #493bb0 !important;\n  border-color: #493bb0 !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn--danger.p-button {\n  background: #c2414b !important;\n  border-color: #c2414b !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn--danger.p-button:not(:disabled):hover,\n:host ::ng-deep .wf-btn--danger.p-button:not(:disabled):focus {\n  background: #a7353e !important;\n  border-color: #a7353e !important;\n  color: #ffffff !important;\n}\n\n:host ::ng-deep .wf-btn-icon.p-button {\n  color: #47556b;\n}\n\n:host ::ng-deep .wf-btn-icon--danger.p-button {\n  color: #c2414b;\n}\n\n:host ::ng-deep .wf-btn-icon--danger.p-button:not(:disabled):hover,\n:host ::ng-deep .wf-btn-icon--danger.p-button:not(:disabled):focus {\n  background: rgba(194, 65, 75, 0.12);\n  color: #a7353e;\n}\n\n.card-header,\n.sidebar-card__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.25rem 1.35rem 1rem;\n}\n\n.card-header h2,\n.sidebar-card__header h2 {\n  margin: 0.3rem 0 0;\n  font-size: 1.08rem;\n  font-weight: 700;\n  color: #1b2740;\n}\n\n.card-header__actions,\n.card-header__meta {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n\n.save-note {\n  font-size: 0.82rem;\n  color: #6c7b95;\n}\n\n.metadata-banner {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  margin-bottom: 1rem;\n  padding: 0.7rem 0.9rem;\n  border: 1px solid #dbe5f4;\n  border-radius: 0.85rem;\n  background: #f8fbff;\n  color: #4f607b;\n  font-size: 0.88rem;\n}\n\n.section-helper {\n  margin: 0.35rem 0 0;\n  font-size: 0.88rem;\n  line-height: 1.5;\n  color: #607089;\n}\n\n.field-grid,\n.step-grid,\n.parallel-grid,\n.advanced-grid,\n.summary-grid,\n.test-grid {\n  display: grid;\n  gap: 1rem;\n}\n\n.field-grid--details {\n  grid-template-columns: repeat(12, minmax(0, 1fr));\n}\n\n.field-grid--details .field:nth-child(1),\n.field-grid--details .field:nth-child(2),\n.field-grid--details .field:nth-child(3) {\n  grid-column: span 4;\n}\n\n.field-grid--details .field--version,\n.field-grid--details .field--toggle {\n  grid-column: span 3;\n}\n\n.field-grid--details .field--full {\n  grid-column: 1 / -1;\n}\n\n.field,\n.summary-detail {\n  display: grid;\n  gap: 0.45rem;\n}\n\n.field label,\n.summary-detail label,\n.summary-metric span {\n  font-size: 0.76rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n  color: #2f6fe4;\n}\n\n.field input,\n.field textarea {\n  width: 100%;\n}\n\n:host ::ng-deep .field .p-inputtext,\n:host ::ng-deep .field .p-select,\n:host ::ng-deep .field .p-inputnumber,\n:host ::ng-deep .field .p-inputnumber-input,\n:host ::ng-deep .field textarea.p-textarea {\n  width: 100%;\n}\n\n:host ::ng-deep .field .p-inputtext,\n:host ::ng-deep .field .p-select-label,\n:host ::ng-deep .field .p-inputnumber-input,\n:host ::ng-deep .field textarea.p-textarea {\n  border-radius: 0.85rem;\n  border-color: #cad6e8;\n  min-height: 2.95rem;\n  color: #162033;\n}\n\n:host ::ng-deep .field textarea.p-textarea {\n  min-height: 6.5rem;\n  resize: vertical;\n}\n\n.toggle-shell {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.75rem;\n  min-height: 2.95rem;\n}\n\n.conditions-stack,\n.rule-stack,\n.flow-stack,\n.parallel-approvers,\n.validation-stack {\n  display: grid;\n  gap: 1rem;\n}\n\n:host ::ng-deep .condition-group {\n  border: 1px solid #d8e1ef;\n  border-radius: 1rem;\n  background: #fbfcfe;\n}\n\n:host ::ng-deep .condition-group .p-panel-header,\n:host ::ng-deep .condition-group .p-panel-content {\n  border: none;\n}\n\n:host ::ng-deep .condition-group .p-panel-header {\n  padding-bottom: 0.5rem;\n  background: transparent;\n}\n\n.group-toolbar,\n.panel-actions {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: end;\n  gap: 1rem;\n}\n\n.field--compact {\n  min-width: 14rem;\n}\n\n.rule-row {\n  display: grid;\n  grid-template-columns: 6.5rem minmax(0, 1fr) 13rem minmax(0, 1fr) auto auto;\n  align-items: end;\n  gap: 0.85rem;\n  padding: 0.95rem 1rem;\n  border: 1px solid #deE7f5;\n  border-radius: 0.95rem;\n  background: #ffffff;\n  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.04);\n}\n\n.rule-row__joiner {\n  align-self: center;\n}\n\n.rule-row__delete {\n  align-self: center;\n}\n\n.flow-stack {\n  position: relative;\n}\n\n.flow-item {\n  position: relative;\n  display: grid;\n  gap: 1rem;\n  padding: 1.1rem 1.15rem;\n  border: 1px solid #d8e2f0;\n  border-radius: 1rem;\n  background: #ffffff;\n  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);\n  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;\n}\n\n.flow-item:hover {\n  transform: translateY(-1px);\n  border-color: #bcd0ef;\n  box-shadow: 0 16px 28px rgba(15, 23, 42, 0.08);\n}\n\n.flow-item--selected {\n  border-color: #2f6fe4;\n  box-shadow: 0 0 0 3px rgba(47, 111, 228, 0.08), 0 16px 28px rgba(15, 23, 42, 0.09);\n}\n\n.flow-item--parallel {\n  border-left: 4px solid #2f6fe4;\n  background: linear-gradient(180deg, #ffffff 0%, #f9fbff 100%);\n}\n\n.flow-item__connector {\n  position: absolute;\n  left: 1.65rem;\n  bottom: -1.05rem;\n  width: 2px;\n  height: 1.05rem;\n  background: linear-gradient(180deg, #90b2e8 0%, #d5e2f6 100%);\n}\n\n.flow-item__header,\n.parallel-approver__header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.flow-item__identity {\n  display: flex;\n  gap: 1rem;\n}\n\n.flow-step-number {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 3rem;\n  height: 3rem;\n  border-radius: 0.95rem;\n  background: #edf4ff;\n  color: #2f6fe4;\n  font-weight: 800;\n  font-size: 0.92rem;\n}\n\n.flow-item__identity h3,\n.parallel-approver__header h4 {\n  margin: 0;\n  font-size: 1rem;\n  color: #162033;\n}\n\n.flow-item__actions {\n  display: flex;\n  align-items: center;\n  gap: 0.15rem;\n}\n\n.flow-item__tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.55rem;\n  margin-top: 0.45rem;\n}\n\n.step-grid {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n}\n\n.step-grid--compact {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.parallel-shell {\n  display: grid;\n  gap: 1rem;\n  padding: 1rem;\n  border: 1px dashed #bfd3f2;\n  border-radius: 1rem;\n  background: #fbfdff;\n}\n\n.parallel-grid {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.parallel-approver {\n  display: grid;\n  gap: 0.85rem;\n  padding: 1rem;\n  border: 1px solid #dbe6f6;\n  border-radius: 0.95rem;\n  background: #ffffff;\n}\n\n.advanced-grid {\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  padding-top: 0.5rem;\n}\n\n.advanced-grid .field--full {\n  grid-column: 1 / -1;\n}\n\n.outcomes-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 1rem;\n}\n\n.outcome-card {\n  display: grid;\n  gap: 0.85rem;\n  padding: 1rem;\n  border: 1px solid #dce5f3;\n  border-radius: 1rem;\n  background: #fbfcff;\n}\n\n.outcome-card__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.outcome-card__header h3 {\n  margin: 0;\n  font-size: 1rem;\n}\n\n.summary-grid {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.summary-metric {\n  padding: 0.95rem 1rem;\n  border: 1px solid #dbe5f4;\n  border-radius: 0.95rem;\n  background: #fbfcff;\n}\n\n.summary-metric strong {\n  display: block;\n  margin-top: 0.35rem;\n  font-size: 1rem;\n  color: #162033;\n}\n\n.summary-detail p,\n.logic-preview p,\n.test-result p,\n.validation-success p {\n  margin: 0.35rem 0 0;\n  line-height: 1.6;\n  color: #55637d;\n}\n\n.logic-preview {\n  padding: 1rem;\n  border: 1px solid #dbe4f4;\n  border-radius: 0.95rem;\n  background: linear-gradient(180deg, #fbfdff 0%, #f4f8ff 100%);\n}\n\n.validation-success {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 0.85rem;\n  padding: 1rem;\n  border: 1px solid #d9f0df;\n  border-radius: 0.95rem;\n  background: #f7fcf8;\n}\n\n.test-grid {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.test-result {\n  padding: 0.95rem 1rem;\n  border: 1px solid #dbe4f4;\n  border-radius: 0.95rem;\n  background: #fbfcff;\n}\n\n.chip {\n  display: inline-flex;\n  align-items: center;\n  min-height: 1.95rem;\n  padding: 0.3rem 0.7rem;\n  border-radius: 999px;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n\n.chip--primary {\n  color: #1f5cca;\n  background: #e9f1ff;\n}\n\n.chip--accent {\n  color: #6a3fb7;\n  background: #f0e9ff;\n}\n\n.chip--warning {\n  color: #a95b00;\n  background: #fff1de;\n}\n\n.chip--neutral {\n  color: #53627c;\n  background: #eef3f8;\n}\n\n.empty-state {\n  display: grid;\n  place-items: center;\n  gap: 0.45rem;\n  padding: 2rem 1.25rem;\n  border: 1px dashed #c8d7ee;\n  border-radius: 1rem;\n  color: #607089;\n  background: #fbfdff;\n  text-align: center;\n}\n\n.empty-state i {\n  font-size: 1.3rem;\n  color: #2f6fe4;\n}\n\n/* \u2500\u2500 Progressive Disclosure Accordion \u2500\u2500 */\n\n:host ::ng-deep .builder-accordion {\n  display: grid;\n  gap: 1.25rem;\n}\n\n:host ::ng-deep .builder-accordion .p-accordionpanel {\n  border: 1px solid #d8e1ef;\n  border-radius: 1.125rem;\n  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.05);\n  overflow: hidden;\n  background: #ffffff;\n}\n\n:host ::ng-deep .builder-accordion .p-accordionheader {\n  padding: 0;\n  border: none;\n  background: transparent;\n}\n\n:host ::ng-deep .builder-accordion .p-accordioncontent-content {\n  padding: 1.25rem 1.35rem 1.35rem;\n  border-top: 1px solid #e7edf6;\n}\n\n.accordion-header-content {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.35rem;\n  width: 100%;\n}\n\n.accordion-header-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.75rem;\n  height: 2.75rem;\n  border-radius: 0.85rem;\n  flex-shrink: 0;\n  font-size: 1.15rem;\n  color: #ffffff;\n  transition: transform 0.25s ease;\n\n  &--details { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n  &--conditions { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n  &--steps { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }\n  &--outcomes { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n}\n\n:host ::ng-deep .builder-accordion .p-accordionpanel-active .accordion-header-icon {\n  transform: scale(1.08);\n}\n\n.accordion-header-text {\n  flex: 1;\n  min-width: 0;\n\n  h2 {\n    margin: 0;\n    font-size: 1.08rem;\n    font-weight: 700;\n    color: #1b2740;\n    line-height: 1.3;\n  }\n\n  p {\n    margin: 0.15rem 0 0;\n    font-size: 0.85rem;\n    color: #607089;\n    line-height: 1.4;\n  }\n}\n\n.accordion-kicker {\n  display: inline-block;\n  font-size: 0.68rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n  color: #2f6fe4;\n  margin-bottom: 0.15rem;\n}\n\n.accordion-header-meta,\n.accordion-header-actions {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  flex-shrink: 0;\n}\n\n@media (max-width: 1400px) {\n  .builder-layout {\n    grid-template-columns: minmax(0, 1fr);\n  }\n\n  .builder-sidebar {\n    position: static;\n  }\n}\n\n@media (max-width: 1100px) {\n  .page-header__main,\n  .card-header,\n  .sidebar-card__header,\n  .group-toolbar,\n  .panel-actions,\n  .outcome-card__header,\n  .flow-item__header,\n  .parallel-approver__header {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .field-grid--details,\n  .step-grid,\n  .parallel-grid,\n  .advanced-grid,\n  .outcomes-grid,\n  .summary-grid,\n  .test-grid,\n  .step-grid--compact {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .field-grid--details .field,\n  .advanced-grid .field--full {\n    grid-column: auto;\n  }\n\n  .rule-row {\n    grid-template-columns: 1fr;\n  }\n\n  .flow-item__identity {\n    flex-direction: column;\n  }\n}\n\n@media (max-width: 720px) {\n  .workflow-builder-page {\n    padding: 1rem;\n  }\n\n  .page-header h1 {\n    font-size: 1.6rem;\n  }\n\n  .field-grid--details,\n  .step-grid,\n  .parallel-grid,\n  .advanced-grid,\n  .outcomes-grid,\n  .summary-grid,\n  .test-grid,\n  .step-grid--compact {\n    grid-template-columns: 1fr;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// SIMULATION PANEL\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.simulation-stack {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.simulation-node {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.625rem;\n  padding: 0.5rem 0.625rem;\n  border-radius: 0.5rem;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid #e5e7eb;\n  transition: background 150ms;\n\n  &--passed {\n    border-color: rgba(34, 197, 94, 0.25);\n    background: rgba(34, 197, 94, 0.06);\n\n    .simulation-node__icon { color: #22c55e; }\n  }\n\n  &--skipped {\n    border-color: rgba(156, 163, 175, 0.3);\n    opacity: 0.7;\n\n    .simulation-node__icon { color: #9ca3af; }\n  }\n\n  &--pending {\n    border-color: rgba(245, 158, 11, 0.25);\n    background: rgba(245, 158, 11, 0.06);\n\n    .simulation-node__icon { color: #f59e0b; }\n  }\n\n  &__icon {\n    font-size: 1rem;\n    line-height: 1;\n    margin-top: 2px;\n    flex-shrink: 0;\n  }\n\n  &__body {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n\n    strong {\n      font-size: 0.8125rem;\n      color: #1f2937;\n    }\n  }\n\n  &__detail {\n    font-size: 0.75rem;\n    color: #6b7280;\n  }\n}\n\n.simulation-footer {\n  display: flex;\n  gap: 1.5rem;\n  margin-top: 0.75rem;\n  padding-top: 0.75rem;\n  border-top: 1px solid #e5e7eb;\n\n  &__meta {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  &__label {\n    font-size: 0.6875rem;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: #9ca3af;\n    font-weight: 600;\n  }\n\n  strong {\n    font-size: 0.8125rem;\n    color: #1f2937;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(WorkflowBuilderPage, { className: "WorkflowBuilderPage", filePath: "src/app/crm/features/workflows/pages/workflow-builder.page.ts", lineNumber: 79 }); })();
