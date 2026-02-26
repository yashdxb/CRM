import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { AccordionModule } from 'primeng/accordion';

import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import { ReferenceDataService } from '../../../../core/services/reference-data.service';
import {
  QualificationModifierRule,
  QualificationExposureWeight,
  QualificationFactorEvidenceRule,
  QualificationPolicy,
  WorkspaceSettings
} from '../models/workspace-settings.model';

interface Option<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-qualification-policy-page',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    SkeletonModule,
    AccordionModule,
    NgIf,
    NgFor,
    BreadcrumbsComponent
  ],
  templateUrl: './qualification-policy.page.html',
  styleUrl: './qualification-policy.page.scss'
})
export class QualificationPolicyPage {
  private static readonly accordionStateKey = 'qualification-policy-accordion';
  private static readonly defaultAccordionPanels = [
    'thresholds',
    'evidence-enforcement',
    'factor-evidence',
    'modifiers',
    'exposure-weights',
    'lead-data-weights',
    'evidence-sources'
  ] as const;

  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly toastService = inject(AppToastService);
  private readonly fb = inject(FormBuilder);
  private readonly referenceData = inject(ReferenceDataService);
  private readonly http = inject(HttpClient);

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly canManageAdmin = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );

  protected readonly settingsForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    timeZone: ['UTC', [Validators.required]],
    currency: ['', [Validators.required]]
  });

  protected readonly qualificationPolicy = signal<QualificationPolicy>(QualificationPolicyPage.defaultPolicy());
  protected readonly policyAccordionValue = signal<string[]>([
    ...QualificationPolicyPage.defaultAccordionPanels
  ]);

  protected readonly modifierKeyOptions: Option[] = [
    { label: 'Competitive deal', value: 'competitive' },
    { label: 'Executive champion', value: 'executiveChampion' },
    { label: 'Strategic account', value: 'strategic' },
    { label: 'Fast velocity', value: 'fastVelocity' },
    { label: 'Slow velocity', value: 'slowVelocity' }
  ];

  protected readonly exposureWeightOptions: Array<{ key: string; label: string }> = [
    { key: 'budget', label: 'Budget availability' },
    { key: 'timeline', label: 'Buying timeline' },
    { key: 'economicBuyer', label: 'Economic buyer' },
    { key: 'problem', label: 'Problem severity' },
    { key: 'readiness', label: 'Readiness to spend' },
    { key: 'icpFit', label: 'ICP fit' }
  ];

  protected readonly leadDataWeightOptions: Array<{ key: string; label: string }> = [
    { key: 'firstNameLastName', label: 'First and last name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'companyName', label: 'Company name' },
    { key: 'jobTitle', label: 'Job title' },
    { key: 'source', label: 'Source' }
  ];

  protected readonly qualificationFactorOptions: Array<{ key: string; label: string }> = [
    { key: 'budget', label: 'Budget availability' },
    { key: 'readiness', label: 'Readiness to spend' },
    { key: 'timeline', label: 'Buying timeline' },
    { key: 'problem', label: 'Problem severity' },
    { key: 'economicBuyer', label: 'Economic buyer' },
    { key: 'icpFit', label: 'ICP fit' }
  ];

  private loadedSettings: WorkspaceSettings | null = null;
  private currencyFallback = '';

  constructor() {
    this.loadCurrencyFallback();
    this.loadAccordionState();
    this.loadSettings();
  }

  protected loadSettings() {
    this.loading.set(true);
    this.settingsService.getSettings().subscribe({
      next: (settings) => {
        this.applySettings(settings);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.raiseToast('error', 'Unable to load qualification policy');
      }
    });
  }

  protected saveSettings() {
    if (!this.loadedSettings) {
      return;
    }

    const safePayload = {
      name: this.loadedSettings.name ?? 'Workspace',
      timeZone: this.loadedSettings.timeZone ?? 'UTC',
      currency: this.resolveCurrency(this.loadedSettings.currency ?? null),
      leadFirstTouchSlaHours: this.loadedSettings.leadFirstTouchSlaHours ?? 24,
      defaultContractTermMonths: this.loadedSettings.defaultContractTermMonths ?? null,
      defaultDeliveryOwnerRoleId: this.loadedSettings.defaultDeliveryOwnerRoleId ?? null,
      approvalAmountThreshold: this.loadedSettings.approvalAmountThreshold ?? null,
      approvalApproverRole: this.loadedSettings.approvalApproverRole ?? '',
      approvalWorkflowPolicy: this.loadedSettings.approvalWorkflowPolicy ?? null,
      qualificationPolicy: this.qualificationPolicy()
    };

    this.saving.set(true);
    this.settingsService.updateSettings(safePayload).subscribe({
      next: (settings) => {
        this.saving.set(false);
        this.applySettings(settings);
        this.raiseToast('success', 'Qualification policy updated');
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', 'Unable to save qualification policy');
      }
    });
  }

  protected onPolicyAccordionValueChange(value: string[] | number[] | string | number | null | undefined) {
    const next = this.normalizeAccordionValue(value);
    this.policyAccordionValue.set(next);
    this.http
      .put<{ key: string; value: unknown }>(`/api/users/me/ui-state/${QualificationPolicyPage.accordionStateKey}`, {
        value: next
      })
      .subscribe({
        error: () => {
          // Non-blocking UX preference save. Avoid toast noise on transient failures.
        }
      });
  }

  private applySettings(settings: WorkspaceSettings) {
    this.loadedSettings = settings;
    this.settingsForm.patchValue({
      name: settings.name,
      timeZone: settings.timeZone,
      currency: this.resolveCurrency(settings.currency ?? null)
    });
    const policy = settings.qualificationPolicy ?? QualificationPolicyPage.defaultPolicy();
    const normalized = {
      ...QualificationPolicyPage.defaultPolicy(),
      ...policy,
      exposureWeights: (policy.exposureWeights && policy.exposureWeights.length > 0)
        ? policy.exposureWeights
        : QualificationPolicyPage.defaultPolicy().exposureWeights,
      leadDataWeights: (policy.leadDataWeights && policy.leadDataWeights.length > 0)
        ? policy.leadDataWeights
        : QualificationPolicyPage.defaultPolicy().leadDataWeights,
      minimumEvidenceCoveragePercent: Number.isFinite(policy.minimumEvidenceCoveragePercent)
        ? Math.max(0, Math.min(100, policy.minimumEvidenceCoveragePercent))
        : QualificationPolicyPage.defaultPolicy().minimumEvidenceCoveragePercent,
      evidenceSources: this.normalizeEvidenceSources(policy.evidenceSources)
    };
    normalized.factorEvidenceRules = this.normalizeFactorEvidenceRules(policy.factorEvidenceRules, normalized.evidenceSources);
    this.qualificationPolicy.set(normalized);
  }

  protected addModifierRule() {
    const current = this.qualificationPolicy();
    const nextRule: QualificationModifierRule = { key: 'competitive', delta: 5 };
    this.qualificationPolicy.set({
      ...current,
      modifiers: [...current.modifiers, nextRule]
    });
  }

  protected updateExposureWeight(key: string, weight: number | null) {
    const safeWeight = Number.isFinite(weight) ? Math.max(0, Math.min(100, weight ?? 0)) : 0;
    const current = this.qualificationPolicy();
    const next = (current.exposureWeights ?? []).map((item) =>
      item.key === key ? { ...item, weight: safeWeight } : item
    );
    this.qualificationPolicy.set({ ...current, exposureWeights: next });
  }

  protected exposureWeightFor(key: string) {
    return (this.qualificationPolicy().exposureWeights ?? []).find((item) => item.key === key)?.weight ?? 0;
  }

  protected exposureWeightTotal() {
    return (this.qualificationPolicy().exposureWeights ?? []).reduce(
      (sum, item) => sum + (item.weight ?? 0),
      0
    );
  }

  protected exposureWeightsMissing() {
    return this.exposureWeightOptions.filter(
      (option) => !(this.qualificationPolicy().exposureWeights ?? []).some((w) => w.key === option.key)
    );
  }

  protected updateLeadDataWeight(key: string, weight: number | null) {
    const safeWeight = Number.isFinite(weight) ? Math.max(0, Math.min(100, weight ?? 0)) : 0;
    const current = this.qualificationPolicy();
    const next = (current.leadDataWeights ?? []).map((item) =>
      item.key === key ? { ...item, weight: safeWeight } : item
    );
    this.qualificationPolicy.set({ ...current, leadDataWeights: next });
  }

  protected leadDataWeightFor(key: string) {
    return (this.qualificationPolicy().leadDataWeights ?? []).find((item) => item.key === key)?.weight ?? 0;
  }

  protected leadDataWeightTotal() {
    return (this.qualificationPolicy().leadDataWeights ?? []).reduce(
      (sum, item) => sum + (item.weight ?? 0),
      0
    );
  }

  protected requiredFactorEvidenceCount() {
    return (this.qualificationPolicy().factorEvidenceRules ?? []).filter((rule) => rule.requireEvidence).length;
  }

  protected removeModifierRule(index: number) {
    const current = this.qualificationPolicy();
    const next = current.modifiers.filter((_, idx) => idx !== index);
    this.qualificationPolicy.set({ ...current, modifiers: next });
  }

  protected updateModifierRule(index: number, patch: Partial<QualificationModifierRule>) {
    const current = this.qualificationPolicy();
    const next = current.modifiers.map((rule, idx) => idx === index ? { ...rule, ...patch } : rule);
    this.qualificationPolicy.set({ ...current, modifiers: next });
  }

  protected setPolicyField<K extends keyof QualificationPolicy>(field: K, value: QualificationPolicy[K]) {
    const current = this.qualificationPolicy();
    this.qualificationPolicy.set({ ...current, [field]: value });
  }

  protected addEvidenceSource() {
    const nextName = this.nextEvidenceSourceName();
    const current = this.qualificationPolicy();
    this.qualificationPolicy.set({
      ...current,
      evidenceSources: [...current.evidenceSources, nextName]
    });
    this.syncFactorEvidenceRulesToCatalog();
  }

  protected updateEvidenceSource(index: number, value: string) {
    const current = this.qualificationPolicy();
    const trimmed = (value ?? '').trim();
    const next = [...current.evidenceSources];
    next[index] = trimmed;
    this.qualificationPolicy.set({
      ...current,
      evidenceSources: this.normalizeEvidenceSources(next)
    });
    this.syncFactorEvidenceRulesToCatalog();
  }

  protected removeEvidenceSource(index: number) {
    const current = this.qualificationPolicy();
    const target = current.evidenceSources[index];
    if (!target) {
      return;
    }
    if (target.toLowerCase() === 'no evidence yet') {
      return;
    }
    const next = current.evidenceSources.filter((_, idx) => idx !== index);
    this.qualificationPolicy.set({
      ...current,
      evidenceSources: this.normalizeEvidenceSources(next)
    });
    this.syncFactorEvidenceRulesToCatalog();
  }

  protected factorEvidenceRuleFor(key: string): QualificationFactorEvidenceRule {
    const current = this.qualificationPolicy();
    return (
      current.factorEvidenceRules?.find((rule) => rule.factorKey === key) ??
      QualificationPolicyPage.defaultFactorEvidenceRules(current.evidenceSources).find((rule) => rule.factorKey === key) ?? {
        factorKey: key,
        requireEvidence: false,
        allowedEvidenceSources: ['No evidence yet']
      }
    );
  }

  protected updateFactorEvidenceRequire(key: string, requireEvidence: boolean) {
    const current = this.qualificationPolicy();
    const next = (current.factorEvidenceRules ?? []).map((rule) =>
      rule.factorKey === key ? { ...rule, requireEvidence: !!requireEvidence } : rule
    );
    this.qualificationPolicy.set({ ...current, factorEvidenceRules: next });
  }

  protected updateFactorEvidenceSources(key: string, selected: string[] | null | undefined) {
    const current = this.qualificationPolicy();
    const catalog = this.normalizeEvidenceSources(current.evidenceSources);
    const allowed = this.normalizeAllowedEvidenceSources(selected, catalog);
    const next = (current.factorEvidenceRules ?? []).map((rule) =>
      rule.factorKey === key ? { ...rule, allowedEvidenceSources: allowed } : rule
    );
    this.qualificationPolicy.set({ ...current, evidenceSources: catalog, factorEvidenceRules: next });
  }

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private loadCurrencyFallback() {
    this.referenceData.getCurrencies().subscribe((items) => {
      const active = items.filter((currency) => currency.isActive);
      this.currencyFallback = active[0]?.code ?? items[0]?.code ?? '';
      if (!this.settingsForm.value.currency && this.currencyFallback) {
        this.settingsForm.patchValue({ currency: this.currencyFallback });
      }
    });
  }

  private loadAccordionState() {
    this.http
      .get<{ key: string; value: unknown }>(`/api/users/me/ui-state/${QualificationPolicyPage.accordionStateKey}`)
      .subscribe({
        next: (response) => {
          this.policyAccordionValue.set(
            this.normalizeAccordionValue(response?.value as string[] | number[] | string | number | null | undefined)
          );
        },
        error: () => {
          this.policyAccordionValue.set([...QualificationPolicyPage.defaultAccordionPanels]);
        }
      });
  }

  private normalizeAccordionValue(value: string[] | number[] | string | number | null | undefined): string[] {
    const allowed = new Set<string>(QualificationPolicyPage.defaultAccordionPanels);
    const incoming = Array.isArray(value)
      ? value.map((item) => String(item))
      : (typeof value === 'string' || typeof value === 'number') && String(value).trim().length > 0
        ? [String(value)]
        : [...QualificationPolicyPage.defaultAccordionPanels];

    const normalized = incoming
      .map((item) => (item ?? '').trim())
      .filter((item): item is string => item.length > 0 && allowed.has(item))
      .filter((item, index, all) => all.indexOf(item) === index);

    return normalized.length ? normalized : [...QualificationPolicyPage.defaultAccordionPanels];
  }

  private resolveCurrency(value: string | null) {
    return value || this.currencyFallback || '';
  }

  private normalizeEvidenceSources(items: string[] | null | undefined): string[] {
    const normalized = (items ?? [])
      .map((item) => (item ?? '').trim())
      .filter((item) => item.length > 0)
      .filter((item, index, all) => all.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index);

    if (!normalized.length) {
      return [...QualificationPolicyPage.defaultPolicy().evidenceSources];
    }

    const sentinelIndex = normalized.findIndex((item) => item.toLowerCase() === 'no evidence yet');
    if (sentinelIndex === -1) {
      return ['No evidence yet', ...normalized];
    }

    if (sentinelIndex > 0) {
      const [sentinel] = normalized.splice(sentinelIndex, 1);
      normalized.unshift(sentinel);
    }

    return normalized;
  }

  private normalizeAllowedEvidenceSources(items: string[] | null | undefined, catalog: string[]): string[] {
    const catalogSet = new Set(catalog.map((item) => item.toLowerCase()));
    const normalized = (items ?? [])
      .map((item) => (item ?? '').trim())
      .filter((item) => item.length > 0 && catalogSet.has(item.toLowerCase()))
      .filter((item, index, all) => all.findIndex((candidate) => candidate.toLowerCase() === item.toLowerCase()) === index);

    if (!normalized.some((item) => item.toLowerCase() === 'no evidence yet') && catalogSet.has('no evidence yet')) {
      normalized.unshift(catalog.find((item) => item.toLowerCase() === 'no evidence yet') ?? 'No evidence yet');
    }

    return normalized.length ? normalized : ['No evidence yet'];
  }

  private normalizeFactorEvidenceRules(
    rules: QualificationFactorEvidenceRule[] | null | undefined,
    catalog: string[]
  ): QualificationFactorEvidenceRule[] {
    const defaults = QualificationPolicyPage.defaultFactorEvidenceRules(catalog);
    const byKey = new Map((rules ?? []).map((rule) => [rule.factorKey, rule]));
    return defaults.map((def) => {
      const configured = byKey.get(def.factorKey);
      if (!configured) return def;
      return {
        factorKey: def.factorKey,
        requireEvidence: configured.requireEvidence ?? def.requireEvidence,
        allowedEvidenceSources: this.normalizeAllowedEvidenceSources(configured.allowedEvidenceSources, catalog)
      };
    });
  }

  private syncFactorEvidenceRulesToCatalog() {
    const current = this.qualificationPolicy();
    const catalog = this.normalizeEvidenceSources(current.evidenceSources);
    this.qualificationPolicy.set({
      ...current,
      evidenceSources: catalog,
      factorEvidenceRules: this.normalizeFactorEvidenceRules(current.factorEvidenceRules, catalog)
    });
  }

  private nextEvidenceSourceName(): string {
    const existing = new Set(this.qualificationPolicy().evidenceSources.map((item) => item.toLowerCase()));
    for (let i = 1; i <= 999; i += 1) {
      const candidate = `Evidence source ${i}`;
      if (!existing.has(candidate.toLowerCase())) {
        return candidate;
      }
    }
    return 'Evidence source';
  }

  private static defaultPolicy(): QualificationPolicy {
    const defaultEvidenceSources = QualificationPolicyPage.defaultEvidenceSources();
    return {
      defaultThreshold: 75,
      managerApprovalBelow: 50,
      blockBelow: 25,
      allowOverrides: true,
      requireOverrideReason: true,
      showCqvsInLeadList: false,
      requireEvidenceBeforeQualified: true,
      minimumEvidenceCoveragePercent: 50,
      factorEvidenceRules: QualificationPolicyPage.defaultFactorEvidenceRules(defaultEvidenceSources),
      thresholdRules: [],
      modifiers: [
        { key: 'competitive', delta: 10 },
        { key: 'executiveChampion', delta: -15 },
        { key: 'strategic', delta: -15 },
        { key: 'fastVelocity', delta: -10 },
        { key: 'slowVelocity', delta: 10 }
      ],
      exposureWeights: [
        { key: 'budget', weight: 25 },
        { key: 'timeline', weight: 20 },
        { key: 'economicBuyer', weight: 20 },
        { key: 'problem', weight: 15 },
        { key: 'readiness', weight: 10 },
        { key: 'icpFit', weight: 10 }
      ],
      leadDataWeights: [
        { key: 'firstNameLastName', weight: 16 },
        { key: 'email', weight: 24 },
        { key: 'phone', weight: 24 },
        { key: 'companyName', weight: 16 },
        { key: 'jobTitle', weight: 12 },
        { key: 'source', weight: 8 }
      ],
      evidenceSources: defaultEvidenceSources
    };
  }

  private static defaultEvidenceSources(): string[] {
    return [
      'No evidence yet',
      'Customer call',
      'Call notes',
      'Call recap',
      'Follow-up call notes',
      'Discovery call notes',
      'Discovery meeting notes',
      'Meeting notes',
      'Email confirmation',
      'Email from buyer',
      'Buyer email',
      'Written confirmation',
      'Chat transcript',
      'Proposal feedback',
      'Internal plan mention',
      'Ops review notes',
      'Org chart reference',
      'Account research',
      'Third-party confirmation',
      'Historical / prior deal',
      'Inferred from context'
    ];
  }

  private static defaultFactorEvidenceRules(catalog: string[]): QualificationFactorEvidenceRule[] {
    const source = catalog;
    const pick = (...names: string[]) =>
      source.filter((item) => names.some((name) => name.toLowerCase() === item.toLowerCase()));

    return [
      { factorKey: 'budget', requireEvidence: true, allowedEvidenceSources: pick('No evidence yet', 'Customer call', 'Call notes', 'Discovery call notes', 'Discovery meeting notes', 'Email confirmation', 'Buyer email', 'Written confirmation', 'Proposal feedback') },
      { factorKey: 'readiness', requireEvidence: false, allowedEvidenceSources: pick('No evidence yet', 'Customer call', 'Call notes', 'Discovery call notes', 'Meeting notes', 'Email confirmation', 'Chat transcript', 'Internal plan mention') },
      { factorKey: 'timeline', requireEvidence: true, allowedEvidenceSources: pick('No evidence yet', 'Customer call', 'Call notes', 'Discovery meeting notes', 'Meeting notes', 'Email confirmation', 'Buyer email', 'Written confirmation', 'Proposal feedback') },
      { factorKey: 'problem', requireEvidence: true, allowedEvidenceSources: pick('No evidence yet', 'Customer call', 'Call recap', 'Discovery call notes', 'Discovery meeting notes', 'Meeting notes', 'Ops review notes', 'Chat transcript') },
      { factorKey: 'economicBuyer', requireEvidence: true, allowedEvidenceSources: pick('No evidence yet', 'Customer call', 'Meeting notes', 'Email from buyer', 'Buyer email', 'Written confirmation', 'Org chart reference') },
      { factorKey: 'icpFit', requireEvidence: false, allowedEvidenceSources: pick('No evidence yet', 'Account research', 'Org chart reference', 'Third-party confirmation', 'Historical / prior deal', 'Customer call') }
    ];
  }
}
