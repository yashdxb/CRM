import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthShellComponent } from './auth-shell.component';
import { finalize, timeout } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../core/auth/auth.service";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "primeng/button";
import * as i6 from "primeng/inputtext";
import * as i7 from "primeng/progressspinner";
function ChangePasswordPage_div_16_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Current password is required.");
    i0.ɵɵelementEnd();
} }
function ChangePasswordPage_div_16_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Minimum 6 characters.");
    i0.ɵɵelementEnd();
} }
function ChangePasswordPage_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtemplate(1, ChangePasswordPage_div_16_span_1_Template, 2, 0, "span", 19)(2, ChangePasswordPage_div_16_span_2_Template, 2, 0, "span", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_1_0 = ctx_r0.form.get("currentPassword")) == null ? null : tmp_1_0.hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_2_0 = ctx_r0.form.get("currentPassword")) == null ? null : tmp_2_0.hasError("minlength"));
} }
function ChangePasswordPage_div_22_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "New password is required.");
    i0.ɵɵelementEnd();
} }
function ChangePasswordPage_div_22_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Minimum 8 characters.");
    i0.ɵɵelementEnd();
} }
function ChangePasswordPage_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtemplate(1, ChangePasswordPage_div_22_span_1_Template, 2, 0, "span", 19)(2, ChangePasswordPage_div_22_span_2_Template, 2, 0, "span", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_1_0 = ctx_r0.form.get("newPassword")) == null ? null : tmp_1_0.hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_2_0 = ctx_r0.form.get("newPassword")) == null ? null : tmp_2_0.hasError("minlength"));
} }
function ChangePasswordPage_div_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtext(1, " New password must be different from the current password. ");
    i0.ɵɵelementEnd();
} }
function ChangePasswordPage_div_29_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Confirmation is required.");
    i0.ɵɵelementEnd();
} }
function ChangePasswordPage_div_29_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Minimum 8 characters.");
    i0.ɵɵelementEnd();
} }
function ChangePasswordPage_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtemplate(1, ChangePasswordPage_div_29_span_1_Template, 2, 0, "span", 19)(2, ChangePasswordPage_div_29_span_2_Template, 2, 0, "span", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_1_0 = ctx_r0.form.get("confirmPassword")) == null ? null : tmp_1_0.hasError("required"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_2_0 = ctx_r0.form.get("confirmPassword")) == null ? null : tmp_2_0.hasError("minlength"));
} }
function ChangePasswordPage_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtext(1, " New password and confirmation do not match. ");
    i0.ɵɵelementEnd();
} }
function ChangePasswordPage_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(ctx_r0.status.tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.status.message, " ");
} }
function ChangePasswordPage_span_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Update password");
    i0.ɵɵelementEnd();
} }
function ChangePasswordPage_span_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 23);
    i0.ɵɵelement(1, "p-progressSpinner", 24);
    i0.ɵɵtext(2, " Updating... ");
    i0.ɵɵelementEnd();
} }
export class ChangePasswordPage {
    auth;
    router;
    loading = false;
    status = null;
    fb = inject(FormBuilder);
    // Build the form after DI is ready to avoid "used before initialization" in AOT builds.
    form = this.fb.group({
        currentPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, { validators: [this.passwordMatchValidator, this.passwordDifferentValidator] });
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            this.status = { tone: 'error', message: this.getValidationMessage() };
            return;
        }
        this.loading = true;
        const { currentPassword, newPassword } = this.form.value;
        this.auth
            .changePassword(String(currentPassword), String(newPassword))
            .pipe(timeout(15000), finalize(() => {
            this.loading = false;
        }))
            .subscribe({
            next: () => {
                this.status = { tone: 'success', message: 'Password updated successfully.' };
                // Send the user into the app after a successful change.
                this.router.navigate(['/app/dashboard']);
            },
            error: () => {
                this.status = { tone: 'error', message: 'Unable to change password. Verify your current password.' };
            }
        });
    }
    passwordMatchValidator(group) {
        const next = group?.get('newPassword')?.value;
        const confirm = group?.get('confirmPassword')?.value;
        return next && confirm && next !== confirm ? { passwordMismatch: true } : null;
    }
    passwordDifferentValidator(group) {
        const current = group?.get('currentPassword')?.value;
        const next = group?.get('newPassword')?.value;
        return current && next && current === next ? { passwordSame: true } : null;
    }
    getValidationMessage() {
        const current = this.form.get('currentPassword');
        const next = this.form.get('newPassword');
        const confirm = this.form.get('confirmPassword');
        if (current?.hasError('required') || next?.hasError('required') || confirm?.hasError('required')) {
            return 'Please fill out all required fields.';
        }
        if (current?.hasError('minlength')) {
            return 'Current password must be at least 6 characters.';
        }
        if (next?.hasError('minlength') || confirm?.hasError('minlength')) {
            return 'New password must be at least 8 characters.';
        }
        if (this.form.hasError('passwordSame')) {
            return 'New password must be different from the current password.';
        }
        if (this.form.hasError('passwordMismatch')) {
            return 'New password and confirmation do not match.';
        }
        return 'Please confirm your new password.';
    }
    static ɵfac = function ChangePasswordPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ChangePasswordPage)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ChangePasswordPage, selectors: [["app-change-password-page"]], decls: 35, vars: 10, consts: [[1, "login-card"], [1, "card-header"], [1, "signal"], [1, "brand-logo"], ["src", "https://nedgtdal2.blob.core.windows.net/assets/branding/logo-v2.png", "alt", "North Edge CRM"], [1, "card-title"], [1, "card-subtitle"], [1, "login-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "currentPassword", 1, "form-label"], [1, "input-wrapper"], ["pInputText", "", "id", "currentPassword", "type", "password", "formControlName", "currentPassword", "placeholder", "Enter current password"], ["class", "field-error", 4, "ngIf"], ["for", "newPassword", 1, "form-label"], ["pInputText", "", "id", "newPassword", "type", "password", "formControlName", "newPassword", "placeholder", "Enter new password"], ["for", "confirmPassword", 1, "form-label"], ["pInputText", "", "id", "confirmPassword", "type", "password", "formControlName", "confirmPassword", "placeholder", "Confirm new password"], ["class", "status-pill", 3, "class", 4, "ngIf"], ["pButton", "", "type", "submit", 1, "btn-submit", 3, "disabled"], [4, "ngIf"], ["class", "loading-state", 4, "ngIf"], [1, "field-error"], [1, "status-pill"], [1, "loading-state"], ["styleClass", "inline-spinner", "strokeWidth", "6", "animationDuration", "0.8s"]], template: function ChangePasswordPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "app-auth-shell")(1, "div", 0)(2, "div", 1);
            i0.ɵɵelement(3, "div", 2);
            i0.ɵɵelementStart(4, "div", 3);
            i0.ɵɵelement(5, "img", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1", 5);
            i0.ɵɵtext(7, "Update your password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p", 6);
            i0.ɵɵtext(9, "For security, set a new password before continuing.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "form", 7);
            i0.ɵɵlistener("ngSubmit", function ChangePasswordPage_Template_form_ngSubmit_10_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(11, "div", 8)(12, "label", 9);
            i0.ɵɵtext(13, "Current password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 10);
            i0.ɵɵelement(15, "input", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(16, ChangePasswordPage_div_16_Template, 3, 2, "div", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 8)(18, "label", 13);
            i0.ɵɵtext(19, "New password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 10);
            i0.ɵɵelement(21, "input", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(22, ChangePasswordPage_div_22_Template, 3, 2, "div", 12)(23, ChangePasswordPage_div_23_Template, 2, 0, "div", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 8)(25, "label", 15);
            i0.ɵɵtext(26, "Confirm new password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 10);
            i0.ɵɵelement(28, "input", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(29, ChangePasswordPage_div_29_Template, 3, 2, "div", 12)(30, ChangePasswordPage_div_30_Template, 2, 0, "div", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(31, ChangePasswordPage_div_31_Template, 2, 3, "div", 17);
            i0.ɵɵelementStart(32, "button", 18);
            i0.ɵɵtemplate(33, ChangePasswordPage_span_33_Template, 2, 0, "span", 19)(34, ChangePasswordPage_span_34_Template, 3, 0, "span", 20);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            let tmp_1_0;
            let tmp_2_0;
            let tmp_4_0;
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ((tmp_1_0 = ctx.form.get("currentPassword")) == null ? null : tmp_1_0.touched) && ((tmp_1_0 = ctx.form.get("currentPassword")) == null ? null : tmp_1_0.errors));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ((tmp_2_0 = ctx.form.get("newPassword")) == null ? null : tmp_2_0.touched) && ((tmp_2_0 = ctx.form.get("newPassword")) == null ? null : tmp_2_0.errors));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.form.touched && ctx.form.hasError("passwordSame"));
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ((tmp_4_0 = ctx.form.get("confirmPassword")) == null ? null : tmp_4_0.touched) && ((tmp_4_0 = ctx.form.get("confirmPassword")) == null ? null : tmp_4_0.errors));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.form.touched && ctx.form.hasError("passwordMismatch"));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.status);
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.loading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.loading);
        } }, dependencies: [CommonModule, i3.NgIf, ReactiveFormsModule, i4.ɵNgNoValidate, i4.DefaultValueAccessor, i4.NgControlStatus, i4.NgControlStatusGroup, i4.FormGroupDirective, i4.FormControlName, ButtonModule, i5.ButtonDirective, InputTextModule, i6.InputText, ProgressSpinnerModule, i7.ProgressSpinner, AuthShellComponent], styles: ["@use '../../../styles/design-tokens' as *;\n\n.status-pill[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-radius: 999px;\n  font-size: 13px;\n}\n\n.status-pill.success[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.12);\n  color: #15803d;\n}\n\n.status-pill.error[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.12);\n  color: #b91c1c;\n}\n\n.loading-state[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.inline-spinner[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\n\n.inline-spinner[_ngcontent-%COMP%]   .p-progress-spinner-circle[_ngcontent-%COMP%] {\n  stroke: rgba(255, 255, 255, 0.9);\n}\n\n.field-error[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #b91c1c;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ChangePasswordPage, [{
        type: Component,
        args: [{ selector: 'app-change-password-page', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    ButtonModule,
                    InputTextModule,
                    ProgressSpinnerModule,
                    AuthShellComponent
                ], template: "<app-auth-shell>\n  <div class=\"login-card\">\n    <div class=\"card-header\">\n      <div class=\"signal\"></div>\n      <div class=\"brand-logo\">\n        <img\n          src=\"https://nedgtdal2.blob.core.windows.net/assets/branding/logo-v2.png\"\n          alt=\"North Edge CRM\"\n        />\n      </div>\n      <h1 class=\"card-title\">Update your password</h1>\n      <p class=\"card-subtitle\">For security, set a new password before continuing.</p>\n    </div>\n\n    <form [formGroup]=\"form\" (ngSubmit)=\"submit()\" class=\"login-form\">\n      <div class=\"form-group\">\n        <label class=\"form-label\" for=\"currentPassword\">Current password</label>\n        <div class=\"input-wrapper\">\n          <input pInputText id=\"currentPassword\" type=\"password\" formControlName=\"currentPassword\" placeholder=\"Enter current password\" />\n        </div>\n        <div class=\"field-error\" *ngIf=\"form.get('currentPassword')?.touched && form.get('currentPassword')?.errors\">\n          <span *ngIf=\"form.get('currentPassword')?.hasError('required')\">Current password is required.</span>\n          <span *ngIf=\"form.get('currentPassword')?.hasError('minlength')\">Minimum 6 characters.</span>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-label\" for=\"newPassword\">New password</label>\n        <div class=\"input-wrapper\">\n          <input pInputText id=\"newPassword\" type=\"password\" formControlName=\"newPassword\" placeholder=\"Enter new password\" />\n        </div>\n        <div class=\"field-error\" *ngIf=\"form.get('newPassword')?.touched && form.get('newPassword')?.errors\">\n          <span *ngIf=\"form.get('newPassword')?.hasError('required')\">New password is required.</span>\n          <span *ngIf=\"form.get('newPassword')?.hasError('minlength')\">Minimum 8 characters.</span>\n        </div>\n        <div class=\"field-error\" *ngIf=\"form.touched && form.hasError('passwordSame')\">\n          New password must be different from the current password.\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"form-label\" for=\"confirmPassword\">Confirm new password</label>\n        <div class=\"input-wrapper\">\n          <input pInputText id=\"confirmPassword\" type=\"password\" formControlName=\"confirmPassword\" placeholder=\"Confirm new password\" />\n        </div>\n        <div class=\"field-error\" *ngIf=\"form.get('confirmPassword')?.touched && form.get('confirmPassword')?.errors\">\n          <span *ngIf=\"form.get('confirmPassword')?.hasError('required')\">Confirmation is required.</span>\n          <span *ngIf=\"form.get('confirmPassword')?.hasError('minlength')\">Minimum 8 characters.</span>\n        </div>\n        <div class=\"field-error\" *ngIf=\"form.touched && form.hasError('passwordMismatch')\">\n          New password and confirmation do not match.\n        </div>\n      </div>\n\n      <div *ngIf=\"status\" class=\"status-pill\" [class]=\"status.tone\">\n        {{ status.message }}\n      </div>\n\n      <button pButton type=\"submit\" class=\"btn-submit\" [disabled]=\"loading\">\n        <span *ngIf=\"!loading\">Update password</span>\n        <span *ngIf=\"loading\" class=\"loading-state\">\n          <p-progressSpinner\n            styleClass=\"inline-spinner\"\n            strokeWidth=\"6\"\n            animationDuration=\"0.8s\"\n          ></p-progressSpinner>\n          Updating...\n        </span>\n      </button>\n    </form>\n  </div>\n</app-auth-shell>\n", styles: ["@use '../../../styles/design-tokens' as *;\n\n.status-pill {\n  padding: 10px 14px;\n  border-radius: 999px;\n  font-size: 13px;\n}\n\n.status-pill.success {\n  background: rgba(34, 197, 94, 0.12);\n  color: #15803d;\n}\n\n.status-pill.error {\n  background: rgba(239, 68, 68, 0.12);\n  color: #b91c1c;\n}\n\n.loading-state {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.inline-spinner {\n  width: 18px;\n  height: 18px;\n}\n\n.inline-spinner .p-progress-spinner-circle {\n  stroke: rgba(255, 255, 255, 0.9);\n}\n\n.field-error {\n  font-size: 12px;\n  color: #b91c1c;\n}\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ChangePasswordPage, { className: "ChangePasswordPage", filePath: "src/app/public/auth/change-password.page.ts", lineNumber: 26 }); })();
