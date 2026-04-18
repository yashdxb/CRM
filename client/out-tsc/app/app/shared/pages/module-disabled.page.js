import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../core/breadcrumbs';
import * as i0 from "@angular/core";
export class ModuleDisabledPage {
    route = inject(ActivatedRoute);
    featureKey = computed(() => this.route.snapshot.queryParamMap.get('feature') ?? 'unknown.feature', ...(ngDevMode ? [{ debugName: "featureKey" }] : []));
    moduleName = computed(() => this.route.snapshot.queryParamMap.get('module') ?? 'This module', ...(ngDevMode ? [{ debugName: "moduleName" }] : []));
    static ɵfac = function ModuleDisabledPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ModuleDisabledPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ModuleDisabledPage, selectors: [["app-module-disabled-page"]], decls: 22, vars: 2, consts: [[1, "page-background", "module-disabled-page"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "glass-card", "disabled-card"], [1, "hero-title"], [1, "hero-subtitle"], [1, "details"], [1, "actions"], ["routerLink", "/app/dashboard", 1, "crm-button", "crm-button--primary"], ["routerLink", "/app/settings/tenants", 1, "crm-button", "crm-button--ghost"]], template: function ModuleDisabledPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "app-breadcrumbs");
            i0.ɵɵelementStart(5, "section", 4)(6, "h1", 5);
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p", 6);
            i0.ɵɵtext(9, " This tenant does not currently have access to this module. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 7)(11, "p")(12, "strong");
            i0.ɵɵtext(13, "Feature key:");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "p");
            i0.ɵɵtext(16, "Ask an administrator to enable this feature for your tenant and restart the API service.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div", 8)(18, "a", 9);
            i0.ɵɵtext(19, "Back to Dashboard");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "a", 10);
            i0.ɵɵtext(21, "Open Tenant Configuration");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1("", ctx.moduleName(), " is disabled");
            i0.ɵɵadvance(7);
            i0.ɵɵtextInterpolate1(" ", ctx.featureKey());
        } }, dependencies: [CommonModule, RouterLink, BreadcrumbsComponent], styles: [".module-disabled-page[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n\n.disabled-card[_ngcontent-%COMP%] {\n  max-width: 760px;\n  margin: 0 auto;\n  padding: 1.5rem;\n  display: grid;\n  gap: 1rem;\n}\n\n.details[_ngcontent-%COMP%] {\n  color: var(--crm-text-muted, #6b7280);\n}\n\n.details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ModuleDisabledPage, [{
        type: Component,
        args: [{ selector: 'app-module-disabled-page', standalone: true, imports: [CommonModule, RouterLink, BreadcrumbsComponent], template: "<section class=\"page-background module-disabled-page\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"glass-card disabled-card\">\n    <h1 class=\"hero-title\">{{ moduleName() }} is disabled</h1>\n    <p class=\"hero-subtitle\">\n      This tenant does not currently have access to this module.\n    </p>\n\n    <div class=\"details\">\n      <p><strong>Feature key:</strong> {{ featureKey() }}</p>\n      <p>Ask an administrator to enable this feature for your tenant and restart the API service.</p>\n    </div>\n\n    <div class=\"actions\">\n      <a class=\"crm-button crm-button--primary\" routerLink=\"/app/dashboard\">Back to Dashboard</a>\n      <a class=\"crm-button crm-button--ghost\" routerLink=\"/app/settings/tenants\">Open Tenant Configuration</a>\n    </div>\n  </section>\n</section>\n", styles: [".module-disabled-page {\n  display: grid;\n  gap: 1rem;\n}\n\n.disabled-card {\n  max-width: 760px;\n  margin: 0 auto;\n  padding: 1.5rem;\n  display: grid;\n  gap: 1rem;\n}\n\n.details {\n  color: var(--crm-text-muted, #6b7280);\n}\n\n.details p {\n  margin: 0;\n}\n\n.actions {\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ModuleDisabledPage, { className: "ModuleDisabledPage", filePath: "src/app/shared/pages/module-disabled.page.ts", lineNumber: 14 }); })();
