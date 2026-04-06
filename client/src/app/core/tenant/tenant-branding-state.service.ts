import { inject, Injectable, signal } from '@angular/core';
import { TenantBrandingService } from './tenant-branding.service';
import { TenantBranding } from './tenant-branding.model';
import { getTenantKeyForAuthBootstrap } from './tenant.utils';

@Injectable({ providedIn: 'root' })
export class TenantBrandingStateService {
  private readonly brandingService = inject(TenantBrandingService);

  readonly logoUrl = signal<string | null>(null);
  readonly tenantName = signal<string | null>(null);

  /** Load branding for an authenticated user (uses auth token for tenant resolution). */
  loadBranding(): void {
    this.brandingService.getBranding().subscribe({
      next: (b) => this.apply(b),
      error: () => this.clear()
    });
  }

  /** Load branding publicly (pre-auth, e.g. login page). */
  loadPublicBranding(): void {
    const key = getTenantKeyForAuthBootstrap();
    if (!key) {
      this.clear();
      return;
    }
    this.brandingService.getPublicBranding(key).subscribe({
      next: (b) => this.apply(b),
      error: () => this.clear()
    });
  }

  clear(): void {
    this.logoUrl.set(null);
    this.tenantName.set(null);
  }

  private apply(b: TenantBranding): void {
    this.logoUrl.set(b.logoUrl);
    this.tenantName.set(b.tenantName);
  }
}
