import { Component, inject } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ButtonModule } from 'primeng/button';
import { NotificationService } from './notification.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
function NotificationContainerComponent_div_1_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 10);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const notification_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(notification_r1.message);
} }
function NotificationContainerComponent_div_1_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 11);
    i0.ɵɵlistener("click", function NotificationContainerComponent_div_1_button_7_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r2); const notification_r1 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.handleAction(notification_r1)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const notification_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("label", notification_r1.action.label);
} }
function NotificationContainerComponent_div_1_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 12);
    i0.ɵɵlistener("click", function NotificationContainerComponent_div_1_button_8_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const notification_r1 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.notificationService.dismiss(notification_r1.id)); });
    i0.ɵɵelementEnd();
} }
function NotificationContainerComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2)(1, "div", 3);
    i0.ɵɵelement(2, "i", 4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 5)(4, "p", 6);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, NotificationContainerComponent_div_1_p_6_Template, 2, 1, "p", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, NotificationContainerComponent_div_1_button_7_Template, 1, 1, "button", 8)(8, NotificationContainerComponent_div_1_button_8_Template, 1, 0, "button", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const notification_r1 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", "notification--" + notification_r1.type)("@slideIn", undefined);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", ctx_r2.getIcon(notification_r1.type));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(notification_r1.title);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", notification_r1.message);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", notification_r1.action);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", notification_r1.dismissible);
} }
export class NotificationContainerComponent {
    notificationService = inject(NotificationService);
    getIcon(type) {
        switch (type) {
            case 'success': return 'pi-check-circle';
            case 'error': return 'pi-times-circle';
            case 'warning': return 'pi-exclamation-triangle';
            case 'info': return 'pi-info-circle';
            default: return 'pi-info-circle';
        }
    }
    handleAction(notification) {
        notification.action?.callback();
        this.notificationService.dismiss(notification.id);
    }
    static ɵfac = function NotificationContainerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotificationContainerComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NotificationContainerComponent, selectors: [["app-notification-container"]], decls: 2, vars: 1, consts: [["role", "region", "aria-label", "Notifications", "aria-live", "polite", 1, "notification-container"], ["class", "notification", "role", "alert", 3, "ngClass", 4, "ngFor", "ngForOf"], ["role", "alert", 1, "notification", 3, "ngClass"], [1, "notification__icon"], [1, "pi", 3, "ngClass"], [1, "notification__content"], [1, "notification__title"], ["class", "notification__message", 4, "ngIf"], ["pButton", "", "type", "button", "class", "notification__action p-button-text", 3, "label", "click", 4, "ngIf"], ["pButton", "", "type", "button", "icon", "pi pi-times", "class", "notification__dismiss p-button-text", "aria-label", "Dismiss notification", 3, "click", 4, "ngIf"], [1, "notification__message"], ["pButton", "", "type", "button", 1, "notification__action", "p-button-text", 3, "click", "label"], ["pButton", "", "type", "button", "icon", "pi pi-times", "aria-label", "Dismiss notification", 1, "notification__dismiss", "p-button-text", 3, "click"]], template: function NotificationContainerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, NotificationContainerComponent_div_1_Template, 9, 7, "div", 1);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.notificationService.notifications());
        } }, dependencies: [NgFor, NgIf, NgClass, ButtonModule, i1.ButtonDirective], styles: [".notification-container[_ngcontent-%COMP%] {\n      position: fixed;\n      top: 80px;\n      right: 24px;\n      z-index: 9999;\n      display: flex;\n      flex-direction: column;\n      gap: 12px;\n      max-width: 420px;\n      width: 100%;\n      pointer-events: none;\n    }\n\n    .notification[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: flex-start;\n      gap: 12px;\n      padding: 16px;\n      border-radius: 16px;\n      background: #ffffff;\n      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(15, 23, 42, 0.05);\n      pointer-events: auto;\n      backdrop-filter: blur(10px);\n      border-left: 3px solid transparent;\n    }\n\n    .notification__icon[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 36px;\n      height: 36px;\n      border-radius: 10px;\n      flex-shrink: 0;\n    }\n\n    .notification--success[_ngcontent-%COMP%]   .notification__icon[_ngcontent-%COMP%] {\n      background: rgba(16, 185, 129, 0.12);\n      color: #059669;\n    }\n\n    .notification--error[_ngcontent-%COMP%]   .notification__icon[_ngcontent-%COMP%] {\n      background: rgba(239, 68, 68, 0.12);\n      color: #dc2626;\n    }\n\n    .notification--warning[_ngcontent-%COMP%]   .notification__icon[_ngcontent-%COMP%] {\n      background: rgba(245, 158, 11, 0.12);\n      color: #d97706;\n    }\n\n    .notification--warning[_ngcontent-%COMP%] {\n      border-left-color: #f59e0b;\n      box-shadow: 0 22px 52px rgba(245, 158, 11, 0.25), 0 0 0 1px rgba(245, 158, 11, 0.18);\n      animation: _ngcontent-%COMP%_notification-focus-pulse 1.6s ease-out 1;\n    }\n\n    .notification--info[_ngcontent-%COMP%]   .notification__icon[_ngcontent-%COMP%] {\n      background: rgba(59, 130, 246, 0.12);\n      color: #2563eb;\n    }\n\n    .notification--info[_ngcontent-%COMP%] {\n      border-left-color: #3b82f6;\n    }\n\n    .notification__content[_ngcontent-%COMP%] {\n      flex: 1;\n      min-width: 0;\n    }\n\n    .notification__title[_ngcontent-%COMP%] {\n      font-weight: 600;\n      font-size: 0.9rem;\n      color: #0f172a;\n      margin: 0 0 2px;\n    }\n\n    .notification__message[_ngcontent-%COMP%] {\n      font-size: 0.85rem;\n      color: #64748b;\n      margin: 0;\n      line-height: 1.4;\n    }\n\n    .notification__action.p-button[_ngcontent-%COMP%] {\n      padding: 6px 12px;\n      border-radius: 8px;\n      border: none;\n      background: rgba(99, 102, 241, 0.1);\n      color: #4f46e5;\n      font-weight: 600;\n      font-size: 0.8rem;\n      transition: background 0.15s ease;\n      white-space: nowrap;\n    }\n\n    .notification__action.p-button[_ngcontent-%COMP%]:hover {\n      background: rgba(99, 102, 241, 0.2);\n    }\n\n    .notification__dismiss.p-button[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 28px;\n      height: 28px;\n      border-radius: 8px;\n      border: none;\n      background: transparent;\n      color: #94a3b8;\n      transition: all 0.15s ease;\n      flex-shrink: 0;\n    }\n\n    .notification__dismiss.p-button[_ngcontent-%COMP%]:hover {\n      background: rgba(15, 23, 42, 0.06);\n      color: #475569;\n    }\n\n    @media (max-width: 480px) {\n      .notification-container[_ngcontent-%COMP%] {\n        top: auto;\n        bottom: 24px;\n        right: 16px;\n        left: 16px;\n        max-width: none;\n      }\n    }\n\n    @keyframes _ngcontent-%COMP%_notification-focus-pulse {\n      0% {\n        transform: scale(0.98);\n      }\n      40% {\n        transform: scale(1.01);\n      }\n      100% {\n        transform: scale(1);\n      }\n    }"], data: { animation: [
                trigger('slideIn', [
                    transition(':enter', [
                        style({ transform: 'translateX(100%)', opacity: 0 }),
                        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
                    ]),
                    transition(':leave', [
                        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(100%)', opacity: 0 }))
                    ])
                ])
            ] } });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationContainerComponent, [{
        type: Component,
        args: [{ selector: 'app-notification-container', standalone: true, imports: [NgFor, NgIf, NgClass, ButtonModule], animations: [
                    trigger('slideIn', [
                        transition(':enter', [
                            style({ transform: 'translateX(100%)', opacity: 0 }),
                            animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
                        ]),
                        transition(':leave', [
                            animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateX(100%)', opacity: 0 }))
                        ])
                    ])
                ], template: "\n    <div class=\"notification-container\" role=\"region\" aria-label=\"Notifications\" aria-live=\"polite\">\n      <div\n        *ngFor=\"let notification of notificationService.notifications()\"\n        class=\"notification\"\n        [ngClass]=\"'notification--' + notification.type\"\n        [@slideIn]\n        role=\"alert\"\n      >\n        <div class=\"notification__icon\">\n          <i class=\"pi\" [ngClass]=\"getIcon(notification.type)\"></i>\n        </div>\n        <div class=\"notification__content\">\n          <p class=\"notification__title\">{{ notification.title }}</p>\n          <p *ngIf=\"notification.message\" class=\"notification__message\">{{ notification.message }}</p>\n        </div>\n        <button\n          *ngIf=\"notification.action\"\n          pButton\n          type=\"button\"\n          class=\"notification__action p-button-text\"\n          [label]=\"notification.action.label\"\n          (click)=\"handleAction(notification)\"\n        ></button>\n        <button\n          *ngIf=\"notification.dismissible\"\n          pButton\n          type=\"button\"\n          icon=\"pi pi-times\"\n          class=\"notification__dismiss p-button-text\"\n          (click)=\"notificationService.dismiss(notification.id)\"\n          aria-label=\"Dismiss notification\"\n        ></button>\n      </div>\n    </div>\n  ", styles: ["\n    .notification-container {\n      position: fixed;\n      top: 80px;\n      right: 24px;\n      z-index: 9999;\n      display: flex;\n      flex-direction: column;\n      gap: 12px;\n      max-width: 420px;\n      width: 100%;\n      pointer-events: none;\n    }\n\n    .notification {\n      display: flex;\n      align-items: flex-start;\n      gap: 12px;\n      padding: 16px;\n      border-radius: 16px;\n      background: #ffffff;\n      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(15, 23, 42, 0.05);\n      pointer-events: auto;\n      backdrop-filter: blur(10px);\n      border-left: 3px solid transparent;\n    }\n\n    .notification__icon {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 36px;\n      height: 36px;\n      border-radius: 10px;\n      flex-shrink: 0;\n    }\n\n    .notification--success .notification__icon {\n      background: rgba(16, 185, 129, 0.12);\n      color: #059669;\n    }\n\n    .notification--error .notification__icon {\n      background: rgba(239, 68, 68, 0.12);\n      color: #dc2626;\n    }\n\n    .notification--warning .notification__icon {\n      background: rgba(245, 158, 11, 0.12);\n      color: #d97706;\n    }\n\n    .notification--warning {\n      border-left-color: #f59e0b;\n      box-shadow: 0 22px 52px rgba(245, 158, 11, 0.25), 0 0 0 1px rgba(245, 158, 11, 0.18);\n      animation: notification-focus-pulse 1.6s ease-out 1;\n    }\n\n    .notification--info .notification__icon {\n      background: rgba(59, 130, 246, 0.12);\n      color: #2563eb;\n    }\n\n    .notification--info {\n      border-left-color: #3b82f6;\n    }\n\n    .notification__content {\n      flex: 1;\n      min-width: 0;\n    }\n\n    .notification__title {\n      font-weight: 600;\n      font-size: 0.9rem;\n      color: #0f172a;\n      margin: 0 0 2px;\n    }\n\n    .notification__message {\n      font-size: 0.85rem;\n      color: #64748b;\n      margin: 0;\n      line-height: 1.4;\n    }\n\n    .notification__action.p-button {\n      padding: 6px 12px;\n      border-radius: 8px;\n      border: none;\n      background: rgba(99, 102, 241, 0.1);\n      color: #4f46e5;\n      font-weight: 600;\n      font-size: 0.8rem;\n      transition: background 0.15s ease;\n      white-space: nowrap;\n    }\n\n    .notification__action.p-button:hover {\n      background: rgba(99, 102, 241, 0.2);\n    }\n\n    .notification__dismiss.p-button {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 28px;\n      height: 28px;\n      border-radius: 8px;\n      border: none;\n      background: transparent;\n      color: #94a3b8;\n      transition: all 0.15s ease;\n      flex-shrink: 0;\n    }\n\n    .notification__dismiss.p-button:hover {\n      background: rgba(15, 23, 42, 0.06);\n      color: #475569;\n    }\n\n    @media (max-width: 480px) {\n      .notification-container {\n        top: auto;\n        bottom: 24px;\n        right: 16px;\n        left: 16px;\n        max-width: none;\n      }\n    }\n\n    @keyframes notification-focus-pulse {\n      0% {\n        transform: scale(0.98);\n      }\n      40% {\n        transform: scale(1.01);\n      }\n      100% {\n        transform: scale(1);\n      }\n    }\n  \n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NotificationContainerComponent, { className: "NotificationContainerComponent", filePath: "src/app/core/notifications/notification-container.component.ts", lineNumber: 25 }); })();
