import { NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
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
import * as i10 from "primeng/skeleton";
import * as i11 from "primeng/table";
import * as i12 from "primeng/tag";
const _c0 = () => ({ width: "480px" });
const _c1 = () => [1, 2, 3];
const _c2 = () => ({ "min-width": "40rem" });
function LookupCurrenciesPage_button_50_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 56);
    i0.ɵɵlistener("click", function LookupCurrenciesPage_button_50_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreate()); });
    i0.ɵɵelementStart(1, "span", 29);
    i0.ɵɵelement(2, "i", 57);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "New Currency");
    i0.ɵɵelementEnd()();
} }
function LookupCurrenciesPage_div_51_p_skeleton_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-skeleton", 60);
} }
function LookupCurrenciesPage_div_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58);
    i0.ɵɵtemplate(1, LookupCurrenciesPage_div_51_p_skeleton_1_Template, 1, 0, "p-skeleton", 59);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c1));
} }
function LookupCurrenciesPage_p_table_52_ng_template_1_th_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 66);
    i0.ɵɵtext(1, "Actions");
    i0.ɵɵelementEnd();
} }
function LookupCurrenciesPage_p_table_52_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Code");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Symbol");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Active");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Sort Order");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, LookupCurrenciesPage_p_table_52_ng_template_1_th_11_Template, 2, 0, "th", 65);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", ctx_r1.canManage());
} }
function LookupCurrenciesPage_p_table_52_ng_template_2_p_tag_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 72);
} if (rf & 2) {
    i0.ɵɵproperty("rounded", true);
} }
function LookupCurrenciesPage_p_table_52_ng_template_2_p_tag_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 73);
} if (rf & 2) {
    i0.ɵɵproperty("rounded", true);
} }
function LookupCurrenciesPage_p_table_52_ng_template_2_td_13_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td")(1, "div", 74)(2, "button", 75);
    i0.ɵɵlistener("click", function LookupCurrenciesPage_p_table_52_ng_template_2_td_13_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r3); const row_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openEdit(row_r4)); });
    i0.ɵɵelement(3, "i", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 76);
    i0.ɵɵlistener("click", function LookupCurrenciesPage_p_table_52_ng_template_2_td_13_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const row_r4 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.deleteItem(row_r4)); });
    i0.ɵɵelement(5, "i", 77);
    i0.ɵɵelementEnd()()();
} }
function LookupCurrenciesPage_p_table_52_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 67)(1, "td")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td", 68);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td");
    i0.ɵɵtemplate(9, LookupCurrenciesPage_p_table_52_ng_template_2_p_tag_9_Template, 1, 1, "p-tag", 69)(10, LookupCurrenciesPage_p_table_52_ng_template_2_p_tag_10_Template, 1, 1, "p-tag", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, LookupCurrenciesPage_p_table_52_ng_template_2_td_13_Template, 6, 0, "td", 71);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(row_r4.code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r4.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r4.symbol);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", row_r4.isActive);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !row_r4.isActive);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r4.sortOrder);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.canManage());
} }
function LookupCurrenciesPage_p_table_52_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 78);
    i0.ɵɵtext(2, "No currencies configured yet.");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵattribute("colspan", ctx_r1.canManage() ? 6 : 5);
} }
function LookupCurrenciesPage_p_table_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-table", 61);
    i0.ɵɵtemplate(1, LookupCurrenciesPage_p_table_52_ng_template_1_Template, 12, 1, "ng-template", 62)(2, LookupCurrenciesPage_p_table_52_ng_template_2_Template, 14, 7, "ng-template", 63)(3, LookupCurrenciesPage_p_table_52_ng_template_3_Template, 3, 1, "ng-template", 64);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", ctx_r1.items())("rows", 20)("paginator", ctx_r1.items().length > 20)("rowHover", true)("tableStyle", i0.ɵɵpureFunction0(5, _c2));
} }
export class LookupCurrenciesPage {
    dataService = inject(LookupDataService);
    toastService = inject(AppToastService);
    fb = inject(FormBuilder);
    items = signal([], ...(ngDevMode ? [{ debugName: "items" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    editorOpen = signal(false, ...(ngDevMode ? [{ debugName: "editorOpen" }] : []));
    editing = signal(null, ...(ngDevMode ? [{ debugName: "editing" }] : []));
    canManage = signal(false, ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    activeCount = computed(() => this.items().filter(i => i.isActive).length, ...(ngDevMode ? [{ debugName: "activeCount" }] : []));
    form = this.fb.group({
        code: ['', [Validators.required, Validators.maxLength(3)]],
        name: ['', [Validators.required]],
        symbol: ['', [Validators.required, Validators.maxLength(5)]],
        isActive: [true],
        sortOrder: [0, [Validators.min(0)]]
    });
    constructor() {
        this.canManage.set(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage));
        this.loadItems();
    }
    loadItems() {
        this.loading.set(true);
        this.dataService.getCurrencies(true).subscribe({
            next: (data) => { this.items.set(data ?? []); this.loading.set(false); },
            error: () => { this.loading.set(false); this.toast('error', 'Unable to load currencies'); }
        });
    }
    openCreate() {
        this.editing.set(null);
        this.form.reset({ code: '', name: '', symbol: '', isActive: true, sortOrder: this.nextOrder() });
        this.editorOpen.set(true);
    }
    openEdit(item) {
        this.editing.set(item);
        this.form.reset({ code: item.code, name: item.name, symbol: item.symbol, isActive: item.isActive, sortOrder: item.sortOrder });
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
        const body = {
            code: v.code?.trim().toUpperCase() ?? '',
            name: v.name?.trim() ?? '',
            symbol: v.symbol?.trim() ?? '',
            isActive: v.isActive ?? true,
            sortOrder: v.sortOrder ?? 0
        };
        this.saving.set(true);
        const current = this.editing();
        const req = current
            ? this.dataService.updateCurrency(current.id, body)
            : this.dataService.createCurrency(body);
        req.subscribe({
            next: () => {
                this.saving.set(false);
                this.toast('success', current ? 'Currency updated' : 'Currency created');
                this.closeEditor();
                this.loadItems();
            },
            error: (err) => {
                this.saving.set(false);
                this.toast('error', err?.error ?? 'Unable to save currency');
            }
        });
    }
    deleteItem(item) {
        if (!this.canManage() || this.saving())
            return;
        if (!confirm(`Delete "${item.code} — ${item.name}"?`))
            return;
        this.saving.set(true);
        this.dataService.deleteCurrency(item.id).subscribe({
            next: () => { this.saving.set(false); this.toast('success', 'Currency deleted'); this.loadItems(); },
            error: (err) => { this.saving.set(false); this.toast('error', err?.error ?? 'Unable to delete currency'); }
        });
    }
    nextOrder() {
        const list = this.items();
        return list.length === 0 ? 0 : Math.max(...list.map(i => i.sortOrder)) + 1;
    }
    toast(tone, message) {
        this.toastService.show(tone, message);
    }
    static ɵfac = function LookupCurrenciesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LookupCurrenciesPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LookupCurrenciesPage, selectors: [["app-lookup-currencies-page"]], decls: 94, vars: 19, consts: [[1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], ["routerLink", "/app/settings", 1, "back-link"], [1, "pi", "pi-arrow-left"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "hero-description"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-dollar"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-glow"], [1, "visual-card", "visual-card--success"], [1, "pi", "pi-check-circle"], [1, "data-section"], [1, "data-card"], [1, "data-header"], [1, "header-actions"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click", "disabled"], [1, "action-btn__icon"], [1, "pi", "pi-refresh"], ["type", "button", "class", "action-btn action-btn--add", 3, "click", 4, "ngIf"], ["class", "skeleton-rows", 4, "ngIf"], ["styleClass", "p-datatable-sm", 3, "value", "rows", "paginator", "rowHover", "tableStyle", 4, "ngIf"], [3, "visibleChange", "onHide", "header", "visible", "modal", "closable", "draggable"], [3, "ngSubmit", "formGroup"], [1, "dialog-body"], [1, "form-field"], ["for", "lu-code"], [1, "required"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-tag"], ["pInputText", "", "id", "lu-code", "formControlName", "code", "placeholder", "e.g. USD", "maxlength", "3"], ["for", "lu-name"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-pencil"], ["pInputText", "", "id", "lu-name", "formControlName", "name", "placeholder", "e.g. US Dollar"], ["for", "lu-symbol"], [1, "icon-addon", "icon-addon--warning"], ["pInputText", "", "id", "lu-symbol", "formControlName", "symbol", "placeholder", "e.g. $", "maxlength", "5"], ["for", "lu-sort"], ["id", "lu-sort", "formControlName", "sortOrder", 3, "min", "showButtons"], ["formControlName", "isActive", "label", "Active", 3, "binary"], [1, "dialog-footer"], ["type", "button", "pButton", "", "label", "Cancel", 1, "p-button-text", 3, "click"], ["type", "submit", "pButton", "", "label", "Save", "icon", "pi pi-check", 3, "loading"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click"], [1, "pi", "pi-plus"], [1, "skeleton-rows"], ["height", "3rem", "styleClass", "mb-2", 4, "ngFor", "ngForOf"], ["height", "3rem", "styleClass", "mb-2"], ["styleClass", "p-datatable-sm", 3, "value", "rows", "paginator", "rowHover", "tableStyle"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], ["style", "width: 7rem", 4, "ngIf"], [2, "width", "7rem"], [1, "table-row"], [1, "symbol-cell"], ["severity", "success", "value", "Active", 3, "rounded", 4, "ngIf"], ["severity", "warn", "value", "Inactive", 3, "rounded", 4, "ngIf"], [4, "ngIf"], ["severity", "success", "value", "Active", 3, "rounded"], ["severity", "warn", "value", "Inactive", 3, "rounded"], [1, "row-actions"], ["type", "button", "title", "Edit", 1, "row-action-btn", "row-action-btn--edit", 3, "click"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click"], [1, "pi", "pi-trash"], [1, "empty-message"]], template: function LookupCurrenciesPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵelement(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "section", 5)(6, "div", 6);
            i0.ɵɵelement(7, "app-breadcrumbs");
            i0.ɵɵelementStart(8, "a", 7);
            i0.ɵɵelement(9, "i", 8);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Back to Settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 9);
            i0.ɵɵelement(13, "span", 10);
            i0.ɵɵtext(14, " Data & Lookups ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "h1", 11)(16, "span", 12);
            i0.ɵɵtext(17, "Currencies");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(18, "p", 13);
            i0.ɵɵtext(19, "Manage the list of available currencies across the platform.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(20, "div", 14)(21, "div", 15)(22, "div", 16);
            i0.ɵɵelement(23, "i", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 18)(25, "span", 19);
            i0.ɵɵtext(26, "Total Currencies");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "strong", 20);
            i0.ɵɵtext(28);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(29, "div", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 22)(31, "div", 16);
            i0.ɵɵelement(32, "i", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "div", 18)(34, "span", 19);
            i0.ɵɵtext(35, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "strong", 20);
            i0.ɵɵtext(37);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(38, "div", 21);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(39, "section", 24)(40, "div", 25)(41, "div", 26)(42, "h2");
            i0.ɵɵtext(43, "Currency List");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 27)(45, "button", 28);
            i0.ɵɵlistener("click", function LookupCurrenciesPage_Template_button_click_45_listener() { return ctx.loadItems(); });
            i0.ɵɵelementStart(46, "span", 29);
            i0.ɵɵelement(47, "i", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "span");
            i0.ɵɵtext(49, "Refresh");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(50, LookupCurrenciesPage_button_50_Template, 5, 0, "button", 31);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(51, LookupCurrenciesPage_div_51_Template, 2, 2, "div", 32)(52, LookupCurrenciesPage_p_table_52_Template, 4, 6, "p-table", 33);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(53, "p-dialog", 34);
            i0.ɵɵtwoWayListener("visibleChange", function LookupCurrenciesPage_Template_p_dialog_visibleChange_53_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.editorOpen, $event) || (ctx.editorOpen = $event); return $event; });
            i0.ɵɵlistener("onHide", function LookupCurrenciesPage_Template_p_dialog_onHide_53_listener() { return ctx.closeEditor(); });
            i0.ɵɵelementStart(54, "form", 35);
            i0.ɵɵlistener("ngSubmit", function LookupCurrenciesPage_Template_form_ngSubmit_54_listener() { return ctx.save(); });
            i0.ɵɵelementStart(55, "div", 36)(56, "div", 37)(57, "label", 38);
            i0.ɵɵtext(58, "Code ");
            i0.ɵɵelementStart(59, "span", 39);
            i0.ɵɵtext(60, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(61, "p-inputgroup")(62, "p-inputgroup-addon", 40);
            i0.ɵɵelement(63, "i", 41);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(64, "input", 42);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(65, "div", 37)(66, "label", 43);
            i0.ɵɵtext(67, "Name ");
            i0.ɵɵelementStart(68, "span", 39);
            i0.ɵɵtext(69, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(70, "p-inputgroup")(71, "p-inputgroup-addon", 44);
            i0.ɵɵelement(72, "i", 45);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(73, "input", 46);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(74, "div", 37)(75, "label", 47);
            i0.ɵɵtext(76, "Symbol ");
            i0.ɵɵelementStart(77, "span", 39);
            i0.ɵɵtext(78, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(79, "p-inputgroup")(80, "p-inputgroup-addon", 48);
            i0.ɵɵelement(81, "i", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(82, "input", 49);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(83, "div", 37)(84, "label", 50);
            i0.ɵɵtext(85, "Sort Order");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(86, "p-inputNumber", 51);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(87, "div", 37)(88, "label");
            i0.ɵɵtext(89, "\u00A0");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(90, "p-checkbox", 52);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(91, "div", 53)(92, "button", 54);
            i0.ɵɵlistener("click", function LookupCurrenciesPage_Template_button_click_92_listener() { return ctx.closeEditor(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelement(93, "button", 55);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(28);
            i0.ɵɵtextInterpolate(ctx.items().length);
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.activeCount());
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.canManage());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(18, _c0));
            i0.ɵɵproperty("header", ctx.editing() ? "Edit Currency" : "New Currency");
            i0.ɵɵtwoWayProperty("visible", ctx.editorOpen);
            i0.ɵɵproperty("modal", true)("closable", true)("draggable", false);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(32);
            i0.ɵɵproperty("min", 0)("showButtons", true);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("binary", true);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("loading", ctx.saving());
        } }, dependencies: [BreadcrumbsComponent, ButtonModule, i1.ButtonDirective, i2.PrimeTemplate, CheckboxModule, i3.Checkbox, DialogModule, i4.Dialog, InputGroupModule, i5.InputGroup, InputGroupAddonModule, i6.InputGroupAddon, InputNumberModule, i7.InputNumber, InputTextModule, i8.InputText, NgFor, NgIf, ReactiveFormsModule, i9.ɵNgNoValidate, i9.DefaultValueAccessor, i9.NgControlStatus, i9.NgControlStatusGroup, i9.MaxLengthValidator, i9.FormGroupDirective, i9.FormControlName, RouterLink,
            SkeletonModule, i10.Skeleton, TableModule, i11.Table, TagModule, i12.Tag, TooltipModule], styles: ["@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n\n\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) { padding: $space-3; }\n}\n\n\n\n.bg-orbs[_ngcontent-%COMP%] { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }\n.orb[_ngcontent-%COMP%] { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.4; animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite; }\n.orb-1[_ngcontent-%COMP%] { width: 600px; height: 600px; background: $primary-gradient; top: -200px; right: -100px; }\n.orb-2[_ngcontent-%COMP%] { width: 400px; height: 400px; background: $cyan-gradient; bottom: 10%; left: -100px; animation-delay: -7s; }\n.orb-3[_ngcontent-%COMP%] { width: 300px; height: 300px; background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); top: 40%; right: 20%; animation-delay: -14s; }\n\n\n\n.hero-section[_ngcontent-%COMP%] {\n  position: relative; z-index: 1;\n  display: grid; grid-template-columns: 1fr auto; gap: $space-6;\n  margin-bottom: $space-5; animation: _ngcontent-%COMP%_fade-in-up 0.6s ease-out;\n  @media (max-width: 1200px) { grid-template-columns: 1fr; gap: $space-4; }\n}\n\n.hero-content[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: $space-2; }\n\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex; align-items: center; gap: $space-2;\n  color: $gray-500; font-size: $font-size-sm; font-weight: 500; text-decoration: none;\n  transition: color 200ms;\n  &:hover { color: #667eea; }\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex; align-items: center; gap: $space-2;\n  padding: $space-1 $space-3; background: $glass-bg; backdrop-filter: blur(20px);\n  border: 1px solid $glass-border; border-radius: 9999px;\n  font-size: $font-size-sm; font-weight: 600; color: #667eea;\n  text-transform: uppercase; letter-spacing: 0.1em; width: fit-content; box-shadow: $glass-shadow;\n  .badge-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: _ngcontent-%COMP%_pulse-glow 2s ease-in-out infinite; }\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: 2rem; font-weight: 800; letter-spacing: -0.5px; line-height: 1.1; margin: 0 0 $space-1;\n  .title-gradient {\n    background: $primary-gradient; background-size: 200% auto;\n    -webkit-background-clip: text; -webkit-text-fill-color: transparent;\n    background-clip: text; animation: _ngcontent-%COMP%_gradient-shift 4s ease-in-out infinite;\n  }\n}\n\n.hero-description[_ngcontent-%COMP%] { font-size: $font-size-base; color: $gray-500; max-width: 500px; line-height: 1.6; margin: 0; }\n\n\n\n.hero-visual[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: $space-3; animation: _ngcontent-%COMP%_slide-in-right 0.6s ease-out 0.2s both; }\n\n.visual-card[_ngcontent-%COMP%] {\n  position: relative; display: flex; align-items: center; gap: $space-3;\n  padding: $space-3 $space-4; background: $glass-bg; backdrop-filter: blur(20px);\n  border: 1px solid $glass-border; border-radius: $radius-lg; box-shadow: $glass-shadow;\n  min-width: 200px; overflow: hidden; transition: transform 250ms, box-shadow 250ms;\n  &:hover { transform: translateY(-2px); box-shadow: $glass-shadow-hover; }\n  .card-icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: $radius-md; font-size: $font-size-xl; color: white; }\n  &--primary .card-icon { background: $primary-gradient; }\n  &--success .card-icon { background: $success-gradient; }\n  .card-label { font-size: $font-size-xs; color: $gray-500; text-transform: uppercase; letter-spacing: 0.05em; }\n  .card-value { font-size: $font-size-2xl; font-weight: 700; color: $gray-800; }\n  .card-glow { position: absolute; top: -50%; right: -50%; width: 100%; height: 100%; background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%); pointer-events: none; }\n}\n\n\n\n.data-section[_ngcontent-%COMP%] { position: relative; z-index: 1; animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out 0.4s both; }\n\n.data-card[_ngcontent-%COMP%] {\n  background: $glass-bg; backdrop-filter: blur(20px);\n  border: 1px solid $glass-border; border-radius: $radius-2xl; box-shadow: $glass-shadow; overflow: hidden;\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: $space-3;\n  padding: $space-3 $space-4; border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  h2 { margin: 0; font-size: $font-size-lg; font-weight: 600; color: $gray-800; }\n}\n\n.header-actions[_ngcontent-%COMP%] { display: flex; gap: $space-2; }\n\n.skeleton-rows[_ngcontent-%COMP%] { padding: $space-4; }\n\n.empty-message[_ngcontent-%COMP%] { text-align: center; padding: $space-6 !important; color: $gray-500; font-style: italic; }\n\n.symbol-cell[_ngcontent-%COMP%] { font-weight: 700; font-size: $font-size-lg; color: $gray-700; }\n\n\n\n[_nghost-%COMP%]     {\n  .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none; border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4; font-size: 0.72rem; font-weight: 600;\n    text-transform: uppercase; letter-spacing: 0.08em; color: #3b82f6;\n  }\n  .p-datatable-tbody > tr > td { vertical-align: middle; padding: $space-3 $space-2; }\n}\n\n.table-row[_ngcontent-%COMP%] {\n  transition: background 150ms; border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  &:last-child { border-bottom: none; }\n  &:hover { background: rgba(102, 126, 234, 0.03); }\n}\n\n\n\n.dialog-body[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: $space-4; padding: $space-4 0; }\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex; flex-direction: row; align-items: center; gap: 0.75rem;\n  & > label {\n    font-size: 0.8125rem; font-weight: 600; color: #475569;\n    min-width: 90px; flex-shrink: 0; text-align: right; white-space: nowrap;\n    transition: color 200ms;\n    .required { color: #ef4444; }\n  }\n  &:focus-within > label { color: #4f46e5; }\n  & > p-inputgroup, & > p-inputNumber, & > p-checkbox { flex: 1; min-width: 0; }\n}\n\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex; justify-content: flex-end; gap: $space-2; padding-top: $space-3;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n\n\n@keyframes _ngcontent-%COMP%_fade-in-up   { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }\n@keyframes _ngcontent-%COMP%_slide-in-right { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }\n@keyframes _ngcontent-%COMP%_gradient-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }\n@keyframes _ngcontent-%COMP%_pulse-glow     { 0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); } 50% { opacity: 0.8; box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); } }\n@keyframes _ngcontent-%COMP%_orb-float      { 0%, 100% { transform: translate(0, 0) scale(1); } 25% { transform: translate(50px, -30px) scale(1.1); } 50% { transform: translate(100px, 20px) scale(0.9); } 75% { transform: translate(30px, 50px) scale(1.05); } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LookupCurrenciesPage, [{
        type: Component,
        args: [{ selector: 'app-lookup-currencies-page', standalone: true, imports: [
                    BreadcrumbsComponent, ButtonModule, CheckboxModule, DialogModule,
                    InputGroupModule, InputGroupAddonModule, InputNumberModule, InputTextModule,
                    NgFor, NgIf, ReactiveFormsModule, RouterLink,
                    SkeletonModule, TableModule, TagModule, TooltipModule
                ], template: "<!-- Currencies Management Page -->\n<div class=\"page-container\">\n  <!-- Animated background -->\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <!-- Hero section -->\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <app-breadcrumbs />\n      <a class=\"back-link\" routerLink=\"/app/settings\">\n        <i class=\"pi pi-arrow-left\"></i>\n        <span>Back to Settings</span>\n      </a>\n\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        Data &amp; Lookups\n      </div>\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Currencies</span>\n      </h1>\n      <p class=\"hero-description\">Manage the list of available currencies across the platform.</p>\n    </div>\n\n    <!-- Visual summary card -->\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\"><i class=\"pi pi-dollar\"></i></div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Total Currencies</span>\n          <strong class=\"card-value\">{{ items().length }}</strong>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n      <div class=\"visual-card visual-card--success\">\n        <div class=\"card-icon\"><i class=\"pi pi-check-circle\"></i></div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Active</span>\n          <strong class=\"card-value\">{{ activeCount() }}</strong>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <!-- Data table section -->\n  <section class=\"data-section\">\n    <div class=\"data-card\">\n      <div class=\"data-header\">\n        <h2>Currency List</h2>\n        <div class=\"header-actions\">\n          <button type=\"button\" class=\"action-btn action-btn--refresh\" (click)=\"loadItems()\" [disabled]=\"loading()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n            <span>Refresh</span>\n          </button>\n          <button *ngIf=\"canManage()\" type=\"button\" class=\"action-btn action-btn--add\" (click)=\"openCreate()\">\n            <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n            <span>New Currency</span>\n          </button>\n        </div>\n      </div>\n\n      <!-- Skeleton loader -->\n      <div *ngIf=\"loading()\" class=\"skeleton-rows\">\n        <p-skeleton *ngFor=\"let r of [1,2,3]\" height=\"3rem\" styleClass=\"mb-2\" />\n      </div>\n\n      <!-- Table -->\n      <p-table *ngIf=\"!loading()\" [value]=\"items()\" [rows]=\"20\" [paginator]=\"items().length > 20\"\n               [rowHover]=\"true\" styleClass=\"p-datatable-sm\" [tableStyle]=\"{ 'min-width': '40rem' }\">\n        <ng-template pTemplate=\"header\">\n          <tr>\n            <th>Code</th>\n            <th>Name</th>\n            <th>Symbol</th>\n            <th>Active</th>\n            <th>Sort Order</th>\n            <th *ngIf=\"canManage()\" style=\"width: 7rem\">Actions</th>\n          </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-row>\n          <tr class=\"table-row\">\n            <td><strong>{{ row.code }}</strong></td>\n            <td>{{ row.name }}</td>\n            <td class=\"symbol-cell\">{{ row.symbol }}</td>\n            <td>\n              <p-tag *ngIf=\"row.isActive\" severity=\"success\" value=\"Active\" [rounded]=\"true\" />\n              <p-tag *ngIf=\"!row.isActive\" severity=\"warn\" value=\"Inactive\" [rounded]=\"true\" />\n            </td>\n            <td>{{ row.sortOrder }}</td>\n            <td *ngIf=\"canManage()\">\n              <div class=\"row-actions\">\n                <button type=\"button\" class=\"row-action-btn row-action-btn--edit\" title=\"Edit\" (click)=\"openEdit(row)\">\n                  <i class=\"pi pi-pencil\"></i>\n                </button>\n                <button type=\"button\" class=\"row-action-btn row-action-btn--delete\" title=\"Delete\" (click)=\"deleteItem(row)\">\n                  <i class=\"pi pi-trash\"></i>\n                </button>\n              </div>\n            </td>\n          </tr>\n        </ng-template>\n        <ng-template pTemplate=\"emptymessage\">\n          <tr><td [attr.colspan]=\"canManage() ? 6 : 5\" class=\"empty-message\">No currencies configured yet.</td></tr>\n        </ng-template>\n      </p-table>\n    </div>\n  </section>\n</div>\n\n<!-- Editor dialog -->\n<p-dialog [header]=\"editing() ? 'Edit Currency' : 'New Currency'\" [(visible)]=\"editorOpen\"\n          [modal]=\"true\" [style]=\"{ width: '480px' }\" [closable]=\"true\" (onHide)=\"closeEditor()\" [draggable]=\"false\">\n  <form [formGroup]=\"form\" (ngSubmit)=\"save()\">\n    <div class=\"dialog-body\">\n      <!-- Code -->\n      <div class=\"form-field\">\n        <label for=\"lu-code\">Code <span class=\"required\">*</span></label>\n        <p-inputgroup>\n          <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n            <i class=\"pi pi-tag\"></i>\n          </p-inputgroup-addon>\n          <input pInputText id=\"lu-code\" formControlName=\"code\" placeholder=\"e.g. USD\" maxlength=\"3\" />\n        </p-inputgroup>\n      </div>\n\n      <!-- Name -->\n      <div class=\"form-field\">\n        <label for=\"lu-name\">Name <span class=\"required\">*</span></label>\n        <p-inputgroup>\n          <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n            <i class=\"pi pi-pencil\"></i>\n          </p-inputgroup-addon>\n          <input pInputText id=\"lu-name\" formControlName=\"name\" placeholder=\"e.g. US Dollar\" />\n        </p-inputgroup>\n      </div>\n\n      <!-- Symbol -->\n      <div class=\"form-field\">\n        <label for=\"lu-symbol\">Symbol <span class=\"required\">*</span></label>\n        <p-inputgroup>\n          <p-inputgroup-addon class=\"icon-addon icon-addon--warning\">\n            <i class=\"pi pi-dollar\"></i>\n          </p-inputgroup-addon>\n          <input pInputText id=\"lu-symbol\" formControlName=\"symbol\" placeholder=\"e.g. $\" maxlength=\"5\" />\n        </p-inputgroup>\n      </div>\n\n      <!-- Sort Order -->\n      <div class=\"form-field\">\n        <label for=\"lu-sort\">Sort Order</label>\n        <p-inputNumber id=\"lu-sort\" formControlName=\"sortOrder\" [min]=\"0\" [showButtons]=\"true\" />\n      </div>\n\n      <!-- Is Active -->\n      <div class=\"form-field\">\n        <label>&nbsp;</label>\n        <p-checkbox formControlName=\"isActive\" [binary]=\"true\" label=\"Active\" />\n      </div>\n    </div>\n\n    <div class=\"dialog-footer\">\n      <button type=\"button\" pButton label=\"Cancel\" class=\"p-button-text\" (click)=\"closeEditor()\"></button>\n      <button type=\"submit\" pButton label=\"Save\" icon=\"pi pi-check\" [loading]=\"saving()\"></button>\n    </div>\n  </form>\n</p-dialog>\n", styles: ["@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n/* \u2500\u2500\u2500\u2500\u2500 page container \u2500\u2500\u2500\u2500\u2500 */\n.page-container {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) { padding: $space-3; }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500 animated orbs \u2500\u2500\u2500\u2500\u2500 */\n.bg-orbs { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }\n.orb { position: absolute; border-radius: 50%; filter: blur(60px); opacity: 0.4; animation: orb-float 20s ease-in-out infinite; }\n.orb-1 { width: 600px; height: 600px; background: $primary-gradient; top: -200px; right: -100px; }\n.orb-2 { width: 400px; height: 400px; background: $cyan-gradient; bottom: 10%; left: -100px; animation-delay: -7s; }\n.orb-3 { width: 300px; height: 300px; background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); top: 40%; right: 20%; animation-delay: -14s; }\n\n/* \u2500\u2500\u2500\u2500\u2500 hero \u2500\u2500\u2500\u2500\u2500 */\n.hero-section {\n  position: relative; z-index: 1;\n  display: grid; grid-template-columns: 1fr auto; gap: $space-6;\n  margin-bottom: $space-5; animation: fade-in-up 0.6s ease-out;\n  @media (max-width: 1200px) { grid-template-columns: 1fr; gap: $space-4; }\n}\n\n.hero-content { display: flex; flex-direction: column; gap: $space-2; }\n\n.back-link {\n  display: inline-flex; align-items: center; gap: $space-2;\n  color: $gray-500; font-size: $font-size-sm; font-weight: 500; text-decoration: none;\n  transition: color 200ms;\n  &:hover { color: #667eea; }\n}\n\n.hero-badge {\n  display: inline-flex; align-items: center; gap: $space-2;\n  padding: $space-1 $space-3; background: $glass-bg; backdrop-filter: blur(20px);\n  border: 1px solid $glass-border; border-radius: 9999px;\n  font-size: $font-size-sm; font-weight: 600; color: #667eea;\n  text-transform: uppercase; letter-spacing: 0.1em; width: fit-content; box-shadow: $glass-shadow;\n  .badge-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: pulse-glow 2s ease-in-out infinite; }\n}\n\n.hero-title {\n  font-size: 2rem; font-weight: 800; letter-spacing: -0.5px; line-height: 1.1; margin: 0 0 $space-1;\n  .title-gradient {\n    background: $primary-gradient; background-size: 200% auto;\n    -webkit-background-clip: text; -webkit-text-fill-color: transparent;\n    background-clip: text; animation: gradient-shift 4s ease-in-out infinite;\n  }\n}\n\n.hero-description { font-size: $font-size-base; color: $gray-500; max-width: 500px; line-height: 1.6; margin: 0; }\n\n/* \u2500\u2500\u2500\u2500\u2500 visual cards \u2500\u2500\u2500\u2500\u2500 */\n.hero-visual { display: flex; flex-direction: column; gap: $space-3; animation: slide-in-right 0.6s ease-out 0.2s both; }\n\n.visual-card {\n  position: relative; display: flex; align-items: center; gap: $space-3;\n  padding: $space-3 $space-4; background: $glass-bg; backdrop-filter: blur(20px);\n  border: 1px solid $glass-border; border-radius: $radius-lg; box-shadow: $glass-shadow;\n  min-width: 200px; overflow: hidden; transition: transform 250ms, box-shadow 250ms;\n  &:hover { transform: translateY(-2px); box-shadow: $glass-shadow-hover; }\n  .card-icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: $radius-md; font-size: $font-size-xl; color: white; }\n  &--primary .card-icon { background: $primary-gradient; }\n  &--success .card-icon { background: $success-gradient; }\n  .card-label { font-size: $font-size-xs; color: $gray-500; text-transform: uppercase; letter-spacing: 0.05em; }\n  .card-value { font-size: $font-size-2xl; font-weight: 700; color: $gray-800; }\n  .card-glow { position: absolute; top: -50%; right: -50%; width: 100%; height: 100%; background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%); pointer-events: none; }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500 data section \u2500\u2500\u2500\u2500\u2500 */\n.data-section { position: relative; z-index: 1; animation: fade-in-up 0.5s ease-out 0.4s both; }\n\n.data-card {\n  background: $glass-bg; backdrop-filter: blur(20px);\n  border: 1px solid $glass-border; border-radius: $radius-2xl; box-shadow: $glass-shadow; overflow: hidden;\n}\n\n.data-header {\n  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: $space-3;\n  padding: $space-3 $space-4; border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n  h2 { margin: 0; font-size: $font-size-lg; font-weight: 600; color: $gray-800; }\n}\n\n.header-actions { display: flex; gap: $space-2; }\n\n.skeleton-rows { padding: $space-4; }\n\n.empty-message { text-align: center; padding: $space-6 !important; color: $gray-500; font-style: italic; }\n\n.symbol-cell { font-weight: 700; font-size: $font-size-lg; color: $gray-700; }\n\n/* \u2500\u2500\u2500\u2500\u2500 table rows \u2500\u2500\u2500\u2500\u2500 */\n:host ::ng-deep {\n  .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none; border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4; font-size: 0.72rem; font-weight: 600;\n    text-transform: uppercase; letter-spacing: 0.08em; color: #3b82f6;\n  }\n  .p-datatable-tbody > tr > td { vertical-align: middle; padding: $space-3 $space-2; }\n}\n\n.table-row {\n  transition: background 150ms; border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n  &:last-child { border-bottom: none; }\n  &:hover { background: rgba(102, 126, 234, 0.03); }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500 dialog form \u2500\u2500\u2500\u2500\u2500 */\n.dialog-body { display: flex; flex-direction: column; gap: $space-4; padding: $space-4 0; }\n\n.form-field {\n  display: flex; flex-direction: row; align-items: center; gap: 0.75rem;\n  & > label {\n    font-size: 0.8125rem; font-weight: 600; color: #475569;\n    min-width: 90px; flex-shrink: 0; text-align: right; white-space: nowrap;\n    transition: color 200ms;\n    .required { color: #ef4444; }\n  }\n  &:focus-within > label { color: #4f46e5; }\n  & > p-inputgroup, & > p-inputNumber, & > p-checkbox { flex: 1; min-width: 0; }\n}\n\n.dialog-footer {\n  display: flex; justify-content: flex-end; gap: $space-2; padding-top: $space-3;\n  border-top: 1px solid rgba(0, 0, 0, 0.06);\n}\n\n/* \u2500\u2500\u2500\u2500\u2500 animations \u2500\u2500\u2500\u2500\u2500 */\n@keyframes fade-in-up   { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }\n@keyframes slide-in-right { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }\n@keyframes gradient-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }\n@keyframes pulse-glow     { 0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); } 50% { opacity: 0.8; box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); } }\n@keyframes orb-float      { 0%, 100% { transform: translate(0, 0) scale(1); } 25% { transform: translate(50px, -30px) scale(1.1); } 50% { transform: translate(100px, 20px) scale(0.9); } 75% { transform: translate(30px, 50px) scale(1.05); } }\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LookupCurrenciesPage, { className: "LookupCurrenciesPage", filePath: "src/app/crm/features/settings/pages/lookup-currencies.page.ts", lineNumber: 35 }); })();
