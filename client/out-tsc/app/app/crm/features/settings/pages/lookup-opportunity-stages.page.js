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
function LookupOpportunityStagesPage_span_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 63);
    i0.ɵɵelement(1, "i", 64);
    i0.ɵɵtext(2, " Ready");
    i0.ɵɵelementEnd();
} }
function LookupOpportunityStagesPage_div_58_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 67);
    i0.ɵɵelement(1, "div", 68)(2, "div", 69);
    i0.ɵɵelementEnd();
} }
function LookupOpportunityStagesPage_div_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65);
    i0.ɵɵtemplate(1, LookupOpportunityStagesPage_div_58_div_1_Template, 3, 0, "div", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c1));
} }
function LookupOpportunityStagesPage_div_59_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Order");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Closed Stage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Forecast Category");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 74);
    i0.ɵɵtext(10, "Actions");
    i0.ɵɵelementEnd()();
} }
function LookupOpportunityStagesPage_div_59_ng_template_3_p_tag_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 86);
} }
function LookupOpportunityStagesPage_div_59_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 75)(3, "span", 76);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, LookupOpportunityStagesPage_div_59_ng_template_3_p_tag_5_Template, 1, 0, "p-tag", 77);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td")(7, "span", 78);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td");
    i0.ɵɵelement(10, "i", 79);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td")(12, "span", 80);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "td", 74)(15, "div", 81)(16, "button", 82);
    i0.ɵɵlistener("click", function LookupOpportunityStagesPage_div_59_ng_template_3_Template_button_click_16_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openEdit(item_r2)); });
    i0.ɵɵelement(17, "i", 83);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 84);
    i0.ɵɵlistener("click", function LookupOpportunityStagesPage_div_59_ng_template_3_Template_button_click_18_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.deleteItem(item_r2)); });
    i0.ɵɵelement(19, "i", 85);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r2.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r2.isClosedStage);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r2.order);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", item_r2.isClosedStage ? "pi-check-circle status-icon success" : "pi-circle-off status-icon muted");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r2.forecastCategory || "\u2014");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.canManage());
} }
function LookupOpportunityStagesPage_div_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70)(1, "p-table", 71);
    i0.ɵɵtemplate(2, LookupOpportunityStagesPage_div_59_ng_template_2_Template, 11, 0, "ng-template", 72)(3, LookupOpportunityStagesPage_div_59_ng_template_3_Template, 20, 7, "ng-template", 73);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.items());
} }
export class LookupOpportunityStagesPage {
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
        isClosedStage: [false],
        forecastCategory: ['']
    });
    constructor() {
        this.canManage.set(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage));
        this.loadItems();
    }
    loadItems() {
        this.loading.set(true);
        this.dataService.getOpportunityStages().subscribe({
            next: (data) => { this.items.set(data ?? []); this.loading.set(false); },
            error: () => { this.loading.set(false); this.toast('error', 'Unable to load opportunity stages'); }
        });
    }
    openCreate() {
        this.editing.set(null);
        this.form.reset({ name: '', order: this.nextOrder(), isClosedStage: false, forecastCategory: '' });
        this.editorOpen.set(true);
    }
    openEdit(item) {
        this.editing.set(item);
        this.form.reset({ name: item.name, order: item.order, isClosedStage: item.isClosedStage, forecastCategory: item.forecastCategory ?? '' });
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
            name: v.name?.trim() ?? '',
            order: v.order ?? 0,
            isClosedStage: v.isClosedStage ?? false,
            forecastCategory: v.forecastCategory?.trim() || null
        };
        this.saving.set(true);
        const current = this.editing();
        const req = current
            ? this.dataService.updateOpportunityStage(current.id, body)
            : this.dataService.createOpportunityStage(body);
        req.subscribe({
            next: () => {
                this.saving.set(false);
                this.toast('success', current ? 'Stage updated' : 'Stage created');
                this.closeEditor();
                this.loadItems();
            },
            error: (err) => {
                this.saving.set(false);
                this.toast('error', err?.error ?? 'Unable to save stage');
            }
        });
    }
    deleteItem(item) {
        if (!this.canManage() || this.saving())
            return;
        if (!confirm(`Delete "${item.name}"? Opportunities using this stage must be reassigned first.`))
            return;
        this.saving.set(true);
        this.dataService.deleteOpportunityStage(item.id).subscribe({
            next: () => { this.saving.set(false); this.toast('success', 'Stage deleted'); this.loadItems(); },
            error: (err) => { this.saving.set(false); this.toast('error', err?.error ?? 'Unable to delete — stage may be in use'); }
        });
    }
    nextOrder() {
        const list = this.items();
        return list.length === 0 ? 0 : Math.max(...list.map(i => i.order)) + 1;
    }
    toast(tone, message) {
        this.toastService.show(tone, message);
    }
    static ɵfac = function LookupOpportunityStagesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LookupOpportunityStagesPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LookupOpportunityStagesPage, selectors: [["app-lookup-opportunity-stages-page"]], decls: 102, vars: 22, consts: [[1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-actions"], ["type", "button", "routerLink", "/app/settings", 1, "action-btn", "action-btn--back"], [1, "action-btn__icon"], [1, "pi", "pi-arrow-left"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click", "disabled"], [1, "pi", "pi-refresh"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "pi", "pi-plus"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-chart-bar"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend"], [1, "pi", "pi-cog"], [1, "card-glow"], [1, "data-section"], [1, "data-card"], [1, "data-header"], [1, "header-title"], [1, "record-count"], [1, "header-actions"], ["class", "status-badge status-badge--success", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "table-wrapper", 4, "ngIf"], ["styleClass", "lookup-dialog", 3, "visibleChange", "onHide", "header", "visible", "modal", "draggable", "resizable"], [1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "dialog-body"], [1, "form-field"], ["for", "os-name"], [1, "required"], [1, "form-field__input"], [1, "icon-addon", "icon-addon--name"], ["pInputText", "", "id", "os-name", "formControlName", "name", "placeholder", "e.g. Negotiation"], ["for", "os-order"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-sort-numeric-up"], ["id", "os-order", "formControlName", "order", "styleClass", "w-full", "inputStyleClass", "w-full", 3, "min", "showButtons"], ["for", "os-forecast"], [1, "icon-addon", "icon-addon--industry"], [1, "pi", "pi-chart-line"], ["pInputText", "", "id", "os-forecast", "formControlName", "forecastCategory", "placeholder", "e.g. Pipeline, Best Case, Closed"], [1, "form-field", "checkbox-row"], ["formControlName", "isClosedStage", 3, "binary"], [1, "checkbox-copy"], [1, "dialog-footer"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", 3, "click"], ["pButton", "", "type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "status-badge", "status-badge--success"], [1, "pi", "pi-check"], [1, "loading-state"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton", "skeleton-text"], [1, "skeleton", "skeleton-input"], [1, "table-wrapper"], ["styleClass", "data-table", 3, "value"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "text-right"], [1, "level-name"], [1, "name"], ["severity", "warn", "value", "Closed", 4, "ngIf"], [1, "rank-chip"], [1, "pi", 3, "ngClass"], [1, "forecast-text"], [1, "row-actions"], ["type", "button", "title", "Edit", 1, "row-action-btn", "row-action-btn--edit", 3, "click", "disabled"], [1, "pi", "pi-pencil"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "pi", "pi-trash"], ["severity", "warn", "value", "Closed"]], template: function LookupOpportunityStagesPage_Template(rf, ctx) { if (rf & 1) {
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
            i0.ɵɵtext(14, "Opportunity");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 11);
            i0.ɵɵtext(16, "Stages");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 12);
            i0.ɵɵtext(18, " Define the pipeline stages that opportunities progress through from prospecting to close. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 13)(20, "button", 14)(21, "span", 15);
            i0.ɵɵelement(22, "i", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span");
            i0.ɵɵtext(24, "Back to Settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "button", 17);
            i0.ɵɵlistener("click", function LookupOpportunityStagesPage_Template_button_click_25_listener() { return ctx.loadItems(); });
            i0.ɵɵelementStart(26, "span", 15);
            i0.ɵɵelement(27, "i", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span");
            i0.ɵɵtext(29, "Reload");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "button", 19);
            i0.ɵɵlistener("click", function LookupOpportunityStagesPage_Template_button_click_30_listener() { return ctx.openCreate(); });
            i0.ɵɵelementStart(31, "span", 15);
            i0.ɵɵelement(32, "i", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "span");
            i0.ɵɵtext(34, "New Stage");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(35, "div", 21)(36, "div", 22)(37, "div", 23);
            i0.ɵɵelement(38, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 25)(40, "span", 26);
            i0.ɵɵtext(41, "Pipeline Stages");
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
            i0.ɵɵtext(53, "Opportunity Stage Catalog");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "span", 35);
            i0.ɵɵtext(55);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "div", 36);
            i0.ɵɵtemplate(57, LookupOpportunityStagesPage_span_57_Template, 3, 0, "span", 37);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(58, LookupOpportunityStagesPage_div_58_Template, 2, 2, "div", 38)(59, LookupOpportunityStagesPage_div_59_Template, 4, 1, "div", 39);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(60, "p-dialog", 40);
            i0.ɵɵlistener("visibleChange", function LookupOpportunityStagesPage_Template_p_dialog_visibleChange_60_listener($event) { return ctx.editorOpen.set($event); })("onHide", function LookupOpportunityStagesPage_Template_p_dialog_onHide_60_listener() { return ctx.closeEditor(); });
            i0.ɵɵelementStart(61, "form", 41);
            i0.ɵɵlistener("ngSubmit", function LookupOpportunityStagesPage_Template_form_ngSubmit_61_listener() { return ctx.save(); });
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
            i0.ɵɵelementStart(81, "div", 43)(82, "label", 53);
            i0.ɵɵtext(83, "Forecast Category");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "div", 46)(85, "p-inputGroup")(86, "p-inputGroupAddon", 54);
            i0.ɵɵelement(87, "i", 55);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(88, "input", 56);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(89, "div", 57);
            i0.ɵɵelement(90, "p-checkbox", 58);
            i0.ɵɵelementStart(91, "div", 59)(92, "span");
            i0.ɵɵtext(93, "Closed stage");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "small");
            i0.ɵɵtext(95, "Marks the opportunity as won or lost.");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(96, "div", 60)(97, "button", 61);
            i0.ɵɵlistener("click", function LookupOpportunityStagesPage_Template_button_click_97_listener() { return ctx.closeEditor(); });
            i0.ɵɵtext(98, "Cancel");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(99, "button", 62)(100, "span");
            i0.ɵɵtext(101);
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(25);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(ctx.items().length);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate1("", ctx.items().length, " stages defined");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(21, _c0));
            i0.ɵɵproperty("header", i0.ɵɵinterpolate(ctx.editing() ? "Edit Opportunity Stage" : "Create Opportunity Stage"))("visible", ctx.editorOpen())("modal", true)("draggable", false)("resizable", false);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("min", 0)("showButtons", true);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("binary", true);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("disabled", ctx.saving());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.saving() ? "Saving\u2026" : "Save Stage");
        } }, dependencies: [BreadcrumbsComponent, ButtonModule, i1.ButtonDirective, i2.PrimeTemplate, CheckboxModule, i3.Checkbox, DialogModule, i4.Dialog, InputGroupModule, i5.InputGroup, InputGroupAddonModule, i6.InputGroupAddon, InputNumberModule, i7.InputNumber, InputTextModule, i8.InputText, NgClass, NgFor, NgIf, ReactiveFormsModule, i9.ɵNgNoValidate, i9.DefaultValueAccessor, i9.NgControlStatus, i9.NgControlStatusGroup, i9.FormGroupDirective, i9.FormControlName, RouterLink,
            SkeletonModule, TableModule, i10.Table, TagModule, i11.Tag, TooltipModule], styles: ["@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.page-container[_ngcontent-%COMP%] {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n.bg-orbs[_ngcontent-%COMP%] { position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }\n.orb[_ngcontent-%COMP%] { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.5; animation: _ngcontent-%COMP%_float 20s ease-in-out infinite; }\n.orb-1[_ngcontent-%COMP%] { width: 420px; height: 420px; background: linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(14, 165, 233, 0.12) 100%); top: -120px; right: -120px; }\n.orb-2[_ngcontent-%COMP%] { width: 300px; height: 300px; background: linear-gradient(135deg, rgba(251, 146, 60, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%); bottom: 20%; left: -80px; animation-delay: -7s; }\n.orb-3[_ngcontent-%COMP%] { width: 250px; height: 250px; background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.06) 100%); top: 52%; right: 8%; animation-delay: -14s; }\n@keyframes _ngcontent-%COMP%_float { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(20px, -30px) scale(1.05); } 66% { transform: translate(-15px, 20px) scale(0.95); } }\n\n.hero-section[_ngcontent-%COMP%] { position: relative; z-index: 1; display: grid; gap: 2rem; grid-template-columns: minmax(0, 1fr); margin-bottom: 2.5rem;\n  @media (min-width: 1024px) { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); align-items: center; }\n}\n.hero-content[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1.25rem; }\n.hero-badge[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.4rem 1rem; background: rgba(255, 255, 255, 0.7); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 999px; font-size: 0.85rem; font-weight: 600; color: #1f2937; width: fit-content; backdrop-filter: blur(10px); }\n.badge-dot[_ngcontent-%COMP%] { width: 0.5rem; height: 0.5rem; background: #6366f1; border-radius: 999px; box-shadow: 0 0 12px rgba(99, 102, 241, 0.4); }\n.hero-description[_ngcontent-%COMP%] { font-size: 1rem; color: #475569; margin: 0; max-width: 36rem; }\n.hero-actions[_ngcontent-%COMP%] { display: flex; flex-wrap: wrap; gap: 0.75rem; }\n\n.visual-card[_ngcontent-%COMP%] { background: rgba(255, 255, 255, 0.75); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 1.5rem; padding: 1.5rem; position: relative; overflow: hidden; backdrop-filter: blur(14px); display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); }\n.visual-card--primary[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] { background: rgba(99, 102, 241, 0.15); color: #4f46e5; }\n.card-icon[_ngcontent-%COMP%] { width: 3rem; height: 3rem; border-radius: 1rem; display: grid; place-items: center; font-size: 1.5rem; }\n.card-content[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 0.3rem; }\n.card-label[_ngcontent-%COMP%] { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; }\n.card-value[_ngcontent-%COMP%] { font-size: 1.4rem; font-weight: 700; color: #0f172a; }\n.card-trend[_ngcontent-%COMP%] { font-size: 0.85rem; color: #64748b; display: flex; align-items: center; gap: 0.4rem; }\n\n.data-section[_ngcontent-%COMP%] { position: relative; z-index: 1; }\n.data-card[_ngcontent-%COMP%] { background: rgba(255, 255, 255, 0.78); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 1.5rem; padding: 1.5rem; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); backdrop-filter: blur(16px); }\n.data-header[_ngcontent-%COMP%] { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }\n.record-count[_ngcontent-%COMP%] { color: #64748b; font-size: 0.9rem; }\n.status-badge[_ngcontent-%COMP%] { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; padding: 0.35rem 0.8rem; border-radius: 999px; font-weight: 600; }\n.status-badge--success[_ngcontent-%COMP%] { background: rgba(34, 197, 94, 0.15); color: #15803d; }\n.table-wrapper[_ngcontent-%COMP%] { width: 100%; }\n.level-name[_ngcontent-%COMP%] { display: flex; align-items: center; gap: 0.75rem; }\n.rank-chip[_ngcontent-%COMP%] { display: inline-flex; padding: 0.2rem 0.6rem; border-radius: 999px; background: rgba(99, 102, 241, 0.15); color: #4f46e5; font-weight: 600; }\n.forecast-text[_ngcontent-%COMP%] { color: #475569; font-size: 0.9rem; }\n.status-icon.success[_ngcontent-%COMP%] { color: #16a34a; }\n.status-icon.muted[_ngcontent-%COMP%] { color: #cbd5f5; }\n\n.dialog-form[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1.25rem; overflow-x: hidden; }\n.dialog-body[_ngcontent-%COMP%] { display: flex; flex-direction: column; gap: 1rem; overflow-x: hidden; }\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex; flex-direction: row; align-items: center; gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem; border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35); border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif; font-size: 0.8125rem; font-weight: 600; color: #475569; letter-spacing: 0.01em; white-space: nowrap; min-width: 110px; flex-shrink: 0; text-align: right; transition: color 0.2s ease; }\n  > p-inputgroup, > p-inputGroup, > p-select, > .form-field__input { flex: 1; min-width: 0; }\n  .form-field__input { display: flex; flex-direction: column; gap: 0.25rem; }\n  input { border-radius: 12px; }\n  &:hover { background: rgba(255, 255, 255, 0.5); border-color: rgba(148, 163, 184, 0.16); > label { color: #334155; } }\n  &:focus-within { background: rgba(255, 255, 255, 0.72); border-color: rgba(var(--apple-blue), 0.22); box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07); > label { color: #4f46e5; } }\n}\n\n.required[_ngcontent-%COMP%] { color: #ef4444; }\n.checkbox-row[_ngcontent-%COMP%] { flex-direction: row; align-items: center; gap: 0.75rem; padding: 0.65rem 0.75rem; border-radius: 12px; background: rgba(255, 255, 255, 0.65); border: 1px solid rgba(148, 163, 184, 0.3);\n  .checkbox-copy { display: flex; flex-direction: column; gap: 0.15rem; color: #0f172a; font-weight: 500; small { font-size: 0.75rem; color: #64748b; font-weight: 400; } }\n}\n\n.dialog-footer[_ngcontent-%COMP%] { display: flex; justify-content: flex-end; gap: 0.75rem; }\n.btn[_ngcontent-%COMP%] { border-radius: 999px !important; }\n.btn-primary[_ngcontent-%COMP%] { background: linear-gradient(120deg, #4f46e5, #0ea5e9); border: none; color: white; }\n.btn-ghost[_ngcontent-%COMP%] { background: rgba(255, 255, 255, 0.65); border: 1px solid rgba(148, 163, 184, 0.3); color: #0f172a; }\n\n[_nghost-%COMP%]     .lookup-dialog .p-dialog { overflow: hidden; background: rgba(255, 255, 255, 0.82); border: 1px solid rgba(148, 163, 184, 0.35); box-shadow: 0 24px 60px rgba(15, 23, 42, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.6); backdrop-filter: blur(18px) saturate(160%); }\n[_nghost-%COMP%]     .lookup-dialog .p-dialog-header, [_nghost-%COMP%]     .lookup-dialog .p-dialog-content, [_nghost-%COMP%]     .lookup-dialog .p-dialog-footer { background: transparent; }\n[_nghost-%COMP%]     .lookup-dialog .p-dialog-content { overflow-x: hidden; }\n[_nghost-%COMP%]     .lookup-dialog .p-inputgroup { width: 100%; }\n\n.loading-state[_ngcontent-%COMP%] { padding: 1rem; }\n.skeleton-row[_ngcontent-%COMP%] { display: flex; gap: 1rem; margin-bottom: 1rem; }\n.skeleton[_ngcontent-%COMP%] { border-radius: 8px; background: rgba(148, 163, 184, 0.15); animation: _ngcontent-%COMP%_pulse 1.5s infinite; }\n.skeleton-text[_ngcontent-%COMP%] { width: 140px; height: 20px; }\n.skeleton-input[_ngcontent-%COMP%] { flex: 1; height: 20px; }\n@keyframes _ngcontent-%COMP%_pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LookupOpportunityStagesPage, [{
        type: Component,
        args: [{ selector: 'app-lookup-opportunity-stages-page', standalone: true, imports: [
                    BreadcrumbsComponent, ButtonModule, CheckboxModule, DialogModule,
                    InputGroupModule, InputGroupAddonModule, InputNumberModule, InputTextModule,
                    NgClass, NgFor, NgIf, ReactiveFormsModule, RouterLink,
                    SkeletonModule, TableModule, TagModule, TooltipModule
                ], template: "<div class=\"page-container\">\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Data & Lookups</span>\n      </div>\n\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Opportunity</span>\n        <span class=\"title-light\">Stages</span>\n      </h1>\n\n      <p class=\"hero-description\">\n        Define the pipeline stages that opportunities progress through from prospecting to close.\n      </p>\n\n      <div class=\"hero-actions\">\n        <button type=\"button\" class=\"action-btn action-btn--back\" routerLink=\"/app/settings\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-arrow-left\"></i></span>\n          <span>Back to Settings</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--refresh\" [disabled]=\"loading()\" (click)=\"loadItems()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n          <span>Reload</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"!canManage()\" (click)=\"openCreate()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n          <span>New Stage</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\"><i class=\"pi pi-chart-bar\"></i></div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Pipeline Stages</span>\n          <strong class=\"card-value\">{{ items().length }}</strong>\n          <span class=\"card-trend\"><i class=\"pi pi-cog\"></i> Configurable per workspace</span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"data-section\">\n    <div class=\"data-card\">\n      <div class=\"data-header\">\n        <div class=\"header-title\">\n          <h2>Opportunity Stage Catalog</h2>\n          <span class=\"record-count\">{{ items().length }} stages defined</span>\n        </div>\n        <div class=\"header-actions\">\n          <span class=\"status-badge status-badge--success\" *ngIf=\"!loading()\"><i class=\"pi pi-check\"></i> Ready</span>\n        </div>\n      </div>\n\n      <div class=\"loading-state\" *ngIf=\"loading()\">\n        <div class=\"skeleton-row\" *ngFor=\"let _ of [0, 1, 2]\">\n          <div class=\"skeleton skeleton-text\"></div>\n          <div class=\"skeleton skeleton-input\"></div>\n        </div>\n      </div>\n\n      <div class=\"table-wrapper\" *ngIf=\"!loading()\">\n        <p-table [value]=\"items()\" styleClass=\"data-table\">\n          <ng-template pTemplate=\"header\">\n            <tr>\n              <th>Name</th>\n              <th>Order</th>\n              <th>Closed Stage</th>\n              <th>Forecast Category</th>\n              <th class=\"text-right\">Actions</th>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"body\" let-item>\n            <tr>\n              <td>\n                <div class=\"level-name\">\n                  <span class=\"name\">{{ item.name }}</span>\n                  <p-tag *ngIf=\"item.isClosedStage\" severity=\"warn\" value=\"Closed\"></p-tag>\n                </div>\n              </td>\n              <td><span class=\"rank-chip\">{{ item.order }}</span></td>\n              <td>\n                <i class=\"pi\" [ngClass]=\"item.isClosedStage ? 'pi-check-circle status-icon success' : 'pi-circle-off status-icon muted'\"></i>\n              </td>\n              <td>\n                <span class=\"forecast-text\">{{ item.forecastCategory || '\u2014' }}</span>\n              </td>\n              <td class=\"text-right\">\n                <div class=\"row-actions\">\n                  <button type=\"button\" class=\"row-action-btn row-action-btn--edit\" title=\"Edit\" [disabled]=\"!canManage()\" (click)=\"openEdit(item)\">\n                    <i class=\"pi pi-pencil\"></i>\n                  </button>\n                  <button type=\"button\" class=\"row-action-btn row-action-btn--delete\" title=\"Delete\" [disabled]=\"!canManage()\" (click)=\"deleteItem(item)\">\n                    <i class=\"pi pi-trash\"></i>\n                  </button>\n                </div>\n              </td>\n            </tr>\n          </ng-template>\n        </p-table>\n      </div>\n    </div>\n  </section>\n\n  <p-dialog\n    header=\"{{ editing() ? 'Edit Opportunity Stage' : 'Create Opportunity Stage' }}\"\n    [visible]=\"editorOpen()\"\n    (visibleChange)=\"editorOpen.set($event)\"\n    [modal]=\"true\"\n    styleClass=\"lookup-dialog\"\n    [style]=\"{ width: '30rem' }\"\n    [draggable]=\"false\"\n    [resizable]=\"false\"\n    (onHide)=\"closeEditor()\"\n  >\n    <form class=\"dialog-form\" [formGroup]=\"form\" (ngSubmit)=\"save()\">\n      <div class=\"dialog-body\">\n        <div class=\"form-field\">\n          <label for=\"os-name\">Name <span class=\"required\">*</span></label>\n          <div class=\"form-field__input\">\n            <p-inputGroup>\n              <p-inputGroupAddon class=\"icon-addon icon-addon--name\"><i class=\"pi pi-chart-bar\"></i></p-inputGroupAddon>\n              <input pInputText id=\"os-name\" formControlName=\"name\" placeholder=\"e.g. Negotiation\" />\n            </p-inputGroup>\n          </div>\n        </div>\n        <div class=\"form-field\">\n          <label for=\"os-order\">Order</label>\n          <div class=\"form-field__input\">\n            <p-inputGroup>\n              <p-inputGroupAddon class=\"icon-addon icon-addon--info\"><i class=\"pi pi-sort-numeric-up\"></i></p-inputGroupAddon>\n              <p-inputNumber id=\"os-order\" formControlName=\"order\" [min]=\"0\" [showButtons]=\"true\" styleClass=\"w-full\" inputStyleClass=\"w-full\"></p-inputNumber>\n            </p-inputGroup>\n          </div>\n        </div>\n        <div class=\"form-field\">\n          <label for=\"os-forecast\">Forecast Category</label>\n          <div class=\"form-field__input\">\n            <p-inputGroup>\n              <p-inputGroupAddon class=\"icon-addon icon-addon--industry\"><i class=\"pi pi-chart-line\"></i></p-inputGroupAddon>\n              <input pInputText id=\"os-forecast\" formControlName=\"forecastCategory\" placeholder=\"e.g. Pipeline, Best Case, Closed\" />\n            </p-inputGroup>\n          </div>\n        </div>\n        <div class=\"form-field checkbox-row\">\n          <p-checkbox formControlName=\"isClosedStage\" [binary]=\"true\"></p-checkbox>\n          <div class=\"checkbox-copy\">\n            <span>Closed stage</span>\n            <small>Marks the opportunity as won or lost.</small>\n          </div>\n        </div>\n      </div>\n      <div class=\"dialog-footer\">\n        <button pButton type=\"button\" class=\"btn btn-ghost\" (click)=\"closeEditor()\">Cancel</button>\n        <button pButton type=\"submit\" class=\"btn btn-primary\" [disabled]=\"saving()\">\n          <span>{{ saving() ? 'Saving\u2026' : 'Save Stage' }}</span>\n        </button>\n      </div>\n    </form>\n  </p-dialog>\n</div>\n", styles: ["@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n:host {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.page-container {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n.bg-orbs { position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }\n.orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.5; animation: float 20s ease-in-out infinite; }\n.orb-1 { width: 420px; height: 420px; background: linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(14, 165, 233, 0.12) 100%); top: -120px; right: -120px; }\n.orb-2 { width: 300px; height: 300px; background: linear-gradient(135deg, rgba(251, 146, 60, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%); bottom: 20%; left: -80px; animation-delay: -7s; }\n.orb-3 { width: 250px; height: 250px; background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.06) 100%); top: 52%; right: 8%; animation-delay: -14s; }\n@keyframes float { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(20px, -30px) scale(1.05); } 66% { transform: translate(-15px, 20px) scale(0.95); } }\n\n.hero-section { position: relative; z-index: 1; display: grid; gap: 2rem; grid-template-columns: minmax(0, 1fr); margin-bottom: 2.5rem;\n  @media (min-width: 1024px) { grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); align-items: center; }\n}\n.hero-content { display: flex; flex-direction: column; gap: 1.25rem; }\n.hero-badge { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.4rem 1rem; background: rgba(255, 255, 255, 0.7); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 999px; font-size: 0.85rem; font-weight: 600; color: #1f2937; width: fit-content; backdrop-filter: blur(10px); }\n.badge-dot { width: 0.5rem; height: 0.5rem; background: #6366f1; border-radius: 999px; box-shadow: 0 0 12px rgba(99, 102, 241, 0.4); }\n.hero-description { font-size: 1rem; color: #475569; margin: 0; max-width: 36rem; }\n.hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }\n\n.visual-card { background: rgba(255, 255, 255, 0.75); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 1.5rem; padding: 1.5rem; position: relative; overflow: hidden; backdrop-filter: blur(14px); display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); }\n.visual-card--primary .card-icon { background: rgba(99, 102, 241, 0.15); color: #4f46e5; }\n.card-icon { width: 3rem; height: 3rem; border-radius: 1rem; display: grid; place-items: center; font-size: 1.5rem; }\n.card-content { display: flex; flex-direction: column; gap: 0.3rem; }\n.card-label { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; }\n.card-value { font-size: 1.4rem; font-weight: 700; color: #0f172a; }\n.card-trend { font-size: 0.85rem; color: #64748b; display: flex; align-items: center; gap: 0.4rem; }\n\n.data-section { position: relative; z-index: 1; }\n.data-card { background: rgba(255, 255, 255, 0.78); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 1.5rem; padding: 1.5rem; box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08); backdrop-filter: blur(16px); }\n.data-header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }\n.record-count { color: #64748b; font-size: 0.9rem; }\n.status-badge { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; padding: 0.35rem 0.8rem; border-radius: 999px; font-weight: 600; }\n.status-badge--success { background: rgba(34, 197, 94, 0.15); color: #15803d; }\n.table-wrapper { width: 100%; }\n.level-name { display: flex; align-items: center; gap: 0.75rem; }\n.rank-chip { display: inline-flex; padding: 0.2rem 0.6rem; border-radius: 999px; background: rgba(99, 102, 241, 0.15); color: #4f46e5; font-weight: 600; }\n.forecast-text { color: #475569; font-size: 0.9rem; }\n.status-icon.success { color: #16a34a; }\n.status-icon.muted { color: #cbd5f5; }\n\n.dialog-form { display: flex; flex-direction: column; gap: 1.25rem; overflow-x: hidden; }\n.dialog-body { display: flex; flex-direction: column; gap: 1rem; overflow-x: hidden; }\n\n.form-field {\n  display: flex; flex-direction: row; align-items: center; gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem; border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35); border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif; font-size: 0.8125rem; font-weight: 600; color: #475569; letter-spacing: 0.01em; white-space: nowrap; min-width: 110px; flex-shrink: 0; text-align: right; transition: color 0.2s ease; }\n  > p-inputgroup, > p-inputGroup, > p-select, > .form-field__input { flex: 1; min-width: 0; }\n  .form-field__input { display: flex; flex-direction: column; gap: 0.25rem; }\n  input { border-radius: 12px; }\n  &:hover { background: rgba(255, 255, 255, 0.5); border-color: rgba(148, 163, 184, 0.16); > label { color: #334155; } }\n  &:focus-within { background: rgba(255, 255, 255, 0.72); border-color: rgba(var(--apple-blue), 0.22); box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07); > label { color: #4f46e5; } }\n}\n\n.required { color: #ef4444; }\n.checkbox-row { flex-direction: row; align-items: center; gap: 0.75rem; padding: 0.65rem 0.75rem; border-radius: 12px; background: rgba(255, 255, 255, 0.65); border: 1px solid rgba(148, 163, 184, 0.3);\n  .checkbox-copy { display: flex; flex-direction: column; gap: 0.15rem; color: #0f172a; font-weight: 500; small { font-size: 0.75rem; color: #64748b; font-weight: 400; } }\n}\n\n.dialog-footer { display: flex; justify-content: flex-end; gap: 0.75rem; }\n.btn { border-radius: 999px !important; }\n.btn-primary { background: linear-gradient(120deg, #4f46e5, #0ea5e9); border: none; color: white; }\n.btn-ghost { background: rgba(255, 255, 255, 0.65); border: 1px solid rgba(148, 163, 184, 0.3); color: #0f172a; }\n\n:host ::ng-deep .lookup-dialog .p-dialog { overflow: hidden; background: rgba(255, 255, 255, 0.82); border: 1px solid rgba(148, 163, 184, 0.35); box-shadow: 0 24px 60px rgba(15, 23, 42, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.6); backdrop-filter: blur(18px) saturate(160%); }\n:host ::ng-deep .lookup-dialog .p-dialog-header, :host ::ng-deep .lookup-dialog .p-dialog-content, :host ::ng-deep .lookup-dialog .p-dialog-footer { background: transparent; }\n:host ::ng-deep .lookup-dialog .p-dialog-content { overflow-x: hidden; }\n:host ::ng-deep .lookup-dialog .p-inputgroup { width: 100%; }\n\n.loading-state { padding: 1rem; }\n.skeleton-row { display: flex; gap: 1rem; margin-bottom: 1rem; }\n.skeleton { border-radius: 8px; background: rgba(148, 163, 184, 0.15); animation: pulse 1.5s infinite; }\n.skeleton-text { width: 140px; height: 20px; }\n.skeleton-input { flex: 1; height: 20px; }\n@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LookupOpportunityStagesPage, { className: "LookupOpportunityStagesPage", filePath: "src/app/crm/features/settings/pages/lookup-opportunity-stages.page.ts", lineNumber: 35 }); })();
