import { Injectable, inject, signal, computed } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { readTokenContext, tokenHasPermission } from '../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../core/auth/permission.constants';
import { TenantContext, TenantContextService } from '../../core/tenant/tenant-context.service';
import { CrmEventsService } from '../../core/realtime/crm-events.service';
import { OpportunityApprovalService } from '../../crm/features/opportunities/services/opportunity-approval.service';
import { NavLink } from './navigation.model';
import { NAV_LINKS, SUPPLY_CHAIN_MODULES } from './navigation.config';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly STORAGE_KEY = 'crm_nav_expanded_menus';
  private readonly COLLAPSED_KEY = 'crm_sidebar_collapsed';
  private readonly TOPBAR_HIDDEN_KEY = 'crm_topbar_hidden';
  
  private readonly router = inject(Router);
  private readonly tenantContextService = inject(TenantContextService);
  private readonly crmEventsService = inject(CrmEventsService);
  private readonly approvalService = inject(OpportunityApprovalService);

  // Sidebar collapsed state
  private readonly _collapsed = signal(this.loadCollapsedState());
  readonly collapsed = this._collapsed.asReadonly();

  // Topbar hidden state
  private readonly _topbarHidden = signal(this.loadTopbarHiddenState());
  readonly topbarHidden = this._topbarHidden.asReadonly();

  // Tenant context
  readonly tenantContext = signal<TenantContext | null>(null);
  
  readonly enabledSupplyChainModules = computed(() => {
    const context = this.tenantContext();
    if (!context) return [];
    if (context.industryPreset === 'SupplyChain') {
      return context.industryModules?.length ? context.industryModules : SUPPLY_CHAIN_MODULES;
    }
    return (context.industryModules?.length ?? 0) > 0 ? context.industryModules ?? [] : [];
  });

  // Menu expansion state
  private readonly expandedMenus = signal<Set<string>>(new Set());
  private readonly expandedChildMenus = signal<Set<string>>(new Set());
  private seededChildMenus = false;
  private readonly navVersion = signal(0);
  private readonly decisionPendingCount = signal(0);

  // Navigation links
  readonly navLinks = computed(() => this.applyDynamicBadges(NAV_LINKS, this.decisionPendingCount()));

  readonly visibleNavLinks = computed(() => {
    this.navVersion();
    const context = readTokenContext();
    const enabledModules = new Set(this.enabledSupplyChainModules());

    const hasPermission = (link: NavLink) => {
      if (!link.permission || !context) return true;
      return tokenHasPermission(context.payload, link.permission);
    };

    const hasFeatureFlag = (link: NavLink) => {
      if (!link.featureFlag) return true;
      return this.tenantContext()?.featureFlags?.[link.featureFlag] === true;
    };

    const hasPackAccess = (link: NavLink) => {
      if (!link.pack) return true;
      if (link.pack === 'supply-chain') {
        if (enabledModules.size === 0) return false;
        if (!link.module) return true;
        return enabledModules.has(link.module);
      }
      return true;
    };

    const filterChildren = (items?: NavLink[]) =>
      items?.reduce<NavLink[]>((acc, item) => {
        const nestedChildren = filterChildren(item.children);
        const hasAnyChildren = (nestedChildren?.length ?? 0) > 0;
        const allowed = hasPermission(item) && hasFeatureFlag(item) && hasPackAccess(item);
        if (!allowed && !hasAnyChildren) return acc;
        acc.push({ ...item, children: nestedChildren });
        return acc;
      }, []) ?? [];

    return this.navLinks().reduce<NavLink[]>((acc, link) => {
      const children = filterChildren(link.children);
      if ((!hasPermission(link) || !hasFeatureFlag(link) || !hasPackAccess(link)) && children.length === 0) return acc;
      acc.push({ ...link, children });
      return acc;
    }, []);
  });

  constructor() {
    this.loadExpandedState();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.autoExpandActiveMenu());
    
    this.autoExpandActiveMenu();
    this.seedSupplyChainChildren();
    this.loadTenantContext();
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
    this.expandedMenus.set(isOpen ? new Set() : new Set([label]));
    this.expandedChildMenus.set(new Set());
    this.saveExpandedState();
  }

  toggleChildMenu(parentLabel: string, childLabel: string) {
    const key = this.childKey(parentLabel, childLabel);
    this.expandedChildMenus.update((menus) => {
      const next = new Set(menus);
      const parentPrefix = `${parentLabel}::`;
      for (const existing of Array.from(next)) {
        if (existing.startsWith(parentPrefix)) next.delete(existing);
      }
      if (next.has(key)) {
        next.delete(key);
      } else {
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

  private seedSupplyChainChildren() {
    if (this.seededChildMenus) return;
    const supplyChain = this.navLinks().find((link) => link.label === 'Supply Chain');
    if (!supplyChain?.children?.length) return;
    const next = new Set<string>();
    const firstExpandable = supplyChain.children.find((child) => child.children?.length);
    if (firstExpandable) {
      next.add(this.childKey(supplyChain.label, firstExpandable.label));
    }
    if (next.size > 0) {
      this.expandedChildMenus.set(next);
    }
    this.seededChildMenus = true;
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
