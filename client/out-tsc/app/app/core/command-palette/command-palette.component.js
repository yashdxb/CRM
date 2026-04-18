import { Component, inject, ViewChild, computed } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommandPaletteService } from './command-palette.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/button";
import * as i3 from "primeng/inputtext";
const _c0 = ["searchInput"];
const _c1 = a0 => ({ "command-palette__item--selected": a0 });
function CommandPaletteComponent_div_0_div_9_button_3_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cmd_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cmd_r4.description);
} }
function CommandPaletteComponent_div_0_div_9_button_3_kbd_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "kbd", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cmd_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cmd_r4.shortcut);
} }
function CommandPaletteComponent_div_0_div_9_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function CommandPaletteComponent_div_0_div_9_button_3_Template_button_click_0_listener() { const cmd_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.commandService.executeCommand(cmd_r4)); })("mouseenter", function CommandPaletteComponent_div_0_div_9_button_3_Template_button_mouseenter_0_listener() { const i_r5 = i0.ɵɵrestoreView(_r3).index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onHover(i_r5)); });
    i0.ɵɵelement(1, "i", 16);
    i0.ɵɵelementStart(2, "div", 17)(3, "span", 18);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, CommandPaletteComponent_div_0_div_9_button_3_span_5_Template, 2, 1, "span", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CommandPaletteComponent_div_0_div_9_button_3_kbd_6_Template, 2, 1, "kbd", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cmd_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(5, _c1, ctx_r1.commandService.selectedIndex() === i_r5));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", cmd_r4.icon || "pi-arrow-right");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(cmd_r4.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", cmd_r4.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", cmd_r4.shortcut);
} }
function CommandPaletteComponent_div_0_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "div", 13);
    i0.ɵɵtext(2, "Recent");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, CommandPaletteComponent_div_0_div_9_button_3_Template, 7, 7, "button", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.recentCommands());
} }
function CommandPaletteComponent_div_0_div_10_button_3_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cmd_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cmd_r7.description);
} }
function CommandPaletteComponent_div_0_div_10_button_3_kbd_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "kbd", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cmd_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cmd_r7.shortcut);
} }
function CommandPaletteComponent_div_0_div_10_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function CommandPaletteComponent_div_0_div_10_button_3_Template_button_click_0_listener() { const cmd_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.commandService.executeCommand(cmd_r7)); })("mouseenter", function CommandPaletteComponent_div_0_div_10_button_3_Template_button_mouseenter_0_listener() { const i_r8 = i0.ɵɵrestoreView(_r6).index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onHover(ctx_r1.recentOffset() + i_r8)); });
    i0.ɵɵelement(1, "i", 16);
    i0.ɵɵelementStart(2, "div", 17)(3, "span", 18);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, CommandPaletteComponent_div_0_div_10_button_3_span_5_Template, 2, 1, "span", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CommandPaletteComponent_div_0_div_10_button_3_kbd_6_Template, 2, 1, "kbd", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cmd_r7 = ctx.$implicit;
    const i_r8 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(5, _c1, ctx_r1.commandService.selectedIndex() === ctx_r1.recentOffset() + i_r8));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", cmd_r7.icon || "pi-arrow-right");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(cmd_r7.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", cmd_r7.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", cmd_r7.shortcut);
} }
function CommandPaletteComponent_div_0_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "div", 13);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, CommandPaletteComponent_div_0_div_10_button_3_Template, 7, 7, "button", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.commandService.searchQuery() ? "Results" : "Navigation");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.navigationCommands());
} }
function CommandPaletteComponent_div_0_div_11_button_3_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cmd_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cmd_r10.description);
} }
function CommandPaletteComponent_div_0_div_11_button_3_kbd_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "kbd", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cmd_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(cmd_r10.shortcut);
} }
function CommandPaletteComponent_div_0_div_11_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function CommandPaletteComponent_div_0_div_11_button_3_Template_button_click_0_listener() { const cmd_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.commandService.executeCommand(cmd_r10)); })("mouseenter", function CommandPaletteComponent_div_0_div_11_button_3_Template_button_mouseenter_0_listener() { const i_r11 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.onHover(ctx_r1.navOffset() + i_r11)); });
    i0.ɵɵelement(1, "i", 16);
    i0.ɵɵelementStart(2, "div", 17)(3, "span", 18);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, CommandPaletteComponent_div_0_div_11_button_3_span_5_Template, 2, 1, "span", 19);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CommandPaletteComponent_div_0_div_11_button_3_kbd_6_Template, 2, 1, "kbd", 20);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cmd_r10 = ctx.$implicit;
    const i_r11 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(5, _c1, ctx_r1.commandService.selectedIndex() === ctx_r1.navOffset() + i_r11));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", cmd_r10.icon || "pi-bolt");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(cmd_r10.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", cmd_r10.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", cmd_r10.shortcut);
} }
function CommandPaletteComponent_div_0_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12)(1, "div", 13);
    i0.ɵɵtext(2, "Actions");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, CommandPaletteComponent_div_0_div_11_button_3_Template, 7, 7, "button", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.actionCommands());
} }
function CommandPaletteComponent_div_0_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵelement(1, "i", 5);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("No commands found for \"", ctx_r1.commandService.searchQuery(), "\"");
} }
function CommandPaletteComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵlistener("click", function CommandPaletteComponent_div_0_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.commandService.close()); });
    i0.ɵɵelementStart(1, "div", 3);
    i0.ɵɵlistener("click", function CommandPaletteComponent_div_0_Template_div_click_1_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelementStart(2, "div", 4);
    i0.ɵɵelement(3, "i", 5);
    i0.ɵɵelementStart(4, "input", 6, 0);
    i0.ɵɵlistener("ngModelChange", function CommandPaletteComponent_div_0_Template_input_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.commandService.setSearchQuery($event)); })("keydown", function CommandPaletteComponent_div_0_Template_input_keydown_4_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onKeydown($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "kbd", 7);
    i0.ɵɵtext(7, "ESC");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "div", 8);
    i0.ɵɵtemplate(9, CommandPaletteComponent_div_0_div_9_Template, 4, 1, "div", 9)(10, CommandPaletteComponent_div_0_div_10_Template, 4, 2, "div", 9)(11, CommandPaletteComponent_div_0_div_11_Template, 4, 1, "div", 9)(12, CommandPaletteComponent_div_0_div_12_Template, 4, 1, "div", 10);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 11)(14, "span")(15, "kbd");
    i0.ɵɵtext(16, "\u2191\u2193");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(17, " Navigate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span")(19, "kbd");
    i0.ɵɵtext(20, "\u21B5");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(21, " Select");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "span")(23, "kbd");
    i0.ɵɵtext(24, "ESC");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(25, " Close");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("@fadeIn", undefined);
    i0.ɵɵadvance();
    i0.ɵɵproperty("@slideUp", undefined);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngModel", ctx_r1.commandService.searchQuery());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r1.recentCommands().length > 0 && !ctx_r1.commandService.searchQuery());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.navigationCommands().length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.actionCommands().length > 0 && !ctx_r1.commandService.searchQuery());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.commandService.filteredCommands().length === 0);
} }
export class CommandPaletteComponent {
    commandService = inject(CommandPaletteService);
    searchInput;
    // Pre-computed signals to avoid creating new arrays in the template
    recentCommands = computed(() => {
        if (this.commandService.searchQuery())
            return [];
        return this.commandService.filteredCommands().filter(c => c.category === 'recent');
    }, ...(ngDevMode ? [{ debugName: "recentCommands" }] : []));
    navigationCommands = computed(() => {
        const query = this.commandService.searchQuery();
        if (query) {
            return this.commandService.filteredCommands();
        }
        return this.commandService.filteredCommands().filter(c => c.category === 'navigation');
    }, ...(ngDevMode ? [{ debugName: "navigationCommands" }] : []));
    actionCommands = computed(() => {
        if (this.commandService.searchQuery())
            return [];
        return this.commandService.filteredCommands().filter(c => c.category === 'action');
    }, ...(ngDevMode ? [{ debugName: "actionCommands" }] : []));
    recentOffset = computed(() => this.recentCommands().length, ...(ngDevMode ? [{ debugName: "recentOffset" }] : []));
    navOffset = computed(() => this.recentOffset() + this.navigationCommands().length, ...(ngDevMode ? [{ debugName: "navOffset" }] : []));
    keydownHandler = (e) => {
        // ⌘K or Ctrl+K to open
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            this.commandService.toggle();
        }
    };
    ngOnInit() {
        document.addEventListener('keydown', this.keydownHandler);
    }
    ngOnDestroy() {
        document.removeEventListener('keydown', this.keydownHandler);
    }
    onKeydown(event) {
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                this.commandService.selectNext();
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.commandService.selectPrevious();
                break;
            case 'Enter':
                event.preventDefault();
                this.commandService.executeSelected();
                break;
            case 'Escape':
                this.commandService.close();
                break;
        }
    }
    onHover(index) {
        // Optional: update selected index on hover
    }
    static ɵfac = function CommandPaletteComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CommandPaletteComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CommandPaletteComponent, selectors: [["app-command-palette"]], viewQuery: function CommandPaletteComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.searchInput = _t.first);
        } }, decls: 1, vars: 1, consts: [["searchInput", ""], ["class", "command-palette-backdrop", 3, "click", 4, "ngIf"], [1, "command-palette-backdrop", 3, "click"], [1, "command-palette", 3, "click"], [1, "command-palette__header"], [1, "pi", "pi-search"], ["pInputText", "", "type", "text", "placeholder", "Search commands, navigate, or create...", "autofocus", "", 1, "command-palette__input", 3, "ngModelChange", "keydown", "ngModel"], [1, "command-palette__kbd"], [1, "command-palette__results"], ["class", "command-palette__group", 4, "ngIf"], ["class", "command-palette__empty", 4, "ngIf"], [1, "command-palette__footer"], [1, "command-palette__group"], [1, "command-palette__group-label"], ["pButton", "", "type", "button", "class", "command-palette__item p-button-text", 3, "ngClass", "click", "mouseenter", 4, "ngFor", "ngForOf"], ["pButton", "", "type", "button", 1, "command-palette__item", "p-button-text", 3, "click", "mouseenter", "ngClass"], [1, "pi", 3, "ngClass"], [1, "command-palette__item-content"], [1, "command-palette__item-label"], ["class", "command-palette__item-desc", 4, "ngIf"], ["class", "command-palette__shortcut", 4, "ngIf"], [1, "command-palette__item-desc"], [1, "command-palette__shortcut"], [1, "command-palette__empty"]], template: function CommandPaletteComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, CommandPaletteComponent_div_0_Template, 26, 7, "div", 1);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.commandService.isOpen());
        } }, dependencies: [NgFor, NgIf, NgClass, FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, ButtonModule, i2.ButtonDirective, InputTextModule, i3.InputText], styles: [".command-palette-backdrop[_ngcontent-%COMP%] {\n      position: fixed;\n      inset: 0;\n      background: rgba(15, 23, 42, 0.5);\n      backdrop-filter: blur(4px);\n      z-index: 10000;\n      display: flex;\n      align-items: flex-start;\n      justify-content: center;\n      padding-top: 15vh;\n    }\n\n    .command-palette[_ngcontent-%COMP%] {\n      width: 100%;\n      max-width: 580px;\n      background: #ffffff;\n      border-radius: 20px;\n      box-shadow: 0 25px 80px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.08);\n      overflow: hidden;\n    }\n\n    .command-palette__header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      padding: 16px 20px;\n      border-bottom: 1px solid #e2e8f0;\n    }\n\n    .command-palette__header[_ngcontent-%COMP%]   .pi-search[_ngcontent-%COMP%] {\n      color: #94a3b8;\n      font-size: 1.1rem;\n    }\n\n    .command-palette__input.p-inputtext[_ngcontent-%COMP%] {\n      flex: 1;\n      border: none;\n      outline: none;\n      font-size: 1rem;\n      font-family: inherit;\n      color: #0f172a;\n      background: transparent;\n      box-shadow: none;\n    }\n\n    .command-palette__input[_ngcontent-%COMP%]::placeholder {\n      color: #94a3b8;\n    }\n\n    .command-palette__kbd[_ngcontent-%COMP%] {\n      padding: 4px 8px;\n      border-radius: 6px;\n      background: #f1f5f9;\n      color: #64748b;\n      font-size: 0.7rem;\n      font-family: inherit;\n      font-weight: 600;\n      border: 1px solid #e2e8f0;\n    }\n\n    .command-palette__results[_ngcontent-%COMP%] {\n      max-height: 400px;\n      overflow-y: auto;\n      padding: 8px;\n    }\n\n    .command-palette__group[_ngcontent-%COMP%] {\n      margin-bottom: 8px;\n    }\n\n    .command-palette__group-label[_ngcontent-%COMP%] {\n      padding: 8px 12px 6px;\n      font-size: 0.7rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n      color: #94a3b8;\n    }\n\n    .command-palette__item.p-button[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      width: 100%;\n      padding: 10px 12px;\n      border: none;\n      border-radius: 10px;\n      background: transparent;\n      text-align: left;\n      font-family: inherit;\n      transition: background 0.1s ease;\n    }\n\n    .command-palette__item[_ngcontent-%COMP%]:hover, \n   .command-palette__item--selected[_ngcontent-%COMP%] {\n      background: #f1f5f9;\n    }\n\n    .command-palette__item--selected[_ngcontent-%COMP%] {\n      background: rgba(99, 102, 241, 0.1);\n    }\n\n    .command-palette__item[_ngcontent-%COMP%]   .pi[_ngcontent-%COMP%] {\n      width: 32px;\n      height: 32px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: 8px;\n      background: #f8fafc;\n      color: #64748b;\n      font-size: 0.9rem;\n    }\n\n    .command-palette__item--selected[_ngcontent-%COMP%]   .pi[_ngcontent-%COMP%] {\n      background: rgba(99, 102, 241, 0.15);\n      color: #4f46e5;\n    }\n\n    .command-palette__item-content[_ngcontent-%COMP%] {\n      flex: 1;\n      min-width: 0;\n    }\n\n    .command-palette__item-label[_ngcontent-%COMP%] {\n      display: block;\n      font-weight: 500;\n      color: #0f172a;\n      font-size: 0.9rem;\n    }\n\n    .command-palette__item-desc[_ngcontent-%COMP%] {\n      display: block;\n      font-size: 0.8rem;\n      color: #64748b;\n      margin-top: 1px;\n    }\n\n    .command-palette__shortcut[_ngcontent-%COMP%] {\n      padding: 3px 6px;\n      border-radius: 5px;\n      background: #f8fafc;\n      color: #64748b;\n      font-size: 0.7rem;\n      font-family: inherit;\n      font-weight: 600;\n      border: 1px solid #e2e8f0;\n      white-space: nowrap;\n    }\n\n    .command-palette__empty[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 8px;\n      padding: 32px;\n      color: #94a3b8;\n    }\n\n    .command-palette__empty[_ngcontent-%COMP%]   .pi[_ngcontent-%COMP%] {\n      font-size: 1.5rem;\n    }\n\n    .command-palette__empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 0.9rem;\n    }\n\n    .command-palette__footer[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 16px;\n      padding: 12px 16px;\n      border-top: 1px solid #e2e8f0;\n      background: #f8fafc;\n    }\n\n    .command-palette__footer[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      font-size: 0.75rem;\n      color: #64748b;\n    }\n\n    .command-palette__footer[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%] {\n      padding: 2px 5px;\n      border-radius: 4px;\n      background: #ffffff;\n      border: 1px solid #e2e8f0;\n      font-size: 0.7rem;\n      font-family: inherit;\n    }"], data: { animation: [
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
                        style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }),
                        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
                    ]),
                    transition(':leave', [
                        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }))
                    ])
                ])
            ] } });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommandPaletteComponent, [{
        type: Component,
        args: [{ selector: 'app-command-palette', standalone: true, imports: [NgFor, NgIf, NgClass, FormsModule, ButtonModule, InputTextModule], animations: [
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
                            style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }),
                            animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
                        ]),
                        transition(':leave', [
                            animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'scale(0.95) translateY(10px)' }))
                        ])
                    ])
                ], template: "\n    <div class=\"command-palette-backdrop\" *ngIf=\"commandService.isOpen()\" [@fadeIn] (click)=\"commandService.close()\">\n      <div class=\"command-palette\" [@slideUp] (click)=\"$event.stopPropagation()\">\n        <div class=\"command-palette__header\">\n          <i class=\"pi pi-search\"></i>\n          <input\n            pInputText\n            #searchInput\n            type=\"text\"\n            class=\"command-palette__input\"\n            placeholder=\"Search commands, navigate, or create...\"\n            [ngModel]=\"commandService.searchQuery()\"\n            (ngModelChange)=\"commandService.setSearchQuery($event)\"\n            (keydown)=\"onKeydown($event)\"\n            autofocus\n          />\n          <kbd class=\"command-palette__kbd\">ESC</kbd>\n        </div>\n        \n        <div class=\"command-palette__results\">\n          <div class=\"command-palette__group\" *ngIf=\"recentCommands().length > 0 && !commandService.searchQuery()\">\n            <div class=\"command-palette__group-label\">Recent</div>\n            <button\n              pButton\n              type=\"button\"\n              *ngFor=\"let cmd of recentCommands(); let i = index\"\n              class=\"command-palette__item p-button-text\"\n              [ngClass]=\"{ 'command-palette__item--selected': commandService.selectedIndex() === i }\"\n              (click)=\"commandService.executeCommand(cmd)\"\n              (mouseenter)=\"onHover(i)\"\n            >\n              <i class=\"pi\" [ngClass]=\"cmd.icon || 'pi-arrow-right'\"></i>\n              <div class=\"command-palette__item-content\">\n                <span class=\"command-palette__item-label\">{{ cmd.label }}</span>\n                <span *ngIf=\"cmd.description\" class=\"command-palette__item-desc\">{{ cmd.description }}</span>\n              </div>\n              <kbd *ngIf=\"cmd.shortcut\" class=\"command-palette__shortcut\">{{ cmd.shortcut }}</kbd>\n            </button>\n          </div>\n\n          <div class=\"command-palette__group\" *ngIf=\"navigationCommands().length > 0\">\n            <div class=\"command-palette__group-label\">{{ commandService.searchQuery() ? 'Results' : 'Navigation' }}</div>\n            <button\n              pButton\n              type=\"button\"\n              *ngFor=\"let cmd of navigationCommands(); let i = index\"\n              class=\"command-palette__item p-button-text\"\n              [ngClass]=\"{ 'command-palette__item--selected': commandService.selectedIndex() === recentOffset() + i }\"\n              (click)=\"commandService.executeCommand(cmd)\"\n              (mouseenter)=\"onHover(recentOffset() + i)\"\n            >\n              <i class=\"pi\" [ngClass]=\"cmd.icon || 'pi-arrow-right'\"></i>\n              <div class=\"command-palette__item-content\">\n                <span class=\"command-palette__item-label\">{{ cmd.label }}</span>\n                <span *ngIf=\"cmd.description\" class=\"command-palette__item-desc\">{{ cmd.description }}</span>\n              </div>\n              <kbd *ngIf=\"cmd.shortcut\" class=\"command-palette__shortcut\">{{ cmd.shortcut }}</kbd>\n            </button>\n          </div>\n\n          <div class=\"command-palette__group\" *ngIf=\"actionCommands().length > 0 && !commandService.searchQuery()\">\n            <div class=\"command-palette__group-label\">Actions</div>\n            <button\n              pButton\n              type=\"button\"\n              *ngFor=\"let cmd of actionCommands(); let i = index\"\n              class=\"command-palette__item p-button-text\"\n              [ngClass]=\"{ 'command-palette__item--selected': commandService.selectedIndex() === navOffset() + i }\"\n              (click)=\"commandService.executeCommand(cmd)\"\n              (mouseenter)=\"onHover(navOffset() + i)\"\n            >\n              <i class=\"pi\" [ngClass]=\"cmd.icon || 'pi-bolt'\"></i>\n              <div class=\"command-palette__item-content\">\n                <span class=\"command-palette__item-label\">{{ cmd.label }}</span>\n                <span *ngIf=\"cmd.description\" class=\"command-palette__item-desc\">{{ cmd.description }}</span>\n              </div>\n              <kbd *ngIf=\"cmd.shortcut\" class=\"command-palette__shortcut\">{{ cmd.shortcut }}</kbd>\n            </button>\n          </div>\n\n          <div class=\"command-palette__empty\" *ngIf=\"commandService.filteredCommands().length === 0\">\n            <i class=\"pi pi-search\"></i>\n            <p>No commands found for \"{{ commandService.searchQuery() }}\"</p>\n          </div>\n        </div>\n\n        <div class=\"command-palette__footer\">\n          <span><kbd>\u2191\u2193</kbd> Navigate</span>\n          <span><kbd>\u21B5</kbd> Select</span>\n          <span><kbd>ESC</kbd> Close</span>\n        </div>\n      </div>\n    </div>\n  ", styles: ["\n    .command-palette-backdrop {\n      position: fixed;\n      inset: 0;\n      background: rgba(15, 23, 42, 0.5);\n      backdrop-filter: blur(4px);\n      z-index: 10000;\n      display: flex;\n      align-items: flex-start;\n      justify-content: center;\n      padding-top: 15vh;\n    }\n\n    .command-palette {\n      width: 100%;\n      max-width: 580px;\n      background: #ffffff;\n      border-radius: 20px;\n      box-shadow: 0 25px 80px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.08);\n      overflow: hidden;\n    }\n\n    .command-palette__header {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      padding: 16px 20px;\n      border-bottom: 1px solid #e2e8f0;\n    }\n\n    .command-palette__header .pi-search {\n      color: #94a3b8;\n      font-size: 1.1rem;\n    }\n\n    .command-palette__input.p-inputtext {\n      flex: 1;\n      border: none;\n      outline: none;\n      font-size: 1rem;\n      font-family: inherit;\n      color: #0f172a;\n      background: transparent;\n      box-shadow: none;\n    }\n\n    .command-palette__input::placeholder {\n      color: #94a3b8;\n    }\n\n    .command-palette__kbd {\n      padding: 4px 8px;\n      border-radius: 6px;\n      background: #f1f5f9;\n      color: #64748b;\n      font-size: 0.7rem;\n      font-family: inherit;\n      font-weight: 600;\n      border: 1px solid #e2e8f0;\n    }\n\n    .command-palette__results {\n      max-height: 400px;\n      overflow-y: auto;\n      padding: 8px;\n    }\n\n    .command-palette__group {\n      margin-bottom: 8px;\n    }\n\n    .command-palette__group-label {\n      padding: 8px 12px 6px;\n      font-size: 0.7rem;\n      font-weight: 700;\n      text-transform: uppercase;\n      letter-spacing: 0.05em;\n      color: #94a3b8;\n    }\n\n    .command-palette__item.p-button {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      width: 100%;\n      padding: 10px 12px;\n      border: none;\n      border-radius: 10px;\n      background: transparent;\n      text-align: left;\n      font-family: inherit;\n      transition: background 0.1s ease;\n    }\n\n    .command-palette__item:hover,\n    .command-palette__item--selected {\n      background: #f1f5f9;\n    }\n\n    .command-palette__item--selected {\n      background: rgba(99, 102, 241, 0.1);\n    }\n\n    .command-palette__item .pi {\n      width: 32px;\n      height: 32px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: 8px;\n      background: #f8fafc;\n      color: #64748b;\n      font-size: 0.9rem;\n    }\n\n    .command-palette__item--selected .pi {\n      background: rgba(99, 102, 241, 0.15);\n      color: #4f46e5;\n    }\n\n    .command-palette__item-content {\n      flex: 1;\n      min-width: 0;\n    }\n\n    .command-palette__item-label {\n      display: block;\n      font-weight: 500;\n      color: #0f172a;\n      font-size: 0.9rem;\n    }\n\n    .command-palette__item-desc {\n      display: block;\n      font-size: 0.8rem;\n      color: #64748b;\n      margin-top: 1px;\n    }\n\n    .command-palette__shortcut {\n      padding: 3px 6px;\n      border-radius: 5px;\n      background: #f8fafc;\n      color: #64748b;\n      font-size: 0.7rem;\n      font-family: inherit;\n      font-weight: 600;\n      border: 1px solid #e2e8f0;\n      white-space: nowrap;\n    }\n\n    .command-palette__empty {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 8px;\n      padding: 32px;\n      color: #94a3b8;\n    }\n\n    .command-palette__empty .pi {\n      font-size: 1.5rem;\n    }\n\n    .command-palette__empty p {\n      margin: 0;\n      font-size: 0.9rem;\n    }\n\n    .command-palette__footer {\n      display: flex;\n      align-items: center;\n      gap: 16px;\n      padding: 12px 16px;\n      border-top: 1px solid #e2e8f0;\n      background: #f8fafc;\n    }\n\n    .command-palette__footer span {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      font-size: 0.75rem;\n      color: #64748b;\n    }\n\n    .command-palette__footer kbd {\n      padding: 2px 5px;\n      border-radius: 4px;\n      background: #ffffff;\n      border: 1px solid #e2e8f0;\n      font-size: 0.7rem;\n      font-family: inherit;\n    }\n  "] }]
    }], null, { searchInput: [{
            type: ViewChild,
            args: ['searchInput']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CommandPaletteComponent, { className: "CommandPaletteComponent", filePath: "src/app/core/command-palette/command-palette.component.ts", lineNumber: 36 }); })();
