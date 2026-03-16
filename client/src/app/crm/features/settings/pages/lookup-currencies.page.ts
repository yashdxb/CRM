import { NgClass, NgFor, NgIf } from '@angular/common';
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

import { CurrencyItem, LookupDataService } from '../services/lookup-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';

@Component({
  selector: 'app-lookup-currencies-page',
  standalone: true,
  imports: [
    BreadcrumbsComponent, ButtonModule, CheckboxModule, DialogModule,
    InputGroupModule, InputGroupAddonModule, InputNumberModule, InputTextModule,
    NgFor, NgIf, ReactiveFormsModule, RouterLink,
    SkeletonModule, TableModule, TagModule, TooltipModule
  ],
  templateUrl: './lookup-currencies.page.html',
  styleUrl: './lookup-currencies.page.scss'
})
export class LookupCurrenciesPage {
  private readonly dataService = inject(LookupDataService);
  private readonly toastService = inject(AppToastService);
  private readonly fb = inject(FormBuilder);

  protected readonly items = signal<CurrencyItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly editorOpen = signal(false);
  protected readonly editing = signal<CurrencyItem | null>(null);
  protected readonly canManage = signal(false);
  protected readonly activeCount = computed(() => this.items().filter(i => i.isActive).length);

  protected readonly form = this.fb.group({
    code: ['', [Validators.required, Validators.maxLength(3)]],
    name: ['', [Validators.required]],
    symbol: ['', [Validators.required, Validators.maxLength(5)]],
    isActive: [true],
    sortOrder: [0, [Validators.min(0)]]
  });

  constructor() {
    this.canManage.set(
      tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
    );
    this.loadItems();
  }

  protected loadItems() {
    this.loading.set(true);
    this.dataService.getCurrencies(true).subscribe({
      next: (data) => { this.items.set(data ?? []); this.loading.set(false); },
      error: () => { this.loading.set(false); this.toast('error', 'Unable to load currencies'); }
    });
  }

  protected openCreate() {
    this.editing.set(null);
    this.form.reset({ code: '', name: '', symbol: '', isActive: true, sortOrder: this.nextOrder() });
    this.editorOpen.set(true);
  }

  protected openEdit(item: CurrencyItem) {
    this.editing.set(item);
    this.form.reset({ code: item.code, name: item.name, symbol: item.symbol, isActive: item.isActive, sortOrder: item.sortOrder });
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
      code: v.code?.trim().toUpperCase() ?? '',
      name: v.name?.trim() ?? '',
      symbol: v.symbol?.trim() ?? '',
      isActive: v.isActive ?? true,
      sortOrder: v.sortOrder ?? 0
    };
    this.saving.set(true);

    const current = this.editing();
    const req = current
      ? this.dataService.updateCurrency(current.id, body)
      : this.dataService.createCurrency(body);

    req.subscribe({
      next: () => {
        this.saving.set(false);
        this.toast('success', current ? 'Currency updated' : 'Currency created');
        this.closeEditor();
        this.loadItems();
      },
      error: (err) => {
        this.saving.set(false);
        this.toast('error', err?.error ?? 'Unable to save currency');
      }
    });
  }

  protected deleteItem(item: CurrencyItem) {
    if (!this.canManage() || this.saving()) return;
    if (!confirm(`Delete "${item.code} — ${item.name}"?`)) return;

    this.saving.set(true);
    this.dataService.deleteCurrency(item.id).subscribe({
      next: () => { this.saving.set(false); this.toast('success', 'Currency deleted'); this.loadItems(); },
      error: (err) => { this.saving.set(false); this.toast('error', err?.error ?? 'Unable to delete currency'); }
    });
  }

  private nextOrder(): number {
    const list = this.items();
    return list.length === 0 ? 0 : Math.max(...list.map(i => i.sortOrder)) + 1;
  }

  private toast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message);
  }
}
