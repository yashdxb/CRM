import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { readTokenContext } from './token.utils';

export const authGuard: CanActivateFn = (_route, state): boolean | UrlTree => {
  const router = inject(Router);
  const context = readTokenContext();

  if (context) {
    return true;
  }

  const redirectTo = state?.url && state.url !== '/login' ? state.url : '/app/dashboard';
  return router.createUrlTree(['/login'], {
    queryParams: redirectTo ? { redirectTo } : undefined
  });
};
