import { Component, inject, computed } from '@angular/core';
import { NgIf } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbService } from './breadcrumb.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/breadcrumb";
function BreadcrumbsComponent_p_breadcrumb_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-breadcrumb", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("model", ctx_r0.items())("home", ctx_r0.home);
} }
export class BreadcrumbsComponent {
    breadcrumbService = inject(BreadcrumbService);
    home = {
        icon: 'pi pi-home',
        routerLink: ['/app/dashboard']
    };
    items = computed(() => {
        // Skip the first breadcrumb if it's "Home" since we have a home icon
        const crumbs = this.breadcrumbService.breadcrumbs();
        const filteredCrumbs = crumbs.filter(c => c.label !== 'Home');
        return filteredCrumbs.map(crumb => ({
            label: crumb.label,
            icon: crumb.icon ? `pi ${crumb.icon}` : undefined,
            routerLink: crumb.isActive ? undefined : [crumb.path]
        }));
    }, ...(ngDevMode ? [{ debugName: "items" }] : []));
    static ɵfac = function BreadcrumbsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BreadcrumbsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BreadcrumbsComponent, selectors: [["app-breadcrumbs"]], decls: 1, vars: 1, consts: [["styleClass", "crm-breadcrumb", 3, "model", "home", 4, "ngIf"], ["styleClass", "crm-breadcrumb", 3, "model", "home"]], template: function BreadcrumbsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, BreadcrumbsComponent_p_breadcrumb_0_Template, 1, 2, "p-breadcrumb", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.breadcrumbService.breadcrumbs().length);
        } }, dependencies: [NgIf, BreadcrumbModule, i1.Breadcrumb], styles: ["[_nghost-%COMP%] {\n      display: block;\n      margin-bottom: var(--md-space-2, 0.5rem);\n    }\n\n    [_nghost-%COMP%]     .crm-breadcrumb {\n      \n\n      background: rgba(255, 255, 255, 0.6);\n      backdrop-filter: blur(12px);\n      -webkit-backdrop-filter: blur(12px);\n      border: 1px solid rgba(255, 255, 255, 0.3);\n      border-radius: 12px;\n      padding: 0.625rem 1rem;\n      box-shadow: \n        0 2px 8px rgba(0, 0, 0, 0.04),\n        inset 0 1px 0 rgba(255, 255, 255, 0.6);\n    }\n\n    [_nghost-%COMP%]     .crm-breadcrumb .p-breadcrumb-list {\n      display: flex;\n      align-items: center;\n      gap: 0.25rem;\n      margin: 0;\n      padding: 0;\n    }\n\n    [_nghost-%COMP%]     .crm-breadcrumb .p-breadcrumb-item {\n      display: flex;\n      align-items: center;\n    }\n\n    [_nghost-%COMP%]     .crm-breadcrumb .p-breadcrumb-item-link {\n      display: flex;\n      align-items: center;\n      gap: 0.375rem;\n      color: var(--text-subtle, #64748b);\n      text-decoration: none;\n      font-size: 0.8125rem;\n      font-weight: 500;\n      padding: 0.25rem 0.5rem;\n      border-radius: 6px;\n      transition: all 0.15s ease;\n    }\n\n    [_nghost-%COMP%]     .crm-breadcrumb .p-breadcrumb-item-link:hover {\n      color: var(--brand-primary, #6366f1);\n      background: rgba(99, 102, 241, 0.08);\n    }\n\n    [_nghost-%COMP%]     .crm-breadcrumb .p-breadcrumb-item:last-child .p-breadcrumb-item-link {\n      color: var(--text-strong, #1e293b);\n      font-weight: 600;\n      pointer-events: none;\n    }\n\n    [_nghost-%COMP%]     .crm-breadcrumb .p-breadcrumb-separator {\n      color: var(--text-subtle, #94a3b8);\n      margin: 0 0.125rem;\n      font-size: 0.75rem;\n    }\n\n    [_nghost-%COMP%]     .crm-breadcrumb .p-breadcrumb-home-icon {\n      color: var(--text-subtle, #64748b);\n      font-size: 0.875rem;\n    }\n\n    [_nghost-%COMP%]     .crm-breadcrumb .p-breadcrumb-home:hover .p-breadcrumb-home-icon {\n      color: var(--brand-primary, #6366f1);\n    }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BreadcrumbsComponent, [{
        type: Component,
        args: [{ selector: 'app-breadcrumbs', standalone: true, imports: [NgIf, BreadcrumbModule], template: "\n    <p-breadcrumb \n      *ngIf=\"breadcrumbService.breadcrumbs().length\"\n      [model]=\"items()\" \n      [home]=\"home\"\n      styleClass=\"crm-breadcrumb\"\n    />\n  ", styles: ["\n    :host {\n      display: block;\n      margin-bottom: var(--md-space-2, 0.5rem);\n    }\n\n    :host ::ng-deep .crm-breadcrumb {\n      /* Glass morphism background */\n      background: rgba(255, 255, 255, 0.6);\n      backdrop-filter: blur(12px);\n      -webkit-backdrop-filter: blur(12px);\n      border: 1px solid rgba(255, 255, 255, 0.3);\n      border-radius: 12px;\n      padding: 0.625rem 1rem;\n      box-shadow: \n        0 2px 8px rgba(0, 0, 0, 0.04),\n        inset 0 1px 0 rgba(255, 255, 255, 0.6);\n    }\n\n    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-list {\n      display: flex;\n      align-items: center;\n      gap: 0.25rem;\n      margin: 0;\n      padding: 0;\n    }\n\n    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-item {\n      display: flex;\n      align-items: center;\n    }\n\n    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-item-link {\n      display: flex;\n      align-items: center;\n      gap: 0.375rem;\n      color: var(--text-subtle, #64748b);\n      text-decoration: none;\n      font-size: 0.8125rem;\n      font-weight: 500;\n      padding: 0.25rem 0.5rem;\n      border-radius: 6px;\n      transition: all 0.15s ease;\n    }\n\n    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-item-link:hover {\n      color: var(--brand-primary, #6366f1);\n      background: rgba(99, 102, 241, 0.08);\n    }\n\n    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-item:last-child .p-breadcrumb-item-link {\n      color: var(--text-strong, #1e293b);\n      font-weight: 600;\n      pointer-events: none;\n    }\n\n    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-separator {\n      color: var(--text-subtle, #94a3b8);\n      margin: 0 0.125rem;\n      font-size: 0.75rem;\n    }\n\n    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-home-icon {\n      color: var(--text-subtle, #64748b);\n      font-size: 0.875rem;\n    }\n\n    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-home:hover .p-breadcrumb-home-icon {\n      color: var(--brand-primary, #6366f1);\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BreadcrumbsComponent, { className: "BreadcrumbsComponent", filePath: "src/app/core/breadcrumbs/breadcrumbs.component.ts", lineNumber: 14 }); })();
