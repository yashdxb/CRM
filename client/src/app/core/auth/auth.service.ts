import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { clearToken, saveToken } from './token.utils';
import { setTenantKey } from '../tenant/tenant.utils';
import { PresenceService } from '../realtime/presence.service';

interface LoginRequest {
  email: string;
  password: string;
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

  get currentUser() {
    return this.currentUserSignal.asReadonly();
  }

  login(payload: LoginRequest) {
    const url = `${environment.apiUrl}/api/auth/login`;
    return this.http.post<LoginResponse>(url, payload).pipe(
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
      })
    );
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
    clearToken();
    this.router.navigate(['/login']);
  }
}
