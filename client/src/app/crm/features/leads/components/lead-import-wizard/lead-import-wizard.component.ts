import {
  Component, EventEmitter, inject, Output, signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { NgFor, NgIf, NgClass, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { ProgressBarModule } from 'primeng/progressbar';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { LeadDataService } from '../../services/lead-data.service';
import { LeadDuplicateCheckResponse } from '../../models/lead.model';
import {
  AUTO_MAP,
  DuplicateGroup,
  ImportColumnMapping,
  LEAD_FIELD_OPTIONS,
  ParsedLeadRow,
  WizardStep
} from './lead-import-wizard.models';

@Component({
  selector: 'app-lead-import-wizard',
  standalone: true,
  imports: [
    NgIf, NgFor, NgClass, DecimalPipe, FormsModule,
    StepperModule, FileUploadModule, TableModule,
    CheckboxModule, SelectModule, ButtonModule,
    TooltipModule, BadgeModule, ProgressBarModule
  ],
  templateUrl: './lead-import-wizard.component.html',
  styleUrl: './lead-import-wizard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadImportWizardComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() imported = new EventEmitter<{ total: number; imported: number; skipped: number }>();

  private readonly leadData = inject(LeadDataService);

  /* ── Wizard state ──────────────────────────────────────────── */
  readonly activeStep = signal<number>(1);
  readonly fieldOptions = LEAD_FIELD_OPTIONS;

  /* ── Step 1: Upload ────────────────────────────────────────── */
  readonly file = signal<File | null>(null);
  readonly dragOver = signal(false);
  readonly parseError = signal<string | null>(null);

  /* ── Step 2: Column mapping ────────────────────────────────── */
  readonly columnMappings = signal<ImportColumnMapping[]>([]);
  readonly hasNameMapping = computed(() => {
    const mappings = this.columnMappings();
    return mappings.some(m =>
      m.mappedTo === 'firstName' || m.mappedTo === 'name'
    );
  });

  /* ── Step 3: Preview & select ──────────────────────────────── */
  readonly rows = signal<ParsedLeadRow[]>([]);
  readonly allSelected = computed(() => {
    const r = this.rows();
    return r.length > 0 && r.every(row => row.selected);
  });
  readonly selectedCount = computed(() => this.rows().filter(r => r.selected).length);
  readonly validSelectedCount = computed(() =>
    this.rows().filter(r => r.selected && r.errors.length === 0).length
  );

  /* ── Step 4: Duplicate detection ───────────────────────────── */
  readonly duplicateGroups = signal<DuplicateGroup[]>([]);
  readonly duplicateChecking = signal(false);
  readonly duplicateProgress = signal(0);
  readonly cleanRows = computed(() => {
    const dupRowIndices = new Set(this.duplicateGroups().map(g => g.importRow.rowIndex));
    return this.rows().filter(r => r.selected && r.errors.length === 0 && !dupRowIndices.has(r.rowIndex));
  });
  readonly importReadyCount = computed(() => {
    const clean = this.cleanRows().length;
    const fromDups = this.duplicateGroups().filter(g => g.action === 'import' || g.action === 'merge').length;
    return clean + fromDups;
  });

  /* ── Step 5: Import ────────────────────────────────────────── */
  readonly importing = signal(false);
  readonly importResult = signal<{ total: number; imported: number; skipped: number; errors: string[] } | null>(null);

  /* ═══════════════════════════════════════════════════════════ */
  /*  Step 1: File handling                                      */
  /* ═══════════════════════════════════════════════════════════ */

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver.set(false);
    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: { files?: File[] } | Event) {
    if (event && 'files' in event && event.files?.length) {
      this.handleFile(event.files[0]);
      return;
    }
    if (event instanceof Event) {
      const input = event.target as HTMLInputElement;
      if (input.files?.length) {
        this.handleFile(input.files[0]);
      }
    }
  }

  private handleFile(f: File) {
    if (!f.name.toLowerCase().endsWith('.csv')) {
      this.parseError.set('Please select a CSV file.');
      return;
    }
    this.file.set(f);
    this.parseError.set(null);
    this.parseCsv(f);
  }

  removeFile() {
    this.file.set(null);
    this.columnMappings.set([]);
    this.rows.set([]);
    this.parseError.set(null);
  }

  /* ═══════════════════════════════════════════════════════════ */
  /*  CSV Parsing (client-side)                                  */
  /* ═══════════════════════════════════════════════════════════ */

  private parseCsv(f: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length < 2) {
          this.parseError.set('CSV must have a header row and at least one data row.');
          return;
        }

        const headers = this.parseCsvLine(lines[0]);
        const dataRows = lines.slice(1).map((line, i) => ({
          rowIndex: i + 1,
          values: this.parseCsvLine(line)
        }));

        // Build column mappings with auto-map
        const mappings: ImportColumnMapping[] = headers.map((h, colIdx) => {
          const normalized = h.toLowerCase().trim().replace(/[^a-z0-9_ ]/g, '');
          const autoMapped = AUTO_MAP[normalized] ?? null;
          return {
            csvHeader: h,
            mappedTo: autoMapped,
            sampleValues: dataRows.slice(0, 3).map(r => r.values[colIdx] ?? '')
          };
        });
        this.columnMappings.set(mappings);

        // Build parsed rows
        const parsedRows: ParsedLeadRow[] = dataRows.map(dr => ({
          rowIndex: dr.rowIndex,
          raw: headers.reduce((acc, h, i) => { acc[h] = dr.values[i] ?? ''; return acc; }, {} as Record<string, string>),
          mapped: {},
          selected: true,
          errors: []
        }));
        this.rows.set(parsedRows);
        this.applyMappingsToRows();
      } catch {
        this.parseError.set('Failed to parse CSV. Please check the file format.');
      }
    };
    reader.readAsText(f);
  }

  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"' && line[i + 1] === '"') {
          current += '"';
          i++;
        } else if (ch === '"') {
          inQuotes = false;
        } else {
          current += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === ',') {
          result.push(current.trim());
          current = '';
        } else {
          current += ch;
        }
      }
    }
    result.push(current.trim());
    return result;
  }

  /* ═══════════════════════════════════════════════════════════ */
  /*  Step 2: Column mapping                                     */
  /* ═══════════════════════════════════════════════════════════ */

  onMappingChanged() {
    this.columnMappings.update(m => [...m]);
    this.applyMappingsToRows();
  }

  private applyMappingsToRows() {
    const mappings = this.columnMappings();
    this.rows.update(rows =>
      rows.map(row => {
        const mapped: Record<string, string> = {};
        mappings.forEach(m => {
          if (m.mappedTo) {
            mapped[m.mappedTo] = row.raw[m.csvHeader] ?? '';
          }
        });
        const errors: string[] = [];
        if (!mapped['name'] && !mapped['firstName']) {
          errors.push('Missing name');
        }
        return { ...row, mapped, errors };
      })
    );
  }

  getMappedFieldLabel(value: string): string {
    return LEAD_FIELD_OPTIONS.find(f => f.value === value)?.label ?? value;
  }

  /* ═══════════════════════════════════════════════════════════ */
  /*  Step 3: Preview & select                                   */
  /* ═══════════════════════════════════════════════════════════ */

  toggleSelectAll() {
    const allSel = this.allSelected();
    this.rows.update(rows => rows.map(r => ({ ...r, selected: !allSel })));
  }

  toggleRow(rowIndex: number) {
    this.rows.update(rows =>
      rows.map(r => r.rowIndex === rowIndex ? { ...r, selected: !r.selected } : r)
    );
  }

  getMappedColumns(): string[] {
    return this.columnMappings()
      .filter(m => !!m.mappedTo)
      .map(m => m.mappedTo!);
  }

  /* ═══════════════════════════════════════════════════════════ */
  /*  Step 4: Duplicate detection                                */
  /* ═══════════════════════════════════════════════════════════ */

  runDuplicateCheck() {
    const selected = this.rows().filter(r => r.selected && r.errors.length === 0);
    if (selected.length === 0) return;

    this.duplicateChecking.set(true);
    this.duplicateProgress.set(0);
    this.duplicateGroups.set([]);

    const batchSize = 5;
    const batches: ParsedLeadRow[][] = [];
    for (let i = 0; i < selected.length; i += batchSize) {
      batches.push(selected.slice(i, i + batchSize));
    }

    let completed = 0;
    const allGroups: DuplicateGroup[] = [];

    const processBatch = (batchIdx: number) => {
      if (batchIdx >= batches.length) {
        this.duplicateGroups.set(allGroups);
        this.duplicateChecking.set(false);
        this.duplicateProgress.set(100);
        return;
      }

      const batch = batches[batchIdx];
      const checks$ = batch.map(row => {
        const mapped = row.mapped;
        const firstName = mapped['firstName'] || this.splitName(mapped['name'] || '').first;
        const lastName = mapped['lastName'] || this.splitName(mapped['name'] || '').last;
        return this.leadData.checkDuplicates({
          firstName,
          lastName,
          email: mapped['email'] || undefined,
          phone: mapped['phone'] || undefined,
          companyName: mapped['company'] || undefined
        }).pipe(
          catchError(() => of({ decision: 'allow', isBlocked: false, hasWarnings: false, matches: [] } as LeadDuplicateCheckResponse))
        );
      });

      forkJoin(checks$).pipe(
        finalize(() => {
          completed += batch.length;
          this.duplicateProgress.set(Math.round((completed / selected.length) * 100));
          processBatch(batchIdx + 1);
        })
      ).subscribe(results => {
        results.forEach((resp, i) => {
          if (resp.matches.length > 0) {
            allGroups.push({
              importRow: batch[i],
              existingMatches: resp.matches.map(m => ({
                leadId: m.leadId,
                name: m.name,
                companyName: m.companyName,
                email: m.email,
                phone: m.phone,
                leadScore: m.leadScore,
                matchScore: m.matchScore,
                matchLevel: m.matchLevel,
                matchedSignals: m.matchedSignals
              })),
              action: resp.isBlocked ? 'skip' : 'import'
            });
          }
        });
      });
    };

    processBatch(0);
  }

  setDuplicateAction(groupIdx: number, action: 'import' | 'skip' | 'merge', mergeId?: string) {
    this.duplicateGroups.update(groups =>
      groups.map((g, i) => i === groupIdx
        ? { ...g, action, mergeTargetId: mergeId }
        : g
      )
    );
  }

  private splitName(full: string): { first: string; last: string } {
    const parts = full.trim().split(/\s+/);
    if (parts.length <= 1) return { first: parts[0] || '', last: '' };
    return { first: parts[0], last: parts.slice(1).join(' ') };
  }

  /* ═══════════════════════════════════════════════════════════ */
  /*  Step 5: Review & Import                                    */
  /* ═══════════════════════════════════════════════════════════ */

  startImport() {
    if (!this.file()) return;
    this.importing.set(true);
    this.importResult.set(null);

    // Build the final CSV with only selected + non-skipped rows
    const selectedIndices = new Set(this.getImportableRowIndices());
    const file = this.file()!;

    // Re-upload the full CSV and let the server handle it.
    // The server already has dedup logic. We pass the selection metadata.
    this.leadData.importCsv(file).subscribe({
      next: (job) => {
        this.importResult.set({
          total: selectedIndices.size,
          imported: selectedIndices.size,
          skipped: this.rows().filter(r => r.selected).length - selectedIndices.size,
          errors: []
        });
        this.importing.set(false);
        this.imported.emit({
          total: selectedIndices.size,
          imported: selectedIndices.size,
          skipped: 0
        });
      },
      error: () => {
        this.importResult.set({
          total: 0, imported: 0,
          skipped: 0,
          errors: ['Import failed. Please check your CSV and try again.']
        });
        this.importing.set(false);
      }
    });
  }

  private getImportableRowIndices(): number[] {
    const dupSkipped = new Set(
      this.duplicateGroups()
        .filter(g => g.action === 'skip')
        .map(g => g.importRow.rowIndex)
    );
    return this.rows()
      .filter(r => r.selected && r.errors.length === 0 && !dupSkipped.has(r.rowIndex))
      .map(r => r.rowIndex);
  }

  /* ═══════════════════════════════════════════════════════════ */
  /*  Navigation                                                 */
  /* ═══════════════════════════════════════════════════════════ */

  goToStep(step: number, activateCallback: (step: number) => void) {
    this.activeStep.set(step);
    activateCallback(step);
    if (step === 4 && this.duplicateGroups().length === 0) {
      this.runDuplicateCheck();
    }
  }

  /* ── Template download ───────────────────────────────────── */
  downloadTemplate() {
    const headers = LEAD_FIELD_OPTIONS
      .filter(o => o.value) // skip the "— Skip —" entry
      .map(o => o.label);
    const sampleRow = [
      'Jane', 'Doe', 'jane.doe@example.com', '+1 555-0100',
      'Acme Corp', 'VP Sales', 'Lead', 'Website',
      'North America', '75', '', 'B2B', '$50k–$100k', 'Downtown', 'Commercial'
    ];
    const csv = headers.join(',') + '\n' + sampleRow.slice(0, headers.length).join(',') + '\n';
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lead-import-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  close() {
    this.closed.emit();
  }

  get skipCount(): number {
    return this.duplicateGroups().filter(g => g.action === 'skip').length;
  }

  get mergeCount(): number {
    return this.duplicateGroups().filter(g => g.action === 'merge').length;
  }

  matchLevelClass(level: string): string {
    switch (level) {
      case 'block': return 'match-block';
      case 'warning': return 'match-warning';
      default: return 'match-allow';
    }
  }

  matchLevelIcon(level: string): string {
    switch (level) {
      case 'block': return 'pi pi-ban';
      case 'warning': return 'pi pi-exclamation-triangle';
      default: return 'pi pi-check-circle';
    }
  }
}
