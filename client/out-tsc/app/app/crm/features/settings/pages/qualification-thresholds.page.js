import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
import * as i2 from "primeng/inputnumber";
import * as i3 from "primeng/select";
import * as i4 from "@angular/forms";
const _c0 = () => [0, 1, 2];
const _c1 = () => ({ standalone: true });
function QualificationThresholdsPage_span_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 44);
    i0.ɵɵelement(1, "i", 45);
    i0.ɵɵtext(2, " Ready ");
    i0.ɵɵelementEnd();
} }
function QualificationThresholdsPage_div_68_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵelement(1, "div", 49)(2, "div", 50);
    i0.ɵɵelementEnd();
} }
function QualificationThresholdsPage_div_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵtemplate(1, QualificationThresholdsPage_div_68_div_1_Template, 3, 0, "div", 47);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c0));
} }
function QualificationThresholdsPage_form_69_div_14_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 67)(1, "p-select", 68);
    i0.ɵɵlistener("ngModelChange", function QualificationThresholdsPage_form_69_div_14_div_1_Template_p_select_ngModelChange_1_listener($event) { const i_r4 = i0.ɵɵrestoreView(_r3).index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateThresholdRule(i_r4, { segment: $event })); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "p-select", 69);
    i0.ɵɵlistener("ngModelChange", function QualificationThresholdsPage_form_69_div_14_div_1_Template_p_select_ngModelChange_2_listener($event) { const i_r4 = i0.ɵɵrestoreView(_r3).index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateThresholdRule(i_r4, { dealType: $event })); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p-select", 70);
    i0.ɵɵlistener("ngModelChange", function QualificationThresholdsPage_form_69_div_14_div_1_Template_p_select_ngModelChange_3_listener($event) { const i_r4 = i0.ɵɵrestoreView(_r3).index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateThresholdRule(i_r4, { stage: $event })); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p-inputNumber", 71);
    i0.ɵɵlistener("ngModelChange", function QualificationThresholdsPage_form_69_div_14_div_1_Template_p_inputNumber_ngModelChange_4_listener($event) { const i_r4 = i0.ɵɵrestoreView(_r3).index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateThresholdRule(i_r4, { threshold: $event })); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 72);
    i0.ɵɵlistener("click", function QualificationThresholdsPage_form_69_div_14_div_1_Template_button_click_5_listener() { const i_r4 = i0.ɵɵrestoreView(_r3).index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.removeThresholdRule(i_r4)); });
    i0.ɵɵelement(6, "i", 73);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const rule_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r1.segmentOptions)("ngModel", rule_r5.segment)("ngModelOptions", i0.ɵɵpureFunction0(13, _c1));
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r1.dealTypeOptions)("ngModel", rule_r5.dealType)("ngModelOptions", i0.ɵɵpureFunction0(14, _c1));
    i0.ɵɵadvance();
    i0.ɵɵproperty("options", ctx_r1.stageOptions)("ngModel", rule_r5.stage)("ngModelOptions", i0.ɵɵpureFunction0(15, _c1));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", rule_r5.threshold)("min", 0)("max", 100)("ngModelOptions", i0.ɵɵpureFunction0(16, _c1));
} }
function QualificationThresholdsPage_form_69_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65);
    i0.ɵɵtemplate(1, QualificationThresholdsPage_form_69_div_14_div_1_Template, 7, 17, "div", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.qualificationPolicy().thresholdRules);
} }
function QualificationThresholdsPage_form_69_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 74);
    i0.ɵɵtext(1, "No contextual rules yet. Add rules to override the default threshold.");
    i0.ɵɵelementEnd();
} }
function QualificationThresholdsPage_form_69_i_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 75);
} }
function QualificationThresholdsPage_form_69_i_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 76);
} }
function QualificationThresholdsPage_form_69_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 51);
    i0.ɵɵlistener("ngSubmit", function QualificationThresholdsPage_form_69_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.saveSettings()); });
    i0.ɵɵelementStart(1, "section", 52)(2, "h3", 53);
    i0.ɵɵelement(3, "i", 24);
    i0.ɵɵtext(4, " Rules ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 54);
    i0.ɵɵtext(6, "Each rule overrides the default threshold for matching deals");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 55)(8, "div", 56)(9, "h4");
    i0.ɵɵtext(10, "Contextual Rules");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "button", 57);
    i0.ɵɵlistener("click", function QualificationThresholdsPage_form_69_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.addThresholdRule()); });
    i0.ɵɵelement(12, "i", 58);
    i0.ɵɵtext(13, " Add rule ");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(14, QualificationThresholdsPage_form_69_div_14_Template, 2, 1, "div", 59)(15, QualificationThresholdsPage_form_69_ng_template_15_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "div", 60)(18, "button", 61);
    i0.ɵɵlistener("click", function QualificationThresholdsPage_form_69_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadSettings()); });
    i0.ɵɵelement(19, "i", 20);
    i0.ɵɵtext(20, " Reset ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 62);
    i0.ɵɵtemplate(22, QualificationThresholdsPage_form_69_i_22_Template, 1, 0, "i", 63)(23, QualificationThresholdsPage_form_69_i_23_Template, 1, 0, "i", 64);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const noRules_r6 = i0.ɵɵreference(16);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.settingsForm);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngIf", ctx_r1.qualificationPolicy().thresholdRules.length)("ngIfElse", noRules_r6);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.loading());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", ctx_r1.saving() || !ctx_r1.canManageAdmin());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.saving());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.saving() ? "Saving..." : "Save Threshold Rules", " ");
} }
export class QualificationThresholdsPage {
    settingsService = inject(WorkspaceSettingsService);
    toastService = inject(AppToastService);
    fb = inject(FormBuilder);
    referenceData = inject(ReferenceDataService);
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    canManageAdmin = signal(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage), ...(ngDevMode ? [{ debugName: "canManageAdmin" }] : []));
    settingsForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(120)]],
        timeZone: ['UTC', [Validators.required]],
        currency: ['', [Validators.required]]
    });
    qualificationPolicy = signal(QualificationThresholdsPage.defaultPolicy(), ...(ngDevMode ? [{ debugName: "qualificationPolicy" }] : []));
    dealTypeOptions = [
        { label: 'All', value: 'All' },
        { label: 'Inbound', value: 'Inbound' },
        { label: 'Outbound', value: 'Outbound' },
        { label: 'Expansion', value: 'Expansion' },
        { label: 'Partner', value: 'Partner' }
    ];
    segmentOptions = [
        { label: 'All', value: 'All' },
        { label: 'SMB', value: 'SMB' },
        { label: 'Mid', value: 'Mid' },
        { label: 'Enterprise', value: 'Enterprise' }
    ];
    stageOptions = [
        { label: 'All', value: 'All' },
        { label: 'Discovery', value: 'Discovery' },
        { label: 'Qualification', value: 'Qualification' },
        { label: 'Proposal', value: 'Proposal' },
        { label: 'Negotiation', value: 'Negotiation' }
    ];
    loadedSettings = null;
    currencyFallback = '';
    constructor() {
        this.loadCurrencyFallback();
        this.loadSettings();
    }
    loadSettings() {
        this.loading.set(true);
        this.settingsService.getSettings().subscribe({
            next: (settings) => {
                this.applySettings(settings);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.raiseToast('error', 'Unable to load contextual thresholds');
            }
        });
    }
    saveSettings() {
        if (!this.loadedSettings) {
            return;
        }
        const currentPolicy = this.qualificationPolicy();
        const safePayload = {
            name: this.loadedSettings.name ?? 'Workspace',
            timeZone: this.loadedSettings.timeZone ?? 'UTC',
            currency: this.resolveCurrency(this.loadedSettings.currency ?? null),
            leadFirstTouchSlaHours: this.loadedSettings.leadFirstTouchSlaHours ?? 24,
            defaultContractTermMonths: this.loadedSettings.defaultContractTermMonths ?? null,
            defaultDeliveryOwnerRoleId: this.loadedSettings.defaultDeliveryOwnerRoleId ?? null,
            approvalAmountThreshold: this.loadedSettings.approvalAmountThreshold ?? null,
            approvalApproverRole: this.loadedSettings.approvalApproverRole ?? '',
            approvalWorkflowPolicy: this.loadedSettings.approvalWorkflowPolicy ?? null,
            qualificationPolicy: {
                ...currentPolicy,
                thresholdRules: currentPolicy.thresholdRules
            }
        };
        this.saving.set(true);
        this.settingsService.updateSettings(safePayload).subscribe({
            next: (settings) => {
                this.saving.set(false);
                this.applySettings(settings);
                this.raiseToast('success', 'Contextual thresholds updated');
            },
            error: () => {
                this.saving.set(false);
                this.raiseToast('error', 'Unable to save contextual thresholds');
            }
        });
    }
    applySettings(settings) {
        this.loadedSettings = settings;
        this.settingsForm.patchValue({
            name: settings.name,
            timeZone: settings.timeZone,
            currency: this.resolveCurrency(settings.currency ?? null)
        });
        const policy = settings.qualificationPolicy ?? QualificationThresholdsPage.defaultPolicy();
        const normalized = {
            ...QualificationThresholdsPage.defaultPolicy(),
            ...policy,
            exposureWeights: (policy.exposureWeights && policy.exposureWeights.length > 0)
                ? policy.exposureWeights
                : QualificationThresholdsPage.defaultPolicy().exposureWeights,
            evidenceSources: (policy.evidenceSources && policy.evidenceSources.length > 0)
                ? policy.evidenceSources
                : QualificationThresholdsPage.defaultPolicy().evidenceSources
        };
        this.qualificationPolicy.set(normalized);
    }
    addThresholdRule() {
        const current = this.qualificationPolicy();
        const nextRule = {
            segment: 'All',
            dealType: 'All',
            stage: 'All',
            threshold: current.defaultThreshold
        };
        this.qualificationPolicy.set({
            ...current,
            thresholdRules: [...current.thresholdRules, nextRule]
        });
    }
    removeThresholdRule(index) {
        const current = this.qualificationPolicy();
        const next = current.thresholdRules.filter((_, idx) => idx !== index);
        this.qualificationPolicy.set({ ...current, thresholdRules: next });
    }
    updateThresholdRule(index, patch) {
        const current = this.qualificationPolicy();
        const next = current.thresholdRules.map((rule, idx) => idx === index ? { ...rule, ...patch } : rule);
        this.qualificationPolicy.set({ ...current, thresholdRules: next });
    }
    clearToast() {
        this.toastService.clear();
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    loadCurrencyFallback() {
        this.referenceData.getCurrencies().subscribe((items) => {
            const active = items.filter((currency) => currency.isActive);
            this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
            if (!this.settingsForm.value.currency && this.currencyFallback) {
                this.settingsForm.patchValue({ currency: this.currencyFallback });
            }
        });
    }
    resolveCurrency(value) {
        return value || this.currencyFallback || '';
    }
    static defaultPolicy() {
        return {
            defaultThreshold: 75,
            managerApprovalBelow: 50,
            blockBelow: 25,
            allowOverrides: true,
            requireOverrideReason: true,
            showCqvsInLeadList: false,
            requireEvidenceBeforeQualified: true,
            minimumEvidenceCoveragePercent: 50,
            factors: [
                { key: 'budget', displayLabel: 'Budget availability', isActive: true, isRequired: true, order: 10, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
                { key: 'readiness', displayLabel: 'Readiness to spend', isActive: true, isRequired: false, order: 20, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
                { key: 'timeline', displayLabel: 'Buying timeline', isActive: true, isRequired: true, order: 30, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
                { key: 'problem', displayLabel: 'Problem severity', isActive: true, isRequired: true, order: 40, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
                { key: 'economicBuyer', displayLabel: 'Economic buyer', isActive: true, isRequired: true, order: 50, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
                { key: 'icpFit', displayLabel: 'ICP fit', isActive: true, isRequired: false, order: 60, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] }
            ],
            factorEvidenceRules: [
                { factorKey: 'budget', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call notes', 'Discovery call notes', 'Discovery meeting notes', 'Email confirmation', 'Buyer email', 'Written confirmation', 'Proposal feedback'] },
                { factorKey: 'readiness', requireEvidence: false, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call notes', 'Discovery call notes', 'Meeting notes', 'Email confirmation', 'Chat transcript', 'Internal plan mention'] },
                { factorKey: 'timeline', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call notes', 'Discovery meeting notes', 'Meeting notes', 'Email confirmation', 'Buyer email', 'Written confirmation', 'Proposal feedback'] },
                { factorKey: 'problem', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call recap', 'Discovery call notes', 'Discovery meeting notes', 'Meeting notes', 'Ops review notes', 'Chat transcript'] },
                { factorKey: 'economicBuyer', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Meeting notes', 'Email from buyer', 'Buyer email', 'Written confirmation', 'Org chart reference'] },
                { factorKey: 'icpFit', requireEvidence: false, allowedEvidenceSources: ['No evidence yet', 'Account research', 'Org chart reference', 'Third-party confirmation', 'Historical / prior deal', 'Customer call'] }
            ],
            thresholdRules: [],
            modifiers: [
                { key: 'competitive', delta: 10 },
                { key: 'executiveChampion', delta: -15 },
                { key: 'strategic', delta: -15 },
                { key: 'fastVelocity', delta: -10 },
                { key: 'slowVelocity', delta: 10 }
            ],
            exposureWeights: [
                { key: 'budget', weight: 25 },
                { key: 'timeline', weight: 20 },
                { key: 'economicBuyer', weight: 20 },
                { key: 'problem', weight: 15 },
                { key: 'readiness', weight: 10 },
                { key: 'icpFit', weight: 10 }
            ],
            leadDataWeights: [
                { key: 'firstNameLastName', weight: 16 },
                { key: 'email', weight: 24 },
                { key: 'phone', weight: 24 },
                { key: 'companyName', weight: 16 },
                { key: 'jobTitle', weight: 12 },
                { key: 'source', weight: 8 }
            ],
            evidenceSources: [
                'No evidence yet',
                'Customer call',
                'Call notes',
                'Call recap',
                'Follow-up call notes',
                'Discovery call notes',
                'Discovery meeting notes',
                'Meeting notes',
                'Email confirmation',
                'Email from buyer',
                'Buyer email',
                'Written confirmation',
                'Chat transcript',
                'Proposal feedback',
                'Internal plan mention',
                'Ops review notes',
                'Org chart reference',
                'Account research',
                'Third-party confirmation',
                'Historical / prior deal',
                'Inferred from context'
            ]
        };
    }
    static ɵfac = function QualificationThresholdsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || QualificationThresholdsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: QualificationThresholdsPage, selectors: [["app-qualification-thresholds-page"]], decls: 70, vars: 7, consts: [["noRules", ""], [1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-actions"], ["pButton", "", "type", "button", "routerLink", "/app/settings/qualification-policy", 1, "btn", "btn-secondary"], [1, "pi", "pi-arrow-left"], ["pButton", "", "type", "button", "routerLink", "/app/settings", 1, "btn", "btn-secondary"], [1, "pi", "pi-cog"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", 3, "click", "disabled"], [1, "pi", "pi-refresh"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-sliders-h"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend"], [1, "pi", "pi-filter"], [1, "card-glow"], [1, "visual-card", "visual-card--secondary"], [1, "pi", "pi-flag"], [1, "pi", "pi-list"], [1, "data-section"], [1, "settings-layout"], [1, "data-card"], [1, "data-header"], [1, "header-title"], [1, "record-count"], [1, "header-actions"], ["class", "status-badge status-badge--success", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "settings-form", 3, "formGroup", "ngSubmit", 4, "ngIf"], [1, "status-badge", "status-badge--success"], [1, "pi", "pi-check"], [1, "loading-state"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton", "skeleton-text"], [1, "skeleton", "skeleton-input"], [1, "settings-form", 3, "ngSubmit", "formGroup"], [1, "form-card"], [1, "section-title", "section-title--info"], [1, "section-description"], [1, "policy-block"], [1, "policy-header"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "pi", "pi-plus"], ["class", "policy-list", 4, "ngIf", "ngIfElse"], [1, "form-actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["class", "pi pi-save", 4, "ngIf"], ["class", "pi pi-spinner pi-spin", 4, "ngIf"], [1, "policy-list"], ["class", "policy-row", 4, "ngFor", "ngForOf"], [1, "policy-row"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Segment", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Deal type", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Stage", "styleClass", "w-full", 3, "ngModelChange", "options", "ngModel", "ngModelOptions"], ["styleClass", "w-full", 3, "ngModelChange", "ngModel", "min", "max", "ngModelOptions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click"], [1, "pi", "pi-times"], [1, "hint"], [1, "pi", "pi-save"], [1, "pi", "pi-spinner", "pi-spin"]], template: function QualificationThresholdsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div", 2);
            i0.ɵɵelement(2, "div", 3)(3, "div", 4)(4, "div", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 6)(7, "div", 7)(8, "div", 8);
            i0.ɵɵelement(9, "span", 9);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Qualification");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 10)(13, "span", 11);
            i0.ɵɵtext(14, "Contextual");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 12);
            i0.ɵɵtext(16, "Threshold Rules");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 13);
            i0.ɵɵtext(18, " Override the default qualification threshold by segment, deal type, and stage so your rules match real selling motions. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 14)(20, "button", 15);
            i0.ɵɵelement(21, "i", 16);
            i0.ɵɵelementStart(22, "span");
            i0.ɵɵtext(23, "Back to Policy");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "button", 17);
            i0.ɵɵelement(25, "i", 18);
            i0.ɵɵelementStart(26, "span");
            i0.ɵɵtext(27, "Settings Home");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "button", 19);
            i0.ɵɵlistener("click", function QualificationThresholdsPage_Template_button_click_28_listener() { return ctx.loadSettings(); });
            i0.ɵɵelement(29, "i", 20);
            i0.ɵɵelementStart(30, "span");
            i0.ɵɵtext(31, "Reload");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(32, "div", 21)(33, "div", 22)(34, "div", 23);
            i0.ɵɵelement(35, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 25)(37, "span", 26);
            i0.ɵɵtext(38, "Rules");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "strong", 27);
            i0.ɵɵtext(40);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "span", 28);
            i0.ɵɵelement(42, "i", 29);
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(44, "div", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "div", 31)(46, "div", 23);
            i0.ɵɵelement(47, "i", 32);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 25)(49, "span", 26);
            i0.ɵɵtext(50, "Segments");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "strong", 27);
            i0.ɵɵtext(52);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "span", 28);
            i0.ɵɵelement(54, "i", 33);
            i0.ɵɵtext(55, " Targeted thresholds ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(56, "div", 30);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(57, "section", 34)(58, "div", 35)(59, "div", 36)(60, "div", 37)(61, "div", 38)(62, "h2");
            i0.ɵɵtext(63, "Contextual Threshold Rules");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "span", 39);
            i0.ɵɵtext(65, "Override the baseline threshold with specific conditions");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(66, "div", 40);
            i0.ɵɵtemplate(67, QualificationThresholdsPage_span_67_Template, 3, 0, "span", 41);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(68, QualificationThresholdsPage_div_68_Template, 2, 2, "div", 42)(69, QualificationThresholdsPage_form_69_Template, 25, 8, "form", 43);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(28);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.qualificationPolicy().thresholdRules.length);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" Default ", ctx.qualificationPolicy().defaultThreshold, " ");
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate(ctx.segmentOptions.length);
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("ngIf", !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading());
        } }, dependencies: [ButtonModule, i1.ButtonDirective, InputNumberModule, i2.InputNumber, SelectModule, i3.Select, FormsModule, i4.ɵNgNoValidate, i4.NgControlStatus, i4.NgControlStatusGroup, i4.NgModel, ReactiveFormsModule, i4.FormGroupDirective, RouterLink,
            SkeletonModule,
            NgIf,
            NgFor,
            BreadcrumbsComponent], styles: ["\n\n\n\n\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n\n\n\n\n.page-container[_ngcontent-%COMP%] {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: _ngcontent-%COMP%_float 20s ease-in-out infinite;\n}\n\n.orb-1[_ngcontent-%COMP%] {\n  width: 400px;\n  height: 400px;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%);\n  top: -100px;\n  right: -100px;\n  animation-delay: 0s;\n}\n\n.orb-2[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%);\n  bottom: 20%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3[_ngcontent-%COMP%] {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.06) 100%);\n  top: 50%;\n  right: 10%;\n  animation-delay: -14s;\n}\n\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(30px, -30px) scale(1.05);\n  }\n  66% {\n    transform: translate(-20px, 20px) scale(0.95);\n  }\n}\n\n\n\n\n\n.hero-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 2rem;\n  padding: 2rem;\n  @include form.form-section;\n  margin-bottom: 1.5rem;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.4rem 0.85rem;\n  background: rgba(139, 92, 246, 0.1);\n  border: 1px solid rgba(139, 92, 246, 0.2);\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #7c3aed;\n  width: fit-content;\n}\n\n.badge-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  background: #8b5cf6;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_pulse-dot 2s ease-in-out infinite;\n}\n\n@keyframes _ngcontent-%COMP%_pulse-dot {\n  0%, 100% { opacity: 1; transform: scale(1); }\n  50% { opacity: 0.6; transform: scale(0.9); }\n}\n\n\n.hero-description[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: rgba(60, 60, 67, 0.7);\n  max-width: 480px;\n  margin: 0;\n  line-height: 1.6;\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n  flex-wrap: wrap;\n}\n\n\n\n\n\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n\n  @media (max-width: 1100px) {\n    flex-direction: row;\n  }\n\n  @media (max-width: 600px) {\n    flex-direction: column;\n  }\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  padding: 1.25rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  flex: 1;\n  position: relative;\n  overflow: hidden;\n\n  \n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: -1px;\n    border-radius: 17px;\n    padding: 1px;\n    background: linear-gradient(135deg, transparent 0%, transparent 100%);\n    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n    -webkit-mask-composite: xor;\n    mask-composite: exclude;\n    pointer-events: none;\n    opacity: 0;\n    transition: all 0.3s ease;\n  }\n\n  &:hover {\n    transform: translateY(-3px) scale(1.01);\n    box-shadow: \n      0 8px 24px rgba(15, 23, 42, 0.08),\n      0 0 40px rgba(0, 122, 255, 0.06);\n  }\n\n  &:hover::before {\n    opacity: 1;\n    background: linear-gradient(135deg, \n      rgba(0, 122, 255, 0.3) 0%,\n      rgba(175, 82, 222, 0.2) 50%,\n      rgba(90, 200, 250, 0.3) 100%);\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n    border-color: rgba(139, 92, 246, 0.15);\n  }\n\n  &--secondary {\n    background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);\n    border-color: rgba(14, 165, 233, 0.15);\n  }\n}\n\n.card-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 1.1rem;\n    color: #7c3aed;\n  }\n\n  .visual-card--secondary & {\n    background: rgba(14, 165, 233, 0.12);\n    i { color: #0284c7; }\n  }\n\n  .visual-card:hover & {\n    transform: scale(1.08);\n    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);\n  }\n}\n\n.card-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n\n.card-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.card-value[_ngcontent-%COMP%] {\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.card-trend[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.6);\n\n  i { font-size: 0.625rem; }\n\n  &--up {\n    color: #059669;\n    i { color: #10b981; }\n  }\n\n  &--down {\n    color: #dc2626;\n    i { color: #ef4444; }\n  }\n}\n\n.card-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(\n    circle at 30% 30%,\n    rgba(139, 92, 246, 0.15) 0%,\n    transparent 60%\n  );\n  opacity: 0;\n  transition: opacity 0.4s ease;\n  pointer-events: none;\n\n  .visual-card:hover & {\n    opacity: 1;\n  }\n\n  .visual-card--secondary & {\n    background: radial-gradient(\n      circle at 30% 30%,\n      rgba(14, 165, 233, 0.15) 0%,\n      transparent 60%\n    );\n  }\n\n  .visual-card--success & {\n    background: radial-gradient(\n      circle at 30% 30%,\n      rgba(16, 185, 129, 0.15) 0%,\n      transparent 60%\n    );\n  }\n}\n\n\n\n\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_ring-draw {\n  from {\n    stroke-dasharray: 0, 100;\n  }\n}\n\n.metrics-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.75rem;\n  margin-bottom: 1.5rem;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 0.75rem;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 4 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08);\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 0.5rem;\n    font-size: 1.125rem;\n    color: white;\n    flex-shrink: 0;\n    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n  }\n\n  &--total .metric-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n  &--leads .metric-icon { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n  &--prospects .metric-icon { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n  &--customers .metric-icon { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n  &--new .metric-icon { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: 0.7rem;\n    color: #6b7280;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: 1.375rem;\n    font-weight: 700;\n    color: #1f2937;\n  }\n}\n\n//[_ngcontent-%COMP%]   Ring[_ngcontent-%COMP%]   Chart\n.metric-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: #e5e7eb;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n    animation: _ngcontent-%COMP%_ring-draw 1s ease-out;\n\n    &--cyan { stroke: #06b6d4; }\n    &--purple { stroke: #a855f7; }\n    &--green { stroke: #22c55e; }\n    &--orange { stroke: #f97316; }\n  }\n}\n\n\n\n\n\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 12px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  text-decoration: none;\n  white-space: nowrap;\n  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n\n  i { font-size: 0.85rem; }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  @include form.button-primary;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: rgba(15, 23, 42, 0.8);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.5);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n  }\n}\n\n.btn-ghost[_ngcontent-%COMP%] {\n  @include form.button-ghost;\n}\n\n\n\n\n\n.data-section[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fade-in-up 0.4s ease-out 0.1s both;\n  position: relative;\n  z-index: 1;\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.settings-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 360px;\n  gap: 1.5rem;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n\n\n\n\n.data-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n  overflow: hidden;\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.15rem 1.35rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n\n.header-title[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n\n  h2 {\n    font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n    font-size: 1.05rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.record-count[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.65rem;\n}\n\n\n\n\n\n.loading-state[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n}\n\n.skeleton[_ngcontent-%COMP%] {\n  background: linear-gradient(\n    90deg,\n    rgba(148, 163, 184, 0.1) 25%,\n    rgba(148, 163, 184, 0.2) 50%,\n    rgba(148, 163, 184, 0.1) 75%\n  );\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}\n\n.skeleton-text[_ngcontent-%COMP%] {\n  height: 14px;\n  width: 120px;\n}\n\n.skeleton-input[_ngcontent-%COMP%] {\n  height: 42px;\n  width: 100%;\n}\n\n\n\n\n\n.settings-form[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n\n\n.form-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n  padding: 1.5rem;\n  margin: 0;\n\n  &:hover .section-title {\n    @include form.section-title-hover;\n  }\n}\n\n.section-title[_ngcontent-%COMP%] {\n  @include form.section-title;\n  margin-bottom: 0.5rem;\n\n  \n\n  &--info {\n    i {\n      background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%);\n      color: #0284c7;\n      box-shadow: 0 2px 8px rgba(14, 165, 233, 0.15);\n    }\n    color: #0369a1;\n  }\n\n  \n\n  &--warning {\n    i {\n      background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%);\n      color: #d97706;\n      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);\n    }\n    color: #b45309;\n  }\n\n  \n\n  &--success {\n    i {\n      background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(34, 197, 94, 0.1) 100%);\n      color: #059669;\n      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);\n    }\n    color: #047857;\n  }\n}\n\n.section-description[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: rgba(60, 60, 67, 0.6);\n  margin: 0 0 1.25rem 0;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  @include form.form-grid;\n  grid-template-columns: 1fr;\n\n  &--2col {\n    grid-template-columns: repeat(2, 1fr);\n\n    @media (max-width: 768px) {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n.form-card-inner[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  border-radius: 16px;\n  border: 1px dashed rgba(148, 163, 184, 0.35);\n  background: rgba(15, 23, 42, 0.35);\n}\n\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n\n.approval-step[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  background: rgba(15, 23, 42, 0.3);\n  margin-bottom: 1rem;\n}\n\n.approval-step[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.step-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.75rem;\n  font-weight: 600;\n}\n\n.field[_ngcontent-%COMP%] {\n  @include form.form-field;\n\n  label {\n    @include form.form-label;\n\n    .required {\n      @include form.form-required;\n    }\n  }\n\n  input[pInputText],\n  .p-inputtext {\n    @include form.premium-input;\n\n    &:hover {\n      @include form.premium-input-hover;\n    }\n\n    &:focus {\n      @include form.premium-input-focus;\n    }\n  }\n}\n\n.field-hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.5);\n  margin-top: 0.35rem;\n}\n\n\n\n[_nghost-%COMP%]     .timezone-option {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n\n[_nghost-%COMP%]     .timezone-flag {\n  width: 18px;\n  height: 12px;\n  border-radius: 2px;\n  object-fit: cover;\n  background: #e2e8f0;\n  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1);\n}\n\n//   PrimeNG   overrides   with   premium   focus   effects\n[_nghost-%COMP%]     {\n  .p-select,\n  .p-inputnumber {\n    width: 100%;\n\n    .p-select-label,\n    .p-inputnumber-input {\n      @include form.premium-input;\n    }\n\n    &:hover {\n      .p-select-label,\n      .p-inputnumber-input {\n        @include form.premium-input-hover;\n      }\n    }\n\n    &.p-focus,\n    &:focus-within {\n      .p-select-label,\n      .p-inputnumber-input {\n        @include form.premium-input-focus;\n      }\n    }\n  }\n}\n\n.form-actions[_ngcontent-%COMP%] {\n  @include form.form-actions;\n  border-top: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n\n\n\n\n.preview-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n}\n\n.preview-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.preview-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n\n  i {\n    font-size: 0.9rem;\n    color: rgba(60, 60, 67, 0.6);\n  }\n\n  h3 {\n    font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n    font-size: 0.95rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.preview-workspace[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  padding: 1rem;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n  border: 1px solid rgba(139, 92, 246, 0.12);\n  border-radius: 14px;\n  transition: all 0.3s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.12);\n  }\n}\n\n.preview-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(14, 165, 233, 0.12) 100%);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 1.2rem;\n    color: #7c3aed;\n  }\n\n  .preview-workspace:hover & {\n    transform: scale(1.05);\n  }\n}\n\n.preview-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n\n.preview-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.preview-value[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.preview-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 0.6rem;\n  grid-template-columns: 1fr 1fr;\n}\n\n.preview-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.75rem;\n  background: rgba(248, 250, 252, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  border-radius: 12px;\n  transition: all 0.25s ease;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.95);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);\n  }\n}\n\n.preview-item-icon[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.1);\n  border-radius: 8px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 0.8rem;\n    color: #7c3aed;\n  }\n\n  &--success {\n    background: rgba(16, 185, 129, 0.1);\n    i { color: #059669; }\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.1);\n    i { color: #d97706; }\n  }\n\n  &--info {\n    background: rgba(14, 165, 233, 0.1);\n    i { color: #0284c7; }\n  }\n\n  .preview-item:hover & {\n    transform: scale(1.08);\n  }\n}\n\n.preview-item-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.preview-item-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.preview-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.6rem;\n  padding: 0.75rem;\n  background: rgba(139, 92, 246, 0.06);\n  border: 1px solid rgba(139, 92, 246, 0.1);\n  border-radius: 10px;\n  font-size: 0.78rem;\n  color: #7c3aed;\n\n  i {\n    font-size: 0.85rem;\n    margin-top: 0.05rem;\n  }\n}\n\n\n\n\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  white-space: nowrap;\n\n  i { font-size: 0.6rem; }\n\n  &--success {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #b45309;\n  }\n}\n\n.toggle-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n\n.policy-block[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(248, 250, 252, 0.7);\n}\n\n.policy-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n\n.policy-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #1e293b;\n}\n\n.policy-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.policy-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 120px auto;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n.policy-row--modifier[_ngcontent-%COMP%] {\n  grid-template-columns: 1fr 120px auto;\n}\n\n.policy-row[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  height: 40px;\n  align-self: center;\n}\n\n.checkbox-field[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n\n\n\n\n@media (max-width: 768px) {\n  .page-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .hero-section[_ngcontent-%COMP%] {\n    padding: 1.35rem;\n    gap: 1.25rem;\n  }\n\n  .hero-stats[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .preview-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-card[_ngcontent-%COMP%] {\n    position: static;\n  }\n\n  .form-section[_ngcontent-%COMP%] {\n    padding: 1.25rem;\n    border-radius: 16px;\n  }\n\n  .policy-row[_ngcontent-%COMP%], \n   .policy-row--modifier[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(QualificationThresholdsPage, [{
        type: Component,
        args: [{ selector: 'app-qualification-thresholds-page', standalone: true, imports: [
                    ButtonModule,
                    InputNumberModule,
                    SelectModule,
                    FormsModule,
                    ReactiveFormsModule,
                    RouterLink,
                    SkeletonModule,
                    NgIf,
                    NgFor,
                    BreadcrumbsComponent
                ], template: "<div class=\"page-container\">\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Qualification</span>\n      </div>\n\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Contextual</span>\n        <span class=\"title-light\">Threshold Rules</span>\n      </h1>\n\n      <p class=\"hero-description\">\n        Override the default qualification threshold by segment, deal type, and stage so your rules match real selling motions.\n      </p>\n\n      <div class=\"hero-actions\">\n        <button pButton type=\"button\" class=\"btn btn-secondary\" routerLink=\"/app/settings/qualification-policy\">\n          <i class=\"pi pi-arrow-left\"></i>\n          <span>Back to Policy</span>\n        </button>\n        <button pButton type=\"button\" class=\"btn btn-secondary\" routerLink=\"/app/settings\">\n          <i class=\"pi pi-cog\"></i>\n          <span>Settings Home</span>\n        </button>\n        <button pButton type=\"button\" class=\"btn btn-ghost\" [disabled]=\"loading()\" (click)=\"loadSettings()\">\n          <i class=\"pi pi-refresh\"></i>\n          <span>Reload</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-sliders-h\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Rules</span>\n          <strong class=\"card-value\">{{ qualificationPolicy().thresholdRules.length }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-filter\"></i>\n            Default {{ qualificationPolicy().defaultThreshold }}\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n\n      <div class=\"visual-card visual-card--secondary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-flag\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Segments</span>\n          <strong class=\"card-value\">{{ segmentOptions.length }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-list\"></i>\n            Targeted thresholds\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"data-section\">\n    <div class=\"settings-layout\">\n      <div class=\"data-card\">\n        <div class=\"data-header\">\n          <div class=\"header-title\">\n            <h2>Contextual Threshold Rules</h2>\n            <span class=\"record-count\">Override the baseline threshold with specific conditions</span>\n          </div>\n          <div class=\"header-actions\">\n            <span class=\"status-badge status-badge--success\" *ngIf=\"!loading()\">\n              <i class=\"pi pi-check\"></i> Ready\n            </span>\n          </div>\n        </div>\n\n        <div class=\"loading-state\" *ngIf=\"loading()\">\n          <div class=\"skeleton-row\" *ngFor=\"let _ of [0, 1, 2]\">\n            <div class=\"skeleton skeleton-text\"></div>\n            <div class=\"skeleton skeleton-input\"></div>\n          </div>\n        </div>\n\n        <form class=\"settings-form\" *ngIf=\"!loading()\" [formGroup]=\"settingsForm\" (ngSubmit)=\"saveSettings()\">\n          <section class=\"form-card\">\n            <h3 class=\"section-title section-title--info\">\n              <i class=\"pi pi-sliders-h\"></i>\n              Rules\n            </h3>\n            <p class=\"section-description\">Each rule overrides the default threshold for matching deals</p>\n\n            <div class=\"policy-block\">\n              <div class=\"policy-header\">\n                <h4>Contextual Rules</h4>\n                <button type=\"button\" class=\"btn btn-secondary\" (click)=\"addThresholdRule()\">\n                  <i class=\"pi pi-plus\"></i>\n                  Add rule\n                </button>\n              </div>\n              <div class=\"policy-list\" *ngIf=\"qualificationPolicy().thresholdRules.length; else noRules\">\n                <div class=\"policy-row\" *ngFor=\"let rule of qualificationPolicy().thresholdRules; let i = index\">\n                  <p-select\n                    appendTo=\"body\"\n                    [options]=\"segmentOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    [ngModel]=\"rule.segment\"\n                    (ngModelChange)=\"updateThresholdRule(i, { segment: $event })\"\n                    [ngModelOptions]=\"{ standalone: true }\"\n                    placeholder=\"Segment\"\n                    styleClass=\"w-full\"\n                  ></p-select>\n                  <p-select\n                    appendTo=\"body\"\n                    [options]=\"dealTypeOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    [ngModel]=\"rule.dealType\"\n                    (ngModelChange)=\"updateThresholdRule(i, { dealType: $event })\"\n                    [ngModelOptions]=\"{ standalone: true }\"\n                    placeholder=\"Deal type\"\n                    styleClass=\"w-full\"\n                  ></p-select>\n                  <p-select\n                    appendTo=\"body\"\n                    [options]=\"stageOptions\"\n                    optionLabel=\"label\"\n                    optionValue=\"value\"\n                    [ngModel]=\"rule.stage\"\n                    (ngModelChange)=\"updateThresholdRule(i, { stage: $event })\"\n                    [ngModelOptions]=\"{ standalone: true }\"\n                    placeholder=\"Stage\"\n                    styleClass=\"w-full\"\n                  ></p-select>\n                  <p-inputNumber\n                    [ngModel]=\"rule.threshold\"\n                    (ngModelChange)=\"updateThresholdRule(i, { threshold: $event })\"\n                    [min]=\"0\"\n                    [max]=\"100\"\n                    [ngModelOptions]=\"{ standalone: true }\"\n                    styleClass=\"w-full\"\n                  ></p-inputNumber>\n                  <button type=\"button\" class=\"btn btn-ghost\" (click)=\"removeThresholdRule(i)\">\n                    <i class=\"pi pi-times\"></i>\n                  </button>\n                </div>\n              </div>\n              <ng-template #noRules>\n                <p class=\"hint\">No contextual rules yet. Add rules to override the default threshold.</p>\n              </ng-template>\n            </div>\n          </section>\n\n          <div class=\"form-actions\">\n            <button type=\"button\" class=\"btn btn-ghost\" (click)=\"loadSettings()\" [disabled]=\"loading()\">\n              <i class=\"pi pi-refresh\"></i>\n              Reset\n            </button>\n            <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"saving() || !canManageAdmin()\">\n              <i class=\"pi pi-save\" *ngIf=\"!saving()\"></i>\n              <i class=\"pi pi-spinner pi-spin\" *ngIf=\"saving()\"></i>\n              {{ saving() ? 'Saving...' : 'Save Threshold Rules' }}\n            </button>\n          </div>\n        </form>\n      </div>\n    </div>\n  </section>\n</div>\n", styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   WORKSPACE SETTINGS PAGE - Premium Glass UI with Card Focus Effects\n   Using form-page-styles mixins for consistent design system\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HOST SETUP\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n:host {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   PAGE CONTAINER - Premium Glass Base with Animated Orbs\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.page-container {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n/* Animated Background Orbs */\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: float 20s ease-in-out infinite;\n}\n\n.orb-1 {\n  width: 400px;\n  height: 400px;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%);\n  top: -100px;\n  right: -100px;\n  animation-delay: 0s;\n}\n\n.orb-2 {\n  width: 300px;\n  height: 300px;\n  background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%);\n  bottom: 20%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3 {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.06) 100%);\n  top: 50%;\n  right: 10%;\n  animation-delay: -14s;\n}\n\n@keyframes float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(30px, -30px) scale(1.05);\n  }\n  66% {\n    transform: translate(-20px, 20px) scale(0.95);\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HERO SECTION\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.hero-section {\n  display: grid;\n  grid-template-columns: 1fr 380px;\n  gap: 2rem;\n  padding: 2rem;\n  @include form.form-section;\n  margin-bottom: 1.5rem;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.4rem 0.85rem;\n  background: rgba(139, 92, 246, 0.1);\n  border: 1px solid rgba(139, 92, 246, 0.2);\n  border-radius: 999px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  color: #7c3aed;\n  width: fit-content;\n}\n\n.badge-dot {\n  width: 6px;\n  height: 6px;\n  background: #8b5cf6;\n  border-radius: 50%;\n  animation: pulse-dot 2s ease-in-out infinite;\n}\n\n@keyframes pulse-dot {\n  0%, 100% { opacity: 1; transform: scale(1); }\n  50% { opacity: 0.6; transform: scale(0.9); }\n}\n\n\n.hero-description {\n  font-size: 1rem;\n  color: rgba(60, 60, 67, 0.7);\n  max-width: 480px;\n  margin: 0;\n  line-height: 1.6;\n}\n\n.hero-actions {\n  display: flex;\n  gap: 0.75rem;\n  margin-top: 0.5rem;\n  flex-wrap: wrap;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HERO VISUAL CARDS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n\n  @media (max-width: 1100px) {\n    flex-direction: row;\n  }\n\n  @media (max-width: 600px) {\n    flex-direction: column;\n  }\n}\n\n.visual-card {\n  display: flex;\n  gap: 1rem;\n  padding: 1.25rem;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 16px;\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  flex: 1;\n  position: relative;\n  overflow: hidden;\n\n  /* Gradient border glow on hover */\n  &::before {\n    content: '';\n    position: absolute;\n    inset: -1px;\n    border-radius: 17px;\n    padding: 1px;\n    background: linear-gradient(135deg, transparent 0%, transparent 100%);\n    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n    -webkit-mask-composite: xor;\n    mask-composite: exclude;\n    pointer-events: none;\n    opacity: 0;\n    transition: all 0.3s ease;\n  }\n\n  &:hover {\n    transform: translateY(-3px) scale(1.01);\n    box-shadow: \n      0 8px 24px rgba(15, 23, 42, 0.08),\n      0 0 40px rgba(0, 122, 255, 0.06);\n  }\n\n  &:hover::before {\n    opacity: 1;\n    background: linear-gradient(135deg, \n      rgba(0, 122, 255, 0.3) 0%,\n      rgba(175, 82, 222, 0.2) 50%,\n      rgba(90, 200, 250, 0.3) 100%);\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n    border-color: rgba(139, 92, 246, 0.15);\n  }\n\n  &--secondary {\n    background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);\n    border-color: rgba(14, 165, 233, 0.15);\n  }\n}\n\n.card-icon {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 1.1rem;\n    color: #7c3aed;\n  }\n\n  .visual-card--secondary & {\n    background: rgba(14, 165, 233, 0.12);\n    i { color: #0284c7; }\n  }\n\n  .visual-card:hover & {\n    transform: scale(1.08);\n    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);\n  }\n}\n\n.card-content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n\n.card-label {\n  font-size: 0.72rem;\n  color: rgba(60, 60, 67, 0.6);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.card-value {\n  font-size: 1.35rem;\n  font-weight: 700;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.card-trend {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.6);\n\n  i { font-size: 0.625rem; }\n\n  &--up {\n    color: #059669;\n    i { color: #10b981; }\n  }\n\n  &--down {\n    color: #dc2626;\n    i { color: #ef4444; }\n  }\n}\n\n.card-glow {\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(\n    circle at 30% 30%,\n    rgba(139, 92, 246, 0.15) 0%,\n    transparent 60%\n  );\n  opacity: 0;\n  transition: opacity 0.4s ease;\n  pointer-events: none;\n\n  .visual-card:hover & {\n    opacity: 1;\n  }\n\n  .visual-card--secondary & {\n    background: radial-gradient(\n      circle at 30% 30%,\n      rgba(14, 165, 233, 0.15) 0%,\n      transparent 60%\n    );\n  }\n\n  .visual-card--success & {\n    background: radial-gradient(\n      circle at 30% 30%,\n      rgba(16, 185, 129, 0.15) 0%,\n      transparent 60%\n    );\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   METRICS SECTION - KPI Dashboard Cards\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes ring-draw {\n  from {\n    stroke-dasharray: 0, 100;\n  }\n}\n\n.metrics-section {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 0.75rem;\n  margin-bottom: 1.5rem;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.metric-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n  background: rgba(255, 255, 255, 0.85);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 0.75rem;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);\n  overflow: hidden;\n  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 4 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08);\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n\n  .metric-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: 0.5rem;\n    font-size: 1.125rem;\n    color: white;\n    flex-shrink: 0;\n    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n  }\n\n  &--total .metric-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }\n  &--leads .metric-icon { background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%); }\n  &--prospects .metric-icon { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }\n  &--customers .metric-icon { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); }\n  &--new .metric-icon { background: linear-gradient(135deg, #fb923c 0%, #f97316 100%); }\n\n  .metric-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n    min-width: 0;\n  }\n\n  .metric-label {\n    font-size: 0.7rem;\n    color: #6b7280;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .metric-value {\n    font-size: 1.375rem;\n    font-weight: 700;\n    color: #1f2937;\n  }\n}\n\n// Ring Chart\n.metric-ring {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: #e5e7eb;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n    animation: ring-draw 1s ease-out;\n\n    &--cyan { stroke: #06b6d4; }\n    &--purple { stroke: #a855f7; }\n    &--green { stroke: #22c55e; }\n    &--orange { stroke: #f97316; }\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   BUTTONS - Using form-page-styles patterns\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 12px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  text-decoration: none;\n  white-space: nowrap;\n  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n\n  i { font-size: 0.85rem; }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.btn-primary {\n  @include form.button-primary;\n}\n\n.btn-secondary {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  color: rgba(15, 23, 42, 0.8);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);\n\n  &:hover:not(:disabled) {\n    background: #fff;\n    border-color: rgba(148, 163, 184, 0.5);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n  }\n}\n\n.btn-ghost {\n  @include form.button-ghost;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   DATA SECTION & LAYOUT\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.data-section {\n  animation: fade-in-up 0.4s ease-out 0.1s both;\n  position: relative;\n  z-index: 1;\n}\n\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.settings-layout {\n  display: grid;\n  grid-template-columns: 1fr 360px;\n  gap: 1.5rem;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   DATA CARD - Premium Glass with Focus Pop Effect\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.data-card {\n  @include form.form-section;\n  overflow: hidden;\n}\n\n.data-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.15rem 1.35rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  flex-wrap: wrap;\n  gap: 1rem;\n}\n\n.header-title {\n  display: flex;\n  flex-direction: column;\n  gap: 0.2rem;\n\n  h2 {\n    font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n    font-size: 1.05rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.record-count {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.header-actions {\n  display: flex;\n  gap: 0.65rem;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   LOADING STATE\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.loading-state {\n  padding: 1.5rem;\n}\n\n.skeleton-row {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  padding: 1rem 0;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.1);\n}\n\n.skeleton {\n  background: linear-gradient(\n    90deg,\n    rgba(148, 163, 184, 0.1) 25%,\n    rgba(148, 163, 184, 0.2) 50%,\n    rgba(148, 163, 184, 0.1) 75%\n  );\n  background-size: 200% 100%;\n  animation: shimmer 1.5s ease-in-out infinite;\n  border-radius: 6px;\n}\n\n@keyframes shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}\n\n.skeleton-text {\n  height: 14px;\n  width: 120px;\n}\n\n.skeleton-input {\n  height: 42px;\n  width: 100%;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   FORM STYLES - Premium Glass Cards with Focus Effects\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.settings-form {\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n/* Form Card - Using design system form-section mixin */\n.form-card {\n  @include form.form-section;\n  padding: 1.5rem;\n  margin: 0;\n\n  &:hover .section-title {\n    @include form.section-title-hover;\n  }\n}\n\n.section-title {\n  @include form.section-title;\n  margin-bottom: 0.5rem;\n\n  /* Variant: Info (blue) */\n  &--info {\n    i {\n      background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%);\n      color: #0284c7;\n      box-shadow: 0 2px 8px rgba(14, 165, 233, 0.15);\n    }\n    color: #0369a1;\n  }\n\n  /* Variant: Warning (amber) */\n  &--warning {\n    i {\n      background: linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%);\n      color: #d97706;\n      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.15);\n    }\n    color: #b45309;\n  }\n\n  /* Variant: Success (green) */\n  &--success {\n    i {\n      background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(34, 197, 94, 0.1) 100%);\n      color: #059669;\n      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);\n    }\n    color: #047857;\n  }\n}\n\n.section-description {\n  font-size: 0.82rem;\n  color: rgba(60, 60, 67, 0.6);\n  margin: 0 0 1.25rem 0;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n.form-grid {\n  @include form.form-grid;\n  grid-template-columns: 1fr;\n\n  &--2col {\n    grid-template-columns: repeat(2, 1fr);\n\n    @media (max-width: 768px) {\n      grid-template-columns: 1fr;\n    }\n  }\n}\n\n.form-card-inner {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  border-radius: 16px;\n  border: 1px dashed rgba(148, 163, 184, 0.35);\n  background: rgba(15, 23, 42, 0.35);\n}\n\n.section-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 1rem;\n}\n\n.approval-step {\n  padding: 1rem;\n  border-radius: 12px;\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  background: rgba(15, 23, 42, 0.3);\n  margin-bottom: 1rem;\n}\n\n.approval-step:last-child {\n  margin-bottom: 0;\n}\n\n.step-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 0.75rem;\n  font-weight: 600;\n}\n\n.field {\n  @include form.form-field;\n\n  label {\n    @include form.form-label;\n\n    .required {\n      @include form.form-required;\n    }\n  }\n\n  input[pInputText],\n  .p-inputtext {\n    @include form.premium-input;\n\n    &:hover {\n      @include form.premium-input-hover;\n    }\n\n    &:focus {\n      @include form.premium-input-focus;\n    }\n  }\n}\n\n.field-hint {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.5);\n  margin-top: 0.35rem;\n}\n\n/* Keep time zone option rows aligned with flag icons. */\n:host ::ng-deep .timezone-option {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n\n:host ::ng-deep .timezone-flag {\n  width: 18px;\n  height: 12px;\n  border-radius: 2px;\n  object-fit: cover;\n  background: #e2e8f0;\n  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1);\n}\n\n// PrimeNG overrides with premium focus effects\n:host ::ng-deep {\n  .p-select,\n  .p-inputnumber {\n    width: 100%;\n\n    .p-select-label,\n    .p-inputnumber-input {\n      @include form.premium-input;\n    }\n\n    &:hover {\n      .p-select-label,\n      .p-inputnumber-input {\n        @include form.premium-input-hover;\n      }\n    }\n\n    &.p-focus,\n    &:focus-within {\n      .p-select-label,\n      .p-inputnumber-input {\n        @include form.premium-input-focus;\n      }\n    }\n  }\n}\n\n.form-actions {\n  @include form.form-actions;\n  border-top: 1px solid rgba(148, 163, 184, 0.12);\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   PREVIEW CARD - Premium Glass with Focus Pop\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.preview-card {\n  @include form.form-section;\n  padding: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  height: fit-content;\n  position: sticky;\n  top: 1.5rem;\n}\n\n.preview-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.preview-title {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n\n  i {\n    font-size: 0.9rem;\n    color: rgba(60, 60, 67, 0.6);\n  }\n\n  h3 {\n    font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;\n    font-size: 0.95rem;\n    font-weight: 600;\n    color: rgba(15, 23, 42, 0.9);\n    margin: 0;\n  }\n}\n\n.preview-workspace {\n  display: flex;\n  align-items: center;\n  gap: 0.85rem;\n  padding: 1rem;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n  border: 1px solid rgba(139, 92, 246, 0.12);\n  border-radius: 14px;\n  transition: all 0.3s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.12);\n  }\n}\n\n.preview-icon {\n  width: 48px;\n  height: 48px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(14, 165, 233, 0.12) 100%);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 1.2rem;\n    color: #7c3aed;\n  }\n\n  .preview-workspace:hover & {\n    transform: scale(1.05);\n  }\n}\n\n.preview-info {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  min-width: 0;\n}\n\n.preview-label {\n  font-size: 0.7rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.preview-value {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.preview-grid {\n  display: grid;\n  gap: 0.6rem;\n  grid-template-columns: 1fr 1fr;\n}\n\n.preview-item {\n  display: flex;\n  align-items: center;\n  gap: 0.65rem;\n  padding: 0.75rem;\n  background: rgba(248, 250, 252, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.12);\n  border-radius: 12px;\n  transition: all 0.25s ease;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.95);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);\n  }\n}\n\n.preview-item-icon {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(139, 92, 246, 0.1);\n  border-radius: 8px;\n  flex-shrink: 0;\n  transition: all 0.3s ease;\n\n  i {\n    font-size: 0.8rem;\n    color: #7c3aed;\n  }\n\n  &--success {\n    background: rgba(16, 185, 129, 0.1);\n    i { color: #059669; }\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.1);\n    i { color: #d97706; }\n  }\n\n  &--info {\n    background: rgba(14, 165, 233, 0.1);\n    i { color: #0284c7; }\n  }\n\n  .preview-item:hover & {\n    transform: scale(1.08);\n  }\n}\n\n.preview-item-label {\n  display: block;\n  font-size: 0.65rem;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.preview-item-value {\n  display: block;\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.preview-note {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.6rem;\n  padding: 0.75rem;\n  background: rgba(139, 92, 246, 0.06);\n  border: 1px solid rgba(139, 92, 246, 0.1);\n  border-radius: 10px;\n  font-size: 0.78rem;\n  color: #7c3aed;\n\n  i {\n    font-size: 0.85rem;\n    margin-top: 0.05rem;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   STATUS BADGES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.3rem;\n  padding: 0.3rem 0.65rem;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 6px;\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: rgba(60, 60, 67, 0.8);\n  white-space: nowrap;\n\n  i { font-size: 0.6rem; }\n\n  &--success {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n\n  &--warning {\n    background: rgba(245, 158, 11, 0.12);\n    color: #b45309;\n  }\n}\n\n.toggle-row {\n  display: flex;\n  flex-direction: column;\n  gap: 0.6rem;\n}\n\n.policy-block {\n  margin-top: 1.5rem;\n  padding: 1rem;\n  border-radius: 16px;\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  background: rgba(248, 250, 252, 0.7);\n}\n\n.policy-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n\n.policy-header h4 {\n  margin: 0;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #1e293b;\n}\n\n.policy-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n}\n\n.policy-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 120px auto;\n  gap: 0.75rem;\n  align-items: center;\n}\n\n.policy-row--modifier {\n  grid-template-columns: 1fr 120px auto;\n}\n\n.policy-row .btn {\n  height: 40px;\n  align-self: center;\n}\n\n.checkbox-field {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 600;\n  color: #1e293b;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   RESPONSIVE\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@media (max-width: 768px) {\n  .page-container {\n    padding: 1rem;\n  }\n\n  .hero-section {\n    padding: 1.35rem;\n    gap: 1.25rem;\n  }\n\n  .hero-stats {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .preview-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .preview-card {\n    position: static;\n  }\n\n  .form-section {\n    padding: 1.25rem;\n    border-radius: 16px;\n  }\n\n  .policy-row,\n  .policy-row--modifier {\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(QualificationThresholdsPage, { className: "QualificationThresholdsPage", filePath: "src/app/crm/features/settings/pages/qualification-thresholds.page.ts", lineNumber: 45 }); })();
