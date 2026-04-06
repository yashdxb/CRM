import { NgIf } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { BreadcrumbsComponent } from '../../../../core/breadcrumbs';
import { WorkflowTemplate } from '../models/approval-workflow-builder.model';
import { ApprovalWorkflowBuilderFacade } from '../services/approval-workflow-builder.facade';

interface WorkflowListItem {
  id: string;
  name: string;
  processName: string;
  module: string;
  triggerType: string;
  status: 'Draft' | 'Active';
  version: string;
  totalSteps: number;
  parallelGroups: number;
  slaSummary: string;
  isActive: boolean;
  lastModified: string;
}

const MOCK_WORKFLOWS: WorkflowListItem[] = [
  {
    id: 'high-discount-approval',
    name: 'High Discount Approval',
    processName: 'Discount Exception Governance',
    module: 'Opportunity',
    triggerType: 'On Submit',
    status: 'Active',
    version: 'v2.3',
    totalSteps: 3,
    parallelGroups: 1,
    slaSummary: '44h',
    isActive: true,
    lastModified: '2025-01-15T10:30:00Z'
  },
  {
    id: 'new-customer-onboarding',
    name: 'New Customer Onboarding',
    processName: 'Customer Activation Review',
    module: 'Customer',
    triggerType: 'On Create',
    status: 'Active',
    version: 'v1.0',
    totalSteps: 2,
    parallelGroups: 0,
    slaSummary: '24h',
    isActive: true,
    lastModified: '2025-01-10T14:22:00Z'
  },
  {
    id: 'contract-renewal-review',
    name: 'Contract Renewal Review',
    processName: 'Renewal Governance',
    module: 'Opportunity',
    triggerType: 'On Stage Change',
    status: 'Draft',
    version: 'v1.1',
    totalSteps: 4,
    parallelGroups: 1,
    slaSummary: '72h',
    isActive: false,
    lastModified: '2025-01-08T09:15:00Z'
  },
  {
    id: 'lead-qualification-gate',
    name: 'Lead Qualification Gate',
    processName: 'Lead Quality Check',
    module: 'Lead',
    triggerType: 'On Submit',
    status: 'Active',
    version: 'v3.0',
    totalSteps: 2,
    parallelGroups: 0,
    slaSummary: '8h',
    isActive: true,
    lastModified: '2025-01-12T16:45:00Z'
  },
  {
    id: 'enterprise-deal-approval',
    name: 'Enterprise Deal Approval',
    processName: 'Strategic Deal Governance',
    module: 'Opportunity',
    triggerType: 'On Submit',
    status: 'Draft',
    version: 'v1.0',
    totalSteps: 5,
    parallelGroups: 2,
    slaSummary: '96h',
    isActive: false,
    lastModified: '2025-01-05T11:08:00Z'
  }
];

@Component({
  selector: 'app-workflow-workspace-page',
  standalone: true,
  imports: [
    NgIf,
    DialogModule,
    InputTextModule,
    TableModule,
    TagModule,
    TooltipModule,
    BreadcrumbsComponent
  ],
  providers: [ApprovalWorkflowBuilderFacade],
  templateUrl: './workflow-workspace.page.html',
  styleUrl: './workflow-workspace.page.scss'
})
export class WorkflowWorkspacePage implements OnInit {
  private readonly router = inject(Router);
  private readonly facade = inject(ApprovalWorkflowBuilderFacade);

  readonly workflows = signal<WorkflowListItem[]>([]);
  readonly loading = signal(true);
  readonly searchTerm = signal('');
  readonly showTemplatePicker = signal(false);
  readonly templates = signal<WorkflowTemplate[]>([]);
  readonly selectedTemplateId = signal<string | null>(null);

  readonly totalCount = computed(() => this.workflows().length);
  readonly activeCount = computed(() => this.workflows().filter((w) => w.status === 'Active').length);
  readonly draftCount = computed(() => this.workflows().filter((w) => w.status === 'Draft').length);
  readonly totalSteps = computed(() => this.workflows().reduce((sum, w) => sum + w.totalSteps, 0));

  readonly filteredWorkflows = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.workflows();
    return this.workflows().filter(
      (w) =>
        w.name.toLowerCase().includes(term) ||
        w.module.toLowerCase().includes(term) ||
        w.processName.toLowerCase().includes(term)
    );
  });

  ngOnInit() {
    this.loadWorkflows();
  }

  createWorkflow() {
    this.templates.set(this.facade.getTemplateCatalog());
    this.selectedTemplateId.set(null);
    this.showTemplatePicker.set(true);
  }

  selectTemplate(templateId: string) {
    this.selectedTemplateId.set(templateId);
  }

  isTemplateSelected(templateId: string): boolean {
    return this.selectedTemplateId() === templateId;
  }

  confirmTemplate() {
    const templateId = this.selectedTemplateId();
    if (templateId) {
      this.router.navigate(['/app/workflows/builder'], { queryParams: { template: templateId } });
    } else {
      this.router.navigate(['/app/workflows/builder']);
    }
    this.showTemplatePicker.set(false);
  }

  startBlank() {
    this.showTemplatePicker.set(false);
    this.router.navigate(['/app/workflows/builder']);
  }

  categoryIcon(category: string): string {
    switch (category) {
      case 'approval': return 'pi pi-check-square';
      case 'follow-up': return 'pi pi-reply';
      case 'review': return 'pi pi-eye';
      case 'escalation': return 'pi pi-arrow-up';
      default: return 'pi pi-cog';
    }
  }

  editWorkflow(id: string) {
    this.router.navigate(['/app/workflows/builder', id]);
  }

  viewExecutions() {
    this.router.navigate(['/app/workflows/executions']);
  }

  statusSeverity(status: string): 'success' | 'info' {
    return status === 'Active' ? 'success' : 'info';
  }

  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  formatDate(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  private loadWorkflows() {
    setTimeout(() => {
      this.workflows.set(MOCK_WORKFLOWS);
      this.loading.set(false);
    }, 300);
  }
}
