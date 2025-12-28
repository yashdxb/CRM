export interface TenantSummary {
  id: string;
  key: string;
  name: string;
  createdAtUtc: string;
}

export interface CreateTenantRequest {
  key: string;
  name: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  timeZone?: string | null;
  currency?: string | null;
}
