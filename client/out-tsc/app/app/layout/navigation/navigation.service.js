import { Injectable, inject, signal, computed } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { readTokenContext, tokenHasPermission } from '../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../core/auth/permission.constants';
import { TenantContextService } from '../../core/tenant/tenant-context.service';
import { TenantBrandingStateService } from '../../core/tenant/tenant-branding-state.service';
import { CrmEventsService } from '../../core/realtime/crm-events.service';
import { OpportunityApprovalService } from '../../crm/features/opportunities/services/opportunity-approval.service';
import { AuthService } from '../../core/auth/auth.service';
import { NAV_LINKS } from './navigation.config';
import * as i0 from "@angular/core";
export class NavigationService {
    STORAGE_KEY = 'crm_nav_expanded_menus';
    COLLAPSED_KEY = 'crm_sidebar_collapsed';
    TOPBAR_HIDDEN_KEY = 'crm_topbar_hidden';
    router = inject(Router);
    tenantContextService = inject(TenantContextService);
    brandingState = inject(TenantBrandingStateService);
    crmEventsService = inject(CrmEventsService);
    approvalService = inject(OpportunityApprovalService);
    authService = inject(AuthService);
    // Sidebar collapsed state
    _collapsed = signal(this.loadCollapsedState(), ...(ngDevMode ? [{ debugName: "_collapsed" }] : []));
    collapsed = this._collapsed.asReadonly();
    // Topbar hidden state
    _topbarHidden = signal(this.loadTopbarHiddenState(), ...(ngDevMode ? [{ debugName: "_topbarHidden" }] : []));
    topbarHidden = this._topbarHidden.asReadonly();
    // Tenant context
    tenantContext = signal(null, ...(ngDevMode ? [{ debugName: "tenantContext" }] : []));
    // Menu expansion state
    expandedMenus = signal(new Set(), ...(ngDevMode ? [{ debugName: "expandedMenus" }] : []));
    expandedChildMenus = signal(new Set(), ...(ngDevMode ? [{ debugName: "expandedChildMenus" }] : []));
    navVersion = signal(0, ...(ngDevMode ? [{ debugName: "navVersion" }] : []));
    decisionPendingCount = signal(0, ...(ngDevMode ? [{ debugName: "decisionPendingCount" }] : []));
    // Navigation links
    navLinks = computed(() => this.applyDynamicBadges(NAV_LINKS, this.decisionPendingCount()), ...(ngDevMode ? [{ debugName: "navLinks" }] : []));
    visibleNavLinks = computed(() => {
        this.navVersion();
        // Track auth state reactively so nav updates on login/logout
        this.authService.currentUser();
        const context = readTokenContext();
        const hasPermission = (link) => {
            if (!link.permission || !context)
                return true;
            return tokenHasPermission(context.payload, link.permission);
        };
        const hasFeatureFlag = (link) => {
            if (!link.featureFlag)
                return true;
            return this.tenantContext()?.featureFlags?.[link.featureFlag] === true;
        };
        const filterChildren = (items) => items?.reduce((acc, item) => {
            const nestedChildren = filterChildren(item.children);
            const hasAnyChildren = (nestedChildren?.length ?? 0) > 0;
            const allowed = hasPermission(item) && hasFeatureFlag(item);
            if (!allowed && !hasAnyChildren)
                return acc;
            acc.push({ ...item, children: nestedChildren });
            return acc;
        }, []) ?? [];
        return this.navLinks().reduce((acc, link) => {
            const children = filterChildren(link.children);
            if ((!hasPermission(link) || !hasFeatureFlag(link)) && children.length === 0)
                return acc;
            acc.push({ ...link, children });
            return acc;
        }, []);
    }, ...(ngDevMode ? [{ debugName: "visibleNavLinks" }] : []));
    constructor() {
        this.loadExpandedState();
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.refreshNav();
            this.autoExpandActiveMenu();
        });
        this.autoExpandActiveMenu();
        this.loadTenantContext();
        this.brandingState.loadBranding();
        this.refreshDecisionPendingCount();
        this.crmEventsService.events$
            .pipe(filter((event) => event.eventType.startsWith('decision.')))
            .subscribe((event) => {
            const payloadCount = Number(event.payload?.['pendingCount']);
            if (Number.isFinite(payloadCount) && payloadCount >= 0) {
                this.decisionPendingCount.set(payloadCount);
                return;
            }
            if (event.eventType === 'decision.pending-count') {
                return;
            }
            this.refreshDecisionPendingCount();
        });
    }
    loadTenantContext() {
        this.tenantContextService.getTenantContext().subscribe({
            next: (context) => this.tenantContext.set(context),
            error: () => this.tenantContext.set(null)
        });
    }
    loadCollapsedState() {
        try {
            if (typeof window !== 'undefined' && window.innerWidth <= 840) {
                return true;
            }
            return localStorage.getItem(this.COLLAPSED_KEY) === 'true';
        }
        catch {
            return false;
        }
    }
    toggleSidebar() {
        this._collapsed.update(v => !v);
        try {
            localStorage.setItem(this.COLLAPSED_KEY, String(this._collapsed()));
        }
        catch { }
    }
    applyResponsiveSidebarState(isMobileViewport) {
        if (isMobileViewport) {
            this._collapsed.set(true);
            return;
        }
        this._collapsed.set(this.readStoredCollapsedPreference());
    }
    readStoredCollapsedPreference() {
        try {
            return localStorage.getItem(this.COLLAPSED_KEY) === 'true';
        }
        catch {
            return false;
        }
    }
    loadTopbarHiddenState() {
        try {
            return localStorage.getItem(this.TOPBAR_HIDDEN_KEY) === 'true';
        }
        catch {
            return false;
        }
    }
    toggleTopbar() {
        this._topbarHidden.update(v => !v);
        try {
            localStorage.setItem(this.TOPBAR_HIDDEN_KEY, String(this._topbarHidden()));
        }
        catch { }
    }
    loadExpandedState() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const menus = JSON.parse(stored);
                const first = menus[0];
                this.expandedMenus.set(first ? new Set([first]) : new Set());
                this.expandedChildMenus.set(new Set());
            }
        }
        catch { }
    }
    saveExpandedState() {
        try {
            const menus = Array.from(this.expandedMenus());
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(menus));
        }
        catch { }
    }
    childKey(parentLabel, childLabel) {
        return `${parentLabel}::${childLabel}`;
    }
    isMenuExpanded(label) {
        return this.expandedMenus().has(label);
    }
    isChildExpanded(parentLabel, childLabel) {
        return this.expandedChildMenus().has(this.childKey(parentLabel, childLabel));
    }
    toggleSubmenu(label) {
        const isOpen = this.expandedMenus().has(label);
        if (isOpen) {
            this.expandedMenus.set(new Set());
            this.saveExpandedState();
            return;
        }
        this.expandedMenus.set(new Set([label]));
        this.expandedChildMenus.update((menus) => {
            const next = new Set();
            const parentPrefix = `${label}::`;
            for (const existing of menus) {
                if (existing.startsWith(parentPrefix)) {
                    next.add(existing);
                }
            }
            return next;
        });
        this.saveExpandedState();
    }
    toggleChildMenu(parentLabel, childLabel) {
        const key = this.childKey(parentLabel, childLabel);
        this.expandedChildMenus.update((menus) => {
            const next = new Set(menus);
            const isOpen = next.has(key);
            const parentPrefix = `${parentLabel}::`;
            for (const existing of Array.from(next)) {
                if (existing.startsWith(parentPrefix))
                    next.delete(existing);
            }
            if (!isOpen) {
                next.add(key);
            }
            return next;
        });
    }
    isParentActive(link) {
        const currentUrl = this.router.url.split('?')[0];
        if (link.children?.length) {
            return link.children.some(child => currentUrl === child.path || currentUrl.startsWith(child.path + '/'));
        }
        return currentUrl === link.path || currentUrl.startsWith(link.path + '/');
    }
    isChildActive(parent, child) {
        const currentUrl = this.router.url.split('?')[0];
        if (child.path && (currentUrl === child.path || currentUrl.startsWith(child.path + '/'))) {
            return true;
        }
        return (child.children?.some((grandChild) => currentUrl === grandChild.path || currentUrl.startsWith(grandChild.path + '/')) ?? false);
    }
    refreshNav() {
        this.navVersion.update((version) => version + 1);
    }
    autoExpandActiveMenu() {
        const currentUrl = this.router.url.split('?')[0];
        for (const link of this.navLinks()) {
            if (link.children?.length) {
                const isChildActive = link.children.some((child) => currentUrl === child.path || currentUrl.startsWith(child.path + '/'));
                if (isChildActive && !this.expandedMenus().has(link.label)) {
                    this.expandedMenus.set(new Set([link.label]));
                    this.expandedChildMenus.set(new Set());
                    this.saveExpandedState();
                }
                link.children.forEach((child) => {
                    if (!child.children?.length)
                        return;
                    const hasActiveGrandchild = child.children.some((grandChild) => currentUrl === grandChild.path || currentUrl.startsWith(grandChild.path + '/')) ||
                        (child.path && (currentUrl === child.path || currentUrl.startsWith(child.path + '/')));
                    if (hasActiveGrandchild && !this.isChildExpanded(link.label, child.label)) {
                        this.toggleChildMenu(link.label, child.label);
                    }
                });
            }
        }
    }
    refreshDecisionPendingCount() {
        const context = readTokenContext();
        const payload = context?.payload ?? null;
        const canViewDecisions = tokenHasPermission(payload, PERMISSION_KEYS.opportunitiesView) ||
            tokenHasPermission(payload, PERMISSION_KEYS.opportunitiesApprovalsApprove);
        if (!canViewDecisions) {
            this.decisionPendingCount.set(0);
            return;
        }
        this.approvalService.getInbox('Pending').subscribe({
            next: (items) => this.decisionPendingCount.set((items ?? []).filter((item) => item.status === 'Pending').length),
            error: () => this.decisionPendingCount.set(0)
        });
    }
    applyDynamicBadges(links, decisionPendingCount) {
        return links.map((link) => {
            const children = link.children
                ? this.applyDynamicBadges(link.children, decisionPendingCount)
                : undefined;
            const isDecisionParent = link.path === '/app/decisions';
            const isPendingAction = link.path === '/app/decisions/pending-action';
            const badge = (isDecisionParent || isPendingAction) && decisionPendingCount > 0
                ? String(decisionPendingCount)
                : link.badge;
            return {
                ...link,
                badge,
                children
            };
        });
    }
    static ɵfac = function NavigationService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NavigationService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: NavigationService, factory: NavigationService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NavigationService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [], null); })();
