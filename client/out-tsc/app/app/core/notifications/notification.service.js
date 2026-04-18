import { Injectable, signal, computed } from '@angular/core';
import { readUserId } from '../auth/token.utils';
import * as i0 from "@angular/core";
export class NotificationService {
    _notifications = signal([], ...(ngDevMode ? [{ debugName: "_notifications" }] : []));
    _inbox = signal(this.readInbox(), ...(ngDevMode ? [{ debugName: "_inbox" }] : []));
    _preferences = signal(this.readPreferences(), ...(ngDevMode ? [{ debugName: "_preferences" }] : []));
    currentStorageKey = this.storageKey();
    currentPrefsKey = this.prefsStorageKey();
    notifications = this._notifications.asReadonly();
    hasNotifications = computed(() => this._notifications().length > 0, ...(ngDevMode ? [{ debugName: "hasNotifications" }] : []));
    latestNotification = computed(() => this._notifications()[0] ?? null, ...(ngDevMode ? [{ debugName: "latestNotification" }] : []));
    inbox = this._inbox.asReadonly();
    unreadCount = computed(() => this._inbox().filter((item) => !item.read).length, ...(ngDevMode ? [{ debugName: "unreadCount" }] : []));
    preferences = this._preferences.asReadonly();
    generateId() {
        return `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    show(notification) {
        this.syncForUser();
        if (!this._preferences().inApp[notification.type]) {
            return '';
        }
        const id = this.generateId();
        const newNotification = {
            ...notification,
            id,
            timestamp: new Date(),
            dismissible: notification.dismissible ?? true,
            duration: notification.duration ?? this.getDefaultDuration(notification.type)
        };
        this._notifications.update(list => [newNotification, ...list]);
        this.addToInbox(newNotification);
        if (newNotification.duration && newNotification.duration > 0) {
            setTimeout(() => this.dismiss(id), newNotification.duration);
        }
        return id;
    }
    success(title, message, action) {
        return this.show({ type: 'success', title, message, action });
    }
    error(title, message, action) {
        return this.show({ type: 'error', title, message, action, duration: 8000 });
    }
    warning(title, message, action) {
        return this.show({ type: 'warning', title, message, action });
    }
    info(title, message, action) {
        return this.show({ type: 'info', title, message, action });
    }
    pushInbox(type, title, message) {
        this.syncForUser();
        if (!this._preferences().inApp[type]) {
            return '';
        }
        const id = this.generateId();
        const entry = {
            id,
            type,
            title,
            message,
            timestamp: new Date(),
            dismissible: true,
            duration: 0
        };
        this.addToInbox(entry);
        return id;
    }
    dismiss(id) {
        this._notifications.update(list => list.filter(n => n.id !== id));
    }
    dismissAll() {
        this._notifications.set([]);
    }
    markAsRead(id) {
        this.syncForUser();
        this._inbox.update(list => list.map((item) => (item.id === id ? { ...item, read: true } : item)));
        this.persistInbox();
    }
    markAllRead() {
        this.syncForUser();
        this._inbox.update(list => list.map((item) => ({ ...item, read: true })));
        this.persistInbox();
    }
    clearInbox() {
        this.syncForUser();
        this._inbox.set([]);
        this.persistInbox();
    }
    updatePreference(channel, type, enabled) {
        this.syncForUser();
        const current = this._preferences();
        this._preferences.set({
            ...current,
            [channel]: {
                ...current[channel],
                [type]: enabled
            }
        });
        this.persistPreferences();
    }
    resetPreferences() {
        this.syncForUser();
        this._preferences.set(this.defaultPreferences());
        this.persistPreferences();
    }
    setPreferences(preferences) {
        this.syncForUser();
        this._preferences.set(preferences);
        this.persistPreferences();
    }
    getDefaultDuration(type) {
        switch (type) {
            case 'error': return 8000;
            case 'warning': return 6000;
            case 'success': return 4000;
            case 'info': return 5000;
            default: return 5000;
        }
    }
    addToInbox(notification) {
        const entry = {
            id: notification.id,
            type: notification.type,
            title: notification.title,
            message: notification.message,
            createdAt: notification.timestamp.toISOString(),
            read: false
        };
        this._inbox.update((list) => [entry, ...list].slice(0, 50));
        this.persistInbox();
    }
    syncForUser() {
        const key = this.storageKey();
        if (key === this.currentStorageKey) {
            this.syncPrefsForUser();
            return;
        }
        this.currentStorageKey = key;
        this._inbox.set(this.readInbox());
        this.syncPrefsForUser();
    }
    syncPrefsForUser() {
        const key = this.prefsStorageKey();
        if (key === this.currentPrefsKey) {
            return;
        }
        this.currentPrefsKey = key;
        this._preferences.set(this.readPreferences());
    }
    readInbox() {
        try {
            const stored = localStorage.getItem(this.storageKey());
            if (!stored) {
                return [];
            }
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : [];
        }
        catch {
            return [];
        }
    }
    persistInbox() {
        try {
            localStorage.setItem(this.storageKey(), JSON.stringify(this._inbox()));
        }
        catch {
            // Ignore storage errors
        }
    }
    readPreferences() {
        try {
            const stored = localStorage.getItem(this.prefsStorageKey());
            if (!stored) {
                return this.defaultPreferences();
            }
            const parsed = JSON.parse(stored);
            if (!parsed?.inApp || !parsed?.email) {
                return this.defaultPreferences();
            }
            return {
                inApp: parsed.inApp,
                email: parsed.email,
                emailAlerts: parsed.emailAlerts ?? this.defaultPreferences().emailAlerts,
                alertsEnabled: typeof parsed.alertsEnabled === 'boolean' ? parsed.alertsEnabled : false
            };
        }
        catch {
            return this.defaultPreferences();
        }
    }
    persistPreferences() {
        try {
            localStorage.setItem(this.prefsStorageKey(), JSON.stringify(this._preferences()));
        }
        catch {
            // Ignore storage errors
        }
    }
    defaultPreferences() {
        const defaults = {
            success: true,
            error: true,
            warning: true,
            info: true
        };
        return {
            inApp: { ...defaults },
            email: {
                success: false,
                error: false,
                warning: false,
                info: false
            },
            emailAlerts: {
                leadSla: false,
                idleDeal: false,
                idleDealNoNextStep: false,
                idleDealNoActivity: false,
                coachingEscalation: false,
                idleDealDays: 30,
                idleDealCooldownDays: 7,
                coachingEscalationCooldownDays: 7
            },
            alertsEnabled: false
        };
    }
    storageKey() {
        const userId = readUserId() ?? 'anonymous';
        return `notification_inbox:${userId}`;
    }
    prefsStorageKey() {
        const userId = readUserId() ?? 'anonymous';
        return `notification_prefs:${userId}`;
    }
    static ɵfac = function NotificationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotificationService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NotificationService, factory: NotificationService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
