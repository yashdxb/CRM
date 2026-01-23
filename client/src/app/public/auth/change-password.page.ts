import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthService } from '../../core/auth/auth.service';
import { finalize, timeout } from 'rxjs';

@Component({
  selector: 'app-change-password-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ProgressSpinnerModule
  ],
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
    { validators: [this.passwordMatchValidator, this.passwordDifferentValidator] }
  );

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status = { tone: 'error', message: this.getValidationMessage() };
      return;
    }

    this.loading = true;
    const { currentPassword, newPassword } = this.form.value;
    this.auth
      .changePassword(String(currentPassword), String(newPassword))
      .pipe(
        timeout(15000),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.status = { tone: 'success', message: 'Password updated successfully.' };
          // Send the user into the app after a successful change.
          this.router.navigate(['/app/dashboard']);
        },
        error: () => {
          this.status = { tone: 'error', message: 'Unable to change password. Verify your current password.' };
        }
      });
  }

  private passwordMatchValidator(group: any) {
    const next = group?.get('newPassword')?.value;
    const confirm = group?.get('confirmPassword')?.value;
    return next && confirm && next !== confirm ? { passwordMismatch: true } : null;
  }

  private passwordDifferentValidator(group: any) {
    const current = group?.get('currentPassword')?.value;
    const next = group?.get('newPassword')?.value;
    return current && next && current === next ? { passwordSame: true } : null;
  }

  private getValidationMessage(): string {
    const current = this.form.get('currentPassword');
    const next = this.form.get('newPassword');
    const confirm = this.form.get('confirmPassword');

    if (current?.hasError('required') || next?.hasError('required') || confirm?.hasError('required')) {
      return 'Please fill out all required fields.';
    }
    if (current?.hasError('minlength')) {
      return 'Current password must be at least 6 characters.';
    }
    if (next?.hasError('minlength') || confirm?.hasError('minlength')) {
      return 'New password must be at least 8 characters.';
    }
    if (this.form.hasError('passwordSame')) {
      return 'New password must be different from the current password.';
    }
    if (this.form.hasError('passwordMismatch')) {
      return 'New password and confirmation do not match.';
    }
    return 'Please confirm your new password.';
  }
}
