import { HttpInterceptorFn } from '@angular/common/http';
import { readTokenContext } from './token.utils';
import { getTenantKey } from '../tenant/tenant.utils';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const context = readTokenContext();
  const token = context?.token;
  const tenantKey = getTenantKey();

  const headers: Record<string, string> = {
    'X-Tenant-Key': tenantKey
  };

  if (token && !req.url.includes('/api/auth/login')) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const authorized = req.clone({ setHeaders: headers });

  return next(authorized);
};
