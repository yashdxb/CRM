import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { AppToastService } from '../../../../core/app-toast.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { WorkspaceSettingsService } from '../services/workspace-settings.service';
import {
  DealHealthBandThresholds,
  DealHealthBracket,
  DealHealthDimensionConfig,
  DealHealthScoringPolicy,
  WorkspaceSettings
} from '../models/workspace-settings.model';

@Component({
  selector: 'app-deal-health-settings-page',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    RouterLink,
    SkeletonModule,
    TooltipModule,
    ToggleSwitchModule,
    NgIf,
    NgFor,
    NgClass,
    BreadcrumbsComponent
  ],
  templateUrl: './deal-health-settings.page.html',
  styleUrl: './deal-health-settings.page.scss'
})
export class DealHealthSettingsPage {
  private readonly settingsService = inject(WorkspaceSettingsService);
  private readonly toastService = inject(AppToastService);

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly canManageAdmin = signal(
    tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
  );

  protected readonly policy = signal<DealHealthScoringPolicy>(DealHealthSettingsPage.defaultPolicy());
  protected readonly expandedDimension = signal<string | null>(null);

  private loadedSettings: WorkspaceSettings | null = null;

  constructor() {
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
        this.raiseToast('error', 'Unable to load deal health settings');
      }
    });
  }

  protected saveSettings() {
    if (!this.loadedSettings) return;

    const payload = {
      name: this.loadedSettings.name ?? 'Workspace',
      timeZone: this.loadedSettings.timeZone ?? 'UTC',
      currency: this.loadedSettings.currency ?? 'USD',
      dealHealthScoringPolicy: this.policy()
    };

    this.saving.set(true);
    this.settingsService.updateSettings(payload).subscribe({
      next: (settings) => {
        this.saving.set(false);
        this.applySettings(settings);
        this.raiseToast('success', 'Deal health scoring settings saved');
      },
      error: () => {
        this.saving.set(false);
        this.raiseToast('error', 'Unable to save deal health settings');
      }
    });
  }

  private applySettings(settings: WorkspaceSettings) {
    this.loadedSettings = settings;
    this.policy.set(settings.dealHealthScoringPolicy ?? DealHealthSettingsPage.defaultPolicy());
  }

  protected totalMaxScore(): number {
    return this.policy().dimensions
      .filter(d => d.enabled)
      .reduce((sum, d) => sum + d.maxScore, 0);
  }

  protected enabledCount(): number {
    return this.policy().dimensions.filter(d => d.enabled).length;
  }

  /* ── Dimension CRUD ── */

  protected toggleDimension(index: number, enabled: boolean) {
    const current = this.policy();
    const dims = current.dimensions.map((d, i) => i === index ? { ...d, enabled } : d);
    this.policy.set({ ...current, dimensions: dims });
  }

  protected updateDimensionLabel(index: number, label: string) {
    const current = this.policy();
    const dims = current.dimensions.map((d, i) => i === index ? { ...d, label } : d);
    this.policy.set({ ...current, dimensions: dims });
  }

  protected updateDimensionMaxScore(index: number, maxScore: number) {
    const current = this.policy();
    const dims = current.dimensions.map((d, i) => i === index ? { ...d, maxScore: maxScore ?? 0 } : d);
    this.policy.set({ ...current, dimensions: dims });
  }

  protected addDimension() {
    const current = this.policy();
    const key = 'Custom_' + Date.now();
    const newDim: DealHealthDimensionConfig = {
      key,
      label: 'New Dimension',
      maxScore: 10,
      enabled: true,
      brackets: [{ threshold: 1, score: 5 }, { threshold: 3, score: 10 }]
    };
    this.policy.set({ ...current, dimensions: [...current.dimensions, newDim] });
    this.expandedDimension.set(key);
  }

  protected removeDimension(index: number) {
    const current = this.policy();
    const dims = current.dimensions.filter((_, i) => i !== index);
    this.policy.set({ ...current, dimensions: dims });
  }

  /* ── Bracket editing ── */

  protected toggleExpand(key: string) {
    this.expandedDimension.set(this.expandedDimension() === key ? null : key);
  }

  protected updateBracketThreshold(dimIndex: number, bracketIndex: number, threshold: number) {
    const current = this.policy();
    const dims = current.dimensions.map((d, di) => {
      if (di !== dimIndex || !d.brackets) return d;
      const brackets = d.brackets.map((b, bi) =>
        bi === bracketIndex ? { ...b, threshold: threshold ?? 0 } : b
      );
      return { ...d, brackets };
    });
    this.policy.set({ ...current, dimensions: dims });
  }

  protected updateBracketScore(dimIndex: number, bracketIndex: number, score: number) {
    const current = this.policy();
    const dims = current.dimensions.map((d, di) => {
      if (di !== dimIndex || !d.brackets) return d;
      const brackets = d.brackets.map((b, bi) =>
        bi === bracketIndex ? { ...b, score: score ?? 0 } : b
      );
      return { ...d, brackets };
    });
    this.policy.set({ ...current, dimensions: dims });
  }

  protected addBracket(dimIndex: number) {
    const current = this.policy();
    const dims = current.dimensions.map((d, di) => {
      if (di !== dimIndex) return d;
      const brackets = [...(d.brackets ?? []), { threshold: 0, score: 0 }];
      return { ...d, brackets };
    });
    this.policy.set({ ...current, dimensions: dims });
  }

  protected removeBracket(dimIndex: number, bracketIndex: number) {
    const current = this.policy();
    const dims = current.dimensions.map((d, di) => {
      if (di !== dimIndex || !d.brackets) return d;
      const brackets = d.brackets.filter((_, bi) => bi !== bracketIndex);
      return { ...d, brackets };
    });
    this.policy.set({ ...current, dimensions: dims });
  }

  /* ── Band thresholds ── */

  protected updateBand(field: keyof DealHealthBandThresholds, value: number) {
    const current = this.policy();
    this.policy.set({ ...current, bands: { ...current.bands, [field]: value ?? 0 } });
  }

  protected updateConfidence(value: number) {
    const current = this.policy();
    this.policy.set({ ...current, confidence: value ?? 0.75 });
  }

  /* ── Reset ── */

  protected resetToDefaults() {
    this.policy.set(DealHealthSettingsPage.defaultPolicy());
    this.raiseToast('success', 'Reset to defaults — save to persist');
  }

  /* ── Helpers ── */

  protected isBuiltIn(key: string): boolean {
    return [
      'StageProgression', 'ActivityRecency', 'CloseDateHealth',
      'StakeholderCoverage', 'DealCompleteness', 'TeamCoverage', 'ProcessCompliance'
    ].includes(key);
  }

  protected hasBrackets(dim: DealHealthDimensionConfig): boolean {
    return dim.brackets !== null && dim.brackets !== undefined;
  }

  protected dimensionIcon(key: string): string {
    const icons: Record<string, string> = {
      StageProgression: 'pi-chart-bar',
      ActivityRecency: 'pi-clock',
      CloseDateHealth: 'pi-calendar',
      StakeholderCoverage: 'pi-users',
      DealCompleteness: 'pi-check-circle',
      TeamCoverage: 'pi-user-plus',
      ProcessCompliance: 'pi-shield'
    };
    return icons[key] ?? 'pi-sliders-h';
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }

  private static defaultPolicy(): DealHealthScoringPolicy {
    return {
      dimensions: [
        { key: 'StageProgression', label: 'Stage Progression', maxScore: 15, enabled: true, brackets: [{ threshold: 1, score: 3 }, { threshold: 2, score: 6 }, { threshold: 3, score: 9 }, { threshold: 4, score: 12 }, { threshold: 5, score: 15 }] },
        { key: 'ActivityRecency', label: 'Activity Recency', maxScore: 20, enabled: true, brackets: [{ threshold: 3, score: 20 }, { threshold: 7, score: 16 }, { threshold: 14, score: 12 }, { threshold: 30, score: 6 }, { threshold: 9999, score: 0 }] },
        { key: 'CloseDateHealth', label: 'Close Date Health', maxScore: 15, enabled: true, brackets: [{ threshold: 0, score: 0 }, { threshold: 7, score: 8 }, { threshold: 30, score: 12 }, { threshold: 90, score: 15 }, { threshold: 9999, score: 10 }] },
        { key: 'StakeholderCoverage', label: 'Stakeholder Coverage', maxScore: 10, enabled: true, brackets: [{ threshold: 0, score: 0 }, { threshold: 1, score: 4 }, { threshold: 2, score: 7 }, { threshold: 3, score: 10 }] },
        { key: 'DealCompleteness', label: 'Deal Completeness', maxScore: 15, enabled: true, brackets: null },
        { key: 'TeamCoverage', label: 'Team Coverage', maxScore: 10, enabled: true, brackets: [{ threshold: 0, score: 2 }, { threshold: 1, score: 6 }, { threshold: 2, score: 10 }] },
        { key: 'ProcessCompliance', label: 'Process Compliance', maxScore: 15, enabled: true, brackets: null }
      ],
      bands: { excellent: 80, good: 60, fair: 40, atRisk: 20 },
      confidence: 0.75
    };
  }
}
