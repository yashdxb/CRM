import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AuditLogQuery, AuditLogResponse } from '../models/audit-log.model';

@Injectable({ providedIn: 'root' })
export class AuditLogService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  search(query: AuditLogQuery) {
    let params = new HttpParams();

    if (query.search) {
      params = params.set('search', query.search);
    }
    if (query.entityType) {
      params = params.set('entityType', query.entityType);
    }
    if (query.action) {
      params = params.set('action', query.action);
    }
    if (query.userId) {
      params = params.set('userId', query.userId);
    }
    if (query.fromUtc) {
      params = params.set('fromUtc', query.fromUtc);
    }
    if (query.toUtc) {
      params = params.set('toUtc', query.toUtc);
    }
    if (query.page) {
      params = params.set('page', String(query.page));
    }
    if (query.pageSize) {
      params = params.set('pageSize', String(query.pageSize));
    }

    return this.http.get<AuditLogResponse>(`${this.baseUrl}/api/audit`, { params });
  }
}
