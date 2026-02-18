import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingOverlayService } from './loading-overlay.service';

export const loadingOverlayInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/api/assistant/chat')) {
    return next(req);
  }

  const loading = inject(LoadingOverlayService);

  loading.start();
  return next(req).pipe(finalize(() => loading.stop()));
};
