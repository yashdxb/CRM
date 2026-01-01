import { Component, inject, computed } from '@angular/core';
import { NgIf } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [NgIf, BreadcrumbModule],
  template: `
    <p-breadcrumb 
      *ngIf="breadcrumbService.breadcrumbs().length"
      [model]="items()" 
      [home]="home"
      styleClass="crm-breadcrumb"
    />
  `,
  styles: [`
    :host {
      display: block;
      margin-bottom: var(--md-space-2, 0.5rem);
    }

    :host ::ng-deep .crm-breadcrumb {
      /* Glass morphism background */
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 12px;
      padding: 0.625rem 1rem;
      box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.04),
        inset 0 1px 0 rgba(255, 255, 255, 0.6);
    }

    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-list {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin: 0;
      padding: 0;
    }

    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-item {
      display: flex;
      align-items: center;
    }

    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-item-link {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      color: var(--text-subtle, #64748b);
      text-decoration: none;
      font-size: 0.8125rem;
      font-weight: 500;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-item-link:hover {
      color: var(--brand-primary, #6366f1);
      background: rgba(99, 102, 241, 0.08);
    }

    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-item:last-child .p-breadcrumb-item-link {
      color: var(--text-strong, #1e293b);
      font-weight: 600;
      pointer-events: none;
    }

    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-separator {
      color: var(--text-subtle, #94a3b8);
      margin: 0 0.125rem;
      font-size: 0.75rem;
    }

    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-home-icon {
      color: var(--text-subtle, #64748b);
      font-size: 0.875rem;
    }

    :host ::ng-deep .crm-breadcrumb .p-breadcrumb-home:hover .p-breadcrumb-home-icon {
      color: var(--brand-primary, #6366f1);
    }
  `]
})
export class BreadcrumbsComponent {
  protected readonly breadcrumbService = inject(BreadcrumbService);

  home: MenuItem = { 
    icon: 'pi pi-home', 
    routerLink: ['/app/dashboard']
  };

  items = computed<MenuItem[]>(() => {
    // Skip the first breadcrumb if it's "Home" since we have a home icon
    const crumbs = this.breadcrumbService.breadcrumbs();
    const filteredCrumbs = crumbs.filter(c => c.label !== 'Home');
    
    return filteredCrumbs.map(crumb => ({
      label: crumb.label,
      icon: crumb.icon ? `pi ${crumb.icon}` : undefined,
      routerLink: crumb.isActive ? undefined : [crumb.path]
    }));
  });
}
