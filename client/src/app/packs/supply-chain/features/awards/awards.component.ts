import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AwardRow, AwardsDataService } from './services/awards-data.service';

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, BreadcrumbsComponent],
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {
  rows: AwardRow[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly awardsService: AwardsDataService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const rfqId = this.route.snapshot.queryParamMap.get('rfqId') ?? undefined;
    this.awardsService.getAwards(rfqId).subscribe({
      next: items => {
        this.rows = this.awardsService.mapRows(items);
      },
      error: () => {
        this.rows = [];
      }
    });
  }

  openAward(row: AwardRow): void {
    if (!row?.id) {
      return;
    }
    this.router.navigate(['/app/supply-chain/awards', row.id]);
  }
}
