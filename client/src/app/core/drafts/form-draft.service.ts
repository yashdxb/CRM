import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { FormDraftDetail, FormDraftEntityType, FormDraftListResponse, SaveFormDraftRequest } from './form-draft.model';

@Injectable({ providedIn: 'root' })
export class FormDraftService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  list(entityType: FormDraftEntityType, options?: { limit?: number; page?: number; pageSize?: number }) {
    let params = new HttpParams().set('entityType', entityType);
    if (options?.limit != null) {
      params = params.set('limit', options.limit);
    }
    if (options?.page != null) {
      params = params.set('page', options.page);
    }
    if (options?.pageSize != null) {
      params = params.set('pageSize', options.pageSize);
    }

    return this.http.get<FormDraftListResponse>(`${this.baseUrl}/api/drafts`, { params });
  }

  get(id: string) {
    return this.http.get<FormDraftDetail>(`${this.baseUrl}/api/drafts/${id}`);
  }

  save(request: SaveFormDraftRequest) {
    return this.http.post<FormDraftDetail>(`${this.baseUrl}/api/drafts`, request);
  }

  complete(id: string) {
    return this.http.post<void>(`${this.baseUrl}/api/drafts/${id}/complete`, {});
  }

  discard(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/api/drafts/${id}`);
  }
}
