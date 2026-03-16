import { NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
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

import { HelpdeskSeverityItem, LookupDataService } from '../services/lookup-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';

@Component({
  selector: 'app-lookup-helpdesk-severities-page',
  standalone: true,
  imports: [
    BreadcrumbsComponent, ButtonModule, CheckboxModule, DialogModule,
    InputGroupModule, InputGroupAddonModule, InputNumberModule, InputTextModule,
    NgFor, NgIf, ReactiveFormsModule, RouterLink,
    SkeletonModule, TableModule, TagModule, TooltipModule
  ],
  templateUrl: './lookup-helpdesk-severities.page.html',
  styleUrl: './lookup-helpdesk-severities.page.scss'
})
export class LookupHelpdeskSeveritiesPage {
  private readonly dataService = inject(LookupDataService);
  private readonly toastService = inject(AppToastService);
  private readonly fb = inject(FormBuilder);

  protected readonly items = signal<HelpdeskSeverityItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly editorOpen = signal(false);
  protected readonly editing = signal<HelpdeskSeverityItem | null>(null);
  protected readonly canManage = signal(false);
  protected readonly activeCount = computed(() => this.items().filter(i => i.isActive).length);

  protected readonly form = this.fb.group({
    name: ['', [Validators.required]],
    isActive: [true],
    sortOrder: [0, [Validators.min(0)]]
  });

  constructor() {
    this.canManage.set(tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage));
    this.loadItems();
  }

  protected loadItems() {
    this.loading.set(true);
    this.dataService.getHelpdeskSeverities(true).subscribe({
      next: (data) => { this.items.set(data ?? []); this.loading.set(false); },
      error: () => { this.loading.set(false); this.toast('error', 'Unable to load helpdesk severities'); }
    });
  }

  protected openCreate() {
    this.editing.set(null);
    this.form.reset({ name: '', isActive: true, sortOrder: this.nextOrder() });
    this.editorOpen.set(true);
  }

  protected openEdit(item: HelpdeskSeverityItem) {
    this.editing.set(item);
    this.form.reset({ name: item.name, isActive: item.isActive, sortOrder: item.sortOrder });
    this.editorOpen.set(true);
  }

  protected closeEditor() { this.editorOpen.set(false); this.form.markAsPristine(); this.form.markAsUntouched(); }

  protected save() {
    if (this.saving()) return;
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.value;
    const body = { name: v.name?.trim() ?? '', isActive: v.isActive ?? true, sortOrder: v.sortOrder ?? 0 };
    this.saving.set(true);
    const current = this.editing();
    const req = current ? this.dataService.updateHelpdeskSeverity(current.id, body) : this.dataService.createHelpdeskSeverity(body);
    req.subscribe({
      next: () => { this.saving.set(false); this.toast('success', current ? 'Severity updated' : 'Severity created'); this.closeEditor(); this.loadItems(); },
      error: (err) => { this.saving.set(false); this.toast('error', err?.error ?? 'Unable to save severity'); }
    });
  }

  protected deleteItem(item: HelpdeskSeverityItem) {
    if (!this.canManage() || this.saving()) return;
    if (!confirm(`Delete "${item.name}"?`)) return;
    this.saving.set(true);
    this.dataService.deleteHelpdeskSeverity(item.id).subscribe({
      next: () => { this.saving.set(false); this.toast('success', 'Severity deleted'); this.loadItems(); },
      error: (err) => { this.saving.set(false); this.toast('error', err?.error ?? 'Unable to delete severity'); }
    });
  }

  private nextOrder(): number { const list = this.items(); return list.length === 0 ? 0 : Math.max(...list.map(i => i.sortOrder)) + 1; }
  private toast(tone: 'success' | 'error', message: string) { this.toastService.show(tone, message); }
}
