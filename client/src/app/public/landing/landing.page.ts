import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { finalize } from 'rxjs';

import { CrmLandingService } from './services/crm-landing.service';
import { CrmLandingVm } from './models/crm-landing.models';
import { AppToastService } from '../../core/app-toast.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    TextareaModule
  ],
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPage implements OnInit {
  private readonly svc = inject(CrmLandingService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(AppToastService);

  vm: CrmLandingVm | null = null;
  currentYear = new Date().getFullYear();
  showDemoForm = false;
  showDemoSuccess = false;
  submittingDemo = false;
  demoSubmitted = false;
  minDemoDateTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
  readonly teamSizeOptions = [
    { label: '1-10', value: '1-10' },
    { label: '11-50', value: '11-50' },
    { label: '51-200', value: '51-200' },
    { label: '201-1000', value: '201-1000' },
    { label: '1000+', value: '1000+' }
  ];

  readonly demoForm = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.maxLength(120)]],
    workEmail: ['', [Validators.required, Validators.email, Validators.maxLength(160)]],
    company: ['', [Validators.required, Validators.maxLength(160)]],
    roleTitle: ['', [Validators.required, Validators.maxLength(120)]],
    phone: ['', [Validators.required, Validators.maxLength(40)]],
    teamSize: ['', [Validators.required]],
    preferredDateTime: [null as Date | null, [Validators.required, this.min24HoursValidator.bind(this)]],
    timezone: [Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC', [Validators.required, Validators.maxLength(80)]],
    useCase: ['', [Validators.required, Validators.maxLength(1200)]]
  });

  ngOnInit(): void {
    this.vm = this.svc.getVm();
  }

  onGetStarted(): void {
    // TODO: route to auth/register or app shell
    console.log('Get Started');
  }

  onWatchDemo(): void {
    this.refreshMinDemoDateTime();
    this.showDemoForm = true;
    this.showDemoSuccess = false;
    this.demoSubmitted = false;
  }

  onSignIn(): void {
    void this.router.navigate(['/login']);
  }

  closeDemoForm(): void {
    if (this.submittingDemo) {
      return;
    }
    this.showDemoForm = false;
  }

  submitDemoRequest(): void {
    if (this.submittingDemo) {
      return;
    }
    if (this.demoForm.invalid) {
      this.demoForm.markAllAsTouched();
      return;
    }

    this.submittingDemo = true;
    const payload = this.demoForm.getRawValue();
    this.svc
      .bookDemo({
        fullName: payload.fullName,
        workEmail: payload.workEmail,
        company: payload.company,
        roleTitle: payload.roleTitle,
        phone: payload.phone,
        teamSize: payload.teamSize,
        preferredDate: this.formatDate(payload.preferredDateTime),
        preferredTime: this.formatTimeSlot(payload.preferredDateTime),
        timezone: payload.timezone,
        useCase: payload.useCase,
        landingPageUrl: typeof window !== 'undefined' ? window.location.href : null
      })
      .pipe(finalize(() => (this.submittingDemo = false)))
      .subscribe({
        next: () => {
          this.demoSubmitted = true;
          this.showDemoForm = false;
          this.showDemoSuccess = true;
          this.demoForm.reset({
            fullName: '',
            workEmail: '',
            company: '',
            roleTitle: '',
            phone: '',
            teamSize: '',
            preferredDateTime: null,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
            useCase: ''
          });
          this.toastService.show('success', 'Thanks for contacting us. Our team will reach out shortly.');
        },
        error: () => {
          this.toastService.show('error', 'Unable to submit demo request. Please try again.');
        }
      });
  }

  fieldError(fieldName: keyof typeof this.demoForm.controls, code: string): boolean {
    const control = this.demoForm.controls[fieldName];
    return control.touched && !!control.errors?.[code];
  }

  private formatDate(value: Date | null): string {
    if (!value) {
      return '';
    }
    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, '0');
    const day = `${value.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private formatTimeSlot(value: Date | null): string {
    if (!value) {
      return '';
    }
    const hours = `${value.getHours()}`.padStart(2, '0');
    const minutes = `${value.getMinutes()}`.padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private refreshMinDemoDateTime(): void {
    this.minDemoDateTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
    this.demoForm.controls.preferredDateTime.updateValueAndValidity({ emitEvent: false });
  }

  private min24HoursValidator(control: AbstractControl<Date | null>) {
    const value = control.value;
    if (!value) {
      return null;
    }
    return value.getTime() >= this.minDemoDateTime.getTime() ? null : { min24Hours: true };
  }
}
