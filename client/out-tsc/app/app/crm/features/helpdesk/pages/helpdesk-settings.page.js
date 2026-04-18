import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { HelpDeskDataService } from '../services/helpdesk-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/button";
import * as i3 from "primeng/api";
import * as i4 from "primeng/inputtext";
import * as i5 from "primeng/inputnumber";
import * as i6 from "primeng/table";
function HelpDeskSettingsPage_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th");
    i0.ɵɵtext(2, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "th");
    i0.ɵɵtext(4, "Priority");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Severity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "First Response (min)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Resolution (min)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Escalation (min)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(15, "th");
    i0.ɵɵelementEnd();
} }
function HelpDeskSettingsPage_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "tr")(1, "td")(2, "input", 12);
    i0.ɵɵtwoWayListener("ngModelChange", function HelpDeskSettingsPage_ng_template_15_Template_input_ngModelChange_2_listener($event) { const row_r2 = i0.ɵɵrestoreView(_r1).$implicit; i0.ɵɵtwoWayBindingSet(row_r2.name, $event) || (row_r2.name = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "td");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "td")(8, "p-inputNumber", 13);
    i0.ɵɵtwoWayListener("ngModelChange", function HelpDeskSettingsPage_ng_template_15_Template_p_inputNumber_ngModelChange_8_listener($event) { const row_r2 = i0.ɵɵrestoreView(_r1).$implicit; i0.ɵɵtwoWayBindingSet(row_r2.firstResponseTargetMinutes, $event) || (row_r2.firstResponseTargetMinutes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "td")(10, "p-inputNumber", 13);
    i0.ɵɵtwoWayListener("ngModelChange", function HelpDeskSettingsPage_ng_template_15_Template_p_inputNumber_ngModelChange_10_listener($event) { const row_r2 = i0.ɵɵrestoreView(_r1).$implicit; i0.ɵɵtwoWayBindingSet(row_r2.resolutionTargetMinutes, $event) || (row_r2.resolutionTargetMinutes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "td")(12, "p-inputNumber", 13);
    i0.ɵɵtwoWayListener("ngModelChange", function HelpDeskSettingsPage_ng_template_15_Template_p_inputNumber_ngModelChange_12_listener($event) { const row_r2 = i0.ɵɵrestoreView(_r1).$implicit; i0.ɵɵtwoWayBindingSet(row_r2.escalationMinutes, $event) || (row_r2.escalationMinutes = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "td");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td")(16, "button", 14);
    i0.ɵɵlistener("click", function HelpDeskSettingsPage_ng_template_15_Template_button_click_16_listener() { const row_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.saveRow(row_r2)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const row_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", row_r2.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r2.priority);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r2.severity);
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", row_r2.firstResponseTargetMinutes);
    i0.ɵɵproperty("min", 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", row_r2.resolutionTargetMinutes);
    i0.ɵɵproperty("min", 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtwoWayProperty("ngModel", row_r2.escalationMinutes);
    i0.ɵɵproperty("min", 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(row_r2.isActive ? "Active" : "Inactive");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("loading", ctx_r2.savingRowId() === row_r2.id);
} }
export class HelpDeskSettingsPage {
    data = inject(HelpDeskDataService);
    toast = inject(AppToastService);
    loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    rows = signal([], ...(ngDevMode ? [{ debugName: "rows" }] : []));
    savingRowId = signal(null, ...(ngDevMode ? [{ debugName: "savingRowId" }] : []));
    constructor() {
        this.load();
    }
    load() {
        this.loading.set(true);
        this.data.listSlaPolicies().subscribe({
            next: (rows) => {
                this.rows.set(rows ?? []);
                this.loading.set(false);
            },
            error: () => {
                this.loading.set(false);
                this.toast.show('error', 'Unable to load SLA policies.');
            }
        });
    }
    saveRow(row) {
        this.savingRowId.set(row.id);
        this.data.updateSlaPolicy(row.id, row).subscribe({
            next: () => {
                this.savingRowId.set(null);
                this.toast.show('success', 'SLA policy saved.');
            },
            error: () => {
                this.savingRowId.set(null);
                this.toast.show('error', 'Unable to save SLA policy.');
            }
        });
    }
    static ɵfac = function HelpDeskSettingsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HelpDeskSettingsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HelpDeskSettingsPage, selectors: [["app-helpdesk-settings-page"]], decls: 16, vars: 2, consts: [[1, "page-background", "helpdesk-settings-page"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "grid-pattern"], [1, "glass-card", "hero-card"], [1, "hero-title"], [1, "hero-subtitle"], [1, "glass-card"], [3, "value", "loading"], ["pTemplate", "header"], ["pTemplate", "body"], ["pInputText", "", 3, "ngModelChange", "ngModel"], [3, "ngModelChange", "ngModel", "min"], ["pButton", "", "type", "button", "label", "Save", 1, "crm-button", "crm-button--primary", "crm-button--sm", 3, "click", "loading"]], template: function HelpDeskSettingsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 5)(7, "div")(8, "h1", 6);
            i0.ɵɵtext(9, "Help Desk Settings");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 7);
            i0.ɵɵtext(11, "Manage SLA targets for priority/severity combinations.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(12, "section", 8)(13, "p-table", 9);
            i0.ɵɵtemplate(14, HelpDeskSettingsPage_ng_template_14_Template, 16, 0, "ng-template", 10)(15, HelpDeskSettingsPage_ng_template_15_Template, 17, 11, "ng-template", 11);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("value", ctx.rows())("loading", ctx.loading());
        } }, dependencies: [CommonModule, FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, ButtonModule, i2.ButtonDirective, i3.PrimeTemplate, InputTextModule, i4.InputText, InputNumberModule, i5.InputNumber, TableModule, i6.Table, BreadcrumbsComponent], styles: [".helpdesk-settings-page[_ngcontent-%COMP%] {\n  position: relative !important;\n  inset: unset !important;\n  min-height: 0;\n  overflow: hidden !important;\n  pointer-events: auto !important;\n\n  > *:not(.animated-orb):not(.grid-pattern) {\n    position: relative;\n    z-index: 1;\n  }\n\n  .animated-orb,\n  .grid-pattern {\n    position: absolute !important;\n    pointer-events: none;\n    z-index: 0;\n  }\n\n  .hero-card {\n    margin-bottom: 1rem;\n  }\n\n  -shadowcsshost-no-combinator ::ng-deep .p-inputnumber {\n    width: 8.5rem;\n  }\n\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HelpDeskSettingsPage, [{
        type: Component,
        args: [{ selector: 'app-helpdesk-settings-page', standalone: true, imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, InputNumberModule, TableModule, BreadcrumbsComponent], template: "<section class=\"page-background helpdesk-settings-page\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n  <div class=\"grid-pattern\"></div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"glass-card hero-card\">\n    <div>\n      <h1 class=\"hero-title\">Help Desk Settings</h1>\n      <p class=\"hero-subtitle\">Manage SLA targets for priority/severity combinations.</p>\n    </div>\n  </section>\n\n  <section class=\"glass-card\">\n    <p-table [value]=\"rows()\" [loading]=\"loading()\">\n      <ng-template pTemplate=\"header\">\n        <tr>\n          <th>Name</th>\n          <th>Priority</th>\n          <th>Severity</th>\n          <th>First Response (min)</th>\n          <th>Resolution (min)</th>\n          <th>Escalation (min)</th>\n          <th>Status</th>\n          <th></th>\n        </tr>\n      </ng-template>\n      <ng-template pTemplate=\"body\" let-row>\n        <tr>\n          <td><input pInputText [(ngModel)]=\"row.name\" /></td>\n          <td>{{ row.priority }}</td>\n          <td>{{ row.severity }}</td>\n          <td><p-inputNumber [(ngModel)]=\"row.firstResponseTargetMinutes\" [min]=\"1\"></p-inputNumber></td>\n          <td><p-inputNumber [(ngModel)]=\"row.resolutionTargetMinutes\" [min]=\"1\"></p-inputNumber></td>\n          <td><p-inputNumber [(ngModel)]=\"row.escalationMinutes\" [min]=\"1\"></p-inputNumber></td>\n          <td>{{ row.isActive ? 'Active' : 'Inactive' }}</td>\n          <td>\n            <button pButton type=\"button\" class=\"crm-button crm-button--primary crm-button--sm\" label=\"Save\" [loading]=\"savingRowId() === row.id\" (click)=\"saveRow(row)\"></button>\n          </td>\n        </tr>\n      </ng-template>\n    </p-table>\n  </section>\n</section>\n", styles: [".helpdesk-settings-page {\n  position: relative !important;\n  inset: unset !important;\n  min-height: 0;\n  overflow: hidden !important;\n  pointer-events: auto !important;\n\n  > *:not(.animated-orb):not(.grid-pattern) {\n    position: relative;\n    z-index: 1;\n  }\n\n  .animated-orb,\n  .grid-pattern {\n    position: absolute !important;\n    pointer-events: none;\n    z-index: 0;\n  }\n\n  .hero-card {\n    margin-bottom: 1rem;\n  }\n\n  :host ::ng-deep .p-inputnumber {\n    width: 8.5rem;\n  }\n\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HelpDeskSettingsPage, { className: "HelpDeskSettingsPage", filePath: "src/app/crm/features/helpdesk/pages/helpdesk-settings.page.ts", lineNumber: 20 }); })();
