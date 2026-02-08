import { NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { OpportunityAutomationService } from '../services/opportunity-automation.service';
import {
  OpportunityStageAutomationRule,
  OpportunityStageAutomationRuleRequest
} from '../models/opportunity-automation.model';

interface Option<T = string> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-opportunity-automation-page',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ButtonModule, InputTextModule, SelectModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './opportunity-automation.page.html',
  styleUrl: './opportunity-automation.page.scss'
})
export class OpportunityAutomationPage {
  private readonly automationService = inject(OpportunityAutomationService);
  private readonly toastService = inject(AppToastService);

  protected readonly rules = signal<OpportunityStageAutomationRule[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly editingId = signal<string | null>(null);

  protected readonly priorityOptions: Option[] = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' }
  ];

  protected form: OpportunityStageAutomationRuleRequest = {
    name: '',
    stageName: '',
    taskSubject: '',
    taskDescription: '',
    dueInDays: 0,
    priority: 'Medium',
    isActive: true
  };

  constructor() {
    this.loadRules();
  }

  protected loadRules() {
    this.loading.set(true);
    this.automationService.getRules().subscribe({
      next: (rules) => {
        this.rules.set(rules);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.raiseToast('error', 'Unable to load automation rules.');
      }
    });
  }

  protected startEdit(rule: OpportunityStageAutomationRule) {
    this.editingId.set(rule.id);
    this.form = {
      name: rule.name,
      stageName: rule.stageName,
      taskSubject: rule.taskSubject,
      taskDescription: rule.taskDescription ?? '',
      dueInDays: rule.dueInDays,
      priority: rule.priority ?? 'Medium',
      isActive: rule.isActive
    };
  }

  protected resetForm() {
    this.editingId.set(null);
    this.form = {
      name: '',
      stageName: '',
      taskSubject: '',
      taskDescription: '',
      dueInDays: 0,
      priority: 'Medium',
      isActive: true
    };
  }

  protected saveRule() {
    if (!this.form.name.trim() || !this.form.stageName.trim() || !this.form.taskSubject.trim()) {
      this.raiseToast('error', 'Name, stage, and task subject are required.');
      return;
    }

    const payload: OpportunityStageAutomationRuleRequest = {
      ...this.form,
      name: this.form.name.trim(),
      stageName: this.form.stageName.trim(),
      taskSubject: this.form.taskSubject.trim(),
      taskDescription: this.form.taskDescription?.trim() || null,
      dueInDays: Number(this.form.dueInDays) || 0,
      priority: this.form.priority ?? 'Medium',
      isActive: this.form.isActive
    };

    this.saving.set(true);
    const editingId = this.editingId();
    if (editingId) {
      this.automationService.updateRule(editingId, payload).subscribe({
        next: () => {
          this.saving.set(false);
          this.resetForm();
          this.loadRules();
          this.raiseToast('success', 'Rule updated.');
        },
        error: (error: unknown) => {
          this.saving.set(false);
          this.raiseToast('error', (error as { error?: string })?.error ?? 'Unable to save rule.');
        }
      });
      return;
    }

    this.automationService.createRule(payload).subscribe({
      next: () => {
        this.saving.set(false);
        this.resetForm();
        this.loadRules();
        this.raiseToast('success', 'Rule created.');
      },
      error: (error: unknown) => {
        this.saving.set(false);
        this.raiseToast('error', (error as { error?: string })?.error ?? 'Unable to save rule.');
      }
    });
  }

  protected deleteRule(rule: OpportunityStageAutomationRule) {
    const confirmed = confirm(`Delete automation rule "${rule.name}"?`);
    if (!confirmed) return;

    this.automationService.deleteRule(rule.id).subscribe({
      next: () => {
        this.loadRules();
        if (this.editingId() === rule.id) {
          this.resetForm();
        }
        this.raiseToast('success', 'Rule deleted.');
      },
      error: () => {
        this.raiseToast('error', 'Unable to delete rule.');
      }
    });
  }

  protected toggleActive(rule: OpportunityStageAutomationRule) {
    const payload: OpportunityStageAutomationRuleRequest = {
      name: rule.name,
      stageName: rule.stageName,
      taskSubject: rule.taskSubject,
      taskDescription: rule.taskDescription ?? null,
      dueInDays: rule.dueInDays,
      priority: rule.priority ?? 'Medium',
      isActive: !rule.isActive
    };

    this.automationService.updateRule(rule.id, payload).subscribe({
      next: () => this.loadRules(),
      error: () => this.raiseToast('error', 'Unable to update rule.')
    });
  }

  protected clearToast() {
    this.toastService.clear();
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message, 3000);
  }
}
