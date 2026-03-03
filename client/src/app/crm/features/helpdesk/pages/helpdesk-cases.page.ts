import { CommonModule } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { CrmEventsService } from '../../../../core/realtime/crm-events.service';
import { HelpDeskCase } from '../models/helpdesk.model';
import { HelpDeskDataService } from '../services/helpdesk-data.service';

@Component({
  selector: 'app-helpdesk-cases-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, SelectModule, TableModule, BreadcrumbsComponent],
  templateUrl: './helpdesk-cases.page.html',
  styleUrl: './helpdesk-cases.page.scss'
})
export class HelpDeskCasesPage {
  private readonly data = inject(HelpDeskDataService);
  private readonly toast = inject(AppToastService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly realtime = inject(CrmEventsService);

  protected readonly loading = signal(false);
  protected readonly cases = signal<HelpDeskCase[]>([]);
  protected readonly summary = signal({ openCount: 0, atRiskCount: 0, breachedCount: 0, resolvedTodayCount: 0 });
  protected readonly statusOptions = [
    { label: 'New', value: 'New' },
    { label: 'Open', value: 'Open' },
    { label: 'Pending Customer', value: 'Pending Customer' },
    { label: 'Pending Internal', value: 'Pending Internal' },
    { label: 'Resolved', value: 'Resolved' },
    { label: 'Closed', value: 'Closed' }
  ];
  protected readonly priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
    { label: 'Urgent', value: 'Urgent' }
  ];
  protected readonly severityOptions = [
    { label: 'S1', value: 'S1' },
    { label: 'S2', value: 'S2' },
    { label: 'S3', value: 'S3' },
    { label: 'S4', value: 'S4' }
  ];
  protected readonly sourceOptions = [
    { label: 'Manual', value: 'Manual' },
    { label: 'Email', value: 'Email' }
  ];
  protected readonly queueOptions = computed(() =>
    Array.from(
      new Map(
        this.cases()
          .filter((row) => !!row.queueName)
          .map((row) => [row.queueName!, { label: row.queueName!, value: row.queueName! }])
      ).values()
    )
  );
  protected readonly ownerOptions = computed(() =>
    Array.from(
      new Map(
        this.cases()
          .filter((row) => !!row.ownerUserName)
          .map((row) => [row.ownerUserName!, { label: row.ownerUserName!, value: row.ownerUserName! }])
      ).values()
    )
  );

  constructor() {
    this.load();
    this.realtime.events$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event.eventType === 'helpdesk.case.changed' || event.eventType === 'helpdesk.case.escalated') {
          this.load();
        }
      });
  }

  protected load() {
    this.loading.set(true);
    this.data.searchCases({ page: 1, pageSize: 200 }).subscribe({
      next: (res) => {
        this.cases.set(res.items ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.toast.show('error', 'Unable to load help desk cases.');
        this.loading.set(false);
      }
    });

    this.data.getSummary().subscribe({
      next: (summary) => this.summary.set(summary),
      error: () => this.summary.set({ openCount: 0, atRiskCount: 0, breachedCount: 0, resolvedTodayCount: 0 })
    });
  }

  protected createCase() {
    this.router.navigate(['/app/helpdesk/cases/new']);
  }

  protected openCase(item: HelpDeskCase) {
    this.router.navigate(['/app/helpdesk/cases', item.id]);
  }
}
