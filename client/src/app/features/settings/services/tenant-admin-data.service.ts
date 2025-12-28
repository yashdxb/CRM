import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CreateTenantRequest, TenantSummary } from '../models/tenant-admin.model';

@Injectable({ providedIn: 'root' })
export class TenantAdminDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  listTenants() {
    return this.http.get<TenantSummary[]>(`${this.baseUrl}/api/tenants`);
  }

  createTenant(payload: CreateTenantRequest) {
    return this.http.post<TenantSummary>(`${this.baseUrl}/api/tenants`, payload);
  }
}
