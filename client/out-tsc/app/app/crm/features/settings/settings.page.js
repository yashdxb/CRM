import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { BreadcrumbsComponent } from '../../../core/breadcrumbs';
import * as i0 from "@angular/core";
import * as i1 from "primeng/card";
export class SettingsPage {
    static ɵfac = function SettingsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SettingsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SettingsPage, selectors: [["app-settings-page"]], decls: 4, vars: 0, consts: [["header", "Settings (coming soon)"]], template: function SettingsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "app-breadcrumbs");
            i0.ɵɵelementStart(1, "p-card", 0)(2, "p");
            i0.ɵɵtext(3, "Settings and customization will live here in a future drop.");
            i0.ɵɵelementEnd()();
        } }, dependencies: [CardModule, i1.Card, BreadcrumbsComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SettingsPage, [{
        type: Component,
        args: [{ selector: 'app-settings-page', standalone: true, imports: [CardModule, BreadcrumbsComponent], template: "\n    <app-breadcrumbs></app-breadcrumbs>\n    <p-card header=\"Settings (coming soon)\">\n      <p>Settings and customization will live here in a future drop.</p>\n    </p-card>\n  " }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SettingsPage, { className: "SettingsPage", filePath: "src/app/crm/features/settings/settings.page.ts", lineNumber: 11 }); })();
