const STORAGE_KEY = 'tenant_key';
const DEFAULT_TENANT = 'default';

export function getTenantKey(): string {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_TENANT;
}

export function setTenantKey(value: string) {
  localStorage.setItem(STORAGE_KEY, value);
}
