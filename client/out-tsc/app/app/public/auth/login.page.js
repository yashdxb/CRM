import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { BreadcrumbsComponent } from '../../core/breadcrumbs';
import { AuthShellComponent } from './auth-shell.component';
import { readTokenContext } from '../../core/auth/token.utils';
import { finalize, timeout } from 'rxjs';
import { PublicClientApplication } from '@azure/msal-browser';
import { environment } from '../../../environments/environment';
import { TenantBrandingStateService } from '../../core/tenant/tenant-branding-state.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/auth/auth.service";
import * as i3 from "@angular/router";
import * as i4 from "primeng/button";
import * as i5 from "primeng/inputtext";
function LoginPage_ng_container_12_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 29);
    i0.ɵɵelement(1, "i", 30);
    i0.ɵɵtext(2, " Please enter a valid email ");
    i0.ɵɵelementEnd();
} }
function LoginPage_ng_container_12_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 29);
    i0.ɵɵelement(1, "i", 30);
    i0.ɵɵtext(2, " Minimum 6 characters required ");
    i0.ɵɵelementEnd();
} }
function LoginPage_ng_container_12_span_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵelement(1, "i", 31);
    i0.ɵɵtext(2, " Sign In ");
    i0.ɵɵelementEnd();
} }
function LoginPage_ng_container_12_span_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 32);
    i0.ɵɵelement(1, "i", 33);
    i0.ɵɵtext(2, " Signing in... ");
    i0.ɵɵelementEnd();
} }
function LoginPage_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 16)(2, "label", 17);
    i0.ɵɵtext(3, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 18);
    i0.ɵɵelement(5, "i", 19);
    i0.ɵɵelementStart(6, "input", 20);
    i0.ɵɵlistener("focus", function LoginPage_ng_container_12_Template_input_focus_6_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.emailFocused = true); })("blur", function LoginPage_ng_container_12_Template_input_blur_6_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.emailFocused = false); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(7, LoginPage_ng_container_12_span_7_Template, 3, 0, "span", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 16)(9, "label", 17);
    i0.ɵɵtext(10, "Password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 18);
    i0.ɵɵelement(12, "i", 22);
    i0.ɵɵelementStart(13, "input", 23);
    i0.ɵɵlistener("focus", function LoginPage_ng_container_12_Template_input_focus_13_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.passwordFocused = true); })("blur", function LoginPage_ng_container_12_Template_input_blur_13_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.passwordFocused = false); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(14, LoginPage_ng_container_12_span_14_Template, 3, 0, "span", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "div", 24)(16, "a", 25);
    i0.ɵɵtext(17, "Forgot Password?");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "button", 26);
    i0.ɵɵtemplate(19, LoginPage_ng_container_12_span_19_Template, 3, 0, "span", 27)(20, LoginPage_ng_container_12_span_20_Template, 3, 0, "span", 28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_6_0;
    let tmp_7_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("focused", ctx_r2.emailFocused)("error", ((tmp_3_0 = ctx_r2.form.get("email")) == null ? null : tmp_3_0.touched) && ((tmp_3_0 = ctx_r2.form.get("email")) == null ? null : tmp_3_0.invalid));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.showErrors && ((tmp_4_0 = ctx_r2.form.get("email")) == null ? null : tmp_4_0.invalid));
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("focused", ctx_r2.passwordFocused)("error", ((tmp_6_0 = ctx_r2.form.get("password")) == null ? null : tmp_6_0.touched) && ((tmp_6_0 = ctx_r2.form.get("password")) == null ? null : tmp_6_0.invalid));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r2.showErrors && ((tmp_7_0 = ctx_r2.form.get("password")) == null ? null : tmp_7_0.invalid));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r2.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r2.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.loading);
} }
function LoginPage_button_13_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 34);
    i0.ɵɵlistener("click", function LoginPage_button_13_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.signInWithMicrosoft()); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵelement(2, "i", 35);
    i0.ɵɵtext(3, " Sign In With Microsoft ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("disabled", ctx_r2.loading);
} }
function LoginPage_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵelement(1, "i", 37);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.error);
} }
function LoginPage_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵelement(1, "i", 38);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Local sign-in is disabled for this tenant. Use Microsoft sign-in.");
    i0.ɵɵelementEnd()();
} }
export class LoginPage {
    fb;
    auth;
    router;
    route;
    zone;
    form;
    loading = false;
    error = null;
    emailFocused = false;
    passwordFocused = false;
    showErrors = false;
    entraEnabled = !!environment.auth?.entra?.enabled;
    localLoginEnabled = true;
    apiReachable = null;
    entraClientId = environment.auth?.entra?.clientId ?? '';
    entraAuthority = environment.auth?.entra?.authority ?? 'https://login.microsoftonline.com/organizations';
    entraRedirectUri = environment.auth?.entra?.redirectUri ?? (typeof window !== 'undefined' ? `${window.location.origin}/login` : '/login');
    branding = inject(TenantBrandingStateService);
    constructor(fb, auth, router, route, zone) {
        this.fb = fb;
        this.auth = auth;
        this.router = router;
        this.route = route;
        this.zone = zone;
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            remember: [true]
        });
    }
    ngOnInit() {
        // Warm up the API to wake cold App Service instances before the user tries to sign in.
        this.auth.warmUpApi().subscribe((ok) => {
            this.apiReachable = ok;
        });
        this.branding.loadPublicBranding();
        this.auth.getPublicAuthConfig().subscribe({
            next: (config) => {
                this.localLoginEnabled = config.localLoginEnabled;
                this.entraEnabled = !!config.entra?.enabled;
                this.entraClientId = config.entra?.clientId || this.entraClientId;
                this.entraAuthority = config.entra?.authority || this.entraAuthority;
                this.entraRedirectUri = config.entra?.redirectUri || this.entraRedirectUri;
            },
            error: () => {
                this.localLoginEnabled = true;
                this.entraEnabled = !!environment.auth?.entra?.enabled;
            }
        });
    }
    submit() {
        if (!this.localLoginEnabled) {
            this.showErrors = true;
            this.error = 'Local sign-in is disabled for this tenant. Use Microsoft sign-in.';
            return;
        }
        if (this.form.invalid) {
            this.showErrors = true;
            this.form.markAllAsTouched();
            return;
        }
        this.showErrors = false;
        this.error = null;
        this.loading = true;
        const { email, password } = this.form.value;
        const normalizedEmail = String(email ?? '').trim().toLowerCase();
        const normalizedPassword = String(password ?? '');
        let timedOut = false;
        const timeoutId = window.setTimeout(() => {
            if (!this.loading) {
                return;
            }
            this.zone.run(() => {
                timedOut = true;
                this.loading = false;
                this.showErrors = true;
                // On manual timeout, check API health for diagnostics
                this.auth.checkApiHealth().subscribe((ok) => {
                    this.apiReachable = ok;
                    this.error = ok
                        ? `Unable to sign in as ${normalizedEmail || 'the requested user'}. Request timed out but the server is reachable — please try again.`
                        : `Unable to sign in as ${normalizedEmail || 'the requested user'}. The API server is not responding. It may be restarting after a deployment — please wait a moment and try again.`;
                });
            });
        }, 30000);
        this.auth
            .login({ email: normalizedEmail, password: normalizedPassword })
            .pipe(timeout(30000), finalize(() => {
            this.deferUiUpdate(() => {
                window.clearTimeout(timeoutId);
                this.loading = false;
                if (!timedOut && !this.error && !readTokenContext()) {
                    this.showErrors = true;
                    this.error = `Unable to sign in as ${normalizedEmail || 'the requested user'}. Please check your credentials and try again.`;
                }
            });
        }))
            .subscribe({
            next: () => {
                if (timedOut) {
                    return;
                }
                if (!readTokenContext()) {
                    this.error = 'Login failed to start a session. Please try again.';
                    return;
                }
                const profile = this.auth.currentUser();
                if (profile?.mustChangePassword) {
                    // Force invited users to replace their temporary password before entering the app.
                    this.router.navigate(['/change-password']);
                    return;
                }
                const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
                const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/app/dashboard';
                this.router.navigateByUrl(target);
            },
            error: (err) => {
                if (timedOut) {
                    return;
                }
                this.zone.run(() => {
                    if (err?.name === 'TimeoutError') {
                        // On timeout, check if API is reachable to give a better error
                        this.auth.checkApiHealth().subscribe((ok) => {
                            this.apiReachable = ok;
                            this.showErrors = true;
                            this.error = ok
                                ? `Unable to sign in as ${normalizedEmail || 'the requested user'}. Request timed out. The server is reachable — please try again.`
                                : `Unable to sign in as ${normalizedEmail || 'the requested user'}. The API server is not responding. It may be restarting after a deployment — please wait a moment and try again.`;
                        });
                        return;
                    }
                    const httpError = err;
                    const status = httpError?.status ?? 0;
                    const messageBody = httpError?.error?.message || httpError?.error?.error || null;
                    this.showErrors = true;
                    if (status === 0) {
                        // Network error — check API reachability for diagnostic
                        this.auth.checkApiHealth().subscribe((ok) => {
                            this.apiReachable = ok;
                            this.error = ok
                                ? `Unable to sign in as ${normalizedEmail || 'the requested user'}. A network error occurred but the server is reachable. Please try again.`
                                : `Unable to sign in as ${normalizedEmail || 'the requested user'}. Cannot reach the API server (${environment.apiUrl}). It may be restarting — please wait and retry.`;
                        });
                        return;
                    }
                    this.error = this.buildErrorText(normalizedEmail, messageBody, httpError?.status);
                });
            }
        });
    }
    async signInWithMicrosoft() {
        if (!this.entraEnabled || this.loading) {
            return;
        }
        if (!this.entraClientId) {
            this.showErrors = true;
            this.error = 'Microsoft sign-in is not configured.';
            return;
        }
        this.error = null;
        this.loading = true;
        try {
            const client = new PublicClientApplication({
                auth: {
                    clientId: this.entraClientId,
                    authority: this.entraAuthority,
                    redirectUri: this.entraRedirectUri
                },
                cache: {
                    cacheLocation: 'localStorage'
                }
            });
            await client.initialize();
            const result = await client.loginPopup({
                scopes: ['openid', 'profile', 'email'],
                prompt: 'select_account'
            });
            const idToken = result.idToken;
            if (!idToken) {
                throw new Error('No Microsoft ID token was returned.');
            }
            this.auth
                .loginWithEntra({ idToken })
                .pipe(finalize(() => {
                this.deferUiUpdate(() => {
                    this.loading = false;
                });
            }))
                .subscribe({
                next: () => {
                    if (!readTokenContext()) {
                        this.error = 'Microsoft sign-in did not start a session.';
                        return;
                    }
                    const profile = this.auth.currentUser();
                    if (profile?.mustChangePassword) {
                        this.router.navigate(['/change-password']);
                        return;
                    }
                    const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
                    const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/app/dashboard';
                    this.router.navigateByUrl(target);
                },
                error: (err) => {
                    const httpError = err;
                    const code = httpError?.error?.code || null;
                    const messageBody = httpError?.error?.message || httpError?.error?.error || null;
                    this.showErrors = true;
                    this.error = this.buildErrorText('Microsoft account', messageBody, httpError?.status, code);
                }
            });
        }
        catch (err) {
            const message = err?.message ?? 'Microsoft sign-in failed.';
            this.showErrors = true;
            this.loading = false;
            this.error = message;
        }
    }
    buildErrorText(email, serverMessage, status, code) {
        const base = `Unable to sign in as ${email || 'the requested user'}.`;
        if (status === 0) {
            return `${base} Network error. Please check your connection and try again.`;
        }
        if (code === 'tenant_mismatch') {
            return `${base} No CRM tenant could be resolved for this Microsoft account.`;
        }
        if (code === 'identity_not_linked') {
            return `${base} This Microsoft account is not linked to a CRM user.`;
        }
        if (code === 'email_conflict') {
            return `${base} Multiple CRM users match this Microsoft account. Contact an administrator.`;
        }
        if (code === 'external_audience_blocked') {
            return `${base} External users cannot sign in to the internal CRM workspace.`;
        }
        if (status === 401) {
            return `${base} Invalid email or password.`;
        }
        if (status === 400 && serverMessage?.toLowerCase().includes('tenant')) {
            return `${base} Invalid tenant key.`;
        }
        return serverMessage ? `${base} ${serverMessage}` : `${base} Please check your credentials and try again.`;
    }
    deferUiUpdate(action) {
        window.setTimeout(() => {
            this.zone.run(action);
        });
    }
    static ɵfac = function LoginPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginPage)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i3.ActivatedRoute), i0.ɵɵdirectiveInject(i0.NgZone)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginPage, selectors: [["app-login-page"]], decls: 23, vars: 7, consts: [["localLoginDisabled", ""], [1, "login-card"], [1, "card-header"], [1, "signal"], [1, "brand-logo"], [3, "src", "alt"], [1, "card-title"], [1, "card-subtitle"], [1, "login-form", 3, "ngSubmit", "formGroup"], [4, "ngIf", "ngIfElse"], ["pButton", "", "type", "button", "class", "btn-submit btn-submit--secondary", 3, "disabled", "click", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [1, "card-footer"], [1, "footer-text"], ["routerLink", "/landing", 1, "footer-link"], [1, "pi", "pi-arrow-right"], [1, "form-group"], [1, "form-label"], [1, "input-wrapper"], [1, "pi", "pi-envelope", "input-icon"], ["pInputText", "", "type", "email", "formControlName", "email", "placeholder", "Enter your email", 3, "focus", "blur"], ["class", "form-error", 4, "ngIf"], [1, "pi", "pi-lock", "input-icon"], ["pInputText", "", "type", "password", "formControlName", "password", "placeholder", "Enter your password", 3, "focus", "blur"], [1, "forgot-password"], [1, "forgot-link"], ["pButton", "", "type", "submit", 1, "btn-submit", 3, "disabled"], [4, "ngIf"], ["class", "loading-state", 4, "ngIf"], [1, "form-error"], [1, "pi", "pi-exclamation-circle"], [1, "pi", "pi-sign-in"], [1, "loading-state"], [1, "pi", "pi-spinner", "pi-spin"], ["pButton", "", "type", "button", 1, "btn-submit", "btn-submit--secondary", 3, "click", "disabled"], [1, "pi", "pi-microsoft"], [1, "error-message"], [1, "pi", "pi-times-circle"], [1, "pi", "pi-info-circle"]], template: function LoginPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "app-auth-shell");
            i0.ɵɵelement(1, "app-breadcrumbs");
            i0.ɵɵelementStart(2, "div", 1)(3, "div", 2);
            i0.ɵɵelement(4, "div", 3);
            i0.ɵɵelementStart(5, "div", 4);
            i0.ɵɵelement(6, "img", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "h1", 6);
            i0.ɵɵtext(8, "Welcome Back");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p", 7);
            i0.ɵɵtext(10, "Sign in to continue to your account");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "form", 8);
            i0.ɵɵlistener("ngSubmit", function LoginPage_Template_form_ngSubmit_11_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.submit()); });
            i0.ɵɵtemplate(12, LoginPage_ng_container_12_Template, 21, 13, "ng-container", 9)(13, LoginPage_button_13_Template, 4, 1, "button", 10)(14, LoginPage_div_14_Template, 4, 1, "div", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(15, LoginPage_ng_template_15_Template, 4, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(17, "div", 12)(18, "span", 13);
            i0.ɵɵtext(19, "Don't have an account?");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "a", 14);
            i0.ɵɵtext(21, " Sign Up ");
            i0.ɵɵelement(22, "i", 15);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const localLoginDisabled_r5 = i0.ɵɵreference(16);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("src", ctx.branding.logoUrl() ?? "https://nedgtdal2.blob.core.windows.net/assets/branding/logo-v2.png", i0.ɵɵsanitizeUrl)("alt", ctx.branding.tenantName() ?? "North Edge CRM");
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.localLoginEnabled)("ngIfElse", localLoginDisabled_r5);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.entraEnabled);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, RouterLink,
            ButtonModule, i4.ButtonDirective, InputTextModule, i5.InputText, CheckboxModule,
            NgIf,
            BreadcrumbsComponent,
            AuthShellComponent], styles: ["@use '../../../styles/design-tokens' as *;\n@use '../../../styles/animations';\n\n// Styles now centralized in auth-shell component to keep auth pages consistent."] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginPage, [{
        type: Component,
        args: [{ selector: 'app-login-page', standalone: true, imports: [
                    ReactiveFormsModule,
                    RouterLink,
                    ButtonModule,
                    InputTextModule,
                    CheckboxModule,
                    NgIf,
                    BreadcrumbsComponent,
                    AuthShellComponent
                ], template: "<app-auth-shell>\n  <app-breadcrumbs></app-breadcrumbs>\n  <!-- Login Card -->\n  <div class=\"login-card\">\n    <div class=\"card-header\">\n      <div class=\"signal\"></div>\n      <div class=\"brand-logo\">\n        <img\n          [src]=\"branding.logoUrl() ?? 'https://nedgtdal2.blob.core.windows.net/assets/branding/logo-v2.png'\"\n          [alt]=\"branding.tenantName() ?? 'North Edge CRM'\"\n        />\n      </div>\n      <h1 class=\"card-title\">Welcome Back</h1>\n      <p class=\"card-subtitle\">Sign in to continue to your account</p>\n    </div>\n\n    <form [formGroup]=\"form\" (ngSubmit)=\"submit()\" class=\"login-form\">\n      <ng-container *ngIf=\"localLoginEnabled; else localLoginDisabled\">\n      <div class=\"form-group\">\n        <label class=\"form-label\">Email</label>\n        <div class=\"input-wrapper\" [class.focused]=\"emailFocused\" [class.error]=\"form.get('email')?.touched && form.get('email')?.invalid\">\n          <i class=\"pi pi-envelope input-icon\"></i>\n          <input \n            pInputText \n            type=\"email\" \n            formControlName=\"email\" \n            placeholder=\"Enter your email\"\n            (focus)=\"emailFocused = true\"\n            (blur)=\"emailFocused = false\"\n          />\n        </div>\n        <span class=\"form-error\" *ngIf=\"showErrors && form.get('email')?.invalid\">\n          <i class=\"pi pi-exclamation-circle\"></i>\n          Please enter a valid email\n        </span>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"form-label\">Password</label>\n        <div class=\"input-wrapper\" [class.focused]=\"passwordFocused\" [class.error]=\"form.get('password')?.touched && form.get('password')?.invalid\">\n          <i class=\"pi pi-lock input-icon\"></i>\n          <input \n            pInputText \n            type=\"password\" \n            formControlName=\"password\" \n            placeholder=\"Enter your password\"\n            (focus)=\"passwordFocused = true\"\n            (blur)=\"passwordFocused = false\"\n          />\n        </div>\n        <span class=\"form-error\" *ngIf=\"showErrors && form.get('password')?.invalid\">\n          <i class=\"pi pi-exclamation-circle\"></i>\n          Minimum 6 characters required\n        </span>\n      </div>\n\n      <div class=\"forgot-password\">\n        <a class=\"forgot-link\">Forgot Password?</a>\n      </div>\n\n      <button pButton type=\"submit\" class=\"btn-submit\" [disabled]=\"loading\">\n        <span *ngIf=\"!loading\">\n          <i class=\"pi pi-sign-in\"></i>\n          Sign In\n        </span>\n        <span *ngIf=\"loading\" class=\"loading-state\">\n          <i class=\"pi pi-spinner pi-spin\"></i>\n          Signing in...\n        </span>\n      </button>\n      </ng-container>\n\n      <button\n        *ngIf=\"entraEnabled\"\n        pButton\n        type=\"button\"\n        class=\"btn-submit btn-submit--secondary\"\n        [disabled]=\"loading\"\n        (click)=\"signInWithMicrosoft()\"\n      >\n        <span>\n          <i class=\"pi pi-microsoft\"></i>\n          Sign In With Microsoft\n        </span>\n      </button>\n\n      <div class=\"error-message\" *ngIf=\"error\">\n        <i class=\"pi pi-times-circle\"></i>\n        <span>{{ error }}</span>\n      </div>\n    </form>\n\n    <ng-template #localLoginDisabled>\n      <div class=\"error-message\">\n        <i class=\"pi pi-info-circle\"></i>\n        <span>Local sign-in is disabled for this tenant. Use Microsoft sign-in.</span>\n      </div>\n    </ng-template>\n\n    <div class=\"card-footer\">\n      <span class=\"footer-text\">Don't have an account?</span>\n      <a routerLink=\"/landing\" class=\"footer-link\">\n        Sign Up\n        <i class=\"pi pi-arrow-right\"></i>\n      </a>\n    </div>\n  </div>\n</app-auth-shell>\n", styles: ["@use '../../../styles/design-tokens' as *;\n@use '../../../styles/animations';\n\n// Styles now centralized in auth-shell component to keep auth pages consistent.\n"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.AuthService }, { type: i3.Router }, { type: i3.ActivatedRoute }, { type: i0.NgZone }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginPage, { className: "LoginPage", filePath: "src/app/public/auth/login.page.ts", lineNumber: 35 }); })();
