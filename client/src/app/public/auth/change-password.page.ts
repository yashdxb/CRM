import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-change-password-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss']
})
export class ChangePasswordPage {
  loading = false;
  status: { tone: 'success' | 'error'; message: string } | null = null;

  private readonly fb = inject(FormBuilder);
  // Build the form after DI is ready to avoid "used before initialization" in AOT builds.
  form = this.fb.group(
    {
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    },
    { validators: this.passwordMatchValidator }
  );

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status = { tone: 'error', message: 'Please complete all fields and confirm your new password.' };
      return;
    }

    this.loading = true;
    const { currentPassword, newPassword } = this.form.value;
    this.auth.changePassword(String(currentPassword), String(newPassword)).subscribe({
      next: () => {
        this.loading = false;
        this.status = { tone: 'success', message: 'Password updated successfully.' };
        // Send the user into the app after a successful change.
        this.router.navigate(['/app/dashboard']);
      },
      error: () => {
        this.loading = false;
        this.status = { tone: 'error', message: 'Unable to change password. Verify your current password.' };
      }
    });
  }

  private passwordMatchValidator(group: any) {
    const next = group?.get('newPassword')?.value;
    const confirm = group?.get('confirmPassword')?.value;
    return next && confirm && next !== confirm ? { passwordMismatch: true } : null;
  }
}
