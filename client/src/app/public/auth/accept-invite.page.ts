import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-accept-invite-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './accept-invite.page.html',
  styleUrls: ['./accept-invite.page.scss']
})
export class AcceptInvitePage {
  loading = false;
  status: { tone: 'success' | 'error'; message: string } | null = null;

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  form = this.fb.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    },
    { validators: this.passwordMatchValidator }
  );

  submit() {
    const token = this.route.snapshot.queryParamMap.get('token') ?? '';
    if (!token) {
      this.status = { tone: 'error', message: 'Invite link is missing or invalid.' };
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status = { tone: 'error', message: 'Please confirm a valid password.' };
      return;
    }

    this.loading = true;
    const { newPassword } = this.form.value;
    this.auth.acceptInvite(token, String(newPassword)).subscribe({
      next: () => {
        this.loading = false;
        this.status = { tone: 'success', message: 'Invite accepted. Welcome to North Edge CRM.' };
        this.router.navigate(['/app/dashboard']);
      },
      error: () => {
        this.loading = false;
        this.status = { tone: 'error', message: 'Invite link is invalid or expired.' };
      }
    });
  }

  private passwordMatchValidator(group: any) {
    const next = group?.get('newPassword')?.value;
    const confirm = group?.get('confirmPassword')?.value;
    return next && confirm && next !== confirm ? { passwordMismatch: true } : null;
  }
}
