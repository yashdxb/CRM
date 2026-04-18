import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppToastService } from '../core/app-toast.service';
import * as i0 from "@angular/core";
function AppToastComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelement(1, "i");
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const alert_r1 = ctx.ngIf;
    i0.ɵɵproperty("ngClass", "app-inline-toast--" + alert_r1.tone);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(alert_r1.tone === "success" ? "pi pi-check-circle" : "pi pi-exclamation-triangle");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(alert_r1.message);
} }
export class AppToastComponent {
    toastService = inject(AppToastService);
    toast = this.toastService.toastState;
    static ɵfac = function AppToastComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppToastComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppToastComponent, selectors: [["app-toast"]], decls: 1, vars: 1, consts: [["class", "app-inline-toast", 3, "ngClass", 4, "ngIf"], [1, "app-inline-toast", 3, "ngClass"]], template: function AppToastComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AppToastComponent_div_0_Template, 4, 4, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.toast());
        } }, dependencies: [NgIf, NgClass], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppToastComponent, [{
        type: Component,
        args: [{ selector: 'app-toast', standalone: true, imports: [NgIf, NgClass], template: "\n    <div class=\"app-inline-toast\" *ngIf=\"toast() as alert\" [ngClass]=\"'app-inline-toast--' + alert.tone\">\n      <i [class]=\"alert.tone === 'success' ? 'pi pi-check-circle' : 'pi pi-exclamation-triangle'\"></i>\n      <span>{{ alert.message }}</span>\n    </div>\n  " }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppToastComponent, { className: "AppToastComponent", filePath: "src/app/shared/app-toast.component.ts", lineNumber: 11 }); })();
