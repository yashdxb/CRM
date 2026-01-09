import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state';

@Component({
  selector: 'app-pricing-rates',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, EmptyStateComponent],
  templateUrl: './pricing-rates.component.html',
  styleUrls: ['./pricing-rates.component.scss']
})
export class PricingRatesComponent {}
