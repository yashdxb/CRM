import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbsComponent } from '../../../../../../core/breadcrumbs';

@Component({
  selector: 'app-change-orders',
  standalone: true,
  imports: [CommonModule, ButtonModule, BreadcrumbsComponent],
  templateUrl: './change-orders.component.html',
  styleUrls: ['./change-orders.component.scss']
})
export class ChangeOrdersComponent {}
