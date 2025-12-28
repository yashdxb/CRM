import { Injectable, signal, computed } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  path: string;
  icon?: string;
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private readonly _breadcrumbs = signal<Breadcrumb[]>([]);
  private readonly _pageTitle = signal<string>('');

  readonly breadcrumbs = this._breadcrumbs.asReadonly();
  readonly pageTitle = this._pageTitle.asReadonly();
  readonly hasBreadcrumbs = computed(() => this._breadcrumbs().length > 1);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumbs();
      });
  }

  private updateBreadcrumbs(): void {
    const breadcrumbs: Breadcrumb[] = [];
    let currentRoute: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;

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

  private getFullPath(route: ActivatedRouteSnapshot): string {
    const segments: string[] = [];
    let current: ActivatedRouteSnapshot | null = route;

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
  setBreadcrumbs(breadcrumbs: Breadcrumb[]): void {
    this._breadcrumbs.set(breadcrumbs);
    if (breadcrumbs.length > 0) {
      this._pageTitle.set(breadcrumbs[breadcrumbs.length - 1].label);
    }
  }

  /**
   * Append a breadcrumb (useful for dynamic detail pages)
   */
  appendBreadcrumb(label: string, path?: string): void {
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
}
