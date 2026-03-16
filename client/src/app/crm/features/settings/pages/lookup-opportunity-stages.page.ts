import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { OpportunityStageItem, LookupDataService } from '../services/lookup-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';

@Component({
  selector: 'app-lookup-opportunity-stages-page',
  standalone: true,
  imports: [
    BreadcrumbsComponent, ButtonModule, CheckboxModule, DialogModule,
    InputGroupModule, InputGroupAddonModule, InputNumberModule, InputTextModule,
    NgClass, NgFor, NgIf, ReactiveFormsModule, RouterLink,
    SkeletonModule, TableModule, TagModule, TooltipModule
  ],
  templateUrl: './lookup-opportunity-stages.page.html',
  styleUrl: './lookup-opportunity-stages.page.scss'
})
export class LookupOpportunityStagesPage {
  private readonly dataService = inject(LookupDataService);
  private readonly toastService = inject(AppToastService);
  private readonly fb = inject(FormBuilder);

  protected readonly items = signal<OpportunityStageItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly editorOpen = signal(false);
  protected readonly editing = signal<OpportunityStageItem | null>(null);
  protected readonly canManage = signal(false);

  protected readonly form = this.fb.group({
    name: ['', [Validators.required]],
    order: [0, [Validators.min(0)]],
    isClosedStage: [false],
    forecastCategory: ['']
  });

  constructor() {
    this.canManage.set(
      tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
    );
    this.loadItems();
  }

  protected loadItems() {
    this.loading.set(true);
    this.dataService.getOpportunityStages().subscribe({
      next: (data) => { this.items.set(data ?? []); this.loading.set(false); },
      error: () => { this.loading.set(false); this.toast('error', 'Unable to load opportunity stages'); }
    });
  }

  protected openCreate() {
    this.editing.set(null);
    this.form.reset({ name: '', order: this.nextOrder(), isClosedStage: false, forecastCategory: '' });
    this.editorOpen.set(true);
  }

  protected openEdit(item: OpportunityStageItem) {
    this.editing.set(item);
    this.form.reset({ name: item.name, order: item.order, isClosedStage: item.isClosedStage, forecastCategory: item.forecastCategory ?? '' });
    this.editorOpen.set(true);
  }

  protected closeEditor() {
    this.editorOpen.set(false);
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  protected save() {
    if (this.saving()) return;
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const v = this.form.value;
    const body = {
      name: v.name?.trim() ?? '',
      order: v.order ?? 0,
      isClosedStage: v.isClosedStage ?? false,
      forecastCategory: v.forecastCategory?.trim() || null
    };
    this.saving.set(true);

    const current = this.editing();
    const req = current
      ? this.dataService.updateOpportunityStage(current.id, body)
      : this.dataService.createOpportunityStage(body);

    req.subscribe({
      next: () => {
        this.saving.set(false);
        this.toast('success', current ? 'Stage updated' : 'Stage created');
        this.closeEditor();
        this.loadItems();
      },
      error: (err) => {
        this.saving.set(false);
        this.toast('error', err?.error ?? 'Unable to save stage');
      }
    });
  }

  protected deleteItem(item: OpportunityStageItem) {
    if (!this.canManage() || this.saving()) return;
    if (!confirm(`Delete "${item.name}"? Opportunities using this stage must be reassigned first.`)) return;

    this.saving.set(true);
    this.dataService.deleteOpportunityStage(item.id).subscribe({
      next: () => { this.saving.set(false); this.toast('success', 'Stage deleted'); this.loadItems(); },
      error: (err) => { this.saving.set(false); this.toast('error', err?.error ?? 'Unable to delete — stage may be in use'); }
    });
  }

  private nextOrder(): number {
    const list = this.items();
    return list.length === 0 ? 0 : Math.max(...list.map(i => i.order)) + 1;
  }

  private toast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message);
  }
}
