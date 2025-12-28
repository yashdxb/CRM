import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { clearToken, saveToken } from './token.utils';

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
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly currentUserSignal = signal<LoginResponse | null>(null);

  get currentUser() {
    return this.currentUserSignal.asReadonly();
  }

  login(payload: LoginRequest) {
    const url = `${environment.apiUrl}/api/auth/login`;
    return this.http.post<LoginResponse>(url, payload).pipe(
      tap((res) => {
        this.currentUserSignal.set(res);
        saveToken(res.accessToken);
      })
    );
  }

  logout() {
    const url = `${environment.apiUrl}/api/auth/logout`;
    this.http.post<void>(url, {}).subscribe({ error: () => {} });
    this.currentUserSignal.set(null);
    clearToken();
    this.router.navigate(['/login']);
  }
}
