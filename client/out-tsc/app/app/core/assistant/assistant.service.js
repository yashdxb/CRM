import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class AssistantService {
    visible = signal(this.readBoolean('crm_assistant_visible', false), ...(ngDevMode ? [{ debugName: "visible" }] : []));
    collapsed = signal(this.readBoolean('crm_assistant_collapsed', false), ...(ngDevMode ? [{ debugName: "collapsed" }] : []));
    isVisible = this.visible.asReadonly();
    isCollapsed = this.collapsed.asReadonly();
    setVisible(value) {
        this.visible.set(value);
        if (value) {
            this.collapsed.set(false);
        }
        this.persist();
    }
    toggleCollapsed() {
        const next = !this.collapsed();
        this.collapsed.set(next);
        this.visible.set(!next);
        this.persist();
    }
    restoreFromTopbar() {
        this.collapsed.set(false);
        this.visible.set(true);
        this.persist();
    }
    persist() {
        try {
            localStorage.setItem('crm_assistant_visible', JSON.stringify(this.visible()));
            localStorage.setItem('crm_assistant_collapsed', JSON.stringify(this.collapsed()));
        }
        catch {
            // Ignore storage errors
        }
    }
    readBoolean(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            if (raw === null)
                return fallback;
            return JSON.parse(raw) === true;
        }
        catch {
            return fallback;
        }
    }
    static ɵfac = function AssistantService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AssistantService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AssistantService, factory: AssistantService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AssistantService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
