import { CommonModule, DatePipe } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { AppToastService } from '../../../../core/app-toast.service';
import { OpportunityApprovalService } from '../services/opportunity-approval.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/table";
import * as i4 from "primeng/api";
import * as i5 from "primeng/tag";
import * as i6 from "primeng/select";
import * as i7 from "primeng/inputtext";
import * as i8 from "primeng/button";
import * as i9 from "primeng/chip";
const _c0 = () => [15, 25, 50];
function DecisionHistoryPage_ng_template_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "When");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Decision");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Entity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Actor");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Risk");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Notes / Policy");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th", 29);
    i0.ɵɵtext(18, "Open");
    i0.ɵɵelementEnd()();
} }
function DecisionHistoryPage_ng_template_68_p_tag_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 46);
} }
function DecisionHistoryPage_ng_template_68_small_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "uppercase");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(2, 1, row_r2.priority), " priority");
} }
function DecisionHistoryPage_ng_template_68_div_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r2.notes);
} }
function DecisionHistoryPage_ng_template_68_small_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(row_r2.policyReason);
} }
function DecisionHistoryPage_ng_template_68_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 30)(3, "div");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "td")(10, "div", 31);
    i0.ɵɵelement(11, "p-tag", 32);
    i0.ɵɵtemplate(12, DecisionHistoryPage_ng_template_68_p_tag_12_Template, 1, 0, "p-tag", 33);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "td")(14, "div", 34)(15, "div", 35);
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "div", 36);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "td")(20, "div", 37)(21, "div", 38);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 39);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "td");
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "td");
    i0.ɵɵelement(28, "p-chip", 40);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "td")(30, "div", 41);
    i0.ɵɵelement(31, "p-tag", 32);
    i0.ɵɵtemplate(32, DecisionHistoryPage_ng_template_68_small_32_Template, 3, 3, "small", 42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "td")(34, "div", 43);
    i0.ɵɵtemplate(35, DecisionHistoryPage_ng_template_68_div_35_Template, 2, 1, "div", 42)(36, DecisionHistoryPage_ng_template_68_small_36_Template, 2, 1, "small", 42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(37, "td", 29)(38, "button", 44);
    i0.ɵɵlistener("click", function DecisionHistoryPage_ng_template_68_Template_button_click_38_listener() { const row_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openInInbox(row_r2)); });
    i0.ɵɵelement(39, "i", 45);
    i0.ɵɵelementStart(40, "span");
    i0.ɵɵtext(41, "Inbox");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const row_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(5, 16, row_r2.actionAtUtc, "MMM d, y"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 19, row_r2.actionAtUtc, "h:mm a"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", row_r2.action)("severity", ctx_r2.actionSeverity(row_r2.action));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r2.isEscalated);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(row_r2.decisionType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r2.workflowType);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(row_r2.entityType);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r2.entityName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r2.actorName || "System");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("label", row_r2.status);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", (row_r2.riskLevel || "n/a").toUpperCase())("severity", ctx_r2.riskSeverity(row_r2.riskLevel));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r2.priority);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", row_r2.notes);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r2.policyReason);
} }
function DecisionHistoryPage_ng_template_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 47)(2, "div", 48);
    i0.ɵɵtext(3, " No decision history events match the current filters. ");
    i0.ɵɵelementEnd()()();
} }
export class DecisionHistoryPage {
    service = inject(OpportunityApprovalService);
    toast = inject(AppToastService);
    router = inject(Router);
    destroyRef = inject(DestroyRef);
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    rows = signal([], ...(ngDevMode ? [{ debugName: "rows" }] : []));
    search = signal('', ...(ngDevMode ? [{ debugName: "search" }] : []));
    actionFilter = 'all';
    statusFilter = 'all';
    decisionTypeFilter = 'all';
    actionOptions = [
        { label: 'All actions', value: 'all' },
        { label: 'Submitted', value: 'Submitted' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' },
        { label: 'Approval SLA Escalated', value: 'ApprovalSlaEscalated' }
    ];
    statusOptions = [
        { label: 'All statuses', value: 'all' },
        { label: 'Submitted', value: 'Submitted' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Rejected', value: 'Rejected' }
    ];
    decisionTypeOptions = [
        { label: 'All decision types', value: 'all' },
        { label: 'Discount Approval', value: 'Discount' },
        { label: 'AI Review', value: 'AI' },
        { label: 'Stage Override', value: 'Stage' }
    ];
    kpis = computed(() => {
        const all = this.rows();
        return {
            total: all.length,
            escalations: all.filter(r => r.isEscalated || r.action === 'ApprovalSlaEscalated').length,
            approvals: all.filter(r => r.action === 'Approved').length,
            rejections: all.filter(r => r.action === 'Rejected').length
        };
    }, ...(ngDevMode ? [{ debugName: "kpis" }] : []));
    filteredRows = computed(() => {
        const term = this.search().trim().toLowerCase();
        return this.rows().filter(row => {
            if (term) {
                const haystack = [
                    row.action,
                    row.actorName,
                    row.decisionType,
                    row.entityType,
                    row.entityName,
                    row.status,
                    row.notes,
                    row.policyReason
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();
                if (!haystack.includes(term)) {
                    return false;
                }
            }
            return true;
        });
    }, ...(ngDevMode ? [{ debugName: "filteredRows" }] : []));
    constructor() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.service.getDecisionHistory({
            action: this.actionFilter === 'all' ? undefined : this.actionFilter,
            status: this.statusFilter === 'all' ? undefined : this.statusFilter,
            decisionType: this.decisionTypeFilter === 'all' ? undefined : this.decisionTypeFilter,
            take: 250
        })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: rows => {
                this.rows.set(rows ?? []);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.toast.show('error', 'Unable to load decision history.', 3000);
            }
        });
    }
    onSearch(value) {
        this.search.set(value ?? '');
    }
    refreshFilters() {
        this.load();
    }
    openInInbox(row) {
        this.router.navigate(['/app/decisions/pending-action'], { queryParams: { selected: row.decisionId } });
    }
    actionSeverity(action) {
        const normalized = (action || '').toLowerCase();
        if (normalized.includes('approved'))
            return 'success';
        if (normalized.includes('rejected'))
            return 'danger';
        if (normalized.includes('escalated'))
            return 'warn';
        return 'info';
    }
    riskSeverity(risk) {
        const value = (risk || '').toLowerCase();
        if (value === 'high')
            return 'danger';
        if (value === 'medium')
            return 'warn';
        if (value === 'low')
            return 'success';
        return 'info';
    }
    static ɵfac = function DecisionHistoryPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DecisionHistoryPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DecisionHistoryPage, selectors: [["app-decision-history-page"]], decls: 70, vars: 17, consts: [[1, "history-page"], [1, "hero-shell", "liquid-card"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], ["pButton", "", "type", "button", 1, "command-btn", "command-btn--ghost", 3, "click"], [1, "pi", "pi-refresh"], [1, "kpi-grid"], [1, "kpi-card", "liquid-card"], [1, "kpi-label"], [1, "kpi-value"], [1, "kpi-meta"], [1, "kpi-card", "liquid-card", "tone-warn"], [1, "kpi-card", "liquid-card", "tone-cyan"], [1, "kpi-card", "liquid-card", "tone-danger"], [1, "filter-shell", "liquid-card"], [1, "filter-field", "search-field"], [1, "search-icon", "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search action, actor, decision type, notes, policy reason", 3, "ngModelChange", "ngModel"], [1, "filter-field"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", 3, "ngModelChange", "onChange", "options", "ngModel"], [1, "history-table-shell", "liquid-card"], ["responsiveLayout", "scroll", "styleClass", "history-table", 3, "value", "loading", "paginator", "rows", "rowsPerPageOptions"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], [1, "actions-col"], [1, "when-cell"], [1, "action-cell"], [3, "value", "severity"], ["value", "ESCALATED", "severity", "warn", 4, "ngIf"], [1, "decision-cell"], [1, "decision-type"], [1, "decision-workflow"], [1, "entity-cell"], [1, "entity-type"], [1, "entity-name"], [3, "label"], [1, "risk-cell"], [4, "ngIf"], [1, "notes-cell"], ["pButton", "", "type", "button", 1, "command-btn", "command-btn--ghost", "command-btn--sm", 3, "click"], [1, "pi", "pi-arrow-right"], ["value", "ESCALATED", "severity", "warn"], ["colspan", "9"], [1, "empty-state"]], template: function DecisionHistoryPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "section", 1)(2, "div")(3, "div", 2);
            i0.ɵɵelement(4, "span", 3);
            i0.ɵɵelementStart(5, "span");
            i0.ɵɵtext(6, "Decision History");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "h1", 4)(8, "span", 5);
            i0.ɵɵtext(9, "Decision");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "span", 6);
            i0.ɵɵtext(11, "History");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "p", 7);
            i0.ɵɵtext(13, " Searchable operational history for decisions, approvals, escalations, and review actions. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "button", 8);
            i0.ɵɵlistener("click", function DecisionHistoryPage_Template_button_click_14_listener() { return ctx.load(); });
            i0.ɵɵelement(15, "i", 9);
            i0.ɵɵelementStart(16, "span");
            i0.ɵɵtext(17, "Refresh");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(18, "section", 10)(19, "article", 11)(20, "div", 12);
            i0.ɵɵtext(21, "History events");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 13);
            i0.ɵɵtext(23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 14);
            i0.ɵɵtext(25, "Loaded rows");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "article", 15)(27, "div", 12);
            i0.ɵɵtext(28, "Escalations");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 13);
            i0.ɵɵtext(30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 14);
            i0.ɵɵtext(32, "SLA escalation events");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "article", 16)(34, "div", 12);
            i0.ɵɵtext(35, "Approvals");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 13);
            i0.ɵɵtext(37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "div", 14);
            i0.ɵɵtext(39, "Approved actions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "article", 17)(41, "div", 12);
            i0.ɵɵtext(42, "Rejections");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div", 13);
            i0.ɵɵtext(44);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "div", 14);
            i0.ɵɵtext(46, "Rejected actions");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(47, "section", 18)(48, "div", 19)(49, "label");
            i0.ɵɵtext(50, "Search history");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(51, "span", 20);
            i0.ɵɵelementStart(52, "input", 21);
            i0.ɵɵlistener("ngModelChange", function DecisionHistoryPage_Template_input_ngModelChange_52_listener($event) { return ctx.onSearch($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(53, "div", 22)(54, "label");
            i0.ɵɵtext(55, "Action");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "p-select", 23);
            i0.ɵɵtwoWayListener("ngModelChange", function DecisionHistoryPage_Template_p_select_ngModelChange_56_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.actionFilter, $event) || (ctx.actionFilter = $event); return $event; });
            i0.ɵɵlistener("onChange", function DecisionHistoryPage_Template_p_select_onChange_56_listener() { return ctx.refreshFilters(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(57, "div", 22)(58, "label");
            i0.ɵɵtext(59, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "p-select", 23);
            i0.ɵɵtwoWayListener("ngModelChange", function DecisionHistoryPage_Template_p_select_ngModelChange_60_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event); return $event; });
            i0.ɵɵlistener("onChange", function DecisionHistoryPage_Template_p_select_onChange_60_listener() { return ctx.refreshFilters(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(61, "div", 22)(62, "label");
            i0.ɵɵtext(63, "Decision Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "p-select", 23);
            i0.ɵɵtwoWayListener("ngModelChange", function DecisionHistoryPage_Template_p_select_ngModelChange_64_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.decisionTypeFilter, $event) || (ctx.decisionTypeFilter = $event); return $event; });
            i0.ɵɵlistener("onChange", function DecisionHistoryPage_Template_p_select_onChange_64_listener() { return ctx.refreshFilters(); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(65, "section", 24)(66, "p-table", 25);
            i0.ɵɵtemplate(67, DecisionHistoryPage_ng_template_67_Template, 19, 0, "ng-template", 26)(68, DecisionHistoryPage_ng_template_68_Template, 42, 22, "ng-template", 27)(69, DecisionHistoryPage_ng_template_69_Template, 4, 0, "ng-template", 28);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(23);
            i0.ɵɵtextInterpolate(ctx.kpis().total);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.kpis().escalations);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.kpis().approvals);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.kpis().rejections);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngModel", ctx.search());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.actionOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.actionFilter);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.statusOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.statusFilter);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.decisionTypeOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.decisionTypeFilter);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", ctx.filteredRows())("loading", ctx.loading())("paginator", true)("rows", 15)("rowsPerPageOptions", i0.ɵɵpureFunction0(16, _c0));
        } }, dependencies: [CommonModule, i1.NgIf, FormsModule, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgModel, TableModule, i3.Table, i4.PrimeTemplate, TagModule, i5.Tag, SelectModule, i6.Select, InputTextModule, i7.InputText, ButtonModule, i8.ButtonDirective, ChipModule, i9.Chip, i1.UpperCasePipe, i1.DatePipe], styles: ["[_nghost-%COMP%] {\n  display: block;\n}\n\n.history-page[_ngcontent-%COMP%] {\n  position: relative;\n  padding: 0.4rem 0 1rem;\n  color: #0f172a;\n}\n\n.liquid-card[_ngcontent-%COMP%] {\n  border-radius: 18px;\n  border: 1px solid rgba(255, 255, 255, 0.7);\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78)),\n    linear-gradient(180deg, rgba(248,250,252,0.88), rgba(255,255,255,0.8));\n  box-shadow:\n    inset 0 1px 0 rgba(255,255,255,0.95),\n    0 12px 26px rgba(15,23,42,0.06);\n  backdrop-filter: blur(18px) saturate(150%);\n}\n\n.hero-shell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.05rem 1.15rem;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.28rem 0.6rem;\n  border-radius: 999px;\n  border: 1px solid rgba(59, 130, 246, 0.18);\n  background: rgba(59, 130, 246, 0.08);\n  color: #1d4ed8;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n\n.badge-dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #38bdf8;\n  box-shadow: 0 0 10px rgba(56, 189, 248, 0.55);\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  margin: 0.55rem 0 0.25rem;\n  font-size: 1.58rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  line-height: 1.1;\n}\n\n.title-gradient[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.title-light[_ngcontent-%COMP%] {\n  color: #334155;\n}\n\n.hero-description[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(51, 65, 85, 0.8);\n  font-size: 0.95rem;\n}\n\n.kpi-grid[_ngcontent-%COMP%] {\n  margin-top: 0.85rem;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.8rem;\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n  padding: 0.75rem 0.85rem;\n}\n\n.kpi-label[_ngcontent-%COMP%] {\n  color: rgba(51,65,85,0.7);\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n  font-weight: 700;\n}\n\n.kpi-value[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n  font-size: 1.28rem;\n  font-weight: 700;\n}\n\n.kpi-meta[_ngcontent-%COMP%] {\n  margin-top: 0.15rem;\n  color: rgba(71,85,105,0.74);\n  font-size: 0.75rem;\n}\n\n.filter-shell[_ngcontent-%COMP%] {\n  margin-top: 0.95rem;\n  padding: 0.95rem;\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: minmax(260px, 1.7fr) repeat(3, minmax(170px, 1fr));\n  align-items: end;\n}\n\n.filter-field[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.35rem;\n}\n\n.filter-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  color: rgba(51, 65, 85, 0.78);\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n\n.search-field[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 0.85rem;\n  bottom: 0.78rem;\n  color: rgba(100,116,139,0.8);\n  pointer-events: none;\n}\n\n.search-field[_ngcontent-%COMP%]   input[pInputText][_ngcontent-%COMP%] {\n  padding-left: 2.15rem;\n}\n\n.history-table-shell[_ngcontent-%COMP%] {\n  margin-top: 0.95rem;\n  padding: 0.7rem;\n}\n\n.actions-col[_ngcontent-%COMP%] {\n  width: 108px;\n  text-align: right;\n}\n\n.when-cell[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.decision-workflow[_ngcontent-%COMP%], \n.risk-cell[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], \n.notes-cell[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: rgba(100,116,139,0.86);\n  font-size: 0.73rem;\n}\n\n.action-cell[_ngcontent-%COMP%], \n.risk-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  align-items: flex-start;\n}\n\n.decision-cell[_ngcontent-%COMP%], \n.entity-cell[_ngcontent-%COMP%], \n.notes-cell[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.15rem;\n}\n\n.decision-type[_ngcontent-%COMP%], \n.entity-type[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #1e293b;\n}\n\n.entity-name[_ngcontent-%COMP%] {\n  color: #475569;\n  font-size: 0.8rem;\n}\n\n.notes-cell[_ngcontent-%COMP%] {\n  max-width: 360px;\n}\n\n.notes-cell[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  color: #334155;\n  font-size: 0.8rem;\n  line-height: 1.35;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  padding: 1rem;\n  text-align: center;\n  border-radius: 12px;\n  background: rgba(248,250,252,0.92);\n  border: 1px dashed rgba(148,163,184,0.24);\n  color: rgba(71,85,105,0.8);\n}\n\n.command-btn[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  color: #334155;\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.84)),\n    rgba(255,255,255,0.75);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), 0 2px 8px rgba(15,23,42,0.05);\n}\n\n.command-btn[_ngcontent-%COMP%]   .pi[_ngcontent-%COMP%] {\n  margin-right: 0.35rem;\n}\n\n.command-btn--ghost[_ngcontent-%COMP%]:hover {\n  border-color: rgba(96, 165, 250, 0.28);\n  transform: translateY(-1px);\n  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.12);\n}\n\n.command-btn--sm[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.55rem;\n  font-size: 0.78rem;\n}\n\n[_nghost-%COMP%]     .history-table.p-datatable .p-datatable-header {\n  background: transparent;\n  border: none;\n}\n\n[_nghost-%COMP%]     .history-table.p-datatable .p-datatable-thead > tr > th {\n  background: rgba(248,250,252,0.88);\n  border-color: rgba(226,232,240,0.9);\n  color: #334155;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  font-weight: 700;\n  padding: 0.65rem 0.6rem;\n}\n\n[_nghost-%COMP%]     .history-table.p-datatable .p-datatable-tbody > tr > td {\n  border-color: rgba(226,232,240,0.75);\n  padding: 0.65rem 0.6rem;\n  vertical-align: top;\n  background: rgba(255,255,255,0.72);\n}\n\n[_nghost-%COMP%]     .history-table .p-chip {\n  background: rgba(248,250,252,0.95);\n  color: #334155;\n  border: 1px solid rgba(203,213,225,0.9);\n  font-size: 0.72rem;\n}\n\n[_nghost-%COMP%]     .history-table .p-tag {\n  font-size: 0.68rem;\n  font-weight: 700;\n  border-radius: 999px;\n}\n\n[_nghost-%COMP%]     .filter-shell .p-inputtext, \n[_nghost-%COMP%]     .filter-shell .p-select, \n[_nghost-%COMP%]     .filter-shell .p-select-label {\n  width: 100%;\n  background: rgba(255,255,255,0.92);\n  color: #0f172a;\n  border-color: rgba(203,213,225,0.9);\n}\n\n[_nghost-%COMP%]     .filter-shell .p-inputtext:focus, \n[_nghost-%COMP%]     .filter-shell .p-select:not(.p-disabled).p-focus {\n  border-color: rgba(56, 189, 248, 0.34);\n  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);\n}\n\n[_nghost-%COMP%]     .command-btn.p-button {\n  background: inherit;\n  border: inherit;\n  color: inherit;\n}\n\n[_nghost-%COMP%]     .command-btn.p-button:enabled:hover {\n  background: inherit;\n  border-color: inherit;\n  color: inherit;\n}\n\n@media (max-width: 1180px) {\n  .kpi-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .filter-shell[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .hero-shell[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .kpi-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .filter-shell[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .actions-col[_ngcontent-%COMP%] {\n    width: auto;\n    text-align: left;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DecisionHistoryPage, [{
        type: Component,
        args: [{ selector: 'app-decision-history-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    TableModule,
                    TagModule,
                    SelectModule,
                    InputTextModule,
                    ButtonModule,
                    ChipModule,
                    DatePipe
                ], template: "<section class=\"history-page\">\n  <section class=\"hero-shell liquid-card\">\n    <div>\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Decision History</span>\n      </div>\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Decision</span>\n        <span class=\"title-light\">History</span>\n      </h1>\n      <p class=\"hero-description\">\n        Searchable operational history for decisions, approvals, escalations, and review actions.\n      </p>\n    </div>\n    <button pButton type=\"button\" class=\"command-btn command-btn--ghost\" (click)=\"load()\">\n      <i class=\"pi pi-refresh\"></i>\n      <span>Refresh</span>\n    </button>\n  </section>\n\n  <section class=\"kpi-grid\">\n    <article class=\"kpi-card liquid-card\">\n      <div class=\"kpi-label\">History events</div>\n      <div class=\"kpi-value\">{{ kpis().total }}</div>\n      <div class=\"kpi-meta\">Loaded rows</div>\n    </article>\n    <article class=\"kpi-card liquid-card tone-warn\">\n      <div class=\"kpi-label\">Escalations</div>\n      <div class=\"kpi-value\">{{ kpis().escalations }}</div>\n      <div class=\"kpi-meta\">SLA escalation events</div>\n    </article>\n    <article class=\"kpi-card liquid-card tone-cyan\">\n      <div class=\"kpi-label\">Approvals</div>\n      <div class=\"kpi-value\">{{ kpis().approvals }}</div>\n      <div class=\"kpi-meta\">Approved actions</div>\n    </article>\n    <article class=\"kpi-card liquid-card tone-danger\">\n      <div class=\"kpi-label\">Rejections</div>\n      <div class=\"kpi-value\">{{ kpis().rejections }}</div>\n      <div class=\"kpi-meta\">Rejected actions</div>\n    </article>\n  </section>\n\n  <section class=\"filter-shell liquid-card\">\n    <div class=\"filter-field search-field\">\n      <label>Search history</label>\n      <span class=\"search-icon pi pi-search\"></span>\n      <input\n        pInputText\n        type=\"text\"\n        [ngModel]=\"search()\"\n        (ngModelChange)=\"onSearch($event)\"\n        placeholder=\"Search action, actor, decision type, notes, policy reason\"\n      />\n    </div>\n    <div class=\"filter-field\">\n      <label>Action</label>\n      <p-select\n        appendTo=\"body\"\n        [options]=\"actionOptions\"\n        optionLabel=\"label\"\n        optionValue=\"value\"\n        [(ngModel)]=\"actionFilter\"\n        (onChange)=\"refreshFilters()\"\n      ></p-select>\n    </div>\n    <div class=\"filter-field\">\n      <label>Status</label>\n      <p-select\n        appendTo=\"body\"\n        [options]=\"statusOptions\"\n        optionLabel=\"label\"\n        optionValue=\"value\"\n        [(ngModel)]=\"statusFilter\"\n        (onChange)=\"refreshFilters()\"\n      ></p-select>\n    </div>\n    <div class=\"filter-field\">\n      <label>Decision Type</label>\n      <p-select\n        appendTo=\"body\"\n        [options]=\"decisionTypeOptions\"\n        optionLabel=\"label\"\n        optionValue=\"value\"\n        [(ngModel)]=\"decisionTypeFilter\"\n        (onChange)=\"refreshFilters()\"\n      ></p-select>\n    </div>\n  </section>\n\n  <section class=\"history-table-shell liquid-card\">\n    <p-table\n      [value]=\"filteredRows()\"\n      [loading]=\"loading()\"\n      [paginator]=\"true\"\n      [rows]=\"15\"\n      [rowsPerPageOptions]=\"[15,25,50]\"\n      responsiveLayout=\"scroll\"\n      styleClass=\"history-table\"\n    >\n      <ng-template pTemplate=\"header\">\n        <tr>\n          <th>When</th>\n          <th>Action</th>\n          <th>Decision</th>\n          <th>Entity</th>\n          <th>Actor</th>\n          <th>Status</th>\n          <th>Risk</th>\n          <th>Notes / Policy</th>\n          <th class=\"actions-col\">Open</th>\n        </tr>\n      </ng-template>\n\n      <ng-template pTemplate=\"body\" let-row>\n        <tr>\n          <td>\n            <div class=\"when-cell\">\n              <div>{{ row.actionAtUtc | date:'MMM d, y' }}</div>\n              <small>{{ row.actionAtUtc | date:'h:mm a' }}</small>\n            </div>\n          </td>\n          <td>\n            <div class=\"action-cell\">\n              <p-tag [value]=\"row.action\" [severity]=\"actionSeverity(row.action)\"></p-tag>\n              <p-tag *ngIf=\"row.isEscalated\" value=\"ESCALATED\" severity=\"warn\"></p-tag>\n            </div>\n          </td>\n          <td>\n            <div class=\"decision-cell\">\n              <div class=\"decision-type\">{{ row.decisionType }}</div>\n              <div class=\"decision-workflow\">{{ row.workflowType }}</div>\n            </div>\n          </td>\n          <td>\n            <div class=\"entity-cell\">\n              <div class=\"entity-type\">{{ row.entityType }}</div>\n              <div class=\"entity-name\">{{ row.entityName }}</div>\n            </div>\n          </td>\n          <td>{{ row.actorName || 'System' }}</td>\n          <td>\n            <p-chip [label]=\"row.status\"></p-chip>\n          </td>\n          <td>\n            <div class=\"risk-cell\">\n              <p-tag [value]=\"(row.riskLevel || 'n/a').toUpperCase()\" [severity]=\"riskSeverity(row.riskLevel)\"></p-tag>\n              <small *ngIf=\"row.priority\">{{ row.priority | uppercase }} priority</small>\n            </div>\n          </td>\n          <td>\n            <div class=\"notes-cell\">\n              <div *ngIf=\"row.notes\">{{ row.notes }}</div>\n              <small *ngIf=\"row.policyReason\">{{ row.policyReason }}</small>\n            </div>\n          </td>\n          <td class=\"actions-col\">\n            <button pButton type=\"button\" class=\"command-btn command-btn--ghost command-btn--sm\" (click)=\"openInInbox(row)\">\n              <i class=\"pi pi-arrow-right\"></i>\n              <span>Inbox</span>\n            </button>\n          </td>\n        </tr>\n      </ng-template>\n\n      <ng-template pTemplate=\"emptymessage\">\n        <tr>\n          <td colspan=\"9\">\n            <div class=\"empty-state\">\n              No decision history events match the current filters.\n            </div>\n          </td>\n        </tr>\n      </ng-template>\n    </p-table>\n  </section>\n</section>\n", styles: [":host {\n  display: block;\n}\n\n.history-page {\n  position: relative;\n  padding: 0.4rem 0 1rem;\n  color: #0f172a;\n}\n\n.liquid-card {\n  border-radius: 18px;\n  border: 1px solid rgba(255, 255, 255, 0.7);\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78)),\n    linear-gradient(180deg, rgba(248,250,252,0.88), rgba(255,255,255,0.8));\n  box-shadow:\n    inset 0 1px 0 rgba(255,255,255,0.95),\n    0 12px 26px rgba(15,23,42,0.06);\n  backdrop-filter: blur(18px) saturate(150%);\n}\n\n.hero-shell {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  padding: 1.05rem 1.15rem;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  padding: 0.28rem 0.6rem;\n  border-radius: 999px;\n  border: 1px solid rgba(59, 130, 246, 0.18);\n  background: rgba(59, 130, 246, 0.08);\n  color: #1d4ed8;\n  font-size: 0.78rem;\n  font-weight: 700;\n}\n\n.badge-dot {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #38bdf8;\n  box-shadow: 0 0 10px rgba(56, 189, 248, 0.55);\n}\n\n.hero-title {\n  margin: 0.55rem 0 0.25rem;\n  font-size: 1.58rem;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.45rem;\n  line-height: 1.1;\n}\n\n.title-gradient {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n.title-light {\n  color: #334155;\n}\n\n.hero-description {\n  margin: 0;\n  color: rgba(51, 65, 85, 0.8);\n  font-size: 0.95rem;\n}\n\n.kpi-grid {\n  margin-top: 0.85rem;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 0.8rem;\n}\n\n.kpi-card {\n  padding: 0.75rem 0.85rem;\n}\n\n.kpi-label {\n  color: rgba(51,65,85,0.7);\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.07em;\n  font-weight: 700;\n}\n\n.kpi-value {\n  margin-top: 0.2rem;\n  font-size: 1.28rem;\n  font-weight: 700;\n}\n\n.kpi-meta {\n  margin-top: 0.15rem;\n  color: rgba(71,85,105,0.74);\n  font-size: 0.75rem;\n}\n\n.filter-shell {\n  margin-top: 0.95rem;\n  padding: 0.95rem;\n  display: grid;\n  gap: 0.75rem;\n  grid-template-columns: minmax(260px, 1.7fr) repeat(3, minmax(170px, 1fr));\n  align-items: end;\n}\n\n.filter-field {\n  display: grid;\n  gap: 0.35rem;\n}\n\n.filter-field label {\n  color: rgba(51, 65, 85, 0.78);\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  text-transform: uppercase;\n}\n\n.search-field {\n  position: relative;\n}\n\n.search-icon {\n  position: absolute;\n  left: 0.85rem;\n  bottom: 0.78rem;\n  color: rgba(100,116,139,0.8);\n  pointer-events: none;\n}\n\n.search-field input[pInputText] {\n  padding-left: 2.15rem;\n}\n\n.history-table-shell {\n  margin-top: 0.95rem;\n  padding: 0.7rem;\n}\n\n.actions-col {\n  width: 108px;\n  text-align: right;\n}\n\n.when-cell small,\n.decision-workflow,\n.risk-cell small,\n.notes-cell small {\n  color: rgba(100,116,139,0.86);\n  font-size: 0.73rem;\n}\n\n.action-cell,\n.risk-cell {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n  align-items: flex-start;\n}\n\n.decision-cell,\n.entity-cell,\n.notes-cell {\n  display: grid;\n  gap: 0.15rem;\n}\n\n.decision-type,\n.entity-type {\n  font-weight: 700;\n  color: #1e293b;\n}\n\n.entity-name {\n  color: #475569;\n  font-size: 0.8rem;\n}\n\n.notes-cell {\n  max-width: 360px;\n}\n\n.notes-cell > div {\n  color: #334155;\n  font-size: 0.8rem;\n  line-height: 1.35;\n}\n\n.empty-state {\n  padding: 1rem;\n  text-align: center;\n  border-radius: 12px;\n  background: rgba(248,250,252,0.92);\n  border: 1px dashed rgba(148,163,184,0.24);\n  color: rgba(71,85,105,0.8);\n}\n\n.command-btn {\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.22);\n  color: #334155;\n  background:\n    linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.84)),\n    rgba(255,255,255,0.75);\n  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), 0 2px 8px rgba(15,23,42,0.05);\n}\n\n.command-btn .pi {\n  margin-right: 0.35rem;\n}\n\n.command-btn--ghost:hover {\n  border-color: rgba(96, 165, 250, 0.28);\n  transform: translateY(-1px);\n  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.12);\n}\n\n.command-btn--sm {\n  padding: 0.35rem 0.55rem;\n  font-size: 0.78rem;\n}\n\n:host ::ng-deep .history-table.p-datatable .p-datatable-header {\n  background: transparent;\n  border: none;\n}\n\n:host ::ng-deep .history-table.p-datatable .p-datatable-thead > tr > th {\n  background: rgba(248,250,252,0.88);\n  border-color: rgba(226,232,240,0.9);\n  color: #334155;\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  font-weight: 700;\n  padding: 0.65rem 0.6rem;\n}\n\n:host ::ng-deep .history-table.p-datatable .p-datatable-tbody > tr > td {\n  border-color: rgba(226,232,240,0.75);\n  padding: 0.65rem 0.6rem;\n  vertical-align: top;\n  background: rgba(255,255,255,0.72);\n}\n\n:host ::ng-deep .history-table .p-chip {\n  background: rgba(248,250,252,0.95);\n  color: #334155;\n  border: 1px solid rgba(203,213,225,0.9);\n  font-size: 0.72rem;\n}\n\n:host ::ng-deep .history-table .p-tag {\n  font-size: 0.68rem;\n  font-weight: 700;\n  border-radius: 999px;\n}\n\n:host ::ng-deep .filter-shell .p-inputtext,\n:host ::ng-deep .filter-shell .p-select,\n:host ::ng-deep .filter-shell .p-select-label {\n  width: 100%;\n  background: rgba(255,255,255,0.92);\n  color: #0f172a;\n  border-color: rgba(203,213,225,0.9);\n}\n\n:host ::ng-deep .filter-shell .p-inputtext:focus,\n:host ::ng-deep .filter-shell .p-select:not(.p-disabled).p-focus {\n  border-color: rgba(56, 189, 248, 0.34);\n  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);\n}\n\n:host ::ng-deep .command-btn.p-button {\n  background: inherit;\n  border: inherit;\n  color: inherit;\n}\n\n:host ::ng-deep .command-btn.p-button:enabled:hover {\n  background: inherit;\n  border-color: inherit;\n  color: inherit;\n}\n\n@media (max-width: 1180px) {\n  .kpi-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .filter-shell {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n\n@media (max-width: 768px) {\n  .hero-shell {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n\n  .kpi-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .filter-shell {\n    grid-template-columns: 1fr;\n  }\n\n  .actions-col {\n    width: auto;\n    text-align: left;\n  }\n}\n\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DecisionHistoryPage, { className: "DecisionHistoryPage", filePath: "src/app/crm/features/opportunities/pages/decision-history.page.ts", lineNumber: 38 }); })();
