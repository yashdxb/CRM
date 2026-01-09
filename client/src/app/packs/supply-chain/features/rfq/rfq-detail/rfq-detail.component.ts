// src/app/domains/sourcing/buyer/rfq-management/rfq-detail/rfq-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { RFQ, RFQStatus, RFQType } from '../../../models/rfq.model';
import { RfqDataService } from '../services/rfq-data.service';
import { AwardsDataService } from '../../awards/services/awards-data.service';

@Component({
  selector: 'app-rfq-detail',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TagModule,
    TableModule,
    DividerModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './rfq-detail.component.html',
  styleUrls: ['./rfq-detail.component.scss']
})
export class RfqDetailComponent implements OnInit {
  rfq: RFQ | null = null;
  loading = false;
  awardId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private rfqDataService: RfqDataService,
    private awardsDataService: AwardsDataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRFQ(id);
    }
  }

  loadRFQ(id: string): void {
    this.loading = true;

    this.rfqDataService.getById(id).subscribe({
      next: rfq => {
        this.rfq = this.rfqDataService.mapDetail(rfq);
        this.loading = false;
        this.loadAwardLink();
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Load failed',
          detail: 'Unable to load RFQ details.'
        });
      }
    });
  }

  private loadAwardLink(): void {
    if (!this.rfq) {
      this.awardId = null;
      return;
    }
    this.awardsDataService.getAwards(this.rfq.id).subscribe({
      next: (awards) => {
        this.awardId = awards.length > 0 ? awards[0].id : null;
      },
      error: () => {
        this.awardId = null;
      }
    });
  }

  getStatusSeverity(status: RFQStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    const severityMap: Record<string, 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast'> = {
      [RFQStatus.DRAFT]: 'secondary',
      [RFQStatus.PUBLISHED]: 'info',
      [RFQStatus.IN_PROGRESS]: 'warn',
      [RFQStatus.CLOSED]: 'secondary',
      [RFQStatus.AWARDED]: 'success',
      [RFQStatus.CANCELLED]: 'danger'
    };
    return severityMap[status] || 'secondary';
  }

  getTypeSeverity(type: RFQType): 'success' | 'info' | 'contrast' {
    return type === RFQType.RFQ ? 'success' : 'info';
  }

  goBack(): void {
    this.router.navigate(['/app/supply-chain/rfqs']);
  }

  editRFQ(): void {
    if (this.rfq) {
      this.router.navigate(['/app/supply-chain/rfqs', this.rfq.id, 'edit']);
    }
  }

  publishRFQ(): void {
    if (this.rfq) {
      this.rfq.status = RFQStatus.PUBLISHED;
      this.rfq.publishDate = new Date();
      this.messageService.add({
        severity: 'success',
        summary: 'Published',
        detail: `${this.rfq.rfqNumber} has been published`
      });
    }
  }

  closeRFQ(): void {
    if (this.rfq) {
      this.rfq.status = RFQStatus.CLOSED;
      this.messageService.add({
        severity: 'success',
        summary: 'Closed',
        detail: `${this.rfq.rfqNumber} has been closed`
      });
    }
  }

  cancelRFQ(): void {
    if (this.rfq) {
      this.rfq.status = RFQStatus.CANCELLED;
      this.messageService.add({
        severity: 'warn',
        summary: 'Cancelled',
        detail: `${this.rfq.rfqNumber} has been cancelled`
      });
    }
  }

  viewResponses(): void {
    if (!this.rfq) {
      return;
    }
    this.router.navigate(['/app/supply-chain/quotes'], {
      queryParams: { rfqId: this.rfq.id }
    });
  }

  compareQuotes(): void {
    if (!this.rfq) {
      return;
    }
    this.router.navigate(['/app/supply-chain/quotes'], {
      queryParams: { rfqId: this.rfq.id }
    });
  }

  viewAward(): void {
    if (!this.awardId) {
      return;
    }
    this.router.navigate(['/app/supply-chain/awards', this.awardId]);
  }

  getDaysRemaining(): number {
    if (!this.rfq) return 0;
    const today = new Date();
    const close = new Date(this.rfq.closeDate);
    const diff = close.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
