import { NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { ApprovalWorkflowBuilderFacade } from '../services/approval-workflow-builder.facade';
import * as i0 from "@angular/core";
import * as i1 from "primeng/dialog";
import * as i2 from "primeng/api";
import * as i3 from "primeng/inputtext";
import * as i4 from "primeng/table";
import * as i5 from "primeng/tag";
const _c0 = () => ({ "min-width": "100%" });
const _c1 = () => ({ width: "720px", maxWidth: "95vw" });
const _c2 = () => ({ padding: "0" });
const _forTrack0 = ($index, $item) => $item.id;
function WorkflowWorkspacePage_ng_template_133_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Workflow");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Module");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Trigger");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Version");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Steps");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "SLA");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Last Modified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th");
    i0.ɵɵtext(18, "Actions");
    i0.ɵɵelementEnd()();
} }
function WorkflowWorkspacePage_ng_template_134_span_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 88);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("+", row_r2.parallelGroups, " parallel");
} }
function WorkflowWorkspacePage_ng_template_134_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 72)(1, "td")(2, "div", 73)(3, "div", 74);
    i0.ɵɵelement(4, "i", 25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 75)(6, "span", 76);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "span", 77);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵelement(11, "p-tag", 78);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td");
    i0.ɵɵelement(15, "p-tag", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td");
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td")(19, "span", 80);
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, WorkflowWorkspacePage_ng_template_134_span_21_Template, 2, 1, "span", 81);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "td");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "td");
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "td")(27, "div", 82)(28, "button", 83);
    i0.ɵɵlistener("click", function WorkflowWorkspacePage_ng_template_134_Template_button_click_28_listener() { const row_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.editWorkflow(row_r2.id)); });
    i0.ɵɵelement(29, "i", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 84);
    i0.ɵɵelement(31, "i", 85);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "button", 86);
    i0.ɵɵelement(33, "i", 87);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const row_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(row_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r2.processName);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", row_r2.module);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r2.triggerType);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", row_r2.status)("severity", ctx_r2.statusSeverity(row_r2.status));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r2.version);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r2.totalSteps);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r2.parallelGroups > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r2.slaSummary);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.formatDate(row_r2.lastModified));
} }
function WorkflowWorkspacePage_ng_template_135_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td", 89)(2, "div", 90);
    i0.ɵɵelement(3, "i", 25);
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5, "No workflows found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7, "Create your first workflow to automate approval processes.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 60);
    i0.ɵɵlistener("click", function WorkflowWorkspacePage_ng_template_135_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.createWorkflow()); });
    i0.ɵɵelementStart(9, "span", 58);
    i0.ɵɵelement(10, "i", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12, "New Workflow");
    i0.ɵɵelementEnd()()()()();
} }
function WorkflowWorkspacePage_For_142_For_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 98)(1, "span", 102);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const step_r7 = ctx.$implicit;
    const ɵ$index_390_r8 = ctx.$index;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ɵ$index_390_r8 + 1);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", step_r7, " ");
} }
function WorkflowWorkspacePage_For_142_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 101);
    i0.ɵɵelement(1, "i", 33);
    i0.ɵɵelementEnd();
} }
function WorkflowWorkspacePage_For_142_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 91);
    i0.ɵɵlistener("click", function WorkflowWorkspacePage_For_142_Template_div_click_0_listener() { const template_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.selectTemplate(template_r6.id)); });
    i0.ɵɵelementStart(1, "div", 92)(2, "div", 93);
    i0.ɵɵelement(3, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 94);
    i0.ɵɵelement(5, "i");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "h4", 95);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "p", 96);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 97);
    i0.ɵɵrepeaterCreate(12, WorkflowWorkspacePage_For_142_For_13_Template, 4, 2, "span", 98, i0.ɵɵrepeaterTrackByIdentity);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 99);
    i0.ɵɵelement(15, "i", 100);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(17, WorkflowWorkspacePage_For_142_Conditional_17_Template, 2, 0, "div", 101);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const template_r6 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("template-card--selected", ctx_r2.isTemplateSelected(template_r6.id));
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(i0.ɵɵinterpolate1("pi ", template_r6.icon));
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r2.categoryIcon(template_r6.category));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", template_r6.category, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(template_r6.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(template_r6.description);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(template_r6.previewSteps);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate1(" ", template_r6.module, " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r2.isTemplateSelected(template_r6.id) ? 17 : -1);
} }
function WorkflowWorkspacePage_ng_template_143_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 103)(1, "button", 57);
    i0.ɵɵlistener("click", function WorkflowWorkspacePage_ng_template_143_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.startBlank()); });
    i0.ɵɵelementStart(2, "span", 58);
    i0.ɵɵelement(3, "i", 104);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "Start Blank");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 105);
    i0.ɵɵlistener("click", function WorkflowWorkspacePage_ng_template_143_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r9); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.confirmTemplate()); });
    i0.ɵɵelementStart(7, "span", 58);
    i0.ɵɵelement(8, "i", 106);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span");
    i0.ɵɵtext(10, "Use Template");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", !ctx_r2.selectedTemplateId());
} }
const MOCK_WORKFLOWS = [
    {
        id: 'high-discount-approval',
        name: 'High Discount Approval',
        processName: 'Discount Exception Governance',
        module: 'Opportunity',
        triggerType: 'On Submit',
        status: 'Active',
        version: 'v2.3',
        totalSteps: 3,
        parallelGroups: 1,
        slaSummary: '44h',
        isActive: true,
        lastModified: '2025-01-15T10:30:00Z'
    },
    {
        id: 'new-customer-onboarding',
        name: 'New Customer Onboarding',
        processName: 'Customer Activation Review',
        module: 'Customer',
        triggerType: 'On Create',
        status: 'Active',
        version: 'v1.0',
        totalSteps: 2,
        parallelGroups: 0,
        slaSummary: '24h',
        isActive: true,
        lastModified: '2025-01-10T14:22:00Z'
    },
    {
        id: 'contract-renewal-review',
        name: 'Contract Renewal Review',
        processName: 'Renewal Governance',
        module: 'Opportunity',
        triggerType: 'On Stage Change',
        status: 'Draft',
        version: 'v1.1',
        totalSteps: 4,
        parallelGroups: 1,
        slaSummary: '72h',
        isActive: false,
        lastModified: '2025-01-08T09:15:00Z'
    },
    {
        id: 'lead-qualification-gate',
        name: 'Lead Qualification Gate',
        processName: 'Lead Quality Check',
        module: 'Lead',
        triggerType: 'On Submit',
        status: 'Active',
        version: 'v3.0',
        totalSteps: 2,
        parallelGroups: 0,
        slaSummary: '8h',
        isActive: true,
        lastModified: '2025-01-12T16:45:00Z'
    },
    {
        id: 'enterprise-deal-approval',
        name: 'Enterprise Deal Approval',
        processName: 'Strategic Deal Governance',
        module: 'Opportunity',
        triggerType: 'On Submit',
        status: 'Draft',
        version: 'v1.0',
        totalSteps: 5,
        parallelGroups: 2,
        slaSummary: '96h',
        isActive: false,
        lastModified: '2025-01-05T11:08:00Z'
    }
];
export class WorkflowWorkspacePage {
    router = inject(Router);
    facade = inject(ApprovalWorkflowBuilderFacade);
    workflows = signal([], ...(ngDevMode ? [{ debugName: "workflows" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    searchTerm = signal('', ...(ngDevMode ? [{ debugName: "searchTerm" }] : []));
    showTemplatePicker = signal(false, ...(ngDevMode ? [{ debugName: "showTemplatePicker" }] : []));
    templates = signal([], ...(ngDevMode ? [{ debugName: "templates" }] : []));
    selectedTemplateId = signal(null, ...(ngDevMode ? [{ debugName: "selectedTemplateId" }] : []));
    totalCount = computed(() => this.workflows().length, ...(ngDevMode ? [{ debugName: "totalCount" }] : []));
    activeCount = computed(() => this.workflows().filter((w) => w.status === 'Active').length, ...(ngDevMode ? [{ debugName: "activeCount" }] : []));
    draftCount = computed(() => this.workflows().filter((w) => w.status === 'Draft').length, ...(ngDevMode ? [{ debugName: "draftCount" }] : []));
    totalSteps = computed(() => this.workflows().reduce((sum, w) => sum + w.totalSteps, 0), ...(ngDevMode ? [{ debugName: "totalSteps" }] : []));
    filteredWorkflows = computed(() => {
        const term = this.searchTerm().toLowerCase();
        if (!term)
            return this.workflows();
        return this.workflows().filter((w) => w.name.toLowerCase().includes(term) ||
            w.module.toLowerCase().includes(term) ||
            w.processName.toLowerCase().includes(term));
    }, ...(ngDevMode ? [{ debugName: "filteredWorkflows" }] : []));
    ngOnInit() {
        this.loadWorkflows();
    }
    createWorkflow() {
        this.templates.set(this.facade.getTemplateCatalog());
        this.selectedTemplateId.set(null);
        this.showTemplatePicker.set(true);
    }
    selectTemplate(templateId) {
        this.selectedTemplateId.set(templateId);
    }
    isTemplateSelected(templateId) {
        return this.selectedTemplateId() === templateId;
    }
    confirmTemplate() {
        const templateId = this.selectedTemplateId();
        if (templateId) {
            this.router.navigate(['/app/workflows/builder'], { queryParams: { template: templateId } });
        }
        else {
            this.router.navigate(['/app/workflows/builder']);
        }
        this.showTemplatePicker.set(false);
    }
    startBlank() {
        this.showTemplatePicker.set(false);
        this.router.navigate(['/app/workflows/builder']);
    }
    categoryIcon(category) {
        switch (category) {
            case 'approval': return 'pi pi-check-square';
            case 'follow-up': return 'pi pi-reply';
            case 'review': return 'pi pi-eye';
            case 'escalation': return 'pi pi-arrow-up';
            default: return 'pi pi-cog';
        }
    }
    editWorkflow(id) {
        this.router.navigate(['/app/workflows/builder', id]);
    }
    viewExecutions() {
        this.router.navigate(['/app/workflows/executions']);
    }
    statusSeverity(status) {
        return status === 'Active' ? 'success' : 'info';
    }
    onSearch(event) {
        this.searchTerm.set(event.target.value);
    }
    formatDate(isoDate) {
        return new Date(isoDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
    loadWorkflows() {
        setTimeout(() => {
            this.workflows.set(MOCK_WORKFLOWS);
            this.loading.set(false);
        }, 300);
    }
    static ɵfac = function WorkflowWorkspacePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || WorkflowWorkspacePage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WorkflowWorkspacePage, selectors: [["app-workflow-workspace-page"]], features: [i0.ɵɵProvidersFeature([ApprovalWorkflowBuilderFacade])], decls: 144, vars: 29, consts: [[1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "page-content"], [1, "hero-section"], [1, "hero-info"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-stats"], [1, "hero-stat"], [1, "stat-value"], [1, "stat-label"], [1, "stat-bar"], [1, "stat-bar-fill"], [1, "stat-bar-fill", "stat-bar-fill--success"], [1, "stat-bar-fill", "stat-bar-fill--prospects"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-share-alt"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend", "card-trend--up"], [1, "pi", "pi-arrow-up"], [1, "card-glow"], [1, "visual-card", "visual-card--success"], [1, "pi", "pi-check-circle"], [1, "visual-card", "visual-card--secondary"], [1, "pi", "pi-clock"], [1, "card-trend"], [1, "pi", "pi-pencil"], [1, "metrics-section"], [1, "metric-card", "metric-card--total"], [1, "metric-icon"], [1, "pi", "pi-database"], [1, "metric-content"], [1, "metric-label"], [1, "metric-value"], [1, "metric-card", "metric-card--customers"], [1, "metric-card", "metric-card--leads"], [1, "metric-card", "metric-card--prospects"], [1, "pi", "pi-sitemap"], [1, "data-section"], [1, "data-card"], [1, "data-header"], [1, "pi", "pi-list"], [1, "data-header__actions"], [1, "search-box"], [1, "pi", "pi-search"], ["type", "text", "pInputText", "", "placeholder", "Search workflows...", 3, "input"], ["type", "button", 1, "action-btn", "action-btn--settings", 3, "click"], [1, "action-btn__icon"], [1, "pi", "pi-history"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click"], [1, "pi", "pi-plus"], ["styleClass", "p-datatable-sm", 3, "value", "loading", "rowHover", "tableStyle"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], ["header", "Choose a Workflow Template", "styleClass", "template-picker-dialog", 3, "visibleChange", "visible", "modal", "closable", "contentStyle"], [1, "template-picker"], [1, "template-picker__intro"], [1, "template-grid"], [1, "template-card", 3, "template-card--selected"], ["pTemplate", "footer"], [1, "table-row"], [1, "workflow-cell"], [1, "workflow-avatar"], [1, "workflow-info"], [1, "workflow-name"], [1, "workflow-process"], ["severity", "info", 3, "value"], [3, "value", "severity"], [1, "step-count"], ["class", "parallel-badge", 4, "ngIf"], [1, "row-actions"], ["type", "button", "title", "Edit", 1, "row-action-btn", "row-action-btn--edit", 3, "click"], ["type", "button", "title", "Clone", 1, "row-action-btn", "row-action-btn--view"], [1, "pi", "pi-copy"], ["type", "button", "title", "Archive", 1, "row-action-btn", "row-action-btn--archive"], [1, "pi", "pi-inbox"], [1, "parallel-badge"], ["colspan", "9", 1, "empty-message"], [1, "empty-state"], [1, "template-card", 3, "click"], [1, "template-card__header"], [1, "template-card__icon"], [1, "template-card__category"], [1, "template-card__name"], [1, "template-card__description"], [1, "template-card__steps"], [1, "template-step"], [1, "template-card__module"], [1, "pi", "pi-box"], [1, "template-card__check"], [1, "template-step__number"], [1, "template-picker__actions"], [1, "pi", "pi-file"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "pi", "pi-check"]], template: function WorkflowWorkspacePage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵelement(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "div", 5);
            i0.ɵɵelement(6, "app-breadcrumbs");
            i0.ɵɵelementStart(7, "section", 6)(8, "div", 7)(9, "div", 8);
            i0.ɵɵelement(10, "span", 9);
            i0.ɵɵelementStart(11, "span");
            i0.ɵɵtext(12, "Automation Admin");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "h1", 10)(14, "span", 11);
            i0.ɵɵtext(15, "Workflow");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "span", 12);
            i0.ɵɵtext(17, "Workspace");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "p", 13);
            i0.ɵɵtext(19, " Manage approval workflows, track execution status, and configure automation rules for your CRM processes. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 14)(21, "div", 15)(22, "span", 16);
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "span", 17);
            i0.ɵɵtext(25, "Workflows");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "div", 18);
            i0.ɵɵelement(27, "div", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div", 15)(29, "span", 16);
            i0.ɵɵtext(30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span", 17);
            i0.ɵɵtext(32, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "div", 18);
            i0.ɵɵelement(34, "div", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "div", 15)(36, "span", 16);
            i0.ɵɵtext(37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "span", 17);
            i0.ɵɵtext(39, "Drafts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 18);
            i0.ɵɵelement(41, "div", 21);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(42, "div", 22)(43, "div", 23)(44, "div", 24);
            i0.ɵɵelement(45, "i", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 26)(47, "span", 27);
            i0.ɵɵtext(48, "Total Steps");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "strong", 28);
            i0.ɵɵtext(50);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "span", 29);
            i0.ɵɵelement(52, "i", 30);
            i0.ɵɵtext(53, " Across all workflows");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(54, "div", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(55, "div", 32)(56, "div", 24);
            i0.ɵɵelement(57, "i", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "div", 26)(59, "span", 27);
            i0.ɵɵtext(60, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "strong", 28);
            i0.ɵɵtext(62);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "span", 29);
            i0.ɵɵelement(64, "i", 30);
            i0.ɵɵtext(65, " Running workflows");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(66, "div", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "div", 34)(68, "div", 24);
            i0.ɵɵelement(69, "i", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "div", 26)(71, "span", 27);
            i0.ɵɵtext(72, "Drafts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "strong", 28);
            i0.ɵɵtext(74);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "span", 36);
            i0.ɵɵelement(76, "i", 37);
            i0.ɵɵtext(77, " Pending publish");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(78, "div", 31);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(79, "section", 38)(80, "div", 39)(81, "div", 40);
            i0.ɵɵelement(82, "i", 41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "div", 42)(84, "span", 43);
            i0.ɵɵtext(85, "Total Workflows");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "strong", 44);
            i0.ɵɵtext(87);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(88, "div", 45)(89, "div", 40);
            i0.ɵɵelement(90, "i", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "div", 42)(92, "span", 43);
            i0.ɵɵtext(93, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "strong", 44);
            i0.ɵɵtext(95);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(96, "div", 46)(97, "div", 40);
            i0.ɵɵelement(98, "i", 37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(99, "div", 42)(100, "span", 43);
            i0.ɵɵtext(101, "Draft");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(102, "strong", 44);
            i0.ɵɵtext(103);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(104, "div", 47)(105, "div", 40);
            i0.ɵɵelement(106, "i", 48);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(107, "div", 42)(108, "span", 43);
            i0.ɵɵtext(109, "Total Steps");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(110, "strong", 44);
            i0.ɵɵtext(111);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(112, "section", 49)(113, "div", 50)(114, "div", 51)(115, "h2");
            i0.ɵɵelement(116, "i", 52);
            i0.ɵɵtext(117, " Workflow Registry");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(118, "div", 53)(119, "div", 54);
            i0.ɵɵelement(120, "i", 55);
            i0.ɵɵelementStart(121, "input", 56);
            i0.ɵɵlistener("input", function WorkflowWorkspacePage_Template_input_input_121_listener($event) { return ctx.onSearch($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(122, "button", 57);
            i0.ɵɵlistener("click", function WorkflowWorkspacePage_Template_button_click_122_listener() { return ctx.viewExecutions(); });
            i0.ɵɵelementStart(123, "span", 58);
            i0.ɵɵelement(124, "i", 59);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "span");
            i0.ɵɵtext(126, "Executions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(127, "button", 60);
            i0.ɵɵlistener("click", function WorkflowWorkspacePage_Template_button_click_127_listener() { return ctx.createWorkflow(); });
            i0.ɵɵelementStart(128, "span", 58);
            i0.ɵɵelement(129, "i", 61);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(130, "span");
            i0.ɵɵtext(131, "New Workflow");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(132, "p-table", 62);
            i0.ɵɵtemplate(133, WorkflowWorkspacePage_ng_template_133_Template, 19, 0, "ng-template", 63)(134, WorkflowWorkspacePage_ng_template_134_Template, 34, 11, "ng-template", 64)(135, WorkflowWorkspacePage_ng_template_135_Template, 13, 0, "ng-template", 65);
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(136, "p-dialog", 66);
            i0.ɵɵtwoWayListener("visibleChange", function WorkflowWorkspacePage_Template_p_dialog_visibleChange_136_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.showTemplatePicker, $event) || (ctx.showTemplatePicker = $event); return $event; });
            i0.ɵɵelementStart(137, "div", 67)(138, "p", 68);
            i0.ɵɵtext(139, " Start with a pre-configured template or build from scratch. Templates include conditions, approval steps, and outcomes tailored to common CRM scenarios. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(140, "div", 69);
            i0.ɵɵrepeaterCreate(141, WorkflowWorkspacePage_For_142_Template, 18, 12, "div", 70, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(143, WorkflowWorkspacePage_ng_template_143_Template, 11, 1, "ng-template", 71);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(23);
            i0.ɵɵtextInterpolate(ctx.totalCount());
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", 100, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.activeCount());
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.totalCount() ? ctx.activeCount() / ctx.totalCount() * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.draftCount());
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.totalCount() ? ctx.draftCount() / ctx.totalCount() * 100 : 0, "%");
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.totalSteps());
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.activeCount());
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.draftCount());
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(ctx.totalCount());
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.activeCount());
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.draftCount());
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.totalSteps());
            i0.ɵɵadvance(21);
            i0.ɵɵproperty("value", ctx.filteredWorkflows())("loading", ctx.loading())("rowHover", true)("tableStyle", i0.ɵɵpureFunction0(26, _c0));
            i0.ɵɵadvance(4);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(27, _c1));
            i0.ɵɵtwoWayProperty("visible", ctx.showTemplatePicker);
            i0.ɵɵproperty("modal", true)("closable", true)("contentStyle", i0.ɵɵpureFunction0(28, _c2));
            i0.ɵɵadvance(5);
            i0.ɵɵrepeater(ctx.templates());
        } }, dependencies: [NgIf,
            DialogModule, i1.Dialog, i2.PrimeTemplate, InputTextModule, i3.InputText, TableModule, i4.Table, TagModule, i5.Tag, TooltipModule,
            BreadcrumbsComponent], styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   CONTAINER[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   BACKGROUND\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n.page-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n\n  &.orb-1 { width: 600px; height: 600px; background: $primary-gradient; top: -200px; right: -100px; }\n  &.orb-2 { width: 400px; height: 400px; background: $cyan-gradient; bottom: 10%; left: -100px; animation-delay: -7s; }\n  &.orb-3 { width: 300px; height: 300px; background: $purple-gradient; top: 40%; right: 20%; animation-delay: -14s; }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   HERO[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n  margin-bottom: $space-2;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: _ngcontent-%COMP%_pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-1;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: _ngcontent-%COMP%_gradient-shift 4s ease-in-out infinite;\n  }\n\n  .title-light {\n    -webkit-text-fill-color: $gray-700;\n    margin-left: $space-2;\n  }\n}\n\n.hero-description[_ngcontent-%COMP%] {\n  font-size: $font-size-base;\n  color: $gray-500;\n  font-weight: 400;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   HERO[_ngcontent-%COMP%]   STATS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-4;\n  flex-wrap: wrap;\n  margin-top: $space-2;\n}\n\n.hero-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 80px;\n\n  .stat-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .stat-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .stat-bar {\n    width: 100%;\n    height: 4px;\n    background: $gray-200;\n    border-radius: $radius-full;\n    overflow: hidden;\n\n    .stat-bar-fill {\n      height: 100%;\n      background: $primary-gradient;\n      border-radius: $radius-full;\n      transition: width 1s ease-out;\n\n      &--success { background: $success-gradient; }\n      &--prospects { background: $purple-gradient; }\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   VISUAL[_ngcontent-%COMP%]   CARDS[_ngcontent-%COMP%]   (HERO SIDEBAR)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: _ngcontent-%COMP%_slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  .card-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n  }\n\n  &--primary .card-icon { background: $primary-gradient; color: white; }\n  &--secondary .card-icon { background: $cyan-gradient; color: white; }\n  &--success .card-icon { background: $success-gradient; color: white; }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    &--up { color: $success; }\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   METRIC[_ngcontent-%COMP%]   CARDS[_ngcontent-%COMP%]   (KPI ROW)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.metrics-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1200px) { grid-template-columns: repeat(2, 1fr); }\n  @media (max-width: 600px) { grid-template-columns: 1fr; }\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all 250ms;\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 4 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-lg;\n    color: white;\n    flex-shrink: 0;\n    transition: transform $transition-spring;\n  }\n\n  &--total .metric-icon { background: $primary-gradient; }\n  &--customers .metric-icon { background: $success-gradient; }\n  &--leads .metric-icon { background: $cyan-gradient; }\n  &--prospects .metric-icon { background: $purple-gradient; }\n\n  .metric-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DATA[_ngcontent-%COMP%]   TABLE[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.data-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out 0.4s both;\n}\n\n.data-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  h2 {\n    margin: 0;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n\n    i { color: $primary; }\n  }\n}\n\n.data-header__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.search-box[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n\n  > i {\n    position: absolute;\n    left: 0.75rem;\n    color: $gray-400;\n    font-size: $font-size-sm;\n    z-index: 1;\n  }\n\n  input {\n    padding-left: 2.25rem;\n    border-radius: $radius-md;\n    border: 1px solid rgba(0, 0, 0, 0.1);\n    height: 36px;\n    width: 220px;\n    font-size: $font-size-sm;\n    background: rgba(255, 255, 255, 0.8);\n\n    &:focus {\n      border-color: $primary;\n      outline: none;\n      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n    }\n  }\n}\n\n//   Table   header\n[_nghost-%COMP%]     .p-datatable-thead > tr > th {\n  background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n  border: none;\n  border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n  padding: $space-3 $space-4;\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #3b82f6;\n}\n\n//   Table   body\n[_nghost-%COMP%]     .p-datatable-tbody > tr > td {\n  vertical-align: middle;\n  padding: $space-3 $space-2;\n}\n\n.table-row[_ngcontent-%COMP%] {\n  transition: background 150ms;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n  &:last-child { border-bottom: none; }\n\n  &:hover {\n    background: rgba($primary, 0.03);\n\n    .workflow-avatar {\n      transform: scale(1.05);\n      box-shadow: 0 4px 12px rgba($primary, 0.2);\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   WORKFLOW[_ngcontent-%COMP%]   TABLE[_ngcontent-%COMP%]   CELLS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.workflow-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.workflow-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  font-size: $font-size-sm;\n  border-radius: 50%;\n  flex-shrink: 0;\n  transition: all $transition-spring;\n}\n\n.workflow-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.workflow-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: $font-size-base;\n  color: $gray-800;\n}\n\n.workflow-process[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.step-count[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n\n.parallel-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  margin-left: 0.35rem;\n  font-size: 0.75rem;\n  color: $primary;\n  background: rgba(102, 126, 234, 0.1);\n  padding: 1px 6px;\n  border-radius: $radius-xs;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   EMPTY[_ngcontent-%COMP%]   STATE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 3rem 1rem;\n  text-align: center;\n\n  > i {\n    font-size: 2.5rem;\n    color: $gray-300;\n  }\n\n  strong {\n    font-size: 1.1rem;\n    color: $gray-700;\n  }\n\n  span {\n    color: $gray-500;\n    font-size: 0.9rem;\n  }\n}\n\n.empty-message[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ANIMATIONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes[_ngcontent-%COMP%]   fade-in-up[_ngcontent-%COMP%] {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes _ngcontent-%COMP%_slide-in-right {\n  from { opacity: 0; transform: translateX(20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n@keyframes _ngcontent-%COMP%_gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes _ngcontent-%COMP%_pulse-glow {\n  0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }\n  50% { opacity: 0.8; box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(50px, -30px) scale(1.1); }\n  50% { transform: translate(100px, 20px) scale(0.9); }\n  75% { transform: translate(30px, 50px) scale(1.05); }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   TEMPLATE[_ngcontent-%COMP%]   PICKER[_ngcontent-%COMP%]   DIALOG\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.template-picker[_ngcontent-%COMP%] {\n  padding: $space-4 $space-5;\n\n  &__intro {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    margin: 0 0 $space-4;\n    line-height: 1.6;\n  }\n\n  &__actions {\n    display: flex;\n    justify-content: flex-end;\n    gap: $space-3;\n  }\n}\n\n.template-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: $space-3;\n}\n\n.template-card[_ngcontent-%COMP%] {\n  position: relative;\n  padding: $space-4;\n  background: $glass-bg;\n  border: 2px solid $glass-border;\n  border-radius: $radius-lg;\n  cursor: pointer;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  overflow: hidden;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n    border-color: rgba(102, 126, 234, 0.3);\n  }\n\n  &--selected {\n    border-color: #667eea;\n    background: rgba(102, 126, 234, 0.06);\n    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15), $glass-shadow;\n\n    &:hover {\n      border-color: #667eea;\n    }\n  }\n\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: $space-3;\n  }\n\n  &__icon {\n    width: 40px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $primary-gradient;\n    color: white;\n    border-radius: $radius-md;\n    font-size: 1.1rem;\n  }\n\n  &__category {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n\n    i { font-size: 0.7rem; }\n  }\n\n  &__name {\n    font-size: $font-size-md;\n    font-weight: 700;\n    color: $gray-800;\n    margin: 0 0 $space-2;\n    line-height: 1.3;\n  }\n\n  &__description {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    line-height: 1.5;\n    margin: 0 0 $space-3;\n  }\n\n  &__steps {\n    display: flex;\n    flex-direction: column;\n    gap: $space-1;\n    margin-bottom: $space-3;\n  }\n\n  &__module {\n    font-size: $font-size-xs;\n    color: $gray-400;\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n\n    i { font-size: 0.7rem; }\n  }\n\n  &__check {\n    position: absolute;\n    top: $space-3;\n    right: $space-3;\n    color: #667eea;\n    font-size: 1.25rem;\n    animation: fade-in-up 0.2s ease-out;\n  }\n}\n\n.template-step[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-xs;\n  color: $gray-600;\n\n  &__number {\n    width: 20px;\n    height: 20px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(102, 126, 234, 0.12);\n    color: #667eea;\n    font-size: 0.65rem;\n    font-weight: 700;\n    border-radius: 50%;\n    flex-shrink: 0;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkflowWorkspacePage, [{
        type: Component,
        args: [{ selector: 'app-workflow-workspace-page', standalone: true, imports: [
                    NgIf,
                    DialogModule,
                    InputTextModule,
                    TableModule,
                    TagModule,
                    TooltipModule,
                    BreadcrumbsComponent
                ], providers: [ApprovalWorkflowBuilderFacade], template: "<div class=\"page-container\">\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <div class=\"page-content\">\n    <app-breadcrumbs></app-breadcrumbs>\n\n    <section class=\"hero-section\">\n      <div class=\"hero-info\">\n        <div class=\"hero-badge\">\n          <span class=\"badge-dot\"></span>\n          <span>Automation Admin</span>\n        </div>\n        <h1 class=\"hero-title\">\n          <span class=\"title-gradient\">Workflow</span>\n          <span class=\"title-light\">Workspace</span>\n        </h1>\n        <p class=\"hero-description\">\n          Manage approval workflows, track execution status, and configure automation rules for your CRM processes.\n        </p>\n        <div class=\"hero-stats\">\n          <div class=\"hero-stat\">\n            <span class=\"stat-value\">{{ totalCount() }}</span>\n            <span class=\"stat-label\">Workflows</span>\n            <div class=\"stat-bar\"><div class=\"stat-bar-fill\" [style.width.%]=\"100\"></div></div>\n          </div>\n          <div class=\"hero-stat\">\n            <span class=\"stat-value\">{{ activeCount() }}</span>\n            <span class=\"stat-label\">Active</span>\n            <div class=\"stat-bar\"><div class=\"stat-bar-fill stat-bar-fill--success\" [style.width.%]=\"totalCount() ? (activeCount() / totalCount()) * 100 : 0\"></div></div>\n          </div>\n          <div class=\"hero-stat\">\n            <span class=\"stat-value\">{{ draftCount() }}</span>\n            <span class=\"stat-label\">Drafts</span>\n            <div class=\"stat-bar\"><div class=\"stat-bar-fill stat-bar-fill--prospects\" [style.width.%]=\"totalCount() ? (draftCount() / totalCount()) * 100 : 0\"></div></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"hero-visual\">\n        <div class=\"visual-card visual-card--primary\">\n          <div class=\"card-icon\"><i class=\"pi pi-share-alt\"></i></div>\n          <div class=\"card-content\">\n            <span class=\"card-label\">Total Steps</span>\n            <strong class=\"card-value\">{{ totalSteps() }}</strong>\n            <span class=\"card-trend card-trend--up\"><i class=\"pi pi-arrow-up\"></i> Across all workflows</span>\n          </div>\n          <div class=\"card-glow\"></div>\n        </div>\n        <div class=\"visual-card visual-card--success\">\n          <div class=\"card-icon\"><i class=\"pi pi-check-circle\"></i></div>\n          <div class=\"card-content\">\n            <span class=\"card-label\">Active</span>\n            <strong class=\"card-value\">{{ activeCount() }}</strong>\n            <span class=\"card-trend card-trend--up\"><i class=\"pi pi-arrow-up\"></i> Running workflows</span>\n          </div>\n          <div class=\"card-glow\"></div>\n        </div>\n        <div class=\"visual-card visual-card--secondary\">\n          <div class=\"card-icon\"><i class=\"pi pi-clock\"></i></div>\n          <div class=\"card-content\">\n            <span class=\"card-label\">Drafts</span>\n            <strong class=\"card-value\">{{ draftCount() }}</strong>\n            <span class=\"card-trend\"><i class=\"pi pi-pencil\"></i> Pending publish</span>\n          </div>\n          <div class=\"card-glow\"></div>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"metrics-section\">\n      <div class=\"metric-card metric-card--total\">\n        <div class=\"metric-icon\"><i class=\"pi pi-database\"></i></div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">Total Workflows</span>\n          <strong class=\"metric-value\">{{ totalCount() }}</strong>\n        </div>\n      </div>\n      <div class=\"metric-card metric-card--customers\">\n        <div class=\"metric-icon\"><i class=\"pi pi-check-circle\"></i></div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">Active</span>\n          <strong class=\"metric-value\">{{ activeCount() }}</strong>\n        </div>\n      </div>\n      <div class=\"metric-card metric-card--leads\">\n        <div class=\"metric-icon\"><i class=\"pi pi-pencil\"></i></div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">Draft</span>\n          <strong class=\"metric-value\">{{ draftCount() }}</strong>\n        </div>\n      </div>\n      <div class=\"metric-card metric-card--prospects\">\n        <div class=\"metric-icon\"><i class=\"pi pi-sitemap\"></i></div>\n        <div class=\"metric-content\">\n          <span class=\"metric-label\">Total Steps</span>\n          <strong class=\"metric-value\">{{ totalSteps() }}</strong>\n        </div>\n      </div>\n    </section>\n\n    <section class=\"data-section\">\n      <div class=\"data-card\">\n        <div class=\"data-header\">\n          <h2><i class=\"pi pi-list\"></i> Workflow Registry</h2>\n          <div class=\"data-header__actions\">\n            <div class=\"search-box\">\n              <i class=\"pi pi-search\"></i>\n              <input type=\"text\" pInputText placeholder=\"Search workflows...\" (input)=\"onSearch($event)\" />\n            </div>\n            <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"viewExecutions()\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-history\"></i></span>\n              <span>Executions</span>\n            </button>\n            <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"createWorkflow()\">\n              <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n              <span>New Workflow</span>\n            </button>\n          </div>\n        </div>\n\n        <p-table\n          [value]=\"filteredWorkflows()\"\n          [loading]=\"loading()\"\n          [rowHover]=\"true\"\n          styleClass=\"p-datatable-sm\"\n          [tableStyle]=\"{ 'min-width': '100%' }\"\n        >\n          <ng-template pTemplate=\"header\">\n            <tr>\n              <th>Workflow</th>\n              <th>Module</th>\n              <th>Trigger</th>\n              <th>Status</th>\n              <th>Version</th>\n              <th>Steps</th>\n              <th>SLA</th>\n              <th>Last Modified</th>\n              <th>Actions</th>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"body\" let-row>\n            <tr class=\"table-row\">\n              <td>\n                <div class=\"workflow-cell\">\n                  <div class=\"workflow-avatar\">\n                    <i class=\"pi pi-share-alt\"></i>\n                  </div>\n                  <div class=\"workflow-info\">\n                    <span class=\"workflow-name\">{{ row.name }}</span>\n                    <span class=\"workflow-process\">{{ row.processName }}</span>\n                  </div>\n                </div>\n              </td>\n              <td><p-tag [value]=\"row.module\" severity=\"info\"></p-tag></td>\n              <td>{{ row.triggerType }}</td>\n              <td><p-tag [value]=\"row.status\" [severity]=\"statusSeverity(row.status)\"></p-tag></td>\n              <td>{{ row.version }}</td>\n              <td>\n                <span class=\"step-count\">{{ row.totalSteps }}</span>\n                <span class=\"parallel-badge\" *ngIf=\"row.parallelGroups > 0\">+{{ row.parallelGroups }} parallel</span>\n              </td>\n              <td>{{ row.slaSummary }}</td>\n              <td>{{ formatDate(row.lastModified) }}</td>\n              <td>\n                <div class=\"row-actions\">\n                  <button type=\"button\" class=\"row-action-btn row-action-btn--edit\" title=\"Edit\" (click)=\"editWorkflow(row.id)\">\n                    <i class=\"pi pi-pencil\"></i>\n                  </button>\n                  <button type=\"button\" class=\"row-action-btn row-action-btn--view\" title=\"Clone\">\n                    <i class=\"pi pi-copy\"></i>\n                  </button>\n                  <button type=\"button\" class=\"row-action-btn row-action-btn--archive\" title=\"Archive\">\n                    <i class=\"pi pi-inbox\"></i>\n                  </button>\n                </div>\n              </td>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"emptymessage\">\n            <tr>\n              <td colspan=\"9\" class=\"empty-message\">\n                <div class=\"empty-state\">\n                  <i class=\"pi pi-share-alt\"></i>\n                  <strong>No workflows found</strong>\n                  <span>Create your first workflow to automate approval processes.</span>\n                  <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"createWorkflow()\">\n                    <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n                    <span>New Workflow</span>\n                  </button>\n                </div>\n              </td>\n            </tr>\n          </ng-template>\n        </p-table>\n      </div>\n    </section>\n  </div>\n</div>\n\n<!-- Template Picker Dialog -->\n<p-dialog\n  header=\"Choose a Workflow Template\"\n  [(visible)]=\"showTemplatePicker\"\n  [modal]=\"true\"\n  [closable]=\"true\"\n  [style]=\"{ width: '720px', maxWidth: '95vw' }\"\n  [contentStyle]=\"{ padding: '0' }\"\n  styleClass=\"template-picker-dialog\"\n>\n  <div class=\"template-picker\">\n    <p class=\"template-picker__intro\">\n      Start with a pre-configured template or build from scratch. Templates include conditions, approval steps, and outcomes tailored to common CRM scenarios.\n    </p>\n\n    <div class=\"template-grid\">\n      @for (template of templates(); track template.id) {\n        <div\n          class=\"template-card\"\n          [class.template-card--selected]=\"isTemplateSelected(template.id)\"\n          (click)=\"selectTemplate(template.id)\"\n        >\n          <div class=\"template-card__header\">\n            <div class=\"template-card__icon\">\n              <i class=\"pi {{ template.icon }}\"></i>\n            </div>\n            <div class=\"template-card__category\">\n              <i class=\"{{ categoryIcon(template.category) }}\"></i>\n              {{ template.category }}\n            </div>\n          </div>\n          <h4 class=\"template-card__name\">{{ template.name }}</h4>\n          <p class=\"template-card__description\">{{ template.description }}</p>\n          <div class=\"template-card__steps\">\n            @for (step of template.previewSteps; track step; let i = $index) {\n              <span class=\"template-step\">\n                <span class=\"template-step__number\">{{ i + 1 }}</span>\n                {{ step }}\n              </span>\n            }\n          </div>\n          <div class=\"template-card__module\">\n            <i class=\"pi pi-box\"></i> {{ template.module }}\n          </div>\n          @if (isTemplateSelected(template.id)) {\n            <div class=\"template-card__check\">\n              <i class=\"pi pi-check-circle\"></i>\n            </div>\n          }\n        </div>\n      }\n    </div>\n  </div>\n\n  <ng-template pTemplate=\"footer\">\n    <div class=\"template-picker__actions\">\n      <button type=\"button\" class=\"action-btn action-btn--settings\" (click)=\"startBlank()\">\n        <span class=\"action-btn__icon\"><i class=\"pi pi-file\"></i></span>\n        <span>Start Blank</span>\n      </button>\n      <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"!selectedTemplateId()\" (click)=\"confirmTemplate()\">\n        <span class=\"action-btn__icon\"><i class=\"pi pi-check\"></i></span>\n        <span>Use Template</span>\n      </button>\n    </div>\n  </ng-template>\n</p-dialog>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PAGE CONTAINER & BACKGROUND\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n.page-content {\n  position: relative;\n  z-index: 1;\n}\n\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: orb-float 20s ease-in-out infinite;\n\n  &.orb-1 { width: 600px; height: 600px; background: $primary-gradient; top: -200px; right: -100px; }\n  &.orb-2 { width: 400px; height: 400px; background: $cyan-gradient; bottom: 10%; left: -100px; animation-delay: -7s; }\n  &.orb-3 { width: 300px; height: 300px; background: $purple-gradient; top: 40%; right: 20%; animation-delay: -14s; }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// HERO SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n  margin-bottom: $space-2;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-title {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-1;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: gradient-shift 4s ease-in-out infinite;\n  }\n\n  .title-light {\n    -webkit-text-fill-color: $gray-700;\n    margin-left: $space-2;\n  }\n}\n\n.hero-description {\n  font-size: $font-size-base;\n  color: $gray-500;\n  font-weight: 400;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// HERO STATS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-stats {\n  display: flex;\n  gap: $space-4;\n  flex-wrap: wrap;\n  margin-top: $space-2;\n}\n\n.hero-stat {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 80px;\n\n  .stat-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .stat-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .stat-bar {\n    width: 100%;\n    height: 4px;\n    background: $gray-200;\n    border-radius: $radius-full;\n    overflow: hidden;\n\n    .stat-bar-fill {\n      height: 100%;\n      background: $primary-gradient;\n      border-radius: $radius-full;\n      transition: width 1s ease-out;\n\n      &--success { background: $success-gradient; }\n      &--prospects { background: $purple-gradient; }\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// VISUAL CARDS (HERO SIDEBAR)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  .card-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n  }\n\n  &--primary .card-icon { background: $primary-gradient; color: white; }\n  &--secondary .card-icon { background: $cyan-gradient; color: white; }\n  &--success .card-icon { background: $success-gradient; color: white; }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n\n    &--up { color: $success; }\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// METRIC CARDS (KPI ROW)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.metrics-section {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n\n  @media (max-width: 1200px) { grid-template-columns: repeat(2, 1fr); }\n  @media (max-width: 600px) { grid-template-columns: 1fr; }\n}\n\n.metric-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all 250ms;\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 4 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-lg;\n    color: white;\n    flex-shrink: 0;\n    transition: transform $transition-spring;\n  }\n\n  &--total .metric-icon { background: $primary-gradient; }\n  &--customers .metric-icon { background: $success-gradient; }\n  &--leads .metric-icon { background: $cyan-gradient; }\n  &--prospects .metric-icon { background: $purple-gradient; }\n\n  .metric-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DATA TABLE SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.data-section {\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out 0.4s both;\n}\n\n.data-card {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.data-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  h2 {\n    margin: 0;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n\n    i { color: $primary; }\n  }\n}\n\n.data-header__actions {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.search-box {\n  position: relative;\n  display: flex;\n  align-items: center;\n\n  > i {\n    position: absolute;\n    left: 0.75rem;\n    color: $gray-400;\n    font-size: $font-size-sm;\n    z-index: 1;\n  }\n\n  input {\n    padding-left: 2.25rem;\n    border-radius: $radius-md;\n    border: 1px solid rgba(0, 0, 0, 0.1);\n    height: 36px;\n    width: 220px;\n    font-size: $font-size-sm;\n    background: rgba(255, 255, 255, 0.8);\n\n    &:focus {\n      border-color: $primary;\n      outline: none;\n      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n    }\n  }\n}\n\n// Table header\n:host ::ng-deep .p-datatable-thead > tr > th {\n  background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n  border: none;\n  border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n  padding: $space-3 $space-4;\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #3b82f6;\n}\n\n// Table body\n:host ::ng-deep .p-datatable-tbody > tr > td {\n  vertical-align: middle;\n  padding: $space-3 $space-2;\n}\n\n.table-row {\n  transition: background 150ms;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n  &:last-child { border-bottom: none; }\n\n  &:hover {\n    background: rgba($primary, 0.03);\n\n    .workflow-avatar {\n      transform: scale(1.05);\n      box-shadow: 0 4px 12px rgba($primary, 0.2);\n    }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// WORKFLOW TABLE CELLS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.workflow-cell {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.workflow-avatar {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  color: white;\n  font-size: $font-size-sm;\n  border-radius: 50%;\n  flex-shrink: 0;\n  transition: all $transition-spring;\n}\n\n.workflow-info {\n  display: flex;\n  flex-direction: column;\n}\n\n.workflow-name {\n  font-weight: 600;\n  font-size: $font-size-base;\n  color: $gray-800;\n}\n\n.workflow-process {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n.step-count {\n  font-weight: 600;\n}\n\n.parallel-badge {\n  display: inline-block;\n  margin-left: 0.35rem;\n  font-size: 0.75rem;\n  color: $primary;\n  background: rgba(102, 126, 234, 0.1);\n  padding: 1px 6px;\n  border-radius: $radius-xs;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// EMPTY STATE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 3rem 1rem;\n  text-align: center;\n\n  > i {\n    font-size: 2.5rem;\n    color: $gray-300;\n  }\n\n  strong {\n    font-size: 1.1rem;\n    color: $gray-700;\n  }\n\n  span {\n    color: $gray-500;\n    font-size: 0.9rem;\n  }\n}\n\n.empty-message {\n  text-align: center;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ANIMATIONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes fade-in-up {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes slide-in-right {\n  from { opacity: 0; transform: translateX(20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n@keyframes gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes pulse-glow {\n  0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }\n  50% { opacity: 0.8; box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); }\n}\n\n@keyframes orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(50px, -30px) scale(1.1); }\n  50% { transform: translate(100px, 20px) scale(0.9); }\n  75% { transform: translate(30px, 50px) scale(1.05); }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// TEMPLATE PICKER DIALOG\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.template-picker {\n  padding: $space-4 $space-5;\n\n  &__intro {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    margin: 0 0 $space-4;\n    line-height: 1.6;\n  }\n\n  &__actions {\n    display: flex;\n    justify-content: flex-end;\n    gap: $space-3;\n  }\n}\n\n.template-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: $space-3;\n}\n\n.template-card {\n  position: relative;\n  padding: $space-4;\n  background: $glass-bg;\n  border: 2px solid $glass-border;\n  border-radius: $radius-lg;\n  cursor: pointer;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  overflow: hidden;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n    border-color: rgba(102, 126, 234, 0.3);\n  }\n\n  &--selected {\n    border-color: #667eea;\n    background: rgba(102, 126, 234, 0.06);\n    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15), $glass-shadow;\n\n    &:hover {\n      border-color: #667eea;\n    }\n  }\n\n  &__header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: $space-3;\n  }\n\n  &__icon {\n    width: 40px;\n    height: 40px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: $primary-gradient;\n    color: white;\n    border-radius: $radius-md;\n    font-size: 1.1rem;\n  }\n\n  &__category {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    font-weight: 600;\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n\n    i { font-size: 0.7rem; }\n  }\n\n  &__name {\n    font-size: $font-size-md;\n    font-weight: 700;\n    color: $gray-800;\n    margin: 0 0 $space-2;\n    line-height: 1.3;\n  }\n\n  &__description {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    line-height: 1.5;\n    margin: 0 0 $space-3;\n  }\n\n  &__steps {\n    display: flex;\n    flex-direction: column;\n    gap: $space-1;\n    margin-bottom: $space-3;\n  }\n\n  &__module {\n    font-size: $font-size-xs;\n    color: $gray-400;\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n\n    i { font-size: 0.7rem; }\n  }\n\n  &__check {\n    position: absolute;\n    top: $space-3;\n    right: $space-3;\n    color: #667eea;\n    font-size: 1.25rem;\n    animation: fade-in-up 0.2s ease-out;\n  }\n}\n\n.template-step {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-xs;\n  color: $gray-600;\n\n  &__number {\n    width: 20px;\n    height: 20px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(102, 126, 234, 0.12);\n    color: #667eea;\n    font-size: 0.65rem;\n    font-weight: 700;\n    border-radius: 50%;\n    flex-shrink: 0;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(WorkflowWorkspacePage, { className: "WorkflowWorkspacePage", filePath: "src/app/crm/features/workflows/pages/workflow-workspace.page.ts", lineNumber: 118 }); })();
