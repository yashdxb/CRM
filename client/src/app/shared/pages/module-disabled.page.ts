import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { BreadcrumbsComponent } from '../../core/breadcrumbs';

@Component({
  selector: 'app-module-disabled-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './module-disabled.page.html',
  styleUrl: './module-disabled.page.scss'
})
export class ModuleDisabledPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly featureKey = computed(() => this.route.snapshot.queryParamMap.get('feature') ?? 'unknown.feature');
  protected readonly moduleName = computed(() => this.route.snapshot.queryParamMap.get('module') ?? 'This module');
}
