import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { SHOW_LOADING_OVERLAY, SKIP_LOADING_OVERLAY } from './loading-overlay.context';
import { LoadingOverlayService } from './loading-overlay.service';
export const loadingOverlayInterceptor = (req, next) => {
    if (req.context.get(SKIP_LOADING_OVERLAY) || req.url.includes('/api/assistant/')) {
        return next(req);
    }
    const loading = inject(LoadingOverlayService);
    const blocking = req.context.get(SHOW_LOADING_OVERLAY);
    loading.start(blocking);
    return next(req).pipe(finalize(() => loading.stop(blocking)));
};
