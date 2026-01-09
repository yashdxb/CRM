import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../../core/breadcrumbs';
import { QuoteComparisonRow, QuoteComparisonService } from '../services/quote-comparison.service';

@Component({
  selector: 'app-quote-comparison',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, BreadcrumbsComponent],
  templateUrl: './quote-comparison.component.html',
  styleUrls: ['./quote-comparison.component.scss']
})
export class QuoteComparisonComponent implements OnInit {
  rows: QuoteComparisonRow[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly quoteService: QuoteComparisonService
  ) {}

  ngOnInit(): void {
    const rfqId = this.route.snapshot.queryParamMap.get('rfqId') ?? undefined;
    this.quoteService.getComparison(rfqId).subscribe({
      next: items => {
        this.rows = this.quoteService.mapRows(items);
      },
      error: () => {
        this.rows = [];
      }
    });
  }
}
