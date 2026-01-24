import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../core/auth/auth.service';
import { AuthShellComponent } from './auth-shell.component';
import { finalize, timeout } from 'rxjs';

@Component({
  selector: 'app-accept-invite-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    AuthShellComponent
  ],
  templateUrl: './accept-invite.page.html',
  styleUrls: ['./accept-invite.page.scss']
})
export class AcceptInvitePage implements OnInit {
  loading = false;
  status: { tone: 'success' | 'error'; message: string } | null = null;
  showSuccessDialog = false;
  precheckMessage: string | null = null;
  checkingInvite = false;

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

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token') ?? '';
    if (!token) {
      this.precheckMessage = 'Invite link is missing or invalid.';
      return;
    }

    this.checkingInvite = true;
    this.auth
      .getInviteStatus(token)
      // Avoid keeping the page in a loading state if the network stalls.
      .pipe(
        timeout(12000),
        finalize(() => {
          this.checkingInvite = false;
        })
      )
      .subscribe({
        next: (res) => {
          if (res.status !== 'valid') {
            this.precheckMessage = res.message;
          }
        },
        error: () => {
          this.precheckMessage = 'Invite link is invalid or expired.';
        }
      });
  }

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
    this.auth
      .acceptInvite(token, String(newPassword))
      // Ensure the submit button is re-enabled if the request hangs.
      .pipe(
        timeout(15000),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.status = null;
          this.showSuccessDialog = true;
        },
        error: () => {
          this.status = { tone: 'error', message: 'Invite link is invalid or expired.' };
        }
      });
  }

  private passwordMatchValidator(group: any) {
    const next = group?.get('newPassword')?.value;
    const confirm = group?.get('confirmPassword')?.value;
    return next && confirm && next !== confirm ? { passwordMismatch: true } : null;
  }

  goToLogin() {
    this.showSuccessDialog = false;
    this.router.navigate(['/login']);
  }
}
