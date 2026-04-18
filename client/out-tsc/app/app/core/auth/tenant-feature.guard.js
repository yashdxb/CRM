import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { TenantContextService } from '../tenant/tenant-context.service';
export const tenantFeatureGuard = (route) => {
    const featureFlag = route.data?.['featureFlag'];
    const moduleName = route.data?.['moduleName'];
    if (!featureFlag) {
        return true;
    }
    const router = inject(Router);
    const tenantContextService = inject(TenantContextService);
    return tenantContextService.getTenantContext().pipe(map((context) => {
        const enabled = context.featureFlags?.[featureFlag] === true;
        return enabled
            ? true
            : router.createUrlTree(['/app/module-disabled'], { queryParams: { feature: featureFlag, module: moduleName ?? 'This module' } });
    }), catchError(() => of(router.createUrlTree(['/app/module-disabled'], { queryParams: { feature: featureFlag } }))));
};
