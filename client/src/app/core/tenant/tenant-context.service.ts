import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface TenantContext {
  id: string;
  key: string;
  name: string;
  industryPreset?: string | null;
  industryModules?: string[];
}

@Injectable({ providedIn: 'root' })
export class TenantContextService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getTenantContext() {
    return this.http.get<TenantContext>(`${this.baseUrl}/api/tenant-context`);
  }
}
