import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { LookupDataService } from '../services/lookup-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
import * as i2 from "primeng/api";
import * as i3 from "primeng/checkbox";
import * as i4 from "primeng/dialog";
import * as i5 from "primeng/inputgroup";
import * as i6 from "primeng/inputgroupaddon";
import * as i7 from "primeng/inputnumber";
import * as i8 from "primeng/inputtext";
import * as i9 from "@angular/forms";
import * as i10 from "primeng/table";
import * as i11 from "primeng/tag";
const _c0 = () => ({ width: "30rem" });
const _c1 = () => [0, 1, 2];
function LookupLeadStatusesPage_span_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 60);
    i0.ɵɵelement(1, "i", 61);
    i0.ɵɵtext(2, " Ready");
    i0.ɵɵelementEnd();
} }
function LookupLeadStatusesPage_div_58_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵelement(1, "div", 65)(2, "div", 66);
    i0.ɵɵelementEnd();
} }
function LookupLeadStatusesPage_div_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 62);
    i0.ɵɵtemplate(1, LookupLeadStatusesPage_div_58_div_1_Template, 3, 0, "div", 63);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c1));
} }
function LookupLeadStatusesPage_div_59_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Order");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Default");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Closed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 71);
    i0.ɵɵtext(10, "Actions");
    i0.ɵɵelementEnd()();
} }
function LookupLeadStatusesPage_div_59_ng_template_3_p_tag_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 83);
} }
function LookupLeadStatusesPage_div_59_ng_template_3_p_tag_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 84);
} }
function LookupLeadStatusesPage_div_59_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 72)(3, "span", 73);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, LookupLeadStatusesPage_div_59_ng_template_3_p_tag_5_Template, 1, 0, "p-tag", 74)(6, LookupLeadStatusesPage_div_59_ng_template_3_p_tag_6_Template, 1, 0, "p-tag", 75);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td")(8, "span", 76);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵelement(11, "i", 77);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵelement(13, "i", 77);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 71)(15, "div", 78)(16, "button", 79);
    i0.ɵɵlistener("click", function LookupLeadStatusesPage_div_59_ng_template_3_Template_button_click_16_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openEdit(item_r2)); });
    i0.ɵɵelement(17, "i", 80);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 81);
    i0.ɵɵlistener("click", function LookupLeadStatusesPage_div_59_ng_template_3_Template_button_click_18_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.deleteItem(item_r2)); });
    i0.ɵɵelement(19, "i", 82);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r2.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r2.isDefault);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r2.isClosed);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r2.order);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", item_r2.isDefault ? "pi-check-circle status-icon success" : "pi-circle-off status-icon muted");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", item_r2.isClosed ? "pi-check-circle status-icon success" : "pi-circle-off status-icon muted");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage() || item_r2.isDefault);
} }
function LookupLeadStatusesPage_div_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 67)(1, "p-table", 68);
    i0.ɵɵtemplate(2, LookupLeadStatusesPage_div_59_ng_template_2_Template, 11, 0, "ng-template", 69)(3, LookupLeadStatusesPage_div_59_ng_template_3_Template, 20, 8, "ng-template", 70);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.items());
} }
export class LookupLeadStatusesPage {
    dataService = inject(LookupDataService);
    toastService = inject(AppToastService);
    fb = inject(FormBuilder);
    items = signal([], ...(ngDevMode ? [{ debugName: "items" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    editorOpen = signal(false, ...(ngDevMode ? [{ debugName: "editorOpen" }] : []));
    editing = signal(null, ...(ngDevMode ? [{ debugName: "editing" }] : []));
    canManage = signal(false, ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    form = this.fb.group({
        name: ['', [Validators.required]],
        order: [0, [Validators.min(0)]],
        isDefault: [false],
        isClosed: [false]
    });
    constructor() {
        this.canManage.set(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage));
        this.loadItems();
    }
    loadItems() {
        this.loading.set(true);
        this.dataService.getLeadStatuses().subscribe({
            next: (data) => { this.items.set(data ?? []); this.loading.set(false); },
            error: () => { this.loading.set(false); this.toast('error', 'Unable to load lead statuses'); }
        });
    }
    openCreate() {
        this.editing.set(null);
        this.form.reset({ name: '', order: this.nextOrder(), isDefault: false, isClosed: false });
        this.editorOpen.set(true);
    }
    openEdit(item) {
        this.editing.set(item);
        this.form.reset({ name: item.name, order: item.order, isDefault: item.isDefault, isClosed: item.isClosed });
        this.editorOpen.set(true);
    }
    closeEditor() {
        this.editorOpen.set(false);
        this.form.markAsPristine();
        this.form.markAsUntouched();
    }
    save() {
        if (this.saving())
            return;
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const v = this.form.value;
        const body = { name: v.name?.trim() ?? '', order: v.order ?? 0, isDefault: v.isDefault ?? false, isClosed: v.isClosed ?? false };
        this.saving.set(true);
        const current = this.editing();
        const req = current
            ? this.dataService.updateLeadStatus(current.id, body)
            : this.dataService.createLeadStatus(body);
        req.subscribe({
            next: () => {
                this.saving.set(false);
                this.toast('success', current ? 'Lead status updated' : 'Lead status created');
                this.closeEditor();
                this.loadItems();
            },
            error: (err) => {
                this.saving.set(false);
                this.toast('error', err?.error ?? 'Unable to save lead status');
            }
        });
    }
    deleteItem(item) {
        if (!this.canManage() || this.saving())
            return;
        if (item.isDefault) {
            this.toast('error', 'Default status cannot be deleted');
            return;
        }
        if (!confirm(`Delete "${item.name}"? Leads using this status must be reassigned first.`))
            return;
        this.saving.set(true);
        this.dataService.deleteLeadStatus(item.id).subscribe({
            next: () => { this.saving.set(false); this.toast('success', 'Lead status deleted'); this.loadItems(); },
            error: (err) => { this.saving.set(false); this.toast('error', err?.error ?? 'Unable to delete — status may be in use'); }
        });
    }
    nextOrder() {
        const list = this.items();
        return list.length === 0 ? 0 : Math.max(...list.map(i => i.order)) + 1;
    }
    toast(tone, message) {
        this.toastService.show(tone, message);
    }
    static ɵfac = function LookupLeadStatusesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LookupLeadStatusesPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LookupLeadStatusesPage, selectors: [["app-lookup-lead-statuses-page"]], decls: 101, vars: 23, consts: [[1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-actions"], ["type", "button", "routerLink", "/app/settings", 1, "action-btn", "action-btn--back"], [1, "action-btn__icon"], [1, "pi", "pi-arrow-left"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click", "disabled"], [1, "pi", "pi-refresh"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "pi", "pi-plus"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-tag"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend"], [1, "pi", "pi-cog"], [1, "card-glow"], [1, "data-section"], [1, "data-card"], [1, "data-header"], [1, "header-title"], [1, "record-count"], [1, "header-actions"], ["class", "status-badge status-badge--success", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "table-wrapper", 4, "ngIf"], ["styleClass", "lookup-dialog", 3, "visibleChange", "onHide", "header", "visible", "modal", "draggable", "resizable"], [1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "dialog-body"], [1, "form-field"], ["for", "ls-name"], [1, "required"], [1, "form-field__input"], [1, "icon-addon", "icon-addon--name"], ["pInputText", "", "id", "ls-name", "formControlName", "name", "placeholder", "e.g. Qualified"], ["for", "ls-order"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-sort-numeric-up"], ["id", "ls-order", "formControlName", "order", "styleClass", "w-full", "inputStyleClass", "w-full", 3, "min", "showButtons"], [1, "form-field", "checkbox-row"], ["formControlName", "isDefault", 3, "binary"], [1, "checkbox-copy"], ["formControlName", "isClosed", 3, "binary"], [1, "dialog-footer"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", 3, "click"], ["pButton", "", "type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "status-badge", "status-badge--success"], [1, "pi", "pi-check"], [1, "loading-state"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton", "skeleton-text"], [1, "skeleton", "skeleton-input"], [1, "table-wrapper"], ["styleClass", "data-table", 3, "value"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "text-right"], [1, "level-name"], [1, "name"], ["severity", "success", "value", "Default", 4, "ngIf"], ["severity", "warn", "value", "Closed", 4, "ngIf"], [1, "rank-chip"], [1, "pi", 3, "ngClass"], [1, "row-actions"], ["type", "button", "title", "Edit", 1, "row-action-btn", "row-action-btn--edit", 3, "click", "disabled"], [1, "pi", "pi-pencil"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "pi", "pi-trash"], ["severity", "success", "value", "Default"], ["severity", "warn", "value", "Closed"]], template: function LookupLeadStatusesPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵelement(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 5)(7, "div", 6)(8, "div", 7);
            i0.ɵɵelement(9, "span", 8);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Data & Lookups");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 9)(13, "span", 10);
            i0.ɵɵtext(14, "Lead");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 11);
            i0.ɵɵtext(16, "Statuses");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 12);
            i0.ɵɵtext(18, " Manage the lifecycle statuses available for leads across your workspace. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 13)(20, "button", 14)(21, "span", 15);
            i0.ɵɵelement(22, "i", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span");
            i0.ɵɵtext(24, "Back to Settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "button", 17);
            i0.ɵɵlistener("click", function LookupLeadStatusesPage_Template_button_click_25_listener() { return ctx.loadItems(); });
            i0.ɵɵelementStart(26, "span", 15);
            i0.ɵɵelement(27, "i", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span");
            i0.ɵɵtext(29, "Reload");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "button", 19);
            i0.ɵɵlistener("click", function LookupLeadStatusesPage_Template_button_click_30_listener() { return ctx.openCreate(); });
            i0.ɵɵelementStart(31, "span", 15);
            i0.ɵɵelement(32, "i", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "span");
            i0.ɵɵtext(34, "New Status");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(35, "div", 21)(36, "div", 22)(37, "div", 23);
            i0.ɵɵelement(38, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 25)(40, "span", 26);
            i0.ɵɵtext(41, "Statuses");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(42, "strong", 27);
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "span", 28);
            i0.ɵɵelement(45, "i", 29);
            i0.ɵɵtext(46, " Configurable per workspace");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(47, "div", 30);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(48, "section", 31)(49, "div", 32)(50, "div", 33)(51, "div", 34)(52, "h2");
            i0.ɵɵtext(53, "Lead Status Catalog");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "span", 35);
            i0.ɵɵtext(55);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "div", 36);
            i0.ɵɵtemplate(57, LookupLeadStatusesPage_span_57_Template, 3, 0, "span", 37);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(58, LookupLeadStatusesPage_div_58_Template, 2, 2, "div", 38)(59, LookupLeadStatusesPage_div_59_Template, 4, 1, "div", 39);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(60, "p-dialog", 40);
            i0.ɵɵlistener("visibleChange", function LookupLeadStatusesPage_Template_p_dialog_visibleChange_60_listener($event) { return ctx.editorOpen.set($event); })("onHide", function LookupLeadStatusesPage_Template_p_dialog_onHide_60_listener() { return ctx.closeEditor(); });
            i0.ɵɵelementStart(61, "form", 41);
            i0.ɵɵlistener("ngSubmit", function LookupLeadStatusesPage_Template_form_ngSubmit_61_listener() { return ctx.save(); });
            i0.ɵɵelementStart(62, "div", 42)(63, "div", 43)(64, "label", 44);
            i0.ɵɵtext(65, "Name ");
            i0.ɵɵelementStart(66, "span", 45);
            i0.ɵɵtext(67, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(68, "div", 46)(69, "p-inputGroup")(70, "p-inputGroupAddon", 47);
            i0.ɵɵelement(71, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(72, "input", 48);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(73, "div", 43)(74, "label", 49);
            i0.ɵɵtext(75, "Order");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "div", 46)(77, "p-inputGroup")(78, "p-inputGroupAddon", 50);
            i0.ɵɵelement(79, "i", 51);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(80, "p-inputNumber", 52);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(81, "div", 53);
            i0.ɵɵelement(82, "p-checkbox", 54);
            i0.ɵɵelementStart(83, "div", 55)(84, "span");
            i0.ɵɵtext(85, "Default status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "small");
            i0.ɵɵtext(87, "Assigned to new leads automatically.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(88, "div", 53);
            i0.ɵɵelement(89, "p-checkbox", 56);
            i0.ɵɵelementStart(90, "div", 55)(91, "span");
            i0.ɵɵtext(92, "Closed status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(93, "small");
            i0.ɵɵtext(94, "Marks the lead as closed/resolved.");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(95, "div", 57)(96, "button", 58);
            i0.ɵɵlistener("click", function LookupLeadStatusesPage_Template_button_click_96_listener() { return ctx.closeEditor(); });
            i0.ɵɵtext(97, "Cancel");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(98, "button", 59)(99, "span");
            i0.ɵɵtext(100);
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(25);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(ctx.items().length);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate1("", ctx.items().length, " statuses defined");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(22, _c0));
            i0.ɵɵproperty("header", i0.ɵɵinterpolate(ctx.editing() ? "Edit Lead Status" : "Create Lead Status"))("visible", ctx.editorOpen())("modal", true)("draggable", false)("resizable", false);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("min", 0)("showButtons", true);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("binary", true);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("binary", true);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("disabled", ctx.saving());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.saving() ? "Saving\u2026" : "Save Status");
        } }, dependencies: [BreadcrumbsComponent, ButtonModule, i1.ButtonDirective, i2.PrimeTemplate, CheckboxModule, i3.Checkbox, DialogModule, i4.Dialog, InputGroupModule, i5.InputGroup, InputGroupAddonModule, i6.InputGroupAddon, InputNumberModule, i7.InputNumber, InputTextModule, i8.InputText, NgClass, NgFor, NgIf, ReactiveFormsModule, i9.ɵNgNoValidate, i9.DefaultValueAccessor, i9.NgControlStatus, i9.NgControlStatusGroup, i9.FormGroupDirective, i9.FormControlName, RouterLink,
            SkeletonModule, TableModule, i10.Table, TagModule, i11.Tag, TooltipModule], styles: ["\n\n\n\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.page-container[_ngcontent-%COMP%] {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: _ngcontent-%COMP%_float 20s ease-in-out infinite;\n}\n\n.orb-1[_ngcontent-%COMP%] {\n  width: 420px;\n  height: 420px;\n  background: linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(14, 165, 233, 0.12) 100%);\n  top: -120px;\n  right: -120px;\n  animation-delay: 0s;\n}\n\n.orb-2[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  background: linear-gradient(135deg, rgba(251, 146, 60, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%);\n  bottom: 20%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3[_ngcontent-%COMP%] {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.06) 100%);\n  top: 52%;\n  right: 8%;\n  animation-delay: -14s;\n}\n\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  33% { transform: translate(20px, -30px) scale(1.05); }\n  66% { transform: translate(-15px, 20px) scale(0.95); }\n}\n\n.hero-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  gap: 2rem;\n  grid-template-columns: minmax(0, 1fr);\n  margin-bottom: 2.5rem;\n\n  @media (min-width: 1024px) {\n    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);\n    align-items: center;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.4rem 1rem;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 999px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #1f2937;\n  width: fit-content;\n  backdrop-filter: blur(10px);\n}\n\n.badge-dot[_ngcontent-%COMP%] {\n  width: 0.5rem;\n  height: 0.5rem;\n  background: #6366f1;\n  border-radius: 999px;\n  box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);\n}\n\n.hero-description[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #475569;\n  margin: 0;\n  max-width: 36rem;\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 1.5rem;\n  padding: 1.5rem;\n  position: relative;\n  overflow: hidden;\n  backdrop-filter: blur(14px);\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1rem;\n  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);\n}\n\n.visual-card--primary[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] { background: rgba(99, 102, 241, 0.15); color: #4f46e5; }\n.visual-card--secondary[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] { background: rgba(16, 185, 129, 0.15); color: #059669; }\n.visual-card--success[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] { background: rgba(34, 197, 94, 0.15); color: #15803d; }\n\n.card-icon[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n  border-radius: 1rem;\n  display: grid;\n  place-items: center;\n  font-size: 1.5rem;\n}\n\n.card-content[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.3rem; }\n.card-label[_ngcontent-%COMP%] { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; }\n.card-value[_ngcontent-%COMP%] { font-size: 1.4rem; font-weight: 700; color: #0f172a; }\n.card-trend[_ngcontent-%COMP%] { font-size: 0.85rem; color: #64748b; display: flex; align-items: center; gap: 0.4rem; }\n\n.data-section[_ngcontent-%COMP%] { position: relative; z-index: 1; }\n\n.data-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.78);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 1.5rem;\n  padding: 1.5rem;\n  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);\n  backdrop-filter: blur(16px);\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n\n.record-count[_ngcontent-%COMP%] { color: #64748b; font-size: 0.9rem; }\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.8rem;\n  padding: 0.35rem 0.8rem;\n  border-radius: 999px;\n  font-weight: 600;\n}\n\n.status-badge--success[_ngcontent-%COMP%] { background: rgba(34, 197, 94, 0.15); color: #15803d; }\n\n.table-wrapper[_ngcontent-%COMP%] { width: 100%; }\n\n.level-name[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 0.75rem; }\n\n.rank-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.2rem 0.6rem;\n  border-radius: 999px;\n  background: rgba(99, 102, 241, 0.15);\n  color: #4f46e5;\n  font-weight: 600;\n}\n\n.status-icon.success[_ngcontent-%COMP%] { color: #16a34a; }\n.status-icon.muted[_ngcontent-%COMP%] { color: #cbd5f5; }\n\n.dialog-form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1.25rem; overflow-x: hidden; }\n.dialog-body[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1rem; overflow-x: hidden; }\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  > p-inputgroup, > p-inputGroup, > p-select, > p-inputnumber, > input, > textarea, > .form-field__input {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .form-field__input {\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n  }\n\n  input, textarea { border-radius: 12px; }\n  textarea { resize: vertical; min-height: 96px; }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n}\n\n.required[_ngcontent-%COMP%] { color: #ef4444; }\n\n.checkbox-row[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.65rem 0.75rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.65);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n\n  .checkbox-copy {\n    display: flex;\n    flex-direction: column;\n    gap: 0.15rem;\n    color: #0f172a;\n    font-weight: 500;\n\n    small { font-size: 0.75rem; color: #64748b; font-weight: 400; }\n  }\n}\n\n.dialog-footer[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: 0.75rem; }\n\n.btn[_ngcontent-%COMP%] { border-radius: 999px !important; }\n.btn-primary[_ngcontent-%COMP%] { background: linear-gradient(120deg, #4f46e5, #0ea5e9); border: none; color: white; }\n.btn-ghost[_ngcontent-%COMP%] { background: rgba(255, 255, 255, 0.65); border: 1px solid rgba(148, 163, 184, 0.3); color: #0f172a; }\n\n[_nghost-%COMP%]     .lookup-dialog .p-dialog {\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.82);\n  border: 1px solid rgba(148, 163, 184, 0.35);\n  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(18px) saturate(160%);\n}\n\n[_nghost-%COMP%]     .lookup-dialog .p-dialog-header, \n[_nghost-%COMP%]     .lookup-dialog .p-dialog-content, \n[_nghost-%COMP%]     .lookup-dialog .p-dialog-footer {\n  background: transparent;\n}\n\n[_nghost-%COMP%]     .lookup-dialog .p-dialog-content { overflow-x: hidden; }\n[_nghost-%COMP%]     .lookup-dialog .p-inputgroup { width: 100%; }\n\n.loading-state[_ngcontent-%COMP%] { padding: 1rem; }\n.skeleton-row[_ngcontent-%COMP%] { display: flex; gap: 1rem; margin-bottom: 1rem; }\n.skeleton[_ngcontent-%COMP%] { border-radius: 8px; background: rgba(148, 163, 184, 0.15); animation: _ngcontent-%COMP%_pulse 1.5s infinite; }\n.skeleton-text[_ngcontent-%COMP%] { width: 140px; height: 20px; }\n.skeleton-input[_ngcontent-%COMP%] { flex: 1; height: 20px; }\n@keyframes _ngcontent-%COMP%_pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LookupLeadStatusesPage, [{
        type: Component,
        args: [{ selector: 'app-lookup-lead-statuses-page', standalone: true, imports: [
                    BreadcrumbsComponent, ButtonModule, CheckboxModule, DialogModule,
                    InputGroupModule, InputGroupAddonModule, InputNumberModule, InputTextModule,
                    NgClass, NgFor, NgIf, ReactiveFormsModule, RouterLink,
                    SkeletonModule, TableModule, TagModule, TooltipModule
                ], template: "<div class=\"page-container\">\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Data & Lookups</span>\n      </div>\n\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Lead</span>\n        <span class=\"title-light\">Statuses</span>\n      </h1>\n\n      <p class=\"hero-description\">\n        Manage the lifecycle statuses available for leads across your workspace.\n      </p>\n\n      <div class=\"hero-actions\">\n        <button type=\"button\" class=\"action-btn action-btn--back\" routerLink=\"/app/settings\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-arrow-left\"></i></span>\n          <span>Back to Settings</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--refresh\" [disabled]=\"loading()\" (click)=\"loadItems()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n          <span>Reload</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"!canManage()\" (click)=\"openCreate()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n          <span>New Status</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\"><i class=\"pi pi-tag\"></i></div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Statuses</span>\n          <strong class=\"card-value\">{{ items().length }}</strong>\n          <span class=\"card-trend\"><i class=\"pi pi-cog\"></i> Configurable per workspace</span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"data-section\">\n    <div class=\"data-card\">\n      <div class=\"data-header\">\n        <div class=\"header-title\">\n          <h2>Lead Status Catalog</h2>\n          <span class=\"record-count\">{{ items().length }} statuses defined</span>\n        </div>\n        <div class=\"header-actions\">\n          <span class=\"status-badge status-badge--success\" *ngIf=\"!loading()\"><i class=\"pi pi-check\"></i> Ready</span>\n        </div>\n      </div>\n\n      <div class=\"loading-state\" *ngIf=\"loading()\">\n        <div class=\"skeleton-row\" *ngFor=\"let _ of [0, 1, 2]\">\n          <div class=\"skeleton skeleton-text\"></div>\n          <div class=\"skeleton skeleton-input\"></div>\n        </div>\n      </div>\n\n      <div class=\"table-wrapper\" *ngIf=\"!loading()\">\n        <p-table [value]=\"items()\" styleClass=\"data-table\">\n          <ng-template pTemplate=\"header\">\n            <tr>\n              <th>Name</th>\n              <th>Order</th>\n              <th>Default</th>\n              <th>Closed</th>\n              <th class=\"text-right\">Actions</th>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"body\" let-item>\n            <tr>\n              <td>\n                <div class=\"level-name\">\n                  <span class=\"name\">{{ item.name }}</span>\n                  <p-tag *ngIf=\"item.isDefault\" severity=\"success\" value=\"Default\"></p-tag>\n                  <p-tag *ngIf=\"item.isClosed\" severity=\"warn\" value=\"Closed\"></p-tag>\n                </div>\n              </td>\n              <td><span class=\"rank-chip\">{{ item.order }}</span></td>\n              <td>\n                <i class=\"pi\" [ngClass]=\"item.isDefault ? 'pi-check-circle status-icon success' : 'pi-circle-off status-icon muted'\"></i>\n              </td>\n              <td>\n                <i class=\"pi\" [ngClass]=\"item.isClosed ? 'pi-check-circle status-icon success' : 'pi-circle-off status-icon muted'\"></i>\n              </td>\n              <td class=\"text-right\">\n                <div class=\"row-actions\">\n                  <button type=\"button\" class=\"row-action-btn row-action-btn--edit\" title=\"Edit\" [disabled]=\"!canManage()\" (click)=\"openEdit(item)\">\n                    <i class=\"pi pi-pencil\"></i>\n                  </button>\n                  <button type=\"button\" class=\"row-action-btn row-action-btn--delete\" title=\"Delete\" [disabled]=\"!canManage() || item.isDefault\" (click)=\"deleteItem(item)\">\n                    <i class=\"pi pi-trash\"></i>\n                  </button>\n                </div>\n              </td>\n            </tr>\n          </ng-template>\n        </p-table>\n      </div>\n    </div>\n  </section>\n\n  <p-dialog\n    header=\"{{ editing() ? 'Edit Lead Status' : 'Create Lead Status' }}\"\n    [visible]=\"editorOpen()\"\n    (visibleChange)=\"editorOpen.set($event)\"\n    [modal]=\"true\"\n    styleClass=\"lookup-dialog\"\n    [style]=\"{ width: '30rem' }\"\n    [draggable]=\"false\"\n    [resizable]=\"false\"\n    (onHide)=\"closeEditor()\"\n  >\n    <form class=\"dialog-form\" [formGroup]=\"form\" (ngSubmit)=\"save()\">\n      <div class=\"dialog-body\">\n        <div class=\"form-field\">\n          <label for=\"ls-name\">Name <span class=\"required\">*</span></label>\n          <div class=\"form-field__input\">\n            <p-inputGroup>\n              <p-inputGroupAddon class=\"icon-addon icon-addon--name\"><i class=\"pi pi-tag\"></i></p-inputGroupAddon>\n              <input pInputText id=\"ls-name\" formControlName=\"name\" placeholder=\"e.g. Qualified\" />\n            </p-inputGroup>\n          </div>\n        </div>\n        <div class=\"form-field\">\n          <label for=\"ls-order\">Order</label>\n          <div class=\"form-field__input\">\n            <p-inputGroup>\n              <p-inputGroupAddon class=\"icon-addon icon-addon--info\"><i class=\"pi pi-sort-numeric-up\"></i></p-inputGroupAddon>\n              <p-inputNumber id=\"ls-order\" formControlName=\"order\" [min]=\"0\" [showButtons]=\"true\" styleClass=\"w-full\" inputStyleClass=\"w-full\"></p-inputNumber>\n            </p-inputGroup>\n          </div>\n        </div>\n        <div class=\"form-field checkbox-row\">\n          <p-checkbox formControlName=\"isDefault\" [binary]=\"true\"></p-checkbox>\n          <div class=\"checkbox-copy\">\n            <span>Default status</span>\n            <small>Assigned to new leads automatically.</small>\n          </div>\n        </div>\n        <div class=\"form-field checkbox-row\">\n          <p-checkbox formControlName=\"isClosed\" [binary]=\"true\"></p-checkbox>\n          <div class=\"checkbox-copy\">\n            <span>Closed status</span>\n            <small>Marks the lead as closed/resolved.</small>\n          </div>\n        </div>\n      </div>\n      <div class=\"dialog-footer\">\n        <button pButton type=\"button\" class=\"btn btn-ghost\" (click)=\"closeEditor()\">Cancel</button>\n        <button pButton type=\"submit\" class=\"btn btn-primary\" [disabled]=\"saving()\">\n          <span>{{ saving() ? 'Saving\u2026' : 'Save Status' }}</span>\n        </button>\n      </div>\n    </form>\n  </p-dialog>\n</div>\n", styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   LOOKUP PAGE - Premium Glass UI (matches settings style system)\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n:host {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.page-container {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: float 20s ease-in-out infinite;\n}\n\n.orb-1 {\n  width: 420px;\n  height: 420px;\n  background: linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(14, 165, 233, 0.12) 100%);\n  top: -120px;\n  right: -120px;\n  animation-delay: 0s;\n}\n\n.orb-2 {\n  width: 300px;\n  height: 300px;\n  background: linear-gradient(135deg, rgba(251, 146, 60, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%);\n  bottom: 20%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3 {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.06) 100%);\n  top: 52%;\n  right: 8%;\n  animation-delay: -14s;\n}\n\n@keyframes float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  33% { transform: translate(20px, -30px) scale(1.05); }\n  66% { transform: translate(-15px, 20px) scale(0.95); }\n}\n\n.hero-section {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  gap: 2rem;\n  grid-template-columns: minmax(0, 1fr);\n  margin-bottom: 2.5rem;\n\n  @media (min-width: 1024px) {\n    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);\n    align-items: center;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.4rem 1rem;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 999px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #1f2937;\n  width: fit-content;\n  backdrop-filter: blur(10px);\n}\n\n.badge-dot {\n  width: 0.5rem;\n  height: 0.5rem;\n  background: #6366f1;\n  border-radius: 999px;\n  box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);\n}\n\n.hero-description {\n  font-size: 1rem;\n  color: #475569;\n  margin: 0;\n  max-width: 36rem;\n}\n\n.hero-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.visual-card {\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 1.5rem;\n  padding: 1.5rem;\n  position: relative;\n  overflow: hidden;\n  backdrop-filter: blur(14px);\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1rem;\n  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);\n}\n\n.visual-card--primary .card-icon { background: rgba(99, 102, 241, 0.15); color: #4f46e5; }\n.visual-card--secondary .card-icon { background: rgba(16, 185, 129, 0.15); color: #059669; }\n.visual-card--success .card-icon { background: rgba(34, 197, 94, 0.15); color: #15803d; }\n\n.card-icon {\n  width: 3rem;\n  height: 3rem;\n  border-radius: 1rem;\n  display: grid;\n  place-items: center;\n  font-size: 1.5rem;\n}\n\n.card-content { display: flex; flex-direction: column; gap: 0.3rem; }\n.card-label { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; }\n.card-value { font-size: 1.4rem; font-weight: 700; color: #0f172a; }\n.card-trend { font-size: 0.85rem; color: #64748b; display: flex; align-items: center; gap: 0.4rem; }\n\n.data-section { position: relative; z-index: 1; }\n\n.data-card {\n  background: rgba(255, 255, 255, 0.78);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 1.5rem;\n  padding: 1.5rem;\n  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);\n  backdrop-filter: blur(16px);\n}\n\n.data-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n\n.record-count { color: #64748b; font-size: 0.9rem; }\n\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.8rem;\n  padding: 0.35rem 0.8rem;\n  border-radius: 999px;\n  font-weight: 600;\n}\n\n.status-badge--success { background: rgba(34, 197, 94, 0.15); color: #15803d; }\n\n.table-wrapper { width: 100%; }\n\n.level-name { display: flex; align-items: center; gap: 0.75rem; }\n\n.rank-chip {\n  display: inline-flex;\n  padding: 0.2rem 0.6rem;\n  border-radius: 999px;\n  background: rgba(99, 102, 241, 0.15);\n  color: #4f46e5;\n  font-weight: 600;\n}\n\n.status-icon.success { color: #16a34a; }\n.status-icon.muted { color: #cbd5f5; }\n\n.dialog-form { display: flex; flex-direction: column; gap: 1.25rem; overflow-x: hidden; }\n.dialog-body { display: flex; flex-direction: column; gap: 1rem; overflow-x: hidden; }\n\n.form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  > p-inputgroup, > p-inputGroup, > p-select, > p-inputnumber, > input, > textarea, > .form-field__input {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .form-field__input {\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n  }\n\n  input, textarea { border-radius: 12px; }\n  textarea { resize: vertical; min-height: 96px; }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n}\n\n.required { color: #ef4444; }\n\n.checkbox-row {\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.65rem 0.75rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.65);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n\n  .checkbox-copy {\n    display: flex;\n    flex-direction: column;\n    gap: 0.15rem;\n    color: #0f172a;\n    font-weight: 500;\n\n    small { font-size: 0.75rem; color: #64748b; font-weight: 400; }\n  }\n}\n\n.dialog-footer { display: flex; justify-content: flex-end; gap: 0.75rem; }\n\n.btn { border-radius: 999px !important; }\n.btn-primary { background: linear-gradient(120deg, #4f46e5, #0ea5e9); border: none; color: white; }\n.btn-ghost { background: rgba(255, 255, 255, 0.65); border: 1px solid rgba(148, 163, 184, 0.3); color: #0f172a; }\n\n:host ::ng-deep .lookup-dialog .p-dialog {\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.82);\n  border: 1px solid rgba(148, 163, 184, 0.35);\n  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(18px) saturate(160%);\n}\n\n:host ::ng-deep .lookup-dialog .p-dialog-header,\n:host ::ng-deep .lookup-dialog .p-dialog-content,\n:host ::ng-deep .lookup-dialog .p-dialog-footer {\n  background: transparent;\n}\n\n:host ::ng-deep .lookup-dialog .p-dialog-content { overflow-x: hidden; }\n:host ::ng-deep .lookup-dialog .p-inputgroup { width: 100%; }\n\n.loading-state { padding: 1rem; }\n.skeleton-row { display: flex; gap: 1rem; margin-bottom: 1rem; }\n.skeleton { border-radius: 8px; background: rgba(148, 163, 184, 0.15); animation: pulse 1.5s infinite; }\n.skeleton-text { width: 140px; height: 20px; }\n.skeleton-input { flex: 1; height: 20px; }\n@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LookupLeadStatusesPage, { className: "LookupLeadStatusesPage", filePath: "src/app/crm/features/settings/pages/lookup-lead-statuses.page.ts", lineNumber: 35 }); })();
