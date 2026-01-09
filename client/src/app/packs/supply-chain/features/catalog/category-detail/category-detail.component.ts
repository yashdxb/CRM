import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, EmptyStateComponent],
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent {

}
