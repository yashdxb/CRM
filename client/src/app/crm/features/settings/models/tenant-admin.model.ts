export interface TenantSummary {
  id: string;
  key: string;
  name: string;
  createdAtUtc: string;
  industryPreset?: string | null;
  industryModules?: string[] | null;
}

export interface CreateTenantRequest {
  key: string;
  name: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
  timeZone?: string | null;
  currency?: string | null;
  industryPreset?: string | null;
  industryModules?: string[] | null;
}
