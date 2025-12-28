import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { mockApiInterceptor } from './mocks/mock-api.interceptor';
import { ThemeService } from './core/theme/theme.service';
import { authTokenInterceptor } from './core/auth/auth-token.interceptor';

const httpInterceptors = environment.useMockApi
  ? [mockApiInterceptor, authTokenInterceptor]
  : [authTokenInterceptor];

const httpProvider = provideHttpClient(withInterceptors(httpInterceptors));

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    providePrimeNG({ ripple: true, theme: { preset: Aura } }),
    httpProvider,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ThemeService],
      useFactory: (themeService: ThemeService) => () => themeService.init(environment.theme)
    }
  ]
};
