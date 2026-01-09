import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent, BreadcrumbService } from '../../../../../core/breadcrumbs';
import { AwardDetail, AwardsDataService } from '../services/awards-data.service';

@Component({
  selector: 'app-award-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule, TagModule, TableModule, BreadcrumbsComponent],
  templateUrl: './award-detail.component.html',
  styleUrls: ['./award-detail.component.scss']
})
export class AwardDetailComponent implements OnInit {
  awardId: string | null = null;
  award: AwardDetail | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly awardsService: AwardsDataService,
    private readonly breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.awardId = this.route.snapshot.paramMap.get('id');
    this.loadAward();
  }

  navigateToList(): void {
    this.router.navigate(['/app/supply-chain/awards']);
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' {
    const normalized = status.toLowerCase();
    if (normalized.includes('award')) {
      return 'success';
    }
    if (normalized.includes('pending') || normalized.includes('review')) {
      return 'warn';
    }
    if (normalized.includes('cancel') || normalized.includes('reject')) {
      return 'danger';
    }
    return 'info';
  }

  formatDate(value: string): string {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return value;
    }
    return parsed.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatCurrency(value?: number | null, currency?: string | null): string {
    if (value === null || value === undefined) {
      return '-';
    }
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'USD',
        maximumFractionDigits: 2
      }).format(value);
    } catch {
      return value.toFixed(2);
    }
  }

  private loadAward(): void {
    if (!this.awardId) {
      this.navigateToList();
      return;
    }

    this.awardsService.getAwardById(this.awardId).subscribe({
      next: (response) => {
        this.award = this.awardsService.mapDetail(response);
        if (this.award) {
          this.breadcrumbService.setBreadcrumbs([
            { label: 'Supply Chain', path: '/app/supply-chain', isActive: false, icon: 'pi-sitemap' },
            { label: 'Awards', path: '/app/supply-chain/awards', isActive: false },
            { label: this.award.awardNumber, path: '', isActive: true }
          ]);
        }
      },
      error: () => {
        this.navigateToList();
      }
    });
  }
}
