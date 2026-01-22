import { HttpInterceptorFn } from '@angular/common/http';
import { readTokenContext } from './token.utils';
import { getTenantKey, resolveTenantKeyFromHost } from '../tenant/tenant.utils';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const context = readTokenContext();
  const token = context?.token ?? localStorage.getItem('auth_token') ?? null;
  const tenantKey = getTenantKey();
  const hostKey = typeof window !== 'undefined' ? resolveTenantKeyFromHost(window.location.hostname) : null;

  const headers: Record<string, string> = {};
  // Avoid forcing the "default" tenant on production root domains so the API can apply its DefaultKey.
  if (tenantKey && !(tenantKey === 'default' && hostKey === null)) {
    headers['X-Tenant-Key'] = tenantKey;
  }

  if (token && !req.url.includes('/api/auth/login')) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const authorized = req.clone({ setHeaders: headers });

  return next(authorized);
};
