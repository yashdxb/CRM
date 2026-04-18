import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, catchError, map, tap } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Service to persist user UI state/preferences to the server.
 * Stores values in the user's UiPreferencesJson column.
 */
export class UiStateService {
    http = inject(HttpClient);
    cache = new Map();
    /**
     * Get a UI state value by key.
     * Returns null if not found.
     */
    get(key) {
        // Check cache first
        if (this.cache.has(key)) {
            return of(this.cache.get(key));
        }
        return this.http.get(`/api/users/me/ui-state/${encodeURIComponent(key)}`).pipe(map(response => {
            const value = response.value;
            this.cache.set(key, value);
            return value;
        }), catchError(() => of(null)));
    }
    /**
     * Save a UI state value by key.
     * Returns the saved value on success.
     */
    set(key, value) {
        return this.http.put(`/api/users/me/ui-state/${encodeURIComponent(key)}`, { value }).pipe(tap(() => this.cache.set(key, value)), map(() => value), catchError(() => of(null)));
    }
    /**
     * Clear cached value for a key.
     */
    clearCache(key) {
        if (key) {
            this.cache.delete(key);
        }
        else {
            this.cache.clear();
        }
    }
    static ɵfac = function UiStateService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UiStateService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UiStateService, factory: UiStateService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UiStateService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
