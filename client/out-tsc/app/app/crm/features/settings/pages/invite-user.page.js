import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission, tokenHasRole } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { TimeZoneService } from '../../../../core/services/time-zone.service';
import { getTimeZoneFlagUrl } from '../../../../core/models/time-zone.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/button";
import * as i4 from "primeng/api";
import * as i5 from "primeng/inputtext";
import * as i6 from "primeng/inputgroup";
import * as i7 from "primeng/inputgroupaddon";
import * as i8 from "primeng/select";
import * as i9 from "primeng/multiselect";
import * as i10 from "primeng/toggleswitch";
function InviteUserPage_span_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 60);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const banner_r1 = ctx.ngIf;
    i0.ɵɵproperty("ngClass", "status-pill--" + banner_r1.tone);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", banner_r1.message, " ");
} }
function InviteUserPage_ng_template_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵelement(1, "img", 62);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r2.getFlagUrl(option_r2 == null ? null : option_r2.flagCode), i0.ɵɵsanitizeUrl)("alt", (option_r2 == null ? null : option_r2.flagCode) ? option_r2.flagCode.toUpperCase() + " flag" : "Flag");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r2.label);
} }
function InviteUserPage_ng_template_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61);
    i0.ɵɵelement(1, "img", 62);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r4 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r2.getFlagUrl(option_r4 == null ? null : option_r4.flagCode), i0.ɵɵsanitizeUrl)("alt", (option_r4 == null ? null : option_r4.flagCode) ? option_r4.flagCode.toUpperCase() + " flag" : "Flag");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r4 == null ? null : option_r4.label);
} }
function InviteUserPage_small_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1, "Share once, then require reset on first login.");
    i0.ɵɵelementEnd();
} }
export class InviteUserPage {
    dataService = inject(UserAdminDataService);
    fb = inject(FormBuilder);
    router = inject(Router);
    timeZoneService = inject(TimeZoneService);
    document = inject(DOCUMENT);
    fieldLabels = {
        fullName: 'Full name',
        email: 'Email',
        timeZone: 'Time zone',
        locale: 'Locale',
        roleIds: 'Roles'
    };
    roles = signal([], ...(ngDevMode ? [{ debugName: "roles" }] : []));
    loadingRoles = signal(true, ...(ngDevMode ? [{ debugName: "loadingRoles" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    generatedPassword = signal(null, ...(ngDevMode ? [{ debugName: "generatedPassword" }] : []));
    status = signal(null, ...(ngDevMode ? [{ debugName: "status" }] : []));
    formStateTick = signal(0, ...(ngDevMode ? [{ debugName: "formStateTick" }] : []));
    // Re-evaluate permissions from storage so freshly issued tokens unlock the button without reloads.
    canManageAdmin = computed(() => {
        const payload = readTokenContext()?.payload ?? null;
        return (tokenHasPermission(payload, PERMISSION_KEYS.administrationManage) ||
            tokenHasRole(payload, 'Admin'));
    }, ...(ngDevMode ? [{ debugName: "canManageAdmin" }] : []));
    inviteDisabledReason = computed(() => {
        // Bridge ReactiveForms changes into the signal graph so this computed re-evaluates.
        this.formStateTick();
        if (!readTokenContext()) {
            return 'Your session has expired. Please sign in again.';
        }
        if (!this.canManageAdmin()) {
            return 'You do not have permission to invite users.';
        }
        if (this.saving()) {
            return 'Invite is already sending.';
        }
        if (this.form.invalid) {
            return 'Complete the required fields before sending the invite.';
        }
        return null;
    }, ...(ngDevMode ? [{ debugName: "inviteDisabledReason" }] : []));
    // Shared time zone catalog keeps labels and flags consistent across settings screens.
    timezoneOptions = [];
    getFlagUrl = getTimeZoneFlagUrl;
    localeOptions = [
        { label: 'English (US)', value: 'en-US' },
        { label: 'English (UK)', value: 'en-GB' },
        { label: 'English (India)', value: 'en-IN' },
        { label: 'French', value: 'fr-FR' },
        { label: 'Spanish', value: 'es-ES' }
    ];
    form = this.fb.nonNullable.group({
        fullName: ['', [Validators.required, Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        timeZone: ['UTC', Validators.required],
        locale: ['en-US', Validators.required],
        roleIds: [[]],
        isActive: [true],
        temporaryPassword: ['']
    });
    canSubmit = computed(() => this.form.valid && !this.saving() && this.canManageAdmin(), ...(ngDevMode ? [{ debugName: "canSubmit" }] : []));
    constructor() {
        this.timeZoneService.getTimeZones().subscribe((options) => {
            this.timezoneOptions = options;
        });
        // Clear the manual "roles required" error once the user selects at least one role.
        this.form.get('roleIds')?.valueChanges.subscribe((roles) => {
            if ((roles ?? []).length > 0) {
                this.form.get('roleIds')?.setErrors(null);
            }
        });
        this.form.statusChanges.subscribe(() => this.formStateTick.update((value) => value + 1));
        this.form.valueChanges.subscribe(() => this.formStateTick.update((value) => value + 1));
        this.loadRoles();
    }
    loadRoles() {
        this.loadingRoles.set(true);
        this.dataService.getRoles().subscribe({
            next: (roles) => {
                this.roles.set(roles);
                this.loadingRoles.set(false);
            },
            error: () => {
                this.loadingRoles.set(false);
                this.raiseStatus('error', 'Unable to load roles. Refresh and try again.');
            }
        });
    }
    rolesAsOptions() {
        return this.roles().map((role) => ({ label: role.name, value: role.id, description: role.description }));
    }
    handleSubmit() {
        this.syncDomFormValues();
        this.syncRoleErrors();
        if (!this.canManageAdmin()) {
            // Block unauthorized sends while still surfacing a clear UI message.
            this.raiseStatus('error', 'You do not have permission to invite users.');
            return;
        }
        if (this.form.invalid) {
            // Give immediate feedback when required fields are missing so the button doesn't feel unresponsive.
            this.form.markAllAsTouched();
            this.raiseStatus('error', this.buildMissingFieldsMessage());
            return;
        }
        const payload = {
            fullName: this.form.value.fullName?.trim() ?? '',
            email: this.form.value.email?.trim().toLowerCase() ?? '',
            userAudience: 'Internal',
            timeZone: this.form.value.timeZone,
            locale: this.form.value.locale,
            isActive: !!this.form.value.isActive,
            roleIds: (this.form.value.roleIds ?? []),
            temporaryPassword: this.form.value.temporaryPassword?.trim() || undefined
        };
        if (payload.roleIds.length === 0) {
            this.form.get('roleIds')?.setErrors({ required: true });
            this.raiseStatus('error', 'Assign at least one role.');
            return;
        }
        this.saving.set(true);
        this.dataService.create(payload).subscribe({
            next: (response) => {
                this.saving.set(false);
                const inviteEmailSent = response.inviteEmailSent !== false;
                this.raiseStatus(inviteEmailSent ? 'success' : 'error', response.inviteDeliveryMessage?.trim() || (inviteEmailSent ? 'User invited successfully.' : 'User created, but invite email failed.'));
                this.form.reset({
                    fullName: '',
                    email: '',
                    timeZone: 'UTC',
                    locale: 'en-US',
                    roleIds: [],
                    isActive: true,
                    temporaryPassword: ''
                });
                this.generatedPassword.set(null);
            },
            error: () => {
                this.saving.set(false);
                this.raiseStatus('error', 'Unable to invite user.');
            }
        });
    }
    generatePassword() {
        const value = this.generatePasswordValue();
        this.form.patchValue({ temporaryPassword: value });
        this.generatedPassword.set(value);
    }
    handleInviteClick(event) {
        this.syncDomFormValues();
        this.syncRoleErrors();
        if (!readTokenContext()) {
            event.preventDefault();
            this.raiseStatus('error', 'Your session has expired. Please sign in again.');
            return;
        }
        if (!this.canManageAdmin()) {
            event.preventDefault();
            this.raiseStatus('error', 'You do not have permission to invite users.');
            return;
        }
        if (this.form.invalid) {
            event.preventDefault();
            this.form.markAllAsTouched();
            this.raiseStatus('error', this.buildMissingFieldsMessage());
        }
    }
    syncRoleErrors() {
        // Normalize any stale role validation errors to keep the form state accurate.
        const roles = (this.form.get('roleIds')?.value ?? []);
        if (roles.length > 0) {
            this.form.get('roleIds')?.setErrors(null);
        }
    }
    syncDomFormValues() {
        const fullNameInput = this.document.getElementById('iu-fullName');
        if (fullNameInput) {
            const normalized = fullNameInput.value.trim();
            if (normalized !== this.form.controls.fullName.value) {
                this.form.controls.fullName.setValue(normalized, { emitEvent: false });
            }
        }
        const emailInput = this.document.getElementById('iu-email');
        if (emailInput) {
            const normalized = emailInput.value.trim().toLowerCase();
            if (normalized !== this.form.controls.email.value) {
                this.form.controls.email.setValue(normalized, { emitEvent: false });
            }
        }
        const temporaryPasswordInput = this.document.getElementById('iu-temporaryPassword');
        if (temporaryPasswordInput) {
            const normalized = temporaryPasswordInput.value.trim();
            if (normalized !== this.form.controls.temporaryPassword.value) {
                this.form.controls.temporaryPassword.setValue(normalized, { emitEvent: false });
            }
        }
        this.form.controls.fullName.updateValueAndValidity({ emitEvent: false });
        this.form.controls.email.updateValueAndValidity({ emitEvent: false });
        this.form.controls.temporaryPassword.updateValueAndValidity({ emitEvent: false });
    }
    buildMissingFieldsMessage() {
        const missing = Object.entries(this.fieldLabels)
            .filter(([key]) => this.form.get(key)?.invalid)
            .map(([, label]) => label);
        if (missing.length === 0) {
            return 'Complete the required fields before sending the invite.';
        }
        return `Complete the required fields: ${missing.join(', ')}.`;
    }
    navigateBack() {
        this.router.navigate(['/app/settings']);
    }
    generatePasswordValue() {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const upper = alphabet.toUpperCase();
        const digits = '0123456789';
        const symbols = '!@$?*#';
        const pool = alphabet + upper + digits + symbols;
        let value = '';
        for (let i = 0; i < 14; i++) {
            const index = Math.floor(Math.random() * pool.length);
            value += pool[index];
        }
        return value;
    }
    raiseStatus(tone, message) {
        this.status.set({ tone, message });
        setTimeout(() => this.status.set(null), 4000);
    }
    static ɵfac = function InviteUserPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InviteUserPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: InviteUserPage, selectors: [["app-invite-user-page"]], decls: 91, vars: 21, consts: [[1, "invite-page"], [1, "form-header"], [1, "header-content"], ["type", "button", "routerLink", "/app/settings/users", 1, "back-link"], [1, "pi", "pi-arrow-left"], [1, "header-row"], [1, "header-title"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "header-subtitle"], [1, "header-meta"], [1, "meta-chip"], [1, "pi", "pi-send"], ["class", "status-pill", 3, "ngClass", 4, "ngIf"], [1, "form-body"], [1, "form-card"], [1, "section-title"], [1, "pi", "pi-user-plus"], [1, "form-layout", 3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "form-field"], ["for", "iu-fullName"], [1, "required"], [1, "icon-addon", "icon-addon--name"], [1, "pi", "pi-user"], ["pInputText", "", "id", "iu-fullName", "formControlName", "fullName", "placeholder", "Jordan Patel"], ["for", "iu-email"], [1, "icon-addon", "icon-addon--email"], [1, "pi", "pi-envelope"], ["pInputText", "", "id", "iu-email", "formControlName", "email", "placeholder", "user@example.com"], ["for", "iu-timeZone"], ["inputId", "iu-timeZone", "formControlName", "timeZone", "optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", "filterBy", "label", "filterPlaceholder", "Search time zones", 3, "options", "filter"], ["pTemplate", "item"], ["pTemplate", "selectedItem"], ["for", "iu-locale"], ["inputId", "iu-locale", "formControlName", "locale", "optionLabel", "label", "optionValue", "value", "appendTo", "body", "styleClass", "w-full", 3, "options"], [1, "form-field", "full-row"], ["for", "iu-roles"], ["inputId", "iu-roles", "formControlName", "roleIds", "optionLabel", "label", "optionValue", "value", "display", "chip", "appendTo", "body", "defaultLabel", "Select roles", "styleClass", "w-full", 3, "options"], ["for", "iu-temporaryPassword"], [1, "password-field"], [1, "icon-addon", "icon-addon--warning"], [1, "pi", "pi-lock"], ["pInputText", "", "id", "iu-temporaryPassword", "type", "text", "formControlName", "temporaryPassword", "placeholder", "Optional"], ["type", "button", 1, "btn-generate", 3, "click", "disabled"], [1, "pi", "pi-sync"], [4, "ngIf"], [1, "status-control-card"], [1, "status-control-icon"], [1, "pi"], [1, "status-control-content"], [1, "status-control-label"], [1, "status-control-value"], [1, "status-control-hint"], [1, "status-control-toggle"], ["formControlName", "isActive"], [1, "form-actions"], ["type", "button", "pButton", "", "label", "Cancel", "routerLink", "/app/settings/users", 1, "crm-button--ghost"], ["type", "submit", "pButton", "", "label", "Send Invite", "icon", "pi pi-send", 1, "crm-button--primary", 3, "click", "disabled"], [1, "status-pill", 3, "ngClass"], [1, "timezone-option"], ["width", "18", "height", "12", "loading", "lazy", 1, "timezone-flag", 3, "src", "alt"]], template: function InviteUserPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵelement(3, "app-breadcrumbs");
            i0.ɵɵelementStart(4, "button", 3);
            i0.ɵɵelement(5, "i", 4);
            i0.ɵɵtext(6, " Back to Users ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div", 5)(8, "div", 6)(9, "h1", 7)(10, "span", 8);
            i0.ɵɵtext(11, "Invite");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "span", 9);
            i0.ɵɵtext(13, "Teammate");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "p", 10);
            i0.ɵɵtext(15, " Add new team members with personalized access and roles. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "div", 11)(17, "span", 12);
            i0.ɵɵelement(18, "i", 13);
            i0.ɵɵtext(19, " New Invitation ");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(20, InviteUserPage_span_20_Template, 2, 2, "span", 14);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(21, "div", 15)(22, "article", 16)(23, "h3", 17);
            i0.ɵɵelement(24, "i", 18);
            i0.ɵɵtext(25, " User Details ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "form", 19);
            i0.ɵɵlistener("ngSubmit", function InviteUserPage_Template_form_ngSubmit_26_listener() { return ctx.handleSubmit(); });
            i0.ɵɵelementStart(27, "div", 20)(28, "div", 21)(29, "label", 22);
            i0.ɵɵtext(30, "Full name ");
            i0.ɵɵelementStart(31, "span", 23);
            i0.ɵɵtext(32, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "p-inputgroup")(34, "p-inputgroup-addon", 24);
            i0.ɵɵelement(35, "i", 25);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(36, "input", 26);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(37, "div", 21)(38, "label", 27);
            i0.ɵɵtext(39, "Email ");
            i0.ɵɵelementStart(40, "span", 23);
            i0.ɵɵtext(41, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "p-inputgroup")(43, "p-inputgroup-addon", 28);
            i0.ɵɵelement(44, "i", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(45, "input", 30);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "div", 21)(47, "label", 31);
            i0.ɵɵtext(48, "Time zone ");
            i0.ɵɵelementStart(49, "span", 23);
            i0.ɵɵtext(50, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(51, "p-select", 32);
            i0.ɵɵtemplate(52, InviteUserPage_ng_template_52_Template, 4, 3, "ng-template", 33)(53, InviteUserPage_ng_template_53_Template, 4, 3, "ng-template", 34);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(54, "div", 21)(55, "label", 35);
            i0.ɵɵtext(56, "Locale ");
            i0.ɵɵelementStart(57, "span", 23);
            i0.ɵɵtext(58, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(59, "p-select", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "div", 37)(61, "label", 38);
            i0.ɵɵtext(62, "Roles");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(63, "p-multiSelect", 39);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "div", 37)(65, "label", 40);
            i0.ɵɵtext(66, "Temporary password");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "div", 41)(68, "p-inputgroup")(69, "p-inputgroup-addon", 42);
            i0.ɵɵelement(70, "i", 43);
            i0.ɵɵelementEnd();
            i0.ɵɵelement(71, "input", 44);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "button", 45);
            i0.ɵɵlistener("click", function InviteUserPage_Template_button_click_72_listener() { return ctx.generatePassword(); });
            i0.ɵɵelement(73, "i", 46);
            i0.ɵɵtext(74, " Generate ");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(75, InviteUserPage_small_75_Template, 2, 0, "small", 47);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(76, "div", 48)(77, "div", 49);
            i0.ɵɵelement(78, "i", 50);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "div", 51)(80, "span", 52);
            i0.ɵɵtext(81, "Account Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(82, "strong", 53);
            i0.ɵɵtext(83);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "span", 54);
            i0.ɵɵtext(85);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(86, "div", 55);
            i0.ɵɵelement(87, "p-toggleSwitch", 56);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(88, "div", 57);
            i0.ɵɵelement(89, "button", 58);
            i0.ɵɵelementStart(90, "button", 59);
            i0.ɵɵlistener("click", function InviteUserPage_Template_button_click_90_listener($event) { return ctx.handleInviteClick($event); });
            i0.ɵɵelementEnd()()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(20);
            i0.ɵɵproperty("ngIf", ctx.status());
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(25);
            i0.ɵɵproperty("options", ctx.timezoneOptions)("filter", true);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("options", ctx.localeOptions);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("options", ctx.rolesAsOptions());
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("disabled", !ctx.canManageAdmin());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.generatedPassword());
            i0.ɵɵadvance();
            i0.ɵɵclassProp("status-control-card--active", ctx.form.value.isActive)("status-control-card--inactive", !ctx.form.value.isActive);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("status-control-icon--active", ctx.form.value.isActive);
            i0.ɵɵadvance();
            i0.ɵɵclassProp("pi-check-circle", ctx.form.value.isActive)("pi-ban", !ctx.form.value.isActive);
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate(ctx.form.value.isActive ? "Active" : "Inactive");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.form.value.isActive ? "User can access the system immediately" : "User access is disabled");
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", !!ctx.inviteDisabledReason());
        } }, dependencies: [CommonModule, i1.NgClass, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, RouterLink,
            ButtonModule, i3.ButtonDirective, i4.PrimeTemplate, InputTextModule, i5.InputText, InputGroupModule, i6.InputGroup, InputGroupAddonModule, i7.InputGroupAddon, SelectModule, i8.Select, MultiSelectModule, i9.MultiSelect, ToggleSwitchModule, i10.ToggleSwitch, BreadcrumbsComponent], styles: ["\n\n\n\n\n\n\n\n\n\n@keyframes _ngcontent-%COMP%_fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n\n\n\n\n.invite-page[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n}\n\n\n\n\n\n.form-header[_ngcontent-%COMP%] {\n  padding: 1.5rem 2rem;\n  background: rgba(255, 255, 255, 0.85);\n  border-bottom: 1px solid rgba(148, 163, 184, 0.15);\n  animation: _ngcontent-%COMP%_fade-in-up 0.4s ease-out;\n}\n\n.header-content[_ngcontent-%COMP%] {\n  max-width: 1400px;\n  margin: 0 auto;\n}\n\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0;\n  margin-bottom: 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: rgba(60, 60, 67, 0.7);\n  background: none;\n  border: none;\n  cursor: pointer;\n  transition: color 0.2s ease;\n\n  i {\n    font-size: 0.75rem;\n  }\n\n  &:hover {\n    color: #7c3aed;\n  }\n}\n\n.header-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n\n.header-title[_ngcontent-%COMP%] {\n  h1 {\n    margin: 0 0 0.5rem;\n  }\n\n  p {\n    font-size: 0.95rem;\n    color: rgba(60, 60, 67, 0.7);\n    margin: 0;\n    max-width: 480px;\n  }\n}\n\n.header-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n\n.meta-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.9rem;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(14, 165, 233, 0.08) 100%);\n  border: 1px solid rgba(139, 92, 246, 0.15);\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #7c3aed;\n\n  i {\n    font-size: 0.75rem;\n  }\n}\n\n.status-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.4rem 0.85rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n\n  &--success {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n\n  &--error {\n    background: rgba(239, 68, 68, 0.12);\n    color: #b91c1c;\n  }\n}\n\n\n\n\n\n.form-body[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 2rem;\n  animation: _ngcontent-%COMP%_fade-in-up 0.4s ease-out 0.1s both;\n\n  @media (max-width: 768px) {\n    padding: 1rem;\n  }\n}\n\n.form-card[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 20px;\n  padding: 2rem;\n  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);\n\n  @media (max-width: 768px) {\n    padding: 1.25rem;\n    border-radius: 16px;\n  }\n}\n\n.section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  margin: 0 0 1.5rem;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.15);\n\n  i {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%);\n    border-radius: 10px;\n    font-size: 0.95rem;\n    color: #7c3aed;\n  }\n}\n\n\n\n\n\n.form-layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1.25rem;\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n\n    .required {\n      color: #ef4444;\n      margin-left: 2px;\n    }\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-multiselect,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea,\n  > .password-field,\n  > .form-field__input {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    grid-column: 1 / -1;\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n\n  small {\n    font-size: 0.75rem;\n    color: rgba(60, 60, 67, 0.6);\n    margin-top: 0.25rem;\n  }\n}\n\n.password-field[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n\n  input {\n    flex: 1;\n  }\n}\n\n\n\n[_nghost-%COMP%]     .timezone-option {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n\n[_nghost-%COMP%]     .timezone-flag {\n  width: 18px;\n  height: 12px;\n  border-radius: 2px;\n  object-fit: cover;\n  background: #e2e8f0;\n  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1);\n}\n\n.btn-generate[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  white-space: nowrap;\n  background: linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%);\n  color: #fff;\n\n  i {\n    font-size: 0.85rem;\n  }\n\n  &:hover:not(:disabled) {\n    transform: translateY(-1px);\n    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.35);\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n\n\n\n\n.status-control-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  background: rgba(248, 250, 252, 0.8);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 14px;\n  margin-top: 0.5rem;\n  transition: all 0.25s ease;\n\n  &--active {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(34, 197, 94, 0.05) 100%);\n    border-color: rgba(16, 185, 129, 0.2);\n  }\n\n  &--inactive {\n    background: linear-gradient(135deg, rgba(239, 68, 68, 0.06) 0%, rgba(248, 113, 113, 0.04) 100%);\n    border-color: rgba(239, 68, 68, 0.15);\n  }\n}\n\n.status-control-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.25s ease;\n\n  i {\n    font-size: 1.1rem;\n    color: rgba(60, 60, 67, 0.5);\n    transition: all 0.25s ease;\n  }\n\n  &--active {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(34, 197, 94, 0.12) 100%);\n\n    i {\n      color: #059669;\n    }\n  }\n}\n\n.status-control-card--inactive[_ngcontent-%COMP%]   .status-control-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(248, 113, 113, 0.08) 100%);\n\n  i {\n    color: #dc2626;\n  }\n}\n\n.status-control-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  flex: 1;\n  min-width: 0;\n}\n\n.status-control-label[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.status-control-value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.status-control-card--active[_ngcontent-%COMP%]   .status-control-value[_ngcontent-%COMP%] {\n  color: #047857;\n}\n\n.status-control-card--inactive[_ngcontent-%COMP%]   .status-control-value[_ngcontent-%COMP%] {\n  color: #b91c1c;\n}\n\n.status-control-hint[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.status-control-toggle[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n\n\n\n\n\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid rgba(148, 163, 184, 0.12);\n  margin-top: 0.5rem;\n}\n\n\n\n\n\n[_nghost-%COMP%]     {\n  .p-select,\n  .p-multiselect {\n    width: 100%;\n\n    .p-select-label,\n    .p-multiselect-label {\n      padding: 0.7rem 0.9rem;\n      border-radius: 10px;\n      font-size: 0.875rem;\n    }\n  }\n\n  .p-select:not(.p-disabled).p-focus,\n  .p-multiselect:not(.p-disabled).p-focus {\n    border-color: rgba(139, 92, 246, 0.5);\n    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);\n  }\n\n  .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {\n    background: linear-gradient(135deg, #10b981 0%, #34d399 100%);\n  }\n\n  .crm-button--primary {\n    background: linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%);\n    border: none;\n    font-weight: 600;\n    border-radius: 10px;\n    padding: 0.7rem 1.25rem;\n    transition: all 0.2s ease;\n\n    &:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 6px 20px rgba(139, 92, 246, 0.35);\n    }\n\n    &:disabled {\n      opacity: 0.5;\n    }\n  }\n\n  .crm-button--ghost {\n    background: transparent;\n    border: 1px solid rgba(148, 163, 184, 0.3);\n    color: rgba(60, 60, 67, 0.8);\n    font-weight: 600;\n    border-radius: 10px;\n    padding: 0.7rem 1.25rem;\n    transition: all 0.2s ease;\n\n    &:hover:not(:disabled) {\n      background: rgba(255, 255, 255, 0.8);\n      border-color: rgba(148, 163, 184, 0.5);\n    }\n  }\n}\n\n\n\n\n\n@media (max-width: 640px) {\n  .form-header[_ngcontent-%COMP%] {\n    padding: 1rem 1.25rem;\n  }\n\n  .header-meta[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: flex-start;\n  }\n\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n\n    button {\n      width: 100%;\n    }\n  }\n\n  .password-field[_ngcontent-%COMP%] {\n    flex-direction: column;\n\n    .btn-generate {\n      width: 100%;\n      justify-content: center;\n    }\n  }\n\n  .status-control-card[_ngcontent-%COMP%] {\n    flex-wrap: wrap;\n  }\n\n  .status-control-toggle[_ngcontent-%COMP%] {\n    width: 100%;\n    display: flex;\n    justify-content: flex-end;\n    padding-top: 0.5rem;\n    border-top: 1px solid rgba(148, 163, 184, 0.1);\n    margin-top: 0.5rem;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InviteUserPage, [{
        type: Component,
        args: [{ selector: 'app-invite-user-page', standalone: true, imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    RouterLink,
                    ButtonModule,
                    InputTextModule,
                    InputGroupModule,
                    InputGroupAddonModule,
                    SelectModule,
                    MultiSelectModule,
                    ToggleSwitchModule,
                    BreadcrumbsComponent
                ], template: "<section class=\"invite-page\">\n  <div class=\"form-header\">\n    <div class=\"header-content\">\n      <app-breadcrumbs></app-breadcrumbs>\n\n      <button type=\"button\" class=\"back-link\" routerLink=\"/app/settings/users\">\n        <i class=\"pi pi-arrow-left\"></i>\n        Back to Users\n      </button>\n\n      <div class=\"header-row\">\n        <div class=\"header-title\">\n          <h1 class=\"hero-title\">\n            <span class=\"title-gradient\">Invite</span>\n            <span class=\"title-light\">Teammate</span>\n          </h1>\n          <p class=\"header-subtitle\">\n            Add new team members with personalized access and roles.\n          </p>\n        </div>\n        <div class=\"header-meta\">\n          <span class=\"meta-chip\">\n            <i class=\"pi pi-send\"></i>\n            New Invitation\n          </span>\n          <span *ngIf=\"status() as banner\" class=\"status-pill\" [ngClass]=\"'status-pill--' + banner.tone\">\n            {{ banner.message }}\n          </span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"form-body\">\n    <article class=\"form-card\">\n      <h3 class=\"section-title\">\n        <i class=\"pi pi-user-plus\"></i>\n        User Details\n      </h3>\n\n      <form [formGroup]=\"form\" (ngSubmit)=\"handleSubmit()\" class=\"form-layout\">\n        <div class=\"form-grid\">\n          <div class=\"form-field\">\n            <label for=\"iu-fullName\">Full name <span class=\"required\">*</span></label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--name\">\n                <i class=\"pi pi-user\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"iu-fullName\" formControlName=\"fullName\" placeholder=\"Jordan Patel\" />\n            </p-inputgroup>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"iu-email\">Email <span class=\"required\">*</span></label>\n            <p-inputgroup>\n              <p-inputgroup-addon class=\"icon-addon icon-addon--email\">\n                <i class=\"pi pi-envelope\"></i>\n              </p-inputgroup-addon>\n              <input pInputText id=\"iu-email\" formControlName=\"email\" placeholder=\"user@example.com\" />\n            </p-inputgroup>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"iu-timeZone\">Time zone <span class=\"required\">*</span></label>\n            <p-select\n              inputId=\"iu-timeZone\"\n              formControlName=\"timeZone\"\n              [options]=\"timezoneOptions\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              appendTo=\"body\"\n              styleClass=\"w-full\"\n              [filter]=\"true\"\n              filterBy=\"label\"\n              filterPlaceholder=\"Search time zones\"\n            >\n              <ng-template pTemplate=\"item\" let-option>\n                <div class=\"timezone-option\">\n                  <img\n                    class=\"timezone-flag\"\n                    [src]=\"getFlagUrl(option?.flagCode)\"\n                    [alt]=\"option?.flagCode ? option.flagCode.toUpperCase() + ' flag' : 'Flag'\"\n                    width=\"18\"\n                    height=\"12\"\n                    loading=\"lazy\"\n                  />\n                  <span>{{ option.label }}</span>\n                </div>\n              </ng-template>\n              <ng-template pTemplate=\"selectedItem\" let-option>\n                <div class=\"timezone-option\">\n                  <img\n                    class=\"timezone-flag\"\n                    [src]=\"getFlagUrl(option?.flagCode)\"\n                    [alt]=\"option?.flagCode ? option.flagCode.toUpperCase() + ' flag' : 'Flag'\"\n                    width=\"18\"\n                    height=\"12\"\n                    loading=\"lazy\"\n                  />\n                  <span>{{ option?.label }}</span>\n                </div>\n              </ng-template>\n            </p-select>\n          </div>\n          <div class=\"form-field\">\n            <label for=\"iu-locale\">Locale <span class=\"required\">*</span></label>\n            <p-select\n              inputId=\"iu-locale\"\n              formControlName=\"locale\"\n              [options]=\"localeOptions\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              appendTo=\"body\"\n              styleClass=\"w-full\"\n            ></p-select>\n          </div>\n          <div class=\"form-field full-row\">\n            <label for=\"iu-roles\">Roles</label>\n            <p-multiSelect\n              inputId=\"iu-roles\"\n              formControlName=\"roleIds\"\n              [options]=\"rolesAsOptions()\"\n              optionLabel=\"label\"\n              optionValue=\"value\"\n              display=\"chip\"\n              appendTo=\"body\"\n              defaultLabel=\"Select roles\"\n              styleClass=\"w-full\"\n            ></p-multiSelect>\n          </div>\n          <div class=\"form-field full-row\">\n            <label for=\"iu-temporaryPassword\">Temporary password</label>\n            <div class=\"password-field\">\n              <p-inputgroup>\n                <p-inputgroup-addon class=\"icon-addon icon-addon--warning\">\n                  <i class=\"pi pi-lock\"></i>\n                </p-inputgroup-addon>\n                <input\n                  pInputText\n                  id=\"iu-temporaryPassword\"\n                  type=\"text\"\n                  formControlName=\"temporaryPassword\"\n                  placeholder=\"Optional\"\n                />\n              </p-inputgroup>\n              <button type=\"button\" class=\"btn-generate\" [disabled]=\"!canManageAdmin()\" (click)=\"generatePassword()\">\n                <i class=\"pi pi-sync\"></i>\n                Generate\n              </button>\n            </div>\n            <small *ngIf=\"generatedPassword()\">Share once, then require reset on first login.</small>\n          </div>\n        </div>\n\n        <!-- Status Control Card -->\n        <div class=\"status-control-card\" [class.status-control-card--active]=\"form.value.isActive\" [class.status-control-card--inactive]=\"!form.value.isActive\">\n          <div class=\"status-control-icon\" [class.status-control-icon--active]=\"form.value.isActive\">\n            <i class=\"pi\" [class.pi-check-circle]=\"form.value.isActive\" [class.pi-ban]=\"!form.value.isActive\"></i>\n          </div>\n          <div class=\"status-control-content\">\n            <span class=\"status-control-label\">Account Status</span>\n            <strong class=\"status-control-value\">{{ form.value.isActive ? 'Active' : 'Inactive' }}</strong>\n            <span class=\"status-control-hint\">{{ form.value.isActive ? 'User can access the system immediately' : 'User access is disabled' }}</span>\n          </div>\n          <div class=\"status-control-toggle\">\n            <p-toggleSwitch formControlName=\"isActive\"></p-toggleSwitch>\n          </div>\n        </div>\n\n        <div class=\"form-actions\">\n          <button type=\"button\" pButton label=\"Cancel\" class=\"crm-button--ghost\" routerLink=\"/app/settings/users\"></button>\n          <button\n            type=\"submit\"\n            pButton\n            label=\"Send Invite\"\n            icon=\"pi pi-send\"\n            class=\"crm-button--primary\"\n            [disabled]=\"!!inviteDisabledReason()\"\n            (click)=\"handleInviteClick($event)\"\n          ></button>\n        </div>\n      </form>\n    </article>\n  </div>\n</section>\n", styles: ["/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n   INVITE USER PAGE - Premium Light UI\n   Following the global design system\n   \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   ANIMATIONS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@keyframes fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   PAGE CONTAINER\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.invite-page {\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   FORM HEADER\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.form-header {\n  padding: 1.5rem 2rem;\n  background: rgba(255, 255, 255, 0.85);\n  border-bottom: 1px solid rgba(148, 163, 184, 0.15);\n  animation: fade-in-up 0.4s ease-out;\n}\n\n.header-content {\n  max-width: 1400px;\n  margin: 0 auto;\n}\n\n.back-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0;\n  margin-bottom: 1rem;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: rgba(60, 60, 67, 0.7);\n  background: none;\n  border: none;\n  cursor: pointer;\n  transition: color 0.2s ease;\n\n  i {\n    font-size: 0.75rem;\n  }\n\n  &:hover {\n    color: #7c3aed;\n  }\n}\n\n.header-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 1.5rem;\n  flex-wrap: wrap;\n}\n\n.header-title {\n  h1 {\n    margin: 0 0 0.5rem;\n  }\n\n  p {\n    font-size: 0.95rem;\n    color: rgba(60, 60, 67, 0.7);\n    margin: 0;\n    max-width: 480px;\n  }\n}\n\n.header-meta {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n\n.meta-chip {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.9rem;\n  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(14, 165, 233, 0.08) 100%);\n  border: 1px solid rgba(139, 92, 246, 0.15);\n  border-radius: 999px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: #7c3aed;\n\n  i {\n    font-size: 0.75rem;\n  }\n}\n\n.status-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  padding: 0.4rem 0.85rem;\n  border-radius: 999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n\n  &--success {\n    background: rgba(16, 185, 129, 0.12);\n    color: #047857;\n  }\n\n  &--error {\n    background: rgba(239, 68, 68, 0.12);\n    color: #b91c1c;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   FORM BODY\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.form-body {\n  flex: 1;\n  padding: 2rem;\n  animation: fade-in-up 0.4s ease-out 0.1s both;\n\n  @media (max-width: 768px) {\n    padding: 1rem;\n  }\n}\n\n.form-card {\n  max-width: 800px;\n  margin: 0 auto;\n  background: rgba(255, 255, 255, 0.9);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 20px;\n  padding: 2rem;\n  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.04);\n\n  @media (max-width: 768px) {\n    padding: 1.25rem;\n    border-radius: 16px;\n  }\n}\n\n.section-title {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n  margin: 0 0 1.5rem;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.15);\n\n  i {\n    width: 36px;\n    height: 36px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background: linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(14, 165, 233, 0.08) 100%);\n    border-radius: 10px;\n    font-size: 0.95rem;\n    color: #7c3aed;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   FORM LAYOUT\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.form-layout {\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\n\n.form-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 1.25rem;\n\n  @media (max-width: 640px) {\n    grid-template-columns: 1fr;\n  }\n}\n\n.form-field {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 0.75rem;\n  padding: 0.35rem 0.45rem 0.45rem;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.35);\n  border: 1px solid transparent;\n  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;\n\n  > label {\n    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;\n    font-size: 0.8125rem;\n    font-weight: 600;\n    color: #475569;\n    letter-spacing: 0.01em;\n    white-space: nowrap;\n    min-width: 110px;\n    flex-shrink: 0;\n    text-align: right;\n    transition: color 0.2s ease;\n\n    .required {\n      color: #ef4444;\n      margin-left: 2px;\n    }\n  }\n\n  > p-inputgroup,\n  > p-select,\n  > p-multiselect,\n  > p-inputnumber,\n  > p-datepicker,\n  > input,\n  > textarea,\n  > .password-field,\n  > .form-field__input {\n    flex: 1;\n    min-width: 0;\n  }\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(148, 163, 184, 0.16);\n    > label { color: #334155; }\n  }\n\n  &:focus-within {\n    background: rgba(255, 255, 255, 0.72);\n    border-color: rgba(var(--apple-blue), 0.22);\n    box-shadow: 0 4px 14px rgba(var(--apple-blue), 0.07);\n    > label { color: #4f46e5; }\n  }\n\n  &.full-row {\n    grid-column: 1 / -1;\n    flex-direction: column;\n    align-items: stretch;\n    > label { text-align: left; min-width: unset; }\n  }\n\n  small {\n    font-size: 0.75rem;\n    color: rgba(60, 60, 67, 0.6);\n    margin-top: 0.25rem;\n  }\n}\n\n.password-field {\n  display: flex;\n  gap: 0.75rem;\n\n  input {\n    flex: 1;\n  }\n}\n\n/* Align time zone flags with labels in the shared selector. */\n:host ::ng-deep .timezone-option {\n  display: flex;\n  align-items: center;\n  gap: 0.6rem;\n}\n\n:host ::ng-deep .timezone-flag {\n  width: 18px;\n  height: 12px;\n  border-radius: 2px;\n  object-fit: cover;\n  background: #e2e8f0;\n  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.1);\n}\n\n.btn-generate {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.65rem 1.15rem;\n  font-size: 0.875rem;\n  font-weight: 600;\n  border-radius: 10px;\n  border: none;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  white-space: nowrap;\n  background: linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%);\n  color: #fff;\n\n  i {\n    font-size: 0.85rem;\n  }\n\n  &:hover:not(:disabled) {\n    transform: translateY(-1px);\n    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.35);\n  }\n\n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   STATUS CONTROL CARD\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.status-control-card {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1rem 1.25rem;\n  background: rgba(248, 250, 252, 0.8);\n  border: 1px solid rgba(148, 163, 184, 0.2);\n  border-radius: 14px;\n  margin-top: 0.5rem;\n  transition: all 0.25s ease;\n\n  &--active {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(34, 197, 94, 0.05) 100%);\n    border-color: rgba(16, 185, 129, 0.2);\n  }\n\n  &--inactive {\n    background: linear-gradient(135deg, rgba(239, 68, 68, 0.06) 0%, rgba(248, 113, 113, 0.04) 100%);\n    border-color: rgba(239, 68, 68, 0.15);\n  }\n}\n\n.status-control-icon {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(148, 163, 184, 0.12);\n  border-radius: 12px;\n  flex-shrink: 0;\n  transition: all 0.25s ease;\n\n  i {\n    font-size: 1.1rem;\n    color: rgba(60, 60, 67, 0.5);\n    transition: all 0.25s ease;\n  }\n\n  &--active {\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(34, 197, 94, 0.12) 100%);\n\n    i {\n      color: #059669;\n    }\n  }\n}\n\n.status-control-card--inactive .status-control-icon {\n  background: linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(248, 113, 113, 0.08) 100%);\n\n  i {\n    color: #dc2626;\n  }\n}\n\n.status-control-content {\n  display: flex;\n  flex-direction: column;\n  gap: 0.1rem;\n  flex: 1;\n  min-width: 0;\n}\n\n.status-control-label {\n  font-size: 0.72rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: rgba(60, 60, 67, 0.5);\n}\n\n.status-control-value {\n  font-size: 1rem;\n  font-weight: 600;\n  color: rgba(15, 23, 42, 0.9);\n}\n\n.status-control-card--active .status-control-value {\n  color: #047857;\n}\n\n.status-control-card--inactive .status-control-value {\n  color: #b91c1c;\n}\n\n.status-control-hint {\n  font-size: 0.75rem;\n  color: rgba(60, 60, 67, 0.55);\n}\n\n.status-control-toggle {\n  flex-shrink: 0;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   FORM ACTIONS\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid rgba(148, 163, 184, 0.12);\n  margin-top: 0.5rem;\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   PRIMENG OVERRIDES\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n:host ::ng-deep {\n  .p-select,\n  .p-multiselect {\n    width: 100%;\n\n    .p-select-label,\n    .p-multiselect-label {\n      padding: 0.7rem 0.9rem;\n      border-radius: 10px;\n      font-size: 0.875rem;\n    }\n  }\n\n  .p-select:not(.p-disabled).p-focus,\n  .p-multiselect:not(.p-disabled).p-focus {\n    border-color: rgba(139, 92, 246, 0.5);\n    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);\n  }\n\n  .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {\n    background: linear-gradient(135deg, #10b981 0%, #34d399 100%);\n  }\n\n  .crm-button--primary {\n    background: linear-gradient(135deg, #8b5cf6 0%, #0ea5e9 100%);\n    border: none;\n    font-weight: 600;\n    border-radius: 10px;\n    padding: 0.7rem 1.25rem;\n    transition: all 0.2s ease;\n\n    &:hover:not(:disabled) {\n      transform: translateY(-1px);\n      box-shadow: 0 6px 20px rgba(139, 92, 246, 0.35);\n    }\n\n    &:disabled {\n      opacity: 0.5;\n    }\n  }\n\n  .crm-button--ghost {\n    background: transparent;\n    border: 1px solid rgba(148, 163, 184, 0.3);\n    color: rgba(60, 60, 67, 0.8);\n    font-weight: 600;\n    border-radius: 10px;\n    padding: 0.7rem 1.25rem;\n    transition: all 0.2s ease;\n\n    &:hover:not(:disabled) {\n      background: rgba(255, 255, 255, 0.8);\n      border-color: rgba(148, 163, 184, 0.5);\n    }\n  }\n}\n\n/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n   RESPONSIVE\n   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500*/\n@media (max-width: 640px) {\n  .form-header {\n    padding: 1rem 1.25rem;\n  }\n\n  .header-meta {\n    width: 100%;\n    justify-content: flex-start;\n  }\n\n  .form-actions {\n    flex-direction: column-reverse;\n\n    button {\n      width: 100%;\n    }\n  }\n\n  .password-field {\n    flex-direction: column;\n\n    .btn-generate {\n      width: 100%;\n      justify-content: center;\n    }\n  }\n\n  .status-control-card {\n    flex-wrap: wrap;\n  }\n\n  .status-control-toggle {\n    width: 100%;\n    display: flex;\n    justify-content: flex-end;\n    padding-top: 0.5rem;\n    border-top: 1px solid rgba(148, 163, 184, 0.1);\n    margin-top: 0.5rem;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(InviteUserPage, { className: "InviteUserPage", filePath: "src/app/crm/features/settings/pages/invite-user.page.ts", lineNumber: 40 }); })();
