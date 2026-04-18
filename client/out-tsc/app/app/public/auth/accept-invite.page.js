import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../core/auth/auth.service';
import { AuthShellComponent } from './auth-shell.component';
import { finalize, timeout } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/api";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/progressspinner";
import * as i7 from "primeng/dialog";
function AcceptInvitePage_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵtext(1, " Checking invitation... ");
    i0.ɵɵelementEnd();
} }
function AcceptInvitePage_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.precheckMessage, " ");
} }
function AcceptInvitePage_form_12_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵclassMap(ctx_r0.status.tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.status.message, " ");
} }
function AcceptInvitePage_form_12_span_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Activate account");
    i0.ɵɵelementEnd();
} }
function AcceptInvitePage_form_12_span_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 26);
    i0.ɵɵelement(1, "p-progressSpinner", 27);
    i0.ɵɵtext(2, " Activating... ");
    i0.ɵɵelementEnd();
} }
function AcceptInvitePage_form_12_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 15);
    i0.ɵɵlistener("ngSubmit", function AcceptInvitePage_form_12_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.submit()); });
    i0.ɵɵelementStart(1, "div", 16)(2, "label", 17);
    i0.ɵɵtext(3, "New password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 18);
    i0.ɵɵelement(5, "input", 19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 16)(7, "label", 20);
    i0.ɵɵtext(8, "Confirm new password");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 18);
    i0.ɵɵelement(10, "input", 21);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(11, AcceptInvitePage_form_12_div_11_Template, 2, 3, "div", 22);
    i0.ɵɵelementStart(12, "button", 23);
    i0.ɵɵtemplate(13, AcceptInvitePage_form_12_span_13_Template, 2, 0, "span", 24)(14, AcceptInvitePage_form_12_span_14_Template, 3, 0, "span", 25);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r0.form);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", ctx_r0.status);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r0.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r0.loading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.loading);
} }
function AcceptInvitePage_ng_template_17_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 28);
    i0.ɵɵlistener("click", function AcceptInvitePage_ng_template_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.goToLogin()); });
    i0.ɵɵtext(1, "Go to login");
    i0.ɵɵelementEnd();
} }
export class AcceptInvitePage {
    loading = false;
    status = null;
    showSuccessDialog = false;
    precheckMessage = null;
    checkingInvite = false;
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    auth = inject(AuthService);
    router = inject(Router);
    zone = inject(NgZone);
    cdr = inject(ChangeDetectorRef);
    form = this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validators: this.passwordMatchValidator });
    ngOnInit() {
        const token = this.route.snapshot.queryParamMap.get('token') ?? '';
        if (!token) {
            this.precheckMessage = 'Invite link is missing or invalid.';
            return;
        }
        this.checkingInvite = true;
        this.auth
            .getInviteStatus(token)
            // Avoid keeping the page in a loading state if the network stalls.
            .pipe(timeout(12000), finalize(() => {
            this.checkingInvite = false;
        }))
            .subscribe({
            next: (res) => {
                if (res.status !== 'valid') {
                    this.precheckMessage = res.message;
                }
            },
            error: () => {
                this.precheckMessage = 'Invite link is invalid or expired.';
            }
        });
    }
    submit() {
        const token = this.route.snapshot.queryParamMap.get('token') ?? '';
        if (!token) {
            this.status = { tone: 'error', message: 'Invite link is missing or invalid.' };
            return;
        }
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.status = { tone: 'error', message: 'Please confirm a valid password.' };
            return;
        }
        this.loading = true;
        const { newPassword } = this.form.value;
        this.auth
            .acceptInvite(token, String(newPassword))
            // Ensure the submit button is re-enabled if the request hangs.
            .pipe(timeout(15000), finalize(() => {
            this.zone.run(() => {
                this.loading = false;
                this.cdr.detectChanges();
            });
        }))
            .subscribe({
            next: () => {
                this.zone.run(() => {
                    this.status = null;
                    this.showSuccessDialog = true;
                    this.cdr.detectChanges();
                });
            },
            error: () => {
                this.zone.run(() => {
                    this.status = { tone: 'error', message: 'Invite link is invalid or expired.' };
                    this.cdr.detectChanges();
                });
            }
        });
    }
    passwordMatchValidator(group) {
        const next = group?.get('newPassword')?.value;
        const confirm = group?.get('confirmPassword')?.value;
        return next && confirm && next !== confirm ? { passwordMismatch: true } : null;
    }
    goToLogin() {
        this.showSuccessDialog = false;
        this.router.navigate(['/login']);
    }
    static ɵfac = function AcceptInvitePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AcceptInvitePage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AcceptInvitePage, selectors: [["app-accept-invite-page"]], decls: 18, vars: 8, consts: [[1, "login-card"], [1, "card-header"], [1, "signal"], [1, "brand-logo"], ["src", "https://nedgtdal2.blob.core.windows.net/assets/branding/logo-v2.png", "alt", "North Edge CRM"], [1, "card-title"], [1, "card-subtitle"], ["class", "status-pill", 4, "ngIf"], ["class", "status-pill error", 4, "ngIf"], ["class", "login-form", 3, "formGroup", "ngSubmit", 4, "ngIf"], ["styleClass", "invite-success-dialog", "header", "Password updated", 3, "visibleChange", "visible", "modal", "closable", "draggable", "resizable"], [1, "dialog-body"], ["pTemplate", "footer"], [1, "status-pill"], [1, "status-pill", "error"], [1, "login-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "newPassword", 1, "form-label"], [1, "input-wrapper"], ["pInputText", "", "id", "newPassword", "type", "password", "formControlName", "newPassword", "placeholder", "Enter your password"], ["for", "confirmPassword", 1, "form-label"], ["pInputText", "", "id", "confirmPassword", "type", "password", "formControlName", "confirmPassword", "placeholder", "Confirm your password"], ["class", "status-pill", 3, "class", 4, "ngIf"], ["pButton", "", "type", "submit", 1, "btn-submit", 3, "disabled"], [4, "ngIf"], ["class", "loading-state", 4, "ngIf"], [1, "loading-state"], ["styleClass", "inline-spinner", "strokeWidth", "6", "animationDuration", "0.8s"], ["pButton", "", "type", "button", 1, "btn-submit", 3, "click"]], template: function AcceptInvitePage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "app-auth-shell")(1, "div", 0)(2, "div", 1);
            i0.ɵɵelement(3, "div", 2);
            i0.ɵɵelementStart(4, "div", 3);
            i0.ɵɵelement(5, "img", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1", 5);
            i0.ɵɵtext(7, "Activate your license");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p", 6);
            i0.ɵɵtext(9, "Set your password to join your workspace.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(10, AcceptInvitePage_div_10_Template, 2, 0, "div", 7)(11, AcceptInvitePage_div_11_Template, 2, 1, "div", 8)(12, AcceptInvitePage_form_12_Template, 15, 5, "form", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "p-dialog", 10);
            i0.ɵɵtwoWayListener("visibleChange", function AcceptInvitePage_Template_p_dialog_visibleChange_13_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.showSuccessDialog, $event) || (ctx.showSuccessDialog = $event); return $event; });
            i0.ɵɵelementStart(14, "div", 11)(15, "p");
            i0.ɵɵtext(16, "Your password has been set successfully. Please sign in to access your workspace.");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(17, AcceptInvitePage_ng_template_17_Template, 2, 0, "ng-template", 12);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngIf", ctx.checkingInvite);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.precheckMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.precheckMessage);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("visible", ctx.showSuccessDialog);
            i0.ɵɵproperty("modal", true)("closable", false)("draggable", false)("resizable", false);
        } }, dependencies: [CommonModule, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, ButtonModule, i3.ButtonDirective, i4.PrimeTemplate, InputTextModule, i5.InputText, ProgressSpinnerModule, i6.ProgressSpinner, DialogModule, i7.Dialog, AuthShellComponent], styles: ["@use '../../../styles/design-tokens' as *;\n\n.status-pill[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-radius: 999px;\n  font-size: 13px;\n}\n\n.status-pill.success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.12);\n  color: #15803d;\n}\n\n.status-pill.error[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.12);\n  color: #b91c1c;\n}\n\n.loading-state[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.inline-spinner[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\n\n.inline-spinner[_ngcontent-%COMP%]   .p-progress-spinner-circle[_ngcontent-%COMP%] {\n  stroke: rgba(255, 255, 255, 0.9);\n}\n\n[_nghost-%COMP%]     .invite-success-dialog .p-dialog-content {\n  padding: 20px 24px 12px;\n  color: #475569;\n}\n\n[_nghost-%COMP%]     .invite-success-dialog .p-dialog-footer {\n  padding: 0 24px 20px;\n  border-top: none;\n}\n\n[_nghost-%COMP%]     .invite-success-dialog .p-dialog-header {\n  padding: 18px 24px 0;\n  border-bottom: none;\n}\n\n[_nghost-%COMP%]     .invite-success-dialog .p-dialog {\n  background: rgba(255,255,255,0.12);\n  backdrop-filter: blur(26px) saturate(160%);\n  border: 1px solid rgba(255,255,255,0.22);\n  box-shadow: 0 24px 60px rgba(30, 18, 80, 0.4);\n}\n\n.dialog-body[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #475569;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AcceptInvitePage, [{
        type: Component,
        args: [{ selector: 'app-accept-invite-page', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    ButtonModule,
                    InputTextModule,
                    ProgressSpinnerModule,
                    DialogModule,
                    AuthShellComponent
                ], template: "<app-auth-shell>\n  <div class=\"login-card\">\n    <div class=\"card-header\">\n      <div class=\"signal\"></div>\n      <div class=\"brand-logo\">\n        <img\n          src=\"https://nedgtdal2.blob.core.windows.net/assets/branding/logo-v2.png\"\n          alt=\"North Edge CRM\"\n        />\n      </div>\n      <h1 class=\"card-title\">Activate your license</h1>\n      <p class=\"card-subtitle\">Set your password to join your workspace.</p>\n    </div>\n\n    <div *ngIf=\"checkingInvite\" class=\"status-pill\">\n      Checking invitation...\n    </div>\n\n    <div *ngIf=\"precheckMessage\" class=\"status-pill error\">\n      {{ precheckMessage }}\n    </div>\n\n    <form *ngIf=\"!precheckMessage\" [formGroup]=\"form\" (ngSubmit)=\"submit()\" class=\"login-form\">\n      <div class=\"form-group\">\n        <label class=\"form-label\" for=\"newPassword\">New password</label>\n        <div class=\"input-wrapper\">\n          <input pInputText id=\"newPassword\" type=\"password\" formControlName=\"newPassword\" placeholder=\"Enter your password\" />\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-label\" for=\"confirmPassword\">Confirm new password</label>\n        <div class=\"input-wrapper\">\n          <input pInputText id=\"confirmPassword\" type=\"password\" formControlName=\"confirmPassword\" placeholder=\"Confirm your password\" />\n        </div>\n      </div>\n\n      <div *ngIf=\"status\" class=\"status-pill\" [class]=\"status.tone\">\n        {{ status.message }}\n      </div>\n\n      <button pButton type=\"submit\" class=\"btn-submit\" [disabled]=\"loading\">\n        <span *ngIf=\"!loading\">Activate account</span>\n        <span *ngIf=\"loading\" class=\"loading-state\">\n          <p-progressSpinner styleClass=\"inline-spinner\" strokeWidth=\"6\" animationDuration=\"0.8s\"></p-progressSpinner>\n          Activating...\n        </span>\n      </button>\n    </form>\n  </div>\n\n  <p-dialog\n    [(visible)]=\"showSuccessDialog\"\n    [modal]=\"true\"\n    [closable]=\"false\"\n    [draggable]=\"false\"\n    [resizable]=\"false\"\n    styleClass=\"invite-success-dialog\"\n    header=\"Password updated\"\n  >\n    <div class=\"dialog-body\">\n      <p>Your password has been set successfully. Please sign in to access your workspace.</p>\n    </div>\n    <ng-template pTemplate=\"footer\">\n      <button pButton type=\"button\" class=\"btn-submit\" (click)=\"goToLogin()\">Go to login</button>\n    </ng-template>\n  </p-dialog>\n</app-auth-shell>\n", styles: ["@use '../../../styles/design-tokens' as *;\n\n.status-pill {\n  padding: 10px 14px;\n  border-radius: 999px;\n  font-size: 13px;\n}\n\n.status-pill.success {\n  background: rgba(34, 197, 94, 0.12);\n  color: #15803d;\n}\n\n.status-pill.error {\n  background: rgba(239, 68, 68, 0.12);\n  color: #b91c1c;\n}\n\n.loading-state {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.inline-spinner {\n  width: 18px;\n  height: 18px;\n}\n\n.inline-spinner .p-progress-spinner-circle {\n  stroke: rgba(255, 255, 255, 0.9);\n}\n\n:host ::ng-deep .invite-success-dialog .p-dialog-content {\n  padding: 20px 24px 12px;\n  color: #475569;\n}\n\n:host ::ng-deep .invite-success-dialog .p-dialog-footer {\n  padding: 0 24px 20px;\n  border-top: none;\n}\n\n:host ::ng-deep .invite-success-dialog .p-dialog-header {\n  padding: 18px 24px 0;\n  border-bottom: none;\n}\n\n:host ::ng-deep .invite-success-dialog .p-dialog {\n  background: rgba(255,255,255,0.12);\n  backdrop-filter: blur(26px) saturate(160%);\n  border: 1px solid rgba(255,255,255,0.22);\n  box-shadow: 0 24px 60px rgba(30, 18, 80, 0.4);\n}\n\n.dialog-body {\n  font-size: 14px;\n  color: #475569;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AcceptInvitePage, { className: "AcceptInvitePage", filePath: "src/app/public/auth/accept-invite.page.ts", lineNumber: 28 }); })();
