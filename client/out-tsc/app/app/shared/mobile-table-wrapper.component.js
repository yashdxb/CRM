import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
const _c0 = ["*"];
/**
 * Mobile Table Wrapper Component
 *
 * Automatically adapts PrimeNG DataTable display for mobile:
 * - Shows as scrollable table on desktop/tablet
 * - Shows as card-based list on mobile
 * - Maintains glass UI aesthetic on all breakpoints
 *
 * Usage:
 * <app-mobile-table-wrapper [isMobile]="device.isMobile()">
 *   <p-table>...</p-table>
 * </app-mobile-table-wrapper>
 */
export class MobileTableWrapperComponent {
    isMobileView = false;
    static ɵfac = function MobileTableWrapperComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MobileTableWrapperComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MobileTableWrapperComponent, selectors: [["app-mobile-table-wrapper"]], inputs: { isMobileView: "isMobileView" }, ngContentSelectors: _c0, decls: 2, vars: 2, consts: [[1, "mobile-table-wrapper"]], template: function MobileTableWrapperComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵdomElementStart(0, "div", 0);
            i0.ɵɵprojection(1);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("mobile", ctx.isMobileView);
        } }, dependencies: [CommonModule], styles: [".mobile-table-wrapper[_ngcontent-%COMP%] {\n      width: 100%;\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch;\n    }\n\n    .mobile-table-wrapper.mobile[_ngcontent-%COMP%] {\n      overflow-x: visible;\n    }\n\n    \n\n    .mobile-table-wrapper[_ngcontent-%COMP%]     {\n      .p-datatable {\n        width: 100%;\n      }\n\n      \n\n      @media (max-width: 768px) {\n        overflow-x: auto;\n        display: block;\n        \n        .p-datatable {\n          min-width: 100%;\n        }\n\n        \n\n        .p-datatable-thead > tr {\n          display: grid;\n          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n          gap: 0.5rem;\n        }\n\n        .p-datatable-tbody > tr {\n          display: grid;\n          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n          gap: 0.5rem;\n          page-break-inside: avoid;\n          break-inside: avoid;\n          margin-bottom: 1rem;\n          padding: 1rem;\n          background: rgba(255, 255, 255, 0.85);\n          backdrop-filter: blur(20px);\n          border: 1px solid rgba(255, 255, 255, 0.3);\n          border-radius: 12px;\n          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);\n        }\n\n        \n\n        .p-datatable-tbody > tr > td::before {\n          content: attr(data-label);\n          font-weight: 600;\n          font-size: 0.75rem;\n          color: #667eea;\n          text-transform: uppercase;\n          letter-spacing: 0.05em;\n          display: block;\n          margin-bottom: 0.25rem;\n        }\n      }\n    }"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MobileTableWrapperComponent, [{
        type: Component,
        args: [{ selector: 'app-mobile-table-wrapper', standalone: true, imports: [CommonModule], template: `
    <div class="mobile-table-wrapper" [class.mobile]="isMobileView">
      <ng-content></ng-content>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .mobile-table-wrapper {\n      width: 100%;\n      overflow-x: auto;\n      -webkit-overflow-scrolling: touch;\n    }\n\n    .mobile-table-wrapper.mobile {\n      overflow-x: visible;\n    }\n\n    /* Ensure table horizontal scrolling on mobile */\n    .mobile-table-wrapper ::ng-deep {\n      .p-datatable {\n        width: 100%;\n      }\n\n      /* On mobile, make table scrollable */\n      @media (max-width: 768px) {\n        overflow-x: auto;\n        display: block;\n        \n        .p-datatable {\n          min-width: 100%;\n        }\n\n        /* Stack table headers as cards */\n        .p-datatable-thead > tr {\n          display: grid;\n          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n          gap: 0.5rem;\n        }\n\n        .p-datatable-tbody > tr {\n          display: grid;\n          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n          gap: 0.5rem;\n          page-break-inside: avoid;\n          break-inside: avoid;\n          margin-bottom: 1rem;\n          padding: 1rem;\n          background: rgba(255, 255, 255, 0.85);\n          backdrop-filter: blur(20px);\n          border: 1px solid rgba(255, 255, 255, 0.3);\n          border-radius: 12px;\n          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);\n        }\n\n        /* Hide column headers on mobile, show as label */\n        .p-datatable-tbody > tr > td::before {\n          content: attr(data-label);\n          font-weight: 600;\n          font-size: 0.75rem;\n          color: #667eea;\n          text-transform: uppercase;\n          letter-spacing: 0.05em;\n          display: block;\n          margin-bottom: 0.25rem;\n        }\n      }\n    }\n  "] }]
    }], null, { isMobileView: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MobileTableWrapperComponent, { className: "MobileTableWrapperComponent", filePath: "src/app/shared/mobile-table-wrapper.component.ts", lineNumber: 90 }); })();
