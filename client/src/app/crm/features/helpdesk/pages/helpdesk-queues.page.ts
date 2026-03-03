import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { HelpDeskQueue } from '../models/helpdesk.model';
import { HelpDeskDataService } from '../services/helpdesk-data.service';

@Component({
  selector: 'app-helpdesk-queues-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, DialogModule, InputTextModule, TableModule, BreadcrumbsComponent],
  templateUrl: './helpdesk-queues.page.html',
  styleUrl: './helpdesk-queues.page.scss'
})
export class HelpDeskQueuesPage {
  private readonly data = inject(HelpDeskDataService);
  private readonly toast = inject(AppToastService);
  private readonly fb = inject(FormBuilder);

  protected readonly loading = signal(false);
  protected readonly visible = signal(false);
  protected readonly editing = signal<HelpDeskQueue | null>(null);
  protected readonly rows = signal<HelpDeskQueue[]>([]);
  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    description: [''],
    isActive: [true]
  });

  constructor() {
    this.load();
  }

  protected load() {
    this.loading.set(true);
    this.data.listQueues().subscribe({
      next: (rows) => {
        this.rows.set(rows ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('error', 'Unable to load queues.');
      }
    });
  }

  protected openCreate() {
    this.editing.set(null);
    this.form.reset({ name: '', description: '', isActive: true });
    this.visible.set(true);
  }

  protected openEdit(row: HelpDeskQueue) {
    this.editing.set(row);
    this.form.patchValue({
      name: row.name,
      description: row.description ?? '',
      isActive: row.isActive
    });
    this.visible.set(true);
  }

  protected save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    const safePayload = {
      name: payload.name ?? '',
      description: payload.description ?? null,
      isActive: payload.isActive ?? true
    };
    const request$ = this.editing()
      ? this.data.updateQueue(this.editing()!.id, safePayload)
      : this.data.createQueue(safePayload);

    request$.subscribe({
      next: () => {
        this.visible.set(false);
        this.toast.show('success', this.editing() ? 'Queue updated.' : 'Queue created.');
        this.load();
      },
      error: () => this.toast.show('error', 'Unable to save queue.')
    });
  }
}
