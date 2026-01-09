import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { RFQ, RFQStatus, RFQType } from '../../../models/rfq.model';

interface RfqListItemResponse {
  id: string;
  rfqNumber: string;
  title: string;
  status: string;
  type?: string | null;
  issueDate: string;
  closeDate?: string | null;
  currency?: string | null;
  buyerName: string;
  responseCount: number;
  supplierCount: number;
}

interface RfqLineResponse {
  id: string;
  lineNumber: number;
  productName?: string | null;
  description?: string | null;
  quantity: number;
  uom?: string | null;
  targetPrice?: number | null;
}

interface RfqDetailResponse {
  id: string;
  rfqNumber: string;
  title: string;
  status: string;
  type?: string | null;
  description?: string | null;
  issueDate: string;
  closeDate?: string | null;
  responseDeadline: string;
  currency?: string | null;
  buyerName: string;
  createdBy: string;
  createdAtUtc: string;
  updatedAtUtc?: string | null;
  responseCount: number;
  supplierCount: number;
  lines: RfqLineResponse[];
}

interface UpsertRfqLineRequest {
  productName?: string | null;
  description?: string | null;
  quantity: number;
  uom?: string | null;
  targetPrice?: number | null;
}

interface UpsertRfqRequest {
  rfqNumber?: string | null;
  title: string;
  description?: string | null;
  type?: string | null;
  status?: string | null;
  issueDate?: string | null;
  closeDate?: string | null;
  responseDeadline?: string | null;
  currency?: string | null;
  lines: UpsertRfqLineRequest[];
}

@Injectable({ providedIn: 'root' })
export class RfqDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getAll() {
    return this.http.get<RfqListItemResponse[]>(`${this.baseUrl}/api/supply-chain/rfqs`);
  }

  getById(id: string) {
    return this.http.get<RfqDetailResponse>(`${this.baseUrl}/api/supply-chain/rfqs/${id}`);
  }

  create(payload: UpsertRfqRequest) {
    return this.http.post<RfqDetailResponse>(`${this.baseUrl}/api/supply-chain/rfqs`, payload);
  }

  update(id: string, payload: UpsertRfqRequest) {
    return this.http.put<void>(`${this.baseUrl}/api/supply-chain/rfqs/${id}`, payload);
  }

  mapListItem(item: RfqListItemResponse): RFQ {
    const type = (Object.values(RFQType) as string[]).includes(item.type ?? '')
      ? (item.type as RFQType)
      : RFQType.RFQ;
    const status = (Object.values(RFQStatus) as string[]).includes(item.status)
      ? (item.status as RFQStatus)
      : RFQStatus.DRAFT;
    const closeDate = item.closeDate ? new Date(item.closeDate) : new Date();
    const issueDate = new Date(item.issueDate);

    return {
      id: item.id,
      buyerId: '',
      buyerName: item.buyerName,
      rfqNumber: item.rfqNumber,
      title: item.title,
      description: '',
      type,
      status,
      issueDate,
      closeDate,
      responseDeadline: closeDate,
      currency: item.currency ?? 'USD',
      createdBy: item.buyerName ?? 'System',
      createdAt: issueDate,
      updatedAt: new Date(),
      lineItems: [],
      invitedSupplierIds: [],
      invitedSupplierCount: item.supplierCount,
      responseCount: item.responseCount
    };
  }

  mapDetail(item: RfqDetailResponse): RFQ {
    const type = (Object.values(RFQType) as string[]).includes(item.type ?? '')
      ? (item.type as RFQType)
      : RFQType.RFQ;
    const status = (Object.values(RFQStatus) as string[]).includes(item.status)
      ? (item.status as RFQStatus)
      : RFQStatus.DRAFT;
    const closeDate = item.closeDate ? new Date(item.closeDate) : new Date(item.responseDeadline);

    return {
      id: item.id,
      buyerId: '',
      buyerName: item.buyerName,
      rfqNumber: item.rfqNumber,
      title: item.title,
      description: item.description ?? '',
      type,
      status,
      issueDate: new Date(item.issueDate),
      closeDate,
      responseDeadline: new Date(item.responseDeadline),
      expectedDeliveryDate: closeDate,
      currency: item.currency ?? 'USD',
      createdBy: item.createdBy,
      createdAt: new Date(item.createdAtUtc),
      updatedAt: item.updatedAtUtc ? new Date(item.updatedAtUtc) : undefined,
      lineItems: item.lines.map(line => ({
        id: line.id,
        productName: line.productName ?? line.description ?? `Line ${line.lineNumber}`,
        description: line.description ?? '',
        quantity: line.quantity,
        uom: line.uom ?? '',
        targetPrice: line.targetPrice ?? undefined,
        specifications: undefined
      })),
      invitedSupplierIds: [],
      invitedSupplierCount: item.supplierCount,
      responseCount: item.responseCount
    };
  }

  buildUpsertPayload(rfq: Partial<RFQ>, status?: string): UpsertRfqRequest {
    const lineItems = rfq.lineItems ?? [];
    return {
      rfqNumber: rfq.rfqNumber ?? null,
      title: rfq.title ?? '',
      description: rfq.description ?? null,
      type: rfq.type ?? null,
      status: status ?? rfq.status ?? null,
      issueDate: rfq.issueDate ? new Date(rfq.issueDate).toISOString() : null,
      closeDate: rfq.closeDate ? new Date(rfq.closeDate).toISOString() : null,
      responseDeadline: rfq.responseDeadline ? new Date(rfq.responseDeadline).toISOString() : null,
      currency: rfq.currency ?? null,
      lines: lineItems.map(item => ({
        productName: item.productName ?? null,
        description: item.description ?? null,
        quantity: item.quantity ?? 0,
        uom: item.uom ?? null,
        targetPrice: item.targetPrice ?? null
      }))
    };
  }
}
