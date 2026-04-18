import { NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { EmailConnectionService } from '../services/email-connection.service';
import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
import * as i2 from "primeng/api";
import * as i3 from "primeng/message";
import * as i4 from "primeng/skeleton";
import * as i5 from "primeng/tag";
import * as i6 from "primeng/confirmdialog";
const _c0 = (a0, a1) => ({ "pi-microsoft": a0, "pi-google": a1 });
function EmailAccountsPage_i_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 49);
} }
function EmailAccountsPage_i_70_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 49);
} }
function EmailAccountsPage_div_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵelement(1, "p-skeleton", 51)(2, "p-skeleton", 51);
    i0.ɵɵelementEnd();
} }
function EmailAccountsPage_div_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 52)(1, "div", 53);
    i0.ɵɵelement(2, "i", 54);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "h3");
    i0.ɵɵtext(4, "No email accounts connected");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6, "Connect your Microsoft 365 or Gmail account to start sending emails from your mailbox.");
    i0.ɵɵelementEnd()();
} }
function EmailAccountsPage_div_80_div_1_p_tag_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-tag", 76);
} }
function EmailAccountsPage_div_80_div_1_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 77);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const connection_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" Last sync: ", i0.ɵɵpipeBind2(2, 1, connection_r2.lastSyncAtUtc, "short"), " ");
} }
function EmailAccountsPage_div_80_div_1_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 78);
    i0.ɵɵelement(1, "i", 79);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const connection_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", connection_r2.lastError, " ");
} }
function EmailAccountsPage_div_80_div_1_i_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "i", 80);
} }
function EmailAccountsPage_div_80_div_1_button_21_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 81);
    i0.ɵɵlistener("click", function EmailAccountsPage_div_80_div_1_button_21_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r4); const connection_r2 = i0.ɵɵnextContext().$implicit; const ctx_r2 = i0.ɵɵnextContext(2); ctx_r2.setPrimary(connection_r2); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(1, "i", 82);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Set Primary");
    i0.ɵɵelementEnd()();
} }
function EmailAccountsPage_div_80_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 57)(1, "div", 58);
    i0.ɵɵelement(2, "i", 59);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 60)(4, "div", 61)(5, "span", 62);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, EmailAccountsPage_div_80_div_1_p_tag_7_Template, 1, 0, "p-tag", 63);
    i0.ɵɵelement(8, "p-tag", 64);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 65)(10, "span", 66);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 67);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(14, EmailAccountsPage_div_80_div_1_span_14_Template, 3, 4, "span", 68);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(15, EmailAccountsPage_div_80_div_1_div_15_Template, 3, 1, "div", 69);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 70)(17, "button", 71);
    i0.ɵɵlistener("click", function EmailAccountsPage_div_80_div_1_Template_button_click_17_listener($event) { const connection_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); ctx_r2.testConnection(connection_r2); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵtemplate(18, EmailAccountsPage_div_80_div_1_i_18_Template, 1, 0, "i", 72);
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20, "Test");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(21, EmailAccountsPage_div_80_div_1_button_21_Template, 4, 0, "button", 73);
    i0.ɵɵelementStart(22, "button", 74);
    i0.ɵɵlistener("click", function EmailAccountsPage_div_80_div_1_Template_button_click_22_listener($event) { const connection_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); ctx_r2.confirmDisconnect(connection_r2); return i0.ɵɵresetView($event.stopPropagation()); });
    i0.ɵɵelement(23, "i", 75);
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "Disconnect");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const connection_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction2(13, _c0, connection_r2.provider === "Microsoft365", connection_r2.provider === "Gmail"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(connection_r2.emailAddress);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", connection_r2.isPrimary);
    i0.ɵɵadvance();
    i0.ɵɵproperty("severity", ctx_r2.getStatusSeverity(connection_r2))("value", ctx_r2.getStatusLabel(connection_r2));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(connection_r2.displayName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(connection_r2.providerName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", connection_r2.lastSyncAtUtc);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", connection_r2.lastError);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("loading", ctx_r2.testing() === connection_r2.id)("disabled", ctx_r2.testing() !== null);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.testing() !== connection_r2.id);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", !connection_r2.isPrimary);
} }
function EmailAccountsPage_div_80_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 55);
    i0.ɵɵtemplate(1, EmailAccountsPage_div_80_div_1_Template, 26, 16, "div", 56);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.connections());
} }
function EmailAccountsPage_ng_template_83_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 83);
    i0.ɵɵelement(1, "i", 84);
    i0.ɵɵelementStart(2, "span")(3, "strong");
    i0.ɵɵtext(4, "Privacy Note:");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(5, " We only request permission to read and send emails on your behalf. Your credentials are never stored - we use secure OAuth tokens that you can revoke at any time. ");
    i0.ɵɵelementEnd()();
} }
export class EmailAccountsPage {
    connectionService = inject(EmailConnectionService);
    toastService = inject(AppToastService);
    route = inject(ActivatedRoute);
    confirmationService = inject(ConfirmationService);
    loading = signal(true, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    connecting = signal(null, ...(ngDevMode ? [{ debugName: "connecting" }] : []));
    testing = signal(null, ...(ngDevMode ? [{ debugName: "testing" }] : []));
    connections = signal([], ...(ngDevMode ? [{ debugName: "connections" }] : []));
    // OAuth state for security verification
    oauthState = null;
    pendingProvider = null;
    ngOnInit() {
        this.loadConnections();
        this.handleOAuthCallback();
    }
    loadConnections() {
        this.loading.set(true);
        this.connectionService.getConnections().subscribe({
            next: (response) => {
                this.connections.set(response.items);
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Failed to load email connections:', err);
                this.toastService.show('error', 'Failed to load email accounts');
                this.loading.set(false);
            }
        });
    }
    connectMicrosoft365() {
        this.startOAuth('Microsoft365');
    }
    connectGmail() {
        this.startOAuth('Gmail');
    }
    startOAuth(provider) {
        this.connecting.set(provider);
        const redirectUri = this.getRedirectUri();
        this.connectionService.startOAuth(provider, redirectUri).subscribe({
            next: (response) => {
                // Store state for CSRF verification
                this.oauthState = response.state;
                this.pendingProvider = provider;
                sessionStorage.setItem('oauth_state', response.state);
                sessionStorage.setItem('oauth_provider', provider);
                // Redirect to OAuth provider
                window.location.href = response.authorizationUrl;
            },
            error: (err) => {
                console.error('Failed to start OAuth:', err);
                this.toastService.show('error', 'Failed to start connection. Please try again.');
                this.connecting.set(null);
            }
        });
    }
    handleOAuthCallback() {
        // Check if we're returning from OAuth
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');
        if (error) {
            this.toastService.show('error', `OAuth error: ${error}`);
            this.clearOAuthParams();
            this.cleanUrl();
            return;
        }
        if (code && state) {
            const savedState = sessionStorage.getItem('oauth_state');
            const savedProvider = sessionStorage.getItem('oauth_provider');
            // If no saved state, this is likely a page refresh after OAuth completed
            // Just clean up the URL silently
            if (!savedState || !savedProvider) {
                this.cleanUrl();
                return;
            }
            // Compare decoded states to handle URL encoding differences
            const decodedState = decodeURIComponent(state);
            const decodedSavedState = decodeURIComponent(savedState);
            if (decodedState !== decodedSavedState) {
                console.error('OAuth state mismatch:', { received: decodedState, saved: decodedSavedState });
                this.toastService.show('error', 'Invalid OAuth state. Please try again.');
                this.clearOAuthParams();
                this.cleanUrl();
                return;
            }
            this.completeOAuth(savedProvider, code, state);
        }
    }
    cleanUrl() {
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    completeOAuth(provider, code, state) {
        this.connecting.set(provider);
        const redirectUri = this.getRedirectUri();
        this.connectionService.completeOAuth(provider, code, redirectUri, state).subscribe({
            next: (connection) => {
                this.toastService.show('success', `Connected ${connection.emailAddress} successfully!`);
                this.loadConnections();
                this.connecting.set(null);
                this.clearOAuthParams();
                this.cleanUrl();
            },
            error: (err) => {
                console.error('Failed to complete OAuth:', err);
                const errorMessage = err.error?.error || err.message || 'Failed to connect email account. Please try again.';
                this.toastService.show('error', errorMessage);
                this.connecting.set(null);
                this.clearOAuthParams();
                this.cleanUrl();
            }
        });
    }
    setPrimary(connection) {
        this.connectionService.setPrimary(connection.id).subscribe({
            next: () => {
                this.toastService.show('success', `${connection.emailAddress} is now your primary email`);
                this.loadConnections();
            },
            error: (err) => {
                console.error('Failed to set primary:', err);
                this.toastService.show('error', 'Failed to set primary email');
            }
        });
    }
    testConnection(connection) {
        this.testing.set(connection.id);
        this.connectionService.testConnection(connection.id).subscribe({
            next: (result) => {
                if (result.success) {
                    this.toastService.show('success', `Connection verified! Found ${result.inboxCount} messages in inbox.`);
                }
                else {
                    this.toastService.show('error', `Connection test failed: ${result.errorMessage}`);
                }
                this.testing.set(null);
            },
            error: (err) => {
                console.error('Failed to test connection:', err);
                this.toastService.show('error', 'Failed to test connection');
                this.testing.set(null);
            }
        });
    }
    confirmDisconnect(connection) {
        this.confirmationService.confirm({
            message: `Are you sure you want to disconnect ${connection.emailAddress}? You will no longer be able to send emails from this account.`,
            header: 'Disconnect Email Account',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Disconnect',
            rejectLabel: 'Cancel',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => this.disconnect(connection)
        });
    }
    disconnect(connection) {
        this.connectionService.disconnect(connection.id).subscribe({
            next: () => {
                this.toastService.show('success', `Disconnected ${connection.emailAddress}`);
                this.loadConnections();
            },
            error: (err) => {
                console.error('Failed to disconnect:', err);
                this.toastService.show('error', 'Failed to disconnect email account');
            }
        });
    }
    getRedirectUri() {
        return `${window.location.origin}/app/settings/email-accounts`;
    }
    clearOAuthParams() {
        sessionStorage.removeItem('oauth_state');
        sessionStorage.removeItem('oauth_provider');
        this.oauthState = null;
        this.pendingProvider = null;
    }
    getProviderIcon(provider) {
        return provider === 'Microsoft365' ? 'pi pi-microsoft' : 'pi pi-google';
    }
    getProviderColor(provider) {
        return provider === 'Microsoft365' ? '#00a4ef' : '#ea4335';
    }
    getStatusSeverity(connection) {
        if (!connection.isActive)
            return 'danger';
        if (connection.lastError)
            return 'warn';
        return 'success';
    }
    getStatusLabel(connection) {
        if (!connection.isActive)
            return 'Inactive';
        if (connection.lastError)
            return 'Error';
        return 'Active';
    }
    static ɵfac = function EmailAccountsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmailAccountsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmailAccountsPage, selectors: [["app-email-accounts-page"]], features: [i0.ɵɵProvidersFeature([ConfirmationService])], decls: 85, vars: 11, consts: [[1, "page-container"], [1, "bg-orbs"], [1, "orb", "orb-1"], [1, "orb", "orb-2"], [1, "orb", "orb-3"], [1, "hero-section"], [1, "hero-content"], [1, "hero-badge"], [1, "badge-dot"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-description"], [1, "hero-actions"], ["pButton", "", "type", "button", "routerLink", "/app/settings", 1, "btn", "btn-secondary"], [1, "pi", "pi-arrow-left"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", 3, "click", "disabled"], [1, "pi", "pi-refresh"], [1, "hero-visual"], [1, "visual-card", "visual-card--primary"], [1, "card-icon"], [1, "pi", "pi-envelope"], [1, "card-content"], [1, "card-label"], [1, "card-value"], [1, "card-trend"], [1, "pi", "pi-link"], [1, "card-glow"], [1, "connect-section"], [1, "section-title"], [1, "pi", "pi-plus-circle"], [1, "provider-cards"], [1, "provider-card", "provider-card--microsoft", 3, "click"], [1, "provider-icon"], [1, "pi", "pi-microsoft"], [1, "provider-content"], [1, "provider-action"], ["pButton", "", "type", "button", 1, "btn", "btn-provider", 3, "loading", "disabled"], ["class", "pi pi-external-link", 4, "ngIf"], [1, "provider-glow"], [1, "provider-card", "provider-card--gmail", 3, "click"], [1, "pi", "pi-google"], [1, "accounts-section"], ["class", "accounts-loading", 4, "ngIf"], ["class", "accounts-empty", 4, "ngIf"], ["class", "accounts-list", 4, "ngIf"], [1, "info-section"], ["severity", "info"], ["pTemplate", "content"], [1, "pi", "pi-external-link"], [1, "accounts-loading"], ["height", "80px", "styleClass", "mb-3"], [1, "accounts-empty"], [1, "empty-icon"], [1, "pi", "pi-inbox"], [1, "accounts-list"], ["class", "account-card", 4, "ngFor", "ngForOf"], [1, "account-card"], [1, "account-provider"], [1, "pi", 3, "ngClass"], [1, "account-info"], [1, "account-header"], [1, "account-email"], ["severity", "info", "value", "Primary", 4, "ngIf"], [3, "severity", "value"], [1, "account-meta"], [1, "account-name"], [1, "account-provider-name"], ["class", "account-date", 4, "ngIf"], ["class", "account-error", 4, "ngIf"], [1, "account-actions"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", "btn-sm", 3, "click", "loading", "disabled"], ["class", "pi pi-check-circle", 4, "ngIf"], ["pButton", "", "type", "button", "class", "btn btn-ghost btn-sm", 3, "click", 4, "ngIf"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", "btn-sm", "btn-danger", 3, "click"], [1, "pi", "pi-times"], ["severity", "info", "value", "Primary"], [1, "account-date"], [1, "account-error"], [1, "pi", "pi-exclamation-triangle"], [1, "pi", "pi-check-circle"], ["pButton", "", "type", "button", 1, "btn", "btn-ghost", "btn-sm", 3, "click"], [1, "pi", "pi-star"], [1, "info-content"], [1, "pi", "pi-info-circle"]], template: function EmailAccountsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵelement(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(5, "app-breadcrumbs");
            i0.ɵɵelementStart(6, "section", 5)(7, "div", 6)(8, "div", 7);
            i0.ɵɵelement(9, "span", 8);
            i0.ɵɵelementStart(10, "span");
            i0.ɵɵtext(11, "Email Integration");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "h1", 9)(13, "span", 10);
            i0.ɵɵtext(14, "Email");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "span", 11);
            i0.ɵɵtext(16, "Accounts");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "p", 12);
            i0.ɵɵtext(18, " Connect your Microsoft 365 or Gmail account to send emails directly from your mailbox within the CRM. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "div", 13)(20, "button", 14);
            i0.ɵɵelement(21, "i", 15);
            i0.ɵɵelementStart(22, "span");
            i0.ɵɵtext(23, "Back to Settings");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(24, "button", 16);
            i0.ɵɵlistener("click", function EmailAccountsPage_Template_button_click_24_listener() { return ctx.loadConnections(); });
            i0.ɵɵelement(25, "i", 17);
            i0.ɵɵelementStart(26, "span");
            i0.ɵɵtext(27, "Reload");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(28, "div", 18)(29, "div", 19)(30, "div", 20);
            i0.ɵɵelement(31, "i", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 22)(33, "span", 23);
            i0.ɵɵtext(34, "Connected Accounts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "strong", 24);
            i0.ɵɵtext(36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "span", 25);
            i0.ɵɵelement(38, "i", 26);
            i0.ɵɵtext(39, " Email Sources ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(40, "div", 27);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(41, "section", 28)(42, "h2", 29);
            i0.ɵɵelement(43, "i", 30);
            i0.ɵɵtext(44, " Connect New Account ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "div", 31)(46, "div", 32);
            i0.ɵɵlistener("click", function EmailAccountsPage_Template_div_click_46_listener() { return ctx.connectMicrosoft365(); });
            i0.ɵɵelementStart(47, "div", 33);
            i0.ɵɵelement(48, "i", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "div", 35)(50, "h3");
            i0.ɵɵtext(51, "Microsoft 365");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "p");
            i0.ɵɵtext(53, "Connect your Outlook.com or Microsoft 365 business account");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(54, "div", 36)(55, "button", 37);
            i0.ɵɵtemplate(56, EmailAccountsPage_i_56_Template, 1, 0, "i", 38);
            i0.ɵɵelementStart(57, "span");
            i0.ɵɵtext(58, "Connect");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(59, "div", 39);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "div", 40);
            i0.ɵɵlistener("click", function EmailAccountsPage_Template_div_click_60_listener() { return ctx.connectGmail(); });
            i0.ɵɵelementStart(61, "div", 33);
            i0.ɵɵelement(62, "i", 41);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 35)(64, "h3");
            i0.ɵɵtext(65, "Gmail");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "p");
            i0.ɵɵtext(67, "Connect your Gmail or Google Workspace account");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(68, "div", 36)(69, "button", 37);
            i0.ɵɵtemplate(70, EmailAccountsPage_i_70_Template, 1, 0, "i", 38);
            i0.ɵɵelementStart(71, "span");
            i0.ɵɵtext(72, "Connect");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(73, "div", 39);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(74, "section", 42)(75, "h2", 29);
            i0.ɵɵelement(76, "i", 26);
            i0.ɵɵtext(77, " Connected Accounts ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(78, EmailAccountsPage_div_78_Template, 3, 0, "div", 43)(79, EmailAccountsPage_div_79_Template, 7, 0, "div", 44)(80, EmailAccountsPage_div_80_Template, 2, 1, "div", 45);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(81, "section", 46)(82, "p-message", 47);
            i0.ɵɵtemplate(83, EmailAccountsPage_ng_template_83_Template, 6, 0, "ng-template", 48);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(84, "p-confirmDialog");
        } if (rf & 2) {
            i0.ɵɵadvance(24);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance(12);
            i0.ɵɵtextInterpolate(ctx.connections().length);
            i0.ɵɵadvance(19);
            i0.ɵɵproperty("loading", ctx.connecting() === "Microsoft365")("disabled", ctx.connecting() !== null);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.connecting() !== "Microsoft365");
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("loading", ctx.connecting() === "Gmail")("disabled", ctx.connecting() !== null);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.connecting() !== "Gmail");
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading() && ctx.connections().length === 0);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading() && ctx.connections().length > 0);
        } }, dependencies: [NgFor,
            NgIf,
            NgClass,
            RouterLink,
            ButtonModule, i1.ButtonDirective, i2.PrimeTemplate, MessageModule, i3.Message, SkeletonModule, i4.Skeleton, TagModule, i5.Tag, ConfirmDialogModule, i6.ConfirmDialog, BreadcrumbsComponent,
            DatePipe], styles: ["\n\n\n\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n\n\n\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n\n\n\n\n.page-container[_ngcontent-%COMP%] {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n\n\n.bg-orbs[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: _ngcontent-%COMP%_float 20s ease-in-out infinite;\n}\n\n.orb-1[_ngcontent-%COMP%] {\n  width: 400px;\n  height: 400px;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%);\n  top: -100px;\n  right: -100px;\n  animation-delay: 0s;\n}\n\n.orb-2[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%);\n  bottom: 20%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3[_ngcontent-%COMP%] {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.06) 100%);\n  top: 50%;\n  right: 10%;\n  animation-delay: -14s;\n}\n\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(20px, -15px) scale(1.02);\n  }\n  66% {\n    transform: translate(-10px, 10px) scale(0.98);\n  }\n}\n\n\n\n\n\n.hero-section[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-6;\n  position: relative;\n  z-index: 1;\n  animation: _ngcontent-%COMP%_fade-in-up 0.6s ease-out;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.hero-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: _ngcontent-%COMP%_pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-title[_ngcontent-%COMP%] {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: _ngcontent-%COMP%_gradient-shift 4s ease-in-out infinite;\n  }\n\n  .title-light {\n    -webkit-text-fill-color: $gray-700;\n    margin-left: $space-2;\n  }\n}\n\n.hero-description[_ngcontent-%COMP%] {\n  font-size: $font-size-base;\n  color: $gray-500;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  flex-wrap: wrap;\n  margin-top: $space-2;\n}\n\n.hero-visual[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: _ngcontent-%COMP%_slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n\n  .card-icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n    background: $primary-gradient;\n    color: white;\n  }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n\n\n\n\n.connect-section[_ngcontent-%COMP%], \n.accounts-section[_ngcontent-%COMP%], \n.info-section[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  margin-bottom: $space-6;\n  animation: _ngcontent-%COMP%_fade-in-up 0.5s ease-out 0.2s both;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: $gray-800;\n  margin-bottom: $space-4;\n  padding-bottom: $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  i {\n    width: 32px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(6, 182, 212, 0.15);\n    color: #06b6d4;\n    border-radius: $radius-md;\n    font-size: $font-size-base;\n  }\n}\n\n\n\n\n\n.provider-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: $space-4;\n}\n\n.provider-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-4;\n  padding: $space-5;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  cursor: pointer;\n  overflow: hidden;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    transform: translateY(-3px) scale(1.005);\n    box-shadow: $glass-shadow-lg;\n\n    .provider-glow {\n      opacity: 1;\n    }\n  }\n\n  &--microsoft {\n    .provider-icon {\n      background: linear-gradient(135deg, #00a4ef 0%, #0078d4 100%);\n    }\n    .provider-glow {\n      background: radial-gradient(circle, rgba(0, 164, 239, 0.15) 0%, transparent 70%);\n    }\n  }\n\n  &--gmail {\n    .provider-icon {\n      background: linear-gradient(135deg, #ea4335 0%, #fbbc05 50%, #34a853 100%);\n    }\n    .provider-glow {\n      background: radial-gradient(circle, rgba(234, 67, 53, 0.15) 0%, transparent 70%);\n    }\n  }\n\n  .provider-icon {\n    width: 56px;\n    height: 56px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-lg;\n    font-size: 1.5rem;\n    color: white;\n    flex-shrink: 0;\n  }\n\n  .provider-content {\n    flex: 1;\n\n    h3 {\n      font-size: $font-size-lg;\n      font-weight: 600;\n      color: $gray-800;\n      margin: 0 0 $space-1;\n    }\n\n    p {\n      font-size: $font-size-sm;\n      color: $gray-500;\n      margin: 0;\n      line-height: 1.5;\n    }\n  }\n\n  .provider-action {\n    .btn-provider {\n      background: $glass-bg;\n      border: 1px solid $glass-border;\n      color: $gray-700;\n\n      &:hover {\n        background: white;\n      }\n    }\n  }\n\n  .provider-glow {\n    position: absolute;\n    top: -50%;\n    right: -30%;\n    width: 100%;\n    height: 200%;\n    pointer-events: none;\n    opacity: 0;\n    transition: opacity 250ms;\n  }\n}\n\n\n\n\n\n.accounts-loading[_ngcontent-%COMP%] {\n  padding: $space-4;\n}\n\n.accounts-empty[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: $space-8;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  text-align: center;\n\n  .empty-icon {\n    width: 64px;\n    height: 64px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(107, 114, 128, 0.1);\n    border-radius: 50%;\n    margin-bottom: $space-4;\n\n    i {\n      font-size: 1.75rem;\n      color: $gray-400;\n    }\n  }\n\n  h3 {\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-700;\n    margin: 0 0 $space-2;\n  }\n\n  p {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    margin: 0;\n    max-width: 400px;\n  }\n}\n\n.accounts-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.account-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-4;\n  padding: $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n\n  .account-provider {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    flex-shrink: 0;\n\n    .pi-microsoft {\n      font-size: 1.5rem;\n      color: #00a4ef;\n    }\n\n    .pi-google {\n      font-size: 1.5rem;\n      color: #ea4335;\n    }\n  }\n\n  .account-info {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .account-header {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    flex-wrap: wrap;\n    margin-bottom: $space-1;\n  }\n\n  .account-email {\n    font-size: $font-size-base;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .account-meta {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    font-size: $font-size-sm;\n    color: $gray-500;\n    flex-wrap: wrap;\n\n    span:not(:last-child)::after {\n      content: '\u2022';\n      margin-left: $space-3;\n      color: $gray-300;\n    }\n  }\n\n  .account-error {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    margin-top: $space-2;\n    padding: $space-2;\n    background: rgba(239, 68, 68, 0.08);\n    border-radius: $radius-sm;\n    font-size: $font-size-xs;\n    color: #dc2626;\n\n    i {\n      flex-shrink: 0;\n    }\n  }\n\n  .account-actions {\n    display: flex;\n    gap: $space-2;\n    flex-shrink: 0;\n\n    @media (max-width: 768px) {\n      flex-direction: column;\n    }\n  }\n}\n\n\n\n\n\n.btn[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  border: none;\n  border-radius: $radius-md;\n  font-size: $font-size-base;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 250ms;\n  overflow: hidden;\n}\n\n.btn-secondary[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  color: $gray-700;\n  box-shadow: $glass-shadow;\n\n  &:hover {\n    background: white;\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n}\n\n.btn-ghost[_ngcontent-%COMP%] {\n  background: transparent;\n  color: $gray-600;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.05);\n    color: $gray-800;\n  }\n\n  &.btn-danger:hover {\n    background: rgba(239, 68, 68, 0.1);\n    color: #dc2626;\n  }\n}\n\n.btn-sm[_ngcontent-%COMP%] {\n  padding: $space-1 $space-3;\n  font-size: $font-size-sm;\n}\n\n\n\n\n\n.info-section[_ngcontent-%COMP%] {\n  ::ng-deep .p-message {\n    background: $glass-bg;\n    backdrop-filter: blur(20px);\n    border: 1px solid $glass-border;\n    border-radius: $radius-lg;\n  }\n\n  .info-content {\n    display: flex;\n    align-items: flex-start;\n    gap: $space-3;\n    \n    i {\n      flex-shrink: 0;\n      margin-top: 2px;\n    }\n  }\n}\n\n\n\n\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_slide-in-right {\n  from {\n    opacity: 0;\n    transform: translateX(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_gradient-shift {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_pulse-glow {\n  0%, 100% {\n    opacity: 1;\n    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);\n  }\n  50% {\n    opacity: 0.8;\n    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0);\n  }\n}\n\n\n\n\n\n@media (max-width: 768px) {\n  .page-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .hero-title[_ngcontent-%COMP%] {\n    font-size: $font-size-2xl;\n  }\n\n  .provider-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .provider-card[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n\n    .provider-action {\n      width: 100%;\n      \n      button {\n        width: 100%;\n      }\n    }\n  }\n\n  .account-card[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n\n    .account-header {\n      justify-content: center;\n    }\n\n    .account-meta {\n      justify-content: center;\n    }\n\n    .account-actions {\n      width: 100%;\n      justify-content: center;\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmailAccountsPage, [{
        type: Component,
        args: [{ selector: 'app-email-accounts-page', standalone: true, imports: [
                    NgFor,
                    NgIf,
                    NgClass,
                    DatePipe,
                    RouterLink,
                    ButtonModule,
                    MessageModule,
                    SkeletonModule,
                    TagModule,
                    ConfirmDialogModule,
                    BreadcrumbsComponent
                ], providers: [ConfirmationService], template: "<!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     EMAIL ACCOUNTS SETTINGS PAGE - Premium Glass UI\n     Connect Microsoft 365 or Gmail for send-as-user functionality\n     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n<div class=\"page-container\">\n  <!-- Animated Background Orbs -->\n  <div class=\"bg-orbs\">\n    <div class=\"orb orb-1\"></div>\n    <div class=\"orb orb-2\"></div>\n    <div class=\"orb orb-3\"></div>\n  </div>\n\n  <!-- Breadcrumb -->\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       HERO SECTION\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"hero-section\">\n    <div class=\"hero-content\">\n      <div class=\"hero-badge\">\n        <span class=\"badge-dot\"></span>\n        <span>Email Integration</span>\n      </div>\n      \n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Email</span>\n        <span class=\"title-light\">Accounts</span>\n      </h1>\n      \n      <p class=\"hero-description\">\n        Connect your Microsoft 365 or Gmail account to send emails directly from your mailbox within the CRM.\n      </p>\n\n      <div class=\"hero-actions\">\n        <button pButton type=\"button\" class=\"btn btn-secondary\" routerLink=\"/app/settings\">\n          <i class=\"pi pi-arrow-left\"></i>\n          <span>Back to Settings</span>\n        </button>\n        <button pButton type=\"button\" class=\"btn btn-ghost\" [disabled]=\"loading()\" (click)=\"loadConnections()\">\n          <i class=\"pi pi-refresh\"></i>\n          <span>Reload</span>\n        </button>\n      </div>\n    </div>\n\n    <div class=\"hero-visual\">\n      <div class=\"visual-card visual-card--primary\">\n        <div class=\"card-icon\">\n          <i class=\"pi pi-envelope\"></i>\n        </div>\n        <div class=\"card-content\">\n          <span class=\"card-label\">Connected Accounts</span>\n          <strong class=\"card-value\">{{ connections().length }}</strong>\n          <span class=\"card-trend\">\n            <i class=\"pi pi-link\"></i> Email Sources\n          </span>\n        </div>\n        <div class=\"card-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       CONNECT NEW ACCOUNT SECTION\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"connect-section\">\n    <h2 class=\"section-title\">\n      <i class=\"pi pi-plus-circle\"></i>\n      Connect New Account\n    </h2>\n    \n    <div class=\"provider-cards\">\n      <!-- Microsoft 365 Card -->\n      <div class=\"provider-card provider-card--microsoft\" (click)=\"connectMicrosoft365()\">\n        <div class=\"provider-icon\">\n          <i class=\"pi pi-microsoft\"></i>\n        </div>\n        <div class=\"provider-content\">\n          <h3>Microsoft 365</h3>\n          <p>Connect your Outlook.com or Microsoft 365 business account</p>\n        </div>\n        <div class=\"provider-action\">\n          <button pButton \n            type=\"button\" \n            [loading]=\"connecting() === 'Microsoft365'\"\n            [disabled]=\"connecting() !== null\"\n            class=\"btn btn-provider\">\n            <i class=\"pi pi-external-link\" *ngIf=\"connecting() !== 'Microsoft365'\"></i>\n            <span>Connect</span>\n          </button>\n        </div>\n        <div class=\"provider-glow\"></div>\n      </div>\n\n      <!-- Gmail Card -->\n      <div class=\"provider-card provider-card--gmail\" (click)=\"connectGmail()\">\n        <div class=\"provider-icon\">\n          <i class=\"pi pi-google\"></i>\n        </div>\n        <div class=\"provider-content\">\n          <h3>Gmail</h3>\n          <p>Connect your Gmail or Google Workspace account</p>\n        </div>\n        <div class=\"provider-action\">\n          <button pButton \n            type=\"button\" \n            [loading]=\"connecting() === 'Gmail'\"\n            [disabled]=\"connecting() !== null\"\n            class=\"btn btn-provider\">\n            <i class=\"pi pi-external-link\" *ngIf=\"connecting() !== 'Gmail'\"></i>\n            <span>Connect</span>\n          </button>\n        </div>\n        <div class=\"provider-glow\"></div>\n      </div>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n       CONNECTED ACCOUNTS LIST\n       \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section class=\"accounts-section\">\n    <h2 class=\"section-title\">\n      <i class=\"pi pi-link\"></i>\n      Connected Accounts\n    </h2>\n\n    <!-- Loading State -->\n    <div class=\"accounts-loading\" *ngIf=\"loading()\">\n      <p-skeleton height=\"80px\" styleClass=\"mb-3\"></p-skeleton>\n      <p-skeleton height=\"80px\" styleClass=\"mb-3\"></p-skeleton>\n    </div>\n\n    <!-- Empty State -->\n    <div class=\"accounts-empty\" *ngIf=\"!loading() && connections().length === 0\">\n      <div class=\"empty-icon\">\n        <i class=\"pi pi-inbox\"></i>\n      </div>\n      <h3>No email accounts connected</h3>\n      <p>Connect your Microsoft 365 or Gmail account to start sending emails from your mailbox.</p>\n    </div>\n\n    <!-- Accounts List -->\n    <div class=\"accounts-list\" *ngIf=\"!loading() && connections().length > 0\">\n      <div class=\"account-card\" *ngFor=\"let connection of connections()\">\n        <div class=\"account-provider\">\n          <i class=\"pi\" [ngClass]=\"{'pi-microsoft': connection.provider === 'Microsoft365', 'pi-google': connection.provider === 'Gmail'}\"></i>\n        </div>\n        \n        <div class=\"account-info\">\n          <div class=\"account-header\">\n            <span class=\"account-email\">{{ connection.emailAddress }}</span>\n            <p-tag *ngIf=\"connection.isPrimary\" severity=\"info\" value=\"Primary\"></p-tag>\n            <p-tag [severity]=\"getStatusSeverity(connection)\" [value]=\"getStatusLabel(connection)\"></p-tag>\n          </div>\n          <div class=\"account-meta\">\n            <span class=\"account-name\">{{ connection.displayName }}</span>\n            <span class=\"account-provider-name\">{{ connection.providerName }}</span>\n            <span class=\"account-date\" *ngIf=\"connection.lastSyncAtUtc\">\n              Last sync: {{ connection.lastSyncAtUtc | date:'short' }}\n            </span>\n          </div>\n          <div class=\"account-error\" *ngIf=\"connection.lastError\">\n            <i class=\"pi pi-exclamation-triangle\"></i>\n            {{ connection.lastError }}\n          </div>\n        </div>\n\n        <div class=\"account-actions\">\n          <button pButton \n            type=\"button\" \n            class=\"btn btn-ghost btn-sm\"\n            [loading]=\"testing() === connection.id\"\n            [disabled]=\"testing() !== null\"\n            (click)=\"testConnection(connection); $event.stopPropagation()\">\n            <i class=\"pi pi-check-circle\" *ngIf=\"testing() !== connection.id\"></i>\n            <span>Test</span>\n          </button>\n          <button pButton \n            type=\"button\" \n            class=\"btn btn-ghost btn-sm\"\n            *ngIf=\"!connection.isPrimary\"\n            (click)=\"setPrimary(connection); $event.stopPropagation()\">\n            <i class=\"pi pi-star\"></i>\n            <span>Set Primary</span>\n          </button>\n          <button pButton \n            type=\"button\" \n            class=\"btn btn-ghost btn-sm btn-danger\"\n            (click)=\"confirmDisconnect(connection); $event.stopPropagation()\">\n            <i class=\"pi pi-times\"></i>\n            <span>Disconnect</span>\n          </button>\n        </div>\n      </div>\n    </div>\n  </section>\n\n  <!-- Info Message -->\n  <section class=\"info-section\">\n    <p-message severity=\"info\">\n      <ng-template pTemplate=\"content\">\n        <div class=\"info-content\">\n          <i class=\"pi pi-info-circle\"></i>\n          <span>\n            <strong>Privacy Note:</strong> We only request permission to read and send emails on your behalf. \n            Your credentials are never stored - we use secure OAuth tokens that you can revoke at any time.\n          </span>\n        </div>\n      </ng-template>\n    </p-message>\n  </section>\n</div>\n\n<p-confirmDialog></p-confirmDialog>\n", styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   EMAIL ACCOUNTS SETTINGS PAGE - Premium Glass UI\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n@use '../../../../shared/form-page-styles' as form;\n@use '../../../../../styles/design-tokens' as *;\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HOST SETUP\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n:host {\n  display: block;\n  width: 100%;\n  overflow-x: hidden;\n  @include form.premium-selection;\n  @include form.premium-focus-ring;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   PAGE CONTAINER\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.page-container {\n  @include form.form-page-base;\n  padding: 1.5rem 2rem;\n  min-height: 100vh;\n  overflow-x: hidden;\n  max-width: 100%;\n  position: relative;\n}\n\n/* Animated Background Orbs */\n.bg-orbs {\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 0;\n}\n\n.orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  animation: float 20s ease-in-out infinite;\n}\n\n.orb-1 {\n  width: 400px;\n  height: 400px;\n  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.1) 100%);\n  top: -100px;\n  right: -100px;\n  animation-delay: 0s;\n}\n\n.orb-2 {\n  width: 300px;\n  height: 300px;\n  background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%);\n  bottom: 20%;\n  left: -80px;\n  animation-delay: -7s;\n}\n\n.orb-3 {\n  width: 250px;\n  height: 250px;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.06) 100%);\n  top: 50%;\n  right: 10%;\n  animation-delay: -14s;\n}\n\n@keyframes float {\n  0%, 100% {\n    transform: translate(0, 0) scale(1);\n  }\n  33% {\n    transform: translate(20px, -15px) scale(1.02);\n  }\n  66% {\n    transform: translate(-10px, 10px) scale(0.98);\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   HERO SECTION\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.hero-section {\n  display: grid;\n  grid-template-columns: 1fr auto;\n  gap: $space-6;\n  margin-bottom: $space-6;\n  position: relative;\n  z-index: 1;\n  animation: fade-in-up 0.6s ease-out;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.hero-content {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.hero-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-1 $space-3;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-full;\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $primary;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  width: fit-content;\n  box-shadow: $glass-shadow;\n\n  .badge-dot {\n    width: 8px;\n    height: 8px;\n    background: $success;\n    border-radius: 50%;\n    animation: pulse-glow 2s ease-in-out infinite;\n  }\n}\n\n.hero-title {\n  font-size: $font-size-4xl;\n  font-weight: 800;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n  margin: 0;\n\n  .title-gradient {\n    background: $primary-gradient;\n    background-size: 200% auto;\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    background-clip: text;\n    animation: gradient-shift 4s ease-in-out infinite;\n  }\n\n  .title-light {\n    -webkit-text-fill-color: $gray-700;\n    margin-left: $space-2;\n  }\n}\n\n.hero-description {\n  font-size: $font-size-base;\n  color: $gray-500;\n  max-width: 500px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.hero-actions {\n  display: flex;\n  gap: $space-3;\n  flex-wrap: wrap;\n  margin-top: $space-2;\n}\n\n.hero-visual {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n  animation: slide-in-right 0.6s ease-out 0.2s both;\n}\n\n.visual-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  padding: $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  min-width: 220px;\n  overflow: hidden;\n  transition: transform 250ms, box-shadow 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n\n  .card-icon {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    font-size: $font-size-xl;\n    background: $primary-gradient;\n    color: white;\n  }\n\n  .card-content {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n  }\n\n  .card-label {\n    font-size: $font-size-xs;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n\n  .card-value {\n    font-size: $font-size-2xl;\n    font-weight: 700;\n    color: $gray-800;\n  }\n\n  .card-trend {\n    display: flex;\n    align-items: center;\n    gap: $space-1;\n    font-size: $font-size-xs;\n    color: $gray-500;\n  }\n\n  .card-glow {\n    position: absolute;\n    top: -50%;\n    right: -50%;\n    width: 100%;\n    height: 100%;\n    background: radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%);\n    pointer-events: none;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   SECTION STYLES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.connect-section,\n.accounts-section,\n.info-section {\n  position: relative;\n  z-index: 1;\n  margin-bottom: $space-6;\n  animation: fade-in-up 0.5s ease-out 0.2s both;\n}\n\n.section-title {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n  font-size: $font-size-lg;\n  font-weight: 600;\n  color: $gray-800;\n  margin-bottom: $space-4;\n  padding-bottom: $space-3;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.06);\n\n  i {\n    width: 32px;\n    height: 32px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(6, 182, 212, 0.15);\n    color: #06b6d4;\n    border-radius: $radius-md;\n    font-size: $font-size-base;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   PROVIDER CARDS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.provider-cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n  gap: $space-4;\n}\n\n.provider-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: $space-4;\n  padding: $space-5;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  box-shadow: $glass-shadow;\n  cursor: pointer;\n  overflow: hidden;\n  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);\n\n  &:hover {\n    transform: translateY(-3px) scale(1.005);\n    box-shadow: $glass-shadow-lg;\n\n    .provider-glow {\n      opacity: 1;\n    }\n  }\n\n  &--microsoft {\n    .provider-icon {\n      background: linear-gradient(135deg, #00a4ef 0%, #0078d4 100%);\n    }\n    .provider-glow {\n      background: radial-gradient(circle, rgba(0, 164, 239, 0.15) 0%, transparent 70%);\n    }\n  }\n\n  &--gmail {\n    .provider-icon {\n      background: linear-gradient(135deg, #ea4335 0%, #fbbc05 50%, #34a853 100%);\n    }\n    .provider-glow {\n      background: radial-gradient(circle, rgba(234, 67, 53, 0.15) 0%, transparent 70%);\n    }\n  }\n\n  .provider-icon {\n    width: 56px;\n    height: 56px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-lg;\n    font-size: 1.5rem;\n    color: white;\n    flex-shrink: 0;\n  }\n\n  .provider-content {\n    flex: 1;\n\n    h3 {\n      font-size: $font-size-lg;\n      font-weight: 600;\n      color: $gray-800;\n      margin: 0 0 $space-1;\n    }\n\n    p {\n      font-size: $font-size-sm;\n      color: $gray-500;\n      margin: 0;\n      line-height: 1.5;\n    }\n  }\n\n  .provider-action {\n    .btn-provider {\n      background: $glass-bg;\n      border: 1px solid $glass-border;\n      color: $gray-700;\n\n      &:hover {\n        background: white;\n      }\n    }\n  }\n\n  .provider-glow {\n    position: absolute;\n    top: -50%;\n    right: -30%;\n    width: 100%;\n    height: 200%;\n    pointer-events: none;\n    opacity: 0;\n    transition: opacity 250ms;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   ACCOUNTS LIST\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.accounts-loading {\n  padding: $space-4;\n}\n\n.accounts-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: $space-8;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  text-align: center;\n\n  .empty-icon {\n    width: 64px;\n    height: 64px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: rgba(107, 114, 128, 0.1);\n    border-radius: 50%;\n    margin-bottom: $space-4;\n\n    i {\n      font-size: 1.75rem;\n      color: $gray-400;\n    }\n  }\n\n  h3 {\n    font-size: $font-size-lg;\n    font-weight: 600;\n    color: $gray-700;\n    margin: 0 0 $space-2;\n  }\n\n  p {\n    font-size: $font-size-sm;\n    color: $gray-500;\n    margin: 0;\n    max-width: 400px;\n  }\n}\n\n.accounts-list {\n  display: flex;\n  flex-direction: column;\n  gap: $space-3;\n}\n\n.account-card {\n  display: flex;\n  align-items: center;\n  gap: $space-4;\n  padding: $space-4;\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  box-shadow: $glass-shadow;\n  transition: all 250ms;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n\n  .account-provider {\n    width: 44px;\n    height: 44px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    border-radius: $radius-md;\n    flex-shrink: 0;\n\n    .pi-microsoft {\n      font-size: 1.5rem;\n      color: #00a4ef;\n    }\n\n    .pi-google {\n      font-size: 1.5rem;\n      color: #ea4335;\n    }\n  }\n\n  .account-info {\n    flex: 1;\n    min-width: 0;\n  }\n\n  .account-header {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    flex-wrap: wrap;\n    margin-bottom: $space-1;\n  }\n\n  .account-email {\n    font-size: $font-size-base;\n    font-weight: 600;\n    color: $gray-800;\n  }\n\n  .account-meta {\n    display: flex;\n    align-items: center;\n    gap: $space-3;\n    font-size: $font-size-sm;\n    color: $gray-500;\n    flex-wrap: wrap;\n\n    span:not(:last-child)::after {\n      content: '\u2022';\n      margin-left: $space-3;\n      color: $gray-300;\n    }\n  }\n\n  .account-error {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    margin-top: $space-2;\n    padding: $space-2;\n    background: rgba(239, 68, 68, 0.08);\n    border-radius: $radius-sm;\n    font-size: $font-size-xs;\n    color: #dc2626;\n\n    i {\n      flex-shrink: 0;\n    }\n  }\n\n  .account-actions {\n    display: flex;\n    gap: $space-2;\n    flex-shrink: 0;\n\n    @media (max-width: 768px) {\n      flex-direction: column;\n    }\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   BUTTONS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.btn {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  padding: $space-2 $space-4;\n  border: none;\n  border-radius: $radius-md;\n  font-size: $font-size-base;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 250ms;\n  overflow: hidden;\n}\n\n.btn-secondary {\n  background: $glass-bg;\n  backdrop-filter: blur(20px);\n  border: 1px solid $glass-border;\n  color: $gray-700;\n  box-shadow: $glass-shadow;\n\n  &:hover {\n    background: white;\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-lg;\n  }\n}\n\n.btn-ghost {\n  background: transparent;\n  color: $gray-600;\n\n  &:hover {\n    background: rgba(0, 0, 0, 0.05);\n    color: $gray-800;\n  }\n\n  &.btn-danger:hover {\n    background: rgba(239, 68, 68, 0.1);\n    color: #dc2626;\n  }\n}\n\n.btn-sm {\n  padding: $space-1 $space-3;\n  font-size: $font-size-sm;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   INFO SECTION\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.info-section {\n  ::ng-deep .p-message {\n    background: $glass-bg;\n    backdrop-filter: blur(20px);\n    border: 1px solid $glass-border;\n    border-radius: $radius-lg;\n  }\n\n  .info-content {\n    display: flex;\n    align-items: flex-start;\n    gap: $space-3;\n    \n    i {\n      flex-shrink: 0;\n      margin-top: 2px;\n    }\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   ANIMATIONS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n@keyframes slide-in-right {\n  from {\n    opacity: 0;\n    transform: translateX(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateX(0);\n  }\n}\n\n@keyframes gradient-shift {\n  0%, 100% {\n    background-position: 0% 50%;\n  }\n  50% {\n    background-position: 100% 50%;\n  }\n}\n\n@keyframes pulse-glow {\n  0%, 100% {\n    opacity: 1;\n    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);\n  }\n  50% {\n    opacity: 0.8;\n    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0);\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   RESPONSIVE\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@media (max-width: 768px) {\n  .page-container {\n    padding: 1rem;\n  }\n\n  .hero-title {\n    font-size: $font-size-2xl;\n  }\n\n  .provider-cards {\n    grid-template-columns: 1fr;\n  }\n\n  .provider-card {\n    flex-direction: column;\n    text-align: center;\n\n    .provider-action {\n      width: 100%;\n      \n      button {\n        width: 100%;\n      }\n    }\n  }\n\n  .account-card {\n    flex-direction: column;\n    text-align: center;\n\n    .account-header {\n      justify-content: center;\n    }\n\n    .account-meta {\n      justify-content: center;\n    }\n\n    .account-actions {\n      width: 100%;\n      justify-content: center;\n    }\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmailAccountsPage, { className: "EmailAccountsPage", filePath: "src/app/crm/features/settings/pages/email-accounts.page.ts", lineNumber: 35 }); })();
