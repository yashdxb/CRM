import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from '../../core/breadcrumbs';
import { readTokenContext } from '../../core/auth/token.utils';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule, CheckboxModule, NgIf, BreadcrumbsComponent,
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

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [true]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.error = null;
    this.loading = true;
    const { email, password } = this.form.value;
    const normalizedEmail = String(email ?? '').trim().toLowerCase();
    const normalizedPassword = String(password ?? '');

    this.auth.login({ email: normalizedEmail, password: normalizedPassword }).subscribe({
      next: () => {
        this.loading = false;
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
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        const messageBody = err.error?.message || err.error?.error || null;
        this.error = this.buildErrorText(normalizedEmail, messageBody);
      }
    });
  }

  private buildErrorText(email: string, serverMessage: string | null) {
    const base = `Unable to sign in as ${email || 'the requested user'}.`;
    return serverMessage ? `${base} ${serverMessage}` : `${base} Please check your credentials and try again.`;
  }
}
