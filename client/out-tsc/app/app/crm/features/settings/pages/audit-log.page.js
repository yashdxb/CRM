import { DatePipe, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AuditLogService } from '../services/audit-log.service';
import { UserAdminDataService } from '../services/user-admin-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/button";
import * as i3 from "primeng/api";
import * as i4 from "primeng/datepicker";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/paginator";
import * as i7 from "primeng/select";
import * as i8 from "primeng/table";
import * as i9 from "primeng/tag";
import * as i10 from "primeng/tooltip";
const _c0 = () => [10, 20, 50];
function AuditLogPage_ng_template_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 34);
    i0.ɵɵtext(2, "Time");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th", 35);
    i0.ɵɵtext(4, "Entity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th", 36);
    i0.ɵɵtext(6, "Action");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 37);
    i0.ɵɵtext(8, "Change");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 38);
    i0.ɵɵtext(10, "User");
    i0.ɵɵelementEnd()();
} }
function AuditLogPage_ng_template_56_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 49);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1.entityId);
} }
function AuditLogPage_ng_template_56_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1.notes);
} }
function AuditLogPage_ng_template_56_span_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 51);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1.changedByUserId);
} }
function AuditLogPage_ng_template_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 34)(2, "div", 39);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "td", 35)(6, "div", 40)(7, "span", 41);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, AuditLogPage_ng_template_56_span_9_Template, 2, 1, "span", 42);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "td", 36);
    i0.ɵɵelement(11, "p-tag", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td", 37)(13, "div", 44);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, AuditLogPage_ng_template_56_div_15_Template, 2, 1, "div", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 38)(17, "div", 46)(18, "span", 47);
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, AuditLogPage_ng_template_56_span_20_Template, 2, 1, "span", 48);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(4, 11, item_r1.createdAtUtc, "medium"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(item_r1.entityType);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r1.entityId);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", item_r1.action)("severity", ctx_r1.auditTagSeverity(item_r1.action));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("pTooltip", i0.ɵɵinterpolate(ctx_r1.changeDetail(item_r1)));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.changeSummary(item_r1), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r1.notes);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r1.changedByName || "System");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r1.changedByUserId);
} }
function AuditLogPage_ng_template_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 52)(2, "div", 53);
    i0.ɵɵelement(3, "i", 54);
    i0.ɵɵelementStart(4, "div")(5, "div", 55);
    i0.ɵɵtext(6, "No audit activity yet");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 56);
    i0.ɵɵtext(8, "Try adjusting filters or check back later.");
    i0.ɵɵelementEnd()()()()();
} }
export class AuditLogPage {
    auditService = inject(AuditLogService);
    userService = inject(UserAdminDataService);
    route = inject(ActivatedRoute);
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    items = signal([], ...(ngDevMode ? [{ debugName: "items" }] : []));
    total = signal(0, ...(ngDevMode ? [{ debugName: "total" }] : []));
    search = signal('', ...(ngDevMode ? [{ debugName: "search" }] : []));
    entityType = signal(null, ...(ngDevMode ? [{ debugName: "entityType" }] : []));
    action = signal(null, ...(ngDevMode ? [{ debugName: "action" }] : []));
    userId = signal(null, ...(ngDevMode ? [{ debugName: "userId" }] : []));
    fromDate = signal(null, ...(ngDevMode ? [{ debugName: "fromDate" }] : []));
    toDate = signal(null, ...(ngDevMode ? [{ debugName: "toDate" }] : []));
    page = signal(1, ...(ngDevMode ? [{ debugName: "page" }] : []));
    pageSize = signal(20, ...(ngDevMode ? [{ debugName: "pageSize" }] : []));
    entityOptions = [
        { label: 'Lead', value: 'Lead' },
        { label: 'Opportunity', value: 'Opportunity' },
        { label: 'Activity', value: 'Activity' },
        { label: 'Account', value: 'Account' },
        { label: 'Contact', value: 'Contact' },
        { label: 'Marketing Telemetry', value: 'MarketingTelemetry' },
        { label: 'RFQ', value: 'Rfq' },
        { label: 'Quote', value: 'Quote' },
        { label: 'Award', value: 'Award' }
    ];
    actionOptions = [
        { label: 'Created', value: 'Created' },
        { label: 'Updated', value: 'Updated' },
        { label: 'Deleted', value: 'Deleted' },
        { label: 'Status Changed', value: 'StatusChanged' },
        { label: 'Owner Changed', value: 'OwnerChanged' },
        { label: 'Stage Changed', value: 'StageChanged' },
        { label: 'Amount Changed', value: 'AmountChanged' },
        { label: 'Converted', value: 'Converted' },
        { label: 'Outcome Updated', value: 'OutcomeUpdated' },
        { label: 'Impact Worklist Opened', value: 'ImpactWorklistOpened' }
    ];
    userOptions = [{ label: 'All users', value: '' }];
    constructor() {
        this.loadUsers();
        this.route.queryParamMap.subscribe((params) => {
            const entityType = params.get('entityType');
            const action = params.get('action');
            this.entityType.set(entityType || null);
            this.action.set(action || null);
            this.page.set(1);
            this.loadAudit();
        });
    }
    loadAudit() {
        this.loading.set(true);
        const toUtc = this.toEndOfDay(this.toDate());
        this.auditService
            .search({
            search: this.search() || undefined,
            entityType: this.entityType() || undefined,
            action: this.action() || undefined,
            userId: this.userId() || undefined,
            fromUtc: this.fromDate() ? this.fromDate().toISOString() : undefined,
            toUtc: toUtc ? toUtc.toISOString() : undefined,
            page: this.page(),
            pageSize: this.pageSize()
        })
            .subscribe({
            next: (response) => {
                this.items.set(response.items);
                this.total.set(response.total);
                this.loading.set(false);
            },
            error: () => {
                this.items.set([]);
                this.total.set(0);
                this.loading.set(false);
            }
        });
    }
    onSearch() {
        this.page.set(1);
        this.loadAudit();
    }
    resetFilters() {
        this.search.set('');
        this.entityType.set(null);
        this.action.set(null);
        this.userId.set(null);
        this.fromDate.set(null);
        this.toDate.set(null);
        this.page.set(1);
        this.loadAudit();
    }
    onPageChange(event) {
        const page = event.page ?? 0;
        const rows = event.rows ?? this.pageSize();
        this.page.set(page + 1);
        this.pageSize.set(rows);
        this.loadAudit();
    }
    auditTagSeverity(action) {
        if (action === 'Deleted') {
            return 'danger';
        }
        if (action === 'Created' || action === 'Converted') {
            return 'success';
        }
        if (action.includes('Changed') || action === 'Updated') {
            return 'info';
        }
        return 'warn';
    }
    changeSummary(item) {
        if (!item.field) {
            return item.action;
        }
        const oldValue = item.oldValue ?? '—';
        const newValue = item.newValue ?? '—';
        return `${item.field}: ${oldValue} → ${newValue}`;
    }
    changeDetail(item) {
        if (!item.field) {
            return '';
        }
        return `Old: ${item.oldValue ?? '—'} | New: ${item.newValue ?? '—'}`;
    }
    loadUsers() {
        this.userService.search({ page: 1, pageSize: 200, includeInactive: false }).subscribe({
            next: (response) => {
                const options = response.items.map((user) => ({
                    label: user.fullName || user.email,
                    value: user.id
                }));
                this.userOptions = [{ label: 'All users', value: '' }, ...options];
            },
            error: () => {
                this.userOptions = [{ label: 'All users', value: '' }];
            }
        });
    }
    toEndOfDay(value) {
        if (!value) {
            return null;
        }
        const end = new Date(value);
        end.setHours(23, 59, 59, 999);
        return end;
    }
    static ɵfac = function AuditLogPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuditLogPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AuditLogPage, selectors: [["app-audit-log-page"]], decls: 62, vars: 21, consts: [[1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "page-container"], [1, "page-content"], [1, "page-hero"], [1, "hero-content"], [1, "hero-eyebrow"], [1, "pi", "pi-shield"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-subtitle"], [1, "hero-actions"], ["pButton", "", "type", "button", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "button", 1, "crm-button", "crm-button--primary", 3, "click"], [1, "glass-card", "filter-panel"], [1, "filter-grid"], [1, "filter-field"], ["pInputText", "", "placeholder", "Entity id, field, value, or notes", 1, "w-full", 3, "ngModelChange", "ngModel"], ["optionLabel", "label", "optionValue", "value", "placeholder", "All entities", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["optionLabel", "label", "optionValue", "value", "placeholder", "All actions", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["optionLabel", "label", "optionValue", "value", "placeholder", "All users", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel"], ["dateFormat", "yy-mm-dd", "appendTo", "body", "styleClass", "w-full", 3, "ngModelChange", "ngModel", "showIcon"], [1, "filter-actions"], [1, "glass-card", "table-panel"], ["dataKey", "id", "styleClass", "audit-table", 3, "value", "loading", "rowHover"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], [1, "table-footer"], [1, "footer-summary"], [3, "onPageChange", "rows", "totalRecords", "first", "rowsPerPageOptions"], [1, "col-time"], [1, "col-entity"], [1, "col-action"], [1, "col-change"], [1, "col-user"], [1, "time-cell"], [1, "entity-cell"], [1, "entity-type"], ["class", "entity-id", 4, "ngIf"], [3, "value", "severity"], ["tooltipPosition", "top", 1, "change-cell", 3, "pTooltip"], ["class", "change-notes", 4, "ngIf"], [1, "user-cell"], [1, "user-name"], ["class", "user-email", 4, "ngIf"], [1, "entity-id"], [1, "change-notes"], [1, "user-email"], ["colspan", "5"], [1, "empty-state"], [1, "pi", "pi-clipboard"], [1, "empty-title"], [1, "empty-subtitle"]], template: function AuditLogPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 4)(5, "div", 5);
            i0.ɵɵelement(6, "app-breadcrumbs");
            i0.ɵɵelementStart(7, "header", 6)(8, "div", 7)(9, "span", 8);
            i0.ɵɵelement(10, "i", 9);
            i0.ɵɵtext(11, " Audit Log ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "h1", 10)(13, "span", 11);
            i0.ɵɵtext(14, "Security");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 12);
            i0.ɵɵtext(16, "& Activity Trail");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 13);
            i0.ɵɵtext(18, " Track critical changes across CRM records with time, user, and context. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 14)(20, "button", 15);
            i0.ɵɵlistener("click", function AuditLogPage_Template_button_click_20_listener() { return ctx.onSearch(); });
            i0.ɵɵtext(21, " Refresh ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "button", 16);
            i0.ɵɵlistener("click", function AuditLogPage_Template_button_click_22_listener() { return ctx.resetFilters(); });
            i0.ɵɵtext(23, " Reset filters ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(24, "div", 17)(25, "div", 18)(26, "div", 19)(27, "label");
            i0.ɵɵtext(28, "Search");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "input", 20);
            i0.ɵɵlistener("ngModelChange", function AuditLogPage_Template_input_ngModelChange_29_listener($event) { return ctx.search.set($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 19)(31, "label");
            i0.ɵɵtext(32, "Entity");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "p-select", 21);
            i0.ɵɵlistener("ngModelChange", function AuditLogPage_Template_p_select_ngModelChange_33_listener($event) { return ctx.entityType.set($event || null); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 19)(35, "label");
            i0.ɵɵtext(36, "Action");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "p-select", 22);
            i0.ɵɵlistener("ngModelChange", function AuditLogPage_Template_p_select_ngModelChange_37_listener($event) { return ctx.action.set($event || null); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(38, "div", 19)(39, "label");
            i0.ɵɵtext(40, "User");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "p-select", 23);
            i0.ɵɵlistener("ngModelChange", function AuditLogPage_Template_p_select_ngModelChange_41_listener($event) { return ctx.userId.set($event || null); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "div", 19)(43, "label");
            i0.ɵɵtext(44, "From");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "p-datepicker", 24);
            i0.ɵɵlistener("ngModelChange", function AuditLogPage_Template_p_datepicker_ngModelChange_45_listener($event) { return ctx.fromDate.set($event || null); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "div", 19)(47, "label");
            i0.ɵɵtext(48, "To");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "p-datepicker", 24);
            i0.ɵɵlistener("ngModelChange", function AuditLogPage_Template_p_datepicker_ngModelChange_49_listener($event) { return ctx.toDate.set($event || null); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 25)(51, "button", 16);
            i0.ɵɵlistener("click", function AuditLogPage_Template_button_click_51_listener() { return ctx.onSearch(); });
            i0.ɵɵtext(52, " Apply filters ");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(53, "div", 26)(54, "p-table", 27);
            i0.ɵɵtemplate(55, AuditLogPage_ng_template_55_Template, 11, 0, "ng-template", 28)(56, AuditLogPage_ng_template_56_Template, 21, 14, "ng-template", 29)(57, AuditLogPage_ng_template_57_Template, 9, 0, "ng-template", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "div", 31)(59, "div", 32);
            i0.ɵɵtext(60);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "p-paginator", 33);
            i0.ɵɵlistener("onPageChange", function AuditLogPage_Template_p_paginator_onPageChange_61_listener($event) { return ctx.onPageChange($event); });
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(29);
            i0.ɵɵproperty("ngModel", ctx.search());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.entityOptions)("ngModel", ctx.entityType());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.actionOptions)("ngModel", ctx.action());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.userOptions)("ngModel", ctx.userId());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngModel", ctx.fromDate())("showIcon", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngModel", ctx.toDate())("showIcon", true);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("value", ctx.items())("loading", ctx.loading())("rowHover", true);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate2(" Showing ", ctx.items().length, " of ", ctx.total(), " events ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("rows", ctx.pageSize())("totalRecords", ctx.total())("first", (ctx.page() - 1) * ctx.pageSize())("rowsPerPageOptions", i0.ɵɵpureFunction0(20, _c0));
        } }, dependencies: [NgIf,
            FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, ButtonModule, i2.ButtonDirective, i3.PrimeTemplate, DatePickerModule, i4.DatePicker, InputTextModule, i5.InputText, PaginatorModule, i6.Paginator, SelectModule, i7.Select, TableModule, i8.Table, TagModule, i9.Tag, TooltipModule, i10.Tooltip, BreadcrumbsComponent,
            DatePipe], styles: ["@use '../../../../../styles/design-tokens' as *;\n\n.page-background[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  overflow: hidden;\n  pointer-events: none;\n}\n\n.animated-orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  pointer-events: none;\n  z-index: 0;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 320px;\n    height: 320px;\n    background: $primary-gradient;\n    top: -120px;\n    right: -60px;\n    animation-delay: 0s;\n  }\n\n  &.orb-2 {\n    width: 340px;\n    height: 340px;\n    background: $cyan-gradient;\n    bottom: 12%;\n    left: -100px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 260px;\n    height: 260px;\n    background: $purple-gradient;\n    top: 55%;\n    right: 12%;\n    animation-delay: -14s;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(-20px, 20px) scale(0.95); }\n  75% { transform: translate(25px, 10px) scale(1.02); }\n}\n\n.page-hero[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: $space-6;\n  padding: $space-6;\n  margin-bottom: $space-5;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  animation: _ngcontent-%COMP%_fade-in-down 0.6s ease-out;\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-down {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.hero-eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: $primary;\n  margin-bottom: $space-2;\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  flex-wrap: wrap;\n}\n\n.glass-card[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n}\n\n.filter-panel[_ngcontent-%COMP%] {\n  padding: $space-5;\n  margin-bottom: $space-5;\n}\n\n.filter-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: $space-4;\n}\n\n.filter-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n\n  label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $text-muted;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n  }\n}\n\n.filter-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  justify-content: flex-end;\n}\n\n.table-panel[_ngcontent-%COMP%] {\n  padding: $space-4;\n}\n\n[_nghost-%COMP%]     .audit-table {\n  border-radius: $radius-2xl;\n  overflow: hidden;\n}\n\n[_nghost-%COMP%]     .audit-table .p-datatable-header {\n  background: transparent;\n  border: none;\n}\n\n[_nghost-%COMP%]     .audit-table .p-datatable-thead > tr > th {\n  background: rgba(255, 255, 255, 0.85);\n  color: $text-muted;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  border: none;\n  padding: $space-3 $space-4;\n}\n\n[_nghost-%COMP%]     .audit-table .p-datatable-tbody > tr > td {\n  background: rgba(255, 255, 255, 0.75);\n  border: none;\n  border-top: 1px solid rgba($glass-border, 0.6);\n  padding: $space-3 $space-4;\n  vertical-align: top;\n}\n\n.time-cell[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $text-primary;\n  white-space: nowrap;\n}\n\n.entity-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.entity-type[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.entity-id[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.change-cell[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.change-notes[_ngcontent-%COMP%] {\n  margin-top: $space-1;\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.user-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.user-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.user-email[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-4;\n  justify-content: center;\n  color: $text-muted;\n\n  i {\n    font-size: 1.5rem;\n    color: $primary;\n  }\n}\n\n.empty-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.empty-subtitle[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.table-footer[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-4;\n  padding: $space-4 $space-2 0;\n}\n\n.footer-summary[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n@media (max-width: 1100px) {\n  .filter-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 860px) {\n  .page-hero[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n\n@media (max-width: 720px) {\n  .filter-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .table-footer[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuditLogPage, [{
        type: Component,
        args: [{ selector: 'app-audit-log-page', standalone: true, imports: [
                    NgIf,
                    FormsModule,
                    DatePipe,
                    ButtonModule,
                    DatePickerModule,
                    InputTextModule,
                    PaginatorModule,
                    SelectModule,
                    TableModule,
                    TagModule,
                    TooltipModule,
                    BreadcrumbsComponent
                ], template: "<div class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n</div>\n\n<div class=\"page-container\">\n  <div class=\"page-content\">\n    <app-breadcrumbs></app-breadcrumbs>\n\n    <header class=\"page-hero\">\n      <div class=\"hero-content\">\n        <span class=\"hero-eyebrow\">\n          <i class=\"pi pi-shield\"></i>\n          Audit Log\n        </span>\n        <h1 class=\"hero-title\">\n          <span class=\"title-gradient\">Security</span>\n          <span class=\"title-light\">& Activity Trail</span>\n        </h1>\n        <p class=\"hero-subtitle\">\n          Track critical changes across CRM records with time, user, and context.\n        </p>\n      </div>\n      <div class=\"hero-actions\">\n        <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" (click)=\"onSearch()\">\n          Refresh\n        </button>\n        <button pButton type=\"button\" class=\"crm-button crm-button--primary\" (click)=\"resetFilters()\">\n          Reset filters\n        </button>\n      </div>\n    </header>\n\n    <div class=\"glass-card filter-panel\">\n      <div class=\"filter-grid\">\n        <div class=\"filter-field\">\n          <label>Search</label>\n          <input\n            pInputText\n            placeholder=\"Entity id, field, value, or notes\"\n            [ngModel]=\"search()\"\n            (ngModelChange)=\"search.set($event)\"\n            class=\"w-full\"\n          />\n        </div>\n        <div class=\"filter-field\">\n          <label>Entity</label>\n          <p-select\n            [options]=\"entityOptions\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"entityType()\"\n            (ngModelChange)=\"entityType.set($event || null)\"\n            placeholder=\"All entities\"\n            appendTo=\"body\"\n            styleClass=\"w-full\"\n          ></p-select>\n        </div>\n        <div class=\"filter-field\">\n          <label>Action</label>\n          <p-select\n            [options]=\"actionOptions\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"action()\"\n            (ngModelChange)=\"action.set($event || null)\"\n            placeholder=\"All actions\"\n            appendTo=\"body\"\n            styleClass=\"w-full\"\n          ></p-select>\n        </div>\n        <div class=\"filter-field\">\n          <label>User</label>\n          <p-select\n            [options]=\"userOptions\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            [ngModel]=\"userId()\"\n            (ngModelChange)=\"userId.set($event || null)\"\n            placeholder=\"All users\"\n            appendTo=\"body\"\n            styleClass=\"w-full\"\n          ></p-select>\n        </div>\n        <div class=\"filter-field\">\n          <label>From</label>\n          <p-datepicker\n            [ngModel]=\"fromDate()\"\n            (ngModelChange)=\"fromDate.set($event || null)\"\n            dateFormat=\"yy-mm-dd\"\n            [showIcon]=\"true\"\n            appendTo=\"body\"\n            styleClass=\"w-full\"\n          ></p-datepicker>\n        </div>\n        <div class=\"filter-field\">\n          <label>To</label>\n          <p-datepicker\n            [ngModel]=\"toDate()\"\n            (ngModelChange)=\"toDate.set($event || null)\"\n            dateFormat=\"yy-mm-dd\"\n            [showIcon]=\"true\"\n            appendTo=\"body\"\n            styleClass=\"w-full\"\n          ></p-datepicker>\n        </div>\n        <div class=\"filter-actions\">\n          <button pButton type=\"button\" class=\"crm-button crm-button--primary\" (click)=\"onSearch()\">\n            Apply filters\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"glass-card table-panel\">\n      <p-table\n        [value]=\"items()\"\n        [loading]=\"loading()\"\n        [rowHover]=\"true\"\n        dataKey=\"id\"\n        styleClass=\"audit-table\"\n      >\n        <ng-template pTemplate=\"header\">\n          <tr>\n            <th class=\"col-time\">Time</th>\n            <th class=\"col-entity\">Entity</th>\n            <th class=\"col-action\">Action</th>\n            <th class=\"col-change\">Change</th>\n            <th class=\"col-user\">User</th>\n          </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-item>\n          <tr>\n            <td class=\"col-time\">\n              <div class=\"time-cell\">{{ item.createdAtUtc | date:'medium' }}</div>\n            </td>\n            <td class=\"col-entity\">\n              <div class=\"entity-cell\">\n                <span class=\"entity-type\">{{ item.entityType }}</span>\n                <span class=\"entity-id\" *ngIf=\"item.entityId\">{{ item.entityId }}</span>\n              </div>\n            </td>\n            <td class=\"col-action\">\n              <p-tag [value]=\"item.action\" [severity]=\"auditTagSeverity(item.action)\"></p-tag>\n            </td>\n            <td class=\"col-change\">\n              <div class=\"change-cell\" pTooltip=\"{{ changeDetail(item) }}\" tooltipPosition=\"top\">\n                {{ changeSummary(item) }}\n              </div>\n              <div class=\"change-notes\" *ngIf=\"item.notes\">{{ item.notes }}</div>\n            </td>\n            <td class=\"col-user\">\n              <div class=\"user-cell\">\n                <span class=\"user-name\">{{ item.changedByName || 'System' }}</span>\n                <span class=\"user-email\" *ngIf=\"item.changedByUserId\">{{ item.changedByUserId }}</span>\n              </div>\n            </td>\n          </tr>\n        </ng-template>\n        <ng-template pTemplate=\"emptymessage\">\n          <tr>\n            <td colspan=\"5\">\n              <div class=\"empty-state\">\n                <i class=\"pi pi-clipboard\"></i>\n                <div>\n                  <div class=\"empty-title\">No audit activity yet</div>\n                  <div class=\"empty-subtitle\">Try adjusting filters or check back later.</div>\n                </div>\n              </div>\n            </td>\n          </tr>\n        </ng-template>\n      </p-table>\n\n      <div class=\"table-footer\">\n        <div class=\"footer-summary\">\n          Showing {{ items().length }} of {{ total() }} events\n        </div>\n        <p-paginator\n          [rows]=\"pageSize()\"\n          [totalRecords]=\"total()\"\n          [first]=\"(page() - 1) * pageSize()\"\n          [rowsPerPageOptions]=\"[10, 20, 50]\"\n          (onPageChange)=\"onPageChange($event)\"\n        ></p-paginator>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n\n.page-background {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  overflow: hidden;\n  pointer-events: none;\n}\n\n.animated-orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  pointer-events: none;\n  z-index: 0;\n  animation: orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 320px;\n    height: 320px;\n    background: $primary-gradient;\n    top: -120px;\n    right: -60px;\n    animation-delay: 0s;\n  }\n\n  &.orb-2 {\n    width: 340px;\n    height: 340px;\n    background: $cyan-gradient;\n    bottom: 12%;\n    left: -100px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 260px;\n    height: 260px;\n    background: $purple-gradient;\n    top: 55%;\n    right: 12%;\n    animation-delay: -14s;\n  }\n}\n\n@keyframes orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(-20px, 20px) scale(0.95); }\n  75% { transform: translate(25px, 10px) scale(1.02); }\n}\n\n.page-hero {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: $space-6;\n  padding: $space-6;\n  margin-bottom: $space-5;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  animation: fade-in-down 0.6s ease-out;\n}\n\n@keyframes fade-in-down {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.hero-content {\n  flex: 1;\n}\n\n.hero-eyebrow {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: $primary;\n  margin-bottom: $space-2;\n}\n\n.hero-actions {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  flex-wrap: wrap;\n}\n\n.glass-card {\n  position: relative;\n  z-index: 1;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n}\n\n.filter-panel {\n  padding: $space-5;\n  margin-bottom: $space-5;\n}\n\n.filter-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: $space-4;\n}\n\n.filter-field {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n\n  label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $text-muted;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n  }\n}\n\n.filter-actions {\n  display: flex;\n  align-items: flex-end;\n  justify-content: flex-end;\n}\n\n.table-panel {\n  padding: $space-4;\n}\n\n:host ::ng-deep .audit-table {\n  border-radius: $radius-2xl;\n  overflow: hidden;\n}\n\n:host ::ng-deep .audit-table .p-datatable-header {\n  background: transparent;\n  border: none;\n}\n\n:host ::ng-deep .audit-table .p-datatable-thead > tr > th {\n  background: rgba(255, 255, 255, 0.85);\n  color: $text-muted;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  border: none;\n  padding: $space-3 $space-4;\n}\n\n:host ::ng-deep .audit-table .p-datatable-tbody > tr > td {\n  background: rgba(255, 255, 255, 0.75);\n  border: none;\n  border-top: 1px solid rgba($glass-border, 0.6);\n  padding: $space-3 $space-4;\n  vertical-align: top;\n}\n\n.time-cell {\n  font-weight: 600;\n  color: $text-primary;\n  white-space: nowrap;\n}\n\n.entity-cell {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.entity-type {\n  font-weight: 700;\n  color: $text-primary;\n}\n\n.entity-id {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.change-cell {\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.change-notes {\n  margin-top: $space-1;\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.user-cell {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.user-name {\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.user-email {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.empty-state {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-4;\n  justify-content: center;\n  color: $text-muted;\n\n  i {\n    font-size: 1.5rem;\n    color: $primary;\n  }\n}\n\n.empty-title {\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.empty-subtitle {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.table-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-4;\n  padding: $space-4 $space-2 0;\n}\n\n.footer-summary {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n@media (max-width: 1100px) {\n  .filter-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n\n@media (max-width: 860px) {\n  .page-hero {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n\n@media (max-width: 720px) {\n  .filter-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .table-footer {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AuditLogPage, { className: "AuditLogPage", filePath: "src/app/crm/features/settings/pages/audit-log.page.ts", lineNumber: 43 }); })();
