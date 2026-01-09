import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

export interface AwardRow {
  id: string;
  award: string;
  rfq: string;
  supplier: string;
  status: string;
  date: string;
}

export interface AwardDetailLine {
  id: string;
  lineNumber: number;
  itemName: string;
  uom?: string | null;
  quantity: number;
  targetPrice?: number | null;
  lineTotal?: number | null;
}

export interface AwardDetail {
  id: string;
  awardNumber: string;
  status: string;
  awardDate: string;
  awardAmount: number;
  currency?: string | null;
  notes?: string | null;
  rfqId: string;
  rfqNumber: string;
  rfqTitle: string;
  supplierId: string;
  supplierName: string;
  lines: AwardDetailLine[];
}

interface RfqAwardListItemResponse {
  id: string;
  awardNumber: string;
  status: string;
  awardDate: string;
  awardAmount: number;
  currency?: string | null;
  supplierName: string;
  rfqNumber: string;
}

interface RfqAwardDetailResponse {
  id: string;
  awardNumber: string;
  status: string;
  awardDate: string;
  awardAmount: number;
  currency?: string | null;
  notes?: string | null;
  rfqId: string;
  rfqNumber: string;
  rfqTitle: string;
  supplierId: string;
  supplierName: string;
  lines: Array<{
    id: string;
    lineNumber: number;
    itemName: string;
    uom?: string | null;
    quantity: number;
    targetPrice?: number | null;
    lineTotal?: number | null;
  }>;
}

interface CreateRfqAwardRequest {
  rfqId: string;
  supplierId: string;
  awardNumber?: string | null;
  awardDate?: string | null;
  status?: string | null;
  awardAmount: number;
  currency?: string | null;
  notes?: string | null;
}

@Injectable({ providedIn: 'root' })
export class AwardsDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getAwards(rfqId?: string) {
    let params = new HttpParams();
    if (rfqId) {
      params = params.set('rfqId', rfqId);
    }
    return this.http.get<RfqAwardListItemResponse[]>(`${this.baseUrl}/api/supply-chain/awards`, { params });
  }

  getAwardById(id: string) {
    return this.http.get<RfqAwardDetailResponse>(`${this.baseUrl}/api/supply-chain/awards/${id}`);
  }

  createAward(payload: CreateRfqAwardRequest) {
    return this.http.post<RfqAwardListItemResponse>(`${this.baseUrl}/api/supply-chain/awards`, payload);
  }

  mapRows(items: RfqAwardListItemResponse[]): AwardRow[] {
    return items.map(item => ({
      id: item.id,
      award: item.awardNumber,
      rfq: item.rfqNumber,
      supplier: item.supplierName,
      status: item.status,
      date: new Date(item.awardDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }));
  }

  mapDetail(response: RfqAwardDetailResponse): AwardDetail {
    return {
      id: response.id,
      awardNumber: response.awardNumber,
      status: response.status,
      awardDate: response.awardDate,
      awardAmount: response.awardAmount,
      currency: response.currency ?? undefined,
      notes: response.notes ?? undefined,
      rfqId: response.rfqId,
      rfqNumber: response.rfqNumber,
      rfqTitle: response.rfqTitle,
      supplierId: response.supplierId,
      supplierName: response.supplierName,
      lines: response.lines.map((line) => ({
        id: line.id,
        lineNumber: line.lineNumber,
        itemName: line.itemName,
        uom: line.uom ?? undefined,
        quantity: line.quantity,
        targetPrice: line.targetPrice ?? undefined,
        lineTotal: line.lineTotal ?? undefined
      }))
    };
  }
}
