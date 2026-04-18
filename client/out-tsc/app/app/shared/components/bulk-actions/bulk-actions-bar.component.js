import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
import * as i2 from "primeng/tooltip";
function BulkActionsBarComponent_div_0_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 8);
    i0.ɵɵlistener("click", function BulkActionsBarComponent_div_0_button_8_Template_button_click_0_listener() { const action_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onActionClick(action_r4)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const action_r4 = ctx.$implicit;
    i0.ɵɵproperty("label", action_r4.label)("icon", action_r4.icon)("severity", action_r4.severity || "secondary")("disabled", action_r4.disabled);
} }
function BulkActionsBarComponent_div_0_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9)(1, "button", 10);
    i0.ɵɵlistener("click", function BulkActionsBarComponent_div_0_div_9_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onSelectAll()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("label", "Select all " + ctx_r1.totalCount + " items");
} }
function BulkActionsBarComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "button", 3);
    i0.ɵɵlistener("click", function BulkActionsBarComponent_div_0_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onClearSelection()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 4)(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 5);
    i0.ɵɵtemplate(8, BulkActionsBarComponent_div_0_button_8_Template, 1, 4, "button", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, BulkActionsBarComponent_div_0_div_9_Template, 2, 1, "div", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("@slideUp", undefined);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.selectedCount());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.selectedCount() === 1 ? "item" : "items", " selected ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.actions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.totalCount && ctx_r1.totalCount > ctx_r1.selectedCount());
} }
export class BulkActionsBarComponent {
    actions = [];
    totalCount;
    set selectedItems(items) {
        this._selectedItems.set(items);
    }
    actionClicked = new EventEmitter();
    clearSelection = new EventEmitter();
    selectAll = new EventEmitter();
    _selectedItems = signal([], ...(ngDevMode ? [{ debugName: "_selectedItems" }] : []));
    selectedCount = computed(() => this._selectedItems().length, ...(ngDevMode ? [{ debugName: "selectedCount" }] : []));
    onActionClick(action) {
        this.actionClicked.emit(action);
    }
    onClearSelection() {
        this.clearSelection.emit();
    }
    onSelectAll() {
        this.selectAll.emit();
    }
    static ɵfac = function BulkActionsBarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BulkActionsBarComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BulkActionsBarComponent, selectors: [["app-bulk-actions-bar"]], inputs: { actions: "actions", totalCount: "totalCount", selectedItems: "selectedItems" }, outputs: { actionClicked: "actionClicked", clearSelection: "clearSelection", selectAll: "selectAll" }, decls: 1, vars: 1, consts: [["class", "bulk-actions-bar", 4, "ngIf"], [1, "bulk-actions-bar"], [1, "bulk-actions-bar__info"], ["pButton", "", "type", "button", "icon", "pi pi-times", "pTooltip", "Clear selection", 1, "bulk-actions-bar__close", "p-button-text", 3, "click"], [1, "bulk-actions-bar__count"], [1, "bulk-actions-bar__actions"], ["pButton", "", "class", "p-button-sm", 3, "label", "icon", "severity", "disabled", "click", 4, "ngFor", "ngForOf"], ["class", "bulk-actions-bar__select-all", 4, "ngIf"], ["pButton", "", 1, "p-button-sm", 3, "click", "label", "icon", "severity", "disabled"], [1, "bulk-actions-bar__select-all"], ["pButton", "", "type", "button", 1, "bulk-actions-bar__link", "p-button-text", 3, "click", "label"]], template: function BulkActionsBarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, BulkActionsBarComponent_div_0_Template, 10, 5, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.selectedCount() > 0);
        } }, dependencies: [NgIf, NgFor, ButtonModule, i1.ButtonDirective, TooltipModule, i2.Tooltip], styles: [".bulk-actions-bar[_ngcontent-%COMP%] {\n      position: fixed;\n      bottom: 24px;\n      left: 50%;\n      transform: translateX(-50%);\n      display: flex;\n      align-items: center;\n      gap: 16px;\n      padding: 12px 20px;\n      background: #0f172a;\n      border-radius: 16px;\n      box-shadow: 0 20px 60px rgba(15, 23, 42, 0.4);\n      z-index: 1000;\n      min-width: 400px;\n    }\n\n    .bulk-actions-bar__info[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n    }\n\n    .bulk-actions-bar__close.p-button[_ngcontent-%COMP%] {\n      width: 32px;\n      height: 32px;\n      border: none;\n      border-radius: 8px;\n      background: rgba(255, 255, 255, 0.1);\n      color: #e2e8f0;\n    }\n\n    .bulk-actions-bar__close.p-button[_ngcontent-%COMP%]:hover {\n      background: rgba(255, 255, 255, 0.2);\n    }\n\n    .bulk-actions-bar__count[_ngcontent-%COMP%] {\n      font-size: 0.9rem;\n      color: #e2e8f0;\n      white-space: nowrap;\n    }\n\n    .bulk-actions-bar__count[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n      color: #ffffff;\n    }\n\n    .bulk-actions-bar__actions[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 8px;\n      padding-left: 16px;\n      border-left: 1px solid rgba(255, 255, 255, 0.1);\n    }\n\n    .bulk-actions-bar__select-all[_ngcontent-%COMP%] {\n      padding-left: 16px;\n      border-left: 1px solid rgba(255, 255, 255, 0.1);\n    }\n\n    .bulk-actions-bar__link.p-button[_ngcontent-%COMP%] {\n      padding: 0;\n      border: none;\n      color: #60a5fa;\n      font-size: 0.85rem;\n      text-decoration: underline;\n      white-space: nowrap;\n    }\n\n    .bulk-actions-bar__link.p-button[_ngcontent-%COMP%]:hover {\n      color: #93c5fd;\n    }\n\n    @media (max-width: 768px) {\n      .bulk-actions-bar[_ngcontent-%COMP%] {\n        left: 16px;\n        right: 16px;\n        transform: none;\n        min-width: auto;\n        flex-wrap: wrap;\n        justify-content: center;\n      }\n\n      .bulk-actions-bar__actions[_ngcontent-%COMP%] {\n        border-left: none;\n        padding-left: 0;\n        padding-top: 12px;\n        border-top: 1px solid rgba(255, 255, 255, 0.1);\n        width: 100%;\n        justify-content: center;\n      }\n    }"], data: { animation: [
                trigger('slideUp', [
                    transition(':enter', [
                        style({ transform: 'translateY(100%)', opacity: 0 }),
                        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
                    ]),
                    transition(':leave', [
                        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateY(100%)', opacity: 0 }))
                    ])
                ])
            ] } });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BulkActionsBarComponent, [{
        type: Component,
        args: [{ selector: 'app-bulk-actions-bar', standalone: true, imports: [NgIf, NgFor, ButtonModule, TooltipModule], animations: [
                    trigger('slideUp', [
                        transition(':enter', [
                            style({ transform: 'translateY(100%)', opacity: 0 }),
                            animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
                        ]),
                        transition(':leave', [
                            animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateY(100%)', opacity: 0 }))
                        ])
                    ])
                ], template: "\n    <div class=\"bulk-actions-bar\" *ngIf=\"selectedCount() > 0\" [@slideUp]>\n      <div class=\"bulk-actions-bar__info\">\n        <button\n          pButton\n          type=\"button\"\n          icon=\"pi pi-times\"\n          class=\"bulk-actions-bar__close p-button-text\"\n          (click)=\"onClearSelection()\"\n          pTooltip=\"Clear selection\"\n        ></button>\n        <span class=\"bulk-actions-bar__count\">\n          <strong>{{ selectedCount() }}</strong> {{ selectedCount() === 1 ? 'item' : 'items' }} selected\n        </span>\n      </div>\n\n      <div class=\"bulk-actions-bar__actions\">\n        <button\n          *ngFor=\"let action of actions\"\n          pButton\n          [label]=\"action.label\"\n          [icon]=\"action.icon\"\n          [severity]=\"action.severity || 'secondary'\"\n          [disabled]=\"action.disabled\"\n          (click)=\"onActionClick(action)\"\n          class=\"p-button-sm\"\n        ></button>\n      </div>\n\n      <div class=\"bulk-actions-bar__select-all\" *ngIf=\"totalCount && totalCount > selectedCount()\">\n        <button\n          pButton\n          type=\"button\"\n          class=\"bulk-actions-bar__link p-button-text\"\n          [label]=\"'Select all ' + totalCount + ' items'\"\n          (click)=\"onSelectAll()\"\n        ></button>\n      </div>\n    </div>\n  ", styles: ["\n    .bulk-actions-bar {\n      position: fixed;\n      bottom: 24px;\n      left: 50%;\n      transform: translateX(-50%);\n      display: flex;\n      align-items: center;\n      gap: 16px;\n      padding: 12px 20px;\n      background: #0f172a;\n      border-radius: 16px;\n      box-shadow: 0 20px 60px rgba(15, 23, 42, 0.4);\n      z-index: 1000;\n      min-width: 400px;\n    }\n\n    .bulk-actions-bar__info {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n    }\n\n    .bulk-actions-bar__close.p-button {\n      width: 32px;\n      height: 32px;\n      border: none;\n      border-radius: 8px;\n      background: rgba(255, 255, 255, 0.1);\n      color: #e2e8f0;\n    }\n\n    .bulk-actions-bar__close.p-button:hover {\n      background: rgba(255, 255, 255, 0.2);\n    }\n\n    .bulk-actions-bar__count {\n      font-size: 0.9rem;\n      color: #e2e8f0;\n      white-space: nowrap;\n    }\n\n    .bulk-actions-bar__count strong {\n      color: #ffffff;\n    }\n\n    .bulk-actions-bar__actions {\n      display: flex;\n      gap: 8px;\n      padding-left: 16px;\n      border-left: 1px solid rgba(255, 255, 255, 0.1);\n    }\n\n    .bulk-actions-bar__select-all {\n      padding-left: 16px;\n      border-left: 1px solid rgba(255, 255, 255, 0.1);\n    }\n\n    .bulk-actions-bar__link.p-button {\n      padding: 0;\n      border: none;\n      color: #60a5fa;\n      font-size: 0.85rem;\n      text-decoration: underline;\n      white-space: nowrap;\n    }\n\n    .bulk-actions-bar__link.p-button:hover {\n      color: #93c5fd;\n    }\n\n    @media (max-width: 768px) {\n      .bulk-actions-bar {\n        left: 16px;\n        right: 16px;\n        transform: none;\n        min-width: auto;\n        flex-wrap: wrap;\n        justify-content: center;\n      }\n\n      .bulk-actions-bar__actions {\n        border-left: none;\n        padding-left: 0;\n        padding-top: 12px;\n        border-top: 1px solid rgba(255, 255, 255, 0.1);\n        width: 100%;\n        justify-content: center;\n      }\n    }\n  "] }]
    }], null, { actions: [{
            type: Input
        }], totalCount: [{
            type: Input
        }], selectedItems: [{
            type: Input
        }], actionClicked: [{
            type: Output
        }], clearSelection: [{
            type: Output
        }], selectAll: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BulkActionsBarComponent, { className: "BulkActionsBarComponent", filePath: "src/app/shared/components/bulk-actions/bulk-actions-bar.component.ts", lineNumber: 33 }); })();
