import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ItemMaster, ItemMasterSearchRequest, ItemMasterSearchResponse, ItemMasterUpsertRequest } from '../models/item-master.model';

@Injectable({ providedIn: 'root' })
export class ItemMasterDataService {
  private readonly baseUrl = `${environment.apiUrl}/api/supply-chain/item-master`;

  constructor(private readonly http: HttpClient) {}

  search(request: ItemMasterSearchRequest): Observable<ItemMasterSearchResponse> {
    let params = new HttpParams();
    if (request.search) params = params.set('search', request.search);
    if (request.category) params = params.set('category', request.category);
    if (request.isActive !== undefined) params = params.set('isActive', request.isActive);
    if (request.page) params = params.set('page', request.page);
    if (request.pageSize) params = params.set('pageSize', request.pageSize);
    return this.http.get<ItemMasterSearchResponse>(this.baseUrl, { params });
  }

  getById(id: string): Observable<ItemMaster> {
    return this.http.get<ItemMaster>(`${this.baseUrl}/${id}`);
  }

  create(payload: ItemMasterUpsertRequest): Observable<ItemMaster> {
    return this.http.post<ItemMaster>(this.baseUrl, payload);
  }

  update(id: string, payload: ItemMasterUpsertRequest): Observable<ItemMaster> {
    return this.http.put<ItemMaster>(`${this.baseUrl}/${id}`, payload);
  }

  toggleActive(id: string): Observable<ItemMaster> {
    return this.http.post<ItemMaster>(`${this.baseUrl}/${id}/toggle-active`, {});
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
