import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnectionState, HttpTransportType, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { readTokenContext, readUserId } from '../auth/token.utils';
import { getTenantKey, resolveTenantKeyFromHost } from '../tenant/tenant.utils';
import * as i0 from "@angular/core";
export class PresenceService {
    zone;
    onlineUsersSubject = new BehaviorSubject(new Set());
    connectionStateSubject = new BehaviorSubject('disconnected');
    connection = null;
    localUserId = null;
    constructor(zone) {
        this.zone = zone;
    }
    get onlineUsers$() {
        return this.onlineUsersSubject.asObservable();
    }
    get connectionState$() {
        return this.connectionStateSubject.asObservable();
    }
    connect() {
        const context = readTokenContext();
        const token = context?.token ?? '';
        if (!token) {
            this.connectionStateSubject.next('disconnected');
            return;
        }
        this.localUserId = readUserId();
        if (this.connection &&
            (this.connection.state === HubConnectionState.Connected ||
                this.connection.state === HubConnectionState.Connecting ||
                this.connection.state === HubConnectionState.Reconnecting)) {
            this.connectionStateSubject.next(this.mapHubState(this.connection.state));
            return;
        }
        const tenantKey = getTenantKey();
        const hostKey = typeof window !== 'undefined' ? resolveTenantKeyFromHost(window.location.hostname) : null;
        const resolvedTenantKey = (tenantKey && tenantKey.trim()) || hostKey || null;
        const headers = {};
        if (resolvedTenantKey) {
            headers['X-Tenant-Key'] = resolvedTenantKey;
        }
        const hubUrl = resolvedTenantKey
            ? `${environment.apiUrl}/api/hubs/presence?tenantKey=${encodeURIComponent(resolvedTenantKey)}`
            : `${environment.apiUrl}/api/hubs/presence`;
        this.connectionStateSubject.next('connecting');
        this.connection = new HubConnectionBuilder()
            .withUrl(hubUrl, {
            accessTokenFactory: () => readTokenContext()?.token ?? '',
            withCredentials: false,
            headers,
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.None)
            .build();
        this.connection.onreconnecting(() => {
            this.zone.run(() => {
                this.connectionStateSubject.next('reconnecting');
            });
        });
        this.connection.onreconnected(() => {
            this.zone.run(() => {
                this.connectionStateSubject.next('connected');
            });
        });
        this.connection.onclose(() => {
            this.zone.run(() => {
                this.connectionStateSubject.next('disconnected');
            });
        });
        this.connection.on('presenceSnapshot', (users) => {
            this.zone.run(() => {
                const next = new Set(users ?? []);
                if (this.localUserId) {
                    next.add(this.localUserId);
                }
                this.onlineUsersSubject.next(next);
            });
        });
        this.connection.on('presenceChanged', (userId, isOnline) => {
            this.zone.run(() => {
                const next = new Set(this.onlineUsersSubject.value);
                if (isOnline) {
                    next.add(userId);
                }
                else {
                    next.delete(userId);
                }
                if (this.localUserId &&
                    userId === this.localUserId &&
                    !isOnline &&
                    this.connection?.state === HubConnectionState.Connected) {
                    next.add(this.localUserId);
                }
                this.onlineUsersSubject.next(next);
            });
        });
        this.connection.start()
            .then(() => {
            this.zone.run(() => {
                this.connectionStateSubject.next('connected');
            });
        })
            .catch(() => {
            this.connection = null;
            this.zone.run(() => {
                this.connectionStateSubject.next('disconnected');
            });
            // Swallow connection errors; UI falls back to server snapshot.
        });
    }
    disconnect() {
        if (this.connection) {
            this.connection.stop().catch(() => {
                // Ignore errors during shutdown.
            });
            this.connection = null;
        }
        this.localUserId = null;
        this.onlineUsersSubject.next(new Set());
        this.connectionStateSubject.next('disconnected');
    }
    mapHubState(state) {
        switch (state) {
            case HubConnectionState.Connected:
                return 'connected';
            case HubConnectionState.Connecting:
                return 'connecting';
            case HubConnectionState.Reconnecting:
                return 'reconnecting';
            default:
                return 'disconnected';
        }
    }
    static ɵfac = function PresenceService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PresenceService)(i0.ɵɵinject(i0.NgZone)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PresenceService, factory: PresenceService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PresenceService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i0.NgZone }], null); })();
