import { Injectable } from '@angular/core';
import { readUserId } from '../../core/auth/token.utils';
import * as i0 from "@angular/core";
export class SavedViewsService {
    getViews(moduleKey) {
        const raw = localStorage.getItem(this.buildKey(moduleKey));
        if (!raw) {
            return [];
        }
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        }
        catch {
            return [];
        }
    }
    saveView(moduleKey, view) {
        const views = this.getViews(moduleKey);
        const id = view.id ?? this.createId();
        const next = {
            id,
            name: view.name,
            filters: view.filters,
            updatedAtUtc: new Date().toISOString()
        };
        const updated = views.some((item) => item.id === id)
            ? views.map((item) => (item.id === id ? next : item))
            : [next, ...views];
        localStorage.setItem(this.buildKey(moduleKey), JSON.stringify(updated));
        return next;
    }
    deleteView(moduleKey, id) {
        const views = this.getViews(moduleKey).filter((item) => item.id !== id);
        localStorage.setItem(this.buildKey(moduleKey), JSON.stringify(views));
    }
    buildKey(moduleKey) {
        const userId = readUserId() ?? 'anonymous';
        return `saved_views:${userId}:${moduleKey}`;
    }
    createId() {
        if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
            return crypto.randomUUID();
        }
        return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    }
    static ɵfac = function SavedViewsService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SavedViewsService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: SavedViewsService, factory: SavedViewsService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SavedViewsService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
