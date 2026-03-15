import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';

import { CustomerDataService } from '../services/customer-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { CustomerDetail, AccountTeamMember } from '../models/customer.model';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';

@Component({
  standalone: true,
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    SkeletonModule,
    BreadcrumbsComponent
  ]
})
export class CustomerDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly customerData = inject(CustomerDataService);

  protected customer = signal<CustomerDetail | null>(null);
  protected loading = signal(true);
  protected teamMembers = signal<AccountTeamMember[]>([]);
  protected teamLoading = signal(false);

  protected canEdit = tokenHasPermission(
    readTokenContext()?.payload ?? null,
    PERMISSION_KEYS.customersManage
  );

  protected accountAgeDays = computed(() => {
    const c = this.customer();
    if (!c) return 0;
    const diffMs = Date.now() - new Date(c.createdAt).getTime();
    return Math.max(Math.round(diffMs / 86_400_000), 0);
  });

  protected healthScoreColor = computed(() => {
    const score = this.customer()?.healthScore ?? 0;
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#3b82f6';
    if (score >= 40) return '#f59e0b';
    if (score >= 20) return '#f97316';
    return '#ef4444';
  });

  protected healthScoreLabel = computed(() => {
    const score = this.customer()?.healthScore ?? 0;
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    if (score >= 20) return 'Poor';
    return 'Critical';
  });

  protected billingAddress = computed(() => {
    const c = this.customer();
    if (!c) return null;
    const parts = [c.billingStreet, c.billingCity, c.billingState, c.billingPostalCode, c.billingCountry]
      .filter(Boolean);
    return parts.length ? parts.join(', ') : null;
  });

  protected shippingAddress = computed(() => {
    const c = this.customer();
    if (!c) return null;
    const parts = [c.shippingStreet, c.shippingCity, c.shippingState, c.shippingPostalCode, c.shippingCountry]
      .filter(Boolean);
    return parts.length ? parts.join(', ') : null;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/app/customers']);
      return;
    }
    this.loadDetail(id);
    this.loadTeam(id);
  }

  private loadDetail(id: string): void {
    this.loading.set(true);
    this.customerData.getDetail(id).subscribe({
      next: (detail) => {
        this.customer.set(detail);
        this.teamMembers.set(detail.teamMembers ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.router.navigate(['/app/customers']);
      }
    });
  }

  private loadTeam(id: string): void {
    this.teamLoading.set(true);
    this.customerData.getTeamMembers(id).subscribe({
      next: (members) => {
        this.teamMembers.set(members);
        this.teamLoading.set(false);
      },
      error: () => {
        this.teamMembers.set([]);
        this.teamLoading.set(false);
      }
    });
  }

  protected statusClass(status: string): string {
    const s = (status || '').toLowerCase();
    if (s === 'customer') return 'status--customer';
    if (s === 'prospect') return 'status--prospect';
    if (s === 'lead') return 'status--lead';
    return 'status--default';
  }

  protected ratingClass(rating: string): string {
    const r = (rating || '').toLowerCase();
    if (r === 'hot') return 'rating--hot';
    if (r === 'warm') return 'rating--warm';
    if (r === 'cold') return 'rating--cold';
    return '';
  }

  protected formatCurrency(amount: number | undefined): string {
    if (amount == null) return '—';
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
    } catch {
      return `$${amount.toLocaleString()}`;
    }
  }

  protected teamMemberInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
  }
}
