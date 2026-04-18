import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, mergeMap, of, retryWhen, switchMap, tap, throwError, timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { clearToken, saveToken } from './token.utils';
import { getTenantKeyForAuthBootstrap, setTenantKey } from '../tenant/tenant.utils';
import { PresenceService } from '../realtime/presence.service';
import { CrmEventsService } from '../realtime/crm-events.service';
import * as i0 from "@angular/core";
export class AuthService {
    http = inject(HttpClient);
    router = inject(Router);
    currentUserSignal = signal(null, ...(ngDevMode ? [{ debugName: "currentUserSignal" }] : []));
    presenceService = inject(PresenceService);
    crmEventsService = inject(CrmEventsService);
    apiWarmedUp = false;
    get currentUser() {
        return this.currentUserSignal.asReadonly();
    }
    /**
     * Warm up the API by hitting /health. Useful on login page load
     * to wake up cold App Service instances before the user submits.
     * Resolves immediately if already warmed up in this session.
     */
    warmUpApi() {
        if (this.apiWarmedUp) {
            return of(true);
        }
        const url = `${environment.apiUrl}/health`;
        return this.http.get(url).pipe(tap(() => { this.apiWarmedUp = true; }), switchMap(() => of(true)), catchError(() => of(false)));
    }
    /**
     * Quick connectivity check against the API health endpoint.
     * Returns true if the API is reachable, false otherwise.
     */
    checkApiHealth() {
        const url = `${environment.apiUrl}/health`;
        return this.http.get(url).pipe(switchMap(() => of(true)), catchError(() => of(false)));
    }
    login(payload) {
        const url = `${environment.apiUrl}/api/auth/login`;
        const tenantKey = getTenantKeyForAuthBootstrap();
        return this.http
            .post(url, payload, {
            headers: tenantKey ? { 'X-Tenant-Key': tenantKey } : undefined
        })
            .pipe(retryWhen((errors) => errors.pipe(mergeMap((err, retryIndex) => {
            if (retryIndex >= 3 || !this.isTransientAuthFailure(err)) {
                return throwError(() => err);
            }
            // Exponential backoff: 1s, 2s, 4s
            const delayMs = 1000 * Math.pow(2, retryIndex);
            return timer(delayMs);
        }))), tap((res) => {
            if (!res?.accessToken) {
                throw new Error('Missing access token.');
            }
            this.currentUserSignal.set(res);
            saveToken(res.accessToken);
            if (res.tenantKey) {
                setTenantKey(res.tenantKey);
            }
            this.presenceService.connect();
            this.crmEventsService.connect();
        }));
    }
    getPublicAuthConfig() {
        const url = `${environment.apiUrl}/api/auth/config`;
        const tenantKey = getTenantKeyForAuthBootstrap();
        return this.http.get(url, {
            headers: tenantKey ? { 'X-Tenant-Key': tenantKey } : undefined
        });
    }
    loginWithEntra(payload) {
        const url = `${environment.apiUrl}/api/auth/login/entra`;
        const tenantKey = getTenantKeyForAuthBootstrap();
        return this.http
            .post(url, payload, {
            headers: tenantKey ? { 'X-Tenant-Key': tenantKey } : undefined
        })
            .pipe(retryWhen((errors) => errors.pipe(mergeMap((err, retryIndex) => {
            if (retryIndex >= 3 || !this.isTransientAuthFailure(err)) {
                return throwError(() => err);
            }
            const delayMs = 1000 * Math.pow(2, retryIndex);
            return timer(delayMs);
        }))), tap((res) => {
            if (!res?.accessToken) {
                throw new Error('Missing access token.');
            }
            this.currentUserSignal.set(res);
            saveToken(res.accessToken);
            if (res.tenantKey) {
                setTenantKey(res.tenantKey);
            }
            this.presenceService.connect();
            this.crmEventsService.connect();
        }));
    }
    isTransientAuthFailure(error) {
        const status = error?.status ?? 0;
        return status === 0 || status === 502 || status === 503 || status === 504;
    }
    changePassword(currentPassword, newPassword) {
        const url = `${environment.apiUrl}/api/auth/change-password`;
        return this.http.post(url, { currentPassword, newPassword }).pipe(tap(() => {
            // Keep local auth state in sync after the forced change-password flow.
            const current = this.currentUserSignal();
            if (current) {
                this.currentUserSignal.set({ ...current, mustChangePassword: false });
            }
        }));
    }
    acceptInvite(token, newPassword) {
        const url = `${environment.apiUrl}/api/auth/accept-invite`;
        return this.http.post(url, { token, newPassword });
    }
    getInviteStatus(token) {
        const url = `${environment.apiUrl}/api/auth/invite-status`;
        return this.http.get(url, { params: { token } });
    }
    logout() {
        const url = `${environment.apiUrl}/api/auth/logout`;
        this.http.post(url, {}).subscribe({ error: () => { } });
        this.currentUserSignal.set(null);
        this.presenceService.disconnect();
        this.crmEventsService.disconnect();
        clearToken();
        this.router.navigate(['/login']);
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
