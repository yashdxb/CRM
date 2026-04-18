import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import * as i0 from "@angular/core";
export class EmailConnectionService {
    http = inject(HttpClient);
    baseUrl = `${environment.apiUrl}/api/email-connections`;
    /**
     * Gets all email accounts connected by the current user.
     */
    getConnections() {
        return this.http.get(this.baseUrl);
    }
    /**
     * Gets a specific connection.
     */
    getConnection(id) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
    /**
     * Initiates OAuth flow to connect an email provider.
     * Returns auth URL to redirect user to.
     */
    startOAuth(provider, redirectUri) {
        return this.http.post(`${this.baseUrl}/authorize`, {
            provider,
            redirectUri
        });
    }
    /**
     * Completes OAuth flow after user returns with authorization code.
     */
    completeOAuth(provider, authorizationCode, redirectUri, state) {
        return this.http.post(`${this.baseUrl}/callback`, {
            provider,
            authorizationCode,
            redirectUri,
            state
        });
    }
    /**
     * Sets a connection as the user's primary email account.
     */
    setPrimary(id) {
        return this.http.post(`${this.baseUrl}/${id}/set-primary`, {});
    }
    /**
     * Tests a connection by attempting to read from the mailbox.
     */
    testConnection(id) {
        return this.http.post(`${this.baseUrl}/${id}/test`, {});
    }
    /**
     * Disconnects/removes an email connection.
     */
    disconnect(id) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
    static ɵfac = function EmailConnectionService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmailConnectionService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EmailConnectionService, factory: EmailConnectionService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmailConnectionService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
