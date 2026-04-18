import { Component, ElementRef, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { environment } from '../../../environments/environment';
import { NavigationService } from '../navigation';
import { ThemeService } from '../../core/theme/theme.service';
import { KeyboardShortcutsService } from '../../core/keyboard-shortcuts';
import { TenantBrandingStateService } from '../../core/tenant/tenant-branding-state.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
import * as i2 from "primeng/tooltip";
const _c0 = a0 => ({ "brand__env--prod": a0 });
const _c1 = a0 => ({ "nav__item--active": a0 });
const _c2 = a0 => ({ "nav__children--open": a0 });
const _c3 = () => ({ exact: true });
const _c4 = a0 => ({ "nav__child--active": a0 });
const _c5 = a0 => ({ "nav__grandchildren--open": a0 });
function SidebarComponent_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r0.branding.logoUrl(), i0.ɵɵsanitizeUrl)("alt", ctx_r0.branding.tenantName() ?? "CRM");
} }
function SidebarComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtext(1, "CRM");
    i0.ɵɵelementEnd();
} }
function SidebarComponent_div_18_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const link_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(link_r3.badge);
} }
function SidebarComponent_div_18_i_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 30);
} if (rf & 2) {
    const link_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r0.nav.isMenuExpanded(link_r3.label) ? "pi-chevron-up" : "pi-chevron-right");
} }
function SidebarComponent_div_18_div_9_div_1_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 29);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(child_r7.badge);
} }
function SidebarComponent_div_18_div_9_div_1_i_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 39);
} if (rf & 2) {
    const child_r7 = i0.ɵɵnextContext().$implicit;
    const link_r3 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", ctx_r0.nav.isChildExpanded(link_r3.label, child_r7.label) ? "pi-chevron-up" : "pi-chevron-right");
} }
function SidebarComponent_div_18_div_9_div_1_div_9_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 42);
    i0.ɵɵelement(1, "span", 35)(2, "i", 36);
    i0.ɵɵelementStart(3, "div", 24)(4, "span", 25);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const grandChild_r10 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(5);
    i0.ɵɵclassProp("nav__grandchild--disabled", grandChild_r10.disabled);
    i0.ɵɵproperty("routerLink", grandChild_r10.path)("routerLinkActiveOptions", i0.ɵɵpureFunction0(9, _c3));
    i0.ɵɵattribute("aria-disabled", grandChild_r10.disabled || null);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("color", ctx_r0.resolveIconColor(grandChild_r10));
    i0.ɵɵproperty("ngClass", grandChild_r10.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(grandChild_r10.label);
} }
function SidebarComponent_div_18_div_9_div_1_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵtemplate(1, SidebarComponent_div_18_div_9_div_1_div_9_a_1_Template, 6, 10, "a", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r7 = i0.ɵɵnextContext().$implicit;
    const link_r3 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c5, ctx_r0.nav.isChildExpanded(link_r3.label, child_r7.label)));
    i0.ɵɵattribute("aria-label", child_r7.label + " submenu");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", child_r7.children);
} }
function SidebarComponent_div_18_div_9_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 33)(1, "a", 34);
    i0.ɵɵlistener("click", function SidebarComponent_div_18_div_9_div_1_Template_a_click_1_listener($event) { const child_r7 = i0.ɵɵrestoreView(_r6).$implicit; const link_r3 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.handleChildClick($event, link_r3, child_r7)); })("keydown", function SidebarComponent_div_18_div_9_div_1_Template_a_keydown_1_listener($event) { const ctx_r7 = i0.ɵɵrestoreView(_r6); const child_r7 = ctx_r7.$implicit; const i_r9 = ctx_r7.index; const link_r3 = i0.ɵɵnextContext(2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.handleChildKeydown($event, link_r3, child_r7, i_r9)); });
    i0.ɵɵelement(2, "span", 35)(3, "i", 36);
    i0.ɵɵelementStart(4, "div", 24)(5, "span", 25);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, SidebarComponent_div_18_div_9_div_1_span_7_Template, 2, 1, "span", 26)(8, SidebarComponent_div_18_div_9_div_1_i_8_Template, 1, 1, "i", 37);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, SidebarComponent_div_18_div_9_div_1_div_9_Template, 2, 5, "div", 38);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const child_r7 = ctx.$implicit;
    const link_r3 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("nav__child--disabled", child_r7.disabled);
    i0.ɵɵproperty("routerLink", (child_r7.children == null ? null : child_r7.children.length) ? null : child_r7.path)("routerLinkActiveOptions", i0.ɵɵpureFunction0(14, _c3))("ngClass", i0.ɵɵpureFunction1(15, _c4, ctx_r0.nav.isChildActive(link_r3, child_r7)));
    i0.ɵɵattribute("aria-disabled", child_r7.disabled || null)("aria-expanded", (child_r7.children == null ? null : child_r7.children.length) ? ctx_r0.nav.isChildExpanded(link_r3.label, child_r7.label) : null);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("color", ctx_r0.resolveIconColor(child_r7));
    i0.ɵɵproperty("ngClass", child_r7.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(child_r7.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", child_r7.badge);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", child_r7.children == null ? null : child_r7.children.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", child_r7.children == null ? null : child_r7.children.length);
} }
function SidebarComponent_div_18_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtemplate(1, SidebarComponent_div_18_div_9_div_1_Template, 10, 17, "div", 32);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const link_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c2, ctx_r0.nav.isMenuExpanded(link_r3.label)));
    i0.ɵɵattribute("aria-label", link_r3.label + " submenu");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", link_r3.children);
} }
function SidebarComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "a", 22);
    i0.ɵɵlistener("click", function SidebarComponent_div_18_Template_a_click_1_listener($event) { const link_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.handleNavClick($event, link_r3)); })("keydown", function SidebarComponent_div_18_Template_a_keydown_1_listener($event) { const ctx_r3 = i0.ɵɵrestoreView(_r2); const link_r3 = ctx_r3.$implicit; const linkIndex_r5 = ctx_r3.index; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.handleKeydown($event, link_r3, linkIndex_r5)); });
    i0.ɵɵelement(2, "span", 23)(3, "i", 18);
    i0.ɵɵelementStart(4, "div", 24)(5, "span", 25);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, SidebarComponent_div_18_span_7_Template, 2, 1, "span", 26)(8, SidebarComponent_div_18_i_8_Template, 1, 1, "i", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(9, SidebarComponent_div_18_div_9_Template, 2, 5, "div", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const link_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("nav__item--disabled", link_r3.disabled);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(15, _c1, ctx_r0.nav.isParentActive(link_r3)))("routerLink", (link_r3.children == null ? null : link_r3.children.length) ? null : link_r3.path)("pTooltip", ctx_r0.nav.collapsed() ? link_r3.label : "");
    i0.ɵɵattribute("aria-disabled", link_r3.disabled || null)("aria-expanded", (link_r3.children == null ? null : link_r3.children.length) ? ctx_r0.nav.isMenuExpanded(link_r3.label) : null)("aria-haspopup", (link_r3.children == null ? null : link_r3.children.length) ? "menu" : null);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("color", ctx_r0.resolveIconColor(link_r3));
    i0.ɵɵproperty("ngClass", link_r3.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(link_r3.label);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", link_r3.badge);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", link_r3.children == null ? null : link_r3.children.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", link_r3.children == null ? null : link_r3.children.length);
} }
export class SidebarComponent {
    static NAV_ICON_PALETTE = [
        '#3b82f6',
        '#22c55e',
        '#f59e0b',
        '#a855f7',
        '#06b6d4',
        '#ef4444',
        '#f97316',
        '#6366f1'
    ];
    nav = inject(NavigationService);
    themeService = inject(ThemeService);
    shortcutsService = inject(KeyboardShortcutsService);
    branding = inject(TenantBrandingStateService);
    environment = environment;
    host = inject((ElementRef));
    resizeObserver;
    toggleSidebar = output();
    ngAfterViewInit() {
        const sidebar = this.sidebarElement();
        if (!sidebar) {
            return;
        }
        if (typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(() => this.syncShellSidebarWidth());
            this.resizeObserver.observe(sidebar);
        }
        requestAnimationFrame(() => this.syncShellSidebarWidth());
    }
    ngOnDestroy() {
        this.resizeObserver?.disconnect();
    }
    resolveIconColor(link) {
        if (link.iconColor) {
            return link.iconColor;
        }
        const key = `${link.label}|${link.path}|${link.icon}`;
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
        }
        return SidebarComponent.NAV_ICON_PALETTE[hash % SidebarComponent.NAV_ICON_PALETTE.length];
    }
    handleNavClick(event, link) {
        if (link.children?.length) {
            event.preventDefault();
            this.nav.toggleSubmenu(link.label);
        }
    }
    handleChildClick(event, parent, child) {
        if (child.children?.length) {
            event.preventDefault();
            event.stopPropagation();
            this.nav.toggleChildMenu(parent.label, child.label);
        }
    }
    handleKeydown(event, link, index) {
        const links = this.nav.visibleNavLinks();
        switch (event.key) {
            case 'Enter':
            case ' ':
                if (link.children?.length) {
                    event.preventDefault();
                    this.nav.toggleSubmenu(link.label);
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (link.children?.length && this.nav.isMenuExpanded(link.label)) {
                    this.focusChild(link.label, 0);
                }
                else if (index < links.length - 1) {
                    this.focusParent(index + 1);
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (index > 0) {
                    const prevLink = links[index - 1];
                    if (prevLink.children?.length && this.nav.isMenuExpanded(prevLink.label)) {
                        this.focusChild(prevLink.label, prevLink.children.length - 1);
                    }
                    else {
                        this.focusParent(index - 1);
                    }
                }
                break;
            case 'ArrowRight':
                if (link.children?.length && !this.nav.isMenuExpanded(link.label)) {
                    event.preventDefault();
                    this.nav.toggleSubmenu(link.label);
                }
                break;
            case 'ArrowLeft':
                if (link.children?.length && this.nav.isMenuExpanded(link.label)) {
                    event.preventDefault();
                    this.nav.toggleSubmenu(link.label);
                }
                break;
        }
    }
    handleChildKeydown(event, parent, child, childIndex) {
        const children = parent.children || [];
        const parentIndex = this.nav.visibleNavLinks().findIndex(l => l.label === parent.label);
        switch (event.key) {
            case 'Enter':
            case ' ':
                if (child.children?.length) {
                    event.preventDefault();
                    this.nav.toggleChildMenu(parent.label, child.label);
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (childIndex < children.length - 1) {
                    this.focusChild(parent.label, childIndex + 1);
                }
                else {
                    const links = this.nav.visibleNavLinks();
                    if (parentIndex < links.length - 1) {
                        this.focusParent(parentIndex + 1);
                    }
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (childIndex > 0) {
                    this.focusChild(parent.label, childIndex - 1);
                }
                else {
                    this.focusParent(parentIndex);
                }
                break;
            case 'ArrowLeft':
            case 'Escape':
                event.preventDefault();
                if (child.children?.length && this.nav.isChildExpanded(parent.label, child.label)) {
                    this.nav.toggleChildMenu(parent.label, child.label);
                }
                else {
                    this.nav.toggleSubmenu(parent.label);
                    this.focusParent(parentIndex);
                }
                break;
            case 'ArrowRight':
                if (child.children?.length && !this.nav.isChildExpanded(parent.label, child.label)) {
                    event.preventDefault();
                    this.nav.toggleChildMenu(parent.label, child.label);
                }
                break;
        }
    }
    focusParent(index) {
        const items = document.querySelectorAll('.nav__group > .nav__item');
        items[index]?.focus();
    }
    focusChild(parentLabel, childIndex) {
        const parentIndex = this.nav.visibleNavLinks().findIndex(l => l.label === parentLabel);
        const groups = document.querySelectorAll('.nav__group');
        const submenu = groups[parentIndex]?.querySelector('.nav__submenu');
        const children = submenu?.querySelectorAll('.nav__item--child');
        children?.[childIndex]?.focus();
    }
    syncShellSidebarWidth() {
        const sidebar = this.sidebarElement();
        const shell = this.host.nativeElement.closest('.shell');
        if (!sidebar || !shell) {
            return;
        }
        const width = Math.ceil(sidebar.getBoundingClientRect().width);
        shell.style.setProperty('--shell-sidebar-width', `${width}px`);
    }
    sidebarElement() {
        return this.host.nativeElement.querySelector('.sidebar');
    }
    static ɵfac = function SidebarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SidebarComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SidebarComponent, selectors: [["app-sidebar"]], outputs: { toggleSidebar: "toggleSidebar" }, decls: 30, vars: 8, consts: [[1, "sidebar"], [1, "sidebar__header"], [1, "brand"], [1, "brand__logo", 3, "src", "alt"], [1, "brand__mark"], [1, "brand__env", 3, "ngClass"], ["pButton", "", "type", "button", "icon", "pi pi-bars", 1, "brand__toggle", "p-button-text", "p-button-sm", 3, "click"], [1, "sidebar__summary"], [1, "summary__badge"], [1, "pi", "pi-bolt"], [1, "summary__hint"], ["role", "navigation", "aria-label", "Main navigation", 1, "nav"], [1, "nav__title"], ["class", "nav__group", 4, "ngFor", "ngForOf"], [1, "sidebar__footer"], [1, "sidebar__footer-meta"], [1, "sidebar__footer-actions"], ["pButton", "", "type", "button", "tooltipPosition", "right", 1, "sidebar__theme-toggle", "p-button-text", 3, "click", "pTooltip"], [1, "pi", 3, "ngClass"], ["pButton", "", "type", "button", "pTooltip", "Keyboard shortcuts (?)", "tooltipPosition", "right", 1, "sidebar__shortcuts", "p-button-text", 3, "click"], [1, "pi", "pi-key"], [1, "nav__group"], ["tooltipPosition", "right", "tabindex", "0", "role", "menuitem", 1, "nav__item", 3, "click", "keydown", "ngClass", "routerLink", "pTooltip"], ["aria-hidden", "true", 1, "nav__pill"], [1, "nav__text"], [1, "nav__label"], ["class", "nav__badge", 4, "ngIf"], ["class", "pi nav__chevron", "aria-hidden", "true", 3, "ngClass", 4, "ngIf"], ["class", "nav__children", "role", "menu", 3, "ngClass", 4, "ngIf"], [1, "nav__badge"], ["aria-hidden", "true", 1, "pi", "nav__chevron", 3, "ngClass"], ["role", "menu", 1, "nav__children", 3, "ngClass"], ["class", "nav__child-group", 4, "ngFor", "ngForOf"], [1, "nav__child-group"], ["routerLinkActive", "nav__child--active", "tabindex", "0", "role", "menuitem", 1, "nav__child", 3, "click", "keydown", "routerLink", "routerLinkActiveOptions", "ngClass"], ["aria-hidden", "true", 1, "dot"], [1, "pi", "nav__icon", 3, "ngClass"], ["class", "pi nav__chevron nav__chevron--child", "aria-hidden", "true", 3, "ngClass", 4, "ngIf"], ["class", "nav__grandchildren", "role", "menu", 3, "ngClass", 4, "ngIf"], ["aria-hidden", "true", 1, "pi", "nav__chevron", "nav__chevron--child", 3, "ngClass"], ["role", "menu", 1, "nav__grandchildren", 3, "ngClass"], ["class", "nav__grandchild", "routerLinkActive", "nav__grandchild--active", "tabindex", "0", "role", "menuitem", 3, "routerLink", "routerLinkActiveOptions", "nav__grandchild--disabled", 4, "ngFor", "ngForOf"], ["routerLinkActive", "nav__grandchild--active", "tabindex", "0", "role", "menuitem", 1, "nav__grandchild", 3, "routerLink", "routerLinkActiveOptions"]], template: function SidebarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "aside", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵconditionalCreate(3, SidebarComponent_Conditional_3_Template, 1, 2, "img", 3)(4, SidebarComponent_Conditional_4_Template, 2, 0, "div", 4);
            i0.ɵɵelementStart(5, "div", 5);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "button", 6);
            i0.ɵɵlistener("click", function SidebarComponent_Template_button_click_7_listener() { return ctx.toggleSidebar.emit(); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 7)(9, "div", 8);
            i0.ɵɵelement(10, "i", 9);
            i0.ɵɵelementStart(11, "span");
            i0.ɵɵtext(12, "Workspace");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "p", 10);
            i0.ɵɵtext(14, "Compact, quick-jump rail.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "nav", 11)(16, "p", 12);
            i0.ɵɵtext(17, "Navigate");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(18, SidebarComponent_div_18_Template, 10, 17, "div", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 14)(20, "div", 15)(21, "span");
            i0.ɵɵtext(22, "Quick tools");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "small");
            i0.ɵɵtext(24, "\u2318K for command palette");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "div", 16)(26, "button", 17);
            i0.ɵɵlistener("click", function SidebarComponent_Template_button_click_26_listener() { return ctx.themeService.toggleDarkMode(); });
            i0.ɵɵelement(27, "i", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "button", 19);
            i0.ɵɵlistener("click", function SidebarComponent_Template_button_click_28_listener() { return ctx.shortcutsService.openHelpModal(); });
            i0.ɵɵelement(29, "i", 20);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.branding.logoUrl() ? 3 : 4);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c0, ctx.environment.production));
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.environment.envLabel);
            i0.ɵɵadvance(12);
            i0.ɵɵproperty("ngForOf", ctx.nav.visibleNavLinks());
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("pTooltip", ctx.themeService.themeLabel());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", ctx.themeService.themeIcon());
        } }, dependencies: [RouterLink,
            RouterLinkActive,
            NgFor,
            NgIf,
            NgClass,
            ButtonModule, i1.ButtonDirective, TooltipModule, i2.Tooltip], styles: ["[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n  min-height: 100%;\n  width: max-content;\n  min-width: 256px;\n  max-width: 380px;\n}\n\n.sidebar[_ngcontent-%COMP%] {\n  background: linear-gradient(180deg, #0c1f36 0%, #0d2a4c 40%, #0a1c33 100%);\n  color: #e5e7eb;\n  padding: var(--md-space-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--md-space-4);\n  border-right: 1px solid rgba(255, 255, 255, 0.08);\n  transition: padding 0.2s ease;\n  backdrop-filter: blur(14px);\n  box-shadow: 0 18px 60px rgba(9, 18, 42, 0.55);\n  min-height: 100%;\n  height: 100%;\n  overflow-y: auto;\n  width: max-content;\n  min-width: 256px;\n  max-width: 380px;\n  overscroll-behavior: contain;\n}\n\n.sidebar__header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--md-space-3);\n  padding: var(--md-space-2) var(--md-space-3);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n}\n\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--md-space-3);\n}\n\n.brand__mark[_ngcontent-%COMP%] {\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  font-size: 0.95rem;\n}\n\n.brand__logo[_ngcontent-%COMP%] {\n  height: 28px;\n  max-width: 120px;\n  object-fit: contain;\n  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));\n}\n\n.brand__env[_ngcontent-%COMP%] {\n  padding: 0.25rem 0.6rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #0f172a;\n  background: #a5f3fc;\n}\n\n.brand__toggle[_ngcontent-%COMP%] {\n  color: #e5e7eb !important;\n}\n\n.brand__env--prod[_ngcontent-%COMP%] {\n  background: #fcd34d;\n}\n\n.sidebar__summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  padding: var(--md-space-3);\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(255, 255, 255, 0.06);\n}\n\n.summary__badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: rgba(99, 102, 241, 0.2);\n  color: #c7d2fe;\n  font-weight: 600;\n  width: fit-content;\n  font-size: 0.85rem;\n}\n\n.summary__hint[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #9fb1c9;\n  font-size: 0.85rem;\n}\n\n.nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--md-space-2);\n  overflow: visible;\n  flex: 0 0 auto;\n}\n\n.nav__title[_ngcontent-%COMP%] {\n  margin: 0;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  font-size: 0.72rem;\n  color: #93c5fd;\n  padding-left: 2px;\n}\n\n.nav__group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin: 2px 0;\n}\n\n.nav__item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--md-space-3);\n  padding: 10px var(--md-space-3);\n  border-radius: 12px;\n  color: #dfe7f5;\n  text-decoration: none;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  cursor: pointer;\n  outline: none;\n  border: 1px solid rgba(255, 255, 255, 0.06);\n  user-select: none;\n  margin: 0;\n  background: rgba(255, 255, 255, 0.02);\n  position: relative;\n\n  &:focus-visible {\n    outline: 2px solid rgba(124, 210, 255, 0.6);\n    outline-offset: 2px;\n  }\n}\n\n.nav__item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:first-child {\n  font-size: 1rem;\n  width: 20px;\n  text-align: center;\n  flex-shrink: 0;\n}\n\n.nav__pill[_ngcontent-%COMP%] {\n  width: 6px;\n  align-self: stretch;\n  border-radius: 8px;\n  background: linear-gradient(180deg, rgba(124, 210, 255, 0.9), rgba(93, 225, 194, 0.6));\n  opacity: 0;\n  transition: opacity 0.2s ease, transform 0.25s ease;\n  transform: scaleY(0.6);\n}\n\n.nav__text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: max-content;\n}\n\n.nav__label[_ngcontent-%COMP%] {\n  flex: 1;\n  white-space: nowrap;\n  overflow: visible;\n  text-overflow: clip;\n  font-weight: 600;\n}\n\n.nav__chevron[_ngcontent-%COMP%] {\n  font-size: 0.7rem !important;\n  opacity: 0.5;\n  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;\n  width: auto !important;\n}\n\n.nav__item[_ngcontent-%COMP%]:hover {\n  background: linear-gradient(90deg, rgba(29, 155, 240, 0.18), rgba(93, 225, 194, 0.12));\n  color: #ffffff;\n  transform: translateX(2px);\n  border-color: rgba(124, 210, 255, 0.25);\n}\n\n.nav__item[_ngcontent-%COMP%]:hover   .nav__pill[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  transform: scaleY(1);\n}\n\n.nav__item--active[_ngcontent-%COMP%] {\n  background: linear-gradient(90deg, rgba(29, 155, 240, 0.45), rgba(93, 225, 194, 0.3));\n  color: #e0f2fe;\n  border-color: rgba(124, 210, 255, 0.55);\n  box-shadow: 0 8px 24px rgba(13, 101, 173, 0.25);\n}\n\n.nav__item--active[_ngcontent-%COMP%]   .nav__pill[_ngcontent-%COMP%] {\n  opacity: 1;\n  transform: scaleY(1);\n}\n\n.nav__item--disabled[_ngcontent-%COMP%] {\n  opacity: 0.4;\n  pointer-events: none;\n}\n\n.nav__children[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin-left: 14px;\n  padding-left: 10px;\n  border-left: 2px solid rgba(124, 210, 255, 0.2);\n  max-height: 0;\n  overflow: hidden;\n  opacity: 0;\n  transition: max-height 0.3s ease, opacity 0.2s ease, padding 0.2s ease;\n}\n\n.nav__children--open[_ngcontent-%COMP%] {\n  max-height: 1600px;\n  opacity: 1;\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n\n.nav__child[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 10px;\n  border-radius: 10px;\n  color: #cfd9eb;\n  font-size: 0.88rem;\n  text-decoration: none;\n  background: rgba(255, 255, 255, 0.02);\n  transition: all 0.2s ease;\n  width: max-content;\n  min-width: 100%;\n}\n\n.nav__child-group[_ngcontent-%COMP%]    + .nav__child-group[_ngcontent-%COMP%] {\n  margin-top: 4px;\n}\n\n.nav__child[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: rgba(124, 210, 255, 0.8);\n  opacity: 0.6;\n}\n\n.nav__icon[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #60a5fa;\n}\n\n.nav__child[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.08);\n  transform: translateX(4px);\n}\n\n.nav__child--active[_ngcontent-%COMP%] {\n  background: rgba(124, 210, 255, 0.16);\n  color: #e0f2fe;\n}\n\n.nav__child--disabled[_ngcontent-%COMP%] {\n  opacity: 0.4;\n  pointer-events: none;\n}\n\n.nav__grandchildren[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 6px;\n  margin-left: 18px;\n  max-height: 0;\n  opacity: 0;\n  overflow: hidden;\n  transition: max-height 0.25s ease, opacity 0.2s ease, margin 0.2s ease;\n}\n\n.nav__grandchildren--open[_ngcontent-%COMP%] {\n  max-height: 1200px;\n  opacity: 1;\n  margin: 6px 0 8px 18px;\n}\n\n.nav__grandchild[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 6px 10px;\n  border-radius: 10px;\n  color: rgba(207, 217, 235, 0.85);\n  font-size: 0.84rem;\n  text-decoration: none;\n  background: rgba(255, 255, 255, 0.02);\n  transition: all 0.2s ease;\n  width: max-content;\n  min-width: 100%;\n}\n\n.nav__grandchild[_ngcontent-%COMP%]   .dot[_ngcontent-%COMP%] {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: rgba(124, 210, 255, 0.6);\n  opacity: 0.7;\n}\n\n.nav__grandchild[_ngcontent-%COMP%]   .nav__icon[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #a78bfa;\n}\n\n.nav__grandchild[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.08);\n  transform: translateX(4px);\n  color: #e0f2fe;\n}\n\n.nav__grandchild--active[_ngcontent-%COMP%] {\n  background: rgba(124, 210, 255, 0.16);\n  color: #e0f2fe;\n}\n\n.nav__grandchild--disabled[_ngcontent-%COMP%] {\n  opacity: 0.4;\n  pointer-events: none;\n}\n\n.nav__chevron--child[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 0.75rem;\n  opacity: 0.75;\n  color: #94a3b8;\n}\n\n.nav__badge[_ngcontent-%COMP%] {\n  margin-left: auto;\n  background: rgba(255, 255, 255, 0.12);\n  padding: 0.15rem 0.5rem;\n  border-radius: 8px;\n  font-size: 0.75rem;\n}\n\n\n\n.sidebar__footer[_ngcontent-%COMP%] {\n  margin-top: auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--md-space-3);\n  padding-top: var(--md-space-4);\n  border-top: 1px solid rgba(255, 255, 255, 0.08);\n}\n\n.sidebar__footer-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  color: #cbd5e1;\n  font-size: 0.85rem;\n}\n\n.sidebar__footer-meta[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #9fb1c9;\n}\n\n.sidebar__footer-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--md-space-2);\n}\n\n.sidebar__theme-toggle.p-button[_ngcontent-%COMP%], \n.sidebar__shortcuts.p-button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.06);\n  color: #94a3b8;\n  transition: all 0.15s ease;\n}\n\n.sidebar__theme-toggle.p-button[_ngcontent-%COMP%]:hover, \n.sidebar__shortcuts.p-button[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.12);\n  color: #e2e8f0;\n}\n\n\n\n.shell--collapsed[_nghost-%COMP%], .shell--collapsed   [_nghost-%COMP%] {\n  width: 88px;\n  min-width: 88px;\n  max-width: 88px;\n\n  .sidebar {\n    padding: var(--md-space-4) var(--md-space-2);\n    width: 88px;\n    min-width: 88px;\n    max-width: 88px;\n  }\n\n  .brand__mark,\n  .brand__env {\n    display: none;\n  }\n\n  .nav__text,\n  .nav__chevron,\n  .nav__title,\n  .sidebar__summary,\n  .sidebar__footer {\n    display: none;\n  }\n\n  .nav__children {\n    display: none;\n  }\n\n  .nav__item {\n    justify-content: center;\n    padding: var(--md-space-3);\n  }\n}\n\n\n\n@media (max-width: 840px) {\n  //[_ngcontent-%COMP%]   Mobile[_ngcontent-%COMP%]   off-canvas[_ngcontent-%COMP%]   sidebar[_ngcontent-%COMP%]   to[_ngcontent-%COMP%]   keep[_ngcontent-%COMP%]   navigation[_ngcontent-%COMP%]   usable[_ngcontent-%COMP%]   on[_ngcontent-%COMP%]   small[_ngcontent-%COMP%]   screens.\n[_ngcontent-%COMP%]   .sidebar[_ngcontent-%COMP%] {\n    position: fixed;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    z-index: 20;\n    width: min(86vw, 380px);\n    max-width: 100%;\n    transform: translateX(0);\n    margin-left: 0;\n    right: auto;\n    transition: transform 0.25s ease;\n    overflow-y: auto;\n    flex-direction: column;\n    align-items: stretch;\n    justify-content: flex-start;\n  }\n\n  .nav[_ngcontent-%COMP%] {\n    flex-direction: column;\n    flex-wrap: nowrap;\n  }\n\n  .nav__item[_ngcontent-%COMP%] {\n    padding: var(--md-space-2) var(--md-space-4);\n  }\n\n  .sidebar__footer[_ngcontent-%COMP%] {\n    margin-top: auto;\n    padding-top: var(--md-space-4);\n    border-top: 1px solid rgba(255, 255, 255, 0.08);\n    padding-left: 0;\n    border-left: none;\n  }\n}\n\n@media (max-width: 840px) {\n  .shell--collapsed[_nghost-%COMP%], .shell--collapsed   [_nghost-%COMP%] {\n    .sidebar {\n      transform: translateX(-110%);\n      pointer-events: none;\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SidebarComponent, [{
        type: Component,
        args: [{ selector: 'app-sidebar', standalone: true, imports: [
                    RouterLink,
                    RouterLinkActive,
                    NgFor,
                    NgIf,
                    NgClass,
                    ButtonModule,
                    TooltipModule
                ], template: "\n    <aside class=\"sidebar\">\n      <div class=\"sidebar__header\">\n        <div class=\"brand\">\n          @if (branding.logoUrl()) {\n            <img class=\"brand__logo\" [src]=\"branding.logoUrl()\" [alt]=\"branding.tenantName() ?? 'CRM'\" />\n          } @else {\n            <div class=\"brand__mark\">CRM</div>\n          }\n          <div class=\"brand__env\" [ngClass]=\"{ 'brand__env--prod': environment.production }\">{{ environment.envLabel }}</div>\n        </div>\n        <button pButton type=\"button\" icon=\"pi pi-bars\" class=\"brand__toggle p-button-text p-button-sm\" (click)=\"toggleSidebar.emit()\"></button>\n      </div>\n      <div class=\"sidebar__summary\">\n        <div class=\"summary__badge\">\n          <i class=\"pi pi-bolt\"></i>\n          <span>Workspace</span>\n        </div>\n        <p class=\"summary__hint\">Compact, quick-jump rail.</p>\n      </div>\n\n      <nav class=\"nav\" role=\"navigation\" aria-label=\"Main navigation\">\n        <p class=\"nav__title\">Navigate</p>\n        <div class=\"nav__group\" *ngFor=\"let link of nav.visibleNavLinks(); let linkIndex = index\">\n          <a\n            class=\"nav__item\"\n            [ngClass]=\"{ 'nav__item--active': nav.isParentActive(link) }\"\n            [routerLink]=\"link.children?.length ? null : link.path\"\n            (click)=\"handleNavClick($event, link)\"\n            (keydown)=\"handleKeydown($event, link, linkIndex)\"\n            [attr.aria-disabled]=\"link.disabled || null\"\n            [attr.aria-expanded]=\"link.children?.length ? nav.isMenuExpanded(link.label) : null\"\n            [attr.aria-haspopup]=\"link.children?.length ? 'menu' : null\"\n            [class.nav__item--disabled]=\"link.disabled\"\n            [pTooltip]=\"nav.collapsed() ? link.label : ''\"\n            tooltipPosition=\"right\"\n            tabindex=\"0\"\n            role=\"menuitem\"\n          >\n            <span class=\"nav__pill\" aria-hidden=\"true\"></span>\n            <i class=\"pi\" [ngClass]=\"link.icon\" [style.color]=\"resolveIconColor(link)\"></i>\n            <div class=\"nav__text\">\n              <span class=\"nav__label\">{{ link.label }}</span>\n            </div>\n            <span *ngIf=\"link.badge\" class=\"nav__badge\">{{ link.badge }}</span>\n            <i *ngIf=\"link.children?.length\" class=\"pi nav__chevron\" [ngClass]=\"nav.isMenuExpanded(link.label) ? 'pi-chevron-up' : 'pi-chevron-right'\" aria-hidden=\"true\"></i>\n          </a>\n\n          <div\n            class=\"nav__children\"\n            *ngIf=\"link.children?.length\"\n            [ngClass]=\"{ 'nav__children--open': nav.isMenuExpanded(link.label) }\"\n            role=\"menu\"\n            [attr.aria-label]=\"link.label + ' submenu'\"\n          >\n            <div *ngFor=\"let child of link.children; let i = index\" class=\"nav__child-group\">\n              <a\n                class=\"nav__child\"\n                [routerLink]=\"child.children?.length ? null : child.path\"\n                routerLinkActive=\"nav__child--active\"\n                [routerLinkActiveOptions]=\"{ exact: true }\"\n                [ngClass]=\"{ 'nav__child--active': nav.isChildActive(link, child) }\"\n                [attr.aria-disabled]=\"child.disabled || null\"\n                [attr.aria-expanded]=\"child.children?.length ? nav.isChildExpanded(link.label, child.label) : null\"\n                [class.nav__child--disabled]=\"child.disabled\"\n                (click)=\"handleChildClick($event, link, child)\"\n                (keydown)=\"handleChildKeydown($event, link, child, i)\"\n                tabindex=\"0\"\n                role=\"menuitem\"\n              >\n                <span class=\"dot\" aria-hidden=\"true\"></span>\n                <i class=\"pi nav__icon\" [ngClass]=\"child.icon\" [style.color]=\"resolveIconColor(child)\"></i>\n                <div class=\"nav__text\">\n                  <span class=\"nav__label\">{{ child.label }}</span>\n                </div>\n                <span *ngIf=\"child.badge\" class=\"nav__badge\">{{ child.badge }}</span>\n                <i\n                  *ngIf=\"child.children?.length\"\n                  class=\"pi nav__chevron nav__chevron--child\"\n                  [ngClass]=\"nav.isChildExpanded(link.label, child.label) ? 'pi-chevron-up' : 'pi-chevron-right'\"\n                  aria-hidden=\"true\">\n                </i>\n              </a>\n\n              <div\n                class=\"nav__grandchildren\"\n                *ngIf=\"child.children?.length\"\n                [ngClass]=\"{ 'nav__grandchildren--open': nav.isChildExpanded(link.label, child.label) }\"\n                role=\"menu\"\n                [attr.aria-label]=\"child.label + ' submenu'\"\n              >\n                <a\n                  *ngFor=\"let grandChild of child.children\"\n                  class=\"nav__grandchild\"\n                  [routerLink]=\"grandChild.path\"\n                  routerLinkActive=\"nav__grandchild--active\"\n                  [routerLinkActiveOptions]=\"{ exact: true }\"\n                  [attr.aria-disabled]=\"grandChild.disabled || null\"\n                  [class.nav__grandchild--disabled]=\"grandChild.disabled\"\n                  tabindex=\"0\"\n                  role=\"menuitem\"\n                >\n                  <span class=\"dot\" aria-hidden=\"true\"></span>\n                  <i class=\"pi nav__icon\" [ngClass]=\"grandChild.icon\" [style.color]=\"resolveIconColor(grandChild)\"></i>\n                  <div class=\"nav__text\">\n                    <span class=\"nav__label\">{{ grandChild.label }}</span>\n                  </div>\n                </a>\n              </div>\n            </div>\n          </div>\n        </div>\n      </nav>\n\n      <div class=\"sidebar__footer\">\n        <div class=\"sidebar__footer-meta\">\n          <span>Quick tools</span>\n          <small>\u2318K for command palette</small>\n        </div>\n        <div class=\"sidebar__footer-actions\">\n          <button\n            pButton\n            type=\"button\"\n            class=\"sidebar__theme-toggle p-button-text\"\n            (click)=\"themeService.toggleDarkMode()\"\n            [pTooltip]=\"themeService.themeLabel()\"\n            tooltipPosition=\"right\"\n          >\n            <i class=\"pi\" [ngClass]=\"themeService.themeIcon()\"></i>\n          </button>\n          <button\n            pButton\n            type=\"button\"\n            class=\"sidebar__shortcuts p-button-text\"\n            (click)=\"shortcutsService.openHelpModal()\"\n            pTooltip=\"Keyboard shortcuts (?)\"\n            tooltipPosition=\"right\"\n          >\n            <i class=\"pi pi-key\"></i>\n          </button>\n        </div>\n      </div>\n    </aside>\n  \n", styles: [":host {\n  display: block;\n  height: 100%;\n  min-height: 100%;\n  width: max-content;\n  min-width: 256px;\n  max-width: 380px;\n}\n\n.sidebar {\n  background: linear-gradient(180deg, #0c1f36 0%, #0d2a4c 40%, #0a1c33 100%);\n  color: #e5e7eb;\n  padding: var(--md-space-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--md-space-4);\n  border-right: 1px solid rgba(255, 255, 255, 0.08);\n  transition: padding 0.2s ease;\n  backdrop-filter: blur(14px);\n  box-shadow: 0 18px 60px rgba(9, 18, 42, 0.55);\n  min-height: 100%;\n  height: 100%;\n  overflow-y: auto;\n  width: max-content;\n  min-width: 256px;\n  max-width: 380px;\n  overscroll-behavior: contain;\n}\n\n.sidebar__header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--md-space-3);\n  padding: var(--md-space-2) var(--md-space-3);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);\n}\n\n.brand {\n  display: flex;\n  align-items: center;\n  gap: var(--md-space-3);\n}\n\n.brand__mark {\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  font-size: 0.95rem;\n}\n\n.brand__logo {\n  height: 28px;\n  max-width: 120px;\n  object-fit: contain;\n  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));\n}\n\n.brand__env {\n  padding: 0.25rem 0.6rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #0f172a;\n  background: #a5f3fc;\n}\n\n.brand__toggle {\n  color: #e5e7eb !important;\n}\n\n.brand__env--prod {\n  background: #fcd34d;\n}\n\n.sidebar__summary {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  padding: var(--md-space-3);\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(255, 255, 255, 0.06);\n}\n\n.summary__badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 10px;\n  border-radius: 999px;\n  background: rgba(99, 102, 241, 0.2);\n  color: #c7d2fe;\n  font-weight: 600;\n  width: fit-content;\n  font-size: 0.85rem;\n}\n\n.summary__hint {\n  margin: 0;\n  color: #9fb1c9;\n  font-size: 0.85rem;\n}\n\n.nav {\n  display: flex;\n  flex-direction: column;\n  gap: var(--md-space-2);\n  overflow: visible;\n  flex: 0 0 auto;\n}\n\n.nav__title {\n  margin: 0;\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n  font-size: 0.72rem;\n  color: #93c5fd;\n  padding-left: 2px;\n}\n\n.nav__group {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin: 2px 0;\n}\n\n.nav__item {\n  display: flex;\n  align-items: center;\n  gap: var(--md-space-3);\n  padding: 10px var(--md-space-3);\n  border-radius: 12px;\n  color: #dfe7f5;\n  text-decoration: none;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  cursor: pointer;\n  outline: none;\n  border: 1px solid rgba(255, 255, 255, 0.06);\n  user-select: none;\n  margin: 0;\n  background: rgba(255, 255, 255, 0.02);\n  position: relative;\n\n  &:focus-visible {\n    outline: 2px solid rgba(124, 210, 255, 0.6);\n    outline-offset: 2px;\n  }\n}\n\n.nav__item i:first-child {\n  font-size: 1rem;\n  width: 20px;\n  text-align: center;\n  flex-shrink: 0;\n}\n\n.nav__pill {\n  width: 6px;\n  align-self: stretch;\n  border-radius: 8px;\n  background: linear-gradient(180deg, rgba(124, 210, 255, 0.9), rgba(93, 225, 194, 0.6));\n  opacity: 0;\n  transition: opacity 0.2s ease, transform 0.25s ease;\n  transform: scaleY(0.6);\n}\n\n.nav__text {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: max-content;\n}\n\n.nav__label {\n  flex: 1;\n  white-space: nowrap;\n  overflow: visible;\n  text-overflow: clip;\n  font-weight: 600;\n}\n\n.nav__chevron {\n  font-size: 0.7rem !important;\n  opacity: 0.5;\n  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;\n  width: auto !important;\n}\n\n.nav__item:hover {\n  background: linear-gradient(90deg, rgba(29, 155, 240, 0.18), rgba(93, 225, 194, 0.12));\n  color: #ffffff;\n  transform: translateX(2px);\n  border-color: rgba(124, 210, 255, 0.25);\n}\n\n.nav__item:hover .nav__pill {\n  opacity: 0.6;\n  transform: scaleY(1);\n}\n\n.nav__item--active {\n  background: linear-gradient(90deg, rgba(29, 155, 240, 0.45), rgba(93, 225, 194, 0.3));\n  color: #e0f2fe;\n  border-color: rgba(124, 210, 255, 0.55);\n  box-shadow: 0 8px 24px rgba(13, 101, 173, 0.25);\n}\n\n.nav__item--active .nav__pill {\n  opacity: 1;\n  transform: scaleY(1);\n}\n\n.nav__item--disabled {\n  opacity: 0.4;\n  pointer-events: none;\n}\n\n.nav__children {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin-left: 14px;\n  padding-left: 10px;\n  border-left: 2px solid rgba(124, 210, 255, 0.2);\n  max-height: 0;\n  overflow: hidden;\n  opacity: 0;\n  transition: max-height 0.3s ease, opacity 0.2s ease, padding 0.2s ease;\n}\n\n.nav__children--open {\n  max-height: 1600px;\n  opacity: 1;\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n\n.nav__child {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 10px;\n  border-radius: 10px;\n  color: #cfd9eb;\n  font-size: 0.88rem;\n  text-decoration: none;\n  background: rgba(255, 255, 255, 0.02);\n  transition: all 0.2s ease;\n  width: max-content;\n  min-width: 100%;\n}\n\n.nav__child-group + .nav__child-group {\n  margin-top: 4px;\n}\n\n.nav__child .dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: rgba(124, 210, 255, 0.8);\n  opacity: 0.6;\n}\n\n.nav__icon {\n  font-size: 0.9rem;\n  color: #60a5fa;\n}\n\n.nav__child:hover {\n  background: rgba(255, 255, 255, 0.08);\n  transform: translateX(4px);\n}\n\n.nav__child--active {\n  background: rgba(124, 210, 255, 0.16);\n  color: #e0f2fe;\n}\n\n.nav__child--disabled {\n  opacity: 0.4;\n  pointer-events: none;\n}\n\n.nav__grandchildren {\n  display: grid;\n  gap: 6px;\n  margin-left: 18px;\n  max-height: 0;\n  opacity: 0;\n  overflow: hidden;\n  transition: max-height 0.25s ease, opacity 0.2s ease, margin 0.2s ease;\n}\n\n.nav__grandchildren--open {\n  max-height: 1200px;\n  opacity: 1;\n  margin: 6px 0 8px 18px;\n}\n\n.nav__grandchild {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 6px 10px;\n  border-radius: 10px;\n  color: rgba(207, 217, 235, 0.85);\n  font-size: 0.84rem;\n  text-decoration: none;\n  background: rgba(255, 255, 255, 0.02);\n  transition: all 0.2s ease;\n  width: max-content;\n  min-width: 100%;\n}\n\n.nav__grandchild .dot {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: rgba(124, 210, 255, 0.6);\n  opacity: 0.7;\n}\n\n.nav__grandchild .nav__icon {\n  font-size: 0.85rem;\n  color: #a78bfa;\n}\n\n.nav__grandchild:hover {\n  background: rgba(255, 255, 255, 0.08);\n  transform: translateX(4px);\n  color: #e0f2fe;\n}\n\n.nav__grandchild--active {\n  background: rgba(124, 210, 255, 0.16);\n  color: #e0f2fe;\n}\n\n.nav__grandchild--disabled {\n  opacity: 0.4;\n  pointer-events: none;\n}\n\n.nav__chevron--child {\n  margin-left: auto;\n  font-size: 0.75rem;\n  opacity: 0.75;\n  color: #94a3b8;\n}\n\n.nav__badge {\n  margin-left: auto;\n  background: rgba(255, 255, 255, 0.12);\n  padding: 0.15rem 0.5rem;\n  border-radius: 8px;\n  font-size: 0.75rem;\n}\n\n/* Sidebar footer */\n.sidebar__footer {\n  margin-top: auto;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--md-space-3);\n  padding-top: var(--md-space-4);\n  border-top: 1px solid rgba(255, 255, 255, 0.08);\n}\n\n.sidebar__footer-meta {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  color: #cbd5e1;\n  font-size: 0.85rem;\n}\n\n.sidebar__footer-meta small {\n  color: #9fb1c9;\n}\n\n.sidebar__footer-actions {\n  display: flex;\n  align-items: center;\n  gap: var(--md-space-2);\n}\n\n.sidebar__theme-toggle.p-button,\n.sidebar__shortcuts.p-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  border: none;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.06);\n  color: #94a3b8;\n  transition: all 0.15s ease;\n}\n\n.sidebar__theme-toggle.p-button:hover,\n.sidebar__shortcuts.p-button:hover {\n  background: rgba(255, 255, 255, 0.12);\n  color: #e2e8f0;\n}\n\n/* Collapsed state overrides - applied from parent shell */\n:host-context(.shell--collapsed) {\n  width: 88px;\n  min-width: 88px;\n  max-width: 88px;\n\n  .sidebar {\n    padding: var(--md-space-4) var(--md-space-2);\n    width: 88px;\n    min-width: 88px;\n    max-width: 88px;\n  }\n\n  .brand__mark,\n  .brand__env {\n    display: none;\n  }\n\n  .nav__text,\n  .nav__chevron,\n  .nav__title,\n  .sidebar__summary,\n  .sidebar__footer {\n    display: none;\n  }\n\n  .nav__children {\n    display: none;\n  }\n\n  .nav__item {\n    justify-content: center;\n    padding: var(--md-space-3);\n  }\n}\n\n/* Mobile responsive */\n@media (max-width: 840px) {\n  // Mobile off-canvas sidebar to keep navigation usable on small screens.\n  .sidebar {\n    position: fixed;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    z-index: 20;\n    width: min(86vw, 380px);\n    max-width: 100%;\n    transform: translateX(0);\n    margin-left: 0;\n    right: auto;\n    transition: transform 0.25s ease;\n    overflow-y: auto;\n    flex-direction: column;\n    align-items: stretch;\n    justify-content: flex-start;\n  }\n\n  .nav {\n    flex-direction: column;\n    flex-wrap: nowrap;\n  }\n\n  .nav__item {\n    padding: var(--md-space-2) var(--md-space-4);\n  }\n\n  .sidebar__footer {\n    margin-top: auto;\n    padding-top: var(--md-space-4);\n    border-top: 1px solid rgba(255, 255, 255, 0.08);\n    padding-left: 0;\n    border-left: none;\n  }\n}\n\n@media (max-width: 840px) {\n  :host-context(.shell--collapsed) {\n    .sidebar {\n      transform: translateX(-110%);\n      pointer-events: none;\n    }\n  }\n}\n"] }]
    }], null, { toggleSidebar: [{ type: i0.Output, args: ["toggleSidebar"] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src/app/layout/sidebar/sidebar.component.ts", lineNumber: 27 }); })();
