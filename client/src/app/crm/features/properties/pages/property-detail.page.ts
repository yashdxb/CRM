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
    const diffMs = Date.now() - new Date(prop.createdAtUtc).getTime();
    return Math.max(Math.round(diffMs / 86_400_000), 0);
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
