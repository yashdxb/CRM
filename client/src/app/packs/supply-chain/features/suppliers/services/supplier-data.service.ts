
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface UpsertSupplierRequest {
  name: string;
  category?: string;
  status?: string;
  country?: string;
  website?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
}

export interface SupplierDetailResponse {
  id: string;
  name: string;
  category?: string;
  status?: string;
  country?: string;
  website?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
}

export interface SupplierListItem {
  id: string;
  name: string;
  category: string;
  status: string;
  country: string;
}

export interface SupplierSearchResponse {
  items: SupplierListItem[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class SupplierDataService {
  private readonly http = inject(HttpClient);

  getSuppliers(params: { search?: string; status?: string; page?: number; pageSize?: number }) {
    let httpParams = new HttpParams();
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.status) httpParams = httpParams.set('status', params.status);
    if (params.page) httpParams = httpParams.set('page', params.page);
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<SupplierSearchResponse>('/api/supply-chain/suppliers', { params: httpParams });
  }

  getSupplier(id: string): Observable<SupplierDetailResponse> {
    return this.http.get<SupplierDetailResponse>(`/api/supply-chain/suppliers/${id}`);
  }

  createSupplier(request: UpsertSupplierRequest): Observable<SupplierDetailResponse> {
    return this.http.post<SupplierDetailResponse>(`/api/supply-chain/suppliers`, request);
  }

  updateSupplier(id: string, request: UpsertSupplierRequest): Observable<SupplierDetailResponse> {
    return this.http.put<SupplierDetailResponse>(`/api/supply-chain/suppliers/${id}`, request);
  }

  deleteSupplier(id: string) {
    return this.http.delete(`/api/supply-chain/suppliers/${id}`);
  }
}
