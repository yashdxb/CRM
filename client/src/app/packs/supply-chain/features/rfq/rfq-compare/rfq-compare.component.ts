import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';

@Component({
  selector: 'app-rfq-compare',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, BreadcrumbsComponent],
  templateUrl: './rfq-compare.component.html',
  styleUrls: ['./rfq-compare.component.scss']
})
export class RfqCompareComponent {
  readonly rows: Array<{ rfq: string; suppliers: number; responses: number; status: string }> = [];
}
