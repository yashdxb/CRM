import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state';

@Component({
  selector: 'app-corrective-actions',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, EmptyStateComponent],
  templateUrl: './corrective-actions.component.html',
  styleUrls: ['./corrective-actions.component.scss']
})
export class CorrectiveActionsComponent {}
