import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { readTokenContext, tokenHasPermission, tokenHasRole } from './token.utils';
export const roleGuard = (route, state) => {
    const router = inject(Router);
    const context = readTokenContext();
    if (!context) {
        const redirectTo = state?.url ?? '/app/dashboard';
        return router.createUrlTree(['/login'], { queryParams: { redirectTo } });
    }
    const permissionsFromArray = route.data?.['permissions'];
    const singlePermission = route.data?.['permission'];
    const requiredPermissions = permissionsFromArray ?? (singlePermission ? [singlePermission] : []);
    const roleRequirement = route.data?.['role'];
    const allowedPermissions = requiredPermissions.length === 0
        ? true
        : requiredPermissions.some((permission) => tokenHasPermission(context.payload, permission));
    const allowedRole = !roleRequirement || tokenHasRole(context.payload, roleRequirement);
    const allowed = allowedPermissions && allowedRole;
    if (allowed) {
        return true;
    }
    const moduleName = route.data?.['moduleName'];
    const permissionForRoute = requiredPermissions[0];
    return router.createUrlTree(['/app/access-denied'], {
        queryParams: {
            module: moduleName ?? 'This area',
            permission: permissionForRoute ?? 'unknown.permission',
            redirectTo: state?.url ?? '/app/dashboard'
        }
    });
};
