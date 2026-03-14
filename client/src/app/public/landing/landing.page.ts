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

type PipelinePreviewSlide = {
  type: 'pipeline';
  label: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  boardTitle: string;
  boardSubtitle: string;
  headlineMetric: { label: string; value: string; delta: string };
  stageSummary: Array<{ stage: string; value: string; deals: number; tone: 'rose' | 'amber' | 'cyan' | 'violet' }>;
  metrics: Array<{ label: string; value: string; delta: string }>;
};

type LeadPreviewSlide = {
  type: 'lead';
  label: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  score: number;
  profileName: string;
  profileRole: string;
  readiness: string;
  factors: Array<{ label: string; value: string; tone: 'strong' | 'watch' | 'supporting'; fill: number }>;
};

type DealPreviewSlide = {
  type: 'deal';
  label: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  dealName: string;
  dealAmount: string;
  dealStage: string;
  dealHealth: string;
  dealOwner: string;
  confidence: number;
  confidenceLabel: string;
  nextAction: string;
  approvalStatus: string;
  riskNote: string;
  timeline: Array<{ label: string; meta: string }>;
};

type PropertyPreviewSlide = {
  type: 'property';
  label: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  propertyName: string;
  propertyStatus: string;
  propertyPrice: string;
  propertyStats: Array<{ label: string; value: string; icon: string; tone: 'blue' | 'green' | 'amber' | 'violet' }>;
  propertyFeed: Array<{ label: string; value: string; icon: string }>;
};

type OrchestrationPreviewSlide = {
  type: 'orchestration';
  label: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  boardTitle: string;
  boardSubtitle: string;
  topMetrics: Array<{ label: string; value: string; delta: string; icon: string }>;
  actions: Array<{
    severity: 'critical' | 'important' | 'low';
    rank: string;
    title: string;
    summary: string;
    chips: string[];
    primaryAction: string;
    secondaryAction?: string;
  }>;
};

type HeroPreviewSlide = PipelinePreviewSlide | LeadPreviewSlide | DealPreviewSlide | PropertyPreviewSlide | OrchestrationPreviewSlide;

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
  readonly heroPreviewSlides: HeroPreviewSlide[] = [
    {
      type: 'pipeline',
      label: 'Pipeline Command',
      title: 'Close More Deals with',
      titleAccent: 'AI-Powered Pipeline Intelligence',
      subtitle: 'Sales pipeline by stage with real top-line metrics, commercial movement, and zero reliance on sliced mockup images.',
      boardTitle: 'Pipeline Overview',
      boardSubtitle: 'Sales pipeline by stage',
      headlineMetric: { label: 'This month', value: '$2.4M', delta: '+18.8%' },
      stageSummary: [
        { stage: 'Prospecting', value: '$820K', deals: 58, tone: 'rose' },
        { stage: 'Qualified', value: '$1.2M', deals: 42, tone: 'amber' },
        { stage: 'Proposal', value: '$300K', deals: 18, tone: 'cyan' },
        { stage: 'Negotiation', value: '$30K', deals: 6, tone: 'violet' }
      ],
      metrics: [
        { label: 'New Deals', value: '24', delta: '+9.2%' },
        { label: 'Conversion Rate', value: '58.5%', delta: '+5.7%' },
        { label: 'Avg. Deal Size', value: '551.2K', delta: '+12.4%' },
        { label: 'Forecast Confidence', value: '82%', delta: 'Evidence-backed' }
      ]
    },
    {
      type: 'lead',
      label: 'Lead Intelligence',
      title: 'Focus on Leads that',
      titleAccent: 'Actually Convert',
      subtitle: 'AI scoring, stakeholder engagement, and evidence quality stay in one narrative so reps know what to work next.',
      score: 84,
      profileName: 'Sterling Harbour Realty',
      profileRole: 'Brokerage prospect',
      readiness: 'Ready for conversion',
      factors: [
        { label: 'Conversation signal', value: 'Strong', tone: 'strong', fill: 84 },
        { label: 'Budget proof', value: 'Partial', tone: 'watch', fill: 46 },
        { label: 'Stakeholders engaged', value: '4', tone: 'supporting', fill: 72 }
      ]
    },
    {
      type: 'deal',
      label: 'Deal Execution',
      title: 'Track Win Rates with',
      titleAccent: 'Precision Analytics',
      subtitle: 'Deals move with visible owner, confidence, risk, and next-best-action instead of vague pipeline optimism.',
      dealName: 'South Bay Tower Portfolio',
      dealAmount: '$1.24M',
      dealStage: 'Conditional',
      dealHealth: 'Manager attention',
      dealOwner: 'Robert Lambke',
      confidence: 82,
      confidenceLabel: 'Forecast confidence',
      nextAction: 'Review financing condition before buyer call',
      approvalStatus: '3 approvals complete',
      riskNote: 'One financing document outstanding before closing review',
      timeline: [
        { label: 'Offer submitted', meta: 'Today, 10:20' },
        { label: 'Legal review complete', meta: 'Yesterday' },
        { label: 'Pricing approved', meta: '2 days ago' }
      ]
    },
    {
      type: 'orchestration',
      label: 'AI Execution',
      title: 'Automate Actions with',
      titleAccent: 'AI Execution Orchestration',
      subtitle: 'Priority-driven action queues resolve sales risk with clear severity, review paths, and auto-execute options inside the CRM.',
      boardTitle: 'AI Execution Orchestration',
      boardSubtitle: 'Priority-driven AI actions to resolve sales risks',
      topMetrics: [
        { label: 'AI-Risk Deals', value: '31', delta: '14 today', icon: 'pi pi-chart-line' },
        { label: 'Lead SLA Breaches', value: '2', delta: 'now', icon: 'pi pi-shield' },
        { label: 'Pending Approvals', value: '1', delta: 'live', icon: 'pi pi-verified' }
      ],
      actions: [
        {
          severity: 'critical',
          rank: '#100',
          title: 'Reactivate stale opportunities',
          summary: 'No activity for 7 days on deal worth 3320K',
          chips: ['AI Insight', 'Impact High', 'Urgency Immediate', 'Risk High'],
          primaryAction: 'Review',
          secondaryAction: 'Auto resolve'
        },
        {
          severity: 'important',
          rank: '#88',
          title: 'Clear overdue activity backlog',
          summary: '6 activities overdue across 5 deals',
          chips: ['AI Insight', 'Impact High', 'Urgency Immediate', 'Risk Medium'],
          primaryAction: 'Review'
        },
        {
          severity: 'low',
          rank: '#28',
          title: 'Recover breached first-touch SLAs',
          summary: '3 leads missing first response window',
          chips: ['AI Insight', 'Impact Low', 'Urgency Planned', 'Risk Low'],
          primaryAction: 'Execute'
        }
      ]
    },
    {
      type: 'property',
      label: 'Property Workspace',
      title: 'Operate Listings with',
      titleAccent: 'Connected Property Execution',
      subtitle: 'Property, deal, document, showing, and alert data live in one CRM workspace that managers can actually review.',
      propertyName: '12 Lakeview Crescent',
      propertyStatus: 'Active',
      propertyPrice: '$829,000',
      propertyStats: [
        { label: 'Showings', value: '11', icon: 'pi pi-calendar', tone: 'blue' },
        { label: 'Documents', value: '6', icon: 'pi pi-file', tone: 'amber' },
        { label: 'Alerts', value: '2', icon: 'pi pi-bell', tone: 'violet' },
        { label: 'Qualified buyers', value: '4', icon: 'pi pi-users', tone: 'green' }
      ],
      propertyFeed: [
        { label: 'Price movement', value: 'Reduced 2.1% this week', icon: 'pi pi-chart-line' },
        { label: 'Next showing', value: 'Saturday, 11:00 AM', icon: 'pi pi-clock' },
        { label: 'Document status', value: 'Listing agreement signed', icon: 'pi pi-check-circle' }
      ]
    }
  ];
  readonly timezoneOptions = this.buildTimeZoneOptions();
  private readonly detectedTimeZone = this.detectBrowserTimeZone();
  private heroPreviewIntervalId: number | null = null;
  private lastHeroPreviewWheelAt = 0;
  activeJourneyStep = 0;
  private journeyObserver: IntersectionObserver | null = null;

  readonly features = [
    { icon: 'pi-check-square', color: 'primary', title: 'Evidence-Based Qualification', description: 'CQVS-style qualification tracks factor scores, evidence quality, and proof gaps instead of relying on rep optimism alone.' },
    { icon: 'pi-comments', color: 'cyan', title: 'Conversation-Driven Readiness', description: 'The CRM combines email, call, meeting, and activity signals into conversation score and conversion readiness.' },
    { icon: 'pi-sitemap', color: 'green', title: 'Governed Conversion Decisions', description: 'Lead conversion and deal movement can be challenged, coached, approved, or blocked with visible reasons.' },
    { icon: 'pi-chart-line', color: 'purple', title: 'Truth-Based Pipeline Visibility', description: 'Managers see pipeline backed by evidence, health gaps, and readiness signals instead of superficial stage reporting.' },
    { icon: 'pi-file-edit', color: 'orange', title: 'Report Workspace and Library', description: 'Publish, filter, and govern reports through a dedicated workspace with CRM-safe metadata and report server integration.' },
    { icon: 'pi-sliders-h', color: 'slate', title: 'CRM Vertical Presets with Tenant Control', description: 'Start from shared CRM vertical presets and let each customer customize catalogs, workflows, branding, and reporting without product forks.' }
  ];

  readonly stats = [
    {
      icon: 'pi-chart-line',
      color: 'azure',
      prefix: '',
      value: 82,
      suffix: '%',
      label: 'Forecast confidence',
      description: 'Evidence-backed pipeline confidence instead of stage optimism.'
    },
    {
      icon: 'pi-home',
      color: 'emerald',
      prefix: '',
      value: 11,
      suffix: '',
      label: 'Showings scheduled',
      description: 'Live listing activity, buyer follow-up, and property momentum in one workspace.'
    },
    {
      icon: 'pi-verified',
      color: 'amber',
      prefix: '',
      value: 3,
      suffix: '',
      label: 'Deals need review',
      description: 'Manager approvals, blocked decisions, and risk queues stay visible.'
    },
    {
      icon: 'pi-file-edit',
      color: 'rose',
      prefix: '',
      value: 6,
      suffix: '',
      label: 'Listing documents tracked',
      description: 'Media, agreements, and transaction paperwork stay attached to the record.'
    }
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

  readonly trustSignals = [
    {
      title: 'Implementation is scoped before go-live',
      description: 'Demo qualification, deployment path, rollout sequencing, report publishing, and workflow governance are agreed before the project starts.'
    },
    {
      title: 'Governance is built into the operating model',
      description: 'Approvals, readiness, report publishing, and workspace controls are part of the platform, not layered on after the fact.'
    },
    {
      title: 'Each tenant keeps control without a product fork',
      description: 'Vertical presets, configurable catalogs, branding, workflows, and reports stay tenant-specific while the product remains upgradeable.'
    }
  ];

  readonly demoExpectations = [
    'Map your current lead, deal, and approval flow',
    'Review where CQVS, conversation score, and readiness fit your process',
    'Agree the rollout scope, report set, and implementation model',
    'Confirm whether a shared industry preset or deeper tenant tailoring is the better fit'
  ];

  readonly commercialFaq = [
    {
      question: 'What happens in the demo?',
      answer: 'The demo is a working-product session, not a generic pitch. We review your current process, show the signal-to-decision workflow live, and leave with a scoped rollout direction.'
    },
    {
      question: 'Is this a generic CRM with a few custom screens?',
      answer: 'No. The operating model is different: evidence-based qualification, conversation-driven readiness, governed approvals, and report workspace administration are all part of the product.'
    },
    {
      question: 'Can different customers in the same industry still customize it?',
      answer: 'Yes. The product is built around shared industry presets with tenant-level configuration for workflows, catalogs, reports, branding, and operational vocabulary.'
    },
    {
      question: 'How is pricing handled if the model is one-time payment?',
      answer: 'Commercial scope is agreed during the demo based on deployment, rollout, support, and hosting expectations. The point is to avoid unpredictable per-seat expansion, not to hide scope.'
    }
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
    this.demoForm.controls.timezone.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.demoForm.controls.preferredDateTime.updateValueAndValidity({ emitEvent: false });
      });
  }

  ngAfterViewInit(): void {
    this.initScrollAnimations();
    this.initJourneyObserver();
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

  asPipelineSlide(slide: HeroPreviewSlide): PipelinePreviewSlide {
    return slide as PipelinePreviewSlide;
  }

  asLeadSlide(slide: HeroPreviewSlide): LeadPreviewSlide {
    return slide as LeadPreviewSlide;
  }

  asDealSlide(slide: HeroPreviewSlide): DealPreviewSlide {
    return slide as DealPreviewSlide;
  }

  asPropertySlide(slide: HeroPreviewSlide): PropertyPreviewSlide {
    return slide as PropertyPreviewSlide;
  }

  asOrchestrationSlide(slide: HeroPreviewSlide): OrchestrationPreviewSlide {
    return slide as OrchestrationPreviewSlide;
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
    const nextIndex = Math.max(0, Math.min(index, this.journeySteps.length - 1));
    this.activeJourneyStep = nextIndex;
    this.cdr.markForCheck();
    const target = this.elRef.nativeElement.querySelector(`.journey-step-anchor[data-index="${nextIndex}"]`) as HTMLElement | null;
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  private initJourneyObserver(): void {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }
    if (!window.matchMedia('(min-width: 1025px)').matches) {
      return;
    }
    const anchors = this.elRef.nativeElement.querySelectorAll('.journey-step-anchor');
    if (!anchors.length) {
      return;
    }
    this.journeyObserver?.disconnect();
    this.journeyObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) {
        return;
      }
      const index = Number((visible.target as HTMLElement).dataset['index'] ?? '0');
      if (!Number.isNaN(index) && index !== this.activeJourneyStep) {
        this.activeJourneyStep = index;
        this.cdr.markForCheck();
      }
    }, {
      root: null,
      threshold: [0.35, 0.6, 0.85],
      rootMargin: '-12% 0px -30% 0px'
    });
    anchors.forEach((anchor: Element) => this.journeyObserver?.observe(anchor));
    this.destroyRef.onDestroy(() => this.journeyObserver?.disconnect());
  }

  private stopHeroPreviewCarousel(): void {
    if (this.heroPreviewIntervalId !== null && typeof window !== 'undefined') {
      window.clearInterval(this.heroPreviewIntervalId);
      this.heroPreviewIntervalId = null;
    }
  }

}
