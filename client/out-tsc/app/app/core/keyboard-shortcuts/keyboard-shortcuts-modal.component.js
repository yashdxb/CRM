import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ButtonModule } from 'primeng/button';
import { KeyboardShortcutsService } from './keyboard-shortcuts.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
function KeyboardShortcutsModalComponent_div_0_li_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "kbd");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const shortcut_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(shortcut_r3.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatKeys(shortcut_r3.keys));
} }
function KeyboardShortcutsModalComponent_div_0_li_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "kbd");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const shortcut_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(shortcut_r4.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatKeys(shortcut_r4.keys));
} }
function KeyboardShortcutsModalComponent_div_0_li_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li")(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "kbd");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const shortcut_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(shortcut_r5.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.formatKeys(shortcut_r5.keys));
} }
function KeyboardShortcutsModalComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵlistener("click", function KeyboardShortcutsModalComponent_div_0_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.shortcutsService.closeHelpModal()); });
    i0.ɵɵelementStart(1, "div", 2);
    i0.ɵɵlistener("click", function KeyboardShortcutsModalComponent_div_0_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "header", 3)(3, "h2");
    i0.ɵɵtext(4, "Keyboard Shortcuts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 4);
    i0.ɵɵlistener("click", function KeyboardShortcutsModalComponent_div_0_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.shortcutsService.closeHelpModal()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 5)(7, "section", 6)(8, "h3");
    i0.ɵɵtext(9, "Navigation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "p", 7);
    i0.ɵɵtext(11, "Press ");
    i0.ɵɵelementStart(12, "kbd");
    i0.ɵɵtext(13, "G");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(14, " then a letter");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "ul");
    i0.ɵɵtemplate(16, KeyboardShortcutsModalComponent_div_0_li_16_Template, 5, 2, "li", 8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(17, "section", 6)(18, "h3");
    i0.ɵɵtext(19, "Quick Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p", 7);
    i0.ɵɵtext(21, "Press ");
    i0.ɵɵelementStart(22, "kbd");
    i0.ɵɵtext(23, "N");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(24, " then a letter to create");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "ul");
    i0.ɵɵtemplate(26, KeyboardShortcutsModalComponent_div_0_li_26_Template, 5, 2, "li", 8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "section", 6)(28, "h3");
    i0.ɵɵtext(29, "General");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "ul")(31, "li")(32, "span");
    i0.ɵɵtext(33, "Open command palette");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "kbd");
    i0.ɵɵtext(35, "\u2318 K");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(36, KeyboardShortcutsModalComponent_div_0_li_36_Template, 5, 2, "li", 8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(37, "footer", 9)(38, "span");
    i0.ɵɵtext(39, "Press ");
    i0.ɵɵelementStart(40, "kbd");
    i0.ɵɵtext(41, "?");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(42, " anywhere to show this help");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("@fadeIn", undefined);
    i0.ɵɵadvance();
    i0.ɵɵproperty("@slideUp", undefined);
    i0.ɵɵadvance(15);
    i0.ɵɵproperty("ngForOf", ctx_r1.shortcutsService.getShortcutsByCategory("navigation"));
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngForOf", ctx_r1.shortcutsService.getShortcutsByCategory("actions"));
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngForOf", ctx_r1.shortcutsService.getShortcutsByCategory("general"));
} }
export class KeyboardShortcutsModalComponent {
    shortcutsService = inject(KeyboardShortcutsService);
    formatKeys(keys) {
        return keys.toUpperCase().replace(' ', ' → ');
    }
    static ɵfac = function KeyboardShortcutsModalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KeyboardShortcutsModalComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KeyboardShortcutsModalComponent, selectors: [["app-keyboard-shortcuts-modal"]], decls: 1, vars: 1, consts: [["class", "shortcuts-backdrop", 3, "click", 4, "ngIf"], [1, "shortcuts-backdrop", 3, "click"], [1, "shortcuts-modal", 3, "click"], [1, "shortcuts-modal__header"], ["pButton", "", "type", "button", "icon", "pi pi-times", 1, "shortcuts-modal__close", "p-button-text", 3, "click"], [1, "shortcuts-modal__content"], [1, "shortcuts-section"], [1, "shortcuts-section__hint"], [4, "ngFor", "ngForOf"], [1, "shortcuts-modal__footer"]], template: function KeyboardShortcutsModalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, KeyboardShortcutsModalComponent_div_0_Template, 43, 5, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.shortcutsService.isHelpModalOpen());
        } }, dependencies: [NgFor, NgIf, ButtonModule, i1.ButtonDirective], styles: [".shortcuts-backdrop[_ngcontent-%COMP%] {\n      position: fixed;\n      inset: 0;\n      background: rgba(15, 23, 42, 0.5);\n      backdrop-filter: blur(4px);\n      z-index: 10000;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding: 24px;\n    }\n\n    .shortcuts-modal[_ngcontent-%COMP%] {\n      width: 100%;\n      max-width: 560px;\n      background: #ffffff;\n      border-radius: 20px;\n      box-shadow: 0 25px 80px rgba(15, 23, 42, 0.25);\n      overflow: hidden;\n    }\n\n    .shortcuts-modal__header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 20px 24px;\n      border-bottom: 1px solid #e2e8f0;\n    }\n\n    .shortcuts-modal__header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 1.25rem;\n      font-weight: 700;\n      color: #0f172a;\n    }\n\n    .shortcuts-modal__close.p-button[_ngcontent-%COMP%] {\n      width: 36px;\n      height: 36px;\n      border: none;\n      border-radius: 10px;\n      background: transparent;\n      color: #64748b;\n    }\n\n    .shortcuts-modal__close.p-button[_ngcontent-%COMP%]:hover {\n      background: #f1f5f9;\n      color: #0f172a;\n    }\n\n    .shortcuts-modal__content[_ngcontent-%COMP%] {\n      padding: 24px;\n      max-height: 60vh;\n      overflow-y: auto;\n    }\n\n    .shortcuts-section[_ngcontent-%COMP%] {\n      margin-bottom: 24px;\n    }\n\n    .shortcuts-section[_ngcontent-%COMP%]:last-child {\n      margin-bottom: 0;\n    }\n\n    .shortcuts-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n      font-size: 0.8rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n      color: #64748b;\n      margin: 0 0 8px;\n    }\n\n    .shortcuts-section__hint[_ngcontent-%COMP%] {\n      font-size: 0.8rem;\n      color: #94a3b8;\n      margin: 0 0 12px;\n    }\n\n    .shortcuts-section__hint[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%] {\n      background: #f1f5f9;\n      padding: 2px 6px;\n      border-radius: 4px;\n      font-size: 0.75rem;\n    }\n\n    .shortcuts-section[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n      list-style: none;\n      padding: 0;\n      margin: 0;\n    }\n\n    .shortcuts-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 10px 0;\n      border-bottom: 1px solid #f1f5f9;\n    }\n\n    .shortcuts-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n      border-bottom: none;\n    }\n\n    .shortcuts-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      font-size: 0.9rem;\n      color: #334155;\n    }\n\n    .shortcuts-section[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 4px;\n      padding: 4px 10px;\n      border-radius: 6px;\n      background: #f8fafc;\n      border: 1px solid #e2e8f0;\n      font-size: 0.8rem;\n      font-family: inherit;\n      color: #475569;\n      font-weight: 500;\n    }\n\n    .shortcuts-modal__footer[_ngcontent-%COMP%] {\n      padding: 16px 24px;\n      background: #f8fafc;\n      border-top: 1px solid #e2e8f0;\n      text-align: center;\n    }\n\n    .shortcuts-modal__footer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      font-size: 0.85rem;\n      color: #64748b;\n    }\n\n    .shortcuts-modal__footer[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%] {\n      background: #ffffff;\n      padding: 2px 8px;\n      border-radius: 4px;\n      border: 1px solid #e2e8f0;\n      font-size: 0.8rem;\n      font-family: inherit;\n    }"], data: { animation: [
                trigger('fadeIn', [
                    transition(':enter', [
                        style({ opacity: 0 }),
                        animate('150ms ease-out', style({ opacity: 1 }))
                    ]),
                    transition(':leave', [
                        animate('100ms ease-in', style({ opacity: 0 }))
                    ])
                ]),
                trigger('slideUp', [
                    transition(':enter', [
                        style({ opacity: 0, transform: 'scale(0.95) translateY(20px)' }),
                        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
                    ]),
                    transition(':leave', [
                        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'scale(0.95) translateY(20px)' }))
                    ])
                ])
            ] } });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KeyboardShortcutsModalComponent, [{
        type: Component,
        args: [{ selector: 'app-keyboard-shortcuts-modal', standalone: true, imports: [NgFor, NgIf, ButtonModule], animations: [
                    trigger('fadeIn', [
                        transition(':enter', [
                            style({ opacity: 0 }),
                            animate('150ms ease-out', style({ opacity: 1 }))
                        ]),
                        transition(':leave', [
                            animate('100ms ease-in', style({ opacity: 0 }))
                        ])
                    ]),
                    trigger('slideUp', [
                        transition(':enter', [
                            style({ opacity: 0, transform: 'scale(0.95) translateY(20px)' }),
                            animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
                        ]),
                        transition(':leave', [
                            animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'scale(0.95) translateY(20px)' }))
                        ])
                    ])
                ], template: "\n    <div class=\"shortcuts-backdrop\" *ngIf=\"shortcutsService.isHelpModalOpen()\" [@fadeIn] (click)=\"shortcutsService.closeHelpModal()\">\n      <div class=\"shortcuts-modal\" [@slideUp] (click)=\"$event.stopPropagation()\">\n        <header class=\"shortcuts-modal__header\">\n          <h2>Keyboard Shortcuts</h2>\n          <button\n            pButton\n            type=\"button\"\n            icon=\"pi pi-times\"\n            class=\"shortcuts-modal__close p-button-text\"\n            (click)=\"shortcutsService.closeHelpModal()\"\n          ></button>\n        </header>\n\n        <div class=\"shortcuts-modal__content\">\n          <section class=\"shortcuts-section\">\n            <h3>Navigation</h3>\n            <p class=\"shortcuts-section__hint\">Press <kbd>G</kbd> then a letter</p>\n            <ul>\n              <li *ngFor=\"let shortcut of shortcutsService.getShortcutsByCategory('navigation')\">\n                <span>{{ shortcut.description }}</span>\n                <kbd>{{ formatKeys(shortcut.keys) }}</kbd>\n              </li>\n            </ul>\n          </section>\n\n          <section class=\"shortcuts-section\">\n            <h3>Quick Actions</h3>\n            <p class=\"shortcuts-section__hint\">Press <kbd>N</kbd> then a letter to create</p>\n            <ul>\n              <li *ngFor=\"let shortcut of shortcutsService.getShortcutsByCategory('actions')\">\n                <span>{{ shortcut.description }}</span>\n                <kbd>{{ formatKeys(shortcut.keys) }}</kbd>\n              </li>\n            </ul>\n          </section>\n\n          <section class=\"shortcuts-section\">\n            <h3>General</h3>\n            <ul>\n              <li>\n                <span>Open command palette</span>\n                <kbd>\u2318 K</kbd>\n              </li>\n              <li *ngFor=\"let shortcut of shortcutsService.getShortcutsByCategory('general')\">\n                <span>{{ shortcut.description }}</span>\n                <kbd>{{ formatKeys(shortcut.keys) }}</kbd>\n              </li>\n            </ul>\n          </section>\n        </div>\n\n        <footer class=\"shortcuts-modal__footer\">\n          <span>Press <kbd>?</kbd> anywhere to show this help</span>\n        </footer>\n      </div>\n    </div>\n  ", styles: ["\n    .shortcuts-backdrop {\n      position: fixed;\n      inset: 0;\n      background: rgba(15, 23, 42, 0.5);\n      backdrop-filter: blur(4px);\n      z-index: 10000;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      padding: 24px;\n    }\n\n    .shortcuts-modal {\n      width: 100%;\n      max-width: 560px;\n      background: #ffffff;\n      border-radius: 20px;\n      box-shadow: 0 25px 80px rgba(15, 23, 42, 0.25);\n      overflow: hidden;\n    }\n\n    .shortcuts-modal__header {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 20px 24px;\n      border-bottom: 1px solid #e2e8f0;\n    }\n\n    .shortcuts-modal__header h2 {\n      margin: 0;\n      font-size: 1.25rem;\n      font-weight: 700;\n      color: #0f172a;\n    }\n\n    .shortcuts-modal__close.p-button {\n      width: 36px;\n      height: 36px;\n      border: none;\n      border-radius: 10px;\n      background: transparent;\n      color: #64748b;\n    }\n\n    .shortcuts-modal__close.p-button:hover {\n      background: #f1f5f9;\n      color: #0f172a;\n    }\n\n    .shortcuts-modal__content {\n      padding: 24px;\n      max-height: 60vh;\n      overflow-y: auto;\n    }\n\n    .shortcuts-section {\n      margin-bottom: 24px;\n    }\n\n    .shortcuts-section:last-child {\n      margin-bottom: 0;\n    }\n\n    .shortcuts-section h3 {\n      font-size: 0.8rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n      color: #64748b;\n      margin: 0 0 8px;\n    }\n\n    .shortcuts-section__hint {\n      font-size: 0.8rem;\n      color: #94a3b8;\n      margin: 0 0 12px;\n    }\n\n    .shortcuts-section__hint kbd {\n      background: #f1f5f9;\n      padding: 2px 6px;\n      border-radius: 4px;\n      font-size: 0.75rem;\n    }\n\n    .shortcuts-section ul {\n      list-style: none;\n      padding: 0;\n      margin: 0;\n    }\n\n    .shortcuts-section li {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      padding: 10px 0;\n      border-bottom: 1px solid #f1f5f9;\n    }\n\n    .shortcuts-section li:last-child {\n      border-bottom: none;\n    }\n\n    .shortcuts-section li span {\n      font-size: 0.9rem;\n      color: #334155;\n    }\n\n    .shortcuts-section li kbd {\n      display: inline-flex;\n      align-items: center;\n      gap: 4px;\n      padding: 4px 10px;\n      border-radius: 6px;\n      background: #f8fafc;\n      border: 1px solid #e2e8f0;\n      font-size: 0.8rem;\n      font-family: inherit;\n      color: #475569;\n      font-weight: 500;\n    }\n\n    .shortcuts-modal__footer {\n      padding: 16px 24px;\n      background: #f8fafc;\n      border-top: 1px solid #e2e8f0;\n      text-align: center;\n    }\n\n    .shortcuts-modal__footer span {\n      font-size: 0.85rem;\n      color: #64748b;\n    }\n\n    .shortcuts-modal__footer kbd {\n      background: #ffffff;\n      padding: 2px 8px;\n      border-radius: 4px;\n      border: 1px solid #e2e8f0;\n      font-size: 0.8rem;\n      font-family: inherit;\n    }\n  "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KeyboardShortcutsModalComponent, { className: "KeyboardShortcutsModalComponent", filePath: "src/app/core/keyboard-shortcuts/keyboard-shortcuts-modal.component.ts", lineNumber: 34 }); })();
