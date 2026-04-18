import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { EmailDataService } from '../services/email-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { AppToastService } from '../../../../core/app-toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/button";
import * as i3 from "primeng/api";
import * as i4 from "primeng/inputtext";
import * as i5 from "primeng/table";
import * as i6 from "primeng/tag";
import * as i7 from "primeng/skeleton";
import * as i8 from "primeng/tooltip";
import * as i9 from "primeng/dialog";
import * as i10 from "primeng/textarea";
const _c0 = () => ({ width: "600px" });
const _c1 = () => [1, 2, 3, 4, 5];
function EmailTemplatesPage_div_50_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵelement(1, "p-skeleton", 49)(2, "p-skeleton", 50)(3, "p-skeleton", 51)(4, "p-skeleton", 52);
    i0.ɵɵelementEnd();
} }
function EmailTemplatesPage_div_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46);
    i0.ɵɵtemplate(1, EmailTemplatesPage_div_50_div_1_Template, 5, 0, "div", 47);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", i0.ɵɵpureFunction0(1, _c1));
} }
function EmailTemplatesPage_p_table_51_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Subject");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Variables");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Usage");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Updated");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 57);
    i0.ɵɵtext(12, "Actions");
    i0.ɵɵelementEnd()();
} }
function EmailTemplatesPage_p_table_51_ng_template_2_p_tag_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 73);
} if (rf & 2) {
    i0.ɵɵproperty("rounded", true);
} }
function EmailTemplatesPage_p_table_51_ng_template_2_span_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 74);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const v_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(v_r2);
} }
function EmailTemplatesPage_p_table_51_ng_template_2_span_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 75);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const template_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("+", template_r3.variables.length - 3);
} }
function EmailTemplatesPage_p_table_51_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr", 58)(1, "td")(2, "div", 59)(3, "span", 60);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, EmailTemplatesPage_p_table_51_ng_template_2_p_tag_5_Template, 1, 1, "p-tag", 61);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "td")(7, "span", 62);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td")(10, "div", 63);
    i0.ɵɵtemplate(11, EmailTemplatesPage_p_table_51_ng_template_2_span_11_Template, 2, 1, "span", 64)(12, EmailTemplatesPage_p_table_51_ng_template_2_span_12_Template, 2, 1, "span", 65);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "td")(14, "span", 66);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "td")(17, "span", 67);
    i0.ɵɵtext(18);
    i0.ɵɵpipe(19, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "td")(21, "div", 68)(22, "button", 69);
    i0.ɵɵlistener("click", function EmailTemplatesPage_p_table_51_ng_template_2_Template_button_click_22_listener() { const template_r3 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.openEditDialog(template_r3)); });
    i0.ɵɵelement(23, "i", 70);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "button", 71);
    i0.ɵɵlistener("click", function EmailTemplatesPage_p_table_51_ng_template_2_Template_button_click_24_listener() { const template_r3 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.deleteTemplate(template_r3)); });
    i0.ɵɵelement(25, "i", 72);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const template_r3 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(template_r3.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", template_r3.isSystem);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("pTooltip", template_r3.subject);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", template_r3.subject, " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", template_r3.variables == null ? null : template_r3.variables.slice(0, 3));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (template_r3.variables == null ? null : template_r3.variables.length) > 3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", template_r3.usageCount ?? 0, " emails");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(19, 10, template_r3.updatedAtUtc, "mediumDate"));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", template_r3.isSystem);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", template_r3.isSystem);
} }
function EmailTemplatesPage_p_table_51_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td", 76)(2, "div", 77);
    i0.ɵɵelement(3, "i", 22);
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5, "No templates found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7, "Create your first email template to get started");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 78);
    i0.ɵɵlistener("click", function EmailTemplatesPage_p_table_51_ng_template_3_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.openCreateDialog()); });
    i0.ɵɵelement(9, "i", 16);
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11, "New Template");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("disabled", !ctx_r3.canManage());
} }
function EmailTemplatesPage_p_table_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p-table", 53);
    i0.ɵɵtemplate(1, EmailTemplatesPage_p_table_51_ng_template_1_Template, 13, 0, "ng-template", 54)(2, EmailTemplatesPage_p_table_51_ng_template_2_Template, 26, 13, "ng-template", 55)(3, EmailTemplatesPage_p_table_51_ng_template_3_Template, 12, 1, "ng-template", 56);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", ctx_r3.templates());
} }
function EmailTemplatesPage_ng_template_76_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 79)(1, "button", 80);
    i0.ɵɵlistener("click", function EmailTemplatesPage_ng_template_76_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r6); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.showCreateDialog = false); });
    i0.ɵɵtext(2, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 81);
    i0.ɵɵlistener("click", function EmailTemplatesPage_ng_template_76_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r6); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.createTemplate()); });
    i0.ɵɵelement(4, "i", 82);
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6, "Create Template");
    i0.ɵɵelementEnd()()();
} }
function EmailTemplatesPage_ng_template_101_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 79)(1, "button", 80);
    i0.ɵɵlistener("click", function EmailTemplatesPage_ng_template_101_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r7); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.showEditDialog = false); });
    i0.ɵɵtext(2, " Cancel ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 81);
    i0.ɵɵlistener("click", function EmailTemplatesPage_ng_template_101_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r7); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.updateTemplate()); });
    i0.ɵɵelement(4, "i", 82);
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6, "Save Changes");
    i0.ɵɵelementEnd()()();
} }
export class EmailTemplatesPage {
    emailService = inject(EmailDataService);
    toastService = inject(AppToastService);
    router = inject(Router);
    templates = signal([], ...(ngDevMode ? [{ debugName: "templates" }] : []));
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    showCreateDialog = false;
    showEditDialog = false;
    editingTemplate = null;
    newTemplate = {
        name: '',
        subject: '',
        bodyHtml: '',
        variables: ''
    };
    canManage = computed(() => {
        const context = readTokenContext();
        return tokenHasPermission(context?.payload ?? null, PERMISSION_KEYS.emailsManage);
    }, ...(ngDevMode ? [{ debugName: "canManage" }] : []));
    ngOnInit() {
        this.loadTemplates();
    }
    loadTemplates() {
        this.loading.set(true);
        this.emailService.searchTemplates({}).subscribe({
            next: (response) => {
                this.templates.set(response.items);
                this.loading.set(false);
            },
            error: () => {
                this.toastService.show('error', 'Failed to load templates');
                this.loading.set(false);
            }
        });
    }
    openCreateDialog() {
        this.newTemplate = { name: '', subject: '', bodyHtml: '', variables: '' };
        this.showCreateDialog = true;
    }
    openEditDialog(template) {
        this.editingTemplate = template;
        // Load full template details
        this.emailService.getTemplate(template.id).subscribe({
            next: (detail) => {
                this.newTemplate = {
                    name: detail.name,
                    subject: detail.subject,
                    bodyHtml: detail.htmlBody,
                    variables: detail.variables ?? ''
                };
                this.showEditDialog = true;
            },
            error: () => {
                this.toastService.show('error', 'Failed to load template details');
            }
        });
    }
    createTemplate() {
        if (!this.newTemplate.name || !this.newTemplate.subject) {
            this.toastService.show('error', 'Name and subject are required');
            return;
        }
        this.emailService.createTemplate({
            name: this.newTemplate.name,
            subject: this.newTemplate.subject,
            htmlBody: this.newTemplate.bodyHtml,
            variables: this.newTemplate.variables || undefined
        }).subscribe({
            next: () => {
                this.showCreateDialog = false;
                this.loadTemplates();
                this.toastService.show('success', 'Template created successfully');
            },
            error: () => {
                this.toastService.show('error', 'Failed to create template');
            }
        });
    }
    updateTemplate() {
        if (!this.editingTemplate)
            return;
        if (!this.newTemplate.name || !this.newTemplate.subject) {
            this.toastService.show('error', 'Name and subject are required');
            return;
        }
        this.emailService.updateTemplate(this.editingTemplate.id, {
            name: this.newTemplate.name,
            subject: this.newTemplate.subject,
            htmlBody: this.newTemplate.bodyHtml,
            variables: this.newTemplate.variables || undefined
        }).subscribe({
            next: () => {
                this.showEditDialog = false;
                this.editingTemplate = null;
                this.loadTemplates();
                this.toastService.show('success', 'Template updated successfully');
            },
            error: () => {
                this.toastService.show('error', 'Failed to update template');
            }
        });
    }
    deleteTemplate(template) {
        if (!confirm(`Delete template "${template.name}"?`))
            return;
        this.emailService.deleteTemplate(template.id).subscribe({
            next: () => {
                this.loadTemplates();
                this.toastService.show('success', 'Template deleted');
            },
            error: () => {
                this.toastService.show('error', 'Failed to delete template');
            }
        });
    }
    static ɵfac = function EmailTemplatesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmailTemplatesPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmailTemplatesPage, selectors: [["app-email-templates-page"]], decls: 102, vars: 29, consts: [[1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-actions"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click", "disabled"], [1, "action-btn__icon"], [1, "pi", "pi-plus"], ["type", "button", "routerLink", "/app/emails", 1, "action-btn", "action-btn--back"], [1, "pi", "pi-arrow-left"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-file-edit"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend"], [1, "pi", "pi-file"], [1, "card-glow"], [1, "data-section"], [1, "data-card"], [1, "data-header"], [1, "record-count"], ["class", "skeleton-rows", 4, "ngIf"], ["styleClass", "data-table", 3, "value", 4, "ngIf"], ["header", "Create Email Template", "styleClass", "template-dialog", 3, "visibleChange", "visible", "modal", "draggable", "resizable"], [1, "dialog-form"], [1, "form-field"], [1, "required"], ["pInputText", "", "placeholder", "e.g., Welcome Email", 3, "ngModelChange", "ngModel"], ["pInputText", "", "placeholder", "e.g., Welcome to Your Company", 3, "ngModelChange", "ngModel"], ["pInputText", "", "placeholder", "e.g., firstName, companyName, link", 3, "ngModelChange", "ngModel"], [1, "hint"], ["pInputTextarea", "", "placeholder", "<p>Hello {firstName},</p>...", 3, "ngModelChange", "ngModel", "rows"], ["pTemplate", "footer"], ["header", "Edit Email Template", "styleClass", "template-dialog", 3, "visibleChange", "visible", "modal", "draggable", "resizable"], [1, "skeleton-rows"], ["class", "skeleton-row", 4, "ngFor", "ngForOf"], [1, "skeleton-row"], ["width", "200px", "height", "20px"], ["width", "300px", "height", "20px"], ["width", "150px", "height", "20px"], ["width", "80px", "height", "24px", "borderRadius", "12px"], ["styleClass", "data-table", 3, "value"], ["pTemplate", "header"], ["pTemplate", "body"], ["pTemplate", "emptymessage"], [2, "width", "120px"], [1, "table-row"], [1, "template-info"], [1, "template-name"], ["value", "System", "severity", "info", 3, "rounded", 4, "ngIf"], ["tooltipPosition", "top", 1, "template-subject", 3, "pTooltip"], [1, "template-variables"], ["class", "variable-tag", 4, "ngFor", "ngForOf"], ["class", "variable-more", 4, "ngIf"], [1, "usage-count"], [1, "template-date"], [1, "row-actions"], ["type", "button", "title", "Edit", 1, "row-action-btn", "row-action-btn--edit", 3, "click", "disabled"], [1, "pi", "pi-pencil"], ["type", "button", "title", "Delete", 1, "row-action-btn", "row-action-btn--delete", 3, "click", "disabled"], [1, "pi", "pi-trash"], ["value", "System", "severity", "info", 3, "rounded"], [1, "variable-tag"], [1, "variable-more"], ["colspan", "6"], [1, "empty-state"], ["pButton", "", "type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [1, "dialog-actions"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", 3, "click"], ["pButton", "", "type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "pi", "pi-check"]], template: function EmailTemplatesPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵelement(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 5)(7, "div", 6)(8, "div", 7);
            i0.ɵɵelement(9, "span", 8);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Template Management");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 9)(13, "span", 10);
            i0.ɵɵtext(14, "Email");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 11);
            i0.ɵɵtext(16, "Templates");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 12);
            i0.ɵɵtext(18, " Create and manage reusable email templates with dynamic variables ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 13)(20, "button", 14);
            i0.ɵɵlistener("click", function EmailTemplatesPage_Template_button_click_20_listener() { return ctx.openCreateDialog(); });
            i0.ɵɵelementStart(21, "span", 15);
            i0.ɵɵelement(22, "i", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "span");
            i0.ɵɵtext(24, "New Template");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "button", 17)(26, "span", 15);
            i0.ɵɵelement(27, "i", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "span");
            i0.ɵɵtext(29, "Back to Emails");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(30, "div", 19)(31, "div", 20)(32, "div", 21);
            i0.ɵɵelement(33, "i", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "div", 23)(35, "span", 24);
            i0.ɵɵtext(36, "Templates");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "strong", 25);
            i0.ɵɵtext(38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(39, "span", 26);
            i0.ɵɵelement(40, "i", 27);
            i0.ɵɵtext(41, " Available ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(42, "div", 28);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(43, "section", 29)(44, "div", 30)(45, "div", 31)(46, "h2");
            i0.ɵɵtext(47, "Email Templates");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "span", 32);
            i0.ɵɵtext(49);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(50, EmailTemplatesPage_div_50_Template, 2, 2, "div", 33)(51, EmailTemplatesPage_p_table_51_Template, 4, 1, "p-table", 34);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(52, "p-dialog", 35);
            i0.ɵɵtwoWayListener("visibleChange", function EmailTemplatesPage_Template_p_dialog_visibleChange_52_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.showCreateDialog, $event) || (ctx.showCreateDialog = $event); return $event; });
            i0.ɵɵelementStart(53, "div", 36)(54, "div", 37)(55, "label");
            i0.ɵɵtext(56, "Template Name ");
            i0.ɵɵelementStart(57, "span", 38);
            i0.ɵɵtext(58, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(59, "input", 39);
            i0.ɵɵtwoWayListener("ngModelChange", function EmailTemplatesPage_Template_input_ngModelChange_59_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.newTemplate.name, $event) || (ctx.newTemplate.name = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(60, "div", 37)(61, "label");
            i0.ɵɵtext(62, "Subject Line ");
            i0.ɵɵelementStart(63, "span", 38);
            i0.ɵɵtext(64, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(65, "input", 40);
            i0.ɵɵtwoWayListener("ngModelChange", function EmailTemplatesPage_Template_input_ngModelChange_65_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.newTemplate.subject, $event) || (ctx.newTemplate.subject = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(66, "div", 37)(67, "label");
            i0.ɵɵtext(68, "Variables (comma-separated)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(69, "input", 41);
            i0.ɵɵtwoWayListener("ngModelChange", function EmailTemplatesPage_Template_input_ngModelChange_69_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.newTemplate.variables, $event) || (ctx.newTemplate.variables = $event); return $event; });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "small", 42);
            i0.ɵɵdisableBindings();
            i0.ɵɵtext(71, "Use {{variableName}} in subject and body to insert dynamic values");
            i0.ɵɵenableBindings();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(72, "div", 37)(73, "label");
            i0.ɵɵtext(74, "Email Body (HTML)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "textarea", 43);
            i0.ɵɵtwoWayListener("ngModelChange", function EmailTemplatesPage_Template_textarea_ngModelChange_75_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.newTemplate.bodyHtml, $event) || (ctx.newTemplate.bodyHtml = $event); return $event; });
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(76, EmailTemplatesPage_ng_template_76_Template, 7, 0, "ng-template", 44);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "p-dialog", 45);
            i0.ɵɵtwoWayListener("visibleChange", function EmailTemplatesPage_Template_p_dialog_visibleChange_77_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.showEditDialog, $event) || (ctx.showEditDialog = $event); return $event; });
            i0.ɵɵelementStart(78, "div", 36)(79, "div", 37)(80, "label");
            i0.ɵɵtext(81, "Template Name ");
            i0.ɵɵelementStart(82, "span", 38);
            i0.ɵɵtext(83, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(84, "input", 39);
            i0.ɵɵtwoWayListener("ngModelChange", function EmailTemplatesPage_Template_input_ngModelChange_84_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.newTemplate.name, $event) || (ctx.newTemplate.name = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(85, "div", 37)(86, "label");
            i0.ɵɵtext(87, "Subject Line ");
            i0.ɵɵelementStart(88, "span", 38);
            i0.ɵɵtext(89, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(90, "input", 40);
            i0.ɵɵtwoWayListener("ngModelChange", function EmailTemplatesPage_Template_input_ngModelChange_90_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.newTemplate.subject, $event) || (ctx.newTemplate.subject = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(91, "div", 37)(92, "label");
            i0.ɵɵtext(93, "Variables (comma-separated)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "input", 41);
            i0.ɵɵtwoWayListener("ngModelChange", function EmailTemplatesPage_Template_input_ngModelChange_94_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.newTemplate.variables, $event) || (ctx.newTemplate.variables = $event); return $event; });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(95, "small", 42);
            i0.ɵɵdisableBindings();
            i0.ɵɵtext(96, "Use {{variableName}} in subject and body to insert dynamic values");
            i0.ɵɵenableBindings();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(97, "div", 37)(98, "label");
            i0.ɵɵtext(99, "Email Body (HTML)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(100, "textarea", 43);
            i0.ɵɵtwoWayListener("ngModelChange", function EmailTemplatesPage_Template_textarea_ngModelChange_100_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.newTemplate.bodyHtml, $event) || (ctx.newTemplate.bodyHtml = $event); return $event; });
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(101, EmailTemplatesPage_ng_template_101_Template, 7, 0, "ng-template", 44);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(20);
            i0.ɵɵproperty("disabled", !ctx.canManage());
            i0.ɵɵadvance(18);
            i0.ɵɵtextInterpolate(ctx.templates().length);
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1("", ctx.templates().length, " templates");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(27, _c0));
            i0.ɵɵtwoWayProperty("visible", ctx.showCreateDialog);
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTemplate.name);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTemplate.subject);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTemplate.variables);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTemplate.bodyHtml);
            i0.ɵɵproperty("rows", 10);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(28, _c0));
            i0.ɵɵtwoWayProperty("visible", ctx.showEditDialog);
            i0.ɵɵproperty("modal", true)("draggable", false)("resizable", false);
            i0.ɵɵadvance(7);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTemplate.name);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTemplate.subject);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTemplate.variables);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.newTemplate.bodyHtml);
            i0.ɵɵproperty("rows", 10);
        } }, dependencies: [NgIf,
            NgFor,
            FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, RouterLink,
            ButtonModule, i2.ButtonDirective, i3.PrimeTemplate, InputTextModule, i4.InputText, TableModule, i5.Table, TagModule, i6.Tag, SkeletonModule, i7.Skeleton, TooltipModule, i8.Tooltip, DialogModule, i9.Dialog, TextareaModule, i10.Textarea, BreadcrumbsComponent,
            DatePipe], styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   EMAIL[_ngcontent-%COMP%]   TEMPLATES[_ngcontent-%COMP%]   PAGE\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ANIMATED[_ngcontent-%COMP%]   BACKGROUND\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 600px;\n    height: 600px;\n    background: $primary-gradient;\n    top: -200px;\n    right: -100px;\n  }\n\n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    bottom: 10%;\n    left: -100px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 300px;\n    height: 300px;\n    background: $secondary-gradient;\n    top: 40%;\n    right: 20%;\n    animation-delay: -14s;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(50px, -30px) scale(1.1); }\n  50% { transform: translate(100px, 20px) scale(0.9); }\n  75% { transform: translate(30px, 50px) scale(1.05); }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   HERO[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: _ngcontent-%COMP%_pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-1;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: _ngcontent-%COMP%_gradient-shift 4s ease-in-out infinite;\n  }\n\n  .title-light {\n    -webkit-text-fill-color: $gray-700;\n    margin-left: $space-2;\n  }\n}\n\n.hero-description[_ngcontent-%COMP%] {\n  font-size: $font-size-base;\n  color: $gray-500;\n  font-weight: 400;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  margin-top: $space-3;\n  flex-wrap: wrap;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   VISUAL[_ngcontent-%COMP%]   CARDS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: _ngcontent-%COMP%_slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  .card-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n  }\n\n  &--primary .card-icon { background: $primary-gradient; color: white; }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DATA[_ngcontent-%COMP%]   SECTION\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.data-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out 0.4s both;\n}\n\n.data-card[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.data-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  h2 {\n    margin: 0;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .record-count {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n.skeleton-rows[_ngcontent-%COMP%] {\n  padding: $space-4;\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.skeleton-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-4;\n}\n\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  border-radius: 16px;\n  overflow: hidden;\n\n  ::ng-deep .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n  }\n\n  ::ng-deep .p-datatable-tbody > tr > td {\n    vertical-align: middle;\n    padding: $space-3 $space-2;\n  }\n\n  .table-row {\n    transition: background 150ms;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n    &:last-child { border-bottom: none; }\n\n    &:hover {\n      background: rgba($primary, 0.03);\n    }\n  }\n}\n\n.template-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n\n  .template-name {\n    font-weight: 600;\n    font-size: $font-size-base;\n    color: $gray-800;\n  }\n}\n\n.template-subject[_ngcontent-%COMP%] {\n  font-size: $font-size-base;\n  color: $gray-700;\n  max-width: 300px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.template-variables[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-1;\n  flex-wrap: wrap;\n}\n\n.variable-tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px $space-2;\n  background: rgba($cyan, 0.15);\n  color: color.adjust($cyan, $lightness: -15%);\n  font-size: $font-size-xs;\n  font-weight: 500;\n  border-radius: $radius-sm;\n}\n\n.variable-more[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 2px $space-2;\n  background: $gray-100;\n  color: $gray-500;\n  font-size: $font-size-xs;\n  font-weight: 500;\n  border-radius: $radius-sm;\n}\n\n.usage-count[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-500;\n}\n\n.template-date[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $gray-500;\n}\n\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-1;\n}\n\n.icon-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-sm;\n  color: $gray-400;\n  cursor: pointer;\n  font-size: $font-size-sm;\n  transition: all 150ms;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.06);\n    color: $gray-700;\n  }\n\n  &--danger:hover {\n    background: rgba($danger, 0.1);\n    color: $danger;\n  }\n\n  &:disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n  }\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: $space-10 $space-4;\n  text-align: center;\n\n  i {\n    font-size: 4rem;\n    color: $gray-300;\n    margin-bottom: $space-4;\n  }\n\n  h3 {\n    margin: 0 0 $space-2;\n    font-size: $font-size-xl;\n    font-weight: 600;\n    color: $gray-700;\n  }\n\n  p {\n    margin: 0 0 $space-4;\n    font-size: $font-size-base;\n    color: $gray-500;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   DIALOG[_ngcontent-%COMP%]   STYLES\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.dialog-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n\n  label {\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: $gray-700;\n\n    .required {\n      color: $danger;\n    }\n  }\n\n  input, textarea {\n    width: 100%;\n  }\n\n  .hint {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n.dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: $space-3;\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   BUTTONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.btn[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  border: none;\n  border-radius: $radius-md;\n  font-size: $font-size-base;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 250ms;\n  overflow: hidden;\n\n  i { font-size: $font-size-base; }\n}\n\n.btn-primary[_ngcontent-%COMP%] {\n  background: $primary-gradient;\n  color: white;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n  }\n\n  &:active { transform: translateY(0); }\n  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }\n}\n\n.btn-glow[_ngcontent-%COMP%]::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);\n  animation: _ngcontent-%COMP%_shimmer 3s infinite;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  color: $gray-700;\n  box-shadow: $glass-shadow;\n\n  &:hover {\n    background: white;\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n}\n\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: $gray-600;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.05);\n    color: $gray-800;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n//[_ngcontent-%COMP%]   ANIMATIONS\n//[_ngcontent-%COMP%]   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes[_ngcontent-%COMP%]   fade-in-up[_ngcontent-%COMP%] {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes _ngcontent-%COMP%_slide-in-right {\n  from { opacity: 0; transform: translateX(20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n@keyframes _ngcontent-%COMP%_gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes _ngcontent-%COMP%_pulse-glow {\n  0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }\n  50% { opacity: 0.8; box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); }\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(100%); }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmailTemplatesPage, [{
        type: Component,
        args: [{ selector: 'app-email-templates-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    DatePipe,
                    FormsModule,
                    RouterLink,
                    ButtonModule,
                    InputTextModule,
                    TableModule,
                    TagModule,
                    SkeletonModule,
                    TooltipModule,
                    DialogModule,
                    TextareaModule,
                    BreadcrumbsComponent
                ], template: "<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     EMAIL TEMPLATES PAGE\n     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n<div class=\"page-container\">\n  <!-- Animated Background Orbs -->\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <!-- PrimeNG Breadcrumb -->\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       HERO SECTION\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Template Management</span>\n      </div>\n      \n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Email</span>\n        <span class=\"title-light\">Templates</span>\n      </h1>\n      \n      <p class=\"hero-description\">\n        Create and manage reusable email templates with dynamic variables\n      </p>\n\n      <div class=\"hero-actions\">\n        <button type=\"button\" class=\"action-btn action-btn--add\" [disabled]=\"!canManage()\" (click)=\"openCreateDialog()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span>\n          <span>New Template</span>\n        </button>\n        <button type=\"button\" class=\"action-btn action-btn--back\" routerLink=\"/app/emails\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-arrow-left\"></i></span>\n          <span>Back to Emails</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-file-edit\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Templates</span>\n          <strong class=\"card-value\">{{ templates().length }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-file\"></i> Available\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       DATA TABLE\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"data-section\">\n    <div class=\"data-card\">\n      <div class=\"data-header\">\n        <h2>Email Templates</h2>\n        <span class=\"record-count\">{{ templates().length }} templates</span>\n      </div>\n\n      <!-- Loading State -->\n      <div class=\"skeleton-rows\" *ngIf=\"loading()\">\n        <div class=\"skeleton-row\" *ngFor=\"let _ of [1,2,3,4,5]\">\n          <p-skeleton width=\"200px\" height=\"20px\"></p-skeleton>\n          <p-skeleton width=\"300px\" height=\"20px\"></p-skeleton>\n          <p-skeleton width=\"150px\" height=\"20px\"></p-skeleton>\n          <p-skeleton width=\"80px\" height=\"24px\" borderRadius=\"12px\"></p-skeleton>\n        </div>\n      </div>\n\n      <!-- Data Table -->\n      <p-table \n        [value]=\"templates()\" \n        styleClass=\"data-table\"\n        *ngIf=\"!loading()\"\n      >\n        <ng-template pTemplate=\"header\">\n          <tr>\n            <th>Name</th>\n            <th>Subject</th>\n            <th>Variables</th>\n            <th>Usage</th>\n            <th>Updated</th>\n            <th style=\"width: 120px\">Actions</th>\n          </tr>\n        </ng-template>\n        <ng-template pTemplate=\"body\" let-template>\n          <tr class=\"table-row\">\n            <td>\n              <div class=\"template-info\">\n                <span class=\"template-name\">{{ template.name }}</span>\n                <p-tag *ngIf=\"template.isSystem\" value=\"System\" severity=\"info\" [rounded]=\"true\"></p-tag>\n              </div>\n            </td>\n            <td>\n              <span class=\"template-subject\" [pTooltip]=\"template.subject\" tooltipPosition=\"top\">\n                {{ template.subject }}\n              </span>\n            </td>\n            <td>\n              <div class=\"template-variables\">\n                <span class=\"variable-tag\" *ngFor=\"let v of template.variables?.slice(0, 3)\">{{ v }}</span>\n                <span class=\"variable-more\" *ngIf=\"template.variables?.length > 3\">+{{ template.variables.length - 3 }}</span>\n              </div>\n            </td>\n            <td>\n              <span class=\"usage-count\">{{ template.usageCount ?? 0 }} emails</span>\n            </td>\n            <td>\n              <span class=\"template-date\">{{ template.updatedAtUtc | date:'mediumDate' }}</span>\n            </td>\n            <td>\n              <div class=\"row-actions\">\n                <button type=\"button\" class=\"row-action-btn row-action-btn--edit\" title=\"Edit\" (click)=\"openEditDialog(template)\" [disabled]=\"template.isSystem\">\n                  <i class=\"pi pi-pencil\"></i>\n                </button>\n                <button type=\"button\" class=\"row-action-btn row-action-btn--delete\" title=\"Delete\" (click)=\"deleteTemplate(template)\" [disabled]=\"template.isSystem\">\n                  <i class=\"pi pi-trash\"></i>\n                </button>\n              </div>\n            </td>\n          </tr>\n        </ng-template>\n        <ng-template pTemplate=\"emptymessage\">\n          <tr>\n            <td colspan=\"6\">\n              <div class=\"empty-state\">\n                <i class=\"pi pi-file-edit\"></i>\n                <h3>No templates found</h3>\n                <p>Create your first email template to get started</p>\n                <button pButton type=\"button\" class=\"btn btn-primary\" (click)=\"openCreateDialog()\" [disabled]=\"!canManage()\">\n                  <i class=\"pi pi-plus\"></i>\n                  <span>New Template</span>\n                </button>\n              </div>\n            </td>\n          </tr>\n        </ng-template>\n      </p-table>\n    </div>\n  </section>\n</div>\n\n<!-- Create Template Dialog -->\n<p-dialog \n  [(visible)]=\"showCreateDialog\" \n  header=\"Create Email Template\" \n  [modal]=\"true\" \n  [style]=\"{width: '600px'}\"\n  [draggable]=\"false\"\n  [resizable]=\"false\"\n  styleClass=\"template-dialog\"\n>\n  <div class=\"dialog-form\">\n    <div class=\"form-field\">\n      <label>Template Name <span class=\"required\">*</span></label>\n      <input pInputText [(ngModel)]=\"newTemplate.name\" placeholder=\"e.g., Welcome Email\" />\n    </div>\n    <div class=\"form-field\">\n      <label>Subject Line <span class=\"required\">*</span></label>\n      <input pInputText [(ngModel)]=\"newTemplate.subject\" placeholder=\"e.g., Welcome to Your Company\" />\n    </div>\n    <div class=\"form-field\">\n      <label>Variables (comma-separated)</label>\n      <input pInputText [(ngModel)]=\"newTemplate.variables\" placeholder=\"e.g., firstName, companyName, link\" />\n      <small class=\"hint\" ngNonBindable>Use {{variableName}} in subject and body to insert dynamic values</small>\n    </div>\n    <div class=\"form-field\">\n      <label>Email Body (HTML)</label>\n      <textarea pInputTextarea [(ngModel)]=\"newTemplate.bodyHtml\" [rows]=\"10\" placeholder=\"<p>Hello {firstName},</p>...\"></textarea>\n    </div>\n  </div>\n  <ng-template pTemplate=\"footer\">\n    <div class=\"dialog-actions\">\n      <button pButton type=\"button\" class=\"btn btn-ghost\" (click)=\"showCreateDialog = false\">\n        Cancel\n      </button>\n      <button pButton type=\"button\" class=\"btn btn-primary\" (click)=\"createTemplate()\">\n        <i class=\"pi pi-check\"></i>\n        <span>Create Template</span>\n      </button>\n    </div>\n  </ng-template>\n</p-dialog>\n\n<!-- Edit Template Dialog -->\n<p-dialog \n  [(visible)]=\"showEditDialog\" \n  header=\"Edit Email Template\" \n  [modal]=\"true\" \n  [style]=\"{width: '600px'}\"\n  [draggable]=\"false\"\n  [resizable]=\"false\"\n  styleClass=\"template-dialog\"\n>\n  <div class=\"dialog-form\">\n    <div class=\"form-field\">\n      <label>Template Name <span class=\"required\">*</span></label>\n      <input pInputText [(ngModel)]=\"newTemplate.name\" placeholder=\"e.g., Welcome Email\" />\n    </div>\n    <div class=\"form-field\">\n      <label>Subject Line <span class=\"required\">*</span></label>\n      <input pInputText [(ngModel)]=\"newTemplate.subject\" placeholder=\"e.g., Welcome to Your Company\" />\n    </div>\n    <div class=\"form-field\">\n      <label>Variables (comma-separated)</label>\n      <input pInputText [(ngModel)]=\"newTemplate.variables\" placeholder=\"e.g., firstName, companyName, link\" />\n      <small class=\"hint\" ngNonBindable>Use {{variableName}} in subject and body to insert dynamic values</small>\n    </div>\n    <div class=\"form-field\">\n      <label>Email Body (HTML)</label>\n      <textarea pInputTextarea [(ngModel)]=\"newTemplate.bodyHtml\" [rows]=\"10\" placeholder=\"<p>Hello {firstName},</p>...\"></textarea>\n    </div>\n  </div>\n  <ng-template pTemplate=\"footer\">\n    <div class=\"dialog-actions\">\n      <button pButton type=\"button\" class=\"btn btn-ghost\" (click)=\"showEditDialog = false\">\n        Cancel\n      </button>\n      <button pButton type=\"button\" class=\"btn btn-primary\" (click)=\"updateTemplate()\">\n        <i class=\"pi pi-check\"></i>\n        <span>Save Changes</span>\n      </button>\n    </div>\n  </ng-template>\n</p-dialog>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// EMAIL TEMPLATES PAGE\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.page-container {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-5 $space-6;\n  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 50%, #d8dde8 100%);\n  overflow-x: hidden;\n\n  @media (max-width: 768px) {\n    padding: $space-3;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ANIMATED BACKGROUND\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 0;\n  overflow: hidden;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(60px);\n  opacity: 0.4;\n  animation: orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 600px;\n    height: 600px;\n    background: $primary-gradient;\n    top: -200px;\n    right: -100px;\n  }\n\n  &.orb-2 {\n    width: 400px;\n    height: 400px;\n    background: $cyan-gradient;\n    bottom: 10%;\n    left: -100px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 300px;\n    height: 300px;\n    background: $secondary-gradient;\n    top: 40%;\n    right: 20%;\n    animation-delay: -14s;\n  }\n}\n\n@keyframes orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(50px, -30px) scale(1.1); }\n  50% { transform: translate(100px, 20px) scale(0.9); }\n  75% { transform: translate(30px, 50px) scale(1.05); }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// HERO SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-section {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-5;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 1200px) {\n    grid-template-columns: 1fr;\n    gap: $space-4;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-title {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0 0 $space-1;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: gradient-shift 4s ease-in-out infinite;\n  }\n\n  .title-light {\n    -webkit-text-fill-color: $gray-700;\n    margin-left: $space-2;\n  }\n}\n\n.hero-description {\n  font-size: $font-size-base;\n  color: $gray-500;\n  font-weight: 400;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.hero-actions {\n  display: flex;\n  gap: $space-3;\n  margin-top: $space-3;\n  flex-wrap: wrap;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// VISUAL CARDS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-3 $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n\n  .card-icon {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n  }\n\n  &--primary .card-icon { background: $primary-gradient; color: white; }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DATA SECTION\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.data-section {\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.5s ease-out 0.4s both;\n}\n\n.data-card {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n}\n\n.data-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  h2 {\n    margin: 0;\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .record-count {\n    font-size: $font-size-sm;\n    color: $gray-500;\n  }\n}\n\n.skeleton-rows {\n  padding: $space-4;\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.skeleton-row {\n  display: flex;\n  align-items: center;\n  gap: $space-4;\n}\n\n.data-table {\n  width: 100%;\n  border-collapse: collapse;\n  border-radius: 16px;\n  overflow: hidden;\n\n  ::ng-deep .p-datatable-thead > tr > th {\n    background: linear-gradient(180deg, #f0f7ff 0%, #e6f0fa 100%);\n    border: none;\n    border-bottom: 2px solid rgba(59, 130, 246, 0.2);\n    padding: $space-3 $space-4;\n    font-size: 0.72rem;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #3b82f6;\n  }\n\n  ::ng-deep .p-datatable-tbody > tr > td {\n    vertical-align: middle;\n    padding: $space-3 $space-2;\n  }\n\n  .table-row {\n    transition: background 150ms;\n    border-bottom: 1px solid rgba(0, 0, 0, 0.04);\n\n    &:last-child { border-bottom: none; }\n\n    &:hover {\n      background: rgba($primary, 0.03);\n    }\n  }\n}\n\n.template-info {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n\n  .template-name {\n    font-weight: 600;\n    font-size: $font-size-base;\n    color: $gray-800;\n  }\n}\n\n.template-subject {\n  font-size: $font-size-base;\n  color: $gray-700;\n  max-width: 300px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.template-variables {\n  display: flex;\n  gap: $space-1;\n  flex-wrap: wrap;\n}\n\n.variable-tag {\n  display: inline-block;\n  padding: 2px $space-2;\n  background: rgba($cyan, 0.15);\n  color: color.adjust($cyan, $lightness: -15%);\n  font-size: $font-size-xs;\n  font-weight: 500;\n  border-radius: $radius-sm;\n}\n\n.variable-more {\n  display: inline-block;\n  padding: 2px $space-2;\n  background: $gray-100;\n  color: $gray-500;\n  font-size: $font-size-xs;\n  font-weight: 500;\n  border-radius: $radius-sm;\n}\n\n.usage-count {\n  font-size: $font-size-sm;\n  color: $gray-500;\n}\n\n.template-date {\n  font-size: $font-size-sm;\n  color: $gray-500;\n}\n\n.action-buttons {\n  display: flex;\n  gap: $space-1;\n}\n\n.icon-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n  background: transparent;\n  border: none;\n  border-radius: $radius-sm;\n  color: $gray-400;\n  cursor: pointer;\n  font-size: $font-size-sm;\n  transition: all 150ms;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.06);\n    color: $gray-700;\n  }\n\n  &--danger:hover {\n    background: rgba($danger, 0.1);\n    color: $danger;\n  }\n\n  &:disabled {\n    opacity: 0.4;\n    cursor: not-allowed;\n  }\n}\n\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: $space-10 $space-4;\n  text-align: center;\n\n  i {\n    font-size: 4rem;\n    color: $gray-300;\n    margin-bottom: $space-4;\n  }\n\n  h3 {\n    margin: 0 0 $space-2;\n    font-size: $font-size-xl;\n    font-weight: 600;\n    color: $gray-700;\n  }\n\n  p {\n    margin: 0 0 $space-4;\n    font-size: $font-size-base;\n    color: $gray-500;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// DIALOG STYLES\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.dialog-form {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: $space-1;\n\n  label {\n    font-size: $font-size-sm;\n    font-weight: 600;\n    color: $gray-700;\n\n    .required {\n      color: $danger;\n    }\n  }\n\n  input, textarea {\n    width: 100%;\n  }\n\n  .hint {\n    font-size: $font-size-xs;\n    color: $gray-400;\n  }\n}\n\n.dialog-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: $space-3;\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// BUTTONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n.btn {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  border: none;\n  border-radius: $radius-md;\n  font-size: $font-size-base;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 250ms;\n  overflow: hidden;\n\n  i { font-size: $font-size-base; }\n}\n\n.btn-primary {\n  background: $primary-gradient;\n  color: white;\n  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);\n  }\n\n  &:active { transform: translateY(0); }\n  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }\n}\n\n.btn-glow::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);\n  animation: shimmer 3s infinite;\n}\n\n.btn-secondary {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  color: $gray-700;\n  box-shadow: $glass-shadow;\n\n  &:hover {\n    background: white;\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n  }\n}\n\n.btn-ghost {\n  background: transparent;\n  color: $gray-600;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.05);\n    color: $gray-800;\n  }\n}\n\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n// ANIMATIONS\n// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n\n@keyframes fade-in-up {\n  from { opacity: 0; transform: translateY(20px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes slide-in-right {\n  from { opacity: 0; transform: translateX(20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n@keyframes gradient-shift {\n  0%, 100% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n}\n\n@keyframes pulse-glow {\n  0%, 100% { opacity: 1; box-shadow: 0 0 20px rgba(102, 126, 234, 0.4); }\n  50% { opacity: 0.8; box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); }\n}\n\n@keyframes shimmer {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(100%); }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmailTemplatesPage, { className: "EmailTemplatesPage", filePath: "src/app/crm/features/emails/pages/email-templates.page.ts", lineNumber: 43 }); })();
