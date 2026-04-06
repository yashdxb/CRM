import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { TenantBranding } from './tenant-branding.model';

@Injectable({ providedIn: 'root' })
export class TenantBrandingService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getBranding() {
    return this.http.get<TenantBranding>(`${this.baseUrl}/api/tenant-branding`);
  }

  getPublicBranding(tenantKey: string) {
    return this.http.get<TenantBranding>(
      `${this.baseUrl}/api/tenant-branding/public`,
      { params: { tenantKey } }
    );
  }

  uploadLogo(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<TenantBranding>(
      `${this.baseUrl}/api/tenant-branding/logo`,
      formData
    );
  }

  removeLogo() {
    return this.http.delete<void>(`${this.baseUrl}/api/tenant-branding/logo`);
  }
}
