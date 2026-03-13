import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';

import { PropertyDataService } from '../services/property-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { Property } from '../models/property.model';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';

@Component({
  standalone: true,
  selector: 'app-property-detail',
  templateUrl: './property-detail.page.html',
  styleUrls: ['./property-detail.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    SkeletonModule,
    BreadcrumbsComponent
  ]
})
export class PropertyDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly propertyData = inject(PropertyDataService);

  protected property = signal<Property | null>(null);
  protected loading = signal(true);

  protected canEdit = tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.propertiesManage);

  protected daysSinceListed = computed(() => {
    const prop = this.property();
    if (!prop) return 0;
    const ref = prop.listingDateUtc || prop.createdAtUtc;
    const diffMs = Date.now() - new Date(ref).getTime();
    return Math.max(Math.round(diffMs / 86_400_000), 0);
  });

  protected timelineEvents = computed<{ label: string; date: string; icon: string; variant: string }[]>(() => {
    const prop = this.property();
    if (!prop) return [];
    const events: { label: string; date: string; icon: string; variant: string; ts: number }[] = [];
    events.push({ label: 'Record Created', date: prop.createdAtUtc, icon: 'pi-plus-circle', variant: 'created', ts: new Date(prop.createdAtUtc).getTime() });
    if (prop.listingDateUtc) {
      events.push({ label: 'Listed on Market', date: prop.listingDateUtc, icon: 'pi-megaphone', variant: 'listed', ts: new Date(prop.listingDateUtc).getTime() });
    }
    if (prop.updatedAtUtc && prop.updatedAtUtc !== prop.createdAtUtc) {
      events.push({ label: 'Last Updated', date: prop.updatedAtUtc, icon: 'pi-pencil', variant: 'updated', ts: new Date(prop.updatedAtUtc).getTime() });
    }
    if (prop.soldDateUtc) {
      events.push({ label: 'Sold', date: prop.soldDateUtc, icon: 'pi-check-circle', variant: 'sold', ts: new Date(prop.soldDateUtc).getTime() });
    }
    return events.sort((a, b) => a.ts - b.ts);
  });

  protected pricePerSqFt = computed(() => {
    const prop = this.property();
    if (!prop?.listPrice || !prop?.squareFeet || prop.squareFeet === 0) return null;
    return Math.round(prop.listPrice / prop.squareFeet);
  });

  protected photoUrlList = computed(() => {
    const prop = this.property();
    if (!prop?.photoUrls) return [];
    return prop.photoUrls.split(',').map(u => u.trim()).filter(u => u.length > 0);
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/app/properties']);
      return;
    }
    this.loadProperty(id);
  }

  private loadProperty(id: string): void {
    this.loading.set(true);
    this.propertyData.getById(id).subscribe({
      next: (prop) => {
        this.property.set(prop);
        this.loading.set(false);
      },
      error: () => {
        this.router.navigate(['/app/properties']);
      }
    });
  }

  protected formatCurrency(amount: number | undefined, currency: string | undefined): string {
    if (amount == null) return '—';
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'CAD', maximumFractionDigits: 0 }).format(amount);
    } catch {
      return `$${amount.toLocaleString()}`;
    }
  }

  protected statusClass(status: string): string {
    switch (status) {
      case 'Active': return 'status--active';
      case 'Conditional': return 'status--conditional';
      case 'Sold': return 'status--sold';
      case 'Draft': return 'status--draft';
      case 'Terminated': case 'Expired': case 'Delisted': return 'status--inactive';
      default: return 'status--default';
    }
  }

  protected typeLabel(type: string): string {
    const map: Record<string, string> = {
      SemiDetached: 'Semi-Detached',
      MultiFamily: 'Multi-Family'
    };
    return map[type] || type;
  }
}
