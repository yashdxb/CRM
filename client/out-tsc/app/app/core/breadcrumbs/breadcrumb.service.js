import { Injectable, signal, computed } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class BreadcrumbService {
    router;
    _breadcrumbs = signal([], ...(ngDevMode ? [{ debugName: "_breadcrumbs" }] : []));
    _pageTitle = signal('', ...(ngDevMode ? [{ debugName: "_pageTitle" }] : []));
    breadcrumbs = this._breadcrumbs.asReadonly();
    pageTitle = this._pageTitle.asReadonly();
    hasBreadcrumbs = computed(() => this._breadcrumbs().length > 1, ...(ngDevMode ? [{ debugName: "hasBreadcrumbs" }] : []));
    constructor(router) {
        this.router = router;
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
            this.updateBreadcrumbs();
        });
    }
    updateBreadcrumbs() {
        const breadcrumbs = [];
        let currentRoute = this.router.routerState.snapshot.root;
        while (currentRoute) {
            if (currentRoute.data['breadcrumb']) {
                const path = this.getFullPath(currentRoute);
                breadcrumbs.push({
                    label: currentRoute.data['breadcrumb'],
                    path: path,
                    icon: currentRoute.data['icon'],
                    isActive: false
                });
            }
            currentRoute = currentRoute.firstChild;
        }
        // Mark last item as active
        if (breadcrumbs.length > 0) {
            breadcrumbs[breadcrumbs.length - 1].isActive = true;
            this._pageTitle.set(breadcrumbs[breadcrumbs.length - 1].label);
        }
        this._breadcrumbs.set(breadcrumbs);
    }
    getFullPath(route) {
        const segments = [];
        let current = route;
        while (current) {
            if (current.url.length > 0) {
                segments.unshift(...current.url.map(s => s.path));
            }
            current = current.parent;
        }
        return '/' + segments.join('/');
    }
    /**
     * Manually set breadcrumbs for dynamic pages (e.g., editing specific records)
     */
    setBreadcrumbs(breadcrumbs) {
        this._breadcrumbs.set(breadcrumbs);
        if (breadcrumbs.length > 0) {
            this._pageTitle.set(breadcrumbs[breadcrumbs.length - 1].label);
        }
    }
    /**
     * Append a breadcrumb (useful for dynamic detail pages)
     */
    appendBreadcrumb(label, path) {
        this._breadcrumbs.update(crumbs => {
            const updated = crumbs.map(c => ({ ...c, isActive: false }));
            updated.push({
                label,
                path: path || '',
                isActive: true
            });
            return updated;
        });
        this._pageTitle.set(label);
    }
    static ɵfac = function BreadcrumbService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BreadcrumbService)(i0.ɵɵinject(i1.Router)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: BreadcrumbService, factory: BreadcrumbService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BreadcrumbService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [{ type: i1.Router }], null); })();
