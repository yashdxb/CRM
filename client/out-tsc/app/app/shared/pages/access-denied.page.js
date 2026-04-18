import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '../../core/breadcrumbs';
import * as i0 from "@angular/core";
export class AccessDeniedPage {
    route = inject(ActivatedRoute);
    moduleName = computed(() => this.route.snapshot.queryParamMap.get('module') ?? 'This area', ...(ngDevMode ? [{ debugName: "moduleName" }] : []));
    permissionKey = computed(() => this.route.snapshot.queryParamMap.get('permission') ?? 'unknown.permission', ...(ngDevMode ? [{ debugName: "permissionKey" }] : []));
    static ɵfac = function AccessDeniedPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccessDeniedPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccessDeniedPage, selectors: [["app-access-denied-page"]], decls: 24, vars: 2, consts: [[1, "page-background", "access-denied-page"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "glass-card", "denied-card"], [1, "denied-kicker"], [1, "hero-title"], [1, "hero-subtitle"], [1, "details"], [1, "actions"], ["routerLink", "/app/dashboard", 1, "crm-button", "crm-button--primary"], ["routerLink", "/app/settings/users", 1, "crm-button", "crm-button--ghost"]], template: function AccessDeniedPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "app-breadcrumbs");
            i0.ɵɵelementStart(5, "section", 4)(6, "span", 5);
            i0.ɵɵtext(7, "Permission Boundary");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "h1", 6);
            i0.ɵɵtext(9, "Access denied");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "p", 7);
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 8)(13, "p")(14, "strong");
            i0.ɵɵtext(15, "Required permission:");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "p");
            i0.ɵɵtext(18, "Ask an administrator to update your role or assign the correct permission pack.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "div", 9)(20, "a", 10);
            i0.ɵɵtext(21, "Back to Dashboard");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "a", 11);
            i0.ɵɵtext(23, "Review Access");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵtextInterpolate1(" You are signed in, but you do not have permission to open ", ctx.moduleName(), ". ");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", ctx.permissionKey());
        } }, dependencies: [CommonModule, RouterLink, BreadcrumbsComponent], styles: [".access-denied-page[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 1rem;\n}\n\n.denied-card[_ngcontent-%COMP%] {\n  max-width: 760px;\n  margin: 0 auto;\n  padding: 1.5rem;\n  display: grid;\n  gap: 1rem;\n}\n\n.denied-kicker[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: var(--crm-accent-600, #2563eb);\n}\n\n.details[_ngcontent-%COMP%] {\n  color: var(--crm-text-muted, #6b7280);\n}\n\n.details[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccessDeniedPage, [{
        type: Component,
        args: [{ selector: 'app-access-denied-page', standalone: true, imports: [CommonModule, RouterLink, BreadcrumbsComponent], template: "<section class=\"page-background access-denied-page\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <section class=\"glass-card denied-card\">\n    <span class=\"denied-kicker\">Permission Boundary</span>\n    <h1 class=\"hero-title\">Access denied</h1>\n    <p class=\"hero-subtitle\">\n      You are signed in, but you do not have permission to open {{ moduleName() }}.\n    </p>\n\n    <div class=\"details\">\n      <p><strong>Required permission:</strong> {{ permissionKey() }}</p>\n      <p>Ask an administrator to update your role or assign the correct permission pack.</p>\n    </div>\n\n    <div class=\"actions\">\n      <a class=\"crm-button crm-button--primary\" routerLink=\"/app/dashboard\">Back to Dashboard</a>\n      <a class=\"crm-button crm-button--ghost\" routerLink=\"/app/settings/users\">Review Access</a>\n    </div>\n  </section>\n</section>\n", styles: [".access-denied-page {\n  display: grid;\n  gap: 1rem;\n}\n\n.denied-card {\n  max-width: 760px;\n  margin: 0 auto;\n  padding: 1.5rem;\n  display: grid;\n  gap: 1rem;\n}\n\n.denied-kicker {\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.1em;\n  text-transform: uppercase;\n  color: var(--crm-accent-600, #2563eb);\n}\n\n.details {\n  color: var(--crm-text-muted, #6b7280);\n}\n\n.details p {\n  margin: 0;\n}\n\n.actions {\n  display: flex;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccessDeniedPage, { className: "AccessDeniedPage", filePath: "src/app/shared/pages/access-denied.page.ts", lineNumber: 14 }); })();
