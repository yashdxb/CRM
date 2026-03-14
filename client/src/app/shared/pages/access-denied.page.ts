import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { BreadcrumbsComponent } from '../../core/breadcrumbs';

@Component({
  selector: 'app-access-denied-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './access-denied.page.html',
  styleUrl: './access-denied.page.scss'
})
export class AccessDeniedPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly moduleName = computed(() => this.route.snapshot.queryParamMap.get('module') ?? 'This area');
  protected readonly permissionKey = computed(() => this.route.snapshot.queryParamMap.get('permission') ?? 'unknown.permission');
}
