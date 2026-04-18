import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import * as i0 from "@angular/core";
export class MailComposeService {
    router = inject(Router);
    context = signal(null, ...(ngDevMode ? [{ debugName: "context" }] : []));
    open(context = {}) {
        this.context.set({
            ...context,
            returnUrl: context.returnUrl ?? this.router.url
        });
        void this.router.navigate(['/app/mailbox/compose']);
    }
    close() {
        this.context.set(null);
    }
    static ɵfac = function MailComposeService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MailComposeService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: MailComposeService, factory: MailComposeService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MailComposeService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
