import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule, CheckboxModule, NgIf],
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

    this.auth.login({ email, password }).subscribe({
      next: () => {
        this.loading = false;
        const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
        const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/app/dashboard';
        this.router.navigateByUrl(target);
      },
      error: () => {
        this.loading = false;
        this.error = 'Invalid credentials. Please try again.';
      }
    });
  }
}
