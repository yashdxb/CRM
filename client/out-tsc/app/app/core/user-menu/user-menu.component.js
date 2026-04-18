import { Component, inject, signal, HostListener, ElementRef, computed } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { trigger, transition, style, animate } from '@angular/animations';
import { ThemeService } from '../theme/theme.service';
import { readTokenContext } from '../auth/token.utils';
import { AuthService } from '../auth/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/avatar";
import * as i2 from "primeng/button";
const _c0 = () => ({ "background": "linear-gradient(135deg, #6366f1, #8b5cf6)" });
const _c1 = a0 => ({ "user-menu__chevron--open": a0 });
function UserMenuComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9)(1, "div", 10);
    i0.ɵɵelement(2, "p-avatar", 11);
    i0.ɵɵelementStart(3, "div")(4, "p", 12);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 13);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(8, "div", 14);
    i0.ɵɵelementStart(9, "div", 15)(10, "button", 16);
    i0.ɵɵlistener("click", function UserMenuComponent_div_10_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.navigateTo("/app/settings")); });
    i0.ɵɵelement(11, "i", 17);
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13, "My Account");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "button", 16);
    i0.ɵɵlistener("click", function UserMenuComponent_div_10_Template_button_click_14_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.navigateTo("/change-password")); });
    i0.ɵɵelement(15, "i", 18);
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17, "Change Password");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "button", 16);
    i0.ɵɵlistener("click", function UserMenuComponent_div_10_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.navigateTo("/app/settings")); });
    i0.ɵɵelement(19, "i", 19);
    i0.ɵɵelementStart(20, "span");
    i0.ɵɵtext(21, "Workspace Settings");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(22, "div", 14);
    i0.ɵɵelementStart(23, "div", 15)(24, "button", 16);
    i0.ɵɵlistener("click", function UserMenuComponent_div_10_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.toggleTheme()); });
    i0.ɵɵelement(25, "i", 20);
    i0.ɵɵelementStart(26, "span");
    i0.ɵɵtext(27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "span", 21);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "button", 16);
    i0.ɵɵlistener("click", function UserMenuComponent_div_10_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.openKeyboardShortcuts()); });
    i0.ɵɵelement(31, "i", 22);
    i0.ɵɵelementStart(32, "span");
    i0.ɵɵtext(33, "Keyboard Shortcuts");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "kbd");
    i0.ɵɵtext(35, "?");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(36, "div", 14);
    i0.ɵɵelementStart(37, "div", 15)(38, "button", 23);
    i0.ɵɵlistener("click", function UserMenuComponent_div_10_Template_button_click_38_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.logout()); });
    i0.ɵɵelement(39, "i", 24);
    i0.ɵɵelementStart(40, "span");
    i0.ɵɵtext(41, "Sign Out");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("@dropdownAnimation", undefined);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(9, _c0));
    i0.ɵɵproperty("image", ctx_r2.user().avatarUrl || "https://i.pravatar.cc/150?u=" + (ctx_r2.user().email || ctx_r2.user().fullName));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.user().fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.user().email);
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("ngClass", ctx_r2.themeService.themeIcon());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.themeService.themeLabel());
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.themeService.isDarkMode() ? "On" : "Off");
} }
export class UserMenuComponent {
    themeService = inject(ThemeService);
    router = inject(Router);
    elementRef = inject(ElementRef);
    authService = inject(AuthService);
    isOpen = signal(false, ...(ngDevMode ? [{ debugName: "isOpen" }] : []));
    user = signal(this.getUserFromToken(), ...(ngDevMode ? [{ debugName: "user" }] : []));
    // Computed signal for initials to avoid recalculation on each change detection
    initials = computed(() => {
        return this.user().fullName
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }, ...(ngDevMode ? [{ debugName: "initials" }] : []));
    onDocumentClick(event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen.set(false);
        }
    }
    onEscapeKey() {
        this.isOpen.set(false);
    }
    toggleMenu() {
        this.isOpen.update(v => !v);
    }
    navigateTo(path) {
        this.router.navigate([path]);
        this.isOpen.set(false);
    }
    toggleTheme() {
        this.themeService.toggleDarkMode();
    }
    openKeyboardShortcuts() {
        // Will dispatch event to show shortcuts modal
        window.dispatchEvent(new CustomEvent('show-keyboard-shortcuts'));
        this.isOpen.set(false);
    }
    logout() {
        this.authService.logout();
        this.isOpen.set(false);
    }
    getUserFromToken() {
        const context = readTokenContext();
        if (!context) {
            return { fullName: 'Guest', email: '', role: 'Signed out' };
        }
        const payload = context.payload;
        const roleClaim = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const roles = Array.isArray(roleClaim)
            ? roleClaim.filter((role) => typeof role === 'string')
            : typeof roleClaim === 'string'
                ? [roleClaim]
                : [];
        const fullName = typeof payload['unique_name'] === 'string' ? payload['unique_name'] : 'User';
        const email = typeof payload['email'] === 'string' ? payload['email'] : '';
        const role = roles[0] ?? 'User';
        const avatarUrl = (typeof payload['profile_picture_url'] === 'string' && payload['profile_picture_url']) ||
            (typeof payload['profilePictureUrl'] === 'string' && payload['profilePictureUrl']) ||
            (typeof payload['picture'] === 'string' && payload['picture']) ||
            undefined;
        return { fullName, email, role, avatarUrl };
    }
    static ɵfac = function UserMenuComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserMenuComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserMenuComponent, selectors: [["app-user-menu"]], hostBindings: function UserMenuComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function UserMenuComponent_click_HostBindingHandler($event) { return ctx.onDocumentClick($event); }, i0.ɵɵresolveDocument)("keydown.escape", function UserMenuComponent_keydown_escape_HostBindingHandler() { return ctx.onEscapeKey(); }, i0.ɵɵresolveDocument);
        } }, decls: 11, vars: 11, consts: [["menuContainer", ""], [1, "user-menu"], ["pButton", "", "type", "button", 1, "user-menu__trigger", "p-button-text", 3, "click"], ["shape", "circle", "styleClass", "user-menu__avatar", 3, "image"], [1, "user-menu__info"], [1, "user-menu__name"], [1, "user-menu__role"], [1, "pi", "pi-chevron-down", "user-menu__chevron", 3, "ngClass"], ["class", "user-menu__dropdown", 4, "ngIf"], [1, "user-menu__dropdown"], [1, "user-menu__header"], ["shape", "circle", "size", "large", 3, "image"], [1, "user-menu__header-name"], [1, "user-menu__header-email"], [1, "user-menu__divider"], [1, "user-menu__section"], ["pButton", "", "type", "button", 1, "user-menu__item", "p-button-text", 3, "click"], [1, "pi", "pi-user"], [1, "pi", "pi-key"], [1, "pi", "pi-cog"], [1, "pi", 3, "ngClass"], [1, "user-menu__badge"], [1, "pi", "pi-keyboard"], ["pButton", "", "type", "button", 1, "user-menu__item", "user-menu__item--danger", "p-button-text", 3, "click"], [1, "pi", "pi-sign-out"]], template: function UserMenuComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 1, 0)(2, "button", 2);
            i0.ɵɵlistener("click", function UserMenuComponent_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.toggleMenu()); });
            i0.ɵɵelement(3, "p-avatar", 3);
            i0.ɵɵelementStart(4, "div", 4)(5, "span", 5);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "span", 6);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(9, "i", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(10, UserMenuComponent_div_10_Template, 42, 10, "div", 8);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵattribute("aria-expanded", ctx.isOpen());
            i0.ɵɵadvance();
            i0.ɵɵstyleMap(i0.ɵɵpureFunction0(8, _c0));
            i0.ɵɵproperty("image", ctx.user().avatarUrl || "https://i.pravatar.cc/150?u=" + (ctx.user().email || ctx.user().fullName));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.user().fullName);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.user().role);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c1, ctx.isOpen()));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isOpen());
        } }, dependencies: [NgIf, NgClass, AvatarModule, i1.Avatar, ButtonModule, i2.ButtonDirective], styles: [".user-menu[_ngcontent-%COMP%] {\n      position: relative;\n    }\n\n    .user-menu__trigger.p-button[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      padding: 6px 12px 6px 6px;\n      border: none;\n      border-radius: 12px;\n      background: transparent;\n      transition: background 0.15s ease;\n    }\n\n    .user-menu__trigger.p-button[_ngcontent-%COMP%]:hover {\n      background: rgba(15, 23, 42, 0.06);\n    }\n\n    .user-menu__info[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      text-align: left;\n    }\n\n    .user-menu__name[_ngcontent-%COMP%] {\n      font-weight: 600;\n      font-size: 0.875rem;\n      color: var(--text-strong, #0f172a);\n    }\n\n    .user-menu__role[_ngcontent-%COMP%] {\n      font-size: 0.75rem;\n      color: var(--text-subtle, #64748b);\n    }\n\n    .user-menu__chevron[_ngcontent-%COMP%] {\n      font-size: 0.7rem;\n      color: var(--text-subtle, #94a3b8);\n      transition: transform 0.2s ease;\n    }\n\n    .user-menu__chevron--open[_ngcontent-%COMP%] {\n      transform: rotate(180deg);\n    }\n\n    .user-menu__dropdown[_ngcontent-%COMP%] {\n      position: absolute;\n      top: calc(100% + 8px);\n      right: 0;\n      width: 280px;\n      background: #ffffff;\n      border-radius: 16px;\n      box-shadow: 0 20px 60px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.05);\n      overflow: hidden;\n      z-index: 2400;\n    }\n\n    .user-menu__header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      padding: 16px;\n      background: linear-gradient(135deg, #f8fafc, #f1f5f9);\n    }\n\n    .user-menu__header-name[_ngcontent-%COMP%] {\n      font-weight: 600;\n      font-size: 0.95rem;\n      color: #0f172a;\n      margin: 0;\n    }\n\n    .user-menu__header-email[_ngcontent-%COMP%] {\n      font-size: 0.8rem;\n      color: #64748b;\n      margin: 0;\n    }\n\n    .user-menu__divider[_ngcontent-%COMP%] {\n      height: 1px;\n      background: #e2e8f0;\n      margin: 0;\n    }\n\n    .user-menu__section[_ngcontent-%COMP%] {\n      padding: 8px;\n    }\n\n    .user-menu__item.p-button[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      width: 100%;\n      padding: 10px 12px;\n      border: none;\n      border-radius: 10px;\n      background: transparent;\n      font-family: inherit;\n      font-size: 0.875rem;\n      color: #334155;\n      text-align: left;\n      transition: background 0.15s ease;\n    }\n\n    .user-menu__item.p-button[_ngcontent-%COMP%]:hover {\n      background: #f1f5f9;\n    }\n\n    .user-menu__item[_ngcontent-%COMP%]   .pi[_ngcontent-%COMP%] {\n      width: 18px;\n      text-align: center;\n      color: #64748b;\n    }\n\n    .user-menu__item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-of-type {\n      flex: 1;\n    }\n\n    .user-menu__item--danger[_ngcontent-%COMP%] {\n      color: #dc2626;\n    }\n\n    .user-menu__item--danger[_ngcontent-%COMP%]   .pi[_ngcontent-%COMP%] {\n      color: #dc2626;\n    }\n\n    .user-menu__item--danger[_ngcontent-%COMP%]:hover {\n      background: rgba(220, 38, 38, 0.08);\n    }\n\n    .user-menu__badge[_ngcontent-%COMP%] {\n      padding: 2px 8px;\n      border-radius: 6px;\n      background: #e0e7ff;\n      color: #4f46e5;\n      font-size: 0.7rem;\n      font-weight: 600;\n    }\n\n    .user-menu__item[_ngcontent-%COMP%]   kbd[_ngcontent-%COMP%] {\n      padding: 2px 6px;\n      border-radius: 4px;\n      background: #f1f5f9;\n      border: 1px solid #e2e8f0;\n      font-size: 0.7rem;\n      font-family: inherit;\n      color: #64748b;\n    }\n\n    @media (max-width: 768px) {\n      .user-menu__info[_ngcontent-%COMP%] {\n        display: none;\n      }\n\n      .user-menu__chevron[_ngcontent-%COMP%] {\n        display: none;\n      }\n\n      .user-menu__trigger.p-button[_ngcontent-%COMP%] {\n        padding: 6px;\n      }\n    }"], data: { animation: [
                trigger('dropdownAnimation', [
                    transition(':enter', [
                        style({ opacity: 0, transform: 'translateY(-8px) scale(0.95)' }),
                        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
                    ]),
                    transition(':leave', [
                        animate('100ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'translateY(-8px) scale(0.95)' }))
                    ])
                ])
            ] } });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserMenuComponent, [{
        type: Component,
        args: [{ selector: 'app-user-menu', standalone: true, imports: [NgIf, NgClass, AvatarModule, ButtonModule], animations: [
                    trigger('dropdownAnimation', [
                        transition(':enter', [
                            style({ opacity: 0, transform: 'translateY(-8px) scale(0.95)' }),
                            animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
                        ]),
                        transition(':leave', [
                            animate('100ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 0, transform: 'translateY(-8px) scale(0.95)' }))
                        ])
                    ])
                ], template: "\n    <div class=\"user-menu\" #menuContainer>\n      <button\n        pButton\n        type=\"button\"\n        class=\"user-menu__trigger p-button-text\"\n        (click)=\"toggleMenu()\"\n        [attr.aria-expanded]=\"isOpen()\"\n      >\n        <p-avatar \n          [image]=\"user().avatarUrl || ('https://i.pravatar.cc/150?u=' + (user().email || user().fullName))\"\n          shape=\"circle\" \n          styleClass=\"user-menu__avatar\"\n          [style]=\"{ 'background': 'linear-gradient(135deg, #6366f1, #8b5cf6)' }\"\n        ></p-avatar>\n        <div class=\"user-menu__info\">\n          <span class=\"user-menu__name\">{{ user().fullName }}</span>\n          <span class=\"user-menu__role\">{{ user().role }}</span>\n        </div>\n        <i class=\"pi pi-chevron-down user-menu__chevron\" [ngClass]=\"{ 'user-menu__chevron--open': isOpen() }\"></i>\n      </button>\n\n      <div class=\"user-menu__dropdown\" *ngIf=\"isOpen()\" [@dropdownAnimation]>\n        <div class=\"user-menu__header\">\n          <p-avatar \n            [image]=\"user().avatarUrl || ('https://i.pravatar.cc/150?u=' + (user().email || user().fullName))\"\n            shape=\"circle\" \n            size=\"large\"\n            [style]=\"{ 'background': 'linear-gradient(135deg, #6366f1, #8b5cf6)' }\"\n          ></p-avatar>\n          <div>\n            <p class=\"user-menu__header-name\">{{ user().fullName }}</p>\n            <p class=\"user-menu__header-email\">{{ user().email }}</p>\n          </div>\n        </div>\n\n        <div class=\"user-menu__divider\"></div>\n\n        <div class=\"user-menu__section\">\n          <button pButton type=\"button\" class=\"user-menu__item p-button-text\" (click)=\"navigateTo('/app/settings')\">\n            <i class=\"pi pi-user\"></i>\n            <span>My Account</span>\n          </button>\n          <button pButton type=\"button\" class=\"user-menu__item p-button-text\" (click)=\"navigateTo('/change-password')\">\n            <i class=\"pi pi-key\"></i>\n            <span>Change Password</span>\n          </button>\n          <button pButton type=\"button\" class=\"user-menu__item p-button-text\" (click)=\"navigateTo('/app/settings')\">\n            <i class=\"pi pi-cog\"></i>\n            <span>Workspace Settings</span>\n          </button>\n        </div>\n\n        <div class=\"user-menu__divider\"></div>\n\n        <div class=\"user-menu__section\">\n          <button pButton type=\"button\" class=\"user-menu__item p-button-text\" (click)=\"toggleTheme()\">\n            <i class=\"pi\" [ngClass]=\"themeService.themeIcon()\"></i>\n            <span>{{ themeService.themeLabel() }}</span>\n            <span class=\"user-menu__badge\">{{ themeService.isDarkMode() ? 'On' : 'Off' }}</span>\n          </button>\n          <button pButton type=\"button\" class=\"user-menu__item p-button-text\" (click)=\"openKeyboardShortcuts()\">\n            <i class=\"pi pi-keyboard\"></i>\n            <span>Keyboard Shortcuts</span>\n            <kbd>?</kbd>\n          </button>\n        </div>\n\n        <div class=\"user-menu__divider\"></div>\n\n        <div class=\"user-menu__section\">\n          <button pButton type=\"button\" class=\"user-menu__item user-menu__item--danger p-button-text\" (click)=\"logout()\">\n            <i class=\"pi pi-sign-out\"></i>\n            <span>Sign Out</span>\n          </button>\n        </div>\n      </div>\n    </div>\n  \n", styles: ["\n    .user-menu {\n      position: relative;\n    }\n\n    .user-menu__trigger.p-button {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      padding: 6px 12px 6px 6px;\n      border: none;\n      border-radius: 12px;\n      background: transparent;\n      transition: background 0.15s ease;\n    }\n\n    .user-menu__trigger.p-button:hover {\n      background: rgba(15, 23, 42, 0.06);\n    }\n\n    .user-menu__info {\n      display: flex;\n      flex-direction: column;\n      align-items: flex-start;\n      text-align: left;\n    }\n\n    .user-menu__name {\n      font-weight: 600;\n      font-size: 0.875rem;\n      color: var(--text-strong, #0f172a);\n    }\n\n    .user-menu__role {\n      font-size: 0.75rem;\n      color: var(--text-subtle, #64748b);\n    }\n\n    .user-menu__chevron {\n      font-size: 0.7rem;\n      color: var(--text-subtle, #94a3b8);\n      transition: transform 0.2s ease;\n    }\n\n    .user-menu__chevron--open {\n      transform: rotate(180deg);\n    }\n\n    .user-menu__dropdown {\n      position: absolute;\n      top: calc(100% + 8px);\n      right: 0;\n      width: 280px;\n      background: #ffffff;\n      border-radius: 16px;\n      box-shadow: 0 20px 60px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.05);\n      overflow: hidden;\n      z-index: 2400;\n    }\n\n    .user-menu__header {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      padding: 16px;\n      background: linear-gradient(135deg, #f8fafc, #f1f5f9);\n    }\n\n    .user-menu__header-name {\n      font-weight: 600;\n      font-size: 0.95rem;\n      color: #0f172a;\n      margin: 0;\n    }\n\n    .user-menu__header-email {\n      font-size: 0.8rem;\n      color: #64748b;\n      margin: 0;\n    }\n\n    .user-menu__divider {\n      height: 1px;\n      background: #e2e8f0;\n      margin: 0;\n    }\n\n    .user-menu__section {\n      padding: 8px;\n    }\n\n    .user-menu__item.p-button {\n      display: flex;\n      align-items: center;\n      gap: 12px;\n      width: 100%;\n      padding: 10px 12px;\n      border: none;\n      border-radius: 10px;\n      background: transparent;\n      font-family: inherit;\n      font-size: 0.875rem;\n      color: #334155;\n      text-align: left;\n      transition: background 0.15s ease;\n    }\n\n    .user-menu__item.p-button:hover {\n      background: #f1f5f9;\n    }\n\n    .user-menu__item .pi {\n      width: 18px;\n      text-align: center;\n      color: #64748b;\n    }\n\n    .user-menu__item span:first-of-type {\n      flex: 1;\n    }\n\n    .user-menu__item--danger {\n      color: #dc2626;\n    }\n\n    .user-menu__item--danger .pi {\n      color: #dc2626;\n    }\n\n    .user-menu__item--danger:hover {\n      background: rgba(220, 38, 38, 0.08);\n    }\n\n    .user-menu__badge {\n      padding: 2px 8px;\n      border-radius: 6px;\n      background: #e0e7ff;\n      color: #4f46e5;\n      font-size: 0.7rem;\n      font-weight: 600;\n    }\n\n    .user-menu__item kbd {\n      padding: 2px 6px;\n      border-radius: 4px;\n      background: #f1f5f9;\n      border: 1px solid #e2e8f0;\n      font-size: 0.7rem;\n      font-family: inherit;\n      color: #64748b;\n    }\n\n    @media (max-width: 768px) {\n      .user-menu__info {\n        display: none;\n      }\n\n      .user-menu__chevron {\n        display: none;\n      }\n\n      .user-menu__trigger.p-button {\n        padding: 6px;\n      }\n    }\n  \n"] }]
    }], null, { onDocumentClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }], onEscapeKey: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserMenuComponent, { className: "UserMenuComponent", filePath: "src/app/core/user-menu/user-menu.component.ts", lineNumber: 36 }); })();
