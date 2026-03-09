import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { environment } from '../../../environments/environment';
import { AuthShellComponent } from '../auth/auth-shell.component';

@Component({
  selector: 'app-email-unsubscribe-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    AuthShellComponent
  ],
  templateUrl: './email-unsubscribe.page.html',
  styleUrl: './email-unsubscribe.page.scss'
})
export class EmailUnsubscribePage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  protected readonly submitting = signal(false);
  protected readonly done = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    tenantId: ['', Validators.required],
    reason: ['']
  });

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email') ?? '';
    const tenantId = this.route.snapshot.queryParamMap.get('tenantId') ?? '';
    this.form.patchValue({ email, tenantId });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    const payload = {
      email: this.form.value.email!,
      tenantId: this.form.value.tenantId!,
      reason: this.form.value.reason || undefined
    };

    this.http.post(`${this.baseUrl}/api/marketing/public/unsubscribe`, payload).subscribe({
      next: () => {
        this.submitting.set(false);
        this.done.set(true);
      },
      error: () => {
        this.submitting.set(false);
        this.errorMessage.set('Something went wrong. Please try again later.');
      }
    });
  }
}
