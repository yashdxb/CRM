import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { LeadAssignmentService } from '../services/lead-assignment.service';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/api";
import * as i5 from "primeng/checkbox";
import * as i6 from "primeng/inputtext";
import * as i7 from "primeng/select";
import * as i8 from "primeng/tooltip";
const _c0 = () => [1, 2, 3, 4];
function LeadAssignmentPage_div_136_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 91);
    i0.ɵɵelement(1, "div", 92);
    i0.ɵɵelementStart(2, "div", 93);
    i0.ɵɵelement(3, "div", 94)(4, "div", 95);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(5, "div", 96);
    i0.ɵɵelementEnd();
} }
function LeadAssignmentPage_div_136_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 89);
    i0.ɵɵtemplate(1, LeadAssignmentPage_div_136_div_1_Template, 6, 0, "div", 90);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c0));
} }
function LeadAssignmentPage_div_137_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 97)(1, "div", 98);
    i0.ɵɵelement(2, "i", 63);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h4");
    i0.ɵɵtext(4, "No Rules Configured");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Create your first lead assignment rule to automate lead routing across your sales team.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 23);
    i0.ɵɵlistener("click", function LeadAssignmentPage_div_137_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.resetForm()); });
    i0.ɵɵelement(8, "i", 24);
    i0.ɵɵtext(9, " Create First Rule ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("disabled", !ctx_r1.canManageLeads());
} }
function LeadAssignmentPage_div_138_div_1_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 119);
    i0.ɵɵtext(1, "\u2022");
    i0.ɵɵelementEnd();
} }
function LeadAssignmentPage_div_138_div_1_span_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 120);
    i0.ɵɵelement(1, "i", 55);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const rule_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", rule_r4.territory, " ");
} }
function LeadAssignmentPage_div_138_div_1_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 119);
    i0.ɵɵtext(1, "\u2022");
    i0.ɵɵelementEnd();
} }
function LeadAssignmentPage_div_138_div_1_span_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 121);
    i0.ɵɵelement(1, "i", 122);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const rule_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", rule_r4.assignedUserName, " ");
} }
function LeadAssignmentPage_div_138_div_1_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 123);
    i0.ɵɵelement(1, "i", 124);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const rule_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" Last: ", rule_r4.lastAssignedUserName, " ");
} }
function LeadAssignmentPage_div_138_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 101);
    i0.ɵɵlistener("click", function LeadAssignmentPage_div_138_div_1_Template_div_click_0_listener() { const rule_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.startEdit(rule_r4)); });
    i0.ɵɵelementStart(1, "div", 102);
    i0.ɵɵelement(2, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 103)(4, "div", 104)(5, "span", 105);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 106);
    i0.ɵɵelement(8, "span", 107);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 108)(11, "span", 109);
    i0.ɵɵelement(12, "i");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, LeadAssignmentPage_div_138_div_1_span_14_Template, 2, 0, "span", 110)(15, LeadAssignmentPage_div_138_div_1_span_15_Template, 3, 1, "span", 111)(16, LeadAssignmentPage_div_138_div_1_span_16_Template, 2, 0, "span", 110)(17, LeadAssignmentPage_div_138_div_1_span_17_Template, 3, 1, "span", 112);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(18, LeadAssignmentPage_div_138_div_1_div_18_Template, 3, 1, "div", 113);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "div", 114)(20, "button", 115);
    i0.ɵɵlistener("click", function LeadAssignmentPage_div_138_div_1_Template_button_click_20_listener($event) { const rule_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.startEdit(rule_r4)); });
    i0.ɵɵelement(21, "i", 116);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "button", 117);
    i0.ɵɵlistener("click", function LeadAssignmentPage_div_138_div_1_Template_button_click_22_listener($event) { const rule_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); $event.stopPropagation(); return i0.ɵɵresetView(ctx_r1.deleteRule(rule_r4)); });
    i0.ɵɵelement(23, "i", 118);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const rule_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r1.editingId() === rule_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.getRuleTypeClass(rule_r4.type));
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.getTypeIcon(rule_r4.type));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(rule_r4.name);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("active", rule_r4.isActive)("paused", !rule_r4.isActive);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", rule_r4.isActive ? "Active" : "Paused", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵclassMap(ctx_r1.getRuleTypeClass(rule_r4.type));
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.getTypeIcon(rule_r4.type));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", rule_r4.type, " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", rule_r4.territory);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", rule_r4.territory);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", rule_r4.assignedUserName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", rule_r4.assignedUserName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", rule_r4.lastAssignedUserName);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canManageLeads());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canManageLeads());
} }
function LeadAssignmentPage_div_138_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 99);
    i0.ɵɵtemplate(1, LeadAssignmentPage_div_138_div_1_Template, 24, 24, "div", 100);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.rules());
} }
function LeadAssignmentPage_ng_template_160_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 126);
    i0.ɵɵelement(1, "i");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.getTypeIcon(option_r5.value));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r5.label, " ");
} }
function LeadAssignmentPage_ng_template_160_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, LeadAssignmentPage_ng_template_160_div_0_Template, 3, 3, "div", 125);
} if (rf & 2) {
    const option_r5 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", option_r5);
} }
function LeadAssignmentPage_ng_template_161_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 126);
    i0.ɵɵelement(1, "i");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵattribute("data-testid", "lead-rule-type-" + option_r6.value);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r1.getTypeIcon(option_r6.value));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r6.label, " ");
} }
function LeadAssignmentPage_Case_163_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Leads rotate evenly across all team members ");
} }
function LeadAssignmentPage_Case_164_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Leads go to the assigned owner for a region ");
} }
function LeadAssignmentPage_Case_165_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0, " Leads require manual assignment ");
} }
function LeadAssignmentPage_Conditional_166_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 126)(1, "div", 129);
    i0.ɵɵelement(2, "img", 130);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r8 = ctx.$implicit;
    i0.ɵɵattribute("data-testid", "lead-rule-owner-" + option_r8.value);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("src", option_r8.profilePictureUrl || "https://i.pravatar.cc/150?u=" + (option_r8.email || option_r8.value || option_r8.label), i0.ɵɵsanitizeUrl)("alt", option_r8.label + " avatar")("title", option_r8.label + " avatar");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r8.label, " ");
} }
function LeadAssignmentPage_Conditional_166_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 69)(1, "label", 70);
    i0.ɵɵelement(2, "i", 55);
    i0.ɵɵtext(3, " Territory ");
    i0.ɵɵelementStart(4, "span", 72);
    i0.ɵɵtext(5, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "input", 127);
    i0.ɵɵlistener("ngModelChange", function LeadAssignmentPage_Conditional_166_Template_input_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateForm("territory", $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 74);
    i0.ɵɵtext(8, "Geographic region or market segment");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 69)(10, "label", 70);
    i0.ɵɵelement(11, "i", 122);
    i0.ɵɵtext(12, " Assigned Owner ");
    i0.ɵɵelementStart(13, "span", 72);
    i0.ɵɵtext(14, "*");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "p-select", 128);
    i0.ɵɵlistener("ngModelChange", function LeadAssignmentPage_Conditional_166_Template_p_select_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateForm("assignedUserId", $event)); });
    i0.ɵɵtemplate(16, LeadAssignmentPage_Conditional_166_ng_template_16_Template, 4, 5, "ng-template", 78);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 74);
    i0.ɵɵtext(18, "All leads matching this territory go to this person");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngModel", ctx_r1.form().territory);
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("options", ctx_r1.ownerOptions())("ngModel", ctx_r1.form().assignedUserId);
} }
export class LeadAssignmentPage {
    rules = signal([], ...(ngDevMode ? [{ debugName: "rules" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    editingId = signal(null, ...(ngDevMode ? [{ debugName: "editingId" }] : []));
    canManageLeads = signal(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.leadsManage), ...(ngDevMode ? [{ debugName: "canManageLeads" }] : []));
    typeOptions = [
        { label: 'Manual', value: 'Manual' },
        { label: 'Round robin', value: 'RoundRobin' },
        { label: 'Territory', value: 'Territory' }
    ];
    ownerOptions = signal([], ...(ngDevMode ? [{ debugName: "ownerOptions" }] : []));
    form = signal({
        name: '',
        type: 'RoundRobin',
        isActive: true,
        territory: null,
        assignedUserId: null
    }, ...(ngDevMode ? [{ debugName: "form" }] : []));
    pendingEditId = null;
    canSave = computed(() => {
        const value = this.form();
        if (!value.name.trim())
            return false;
        if (value.type === 'Territory' && (!value.territory || !value.assignedUserId))
            return false;
        return true;
    }, ...(ngDevMode ? [{ debugName: "canSave" }] : []));
    assignmentService = inject(LeadAssignmentService);
    userAdminData = inject(UserAdminDataService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    ngOnInit() {
        this.loadRules();
        this.loadOwners();
        this.route.paramMap.subscribe((params) => {
            this.pendingEditId = params.get('id');
            if (this.pendingEditId && this.rules().length) {
                const rule = this.rules().find((item) => item.id === this.pendingEditId);
                if (rule) {
                    this.startEdit(rule);
                }
            }
        });
    }
    startEdit(rule) {
        this.editingId.set(rule.id);
        this.form.set({
            name: rule.name,
            type: rule.type,
            isActive: rule.isActive,
            territory: rule.territory ?? null,
            assignedUserId: rule.assignedUserId ?? null
        });
    }
    onEdit(rule) {
        this.router.navigate(['/app/settings/lead-assignment', rule.id, 'edit']);
    }
    resetForm() {
        this.editingId.set(null);
        this.form.set({
            name: '',
            type: 'RoundRobin',
            isActive: true,
            territory: null,
            assignedUserId: null
        });
        this.router.navigate(['/app/settings/lead-assignment']);
    }
    updateForm(key, value) {
        this.form.update((current) => ({
            ...current,
            [key]: value
        }));
    }
    onTypeChange(type) {
        this.form.update((current) => ({
            ...current,
            type,
            territory: type === 'Territory' ? current.territory : null,
            assignedUserId: type === 'Territory' ? current.assignedUserId : null
        }));
    }
    saveRule() {
        if (!this.canSave())
            return;
        const current = this.form();
        const payload = {
            ...current,
            territory: current.type === 'Territory' ? current.territory : null,
            assignedUserId: current.type === 'Territory' ? current.assignedUserId : null
        };
        const editId = this.editingId();
        if (editId) {
            this.assignmentService.update(editId, payload).subscribe({
                next: () => {
                    this.loadRules();
                }
            });
            return;
        }
        this.assignmentService.create(payload).subscribe({
            next: () => {
                this.loadRules();
                this.resetForm();
            }
        });
    }
    deleteRule(rule) {
        const confirmed = confirm(`Delete assignment rule "${rule.name}"?`);
        if (!confirmed)
            return;
        this.assignmentService.delete(rule.id).subscribe(() => this.loadRules());
    }
    getActiveRulesCount() {
        return this.rules().filter(r => r.isActive).length;
    }
    getTerritoryRulesCount() {
        return this.rules().filter(r => r.type === 'Territory').length;
    }
    getRoundRobinCount() {
        return this.rules().filter(r => r.type === 'RoundRobin').length;
    }
    getRuleTypeClass(type) {
        switch (type) {
            case 'Manual': return 'manual';
            case 'RoundRobin': return 'roundrobin';
            case 'Territory': return 'territory';
            default: return 'manual';
        }
    }
    getTypeIcon(type) {
        switch (type) {
            case 'Manual': return 'pi pi-hand-stop';
            case 'RoundRobin': return 'pi pi-sync';
            case 'Territory': return 'pi pi-map-marker';
            default: return 'pi pi-cog';
        }
    }
    loadRules() {
        this.loading.set(true);
        this.assignmentService.getRules().subscribe({
            next: (data) => {
                this.rules.set(data);
                this.loading.set(false);
                if (this.pendingEditId) {
                    const rule = data.find((item) => item.id === this.pendingEditId);
                    if (rule) {
                        this.startEdit(rule);
                    }
                }
            },
            error: () => this.loading.set(false)
        });
    }
    loadOwners() {
        this.userAdminData.search({ page: 1, pageSize: 100, includeInactive: false }).subscribe({
            next: (res) => {
                this.ownerOptions.set(res.items.map((user) => ({ label: user.fullName, value: user.id })));
            }
        });
    }
    static ɵfac = function LeadAssignmentPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LeadAssignmentPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LeadAssignmentPage, selectors: [["app-lead-assignment-page"]], decls: 182, vars: 39, consts: [[1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-stats"], [1, "hero-stat"], [1, "stat-value"], [1, "stat-label"], [1, "stat-bar"], [1, "stat-bar-fill", 2, "width", "100%"], [1, "stat-bar-fill", "stat-bar-fill--success"], [1, "stat-bar-fill", "stat-bar-fill--info"], [1, "stat-bar-fill", "stat-bar-fill--purple"], [1, "hero-actions"], ["pButton", "", "type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [1, "pi", "pi-plus"], ["pButton", "", "type", "button", "routerLink", "/app/settings", 1, "btn", "btn-secondary"], [1, "pi", "pi-arrow-left"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-bolt"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend", "card-trend--up"], [1, "pi", "pi-check-circle"], [1, "card-glow"], [1, "visual-card", "visual-card--secondary"], [1, "pi", "pi-users"], [1, "card-trend"], [1, "pi", "pi-user-plus"], [1, "metrics-section"], [1, "metric-card", "metric-card--total"], [1, "metric-icon"], [1, "pi", "pi-list"], [1, "metric-content"], [1, "metric-label"], [1, "metric-value"], [1, "metric-ring"], ["viewBox", "0 0 36 36"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-bg"], ["stroke-dasharray", "100, 100", "d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--purple"], [1, "metric-card", "metric-card--success"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--green"], [1, "metric-card", "metric-card--leads"], [1, "pi", "pi-map-marker"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--cyan"], [1, "metric-card", "metric-card--prospects"], [1, "pi", "pi-sync"], ["d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831", 1, "ring-fill", "ring-fill--purple"], [1, "content-grid"], [1, "form-card", "rules-card"], [1, "section-title"], [1, "pi", "pi-sitemap"], ["class", "loading-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "rules-list", 4, "ngIf"], [1, "form-card", "editor-card"], [1, "rule-form", 3, "ngSubmit"], [1, "form-field"], [1, "field-label"], [1, "pi", "pi-bookmark"], [1, "required"], ["pInputText", "", "name", "name", "placeholder", "e.g., West Coast Territory", 1, "premium-input", 3, "ngModelChange", "ngModel"], [1, "field-hint"], [1, "pi", "pi-cog"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "type", "styleClass", "premium-select", 3, "ngModelChange", "options", "ngModel"], ["pTemplate", "selectedItem"], ["pTemplate", "item"], [1, "form-field", "toggle-field"], [1, "toggle-wrapper"], ["name", "isActive", 3, "ngModelChange", "binary", "ngModel"], [1, "toggle-content"], [1, "toggle-label"], [1, "toggle-hint"], [1, "form-actions"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", 3, "click"], [1, "pi", "pi-times"], ["pButton", "", "type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "loading-state"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], [1, "skeleton", "avatar"], [1, "skeleton-content"], [1, "skeleton", "text"], [1, "skeleton", "text", "short"], [1, "skeleton", "badge"], [1, "empty-state"], [1, "empty-icon"], [1, "rules-list"], ["class", "rule-item", 3, "active", "click", 4, "ngFor", "ngForOf"], [1, "rule-item", 3, "click"], [1, "rule-avatar"], [1, "rule-content"], [1, "rule-header"], [1, "rule-name"], [1, "status-badge"], [1, "status-dot"], [1, "rule-meta"], [1, "type-badge"], ["class", "meta-divider", 4, "ngIf"], ["class", "territory-tag", 4, "ngIf"], ["class", "user-tag", 4, "ngIf"], ["class", "rule-last-assigned", 4, "ngIf"], [1, "rule-actions"], ["pButton", "", "type", "button", "pTooltip", "Edit", "tooltipPosition", "top", 1, "icon-btn", "edit", 3, "click", "disabled"], [1, "pi", "pi-pencil"], ["pButton", "", "type", "button", "pTooltip", "Delete", "tooltipPosition", "top", 1, "icon-btn", "delete", 3, "click", "disabled"], [1, "pi", "pi-trash"], [1, "meta-divider"], [1, "territory-tag"], [1, "user-tag"], [1, "pi", "pi-user"], [1, "rule-last-assigned"], [1, "pi", "pi-history"], ["class", "select-option", 4, "ngIf"], [1, "select-option"], ["pInputText", "", "name", "territory", "placeholder", "e.g., West Coast, EMEA, APAC", 1, "premium-input", 3, "ngModelChange", "ngModel"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "name", "assignedUserId", "placeholder", "Select team member", "styleClass", "premium-select", 3, "ngModelChange", "options", "ngModel"], [1, "user-avatar-sm"], [3, "src", "alt", "title"]], template: function LeadAssignmentPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵelement(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 5)(7, "div", 6)(8, "div", 7);
            i0.ɵɵelement(9, "span", 8);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Lead Routing");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 9)(13, "span", 10);
            i0.ɵɵtext(14, "Assignment");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 11);
            i0.ɵɵtext(16, "Rules");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 12);
            i0.ɵɵtext(18, " Configure automated lead routing to distribute incoming leads across your sales team using round-robin, territory-based, or manual assignment strategies. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 13)(20, "div", 14)(21, "div", 15);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 16);
            i0.ɵɵtext(24, "Total Rules");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "div", 17);
            i0.ɵɵelement(26, "div", 18);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 14)(28, "div", 15);
            i0.ɵɵtext(29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 16);
            i0.ɵɵtext(31, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 17);
            i0.ɵɵelement(33, "div", 19);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 14)(35, "div", 15);
            i0.ɵɵtext(36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div", 16);
            i0.ɵɵtext(38, "Territory");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "div", 17);
            i0.ɵɵelement(40, "div", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "div", 14)(42, "div", 15);
            i0.ɵɵtext(43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 16);
            i0.ɵɵtext(45, "Round Robin");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 17);
            i0.ɵɵelement(47, "div", 21);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(48, "div", 22)(49, "button", 23);
            i0.ɵɵlistener("click", function LeadAssignmentPage_Template_button_click_49_listener() { return ctx.resetForm(); });
            i0.ɵɵelement(50, "i", 24);
            i0.ɵɵelementStart(51, "span");
            i0.ɵɵtext(52, "New Rule");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(53, "button", 25);
            i0.ɵɵelement(54, "i", 26);
            i0.ɵɵelementStart(55, "span");
            i0.ɵɵtext(56, "Back to Settings");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(57, "div", 27)(58, "div", 28)(59, "div", 29);
            i0.ɵɵelement(60, "i", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "div", 31)(62, "span", 32);
            i0.ɵɵtext(63, "Automation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "strong", 33);
            i0.ɵɵtext(65);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "span", 34);
            i0.ɵɵelement(67, "i", 35);
            i0.ɵɵtext(68, " Active rules ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(69, "div", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "div", 37)(71, "div", 29);
            i0.ɵɵelement(72, "i", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(73, "div", 31)(74, "span", 32);
            i0.ɵɵtext(75, "Team Size");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(76, "strong", 33);
            i0.ɵɵtext(77);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "span", 39);
            i0.ɵɵelement(79, "i", 40);
            i0.ɵɵtext(80, " Assignees ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(81, "div", 36);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(82, "section", 41)(83, "div", 42)(84, "div", 43);
            i0.ɵɵelement(85, "i", 44);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(86, "div", 45)(87, "span", 46);
            i0.ɵɵtext(88, "Total Rules");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(89, "strong", 47);
            i0.ɵɵtext(90);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(91, "div", 48);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(92, "svg", 49);
            i0.ɵɵelement(93, "path", 50)(94, "path", 51);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(95, "div", 52)(96, "div", 43);
            i0.ɵɵelement(97, "i", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(98, "div", 45)(99, "span", 46);
            i0.ɵɵtext(100, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(101, "strong", 47);
            i0.ɵɵtext(102);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(103, "div", 48);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(104, "svg", 49);
            i0.ɵɵelement(105, "path", 50)(106, "path", 53);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(107, "div", 54)(108, "div", 43);
            i0.ɵɵelement(109, "i", 55);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(110, "div", 45)(111, "span", 46);
            i0.ɵɵtext(112, "Territory");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(113, "strong", 47);
            i0.ɵɵtext(114);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(115, "div", 48);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(116, "svg", 49);
            i0.ɵɵelement(117, "path", 50)(118, "path", 56);
            i0.ɵɵelementEnd()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(119, "div", 57)(120, "div", 43);
            i0.ɵɵelement(121, "i", 58);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(122, "div", 45)(123, "span", 46);
            i0.ɵɵtext(124, "Round Robin");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "strong", 47);
            i0.ɵɵtext(126);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(127, "div", 48);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(128, "svg", 49);
            i0.ɵɵelement(129, "path", 50)(130, "path", 59);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(131, "div", 60)(132, "section", 61)(133, "h3", 62);
            i0.ɵɵelement(134, "i", 63);
            i0.ɵɵtext(135, " Assignment Rules ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(136, LeadAssignmentPage_div_136_Template, 2, 2, "div", 64)(137, LeadAssignmentPage_div_137_Template, 10, 1, "div", 65)(138, LeadAssignmentPage_div_138_Template, 2, 1, "div", 66);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(139, "section", 67)(140, "h3", 62);
            i0.ɵɵelement(141, "i");
            i0.ɵɵtext(142);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(143, "form", 68);
            i0.ɵɵlistener("ngSubmit", function LeadAssignmentPage_Template_form_ngSubmit_143_listener() { return ctx.saveRule(); });
            i0.ɵɵelementStart(144, "div", 69)(145, "label", 70);
            i0.ɵɵelement(146, "i", 71);
            i0.ɵɵtext(147, " Rule Name ");
            i0.ɵɵelementStart(148, "span", 72);
            i0.ɵɵtext(149, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(150, "input", 73);
            i0.ɵɵlistener("ngModelChange", function LeadAssignmentPage_Template_input_ngModelChange_150_listener($event) { return ctx.updateForm("name", $event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(151, "span", 74);
            i0.ɵɵtext(152, "Give this rule a descriptive name");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(153, "div", 69)(154, "label", 70);
            i0.ɵɵelement(155, "i", 75);
            i0.ɵɵtext(156, " Assignment Type ");
            i0.ɵɵelementStart(157, "span", 72);
            i0.ɵɵtext(158, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(159, "p-select", 76);
            i0.ɵɵlistener("ngModelChange", function LeadAssignmentPage_Template_p_select_ngModelChange_159_listener($event) { return ctx.onTypeChange($event); });
            i0.ɵɵtemplate(160, LeadAssignmentPage_ng_template_160_Template, 1, 1, "ng-template", 77)(161, LeadAssignmentPage_ng_template_161_Template, 3, 4, "ng-template", 78);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(162, "span", 74);
            i0.ɵɵconditionalCreate(163, LeadAssignmentPage_Case_163_Template, 1, 0)(164, LeadAssignmentPage_Case_164_Template, 1, 0)(165, LeadAssignmentPage_Case_165_Template, 1, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(166, LeadAssignmentPage_Conditional_166_Template, 19, 3);
            i0.ɵɵelementStart(167, "div", 79)(168, "label", 80)(169, "p-checkbox", 81);
            i0.ɵɵlistener("ngModelChange", function LeadAssignmentPage_Template_p_checkbox_ngModelChange_169_listener($event) { return ctx.updateForm("isActive", !!$event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(170, "div", 82)(171, "span", 83);
            i0.ɵɵtext(172, "Active");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(173, "span", 84);
            i0.ɵɵtext(174, "Enable this rule for automatic lead assignment");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(175, "div", 85)(176, "button", 86);
            i0.ɵɵlistener("click", function LeadAssignmentPage_Template_button_click_176_listener() { return ctx.resetForm(); });
            i0.ɵɵelement(177, "i", 87);
            i0.ɵɵtext(178, " Cancel ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(179, "button", 88);
            i0.ɵɵelement(180, "i");
            i0.ɵɵtext(181);
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            let tmp_26_0;
            i0.ɵɵadvance(22);
            i0.ɵɵtextInterpolate(ctx.rules().length);
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate(ctx.getActiveRulesCount());
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.rules().length ? ctx.getActiveRulesCount() / ctx.rules().length * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.getTerritoryRulesCount());
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.rules().length ? ctx.getTerritoryRulesCount() / ctx.rules().length * 100 : 0, "%");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.getRoundRobinCount());
            i0.ɵɵadvance(4);
            i0.ɵɵstyleProp("width", ctx.rules().length ? ctx.getRoundRobinCount() / ctx.rules().length * 100 : 0, "%");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !ctx.canManageLeads());
            i0.ɵɵadvance(16);
            i0.ɵɵtextInterpolate(ctx.getActiveRulesCount());
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.ownerOptions().length);
            i0.ɵɵadvance(13);
            i0.ɵɵtextInterpolate(ctx.rules().length);
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.getActiveRulesCount());
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.rules().length ? ctx.getActiveRulesCount() / ctx.rules().length * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.getTerritoryRulesCount());
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.rules().length ? ctx.getTerritoryRulesCount() / ctx.rules().length * 100 : 0) + ", 100");
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.getRoundRobinCount());
            i0.ɵɵadvance(4);
            i0.ɵɵattribute("stroke-dasharray", (ctx.rules().length ? ctx.getRoundRobinCount() / ctx.rules().length * 100 : 0) + ", 100");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading() && ctx.rules().length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading() && ctx.rules().length > 0);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("editing", ctx.editingId());
            i0.ɵɵadvance();
            i0.ɵɵclassMap(ctx.editingId() ? "pi pi-pencil" : "pi pi-plus-circle");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.editingId() ? "Edit Rule" : "Create Rule", " ");
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngModel", ctx.form().name);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("options", ctx.typeOptions)("ngModel", ctx.form().type);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional((tmp_26_0 = ctx.form().type) === "RoundRobin" ? 163 : tmp_26_0 === "Territory" ? 164 : tmp_26_0 === "Manual" ? 165 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.form().type === "Territory" ? 166 : -1);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("binary", true)("ngModel", ctx.form().isActive);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("disabled", !ctx.canSave() || !ctx.canManageLeads());
            i0.ɵɵadvance();
            i0.ɵɵclassMap(ctx.editingId() ? "pi pi-check" : "pi pi-plus");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.editingId() ? "Update Rule" : "Create Rule", " ");
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, FormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.NgModel, i2.NgForm, RouterLink,
            ButtonModule, i3.ButtonDirective, i4.PrimeTemplate, CheckboxModule, i5.Checkbox, InputTextModule, i6.InputText, SelectModule, i7.Select, TableModule,
            TooltipModule, i8.Tooltip, BreadcrumbsComponent], styles: ["//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   LEAD[_ngcontent-%COMP%]   ASSIGNMENT[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   -[_ngcontent-%COMP%]   Premium[_ngcontent-%COMP%]   Glass[_ngcontent-%COMP%]   UI[_ngcontent-%COMP%]   Design[_ngcontent-%COMP%]   System\n//[_ngcontent-%COMP%]   Matches[_ngcontent-%COMP%]   workspace-settings.page.scss[_ngcontent-%COMP%]   patterns\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use[_ngcontent-%COMP%]   'sass:color'[_ngcontent-%COMP%];\n@use '../../../../shared/page-design-system' as *;\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n@use '../../../../../styles/cards' as cards;\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   PAGE[_ngcontent-%COMP%]   LAYOUT\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container[_ngcontent-%COMP%] {\n  @include form.form-page-base;\n  padding: $space-5;\n  max-width: 1600px;\n  margin: 0 auto;\n}\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  overflow: hidden;\n  pointer-events: none;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n  \n  &-1 {\n    width: 500px;\n    height: 500px;\n    background: $primary-gradient;\n    top: -150px;\n    left: -100px;\n  }\n  \n  &-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    top: 40%;\n    right: -100px;\n    animation-delay: -7s;\n  }\n  \n  &-3 {\n    width: 450px;\n    height: 450px;\n    background: $purple-gradient;\n    bottom: -150px;\n    left: 35%;\n    animation-delay: -14s;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(15px, -50px) scale(1.02); }\n  75% { transform: translate(-20px, -20px) scale(1.08); }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   HERO[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  align-items: start;\n  margin-bottom: $space-5;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow-sm;\n}\n\n.badge-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  background: $success;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_pulse-glow 2s ease-in-out infinite;\n}\n\n@keyframes _ngcontent-%COMP%_pulse-glow {\n  0%, 100% { opacity: 1; box-shadow: 0 0 12px rgba($success, 0.5); }\n  50% { opacity: 0.7; box-shadow: 0 0 24px rgba($success, 0.8); }\n}\n\n\n.hero-description[_ngcontent-%COMP%] {\n  font-size: $font-size-base;\n  color: $gray-500;\n  max-width: 520px;\n  margin: 0;\n  line-height: 1.6;\n}\n\n//[_ngcontent-%COMP%]   Hero[_ngcontent-%COMP%]   Stats\n.hero-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-5;\n  margin-top: $space-2;\n  flex-wrap: wrap;\n}\n\n.hero-stat[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.stat-value[_ngcontent-%COMP%] {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $gray-800;\n  line-height: 1;\n}\n\n.stat-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.stat-bar[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 4px;\n  background: rgba($gray-300, 0.4);\n  border-radius: $radius-full;\n  overflow: hidden;\n}\n\n.stat-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: $primary-gradient;\n  border-radius: $radius-full;\n  transition: width 0.6s ease-out;\n  \n  &--success { background: $success-gradient; }\n  &--info { background: $cyan-gradient; }\n  &--purple { background: $purple-gradient; }\n  &--warning { background: $orange-gradient; }\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  margin-top: $space-3;\n  flex-wrap: wrap;\n}\n\n//[_ngcontent-%COMP%]   Hero[_ngcontent-%COMP%]   Visual[_ngcontent-%COMP%]   Cards\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n\n  @media (max-width: 1100px) {\n    flex-direction: row;\n  }\n\n  @media (max-width: 600px) {\n    flex-direction: column;\n  }\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  padding: $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  position: relative;\n  overflow: hidden;\n  transition: transform $transition-base, box-shadow $transition-base;\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: -1px;\n    border-radius: $radius-xl;\n    padding: 1px;\n    background: linear-gradient(135deg, transparent 0%, transparent 100%);\n    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n    -webkit-mask-composite: xor;\n    mask-composite: exclude;\n    pointer-events: none;\n    opacity: 0;\n    transition: opacity $transition-base;\n  }\n\n  &:hover {\n    transform: translateY(-3px) scale(1.01);\n    box-shadow: $glass-shadow-lg;\n    \n    &::before {\n      opacity: 1;\n      background: linear-gradient(135deg, \n        rgba(0, 122, 255, 0.3) 0%,\n        rgba(175, 82, 222, 0.2) 50%,\n        rgba(90, 200, 250, 0.3) 100%);\n    }\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n  }\n\n  &--secondary {\n    background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);\n  }\n}\n\n.card-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  border-radius: $radius-lg;\n  flex-shrink: 0;\n  transition: transform $transition-base;\n\n  i {\n    font-size: 1.125rem;\n    color: white;\n  }\n\n  .visual-card--secondary & {\n    background: $cyan-gradient;\n  }\n\n  .visual-card:hover & {\n    transform: scale(1.08);\n  }\n}\n\n.card-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.card-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.card-value[_ngcontent-%COMP%] {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n.card-trend[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $gray-500;\n\n  i { font-size: 0.625rem; }\n\n  &--up {\n    color: $success;\n    i { color: $success; }\n  }\n}\n\n.card-glow[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 60%);\n  opacity: 0;\n  transition: opacity 0.4s ease;\n  pointer-events: none;\n\n  .visual-card:hover & { opacity: 1; }\n  .visual-card--secondary & {\n    background: radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.15) 0%, transparent 60%);\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   METRICS[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.metrics-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.metric-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all $transition-base;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 4 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n}\n\n.metric-icon[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  font-size: 1rem;\n  color: white;\n  flex-shrink: 0;\n  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.metric-card--total[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] { background: $primary-gradient; }\n.metric-card--success[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] { background: $success-gradient; }\n.metric-card--leads[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] { background: $cyan-gradient; }\n.metric-card--prospects[_ngcontent-%COMP%]   .metric-icon[_ngcontent-%COMP%] { background: $purple-gradient; }\n\n.metric-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  flex: 1;\n  min-width: 0;\n}\n\n.metric-label[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.metric-value[_ngcontent-%COMP%] {\n  font-size: $font-size-xl;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n.metric-ring[_ngcontent-%COMP%] {\n  position: absolute;\n  right: $space-3;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: $gray-200;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n\n    &--purple { stroke: $purple; }\n    &--green { stroke: $success; }\n    &--cyan { stroke: $cyan; }\n    &--orange { stroke: $orange; }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   CONTENT[_ngcontent-%COMP%]   GRID\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.content-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1.4fr 1fr;\n  gap: $space-5;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   FORM[_ngcontent-%COMP%]   CARDS[_ngcontent-%COMP%]   (Glass with Focus Pop)\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n//[_ngcontent-%COMP%]   Use[_ngcontent-%COMP%]   the[_ngcontent-%COMP%]   global[_ngcontent-%COMP%]   form-section[_ngcontent-%COMP%]   mixin[_ngcontent-%COMP%]   for[_ngcontent-%COMP%]   all[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   cards\n.form-card[_ngcontent-%COMP%] {\n  @include form.form-section;\n  padding: $space-5;\n  animation: _ngcontent-%COMP%_fade-in-up 0.6s ease-out backwards;\n  \n  &.rules-card {\n    animation-delay: 0.1s;\n  }\n  \n  &.editor-card {\n    animation-delay: 0.2s;\n    align-self: start;\n    position: sticky;\n    top: $space-5;\n  }\n}\n\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding-bottom: $space-4;\n  margin-bottom: $space-4;\n  border-bottom: 1px solid rgba($cyan, 0.2);\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: color.adjust($cyan, $lightness: -25%);\n  margin-top: 0;\n\n  i {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    background: rgba($cyan, 0.15);\n    color: $cyan;\n    font-size: $font-size-base;\n    transition: all $transition-base;\n  }\n\n  &.editing i {\n    background: rgba($warning, 0.15);\n    color: $warning;\n  }\n\n  .form-card:hover & i {\n    transform: scale(1.05);\n    box-shadow: 0 4px 12px rgba($cyan, 0.2);\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   RULES[_ngcontent-%COMP%]   LIST\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.rules-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.rule-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: rgba(255, 255, 255, 0.6);\n  border: 1px solid transparent;\n  border-radius: $radius-lg;\n  cursor: pointer;\n  transition: all $transition-base;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.9);\n    border-color: rgba($primary, 0.2);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);\n  }\n\n  &.active {\n    background: rgba($primary, 0.08);\n    border-color: rgba($primary, 0.3);\n    box-shadow: 0 4px 16px rgba($primary, 0.1);\n  }\n}\n\n.rule-avatar[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-lg;\n  font-size: 1rem;\n  color: white;\n  flex-shrink: 0;\n\n  &.manual { background: $blue-gradient; }\n  &.roundrobin { background: $purple-gradient; }\n  &.territory { background: $cyan-gradient; }\n}\n\n.rule-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.rule-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n}\n\n.rule-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $gray-800;\n  font-size: $font-size-sm;\n}\n\n.rule-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.meta-divider[_ngcontent-%COMP%] {\n  color: $gray-300;\n  font-size: $font-size-xs;\n}\n\n.type-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 2px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-md;\n\n  i { font-size: 0.625rem; }\n\n  &.manual {\n    background: rgba($info, 0.12);\n    color: $info;\n  }\n  &.roundrobin {\n    background: rgba($purple, 0.12);\n    color: $purple;\n  }\n  &.territory {\n    background: rgba($cyan, 0.12);\n    color: #0891b2; // cyan-600\n  }\n}\n\n.territory-tag[_ngcontent-%COMP%], \n.user-tag[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $gray-500;\n\n  i { font-size: 0.625rem; }\n}\n\n.rule-last-assigned[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $gray-400;\n  margin-top: 2px;\n\n  i { font-size: 0.625rem; }\n}\n\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 2px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n\n  &.active {\n    background: rgba($success, 0.12);\n    color: #16a34a; // green-600\n    \n    .status-dot {\n      background: $success;\n      box-shadow: 0 0 6px rgba($success, 0.5);\n    }\n  }\n\n  &.paused {\n    background: rgba($gray-400, 0.15);\n    color: $gray-500;\n    \n    .status-dot {\n      background: $gray-400;\n    }\n  }\n}\n\n.status-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n}\n\n.rule-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-1;\n  flex-shrink: 0;\n}\n\n.icon-btn[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  border-radius: $radius-md;\n  cursor: pointer;\n  transition: all $transition-fast;\n  color: $gray-400;\n\n  i { font-size: 0.875rem; }\n\n  &.edit:hover:not(:disabled) {\n    background: rgba($primary, 0.1);\n    color: $primary;\n  }\n\n  &.delete:hover:not(:disabled) {\n    background: rgba($danger, 0.1);\n    color: $danger;\n  }\n\n  &:disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   FORM[_ngcontent-%COMP%]   STYLES\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.rule-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.field-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-700;\n\n  i {\n    font-size: 0.75rem;\n    color: $cyan;\n  }\n\n  .required {\n    color: $danger;\n    margin-left: 2px;\n  }\n}\n\n.field-hint[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-400;\n  margin-top: -$space-1;\n}\n\n.premium-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: $space-3 $space-4;\n  font-size: $font-size-sm;\n  color: $gray-800;\n  background: rgba(255, 255, 255, 0.8);\n  border: 1px solid rgba($gray-300, 0.5);\n  border-radius: $radius-lg;\n  transition: all $transition-normal;\n\n  &::placeholder {\n    color: $gray-400;\n  }\n\n  &:hover {\n    border-color: rgba($primary, 0.3);\n  }\n\n  &:focus {\n    outline: none;\n    border-color: $primary;\n    box-shadow: 0 0 0 3px rgba($primary, 0.1);\n  }\n}\n\n[_nghost-%COMP%]     .premium-select {\n  width: 100%;\n\n  .p-select {\n    width: 100%;\n    background: rgba(255, 255, 255, 0.8);\n    border: 1px solid rgba($gray-300, 0.5);\n    border-radius: $radius-lg;\n    transition: all $transition-normal;\n\n    &:hover {\n      border-color: rgba($primary, 0.3);\n    }\n\n    &.p-focus {\n      border-color: $primary;\n      box-shadow: 0 0 0 3px rgba($primary, 0.1);\n    }\n  }\n}\n\n.select-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 0;\n\n  i {\n    color: $cyan;\n    font-size: 0.875rem;\n  }\n}\n\n.user-avatar-sm[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  border-radius: $radius-full;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  color: white;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n//[_ngcontent-%COMP%]   Toggle[_ngcontent-%COMP%]   Field\n.toggle-field[_ngcontent-%COMP%] {\n  padding-top: $space-2;\n}\n\n.toggle-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  cursor: pointer;\n}\n\n.toggle-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.toggle-label[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-700;\n}\n\n.toggle-hint[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n//[_ngcontent-%COMP%]   Form[_ngcontent-%COMP%]   Actions\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: $space-3;\n  padding-top: $space-4;\n  border-top: 1px solid rgba($gray-200, 0.5);\n  margin-top: $space-2;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   BUTTONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-5;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: $radius-lg;\n  border: none;\n  cursor: pointer;\n  transition: all $transition-base;\n  white-space: nowrap;\n  font-family: inherit;\n\n  i { font-size: 0.875rem; }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: $primary-gradient;\n  color: white;\n  box-shadow: 0 4px 15px rgba($primary, 0.3);\n\n  &:hover:not(:disabled) {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba($primary, 0.4);\n  }\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba($gray-300, 0.5);\n  color: $gray-700;\n  box-shadow: $glass-shadow-sm;\n\n  &:hover:not(:disabled) {\n    background: white;\n    border-color: rgba($gray-400, 0.5);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n  }\n}\n\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: $gray-500;\n  border: 1px solid transparent;\n\n  &:hover:not(:disabled) {\n    background: rgba($gray-100, 0.8);\n    color: $gray-700;\n    border-color: rgba($gray-200, 0.5);\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   EMPTY[_ngcontent-%COMP%]   &[_ngcontent-%COMP%]   LOADING[_ngcontent-%COMP%]   STATES\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: $space-8 $space-5;\n\n  .empty-icon {\n    width: 72px;\n    height: 72px;\n    margin: 0 auto $space-4;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: linear-gradient(135deg, rgba($primary, 0.1) 0%, rgba($accent, 0.1) 100%);\n    border-radius: $radius-xl;\n\n    i {\n      font-size: 1.75rem;\n      color: $primary;\n    }\n  }\n\n  h4 {\n    margin: 0 0 $space-2;\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0 0 $space-5;\n    color: $gray-500;\n    font-size: $font-size-sm;\n    max-width: 300px;\n    margin-left: auto;\n    margin-right: auto;\n  }\n}\n\n.loading-state[_ngcontent-%COMP%] {\n  padding: $space-3;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 0;\n  border-bottom: 1px solid rgba($gray-200, 0.3);\n\n  &:last-child {\n    border-bottom: none;\n  }\n}\n\n.skeleton-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.skeleton[_ngcontent-%COMP%] {\n  background: linear-gradient(90deg, rgba($gray-200, 0.5) 25%, rgba($gray-100, 0.5) 50%, rgba($gray-200, 0.5) 75%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n  border-radius: $radius-md;\n\n  &.avatar {\n    width: 42px;\n    height: 42px;\n    border-radius: $radius-lg;\n  }\n\n  &.text {\n    height: 14px;\n    width: 140px;\n  }\n\n  &.short {\n    width: 90px;\n  }\n\n  &.badge {\n    height: 22px;\n    width: 70px;\n    border-radius: $radius-full;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   RESPONSIVE[_ngcontent-%COMP%]   ADJUSTMENTS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 768px) {\n  .page-container {\n    padding: $space-4;\n  }\n\n  .hero-stats {\n    gap: $space-4;\n  }\n\n  .hero-stat {\n    min-width: 70px;\n  }\n\n  // Keep primary actions reachable without horizontal scrolling.\n  .hero-actions {\n    flex-direction: column;\n    align-items: stretch;\n\n    .btn {\n      width: 100%;\n      justify-content: center;\n    }\n  }\n\n  .form-card {\n    padding: $space-4;\n  }\n\n  .form-card.editor-card {\n    position: static;\n  }\n\n  .rule-item {\n    flex-wrap: wrap;\n    gap: $space-2;\n  }\n\n  .rule-content {\n    width: calc(100% - 54px);\n  }\n\n  .rule-actions {\n    width: 100%;\n    justify-content: flex-end;\n    padding-top: $space-2;\n    border-top: 1px solid rgba($gray-200, 0.3);\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LeadAssignmentPage, [{
        type: Component,
        args: [{ selector: 'app-lead-assignment-page', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    RouterLink,
                    ButtonModule,
                    CheckboxModule,
                    InputTextModule,
                    SelectModule,
                    TableModule,
                    TooltipModule,
                    BreadcrumbsComponent
                ], template: "<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     LEAD ASSIGNMENT PAGE - Premium Glass UI Design System\n     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n<div class=\"page-container\">\n  <!-- Animated Background Orbs -->\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <!-- Breadcrumb -->\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       HERO SECTION\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Lead Routing</span>\n      </div>\n      \n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Assignment</span>\n        <span class=\"title-light\">Rules</span>\n      </h1>\n      \n      <p class=\"hero-description\">\n        Configure automated lead routing to distribute incoming leads across your sales team using round-robin, territory-based, or manual assignment strategies.\n      </p>\n\n      <!-- Hero Stats with Progress Bars -->\n      <div class=\"hero-stats\">\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ rules().length }}</div>\n          <div class=\"stat-label\">Total Rules</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill\" style=\"width: 100%\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ getActiveRulesCount() }}</div>\n          <div class=\"stat-label\">Active</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--success\" [style.width.%]=\"rules().length ? (getActiveRulesCount() / rules().length) * 100 : 0\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ getTerritoryRulesCount() }}</div>\n          <div class=\"stat-label\">Territory</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--info\" [style.width.%]=\"rules().length ? (getTerritoryRulesCount() / rules().length) * 100 : 0\"></div>\n          </div>\n        </div>\n        <div class=\"hero-stat\">\n          <div class=\"stat-value\">{{ getRoundRobinCount() }}</div>\n          <div class=\"stat-label\">Round Robin</div>\n          <div class=\"stat-bar\">\n            <div class=\"stat-bar-fill stat-bar-fill--purple\" [style.width.%]=\"rules().length ? (getRoundRobinCount() / rules().length) * 100 : 0\"></div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"hero-actions\">\n        <button pButton type=\"button\" class=\"btn btn-primary\" [disabled]=\"!canManageLeads()\" (click)=\"resetForm()\">\n          <i class=\"pi pi-plus\"></i>\n          <span>New Rule</span>\n        </button>\n        <button pButton type=\"button\" class=\"btn btn-secondary\" routerLink=\"/app/settings\">\n          <i class=\"pi pi-arrow-left\"></i>\n          <span>Back to Settings</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-bolt\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Automation</span>\n          <strong class=\"card-value\">{{ getActiveRulesCount() }}</strong>\n          <span class=\"card-trend card-trend--up\">\n            <i class=\"pi pi-check-circle\"></i> Active rules\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n\n      <div class=\"visual-card visual-card--secondary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-users\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Team Size</span>\n          <strong class=\"card-value\">{{ ownerOptions().length }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-user-plus\"></i> Assignees\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       METRICS DASHBOARD\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"metrics-section\">\n    <div class=\"metric-card metric-card--total\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-list\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Total Rules</span>\n        <strong class=\"metric-value\">{{ rules().length }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--purple\" stroke-dasharray=\"100, 100\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--success\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-check-circle\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Active</span>\n        <strong class=\"metric-value\">{{ getActiveRulesCount() }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--green\" [attr.stroke-dasharray]=\"(rules().length ? (getActiveRulesCount() / rules().length) * 100 : 0) + ', 100'\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--leads\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-map-marker\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Territory</span>\n        <strong class=\"metric-value\">{{ getTerritoryRulesCount() }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--cyan\" [attr.stroke-dasharray]=\"(rules().length ? (getTerritoryRulesCount() / rules().length) * 100 : 0) + ', 100'\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n\n    <div class=\"metric-card metric-card--prospects\">\n      <div class=\"metric-icon\">\n        <i class=\"pi pi-sync\"></i>\n      </div>\n      <div class=\"metric-content\">\n        <span class=\"metric-label\">Round Robin</span>\n        <strong class=\"metric-value\">{{ getRoundRobinCount() }}</strong>\n      </div>\n      <div class=\"metric-ring\">\n        <svg viewBox=\"0 0 36 36\">\n          <path class=\"ring-bg\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n          <path class=\"ring-fill ring-fill--purple\" [attr.stroke-dasharray]=\"(rules().length ? (getRoundRobinCount() / rules().length) * 100 : 0) + ', 100'\" d=\"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831\"/>\n        </svg>\n      </div>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       MAIN CONTENT - Two Column Layout\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <div class=\"content-grid\">\n    <!-- Rules Table Card -->\n    <section class=\"form-card rules-card\">\n      <h3 class=\"section-title\">\n        <i class=\"pi pi-sitemap\"></i>\n        Assignment Rules\n      </h3>\n\n      <!-- Loading State -->\n      <div class=\"loading-state\" *ngIf=\"loading()\">\n        <div class=\"skeleton-row\" *ngFor=\"let _ of [1,2,3,4]\">\n          <div class=\"skeleton avatar\"></div>\n          <div class=\"skeleton-content\">\n            <div class=\"skeleton text\"></div>\n            <div class=\"skeleton text short\"></div>\n          </div>\n          <div class=\"skeleton badge\"></div>\n        </div>\n      </div>\n\n      <!-- Empty State -->\n      <div class=\"empty-state\" *ngIf=\"!loading() && rules().length === 0\">\n        <div class=\"empty-icon\">\n          <i class=\"pi pi-sitemap\"></i>\n        </div>\n        <h4>No Rules Configured</h4>\n        <p>Create your first lead assignment rule to automate lead routing across your sales team.</p>\n        <button pButton type=\"button\" class=\"btn btn-primary\" [disabled]=\"!canManageLeads()\" (click)=\"resetForm()\">\n          <i class=\"pi pi-plus\"></i>\n          Create First Rule\n        </button>\n      </div>\n\n      <!-- Rules List -->\n      <div class=\"rules-list\" *ngIf=\"!loading() && rules().length > 0\">\n        <div class=\"rule-item\" \n             *ngFor=\"let rule of rules()\" \n             [class.active]=\"editingId() === rule.id\"\n             (click)=\"startEdit(rule)\">\n          <div class=\"rule-avatar\" [class]=\"getRuleTypeClass(rule.type)\">\n            <i [class]=\"getTypeIcon(rule.type)\"></i>\n          </div>\n          <div class=\"rule-content\">\n            <div class=\"rule-header\">\n              <span class=\"rule-name\">{{ rule.name }}</span>\n              <span class=\"status-badge\" [class.active]=\"rule.isActive\" [class.paused]=\"!rule.isActive\">\n                <span class=\"status-dot\"></span>\n                {{ rule.isActive ? 'Active' : 'Paused' }}\n              </span>\n            </div>\n            <div class=\"rule-meta\">\n              <span class=\"type-badge\" [class]=\"getRuleTypeClass(rule.type)\">\n                <i [class]=\"getTypeIcon(rule.type)\"></i>\n                {{ rule.type }}\n              </span>\n              <span class=\"meta-divider\" *ngIf=\"rule.territory\">\u2022</span>\n              <span class=\"territory-tag\" *ngIf=\"rule.territory\">\n                <i class=\"pi pi-map-marker\"></i>\n                {{ rule.territory }}\n              </span>\n              <span class=\"meta-divider\" *ngIf=\"rule.assignedUserName\">\u2022</span>\n              <span class=\"user-tag\" *ngIf=\"rule.assignedUserName\">\n                <i class=\"pi pi-user\"></i>\n                {{ rule.assignedUserName }}\n              </span>\n            </div>\n            <div class=\"rule-last-assigned\" *ngIf=\"rule.lastAssignedUserName\">\n              <i class=\"pi pi-history\"></i>\n              Last: {{ rule.lastAssignedUserName }}\n            </div>\n          </div>\n          <div class=\"rule-actions\">\n            <button pButton type=\"button\" class=\"icon-btn edit\" pTooltip=\"Edit\" tooltipPosition=\"top\" [disabled]=\"!canManageLeads()\" (click)=\"$event.stopPropagation(); startEdit(rule)\">\n              <i class=\"pi pi-pencil\"></i>\n            </button>\n            <button pButton type=\"button\" class=\"icon-btn delete\" pTooltip=\"Delete\" tooltipPosition=\"top\" [disabled]=\"!canManageLeads()\" (click)=\"$event.stopPropagation(); deleteRule(rule)\">\n              <i class=\"pi pi-trash\"></i>\n            </button>\n          </div>\n        </div>\n      </div>\n    </section>\n\n    <!-- Rule Form Card -->\n    <section class=\"form-card editor-card\">\n      <h3 class=\"section-title\" [class.editing]=\"editingId()\">\n        <i [class]=\"editingId() ? 'pi pi-pencil' : 'pi pi-plus-circle'\"></i>\n        {{ editingId() ? 'Edit Rule' : 'Create Rule' }}\n      </h3>\n\n      <form class=\"rule-form\" (ngSubmit)=\"saveRule()\">\n        <!-- Rule Name -->\n        <div class=\"form-field\">\n          <label class=\"field-label\">\n            <i class=\"pi pi-bookmark\"></i>\n            Rule Name <span class=\"required\">*</span>\n          </label>\n          <input pInputText \n                 name=\"name\" \n                 [ngModel]=\"form().name\"\n                 (ngModelChange)=\"updateForm('name', $event)\"\n                 placeholder=\"e.g., West Coast Territory\" \n                 class=\"premium-input\" />\n          <span class=\"field-hint\">Give this rule a descriptive name</span>\n        </div>\n\n        <!-- Assignment Type -->\n        <div class=\"form-field\">\n          <label class=\"field-label\">\n            <i class=\"pi pi-cog\"></i>\n            Assignment Type <span class=\"required\">*</span>\n          </label>\n          <p-select appendTo=\"body\"\n            [options]=\"typeOptions\"\n            optionLabel=\"label\"\n            optionValue=\"value\"\n            name=\"type\"\n            [ngModel]=\"form().type\"\n            (ngModelChange)=\"onTypeChange($event)\"\n            styleClass=\"premium-select\"\n          >\n            <ng-template pTemplate=\"selectedItem\" let-option>\n              <div class=\"select-option\" *ngIf=\"option\">\n                <i [class]=\"getTypeIcon(option.value)\"></i>\n                {{ option.label }}\n              </div>\n            </ng-template>\n            <ng-template pTemplate=\"item\" let-option>\n              <div class=\"select-option\" [attr.data-testid]=\"'lead-rule-type-' + option.value\">\n                <i [class]=\"getTypeIcon(option.value)\"></i>\n                {{ option.label }}\n              </div>\n            </ng-template>\n          </p-select>\n          <span class=\"field-hint\">\n            @switch (form().type) {\n              @case ('RoundRobin') { Leads rotate evenly across all team members }\n              @case ('Territory') { Leads go to the assigned owner for a region }\n              @case ('Manual') { Leads require manual assignment }\n            }\n          </span>\n        </div>\n\n        <!-- Territory (conditional) -->\n        @if (form().type === 'Territory') {\n          <div class=\"form-field\">\n            <label class=\"field-label\">\n              <i class=\"pi pi-map-marker\"></i>\n              Territory <span class=\"required\">*</span>\n            </label>\n            <input pInputText \n                   name=\"territory\" \n                   [ngModel]=\"form().territory\"\n                   (ngModelChange)=\"updateForm('territory', $event)\"\n                   placeholder=\"e.g., West Coast, EMEA, APAC\" \n                   class=\"premium-input\" />\n            <span class=\"field-hint\">Geographic region or market segment</span>\n          </div>\n\n          <!-- Assigned User (conditional) -->\n          <div class=\"form-field\">\n            <label class=\"field-label\">\n              <i class=\"pi pi-user\"></i>\n              Assigned Owner <span class=\"required\">*</span>\n            </label>\n            <p-select appendTo=\"body\"\n              [options]=\"ownerOptions()\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              name=\"assignedUserId\"\n              [ngModel]=\"form().assignedUserId\"\n              (ngModelChange)=\"updateForm('assignedUserId', $event)\"\n              placeholder=\"Select team member\"\n              styleClass=\"premium-select\"\n            >\n              <ng-template pTemplate=\"item\" let-option>\n                <div class=\"select-option\" [attr.data-testid]=\"'lead-rule-owner-' + option.value\">\n                  <div class=\"user-avatar-sm\">\n                    <img\n                      [src]=\"$any(option).profilePictureUrl || ('https://i.pravatar.cc/150?u=' + ($any(option).email || option.value || option.label))\"\n                      [alt]=\"option.label + ' avatar'\"\n                      [title]=\"option.label + ' avatar'\"\n                    />\n                  </div>\n                  {{ option.label }}\n                </div>\n              </ng-template>\n            </p-select>\n            <span class=\"field-hint\">All leads matching this territory go to this person</span>\n          </div>\n        }\n\n        <!-- Active Toggle -->\n        <div class=\"form-field toggle-field\">\n          <label class=\"toggle-wrapper\">\n            <p-checkbox\n              [binary]=\"true\"\n              [ngModel]=\"form().isActive\"\n              (ngModelChange)=\"updateForm('isActive', !!$event)\"\n              name=\"isActive\"></p-checkbox>\n            <div class=\"toggle-content\">\n              <span class=\"toggle-label\">Active</span>\n              <span class=\"toggle-hint\">Enable this rule for automatic lead assignment</span>\n            </div>\n          </label>\n        </div>\n\n        <!-- Form Actions -->\n        <div class=\"form-actions\">\n          <button pButton type=\"button\" class=\"btn btn-ghost\" (click)=\"resetForm()\">\n            <i class=\"pi pi-times\"></i>\n            Cancel\n          </button>\n          <button pButton type=\"submit\" class=\"btn btn-primary\" [disabled]=\"!canSave() || !canManageLeads()\">\n            <i [class]=\"editingId() ? 'pi pi-check' : 'pi pi-plus'\"></i>\n            {{ editingId() ? 'Update Rule' : 'Create Rule' }}\n          </button>\n        </div>\n      </form>\n    </section>\n  </div>\n</div>\n", styles: ["// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// LEAD ASSIGNMENT PAGE - Premium Glass UI Design System\n// Matches workspace-settings.page.scss patterns\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n@use 'sass:color';\n@use '../../../../shared/page-design-system' as *;\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n@use '../../../../../styles/cards' as cards;\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// PAGE LAYOUT\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container {\n  @include form.form-page-base;\n  padding: $space-5;\n  max-width: 1600px;\n  margin: 0 auto;\n}\n\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  z-index: 0;\n  overflow: hidden;\n  pointer-events: none;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.4;\n  animation: orb-float 20s ease-in-out infinite;\n  \n  &-1 {\n    width: 500px;\n    height: 500px;\n    background: $primary-gradient;\n    top: -150px;\n    left: -100px;\n  }\n  \n  &-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    top: 40%;\n    right: -100px;\n    animation-delay: -7s;\n  }\n  \n  &-3 {\n    width: 450px;\n    height: 450px;\n    background: $purple-gradient;\n    bottom: -150px;\n    left: 35%;\n    animation-delay: -14s;\n  }\n}\n\n@keyframes orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(15px, -50px) scale(1.02); }\n  75% { transform: translate(-20px, -20px) scale(1.08); }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// HERO SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  align-items: start;\n  margin-bottom: $space-5;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow-sm;\n}\n\n.badge-dot {\n  width: 8px;\n  height: 8px;\n  background: $success;\n  border-radius: 50%;\n  animation: pulse-glow 2s ease-in-out infinite;\n}\n\n@keyframes pulse-glow {\n  0%, 100% { opacity: 1; box-shadow: 0 0 12px rgba($success, 0.5); }\n  50% { opacity: 0.7; box-shadow: 0 0 24px rgba($success, 0.8); }\n}\n\n\n.hero-description {\n  font-size: $font-size-base;\n  color: $gray-500;\n  max-width: 520px;\n  margin: 0;\n  line-height: 1.6;\n}\n\n// Hero Stats\n.hero-stats {\n  display: flex;\n  gap: $space-5;\n  margin-top: $space-2;\n  flex-wrap: wrap;\n}\n\n.hero-stat {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.stat-value {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $gray-800;\n  line-height: 1;\n}\n\n.stat-label {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.stat-bar {\n  width: 80px;\n  height: 4px;\n  background: rgba($gray-300, 0.4);\n  border-radius: $radius-full;\n  overflow: hidden;\n}\n\n.stat-bar-fill {\n  height: 100%;\n  background: $primary-gradient;\n  border-radius: $radius-full;\n  transition: width 0.6s ease-out;\n  \n  &--success { background: $success-gradient; }\n  &--info { background: $cyan-gradient; }\n  &--purple { background: $purple-gradient; }\n  &--warning { background: $orange-gradient; }\n}\n\n.hero-actions {\n  display: flex;\n  gap: $space-3;\n  margin-top: $space-3;\n  flex-wrap: wrap;\n}\n\n// Hero Visual Cards\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n\n  @media (max-width: 1100px) {\n    flex-direction: row;\n  }\n\n  @media (max-width: 600px) {\n    flex-direction: column;\n  }\n}\n\n.visual-card {\n  display: flex;\n  gap: $space-3;\n  padding: $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  position: relative;\n  overflow: hidden;\n  transition: transform $transition-base, box-shadow $transition-base;\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: -1px;\n    border-radius: $radius-xl;\n    padding: 1px;\n    background: linear-gradient(135deg, transparent 0%, transparent 100%);\n    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n    -webkit-mask-composite: xor;\n    mask-composite: exclude;\n    pointer-events: none;\n    opacity: 0;\n    transition: opacity $transition-base;\n  }\n\n  &:hover {\n    transform: translateY(-3px) scale(1.01);\n    box-shadow: $glass-shadow-lg;\n    \n    &::before {\n      opacity: 1;\n      background: linear-gradient(135deg, \n        rgba(0, 122, 255, 0.3) 0%,\n        rgba(175, 82, 222, 0.2) 50%,\n        rgba(90, 200, 250, 0.3) 100%);\n    }\n  }\n\n  &--primary {\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(14, 165, 233, 0.06) 100%);\n  }\n\n  &--secondary {\n    background: linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);\n  }\n}\n\n.card-icon {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  border-radius: $radius-lg;\n  flex-shrink: 0;\n  transition: transform $transition-base;\n\n  i {\n    font-size: 1.125rem;\n    color: white;\n  }\n\n  .visual-card--secondary & {\n    background: $cyan-gradient;\n  }\n\n  .visual-card:hover & {\n    transform: scale(1.08);\n  }\n}\n\n.card-content {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.card-label {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.card-value {\n  font-size: $font-size-2xl;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n.card-trend {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $gray-500;\n\n  i { font-size: 0.625rem; }\n\n  &--up {\n    color: $success;\n    i { color: $success; }\n  }\n}\n\n.card-glow {\n  position: absolute;\n  inset: 0;\n  background: radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 60%);\n  opacity: 0;\n  transition: opacity 0.4s ease;\n  pointer-events: none;\n\n  .visual-card:hover & { opacity: 1; }\n  .visual-card--secondary & {\n    background: radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.15) 0%, transparent 60%);\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// METRICS SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.metrics-section {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: $space-3;\n  margin-bottom: $space-5;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1100px) {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  @media (max-width: 600px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.metric-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all $transition-base;\n  animation: fade-in-up 0.5s ease-out backwards;\n\n  @for $i from 1 through 4 {\n    &:nth-child(#{$i}) {\n      animation-delay: #{$i * 0.05}s;\n    }\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n\n    .metric-icon {\n      transform: scale(1.1) rotate(5deg);\n    }\n  }\n}\n\n.metric-icon {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-md;\n  font-size: 1rem;\n  color: white;\n  flex-shrink: 0;\n  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n}\n\n.metric-card--total .metric-icon { background: $primary-gradient; }\n.metric-card--success .metric-icon { background: $success-gradient; }\n.metric-card--leads .metric-icon { background: $cyan-gradient; }\n.metric-card--prospects .metric-icon { background: $purple-gradient; }\n\n.metric-content {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  flex: 1;\n  min-width: 0;\n}\n\n.metric-label {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n\n.metric-value {\n  font-size: $font-size-xl;\n  font-weight: 700;\n  color: $gray-800;\n}\n\n.metric-ring {\n  position: absolute;\n  right: $space-3;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 32px;\n  height: 32px;\n\n  svg {\n    width: 100%;\n    height: 100%;\n    transform: rotate(-90deg);\n  }\n\n  .ring-bg {\n    fill: none;\n    stroke: $gray-200;\n    stroke-width: 3;\n  }\n\n  .ring-fill {\n    fill: none;\n    stroke-width: 3;\n    stroke-linecap: round;\n    transition: stroke-dasharray 1s ease-out;\n\n    &--purple { stroke: $purple; }\n    &--green { stroke: $success; }\n    &--cyan { stroke: $cyan; }\n    &--orange { stroke: $orange; }\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// CONTENT GRID\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.content-grid {\n  display: grid;\n  grid-template-columns: 1.4fr 1fr;\n  gap: $space-5;\n  position: relative;\n  z-index: 1;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// FORM CARDS (Glass with Focus Pop)\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n// Use the global form-section mixin for all form cards\n.form-card {\n  @include form.form-section;\n  padding: $space-5;\n  animation: fade-in-up 0.6s ease-out backwards;\n  \n  &.rules-card {\n    animation-delay: 0.1s;\n  }\n  \n  &.editor-card {\n    animation-delay: 0.2s;\n    align-self: start;\n    position: sticky;\n    top: $space-5;\n  }\n}\n\n.section-title {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding-bottom: $space-4;\n  margin-bottom: $space-4;\n  border-bottom: 1px solid rgba($cyan, 0.2);\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: color.adjust($cyan, $lightness: -25%);\n  margin-top: 0;\n\n  i {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    background: rgba($cyan, 0.15);\n    color: $cyan;\n    font-size: $font-size-base;\n    transition: all $transition-base;\n  }\n\n  &.editing i {\n    background: rgba($warning, 0.15);\n    color: $warning;\n  }\n\n  .form-card:hover & i {\n    transform: scale(1.05);\n    box-shadow: 0 4px 12px rgba($cyan, 0.2);\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// RULES LIST\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.rules-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.rule-item {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: rgba(255, 255, 255, 0.6);\n  border: 1px solid transparent;\n  border-radius: $radius-lg;\n  cursor: pointer;\n  transition: all $transition-base;\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.9);\n    border-color: rgba($primary, 0.2);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);\n  }\n\n  &.active {\n    background: rgba($primary, 0.08);\n    border-color: rgba($primary, 0.3);\n    box-shadow: 0 4px 16px rgba($primary, 0.1);\n  }\n}\n\n.rule-avatar {\n  width: 42px;\n  height: 42px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: $radius-lg;\n  font-size: 1rem;\n  color: white;\n  flex-shrink: 0;\n\n  &.manual { background: $blue-gradient; }\n  &.roundrobin { background: $purple-gradient; }\n  &.territory { background: $cyan-gradient; }\n}\n\n.rule-content {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n}\n\n.rule-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-2;\n}\n\n.rule-name {\n  font-weight: 600;\n  color: $gray-800;\n  font-size: $font-size-sm;\n}\n\n.rule-meta {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.meta-divider {\n  color: $gray-300;\n  font-size: $font-size-xs;\n}\n\n.type-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 2px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-md;\n\n  i { font-size: 0.625rem; }\n\n  &.manual {\n    background: rgba($info, 0.12);\n    color: $info;\n  }\n  &.roundrobin {\n    background: rgba($purple, 0.12);\n    color: $purple;\n  }\n  &.territory {\n    background: rgba($cyan, 0.12);\n    color: #0891b2; // cyan-600\n  }\n}\n\n.territory-tag,\n.user-tag {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $gray-500;\n\n  i { font-size: 0.625rem; }\n}\n\n.rule-last-assigned {\n  display: flex;\n  align-items: center;\n  gap: $space-1;\n  font-size: $font-size-xs;\n  color: $gray-400;\n  margin-top: 2px;\n\n  i { font-size: 0.625rem; }\n}\n\n.status-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: 2px $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  border-radius: $radius-full;\n\n  &.active {\n    background: rgba($success, 0.12);\n    color: #16a34a; // green-600\n    \n    .status-dot {\n      background: $success;\n      box-shadow: 0 0 6px rgba($success, 0.5);\n    }\n  }\n\n  &.paused {\n    background: rgba($gray-400, 0.15);\n    color: $gray-500;\n    \n    .status-dot {\n      background: $gray-400;\n    }\n  }\n}\n\n.status-dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n}\n\n.rule-actions {\n  display: flex;\n  gap: $space-1;\n  flex-shrink: 0;\n}\n\n.icon-btn {\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  border-radius: $radius-md;\n  cursor: pointer;\n  transition: all $transition-fast;\n  color: $gray-400;\n\n  i { font-size: 0.875rem; }\n\n  &.edit:hover:not(:disabled) {\n    background: rgba($primary, 0.1);\n    color: $primary;\n  }\n\n  &.delete:hover:not(:disabled) {\n    background: rgba($danger, 0.1);\n    color: $danger;\n  }\n\n  &:disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// FORM STYLES\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.rule-form {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.field-label {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-700;\n\n  i {\n    font-size: 0.75rem;\n    color: $cyan;\n  }\n\n  .required {\n    color: $danger;\n    margin-left: 2px;\n  }\n}\n\n.field-hint {\n  font-size: $font-size-xs;\n  color: $gray-400;\n  margin-top: -$space-1;\n}\n\n.premium-input {\n  width: 100%;\n  padding: $space-3 $space-4;\n  font-size: $font-size-sm;\n  color: $gray-800;\n  background: rgba(255, 255, 255, 0.8);\n  border: 1px solid rgba($gray-300, 0.5);\n  border-radius: $radius-lg;\n  transition: all $transition-normal;\n\n  &::placeholder {\n    color: $gray-400;\n  }\n\n  &:hover {\n    border-color: rgba($primary, 0.3);\n  }\n\n  &:focus {\n    outline: none;\n    border-color: $primary;\n    box-shadow: 0 0 0 3px rgba($primary, 0.1);\n  }\n}\n\n:host ::ng-deep .premium-select {\n  width: 100%;\n\n  .p-select {\n    width: 100%;\n    background: rgba(255, 255, 255, 0.8);\n    border: 1px solid rgba($gray-300, 0.5);\n    border-radius: $radius-lg;\n    transition: all $transition-normal;\n\n    &:hover {\n      border-color: rgba($primary, 0.3);\n    }\n\n    &.p-focus {\n      border-color: $primary;\n      box-shadow: 0 0 0 3px rgba($primary, 0.1);\n    }\n  }\n}\n\n.select-option {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 0;\n\n  i {\n    color: $cyan;\n    font-size: 0.875rem;\n  }\n}\n\n.user-avatar-sm {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: $primary-gradient;\n  border-radius: $radius-full;\n  font-size: $font-size-xs;\n  font-weight: 700;\n  color: white;\n  overflow: hidden;\n\n  img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n    border-radius: inherit;\n  }\n}\n\n// Toggle Field\n.toggle-field {\n  padding-top: $space-2;\n}\n\n.toggle-wrapper {\n  display: flex;\n  align-items: flex-start;\n  gap: $space-3;\n  cursor: pointer;\n}\n\n.toggle-content {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.toggle-label {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-700;\n}\n\n.toggle-hint {\n  font-size: $font-size-xs;\n  color: $gray-400;\n}\n\n// Form Actions\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: $space-3;\n  padding-top: $space-4;\n  border-top: 1px solid rgba($gray-200, 0.5);\n  margin-top: $space-2;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// BUTTONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.btn {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-3 $space-5;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  border-radius: $radius-lg;\n  border: none;\n  cursor: pointer;\n  transition: all $transition-base;\n  white-space: nowrap;\n  font-family: inherit;\n\n  i { font-size: 0.875rem; }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n.btn-primary {\n  background: $primary-gradient;\n  color: white;\n  box-shadow: 0 4px 15px rgba($primary, 0.3);\n\n  &:hover:not(:disabled) {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba($primary, 0.4);\n  }\n}\n\n.btn-secondary {\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba($gray-300, 0.5);\n  color: $gray-700;\n  box-shadow: $glass-shadow-sm;\n\n  &:hover:not(:disabled) {\n    background: white;\n    border-color: rgba($gray-400, 0.5);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);\n  }\n}\n\n.btn-ghost {\n  background: transparent;\n  color: $gray-500;\n  border: 1px solid transparent;\n\n  &:hover:not(:disabled) {\n    background: rgba($gray-100, 0.8);\n    color: $gray-700;\n    border-color: rgba($gray-200, 0.5);\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// EMPTY & LOADING STATES\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.empty-state {\n  text-align: center;\n  padding: $space-8 $space-5;\n\n  .empty-icon {\n    width: 72px;\n    height: 72px;\n    margin: 0 auto $space-4;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: linear-gradient(135deg, rgba($primary, 0.1) 0%, rgba($accent, 0.1) 100%);\n    border-radius: $radius-xl;\n\n    i {\n      font-size: 1.75rem;\n      color: $primary;\n    }\n  }\n\n  h4 {\n    margin: 0 0 $space-2;\n    font-size: $font-size-lg;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  p {\n    margin: 0 0 $space-5;\n    color: $gray-500;\n    font-size: $font-size-sm;\n    max-width: 300px;\n    margin-left: auto;\n    margin-right: auto;\n  }\n}\n\n.loading-state {\n  padding: $space-3;\n}\n\n.skeleton-row {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 0;\n  border-bottom: 1px solid rgba($gray-200, 0.3);\n\n  &:last-child {\n    border-bottom: none;\n  }\n}\n\n.skeleton-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n}\n\n.skeleton {\n  background: linear-gradient(90deg, rgba($gray-200, 0.5) 25%, rgba($gray-100, 0.5) 50%, rgba($gray-200, 0.5) 75%);\n  background-size: 200% 100%;\n  animation: shimmer 1.5s infinite;\n  border-radius: $radius-md;\n\n  &.avatar {\n    width: 42px;\n    height: 42px;\n    border-radius: $radius-lg;\n  }\n\n  &.text {\n    height: 14px;\n    width: 140px;\n  }\n\n  &.short {\n    width: 90px;\n  }\n\n  &.badge {\n    height: 22px;\n    width: 70px;\n    border-radius: $radius-full;\n  }\n}\n\n@keyframes shimmer {\n  0% { background-position: -200% 0; }\n  100% { background-position: 200% 0; }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// RESPONSIVE ADJUSTMENTS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@media (max-width: 768px) {\n  .page-container {\n    padding: $space-4;\n  }\n\n  .hero-stats {\n    gap: $space-4;\n  }\n\n  .hero-stat {\n    min-width: 70px;\n  }\n\n  // Keep primary actions reachable without horizontal scrolling.\n  .hero-actions {\n    flex-direction: column;\n    align-items: stretch;\n\n    .btn {\n      width: 100%;\n      justify-content: center;\n    }\n  }\n\n  .form-card {\n    padding: $space-4;\n  }\n\n  .form-card.editor-card {\n    position: static;\n  }\n\n  .rule-item {\n    flex-wrap: wrap;\n    gap: $space-2;\n  }\n\n  .rule-content {\n    width: calc(100% - 54px);\n  }\n\n  .rule-actions {\n    width: 100%;\n    justify-content: flex-end;\n    padding-top: $space-2;\n    border-top: 1px solid rgba($gray-200, 0.3);\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LeadAssignmentPage, { className: "LeadAssignmentPage", filePath: "src/app/crm/features/settings/pages/lead-assignment.page.ts", lineNumber: 43 }); })();
