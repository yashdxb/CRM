import { Injectable, inject, signal } from '@angular/core';
import { NotificationService } from './notifications/notification.service';
import * as i0 from "@angular/core";
export class AppToastService {
    notificationService = inject(NotificationService);
    toast = signal(null, ...(ngDevMode ? [{ debugName: "toast" }] : []));
    toastState = this.toast.asReadonly();
    show(tone, message, durationMs = 3000) {
        this.toast.set({ tone, message });
        this.notificationService.pushInbox(tone, message);
        window.setTimeout(() => this.clear(), durationMs);
    }
    clear() {
        this.toast.set(null);
    }
    static ɵfac = function AppToastService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppToastService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AppToastService, factory: AppToastService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppToastService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
