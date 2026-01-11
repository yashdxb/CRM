import { Component, inject, computed } from '@angular/core';
import { NgIf } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [NgIf, BreadcrumbModule],
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"]
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
