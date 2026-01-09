import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state';

@Component({
  selector: 'app-savings-tracking',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, EmptyStateComponent],
  templateUrl: './savings-tracking.component.html',
  styleUrls: ['./savings-tracking.component.scss']
})
export class SavingsTrackingComponent {}
