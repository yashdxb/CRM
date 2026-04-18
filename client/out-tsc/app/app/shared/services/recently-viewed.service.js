import { Injectable, signal } from '@angular/core';
import { readUserId } from '../../core/auth/token.utils';
import * as i0 from "@angular/core";
const STORAGE_PREFIX = 'recently_viewed';
const MAX_ITEMS = 8;
export class RecentlyViewedService {
    store = signal(this.readStore(), ...(ngDevMode ? [{ debugName: "store" }] : []));
    itemsFor(type) {
        return this.store()[type];
    }
    add(type, item) {
        const current = this.store();
        const normalized = { ...item, viewedAt: new Date().toISOString() };
        const nextList = [normalized, ...current[type].filter((entry) => entry.id !== item.id)].slice(0, MAX_ITEMS);
        const nextStore = { ...current, [type]: nextList };
        this.store.set(nextStore);
        this.writeStore(nextStore);
    }
    readStore() {
        const raw = this.safeRead();
        return {
            customers: raw?.customers ?? [],
            contacts: raw?.contacts ?? [],
            leads: raw?.leads ?? [],
            opportunities: raw?.opportunities ?? [],
            activities: raw?.activities ?? []
        };
    }
    safeRead() {
        try {
            const key = this.storageKey();
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : null;
        }
        catch {
            return null;
        }
    }
    writeStore(store) {
        try {
            localStorage.setItem(this.storageKey(), JSON.stringify(store));
        }
        catch {
            // Ignore storage errors
        }
    }
    storageKey() {
        const userId = readUserId() ?? 'anonymous';
        return `${STORAGE_PREFIX}:${userId}`;
    }
    static ɵfac = function RecentlyViewedService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || RecentlyViewedService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: RecentlyViewedService, factory: RecentlyViewedService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RecentlyViewedService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
