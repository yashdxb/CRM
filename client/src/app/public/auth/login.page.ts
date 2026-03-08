import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
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
  private entraClientId = environment.auth?.entra?.clientId ?? '';
  private entraAuthority = environment.auth?.entra?.authority ?? 'https://login.microsoftonline.com/organizations';
  private entraRedirectUri = environment.auth?.entra?.redirectUri ?? (typeof window !== 'undefined' ? `${window.location.origin}/login` : '/login');

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [true]
    });
  }

  ngOnInit(): void {
    this.auth.getPublicAuthConfig().subscribe({
      next: (config) => {
        this.localLoginEnabled = config.localLoginEnabled;
        this.entraEnabled = !!config.entra?.enabled;
        this.entraClientId = config.entra?.clientId || this.entraClientId;
        this.entraAuthority = config.entra?.authority || this.entraAuthority;
        this.entraRedirectUri = config.entra?.redirectUri || this.entraRedirectUri;
        this.cdr.detectChanges();
      },
      error: () => {
        this.localLoginEnabled = true;
        this.entraEnabled = !!environment.auth?.entra?.enabled;
        this.cdr.detectChanges();
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
        this.error = `Unable to sign in as ${normalizedEmail || 'the requested user'}. Request timed out. Please try again.`;
        this.cdr.detectChanges();
      });
    }, 15000);

    this.auth
      .login({ email: normalizedEmail, password: normalizedPassword })
      .pipe(
        timeout(15000),
        finalize(() => {
          window.clearTimeout(timeoutId);
          this.loading = false;
          if (!timedOut && !this.error && !readTokenContext()) {
            this.showErrors = true;
            this.error = `Unable to sign in as ${normalizedEmail || 'the requested user'}. Please check your credentials and try again.`;
            this.cdr.detectChanges();
          }
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
              this.showErrors = true;
              this.error = `Unable to sign in as ${normalizedEmail || 'the requested user'}. Request timed out. Please try again.`;
              this.cdr.detectChanges();
              return;
            }
            const httpError = err as HttpErrorResponse | null;
            const messageBody = httpError?.error?.message || httpError?.error?.error || null;
            this.showErrors = true;
            this.error = this.buildErrorText(normalizedEmail, messageBody, httpError?.status);
            this.cdr.detectChanges();
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
            this.loading = false;
            this.cdr.detectChanges();
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
            this.cdr.detectChanges();
          }
        });
    } catch (err) {
      const message = (err as { message?: string })?.message ?? 'Microsoft sign-in failed.';
      this.showErrors = true;
      this.loading = false;
      this.error = message;
      this.cdr.detectChanges();
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
}
