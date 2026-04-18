import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { environment } from '../../../environments/environment';
import { AuthShellComponent } from '../auth/auth-shell.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/button";
import * as i3 from "primeng/inputtext";
import * as i4 from "primeng/textarea";
function EmailUnsubscribePage_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelement(1, "i", 9);
    i0.ɵɵtext(2, " You have been unsubscribed. You will no longer receive marketing emails. ");
    i0.ɵɵelementEnd();
} }
function EmailUnsubscribePage_Conditional_11_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.errorMessage(), " ");
} }
function EmailUnsubscribePage_Conditional_11_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Processing...");
    i0.ɵɵelementEnd();
} }
function EmailUnsubscribePage_Conditional_11_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Unsubscribe");
    i0.ɵɵelementEnd();
} }
function EmailUnsubscribePage_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "form", 10);
    i0.ɵɵlistener("ngSubmit", function EmailUnsubscribePage_Conditional_11_Template_form_ngSubmit_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submit()); });
    i0.ɵɵelementStart(1, "div", 11)(2, "label", 12);
    i0.ɵɵtext(3, "Email address");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 13);
    i0.ɵɵelement(5, "input", 14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 11)(7, "label", 15);
    i0.ɵɵtext(8, "Reason (optional)");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 13);
    i0.ɵɵelement(10, "textarea", 16);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(11, EmailUnsubscribePage_Conditional_11_Conditional_11_Template, 2, 1, "div", 17);
    i0.ɵɵelementStart(12, "button", 18);
    i0.ɵɵconditionalCreate(13, EmailUnsubscribePage_Conditional_11_Conditional_13_Template, 2, 0, "span")(14, EmailUnsubscribePage_Conditional_11_Conditional_14_Template, 2, 0, "span");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "p", 19);
    i0.ɵɵtext(16, " This will opt you out of all marketing emails. Transactional emails may still be sent. ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance(11);
    i0.ɵɵconditional(ctx_r1.errorMessage() ? 11 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.submitting());
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.submitting() ? 13 : 14);
} }
export class EmailUnsubscribePage {
    fb = inject(FormBuilder);
    route = inject(ActivatedRoute);
    http = inject(HttpClient);
    baseUrl = environment.apiUrl;
    submitting = signal(false, ...(ngDevMode ? [{ debugName: "submitting" }] : []));
    done = signal(false, ...(ngDevMode ? [{ debugName: "done" }] : []));
    errorMessage = signal(null, ...(ngDevMode ? [{ debugName: "errorMessage" }] : []));
    form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        tenantId: ['', Validators.required],
        reason: ['']
    });
    ngOnInit() {
        const email = this.route.snapshot.queryParamMap.get('email') ?? '';
        const tenantId = this.route.snapshot.queryParamMap.get('tenantId') ?? '';
        this.form.patchValue({ email, tenantId });
    }
    submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.submitting.set(true);
        this.errorMessage.set(null);
        const payload = {
            email: this.form.value.email,
            tenantId: this.form.value.tenantId,
            reason: this.form.value.reason || undefined
        };
        this.http.post(`${this.baseUrl}/api/marketing/public/unsubscribe`, payload).subscribe({
            next: () => {
                this.submitting.set(false);
                this.done.set(true);
            },
            error: () => {
                this.submitting.set(false);
                this.errorMessage.set('Something went wrong. Please try again later.');
            }
        });
    }
    static ɵfac = function EmailUnsubscribePage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmailUnsubscribePage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmailUnsubscribePage, selectors: [["app-email-unsubscribe-page"]], decls: 12, vars: 1, consts: [[1, "login-card"], [1, "card-header"], [1, "signal"], [1, "brand-logo"], ["src", "https://nedgtdal2.blob.core.windows.net/assets/branding/logo-v2.png", "alt", "North Edge CRM"], [1, "card-title"], [1, "card-subtitle"], [1, "status-pill", "success"], [1, "login-form", 3, "formGroup"], [1, "pi", "pi-check-circle"], [1, "login-form", 3, "ngSubmit", "formGroup"], [1, "form-group"], ["for", "email", 1, "form-label"], [1, "input-wrapper"], ["pInputText", "", "id", "email", "type", "email", "formControlName", "email", "placeholder", "Your email address", "readonly", ""], ["for", "reason", 1, "form-label"], ["pTextarea", "", "id", "reason", "formControlName", "reason", "placeholder", "Tell us why you're unsubscribing", "rows", "3"], [1, "status-pill", "error"], ["pButton", "", "type", "submit", 1, "btn-submit", 3, "disabled"], [1, "unsubscribe-note"]], template: function EmailUnsubscribePage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "app-auth-shell")(1, "div", 0)(2, "div", 1);
            i0.ɵɵelement(3, "div", 2);
            i0.ɵɵelementStart(4, "div", 3);
            i0.ɵɵelement(5, "img", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "h1", 5);
            i0.ɵɵtext(7, "Email Preferences");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "p", 6);
            i0.ɵɵtext(9, "Manage your email subscription.");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(10, EmailUnsubscribePage_Conditional_10_Template, 3, 0, "div", 7)(11, EmailUnsubscribePage_Conditional_11_Template, 17, 4, "form", 8);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵconditional(ctx.done() ? 10 : 11);
        } }, dependencies: [CommonModule,
            ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, ButtonModule, i2.ButtonDirective, InputTextModule, i3.InputText, TextareaModule, i4.Textarea, AuthShellComponent], styles: ["@use '../../../styles/design-tokens' as *;\n\n.status-pill[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-radius: 12px;\n  font-size: 13px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n\n  &.success {\n    background: rgba(34, 197, 94, 0.12);\n    color: #15803d;\n  }\n\n  &.error {\n    background: rgba(239, 68, 68, 0.12);\n    color: #b91c1c;\n  }\n\n  i {\n    font-size: 1rem;\n  }\n}\n\n.unsubscribe-note[_ngcontent-%COMP%] {\n  margin: 0.75rem 0 0;\n  font-size: 0.75rem;\n  color: #94a3b8;\n  text-align: center;\n  line-height: 1.5;\n}\n\n[_nghost-%COMP%]     textarea.p-textarea {\n  width: 100%;\n  resize: vertical;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmailUnsubscribePage, [{
        type: Component,
        args: [{ selector: 'app-email-unsubscribe-page', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    ButtonModule,
                    InputTextModule,
                    TextareaModule,
                    AuthShellComponent
                ], template: "<app-auth-shell>\n  <div class=\"login-card\">\n    <div class=\"card-header\">\n      <div class=\"signal\"></div>\n      <div class=\"brand-logo\">\n        <img\n          src=\"https://nedgtdal2.blob.core.windows.net/assets/branding/logo-v2.png\"\n          alt=\"North Edge CRM\"\n        />\n      </div>\n      <h1 class=\"card-title\">Email Preferences</h1>\n      <p class=\"card-subtitle\">Manage your email subscription.</p>\n    </div>\n\n    @if (done()) {\n      <div class=\"status-pill success\">\n        <i class=\"pi pi-check-circle\"></i>\n        You have been unsubscribed. You will no longer receive marketing emails.\n      </div>\n    } @else {\n      <form [formGroup]=\"form\" (ngSubmit)=\"submit()\" class=\"login-form\">\n        <div class=\"form-group\">\n          <label class=\"form-label\" for=\"email\">Email address</label>\n          <div class=\"input-wrapper\">\n            <input pInputText id=\"email\" type=\"email\" formControlName=\"email\" placeholder=\"Your email address\" readonly />\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"form-label\" for=\"reason\">Reason (optional)</label>\n          <div class=\"input-wrapper\">\n            <textarea pTextarea id=\"reason\" formControlName=\"reason\" placeholder=\"Tell us why you're unsubscribing\" rows=\"3\"></textarea>\n          </div>\n        </div>\n\n        @if (errorMessage()) {\n          <div class=\"status-pill error\">\n            {{ errorMessage() }}\n          </div>\n        }\n\n        <button pButton type=\"submit\" class=\"btn-submit\" [disabled]=\"submitting()\">\n          @if (submitting()) {\n            <span>Processing...</span>\n          } @else {\n            <span>Unsubscribe</span>\n          }\n        </button>\n\n        <p class=\"unsubscribe-note\">\n          This will opt you out of all marketing emails. Transactional emails may still be sent.\n        </p>\n      </form>\n    }\n  </div>\n</app-auth-shell>\n", styles: ["@use '../../../styles/design-tokens' as *;\n\n.status-pill {\n  padding: 10px 14px;\n  border-radius: 12px;\n  font-size: 13px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n\n  &.success {\n    background: rgba(34, 197, 94, 0.12);\n    color: #15803d;\n  }\n\n  &.error {\n    background: rgba(239, 68, 68, 0.12);\n    color: #b91c1c;\n  }\n\n  i {\n    font-size: 1rem;\n  }\n}\n\n.unsubscribe-note {\n  margin: 0.75rem 0 0;\n  font-size: 0.75rem;\n  color: #94a3b8;\n  text-align: center;\n  line-height: 1.5;\n}\n\n:host ::ng-deep textarea.p-textarea {\n  width: 100%;\n  resize: vertical;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmailUnsubscribePage, { className: "EmailUnsubscribePage", filePath: "src/app/public/email-unsubscribe/email-unsubscribe.page.ts", lineNumber: 26 }); })();
