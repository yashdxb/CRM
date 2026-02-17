import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { IftaLabelModule } from 'primeng/iftalabel';
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
    TextareaModule,
    IftaLabelModule
  ],
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPage implements OnInit {
  private readonly torontoZone = 'America/Toronto';
  private readonly svc = inject(CrmLandingService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(AppToastService);
  private readonly destroyRef = inject(DestroyRef);

  vm: CrmLandingVm | null = null;
  currentYear = new Date().getFullYear();
  showDemoForm = false;
  showDemoSuccess = false;
  submittingDemo = false;
  demoSubmitted = false;
  minDemoDateTime = new Date();
  readonly timezoneOptions = this.buildTimeZoneOptions();
  private readonly detectedTimeZone = this.detectBrowserTimeZone();
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
    preferredDateTime: [null as Date | null, [Validators.required, this.torontoBusinessWindowValidator.bind(this)]],
    timezone: [this.detectedTimeZone, [Validators.required, Validators.maxLength(80)]],
    useCase: ['', [Validators.required, Validators.maxLength(1200)]]
  });

  ngOnInit(): void {
    this.vm = this.svc.getVm();
    this.demoForm.controls.timezone.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.demoForm.controls.preferredDateTime.updateValueAndValidity({ emitEvent: false });
      });
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
        preferredDateTimeUtc: this.toUtcFromSelectedTimezone(payload.preferredDateTime, payload.timezone)?.toISOString() ?? '',
        preferredDate: this.formatDate(this.toUtcFromSelectedTimezone(payload.preferredDateTime, payload.timezone)),
        preferredTime: this.formatTimeSlot(this.toUtcFromSelectedTimezone(payload.preferredDateTime, payload.timezone)),
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
            timezone: this.detectedTimeZone,
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
    this.minDemoDateTime = new Date();
    this.demoForm.controls.preferredDateTime.updateValueAndValidity({ emitEvent: false });
  }

  private torontoBusinessWindowValidator(control: AbstractControl<Date | null>) {
    const value = control.value;
    if (!value) {
      return null;
    }
    const selectedTimeZone = control.parent?.get('timezone')?.value as string | null;
    if (!selectedTimeZone) {
      return { invalidTimezone: true };
    }

    const asUtc = this.toUtcFromSelectedTimezone(value, selectedTimeZone);
    if (!asUtc) {
      return { invalidTimezone: true };
    }

    const toronto = this.toTimeZoneParts(asUtc, this.torontoZone);
    const tomorrowToronto = this.toTorontoParts(new Date(Date.now() + 24 * 60 * 60 * 1000));
    const selectedDateKey = this.dateKey(toronto.year, toronto.month, toronto.day);
    const minDateKey = this.dateKey(tomorrowToronto.year, tomorrowToronto.month, tomorrowToronto.day);

    if (selectedDateKey < minDateKey) {
      return { minTorontoDay: true };
    }

    if (toronto.hour < 9 || toronto.hour >= 17) {
      return { outsideTorontoBusinessHours: true };
    }

    return null;
  }

  private toUtcFromSelectedTimezone(localDateTime: Date | null, timeZone: string): Date | null {
    if (!localDateTime || !timeZone) {
      return null;
    }
    const year = localDateTime.getFullYear();
    const month = localDateTime.getMonth() + 1;
    const day = localDateTime.getDate();
    const hour = localDateTime.getHours();
    const minute = localDateTime.getMinutes();
    const second = localDateTime.getSeconds();
    const utcMs = this.getUtcTimestampForZoneLocal(year, month, day, hour, minute, second, timeZone);
    return new Date(utcMs);
  }

  private getUtcTimestampForZoneLocal(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second: number,
    timeZone: string
  ): number {
    const naiveUtcMs = Date.UTC(year, month - 1, day, hour, minute, second);
    const offsetMs = this.getZoneOffsetMs(new Date(naiveUtcMs), timeZone);
    return naiveUtcMs - offsetMs;
  }

  private getZoneOffsetMs(dateUtc: Date, timeZone: string): number {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23'
    });
    const parts = formatter.formatToParts(dateUtc);
    const map = new Map(parts.map((p) => [p.type, p.value]));
    const y = Number(map.get('year'));
    const m = Number(map.get('month'));
    const d = Number(map.get('day'));
    const h = Number(map.get('hour'));
    const min = Number(map.get('minute'));
    const s = Number(map.get('second'));
    const asUtc = Date.UTC(y, m - 1, d, h, min, s);
    return asUtc - dateUtc.getTime();
  }

  private toTorontoParts(date: Date): { year: number; month: number; day: number; hour: number; minute: number } {
    return this.toTimeZoneParts(date, this.torontoZone);
  }

  private toTimeZoneParts(date: Date, timeZone: string): { year: number; month: number; day: number; hour: number; minute: number } {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    });
    const parts = formatter.formatToParts(date);
    const map = new Map(parts.map((p) => [p.type, p.value]));
    return {
      year: Number(map.get('year')),
      month: Number(map.get('month')),
      day: Number(map.get('day')),
      hour: Number(map.get('hour')),
      minute: Number(map.get('minute'))
    };
  }

  private dateKey(year: number, month: number, day: number): number {
    return Number(`${year}${`${month}`.padStart(2, '0')}${`${day}`.padStart(2, '0')}`);
  }

  private detectBrowserTimeZone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  }

  private buildTimeZoneOptions(): Array<{ label: string; value: string }> {
    const fallback = ['UTC', 'America/Toronto', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'Europe/London'];
    const supportedValuesOf = (Intl as unknown as { supportedValuesOf?: (type: string) => string[] }).supportedValuesOf;
    const zones = typeof supportedValuesOf === 'function'
      ? supportedValuesOf('timeZone')
      : fallback;
    return zones.map((zone) => ({ label: zone, value: zone }));
  }
}
