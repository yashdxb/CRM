import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { TabsModule } from 'primeng/tabs';
import { AppToastService } from '../../../../core/app-toast.service';
import { UserAdminDataService } from '../services/user-admin-data.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/button";
import * as i3 from "primeng/checkbox";
import * as i4 from "primeng/select";
import * as i5 from "primeng/tabs";
const _c0 = a0 => ["/app/settings/roles", a0, "edit"];
const _c1 = () => ["/app/settings/roles"];
const _c2 = () => ({ standalone: true });
function PermissionsPage_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14)(1, "span", 15);
    i0.ɵɵelement(2, "i", 16);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 15);
    i0.ɵɵelement(5, "i", 17);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 15);
    i0.ɵɵelement(8, "i", 18);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 19);
    i0.ɵɵelement(11, "i", 20);
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const role_r2 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(role_r2.name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r2.selectedPermissionCount(), " selected");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r2.inheritedPermissions().length, " inherited");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", ctx_r2.driftSummary().added.length + ctx_r2.driftSummary().removed.length, " drift");
} }
function PermissionsPage_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtext(1, " Select a role to manage permissions. ");
    i0.ɵɵelementEnd();
} }
function PermissionsPage_div_17_ng_container_2_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function PermissionsPage_div_17_ng_container_2_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function PermissionsPage_div_17_ng_container_2_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function PermissionsPage_div_17_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "p-tabs", 26);
    i0.ɵɵlistener("valueChange", function PermissionsPage_div_17_ng_container_2_Template_p_tabs_valueChange_1_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.onActionTabChange($event)); });
    i0.ɵɵelementStart(2, "p-tablist")(3, "p-tab", 27);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p-tab", 28);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p-tab", 29);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "p-tabpanels")(10, "p-tabpanel", 27);
    i0.ɵɵtemplate(11, PermissionsPage_div_17_ng_container_2_ng_container_11_Template, 1, 0, "ng-container", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "p-tabpanel", 28);
    i0.ɵɵtemplate(13, PermissionsPage_div_17_ng_container_2_ng_container_13_Template, 1, 0, "ng-container", 30);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "p-tabpanel", 29);
    i0.ɵɵtemplate(15, PermissionsPage_div_17_ng_container_2_ng_container_15_Template, 1, 0, "ng-container", 30);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    const permissionGroups_r5 = i0.ɵɵreference(19);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.activeActionTab());
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("Create & Manage (", ctx_r2.actionTabCounts().createManage, ")");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("View & Analyze (", ctx_r2.actionTabCounts().viewAnalyze, ")");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Governance (", ctx_r2.actionTabCounts().governance, ")");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngTemplateOutlet", permissionGroups_r5);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", permissionGroups_r5);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", permissionGroups_r5);
} }
function PermissionsPage_div_17_aside_3_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "aside", 31)(1, "div", 32)(2, "h4");
    i0.ɵɵelement(3, "i", 33);
    i0.ɵɵtext(4, " Drift");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 34)(6, "div", 35)(7, "span", 36);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "span", 37);
    i0.ɵɵtext(10, "Added");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 38)(12, "span", 36);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 37);
    i0.ɵɵtext(15, "Removed");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(16, "button", 39);
    i0.ɵɵlistener("click", function PermissionsPage_div_17_aside_3_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.resetToBase()); });
    i0.ɵɵelementStart(17, "span", 40);
    i0.ɵɵelement(18, "i", 41);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20, "Reset to Base");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "div", 42)(22, "h4");
    i0.ɵɵelement(23, "i", 43);
    i0.ɵɵtext(24, " Quick Tips");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "ul", 44)(26, "li");
    i0.ɵɵtext(27, "Use the tabs above to browse permissions by action type.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "li");
    i0.ɵɵtext(29, "Inherited permissions are locked by the parent role hierarchy.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "li");
    i0.ɵɵtext(31, "Use ");
    i0.ɵɵelementStart(32, "strong");
    i0.ɵɵtext(33, "Drift");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(34, " tracking to audit changes from the base pack.");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.driftSummary().added.length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r2.driftSummary().removed.length);
} }
function PermissionsPage_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "div", 23);
    i0.ɵɵtemplate(2, PermissionsPage_div_17_ng_container_2_Template, 16, 7, "ng-container", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, PermissionsPage_div_17_aside_3_Template, 35, 2, "aside", 25);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const loadingState_r7 = i0.ɵɵreference(21);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r2.loadingPermissions() && !ctx_r2.loadingRole())("ngIfElse", loadingState_r7);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.selectedRole());
} }
function PermissionsPage_ng_template_18_div_1_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 52)(1, "div", 53)(2, "span", 54);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 55);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p-checkbox", 56);
    i0.ɵɵlistener("onChange", function PermissionsPage_ng_template_18_div_1_div_7_Template_p_checkbox_onChange_6_listener() { const permission_r9 = i0.ɵɵrestoreView(_r8).$implicit; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.togglePermission(permission_r9.key)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const permission_r9 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(permission_r9.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(permission_r9.description);
    i0.ɵɵadvance();
    i0.ɵɵproperty("binary", true)("ngModel", ctx_r2.isPermissionSelected(permission_r9.key))("ngModelOptions", i0.ɵɵpureFunction0(6, _c2))("disabled", ctx_r2.saving());
} }
function PermissionsPage_ng_template_18_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 47)(1, "div", 48)(2, "h4");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 49);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 50);
    i0.ɵɵtemplate(7, PermissionsPage_ng_template_18_div_1_div_7_Template, 7, 7, "div", 51);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const group_r10 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(group_r10.capability);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(group_r10.permissions.length);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", group_r10.permissions);
} }
function PermissionsPage_ng_template_18_p_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 21);
    i0.ɵɵtext(1, "No permissions in this category.");
    i0.ɵɵelementEnd();
} }
function PermissionsPage_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵtemplate(1, PermissionsPage_ng_template_18_div_1_Template, 8, 3, "div", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(2, PermissionsPage_ng_template_18_p_2_Template, 2, 0, "p", 12);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.filteredCapabilityGroups());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.filteredCapabilityGroups().length === 0);
} }
function PermissionsPage_ng_template_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtext(1, "Loading permission workspace...");
    i0.ɵɵelementEnd();
} }
export class PermissionsPage {
    dataService = inject(UserAdminDataService);
    toastService = inject(AppToastService);
    route = inject(ActivatedRoute);
    router = inject(Router);
    roles = signal([], ...(ngDevMode ? [{ debugName: "roles" }] : []));
    permissionCatalog = signal([], ...(ngDevMode ? [{ debugName: "permissionCatalog" }] : []));
    selectedRole = signal(null, ...(ngDevMode ? [{ debugName: "selectedRole" }] : []));
    selectedRoleId = signal(null, ...(ngDevMode ? [{ debugName: "selectedRoleId" }] : []));
    selectedPermissions = signal(new Set(), ...(ngDevMode ? [{ debugName: "selectedPermissions" }] : []));
    basePermissions = signal([], ...(ngDevMode ? [{ debugName: "basePermissions" }] : []));
    inheritedPermissions = signal([], ...(ngDevMode ? [{ debugName: "inheritedPermissions" }] : []));
    driftNotes = signal('', ...(ngDevMode ? [{ debugName: "driftNotes" }] : []));
    loadingRoles = signal(true, ...(ngDevMode ? [{ debugName: "loadingRoles" }] : []));
    loadingPermissions = signal(true, ...(ngDevMode ? [{ debugName: "loadingPermissions" }] : []));
    loadingRole = signal(false, ...(ngDevMode ? [{ debugName: "loadingRole" }] : []));
    saving = signal(false, ...(ngDevMode ? [{ debugName: "saving" }] : []));
    activeActionTab = signal('create-manage', ...(ngDevMode ? [{ debugName: "activeActionTab" }] : []));
    roleOptions = computed(() => this.roles()
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((role) => ({
        label: role.name,
        value: role.id
    })), ...(ngDevMode ? [{ debugName: "roleOptions" }] : []));
    selectedPermissionCount = computed(() => this.selectedPermissions().size, ...(ngDevMode ? [{ debugName: "selectedPermissionCount" }] : []));
    capabilityGroups = computed(() => {
        const groups = new Map();
        for (const permission of this.permissionCatalog()) {
            const key = permission.capability || 'General';
            if (!groups.has(key)) {
                groups.set(key, []);
            }
            groups.get(key)?.push(permission);
        }
        return Array.from(groups.entries()).map(([capability, permissions]) => ({
            capability,
            permissions: permissions.slice().sort((a, b) => a.label.localeCompare(b.label))
        }));
    }, ...(ngDevMode ? [{ debugName: "capabilityGroups" }] : []));
    actionTabCounts = computed(() => {
        const all = this.permissionCatalog();
        return {
            createManage: all.filter((permission) => this.permissionBucket(permission) === 'create-manage').length,
            viewAnalyze: all.filter((permission) => this.permissionBucket(permission) === 'view-analyze').length,
            governance: all.filter((permission) => this.permissionBucket(permission) === 'governance').length
        };
    }, ...(ngDevMode ? [{ debugName: "actionTabCounts" }] : []));
    filteredCapabilityGroups = computed(() => {
        const bucket = this.activeActionTab();
        return this.capabilityGroups()
            .map((group) => ({
            capability: group.capability,
            permissions: group.permissions.filter((permission) => this.permissionBucket(permission) === bucket)
        }))
            .filter((group) => group.permissions.length > 0);
    }, ...(ngDevMode ? [{ debugName: "filteredCapabilityGroups" }] : []));
    driftSummary = computed(() => {
        const current = this.selectedPermissions();
        const base = new Set(this.basePermissions());
        return {
            added: Array.from(current).filter((permission) => !base.has(permission)),
            removed: Array.from(base).filter((permission) => !current.has(permission))
        };
    }, ...(ngDevMode ? [{ debugName: "driftSummary" }] : []));
    constructor() {
        this.loadPermissions();
        this.loadRoles();
        const roleId = this.route.snapshot.queryParamMap.get('roleId');
        if (roleId) {
            this.selectedRoleId.set(roleId);
            this.loadRole(roleId);
        }
    }
    onRoleChange(nextRoleId) {
        if (!nextRoleId) {
            this.selectedRoleId.set(null);
            this.selectedRole.set(null);
            this.selectedPermissions.set(new Set());
            this.basePermissions.set([]);
            this.inheritedPermissions.set([]);
            this.driftNotes.set('');
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: { roleId: null },
                queryParamsHandling: 'merge',
                replaceUrl: true
            });
            return;
        }
        this.selectedRoleId.set(nextRoleId);
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { roleId: nextRoleId },
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
        this.loadRole(nextRoleId);
    }
    isPermissionSelected(permissionKey) {
        return this.selectedPermissions().has(permissionKey);
    }
    togglePermission(permissionKey) {
        const next = new Set(this.selectedPermissions());
        if (next.has(permissionKey)) {
            next.delete(permissionKey);
        }
        else {
            next.add(permissionKey);
        }
        this.selectedPermissions.set(next);
    }
    resetToBase() {
        const base = this.basePermissions();
        if (!base.length) {
            this.raiseToast('error', 'No base permission set found for this role.');
            return;
        }
        this.selectedPermissions.set(new Set(base));
    }
    savePermissions() {
        const role = this.selectedRole();
        if (!role) {
            this.raiseToast('error', 'Select a role first.');
            return;
        }
        const permissions = Array.from(this.selectedPermissions());
        if (!permissions.length) {
            this.raiseToast('error', 'Select at least one permission.');
            return;
        }
        const payload = {
            name: role.name,
            description: role.description ?? undefined,
            parentRoleId: role.parentRoleId ?? null,
            visibilityScope: role.visibilityScope ?? 'Team',
            securityLevelId: role.securityLevelId ?? null,
            permissions,
            driftNotes: this.driftNotes().trim() || undefined
        };
        this.saving.set(true);
        this.dataService.updateRole(role.id, payload).subscribe({
            next: (updated) => {
                this.saving.set(false);
                this.applyRole(updated);
                this.raiseToast('success', 'Permissions updated.');
            },
            error: () => {
                this.saving.set(false);
                this.raiseToast('error', 'Unable to save permissions.');
            }
        });
    }
    permissionLabel(key) {
        return this.permissionCatalog().find((item) => item.key === key)?.label ?? key;
    }
    onActionTabChange(next) {
        if (next === 'create-manage' || next === 'view-analyze' || next === 'governance') {
            this.activeActionTab.set(next);
            return;
        }
        this.activeActionTab.set('create-manage');
    }
    loadPermissions() {
        this.loadingPermissions.set(true);
        this.dataService.getPermissionCatalog().subscribe({
            next: (permissions) => {
                this.permissionCatalog.set(permissions);
                this.loadingPermissions.set(false);
            },
            error: () => {
                this.loadingPermissions.set(false);
                this.raiseToast('error', 'Unable to load permission catalog.');
            }
        });
    }
    loadRoles() {
        this.loadingRoles.set(true);
        this.dataService.getRoles().subscribe({
            next: (roles) => {
                this.roles.set(roles ?? []);
                this.loadingRoles.set(false);
                if (!this.selectedRoleId() && roles.length > 0) {
                    this.onRoleChange(roles[0].id);
                }
            },
            error: () => {
                this.loadingRoles.set(false);
                this.raiseToast('error', 'Unable to load roles.');
            }
        });
    }
    loadRole(roleId) {
        this.loadingRole.set(true);
        this.dataService.getRole(roleId).subscribe({
            next: (role) => {
                this.loadingRole.set(false);
                this.applyRole(role);
            },
            error: () => {
                this.loadingRole.set(false);
                this.raiseToast('error', 'Unable to load role permissions.');
            }
        });
    }
    applyRole(role) {
        this.selectedRole.set(role);
        this.selectedRoleId.set(role.id);
        this.selectedPermissions.set(new Set(role.permissions ?? []));
        this.basePermissions.set(role.basePermissions ?? []);
        this.inheritedPermissions.set(role.inheritedPermissions ?? []);
        this.driftNotes.set(role.driftNotes ?? '');
    }
    permissionBucket(permission) {
        const key = `${permission.key ?? ''} ${permission.label ?? ''}`.toLowerCase();
        if (key.includes('.view') ||
            key.includes(' view') ||
            key.includes('report') ||
            key.includes('analy') ||
            key.includes('export')) {
            return 'view-analyze';
        }
        if (key.includes('approve') ||
            key.includes('override') ||
            key.includes('audit') ||
            key.includes('administration') ||
            key.includes('tenant')) {
            return 'governance';
        }
        return 'create-manage';
    }
    raiseToast(tone, message) {
        this.toastService.show(tone, message, 3000);
    }
    static ɵfac = function PermissionsPage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PermissionsPage)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PermissionsPage, selectors: [["app-permissions-page"]], decls: 22, vars: 13, consts: [["permissionGroups", ""], ["loadingState", ""], [1, "permissions-page"], [1, "permissions-toolbar"], [1, "toolbar-left"], [1, "toolbar-actions"], ["appendTo", "body", "optionLabel", "label", "optionValue", "value", "placeholder", "Select role", "styleClass", "role-select", 3, "ngModelChange", "options", "ngModel", "disabled"], ["pButton", "", "type", "button", 1, "btn-glass", "small", 3, "disabled", "routerLink"], [1, "pi", "pi-pencil"], ["pButton", "", "type", "button", 1, "btn-gradient", 3, "click", "disabled"], [1, "pi", "pi-save"], ["class", "permissions-summary", 4, "ngIf"], ["class", "permissions-empty", 4, "ngIf"], ["class", "permissions-grid", 4, "ngIf"], [1, "permissions-summary"], [1, "summary-pill"], [1, "pi", "pi-shield"], [1, "pi", "pi-check-circle"], [1, "pi", "pi-sitemap"], [1, "summary-pill", "summary-pill--warning"], [1, "pi", "pi-exclamation-circle"], [1, "permissions-empty"], [1, "permissions-grid"], [1, "permissions-main"], [4, "ngIf", "ngIfElse"], ["class", "permissions-side", 4, "ngIf"], [1, "permission-action-tabs", 3, "valueChange", "value"], ["value", "create-manage"], ["value", "view-analyze"], ["value", "governance"], [4, "ngTemplateOutlet"], [1, "permissions-side"], [1, "side-card"], [1, "pi", "pi-sync"], [1, "drift-stats"], [1, "drift-stat", "drift-stat--added"], [1, "drift-stat__value"], [1, "drift-stat__label"], [1, "drift-stat", "drift-stat--removed"], ["type", "button", 1, "action-btn", "action-btn--refresh", "side-action", 3, "click"], [1, "action-btn__icon"], [1, "pi", "pi-replay"], [1, "side-card", "side-card--info"], [1, "pi", "pi-info-circle"], [1, "tips-list"], [1, "capability-grid"], ["class", "capability-card", 4, "ngFor", "ngForOf"], [1, "capability-card"], [1, "capability-header"], [1, "capability-count"], [1, "capability-list"], ["class", "capability-row", 4, "ngFor", "ngForOf"], [1, "capability-row"], [1, "capability-meta"], [1, "capability-label"], [1, "capability-desc"], [3, "onChange", "binary", "ngModel", "ngModelOptions", "disabled"]], template: function PermissionsPage_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "section", 2)(1, "div", 3)(2, "div", 4)(3, "p");
            i0.ɵɵtext(4, "Manage role permission sets separately from role profile fields.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(5, "div", 5)(6, "p-select", 6);
            i0.ɵɵlistener("ngModelChange", function PermissionsPage_Template_p_select_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onRoleChange($event)); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "button", 7);
            i0.ɵɵelement(8, "i", 8);
            i0.ɵɵelementStart(9, "span");
            i0.ɵɵtext(10, "Edit role");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "button", 9);
            i0.ɵɵlistener("click", function PermissionsPage_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.savePermissions()); });
            i0.ɵɵelement(12, "i", 10);
            i0.ɵɵelementStart(13, "span");
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(15, PermissionsPage_div_15_Template, 13, 4, "div", 11)(16, PermissionsPage_div_16_Template, 2, 0, "div", 12)(17, PermissionsPage_div_17_Template, 4, 3, "div", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(18, PermissionsPage_ng_template_18_Template, 3, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(20, PermissionsPage_ng_template_20_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("options", ctx.roleOptions())("ngModel", ctx.selectedRoleId())("disabled", ctx.loadingRoles());
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", !ctx.selectedRoleId() || ctx.saving())("routerLink", ctx.selectedRoleId() ? i0.ɵɵpureFunction1(10, _c0, ctx.selectedRoleId()) : i0.ɵɵpureFunction0(12, _c1));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", !ctx.selectedRoleId() || ctx.saving());
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.saving() ? "Saving..." : "Save Permissions");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedRole());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.selectedRoleId());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedRoleId());
        } }, dependencies: [NgIf,
            NgFor,
            FormsModule, i1.NgControlStatus, i1.NgModel, NgTemplateOutlet,
            RouterLink,
            ButtonModule, i2.ButtonDirective, CheckboxModule, i3.Checkbox, SelectModule, i4.Select, TabsModule, i5.Tabs, i5.TabPanels, i5.TabPanel, i5.TabList, i5.Tab], styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n.permissions-page[_ngcontent-%COMP%] {\n  display: grid;\n  gap: $space-4;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Toolbar[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.permissions-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: $space-4;\n  padding: $space-3 $space-4;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  box-shadow: $glass-shadow;\n  transition: box-shadow 250ms;\n\n  &:hover {\n    box-shadow: $glass-shadow-hover;\n  }\n}\n\n.toolbar-left[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: $font-size-sm;\n  color: $gray-500;\n  line-height: 1.5;\n}\n\n.toolbar-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Summary[_ngcontent-%COMP%]   pills[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.permissions-summary[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.summary-pill[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-1 $space-3;\n  border-radius: 9999px;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  background: $glass-bg;\n  backdrop-filter: blur(12px);\n  border: 1px solid $glass-border;\n  color: $gray-700;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  transition: all 200ms;\n\n  i {\n    font-size: 0.7rem;\n    opacity: 0.7;\n  }\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n  }\n\n  &--warning {\n    background: rgba(254, 215, 170, 0.35);\n    border-color: rgba(249, 115, 22, 0.2);\n    color: #9a3412;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Grid[_ngcontent-%COMP%]   layout[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.permissions-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 280px;\n  gap: $space-4;\n}\n\n.permissions-main[_ngcontent-%COMP%], \n.permissions-side[_ngcontent-%COMP%] {\n  display: grid;\n  gap: $space-3;\n}\n\n.permissions-main[_ngcontent-%COMP%] {\n  padding: $space-4;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  box-shadow: $glass-shadow;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Side[_ngcontent-%COMP%]   cards[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.side-card[_ngcontent-%COMP%] {\n  position: relative;\n  padding: $space-4;\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all 250ms;\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    border-radius: inherit;\n    padding: 1px;\n    background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.1), transparent 60%);\n    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n    mask-composite: exclude;\n    pointer-events: none;\n    opacity: 0;\n    transition: opacity 300ms;\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n\n    &::before {\n      opacity: 1;\n    }\n  }\n\n  h4 {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    margin: 0 0 $space-3;\n    font-size: $font-size-sm;\n    font-weight: 700;\n    color: $gray-800;\n\n    i {\n      width: 28px;\n      height: 28px;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: $radius-md;\n      font-size: 0.8rem;\n      background: linear-gradient(135deg, #667eea, #764ba2);\n      color: white;\n    }\n  }\n\n  p {\n    margin: 0;\n    font-size: $font-size-xs;\n    color: $gray-500;\n  }\n\n  &--info {\n    h4 i {\n      background: linear-gradient(135deg, #3b82f6, #2563eb);\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Drift[_ngcontent-%COMP%]   stats[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.drift-stats[_ngcontent-%COMP%] {\n  display: flex;\n  gap: $space-3;\n  margin-bottom: $space-3;\n}\n\n.drift-stat[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-3;\n  border-radius: $radius-md;\n  background: rgba(226, 232, 240, 0.3);\n  border: 1px solid rgba(226, 232, 240, 0.5);\n  transition: all 200ms;\n\n  &--added {\n    background: rgba(34, 197, 94, 0.08);\n    border-color: rgba(34, 197, 94, 0.2);\n\n    .drift-stat__value {\n      color: #16a34a;\n    }\n  }\n\n  &--removed {\n    background: rgba(239, 68, 68, 0.08);\n    border-color: rgba(239, 68, 68, 0.2);\n\n    .drift-stat__value {\n      color: #dc2626;\n    }\n  }\n\n  &__value {\n    font-size: $font-size-2xl;\n    font-weight: 800;\n    line-height: 1;\n  }\n\n  &__label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Side[_ngcontent-%COMP%]   action[_ngcontent-%COMP%]   buttons[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.side-action[_ngcontent-%COMP%] {\n  width: 100%;\n  justify-content: center;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Tips[_ngcontent-%COMP%]   list[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.tips-list[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n\n  li {\n    position: relative;\n    padding-left: $space-4;\n    font-size: $font-size-xs;\n    color: $gray-600;\n    line-height: 1.5;\n\n    &::before {\n      content: '';\n      position: absolute;\n      left: 0;\n      top: 7px;\n      width: 6px;\n      height: 6px;\n      border-radius: 50%;\n      background: linear-gradient(135deg, #667eea, #764ba2);\n    }\n\n    strong {\n      color: $gray-800;\n    }\n  }\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Capability[_ngcontent-%COMP%]   grid[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.capability-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: $space-3;\n}\n\n.capability-card[_ngcontent-%COMP%] {\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  background: $glass-bg-subtle;\n  backdrop-filter: blur(12px);\n  overflow: hidden;\n  transition: all 250ms;\n\n  &:hover {\n    border-color: rgba(102, 126, 234, 0.2);\n    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.06);\n  }\n}\n\n.capability-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  background: linear-gradient(180deg, rgba(240, 247, 255, 0.8) 0%, rgba(230, 240, 250, 0.6) 100%);\n\n  h4 {\n    margin: 0;\n    font-size: $font-size-sm;\n    font-weight: 700;\n    color: $gray-800;\n    letter-spacing: -0.01em;\n  }\n}\n\n.capability-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 24px;\n  height: 24px;\n  padding: 0 $space-2;\n  border-radius: 9999px;\n  font-size: 0.7rem;\n  font-weight: 700;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  color: white;\n}\n\n.capability-list[_ngcontent-%COMP%] {\n  padding: $space-2 $space-4 $space-3;\n}\n\n.capability-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-3;\n  padding: $space-2 0;\n  border-bottom: 1px solid rgba(226, 232, 240, 0.5);\n  transition: background 150ms;\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  &:hover {\n    background: rgba(102, 126, 234, 0.03);\n    border-radius: $radius-sm;\n  }\n}\n\n.capability-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.capability-label[_ngcontent-%COMP%] {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.capability-desc[_ngcontent-%COMP%] {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  line-height: 1.4;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Empty[_ngcontent-%COMP%]   state[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.permissions-empty[_ngcontent-%COMP%], \n.muted-text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: $font-size-sm;\n  color: $gray-500;\n  text-align: center;\n  padding: $space-6 $space-4;\n}\n\n//[_ngcontent-%COMP%]   \u2500\u2500[_ngcontent-%COMP%]   Responsive[_ngcontent-%COMP%]   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 960px) {\n  .permissions-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .permissions-toolbar {\n    flex-direction: column;\n    gap: $space-3;\n  }\n\n  .toolbar-actions {\n    width: 100%;\n    justify-content: flex-end;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PermissionsPage, [{
        type: Component,
        args: [{ selector: 'app-permissions-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    FormsModule,
                    NgTemplateOutlet,
                    RouterLink,
                    ButtonModule,
                    CheckboxModule,
                    SelectModule,
                    TabsModule
                ], template: "<section class=\"permissions-page\">\n  <div class=\"permissions-toolbar\">\n    <div class=\"toolbar-left\">\n      <p>Manage role permission sets separately from role profile fields.</p>\n    </div>\n    <div class=\"toolbar-actions\">\n      <p-select\n        appendTo=\"body\"\n        [options]=\"roleOptions()\"\n        optionLabel=\"label\"\n        optionValue=\"value\"\n        [ngModel]=\"selectedRoleId()\"\n        (ngModelChange)=\"onRoleChange($event)\"\n        placeholder=\"Select role\"\n        styleClass=\"role-select\"\n        [disabled]=\"loadingRoles()\"\n      ></p-select>\n      <button\n        pButton\n        type=\"button\"\n        class=\"btn-glass small\"\n        [disabled]=\"!selectedRoleId() || saving()\"\n        [routerLink]=\"selectedRoleId() ? ['/app/settings/roles', selectedRoleId(), 'edit'] : ['/app/settings/roles']\"\n      >\n        <i class=\"pi pi-pencil\"></i>\n        <span>Edit role</span>\n      </button>\n      <button pButton type=\"button\" class=\"btn-gradient\" (click)=\"savePermissions()\" [disabled]=\"!selectedRoleId() || saving()\">\n        <i class=\"pi pi-save\"></i>\n        <span>{{ saving() ? 'Saving...' : 'Save Permissions' }}</span>\n      </button>\n    </div>\n  </div>\n\n  <div class=\"permissions-summary\" *ngIf=\"selectedRole() as role\">\n    <span class=\"summary-pill\"><i class=\"pi pi-shield\"></i>{{ role.name }}</span>\n    <span class=\"summary-pill\"><i class=\"pi pi-check-circle\"></i>{{ selectedPermissionCount() }} selected</span>\n    <span class=\"summary-pill\"><i class=\"pi pi-sitemap\"></i>{{ inheritedPermissions().length }} inherited</span>\n    <span class=\"summary-pill summary-pill--warning\"><i class=\"pi pi-exclamation-circle\"></i>{{ driftSummary().added.length + driftSummary().removed.length }} drift</span>\n  </div>\n\n  <div class=\"permissions-empty\" *ngIf=\"!selectedRoleId()\">\n    Select a role to manage permissions.\n  </div>\n\n  <div class=\"permissions-grid\" *ngIf=\"selectedRoleId()\">\n    <div class=\"permissions-main\">\n      <ng-container *ngIf=\"!loadingPermissions() && !loadingRole(); else loadingState\">\n        <p-tabs [value]=\"activeActionTab()\" (valueChange)=\"onActionTabChange($event)\" class=\"permission-action-tabs\">\n          <p-tablist>\n            <p-tab value=\"create-manage\">Create &amp; Manage ({{ actionTabCounts().createManage }})</p-tab>\n            <p-tab value=\"view-analyze\">View &amp; Analyze ({{ actionTabCounts().viewAnalyze }})</p-tab>\n            <p-tab value=\"governance\">Governance ({{ actionTabCounts().governance }})</p-tab>\n          </p-tablist>\n          <p-tabpanels>\n            <p-tabpanel value=\"create-manage\">\n              <ng-container *ngTemplateOutlet=\"permissionGroups\"></ng-container>\n            </p-tabpanel>\n            <p-tabpanel value=\"view-analyze\">\n              <ng-container *ngTemplateOutlet=\"permissionGroups\"></ng-container>\n            </p-tabpanel>\n            <p-tabpanel value=\"governance\">\n              <ng-container *ngTemplateOutlet=\"permissionGroups\"></ng-container>\n            </p-tabpanel>\n          </p-tabpanels>\n        </p-tabs>\n      </ng-container>\n    </div>\n\n    <aside class=\"permissions-side\" *ngIf=\"selectedRole()\">\n      <div class=\"side-card\">\n        <h4><i class=\"pi pi-sync\"></i> Drift</h4>\n        <div class=\"drift-stats\">\n          <div class=\"drift-stat drift-stat--added\">\n            <span class=\"drift-stat__value\">{{ driftSummary().added.length }}</span>\n            <span class=\"drift-stat__label\">Added</span>\n          </div>\n          <div class=\"drift-stat drift-stat--removed\">\n            <span class=\"drift-stat__value\">{{ driftSummary().removed.length }}</span>\n            <span class=\"drift-stat__label\">Removed</span>\n          </div>\n        </div>\n        <button type=\"button\" class=\"action-btn action-btn--refresh side-action\" (click)=\"resetToBase()\">\n          <span class=\"action-btn__icon\"><i class=\"pi pi-replay\"></i></span>\n          <span>Reset to Base</span>\n        </button>\n      </div>\n\n      <div class=\"side-card side-card--info\">\n        <h4><i class=\"pi pi-info-circle\"></i> Quick Tips</h4>\n        <ul class=\"tips-list\">\n          <li>Use the tabs above to browse permissions by action type.</li>\n          <li>Inherited permissions are locked by the parent role hierarchy.</li>\n          <li>Use <strong>Drift</strong> tracking to audit changes from the base pack.</li>\n        </ul>\n      </div>\n    </aside>\n  </div>\n</section>\n\n<ng-template #permissionGroups>\n  <div class=\"capability-grid\">\n    <div class=\"capability-card\" *ngFor=\"let group of filteredCapabilityGroups()\">\n      <div class=\"capability-header\">\n        <h4>{{ group.capability }}</h4>\n        <span class=\"capability-count\">{{ group.permissions.length }}</span>\n      </div>\n      <div class=\"capability-list\">\n        <div class=\"capability-row\" *ngFor=\"let permission of group.permissions\">\n          <div class=\"capability-meta\">\n            <span class=\"capability-label\">{{ permission.label }}</span>\n            <span class=\"capability-desc\">{{ permission.description }}</span>\n          </div>\n          <p-checkbox\n            [binary]=\"true\"\n            [ngModel]=\"isPermissionSelected(permission.key)\"\n            [ngModelOptions]=\"{ standalone: true }\"\n            (onChange)=\"togglePermission(permission.key)\"\n            [disabled]=\"saving()\"\n          ></p-checkbox>\n        </div>\n      </div>\n    </div>\n  </div>\n  <p class=\"permissions-empty\" *ngIf=\"filteredCapabilityGroups().length === 0\">No permissions in this category.</p>\n</ng-template>\n\n<ng-template #loadingState>\n  <div class=\"permissions-empty\">Loading permission workspace...</div>\n</ng-template>\n", styles: ["@use '../../../../../styles/design-tokens' as *;\n@use 'sass:color';\n\n.permissions-page {\n  display: grid;\n  gap: $space-4;\n}\n\n// \u2500\u2500 Toolbar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.permissions-toolbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: $space-4;\n  padding: $space-3 $space-4;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  box-shadow: $glass-shadow;\n  transition: box-shadow 250ms;\n\n  &:hover {\n    box-shadow: $glass-shadow-hover;\n  }\n}\n\n.toolbar-left p {\n  margin: 0;\n  font-size: $font-size-sm;\n  color: $gray-500;\n  line-height: 1.5;\n}\n\n.toolbar-actions {\n  display: flex;\n  align-items: center;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n// \u2500\u2500 Summary pills \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.permissions-summary {\n  display: flex;\n  gap: $space-2;\n  flex-wrap: wrap;\n}\n\n.summary-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-1 $space-3;\n  border-radius: 9999px;\n  font-size: $font-size-xs;\n  font-weight: 600;\n  background: $glass-bg;\n  backdrop-filter: blur(12px);\n  border: 1px solid $glass-border;\n  color: $gray-700;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n  transition: all 200ms;\n\n  i {\n    font-size: 0.7rem;\n    opacity: 0.7;\n  }\n\n  &:hover {\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n  }\n\n  &--warning {\n    background: rgba(254, 215, 170, 0.35);\n    border-color: rgba(249, 115, 22, 0.2);\n    color: #9a3412;\n  }\n}\n\n// \u2500\u2500 Grid layout \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.permissions-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 280px;\n  gap: $space-4;\n}\n\n.permissions-main,\n.permissions-side {\n  display: grid;\n  gap: $space-3;\n}\n\n.permissions-main {\n  padding: $space-4;\n  border: 1px solid $glass-border;\n  border-radius: $radius-xl;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  box-shadow: $glass-shadow;\n}\n\n// \u2500\u2500 Side cards \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.side-card {\n  position: relative;\n  padding: $space-4;\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  background: $glass-bg;\n  backdrop-filter: blur($glass-blur);\n  box-shadow: $glass-shadow;\n  overflow: hidden;\n  transition: all 250ms;\n\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    border-radius: inherit;\n    padding: 1px;\n    background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.1), transparent 60%);\n    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n    mask-composite: exclude;\n    pointer-events: none;\n    opacity: 0;\n    transition: opacity 300ms;\n  }\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: $glass-shadow-hover;\n\n    &::before {\n      opacity: 1;\n    }\n  }\n\n  h4 {\n    display: flex;\n    align-items: center;\n    gap: $space-2;\n    margin: 0 0 $space-3;\n    font-size: $font-size-sm;\n    font-weight: 700;\n    color: $gray-800;\n\n    i {\n      width: 28px;\n      height: 28px;\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      border-radius: $radius-md;\n      font-size: 0.8rem;\n      background: linear-gradient(135deg, #667eea, #764ba2);\n      color: white;\n    }\n  }\n\n  p {\n    margin: 0;\n    font-size: $font-size-xs;\n    color: $gray-500;\n  }\n\n  &--info {\n    h4 i {\n      background: linear-gradient(135deg, #3b82f6, #2563eb);\n    }\n  }\n}\n\n// \u2500\u2500 Drift stats \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.drift-stats {\n  display: flex;\n  gap: $space-3;\n  margin-bottom: $space-3;\n}\n\n.drift-stat {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: $space-1;\n  padding: $space-3;\n  border-radius: $radius-md;\n  background: rgba(226, 232, 240, 0.3);\n  border: 1px solid rgba(226, 232, 240, 0.5);\n  transition: all 200ms;\n\n  &--added {\n    background: rgba(34, 197, 94, 0.08);\n    border-color: rgba(34, 197, 94, 0.2);\n\n    .drift-stat__value {\n      color: #16a34a;\n    }\n  }\n\n  &--removed {\n    background: rgba(239, 68, 68, 0.08);\n    border-color: rgba(239, 68, 68, 0.2);\n\n    .drift-stat__value {\n      color: #dc2626;\n    }\n  }\n\n  &__value {\n    font-size: $font-size-2xl;\n    font-weight: 800;\n    line-height: 1;\n  }\n\n  &__label {\n    font-size: $font-size-xs;\n    font-weight: 600;\n    color: $gray-500;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n  }\n}\n\n// \u2500\u2500 Side action buttons \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.side-action {\n  width: 100%;\n  justify-content: center;\n}\n\n// \u2500\u2500 Tips list \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.tips-list {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  display: flex;\n  flex-direction: column;\n  gap: $space-2;\n\n  li {\n    position: relative;\n    padding-left: $space-4;\n    font-size: $font-size-xs;\n    color: $gray-600;\n    line-height: 1.5;\n\n    &::before {\n      content: '';\n      position: absolute;\n      left: 0;\n      top: 7px;\n      width: 6px;\n      height: 6px;\n      border-radius: 50%;\n      background: linear-gradient(135deg, #667eea, #764ba2);\n    }\n\n    strong {\n      color: $gray-800;\n    }\n  }\n}\n\n// \u2500\u2500 Capability grid \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.capability-grid {\n  display: grid;\n  gap: $space-3;\n}\n\n.capability-card {\n  border: 1px solid $glass-border;\n  border-radius: $radius-lg;\n  background: $glass-bg-subtle;\n  backdrop-filter: blur(12px);\n  overflow: hidden;\n  transition: all 250ms;\n\n  &:hover {\n    border-color: rgba(102, 126, 234, 0.2);\n    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.06);\n  }\n}\n\n.capability-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: $space-3 $space-4;\n  border-bottom: 1px solid rgba(148, 163, 184, 0.12);\n  background: linear-gradient(180deg, rgba(240, 247, 255, 0.8) 0%, rgba(230, 240, 250, 0.6) 100%);\n\n  h4 {\n    margin: 0;\n    font-size: $font-size-sm;\n    font-weight: 700;\n    color: $gray-800;\n    letter-spacing: -0.01em;\n  }\n}\n\n.capability-count {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 24px;\n  height: 24px;\n  padding: 0 $space-2;\n  border-radius: 9999px;\n  font-size: 0.7rem;\n  font-weight: 700;\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  color: white;\n}\n\n.capability-list {\n  padding: $space-2 $space-4 $space-3;\n}\n\n.capability-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: $space-3;\n  padding: $space-2 0;\n  border-bottom: 1px solid rgba(226, 232, 240, 0.5);\n  transition: background 150ms;\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  &:hover {\n    background: rgba(102, 126, 234, 0.03);\n    border-radius: $radius-sm;\n  }\n}\n\n.capability-meta {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.capability-label {\n  font-size: $font-size-sm;\n  font-weight: 600;\n  color: $gray-800;\n}\n\n.capability-desc {\n  font-size: $font-size-xs;\n  color: $gray-500;\n  line-height: 1.4;\n}\n\n// \u2500\u2500 Empty state \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n.permissions-empty,\n.muted-text {\n  margin: 0;\n  font-size: $font-size-sm;\n  color: $gray-500;\n  text-align: center;\n  padding: $space-6 $space-4;\n}\n\n// \u2500\u2500 Responsive \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n@media (max-width: 960px) {\n  .permissions-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .permissions-toolbar {\n    flex-direction: column;\n    gap: $space-3;\n  }\n\n  .toolbar-actions {\n    width: 100%;\n    justify-content: flex-end;\n  }\n}\n"] }]
    }], () => [], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PermissionsPage, { className: "PermissionsPage", filePath: "src/app/crm/features/settings/pages/permissions.page.ts", lineNumber: 33 }); })();
