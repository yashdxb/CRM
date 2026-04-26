import { Injectable, inject, signal, computed } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { readTokenContext, tokenHasPermission } from '../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../core/auth/permission.constants';
import { TenantContext, TenantContextService } from '../../core/tenant/tenant-context.service';
import { TenantBrandingStateService } from '../../core/tenant/tenant-branding-state.service';
import { CrmEventsService } from '../../core/realtime/crm-events.service';
import { OpportunityApprovalService } from '../../crm/features/opportunities/services/opportunity-approval.service';
import { AuthService } from '../../core/auth/auth.service';
import { NavLink } from './navigation.model';
import { NAV_LINKS } from './navigation.config';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly STORAGE_KEY = 'crm_nav_expanded_menus';
  private readonly COLLAPSED_KEY = 'crm_sidebar_collapsed';
  private readonly TOPBAR_HIDDEN_KEY = 'crm_topbar_hidden';
  
  private readonly router = inject(Router);
  private readonly tenantContextService = inject(TenantContextService);
  private readonly brandingState = inject(TenantBrandingStateService);
  private readonly crmEventsService = inject(CrmEventsService);
  private readonly approvalService = inject(OpportunityApprovalService);
  private readonly authService = inject(AuthService);

  // Sidebar collapsed state
  private readonly _collapsed = signal(this.loadCollapsedState());
  readonly collapsed = this._collapsed.asReadonly();

  // Topbar hidden state
  private readonly _topbarHidden = signal(this.loadTopbarHiddenState());
  readonly topbarHidden = this._topbarHidden.asReadonly();

  // Tenant context
  readonly tenantContext = signal<TenantContext | null>(null);

  // Menu expansion state
  private readonly expandedMenus = signal<Set<string>>(new Set());
  private readonly expandedChildMenus = signal<Set<string>>(new Set());
  private readonly navVersion = signal(0);
  private readonly decisionPendingCount = signal(0);

  // Navigation links
  readonly navLinks = computed(() => this.applyDynamicBadges(NAV_LINKS, this.decisionPendingCount()));

  readonly visibleNavLinks = computed(() => {
    this.navVersion();
    // Track auth state reactively so nav updates on login/logout
    this.authService.currentUser();
    const context = readTokenContext();

    const hasPermission = (link: NavLink) => {
      if (!link.permission || !context) return true;
      return tokenHasPermission(context.payload, link.permission);
    };

    const hasFeatureFlag = (link: NavLink) => {
      if (!link.featureFlag) return true;
      const value = this.tenantContext()?.featureFlags?.[link.featureFlag];
      if (value === true) return true;
      if (value === false) return false;
      return false;
    };

    const filterChildren = (
      items?: NavLink[],
      inheritedPermission = true,
      inheritedFeatureFlag = true
    ) =>
      items?.reduce<NavLink[]>((acc, item) => {
        const permissionAllowed = inheritedPermission && hasPermission(item);
        const featureAllowed = inheritedFeatureFlag && hasFeatureFlag(item);
        const nestedChildren = filterChildren(item.children, permissionAllowed, featureAllowed);
        const hasAnyChildren = (nestedChildren.length ?? 0) > 0;
        const allowed = permissionAllowed && featureAllowed;
        if (!allowed && !hasAnyChildren) return acc;
        acc.push({ ...item, children: nestedChildren });
        return acc;
      }, []) ?? [];

    return this.navLinks().reduce<NavLink[]>((acc, link) => {
      const permissionAllowed = hasPermission(link);
      const featureAllowed = hasFeatureFlag(link);
      const children = filterChildren(link.children, permissionAllowed, featureAllowed);
      if ((!permissionAllowed || !featureAllowed) && children.length === 0) return acc;
      acc.push({ ...link, children });
      return acc;
    }, []);
  });

  constructor() {
    this.loadExpandedState();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
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

  private loadTenantContext() {
    this.tenantContextService.getTenantContext().subscribe({
      next: (context) => this.tenantContext.set(context),
      error: () => this.tenantContext.set(null)
    });
  }

  private loadCollapsedState(): boolean {
    try {
      if (typeof window !== 'undefined' && window.innerWidth <= 840) {
        return true;
      }
      return localStorage.getItem(this.COLLAPSED_KEY) === 'true';
    } catch {
      return false;
    }
  }

  toggleSidebar() {
    this._collapsed.update(v => !v);
    try {
      localStorage.setItem(this.COLLAPSED_KEY, String(this._collapsed()));
    } catch {}
  }

  applyResponsiveSidebarState(isMobileViewport: boolean) {
    if (isMobileViewport) {
      this._collapsed.set(true);
      return;
    }

    this._collapsed.set(this.readStoredCollapsedPreference());
  }

  private readStoredCollapsedPreference(): boolean {
    try {
      return localStorage.getItem(this.COLLAPSED_KEY) === 'true';
    } catch {
      return false;
    }
  }

  private loadTopbarHiddenState(): boolean {
    try {
      return localStorage.getItem(this.TOPBAR_HIDDEN_KEY) === 'true';
    } catch {
      return false;
    }
  }

  toggleTopbar() {
    this._topbarHidden.update(v => !v);
    try {
      localStorage.setItem(this.TOPBAR_HIDDEN_KEY, String(this._topbarHidden()));
    } catch {}
  }

  private loadExpandedState() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const menus = JSON.parse(stored) as string[];
        const first = menus[0];
        this.expandedMenus.set(first ? new Set([first]) : new Set());
        this.expandedChildMenus.set(new Set());
      }
    } catch {}
  }

  private saveExpandedState() {
    try {
      const menus = Array.from(this.expandedMenus());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(menus));
    } catch {}
  }

  private childKey(parentLabel: string, childLabel: string) {
    return `${parentLabel}::${childLabel}`;
  }

  isMenuExpanded(label: string): boolean {
    return this.expandedMenus().has(label);
  }

  isChildExpanded(parentLabel: string, childLabel: string): boolean {
    return this.expandedChildMenus().has(this.childKey(parentLabel, childLabel));
  }

  toggleSubmenu(label: string) {
    const isOpen = this.expandedMenus().has(label);
    if (isOpen) {
      this.expandedMenus.set(new Set());
      this.saveExpandedState();
      return;
    }

    this.expandedMenus.set(new Set([label]));
    this.expandedChildMenus.update((menus) => {
      const next = new Set<string>();
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

  toggleChildMenu(parentLabel: string, childLabel: string) {
    const key = this.childKey(parentLabel, childLabel);
    this.expandedChildMenus.update((menus) => {
      const next = new Set(menus);
      const isOpen = next.has(key);
      const parentPrefix = `${parentLabel}::`;
      for (const existing of Array.from(next)) {
        if (existing.startsWith(parentPrefix)) next.delete(existing);
      }
      if (!isOpen) {
        next.add(key);
      }
      return next;
    });
  }

  isParentActive(link: NavLink): boolean {
    const currentUrl = this.router.url.split('?')[0];
    if (link.children?.length) {
      return link.children.some(child =>
        currentUrl === child.path || currentUrl.startsWith(child.path + '/')
      );
    }
    return currentUrl === link.path || currentUrl.startsWith(link.path + '/');
  }

  isChildActive(parent: NavLink, child: NavLink): boolean {
    const currentUrl = this.router.url.split('?')[0];
    if (child.path && (currentUrl === child.path || currentUrl.startsWith(child.path + '/'))) {
      return true;
    }
    return (
      child.children?.some(
        (grandChild) =>
          currentUrl === grandChild.path || currentUrl.startsWith(grandChild.path + '/')
      ) ?? false
    );
  }

  refreshNav() {
    this.navVersion.update((version) => version + 1);
  }

  private autoExpandActiveMenu() {
    const currentUrl = this.router.url.split('?')[0];

    for (const link of this.navLinks()) {
      if (link.children?.length) {
        const isChildActive = link.children.some((child) =>
          currentUrl === child.path || currentUrl.startsWith(child.path + '/')
        );
        if (isChildActive && !this.expandedMenus().has(link.label)) {
          this.expandedMenus.set(new Set([link.label]));
          this.expandedChildMenus.set(new Set());
          this.saveExpandedState();
        }

        link.children.forEach((child) => {
          if (!child.children?.length) return;
          const hasActiveGrandchild =
            child.children.some(
              (grandChild) =>
                currentUrl === grandChild.path || currentUrl.startsWith(grandChild.path + '/')
            ) ||
            (child.path && (currentUrl === child.path || currentUrl.startsWith(child.path + '/')));
          if (hasActiveGrandchild && !this.isChildExpanded(link.label, child.label)) {
            this.toggleChildMenu(link.label, child.label);
          }
        });
      }
    }
  }

  private refreshDecisionPendingCount() {
    const context = readTokenContext();
    const payload = context?.payload ?? null;
    const canViewDecisions =
      tokenHasPermission(payload, PERMISSION_KEYS.opportunitiesView) ||
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

  private applyDynamicBadges(links: NavLink[], decisionPendingCount: number): NavLink[] {
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
}
