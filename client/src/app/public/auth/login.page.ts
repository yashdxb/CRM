import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from '../../core/breadcrumbs';
import { AuthShellComponent } from './auth-shell.component';
import { readTokenContext } from '../../core/auth/token.utils';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, timeout } from 'rxjs';
import { PublicClientApplication } from '@azure/msal-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    NgIf,
    BreadcrumbsComponent,
    AuthShellComponent
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  form: FormGroup;
  loading = false;
  error: string | null = null;
  emailFocused = false;
  passwordFocused = false;
  showErrors = false;
  entraEnabled = !!environment.auth?.entra?.enabled;
  localLoginEnabled = true;
  apiReachable: boolean | null = null;
  private entraClientId = environment.auth?.entra?.clientId ?? '';
  private entraAuthority = environment.auth?.entra?.authority ?? 'https://login.microsoftonline.com/organizations';
  private entraRedirectUri = environment.auth?.entra?.redirectUri ?? (typeof window !== 'undefined' ? `${window.location.origin}/login` : '/login');

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [true]
    });
  }

  ngOnInit(): void {
    // Warm up the API to wake cold App Service instances before the user tries to sign in.
    this.auth.warmUpApi().subscribe((ok) => {
      this.apiReachable = ok;
    });

    this.auth.getPublicAuthConfig().subscribe({
      next: (config) => {
        this.localLoginEnabled = config.localLoginEnabled;
        this.entraEnabled = !!config.entra?.enabled;
        this.entraClientId = config.entra?.clientId || this.entraClientId;
        this.entraAuthority = config.entra?.authority || this.entraAuthority;
        this.entraRedirectUri = config.entra?.redirectUri || this.entraRedirectUri;
      },
      error: () => {
        this.localLoginEnabled = true;
        this.entraEnabled = !!environment.auth?.entra?.enabled;
      }
    });
  }

  submit(): void {
    if (!this.localLoginEnabled) {
      this.showErrors = true;
      this.error = 'Local sign-in is disabled for this tenant. Use Microsoft sign-in.';
      return;
    }
    if (this.form.invalid) {
      this.showErrors = true;
      this.form.markAllAsTouched();
      return;
    }
    this.showErrors = false;
    this.error = null;
    this.loading = true;
    const { email, password } = this.form.value;
    const normalizedEmail = String(email ?? '').trim().toLowerCase();
    const normalizedPassword = String(password ?? '');
    let timedOut = false;
    const timeoutId = window.setTimeout(() => {
      if (!this.loading) {
        return;
      }
      this.zone.run(() => {
        timedOut = true;
        this.loading = false;
        this.showErrors = true;
        // On manual timeout, check API health for diagnostics
        this.auth.checkApiHealth().subscribe((ok) => {
          this.apiReachable = ok;
          this.error = ok
            ? `Unable to sign in as ${normalizedEmail || 'the requested user'}. Request timed out but the server is reachable — please try again.`
            : `Unable to sign in as ${normalizedEmail || 'the requested user'}. The API server is not responding. It may be restarting after a deployment — please wait a moment and try again.`;
        });
      });
    }, 30000);

    this.auth
      .login({ email: normalizedEmail, password: normalizedPassword })
      .pipe(
        timeout(30000),
        finalize(() => {
          this.deferUiUpdate(() => {
            window.clearTimeout(timeoutId);
            this.loading = false;
            if (!timedOut && !this.error && !readTokenContext()) {
              this.showErrors = true;
              this.error = `Unable to sign in as ${normalizedEmail || 'the requested user'}. Please check your credentials and try again.`;
            }
          });
        })
      )
      .subscribe({
        next: () => {
        if (timedOut) {
          return;
        }
        if (!readTokenContext()) {
          this.error = 'Login failed to start a session. Please try again.';
          return;
        }
        const profile = this.auth.currentUser();
        if (profile?.mustChangePassword) {
          // Force invited users to replace their temporary password before entering the app.
          this.router.navigate(['/change-password']);
          return;
        }
        const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
        const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/app/dashboard';
        this.router.navigateByUrl(target);
        },
        error: (err: unknown) => {
          if (timedOut) {
            return;
          }
          this.zone.run(() => {
            if ((err as { name?: string })?.name === 'TimeoutError') {
              // On timeout, check if API is reachable to give a better error
              this.auth.checkApiHealth().subscribe((ok) => {
                this.apiReachable = ok;
                this.showErrors = true;
                this.error = ok
                  ? `Unable to sign in as ${normalizedEmail || 'the requested user'}. Request timed out. The server is reachable — please try again.`
                  : `Unable to sign in as ${normalizedEmail || 'the requested user'}. The API server is not responding. It may be restarting after a deployment — please wait a moment and try again.`;
              });
              return;
            }
            const httpError = err as HttpErrorResponse | null;
            const status = httpError?.status ?? 0;
            const messageBody = httpError?.error?.message || httpError?.error?.error || null;
            this.showErrors = true;
            if (status === 0) {
              // Network error — check API reachability for diagnostic
              this.auth.checkApiHealth().subscribe((ok) => {
                this.apiReachable = ok;
                this.error = ok
                  ? `Unable to sign in as ${normalizedEmail || 'the requested user'}. A network error occurred but the server is reachable. Please try again.`
                  : `Unable to sign in as ${normalizedEmail || 'the requested user'}. Cannot reach the API server (${environment.apiUrl}). It may be restarting — please wait and retry.`;
              });
              return;
            }
            this.error = this.buildErrorText(normalizedEmail, messageBody, httpError?.status);
          });
        }
      });
  }

  async signInWithMicrosoft(): Promise<void> {
    if (!this.entraEnabled || this.loading) {
      return;
    }

    if (!this.entraClientId) {
      this.showErrors = true;
      this.error = 'Microsoft sign-in is not configured.';
      return;
    }

    this.error = null;
    this.loading = true;

    try {
      const client = new PublicClientApplication({
        auth: {
          clientId: this.entraClientId,
          authority: this.entraAuthority,
          redirectUri: this.entraRedirectUri
        },
        cache: {
          cacheLocation: 'localStorage'
        }
      });

      await client.initialize();
      const result = await client.loginPopup({
        scopes: ['openid', 'profile', 'email'],
        prompt: 'select_account'
      });
      const idToken = result.idToken;
      if (!idToken) {
        throw new Error('No Microsoft ID token was returned.');
      }

      this.auth
        .loginWithEntra({ idToken })
        .pipe(
          finalize(() => {
            this.deferUiUpdate(() => {
              this.loading = false;
            });
          })
        )
        .subscribe({
          next: () => {
            if (!readTokenContext()) {
              this.error = 'Microsoft sign-in did not start a session.';
              return;
            }

            const profile = this.auth.currentUser();
            if (profile?.mustChangePassword) {
              this.router.navigate(['/change-password']);
              return;
            }

            const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
            const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/app/dashboard';
            this.router.navigateByUrl(target);
          },
          error: (err: unknown) => {
            const httpError = err as HttpErrorResponse | null;
            const code = httpError?.error?.code || null;
            const messageBody = httpError?.error?.message || httpError?.error?.error || null;
            this.showErrors = true;
            this.error = this.buildErrorText('Microsoft account', messageBody, httpError?.status, code);
          }
        });
    } catch (err) {
      const message = (err as { message?: string })?.message ?? 'Microsoft sign-in failed.';
      this.showErrors = true;
      this.loading = false;
      this.error = message;
    }
  }

  private buildErrorText(email: string, serverMessage: string | null, status?: number, code?: string | null) {
    const base = `Unable to sign in as ${email || 'the requested user'}.`;
    if (status === 0) {
      return `${base} Network error. Please check your connection and try again.`;
    }
    if (code === 'tenant_mismatch') {
      return `${base} No CRM tenant could be resolved for this Microsoft account.`;
    }
    if (code === 'identity_not_linked') {
      return `${base} This Microsoft account is not linked to a CRM user.`;
    }
    if (code === 'email_conflict') {
      return `${base} Multiple CRM users match this Microsoft account. Contact an administrator.`;
    }
    if (code === 'external_audience_blocked') {
      return `${base} External users cannot sign in to the internal CRM workspace.`;
    }
    if (status === 401) {
      return `${base} Invalid email or password.`;
    }
    if (status === 400 && serverMessage?.toLowerCase().includes('tenant')) {
      return `${base} Invalid tenant key.`;
    }
    return serverMessage ? `${base} ${serverMessage}` : `${base} Please check your credentials and try again.`;
  }

  private deferUiUpdate(action: () => void): void {
    window.setTimeout(() => {
      this.zone.run(action);
    });
  }
}
