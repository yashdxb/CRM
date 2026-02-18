import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SKIP_LOADING_OVERLAY } from './loading-overlay.context';
import { LoadingOverlayService } from './loading-overlay.service';

export const loadingOverlayInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_LOADING_OVERLAY) || req.url.includes('/api/assistant/')) {
    return next(req);
  }

  const loading = inject(LoadingOverlayService);

  loading.start();
  return next(req).pipe(finalize(() => loading.stop()));
};
