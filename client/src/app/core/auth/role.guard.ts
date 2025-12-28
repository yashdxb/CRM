import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { readTokenContext, tokenHasPermission, tokenHasRole } from './token.utils';

export const roleGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const router = inject(Router);
  const context = readTokenContext();

  if (!context) {
    const redirectTo = state?.url ?? '/app/dashboard';
    return router.createUrlTree(['/login'], { queryParams: { redirectTo } });
  }

  const permissionsFromArray = route.data?.['permissions'] as string[] | undefined;
  const singlePermission = route.data?.['permission'] as string | undefined;
  const requiredPermissions = permissionsFromArray ?? (singlePermission ? [singlePermission] : []);

  const roleRequirement = route.data?.['role'] as string | undefined;

  const allowedPermissions = requiredPermissions.length === 0
    ? true
    : requiredPermissions.some((permission) => tokenHasPermission(context.payload, permission));

  const allowedRole = !roleRequirement || tokenHasRole(context.payload, roleRequirement);

  const allowed = allowedPermissions && allowedRole;
  if (allowed) {
    return true;
  }

  return router.createUrlTree(['/landing']);
};
