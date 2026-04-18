import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import * as i0 from "@angular/core";
function LoadingSpinnerComponent_p_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.message);
} }
export class LoadingSpinnerComponent {
    size = '48px';
    message;
    fullscreen = false;
    overlay = false;
    static ɵfac = function LoadingSpinnerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoadingSpinnerComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoadingSpinnerComponent, selectors: [["app-loading-spinner"]], inputs: { size: "size", message: "message", fullscreen: "fullscreen", overlay: "overlay" }, decls: 6, vars: 9, consts: [[1, "loading-spinner"], [1, "loading-spinner__content"], ["viewBox", "0 0 50 50", 1, "loading-spinner__svg"], ["cx", "25", "cy", "25", "r", "20", "fill", "none", "stroke-width", "4", 1, "loading-spinner__track"], ["cx", "25", "cy", "25", "r", "20", "fill", "none", "stroke-width", "4", "stroke-linecap", "round", 1, "loading-spinner__circle"], ["class", "loading-spinner__message", 4, "ngIf"], [1, "loading-spinner__message"]], template: function LoadingSpinnerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(2, "svg", 2);
            i0.ɵɵelement(3, "circle", 3)(4, "circle", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(5, LoadingSpinnerComponent_p_5_Template, 2, 1, "p", 5);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵclassProp("loading-spinner--fullscreen", ctx.fullscreen)("loading-spinner--overlay", ctx.overlay);
            i0.ɵɵadvance(2);
            i0.ɵɵstyleProp("width", ctx.size)("height", ctx.size);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.message);
        } }, dependencies: [NgIf], styles: [".loading-spinner[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding: 24px;\n    }\n\n    .loading-spinner--fullscreen[_ngcontent-%COMP%] {\n      position: fixed;\n      inset: 0;\n      background: rgba(255, 255, 255, 0.9);\n      backdrop-filter: blur(4px);\n      z-index: 9999;\n    }\n\n    .loading-spinner--overlay[_ngcontent-%COMP%] {\n      position: absolute;\n      inset: 0;\n      background: rgba(255, 255, 255, 0.8);\n      backdrop-filter: blur(2px);\n      z-index: 10;\n    }\n\n    .loading-spinner__content[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 16px;\n    }\n\n    .loading-spinner__svg[_ngcontent-%COMP%] {\n      animation: _ngcontent-%COMP%_rotate 1.5s linear infinite;\n    }\n\n    .loading-spinner__track[_ngcontent-%COMP%] {\n      stroke: #e2e8f0;\n    }\n\n    .loading-spinner__circle[_ngcontent-%COMP%] {\n      stroke: var(--brand-primary, #3b82f6);\n      stroke-dasharray: 80, 200;\n      stroke-dashoffset: 0;\n      animation: _ngcontent-%COMP%_dash 1.5s ease-in-out infinite;\n    }\n\n    .loading-spinner__message[_ngcontent-%COMP%] {\n      font-size: 0.9rem;\n      color: var(--text-subtle, #64748b);\n      margin: 0;\n    }\n\n    @keyframes _ngcontent-%COMP%_rotate {\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n\n    @keyframes _ngcontent-%COMP%_dash {\n      0% {\n        stroke-dasharray: 1, 200;\n        stroke-dashoffset: 0;\n      }\n      50% {\n        stroke-dasharray: 80, 200;\n        stroke-dashoffset: -35;\n      }\n      100% {\n        stroke-dasharray: 80, 200;\n        stroke-dashoffset: -125;\n      }\n    }\n\n    .dark-theme[_nghost-%COMP%], .dark-theme   [_nghost-%COMP%] {\n      .loading-spinner--fullscreen,\n      .loading-spinner--overlay {\n        background: rgba(15, 23, 42, 0.9);\n      }\n\n      .loading-spinner__track {\n        stroke: #334155;\n      }\n    }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoadingSpinnerComponent, [{
        type: Component,
        args: [{ selector: 'app-loading-spinner', standalone: true, imports: [NgIf], template: "\n    <div class=\"loading-spinner\" [class.loading-spinner--fullscreen]=\"fullscreen\" [class.loading-spinner--overlay]=\"overlay\">\n      <div class=\"loading-spinner__content\">\n        <svg class=\"loading-spinner__svg\" viewBox=\"0 0 50 50\" [style.width]=\"size\" [style.height]=\"size\">\n          <circle\n            class=\"loading-spinner__track\"\n            cx=\"25\"\n            cy=\"25\"\n            r=\"20\"\n            fill=\"none\"\n            stroke-width=\"4\"\n          />\n          <circle\n            class=\"loading-spinner__circle\"\n            cx=\"25\"\n            cy=\"25\"\n            r=\"20\"\n            fill=\"none\"\n            stroke-width=\"4\"\n            stroke-linecap=\"round\"\n          />\n        </svg>\n        <p *ngIf=\"message\" class=\"loading-spinner__message\">{{ message }}</p>\n      </div>\n    </div>\n  ", styles: ["\n    .loading-spinner {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding: 24px;\n    }\n\n    .loading-spinner--fullscreen {\n      position: fixed;\n      inset: 0;\n      background: rgba(255, 255, 255, 0.9);\n      backdrop-filter: blur(4px);\n      z-index: 9999;\n    }\n\n    .loading-spinner--overlay {\n      position: absolute;\n      inset: 0;\n      background: rgba(255, 255, 255, 0.8);\n      backdrop-filter: blur(2px);\n      z-index: 10;\n    }\n\n    .loading-spinner__content {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 16px;\n    }\n\n    .loading-spinner__svg {\n      animation: rotate 1.5s linear infinite;\n    }\n\n    .loading-spinner__track {\n      stroke: #e2e8f0;\n    }\n\n    .loading-spinner__circle {\n      stroke: var(--brand-primary, #3b82f6);\n      stroke-dasharray: 80, 200;\n      stroke-dashoffset: 0;\n      animation: dash 1.5s ease-in-out infinite;\n    }\n\n    .loading-spinner__message {\n      font-size: 0.9rem;\n      color: var(--text-subtle, #64748b);\n      margin: 0;\n    }\n\n    @keyframes rotate {\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n\n    @keyframes dash {\n      0% {\n        stroke-dasharray: 1, 200;\n        stroke-dashoffset: 0;\n      }\n      50% {\n        stroke-dasharray: 80, 200;\n        stroke-dashoffset: -35;\n      }\n      100% {\n        stroke-dasharray: 80, 200;\n        stroke-dashoffset: -125;\n      }\n    }\n\n    :host-context(.dark-theme) {\n      .loading-spinner--fullscreen,\n      .loading-spinner--overlay {\n        background: rgba(15, 23, 42, 0.9);\n      }\n\n      .loading-spinner__track {\n        stroke: #334155;\n      }\n    }\n  "] }]
    }], null, { size: [{
            type: Input
        }], message: [{
            type: Input
        }], fullscreen: [{
            type: Input
        }], overlay: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoadingSpinnerComponent, { className: "LoadingSpinnerComponent", filePath: "src/app/shared/components/loading/loading-spinner.component.ts", lineNumber: 11 }); })();
