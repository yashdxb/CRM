import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { readTokenContext } from './token.utils';
export const authGuard = (_route, state) => {
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
