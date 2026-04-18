import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function DecisionInboxShellPage_a_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 3);
    i0.ɵɵelement(1, "i", 4);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r1.path);
    i0.ɵɵadvance();
    i0.ɵɵclassMap(item_r1.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.label);
} }
export class DecisionInboxShellPage {
    tokenContext = readTokenContext();
    visibleNavItems = computed(() => {
        const payload = this.tokenContext?.payload ?? null;
        const canApprove = tokenHasPermission(payload, PERMISSION_KEYS.opportunitiesApprovalsApprove)
            || tokenHasPermission(payload, PERMISSION_KEYS.opportunitiesApprovalsOverride);
        const canAdmin = tokenHasPermission(payload, PERMISSION_KEYS.administrationView);
        const items = [
            { label: 'Pending Action', path: '/app/decisions/pending-action', icon: 'pi-inbox', visible: true },
            { label: 'Policies & SLA', path: '/app/decisions/policies', icon: 'pi-shield', visible: canAdmin || canApprove },
            { label: 'Decision History', path: '/app/decisions/audit', icon: 'pi-history', visible: canApprove || canAdmin }
        ];
        return items.filter(i => i.visible);
    }, ...(ngDevMode ? [{ debugName: "visibleNavItems" }] : []));
    static ɵfac = function DecisionInboxShellPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DecisionInboxShellPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DecisionInboxShellPage, selectors: [["app-decision-inbox-shell-page"]], decls: 4, vars: 1, consts: [[1, "decision-shell-nav"], [1, "decision-shell-nav__inner"], ["routerLinkActive", "is-active", "class", "decision-shell-nav__item", 3, "routerLink", 4, "ngFor", "ngForOf"], ["routerLinkActive", "is-active", 1, "decision-shell-nav__item", 3, "routerLink"], [1, "pi"]], template: function DecisionInboxShellPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵtemplate(2, DecisionInboxShellPage_a_2_Template, 4, 4, "a", 2);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(3, "router-outlet");
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.visibleNavItems());
        } }, dependencies: [CommonModule, i1.NgForOf, RouterOutlet, RouterLink, RouterLinkActive], styles: ["[_nghost-%COMP%] {\n      display: block;\n    }\n\n    .decision-shell-nav[_ngcontent-%COMP%] {\n      margin-bottom: 0.85rem;\n    }\n\n    .decision-shell-nav__inner[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.55rem;\n      padding: 0.55rem;\n      border-radius: 16px;\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      background:\n        linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(248, 250, 252, 0.78)),\n        radial-gradient(circle at 12% 0%, rgba(59, 130, 246, 0.08), transparent 50%);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.7),\n        0 8px 20px rgba(15, 23, 42, 0.05);\n    }\n\n    .decision-shell-nav__item[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.45rem;\n      padding: 0.5rem 0.8rem;\n      border-radius: 12px;\n      border: 1px solid rgba(203, 213, 225, 0.65);\n      background: rgba(255, 255, 255, 0.75);\n      color: #334155;\n      text-decoration: none;\n      font-size: 0.86rem;\n      font-weight: 600;\n      transition: border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease, color 140ms ease;\n    }\n\n    .decision-shell-nav__item[_ngcontent-%COMP%]   .pi[_ngcontent-%COMP%] {\n      font-size: 0.82rem;\n      color: #64748b;\n    }\n\n    .decision-shell-nav__item[_ngcontent-%COMP%]:hover {\n      border-color: rgba(96, 165, 250, 0.35);\n      background: rgba(255, 255, 255, 0.92);\n      color: #0f172a;\n      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);\n    }\n\n    .decision-shell-nav__item.is-active[_ngcontent-%COMP%] {\n      border-color: rgba(59, 130, 246, 0.34);\n      background:\n        linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(14, 165, 233, 0.06)),\n        rgba(255, 255, 255, 0.92);\n      color: #0f172a;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.85),\n        0 8px 18px rgba(59, 130, 246, 0.10);\n    }\n\n    .decision-shell-nav__item.is-active[_ngcontent-%COMP%]   .pi[_ngcontent-%COMP%] {\n      color: #2563eb;\n    }\n\n    @media (max-width: 768px) {\n      .decision-shell-nav__inner[_ngcontent-%COMP%] {\n        gap: 0.45rem;\n        padding: 0.45rem;\n      }\n\n      .decision-shell-nav__item[_ngcontent-%COMP%] {\n        padding: 0.45rem 0.65rem;\n        font-size: 0.8rem;\n      }\n    }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DecisionInboxShellPage, [{
        type: Component,
        args: [{ selector: 'app-decision-inbox-shell-page', standalone: true, imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive], template: `
    <div class="decision-shell-nav">
      <div class="decision-shell-nav__inner">
        <a
          *ngFor="let item of visibleNavItems()"
          [routerLink]="item.path"
          routerLinkActive="is-active"
          class="decision-shell-nav__item"
        >
          <i class="pi" [class]="item.icon"></i>
          <span>{{ item.label }}</span>
        </a>
      </div>
    </div>

    <router-outlet />
  `, styles: ["\n    :host {\n      display: block;\n    }\n\n    .decision-shell-nav {\n      margin-bottom: 0.85rem;\n    }\n\n    .decision-shell-nav__inner {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.55rem;\n      padding: 0.55rem;\n      border-radius: 16px;\n      border: 1px solid rgba(148, 163, 184, 0.18);\n      background:\n        linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(248, 250, 252, 0.78)),\n        radial-gradient(circle at 12% 0%, rgba(59, 130, 246, 0.08), transparent 50%);\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.7),\n        0 8px 20px rgba(15, 23, 42, 0.05);\n    }\n\n    .decision-shell-nav__item {\n      display: inline-flex;\n      align-items: center;\n      gap: 0.45rem;\n      padding: 0.5rem 0.8rem;\n      border-radius: 12px;\n      border: 1px solid rgba(203, 213, 225, 0.65);\n      background: rgba(255, 255, 255, 0.75);\n      color: #334155;\n      text-decoration: none;\n      font-size: 0.86rem;\n      font-weight: 600;\n      transition: border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease, color 140ms ease;\n    }\n\n    .decision-shell-nav__item .pi {\n      font-size: 0.82rem;\n      color: #64748b;\n    }\n\n    .decision-shell-nav__item:hover {\n      border-color: rgba(96, 165, 250, 0.35);\n      background: rgba(255, 255, 255, 0.92);\n      color: #0f172a;\n      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.08);\n    }\n\n    .decision-shell-nav__item.is-active {\n      border-color: rgba(59, 130, 246, 0.34);\n      background:\n        linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(14, 165, 233, 0.06)),\n        rgba(255, 255, 255, 0.92);\n      color: #0f172a;\n      box-shadow:\n        inset 0 1px 0 rgba(255, 255, 255, 0.85),\n        0 8px 18px rgba(59, 130, 246, 0.10);\n    }\n\n    .decision-shell-nav__item.is-active .pi {\n      color: #2563eb;\n    }\n\n    @media (max-width: 768px) {\n      .decision-shell-nav__inner {\n        gap: 0.45rem;\n        padding: 0.45rem;\n      }\n\n      .decision-shell-nav__item {\n        padding: 0.45rem 0.65rem;\n        font-size: 0.8rem;\n      }\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DecisionInboxShellPage, { className: "DecisionInboxShellPage", filePath: "src/app/crm/features/opportunities/pages/decision-inbox-shell.page.ts", lineNumber: 114 }); })();
