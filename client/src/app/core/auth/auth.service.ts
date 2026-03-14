import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, mergeMap, Observable, of, retryWhen, switchMap, tap, throwError, timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { clearToken, saveToken } from './token.utils';
import { getTenantKeyForAuthBootstrap, setTenantKey } from '../tenant/tenant.utils';
import { PresenceService } from '../realtime/presence.service';
import { CrmEventsService } from '../realtime/crm-events.service';

interface LoginRequest {
  email: string;
  password: string;
}

interface EntraLoginRequest {
  idToken: string;
}

export interface PublicAuthConfig {
  localLoginEnabled: boolean;
  entra: {
    enabled: boolean;
    clientId: string;
    authority: string;
    redirectUri: string;
  };
}

interface LoginResponse {
  accessToken: string;
  expiresAtUtc: string;
  email: string;
  fullName: string;
  roles: string[];
  permissions: string[];
  tenantKey: string;
  mustChangePassword: boolean;
}

interface InviteStatusResponse {
  status: 'valid' | 'expired' | 'invalid';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly currentUserSignal = signal<LoginResponse | null>(null);
  private readonly presenceService = inject(PresenceService);
  private readonly crmEventsService = inject(CrmEventsService);
  private apiWarmedUp = false;

  get currentUser() {
    return this.currentUserSignal.asReadonly();
  }

  /**
   * Warm up the API by hitting /health. Useful on login page load
   * to wake up cold App Service instances before the user submits.
   * Resolves immediately if already warmed up in this session.
   */
  warmUpApi(): Observable<boolean> {
    if (this.apiWarmedUp) {
      return of(true);
    }
    const url = `${environment.apiUrl}/health`;
    return this.http.get<unknown>(url).pipe(
      tap(() => { this.apiWarmedUp = true; }),
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  /**
   * Quick connectivity check against the API health endpoint.
   * Returns true if the API is reachable, false otherwise.
   */
  checkApiHealth(): Observable<boolean> {
    const url = `${environment.apiUrl}/health`;
    return this.http.get<unknown>(url).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  login(payload: LoginRequest) {
    const url = `${environment.apiUrl}/api/auth/login`;
    const tenantKey = getTenantKeyForAuthBootstrap();
    return this.http
      .post<LoginResponse>(url, payload, {
        headers: tenantKey ? { 'X-Tenant-Key': tenantKey } : undefined
      })
      .pipe(
      retryWhen((errors) =>
        errors.pipe(
          mergeMap((err, retryIndex) => {
            if (retryIndex >= 3 || !this.isTransientAuthFailure(err)) {
              return throwError(() => err);
            }
            // Exponential backoff: 1s, 2s, 4s
            const delayMs = 1000 * Math.pow(2, retryIndex);
            return timer(delayMs);
          })
        )
      ),
      tap((res) => {
        if (!res?.accessToken) {
          throw new Error('Missing access token.');
        }
        this.currentUserSignal.set(res);
        saveToken(res.accessToken);
        if (res.tenantKey) {
          setTenantKey(res.tenantKey);
        }
        this.presenceService.connect();
        this.crmEventsService.connect();
      })
    );
  }

  getPublicAuthConfig() {
    const url = `${environment.apiUrl}/api/auth/config`;
    const tenantKey = getTenantKeyForAuthBootstrap();
    return this.http.get<PublicAuthConfig>(url, {
      headers: tenantKey ? { 'X-Tenant-Key': tenantKey } : undefined
    });
  }

  loginWithEntra(payload: EntraLoginRequest) {
    const url = `${environment.apiUrl}/api/auth/login/entra`;
    const tenantKey = getTenantKeyForAuthBootstrap();
    return this.http
      .post<LoginResponse>(url, payload, {
        headers: tenantKey ? { 'X-Tenant-Key': tenantKey } : undefined
      })
      .pipe(
        retryWhen((errors) =>
          errors.pipe(
            mergeMap((err, retryIndex) => {
              if (retryIndex >= 3 || !this.isTransientAuthFailure(err)) {
                return throwError(() => err);
              }
              const delayMs = 1000 * Math.pow(2, retryIndex);
              return timer(delayMs);
            })
          )
        ),
        tap((res) => {
          if (!res?.accessToken) {
            throw new Error('Missing access token.');
          }
          this.currentUserSignal.set(res);
          saveToken(res.accessToken);
          if (res.tenantKey) {
            setTenantKey(res.tenantKey);
          }
          this.presenceService.connect();
          this.crmEventsService.connect();
        })
      );
  }

  private isTransientAuthFailure(error: unknown): boolean {
    const status = (error as { status?: number })?.status ?? 0;
    return status === 0 || status === 502 || status === 503 || status === 504;
  }

  changePassword(currentPassword: string, newPassword: string) {
    const url = `${environment.apiUrl}/api/auth/change-password`;
    return this.http.post<void>(url, { currentPassword, newPassword }).pipe(
      tap(() => {
        // Keep local auth state in sync after the forced change-password flow.
        const current = this.currentUserSignal();
        if (current) {
          this.currentUserSignal.set({ ...current, mustChangePassword: false });
        }
      })
    );
  }

  acceptInvite(token: string, newPassword: string) {
    const url = `${environment.apiUrl}/api/auth/accept-invite`;
    return this.http.post<void>(url, { token, newPassword });
  }

  getInviteStatus(token: string) {
    const url = `${environment.apiUrl}/api/auth/invite-status`;
    return this.http.get<InviteStatusResponse>(url, { params: { token } });
  }

  logout() {
    const url = `${environment.apiUrl}/api/auth/logout`;
    this.http.post<void>(url, {}).subscribe({ error: () => {} });
    this.currentUserSignal.set(null);
    this.presenceService.disconnect();
    this.crmEventsService.disconnect();
    clearToken();
    this.router.navigate(['/login']);
  }
}
