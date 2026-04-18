import { NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { WorkflowExecutionService } from '../services/workflow-execution.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
function WorkflowExecutionViewerPage_section_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 11)(1, "article", 12)(2, "span");
    i0.ɵɵtext(3, "Pending Approvals");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "article", 12)(7, "span");
    i0.ɵɵtext(8, "Running Executions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "article", 12)(12, "span");
    i0.ɵɵtext(13, "Completed Today");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const s_r1 = ctx.ngIf;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(s_r1.pendingApprovals);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(s_r1.runningExecutions);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(s_r1.completedToday);
} }
function WorkflowExecutionViewerPage_section_14_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵtext(1, "No running execution right now.");
    i0.ɵɵelementEnd();
} }
function WorkflowExecutionViewerPage_section_14_div_4_article_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article")(1, "span");
    i0.ɵɵtext(2, "Linked Decision");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const s_r2 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(s_r2.currentDecisionStatus || "Pending");
} }
function WorkflowExecutionViewerPage_section_14_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "article")(2, "span");
    i0.ɵɵtext(3, "Deal");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "article")(7, "span");
    i0.ɵɵtext(8, "Purpose");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "strong");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "article")(12, "span");
    i0.ɵɵtext(13, "Current Step");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "article")(17, "span");
    i0.ɵɵtext(18, "Pending Approver");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "strong");
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(21, WorkflowExecutionViewerPage_section_14_div_4_article_21_Template, 5, 1, "article", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r2 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(s_r2.currentOpportunityName || "Unknown deal");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(s_r2.currentPurpose || "Deal Approval");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("Step ", s_r2.currentStepOrder || 1, " of ", s_r2.currentTotalSteps || 1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(s_r2.currentPendingApproverName || s_r2.currentPendingApproverRole || "Unassigned");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", s_r2.currentDecisionRequestId);
} }
function WorkflowExecutionViewerPage_section_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 13)(1, "h2");
    i0.ɵɵtext(2, "Current Execution");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, WorkflowExecutionViewerPage_section_14_div_3_Template, 2, 0, "div", 9)(4, WorkflowExecutionViewerPage_section_14_div_4_Template, 22, 6, "div", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const s_r2 = ctx.ngIf;
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !s_r2.currentExecutionId);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", s_r2.currentExecutionId);
} }
function WorkflowExecutionViewerPage_section_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 13)(1, "h2");
    i0.ɵɵtext(2, "Focused Execution");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 16)(4, "article")(5, "span");
    i0.ɵɵtext(6, "Deal");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "article")(10, "span");
    i0.ɵɵtext(11, "Workflow");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "strong");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "article")(15, "span");
    i0.ɵɵtext(16, "Decision Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "article")(20, "span");
    i0.ɵɵtext(21, "Current Step");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "strong");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const selected_r3 = ctx.ngIf;
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(selected_r3.opportunityName);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", selected_r3.workflowName, " v", selected_r3.workflowVersion);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(selected_r3.decisionStatus || "Pending");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("Step ", selected_r3.currentStepOrder, " of ", selected_r3.totalSteps);
} }
function WorkflowExecutionViewerPage_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵtext(1, "No execution history yet.");
    i0.ɵɵelementEnd();
} }
function WorkflowExecutionViewerPage_div_20_article_1_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Pending: ", item_r4.pendingApproverName || item_r4.pendingApproverRole, " ");
} }
function WorkflowExecutionViewerPage_div_20_article_1_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Decision: ", item_r4.decisionStatus || "Pending", " ");
} }
function WorkflowExecutionViewerPage_div_20_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 20)(1, "div", 21)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 22)(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, WorkflowExecutionViewerPage_div_20_article_1_span_13_Template, 2, 1, "span", 17)(14, WorkflowExecutionViewerPage_div_20_article_1_span_14_Template, 2, 1, "span", 17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "small");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("selected", ctx_r4.isSelected(item_r4));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r4.opportunityName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r4.startedAtUtc);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", item_r4.workflowName, " v", item_r4.workflowVersion);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r4.purpose);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("Step ", item_r4.currentStepOrder, " / ", item_r4.totalSteps);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r4.pendingApproverName || item_r4.pendingApproverRole);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r4.decisionRequestId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r4.summary);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("By ", item_r4.triggeredBy, " \u00B7 ", item_r4.status);
} }
function WorkflowExecutionViewerPage_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtemplate(1, WorkflowExecutionViewerPage_div_20_article_1_Template, 19, 14, "article", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r4.history());
} }
export class WorkflowExecutionViewerPage {
    service = inject(WorkflowExecutionService);
    crmEvents = inject(CrmEventsService);
    destroyRef = inject(DestroyRef);
    route = inject(ActivatedRoute);
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    status = signal(null, ...(ngDevMode ? [{ debugName: "status" }] : []));
    history = signal([], ...(ngDevMode ? [{ debugName: "history" }] : []));
    selectedExecutionId = signal(null, ...(ngDevMode ? [{ debugName: "selectedExecutionId" }] : []));
    selectedDecisionId = signal(null, ...(ngDevMode ? [{ debugName: "selectedDecisionId" }] : []));
    selectedDealId = signal(null, ...(ngDevMode ? [{ debugName: "selectedDealId" }] : []));
    selectedHistoryItem = computed(() => {
        const executionId = this.selectedExecutionId();
        if (!executionId) {
            return null;
        }
        return this.history().find((item) => item.executionId === executionId) ?? null;
    }, ...(ngDevMode ? [{ debugName: "selectedHistoryItem" }] : []));
    constructor() {
        this.route.queryParamMap
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((params) => {
            this.selectedExecutionId.set(params.get('executionId'));
            this.selectedDecisionId.set(params.get('decisionId'));
            this.selectedDealId.set(params.get('dealId'));
        });
        this.crmEvents.connect();
        this.crmEvents.events$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((event) => {
            if (event.eventType.includes('decision') || event.eventType.includes('approval')) {
                this.refresh();
            }
        });
        this.refresh();
    }
    refresh() {
        this.loading.set(true);
        this.service.getDealApprovalStatus().subscribe({
            next: (status) => {
                this.status.set(status);
                this.service.getDealApprovalHistory(40).subscribe({
                    next: (history) => {
                        this.history.set(history);
                        this.loading.set(false);
                    },
                    error: () => {
                        this.history.set([]);
                        this.loading.set(false);
                    }
                });
            },
            error: () => {
                this.loading.set(false);
                this.status.set(null);
            }
        });
    }
    isSelected(item) {
        return item.executionId === this.selectedExecutionId();
    }
    static ɵfac = function WorkflowExecutionViewerPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WorkflowExecutionViewerPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WorkflowExecutionViewerPage, selectors: [["app-workflow-execution-viewer-page"]], decls: 21, vars: 6, consts: [[1, "workflow-viewer", "page-container"], [1, "viewer-header"], [1, "hero-title"], [1, "header-actions"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", 3, "click", "disabled"], ["pButton", "", "type", "button", "routerLink", "/app/workflows/designer", 1, "btn", "btn-secondary"], ["class", "kpis", 4, "ngIf"], ["class", "current-card", 4, "ngIf"], [1, "history-card"], ["class", "empty", 4, "ngIf"], ["class", "history-list", 4, "ngIf"], [1, "kpis"], [1, "kpi"], [1, "current-card"], ["class", "current-grid", 4, "ngIf"], [1, "empty"], [1, "current-grid"], [4, "ngIf"], [1, "history-list"], ["class", "history-item", 3, "selected", 4, "ngFor", "ngForOf"], [1, "history-item"], [1, "top"], [1, "meta"]], template: function WorkflowExecutionViewerPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-breadcrumbs");
            i0.ɵɵelementStart(2, "header", 1)(3, "div")(4, "h1", 2);
            i0.ɵɵtext(5, "Workflow Execution Viewer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7, "Real-time status and execution history for Deal Approval workflow.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 3)(9, "button", 4);
            i0.ɵɵlistener("click", function WorkflowExecutionViewerPage_Template_button_click_9_listener() { return ctx.refresh(); });
            i0.ɵɵtext(10, "Refresh");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "button", 5);
            i0.ɵɵtext(12, "Open Designer");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(13, WorkflowExecutionViewerPage_section_13_Template, 16, 3, "section", 6)(14, WorkflowExecutionViewerPage_section_14_Template, 5, 2, "section", 7)(15, WorkflowExecutionViewerPage_section_15_Template, 24, 6, "section", 7);
            i0.ɵɵelementStart(16, "section", 8)(17, "h2");
            i0.ɵɵtext(18, "History Log");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(19, WorkflowExecutionViewerPage_div_19_Template, 2, 0, "div", 9)(20, WorkflowExecutionViewerPage_div_20_Template, 2, 1, "div", 10);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.status());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.status());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedHistoryItem());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", !ctx.history().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.history().length);
        } }, dependencies: [NgIf, NgFor, RouterLink, ButtonModule, i1.ButtonDirective, BreadcrumbsComponent], styles: [".workflow-viewer[_ngcontent-%COMP%] {\n  padding: 1rem;\n}\n\n.viewer-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n\n.kpis[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n}\n\n.kpi[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 10px;\n  padding: 0.75rem;\n  background: rgba(255, 255, 255, 0.72);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.07);\n  display: flex;\n  justify-content: space-between;\n}\n\n.history-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 12px;\n  padding: 0.75rem;\n  background: rgba(255, 255, 255, 0.72);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);\n}\n\n.current-card[_ngcontent-%COMP%] {\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 12px;\n  padding: 0.75rem;\n  margin-bottom: 1rem;\n  background: rgba(255, 255, 255, 0.72);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);\n}\n\n.current-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.75rem;\n}\n\n.current-grid[_ngcontent-%COMP%]   article[_ngcontent-%COMP%], \n.meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.current-grid[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n.meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: rgba(71, 85, 105, 0.95);\n  font-size: 0.85rem;\n}\n\n.history-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.history-item[_ngcontent-%COMP%] {\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  border-radius: 10px;\n  padding: 0.6rem;\n  background: rgba(255, 255, 255, 0.92);\n}\n\n.history-item.selected[_ngcontent-%COMP%] {\n  border-color: rgba(14, 165, 233, 0.55);\n  box-shadow: 0 0 0 1px rgba(14, 165, 233, 0.2);\n}\n\n.top[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n}\n\n.meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin: 0.4rem 0;\n}\n\n@media (max-width: 900px) {\n  .kpis[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .current-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkflowExecutionViewerPage, [{
        type: Component,
        args: [{ selector: 'app-workflow-execution-viewer-page', standalone: true, imports: [NgIf, NgFor, RouterLink, ButtonModule, BreadcrumbsComponent], template: "<div class=\"workflow-viewer page-container\">\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <header class=\"viewer-header\">\n    <div>\n      <h1 class=\"hero-title\">Workflow Execution Viewer</h1>\n      <p>Real-time status and execution history for Deal Approval workflow.</p>\n    </div>\n    <div class=\"header-actions\">\n      <button pButton type=\"button\" class=\"btn btn-ghost\" (click)=\"refresh()\" [disabled]=\"loading()\">Refresh</button>\n      <button pButton type=\"button\" class=\"btn btn-secondary\" routerLink=\"/app/workflows/designer\">Open Designer</button>\n    </div>\n  </header>\n\n  <section class=\"kpis\" *ngIf=\"status() as s\">\n    <article class=\"kpi\"><span>Pending Approvals</span><strong>{{ s.pendingApprovals }}</strong></article>\n    <article class=\"kpi\"><span>Running Executions</span><strong>{{ s.runningExecutions }}</strong></article>\n    <article class=\"kpi\"><span>Completed Today</span><strong>{{ s.completedToday }}</strong></article>\n  </section>\n\n  <section class=\"current-card\" *ngIf=\"status() as s\">\n    <h2>Current Execution</h2>\n    <div class=\"empty\" *ngIf=\"!s.currentExecutionId\">No running execution right now.</div>\n    <div class=\"current-grid\" *ngIf=\"s.currentExecutionId\">\n      <article>\n        <span>Deal</span>\n        <strong>{{ s.currentOpportunityName || 'Unknown deal' }}</strong>\n      </article>\n      <article>\n        <span>Purpose</span>\n        <strong>{{ s.currentPurpose || 'Deal Approval' }}</strong>\n      </article>\n      <article>\n        <span>Current Step</span>\n        <strong>Step {{ s.currentStepOrder || 1 }} of {{ s.currentTotalSteps || 1 }}</strong>\n      </article>\n      <article>\n        <span>Pending Approver</span>\n        <strong>{{ s.currentPendingApproverName || s.currentPendingApproverRole || 'Unassigned' }}</strong>\n      </article>\n      <article *ngIf=\"s.currentDecisionRequestId\">\n        <span>Linked Decision</span>\n        <strong>{{ s.currentDecisionStatus || 'Pending' }}</strong>\n      </article>\n    </div>\n  </section>\n\n  <section class=\"current-card\" *ngIf=\"selectedHistoryItem() as selected\">\n    <h2>Focused Execution</h2>\n    <div class=\"current-grid\">\n      <article>\n        <span>Deal</span>\n        <strong>{{ selected.opportunityName }}</strong>\n      </article>\n      <article>\n        <span>Workflow</span>\n        <strong>{{ selected.workflowName }} v{{ selected.workflowVersion }}</strong>\n      </article>\n      <article>\n        <span>Decision Status</span>\n        <strong>{{ selected.decisionStatus || 'Pending' }}</strong>\n      </article>\n      <article>\n        <span>Current Step</span>\n        <strong>Step {{ selected.currentStepOrder }} of {{ selected.totalSteps }}</strong>\n      </article>\n    </div>\n  </section>\n\n  <section class=\"history-card\">\n    <h2>History Log</h2>\n    <div class=\"empty\" *ngIf=\"!history().length\">No execution history yet.</div>\n    <div class=\"history-list\" *ngIf=\"history().length\">\n      <article class=\"history-item\" [class.selected]=\"isSelected(item)\" *ngFor=\"let item of history()\">\n        <div class=\"top\">\n          <strong>{{ item.opportunityName }}</strong>\n          <span>{{ item.startedAtUtc }}</span>\n        </div>\n        <div class=\"meta\">\n          <span>{{ item.workflowName }} v{{ item.workflowVersion }}</span>\n          <span>{{ item.purpose }}</span>\n          <span>Step {{ item.currentStepOrder }} / {{ item.totalSteps }}</span>\n          <span *ngIf=\"item.pendingApproverName || item.pendingApproverRole\">\n            Pending: {{ item.pendingApproverName || item.pendingApproverRole }}\n          </span>\n          <span *ngIf=\"item.decisionRequestId\">\n            Decision: {{ item.decisionStatus || 'Pending' }}\n          </span>\n        </div>\n        <div>{{ item.summary }}</div>\n        <small>By {{ item.triggeredBy }} \u00B7 {{ item.status }}</small>\n      </article>\n    </div>\n  </section>\n</div>\n", styles: [".workflow-viewer {\n  padding: 1rem;\n}\n\n.viewer-header {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n\n.kpis {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 0.75rem;\n  margin-bottom: 1rem;\n}\n\n.kpi {\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 10px;\n  padding: 0.75rem;\n  background: rgba(255, 255, 255, 0.72);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.07);\n  display: flex;\n  justify-content: space-between;\n}\n\n.history-card {\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 12px;\n  padding: 0.75rem;\n  background: rgba(255, 255, 255, 0.72);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);\n}\n\n.current-card {\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 12px;\n  padding: 0.75rem;\n  margin-bottom: 1rem;\n  background: rgba(255, 255, 255, 0.72);\n  backdrop-filter: blur(8px);\n  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);\n}\n\n.current-grid {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.75rem;\n}\n\n.current-grid article,\n.meta span {\n  display: flex;\n  flex-direction: column;\n}\n\n.current-grid span,\n.meta span {\n  color: rgba(71, 85, 105, 0.95);\n  font-size: 0.85rem;\n}\n\n.history-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.history-item {\n  border: 1px solid rgba(148, 163, 184, 0.28);\n  border-radius: 10px;\n  padding: 0.6rem;\n  background: rgba(255, 255, 255, 0.92);\n}\n\n.history-item.selected {\n  border-color: rgba(14, 165, 233, 0.55);\n  box-shadow: 0 0 0 1px rgba(14, 165, 233, 0.2);\n}\n\n.top {\n  display: flex;\n  justify-content: space-between;\n}\n\n.meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n  margin: 0.4rem 0;\n}\n\n@media (max-width: 900px) {\n  .kpis {\n    grid-template-columns: 1fr;\n  }\n\n  .current-grid {\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(WorkflowExecutionViewerPage, { className: "WorkflowExecutionViewerPage", filePath: "src/app/crm/features/workflows/pages/workflow-execution-viewer.page.ts", lineNumber: 18 }); })();
