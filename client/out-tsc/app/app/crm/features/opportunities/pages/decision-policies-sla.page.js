import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { AppToastService } from '../../../../core/app-toast.service';
import { OpportunityApprovalService } from '../services/opportunity-approval.service';
import { WorkspaceSettingsService } from '../../settings/services/workspace-settings.service';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/inputtext";
import * as i4 from "primeng/checkbox";
import * as i5 from "primeng/api";
import * as i6 from "primeng/table";
import * as i7 from "primeng/tag";
import * as i8 from "primeng/chip";
import * as i9 from "primeng/button";
function DecisionPoliciesSlaPage_section_93_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 51)(1, "div", 46);
    i0.ɵɵtext(2, "Decision Module Quick Controls");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 52)(4, "label", 53)(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "input", 54);
    i0.ɵɵlistener("ngModelChange", function DecisionPoliciesSlaPage_section_93_Template_input_ngModelChange_7_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.quickApprovalAmountThreshold.set($event === "" ? null : +$event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "label", 53)(9, "span");
    i0.ɵɵtext(10, "Default approver role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "input", 55);
    i0.ɵɵlistener("ngModelChange", function DecisionPoliciesSlaPage_section_93_Template_input_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.quickApprovalApproverRole.set($event ?? "")); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "label", 56)(13, "p-checkbox", 57);
    i0.ɵɵlistener("ngModelChange", function DecisionPoliciesSlaPage_section_93_Template_p_checkbox_ngModelChange_13_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.updateEscalationPolicy("enabled", !!$event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15, "Enable escalation worker policy");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "label", 56)(17, "p-checkbox", 58);
    i0.ɵɵlistener("ngModelChange", function DecisionPoliciesSlaPage_section_93_Template_p_checkbox_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.updateEscalationPolicy("sendEmailNotifications", !!$event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19, "Send escalation email notifications");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "label", 56)(21, "p-checkbox", 59);
    i0.ɵɵlistener("ngModelChange", function DecisionPoliciesSlaPage_section_93_Template_p_checkbox_ngModelChange_21_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.updateEscalationPolicy("notifyCurrentAssignee", !!$event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23, "Notify current assignee first");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "label", 56)(25, "p-checkbox", 60);
    i0.ɵɵlistener("ngModelChange", function DecisionPoliciesSlaPage_section_93_Template_p_checkbox_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.updateEscalationPolicy("notifyPendingStepRole", !!$event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span");
    i0.ɵɵtext(27, "Notify pending-step approver role users");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "label", 61)(29, "span");
    i0.ɵɵtext(30, "Fallback role name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "input", 62);
    i0.ɵɵlistener("ngModelChange", function DecisionPoliciesSlaPage_section_93_Template_input_ngModelChange_31_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.updateEscalationPolicy("fallbackRoleName", ($event ?? "").toString())); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "small");
    i0.ɵɵtext(33, "Used when assignee and step-role recipients are unavailable.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "div", 63)(35, "button", 15);
    i0.ɵɵlistener("click", function DecisionPoliciesSlaPage_section_93_Template_button_click_35_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.saveQuickPolicyControls()); });
    i0.ɵɵelement(36, "i", 64);
    i0.ɵɵelementStart(37, "span");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("Amount threshold (", ((tmp_4_0 = ctx_r2.workspaceSettings()) == null ? null : tmp_4_0.currency) || "USD", ")");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r2.quickApprovalAmountThreshold() ?? "");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngModel", ctx_r2.quickApprovalApproverRole());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r2.escalationPolicyDraft().enabled);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r2.escalationPolicyDraft().sendEmailNotifications);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r2.escalationPolicyDraft().notifyCurrentAssignee);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r2.escalationPolicyDraft().notifyPendingStepRole);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r2.escalationPolicyDraft().fallbackRoleName);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r2.saving() || ctx_r2.loading());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("pi-spin", ctx_r2.saving())("pi-save", !ctx_r2.saving())("pi-spinner", ctx_r2.saving());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.saving() ? "Saving..." : "Save Controls");
} }
function DecisionPoliciesSlaPage_div_94_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Step");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Approver Role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Amount Threshold");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Purpose Scope");
    i0.ɵɵelementEnd()();
} }
function DecisionPoliciesSlaPage_div_94_ng_template_3_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "number");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_8_0;
    const step_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", i0.ɵɵpipeBind2(2, 2, step_r4.amountThreshold, "1.0-0"), " ", ((tmp_8_0 = ctx_r2.workspaceSettings()) == null ? null : tmp_8_0.currency) || "USD", " ");
} }
function DecisionPoliciesSlaPage_div_94_ng_template_3_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, "Any amount");
} }
function DecisionPoliciesSlaPage_div_94_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵelement(2, "p-chip", 69);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtemplate(6, DecisionPoliciesSlaPage_div_94_ng_template_3_span_6_Template, 3, 5, "span", 70)(7, DecisionPoliciesSlaPage_div_94_ng_template_3_ng_template_7_Template, 1, 0, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const step_r4 = ctx.$implicit;
    const noThreshold_r5 = i0.ɵɵreference(8);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("label", "Step " + step_r4.order);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r4.approverRole);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", step_r4.amountThreshold != null)("ngIfElse", noThreshold_r5);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(step_r4.purpose || "All purposes");
} }
function DecisionPoliciesSlaPage_div_94_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65)(1, "p-table", 66);
    i0.ɵɵtemplate(2, DecisionPoliciesSlaPage_div_94_ng_template_2_Template, 9, 0, "ng-template", 67)(3, DecisionPoliciesSlaPage_div_94_ng_template_3_Template, 11, 5, "ng-template", 68);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.approvalSteps());
} }
function DecisionPoliciesSlaPage_ng_template_95_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 71);
    i0.ɵɵtext(1, "No approval workflow steps are configured for this workspace.");
    i0.ɵɵelementEnd();
} }
function DecisionPoliciesSlaPage_div_126_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 72)(1, "div", 73);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 74)(4, "div", 75)(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(7, "p-tag", 30);
    i0.ɵɵpipe(8, "uppercase");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 76);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "small");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r6.order);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(row_r6.target);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", i0.ɵɵpipeBind1(8, 6, row_r6.status))("severity", ctx_r2.routingRowSeverity(row_r6.status));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r6.source);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r6.description);
} }
function DecisionPoliciesSlaPage_div_130_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 79)(1, "div", 80)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 81);
    i0.ɵɵelement(7, "div", 82);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_9_0;
    const item_r7 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r7.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r7.count);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", item_r7.count / (((tmp_9_0 = ctx_r2.purposeDistribution()[0]) == null ? null : tmp_9_0.count) || 1) * 100, "%");
} }
function DecisionPoliciesSlaPage_div_130_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 77);
    i0.ɵɵtemplate(1, DecisionPoliciesSlaPage_div_130_div_1_Template, 8, 4, "div", 78);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.purposeDistribution());
} }
function DecisionPoliciesSlaPage_ng_template_131_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 83);
    i0.ɵɵtext(1, "No pending decisions in queue.");
    i0.ɵɵelementEnd();
} }
function DecisionPoliciesSlaPage_div_136_div_1_p_tag_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 30);
    i0.ɵɵpipe(1, "uppercase");
} if (rf & 2) {
    const row_r8 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("value", i0.ɵɵpipeBind1(1, 2, row_r8.priority))("severity", ctx_r2.prioritySeverity(row_r8.priority));
} }
function DecisionPoliciesSlaPage_div_136_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 86)(1, "div", 87)(2, "div", 88);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 89);
    i0.ɵɵelement(8, "p-tag", 42);
    i0.ɵɵtemplate(9, DecisionPoliciesSlaPage_div_136_div_1_p_tag_9_Template, 2, 4, "p-tag", 90);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r8 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r8.entityName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", row_r8.decisionType, " \u00B7 ", i0.ɵɵpipeBind2(6, 5, row_r8.actionAtUtc, "MMM d, h:mm a"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", row_r8.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r8.priority);
} }
function DecisionPoliciesSlaPage_div_136_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 84);
    i0.ɵɵtemplate(1, DecisionPoliciesSlaPage_div_136_div_1_Template, 10, 8, "div", 85);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.escalationTrendRows());
} }
function DecisionPoliciesSlaPage_ng_template_137_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 83);
    i0.ɵɵtext(1, "No escalation events found in recent decision history.");
    i0.ɵɵelementEnd();
} }
export class DecisionPoliciesSlaPage {
    approvals = inject(OpportunityApprovalService);
    workspace = inject(WorkspaceSettingsService);
    toast = inject(AppToastService);
    destroyRef = inject(DestroyRef);
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    workspaceSettings = signal(null, ...(ngDevMode ? [{ debugName: "workspaceSettings" }] : []));
    inboxRows = signal([], ...(ngDevMode ? [{ debugName: "inboxRows" }] : []));
    historyRows = signal([], ...(ngDevMode ? [{ debugName: "historyRows" }] : []));
    quickApprovalAmountThreshold = signal(null, ...(ngDevMode ? [{ debugName: "quickApprovalAmountThreshold" }] : []));
    quickApprovalApproverRole = signal('', ...(ngDevMode ? [{ debugName: "quickApprovalApproverRole" }] : []));
    escalationPolicyDraft = signal(this.defaultDecisionEscalationPolicy(), ...(ngDevMode ? [{ debugName: "escalationPolicyDraft" }] : []));
    approvalPolicy = computed(() => this.workspaceSettings()?.approvalWorkflowPolicy ?? null, ...(ngDevMode ? [{ debugName: "approvalPolicy" }] : []));
    approvalSteps = computed(() => {
        const policy = this.approvalPolicy();
        const steps = policy?.steps ?? [];
        return [...steps].sort((a, b) => a.order - b.order);
    }, ...(ngDevMode ? [{ debugName: "approvalSteps" }] : []));
    activePolicyCount = computed(() => {
        const settings = this.workspaceSettings();
        let count = 0;
        if ((settings?.approvalWorkflowPolicy?.enabled ?? false) && this.approvalSteps().length)
            count += 1;
        if ((settings?.approvalAmountThreshold ?? 0) > 0)
            count += 1;
        if ((settings?.decisionEscalationPolicy?.enabled ?? true))
            count += 1;
        if ((settings?.leadFirstTouchSlaHours ?? 0) > 0)
            count += 1;
        return count;
    }, ...(ngDevMode ? [{ debugName: "activePolicyCount" }] : []));
    canManagePolicies = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.administrationManage);
    }, ...(ngDevMode ? [{ debugName: "canManagePolicies" }] : []));
    operationalKpis = computed(() => {
        const inbox = this.inboxRows();
        const pending = inbox.filter((r) => r.status === 'Pending');
        const overdue = pending.filter((r) => r.slaStatus === 'overdue').length;
        const atRisk = pending.filter((r) => r.slaStatus === 'at-risk').length;
        const escalated = pending.filter((r) => !!r.isEscalated).length;
        const avgAgeHours = pending.length
            ? Math.round((pending.reduce((acc, row) => acc + (row.requestedAgeHours ?? 0), 0) / pending.length) * 10) / 10
            : 0;
        return { pending: pending.length, overdue, atRisk, escalated, avgAgeHours };
    }, ...(ngDevMode ? [{ debugName: "operationalKpis" }] : []));
    historyKpis = computed(() => {
        const rows = this.historyRows();
        const now = Date.now();
        const within7d = rows.filter((r) => now - new Date(r.actionAtUtc).getTime() <= 7 * 24 * 60 * 60 * 1000);
        return {
            events7d: within7d.length,
            escalations7d: within7d.filter((r) => r.isEscalated || r.action === 'ApprovalSlaEscalated').length,
            approvals7d: within7d.filter((r) => r.action === 'Approved').length,
            rejections7d: within7d.filter((r) => r.action === 'Rejected').length
        };
    }, ...(ngDevMode ? [{ debugName: "historyKpis" }] : []));
    purposeDistribution = computed(() => {
        const pending = this.inboxRows().filter((r) => r.status === 'Pending');
        const groups = new Map();
        for (const row of pending) {
            const key = row.purpose || 'Unspecified';
            groups.set(key, (groups.get(key) ?? 0) + 1);
        }
        return Array.from(groups.entries())
            .map(([label, count]) => ({ label, count }))
            .sort((a, b) => b.count - a.count);
    }, ...(ngDevMode ? [{ debugName: "purposeDistribution" }] : []));
    escalationTrendRows = computed(() => {
        return this.historyRows()
            .filter((r) => r.isEscalated || r.action === 'ApprovalSlaEscalated')
            .slice(0, 12);
    }, ...(ngDevMode ? [{ debugName: "escalationTrendRows" }] : []));
    escalationRoutingRows = computed(() => {
        const workflowRoles = Array.from(new Set(this.approvalSteps()
            .map((step) => (step.approverRole ?? '').trim())
            .filter(Boolean)));
        const rows = [];
        rows.push({
            order: 1,
            target: 'Current assignee',
            source: 'DecisionStep.AssigneeUserId',
            status: this.escalationPolicyDraft().notifyCurrentAssignee ? 'configured' : 'fallback',
            description: this.escalationPolicyDraft().notifyCurrentAssignee
                ? 'Primary escalation recipient when the pending step has a direct assignee.'
                : 'Disabled by policy; current assignee notifications are skipped.'
        });
        rows.push({
            order: 2,
            target: workflowRoles.length ? workflowRoles.join(', ') : (this.workspaceSettings()?.approvalApproverRole || 'Step approver role'),
            source: 'Pending step approver role',
            status: this.escalationPolicyDraft().notifyPendingStepRole && workflowRoles.length ? 'configured' : 'fallback',
            description: this.escalationPolicyDraft().notifyPendingStepRole
                ? 'Fallback notification target uses the pending step approver role users when no direct assignee is available.'
                : 'Disabled by policy; step approver role notifications are skipped.'
        });
        rows.push({
            order: 3,
            target: this.escalationPolicyDraft().fallbackRoleName || 'Sales Manager',
            source: 'Global fallback role',
            status: 'fallback',
            description: 'Safety-net escalation recipient when assignee and step-role recipients are unavailable.'
        });
        return rows;
    }, ...(ngDevMode ? [{ debugName: "escalationRoutingRows" }] : []));
    constructor() {
        this.load();
    }
    load() {
        this.loading.set(true);
        let pending = 3;
        const finish = () => {
            pending -= 1;
            if (pending <= 0) {
                this.loading.set(false);
            }
        };
        this.workspace
            .getSettings()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (settings) => {
                this.workspaceSettings.set(settings);
                this.quickApprovalAmountThreshold.set(settings.approvalAmountThreshold ?? null);
                this.quickApprovalApproverRole.set(settings.approvalApproverRole ?? '');
                this.escalationPolicyDraft.set(this.normalizeEscalationPolicy(settings.decisionEscalationPolicy));
                finish();
            },
            error: () => {
                finish();
                this.toast.show('error', 'Unable to load workspace policy settings.', 3000);
            }
        });
        this.approvals
            .getInbox()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (rows) => {
                this.inboxRows.set(rows ?? []);
                finish();
            },
            error: () => {
                finish();
                this.toast.show('error', 'Unable to load decision inbox metrics.', 3000);
            }
        });
        this.approvals
            .getDecisionHistory({ take: 200 })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (rows) => {
                this.historyRows.set(rows ?? []);
                finish();
            },
            error: () => {
                finish();
                this.toast.show('error', 'Unable to load decision history metrics.', 3000);
            }
        });
    }
    approvalPolicyEnabledLabel() {
        return this.approvalPolicy()?.enabled ? 'Enabled' : 'Disabled';
    }
    approvalPolicyEnabledSeverity() {
        return this.approvalPolicy()?.enabled ? 'success' : 'warn';
    }
    slaSeverity(value) {
        const v = (value || '').toLowerCase();
        if (v === 'overdue')
            return 'danger';
        if (v === 'at-risk')
            return 'warn';
        if (v === 'on-track')
            return 'success';
        return 'info';
    }
    prioritySeverity(value) {
        const v = (value || '').toLowerCase();
        if (v === 'critical')
            return 'danger';
        if (v === 'high')
            return 'warn';
        if (v === 'medium')
            return 'info';
        if (v === 'normal')
            return 'success';
        return 'contrast';
    }
    routingRowSeverity(status) {
        return status === 'configured' ? 'success' : 'info';
    }
    saveQuickPolicyControls() {
        const settings = this.workspaceSettings();
        if (!settings || !this.canManagePolicies() || this.saving()) {
            return;
        }
        this.saving.set(true);
        this.workspace.updateSettings({
            name: settings.name,
            timeZone: settings.timeZone,
            currency: settings.currency,
            leadFirstTouchSlaHours: settings.leadFirstTouchSlaHours ?? null,
            defaultContractTermMonths: settings.defaultContractTermMonths ?? null,
            defaultDeliveryOwnerRoleId: settings.defaultDeliveryOwnerRoleId ?? null,
            approvalAmountThreshold: this.quickApprovalAmountThreshold(),
            approvalApproverRole: this.quickApprovalApproverRole().trim() || null,
            approvalWorkflowPolicy: settings.approvalWorkflowPolicy ?? null,
            qualificationPolicy: settings.qualificationPolicy ?? null,
            assistantActionScoringPolicy: settings.assistantActionScoringPolicy ?? null,
            decisionEscalationPolicy: this.normalizeEscalationPolicy(this.escalationPolicyDraft()),
            supportingDocumentPolicy: settings.supportingDocumentPolicy ?? null
        })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: (updated) => {
                this.workspaceSettings.set(updated);
                this.quickApprovalAmountThreshold.set(updated.approvalAmountThreshold ?? null);
                this.quickApprovalApproverRole.set(updated.approvalApproverRole ?? '');
                this.escalationPolicyDraft.set(this.normalizeEscalationPolicy(updated.decisionEscalationPolicy));
                this.saving.set(false);
                this.toast.show('success', 'Decision policy controls updated.', 2500);
            },
            error: () => {
                this.saving.set(false);
                this.toast.show('error', 'Unable to save decision policy controls.', 3000);
            }
        });
    }
    updateEscalationPolicy(key, value) {
        this.escalationPolicyDraft.update((current) => ({ ...current, [key]: value }));
    }
    normalizeEscalationPolicy(policy) {
        const defaults = this.defaultDecisionEscalationPolicy();
        return {
            enabled: policy?.enabled ?? defaults.enabled,
            sendEmailNotifications: policy?.sendEmailNotifications ?? defaults.sendEmailNotifications,
            notifyCurrentAssignee: policy?.notifyCurrentAssignee ?? defaults.notifyCurrentAssignee,
            notifyPendingStepRole: policy?.notifyPendingStepRole ?? defaults.notifyPendingStepRole,
            fallbackRoleName: (policy?.fallbackRoleName ?? defaults.fallbackRoleName).trim() || defaults.fallbackRoleName
        };
    }
    defaultDecisionEscalationPolicy() {
        return {
            enabled: true,
            sendEmailNotifications: true,
            notifyCurrentAssignee: true,
            notifyPendingStepRole: true,
            fallbackRoleName: 'Sales Manager'
        };
    }
    static ɵfac = function DecisionPoliciesSlaPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DecisionPoliciesSlaPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DecisionPoliciesSlaPage, selectors: [["app-decision-policies-sla-page"]], decls: 139, vars: 30, consts: [["noSteps", ""], ["noPurposeBreakdown", ""], ["noEscalations", ""], ["noThreshold", ""], [1, "policy-page"], [1, "hero-shell", "liquid-card"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-actions"], ["pButton", "", "type", "button", "routerLink", "/app/workflows", 1, "command-btn", "command-btn--ghost"], [1, "pi", "pi-share-alt"], ["pButton", "", "type", "button", 1, "command-btn", "command-btn--ghost", 3, "click", "disabled"], [1, "pi", "pi-refresh"], [1, "kpi-grid"], [1, "kpi-card", "liquid-card", "tone-cyan"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-meta"], [1, "kpi-card", "liquid-card", "tone-warn"], [1, "kpi-card", "liquid-card", "tone-danger"], [1, "kpi-card", "liquid-card"], [1, "page-grid"], [1, "liquid-card", "panel-card"], [1, "panel-header"], [1, "panel-title"], [1, "panel-subtitle"], [3, "value", "severity"], [1, "policy-meta-grid"], [1, "mini-card"], [1, "mini-label"], [1, "mini-value"], [1, "mini-value", "text"], ["class", "control-editor", 4, "ngIf"], ["class", "table-shell", 4, "ngIf", "ngIfElse"], [1, "sla-strip"], [1, "sla-pill"], [1, "pill-label"], ["severity", "danger", 3, "value"], ["severity", "warn", 3, "value"], ["severity", "info", 3, "value"], [1, "distribution-grid"], [1, "subpanel"], [1, "subpanel-title"], [1, "routing-list"], ["class", "routing-row", 4, "ngFor", "ngForOf"], ["class", "bars", 4, "ngIf", "ngIfElse"], ["class", "event-list", 4, "ngIf", "ngIfElse"], [1, "control-editor"], [1, "control-grid"], [1, "control-field"], ["pInputText", "", "type", "number", "min", "0", 3, "ngModelChange", "ngModel"], ["pInputText", "", "type", "text", "placeholder", "e.g. Sales Manager", 3, "ngModelChange", "ngModel"], [1, "control-toggle"], ["inputId", "decisionEscEnabled", 3, "ngModelChange", "binary", "ngModel"], ["inputId", "decisionEscEmail", 3, "ngModelChange", "binary", "ngModel"], ["inputId", "decisionEscAssignee", 3, "ngModelChange", "binary", "ngModel"], ["inputId", "decisionEscRole", 3, "ngModelChange", "binary", "ngModel"], [1, "control-field", "control-field--full"], ["pInputText", "", "type", "text", "placeholder", "Sales Manager", 3, "ngModelChange", "ngModel"], [1, "control-actions"], [1, "pi"], [1, "table-shell"], ["responsiveLayout", "scroll", "styleClass", "policy-table", 3, "value"], ["pTemplate", "header"], ["pTemplate", "body"], [3, "label"], [4, "ngIf", "ngIfElse"], [1, "empty-state"], [1, "routing-row"], [1, "routing-order"], [1, "routing-main"], [1, "routing-head"], [1, "routing-source"], [1, "bars"], ["class", "bar-row", 4, "ngFor", "ngForOf"], [1, "bar-row"], [1, "bar-head"], [1, "bar-track"], [1, "bar-fill"], [1, "empty-state", "compact"], [1, "event-list"], ["class", "event-row", 4, "ngFor", "ngForOf"], [1, "event-row"], [1, "event-main"], [1, "event-title"], [1, "event-tags"], [3, "value", "severity", 4, "ngIf"]], template: function DecisionPoliciesSlaPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "section", 4)(1, "section", 5)(2, "div")(3, "div", 6);
            i0.ɵɵelement(4, "span", 7);
            i0.ɵɵelementStart(5, "span");
            i0.ɵɵtext(6, "Decision Platform Controls");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "h1", 8)(8, "span", 9);
            i0.ɵɵtext(9, "Policies");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 10);
            i0.ɵɵtext(11, "& SLA");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "p", 11);
            i0.ɵɵtext(13, " Read-only operational view of approval policy thresholds, routing steps, and SLA health for the Decision Inbox platform. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "div", 12)(15, "a", 13);
            i0.ɵɵelement(16, "i", 14);
            i0.ɵɵelementStart(17, "span");
            i0.ɵɵtext(18, "Open Workflow Builder");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "button", 15);
            i0.ɵɵlistener("click", function DecisionPoliciesSlaPage_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.load()); });
            i0.ɵɵelement(20, "i", 16);
            i0.ɵɵelementStart(21, "span");
            i0.ɵɵtext(22, "Refresh");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(23, "section", 17)(24, "article", 18)(25, "div", 19);
            i0.ɵɵtext(26, "Active policy groups");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 20);
            i0.ɵɵtext(28);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 21);
            i0.ɵɵtext(30, "Thresholds / workflow / SLA policies configured");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "article", 22)(32, "div", 19);
            i0.ɵɵtext(33, "Pending decisions");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 20);
            i0.ɵɵtext(35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 21);
            i0.ɵɵtext(37);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(38, "article", 23)(39, "div", 19);
            i0.ɵɵtext(40, "Escalated now");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div", 20);
            i0.ɵɵtext(42);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div", 21);
            i0.ɵɵtext(44, "Open pending decisions marked escalated");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "article", 24)(46, "div", 19);
            i0.ɵɵtext(47, "Avg pending age");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 20);
            i0.ɵɵtext(49);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "div", 21);
            i0.ɵɵtext(51, "Hours across pending decision queue");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(52, "section", 25)(53, "article", 26)(54, "header", 27)(55, "div")(56, "div", 28);
            i0.ɵɵtext(57, "Approval Workflow Policy");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "div", 29);
            i0.ɵɵtext(59, "Workspace-configured routing and threshold controls");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(60, "p-tag", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "div", 31)(62, "div", 32)(63, "div", 33);
            i0.ɵɵtext(64, "Threshold amount");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "div", 34);
            i0.ɵɵtext(66);
            i0.ɵɵpipe(67, "number");
            i0.ɵɵelementStart(68, "span");
            i0.ɵɵtext(69);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(70, "small");
            i0.ɵɵtext(71, "Legacy/global amount threshold");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(72, "div", 32)(73, "div", 33);
            i0.ɵɵtext(74, "Default approver role");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "div", 35);
            i0.ɵɵtext(76);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "small");
            i0.ɵɵtext(78, "Fallback role when workflow step role is absent");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(79, "div", 32)(80, "div", 33);
            i0.ɵɵtext(81, "Workflow steps");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(82, "div", 34);
            i0.ɵɵtext(83);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "small");
            i0.ɵɵtext(85);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(86, "div", 32)(87, "div", 33);
            i0.ɵɵtext(88, "First-touch SLA");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(89, "div", 34);
            i0.ɵɵtext(90);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "small");
            i0.ɵɵtext(92, "Cross-workflow SLA shown for operational context");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(93, DecisionPoliciesSlaPage_section_93_Template, 39, 20, "section", 36)(94, DecisionPoliciesSlaPage_div_94_Template, 4, 1, "div", 37)(95, DecisionPoliciesSlaPage_ng_template_95_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "article", 26)(98, "header", 27)(99, "div")(100, "div", 28);
            i0.ɵɵtext(101, "SLA Health & Escalation Signals");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(102, "div", 29);
            i0.ɵɵtext(103, "Live queue and recent history indicators");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(104, "div", 38)(105, "div", 39)(106, "span", 40);
            i0.ɵɵtext(107, "Overdue");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(108, "p-tag", 41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(109, "div", 39)(110, "span", 40);
            i0.ɵɵtext(111, "At Risk");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(112, "p-tag", 42);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(113, "div", 39)(114, "span", 40);
            i0.ɵɵtext(115, "Escalated (Open)");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(116, "p-tag", 42);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(117, "div", 39)(118, "span", 40);
            i0.ɵɵtext(119, "Escalations (7d)");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(120, "p-tag", 43);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(121, "div", 44)(122, "section", 45)(123, "div", 46);
            i0.ɵɵtext(124, "Escalation Routing (Current)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "div", 47);
            i0.ɵɵtemplate(126, DecisionPoliciesSlaPage_div_126_Template, 13, 8, "div", 48);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(127, "section", 45)(128, "div", 46);
            i0.ɵɵtext(129, "Pending Queue by Purpose");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(130, DecisionPoliciesSlaPage_div_130_Template, 2, 1, "div", 49)(131, DecisionPoliciesSlaPage_ng_template_131_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(133, "section", 45)(134, "div", 46);
            i0.ɵɵtext(135, "Recent Escalation Events");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(136, DecisionPoliciesSlaPage_div_136_Template, 2, 1, "div", 50)(137, DecisionPoliciesSlaPage_ng_template_137_Template, 2, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            let tmp_11_0;
            let tmp_12_0;
            let tmp_13_0;
            let tmp_15_0;
            let tmp_16_0;
            const noSteps_r9 = i0.ɵɵreference(96);
            const noPurposeBreakdown_r10 = i0.ɵɵreference(132);
            const noEscalations_r11 = i0.ɵɵreference(138);
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.activePolicyCount());
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.operationalKpis().pending);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("", ctx.operationalKpis().atRisk, " at risk \u00B7 ", ctx.operationalKpis().overdue, " overdue");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.operationalKpis().escalated);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.operationalKpis().avgAgeHours);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("value", ctx.approvalPolicyEnabledLabel())("severity", ctx.approvalPolicyEnabledSeverity());
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(67, 27, ((tmp_11_0 = ctx.workspaceSettings()) == null ? null : tmp_11_0.approvalAmountThreshold) ?? 0, "1.0-0"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(((tmp_12_0 = ctx.workspaceSettings()) == null ? null : tmp_12_0.currency) || "USD");
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(((tmp_13_0 = ctx.workspaceSettings()) == null ? null : tmp_13_0.approvalApproverRole) || "Not set");
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.approvalSteps().length);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(((tmp_15_0 = ctx.approvalPolicy()) == null ? null : tmp_15_0.enabled) ? "Policy-driven multi-step routing" : "Workflow policy disabled");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1("", ((tmp_16_0 = ctx.workspaceSettings()) == null ? null : tmp_16_0.leadFirstTouchSlaHours) ?? 0, "h");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.canManagePolicies());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.approvalSteps().length)("ngIfElse", noSteps_r9);
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("value", "" + ctx.operationalKpis().overdue);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("value", "" + ctx.operationalKpis().atRisk);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("value", "" + ctx.operationalKpis().escalated);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("value", "" + ctx.historyKpis().escalations7d);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngForOf", ctx.escalationRoutingRows());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.purposeDistribution().length)("ngIfElse", noPurposeBreakdown_r10);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.escalationTrendRows().length)("ngIfElse", noEscalations_r11);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, FormsModule, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.NgControlStatus, i2.MinValidator, i2.NgModel, RouterLink,
            InputTextModule, i3.InputText, CheckboxModule, i4.Checkbox, i5.PrimeTemplate, TableModule, i6.Table, TagModule, i7.Tag, ChipModule, i8.Chip, ButtonModule, i9.ButtonDirective, i1.UpperCasePipe, i1.DecimalPipe, i1.DatePipe], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.policy-page[_ngcontent-%COMP%] {\n  color: #0f172a;\n  padding: 0.4rem 0 1rem;\n}\n\n.liquid-card[_ngcontent-%COMP%] {\n  border-radius: 18px;\n  border: 1px solid rgba(255, 255, 255, 0.72);\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78)),\n    radial-gradient(circle at 0% 0%, rgba(56,189,248,0.08), transparent 45%),\n    radial-gradient(circle at 100% 0%, rgba(99,102,241,0.08), transparent 48%);\n  box-shadow:\n    inset 0 1px 0 rgba(255,255,255,0.95),\n    0 14px 28px rgba(15,23,42,0.06);\n  backdrop-filter: blur(16px) saturate(150%);\n}\n\n.hero-shell[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: center;\n  padding: 1.05rem 1.15rem;\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.55rem;\n  align-items: center;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.28rem 0.6rem;\n  border-radius: 999px;\n  border: 1px solid rgba(59,130,246,0.18);\n  background: rgba(59,130,246,0.08);\n  color: #1d4ed8;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n\n.badge-dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 999px;\n  background: #38bdf8;\n  box-shadow: 0 0 10px rgba(56,189,248,0.55);\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  margin: 0.55rem 0 0.25rem;\n  font-size: 1.55rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  line-height: 1.1;\n}\n\n.title-gradient[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.title-light[_ngcontent-%COMP%] {\n  color: #334155;\n}\n\n.hero-description[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(51,65,85,0.82);\n  font-size: 0.95rem;\n  max-width: 70ch;\n}\n\n.kpi-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.8rem;\n  margin-top: 0.95rem;\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n  padding: 0.78rem 0.88rem;\n}\n\n.kpi-label[_ngcontent-%COMP%] {\n  color: rgba(51,65,85,0.68);\n  font-size: 0.72rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n\n.kpi-value[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  font-size: 1.28rem;\n  font-weight: 800;\n  line-height: 1.1;\n}\n\n.kpi-meta[_ngcontent-%COMP%] {\n  margin-top: 0.15rem;\n  color: rgba(71,85,105,0.78);\n  font-size: 0.75rem;\n  line-height: 1.25;\n}\n\n.tone-cyan[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.8)),\n    radial-gradient(circle at 12% 18%, rgba(34,211,238,0.16), transparent 58%);\n}\n\n.tone-warn[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.8)),\n    radial-gradient(circle at 12% 18%, rgba(251,191,36,0.17), transparent 58%);\n}\n\n.tone-danger[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.8)),\n    radial-gradient(circle at 12% 18%, rgba(244,63,94,0.14), transparent 58%);\n}\n\n.page-grid[_ngcontent-%COMP%] {\n  margin-top: 0.85rem;\n  display: grid;\n  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);\n  gap: 0.8rem;\n  align-items: start;\n}\n\n.panel-card[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 0.75rem;\n  margin-bottom: 0.8rem;\n}\n\n.panel-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 800;\n  color: #0f172a;\n}\n\n.panel-subtitle[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  color: rgba(71,85,105,0.82);\n  font-size: 0.83rem;\n  line-height: 1.3;\n}\n\n.policy-meta-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.65rem;\n  margin-bottom: 0.8rem;\n}\n\n.mini-card[_ngcontent-%COMP%] {\n  border-radius: 14px;\n  border: 1px solid rgba(226,232,240,0.9);\n  background: rgba(255,255,255,0.78);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.88);\n  padding: 0.7rem 0.75rem;\n}\n\n.mini-label[_ngcontent-%COMP%] {\n  color: rgba(51,65,85,0.68);\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  font-weight: 700;\n}\n\n.mini-value[_ngcontent-%COMP%] {\n  margin-top: 0.18rem;\n  font-size: 1.05rem;\n  font-weight: 800;\n  color: #0f172a;\n  line-height: 1.15;\n}\n\n.mini-value[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 700;\n  color: rgba(71,85,105,0.78);\n  margin-left: 0.22rem;\n}\n\n.mini-value.text[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 700;\n}\n\n.mini-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.2rem;\n  color: rgba(100,116,139,0.85);\n  line-height: 1.25;\n}\n\n.table-shell[_ngcontent-%COMP%] {\n  border-radius: 14px;\n  border: 1px solid rgba(226,232,240,0.85);\n  background: rgba(255,255,255,0.72);\n  padding: 0.55rem;\n}\n\n.control-editor[_ngcontent-%COMP%] {\n  margin-bottom: 0.75rem;\n  border-radius: 14px;\n  border: 1px solid rgba(226,232,240,0.85);\n  background: rgba(255,255,255,0.72);\n  padding: 0.7rem;\n}\n\n.control-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.55rem 0.65rem;\n}\n\n.control-field[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.28rem;\n}\n\n.control-field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: rgba(51,65,85,0.8);\n  font-size: 0.74rem;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n}\n\n.control-field[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: rgba(100,116,139,0.88);\n  font-size: 0.72rem;\n}\n\n.control-field--full[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n\n.control-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  border-radius: 12px;\n  border: 1px solid rgba(226,232,240,0.82);\n  background: rgba(255,255,255,0.68);\n  padding: 0.5rem 0.6rem;\n  color: #334155;\n  font-size: 0.78rem;\n  font-weight: 600;\n}\n\n.control-actions[_ngcontent-%COMP%] {\n  margin-top: 0.65rem;\n  display: flex;\n  justify-content: flex-end;\n}\n\n.sla-strip[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.55rem;\n}\n\n.sla-pill[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.45rem;\n  border-radius: 12px;\n  border: 1px solid rgba(226,232,240,0.85);\n  background: rgba(255,255,255,0.72);\n  padding: 0.45rem 0.55rem;\n}\n\n.pill-label[_ngcontent-%COMP%] {\n  font-size: 0.76rem;\n  color: #334155;\n  font-weight: 700;\n}\n\n.distribution-grid[_ngcontent-%COMP%] {\n  margin-top: 0.75rem;\n  display: grid;\n  gap: 0.75rem;\n}\n\n.subpanel[_ngcontent-%COMP%] {\n  border-radius: 14px;\n  border: 1px solid rgba(226,232,240,0.82);\n  background: rgba(255,255,255,0.72);\n  padding: 0.7rem;\n}\n\n.subpanel-title[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  font-weight: 800;\n  color: #1e293b;\n  margin-bottom: 0.5rem;\n}\n\n.bars[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n}\n\n.bar-row[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.2rem;\n}\n\n.bar-head[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.45rem;\n  font-size: 0.78rem;\n  color: #334155;\n}\n\n.bar-head[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #0f172a;\n}\n\n.bar-track[_ngcontent-%COMP%] {\n  height: 7px;\n  border-radius: 999px;\n  background: rgba(226,232,240,0.9);\n  overflow: hidden;\n}\n\n.bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 999px;\n  background: linear-gradient(90deg, rgba(59,130,246,0.78), rgba(34,211,238,0.82));\n  box-shadow: 0 0 10px rgba(56,189,248,0.22);\n}\n\n.event-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.45rem;\n}\n\n.routing-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.5rem;\n}\n\n.routing-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 30px minmax(0, 1fr);\n  gap: 0.55rem;\n  align-items: start;\n  border-radius: 12px;\n  border: 1px solid rgba(226,232,240,0.78);\n  background: rgba(255,255,255,0.7);\n  padding: 0.55rem 0.6rem;\n}\n\n.routing-order[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  display: grid;\n  place-items: center;\n  border-radius: 999px;\n  border: 1px solid rgba(147,197,253,0.55);\n  background: rgba(239,246,255,0.92);\n  color: #1e40af;\n  font-weight: 800;\n  font-size: 0.78rem;\n}\n\n.routing-main[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: grid;\n  gap: 0.12rem;\n}\n\n.routing-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n\n.routing-head[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #1e293b;\n  font-size: 0.82rem;\n}\n\n.routing-source[_ngcontent-%COMP%] {\n  color: #475569;\n  font-size: 0.76rem;\n  font-weight: 600;\n}\n\n.routing-main[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: rgba(100,116,139,0.9);\n  line-height: 1.25;\n}\n\n.event-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.65rem;\n  align-items: flex-start;\n  border-radius: 12px;\n  border: 1px solid rgba(226,232,240,0.78);\n  background: rgba(255,255,255,0.7);\n  padding: 0.55rem 0.6rem;\n}\n\n.event-main[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.event-title[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  font-weight: 700;\n  color: #1e293b;\n}\n\n.event-main[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.15rem;\n  color: rgba(100,116,139,0.88);\n  line-height: 1.25;\n}\n\n.event-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.25rem;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 1px dashed rgba(203,213,225,0.9);\n  background: rgba(248,250,252,0.8);\n  color: rgba(71,85,105,0.85);\n  text-align: center;\n  padding: 0.8rem;\n}\n\n.empty-state.compact[_ngcontent-%COMP%] {\n  padding: 0.7rem;\n  font-size: 0.8rem;\n}\n\n.command-btn[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 1px solid rgba(148,163,184,0.22);\n  color: #334155;\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.84)),\n    rgba(255,255,255,0.75);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), 0 2px 8px rgba(15,23,42,0.05);\n}\n\n.command-btn--ghost[_ngcontent-%COMP%] {\n  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\n}\n\n.command-btn[_ngcontent-%COMP%]   .pi[_ngcontent-%COMP%] {\n  margin-right: 0.35rem;\n}\n\n.command-btn--ghost[_ngcontent-%COMP%]:hover {\n  border-color: rgba(96,165,250,0.28);\n  transform: translateY(-1px);\n  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.12);\n}\n\n[_nghost-%COMP%]     .policy-table.p-datatable .p-datatable-thead > tr > th {\n  background: rgba(248,250,252,0.88);\n  border-color: rgba(226,232,240,0.9);\n  color: #334155;\n  font-size: 0.73rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  font-weight: 700;\n  padding: 0.55rem 0.5rem;\n}\n\n[_nghost-%COMP%]     .policy-table.p-datatable .p-datatable-tbody > tr > td {\n  background: rgba(255,255,255,0.68);\n  border-color: rgba(226,232,240,0.72);\n  padding: 0.55rem 0.5rem;\n  color: #334155;\n  font-size: 0.82rem;\n}\n\n[_nghost-%COMP%]     .policy-table .p-chip {\n  background: rgba(239,246,255,0.95);\n  color: #1e3a8a;\n  border: 1px solid rgba(147,197,253,0.5);\n  font-size: 0.72rem;\n}\n\n[_nghost-%COMP%]     .panel-card .p-tag, \n[_nghost-%COMP%]     .sla-pill .p-tag {\n  font-size: 0.69rem;\n  border-radius: 999px;\n}\n\n[_nghost-%COMP%]     .routing-row .p-tag {\n  font-size: 0.63rem;\n  border-radius: 999px;\n}\n\n[_nghost-%COMP%]     .control-editor .p-inputtext {\n  width: 100%;\n  background: rgba(255,255,255,0.92);\n  border: 1px solid rgba(203,213,225,0.9);\n  color: #0f172a;\n}\n\n[_nghost-%COMP%]     .control-editor .p-checkbox .p-checkbox-box {\n  border-color: rgba(148,163,184,0.55);\n  background: rgba(255,255,255,0.92);\n}\n\n[_nghost-%COMP%]     .control-editor .p-checkbox.p-highlight .p-checkbox-box {\n  border-color: rgba(59,130,246,0.65);\n  background: linear-gradient(135deg, rgba(59,130,246,0.86), rgba(99,102,241,0.82));\n}\n\n@media (max-width: 1100px) {\n  .page-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .kpi-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 820px) {\n  .hero-shell[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .hero-actions[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n\n  .policy-meta-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .control-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .sla-strip[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .event-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n\n  .event-tags[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    flex-direction: row;\n    flex-wrap: wrap;\n  }\n}\n\n@media (max-width: 640px) {\n  .kpi-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .panel-card[_ngcontent-%COMP%] {\n    padding: 0.75rem;\n  }\n\n  .hero-title[_ngcontent-%COMP%] {\n    font-size: 1.2rem;\n  }\n\n  .hero-description[_ngcontent-%COMP%] {\n    font-size: 0.85rem;\n  }\n\n  .command-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: center;\n  }\n\n  .hero-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    display: grid;\n    grid-template-columns: 1fr;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DecisionPoliciesSlaPage, [{
        type: Component,
        args: [{ selector: 'app-decision-policies-sla-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    RouterLink,
                    InputTextModule,
                    CheckboxModule,
                    TableModule,
                    TagModule,
                    ChipModule,
                    ButtonModule,
                    DecimalPipe,
                    DatePipe
                ], template: "<section class=\"policy-page\">\n  <section class=\"hero-shell liquid-card\">\n    <div>\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Decision Platform Controls</span>\n      </div>\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Policies</span>\n        <span class=\"title-light\">&amp; SLA</span>\n      </h1>\n      <p class=\"hero-description\">\n        Read-only operational view of approval policy thresholds, routing steps, and SLA health for the Decision Inbox platform.\n      </p>\n    </div>\n    <div class=\"hero-actions\">\n      <a pButton type=\"button\" class=\"command-btn command-btn--ghost\" routerLink=\"/app/workflows\">\n        <i class=\"pi pi-share-alt\"></i>\n        <span>Open Workflow Builder</span>\n      </a>\n      <button pButton type=\"button\" class=\"command-btn command-btn--ghost\" (click)=\"load()\" [disabled]=\"loading()\">\n        <i class=\"pi pi-refresh\"></i>\n        <span>Refresh</span>\n      </button>\n    </div>\n  </section>\n\n  <section class=\"kpi-grid\">\n    <article class=\"kpi-card liquid-card tone-cyan\">\n      <div class=\"kpi-label\">Active policy groups</div>\n      <div class=\"kpi-value\">{{ activePolicyCount() }}</div>\n      <div class=\"kpi-meta\">Thresholds / workflow / SLA policies configured</div>\n    </article>\n    <article class=\"kpi-card liquid-card tone-warn\">\n      <div class=\"kpi-label\">Pending decisions</div>\n      <div class=\"kpi-value\">{{ operationalKpis().pending }}</div>\n      <div class=\"kpi-meta\">{{ operationalKpis().atRisk }} at risk \u00B7 {{ operationalKpis().overdue }} overdue</div>\n    </article>\n    <article class=\"kpi-card liquid-card tone-danger\">\n      <div class=\"kpi-label\">Escalated now</div>\n      <div class=\"kpi-value\">{{ operationalKpis().escalated }}</div>\n      <div class=\"kpi-meta\">Open pending decisions marked escalated</div>\n    </article>\n    <article class=\"kpi-card liquid-card\">\n      <div class=\"kpi-label\">Avg pending age</div>\n      <div class=\"kpi-value\">{{ operationalKpis().avgAgeHours }}</div>\n      <div class=\"kpi-meta\">Hours across pending decision queue</div>\n    </article>\n  </section>\n\n  <section class=\"page-grid\">\n    <article class=\"liquid-card panel-card\">\n      <header class=\"panel-header\">\n        <div>\n          <div class=\"panel-title\">Approval Workflow Policy</div>\n          <div class=\"panel-subtitle\">Workspace-configured routing and threshold controls</div>\n        </div>\n        <p-tag [value]=\"approvalPolicyEnabledLabel()\" [severity]=\"approvalPolicyEnabledSeverity()\"></p-tag>\n      </header>\n\n      <div class=\"policy-meta-grid\">\n        <div class=\"mini-card\">\n          <div class=\"mini-label\">Threshold amount</div>\n          <div class=\"mini-value\">\n            {{ (workspaceSettings()?.approvalAmountThreshold ?? 0) | number:'1.0-0' }}\n            <span>{{ workspaceSettings()?.currency || 'USD' }}</span>\n          </div>\n          <small>Legacy/global amount threshold</small>\n        </div>\n        <div class=\"mini-card\">\n          <div class=\"mini-label\">Default approver role</div>\n          <div class=\"mini-value text\">{{ workspaceSettings()?.approvalApproverRole || 'Not set' }}</div>\n          <small>Fallback role when workflow step role is absent</small>\n        </div>\n        <div class=\"mini-card\">\n          <div class=\"mini-label\">Workflow steps</div>\n          <div class=\"mini-value\">{{ approvalSteps().length }}</div>\n          <small>{{ approvalPolicy()?.enabled ? 'Policy-driven multi-step routing' : 'Workflow policy disabled' }}</small>\n        </div>\n        <div class=\"mini-card\">\n          <div class=\"mini-label\">First-touch SLA</div>\n          <div class=\"mini-value\">{{ workspaceSettings()?.leadFirstTouchSlaHours ?? 0 }}h</div>\n          <small>Cross-workflow SLA shown for operational context</small>\n        </div>\n      </div>\n\n      <section class=\"control-editor\" *ngIf=\"canManagePolicies()\">\n        <div class=\"subpanel-title\">Decision Module Quick Controls</div>\n        <div class=\"control-grid\">\n          <label class=\"control-field\">\n            <span>Amount threshold ({{ workspaceSettings()?.currency || 'USD' }})</span>\n            <input\n              pInputText\n              type=\"number\"\n              min=\"0\"\n              [ngModel]=\"quickApprovalAmountThreshold() ?? ''\"\n              (ngModelChange)=\"quickApprovalAmountThreshold.set($event === '' ? null : +$event)\"\n            />\n          </label>\n          <label class=\"control-field\">\n            <span>Default approver role</span>\n            <input\n              pInputText\n              type=\"text\"\n              [ngModel]=\"quickApprovalApproverRole()\"\n              (ngModelChange)=\"quickApprovalApproverRole.set($event ?? '')\"\n              placeholder=\"e.g. Sales Manager\"\n            />\n          </label>\n          <label class=\"control-toggle\">\n            <p-checkbox\n              [binary]=\"true\"\n              [ngModel]=\"escalationPolicyDraft().enabled\"\n              (ngModelChange)=\"updateEscalationPolicy('enabled', !!$event)\"\n              inputId=\"decisionEscEnabled\"\n            ></p-checkbox>\n            <span>Enable escalation worker policy</span>\n          </label>\n          <label class=\"control-toggle\">\n            <p-checkbox\n              [binary]=\"true\"\n              [ngModel]=\"escalationPolicyDraft().sendEmailNotifications\"\n              (ngModelChange)=\"updateEscalationPolicy('sendEmailNotifications', !!$event)\"\n              inputId=\"decisionEscEmail\"\n            ></p-checkbox>\n            <span>Send escalation email notifications</span>\n          </label>\n          <label class=\"control-toggle\">\n            <p-checkbox\n              [binary]=\"true\"\n              [ngModel]=\"escalationPolicyDraft().notifyCurrentAssignee\"\n              (ngModelChange)=\"updateEscalationPolicy('notifyCurrentAssignee', !!$event)\"\n              inputId=\"decisionEscAssignee\"\n            ></p-checkbox>\n            <span>Notify current assignee first</span>\n          </label>\n          <label class=\"control-toggle\">\n            <p-checkbox\n              [binary]=\"true\"\n              [ngModel]=\"escalationPolicyDraft().notifyPendingStepRole\"\n              (ngModelChange)=\"updateEscalationPolicy('notifyPendingStepRole', !!$event)\"\n              inputId=\"decisionEscRole\"\n            ></p-checkbox>\n            <span>Notify pending-step approver role users</span>\n          </label>\n          <label class=\"control-field control-field--full\">\n            <span>Fallback role name</span>\n            <input\n              pInputText\n              type=\"text\"\n              [ngModel]=\"escalationPolicyDraft().fallbackRoleName\"\n              (ngModelChange)=\"updateEscalationPolicy('fallbackRoleName', ($event ?? '').toString())\"\n              placeholder=\"Sales Manager\"\n            />\n            <small>Used when assignee and step-role recipients are unavailable.</small>\n          </label>\n        </div>\n        <div class=\"control-actions\">\n          <button pButton type=\"button\" class=\"command-btn command-btn--ghost\" (click)=\"saveQuickPolicyControls()\" [disabled]=\"saving() || loading()\">\n            <i class=\"pi\" [class.pi-spin]=\"saving()\" [class.pi-save]=\"!saving()\" [class.pi-spinner]=\"saving()\"></i>\n            <span>{{ saving() ? 'Saving...' : 'Save Controls' }}</span>\n          </button>\n        </div>\n      </section>\n\n      <div class=\"table-shell\" *ngIf=\"approvalSteps().length; else noSteps\">\n        <p-table [value]=\"approvalSteps()\" responsiveLayout=\"scroll\" styleClass=\"policy-table\">\n          <ng-template pTemplate=\"header\">\n            <tr>\n              <th>Step</th>\n              <th>Approver Role</th>\n              <th>Amount Threshold</th>\n              <th>Purpose Scope</th>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"body\" let-step>\n            <tr>\n              <td><p-chip [label]=\"'Step ' + step.order\"></p-chip></td>\n              <td>{{ step.approverRole }}</td>\n              <td>\n                <span *ngIf=\"step.amountThreshold != null; else noThreshold\">\n                  {{ step.amountThreshold | number:'1.0-0' }} {{ workspaceSettings()?.currency || 'USD' }}\n                </span>\n                <ng-template #noThreshold>Any amount</ng-template>\n              </td>\n              <td>{{ step.purpose || 'All purposes' }}</td>\n            </tr>\n          </ng-template>\n        </p-table>\n      </div>\n      <ng-template #noSteps>\n        <div class=\"empty-state\">No approval workflow steps are configured for this workspace.</div>\n      </ng-template>\n    </article>\n\n    <article class=\"liquid-card panel-card\">\n      <header class=\"panel-header\">\n        <div>\n          <div class=\"panel-title\">SLA Health & Escalation Signals</div>\n          <div class=\"panel-subtitle\">Live queue and recent history indicators</div>\n        </div>\n      </header>\n\n      <div class=\"sla-strip\">\n        <div class=\"sla-pill\">\n          <span class=\"pill-label\">Overdue</span>\n          <p-tag [value]=\"'' + operationalKpis().overdue\" severity=\"danger\"></p-tag>\n        </div>\n        <div class=\"sla-pill\">\n          <span class=\"pill-label\">At Risk</span>\n          <p-tag [value]=\"'' + operationalKpis().atRisk\" severity=\"warn\"></p-tag>\n        </div>\n        <div class=\"sla-pill\">\n          <span class=\"pill-label\">Escalated (Open)</span>\n          <p-tag [value]=\"'' + operationalKpis().escalated\" severity=\"warn\"></p-tag>\n        </div>\n        <div class=\"sla-pill\">\n          <span class=\"pill-label\">Escalations (7d)</span>\n          <p-tag [value]=\"'' + historyKpis().escalations7d\" severity=\"info\"></p-tag>\n        </div>\n      </div>\n\n      <div class=\"distribution-grid\">\n        <section class=\"subpanel\">\n          <div class=\"subpanel-title\">Escalation Routing (Current)</div>\n          <div class=\"routing-list\">\n            <div class=\"routing-row\" *ngFor=\"let row of escalationRoutingRows()\">\n              <div class=\"routing-order\">{{ row.order }}</div>\n              <div class=\"routing-main\">\n                <div class=\"routing-head\">\n                  <strong>{{ row.target }}</strong>\n                  <p-tag [value]=\"row.status | uppercase\" [severity]=\"routingRowSeverity(row.status)\"></p-tag>\n                </div>\n                <div class=\"routing-source\">{{ row.source }}</div>\n                <small>{{ row.description }}</small>\n              </div>\n            </div>\n          </div>\n        </section>\n\n        <section class=\"subpanel\">\n          <div class=\"subpanel-title\">Pending Queue by Purpose</div>\n          <div *ngIf=\"purposeDistribution().length; else noPurposeBreakdown\" class=\"bars\">\n            <div class=\"bar-row\" *ngFor=\"let item of purposeDistribution(); let first = first\">\n              <div class=\"bar-head\">\n                <span>{{ item.label }}</span>\n                <strong>{{ item.count }}</strong>\n              </div>\n              <div class=\"bar-track\">\n                <div class=\"bar-fill\" [style.width.%]=\"(item.count / (purposeDistribution()[0]?.count || 1)) * 100\"></div>\n              </div>\n            </div>\n          </div>\n          <ng-template #noPurposeBreakdown>\n            <div class=\"empty-state compact\">No pending decisions in queue.</div>\n          </ng-template>\n        </section>\n\n        <section class=\"subpanel\">\n          <div class=\"subpanel-title\">Recent Escalation Events</div>\n          <div *ngIf=\"escalationTrendRows().length; else noEscalations\" class=\"event-list\">\n            <div class=\"event-row\" *ngFor=\"let row of escalationTrendRows()\">\n              <div class=\"event-main\">\n                <div class=\"event-title\">{{ row.entityName }}</div>\n                <small>{{ row.decisionType }} \u00B7 {{ row.actionAtUtc | date:'MMM d, h:mm a' }}</small>\n              </div>\n              <div class=\"event-tags\">\n                <p-tag [value]=\"row.status\" severity=\"warn\"></p-tag>\n                <p-tag *ngIf=\"row.priority\" [value]=\"row.priority | uppercase\" [severity]=\"prioritySeverity(row.priority)\"></p-tag>\n              </div>\n            </div>\n          </div>\n          <ng-template #noEscalations>\n            <div class=\"empty-state compact\">No escalation events found in recent decision history.</div>\n          </ng-template>\n        </section>\n      </div>\n    </article>\n  </section>\n</section>\n", styles: [":host {\n  display: block;\n}\n\n.policy-page {\n  color: #0f172a;\n  padding: 0.4rem 0 1rem;\n}\n\n.liquid-card {\n  border-radius: 18px;\n  border: 1px solid rgba(255, 255, 255, 0.72);\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78)),\n    radial-gradient(circle at 0% 0%, rgba(56,189,248,0.08), transparent 45%),\n    radial-gradient(circle at 100% 0%, rgba(99,102,241,0.08), transparent 48%);\n  box-shadow:\n    inset 0 1px 0 rgba(255,255,255,0.95),\n    0 14px 28px rgba(15,23,42,0.06);\n  backdrop-filter: blur(16px) saturate(150%);\n}\n\n.hero-shell {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  align-items: center;\n  padding: 1.05rem 1.15rem;\n}\n\n.hero-actions {\n  display: flex;\n  gap: 0.55rem;\n  align-items: center;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.28rem 0.6rem;\n  border-radius: 999px;\n  border: 1px solid rgba(59,130,246,0.18);\n  background: rgba(59,130,246,0.08);\n  color: #1d4ed8;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n\n.badge-dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 999px;\n  background: #38bdf8;\n  box-shadow: 0 0 10px rgba(56,189,248,0.55);\n}\n\n.hero-title {\n  margin: 0.55rem 0 0.25rem;\n  font-size: 1.55rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  line-height: 1.1;\n}\n\n.title-gradient {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.title-light {\n  color: #334155;\n}\n\n.hero-description {\n  margin: 0;\n  color: rgba(51,65,85,0.82);\n  font-size: 0.95rem;\n  max-width: 70ch;\n}\n\n.kpi-grid {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.8rem;\n  margin-top: 0.95rem;\n}\n\n.kpi-card {\n  padding: 0.78rem 0.88rem;\n}\n\n.kpi-label {\n  color: rgba(51,65,85,0.68);\n  font-size: 0.72rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n}\n\n.kpi-value {\n  margin-top: 0.2rem;\n  font-size: 1.28rem;\n  font-weight: 800;\n  line-height: 1.1;\n}\n\n.kpi-meta {\n  margin-top: 0.15rem;\n  color: rgba(71,85,105,0.78);\n  font-size: 0.75rem;\n  line-height: 1.25;\n}\n\n.tone-cyan {\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.8)),\n    radial-gradient(circle at 12% 18%, rgba(34,211,238,0.16), transparent 58%);\n}\n\n.tone-warn {\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.8)),\n    radial-gradient(circle at 12% 18%, rgba(251,191,36,0.17), transparent 58%);\n}\n\n.tone-danger {\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.8)),\n    radial-gradient(circle at 12% 18%, rgba(244,63,94,0.14), transparent 58%);\n}\n\n.page-grid {\n  margin-top: 0.85rem;\n  display: grid;\n  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);\n  gap: 0.8rem;\n  align-items: start;\n}\n\n.panel-card {\n  padding: 1rem;\n}\n\n.panel-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 0.75rem;\n  margin-bottom: 0.8rem;\n}\n\n.panel-title {\n  font-size: 1rem;\n  font-weight: 800;\n  color: #0f172a;\n}\n\n.panel-subtitle {\n  margin-top: 0.2rem;\n  color: rgba(71,85,105,0.82);\n  font-size: 0.83rem;\n  line-height: 1.3;\n}\n\n.policy-meta-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.65rem;\n  margin-bottom: 0.8rem;\n}\n\n.mini-card {\n  border-radius: 14px;\n  border: 1px solid rgba(226,232,240,0.9);\n  background: rgba(255,255,255,0.78);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.88);\n  padding: 0.7rem 0.75rem;\n}\n\n.mini-label {\n  color: rgba(51,65,85,0.68);\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  font-weight: 700;\n}\n\n.mini-value {\n  margin-top: 0.18rem;\n  font-size: 1.05rem;\n  font-weight: 800;\n  color: #0f172a;\n  line-height: 1.15;\n}\n\n.mini-value span {\n  font-size: 0.72rem;\n  font-weight: 700;\n  color: rgba(71,85,105,0.78);\n  margin-left: 0.22rem;\n}\n\n.mini-value.text {\n  font-size: 0.9rem;\n  font-weight: 700;\n}\n\n.mini-card small {\n  display: block;\n  margin-top: 0.2rem;\n  color: rgba(100,116,139,0.85);\n  line-height: 1.25;\n}\n\n.table-shell {\n  border-radius: 14px;\n  border: 1px solid rgba(226,232,240,0.85);\n  background: rgba(255,255,255,0.72);\n  padding: 0.55rem;\n}\n\n.control-editor {\n  margin-bottom: 0.75rem;\n  border-radius: 14px;\n  border: 1px solid rgba(226,232,240,0.85);\n  background: rgba(255,255,255,0.72);\n  padding: 0.7rem;\n}\n\n.control-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.55rem 0.65rem;\n}\n\n.control-field {\n  display: grid;\n  gap: 0.28rem;\n}\n\n.control-field span {\n  color: rgba(51,65,85,0.8);\n  font-size: 0.74rem;\n  font-weight: 700;\n  letter-spacing: 0.03em;\n}\n\n.control-field small {\n  color: rgba(100,116,139,0.88);\n  font-size: 0.72rem;\n}\n\n.control-field--full {\n  grid-column: 1 / -1;\n}\n\n.control-toggle {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  border-radius: 12px;\n  border: 1px solid rgba(226,232,240,0.82);\n  background: rgba(255,255,255,0.68);\n  padding: 0.5rem 0.6rem;\n  color: #334155;\n  font-size: 0.78rem;\n  font-weight: 600;\n}\n\n.control-actions {\n  margin-top: 0.65rem;\n  display: flex;\n  justify-content: flex-end;\n}\n\n.sla-strip {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0.55rem;\n}\n\n.sla-pill {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.45rem;\n  border-radius: 12px;\n  border: 1px solid rgba(226,232,240,0.85);\n  background: rgba(255,255,255,0.72);\n  padding: 0.45rem 0.55rem;\n}\n\n.pill-label {\n  font-size: 0.76rem;\n  color: #334155;\n  font-weight: 700;\n}\n\n.distribution-grid {\n  margin-top: 0.75rem;\n  display: grid;\n  gap: 0.75rem;\n}\n\n.subpanel {\n  border-radius: 14px;\n  border: 1px solid rgba(226,232,240,0.82);\n  background: rgba(255,255,255,0.72);\n  padding: 0.7rem;\n}\n\n.subpanel-title {\n  font-size: 0.82rem;\n  font-weight: 800;\n  color: #1e293b;\n  margin-bottom: 0.5rem;\n}\n\n.bars {\n  display: grid;\n  gap: 0.45rem;\n}\n\n.bar-row {\n  display: grid;\n  gap: 0.2rem;\n}\n\n.bar-head {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.45rem;\n  font-size: 0.78rem;\n  color: #334155;\n}\n\n.bar-head strong {\n  color: #0f172a;\n}\n\n.bar-track {\n  height: 7px;\n  border-radius: 999px;\n  background: rgba(226,232,240,0.9);\n  overflow: hidden;\n}\n\n.bar-fill {\n  height: 100%;\n  border-radius: 999px;\n  background: linear-gradient(90deg, rgba(59,130,246,0.78), rgba(34,211,238,0.82));\n  box-shadow: 0 0 10px rgba(56,189,248,0.22);\n}\n\n.event-list {\n  display: grid;\n  gap: 0.45rem;\n}\n\n.routing-list {\n  display: grid;\n  gap: 0.5rem;\n}\n\n.routing-row {\n  display: grid;\n  grid-template-columns: 30px minmax(0, 1fr);\n  gap: 0.55rem;\n  align-items: start;\n  border-radius: 12px;\n  border: 1px solid rgba(226,232,240,0.78);\n  background: rgba(255,255,255,0.7);\n  padding: 0.55rem 0.6rem;\n}\n\n.routing-order {\n  width: 30px;\n  height: 30px;\n  display: grid;\n  place-items: center;\n  border-radius: 999px;\n  border: 1px solid rgba(147,197,253,0.55);\n  background: rgba(239,246,255,0.92);\n  color: #1e40af;\n  font-weight: 800;\n  font-size: 0.78rem;\n}\n\n.routing-main {\n  min-width: 0;\n  display: grid;\n  gap: 0.12rem;\n}\n\n.routing-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.5rem;\n}\n\n.routing-head strong {\n  color: #1e293b;\n  font-size: 0.82rem;\n}\n\n.routing-source {\n  color: #475569;\n  font-size: 0.76rem;\n  font-weight: 600;\n}\n\n.routing-main small {\n  color: rgba(100,116,139,0.9);\n  line-height: 1.25;\n}\n\n.event-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 0.65rem;\n  align-items: flex-start;\n  border-radius: 12px;\n  border: 1px solid rgba(226,232,240,0.78);\n  background: rgba(255,255,255,0.7);\n  padding: 0.55rem 0.6rem;\n}\n\n.event-main {\n  min-width: 0;\n}\n\n.event-title {\n  font-size: 0.82rem;\n  font-weight: 700;\n  color: #1e293b;\n}\n\n.event-main small {\n  display: block;\n  margin-top: 0.15rem;\n  color: rgba(100,116,139,0.88);\n  line-height: 1.25;\n}\n\n.event-tags {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 0.25rem;\n}\n\n.empty-state {\n  border-radius: 12px;\n  border: 1px dashed rgba(203,213,225,0.9);\n  background: rgba(248,250,252,0.8);\n  color: rgba(71,85,105,0.85);\n  text-align: center;\n  padding: 0.8rem;\n}\n\n.empty-state.compact {\n  padding: 0.7rem;\n  font-size: 0.8rem;\n}\n\n.command-btn {\n  border-radius: 12px;\n  border: 1px solid rgba(148,163,184,0.22);\n  color: #334155;\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.84)),\n    rgba(255,255,255,0.75);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), 0 2px 8px rgba(15,23,42,0.05);\n}\n\n.command-btn--ghost {\n  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;\n}\n\n.command-btn .pi {\n  margin-right: 0.35rem;\n}\n\n.command-btn--ghost:hover {\n  border-color: rgba(96,165,250,0.28);\n  transform: translateY(-1px);\n  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.12);\n}\n\n:host ::ng-deep .policy-table.p-datatable .p-datatable-thead > tr > th {\n  background: rgba(248,250,252,0.88);\n  border-color: rgba(226,232,240,0.9);\n  color: #334155;\n  font-size: 0.73rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  font-weight: 700;\n  padding: 0.55rem 0.5rem;\n}\n\n:host ::ng-deep .policy-table.p-datatable .p-datatable-tbody > tr > td {\n  background: rgba(255,255,255,0.68);\n  border-color: rgba(226,232,240,0.72);\n  padding: 0.55rem 0.5rem;\n  color: #334155;\n  font-size: 0.82rem;\n}\n\n:host ::ng-deep .policy-table .p-chip {\n  background: rgba(239,246,255,0.95);\n  color: #1e3a8a;\n  border: 1px solid rgba(147,197,253,0.5);\n  font-size: 0.72rem;\n}\n\n:host ::ng-deep .panel-card .p-tag,\n:host ::ng-deep .sla-pill .p-tag {\n  font-size: 0.69rem;\n  border-radius: 999px;\n}\n\n:host ::ng-deep .routing-row .p-tag {\n  font-size: 0.63rem;\n  border-radius: 999px;\n}\n\n:host ::ng-deep .control-editor .p-inputtext {\n  width: 100%;\n  background: rgba(255,255,255,0.92);\n  border: 1px solid rgba(203,213,225,0.9);\n  color: #0f172a;\n}\n\n:host ::ng-deep .control-editor .p-checkbox .p-checkbox-box {\n  border-color: rgba(148,163,184,0.55);\n  background: rgba(255,255,255,0.92);\n}\n\n:host ::ng-deep .control-editor .p-checkbox.p-highlight .p-checkbox-box {\n  border-color: rgba(59,130,246,0.65);\n  background: linear-gradient(135deg, rgba(59,130,246,0.86), rgba(99,102,241,0.82));\n}\n\n@media (max-width: 1100px) {\n  .page-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .kpi-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 820px) {\n  .hero-shell {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .hero-actions {\n    justify-content: flex-start;\n  }\n\n  .policy-meta-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .control-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .sla-strip {\n    grid-template-columns: 1fr;\n  }\n\n  .event-row {\n    flex-direction: column;\n  }\n\n  .event-tags {\n    align-items: flex-start;\n    flex-direction: row;\n    flex-wrap: wrap;\n  }\n}\n\n@media (max-width: 640px) {\n  .kpi-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .panel-card {\n    padding: 0.75rem;\n  }\n\n  .hero-title {\n    font-size: 1.2rem;\n  }\n\n  .hero-description {\n    font-size: 0.85rem;\n  }\n\n  .command-btn {\n    width: 100%;\n    justify-content: center;\n  }\n\n  .hero-actions {\n    width: 100%;\n    display: grid;\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DecisionPoliciesSlaPage, { className: "DecisionPoliciesSlaPage", filePath: "src/app/crm/features/opportunities/pages/decision-policies-sla.page.ts", lineNumber: 44 }); })();
