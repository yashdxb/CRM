import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CreateTenantRequest, TenantSummary } from '../models/tenant-admin.model';

export interface UpdateTenantIndustryRequest {
  industryPreset?: string | null;
  industryModules?: string[] | null;
}

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

  updateIndustrySettings(tenantId: string, payload: UpdateTenantIndustryRequest) {
    return this.http.put<TenantSummary>(`${this.baseUrl}/api/tenants/${tenantId}/industry`, payload);
  }
}
