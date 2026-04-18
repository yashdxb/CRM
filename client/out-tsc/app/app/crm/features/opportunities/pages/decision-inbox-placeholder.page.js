import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
export class DecisionInboxPlaceholderPage {
    route = inject(ActivatedRoute);
    title = computed(() => this.route.snapshot.data['title'] ?? 'Decision Inbox', ...(ngDevMode ? [{ debugName: "title" }] : []));
    heading = computed(() => this.route.snapshot.data['heading'] ?? 'Coming next', ...(ngDevMode ? [{ debugName: "heading" }] : []));
    description = computed(() => this.route.snapshot.data['description'] ??
        'This child view is reserved for the Decision Inbox platform rollout.', ...(ngDevMode ? [{ debugName: "description" }] : []));
    static ɵfac = function DecisionInboxPlaceholderPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DecisionInboxPlaceholderPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DecisionInboxPlaceholderPage, selectors: [["app-decision-inbox-placeholder-page"]], decls: 13, vars: 3, consts: [[1, "decision-placeholder"], [1, "decision-placeholder__card"], [1, "decision-placeholder__badge"], [1, "decision-placeholder__actions"], ["pButton", "", "routerLink", "/app/decisions/pending-action", 1, "placeholder-btn"], [1, "pi", "pi-arrow-left"]], template: function DecisionInboxPlaceholderPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p");
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 3)(9, "a", 4);
            i0.ɵɵelement(10, "i", 5);
            i0.ɵɵelementStart(11, "span");
            i0.ɵɵtext(12, "Back to Inbox");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.title());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.heading());
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.description());
        } }, dependencies: [CommonModule, RouterLink, ButtonModule, i1.ButtonDirective], styles: [".decision-placeholder[_ngcontent-%COMP%] {\n      padding: 0.35rem 0 0;\n    }\n    .decision-placeholder__card[_ngcontent-%COMP%] {\n      border-radius: 18px;\n      border: 1px solid rgba(148, 163, 184, 0.16);\n      background:\n        linear-gradient(135deg, rgba(255,255,255,0.92), rgba(248,250,252,0.86)),\n        radial-gradient(circle at 10% 0%, rgba(59,130,246,0.08), transparent 55%);\n      box-shadow: inset 0 1px 0 rgba(255,255,255,0.72), 0 14px 36px rgba(15,23,42,0.05);\n      padding: 1.1rem 1.15rem;\n      color: #0f172a;\n    }\n    .decision-placeholder__badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.3rem 0.55rem;\n      border-radius: 999px;\n      border: 1px solid rgba(96,165,250,0.22);\n      background: rgba(239, 246, 255, 0.85);\n      color: #1d4ed8;\n      font-weight: 700;\n      font-size: 0.75rem;\n      margin-bottom: 0.6rem;\n    }\n    h1[_ngcontent-%COMP%] {\n      margin: 0 0 0.35rem;\n      font-size: 1.15rem;\n      line-height: 1.2;\n    }\n    p[_ngcontent-%COMP%] {\n      margin: 0;\n      color: #475569;\n      max-width: 60ch;\n      line-height: 1.45;\n    }\n    .decision-placeholder__actions[_ngcontent-%COMP%] {\n      margin-top: 0.9rem;\n    }\n    [_nghost-%COMP%]     .placeholder-btn.p-button {\n      border-radius: 12px;\n      border: 1px solid rgba(148, 163, 184, 0.26);\n      background: rgba(255,255,255,0.8);\n      color: #334155;\n    }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DecisionInboxPlaceholderPage, [{
        type: Component,
        args: [{ selector: 'app-decision-inbox-placeholder-page', standalone: true, imports: [CommonModule, RouterLink, ButtonModule], template: `
    <section class="decision-placeholder">
      <div class="decision-placeholder__card">
        <div class="decision-placeholder__badge">{{ title() }}</div>
        <h1>{{ heading() }}</h1>
        <p>{{ description() }}</p>
        <div class="decision-placeholder__actions">
          <a pButton class="placeholder-btn" routerLink="/app/decisions/pending-action">
            <i class="pi pi-arrow-left"></i>
            <span>Back to Inbox</span>
          </a>
        </div>
      </div>
    </section>
  `, styles: ["\n    .decision-placeholder {\n      padding: 0.35rem 0 0;\n    }\n    .decision-placeholder__card {\n      border-radius: 18px;\n      border: 1px solid rgba(148, 163, 184, 0.16);\n      background:\n        linear-gradient(135deg, rgba(255,255,255,0.92), rgba(248,250,252,0.86)),\n        radial-gradient(circle at 10% 0%, rgba(59,130,246,0.08), transparent 55%);\n      box-shadow: inset 0 1px 0 rgba(255,255,255,0.72), 0 14px 36px rgba(15,23,42,0.05);\n      padding: 1.1rem 1.15rem;\n      color: #0f172a;\n    }\n    .decision-placeholder__badge {\n      display: inline-flex;\n      align-items: center;\n      padding: 0.3rem 0.55rem;\n      border-radius: 999px;\n      border: 1px solid rgba(96,165,250,0.22);\n      background: rgba(239, 246, 255, 0.85);\n      color: #1d4ed8;\n      font-weight: 700;\n      font-size: 0.75rem;\n      margin-bottom: 0.6rem;\n    }\n    h1 {\n      margin: 0 0 0.35rem;\n      font-size: 1.15rem;\n      line-height: 1.2;\n    }\n    p {\n      margin: 0;\n      color: #475569;\n      max-width: 60ch;\n      line-height: 1.45;\n    }\n    .decision-placeholder__actions {\n      margin-top: 0.9rem;\n    }\n    :host ::ng-deep .placeholder-btn.p-button {\n      border-radius: 12px;\n      border: 1px solid rgba(148, 163, 184, 0.26);\n      background: rgba(255,255,255,0.8);\n      color: #334155;\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DecisionInboxPlaceholderPage, { className: "DecisionInboxPlaceholderPage", filePath: "src/app/crm/features/opportunities/pages/decision-inbox-placeholder.page.ts", lineNumber: 73 }); })();
