import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { HelpDeskDataService } from '../services/helpdesk-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/api";
import * as i5 from "primeng/checkbox";
import * as i6 from "primeng/dialog";
import * as i7 from "primeng/inputgroup";
import * as i8 from "primeng/inputgroupaddon";
import * as i9 from "primeng/inputtext";
import * as i10 from "primeng/multiselect";
import * as i11 from "primeng/table";
const _c0 = () => ({ width: "34rem" });
function HelpDeskQueuesPage_ng_template_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Description");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Active Members");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Members");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "th");
    i0.ɵɵelementEnd();
} }
function HelpDeskQueuesPage_ng_template_20_span_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 38);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const member_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(member_r2.userName);
} }
function HelpDeskQueuesPage_ng_template_20_span_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 39);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("+", row_r3.members.length - 3, " more");
} }
function HelpDeskQueuesPage_ng_template_20_span_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "-");
    i0.ɵɵelementEnd();
} }
function HelpDeskQueuesPage_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtemplate(8, HelpDeskQueuesPage_ng_template_20_span_8_Template, 2, 1, "span", 31)(9, HelpDeskQueuesPage_ng_template_20_span_9_Template, 2, 1, "span", 32)(10, HelpDeskQueuesPage_ng_template_20_span_10_Template, 2, 0, "span", 33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "td");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 34)(14, "div", 35)(15, "button", 36);
    i0.ɵɵlistener("click", function HelpDeskQueuesPage_ng_template_20_Template_button_click_15_listener() { const row_r3 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.openEdit(row_r3)); });
    i0.ɵɵelement(16, "i", 37);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const row_r3 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r3.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r3.description || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r3.activeMemberCount);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", row_r3.members.slice(0, 3));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", row_r3.members.length > 3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !row_r3.members.length);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r3.isActive ? "Active" : "Inactive");
} }
function HelpDeskQueuesPage_ng_template_45_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 40);
    i0.ɵɵlistener("click", function HelpDeskQueuesPage_ng_template_45_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.visible.set(false)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(1, "button", 41);
    i0.ɵɵlistener("click", function HelpDeskQueuesPage_ng_template_45_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r5); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.save()); });
    i0.ɵɵelementEnd();
} }
export class HelpDeskQueuesPage {
    data = inject(HelpDeskDataService);
    toast = inject(AppToastService);
    fb = inject(FormBuilder);
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    visible = signal(false, ...(ngDevMode ? [{ debugName: "visible" }] : []));
    editing = signal(null, ...(ngDevMode ? [{ debugName: "editing" }] : []));
    rows = signal([], ...(ngDevMode ? [{ debugName: "rows" }] : []));
    userOptions = signal([], ...(ngDevMode ? [{ debugName: "userOptions" }] : []));
    form = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(120)]],
        description: [''],
        isActive: [true],
        memberUserIds: [[]]
    });
    constructor() {
        this.load();
        this.loadUsers();
    }
    load() {
        this.loading.set(true);
        this.data.listQueues().subscribe({
            next: (rows) => {
                this.rows.set(rows ?? []);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.toast.show('error', 'Unable to load queues.');
            }
        });
    }
    loadUsers() {
        this.data.lookupActiveUsers(undefined, 300).subscribe({
            next: (users) => {
                this.userOptions.set((users ?? []).map((user) => ({
                    label: `${user.fullName} (${user.email})`,
                    value: user.id
                })));
            },
            error: () => this.toast.show('error', 'Unable to load user list for queue assignment.')
        });
    }
    openCreate() {
        this.editing.set(null);
        this.form.reset({ name: '', description: '', isActive: true, memberUserIds: [] });
        this.visible.set(true);
    }
    openEdit(row) {
        this.editing.set(row);
        this.form.patchValue({
            name: row.name,
            description: row.description ?? '',
            isActive: row.isActive,
            memberUserIds: row.members.map((member) => member.userId)
        });
        this.visible.set(true);
    }
    save() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const payload = this.form.getRawValue();
        const safePayload = {
            name: payload.name ?? '',
            description: payload.description ?? null,
            isActive: payload.isActive ?? true,
            memberUserIds: (payload.memberUserIds ?? []).filter((id) => !!id)
        };
        const request$ = this.editing()
            ? this.data.updateQueue(this.editing().id, safePayload)
            : this.data.createQueue(safePayload);
        request$.subscribe({
            next: () => {
                this.visible.set(false);
                this.toast.show('success', this.editing() ? 'Queue updated.' : 'Queue created.');
                this.load();
            },
            error: () => this.toast.show('error', 'Unable to save queue.')
        });
    }
    static ɵfac = function HelpDeskQueuesPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HelpDeskQueuesPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HelpDeskQueuesPage, selectors: [["app-helpdesk-queues-page"]], decls: 46, vars: 12, consts: [[1, "page-background", "helpdesk-queues-page"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "grid-pattern"], [1, "glass-card", "hero-card"], [1, "hero-title"], [1, "hero-subtitle"], ["type", "button", 1, "action-btn", "action-btn--add", 3, "click"], [1, "action-btn__icon"], [1, "pi", "pi-plus"], [1, "glass-card"], [3, "value", "loading"], ["pTemplate", "header"], ["pTemplate", "body"], [3, "onHide", "header", "visible", "modal"], [1, "queue-form", 3, "formGroup"], [1, "form-field"], ["for", "queue-name"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-tag"], ["pInputText", "", "id", "queue-name", "formControlName", "name", "placeholder", "Queue name"], ["for", "queue-description"], [1, "icon-addon", "icon-addon--info"], [1, "pi", "pi-info-circle"], ["pInputText", "", "id", "queue-description", "formControlName", "description", "placeholder", "Optional description"], ["for", "queue-members"], ["id", "queue-members", "formControlName", "memberUserIds", "optionLabel", "label", "optionValue", "value", "defaultLabel", "Select queue members", "appendTo", "body", "selectedItemsLabel", "{0} users selected", 3, "options", "filter"], [1, "checkbox"], ["formControlName", "isActive", 3, "binary"], ["pTemplate", "footer"], ["class", "member-pill", 4, "ngFor", "ngForOf"], ["class", "member-more", 4, "ngIf"], [4, "ngIf"], [1, "actions"], [1, "row-actions"], ["type", "button", "title", "Edit queue", 1, "row-action-btn", "row-action-btn--edit", 3, "click"], [1, "pi", "pi-pencil"], [1, "member-pill"], [1, "member-more"], ["pButton", "", "type", "button", "label", "Cancel", 1, "crm-button", "crm-button--ghost", 3, "click"], ["pButton", "", "type", "button", "label", "Save", 1, "crm-button", "crm-button--primary", 3, "click"]], template: function HelpDeskQueuesPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 5)(7, "div")(8, "h1", 6);
            i0.ɵɵtext(9, "Help Desk Queues");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 7);
            i0.ɵɵtext(11, "Configure operational queues for support ownership and triage.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "button", 8);
            i0.ɵɵlistener("click", function HelpDeskQueuesPage_Template_button_click_12_listener() { return ctx.openCreate(); });
            i0.ɵɵelementStart(13, "span", 9);
            i0.ɵɵelement(14, "i", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span");
            i0.ɵɵtext(16, "New Queue");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(17, "section", 11)(18, "p-table", 12);
            i0.ɵɵtemplate(19, HelpDeskQueuesPage_ng_template_19_Template, 12, 0, "ng-template", 13)(20, HelpDeskQueuesPage_ng_template_20_Template, 17, 7, "ng-template", 14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "p-dialog", 15);
            i0.ɵɵlistener("onHide", function HelpDeskQueuesPage_Template_p_dialog_onHide_21_listener() { return ctx.visible.set(false); });
            i0.ɵɵelementStart(22, "form", 16)(23, "div", 17)(24, "label", 18);
            i0.ɵɵtext(25, "Name");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "p-inputgroup")(27, "p-inputgroup-addon", 19);
            i0.ɵɵelement(28, "i", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(29, "input", 21);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 17)(31, "label", 22);
            i0.ɵɵtext(32, "Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "p-inputgroup")(34, "p-inputgroup-addon", 23);
            i0.ɵɵelement(35, "i", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(36, "input", 25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "div", 17)(38, "label", 26);
            i0.ɵɵtext(39, "Members");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(40, "p-multiSelect", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "label", 28);
            i0.ɵɵelement(42, "p-checkbox", 29);
            i0.ɵɵelementStart(43, "span");
            i0.ɵɵtext(44, "Active queue");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(45, HelpDeskQueuesPage_ng_template_45_Template, 2, 0, "ng-template", 30);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(18);
            i0.ɵɵproperty("value", ctx.rows())("loading", ctx.loading());
            i0.ɵɵadvance(3);
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(11, _c0));
            i0.ɵɵproperty("header", ctx.editing() ? "Edit Queue" : "Create Queue")("visible", ctx.visible())("modal", true);
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(18);
            i0.ɵɵproperty("options", ctx.userOptions())("filter", true);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("binary", true);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, ButtonModule, i3.ButtonDirective, i4.PrimeTemplate, CheckboxModule, i5.Checkbox, DialogModule, i6.Dialog, InputGroupModule, i7.InputGroup, InputGroupAddonModule, i8.InputGroupAddon, InputTextModule, i9.InputText, MultiSelectModule, i10.MultiSelect, TableModule, i11.Table, BreadcrumbsComponent], styles: [".helpdesk-queues-page[_ngcontent-%COMP%] {\n  position: relative !important;\n  inset: unset !important;\n  min-height: 0;\n  overflow: hidden !important;\n  pointer-events: auto !important;\n\n  > *:not(.animated-orb):not(.grid-pattern) {\n    position: relative;\n    z-index: 1;\n  }\n\n  .animated-orb,\n  .grid-pattern {\n    position: absolute !important;\n    pointer-events: none;\n    z-index: 0;\n  }\n\n  .hero-card {\n    display: flex;\n    justify-content: space-between;\n    gap: 1rem;\n    margin-bottom: 1rem;\n  }\n\n  .actions {\n    text-align: right;\n    width: 84px;\n  }\n\n  .member-pill {\n    display: inline-flex;\n    margin: 0 0.35rem 0.35rem 0;\n    padding: 0.15rem 0.5rem;\n    border-radius: 999px;\n    font-size: 0.75rem;\n    background: color-mix(in srgb, var(--brand-primary, #2563eb) 16%, transparent);\n    color: var(--text-primary);\n  }\n\n  .member-more {\n    font-size: 0.75rem;\n    color: var(--text-secondary);\n  }\n\n  .queue-form {\n    display: grid;\n    gap: 0.75rem;\n  }\n\n  .form-field {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.75rem;\n    padding: 0.35rem 0.45rem 0.45rem;\n    border-radius: 12px;\n    background: rgba(255, 255, 255, 0.35);\n    border: 1px solid transparent;\n    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n    > label {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 0.8125rem;\n      font-weight: 600;\n      color: #475569;\n      letter-spacing: 0.01em;\n      white-space: nowrap;\n      min-width: 110px;\n      flex-shrink: 0;\n      text-align: right;\n      transition: color 0.2s ease;\n    }\n\n    > p-inputgroup,\n    > p-select,\n    > p-inputnumber,\n    > p-multiselect,\n    > input,\n    > textarea,\n    > .form-field__input {\n      flex: 1;\n      min-width: 0;\n    }\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.5);\n      border-color: rgba(148, 163, 184, 0.16);\n      > label { color: #334155; }\n    }\n\n    &:focus-within {\n      background: rgba(255, 255, 255, 0.72);\n      border-color: rgba(var(--apple-blue), 0.22);\n      box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n      > label { color: #4f46e5; }\n    }\n\n    &.full-row {\n      flex-direction: column;\n      align-items: stretch;\n      > label { text-align: left; min-width: unset; }\n    }\n  }\n\n  .checkbox {\n    display: inline-flex;\n    gap: 0.5rem;\n    align-items: center;\n  }\n\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpDeskQueuesPage, [{
        type: Component,
        args: [{ selector: 'app-helpdesk-queues-page', standalone: true, imports: [CommonModule, ReactiveFormsModule, ButtonModule, CheckboxModule, DialogModule, InputGroupModule, InputGroupAddonModule, InputTextModule, MultiSelectModule, TableModule, BreadcrumbsComponent], template: "<section class=\"page-background helpdesk-queues-page\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n  <div class=\"grid-pattern\"></div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"glass-card hero-card\">\n    <div>\n      <h1 class=\"hero-title\">Help Desk Queues</h1>\n      <p class=\"hero-subtitle\">Configure operational queues for support ownership and triage.</p>\n    </div>\n    <button type=\"button\" class=\"action-btn action-btn--add\" (click)=\"openCreate()\"><span class=\"action-btn__icon\"><i class=\"pi pi-plus\"></i></span><span>New Queue</span></button>\n  </section>\n\n  <section class=\"glass-card\">\n    <p-table [value]=\"rows()\" [loading]=\"loading()\">\n      <ng-template pTemplate=\"header\">\n        <tr>\n          <th>Name</th>\n          <th>Description</th>\n          <th>Active Members</th>\n          <th>Members</th>\n          <th>Status</th>\n          <th></th>\n        </tr>\n      </ng-template>\n      <ng-template pTemplate=\"body\" let-row>\n        <tr>\n          <td>{{ row.name }}</td>\n          <td>{{ row.description || '-' }}</td>\n          <td>{{ row.activeMemberCount }}</td>\n          <td>\n            <span class=\"member-pill\" *ngFor=\"let member of row.members.slice(0, 3)\">{{ member.userName }}</span>\n            <span class=\"member-more\" *ngIf=\"row.members.length > 3\">+{{ row.members.length - 3 }} more</span>\n            <span *ngIf=\"!row.members.length\">-</span>\n          </td>\n          <td>{{ row.isActive ? 'Active' : 'Inactive' }}</td>\n          <td class=\"actions\">\n            <div class=\"row-actions\">\n              <button\n                type=\"button\"\n                class=\"row-action-btn row-action-btn--edit\"\n                title=\"Edit queue\"\n                (click)=\"openEdit(row)\">\n                <i class=\"pi pi-pencil\"></i>\n              </button>\n            </div>\n          </td>\n        </tr>\n      </ng-template>\n    </p-table>\n  </section>\n\n  <p-dialog [header]=\"editing() ? 'Edit Queue' : 'Create Queue'\" [visible]=\"visible()\" [modal]=\"true\" [style]=\"{ width: '34rem' }\" (onHide)=\"visible.set(false)\">\n    <form class=\"queue-form\" [formGroup]=\"form\">\n      <div class=\"form-field\">\n        <label for=\"queue-name\">Name</label>\n        <p-inputgroup>\n          <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n            <i class=\"pi pi-tag\"></i>\n          </p-inputgroup-addon>\n          <input pInputText id=\"queue-name\" formControlName=\"name\" placeholder=\"Queue name\" />\n        </p-inputgroup>\n      </div>\n      <div class=\"form-field\">\n        <label for=\"queue-description\">Description</label>\n        <p-inputgroup>\n          <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n            <i class=\"pi pi-info-circle\"></i>\n          </p-inputgroup-addon>\n          <input pInputText id=\"queue-description\" formControlName=\"description\" placeholder=\"Optional description\" />\n        </p-inputgroup>\n      </div>\n      <div class=\"form-field\">\n        <label for=\"queue-members\">Members</label>\n        <p-multiSelect\n          id=\"queue-members\"\n          formControlName=\"memberUserIds\"\n          [options]=\"userOptions()\"\n          optionLabel=\"label\"\n          optionValue=\"value\"\n          defaultLabel=\"Select queue members\"\n          [filter]=\"true\"\n          appendTo=\"body\"\n          selectedItemsLabel=\"{0} users selected\">\n        </p-multiSelect>\n      </div>\n      <label class=\"checkbox\">\n        <p-checkbox formControlName=\"isActive\" [binary]=\"true\"></p-checkbox>\n        <span>Active queue</span>\n      </label>\n    </form>\n    <ng-template pTemplate=\"footer\">\n      <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" label=\"Cancel\" (click)=\"visible.set(false)\"></button>\n      <button pButton type=\"button\" class=\"crm-button crm-button--primary\" label=\"Save\" (click)=\"save()\"></button>\n    </ng-template>\n  </p-dialog>\n</section>\n", styles: [".helpdesk-queues-page {\n  position: relative !important;\n  inset: unset !important;\n  min-height: 0;\n  overflow: hidden !important;\n  pointer-events: auto !important;\n\n  > *:not(.animated-orb):not(.grid-pattern) {\n    position: relative;\n    z-index: 1;\n  }\n\n  .animated-orb,\n  .grid-pattern {\n    position: absolute !important;\n    pointer-events: none;\n    z-index: 0;\n  }\n\n  .hero-card {\n    display: flex;\n    justify-content: space-between;\n    gap: 1rem;\n    margin-bottom: 1rem;\n  }\n\n  .actions {\n    text-align: right;\n    width: 84px;\n  }\n\n  .member-pill {\n    display: inline-flex;\n    margin: 0 0.35rem 0.35rem 0;\n    padding: 0.15rem 0.5rem;\n    border-radius: 999px;\n    font-size: 0.75rem;\n    background: color-mix(in srgb, var(--brand-primary, #2563eb) 16%, transparent);\n    color: var(--text-primary);\n  }\n\n  .member-more {\n    font-size: 0.75rem;\n    color: var(--text-secondary);\n  }\n\n  .queue-form {\n    display: grid;\n    gap: 0.75rem;\n  }\n\n  .form-field {\n    display: flex;\n    flex-direction: row;\n    align-items: center;\n    gap: 0.75rem;\n    padding: 0.35rem 0.45rem 0.45rem;\n    border-radius: 12px;\n    background: rgba(255, 255, 255, 0.35);\n    border: 1px solid transparent;\n    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n    > label {\n      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n      font-size: 0.8125rem;\n      font-weight: 600;\n      color: #475569;\n      letter-spacing: 0.01em;\n      white-space: nowrap;\n      min-width: 110px;\n      flex-shrink: 0;\n      text-align: right;\n      transition: color 0.2s ease;\n    }\n\n    > p-inputgroup,\n    > p-select,\n    > p-inputnumber,\n    > p-multiselect,\n    > input,\n    > textarea,\n    > .form-field__input {\n      flex: 1;\n      min-width: 0;\n    }\n\n    &:hover {\n      background: rgba(255, 255, 255, 0.5);\n      border-color: rgba(148, 163, 184, 0.16);\n      > label { color: #334155; }\n    }\n\n    &:focus-within {\n      background: rgba(255, 255, 255, 0.72);\n      border-color: rgba(var(--apple-blue), 0.22);\n      box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n      > label { color: #4f46e5; }\n    }\n\n    &.full-row {\n      flex-direction: column;\n      align-items: stretch;\n      > label { text-align: left; min-width: unset; }\n    }\n  }\n\n  .checkbox {\n    display: inline-flex;\n    gap: 0.5rem;\n    align-items: center;\n  }\n\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HelpDeskQueuesPage, { className: "HelpDeskQueuesPage", filePath: "src/app/crm/features/helpdesk/pages/helpdesk-queues.page.ts", lineNumber: 24 }); })();
