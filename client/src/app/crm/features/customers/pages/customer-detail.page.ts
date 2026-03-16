import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { Tree } from 'primeng/tree';
import { TreeNode } from 'primeng/api';

import { CustomerDataService } from '../services/customer-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { CustomerDetail, AccountTeamMember, AccountTimelineEntry, AccountRelatedRecords } from '../models/customer.model';
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
    BreadcrumbsComponent,
    Tree
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
  protected timeline = signal<AccountTimelineEntry[]>([]);
  protected timelineLoading = signal(false);
  protected relatedTreeNodes = signal<TreeNode[]>([]);

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
    this.loadTimeline(id);
  }

  private loadDetail(id: string): void {
    this.loading.set(true);
    this.customerData.getDetail(id).subscribe({
      next: (detail) => {
        this.customer.set(detail);
        this.teamMembers.set(detail.teamMembers ?? []);
        this.loading.set(false);
        // Build related records tree from detail response
        const rel = detail.relatedRecords;
        this.relatedTreeNodes.set(this.buildRelatedTree(rel ?? { contacts: [], opportunities: [], leads: [], supportCases: [] }));
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

  private loadTimeline(id: string): void {
    this.timelineLoading.set(true);
    this.customerData.getTimeline(id).subscribe({
      next: (entries) => {
        this.timeline.set(entries);
        this.timelineLoading.set(false);
      },
      error: () => {
        this.timeline.set([]);
        this.timelineLoading.set(false);
      }
    });
  }

  private buildRelatedTree(data: AccountRelatedRecords): TreeNode[] {
    const makeChildren = (items: { id: string; label: string; subtitle?: string }[], icon: string, type: string): TreeNode[] =>
      items.map(item => ({
        label: item.label,
        data: { id: item.id, type, subtitle: item.subtitle },
        icon,
        leaf: true,
        styleClass: `child-node child-node--${type}`
      }));

    return [
      {
        label: `Contacts (${data.contacts.length})`,
        icon: 'pi pi-id-card',
        expanded: data.contacts.length > 0,
        selectable: false,
        styleClass: 'parent-node parent-node--contacts',
        children: makeChildren(data.contacts, 'pi pi-user', 'contact')
      },
      {
        label: `Opportunities (${data.opportunities.length})`,
        icon: 'pi pi-chart-line',
        expanded: data.opportunities.length > 0,
        selectable: false,
        styleClass: 'parent-node parent-node--opportunities',
        children: makeChildren(data.opportunities, 'pi pi-briefcase', 'opportunity')
      },
      {
        label: `Leads (${data.leads.length})`,
        icon: 'pi pi-bolt',
        expanded: data.leads.length > 0,
        selectable: false,
        styleClass: 'parent-node parent-node--leads',
        children: makeChildren(data.leads, 'pi pi-user-plus', 'lead')
      },
      {
        label: `Support Cases (${data.supportCases.length})`,
        icon: 'pi pi-ticket',
        expanded: data.supportCases.length > 0,
        selectable: false,
        styleClass: 'parent-node parent-node--cases',
        children: makeChildren(data.supportCases, 'pi pi-inbox', 'supportCase')
      }
    ];
  }

  protected onRelatedNodeSelect(event: { node: TreeNode }): void {
    const nodeData = event.node?.data;
    if (!nodeData?.id) return;

    switch (nodeData.type) {
      case 'contact':
        this.router.navigate(['/app/contacts', nodeData.id, 'edit']);
        break;
      case 'opportunity':
        this.router.navigate(['/app/deals', nodeData.id]);
        break;
      case 'lead':
        this.router.navigate(['/app/leads', nodeData.id, 'edit']);
        break;
      case 'supportCase':
        this.router.navigate(['/app/helpdesk/cases', nodeData.id]);
        break;
    }
  }

  protected timelineIcon(type: string): string {
    switch (type) {
      case 'Call': return 'pi pi-phone';
      case 'Email': return 'pi pi-envelope';
      case 'Meeting': return 'pi pi-calendar';
      case 'Task': return 'pi pi-check-square';
      case 'Note': return 'pi pi-file';
      case 'FollowUp': return 'pi pi-replay';
      case 'EmailLog': return 'pi pi-send';
      case 'LinkedEmail': return 'pi pi-link';
      default: return 'pi pi-circle';
    }
  }
}
