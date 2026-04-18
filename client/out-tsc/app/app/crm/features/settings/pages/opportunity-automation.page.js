import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { OpportunityAutomationService } from '../services/opportunity-automation.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/button";
import * as i3 from "primeng/inputgroup";
import * as i4 from "primeng/inputgroupaddon";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/select";
const _c0 = () => [0, 1, 2];
function OpportunityAutomationPage_div_30_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 49);
} }
function OpportunityAutomationPage_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵtemplate(1, OpportunityAutomationPage_div_30_div_1_Template, 1, 0, "div", 48);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c0));
} }
function OpportunityAutomationPage_div_31_article_1_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const rule_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Priority: ", rule_r2.priority);
} }
function OpportunityAutomationPage_div_31_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 52)(1, "div", 53)(2, "h3");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 54);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 55);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 56)(9, "span");
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, OpportunityAutomationPage_div_31_article_1_span_11_Template, 2, 1, "span", 57);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "div", 58)(13, "button", 46);
    i0.ɵɵlistener("click", function OpportunityAutomationPage_div_31_article_1_Template_button_click_13_listener() { const rule_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.startEdit(rule_r2)); });
    i0.ɵɵtext(14, " Edit ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "button", 46);
    i0.ɵɵlistener("click", function OpportunityAutomationPage_div_31_article_1_Template_button_click_15_listener() { const rule_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toggleActive(rule_r2)); });
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 59);
    i0.ɵɵlistener("click", function OpportunityAutomationPage_div_31_article_1_Template_button_click_17_listener() { const rule_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.deleteRule(rule_r2)); });
    i0.ɵɵtext(18, " Delete ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const rule_r2 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(rule_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Stage: ", rule_r2.stageName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(rule_r2.taskSubject);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Due +", rule_r2.dueInDays, " days");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", rule_r2.priority);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", rule_r2.isActive ? "Pause" : "Activate", " ");
} }
function OpportunityAutomationPage_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtemplate(1, OpportunityAutomationPage_div_31_article_1_Template, 19, 6, "article", 51);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.rules());
} }
function OpportunityAutomationPage_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60)(1, "p");
    i0.ɵɵtext(2, "No automation rules yet.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "Add your first stage trigger on the right.");
    i0.ɵɵelementEnd()();
} }
export class OpportunityAutomationPage {
    automationService = inject(OpportunityAutomationService);
    toastService = inject(AppToastService);
    rules = signal([], ...(ngDevMode ? [{ debugName: "rules" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    editingId = signal(null, ...(ngDevMode ? [{ debugName: "editingId" }] : []));
    priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' }
    ];
    form = {
        name: '',
        stageName: '',
        taskSubject: '',
        taskDescription: '',
        dueInDays: 0,
        priority: 'Medium',
        isActive: true
    };
    constructor() {
        this.loadRules();
    }
    loadRules() {
        this.loading.set(true);
        this.automationService.getRules().subscribe({
            next: (rules) => {
                this.rules.set(rules);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.raiseToast('error', 'Unable to load automation rules.');
            }
        });
    }
    startEdit(rule) {
        this.editingId.set(rule.id);
        this.form = {
            name: rule.name,
            stageName: rule.stageName,
            taskSubject: rule.taskSubject,
            taskDescription: rule.taskDescription ?? '',
            dueInDays: rule.dueInDays,
            priority: rule.priority ?? 'Medium',
            isActive: rule.isActive
        };
    }
    resetForm() {
        this.editingId.set(null);
        this.form = {
            name: '',
            stageName: '',
            taskSubject: '',
            taskDescription: '',
            dueInDays: 0,
            priority: 'Medium',
            isActive: true
        };
    }
    saveRule() {
        if (!this.form.name.trim() || !this.form.stageName.trim() || !this.form.taskSubject.trim()) {
            this.raiseToast('error', 'Name, stage, and task subject are required.');
            return;
        }
        const payload = {
            ...this.form,
            name: this.form.name.trim(),
            stageName: this.form.stageName.trim(),
            taskSubject: this.form.taskSubject.trim(),
            taskDescription: this.form.taskDescription?.trim() || null,
            dueInDays: Number(this.form.dueInDays) || 0,
            priority: this.form.priority ?? 'Medium',
            isActive: this.form.isActive
        };
        this.saving.set(true);
        const editingId = this.editingId();
        if (editingId) {
            this.automationService.updateRule(editingId, payload).subscribe({
                next: () => {
                    this.saving.set(false);
                    this.resetForm();
                    this.loadRules();
                    this.raiseToast('success', 'Rule updated.');
                },
                error: (error) => {
                    this.saving.set(false);
                    this.raiseToast('error', error?.error ?? 'Unable to save rule.');
                }
            });
            return;
        }
        this.automationService.createRule(payload).subscribe({
            next: () => {
                this.saving.set(false);
                this.resetForm();
                this.loadRules();
                this.raiseToast('success', 'Rule created.');
            },
            error: (error) => {
                this.saving.set(false);
                this.raiseToast('error', error?.error ?? 'Unable to save rule.');
            }
        });
    }
    deleteRule(rule) {
        const confirmed = confirm(`Delete automation rule "${rule.name}"?`);
        if (!confirmed)
            return;
        this.automationService.deleteRule(rule.id).subscribe({
            next: () => {
                this.loadRules();
                if (this.editingId() === rule.id) {
                    this.resetForm();
                }
                this.raiseToast('success', 'Rule deleted.');
            },
            error: () => {
                this.raiseToast('error', 'Unable to delete rule.');
            }
        });
    }
    toggleActive(rule) {
        const payload = {
            name: rule.name,
            stageName: rule.stageName,
            taskSubject: rule.taskSubject,
            taskDescription: rule.taskDescription ?? null,
            dueInDays: rule.dueInDays,
            priority: rule.priority ?? 'Medium',
            isActive: !rule.isActive
        };
        this.automationService.updateRule(rule.id, payload).subscribe({
            next: () => this.loadRules(),
            error: () => this.raiseToast('error', 'Unable to update rule.')
        });
    }
    clearToast() {
        this.toastService.clear();
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    static ɵfac = function OpportunityAutomationPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OpportunityAutomationPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OpportunityAutomationPage, selectors: [["app-opportunity-automation-page"]], decls: 98, vars: 18, consts: [[1, "page-container"], [1, "page-header"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "header-actions"], ["pButton", "", "type", "button", "routerLink", "/app/settings", 1, "btn-secondary"], [1, "pi", "pi-arrow-left"], ["pButton", "", "type", "button", 1, "btn-ghost", 3, "click", "disabled"], [1, "pi", "pi-refresh"], [1, "automation-grid"], [1, "glass-card", "rules-panel"], [1, "card-header"], [1, "pill"], ["class", "loading-state", 4, "ngIf"], ["class", "rules-list", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "glass-card", "editor-panel"], [1, "rule-form", 3, "ngSubmit"], [1, "form-field"], ["for", "oa-name"], [1, "required"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-tag"], ["pInputText", "", "id", "oa-name", "name", "name", "placeholder", "Discovery follow-up", 3, "ngModelChange", "ngModel"], ["for", "oa-stageName"], [1, "icon-addon", "icon-addon--company"], [1, "pi", "pi-flag"], ["pInputText", "", "id", "oa-stageName", "name", "stageName", "placeholder", "Discovery (or Any)", 3, "ngModelChange", "ngModel"], ["for", "oa-taskSubject"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-file-edit"], ["pInputText", "", "id", "oa-taskSubject", "name", "taskSubject", "placeholder", "Schedule discovery recap", 3, "ngModelChange", "ngModel"], ["for", "oa-taskDescription"], [1, "pi", "pi-info-circle"], ["pInputText", "", "id", "oa-taskDescription", "name", "taskDescription", "placeholder", "Notes sent within 24h.", 3, "ngModelChange", "ngModel"], [1, "field-row"], ["for", "oa-dueInDays"], [1, "pi", "pi-clock"], ["pInputText", "", "id", "oa-dueInDays", "type", "number", "min", "0", "name", "dueInDays", 3, "ngModelChange", "ngModel"], ["for", "oa-priority"], ["id", "oa-priority", "appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "priority", "placeholder", "Medium", 3, "ngModelChange", "options", "ngModel"], [1, "checkbox-row"], ["type", "checkbox", "name", "isActive", 3, "ngModelChange", "ngModel"], [1, "form-actions"], ["pButton", "", "type", "submit", 1, "btn-primary", 3, "disabled"], ["pButton", "", "type", "button", 1, "btn-ghost", 3, "click"], [1, "loading-state"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "rules-list"], ["class", "rule-card", 4, "ngFor", "ngForOf"], [1, "rule-card"], [1, "rule-main"], [1, "rule-stage"], [1, "rule-task"], [1, "rule-meta"], [4, "ngIf"], [1, "rule-actions"], ["pButton", "", "type", "button", 1, "btn-danger", 3, "click"], [1, "empty-state"]], template: function OpportunityAutomationPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-breadcrumbs");
            i0.ɵɵelementStart(2, "header", 1)(3, "div")(4, "h1", 2)(5, "span", 3);
            i0.ɵɵtext(6, "Opportunity");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "span", 4);
            i0.ɵɵtext(8, "Automation");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "p");
            i0.ɵɵtext(10, "Trigger tasks automatically when an opportunity enters a stage.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 5)(12, "button", 6);
            i0.ɵɵelement(13, "i", 7);
            i0.ɵɵelementStart(14, "span");
            i0.ɵɵtext(15, "Back to Settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "button", 8);
            i0.ɵɵlistener("click", function OpportunityAutomationPage_Template_button_click_16_listener() { return ctx.loadRules(); });
            i0.ɵɵelement(17, "i", 9);
            i0.ɵɵelementStart(18, "span");
            i0.ɵɵtext(19, "Reload");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(20, "div", 10)(21, "section", 11)(22, "div", 12)(23, "div")(24, "h2");
            i0.ɵɵtext(25, "Automation Rules");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "p");
            i0.ɵɵtext(27, "Stage-based tasks used to keep deals moving.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "span", 13);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(30, OpportunityAutomationPage_div_30_Template, 2, 2, "div", 14)(31, OpportunityAutomationPage_div_31_Template, 2, 1, "div", 15)(32, OpportunityAutomationPage_div_32_Template, 5, 0, "div", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "section", 17)(34, "div", 12)(35, "div")(36, "h2");
            i0.ɵɵtext(37);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "p");
            i0.ɵɵtext(39, "Define the stage trigger and task details.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(40, "form", 18);
            i0.ɵɵlistener("ngSubmit", function OpportunityAutomationPage_Template_form_ngSubmit_40_listener() { return ctx.saveRule(); });
            i0.ɵɵelementStart(41, "div", 19)(42, "label", 20);
            i0.ɵɵtext(43, "Rule name ");
            i0.ɵɵelementStart(44, "span", 21);
            i0.ɵɵtext(45, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "p-inputgroup")(47, "p-inputgroup-addon", 22);
            i0.ɵɵelement(48, "i", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "input", 24);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityAutomationPage_Template_input_ngModelChange_49_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.name, $event) || (ctx.form.name = $event); return $event; });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(50, "div", 19)(51, "label", 25);
            i0.ɵɵtext(52, "Stage name ");
            i0.ɵɵelementStart(53, "span", 21);
            i0.ɵɵtext(54, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(55, "p-inputgroup")(56, "p-inputgroup-addon", 26);
            i0.ɵɵelement(57, "i", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "input", 28);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityAutomationPage_Template_input_ngModelChange_58_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.stageName, $event) || (ctx.form.stageName = $event); return $event; });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(59, "div", 19)(60, "label", 29);
            i0.ɵɵtext(61, "Task subject ");
            i0.ɵɵelementStart(62, "span", 21);
            i0.ɵɵtext(63, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(64, "p-inputgroup")(65, "p-inputgroup-addon", 30);
            i0.ɵɵelement(66, "i", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "input", 32);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityAutomationPage_Template_input_ngModelChange_67_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.taskSubject, $event) || (ctx.form.taskSubject = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(68, "small");
            i0.ɵɵtext(69);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(70, "div", 19)(71, "label", 33);
            i0.ɵɵtext(72, "Task description");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "p-inputgroup")(74, "p-inputgroup-addon", 30);
            i0.ɵɵelement(75, "i", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "input", 35);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityAutomationPage_Template_input_ngModelChange_76_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.taskDescription, $event) || (ctx.form.taskDescription = $event); return $event; });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(77, "div", 36)(78, "div", 19)(79, "label", 37);
            i0.ɵɵtext(80, "Due in days");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(81, "p-inputgroup")(82, "p-inputgroup-addon", 30);
            i0.ɵɵelement(83, "i", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "input", 39);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityAutomationPage_Template_input_ngModelChange_84_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.dueInDays, $event) || (ctx.form.dueInDays = $event); return $event; });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(85, "div", 19)(86, "label", 40);
            i0.ɵɵtext(87, "Priority");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "p-select", 41);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityAutomationPage_Template_p_select_ngModelChange_88_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.priority, $event) || (ctx.form.priority = $event); return $event; });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(89, "label", 42)(90, "input", 43);
            i0.ɵɵtwoWayListener("ngModelChange", function OpportunityAutomationPage_Template_input_ngModelChange_90_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.form.isActive, $event) || (ctx.form.isActive = $event); return $event; });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "span");
            i0.ɵɵtext(92, "Active");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(93, "div", 44)(94, "button", 45);
            i0.ɵɵtext(95);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "button", 46);
            i0.ɵɵlistener("click", function OpportunityAutomationPage_Template_button_click_96_listener() { return ctx.resetForm(); });
            i0.ɵɵtext(97, "Reset");
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(16);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate1("", ctx.rules().length, " rules");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading() && ctx.rules().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading() && !ctx.rules().length);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.editingId() ? "Edit Rule" : "Create Rule");
            i0.ɵɵadvance(12);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.name);
            i0.ɵɵadvance(9);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.stageName);
            i0.ɵɵadvance(9);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.taskSubject);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate2("Use ", "{", "Opportunity", "}", " to include the deal name.");
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.taskDescription);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.dueInDays);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.priorityOptions);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.priority);
            i0.ɵɵadvance(2);
            i0.ɵɵtwoWayProperty("ngModel", ctx.form.isActive);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.saving());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.editingId() ? "Update rule" : "Create rule", " ");
        } }, dependencies: [NgIf, NgFor, FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.NgModel, i1.NgForm, ButtonModule, i2.ButtonDirective, InputGroupModule, i3.InputGroup, InputGroupAddonModule, i4.InputGroupAddon, InputTextModule, i5.InputText, SelectModule, i6.Select, RouterLink, BreadcrumbsComponent], styles: [".page-container[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n\n.page-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n  margin-bottom: 24px;\n\n  h1 {\n    margin: 0;\n  }\n\n  p {\n    margin: 4px 0 0;\n    color: var(--text-muted, #667085);\n  }\n}\n\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n\n.automation-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);\n  gap: 24px;\n}\n\n.glass-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  border-radius: 16px;\n  padding: 20px;\n  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);\n}\n\n.card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 16px;\n\n  h2 {\n    margin: 0 0 4px;\n  }\n\n  p {\n    margin: 0;\n    color: var(--text-muted, #667085);\n  }\n}\n\n.pill[_ngcontent-%COMP%] {\n  background: #eef2ff;\n  color: #3730a3;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 12px;\n}\n\n.rules-list[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n\n.rule-card[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  border-radius: 12px;\n  padding: 14px 16px;\n}\n\n.rule-stage[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1d4ed8;\n  margin: 4px 0;\n}\n\n.rule-task[_ngcontent-%COMP%] {\n  margin: 4px 0;\n}\n\n.rule-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  font-size: 12px;\n  color: var(--text-muted, #667085);\n}\n\n.rule-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n  color: var(--text-muted, #667085);\n}\n\n.rule-form[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 14px;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea,\n  > .form-field__input {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n}\n\n.field-row[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.checkbox-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n\n.btn-primary[_ngcontent-%COMP%], \n.btn-secondary[_ngcontent-%COMP%], \n.btn-ghost[_ngcontent-%COMP%], \n.btn-danger[_ngcontent-%COMP%] {\n  border-radius: 10px;\n}\n\n.btn-danger[_ngcontent-%COMP%] {\n  background: #fee2e2;\n  color: #b91c1c;\n}\n\n.loading-state[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  height: 48px;\n  border-radius: 10px;\n  background: linear-gradient(90deg, #f1f5f9, #e2e8f0, #f1f5f9);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.4s ease infinite;\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 100% 0;\n  }\n  100% {\n    background-position: -100% 0;\n  }\n}\n\n@media (max-width: 1100px) {\n  .automation-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OpportunityAutomationPage, [{
        type: Component,
        args: [{ selector: 'app-opportunity-automation-page', standalone: true, imports: [NgIf, NgFor, FormsModule, ButtonModule, InputGroupModule, InputGroupAddonModule, InputTextModule, SelectModule, RouterLink, BreadcrumbsComponent], template: "<div class=\"page-container\">\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <header class=\"page-header\">\n    <div>\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Opportunity</span>\n        <span class=\"title-light\">Automation</span>\n      </h1>\n      <p>Trigger tasks automatically when an opportunity enters a stage.</p>\n    </div>\n    <div class=\"header-actions\">\n      <button pButton type=\"button\" class=\"btn-secondary\" routerLink=\"/app/settings\">\n        <i class=\"pi pi-arrow-left\"></i>\n        <span>Back to Settings</span>\n      </button>\n      <button pButton type=\"button\" class=\"btn-ghost\" [disabled]=\"loading()\" (click)=\"loadRules()\">\n        <i class=\"pi pi-refresh\"></i>\n        <span>Reload</span>\n      </button>\n    </div>\n  </header>\n\n  <div class=\"automation-grid\">\n    <section class=\"glass-card rules-panel\">\n      <div class=\"card-header\">\n        <div>\n          <h2>Automation Rules</h2>\n          <p>Stage-based tasks used to keep deals moving.</p>\n        </div>\n        <span class=\"pill\">{{ rules().length }} rules</span>\n      </div>\n\n      <div class=\"loading-state\" *ngIf=\"loading()\">\n        <div class=\"skeleton-row\" *ngFor=\"let _ of [0,1,2]\"></div>\n      </div>\n\n      <div class=\"rules-list\" *ngIf=\"!loading() && rules().length\">\n        <article class=\"rule-card\" *ngFor=\"let rule of rules()\">\n          <div class=\"rule-main\">\n            <h3>{{ rule.name }}</h3>\n            <p class=\"rule-stage\">Stage: {{ rule.stageName }}</p>\n            <p class=\"rule-task\">{{ rule.taskSubject }}</p>\n            <p class=\"rule-meta\">\n              <span>Due +{{ rule.dueInDays }} days</span>\n              <span *ngIf=\"rule.priority\">Priority: {{ rule.priority }}</span>\n            </p>\n          </div>\n          <div class=\"rule-actions\">\n            <button pButton type=\"button\" class=\"btn-ghost\" (click)=\"startEdit(rule)\">\n              Edit\n            </button>\n            <button pButton type=\"button\" class=\"btn-ghost\" (click)=\"toggleActive(rule)\">\n              {{ rule.isActive ? 'Pause' : 'Activate' }}\n            </button>\n            <button pButton type=\"button\" class=\"btn-danger\" (click)=\"deleteRule(rule)\">\n              Delete\n            </button>\n          </div>\n        </article>\n      </div>\n\n      <div class=\"empty-state\" *ngIf=\"!loading() && !rules().length\">\n        <p>No automation rules yet.</p>\n        <p>Add your first stage trigger on the right.</p>\n      </div>\n    </section>\n\n    <section class=\"glass-card editor-panel\">\n      <div class=\"card-header\">\n        <div>\n          <h2>{{ editingId() ? 'Edit Rule' : 'Create Rule' }}</h2>\n          <p>Define the stage trigger and task details.</p>\n        </div>\n      </div>\n\n      <form class=\"rule-form\" (ngSubmit)=\"saveRule()\">\n        <div class=\"form-field\">\n          <label for=\"oa-name\">Rule name <span class=\"required\">*</span></label>\n          <p-inputgroup>\n            <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n              <i class=\"pi pi-tag\"></i>\n            </p-inputgroup-addon>\n            <input pInputText id=\"oa-name\" [(ngModel)]=\"form.name\" name=\"name\" placeholder=\"Discovery follow-up\" />\n          </p-inputgroup>\n        </div>\n\n        <div class=\"form-field\">\n          <label for=\"oa-stageName\">Stage name <span class=\"required\">*</span></label>\n          <p-inputgroup>\n            <p-inputgroup-addon class=\"icon-addon icon-addon--company\">\n              <i class=\"pi pi-flag\"></i>\n            </p-inputgroup-addon>\n            <input pInputText id=\"oa-stageName\" [(ngModel)]=\"form.stageName\" name=\"stageName\" placeholder=\"Discovery (or Any)\" />\n          </p-inputgroup>\n        </div>\n\n        <div class=\"form-field\">\n          <label for=\"oa-taskSubject\">Task subject <span class=\"required\">*</span></label>\n          <p-inputgroup>\n            <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n              <i class=\"pi pi-file-edit\"></i>\n            </p-inputgroup-addon>\n            <input pInputText id=\"oa-taskSubject\" [(ngModel)]=\"form.taskSubject\" name=\"taskSubject\" placeholder=\"Schedule discovery recap\" />\n          </p-inputgroup>\n          <small>Use {{ '{' }}Opportunity{{ '}' }} to include the deal name.</small>\n        </div>\n\n        <div class=\"form-field\">\n          <label for=\"oa-taskDescription\">Task description</label>\n          <p-inputgroup>\n            <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n              <i class=\"pi pi-info-circle\"></i>\n            </p-inputgroup-addon>\n            <input pInputText id=\"oa-taskDescription\" [(ngModel)]=\"form.taskDescription\" name=\"taskDescription\" placeholder=\"Notes sent within 24h.\" />\n          </p-inputgroup>\n        </div>\n\n        <div class=\"field-row\">\n          <div class=\"form-field\">\n            <label for=\"oa-dueInDays\">Due in days</label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n                <i class=\"pi pi-clock\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"oa-dueInDays\" type=\"number\" min=\"0\" [(ngModel)]=\"form.dueInDays\" name=\"dueInDays\" />\n            </p-inputgroup>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"oa-priority\">Priority</label>\n            <p-select\n              id=\"oa-priority\"\n              appendTo=\"body\"\n              [options]=\"priorityOptions\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              [(ngModel)]=\"form.priority\"\n              name=\"priority\"\n              placeholder=\"Medium\"\n            ></p-select>\n          </div>\n        </div>\n\n        <label class=\"checkbox-row\">\n          <input type=\"checkbox\" [(ngModel)]=\"form.isActive\" name=\"isActive\" />\n          <span>Active</span>\n        </label>\n\n        <div class=\"form-actions\">\n          <button pButton type=\"submit\" class=\"btn-primary\" [disabled]=\"saving()\">\n            {{ editingId() ? 'Update rule' : 'Create rule' }}\n          </button>\n          <button pButton type=\"button\" class=\"btn-ghost\" (click)=\"resetForm()\">Reset</button>\n        </div>\n      </form>\n    </section>\n  </div>\n</div>\n", styles: [".page-container {\n  padding: 24px;\n}\n\n.page-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n  margin-bottom: 24px;\n\n  h1 {\n    margin: 0;\n  }\n\n  p {\n    margin: 4px 0 0;\n    color: var(--text-muted, #667085);\n  }\n}\n\n.header-actions {\n  display: flex;\n  gap: 12px;\n}\n\n.automation-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);\n  gap: 24px;\n}\n\n.glass-card {\n  background: rgba(255, 255, 255, 0.9);\n  border-radius: 16px;\n  padding: 20px;\n  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);\n}\n\n.card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 16px;\n\n  h2 {\n    margin: 0 0 4px;\n  }\n\n  p {\n    margin: 0;\n    color: var(--text-muted, #667085);\n  }\n}\n\n.pill {\n  background: #eef2ff;\n  color: #3730a3;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 12px;\n}\n\n.rules-list {\n  display: grid;\n  gap: 12px;\n}\n\n.rule-card {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  border: 1px solid rgba(15, 23, 42, 0.08);\n  border-radius: 12px;\n  padding: 14px 16px;\n}\n\n.rule-stage {\n  font-weight: 600;\n  color: #1d4ed8;\n  margin: 4px 0;\n}\n\n.rule-task {\n  margin: 4px 0;\n}\n\n.rule-meta {\n  display: flex;\n  gap: 12px;\n  font-size: 12px;\n  color: var(--text-muted, #667085);\n}\n\n.rule-actions {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.empty-state {\n  padding: 24px;\n  text-align: center;\n  color: var(--text-muted, #667085);\n}\n\n.rule-form {\n  display: grid;\n  gap: 14px;\n}\n\n.form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea,\n  > .form-field__input {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n}\n\n.field-row {\n  display: grid;\n  gap: 12px;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n\n.checkbox-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.form-actions {\n  display: flex;\n  gap: 12px;\n}\n\n.btn-primary,\n.btn-secondary,\n.btn-ghost,\n.btn-danger {\n  border-radius: 10px;\n}\n\n.btn-danger {\n  background: #fee2e2;\n  color: #b91c1c;\n}\n\n.loading-state {\n  display: grid;\n  gap: 12px;\n}\n\n.skeleton-row {\n  height: 48px;\n  border-radius: 10px;\n  background: linear-gradient(90deg, #f1f5f9, #e2e8f0, #f1f5f9);\n  background-size: 200% 100%;\n  animation: shimmer 1.4s ease infinite;\n}\n\n@keyframes shimmer {\n  0% {\n    background-position: 100% 0;\n  }\n  100% {\n    background-position: -100% 0;\n  }\n}\n\n@media (max-width: 1100px) {\n  .automation-grid {\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OpportunityAutomationPage, { className: "OpportunityAutomationPage", filePath: "src/app/crm/features/settings/pages/opportunity-automation.page.ts", lineNumber: 30 }); })();
