import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function SkeletonLoaderComponent_ng_container_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 6);
} if (rf & 2) {
    const __r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("width", ctx_r1.getLineWidth(__r1));
} }
function SkeletonLoaderComponent_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, SkeletonLoaderComponent_ng_container_2_div_1_Template, 1, 2, "div", 5);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.lines);
} }
function SkeletonLoaderComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 7);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵstyleProp("width", ctx_r1.size)("height", ctx_r1.size);
} }
function SkeletonLoaderComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 8);
    i0.ɵɵelement(2, "div", 9);
    i0.ɵɵelementStart(3, "div", 10);
    i0.ɵɵelement(4, "div", 11)(5, "div", 12);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} }
function SkeletonLoaderComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 13);
} }
function SkeletonLoaderComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 14)(2, "div", 15);
    i0.ɵɵelement(3, "div", 16);
    i0.ɵɵelementStart(4, "div", 17);
    i0.ɵɵelement(5, "div", 18)(6, "div", 19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 20);
    i0.ɵɵelement(8, "div", 6)(9, "div", 21)(10, "div", 18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} }
function SkeletonLoaderComponent_ng_container_7_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵelement(1, "div", 24)(2, "div", 25)(3, "div", 26)(4, "div", 27)(5, "div", 28);
    i0.ɵɵelementEnd();
} }
function SkeletonLoaderComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, SkeletonLoaderComponent_ng_container_7_div_1_Template, 6, 0, "div", 22);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.lines);
} }
export class SkeletonLoaderComponent {
    variant = 'text';
    width;
    height;
    size = '40px';
    count = 3;
    get lines() {
        return Array.from({ length: this.count }, (_, i) => i);
    }
    getLineWidth(index) {
        // Vary line widths for more natural look
        const widths = ['100%', '85%', '70%', '90%', '60%'];
        return widths[index % widths.length];
    }
    static ɵfac = function SkeletonLoaderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SkeletonLoaderComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SkeletonLoaderComponent, selectors: [["app-skeleton-loader"]], inputs: { variant: "variant", width: "width", height: "height", size: "size", count: "count" }, decls: 8, vars: 12, consts: [[1, "skeleton-loader", 3, "ngClass"], [3, "ngSwitch"], [4, "ngSwitchCase"], ["class", "skeleton-circle", 3, "width", "height", 4, "ngSwitchCase"], ["class", "skeleton-rect", 4, "ngSwitchCase"], ["class", "skeleton-line", 3, "width", 4, "ngFor", "ngForOf"], [1, "skeleton-line"], [1, "skeleton-circle"], [1, "skeleton-avatar"], [1, "skeleton-circle", 2, "width", "40px", "height", "40px"], [1, "skeleton-avatar__text"], [1, "skeleton-line", 2, "width", "120px"], [1, "skeleton-line", 2, "width", "80px", "height", "10px"], [1, "skeleton-rect"], [1, "skeleton-card"], [1, "skeleton-card__header"], [1, "skeleton-circle", 2, "width", "48px", "height", "48px"], [1, "skeleton-card__header-text"], [1, "skeleton-line", 2, "width", "60%"], [1, "skeleton-line", 2, "width", "40%", "height", "10px"], [1, "skeleton-card__body"], [1, "skeleton-line", 2, "width", "80%"], ["class", "skeleton-table-row", 4, "ngFor", "ngForOf"], [1, "skeleton-table-row"], [1, "skeleton-circle", 2, "width", "32px", "height", "32px"], [1, "skeleton-line", 2, "width", "150px"], [1, "skeleton-line", 2, "width", "100px"], [1, "skeleton-line", 2, "width", "80px"], [1, "skeleton-line", 2, "width", "60px"]], template: function SkeletonLoaderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelementContainerStart(1, 1);
            i0.ɵɵtemplate(2, SkeletonLoaderComponent_ng_container_2_Template, 2, 1, "ng-container", 2)(3, SkeletonLoaderComponent_div_3_Template, 1, 4, "div", 3)(4, SkeletonLoaderComponent_ng_container_4_Template, 6, 0, "ng-container", 2)(5, SkeletonLoaderComponent_div_5_Template, 1, 0, "div", 4)(6, SkeletonLoaderComponent_ng_container_6_Template, 11, 0, "ng-container", 2)(7, SkeletonLoaderComponent_ng_container_7_Template, 2, 1, "ng-container", 2);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵstyleProp("width", ctx.width)("height", ctx.height);
            i0.ɵɵproperty("ngClass", "skeleton-loader--" + ctx.variant);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitch", ctx.variant);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "text");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "circle");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "avatar");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "rect");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "card");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "table-row");
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgForOf, i1.NgSwitch, i1.NgSwitchCase], styles: [".skeleton-loader[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 12px;\n    }\n\n    .skeleton-line[_ngcontent-%COMP%], \n   .skeleton-circle[_ngcontent-%COMP%], \n   .skeleton-rect[_ngcontent-%COMP%] {\n      background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);\n      background-size: 200% 100%;\n      animation: _ngcontent-%COMP%_shimmer 1.5s infinite;\n      border-radius: 4px;\n    }\n\n    .skeleton-line[_ngcontent-%COMP%] {\n      height: 14px;\n      width: 100%;\n    }\n\n    .skeleton-circle[_ngcontent-%COMP%] {\n      border-radius: 50%;\n      flex-shrink: 0;\n    }\n\n    .skeleton-rect[_ngcontent-%COMP%] {\n      width: 100%;\n      height: 100%;\n      border-radius: 8px;\n    }\n\n    .skeleton-avatar[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n    }\n\n    .skeleton-avatar__text[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 6px;\n    }\n\n    .skeleton-card[_ngcontent-%COMP%] {\n      padding: 20px;\n      border-radius: 16px;\n      background: #ffffff;\n      border: 1px solid #e2e8f0;\n    }\n\n    .skeleton-card__header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      margin-bottom: 16px;\n    }\n\n    .skeleton-card__header-text[_ngcontent-%COMP%] {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      gap: 6px;\n    }\n\n    .skeleton-card__body[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 10px;\n    }\n\n    .skeleton-table-row[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 16px;\n      padding: 12px 0;\n      border-bottom: 1px solid #f1f5f9;\n    }\n\n    .skeleton-table-row[_ngcontent-%COMP%]:last-child {\n      border-bottom: none;\n    }\n\n    @keyframes _ngcontent-%COMP%_shimmer {\n      0% {\n        background-position: 200% 0;\n      }\n      100% {\n        background-position: -200% 0;\n      }\n    }\n\n    \n\n    .dark-theme[_nghost-%COMP%], .dark-theme   [_nghost-%COMP%] {\n      .skeleton-line,\n      .skeleton-circle,\n      .skeleton-rect {\n        background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);\n        background-size: 200% 100%;\n      }\n\n      .skeleton-card {\n        background: #1e293b;\n        border-color: #334155;\n      }\n\n      .skeleton-table-row {\n        border-bottom-color: #334155;\n      }\n    }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SkeletonLoaderComponent, [{
        type: Component,
        args: [{ selector: 'app-skeleton-loader', standalone: true, imports: [CommonModule], template: "\n    <div class=\"skeleton-loader\" [ngClass]=\"'skeleton-loader--' + variant\" [style.width]=\"width\" [style.height]=\"height\">\n      <ng-container [ngSwitch]=\"variant\">\n        <!-- Text lines -->\n        <ng-container *ngSwitchCase=\"'text'\">\n          <div class=\"skeleton-line\" *ngFor=\"let _ of lines\" [style.width]=\"getLineWidth(_)\"></div>\n        </ng-container>\n\n        <!-- Circle (avatar placeholder) -->\n        <div *ngSwitchCase=\"'circle'\" class=\"skeleton-circle\" [style.width]=\"size\" [style.height]=\"size\"></div>\n\n        <!-- Avatar with text -->\n        <ng-container *ngSwitchCase=\"'avatar'\">\n          <div class=\"skeleton-avatar\">\n            <div class=\"skeleton-circle\" style=\"width: 40px; height: 40px;\"></div>\n            <div class=\"skeleton-avatar__text\">\n              <div class=\"skeleton-line\" style=\"width: 120px;\"></div>\n              <div class=\"skeleton-line\" style=\"width: 80px; height: 10px;\"></div>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- Rectangle -->\n        <div *ngSwitchCase=\"'rect'\" class=\"skeleton-rect\"></div>\n\n        <!-- Card -->\n        <ng-container *ngSwitchCase=\"'card'\">\n          <div class=\"skeleton-card\">\n            <div class=\"skeleton-card__header\">\n              <div class=\"skeleton-circle\" style=\"width: 48px; height: 48px;\"></div>\n              <div class=\"skeleton-card__header-text\">\n                <div class=\"skeleton-line\" style=\"width: 60%;\"></div>\n                <div class=\"skeleton-line\" style=\"width: 40%; height: 10px;\"></div>\n              </div>\n            </div>\n            <div class=\"skeleton-card__body\">\n              <div class=\"skeleton-line\"></div>\n              <div class=\"skeleton-line\" style=\"width: 80%;\"></div>\n              <div class=\"skeleton-line\" style=\"width: 60%;\"></div>\n            </div>\n          </div>\n        </ng-container>\n\n        <!-- Table row -->\n        <ng-container *ngSwitchCase=\"'table-row'\">\n          <div class=\"skeleton-table-row\" *ngFor=\"let _ of lines\">\n            <div class=\"skeleton-circle\" style=\"width: 32px; height: 32px;\"></div>\n            <div class=\"skeleton-line\" style=\"width: 150px;\"></div>\n            <div class=\"skeleton-line\" style=\"width: 100px;\"></div>\n            <div class=\"skeleton-line\" style=\"width: 80px;\"></div>\n            <div class=\"skeleton-line\" style=\"width: 60px;\"></div>\n          </div>\n        </ng-container>\n      </ng-container>\n    </div>\n  ", styles: ["\n    .skeleton-loader {\n      display: flex;\n      flex-direction: column;\n      gap: 12px;\n    }\n\n    .skeleton-line,\n    .skeleton-circle,\n    .skeleton-rect {\n      background: linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%);\n      background-size: 200% 100%;\n      animation: shimmer 1.5s infinite;\n      border-radius: 4px;\n    }\n\n    .skeleton-line {\n      height: 14px;\n      width: 100%;\n    }\n\n    .skeleton-circle {\n      border-radius: 50%;\n      flex-shrink: 0;\n    }\n\n    .skeleton-rect {\n      width: 100%;\n      height: 100%;\n      border-radius: 8px;\n    }\n\n    .skeleton-avatar {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n    }\n\n    .skeleton-avatar__text {\n      display: flex;\n      flex-direction: column;\n      gap: 6px;\n    }\n\n    .skeleton-card {\n      padding: 20px;\n      border-radius: 16px;\n      background: #ffffff;\n      border: 1px solid #e2e8f0;\n    }\n\n    .skeleton-card__header {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      margin-bottom: 16px;\n    }\n\n    .skeleton-card__header-text {\n      flex: 1;\n      display: flex;\n      flex-direction: column;\n      gap: 6px;\n    }\n\n    .skeleton-card__body {\n      display: flex;\n      flex-direction: column;\n      gap: 10px;\n    }\n\n    .skeleton-table-row {\n      display: flex;\n      align-items: center;\n      gap: 16px;\n      padding: 12px 0;\n      border-bottom: 1px solid #f1f5f9;\n    }\n\n    .skeleton-table-row:last-child {\n      border-bottom: none;\n    }\n\n    @keyframes shimmer {\n      0% {\n        background-position: 200% 0;\n      }\n      100% {\n        background-position: -200% 0;\n      }\n    }\n\n    /* Dark mode support */\n    :host-context(.dark-theme) {\n      .skeleton-line,\n      .skeleton-circle,\n      .skeleton-rect {\n        background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);\n        background-size: 200% 100%;\n      }\n\n      .skeleton-card {\n        background: #1e293b;\n        border-color: #334155;\n      }\n\n      .skeleton-table-row {\n        border-bottom-color: #334155;\n      }\n    }\n  "] }]
    }], null, { variant: [{
            type: Input
        }], width: [{
            type: Input
        }], height: [{
            type: Input
        }], size: [{
            type: Input
        }], count: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SkeletonLoaderComponent, { className: "SkeletonLoaderComponent", filePath: "src/app/shared/components/skeleton-loader/skeleton-loader.component.ts", lineNumber: 13 }); })();
