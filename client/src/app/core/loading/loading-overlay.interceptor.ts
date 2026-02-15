import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingOverlayService } from './loading-overlay.service';

export const loadingOverlayInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingOverlayService);

  loading.start();
  return next(req).pipe(finalize(() => loading.stop()));
};

