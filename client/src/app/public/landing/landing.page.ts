import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
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
export class LandingPage implements OnInit, AfterViewInit {
  private readonly torontoZone = 'America/Toronto';
  private readonly heroPreviewIntervalMs = 4200;
  private readonly journeyIntervalMs = 4600;
  private readonly svc = inject(CrmLandingService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly toastService = inject(AppToastService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly elRef = inject(ElementRef);

  currentYear = new Date().getFullYear();
  showDemoForm = false;
  showDemoSuccess = false;
  submittingDemo = false;
  demoSubmitted = false;
  minDemoDateTime = new Date();
  isScrolled = false;
  mobileMenuOpen = false;
  activeHeroPreview = 0;
  readonly heroPreviewSlides = [
    { label: 'Pipeline Overview', image: '/assets/landing/kpi-pipeline.png', title: 'Close More Deals with', titleAccent: 'AI-Powered Pipeline Intelligence', subtitle: 'North Edge CRM gives your sales team real-time pipeline visibility, AI-driven lead scoring, and evidence-based forecasting — so every deal in your pipeline is defensible.' },
    { label: 'AI Lead Score', image: '/assets/landing/kpi-lead-score.png', title: 'Focus on Leads that', titleAccent: 'Actually Convert', subtitle: 'Predictive AI scoring ranks every lead so your team spends time on deals most likely to close.' },
    { label: 'Win Rate Summary', image: '/assets/landing/kpi-winrate.png', title: 'Track Win Rates with', titleAccent: 'Precision Analytics', subtitle: 'Evidence-based win rate tracking with drill-down analytics — know exactly what drives your wins.' },
    { label: 'AI Execution Orchestration', image: '/assets/landing/kpi-ai-execution.png', title: 'Automate Actions with', titleAccent: 'AI Execution Orchestration', subtitle: 'Intelligent workflow orchestration powered by AI — automate follow-ups, approvals, and next-best-actions across your pipeline.' }
  ];
  readonly timezoneOptions = this.buildTimeZoneOptions();
  private readonly detectedTimeZone = this.detectBrowserTimeZone();
  private heroPreviewIntervalId: number | null = null;
  private journeyIntervalId: number | null = null;
  private lastHeroPreviewWheelAt = 0;
  activeJourneyStep = 0;

  readonly features = [
    { icon: 'pi-check-square', color: 'primary', title: 'Evidence-Based Qualification', description: 'CQVS-style qualification tracks factor scores, evidence quality, and proof gaps instead of relying on rep optimism alone.' },
    { icon: 'pi-comments', color: 'cyan', title: 'Conversation-Driven Readiness', description: 'The CRM combines email, call, meeting, and activity signals into conversation score and conversion readiness.' },
    { icon: 'pi-sitemap', color: 'green', title: 'Governed Conversion Decisions', description: 'Lead conversion and deal movement can be challenged, coached, approved, or blocked with visible reasons.' },
    { icon: 'pi-chart-line', color: 'purple', title: 'Truth-Based Pipeline Visibility', description: 'Managers see pipeline backed by evidence, health gaps, and readiness signals instead of superficial stage reporting.' },
    { icon: 'pi-file-edit', color: 'orange', title: 'Report Workspace and Library', description: 'Publish, filter, and govern reports through a dedicated workspace with CRM-safe metadata and report server integration.' },
    { icon: 'pi-sliders-h', color: 'slate', title: 'Industry Presets with Tenant Control', description: 'Start from shared industry presets and let each customer customize catalogs, workflows, branding, and reporting without product forks.' }
  ];

  readonly stats = [
    { icon: 'pi-check-circle', value: 4, suffix: '', label: 'Core qualification layers' },
    { icon: 'pi-chart-scatter', value: 6, suffix: '', label: 'Visual KPI report types' },
    { icon: 'pi-sitemap', value: 1, suffix: '', label: 'Approval workflow engine' },
    { icon: 'pi-building', value: 2, suffix: '', label: 'Current vertical preset tracks' }
  ];
  animatedStatValues: number[] = [0, 0, 0, 0];
  private statsAnimated = false;
  private scrollObserver: IntersectionObserver | null = null;

  readonly howItWorks = [
    { title: 'Stand Up Your Workspace', description: 'Configure your tenant, branding, catalogs, workflows, and report library around the way your team actually sells.' },
    { title: 'Qualify with Evidence', description: 'Capture CQVS factors, conversation signals, and proof quality so readiness is visible before the team commits pipeline energy.' },
    { title: 'Operate with Governance', description: 'Convert, approve, report, and coach from one CRM that shows why a lead or deal is strong, weak, blocked, or ready.' }
  ];

  readonly proofPillars = [
    {
      title: 'Generic CRMs store records',
      description: 'North Edge CRM evaluates readiness, evidence, and conversation quality before teams act.'
    },
    {
      title: 'Qualification is not just a score',
      description: 'CQVS factors, evidence notes, readiness, and coaching gaps stay visible across the lifecycle.'
    },
    {
      title: 'Managers get defensible pipeline truth',
      description: 'Pipeline health, coaching queues, approvals, and reporting are tied to the same operating signals.'
    }
  ];

  readonly journeySteps = [
    {
      eyebrow: 'Signal',
      title: 'Conversations become evidence, not just activity',
      summary: 'Inbound replies, discovery notes, and stakeholder participation are turned into visible buyer signals instead of staying buried in the thread.',
      outcome: 'The rep sees what is real, what is missing, and whether momentum is healthy.',
      signals: ['Budget signal detected', 'Finance stakeholder replied', 'Timeline still unclear'],
      metrics: [
        { label: 'Conversation score', value: '78', tone: 'strong' },
        { label: 'Stakeholders engaged', value: '3', tone: 'supporting' },
        { label: 'Days since inbound reply', value: '1', tone: 'supporting' }
      ]
    },
    {
      eyebrow: 'Decision',
      title: 'CQVS qualification shows what is validated versus assumed',
      summary: 'Qualification factors stay tied to evidence quality, so the team can tell whether a deal is truly ready or only optimistic on paper.',
      outcome: 'Managers can challenge weak assumptions before the pipeline absorbs bad opportunities.',
      signals: ['Budget only partially validated', 'Economic buyer identified', 'Problem severity confirmed'],
      metrics: [
        { label: 'CQVS score', value: '64', tone: 'supporting' },
        { label: 'Validated factors', value: '4/6', tone: 'supporting' },
        { label: 'Primary gap', value: 'Budget proof', tone: 'risk' }
      ]
    },
    {
      eyebrow: 'Outcome',
      title: 'Conversion readiness turns evidence into the next action',
      summary: 'The CRM combines qualification quality and conversation strength into one clear operating decision: ready, monitor, coach, or at risk.',
      outcome: 'The rep gets one next action, and the manager gets a defensible reason if review is needed.',
      signals: ['Readiness moved from Coach to Ready', 'Manager review no longer required', 'Convert lead now recommended'],
      metrics: [
        { label: 'Readiness', value: 'Ready', tone: 'strong' },
        { label: 'Manager review', value: 'Not required', tone: 'supporting' },
        { label: 'Next action', value: 'Convert lead', tone: 'strong' }
      ]
    }
  ];

  readonly commercialNotes = [
    'Unlimited internal users under one commercial model',
    'Tenant branding, workflow, and report customization included',
    'Hosted deployment and implementation scope agreed during demo',
    'Ongoing support and rollout model defined per customer engagement'
  ];

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
    this.startHeroPreviewCarousel();
    this.startJourneyCarousel();
    this.demoForm.controls.timezone.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.demoForm.controls.preferredDateTime.updateValueAndValidity({ emitEvent: false });
      });
  }

  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }

  onCardMouseMove(event: MouseEvent): void {
    const card = (event.currentTarget as HTMLElement);
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`);
  }

  onCardMouseLeave(event: MouseEvent): void {
    const card = (event.currentTarget as HTMLElement);
    card.style.transform = '';
    card.style.removeProperty('--glow-x');
    card.style.removeProperty('--glow-y');
  }

  private initScrollAnimations(): void {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (prefersReducedMotion) {
            entry.target.classList.add('scroll-visible');
          } else {
            entry.target.classList.add('scroll-visible');
          }

          if (entry.target.classList.contains('stats-bar') && !this.statsAnimated) {
            this.statsAnimated = true;
            this.animateCounters();
          }

          this.scrollObserver?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const els = this.elRef.nativeElement.querySelectorAll('.scroll-animate');
    els.forEach((el: Element) => this.scrollObserver!.observe(el));

    this.destroyRef.onDestroy(() => this.scrollObserver?.disconnect());
  }

  private animateCounters(): void {
    const duration = 1800;
    const start = performance.now();
    const targets = this.stats.map(s => s.value);

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      this.animatedStatValues = targets.map(t => {
        const v = ease * t;
        return t % 1 !== 0 ? Math.round(v * 10) / 10 : Math.round(v);
      });
      this.cdr.markForCheck();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrolled = (this.document.defaultView?.scrollY ?? 0) > 40;
    if (scrolled !== this.isScrolled) {
      this.isScrolled = scrolled;
      this.cdr.markForCheck();
    }
  }

  scrollTo(id: string): void {
    this.mobileMenuOpen = false;
    const el = this.document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onGetStarted(): void {
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

  goToHeroPreview(index: number): void {
    if (!this.heroPreviewSlides.length) {
      return;
    }
    this.activeHeroPreview = Math.max(0, Math.min(index, this.heroPreviewSlides.length - 1));
    this.cdr.markForCheck();
    this.restartHeroPreviewCarousel();
  }

  goToJourneyStep(index: number): void {
    if (!this.journeySteps.length) {
      return;
    }
    this.activeJourneyStep = Math.max(0, Math.min(index, this.journeySteps.length - 1));
    this.cdr.markForCheck();
    this.restartJourneyCarousel();
  }

  advanceHeroPreview(): void {
    if (!this.heroPreviewSlides.length) {
      return;
    }
    this.activeHeroPreview = (this.activeHeroPreview + 1) % this.heroPreviewSlides.length;
    this.cdr.markForCheck();
    this.restartHeroPreviewCarousel();
  }

  onHeroPreviewWheel(event: WheelEvent): void {
    if (!this.heroPreviewSlides.length) {
      return;
    }
    const now = Date.now();
    if (now - this.lastHeroPreviewWheelAt < 280) {
      event.preventDefault();
      return;
    }
    const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    if (delta === 0) {
      return;
    }
    event.preventDefault();
    this.lastHeroPreviewWheelAt = now;
    if (delta > 0) {
      this.advanceHeroPreview();
      return;
    }
    this.activeHeroPreview =
      (this.activeHeroPreview - 1 + this.heroPreviewSlides.length) % this.heroPreviewSlides.length;
    this.cdr.markForCheck();
    this.restartHeroPreviewCarousel();
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

  private startHeroPreviewCarousel(): void {
    if (typeof window === 'undefined' || this.heroPreviewSlides.length <= 1) {
      return;
    }
    this.stopHeroPreviewCarousel();
    this.heroPreviewIntervalId = window.setInterval(() => {
      this.activeHeroPreview = (this.activeHeroPreview + 1) % this.heroPreviewSlides.length;
      this.cdr.markForCheck();
    }, this.heroPreviewIntervalMs);
    this.destroyRef.onDestroy(() => this.stopHeroPreviewCarousel());
  }

  private restartHeroPreviewCarousel(): void {
    this.startHeroPreviewCarousel();
  }

  private startJourneyCarousel(): void {
    if (typeof window === 'undefined' || this.journeySteps.length <= 1) {
      return;
    }
    this.stopJourneyCarousel();
    this.journeyIntervalId = window.setInterval(() => {
      this.activeJourneyStep = (this.activeJourneyStep + 1) % this.journeySteps.length;
      this.cdr.markForCheck();
    }, this.journeyIntervalMs);
    this.destroyRef.onDestroy(() => this.stopJourneyCarousel());
  }

  private restartJourneyCarousel(): void {
    this.startJourneyCarousel();
  }

  private stopHeroPreviewCarousel(): void {
    if (this.heroPreviewIntervalId !== null && typeof window !== 'undefined') {
      window.clearInterval(this.heroPreviewIntervalId);
      this.heroPreviewIntervalId = null;
    }
  }

  private stopJourneyCarousel(): void {
    if (this.journeyIntervalId !== null && typeof window !== 'undefined') {
      window.clearInterval(this.journeyIntervalId);
      this.journeyIntervalId = null;
    }
  }
}
