import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { NotificationService } from '../../../../core/notifications';
import { NotificationPreferencesService } from '../../../../shared/services/notification-preferences.service';
import { AppToastService } from '../../../../core/app-toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "primeng/inputgroup";
import * as i4 from "primeng/inputgroupaddon";
import * as i5 from "primeng/toggleswitch";
import * as i6 from "primeng/button";
import * as i7 from "primeng/inputtext";
const _c0 = () => ({ standalone: true });
function NotificationsPage_div_31_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 28)(1, "div", 22)(2, "div", 23);
    i0.ɵɵelement(3, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "div", 24);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 25);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "p-toggleSwitch", 26);
    i0.ɵɵlistener("ngModelChange", function NotificationsPage_div_31_Template_p_toggleSwitch_ngModelChange_9_listener($event) { const option_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setPreference("inApp", option_r2.key, $event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(option_r2.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r2.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r2.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r2.getPreference("inApp", option_r2.key))("ngModelOptions", i0.ɵɵpureFunction0(6, _c0));
} }
function NotificationsPage_div_144_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 28)(1, "div", 22)(2, "div", 23);
    i0.ɵɵelement(3, "i");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "div", 24);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 25);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "p-toggleSwitch", 26);
    i0.ɵɵlistener("ngModelChange", function NotificationsPage_div_144_Template_p_toggleSwitch_ngModelChange_9_listener($event) { const option_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.setPreference("email", option_r5.key, $event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r5 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵclassMap(option_r5.icon);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(option_r5.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r5.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngModel", ctx_r2.getPreference("email", option_r5.key))("ngModelOptions", i0.ɵɵpureFunction0(6, _c0));
} }
function NotificationsPage_p_145_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 42);
    i0.ɵɵtext(1, " Email notifications are currently disabled. Toggle the switches to enable delivery. ");
    i0.ɵɵelementEnd();
} }
export class NotificationsPage {
    notificationService = inject(NotificationService);
    preferencesApi = inject(NotificationPreferencesService);
    toastService = inject(AppToastService);
    preferences = this.notificationService.preferences;
    options = [
        { key: 'success', label: 'Success', description: 'Saved, completed, or success updates.', icon: 'pi pi-check-circle' },
        { key: 'error', label: 'Errors', description: 'Failures, blocked actions, or validation errors.', icon: 'pi pi-exclamation-circle' },
        { key: 'warning', label: 'Warnings', description: 'At-risk deals or important attention items.', icon: 'pi pi-exclamation-triangle' },
        { key: 'info', label: 'Info', description: 'Informational nudges and helpful updates.', icon: 'pi pi-info-circle' }
    ];
    emailDisabled = computed(() => Object.values(this.preferences().email).every((value) => !value), ...(ngDevMode ? [{ debugName: "emailDisabled" }] : []));
    ngOnInit() {
        this.preferencesApi.getPreferences().subscribe({
            next: (prefs) => this.notificationService.setPreferences(prefs),
            error: () => {
                this.toastService.show('error', 'Unable to load notification preferences.', 3000);
            }
        });
    }
    toggle(channel, type, enabled) {
        const resolved = this.resolveToggleValue(enabled);
        this.notificationService.updatePreference(channel, type, resolved);
        this.syncPreferences();
    }
    toggleAlertsEnabled(enabled) {
        const current = this.preferences();
        const resolved = this.resolveToggleValue(enabled);
        this.notificationService.setPreferences({ ...current, alertsEnabled: resolved });
        this.syncPreferences();
    }
    toggleEmailAlert(key, enabled) {
        const current = this.preferences();
        const resolved = this.resolveToggleValue(enabled);
        this.notificationService.setPreferences({
            ...current,
            emailAlerts: {
                ...current.emailAlerts,
                [key]: resolved
            }
        });
        this.syncPreferences();
    }
    updateEmailAlertValue(key, value) {
        const current = this.preferences();
        const parsed = typeof value === 'number' ? value : Number(value);
        const nextValue = Number.isFinite(parsed) ? Math.max(1, parsed) : 1;
        this.notificationService.setPreferences({
            ...current,
            emailAlerts: {
                ...current.emailAlerts,
                [key]: nextValue
            }
        });
        this.syncPreferences();
    }
    getPreference(channel, type) {
        return this.preferences()[channel][type];
    }
    setPreference(channel, type, enabled) {
        this.toggle(channel, type, enabled);
    }
    get alertsEnabled() {
        return this.preferences().alertsEnabled;
    }
    set alertsEnabled(value) {
        this.toggleAlertsEnabled(value);
    }
    resetPreferences() {
        this.notificationService.resetPreferences();
        this.syncPreferences();
    }
    syncPreferences() {
        const current = this.preferences();
        this.preferencesApi.updatePreferences(current).subscribe({
            next: (prefs) => this.notificationService.setPreferences(prefs),
            error: () => {
                this.toastService.show('error', 'Unable to save notification preferences.', 3000);
            }
        });
    }
    resolveToggleValue(event) {
        if (typeof event === 'boolean') {
            return event;
        }
        if (event && typeof event === 'object' && typeof event.checked === 'boolean') {
            return event.checked;
        }
        return false;
    }
    static ɵfac = function NotificationsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NotificationsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NotificationsPage, selectors: [["app-notifications-page"]], decls: 146, vars: 33, consts: [[1, "page-background"], [1, "animated-orb", "orb-1"], [1, "animated-orb", "orb-2"], [1, "animated-orb", "orb-3"], [1, "page-hero"], [1, "hero-content"], [1, "hero-eyebrow"], [1, "pi", "pi-bell"], [1, "hero-title"], [1, "title-gradient"], [1, "title-light"], [1, "hero-subtitle"], [1, "hero-actions"], ["pButton", "", "type", "button", 1, "crm-button", "crm-button--ghost", 3, "click"], [1, "preferences-grid"], [1, "glass-card", "preference-panel"], [1, "panel-header"], [1, "panel-eyebrow"], [1, "panel-pill"], [1, "panel-body"], ["class", "preference-row", 4, "ngFor", "ngForOf"], [1, "preference-row", "preference-row--compact"], [1, "preference-info"], [1, "preference-icon"], [1, "preference-title"], [1, "preference-subtitle"], [3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "preference-divider"], [1, "preference-row"], [1, "pi", "pi-stopwatch"], [1, "pi", "pi-clock"], [1, "pi", "pi-list-check"], [3, "ngModelChange", "ngModel", "disabled", "ngModelOptions"], [1, "pi", "pi-hourglass"], [1, "pi", "pi-flag"], [1, "pi", "pi-calendar"], [1, "icon-addon", "icon-addon--warning"], ["pInputText", "", "type", "number", "min", "1", 3, "ngModelChange", "ngModel", "disabled", "ngModelOptions"], [1, "pi", "pi-refresh"], [1, "icon-addon", "icon-addon--info"], ["pInputText", "", "type", "number", "min", "1", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["class", "panel-note", 4, "ngIf"], [1, "panel-note"]], template: function NotificationsPage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0);
            i0.ɵɵelement(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "app-breadcrumbs");
            i0.ɵɵelementStart(5, "header", 4)(6, "div", 5)(7, "span", 6);
            i0.ɵɵelement(8, "i", 7);
            i0.ɵɵtext(9, " Notifications ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "h1", 8)(11, "span", 9);
            i0.ɵɵtext(12, "Notification");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "span", 10);
            i0.ɵɵtext(14, "Preferences");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "p", 11);
            i0.ɵɵtext(16, " Tune your alerts so the team gets the right signal at the right time. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(17, "div", 12)(18, "button", 13);
            i0.ɵɵlistener("click", function NotificationsPage_Template_button_click_18_listener() { return ctx.resetPreferences(); });
            i0.ɵɵtext(19, " Reset defaults ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "div", 14)(21, "div", 15)(22, "div", 16)(23, "div")(24, "span", 17);
            i0.ɵɵtext(25, "In-app alerts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "h2");
            i0.ɵɵtext(27, "Inbox + toast notifications");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "span", 18);
            i0.ɵɵtext(29, "Live");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 19);
            i0.ɵɵtemplate(31, NotificationsPage_div_31_Template, 10, 7, "div", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "div", 15)(33, "div", 16)(34, "div")(35, "span", 17);
            i0.ɵɵtext(36, "Email alerts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "h2");
            i0.ɵɵtext(38, "Email notifications");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "span", 18);
            i0.ɵɵtext(40, "Live");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "div", 19)(42, "div", 21)(43, "div", 22)(44, "div", 23);
            i0.ɵɵelement(45, "i", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div")(47, "div", 24);
            i0.ɵɵtext(48, "SLA + idle deal alerts");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "div", 25);
            i0.ɵɵtext(50, "Enable escalation emails for SLA breaches, idle deals, and coaching overdue tasks.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(51, "p-toggleSwitch", 26);
            i0.ɵɵlistener("ngModelChange", function NotificationsPage_Template_p_toggleSwitch_ngModelChange_51_listener($event) { return ctx.toggleAlertsEnabled($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(52, "div", 27);
            i0.ɵɵelementStart(53, "div", 28)(54, "div", 22)(55, "div", 23);
            i0.ɵɵelement(56, "i", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "div")(58, "div", 24);
            i0.ɵɵtext(59, "Lead SLA breach");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "div", 25);
            i0.ɵɵtext(61, "Email when first-touch SLA is missed.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(62, "p-toggleSwitch", 26);
            i0.ɵɵlistener("ngModelChange", function NotificationsPage_Template_p_toggleSwitch_ngModelChange_62_listener($event) { return ctx.toggleEmailAlert("leadSla", $event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(63, "div", 28)(64, "div", 22)(65, "div", 23);
            i0.ɵɵelement(66, "i", 30);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "div")(68, "div", 24);
            i0.ɵɵtext(69, "Idle deal alert");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "div", 25);
            i0.ɵɵtext(71, "Email when opportunities are missing next steps or inactive beyond the threshold.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(72, "p-toggleSwitch", 26);
            i0.ɵɵlistener("ngModelChange", function NotificationsPage_Template_p_toggleSwitch_ngModelChange_72_listener($event) { return ctx.toggleEmailAlert("idleDeal", $event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(73, "div", 21)(74, "div", 22)(75, "div", 23);
            i0.ɵɵelement(76, "i", 31);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "div")(78, "div", 24);
            i0.ɵɵtext(79, "No next step");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "div", 25);
            i0.ɵɵtext(81, "Alert when an open opportunity has no next step scheduled.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(82, "p-toggleSwitch", 32);
            i0.ɵɵlistener("ngModelChange", function NotificationsPage_Template_p_toggleSwitch_ngModelChange_82_listener($event) { return ctx.toggleEmailAlert("idleDealNoNextStep", $event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(83, "div", 21)(84, "div", 22)(85, "div", 23);
            i0.ɵɵelement(86, "i", 33);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(87, "div")(88, "div", 24);
            i0.ɵɵtext(89, "No activity threshold");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "div", 25);
            i0.ɵɵtext(91, "Alert when there is no activity for the selected number of days.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(92, "p-toggleSwitch", 32);
            i0.ɵɵlistener("ngModelChange", function NotificationsPage_Template_p_toggleSwitch_ngModelChange_92_listener($event) { return ctx.toggleEmailAlert("idleDealNoActivity", $event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(93, "div", 28)(94, "div", 22)(95, "div", 23);
            i0.ɵɵelement(96, "i", 34);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "div")(98, "div", 24);
            i0.ɵɵtext(99, "Coaching escalation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(100, "div", 25);
            i0.ɵɵtext(101, "Email managers when coaching tasks are overdue.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(102, "p-toggleSwitch", 26);
            i0.ɵɵlistener("ngModelChange", function NotificationsPage_Template_p_toggleSwitch_ngModelChange_102_listener($event) { return ctx.toggleEmailAlert("coachingEscalation", $event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelement(103, "div", 27);
            i0.ɵɵelementStart(104, "div", 28)(105, "div", 22)(106, "div", 23);
            i0.ɵɵelement(107, "i", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(108, "div")(109, "div", 24);
            i0.ɵɵtext(110, "No-activity threshold (days)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(111, "div", 25);
            i0.ɵɵtext(112, "Number of inactive days before alerting.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(113, "p-inputgroup")(114, "p-inputgroup-addon", 36);
            i0.ɵɵelement(115, "i", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(116, "input", 37);
            i0.ɵɵlistener("ngModelChange", function NotificationsPage_Template_input_ngModelChange_116_listener($event) { return ctx.updateEmailAlertValue("idleDealDays", $event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(117, "div", 28)(118, "div", 22)(119, "div", 23);
            i0.ɵɵelement(120, "i", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(121, "div")(122, "div", 24);
            i0.ɵɵtext(123, "Idle deal cooldown (days)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(124, "div", 25);
            i0.ɵɵtext(125, "Minimum days between repeated alerts.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(126, "p-inputgroup")(127, "p-inputgroup-addon", 39);
            i0.ɵɵelement(128, "i", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(129, "input", 40);
            i0.ɵɵlistener("ngModelChange", function NotificationsPage_Template_input_ngModelChange_129_listener($event) { return ctx.updateEmailAlertValue("idleDealCooldownDays", $event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(130, "div", 28)(131, "div", 22)(132, "div", 23);
            i0.ɵɵelement(133, "i", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(134, "div")(135, "div", 24);
            i0.ɵɵtext(136, "Coaching cooldown (days)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(137, "div", 25);
            i0.ɵɵtext(138, "Minimum days between coaching escalation emails.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(139, "p-inputgroup")(140, "p-inputgroup-addon", 39);
            i0.ɵɵelement(141, "i", 38);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(142, "input", 40);
            i0.ɵɵlistener("ngModelChange", function NotificationsPage_Template_input_ngModelChange_142_listener($event) { return ctx.updateEmailAlertValue("coachingEscalationCooldownDays", $event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(143, "div", 27);
            i0.ɵɵtemplate(144, NotificationsPage_div_144_Template, 10, 7, "div", 20)(145, NotificationsPage_p_145_Template, 2, 0, "p", 41);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(31);
            i0.ɵɵproperty("ngForOf", ctx.options);
            i0.ɵɵadvance(20);
            i0.ɵɵproperty("ngModel", ctx.alertsEnabled)("ngModelOptions", i0.ɵɵpureFunction0(24, _c0));
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngModel", ctx.preferences().emailAlerts.leadSla)("ngModelOptions", i0.ɵɵpureFunction0(25, _c0));
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngModel", ctx.preferences().emailAlerts.idleDeal)("ngModelOptions", i0.ɵɵpureFunction0(26, _c0));
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngModel", ctx.preferences().emailAlerts.idleDealNoNextStep)("disabled", !ctx.alertsEnabled || !ctx.preferences().emailAlerts.idleDeal)("ngModelOptions", i0.ɵɵpureFunction0(27, _c0));
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngModel", ctx.preferences().emailAlerts.idleDealNoActivity)("disabled", !ctx.alertsEnabled || !ctx.preferences().emailAlerts.idleDeal)("ngModelOptions", i0.ɵɵpureFunction0(28, _c0));
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngModel", ctx.preferences().emailAlerts.coachingEscalation)("ngModelOptions", i0.ɵɵpureFunction0(29, _c0));
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngModel", ctx.preferences().emailAlerts.idleDealDays)("disabled", !ctx.alertsEnabled || !ctx.preferences().emailAlerts.idleDeal || !ctx.preferences().emailAlerts.idleDealNoActivity)("ngModelOptions", i0.ɵɵpureFunction0(30, _c0));
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("ngModel", ctx.preferences().emailAlerts.idleDealCooldownDays)("ngModelOptions", i0.ɵɵpureFunction0(31, _c0));
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("ngModel", ctx.preferences().emailAlerts.coachingEscalationCooldownDays)("ngModelOptions", i0.ɵɵpureFunction0(32, _c0));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", ctx.options);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.emailDisabled());
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, FormsModule, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.NgControlStatus, i2.MinValidator, i2.NgModel, InputGroupModule, i3.InputGroup, InputGroupAddonModule, i4.InputGroupAddon, ToggleSwitchModule, i5.ToggleSwitch, ButtonModule, i6.ButtonDirective, InputTextModule, i7.InputText, BreadcrumbsComponent], styles: ["@use '../../../../../styles/design-tokens' as *;\n\n.page-background[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-6;\n  overflow: hidden;\n}\n\n.animated-orb[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  pointer-events: none;\n  z-index: 0;\n  animation: _ngcontent-%COMP%_orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 360px;\n    height: 360px;\n    background: $cyan-gradient;\n    top: -120px;\n    right: -80px;\n    animation-delay: 0s;\n  }\n\n  &.orb-2 {\n    width: 320px;\n    height: 320px;\n    background: $primary-gradient;\n    bottom: 12%;\n    left: -80px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 260px;\n    height: 260px;\n    background: $purple-gradient;\n    top: 55%;\n    right: 12%;\n    animation-delay: -14s;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(-20px, 20px) scale(0.95); }\n  75% { transform: translate(25px, 10px) scale(1.02); }\n}\n\n.page-hero[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: $space-6;\n  padding: $space-6;\n  margin-bottom: $space-6;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  animation: _ngcontent-%COMP%_fade-in-down 0.6s ease-out;\n}\n\n@keyframes _ngcontent-%COMP%_fade-in-down {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.hero-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.hero-eyebrow[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: $primary;\n  margin-bottom: $space-2;\n}\n\n.hero-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n\n.preferences-grid[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-6;\n}\n\n.glass-card.preference-panel[_ngcontent-%COMP%] {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  padding: $space-6;\n  box-shadow: $glass-shadow;\n\n  &.muted {\n    opacity: 0.85;\n  }\n}\n\n.panel-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: $space-5;\n\n  h2 {\n    margin: $space-2 0 0;\n    font-size: $font-size-xl;\n  }\n}\n\n.panel-eyebrow[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: $text-muted;\n}\n\n.panel-pill[_ngcontent-%COMP%] {\n  padding: $space-1 $space-3;\n  border-radius: $radius-full;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  background: rgba($success, 0.15);\n  color: $success;\n\n  &.muted {\n    background: rgba($warning, 0.15);\n    color: $warning;\n  }\n}\n\n.panel-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.preference-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-3;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background: rgba(white, 0.4);\n  border: 1px solid rgba($glass-border, 0.6);\n  position: relative;\n  z-index: 1;\n}\n\n.preference-row--compact[_ngcontent-%COMP%] {\n  padding: $space-2 $space-3;\n}\n\n[_nghost-%COMP%]     .preference-row .p-toggleswitch {\n  position: relative;\n  z-index: 2;\n  pointer-events: auto;\n}\n\n[_nghost-%COMP%]     .preference-row .p-toggleswitch * {\n  pointer-events: auto;\n}\n\n.preference-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  width: 100%;\n  background: rgba($glass-border, 0.6);\n}\n\n.preference-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.preference-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: $radius-lg;\n  display: grid;\n  place-items: center;\n  background: rgba($primary, 0.12);\n  color: $primary;\n\n  i {\n    font-size: 1.1rem;\n  }\n}\n\n.preference-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.preference-subtitle[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.panel-note[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  color: $text-muted;\n  margin: 0;\n  padding-top: $space-2;\n}\n\n@media (max-width: 1024px) {\n  .preferences-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NotificationsPage, [{
        type: Component,
        args: [{ selector: 'app-notifications-page', standalone: true, imports: [CommonModule, FormsModule, InputGroupModule, InputGroupAddonModule, ToggleSwitchModule, ButtonModule, InputTextModule, BreadcrumbsComponent], template: "<section class=\"page-background\">\n  <div class=\"animated-orb orb-1\"></div>\n  <div class=\"animated-orb orb-2\"></div>\n  <div class=\"animated-orb orb-3\"></div>\n\n  <app-breadcrumbs></app-breadcrumbs>\n\n  <header class=\"page-hero\">\n    <div class=\"hero-content\">\n      <span class=\"hero-eyebrow\">\n        <i class=\"pi pi-bell\"></i>\n        Notifications\n      </span>\n      <h1 class=\"hero-title\">\n        <span class=\"title-gradient\">Notification</span>\n        <span class=\"title-light\">Preferences</span>\n      </h1>\n      <p class=\"hero-subtitle\">\n        Tune your alerts so the team gets the right signal at the right time.\n      </p>\n    </div>\n    <div class=\"hero-actions\">\n      <button pButton type=\"button\" class=\"crm-button crm-button--ghost\" (click)=\"resetPreferences()\">\n        Reset defaults\n      </button>\n    </div>\n  </header>\n\n  <div class=\"preferences-grid\">\n    <div class=\"glass-card preference-panel\">\n      <div class=\"panel-header\">\n        <div>\n          <span class=\"panel-eyebrow\">In-app alerts</span>\n          <h2>Inbox + toast notifications</h2>\n        </div>\n        <span class=\"panel-pill\">Live</span>\n      </div>\n      <div class=\"panel-body\">\n        <div class=\"preference-row\" *ngFor=\"let option of options\">\n          <div class=\"preference-info\">\n            <div class=\"preference-icon\">\n              <i [class]=\"option.icon\"></i>\n            </div>\n            <div>\n              <div class=\"preference-title\">{{ option.label }}</div>\n              <div class=\"preference-subtitle\">{{ option.description }}</div>\n            </div>\n          </div>\n          <p-toggleSwitch\n            [ngModel]=\"getPreference('inApp', option.key)\"\n            (ngModelChange)=\"setPreference('inApp', option.key, $event)\"\n            [ngModelOptions]=\"{ standalone: true }\"\n          ></p-toggleSwitch>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"glass-card preference-panel\">\n      <div class=\"panel-header\">\n        <div>\n          <span class=\"panel-eyebrow\">Email alerts</span>\n          <h2>Email notifications</h2>\n        </div>\n        <span class=\"panel-pill\">Live</span>\n      </div>\n      <div class=\"panel-body\">\n        <div class=\"preference-row preference-row--compact\">\n          <div class=\"preference-info\">\n            <div class=\"preference-icon\">\n              <i class=\"pi pi-bell\"></i>\n            </div>\n            <div>\n              <div class=\"preference-title\">SLA + idle deal alerts</div>\n              <div class=\"preference-subtitle\">Enable escalation emails for SLA breaches, idle deals, and coaching overdue tasks.</div>\n            </div>\n          </div>\n          <p-toggleSwitch\n            [ngModel]=\"alertsEnabled\"\n            (ngModelChange)=\"toggleAlertsEnabled($event)\"\n            [ngModelOptions]=\"{ standalone: true }\"\n          ></p-toggleSwitch>\n        </div>\n        <div class=\"preference-divider\"></div>\n        <div class=\"preference-row\">\n          <div class=\"preference-info\">\n            <div class=\"preference-icon\">\n              <i class=\"pi pi-stopwatch\"></i>\n            </div>\n            <div>\n              <div class=\"preference-title\">Lead SLA breach</div>\n              <div class=\"preference-subtitle\">Email when first-touch SLA is missed.</div>\n            </div>\n          </div>\n          <p-toggleSwitch\n            [ngModel]=\"preferences().emailAlerts.leadSla\"\n            (ngModelChange)=\"toggleEmailAlert('leadSla', $event)\"\n            [ngModelOptions]=\"{ standalone: true }\"\n          ></p-toggleSwitch>\n        </div>\n        <div class=\"preference-row\">\n          <div class=\"preference-info\">\n            <div class=\"preference-icon\">\n              <i class=\"pi pi-clock\"></i>\n            </div>\n            <div>\n              <div class=\"preference-title\">Idle deal alert</div>\n              <div class=\"preference-subtitle\">Email when opportunities are missing next steps or inactive beyond the threshold.</div>\n            </div>\n          </div>\n          <p-toggleSwitch\n            [ngModel]=\"preferences().emailAlerts.idleDeal\"\n            (ngModelChange)=\"toggleEmailAlert('idleDeal', $event)\"\n            [ngModelOptions]=\"{ standalone: true }\"\n          ></p-toggleSwitch>\n        </div>\n        <div class=\"preference-row preference-row--compact\">\n          <div class=\"preference-info\">\n            <div class=\"preference-icon\">\n              <i class=\"pi pi-list-check\"></i>\n            </div>\n            <div>\n              <div class=\"preference-title\">No next step</div>\n              <div class=\"preference-subtitle\">Alert when an open opportunity has no next step scheduled.</div>\n            </div>\n          </div>\n          <p-toggleSwitch\n            [ngModel]=\"preferences().emailAlerts.idleDealNoNextStep\"\n            (ngModelChange)=\"toggleEmailAlert('idleDealNoNextStep', $event)\"\n            [disabled]=\"!alertsEnabled || !preferences().emailAlerts.idleDeal\"\n            [ngModelOptions]=\"{ standalone: true }\"\n          ></p-toggleSwitch>\n        </div>\n        <div class=\"preference-row preference-row--compact\">\n          <div class=\"preference-info\">\n            <div class=\"preference-icon\">\n              <i class=\"pi pi-hourglass\"></i>\n            </div>\n            <div>\n              <div class=\"preference-title\">No activity threshold</div>\n              <div class=\"preference-subtitle\">Alert when there is no activity for the selected number of days.</div>\n            </div>\n          </div>\n          <p-toggleSwitch\n            [ngModel]=\"preferences().emailAlerts.idleDealNoActivity\"\n            (ngModelChange)=\"toggleEmailAlert('idleDealNoActivity', $event)\"\n            [disabled]=\"!alertsEnabled || !preferences().emailAlerts.idleDeal\"\n            [ngModelOptions]=\"{ standalone: true }\"\n          ></p-toggleSwitch>\n        </div>\n        <div class=\"preference-row\">\n          <div class=\"preference-info\">\n            <div class=\"preference-icon\">\n              <i class=\"pi pi-flag\"></i>\n            </div>\n            <div>\n              <div class=\"preference-title\">Coaching escalation</div>\n              <div class=\"preference-subtitle\">Email managers when coaching tasks are overdue.</div>\n            </div>\n          </div>\n          <p-toggleSwitch\n            [ngModel]=\"preferences().emailAlerts.coachingEscalation\"\n            (ngModelChange)=\"toggleEmailAlert('coachingEscalation', $event)\"\n            [ngModelOptions]=\"{ standalone: true }\"\n          ></p-toggleSwitch>\n        </div>\n        <div class=\"preference-divider\"></div>\n        <div class=\"preference-row\">\n          <div class=\"preference-info\">\n            <div class=\"preference-icon\">\n              <i class=\"pi pi-calendar\"></i>\n            </div>\n            <div>\n              <div class=\"preference-title\">No-activity threshold (days)</div>\n              <div class=\"preference-subtitle\">Number of inactive days before alerting.</div>\n            </div>\n          </div>\n          <p-inputgroup>\n            <p-inputgroup-addon class=\"icon-addon icon-addon--warning\">\n              <i class=\"pi pi-calendar\"></i>\n            </p-inputgroup-addon>\n            <input\n              pInputText\n              type=\"number\"\n              min=\"1\"\n              [ngModel]=\"preferences().emailAlerts.idleDealDays\"\n              (ngModelChange)=\"updateEmailAlertValue('idleDealDays', $event)\"\n              [disabled]=\"!alertsEnabled || !preferences().emailAlerts.idleDeal || !preferences().emailAlerts.idleDealNoActivity\"\n              [ngModelOptions]=\"{ standalone: true }\"\n            />\n          </p-inputgroup>\n        </div>\n        <div class=\"preference-row\">\n          <div class=\"preference-info\">\n            <div class=\"preference-icon\">\n              <i class=\"pi pi-refresh\"></i>\n            </div>\n            <div>\n              <div class=\"preference-title\">Idle deal cooldown (days)</div>\n              <div class=\"preference-subtitle\">Minimum days between repeated alerts.</div>\n            </div>\n          </div>\n          <p-inputgroup>\n            <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n              <i class=\"pi pi-refresh\"></i>\n            </p-inputgroup-addon>\n            <input\n              pInputText\n              type=\"number\"\n              min=\"1\"\n              [ngModel]=\"preferences().emailAlerts.idleDealCooldownDays\"\n              (ngModelChange)=\"updateEmailAlertValue('idleDealCooldownDays', $event)\"\n              [ngModelOptions]=\"{ standalone: true }\"\n            />\n          </p-inputgroup>\n        </div>\n        <div class=\"preference-row\">\n          <div class=\"preference-info\">\n            <div class=\"preference-icon\">\n              <i class=\"pi pi-refresh\"></i>\n            </div>\n            <div>\n              <div class=\"preference-title\">Coaching cooldown (days)</div>\n              <div class=\"preference-subtitle\">Minimum days between coaching escalation emails.</div>\n            </div>\n          </div>\n          <p-inputgroup>\n            <p-inputgroup-addon class=\"icon-addon icon-addon--info\">\n              <i class=\"pi pi-refresh\"></i>\n            </p-inputgroup-addon>\n            <input\n              pInputText\n              type=\"number\"\n              min=\"1\"\n              [ngModel]=\"preferences().emailAlerts.coachingEscalationCooldownDays\"\n              (ngModelChange)=\"updateEmailAlertValue('coachingEscalationCooldownDays', $event)\"\n              [ngModelOptions]=\"{ standalone: true }\"\n            />\n          </p-inputgroup>\n        </div>\n        <div class=\"preference-divider\"></div>\n        <div class=\"preference-row\" *ngFor=\"let option of options\">\n          <div class=\"preference-info\">\n            <div class=\"preference-icon\">\n              <i [class]=\"option.icon\"></i>\n            </div>\n            <div>\n              <div class=\"preference-title\">{{ option.label }}</div>\n              <div class=\"preference-subtitle\">{{ option.description }}</div>\n            </div>\n          </div>\n          <p-toggleSwitch\n            [ngModel]=\"getPreference('email', option.key)\"\n            (ngModelChange)=\"setPreference('email', option.key, $event)\"\n            [ngModelOptions]=\"{ standalone: true }\"\n          ></p-toggleSwitch>\n        </div>\n        <p class=\"panel-note\" *ngIf=\"emailDisabled()\">\n          Email notifications are currently disabled. Toggle the switches to enable delivery.\n        </p>\n      </div>\n    </div>\n  </div>\n</section>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n\n.page-background {\n  position: relative;\n  min-height: 100vh;\n  padding: $space-6;\n  overflow: hidden;\n}\n\n.animated-orb {\n  position: absolute;\n  border-radius: 50%;\n  filter: blur(80px);\n  opacity: 0.5;\n  pointer-events: none;\n  z-index: 0;\n  animation: orb-float 20s ease-in-out infinite;\n\n  &.orb-1 {\n    width: 360px;\n    height: 360px;\n    background: $cyan-gradient;\n    top: -120px;\n    right: -80px;\n    animation-delay: 0s;\n  }\n\n  &.orb-2 {\n    width: 320px;\n    height: 320px;\n    background: $primary-gradient;\n    bottom: 12%;\n    left: -80px;\n    animation-delay: -7s;\n  }\n\n  &.orb-3 {\n    width: 260px;\n    height: 260px;\n    background: $purple-gradient;\n    top: 55%;\n    right: 12%;\n    animation-delay: -14s;\n  }\n}\n\n@keyframes orb-float {\n  0%, 100% { transform: translate(0, 0) scale(1); }\n  25% { transform: translate(30px, -30px) scale(1.05); }\n  50% { transform: translate(-20px, 20px) scale(0.95); }\n  75% { transform: translate(25px, 10px) scale(1.02); }\n}\n\n.page-hero {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: $space-6;\n  padding: $space-6;\n  margin-bottom: $space-6;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  animation: fade-in-down 0.6s ease-out;\n}\n\n@keyframes fade-in-down {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n.hero-content {\n  flex: 1;\n}\n\n.hero-eyebrow {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-2;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: $primary;\n  margin-bottom: $space-2;\n}\n\n.hero-actions {\n  display: flex;\n  align-items: center;\n}\n\n.preferences-grid {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: $space-6;\n}\n\n.glass-card.preference-panel {\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  border: 1px solid $glass-border;\n  border-radius: $radius-2xl;\n  padding: $space-6;\n  box-shadow: $glass-shadow;\n\n  &.muted {\n    opacity: 0.85;\n  }\n}\n\n.panel-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: $space-5;\n\n  h2 {\n    margin: $space-2 0 0;\n    font-size: $font-size-xl;\n  }\n}\n\n.panel-eyebrow {\n  font-size: $font-size-xs;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: $text-muted;\n}\n\n.panel-pill {\n  padding: $space-1 $space-3;\n  border-radius: $radius-full;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  background: rgba($success, 0.15);\n  color: $success;\n\n  &.muted {\n    background: rgba($warning, 0.15);\n    color: $warning;\n  }\n}\n\n.panel-body {\n  display: flex;\n  flex-direction: column;\n  gap: $space-4;\n}\n\n.preference-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-3;\n  padding: $space-3;\n  border-radius: $radius-lg;\n  background: rgba(white, 0.4);\n  border: 1px solid rgba($glass-border, 0.6);\n  position: relative;\n  z-index: 1;\n}\n\n.preference-row--compact {\n  padding: $space-2 $space-3;\n}\n\n:host ::ng-deep .preference-row .p-toggleswitch {\n  position: relative;\n  z-index: 2;\n  pointer-events: auto;\n}\n\n:host ::ng-deep .preference-row .p-toggleswitch * {\n  pointer-events: auto;\n}\n\n.preference-divider {\n  height: 1px;\n  width: 100%;\n  background: rgba($glass-border, 0.6);\n}\n\n.preference-info {\n  display: flex;\n  align-items: center;\n  gap: $space-3;\n}\n\n.preference-icon {\n  width: 40px;\n  height: 40px;\n  border-radius: $radius-lg;\n  display: grid;\n  place-items: center;\n  background: rgba($primary, 0.12);\n  color: $primary;\n\n  i {\n    font-size: 1.1rem;\n  }\n}\n\n.preference-title {\n  font-weight: 600;\n  color: $text-primary;\n}\n\n.preference-subtitle {\n  font-size: $font-size-sm;\n  color: $text-muted;\n}\n\n.panel-note {\n  font-size: $font-size-sm;\n  color: $text-muted;\n  margin: 0;\n  padding-top: $space-2;\n}\n\n@media (max-width: 1024px) {\n  .preferences-grid {\n    grid-template-columns: 1fr;\n  }\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NotificationsPage, { className: "NotificationsPage", filePath: "src/app/crm/features/settings/pages/notifications.page.ts", lineNumber: 29 }); })();
