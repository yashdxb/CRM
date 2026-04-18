import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, signal, computed } from '@angular/core';
import { DEFAULT_THEME_NAME, THEMES } from './theme.tokens';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class ThemeService {
    document;
    activeTheme = signal(THEMES[DEFAULT_THEME_NAME], ...(ngDevMode ? [{ debugName: "activeTheme" }] : []));
    storageKey = 'theme-preference';
    darkModeKey = 'dark-mode-preference';
    _isDarkMode = signal(false, ...(ngDevMode ? [{ debugName: "_isDarkMode" }] : []));
    isDarkMode = this._isDarkMode.asReadonly();
    themeIcon = computed(() => this._isDarkMode() ? 'pi-sun' : 'pi-moon', ...(ngDevMode ? [{ debugName: "themeIcon" }] : []));
    themeLabel = computed(() => this._isDarkMode() ? 'Light Mode' : 'Dark Mode', ...(ngDevMode ? [{ debugName: "themeLabel" }] : []));
    constructor(document) {
        this.document = document;
    }
    init(themeName) {
        // Check for stored dark mode preference or system preference
        const storedDarkMode = this.getStoredDarkMode();
        const systemPrefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        const shouldBeDark = storedDarkMode ?? systemPrefersDark;
        const stored = this.getStoredTheme();
        const name = themeName && THEMES[themeName] ? themeName : stored ?? environment.theme ?? DEFAULT_THEME_NAME;
        // Apply appropriate theme based on dark mode
        if (shouldBeDark) {
            this._isDarkMode.set(true);
            this.applyTheme('appleDark');
            this.document.documentElement.classList.add('dark-theme');
        }
        else {
            this.applyTheme(name);
        }
        // Listen for system preference changes
        window.matchMedia?.('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => {
            if (this.getStoredDarkMode() === null) {
                this.setDarkMode(e.matches);
            }
        });
    }
    get currentTheme() {
        return this.activeTheme.asReadonly();
    }
    toggleDarkMode() {
        this.setDarkMode(!this._isDarkMode());
    }
    setDarkMode(enabled) {
        this._isDarkMode.set(enabled);
        this.storeDarkMode(enabled);
        if (enabled) {
            this.applyTheme('appleDark');
            this.document.documentElement.classList.add('dark-theme');
        }
        else {
            this.applyTheme('default');
            this.document.documentElement.classList.remove('dark-theme');
        }
    }
    applyTheme(themeName) {
        const theme = THEMES[themeName] ?? THEMES[DEFAULT_THEME_NAME];
        Object.entries(theme.cssVars).forEach(([key, value]) => this.document.documentElement.style.setProperty(key, value));
        this.activeTheme.set(theme);
        this.storeTheme(theme.name);
    }
    getStoredTheme() {
        try {
            return localStorage.getItem(this.storageKey);
        }
        catch {
            return null;
        }
    }
    storeTheme(themeName) {
        try {
            localStorage.setItem(this.storageKey, themeName);
        }
        catch {
            // ignore storage failures (e.g., SSR or disabled storage)
        }
    }
    getStoredDarkMode() {
        try {
            const stored = localStorage.getItem(this.darkModeKey);
            return stored === null ? null : stored === 'true';
        }
        catch {
            return null;
        }
    }
    storeDarkMode(enabled) {
        try {
            localStorage.setItem(this.darkModeKey, String(enabled));
        }
        catch {
            // ignore storage failures
        }
    }
    static ɵfac = function ThemeService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ThemeService)(i0.ɵɵinject(DOCUMENT)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ThemeService, factory: ThemeService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ThemeService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: Document, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }], null); })();
