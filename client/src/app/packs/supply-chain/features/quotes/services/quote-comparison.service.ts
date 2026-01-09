import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

export interface QuoteComparisonRow {
  supplier: string;
  total: string;
  leadTime: string;
  score: string;
}

interface SupplierQuoteComparisonResponse {
  id: string;
  rfqId: string;
  quoteNumber: string;
  status: string;
  submittedDate: string;
  currency?: string | null;
  totalAmount?: number | null;
  supplierName: string;
}

@Injectable({ providedIn: 'root' })
export class QuoteComparisonService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getComparison(rfqId?: string) {
    let params = new HttpParams();
    if (rfqId) {
      params = params.set('rfqId', rfqId);
    }
    return this.http.get<SupplierQuoteComparisonResponse[]>(`${this.baseUrl}/api/supply-chain/quotes`, { params });
  }

  mapRows(items: SupplierQuoteComparisonResponse[]): QuoteComparisonRow[] {
    return items.map(item => ({
      supplier: item.supplierName,
      total: `${item.currency ?? 'USD'} ${item.totalAmount?.toFixed(2) ?? '0.00'}`,
      leadTime: '—',
      score: '—'
    }));
  }
}
