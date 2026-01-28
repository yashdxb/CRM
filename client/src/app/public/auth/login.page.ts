import { Component, NgZone } from '@angular/core';
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
export class LoginPage {
  form: FormGroup;
  loading = false;
  error: string | null = null;
  emailFocused = false;
  passwordFocused = false;
  showErrors = false;

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

  submit(): void {
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
      });
    }, 15000);

    this.auth
      .login({ email: normalizedEmail, password: normalizedPassword })
      .pipe(
        timeout(15000),
        finalize(() => {
          window.clearTimeout(timeoutId);
          this.loading = false;
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
          if ((err as { name?: string })?.name === 'TimeoutError') {
            this.showErrors = true;
            this.error = `Unable to sign in as ${normalizedEmail || 'the requested user'}. Request timed out. Please try again.`;
            return;
          }
          const httpError = err as HttpErrorResponse | null;
          const messageBody = httpError?.error?.message || httpError?.error?.error || null;
          this.showErrors = true;
          this.error = this.buildErrorText(normalizedEmail, messageBody, httpError?.status);
        }
      });
  }

  private buildErrorText(email: string, serverMessage: string | null, status?: number) {
    const base = `Unable to sign in as ${email || 'the requested user'}.`;
    if (status === 0) {
      return `${base} Network error. Please check your connection and try again.`;
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
