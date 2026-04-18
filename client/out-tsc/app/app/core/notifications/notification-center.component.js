import { Component, HostListener, inject, signal } from '@angular/core';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NotificationService } from './notification.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
const _c0 = a0 => ({ "notification-center__item--unread": a0 });
function NotificationCenterComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.unreadCount());
} }
function NotificationCenterComponent_div_4_div_10_button_1_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r4.message);
} }
function NotificationCenterComponent_div_4_div_10_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function NotificationCenterComponent_div_4_div_10_button_1_Template_button_click_0_listener() { const item_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.markRead(item_r4)); });
    i0.ɵɵelement(1, "span", 16);
    i0.ɵɵelementStart(2, "div", 17)(3, "div", 18);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, NotificationCenterComponent_div_4_div_10_button_1_div_5_Template, 2, 1, "div", 19);
    i0.ɵɵelementStart(6, "div", 20);
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "span", 21);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c0, !item_r4.read));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(item_r4.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r4.message);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(8, 6, item_r4.createdAt, "MMM d, h:mm a"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", "type--" + item_r4.type);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r4.type);
} }
function NotificationCenterComponent_div_4_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵtemplate(1, NotificationCenterComponent_div_4_div_10_button_1_Template, 11, 11, "button", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.items());
} }
function NotificationCenterComponent_div_4_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵelement(1, "i", 3);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "You're all caught up.");
    i0.ɵɵelementEnd()();
} }
function NotificationCenterComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "header", 8)(2, "div")(3, "h4");
    i0.ɵɵtext(4, "Notifications");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 9)(8, "button", 10);
    i0.ɵɵlistener("click", function NotificationCenterComponent_div_4_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.markAllRead()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 11);
    i0.ɵɵlistener("click", function NotificationCenterComponent_div_4_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.clearAll()); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(10, NotificationCenterComponent_div_4_div_10_Template, 2, 1, "div", 12)(11, NotificationCenterComponent_div_4_ng_template_11_Template, 4, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const emptyState_r5 = i0.ɵɵreference(12);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1("", ctx_r0.unreadCount(), " unread");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r0.unreadCount());
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", !ctx_r0.items().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.items().length)("ngIfElse", emptyState_r5);
} }
export class NotificationCenterComponent {
    notificationService = inject(NotificationService);
    open = signal(false, ...(ngDevMode ? [{ debugName: "open" }] : []));
    unreadCount = this.notificationService.unreadCount;
    items = this.notificationService.inbox;
    toggle() {
        this.open.update((value) => !value);
    }
    markRead(item) {
        this.notificationService.markAsRead(item.id);
    }
    markAllRead() {
        this.notificationService.markAllRead();
    }
    clearAll() {
        this.notificationService.clearInbox();
    }
    closeOnOutsideClick(event) {
        if (!this.open()) {
            return;
        }
        const target = event.target;
        const container = target?.closest('.notification-center');
        if (!container) {
            this.open.set(false);
        }
    }
    static ɵfac = function NotificationCenterComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotificationCenterComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NotificationCenterComponent, selectors: [["app-notification-center"]], hostBindings: function NotificationCenterComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function NotificationCenterComponent_click_HostBindingHandler($event) { return ctx.closeOnOutsideClick($event); }, i0.ɵɵresolveDocument);
        } }, decls: 5, vars: 4, consts: [["emptyState", ""], [1, "notification-center"], ["pButton", "", "type", "button", "aria-label", "Open notifications", 1, "notification-center__button", "p-button-rounded", "p-button-text", 3, "click"], [1, "pi", "pi-bell"], ["class", "notification-center__badge", 4, "ngIf"], ["class", "notification-center__panel", 4, "ngIf"], [1, "notification-center__badge"], [1, "notification-center__panel"], [1, "notification-center__header"], [1, "notification-center__actions"], ["pButton", "", "type", "button", "label", "Mark all read", 1, "notification-center__action", "p-button-text", 3, "click", "disabled"], ["pButton", "", "type", "button", "label", "Clear", 1, "notification-center__action", "p-button-text", 3, "click", "disabled"], ["class", "notification-center__list", 4, "ngIf", "ngIfElse"], [1, "notification-center__list"], ["pButton", "", "type", "button", "class", "notification-center__item p-button-text", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], ["pButton", "", "type", "button", 1, "notification-center__item", "p-button-text", 3, "click", "ngClass"], [1, "notification-center__dot"], [1, "notification-center__content"], [1, "notification-center__title"], ["class", "notification-center__message", 4, "ngIf"], [1, "notification-center__meta"], [1, "notification-center__type", 3, "ngClass"], [1, "notification-center__message"], [1, "notification-center__empty"]], template: function NotificationCenterComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "button", 2);
            i0.ɵɵlistener("click", function NotificationCenterComponent_Template_button_click_1_listener() { return ctx.toggle(); });
            i0.ɵɵelement(2, "i", 3);
            i0.ɵɵtemplate(3, NotificationCenterComponent_span_3_Template, 2, 1, "span", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(4, NotificationCenterComponent_div_4_Template, 13, 5, "div", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("open", ctx.open());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.unreadCount());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.open());
        } }, dependencies: [NgIf, NgFor, NgClass, ButtonModule, i1.ButtonDirective, DatePipe], styles: [".notification-center[_ngcontent-%COMP%] {\n      position: relative;\n      overflow: visible;\n    }\n\n    .notification-center__button.p-button[_ngcontent-%COMP%] {\n      position: relative;\n      width: 38px;\n      height: 38px;\n      border-radius: 999px;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: #ffffff;\n      color: #475569;\n      transition: all 0.2s ease;\n      overflow: visible;\n    }\n\n    .notification-center__button.p-button[_ngcontent-%COMP%]:hover {\n      border-color: rgba(99, 102, 241, 0.4);\n      color: #4f46e5;\n      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.18);\n    }\n\n    .notification-center__badge[_ngcontent-%COMP%] {\n      position: absolute;\n      top: -6px;\n      right: -7px;\n      min-width: 20px;\n      height: 20px;\n      padding: 0 5px;\n      border-radius: 999px;\n      background: #ef4444;\n      color: #ffffff;\n      font-size: 0.68rem;\n      font-weight: 700;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      border: 2px solid #ffffff;\n      line-height: 1;\n      z-index: 2;\n      box-shadow: 0 4px 10px rgba(239, 68, 68, 0.28);\n    }\n\n    .notification-center__panel[_ngcontent-%COMP%] {\n      position: absolute;\n      right: 0;\n      margin-top: 12px;\n      width: 360px;\n      max-height: 520px;\n      background: #ffffff;\n      border-radius: 18px;\n      border: 1px solid rgba(226, 232, 240, 0.9);\n      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);\n      z-index: 2400;\n      display: flex;\n      flex-direction: column;\n    }\n\n    .notification-center__header[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 12px;\n      padding: 16px 18px;\n      border-bottom: 1px solid rgba(226, 232, 240, 0.9);\n    }\n\n    .notification-center__header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n      margin: 0 0 4px;\n      font-size: 1rem;\n      color: #0f172a;\n    }\n\n    .notification-center__header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      font-size: 0.8rem;\n      color: #64748b;\n    }\n\n    .notification-center__actions[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      gap: 6px;\n    }\n\n    .notification-center__action.p-button[_ngcontent-%COMP%] {\n      padding: 0;\n      border: none;\n      background: transparent;\n      color: #4f46e5;\n      font-size: 0.75rem;\n      font-weight: 600;\n      text-align: right;\n    }\n\n    .notification-center__action.p-button[_ngcontent-%COMP%]:disabled {\n      color: #cbd5f5;\n    }\n\n    .notification-center__list[_ngcontent-%COMP%] {\n      padding: 12px;\n      overflow-y: auto;\n      display: flex;\n      flex-direction: column;\n      gap: 10px;\n    }\n\n    .notification-center__item.p-button[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: auto 1fr auto;\n      gap: 12px;\n      align-items: start;\n      justify-content: initial;\n      justify-items: stretch;\n      width: 100%;\n      white-space: normal !important;\n      padding: 12px;\n      border-radius: 14px;\n      border: 1px solid rgba(226, 232, 240, 0.9);\n      background: #f8fafc;\n      text-align: left;\n      transition: all 0.15s ease;\n      overflow: visible;\n    }\n\n    .notification-center__item--unread[_ngcontent-%COMP%] {\n      background: #ffffff;\n      border-color: rgba(99, 102, 241, 0.4);\n      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.12);\n    }\n\n    .notification-center__item[_ngcontent-%COMP%]:hover {\n      transform: translateY(-1px);\n    }\n\n    .notification-center__dot[_ngcontent-%COMP%] {\n      width: 8px;\n      height: 8px;\n      margin-top: 6px;\n      border-radius: 50%;\n      background: #94a3b8;\n    }\n\n    .notification-center__item--unread[_ngcontent-%COMP%]   .notification-center__dot[_ngcontent-%COMP%] {\n      background: #6366f1;\n    }\n\n    .notification-center__title[_ngcontent-%COMP%] {\n      font-weight: 600;\n      color: #0f172a;\n      font-size: 0.9rem;\n      line-height: 1.2;\n      white-space: normal;\n      word-break: break-word;\n    }\n\n    .notification-center__message[_ngcontent-%COMP%] {\n      font-size: 0.82rem;\n      color: #64748b;\n      margin-top: 4px;\n      line-height: 1.35;\n      white-space: normal;\n      word-break: break-word;\n    }\n\n    .notification-center__meta[_ngcontent-%COMP%] {\n      font-size: 0.72rem;\n      color: #94a3b8;\n      margin-top: 6px;\n      white-space: normal;\n    }\n\n    .notification-center__type[_ngcontent-%COMP%] {\n      align-self: start;\n      font-size: 0.7rem;\n      font-weight: 600;\n      padding: 4px 8px;\n      border-radius: 999px;\n      text-transform: capitalize;\n      white-space: nowrap;\n      background: rgba(148, 163, 184, 0.2);\n      color: #475569;\n    }\n\n    .notification-center__content[_ngcontent-%COMP%] {\n      min-width: 0;\n    }\n\n    .notification-center__type.type--success[_ngcontent-%COMP%] {\n      background: rgba(34, 197, 94, 0.15);\n      color: #15803d;\n    }\n\n    .notification-center__type.type--error[_ngcontent-%COMP%] {\n      background: rgba(239, 68, 68, 0.15);\n      color: #b91c1c;\n    }\n\n    .notification-center__type.type--warning[_ngcontent-%COMP%] {\n      background: rgba(245, 158, 11, 0.18);\n      color: #b45309;\n    }\n\n    .notification-center__type.type--info[_ngcontent-%COMP%] {\n      background: rgba(59, 130, 246, 0.15);\n      color: #1d4ed8;\n    }\n\n    .notification-center__empty[_ngcontent-%COMP%] {\n      padding: 24px;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 8px;\n      color: #94a3b8;\n    }\n\n    .notification-center__empty[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n      font-size: 1.4rem;\n    }\n\n    .notification-center__empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n      margin: 0;\n      font-size: 0.85rem;\n    }"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationCenterComponent, [{
        type: Component,
        args: [{ selector: 'app-notification-center', standalone: true, imports: [NgIf, NgFor, NgClass, DatePipe, ButtonModule], template: "\n    <div class=\"notification-center\" [class.open]=\"open()\">\n      <button\n        pButton\n        type=\"button\"\n        class=\"notification-center__button p-button-rounded p-button-text\"\n        (click)=\"toggle()\"\n        aria-label=\"Open notifications\"\n      >\n        <i class=\"pi pi-bell\"></i>\n        <span class=\"notification-center__badge\" *ngIf=\"unreadCount()\">{{ unreadCount() }}</span>\n      </button>\n\n      <div class=\"notification-center__panel\" *ngIf=\"open()\">\n        <header class=\"notification-center__header\">\n          <div>\n            <h4>Notifications</h4>\n            <span>{{ unreadCount() }} unread</span>\n          </div>\n          <div class=\"notification-center__actions\">\n            <button\n              pButton\n              type=\"button\"\n              class=\"notification-center__action p-button-text\"\n              label=\"Mark all read\"\n              (click)=\"markAllRead()\"\n              [disabled]=\"!unreadCount()\"\n            ></button>\n            <button\n              pButton\n              type=\"button\"\n              class=\"notification-center__action p-button-text\"\n              label=\"Clear\"\n              (click)=\"clearAll()\"\n              [disabled]=\"!items().length\"\n            ></button>\n          </div>\n        </header>\n\n        <div class=\"notification-center__list\" *ngIf=\"items().length; else emptyState\">\n          <button\n            pButton\n            type=\"button\"\n            class=\"notification-center__item p-button-text\"\n            *ngFor=\"let item of items()\"\n            [ngClass]=\"{ 'notification-center__item--unread': !item.read }\"\n            (click)=\"markRead(item)\"\n          >\n            <span class=\"notification-center__dot\"></span>\n            <div class=\"notification-center__content\">\n              <div class=\"notification-center__title\">{{ item.title }}</div>\n              <div class=\"notification-center__message\" *ngIf=\"item.message\">{{ item.message }}</div>\n              <div class=\"notification-center__meta\">{{ item.createdAt | date:'MMM d, h:mm a' }}</div>\n            </div>\n            <span class=\"notification-center__type\" [ngClass]=\"'type--' + item.type\">{{ item.type }}</span>\n          </button>\n        </div>\n\n        <ng-template #emptyState>\n          <div class=\"notification-center__empty\">\n            <i class=\"pi pi-bell\"></i>\n            <p>You're all caught up.</p>\n          </div>\n        </ng-template>\n      </div>\n    </div>\n  ", styles: ["\n    .notification-center {\n      position: relative;\n      overflow: visible;\n    }\n\n    .notification-center__button.p-button {\n      position: relative;\n      width: 38px;\n      height: 38px;\n      border-radius: 999px;\n      border: 1px solid rgba(148, 163, 184, 0.3);\n      background: #ffffff;\n      color: #475569;\n      transition: all 0.2s ease;\n      overflow: visible;\n    }\n\n    .notification-center__button.p-button:hover {\n      border-color: rgba(99, 102, 241, 0.4);\n      color: #4f46e5;\n      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.18);\n    }\n\n    .notification-center__badge {\n      position: absolute;\n      top: -6px;\n      right: -7px;\n      min-width: 20px;\n      height: 20px;\n      padding: 0 5px;\n      border-radius: 999px;\n      background: #ef4444;\n      color: #ffffff;\n      font-size: 0.68rem;\n      font-weight: 700;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      border: 2px solid #ffffff;\n      line-height: 1;\n      z-index: 2;\n      box-shadow: 0 4px 10px rgba(239, 68, 68, 0.28);\n    }\n\n    .notification-center__panel {\n      position: absolute;\n      right: 0;\n      margin-top: 12px;\n      width: 360px;\n      max-height: 520px;\n      background: #ffffff;\n      border-radius: 18px;\n      border: 1px solid rgba(226, 232, 240, 0.9);\n      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);\n      z-index: 2400;\n      display: flex;\n      flex-direction: column;\n    }\n\n    .notification-center__header {\n      display: flex;\n      align-items: flex-start;\n      justify-content: space-between;\n      gap: 12px;\n      padding: 16px 18px;\n      border-bottom: 1px solid rgba(226, 232, 240, 0.9);\n    }\n\n    .notification-center__header h4 {\n      margin: 0 0 4px;\n      font-size: 1rem;\n      color: #0f172a;\n    }\n\n    .notification-center__header span {\n      font-size: 0.8rem;\n      color: #64748b;\n    }\n\n    .notification-center__actions {\n      display: flex;\n      flex-direction: column;\n      gap: 6px;\n    }\n\n    .notification-center__action.p-button {\n      padding: 0;\n      border: none;\n      background: transparent;\n      color: #4f46e5;\n      font-size: 0.75rem;\n      font-weight: 600;\n      text-align: right;\n    }\n\n    .notification-center__action.p-button:disabled {\n      color: #cbd5f5;\n    }\n\n    .notification-center__list {\n      padding: 12px;\n      overflow-y: auto;\n      display: flex;\n      flex-direction: column;\n      gap: 10px;\n    }\n\n    .notification-center__item.p-button {\n      display: grid;\n      grid-template-columns: auto 1fr auto;\n      gap: 12px;\n      align-items: start;\n      justify-content: initial;\n      justify-items: stretch;\n      width: 100%;\n      white-space: normal !important;\n      padding: 12px;\n      border-radius: 14px;\n      border: 1px solid rgba(226, 232, 240, 0.9);\n      background: #f8fafc;\n      text-align: left;\n      transition: all 0.15s ease;\n      overflow: visible;\n    }\n\n    .notification-center__item--unread {\n      background: #ffffff;\n      border-color: rgba(99, 102, 241, 0.4);\n      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.12);\n    }\n\n    .notification-center__item:hover {\n      transform: translateY(-1px);\n    }\n\n    .notification-center__dot {\n      width: 8px;\n      height: 8px;\n      margin-top: 6px;\n      border-radius: 50%;\n      background: #94a3b8;\n    }\n\n    .notification-center__item--unread .notification-center__dot {\n      background: #6366f1;\n    }\n\n    .notification-center__title {\n      font-weight: 600;\n      color: #0f172a;\n      font-size: 0.9rem;\n      line-height: 1.2;\n      white-space: normal;\n      word-break: break-word;\n    }\n\n    .notification-center__message {\n      font-size: 0.82rem;\n      color: #64748b;\n      margin-top: 4px;\n      line-height: 1.35;\n      white-space: normal;\n      word-break: break-word;\n    }\n\n    .notification-center__meta {\n      font-size: 0.72rem;\n      color: #94a3b8;\n      margin-top: 6px;\n      white-space: normal;\n    }\n\n    .notification-center__type {\n      align-self: start;\n      font-size: 0.7rem;\n      font-weight: 600;\n      padding: 4px 8px;\n      border-radius: 999px;\n      text-transform: capitalize;\n      white-space: nowrap;\n      background: rgba(148, 163, 184, 0.2);\n      color: #475569;\n    }\n\n    .notification-center__content {\n      min-width: 0;\n    }\n\n    .notification-center__type.type--success {\n      background: rgba(34, 197, 94, 0.15);\n      color: #15803d;\n    }\n\n    .notification-center__type.type--error {\n      background: rgba(239, 68, 68, 0.15);\n      color: #b91c1c;\n    }\n\n    .notification-center__type.type--warning {\n      background: rgba(245, 158, 11, 0.18);\n      color: #b45309;\n    }\n\n    .notification-center__type.type--info {\n      background: rgba(59, 130, 246, 0.15);\n      color: #1d4ed8;\n    }\n\n    .notification-center__empty {\n      padding: 24px;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 8px;\n      color: #94a3b8;\n    }\n\n    .notification-center__empty i {\n      font-size: 1.4rem;\n    }\n\n    .notification-center__empty p {\n      margin: 0;\n      font-size: 0.85rem;\n    }\n  \n"] }]
    }], null, { closeOnOutsideClick: [{
            type: HostListener,
            args: ['document:click', ['$event']]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NotificationCenterComponent, { className: "NotificationCenterComponent", filePath: "src/app/core/notifications/notification-center.component.ts", lineNumber: 13 }); })();
