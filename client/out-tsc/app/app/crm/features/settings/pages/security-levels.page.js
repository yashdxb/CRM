import { NgClass, NgFor, NgIf } from '@angular/common';
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
import { UserAdminDataService } from '../services/user-admin-data.service';
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
const _c0 = () => ({ width: "32rem" });
const _c1 = () => [0, 1, 2];
function SecurityLevelsPage_span_74_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 69);
    i0.ɵɵelement(1, "i", 70);
    i0.ɵɵtext(2, " Ready ");
    i0.ɵɵelementEnd();
} }
function SecurityLevelsPage_div_75_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵelement(1, "div", 74)(2, "div", 75);
    i0.ɵɵelementEnd();
} }
function SecurityLevelsPage_div_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 71);
    i0.ɵɵtemplate(1, SecurityLevelsPage_div_75_div_1_Template, 3, 0, "div", 72);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c1));
} }
function SecurityLevelsPage_div_76_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Rank");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Default");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 80);
    i0.ɵɵtext(10, "Actions");
    i0.ɵɵelementEnd()();
} }
function SecurityLevelsPage_div_76_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "div", 81)(3, "span", 82);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "p-tag", 83);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td")(7, "span", 84);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td")(10, "span", 85);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵelement(13, "i", 86);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "td", 80)(15, "div", 87)(16, "button", 88);
    i0.ɵɵlistener("click", function SecurityLevelsPage_div_76_ng_template_3_Template_button_click_16_listener() { const level_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.openEdit(level_r2)); });
    i0.ɵɵelement(17, "i", 89);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "button", 90);
    i0.ɵɵlistener("click", function SecurityLevelsPage_div_76_ng_template_3_Template_button_click_18_listener() { const level_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.deleteSecurityLevel(level_r2)); });
    i0.ɵɵelement(19, "i", 91);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const level_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(level_r2.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("severity", level_r2.isDefault ? "success" : "info")("value", ctx_r2.getHeaderLabel(level_r2));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(level_r2.description || "\u2014");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(level_r2.rank);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", level_r2.isDefault ? "pi-check-circle status-icon success" : "pi-circle-off status-icon muted");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", !ctx_r2.canManageAdmin());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.canManageAdmin() || level_r2.isDefault);
} }
function SecurityLevelsPage_div_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 76)(1, "p-table", 77);
    i0.ɵɵtemplate(2, SecurityLevelsPage_div_76_ng_template_2_Template, 11, 0, "ng-template", 78)(3, SecurityLevelsPage_div_76_ng_template_3_Template, 20, 8, "ng-template", 79);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.securityLevels());
} }
export class SecurityLevelsPage {
    dataService = inject(UserAdminDataService);
    toastService = inject(AppToastService);
    formBuilder = inject(FormBuilder);
    securityLevels = signal([], ...(ngDevMode ? [{ debugName: "securityLevels" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    editorOpen = signal(false, ...(ngDevMode ? [{ debugName: "editorOpen" }] : []));
    editing = signal(null, ...(ngDevMode ? [{ debugName: "editing" }] : []));
    canManageAdmin = signal(false, ...(ngDevMode ? [{ debugName: "canManageAdmin" }] : []));
    defaultSecurityLevelName = computed(() => {
        const level = this.securityLevels().find((item) => item.isDefault);
        return level?.name ?? 'Not set';
    }, ...(ngDevMode ? [{ debugName: "defaultSecurityLevelName" }] : []));
    securityForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        description: [''],
        rank: [0, [Validators.min(0)]],
        isDefault: [false]
    });
    constructor() {
        this.canManageAdmin.set(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage));
        this.loadSecurityLevels();
    }
    loadSecurityLevels() {
        this.loading.set(true);
        this.dataService.getSecurityLevels().subscribe({
            next: (levels) => {
                this.securityLevels.set(levels ?? []);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.raiseToast('error', 'Unable to load security levels');
            }
        });
    }
    openCreate() {
        this.editing.set(null);
        this.securityForm.reset({
            name: '',
            description: '',
            rank: this.nextRank(),
            isDefault: this.securityLevels().length === 0
        });
        this.editorOpen.set(true);
    }
    openEdit(level) {
        this.editing.set(level);
        this.securityForm.reset({
            name: level.name,
            description: level.description ?? '',
            rank: level.rank,
            isDefault: level.isDefault
        });
        this.editorOpen.set(true);
    }
    closeEditor() {
        this.editorOpen.set(false);
        this.securityForm.markAsPristine();
        this.securityForm.markAsUntouched();
    }
    saveSecurityLevel() {
        if (this.saving()) {
            return;
        }
        if (this.securityForm.invalid) {
            this.securityForm.markAllAsTouched();
            return;
        }
        const payload = this.buildPayload();
        this.saving.set(true);
        const current = this.editing();
        const request = current
            ? this.dataService.updateSecurityLevel(current.id, payload)
            : this.dataService.createSecurityLevel(payload);
        request.subscribe({
            next: () => {
                this.saving.set(false);
                this.raiseToast('success', current ? 'Security level updated' : 'Security level created');
                this.closeEditor();
                this.loadSecurityLevels();
            },
            error: (err) => {
                this.saving.set(false);
                const message = err?.error ?? 'Unable to save security level';
                this.raiseToast('error', message);
            }
        });
    }
    deleteSecurityLevel(level) {
        if (!this.canManageAdmin() || this.saving()) {
            return;
        }
        if (level.isDefault) {
            this.raiseToast('error', 'Default security level cannot be deleted');
            return;
        }
        if (!confirm(`Delete ${level.name}? Roles using this level must be reassigned first.`)) {
            return;
        }
        this.saving.set(true);
        this.dataService.deleteSecurityLevel(level.id).subscribe({
            next: () => {
                this.saving.set(false);
                this.raiseToast('success', 'Security level deleted');
                this.loadSecurityLevels();
            },
            error: (err) => {
                this.saving.set(false);
                const message = err?.error ?? 'Unable to delete security level';
                this.raiseToast('error', message);
            }
        });
    }
    getHeaderLabel(level) {
        return level.isDefault ? 'Default' : 'Custom';
    }
    buildPayload() {
        const value = this.securityForm.value;
        return {
            name: value.name?.trim() ?? '',
            description: value.description?.trim() ? value.description?.trim() : null,
            rank: typeof value.rank === 'number' ? value.rank : 0,
            isDefault: value.isDefault ?? false
        };
    }
    nextRank() {
        const levels = this.securityLevels();
        if (levels.length === 0) {
            return 0;
        }
        return Math.max(...levels.map(level => level.rank)) + 1;
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message);
    }
    static ɵfac = function SecurityLevelsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SecurityLevelsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SecurityLevelsPage, selectors: [["app-security-levels-page"]], decls: 123, vars: 22, consts: [[1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-actions"], ["type", "button", "routerLink", "/app/settings", 1, "action-btn", "action-btn--back"], [1, "action-btn__icon"], [1, "pi", "pi-arrow-left"], ["type", "button", "routerLink", "/app/settings/roles", 1, "action-btn", "action-btn--security"], [1, "pi", "pi-shield"], ["type", "button", 1, "action-btn", "action-btn--refresh", 3, "click", "disabled"], [1, "pi", "pi-refresh"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "pi", "pi-plus"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend"], [1, "pi", "pi-cog"], [1, "card-glow"], [1, "visual-card", "visual-card--secondary"], [1, "pi", "pi-star"], [1, "pi", "pi-check-circle"], [1, "data-section"], [1, "data-card"], [1, "data-header"], [1, "header-title"], [1, "record-count"], [1, "header-actions"], ["class", "status-badge status-badge--success", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "table-wrapper", 4, "ngIf"], ["styleClass", "security-level-dialog", 3, "visibleChange", "onHide", "header", "visible", "modal", "draggable", "resizable"], [1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "dialog-body"], [1, "form-grid"], [1, "form-field"], ["for", "security-name"], [1, "required"], [1, "form-field__input"], [1, "icon-addon", "icon-addon--name"], ["pInputText", "", "id", "security-name", "formControlName", "name", "placeholder", "e.g. High Risk Approval"], [1, "field-hint"], ["for", "security-rank"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-sort-numeric-up"], ["id", "security-rank", "formControlName", "rank", "styleClass", "w-full", "inputStyleClass", "w-full", 3, "min", "showButtons"], [1, "form-field", "full-row"], ["for", "security-description"], [1, "pi", "pi-align-left"], ["pInputText", "", "id", "security-description", "formControlName", "description", "rows", "3", "placeholder", "Optional description of this level"], [1, "form-field", "checkbox-row"], ["formControlName", "isDefault", 3, "binary"], [1, "checkbox-copy"], [1, "dialog-footer"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", 3, "click"], ["pButton", "", "type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "status-badge", "status-badge--success"], [1, "pi", "pi-check"], [1, "loading-state"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton", "skeleton-text"], [1, "skeleton", "skeleton-input"], [1, "table-wrapper"], ["styleClass", "data-table", 3, "value"], ["pTemplate", "header"], ["pTemplate", "body"], [1, "text-right"], [1, "level-name"], [1, "name"], [3, "severity", "value"], [1, "level-description"], [1, "rank-chip"], [1, "pi", 3, "ngClass"], [1, "row-actions"], ["type", "button", "title", "Edit", 1, "row-action-btn", "row-action-btn--edit", 3, "click", "disabled"], [1, "pi", "pi-pencil"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "pi", "pi-trash"]], template: function SecurityLevelsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵelement(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 5)(7, "div", 6)(8, "div", 7);
            i0.ɵɵelement(9, "span", 8);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Security Levels");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 9)(13, "span", 10);
            i0.ɵɵtext(14, "Security");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 11);
            i0.ɵɵtext(16, "Tiers");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 12);
            i0.ɵɵtext(18, " Define configurable access tiers for high-impact actions (approvals, overrides, admin changes). ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 13)(20, "button", 14)(21, "span", 15);
            i0.ɵɵelement(22, "i", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span");
            i0.ɵɵtext(24, "Back to Settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "button", 17)(26, "span", 15);
            i0.ɵɵelement(27, "i", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span");
            i0.ɵɵtext(29, "Manage Roles");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "button", 19);
            i0.ɵɵlistener("click", function SecurityLevelsPage_Template_button_click_30_listener() { return ctx.loadSecurityLevels(); });
            i0.ɵɵelementStart(31, "span", 15);
            i0.ɵɵelement(32, "i", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "span");
            i0.ɵɵtext(34, "Reload");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(35, "button", 21);
            i0.ɵɵlistener("click", function SecurityLevelsPage_Template_button_click_35_listener() { return ctx.openCreate(); });
            i0.ɵɵelementStart(36, "span", 15);
            i0.ɵɵelement(37, "i", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "span");
            i0.ɵɵtext(39, "New Level");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(40, "div", 23)(41, "div", 24)(42, "div", 25);
            i0.ɵɵelement(43, "i", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 26)(45, "span", 27);
            i0.ɵɵtext(46, "Defined Levels");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(47, "strong", 28);
            i0.ɵɵtext(48);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "span", 29);
            i0.ɵɵelement(50, "i", 30);
            i0.ɵɵtext(51, " Configurable by Super Admin ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(52, "div", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "div", 32)(54, "div", 25);
            i0.ɵɵelement(55, "i", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "div", 26)(57, "span", 27);
            i0.ɵɵtext(58, "Default Level");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(59, "strong", 28);
            i0.ɵɵtext(60);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "span", 29);
            i0.ɵɵelement(62, "i", 34);
            i0.ɵɵtext(63, " Used for new roles ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(64, "div", 31);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(65, "section", 35)(66, "div", 36)(67, "div", 37)(68, "div", 38)(69, "h2");
            i0.ɵɵtext(70, "Security Level Catalog");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "span", 39);
            i0.ɵɵtext(72, "Controls role access tiers for sensitive actions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(73, "div", 40);
            i0.ɵɵtemplate(74, SecurityLevelsPage_span_74_Template, 3, 0, "span", 41);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(75, SecurityLevelsPage_div_75_Template, 2, 2, "div", 42)(76, SecurityLevelsPage_div_76_Template, 4, 1, "div", 43);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(77, "p-dialog", 44);
            i0.ɵɵlistener("visibleChange", function SecurityLevelsPage_Template_p_dialog_visibleChange_77_listener($event) { return ctx.editorOpen.set($event); })("onHide", function SecurityLevelsPage_Template_p_dialog_onHide_77_listener() { return ctx.closeEditor(); });
            i0.ɵɵelementStart(78, "form", 45);
            i0.ɵɵlistener("ngSubmit", function SecurityLevelsPage_Template_form_ngSubmit_78_listener() { return ctx.saveSecurityLevel(); });
            i0.ɵɵelementStart(79, "div", 46)(80, "div", 47)(81, "div", 48)(82, "label", 49);
            i0.ɵɵtext(83, "Name ");
            i0.ɵɵelementStart(84, "span", 50);
            i0.ɵɵtext(85, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(86, "div", 51)(87, "p-inputGroup")(88, "p-inputGroupAddon", 52);
            i0.ɵɵelement(89, "i", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(90, "input", 53);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "small", 54);
            i0.ɵɵtext(92, "Shown in role configuration dropdowns.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(93, "div", 48)(94, "label", 55);
            i0.ɵɵtext(95, "Rank");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "div", 51)(97, "p-inputGroup")(98, "p-inputGroupAddon", 56);
            i0.ɵɵelement(99, "i", 57);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(100, "p-inputNumber", 58);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "small", 54);
            i0.ɵɵtext(102, "Lower rank = lower clearance. Used for comparisons.");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(103, "div", 59)(104, "label", 60);
            i0.ɵɵtext(105, "Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(106, "p-inputGroup")(107, "p-inputGroupAddon", 56);
            i0.ɵɵelement(108, "i", 61);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(109, "textarea", 62);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(110, "div", 63);
            i0.ɵɵelement(111, "p-checkbox", 64);
            i0.ɵɵelementStart(112, "div", 65)(113, "span");
            i0.ɵɵtext(114, "Set as default for new roles");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(115, "small");
            i0.ɵɵtext(116, "Only one security level can be default at a time.");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(117, "div", 66)(118, "button", 67);
            i0.ɵɵlistener("click", function SecurityLevelsPage_Template_button_click_118_listener() { return ctx.closeEditor(); });
            i0.ɵɵtext(119, "Cancel");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(120, "button", 68)(121, "span");
            i0.ɵɵtext(122);
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(30);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", !ctx.canManageAdmin());
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(ctx.securityLevels().length);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.defaultSecurityLevelName());
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngIf", !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(21, _c0));
            i0.ɵɵproperty("header", i0.ɵɵinterpolate(ctx.editing() ? "Edit Security Level" : "Create Security Level"))("visible", ctx.editorOpen())("modal", true)("draggable", false)("resizable", false);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.securityForm);
            i0.ɵɵadvance(22);
            i0.ɵɵproperty("min", 0)("showButtons", true);
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("binary", true);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("disabled", ctx.saving());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.saving() ? "Saving\u2026" : "Save Level");
        } }, dependencies: [BreadcrumbsComponent,
            ButtonModule, i1.ButtonDirective, i2.PrimeTemplate, CheckboxModule, i3.Checkbox, DialogModule, i4.Dialog, InputGroupModule, i5.InputGroup, InputGroupAddonModule, i6.InputGroupAddon, InputNumberModule, i7.InputNumber, InputTextModule, i8.InputText, NgClass,
            NgFor,
            NgIf,
            ReactiveFormsModule, i9.ɵNgNoValidate, i9.DefaultValueAccessor, i9.NgControlStatus, i9.NgControlStatusGroup, i9.FormGroupDirective, i9.FormControlName, RouterLink,
            SkeletonModule,
            TableModule, i10.Table, TagModule, i11.Tag, TooltipModule], styles: ["\n\n\n\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.page-container[_ngcontent-%COMP%] {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: _ngcontent-%COMP%_float 20s ease-in-out infinite;\n}\n\n.orb-1[_ngcontent-%COMP%] {\n  width: 420px;\n  height: 420px;\n  background: linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(14, 165, 233, 0.12) 100%);\n  top: -120px;\n  right: -120px;\n  animation-delay: 0s;\n}\n\n.orb-2[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  background: linear-gradient(135deg, rgba(251, 146, 60, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%);\n  bottom: 20%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3[_ngcontent-%COMP%] {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.06) 100%);\n  top: 52%;\n  right: 8%;\n  animation-delay: -14s;\n}\n\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(20px, -30px) scale(1.05);\n  }\n  66% {\n    transform: translate(-15px, 20px) scale(0.95);\n  }\n}\n\n.hero-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  gap: 2rem;\n  grid-template-columns: minmax(0, 1fr);\n  margin-bottom: 2.5rem;\n\n  @media (min-width: 1024px) {\n    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);\n    align-items: center;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.4rem 1rem;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 999px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #1f2937;\n  width: fit-content;\n  backdrop-filter: blur(10px);\n}\n\n.badge-dot[_ngcontent-%COMP%] {\n  width: 0.5rem;\n  height: 0.5rem;\n  background: #6366f1;\n  border-radius: 999px;\n  box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);\n}\n\n\n.hero-description[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: #475569;\n  margin: 0;\n  max-width: 36rem;\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.btn[_ngcontent-%COMP%] {\n  border-radius: 999px !important;\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: linear-gradient(120deg, #4f46e5, #0ea5e9);\n  border: none;\n  color: white;\n}\n\n.btn-ghost[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.65);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: #0f172a;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.8);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: #0f172a;\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 1.5rem;\n  padding: 1.5rem;\n  position: relative;\n  overflow: hidden;\n  backdrop-filter: blur(14px);\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1rem;\n  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);\n}\n\n.visual-card--primary[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\n  background: rgba(99, 102, 241, 0.15);\n  color: #4f46e5;\n}\n\n.visual-card--secondary[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.15);\n  color: #059669;\n}\n\n.card-icon[_ngcontent-%COMP%] {\n  width: 3rem;\n  height: 3rem;\n  border-radius: 1rem;\n  display: grid;\n  place-items: center;\n  font-size: 1.5rem;\n}\n\n.card-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n\n.card-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #64748b;\n}\n\n.card-value[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n\n.card-trend[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #64748b;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n\n.data-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n}\n\n.data-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.78);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 1.5rem;\n  padding: 1.5rem;\n  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);\n  backdrop-filter: blur(16px);\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n\n.record-count[_ngcontent-%COMP%] {\n  color: #64748b;\n  font-size: 0.9rem;\n}\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.8rem;\n  padding: 0.35rem 0.8rem;\n  border-radius: 999px;\n  font-weight: 600;\n}\n\n.status-badge--success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.15);\n  color: #15803d;\n}\n\n.table-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.data-table[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:deep(.p-datatable) {\n  background: transparent;\n}\n\n.level-name[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.level-description[_ngcontent-%COMP%] {\n  color: #475569;\n}\n\n.rank-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.2rem 0.6rem;\n  border-radius: 999px;\n  background: rgba(99, 102, 241, 0.15);\n  color: #4f46e5;\n  font-weight: 600;\n}\n\n.status-icon.success[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n\n.status-icon.muted[_ngcontent-%COMP%] {\n  color: #cbd5f5;\n}\n\n.dialog-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  overflow-x: hidden;\n}\n\n.dialog-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  overflow-x: hidden;\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  > p-inputgroup,\n  > p-inputGroup,\n  > p-select,\n  > p-inputnumber,\n  > input,\n  > textarea,\n  > .form-field__input {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .form-field__input {\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n  }\n\n  input,\n  textarea {\n    border-radius: 12px;\n  }\n\n  textarea {\n    resize: vertical;\n    min-height: 96px;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n}\n\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #64748b;\n}\n\n.required[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n\n.checkbox-row[_ngcontent-%COMP%] {\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.65rem 0.75rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.65);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n\n  .checkbox-copy {\n    display: flex;\n    flex-direction: column;\n    gap: 0.15rem;\n    color: #0f172a;\n    font-weight: 500;\n\n    small {\n      font-size: 0.75rem;\n      color: #64748b;\n      font-weight: 400;\n    }\n  }\n}\n\n.dialog-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n\n[_nghost-%COMP%]     .security-level-dialog .p-dialog {\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.82);\n  border: 1px solid rgba(148, 163, 184, 0.35);\n  box-shadow:\n    0 24px 60px rgba(15, 23, 42, 0.22),\n    inset 0 1px 0 rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(18px) saturate(160%);\n}\n\n[_nghost-%COMP%]     .security-level-dialog .p-dialog-header, \n[_nghost-%COMP%]     .security-level-dialog .p-dialog-content, \n[_nghost-%COMP%]     .security-level-dialog .p-dialog-footer {\n  background: transparent;\n}\n\n[_nghost-%COMP%]     .security-level-dialog .p-dialog-content {\n  overflow-x: hidden;\n}\n\n[_nghost-%COMP%]     .security-level-dialog .p-inputgroup {\n  width: 100%;\n}\n\n[_nghost-%COMP%]     .security-level-dialog .p-inputgroup > textarea {\n  width: 100%;\n}\n\n.btn-sm[_ngcontent-%COMP%] {\n  padding: 0.35rem 0.8rem;\n  font-size: 0.85rem;\n}\n\n.danger[_ngcontent-%COMP%] {\n  color: #dc2626;\n  border-color: rgba(239, 68, 68, 0.4);\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SecurityLevelsPage, [{
        type: Component,
        args: [{ selector: 'app-security-levels-page', standalone: true, imports: [
                    BreadcrumbsComponent,
                    ButtonModule,
                    CheckboxModule,
                    DialogModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    InputNumberModule,
                    InputTextModule,
                    NgClass,
                    NgFor,
                    NgIf,
                    ReactiveFormsModule,
                    RouterLink,
                    SkeletonModule,
                    TableModule,
                    TagModule,
                    TooltipModule
                ], template: "<div class=\"page-container\">\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Security Levels</span>\n      </div>\n\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Security</span>\n        <span class=\"title-light\">Tiers</span>\n      </h1>\n\n      <p class=\"hero-description\">\n        Define configurable access tiers for high-impact actions (approvals, overrides, admin changes).\n      </p>\n\n      <div class=\"hero-actions\">\n        <button type=\"button\" class=\"action-btn action-btn--back\" routerLink=\"/app/settings\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-arrow-left\"></i></span>\n          <span>Back to Settings</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--security\" routerLink=\"/app/settings/roles\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-shield\"></i></span>\n          <span>Manage Roles</span>\n        </button>\n        <button\n          type=\"button\"\n          class=\"action-btn action-btn--refresh\"\n          [disabled]=\"loading()\"\n          (click)=\"loadSecurityLevels()\"\n        >\n          <span class=\"action-btn__icon\"><i class=\"pi pi-refresh\"></i></span>\n          <span>Reload</span>\n        </button>\n        <button\n          type=\"button\"\n          class=\"action-btn action-btn--add\"\n          [disabled]=\"!canManageAdmin()\"\n          (click)=\"openCreate()\"\n        >\n          <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n          <span>New Level</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-shield\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Defined Levels</span>\n          <strong class=\"card-value\">{{ securityLevels().length }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-cog\"></i>\n            Configurable by Super Admin\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n\n      <div class=\"visual-card visual-card--secondary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-star\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Default Level</span>\n          <strong class=\"card-value\">{{ defaultSecurityLevelName() }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-check-circle\"></i>\n            Used for new roles\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"data-section\">\n    <div class=\"data-card\">\n      <div class=\"data-header\">\n        <div class=\"header-title\">\n          <h2>Security Level Catalog</h2>\n          <span class=\"record-count\">Controls role access tiers for sensitive actions</span>\n        </div>\n        <div class=\"header-actions\">\n          <span class=\"status-badge status-badge--success\" *ngIf=\"!loading()\">\n            <i class=\"pi pi-check\"></i> Ready\n          </span>\n        </div>\n      </div>\n\n      <div class=\"loading-state\" *ngIf=\"loading()\">\n        <div class=\"skeleton-row\" *ngFor=\"let _ of [0, 1, 2]\">\n          <div class=\"skeleton skeleton-text\"></div>\n          <div class=\"skeleton skeleton-input\"></div>\n        </div>\n      </div>\n\n      <div class=\"table-wrapper\" *ngIf=\"!loading()\">\n        <p-table [value]=\"securityLevels()\" styleClass=\"data-table\">\n          <ng-template pTemplate=\"header\">\n            <tr>\n              <th>Name</th>\n              <th>Description</th>\n              <th>Rank</th>\n              <th>Default</th>\n              <th class=\"text-right\">Actions</th>\n            </tr>\n          </ng-template>\n          <ng-template pTemplate=\"body\" let-level>\n            <tr>\n              <td>\n                <div class=\"level-name\">\n                  <span class=\"name\">{{ level.name }}</span>\n                  <p-tag\n                    [severity]=\"level.isDefault ? 'success' : 'info'\"\n                    [value]=\"getHeaderLabel(level)\"\n                  ></p-tag>\n                </div>\n              </td>\n              <td>\n                <span class=\"level-description\">{{ level.description || '\u2014' }}</span>\n              </td>\n              <td>\n                <span class=\"rank-chip\">{{ level.rank }}</span>\n              </td>\n              <td>\n                <i\n                  class=\"pi\"\n                  [ngClass]=\"level.isDefault ? 'pi-check-circle status-icon success' : 'pi-circle-off status-icon muted'\"\n                ></i>\n              </td>\n              <td class=\"text-right\">\n                <div class=\"row-actions\">\n                  <button\n                    type=\"button\"\n                    class=\"row-action-btn row-action-btn--edit\"\n                    title=\"Edit\"\n                    [disabled]=\"!canManageAdmin()\"\n                    (click)=\"openEdit(level)\"\n                  ><i class=\"pi pi-pencil\"></i></button>\n                  <button\n                    type=\"button\"\n                    class=\"row-action-btn row-action-btn--delete\"\n                    title=\"Delete\"\n                    [disabled]=\"!canManageAdmin() || level.isDefault\"\n                    (click)=\"deleteSecurityLevel(level)\"\n                  ><i class=\"pi pi-trash\"></i></button>\n                </div>\n              </td>\n            </tr>\n          </ng-template>\n        </p-table>\n      </div>\n    </div>\n  </section>\n\n  <p-dialog\n    header=\"{{ editing() ? 'Edit Security Level' : 'Create Security Level' }}\"\n    [visible]=\"editorOpen()\"\n    (visibleChange)=\"editorOpen.set($event)\"\n    [modal]=\"true\"\n    styleClass=\"security-level-dialog\"\n    [style]=\"{ width: '32rem' }\"\n    [draggable]=\"false\"\n    [resizable]=\"false\"\n    (onHide)=\"closeEditor()\"\n  >\n    <form class=\"dialog-form\" [formGroup]=\"securityForm\" (ngSubmit)=\"saveSecurityLevel()\">\n      <div class=\"dialog-body\">\n        <div class=\"form-grid\">\n          <div class=\"form-field\">\n            <label for=\"security-name\">Name <span class=\"required\">*</span></label>\n            <div class=\"form-field__input\">\n              <p-inputGroup>\n                <p-inputGroupAddon class=\"icon-addon icon-addon--name\">\n                  <i class=\"pi pi-shield\"></i>\n                </p-inputGroupAddon>\n                <input pInputText id=\"security-name\" formControlName=\"name\" placeholder=\"e.g. High Risk Approval\" />\n              </p-inputGroup>\n              <small class=\"field-hint\">Shown in role configuration dropdowns.</small>\n            </div>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"security-rank\">Rank</label>\n            <div class=\"form-field__input\">\n              <p-inputGroup>\n                <p-inputGroupAddon class=\"icon-addon icon-addon--info\">\n                  <i class=\"pi pi-sort-numeric-up\"></i>\n                </p-inputGroupAddon>\n                <p-inputNumber\n                  id=\"security-rank\"\n                  formControlName=\"rank\"\n                  [min]=\"0\"\n                  [showButtons]=\"true\"\n                  styleClass=\"w-full\"\n                  inputStyleClass=\"w-full\"\n                ></p-inputNumber>\n              </p-inputGroup>\n              <small class=\"field-hint\">Lower rank = lower clearance. Used for comparisons.</small>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-field full-row\">\n          <label for=\"security-description\">Description</label>\n          <p-inputGroup>\n            <p-inputGroupAddon class=\"icon-addon icon-addon--info\">\n              <i class=\"pi pi-align-left\"></i>\n            </p-inputGroupAddon>\n            <textarea\n              pInputText\n              id=\"security-description\"\n              formControlName=\"description\"\n              rows=\"3\"\n              placeholder=\"Optional description of this level\"\n            ></textarea>\n          </p-inputGroup>\n        </div>\n        <div class=\"form-field checkbox-row\">\n          <p-checkbox formControlName=\"isDefault\" [binary]=\"true\"></p-checkbox>\n          <div class=\"checkbox-copy\">\n            <span>Set as default for new roles</span>\n            <small>Only one security level can be default at a time.</small>\n          </div>\n        </div>\n      </div>\n      <div class=\"dialog-footer\">\n        <button pButton type=\"button\" class=\"btn btn-ghost\" (click)=\"closeEditor()\">Cancel</button>\n        <button pButton type=\"submit\" class=\"btn btn-primary\" [disabled]=\"saving()\">\n          <span>{{ saving() ? 'Saving\u2026' : 'Save Level' }}</span>\n        </button>\n      </div>\n    </form>\n  </p-dialog>\n</div>\n", styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   SECURITY LEVELS PAGE - Premium Glass UI (matches settings style system)\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n:host {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n.page-container {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: float 20s ease-in-out infinite;\n}\n\n.orb-1 {\n  width: 420px;\n  height: 420px;\n  background: linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(14, 165, 233, 0.12) 100%);\n  top: -120px;\n  right: -120px;\n  animation-delay: 0s;\n}\n\n.orb-2 {\n  width: 300px;\n  height: 300px;\n  background: linear-gradient(135deg, rgba(251, 146, 60, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%);\n  bottom: 20%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3 {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.06) 100%);\n  top: 52%;\n  right: 8%;\n  animation-delay: -14s;\n}\n\n@keyframes float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(20px, -30px) scale(1.05);\n  }\n  66% {\n    transform: translate(-15px, 20px) scale(0.95);\n  }\n}\n\n.hero-section {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  gap: 2rem;\n  grid-template-columns: minmax(0, 1fr);\n  margin-bottom: 2.5rem;\n\n  @media (min-width: 1024px) {\n    grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);\n    align-items: center;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.6rem;\n  padding: 0.4rem 1rem;\n  background: rgba(255, 255, 255, 0.7);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 999px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: #1f2937;\n  width: fit-content;\n  backdrop-filter: blur(10px);\n}\n\n.badge-dot {\n  width: 0.5rem;\n  height: 0.5rem;\n  background: #6366f1;\n  border-radius: 999px;\n  box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);\n}\n\n\n.hero-description {\n  font-size: 1rem;\n  color: #475569;\n  margin: 0;\n  max-width: 36rem;\n}\n\n.hero-actions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.75rem;\n}\n\n.btn {\n  border-radius: 999px !important;\n}\n\n.btn-primary {\n  background: linear-gradient(120deg, #4f46e5, #0ea5e9);\n  border: none;\n  color: white;\n}\n\n.btn-ghost {\n  background: rgba(255, 255, 255, 0.65);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: #0f172a;\n}\n\n.btn-secondary {\n  background: rgba(255, 255, 255, 0.8);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: #0f172a;\n}\n\n.visual-card {\n  background: rgba(255, 255, 255, 0.75);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 1.5rem;\n  padding: 1.5rem;\n  position: relative;\n  overflow: hidden;\n  backdrop-filter: blur(14px);\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1rem;\n  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);\n}\n\n.visual-card--primary .card-icon {\n  background: rgba(99, 102, 241, 0.15);\n  color: #4f46e5;\n}\n\n.visual-card--secondary .card-icon {\n  background: rgba(16, 185, 129, 0.15);\n  color: #059669;\n}\n\n.card-icon {\n  width: 3rem;\n  height: 3rem;\n  border-radius: 1rem;\n  display: grid;\n  place-items: center;\n  font-size: 1.5rem;\n}\n\n.card-content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.3rem;\n}\n\n.card-label {\n  font-size: 0.85rem;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #64748b;\n}\n\n.card-value {\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: #0f172a;\n}\n\n.card-trend {\n  font-size: 0.85rem;\n  color: #64748b;\n  display: flex;\n  align-items: center;\n  gap: 0.4rem;\n}\n\n.data-section {\n  position: relative;\n  z-index: 1;\n}\n\n.data-card {\n  background: rgba(255, 255, 255, 0.78);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 1.5rem;\n  padding: 1.5rem;\n  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);\n  backdrop-filter: blur(16px);\n}\n\n.data-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n\n.record-count {\n  color: #64748b;\n  font-size: 0.9rem;\n}\n\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4rem;\n  font-size: 0.8rem;\n  padding: 0.35rem 0.8rem;\n  border-radius: 999px;\n  font-weight: 600;\n}\n\n.status-badge--success {\n  background: rgba(34, 197, 94, 0.15);\n  color: #15803d;\n}\n\n.table-wrapper {\n  width: 100%;\n}\n\n.data-table :deep(.p-datatable) {\n  background: transparent;\n}\n\n.level-name {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.level-description {\n  color: #475569;\n}\n\n.rank-chip {\n  display: inline-flex;\n  padding: 0.2rem 0.6rem;\n  border-radius: 999px;\n  background: rgba(99, 102, 241, 0.15);\n  color: #4f46e5;\n  font-weight: 600;\n}\n\n.status-icon.success {\n  color: #16a34a;\n}\n\n.status-icon.muted {\n  color: #cbd5f5;\n}\n\n.dialog-form {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  overflow-x: hidden;\n}\n\n.dialog-body {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  overflow-x: hidden;\n}\n\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  > p-inputgroup,\n  > p-inputGroup,\n  > p-select,\n  > p-inputnumber,\n  > input,\n  > textarea,\n  > .form-field__input {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .form-field__input {\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n  }\n\n  input,\n  textarea {\n    border-radius: 12px;\n  }\n\n  textarea {\n    resize: vertical;\n    min-height: 96px;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n}\n\n.field-hint {\n  font-size: 0.8rem;\n  color: #64748b;\n}\n\n.required {\n  color: #ef4444;\n}\n\n.checkbox-row {\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.65rem 0.75rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.65);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n\n  .checkbox-copy {\n    display: flex;\n    flex-direction: column;\n    gap: 0.15rem;\n    color: #0f172a;\n    font-weight: 500;\n\n    small {\n      font-size: 0.75rem;\n      color: #64748b;\n      font-weight: 400;\n    }\n  }\n}\n\n.dialog-footer {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n}\n\n:host ::ng-deep .security-level-dialog .p-dialog {\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.82);\n  border: 1px solid rgba(148, 163, 184, 0.35);\n  box-shadow:\n    0 24px 60px rgba(15, 23, 42, 0.22),\n    inset 0 1px 0 rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(18px) saturate(160%);\n}\n\n:host ::ng-deep .security-level-dialog .p-dialog-header,\n:host ::ng-deep .security-level-dialog .p-dialog-content,\n:host ::ng-deep .security-level-dialog .p-dialog-footer {\n  background: transparent;\n}\n\n:host ::ng-deep .security-level-dialog .p-dialog-content {\n  overflow-x: hidden;\n}\n\n:host ::ng-deep .security-level-dialog .p-inputgroup {\n  width: 100%;\n}\n\n:host ::ng-deep .security-level-dialog .p-inputgroup > textarea {\n  width: 100%;\n}\n\n.btn-sm {\n  padding: 0.35rem 0.8rem;\n  font-size: 0.85rem;\n}\n\n.danger {\n  color: #dc2626;\n  border-color: rgba(239, 68, 68, 0.4);\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SecurityLevelsPage, { className: "SecurityLevelsPage", filePath: "src/app/crm/features/settings/pages/security-levels.page.ts", lineNumber: 49 }); })();
