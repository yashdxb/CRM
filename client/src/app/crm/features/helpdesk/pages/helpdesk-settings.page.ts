import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { AppToastService } from '../../../../core/app-toast.service';
import { HelpDeskSlaPolicy } from '../models/helpdesk.model';
import { HelpDeskDataService } from '../services/helpdesk-data.service';

@Component({
  selector: 'app-helpdesk-settings-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, InputNumberModule, TableModule, BreadcrumbsComponent],
  templateUrl: './helpdesk-settings.page.html',
  styleUrl: './helpdesk-settings.page.scss'
})
export class HelpDeskSettingsPage {
  private readonly data = inject(HelpDeskDataService);
  private readonly toast = inject(AppToastService);

  protected readonly loading = signal(false);
  protected readonly rows = signal<HelpDeskSlaPolicy[]>([]);
  protected readonly savingRowId = signal<string | null>(null);

  constructor() {
    this.load();
  }

  protected load() {
    this.loading.set(true);
    this.data.listSlaPolicies().subscribe({
      next: (rows) => {
        this.rows.set(rows ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.toast.show('error', 'Unable to load SLA policies.');
      }
    });
  }

  protected saveRow(row: HelpDeskSlaPolicy) {
    this.savingRowId.set(row.id);
    this.data.updateSlaPolicy(row.id, row).subscribe({
      next: () => {
        this.savingRowId.set(null);
        this.toast.show('success', 'SLA policy saved.');
      },
      error: () => {
        this.savingRowId.set(null);
        this.toast.show('error', 'Unable to save SLA policy.');
      }
    });
  }
}
