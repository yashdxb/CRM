const STORAGE_KEY = 'tenant_key';
const DEFAULT_TENANT = 'default';
const NON_TENANT_HOSTS = new Set(['northedgesystem.com']);
const NON_TENANT_SUBDOMAINS = new Set(['www']);

export function getTenantKey(): string {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_TENANT;
}

export function setTenantKey(value: string) {
  localStorage.setItem(STORAGE_KEY, value);
}

export function resolveTenantKeyFromHost(hostname: string): string | null {
  if (!hostname) {
    return null;
  }

  const lower = hostname.toLowerCase();
  if (lower.endsWith('.azurestaticapps.net') || lower.endsWith('.azurewebsites.net')) {
    return null;
  }

  if (lower === 'localhost' || lower === '127.0.0.1' || lower === '::1') {
    return null;
  }

  const parts = lower.split('.').filter(Boolean);
  if (NON_TENANT_HOSTS.has(lower)) {
    return null;
  }
  if (parts.length >= 3) {
    if (NON_TENANT_SUBDOMAINS.has(parts[0])) {
      return null;
    }
    return parts[0];
  }

  if (parts.length === 2 && parts[1] === 'localhost') {
    return parts[0];
  }

  return null;
}

export function initTenantFromHost() {
  if (typeof window === 'undefined') {
    return;
  }

  const hostname = window.location.hostname.toLowerCase();
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
    setTenantKey(DEFAULT_TENANT);
    return;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  const current = getTenantKey();
  const hostKey = resolveTenantKeyFromHost(window.location.hostname);
  if (hostKey && (!stored || stored === DEFAULT_TENANT)) {
    setTenantKey(hostKey);
    return;
  }

  if (!hostKey && !stored) {
    setTenantKey(DEFAULT_TENANT);
  } else if (!hostKey && stored) {
    // Keep the previously-selected tenant key when we revisit the root domain.
    setTenantKey(stored);
  }
}
