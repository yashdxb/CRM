import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/button";
function EmptyStateComponent__svg_svg_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 9);
    i0.ɵɵelement(1, "rect", 10)(2, "rect", 11)(3, "rect", 12)(4, "rect", 13)(5, "rect", 14)(6, "circle", 15)(7, "path", 16);
    i0.ɵɵelementEnd();
} }
function EmptyStateComponent__svg_svg_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 9);
    i0.ɵɵelement(1, "circle", 17)(2, "circle", 18)(3, "line", 19)(4, "path", 20);
    i0.ɵɵelementEnd();
} }
function EmptyStateComponent__svg_svg_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 9);
    i0.ɵɵelement(1, "circle", 21)(2, "circle", 22)(3, "path", 23);
    i0.ɵɵelementEnd();
} }
function EmptyStateComponent__svg_svg_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 9);
    i0.ɵɵelement(1, "rect", 24)(2, "rect", 25)(3, "circle", 26)(4, "path", 27);
    i0.ɵɵelementEnd();
} }
function EmptyStateComponent__svg_svg_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 9);
    i0.ɵɵelement(1, "rect", 28)(2, "path", 29)(3, "rect", 30)(4, "rect", 31);
    i0.ɵɵelementEnd();
} }
function EmptyStateComponent__svg_svg_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "svg", 9);
    i0.ɵɵelement(1, "circle", 32)(2, "rect", 33);
    i0.ɵɵelementEnd();
} }
function EmptyStateComponent_div_14_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 37);
    i0.ɵɵlistener("click", function EmptyStateComponent_div_14_button_1_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onAction()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("label", ctx_r1.actionLabel)("icon", ctx_r1.actionIcon);
} }
function EmptyStateComponent_div_14_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 38);
    i0.ɵɵlistener("click", function EmptyStateComponent_div_14_button_2_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onSecondaryAction()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("label", ctx_r1.secondaryActionLabel);
} }
function EmptyStateComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtemplate(1, EmptyStateComponent_div_14_button_1_Template, 1, 2, "button", 35)(2, EmptyStateComponent_div_14_button_2_Template, 1, 1, "button", 36);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.actionLabel);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.secondaryActionLabel);
} }
export class EmptyStateComponent {
    type = 'no-data';
    title = 'No data yet';
    description = 'Get started by creating your first item.';
    actionLabel;
    actionIcon = 'pi pi-plus';
    secondaryActionLabel;
    actionCallback;
    secondaryActionCallback;
    onAction() {
        this.actionCallback?.();
    }
    onSecondaryAction() {
        this.secondaryActionCallback?.();
    }
    static ɵfac = function EmptyStateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmptyStateComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmptyStateComponent, selectors: [["app-empty-state"]], inputs: { type: "type", title: "title", description: "description", actionLabel: "actionLabel", actionIcon: "actionIcon", secondaryActionLabel: "secondaryActionLabel", actionCallback: "actionCallback", secondaryActionCallback: "secondaryActionCallback" }, decls: 15, vars: 11, consts: [[1, "empty-state"], [1, "empty-state__illustration"], [3, "ngSwitch"], ["viewBox", "0 0 200 160", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 4, "ngSwitchCase"], ["viewBox", "0 0 200 160", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 4, "ngSwitchDefault"], [1, "empty-state__content"], [1, "empty-state__title"], [1, "empty-state__description"], ["class", "empty-state__actions", 4, "ngIf"], ["viewBox", "0 0 200 160", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["x", "40", "y", "40", "width", "120", "height", "80", "rx", "8", "fill", "#E0E7FF"], ["x", "55", "y", "55", "width", "50", "height", "8", "rx", "4", "fill", "#A5B4FC"], ["x", "55", "y", "70", "width", "90", "height", "6", "rx", "3", "fill", "#C7D2FE"], ["x", "55", "y", "82", "width", "70", "height", "6", "rx", "3", "fill", "#C7D2FE"], ["x", "55", "y", "94", "width", "80", "height", "6", "rx", "3", "fill", "#C7D2FE"], ["cx", "150", "cy", "45", "r", "25", "fill", "#818CF8", "opacity", "0.3"], ["d", "M145 45l5 5 10-10", "stroke", "#4F46E5", "stroke-width", "3", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "100", "cy", "70", "r", "45", "fill", "#FEE2E2", "stroke", "#FECACA", "stroke-width", "2"], ["cx", "90", "cy", "65", "r", "20", "fill", "none", "stroke", "#F87171", "stroke-width", "4"], ["x1", "105", "y1", "80", "x2", "125", "y2", "100", "stroke", "#F87171", "stroke-width", "4", "stroke-linecap", "round"], ["d", "M85 62l10 6M85 68l10-6", "stroke", "#F87171", "stroke-width", "2", "stroke-linecap", "round"], ["cx", "100", "cy", "80", "r", "50", "fill", "#FEE2E2"], ["cx", "100", "cy", "80", "r", "35", "fill", "#FECACA"], ["d", "M100 55v30M100 95v5", "stroke", "#DC2626", "stroke-width", "6", "stroke-linecap", "round"], ["x", "60", "y", "50", "width", "80", "height", "70", "rx", "8", "fill", "#FEF3C7"], ["x", "75", "y", "80", "width", "50", "height", "30", "rx", "4", "fill", "#FDE68A"], ["cx", "100", "cy", "70", "r", "15", "fill", "none", "stroke", "#F59E0B", "stroke-width", "4"], ["d", "M90 70h20M100 60v20", "stroke", "#F59E0B", "stroke-width", "3", "stroke-linecap", "round"], ["x", "50", "y", "40", "width", "100", "height", "80", "rx", "8", "fill", "#ECFDF5"], ["d", "M50 60l50 30 50-30", "stroke", "#34D399", "stroke-width", "3", "fill", "none"], ["x", "70", "y", "85", "width", "60", "height", "4", "rx", "2", "fill", "#A7F3D0"], ["x", "80", "y", "95", "width", "40", "height", "4", "rx", "2", "fill", "#A7F3D0"], ["cx", "100", "cy", "80", "r", "50", "fill", "#E0E7FF"], ["x", "75", "y", "65", "width", "50", "height", "30", "rx", "4", "fill", "#A5B4FC"], [1, "empty-state__actions"], ["pButton", "", 3, "label", "icon", "click", 4, "ngIf"], ["pButton", "", "severity", "secondary", 3, "label", "click", 4, "ngIf"], ["pButton", "", 3, "click", "label", "icon"], ["pButton", "", "severity", "secondary", 3, "click", "label"]], template: function EmptyStateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵelementContainerStart(2, 2);
            i0.ɵɵtemplate(3, EmptyStateComponent__svg_svg_3_Template, 8, 0, "svg", 3)(4, EmptyStateComponent__svg_svg_4_Template, 5, 0, "svg", 3)(5, EmptyStateComponent__svg_svg_5_Template, 4, 0, "svg", 3)(6, EmptyStateComponent__svg_svg_6_Template, 5, 0, "svg", 3)(7, EmptyStateComponent__svg_svg_7_Template, 5, 0, "svg", 3)(8, EmptyStateComponent__svg_svg_8_Template, 3, 0, "svg", 4);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 5)(10, "h3", 6);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "p", 7);
            i0.ɵɵtext(13);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(14, EmptyStateComponent_div_14_Template, 3, 2, "div", 8);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassMap("empty-state--" + ctx.type);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngSwitch", ctx.type);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "no-data");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "no-results");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "error");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "no-access");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "empty-inbox");
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.description);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.actionLabel || ctx.secondaryActionLabel);
        } }, dependencies: [CommonModule, i1.NgIf, i1.NgSwitch, i1.NgSwitchCase, i1.NgSwitchDefault, ButtonModule, i2.ButtonDirective], styles: [".empty-state[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      padding: 48px 24px;\n      text-align: center;\n      min-height: 300px;\n    }\n\n    .empty-state__illustration[_ngcontent-%COMP%] {\n      width: 180px;\n      height: 140px;\n      margin-bottom: 24px;\n    }\n\n    .empty-state__illustration[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n      width: 100%;\n      height: 100%;\n    }\n\n    .empty-state__content[_ngcontent-%COMP%] {\n      max-width: 400px;\n      margin-bottom: 24px;\n    }\n\n    .empty-state__title[_ngcontent-%COMP%] {\n      font-size: 1.25rem;\n      font-weight: 700;\n      color: var(--text-strong, #0f172a);\n      margin: 0 0 8px;\n    }\n\n    .empty-state__description[_ngcontent-%COMP%] {\n      font-size: 0.95rem;\n      color: var(--text-subtle, #64748b);\n      margin: 0;\n      line-height: 1.5;\n    }\n\n    .empty-state__actions[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 12px;\n      flex-wrap: wrap;\n      justify-content: center;\n    }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmptyStateComponent, [{
        type: Component,
        args: [{ selector: 'app-empty-state', standalone: true, imports: [CommonModule, ButtonModule], template: "\n    <div class=\"empty-state\" [class]=\"'empty-state--' + type\">\n      <div class=\"empty-state__illustration\">\n        <ng-container [ngSwitch]=\"type\">\n          <svg *ngSwitchCase=\"'no-data'\" viewBox=\"0 0 200 160\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"40\" y=\"40\" width=\"120\" height=\"80\" rx=\"8\" fill=\"#E0E7FF\"/>\n            <rect x=\"55\" y=\"55\" width=\"50\" height=\"8\" rx=\"4\" fill=\"#A5B4FC\"/>\n            <rect x=\"55\" y=\"70\" width=\"90\" height=\"6\" rx=\"3\" fill=\"#C7D2FE\"/>\n            <rect x=\"55\" y=\"82\" width=\"70\" height=\"6\" rx=\"3\" fill=\"#C7D2FE\"/>\n            <rect x=\"55\" y=\"94\" width=\"80\" height=\"6\" rx=\"3\" fill=\"#C7D2FE\"/>\n            <circle cx=\"150\" cy=\"45\" r=\"25\" fill=\"#818CF8\" opacity=\"0.3\"/>\n            <path d=\"M145 45l5 5 10-10\" stroke=\"#4F46E5\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n          </svg>\n          \n          <svg *ngSwitchCase=\"'no-results'\" viewBox=\"0 0 200 160\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <circle cx=\"100\" cy=\"70\" r=\"45\" fill=\"#FEE2E2\" stroke=\"#FECACA\" stroke-width=\"2\"/>\n            <circle cx=\"90\" cy=\"65\" r=\"20\" fill=\"none\" stroke=\"#F87171\" stroke-width=\"4\"/>\n            <line x1=\"105\" y1=\"80\" x2=\"125\" y2=\"100\" stroke=\"#F87171\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n            <path d=\"M85 62l10 6M85 68l10-6\" stroke=\"#F87171\" stroke-width=\"2\" stroke-linecap=\"round\"/>\n          </svg>\n\n          <svg *ngSwitchCase=\"'error'\" viewBox=\"0 0 200 160\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <circle cx=\"100\" cy=\"80\" r=\"50\" fill=\"#FEE2E2\"/>\n            <circle cx=\"100\" cy=\"80\" r=\"35\" fill=\"#FECACA\"/>\n            <path d=\"M100 55v30M100 95v5\" stroke=\"#DC2626\" stroke-width=\"6\" stroke-linecap=\"round\"/>\n          </svg>\n\n          <svg *ngSwitchCase=\"'no-access'\" viewBox=\"0 0 200 160\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"60\" y=\"50\" width=\"80\" height=\"70\" rx=\"8\" fill=\"#FEF3C7\"/>\n            <rect x=\"75\" y=\"80\" width=\"50\" height=\"30\" rx=\"4\" fill=\"#FDE68A\"/>\n            <circle cx=\"100\" cy=\"70\" r=\"15\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"4\"/>\n            <path d=\"M90 70h20M100 60v20\" stroke=\"#F59E0B\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n          </svg>\n\n          <svg *ngSwitchCase=\"'empty-inbox'\" viewBox=\"0 0 200 160\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect x=\"50\" y=\"40\" width=\"100\" height=\"80\" rx=\"8\" fill=\"#ECFDF5\"/>\n            <path d=\"M50 60l50 30 50-30\" stroke=\"#34D399\" stroke-width=\"3\" fill=\"none\"/>\n            <rect x=\"70\" y=\"85\" width=\"60\" height=\"4\" rx=\"2\" fill=\"#A7F3D0\"/>\n            <rect x=\"80\" y=\"95\" width=\"40\" height=\"4\" rx=\"2\" fill=\"#A7F3D0\"/>\n          </svg>\n\n          <svg *ngSwitchDefault viewBox=\"0 0 200 160\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <circle cx=\"100\" cy=\"80\" r=\"50\" fill=\"#E0E7FF\"/>\n            <rect x=\"75\" y=\"65\" width=\"50\" height=\"30\" rx=\"4\" fill=\"#A5B4FC\"/>\n          </svg>\n        </ng-container>\n      </div>\n\n      <div class=\"empty-state__content\">\n        <h3 class=\"empty-state__title\">{{ title }}</h3>\n        <p class=\"empty-state__description\">{{ description }}</p>\n      </div>\n\n      <div class=\"empty-state__actions\" *ngIf=\"actionLabel || secondaryActionLabel\">\n        <button \n          *ngIf=\"actionLabel\"\n          pButton \n          [label]=\"actionLabel\" \n          [icon]=\"actionIcon\"\n          (click)=\"onAction()\"\n        ></button>\n        <button \n          *ngIf=\"secondaryActionLabel\"\n          pButton \n          [label]=\"secondaryActionLabel\" \n          severity=\"secondary\"\n          (click)=\"onSecondaryAction()\"\n        ></button>\n      </div>\n    </div>\n  ", styles: ["\n    .empty-state {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      padding: 48px 24px;\n      text-align: center;\n      min-height: 300px;\n    }\n\n    .empty-state__illustration {\n      width: 180px;\n      height: 140px;\n      margin-bottom: 24px;\n    }\n\n    .empty-state__illustration svg {\n      width: 100%;\n      height: 100%;\n    }\n\n    .empty-state__content {\n      max-width: 400px;\n      margin-bottom: 24px;\n    }\n\n    .empty-state__title {\n      font-size: 1.25rem;\n      font-weight: 700;\n      color: var(--text-strong, #0f172a);\n      margin: 0 0 8px;\n    }\n\n    .empty-state__description {\n      font-size: 0.95rem;\n      color: var(--text-subtle, #64748b);\n      margin: 0;\n      line-height: 1.5;\n    }\n\n    .empty-state__actions {\n      display: flex;\n      gap: 12px;\n      flex-wrap: wrap;\n      justify-content: center;\n    }\n  "] }]
    }], null, { type: [{
            type: Input
        }], title: [{
            type: Input
        }], description: [{
            type: Input
        }], actionLabel: [{
            type: Input
        }], actionIcon: [{
            type: Input
        }], secondaryActionLabel: [{
            type: Input
        }], actionCallback: [{
            type: Input
        }], secondaryActionCallback: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmptyStateComponent, { className: "EmptyStateComponent", filePath: "src/app/shared/components/empty-state/empty-state.component.ts", lineNumber: 20 }); })();
