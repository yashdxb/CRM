import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { SecurityLevelDefinition, UpsertSecurityLevelRequest } from '../models/user-admin.model';
import { UserAdminDataService } from '../services/user-admin-data.service';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { PERMISSION_KEYS } from '../../../../core/auth/permission.constants';
import { readTokenContext, tokenHasPermission } from '../../../../core/auth/token.utils';

@Component({
  selector: 'app-security-levels-page',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    NgClass,
    NgFor,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    SkeletonModule,
    TableModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './security-levels.page.html',
  styleUrl: './security-levels.page.scss'
})
export class SecurityLevelsPage {
  private readonly dataService = inject(UserAdminDataService);
  private readonly toastService = inject(AppToastService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly securityLevels = signal<SecurityLevelDefinition[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly editorOpen = signal(false);
  protected readonly editing = signal<SecurityLevelDefinition | null>(null);
  protected readonly canManageAdmin = signal(false);
  protected readonly defaultSecurityLevelName = computed(() => {
    const level = this.securityLevels().find((item) => item.isDefault);
    return level?.name ?? 'Not set';
  });

  protected readonly securityForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: [''],
    rank: [0, [Validators.min(0)]],
    isDefault: [false]
  });

  constructor() {
    this.canManageAdmin.set(
      tokenHasPermission(readTokenContext()?.payload ?? null, PERMISSION_KEYS.administrationManage)
    );
    this.loadSecurityLevels();
  }

  protected loadSecurityLevels() {
    this.loading.set(true);
    this.dataService.getSecurityLevels().subscribe({
      next: (levels) => {
        this.securityLevels.set(levels ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.raiseToast('error', 'Unable to load security levels');
      }
    });
  }

  protected openCreate() {
    this.editing.set(null);
    this.securityForm.reset({
      name: '',
      description: '',
      rank: this.nextRank(),
      isDefault: this.securityLevels().length === 0
    });
    this.editorOpen.set(true);
  }

  protected openEdit(level: SecurityLevelDefinition) {
    this.editing.set(level);
    this.securityForm.reset({
      name: level.name,
      description: level.description ?? '',
      rank: level.rank,
      isDefault: level.isDefault
    });
    this.editorOpen.set(true);
  }

  protected closeEditor() {
    this.editorOpen.set(false);
    this.securityForm.markAsPristine();
    this.securityForm.markAsUntouched();
  }

  protected saveSecurityLevel() {
    if (this.saving()) {
      return;
    }

    if (this.securityForm.invalid) {
      this.securityForm.markAllAsTouched();
      return;
    }

    const payload = this.buildPayload();
    this.saving.set(true);

    const current = this.editing();
    const request = current
      ? this.dataService.updateSecurityLevel(current.id, payload)
      : this.dataService.createSecurityLevel(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.raiseToast('success', current ? 'Security level updated' : 'Security level created');
        this.closeEditor();
        this.loadSecurityLevels();
      },
      error: (err) => {
        this.saving.set(false);
        const message = err?.error ?? 'Unable to save security level';
        this.raiseToast('error', message);
      }
    });
  }

  protected deleteSecurityLevel(level: SecurityLevelDefinition) {
    if (!this.canManageAdmin() || this.saving()) {
      return;
    }

    if (level.isDefault) {
      this.raiseToast('error', 'Default security level cannot be deleted');
      return;
    }

    if (!confirm(`Delete ${level.name}? Roles using this level must be reassigned first.`)) {
      return;
    }

    this.saving.set(true);
    this.dataService.deleteSecurityLevel(level.id).subscribe({
      next: () => {
        this.saving.set(false);
        this.raiseToast('success', 'Security level deleted');
        this.loadSecurityLevels();
      },
      error: (err) => {
        this.saving.set(false);
        const message = err?.error ?? 'Unable to delete security level';
        this.raiseToast('error', message);
      }
    });
  }

  protected getHeaderLabel(level: SecurityLevelDefinition) {
    return level.isDefault ? 'Default' : 'Custom';
  }

  private buildPayload(): UpsertSecurityLevelRequest {
    const value = this.securityForm.value;
    return {
      name: value.name?.trim() ?? '',
      description: value.description?.trim() ? value.description?.trim() : null,
      rank: typeof value.rank === 'number' ? value.rank : 0,
      isDefault: value.isDefault ?? false
    };
  }

  private nextRank(): number {
    const levels = this.securityLevels();
    if (levels.length === 0) {
      return 0;
    }
    return Math.max(...levels.map(level => level.rank)) + 1;
  }

  private raiseToast(tone: 'success' | 'error', message: string) {
    this.toastService.show(tone, message);
  }
}
